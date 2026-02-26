content = open('Season 1/Adventures/Opening/Return_to_Waystone_Session0.md', 'r', encoding='utf-8').read()

# Replace curly quotes back to straight ASCII (the export has straight quotes in this file)
fixed = content.replace('\u2019', "'").replace('\u2018', "'")
fixed = fixed.replace('\u201c', '"').replace('\u201d', '"')

# Keep: em-dash \u2014, non-breaking hyphen \u2011, arrow \u2192
remaining_curly = sum(1 for c in fixed if ord(c) in [0x2019, 0x2018, 0x201c, 0x201d])
em = sum(1 for c in fixed if ord(c) == 0x2014)
arr = sum(1 for c in fixed if ord(c) == 0x2192)
print(f'Curly remaining: {remaining_curly}, Em-dashes: {em}, Arrows: {arr}')

with open('Season 1/Adventures/Opening/Return_to_Waystone_Session0.md', 'w', encoding='utf-8', newline='\n') as f:
    f.write(fixed)
print('Done! Lines:', len(fixed.splitlines()))
