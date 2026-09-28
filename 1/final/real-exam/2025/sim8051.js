/*
 * Sim8051: a small cycle-counting model of the classic 12T 8051 (12 clocks per machine cycle).
 * Scope: exactly the instruction subset used by the course labs on this page.
 * Timing: each instruction reads its operands, then runs for its machine-cycle count
 * (Timer 0 ticks once per machine cycle while TR0 = 1), then writes its result.
 * Cycle counts follow the Intel MCS-51 instruction set table.
 * Works in the browser (window.Sim8051) and in Node (globalThis.Sim8051) for tests.
 */
(function (root) {
  'use strict';

  var CYCLES = {
    NOP: 1, MOV_R_IMM: 1, MOV_DIR_IMM: 2, MOV_A_DIR: 1, MOV_DIR_A: 1, MOV_A_IMM: 1,
    SETB: 1, CLR: 1, CPL: 1, INC_A: 1,
    JB: 2, JNB: 2, SJMP: 2, AJMP: 2, LJMP: 2, ACALL: 2, LCALL: 2, RET: 2, DJNZ: 2
  };

  var SFR = { P0: 0x80, SP: 0x81, TCON: 0x88, TMOD: 0x89, TL0: 0x8A, TL1: 0x8B, TH0: 0x8C, TH1: 0x8D,
              P1: 0x90, SCON: 0x98, SBUF: 0x99, P2: 0xA0, IE: 0xA8, P3: 0xB0, IP: 0xB8, ACC: 0xE0 };
  var BIT_ALIAS = { TF1: 'TCON.7', TR1: 'TCON.6', TF0: 'TCON.5', TR0: 'TCON.4', IE1: 'TCON.3',
                    IT1: 'TCON.2', IE0: 'TCON.1', IT0: 'TCON.0', EA: 'IE.7', ET0: 'IE.1', EX0: 'IE.0' };

  // Whole-string regex match without end anchors (the site bans the dollar sign)
  function whole(re, s) {
    var m = re.exec(s);
    return !!m && m.index === 0 && m[0].length === s.length;
  }

  function parseNumber(tok) {
    var t = tok.replace(/^#/, '').toUpperCase();
    if (whole(/[0-9][0-9A-F]*H/, t)) return parseInt(t.slice(0, -1), 16);
    if (whole(/[01]+B/, t)) return parseInt(t.slice(0, -1), 2);
    if (whole(/[0-9]+D?/, t)) return parseInt(t, 10);
    return NaN;
  }

  function stripComment(line) {
    var i = line.indexOf(';');
    return (i === -1 ? line : line.slice(0, i)).trim();
  }

  /* Assemble source text into a list of instruction objects (labels resolved). */
  function assemble(source) {
    var lines = source.split('\n');
    var program = [];
    var labels = {};
    lines.forEach(function (raw, lineNo) {
      var text = stripComment(raw);
      if (!text) return;
      var m = /^([A-Za-z_][\w]*):\s*(.*)/.exec(text);
      if (m) {
        labels[m[1].toUpperCase()] = program.length;
        text = m[2].trim();
        if (!text) return;
      }
      var parts = /^(\w+)\s*(.*)/.exec(text);
      var op = parts[1].toUpperCase();
      var args = parts[2] ? parts[2].split(',').map(function (a) { return a.trim(); }) : [];
      if (op === 'ORG' || op === 'END') return;
      program.push({ op: op, args: args, line: lineNo, text: raw.trim() });
    });
    program.forEach(function (ins) {
      ins.kind = classify(ins);
      if (!ins.kind) throw new Error('unsupported instruction on line ' + (ins.line + 1) + ': ' + ins.text);
    });
    return { program: program, labels: labels };
  }

  function isReg(a) { return whole(/R[0-7]/i, a); }
  function isAcc(a) { return String(a).toUpperCase() === 'A'; }

  function classify(ins) {
    var op = ins.op, a = ins.args;
    if (op === 'MOV') {
      if (isReg(a[0]) && a[1][0] === '#') return 'MOV_R_IMM';
      if (isAcc(a[0]) && a[1][0] === '#') return 'MOV_A_IMM';
      if (isAcc(a[0])) return 'MOV_A_DIR';
      if (isAcc(a[1])) return 'MOV_DIR_A';
      if (a[1][0] === '#') return 'MOV_DIR_IMM';
      return null;
    }
    if (op === 'INC' && isAcc(a[0])) return 'INC_A';
    if (op === 'CALL') return 'ACALL';
    return CYCLES[op] !== undefined ? op : null;
  }

  function Machine(source, options) {
    var asm = assemble(source);
    this.program = asm.program;
    this.labels = asm.labels;
    this.fosc = (options && options.fosc) || 12e6;
    this.reset();
  }

  Machine.prototype.reset = function () {
    this.pc = 0;
    this.cycles = 0;
    this.sfr = {};
    var self = this;
    Object.keys(SFR).forEach(function (k) { self.sfr[k] = 0; });
    this.sfr.P0 = this.sfr.P1 = this.sfr.P2 = this.sfr.P3 = 0xFF;
    this.sfr.SP = 0x07;
    this.r = [0, 0, 0, 0, 0, 0, 0, 0];
    this.a = 0;
    this.stack = [];
    this.pins = { 'P2.0': 0 };
    this.halted = false;
  };

  Machine.prototype.microseconds = function () { return this.cycles * 12 / this.fosc * 1e6; };

  Machine.prototype.resolveBit = function (name) {
    var n = name.toUpperCase();
    if (BIT_ALIAS[n]) n = BIT_ALIAS[n];
    var m = /^([A-Z0-9]+)\.([0-7])/.exec(n);
    if (!m || m[0].length !== n.length || SFR[m[1]] === undefined) throw new Error('unknown bit ' + name);
    return { reg: m[1], bit: +m[2] };
  };

  Machine.prototype.readBit = function (name) {
    var b = this.resolveBit(name);
    var pinKey = b.reg + '.' + b.bit;
    // Port reads return the pin: an input pin needs latch = 1 and follows the external level
    if (whole(/P[0-3]/, b.reg) && this.pins[pinKey] !== undefined) {
      return ((this.sfr[b.reg] >> b.bit) & 1) & this.pins[pinKey];
    }
    return (this.sfr[b.reg] >> b.bit) & 1;
  };

  Machine.prototype.writeBit = function (name, v) {
    var b = this.resolveBit(name);
    this.sfr[b.reg] = v ? (this.sfr[b.reg] | (1 << b.bit)) : (this.sfr[b.reg] & ~(1 << b.bit) & 0xFF);
  };

  Machine.prototype.readDirect = function (tok) {
    var t = tok.toUpperCase();
    if (SFR[t] !== undefined) return this.sfr[t];
    throw new Error('unsupported direct operand ' + tok);
  };

  Machine.prototype.writeDirect = function (tok, v) {
    var t = tok.toUpperCase();
    if (SFR[t] === undefined) throw new Error('unsupported direct operand ' + tok);
    this.sfr[t] = v & 0xFF;
  };

  Machine.prototype.target = function (label) {
    var t = this.labels[label.toUpperCase()];
    if (t === undefined) throw new Error('undefined label ' + label);
    return t;
  };

  /* Timer 0 in mode 1 (16-bit) or mode 2 (8-bit auto-reload), timer function only (C/T = 0). */
  Machine.prototype.tick = function (n) {
    for (var i = 0; i < n; i++) {
      this.cycles++;
      if (!((this.sfr.TCON >> 4) & 1)) continue;
      var mode = this.sfr.TMOD & 0x03;
      if (mode === 1) {
        var v = ((this.sfr.TH0 << 8) | this.sfr.TL0) + 1;
        if (v > 0xFFFF) { v = 0; this.sfr.TCON |= 0x20; }
        this.sfr.TH0 = (v >> 8) & 0xFF;
        this.sfr.TL0 = v & 0xFF;
      } else if (mode === 2) {
        var t = this.sfr.TL0 + 1;
        if (t > 0xFF) { t = this.sfr.TH0; this.sfr.TCON |= 0x20; }
        this.sfr.TL0 = t;
      }
    }
  };

  /* Execute one instruction. Returns the executed instruction. */
  Machine.prototype.step = function () {
    if (this.pc >= this.program.length) { this.halted = true; return null; }
    var ins = this.program[this.pc];
    var a = ins.args;
    var next = this.pc + 1;
    var write = null;
    switch (ins.kind) {
      case 'NOP': break;
      case 'MOV_R_IMM': write = { r: +a[0][1], v: parseNumber(a[1]) }; break;
      case 'MOV_A_IMM': write = { a: parseNumber(a[1]) }; break;
      case 'MOV_A_DIR': write = { a: this.readDirect(a[1]) }; break;
      case 'MOV_DIR_A': write = { dir: a[0], v: this.a }; break;
      case 'MOV_DIR_IMM': write = { dir: a[0], v: parseNumber(a[1]) }; break;
      case 'INC_A': write = { a: (this.a + 1) & 0xFF }; break;
      case 'SETB': write = { bit: a[0], v: 1 }; break;
      case 'CLR': write = { bit: a[0], v: 0 }; break;
      case 'CPL': write = { bit: a[0], v: this.readBit(a[0]) ^ 1 }; break;
      case 'JB': if (this.readBit(a[0])) next = this.target(a[1]); break;
      case 'JNB': if (!this.readBit(a[0])) next = this.target(a[1]); break;
      case 'SJMP': case 'AJMP': case 'LJMP': next = this.target(a[0]); break;
      case 'ACALL': case 'LCALL': this.stack.push(next); next = this.target(a[0]); break;
      case 'RET': next = this.stack.pop(); break;
      case 'DJNZ': {
        var n = +a[0][1];
        var val = (this.r[n] - 1) & 0xFF;
        write = { r: n, v: val };
        if (val !== 0) next = this.target(a[1]);
        break;
      }
      default: throw new Error('no executor for ' + ins.kind);
    }
    this.tick(CYCLES[ins.kind]);
    if (write) {
      if (write.r !== undefined) this.r[write.r] = write.v & 0xFF;
      else if (write.a !== undefined) this.a = write.a & 0xFF;
      else if (write.dir) this.writeDirect(write.dir, write.v);
      else if (write.bit) this.writeBit(write.bit, write.v);
    }
    this.pc = next;
    return ins;
  };

  root.Sim8051 = { Machine: Machine, assemble: assemble, CYCLES: CYCLES, parseNumber: parseNumber };
})(typeof window !== 'undefined' ? window : globalThis);
