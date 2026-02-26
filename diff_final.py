import difflib

bl = open('build/A-DMs-guide-to-aevoria.txt', 'r', encoding='utf-8').readlines()
el = open('build/dmGuideTempPartial.txt', 'r', encoding='utf-8').readlines()

def normalize_quotes(s):
    return (s.replace('\u2019', "'").replace('\u2018', "'")
             .replace('\u201c', '"').replace('\u201d', '"'))

# Find section boundaries
bstart = next(i for i,l in enumerate(bl) if 'The Morning After: A Warden' in l and l.startswith('#'))
estart = next(i for i,l in enumerate(el) if 'The Morning After: A Warden' in l and l.startswith('#'))
bend = next(i for i,l in enumerate(bl) if 'Wolves of Welton' in l and l.startswith('## Wolves'))
eend = next(i for i,l in enumerate(el) if 'Wolves of Welton' in l and l.startswith('## Wolves'))

bsec = bl[bstart:bend]
esec = el[estart:eend]

print(f"Section size: build={len(bsec)}, export={len(esec)}")

# Count different types of diffs
quote_only = 0
blank_only = 0
structural = 0

diffs = list(difflib.ndiff(esec, bsec))
changed_pairs = []
i = 0
while i < len(diffs):
    if diffs[i].startswith('- '):
        exp = diffs[i][2:]
        # Look for corresponding + line
        j = i + 1
        while j < len(diffs) and diffs[j].startswith('? '):
            j += 1
        if j < len(diffs) and diffs[j].startswith('+ '):
            bld = diffs[j][2:]
            if exp.strip() == '' and bld.strip() == '':
                blank_only += 1
            elif normalize_quotes(exp) == normalize_quotes(bld):
                quote_only += 1
            else:
                structural += 1
                print(f"STRUCTURAL: EXP={repr(exp.rstrip()[:80])}")
                print(f"            BLD={repr(bld.rstrip()[:80])}")
            i = j + 1
        else:
            # Export-only line
            if exp.strip() == '':
                blank_only += 1
            else:
                structural += 1
                print(f"EXP ONLY: {repr(exp.rstrip()[:80])}")
            i += 1
    elif diffs[i].startswith('+ '):
        bld = diffs[i][2:]
        if bld.strip() == '':
            blank_only += 1
        else:
            structural += 1
            print(f"BLD ONLY: {repr(bld.rstrip()[:80])}")
        i += 1
    else:
        i += 1

print(f"\nDiff summary in section:")
print(f"  Quote-only diffs: {quote_only}")
print(f"  Blank-line diffs: {blank_only}")
print(f"  Structural diffs: {structural}")
