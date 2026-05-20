# AGENTS.md

Northwatch Wardens D&D campaign repo → generates Homebrewery PDF guides.

## Build Commands

```bash
./build.sh                    # Both guides (auto npm install)
./build.sh --players          # Player's Guide only
./build.sh --dms              # DM's Guide only
./build.sh --unbuild-players  # Reverse sync: Homebrewery → source
./build.sh --unbuild-dms      # Reverse sync: Homebrewery → source
```

Also: `npm run build`, `npm run build:players`, `npm run build:dms`

Output in `build/`. First run installs npm deps.

## Critical: Content Separation

Player guide content (defined in `build/players-guide-toc.json`) is **physically printed**. NEVER include:
- File links: `[text](../path/file.md)` — use chapter refs: `**Chapter 4: The Northwatch Wardens**`
- Repo structure: `Premade PCs/`, `Season 1/` — use: `Available from your DM`

DM guide can use repo refs freely.

## File Formats

- `.md` = Homebrewery V3 (**NOT standard markdown**) — syntax in `.github/HOMEBREWERY_V3_GUIDE.md`
- `.xml` = Game Master 5e v5 (root: `<data version="5">`, NOT `<compendium>`)
- `.json` = D&D 5e stat blocks

## Build Pipeline

1. Source in `World Building/`, `Season 1/Adventures/`, etc.
2. TOC JSON (`build/players-guide-toc.json`, `build/dms-guide-toc.json`) defines inclusion + order
3. `build.js` → `scripts/build/add_page_footers.py` (injects `{{pageNumber}}`/`{{footnote}}`) → concatenate with FILE_START/FILE_END markers → render via `homebrewery-renderer.js` → `.md/.txt/.html`
4. `.env` required for Imgur image uploads (see `.env.example`)
5. Verify output: `node verify-build.js`

Edit TOC JSON to add content — never edit `build/*.md` (generated).
Reverse sync via `unbuild.js` extracts Homebrewery edits back to source.

## Canonical Geography

All Northreach locations are defined — don't invent new ones:

| Location | Adventure |
|----------|-----------|
| Waystone Inn | Guild HQ |
| Welton + Westly's Farm | Wolves of Welton |
| Pinebrook | Peril in Pinebrook |
| Palebank Village + Croaker Cave | Frozen Sick |
| Salsvault | Aeorian ruins (Echo) |
| Temple of the Dragonknights | Capstone |
| Noke's Tower | Wild Sheep Chase |

## Always-On Guardrails

From `.github/instructions/`:
- **Verification**: Run build/verification commands and show evidence before claiming completion
- **Canon**: Only use predefined locations. Player content: no repo refs or file links, chapter references only

## Commands

| Command | Purpose |
|---------|---------|
| `/build` | Build guides |
| `/validate-xml` | Check XML structure |
| `/canon-check` | Validate geography, NPCs, tone |
| `/homebrewery-sync` | Sync VS Code ↔ Homebrewery |

## Key Reference Files

- `.github/HOMEBREWERY_V3_GUIDE.md` — Homebrewery syntax (single source of truth)
- `.github/PLAYER_DM_CONTENT_GUIDE.md` — Content separation rules
- `.github/copilot-instructions.md` — Copilot agents, prompts, always-on instructions
- `SYNC_WORKFLOW.md` — Bidirectional sync process
- `.github/instructions/` — Always-on guardrails (canon, verification, TDD)
- `CLAUDE.md` — Full context (supplements this file)
