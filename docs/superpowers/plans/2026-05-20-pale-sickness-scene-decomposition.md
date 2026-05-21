# The Pale Sickness — Scene Decomposition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Decompose `adventures/season-1/the-pale-sickness.md` into a folder with an index card + 5 enriched scene files (full stat blocks, room descriptions, NPC dialogue scripts), and update server.js to serve `index.md` when an adventure folder is opened.

**Architecture:** Create `adventures/season-1/the-pale-sickness/` directory. Modify `/preview` endpoint in server.js to check for `index.md` when serving a directory inside a WEB_DIRS path — if found, serve that file instead of the generic folder listing. Delete the old single-file once the folder is verified.

**Tech Stack:** Node.js/Express (server.js), standard markdown (.md files)

---

## File Map

| Action | Path |
|--------|------|
| Modify | `web/server.js` — `/preview` directory handler |
| Create | `adventures/season-1/the-pale-sickness/index.md` |
| Create | `adventures/season-1/the-pale-sickness/01-palebank-investigation.md` |
| Create | `adventures/season-1/the-pale-sickness/02-croaker-cave.md` |
| Create | `adventures/season-1/the-pale-sickness/03-journey-to-salsvault.md` |
| Create | `adventures/season-1/the-pale-sickness/04-salsvault.md` |
| Create | `adventures/season-1/the-pale-sickness/05-return-resolution.md` |
| Delete | `adventures/season-1/the-pale-sickness.md` |

---

## Task 1: Update server.js — serve index.md for adventure folders

**Files:**
- Modify: `web/server.js:372-390` (the `if (stat.isDirectory())` block in `/preview`)

- [ ] **Step 1: Locate the directory handler in `/preview`**

In `web/server.js`, find the block starting at line ~372:
```javascript
if (stat.isDirectory()) {
  const entries = fs.readdirSync(filePath, { withFileTypes: true })
    ...
  res.send(`<!DOCTYPE html>...`);
  return;
}
```

- [ ] **Step 2: Replace the directory handler with index.md detection**

Replace the entire `if (stat.isDirectory())` block with:

```javascript
if (stat.isDirectory()) {
  // If the directory is in a WEB_DIRS path and has an index.md, serve it directly
  const indexMd = path.join(filePath, 'index.md');
  if (isWebPath(filePath) && fs.existsSync(indexMd)) {
    const { html, title } = renderWebMarkdown(indexMd);
    res.send(webPreviewHtml(title, html));
    return;
  }

  const entries = fs.readdirSync(filePath, { withFileTypes: true })
    .filter(showEntry)
    .sort((a, b) => (a.isDirectory() === b.isDirectory() ? a.name.localeCompare(b.name) : a.isDirectory() ? -1 : 1));
  const items = entries.map(e => {
    const rel = toRel(path.join(filePath, e.name));
    const icon = e.isDirectory() ? '📁' : IMAGE_EXTS.has(path.extname(e.name).toLowerCase()) ? '🖼' : '📄';
    return `<a href="/preview?path=${encodeURIComponent(rel)}" class="entry">${icon} ${esc(e.name)}</a>`;
  }).join('');
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    body{background:#1e1e2e;margin:0;padding:16px;font-family:'Segoe UI',sans-serif;color:#cdd6f4}
    h3{margin:0 0 10px;color:#cba6f7;font-size:13px;font-weight:500}
    .entry{display:flex;align-items:center;gap:8px;padding:5px 10px;border-radius:6px;cursor:pointer;color:#cdd6f4;text-decoration:none;font-size:13px}
    .entry:hover{background:#313244}
  </style></head><body>
    <h3>${esc(path.basename(filePath) || 'Campaign Root')}</h3>${items}
  </body></html>`);
  return;
}
```

- [ ] **Step 3: Restart the server and verify the old single-file still works**

```bash
# Kill any running server then restart
cd web && node server.js &
curl -s "http://localhost:5050/preview?path=adventures/season-1/wolves-of-welton.md" | head -5
# Expected: <!DOCTYPE html> with adventure content (not an error)
```

- [ ] **Step 4: Commit**

```bash
git add web/server.js
git commit -m "feat: serve index.md when adventure folder is opened in preview"
```

---

## Task 2: Create the adventure folder and index.md

**Files:**
- Create: `adventures/season-1/the-pale-sickness/index.md`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p "adventures/season-1/the-pale-sickness"
```

- [ ] **Step 2: Write index.md**

Create `adventures/season-1/the-pale-sickness/index.md` with this exact content:

