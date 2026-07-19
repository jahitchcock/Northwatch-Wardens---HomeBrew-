# Pale Sickness — VTT Map Reference

Quick reference linking adventure scenes to VTT maps.

**Location:** `adventures/season-1/the-pale-sickness/maps/`

---

## Scene 1: Palebank Investigation

Palebank Village, where the outbreak begins. Multiple small locations for investigation.

| Location | Map File | Type | Dimensions | Purpose |
|----------|----------|------|------------|---------|
| **Urgon's Cabin** | `pale-sickness/ps-01-urgons-cabin_grid.png` | Investigation | 4×4 squares (20×20 ft) | Blacksmith's home where Urgon died. Contains chest with journal, forge, workbench. |
| **Pelc's Curiosities** | `pale-sickness/ps-02-pelcs-curiosities_grid.png` | Investigation | 5×5 squares (25×25 ft) | Trading post where vials were sold. Show forced entry at rear window. |
| **Tulgi's Cabin** | `pale-sickness/ps-03-tulgis-cabin_grid.png` | Investigation | 4×4 squares (20×20 ft) | Dying investigator's home. Neat, sparse, emotional scene. |
| **Irven's Home** | `pale-sickness/ps-04-irvens-home_grid.png` | Investigation | 6×5 squares (30×25 ft) | Family residence. Desperate father with infected children. Merchant home atmosphere. |
| **Frostwatch Guard Post** | `pale-sickness/ps-05-frostwatch-post_grid.png` | Investigation | 4×6 squares (20×30 ft) | Military outpost where Mila Teno is stationed. Guard post functionality. |

**Scene Flow:**
1. Party arrives at frozen Urgon statue (in village square - theater of mind)
2. Investigate Urgon's cabin → find journal + sale record
3. Visit Pelc's Curiosities → find receipt + forced entry evidence
4. Interview Tulgi or Irven → get Croaker Cave lead
5. Optional: Talk to Mila at Guard Post → timeline confirmation

---

## Scene 2: Croaker Cave

Smuggler hideout where infected vials are stored. Combat or negotiation encounter.

| Location | Map File | Type | Dimensions | Purpose |
|----------|----------|------|------------|---------|
| **Croaker Cave** | `pale-sickness/ps-06-croaker-cave_grid.png` | Combat/Negotiation | 8×5 squares (40×25 ft) | Bandit hideout with 5 bandits + Brynn (leader). Central campfire, crates, chest, latrine. |

**Encounter:**
- **Social Path:** Announce purpose → mention disease → Brynn surrenders/cooperates
- **Combat Path:** Brynn opens with "State your business" → combat starts if party acts hostile
- **Key Elements:** 
  - Central campfire (difficult terrain if crossed, smoke obscures)
  - Supply crates (half cover)
  - Locked chest on far wall (contains 2 vials + map + items)
  - Sett (infected bandit) in corner showing symptoms
  - Cave entrance/escape route

---

## Scene 3: Journey to Salsvault

Travel to the frozen northern ruins. Includes rest stop and waypoint.

| Location | Map File | Type | Dimensions | Purpose |
|----------|----------|------|------------|---------|
| **Cold Anchor Waypoint** | `pale-sickness/ps-13-cold-anchor-waypoint_grid.png` | Rest/Research | 6×7 squares (30×35 ft) | Morgo's supply station. Warm interior, bunks, research table, maps, cold-weather gear. |

**Travel Encounters:**
- Use `generic/generic-03-icefields-route_grid.png` for overland travel scenes
- Use `generic/generic-07-mountain-shelter_grid.png` if party camps on way
- Describe travel hazards (Constitution saves vs. exhaustion, cold exposure)
- Cold Anchor is mandatory rest point where Morgo provides supplies and direction

**Morgo Interaction:**
- Party discovers warm shelter (contrast with cold outside)
- Morgo offers gear, map, and information about Salsvault approach
- Brief respite before final push to facility

---

## Scene 4: Salsvault — The Frozen Laboratory

**Critical sequence:** 6 connected rooms inside Aevorian facility. Room 5 (Preservation Chamber) is the objective.

### Facility Layout

```
[Entrance] → [Labs] → [Containment] → [Storage] ↔ [Preservation] → [Control]
    1           2            3              4              5              6
```

All rooms are cold, metallic, with blue Aevorian glyphs. Spore hazards throughout.

### Room Maps

| Room | Map File | Type | Dimensions | Purpose | Encounters |
|------|----------|------|------------|---------|------------|
| **1: Entrance Hall** | `pale-sickness/ps-07-salsvault-room1-entrance_grid.png` | Combat | 6×4 (30×20 ft) | Iced entry with glyphs, metal corridors. | 2 Flying Swords, spore vent, slippery floor |
| **2: Research Labs** | `pale-sickness/ps-08-salsvault-room2-labs_grid.png` | Combat | 8×6 (40×30 ft) | Workbenches, shelving, preserved texts. Blue vial visible (DO NOT OPEN). | 2 Animated Armor, spore vents (2), hazardous vial |
| **3: Containment Hall** | `pale-sickness/ps-09-salsvault-room3-containment_grid.png` | Hazard | 10×8 (50×40 ft) | 8 sealed pods, 1 destroyed (Pod 7). Continuous spore mist. | Spore exposure (DC 11 Con save each round), narrative mystery |
| **4: Construct Storage** | `pale-sickness/ps-10-salsvault-room4-storage_grid.png` | Stealth/Bypass | 8×8 (40×40 ft) | 12 dormant Animated Armor in alcoves. Schematic on workbench. | Dormant constructs (all 12 activate if 1 is disturbed) — avoid combat |
| **5: Preservation Chamber** | `pale-sickness/ps-11-salsvault-room5-preservation_grid.png` | OBJECTIVE | 4×4 (20×20 ft) | Warm room, climate-controlled. Gold vials (antidote) in center rack. | None — this is the goal. Retrieve 6 vials, cure the infected |
| **6: Control Room** | `pale-sickness/ps-12-salsvault-room6-control_grid.png` | Revelation | 6×6 (30 ft diameter) | Central console, crystal screens. Hooded figure security recording. | Optional — reveals campaign mystery, can shut down facility |

