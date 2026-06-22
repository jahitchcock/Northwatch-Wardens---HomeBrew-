# AGENTS.md

Northwatch Wardens: Season One — modular D&D 5e guild campaign set in Northreach (world: Aevoria).

Two systems: the **DM Panel** (web dashboard, active use) and the **print build** (Homebrewery PDF pipeline, currently broken).

## DM Panel (Primary)

```bash
cd web
npm install     # if needed
npm start       # → http://localhost:5050
```

Express + WebSocket server. Serves `web/public/` (app.js + style.css). Features: file browser, markdown preview with Homebrewery syntax support, search, random tables (`tables/`), character sheets (`player-characters/`), session tracker CRUD (`timeline/sessions/`), seasonal calendar, treasure/encounter generators, WebSocket terminal (via xterm.js + node-pty).

Directories excluded from file browser: `.git`, `.github`, `web/`, `node_modules`, `build/`, `logs/`, `scripts/`, `LionsdenGameFiles/`.

## Print Build (Broken)

```bash
./build.sh                    # Both (auto npm install)
./build.sh --players          # Player's Guide only
./build.sh --dms              # DM's Guide only
./build.sh --unbuild-players  # Reverse sync: Homebrewery → source
./build.sh --unbuild-dms      # Reverse sync: Homebrewery → source
```

Also: `npm run build`, `npm run build:players`, `npm run build:dms` (scripts in `_print/package.json`)

Output in `build/`. First run installs npm deps.

**Known issue:** Source content was moved from `World Building/`, `Season 1/` into `_print/`, but TOC JSON paths (`build/players-guide-toc.json`, `build/dms-guide-toc.json`) still point to the old root-level paths. Build will fail with "File not found" warnings. Fix by prepending `_print/` to paths in TOC JSON files. See `_print/build.js:3-5`.

## Pipeline (Print)

1. `_print/build.js` runs `scripts/build/add_page_footers.py` (injects `{{pageNumber}}`/`{{footnote}}` before each `\page`)
2. Concatenates files in TOC JSON order with `<!-- FILE_START/FILE_END -->` markers
3. `homebrewery-renderer.js` (adapted from naturalcrit/homebrewery) renders to `.md/.txt/.html`
4. Verify with: `node _print/verify-build.js` (checks duplicate `\page`, TOC page numbers)
5. Unbuild: `node _print/unbuild.js --players` (or `--dms`) extracts content from compiled `.txt` back to source using markers

## Content Separation

Player guide files (in `build/players-guide-toc.json`) are **physically printed**. NEVER include:
- File links: `[text](../path/file.md)` — use chapter refs: `**Chapter 4: The Northwatch Wardens**`
- Repo structure refs: `Premade PCs/`, `Season 1/Adventures/` — use: `Available from your DM`

DM guide can use repo refs freely.

Edit TOC JSON to add/remove content. Never edit `build/*.md` directly.

## File Formats

- `.md` = Homebrewery V3 (NOT standard markdown) — syntax in `.github/HOMEBREWERY_V3_GUIDE.md`
- `.xml` = Game Master 5e v5 (root: `<data version="5">`, NOT `<compendium>`)
- `.json` = D&D 5e stat blocks

## Canonical Geography

| Location | Purpose |
|----------|---------|
| Waystone Inn | Guild HQ |
| Welton + Westly's Farm | Wolves of Welton |
| Pinebrook | Peril in Pinebrook |
| Palebank Village + Croaker Cave | The Pale Sickness |
| Salsvault | Aeorian ruins (Echo mystery) |
| Temple of the Dragonknights | Capstone |
| Noke's Tower | Wild Sheep Chase |

## Verification

Always run `node verify-build.js` before claiming completion. The workflow in `.github/workflows/build-and-deploy.yml` also validates XML well-formedness and auto-deploys to GitHub Pages on push to `main`.

## Key Reference Files

- `.github/HOMEBREWERY_V3_GUIDE.md` — Homebrewery syntax (single source of truth)
- `.github/PLAYER_DM_CONTENT_GUIDE.md` — Content separation rules
- `_print/SYNC_WORKFLOW.md` — Bidirectional Homebrewery ↔ source sync process
- `.claude/skills/` — 29 skills; load matching skill before working on D&D content (canon-check, xml-manager, dm-assistant, etc.)
- `_planning/IDEAS.md` — project-level brainstorming and enhancement ideas (DM Panel, Print Build, workflow, etc.)
