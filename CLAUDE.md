# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Northwatch Wardens: Season One — modular D&D 5e guild campaign set in Northreach (world: Aevoria). This repo generates two PDF-ready Homebrewery guides: **The Adventurer's Guide to Aevoria** (player-facing, printed) and **A DM's Guide to Aevoria** (adventures + secrets). It also hosts a separate narrative-fiction project, **the Novels** (see below).

This repo has two parallel sets of agent instructions: this file (`CLAUDE.md`) and `AGENTS.md`. When they disagree on build mechanics, `AGENTS.md` is the more current source — it documents a print-pipeline reorg that this file predates.

## DM Panel (Primary Interface)

The web dashboard is the primary runtime tool for campaign management. It runs persistently via **pm2** (auto-starts on boot, auto-restarts on crash or file changes).

```bash
pm2 status dm-panel         # Check if running
pm2 restart dm-panel        # Redeploy after changes (or: cd web && npm run deploy)
pm2 logs dm-panel           # Tail logs
pm2 stop dm-panel           # Stop
cd web && npm run up        # Start if not running
```

Config: `web/ecosystem.config.js`. Logs: `web/logs/`. File watcher auto-restarts on changes to `server.js`, `lib/`, `public/`, `views/`.

Features: file browser (all campaign markdown), NPC viewer, party character sheets, session tracker, seasonal calendar, random encounter/treasure generators, 5etools integration (at port 2014 on same host), WebSocket terminal.

NPC files: `npcs/core/` (canonical, recurring), `npcs/season-1/` (adventure-specific). Portrait images served from `web/public/portraits/`.

## Build (Print Pipeline)

```bash
./build.sh                  # Both guides
./build.sh --players        # Player's Guide only
./build.sh --dms            # DM's Guide only
node build.js [--players | --dms]
python scripts/build/add_page_footers.py  # Regenerate footers (auto-runs in build)
```

First run auto-installs npm deps. Output lands in `build/`. GitHub Actions auto-builds on push to `main`.

> **Build currently broken (per `AGENTS.md`):** source content was moved into `_print/`, but the TOC JSON paths (`build/players-guide-toc.json`, `build/dms-guide-toc.json`) still point at the old root-level locations, so builds fail with "File not found". The live build entrypoint is now `_print/build.js` (and `npm run build` in `_print/`). Verify with `node _print/verify-build.js` before claiming a build succeeded. See `AGENTS.md` for the full pipeline and the Homebrewery ↔ source unbuild/sync workflow.

## Architecture

1. Source `.md` files live in `World Building/`, `Season 1/Adventures/`, etc.
2. TOC configs (`build/players-guide-toc.json`, `build/dms-guide-toc.json`) define file inclusion + order
3. `build.js` → `scripts/build/add_page_footers.py` → concatenate → render via `homebrewery-renderer.js` → `.md`/`.txt`/`.html` in `build/`

Edit TOC JSON to add/remove content — never edit `build/*.md` directly (generated outputs).

**File formats:** `.md` = Homebrewery V3 (NOT standard markdown; see `.github/HOMEBREWERY_V3_GUIDE.md`). `.xml` = Game Master 5e v5 (root: `<data version="5">`, NOT `<compendium>`). `.json` = D&D 5e stat block data.

## Content Separation (Critical)

Player-facing files (in `build/players-guide-toc.json`) will be **physically printed**. They must NEVER contain:
- File/path links: `[text](../path/file.md)` — use chapter refs: `**Chapter 4: The Northwatch Wardens**`
- Repo structure refs: `Premade PCs/`, `Season 1/Adventures/` — use: `Available from your DM`

DM-facing files can use repo references freely.

## Adventure File Structure (Standard)

Every adventure lives in its own folder under `adventures/season-N/`. Never create a flat `.md` file for an adventure.

```text
adventures/season-N/
  adventure-name/
    index.md          ← main table-reader doc (required)
    01-scene-one.md   ← optional scene splits for long adventures
    02-scene-two.md
    handouts/
      xx-1-handout.md
      MANIFEST.md
  general-handouts/   ← season-level handouts not tied to one adventure
```

When scaffolding a new adventure use the `/new-adventure` skill — it follows this layout automatically.

## Novels — *The Old Songs of Aevoria*

