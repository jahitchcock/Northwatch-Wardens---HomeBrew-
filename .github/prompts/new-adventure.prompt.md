---
description: 'Scaffold a new adventure for Northwatch Wardens with full Homebrewery structure and Aeorian Echo integration'
---

# New Adventure

Scaffold a complete adventure for Northwatch Wardens: Season One.

## Required Inputs

Collect from the user:
- **Adventure name**
- **Level range** (e.g., 1–3)
- **Setting location** — must be from canonical geography (see below)
- **Brief premise** (or suggest one based on location)

## Canonical Locations (required)

| Location | Purpose |
|----------|---------|
| Waystone Inn | Guild HQ, mission hub |
| Welton + Westly's Farm | Wolves of Welton |
| Pinebrook | Peril in Pinebrook |
| Palebank Village + Croaker Cave | Frozen Sick |
| Salsvault | Aeorian ruins |
| Temple of the Dragonknights | Capstone |
| Noke's Tower | Wild Sheep Chase |

If the location isn't listed, stop and ask — do not invent new locations.

## Output Files

1. **`Season 1/Adventures/<Name>/<Name>.md`** — Full Homebrewery-formatted adventure
   - Read `.github/templates/adventure_template.md` for required structure
   - Include: hooks, scenes with `{{descriptive}}`/`{{note}}` blocks, encounters, Aeorian Echo clue, consequences
   - Tone: grounded frontier realism, sensory-first read-aloud text (2–4 sentences), avoid dictating PC emotions

2. **`Season 1/Adventures/<Name>/<Name>.json`** — Companion stat block data

## Post-Creation

Ask about optional additions:
1. "Add an `<adventure>` XML entry to `LionsdenGameFiles/Northwatch_Wardens.xml`?"
2. "Add this adventure to `build/dms-guide-toc.json`?"

Remind user to run build to verify: `./build.sh --dms`
