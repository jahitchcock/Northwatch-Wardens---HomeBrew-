# VTT Import Guide — Pale Sickness Maps

**32 VTT-ready battlemaps with 1-inch grids (5 ft per square)**

All maps are PNG format, 96 DPI (screen/VTT optimized), with pre-applied grid overlays for immediate use in any VTT platform.

---

## Directory Structure

```
maps/
├── pale-sickness/       (13 maps) — Pale Sickness adventure locations
│   ├── ps-01-urgons-cabin_grid.png
│   ├── ps-02-pelcs-curiosities_grid.png
│   ├── ps-03-tulgis-cabin_grid.png
│   ├── ps-04-irvens-home_grid.png
│   ├── ps-05-frostwatch-post_grid.png
│   ├── ps-06-croaker-cave_grid.png
│   ├── ps-07-salsvault-room1-entrance_grid.png
│   ├── ps-08-salsvault-room2-labs_grid.png
│   ├── ps-09-salsvault-room3-containment_grid.png
│   ├── ps-10-salsvault-room4-storage_grid.png
│   ├── ps-11-salsvault-room5-preservation_grid.png
│   ├── ps-12-salsvault-room6-control_grid.png
│   └── ps-13-cold-anchor-waypoint_grid.png
│
├── generic/             (19 maps) — Reusable campaign locations
│   ├── Travel Scenes
│   │   ├── generic-01-forest-path_grid.png
│   │   ├── generic-02-mountain-pass_grid.png
│   │   ├── generic-03-icefields-route_grid.png
│   │   ├── generic-04-river-crossing_grid.png
│   │   └── generic-05-forest-clearing_grid.png
│   │
│   ├── Camping & Rest
│   │   ├── generic-06-wilderness-camp_grid.png
│   │   └── generic-07-mountain-shelter_grid.png
│   │
│   ├── Taverns & Inns
│   │   ├── generic-08-tavern-interior_grid.png
│   │   ├── generic-09-tavern-kitchen_grid.png
│   │   ├── generic-10-inn-common-room_grid.png
│   │   └── generic-11-waystone-inn-hub_grid.png (Guild headquarters)
│   │
│   ├── Shops & Merchants
│   │   ├── generic-12-general-store_grid.png
│   │   ├── generic-13-smithy-armory_grid.png
│   │   ├── generic-14-apothecary_grid.png
│   │   └── generic-15-market-stall_grid.png
│   │
│   └── Community Locations
│       ├── generic-16-town-square_grid.png
│       ├── generic-17-town-hall_grid.png
│       ├── generic-18-guard-post_grid.png
│       └── generic-19-temple-shrine_grid.png
│
└── VTT_IMPORT_GUIDE.md (this file)
```

---

## How to Import into Your VTT

### Roll20

1. **Create a new Campaign** or open an existing one
2. Go to **Art Library** → **My Art Library**
3. Click **Upload** or drag-and-drop maps from `pale-sickness/` or `generic/`
4. Organize into folders: create folders for "Pale Sickness", "Taverns", "Travel", etc.
5. When creating a scene, **Add Map** → select from your uploaded library
6. Set **Lighting Radius** and **Token Size** based on map size (see table below)

**Token Size Settings (Roll20):**
- 5-ft per square = 1 inch (already set in maps)
- For a creature on a 4×4 room: set token to "1 unit" (5 ft diameter)
- Test with one map, then copy settings to others

### Foundry VTT

1. **Import all maps to your server:**
   - Via web interface: **Settings** → **File Browser** → upload PNGs to `Data/worlds/[world]/scenes/images/`
   - Or use desktop app: drag files to **Asset Library**

2. **Create a Scene for each map:**
   - **Scenes Tab** → **Create New Scene**
   - **Background Image:** select the PNG file
   - **Grid Settings:**
     - Grid Type: **Square** (D&D 5e standard)
     - Grid Size: **100 pixels** (Foundry default; adjust if maps look wrong)
     - Grid Scale: **5 ft per grid** (set in scene config)

3. **Token Size:** Each token should be 1 grid square = 5 ft

4. **Lighting:** Set lighting and vision defaults based on location type:
   - Interior scenes (shops, taverns): moderate light
   - Outdoor scenes (forests, icefields): bright daylight
   - Dungeon (Salsvault): dim light + bright/dim radius

### Fantasy Grounds

1. **Import Images:**
   - Open your campaign → **Modules** → **Images**
   - Click **Add Image** → select PNG from `maps/` directories
   - Assign to an image category (e.g., "Locations", "Travel", "Pale Sickness")

2. **Create Encounters:**
   - **Encounters Tab** → **New Encounter**
   - **Set Map:** Select from your imported images library
   - Grid is pre-configured; adjust token size if needed

3. **Lighting & Vision:**
   - Set per-encounter based on location type
   - Default: daylight for outdoor, dimlight for indoor

---

## Pale Sickness Scenario Mapping

**Use these maps for the corresponding adventure scenes:**

