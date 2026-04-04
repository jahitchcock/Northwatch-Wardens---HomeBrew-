---
name: canon-check
description: Check Northwatch Wardens content for canonical consistency. Use when reviewing adventure text, NPC descriptions, world-building, or player-facing material for geography errors, unknown NPCs, broken link rules, or tone issues. Also auto-activates when the user asks to review, proofread, or validate campaign content.
argument-hint: [file-path|"check all"|paste-text]
allowed-tools: Read Grep Glob
---

Check content for canonical consistency with the Northwatch Wardens campaign.

Target: **$ARGUMENTS**

## Step 1 — Determine scope

| Input | Action |
|-------|--------|
| File path | Read that file |
| Pasted text | Analyze it directly |
| "check all" or no argument | Scan all `.md` files in `Season 1/` and `World Building/` — exclude `DMEyesOnly/` unless the user specifically asks for DM content |

Load [canonical-data.md](references/canonical-data.md) before running any checks.

## Step 2 — Geography check

Flag any location name **not** in the canonical Northreach list or the acceptable off-map references (both in [canonical-data.md](references/canonical-data.md)).

Use Grep to scan for capitalized place-like nouns: inn names, village names, "X Village", "X Cave", "X Tower", etc.

## Step 3 — NPC name check

Read `Season 1/Campaign Assets/DM Guild Roster.md` for the authoritative character list.

Flag any named character not in the roster. Don't flag generic roles ("the innkeeper", "a farmer", "the bandits") — only flag specific proper names.

## Step 4 — Player-facing content check

Only run this for files listed in `build/players-guide-toc.json`.

Flag:
- Markdown file links: any `[text](path/to/file.md)` pattern
- Repository structure references: paths containing `Season 1/`, `Premade PCs/`, `Adventures/`, etc.
- GitHub-specific content

## Step 5 — Tone check

Only run if the user explicitly requested a tone review.

Flag:
- PC emotion dictation: "you feel", "you sense", "you are overcome with", "you notice a feeling of"
- Generic fantasy clichés: "ancient evil", "mystical power", "dark forces awakening", "eldritch energies", "arcane energy"
- Overwrought description: more than 3 adjectives modifying a single noun

## Step 6 — Report

Group findings by check type. For each issue:
- File and approximate line number
- The flagged text (quoted)
- Suggested correction

If nothing flagged: "No canonical issues found in [scope]."

## Step 7 — Offer to fix (player-facing links only)

If player-facing link issues were found:
"I can convert these file links to chapter references automatically (e.g., `[text](file.md)` → `**Chapter X: Title**`). Want me to make those changes?"

Do not edit anything without explicit approval.
