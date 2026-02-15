# Location Validation Report

## Coordinate Space Notes
- **Full-scale map:** 1280×1040 (X: 0 west–1280 east, Y: 0 north–1040 south)
- **Viewable/CSV:** 320×260 (downsampled 4× from full)
- **Conversion:** Full coords = CSV coords × 4

## Locations Validation Summary

### NORTHREACH REGION

| Location | CSV Coords | Full Coords | Canon Position | Match? | Notes |
|----------|-----------|------------|---------------|--------|-------|
| Waystone Inn | (160, 50) | (640, 200) | Guild hub, center of Northreach | ✓ | Central placement correct |
| Welton | (140, 65) | (560, 260) | Southwest of Waystone, farming village | ✓ | Matches canon "southwest" |
| Westly's Farm | (136, 65) | (544, 260) | West of Welton, isolated homestead | ✓ | Positioned west of town |
| Shepherd's Crook Inn | (140, 65) | (560, 260) | Inside Welton | ✓ | Same coords as Welton (social hub) |
| Noke's Tower | (150, 50) | (600, 200) | West of Waystone | ✓ | West of guild center |
| Palebank Village | (170, 35) | (680, 140) | Northeast coast | ✓ | High Y value = north, east of center |
| Croaker Cave | (170, 30) | (680, 120) | North of Palebank | ⚠️ | At Y=30 (viewable), on water per validator; may need adjustment |
| Pinebrook | (185, 55) | (740, 220) | Southeast, trading post | ✓ | East and south of center |
| Temple of Dragonknights | (140, 45) | (560, 180) | Northwest mountains (near Welton) | ✓ | West and north of center |

### FAR NORTH

| Location | CSV Coords | Full Coords | Canon Position | Match? | Notes |
|----------|-----------|------------|---------------|--------|-------|
| Salsvault | (182, 14) | (728, 56) | Far north of Palebank, Aeorian ruins | ✓ | Very north (Y=14); east placement aligns |

### SOUTHERN DOMINION & EAST

| Location | CSV Coords | Full Coords | Canon Position | Match? | Notes |
|----------|-----------|------------|---------------|--------|-------|
| Solaris | (160, 162) | (640, 648) | South-central, cultural capital | ✓ | Central X, far south Y |
| Divinity's Beacon | (145, 155) | (580, 620) | Holy site south, near Solaris | ✓ | Positioned near Solaris |
| Khardûn-Tharum | (262, 88) | (1048, 352) | Deep mountains, dwarven capital | ✓ | Far east, mid Y = mountain region |
| Vaeltharyn | (55, 115) | (220, 460) | Elven capital, Nullwood Expanse | ⚠️ | West placement OK, but Y=115 puts it very north for western region; Nullwood is western but extends south |

### WESTERN & COASTAL REGIONS

| Location | CSV Coords | Full Coords | Canon Position | Match? | Notes |
|----------|-----------|------------|---------------|--------|-------|
| Port Sentinel | (38, 162) | (152, 648) | Western coast, port city | ⚠️ | X=38 far west OK, but Y=162 puts it very far south; should be higher up on western coast |
| The Shattered Coast | (35, 165) | (140, 660) | Rocky maritime region, western edge | ⚠️ | Region label; on water per validator; should be slightly inland on rocky coast symbol |

### OUTLAW CITIES & TRADE HUBS

| Location | CSV Coords | Full Coords | Canon Position | Match? | Notes |
|----------|-----------|------------|---------------|--------|-------|
| Vharoxis | (238, 138) | (952, 552) | East coast, jagged peninsula, outlaw city | ✓ | East (X=238 high) and south (Y=138 mid); recently gave it landmass, now on coast |
| Cindermarch | (100, 212) | (400, 848) | Volcanic south, fortress city | ✓ | Far south Y=212, west of center; matches "volcanic south" |

### TRADE & MAGICAL CENTERS

| Location | CSV Coords | Full Coords | Canon Position | Match? | Notes |
|----------|-----------|------------|---------------|--------|-------|
| Solace Nexus | (200, 188) | (800, 752) | South, magical hub in Verdant Marches | ✓ | Central-east, far south; matches Marches location |

### REGION LABELS (Geographical)

| Location | CSV Coords | Full Coords | Canon Position | Match? | Notes |
|----------|-----------|------------|---------------|--------|-------|
| The Nullwood Expanse | (50, 110) | (200, 440) | Ancient forest, western region | ✓ | Far west, mid-north Y; matches |
| The Stonebound Depths | (270, 85) | (1080, 340) | Mountains, eastern region, dwarven home | ✓ | Far east X, mid Y = mountains |
| The Emerlands | (95, 215) | (380, 860) | Volcanic south, fire magic region | ✓ | South Y=215, west-central; matches volcanic south |
| The Verdant Marches | (205, 195) | (820, 780) | Southeast, beast-haunted druidic wilds | ✓ | East-central X, far south Y; matches |

---

## Issues Found

### 🔴 Critical Issues

1. **Port Sentinel (38, 162)** – Y-coordinate too far south
   - Current: (38, 162) = far south on western coast
   - Canon: Western coast port city (should be mid-north on coast)
   - Recommendation: Adjust to approximately (38, ~90-110) to place it on western coast proper

### 🟡 Minor/Cosmetic Issues

2. **Croaker Cave (170, 30)** – On water tile per validator
   - Current: Y=30 is very far north
   - Canon: North of Palebank (which is at Y=35)
   - Recommendation: Slightly south of Palebank; adjust to (170, 38) or (170, 40)

3. **Vaeltharyn (55, 115)** – Y-coordinate placement uncertain
   - Current: Far west, but Y=115 is mid-north
   - Canon: Elven capital in Nullwood Expanse (western ancient forest)
   - Issue: Nullwood spans west-central broadly; Y=115 may be too far north
   - Recommendation: Move to (55, 140) to place deeper in Nullwood belt

4. **The Shattered Coast (35, 165)** – Region label on water tile
   - Current: On ocean `~` per validator
   - Canon: Rocky maritime region (should be on `░` rocky coast)
   - Recommendation: Move slightly inland to (37, 163) (suggested by validator) or similar

---

## Summary

✓ **Good Placements:** 17 locations match canonical positions well
⚠️ **Needs Minor Adjustment:** 4 locations need coordinate tweaks
🔴 **Critical:** 1 location (Port Sentinel) significantly misplaced

**Recommendation:** Apply coordinate fixes to Port Sentinel, Croaker Cave, Vaeltharyn, and The Shattered Coast to align with canon descriptions.
