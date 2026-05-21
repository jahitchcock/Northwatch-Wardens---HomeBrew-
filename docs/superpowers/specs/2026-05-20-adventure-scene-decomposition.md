# Adventure Scene Decomposition — Design Spec
*2026-05-20*

## Problem

Adventure files are single long markdown files (~150-200 lines). On mobile mid-session, a DM cannot quickly navigate to the right scene, find a stat block, or read a dialogue line without scrolling through unrelated content. Content is also sparse in three key areas: combat stats (brief one-liners only), room/location descriptions (minimal spatial detail), and NPC dialogue (personality notes rather than scripted exchanges).

## Solution

Decompose each adventure into a folder. Each folder contains:
- `index.md` — 1-screen quick-ref card (hook, NPC cheatsheet, all DCs flat, decision points, scene nav)
- One file per scene — full room description, full stat blocks, full NPC dialogue scripts, read-aloud, key rolls, escalation

**Pilot adventure:** The Pale Sickness (`adventures/season-1/the-pale-sickness/`)
Once approved, this structure becomes the template for all remaining adventures.

---

## File Structure

```
adventures/
  season-1/
    the-pale-sickness/          ← replaces the-pale-sickness.md
      index.md
      01-palebank-investigation.md
      02-croaker-cave.md
      03-journey-to-salsvault.md
      04-salsvault.md
      05-return-resolution.md
    wolves-of-welton/           ← future migration
    ...
  season-2/
    ...
```

The old `the-pale-sickness.md` file is removed once the folder is complete and verified.

---

## index.md Format

Must fit a single mobile screen without scrolling. Contains only what a DM needs to orient at the start of a session or between scenes.

```markdown
---
name: The Pale Sickness
season: 1
levels: "2-4"
sessions: "2-3"
type: investigation|exploration|combat
---

# The Pale Sickness

[2-sentence brief — what this adventure IS and its tone]

## Hook
[1 sentence] → [opening read-aloud, 3-4 lines max]

## Scenes
| # | Scene | Location |
|---|-------|----------|
| 1 | [name](01-palebank-investigation.md) | Palebank Village |
| 2 | [name](02-croaker-cave.md) | Croaker Cave |
| 3 | [name](03-journey-to-salsvault.md) | Icefields |
| 4 | [name](04-salsvault.md) | Salsvault |
| 5 | [name](05-return-resolution.md) | Palebank + Waystone |

## NPCs
| Name | Voice | Wants | Key Secret |
|------|-------|-------|------------|
| Elro Aldataur | Direct, haunted | Stop outbreak | … |
…

## All DCs
Medicine 10 (magical disease) · Arcana 12 (vial residue) · Persuasion 15 (Tulgi confession) · …

## Decision Points
- **Infected bandits:** let go / detain / cure one
- **Speed vs. prep:** rush Salsvault / stop at Cold Anchor
- **Selective curing:** who gets the antidote if vials are scarce
- **Salsvault:** destroy / preserve

## Hooks Forward
- Elric's debrief → Temple of the Dragonknights
- Salsvault artifacts → faction interest
```

---

## Scene File Format

Full detail for running a single scene without switching tabs.

