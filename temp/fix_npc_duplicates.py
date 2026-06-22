"""
Fix NPC duplicates and missing images.

- For 19 exact-filename duplicates: copy season-1 (richer) → core, update portrait to local file, delete season-1 copy
- For tulgi / urgon name variants: same treatment, keep core filename
- For core-only files: add inline image if missing, update Imgur refs to local portrait
"""

import os
import re

ROOT = r"C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)"
CORE = os.path.join(ROOT, "npcs", "core")
S1   = os.path.join(ROOT, "npcs", "season-1")

# slug → local URL path (served from web/public/)
PORTRAIT = {
    'ariodh-highwhirl':        '/portraits/AriodhHighwhirl.png',
    'aurixean-valignaak':      '/portraits/AurixeanValignaak.png',
    'baleth-cindermoon':       '/portraits/BalethCindermoon.png',
    'bordel-barleywind':       '/portraits/BordelBarleywind.png',
    'brenna-thorne':           '/portraits/MarshalBrennaThorne.jpg',
    'corel':                   '/portraits/Corel.jpg',
    'elric-vael':              '/portraits/LorewardenElricVael.jpg',
    'elro-aldataur':           '/portraits/ElroAldataur.png',
    'father-johan-merriksonn': '/portraits/FatherJohanMerriksonn.jpg',
    'finethir-shinebright':    '/portraits/Shinebright.png',
    'flynt-wymblen':           '/portraits/FlyntWymblen.jpg',
    'galvena-aballon':         '/portraits/GalvenaAballon.png',
    'guz':                     '/portraits/Guz.png',
    'joel-andersmith':         '/portraits/JoelAndersmith.png',
    'leanor-slatebeard':       '/portraits/LeanorSlatebeard.png',
    'mara-fenwick':            '/portraits/StewardMaraFenwick.jpg',
    'mila-teno':               '/portraits/MilaTeno.png',
    'rowan-fairweather':       '/portraits/RowanFairweather.png',
    'sera-gelanadel':          '/portraits/SeraGelanadel.png',
    'takk-oaksplitter':        '/portraits/TakkOaksplitter.png',
    'tillus-merrion':          '/portraits/TillusMerrion.png',
    'urgon-wenth':             '/portraits/UrgonWenth.png',
    'verla-pelc':              '/portraits/VerlaPelc.jpg',
    'willen-featherock':       '/portraits/WillenFeatherock.jpg',
}

# 19 exact-filename duplicates (same slug in both core/ and season-1/)
EXACT_DUPLICATES = [
    'ariodh-highwhirl', 'aurixean-valignaak', 'bordel-barleywind', 'corel',
    'elro-aldataur', 'father-johan-merriksonn', 'finethir-shinebright',
    'flynt-wymblen', 'galvena-aballon', 'guz', 'joel-andersmith',
    'leanor-slatebeard', 'mila-teno', 'rowan-fairweather', 'sera-gelanadel',
    'takk-oaksplitter', 'tillus-merrion', 'verla-pelc', 'willen-featherock',
]

# Name-variant duplicates: season-1 filename → core filename
VARIANTS = {
    'tulgi':  'tulgi-lutan',
    'urgon':  'urgon-wenth',
}

# Core-only files that just need portrait URL fixes / inline image injection
CORE_ONLY = ['baleth-cindermoon', 'brenna-thorne', 'elric-vael', 'mara-fenwick']


def get_display_name(content, slug):
    m = re.search(r'^# (.+)', content, re.MULTILINE)
    if m:
        return m.group(1).strip()
    m = re.search(r'^name:\s*(.+)', content, re.MULTILINE)
    if m:
        return m.group(1).strip()
    return slug.replace('-', ' ').title()


def apply_local_portrait(content, slug, display_name):
    local = PORTRAIT.get(slug)
    if not local:
        return content

    # Update frontmatter portrait: line (Imgur or other local path)
    content = re.sub(
        r'^(portrait:\s*)\S+',
        rf'\g<1>{local}',
        content, flags=re.MULTILINE
    )

    # Replace inline Imgur image URL (keep the {style} block)
    content = re.sub(
        r'(!\[[^\]]*\]\()https?://i\.imgur\.com/[^\)]+(\)\s*\{[^\}]*\})',
        rf'\g<1>{local}\g<2>',
        content
    )
    # Replace inline image that used a different local path
    content = re.sub(
        r'(!\[[^\]]*\]\()/portraits/[^\)]+(\)\s*\{[^\}]*\})',
        rf'\g<1>{local}\g<2>',
        content
    )

    # If still no inline image at all, inject after ## Profile heading
    has_inline = bool(re.search(r'!\[[^\]]*\]\(' + re.escape(local) + r'\)', content))
    if not has_inline and '## Profile' in content:
        img = f'\n![{display_name}]({local}) {{width:130px,float:right,margin:"0 0 10px 15px"}}\n'
        content = content.replace('## Profile\n', '## Profile\n' + img, 1)

    return content


def ensure_core_tag(content):
    def fix_tags(m):
        inner = m.group(2)
        if 'core' not in inner:
            inner = 'core, ' + inner
        return m.group(1) + inner + ']'
    return re.sub(r'^(tags:\s*\[)([^\]]*)\]', fix_tags, content, flags=re.MULTILINE)


def process_exact_duplicates():
    for slug in EXACT_DUPLICATES:
        s1_path   = os.path.join(S1, f'{slug}.md')
        core_path = os.path.join(CORE, f'{slug}.md')
        if not os.path.exists(s1_path):
            print(f'  SKIP {slug} — season-1 file missing')
            continue
        with open(s1_path, encoding='utf-8') as f:
            content = f.read()
        display = get_display_name(content, slug)
        content = apply_local_portrait(content, slug, display)
        content = ensure_core_tag(content)
        with open(core_path, 'w', encoding='utf-8') as f:
            f.write(content)
        os.remove(s1_path)
        print(f'  OK  {slug}')


def process_variants():
    for s1_slug, core_slug in VARIANTS.items():
        s1_path   = os.path.join(S1, f'{s1_slug}.md')
        core_path = os.path.join(CORE, f'{core_slug}.md')
        if not os.path.exists(s1_path):
            print(f'  SKIP {s1_slug} — season-1 file missing')
            continue
        with open(s1_path, encoding='utf-8') as f:
            content = f.read()
        display = get_display_name(content, core_slug)
        content = apply_local_portrait(content, core_slug, display)
        content = ensure_core_tag(content)
        with open(core_path, 'w', encoding='utf-8') as f:
            f.write(content)
        os.remove(s1_path)
        print(f'  OK  variant {s1_slug} → core/{core_slug}.md')


def process_core_only():
    for slug in CORE_ONLY:
        core_path = os.path.join(CORE, f'{slug}.md')
        if not os.path.exists(core_path):
            continue
        with open(core_path, encoding='utf-8') as f:
            content = f.read()
        display = get_display_name(content, slug)
        updated = apply_local_portrait(content, slug, display)
        if updated != content:
            with open(core_path, 'w', encoding='utf-8') as f:
                f.write(updated)
            print(f'  OK  {slug}')
        else:
            print(f'  --  {slug} (no changes needed)')


if __name__ == '__main__':
    print('=== Exact duplicates (19) ===')
    process_exact_duplicates()
    print('\n=== Name variants ===')
    process_variants()
    print('\n=== Core-only portrait fixes ===')
    process_core_only()
    print('\nDone.')
