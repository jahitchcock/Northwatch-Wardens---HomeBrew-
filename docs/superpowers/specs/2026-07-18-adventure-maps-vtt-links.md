# Adventure Maps → VTT Links

**Date:** 2026-07-18  
**Feature:** Add map sidebar with control panel to adventure scenes, allowing one-click send to VTT with effect configuration.  
**Status:** Design approved, ready for implementation

---

## Overview

Adventure scenes will display a "Maps" callout sidebar showing buttons for each location's map. Clicking a button opens a modal control panel where the DM can preview the map, adjust VTT effects (darkness, grid, weather), and send the map to the TV display in one workflow.

**User goal:** Minimize friction between reading an adventure and displaying its maps on the VTT. No mode-switching, no copy-paste URLs.

---

## Data Structure

### Frontmatter Format

Adventure scene files (e.g., `adventures/season-1/the-pale-sickness/01-palebank-investigation.md`) add a `maps:` field:

```yaml
---
scene: 1
title: Palebank Investigation
location: Palebank Village — Urgon's cabin, Pelc's Curiosities, Tulgi's cabin, Irven's home
maps:
  - location: "Urgon's Cabin"
    file: "pale-sickness-urgons-cabin.png"
  - location: "Pelc's Curiosities"
    file: "pale-sickness-pelcs-curiosities.png"
  - location: "Tulgi's Cabin"
    file: "pale-sickness-tulgi-cabin.png"
  - location: "Irven's Home"
    file: "pale-sickness-irven-home.png"
---
```

**Fields:**
- `location` (string): Human-readable location name, displayed on the button
- `file` (string): Filename from `web/public/maps/` (e.g., `pale-sickness-urgons-cabin.png`)

**Constraints:**
- `maps:` is optional (scenes without maps show no sidebar)
- `file` must exist in `web/public/maps/` (validation TBD — warn if missing)
- Order of entries is order of buttons in sidebar

---

## Frontend UI

### Maps Sidebar

**Location:** Below scene title in adventure view  
**Condition:** Rendered if `maps:` array is non-empty  
**Appearance:** Callout box (similar to existing `{{note}}` style in Homebrewery)

```
┌────────────────────────────────┐
│ MAPS FOR THIS SCENE            │
├────────────────────────────────┤
│ [📍 Urgon's Cabin]             │
│ [📍 Pelc's Curiosities]        │
│ [📍 Tulgi's Cabin]             │
│ [📍 Irven's Home]              │
└────────────────────────────────┘
```

Each button is clickable and triggers the modal.

### Control Panel Modal

**Trigger:** Click any map button in sidebar  
**Layout:** Centered modal, ~600px wide, auto-height

```
┌─────────────────────────────────────┐
│ Urgon's Cabin                   [×] │
├─────────────────────────────────────┤
│                                     │
│  [Map preview image]                │
│  (pale-sickness-urgons-cabin.png)   │
│                                     │
├─────────────────────────────────────┤
│ Darkness:  [████████░░] 80%         │
│                                     │
│ ☐ Grid on/off                       │
│                                     │
│ Weather:  [Dropdown: None ▼]        │
│           ├─ None                   │
│           ├─ Rain                   │
│           ├─ Snow                   │
│           ├─ Fog                    │
│           └─ Fire                   │
│                                     │
│      [Send to VTT]  [Close]         │
└─────────────────────────────────────┘
```

**Components:**
- **Map preview:** Display the map file at reasonable size (constrained to modal width)
- **Darkness slider:** 0–100% (maps to `darkness` in VTT state, 0 = no darkness, 100 = full black)
- **Grid toggle:** Boolean checkbox
- **Weather effect dropdown:** None / Rain / Snow / Fog / Fire
- **Send to VTT button:** Broadcasts current state to VTT
- **Close button:** Dismisses modal without sending

**Initial state:**
- Darkness: 0%
- Grid: off
- Weather: None

---

## Backend API

### Existing Endpoint (No Changes)

The feature reuses the existing `/api/vtt-screen` POST endpoint (already implemented in `web/server.js`).

**Request body:**
```json
{
  "type": "map",
  "url": "http://localhost:5050/maps/pale-sickness-urgons-cabin.png",
  "darkness": 80,
  "grid": true,
  "effects": ["snow"]
}
```

**Behavior:**
- Updates `vttState` in memory
- Persists to `web/data/vtt-state.json` for restart recovery
- Broadcasts to all connected WebSocket clients (VTT + player screens)

No new backend code required.

---

## Data Flow

```
Adventure markdown with maps: frontmatter
         ↓
DM Panel parses YAML → maps array
         ↓
Render Maps sidebar with buttons
         ↓
DM clicks button → Modal opens
         ↓
DM adjusts darkness/grid/weather
         ↓
DM clicks "Send to VTT"
         ↓
POST /api/vtt-screen with state
         ↓
vttState updated, broadcast to all clients
         ↓
VTT display updates (map + effects)
```

---

## Implementation Scope

### Files to Create

None (reuse existing components).

### Files to Modify

1. **DM Panel frontend** — Add maps sidebar & modal UI (location: `web/public/app.js` or a new `maps-panel.js`)
2. **Adventure scene markdown files** — Add `maps:` frontmatter (one-time bulk addition)

### Files NOT Modified

- `web/server.js` — Existing `/api/vtt-screen` endpoint handles everything
- `web/public/vtt.html` — No changes to VTT display logic

---

## Error Handling

**Missing map file:**
- If `file` points to a non-existent image in `web/public/maps/`:
  - Modal still opens
  - Placeholder text: "Map file not found: `filename.png`"
  - Send button disabled until a valid map is available
  - DM alerted to check filename in adventure frontmatter

**No maps defined for scene:**
- Maps sidebar does not render
- No error shown (this is normal for some scenes)

---

## Testing Checklist

- [ ] Modal opens/closes without error
- [ ] Map preview loads and displays correctly
- [ ] Darkness slider updates in real-time (visual feedback)
- [ ] Grid toggle works (check/uncheck)
- [ ] Weather effect dropdown selects all options
- [ ] "Send to VTT" broadcasts to connected VTT clients
- [ ] Effects persist after send (darkness, grid, weather all visible on VTT)
- [ ] Session restart preserves last VTT state from `vtt-state.json`
- [ ] Multiple scenes with different maps send correctly
- [ ] Missing map file shows appropriate error

---

## Future Enhancements (Out of Scope)

- Bulk map upload UI
- Map preview gallery
- Save/load effect presets per scene
- Per-location player-visible fog-of-war masking (requires dungeon-toolkit integration)

---

## Notes

**Canvas/Token Support:** This feature handles still map images only. If future work requires placing tokens/markers on maps, the modal would need to evolve into a full map toolkit (out of scope for this feature).

**Performance:** Map images are static files served by Express; no performance concerns for typical adventure use (5–10 maps per adventure).

**Backwards Compatibility:** Adventures without `maps:` frontmatter are unaffected. Maps sidebar only renders if `maps:` array exists.
