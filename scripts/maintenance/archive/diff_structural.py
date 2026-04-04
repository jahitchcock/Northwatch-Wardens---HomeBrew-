import difflib

bl = open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8').readlines()
el = open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8').readlines()

bstart = next(i for i,l in enumerate(bl) if 'The Morning After: A Warden' in l and l.startswith('#'))
estart = next(i for i,l in enumerate(el) if 'The Morning After: A Warden' in l and l.startswith('#'))
bend = next(i for i,l in enumerate(bl) if 'Wolves of Welton' in l and l.startswith('## Wolves'))
eend = next(i for i,l in enumerate(el) if 'Wolves of Welton' in l and l.startswith('## Wolves'))

print(f"Build section: L{bstart+1}-{bend}, lines={bend-bstart}")
print(f"Export section: L{estart+1}-{eend}, lines={eend-estart}")

bsec = bl[bstart:bend]
esec = el[estart:eend]

def normalize_quotes(s):
    return (s.replace('\u2019', "'")
             .replace('\u2018', "'")
             .replace('\u201c', '"')
             .replace('\u201d', '"'))

diffs = list(difflib.unified_diff(esec, bsec, n=0, lineterm=''))
structural = []
i = 0
while i < len(diffs):
    d = diffs[i]
    if d.startswith('@@'):
        structural.append(d)
    elif d.startswith('-') and not d.startswith('---'):
        # look for corresponding + line
        exp_line = d[1:]
        if i+1 < len(diffs) and diffs[i+1].startswith('+'):
            bld_line = diffs[i+1][1:]
            i += 1
            if normalize_quotes(exp_line) != normalize_quotes(bld_line):
                structural.append(f"STRUCT EXP: {exp_line.rstrip()[:100]}")
                structural.append(f"STRUCT BLD: {bld_line.rstrip()[:100]}")
        else:
            structural.append(f"EXP ONLY: {exp_line.rstrip()[:100]}")
    elif d.startswith('+') and not d.startswith('+++'):
        bld_line = d[1:]
        structural.append(f"BLD ONLY: {bld_line.rstrip()[:100]}")
    i += 1

print(f"\nStructural diffs (non-quote):")
for s in structural[:80]:
    print(s)
