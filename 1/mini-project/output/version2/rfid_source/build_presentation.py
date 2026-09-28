"""Rebuild the RFID deck with editable PowerPoint tables and diagrams.

The presentation engine is Artifact Tool (JavaScript); Python coordinates it.
Existing final decks are never overwritten. Select another --output to rebuild.
Generated artwork is retained in rfid_assets; prompts are in image_prompts.md.
"""
from pathlib import Path
import argparse
import os
import subprocess

SRC = Path(__file__).resolve().parent
ROOT = SRC.parent
RUNTIME = Path.home() / '.cache/codex-runtimes/codex-primary-runtime/dependencies/node'
SKILL = Path.home() / '.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations'

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=ROOT / 'Sliding_Door_Safety_Control_RFID_v2_rebuilt.pptx')
    args = parser.parse_args()
    output = args.output.resolve()
    if output.exists():
        parser.error('Output already exists; choose a new filename.')
    node = str(RUNTIME / 'bin/node')
    env = dict(os.environ, RUNTIME_NODE_MODULES=str(RUNTIME / 'node_modules'))
    subprocess.run([node, str(SRC / 'build_deck.mjs')], check=True, env=env)
    subprocess.run([node, str(SRC / 'finalize.mjs'), str(output)], check=True, env=env)
    subprocess.run([node, str(SKILL / 'container_tools/render_presentation.mjs'), '--input', str(output), '--output_dir', str(ROOT / (output.stem + '_preview')), '--scale', '1'], check=True, env=env)

if __name__ == '__main__':
    main()
