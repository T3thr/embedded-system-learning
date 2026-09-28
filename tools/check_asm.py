#!/usr/bin/env python3
"""Static sanity check for 8051 assembly shown in portal pages.

  python3 tools/check_asm.py [page.html ...]   (default: the 2025 real exam page)

Per code block: every mnemonic is a real MCS-51 instruction or directive, operand counts are
plausible, and every jump / call target is a label defined in that block (or a listed shared routine).
Blocks without any instruction (worked calculations) are skipped.
"""
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT = [ROOT / "1/final/real-exam/2025/index.html"]
OPERANDS = {  # mnemonic -> allowed operand counts
    "ACALL": {1}, "ADD": {2}, "ADDC": {2}, "AJMP": {1}, "ANL": {2}, "CALL": {1}, "CJNE": {3}, "CLR": {1}, "CPL": {1},
    "DA": {1}, "DEC": {1}, "DIV": {1}, "DJNZ": {2}, "INC": {1}, "JB": {2}, "JBC": {2}, "JC": {1}, "JMP": {1},
    "JNB": {2}, "JNC": {1}, "JNZ": {1}, "JZ": {1}, "LCALL": {1}, "LJMP": {1}, "MOV": {2}, "MOVC": {2}, "MOVX": {2},
    "MUL": {1}, "NOP": {0}, "ORL": {2}, "POP": {1}, "PUSH": {1}, "RET": {0}, "RETI": {0}, "RL": {1}, "RLC": {1},
    "RR": {1}, "RRC": {1}, "SETB": {1}, "SJMP": {1}, "SUBB": {2}, "SWAP": {1}, "XCH": {2}, "XCHD": {2}, "XRL": {2},
}
DIRECTIVES = {"ORG", "END", "EQU", "DB", "DW", "BIT", "DATA"}
BRANCH_TARGET = {"ACALL": 0, "AJMP": 0, "CALL": 0, "LCALL": 0, "LJMP": 0, "SJMP": 0, "JC": 0, "JNC": 0, "JZ": 0,
                 "JNZ": 0, "JB": 1, "JNB": 1, "JBC": 1, "DJNZ": 1, "CJNE": 2}
SHARED = {"DELAY", "DELAY_100US", "DELAY_10US", "DEBOUNCE"}  # routines a snippet may call without defining


def blocks(page):
    src = page.read_text(encoding="utf-8")
    for m in re.finditer(r'<pre class="code-content"[^>]*>([\s\S]*?)</pre>', src):
        body = re.sub(r'(?=<span class="lst-line")', "\n", m.group(1))  # simulator listing: one span per line
        text = html.unescape(re.sub(r"<[^>]+>", "", body))
        yield src.count("\n", 0, m.start()) + 1, text


def check(text):
    labels, uses, errors, n_ins = set(), [], [], 0
    for ln in text.split("\n"):
        code = ln.split(";", 1)[0].strip()
        if not code:
            continue
        lab = re.match(r"([A-Za-z_]\w*):\s*(.*)", code)
        if lab:
            labels.add(lab.group(1).upper())
            code = lab.group(2).strip()
            if not code:
                continue
        parts = code.split(None, 1)
        op = parts[0].upper()
        args = [a.strip() for a in parts[1].split(",")] if len(parts) > 1 else []
        if op in DIRECTIVES:
            continue
        if op not in OPERANDS:
            if re.fullmatch(r"[A-Z0-9 ]+", code.upper()) and not n_ins:
                return None  # not assembly (e.g. a binary worked calculation)
            errors.append("unknown mnemonic: " + code)
            continue
        n_ins += 1
        if len(args) not in OPERANDS[op]:
            errors.append("operand count: " + code)
        if op in BRANCH_TARGET and len(args) > BRANCH_TARGET[op]:
            uses.append(args[BRANCH_TARGET[op]].upper())
    if not n_ins:
        return None
    for u in uses:
        if u not in labels and u not in SHARED and not re.fullmatch(r"[0-9][0-9A-F]*H", u):
            errors.append("undefined label: " + u)
    return errors


def main():
    pages = [Path(p) for p in sys.argv[1:]] or DEFAULT
    total, bad = 0, 0
    for page in pages:
        for line, text in blocks(page):
            res = check(text)
            if res is None:
                continue
            total += 1
            if res:
                bad += 1
                print("FAIL %s:%d %s" % (page.name, line, "; ".join(res)))
    print("checked %d assembly blocks, %d with problems" % (total, bad))
    print("RESULT: " + ("FAIL" if bad else "PASS"))
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