```markdown
---
name: The Pale Sickness
season: 1
levels: "2-4"
sessions: "2-3"
duration: "8-12 hours"
type: investigation|exploration|combat
mystery-rating: 5
arc: revelation
tags: [investigation, dungeon, aevorian-echo, revelation, salsvault, disease, moral-choice]
---

# The Pale Sickness

A magical disease — frigid woe — is turning Palebank villagers to ice. The cure lies in Salsvault, a buried Aevorian laboratory that recently reactivated and is the source of every prior campaign disturbance. This is the adventure where everything clicks. Tone: mystery and urgency escalating into cold dread, then revelation.

## Hook

Lorewarden Elric Vael sends the party to Palebank on urgent contract: investigate a plague killing residents in unprecedented ways.

> *"Snow falls softly over Palebank Village. Lanterns glow behind frosted windows. As you arrive, villagers gather around a frozen statue — a dwarf locked in a final moment of terror. Elro Aldataur steps forward: 'Thank you for coming. Urgon died of something we've never seen — turned to ice. Now others are showing the same symptoms.'"*

---

## Scenes

| # | Scene | Location |
|---|-------|----------|
| [1](01-palebank-investigation.md) | Palebank Investigation | Palebank Village |
| [2](02-croaker-cave.md) | Croaker Cave | Cliffs west of Palebank |
| [3](03-journey-to-salsvault.md) | Journey to Salsvault | Icefields north |
| [4](04-salsvault.md) | Salsvault — The Frozen Laboratory | Aevorian ruins |
| [5](05-return-resolution.md) | Return and Resolution | Palebank + Waystone |

---

## NPCs

| Name | Voice | Wants | Key Secret |
|------|-------|-------|------------|
| **Elro Aldataur** | Direct, haunted, retired ranger | Stop the outbreak | Will share everything; blames himself for not acting sooner |
| **Tulgi Lutan** | Scared, defensive, dying — regrets the theft | To survive | She broke in and stole the vials; needs DC 15 Persuasion to confess |
| **Irven Liel** | Desperate merchant, terrified for his children | Family saved | Bought vials from a fence; fence went toward Croaker Cave |
| **Mila Teno** | Steady, self-recriminating Frostwatch guard | Truth and prevention | Saw Tulgi near Urgon's cabin; has a timeline |
| **Morgo** | Frost-bearded guide, blunt | Party survives | Knows the ruins were dark last season — now they glow |
| **Lorewarden Elric Vael** | Quiet urgency, connecting patterns | Understand the Echo | Synthesizes all clues at debrief; knows more than he says |

---

## All DCs (flat)

**Scene 1 — Palebank:**
Medicine 10 (magical disease) · Arcana 12 (Aevorian residue) · Investigation 12 (forced entry at Pelc's) · Persuasion 15 (Tulgi confession)

**Scene 2 — Croaker Cave:**
Stealth 13 (gain surprise) · Perception 12 (hear arguing) · Insight 10 (bandits didn't know) · Intimidation 12 (surrender) · Persuasion 14 (hand over vials) · Investigation 10 (find chest)

**Scene 3 — Journey:**
Survival 12 (navigate safely) · Athletics 12 (cross unstable ice) · Constitution 13 (resist wind) · Constitution 11 (hourly vs. exhaustion in Salsvault) · Arcana 12 (Aevorian origin) · History 12 (Aeor built weapons)

**Scene 4 — Salsvault:**
Arcana 10 (Preservation Chamber — gold = cure) · Arcana 15 (Control Room — manual activation) · Arcana 17 (confirm deliberate activation) · Constitution 11 (hourly vs. frigid woe spores)

---

## Decision Points

- **Infected bandits:** let go (may spread vials) / detain (logistical problem) / cure one (costs a vial, earns loyalty)
- **Speed vs. prep:** rush to Salsvault (risk exhaustion + frigid woe) / stop at Cold Anchor (Morgo's gear saves lives)
- **Selective curing:** if vials are scarce — Tulgi vs. Irven's children vs. Irven's partner; no right answer
- **Salsvault fate:** destroy it (Echo weakens; Elric disappointed) / preserve it (ongoing threat + Aevorian knowledge)

---

## Hooks Forward

- Elric's debrief: "Someone triggered this deliberately. Salsvault is only one facility." → **Temple of the Dragonknights**
- Palebank survives → Elro becomes a regional Warden contact
- Aevorian artifacts recovered → multiple factions will want them
```

- [ ] **Step 3: Verify it renders in the browser**

Navigate to `http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness` (no `.md`).
Expected: The index card renders with the styled web preview (tan background, red headings, scene table with links).

- [ ] **Step 4: Commit**

```bash
git add adventures/season-1/the-pale-sickness/index.md
git commit -m "feat: add Pale Sickness adventure folder with index card"
```

---

## Task 3: Write Scene 1 — Palebank Investigation

**Files:**
- Create: `adventures/season-1/the-pale-sickness/01-palebank-investigation.md`

- [ ] **Step 1: Write the file**

Create `adventures/season-1/the-pale-sickness/01-palebank-investigation.md`:

