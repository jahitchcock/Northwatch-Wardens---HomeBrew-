#!/usr/bin/env python3
# Restore the warning emoji ⚠️ that was accidentally removed

path = r'c:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\build\A-DMs-guide-to-aevoria.txt'

with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

# Restore all instances of warning emoji
# These are the patterns where ⚠️ should appear

replacements = [
    ('##### SPOILER WARNING FOR PLAYERS', '##### ⚠️ SPOILER WARNING FOR PLAYERS'),
    ('##### DUNGEON MASTER EYES ONLY', '##### ⚠️ DUNGEON MASTER EYES ONLY'),
    ('## DM ONLY — DO NOT SHARE WITH PLAYERS', '## ⚠️ DM ONLY — DO NOT SHARE WITH PLAYERS'),
    ('- MAYBE: Identity hints', '- ⚠️ MAYBE: Identity hints'),
    ('- MAYBE: Access to Echo', '- ⚠️ MAYBE: Access to Echo'),
    ('- MAYBE: Ability to', '- ⚠️ MAYBE: Ability to'),
    ('3. **NEW MYSTERY:** Salsvault', '3. ⚠️ **NEW MYSTERY:** Salsvault'),
    ('4. **ESCALATION:** Salsvault', '4. ⚠️ **ESCALATION:** Salsvault'),
    ('5. **SCOPE:** Other Aeorian', '5. ⚠️ **SCOPE:** Other Aeorian'),
    ('- Resolution incomplete', '- ⚠️ Resolution incomplete'),
    ('- Mastermind unknown', '- ⚠️ Mastermind unknown'),
    ('| Criminals | Exploiting | Fragmenting | Survival | Unstable |', '| Criminals | Exploiting | Fragmenting | Survival | ⚠️ Unstable |'),
    ('| Merchants | Profiteering | Collapsing | N/A | Unstable |', '| Merchants | Profiteering | Collapsing | N/A | ⚠️ Unstable |'),
    ('| Settlements | Defensive | Desperate | Survivors | ✓ Yes | If failed |', '| Settlements | Defensive | Desperate | Survivors | ✓ Yes | ⚠️ If failed |'),
]

for old, new in replacements:
    text = text.replace(old, new)

with open(path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Restored warning emojis")
