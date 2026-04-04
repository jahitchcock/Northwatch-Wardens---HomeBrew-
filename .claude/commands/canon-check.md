Check content for canonical consistency with the Northwatch Wardens campaign.

The user will provide a file path, a passage of text, or say "check all" to scan the full repository.

Steps:

1. **Determine scope:**
   - If a file path is given, read that file.
   - If text is pasted, analyze it directly.
   - If "check all" or no argument: scan all `.md` files in `Season 1/` and `World Building/` (excluding `DMEyesOnly/` unless user specifies DM content).

2. **Geography check** — flag any location name that is NOT in the canonical list:
   - Northreach: Waystone Inn, Welton, Westly's Farm, Shepherd's Crook Inn, Pinebrook, Palebank Village, Croaker Cave, Salsvault, Temple of the Dragonknights, Noke's Tower
   - Off-map (acceptable references): Solaris, Nullwood/Vaeltharyn, Stonebound Depths/Khardûn-Tharum, Vharoxis, Solace Nexus, Divinity's Beacon

3. **NPC name check** — flag any named NPC that doesn't appear in `Season 1/Campaign Assets/DM Guild Roster.md`. Don't flag generic roles (the innkeeper, a farmer, bandits).

4. **Player-facing content check** (only for files in `build/players-guide-toc.json`):
   - Flag any markdown file links: `[text](path/file.md)`
   - Flag any folder/repo references: `` `Premade PCs/` ``, `Season 1/Adventures/`
   - Flag any GitHub-specific references

5. **Tone check** (optional, only if user asks):
   - Flag read-aloud text that dictates PC emotions ("you feel scared")
   - Flag generic fantasy clichés: "ancient evil", "mystical power", "dark forces awakening", "eldritch energies"
   - Flag overwrought language (more than 3 adjectives per noun)

6. **Report findings** grouped by check type. For each issue:
   - File and approximate line
   - The flagged text
   - Suggested correction

7. **Offer to fix** player-facing link issues automatically (convert file links to chapter references). Ask before making any changes.