```markdown
---
scene: 1
title: Palebank Investigation
location: Palebank Village — Urgon's cabin, Pelc's Curiosities, Tulgi's cabin, Irven's home
---

# Scene 1: Palebank Investigation

**Setup:** The Wardens have a 7-day clock before Tulgi Lutan dies; 10 days before Irven Liel's family follows. Every location in the village connects to two blue vials that started the outbreak. Elro Aldataur is the party's first contact and will guide them between locations.

---

## Read Aloud — Arrival

> *"Snow falls softly over the coastal settlement of Palebank Village. Lanterns glow behind frosted windows. A cold wind sweeps in from the northern icefields, carrying a quiet dread. As you arrive, villagers gather at a respectful distance around a frozen statue — a dwarf locked mid-stride, hands raised, face a mask of terror. Every detail is perfect. It is not stone. It is him.*
>
> *Elro Aldataur steps forward, breath fogging the air. 'Thank you for coming. That was Urgon. He died of something we've never seen — turned to ice, like a statue. Now others are showing the same symptoms. I need your help before this spreads.'"*

---

## Room Descriptions

### Urgon's Cabin
A one-room trapper's cabin, recently ransacked. Dried herbs and pelts still hang from the rafters, undisturbed. The floor near the storage chest shows boot prints tracked in frost — two sets, one coming, one going, neither matching Urgon's boots (which are still by the door). A faint chill radiates from the chest itself. Urgon's body was removed to the village hall, but his belongings remain. The place smells of cold metal and something faintly chemical — like ice scraped from iron.

- **Chest (locked, DC 10 thieves' tools):** Urgon's journal. Entry three weeks ago: *"Brought back two vials from the site. Blue glass, heavy. Beautiful. Kept one, sold one to Tulgi."* Entry two weeks ago: *"Fingers feel cold."* Entry one week ago: nothing more.
- **Boot prints (DC 12 Investigation):** Prints match Tulgi Lutan's distinctive flat-footed gait. They left in a hurry.
- **Urgon's body (at village hall, DC 10 Medicine):** The disease is magical, not natural. Blue veins visible beneath ice-clear skin. Internal crystallization visible at joints. He did not suffer long.
- **Vial residue on chest shelf (DC 12 Arcana):** Aevorian in origin — cold, unnatural, not aligned with any current school of magic.

### Pelc's Curiosities
A cluttered trading post — every shelf crammed with oddities, preserved specimens, and dubious "artifacts." The proprietor Pelc is tight-lipped until he sees the commission papers from Elric Vael. Signs of forced entry at the rear: a window latch broken inward, a display case lid left ajar. The case still has the receipt.

- **Receipt (DC 10 Investigation):** Urgon sold two blue glass vials to Pelc three weeks ago, marked *"Aevorian — northern site, unidentified."* One sold to Tulgi Lutan (cash). One sold to Irven Liel's household via traveling fence.
- **Broken window:** Tulgi's break-in. She couldn't afford Pelc's price; took the receipt instead to find where the second vial went.
- **Pelc's account:** "I thought they were decorative. Pretty things. Urgon said he'd found them north. I didn't ask more." He is genuinely frightened now.

### Tulgi's Cabin
Tulgi answers the door slowly. She is obviously ill — blue veins visible at her wrists and throat, skin faintly translucent. She is scared, defensive, and running out of time. She will not confess easily. Her cabin is meticulously organized, a contrast to her current state.

- **If asked directly about the vials:** Tulgi denies everything. "I don't know what you're talking about."
- **DC 15 Persuasion or DC 12 Intimidation:** She breaks down. See Dialogue Scripts below.
- **Timeline (DC 10 Medicine):** 7 days before she turns fully. She knows this.

### Irven's Home
Irven Liel is a merchant with a family. His partner and two children are also infected — bought the vials from a traveling fence as "decorative Aevorian glass." One child has already progressed to visible crystallization at the fingertips. Irven is desperate in the way only a parent can be. He will give the party anything.

- **Fence description:** "Broad man, northern accent, called himself Bryn. Said he had more where these came from. Heading toward Croaker Cave when I last saw him." (This is Bandit Captain Brynn Wraithwood — "B.W." on the cave note.)
- **10-day clock:** The children have 10 days. Irven's partner has 12.

### Mila Teno (Frostwatch Guard)
Mila can be found at the Frostwatch post or patrolling near Pelc's. She is composed but self-recriminating — she saw Tulgi near Urgon's cabin the night of the break-in and did nothing.

- **Her timeline:** Places Tulgi at Urgon's cabin three nights after Urgon's death, well after the normal hour.
- **What she knows:** "I should have stopped her. I thought she was grieving. I didn't know."

---

## What Happens

1. Elro briefs the party: Urgon died first, now Tulgi and Irven's family are symptomatic. He knows nothing beyond that.
2. Party investigates locations in any order. Urgon's cabin and Pelc's together establish the vial chain. Tulgi's cabin and Irven's home add urgency and the Croaker Cave lead.
3. Mila provides the timeline that ties Tulgi to the break-in.
4. At some point the party realizes: to cure Tulgi and Irven's family, they need the cure source — which means following the vials north.

**Minimum path to advance:** Party needs the Croaker Cave lead. They get it from: Tulgi's confession **or** Irven's fence description **or** Mila's account pointing them back to Tulgi.

---

## Key Rolls

| DC | Skill | Reveals |
|----|-------|---------|
| 10 | Medicine (Urgon's body) | Disease is magical, not natural |
| 12 | Arcana (vial residue) | Aevorian origin — cold, pre-Fall school |
| 12 | Investigation (Pelc's) | Forced entry; stolen receipt |
| 10 | Investigation (chest) | Urgon's journal and sale record |
| 12 | Investigation (boot prints) | Tulgi's prints at Urgon's cabin |
| 15 | Persuasion (Tulgi) | Full confession |
| 12 | Intimidation (Tulgi) | Partial confession — admits the vials exist |
| 10 | Insight (Irven) | He is telling the full truth; he has nothing to hide |

---

## Dialogue Scripts

### Elro Aldataur

**Opening briefing:**
> "Urgon died first. Three weeks ago he started complaining of cold that wouldn't leave him. Then the veins. Then he was stone. Now Tulgi Lutan is showing the same signs — she has maybe a week. Irven Liel's family started yesterday. I've never seen anything like this."

**If asked what he's done so far:**
> "Quarantined the affected homes. Sent a rider south. Sent for you. That's all I can do. I'm a village head, not a physician."

**If party asks about the vials early:**
> "What vials? Tell me what you know."

**If asked about Salsvault or Aevorian ruins:**
> "There are old ruins in the far north. Nobody goes there. Nobody comes back if they do. If that's what you're thinking, I won't stop you — but I'll pray for you."

### Tulgi Lutan

**Initial denial:**
> "I don't know what you're asking. I've been ill. I don't know anything about any vials." *[She's lying. Her eyes go to the window.]*

**Under DC 12 Intimidation (partial confession):**
> "Fine. Fine. I saw what Urgon had. I thought — I thought I could sell them, make enough to leave this place. I didn't know they were dangerous. I didn't know."

**Under DC 15 Persuasion (full confession):**
> "I broke into Urgon's cabin after he died. Took the receipt. Tracked down where the second vial went — a man named Brynn sold it to Irven's household. I don't know where Brynn is now. He mentioned Croaker Cave." *She starts crying.* "Am I going to die? Please. Am I going to die?"

**If party promises to cure her:**
> "Don't make promises you can't keep. Just go. Go find the cure."

**If party is unkind:**
> "I know what I did. I've known every day since. You don't have to tell me."

### Irven Liel

**Desperate opening:**
> "My children. Please. Look at their hands. I don't know what to do. We bought those vials because they were beautiful — I thought my partner would love them — I didn't know —"

**Giving the Croaker Cave lead:**
> "The man who sold them to us — Brynn, he called himself, broad fellow with a northern accent — he said he had a whole supply. Said he was moving up toward Croaker Cave. He had a map. Something about a ruin."

**If party asks about the children's condition:**
> "They think it's beautiful. The youngest one keeps looking at her fingers in the light." *His voice breaks.* "She doesn't understand."

### Mila Teno

**Providing the timeline:**
> "I saw Tulgi near Urgon's cabin three nights after he died. Late hour. I should have stopped her, but — I thought she was grieving. We all grieve differently up here." *Pause.* "I was wrong to let it go."

**If asked to help:**
> "My post is here. I can't leave Palebank. But if you find a cure — bring it back fast. I'll make sure the quarantine holds."

---

## Time Pressure

The clock is stated explicitly to the party: **Tulgi has 7 days, Irven's family has 10 days.** Every unnecessary detour or day of rest costs lives. If the party lingers more than a full session in Palebank without advancing, Elro visits them:

> "Every hour you spend here is an hour Tulgi gets closer to the end. I'm not rushing you — but I am telling you what's happening."

---

## Escalation

- **If party can't find the Croaker Cave lead:** Mila sends them to Tulgi. Tulgi's condition worsens visibly if the party delays (DM description: "her veins are darker than yesterday"). If all else fails: Tulgi knocks on their door in the night. "I'm dying. You need to know something."
- **If party wants to cure Tulgi before leaving:** They can't. The cure doesn't exist yet in Palebank — it's in Salsvault. Any magical healing only slows the progression by 1d4 days.
- **If party wants to investigate the icefields without going to Croaker Cave:** That's valid. They'll encounter the Salsvault approach from Scene 3 directly, but miss the vials in the cave (and arrive at Salsvault without understanding why they're there). Morgo at the Cold Anchor can partially fill in the gap.
```

