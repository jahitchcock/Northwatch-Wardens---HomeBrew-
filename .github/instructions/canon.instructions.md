---
applyTo: '**/*.md'
description: 'Canonical world data for Northwatch Wardens and Aevoria — geography, NPCs, tone, player-facing rules. Auto-loads on all markdown files.'
---

# Northwatch Wardens — Canon Rules

World: **Aevoria** | Region: **Northreach** (frontier territory)

## Canonical Locations

Never invent new locations unless explicitly directed. All valid Northreach locations:

| Location | Position | Purpose |
|----------|----------|---------|
| Waystone Inn | Center | Guild HQ, mission hub |
| Welton | Southwest | Farming village (Wolves of Welton) |
| Westly's Farm | West of Welton | Wolf attack site |
| Shepherd's Crook Inn | Inside Welton | Village social hub |
| Pinebrook | Southeast | Trading village (Peril in Pinebrook) |
| Palebank Village | Northeast coast | Seaside settlement (The Pale Sickness) |
| Croaker Cave | North of Palebank | Bandit hideout |
| Salsvault | Far north of Palebank | Buried Aeorian ruins (source of Echo) |
| Temple of the Dragonknights | Northwest mountains | Cult stronghold (capstone) |
| Noke's Tower | West of Waystone | Wizard's tower (Wild Sheep Chase) |

### Acceptable Off-Map References

These exist in Aevoria but the party doesn't visit them in Season One. Referencing them is fine; making them a destination is not.

Solaris · Nullwood / Vaeltharyn · Stonebound Depths / Khardûn-Tharum · Vharoxis · Solace Nexus · Divinity's Beacon

## Core NPCs

**Leadership Triad** (always valid — no roster check needed):

| NPC | Role |
|-----|------|
| Marshal Brenna Thorne | Field commander, tactical decisions |
| Steward Mara Fenwick | Quartermaster, logistics |
| Lorewarden Elric Vael | Arcane scholar, investigation support |

**Full roster:** `npcs/core/` — browse via web dashboard (http://localhost:5050) or read files directly. Check before introducing any named NPC.

## The Aeorian Echo

All adventures connect to a spreading arcane phenomenon: magic from buried Aeorian ruins (Salsvault) destabilizes the frontier. Design rules:

- Each adventure includes **subtle clues** — never full revelation
- Adventures are **order-independent** — players discover the mystery in any sequence
- Clues should feel natural to the scene, not forced exposition

## Player-Facing Content Rules

**Applies to files in `build/players-guide-toc.json` only.** These compile to a printed PDF.

| Banned | Use Instead |
|--------|-------------|
| `[text](path/file.md)` | `**Chapter X: Title**` |
| `Season 1/Adventures/`, `Premade PCs/` | "Available from your DM" |
| Any repo path or GitHub reference | Remove entirely |

DM-facing files (`Season 1/`, `DMEyesOnly/`) can use repo references freely.

## Tone

**Correct tone:** Grounded frontier realism. Things are hard, scarce, and earned.

- Specific, tactile sensory details: *"the mud is ankle-deep, cold, and smells of rot"*
- Understated menace: *"the silence where birdsong should be"*
- Observation without interpretation: *"three crows sit on the fence post. None of them have moved."*
- Read-aloud text: 2–4 sentences, sensory-first, never dictate PC emotions

**Flag these patterns:**

| Category | Examples |
|----------|----------|
| Emotion dictation | "you feel scared", "you sense something is wrong", "you are overcome with" |
| Fantasy clichés | "ancient evil", "mystical power", "dark forces awakening", "eldritch energies", "chosen one" |
| Overwrought prose | 3+ adjectives on one noun, 4+ adverbs in one sentence |

## Content Design Principles

1. **Stay canonical** — use established locations, NPCs, and lore
2. **Order independence** — each adventure stands alone
3. **Scalability** — design for 2–5 players, variable attendance
4. **Moral complexity** — multiple resolution paths, no single "right" answer
5. **Frontier atmosphere** — low-magic setting with arcane mysteries surfacing
