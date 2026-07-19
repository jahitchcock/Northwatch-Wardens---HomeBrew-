# Pale Sickness Map Generation Specification

VTT-ready battlemap specifications (top-down, 1-inch grids, 5-ft per square). For use with Roll20, Foundry, or similar VTT platforms.

---

## PALE SICKNESS ADVENTURE — SPECIFIC LOCATIONS

### Palebank Village — Individual Locations

#### 1. Urgon's Cabin (Blacksmith's Home)
- **Dimensions:** 20×20 ft (4×4 squares)
- **Description:** Small weathered cabin behind village smithy. Features: forge in corner, workbench, locked storage chest, iron tools on walls, wooden door, wood floor. Cold, sparse atmosphere.
- **Key Features:** Locked chest (central), fireplace, workbench, scattered forge tools
- **Priority:** High (investigation scene)
- **Notes:** This is a smaller investigation location; forensics-focused

#### 2. Pelc's Curiosities (Trading Post)
- **Dimensions:** 25×25 ft (5×5 squares)
- **Description:** Cluttered trading post. Features: wooden shelves packed with curiosities, display cases with relics, counter desk, windows, glass cases, organized chaos. Mercantile atmosphere.
- **Key Features:** Multiple shelving units, display counter, rear window (forced entry point), display case with receipt
- **Priority:** High (investigation scene)
- **Notes:** Show forced-entry damage at rear window; cluttered shelving layout

#### 3. Tulgi's Cabin (Investigative Location)
- **Dimensions:** 20×20 ft (4×4 squares)
- **Description:** Small cottage, meticulously organized and neat. Features: bed, table with chairs, hearth, window, door, tidy layout. Cold stone floor.
- **Key Features:** Bed, table, chairs, hearth, single window
- **Priority:** Medium (social encounter)
- **Notes:** Interior of a dying woman's home; sparse furnishings

#### 4. Irven Liel Sr.'s Home (Family Residence)
- **Dimensions:** 30×25 ft (6×5 squares)
- **Description:** Merchant's family home, main room. Features: fireplace, comfortable wooden furniture, hearth, wooden beams, welcoming. Rugs on wooden floor.
- **Key Features:** Fireplace with hearth, seating area, family furnishings, door
- **Priority:** High (desperate father scene)
- **Notes:** Show signs of illness or distress; family home atmosphere

#### 5. Frostwatch Guard Post (Military Outpost)
- **Dimensions:** 20×30 ft (4×6 squares)
- **Description:** Small military guard post interior. Features: wooden benches, weapon racks, armor stands, desk with papers, brazier for warmth, wooden floor, stone walls.
- **Key Features:** Weapon racks (walls), armor stands, desk, brazier/fireplace, benches
- **Priority:** Low (information gathering)
- **Notes:** Functional military space; Mila Teno stationed here

---

### Croaker Cave (Smuggler Hideout)
- **Dimensions:** 40×25 ft (8×5 squares)
- **Description:** Natural cave hideout with supply crates stacked along walls, campfire in center, bedrolls scattered, covered chest on far wall, rough stone walls, iced/damp floor.
- **Key Features:**
  - Central campfire (important tactical element)
  - Supply crates along walls (left and right)
  - Bedrolls scattered around
  - Locked chest on far wall (covered with blankets)
  - Latrine area (corner, screened by blanket)
  - Cave entrance (opening)
- **Priority:** High (combat/negotiation encounter)
- **Map Status:** ⚠️ EXISTS (`5.9-croaker-cave-battlemap-grid.png`) — verify VTT compatibility
- **Notes:** 4 bandits + Brynn Wraithwood (leader) + 1 infected bandit (Sett). Layout must show clear fire, crate positions for cover.

---

### Salsvault — The Frozen Laboratory (Individual Rooms)