- [ ] **Step 2: Verify it renders**

Navigate to `http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness/01-palebank-investigation.md`
Expected: Renders with styled web preview — headings in red, tables formatted, blockquotes styled as callouts.

- [ ] **Step 3: Commit**

```bash
git add adventures/season-1/the-pale-sickness/01-palebank-investigation.md
git commit -m "feat: add Scene 1 — Palebank Investigation with room descriptions and dialogue"
```

---

## Task 4: Write Scene 2 — Croaker Cave

**Files:**
- Create: `adventures/season-1/the-pale-sickness/02-croaker-cave.md`

- [ ] **Step 1: Write the file**

Create `adventures/season-1/the-pale-sickness/02-croaker-cave.md`:

```markdown
---
scene: 2
title: Croaker Cave
location: Smuggler hideout, cliffs west of Palebank (30-minute walk)
---

# Scene 2: Croaker Cave

**Setup:** The bandits stole the vials because they looked valuable — a Corsair fence named Brynn Wraithwood (the "B.W." on the cave note) promised coin for anything Aevorian. They had no idea the vials were deadly. These are cold, hungry, morally grey people — not monsters. The cure path runs through them, but violence isn't the only route.

---

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
5. If party offers to cure Sett on return: Brynn gives them detailed directions, Morgo's contact information, and the second map.

**Combat path:**
1. Brynn opens with "This is our camp. State your business or leave." He won't attack first.
2. If combat starts: 4 bandits + Brynn engage. Sett does not fight — she retreats to the back.
3. At 50% casualties, Brynn calls for surrender. "We're done. Take what you need."
4. Chest is accessible once bandits are subdued. Sett's condition is discovered during search.

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

Recovering the vials stops further infections in Palebank — frame this to the party explicitly. "As long as those vials exist outside containment, anyone who touches them could become the next Urgon." Every hour in Croaker Cave is an hour of potential additional exposure in the village.

---

## Escalation

- **If party kills all the bandits:** The chest is accessible; the second map is in Brynn's pack. Sett is mortally wounded in the crossfire unless the party specifically protects her. The information about the researcher who hired Brynn is lost unless someone searched Brynn's body (DC 10 Investigation: a letter from "B. Wharrick, Acquisitions" with a Stilben address).
- **If party skips Croaker Cave entirely:** They arrive at Salsvault without the vials and the full context. Morgo at the Cold Anchor knows Brynn by reputation and can partially fill in: "There was a fence — big fellow, northerner — buying Aevorian artifacts. Haven't seen him in weeks."
- **If combat drags past 3 rounds:** Brynn calls for a ceasefire. "This is pointless. We're not dying over a chest. What do you actually want?"
- **If party wants to take the infected vials with them:** They can — they're the disease vector. Handle with cloth or gloves (DC 11 Con save to avoid infection if handled barehanded for more than a minute).
```

- [ ] **Step 2: Verify it renders**

Navigate to `http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness/02-croaker-cave.md`
Expected: Full stat blocks render as tables, dialogue renders in blockquotes.

- [ ] **Step 3: Commit**

```bash
git add adventures/season-1/the-pale-sickness/02-croaker-cave.md
git commit -m "feat: add Scene 2 — Croaker Cave with full stat blocks and dialogue"
```

---

## Task 5: Write Scene 3 — Journey to Salsvault

**Files:**
- Create: `adventures/season-1/the-pale-sickness/03-journey-to-salsvault.md`

- [ ] **Step 1: Write the file**

Create `adventures/season-1/the-pale-sickness/03-journey-to-salsvault.md`:

