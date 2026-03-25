# Northwatch Wardens — Markdown Templates

This directory contains reusable Markdown templates for every major lore entity type in the Northwatch Wardens campaign. Copy the appropriate template when creating new canon content.

---

## Available Templates

| Template | File | Use For |
|----------|------|---------|
| NPC | [NPC_Template.md](./NPC_Template.md) | Named characters, recurring contacts, villains |
| Location | [Location_Template.md](./Location_Template.md) | Towns, landmarks, dungeons, buildings |
| Faction | [Faction_Template.md](./Faction_Template.md) | Guilds, cults, governments, trade groups |
| Item | [Item_Template.md](./Item_Template.md) | Magic items, quest objects, heirlooms |
| Quest | [Quest_Template.md](./Quest_Template.md) | Contracts, adventure hooks, side quests |
| Region | [Region_Template.md](./Region_Template.md) | Macro-regions, territories, wilderness zones |
| Story Arc | [Story_Arc_Template.md](./Story_Arc_Template.md) | Campaign arcs, season throughlines, mysteries |

---

## How to Use

1. **Copy** the appropriate template file into the correct content directory.
2. **Rename** the file to match the entity (e.g., `Mara_Fenwick.md`).
3. **Fill in** all relevant sections. Delete sections that don't apply.
4. **Update the metadata header** at the top — tags, status, and links are critical for searchability.
5. **Add internal links** to related NPCs, locations, factions, or quests.

---

## Metadata Header Reference

Every lore file should begin with a metadata block:

```
<!--
  Tags: <comma-separated tags>
  Status: <Canon | Draft | Retired | Speculation>
  Type: <NPC | Location | Faction | Item | Quest | Region | Arc>
  Region: <Northreach | Solaris Dominion | Off-Map | etc.>
  Linked: <comma-separated related file names>
-->
```

**Tag vocabulary:**

- **Entity type:** `NPC`, `Location`, `Faction`, `Item`, `Quest`, `Region`, `Arc`
- **Region:** `Northreach`, `Palebank`, `Welton`, `Pinebrook`, `Off-Map`
- **Affiliation:** `Warden`, `Cult`, `Consortium`, `Independent`
- **Season:** `Season-1`, `Season-2`, etc.
- **Arc:** `Arc-Aeorian-Echo`, `Arc-Guild-Founding`, etc.
- **Visibility:** `Player-Safe`, `DM-Only`

**Status values:**

| Status | Meaning |
|--------|---------|
| `Canon` | Finalised and in play |
| `Draft` | Work in progress, not yet used in a session |
| `Retired` | No longer active but kept for reference |
| `Speculation` | Idea being explored, not committed |

---

## Internal Linking Convention

Use standard Markdown relative links to connect related files:

```markdown
See also: [Marshal Brenna Thorne](../World%20Building/Regions/Northreach/People_of_Northreach.md#marshal-brenna-thorne)
```

Link targets to include:
- NPCs → their faction and home location
- Locations → their region and resident NPCs
- Quests → involved NPCs and target locations
- Arcs → constituent quests and key NPCs

---

## Directory Placement Guide

| Content Type | Destination Directory |
|---|---|
| Player-safe NPC lore | `World Building/Regions/Northreach/People_of_Northreach.md` |
| DM-only NPC secrets | `World Building/DMEyesOnly/People_Secrets.md` |
| Player-safe locations | `World Building/Regions/Northreach/Places_of_Northreach.md` |
| DM-only location secrets | `World Building/DMEyesOnly/Places_Secrets.md` |
| Faction overviews | `World Building/Organizations/` |
| Narrative arcs | `arcs/` |
| Unfinished ideas | `scratchpad/` |
