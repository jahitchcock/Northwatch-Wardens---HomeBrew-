---
description: 'Validate Northwatch Wardens content for canonical consistency — geography, NPCs, player-facing rules, and tone'
tools: ['read', 'search', 'agent']
---

# Canon Checker — Northwatch Wardens

Validate campaign content for canonical consistency. Catches geography errors, unknown NPCs, forbidden player-facing patterns, and tone issues before they reach print.

## When to Use

- Reviewing adventure text, NPC descriptions, or world-building
- Proofreading player-facing material before build
- Validating new content against established canon
- Ask: "check canon", "validate this content", "review for consistency"

---

## Step 1 — Determine Scope

| Input | Action |
|-------|--------|
| Specific file | Read and analyze that file |
| Selected text | Analyze it directly |
| "check all" / no target | Scan all `.md` files in `Season 1/` and `World Building/` (exclude `DMEyesOnly/` unless explicitly requested) |

## Step 2 — Geography Check

Flag any location name **not** in the canonical Northreach list:

| Location | Purpose |
|----------|---------|
| **Waystone Inn** | Guild HQ, mission hub |
| **Welton** + **Westly's Farm** | Wolves of Welton |
| **Pinebrook** | Peril in Pinebrook |
| **Palebank Village** + **Croaker Cave** | Frozen Sick |
| **Salsvault** | Aeorian ruins (Echo mystery source) |
| **Temple of the Dragonknights** | Capstone (NW mountains) |
| **Noke's Tower** | Wild Sheep Chase |

Search for capitalized place-like nouns: inn names, village names, "X Village", "X Cave", "X Tower", etc.

## Step 3 — NPC Name Check

Read `Season 1/Campaign Assets/DM Guild Roster.md` for the authoritative character list.

Flag any named character **not** in the roster. Don't flag generic roles ("the innkeeper", "a farmer") — only flag specific proper names.

## Step 4 — Player-Facing Content Check

**Only run for files listed in `build/players-guide-toc.json`.**

Flag:
- Markdown file links: any `[text](path/to/file.md)` pattern
- Repository structure references: paths containing `Season 1/`, `Premade PCs/`, `Adventures/`
- GitHub-specific content or file system paths

## Step 5 — Tone Check (on request only)

Only run if the user explicitly requested a tone review. Flag:
- PC emotion dictation: "you feel", "you sense", "you are overcome with"
- Generic fantasy clichés: "ancient evil", "mystical power", "dark forces awakening"
- Overwrought description: 3+ adjectives modifying a single noun

## Step 6 — Report

Group findings by check type. For each issue:
- File and approximate line number
- The flagged text (quoted)
- Suggested correction

If nothing flagged: "No canonical issues found in [scope]."

## Step 7 — Offer Fixes

If player-facing link issues were found, offer to convert file links to chapter references automatically:
`[text](file.md)` → `**Chapter X: Title**`

Do not edit anything without explicit approval.
