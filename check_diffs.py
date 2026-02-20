#!/usr/bin/env python3
"""Quick diff checker between dmGuideTempPartial and built version."""

with open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8') as f:
    partial = f.read()
    
with open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8') as f:
    built = f.read()

print(f'dmGuideTempPartial length: {len(partial)} chars')
print(f'A-DMs-guide-to-aevoria length: {len(built)} chars')
print(f'Difference: {len(built) - len(partial)} chars\n')

# Check for key content
items_to_check = [
    'Ready to Adventure',
    'oKbv7i1',
    ':::::::::::',
    'cat warrior',
]

for item in items_to_check:
    in_partial = item in partial
    in_built = item in built
    status = "✓" if in_partial == in_built else "✗ DIFF"
    print(f'{status} "{item}": partial={in_partial}, built={in_built}')

# Find first character difference (ignoring page number format)
partial_clean = partial.replace('**', '--')
built_clean = built.replace('**', '--')

if partial_clean == built_clean:
    print('\nContent matches when ignoring ** formatting')
else:
    for i, (p, b) in enumerate(zip(partial_clean, built_clean)):
        if p != b:
            start = max(0, i - 150)
            end = min(len(partial_clean), i + 150)
            print(f'\nFirst difference at index {i}:')
            print(f'Partial: ...{partial_clean[start:end]}...')
            print(f'Built:   ...{built_clean[start:end]}...')
            break
