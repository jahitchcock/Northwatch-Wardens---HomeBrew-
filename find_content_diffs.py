#!/usr/bin/env python3
"""Find actual content differences between dmGuideTempPartial and built version."""

with open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8') as f:
    partial = f.read()
    
with open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8') as f:
    built = f.read()

# Skip everything before "# Using This Guide" to avoid metadata/CSS
partial_start = partial.find('# Using This Guide')
built_start = built.find('# Using This Guide')

if partial_start < 0 or built_start < 0:
    print("ERROR: Could not find comparison point")
    exit(1)

partial_body = partial[partial_start:]
built_body = built[built_start:]

# Split into lines for easier comparison
partial_lines = partial_body.split('\n')
built_lines = built_body.split('\n')

print(f"dmGuideTempPartial body: {len(partial_lines)} lines")
print(f"A-DMs-guide-to-aevoria body: {len(built_lines)} lines")
print(f"Line count difference: {len(partial_lines) - len(built_lines)} lines\n")

# Find first substantive difference
differences = []
for i in range(min(len(partial_lines), len(built_lines))):
    pline = partial_lines[i].rstrip()
    bline = built_lines[i].rstrip()
    
    # Ignore page number-only changes
    if pline != bline and not all(c.isdigit() or c in '*-.' for c in (pline + bline).replace(' ', '')):
        differences.append((i, pline[:80], bline[:80]))

if differences:
    print(f"Found {len(differences)} substantive content differences:\n")
    for line_num, pline, bline in differences[:15]:
        if len(pline) > 5 or len(bline) > 5:
            print(f"Line {line_num}:")
            print(f"  Partial: {repr(pline)}")
            print(f"  Built:   {repr(bline)}\n")
else:
    print("✓ No substantive content differences found!")
    print("(Metadata and pagination differences are expected from build script)")