```markdown
---
scene: 3
title: Journey to Salsvault
location: Icefields north of Palebank, via The Cold Anchor research station
---

# Scene 3: Journey to Salsvault

**Setup:** The journey is 1–2 days across hostile terrain. The Cold Anchor is the last safe stop before the icefields proper. Morgo, the veteran guide stationed there, is critical — his gear reduces environmental risk substantially. The journey itself is about tension and dread building toward Salsvault. Random encounters are optional texture, not required content.

---

## Read Aloud — Departure

> *"The road north out of Palebank is well-worn for the first hour, then thins to a trail, then to suggestions of a path in the snow. The air gets colder faster than it should. By midday, you can see your breath even in full sun. The icefields begin gradually: first patches of permanent frost, then sheets of blue-white ice spreading between the rocks, then nothing but ice and sky ahead."*

## Read Aloud — The Cold Anchor

> *"A low stone building emerges from the snow — thick walls, shuttered windows, a chimney smoking steadily. A hand-painted sign above the door reads THE COLD ANCHOR. Inside: oil lamps, a stove burning hard against the cold, and a man the size of a wardrobe who looks up from a half-repaired pack harness.*
>
> *'You're heading north,' he says. It's not a question."*

## Read Aloud — Salsvault Approach

> *"As you crest a ridge of jagged ice, a faint blue glow pulses beneath the snow. The wind dies suddenly, replaced by a low hum — mechanical, ancient, wrong. Ahead, a dark shape rises from the ice: a metal structure half-buried, its surface etched with glowing runes in geometric patterns that shift slowly as you watch. The air is unnaturally cold — colder than the wind, colder than the ice, as if the ruin itself is exhaling frost.*
>
> *The entrance is a dark rectangle cut into the metal wall. Blue light glows faintly from somewhere inside."*

---

## Room Descriptions

### The Cold Anchor
A research station and waypoint — four bunks, a stove, supply shelves, a workbench. Morgo has been here for two seasons. Pinned to the wall: a detailed map of the icefield route with hazards marked in red ink. A shelf holds cold-weather gear in various states of repair. The stove is warm. This is the last warmth for a long time.

**Interactive elements:**
- **Morgo's icefield map (free, he offers it):** Grants advantage on Survival checks to navigate the icefields.
- **Cold-weather gear (50 gp per set, or Morgo loans it if party is clearly underprepared):** Resistance to cold damage from environmental sources (not spells/attacks).
- **Climbing equipment (10 gp):** Grants advantage on Athletics checks to cross unstable ice.
- **Morgo's warning:** "The ruin wasn't glowing last season. Whatever's happening in there, it started recently. Three, four months back maybe." *(This confirms the timeline of the Welton wolves and Alexi's death.)*

### The Icefields
Open terrain, 4–6 hours from the Cold Anchor to Salsvault. Three distinct hazard zones:

1. **Pressure ridges (first hour):** DC 12 Athletics to climb safely, or take 1d6 bludgeoning damage from slipping.
2. **Thin ice flats (second hour):** DC 12 Dexterity save or fall through into frigid water (1d10 cold damage + DC 12 Strength check to climb out; failure = 1d10 more).
3. **Spore zone (last hour before Salsvault):** Blue patches visible in the snow. DC 11 Constitution save or contract frigid woe (onset: 24 hours, progression as per infected villagers). Patches can be avoided with DC 14 Survival check.

---

## What Happens

1. Party arrives at Cold Anchor. Morgo briefs them; party can equip here.
2. Travel segment: DM calls for three checks (one per hazard zone). Failures cost HP, time, or disease exposure.
3. Optional random encounters (roll d4 every 4 hours; on a 1, use the table below).
4. Party arrives at Salsvault — the approach read-aloud triggers Scene 4.

**Critical information from Morgo:**
- The ruin was dark last season. Something turned it on.
- "If you see blue light in the snow, go around. Do not touch it."
- "The constructs inside still work. I know because the last group I guided in there — only two came out."

---

## Stat Blocks

### Ice Mephit (random encounter, ×2–4)
*Small elemental, neutral evil*

**AC** 11 · **HP** 21 (6d6) · **Speed** 30 ft., fly 30 ft.

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 7 (−2) | 13 (+1) | 10 (+0) | 9 (−1) | 11 (+0) | 12 (+1) |

**Damage Vulnerabilities** bludgeoning, fire
**Damage Immunities** cold, poison
**Condition Immunities** poisoned
**Senses** darkvision 60 ft., passive Perception 10
**Languages** Aquan, Auran · **CR** 1/2

**Actions**
- **Claws.** *Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 3 (1d4+1) slashing damage plus 2 (1d4) cold damage.
- **Frost Breath (Recharge 6).** The mephit exhales a 15-foot cone of cold. Each creature in the area makes a DC 10 Constitution saving throw, taking 5 (2d4) cold damage on a failed save, or half on a success.
- **Death Burst.** When the mephit dies, it explodes in a burst of jagged ice. Each creature within 5 feet takes 4 (1d8) slashing damage (DC 10 Dexterity save for half).

---

### Saber-Toothed Tiger — Frostmane Variant (random encounter, ×1)
*Large beast, unaligned*

**AC** 12 · **HP** 52 (7d10+14) · **Speed** 40 ft.

| STR | DEX | CON | INT | WIS | CHA |
|-----|-----|-----|-----|-----|-----|
| 18 (+4) | 14 (+2) | 15 (+2) | 3 (−4) | 12 (+1) | 8 (−1) |

**Skills** Perception +3, Stealth +6
**Senses** passive Perception 13 · **Languages** — · **CR** 2

**Traits**
- **Keen Smell.** Advantage on Perception checks that rely on smell.
- **Pounce.** If the tiger moves at least 20 feet toward a creature and hits with a claw attack, the target must succeed on a DC 14 Strength saving throw or be knocked prone. If the target is prone, the tiger can make a bite attack against it as a bonus action.

**Actions**
- **Bite.** *Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 10 (1d10+5) piercing damage.
- **Claw.** *Melee Weapon Attack:* +6 to hit, reach 5 ft., one target. *Hit:* 12 (2d6+5) slashing damage.

*Note: The frostmane variant has pale blue-white fur and red eyes — it is not supernatural, just a large apex predator adapted to the icefields. It will retreat at 50% HP.*

---

## Dialogue Scripts

### Morgo

**Initial greeting:**
> "You're heading north." *He sets down the harness.* "Sit. Eat something first. You'll want it."

**On the ruin:**
> "I've been guiding people across these fields for eight years. The ruin — Salsvault, they call it — was dead. Just another buried piece of the old world. Three, four months back, it lit up. Blue glow, that hum you'll hear before you see it." *He looks at the fire.* "Last group I took in, I waited outside. Two came out. I didn't ask what happened to the others."

**If asked about the disease:**
> "Blue vials, you say? There are dozens of those things in the outer chambers. Sealed containers with blue liquid. I told my last group not to touch them." *Pause.* "They touched them."

**On the spore patches:**
> "You'll see blue in the snow before you reach the entrance. Don't walk through it. Go around, however far you have to go. The ones who ignored that warning — they were sick before they even got inside."

**On constructs:**
> "Metal suits. Metal swords that fly on their own. They don't sleep, they don't tire, and they don't negotiate. Hit them hard and hit them fast."

**If party seems underprepared:**
> "Take the gear. No charge. I'd rather you come back than freeze out there trying to prove something."

**When party departs:**
> "I'll be here when you get back." *Beat.* "Most people are surprised I say that. I mean it, though."

---

## Key Rolls

| DC | Skill | Result |
|----|-------|--------|
| 12 | Survival (navigation, without map) | Navigate safely; failure = add 2 hours |
| 12 | Athletics (pressure ridges) | Cross safely; failure = 1d6 bludgeoning |
| 12 | Dexterity save (thin ice) | Cross safely; failure = fall through (1d10 cold + check) |
| 12 | Strength (thin ice, if fallen) | Climb out; failure = 1d10 more cold damage |
| 14 | Survival (spore avoidance) | Avoid spore patches entirely |
| 11 | Constitution save (spore exposure) | Avoid frigid woe onset |
| 12 | Arcana (at Salsvault approach) | "This magic predates the Godsfall. Aevorian." |
| 12 | History (at Salsvault approach) | "Aeor built weapons to kill gods. This place was part of that." |

---

## Time Pressure

Every failed navigation check adds 2 hours. Every rest taken on the icefields advances the plague clock by the full rest duration. Remind players: Tulgi has 7 days, Irven's family has 10. If they left Palebank with 6 days remaining and the journey takes 2, they have 4 days to get in, cure in hand, and back.

---

## Escalation

- **If party skips the Cold Anchor entirely:** They arrive at Salsvault without Morgo's warnings. They walk through the spore zone (automatic exposure, no save unless they stop to examine the snow, DC 12 Perception). They have no climbing gear (disadvantage on Athletics checks in the icefields).
- **If party is heavily injured from travel:** Morgo's supply cache hidden near the Salsvault entrance (Morgo mentions it if asked): a carved stone marker, 10 feet left of the entrance, covers a waterproof box with 2d4 potions of healing.
- **If party takes too long on the icefields:** DM can skip random encounters and narrate the journey as a montage: "Three hours of brutal cold, two near-falls on the ice, and the constant hum growing louder."
```

