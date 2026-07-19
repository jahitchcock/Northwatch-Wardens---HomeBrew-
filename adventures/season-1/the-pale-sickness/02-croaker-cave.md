---
scene: 2
title: Croaker Cave
location: Smuggler hideout, cliffs west of Palebank (30-minute walk)
---

# Scene 2: Croaker Cave

**Setup:** [Brynn Wraithwood](npcs/season-1/brynn-wraithwood.md) — the Corsair fence who leads this crew (the "B.W." on the cave note) — took a buyer's commission to retrieve Aevorian relics from the ruins up north. His people brought back anything that glowed blue, these vials among them, and he's been quietly fencing the haul across Northreach since. They had no idea the vials were deadly. These are cold, hungry, morally grey people — not monsters. The cure path runs through them, but violence isn't the only route.

---

## VTT Map for This Scene

| Location | Map File | Size | Notes |
|----------|----------|------|-------|
| **Croaker Cave** | `ps-06-croaker-cave_grid.png` | 8×5 squares (40×25 ft) | Central campfire, supply crates, chest on far wall, 5 bandits + leader |

**Setup Note:** Place Brynn and 4 bandits near the campfire. Place Sett (infected bandit) off to one side. Show the chest location at the far wall covered with blankets.

---

<div class="sound-strip">🔊 Set ambience: <button class="snd-cue" data-scene="cave">🎵 Cave</button></div>

## Read Aloud — Approach

> *"The path west follows the cliff line for half a mile before the land drops toward a rocky shore. A fissure in the cliff face — wider than it looks from a distance — opens onto a cave mouth ringed with supply crates and the smell of woodsmoke. You can hear voices echoing inside. Arguing voices."*

## Read Aloud — Inside

> *"The cave smells of damp stone, smoke, and unwashed bodies. Crates and barrels are stacked along the walls, leaving a central space around a small fire where several rough-looking figures warm their hands. They are cold. They are hungry. They are completely unaware of what they've done.*
>
> *On the far wall, a locked chest is half-hidden beneath a pile of blankets."*

---

## Room Description

The cave is roughly 40 feet deep, 25 feet wide at its widest point. A fire burns in the center, surrounded by bedrolls and supply crates. The bandits have been here several weeks — the walls show scratch tallies. One corner has a makeshift latrine screened by a hanging blanket (smells accordingly). The locked chest is against the far wall, covered by two folded blankets.

One bandit — Sett, a young woman with blue-tinged fingers — is sitting apart from the others, staring at her hands. She handled one of the vials directly. She has 5–6 days.

**Interactive elements:**
- **Chest (far wall, DC 12 Thieves' Tools or DC 14 Strength to force):** Two blue glass vials, a pouch of 35 silver, a map scrap marked *"Salsvault — more inside"*, and a note: *"More where these came from. North. Bring me anything glowing blue. — B.W."*
- **Brynn Wraithwood's personal pack (DC 12 Investigation):** A second map showing the icefield route to Salsvault, more detailed than the scrap. Take this — it gives advantage on Survival checks during Scene 3.
- **Sett (infected bandit):** Her condition is visible. She doesn't know why her fingers are cold.

---

## What Happens

**Social path (recommended):**
1. Party announces themselves and their purpose — they need the vials, they know about the disease.
2. Mentioning the disease causes immediate reaction: the bandits look at each other, then at Sett.
3. DC 12 Intimidation: Brynn orders everyone to stand down; hands over the chest key.
4. DC 14 Persuasion: Brynn actively helps — opens the chest, tells them everything he knows about Salsvault.
5. If party offers to cure Sett on return: Brynn gives them detailed directions, [Morgo](npcs/season-1/morgo-delwur.md)'s contact information, and the second map.

<div class="sound-strip">🔊 If combat starts: <button class="snd-cue" data-scene="combat">🎵 Combat</button> &nbsp; SFX: <button class="snd-sfx" data-sfx="explosion">💥 Explosion</button></div>

**Combat path:**
1. Brynn opens with "This is our camp. State your business or leave." He won't attack first.
2. If combat starts: 4 bandits + Brynn engage. Sett does not fight — she retreats to the back.
3. At 50% casualties, Brynn calls for surrender. "We're done. Take what you need."
4. Chest is accessible once bandits are subdued. Sett's condition is discovered during search.

<div class="sound-strip">🔊 After combat / surrender: <button class="snd-cue" data-scene="cave">🎵 Cave</button> &nbsp; SFX: <button class="snd-sfx" data-sfx="dark">💀 Dark</button></div>

**Sett's moral moment:**
Regardless of path, if the party notices Sett's fingers and asks:
> Sett holds up her hand. The tips of two fingers are pale, almost translucent. A faint blue vein traces from knuckle to wrist. "Started three days ago," she says. "Is that... is that what killed the man in Palebank?"

---

## Stat Blocks

### Bandit (×4)
*Medium humanoid, neutral*

**AC** 12 (leather armor) · **HP** 11 (2d8+2) · **Speed** 30 ft.

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 11 (+0) | 12 (+1) | 12 (+1) | 10 (+0) | 10 (+0) | 10 (+0) |

**Senses** passive Perception 10 · **Languages** Common · **CR** 1/8

**Actions**
- **Scimitar.** *Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6+1) slashing damage.
- **Light Crossbow.** *Ranged Weapon Attack:* +3 to hit, range 80/320 ft., one target. *Hit:* 5 (1d8+1) piercing damage.

