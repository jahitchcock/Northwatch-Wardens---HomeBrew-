<!--
  Tags: DM-Resource, Meta
  Status: Canon
  Type: DM-Resource
  Region: Off-Map
-->

# Aevoria ASCII Maps - README

## Files Generated

### 1. `aevoria_ascii_map.txt` (FULL RESOLUTION)
- **Dimensions:** 1280 characters wide × 1040 lines tall
- **Total Size:** Exactly 1,331,200 characters (1280×1040)
- **Purpose:** High-resolution ASCII map suitable for large displays or printing
- **File Size:** ~1.3 MB

### 2. `aevoria_map_viewable.txt` (COMPRESSED FOR VIEWING)
- **Dimensions:** 320 characters wide × 260 lines tall
- **Sampling:** Every 4th row and every 4th column from the full map
- **Purpose:** Easier to view in standard text editors and terminals
- **File Size:** ~83 KB

---

## Map Legend

### Terrain Symbols

| Symbol | Meaning |
|:-------|:--------|
| `~` | Ocean / Sea |
| `≈` | River / Flowing Water |
| `≋` | Deep Ocean (Sunken Dominion) |
| `❄` | Ice / Arctic (The Far North) |
| `.` | Grassland / Plains |
| `,` | Farmland (Verdant Marches) |
| `♣` | Dense Forest (Nullwood Expanse) |
| `♠` | Pine Forest (Northreach) |
| `^` | Mountains (Stonebound Depths) |
| `░` | Rocky Coast (Shattered Coast) |
| `▓` | Volcanic Terrain (Emberlands) |

### Settlement Symbols

| Symbol | Meaning |
|:-------|:--------|
| `█` | Major City / Capital |
| `▓` | Town / Significant Settlement |
| `▒` | Outlaw City / Special Settlement |
| `†` | Temple / Holy Site |
| `◊` | Ruins / Ancient Site |

### Infrastructure

| Symbol | Meaning |
|:-------|:--------|
| `═` | Major Highway (King's Highway) |
| `─` | Road / Path |

---

## Geographic Features Mapped

### Regions (10 Major Areas)

1. **The Far North** (Y: 0-100)
   - Arctic wasteland, permanent ice
   - Salsvault ruins marked with `◊`

2. **Northreach** (Y: 100-400, X: 300-1000)
   - Central region with Waystone Inn hub (`█`)
   - Settlements: Welton, Palebank, Pinebrook
   - Mixed terrain: grassland, pine forests, rivers

3. **Nullwood Expanse** (Western region, marked with `♣`)
   - Dense ancient forests
   - Elven territory

4. **Stonebound Depths** (Eastern mountains, marked with `^`)
   - Khardûn-Tharum dwarven capital

5. **Solaris Dominion** (Central-south, Y: 500-800)
   - Cultural capital of Aevoria
   - Temperate grasslands

6. **Verdant Marches** (Southeast, marked with `,`)
   - Fertile farmland
   - Solace Nexus magical city

7. **Vharoxis** (East, marked with `▒`)
   - Outlaw city-state

8. **Shattered Coast** (Western coast, marked with `░`)
   - Rocky maritime region
   - Port Sentinel

9. **Emberlands** (Southwest, marked with `▓`)
   - Volcanic disaster zone
   - Cindermarch fortress

10. **Sunken Dominion** (Far southwest ocean, marked with `≋`)
    - Underwater civilization

### Major Water Features

**Rivers:**
- Great Central River (Northreach) - flows north to Palebank
- Pinebrook River (Eastern Northreach) - flows northeast
- Western River - joins central river system
- Solaris River - major trade artery in south

**Oceans:**
- Northern Ocean (Arctic waters)
- Western Sea (deep ocean, home to Sunken Dominion)

### Major Settlements

**Northreach Region:**
- Waystone Inn (640, 200) - Guild headquarters, marked `█`
- Welton (560, 260) - Farming village, marked `▓`
- Palebank Village (680, 140) - Coastal town, marked `▓`
- Pinebrook (740, 220) - Trading post, marked `▓`

**Other Major Cities:**
- Solaris (640, 650) - National capital, marked `█`
- Khardûn-Tharum (1050, 350) - Dwarven city, marked `▓`
- Vharoxis (950, 550) - Outlaw city, marked `▒`
- Solace Nexus (800, 750) - Magical hub, marked `▓`
- Cindermarch (400, 850) - Volcanic city, marked `▒`
- Port Sentinel (150, 650) - Port city, marked `▓`

**Holy Sites:**
- Divinity's Beacon (580, 620) - Major temple, marked `†`
- Temple of the Dragonknights (560, 180) - Ancient temple, marked `†`

**Ruins:**
- Salsvault (730, 55) - Aeorian ruins in Far North, marked `◊`

---

## Coordinate System

The map uses a standard Cartesian coordinate system:
- **X-axis:** 0 (west) to 1280 (east)
- **Y-axis:** 0 (north) to 1040 (south)
- **Origin (0,0):** Northwest corner (Arctic Ocean)

### Compass Orientation
```
    N
    |
W --+-- E
    |
    S
```

North is at the top of the map (Y=0)

---

## Usage Tips

### Viewing the Full Map (1280×1040)

**In Terminal:**
```bash
less -S aevoria_ascii_map.txt
# Use arrow keys to scroll
# -S flag prevents line wrapping
```

**In Text Editor:**
- Requires a very wide window or horizontal scrolling
- Recommended: Use a monospace font (Courier, Consolas, Monaco)
- Set tab width to 1 space
- Disable word wrap

**For Printing:**
- Landscape orientation required
- Small font size (6-8pt recommended)
- May need 11×17" paper for full detail

### Viewing the Compressed Map (320×260)

**In Terminal:**
```bash
cat aevoria_map_viewable.txt
# or
less aevoria_map_viewable.txt
```

**In Text Editor:**
- Fits in most standard editor windows
- Still use monospace font
- More suitable for quick reference

---

## Generation Details

**Created:** Using Python script with coordinate data from Aevoria campaign guide
**Method:** Character-by-character grid generation with terrain filling, settlement placement, and river drawing
**Accuracy:** Based on official Northreach map and campaign guide coordinates
**Scale:** Approximately 100 pixels = 24 miles = 1 day's foot travel

---

## Campaign Integration

This map is designed for use with the **Northwatch Wardens** campaign set in Aevoria. It represents the "known world" from the perspective of characters based in Northreach.

**Key Campaign Hub:** Waystone Inn (marked prominently with `█` at coordinates 640, 200)

**Starting Region:** Northreach - the cold frontier region where most adventures begin

**Travel Reference:** 
- Roads marked with `─` and `═` symbols
- Major highway (`═`) runs north-south from Solaris to Northreach
- Local roads (`─`) connect Northreach settlements

---

## Limitations & Notes

- ASCII art is approximate; exact geographic features may vary
- Some small settlements and minor geographic features omitted for clarity
- Rivers shown with simplified courses
- Forests shown with scattered symbols rather than solid coverage
- Mountain ranges simplified to general areas

---

## Credits

**World Created By:** Campaign creator for Northwatch Wardens
**Map Coordinates:** Based on Aevoria campaign guide and official Northreach map
**ASCII Generation:** Python script using coordinate data
**Font Recommendation:** Any monospace font (Courier New, Consolas, Monaco, etc.)

---

## Version Information

**Map Version:** 1.0
**Date Generated:** 2026
**Based On:** Official Aevoria campaign materials
**Resolution:** 1280×1040 characters (full) / 320×260 characters (compressed)