- [ ] **Step 2: Commit**

```bash
git add adventures/season-1/the-pale-sickness/03-journey-to-salsvault.md
git commit -m "feat: add Scene 3 — Journey to Salsvault with travel mechanics and stat blocks"
```

---

## Task 6: Write Scene 4 — Salsvault

**Files:**
- Create: `adventures/season-1/the-pale-sickness/04-salsvault.md`

- [ ] **Step 1: Write the file**

Create `adventures/season-1/the-pale-sickness/04-salsvault.md`:

```markdown
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
[Entrance] → [Research Labs] → [Containment Hall] → [Construct Storage] → [Preservation Chamber] ← → [Control Room]
    1               2                  3                    4                      5                         6
```

---

## Room 1: Entrance Hall

### Read Aloud
> *"The entrance is a dark rectangle in the metal wall. Inside, the air is cold enough to hurt — colder than outside, which should not be possible. The walls are smooth dark metal etched with geometric glyphs that pulse faintly with blue light. The floor is covered in a thin layer of frost. Urgon's bootprints are still here, frozen in place.*
>
> *Two metal shapes hang in the air at the far end of the hall, rotating slowly. They resolve into swords — longswords, blades gleaming, with no hands to hold them."*

### Room Description
A 30-by-20-foot entry chamber. Ceiling 15 feet high. Two narrow corridors branch left and right (dead ends — former guard posts, now collapsed). The main passage leads forward. Aevorian glyphs cover every surface. The floor is iced over — thin patches (DC 12 Acrobatics or Dexterity save to cross without slipping; failure = prone and 1d4 bludgeoning). A spore vent is set in the ceiling, cracked open: blue mist drifts down slowly.

