# Map Generation Setup for Pale Sickness Adventure

I've created a complete batch map generation system for the Pale Sickness adventure + reusable campaign locations.

## What's Been Created

### 1. Specification Document
**Location:** `MAP_GENERATION_SPEC.md` (this folder)

Complete specifications for all 36 maps needed:
- 13 Pale Sickness-specific locations
- 23 generic campaign locations (travel, taverns, shops, etc.)
- Dimensions, descriptions, and feature details for each

### 2. Python Generation Script
**Location:** `F:\NewProject\image-gen\generate_pale_sickness_maps.py`

Batch generation script using direct image_pipeline functions:
- Generates VTT-ready maps with grids
- Supports multiple generation engines (SDXL, Mapcraft, FLUX)
- Priority-based generation (critical → high → medium → low)
- Dry-run mode for planning

### 3. Usage Guide
**Location:** `F:\NewProject\image-gen\MAP_GENERATION_GUIDE.md`

Complete guide with:
- Quick start commands
- Generation schedules (phased approach)
- Engine selection advice
- Troubleshooting

## Quick Start (Right Now)

### Step 1: Test the Script (2 minutes)
```powershell
cd F:\NewProject\image-gen
.\.venv\Scripts\Activate.ps1
python .\generate_pale_sickness_maps.py --dry-run --priority high
```

This shows what would be generated without running.

### Step 2: Generate High-Priority Maps (45 minutes)
```powershell
python .\generate_pale_sickness_maps.py --priority high
```

This generates the 13 essential maps:
- ✓ All Palebank locations (5)
- ✓ Croaker Cave
- ✓ Key Salsvault rooms (4)
- ✓ Cold Anchor Waypoint
- ✓ Waystone Inn + Tavern + Town Square

**Estimated completion time:** 45-60 minutes (maps process in parallel on P40)

### Step 3: Find Your Maps
Once generated, maps appear in:
```
F:\NewProject\image-gen\output\maps\
```

Each map generates with a `_grid.png` suffix — those are the VTT-ready versions.

### Step 4: Copy to Campaign
Copy the `_grid.png` maps to:
```
C:\Users\joshu\OneDrive\Documents\dnd\00 - Campaigns\Northwatch Wardens - (HomeBrew)\adventures\season-1\the-pale-sickness\maps\
```

## Map Priority Breakdown

### CRITICAL (1 map - 10 min)
- **Salsvault Room 5** (Preservation Chamber) — the story objective

### HIGH (13 maps - 45 min)
**Pale Sickness core:**
- Urgon's Cabin
- Pelc's Curiosities
- Irven's Home
- Croaker Cave
- Salsvault Rooms 1, 2, 3, 6
- Cold Anchor Waypoint

**Generic high-use:**
- Tavern Interior
- Waystone Inn (guild hub)
- Town Square
- Icefields Route

### MEDIUM (15 maps - 40 min)
- Tulgi's Cabin, Frostwatch Post
- Salsvault Room 4
- Travel scenes (forest, mountain)
- Camping locations
- Additional shops & community

### LOW (7 maps - 20 min)
- Market Stall
- River Crossing
- Tavern Kitchen
- Optional locations

## Generation Commands

### Phased Approach (Recommended)

**Phase 1 - Critical (10 min):**
```powershell
python .\generate_pale_sickness_maps.py --priority critical
```

**Phase 2 - High Priority (45 min):**
```powershell
python .\generate_pale_sickness_maps.py --priority high
```
After Phase 2, you have everything for a full Pale Sickness playthrough.

**Phase 3 - Medium Priority (40 min):**
```powershell
python .\generate_pale_sickness_maps.py --priority medium
```

**Phase 4 - Low Priority (20 min, optional):**
```powershell
python .\generate_pale_sickness_maps.py --priority low
```

### All At Once
```powershell
python .\generate_pale_sickness_maps.py
```
Generates all 36 maps (90-120 minutes).

### By Scope

**Adventure only (Pale Sickness):**
```powershell
python .\generate_pale_sickness_maps.py --adventure-only
```
13 maps in 40-50 minutes.

**Generic campaign only:**
```powershell
python .\generate_pale_sickness_maps.py --generic-only
```
23 maps in 60-80 minutes. Great for building a general campaign toolkit.

## Map List Summary

| Category | Maps | Priority | Estimated Time |
|----------|------|----------|-----------------|
| **Pale Sickness** | | | |
| Palebank Village | 5 locations | High | 15 min |
| Croaker Cave | 1 cave | High | 5 min |
| Salsvault Rooms | 6 rooms | Crit/High | 20 min |
| Cold Anchor | 1 waypoint | High | 3 min |
| **Generic Campaign** | | | |
| Travel Scenes | 5 maps | Med/High | 15 min |
| Camping & Rest | 3 maps | Medium | 10 min |
| Taverns & Inns | 4 maps | High/Med | 15 min |
| Shops & Merchants | 4 maps | Medium | 12 min |
| Community Locations | 4 maps | Medium/High | 15 min |

## Technical Details

**Generation Engine:** SDXL (fast, good quality)
- ~30 seconds per map
- Parallel processing on P40
- All maps come out with grids (96 DPI for VTT)

**Output Format:**
- PNG, 1024×1024 base
- Grid overlay at 5 ft per square
- 96 DPI for screen/VTT use (not print)

**Grid Specifications:**
- All maps automatically grid-overlaid
- Standard D&D scale: 1 square = 5 feet
- Ready to drop into Roll20/Foundry/Astral

## What You'll Have When Done

After Phase 2 (High Priority), you'll have:
- ✓ Complete Pale Sickness adventure (playable)
- ✓ Reusable generic locations (taverns, shops, town)
- ✓ All maps in VTT-ready format with grids
- ✓ Can run the adventure immediately in VTT

After all phases:
- ✓ 36 total maps for your campaign
- ✓ Full toolkit for improvisational play
- ✓ Rich environment variety

## Next Action

1. **Read the full guide:** `F:\NewProject\image-gen\MAP_GENERATION_GUIDE.md`
2. **Test the script:** Run the dry-run command above
3. **Start generation:** Run Phase 1 or Phase 2 depending on urgency
4. **Use in game:** Copy maps to your campaign folder and upload to VTT

---

**Total setup time:** ~5 minutes to get started
**Total generation time:** 45 min (high priority) to 120 min (all maps)
**Ready to use:** Immediately after generation

Questions? Check `MAP_GENERATION_GUIDE.md` for troubleshooting and detailed options.
