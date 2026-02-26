#!/usr/bin/env python3
"""Find diff regions between build output and Homebrewery export."""
import difflib
import re

def normalize_quotes(s):
    return (s.replace('\u2019', "'").replace('\u2018', "'")
             .replace('\u201c', '"').replace('\u201d', '"')
             .replace('\u2014', '\u2014')  # keep em-dash
             .replace('\u2011', '\u2011'))  # keep non-breaking hyphen

def is_watercolor(s):
    return '{{watercolor' in s

def is_footer(s):
    return '{{pageNumber' in s or '{{footnote' in s

def is_trivial(s):
    return s.strip() == '' or is_watercolor(s) or is_footer(s)

b = open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8').readlines()
e = open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8').readlines()

# Find chapter/section headings to identify regions
def find_headings(lines):
    headings = []
    for i, l in enumerate(lines):
        stripped = l.strip()
        if stripped.startswith('#') and not stripped.startswith('#####'):
            headings.append((i, stripped[:80]))
    return headings

# Use SequenceMatcher to find diff blocks
sm = difflib.SequenceMatcher(None, 
    [normalize_quotes(l) for l in b],
    [normalize_quotes(l) for l in e])

# Collect diff regions
diff_regions = []
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        continue
    
    # Count structural (non-trivial) diffs
    b_lines = [b[i].rstrip() for i in range(i1, i2)]
    e_lines = [e[j].rstrip() for j in range(j1, j2)]
    
    b_structural = [l for l in b_lines if not is_trivial(l)]
    e_structural = [l for l in e_lines if not is_trivial(l)]
    
    # Also check if it's just quote differences
    b_norm = [normalize_quotes(l) for l in b_structural]
    e_norm = [normalize_quotes(l) for l in e_structural]
    
    if b_norm == e_norm:
        continue  # quote-only diff
    
    # Find nearest heading for context
    heading = "Unknown"
    for i in range(i1, -1, -1):
        if i < len(b) and b[i].strip().startswith('#'):
            heading = b[i].strip()[:60]
            break
    
    diff_regions.append({
        'tag': tag,
        'build_range': (i1+1, i2),
        'export_range': (j1+1, j2),
        'heading': heading,
        'b_structural': len(b_structural),
        'e_structural': len(e_structural),
        'b_sample': b_lines[:3],
        'e_sample': e_lines[:3],
    })

print(f"Total diff regions (excluding quote-only): {len(diff_regions)}")
print(f"Build={len(b)} Export={len(e)} diff={len(b)-len(e)}")
print()

for i, r in enumerate(diff_regions):
    size = max(r['b_structural'], r['e_structural'])
    if size == 0:
        continue  # skip blank-only diffs
    print(f"--- Region {i+1}: {r['tag']} ---")
    print(f"  Build L{r['build_range'][0]}-{r['build_range'][1]} | Export L{r['export_range'][0]}-{r['export_range'][1]}")
    print(f"  Near: {r['heading']}")
    print(f"  Build structural: {r['b_structural']} | Export structural: {r['e_structural']}")
    if r['b_sample']:
        print(f"  Build sample: {r['b_sample'][0][:80]}")
    if r['e_sample']:
        print(f"  Export sample: {r['e_sample'][0][:80]}")
    print()