#### Room 1: Entrance Hall
- **Dimensions:** 30×20 ft (6×4 squares)
- **Description:** Dark metal entry chamber. Features: smooth dark metal walls with blue glowing geometric glyphs, iced floor (thin patches), metal corridors branch left/right (dead ends), main passage forward. Cold, sterile Aevorian aesthetic.
- **Key Features:**
  - Central main passage (forward)
  - Two side passages (left/right dead ends - collapsed)
  - Spore vent in ceiling (cracked open, blue mist)
  - Frozen bootprints on floor (Urgon's)
  - Metal walls with glyphs
- **Encounters:** 2 Flying Swords (constructs), spore exposure
- **Priority:** High (entrance/first combat)
- **Notes:** Cold metal aesthetic; blue glowing runes on walls; iced floor hazard

#### Room 2: Research Laboratories
- **Dimensions:** 40×30 ft (8×6 squares)
- **Description:** Large laboratory with metal workbenches, shelving units, glass containers (many shattered), preserved notes/volumes in neat stacks, blue spore residue on countertops. Frozen and distorted equipment.
- **Key Features:**
  - 3 metal workbenches (some intact, one collapsed)
  - 2 shelving units (some intact, some collapsed)
  - Preserved Aevorian texts/volumes
  - Intact blue vial in sealed rack (labeled "HAZARDOUS")
  - Facility schematic on wall
  - Spore vents (2 cracked vents active)
- **Encounters:** 2 Animated Armor constructs, spore exposure
- **Priority:** High (second encounter room, contains schematic)
- **Notes:** Laboratory aesthetic; equipment in various states of preservation; blue vial visible (do not open); schematic shows Room 5 & 6 locations

#### Room 3: Containment Hall
- **Dimensions:** 50×40 ft (10×8 squares) — estimated width based on facility description
- **Description:** Long corridor-chamber lined with sealed metal containment pods. Features: 8 pods (4 each side), 7 sealed, 1 destroyed (Pod 7 - torn from inside), spore vents fully open and active, blue mist continuous.
- **Key Features:**
  - 8 containment pods arranged along walls (4 left, 4 right)
  - Pod 7 (destroyed, torn from inside - center of chamber)
  - Burn marks radiating from Pod 7
  - Open spore vents (ceiling - cannot be closed)
  - Urgon's bootprints visible (wide berth around Pod 7)
- **Encounters:** Spore exposure (DC 11 Con save each round), no combat constructs
- **Priority:** High (travel through scene, important narrative discovery)
- **Notes:** Showcase the breach/destruction; clear footprint path around Pod 7; continuous blue spore mist; this is where something escaped

#### Room 4: Construct Storage
- **Dimensions:** 40×40 ft (8×8 squares)
- **Description:** Wide storage bay with dormant metal figures in wall alcoves. Features: 12 dormant Animated Armors in alcoves, workbench in center with schematic, quiet and still. Dark, cavernous space.
- **Key Features:**
  - 12 alcoves arranged around walls (dormant Animated Armor in each)
  - Central workbench with facility schematic
  - Schematic shows Room 5 & 6 locations and "Manual override console"
  - Empty floor space (main area)
  - Doorways to adjacent rooms
- **Encounters:** 12 dormant Animated Armor constructs (DO NOT TRIGGER - all activate simultaneously if one does)
- **Priority:** Medium (stealth/bypass encounter)
- **Notes:** This is a "do not disturb" room; heavy presence of dormant constructs; stealth-focused; schematic critical for Control Room discovery

#### Room 5: Preservation Chamber
- **Dimensions:** 20×20 ft (4×4 squares)
- **Description:** Small warm chamber (climate-controlled). Features: gold-glowing door edges (warm light), sealed racks of vials, blue vials (disease samples) clearly separated from gold vials (antidote). Steady humming, lower pitch than facility.
- **Key Features:**
  - Central rack with 6 gold-capped vials (antidote - intact)
  - Additional racks with blue vials (disease samples - labeled separately)
  - Shattered vials on floor (1d4+2 broken during reactivation)
  - Failsafe note pinned to rack
  - Warm room aesthetic (gold light, warmer than rest of facility)
- **Encounters:** None (objective room)
- **Priority:** CRITICAL (contains the cure - adventure objective)
- **Notes:** Warm/comfortable environment contrasts with cold facility; clearly mark antidote vs. disease vials; show broken vials; this is the goal

#### Room 6: Central Control Room
- **Dimensions:** 30 ft diameter circular (approximate as 6×6 squares)
- **Description:** Circular room dominated by central console (metal, dark, glowing blue glyphs). Features: central console with hand-shaped depression, 6 crystal display panels arranged around it, security logs visible, hooded figure image in display.
- **Key Features:**
  - Central console (hand-shaped depression, blue glyph activation)
  - 6 crystal display panels around console
  - Console generates heat (warm room)
  - Activation logs accessible (DC 12 Arcana)
  - Facility map visible (DC 14 Arcana - shows Site Theta, Site Vharos, Site 9-B)
  - Hooded figure image (non-human proportions, standing at console)
- **Encounters:** None (information room)
- **Priority:** High (revelation - answers campaign mystery)
- **Notes:** Optional but essential for plot; this reveals Salsvault was deliberately activated; shows network of Aevorian sites; hooded figure is the antagonist

---

## GENERIC CAMPAIGN LOCATIONS

These are common encounter/travel locations useful across the campaign (not just Pale Sickness).

### Travel Scenes

#### Road Scene: Forest Path
- **Dimensions:** 32×48 ft (8×12 squares) — wide enough for mounted travel
- **Description:** Forested road or trail. Features: dirt/packed road center, trees/vegetation on sides, undergrowth, roots, stones, natural obstacles.
- **Uses:** Overland travel, ambushes, random encounters
- **Priority:** Medium (frequent use)
- **Notes:** Daylight version; show clear path with wooded areas for cover

#### Road Scene: Mountain Pass
- **Dimensions:** 40×50 ft (10×12 squares)
- **Description:** High mountain passage. Features: narrow road with cliff walls on sides, rocky terrain, dangerous edges, sheer drops, sparse vegetation, wind-worn stones.
- **Uses:** Northreach travel, steep terrain encounters
- **Priority:** Medium
- **Notes:** Show elevation/drops; rocky, harsh terrain

#### Road Scene: Icefields/Snow Route
- **Dimensions:** 48×64 ft (12×16 squares)
- **Description:** Open icefields or snow-covered plains. Features: white/snow-covered ground, occasional ice formations, sparse vegetation, visibility hazards, blowing snow drifts.
- **Uses:** Northern travel (Pale Sickness, future Arctic adventures)
- **Priority:** High
- **Notes:** Cold, harsh, open environment; wind/snow effects

#### Road Scene: River Crossing
- **Dimensions:** 40×30 ft (10×8 squares)
- **Description:** River crossing or ford. Features: flowing water, rocky/sandy banks, stepping stones or shallow ford, trees/vegetation on banks, water current visible.
- **Uses:** Obstacle traversal, water-based encounters
- **Priority:** Low-Medium
- **Notes:** Show water hazard clearly; depth variation

#### Road Scene: Forest Clearing/Resting Spot
- **Dimensions:** 32×32 ft (8×8 squares)
- **Description:** Small clearing in forest suitable for camping/resting. Features: open grass/cleared area, surrounding trees, possibly fallen logs, fire pit or cleared space, visibility in all directions.
- **Uses:** Rest stops, ambush points, night encounters
- **Priority:** Medium
- **Notes:** Open central area with natural cover; good for random encounters

---

### Camping & Rest Locations

#### Wilderness Camp (Generic)
- **Dimensions:** 40×40 ft (10×10 squares)
- **Description:** Makeshift campsite. Features: tents/bedrolls arranged, central campfire, supply packs, rope perimeter or fire ring, pack animals tethered, minimal shelter.
- **Uses:** Party camping, rest encounters, overnight threats
- **Priority:** Medium
- **Notes:** Show clear campfire, arranged sleeping areas, supply storage

#### Mountain Camp/Shelter
- **Dimensions:** 30×35 ft (8×8 squares)
- **Description:** Semi-sheltered mountain camp. Features: rocky outcropping or small cave mouth, central fire, bedrolls, supply storage, natural shelter elements.
- **Uses:** High-altitude rest, mountain encounters
- **Priority:** Medium
- **Notes:** Show natural shelter/protection from wind

#### Cold Anchor Waypoint (Pale Sickness-specific)
- **Dimensions:** 25×30 ft (6×7 squares)
- **Description:** Research station/waypoint. Features: 4 bunks, stove/hearth, supply shelves, workbench, map pinned to wall, cold-weather gear on racks, warm atmosphere.
- **Uses:** Morgo's supply station (Pale Sickness Scene 3), warm rest point, narrative waypoint
- **Priority:** High (specific to adventure)
- **Notes:** Show contrast between warm interior and cold outside; supply focus

---

### Taverns & Inns

#### Tavern Interior (Generic)
- **Dimensions:** 40×50 ft (10×12 squares)
- **Description:** Standard tavern or inn main room. Features: wooden beams, long bar counter, tables and chairs scattered, hearth/fireplace, wooden floor, windows, doors.
- **Uses:** Social encounters, information gathering, hiring missions
- **Priority:** High (campaign hub)
- **Notes:** Standard medieval tavern aesthetic; show bar, seating areas, fireplace

#### Tavern Kitchen (Optional)
- **Dimensions:** 20×25 ft (5×6 squares)
- **Description:** Tavern back kitchen. Features: cooking hearth, tables/preparation surfaces, storage shelves, pantry area, door to main tavern.
- **Uses:** Backstage encounters, chase scenes
- **Priority:** Low-Medium
- **Notes:** Working kitchen space; cramped, functional

#### Inn Common Room (Fireplace Focus)
- **Dimensions:** 35×40 ft (8×10 squares)
- **Description:** Comfortable inn common room. Features: large central fireplace, comfortable seating, wooden beams, windows with shutters, doors to bedrooms, welcoming atmosphere.
- **Uses:** Rest, social encounters, fireside discussions
- **Priority:** Medium
- **Notes:** Emphasis on comfort and warmth; good for quieter scenes

#### Waystone Inn (Guild Headquarters - Pale Sickness-specific)
- **Dimensions:** 50×60 ft (12×15 squares) — larger, main hall only
- **Description:** Guild headquarters main room. Features: large hearth, mission board, tables for parties, comfortable seating, wooden architecture, bustling atmosphere.
- **Uses:** Mission hub, party meetings, guild NPC interactions
- **Priority:** High (campaign hub)
- **Notes:** Larger, impressive space; show mission board, guild aesthetic

---

### Shops & Merchant Locations

#### General Store/Supplies
- **Dimensions:** 25×30 ft (6×7 squares)
- **Description:** General merchandise shop. Features: wooden counters, shelving with supplies, barrels, crates, hanging goods, organized but crowded.
- **Uses:** Resupply, merchant interactions, information
- **Priority:** Medium
- **Notes:** Show counter, organized shelving, supply crates

#### Smithy/Armory
- **Dimensions:** 30×35 ft (8×8 squares)
- **Description:** Blacksmith's workshop or armory. Features: forge/hearth, anvil, weapon racks, armor stands, tools hung on walls, metal work tables.
- **Uses:** Equipment purchases, repairs, combat encounters
- **Priority:** Medium
- **Notes:** Show forge (heat), anvil, weapon racks, working aesthetic

#### Apothecary/Alchemist Shop
- **Dimensions:** 20×25 ft (5×6 squares)
- **Description:** Potion and herb shop. Features: shelving with vials/bottles, preparation tables, mortars, drying herbs hanging from rafters, mysterious bottles and containers.
- **Uses:** Potion purchases, healing services, rare items
- **Priority:** Medium
- **Notes:** Show varied bottle collection, preparation area, mystical aesthetic

#### Market Stall (Outdoor)
- **Dimensions:** 15×20 ft (4×5 squares)
- **Description:** Single marketplace stall or cart. Features: goods displayed on shelves/tables, vendor position, hanging wares, customers/movement space.
- **Uses:** Market encounters, vendor interactions, outdoor commerce
- **Priority:** Low-Medium
- **Notes:** Smaller scale; single trader focus

---

### Community & Government Locations

#### Town Square/Marketplace
- **Dimensions:** 60×60 ft (15×15 squares)
- **Description:** Central town gathering space. Features: open plaza/square, surrounding buildings, fountain or monument in center, vendor stalls on edges, foot traffic flow.
- **Uses:** Social encounters, public scenes, crowd navigation, markets
- **Priority:** High
- **Notes:** Open space with multiple defined areas; show building entrances, central feature

#### Village/Town Hall
- **Dimensions:** 35×40 ft (8×10 squares)
- **Description:** Government/administrative building main room. Features: long table or council seating, display boards/maps, wooden architecture, official atmosphere, doors to offices.
- **Uses:** Official business, town meetings, administrative encounters
- **Priority:** Medium
- **Notes:** Show authority/formal seating, maps/documents

#### Guard Post/Barracks
- **Dimensions:** 40×45 ft (10×11 squares)
- **Description:** Military guard post or barracks. Features: bunks/sleeping areas, weapon racks, armor stands, desk for duty officer, brazier/fireplace, organized military layout.
- **Uses:** Law enforcement encounters, recruitment, military scenes
- **Priority:** Medium
- **Notes:** Show functional military space; organized, disciplined layout

#### Temple/Shrine
- **Dimensions:** 35×45 ft (8×11 squares)
- **Description:** Small community temple or shrine. Features: altar in front, rows of pews/benches, religious iconography, windows for light, candles/braziers, peaceful atmosphere.
- **Uses:** Religious encounters, healing services, sanctuary
- **Priority:** Medium
- **Notes:** Show altar focus, religious aesthetic; peaceful, reverent

---

### Summary Table: All Maps Needed

| Location Type | Specific Name | Dimensions | Pale Sickness? | Generic? | Priority | Status |
|---|---|---|---|---|---|---|
| **Palebank Interiors** | Urgon's Cabin | 4×4 | ✓ | — | High | Needed |
| | Pelc's Curiosities | 5×5 | ✓ | — | High | Needed |
| | Tulgi's Cabin | 4×4 | ✓ | — | Medium | Needed |
| | Irven's Home | 6×5 | ✓ | — | High | Needed |
| | Frostwatch Post | 4×6 | ✓ | — | Low | Needed |
| **Dungeon** | Croaker Cave | 8×5 | ✓ | — | High | EXISTS* |
| | Salsvault Room 1 | 6×4 | ✓ | — | High | Needed |
| | Salsvault Room 2 | 8×6 | ✓ | — | High | Needed |
| | Salsvault Room 3 | 10×8 | ✓ | — | High | Needed |
| | Salsvault Room 4 | 8×8 | ✓ | — | Medium | Needed |
| | Salsvault Room 5 | 4×4 | ✓ | — | CRITICAL | Needed |
| | Salsvault Room 6 | 6×6 | ✓ | — | High | Needed |
| **Travel** | Forest Path | 8×12 | — | ✓ | Medium | Needed |
| | Mountain Pass | 10×12 | — | ✓ | Medium | Needed |
| | Icefields Route | 12×16 | — | ✓ | High | Needed |
| | River Crossing | 10×8 | — | ✓ | Low-Med | Needed |
| | Forest Clearing | 8×8 | — | ✓ | Medium | Needed |
| **Camping** | Wilderness Camp | 10×10 | — | ✓ | Medium | Needed |
| | Mountain Shelter | 8×8 | — | ✓ | Medium | Needed |
| | Cold Anchor | 6×7 | ✓ | — | High | Needed |
| **Taverns** | Tavern Interior | 10×12 | — | ✓ | High | Needed |
| | Tavern Kitchen | 5×6 | — | ✓ | Low-Med | Needed |
| | Inn Common Room | 8×10 | — | ✓ | Medium | Needed |
| | Waystone Inn Hub | 12×15 | — | ✓ | High | Needed |
| **Shops** | General Store | 6×7 | — | ✓ | Medium | Needed |
| | Smithy/Armory | 8×8 | — | ✓ | Medium | Needed |
| | Apothecary | 5×6 | — | ✓ | Medium | Needed |
| | Market Stall | 4×5 | — | ✓ | Low-Med | Needed |
| **Community** | Town Square | 15×15 | — | ✓ | High | Needed |
| | Town Hall | 8×10 | — | ✓ | Medium | Needed |
| | Guard Post | 10×11 | — | ✓ | Medium | Needed |
| | Temple/Shrine | 8×11 | — | ✓ | Medium | Needed |

**Total Maps Needed:** 36 unique maps
- Pale Sickness-specific: 13
- Generic campaign: 23
- \* Croaker Cave already exists but needs VTT grid verification

---

## Generation Parameters

All maps should be generated with:
- **Engine:** SDXL Mapcraft (fast) or FLUX (high quality)
- **Style:** Top-down tactical, 1-inch grids (VTT-ready)
- **DPI:** 96 DPI for screen/VTT use (300 DPI for print)
- **Output Format:** PNG with grid overlay
- **Grid Overlay:** Applied via `apply_grid_overlay` tool (5 ft per square)

---

## Generation Priority Queue

**Phase 1 (Critical - Pale Sickness Adventure):**
1. Salsvault Room 5 (Preservation Chamber) - objective
2. Salsvault Room 1 (Entrance)
3. Croaker Cave (verify existing)
4. Palebank locations (5 shops/homes)

**Phase 2 (High Priority - Adventure Support):**
5. Salsvault Rooms 2-4 & 6
6. Cold Anchor Waypoint
7. Icefields Travel

**Phase 3 (Medium Priority - Campaign Reuse):**
8. Tavern Interior, Waystone Inn
9. Town Square, General Store, Smithy
10. Forest Path, Mountain Pass, Wilderness Camp

**Phase 4 (Low Priority - Optional):**
11. Remaining generic locations (temples, offices, etc.)