```markdown
---
scene: 2
title: Croaker Cave
location: Smuggler hideout, cliffs west of Palebank
---

# Scene 2: Croaker Cave

**Setup:** [2-3 sentences of DM context — why this scene exists, what the bandits know/don't know]

---

## Read Aloud

> [Exact text to read when players arrive]

---

## Room Description

[Spatial + sensory detail — layout, sights, smells, sounds, what players can interact with.
Written as DM notes, not read-aloud. Enough to answer "what do I see when I look around?"]

---

## What Happens

[Bullet paths — choices, triggers, consequences. Full branching.]

---

## Stat Blocks

### [Creature Name]
*[Type], [alignment]*

**AC** X · **HP** XX (XdX+X) · **Speed** Xft

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| X (+X) | … | … | … | … | … |

**Saving Throws** …
**Skills** …
**Damage Immunities / Resistances** …
**Senses** …
**Languages** …
**CR** X

**Actions**
- **[Attack].** *[type] Attack:* +X to hit, reach Xft, one target. Hit: X (XdX+X) [type] damage.
- **[Special].** [Description]

**Reactions / Legendary Actions** (if applicable)

---

## Dialogue Scripts

### [NPC Name]

**If players enter hostile:**
> "[Exact line]"
> "[Follow-up if players don't respond]"

**If players mention the disease:**
> "[Exact line — panic, bargain, etc.]"

**If asked about the vials:**
> "[What they know / what they'll admit / what they hide]"

**If reduced to half HP / cornered:**
> "[Surrender line or threat]"

[Repeat per NPC present in scene]

---

## Key Rolls

| DC | Skill | Reveals / Changes |
|----|-------|-------------------|
| 10 | Insight | These people didn't know the vials were dangerous |
| 12 | Stealth | Gain surprise on bandits |
| 10 | Investigation | Chest beneath blankets; map scrap and note inside |

---

## Time Pressure

[What happens if players stall. What the DM does to move things along.]

---

## Escalation

[Scene-specific: what if players skip this, what if combat goes wrong, what if they try something unexpected]
```

---

## Stat Block Standard

Full 5e stat block — no shortcuts. Every field included:
- AC, HP (with dice formula), Speed
- All six ability scores with modifiers
- Saving throws (only if proficient)
- Skills (only if proficient)
- Damage immunities/resistances/vulnerabilities (if any)
- Condition immunities (if any)
- Senses + passive Perception
- Languages
- CR
- All actions with full attack notation (+X to hit, reach, targets, damage formula + type)
- Bonus actions, reactions, legendary actions where applicable
- Multiattack listed explicitly

Source: use existing brief stat lines in the current file as base; expand with 5e SRD values for standard monsters, DM-invented values for named NPCs.

---

## Dialogue Script Standard

- Written as exact quoted lines the DM can read verbatim or paraphrase
- Cover every likely player approach: hostile entry, social entry, specific questions, partial information, surrender/threat states
- NPC voice must match the existing personality note (e.g. Tulgi: "scared, defensive, dying")
- Each line ~1-3 sentences — long enough to convey the voice, short enough to read mid-session
- DM notes in brackets where subtext matters: `[She's lying] "I don't know anything about any vials."`

---

## Room Description Standard

- 2-4 sentences of spatial layout (what's where)
- 1-2 sentences of sensory detail (smell, sound, temperature, light)
- Bullet list of interactive elements (what players can examine, open, pick up)
- Any hidden elements noted separately: `**Hidden (DC X Investigation):** [what's there]`

---

## Scope

**Pilot:** The Pale Sickness only — 1 index + 5 scene files.

**After pilot review:** Apply same structure to all remaining season-1 adventures:
- Opening — Wolves at the Waystone
- Wolves of Welton
- Peril in Pinebrook
- The Wild Sheep Chase (+ The Bleating Grimoire variant)
- Temple of the Dragonknights
- (frozen-sick.md is a stub/alias — no decomposition needed)

**Season 2** adventures follow after season 1 is complete.

---

## Special Case: Salsvault (Scene 4)

Salsvault has 6 distinct rooms (Entrance Hall, Research Labs, Containment Hall, Construct Storage, Preservation Chamber, Central Control Room). These stay in a single file (`04-salsvault.md`) divided by `## Room:` headings — not 6 separate files. Rationale: a dungeon crawl requires context from prior rooms; switching files mid-crawl breaks immersion and adds navigation overhead. The DM scrolls once into the dungeon and stays there.

---

## Server.js Changes

The server currently serves `adventures/season-1/the-pale-sickness.md`. After migration it must handle folder requests by serving `index.md`.

- When a path resolves to a directory, check for `index.md` inside and serve it
- Scene files are served directly by their path (already works via existing static/preview routing)
- No changes needed to the file tree API — folders already show as expandable nodes

---

## Success Criteria

- DM can open the panel on mobile, tap an adventure, and reach a specific scene in ≤ 3 taps
- Every creature in every scene has a complete 5e stat block in the scene file
- Every NPC has scripted lines for all likely player approaches
- Every room/area has a spatial description the DM can read from without improvising the layout
- index.md fits a single mobile viewport without scrolling
