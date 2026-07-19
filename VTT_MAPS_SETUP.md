# VTT Maps Integration — Complete Setup Guide

**Status:** ✓ Maps generated, organized, and integrated into DM Panel

---

## What's Ready

### 1. **32 VTT-Ready Maps Generated**
- **Pale Sickness Adventure:** 13 location maps (Palebank, Croaker Cave, Salsvault 6 rooms + waypoint)
- **Generic Campaign:** 19 reusable maps (travel, taverns, shops, towns, etc.)

**Location:** `adventures/season-1/the-pale-sickness/maps/`
- `pale-sickness/` — 13 adventure-specific maps
- `generic/` — 19 generic campaign maps

### 2. **Maps Integrated into DM Panel**
The web dashboard now includes an **"Adventure Maps"** section in the VTT controls:
- Quick-load buttons for all Pale Sickness maps
- Quick-load buttons for all Generic campaign maps
- Click any button to instantly load that map to the VTT screen

### 3. **Comprehensive Documentation**
- `MAPS.md` — Scene-by-scene adventure guide
- `VTT_IMPORT_GUIDE.md` — Platform instructions (for external VTTs)
- `MAP_GENERATION_SPEC.md` — Complete specifications for future map generation

---

## How to Use

### Quick Start (After Server Restart)

1. **Start the DM Panel:**
   ```bash
   pm2 status dm-panel
   ```
   Or restart it:
   ```bash
   pm2 restart dm-panel
   ```

2. **Open the DM Panel:**
   - Navigate to `http://localhost:5050` (or your configured port)

3. **Load a Map:**
   - Scroll down the right sidebar to **"🗺️ Adventure Maps"** section
   - Under **"PALE SICKNESS"** or **"GENERIC CAMPAIGN"**, click any map name
   - The map instantly appears on the VTT screen

4. **Adjust VTT Settings:**
   - Use the effects buttons above (🌧 Rain, ❄️ Snow, 🌫 Fog, 🔥 Fire)
   - Adjust darkness level with the slider (🌑)
   - Toggle grid overlay (▦ Grid)
   - Click ✕ Clear to reset all effects

---

## Technical Details

### Backend Changes (server.js)

**New Endpoints:**
- `GET /api/adventure-maps` — Returns categorized list of available maps
- `GET /maps-adventure/:category/:file` — Serves map images directly

```json
{
  "pale-sickness": [
    {
      "filename": "ps-01-urgons-cabin_grid.png",
      "name": "URGON'S CABIN",
      "url": "/maps-adventure/pale-sickness/ps-01-urgons-cabin_grid.png",
      "mtime": 1689801926000,
      "size": 92602
    },
    ...
  ],
  "generic": [
    {
      "filename": "generic-01-forest-path_grid.png",
      "name": "FOREST PATH",
      "url": "/maps-adventure/generic/generic-01-forest-path_grid.png",
      "mtime": 1689801945000,
      "size": 671056
    },
    ...
  ]
}
```

### Frontend Changes (index.html + app.js)

**New UI Section:**
Added "🗺️ Adventure Maps" panel with:
- "PALE SICKNESS" subsection (13 buttons)
- "GENERIC CAMPAIGN" subsection (19 buttons)

Each button:
- Shows truncated map name (first 40 chars)
- Full name in tooltip
- Sends map to VTT on click
- Preserves current effects/darkness/grid settings

**API Call:**
```javascript
fetch('/api/vtt-screen', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'map',
    url: '/maps-adventure/pale-sickness/ps-01-urgons-cabin_grid.png',
    effects: ['rain', 'fog'],
    darkness: 0.5,
    grid: true
  })
})
```

---

## Map File Reference

### Pale Sickness Maps (13 total)

**Scene 1: Palebank Investigation**
- `ps-01-urgons-cabin_grid.png` — Blacksmith's cabin (4×4 squares)
- `ps-02-pelcs-curiosities_grid.png` — Trading post (5×5 squares)
- `ps-03-tulgis-cabin_grid.png` — Investigator's home (4×4 squares)
- `ps-04-irvens-home_grid.png` — Family residence (6×5 squares)
- `ps-05-frostwatch-post_grid.png` — Guard post (4×6 squares)

**Scene 2: Croaker Cave**
- `ps-06-croaker-cave_grid.png` — Smuggler hideout (8×5 squares)

**Scene 3: Journey to Salsvault**
- `ps-13-cold-anchor-waypoint_grid.png` — Rest station (6×7 squares)

**Scene 4: Salsvault Facility**
- `ps-07-salsvault-room1-entrance_grid.png` — Entrance Hall (6×4 squares)
- `ps-08-salsvault-room2-labs_grid.png` — Research Labs (8×6 squares)
- `ps-09-salsvault-room3-containment_grid.png` — Containment Hall (10×8 squares)
- `ps-10-salsvault-room4-storage_grid.png` — Construct Storage (8×8 squares)
- `ps-11-salsvault-room5-preservation_grid.png` — Preservation Chamber (4×4 squares)
- `ps-12-salsvault-room6-control_grid.png` — Control Room (6×6 squares)

### Generic Campaign Maps (19 total)

