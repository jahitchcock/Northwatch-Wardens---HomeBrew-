# Combat Tracker — Add Combatants

**Date:** 2026-05-25  
**Status:** Approved  

## Overview

Enhance the Combat Tracker modal with a tabbed add panel that lets the DM quickly add players, NPCs, and monsters without manual data entry. Monsters can be pulled from adventure files or the 5etools bestiary.

## Add Panel

A collapsible panel at the bottom of the combat tracker modal. Toggled by a **`+ Add`** button in the tracker header. Collapsed by default; opening it reveals four tabs.

## Tabs

### Players

- Fetches from existing `GET /api/characters`
- Lists all party members (John, Kuetis, Perkia, Falcor) with class, AC, and max HP
- Members already in the combat list are **dimmed with a ✓** — clicking them does nothing (no double-add)
- Clicking `+ Add` on an available player reveals a small inline **initiative input field**
  - User types initiative manually (no auto-roll — party rolls dice themselves)
  - Pressing Enter or clicking Confirm adds them to the tracker as type `player`

### NPCs

- Fetches from new `GET /api/npcs` endpoint
- Server scans `npcs/core/` and `npcs/season-1/`, parses name + AC + HP from each markdown file
- Clicking `+ Add` **auto-rolls initiative** (1d20, or 1d20 + dex modifier if parseable) and adds as type `npc`

### Monsters (sub-tabbed: Adventure | 5etools)

**Adventure sub-tab:**

- Dropdown lists all adventure files from the `adventures/` directory tree (new `GET /api/adventures` endpoint)
- Selecting an adventure calls existing `GET /api/adventure-monsters?path=…`
- Each monster type shows a **count control** (default from file, adjustable ±)
- `+ Add` per row adds that monster type (one combatant per count), `Add All` adds every type at once
- Each added monster **auto-rolls its own initiative** (1d20)

**5etools sub-tab:**

- Search box calls new `GET /api/5etools/search?q=…` endpoint
- Server searches 5etools bestiary JSON data files; falls back to open5e SRD API if local files are not found
- Results show name, AC, HP, CR
- Clicking `+ Add` auto-rolls initiative (1d20) and adds as type `monster`

### Manual

Existing form unchanged: name, initiative, AC, HP, type dropdown.

## Initiative Rules

| Combatant type | Initiative behaviour |
|---|---|
| Player | Manual — inline input shown on add, user fills in |
| NPC | Auto-rolled on add (1d20 + dex mod if known) |
| Monster | Auto-rolled on add (1d20) |

Initiative is set **once per combatant** and never re-rolled between rounds.

## New API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/npcs` | GET | List NPCs from `npcs/core/` and `npcs/season-1/` with name, AC, HP |
| `/api/adventures` | GET | List adventure files for the Monsters tab dropdown |
| `/api/5etools/search?q=` | GET | Search bestiary by name — local 5etools JSON first, open5e fallback |

## Existing Endpoints Used

| Endpoint | Purpose |
|---|---|
| `GET /api/characters` | Party members for Players tab |
| `GET /api/adventure-monsters?path=` | Monster list for selected adventure |

## UI Behaviour

- `+ Add` button in tracker header toggles the add panel open/closed
- Panel opens to the last-used tab
- Adding a combatant does not close the panel (DM may add several in a row)
- Panel can be closed manually or by clicking `+ Add` again (toggle)
