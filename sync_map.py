#!/usr/bin/env python3
"""Map diff regions to source files using the TOC."""
import json
import difflib
import os

BASE = r'c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)'

# Load TOC
toc = json.load(open(os.path.join(BASE, 'build', 'dms-guide-toc.json'), 'r', encoding='utf-8'))

# Build the file list from TOC
files = []
for section in toc.get('sections', []):
    for f in section.get('files', []):
        # Resolve relative path
        full = os.path.normpath(os.path.join(BASE, 'build', f))
        files.append((full, os.path.basename(f)))

# Load build and export
b = open(os.path.join(BASE, 'build', 'A-DMs-guide-to-aevoria.txt'), 'r', encoding='utf-8').readlines()
e = open(os.path.join(BASE, 'build', 'dmGuideTempPartial.txt'), 'r', encoding='utf-8').readlines()

# Find where each source file starts in the build
# Build file does concatenation; find unique first heading from each file
file_boundaries = []
for full, basename in files:
    if os.path.exists(full):
        first_lines = open(full, 'r', encoding='utf-8').readlines()
        # Find the first non-blank, non-watercolor content line
        for fl in first_lines[:10]:
            stripped = fl.strip()
            if stripped and stripped.startswith('#'):
                # Search for this in the build
                for bi, bl in enumerate(b):
                    if bl.strip() == stripped:
                        file_boundaries.append((bi, basename, full))
                        break
                break

file_boundaries.sort()

# For each build line, find which source file it belongs to
def get_source_file(line_num):
    """Given a build line number (0-indexed), find the source file."""
    src = "unknown"
    for bi, basename, full in file_boundaries:
        if bi <= line_num:
            src = basename
        else:
            break
    return src

# Now find diff regions and map to files
def normalize_quotes(s):
    return (s.replace('\u2019', "'").replace('\u2018', "'")
             .replace('\u201c', '"').replace('\u201d', '"'))

sm = difflib.SequenceMatcher(None,
    [normalize_quotes(l) for l in b],
    [normalize_quotes(l) for l in e])

# Group diffs by source file
file_diffs = {}
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        continue
    
    b_lines = [b[i].rstrip() for i in range(i1, i2)]
    e_lines = [e[j].rstrip() for j in range(j1, j2)]
    b_structural = [l for l in b_lines if l.strip() and '{{watercolor' not in l and '{{pageNumber' not in l and '{{footnote' not in l]
    e_structural = [l for l in e_lines if l.strip() and '{{watercolor' not in l and '{{pageNumber' not in l and '{{footnote' not in l]
    
    b_norm = [normalize_quotes(l) for l in b_structural]
    e_norm = [normalize_quotes(l) for l in e_structural]
    if b_norm == e_norm:
        continue
    if not b_structural and not e_structural:
        continue
    
    src = get_source_file(i1)
    if src not in file_diffs:
        file_diffs[src] = []
    file_diffs[src].append({
        'tag': tag,
        'build_range': (i1+1, i2),
        'export_range': (j1+1, j2),
        'b_structural': len(b_structural),
        'e_structural': len(e_structural),
    })

# Print summary by file
print("=== DIFFS BY SOURCE FILE ===\n")
for src, diffs in sorted(file_diffs.items(), key=lambda x: -sum(d['e_structural'] for d in x[1])):
    total_b = sum(d['b_structural'] for d in diffs)
    total_e = sum(d['e_structural'] for d in diffs)
    print(f"File: {src}")
    print(f"  Regions: {len(diffs)}")
    print(f"  Build structural lines: {total_b}")
    print(f"  Export structural lines: {total_e}")
    print(f"  Delta: {total_e - total_b}")
    for d in diffs:
        print(f"    {d['tag']} BUILD L{d['build_range'][0]}-{d['build_range'][1]} | EXPORT L{d['export_range'][0]}-{d['export_range'][1]} (B:{d['b_structural']} E:{d['e_structural']})")
    print()