**Travel (5):**
- `generic-01-forest-path_grid.png` — Forest road (8×12)
- `generic-02-mountain-pass_grid.png` — Alpine passage (10×12)
- `generic-03-icefields-route_grid.png` — Arctic plains (12×16)
- `generic-04-river-crossing_grid.png` — River ford (10×8)
- `generic-05-forest-clearing_grid.png` — Rest clearing (8×8)

**Camping (2):**
- `generic-06-wilderness-camp_grid.png` — Field camp (10×10)
- `generic-07-mountain-shelter_grid.png` — Mountain shelter (8×8)

**Taverns & Inns (4):**
- `generic-08-tavern-interior_grid.png` — Tavern main room (10×12)
- `generic-09-tavern-kitchen_grid.png` — Tavern kitchen (5×6)
- `generic-10-inn-common-room_grid.png` — Inn common room (8×10)
- `generic-11-waystone-inn-hub_grid.png` — Guild headquarters (12×15)

**Shops (4):**
- `generic-12-general-store_grid.png` — General store (6×7)
- `generic-13-smithy-armory_grid.png` — Smithy & armory (8×8)
- `generic-14-apothecary_grid.png` — Potion shop (5×6)
- `generic-15-market-stall_grid.png` — Market stall (4×5)

**Community (4):**
- `generic-16-town-square_grid.png` — Town square (15×15)
- `generic-17-town-hall_grid.png` — Town hall (8×10)
- `generic-18-guard-post_grid.png` — Guard barracks (10×11)
- `generic-19-temple-shrine_grid.png` — Temple/shrine (8×11)

---

## Troubleshooting

### Maps Don't Appear in DM Panel

1. **Check server is running:**
   ```bash
   pm2 status dm-panel
   ```

2. **Verify maps exist:**
   ```bash
   ls -la "adventures/season-1/the-pale-sickness/maps/pale-sickness/"
   ls -la "adventures/season-1/the-pale-sickness/maps/generic/"
   ```

3. **Check API endpoint:**
   ```bash
   curl http://localhost:5050/api/adventure-maps
   ```
   Should return JSON with map lists.

4. **Restart server:**
   ```bash
   pm2 restart dm-panel
   ```

### Map Loads But Grid is Wrong

1. **Verify grid settings in VTT screen:**
   - Check "▦ Grid" button is pressed
   - Grid should be 1-inch = 5 ft (D&D standard)

2. **Check TV specs (if using physical TV):**
   - File: `web/data/vtt-tv-specs.json`
   - Verify resolution and physical dimensions match your TV
   - Grid pixel size will be auto-calculated

### Map Image Not Loading

1. **Check file path:**
   - Maps should be in `adventures/season-1/the-pale-sickness/maps/[category]/`
   - Files must be PNG format
   - Filename must end with `_grid.png`

2. **Verify file permissions:**
   ```bash
   ls -l "adventures/season-1/the-pale-sickness/maps/pale-sickness/ps-01-urgons-cabin_grid.png"
   ```
   Should be readable (644 or similar)

---

## Advanced Usage

### Programmatic Map Loading

You can send maps to the VTT via the API:

```bash
curl -X POST http://localhost:5050/api/vtt-screen \
  -H "Content-Type: application/json" \
  -d '{
    "type": "map",
    "url": "/maps-adventure/pale-sickness/ps-06-croaker-cave_grid.png",
    "effects": ["rain"],
    "darkness": 0.3,
    "grid": true
  }'
```

### Adding More Maps

1. Generate new maps and place in:
   - `adventures/season-1/the-pale-sickness/maps/[category]/` 
   
2. Name them:
   - Format: `ps-XX-descriptive-name_grid.png` (Pale Sickness)
   - Format: `generic-XX-descriptive-name_grid.png` (Generic)

3. Restart server to index new maps

---

## Files Modified

- ✓ `web/server.js` — Added map endpoints
- ✓ `web/public/index.html` — Added UI section
- ✓ `web/public/app.js` — Added map loading logic

## Files Created/Organized

- ✓ `adventures/season-1/the-pale-sickness/maps/pale-sickness/` — 13 maps
- ✓ `adventures/season-1/the-pale-sickness/maps/generic/` — 19 maps
- ✓ `adventures/season-1/the-pale-sickness/MAPS.md` — Adventure reference
- ✓ `adventures/season-1/the-pale-sickness/maps/VTT_IMPORT_GUIDE.md` — External VTT guide
- ✓ `adventures/season-1/the-pale-sickness/maps/MAP_GENERATION_SPEC.md` — Generation specs

---

## What's Next?

### Ready for Play Session
- Load Pale Sickness maps as needed during gameplay
- Use generic maps for any combat/travel encounters

### Future Enhancements
- Generate additional maps for other seasons
- Add map search/filter UI
- Create map collections/folders in DM Panel
- Add fog-of-war (reveal/hide portions of maps)
- Token placement and management

---

**Setup Complete!** Your VTT maps are integrated and ready to use.

Navigate to your DM Panel and look for the **"🗺️ Adventure Maps"** section to start loading maps.

Generated: 2026-07-19
