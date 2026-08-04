---
scene: 4
title: Salsvault — The Frozen Laboratory
location: Buried Aevorian research facility, northern icefields
---

# Scene 4: Salsvault — The Frozen Laboratory

**Setup:** Cold metal, blue light, drifting spores, humming machinery. The facility is still operational after hundreds of years — its constructs patrol, its containment systems still function (badly), and its climate controls have failed catastrophically. The party must reach the Preservation Chamber (Room 5) to retrieve the antidote. The Control Room (Room 6) is optional but contains the campaign's biggest revelation. Every hour inside: DC 11 Constitution save or gain one level of exhaustion from cold (resistance from Morgo's gear negates this). Additional DC 11 Con save each time party disturbs a spore vent (marked per room).

---

## Facility Overview

Six rooms in sequence. The party enters at Room 1 and must reach Room 5. Room 6 branches off Room 5. They do not need to clear every room — stealth and clever routing is valid.

```
[Entrance] → [Research Labs] → [Containment Hall] → [Construct Storage] → [Preservation Chamber] ↔ [Control Room]
    1               2                  3                    4                      5                      6
```

## VTT Maps for This Facility

Click **→ VTT** to send each map with effects to your VTT display:

| Room | Send to VTT | Size | Key Features | Encounters |
|------|------------|------|--------------|------------|
| **1: Entrance Hall** | <a onclick="openVttModal('/raw?path=adventures/season-1/the-pale-sickness/maps/pale-sickness/ps-07-salsvault-room1-entrance_grid.png')" style="cursor: pointer; color: var(--accent); text-decoration: underline;">→ VTT</a> | 6×4 (30×20 ft) | Metal walls, blue glyphs, iced floor, side corridors | 2 Flying Swords, spore vent |
| **2: Research Labs** | <a onclick="openVttModal('/raw?path=adventures/season-1/the-pale-sickness/maps/pale-sickness/ps-08-salsvault-room2-labs_grid.png')" style="cursor: pointer; color: var(--accent); text-decoration: underline;">→ VTT</a> | 8×6 (40×30 ft) | Workbenches, shelving, blue vial on rack, schematic | 2 Animated Armor, 2 spore vents |
| **3: Containment Hall** | <a onclick="openVttModal('/raw?path=adventures/season-1/the-pale-sickness/maps/pale-sickness/ps-09-salsvault-room3-containment_grid.png')" style="cursor: pointer; color: var(--accent); text-decoration: underline;">→ VTT</a> | 10×8 (50×40 ft) | 8 sealed pods, Pod 7 destroyed, blue mist | Continuous spore exposure (DC 11 Con/round) |
| **4: Construct Storage** | <a onclick="openVttModal('/raw?path=adventures/season-1/the-pale-sickness/maps/pale-sickness/ps-10-salsvault-room4-storage_grid.png')" style="cursor: pointer; color: var(--accent); text-decoration: underline;">→ VTT</a> | 8×8 (40×40 ft) | 12 dormant armor alcoves, schematic on workbench | ⚠️ ALL 12 activate if any disturbed — AVOID |
| **5: Preservation Chamber** | <a onclick="openVttModal('/raw?path=adventures/season-1/the-pale-sickness/maps/pale-sickness/ps-11-salsvault-room5-preservation_grid.png')" style="cursor: pointer; color: var(--accent); text-decoration: underline;">→ VTT</a> | 4×4 (20×20 ft) | Warm room (contrasts with rest), gold & blue vials | **OBJECTIVE** — Retrieve 6 gold vials (antidote) |
| **6: Control Room** | <a onclick="openVttModal('/raw?path=adventures/season-1/the-pale-sickness/maps/pale-sickness/ps-12-salsvault-room6-control_grid.png')" style="cursor: pointer; color: var(--accent); text-decoration: underline;">→ VTT</a> | 6×6 (30 ft diameter) | Central console, crystal displays, security recording | Optional — reveals campaign mystery |

