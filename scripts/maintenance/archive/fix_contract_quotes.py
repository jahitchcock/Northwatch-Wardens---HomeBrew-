content = open('Season 1/Adventures/Opening/Wolves - Contract.md', 'r', encoding='utf-8').read()

# These should be straight ASCII in the source (Homebrewery stores straight, renders curly)
fixed = content.replace('\u2019', "'").replace('\u2018', "'")
fixed = fixed.replace('\u201c', '"').replace('\u201d', '"')

# Keep: em-dash \u2014, non-breaking hyphen \u2011
print(f'Curly apos remaining: {chr(0x2019) in fixed}')
print(f'Em-dash remaining: {chr(0x2014) in fixed}')
print(f'Non-breaking hyphen remaining: {chr(0x2011) in fixed}')

with open('Season 1/Adventures/Opening/Wolves - Contract.md', 'w', encoding='utf-8', newline='\n') as f:
    f.write(fixed)

lines = open('Season 1/Adventures/Opening/Wolves - Contract.md', 'r', encoding='utf-8').readlines()
print(f'Lines: {len(lines)}')
print(f'Line 4: {repr(lines[3].rstrip()[:80])}')
