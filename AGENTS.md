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

## Lore RAG — Default Interface for All Lore Queries ⭐

**This is your primary research tool.** Use it before writing any lore-adjacent content.

Semantic search + grounded generation over campaign lore and (firewalled) the novels. Full docs: `tools/lore-rag/README.md`.

### Quick Reference

```bash
# In Claude Code (MCP tools — preferred):
search_lore(query="what is Salsvault", collection="campaign", k=6)
ask_lore(query="describe the five syndicates", collection="campaign")

# CLI (testing / debugging):
cd tools/lore-rag
node query.mjs "your question" -c campaign
node query.mjs "your question" -c campaign --ask
```

### When to Use Each Tool

| Your Task | Tool | Result |
| --- | --- | --- |
| "Is X already in the lore?" | `search_lore` | 6 relevant chunks ranked by semantic score |
| "Generate a grounded answer about X" | `ask_lore` | LM Studio draft (qwen/qwen3-14b) + sources cited |
| "Check if X contradicts Y" | `search_lore` both | Compare chunks directly; no hallucinations |
| **NEVER:** grep lore files | `rg` lore | (Impractical: keyword search loses semantic meaning) |

### Collections (Required Parameter)

- **`campaign`** — Full Northwatch Wardens lore (default). Includes adventures, NPCs, locations, factions, secrets, Echo mystery. Use for all adventure/NPC/world work.
- **`novels`** — *Old Songs of Aevoria* only (firewalled from campaign). Use **only** inside `@jh-thorne` or `novelist` skill work. Cannot retrieve campaign material (this is structural, not convention).

### Workflow: After You Edit Lore Files

Every lore `.md` edit must trigger a reindex:

```bash
cd tools/lore-rag
node indexer.mjs campaign    # Quick: reindex campaign only
node indexer.mjs novels      # Quick: reindex novels only
node indexer.mjs             # Full: both collections
```

Takes ~2 minutes. Without reindex, your changes won't appear in RAG queries for 24 hours (CI picks it up on push).

Verify immediately:

```bash
node query.mjs "key phrase from your new content" -c campaign
```

### Workflow: Adding New Lore

1. Create `.md` file in correct directory (npcs/season-1/, adventures/, locations/, etc.)
2. Add YAML frontmatter:

```yaml
---
title: "Name"
type: "npc" | "location" | "adventure" | "faction" | etc.
status: "canon" | "wip"
---
```

1. Reindex: `node indexer.mjs campaign`
2. Test: `node query.mjs "your content" -c campaign`
3. Commit normally

### Technical Details

- **API:** `http://10.10.6.56:8100` (GPU box, persistent)
- **Health:** `curl http://10.10.6.56:8100/health` → `{"ok":true,...}`
- **Stats:** `curl http://10.10.6.56:8100/stats` → chunk counts per collection
- **MCP Server:** Registered as `aevorian-lore` in `.vscode/mcp.json`
- **Embeddings:** BAAI/bge-small-en-v1.5 (384-dim, CPU-based, decoupled from LM Studio)
- **Generation:** LM Studio (10.10.6.56:1234)
  - Campaign default: `qwen/qwen3-14b`
  - Novels default: `lumimaid-v0.2-12b` (larger context, better for prose)

### Efficiency vs Grep

| Metric | RAG | Grep |
| --- | --- | --- |
| Query time | 0.34s | 1.07s |
| Results | 6 curated chunks | 378+ raw matches |
| Relevance | Semantic ranked | Keyword only |
| Natural language | ✓ Yes | ✗ No |
| Grounded generation | ✓ Yes (LM Studio) | ✗ No |
| Break-even | ~50 queries | — |

**Verdict:** RAG is the default. Grep only for exact code/syntax matches (never lore).

### Troubleshooting

**"No results found"**
- Check spelling: `search_lore("Salvault"...)` won't find "Salsvault"
- Try synonyms: `search_lore("ancient lab", collection="campaign")`
- Verify content is indexed: `curl http://10.10.6.56:8100/stats`

**"Results are off-topic"**
- Rephrase as natural language: instead of "Croaker Cave", try "where did the party fight frogs?"
- Increase k: `search_lore(..., k=10)` for more results to filter

**Generation hangs (502 error)**
- GPU box may be running another LLM. Free VRAM on `10.10.6.56`.
- Search still works (embeddings are CPU-only).

**Index is stale after edit**
- Manual: `node tools/lore-rag/indexer.mjs campaign`
- CI auto-reindex on push to main (runs in workflow)

---

**Default: Use RAG for all lore research.** It's 3x faster than grep and understands what you're actually asking.
