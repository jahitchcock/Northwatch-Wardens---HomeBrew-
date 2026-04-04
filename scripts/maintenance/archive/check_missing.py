#!/usr/bin/env python3
"""Check missing file boundaries."""
import os

missing_files = [
    'Season 1/Adventures/Wolves_Of_Welton/5E_Wolves_Of_Welton.md',
    'Season 1/Adventures/Frozen Sick/Frozen_Sick_Stat_Blocks.md',
    'Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md',
]

for f in missing_files:
    name = os.path.basename(f)
    print(f'=== {name} ===')
    try:
        with open(f, 'r', encoding='utf-8') as fh:
            lines = fh.readlines()
        for i in range(min(10, len(lines))):
            print(f'  L{i+1}: {lines[i].rstrip()[:100]}')
    except Exception as e:
        print(f'  ERROR: {e}')
    print()

# Search for first non-empty lines in export
export = open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8').readlines()

for f in missing_files:
    name = os.path.basename(f)
    with open(f, 'r', encoding='utf-8') as fh:
        all_lines = fh.readlines()
    
    # Get first 3 non-empty lines
    anchors = []
    for line in all_lines:
        if line.strip():
            anchors.append(line.rstrip())
            if len(anchors) >= 3:
                break
    
    print(f'{name} anchors: {[a[:60] for a in anchors]}')
    
    # Search in export
    for anchor in anchors:
        for i, el in enumerate(export):
            if el.rstrip() == anchor:
                print(f'  "{anchor[:60]}" found at export L{i+1}')
                # Show context
                for j in range(max(0, i-2), min(len(export), i+3)):
                    print(f'    Export L{j+1}: {export[j].rstrip()[:80]}')
                break
        else:
            print(f'  "{anchor[:60]}" NOT FOUND in export')
    print()