A standalone five-book narrative-fiction series under `Novels/`, set in **deep-time / mythic-age Aevoria** (the campaign world's distant ancestor). It is a separate project from the campaign guides and ships under the pen name **J. H. Thorne** (covers, title pages, series credits).

- **Series bible (single source of truth):** `Novels/00 Series Outline/Files/Old_Songs_of_Aevoria_MASTER_REFERENCE.md`. Author-voice rules: `Novels/Style_Sheet.md`. Per-book material under `Novels/01 Book One/` … `Novels/05 Book 4/` (chapters + outline/beat sheets). Book One (*She Who Would Not Be Silent*) is the most developed: Parts One–Two drafted (Ch. 1–22), Part Three pending.
- **Canon firewall (CRITICAL — inverse of the campaign's rule):** the novels use **only** the native Aevoria pantheon, magic, and cultures. They must **NEVER** reference Aeor, the Calamity, the **Aeorian Echo**, Eclipse Day, or any current-campaign NPC/location/organization — explicitly **including the Northwatch Wardens**. (Campaign adventures *seed* Echo clues; novels must contain *zero*.)
- **Voice:** first-person **Elowen** (a Memory-Keeper), past tense, three deliberately contrasted registers — narration / reflection / action. Restraint is the house style.
- **Tooling:** the **`novelist`** skill loads the full voice guide + per-character dialogue voices; the **`jh-thorne`** agent drafts/edits chapters and runs cross-chapter consistency and firewall passes. Do not confuse `jh-thorne` (novels) with the **`author`** agent (campaign adventure prose). Before any prose work on the series, read the master reference and `Style_Sheet.md`.

## Asset Generation (portraits, maps, covers)

NPC portraits, battlemaps, and book covers are produced via the **image-gen** MCP server (`f:\NewProject\image-gen`), which submits workflows to **ComfyUI** on the remote R730 (Tesla P40 24 GB, `10.10.6.56:8188`). image-gen's `.env` handles the remote URL; Northwatch just invokes MCP tools. Tool results embed base64; parse out the `result.path` rather than reading the whole payload.

### New capabilities (Q3 2026)

- **HQ Pipelines (GGUF-optimized):** `generate_*_hq()` variants deliver quality-first results via quantized models on the P40: `generate_battlemap_topdown_sdxl_hq()` (with hi-res fix + ESRGAN upscale), `generate_image_face_locked_hq()` (InstantID + GFPGAN restore), and `generate_image_flux()` (Flux 1.0 GGUF text-to-image).
- **Feedback loop for batches:** Set `feedback=True` in generation calls to enable multi-image batches that critique each result (anatomy + vision), revise the prompt, and retry — useful for iterating on key NPC portraits or battlemap aesthetics.
- **Model rotation during feedback:** Optionally rotate between `gemma-3-4b-it`, `lumimaid-v0.2-12b`, `mythomax-l2-13b` for diverse critiques.
- **Viewer enhancements (in progress):** Future web UI for gallery browsing, slideshow, and face-locking from selected images.

### Checkpoint guidance

Use these for clean, grounded fantasy:
- **`dreamshaper_8`** (SDXL): painterly, atmospheric — good for battlemaps, tavern scenes, environment art.
- **`realisticVisionV60B1`** or **`realvisxlV50`** (SDXL): clean SFW portraits — best for NPC faces.
- **Flux 1.0** (GGUF): cutting-edge quality, recommended for hero art (book covers, key NPCs).

For HQ variants, call image-gen directly: `.venv\Scripts\python.exe image_pipeline.py --prompt "..." --hq` or use the MCP tools (which auto-select HQ where available).

## Canonical Geography

Never invent locations. All Northreach locations:

| Location | Purpose |
|----------|---------|
| **Waystone Inn** | Guild HQ, mission hub |
| **Welton** + **Westly's Farm** | Wolves of Welton |
| **Pinebrook** | Peril in Pinebrook |
| **Palebank Village** + **Croaker Cave** | The Pale Sickness |
| **Salsvault** | Aeorian ruins (Echo mystery source) |
| **Temple of the Dragonknights** | Capstone (NW mountains) |
| **Noke's Tower** | Wild Sheep Chase |

## Conventions

**Homebrewery:** `\page` breaks, `\column` columns. Stat blocks: `{{monster,frame}}`. Boxes: `{{note}}`, `{{descriptive}}`. Page footers auto-generated by `scripts/build/add_page_footers.py`. Full syntax → `.github/HOMEBREWERY_V3_GUIDE.md`.

**XML (Game Master 5e):** Nest `campaign > adventure > encounter > combatant > monster`. Unique UIDs required. CDATA for long text. For XML work → DMHelper agent (`.github/agents/DMHelper.agent.md`).

**Content Design:** Adventures are order-independent, support 2–5 players, include subtle Aeorian Echo clues. Guild NPCs: **Marshal Brenna Thorne** (field), **Steward Mara Fenwick** (quartermaster), **Lorewarden Elric Vael** (arcane). Full roster: `npcs/core/` (browse via web dashboard). Tone: grounded low-magic frontier.

## Commands

| Command | Purpose |
|---------|---------|
| `/build [--players\|--dms]` | Build guides, report output |
| `/validate-xml` | Check XML structure, UIDs, required fields |
| `/homebrewery-sync` | Sync Homebrewery UI edits back to repo source files |
| `/dm-assistant [intent]` | Route to campaign skill by intent |
| `/code-review` | Multi-agent PR review (5 parallel reviewers) |

To start the web dashboard: `cd web && node server.js` → open `http://localhost:5050`

## Skills

29 skills in `.claude/skills/`. Auto-activate on matching context or invoke explicitly.

### Campaign (D&D / Northwatch Wardens)

| Skill | Use |
|-------|-----|
| `canon-check` | Validate geography, NPCs, player-facing links, tone against canon |
| `new-adventure` | Scaffold adventure with template + Aeorian Echo hooks |
| `new-npc` | Create NPC: Homebrewery stat block + XML entry + roster update |
| `session-prep` | One-page DM session prep doc |
| `gm-craft` | DM storytelling: fail forward, NPC motivation, scene pacing, improv |
| `dm-assistant` | Intent router → delegates to session-prep / new-adventure / new-npc / canon-check |
| `dnd` | D&D 5e SRD API: dice rolls, spell/monster lookup, character gen, encounters |
| `dnd-map-builder` | Next.js interactive map tool for DMs |

### Development Workflow

| Skill | Use |
|-------|-----|
| `observe-plan-act-reflect` | **Outer loop for all multi-step tasks** — observe state, plan, act one step, reflect and iterate |
| `brainstorming` | **Mandatory** before creative work — explores intent, requirements, design |
| `writing-plans` | Before multi-step tasks — produces reviewable implementation plan |
| `executing-plans` | Run a written plan with review checkpoints |
| `systematic-debugging` | Before proposing fixes — structured bug investigation |
| `verification-before-completion` | Before claiming done — runs verification commands, evidence required |
| `requesting-code-review` | Before merging — verify all requirements met |
| `receiving-code-review` | Process review feedback with technical rigor, not blind agreement |
| `adversarial-reviewer` | Critical self-review via hostile reviewer personas |
| `test-driven-development` | TDD: tests before implementation code |
| `finishing-a-development-branch` | Branch completion: merge / PR / cleanup options |
| `using-git-worktrees` | Isolated feature work with worktree management |

### Orchestration & Meta

| Skill | Use |
|-------|-----|
| `dispatching-parallel-agents` | 2+ independent tasks → parallel subagents |
| `subagent-driven-development` | Execute plan tasks via subagents in current session |
| `using-superpowers` | Skill discovery at conversation start |
| `skill-creator` | Create, modify, eval, and benchmark skills |
| `writing-skills` | Author, edit, and verify skill files before deployment |
| `senior-architect` | System architecture, ADRs, tech stack, dependency analysis |
| `engineering-skills` | Meta-collection: 23 engineering skills (architecture → DevOps → security) |

### External Tools (GoodMem)

| Skill | Use |
|-------|-----|
| `help` | GoodMem overview and setup guide |
| `mcp` | GoodMem MCP server tools reference |
| `python` | GoodMem Python SDK for embedders, spaces, memories, retrieval |

## Reference Files

| File | Purpose |
|------|---------|
| `.github/HOMEBREWERY_V3_GUIDE.md` | Homebrewery V3 syntax (single source of truth) |
| `.github/copilot-instructions.md` | Coding standards + content guidelines |
| `.github/agents/DMHelper.agent.md` | DMHelper agent: XML, stat blocks, D&D API |
| `build/players-guide-toc.json` | Player's guide chapter structure |
| `build/dms-guide-toc.json` | DM's guide chapter structure |
| `npcs/core/` | Canonical NPC files (browse via web dashboard) |
| `npcs/season-1/` | Adventure-specific NPCs |
| `web/public/portraits/` | NPC portrait images |
| `player-characters/` | Player character sheets |

## Physical & Digital Map Resources

Available for scanning, referencing, or borrowing tiles for adventures:

| Resource | Location | Notes |
| -------- | --------- | ----- |
| Digital dungeon tiles | `C:\Users\joshu\OneDrive\Documents\dnd\08 - DungeonTiles` | Ready to use in VTT or print |
| Digital maps library | `C:\Users\joshu\OneDrive\Documents\dnd\07 - Maps` | Pre-made maps for reference |
| **Tactical Maps Reincarnated** | Physical (owned) | Double-sided poster maps, mix-and-match for encounters |
| **Gloomhaven** | Physical (owned) | Modular dungeon tiles — borrow for cave/dungeon layouts |

When designing encounter spaces: check these resources before generating new maps. Gloomhaven tiles work especially well for cave systems (Croaker Cave) and modular dungeon corridors (Salsvault).
