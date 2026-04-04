#!/usr/bin/env python3
"""
Extract Homebrewery export content for specific source files.
Finds where each source file starts/ends in the build, maps those positions  
to the export, and extracts the export content for that region.
"""
import json
import os
import difflib

BASE = r'c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)'

b = open(os.path.join(BASE, 'build', 'A-DMs-guide-to-aevoria.txt'), 'r', encoding='utf-8').readlines()
e = open(os.path.join(BASE, 'build', 'dmGuideTempPartial.txt'), 'r', encoding='utf-8').readlines()

toc = json.load(open(os.path.join(BASE, 'build', 'dms-guide-toc.json'), 'r', encoding='utf-8'))

# Get ordered file list from TOC
toc_files = []
for section in toc.get('sections', []):
    for f in section.get('files', []):
        full = os.path.normpath(os.path.join(BASE, 'build', f))
        toc_files.append((full, os.path.basename(f), f))

# Read each source file and find its first heading
file_first_headings = []
for full, basename, rel in toc_files:
    if os.path.exists(full):
        lines = open(full, 'r', encoding='utf-8').readlines()
        for line in lines[:15]:
            stripped = line.strip()
            if stripped.startswith('#'):
                file_first_headings.append((basename, stripped, full, rel))
                break

# Find heading positions in build output
def find_heading_in_build(heading, start_from=0):
    for i in range(start_from, len(b)):
        if b[i].strip() == heading:
            return i
    return None

# Map files to build line ranges
file_build_ranges = []
last_start = 0
for i, (basename, heading, full, rel) in enumerate(file_first_headings):
    pos = find_heading_in_build(heading, last_start)
    if pos is not None:
        file_build_ranges.append((basename, pos, full, rel))
        last_start = pos + 1

# Add end markers
file_ranges = []
for i, (basename, start, full, rel) in enumerate(file_build_ranges):
    if i + 1 < len(file_build_ranges):
        end = file_build_ranges[i + 1][1]
    else:
        end = len(b)
    file_ranges.append((basename, start, end, full, rel))

# Use SequenceMatcher to create line mapping between build and export
def normalize_quotes(s):
    return (s.replace('\u2019', "'").replace('\u2018', "'")
             .replace('\u201c', '"').replace('\u201d', '"'))

sm = difflib.SequenceMatcher(None,
    [normalize_quotes(l) for l in b],
    [normalize_quotes(l) for l in e])

# Create mapping from build lines to export lines
build_to_export = {}
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        for offset in range(i2 - i1):
            build_to_export[i1 + offset] = j1 + offset

# Find export range for each file
print("=== File Build Ranges and Estimated Export Ranges ===\n")
for basename, bstart, bend, full, rel in file_ranges:
    # Find nearest mapped export lines
    estart = build_to_export.get(bstart)
    eend = build_to_export.get(bend - 1)
    
    # If exact mapping fails, search nearby
    if estart is None:
        for delta in range(-5, 6):
            if bstart + delta in build_to_export:
                estart = build_to_export[bstart + delta]
                break
    if eend is None:
        for delta in range(-5, 6):
            if bend - 1 + delta in build_to_export:
                eend = build_to_export[bend - 1 + delta]
                break
    
    blines = bend - bstart
    elines = (eend - estart + 1) if estart and eend else "?"
    
    print(f"{basename}:")
    print(f"  Build: L{bstart+1}-{bend} ({blines} lines)")
    print(f"  Export: L{estart+1 if estart else '?'}-{eend+1 if eend else '?'} ({elines} lines)")
    print(f"  Source: {rel}")
    print()