### Critical Notes

- **Time Pressure:** Each hour inside = DC 11 Con save vs. exhaustion from cold
- **Spore Exposure:** Certain rooms have active spore vents = DC 11 Con save or gain exhaustion
- **Construct Activation:** Room 4 has 12 dormant armors — DO NOT DISTURB unless party wants to fight all 12
- **Narrative:** Urgon's bootprints visible in Rooms 1 & 3; he fled after seeing Pod 7 destroyed
- **Stealth Optional:** Party can bypass combat if they move carefully and avoid spore vents
- **Objective:** Reach Room 5, retrieve 6 gold-capped vials (cure)
- **Optional:** Room 6 reveals Salsvault was manually activated + network of Aevorian sites (hooks to Season 2)

### Room-by-Room Guidance

**Room 1 (Entrance):**
- Flying Swords guard entry — can be sneak attacked or fought
- Spore vent in ceiling (can be jammed with DC 12 Athletics/thieves' tools)
- Floor is iced (DC 12 Acrobatics to cross without slipping)
- Dead construct in left dead-end (2 potions of healing available)

**Room 2 (Labs):**
- 2 Animated Armor defend territory
- Blue vial labeled "HAZARDOUS" on shelf — opening it contracts frigid woe (DC 13 Con save)
- Schematic on wall shows Room 5 + Room 6 locations
- Spore vents (2) — continuous hazard
- Party can read partial Aevorian notes (DC 12 Arcana) for "Project Woe" clues

**Room 3 (Containment):**
- NO combat — pure hazard/discovery
- 8 sealed pods, 7 labeled with "FRIGID WOE BATCH" variants
- Pod 7 is the breach point (destroyed from inside, burn marks, claw marks)
- Continuous blue spore mist (DC 11 Con save each round spent here)
- Party realizes something lived in Pod 7 (narrative hook for future season)
- Urgon's prints follow around the pod, exit quickly

**Room 4 (Storage):**
- 12 dormant Animated Armor in alcoves
- If ANY are attacked or loud impact occurs (>20 damage in round), all 12 activate
- Party should NOT engage if possible
- Schematic shows Room 5 (marked with gold star "ANTIDOTE STORAGE")
- Schematic also shows Room 6 (Control Room) with "Manual override" notation

**Room 5 (Preservation):**
- WARM room (contrasts with rest of facility)
- Objective: 6 intact gold-capped vials (antidote)
- 1d4+2 additional vials are shattered on floor
- Failsafe note explains Aeor feared its own creations (narrative detail)
- NO combat, NO hazards
- Party wins when they obtain 6 vials (can cure Tulgi, Irven's family, Sett if promised)

**Room 6 (Control):**
- OPTIONAL but essential for campaign revelation
- Central console with hand-shaped depression
- 6 crystal display panels showing logs
- Logs show manual activation 3-4 months ago (tied to Wolves of Welton event)
- Hooded figure image in security recording (non-human, deliberately activated Salsvault)
- Facility map shows network: Site Theta, Site Vharos, Site 9-B
- Party can shut down Salsvault (DC 15 Arcana) — reduces Echo interference for 2d6 months

---

## Recommended VTT Setup

1. **Pre-session prep:**
   - Import all 13 Pale Sickness maps to your VTT
   - Create scenes: one for each location
   - Set token size = 5 ft per square
   - Pre-configure lighting for Salsvault (dim light, no visibility outside room)

2. **Scene 1 — Palebank (Theater of Mind + Maps):**
   - Describe village, frozen Urgon statue
   - Use maps only when entering specific buildings
   - Load map when party enters Urgon's cabin, etc.

3. **Scene 2 — Croaker Cave:**
   - Load map before encounter
   - Place bandit tokens, campfire token
   - Prepare for social or combat path

4. **Scene 3 — Journey (Theater of Mind + Cold Anchor):**
   - Describe icefields travel
   - Load Cold Anchor map when party arrives
   - Short rest/resupply scene

5. **Scene 4 — Salsvault (All Maps):**
   - Have all 6 room maps pre-loaded in a collection
   - Load Room 1 as party enters
   - Transition maps as party moves through facility
   - Use fog of war to hide encounters until party enters each room

---

## Map Quick Links

**All 32 maps available in `maps/` directory:**
- **Pale Sickness:** 13 location-specific maps (ps-01 through ps-13)
- **Generic Campaign:** 19 reusable maps (generic-01 through generic-19)

See `maps/VTT_IMPORT_GUIDE.md` for platform-specific import instructions.

Generated: 2026-07-18  
Format: VTT-ready PNG + grid overlay  
Scale: 1 inch = 5 ft (D&D standard)