| Scene | Location | Map File |
|-------|----------|----------|
| **Scene 1: Palebank Investigation** | | |
| — | Urgon's Cabin | `ps-01-urgons-cabin_grid.png` |
| — | Pelc's Curiosities | `ps-02-pelcs-curiosities_grid.png` |
| — | Tulgi's Cabin | `ps-03-tulgis-cabin_grid.png` |
| — | Irven's Home | `ps-04-irvens-home_grid.png` |
| — | Frostwatch Guard Post | `ps-05-frostwatch-post_grid.png` |
| **Scene 2: Croaker Cave** | Bandit Hideout | `ps-06-croaker-cave_grid.png` |
| **Scene 3: Journey to Salsvault** | Cold Anchor Waypoint | `ps-13-cold-anchor-waypoint_grid.png` |
| **Scene 4: Salsvault — The Frozen Laboratory** | | |
| — | Room 1: Entrance Hall | `ps-07-salsvault-room1-entrance_grid.png` |
| — | Room 2: Research Laboratories | `ps-08-salsvault-room2-labs_grid.png` |
| — | Room 3: Containment Hall | `ps-09-salsvault-room3-containment_grid.png` |
| — | Room 4: Construct Storage | `ps-10-salsvault-room4-storage_grid.png` |
| — | Room 5: Preservation Chamber | `ps-11-salsvault-room5-preservation_grid.png` |
| — | Room 6: Control Room | `ps-12-salsvault-room6-control_grid.png` |

---

## Generic Campaign Maps — When to Use

**Travel Scenes:**
- `generic-01-forest-path_grid.png` — Overland travel through forests
- `generic-02-mountain-pass_grid.png` — Alpine travel, mountain encounters
- `generic-03-icefields-route_grid.png` — Arctic/northern travel (also used in Pale Sickness Scene 3)
- `generic-04-river-crossing_grid.png` — River obstacles, water crossings
- `generic-05-forest-clearing_grid.png` — Camping spots, rest encounters

**Camping & Rest:**
- `generic-06-wilderness-camp_grid.png` — Party camp, night encounters
- `generic-07-mountain-shelter_grid.png` — High-altitude rest, mountain camp

**Taverns & Inns:**
- `generic-08-tavern-interior_grid.png` — Standard tavern for any season
- `generic-09-tavern-kitchen_grid.png` — Behind-the-scenes tavern encounters
- `generic-10-inn-common-room_grid.png` — Inn public space, comfortable rest
- `generic-11-waystone-inn-hub_grid.png` — **Guild headquarters** (Waystone Inn, campaign hub)

**Shops & Merchants:**
- `generic-12-general-store_grid.png` — Supply shopping, merchant scenes
- `generic-13-smithy-armory_grid.png` — Equipment acquisition, blacksmith encounters
- `generic-14-apothecary_grid.png` — Potion/healing services, alchemy shops
- `generic-15-market-stall_grid.png` — Single vendor, market encounter

**Community Locations:**
- `generic-16-town-square_grid.png` — Central marketplace, public gathering
- `generic-17-town-hall_grid.png` — Government/administrative encounters
- `generic-18-guard-post_grid.png` — Military/guard encounters, law enforcement
- `generic-19-temple-shrine_grid.png` — Religious locations, temple scenes

---

## Map Specifications

| Property | Value |
|----------|-------|
| **Format** | PNG (lossless) |
| **Resolution** | 96 DPI (screen/VTT) |
| **Grid Overlay** | 1-inch squares (5 ft per square) |
| **Grid Lines** | Minor every square, major every 5 squares |
| **Background** | Opaque (most maps) |
| **Color Space** | sRGB |
| **Engine** | SDXL Mapcraft (topdown) |

### File Size Reference

**Pale Sickness Maps:**
- Small rooms (4×4): 100–110 KB
- Medium rooms (6×7, 8×6): 150–300 KB
- Large rooms (8×8, 10×8): 300–500 KB
- Largest room (12×15): 1.2 MB

**Generic Maps:**
- Small (4×5, 5×6): 120–200 KB
- Medium (8×8, 10×10): 400–800 KB
- Large (12×12, 15×15): 1.1–1.6 MB

---

## Troubleshooting

### Grid is misaligned in VTT

**Roll20:** Set "Grid Size" to 70 pixels (Roll20 standard) in map settings, or adjust your token size accordingly

**Foundry:** Grid size should be 100 pixels; if misaligned, check that your scene scale is set to "5 ft" per grid square in Scene Configuration

**Fantasy Grounds:** Grid should auto-align; if not, reimport the map and ensure grid is enabled

### Maps appear too small or too large

- **Too small:** Your VTT's zoom might be high; zoom out or check grid size setting
- **Too large:** Reduce zoom or adjust grid scale in VTT settings
- **Wrong aspect ratio:** Maps are already correctly scaled; this indicates a VTT configuration issue

### Can't see details in dark locations (Salsvault rooms)

- Increase scene lighting or use a lower lighting dimness setting
- Pale Sickness Salsvault rooms are intentionally dark; use dynamic lighting or a flashlight token
- Consider adding a soft ambient light (blue tint) to match the description

### Importing multiple maps at once

All VTT platforms support batch upload:
- **Roll20:** Drag entire folder to Art Library
- **Foundry:** Use Asset Library batch upload
- **Fantasy Grounds:** Drag folder or select all files for import

---

## Tips for Best VTT Experience

1. **Pre-load maps** before sessions to avoid lag during play
2. **Set token size** once and copy to all maps in your VTT
3. **Use fog of war** to reveal locations gradually (especially for dungeons like Salsvault)
4. **Place lighting tokens** at light sources before starting encounters
5. **Test one map** in your VTT first to verify grid alignment and scaling

---

## Support

For issues with map generation or VTT compatibility:
1. Check the `MAP_GENERATION_SPEC.md` in the adventure folder
2. Verify your VTT's grid settings match D&D 5e standard (5 ft = 1 square)
3. Ensure PNG files are not corrupted (try re-downloading or regenerating)

Generated: 2026-07-18  
Format: VTT-ready PNG with 1-inch grids  
Total Maps: 32