**Spore vent:** DC 11 Constitution save on entering if vent is not blocked. DC 12 Athletics or Dexterity (thieves' tools) to jam it shut with available materials.

**Interactive elements:**
- **Urgon's bootprints:** Lead straight to the Containment Hall (Room 3), bypassing the Research Labs. Party can follow them.
- **Aevorian glyphs (DC 13 Arcana to read):** Warning signs. "CONTAINMENT BREACH — SECTOR 3" and "AUTHORIZED PERSONNEL ONLY."
- **Left dead-end:** A collapsed guard post. Contains a dead construct (inert — parts salvageable) and a sealed container with 2 potions of healing.

### Stat Blocks

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

## Room 2: Research Laboratories

### Read Aloud
> *"The corridor opens into a larger chamber — a laboratory, or what remains of one. Metal tables line the walls, covered in equipment that might once have been recognizable but has been frozen and distorted by centuries of cold. Glass containers line shelves, most shattered, a few intact. Papers and bound volumes — miraculously preserved by the cold — sit in neat stacks.*
>
> *Two armored figures stand motionless at the far end of the room. As your light reaches them, their helmet visors turn."*

### Room Description
40-by-30-foot laboratory. Ceiling 12 feet high. Three metal workbenches, two intact shelving units, one collapsed. The preserved notes and volumes are in Aevorian — mostly illegible, but useful for context (see below). Blue spore residue coats the countertops around cracked containers. One intact blue vial sits in a sealed rack (this is the disease source; clearly labeled in Aevorian — DC 10 Arcana to recognize the label means "HAZARDOUS / DO NOT OPEN").

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
- **Urgon's bootprints:** Continue through this room, heading directly to Room 5. He came here first, broke open Pod 7 (his crowbar marks are on the door seal), and triggered the breach.

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
- **The hooded figure image:** Non-human (wrong proportions — too tall, too thin, joints not quite right). At the console. The image is from the activation event — a security recording. DC 17 Arcana: the figure's movements at the console are deliberate and knowledgeable. This was not accidental discovery. Someone knew exactly how to turn Salsvault on.
- **Emergency shutdown (DC 15 Arcana to operate):** Party can shut down Salsvault. This reduces Echo interference in the region for 2d6 months. Elric will be conflicted about this ("invaluable research, lost").

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
- **Hidden cache (emergency):** Morgo's supply box outside the entrance. 2d4 potions of healing in a waterproof case under a cairn marked with two crossed rocks, 10 feet left of the entrance.
- **If party can't operate the Control Room console:** Elric can analyze rubbing/sketches of the glyphs after the adventure. The revelation still happens — just delayed.
- **Partial collapse trigger:** If the party uses a fire-based area spell in Room 2 or Room 3, unstable ice in the ceiling fractures. Everyone makes DC 13 Dexterity save or takes 3d6 bludgeoning damage and is knocked prone. The facility is not destroyed but the path back to Room 1 requires DC 14 Athletics to navigate rubble.
```

- [ ] **Step 2: Commit**

```bash
git add adventures/season-1/the-pale-sickness/04-salsvault.md
git commit -m "feat: add Scene 4 — Salsvault with all six rooms, stat blocks, and revelation content"
```

---

## Task 7: Write Scene 5 — Return and Resolution

**Files:**
- Create: `adventures/season-1/the-pale-sickness/05-return-resolution.md`

- [ ] **Step 1: Write the file**

Create `adventures/season-1/the-pale-sickness/05-return-resolution.md`:

```markdown
---
scene: 5
title: Return and Resolution
location: Palebank Village, then Waystone Inn
---

# Scene 5: Return and Resolution

**Setup:** No combat. This scene is entirely about consequences — who lived, who died, what the party learned. The outcomes branch based on timing (did they make it back before the clock expired?) and choices (did they have enough antidote? Did they destroy Salsvault?). Elric's debrief at the Waystone is mandatory — it closes every dangling thread and opens the next arc.

---

## Read Aloud — Return to Palebank

> *"Palebank looks the same as when you left. The quarantine is holding — Mila Teno is at her post, frost on her shoulders, not sleeping. When she sees you she doesn't say anything. She looks at your hands. At what you're carrying."*

---

## Outcome Branches

### Best Outcome: Returned Within Time, Sufficient Antidote

The party returns before the clock expires (Tulgi has 1+ days left, Irven's family has 4+ days left) with at least 4 gold vials.

> *"Elro meets you at the village entrance. He looks at the vials. He looks at you. 'Is that—' He can't finish. You show him one. He takes it gently, as if it might shatter."*

- Tulgi Lutan survives. She is quiet afterward. She never speaks of the vials again, but she pays her taxes early for the rest of her life and leaves anonymous donations at the Frostwatch post.
- Irven's family survives. The children don't fully understand what happened. Irven names his next trading vessel *Warden* and sends 200 gp to the guild "with no conditions."
- Elro pays the full 300 gp reward and offers Palebank as a Warden-friendly supply point.
- Elro's toast at the village hall: *"To the Northwatch Wardens. They came when I asked. They came back when it mattered."*

### Partial Success: Late Return or Insufficient Antidote

Party returned late **or** has only 1–3 vials (must choose who to cure).

**Choosing who lives:**
> *"Elro looks at the vials. Looks at you. 'How many?' You tell him. His face doesn't change — he's had to make hard decisions before. 'Then you choose,' he says quietly. 'I won't do that for you.'"*

The party must decide between Tulgi, Irven's partner, and Irven's children. No NPC will make this easier. Elro will support whatever choice is made. Irven will not hate the party if his children are chosen over his partner — he understands. Tulgi will not argue if she is passed over — she knew this might happen.

- 200 gp reward. Elro is grateful but hollow. Palebank is still Warden-friendly.
- The loss is not dramatized — it is understated, which is worse.

### Full Failure: No Antidote or Clock Expired

- All infected die before party returns, or party returns without the cure.
- 0 gp reward. Elro says nothing when he sees them. He just goes back inside.
- Palebank becomes a ghost town within the season. Travelers avoid it.
- This is a valid (dark) outcome. Do not soften it.

---

## Read Aloud — Elric's Debrief (Waystone Inn)

*Run this regardless of outcome. The revelation still happens.*

> *"Elric is waiting at the Waystone when you return — he hasn't slept. His journal is open on the table, covered in diagrams. He listens to everything you tell him without interrupting. When you finish, he sits very still for a long moment.*
>
> *Then he closes the journal with a sharp snap.*
>
> *'Salsvault,' he says quietly. 'An active Aevorian facility. Gods help us.' He looks up, eyes sharp. 'The wolves at Welton. Alexi's death. The frost patterns. The wand that failed. All of it. Connected. One source.' He opens the journal again, points to a map. Multiple marked locations. 'And Salsvault is only the first one that woke up.'*
>
> *'The activation was manual. Someone turned it on. Someone who knew exactly what they were doing. The sites I've been tracking — Theta, Vharos, 9-B — if whoever did this is working to a schedule...'*
>
> *He meets your eyes.*
>
> *'This is only the beginning.'"*

---

## NPCs at Closing

### Elro Aldataur

**If best outcome:**
> "I've been a village head for fifteen years. People have died on my watch before. This time, they didn't have to — and they didn't." *He shakes your hand.* "Come back whenever you need. Palebank is yours."

**If partial success:**
> "Thank you for what you did. I mean that." *Long pause.* "I'll be thinking about who you couldn't save for a long time. I don't blame you. I want you to know that."

**If failure:**
> *He doesn't come to the door. Mila speaks for him: "He asked me to tell you he doesn't blame you. He also asked me to tell you not to come back."*

### Mila Teno

**After the cure is administered:**
> "I lift the quarantine at dawn. I'll stay on post for a week more, make sure it holds." *Beat.* "You came back. Not everyone does."

### Lorewarden Elric Vael (Waystone debrief)

**If party shut down Salsvault:**
> "You did what you had to do. I understand. I just—" *He touches his journal.* "—there was so much we could have learned." *He recovers.* "It doesn't matter. We know where the others are."

**If party preserved Salsvault:**
> "Good. We may need what's inside. And if whoever activated it tries to use it again — we'll know where to find them."

**If party found the Control Room evidence:**
> "A figure at the console. Non-human. Manual activation with technical knowledge." *He writes something.* "This is not a faction we've encountered before. This is something new." *He looks up.* "Or something very, very old."

**If party asks what to do next:**
> "Rest. Resupply. I'll be in contact within the week. The Temple of the Dragonknights — I've received reports of unusual cult activity there. Creatures drawn to sites of magical power." *He pins a location on the map.* "I believe it's connected."

---

## Key Rolls

None required. Outcomes flow from prior choices and timing. No check should gatekeep the debrief — Elric's revelation happens regardless.

---

## Rewards

| Outcome | Gold | Additional |
|---------|------|------------|
| Best (all saved, full clear) | 300 gp | Palebank supply contact; Elro as regional ally |
| Partial (some saved) | 200 gp | Palebank supply contact |
| Failure (none saved) | 0 gp | No ongoing benefit |
| Salsvault artifacts (any outcome) | Value TBD | Multiple factions interested; Elric wants first look |
| Sett cured (if party chose to) | — | Brynn Wraithwood owes the party a favor |

---

## Hooks Forward

- Elric's map with multiple marked locations → the Echo network extends far beyond Salsvault
- Temple of the Dragonknights briefing → next adventure
- The hooded figure at the console → antagonist is established but unnamed
- Palebank as supply point → future logistical resource
```

- [ ] **Step 2: Commit**

```bash
git add adventures/season-1/the-pale-sickness/05-return-resolution.md
git commit -m "feat: add Scene 5 — Return and Resolution with outcome branches and Elric's debrief"
```

---

## Task 8: Remove old file and verify

**Files:**
- Delete: `adventures/season-1/the-pale-sickness.md`

- [ ] **Step 1: Verify the folder is complete**

```bash
ls adventures/season-1/the-pale-sickness/
# Expected: index.md  01-palebank-investigation.md  02-croaker-cave.md  03-journey-to-salsvault.md  04-salsvault.md  05-return-resolution.md
```

- [ ] **Step 2: Test all files render**

```bash
curl -s "http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness" | grep -i "pale sickness"
curl -s "http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness/02-croaker-cave.md" | grep -i "bandit"
curl -s "http://localhost:5050/preview?path=adventures/season-1/the-pale-sickness/04-salsvault.md" | grep -i "preservation"
# All three should return non-empty HTML content
```

- [ ] **Step 3: Test file tree shows the folder**

Navigate to `http://localhost:5050` and expand the Adventures → Season 1 tree. Verify `the-pale-sickness` appears as a folder with expandable scene files.

- [ ] **Step 4: Delete old file**

```bash
rm adventures/season-1/the-pale-sickness.md
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Pale Sickness scene decomposition — folder replaces single file"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ index.md (1-screen quick-ref): Task 2
- ✅ Scene files × 5: Tasks 3–7
- ✅ Full stat blocks: Tasks 4–6 (combat-relevant scenes)
- ✅ Room descriptions: Tasks 3–6
- ✅ NPC dialogue scripts: Tasks 3–7
- ✅ server.js index.md detection: Task 1
- ✅ Old file removed: Task 8
- ✅ Salsvault as one file with room headings: Task 6

**No combat in Scenes 1 and 5** — correct per source material; stat block sections omitted from those files intentionally.

**Scene 3 (Journey)** has travel mechanics and random encounter stat blocks even though combat is optional — DM needs them available if encounter is rolled.
