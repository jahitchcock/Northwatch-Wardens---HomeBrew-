# World Building

This folder is the **setting bible** for Northwatch Wardens: Northreach (Season One) plus the wider “off-map” world.

It’s organized so you can keep **player-safe lore** separate from **DM-only truth**, while also keeping reusable world reference material separate from season/module content (which lives under [Season 1/](../Season%201/)).

---

## ⚠️ Player vs DM Content

### ✅ PLAYER-SAFE FOLDERS
All content in these folders is safe for players to read:
- `Regions/` — Regional lore and gazetteer entries
- `Organizations/` — Factions, guilds, and institutions
- `Locations/` — Canonical location descriptions
- `Religion/` — Pantheons and faiths
- `Campaign Assets/` — Maps and visual resources

### 🚫 DM-ONLY FOLDERS
**SPOILER WARNING:** These folders contain campaign secrets and plot reveals:
- `DMEyesOnly/` — **DO NOT SHARE WITH PLAYERS** - Contains the truth behind the setting, NPC secrets, and the Aeorian Echo mystery

---

## Start Here

- **New to the campaign?** [How to Use This Book](./Introduction/How_To_Use_This_Book.md) — Guide for players on navigating the campaign materials
- **Player-facing primer (core):** [Northreach_Journal_and_Lore.md](./Regions/Northreach/Northreach_Journal_and_Lore.md)
- **Setting quick reference (DM + table-ready):** [Northreach_Setting_Primer.md](./Regions/Northreach/Northreach_Setting_Primer.md)
- **Player quick reference (costs & travel):** [Player_Quick_Reference.md](./Player_Quick_Reference.md)
- **Music / audio guidance:** [SongsOfTheNorthreach.md](./Regions/Northreach/SongsOfTheNorthreach.md)

---

## Table of Contents

### Player-Safe Lore

All content in World Building is safe for players, EXCEPT for files in [DMEyesOnly/](./DMEyesOnly/).

See the full **[Player Lore Index](../player-lore/README.md)** for a navigable list of all player-safe content.

### DM Content (Spoilers)

- [DMEyesOnly/](./DMEyesOnly/) — The truth behind the setting: secrets, motivations, and the Aeorian Echo.

See the full **[GM Lore Index](../gm-lore/README.md)** for a navigable list of all DM-facing content including arcs and secrets.

### World Reference (Reusable / Canon)

- [Introduction/](./Introduction/) — Player guides and campaign navigation resources.
- [Locations/](./Locations/) — Canonical location sheets (often off-map from Northreach).
- [Regions/](./Regions/) — Macro-regions and “Known World” worldbook entries.
- [Organizations/](./Organizations/) — Factions and institutions.
	- Northwatch Wardens charter lives here: [Organizations/Northwatch_Wardens/](./Organizations/Northwatch_Wardens/)
- [Religion/](./Religion/) — Pantheons, faiths, and religious lore.

### Assets

- [Campaign Assets/](./Campaign%20Assets/) — Maps and other setting-level assets.
- [Regions/Northreach/SongsOfTheNorthreach/](./Regions/Northreach/SongsOfTheNorthreach/) — Audio files / playlists.

### Workbench

- [Drafts/](./Drafts/) — Work-in-progress and archived development material.

---

## Campaign-Wide Organizational Structure

In addition to `World Building/`, the following root-level directories support the campaign workflow:

| Directory | Purpose |
|-----------|---------|
| [`/templates/`](../templates/) | Reusable Markdown templates for NPCs, Locations, Factions, Items, Quests, Regions, and Arcs |
| [`/arcs/`](../arcs/) | Narrative arc files: story beats, revelation ladders, character relationship tables |
| [`/player-lore/`](../player-lore/) | Index of all player-safe content |
| [`/gm-lore/`](../gm-lore/) | Index of all DM-facing content |
| [`/scratchpad/`](../scratchpad/) | Unstructured idea dump: fragments, early drafts, notes not yet canon |

---

## Metadata & Tagging System

All lore files use a standardized **HTML comment metadata header** at the top of each file. This enables fast GitHub search filtering and creates implicit relationships between entities.

### Metadata Format

```
<!--
  Tags: <comma-separated tags>
  Status: <Canon | Draft | Retired | Speculation>
  Type: <NPC | Location | Faction | Item | Quest | Region | Arc>
  Region: <Northreach | Solaris Dominion | Off-Map | etc.>
  Linked: <comma-separated related file names>
-->
```

### Tag Vocabulary

- **Entity type:** `NPC`, `Location`, `Faction`, `Item`, `Quest`, `Region`, `Arc`
- **Region:** `Northreach`, `Palebank`, `Welton`, `Pinebrook`, `Off-Map`
- **Affiliation:** `Warden`, `Cult`, `Consortium`, `Independent`
- **Season:** `Season-1`, `Season-2`, etc.
- **Arc:** `Arc-Aeorian-Echo`, `Arc-Guild-Founding`, etc.
- **Visibility:** `Player-Safe`, `DM-Only`

### Status Values

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
See also: [Marshal Brenna Thorne](./Regions/Northreach/People_of_Northreach.md#marshal-brenna-thorne)
```

Linking targets:
- NPCs → their faction and home location
- Locations → their region and resident NPCs
- Quests → involved NPCs and target locations
- Arcs → constituent adventures and key NPCs

---

## Relationship to Season 1

- **Adventures, encounters, and play materials:** [Season 1/Adventures/](../Season%201/Adventures/)
- **DM session tools + DM rosters:** [Season 1/DM_Resources/](../Season%201/DM_Resources/)

World Building is the **source of truth** for setting canon; Season 1 is where the campaign is run from.

---

## Northreach Canon Guardrails (Season One)

- Don’t invent new **Northreach** locations unless we explicitly decide to expand the Northreach map.
- Off-map world lore is welcome (use [Regions/](./Regions/) and [Locations/](./Locations/)); label it clearly as off-map when relevant.

