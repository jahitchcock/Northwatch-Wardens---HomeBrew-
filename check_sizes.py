#!/usr/bin/env python3
"""
Get actual line counts of all source files in the TOC,
and compare with sync_extract build line ranges.
"""
import json
from pathlib import Path

TOC_FILE = Path("build/dms-guide-toc.json")
BUILD_DIR = Path("build")

with open(TOC_FILE, 'r', encoding='utf-8') as f:
    toc = json.load(f)

files = []
for section in toc.get('sections', []):
    ch_name = section.get('chapter', '')
    if 'subsections' in section:
        for sub in section['subsections']:
            sub_name = sub.get('title', '')
            for rel_path in sub.get('files', []):
                files.append((rel_path, ch_name, sub_name))
    elif 'files' in section:
        for rel_path in section.get('files', []):
            files.append((rel_path, ch_name, ''))

total = 0
for rel_path, chap, sub in files:
    source = (BUILD_DIR / rel_path).resolve()
    if source.exists():
        line_count = len(source.read_text(encoding='utf-8').split('\n'))
    else:
        line_count = -1
    name = Path(rel_path).name
    section_info = f"[{chap}"
    if sub:
        section_info += f" > {sub}"
    section_info += "]"
    print(f"  {line_count:5d} lines  {name}  {section_info}")
    if line_count > 0:
        total += line_count

print(f"\nTotal source lines: {total}")