---

### Bandit Captain — Brynn Wraithwood
*Medium humanoid (human), neutral evil*

**AC** 15 (studded leather) · **HP** 65 (10d8+20) · **Speed** 30 ft.

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 15 (+2) | 16 (+3) | 14 (+2) | 14 (+2) | 11 (+0) | 14 (+2) |

**Saving Throws** STR +4, DEX +5, WIS +2
**Skills** Athletics +4, Deception +4
**Senses** passive Perception 10 · **Languages** Common, Thieves' Cant · **CR** 2

**Actions**
- **Multiattack.** Brynn makes three melee attacks (two with scimitar, one with dagger) **or** two ranged attacks.
- **Scimitar.** *Melee Weapon Attack:* +5 to hit, reach 5 ft., one target. *Hit:* 6 (1d6+3) slashing damage.
- **Dagger.** *Melee or Ranged Weapon Attack:* +5 to hit, reach 5 ft. or range 20/60 ft., one target. *Hit:* 5 (1d4+3) piercing damage.

**Reactions**
- **Parry.** Brynn adds 2 to his AC against one melee attack that would hit him. He must see the attacker and be wielding a melee weapon.

---

## Dialogue Scripts

### Brynn Wraithwood

**Initial (hostile entry):**
> "You walk into my camp with weapons drawn, you'd better have a very good reason. State your business."

**If party mentions the disease / the vials killed someone:**
> *He goes still.* "The blue vials?" *Looks at Sett.* "Hells." *Pause.* "We didn't know. I swear on my mother's grave — we thought they were collector's items. Some Aevorian relic dealer offered coin for them."

**If party asks for the vials back:**
> "They're in the chest. Take them. Take them and go find whatever cure exists, because—" *He glances at Sett again.* "—we may need it."

**If party offers to cure Sett:**
> "You do that, and I'll tell you everything I know about where those vials came from. I'll draw you a map. I'll tell you who I got them from. Whatever you need."

**If party is hostile without cause:**
> "I don't know what your quarrel is with us, but we haven't done anything to you. Yet."

**Under interrogation about Salsvault:**
> "The man who hired me — he called himself a researcher. Gave me a map, told me to bring back anything glowing blue from the ruins up north. Site called Salsvault. Said there was a fortune in there." *Pause.* "He didn't mention it would kill people."

**If reduced to half HP:**
> "Enough! We're done. Take the chest, take the vials, just stop."

### Sett (infected bandit)

**If the party notices her fingers:**
> "Started three days ago. I'm the one who opened one of the vials — wanted to see what was inside. Stupid." *She looks up.* "Is that what killed that man in Palebank?"

**If told she's dying:**
> *Long silence.* "How long?"

**If told there may be a cure:**
> "Then go find it. Don't stop here for me. Go."

**If party offers to come back for her:**
> "I've survived worse than bandits and cold." *Beat.* "Maybe not worse than this, though."

---

## Key Rolls

| DC | Skill | Result |
|----|-------|--------|
| 12 | Stealth (approach) | Gain surprise; bandits don't know party is here |
| 12 | Perception (approach) | Hear the arguing inside; 6 distinct voices |
| 10 | Insight (bandits) | They didn't know the vials were dangerous |
| 12 | Intimidation (Brynn) | He surrenders; hands over chest key |
| 14 | Persuasion (Brynn) | He cooperates fully + gives second map |
| 10 | Investigation (chest area) | Spot the chest under the blankets |
| 12 | Thieves' Tools (chest) | Unlock without forcing |
| 14 | Strength (chest) | Force the lock (loud — wakes anyone sleeping) |
| 12 | Investigation (Brynn's pack) | Find the detailed Salsvault map |

---

## Time Pressure

Recovering the vials stops further infections in Palebank — frame this to the party explicitly. "As long as those vials exist outside containment, anyone who touches them could become the next [Urgon](npcs/core/urgon-wenth.md)." Every hour in Croaker Cave is an hour of potential additional exposure in the village.

---

## Escalation

- **If party kills all the bandits:** The chest is accessible; the second map is in Brynn's pack. Sett is mortally wounded in the crossfire unless the party specifically protects her. The information about the patron who hired Brynn is lost unless someone searched Brynn's body (DC 10 Investigation: a letter signed only "Acquisitions," with a Stilben drop-address — the party's first faint trace of [The Buyer](npcs/season-1/the-buyer.md)).
- **If party skips Croaker Cave entirely:** They arrive at Salsvault without the vials and the full context. Morgo at the Cold Anchor knows Brynn by reputation and can partially fill in: "There was a fence — big fellow, northerner — buying Aevorian artifacts. Haven't seen him in weeks."
- **If combat drags past 3 rounds:** Brynn calls for a ceasefire. "This is pointless. We're not dying over a chest. What do you actually want?"
- **If party wants to take the infected vials with them:** They can — they're the disease vector. Handle with cloth or gloves (DC 11 Con save to avoid infection if handled barehanded for more than a minute).
