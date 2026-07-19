# AGENTS.md

D&D 5e guild campaign + DM dashboard + novel series.

## DM Panel (Primary)

```bash
cd web
npm install     # if needed
npm start       # → http://localhost:5050 (pw: TPK, from DM_PASSWORD env)
```

Express + WebSocket. Serves `web/public/`. pm2-managed in production: `cd web && npm run up` (or `restart`/`down`/`logs`/`status`). Auto-restarts on `server.js`/`lib/`/`public/`/`views/` changes.

**Novels:** public-access e-reader at `/novels` (no auth). 31 chapter files in `Novels/01 Book One/Chapters/` with YAML frontmatter (series, title, label, sort_order, part, type). Book One complete (30 chapters + interlude). Novelist skill at `.claude/skills/novelist/`. J.H. Thorne agent at `@jh-thorne`.

## Print Build (Broken)

The TOC JSONs (`build/players-guide-toc.json`, `build/dms-guide-toc.json`) reference `../World Building/`, `../Season 1/` paths but source content was moved to `_print/`. Fix: prepend `_print/` to paths. Also: `build.sh`, `build.js`, `_print/build.js`, and `_print/package.json` don't exist — these are referenced in docs but absent from the repo.

Pipeline (aspirational): `scripts/build/add_page_footers.py` → concatenate by TOC order → render via `homebrewery-renderer.js` → output in `build/`.

CI (`.github/workflows/build-and-deploy.yml`) runs XML validation then `./build.sh` — will fail since `build.sh` missing.

## File Formats

- `.md` = Homebrewery V3 (see `.github/HOMEBREWERY_V3_GUIDE.md`). NOT standard markdown.
- `.xml` = Game Master 5e v5 (root: `<data version="5">`, NOT `<compendium>`). Unique UIDs required.
- `.json` = D&D 5e stat blocks.

## Content Separation (Player vs DM)

Player guide files (in `build/players-guide-toc.json`) will be printed. NEVER use file links `[text](../path/file.md)` or repo path refs — use `**Chapter 4: ...**` or `Available from your DM`. DM guide can use repo refs freely.

## Adventures

Each adventure in its own folder: `adventures/season-N/adventure-name/index.md` (optional scene splits `01-*.md`, `handouts/`). Order-independent, 2–5 players, subtle Aeorian Echo clues. Tone: grounded low-magic frontier.

## Canonical Geography (Don't Invent)

| Location | Purpose |
|----------|---------|
| Waystone Inn | Guild HQ |
| Welton + Westly's Farm | Wolves of Welton |
| Pinebrook | Peril in Pinebrook |
| Palebank Village + Croaker Cave | The Pale Sickness |
| Salsvault | Aeorian ruins (Echo source) |
| Temple of the Dragonknights | Capstone |
| Noke's Tower | Wild Sheep Chase |

## Skills

36 skills in `.claude/skills/`. Load matching skill before D&D work: `canon-check`, `new-adventure`, `new-npc`, `session-prep`, `xml-manager`, `dm-assistant`, `novelist`, `brainstorming` (mandatory before creative work), `observe-plan-act-reflect` (outer loop for multi-step tasks), `verification-before-completion` (before claiming done).

## Lore RAG

Semantic search + grounded generation over campaign lore and (firewalled) the novels. See `tools/lore-rag/README.md`.

- Prefer `search_lore` (MCP tool, `aevorian-lore` server) with `collection: "campaign"` to ground adventure/NPC/world work in real canon before writing; use `collection: "novels"` **only** inside novelist / jh-thorne work (it cannot see campaign material — this is the canon firewall).
- `ask_lore` returns a local LM Studio draft grounded in retrieved chunks; use `search_lore` when you'll write the prose yourself.
- After editing lore `.md`, reindex: `node tools/lore-rag/indexer.mjs` (or `campaign` / `novels`).
- Service lives on the GPU box (`10.10.6.56:8100`); infra in `infra/lore-rag/`.
