#!/usr/bin/env python3
"""Investigate missing file boundaries in the Adventures section."""

build = open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8').readlines()
export = open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8').readlines()

# Search for subsection markers and key headings
markers = [
    '## Opening Adventures',
    '## Wolves of Welton',
    '## Frozen Sick',
    '## The Wild Sheep Chase',
    '## Peril in Pinebrook',
    '## Temple of the Dragonknights',
    '# Frozen Sick',  # File heading
    '# Adventures',   # Chapter heading
]

print("=== Searching Build ===")
for marker in markers:
    for i, line in enumerate(build):
        if line.rstrip() == marker:
            print(f'  Build L{i+1}: {line.rstrip()}')
            break
    else:
        print(f'  NOT FOUND: {marker}')

print("\n=== Searching Export ===")
for marker in markers:
    for i, line in enumerate(export):
        if line.rstrip() == marker:
            print(f'  Export L{i+1}: {line.rstrip()}')
            break
    else:
        print(f'  NOT FOUND: {marker}')

# Look at the Wolves - Contract end / Wolves of Welton start in both
print("\n=== Build: After Wolves-Contract (L11680-L11700) ===")
for i in range(11679, min(11705, len(build))):
    print(f'  Build L{i+1}: {build[i].rstrip()[:100]}')

print("\n=== Export: Same region (L11795-L11820) ===")
for i in range(11795, min(11825, len(export))):
    print(f'  Export L{i+1}: {export[i].rstrip()[:100]}')

# Check around where 5E_Wolves_Of_Welton would be in export
# The build has it at L11691, offset is ~+116, so export ~L11807
print("\n=== Export: Wolves image search ===")
for i, line in enumerate(export):
    if '![' in line and 'wolf' in line.lower():
        print(f'  Export L{i+1}: {line.rstrip()[:100]}')
    if i > 15000:
        break

# Check last line of Wolves of Welton in build
print("\n=== Build: End of 5E_Wolves_Of_Welton / Start Frozen Sick (L12760-12775) ===")
for i in range(12759, min(12780, len(build))):
    print(f'  Build L{i+1}: {build[i].rstrip()[:100]}')

# Check export around where Frozen Sick starts (L13655-13670)
print("\n=== Export: Start of Frozen Sick (L13650-13670) ===")
for i in range(13649, min(13675, len(export))):
    print(f'  Export L{i+1}: {export[i].rstrip()[:100]}')