**DM Tips:**
- Load Room 1 as party enters facility
- Advance to next room as they progress (don't pre-load all)
- Use the modal to add effects (fog for spore vents, darkness for containment, etc.)
- Room 5 is the goal; Room 6 is optional but essential for campaign revelation

---

<div class="sound-strip">🔊 Set ambience: <button class="snd-cue" data-scene="dungeon">🎵 Dungeon</button></div>

## Room 1: Entrance Hall

### Read Aloud
> *"The entrance is a dark rectangle in the metal wall. Inside, the air is cold enough to hurt — colder than outside, which should not be possible. The walls are smooth dark metal etched with geometric glyphs that pulse faintly with blue light. The floor is covered in a thin layer of frost. Urgon's bootprints are still here, frozen in place.*
>
> *Two metal shapes hang in the air at the far end of the hall, rotating slowly. They resolve into swords — longswords, blades gleaming, with no hands to hold them."*

### Room Description
A 30-by-20-foot entry chamber. Ceiling 15 feet high. Two narrow corridors branch left and right (dead ends — former guard posts, now collapsed). The main passage leads forward. Aevorian glyphs cover every surface. The floor is iced over — thin patches (DC 12 Acrobatics or Dexterity save to cross without slipping; failure = prone and 1d4 bludgeoning). A spore vent is set in the ceiling, cracked open: blue mist drifts down slowly.

**Spore vent:** DC 11 Constitution save on entering if vent is not blocked. DC 12 Athletics or Dexterity (thieves' tools) to jam it shut with available materials.

**Interactive elements:**
- **[Urgon](npcs/core/urgon-wenth.md)'s bootprints:** Lead straight to the Containment Hall (Room 3), bypassing the Research Labs. Party can follow them.
- **Aevorian glyphs (DC 13 Arcana to read):** Warning signs. "CONTAINMENT BREACH — SECTOR 3" and "AUTHORIZED PERSONNEL ONLY."
- **Left dead-end:** A collapsed guard post. Contains a dead construct (inert — parts salvageable) and a sealed container with 2 potions of healing.

### Stat Blocks

<div class="sound-strip">🔊 Swords activate: <button class="snd-cue" data-scene="combat">🎵 Combat</button> &nbsp; SFX: <button class="snd-sfx" data-sfx="arcane">🔮 Arcane</button></div>

#### Flying Sword (×2)
*Small construct, unaligned*

**AC** 17 · **HP** 17 (5d6) · **Speed** 0 ft., fly 50 ft. (hover)

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 12 (+1) | 15 (+2) | 11 (+0) | 1 (−5) | 5 (−3) | 1 (−5) |

**Saving Throws** DEX +4
**Damage Immunities** poison, psychic
**Condition Immunities** blinded, charmed, deafened, frightened, paralyzed, petrified, poisoned
**Senses** blindsight 60 ft. (blind beyond this radius), passive Perception 7
**Languages** — · **CR** 1/4

**Traits**
- **Antimagic Susceptibility.** The sword is incapacitated while in the area of an *antimagic field*. If targeted by *dispel magic*, it must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute.
- **False Appearance.** While motionless and not flying, the sword is indistinguishable from a normal sword.

**Actions**
- **Longsword.** *Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 5 (1d8+1) slashing damage.

*Note: Flying Swords in Salsvault are malfunctioning — they occasionally attack each other (DM's discretion, 1-in-6 chance per round of targeting the other sword instead of a player). This can be exploited.*

---

<div class="sound-strip">🔊 Armor activates: <button class="snd-cue" data-scene="combat">🎵 Combat</button></div>

## Room 2: Research Laboratories

### Read Aloud
> *"The corridor opens into a larger chamber — a laboratory, or what remains of one. Metal tables line the walls, covered in equipment that might once have been recognizable but has been frozen and distorted by centuries of cold. Glass containers line shelves, most shattered, a few intact. Papers and bound volumes — miraculously preserved by the cold — sit in neat stacks.*
>
> *Two armored figures stand motionless at the far end of the room. As your light reaches them, their helmet visors turn."*

### Room Description
40-by-30-foot laboratory. Ceiling 12 feet high. Three metal workbenches, two intact shelving units, one collapsed. The preserved notes and volumes are in Aevorian — mostly illegible, but useful for context. Blue spore residue coats the countertops around cracked containers. One intact blue vial sits in a sealed rack (this is the disease source; clearly labeled in Aevorian — DC 10 Arcana to recognize the label means "HAZARDOUS / DO NOT OPEN").

**Spore vent:** Two cracked vents in this room, both active. DC 11 Con save each on entering unless party moved quickly through Room 1.

**Interactive elements:**
- **Preserved notes (DC 12 Arcana to read partial Aevorian):** References to *"Project Woe — divine-resistant biological agent. Field test phase. Containment breach in Sector 3 deemed acceptable for test parameters."* The phrase "divine-resistant" is significant — this was designed to kill gods.
- **Intact blue vial (sealed rack):** Do not open. If opened, everyone in the room makes DC 13 Con save or contracts frigid woe.
- **Schematic on the wall (DC 10 Investigation):** Partial facility map. Shows the Preservation Chamber (Room 5) marked with a gold star — "ANTIDOTE STORAGE." Also shows the Control Room (Room 6).

### Stat Blocks

#### Animated Armor (×2)
*Medium construct, unaligned*

**AC** 18 (natural armor) · **HP** 33 (6d8+6) · **Speed** 25 ft.

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 14 (+2) | 11 (+0) | 13 (+1) | 1 (−5) | 3 (−4) | 1 (−5) |

**Damage Immunities** poison, psychic
**Condition Immunities** blinded, charmed, deafened, exhaustion, frightened, paralyzed, petrified, poisoned
**Senses** blindsight 60 ft. (blind beyond this radius), passive Perception 6
**Languages** — · **CR** 1

**Traits**
- **Antimagic Susceptibility.** The armor is incapacitated while in the area of an *antimagic field*. If targeted by *dispel magic*, it must succeed on a Constitution saving throw against the caster's spell save DC or fall unconscious for 1 minute.
- **False Appearance.** While motionless, the armor is indistinguishable from a normal suit of armor.

**Actions**
- **Multiattack.** The armor makes two slam attacks.
- **Slam.** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 5 (1d6+2) bludgeoning damage.

*Note: Animated Armor constructs defend territory — they do not pursue beyond the room they were activated in. Party can run and the constructs will stop at the doorway.*

**Scaling:** For parties of 4+ players above level 3, replace one Animated Armor with a **Helmed Horror** (AC 20, HP 60, Multiattack 2 longswords at +6 for 1d8+4 each, spell immunity to 3 spells of DM's choice, fly 30 ft.).

---

<div class="sound-strip">🔊 After combat: <button class="snd-cue" data-scene="dungeon">🎵 Dungeon</button> &nbsp; SFX: <button class="snd-sfx" data-sfx="dark">💀 Dark</button></div>

## Room 3: Containment Hall

### Read Aloud
> *"The corridor narrows before opening into a longer chamber lined with sealed metal doors — containment pods, you realize. Most are intact, their doors sealed with blue-glowing locks. One pod at the far end has been destroyed from the inside. The door is torn off its hinges, bent outward. Burn marks radiate from the opening in a starburst pattern. Whatever was inside is long gone.*
>
> *Spore vents along the ceiling are fully open here, misting blue vapor continuously."*

### Room Description
50-foot-long corridor-chamber. Eight containment pods line the walls (four each side). Seven sealed. One destroyed — Pod 7, the breach point. The spore vents are all active and cannot be closed without a DC 18 Engineering/Arcana check (effectively impossible for most parties — the party needs to move through quickly).

**Spore exposure:** DC 11 Con save each round spent in Room 3. Movement through takes 1 round normally, 2 rounds if examining pods.

**Interactive elements:**
- **Pod 7 (the breach):** Burn marks on the inside of the torn door. Temperature inside the pod is warmer than the rest of the facility. A residue on the walls matches the disease samples — but also shows something else: large claws, human-sized. Something alive was in here.
- **Sealed pod labels (DC 12 Arcana):** "SAMPLE — FRIGID WOE — BATCH 7-C," "SAMPLE — FRIGID WOE — BATCH 7-D," etc. Seven variants of the same disease.
- **Urgon's bootprints:** Continue through this room toward the sample racks and back out — giving the ruined pod a wide berth. Pod 7 was already breached when he arrived (that's what frightened him). He grabbed two sealed blue vials and fled; he did not cause this. Whatever burst out of Pod 7 is a separate, older mystery.

---

## Room 4: Construct Storage

### Read Aloud
> *"A wide room filled with alcoves, each holding a dormant metal figure. Twelve of them, standing still, visors dark. A workbench in the center holds a damaged schematic. The room is quiet — quieter than anywhere else in the facility."*

### Room Description
40-by-40-foot storage bay. Twelve dormant Animated Armors in wall alcoves. They do not activate unless attacked or unless a creature makes more than 20 points of damage in a round within the room (loud impact). The schematic on the workbench is important.

**Interactive elements:**
- **Schematic (DC 10 Investigation):** Facility layout showing the Preservation Chamber (Room 5) and its exact location. Also shows the Control Room (Room 6) accessible from Room 5 via a side passage. Crucially: shows the Control Room is the activation nexus — *"Manual override console. Emergency shutdown."*
- **Dormant constructs:** Do not engage unless provoked. If one activates, all twelve activate simultaneously. *Do not provoke them.*
- **Side note on schematic:** A handwritten annotation (not Aevorian — modern Common): *"Activation logged. Seal holding. Recommend full deployment at Site Theta on schedule. — V."* This is the first direct evidence of the antagonist.

---

<div class="sound-strip">🔊 Antidote found: <button class="snd-sfx" data-sfx="success">✅ Success</button> &nbsp; Calm: <button class="snd-cue" data-scene="night">🎵 Night</button></div>

## Room 5: Preservation Chamber

### Read Aloud
> *"The door to this chamber glows gold at its edges — warm light instead of the facility's cold blue. Inside, the temperature is startling: warm, almost pleasant. The humming here is different, steadier, lower. Rows of sealed containers line the walls, most holding blue vials. But in the center rack, secured individually, are six gold-capped vials. The liquid inside is warm amber.*
>
> *A label above them, in Aevorian and — remarkably — in Common: ANTIDOTE."*

### Room Description
20-by-20-foot preservation room. Climate-controlled (the only room not deadly cold). Walls lined with sealed racks. The blue vials (disease samples) are clearly labeled separately from the gold vials (antidote). Six gold vials remain intact; 1d4+2 more are shattered on the floor (broken during the reactivation event).

**Interactive elements:**
- **Gold vials (antidote):** 6 intact. Each cures one person with frigid woe completely (full rest, then ice recedes). DC 10 Arcana confirms they are the cure.
- **Blue vials (disease samples):** Do not touch. DC 10 Arcana reads the label correctly. These are research-grade pathogens — more potent than the field samples.
- **Failsafe note (DC 12 Investigation, pinned to the rack):** In Aevorian: *"Antidote formula preserved per Director's order. Note: Aevor feared its own creations. The antidote was never distributed to avoid revealing the weapon's existence. Tragic irony recorded for the archive."*

---

<div class="sound-strip">🔊 SFX: <button class="snd-sfx" data-sfx="ritual">🔔 Ritual</button></div>

## Room 6: Central Control Room

*Optional — the party does not need to come here for the antidote. But this room answers the campaign's central question.*

### Read Aloud
> *"A circular room dominated by a central console — metal, dark, covered in Aevorian glyphs that glow steadily blue. Screens of some crystalline material show readings in Aevorian. In the center of the console, a depression shaped like a hand — and around it, glyphs that even without a translation feel like a warning.*
>
> *As you approach, the console responds. Images form in the crystal screens: logs, dates, activation records. And one image that is not a log — a figure, hooded, non-human, standing at this exact console. Looking up. As if it knew someone would eventually come to see."*

### Room Description
30-foot diameter circular room. Console in the center. Six crystal display panels arranged around it. The room is warm — the console generates heat. The logs are accessible (DC 12 Arcana to parse Aevorian interface).

**Interactive elements:**
- **Activation logs (DC 12 Arcana):** Manual activation of Salsvault 3–4 months ago, precise date logged. Cross-referenced against Wolves of Welton timeline: the activation happened 2 days before the Welton wolves changed. This was not a coincidence — Salsvault's reactivation sent a pulse of Aevorian energy across the region.
- **Facility map (DC 14 Arcana):** References to "Site Theta," "Site Vharos," "Site 9-B." Salsvault is one node in a network. The map shows approximate locations — all in the Far North.

<div class="sound-strip">🔊 Hooded figure revealed: <button class="snd-sfx" data-sfx="dark">💀 Dark</button></div>

- **The hooded figure image:** Non-human (wrong proportions — too tall, too thin, joints not quite right). At the console. The image is from the activation event — a security recording. DC 17 Arcana: the figure's movements at the console are deliberate and knowledgeable. This was not accidental discovery. Someone knew exactly how to turn Salsvault on.
- **Emergency shutdown (DC 15 Arcana to operate):** Party can shut down Salsvault. This reduces Echo interference in the region for 2d6 months. [Elric](npcs/core/elric-vael.md) will be conflicted about this ("invaluable research, lost").

### Key Rolls — Room 6

| DC | Skill | Reveals |
|----|-------|---------|
| 12 | Arcana (console) | Activation logs — manual, dated |
| 14 | Arcana (map panel) | Network of sites: Theta, Vharos, 9-B |
| 15 | Arcana (shutdown) | Successfully shut down Salsvault |
| 17 | Arcana (figure image) | Deliberate, knowledgeable activation |

---

## Facility-Wide Key Rolls

| DC | Skill | Result |
|----|-------|--------|
| 11 | Constitution (hourly) | Avoid exhaustion from cold |
| 11 | Constitution (spore exposure) | Avoid frigid woe onset |
| 12 | Arcana (glyphs, Room 1) | Read warning signs |
| 12 | Arcana (notes, Room 2) | Understand Project Woe |
| 10 | Arcana (Preservation Chamber) | Confirm gold vials = antidote |
| 12 | Arcana (Control Room) | Read activation logs |

---

## Time Pressure

DC 11 Constitution save each hour (cold exhaustion). Party moving efficiently through the facility should spend 2–3 hours inside. Every fight slows them down. Remind players: the clock in Palebank is still running.

If the party disturbs the constructs in Room 4 and triggers a full activation: the twelve Animated Armors pursue into Rooms 3 and 2 but stop at the facility entrance — they do not leave the building.

---

## Escalation

- **Party getting overwhelmed:** Constructs defend and do not pursue beyond their room. Running is always an option. Room 5 (the antidote room) is the only objective — if they grab the vials and run, they win.
- **Hidden cache (emergency):** [Morgo](npcs/season-1/morgo-delwur.md)'s supply box outside the entrance. 2d4 potions of healing in a waterproof case under a cairn marked with two crossed rocks, 10 feet left of the entrance.
- **If party can't operate the Control Room console:** Elric can analyze rubbing/sketches of the glyphs after the adventure. The revelation still happens — just delayed.
- **Partial collapse trigger:** If the party uses a fire-based area spell in Room 2 or Room 3, unstable ice in the ceiling fractures. Everyone makes DC 13 Dexterity save or takes 3d6 bludgeoning damage and is knocked prone. The facility is not destroyed but the path back to Room 1 requires DC 14 Athletics to navigate rubble.
