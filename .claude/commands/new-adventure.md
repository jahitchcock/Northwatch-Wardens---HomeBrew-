Scaffold a new adventure for Northwatch Wardens: Season One.

The user will provide: adventure name, level range, setting location, and a brief premise (or ask for suggestions).

Steps:

1. **Confirm canonical fit** — verify the setting location is in the canonical geography table (CLAUDE.md or `.github/copilot-instructions.md`). If a new location is needed, ask the user explicitly before proceeding.

2. **Create the adventure folder and files:**
   - `Season 1/Adventures/<AdventureName>/` directory
   - `Season 1/Adventures/<AdventureName>/<AdventureName>.md` — full Homebrewery-formatted adventure guide using the structure from `.github/templates/adventure_template.md`
   - `Season 1/Adventures/<AdventureName>/<AdventureName>.json` — companion JSON with key NPC and creature stat blocks

3. **Adventure markdown must include:**
   - Front-matter comment block: `<!-- Tags: Adventure, Season1 / Status: Draft / Type: Adventure -->`
   - Level range, duration estimate, setting location in the header block
   - At least 3 adventure hooks
   - Scenes with `{{descriptive}}` read-aloud blocks and `{{note}}` DM-only blocks
   - Balancing notes for 2–3 players vs 4–5 players in each combat encounter
   - At least one Aeorian Echo clue woven in naturally (not announced — show, don't tell)
   - Conclusion section with success/partial/failure consequences and 2 future hooks
   - Page breaks (`\page`) with `{{pageNumber,auto}}` / `{{footnote SECTION | ADVENTURE TITLE}}` footers

4. **Tone guidance** (from DMHelper agent):
   - Grounded frontier realism — tactile, visceral, understated menace
   - Read-aloud text: 2–4 sentences, sensory-first, end with a hook
   - Avoid: dictating PC emotions, generic fantasy clichés ("ancient evil"), overwrought tone

5. **Ask the user** if they also want:
   - An XML `<adventure>` entry added to `LionsdenGameFiles/Northwatch_Wardens.xml`
   - The adventure added to `build/dms-guide-toc.json`

6. After creating files, show the user the file paths created and remind them to run `/build` to verify it compiles correctly.
