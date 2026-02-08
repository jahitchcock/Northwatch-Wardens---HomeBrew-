```metadata
title: A DM's Guide to Aevoria
description: 'Campaign Materials and World Secrets for Dungeon Masters'
tags: []
systems:
  - 5e
renderer: V3
theme: 5ePHB
snippets:
```

```css
.page #example + table td {
	border:1px dashed #00000030;
}
.page {
	padding-bottom : 1.1cm;
}




```

{{frontCover}}
![background image](https://i.imgur.com/3z7yO3J.png){position:absolute,bottom:0,left:0,height:100%}
\page






{{toc,wide
# A DM's Guide to Aevoria
# Contents
}}





\page

{{resetCounting}}
# Using This Guide

<!-- FILE_START: ../README.md -->
# Welcome to Aevoria



> *A world awakening from forgotten ages, where ancient mysteries stir beneath the surface of everyday life.*



---



## Your Story Begins in Northreach

**Northreach** is a cold frontier region where settlements are few, the wilderness is vast, and every community depends on grit, cooperation, and the willingness to face danger head-on. This is where your adventure begins—not in grand capitals or ancient kingdoms, but in a land where survival is earned daily and where small acts of courage ripple outward.

The **Northwatch Wardens** make their stand here at the Waystone Inn, a guild of professionals who handle the problems too dangerous, too strange, or too urgent for local militias. You'll learn the frontier's rhythm: the weight of responsibility, the value of your word, and the hard truth that not every problem has a clean solution.

**Start here. Learn the land. Know your neighbors.**

Only when Northreach feels like home will the wider world truly matter.

---

## The Wider World of Aevoria

Beyond Northreach lies **Aevoria**—a rich fantasy world of diverse cultures, ancient histories, and emerging mysteries. The name carries different meanings to different peoples: the Solaris Dominion calls it "the land blessed by dawn," the Nullwood Elves name it the "Quiet Age," and the Stonebound Dwarves call it *Tharundor*, "the Stone That Remembers."

From the cold frontier regions of the north to sun-drenched southern lands, from elven forests to dwarven mountain kingdoms, Aevoria is a world where heroes forge their own legends. Each region offers unique adventures, cultures, and mysteries:

- **Northreach** — Cold frontier, home of the Wardens *(your starting point)*
- **Solaris Dominion** — Human cultural capital of art and politics
- **The Nullwood Expanse** — Ancient elven kingdom shrouded in silence
- **The Stonebound Depths** — Mighty dwarven halls carved in stone
- **Vharoxis** — The city of masks, where intrigue rules
- **The Shattered Coast** — Storm-tossed maritime frontier
- **The Emberlands** — Volcanic south of fire magic
- **The Verdant Marches** — Beast-haunted druidic wilds
- **The Sunken Dominion** — Drowned cities and deep-sea mysteries
- **The Far North** — Frozen wasteland of buried secrets

These distant lands will become relevant as your story unfolds, but first—**master the frontier**.



---



## Campaigns in Aevoria



### Season 1: Northwatch Wardens



A **modular, drop-in guild campaign** for D&D 5e set in the frontier region of Northreach. Designed for **2–5 players per session** with flexible attendance and order-independent adventures.



- **Campaign Hub:** Waystone Inn (guild headquarters)

- **Format:** Contract-based missions with overarching mystery

- **Style:** Investigation, moral choices, frontier survival



**🚀 New DM?** Start with [Session 0 Quick Start](./Season%201/SESSION_0_QUICK_START.md) or [General DM Quick Start](./DM_QUICKSTART.md)

**[Complete Campaign Guide →](./Season%201/)**



---



## Editing in VS Code (Homebrewery Preview)



This repository is set up to write and preview D&D content in a Homebrewery-style layout directly in VS Code.



- **Extension**: *Homebrewery Markdown Preview* (`officerhalf.homebrewery-vscode`)

- **Formatting**: Use `\page` for page breaks, `{{note}}` for DM boxes, `{{descriptive}}` for read-aloud text

- **Snippets**: Most Homebrewery-style snippets are available with the `brew` prefix (example: `brewStatBlock`)



### Homebrewery Best Practices



📖 **[Homebrewery Best Practices Guide](./.github/HOMEBREWERY_BEST_PRACTICES.md)** — Comprehensive guide to formatting D&D content with Homebrewery



📝 **[Adventure Template](./.github/templates/adventure_template.md)** — Ready-to-use template for new adventures



✨ **[Before/After Examples](./.github/FORMATTING_EXAMPLES.md)** — See how Homebrewery formatting improves content



### Commands



- `homebrewery.toggle` — toggles `homebrewery.enabled`

- `homebrewery.brew` — prints/exports to HTML



### Recommended preview settings



For best results, the workspace includes the following settings in `.vscode/settings.json`:



- `markdown.preview.scrollEditorWithPreview`: `false`

- `markdown.preview.scrollPreviewWithEditor`: `false`

- `markdown.preview.markEditorSelection`: `false`



These prevent the preview pane from jumping and avoid selection-hover effects that can disrupt the Homebrewery-style layout.



---



## Player vs DM Content

This repository carefully separates **player-safe content** from **DM-only secrets**:

### ✅ Safe for Players
- `World Building/Regions/` — Regional lore
- `World Building/Organizations/` — Faction information  
- `World Building/Locations/` — Place descriptions
- `Premade PCs/` and `Characters/` — Character resources

### 🚫 DMs Only (Contains Spoilers)
- `World Building/DMEyesOnly/` — Campaign secrets and mysteries
- `Season 1/DM_Resources/` — NPC secrets, campaign arc
- `Season 1/Adventures/` — Adventures contain DM notes

**Contributors:** See [Player vs DM Content Guidelines](./.github/PLAYER_DM_CONTENT_GUIDE.md) for how to maintain this separation.

---

## Repository Structure





![Diagram: Repository Structure](World%20Building/Campaign%20Assets/Diagrams/readme-repository-structure-l107-9cd76eff.svg)



<!-- ASCII diagram source (converted to SVG):

/

├── Season 1/              # Complete Northwatch Wardens campaign

│   ├── Adventures/        # Modular adventure modules

│   ├── Campaign Assets/   # Charter, NPCs, campaign arc

│   └── DM_Resources/      # Session tools and rosters

├── World Building/        # Setting bible and world lore

│   ├── Regions/           # Major regions of Aevoria

│   ├── Organizations/     # Factions and guilds

│   ├── Locations/         # Canonical location sheets

│   ├── Religion/          # Pantheons and faiths

│   └── DMEyesOnly/        # Secrets and spoilers (DMs only!)

├── Premade PCs/           # Pre-generated characters

├── Characters/            # Character sheets and builds

└── LionsdenGameFiles/     # Game Master 5e XML files

-->



---



## Accessing the Guides



This repository includes a build system to convert all markdown content into two professionally-formatted, Homebrewery-styled guides available as HTML, markdown, and text files:



📘 **The Adventurer's Guide to Aevoria** — Player-facing materials including world lore, regions, organizations, and pre-made characters



📕 **A DM's Guide to Aevoria** — Complete campaign materials including all adventures, DM resources, NPCs, and world secrets



### View Online (GitHub Pages)

The guides are automatically built and deployed to GitHub Pages on every commit to main:

- **[Player's Guide (HTML)](https://jahitchcock.github.io/Northwatch-Wardens---HomeBrew-/The-adventurers-guide-to-aevoria.html)**
- **[DM's Guide (HTML)](https://jahitchcock.github.io/Northwatch-Wardens---HomeBrew-/A-DMs-guide-to-aevoria.html)**

### Build Locally



```bash

./build.sh

```



This will generate combined markdown (.md), text (.txt for Homebrewery upload), and HTML (.html) files in the `build/` directory.



For detailed instructions, customization options, and troubleshooting, see:



📄 **[QUICKSTART.md](./QUICKSTART.md)** — Quick reference guide



📄 **[BUILD.md](./BUILD.md)** — Complete build system documentation



---



## Content & Licensing



- Markdown files are original or derived from licensed content

- Do not redistribute third-party stat blocks or descriptions verbatim

- Use as personal campaign material

- Compile your own D&D Beyond purchases into the XML



---



## Ready to Adventure?



Whether you're a player seeking to explore Northreach or a Dungeon Master crafting epic campaigns, this repository provides the tools and lore you need.



**Choose your path:**

- 🎯 **[New DMs: Quick Start Guides](./DM_QUICKSTART.md)** — Session 0 or first adventure guides
- 🎲 **[Start in Northreach](./World%20Building/Regions/Northreach/)** — Learn the frontier first
- 🛡️ **[Join the Northwatch Wardens](./Season%201/)** — Begin your campaign
- 📖 **[Browse Adventures](./Season%201/Adventures/)** — See available quests
- 🌍 **[Explore the Wider World](./World%20Building/)** — Discover Aevoria's regions *(after mastering Northreach)*

- 📋 **[Quick Reference Guide](./World%20Building/Player_Quick_Reference.md)** — Costs, travel times, and essential info



---



*The world is vast. The mysteries are deep. The adventure awaits.*

\page
<!-- FILE_END: ../README.md -->

# Quick Start

<!-- FILE_START: ../Season 1/SESSION_0_QUICK_START.md -->
# Session 0 Quick Start Guide
## Prep Time: 30 Minutes → Run Session 0 in 2 Hours

**Welcome, DM!** This guide gets you ready to run Session 0 for Northwatch Wardens in under 1 hour of prep time.

---

## What is Session 0?

Session 0 is your campaign's foundation:
- **Introduce the setting** — Northreach frontier, the Northwatch Wardens guild
- **Create characters** — Premades available or build together
- **Sign the charter** — Make it official with a ceremony
- **Set expectations** — Tone, playstyle, scheduling
- **End with a hook** — First contract posted

**Goal:** Players leave excited, with characters, and knowing what comes next.

---

## Your 30-Minute Prep Checklist

### ☐ Read This Guide (20 minutes)
You're doing it! Everything you need is here.

### ☐ Print or Bookmark (5 minutes)
- [ ] **Charter Text** (page 3 below, or see `World Building/Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md`)
- [ ] **First Contract** (page 4 below)
- [ ] **Premade Characters** (optional: `Premade PCs/` folder has PDFs)

### ☐ Prepare Your Opening Scene (5 minutes)
Read the "Running Session 0" section below and imagine your opening.

---

## Campaign Elevator Pitch (30 seconds)

> **"Northwatch Wardens is a drop-in guild campaign set in the cold frontier of Northreach. You're members of a new adventuring guild taking contracts to protect settlements from threats mundane and magical. Adventures are modular — miss a session, no problem. Your choices matter, and there's a larger mystery unfolding beneath the surface."**

**Tone:** Grounded frontier survival with moral choices and arcane mysteries  
**Playstyle:** Investigation, negotiation, and tactical combat  
**Level Range:** 1–5 (Season 1)  
**Party Size:** 2–5 players per session (flexible)

---

## The Northwatch Wardens: Who They Are

### The Guild (Founded 1 year ago)
- **Headquarters:** Waystone Inn (a fortified roadhouse in the wilderness)
- **Purpose:** Protect frontier settlements, investigate threats, take contracts
- **Structure:** Small guild (~15 active members), led by a three-person council

### The Leadership Triad (Your Key NPCs)

**🛡️ Marshal Brenna Thorne** — Field Commander (Human Ranger, 40s)
- **Role:** Assigns contracts, tactical decisions
- **Personality:** Gruff, experienced, protective of her Wardens
- **Quick Voice:** Direct and matter-of-fact — "This is the job. You ready?"

**📦 Steward Mara Fenwick** — Quartermaster (Halfling Expert, 30s)
- **Role:** Supplies, finances, guild logistics
- **Personality:** Cheerful, meticulous, keeps things running smoothly
- **Quick Voice:** Warm and practical — "I'll pack you extra rations. Bring receipts!"

**📖 Lorewarden Elric Vael** — Arcane Scholar (Elf Wizard, 200s but looks 40s)
- **Role:** Investigation support, magical research, lore
- **Personality:** Soft-spoken, curious, notices patterns others miss
- **Quick Voice:** Thoughtful and precise — "Curious. This reminds me of something..."

**DM Tip:** You only need these three NPCs for Session 0. Everyone else can wait.

---

## Waystone Inn: Your Guild Headquarters

**Location:** In the wilderness between several frontier settlements  
**Description:** A two-story stone inn with a watchtower, stable, and reinforced walls. The common room serves as the guild hall, with a contract board by the fireplace.

**Key Features:**
- **The Contract Board** — Where missions are posted
- **The Long Table** — Where the charter will be signed
- **Private Rooms** — Wardens get free lodging
- **The Tower** — Elric's study and observation post

**Atmosphere:** Smells of woodsmoke and hearth bread, sounds of crackling fire and wind outside, feeling of safety in a dangerous wilderness.

---

\page

## The Northwatch Wardens Charter (Condensed)

**Read this aloud during the signing ceremony:**

> *"The Northwatch Wardens are founded to safeguard the frontier settlements of Northreach. We stand against threats both mundane and arcane. We protect the innocent, honor our contracts, and share vital information with fellow Wardens.*
> 
> *Membership is open to all competent individuals who take the oath. Contracts are posted at Waystone Inn and include monster suppression, escorts, investigations, and diplomacy.*
> 
> *We are led by a council of three: Marshal, Steward, and Lorewarden. The Waystone Inn serves as our guildhall and safehouse.*
> 
> *Sign below to become a Warden."*

**The Oath (Players Repeat After You):**

> *"I stand with the Wardens. I protect the innocent. I honor my contracts. I stand against corruption, mortal or magical. Where the frontier needs me, I will answer."*

**After Signing:** Brenna hands each player a **Northwatch Wardens badge** (silver with a compass rose). "Welcome to the Wardens. Now let's get to work."

---

## Running Session 0 (2-Hour Timeline)

### Hour 1: Setup & Characters (60 minutes)

**0:00–0:15 — Welcome & Campaign Pitch**
- Introduce yourself and the campaign (use elevator pitch above)
- Set expectations:
  - Modular adventures (can miss sessions without breaking story)
  - Moral choices matter (not everything is solved by combat)
  - Variable attendance is fine (characters can rotate between contracts)
  
**0:15–0:45 — Character Creation**
- **Option A:** Use premade characters (`Premade PCs/` folder)
- **Option B:** Build characters together (Standard Array or Point Buy)
- **Option C:** Players bring their own level 1 characters

**Important:** Ask each player: *"Why did your character join the Northwatch Wardens?"*
- Suggested answers: Hired for skill, seeking purpose, protecting home, fresh start, recommended by friend

**0:45–1:00 — Ground Rules**
- **Advancement:** Milestone leveling (level up after major adventures)
- **Tone:** Grounded frontier, combat is dangerous, investigation matters
- **Scheduling:** Confirm session frequency and handle absences

### Hour 2: The First Session (60 minutes)

**1:00–1:15 — Opening Scene**

*Read aloud:*

> *"Dawn breaks over Northreach. You stand outside the Waystone Inn, a fortified stone roadhouse in the wilderness. Smoke rises from its chimney. Inside, the common room is warm and smells of bacon and woodsmoke.*
> 
> *Three figures wait by a long wooden table: a gruff ranger woman in worn leathers, a cheerful halfling sorting papers, and a tall elven mage with calculating eyes.*
> 
> *This is where your story begins."*

Introduce the three NPCs briefly (use descriptions on page 2).

**1:15–1:30 — Charter Signing Ceremony**
- Brenna explains the guild's purpose (1 minute)
- Players sign the charter (use text on page 3)
- Players recite the oath together
- Brenna hands out badges

**1:30–1:45 — Meet the Guild**
- Let players ask questions of the three NPCs
- Mara gives them a tour (common room, bunks, tower)
- Elric mentions "strange disturbances" in the frontier
- Brenna says "We have work already"

**1:45–2:00 — The First Contract**

Brenna gestures to the contract board. One parchment is pinned there with a wolf-tooth charm.

*Read aloud:*

> **CONTRACT W-17: "Wolves of Welton"**
> 
> *Client:* Welton Village Council  
> *Reward:* 800 gp + provisions  
> *Urgency:* High
> 
> *"A pack of unusually aggressive wolves has been attacking shepherds and stealing livestock. The wolves are coordinated and have outsmarted our hunting parties. Request immediate assistance from capable Wardens."*

**Brenna's Briefing:**
- "Welton's a half-day's ride south. Good people, hard winter."
- "Wolves have been hitting farms. Coordinated attacks, almost like they're being led."
- "This is exactly what we're here for. You ready for your first contract?"

**End Session (Choose One):**

**Option A: End with Preparation**
- Players accept the contract
- Mara packs them supplies
- "You prepare to leave at dawn."
- **Next session starts with the journey to Welton**

**Option B: Combat Encounter (Add 30-45 minutes)**
- Players accept the contract
- As night falls, wolves attack the inn (see "Session 0 Combat" below)
- After defeating the wolves, notice strange blue veins in their fur
- "Something's affecting the wildlife. We leave at dawn."
- **Next session starts with the journey to Welton**

---

\page

## Session 0 Combat (Optional)

**Use this if you want to add a 30-45 minute combat encounter to Session 0.**

### Wolves at the Waystone Inn

**Setup:** After the charter signing, as dusk settles, hungry wolves attack the inn.

**Read Aloud:**

> *The wind picks up outside as darkness falls. You're settling in when Brenna suddenly raises a hand.*
> 
> *"Everyone quiet. Listen."*
> 
> *Through the howling wind, you hear it: a low, rattling growl. Then another. The lanterns outside flicker.*
> 
> *"Wolves," Brenna says grimly. "Close the shutters. Weapons ready."*
> 
> *Before you can react, two gaunt wolves burst through the half-open door, eyes wild with hunger and something else—blue veins pulsing faintly beneath their matted fur. They're starving, desperate, and clearly sick.*

### Encounter Details

**Enemies:** 2 Wolves (CR 1/4 each)  
**Party:** Level 1 characters (2-5 players)

**Wolf Modifications (Echo Sickness):**
- Normal wolf stats
- Appearance: Gaunt, blue-tinged veins visible in fur
- Behavior: More aggressive than normal, don't flee as readily
- If reduced to 0 HP, body shows signs of arcane corruption (blue veins glow briefly before fading)

**Terrain:**
- **Waystone Inn common room** — tables, chairs, fireplace
- **Half cover** — Behind tables and bar
- **Difficult terrain** — Knocked-over chairs
- **Hazard** — Fireplace (creatures pushed into it take 1d6 fire damage)

**Tactics:**
- Wolves prioritize nearest target
- Use Pack Tactics if possible
- Fight to the death (they're too sick/hungry to flee)

### After Combat

**Investigation (Optional):**
- DC 12 Medicine check: "These wolves aren't just starving. Something's wrong with them."
- DC 10 Arcana check: "Faint traces of magical energy, like residual spellwork."

**NPC Reactions:**

**Brenna:** "In twenty years on the frontier, I've never seen wolves attack a lit inn like that. Something drove them mad."

**Elric:** (Examining a body) "Curious. These veins... arcane corruption. Minor, but present. The frontier's changing."

**Mara:** "I'll get a healer's kit. Everyone alright?" (Provides free healing kit use if needed)

**Connection to Campaign:**
- First hint of the Aeorian Echo affecting wildlife
- Shows that the frontier is becoming more dangerous
- Makes the Wolves of Welton contract feel urgent and connected

---

\page

## Player Character Creation Tips

### Recommended Character Aspects

**Backgrounds That Fit:**
- Folk Hero, Outlander, Soldier, Guild Artisan, Sage, Acolyte

**Motivations That Work:**
- Protect your homeland
- Seek purpose after tragedy
- Earn coin for family
- Investigate frontier mysteries
- Atone for past mistakes

**Party Composition (Suggested):**
- At least 1 character with combat skills
- At least 1 character with social skills (Persuasion, Insight)
- At least 1 character with wilderness skills (Survival, Nature)

**What to Avoid:**
- Lone wolf characters who refuse to cooperate (this is a guild campaign)
- Characters with no connection to the frontier (hard to justify joining)

---

## After Session 0: What's Next?

### Before Session 1:
- [ ] Read **Wolves of Welton** adventure (`Season 1/Adventures/Wolves_Of_Welton/5E_Wolves_Of_Welton.md`)
- [ ] Review encounter locations and NPCs
- [ ] Prepare battle maps (or use theater of the mind)

### Optional Deeper Prep (After Session 0):
- Read `Season 1/README.md` for full campaign overview
- Read `Season 1/DM_Resources/Session_Prep_Guide.md` for advanced DM tips
- Review `Season 1/DM_Resources/DM Guild Roster.md` for NPC secrets

### Running Future Sessions:
Every session follows this pattern:
1. **Return to Waystone Inn** — Report contract results, get paid
2. **Briefing** — New contract offered or players choose from board
3. **Adventure** — Complete the contract
4. **Return** — Repeat cycle

---

## Quick Reference: Key Locations

| Location | Description | Used In |
|----------|-------------|---------|
| **Waystone Inn** | Guild HQ, mission hub | Every session |
| **Welton** | Farming village, half-day south | First adventure |
| **Pinebrook** | Trading village, southeast | Optional adventure |
| **Palebank Village** | Seaside settlement, northeast | Optional adventure |
| **Temple of Dragonknights** | Cult stronghold, northwest mountains | Capstone adventure |

---

## Troubleshooting Session 0

**Q: Players want to go straight to combat?**  
A: Save combat for Session 1. Session 0 is about setup. Tease danger: "The wolves are out there. You'll face them soon."

**Q: Players want detailed world lore?**  
A: Keep it brief. "This is the cold frontier of Northreach. Civilization is thin. Threats are real. You'll learn more as you explore."

**Q: Players don't want to join a guild?**  
A: Explain this is a guild campaign — it's the structure. If they're uncomfortable, they can be "probationary members" for the first contract.

**Q: Only 2 players show up?**  
A: Perfect! This campaign scales for 2–5 players. Smaller parties get tighter, more tactical encounters.

**Q: Players miss Session 0?**  
A: No problem. They can join Session 1 as "new recruits" arriving at Waystone Inn. Give them the 30-second pitch and hand them a badge.

---

## Your Session 0 Cheat Sheet (Cut & Keep at Table)

### NPCs
- **Brenna** (Marshal) — Gruff ranger, assigns contracts
- **Mara** (Steward) — Cheerful halfling, handles supplies
- **Elric** (Lorewarden) — Elven mage, provides lore

### The Oath
*"I stand with the Wardens. I protect the innocent. I honor my contracts. I stand against corruption, mortal or magical. Where the frontier needs me, I will answer."*

### First Contract
**Wolves of Welton** — 800 gp, half-day south, unusually aggressive wolves attacking farms

### Session Flow
1. Welcome & pitch (15 min)
2. Character creation (30 min)
3. Ground rules (15 min)
4. Opening scene (15 min)
5. Charter signing (15 min)
6. Meet guild (15 min)
7. First contract hook (15 min)

---

## You're Ready!

**You now have everything you need to run Session 0:**
- ✅ Campaign pitch
- ✅ Three NPCs
- ✅ Waystone Inn description
- ✅ Charter ceremony
- ✅ First contract hook
- ✅ Session timeline

**Total prep time:** 30 minutes  
**Session runtime:** 2 hours  
**Player excitement:** Maximum

**Next step:** Run Session 0, then prep Wolves of Welton for Session 1.

Welcome to the Northwatch Wardens. The frontier needs you.

---

*For more detailed prep and advanced DM resources, see:*
- `Season 1/README.md` — Full campaign overview
- `Season 1/DM_Resources/Session_Prep_Guide.md` — Advanced session running tips
- `Season 1/DM_Resources/DM Guild Roster.md` — Complete NPC roster with secrets

\page
<!-- FILE_END: ../Season 1/SESSION_0_QUICK_START.md -->

# Campaign Overview

<!-- FILE_START: ../Season 1/README.md -->
# Northwatch Wardens — Drop-In Guild Campaign

## 🚀 New DM? Start Here!

**📖 [SESSION 0 QUICK START GUIDE](./SESSION_0_QUICK_START.md)** — Prep and run Session 0 in under 1 hour

**🎯 [GENERAL DM QUICK START](../DM_QUICKSTART.md)** — Run your first adventure session with minimal prep

---

{{note
##### ⚠️ SPOILER WARNING FOR PLAYERS

**This README contains campaign overview information that may spoil mysteries for players.**

**Players:** Avoid reading the "The Aeorian Echo" and "DM Resources" sections below. For player-safe information, see:
- `World Building/Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md`
- `World Building/Regions/Northreach/` for regional information

**DMs:** For complete campaign secrets, see `Season 1/DM_Resources/`
}}

## Overview
**Northwatch Wardens** is a **modular, drop-in guild campaign** for D&D 5e set in the frontier region of Northreach. Designed for **2–5 players per session**, it emphasizes **contract-based adventure** unified by a single overarching mystery: the **Aeorian Echo**, a spreading wave of arcane disturbance awakening magic and corruption across the frontier.

The campaign is **order-independent** — each adventure stands alone while building toward revealed connections. Perfect for variable attendance, rotating groups, and flexible scheduling.

- **Format**: Markdown adventure guides + JSON stat blocks + GM5e XML compendium
- **Campaign Hub**: Waystone Inn (guild headquarters)
- **Leadership**: Marshal Brenna Thorne, Steward Mara Fenwick, Lorewarden Elric Vael
- **Playstyle**: Contract posting → investigation → resolution → cryptic lore revealed
- **Quick Reference**: [Player Quick Reference Guide](../World%20Building/Player_Quick_Reference.md) — Costs, travel times, and essential info

## How It Works
**Each session:**
1. Party gathers at Waystone Inn (existing or new Wardens)
2. Reviews contract postings on the board
3. Takes one contract (or completes an ongoing one)
4. Returns with findings and rewards
5. Receives cryptic hints connecting to the larger mystery

**No campaign history required.** Drop in any session, any party size, any adventure.

---

## The Aeorian Echo: Core Mystery

All adventures connect to a single spreading phenomenon: **arcane magic from buried Aeorian ruins (Salsvault, far north) is destabilizing the frontier**. No single adventure reveals the full picture; each provides clues.

**Progression of revelation (regardless of play order):**
1. **Wolves of Welton** — Intelligence awakening (first symptom)
2. **Frozen Sick** — Source discovered (Aeorian spores/active Salsvault)
3. **Temple of the Dragonknights** — Factions exploiting the magic (cult + Venomfang)
4. **Wild Sheep Chase** — Magic destabilizing everywhere (wand malfunction, Shinebright's transformation)
5. **Peril in Pinebrook** — Frontier fragility exposed (community in crossfire)

---

## Adventures (Modular — Any Order)

### 🐺 Wolves of Welton (Levels 1–3)
- **Theme**: Intelligence awakening where it shouldn't
- **Adventure Type**: Investigation with moral choice
- **Setting**: Welton village, shepherd territory, wolf dens
- **Encounters**: Livestock attacks, wolf scout meetings, den exploration, Flame vs. Bolt conflict
- **Key Discovery**: Wolves are intelligent and speaking; something magical awakened them
- **Resolution Paths**:
  - Combat elimination: simple victory, fewer moral consequences
  - Negotiation with Bolt (awakened alpha): council voting, politics, coexistence
  - Deception: claim wolves eliminated; short-term success, long-term complications
- **Council Mechanics**: 7 members, 3 votes needed; Father Merriksonn and Corel guaranteed YES
- **Rewards**: 800 gp + Warden credit
- **Files**: `Season 1/Adventures/Wolves_Of_Welton/`

\page

### ❄️ Frozen Sick (Levels 2–4)
- **Theme**: Ancient magic resurfacing with deadly consequences
- **Adventure Type**: Survival + exploration + investigation
- **Setting**: Palebank village, Croaker Cave, Salsvault ruins
- **Encounters**: Plague investigation, bandit hideout, active Aeorian constructs, environmental hazards
- **Key Discovery**: Aeorian spores are the source of all disturbances; ruins are actively destabilizing
- **Outcomes**: Evacuate, cleanse the source, or exploit it for power
- **Reward**: Variable (loot, political favor, or dangerous knowledge)
- **Files**: `Season 1/Adventures/Frozen Sick/`

### 🐉 Temple of the Dragonknights (Levels 4–5)
- **Theme**: Ambition, corruption, and misused awakening magic
- **Adventure Type**: Combat + infiltration + negotiation
- **Setting**: Temple ruins, cult stronghold, dragon lair
- **Encounters**: Cultist cells, kobold forces, Venomfang the dragon, ritual chamber
- **Key Discovery**: Intelligent predators and cults are mobilizing to exploit rising magic
- **Outcomes**: Destroy the cult, expose Venomfang, or broker fragile truce
- **Reward**: Artifacts, regional reputation shift
- **Files**: `Season 1/Adventures/Temple_of_the_Dragonknights/`

### 🐑 The Wild Sheep Chase (Levels 1–2, Comic Relief)
- **Theme**: Magic behaving unpredictably
- **Adventure Type**: Comedy one-shot with real stakes
- **Setting**: Noke's Tower, sheep-filled countryside
- **Encounters**: Wizard accidentally polymorphed into sheep, magical artifacts misfiring, reality distortion
- **Key Discovery**: Artifacts are becoming unreliable; magic is destabilizing everywhere
- **Tone**: Lighthearted but thematically significant; excellent palate-cleanser
- **Reward**: Loot + memorable story
- **Files**: `Season 1/Adventures/The_Wild_Sheep_Chase_V2/`

### 🌲 Peril in Pinebrook (Levels 1–3, Side Trek)
- **Theme**: Small communities caught in the crossfire of rising magic
- **Adventure Type**: Investigation + exploration + social
- **Setting**: Pinebrook trading village, surrounding wilderness
- **Encounters**: Strange creatures, odd magical effects, missing persons mystery, local politics
- **Key Discovery**: Every settlement is vulnerable; the frontier is changing faster than anyone can respond
- **Outcomes**: Solve the mystery, aid the community, recruit allies
- **Reward**: Political favor, future allies
- **Files**: `Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/`

---

## Opening Encounters (Recommended Starter)

### Wolves at the Waystone Inn (Combat)
- **Level**: 1–2
- **Encounter**: 2 desperate wolves attack party on road
- **Purpose**: Create immediate party cohesion through shared combat
- **File**: `Season 1/Adventures/Opening/Open Skirmish.md`

### The Morning After (Social)
- **Level**: Any
- **Encounter**: Formal swearing-in, charter signing, leadership intros
- **Purpose**: Establish guild identity and structure
- **File**: `Season 1/Adventures/Opening/THE MORNING AFTER.md`

### Wolves - Contract (Briefing)
- **Level**: Any
- **Encounter**: Contract W-17 posted and explained
- **Purpose**: Deliver party to Welton for first adventure
- **File**: `Season 1/Adventures/Opening/Wolves - Contract.md`

---

## Geography (Canonical)

| Location | Role | Connection |
|----------|------|-----------|
| **Waystone Inn** | Guild HQ, mission hub, neutral ground | Campaign home |
| **Welton** | Agricultural village | Wolves of Welton |
| **Westly's Farm** | Outlying homestead | Wolf attacks occur here |
| **Pinebrook** | Trading village | Peril in Pinebrook |
| **Palebank Village** | Seaside settlement | Frozen Sick |
| **Croaker Cave** | Bandit hideout | Frozen Sick side path |
| **Salsvault** | Buried Aeorian ruins (far north) | Source of Echo, Frozen Sick capstone |
| **Temple of the Dragonknights** | Cult stronghold (NW mountains) | Temple adventure |
| **Noke's Tower** | Wizard's tower (W of Waystone) | Wild Sheep Chase |

---

\page

## Guild Infrastructure

### The Northwatch Wardens Charter

**Seven Articles:**

**I. Purpose**
- Safeguard frontier settlements
- Investigate threats mundane and arcane
- Provide aid to travelers and townsfolk
- Maintain peace along wild roads

**II. Membership**
- Open to competent individuals
- Requires oath and completion of at least one contract
- Members can come and go; no forced permanence

**III. The Guild Code**
All Wardens shall:
1. Protect the innocent
2. Honor their contracts
3. Share vital information with fellow Wardens
4. Respect the frontier's people, land, and traditions
5. Stand against corruption, mortal or magical
6. Never abandon a companion unless survival demands retreat

**IV. Contracts & Duties**
- Posted on the Waystone Board
- Include: monster suppression, escorts, investigation, recovery, diplomacy, scouting
- Payment distributed fairly among participants
- 10% supports guild operations

**V. Leadership**
- Triad Council: Marshal, Steward, Lorewarden
- 2/3 signatures required for decisions
- Emergency provisional orders allowed

**VI. Sanctuary**
- Waystone Inn serves as guildhall, safehouse, meeting place
- All Wardens entitled to: bunk, hot meal, basic healing, record access

**VII. Amendments**
- Majority vote of active Wardens present at gathering

### Leadership Triad

**Marshal Brenna Thorne** — Field Commander
- **Public Role**: Contract assignment, combat readiness, tactical decisions
- **Background**: Decades of frontier patrol; hardened ranger
- **Secret**: Survivor of Greywinter Hunts (creature attack that killed half her squad, including her brother); carries guilt and obsession with thorough investigation; has sealed letter from Uthodurn warning of arcane disturbances

**Steward Mara Fenwick** — Quartermaster
- **Public Role**: Supplies, finances, logistics, reimbursements
- **Background**: Cheerful, meticulous; runs guild operations smoothly
- **Secret**: Former smuggler from Shadycreek Run with active bounty; knows criminal networks intimately; will warn about specific threats (e.g., Uttolot family)

**Lorewarden Elric Vael** — Arcane Scholar
- **Public Role**: Investigation support, magical research, frontier lore, threat analysis
- **Background**: Soft-spoken elven mage; catalogues arcane phenomena
- **Secret**: Investigating mysterious arcane disturbances across frontier; believes they trace to buried Aeorian engine beneath Northreach; has prophetic dreams of ice cracking and towers collapsing

\page

### Field Roster (See `Season 1/Campaign Assets/DM Guild Roster.md` for full details)

**Trailwardens** (scouts, wilderness specialists):
- **Corel** — Senior Shepherd of Welton (halfling); only other Greywinter Hunts survivor
- **Bordel Barleywind** — Human ranger; traumatized by past wolf encounter
- **Rowan Fairweather** — Half-elf druid; senses disturbance in natural balance; has ice dragon visions
- **Mila Teno** — Young elf; eager but wolf-phobic after sibling loss

**Lantern Guard** (frontline fighters):
- Takk, Galvena, Ariodh, Guz

**Lorewatch** (mages, scholars):
- Sera, Aurixean, Shinebright, Baleth

**Hearthwardens** (community anchors):
- Father Merriksonn, Willen, Flynt, Joel

**Wild Allies**:
- **Bolt** — Lawful Neutral awakened alpha wolf; diplomatic, seeks coexistence
- **Flame** — Chaotic Evil awakened alpha wolf; aggressive, self-interested

---

## Campaign Assets & Files

### Structure
```
Season 1/
├── Northwatch_Wardens.xml          (GM5e compendium, import-ready)
├── Adventures/
│   ├── Opening/
│   │   ├── Open Skirmish.md
│   │   ├── THE MORNING AFTER.md
│   │   └── Wolves - Contract.md
│   ├── Wolves_Of_Welton/
│   │   ├── 5E_Wolves_Of_Welton.md
│   │   ├── 5E_Wolves_Of_Welton.json
│   │   ├── Wolves_Of_Welton_Printer_Friendly.md
│   │   └── 5E_Wolves_Of_Welton_images/
│   ├── Frozen Sick/
│   │   ├── Frozen Sick.md
│   │   └── images/
│   ├── Temple_of_the_Dragonknights/
│   │   ├── Temple_of_the_Dragonknights.md
│   │   ├── Temple_of_the_Dragonknights.json
│   │   └── images/
│   ├── The_Wild_Sheep_Chase_V2/
│   │   ├── 892902-The_Wild_Sheep_Chase_V2.md
│   │   ├── 892902-The_Wild_Sheep_Chase_V2.json
│   │   └── images/
│   └── Peril_in_Pinebrook_COMPLETE/
│       ├── Peril_in_Pinebrook_COMPLETE.md
│       ├── Peril_in_Pinebrook_COMPLETE.json
│       └── Peril_in_Pinebrook_COMPLETE_images/
└── Campaign Assets/
  ├── THE NORTHWATCH WARDENS - Charter.md     (pointer to canonical charter)
  ├── THE NORTHWATCH WARDENS - Charter.json   (pointer to canonical charter)
    ├── DM Guild Roster.md                      (NPC secrets & campaign ties)
    └── NORTHWATCH WARDENS - Campaign Arc.md    (how adventures interlock)

World Building/
└── Organizations/
  └── Northwatch_Wardens/
    ├── THE NORTHWATCH WARDENS - Charter.md     (canonical charter source)
    └── THE NORTHWATCH WARDENS - Charter.json   (canonical charter source)
```

\page

### Key Files
- **Charter (canonical)**: `World Building/Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md`
- **NPC Secrets**: `Season 1/Campaign Assets/DM Guild Roster.md`
- **Mystery Framework**: `Season 1/Campaign Assets/NORTHWATCH WARDENS - Campaign Arc.md`
- **Adventure Secrets Quick Reference**: `Season 1/DM_Resources/Adventure_Secrets_Quick_Reference.md` ← **NEW!**
- **Stat Blocks**: JSON files in each adventure folder

---

## DM Resources & World Secrets

**NEW: Adventure Secrets Quick Reference**

For quick navigation between adventures and their hidden lore, see:
- **[Season 1/DM_Resources/Adventure_Secrets_Quick_Reference.md](./DM_Resources/Adventure_Secrets_Quick_Reference.md)**

This document provides:
- Direct links from each adventure to its relevant world secrets
- Reverse links from secret files back to adventures
- Key secrets summary for each location
- Player discovery guidelines
- Navigation tips for session prep

**World Secrets (DM Eyes Only):**
- **[World Building/DMEyesOnly/The_Aeorian_Echo.md](../World%20Building/DMEyesOnly/The_Aeorian_Echo.md)** - Complete Echo documentation
- **[World Building/DMEyesOnly/Northreach.md](../World%20Building/DMEyesOnly/Northreach.md)** - Regional secrets & adventure integration
- **[World Building/DMEyesOnly/Places_Secrets.md](../World%20Building/DMEyesOnly/Places_Secrets.md)** - Location-specific hidden truths

Each adventure file now includes a "Northwatch Wardens Integration (DM)" section at the top with links to relevant secrets.

---

## Session Prep Checklist

### Before Each Session
1. **Pick an adventure** — Choose based on party level or let players select from posted contracts
2. **Review adventure secrets** — Check `Adventure_Secrets_Quick_Reference.md` for relevant world secrets
3. **Review the NPC secrets** — Check `DM Guild Roster.md` for relevant character motivations
4. **Note the mystery clue** — Each adventure hints at the Aeorian Echo; decide what party discovers
5. **Scale for party size** — 2 players = tighter encounters; 5 players = add reinforcements
6. **Prepare battle maps** — Use markdown descriptions or generate tactical maps externally

### Before Campaign Start
1. **Read the Campaign Arc** — Understand how adventures interlock (`NORTHWATCH WARDENS - Campaign Arc.md`)
2. **Review Adventure Secrets** — Familiarize with the connection system (`Adventure_Secrets_Quick_Reference.md`)
3. **Familiarize yourself** — Review charter, leadership, and NPCs
4. **Decide play order** — Adventures are order-independent; many DMs start with Wolves of Welton
5. **Import or reference** — Load XML into GM5e or use markdown + JSON files directly

---

## Design Principles

- **Order-independent**: No adventure depends on prior completion; each stands alone
- **Variable party size**: Adventures scale for 2–5 players per session
- **Drop-in friendly**: New players can join anytime with new or returning characters
- **Mystery-driven**: Each adventure provides clues; reveal the Aeorian Echo on your schedule
- **Consequence-rich**: Player choices echo across NPCs and settlements
- **Moral complexity**: Multiple resolution paths; no single "right" answer
- **Frontier atmosphere**: Low magic, grounded, but with arcane mysteries lurking

---

## Campaign Themes

- **The frontier is awakening** — Magic long buried is rising and destabilizing everything
- **Local problems reflect global threats** — Symptoms of the Aeorian Echo manifest differently in each location
- **Communities are resilient but fragile** — Small choices impact entire settlements
- **Intelligence and agency** — Even monsters can think, negotiate, and plan
- **Power corrupts** — Cults, dragons, and ambitious NPCs seek to exploit magic for dominance

---

## How the Mystery Unfolds

With each adventure, reveal more about the Aeorian Echo. Example progression:

**Session 1 (Wolves)**: "Why are wolves suddenly intelligent?"
→ *Answer*: Magical energy from somewhere is awakening things.

**Session 2 (Frozen Sick)**: "What is this plague? Where does it come from?"
→ *Answer*: Aeorian spores from an active ruin to the far north.

**Session 3 (Temple)**: "Why are cults and dragons moving now?"
→ *Answer*: They sense rising magic and want to exploit it.

**Session 4 (Sheep Chase)**: "Why are magical items failing?"
→ *Answer*: The entire arcane fabric of the region is destabilizing.

**Session 5 (Pinebrook)**: "Is the whole frontier affected?"
→ *Answer*: Yes. Every settlement will eventually feel this change.

---

## Running for Variable Attendance

### Player Continuity
- **New players join**: They're new Wardens arriving at Waystone Inn. No backstory required.
- **Recurring characters**: Maintain a shared roster so regulars can bring their Warden back
- **Solo adventurers**: A single PC runs normally; encounters just become tighter
- **Large groups**: Add reinforcements (more monsters, tougher boss tactics)

### Session Length Guidance
- **2-hour session**: Complete one encounter or short combat
- **3-4 hour session**: Full adventure or multi-scene encounter
- **One-shots**: Wild Sheep Chase is perfect; Wolves can be shortened

### Scalable Encounters
- Each adventure includes guidance for adjusting CR and encounter size
- JSON stat blocks note "minion" variants for swarms
- Recommended: Add 1 extra monster per additional PC beyond 3

---

\page

## Content & Licensing

- Compile your own D&D Beyond purchases into the XML
- Markdown files are original or derived from your licensed content
- Do not redistribute third-party stat blocks or descriptions verbatim
- Use as personal campaign material

---

## Resources

- **Charter Text (canonical)**: `World Building/Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md`
- **NPC Secrets & Campaign Ties**: `Season 1/Campaign Assets/DM Guild Roster.md`
- **Mystery Framework & Adventure Interlock**: `Season 1/Campaign Assets/NORTHWATCH WARDENS - Campaign Arc.md`
- **Stat Blocks** (parseable): JSON files in each adventure folder

---

## Ready to Play

**First-time DMs:** Start with the **[DM Quick Start Guide](../DM_QUICKSTART.md)** — a step-by-step guide to run your first session with minimal prep.

**Experienced DMs:**

1. **Pick an adventure** — Start with Opening + Wolves of Welton, or jump to any adventure
2. **Gather your 2–5 players** — Variable attendance welcomed
3. **Post the contract** — Read the contract briefing to party
4. **Let them earn their badges** — Watch as they uncover the Aeorian Echo

The frontier awaits. The Northwatch Wardens have work to do.

\page
<!-- FILE_END: ../Season 1/README.md -->

<!-- FILE_START: ../Season 1/Campaign_ToC.md -->
# Northwatch Wardens: Season One

## Campaign Table of Contents & Encounter Checklist

**Campaign Name:** Northwatch Wardens: Season One  
**System:** D&D 5e (GM5e XML v5)  
**Level Range:** 1-5  
**Theme:** Frontier mystery, Aeorian Echo, low-magic grounded adventure  
**Combat Encounters:** 12 encounters with full stat blocks (45 combatants, 18,175 XP total)

## Quick Links

- [The Story So Far](The_Story_So_Far.md)
- [Northreach Setting Primer](../World%20Building/Regions/Northreach/Northreach_Setting_Primer.md)
- [Session Prep Guide](DM_Resources/Session_Prep_Guide.md)
- [Campaign Tracker (blank)](DM_Resources/Campaign_Tracker_BLANK.md)


---

## Adventure Structure

### 0. Campaign Setup (uid: 2015)
**Campaign Overview: Northwatch Wardens**
- Introduction to Waystone Inn and Northreach region
- Charter signing and Warden oath
- No combat encounters

### 1. Opening Skirmish (uid: 2012) **[NEW!]**
**Wolves at the Waystone Inn**
- Party formation encounter (strangers arriving at inn)
- Natural character introductions through combat
- **COMBAT:** 2 Starving Wolves | **XP:** 100

#### Encounter:
1. ✅ **Opening Skirmish: Desperate Wolves** (uid: 2190)
   - 2 wolves attack outside inn at dusk
   - Party formation through shared danger
   - Establishes frontier tone
   - Transitions to morning ceremony

**Status:** ✅ Complete (1 encounter)

---

### 2. Opening Session (uid: 2013)
**The Morning After: Ceremony and First Contract**
- Charter signing ceremony (references previous night's fight)
- First contract assignment (Wolves of Welton)
- No combat encounters

---

### 3. Wolves of Welton (uid: 2016)
**Levels:** 1-3  
**Type:** Investigation with multiple resolution paths  
**Theme:** Intelligent wolves, moral choices, village politics

#### Encounters:
1. ✅ **Scene 1: Welcome to the Welton Wolfpack** (uid: 2180)
   - Road ambush, 8 wolves attacking shepherds
   - Party starts 150ft away
   - **Combatants:** 8 Wolves | **XP:** 1,600

2. ✅ **Scene 2: Village People** (uid: 2183)
   - Social/investigation scene
   - Shepherd's Crook Inn, Council Meeting
   - Featherock's testimony, village exploration

3. ✅ **Scene 3: Plan of Attack** (uid: 2184)
   - Planning and travel through Western Woods
   - Optional bait strategy (6 wolves)
   - Tracking, environmental challenges, approach to den

4. ✅ **Scene 4: The Owlbear's Picnic** (uid: 2181)
   - Optional encounter
   - Injured owlbear (HP 40/59)
   - **Combatants:** 1 Owlbear | **XP:** 700

5. ✅ **Scene 5: The Wolf Den Battle** (uid: 2182)
   - Main den combat
   - Flame, Bolt, and wolf pack
   - Moral choices with wolf pups
   - **Combatants:** Flame, Bolt, 4 Armored Wolves, 6 Wolves | **XP:** 3,100

6. ✅ **Welton Council Clash** (uid: 2102)
   - Negotiation encounter (optional combat if Flame betrays)
   - **Combatants:** Bolt, Flame, Willen, Father Merriksonn | **XP:** 900

5. ✅ **Scene 5: The Wolf Den Battle** (uid: 2182)
   - Main den combat
   - Flame, Bolt, and wolf pack
   - Moral choices with wolf pups

6. ✅ **Welton Council Clash** (uid: 2102)
   - Flame's betrayal scene
   - Political resolution/negotiation

**Status:** ✅ Complete (6 encounters)

---

### 4. Frozen Sick (uid: 2017)

\page

**Levels:** 1-3  
**Type:** Survival adventure, plague investigation, Aeorian ruins  
**Theme:** Disease mystery, harsh environment, ancient magic

#### Encounters:
1. ✅ **Urgon's Funeral and Investigation** (uid: 2221)
   - Urgon's funeral, Elro's request
   - Investigation phase, disease mechanics

2. ✅ **Urgon's Cabin Search** (uid: 2222)
   - Clue gathering, Mila Teno interaction
   - Aeorian connection discovered

3. ✅ **Tulgi's Cabin Interview** (uid: 2223)
   - Social encounter, Tulgi's confession
   - Disease information, Croaker Cave location

4. ✅ **Pelc's Curiosities Investigation** (uid: 2224)
   - **COMBAT:** 5 Elf Bandits | **XP:** 625
   - Verla's death confirmed, journal evidence

5. ✅ **Frozen Sick: Croaker Cave Ambush** (uid: 2103)
   - **COMBAT:** 3 Giant Ice Frogs | **XP:** 1,350
   - Cave entrance, stealth options

6. ✅ **Croaker Cave - Entrance & Giant Ice Frogs** (uid: 2225)
   - Cave navigation encounter (non-combat)

7. ✅ **Croaker Cave - Bandit Hideout** (uid: 2226)
   - 6 Bandits (optional combat)
   - Uttolot family revealed, interrogation

8. ✅ **Croaker Cave - Hulil's Lair** (uid: 2227)
   - **COMBAT:** Hulil Lutan + Raegrin Mau | **XP:** 650
   - Priestess of Tiamat, moral choices, vial discovery

9. ✅ **Journey to Syrinlya** (uid: 2228)
   - Boat travel, magical storm skill challenge
   - 3-day journey to Eiselcross coast

10. ✅ **Syrinlya Outpost** (uid: 2229)
    - Uthodurnian base, Commander Morgo Delwur
    - Supplies, Irven Liel guide recruitment

11. ✅ **Eiselcross - Winter Wolf Ambush** (uid: 2235)
    - **COMBAT:** 2 Winter Wolves | **XP:** 1,400
    - Night watch encounter, breath weapons

12. ✅ **Trek to Salsvault** (uid: 2230)
    - Wilderness survival, environmental hazards
    - Crevasse traps, frozen forest, yeti avoidance

13. ✅ **Salsvault - Security Construct Ambush** (uid: 2236)
    - **COMBAT:** 1 Aeorian Security Construct | **XP:** 450
    - Pre-Calamity security, Freeze Ray attacks

14. ✅ **Salsvault - Entrance Hall** (uid: 2231)
    - Facility introduction, keycard discovery

15. ✅ **Salsvault - Laboratory Wing** (uid: 2232)
    - Lab investigation, containment breaches

16. ✅ **Salsvault - Research Chambers** (uid: 2233)
    - Archives, authorization code discovery (3-8-15)

17. ✅ **Salsvault - Containment Vault** (uid: 2234)
    - ANTIDOTE secured, Locker 7

18. ✅ **Salsvault - Arcane Engine** (uid: 2235)
    - Engine shutdown decision, optional encounter

19. ✅ **Resolution and Return to Palebank** (uid: 2237)
    - Cure distribution, moral choices
    - Village celebration, epilogue hooks

**Frozen Sick Combat:** 5 encounters (13 combatants, 4,475 XP)  
**Status:** ✅ Complete (19 encounters)

---

### 5. Temple of the Dragonknights (uid: 2018)
**Levels:** 3-5  
**Type:** Capstone adventure, cult investigation, dragon confrontation  
**Theme:** Cult activity, ancient temple, moral complexity

#### Encounters:
1. ✅ **Kobolds vs. Guards** (uid: 2170)
   - Town combat, Joel Andersmith introduction

2. ✅ **Andersmith Farm Investigation** (uid: 2171)
   - Murder scene, tracking clues

3. ✅ **The Trail to Poisontip Cavern** (uid: 2172)
   - Creek crossing, quippers, cave approach

4. ✅ **Poisontip Cavern Area 1** (uid: 2173)
   - Winged kobold, rope bridge

5. ✅ **Poisontip Cavern Area 2** (uid: 2174)
   - Sleeping kobolds, puzzle clue, secret door

6. ✅ **Poisontip Cavern Area 3: The Bridge** (uid: 2175)
   - Rickety bridge skill challenge

7. ✅ **Poisontip Cavern Area 4: Piercer Trap** (uid: 2176)
   - Ceiling trap, treasure chest (25gp)

8. ✅ **Poisontip Cavern Area 5: Blood Offering Puzzle** (uid: 2177)
   - Dragonknight door puzzle

9. ✅ **Temple Guardian Constructs: The Ascending Hall** (uid: 2185)
   - 2 Animated Armor sentinels
   - Narrow staircase combat

10. ✅ **Temple Courtyard Sentinels** (uid: 2186)
    - 2 Helmed Horrors (avoidable via diplomacy)
    - Multiple resolution paths

11. ✅ **Temple Areas 1-3: Undead, Rescue, and Shadow** (uid: 2178)
    - Zombies, Sera Gelanadel rescue, shadow ambush

12. ✅ **Temple Area 4: The Ritual Chamber** (uid: 2179)
    - Ritual chamber, 5 cultists, Clementine suspended

13. ✅ **Temple of the Dragonknights: Final Ritual** (uid: 2104)
    - Venomfang encounter, final confrontation

**Status:** ✅ Complete (13 encounters)

---

\page


### 6. The Wild Sheep Chase (uid: 2019)
**Levels:** 2-4  
**Type:** Comedy one-shot, magical chaos  
**Theme:** Whimsy, polymorphed animals, unstable magic

#### Encounters:
1. ✅ **Baaaa-d News: The Sheep Introduction** (uid: 2160)
   - Shinebright (sheep form), Scroll of Speak with Animals

2. ✅ **Shepherds, Crooks: Guz and the Polymorphed Guards** (uid: 2161)
   - Guz (CR 2), 3 Wolves, 1 Brown Bear

3. ✅ **The House in the Woods: Noke's Tower** (uid: 2162)
   - Living oak tower infiltration
   - Noke stats and Modified Wand lore

4. ✅ **Noke's Polymorphed Guard Compound** (uid: 2187)
   - 3 Apes with greatswords, 1 Brown Bear
   - Multiple resolution paths, moral choices

5. ✅ **Wild Sheep Chase: Tower Skirmish** (uid: 2105)
   - Noke (7th level Wizard)
   - Bed Dragon Wyrmling finale

**Status:** ✅ Complete (5 encounters)

---

### 7. Peril in Pinebrook (uid: 2020)
**Levels:** 1-3  
**Type:** Side trek, investigation, community crisis  
**Theme:** Dragon egg theft, silver dragon alliance, ice troll threat

#### Encounters:
1. ✅ **Pinebrook Investigation: Troll Tracks and Missing Patrols** (uid: 2188)
   - 4-location investigation encounter
   - Track missing patrol, discover evidence of ice trolls and egg snatchers
   - Multiple skill checks, decision point (pursue/retreat/split)
   - Estimated Time: 30-45 minutes
   - **XP:** 200 (investigation reward)

2. ✅ **Pinebrook Investigation: The Baby Dragon Discovery** (uid: 2189)
   - Find and care for lost silver dragon wyrmling
   - Captain Kole provides dragon lore and Draconic language page
   - Bonding mechanics, emotional hook
   - Estimated Time: 15-20 minutes
   - **XP:** 100 (investigation reward)

3. ✅ **Pinebrook: Living Icicles at Cave Entrance** (uid: 2150) **[NEW!]**
   - **COMBAT:** 5 Living Icicles (CR 1/4 constructs)
   - Guard dragon lair entrance, created by ice trolls
   - Vulnerable to fire, immune to cold
   - Terrain: snow drifts, ice patches, stalagmites, rockfall hazard
   - Estimated Time: 10-15 minutes
   - **XP:** 125 (25 XP per icicle)

4. ✅ **Pinebrook: Egg Snatchers in Hatching Chamber** (uid: 2151) **[NEW!]**
   - **COMBAT:** 3 Egg Snatchers (CR 1 monstrosities)
   - Amphibious creatures trained by ice trolls to steal dragon eggs
   - Pack tactics, standing leap (30 ft), grapple mechanics
   - Objective: Protect 2 unhatched silver dragon eggs
   - Mother dragon arrives after combat ends
   - Estimated Time: 15-20 minutes
   - **XP:** 600 (200 XP per snatcher)

**Status:** ✅ Complete (4 encounters, 8 combatants, 725 XP)

**Adventure Summary:**
- Investigation phase introduces mystery and characters (Captain Kole, missing patrol, baby dragon)
- Combat phase tests party skills against magical guardians and trained monsters
- Emotional payoff: reunite baby with mother, secure dragon alliance for campaign
- Connects to larger campaign: ice trolls are spreading threat across frontier

---

## UID Range Allocation

| Adventure | UID Range | Status |
|-----------|-----------|--------|
| Campaign Setup | 2015 | ✅ |

\page

| Opening Session | 2013 | ✅ |
| Wolves of Welton | 2016, 2102, 2180-2184 | ✅ |
| Frozen Sick | 2017, 2103, 2221-2236 | ✅ |
| Temple of Dragonknights | 2018, 2104, 2170-2179, 2185-2186 | ✅ |
| Wild Sheep Chase | 2019, 2105, 2160-2162, 2187 | ✅ |
| Peril in Pinebrook | 2020, 2150-2157, 2188-2189 | ✅ |

---

## Campaign Progress Summary

### ✅ Complete Adventures (7/7):
- Opening Skirmish: 1 encounter (2 combatants, 100 XP)
- The Morning After: No combat encounters (ceremony)
- Wolves of Welton: 6 encounters (25 combatants, 6,300 XP)
- Frozen Sick: 19 encounters (13 combatants, 4,475 XP)
- Temple of Dragonknights: 13 encounters (3 combatants, 5,900 XP)
- Wild Sheep Chase: 5 encounters (2 combatants, 1,400 XP)
- Peril in Pinebrook: 4 encounters (8 combatants, 725 XP)

**Total Campaign Stats:**
- **14 combat encounters** with full stat blocks
- **53 total combatants**
- **18,900 XP** available

### 🎉 Campaign Status: **100% COMPLETE with Enhancements!**


---

## Next Steps / Todo List

### ✅ Priority 1: Complete Frozen Sick Encounters - **DONE!**
- [x] Create uid 2221: Funeral and Investigation
- [x] Create uid 2222: Urgon's Cabin Search
- [x] Create uid 2223: Tulgi's Cabin Interview
- [x] Create uid 2224: Pelc's Curiosities Investigation
- [x] Create uid 2225: Croaker Cave - Entrance & Giant Ice Frogs
- [x] Create uid 2226: Croaker Cave - Bandit Hideout
- [x] Create uid 2227: Croaker Cave - Hulil's Lair
- [x] Create uid 2228: Journey to Syrinlya
- [x] Create uid 2229: Syrinlya Outpost
- [x] Create uid 2230: Trek to Salsvault
- [x] Create uid 2231: Salsvault - Entrance Hall
- [x] Create uid 2232: Salsvault - Laboratory Wing
- [x] Create uid 2233: Salsvault - Research Chambers
- [x] Create uid 2234: Salsvault - Containment Vault
- [x] Create uid 2235: Salsvault - Arcane Engine
- [x] Create uid 2236: Resolution and Return

### ✅ Priority 2: Optional Enhancements - **DONE!**
- [x] Add optional scene encounters for Wolves of Welton (Scene 2, Scene 3)
- [x] Expand Temple guardian constructs as separate encounters
- [x] Add polymorphed animals encounters for Wild Sheep Chase
- [x] Create specific Pinebrook investigation encounters (uid 2188-2189)

### ✅ Priority 3: Quality Assurance - **COMPLETE!**
- [x] Verify all encounter UIDs are unique
- [x] Ensure all stat blocks are complete
- [x] Cross-reference markdown sources with XML
- [x] Validate encounter balance for party size
- [x] Validate XML format and special character escaping

**QA Results:**
- ✅ 42 unique UIDs validated (NPCs, adventures, encounters)
- ✅ All stat blocks complete (NPCs properly referenced in encounters)
- ✅ 5 source markdown files cross-referenced successfully
- ✅ 4 combat encounters balanced for intended party levels
- ✅ 39 investigation/social encounters with rich content
- ✅ XML validation passed: Fixed 11 ampersands & 2 mathematical operators
  - **Structure:** 9 NPCs, 7 Adventures, 43 Encounters
  - **Format:** Game Master 5e XML v5 (5,562 lines)
  - **Status:** File loads successfully in Game Master 5e

---

## Notes

\page


### Design Philosophy
- **Grounded low-magic**: Encounters feel dangerous and realistic
- **Moral choices**: Many encounters have non-combat resolutions
- **Interconnected lore**: Aeorian Echo connects all adventures
- **Frontier theme**: Survival, isolation, community stakes

### Encounter Design Standards
- Include complete stat blocks
- Provide tactical notes for DM
- Offer multiple resolution paths where appropriate
- Scale for 2-5 players
- Include XP rewards and treasure

### UID Conventions
- 2010-2020: Adventure UIDs
- 2100-2199: Special/legacy encounters
- 2150-2189: Adventure-specific encounter ranges
- 2180-2189: Priority 2 enhancement encounters
- 2221-2236: Frozen Sick encounters (reserved)
- 3000+: NPC UIDs

---

**Last Updated:** December 30, 2025  
**Version:** 2.7  
**Campaign Status:** 🎉 **ENHANCED & COMPLETE!** (53 encounters across 6 adventures)

---

## DM Resources Created

### Session Management
- **Session_Prep_Guide.md** - Complete DM workflow, pacing, and improvisation toolkit
- **Campaign_Tracker_BLANK.md** - Fillable tracker for choices, NPCs, and continuity

### Campaign Flow
- ✅ Strong narrative thread (Aeorian Echo connects all adventures)
- ✅ Natural session structure (Guild hub at Waystone Inn)
- ✅ Player-led recaps work naturally (Guild briefings create recap moments)
- ✅ West Marches compatible (episodic structure handles flexible schedules)

### Cohesion Assessment
- **Recurring themes:** Frontier survival, magical corruption, moral complexity
- **Inter-adventure connections:** All link through Aeorian Echo
- **NPC continuity:** 9 recurring NPCs with campaign-wide relevance
- **Geographic consistency:** 6 locations all referenced from Waystone Inn hub

\page
<!-- FILE_END: ../Season 1/Campaign_ToC.md -->

# DM Resources

<!-- FILE_START: ../Season 1/DM_Resources/Campaign_Tracker.md -->
{{note
##### 📋 DUNGEON MASTER RESOURCE

**Campaign Progress Tracker**

This is a DM tool for tracking campaign progress and party status.
}}

# Campaign Tracker: Northwatch Wardens Season One

**Campaign Start Date:** _____________  
**Current In-Game Date:** _____________  
**Party Level:** 2  
**Sessions Played:** 1

---

## Party Roster

| Player Name | Character Name | Class/Level | Status |
|-------------|----------------|-------------|--------|
| Erin| | Ranger 2 | Active |
| Jude| | Paladin 2 | Active |
|Rowan | | Warlock 2 | Active |

---

## Contracts Completed

### ☑ Wolves of Welton (Contract W-17)
- **Resolution:** ☑ Negotiated ☐ Combat ☐ Mixed
- **Flame:** ☐ Killed ☐ Captured ☐ Fled ☑ Negotiated
- **Bolt:** ☑ Alive ☐ Dead ☐ Injured
- **Wolf pups:** ☑ Spared ☐ Killed ☐ Taken
- **Welton Council vote:** ☑ Passed ☐ Failed
- **Key NPCs met:** Father Merriksonn, Tillus Merrion
- **Payment received:** 800 gp (split 3 ways; 266 gp each; 2 gp unassigned/party funds)
- **Level up?** ☑ Yes (1→2)

**Notes:**
- Party is still in Welton and needs to return to Waystone Inn to report.
- Tentative truce established with the awakened wolves; Bolt and Flame both survived.
- Wolf pups were spared.
- Risk remains that the awakened wolf faction could turn against humans.
- Recovered a note from Alexi in magical shorthand; only the word “Aeorian” was legible.

---

### ☐ Frozen Sick
- **Urgon:** ☐ Cured ☐ Died
- **Tulgi:** ☐ Cured ☐ Died ☐ Arrested
- **Hulil Lutan:** ☐ Killed ☐ Captured ☐ Fled ☐ Converted
- **Salsvault Engine:** ☐ Shut down ☐ Left running ☐ Destroyed
- **Antidote secured:** ☐ Yes ☐ No
- **Villages cured:** ☐ Palebank ☐ Others
- **Key NPCs met:** Elro Aldataur, Pelc, Irven Liel, Commander Morgo Delwur
- **Payment received:** _____ gp
- **Level up?** ☐ Yes (2→3)

**Aeorian Artifacts Found:**
- ☐ Blue vial (plague source)
- ☐ Keycard (Salsvault access)
- ☐ Research notes (authorization code: 3-8-15)
- ☐ Other: _________________

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

### ☐ Temple of the Dragonknights
- **Venomfang:** ☐ Killed ☐ Fled ☐ Negotiated ☐ Alive
- **Cult leader:** ☐ Killed ☐ Captured ☐ Fled
- **Clementine Andersmith:** ☐ Rescued ☐ Corrupted ☐ Dead
- **Sera Gelanadel:** ☐ Rescued ☐ Dead ☐ Left behind
- **Kobolds:** ☐ Killed ☐ Negotiated ☐ Avoided
- **Temple artifacts:** ☐ Taken ☐ Left ☐ Destroyed
- **Key NPCs met:** Joel Andersmith, kobold chief
- **Payment received:** _____ gp
- **Level up?** ☐ Yes (4→5)

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

### ☐ The Wild Sheep Chase
- **Finethir Shinebright:** ☐ Restored ☐ Still sheep ☐ Dead
- **Noke:** ☐ Killed ☐ Captured ☐ Fled ☐ Negotiated
- **Polymorphed guards:** ☐ Restored ☐ Still animals ☐ Dead
- **Modified Wand:** ☐ Destroyed ☐ Given to Elric ☐ Kept ☐ Sold
- **Bed Dragon:** ☐ Killed ☐ Fled ☐ Befriended
- **Key NPCs met:** Shinebright, Guz the Bugbear
- **Payment received:** _____ gp

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

### ☐ Peril in Pinebrook
- **Captain Emmajeen Kole:** ☐ Met ☐ Allied ☐ Hostile
- **Baby dragon:** ☐ Returned to mother ☐ Kept ☐ Dead
- **Mother dragon (Hysvearorn):** ☐ Allied ☐ Hostile ☐ Neutral
- **Missing patrol:** ☐ Rescued ☐ Dead ☐ Not found
- **Egg snatchers:** ☐ Killed ☐ Captured ☐ Fled
- **Ice trolls:** ☐ Killed ☐ Negotiated ☐ Avoided
- **Key NPCs met:** Captain Kole, dragon wyrmling
- **Payment received:** _____ gp

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

## Guild Relationships

### Marshal Brenna Thorne
- **Reputation:** ☐ Trusted ☐ Neutral ☐ Suspicious ☐ Hostile
- **Last interaction:** _________________
- **Secrets revealed?** ☐ Greywinter Hunts ☐ Sealed letter about disturbances

### Steward Mara Fenwick
- **Reputation:** ☐ Friendly ☐ Neutral ☐ Wary
- **Last interaction:** _________________
- **Secrets revealed?** ☐ Criminal past ☐ Uttolot bounty

### Lorewarden Elric Vael
- **Reputation:** ☐ Trusted ☐ Neutral ☐ Suspicious
- **Last interaction:** _________________
- **Secrets revealed?** ☐ Prophetic dreams ☐ Arcane engine theory

---

## Aeorian Echo: Clue Tracker

### Discovered Clues:

☑ **Wolves of Welton:** Note from Alexi in magical shorthand; the word “Aeorian” was legible.

☐ **Frozen Sick:** Blue-vein plague caused by Aeorian relic (blue vial from Salsvault)

☐ **Frozen Sick:** Salsvault ruins are active and leaking arcane energy

☐ **Frozen Sick:** Perpetuation Engine still running after thousands of years

☐ **Temple:** Dragon cult drawn to area by magical disturbances

☐ **Elric's Theory:** All disturbances trace to "ancient arcane engine buried beneath Northreach"

☐ **Brenna's Letter:** Uthodurn contact warns of "arcane disturbances" spreading

☐ **Peril in Pinebrook:** [Ice trolls becoming more active? Dragon drawn to area?]

### Party Theories:

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

## NPC Roster & Status

| NPC Name | Location | Status | Party Relationship |
|----------|----------|--------|-------------------|
| Marshal Brenna Thorne | Waystone Inn | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Steward Mara Fenwick | Waystone Inn | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Lorewarden Elric Vael | Waystone Inn | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Corel (Shepherd) | Welton | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Father Merriksonn | Welton | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Bolt (Awakened Wolf) | Western Woods | Alive | ☐ Ally ☑ Neutral ☐ Enemy |
| Flame (Awakened Wolf) | Western Woods | Alive | ☐ Ally ☑ Neutral ☐ Enemy |
| Elro Aldataur | Palebank | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Tulgi (Healer) | Palebank | ? | ☐ Ally ☐ Neutral ☐ Enemy |
| Captain Emmajeen Kole | Pinebrook | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Finethir Shinebright | Wandering | ? | ☐ Ally ☐ Neutral ☐ Enemy |
| Joel Andersmith | Near Temple | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Venomfang (Dragon) | Temple | ? | ☐ Ally ☐ Neutral ☐ Enemy |

**Other NPCs met:**
- Tillus Merrion (Welton council member)
- Alexi (note author; magical shorthand)

---

## Promises & Unfinished Business

### Party Said They Would:

☑ Return to Waystone Inn and report to the Wardens.

☐ _____________________________________________________________

☐ _____________________________________________________________

### Hooks for Future Sessions:

☐ Decode Alexi’s shorthand note ("Aeorian").

☐ Maintain the Welton truce (Bolt/Flame may test boundaries).

☐ _____________________________________________________________

---

## Treasure & Magic Items

| Item | Found Where | Attuned By | Notes |
|------|-------------|------------|-------|
| Gold (266 gp each; +2 gp unassigned) | Welton (W-17 payout) | — | Split between Ranger/Paladin/Warlock |

**Party Gold:** 2 gp (unassigned)  
**Stored at Waystone:** _____ gp

---

## Session Log

### Session 1: Wolves of Welton (Contract W-17)
**Date:** 2026-01-25  
**Adventure:** Wolves of Welton  
**Key Events:**
- Negotiated a tentative truce with the awakened wolves; council vote passed.
- Tillus Merrion backed the truce.
- Found Alexi’s shorthand note; “Aeorian” was legible.

**MVP Moment:** _____________________________________________

---

### Session 2: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

### Session 3: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

### Session 4: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

### Session 5: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

## Campaign Notes

### Things That Worked Well:
_____________________________________________________________
_____________________________________________________________

### Things to Improve:
_____________________________________________________________
_____________________________________________________________

### Player Feedback:
_____________________________________________________________
_____________________________________________________________

### Ideas for Future Adventures:
_____________________________________________________________
_____________________________________________________________

\page
<!-- FILE_END: ../Season 1/DM_Resources/Campaign_Tracker.md -->

<!-- FILE_START: ../Season 1/DM_Resources/Campaign_Tracker_BLANK.md -->
# Campaign Tracker: Northwatch Wardens Season One

**Campaign Start Date:** _____________  
**Current In-Game Date:** _____________  
**Party Level:** ___  
**Sessions Played:** ___

---

## Party Roster

| Player Name | Character Name | Class/Level | Status |
|-------------|----------------|-------------|--------|
| | | | Active |
| | | | Active |
| | | | Active |
| | | | Active |
| | | | Active |

---

## Contracts Completed

### ☐ Wolves of Welton (Contract W-17)
- **Resolution:** ☐ Negotiated ☐ Combat ☐ Mixed
- **Flame:** ☐ Killed ☐ Captured ☐ Fled ☐ Negotiated
- **Bolt:** ☐ Alive ☐ Dead ☐ Injured
- **Wolf pups:** ☐ Spared ☐ Killed ☐ Taken
- **Welton Council vote:** ☐ Passed ☐ Failed
- **Key NPCs met:** Father Merriksonn, Corel, Tillus Merrion, Leanor Slatebeard
- **Payment received:** _____ gp
- **Level up?** ☐ Yes (1→2)

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

### ☐ Frozen Sick
- **Urgon:** ☐ Cured ☐ Died
- **Tulgi:** ☐ Cured ☐ Died ☐ Arrested
- **Hulil Lutan:** ☐ Killed ☐ Captured ☐ Fled ☐ Converted
- **Salsvault Engine:** ☐ Shut down ☐ Left running ☐ Destroyed
- **Antidote secured:** ☐ Yes ☐ No
- **Villages cured:** ☐ Palebank ☐ Others
- **Key NPCs met:** Elro Aldataur, Pelc, Irven Liel, Commander Morgo Delwur
- **Payment received:** _____ gp
- **Level up?** ☐ Yes (2→3)

**Aeorian Artifacts Found:**
- ☐ Blue vial (plague source)
- ☐ Keycard (Salsvault access)
- ☐ Research notes (authorization code: 3-8-15)
- ☐ Other: _________________

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

### ☐ Temple of the Dragonknights
- **Venomfang:** ☐ Killed ☐ Fled ☐ Negotiated ☐ Alive
- **Cult leader:** ☐ Killed ☐ Captured ☐ Fled
- **Clementine Andersmith:** ☐ Rescued ☐ Corrupted ☐ Dead
- **Sera Gelanadel:** ☐ Rescued ☐ Dead ☐ Left behind
- **Kobolds:** ☐ Killed ☐ Negotiated ☐ Avoided
- **Temple artifacts:** ☐ Taken ☐ Left ☐ Destroyed
- **Key NPCs met:** Joel Andersmith, kobold chief
- **Payment received:** _____ gp
- **Level up?** ☐ Yes (4→5)

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

### ☐ The Wild Sheep Chase
- **Finethir Shinebright:** ☐ Restored ☐ Still sheep ☐ Dead
- **Noke:** ☐ Killed ☐ Captured ☐ Fled ☐ Negotiated
- **Polymorphed guards:** ☐ Restored ☐ Still animals ☐ Dead
- **Modified Wand:** ☐ Destroyed ☐ Given to Elric ☐ Kept ☐ Sold
- **Bed Dragon:** ☐ Killed ☐ Fled ☐ Befriended
- **Key NPCs met:** Shinebright, Guz the Bugbear
- **Payment received:** _____ gp

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

### ☐ Peril in Pinebrook
- **Captain Emmajeen Kole:** ☐ Met ☐ Allied ☐ Hostile
- **Baby dragon:** ☐ Returned to mother ☐ Kept ☐ Dead
- **Mother dragon (Hysvearorn):** ☐ Allied ☐ Hostile ☐ Neutral
- **Missing patrol:** ☐ Rescued ☐ Dead ☐ Not found
- **Egg snatchers:** ☐ Killed ☐ Captured ☐ Fled
- **Ice trolls:** ☐ Killed ☐ Negotiated ☐ Avoided
- **Key NPCs met:** Captain Kole, dragon wyrmling
- **Payment received:** _____ gp

**Notes:**
_____________________________________________________________
_____________________________________________________________

---

## Guild Relationships

### Marshal Brenna Thorne
- **Reputation:** ☐ Trusted ☐ Neutral ☐ Suspicious ☐ Hostile
- **Last interaction:** _________________
- **Secrets revealed?** ☐ Greywinter Hunts ☐ Sealed letter about disturbances

### Steward Mara Fenwick
- **Reputation:** ☐ Friendly ☐ Neutral ☐ Wary
- **Last interaction:** _________________
- **Secrets revealed?** ☐ Criminal past ☐ Uttolot bounty

### Lorewarden Elric Vael
- **Reputation:** ☐ Trusted ☐ Neutral ☐ Suspicious
- **Last interaction:** _________________
- **Secrets revealed?** ☐ Prophetic dreams ☐ Arcane engine theory

---

## Aeorian Echo: Clue Tracker

### Discovered Clues:

☐ **Wolves of Welton:** Wolves awakened by sorcerer Alexi Merriksonn's death (magical feedback)

☐ **Frozen Sick:** Blue-vein plague caused by Aeorian relic (blue vial from Salsvault)

☐ **Frozen Sick:** Salsvault ruins are active and leaking arcane energy

☐ **Frozen Sick:** Perpetuation Engine still running after thousands of years

☐ **Temple:** Dragon cult drawn to area by magical disturbances

☐ **Elric's Theory:** All disturbances trace to "ancient arcane engine buried beneath Northreach"

☐ **Brenna's Letter:** Uthodurn contact warns of "arcane disturbances" spreading

☐ **Peril in Pinebrook:** [Ice trolls becoming more active? Dragon drawn to area?]

### Party Theories:

_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

## NPC Roster & Status

| NPC Name | Location | Status | Party Relationship |
|----------|----------|--------|-------------------|
| Marshal Brenna Thorne | Waystone Inn | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Steward Mara Fenwick | Waystone Inn | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Lorewarden Elric Vael | Waystone Inn | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Corel (Shepherd) | Welton | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Father Merriksonn | Welton | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Bolt (Awakened Wolf) | Western Woods | ? | ☐ Ally ☐ Neutral ☐ Enemy |
| Flame (Awakened Wolf) | Western Woods | ? | ☐ Ally ☐ Neutral ☐ Enemy |
| Elro Aldataur | Palebank | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Tulgi (Healer) | Palebank | ? | ☐ Ally ☐ Neutral ☐ Enemy |
| Captain Emmajeen Kole | Pinebrook | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Finethir Shinebright | Wandering | ? | ☐ Ally ☐ Neutral ☐ Enemy |
| Joel Andersmith | Near Temple | Alive | ☐ Ally ☐ Neutral ☐ Enemy |
| Venomfang (Dragon) | Temple | ? | ☐ Ally ☐ Neutral ☐ Enemy |

**Other NPCs met:**
_____________________________________________________________
_____________________________________________________________

---

## Promises & Unfinished Business

### Party Said They Would:

☐ _____________________________________________________________

☐ _____________________________________________________________

☐ _____________________________________________________________

### Hooks for Future Sessions:

☐ _____________________________________________________________

☐ _____________________________________________________________

☐ _____________________________________________________________

---

## Treasure & Magic Items

| Item | Found Where | Attuned By | Notes |
|------|-------------|------------|-------|
| | | | |
| | | | |
| | | | |

**Party Gold:** _____ gp  
**Stored at Waystone:** _____ gp

---

## Session Log

### Session 1: _____________
**Date:** _____________  
**Adventure:** Charter Signing → Wolves of Welton  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

### Session 2: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

### Session 3: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

### Session 4: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

### Session 5: _____________
**Date:** _____________  
**Adventure:** _____________  
**Key Events:**
- 
- 
- 

**MVP Moment:** _____________________________________________

---

## Campaign Notes

### Things That Worked Well:
_____________________________________________________________
_____________________________________________________________

### Things to Improve:
_____________________________________________________________
_____________________________________________________________

### Player Feedback:
_____________________________________________________________
_____________________________________________________________

### Ideas for Future Adventures:
_____________________________________________________________
_____________________________________________________________

\page
<!-- FILE_END: ../Season 1/DM_Resources/Campaign_Tracker_BLANK.md -->

<!-- FILE_START: ../Season 1/DM_Resources/3D_Printing_Shopping_List.md -->
# Northwatch Wardens Season 1
## 3D Printing Shopping List for Tabletop Miniatures

This guide covers everything needed to run the **Northwatch Wardens: Season One** campaign using physical miniatures, terrain, and accessories. Organized by priority level for budget-conscious printing.

## 🧪 Resin vs 🧱 FDM (Quick Rule)

- **Resin**: character + creature miniatures (PCs, wolves, kobolds, bandits/cultists, undead, etc.)
- **FDM**: terrain + buildings + scatter (inns, walls, trees, dungeon tiles, furniture)
- **FDM (Large Monsters)**: big centerpiece monsters (e.g., **Young Green Dragon / Venomfang**) for durability and scale

---

## 🎯 ABSOLUTE REQUIRED

### Player Character Miniatures (Resin)
**Quantity: 4-6 figures**
- [x] Generic adventurer miniatures (fighter, wizard, rogue, cleric archetypes)
- [x] Alternatively: Use tokens or coins if players bring their own minis
- [x] **Print Priority:** HIGH

### Core Enemy Miniatures (Resin)

#### Wolves (CRITICAL - appears in 3 adventures)
- [x] **8x Regular Wolves** (CR 0.25) - max needed in single encounter
- [x] **4x Armored Wolves** (CR 0.5) - Wolves of Welton
- [x] **3x Intelligent Wolves** (CR 0.25) - Wild Sheep Chase
- [x] **1x Awakened Wolf** (CR 0) - Wolves of Welton
- [x] **1x Awakened Wolf Alpha** (CR 2) - Wolves of Welton boss
- [x] **1x Corrupted Wolf** (CR -1) - Frozen Sick (can proxy with regular wolf)
- [x] **2x Winter Wolves** (CR 3) - Frozen Sick
- [x] **Print Priority:** CRITICAL (20 max at once, but you can print 12-15 regular wolves and reuse)

#### Kobolds (Temple of the Dragonknights)
- [x] **6x Green-Scaled Kobolds** (CR 0.125) - max needed in single encounter
- [x] **1x Winged Kobold** (CR 0.25)
- [x] **1x Kobold Cultist Variant** (CR 0.5)
- [x] **Print Priority:** HIGH (8 max at once, spread across multiple encounters)

#### Human Enemies
- [x] **5x Elf Bandits** (CR 0.125) - Frozen Sick (all in one encounter)
- [x] **5x Dragon Cultists** (CR 0.5) - Temple of the Dragonknights (all in one encounter)
- [x] **2x Cult Fanatics** (CR 2) - Temple of the Dragonknights
- [x] **2x Bandits** (CR -1) - Frozen Sick (can proxy with elf bandits)
- [x] **1x Infected Priestess** (CR 2) - Frozen Sick
- [x] **1x Cultist of Tiamat** (CR 0.125) - Frozen Sick
- [x] **Print Priority:** HIGH (15 max at once, but 10 if you reuse cultist models)

### Boss Monsters (FDM for large centerpiece, Resin if you prefer)

#### Young Green Dragon (Venomfang)
- [x] **1x Young Green Dragon** (CR 8)
- [x] THE climactic capstone encounter for Temple of the Dragonknights
- [x] Large-sized creature (10ft x 10ft base)
- [x] **Print Priority:** CRITICAL

#### Transmutation Wizard (Noke)
- [ ] **1x Evil Wizard** (CR 6) - Wild Sheep Chase boss
- [ ] **Print Priority:** HIGH

### Essential Terrain (FDM)

#### Waystone Inn (Guild Headquarters)
- [x] Central location for campaign
- [x] **Recommended:** Modular inn building with:
  - [x] Common room with hearth
  - [x] Bar/counter
  - [x] 4-6 tables with chairs
  - [x] Stairs to second floor (optional)
- [x] **Alternative:** Use cardstock tiles or foam core
- [x] **Print Priority:** HIGH

#### Forest Terrain (Multiple Adventures)
- [ ] **8-12x Trees** (various sizes)
- [ ] **4-6x Forest scatter** (logs, stumps, rocks, bushes)
- [ ] Used in: Wolves of Welton, Wild Sheep Chase, Peril in Pinebrook
- [ ] **Print Priority:** HIGH

#### Village Buildings (Welton & Palebank)
- [ ] **2-3x Small cottages/cabins**
- [x] **1x Inn building** (Shepherd's Crook Inn)
- [ ] **Print Priority:** MEDIUM-HIGH

---

## ⭐ NICE TO HAVE

### Additional Enemy Miniatures (Resin)

#### Constructs & Monsters
- [ ] **5x Ice Constructs** (CR 0.25) - Peril in Pinebrook
- [ ] **1x Aeorian Security Construct** (CR 2) - Frozen Sick
- [ ] **3x Amphibious Monstrosities** (CR 1) - Peril in Pinebrook (use owlbear/bulette proxies)
- [ ] **Print Priority:** MEDIUM

#### Undead
- [x] **4x Zombies** (CR 0.25) - Temple of the Dragonknights
- [ ] **1x Shadow** (CR 0.5) - Temple of the Dragonknights
- [ ] **Print Priority:** MEDIUM

#### Wild Sheep Chase Creatures
- [ ] **3x Apes with Greatswords** (CR 0.5) - polymorphed furniture
- [ ] **2x Intelligent Brown Bears** (CR 1)
- [ ] **1x Half-Orc Bruiser** (CR 2)
- [ ] **1x Polymorphed Furniture Dragon** (CR 4) - bed wyrmling
- [ ] **Print Priority:** MEDIUM (can be skipped if not running Wild Sheep Chase)

#### Aquatic
- [ ] **4x Quippers** (CR 0) - Temple of the Dragonknights
- [ ] **Print Priority:** LOW (small encounter, can use tokens)

#### Cave Creatures
- [ ] **1x Piercer** (CR 0.5) - Temple of the Dragonknights
- [ ] **Print Priority:** LOW

### NPC Miniatures (Resin)

#### Guild Leadership
- [x] **Marshal Brenna Thorne** (Female Human Fighter)
- [x] **Steward Mara Fenwick** (Female Human Rogue/Merchant)
- [x] **Lorewarden Elric Vael** (Male Elf Wizard)
- [ ] **Print Priority:** MEDIUM

#### Welton NPCs
- [x] **Westly** (Male Shepherd with crook)
- [x] **Leanor Slatebeard** (Female Dwarf Tracker)
- [x] **Tillus Merrion** (Male Human Council Leader)
- [x] **Print Priority:** LOW (can use generic townsfolk)

#### Palebank NPCs
- [x] **Urgon Wenth** (Male Dwarf Blacksmith - appears as corpse)
- [ ] **Tulgi** (Female Healer)
- [x] **Elro Aldataur** (Male Half-Elf Scholar)
- [ ] **Print Priority:** LOW

### Enhanced Terrain (FDM)

#### Temple of the Dragonknights
- [ ] **1x Ruined temple entrance**
- [ ] **Cave/cavern tiles or modular pieces**
- [ ] **Underground chamber tiles**
- [ ] **Poison pool terrain piece**
- [ ] **Print Priority:** MEDIUM

#### Frozen Sick Locations
- [ ] **1x Frozen tundra village** (Palebank)
- [ ] **1x Cave entrance** (Croaker Cave)
- [ ] **1x Aeorian ruin structure** (Salsvault)
- [ ] **Ice/snow scatter terrain**
- [ ] **Print Priority:** MEDIUM

#### Welton Specific
- [ ] **Westly's Farm** - simple farmstead with fence
- [ ] **Shepherd's Crook Inn** - interior tavern details
- [ ] **Town square** with gallows/meeting area
- [ ] **Print Priority:** LOW-MEDIUM

#### Pinebrook Village
- [ ] **Small trading post buildings**
- [ ] **Crossroads terrain piece**
- [ ] **Print Priority:** LOW

### Furniture & Details (FDM)

#### Interior Scatter
- [x] **8-12x Tables** (various sizes)
- [x] **16-24x Chairs/Stools**
- [ ] **4-6x Beds**
- [x] **2-3x Bookshelves**
- [x] **2-3x Chests/Crates**
- [x] **1x Bar counter**
- [x] **Fireplace/hearth**
- [ ] **Print Priority:** MEDIUM

#### Outdoor Scatter
- [x] **Barrels, crates, sacks** (12-16 pieces)
- [x] **Wells, wagons, fences** (4-6 pieces)
- [x] **Campfire/fire pit**
- [ ] **Print Priority:** LOW-MEDIUM

### Condition/Status Markers
- [ ] **8-10x Prone markers**
- [ ] **6-8x Concentrating markers**
- [ ] **6-8x Poisoned/Diseased markers**
- [ ] **4-6x Grappled markers**
- [ ] **Print Priority:** MEDIUM

---

## 🎨 COMPLETELY OPTIONAL (Enhancement)

### Specialty Miniatures (Resin)

#### Wild Sheep Chase Special
- [ ] **1x Finethir Shinebright as Sheep** - polymorphed wizard
- [ ] **1x Giraffe** (mentioned in spell chaos)
- [ ] **1x Bed Mimic** (furniture dragon alternate form)
- [ ] **Print Priority:** OPTIONAL (fun but unnecessary)

#### Ambient NPCs
- [x] **6-8x Commoners/Townsfolk** (villagers, merchants)
- [x] **4-6x Guards** (village militia)
- [x] **2-3x Farmers** (Welton area)
- [x] **Print Priority:** OPTIONAL

### Deluxe Terrain (FDM)

#### Waystone Inn Expansion
- **Second floor with bedrooms**
- [ ] **Exterior courtyard with stable**
- [ ] **Guild notice board**
- [ ] **Training yard**
- [ ] **Print Priority:** OPTIONAL

#### Temple Complex Full Build
- [ ] **Multi-level dungeon tiles**
- [ ] **Trapped corridor sections**
- [ ] **Dragon's lair chamber** (large open space)
- [ ] **Underground river/stream**
- [ ] **Print Priority:** OPTIONAL

#### Frozen Wasteland Set
- [ ] **Glacier terrain pieces**
- [ ] **Ice pillars/formations**
- [ ] **Frozen lake sections**
- [ ] **Snow-covered pine trees**
- [ ] **Aeorian technology pillars**
- [ ] **Print Priority:** OPTIONAL

#### Noke's Tower (Wild Sheep Chase)
- [x] **Multi-story wizard tower**
- [ ] **Laboratory interior**
- [ ] **Magical workshop details**
- [ ] **Print Priority:** OPTIONAL

### Magical Effects
- [ ] **Spell effect markers** (fireball, lightning, etc.)
- [ ] **Area effect templates** (20ft radius, 30ft cone, etc.)
- [ ] **Magical energy swirls/auras**
- [ ] **Print Priority:** OPTIONAL

### Vehicles & Mounts
- [ ] **2-3x Horses** (for travel scenes)
- [x] **1x Cart/Wagon**
- [ ] **1x Sled** (Eiselcross travel)
- [ ] **Print Priority:** OPTIONAL

### Environmental Hazards
- [ ] **Pit trap pieces**
- [ ] **Spike trap sections**
- [ ] **Tripwire markers**
- [ ] **Magical rune circles**
- [ ] **Print Priority:** OPTIONAL

---

## 📊 PRINTING SUMMARY BY ADVENTURE

### Opening Skirmish (Adventure 2012)
**Required:**
- [x] 2x Wolves
- [x] Waystone Inn interior
- [x] 4-6 PC miniatures

### Morning After (Adventure 2013)
**Required:**
- [x] Guild NPCs (3 figures)
- [x] Waystone Inn common room
- [x] Tables and chairs

### Wolves of Welton (Adventure 2016) - LONGEST ADVENTURE
**Required:**
- [x] 8x Regular wolves (max in single encounter: "Welcome to Welton Wolfpack")
- [x] 4x Armored wolves (all appear in "Wolf Den Battle")
- [x] 1x Awakened wolf
- [x] 1x Alpha wolf (appears with 6 regular + 4 armored in "Wolf Den Battle")
- [ ] Welton village buildings (3-4 structures)
- [ ] Westly's farm
- [ ] Forest terrain
- [x] Shepherd's Crook Inn interior
- [x] **Note:** Largest single encounter needs 11 wolves total (6 regular + 4 armored + 1 alpha)

**Nice to Have:**
- [x] Welton NPC figures (Westly, Leanor, Tillus)
- [x] Sheep miniatures (for farm atmosphere)

### Frozen Sick (Adventure 2017)
**Required:**
- [x] 2x Bandits
- [x] 5x Elf bandits
- [x] 1x Corrupted wolf
- [x] 2x Winter wolves
- [ ] 1x Aeorian construct
- [x] 1x Infected priestess
- [x] 1x Cultist
- [x] Palebank village buildings
- [ ] Cave entrance (Croaker Cave)
- [ ] Salsvault ruin pieces
- [ ] Snow/ice terrain

**Nice to Have:**
- [x] Palebank NPCs (Urgon, Tulgi, Elro)
- [ ] Sled for travel
- [ ] Frozen wasteland terrain

### Temple of the Dragonknights (Adventure 2018) - BOSS ADVENTURE
**Required:**
- [x] 1x Young Green Dragon (CRITICAL)
- [x] 6x Green kobolds (max at once; there are more across the full adventure)
- [x] 1x Winged kobold
- [x] 1x Kobold cultist
- [x] 5x Dragon cultists
- [x] 2x Cult fanatics
- [x] 4x Zombies
- [ ] 1x Shadow
- [ ] 4x Quippers
- [ ] 1x Piercer
- [ ] Temple ruin exterior
- [ ] Cave/cavern tiles
- [ ] Underground chamber

**Nice to Have:**
- [ ] Multi-level dungeon tiles
- [ ] Dragon's lair centerpiece
- [ ] Poison pool terrain
- [ ] Temple altar/shrine

### Wild Sheep Chase (Adventure 2019) - COMEDY ONE-SHOT
**Required:**
- [ ] 1x Transmutation wizard (Noke)
- [ ] 1x Polymorphed dragon (bed wyrmling)
- [ ] 3x Intelligent wolves
- [ ] 3x Apes with greatswords
- [ ] 2x Intelligent brown bears
- [ ] 1x Half-orc bruiser
- [ ] Wizard tower (can be simplified)

**Nice to Have:**
- [ ] Finethir as sheep miniature
- [ ] Laboratory interior details
- [ ] Polymorphed furniture pieces
- [ ] Noke's Tower full build

### Peril in Pinebrook (Adventure 2020)
**Required:**
- [ ] 5x Ice constructs
- [ ] 3x Amphibious monstrosities
- [ ] Pinebrook village buildings
- [ ] Forest terrain

**Nice to Have:**
- [ ] Crossroads terrain piece
- [ ] Trading post details

---

## 🛠️ RECOMMENDED PRINT ORDER

### Phase 1: Campaign Essentials (Print First)
1. [x] **4-6 PC miniatures**
2. [x] **8-12x Regular wolves** (most common enemy, reuse across encounters)
3. [x] **Young Green Dragon** (campaign boss)
4. [x] **Waystone Inn** (modular or simplified)
5. [ ] **8-10 trees** (used in multiple adventures)

### Phase 2: Core Enemies (Print Second)
1. [x] **Armored wolves (4x)** + **Wolf alpha (1x)** + **Awakened wolf (1x)**
2. [x] **8x Kobolds** (6 green-scaled + 1 winged + 1 cultist variant)
3. [x] **Human enemies** (10-15 total: 5 elf bandits, 5 dragon cultists, 2 cult fanatics, others)
4. [x] **Winter wolves (2x)**

### Phase 3: Adventure Locations (Print Third)
1. [ ] **Welton village** (3-4 buildings)
2. [ ] **Palebank village** (2-3 buildings)
3. [ ] **Temple entrance/ruins**
4. [ ] **Cave terrain pieces**

### Phase 4: Boss/Special Encounters (Print Fourth)
1. [ ] **Transmutation Wizard** (Noke)
2. [ ] **Polymorphed dragon** (bed wyrmling)
3. [ ] **Wild Sheep Chase creatures** (apes, bears, bruiser)
4. [ ] **Ice constructs (5x)**
5. [ ] **Aeorian construct (1x)**

### Phase 5: NPCs & Details (Print Fifth)
1. [x] **Guild NPCs** (Marshal, Steward, Lorewarden)
2. [ ] **Furniture sets** (tables, chairs, beds)
3. [ ] **Scatter terrain** (barrels, crates, fences)
4. [ ] **Condition markers**

### Phase 6: Enhancement (Print Last)
1. [ ] **Additional NPCs** (townsfolk, guards)
2. [ ] **Deluxe terrain** (multi-story buildings, full dungeons)
3. [ ] **Magical effects**
4. [ ] **Environmental hazards**
5. [ ] **Vehicles and mounts**

---

## 💡 MONEY-SAVING TIPS

### Budget Alternatives
1. **Use Tokens Instead of NPCs:** Print paper tokens for non-combat NPCs rather than full miniatures
2. **Modular Buildings:** Print one modular building system that can represent inn, house, or shop
3. **Double-Duty Minis:** Regular wolves can proxy for intelligent/corrupted wolves with different bases
4. **Reuse Between Encounters:** Print 8-12 regular wolves and reuse them across different adventures (max 8 in one fight)
5. **Foam Core Terrain:** Use printed miniatures but craft buildings from foam core
6. **2D Standees:** Print miniatures as 2D standees instead of full 3D models (saves resin/filament)

### Proxy Recommendations
- **Amphibious Monstrosities:** Use owlbear, ankheg, or bulette miniatures
- **Piercer:** Use stalactite marker or cone-shaped object
- **Quippers:** Use small fish tokens or blue glass beads
- **Ice Constructs:** Use skeleton or zombie minis painted blue/white
- **Aeorian Construct:** Use any construct/golem miniature

### Free STL Resources
- **Thingiverse:** Search for "D&D tavern," "fantasy wolf," "kobold," "green dragon"
- **MyMiniFactory:** D&D section has many free models
- **Printable Scenery:** Free sample packs
- **Heroforge-style generators:** For unique NPCs

---

## 📏 SCALE & BASE SIZES

### Standard D&D Scale
- **28mm scale** (1 inch = 5 feet in-game)
- **1 inch grid** for battle mat

### Base Sizes by Creature
- **Small (Kobolds, Quippers):** 20mm round base
- **Medium (PCs, Humanoids, Wolves):** 25mm round base
- **Large (Young Dragon, Bears, Constructs):** 50mm round or 2x2 inch square
- **Furniture & Terrain:** Scale appropriately (table = ~25mm x 40mm)

---

## 🎲 FINAL MINIMUM SHOPPING LIST

If you can ONLY print the absolute essentials:

1. [x] **4-6 PC miniatures**
2. [x] **20 wolf miniatures maximum** (all variants, or 12-15 regular wolves reused as proxies)
   - 8-12x Regular wolves
   - 4x Armored wolves
   - 3x Intelligent wolves (or reuse regular)
   - 2x Winter wolves
   - 1x Alpha wolf
   - 1x Awakened wolf
3. [x] **1 Young Green Dragon**
4. [x] **8 Kobolds** (6 green-scaled, 1 winged, 1 cultist variant)
5. [x] **10-15 Human enemies** (5 elf bandits, 5 dragon cultists, 2 cult fanatics, others)
6. [ ] **1 Evil Wizard** (Noke)
7. [ ] **Waystone Inn** (simplified single-story)
8. [ ] **8 trees**
9. [x] **3 village buildings** (can reuse for multiple locations)
10. [x] **Basic furniture set** (6 tables, 12 chairs)

**Total Critical Miniature Count: ~65-75 pieces** (or ~50-60 with smart reuse)

---

## 📦 FILE ORGANIZATION TIP

Organize your STL files into folders:

![Diagram: 📦 FILE ORGANIZATION TIP](../../World%20Building/Campaign%20Assets/Diagrams/3d-printing-shopping-list-file-organization-tip-l467-2245ab6f.svg)

<!-- ASCII diagram source (converted to SVG):
/Northwatch_Wardens_STLs/
  /PCs/
  /Wolves/ (all variants)
  /Kobolds/
  /Humanoids/
  /Bosses/ (Dragon, Noke, etc.)
  /Buildings/
    /Waystone_Inn/
    /Welton_Village/
    /Palebank_Village/
  /Terrain/
    /Forest/
    /Cave/
    /Ice/
  /Furniture/
  /Scatter/
-->

---

## 🗂️ Your Existing STL Candidates (From `E:\downloads` + `C:\Users\joshu\OneDrive\3dfiles`)

These are **likely-good matches already on disk** (based on filename/path keywords). Full categorized report is in `3d_candidate_report_v2.txt`.

### Resin Candidates (Miniatures)

**Wolves / Winter Wolves**
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Familiars and Beast Pre-Supported\Core Set\Wolf\Wolf Action\Wolf Action STL.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Familiars and Beast Pre-Supported\Core Set\Wolf\Wolf Casual\Wolf Casual STL.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\BriteMini\older STLs\Animals\Wolf\Wolf.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Beast\Winter Wolf STL.stl`

**Kobolds**
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\BriteMini\older STLs\Kobolds\Kobold_archer\Kobold_archer.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\BriteMini\older STLs\Kobolds\Kobold_spear\Kobold_spear.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Hopless Cavern\Kobold Witch Doctor.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Hopless Cavern\Kobold Wizard.stl`

**Bandits / Cultists (Humanoid enemies)**
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\BriteMini\older STLs\Human soldiers\bandits\bandit_axe.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\BriteMini\older STLs\Human soldiers\bandits\bandit2_archer.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\BriteMini\older STLs\Human soldiers\bandits\bandit2_swordsman.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Miniatures\Kingdoms of Hell Miniatures\CultistA.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Miniatures\Kingdoms of Hell Miniatures\CultistB.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Miniatures\Kingdoms of Hell Miniatures\CultistC.stl`

**Young Green Dragon (Venomfang proxy)**
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\Your Neighbor Knight\May 2022\Green_Dragon by YNK Minis\Green Dragon.stl`

### FDM Candidates (Terrain + Buildings + Big Pieces)

**Tavern / Inn / Buildings**
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Tavern\tavern-floor_01lh.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Tavern\tavern-roof.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Tavern\tavern-floor_no-doors.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\Hayland Dungeons And Monsters 3\dwarverninnbuilding\Dwarven Inn Building\Building.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\Hayland Dungeons And Monsters 3\dwarverninnbuilding\Dwarven Inn Building\Roof.stl`

**Trees / Forest scatter**
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Scatter Terrain - Complete Collection\Stretch Goals\Tree Straight STL.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Scatter Terrain - Complete Collection\Stretch Goals\Tree Leaning STL.stl`
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\MiaKay\PRE-SUPPORTED STLs\Scatter Terrain - Complete Collection\Stretch Goals\Large Bush STL - Supportless.stl`

**Wizard Tower stand-in (Noke's Tower)**
- `C:\Users\joshu\OneDrive\3dfiles\606df4f71f663_fates-end-dice-tower-free-wizard-tower\wizard-dice-v5-4.stl`
- `C:\Users\joshu\OneDrive\3dfiles\606df4f71f663_fates-end-dice-tower-free-wizard-tower\wizard-dice-roof-v5-4.stl`

**Cult scene props (FDM-friendly)**
- `C:\Users\joshu\OneDrive\3dfiles\Games\RPG\Patreon\Hayland Dungeons And Monsters 3\cultistsroom\Cultists Room - Done\Summoning Circle.stl`

---

## ✅ Miniatures We *Didn’t* Find Files For (Local STL Audit)

These were searched by filename keywords across `E:\downloads` and `C:\Users\joshu\OneDrive\3dfiles`.

### Missing (no obvious local STL match)
- **Piercer** (Temple of the Dragonknights)
- **Giraffe** (Wild Sheep Chase spell chaos)

### Proxy-only (local STLs exist, but not the exact sculpt)
- **Armored Wolves / Intelligent Wolves / Awakened Wolf / Awakened Wolf Alpha / Corrupted Wolf** (use your wolf/dire wolf/winter wolf sculpts)
- **Winged Kobold** (likely needs a dedicated winged kobold; otherwise proxy with any small winged creature)
- **Kobold Cultist Variant** (proxy with a kobold caster or small cultist)
- **Elf Bandits** / **Bandits** (proxy with generic bandits/rogues)
- **Dragon Cultists / Cult Fanatics / Cultist of Tiamat** (proxy with generic cultists/acolytes)
- **Infected Priestess** (proxy with priest/priestess)
- **Aeorian Security Construct** (proxy with any golem/construct)
- **Amphibious Monstrosities** (proxy with frog/toad/ankheg/owlbear/bulette)
- **Apes with Greatswords** (if you don’t already have an ape/gorilla mini, you’ll likely want a proxy or a new STL)
- **Polymorphed Furniture Dragon** (proxy with mimic/bed mimic or a wyrmling)
- **Quippers** (proxy with fish/swarm tokens if you don’t want tiny prints)
- **Guild + Village NPCs** (you have strong *role-based* matches like “Female Fighter”, “Human Merchant/Rogue”, “Elf Wizard”, etc.; only “missing” if you want exact named sculpts)

---

Good luck with your printing! May your layers adhere and your supports come off cleanly! 🎲🐺🐉

\page
<!-- FILE_END: ../Season 1/DM_Resources/3D_Printing_Shopping_List.md -->

<!-- FILE_START: ../Season 1/DM_Resources/DM Guild Roster.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: NPC Secrets & Campaign Connections**

This document contains NPC secrets, hidden motivations, and campaign tie-ins. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe NPC information**, see `World Building/Regions/Northreach/People_of_Northreach.md`
}}

**🛡️ THE NORTHWATCH WARDENS — DM ROSTER (Expanded & Secret Version)**

*Internal Guild Notes — For the Eyes of the Lorewarden Only*

Below is the *true* roster, including histories, secrets, and how each NPC ties into the broader campaign arc you’re building.

**⭐ LEADERSHIP**

**Marshal Brenna Thorne — Field Commander**

<img src="https://i.imgur.com/DC56B5k.jpg" width="90" alt="Marshal Brenna Thorne" style="display: block;" />

**Public Face:** A hardened ranger who has spent decades patrolling the Northreach frontier.
**Private Truth:** Brenna once served alongside **Corel of Welton** during the “Greywinter Hunts,” a brutal season when wolves, undead, and worse spilled out of the northern woods. She carries guilt for losing half her squad—including her younger brother—to a creature she never identified.

**Campaign Tie‑ins:**

- Wolves of Welton: Brenna recognizes the wolf behavior as wrong and quietly suspects magical influence. She will push the party to investigate thoroughly, not just kill wolves.
- Frozen Sick: Brenna has seen strange diseases before and will immediately recognize the blue-vein symptoms as unnatural.
- Wild Sheep Chase: Brenna once met Shinebright decades ago; she remembers him as brilliant but arrogant. She will be deeply suspicious of any magical mishap involving him.

**Secret:** Brenna has a sealed letter from an Uthodurn contact warning of “arcane disturbances” across the frontier. This is your campaign‑wide foreshadowing.

**Steward Mara Fenwick — Quartermaster**

<img src="https://i.imgur.com/7zDKfWX.jpg" width="90" alt="Steward Mara Fenwick" style="display: block;" />

**Public Face:** A cheerful, meticulous human woman who runs supplies, finances, and logistics.
**Private Truth:** Mara is a former smuggler from Shadycreek Run who fled after crossing the Uttolot family. She hides her past well, but she knows the criminal networks of the North like the back of her hand.

**Campaign Tie‑ins:**

- Frozen Sick: Mara recognizes the Uttolot name immediately and warns the party that they are dangerous, organized, and everywhere.
- Pinebrook: She has traded with Pinebrook’s merchants before and knows the local gossip.
- Wolves of Welton: She suspects the wolves are being manipulated by someone with resources—possibly a rival smuggling ring.

**Secret:** Mara has a bounty on her head. If the party ever goes to Shadycreek Run, this becomes a ticking time bomb.

**Lorewarden Elric Vael — Arcane Scholar**

<img src="https://i.imgur.com/OOBoXAR.jpg" width="90" alt="Lorewarden Elric Vael" style="display: block;" />

**Public Face:** A soft‑spoken elven mage who catalogues threats, magical anomalies, and frontier lore.
**Private Truth:** Elric is secretly investigating a pattern of magical disturbances stretching from Pinebrook to Welton to Palebank. He believes they are connected to a single source—an ancient arcane engine buried beneath the Northreach.

**Campaign Tie‑ins:**

- Wild Sheep Chase: Elric knows Shinebright’s reputation and will be delighted to study the Wand of True Polymorph if the party brings it back.
- Frozen Sick: He recognizes Aeorian relics instantly and will push the party to secure samples.
- Temple of the Dragonknights: Elric has studied the Dragonknights extensively and believes Venomfang’s presence is not a coincidence.

**Secret:** Elric has prophetic dreams he refuses to discuss. They always involve a tower of ice cracking open.



\page

**🌲 TRAILWARDENS**

*Scouts, hunters, and wilderness specialists.*

**Corel — Senior Shepherd of Welton**

<img src="https://i.imgur.com/UiQtsus.jpg" width="90" alt="Corel" style="display: block;" />

**Public Face:** A gruff but kind halfling who knows every hill, trail, and wolf den in the region.
**Private Truth:** Corel is the *only* survivor of the Greywinter Hunts besides Brenna. He has a deep, instinctive understanding of wolf behavior—and he knows the current attacks are unnatural.

**Campaign Tie‑ins:**

- Wolves of Welton: Corel becomes the emotional anchor of the arc. He will be devastated if the wolves must be killed and relieved if the party negotiates peace.
- Frozen Sick: Corel’s cousin lives in Palebank; he will recommend the party visit her if they need a safe place.
- Pinebrook: Corel has traded wool with Pinebrook’s merchants for years.

**Secret:** Corel once saw a wolf speak in a dream. He has never told anyone.

**Bordel Barleywind — Human Ranger**

<img src="https://i.imgur.com/nujs23r.png" width="90" alt="Bordel Barleywind" style="display: block;" />

**Public Face:** A quiet, competent ranger who prefers the company of animals.
**Private Truth:** Bordel was once part of a mercenary band hired to clear the woods near Welton. They were ambushed by wolves—*the same pack the party will meet*. He fled, ashamed.

**Campaign Tie‑ins:**

- Wolves of Welton: If the party negotiates with Bolt, Bordel will break down, realizing the wolves he fought were intelligent even then.
- Frozen Sick: Bordel knows the northern trails and can guide the party to Croaker Cave.
- Temple of the Dragonknights: He recognizes kobold tracks instantly.

**Secret:** Bordel has a wolf pup he rescued years ago. It will become a companion if the party earns his trust.

**Rowan Fairweather — Half‑Elf Druid**

<img src="https://i.imgur.com/duyvslN.png" width="90" alt="Rowan Fairweather" style="display: block;" />

**Public Face:** Gentle, curious, and deeply attuned to nature.
**Private Truth:** Rowan senses a “disturbance” in the natural balance stretching across the frontier. She believes something ancient is awakening.

**Campaign Tie‑ins:**

- Wolves of Welton: Rowan can sense the wolves’ intelligence and will urge the party to seek peace.
- Frozen Sick: She recognizes the disease as unnatural and will be horrified by its origin.
- Pinebrook: Rowan has visited Pinebrook’s sacred grove and knows the local druids.

**Secret:** Rowan has had visions of a dragon made of ice and shadow.

**Mila Teno — Glassblade Rookie**

<img src="https://i.imgur.com/iltxa3w.png" width="90" alt="Mila Teno" style="display: block;" />

**Public Face:** A bright‑eyed, eager young elf who wants to prove herself.
**Private Truth:** Mila is secretly terrified of wolves after losing a sibling to a pack years ago.

**Campaign Tie‑ins:**

- Wolves of Welton: Mila will beg the party to kill the wolves, not realizing they are intelligent.
- Frozen Sick: Mila knows Verla Pelc and will be devastated by her fate.
- Temple of the Dragonknights: Mila’s brother disappeared near the ruins.

**Secret:** Mila’s brother was taken by Venomfang’s kobolds. He may still be alive.



\page

**🔥 LANTERN GUARD**

*Front‑line fighters and defenders.*

**Takk Oaksplitter — Half‑Orc Barbarian**

<img src="https://i.imgur.com/FyxJWvt.png" width="90" alt="Takk Oaksplitter" style="display: block;" />

**Public Face:** Loud, friendly, and always ready for a fight.
**Private Truth:** Takk’s tribe was wiped out by a corrupted beast—possibly related to the same magic affecting the wolves.

**Campaign Tie‑ins:**

- Wolves of Welton: Takk respects wolves and will hesitate to kill them.
- Frozen Sick: Takk recognizes the symptoms from a tribe member who died years ago.
- Wild Sheep Chase: Takk finds Shinebright hilarious.

**Secret:** Takk’s rage is tied to a dormant magical bloodline.

**Galvena Aballon — Human Paladin**

<img src="https://i.imgur.com/BSNEKgT.png" width="90" alt="Galvena Aballon" style="display: block;" />

**Public Face:** Devout, disciplined, and unwavering.
**Private Truth:** Galvena has sworn a private oath to hunt down Venomfang after the dragon destroyed a shrine she once served.

**Campaign Tie‑ins:**

- Temple of the Dragonknights: Galvena becomes a major emotional anchor for this arc.
- Frozen Sick: She sees the disease as a test of faith.
- Wolves of Welton: She will push for justice, not slaughter.

**Secret:** Galvena’s divine visions are becoming corrupted.

**Ariodh Highwhirl — Human Monk**

<img src="https://i.imgur.com/1fiVcFE.png" width="90" alt="Ariodh Highwhirl" style="display: block;" />

**Public Face:** Calm, focused, and philosophical.
**Private Truth:** Ariodh once trained under a master who vanished investigating Aeorian ruins.

**Campaign Tie‑ins:**

- Frozen Sick: Ariodh recognizes the Aeorian symbols instantly.
- Wild Sheep Chase: He finds Noke’s misuse of magic deeply offensive.
- Wolves of Welton: Ariodh will attempt diplomacy first.

**Secret:** Ariodh’s master is alive—and trapped in Salsvault.

**Guz — Half‑Orc (Reformed)**

<img src="https://i.imgur.com/0K66wmO.png" width="90" alt="Guz" style="display: block;" />

**Public Face:** Gruff, awkward, trying his best.
**Private Truth:** After the events of *Wild Sheep Chase*, Guz seeks redemption and has joined the Wardens.

**Campaign Tie‑ins:**

- Wild Sheep Chase: Guz becomes a recurring ally.
- Wolves of Welton: Guz respects Bolt and Flame’s intelligence.
- Frozen Sick: Guz fears magic deeply and will avoid Aeorian relics.

**Secret:** Guz still hears Noke’s voice in his dreams.

**📚 LOREWATCH**

*Scholars, mages, and magical specialists.*

**Sera Gelanadel — Apprentice Wizard**

<img src="https://i.imgur.com/yxGZKlq.png" width="90" alt="Sera Gelanadel" style="display: block;" />

**Public Face:** Brilliant, curious, and slightly overwhelmed.
**Private Truth:** Sera is investigating a surge of magical anomalies across the frontier.

**Campaign Tie‑ins:**

- Temple of the Dragonknights: Sera becomes a major recurring NPC.
- Frozen Sick: She recognizes Aeorian script and can translate it.
- Wild Sheep Chase: She is fascinated by the Wand of True Polymorph.

**Secret:** Sera’s mentor is connected to Shinebright.

**Aurixean Valignaak — Dragonborn Sorcerer**

<img src="https://i.imgur.com/fUWF9C0.png" width="90" alt="Aurixean Valignaak" style="display: block;" />

**Public Face:** Proud, charismatic, and dramatic.
**Private Truth:** Aurixean’s draconic bloodline resonates painfully whenever Venomfang is near.

**Campaign Tie‑ins:**

- Temple of the Dragonknights: Aurixean senses Venomfang’s presence before anyone else.
- Frozen Sick: His fire magic is especially effective in Salsvault.
- Wolves of Welton: Aurixean respects Bolt’s leadership.

**Secret:** Aurixean’s ancestor once served the Dragonknights.

**Shinebright — High Elf Wizard (Polymorphed)**

\page


<img src="https://i.imgur.com/l0McAF7.png" width="90" alt="Shinebright" style="display: block;" />

**Public Face:** A sheep.
**Private Truth:** A *very annoyed* sheep.

**Campaign Tie‑ins:**
You already know this one — he’s the chaos engine.

**Baleth Cindermoon — Tiefling Warlock**

<img src="https://i.imgur.com/nx7gShD.png" width="90" alt="Baleth Cindermoon" style="display: block;" />

**Public Face:** Charming, mysterious, and theatrical.
**Private Truth:** Baleth’s patron is deeply interested in the magical disturbances across the frontier.

**Campaign Tie‑ins:**

- Frozen Sick: Baleth senses the Aeorian magic as “wrong.”
- Wolves of Welton: Baleth is fascinated by the awakened wolves.
- Temple of the Dragonknights: Baleth’s patron wants something hidden in the ruins.

**Secret:** Baleth’s patron is *not* who they claim to be.

**🏡 HEARTHWARDENS**

*Community anchors and support NPCs.*

**Father Merriksonn — Village Priest**

<img src="https://i.imgur.com/RDbpNzD.jpg" width="90" alt="Father Merriksonn" style="display: block;" />

**Public Face:** Kind, weary, and devoted.
**Private Truth:** His brother Alexi is the missing sorcerer from *Wolves of Welton*.

**Campaign Tie‑ins:**

- Wolves of Welton: His grief becomes a major emotional beat.
- Frozen Sick: He will beg the party to save the infected.
- Wild Sheep Chase: He distrusts wizards deeply.

**Secret:** Alexi’s spirit lingers near the wolves’ den.

**Willen Featherock — Halfling Shepherd**

<img src="https://i.imgur.com/q0t6X9G.jpg" width="90" alt="Willen Featherock" style="display: block;" />

**Public Face:** Nervous, traumatized, recovering.
**Private Truth:** Willen heard the wolves speak—and he wasn’t hallucinating.

**Campaign Tie‑ins:**

- Wolves of Welton: Willen becomes the emotional heart of the arc.
- Frozen Sick: He knows a trader who once dealt with Verla Pelc.
- Temple of the Dragonknights: Willen’s family once guarded the ruins.

**Secret:** Willen has a latent magical gift awakened by the wolves’ aura.

**Flynt Wymblen — Gnome Bard**

<img src="https://i.imgur.com/gxsZ6Qh.jpg" width="90" alt="Flynt Wymblen" style="display: block;" />

**Public Face:** Cheerful, musical, and nosy.
**Private Truth:** Flynt is secretly writing an epic ballad about the Wardens.

**Campaign Tie‑ins:**

- Wolves of Welton: Flynt will accompany the party if invited.
- Frozen Sick: Flynt knows a sailor who can get them to Eiselcross.
- Wild Sheep Chase: Flynt loves Shinebright’s story.

**Secret:** Flynt’s songs sometimes predict the future.

**Joel Andersmith — Farmer (Ally)**

<img src="https://i.imgur.com/gqfEDrT.png" width="90" alt="Joel Andersmith" style="display: block;" />

**Public Face:** Grieving father.
**Private Truth:** Joel’s daughter Clementine is destined to become a powerful mage.

**Campaign Tie‑ins:**

- Temple of the Dragonknights: Clementine’s rescue becomes a major emotional beat.
- Wolves of Welton: Joel will beg the party to save other families.
- Frozen Sick: Joel knows a trader who handled the blue vials.

**Secret:** Clementine’s magic awakened something in the ruins.


**🐺 WILD ALLIES**

**Bolt — Alpha Wolf (Awakened)**

<img src="https://i.imgur.com/4oD3lBF.jpg" width="90" alt="Bolt" style="display: block;" />

**Public Face:** Calm, intelligent, diplomatic.
**Private Truth:** Bolt is terrified of what awakened him.

**Flame — Alpha Wolf (Awakened)**

<img src="https://i.imgur.com/J4lh2Bs.jpg" width="90" alt="Flame" style="display: block;" />

\page


**Public Face:** Fierce, proud, aggressive.
**Private Truth:** Flame believes the wolves are destined to rule the frontier.

**Campaign Tie‑ins:**
The awakened wolves become a recurring faction — sometimes allies, sometimes rivals, always interesting.

**🏘️ AFFILIATED SETTLEMENTS**

- Welton — Wolves of Welton arc
- Palebank Village — Frozen Sick arc
- Pinebrook — Peril in Pinebrook arc

These settlements form the “Northreach Triangle,” the region the Wardens protect.

\page
<!-- FILE_END: ../Season 1/DM_Resources/DM Guild Roster.md -->

<!-- FILE_START: ../Season 1/DM_Resources/NORTHWATCH WARDENS - Campaign Arc.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: Campaign Arc & Mystery Structure**

This document contains the complete campaign structure and mystery reveals. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `Season 1/README.md`
}}

**NORTHWATCH WARDENS: High‑Level Campaign Arc**

***A modular frontier campaign about awakening magic, corrupted legacies, and the consequences of power unleashed.***

**📚 DM Resources**

For deeper secrets and campaign mechanics, see:
- **[World Building/DMEyesOnly/The_Aeorian_Echo.md](../../World%20Building/DMEyesOnly/The_Aeorian_Echo.md)** - Complete Echo documentation
- **[World Building/DMEyesOnly/Northreach.md](../../World%20Building/DMEyesOnly/Northreach.md)** - Adventure integration details
- **[World Building/DMEyesOnly/Places_Secrets.md](../../World%20Building/DMEyesOnly/Places_Secrets.md)** - Location-specific secrets

---

**🌑 THE CORE THROUGHLINE**

Across the frontier, **ancient magic is waking up** — not in one place, but everywhere.
Each adventure the players take is a *symptom* of a deeper, spreading disturbance:

**The Aeorian Echo**

A ripple of unstable arcane energy — originating from the buried ruins of Aeor (Frozen Sick) — has begun to:

- mutate beasts (Wolves of Welton)
- destabilize magical artifacts (Wild Sheep Chase)
- empower cults and dragons (Temple of the Dragonknights)
- stir old spirits and forgotten guardians (Peril in Pinebrook)

The Wardens don’t know this yet.
But every contract they take is another puzzle piece.

**🧩 HOW EACH MODULE FITS INTO THE ARC**

Below is the “why it matters” for each adventure, independent of order.


**🐺 1. Wolves of Welton — The First Contract**

**Theme:** Intelligence awakening where it shouldn’t.
**Arc Connection:** The wolves’ sudden sentience is the *first visible sign* of the Aeorian Echo.

- Alexi Merriksonn (missing sorcerer) was exposed to the Echo.
- His accidental magical discharge awakened the wolves.
- The wolves’ dreams and visions hint at a “bright flash,” “shifting stars,” or “the world humming.”

**Outcome:**
The Wardens learn that something is *changing the frontier itself*.

This is the campaign’s inciting incident.


**❄️ 2. Frozen Sick — The First Major Threat**

**Theme:** Ancient magic resurfacing with deadly consequences.
**Arc Connection:** This is the **source** of the Echo.

- The blue vials contain Aeorian spores.
- The disease is a byproduct of the same arcane instability that awakened the wolves.
- Salsvault’s malfunctioning systems are still pulsing magical energy into the region.

**Outcome:**
The Wardens discover:

- Aeor is real.
- Its ruins are active.
- Its magic is leaking into the world.

This is the campaign’s *first revelation*.


**🐉 3. Temple of the Dragonknights — Corruption Takes Root**

**Theme:** Ambition, corruption, and the misuse of awakening magic.
**Arc Connection:** Venomfang and the cultists are drawn to the same arcane disturbances.

- The cult’s rituals are empowered by the Echo.
- Venomfang senses the rising magic and wants to exploit it.
- The kidnapped girl is part of a ritual meant to create a dracolich soul vessel — something only possible because magic is destabilizing.

**Outcome:**
The Wardens learn that:

- Intelligent predators (wolves) aren’t the only ones changing.
- Dragons and cults are mobilizing.
- Someone (or something) is guiding these awakenings.

This is the campaign’s *escalation*.


**🐑 4. The Wild Sheep Chase — Magical Chaos Spreads**

**Theme:** Magic behaving unpredictably.
**Arc Connection:** The Wand of True Polymorph is unstable because of the Echo.

- Noke’s modifications were possible only because ambient magic is fluctuating.
- Shinebright’s transformation is another example of “magic gone wrong.”
- The Bed Dragon Wyrmling is a direct parallel to the awakened wolves.

**Outcome:**
The Wardens see that:

- Magic is becoming unreliable.
- Artifacts are malfunctioning.
- Spellcasters are losing control.

This is the campaign’s *comic but meaningful warning*.



\page

**🌲 5. Peril in Pinebrook — The Frontier Cracks**

**Theme:** Small communities caught in the crossfire of rising magic.
**Arc Connection:** Pinebrook’s troubles are minor compared to the others, but they show the *human cost* of the Echo.

- Strange creatures, odd magical effects, and unusual behavior in the woods all tie back to the same arcane disturbance.
- The young players/NPCs introduced here can become future Wardens or allies.

**Outcome:**
The Wardens realize:

- Every settlement is vulnerable.
- The frontier is changing faster than anyone can respond.
- They need to grow — more members, more alliances, more readiness.

This is the campaign’s *worldbuilding anchor*.

**🧵 HOW THE PIECES INTERLOCK (No Matter the Order)**

**The Wolves hint at the disturbance.**

↓

**Frozen Sick reveals the source.**

↓

**Temple of the Dragonknights shows factions exploiting it.**

↓

**Wild Sheep Chase shows magic destabilizing everywhere.**

↓

**Peril in Pinebrook shows the frontier’s growing fragility.**

The order doesn’t matter because each adventure:

- stands alone as a contract
- reveals a different facet of the same phenomenon
- builds toward the same overarching mystery

**🏛️ THE NORTHWATCH WARDENS AS THE CAMPAIGN FRAME**

The guild structure is the glue that makes the modular format work.

**Every session begins with:**

- A contract posted on the board
- A briefing from Brenna, Mara, or Elric
- Optional rumors or cross-adventure clues

**Every session ends with:**

- A report to the guild
- A new clue about the Aeorian Echo
- A sense of growing responsibility

This keeps the campaign cohesive even when the cast changes week to week.

**🔮 THE LONG GAME: Where This Is All Going**

As the Wardens complete contracts, they uncover:

**1. The Aeorian Echo is growing stronger.**

More mutations. More magical anomalies. More cult activity.

**2. Something in Salsvault is still active.**

A malfunctioning arcane engine?
A surviving Aeorian intelligence?
A containment breach?

**3. Factions are mobilizing.**

- Venomfang wants power.
- The Uttolots want artifacts.
- Noke’s experiments weren’t isolated.
- The wolves may become allies or enemies.

**4. The Wardens must choose their role.**

- Protectors?
- Investigators?
- Diplomats?
- Monster hunters?
- Or something more?

**5. The finale (when you want it):**

A multi‑session arc returning to Eiselcross to confront the true source of the Echo — with allies and enemies shaped by every contract the players chose.

**🎯 In One Sentence**

**The campaign is about a frontier guild discovering that ancient Aeorian magic is awakening across the land, mutating creatures, empowering villains, destabilizing spells, and forcing the Wardens to rise as the only force capable of holding the frontier together.**

\page
<!-- FILE_END: ../Season 1/DM_Resources/NORTHWATCH WARDENS - Campaign Arc.md -->

# Adventures

## Opening Adventures

<!-- FILE_START: ../Season 1/Adventures/Opening/Open Skirmish.md -->
**🐺 OPENING SCENE: “Wolves at the Waystone Inn”**

**Setting:** Dusk. Snow‑flecked wind. Lanterns flickering outside the Waystone Inn.
**Goal:** Introduce the characters naturally through a shared threat.

**🎬 1. Cold Open (Read Aloud)**

Use this as your opening beat:

**The wind bites as the three of you—strangers to one another—trudge up the muddy road toward the Waystone Inn. Lantern‑light spills across the snow, promising warmth and food.**

**Then you hear it: a low, rumbling growl.**

**Two wolves slink out from behind the woodpile, ribs showing, eyes wild. Their hackles rise as they fix on you… and charge.**

This immediately:

- unites the characters
- creates urgency
- avoids awkward “you meet in a tavern” chatter

**⚔️ 2. Encounter Setup**

**Wolves (2)**

Use the stat block from your open tab (CR 1/4 wolves) — they’re perfect for a level‑1 opener.

**Terrain Features**

- Woodpile: Half-cover
- Horse trough: Difficult terrain
- Lantern post: Can be knocked over (DEX 12) to create dim light or darkness
- Inn door: Slightly ajar; NPCs may peek out but won’t intervene

**Starting Positions**

- Wolves begin 20 ft from the closest PC
- PCs are 10–15 ft apart from each other
- Wolves target the closest moving creature

This spacing forces the characters to notice each other and converge.

**🧠 3. How to Introduce the Characters Naturally**

**Round 1: Recognition**

As initiative is rolled, give each PC a 1‑sentence visual cue of the others:

- “You notice a cloaked figure to your left reaching for a weapon.”
- “A heavily armored stranger steps between you and one of the wolves.”
- “Someone behind you mutters a spell under their breath.”

This creates instant awareness without forcing dialogue.

**Round 2: Forced Cooperation**


Have one wolf use **Pack Tactics** to flank a PC. This encourages another PC to intervene.

Example narration:

**“The wolf circles behind you, teeth bared. You realize the only person close enough to help is the stranger on your right.”**

This is the moment the party forms.

**🐺 4. Wolf Behavior (Simple AI)**

These wolves are:

- hungry
- desperate
- not suicidal

**Behavior Script**

- Attack the nearest target
- If reduced to 4 HP or less, the wolf attempts to flee
- If both wolves drop below half HP, they retreat together

This gives the players a sense of agency and realism.

**🎭 5. Aftermath: The First Real Interaction**

Once the wolves flee or fall, give a beat of silence:

**The wind settles. The wolves lie still in the snow.**

**For the first time, you all really look at one another.**

Then offer **three natural prompts** for the players to introduce themselves:

- The innkeeper bursts out: “By the gods! Are you all right? Come inside, quickly!” → Forces the group to enter together.
- A shared clue: One wolf has a strange frost-rimmed patch of fur — a hint toward Frozen Sick. → Gives them something to discuss.
- A practical need: Someone is injured and needs help. → Encourages cooperation.

Pick whichever fits your tone.

**Optional: Quick Hooks to Bond the Party**

\page


Use one or more:

- Innkeeper recognizes one PC and assumes the others are their companions.
- A dropped item (a letter, a map, a charm) falls from a wolf’s mouth.
- A witness says, “You three handled yourselves well. Are you mercenaries?”
- A shared room discount if they bunk together.

All of these create cohesion without forcing roleplay.

\page
<!-- FILE_END: ../Season 1/Adventures/Opening/Open Skirmish.md -->

<!-- FILE_START: ../Season 1/Adventures/Opening/THE MORNING AFTER.md -->
**THE MORNING AFTER: “A Warden’s First Duty”**

***A narrative tie‑in to launch Wolves of Welton as Contract #1***

**1. Morning at the Waystone Inn — Read-Aloud**

As dawn breaks over Northreach, the Waystone Inn is already alive with the smell of hearthfire and fresh bread. Snowmelt drips from the eaves. The common room is quieter than last night—more purposeful, more expectant.

Marshal Brenna Thorne stands near the long table where the guild charter has been laid out, parchment weighted by a carved stone of the Northwatch crest. She nods as each of you approaches.

“Wardens aren’t made by oaths alone,” she says. “But this is where the work begins.”

After signatures are inked and hands are shaken, Brenna gestures toward the **Waystone Contract Board**, where a single parchment has been pinned with a wolf‑tooth charm.

**2. The Contract Board Reveal**

The board is mostly empty—this is a frontier guild just getting on its feet—but one posting stands out:

**🗡️ CONTRACT: “Wolves of Welton”**

**Client:** Welton Village Council
**Reward:** 800 gp + provisions
**Urgency:** High
**Details:**

“A pack of unusually coordinated wolves has been attacking shepherds, stealing livestock, and driving families from their farms.

The council fears the wolves are acting with unnatural intelligence.

Request immediate assistance from capable Wardens.”

Brenna taps the posting with two fingers.

“Welton’s only a half‑day’s ride south. Good people. Hard winter. They wouldn’t ask for help unless they were desperate.”

**3. NPC Dialogue Hooks (Use Any That Fit Your Table)**

**Brenna Thorne (Marshal)**

“Wolves don’t normally open barn doors or outmaneuver hunting parties. Something’s wrong out there. This is exactly the kind of threat the Wardens were founded to handle.”

**Elric Vael (Lorewarden)**

“There are stories of awakened beasts in the frontier—spirits, curses, old magic. If these wolves are thinking like people… be cautious.”


**Mara Fenwick (Steward)**

“I’ve packed you travel rations and a healer’s kit. Bring back receipts for anything you need to purchase in Welton; the guild will reimburse within reason.”

**Father Merriksonn (if present from Wolves of Welton)**

He overhears the posting and stiffens.
“My brother Alexi… he vanished near Welton. If these wolves are tied to that… please, find out what happened.”

(This is a *perfect* foreshadowing seed for the awakened wolves and Alexi’s fate.)

**4. The Journey Hook — Why *Your* Party Is the One They Send**

Brenna explains:

“You handled yourselves well last night. Quick thinking, steady hands. That’s what the frontier needs.
Take this contract. Show Northreach what the Wardens can do.”

She hands them a sealed letter for the Welton Council—official recognition that the Northwatch Wardens are now operating in the region.

**5. Optional Flavor Beats to Tie Your Whole Campaign Together**

**If you want Frozen Sick to connect later:**

A trader at the inn mutters:

“Strange sickness up north in Palebank. Blue veins, slow death. Folks say it came from something dug up in the ice. Wolves acting strange in Welton… sickness in Palebank… feels like the frontier’s waking up.”

This plants the idea that **the frontier is destabilizing**, and the Wardens are stepping into a larger pattern.

**If you want Pinebrook to remain relevant:**

One of the Pinebrook premade NPCs (Flynt, Rowan, etc.) is at the inn and says:

“Welton’s shepherds trade through Pinebrook sometimes. Haven’t seen them in weeks. If the wolves are blocking the roads, it’ll hurt more than one village.”

This makes the contract feel like it matters to the whole region.

**🎯 Final Tie-In Summary**

- The players sign the charter.
- The guild immediately presents their first official contract.
- The Wolves of Welton posting is urgent, well-paid, and perfectly suited to new Wardens.
- NPCs reinforce the importance and hint at deeper mysteries.
- The party leaves with a sense of purpose and belonging.

This gives them a **clean, heroic launch** into the Wolves of Welton while grounding everything in the Northwatch Wardens’ identity.

\page
<!-- FILE_END: ../Season 1/Adventures/Opening/THE MORNING AFTER.md -->

<!-- FILE_START: ../Season 1/Adventures/Opening/Wolves - Contract.md -->
**Contract: W‑17 — Disturbance Near Welton**

**Issuing Party:**
Welton Village Council, Northreach Frontier

**Classification:**
Field Contract — Threat Suppression
Initiate‑Eligible

**Summary:**
The agricultural village of Welton reports **increasingly aggressive wolf activity** along its grazing hills and outer farms. Livestock losses have escalated beyond the capacity of local shepherds and militia. The council requests **Warden intervention** to secure the area and restore safety to the region.

**Objectives:**

- Travel to Welton
- Assess the situation on-site
- Locate the source of the wolf attacks
- Neutralize the threat to Welton’s people and livestock
- Report findings to the Council and to the Northwatch Wardens

**Reward:**
800 gp, paid upon confirmation of mission completion by the Welton Council

- Standard Warden credit toward Initiate advancement

**Notes for Initiates:**

- Expect rural terrain, livestock enclosures, and forested hills
- Local leadership may provide additional context upon arrival
- This contract is considered a test of readiness for new Wardens
- Maintain professionalism; Welton is a valued frontier settlement

**Signed:**
Marshal Brenna Thorne, Northwatch Wardens
Attested by Steward Mara Fenwick

\page
<!-- FILE_END: ../Season 1/Adventures/Opening/Wolves - Contract.md -->

## Wolves of Welton

<!-- FILE_START: ../Season 1/Adventures/Wolves_Of_Welton/5E_Wolves_Of_Welton.md -->
![A painted cover page showing a lone wolf howling atop a jagged mountain peak against a dramatic, glowing orange‑pink sky. Dark, fluttering birds surround the peak and the scene uses moody purples, blues and warm backlight in a textured, painterly style. The lower half is a parchment‑textured layout with the large serif title "The Wolves of Welton" and the subtitle "A 2nd–3rd Level Adventure for Dungeons & Dragons 5E — Produced by Winghorn Press." Two columns of text beneath the title are labeled "Summary" and "Adventure Hooks," and a small page number (~ 1 ~) sits at the bottom. The page has a torn paper transition between the illustration and the parchment area.](./5E_Wolves_Of_Welton_images/image_001.png)

## Northwatch Wardens Integration (DM)

**Campaign Connection:** This adventure represents the **first visible sign** of the Aeorian Echo—ancient magic awakening across the Northreach frontier. The wolves' sudden sentience is not natural, but a symptom of deeper magical disturbances.

**DM Secret Resources:** For the truth behind this adventure, see:
- **[World Building/DMEyesOnly/Places_Secrets.md](../../../World%20Building/DMEyesOnly/Places_Secrets.md)** - "Welton: Dark Undercurrents" section
- **[World Building/DMEyesOnly/Northreach.md](../../../World%20Building/DMEyesOnly/Northreach.md)** - Adventure integration details
- **[World Building/DMEyesOnly/The_Aeorian_Echo.md](../../../World%20Building/DMEyesOnly/The_Aeorian_Echo.md)** - Campaign arc context

**Key Secrets:**
- The wolves' intelligence awakening is caused by Aeorian facility beneath Westly's Farm
- Alexi Merriksonn was exposed to the Aeorian Echo; his magical discharge awakened the wolves
- This is a **test run** for larger Aeorian operations
- The Old Woods north of Welton contain a partially buried Aeorian research station

**Player Discovery:** Characters should discover strange magical anomalies but not necessarily the full Aeorian connection yet. This is the campaign's **inciting incident**.

---

\page

# DM Notes: Wolves of Welton

## Adventure Overview

**Theme:** Intelligence awakening where it shouldn't — wolves have become sapient through magical corruption (the Aeorian Echo)

**Core Tension:** The wolves aren't evil, just desperate and newly intelligent. Killing them is easy; negotiating with them reveals the deeper mystery.

**Level Range:** 1-3 (excellent starter adventure)

**Expected Duration:** 4-6 hours (single or two-session adventure)

**Key NPCs:**
- **Bolt** (awakened alpha wolf) — reasonable, pragmatic, wants peace
- **Flame** (ambitious wolf) — aggressive, challenges Bolt's leadership
- **Father Merriksonn** — village priest, his brother Alexi disappeared when wolves awakened
- **Tillus Merrion** — halfling council member, distrusts outsiders
- **Leanor Slatebeard** — dwarven innkeeper, provides shelter and gossip

## Central Mystery (Aeorian Echo Connection)

The wolves' intelligence was triggered by **Alexi Merriksonn's death**. The sorcerer was killed by magical feedback when Salsvault (buried Aeorian ruins, 100+ miles north) suddenly activated. His death released a burst of transformative magic that awakened the wolves.

**Clues Players Should Discover:**
1. The wolf attacks started exactly when Alexi disappeared
2. Wolves demonstrate sapient intelligence (planning, speech, morality)
3. Something *magical* caused this; it wasn't natural evolution
4. This is a symptom of a larger phenomenon spreading across Northreach

**What to Reveal:** The wolves' awakening is a *symptom*, not the cause. The true source remains hidden until later adventures (Frozen Sick).

## Common DM Pitfalls

### 1. Making Wolves Too Evil
**Problem:** If wolves come across as malicious or treacherous, players will default to combat and miss the moral complexity.

**Solution:** Emphasize Bolt's desperation — "We were animals. Now we think. We feel. We know we will die. We need food *and* safety. Can you blame us?"

### 2. Railroading the Negotiation
**Problem:** Players may not think to negotiate; forcing it feels artificial.

**Solution:** If combat starts with Bolt, have him **yield immediately** after losing 50% HP. He speaks: "Stop! We can *talk*. I know you understand me. Please." This forces the moral choice.

### 3. Council Vote Feeling Pre-Scripted
**Problem:** Players feel their arguments don't matter; vote seems rigged.

**Solution:** Track player arguments. Give concrete benefits:
- Good Nature/History checks about wolves → +1 swing vote
- Mentioning Alexi's magic → Father Merriksonn passion increases (already YES, but emphasizes to others)
- Proposing practical solutions (wolves move to specific territory) → +1 swing vote
- Intimidation or threats → -1 swing vote

**Remember:** Father Merriksonn and Corel are *guaranteed* YES votes if party negotiates. Players need only **1 more vote** out of 5 remaining council members.

### 4. Underplaying Flame's Threat
**Problem:** If Flame feels like a "boss fight," negotiation path seems like it failed.

**Solution:** Make clear Flame represents a *faction*, not the whole pack. Killing Flame solidifies Bolt's leadership and proves wolves can police themselves — this **strengthens** the negotiation argument.

## Resolution Outcomes

### Path A: Total Extermination
**Result:**
- Village celebrates; 800 gp reward paid immediately
- Father Merriksonn is quietly disappointed (his brother's magic caused this)
- Wolves eliminated; mystery remains unsolved
- **Aeorian Echo clue:** Elric later notes "Whatever awakened them is still out there."

### Path B: Negotiated Peace
**Result:**
- Council votes (4 YES / 3 NO if players argue well)
- Wolves relocate to agreed hunting grounds
- 800 gp reward paid after probationary period
- Father Merriksonn is grateful and becomes ally
- **Aeorian Echo clue:** Bolt says "We did not ask for this. Something *changed* us. We do not know what."

### Path C: Deception (Claim Victory, Wolves Survive)
**Result:**
- Village pays 800 gp believing wolves dead
- Secret alliance with Bolt established
- Long-term: Wolves raid more carefully; village suspicious
- Future complication: Truth may emerge in later sessions
- **Aeorian Echo clue:** Bolt shares his experience of "waking up" — sudden, magical, terrifying

### Path D: Flame's Coup
**Result:**
- If Bolt is killed or discredited, Flame takes over
- Attacks escalate; village suffers
- Party may be called back to finish the job
- **Note:** This is a *failure* outcome; use sparingly

## Tactical Notes

### Combat Encounter Scaling
**For 2 players (Level 1-2):**
- Scene 1 (road): 4 wolves
- Flame's den: Flame + 2 wolves

**For 3-4 players (Level 1-2):**
- Scene 1 (road): 6-8 wolves (as written)
- Flame's den: Flame + 4 wolves

**For 5+ players (Level 2-3):**
- Scene 1 (road): 10 wolves
- Flame's den: Flame + 6 wolves + 1 dire wolf

### Wolves Use Tactics
- **Pack Tactics:** Always try to get advantage via flanking
- **Hit and Run:** Attack, then Disengage if bloodied
- **Protect the Pack:** Wolves defend injured packmates

### Bolt's Den (Non-Combat)
- Bolt will NOT fight unless attacked
- He sends messengers (wolves) to request parley
- Meeting place: neutral ground outside den

## Improvisation Toolkit

### If Players Get Stuck
1. **Father Merriksonn approaches privately:** "I know you may think I'm mad, but... could the wolves be *intelligent*? My brother studied transformation magic before he vanished."
2. **Willen Featherock (traumatized victim) reveals:** He heard wolves *talking* during his capture. (He's considered crazy, but he's telling the truth.)
3. **Leanor Slatebeard (innkeeper) suggests:** "Maybe ask the wolves what *they* want? Stranger things have happened."

### If Players Attack Bolt Immediately
- Bolt yields after losing 50% HP
- Other wolves flee rather than die
- Bolt: "You have proven you can kill us. But can you *listen*? We do not want war."

### If Council Vote Is Tied (3-3)
- **Father Merriksonn makes impassioned speech:** His brother's death may have caused this; villagers owe it to Alexi's memory to try peace
- **Tillus walks out in protest:** Vote passes 3-2 (with Tillus abstaining)
- **Future hook:** Tillus remains hostile; may cause problems later

## Rewards & Aftermath

### Standard Rewards
- 800 gp (split among party)
- Warden reputation boost (+1 in Northreach region)
- Free lodging at Shepherd's Crook (indefinitely)

### Bonus Rewards (Negotiation Path)
- Father Merriksonn's *Blessing of Corellon* (1/day reroll for each PC)
- Bolt's pack as future allies (can call on them once for aid)
- Alexi's spellbook (found in Father Merriksonn's possession) — contains *detect magic*, *identify*, *comprehend languages* (relevant for future mysteries)

### XP Awards (Milestone)
- Completing adventure: Party reaches **Level 2**
- (If using XP tracking: 300 XP per player for completion)

## Aeorian Echo Foreshadowing

**Subtle hints to drop during the adventure:**

1. **Bolt's Description of Awakening:**
   > "One moment I was hunting. The next... I could *think*. Not like before. I understood pack, family, future, *death*. It was like being born and dying at once."

2. **Father Merriksonn's Grief:**
   > "Alexi was studying something he called 'the old magic stirring.' He said the land itself was waking up. He went north to investigate and never returned."

3. **Willen Featherock's Ravings (if players talk to him):**
   > "Blue lights in the darkness... cold that burns... the wolves were *glowing* when they spoke to me... unnatural, I tell you!"

4. **Elric's Follow-Up (when party returns to Waystone Inn):**
   > "Awakened wolves? Fascinating and troubling. This matches reports from Palebank Village — strange magical phenomena spreading across Northreach. Something is very wrong."

\page

# DM Prep Checklist: Wolves of Welton

## One Week Before Session

- [ ] Read entire adventure once through (30-45 minutes)
- [ ] Review DM Notes section (above) for key themes and pitfalls
- [ ] Decide on Bolt's personality voice — calm, pragmatic, slightly formal (newly learned speech)
- [ ] Decide on Flame's personality voice — aggressive, impulsive, contemptuous of "weak" pack
- [ ] Note which council members are swing votes (Tillus leans NO, Corel leans YES)
- [ ] Mark pages/sections for quick reference during play

## Day Before Session

- [ ] Print or bookmark wolf stat block (MM p241 OR Party Roster)
- [ ] Print or bookmark NPC summaries (Father Merriksonn, Tillus, Leanor)
- [ ] Review council voting mechanics (3 votes needed, Father Merriksonn + Corel = 2 guaranteed)
- [ ] Prepare Bolt's opening speech (3-4 sentences establishing sapience and desperation)
- [ ] Prepare random wolf names if players ask (e.g., Ash, Scar, Grey-Ear, Swift)
- [ ] Review Scene 1 (road encounter) combat setup — 150 ft starting distance
- [ ] Decide if you'll use battle map or theater of mind

## Props & Materials (Optional but Helpful)

- [ ] Index card with Bolt's key dialogue quotes
- [ ] Index card with council member voting tendencies
- [ ] Map of Welton (if available) OR sketch simple village layout
- [ ] Notecard for tracking player arguments during council scene (tally good points)
- [ ] Wolf miniatures or tokens (if using grid combat)
- [ ] Dice for wolves (to speed up combat)

## Session Zero / Player Prep

- [ ] Confirm party knows they're responding to Contract W-17 (posted at Waystone Inn)
- [ ] Brief players on Northreach setting: rural frontier, low-magic, isolated villages
- [ ] Set expectations: This adventure rewards creative problem-solving and negotiation
- [ ] Clarify: Combat is *one* solution, not the *only* solution
- [ ] Ask players: "How does your character feel about animals? Monsters? Talking creatures?"

## Quick Reference During Play

### Key DC Checks
- **DC 10 Nature:** Wolves are acting with unusual intelligence (opening doors, coordinated tactics)
- **DC 12 Arcana:** This level of intelligence is magical, not natural evolution
- **DC 15 Investigation (Urgon's cabin):** Find evidence of magical disturbance around time Alexi vanished
- **DC 10 Persuasion (Council):** Gain +1 swing vote with good argument
- **DC 15 Intimidation (Council):** Lose -1 swing vote (threatens council, backfires)

### Council Voting Tiers
**GUARANTEED YES (if negotiation attempted):**
- Father Merriksonn (brother's magic caused this)
- Corel (believes in coexistence)

**SWING VOTES (need 1+ of these):**
- Tillus Merrion: Leans NO, persuadable with strong economic argument
- Other council members: Neutral, persuadable with good roleplay/checks

**GUARANTEED NO:**
- 2 council members whose families lost livestock (can be persuaded with reparations)

### Bolt vs. Flame Breakdown
**Bolt (Alpha, Negotiator):**
- Wants: Safety, territory, recognition as people
- Fears: Extermination, starvation, pack infighting
- Offers: Relocation, ceasefire, mutual defense pact

**Flame (Challenger, Warmonger):**
- Wants: Dominance, to prove strength through raids
- Fears: Appearing weak, losing status
- Triggers combat if: Bolt negotiates with "prey"

### Adventure Pacing (4-Hour Session)
- **Hour 1:** Travel to Welton, Scene 1 (road encounter), arrive at village
- **Hour 2:** Gather information, meet NPCs, council meeting
- **Hour 3:** Investigate wolf den, meet Bolt, Flame confrontation
- **Hour 4:** Resolution (combat OR council vote), return to Waystone Inn

### Important Names
- **Bolt:** Alpha wolf, negotiator, awakened intelligence
- **Flame:** Rival wolf, ambitious, aggressive
- **Father Merriksonn:** Village priest, Alexi's brother
- **Alexi Merriksonn:** Missing sorcerer (DECEASED — players don't know this yet)
- **Tillus Merrion:** Halfling council member, distrusts outsiders
- **Leanor Slatebeard:** Dwarven innkeeper (Shepherd's Crook)
- **Willen Featherock:** Traumatized halfling shepherd (was captured by wolves, released)

### Quick Treasure
- 800 gp reward (from village council)
- Healing potions x2 (can be purchased at Shepherd's Crook, 50 gp each)
- Alexi's spellbook (if negotiation successful, gift from Father Merriksonn)

### Bolt's Opening Speech (if players negotiate)
> *The alpha wolf steps forward. Its eyes are not those of a beast — they are thoughtful, weary, almost human.*
>
> "You understand me. I see it in your eyes. Good. We are not monsters. We were animals once. Then... something changed us. We woke up. We think now. We feel fear. We know death. We have cubs who will starve if we do not hunt. Your people call us thieves. What choice did we have? Would you starve to preserve a stranger's peace?"

### Flame's Challenge (if combat starts)
> *A scarred wolf with ember-colored eyes snarls.*
>
> "You are WEAK, Bolt! Talking to prey! We are WOLVES! We TAKE what we need! If they hunt us, we hunt THEM!"

### Father Merriksonn's Reaction (if peaceful resolution)
> *The priest's eyes glisten with tears.*
>
> "Thank you. My brother... Alexi studied magic, forbidden magic perhaps. I believe his death caused this. These wolves did not choose their fate. You have given them a chance my brother never had."

## Post-Session Tasks

- [ ] Update Campaign Tracker: Note if wolves were killed or negotiated with
- [ ] Track Father Merriksonn's relationship status (Grateful OR Neutral/Disappointed)
- [ ] Note if Tillus Merrion is hostile (future plot hook)
- [ ] Record if Bolt's pack is now an ally (can be called upon in future)
- [ ] Award XP or milestone level-up (Party → Level 2)
- [ ] Note any Aeorian Echo clues players seemed interested in
- [ ] Prepare Lorewarden Elric's debrief for next session (connects to larger mystery)

## Troubleshooting Common Issues

### "We attack Bolt during negotiations!"
→ Bolt yields immediately, begs for mercy, other wolves flee. Give players chance to reconsider.

### "We want to talk to the wolves, but how?"
→ Bolt sends a wolf messenger with a crude message (stick drawing or crudely spoken Common).

### "The council vote is taking too long."
→ Call for a recess. Have Father Merriksonn speak with party privately about what arguments will work.

### "We want to kill ALL the wolves, including cubs."
→ Allow it, but make consequences clear: Father Merriksonn is horrified, village reputation suffers (-1 future reaction rolls), Lorewarden Elric notes "You destroyed evidence of the magical phenomenon."

### "We tell the village we killed the wolves, but let them live."
→ Excellent deception path! Require Deception checks. Consequences emerge later (wolves seen near village again, party must maintain lie or come clean).

## Next Session Hook

When party returns to Waystone Inn, Lorewarden Elric requests a debrief:

> "Awakened wolves? This is the third report of magical anomalies in Northreach this month. Palebank Village sent word of a strange plague. A wizard's tower near here had an... incident involving a polymorphed sheep. Something is waking the old magic. I need you to investigate further."

This sets up future adventures (Frozen Sick, Wild Sheep Chase) and reinforces the Aeorian Echo mystery.

\page
# Scene 1: Welcome to the Welton Wolfpack

The party’s introduction to the wolves comes before they even enter Welton. When the scene opens they are still travelling through the hills to the west of the village, whose neat white-walled buildings stand out among the green grass in the valley below.

Around 150ft ahead of them is a slight bend in the road where it passes between an outcrop of rocks and the borders of a mossy woodland. As they approach they see a pair of men driving a small flock of sheep through the gap with the help of four sheepdogs.

The first indication that anything is amiss comes when the dogs prick up their ears and start frantically barking. The men immediately pull long wooden clubs from their belts and start looking about, clearly distressed. In the blink of an eye, lean grey shapes burst out from both sides of the road, all launching themselves at sheep with incredible speed. Eight **Wolves** *(MMp241)* are taking part in the attack.

Assuming the players wish to do anything other than watch the fight from a distance, roll up initiative and start the encounter with the players starting at a distance of 150ft from the action.

Once the fight is over the injured shepherds are grateful for the help - assuming any was forthcoming - and ask for aid returning to Welton. They are more than happy to share local gossip (see **Shaggy Wolf Storie**s) but will not be able to offer any real reward.


\page

## Combat Tactics

The wolves are here to steal sheep, not kill shepherds - they certainly don’t want to fight even low-level adventurers. Half of them will keep the shepherds distracted while the rest pick off sheep and retreat to the west. They will not try to kill the shepherds, but will instead bite at their arms and legs.

When the players arrive on the scene the wolves may test their strength with a couple rounds of combat, but will quickly retreat into the woods if it appears they are outmatched.

## Shaggy Wolf Stories

*"Course, all this started when that sorcerer, Father Merriksonn's brother, upped and disappeared.*

*Not that I'd hear a word against him, 'course, but it makes you think, don't it..."*

-----------------------------------------------------------

*"First sign something out of the usual was goin' on came when the Petersens up on Spurrok's Hill had a dozen sheep snatched from inside a barn.*

*"Their boy got thrashed somethin' awful for failing to close it, but a week later the exact same thing*

*happened, even though old Petersen had locked up*

*hisself!*"

-----------------------------------------------------------

*"Wheatly, who sells pots, pans and ointments here about, was chased off his cart by a pack of wolves. Says they appeared from the trees as if by magic.*

*"When he went back with some village lads the horses were gone, and so were three sacks a' thick leather he were planning to trade."*

----------------------------------------------------------*"Old shepherd named Grimstone, up Carnby way, was watching his flock when he heard callin' from the trees, begging for help.*

*"Well, he runs off to check what was wrong but he couldn’t find so much as a gnome out there. While he was away, guess what? Dozen sheep o' his just upped and disappeared!"*

-----------------------------------------------------------

![The image is a mostly uniform light-gray rectangle with very subtle, slightly darker smudges and irregular marks near the top edge; otherwise it contains no distinct objects or features.](./5E_Wolves_Of_Welton_images/image_002.png)*"Month or so ago a band of blokes from the village went out to hunt the wolves; track 'em back to their den. But soon as they were in the darkest part of the woods they were ambushed. Wasn't there myself, but some of 'em tell of booming thunder, others of bursts of fire. Sounded like an unholy mess.*

*"Anyway, a halfling named* ***Featherock*** *- decent shepherd - was hurt real bad in the fight. All the others thought he was dead. But next morning he's found dumped on the Westly's doorstep, near the woods.*

|  |
| --- |
| ~ 2 ~ |

*"Poor man ain't been the same since. Tells wild tales o' voices in the night. Cracked in the head, they say.*"



\page

# Scene 2: Village People

Welton sits on the banks of a slow-moving river, with gentle hills rising up on each side. The houses and shops are generally made of oak, painted bright white, and many have elaborate carvings worked into the eaves. Wheat and sheep farming dominate the local economy, and people pay much more attention to the weather and wool prices than rumors of distant wars or disasters.

The vast majority of the population are human, though there is a sizable minority of halflings and a handful of dwarves. While it is by no means a rich village, Welton isn’t povertystricken either.

However, observent characters will notice that there are more people idling in the streets than you may expect at this time of year, and many appear to be openly concerned and may be hungry or worried about food. Unusually heavy traffic and the impact of many hooves have reduced the dirt streets to muddy quagmires in places.

The village offers little beyond a small general store and virtually nothing of interest to outsiders other than the *Shepherd’s Crook*, which happens to be hosting both a village council meeting. It's is also home to a halfling named **Willen Featherock**, a traumatised victim of a wolf attack

## *The Shepherd’s Crook*

This ancient inn is one of the oldest and largest buildings in the village, sitting opposite both the Growers’ Hall and the Fleecers’ Hall. It is a traditional inn, with a common room at the front, a private dining and meeting room at the back and guest rooms upstairs.

With so many extra people staying in the village the inn is always crowded. Tanned and weatherbeaten shepherds in woollen cloaks smoke longstemmed pipes while drinking cider and muttering amongst themselves, while small groups of young men and women nurse their drinks and mostly stay quiet.

The innkeeper is a dwarven women named **Leanor Slatebeard**, who runs the bar while her husband Banteth deals with both the kitchen and the brewing. She will be excited if the party mentions that they are adventurers or that they’re in the town to help with the wolf problem, offering them a free round of drinks and a meal once they’ve talked to the village council. The people in the inn will also be impressed, though many of the old shepherds will still remain dour and cynical.

Should they ask after Featherock she will direct them to his room, though she will ask them to be gentle with the poor man,


\page

## The Council Meeting

The meeting is being held in a plain room, centered around a large wooden table with eight chairs set around it. Five of the chairs are filled with human men, one by a human woman and two by halflings - one male and one female.

As the party approaches they will be able to hear raised voices, and when they enter the male halfling - **Tillus Merrion** of the Growers and Buyers' Association - will be bitterly arguing with a human dressed in priestly robes - **Father Merrikson** - about whether the village should stop exporting its grain and other food while the crisis with the wolves remains unresolved.

Tillus reacts anrgily to any interruption, but quickly warms to the party if they identify themselves as adventurers. If the party has not come to the village specifically to complete the contract, the council will try to persuade them to take the job, offering the 800gp reward, free lodging at the inn and other small favours. The council will be able to offer detailed information about the wolf attacks, as well as the rumors known to the common folk. The wolves have been driving people out of farms and outlying hamlets, taking entire herds of sheep as well as cattle, pigs and chickens. They have been acting in a way that is unusually effective, such as ambushing shepherds as they move their flocks, opening gates and pulling down fences.

There have always been wolves in the woods, but in the space of three months they have gone from a nuisance to a major threat to the village. People have been abandoning their farms out of fear, leaving the village to either stop exporting the crops that have already been harvested and risk bankruptcy or to go hungry.

The council organised a posse of men to go and hunt down the wolves, but they were attacked in the woods and driven back. Merriksonn will mention that the village’s usual protector - his brother, a Sorcerer named **Alexi** - went missing at around the same time the attacks began, forcing them to turn to professional adventurers for aid.

Should the party mention the possibility of werewolves, Merriksonn will point out that there have been several full moons since the attacks began and not one person has shown any sign of the curse, though he admits his knowledge on the subject isn’t perfect.

They believe that the wolves live in the woods to the west of town, but are not sure. A councillor with a tuft of wool tied to his vest will introduce himself as **Corel** of the Fleecers' Guild and say that he has been working on the hills for thes best part of forty years and is happy to answer questions on the local environment and provide general support for the party.

\page


## Featherock’s Room

Badly injured when the villagers sent a posse to hunt down the wolves, Featherock has been left badly damaged by his experiences - both mentally and physically. He is currently laid up in a room over the Shepherd’s Crook, where he is being regularly attended by Father Merrikson.

The room is small but well-appointed, with fresh flowers on a dresser. A halfling lies in the bed, white-faced and soaked in his own sweat. His left arm is bandaged, as his his right leg. He will shy away from the party at first, but will tell them everything he knows if they promise to believe him.

He explains that when the posse was attacked he was bitten badly and was trampled as the other men fled. His memories are hazy as he drifted in and out of consciousness, but he remembers gruff voices arguing in the darkness and a powerful grip on his ankle.

If the party seem to believe his tale so far, he will hesitantly confess that the wolves were *talking*, arguing fiercely over whether they should eat him or not. Featherock then breaks down in tears and refuses to say anything more.


# Scene 3: Plan of Attack

Essentially, the aim of this scene to have the party find their way to the wolves' lair. There is no prescribed way for them to do this, so allow them to be as inventive as possible.

The lair is in a hollow just the other side of the woods that cover the hillsides to the west of Welton.

If the party are floundering, Corel represents a good route for passing on ideas. He will suggest that if they are confident in their tracking ability the party may wish to simply head out to the western woods and try and pick up a trail there. If they are interested in luring wolves out, he will instead offer up his own flock as bair.

Should the party lack a tracker proficient in Survival, he will reluctantly volunteer his own services (use stat block of **Commoner** *(PHB p345*) with a Wisdom of 14 and a +4 Survival skill). Should the party set up bait, six wolves will attack using the same combat tactics used in Scene 1. If the party try and talk to them, the wolves may respond with a few words before fleeing in confusion.

Eventually, the party should end up making a trek into the woods, which are thick and clogged with undergrowth. The smell of earth and moss filsl the air and the passage of small animals creates a constant rustle in the bushes. Occasionally the howl of a lone wolf echoes eerily from the west.

Crossing the woods takes approximately four hours at a walking pace.


\page

## Guidelines for skill checks

**Tracking a wolf through the woods**: Wisdom (Survival) DC14, DC16 if tracks are more than eight hours old

**Tracking a wolf carrying prey through the woods**: Wisdom (Survival) DC11, DC13 if tracks are more than eight hours old **Hiding from wolves**: Dexterity (Stealth) opposed by a Wolf’s Wisdom (Perception) skill (+3, advantage on scent and sound)

**Understanding the habits of wolves**: Wisdom

(Nature) DC12

~ 4 ~ **Scene 4: The** The creature's many injuries have reduced its

maximum Hit Points to 40, but otherwise it still

**Owlbear’s Picnic** operates at full effectiveness.

*This scene is not strictly necessary for advancing the* The mighty Owlbear is starving and desperate. It *plot. It can be used to add a little more combat or* will charge at the easiest target it can find and *depth, especially if the party did not have any* will fight until it is brought down. It will not *particularly meaningful encounters in Scene 3.* retreat.

After two or so hours of travel through the Should the party kill the Owlbear, they will be dense undergrowth of the Western Woods, the able to tell that the beast’s prior injuries were party begins to hear the sound of snapping caused by sharp jaws. A DC12 Wisdom (Nature) twigs and rustling leaves - something big is check will confirm that these were indeed

making its way towards them. caused by wolves and that the wounds appear to Unless they take immediate steps to hide, an be a couple of weeks old. Interestingly, there are

**Owlbear** *(MM p249)* crashes through the bushes also scorch marks on the creature’s fur.

and sights them. Even at a glance, the party can Anybody proficient in Nature or able to pass a tell that it is limping, thin and appears to be DC10 Wisdom check will know that it’s very rare nursing several barely-healed wounds clotted for wolves to challenge Owlbears. If the with old, black blood. Despite its injuries, the encounter occurred during the daytime, they massive beast will charge the party, letting out a will also know that Owlbears are nocturnal deafening hoot as it does so. predators and shouldn't be out in sunlight.


# Map of Welton & the Surrounding Area

![A wide, horizontal, light-gray panel with very subtle vertical streaks and faint, slightly darker smudges — overall a mostly uniform gray surface with minimal texture.](./5E_Wolves_Of_Welton_images/image_003.png)![A colored fantasy-style map showing open plains, a large forest, a village, and terrain features. Key elements: - Overall: pale-green rolling plain with a large dense forest occupying the upper-left quadrant and mountains beyond it. - Compass rose at upper-right and a horizontal scale bar along the bottom edge. - Water: a thin blue river/stream runs roughly north–south on the right side, passing the village. - Settlements/markers (numbered on the map): - 1: A small clearing at the forest edge with a few stone cairns or standing stones and a handful of trees. - 2: A clustered village/hamlet at the river with several buildings, a red-roofed structure, and a nearby church; a windmill sits a short distance to the east. - 3: A lone small building or hut in the open plain near a short cliff or escarpment. - 4: Mountainous terrain visible beyond the forest in the top-left. - Paths: dotted/trail lines cross the plain, connecting the forest edge, the hut, and the village. - Scattered terrain details: isolated groves of trees, small rocky outcrops, and a few standalone cairns or towers across the plain.](./5E_Wolves_Of_Welton_images/image_004.png)

\page


**1**

**.**

**S**

**i**

**t**

**e**

**o**

**f**

**W**

**o**

**l**

**f**

**A**

**m**

**b**

**u**

**s**

**h**

**(**

**S**

**c**

**e**

**n**

**e**

**1**

**)**

**2**

**.**

**W**

**e**

**l**

**t**

**o**

**n**

**3**

**.**

**W**

**e**

**s**

**t**

**l**

**y**

**'**

**s**

**F**

**a**

**r**

**m**

**4**

**.**

**W**

**o**

**l**

**f**

**D**

**e**

**n**


# Scene 5: The Den’s Denizens

The wolves have made their den in a cave system on the western edge of the woods.

From the treeline it is possible to see a cave entrance roughly 10ft wide and 10ft tall at its highest point, set into a low cliff of grey stone. A thin plume of smoke appears to be coming from a point on the hill above the cliff, maybe 30ft back from the cave entrance. Milling around the area are six **wolves**. Some are sat around the fire, some are seemingly working on improving the fence, and some are in the process of tearing a sheep carcass apart. Many of the wolves appear to be wearing strips of brightly-coloured cloth or other decorations tied about limbs or their necks. The entire scene seems remarkably peaceful and organised for a wolf den.

The wolves have set up tripwires at the edge of the treeline, requiring a DC13 Wisdom (Perception) check to spot. If the players trigger these they set off bone noisemakers.

# Map of The Wolves' Den

## The Back Door

The plume of smoke mentioned above is coming from a hole in the cave ceiling. It is roughly 30ft back from the cave entrance and is just about big enough for a small creature to squeeze through. The hole opens into the far right cave chamber (see map) and is 15ft off the ground, directly above the fire.

Should the party listen in, they will hear **Flame** and **Bolt** having an argument over the future of the pack. Flame is angrily ranting about the appearance of the adventuring party and that it proves that they need to be more aggressive. She believes they should start killing more humans and halflings in a bid to speed up their retreat from the area.

|  |
| --- |
| ![A wide, rectangular image showing a nearly uniform light‑gray field with very subtle texture — a few faint vertical smudges or marks near the left‑center — otherwise featureless.](./5E_Wolves_Of_Welton_images/image_005.png)  ~ 6 ~ |

Bolt, however, argues in extremely soft tones that it means they should do the exact opposite. He wants conduct a few more small-scale raids and then disappear from the area, moving further into the wilderness. The argument will last for some time before the pair move out into the main cave complex.

## Inside the Cave

The cave complex is made up of a large central chamber and three smaller sub-chambers.

The central chamber is the pack’s main living and sleeping area. There are piles of bones in the southeastern corner and the floor is dotted with large piles of leaves and cloth that appear to be very rudimentary beds. Crude depictions of hunting wolves drawn upon the wall in charcoal and white ash. A DC12 Wisdom (Perception) check will allow a player to notice that a series of images appear to depict the pack’s fight with a human, who shares gifts with the wolves before disappearing.

The western sub-chamber functions as a storeroom for both goods and many of the stolen sheep. Bags containing thick leather and homespun wool are kept here, while other interesting items picked up by wolves during their raids - a couple of knives, a shovel and other mundane equipment - are piled up against the wall.

\page


Further inside the wolves have constructed a crude but effective fence out of what appears to be fallen branches, some of which have been


# Flame

*Large beast, chaotic neutral*

**Armor Class** 14 (natural armour) **Hit Points** 47 (7d10+10) **Speed** 50ft.

**STR DEX CON INT WIS CHA**

17(+3) 15(+2) 15(+2) 12(+1) 14(+2) 8(-1)

**Skills** Perception +3, Stealth +4

**Senses** passive perception 13

**Languages** Common

**Challenge** 2 (450 XP)

**Keen Hearing and Smell.** Flame has advantage on Wisdom (Perception) checks that rely on hearing or smell.

**Pack Tactics.** Flame has advantage on an attack roll against a creature if at least one of her allies is within 5 feet of the creature and the ally isn't incapacitated.

## Actions

***Bite.*** *Melee Weapon Attack:* +5 to hit, reach 5ft., one target *Hit:* 7 (1d6+3) piercing damage. If the target is a creature, it must succeed on a DC13 Strength saving throw or be knocked prone.


![- Stylized fantasy map, oriented with north at the top (compass rose at upper right). - Large, dense forest occupying the upper-left quadrant, with mountains and the numeral "4" near its north edge. - Open grassy plain across the center and right side, dotted with small copses, single trees, and rocky outcrops. - A cluster of buildings/town labeled "2" on the lower-right beside a blue river; a windmill and a larger house are nearby. - A small isolated house or farm labeled "3" sits along a dashed path in the central plain. - A group of standing stones or ruined towers near the forest edge labeled "1" where a dashed track meets the woods. - Low cliffs or escarpments at the forest boundary, several solitary rock stacks, a curved dashed road connecting points, and a scale bar along the bottom edge.](./5E_Wolves_Of_Welton_images/image_006.png)***Fire Breath (Recharge 5-6).*** Flame exhales a firey blast in a 15-foot cone. Each creature in that area must make a DC 13 Dexterity saving throw, taking 9 (2d8) fire damage on a failed save, or half as much damage on a successful one.


\page

# Bolt

*Large beast, lawful neutral*

**Armor Class** 14 (natural armour) **Hit Points** 47 (7d10+10) **Speed** 50ft.

**STR DEX CON INT WIS CHA**

17(+3) 15(+2) 15(+2) 12(+1) 14(+2) 8(-1)

**Skills** Perception +3, Stealth +4

**Senses** passive perception 13

**Languages** Common

**Challenge** 2 (450 XP)

**Keen Hearing and Smell.** Bolt has advantage on Wisdom (Perception) checks that rely on hearing or smell.

**Pack Tactics.** Bolt has advantage on an attack roll against a creature if at least one of his allies is within 5 feet of the creature and the ally isn't incapacitated.

## Actions

***Bite.*** *Melee Weapon Attack:* +5 to hit, reach 5ft., one target *Hit:* 7 (1d6+3) piercing damage. If the target is a creature, it must succeed on a DC13 Strength saving throw or be knocked prone.

***Lightning Breath (Recharge 5-6).*** Bolt exhales a blast of blue lightning in a 30-foot line. Each creature in that area must make a DC 13

Dexterity saving throw, taking 9 (2d8) lightning damage on a failed save, or half as much damage on a successful one.

shaped by tools. The noise of bleating is constant and very loud.

The central sub-chamber acts as a nursery for the pack’s young pups. Half a dozen young wolves sleep here when they aren’t playing outside, and this is where they will be kept if a fight breaks out. A pair of wolves are set to guard the young, who are just learning how to talk, and will defend them to their deaths. In the event that a fight breaks out, use the **Cat** (*MM p320*) statblock for the wolf pups. The eastern sub-chamber is used as a meeting room by the pack leadership. It is the only chamber to contain a fire, as the smoke is able to escape through a hole in the cave roof, but it otherwise empty.

## Big Bad Wolves

Should the wolves become aware of the party for any reason - triggering the noisemakers, failed stealth checks or simple walking out into the hollow - they will react with panic, letting out high-pitched howls. One of the wolves will yell ‘HUNTERS’ in guttural, growling common.

Unless the party makes any moves to defuse the situation the wolves will attack with a fierce determination.

If the battle is taking place in front of the cave, **Flame** and **Bolt** will emerge from their den after one full round. They will be accompanied four more **wolves** that appear to have scraps of crude leather armour tied around their bodies, giving them a +1 bonus to AC.

The Alpha Pair will yell exhortations to their fellow wolves, with Flame encouraging them to kill the hunters and Bolt telling them to protect the pack, and not to let them harm the pups.

\page


All the wolves will move to attack the party, but after either one of the following occurs Bolt will let out a thunderous roar, bellowing that the battle is not helping either party:

- Four wolves are killed
- Flame or Bolt are brought to less than half HP
- A player character is reduced to 0HP

It is entirely up to the party whether they listen to him or not. Should they ignore him, the wolves will fight to the death.

## Combat Tactics

The wolves are all intelligent and will take advantage of their Pack Tactics ability as much as possible. They will also use their speed to outflank the party and target poorly-armoured castery trying to hide in the back lines.

Flame and Bolt will lead the attack on the front lines and use their breath attacks wherever possible. Bolt will make sure his attack never harms one of his allies, while Flame won’t mind catching one or two wolves if it means blasting the entire party.

## Let’s Talk This Over

Should the party be willing to talk to the wolves, Bolt will be more than happy to negotiate an end to any fighting.

He will explain that the pack became intelligent after attacking a man - the Sorcerer Alexi Merriksonn - who was trespassing on their territory. Their memories of the fight are hazy, but there was a flash of bright light. When they awoke the Lightbringer - as they call him - was gone, but the wolves found their minds working much faster than before. Almost instantly they found they were able to talk, and their memories were filled with strange images and information that appeared to them in dreams. The pack has been using its newfound abilities to boost its quality of life. Pups won’t risk starvation in the winter thanks to their hoarded herd of sheep, while their elderly won’t have to be left behind when no longer able to hunt. They drove off the Owlbear that had been plaguing the woods for years and made their home in its den. Throughout any conversation, Flame will chime in with provocative, angry comments, generally concerning her wish to punish and kill humans and other races, and that this land is theirs by right.

|  |
| --- |
| ~ |

Bolt does not care for the people of Welton, who have killed his kind indiscriminately for many years. However, he is willing to at least try and come to a settlement with them, suggesting that they be allowed control of the woods and the uninhabited lands to the west, in return for keeping the area free of other predators and not raiding themselves.

Barring that, he is willing to simply move the pack away to a more remote location, provided that the party swear by all their gods not to tell people what they saw.

Should it become apparent that a deal is forthcoming, Flame will accuse Bolt of cowardice and betrayal and attack him from behind. This will badly injure him, taking him out of the fight. All of the remaining armored wolves will join her in a final, desperate attack on the party, while the others will fall back in confusion and fear.


\page

## **Scene 6: Settling the Scores**

There are a two main ways for the adventure to conclude depending on the party’s previous actions. Sometimes working out what happens next may require a degree of improvisation on the part of the DM.

### The Party Refuse to Negotiate

If the party refuse to negotiate or can’t come to an agreement with Bolt, most of the wolves will be probably be dead by the time the battle is over. In this case the party have fulfilled the terms of their contract with the Welton village council and are able to return to collect their prize.

Should they explore the cave they will encounter a dozen young pups being guarded by a pair of desperate wolves, who beg to be allowed to leave, promising that they will never come back to the area. If the pups are threatened the adult wolves will fight to the death, screaming that their young charges should flee into the woods.

### The Party Negotiate with the Wolves

If the party is willing to negotiate with Bolt, they may be able to come to sort sort of peaceful accord with him once Flame has been defeated. Bolt will be understandably angry about any wolves killed by the party, but recognises that they will not be able to fight the folk of Welton forever and is willing to negotiate along the terms mentioned in Scene 5.

If the wolves agree to leave the area entirely, the party will be able to return to Welton and collect their reward. If they lie and claim the wolves were wiped out they will have to make a Charisma (Deception) check, opposed by Father Merriksonn’s +5 Wisdom (Insight) skill. However, he will make sure to confront the party about their deception in private.

However, if the party agree to a more complicated arrangement they will need to present their offer to the village council. Father Merriksonn is keen on coming to a settlement even if he believes the wolves killed his brother as is Corel. However, Tillus and much of the rest of the council will need convincing.

How the party do this is entirely their choice. Talking Tillus around will need both a decent argument, as determined by the DM, and a successful DC15 Charisma (Persuasion) check. Should he agree to the negotiations the rest of the council will agree with him, and Corel will begin work on setting up a meeting with Bolt.

If they find it impossible to convince him, Corel will call a vote on whether or not they should work with the wolves anyway. Allow the party to make a DC12 Charisma (Persuasion) check against each of the five remaining council members, awarding advantage or diasadvantage depending on how persuasive the party's argument was. Corel and Father Merriksonn will both vote to negotiate, so they need three successes in order to win an overall majority.

Tillus will react with shock and horror at being outvoted. After a moment of blustering rage he will realise that he has been ousted. He willl leave the council a broken man, never to return. As long as the party have succeeded in dealing with the wolf problem in one way or another they will be paid in full at the rate they agreed with the council.

\page


Should the wolves’ intelligence become publicly known Feathrock will start to recover at a much faster rate, and will try and thank the party in person.

~ 9

**Characters** She is generally happy to help the party in their

quest and may well be a powerful ally if they try

Tillus Merrion to negotiate with the village council over a

treaty of sorts with the intelligent wolves.

Tillus Merrion is a proud, blustering Halfling who

leads the Welton Growers and Buyers’ Alexi Merriksonn

Association. The Association – as it is known –

The protector of Welton, Alexi spent his life represents the most powerful group in the keeping dangerous monsters and occasional village, and as its leader Tillus acts as a de facto bandit gangs away from his home village. mayor and head of the council.

Born with a link to the inscrutable forces of Wild

In his day job, he oversees the sale of grain, wool

Magic that always marked him as an outsider and other products outside of the village, while growing up, his brother Johan was his only negotiating contracts with merchants in nearby real friend. Despite this, he was keen to show his cities and managing the shipping. He has a gift worth to the people of Welton and trained long for trade and has helped to boost Welton’s and hard to increase his abilities. prosperity in a number of small but significant

ways. Befitting the source of his power, Alexi was

unpredictable and passionate, given to flights of

When he isn’t working, Tillus is usually fancy and wild laughter. He roamed the lands beavering away at various schemes and beyond Welton almost at random, seeking out initiatives around the village. He has a love for threats before they approached the farms of the order, neatness and the rule of laws and common folk. contracts, and is quietly obsessed with making

Welton clean and well organised. Despite his commitment to their protection, the folk of Welton always viewed the sorcerer with a

This commitment can occasionally make him degree of suspicion. At times the presence of his forget that many of the figures he moves about brother may have been the only thing keeping on his ledgers represent living, breathing people. some of the more superstitious and hot-headed

This has become especially clear in the recent members of the community from trying to drive crisis, where his dread of missing a shipment is him out. leading him to try and sell crops that the people

of Welton may need to eat if they are to avoid He stumbled across the wolf pack while

starvation. patrolling the moorlands. He didn’t plan to

destroy them, but simply wanted to drive them

Despite this, he is not a bad person. He off. While he was using his abilities, however, he desperately loves Welton and will do anything it was struck by a Wild Magic Surge, destroying his takes to see it grow and prosper. If this means body and imbuing the nearby wolves with some making people go hungry in order to maintain of his intelligence and magical abilities. their long-term credit rating, so be it.

### Leanor Slatebeard Father Merriksonn

The local priest of Pelor (or any local good-

One of very few dwarves in Welton, Leanor and aligned deity), Johan Merriksonn was born and her husband Banteth are cheerful, hard-working bred in Welton and loves both the village and its members of the community. She is well over 100 inhabitants. He is a human in his mid-50s with a years old and has seen the community grow from kindly face and wispy white hair. a mere hamlet to the thriving village it is today.

\page


He and his brother, Alexi, were born to a family

Despite her apparently minor position, Leanor’s of reasonably successful farmers and are welllong-running relationships with virtually every educated by the standards of the region. While family in the village actually gives her a lot of

Alexi found himself able to control the power of quiet influence. She knows all the skeletons in

Wild Magic, Johan felt the draw of the church everybody’s closets and has accumulated an and was apprenticed by the local priest. awful lot of favours over the years.

~

In many ways Merriksonn acts as the conscience and moral compass for the otherwise mercantile-minded village council. Recently he has come into conflict with some of the more businesslike members over his desire to prioritise feeding the locals over meeting the terms of their export contracts.

He is helpful to the party unless they show themselves to be evil, in which case he will condemn them. He is also willing to negotiate with the wolves, even if he knows they were involved in his brother's death.

### Willen Featherock

A halfling shepherd, Featherock lived a mostly unremarkable life until he was injured in Welton’s attempt to deal with the wolves. Since his experiences at the hands - or rather jaws - of the intelligent wolves he has been jittery and plagued by nerves.

He is of average height for a halfling and despite his time spent recovering inside he still has a ruddy, sun-reddened face from his days spent out on the hillsides.

### Corel

A human shepherd, Corel is lean and tough as old leather. He is a quiet, reserved man who is respected by everybody on the village council. He does not speak very often, but when he does the entire room listens and carefully weighs his words.

He is reasonably successful as a farmer and shepherd and runs his own operation on the hills near the western woods. Much of his flock has been taken by the wolves, but he was quick to recognise the threat and drive his sheep into town, where they would at least be safe.

Corel is more than happy to help the party and act as their guide if needed.

He has been working on the hills surrounding Welton for most of his 50-something years and is an expert on the local geography. Despite his losses to them, Corel will support any negotiation with the wolves once he realises they are intelligent, sentient creatures.

### Flame and Bolt

The alpha pair of the wolf pack, for most of their lives Flame and Bolt were simple beasts. Both cunning and fierce, to be sure, but not intelligent. This all changed when the pack brought down Alexi Merriksonn, and were infused with much of his intelligence and power during a Wild Magic Surge.

Both are fiercely protective of their pack and are worried that their intelligence will cause men and other sentient races to hunt them down and destroy them. At the same time, however, they are now bright enough to be able to think of a great many ways in which they will be able to improve their lives and those of their pups.

Flame, the alpha female, was granted the ability to produce and control flames. She is much more aggressive than her partner and believes that killing other intelligent beings to drive them away from the pack’s territory is the only way she can keep her people safe/ Bolt, the alpha male, has gained the ability to roar with the fury of a storm and shoot blasts of lightning from his mouth. He is generally more cautious and kindly than his partner, and prefers the idea of breeding sheep and moving into remote areas where other ‘civilised’ races won’t bother them.

\page


Tension has been brewing between the two ever since they were gifted with intelligence. Both are willing to die for the safety of the pack and deeply care for each other. However, if nothing changes they will probably fight to the death within a matter of weeks, each believing that the other is leading their people to their doom.

Both Flame and Bolt are very, very large wolves with dark grey fur. Flame’s eyes glow with a constant orange flame and thin strips of red light run across her body, as though her skin is cracked rock sitting on top of a burning pool of magma.

Bolt’s eyes and skin pulse with a crackling blue light. He always speaks softly, for if he raises his voice it rumbles with the power of thunder, shaking the ground around him.

~

![Top-down illustrated battle map showing a small cave complex opening onto a grassy hill and forested edge. - Top half: three irregular cave chambers connected to a central stone entry passage. - Left chamber: stone floor with barrels, sacks, and what looks like butchered meat or stored provisions. - Center chamber (upper): stone floor with stacked crates, rugs/mats, and a small round object (barrel or drum). - Right chamber: stone floor with wooden crates and a smoldering campfire with scorch marks. - Middle: a short rocky tunnel / doorway where the caves meet and exit to the surface. - Bottom half: open grassy slope with a lone burning projectile or scorch mark near the center and a tree line along the bottom edge, casting shadows onto the grass. - Map features: grid overlay for movement/measurement, stone textures inside caves, a wooden frame around the map. Overall impression: a game-ready dungeon entrance set on a hillside, with supplies and a campsite inside the caves and woods outside.](./5E_Wolves_Of_Welton_images/image_007.png)

~

![A simple, mostly gray rectangular image with two vertical columns. Each column contains several evenly spaced thin dark-red horizontal lines (like ruled lines) aligned across both columns. Near the lower part of each column there is a small black dot. The layout is minimal and highly symmetrical.](./5E_Wolves_Of_Welton_images/image_008.png)

~

**Thanks & Acknowledgements**

All maps were created using *Campaign Cartographer 3*.

~

Dungeons & Dragons is the property of Wizards of the Coast. Please buy their books and support their excellent work.

~

*This adventure was produced by* ***Winghorn Press****. Check us out at www.winghornpress.com and @WingHornPress on Twitter.*

~

*If you want to get in touch, send feedback or take part in playtest sessions on Roll20.com, please send a message to winghornpress@gmail.com, or to u/therainydaze on Reddit.*

\page
<!-- FILE_END: ../Season 1/Adventures/Wolves_Of_Welton/5E_Wolves_Of_Welton.md -->

## Frozen Sick

<!-- FILE_START: ../Season 1/Adventures/Frozen Sick/Frozen Sick.md -->
# Frozen Sick

\page

# DM Notes: Frozen Sick

## Adventure Overview

**Theme:** Ancient magic resurfacing with deadly consequences — the Aeorian Echo's source is discovered

**Core Tension:** A deadly disease (frigid woe) is killing villagers, and the only cure lies in dangerous Aeorian ruins. Time is running out.

**Level Range:** 2-4 (mid-campaign adventure)

**Expected Duration:** 8-12 hours (2-3 sessions recommended)

**Key NPCs:**
- **Elro Aldataur** — Village leader, retired ranger, hires the party
- **Tulgi Lutan** — Infected dwarf trapper, suspicious of authority
- **Urgon Wenth** — Deceased explorer (turned to ice), source of outbreak
- **Verla Pelc** — Deceased elf collector (also turned to ice)
- **Irven Liel** — Infected merchant, family at risk
- **Morgo** — Uthodurn guide at Syrinlya outpost

## Central Mystery (Aeorian Echo Connection)

**THIS IS THE REVELATION ADVENTURE** — Players discover the source of all magical disturbances across Northreach.

**The Truth:**
- **Salsvault** is a buried Aeorian laboratory that recently reactivated
- Aeorian spores (blue, magical, deadly) are leaking from the ruins
- These spores caused frigid woe AND triggered magical phenomena across the region
- Salsvault's activation killed Alexi Merriksonn (Wolves of Welton connection) via magical feedback
- The ruins are **still active** and will continue causing problems

**What Players Should Learn:**
1. Salsvault is an ancient Aeorian ruin that suddenly activated 2-3 months ago
2. It contains both deadly weapons (frigid woe) and powerful artifacts
3. The reactivation is spreading magical corruption across Northreach (Aeorian Echo)
4. Someone or something triggered the ruins — but who, and why?

**What Remains Hidden (for future campaigns):**
- *Why* Salsvault activated (potential: deep magic, ancient failsafe, or intentional trigger)
- Whether other Aeorian ruins exist in the region
- The full extent of Aeor's magical arsenal

## Common DM Pitfalls

### 1. Plague Timeline Too Forgiving
**Problem:** If players take too long, infected NPCs should die — but DMs hesitate to kill NPCs.

**Solution:** Use the disease mechanics strictly:
- Urgon and Verla are *already dead* (ice statues)
- Tulgi has ~7 days left (symptoms visible)
- Irven's family has ~10 days (just infected)
- PCs infected during adventure have 1d4 days before symptoms appear

**Be clear:** "You have about a week before more people die. Every delay costs lives."

### 2. Croaker Cave Feels Like Filler
**Problem:** Bandit hideout can feel like a side quest distraction.

**Solution:** Emphasize the urgency — bandits *stole* the vials, making them part of the outbreak's spread. Recovering the vials prevents further infections. This isn't a detour; it's critical.

### 3. Salsvault Feels Like a Dungeon Crawl
**Problem:** Final section becomes "clear rooms, fight monsters" with no tension.

**Solution:**
- Emphasize environmental hazards (cold, magical traps, unstable magic)
- Remind players of the ticking clock (infected people dying)
- Show evidence of Aeor's fall — this was a weapons lab during a god-war
- Let players feel the *wrongness* of Aeorian magic (unnatural, cold, blue glow)

### 4. Antidote Location Is Unclear
**Problem:** Players get lost in Salsvault looking for gold vials (the cure).

**Solution:** 
- Drop hints early: "Urgon's notes mention 'gold vials in the preservation chamber'"
- Use Investigation checks to find labs, storage areas
- Morgo can provide a rough map or directions (if players ask at Syrinlya)
- Gold vials glow faintly with warm (non-threatening) magic — contrast with blue (dangerous) spores

## Resolution Outcomes

### Path A: Retrieve Antidote, Cure Everyone
**Result:**
- Irven's family saved; Tulgi survives
- Palebank Village celebrates party as heroes
- Elro pays 300 gp (200 gp base + 100 gp bonus for saving Tulgi)
- **Aeorian Echo revelation:** Party now knows Salsvault is the source
- **Future hook:** Salsvault is still active; more threats will emerge

### Path B: Retrieve Antidote, Selective Curing
**Result:**
- Party chooses who gets cured (limited vials)
- Moral weight: Who deserves to live? Tulgi (gruff loner) or Irven's kids (innocent)?
- Village reaction depends on choice
- **Aeorian Echo revelation:** Same as Path A, but with darker tone

### Path C: Fail to Retrieve Antidote in Time
**Result:**
- Infected NPCs die (turn to ice statues)
- Palebank becomes a ghost town (survivors flee)
- Party may contract frigid woe themselves (Constitution saves)
- **Aeorian Echo revelation:** Partial — players learn Salsvault exists but not its full significance
- **Future hook:** Party must return to Salsvault to cure themselves

### Path D: Destroy or Seal Salsvault
**Result:**
- Advanced option: If players try to collapse/seal the ruins
- Prevents future outbreaks but destroys valuable Aeorian knowledge
- Lorewarden Elric is disappointed (lost research opportunity)
- Salsvault's magic is contained but not understood

## Tactical Notes

### Combat Encounter Scaling

**Croaker Cave (Bandits):**
- **2-3 players:** 4 bandits + 1 bandit captain
- **4-5 players:** 6 bandits + 1 bandit captain + 1 thug

**Salsvault (Aeorian Constructs):**
- **2-3 players:** Use animated armor + 2 flying swords per encounter
- **4-5 players:** Use helmed horror + animated armor + 3 flying swords per encounter

**Environmental Hazards:**
- **Frigid Cold:** Unprotected PCs take 1d4 cold damage per hour in Salsvault
- **Magical Traps:** Blue spore clouds (DC 11 Con save or contract frigid woe)
- **Unstable Magic:** Random magical surges (use Wild Magic table for flavor)

### Non-Combat Challenges

**Investigation (Palebank Village):**
- Urgon's cabin: DC 12 Investigation reveals footprints (Tulgi searched here)
- Pelc's Curiosities: DC 10 Investigation finds receipt linking to Urgon
- Tulgi's cabin: DC 15 Persuasion to get her to talk (she's dying and scared)

**Survival (Journey to Salsvault):**
- DC 12 Survival to navigate ice floes safely
- DC 15 Survival to avoid blizzards (failure = exhaustion level)
- Random encounters: ice mephits, saber-toothed tigers (1d4)

**Arcana (Salsvault):**
- DC 13 Arcana to identify Aeorian magical signatures (pre-Calamity, god-killing weapons)
- DC 15 Arcana to safely handle artifacts (failure = magical backlash)
- DC 10 Arcana to recognize gold vials as antidote (warm glow vs. cold blue spores)

## Improvisation Toolkit

### If Players Get Stuck (Investigation Phase)

1. **Elro provides new lead:** "Mila (Glassblade guard) saw Tulgi near Urgon's cabin last night. Maybe she knows something?"
2. **Pelc's Curiosities shopkeeper (if alive) remembers:** "Urgon sold me strange blue vials. So beautiful... then they were stolen."
3. **Tulgi breaks down:** "I'm dying! I searched Urgon's cabin for clues. I need HELP!"

### If Players Avoid Croaker Cave

- Bandits attack party on the road (ambush encounter)
- Vials are dropped during combat (found on bandit leader's body)
- Alternative: Elro's scouts locate the hideout and inform party

### If Players Rush to Salsvault Without Prep

- Morgo at Syrinlya warns them: "You'll need cold-weather gear, rations, and climbing equipment. The icefields are deadly."
- Allow them to buy supplies (or borrow from Uthodurn expedition)
- Random encounter on ice shows consequences of being unprepared (frozen corpse of explorer)

### If Players Are Dying in Salsvault

- Constructs are defending, not hunting — if party retreats, they don't pursue beyond certain rooms
- Hidden healing potions in Aeorian storage (2d4 potions of healing)
- Morgo can follow party (1 day behind) and provide emergency rescue

## Rewards & Aftermath

### Standard Rewards
- 200 gp from Elro (base payment)
- +100 gp bonus if Tulgi is saved
- Aeorian artifacts (1d4 minor magical items from Salsvault)
- Free supplies from grateful Palebank villagers

### Aeorian Artifacts (Examples)
- **Aeorian Absorber** — Wondrous item, absorbs 1 spell/day (reflects back at caster)
- **Frigid Woe Antidote** — 1d6 gold vials (can cure disease or sell for 100 gp each)
- **Aeorian Translation Tome** — Advantage on Arcana checks related to ancient magic
- **Icewalker Boots** — Ignore difficult terrain from ice/snow

### XP Awards (Milestone)
- Completing Palebank investigation: Party reaches **Level 3**
- Completing Salsvault: Party reaches **Level 4** (if not already)

### Reputation Changes
- **Palebank Village:** Friendly (saved from plague)
- **Uthodurn Explorers:** Interested (party has Aeorian expertise)
- **Lorewarden Elric:** Extremely interested (requests full debrief on Salsvault)

## Aeorian Echo Foreshadowing

**Revelations to drop during the adventure:**

1. **Salsvault's Activation:**
   > "The ruins weren't always active. Something *woke them up* about 2-3 months ago. Urgon was just unlucky enough to be there when it happened."

2. **Aeorian Magic Description:**
   > "The blue glow is unnatural. It's cold, wrong, anti-life. This isn't normal magic — it's weaponized divinity, designed to kill gods themselves."

3. **Geographical Implications:**
   > "If Salsvault is active, other Aeorian ruins might be waking too. And they could be anywhere beneath Northreach's soil."

4. **Morgo's Warning (at Syrinlya):**
   > "We've had three expeditions disappear in Eiselcross this year. More than usual. Something's changing out there on the ice."

5. **Elric's Debrief (when party returns to Waystone Inn):**
   > "Salsvault. Gods above. Do you realize what this means? Aeor fell during the Calamity, buried beneath ice. If its ruins are reactivating... the wolves at Welton, the magical instability across Northreach — it's all connected. The Aeorian Echo is spreading."

\page

# DM Prep Checklist: Frozen Sick

## One Week Before Session

- [ ] Read entire adventure (longer adventure — budget 1 hour)
- [ ] Review DM Notes section for themes and pitfalls
- [ ] Familiarize yourself with frigid woe disease mechanics (pg 1 of adventure)
- [ ] Review Salsvault map (if using) or plan theater-of-mind descriptions
- [ ] Prepare NPC voices: Elro (gruff ranger), Tulgi (suspicious, dying), Morgo (helpful guide)
- [ ] Decide if using Option A (keep Wildemount names) or Option B (generic names)
- [ ] Mark key revelation moments (Salsvault is source of Aeorian Echo)

## Day Before Session

- [ ] Print/bookmark stat blocks:
  - [ ] Bandit (MM p343)
  - [ ] Bandit Captain (MM p344)
  - [ ] Animated Armor (MM p19)
  - [ ] Flying Sword (MM p20)
  - [ ] Helmed Horror (MM p183) — optional for larger parties
- [ ] Print/bookmark NPC summaries (Elro, Tulgi, Urgon's backstory)
- [ ] Prepare frigid woe tracking sheet (list infected NPCs and days remaining)
- [ ] Review Croaker Cave encounter (bandit motivations, treasure)
- [ ] Review Salsvault key locations (preservation chamber = antidote location)
- [ ] Prepare Aeorian artifact descriptions (gold vials, minor magic items)
- [ ] Decide environmental hazard frequency (cold damage, magical traps)

## Props & Materials

- [ ] Index card with frigid woe disease progression timeline
- [ ] Index card with Salsvault key rooms (if theater of mind)
- [ ] Notecard listing infected NPCs and countdown
- [ ] Map of Palebank Village (sketch or theater of mind)
- [ ] Blue tokens/markers (represent Aeorian spores/magic)
- [ ] Gold tokens (represent antidote vials)
- [ ] Cold-weather survival gear list (for player reference)

## Session Zero / Player Prep

- [ ] Confirm party level (2-4 recommended; can start at Level 2)
- [ ] Brief players: This is a time-sensitive adventure (people are dying)
- [ ] Set expectations: Exploration, investigation, and dungeon crawl blend
- [ ] Ask players: "How does your character feel about deadly diseases? Ancient ruins? Moral choices about who to save?"
- [ ] Clarify: This adventure reveals major campaign lore (Aeorian Echo source)
- [ ] Remind players to track rations, supplies for arctic travel

## Quick Reference During Play

### Frigid Woe Disease Mechanics (Copy This!)

**Transmission:** Contact with blue Aeorian spores (DC 11 Con save to resist)

**Incubation:** 1d4 days before symptoms appear

**Symptoms:**
- Fatigue, chills, visible blue veins
- Speed reduced by 5 ft
- Every 10 days: DC 11 Con save or speed reduced by another 5 ft
- If speed reaches 0: Creature dies and turns into ice statue

**Cure:** Drinking Aeorian antidote (golden vials) — ends all symptoms instantly

**Current Infected NPCs (at adventure start):**
- Urgon Wenth: DEAD (ice statue)
- Verla Pelc: DEAD (ice statue)
- Tulgi Lutan: ~7 days remaining (symptoms visible)
- Irven Liel + family: ~10 days remaining (just exposed)

### Key Investigation DCs

**Palebank Village:**
- DC 12 Investigation (Urgon's cabin): Find Tulgi's footprints
- DC 10 Investigation (Pelc's Curiosities): Find receipt linking Urgon to vials
- DC 15 Persuasion (Tulgi): Convince her to reveal what she knows
- DC 10 Insight (Elro): Realize he's genuinely desperate, not hiding anything

**Croaker Cave:**
- DC 13 Stealth (approach): Surprise bandits
- DC 12 Intimidation: Force bandits to surrender
- DC 10 Investigation (hideout): Find stolen vials in leader's chest

**Salsvault:**
- DC 13 Arcana: Identify Aeorian magical signatures
- DC 15 Arcana: Safely handle unstable artifacts
- DC 10 Perception: Notice gold vials glowing warmly (vs. blue spores)
- DC 12 Survival: Navigate icy passages without falling

### Encounter Scaling Quick Reference

**2-3 Players:**
- Croaker Cave: 4 bandits + 1 bandit captain
- Salsvault encounters: 2 animated armor OR 1 animated armor + 3 flying swords

**4-5 Players:**
- Croaker Cave: 6 bandits + 1 bandit captain + 1 thug
- Salsvault encounters: 1 helmed horror + 1 animated armor + 3 flying swords

**Environmental Hazards (All Party Sizes):**
- Frigid cold: 1d4 cold damage/hour without protection
- Blue spore clouds: DC 11 Con save or contract frigid woe
- Unstable magic zones: Random magical effects (DM discretion)

### Salsvault Key Locations (Quick Map)

1. **Entrance Hall:** Ice-covered, Aeorian glyphs glowing blue
2. **Research Labs:** Broken equipment, blue spore clouds (contaminated)
3. **Preservation Chamber:** ANTIDOTE LOCATION — gold vials on shelves
4. **Construct Storage:** Animated armor/flying swords activate if disturbed
5. **Central Vault:** Optional boss encounter (helmed horror guardian)

### Pacing Guide (2-3 Sessions)

**Session 1: Palebank Investigation (3-4 hours)**
- Hour 1: Urgon's funeral, Elro's request, cabin investigation
- Hour 2: Meet Tulgi, visit Pelc's Curiosities, gather leads
- Hour 3: Track bandits to Croaker Cave
- Hour 4: Assault Croaker Cave, recover vials, return to village

**Session 2: Journey to Salsvault (3-4 hours)**
- Hour 1: Prepare for journey, travel to Syrinlya, meet Morgo
- Hour 2: Travel across ice floes, random encounters
- Hour 3: Arrive at Salsvault, explore entrance
- Hour 4: Navigate Salsvault, environmental hazards

**Session 3: Salsvault Climax (2-4 hours)**
- Hour 1: Combat encounters (constructs)
- Hour 2: Find preservation chamber, retrieve antidote
- Hour 3: Return journey, cure infected NPCs
- Hour 4: Debrief with Elro, Lorewarden Elric revelation, rewards

### Important Names

- **Elro Aldataur:** Retired ranger, village leader (hires party)
- **Urgon Wenth:** Deceased dwarf explorer (turned to ice)
- **Tulgi Lutan:** Infected dwarf trapper (suspicious, dying)
- **Verla Pelc:** Deceased elf collector (owned Pelc's Curiosities)
- **Irven Liel:** Infected merchant (family at risk)
- **Mila Teno:** Glassblade guard (helpful NPC)
- **Morgo:** Guide at Syrinlya outpost (Uthodurn explorer)
- **Salsvault:** Aeorian laboratory ruin (source of frigid woe)

### Quick Treasure

- 200 gp from Elro (base payment)
- +100 gp bonus (if Tulgi saved)
- 1d6 gold vials (antidote) — can sell for 100 gp each or keep
- 1d4 Aeorian artifacts (minor magic items)
- Bandit loot: 50 gp, assorted gear

### Elro's Hiring Speech

> "Thank you for attending Urgon's service. I believe Palebank Village is in danger. Urgon died of a strange affliction — turned to ice, like a statue. Now Tulgi Lutan shows the same symptoms. I need you to find out what's killing my people before it spreads. Will you help us?"

### Tulgi's Confession (if persuaded)

> *The dwarf trapper coughs, blue veins visible on her face.*
>
> "Fine. I'm dying anyway. I broke into Urgon's cabin looking for clues. He sold something to Pelc's Curiosities — blue glass vials. I think they're cursed. Pelc's dead too, same as Urgon. The shop was robbed. If those vials are still out there..."

### Morgo's Warning (at Syrinlya)

> "Salsvault? That's one of the Aeorian crash sites. Dangerous place. Constructs still active, magical traps everywhere. And the cold — it'll kill you as sure as any monster. You'll need cold-weather gear and rations. And luck. Lots of luck."

### Lorewarden Elric's Revelation (when party returns to Waystone Inn)

> *Elric's face pales as you describe Salsvault.*
>
> "An active Aeorian ruin. Gods help us. Aeor fell during the Calamity — a flying city brought down for defying the gods. Its weapons were designed to kill divinity itself. If Salsvault reactivated 2-3 months ago... that explains everything. The wolves at Welton. The magical instability. The Aeorian Echo is real, and it's spreading from those ruins. We need to understand why they woke up — and what else might be waking."

## Post-Session Tasks

- [ ] Update Campaign Tracker: Frozen Sick completed, Salsvault discovered
- [ ] Track which NPCs survived (Tulgi? Irven's family?)
- [ ] Note party's reaction to Aeorian Echo revelation
- [ ] Record any Aeorian artifacts party acquired
- [ ] Update Palebank Village reputation (Friendly if plague cured)
- [ ] Award XP or milestone level-up (Party → Level 3 or 4)
- [ ] Prepare Elric's follow-up quest hooks (more Aeorian sites? Temple of Dragonknights?)
- [ ] Note if any PCs contracted frigid woe (track disease progression)

## Troubleshooting Common Issues

### "We want to stay in Palebank and not go to Salsvault!"
→ Elro explains: "The vials came from there. If there's a cure, it's in Salsvault. Tulgi has days, not weeks. Please."

### "Can we cure frigid woe with *lesser restoration* or *remove curse*?"
→ No. Emphasize: "This disease was designed by Aeorian mages to counter divine magic. Normal healing doesn't work."

### "We're lost in Salsvault and can't find the antidote!"
→ Have a surviving construct (damaged, non-hostile) point the way, OR let party find Urgon's journal (describes preservation chamber location).

### "We want to destroy Salsvault to prevent future outbreaks!"
→ Allow it, but make consequences clear: Collapsing the ruins risks triggering magical backlash (everyone rolls DC 15 Dex save or take 4d10 force damage). Also, Elric is disappointed ("You destroyed invaluable knowledge!").

### "We want to take EVERYTHING from Salsvault!"
→ Most artifacts are inert or broken. Allow 1d4 minor magic items. Warn: "Taking too much risks triggering security constructs." If they persist, additional combat encounters.

## Next Session Hook

After curing the plague and debriefing with Elric:

> "You've done Palebank a great service. But Salsvault is just one ruin. If the Aeorian Echo is spreading, other sites may be activating. I've received reports of a cult in the northwest mountains — the Temple of the Dragonknights. They're drawn to sites of magical power. Could they be seeking Aeorian artifacts? Someone needs to investigate."

This sets up Temple of the Dragonknights as the next adventure.

\page

## Northreach Integration (DM)

**Campaign Connection:** This adventure reveals the **source** of the Aeorian Echo. Salsvault is the primary origin point of the spreading magical disturbance affecting all of Northreach.

**DM Secret Resources:** For the truth behind this adventure, see:
- **[World Building/DMEyesOnly/The_Aeorian_Echo.md](../../../World%20Building/DMEyesOnly/The_Aeorian_Echo.md)** - Complete Echo documentation
- **[World Building/DMEyesOnly/Northreach.md](../../../World%20Building/DMEyesOnly/Northreach.md)** - Adventure integration details
- **[World Building/DMEyesOnly/The_Far_North_Secrets.md](../../../World%20Building/DMEyesOnly/The_Far_North_Secrets.md)** - Salsvault details

**Key Secrets:**
- Salsvault is an **active Aeorian facility** leaking magical energy into the region
- The frigid woe spores are Aeorian bioweapons designed to bypass divine healing
- Salsvault's malfunctioning systems are the **primary source of the Aeorian Echo**
- The facility is attempting to reactivate other sites across Northreach
- This adventure provides the **first major revelation** about the campaign's central threat

**Player Discovery:** Characters should learn that Aeor is real, its ruins are active, and its magic is leaking into the world. This is the campaign's pivotal moment of understanding.

### Setting Integration Notes

This adventure text includes setting-specific names from its original source. For Northwatch Wardens, you have two clean options:

#### Option A: Exandria/Wildemount-compatible (keep the names)

- **Northreach** is a homebrew frontier region.
- **Palebank Village** is a Northreach member settlement on the northeast coast.
- The **unlabeled cave icon** on the player map is **Croaker Cave**.
- The **unlabeled mountain/fortress icon** on the player map is **Salsvault**.
- Names like **Eiselcross**, **Uthodurn**, and **Shadycreek Run** exist “off-screen” as distant places referenced in backstory/trade.

### Option B: Northreach-standalone (use plain-language substitutes at the table)

- **Wildemount** → “the wider world” / “southern trade routes”
- **Uthodurn** → “a southern dwarven-elf holdfast”
- **Dwendalian Empire** → “a southern empire”
- **Shadycreek Run** → “a distant smuggling town”
- **Eiselcross / Foren** → “the icefields north of Palebank” / “the largest ice island”

Either way, the only locations the players need on-map are: **Palebank Village**, **Croaker Cave**, and **Salsvault**.

Something is killing people in Palebank Village, and if the characters don’t stop it, they might be next. “Frozen Sick” is an adventure that takes characters from 1st to 3rd level and introduces them to the continent’s Biting North region—the bleak arctic realms of the Greying Wildlands and Eiselcross.

If your players are using the heroic chronicle to create their characters (see chapter 4 in the Explorer's Guide to Wildemount), work with them to decide how they made their way to Palebank Village. Are they citizens of Uthodurn now aiding in the surface expansion of their civilization? Have they come north to seek freedom from the wars of other lands? Any number of options can help tie characters to this frigid region and the mysteries it holds.

Story Overview
Urgon Wenth, a dwarf explorer, recently returned home to Palebank Village after exploring the icy wastes of Eiselcross for a year. The dwarf brought home several items plundered from ruins on Foren, the largest of Eiselcross’s islands. Among these treasures were two beautiful blue glass vials, which Urgon sold to an elf collector named Verla Pelc. The vials were then stolen, given to a fence out of Shadycreek Run, and sold again to an unsuspecting merchant.

In truth, the vials’ beautiful blue color is the result of deadly blue spores that cling to the interior of the glass. Faint cracks in both the vials have exposed each person who handled them to frigid woe, a deadly disease that can’t be cured by conventional means. The disease has already killed Urgon and Verla, turning them into ice statues. Details on frigid woe are found in the “Eiselcross” section of chapter 3 of Explorer's Guide to Wildemount.

Frigid Woe

Frigid woe is a special disease developed by Aeor’s mages that cannot be cured by conventional treatment or magic. The only way a creature infected with the disease can be cured is by finding and drinking the manufactured antidote, a milky liquid stored in gold vials found in Eiselcross’s ruins. This disease was created to slow down the forces of the gods and get around the healing power of their clerics and angels.

The disease is transmitted by breathing in blue spores that Aeor’s mages created long ago. When a creature comes into contact with these spores, it must succeed on a DC 11 Constitution saving throw or become infected with frigid woe. It takes 1d4 days for the symptoms to manifest in an infected creature. These symptoms include fatigue, chills, and visible blue veins that appear on the creature’s body. The infected creature’s speed is reduced by 5 feet as long as it remains infected. Every 10 days after symptoms appear, an infected creature must succeed on a DC 11 Constitution saving throw, or its speed is reduced by another 5 feet. If a creature’s speed is reduced to 0 as a result of this disease, the creature dies and its body turns into a statue made of ice.

\page


A creature can drink the antidote as an action, ending all symptoms and effects of the disease instantly.

Adventure Summary
While the characters are in Palebank Village, community leader Elro Aldataur asks for their help figuring out who or what has killed Urgon Wenth. An explorer recently returned from Eiselcross, Urgon was afflicted by a strange malady that turned him into an ice statue, and which has since shown up in another of the village’s residents. The characters investigate the mystery while contending with the forces of the Uttolots, one of the criminal families that control Shadycreek Run. More infected locals are discovered, including one more already dead, before the characters clear Uttolot thugs out of a local cavern complex called Croaker Cave. In the end, the vials of frigid woe are reclaimed, but merchant Irven Liel and his family are infected and will be the next to die without a cure. Moreover, the characters might well be infected with the disease themselves.

Elro asks the characters to travel to Eiselcross to seek a cure for frigid woe. The characters take a boat to Syrinlya, the Uthodurnian outpost on Foren, and retrace Urgon Wenth’s path to the ruin of Salsvault. This magic laboratory was once a part of Aeor, an ancient flying city-state that crashed into Eiselcross during the Calamity. Only by braving Salsvault’s defenses and deadly guardians can the adventurers find the antidote they need.

Setup and Starting Points
Work with the players to establish why their characters are in Palebank Village. You can provide information regarding the village and its surrounding lands, all of which are described in chapter 3 of Explorer's Guide to Wildemount.

Before the adventure begins is also the time to figure out if the characters already know each other or if this adventure is the first time they’ve met.


Mystery in Palebank Village
The adventure begins in Palebank Village, with the characters drawn immediately into the drama of death in an isolated settlement. Once the players are ready to begin, read or paraphrase the following to set the scene:

Snow gently falls from the sky and wind bites your cheeks as you stand in the graveyard of Palebank Village, a fishing outpost of Uthodurn that is home to several hundred dwarves and elves. The sun is low in the sky, sinking behind the fresh grave of Urgon Wenth, an old dwarf who caught a curse or disease that turned him into an ice statue. The folk of the village have gathered to pay their final respects to Urgon’s frozen remains.

As part of their characters’ backstories, the players can decide whether any of them knew Urgon or whether they’ve come to the funeral simply to show respect to the folk of the community. Either way, continue by reading the following:

A gruff voice speaks softly from behind you. “Thank you for attending Urgon’s service.” You turn and meet the gaze of Elro Aldataur, a weathered elf, retired ranger, and the leader of the village. “I’m sorry to speak of dark tidings under such circumstances, but I believe that Palebank Village might be in danger, and I’m hoping you can help us.”

Whether the characters are known in the village as neophyte adventurers or simply look the part, Elro (a neutral good, male wood elf veteran) hopes that they’re the sort of people not afraid to step up to help folks in need. Use the following points to help guide the conversation as he explains his concerns to the characters:

Two months ago, Urgon Wenth returned home after exploring Eiselcross for a year. He had been back for only for a few days when he came down with a strange affliction, which made the dwarf move slowly and caused blue veins to appear all over his body.

\page

The village’s priests of Moradin and Corellon used every spell they could muster to attempt to heal Urgon, but nothing they tried could stop the bizarre malady. Urgon battled the affliction for weeks, until his ever-slowing body eventually turned to ice.
Until yesterday, Elro and the rest of the community believed that Urgon’s sad fate was an isolated incident, most likely caused by something the dwarf came into contact with while exploring Eiselcross. Then Elro noticed Tulgi Lutan, a dwarf trapper, showing signs of the same illness.
Alarmed, Elro tried to talk to Tulgi about it, but she pushed him away, asking that he let her die in peace.
Elro’s Request
If the characters are willing, Elro wants them to find out what caused Urgon and Tulgi’s affliction. He’s worried that it could spread, but Tulgi refuses to talk to him, and the Glassblades in the village are better known for their combat skills than their ability to glean the truth in a complicated situation. Moreover, Tulgi is extremely distrustful of the authorities.

Elro thinks a group of adventurers might have better luck convincing Tulgi to talk. If the characters agree to help find the cause of Urgon and Tulgi’s affliction, Elro offers to pay them 100 gp. He suggests that the characters start by searching Urgon’s home or talking to Tulgi at her cabin.

Urgon’s Cabin
Urgon Wenth lived in a one-story, one-room log cabin at the edge of town. A good-natured Glassblade rookie named Mila Teno (a lawful good, female wood elf scout) stands guard outside the front door. If the characters explain why they’ve come, she allows them to enter the house and look around. When the characters enter the cabin, read:

This cramped, dark cabin might have been a cozy place when its owner was alive. Now an unmade bed stands near a cold fireplace, its mantle hung with the head of some snarling white beast with gray horns. On the other side of the room, a small table strewn with dirty dishes and set with a dwarf-sized chair stands before two empty shelves whose contents are scattered across the floor: kitchen utensils, dried foodstuffs, adventuring gear, and a few books.

Any character who examines the mess in the cabin realizes that someone recently trashed the place while searching it. A successful DC 12 Intelligence (Investigation) check reveals the intruder’s footprints. Tulgi Lutan was the culprit, desperate for any clues that might help her cure the frigid woe that is killing her. Her tracks lead outside and back to her cabin (see “Tulgi’s Cabin” below).

Adventuring Equipment
Urgon’s adventuring equipment consists of a silvered maul; a suit of splint armor sized for a dwarf; bulky, fur-lined clothing sized for a dwarf; a grappling hook; and a hooded lantern.

Mounted Head
A character who succeeds on a DC 15 Intelligence (Nature) check recognizes that the head mounted above the mantle belonged to a yeti, a monstrosity found in Eiselcross.

Strange Receipt
A character who searches through the books on the shelf and succeeds on a DC 10 Intelligence (Investigation) check finds a folded receipt used as a bookmark. The receipt is dated two months previous, and indicates that Urgon sold several Aeorian items found in Eiselcross to local antique shop Pelc’s Curiosities for 1,000 gp. The items are listed as a dagger, a scroll case, a jade statuette, a quiver of twenty arrows, a silver ring set with a jasper, and two blue glass vials.

Characters who are residents of Palebank Village or have been there for a while know of Pelc’s Curiosities—and also know that the shop was robbed and vandalized two months ago.

\page


Development
After searching the cabin, the characters can continue their investigation by going to Tulgi’s cabin or by stopping at Pelc’s Curiosities (assuming they found the receipt).

Tulgi’s Cabin
When the characters approach Tulgi’s cabin, read:

This snow-covered cabin looks peaceful and quiet from the outside. Its windows are shuttered, and a steady stream of smoke piping out of the chimney indicates a roaring fire within.

Tulgi Lutan’s home is a one-story, one-room log cabin. Because she isn’t keen on letting the characters in, the following features might be important:

The roof of the cabin is 12 feet high. Climbing up the outside walls requires a successful DC 10 Strength (Athletics) check.
The wooden door to the cabin is locked and has AC 15, 18 hit points, and immunity to poison and psychic damage. The lock can be picked with a successful DC 12 Dexterity check using thieves’ tools, or the door can be forced open with a successful DC 15 Strength (Athletics) check. Tulgi carries the key that unlocks the door.
Each of the cabin’s four walls has one window, which is shuttered and latched from the inside. A window can be unlatched from outside with a successful DC 12 Dexterity check using thieves’ tools.
The inside of the cabin is brightly lit by fires in a brazier and a fireplace, though the smoky haze given off by both makes the interior lightly obscured.
If the characters knock on the door, Tulgi Lutan (a neutral evil, female mountain dwarf thug with a walking speed of 10 feet) calls from the other side, telling them to go away. A character who shouts back through the door and succeeds on a DC 12 Charisma (Deception, Intimidation, or Persuasion) check convinces Tulgi to open the door and allow the party inside. Otherwise, she ignores anything the characters say.

If the characters aren’t invited inside, they’ll have to decide what other means they’re willing to use to enter. Regardless of how they do so, when the characters enter the cabin, read:

The heat in this small cabin hits like a hammer blow. A table set with neatly stacked dishes, tools, and utensils stands at the center of the room. The smell of a simmering soup comes from a pot hanging inside a roaring fireplace. Another fire burns in an iron brazier at the opposite end of the room, filling the cabin with a smoky haze. Shivering at the end of a bed near the brazier is a dwarf wrapped in blankets. Bulging blue veins streak her face, neck, and hands.

If the characters broke into the cabin, Tulgi attacks as soon as she sees them, fighting until reduced to 10 hit points, then surrendering. She has two pet wolves, Iro and Jira, that hide beneath her bed. If a fight breaks out, the wolves join the fray to defend her.

Fire Hazards
Any creature that comes into contact with the brazier or the fireplace for the first time on its turn, or that starts its turn there, takes 2 (1d4) fire damage.

What Tulgi Knows
Tulgi is gruff and to the point, and tries to compensate for her illness with bluster. If the characters entered the cabin with her permission or if she surrenders to them, she tells them only that she has the same affliction that killed Urgon, and that she’s looking for a cure.

A character who succeeds on a DC 12 Charisma (Intimidation or Persuasion) check convinces Tulgi to reveal the following information:

Tulgi came to Palebank Village a few years back from Shadycreek Run with her sister, Hulil. Both work for the Uttolot family.

\page

The Uttolots sent the sisters and a few others to the village to keep an eye on treasures coming back from Eiselcross—with the intent of stealing them. When such artifacts come through the small settlement, they are often unusual goods that treasure hunters are trying to keep away from Uthodurn or the Dwendalian Empire.
When Urgon Wenth returned to Palebank Village with treasures from Eiselcross, Tulgi saw her chance. She waited for Urgon to sell his finds to Pelc’s Curiosities, then stole them all.
Tulgi gave most of Urgon’s relics to Hulil, but kept one for herself—an ornate dagger. She grudgingly gives this weapon to the characters if asked (see “Treasure” below). Hulil has the other items in a site north of the village known as Croaker Cave.
Tulgi was the one who searched Urgon’s cabin, convinced that the dead dwarf must have had magic or other secrets stored away there.
Treasure
If Tulgi doesn’t offer her dagger to the characters, any character with a passive Wisdom (Perception) score of 11 or higher notices the ornate blade in a gilded sheath tucked under her shirt. If the characters claim the +1 dagger, a successful DC 15 Intelligence (Arcana or History) check reveals that the dagger is a relic of the fallen flying city of Aeor.

Development
The characters have no trouble finding either Croaker Cave or Pelc’s Curiosities if either of those locations is their next destination. If things went bad with Tulgi and she died before revealing any information, the characters might find notes or instructions from Hulil revealing some of the information above.

Pelc’s Curiosities
Pelc’s Curiosities is an antique shop run by an introverted elf named Verla Pelc. Verla keeps to herself, opening her shop only when the mood strikes her. She trades any and all objects that interest her, shipping them across Wildemount. Characters who are residents of Palebank Village or have been there for a while know of Pelc’s Curiosities—and also know that the shop was robbed and vandalized two months ago. If the characters are recent arrivals to the village, anyone they ask about the shop mentions the robbery.

Pelc’s Curiosities is a one-story, two-room log cabin. The windows are shuttered and locked from inside, leaving the interior dark. The only entrance is the front door, but characters can force open one of the shutters around the back with a successful DC 12 Strength (Athletics) check, granting access to Verla’s quarters (see that section below).

When the characters approach the cabin, read:

The dark cabin before you has a sign over its door which reads, “Pelc’s Curiosities,” with the image of a curving dragon used to make the letter P. Though the shop appears closed, the front door is slightly ajar.

Any character with a passive Wisdom (Perception) score of 11 or higher hears whispered voices and footsteps coming from inside the cabin. If the characters succeed on a group DC 10 Dexterity (Stealth) check, they can surprise the bandits currently in the shop.

Front Shop Area
The antique shop occupies the large front room of the cabin. When the characters can see into this area, read:

Five cloaked elves appear to have ransacked the shop and are searching through the broken debris on the floor. The furniture, shelves, and front counter have been smashed, and the shop’s wares now litter the floor.

This area is difficult terrain thanks to the debris covering it. The five elves are bandits with darkvision out to a range of 60 feet, advantage on saving throws against being charmed, and immunity to magic that would put them to sleep.

\page


The bandits attack as soon as they notice the characters, fighting until only one remains. That survivor then surrenders. If a captive bandit is questioned, a character who succeeds on a DC 10 Charisma (Intimidation) check can learn the following information:

The bandits work for Hulil Lutan, a dwarf priestess of Tiamat. Hulil works for the Uttolot family of Shadycreek Run.
Hulil’s sister, Tulgi, robbed Pelc’s Curiosities two months ago.
Hulil is sick or cursed with some affliction that causes her to move slowly and is turning her veins blue.
Hulil ordered the bandits to trash Pelc’s Curiosities in search of potions, scrolls, or other items that might help cure her. Despite their thorough search, the bandits found nothing useful. Hulil is hiding out with more bandits in Croaker Cave.
Verla’s Quarters
Verla’s quarters are at the back of the cabin. When the characters gain access to this area, read:

What appears to be an ice statue of an elf is bundled beneath the blankets of a bed along the east wall of the room. A small table loaded with dirty teacups and a kettle stands next to the bed.

The figure in the bed is the unfortunate Verla Pelc, who was infected with frigid woe by Urgon Wenth’s Aeorian relics. Her symptoms appeared a few weeks after the shop was robbed, but the reclusive elf never told anyone about them.

Development

Questioning any of the bandits can turn up solid leads that can take the characters to Croaker Cave, or back to Tulgi’s cabin if there are other questions the dwarf has yet to answer. If they were unable to question the bandits, you can have one of the bandits carrying orders from Hulil that point toward the Croaker Cave hideout.

Croaker Cave
Characters local to Palebank Village or who have spent some time there know Croaker Cave. If all the characters are new arrivals to the village, any of the villagers can tell them about the cave and how to get there.

Croaker Cave gets its name from its resident giant ice frogs. Its entrance is on the shores of the Frigid Depths, due north of Palebank Village. As the characters draw close to the cave entrance, they see frequent signs of tracks where bandits have been coming and going. However, there are no signs of patrols or guards. A plume of smoke rises from the ground beyond the cave entrance, venting through a narrow natural chimney from area C6. The chimney is too small to be climbed, however, and the main cave entrance is the only entry point.

Knowing that the residents of Palebank Village avoid the cave and its dangerous frogs, Hulil Lutan has made the place her base of operations. She and the Uttolot bandits she commands have domesticated the giant ice frogs that make the cave their home, using them as guard animals.

Giant Ice Frogs
With the exception of Old Croaker (see area C5), giant ice frogs are giant frogs with immunity to cold damage.

The blue-skinned frogs attack any creatures in the cave complex not escorted by bandits they recognize. Each fights until reduced to half its hit points or fewer, then flees. A character who succeeds on a DC 15 Wisdom (Animal Handling) check as an action convinces one frog to not attack or to stop attacking. If the character or any of their allies attacks or harms the frog, it resumes combat.

The frogs spend much of their time resting in pools of murky, frigid water in Croaker Cave. A character who succeeds on a Wisdom (Perception) check opposed by a frog’s Dexterity (Stealth) check notices a frog hiding in a pool. If a frog goes undetected, it attacks with surprise when a character comes within 5 feet of the pool.

\page


Uttolot Bandits
The bandits sent out with Hulil by the Uttolot family are all dwarves and elves. Up to ten bandits normally occupy Croaker Cave, but only three are currently present (in area C2). They use the bandit stat block and have darkvision out to a range of 60 feet. In addition, the dwarves have resistance to poison damage and have advantage on saving throws against poison; the elves have advantage on saving throws against being charmed and immunity to magic that would put them to sleep

Uttolot bandits attack any intruders on sight. Each fights until reduced to half its hit points or fewer, then flees the caves. If the characters capture an Uttolot bandit, they can learn the following information with a successful DC 10 Charisma (Intimidation) check:

Hulil is sick with the same malady that killed Urgon Wenth.
She plans on setting out for Shadycreek Run soon, hoping that trading the items her sister Tulgi stole from Pelc’s Curiosities allows her to pay for healing that will cure her.
Croaker Cave Features
The caverns and tunnels of the Croaker Cave complex are shown on map 5.9. Unless otherwise noted in an area’s description, the following features are common throughout all areas of Croaker Cave.


Map 5.9: Croaker Cave
View Player Version
Ceilings
Cavern ceilings are 10 feet high, with only 8 feet of clearance beneath stalactites.

Walls
Climbing the rough walls of a cavern requires a successful DC 12 Strength (Athletics) check.

Light
The caverns contain no light sources, except in area C6, as the inhabitants of Croaker Cave rely on darkvision to see.

Frigid Pools
Pools of murky, frigid water within the caverns are created by melting snow on the rocky ground above dripping down through the ceiling. Each pool is 10 feet deep. A creature completely submerged in a pool must succeed on a DC 10 Constitution saving throw or gain one level of exhaustion. Creatures with resistance or immunity to cold damage automatically succeed on this saving throw. For each minute the creature spends submerged in a pool, it must repeat this saving throw, gaining another level of exhaustion on a failure.

C1. Entrance Pool
This area of the cave is close enough to the entrance that it is dimly lit by day and on clear moonlit nights. When the characters can see into this area, read:

The slow dripping of water sounds out where it falls from stalactites down into a murky pool that fills the rough tunnel ahead. Every few moments, a loud croaking sounds out from somewhere in the darkness beyond.

With darkvision or an appropriate light source, the characters can see a 25-foot-long heavy wooden beam lying against the west wall of the cave at the south end the pool. The Uttolot bandits use the beam to cross the pool, and pull it back to the far side when they are in the cave.

Two giant ice frogs hide in the murky pool. If combat breaks out in this area, the bandits in area C2 quickly come to investigate.

C2. Training Pool
The slow dripping of water from the ceiling flows to a pool in the southwest corner of this cavern. A large wooden bucket with a lid sits near the edge of the pool.

Three Uttolot bandits and two giant ice frogs normally occupy this cavern. If the bandits have not yet been alerted to disturbances, they are training the frogs. Add the following:

A dwarf and two elves bundled in layers of winter clothing are throwing dead bats into the air. Two giant blue-skinned frogs leap up to snatch the bats in midair, seemingly as part of some sort of training session.

\page


If the bandits went to investigate disturbances in adjacent areas, the frogs are hiding in the pool.

Bucket
The bucket holds six dead bats used as training treats. A character who offers a dead bat to a frog has advantage on their next Wisdom (Animal Handling) check made to control that frog’s behavior.

C3. Bat Cavern
This cavern reeks, and its floor is covered in bat guano.

A swarm of bats sleeps among the stalactites in this cavern. If anything disturbs the bats (including a light source or a loud noise in the cavern), the swarm attacks the source of the disturbance. The swarm fights until reduced to half its hit points or fewer, then flees out of the cave complex. If combat breaks out in this area, the bandits in area C2 come to investigate.

Treacherous Floor
The floor of this area is covered in slippery bat guano. Whenever a creature standing on the floor takes damage, it must succeed on a DC 10 Dexterity (Acrobatics) check or fall prone.

C4. Bandit Camp
Ten empty bedrolls are arranged in a circle around a cold fire pit at the center of this cavern. Chicken bones, empty wine and spirits bottles, and other food waste litters the floor.

One of the bedrolls covers the opening of a 10-foot-deep pit trap. The trap can be spotted with a DC 10 Wisdom (Perception) check. If not spotted, anyone walking across the bedroll falls into the pit, taking 3 (1d6) bludgeoning damage and landing prone. A creature that falls into the pit makes enough noise that the bandits in area C2 investigate.

Treasure
Searching all the bedrolls reveals that one contains an unopened bottle of Bald Dwarf Whisky (worth 25 gp), an alcohol made by elves in Uthodurn.

C5. Old Croaker’s Pool
Water dripping down from stalactites in the ceiling fills a dark pool that completely covers the floor of this cavern.

Croaker Cave’s largest denizen—named Old Croaker by the Uttolot bandits—has claimed this pool. It hides in the water and attacks as other giant ice frogs. Old Croaker is a giant toad with immunity to cold damage.

Old Croaker has been trained to ferry Hulil and visitors to her cavern (area C6) across the pool. A character who succeeds on a DC 15 Wisdom (Animal Handling) check to convince Old Croaker to not attack the party can also convince the frog to ferry all the characters across the pool one at a time.

C6. Hulil’s Cavern
When the characters can see into this area, read:

A warm rush of heat comes from a massive fire burning in the center of this cavern, its smoke venting up through a narrow stone chimney. The flames illuminate a rough painting of a five-headed dragon that dominates the north wall. A bedroll is spread out beneath the mural. Near the crackling blaze, a dwarf bundled in a heavy cloak sits on a stone chest beside an elf whose face is covered in dragon tattoos. The dwarf’s face is streaked with pulsing blue veins.

Hulil Lutan (a neutral evil, female mountain dwarf cult fanatic with a walking speed of 15 feet, darkvision out to a range of 60 feet, resistance to poison damage, and advantage on saving throws against poison) and her apprentice, Raegrin Mau (a neutral evil, male wood elf cultist with darkvision out to a range of 60 feet, advantage on saving throws against being charmed, and immunity to magic that would put him to sleep), are both in a state of deep meditation, praying to Tiamat for a cure for the dwarf’s affliction. Even if combat broke out in area C5, they remain unaware of the characters’ presence until they are disturbed or attacked. Hulil and Raegrin are both greedy servants of Tiamat and the Uttolot family. Raegrin follows Hulil’s every order with unshaking loyalty.

\page


Hulil is so desperate for a cure for the ailment that is slowly killing her that she doesn’t attack the characters when she first sees them, as long as she isn’t attacked first. Instead, she orders them to stand down and demands to know why they came to the cave. A quick-thinking character can claim to have come to help Hulil (at the direction of her sister, after receiving a message from Tiamat, or with another appropriate rationale). With a successful Charisma (Deception) check opposed by Hulil’s Wisdom (Insight) check, the character convinces the dwarf that all the characters are her allies. On a failed check, or if the characters challenge her, Hulil and Raegrin attack.

Campfire
Any creature that enters the area of the fire for the first time on its turn, or that starts its turn there, takes 3 (1d6) fire damage.

What Hulil Knows
If the characters convince Hulil that they are her allies, or if they capture her or Raegrin and succeed on a DC 14 Charisma (Intimidation) check, they can learn the following information:

Hulil believes she has a disease called frigid woe. Though she doesn’t know any more about the disease than its symptoms, she’s heard rumors that explorers in Eiselcross sometimes succumb to it.
Hulil has guessed that her affliction was caused by one of the blue vials Tulgi stole from Pelc’s Curiosities, originally sold by Urgon Wenth. The vial was cracked, revealing that its lovely color was the result of a dark blue dust clinging to the interior.
She is desperate to get to Shadycreek Run before the malady runs its course, hoping that she can trade the goods stolen by Tulgi for a cure.
Hulil used one of the vials to trap the chest containing the other stolen items (see “Stone Chest” below). Needing quick cash for the trip, she sold the other vial to Irven Liel, a human merchant staying at the Jolly Dwarf inn in Palebank Village while traveling with his family to Uthodurn.

Stone Chest
The stone chest’s outer lid is carved with the face of a dragon. A character who examines the chest and succeeds on a DC 12 Wisdom (Perception) check finds pin-sized openings in the dragon’s mouth that contain a blue powder. The powder can be removed with a successful DC 15 Dexterity check using thieves’ tools. A character who fails this check must succeed on a DC 11 Constitution saving throw or contract frigid woe (see the “Eiselcross” section of chapter 3 of Explorer's Guide to Wildemount).

A detect magic spell reveals that the chest radiates an aura of evocation magic. When a creature touches the chest without speaking a prayer to Tiamat, a gust of wind escapes the dragon’s mouth. If the blue powder is still in the dragon’s mouth, it forms a cloud that fills a 15-foot cube in front of the chest. Each creature within the area must succeed on a DC 11 Constitution saving throw or contract frigid woe.

Treasure
The chest contains the rest of the treasure found by Urgon Wenth—a gilded scroll case covered in a cosmological map of the multiverse (worth 15 gp), a jade statuette of a storm giant (25 gp), a quiver containing six +1 arrows, and a silver ring set with a jasper stone (50 gp). It also holds Hulil’s wealth—415 cp, 234 sp, 43 ep, and 112 gp—and a receipt indicating that Hulil sold a blue glass vial to Irven Liel for 100 gp.

Development
When the characters are done exploring Croaker Cave, they should know the blue glass vials found by Urgon Wenth are the source of the strange malady that is turning people into ice statues, and that Irven Liel has one of those vials. If the characters don’t have a chance to question Hulil or Raegrin, you can have the chest also contain a journal or notes that provide the information they need and point them toward the Jolly Dwarf inn.

\page


Jolly Dwarf
The Jolly Dwarf is a cozy, two-story inn run by a retired adventurer named Arl Bortock. When the characters enter the inn, read:

The downstairs of this inn features a large taproom. A gray-haired dwarf behind the bar greets you cheerfully as you enter. Two male humans and two tiefling children laugh among themselves as they enjoy a meal together.

Arl Bortock (a neutral good, male, mountain dwarf veteran) works behind the bar. If the characters ask for Irven Liel, the dwarf points them toward the laughing family.

Irven Liel, his husband Fenton Tethwick (both neutral good, male Dwendalian human commoners), and their adopted daughters Honor and Magic (both tiefling noncombatants) are friendly and invite the characters to join them. Irven and Fenton are traveling booksellers. If asked about the vial, Irven explains that they met Hulil Lutan on the road to Palebank Village. She said she was moving and needed to shed some possessions, so she offered him a chance to buy the Aeorian relic at a great price. He plans to sell the item for a profit in Uthodurn.

If the characters tell Irven the truth about the vial, he panics, saying that everyone in his family has touched the object. Fenton gives the vial to the characters, handing it to them wrapped up in a cloth. Any character who touches the vial directly must succeed on a DC 11 Constitution saving throw or contract frigid woe.

Development
Once the characters have the cracked vial, they can report back to Elro Aldataur. He pays them 100 gp as promised but asks the characters to stay in town. He is quite certain he’ll have need of their services again soon.

The next morning, Elro comes to the characters with somber news. Irven, Fenton, Honor, and Magic are all afflicted with frigid woe. Seeing the blue powder in the vial has allowed Elro to consult old lore and learn a few things about the disease. (If the characters didn’t learn the name of the affliction from Hulil, Elro is the source of that name as well.)

Elro knows that frigid woe is said to have only one cure—a milky liquid the Aeorians stored in gold vials. He hopes that the cure might be found in the same place Urgon found the vials of frigid woe in Eiselcross. The retired ranger asks the characters to travel to the islands of Eiselcross and retrace Urgon’s path, hoping they can find the cure. He offers the party 200 gp for the task, and reminds them that time is of the essence for Irven and his family—not to mention for any characters infected with frigid woe. If the characters accept, Elro gives them a day to prepare and tells them to find him at the village docks when they’re ready to set sail.

VIALS OF FRIGID WOE

As an action, a creature can throw a vial of frigid woe up to 20 feet, shattering it on impact and releasing its contents as a cloud of spores. Each creature within 5 feet of the vial when it shatters must succeed on a DC 11 Constitution saving throw or contract frigid woe (see the “Eiselcross” section of chapter 3 of Explorer's Guide to Wildemount).

If a character has contracted frigid woe, track the number of days that have passed so you can inform the player when their character’s symptoms appear and when they need to make Constitution saving throws.


Character Advancement
The characters advance to 2nd level before traveling to Eiselcross.

Traveling to Eiselcross
When the characters are ready to leave for Eiselcross, Elro Aldataur provides them with the following information:

\page


Elro has arranged passage to Eiselcross for the characters on the Remorhaz, a sailing ship owned and operated by the Glassblades.
The characters will be taken to Syrinlya, an Uthodurnian outpost on Foren, Eiselcross’s largest island. Once there, they should talk to a dwarf named Orvo Mustave, who has gone on numerous expeditions into the wilds of Eiselcross with Urgon Wenth.
Once the characters have found the cure, they should use whatever they need for themselves, then give the rest to an elf in Syrinlya who goes by the name “the Buyer.” They can tell the Buyer to teleport the cure to Elro in Palebank Village.
The islands of Eiselcross are covered in ice and snow, and are always well below freezing. Characters who don’t already have cold weather gear will want to purchase it, or they will be subject to extreme cold (see chapter 5 of the Dungeon Master’s Guide).


Sailing to Eiselcross
NPCs Infected with Frozen Woe
The characters are in a race against time to cure Irven and his family (and possibly Hulil and Tulgi Lutan, if the characters are feeling merciful toward those two hardened criminals). Irven and his family have at least sixty days before any of them might die, Hulil has at least thirty days, and Tulgi has at least twenty days. You can make saving throws for these NPCs against the disease every ten days, or you can just decide their final fates.

Voyage of the Remorhaz
It takes the Remorhaz nine days to get to Syrinlya. This trip could be uneventful, or you could populate the ship with interesting NPCs and have the characters encounter ocean monsters, Revelry pirates, or severe weather.

When the ship reaches Syrinlya, read:

The temperature has steadily dropped since you left Palebank Village, yet it seems to grow colder still as you step off the ramp of the Remorhaz onto Foren. Through windy snow, you can see fur-lined tents and yurts arranged in a large camp. Campfires are whipped by the wind, with dwarves and elves huddled close to the flames.

“Don’t worry! It’ll cool down here eventually!” a joking voice bellows over the snow. A female dwarf with a shaggy mane of unkempt hair bows to you. “Morgo Delwur at your service. Welcome to Eiselcross!”

Morgo Delwur (a neutral good, female mountain dwarf werebear) has lived in Syrinlya for years. She can show the characters around and answer any questions they have about the settlement, providing any of the details found in chapter 3 of Explorer's Guide to Wildemount. If the characters ask about Orvo Mustave or the Buyer, Morgo points out where both live. Though Morgo never adventured with Urgon Wenth and wasn’t a close friend, she is sad to hear of the dwarf’s passing.

Morgo and the other explorers in Syrinlya know about frigid woe and the disease’s terrible effects. If the characters have any unanswered questions about the disease, the explorers share what they know.

Syrinlya
As Morgo leads the characters through Syrinlya, read:

Morgo gestures to the groups of dwarves and elves huddled and chatting around campfires. “They’re planning expeditions to find Aeor’s lost treasures,” she says. “That’s what this whole place is about. If you ain’t exploring, you ain’t banking gold.”

The dwarf stops in front of a large fur-lined yurt. “You can stay here. Belonged to a fool rich elf named Bertron who came here looking for adventure. He found the inside of a saber-toothed tiger instead. Should be some food and the like in there. It’s yours now.”

Bertron’s Yurt
The characters are welcome to this yurt during their time in Syrinlya. When they first enter, read:

\page


The sound of wind and the biting cold die down as you enter the yurt. A cold fire pit marks the center of the hide-covered floor. An open crate containing packaged rations and a few other items stands next to the door.

Once the characters are settled, Morgo wishes them luck and leaves to prepare for an expedition of her own (see the “Can You Help Us?” sidebar). The crate contains 50 days of rations, a 50-foot silk rope, a blanket, a grappling hook, a miner’s pick, and a book titled Adventure Sexy: Impress Potential Lovers with Great Deeds by Scanlan Shorthalt.

CAN YOU HELP US?

If the characters feel as though they need help traveling the wilds of Foren, they can try to convince other explorers in Syrinlya to travel with them to recover the cure. Although most of Syrinlya’s explorers are willing to help others in need, those explorers already have an important mission. An expedition led by Professor Gulrim Shalebrow (see “The Diarchy of Uthodurn” in chapter 2 of Explorer's Guide to Wildemount) went to search for the origin of the strange magic in the region of Mutalos months ago and has not returned. The explorers at the camp are preparing a search and rescue mission to bring back Gulrim’s party. If the characters survive their quest into Salsvault, this story could serve as a hook for another adventure.

The Buyer
Morgo Delwur or any other resident of Syrinlya can point out the Buyer’s hut to the characters. It is Syrinlya’s largest yurt. When the characters enter, read:

The pungent scent of incense fills this yurt, whose walls are painted with glowing arcane runes. A brass brazier burns brightly at the center of the floor, around which are set a few plush chairs, a bed, and a large stone chest. On one of those chairs sits an elf reading a book. A small dragon with green butterfly wings is curled in the elf’s lap.

The Buyer (lawful neutral, nonbinary, high elf mage) is a mysterious elf who purchases Aeorian relics in Syrinlya for the Uthodurnian government. See the “Syrinlya” section of chapter 3 of Explorer's Guide to Wildemount for more information about the Buyer and their business. The green faerie dragon is Dew, the elf’s familiar.

The Buyer has been in Syrinlya since the day the outpost was founded. They can answer any questions the characters might have about the outpost’s history, the island of Foren, or frigid woe. If the characters want to confirm that the Buyer is able to quickly send the cure for frigid woe to Palebank Village, the elf tells them that the stone chest in the yurt has the magical capability to teleport objects on command.

In addition to the aid they provide in getting the cure back to Palebank Village, the Buyer offers to purchase any Aeorian relics the characters want to sell.

Stone Chest
A detect magic spell reveals that the chest radiates an aura of conjuration magic. When an item is placed in the chest, the Buyer can teleport it to secret locations in Uthodurn or its outpost of Palebank Village, with those locations known only to the authorities of those settlements.

Orvo Mustave
Morgo Delwur or any other resident of Syrinlya can point out Orvo Mustave’s tent to the characters. When the characters approach the tent, read:

A campfire burns in front of this small tent, whose flaps are open. Inside the tent sits a young dwarf whose face is scarred as though scratched by a large claw. A shortsword is casually laid across his lap as he warms his outstretched hands.

\page


Orvo Mustave (a chaotic good, male mountain dwarf scout) is a curious and soft-spoken explorer. He enjoys uncovering the secrets of Eiselcross as much as he does uncovering the region’s treasures. He is genuinely interested in the characters’ lives, and asks them lots of questions after inviting them to share his fire.

Orvo’s Story
Orvo is grief-stricken to hear about the demise of his friend Urgon Wenth. If the characters ask Orvo about the blue vials that brought disease to Palebank Village, Orvo shares the following information:

Orvo and Urgon found the blue vials in Salsvault, an Aeorian ruin partially submerged in water in a region of Foren where the glacial ice is thin. Explorers call this region Thin Sheets. Orvo believes the ruin is as well preserved as it is because the structure was reinforced with magic, as were many of Aeor’s buildings that housed hazardous materials or secret projects.
Salsvault is two hundred miles northwest of Syrinlya. Ice mephits are drawn to the magic of something at that location. Orvo and Urgon found the ruin after following one of the creatures.
Salsvault appears to have been an Aeorian lab. Orvo and Urgon explored only three of its chambers before being chased away by animated suits of armor.
The dwarves didn’t know what the vials contained.
Orvo sold his share of the treasure from Salsvault to the Buyer. Urgon decided to hang onto his share until he returned home to Palebank Village.
Into the Wilds
After speaking with Orvo, the characters can make whatever preparations they need before heading into the wilds of Eiselcross. If they wish to obtain more supplies before setting out, there are no shops in Syrinlya, but many of the explorers at the camp are willing to trade goods and equipment.

Overland Travel
The characters must travel two hundred miles over ice and snow to reach Salsvault, the ruin where Urgon Wenth found the vials of frigid woe. It’s up to the characters whether they want to move at a fast, medium, or slow pace (see “Movement” in chapter 8 of the Player’s Handbook). If any character has a walking speed of less than 25 feet because of a frigid woe infection, use the Reduced Travel Speeds table to determine how far the party can travel in a day.

Reduced Travel Speeds
Slowest Character Speed	Slow Pace	Medium Pace	Fast Pace
15–20 ft.	12 miles	18 miles	24 miles
5–10 ft.	6 miles	12 miles	18 miles
As the characters travel, use the Encounters in Eiselcross section to generate random encounters.

Eiselcross Encounters: Levels 1–4
d6	Encounter
1	The characters encounter 1d4 wildfolk scouts hunting a saber-toothed tiger. The scouts are out of arrows and willing to trade equipment and information to replenish their ammunition.
2	The characters encounter a lost Cerberus Assembly mage trying to return to Balenpost. The rest of the mage's team died in the ruins of Aeor, and there is a 50 percent chance the mage carries a recently recovered Aeorian item.
3	The characters find a griffon with an arrow in its wing that prevents it from flying. A character who succeeds on a DC 15 Wisdom (Animal Handling) check can approach the griffon without being attacked. Such a character can remove the arrow, restoring the griffon's ability to fly, after which the griffon allows the character to ride it as a mount for the next 1d10 days.
4	The characters encounter the revenant of a dead explorer from Balenpost who was murdered by one of its team and is looking for vengeance.
5	The characters find a 3-foot-tall, 50-pound egg. If they keep the egg in a cold environment for 1d10 weeks, a white dragon wyrmling hatches from it.

\page

6	A young remorhaz ambushes the characters.
After traveling forty miles, the characters enter Thin Sheets. This region is known for its large patches of thin ice over deep, frigid water (see the rules for frigid water and thin ice in chapter 5 of the Dungeon Master’s Guide).

Finding Salsvault
When the characters have traveled two hundred miles, one character who acts as a scout for the group should make a DC 15 Wisdom (Survival) check each day. On a failure, the character finds no signs of Salsvault. On a success, the character finds the trail of an ice mephit, which leads to Salsvault after a journey of 1d4 hours. If the check succeeds by 5 or more, the character finds Salsvault directly.

Salsvault
Salsvault was once a laboratory in the city of Aeor, where mages who specialized in necromancy and transmutation magic crafted constructs and diseases to be weaponized against their enemies. Many of the laboratory’s creations remain active, still guarding the diseases and treasures within.


Approaching Salsvault
As the characters approach Salsvault, read:

Through wind-whipped snow and biting cold, you notice a half-submerged, dark-blue stone building poking up through the ice. A gray stone door is carved to look like a face with a half-exposed skull. Scribed above the door is the word “SALSVAULT.”

Ziro and Glacies, two ice mephits, hide near the entrance to Salsvault, waiting for someone to open the door. A character with a passive Wisdom (Perception) score of 13 or higher notices the mephits. If any characters interact with the mephits, they attack in response. If the characters don’t notice the mephits, the creatures follow them inside Salsvault, attracted to the frigid woe within. The first time the characters enter an area containing vials of frigid woe, the mephits seek out and break the vials, reveling in releasing the cold-based magical energy within.

Sealed Entrance
The entrance to Salsvault is frozen shut. The characters can force the door open with a successful DC 15 Strength check or by dealing 10 bludgeoning or fire damage to the ice that seals the door. Unsealing the door with bludgeoning damage draws the attention of two suits of animated armor in area S3, which gather in area S1 and attack the characters as soon as they enter.


Map 5.10: Salsvault
View Player Version
Salsvault Features
The locations in Salsvault are detailed on map 5.10. Unless otherwise noted in an area’s description, the following features are common throughout all areas of Salsvault.

Ceilings
The ceilings in Salsvault’s rooms are 10 feet high, with 8-foot-high doorways connecting them.

Chests
Stone chests two feet on each side are built into the floors in several areas. A detect magic spell reveals a faint aura of abjuration magic radiating from each chest. A chest has AC 17; 27 hit points; resistance to bludgeoning, piercing, and slashing damage; and immunity to poison and psychic damage.

If an area’s description notes a locked chest, the chest’s lock can be picked with a successful DC 15 Dexterity check using thieves’ tools or forced open with a successful DC 18 Strength check. Ferol Sal (see area S17) carries a master key that locks or unlocks all chests in Salsvault.

Doors and Walls
Salsvault’s heavy doors are made of black stone, and its walls are made of blue stone. A detect magic spell reveals a faint aura of abjuration magic radiating from the doors and walls. Each door and each 10-foot section of wall has AC 17; 27 hit points; resistance to bludgeoning, piercing, and slashing damage; and immunity to poison and psychic damage.

If an area’s description notes a locked door, the lock can be picked with a successful DC 15 Dexterity check using thieves’ tools, or the door can be forced open with a successful DC 18 Strength check. Ferol Sal (see area S17) carries a master key that locks or unlocks all the doors in Salsvault.

\page


Aeorian Robes
The undead in the complex wear archaic-looking robes. With a successful DC 12 Intelligence (History) check, a character recognizes the robes as being of Aeorian style. The characters can also find intact robes of the same style in the complex. Constructs and zombies in the complex don’t attack a character wearing intact robes, unless the character attacks first.

Eastern Slope
Salsvault is tilted in the ice, with its east side lower than its west side. Every area within the complex features a gentle slope downward to the east.

Light
Unless otherwise noted, wall sconces with continual flame spells cast on them brightly light the interior of Salsvault.

Temperature
Though Salsvault’s interior is guarded from wind and snow, the temperatures within the structure are still well below freezing.

Water
Some areas of Salsvault are partially filled with seawater flowing in from beneath the ice of Thin Sheets. A creature that starts its turn in the frigid water must succeed on a DC 10 Constitution saving throw or gain one level of exhaustion. Creatures that lair within the water in the complex are immune to this effect.

Denizens of Salsvault
Many of the creatures the characters can encounter in Salsvault have similar characteristics and tactics.

Beasts
Several sea creatures haunt the submerged areas of the complex. These beasts attack characters who enter the water, fighting until reduced to half their hit points or fewer before fleeing.

Constructs
When Salsvault crashed into Foren, a number of its construct guardians survived. Those constructs continue to guard the complex, fighting intruders until they flee Salsvault. The constructs won’t leave the complex willingly and won’t pursue characters who do so. The constructs don’t attack the undead of Salsvault, understanding on some level that those undead are the remains of the people who created them.

Undead
The humanoids working in Salsvault died when it crashed into Foren. Just before impact, Ferol Sal, the necromancer in charge of Salsvault, released an experimental disease that caused any humanoids who died in the complex to return as undead. Most of those affected returned as zombies that attack intruders on sight and fight to the death. Ferol returned as a wight and has continued to work obsessively in his personal lab (area S17) ever since. Because of the cold here, all the undead are relatively well preserved.

S1. Entrance Chamber
The heavy stone walls of this room dampen the cold and the howling wind outside. An inscription in what looks like Draconic runes is carved into the east wall.

The inscription is in an archaic version of Draconic that was spoken in ancient Aeor. It can be read by any character who can read Draconic with a few minutes of study, or by anyone with access to a comprehend languages spell or similar magic. The message reads: “Welcome to Salsvault! Visitors, please wait here for an escort, and DO NOT TOUCH ANYTHING WITHOUT PERMISSION.”

If the characters make any noise louder than a whisper in this chamber, the suits of animated armor in area S3 come to investigate.

Locked Door
The door that leads to area S4 is locked (see “Salsvault Features,” at the beginning of this section).

Open Door
The door that leads to area S2 is slightly ajar. A character who examines the door and succeeds on a DC 10 Intelligence (Investigation) check notes that it was recently forced open (by Urgon and Orvo when they explored Salsvault).

S2. Ransacked Frigid Woe Laboratory
Stone tables lie in pieces on the floor at the east end of the room. Two open stone chests stand against the west wall. A layer of fine sand coats the inside of the chests and the floor around them.

\page


If the characters make any noise louder than a whisper in this chamber, the suits of animated armor in area S3 investigate the noise.

Any examination of the chests reveals that they are built into the floor. A character who examines the sand on the ground near the chest and succeeds on a DC 12 Wisdom (Perception) check notices two sets of dwarf-sized boot prints (from Orvo and Urgon) as well as two sets of boot prints made by human-sized feet (the animated armor from area S3).

S3. Animated Armor Laboratory
Pieces of rusty plate armor are scattered about this chamber amid the rubble of destroyed stone furniture. An anvil built into the floor stands in front of a cold furnace to the southwest. Across the room from the furnace, two humanoid feet stick out from a pile of rubble.

Two suits of animated armor normally stand guard in this chamber. If the armor didn’t leave to investigate disturbances in areas S1 or S2, both suits are here when the characters arrive, and you can add the following:

Two full suits of steel armor stand upright but empty in the middle of the chamber, their gleaming surfaces a stark contrast to the rusty pieces lying nearby.

Rescue Mission
One of the blacksmiths who worked in this chamber was crushed by a stone table that broke into rubble when Salsvault crashed into Foren. Since then, the blacksmith has been a zombie restrained beneath the rubble and unable to break free. Any character who examines the feet notices them twitching with a successful DC 12 Wisdom (Perception) check.

If the characters want to help the “victim” under the rubble, one character can remove enough rubble to free the zombie in 10 minutes. Multiple characters working together can reduce the time proportionately. As soon as it is freed, the zombie attacks.

Treasure
The zombie wears an apron containing a set of damaged mithral smith’s tools (worth 50 gp).

S4. Frigid Woe Laboratory
Smashed stone tables litter the floor in this chamber. Two stone chests built into the floor stand next to each other along the far wall. A door to the west is inscribed with words in Draconic runes. A large iron lever is flipped into the up position on the wall next to the door.

The inscription in archaic Draconic reads: “Disease storage. Authorized personnel only.”

Chests
These stone chests are locked (see “Salsvault Features” at the beginning of this section) and magically trapped. When a creature makes a failed attempt to pick the chest’s lock, or attacks or attempts to force the chest open, the chest shoots a beam of cold energy at the creature. The beam is +4 to hit and deals 4 (1d8) cold damage on a hit.

A character who searches the exterior of either chest and succeeds on a DC 13 Wisdom (Perception) check finds an archaic Draconic word for “ice” carved in tiny letters near the hinges. With a successful DC 10 Intelligence (Arcana) check, a character senses that the inscription is connected to a trap. Scratching out the inscription with a tool or a weapon causes the trap to stop functioning on that chest.

Each chest is packed with fine sand, within which are nestled two vials of frigid woe (see the “Vials of Frigid Woe” sidebar earlier in this adventure).

Iron Lever
A character who examines the lever notices spots of faded red paint on it with a successful DC 13 Wisdom (Perception) check. As an action, a creature can pull the lever down, causing flames to shoot down from the ceiling in area S5. Even with the door closed, a hiss can be heard in this area when the flames are active. A creature can use an action to push the lever back up, which shuts off the flames. See area S5 for more information on this hazard.

\page


Locked Doors
The doors from this area to areas S1 and S5 are locked. The door to area S5 is also trapped.

Trapped Door
A detect magic spell reveals an aura of conjuration magic radiating from the locked door to area S5. When a creature makes a failed attempt to pick the door’s lock, or attacks or attempts to force the door open, that creature is teleported into the middle of area S15.

A character who searches the door and succeeds on a DC 13 Intelligence (Investigation) check finds an archaic Draconic word for “disappear” carved in tiny letters near the foot of the door on both sides. With a successful DC 10 Intelligence (Arcana) check, a character senses that the inscription is connected to a trap. Scratching out either inscription with a tool or a weapon causes the trap to stop functioning.

S5. Disease Storage
If the iron lever in area S4 has been raised, read the following when the door to this room is opened:

A wave of heat hits you from the wall of roiling flame that fills this area, shooting down from the ceiling.

If the flames are off, read:

The only things to be seen in this room are eight chests built into the floor along the far wall.

If the flames are active, each creature that enters this area or starts its turn there must make a DC 12 Dexterity saving throw, taking 4 (1d8) fire damage on a failed save, or half as much damage on a successful one.

If the flames aren’t active, a character who succeeds on a DC 13 Wisdom (Perception) check notes a faint oily smell in the room and notices pin-sized holes covering the ceiling.

Chests
Each chest is locked (see “Salsvault Features” at the beginning of this section), packed with fine sand, and contains three vials of frigid woe (see the “Vials of Frigid Woe” sidebar earlier in this adventure).

S6. North Hall
Three human zombies in tattered Aeorian robes roam this hall aimlessly and attack intruders on sight.

S7. Unoccupied Dorm
Four unmade beds are built into the east and west walls here, each with a footlocker tucked beneath it.

One of the footlockers holds an intact Aeorian robe (see “Salsvault Features” at the beginning of this section).

S8. Ruined Dorm
Salsvault’s crash into Foren destroyed the magic torches in this room, leaving it shrouded in darkness. When the characters can see into this area, read:

Debris from broken stone furniture covers the floor. The walls here are cracked, as if they once supported built-in shelves that have been reduced to rubble.

The floor of this chamber is covered in rubble, making it difficult terrain. A rug of smothering is hidden beneath the rubble. A character with a passive Wisdom (Perception) score of 12 or higher notices the rug, but gets no hint that it is animated.

A search of the rubble and a successful DC 14 Wisdom (Perception) check turns up an intact Aeorian robe (see “Salsvault Features” at the beginning of this section).

S9. Zombie Dorm
When the characters can see into this area, read:

Footlockers are tucked beneath four beds attached to the north and south walls. In the middle of the room, four zombies in tattered robes shuffle around, softly knocking into one another without caring.

The four zombies attack as soon as they see intruders. The footlockers are empty.

S10. Ferol Sal’s Chamber
The door to Ferol Sal’s personal quarters is locked. When the characters can see this area, read:

This room is in immaculate condition, apparently having been cleaned up after the destruction seen elsewhere in the complex. A crisply made bed stands at the center of the west wall, with small tables off to either side. The room also contains a stone desk set with a chair, and a chest built into the floor.

\page


Though the undead Ferol no longer sleeps here, he and the zombies tidied up his personal space after Salsvault crashed into Eiselcross.

Chest
The chest contains Ferol’s treasure (see below), along with a swarm of undead snakes that attacks any creature that opens the chest. The swarm uses the stat block for a swarm of poisonous snakes, with these changes:

The swarm is made of Tiny undead that don’t require air, food, drink, or sleep.
The swarm has immunity to poison damage and the poisoned condition.
Desk
Any search of the desk turns up a bottle of dried ink, several used quills, five sheets of blank parchment, and a piece of paper with a faded message written on it in archaic Draconic. A character who understands Draconic can spend a few minutes to piece together the meaning of the note, or it can be deciphered with a comprehend languages spell or similar magic. The note reads:

To whomever finds this:

All my people are dead: my family, my friends, and my workers. I, too, am dead. Were it not for my quick thinking and prowess with necromancy, our important work at Salsvault would be over. I continue to labor in my undead form, trying to find a sickness that can infect the gods themselves. If I have perished, I implore you to find my lab, find my notes, and finish my work. The gods must pay for Aeor’s destruction.

—Ferol Sal

Treasure
The chest contains 1,006 sp, 45 ep, and 201 gp in Aeorian coinage.

S11. Kitchen
Salsvault’s crash into Foren destroyed the magic torches in this room, leaving it shrouded in darkness. When the characters can see into this area, read:

Iron pots, pans, utensils, and frost-covered food covers the floor of this kitchen. A steel stove is built into the west wall.

When the characters enter the room, four animated kitchen knives fly up from the floor and attack. The knives are flying swords, with these changes:

Each knife is a Tiny construct with 12 (5d4) hit points and a challenge rating of 1/8 (25 XP).
Instead of a longsword attack, each knife makes a melee attack (+4 to hit) that deals 3 (1d4 + 1) piercing damage on a hit.
Old frozen cheese, bread, meat, and produce cover the floor, all well rimed and inedible.

S12. Dining Hall
The remains of broken tables and chairs are piled along the east wall. Two human zombies in tattered robes shuffle aimlessly around each other at the center of the chamber.

The two zombies occupying the dining hall attack any intruders. All the other features of this room have been reduced to rubble.

S13. Drowned Library
Water ebbs and flows through a large opening along the east wall of this ruined library. Rotting parchments and waterlogged tomes are spread everywhere, fallen from cracked stone shelves.

The water is deeper than it appears beneath the ruined books and parchments, with the floor along the eastern side of the room having collapsed to a depth of 15 feet. A giant octopus hides here, having claimed this room as its lair. A character who succeeds on a Wisdom (Perception) check opposed by the octopus’s Dexterity (Stealth) check notices the beast. See “Salsvault Features,” earlier in this section, for the effects of entering the water.

Treasure
A character with a passive Wisdom (Perception) score of 12 or higher, or one who succeeds on a DC 12 Wisdom (Perception) check, notices a watertight scroll case floating in the water. The case holds two spell scrolls of detect magic.

S14. South Hall
Three well-preserved human zombies in tattered robes roam this hall aimlessly, attacking any intruders that catch their attention.

\page


S15. Animated Weapon Storage
The door to this room is locked. When the characters can see into this area, read:

Broken blades, cracked hammers, frost-rotted spears, and other ruined weapons are spread out across the floor, fallen from the empty iron weapon racks that line the walls.

The mages of Salsvault stored animated weapons in this room, most of which were destroyed in the crash. Five flying swords lay among the debris, attacking any characters who enter.

The broken weapons on the floor make this area difficult terrain. Any creature that falls prone in this room takes 2 (1d4) piercing damage.

S16. Golem Laboratory
As the characters approach this room, read:

A large red X is painted across the stone door before you. Violent banging and the sound of heavy objects being tossed around emanates from the chamber beyond.

The door is locked. If the characters open it, read:

As you open the door to this debris-filled room, a humanoid creature made of pieces of stitched-together flesh charges toward you. The monster’s body is covered in wounds, and broken pieces of bone stick through its skin at odd angles.

When Salsvault crashed into Foren, this golem servant of the mages was driven mad from the damage it took. Ferol locked the golem in this room ages ago. The golem uses the flesh golem stat block, with these changes:

The golem has 5 hit points remaining, and its Berserk trait is activated.
The golem has the use of only one arm and can’t use its Multiattack. Its challenge rating is 1 (200 XP).
Debris
The golem has long since smashed all the objects in this chamber not destroyed by Salsvault’s crash. Any search of the debris turns up only bits of bone, clay, iron, stone, and paper.

S17. Ferol’s Laboratory
Six long stone tables are set with steel and glass laboratory equipment in this chamber, whose walls are lined with shelves holding all manner of strange knickknacks and tools. An armed humanoid with white skin and red eyes moves from table to table, adjusting bubbling mixtures and carefully adding reagents.

The undead Ferol Sal has worked tirelessly in the laboratory for centuries, obsessed with crafting a disease that can kill the gods. Despite having made no progress in all that time, he keeps working. Ferol is a wight with an Intelligence of 16 (+3).

Roleplaying Ferol
Ferol knows nothing of Exandria’s history since Aeor’s crash, and his memory of the distant past is almost as hazy. His transformation into a wight and the centuries of solitude since have driven him quite mad. He cares only about taking revenge on the gods—who he incorrectly assumes are still active in Exandria. As a resident of Aeor, Ferol doesn’t speak Common, though he can communicate in the archaic Draconic of Aeor, as well as an archaic form of Elven. Characters who speak Draconic or Elven can communicate with him, albeit slowly.

When Ferol notices the characters, he demands to know what they’re doing in Salsvault. Any character who claims they have come to help Ferol with his work and succeeds on a Charisma (Deception) check opposed by the wight’s Wisdom (Insight) check earns the undead’s trust. The check is made with advantage if characters who found and were able to read the note in area S10 mention Ferol’s plans to craft a god-killing disease.

If Ferol trusts the characters, he tells them to stay away from the locked golem lab (area S16). If they ask about the cure for frigid woe, he tells them they can find it locked in a chest in what he calls the curative laboratory (area S18). A character who succeeds on a DC 15 Charisma (Persuasion) check can convince Ferol to provide the key that safely unlocks the chest.

\page


If the characters don’t earn Ferol’s trust, the wight attacks, fighting until destroyed.

Ferol’s Keys
Ferol carries two keys: one that works all the doors in Salsvault and another that works all the chests built into the floor within the complex (see “Salsvault Features”).

Shelves
The shelves hold spell components, reagents, and laboratory supplies that are far past their prime. However, a character who spends a few minutes searching the shelves can collect enough workable tools and reagents to put together a set of alchemist’s supplies.

Tables
Each table holds a working set of alchemist’s supplies that Ferol uses to experiment with frigid woe. If a creature is forcibly moved into a table, the delicate equipment on that table breaks and the creature must succeed on a DC 11 Constitution saving throw or contract frigid woe.

S18. Drowned Curative Laboratory
A cold wind howls through the collapsed east wall of this huge chamber, whose far side is completely submerged under frigid seawater. A dense bed of kelp grows up from the submerged floor, obscuring any sight of what lies below. Broken glass and the remains of shattered tables cover the floor in the dry section of the room.

Aeorian mages worked in this chamber to ensure that they could cure the diseases they created. Four giant crabs now lair here, hiding beneath the kelp in the 5-foot-deep water and attacking any creatures that intrude. A character with a passive Wisdom (Perception) score of 14 or higher notices the crabs, which attack with surprise if not spotted. See “Salsvault Features,” at the beginning of this section, for what happens if characters enter the frigid water. Additionally, the kelp makes the water difficult terrain for creatures other than the giant crabs.

Chest
A character with a passive Wisdom (Perception) score of 11 or higher notices a stone chest built into the floor and submerged in the water against the back wall. The chest is locked (see “Salsvault Features” at the beginning of this section).

Kelp
The kelp counts as difficult terrain.

Treasure
The chest is packed with fine sand and contains twenty doses of frigid woe antidote (see “Eiselcross” in chapter 3 of Explorer's Guide to Wildemount) and an ersatz eye (see chapter 6 of Explorer's Guide to Wildemount).

Concluding the Adventure
You can roll for random encounters on the way back to Syrinlya (see “Encounters in Eiselcross”), or you can allow the characters an uneventful trip as reward for a job well done. When the characters arrive in Syrinlya, they can arrange for the Buyer to teleport the antidote for frigid woe to Palebank Village. After doing so, the elf pays out the 200 gp reward on behalf of Elro Aldataur.

If the characters don’t successfully recover the frigid woe antidote in time to save Irven and his family, all four family members succumb to the disease. If the characters are successful, they have the thanks of Elro Aldataur, Irven and his family, the people of Palebank Village, and the explorers of Syrinlya.

Character Advancement
At the end of this adventure, the characters reach 3rd level. This might mark the beginning of a campaign in the Biting North. In particular, the Buyer suggests that the characters could easily find their fortunes exploring Eiselcross. Alternatively, their success in this mission might inspire the characters to seek out new realms and new adventures elsewhere in Wildemount.

\page
<!-- FILE_END: ../Season 1/Adventures/Frozen Sick/Frozen Sick.md -->

## The Wild Sheep Chase

<!-- FILE_START: ../Season 1/Adventures/The_Wild_Sheep_Chase_V2/892902-The_Wild_Sheep_Chase_V2.md -->
The Wild Sheep Chase

A fourth/fifth level adventure for D&D 5E

## Northwatch Wardens Integration (DM)

**Campaign Connection:** This adventure shows **magic destabilizing** across the frontier. The Wand of True Polymorph's malfunction is a symptom of the Aeorian Echo affecting magical items and spellwork.

**DM Secret Resources:** For the truth behind this adventure, see:
- **[World Building/DMEyesOnly/Places_Secrets.md](../../../World%20Building/DMEyesOnly/Places_Secrets.md)** - "Noke's Tower: The Wizard's Arsenal" section
- **[World Building/DMEyesOnly/Northreach.md](../../../World%20Building/DMEyesOnly/Northreach.md)** - Adventure integration details
- **[World Building/DMEyesOnly/The_Aeorian_Echo.md](../../../World%20Building/DMEyesOnly/The_Aeorian_Echo.md)** - Campaign arc context

**Key Secrets:**
- **Shinebright (Finethir) is not who he appears to be**—he's a dedicated Aeorian researcher preparing countermeasures
- The "accident" was actually a **deliberate test** of bio-transmutation magic
- Shinebright knows the full truth about the Aeorian Echo and is working to stop it
- His tower contains extensive Aeorian research in a hidden basement
- If players earn his trust, he becomes a crucial ally with maps, translations, and protective magic

**Player Discovery:** This should feel like comic relief at first, but perceptive players may notice Shinebright knows more than he admits. Successfully helping him is the first step toward earning his trust.

---

\page

# DM Notes: The Wild Sheep Chase

## Adventure Overview

**Theme:** Magic behaving unpredictably — the Aeorian Echo is destabilizing artifacts and spells

**Core Tension:** A wizard has been polymorphed into a sheep by his rogue apprentice wielding an unstable Wand of True Polymorph. Can the party restore him before he's eaten or permanently transformed?

**Level Range:** 1-2 (or 4-5 in original version; easily scalable)

**Expected Duration:** 3-4 hours (excellent one-shot or palate cleanser)

**Key NPCs:**
- **Finethir Shinebright (The Sheep)** — Polymorphed wizard, cultured and desperate
- **Ahmed Noke** — Evil apprentice, wielding unstable wand, power-hungry
- **Guz** — Half-orc enforcer, loyal but dim-witted
- **Polymorphed Assassins** — Wolves and bear (transformed humans hunting Shinebright)

## Central Mystery (Aeorian Echo Connection)

**This is the DESTABILIZATION adventure** — Magic itself is becoming unreliable.

**The Setup:**
- Noke's Wand of True Polymorph **malfunctioned** due to Aeorian Echo interference
- The wand now causes *unpredictable* transformations (intended effect: kill Shinebright; actual effect: turn him into sheep)
- Noke has been experimenting with the wand's instability, creating an army of polymorphed minions
- The wand is increasingly unstable and may explode or cause wild transformations
- This is happening **everywhere** — magical items across Northreach are misbehaving

**What Players Should Learn:**
1. Magical artifacts are destabilizing (not just awakening creatures or spreading disease)
2. Even "safe" magic (like polymorph wands) can malfunction catastrophically
3. The Aeorian Echo's effects are unpredictable and varied
4. Wizards and artificers are in danger if their tools turn against them

**What Remains Hidden (for future campaigns):**
- Why the Echo destabilizes magic (interference from Aeorian anti-divine frequencies)
- How widespread the magical malfunctions are (it's worse than anyone knows)
- Whether this can be reversed or only mitigated

## Common DM Pitfalls

### 1. Taking It Too Seriously
**Problem:** This is a **comedy adventure**. If played too darkly, it loses charm.

**Solution:**
- Emphasize absurdity: a sheep carrying a scroll, polymorphed assassins, wizard tower chaos
- Use silly voices: Shinebright bleats mid-sentence, Guz speaks in grunts, Noke is hammy villain
- Let players embrace the ridiculousness: "We're rescuing a sheep-wizard from a bear-man and wolf-people!"
- Reward creative solutions: Distract enemies with actual sheep, polymorph Noke back, etc.

### 2. Shinebright Is Too Helpless
**Problem:** If Shinebright is just cargo, players lose engagement.

**Solution:**
- Give him personality: snobbish, complains about hooves, insists on being called "Master Shinebright"
- He can cast cantrips (minor illusion, mage hand) even as a sheep
- He provides tactical advice during combat
- He's cowardly but intelligent — hides behind party, shouts warnings

### 3. Noke's Tower Feels Empty
**Problem:** Tower dungeon becomes a slog without personality.

**Solution:**
- **Environmental Comedy:** Magical traps backfire (turns intruder into a chicken instead of stone), animated objects argue with each other, rooms rearrange randomly
- **Polymorphed Staff:** Noke's servants are also transformed (butler is now a cat, maid is a squirrel) — they can help party if freed
- **Chaos Escalates:** Every time wand is used, roll on Wild Magic table for side effects

### 4. Wand Feels Like MacGuffin
**Problem:** Players just grab wand and leave without tension.

**Solution:**
- Noke uses it defensively (polymorphs objects into barriers, party members into harmless creatures temporarily)
- Wand is unstable: Each use risks explosion (Dex save or take force damage, everyone nearby transforms)
- Noke is paranoid: Wand is trapped, guarded, or hidden in tower
- Alternative: Wand is attuned to Noke — party must defeat him to break attunement before using it

## Resolution Outcomes

### Path A: Restore Shinebright, Defeat Noke
**Result:**
- Shinebright restored to elf form
- Noke defeated (captured OR killed OR polymorphed into sheep as ironic punishment)
- Wand retrieved (unstable — Shinebright wants to study it, Lorewarden Elric wants it destroyed)
- **Aeorian Echo outcome:** Proof that magic items are destabilizing
- **Reward:** Shinebright's gratitude, access to his tower for future study

### Path B: Restore Shinebright, Negotiate with Noke
**Result:**
- Noke agrees to reverse polymorph (under duress)
- Party takes wand in exchange for sparing Noke's life
- Noke becomes recurring villain (grudge against party)
- **Aeorian Echo outcome:** Same as Path A, but Noke remains threat

### Path C: Permanent Sheep Form
**Result:**
- If party fails to get wand in time (e.g., 24-hour limit), Shinebright is permanently a sheep
- Shinebright accepts fate, uses *speak with animals* scrolls to communicate
- He becomes a sage-sheep NPC (comic relief in future sessions)
- **Aeorian Echo outcome:** Partial — party learns magic is unstable, but can't prove it conclusively

### Path D: Wand Explodes
**Result:**
- If wand is used too many times OR critically fails, it explodes
- Everyone nearby makes DC 15 Dex save or transforms randomly (1d8: 1-sheep, 2-wolf, 3-bear, 4-cat, 5-chicken, 6-frog, 7-unchanged, 8-temporarily gain wings)
- Chaos ensues; requires *greater restoration* or *dispel magic* to fix
- **Aeorian Echo outcome:** Dramatic proof of magical instability

## Tactical Notes

### Combat Encounter Scaling

**Scene 1: Guz's Ambush (Street/Inn)**
- **2-3 players (Level 1-2):** Guz + 2 wolves
- **4-5 players (Level 1-2):** Guz + 3 wolves + 1 polymorphed bear
- **Scaling for higher levels:** Add additional polymorphed enemies (tigers, giant apes)

**Scene 2: Noke's Tower Guards**
- **Animated Objects:** Flying swords (1d4), animated armor (1-2)
- **Polymorphed Guards:** Use beast stat blocks (MM), but they surrender if Noke falls

**Scene 3: Noke Final Encounter**
- **Noke (Solo Boss):** Use **Mage** stat block (MM p347) with Wand of True Polymorph
- **Wand Special Actions:**
  - **Polymorph Ray (Recharge 5-6):** Ranged spell attack (+6), DC 15 Wis save or polymorphed into sheep/frog/chicken (1 minute, *concentration*)
  - **Wild Transformation:** Noke can polymorph objects into barriers (stone wall, iron bars, etc.)
  - **Unstable Backlash:** On a roll of 1 on d20, wand backfires (Noke transforms himself OR random target)

### Non-Combat Challenges

**Chase Scene (if Guz captures Shinebright):**
- Use Chase rules (DMG p252) OR simple skill challenge
- DC 12 Athletics/Acrobatics to keep pace
- DC 10 Perception to track Guz through streets
- Obstacles: Market stalls, narrow alleys, guard patrols (allies OR enemies depending on party's reputation)

**Infiltrating Noke's Tower:**
- DC 13 Stealth to avoid animated guards
- DC 15 Arcana to disable magical traps (or trigger comedic transformations)
- DC 10 Persuasion to convince polymorphed staff to help

**Restoring Shinebright:**
- **Option 1:** Use Noke's wand (requires defeating him first)
- **Option 2:** Cast *dispel magic* (DC 15 to break True Polymorph)
- **Option 3:** Find Noke's spellbook and cast ritual reversal (1 hour)

## Improvisation Toolkit

### If Players Get Stuck

1. **Shinebright provides clue:** "Noke's tower is west of town! The wand is in his study on the third floor!"
2. **Local NPC approaches:** "You're looking for that wretched Noke? His tower is cursed, I tell you! Strange lights, screams at night. Nobody goes near it."
3. **Guz returns with reinforcements:** "Master Noke is very disappointed! He sends me back to collect the sheep... and punish you."

### If Players Avoid the Adventure

- Shinebright follows them, bleating pitifully
- Guz's attacks escalate (burns down inn, threatens innocents)
- Lorewarden Elric sends message: "A wizard named Shinebright sent a distress signal. Investigate immediately."

### If Combat Is Too Easy

- Noke summons additional animated objects (brooms, chairs, books)
- Wand malfunctions and transforms random party members (1 round duration)
- Noke flees to higher tower levels, forces running battle

### If Combat Is Too Hard

- Polymorphed staff rebel against Noke (attack him instead)
- Wand backfires on Noke (transforms him into sheep, ironic reversal)
- Shinebright casts *sleep* or *charm person* to disable one enemy

## Rewards & Aftermath

### Standard Rewards
- **Shinebright's Gratitude:** 300 gp + 1 uncommon magic item from his collection
- **Noke's Tower Loot:** 500 gp in coins/gems, spell scrolls (1d4), component pouch
- **Unstable Wand of True Polymorph:** (See below)

### Unstable Wand of True Polymorph (Cursed Artifact)

**Wand, Very Rare (requires attunement)**

- **Charges:** 3/day
- **Effect:** Cast *polymorph* (DC 15 Wis save) on target within 60 ft
- **Curse:** On a roll of 1-3 on d20, wand backfires (caster OR random ally within 30 ft transforms instead)
- **Aeorian Instability:** Each use after first in 24 hours requires DC 12 Arcana check or triggers Wild Magic surge

**DM Note:** Party may choose to destroy it (Shinebright recommends this) OR keep it (risky but powerful).

### XP Awards (Milestone)
- Completing adventure: Party gains **+500 XP each** (or milestone toward next level)
- Restoring Shinebright without killing him: **+100 XP bonus**

### Reputation Changes
- **Local Town:** Friendly (if they fought Guz publicly)
- **Shinebright:** Ally (can call upon him for magical research, identifying items)
- **Lorewarden Elric:** Very interested (wants to study wand's instability)

## Aeorian Echo Foreshadowing

**Revelations to drop during the adventure:**

1. **Shinebright's Explanation:**
   > "Noke's wand was supposed to petrify me. Instead, I became this ridiculous ovine form. The magic is *wrong*, destabilized. I've felt it in my own spells too — cantrips misfiring, rituals producing unexpected results."

2. **Noke's Mad Rambling (if captured):**
   > "The old magic is waking! I felt it! My wand — it was dormant for years, then suddenly, POWER! Unstable, yes, but POWER! I could reshape reality itself!"

3. **Examining the Wand (DC 15 Arcana):**
   > "This wand's enchantment matrix is corrupted. There's an external magical frequency interfering with its function — something ancient, cold, and impossibly powerful."

4. **Polymorphed Minions (if interrogated):**
   > "Master Noke promised us power. He said his wand could make us into anything — warriors, beasts, immortals. But the transformations... they hurt. They're *wrong*. We can't change back on our own."

5. **Lorewarden Elric's Debrief (when party returns to Waystone Inn):**
   > *Elric examines the wand, his face pale.*
   >
   > "This confirms my worst fears. The Aeorian Echo isn't just awakening creatures or spreading disease — it's corrupting *all* magic. If artifacts across Northreach are destabilizing like this... gods help us. We need to find the source and shut it down before every wizard's wand becomes a ticking time bomb."

\page

# DM Prep Checklist: The Wild Sheep Chase

## One Week Before Session

- [ ] Read entire adventure (short adventure — 20-30 minutes)
- [ ] Review DM Notes section for tone guidance (COMEDY!)
- [ ] Familiarize yourself with polymorph rules (PHB p266)
- [ ] Decide on Shinebright's personality voice — snobbish elf with bleats
- [ ] Decide on Guz's personality voice — dim-witted thug, loyal to Noke
- [ ] Decide on Noke's personality voice — hammy villain, overconfident
- [ ] Mark key comedy moments (sheep with scroll, bear reveal, wand backfires)

## Day Before Session

- [ ] Print/bookmark stat blocks:
  - [ ] Guz (use Thug MM p350 with greatsword)
  - [ ] Wolves (MM p341) — polymorphed assassins
  - [ ] Brown Bear (MM p319) — polymorphed enforcer
  - [ ] Mage (MM p347) — Noke stats
  - [ ] Flying Sword (MM p20) — tower guards
  - [ ] Animated Armor (MM p19) — tower guards
- [ ] Print/bookmark Finethir Shinebright stats (use Pony MM p325, INT/WIS 18/14)
- [ ] Prepare Noke's wand effects (polymorph ray, wild transformation, unstable backlash)
- [ ] Review chase scene rules (DMG p252) OR prepare skill challenge
- [ ] Decide on tower layout (3 floors: entry, study, Noke's lab)
- [ ] Prepare Wild Magic table (optional, for wand malfunctions)

## Props & Materials

- [ ] Index card with Shinebright's key dialogue (complaints, tactical advice)
- [ ] Index card with Noke's villain monologue and threats
- [ ] Index card with polymorph transformation options (sheep, frog, chicken, wolf, bear)
- [ ] Map of Noke's tower (sketch or theater of mind)
- [ ] Sheep miniature or token (Shinebright)
- [ ] Wolf and bear miniatures/tokens (polymorphed enemies)
- [ ] Wand prop (chopstick, pencil, etc.) for visual reference

## Session Zero / Player Prep

- [ ] Confirm party level (1-2 OR 4-5; easily scalable)
- [ ] Brief players: This is a **comedy adventure** (lighthearted, absurd, fun)
- [ ] Set expectations: Fast-paced, with chase scenes and magical chaos
- [ ] Ask players: "How does your character feel about talking sheep? Evil wizards? Polymorph magic?"
- [ ] Clarify: This adventure is thematically significant but tonally different from others
- [ ] Encourage creative solutions: "Think outside the box! Polymorph is weird and wild."

## Quick Reference During Play

### Key DC Checks

**Initial Encounter (Guz's Ambush):**
- DC 12 Insight: Guz is lying about "sentimental value"
- DC 10 Intimidation: Scare Guz into revealing Noke's location (unlikely to work, but funny if it does)
- DC 13 Persuasion: Convince bystanders to help (mob chases Guz away)

**Chase Scene (if Guz captures Shinebright):**
- DC 12 Athletics/Acrobatics: Keep pace with Guz
- DC 10 Perception: Track Guz through streets
- DC 13 Stealth: Cut through alleys to intercept

**Infiltrating Noke's Tower:**
- DC 13 Stealth: Avoid animated guards
- DC 15 Arcana: Disable magical traps (or trigger comedy transformation)
- DC 12 Investigation: Find wand's hiding place (study, locked chest)

**Final Confrontation (Noke):**
- DC 15 Persuasion: Convince Noke to surrender (he's paranoid, unlikely)
- DC 13 Intimidation: Frighten Noke into using wand recklessly (backfires on him)
- DC 15 Arcana: Identify wand's instability (predict malfunctions)

### Encounter Scaling Quick Reference

**2-3 Players (Level 1-2):**
- Guz's Ambush: Guz + 2 wolves
- Tower Guards: 2 flying swords + 1 animated armor
- Noke Fight: Noke (solo, half HP if needed)

**4-5 Players (Level 1-2):**
- Guz's Ambush: Guz + 3 wolves + 1 brown bear
- Tower Guards: 4 flying swords + 2 animated armor
- Noke Fight: Noke + 2 animated armor

**Higher Levels (4-5):**
- Add polymorphed tigers (use tiger MM p339)
- Noke gets legendary actions (Move, Cantrip, Polymorph Ray)

### Polymorph Quick Rules

**True Polymorph (Noke's Wand):**
- Target becomes beast of CR equal to or less than target's level
- Retains INT/WIS scores (polymorphed assassins are intelligent)
- Can't cast spells or use equipment while polymorphed
- HP becomes beast's HP; reverting restores original HP
- Lasts until dispelled OR caster drops concentration

**Reversing Polymorph:**
- *Dispel Magic* (DC 15 to break True Polymorph)
- Noke's wand (he can reverse it willingly OR if party attunes and succeeds DC 12 Arcana check)
- *Greater Restoration* (5th level spell, removes curse)

### Noke's Tower Layout (Quick Map)

**Floor 1 (Entry Hall):**
- Animated armor guards (2)
- Flying swords patrol (2-4)
- Staircase to Floor 2

**Floor 2 (Study & Library):**
- Polymorphed staff (cat butler, squirrel maid) — can help if freed
- Noke's spellbook (locked chest, DC 13 Thieves' Tools)
- Magical traps (glyph of warding, polymorph triggers)

**Floor 3 (Noke's Laboratory):**
- Noke (final boss)
- Wand of True Polymorph (on pedestal OR in Noke's hand)
- Alchemical equipment (hazards: explosive potions, acid vials)

### Pacing Guide (3-4 Hour Session)

**Hour 1: The Sheep Arrives**
- Meet Shinebright, hear his story
- Guz's ambush (combat encounter)
- Chase scene OR negotiate with Guz

**Hour 2: Journey to Noke's Tower**
- Locate tower (investigation, locals provide rumors)
- Plan approach (stealth OR frontal assault)
- Infiltrate ground floor (animated guards)

**Hour 3: Ascending the Tower**
- Combat on Floor 2 (guards, traps)
- Free polymorphed staff (optional allies)
- Reach Floor 3 (Noke's lab)

**Hour 4: Final Confrontation**
- Battle with Noke (or negotiate)
- Wand malfunctions (wild magic chaos)
- Restore Shinebright, loot tower, return to town

### Important Names

- **Finethir Shinebright:** Polymorphed elf wizard (sheep form, cultured accent)
- **Ahmed Noke:** Evil apprentice (mage stats, wields unstable wand)
- **Guz:** Half-orc enforcer (thug stats, loyal but dim)
- **Polymorphed Assassins:** Wolves and bear (intelligent, follow Guz)

### Quick Treasure

- **Shinebright's Reward:** 300 gp + 1 uncommon magic item
- **Noke's Tower:** 500 gp, 2d4 spell scrolls, component pouch
- **Unstable Wand of True Polymorph:** Cursed artifact (party's choice to keep or destroy)
- **Noke's Spellbook:** Contains *polymorph*, *fly*, *detect magic*, *identify*

### Shinebright's Introduction (Sheep Form)

> *The sheep bleats frantically, waving a scroll at you. Once you activate the Scroll of Speak with Animals, the bleating becomes cultured, elven-accented Common.*
>
> "Thank the gods! Adventurers! I am Finethir Shinebright, Master Wizard of the Third Circle, and I have been most GRIEVOUSLY transformed by my vile apprentice, Ahmed Noke! He wields a Wand of True Polymorph and has turned me into this... this ABSURD ovine form! I require your aid to reclaim the wand and restore my proper body. Will you help me?"

*Shinebright is polite but snobbish, occasionally bleats mid-sentence, and complains about hooves.*

### Guz's Demand (Street Encounter)

> *The half-orc strides forward, hand on greatsword hilt.*
>
> "That sheep is Master Noke's property. He wants it back. NOW. Give it to me, or I take it by force. Master Noke is very powerful. You don't want him angry. Trust me."

*Guz is dim-witted but intimidating. He doesn't believe Shinebright is really a wizard.*

### Noke's Villain Monologue (Tower Confrontation)

> *A thin elf in elaborate robes stands at the far end of the lab, holding a shimmering wand.*
>
> "Ah, my former master! And you've brought... friends. How delightful. Did you come to beg for mercy? To plead for restoration? TOO LATE! I have claimed the wand, and with it, POWER! Shinebright, you are obsolete! And you, adventurers — you are obstacles. Obstacles I will REMOVE!"

*Noke is over-the-top theatrical, overconfident, and prone to evil laughter.*

### Noke's Wand Backfire (Comedy Moment)

> *Noke points the wand at you dramatically, but it sparks and fizzles. A beam of light shoots backward, striking HIM instead.*
>
> Roll on polymorph table:
> 1-2: Noke becomes a chicken (clucks angrily)
> 3-4: Noke becomes a frog (croaks in rage)
> 5-6: Noke becomes a sheep (ironic justice!)

*This is the perfect comedy payoff. Players can decide whether to capture him or restore him.*

### Lorewarden Elric's Debrief (when party returns to Waystone Inn)

> *Elric examines the unstable wand, his expression grave.*
>
> "This is deeply troubling. The wand's enchantment matrix has been corrupted by external magical interference — the Aeorian Echo, I suspect. If artifacts across Northreach are destabilizing like this, every wizard, artificer, and magic user is in danger. We need to understand the Echo's source and find a way to contain it. Thank you for bringing this to my attention. And... please, destroy that wand. It's too dangerous to exist."

## Post-Session Tasks

- [ ] Update Campaign Tracker: Wild Sheep Chase completed
- [ ] Note if Shinebright was restored (and whether he's now an ally)
- [ ] Record if party kept or destroyed the unstable wand
- [ ] Track Noke's fate (dead, captured, polymorphed, escaped)
- [ ] Note party's reaction to magical instability revelations
- [ ] Award XP or milestone progress (500 XP each OR partial level progress)
- [ ] Prepare Elric's follow-up hooks (investigate other artifact malfunctions?)

## Troubleshooting Common Issues

### "This adventure feels too silly compared to the rest of the campaign!"
→ Acknowledge the tonal shift. Say: "This is a palate cleanser — comic relief that still matters thematically. Enjoy the absurdity!"

### "We want to kill Shinebright and keep the wand!"
→ Allow it, but consequences: Shinebright's allies (other wizards) hunt party down. Noke escapes and becomes recurring villain. Wand eventually backfires catastrophically (TPK risk).

### "Guz captured Shinebright and we can't catch him!"
→ Introduce helpful NPC (town guard, friendly wizard) who knows a shortcut. OR Shinebright casts *message* cantrip to guide party. OR Guz stops to gloat, giving party a chance.

### "Noke is too strong; he's killing us!"
→ Wand backfires on Noke (polymorph himself into harmless creature). Polymorphed staff rebel and attack Noke. Shinebright reveals he hid a *scroll of dispel magic* in his tower (party finds it mid-battle).

### "We want to negotiate with Noke instead of fighting!"
→ Great! Noke is paranoid but might agree to truce: Party leaves tower, he keeps wand, everyone goes their separate ways. (Note: He'll become recurring villain, but that's a valid player choice.)

## Next Session Hook

After restoring Shinebright and debriefing with Elric:

> *Shinebright adjusts his newly restored robes and nods gratefully.*
>
> "Thank you, my friends. I owe you a great debt. If you ever need magical consultation or research assistance, you need only ask. As for the wand... Elric is right. Destroy it. The instability is too dangerous. But know this: If my wand malfunctioned, others will too. Every wizard in Northreach is at risk. Someone must find the source of this magical corruption."

This reinforces the Aeorian Echo mystery and sets up future adventures.

\page
# Summary

The party’s attempt to grab a rare afternoon of downtime is interrupted by a frantic sheep equipped with a Scroll of Speak to Animals and a fierce determination to get their attention. This is no mere beast, however, but a wizard fallen victim to an embittered apprentice wielding a Wand of True Polymorph

Transformed assassins are looking to grab themselves a mutton dinner, while the only object capable of restoring his opposable thumbs lies in the hands of his former pupil and current nemesis. Fortunately, the woolly wizard has found new allies he can rely on, right?

![A stylized, magical scene dominated by a glowing, particle-built silhouette of a horned animal (appearing like a bull or ram) centered in the image. Sparkling points of light form the head and curved horns, with several star-like flares. The background is a diagonal streaked gradient from warm orange on the left through yellow and green to teal on the right. A textured green band along the bottom suggests grass or ground. The overall mood is luminous and otherworldly.](./892902-The_Wild_Sheep_Chase_V2_images/image_001.png)

Can the heroes put an end to Ahmed Noke’s transmutational tyranny and restore an innocent wizard to his true form? There’s only one way to find out...

# Using This Adventure

The main text is divided into several distinct scenes, each covering a location, encounter or major plot point. Other information, enemy stat blocks and notes are highlighted in grey boxes.

While it is possible to run the game on the fly, it is recommended that you read the adventure in its entirety before starting to play.

# Adventure Hooks

Getting the players into this adventure is pretty straightforward. All that is requires is that they be spending a few days in a town or city large enough to host a wizard.

If you want to plant seeds in advance, you may wish to introduce the character of Noke through rumours or idle conversation with shopkeepers and innkeepers, who view him with fear and awe.



\page

# Baaaa-d News

The adventure begins as the party idle away an afternoon. They might be enjoying a drink at a tavern, resting at their base or simply walking down the street without a care in the world. No matter where they are, however, it soon becomes clear that something quite odd is happening.

There is a sound of clattering hooves, surprised yelps and a frantic bleating, Before the party can react, a sheep bounds towards them. The beast appears to be a regular sheep in every way - fluffy white coat, black face, curled horns - but it is carrying and elaborate scroll in its mouth.

The sheep tries to get close to the most magically-gifted member of the party and waves the scroll at them, letting them take it should they reach for it.

A wax seal purports that it is a Scroll of Speak With Animals (Modified). If a character says this out loud - to explain to other party members, for example - the sheep appears to nod and bleat enthusiastically.

Should they use the scroll (simply reading it aloud is enough to activate the spell within), all of them hear the sheep’s baaing instantly morphs into cultured, elven-accented Common, albeit with a slight hint of a bleat.

After establishing that the player can understand what it’s saying, the sheep introduces itself as Finethir Shinebright, a wizard in dire need of aid. If the players are willing to listen, he explains that he recognises them as adventurers and that he is in dire need of their aid.

Specifically, he wants them to help take back an extremely powerful magical artefact from a dangerous, possibly insane wizard.

He will attempt to tell his story, but shortly after he starts the sound of howling fills the air…


# Guz

Medium humanoid (half-orc), chaotic neutral

---------------------------------------------------------------------------------------------------------------------------------------------------------

Armor Class 1 4 (leather armour)

## Shepherds, Crooks

A loud howling fills the air, accompanied by the sound of angry yells and the occaional scream that seem to be drawing closer and closer

The cause quickly become apparent as a huge Half-Orc swaggers towards you, pushing his way through the crowd without a care for anybody standing in his way. In front of him walk appear to be large wolves wearing iron collars, while a hulking figure in a dirty brown cloak travels in his wake with footfalls loud enough to be heard over the ruckus.

The Half-Orc sets his small eyes on you and strides forward with one hand resting on the hilt ofa greatsword.

"That sheep is Master Noke's... he desires to have it back."

--------------------------------------------------------------------------------------------------------------

The Half-Orc, Guz, is accompanied by trio of collared Wolves (MM p341 ) with strangely intelligent eyes, while the huge figure behind him is actually a polymorphed Brown Bear (MM p31 9).

He demands that he be given "Master Noke's sheep," which he claimed has escaped, and is of great sent-ee-ment-all value to his master. Any mention of Shinebright's true nature is met with hollow, mirthless laughter.

Guz is not a bright fellow, but he is very loyal and determined to complete his task. His trackers know that Shinebright is there, no matter how well the party tries to hide him, and will not take no for an answer.

While he prefers violence and intimidation, he is also willing to offer bribes and promises of magical favours if that looks like the best option.

\page


If he feels like he's not making progress, Guz will simply attack without warning. The wolves will follow him up, while the cloaked figure will let its hood fall and run into combat with a terrible roar.

The exact details of any battle that breaks out will depend on the location. If it takes place in an inn, tables and overturned chairs litter the floor. In a street, you may wish to have frightened passers-by form zones of difficult terrain.

All of the beasts still have an intelligent human mind contained within them, and act intelligently. Guz is happy to charge into the front line and take on any heavy hitters alongside the Brown Bear.

Meanwhile the Wolves will aim to cut round behind the party in a bid to grab Shinebright - he uses the statistics of a Pony (MM p325) but with INT and WIS scores of 1 8 and 1 4 respectively.

They intend to capture Shinebright, not kill him. If Guz captures him, he and his allies will set off for Noke's home. The party will have to decide if they follow, potentially launching a chase scene.

Hit Points 67 (9d8 +27) Speed 30ft.

---------------------------------------------------------------------------------------------------------------------------------------------------------

STR DEX CON INT WIS CHA

1 6 (+3) 1 2 (+1 ) 1 7 (+3) 8 (-1 ) 1 1 (+0) 8 (+1 )

---------------------------------------------------------------------------------------------------------------------------------------------------------

Skills Intimidation +2

Senses passive perception 1 0

Languages Common, Orc

Challenge 2 (450 XP)

---------------------------------------------------------------------------------------------------------------------------------------------------------

Reckless. Guz can choose to gain advantage on all melee weapon attacks during his turn, but in return all attack rolls against him also have advantage until the start of his next turn.

---------------------------------------------------------------------------------------------------------------------------------------------------------

## Actions

Whirling Greatsword. Melee Weapon Attack: +5 to hit, reach 5ft., two seperate targets. Hit: 1 0 (2d6+3) slashing damage.

## Roleplaying Shinebright

Arrogant, self-obsessed and filled with an inflated sense of his own ego, Finethir Shinebright is one of the people worst suited to be transformed into a sheep. Still, no matter his form the former elven wizard manages to exude an air of fussy, bookish

intellectualism

Despite his flaws, however, he is generally good-hearted. Assuming he notices them and it doesn’t inconvenience him too much he will try to help others where possible, though he will loudly complain of their inability to grasp concepts as simple as poly-planal transweave theory.

Once upon a time the local nobles, merchants and arcanists spoke the name of Finethir Shinebright with respect, awe and grudging admiration. A master of transmutation, he would regularly be called upon to carry out grand tasks such as clearing blocked roads by turning massive boulders into rabbits.Two years as a sheep have taught him very little about humility, but a lot about grass. If he returns to his natural form, Shinebright is a willow-thin high elf with straw-coloured hair and an extremely long nose.

![- Abstract, colorful composition dominated by a glowing, horned silhouette made of bright sparkles and light particles. - Diagonal streaks of color run across the background from warm orange on the left, through yellow and green, to teal on the right. - The central shape (resembling a ram or bull head with curved horns) is formed by concentrated green-yellow points of light and small star-like flares. - A textured, darker green band runs along the bottom, suggesting ground or a foreground element. - Overall mood is cosmic, magical, and luminous.](./892902-The_Wild_Sheep_Chase_V2_images/image_002.png)![The image is a plain, uniform gray rectangle with no distinguishable objects, text, or features. There’s a slightly darker band near the top and bottom edges, but otherwise it’s a flat gray field.](./892902-The_Wild_Sheep_Chase_V2_images/image_003.png)

\page


## After the Dust Settles

Once Noke's goons have been defeated, distracted or otherwise dealt with, Shinebright pleads with the party. Without their help, he is doomed. Noke still has many guards still working for him and eventually they will find him.

If they’re feeling mercenary, he reminds the party that in his true form he is a powerful and wealthy wizard and promises great rewards. He is more than willing to commit to deals that he knows he can't actually fulfil.

In any case, Shinebright will explain:

- Until two years ago he owned and worked out of a tower on the outskirts of town. He was a wizard of no small talent, specialising in transmutation magic. His most prized possession - and probably the key to his success - was an incredibly rare Wand ofTrue Polymorph.
- One fateful night he ended from his meditative trance to find his apprentice, Ahmed Noke, standing over him, clutching the wand. Shinebright demanded to know what the boy was doing, but the only noise he could produce was an angry ‘baaaaah’.
- The wizard became a virtual prisoner in his own garden. He was forced to graze on nothing but grass and buttercups while hungry wolves and other beasts - actually polymorphed guards - looked on.
- Last night he felt hope for the first time in many months when Noke left his home without closing the door. Shinebright snuck in, made his way to an old bookshelf and

## Roleplaying Guz

A hulking brute of a half-orc, Guz views violence and intimidation as the only sensible methods for achieving his goals. He also assumes that most people feel the same way, and prefers to get his own violence in first.

![The image shows a nearly uniform gray rectangle with minimal texture or contrast and no discernible objects, text, or features.](./892902-The_Wild_Sheep_Chase_V2_images/image_004.png)Though to most outside observers he may appear evil, he is incredibly loyal to Noke - who genuinely doesn’t care what a creature looks like on the outside - and owes him unswerving devotion.

Guz isn’t particularly intelligent and can be easily confused by quick-talking foes, though this usually just makes him angrier.

However, he is also fond of trying to use long, complicated words he has picked up from Noke - though the extent to which he actually understands what they mean is probably up for debate.

- In order to turn back into his original form he needs another dose of True Polymorph. Which means he needs access to his old wand.
- His former apprentice still dwells in Shinebright's old home, located just to the south-east of town. He keeps the wand on him at all times and only leaves if he absolutely has to.

|  |
| --- |
| stole  t  h  e  S  c  r  o  l  l  o  f  S  p  e  a  k  t  o  A  n  i  m  a  l  s  .  H  e  t  h  e  n  r  u  s  h  e  d  i  n  t  o  t  o  w  n  w  i  t  h  t  h  e  s  c  r  o  l  l  c  l  e  n  c  h  e  d  b  e  t  w  e  e  n  h  i  s  t  e  e  t  h  ,  a  n  d  w  a  s  s  e  a  r  c  h  i  n  g  d  e  s  p  e  r  a  t  e  l  y  f  o  r  t  h  e  a  u  r  a  o  f  m  a  g  i  c  t  h  a  t  w  o  u  l  d  i  n  d  i  c  a  t  e  s  o  m  e  o  n  e  a  b  l  e  t  o  a  c  t  i  v  a  t  e  t  h  e  s  p  e  l  l  w  h  e  n  h  e  f  o  u  n  d  t  h  e  p  a  r  t  y  . ![A uniformly medium-gray rectangular image with no discernible objects, text, or features — essentially a blank/solid-color gray background.](./892902-The_Wild_Sheep_Chase_V2_images/image_005.png) |

- He knows his old home’s layout intimately, and is more than happy to describe it in endless detail.

## The House in the Woods

The path to Noke’s Tower cuts off from a main road a few miles out of town, darting off between a gap in the bushes. It is a well-trodden route that soon begins to weave its way between tall oak trees

\page


Anyone who cares to examine the path for tracks will easily see the impression of many feet and paws, with the most fresh sets appearing to match up with the group led by Guz.

The track continues through sparse woodland for perhaps a mile without any sign of habitation. Unless they know what to look for, the party may be somewhat surprised by the view that awaits them when Shinebright's old house appears through the treetops. --------------------------------------------------------------------------------------------------------------

Rather than stone or glass, the house before you seems to have been formed from the living branches of four sturdy oak trees. These have been shaped and woven to create three thick platforms.

The lowest of these platforms is roughly 40ft across and sits about 1 0ft from the ground. The only obvious route up is a gentle slope formed of roots and branches that connects roughly with the main path.

Branches curl around its base, creating a rough bowl shape around it. From where you stand it’s possible to see flowers and small trees growing around its edge.

By far the largest of the three platforms is the middleone, which looks to be around 60ft. across. It is about 20ft above the

## Roleplaying Noke

Noke once hero-worshipped Shinebright and served as his apprentice for many years. However, as time dragged on and on there was never any change in their relationship.

![The image shows a plain, uniform medium‑gray rectangle filling the frame. There are no discernible objects, text, or distinct features (only a slightly darker strip along the top edge).](./892902-The_Wild_Sheep_Chase_V2_images/image_006.png)Decades passed and still the master transmuter treated him like a child, expected to cook, clean and recite answers by rote. When Noke pressed him on it, Shinebright would explain that his was how he had been taught, and didn’t seem to register Noke’s claims that, as a human, he couldn’t spare a century to serve out an apprenticeship.

At the same time, Noke began to realise that much of Shinebright’s acclaim came not from his own abilities extensive as they were - but from the Wand of True Polymorph he wielded.

Eventually he cracked, and turned on his former master before setting himself up as a master wizard. However, a combination of guilt and suddenly unstoppered ambition spelled bad news for his mental state.

He is paranoid that someone will attack him as he attacked Shinebright and rarely sleeps. This paranoia has led him to invest in a troop of guards, many of whom he has transmuted into stronger, more bestial forms.

ground and is fully enclosed with a wall formed from twisting branches. You can see evenly spaced, window-sized gaps, as well as what appears to be a door at the point closest to the garden platform.

The final, tallest platform is roughly 30ft above the ground, and is much smaller than the others. It looks to be linked to the central platform by another small slope.

Scattered beneath the platforms are two small wooden huts and a large outhouse

--------------------------------------------------------------------------------------------------------------

When the party arrives at the compound, there is a trio of Apes (MM p31 7) either sleeping or playing with an oversized pair of dice on the lawn, with iron greatswords stuck into the ground next to them. A Brown Bear is in the outhouse, taking care of business.

\page


![- A nearly uniform medium-gray rectangle fills the entire image. - Slightly darker strip along the very top edge; no distinct objects, text, or patterns are visible. - Appears to be a blank, solid-color, or possibly corrupted/failed image.](./892902-The_Wild_Sheep_Chase_V2_images/image_007.png)The door to the central platform is almost always locked, requiring a DC1 4 Strength (Athletics) to break down or a DC1 2 Thieves' Tools check to pick. Inside, the area is divided up in to three sections. One contains a combination library and lab, one a sitting room and one dining room/kitchen. Untidy bookshelves line much of the outer walls and worktables are covered with stacks of ink-spattered notes and complicated anatomical diagrams of various beasts and monsters.


# Bed Dragon Wyrmling

Large dragon, chaotic neutral

---------------------------------------------------------------------------------------------------------------------------------------------------------

Armor Class 1 6 (natural armor)

Hit Points 75 (1 0d8 + 30)

Speed 30ft., climb 30ft., fly 30ft.

---------------------------------------------------------------------------------------------------------------------------------------------------------

STR DEX CON INT WIS CHA

1 9(+4) 1 4(+2) 1 7(+3) 8(-1 ) 8(-1 ) 4(-3)

---------------------------------------------------------------------------------------------------------------------------------------------------------

Skills Perception +2, Stealth +5

Senses passive perception 1 2

Damage Vulnerabilities fire

Languages —

Challenge 4 (1 ,1 00 XP)

---------------------------------------------------------------------------------------------------------------------------------------------------------

## Actions

Bite. Melee Weapon Attack: +6 to hit, reach 5ft., one targets. Hit: 1 5 (2d1 0+4) piercing damage.

Splinter Breath (Recharge 5-6). The Bed Dragon Wyrmling send out a shower of wooden splinters in a 1 5-foot cone. Each creature in that area must make a DC1 3 Deterity Save, taking 24 (7d6) piercing damage on a failed save, or half as much damage on a successful one.

![A dramatic, high-contrast digital artwork showing the right half of a snarling big‑cat or wolf–like face with glowing eyes and exposed fangs. Warm reds, oranges and yellows explode from the animal’s head into the left side of the image as paint splatters, drips, floral flourishes and mechanical gear motifs on a black background. The composition, texture and color create an intense, grunge/steampunk feel and a sense of motion and aggression.](./892902-The_Wild_Sheep_Chase_V2_images/image_008.png)![A dramatic, stylized image of a snarling canine-like face (wolf or big dog) occupying the right side. The eyes glow and the mouth is open to reveal sharp fangs. The rest of the composition explodes outward in fiery reds, oranges and deep blacks as abstract paint splatters, drips and grunge textures. Intermixed are ornamental and mechanical elements (gears, cogs and floral-like swirls), giving a layered, steampunk-abstract feel. The left side fades to black, emphasizing the bright, chaotic burst around the head.](./892902-The_Wild_Sheep_Chase_V2_images/image_009.png)

The tallest platform functions as a bedroom for Noke, containing little beyond a wardrobe, a large wooden bed and a cluttered dressing table.

The huts contain one or two beds each, a few of which are oversized, as well as the general detritus of the common men who occupy them.

Noke is in the central platform, working furiously on new spells. If he notices the party as they approach he will order them to "return the sheep - in return I will not destroy you all."

If they talk, he will reveal his reasons for hating Shinebright and boast disjointedly of his own achievements. He will also ask if they killed ‘my man, Guz,’ and be visibly upset if they have. Should they refuse to return Shinebright he will order his men to attack.

The most important part of any fight that breaks out is Noke, who is offensively weak but can buff his allies dramatically. Once the Brown Bear emerges from the outhouse he will cast Enlarge/Reduce (PHB p237) on it to increase its damage. He will supplement his minions’ attacks with Ray of Frost (PHB p271 ) but will focus on keeping up concentration.

\page


The Apes will act intelligently, and as they are wielding greatswords their Fist attack is replaced by a Slash that deals 1 0 (2d6+3) slashing damage. They aren't likely to fight to the death and will flee once they fall below half health.

Once it is clear that the fight is lost, or a player simply gets too close to him, Noke will cast Expeditious Retreat (PHB p238) and flee into the central platform, locking the door behind him. He will move to his bedroom as fast as he can and casts True Polymorph on the largest thing he can find - his bed.

Ewe are Very Clever...

Noke is naturally paranoid and Shinebright’s recent escape hasn’t exactly improved his outlook. This makes luring him away from the safety of his tower an extremely difficult task, though not an impossible one.

![The image shows a nearly uniform medium-gray square with a subtle grainy texture and no discernible objects, text, or distinct features.](./892902-The_Wild_Sheep_Chase_V2_images/image_010.png)Noke's lust for fame and power slightly outweighs his fear of being unseated, for the time being at least. This means that a very, very skilled set of liars with a sufficiently devious plan and a good helping of luck may be able to tempt him with the offer of a particularly prestigious, lucrative contract.


# Ahmed Noke

Medium Humanoid (Human), neutral evil

---------------------------------------------------------------------------------------------------------------------------------------------------------

Armor Class 1 2

Hit Points 55 (1 0d8 + 1 0) Speed 30ft.

---------------------------------------------------------------------------------------------------------------------------------------------------------

STR DEX CON INT WIS CHA

9(-1 ) 1 4(+2) 1 2(+1 ) 1 6(+3) 1 2(+1 ) 1 0(+0)

---------------------------------------------------------------------------------------------------------------------------------------------------------

Saving throws Intelligence +5, Wisdom +4

Skills Arcana +6

Senses passive perception 1 1

Languages Common, Elven, Draconic

Challenge 2 (450 XP)

---------------------------------------------------------------------------------------------------------------------------------------------------------

Spellcasting. Noke is a 7th level spellcaster. His spellcasting ability is Intelligence (spell save DC 1 4, spell attacks +6 to hit).

He has the following spells prepared:

Cantrips (at will): Ray ofFrost, Mending, Prestidigitation, Message.

First level (four slots): Expeditious Retreat, Jump, Thunderwave.

Second level (three slots): Enlarge/Reduce, Levitate.

Third level (three slots): Haste, Slow.

Fourth level (one slot): Polymorph.

---------------------------------------------------------------------------------------------------------------------------------------------------------

## Actions

Dagger. Melee or ranged weapon attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1 d4 + 2) piercing damage.

Three rounds after he runs away he bursts from the roof of his bedroom riding the Bed Dragon Wyrmling, a beast that looks like a dragon carved from wood, with billowing bedsheets for wings and a tail that ends in a soft pillow. If the party are in the main living area he will crash through the ceiling and attack.

The Wyrmling is not that smart and will use its Splinter Breath as often as possible, simply trying to attack the closest target when it is not available. It will, however, prioritise enemies that use fire against it. While riding the Wyrmling, Noke will simply use Ray of Frost to slow down any party members trying to retreat.

Should the Wyrmling be lost – either to damage or because Noke loses concentration – it will turn back into a thoroughly beaten-up old bed.

Desperate and unwilling to let his old master win, a babbling Noke will then attempt to use the wand on himself, intending to transmute his form into that of some monstrous creature.

However, the over-used wand will crackle, fizz and malfunction with a loud bang, turning Noke into a Gibbering Mouther (MM p1 57) - a misshapen pile of flesh that bellows incoherently from dozens of mouths. The sad creature will attack mindlessly until completely destroyed.

\page


Even so, when Noke leaves he will take all of his remaining bodyguards with him and will be extremely quick to suspect the party of betrayal if there is any hint of a double-cross.

He will, of course, have his wand to hand at all times. Should he be given enough time to cast it, Noke will use a charge of True Polymorph to transmute some nearby item into a Wyrmling that uses roughly the same stats as the Bed Dragon Wyrmling.

Depending on what it was made from, it may not have the same flavour and might need to have its resistances/vulnerabilities tweaked slightly.

## Big Choices

Should the players recover the wand it becomes immediately obvious that it is damaged. Anyone proficient in Arcana can tell that it has been modified so it can be used more often, but overuse has rendered it extremely unreliable.

If they wish to speak to Shinebright, a quick search of the central platform will allow them to find another Scroll of Speak with Animals. At the sight of his former apprentice's ruined corpse, Shinebright may even undergo some realisation of how poorly he treated his former apprentice and turn somber despite his triumph.

Even if he is made aware of the dangers associated with his old wand, Shinebright will still be willing to risk his life in order to be turned back into an Elf. However, he is also open to persuasion if the party try to talk him out of it. A compelling argument and a DC 1 5 Charisma (Persuasion) will be enough to make the former Wizard reconsider his options.

Before undergoing the risk of having the spell performed on him, Shinebright will ask that if he does die, the party send word to his old college.

## Consequences

If the party decides to go ahead with the spell and it succeeds, Shinebright congratulates the party heartily. He will have to be reminded of anything he actually promised them while he was still a sheep, and cannot actually pay any financial reward, as Noke was virtually bankrupt and had sold most items to pay for research materials and guards.

He will, however, be willing to perform transmutations of up to 5th level for them, charging just ehough to cover the components. He will also take in any polymorphed guards who fled, promising to work towards returning them to their natural shapes.

If the party decides to go ahead with the spell and it fails, Shinebright dies permanently. The party is free to honour his final wish and leave the tower more-or-less intact, or loot to their hearts’ content. The tower is surprisingly empty of anything of benefit to non-transmuters, however, with valuables restricted to expensive lab equipment and arcane paraphernalia estimated to be worth around 1 ,000gp. If the players wish they can also take the entire tower complex as their own, though this may cause trouble when the local nobles try to pay Noke a visit and find him missing…

\page


![Top-down illustrated map of a fenced grassy compound with a light grid overlay. Key elements: - Large central circular building divided into rooms: a long dining table with many chairs, a lounge area with rugs and armchairs, and a workshop/study area with desks, bookshelves, and scattered papers. - Smaller circular bedroom building with a bed, rug, and furniture connected to the main circle by a short wooden walkway. - Another circular enclosure to the right serving as an open courtyard or garden with a large tree, shrubs, and a wooden stair/bridge to the main building. - Small square outbuilding containing a desk and books, plus two rectangular outbuildings on the left with beds and storage. - Worn dirt paths, scattered trees and bushes across the grassy yard, and a low perimeter wall around the property.](./892902-The_Wild_Sheep_Chase_V2_images/image_011.png)![The image shows a tall, nearly uniform medium-gray rectangle filling the frame with a thin, slightly darker border around the edges. There are no distinct objects, text, or recognizable features visible.](./892902-The_Wild_Sheep_Chase_V2_images/image_012.png)![The image is a plain, uniform gray rectangle filling the frame with a slightly darker thin border along the top edge. No distinct objects, text, or features are visible.](./892902-The_Wild_Sheep_Chase_V2_images/image_013.png)![A tall, vertical image filled almost entirely with a uniform medium-gray color. A slightly darker gray strip runs along the very top edge, and a thin darker outline is visible around the image edges; there are no distinct shapes, text, or recognizable objects.](./892902-The_Wild_Sheep_Chase_V2_images/image_014.png)

If the party refuse to perform the spell, Shinebright accepts but will not give up his hopes entirely. He will take back his old home and work towards a way to remove his curse. In any case, he heads to the bedroom and slips on one of his old robes, which he wears until he is transformed back to his natural shape. Though he will be upset with them, Shinebright will acknowledge that he owes the party a large debt.

In any case, any adventurers that help Shinebright to deal with Noke each recieve 500xp.

Not Like This...

A stealthy party may be able to steal the wand while Noke sleeps or a combination of lucky roles and inventive tactics may allow a player to disarm the wizard.

Should this happen, don’t force the story back towards the ‘ideal path’, but allow it to develop naturally.

One thing that you must do, however, is try to provide at least a hint of the dangers associated with the modified wand before the players try and use it. Possibly it sparks unnaturally when a character touches it, or Noke himself may feel honourbound to warn them.

# Modified Wand of True Polymorph

Formed of a long, thin twig taken from an oak tree, this wand holds 1 d4-1 charges of True Polymorph, with a minimum of 1 . These can be cast by anybody with a spellcasting ability who has spent at least one hour attuning to the wand. The amount of charges resets at dawn each day.

In order to increase the amount of times the spell has been case, the wand appears to have been fitted with a bulbous, rune-inscribed iron band and has cracks running along its length.

If inspected with a DC 1 5 Intelligence (Arcana) check, reveal that the modifications have left the wand extremely unreliable.

Each time a charge is used the user must pass a DC 1 7

\page


Intelligence (Arcana) check.

If they succeed, the spell casts normally and the DC needed to use it permenantly increases by 1 .

If they fail by five or less, the spell will transmute the target into a Gibbering Mouther (MM p1 57) - a hideous lump of seemingly random limbs, organs and facial features. The creature will attack the nearest target mindlessly, babbling in dozens of broken voices.

This transformation cannot be undone by any spell lower than 9th level and cannot be cancelled by ending concentration. The target can make a saving throw against this effect in the same way they would against a regular casting of True Polymorph.

If they fail by more than five, in addition to the above consequences the wand explodes violently, dealing 1 d1 2 force damage to all creatures within 1 0 ft for each charge remaining in the wand. This destroys the wand.

## Credits and Acknowledgments

DUNGEONS & DRAGONS, D&D, Wizards of the Coast,

Forgotten Realms, the dragon ampersand, and all other Wizards of the Coast product names, and their respective logos are trademarks of Wizards of the Coast in the USA and other countries.

This work contains material that is copyright Wizards of the Coast and/or other authors. Such material is used with permission under the Community Content Agreement for Dungeon Masters Guild. All other original material in this work is copyright 201 6 by Richard Jansen-Parkes and published under the Community Content Agreement for Dungeon Masters Guild.

\page
<!-- FILE_END: ../Season 1/Adventures/The_Wild_Sheep_Chase_V2/892902-The_Wild_Sheep_Chase_V2.md -->

## Peril in Pinebrook

<!-- FILE_START: ../Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md -->
![A large, metallic silver dragon soars over a snow-covered mountain valley at sunrise or sunset. Its outstretched wings catch the light, creating lens-flare–like highlights, and its scaled body, spines, and hooked talons are rendered with detailed, reflective texture. Below, a herd of deer or elk scatters across snow, leaving trails behind them as the dragon casts a long shadow. The scene uses cool blues and purples for the snow and distant peaks, with warm pink and gold tones in the sky and on the dragon where the light hits. Key visual elements: - Silver, armored dragon with pronounced scales, spines, and a horned head - Large translucent wings with bright reflections and lens-flare effects - Snowy mountain landscape with pink-tinged trees and distant peaks - Herd of ungulates (deer/elk) running beneath, kicking up snow - Dramatic contrast of warm sunlight and cool, icy colors](./Peril_in_Pinebrook_COMPLETE_images/image_001.png)

**PERIL**

**IN**

**PINEBROOK**

**An Introductory Adventure for**

**The World’s Greatest Roleplaying Game**

Welcome to Dungeons & Dragons:

\page

# DM Notes: Peril in Pinebrook

## Adventure Overview

**Theme:** Frontier communities caught in the crossfire of rising magic

**Level Range:** 1-3 (excellent introductory adventure)

**Expected Duration:** 2-3 hours (designed for new players)

## DM Prep Checklist

- [ ] Read entire adventure (45-60 minutes)
- [ ] Familiarize yourself with Silver Dragon Wyrmling stats (MM p118)
- [ ] Decide on Rorn's corruption level
- [ ] Mark key revelation moments (Aeorian artifact, restoration option)

\page


# Peril in Pinebrook

## Northwatch Wardens Integration (DM)

**Campaign Connection:** This adventure shows the **human cost** of the Aeorian Echo. While Pinebrook's troubles may seem minor compared to awakened wolves or deadly diseases, they reveal how the destabilizing frontier affects every settlement.

**DM Secret Resources:** For the truth behind this adventure, see:
- **[World Building/DMEyesOnly/Places_Secrets.md](../../../World%20Building/DMEyesOnly/Places_Secrets.md)** - "Pinebrook: Commerce and Conspiracy" section
- **[World Building/DMEyesOnly/Northreach.md](../../../World%20Building/DMEyesOnly/Northreach.md)** - Adventure integration details
- **[World Building/DMEyesOnly/The_Aeorian_Echo.md](../../../World%20Building/DMEyesOnly/The_Aeorian_Echo.md)** - Campaign arc context

**Key Secrets:**
- Torven Grimley (trading post owner) is an **Uttolot family fence** handling stolen Aeorian artifacts
- Merryn Pine (lodge owner) is an **information broker** who knows about the artifact smuggling
- The market square contains **dead drop locations** for conspirators
- An abandoned logging camp north of Pinebrook was closed after workers **found something Aeorian**
- This is a **smuggling hub** moving dangerous artifacts through the frontier

**Player Discovery:** Characters should uncover crime and corruption in Pinebrook, but the deeper Aeorian artifact smuggling angle should only emerge through careful investigation. This adventure emphasizes that **every settlement is vulnerable** to the Echo's effects.

---

Welcome to the adventure of a lifetime!

Peril in Pinebrook is an introductory Dungeons & Dragons (also known as D&D) adventure designed for younger players, but it can be enjoyed by players of all ages! Peril in Pinebrook contains four ready-to-play characters that you can use to run your first D&D game. The simplified rules allow a Dungeon Master (also known as the DM) to easily run the game without needing other rules materials or rules knowledge.

The suggested number of participants for this experience is one DM and four players, but instructions describe how to run a game for fewer players. If you have more than four players, any of the ready-to-play characters can be used by more than one player.

## The Basics

Dungeons & Dragons is a collaborative storytelling and roleplaying game. Each player takes on the role of an adventuring character: a hero with skill and knowledge—and sometimes magic—that lets them overcome challenges and achieve greatness!

One of the participants in the game takes the role of the Dungeon Master (DM). The DM acts as the lead storyteller, the keeper of secrets, and the referee. This document provides everything you need to know to get started as a DM.


\page

## The Adventure

Characters in Dungeons & Dragons undertake quests throughout their lives, heroic journeys and death-defying acts of courage that become tales of legend*—*or tales of doom! Peril in Pinebrook contains helpful hints, suggestions, and rules explanations that assist new Dungeon Masters in running the adventure. If you’re the DM, you can run this adventure as it’s written, or you can add your own bits of story. Your imagination, and the imaginations of the other players, make each game of D&D unique.

The "Running an Adventure" section has information that can help you decide whether you want to be a DM. If you prefer to play a character instead, don’t read “Adventure Introduction” or any of the adventure beyond that. If you do, some of the fun of playing might be spoiled for you.

## The Rules

Dungeons & Dragons is a special type of game known as a roleplaying game (RPG). In D&D, the rules help determine if the characters succeed or fail at the challenges they face. They also help the entire group of players tell a fun, exciting, and memorable story.

The rules are explained in the "Using the Rules" section. The "Running an Adventure" section provides the DM advice on leading the other players through a game session. The adventure text also explains rules and game play along the way.

**| Dungeons & Dragons: Peril in Pinebrook**

## The Tools

To play this game, you need this packet and some dice: at least one 20-sided die (d20) and one 6-sided die (d6). It speeds up game play if each player has their own dice, but players can share! If you don't have these dice, you can find digital dice rollers online.

Each player should also have a way to make notes and keep track of changes to their character sheet as play progresses. A pencil and paper work well.

### Character Sheets

This packet includes four character sheets and a handy guide that explains some of the rules and character options in more detail. Give each player one character sheet. If you have more than four players, they can change the names and descriptions on a duplicate character sheet so that they’ll have unique characters with similar abilities and equipment. The “Helping the Characters” section later in this document provides more information about using character sheets. The Experience

![A dramatic fantasy scene: a large, metallic-scaled dragon with broad, translucent wings glides low over a snowy mountain slope. Sunlight creates lens flares on the wing and highlights the dragon’s ornate crest and ridged jaw. Below, a scattering herd of antlered deer (resembling reindeer/elk) races across the snow beside pink‑tinted conifer trees. The color palette mixes silvery grays and icy blues with warm pinks and golds, giving a striking, wintry atmosphere.](./Peril_in_Pinebrook_COMPLETE_images/image_002.png)![- A mostly blank, portrait-oriented sheet with a subtle textured paper look. - Very light off-white/blue-gray tone with faint mottling and small speckles across the surface. - Slightly darker, soft blue-gray vignette around the edges, giving a stationery or watercolor-paper appearance. - No text, objects, or identifiable features present.](./Peril_in_Pinebrook_COMPLETE_images/image_003.png)![A mostly white, high-contrast abstract image. A large pale green, textured rectangular shape tilts diagonally across the center-right. The top-right corner contains a solid black triangular area, creating a strong diagonal divide. Overall the image looks like a lightly textured sheet or painted surface with a dark corner.](./Peril_in_Pinebrook_COMPLETE_images/image_004.png)![A photograph of a white sheet or print tilted on a dark background, showing a very faint, textured mint-green floral silhouette. The design features a tall stem with a rounded bloom at top and several leaves; the image has a soft, chalky or watercolor-like texture and is rotated slightly counterclockwise.](./Peril_in_Pinebrook_COMPLETE_images/image_005.png)![A mostly white, rotated sheet or panel set against a black background. The lower portion has a wide, pale teal/seafoam brushstroke or watercolor wash with subtle texture and streaks; the sheet’s bottom edge is rounded and angled, giving the whole image a tilted, cut-out appearance.](./Peril_in_Pinebrook_COMPLETE_images/image_006.png)![A tall, narrow portrait image showing a mostly white/off‑white background with a soft seafoam‑teal watercolor wash running down the right side. The teal area has irregular, organic edges, subtle tonal variations (darker core, lighter feathered margins), and a paper‑like texture—overall it looks like watercolor paint on paper and could serve as a decorative background or stationery element.](./Peril_in_Pinebrook_COMPLETE_images/image_007.png)![A close-up photo of a blue, marbled 20-sided gaming die (d20) with white engraved numbers. The die sits on a light surface and casts a soft shadow; the "20" face is prominently visible near the top. The surface shows glossy reflections and slight wear around the numerals.](./Peril_in_Pinebrook_COMPLETE_images/image_008.png)

\page


Peril in Pinebrook provides a play experience that can be completed in 60 to 90 minutes. It’s fine to take breaks or run the adventure in shorter sessions.

The play experience can also be made longer if desired. Allowing time for people to roleplay their characters and talk with each other adds to the fun of D&D. Before play begins, the DM should read through this document to get a better understanding of the rules and the adventure.

## Using the Rules

Peril in Pinebrook uses a simplified version of the Dungeons & Dragons rules to teach the game to new DMs and players. The text of the adventure also contains tips that DMs and players might find useful.

### Character Actions

A character's actions hold the potential for either success or failure. Can you hit a monster with your weapon? Can you balance on a narrow ledge as you ascend a mountain? Can you convince a dragon not to eat you?

You find the answer to these questions during the game by making a d20 roll! d20 Rolls

The 20-sided die (d20) is the most-used die in D&D. It is rolled whenever a character or a creature tries to do something important.

Things a character might try to do are listed under “Attacks” and “Skills” on the character sheets. Next to attacks and skills are number expressions, such as “+5 to hit.” This is the number you add to your die roll when your character uses that attack or skill.

For example, the character sheet for Shalefire Stoutheart lists “Handaxe” under “Attacks,” with “+6 to hit” next to it. If Shalefire wants to attack a monster with their handaxe, the player rolls a d20. If the die roll is a 10, the player adds 6 to the die roll for a final attack score of 16.

How does the player know if their roll succeeds or fails? Read on to find out!

### Armor Class

The number a character tries to equal or exceed with an attack roll is called Armor Class (also called AC). The higher a creature’s Armor Class, the harder that creature is to hit. In the previous example, Shalefire’s attack roll with a handaxe would hit a creature with an Armor Class of 16 or lower.

### Damage

When an attack roll hits, it deals damage. The damage roll appears after the attack on the character sheet. Shalefire’s handaxe does “1d6 + 4 damage,” so the player would roll one 6-sided die (d6) and add 4 to the die roll.

### Difficulty Class

Difficulty Class (DC) is the number that a character must equal or exceed to succeed at an action that is not an attack. This includes rolls to use skills.

\page


For example, if Shalefire wants to move a heavy boulder blocking the mouth of a cave, that requires a skill called Athletics. Under “Skills” on Shalefire’s character sheet, it says “Athletics +6,” so Shalefire’s player rolls a 20-sided die and adds 6 to the number on the die. If the Difficulty Class to move the boulder is 12, the player would need to roll a 6 or higher for Shalefire to move the boulder.

The Difficulty Class for actions a character can attempt is given in the adventure text. In general, a Difficulty Class of 10 (DC 10) is easy, while a DC of 15 is challenging. Most of the actions in this adventure are DC 10. The Dungeon Master can change DCs if circumstances make an action easier or harder.

They can also make up their own DCs when the characters attempt actions not covered in the adventure.

### Advantage and Disadvantage

Sometimes what’s happening in the adventure makes things easier for a character. At other times, the odds are stacked against the heroes. These circumstances can be reflected in

D&D as “advantage” or “disadvantage.”

#### **DM Tip**

Advantage and disadvantage are powerful game tools. They make d20 rolls more likely to succeed or fail, so use them wisely. They are best used as a reward for clever play by the players, or to represent good or bad luck affecting the story. In the full version of the D&D rules, certain rules automatically give a character advantage or disadvantage. For this adventure, the DM can decide when to apply advantage or disadvantage to rolls. If a character has both advantage and disadvantage on a roll, they cancel each other out, and the roll is made normally.

#### Advantage

If Shalefire attacks a monster with a handaxe while the monster is distracted by another character, the monster can’t see the attack coming. The DM might decide the monster is easier to hit while distracted, so Shalefire would make the attack roll with advantage.

Advantage means that instead of rolling the d20 once for the attack roll, Shalefire’s player rolls the d20 twice and uses the higher roll. They then add the normal modifier (+6 for Shalefire’s handaxe) to get a final attack result.

#### Disadvantage

Disadvantage works like advantage in reverse. If something in the game makes it harder to take an action, the roll for that action is made with disadvantage. For example, as Shalefire climbs a cliff using a rope, a monster at the top of the cliff shakes the rope. Because it’s now harder to climb, Shalefire makes the d20 roll to climb the rope with disadvantage. Disadvantage means that instead of rolling the d20 once to make the Athletics check to climb, Shalefire’s player rolls the d20 twice and uses the lower roll. They then add the normal modifier (+6 for Shalefire’s Athletics skill) to get a final result.

\page


![A single marbled blue game die (cube) sitting on a light surface. The top face shows the number 5, the front face shows a white 6 (with a small underline), and the right face has a curved-arrow marking. The plastic has a glossy, swirled finish and the die casts a soft shadow.](./Peril_in_Pinebrook_COMPLETE_images/image_009.png)![A mostly blank, portrait-oriented sheet with a subtle paper texture. The background is off-white with faint blue-gray mottling and a gentle darker vignette around the edges. No text, figures, or distinct objects are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_010.png)![A mostly white, minimalist composition with a sharp black triangular area in the top-right corner. Across the center and lower-left there are pale, textured, almost translucent greenish rectangular shapes laid diagonally. The image has a rough, paper-like texture and high-contrast geometric simplicity.](./Peril_in_Pinebrook_COMPLETE_images/image_011.png)![A tilted white sheet or panel against a dark background showing a very pale mint-green botanical silhouette. The design is a soft, grainy/washed texture of a tall flower with a round bloom at the top, a slender stem and several elongated leaves. The overall look is faded, watercolor- or chalk-like and mostly white space.](./Peril_in_Pinebrook_COMPLETE_images/image_012.png)![A diagonally rotated, mostly white sheet or canvas set against a black background with a soft, pale mint/aqua brushstroke running across the lower third. The brushstroke shows visible texture and subtle gradients; overall the image is minimal and abstract with clean, airy tones.](./Peril_in_Pinebrook_COMPLETE_images/image_013.png)![- Tall, narrow vertical image with a lot of white negative space. - A soft sea‑foam / teal watercolor wash runs down the right side — semi‑transparent layers, feathery edges, light splatter and drip marks that fade toward the bottom, giving an organic, hand‑painted texture.](./Peril_in_Pinebrook_COMPLETE_images/image_014.png)

### Hit Points

Every creature in D&D has a number of “hit points.” This number reflects the damage a creature can take before it falls unconscious or is defeated. When a character or creature is damaged by an attack roll or a hazard in the game, the amount of damage dealt is subtracted from the character’s or creature’s hit points. If a creature reaches 0 hit points, they are defeated. The players can decide if this means a creature is dead or unconscious or if they run away.

When a character reaches 0 hit points, they are unconscious. In this adventure, a character at 0 hit points remains unconscious until they regain hit points through healing or until the end of the encounter, when they regain 1 hit point automatically. The adventure details ways to regain hit points.

**Using the Rules |**



\page

## Running an Adventure

A DM gets to use their imagination while presenting the adventure to the other players. The DM can add excitement to the game as they describe the situations and help players navigate their way through the action.

### Presenting Encounters

This adventure is divided into “encounters,” which are like scenes from a movie or show. Each encounter has specific challenges. Once the players complete the challenges, move on to the next scene. The flow of the game is described below.

### Game Flow

A D&D session begins with the DM and the other players having a conversation. The DM explains the situation the characters are in. The players can ask questions about the situation, and the DM answers those questions to further explain what’s happening.

Then the DM asks the most important question in the DM’s toolbox:

"What do you do?"

At this point, players should explain what they want their characters to do. (If what they want to do is impossible, the DM says so and asks the player to choose a different action. For example, a character can't walk through a wall unless they have some special ability or magic that allows them to do so.) If the action is possible and very easy to do, the character automatically succeeds. Opening an unlocked door or lifting a light object doesn’t require heroic effort, so no d20 roll is necessary.

When the action is somewhere between easy and impossible, trying to do it could lead to success or failure. That’s when the DM calls for a d20 roll. See the "d20 Rolls" section earlier in this document. The d20 roll, plus its modifiers, determines whether the action succeeds or fails. What does success or failure mean for an adventure? This is where you and the players get to tell a story together!

### Narrating Successes and Failures

When a d20 roll succeeds or fails, the DM and the players can turn that result into a part of the ongoing story. What does it look like when a monster is defeated? What does Shalefire say or do if the heavy boulder blocking the cave doesn’t budge? These points in the game can spark great storytelling and acting moments.

Remember, though, that part of the DM’s job is to keep the game’s story moving forward. If describing every single attack roll in a long combat gets boring, just say how much damage the attack deals and get to the next exciting moment.

### Tips for Dungeon Masters

Here are some tips for DMs that can help them run great games:

**Rule 0.** Rule 0 of D&D is simple: Have fun. It’s fine if everyone agrees to change the rules as long as doing so means the game is more fun for everyone. **Be Supportive.** The players and the DM are all on the same team. DMs aren’t playing against the characters. The

\page


#### **| Running an Adventure**

DM wins when the players have fun and the story is exciting and memorable.

**Use “Yes, and …” or “No, but …”** Allow the players to succeed as much as possible, and let them participate in the telling of the story. If they want to try something unexpected, try to say “yes” and then work their ideas into the story. If you have to say “no” to a player’s idea, suggest options that let them do something similar.

**Use Your Imagination.** Peril in Pinebrook is an outline for your game. Change or make up anything you need to if it makes the game more fun. The text can’t cover everything players might want to do. What does a monster smell like? That’s up to you, or you can ask the players what they think!

**NPCs Are Your Voice.** While the players determine what their characters do, the DM controls all the other characters in the game. Nonplayer characters (also known as NPCs) are a great tool for the DM to help the characters understand the game and the story, and to work information into the story smoothly. **Allow Alternatives.** D&D is a game of fantasy, where heroes use wits, skill, and determination to overcome obstacles. Sometimes those obstacles are defeated with weapons and spells. But characters can succeed in other ways. Communicating with monsters, tricking them or frightening them away, or avoiding a fight while cleverly sneaking past a challenge can be just as much fun. Such options are ideal if anyone playing the game wants to avoid violence. **Listen to Your Players.** Encourage your players to speak to you, publicly or privately, if something in the game upsets them. Then respond appropriately. For instance, you can move past upsetting topics by quickly narrating a resolution to a scene, then quickly move to the next part of the story.

![A close-up photo of a blue, marbled 20-sided gaming die (d20) with white numerals. The die is tilted so the faces showing include 20, 2, 8, 14, and 18. It sits on a light surface with a soft shadow around it; background appears largely removed or brightened. The plastic has a glossy finish and the numbers are painted in white.](./Peril_in_Pinebrook_COMPLETE_images/image_015.png)![A glossy, marbled blue gaming die (six-sided) sits on a light surface casting a soft shadow. The top face shows a white "5", the front face a white "6" with a small minus-like mark beneath it, and the right face shows part of a circular arrow symbol. The die has rounded edges and white recessed numerals set against a swirled blue finish.](./Peril_in_Pinebrook_COMPLETE_images/image_016.png)![The image shows a pale, light-blue textured paper background with a subtle mottled/grainy surface and slightly darker blue shading along the edges, creating a faint vignette effect. There are no distinct objects, text, or people.](./Peril_in_Pinebrook_COMPLETE_images/image_017.png)![A portrait-oriented, mostly blank sheet of paper with a subtle textured grain. The paper is off-white with a faint cool/blue tint toward the edges and very light mottling across the surface; no text, drawings, or distinct marks are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_018.png)![A wide horizontal banner showing a soft mint‑green watercolor wash across the lower-left to center area, with painterly, irregular edges and visible paper texture that fades to white toward the right and top.](./Peril_in_Pinebrook_COMPLETE_images/image_019.png)![A rotated, abstract paint composition dominated by pale mint/seafoam green brushstrokes against a white background. The marks are wide, semi-translucent swaths with visible ribbed texture and layered ridges, some curving and overlapping to create depth. The image is tilted so the painted area runs diagonally across the frame; small scraped or splattered highlights and areas of thinner paint add contrast. Overall it reads as a minimalist, textured brushwork study.](./Peril_in_Pinebrook_COMPLETE_images/image_020.png)![A vertical, stylized botanical illustration on a pale off‑white background. Soft, mint‑green leaves and thin stems form a loose spray across the page; the foliage has a textured, stippled or sponge‑print look rather than crisp lines. The composition shows several compound leaves and intersecting stems, with two black triangular corners (top‑left and bottom‑left) where the image is cropped. Overall the image reads like a delicate, vintage‑style leaf print or wallpaper motif.](./Peril_in_Pinebrook_COMPLETE_images/image_021.png)![- Large white canvas with a light teal/green speckled splatter pattern. - Speckles and small chips are denser on the right side and fade toward the left, creating a diagonal gradient. - Texture appears like fine spray paint or ink splatter with occasional larger droplets. - Overall minimal, airy background suitable for subtle textured backgrounds or stationary.](./Peril_in_Pinebrook_COMPLETE_images/image_022.png)![A mostly empty sheet with a pale, cool-blue paper texture. It has a subtle vignette (darker blue near the edges), light mottling/grain across the surface, and no text, objects, or distinct features.](./Peril_in_Pinebrook_COMPLETE_images/image_023.png)![- A single sheet of textured paper filling the frame. - Very light, off-white to pale blue tint with subtle mottling and faint darker edges. - No text, images, or distinct markings — looks like decorative or stationery background.](./Peril_in_Pinebrook_COMPLETE_images/image_024.png)![A wide, horizontal banner showing a soft mint-green watercolor wash concentrated at the left that fades into a white background toward the right. The paint has a textured, brushed look with uneven edges and subtle variations in tone; there are no distinct objects, figures, or text.](./Peril_in_Pinebrook_COMPLETE_images/image_025.png)![- Abstract close-up of paint brush strokes on a pale background. - Broad, textured strokes in a soft seafoam/teal color with visible ridges and scraped paint detail. - Strokes are mainly vertical/arched but the whole image is slightly rotated, giving a diagonal feel. - Background is off‑white with faint diagonal striping; small black triangular corners appear at the top-left and bottom-left edges. - Overall impression: muted, airy, painterly composition focused on texture and flow.](./Peril_in_Pinebrook_COMPLETE_images/image_026.png)![- A tall, vertical botanical illustration on a white background. - Pale teal/seafoam-green leaf clusters and slender stems arranged diagonally across the image. - Leaves have a soft, textured, stippled or stamped appearance (like a leaf rubbing or sponge print). - Two black triangular corner areas at the top-left and bottom-left edges (likely from cropping or framing).](./Peril_in_Pinebrook_COMPLETE_images/image_027.png)![The image shows a mostly white background with a pale teal/seafoam paint-splatter pattern concentrated along the right side and upper-right quadrant. Speckles range from very fine mist-like dots to larger irregular chips; density fades leftward, creating a subtle gradient from dense splatter to nearly clean white. Overall appearance is abstract, like spray paint or watercolor splatter used as a textured background.](./Peril_in_Pinebrook_COMPLETE_images/image_028.png)![A mostly blank, slightly textured sheet with a soft blue-gray vignette around the edges. The center is bright white with faint paper grain and subtle speckling, giving the appearance of aged or watercolor paper. No text, objects, or people are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_029.png)![- Abstract, high-contrast image with a large off-white/very pale area at the top. - A small black triangular corner appears at the top-left. - The lower and right portions contain a rough, chalky/grunge textured block in pale blue-gray, arranged on a diagonal across the frame.](./Peril_in_Pinebrook_COMPLETE_images/image_030.png)![- A soft, mint-green botanical print of a flowering stem with several compound leaves and a single daisy-like flower. - The artwork has a rough, speckled texture that looks like a stamped or monoprint effect. - The image is placed on a white square that is rotated about 30–45° against a black background.](./Peril_in_Pinebrook_COMPLETE_images/image_031.png)

\page


**Attacks.**

Each character can make attacks with melee or ranged

weapons, or with melee or ranged spells. “Melee” means an attack

that is used when a character is right next to a monster. “Ranged”

means an attack that is used when a character isn't near a monster.

The number after the attack on a character sheet is added to a d20

roll (a roll of a 20-sided die) when a character attacks. The higher the

number, the more likely the attack succeeds.

**Skills.**

Each character can use the skills listed on their character

sheet. The number after a skill shows what the player adds to a d20

roll. The higher the number, the better the character is at that skill.

If a character wants to use a skill that isn't on their character sheet,

the player rolls a 20-sided die but doesn’t add a number to the roll.

**Equipment.**

A character has equipment they can use to overcome

challenges during adventures. They also might find more equipment

during adventures.

**Special Ability.**

Each character has a special ability. This ability lets

a character do something during the adventure that other characters

can’t do. You get to choose when your character uses their special

ability, but a character can use a special ability only a limited number

of times or under special circumstances.

Explain how d20 rolls work with the following example:

The character Noorah Eldenfield has a shortbow attack that says “+5

to hit.” When Noorah attacks with a shortbow, Noorah's player rolls a

d20 and adds 5 to the number rolled on the die. I’ll tell you if that

attack hits the monster. If it does, Noorah’s shortbow attack also says

“Damage 1d6 + 3.” The player rolls a 6-sided die and adds 3 to

determine the damage dealt by the attack.

A “Player Reference Sheet” also details some of the terms on the

character sheets.

Now let’s get on with the game!

Adventure Introduction

**If you are a player, stop reading here! The rest of this document**

**is for the Dungeon Master only.**

In

Peril in Pinebrook,

the characters find a newborn dragon

and must return the infant to its mother’s lair. The lair, however,

is under attack by hostile forces. As the DM, you'll present the

challenges the characters face as they take the baby dragon home.

Text that appears in a box like this is meant to be read aloud to

the players. You can read boxed text word-for-word, or use your

own words.

To begin the adventure, show your players the character sheets.

Then read the following passage aloud to your players:

We’re going to play a short game of Dungeons & Dragons. These

character sheets have information about your characters on them.

You can each have one character to play.

You can let the players choose their characters, but if you're time is

limited, consider choosing characters for them.

Once each player has a character sheet, read the following:

Write your name in the space where it says “Player Name.”

Your character already has a name, which you can use if you want,

or you can change the name. There's space below the name where

you can give your character a nickname and add your

character's pronouns.

Each character sheet has a “Description” area for your character’s

appearance, personality, and attitude. Choose from the options there

or make up your own. You can act out how your character behaves

based on their description and personality.

Offer to help the players fill out these parts of their character

sheets if needed. Do your best to answer questions from players,

\page


but some questions are best answered as they come up during

play. Let the players know that you'll give them more information

along the way. Still, you may need to pause between each section

to answer questions as you present the following information:

Let’s go over other parts of the character sheet. There is some

information you should know before we start playing.

**Race and Class.**

Each character in D&D has a race and a class that

help determine what things a character does best. Some of the other

information on a character sheet is based on a character’s race

and class.

**Armor Class and Hit Points.**

Each character has an Armor Class

(

also called AC) and hit points. Armor Class tells how hard it is to hit

a character with an attack roll. The higher the AC, the harder it is to

hit a character. Hit points determine how much damage a character

can take. When a character takes damage, subtract that damage from

the character’s hit points. If a character’s hit points reach 0, they are

unconscious. You'll learn how to regain hit points later in the game.

**Adventure Introduction |**

![An abstract, high-key painting made of broad, vertical and slightly arched brush strokes in a pale seafoam/teal color on a white background. The strokes show visible ridges and texture variations, with some scraped or uneven areas where the white ground shows through. Overall the image feels minimal, layered, and painterly, like a large swath of diluted acrylic or gouache applied with a wide brush.](./Peril_in_Pinebrook_COMPLETE_images/image_032.png)![A pale, mostly white background with a soft, mint-green speckled texture concentrated on the left and fading toward the right. The pattern looks like fine paint splatter or terrazzo-style flecks of varying sizes, distributed more densely near the center-left and becoming sparser toward the edges. Overall effect is airy and subtle, suitable as a background or decorative texture.](./Peril_in_Pinebrook_COMPLETE_images/image_033.png)![A high‑contrast, black‑and‑white abstract image. It shows several thick vertical black shapes on a white background; the black forms have slightly curved edges and there’s a white triangular notch cutting into the top right of one black shape. The overall look is minimal and graphic.](./Peril_in_Pinebrook_COMPLETE_images/image_034.png)![A stylized fantasy dragon in flight, shown from a three‑quarter view with wings fully extended. It has a long, sinuous neck and body covered in overlapping golden‑bronze scales, with spines running down its back. The large membranous wings show reddish and greenish tones and detailed veining; claws and a tapering tail are visible. The image looks like a painted or watercolor illustration against a soft cloudy sky.](./Peril_in_Pinebrook_COMPLETE_images/image_035.png)![A photo of a mostly blank sheet of textured paper. The surface has a very light, mottled grain with faint blue-gray shading concentrated along the edges, giving a subtle vignette or watercolor-paper appearance. No text, markings, or objects are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_036.png)![- Portrait-oriented abstract texture. - Mostly white background with a large pale blue‑gray, rough, chalky/brush-stroke area covering the lower two-thirds. - Solid black triangular wedge in the top-left corner and faint vertical/diagonal scratches/marks on the right. - No recognizable objects, text, or people.](./Peril_in_Pinebrook_COMPLETE_images/image_037.png)![An overhead view of a rotated square canvas with a pale teal, distressed botanical print. The design shows a stem with several textured leaves and a single daisy-like flower at the top right. The print has a weathered, stamp-like texture on an off-white background; black triangles fill the image corners outside the rotated square.](./Peril_in_Pinebrook_COMPLETE_images/image_038.png)![- Abstract close-up of paint brushstrokes on a light background. - Vertical, sweeping strokes in a pale mint/seafoam color with visible bristle texture and streaky highlights. - Areas of thinner paint show white underneath, giving a layered, scraped effect and subtle tonal variation. - Overall impression is soft, painterly, and minimalist.](./Peril_in_Pinebrook_COMPLETE_images/image_039.png)![- A mostly white background with a pale teal/seafoam speckled spray concentrated on the left side and fading toward the right. - The speckles vary in size from very fine dots to small irregular chips, resembling paint splatter, mist, or terrazzo texture. - Overall appearance is light, airy, and abstract with an off-center composition.](./Peril_in_Pinebrook_COMPLETE_images/image_040.png)

\page


Starting the Adventure

**Estimated Time to Play This Encounter: 10 minutes**

When you and the players are ready to begin the adventure,

read the following:

You are from the village of Pinebrook, a small settlement near the

base of a mountain range called the Spine of the World. In addition to

their normal jobs, the citizens of Pinebrook take turns patrolling the

forest and hills around the village, making sure the area is safe for the

loggers who work in the forest and the miners who dig in the moun-

tains for iron ore. Today, it’s your turn to patrol the forest with some

of your friends.

Dangerous creatures sometimes wander the woods, but it has been

safe recently. Rumors have spread through the area that a friendly

silver dragon recently established a lair in the nearest mountain. The

more hostile creatures of the mountains, especially the dangerous ice

trolls, haven’t been seen in the past two months. Yesterday, however,

a patrol saw large, frosty troll footprints in the forest. Could the

rumors of a friendly silver dragon be just rumors after all?

Your patrol today is led by the head of the village guards, Captain

Emmajeen Kole. Captain Kole glances nervously at the forest trail be-

fore she nods at your group.

“I’ve not patrolled with any of you before. Tell me a little about

yourselves.”

Ask each player to give their character’s name or nickname and

describe what they look like. They can reveal the things they are

carrying that the other characters would see, explain what attacks

and skills they have, and maybe even describe their personalities.

They can use their character sheets as prompts.

Roleplaying

D&D lets players act as their characters. Players might use a

different voice or move as their character might. But if a player

isn't comfortable roleplaying in that way, they can describe their

character as if from a book or story instead.

It's okay if some players seem hesitant to talk or have trouble

roleplaying. It’s more important to make the players feel

comfortable than to make them talk. To help them feel more

comfortable with roleplaying, consider asking them one or two

of the following questions:

•

What’s your character’s name or nickname?

•

What does your character look like?

•

What does your character sound like when they talk?

•

What is your character good at doing?

•

What does your character carry as they patrol the forest?

•

How does your character feel about being on patrol the day

after evidence of ice trolls was found in this area?

Once all the characters have introduced themselves, Captain

Kole speaks again:

“Well, this forest needs to be patrolled, so let’s get to it. I’m ready to

fight if we have to!”

Let the players respond for their characters if they want to.

Then, describe how Captain Kole moves carefully into the

forest, motioning for the characters to follow.

Proceed to Encounter 1: A Not-So-Fearsome Dragon.

**| Starting the Adventure**



\page

## Encounter 1: A Not-So-Fearsome Dragon

### **Estimated Time to Play This Encounter: 10 minutes**

After the the characters follow Captain Kole into the forest, read the following:

You move along the forest trail for fifteen minutes before Captain Kole stops and holds up a hand. “Do you hear that?” she asks. You’re going to make a Perception check to see if you can hear what Captain Kole hears. "Perception" is listed on your character sheet under “Skills.” Each of you should roll a 20-sided die and add the number next to your Perception skill on your character sheet. Then tell me the total of your Perception check.

### Perception Checks

A player rolls a d20 and adds the modifier written next to the Perception skill on their character sheet to make a Perception check. The Difficulty Class to succeed on this check is 10 (written as DC 10), so if anyone gets a Perception check of 10 or higher, you explain that they hear a noise coming from the thorny forest underbrush.

If no character succeeds on the Perception check, Captain Kole points in the direction of the sound. Continue reading:

The underbrush at the edge of the trail rustles as a creature the size of a large dog crawls from the thorns and leaves. At first, the creature looks like a strange lizard made of metal. But as you look more closely, you see that it is a small dragon with blue-gray scales and a long, pointy tongue.

As the dragon crawls in your direction, it feebly tries to scrape pieces of silver eggshell off its head and face. It makes a hissy, whimpering sound.

Ask the players what they want to do. Let them play their characters as they react, talk, speculate, and investigate further. As long as the characters don’t try to hurt the baby silver dragon, Captain Kole simply stares in confusion, unsure what to do next.

### Roleplaying and Information

The players will probably ask questions throughout the adventure. To give the players the proper information, try dividing answers into the following three categories: **Information the Characters Know.** If the players ask about information their characters would know, you can tell them that information. For example, the characters always know what they see, hear, and smell.

**Information the Characters Might Know.** Players might learn information based on their characters' skills. For instance, Shalefire or Gallantine could ask if this is a baby silver dragon. As the DM, you can have their players make a DC 10 check with an appropriate skill to see if they know the answer to that question. Shalefire could use the Animal Handling skill, while Gallantine could use the Nature skill. If they succeed on the check (d20 + skill modifier is 10 or higher),

\page


![A small, high‑contrast black-and-white image showing mostly white negative space with a few sharp black shapes: - A large triangular/diagonal black area in the top-left corner. - Three narrow, irregular vertical black bars or pillars along the lower portion. - Clean, hard edges and no visible texture or identifiable objects.](./Peril_in_Pinebrook_COMPLETE_images/image_041.png)![A painted illustration of a large, winged dragon in mid-flight. It has a long, sinuous neck with small spines, a golden-brown scaled body, and broad leathery wings with reddish-brown mottling. The dragon’s talons are tucked beneath it and the background shows a soft, cloudy sky, giving a sense of height and motion.](./Peril_in_Pinebrook_COMPLETE_images/image_042.png)![A wide horizontal abstract image showing a pale mint‑green watercolor wash along the left and lower edges that gradually fades into a white background on the right and top. Soft brush textures, subtle granulation, and gentle gradients create a calm, airy background suitable for a banner or stationery.](./Peril_in_Pinebrook_COMPLETE_images/image_043.png)![The image shows a mostly blank, off‑white sheet of textured paper. There is a subtle blue‑gray vignette and light mottling/grain across the surface, giving a watercolor or stationery paper look.](./Peril_in_Pinebrook_COMPLETE_images/image_044.png)![A soft, teal-green watercolor wash on a white background. The paint forms a cloudy, irregular blob with feathery, diffused edges and visible paper texture; color is denser toward the left and fades toward the right. The top-right and bottom-right corners show triangular cutouts (black/white), suggesting the image is cropped or masked.](./Peril_in_Pinebrook_COMPLETE_images/image_045.png)![A very narrow, vertical crop showing a repeating pattern of diagonal, pale teal/seafoam-green stripes on a white background. The stripes are slightly mottled and have soft, faded edges, giving a watercolor or textured-paper appearance.](./Peril_in_Pinebrook_COMPLETE_images/image_046.png)![An abstract paint smear: broad, sweeping brush strokes in a warm peach/beige color across a white background. The paint shows visible texture and ridges from the brush, with diagonal strokes and layered bands of thicker and thinner pigment. Edges fade into white, and the composition sits slightly rotated with triangular black corners outside the canvas. Overall the image reads like a textured, painterly swatch or background.](./Peril_in_Pinebrook_COMPLETE_images/image_047.png)![- Tall, narrow image with a clean white background. - A concentrated spray of copper/rose-gold paint splatter and tiny flecks runs diagonally from the upper right toward the center/right area. - Splatter density is highest near the top-right and gradually thins out into fine dots and a few larger paint chips. - Overall feel: minimal, decorative, abstract — like a subtle metallic powder or paint-splash accent on a white page.](./Peril_in_Pinebrook_COMPLETE_images/image_048.png)![- A large, textured pale-peach/beige area fills most of the image; the texture looks like crayon, pastel, or a sponge-painted surface. - The peach area is diagonal, sloping up from the lower-left toward the upper-right. - A white strip runs along the top edge where the peach meets a thin black triangular corner at the very top-left. - Overall it resembles a close-up of a shaded paper background or a swatch of textured pastel artwork.](./Peril_in_Pinebrook_COMPLETE_images/image_049.png)![- A tilted sheet or canvas with wide, sweeping brush strokes in a soft peach/beige tone. - Visible texture from the brush (parallel ridges and streaks) and areas of varying opacity. - Mostly white background with the painted area concentrated toward the center-right; black margins outside the tilted sheet.](./Peril_in_Pinebrook_COMPLETE_images/image_050.png)

\page


you can tell them "Yes! This is a newborn silver dragon." You might add that they often eat meat and other food as well. **Information the Characters Don’t Know Yet.** A question like, “Where did this baby dragon come from?” is something the characters don’t know, at least not yet. When this happens, you can simply say, “You’re not sure, but you can try to find out.”

If the characters fail their checks or don’t ask the right questions, you can have Captain Kole provide information. She can confirm that this is a baby silver dragon, and she refuses to allow the characters to harm it in any way.

After the players ask all their questions and roleplay their reactions to the dragon, read the following:

Captain Kole pulls a book from her backpack, The Practically Complete Guide to Dragons. She flips to the middle of the book. “It’s true! This is a newborn silver dragon. The mother’s lair must be in the nearest mountain just beyond the forest, as the rumors said. We need to get this baby to its mother quickly. I wonder how the baby got so far from home?”

Captain Kole hesitates, then sighs. “I must return to Pinebrook and tell them what we’ve found. I need you to take the baby to the lair and its mother. Protect this dragon with your lives. Trails in the forest lead right up to the mountain. Give this poor thing a name and get it some food. It looks weak.”

She tears a page from the book and holds it out. “Here. This might be useful. According to the book, silver dragons are peaceful and usually like people.”

The page Captain Kole gives the characters is found in appendix A. It contains translations of Draconic, the language of dragons, into the Common language the characters know. The characters don’t need to read it now, but the information will be useful in the adventure.

### Feeding and Care

After Captain Kole leaves, the characters should attempt to find food for the dragon. You may want to point out that all the characters have rations listed on their character sheets under “Other Equipment.” Alternatively, Shalefire can make a DC 10 Survival check or Gallantine can make a DC 10 Nature check to find berries and nuts the dragon can eat.

Remind players how to make d20 rolls if needed. After the dragon is fed, it says one word: “Nytha.” The characters won’t learn this until later, but the baby just called the characters “Mama” in Draconic.

Once the dragon eats, it perks up and follows the characters. They can carry the dragon, who enjoys the attention. The dragon also loves belly rubs!

\page


### Moving the Adventure Forward

The mountain Captain Kole pointed the characters toward is visible above the trees.

When the players are ready, proceed to Encounter 2:

Living Icicles.

**A Not-So-Fearsome Dragon |**


## Encounter 2: Living Icicles

### **Estimated Time to Play This Encounter: 10 minutes**

Tell the players that the woods are quiet as the characters travel through the forest. They easily find the trails that lead to the mountain, and no forest creatures bother them.

When the characters arrive at the base of the mountain, read the following:

By carefully following the correct forest trails, you arrive at the base of the mountain. You see a cave opening not far ahead. If a dragon built a lair in the mountain, this would be an obvious entrance.

The cave is the only visible entrance leading to the dragon’s lair. When the baby dragon gets near the entrance, it sniffs the air and struggles to move closer, recognizing the smell of home. As the characters move closer to the cave, read the following:

The cave entrance is wide and filled with sunlight, but the cave quickly grows dark beyond, with no way to see if there is anything inside. Broken icicles and patches of frosty snow cover the ground at the cave entrance.

Suddenly, the shards of ice begin to twitch. The icicles and snow come together to form small ice creatures with wicked, pointy claws.

One of them cries, “Intruders! Slash ’em good!” as they attack!

Five **living icicles** dwell in the cave entrance. If you are playing this adventure with fewer than four characters, remove one living icicle per player missing, to a minimum of two living icicles. Use the information below to play the living icicles during combat.

### Living Icicles

**Armor Class** 10 **Hit Points** 7

#### Attack

***Claws.*** *Melee Weapon Attack:* +2 to hit. *Hit:* 1d6 slashing damage.

Read the following to get the players ready for their first combat:

Get ready for your first combat! Look at the "Attacks" section on your character sheet. If you want to make a melee attack, your character needs to move up to the icicle creatures. If you want to make a ranged attack, you can stay back.

Roll a 20-sided die and add the modifier listed by the attack you're using. Tell me the total, and I’ll tell you if the attack hit or missed. If you hit, roll a 6-sided die and add the damage modifier listed by the attack you're using and tell me the total.

#### Taking Turns

First, describe how the monsters are vicious, and the danger they present. Highlight how sharp their claws are. Try to make the players feel as if they’re in a battle for their characters’ lives. If the monsters make one or two successful attacks, that helps with this feeling. Let the characters act first, starting with the player on your left and going clockwise. Ask each player what they want to do, and encourage them to describe their actions so everyone can imagine what the scene looks like.

\page


After all the players have acted, any undefeated living icicles attack. Each monster that still has hit points moves to a different character and makes an attack using their claws. Roll a d20 and add the attack modifier (+2) to the roll. If the total equals or exceeds the Armor Class of the character being attacked, the attack hits. Roll 1d6, and tell the player to subtract that damage from their hit points. If the attack misses, nothing happens. Either way, describe the attack. Do the claws rend open a wound or rake harmlessly off armor?

Continue taking turns until all the living icicles are defeated. You can describe the living icicles shattering or melting as they're defeated. Or perhaps the living icicles flee when they're defeated. Just make it clear to the players that the living icicles can’t be chased and caught, perhaps by having them flow into narrow cracks in the mountainside where the characters can’t follow.

##### DM Tip

Running an exciting combat in D&D is like a thrilling amusement park ride: the players often want to be scared and excited, but they don't want the excitement to lead to certain character death. This is where you can perform storytelling and mathematical magic. You can intervene if the characters seem to be losing the battle. For instance, you can give the characters advantage on attack rolls or give the monsters disadvantage on attack rolls. See the "Using the Rules" section earlier in this document for details about advantage and disadvantage. Changing probabilities like this can improve the characters' odds in defeating the monsters.

![A vertical close-up illustration that looks like a serrated fin or leaf. Warm rusty reds and oranges along the top edge transition through purples and greens to blue at the bottom. Thin radial ribs and sharp, tooth-like points run along the jagged margin; the surface shows speckled paint texture and a soft aqua watercolor wash in the background.](./Peril_in_Pinebrook_COMPLETE_images/image_051.png)![A watercolor-style illustration of a small dragon or dragon-like creature perched on a rocky ledge, leaning over a calm pond. It has greenish-brown, scaly skin, a ridged neck, folded wings, clawed feet, a long tail, and a single glowing yellow eye focused on the water. Lily pads and pink water lilies float on the pond, where gentle ripples show the creature’s reflected image. The overall mood is quiet and contemplative, with soft, muted colors and painterly splashes around the scene.](./Peril_in_Pinebrook_COMPLETE_images/image_052.png)![A mostly blank, portrait-oriented sheet with a subtle paper texture. The center is very light (almost white) and the edges have a soft, pale blue wash/vignette. No text, objects, or distinct features are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_053.png)![A portrait-oriented, mostly blank sheet of textured paper. The surface is very light — off-white with a subtle blue-gray mottled texture and faint speckling, plus slightly darker, gently vignetting edges that give it a soft, aged/stationery look. No text, objects, or people are present.](./Peril_in_Pinebrook_COMPLETE_images/image_054.png)![A soft, irregular teal-green watercolor wash on a white background. The pigment forms a diffused, cloud‑like blotch with soft, feathered edges and visible paper texture; the color is denser toward the center/left and fades to pale at the edges. No text or recognizable objects are present — the image reads like an abstract paint wash suitable as a background or design element.](./Peril_in_Pinebrook_COMPLETE_images/image_055.png)![The image is a very tall, narrow vertical strip with a mostly white background. Diagonal, pale aqua/teal bands repeat down the length, giving a soft, washed‑out striped pattern. The texture looks slightly grainy with a few tiny specks and uneven faded areas, suggesting paper, fabric, or a printed border rather than a sharp graphic.](./Peril_in_Pinebrook_COMPLETE_images/image_056.png)![- A large, single broad brushstroke or smear in a warm peach/tan color, centered in the image. - Visible streaks and bristle textures running mostly diagonally (upper-left to lower-right) with lighter and denser areas. - Edges are irregular and feathered; parts of the white canvas show through. - The painted area is rotated slightly inside a white polygonal crop, with black corners visible outside that polygon.](./Peril_in_Pinebrook_COMPLETE_images/image_057.png)![A tall, portrait-oriented image with a clean white background and a decorative copper/rose‑gold paint splatter concentrated along the right side. The splatter ranges from fine mist-like dots to larger flecks, creating an organic, airy, asymmetrical pattern — looks like decorative ink or pigment scattered across the page.](./Peril_in_Pinebrook_COMPLETE_images/image_058.png)![- Abstract, diagonal composition. - Large textured field in pale peach / light orange, resembling crayon or chalk shading, fills the lower-right portion. - Narrow white strip runs along the top edge of the textured area. - Small black triangular area occupies the top-left corner, creating strong contrast.](./Peril_in_Pinebrook_COMPLETE_images/image_059.png)![A slightly tilted, mostly white canvas or paper with broad, soft peach-colored paint brush strokes across the center. The strokes are textured—visible ridges and parallel lines from the brush—running mostly horizontal with a gentle diagonal sweep. The overall look is minimal, airy, and abstract.](./Peril_in_Pinebrook_COMPLETE_images/image_060.png)![A close-up watercolor illustration of a single fin- or leaf-like structure, shown vertically against a white background. The jagged, spiky edge has pointed tips and ribbed veins; colors blend from warm rust and crimson at the top into purples, greens, and bluish tones near the base. The surface shows speckled texture and subtle washes of paint, with a pale aqua wash bleeding into the background.](./Peril_in_Pinebrook_COMPLETE_images/image_061.png)

\page


Rather than having a monster attack one character until they fall unconscious, have the monster attack a different character each turn.

This tactic keeps more characters in the fight longer. You can even say the baby dragon rushed in and took down a monster, but try not to use outside help very often.

#### After the Characters Succeed

Once the living icicles are defeated, ask the players what they want to do next. If they need help, suggest that they search the area.

##### Searching the Area

Some monsters carry treasure, so it's often a good idea for characters to search the monsters as well as the area around them. Unless treasure is hidden, the characters can easily find it without having to make a check.

Just inside the cave entrance, the characters find a worn leather backpack. Inside the backpack are the following items:

###### | Living Icicles

a package of dried meat, five torches, flint and steel for starting fires, and a pouch containing 12 gold pieces.

![A watercolor-style illustration of a small dragon perched on a rocky ledge, leaning down to peer into a pond. Key details: - Earthy, muted palette — browns and greens with soft washes and textured brushstrokes. - The dragon is scaled with a long neck and snout, yellow-green eye, folded wings, sharp claws, and a curled tail. - It gazes at the water where gentle ripples and a faint reflection appear. - The pond contains lily pads and two pink lotus-like flowers, adding a calm, whimsical mood.](./Peril_in_Pinebrook_COMPLETE_images/image_062.png)![The image shows a blank sheet of textured paper with a light bluish tint. Subtle grain and faint speckles are visible across the surface, and a gentle darker vignette appears near the edges. Overall it looks like a clean, slightly worn or handmade paper background.](./Peril_in_Pinebrook_COMPLETE_images/image_063.png)![A minimal, portrait-oriented image with a large area of white space and a soft, peach-pink watercolor wash concentrated on the right side. The paint has translucent layers, organic edges, subtle splatters and brush textures, and fades gently into the white background — overall an abstract, delicate background or stationery-style composition.](./Peril_in_Pinebrook_COMPLETE_images/image_064.png)![The image shows an abstract, lightly textured scene: - A large, irregular white shape (like a tilted page or panel) fills most of the frame. - Inside that shape is a broad, peach/beige, crayon- or pastel-like scribble with visible grain and overlapping strokes. - Dark black areas appear along the left edge and the top-right corner, creating strong contrast with the pale interior. - No people, text, or recognizable objects are visible; overall it looks like an abstract or sketched texture.](./Peril_in_Pinebrook_COMPLETE_images/image_065.png)![A slightly rotated white sheet or panel with a soft, pale-pink paint splatter pattern concentrated toward the center-right and lower area. The pink marks range from very fine speckles to small chips, creating a diffuse, textured look. Black triangular areas at the top-left and bottom-right suggest the sheet sits on a dark background.](./Peril_in_Pinebrook_COMPLETE_images/image_066.png)![A mostly white, tilted rectangular surface fills the image with scattered tan/orange paint splatter concentrated on the right half. The top-left and left edges show black triangular/angled areas (like background), while the splatter forms many small dots and a few larger blobs giving a speckled, random texture. No people or distinct objects are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_067.png)![- Abstract composition with a large, irregular pale peach/beige smear or wash across a mostly white background. - Texture looks like crayon/pastel or rough brush strokes with visible grain and soft, uneven edges. - The painted area sits slightly rotated; dark black triangular corners crop the image, giving an overall angled/octagonal framing. - Overall impression: soft, muted, textured color field on a clean background.](./Peril_in_Pinebrook_COMPLETE_images/image_068.png)![A minimalist, diagonal composition: a bright white triangular plane dominates the top-right, separated by a sharp diagonal from a solid black lower-right area. The left edge of the white triangle features a soft, pale blue watercolor wash with subtle splatters and drips, giving a paper-or-canvas-like texture. Overall impression: an abstract, geometric layout with a watercolor accent.](./Peril_in_Pinebrook_COMPLETE_images/image_069.png)![- Portrait-oriented abstract/minimal image. - Predominantly white background with a large pale peach/beige watercolor wash concentrated on the left and lower-left areas, fading toward the center. - Subtle texture in the wash (brush strokes and faint handprint-like marks). - A narrow black diagonal strip along the top edge near the left corner. - Overall airy, minimal composition with a lot of negative space.](./Peril_in_Pinebrook_COMPLETE_images/image_070.png)![A vertical fantasy illustration of a large, reptilian dragon perched on a rocky outcrop with its wings raised. - Stance/pose: Standing on a ledge, foreclaw on the rock, wings spread upward and outward; tail curls down and around the rock. - Anatomy/details: Long sinuous neck, spiky crest along head and back, visible sharp teeth, taloned feet, layered scales and pronounced musculature. - Colors & style: Muted metallic greens, golds and bluish highlights with painterly brushwork and textured shading. - Background & framing: Mostly white/negative space around the figure; small treetops visible near the lower edge to imply scale and height. - Mood: Majestic and imposing, a mix of natural realism and stylized fantasy illustration.](./Peril_in_Pinebrook_COMPLETE_images/image_071.png)![A blank sheet of textured paper with a very light blue-gray vignette around the edges. The surface shows subtle paper grain and small speckled marks, giving it a soft, slightly worn stationery look.](./Peril_in_Pinebrook_COMPLETE_images/image_072.png)

\page


Dividing Treasure

Let the players divide up the treasure as they wish. If they start

to argue over who gets what, use the dragon to calm everyone

down. The baby cries if the characters argue!

Healing Injured Characters

If any characters took damage from the living icicles, the best

way to heal the damage is for Evandon to use their special

ability to cast a spell called

Cure Wounds

. Shalefire also

has a special ability to heal their own damage, but only once

during the adventure. (The full rules of D&D have other ways

to heal damage, but this adventure relies on Evandon’s spells,

Shalefire’s special ability, and on other healing opportunities

later in the adventure.)

What Did We Just Fight?

Living icicles are magical creatures that ice trolls sometimes

use to guard places. A character who succeeds on a DC 10

check using skills such as Arcana or History knows this and can

tell the other characters what they know.

Moving the Adventure Forward

The baby dragon tries to run into the cave. When the characters

are ready, proceed to Encounter 3: A Dangerous Lair.

**Living Icicles |**


## Encounter 3: A Dangerous Lair

### **Estimated Time to Play This Encounter: 15 minutes**

After defeating the living icicles and entering the cave, the characters must contend with the hazards and dangers of the tunnels that lead to the silver dragon’s lair. When the characters enter the cave, read the following:

The front of the cave is lit by sunlight coming through the opening, leaving the back of the cave in darkness. The cave walls contain rough chalk drawings of creatures that look like trolls dancing and working.

Ask the players to make either a DC 10 History or Religion check for their characters. Although Evandon is the only character who has a bonus to their Religion skill and Gallantine is the only character with a bonus to their History skill, the other characters can still attempt a History or Religion check. The players just don’t add anything to the d20 roll when they do.

If any of the characters succeeds on the skill check, tell the players that ice trolls once lived and worked in the cave. Even if no one succeeds on the skill check, continue by reading the following:

The baby dragon gets more excited after entering the cave, as if it knows it's close to home. Barely visible in the shadows at the back of the cave, a passageway turns into a tunnel that slopes upward toward the center of the mountain.

Because the cave is dark and spooky beyond the entrance, the characters need to use the torches found in the worn leather backpack to light their way as they explore. The flint and steel in the backpack can be used to light the torches.

### Reaching the Lair

The characters must overcome three challenges to safely reach the hatching cavern of the silver dragon’s lair. Each challenge can be overcome in a variety of ways, using skills, equipment, or attacks.

The challenge descriptions suggest potential ways characters can overcome each challenge. However, if the players come up with other ways that might work, let them make a d20 roll that somehow connects to their idea. Imagination often leads to an even more creative story!

\page


#### Challenge 1: Climbing Icy Walls

As the characters move through the passage, read the following:

The cold, frosty passage continues until you reach an ice-covered wall. The passage continues fifty feet above. You’ll have to climb the wall to move deeper into the mountain.

Characters must succeed on a DC 10 Athletics or Acrobatics check to climb the wall. If a character fails the check, roll 1d6. Tell the player to subtract that number from the character's hit

##### | A Dangerous Lair

points to represent the damage the character takes from falling before they eventually reach the top.

Noorah has a Climber’s Kit on her character sheet (under “Other Equipment”) that gives her advantage on the check. If a character who reaches the top has a rope, they can lower the rope to help the other characters. Characters who use the rope can reach the top without making a check. The passage then continues upward.

###### DM Tip

If a character carries the baby dragon and falls during the climb, the dragon doesn’t take damage. You can reward a character protecting the baby dragon by giving them advantage on certain rolls.

#### Challenge 2: Magical Ice Mirror

As the characters continue, read the following:

The winding, upward-sloping passage is interrupted by a thin sheet of solid ice. Through the ice sheet, you can see the passage continues on the other side. As your torchlight flickers, the ice suddenly becomes as reflective as a mirror, its surface shimmering strangely. In those reflections, you and your companions are all silver dragons, and the baby dragon looks like a human toddler with silver skin.

Let the players roleplay and react to this unique discovery, then continue:

The head of a large, platinum-colored dragon appears in the ice and speaks. You understand the words the Dragon speaks, even though it isn't speaking in a language you know.

“You are on a blessed quest, but you must speak the correct words in the correct language to enter the lair of one of my children. What two words correctly answer this question: What type of creature are you escorting home?”

Ask the players to make a DC 10 Arcana, History, or Religion check. If a character succeeds on the check, tell them that the figure in the ice represents Bahamut, the god of the metalliccolored dragons (brass, bronze, copper, gold, and silver). The correct answer to the question is “silver dragon.” However, the characters must say this in the Draconic language. They can use the page from Captain Kole’s book to find the correct words: “orn darastrix.”

![A portrait-oriented, mostly white image featuring a soft, translucent blush-pink watercolor wash concentrated along the right side. The wash has irregular edges, subtle gradients, faint splatters and paper-like texture, leaving large empty white space on the left. Overall feel: light, airy, and minimalist.](./Peril_in_Pinebrook_COMPLETE_images/image_073.png)![An abstract image dominated by a large, tilted white polygonal area with softly rounded corners. Across that white field are broad, pale peach/orange crayon- or chalk-like scribbles and textured smudges forming diagonal bands. Small black triangular regions appear at the image corners outside the white shape, creating high contrast. Overall the composition feels like a light pastel or crayon sketch on paper.](./Peril_in_Pinebrook_COMPLETE_images/image_074.png)![- A mostly white, slightly tilted rectangular page or canvas against a dark background. - Light pink–reddish speckled/paint-splatter texture concentrated toward the center-right, with many tiny dots and some larger flecks. - Speckling density gradually decreases toward the edges; subtle shading along the page edges gives a gentle three-dimensional, rotated look.](./Peril_in_Pinebrook_COMPLETE_images/image_075.png)![A large, diagonally oriented white surface (like a sheet of paper) fills most of the frame against black triangular areas at the top-left and left edges. The right half of the white surface is scattered with many small tan/orange paint splatters and speckles, denser toward the center-right and upper-right. Overall the image looks like a tilted white page with a light beige/orange splatter texture.](./Peril_in_Pinebrook_COMPLETE_images/image_076.png)![An abstract, pale peach/orange textured brush or crayon mark centered on a white background, oriented diagonally with irregular, sketchy edges; the image corners show black triangular cropping.](./Peril_in_Pinebrook_COMPLETE_images/image_077.png)![A large white triangular shape set against a black background, appearing like the corner of a sheet or canvas cut on the diagonal. The left portion of the triangle features a soft, pale blue watercolor wash with irregular edges and small splatters; the right portion is clean white with a subtle beveled shadow that gives a slight 3D or folded effect. Overall the image feels minimal and abstract, combining crisp geometry with organic paint texture.](./Peril_in_Pinebrook_COMPLETE_images/image_078.png)![The image shows a mostly white, minimalist background with a soft, pale peach watercolor wash concentrated along the left and lower-left areas. Subtle texture and faint handprint-like marks appear within the wash. A narrow, angled black band runs along the top edge at the right side. Overall it resembles a lightly stained or painted sheet of paper with an abstract, airy composition.](./Peril_in_Pinebrook_COMPLETE_images/image_079.png)![- A painted or illustrated scene of a large dragon perched on a rocky outcrop, shown in a vertical composition. - The dragon faces left with wings partly raised; long neck, prominent jaw with visible teeth, and a crown-like crest of spines on its head. - Scaled body rendered with metallic tones — greens, blues, and gold highlights — and visible brushstrokes that give a painterly texture. - Strong forelimbs with sharp claws gripping the rock; a long, spiked tail curls down toward the bottom edge. - Sparse background: mostly white space around the creature, with a few small treetops visible near the base to suggest scale and elevation.](./Peril_in_Pinebrook_COMPLETE_images/image_080.png)

\page


If the players need help answering the question, or if they get the answer partly right, Bahamut’s reflection can provide hints such as, “You have one word correct, but you need the other.”

If any character speaks the correct words, read the following:

The ice mirror instantly melts, splashing you all with icy-cold water. But instead of freezing you, the water tingles as it runs down your skin, clothes, and armor. It feels wonderful.

Bahamut blessed this water. Tell your players that the healing magic restores each character's hit points to the maximum amount listed on their character sheets.

![A nearly blank, pale-blue textured background that looks like a sheet of paper or watercolor paper. The center is very light (almost white) with subtle mottling/grain, and there’s a soft blue vignette around the edges. No text, objects, or distinct shapes are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_081.png)![- A vertically oriented sheet of textured, off-white paper. - Very light blue-gray mottling and subtle speckled grain across the surface, slightly stronger near the edges. - Overall appearance: blank stationery or watercolor paper with a soft, worn texture.](./Peril_in_Pinebrook_COMPLETE_images/image_082.png)![The image is a very narrow, vertical strip showing a pale off‑white to light pink gradient with faint, subtle mottling and a few tiny darker specks. It looks like a close-up or cropped edge of a surface (paper, fabric, or wall) with minimal texture.](./Peril_in_Pinebrook_COMPLETE_images/image_083.png)![An abstract image showing a large, pale peach‑beige textured brush stroke on a white background. The mark has a grainy, chalk‑or‑pastel texture, concentrated toward the upper-right and slanting down toward the center, leaving wide white negative space at the bottom and left. - Colors: very light peach / beige on white - Texture: soft, gritty/pastel-like strokes - Composition: large angled block of color occupying upper-right to center, minimal and airy overall](./Peril_in_Pinebrook_COMPLETE_images/image_084.png)![A tall, narrow vertical image with a clean white background scattered with light-pink paint splatters and droplets. The pink marks vary in size and density—mostly tiny specks with occasional larger blotches—and are more concentrated in the middle and lower portions. Overall it looks like a decorative watercolor/ink splatter pattern or a confetti-style background.](./Peril_in_Pinebrook_COMPLETE_images/image_085.png)![A mostly white image with a soft, pale green watercolor wash running diagonally from the lower-left toward the upper-right. The green area is elongated with feathered, irregular edges and subtle variations in opacity and tone. The composition looks like a translucent brushstroke or stain on paper; outside the white canvas there are black triangular corners where the image is cropped.](./Peril_in_Pinebrook_COMPLETE_images/image_086.png)![The image shows a soft, pale aqua/seafoam watercolor wash on a mostly white background. Key features: - Large, irregularly shaped wash occupying the right and center areas with feathered, translucent edges. - Subtle texture from brush strokes and small splatters/droplets around the main blotch. - Upper-left and lower-left corners have angular, darker cutout shapes (likely from cropping or background).](./Peril_in_Pinebrook_COMPLETE_images/image_087.png)![A tall, narrow image showing a soft, textured wash of very pale yellow‑green that fades to white toward the right. The surface has a chalky/crayon‑like grain with subtle vertical streaks; a thin, slightly darker curved edge appears near the top‑right and bottom‑right.](./Peril_in_Pinebrook_COMPLETE_images/image_088.png)![A tall, narrow image dominated by an off‑white background showing a single geometric shape: a vertical panel whose left edge is cut by matching diagonal lines at the top and bottom, producing a right‑pointing chevron/wedge. No text, faces, or other objects are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_089.png)

Additionally, each character has advantage on the first roll they

make in the next challenge (the ice slides).

Characters might use other methods of getting past the ice

mirror, such as melting the ice with a torch or smashing it with

a weapon. If they do that, however, they don't receive Bahamut's

healing magic. Also, a character who breaks the mirror takes

\page


damage. Roll 1d6 and tell the player to subtract that number

from their character's hit points when it shatters.

**DM Tip**

Even if the players roll poorly, always allow them to continue forward

in the adventure. Consequences for failing challenges might include

character's losing hit points, which might make the final encounter

more challenging. But you don’t want to prevent the characters from

continuing with the adventure because of bad luck.

Challenge 3: Navigating the Ice Slides

The final stretch of tunnels leading to the silver dragon’s

hatching cavern is made of several icy slides that join, separate,

and crisscross each other as they descend. Read the following:

The passage has taken you higher and higher, and now you stand

atop an icy cliff, looking down into a huge cavern inside the mountain.

Slides made of stone and ice provide a way down, but they’re steep

and slick. Furthermore, these slides merge, crisscross, and loop

around each other in a dizzying maze. The slides look like the only

way forward. Some end in solid ice walls. Others are covered with

razor-sharp icicles. You need to choose the best slides to get down.

Suddenly, you hear a cracking sound. The cliff you’re standing on is

starting to collapse! If you don’t jump on a slide now, you’ll fall!

Each character must quickly jump on one of the slides. Once

a character starts to slide, they can’t stop. However, they can

switch to a different intersecting slide while zipping down at

high speed.

**Finding the Best Path.**

Before starting to slide, the characters

can try to quickly figure out which slide is safest. Ask the players

to make a DC 10 Investigation or Perception check to determine

the best choice. If a character succeeds on this check, they

choose the best slide to reach the bottom safely. The character

doesn’t take any damage, but you can describe the wild ride they

experience as they slide toward the cavern floor.

**Changing Slides.**

A character who fails the check jumps

onto a slide and quickly reaches dangerous sections of razor-

sharp ice shards, long drops, ice walls, and other hazards. The

character must succeed on a DC 15 Acrobatics or Athletics

check to jump to a safer slide to avoid taking damage.

A character who doesn’t have Acrobatics or Athletics on their

character sheet can still make checks with those skills, but they

don’t add any modifier to the d20 roll.

If a character fails the check, roll 1d6. Tell the player to

subtract that number from their character's hit points to

represent the damage they take while reaching the bottom of

the slide.

**Describing the Action.**

As the characters ride these

dangerous slides, think about ways that you or the players might

describe how the characters jump from one slide to another, go

through loops and rolls, and narrowly miss hitting each other.

Give the players a chance to describe what their characters are

going through.

**DM Tip**

If one character makes a check to find a safe path down the slides,

the other players might say their characters follow on the same slide,

which might make this challenge too easy. You can increase the

challenge by saying the top of the safe slide collapses just after the

first character starts down it. You can do this each time a new

character chooses a slide to ensure that each character has to

navigate their own path.

Moving the Adventure Forward

It’s a short walk from the bottom of the cave to the hatching

cavern. The characters are ready to face the final threat!

\page


Proceed to Encounter 4: Dragon Eggs and Soaring Silver.

**A Dangerous Lair |**

![A minimalist flat-style illustration of a modern smartphone centered on a white background. - Black-framed phone shown vertically with a large purple-gradient screen depicting simple triangular mountain shapes. - Small white status/search bar near the top of the screen and a tiny circular element (camera or icon) at the upper-left of the display. - A yellow rounded rectangle (looks like a sticky note or widget) floating to the phone’s right, with small dark lines indicating text. - Two small colored rectangles (orange and blue) positioned near the lower right of the phone, suggesting additional widgets or UI elements. - Soft drop shadow beneath the phone and a clean, uncluttered composition.](./Peril_in_Pinebrook_COMPLETE_images/image_090.png)![- A mostly blank, portrait-oriented sheet with a soft pale-blue wash. - Subtle paper texture and mottling across the surface. - Slightly darker blue vignette along the edges, especially corners.](./Peril_in_Pinebrook_COMPLETE_images/image_091.png)![- A vertical, mostly blank sheet of textured paper. - Very light bluish-gray background with subtle mottled/grainy texture. - Slightly darker, soft vignette along the edges; no text or objects present.](./Peril_in_Pinebrook_COMPLETE_images/image_092.png)![A tall, very narrow vertical image showing a soft, pale pink–beige gradient with subtle, irregular streaks and a faint watercolor/marbled texture. No distinct objects or features — looks like a close-up of textured paper, fabric, or a painted background.](./Peril_in_Pinebrook_COMPLETE_images/image_093.png)![A minimal, abstract image showing a large, pale-peach textured brush stroke against a white background. - Soft, chalk- or pastel-like texture with uneven edges and slight graininess - Stroke occupies the upper-right and central area, tapering toward the lower-left - Overall minimalist, muted color palette and high negative (white) space](./Peril_in_Pinebrook_COMPLETE_images/image_094.png)![A very tall, narrow vertical image with a clean white background and scattered pale‑pink paint splatters. The pink marks range from tiny specks to larger irregular blobs, more concentrated in the middle and lower areas, creating a light, textured splatter or confetti effect.](./Peril_in_Pinebrook_COMPLETE_images/image_095.png)![An abstract, mostly white image with a soft, pale green watercolor–style wash running diagonally from lower-left toward upper-right. The green area has fuzzy, feathered edges and varying translucency. Two black triangular corners (top-left and bottom-left) frame the white area, giving the composition a rotated, cropped look. Overall appearance is light, airy, and painterly.](./Peril_in_Pinebrook_COMPLETE_images/image_096.png)

Encounter 4: Dragon Eggs

and Soaring Silver

**Estimated Time to Play This Encounter: 15 minutes**

When the characters enter the hatching cavern, read the following:

This large chamber is filled with stalactites and stalagmites covered

in ice. The ceiling slopes up toward an ice-plugged hole far above you.

On the ground in the center of the chamber, two large silver eggs rest

upon heaps of frozen snow. A third spot now holds nothing but bro-

ken shell pieces. A fourth spot looks like it also held an egg, but that

egg is missing.

Between you and the eggs stand two strange creatures the size of

horses. They have bodies like frogs, but their skin is pure white and

they have mouths full of sharp teeth.

The creatures are moving threateningly toward the two remaining

eggs in the nest, but you’ve interrupted them. They turn toward you

and hiss. Then with powerful hops, they hurl themselves toward you!

These creatures are

**egg snatchers**

, trained by ice trolls to steal

dragon eggs. If the characters don’t intervene, the last two eggs

will be lost!

There are three egg snatchers. If you have three or fewer

players, remove one egg snatcher, leaving the characters with two

enemies. If you have two or fewer players, reduce the starting hit

points of the two egg snatchers to 10.

Describe the egg snatchers falling to the ground as they are

defeated, or fleeing into the darkness too fast for the characters

\page


to follow.

**DM Tip**

A character that reaches 0 hit points falls unconscious and remains

unconscious until they regain hit points through healing. At the end

of the encounter, any unconscious player characters regain 1 hit point

automatically.

After the Characters Succeed

Once the eggs snatchers are defeated, the baby dragon crawls

into the nest, settles among the broken eggshells, and

falls asleep.

Moving the Adventure Forward

Before the characters can do anything else, the mother dragon

returns! Read the following:

A loud crash erupts from high above. Chunks of ice and snow fall

around you as an enormous silver dragon bursts through a

frozen section of the cavern ceiling. The dragon plummets and lands

before you, frigid air streaming from between sharp teeth.

“What is happening here?” the dragon roars.

The characters have some explaining to do! Proceed to the

Conclusion.

This combat runs the same way as in “Encounter 2: Living

Icicles.” Refer to the DM Tip in that encounter to remind the

players how to make melee and ranged attacks if you needed.

Taking Turns

Let the characters act first, starting with the player on your left

and going clockwise. Ask each player what they want to do.

After all the players have acted, any undefeated egg snatchers

attack. Each monster that still has hit points moves to a different

character and makes an attack with their bite.

Roll a d20 and add the attack modifier (+4) to the roll. If the

total equals or exceeds the Armor Class of the character being

attacked, the attack hits. Roll 1d6 and add the damage modifier

. Tell the player to subtract that damage from their hit points.

(+2)

If the attack misses, nothing happens. Either way, describe the

attack. Perhaps a bite clamps around an ankle, or maybe the

egg snatcher breaks a tooth on a piece of armor.

![An abstract, pale watercolor wash on a mostly white background. A large, soft mint/teal blotch occupies the right-center area with subtle gradients and scattered splatters. The left side is largely white with a sharp, dark triangular corner at the very top-left, giving the image an asymmetrical, cropped look.](./Peril_in_Pinebrook_COMPLETE_images/image_097.png)![- A tall, narrow abstract image showing a textured, pale cream/ivory area on the left that gradually fades to white on the right. - Surface looks like paper or canvas with soft, vertical and slightly diagonal pencil/pastel-like strokes and subtle grain. - Very muted, minimal tones with faint darker edges near the top and bottom.](./Peril_in_Pinebrook_COMPLETE_images/image_098.png)

Egg Snatchers

**Armor Class**

12

**Hit Points**

18

Attack

***Bite.***

*Melee Weapon Attack:*

+4 to hit.

*Hit:*

1d6 + 2 piercing damage.

![A tall, narrow image showing a mostly white polygonal shape. The left edge is vertical and straight; the right side has two diagonal edges that meet near the middle, forming a right-pointing chevron or arrowhead. The overall look is minimal with very light/off-white tones and no other visible detail.](./Peril_in_Pinebrook_COMPLETE_images/image_099.png)


**| Dragon Eggs and Soaring Silver**


\page

# Conclusion

## **Estimated Time to Play This Encounter: 10 minutes**

The angry silver dragon waits for the characters to explain themselves. This is an opportunity for the players to roleplay as their characters.

During the conversation, you can have the dragon reveal that her name is Hysvearorn (Rorn for short). "The Dragon" section below gives you more information to help you roleplay the silver dragon.

If the players are reluctant to speak, ask one of the following questions:

- “The dragon has asked you what you are doing here. What do you say?”
- “How does your character feel about standing before an incredibly angry dragon the size of a small house?”
- “What can you do or say to the dragon to prove to her that you came here to return her baby?”

As long as the characters don’t do anything silly, Rorn quickly realizes they aren’t here to steal her eggs, but are returning her baby instead.

### **DM Tip**

Dragons are incredibly powerful. If the players decide to have their characters attack Rorn, you can handle the situation in different ways:

- The dragon looks at them with disappointment and tells them to stop being silly.
- Ask the characters to make Nature checks, then tell the character with the highest check that they know a dragon this powerful could defeat all the characters easily.
- Let the characters make attacks or cast spells if they like, then tell them that the dragon ignores those attempts to harm her. • If the characters continue acting in a hostile or belligerent manner, Rorn uses her magical dragon breath on them. This leaves the characters unhurt but unable to move. She then leaves them outside the mountain unharmed, but they don't get any reward from her.

## The Dragon

Here are some characteristics of the silver dragon you can use to roleplay her:

- Hysvearorn is an adult silver dragon. Her full name translates to

“Soaring Silver.”

- She tells the characters to call her Rorn, since it’s easier for non- dragons to say than her full name.
- If the characters explain what happened, the dragon quickly calms down and thanks them for rescuing her baby.
- Rorn is friendly when not angered, and she likes people. In peaceful times, she likes to spend her time sharing stories with folks.
- If the characters ask about the name “Nytha” that the baby dragon said, Rorn explains that it means “Mama” in the Draconic language.
- Rorn says dragons call their young "wyrmlings," not babies.

Rorn can also share details of what happened to her eggs:

- Rorn recently made her lair here to prepare for the hatching of her wyrmlings. She drove away the dangerous ice trolls who lived here.
- As her eggs were getting close to hatching, the ice trolls attacked Rorn and stole one of her eggs. Rorn chased the egg thieves and has been gone from the lair for several hours.
- The ice trolls took the egg into a tunnel in another mountain, but Rorn couldn’t fit into the tunnel. She doesn’t know where it might lead.

The rescued wyrmling tells its mother what happened to it, which Rorn can also share with the characters:

- The wyrmling hatched while Rorn was chasing the egg thieves. Finding itself alone, it wandered from the lair and into the forest. • The characters found the wyrmling and took good care of it on the way home.

More Wyrmlings!

As the characters speak with Rorn, the other two eggs hatch. Rorn watches carefully as the wyrmlings break their shells and then crawl over to nuzzle their mother. She pulls some frozen meat from the nest and feeds them.

\page


## The Reward

After the two other baby dragons hatch, Rorn speaks to the characters. Read the following:

Rorn thanks you again for your help. "Please, take these as a sign of my gratitude.” She digs into the snow where the eggs were set and pulls out a small shiny diamond for each of you.

“More importantly, you have already bonded with my first hatchling. He deserves to continue to learn what it is like to grow up in the realm of people. Would you be willing to take him back to your settlement and raise him? I will watch over your area to help you out, and

I’m always here if you have any questions.”

The dragon continues. "I have another request for you. When I find the exact location where the ice trolls took my final egg, would you retrieve it, so my child can be safe from whatever the ice trolls have planned for them?”

Let the characters react to Rorn’s offer. No matter how the characters respond to Rorn's requests, she is kind and polite to them if they are kind and polite to her.

### Treasure

Each of the small diamonds is worth 50 gold pieces. Each character can add this to their character sheet under “Other Equipment.”

## Return to Pinebrook

At the conclusion of the conversation, Rorn shows the characters a secret passage that leads from the mountain, which ends the characters' adventure ... for now!

**Conclusion |**

![I can’t see the image — please upload it or confirm the attachment. If it’s already uploaded, tell me which details you want (objects/people, text, colors, layout, or inferred context) and I’ll describe them.](./Peril_in_Pinebrook_COMPLETE_images/image_100.png)

![A mostly blank sheet of textured paper. The surface is off-white with subtle blue‑gray mottling and faint darker edges (a soft vignette). Small speckles and paper fibers are visible, giving it a watercolor/stationery look; no text or objects are present.](./Peril_in_Pinebrook_COMPLETE_images/image_101.png)![A minimalist, abstract image: pale green vertical brushstrokes and washed textures on a very light cream/white background. The strokes vary in width and opacity, with rough edges, faint speckles, and subtle horizontal grain; most marks are concentrated toward the right side, leaving large areas of empty space.](./Peril_in_Pinebrook_COMPLETE_images/image_102.png)![- A soft, pale-pink watercolor-like wash or cloud centered on a white background. - Feathery, diffuse edges with subtle gradient variations in pink tones. - A small black triangular corner appears at the bottom-left, likely from cropping or a background element.](./Peril_in_Pinebrook_COMPLETE_images/image_103.png)![A mostly white vertical page with a wide, pale warm-beige watercolor wash stretching across the upper third to middle of the image. The wash has soft, feathery edges, subtle tonal variations, and a slightly mottled paper texture. A thin dark vertical line runs along the left edge (looks like a scan/crop artifact). The lower two-thirds of the image remains blank white.](./Peril_in_Pinebrook_COMPLETE_images/image_104.png)![An abstract, vertical watercolor-style wash: soft, cloud-like teal/seafoam pigment diffuses across textured white paper. The color fades smoothly from denser areas to near‑white edges; there are no distinct shapes, text, or recognizable objects. The overall impression is a gentle, atmospheric paint wash.](./Peril_in_Pinebrook_COMPLETE_images/image_105.png)![- Wide, panoramic image with a grainy, textured pattern in pale blue and white. - Overall appearance resembles cloud cover, frosted glass, or a noisy scan — many small, irregular blotches and streaks. - Several slightly darker circular/oval patches scattered across the field. - Diagonal streaking gives a sense of directional texture. - White margins and irregular black borders at the top and right suggest the image is tilted or cropped.](./Peril_in_Pinebrook_COMPLETE_images/image_106.png)![- Tall, narrow vertical image with a stark, high-contrast composition. - A solid black triangular wedge occupies the top-left corner; its hypotenuse runs diagonally from about one-quarter down the left edge up to the top-right corner. - The remainder of the image is plain white. - Clean geometric/abstract appearance with sharp edges and minimal detail.](./Peril_in_Pinebrook_COMPLETE_images/image_107.png)![A tall, vertically oriented abstract image. A large white, angular polygon fills most of the frame with sharp diagonal edges; solid black triangular areas appear in the top-left and bottom-left corners. Along the right side of the white shape is a soft, pale blue–gray watercolor texture or cloud, giving a subtle washed gradient against the stark black-and-white geometry.](./Peril_in_Pinebrook_COMPLETE_images/image_108.png)![A wide rectangular image showing an empty parchment-style background in pale yellow/beige. The surface has a subtle mottled, paper-like texture with faint tonal variations and a few small darker marks near the left and right edges.](./Peril_in_Pinebrook_COMPLETE_images/image_109.png)![A long, very narrow horizontal strip with a metallic gold appearance. It shows a textured, wavy fibrous pattern in shades of gold, yellow and brown, like a decorative gilded border or ribbon.](./Peril_in_Pinebrook_COMPLETE_images/image_110.png)![- A very long, narrow horizontal strip centered on a black background. - Appears textured with a warm golden-yellow color, showing highlights and darker streaks that give a metallic or foil-like look. - Pattern suggests a decorative border or ribbon — irregular, slightly braided/hammered surface with subtle diagonal lines and shimmer.](./Peril_in_Pinebrook_COMPLETE_images/image_111.png)

\page


Credits

**Designer:**

Shawn Merwin

**Consulting Designer:**

Dan Dillon

**Art Director:**

Bree Heiss

**Editors:**

Janica Carter, Scott Fitzgerald Gray

**Graphic Designers:**

Emma Ekblad, Zsolt Tóth

**Cover Illustrator:**

Katerina Ladon

**Interior Illustrators:**

Emily Fiegenschuh, Jim Nelson, Eva Widermann

**Producers:**

Bill Benham, Siera Bruggeman

**Product Manager:**

Natalie Egan

**Senior Brand Manager:**

Shelly Mazzanoble

Special thanks to Quinn Carroll, the Hawes Family, Aurora Merwin,

and Beth Merwin

**Dungeons & Dragons: Peril in Pinebrook |**

![A mostly blank, vertically oriented sheet with a subtle paper texture. The surface is off-white with very light bluish-gray vignetting and faint speckles around the edges, giving a soft, slightly mottled look. No text, objects, or people are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_112.png)![The image is a minimalist, abstract composition: a mostly pale off-white background with several vertical, textured brushstrokes in a muted olive-green clustered along the right side. The strokes vary in opacity and width, giving a weathered, streaked-paint or washed-ink appearance with subtle irregular edges.](./Peril_in_Pinebrook_COMPLETE_images/image_113.png)![A minimal, mostly white composition with a soft, translucent peach-pink wash occupying the upper-right quadrant. The wash has feathery, airbrushed edges and subtle variations in tone. A small solid black right-angle triangular shape appears in the bottom-left corner, creating a sharp contrast with the otherwise gentle, watercolor-like area.](./Peril_in_Pinebrook_COMPLETE_images/image_114.png)![- Portrait-oriented image with a large, soft beige watercolor wash or cloud shape spanning the upper third to middle of the page. - Edges are diffuse and textured, with subtle variations in tone (lighter toward the top and bottom of the wash). - Predominantly white background with no text, figures, or distinct objects. - A thin dark vertical strip appears along the left edge (likely a scan border).](./Peril_in_Pinebrook_COMPLETE_images/image_115.png)![- Vertical image with a large, soft teal/green watercolor-like wash occupying the left and central area. - Edges of the wash are diffuse and feathery, fading into a white background. - Slight vertical banding or scan-artifact lines visible near the left edge. - Small black triangular corners at the top-right and bottom-left suggest framing or cropped edges.](./Peril_in_Pinebrook_COMPLETE_images/image_116.png)![A wide, panoramic image dominated by a grainy, cloud-like texture in pale blue and white. The pattern forms diagonal streaks and mottled patches across the frame, resembling a watercolor wash, frost, or scattered clouds. The composition is slightly skewed, with dark triangular margins at the right edge suggesting a rotated or cropped scan. No distinct objects or figures are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_117.png)![A tall, narrow image with a sharp diagonal divide: a solid black triangular area fills the top-left corner, while the rest is plain white. The boundary is a straight, crisp diagonal, giving a minimal, geometric (almost folded- or cut-corner) appearance.](./Peril_in_Pinebrook_COMPLETE_images/image_118.png)

TM & ©2023 WIZARDS OF THE COAST LLC.

![A tall, vertical abstract composition. A large white, polygonal field dominates the image with a soft, pale-blue, watercolor-like cloud or texture toward the right. Two black triangular areas sit in the top-left and bottom-left corners, creating diagonal edges against the white.](./Peril_in_Pinebrook_COMPLETE_images/image_119.png)![A wide, horizontal image of a pale yellow/cream textured surface resembling aged or handmade paper. Subtle mottling and faint irregular tonal variations give it a parchment-like appearance; edges show slightly darker, worn shading. Overall look is soft, warm, and suitable as a background or stationery texture.](./Peril_in_Pinebrook_COMPLETE_images/image_120.png)![A narrow, horizontal decorative strip with a metallic gold appearance. It shows a textured, braided or woven pattern of swirling diagonal lines and highlights that give it a shiny, embossed look—like a gold ribbon, trim, or ornamental border.](./Peril_in_Pinebrook_COMPLETE_images/image_121.png)![A narrow horizontal decorative gold band or ribbon centered on a black background. - Color: metallic gold with bright highlights and darker shadows - Texture: twisted/struck or braided appearance with fine striations - Orientation: full-width, thin horizontal divider across the image](./Peril_in_Pinebrook_COMPLETE_images/image_122.png)![A light, textured sheet of paper with a very pale blue wash and subtle darker blue vignette around the edges; no objects, text, or people are present.](./Peril_in_Pinebrook_COMPLETE_images/image_123.png)

\page


**Full of lore and lavish illustrations,**

**A Practically Complete Guide to Dragons**

**is the ultimate dragon-lover’s guide!**

**Available wherever books are sold.**

**dnd.wizards.com**

**EXPLORE THE MAGICAL**

**WORLD OF DRAGONS**

![A portrait-oriented blank sheet of textured paper. It has a very light, off-white background with subtle blue-gray mottling and faint darker edges/vignette, resembling watercolor or stationery paper. No text, objects, or people are visible.](./Peril_in_Pinebrook_COMPLETE_images/image_124.png)

![A very tall, narrow image showing an almost uniformly white/cream vertical expanse with subtle horizontal banding and a few faint smudges or spots (more visible near the top-left and lower-right). Overall it resembles a blank sheet of paper or a washed-out wall with minimal texture.](./Peril_in_Pinebrook_COMPLETE_images/image_125.png)

![- Abstract, minimal composition with a strong diagonal dividing the frame from lower-left to upper-right. - Lower-right triangle is solid black; upper-left area is mostly white. - In the upper-left, a soft, pale pink watercolor-like circular blotch with feathered edges. - Small black triangular corner visible at the top-right; overall high-contrast, geometric vs. organic texture.](./Peril_in_Pinebrook_COMPLETE_images/image_126.png)


![The image is a tall, narrow vertical strip with a mostly white background. Two black triangular shapes occupy opposite corners (top-right and bottom-left), creating a diagonal framing. A very faint, pale blue-green circular watercolor texture is visible on the left side about one-third down. Overall the composition is minimal and geometric.](./Peril_in_Pinebrook_COMPLETE_images/image_127.png)

# Player Reference Sheet

This sheet contains explanations, definitions, and helpful advice on being a player in this Dungeons & Dragons game.

## D&D Terms

**d20.** A 20-sided die is also known as a d20. **d6.** A 6-sided die is also known as a d6. **d20 Roll.** A d20 roll is a roll of a 20-sided die plus any modifiers. A d20 roll is compared to a Difficulty Class number or an Armor Class number to see if the action you use the roll for succeeds.

**Difficulty Class (DC).** A Difficulty Class is the number that tells how hard it is to use a skill. When you make a d20 roll to use a skill, you need to equal or exceed the DC to use the skill successfully.

**Armor Class (AC).** Armor Class is the number that tells how hard it is to hit a creature with an attack roll. When you make a d20 roll as an attack roll, you need to equal or exceed a creature’s AC to hit them and deal damage. **Hit Points.** Hit Points is the number that shows how much damage a creature can take before they fall unconscious or are defeated.

![A minimal, mostly white image featuring a single large, pale mint-green leaf print with a distressed, textured appearance. The leaf is centered toward the lower-left area of the page, its veins and lobes rendered in a washed-out, almost stamp-like style. The top-right corner shows a small dark triangular detail that looks like a folded or cropped edge. Overall the composition is airy and subtle, resembling a light botanical watermark or background graphic.](./Peril_in_Pinebrook_COMPLETE_images/image_128.png)![- A rotated, white pentagon-shaped sheet filling most of the frame, angled so its top edge slants down from left to right. - Pale mint-green, distressed leaf or floral print stamped near the lower-right corner of the white shape. - Solid black triangular areas visible at the top-left and bottom-right edges (background showing where the white shape doesn’t cover). - Overall high-contrast, minimal composition with a subtle textured/washed botanical motif.](./Peril_in_Pinebrook_COMPLETE_images/image_129.png)![An abstract watercolor texture occupying the upper-right half of the image, rendered in soft, muted blue tones. The paint forms cloud- or wave-like shapes with feathery, semi-transparent edges and subtle granulation. A dark triangular area fills the lower-left corner, creating a strong diagonal contrast across the composition.](./Peril_in_Pinebrook_COMPLETE_images/image_130.png)![A soft, abstract watercolor wash across the top of the image in a pale mint/seafoam green, fading into a large white area below. - Pale teal/seafoam watercolor texture with subtle granulation - Irregular, soft-edged brush shape running diagonally across the top - Small paint splatters and droplets scattered beneath the main wash - Large empty white space in the lower portion (clean background) - Black triangular/angled margins at far left and right edges (image crop or framing)](./Peril_in_Pinebrook_COMPLETE_images/image_131.png)![- Minimalist, abstract image in portrait orientation. - A large, off-white/very pale polygonal shape fills most of the frame, angled so two black triangular areas appear at the top-right and bottom-right edges. - Inside the pale shape is a soft, cloudlike watercolor wash in light bluish-gray centered toward the left. - Overall look is airy and muted, with high-contrast black corners and a gentle textured center.](./Peril_in_Pinebrook_COMPLETE_images/image_132.png)![A stylized watercolor illustration of a small pale-blue dragon or draconic creature standing on snowy ground. - Upright, squat body with scaly skin and layered neck plates - Semi‑open mouth showing a forked tongue and sharp beak‑like snout - Large yellow eye and expressive face - Outstretched bat‑like wings with visible membranes and claws on the forelimbs - Curved tail, thick hind legs, and pronounced talons - Snowy background with soft texture and scattered snowflakes, cool blue and gray color palette](./Peril_in_Pinebrook_COMPLETE_images/image_133.png)

\page


**Action.** What your character does on their turn during a game of D&D is their action. Actions include attacks, using skills, and more.

**Encounters.** Encounters are the scenes that take place during a D&D adventure.

**Advantage.** When you attempt an action while circumstances make success more likely, you roll two 20-sided dice for your d20 roll, then use the higher roll. **Disadvantage.** When you attempt an action while circumstances make failure more likely, you roll two 20-sided dice for your d20 roll, then use the lower roll.

**Dungeon Master (DM).** The Dungeon Master is the person acting as the lead storyteller, the keeper of secrets, and the referee in a game of D&D.

**Roleplaying Game (RPG).** D&D is a roleplaying game, where players use characters to take part in a story as the game unfolds.

**Adventure.** A story you play through with your character in a game of D&D is called an adventure.

**Character Sheet.** The information about a character that a player refers to in a game of D&D is listed on a character sheet. The character sheet tells a player who their character is and what they are good at.

## D&D Skills

**Acrobatics.** The Acrobatics skill is your character’s ability to do physical tricks and have good balance, like an expert gymnast. **Animal Handling.** Keeping animals calm and getting them to do what you want can be accomplished with the Animal Handling skill.

**Arcana.** Arcana determines what you know about magic and how magic is used.

**Athletics.** Activities that require strength, such as lifting heavy objects or breaking down doors, can be accomplished with the Athletics skill.

**History.** The History skill tells you what you know about what’s happened in the past.

**Insight.** The Insight skill helps you understand situations involving what other creatures are feeling, including how they feel about you.

**Investigation.** When you study a situation and figure out what’s going on based on clues, you use the Investigation skill. **Nature.** Your knowledge of the natural world is covered by the Nature skill.

**Perception.** The Perception skill lets you notice things that are hard to detect or that are hidden.

**Religion.** Knowledge of the gods and their powers is covered by the Religion skill.

**Stealth.** The Stealth skill lets you sneak around without being seen or heard.

**Survival.** The Survival skill covers lots of activities for staying safe in nature, including tracking animals and finding food or water.

## D&D Spells, Weapons, Equipment

**Climber’s Kit.** A climber's kit includes special spikes, boot tips, gloves, and a harness to help you ascend a wall, a cliff, or some other vertical surface.

**Crowbar.** A crowbar is a heavy piece of iron used for smashing open or prying open doors and other objects. **Cure Wounds.** Cure Wounds is a spell that allows you to heal damage taken by a creature (including you). **Fire Bolt.** The Fire Bolt spell shoots a blast of magical fire at one enemy.

**Handaxe.** A handaxe is an axe you can hold in one hand that is built to be used in combat.

**Holy Symbol.** A holy symbol is a small object that represents your god’s power. If you are a cleric, your holy symbol allows you to use that power to cast spells.

**Leather Armor.** Leather armor is a suit of armor made from hardened animal skins. It is light and easy to wear. **Mace.** A mace is a weapon consisting of a blunt piece of metal on the end of a handle.

\page


**Magic Missile.** A Magic Missile spell sends out three missiles of magical force, which automatically hit without needing d20 rolls.

**Quarterstaff.** A long piece of heavy wood, a quarterstaff can be used as a walking stick or as a weapon.

**Rations.** Rations are food you take on adventures. They include dried meat and fruit to eat, and water to drink. **Ring Mail Armor.** Ring mail armor is a suit of armor made of small interlocking metal rings. It is heavy for maximum protection.

**Scale Mail Armor.** Scale mail armor is a suit of armor made from small, flat pieces of overlapping metal plates sewn together. It is heavier than leather armor but lighter than ring mail armor. **Shortbow.** A shortbow is a light bow used to shoot arrows at enemies from range.

**Shortsword.** A shortsword is a light sword that can be easily swung in one hand.

**Thieves’ Tools.** Thieves’ tools are a kit containing lockpicks and other tools for opening locks and disabling traps.

Permission is granted to photocopy this document for personal use. TM & © 2023 Wizard of the Coast LLC.

![- A single blank sheet with a pale, icy-blue wash. - Subtle paper texture/grain visible across the surface. - Slightly darker blue vignette along the edges; no text, objects, or distinct features.](./Peril_in_Pinebrook_COMPLETE_images/image_134.png)

\page
<!-- FILE_END: ../Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md -->

## Temple of the Dragonknights

<!-- FILE_START: ../Season 1/Adventures/Temple_of_the_Dragonknights/Temple_of_the_Dragonknights.md -->
**Temple of the Dragonknights**

## Northwatch Wardens Integration (DM)

**Campaign Connection:** This adventure shows **factions exploiting** the awakening magic. Venomfang and the cult are drawn to and empowered by the Aeorian Echo, using it to fuel dark rituals that wouldn't otherwise be possible.

**DM Secret Resources:** For the truth behind this adventure, see:
- **[World Building/DMEyesOnly/Places_Secrets.md](../../../World%20Building/DMEyesOnly/Places_Secrets.md)** - "Temple of the Dragonknights: Heroic Tomb" section
- **[World Building/DMEyesOnly/Northreach.md](../../../World%20Building/DMEyesOnly/Northreach.md)** - Adventure integration details
- **[World Building/DMEyesOnly/The_Aeorian_Echo.md](../../../World%20Building/DMEyesOnly/The_Aeorian_Echo.md)** - Campaign arc context

**Key Secrets:**
- The temple was built over a sealed **Aeorian facility focused on draconic weapons research**
- The "Dragonknights" actually fought post-Calamity Aeorian threats
- Each tomb is a **ward anchor**; desecration weakens the seals
- The Aeorian facility below is responding to the Echo and attempting to break free
- The cult's rituals are only possible because magic is destabilizing
- The facility contains **dragon-killing bioweapons** that threaten all dragons if reactivated

**Player Discovery:** Characters should sense that the cult is more powerful than expected and that the temple has deeper significance. The connection to ancient Aeorian magic can be hinted at through symbols, architecture, or magical effects.

---

![- A long, narrow horizontal strip/band centered on a white background. - Color: olive to muted green with slight mottling/texture. - Edges: irregular, jagged top and bottom with a thin black outline. - Appearance: resembles a painted brush stroke, torn paper ribbon, or decorative divider.](./Temple_of_the_Dragonknights_images/image_001.png)

*A Simple Adventure Module*

\page

# DM Notes: Temple of the Dragonknights

## Adventure Overview

**Theme:** Ambition, corruption, and the exploitation of rising magic — a young dragon and cult seek power from magical disturbances

**Core Tension:** Venomfang (young green dragon) and her kobold cult are drawn to the Temple ruins by the Aeorian Echo. Are they a genuine threat or opportunistic scavengers?

**Level Range:** 3-5 (campaign climax adventure)

**Expected Duration:** 4-6 hours (single or two-session adventure)

**Key NPCs/Enemies:**
- **Venomfang** — Young green dragon (clever, ambitious, not mindlessly evil)
- **Kobold Cult** — Dragon-worshipping minions (organized, fanatical)
- **Joel Andersmith** — Farmer, initial quest giver (injured by kobolds)
- **Northcrest Locals** — Guards, blacksmith, innkeepers (provide support)

## Central Mystery (Aeorian Echo Connection)

**This is the CONVERGENCE adventure** — Other factions are responding to the Aeorian Echo.

**The Setup:**
- Venomfang sensed magical power radiating from the Temple of the Dragonknights
- The temple itself is a *confluence point* — ancient ley lines intersect here, amplified by Salsvault's reactivation
- Kobolds worship Venomfang and seek to establish a power base
- The cult is *exploiting* the Aeorian Echo, not causing it
- If Venomfang succeeds, she becomes a regional power; if she's stopped, the Echo continues elsewhere

**What Players Should Learn:**
1. The Aeorian Echo is attracting predators and opportunists (dragons, cults, intelligent creatures)
2. Salsvault's activation created "ripples" of magical energy across Northreach
3. The temple is a *symptom* of the Echo, not its source (that's Salsvault)
4. More factions will mobilize if the Echo isn't contained

**What Remains Hidden (for future campaigns):**
- How to actually *stop* the Aeorian Echo (requires returning to Salsvault or finding other solutions)
- Whether Venomfang is working alone or has allies
- Other creatures drawn to magical convergence points

## Common DM Pitfalls

### 1. Venomfang as a Pure Villain
**Problem:** If Venomfang is played as a mindless monster, players miss the moral complexity.

**Solution:** Venomfang is *ambitious*, not evil. She wants:
- Power and territory (reasonable dragon goal)
- To avoid direct conflict with strong opponents (pragmatic)
- To use kobolds as expendable minions (ruthless but logical)

**If confronted, she can negotiate:**
- "Why die for peasants who mean nothing to you? I offer gold, magic, *alliance*."
- "Kill my kobolds if you must. I'll find more. But attack *me*, and you'll regret it."

**She's a **Level 3-5 boss** — deadly in direct combat. Negotiation or clever tactics (poison gas, collapsing temple) are valid strategies.**

### 2. Kobolds as Cannon Fodder
**Problem:** Kobolds feel like XP pinatas with no personality.

**Solution:**
- Kobolds are *fanatical* worshippers — they believe Venomfang will ascend to godhood
- They use traps and Pack Tactics (advantage via flanking)
- If half the kobolds die, the rest surrender OR flee to warn Venomfang
- Captured kobolds reveal temple layout, Venomfang's lair location, and cult goals

### 3. Temple Feels Like a Linear Dungeon Crawl
**Problem:** "Clear room, fight enemies, repeat" becomes monotonous.

**Solution:**
- **Environmental hazards:** Crumbling ruins, trapped corridors, flooded chambers
- **Multiple entry points:** Kobolds guard the front, but ruins have a back entrance (Stealth check)
- **Roleplay opportunities:** Captured kobolds, dragon negotiations, ancient lore inscriptions
- **Time pressure:** Kobolds are preparing a ritual to "awaken" the temple's ley line energy

### 4. Venomfang Fight Is Too Easy or Too Hard
**Problem:** Young green dragon (CR 8) can TPK a Level 3-4 party, or die in 2 rounds if ambushed.

**Solution:**
- **She's smart:** Uses Poison Breath, then flies away to recover
- **She has escape plans:** If reduced to 50% HP, she offers terms OR flees
- **Environment matters:** Temple has collapsed pillars (cover), acid pools (hazards), high ceilings (she can fly out of melee reach)
- **Adjust on the fly:** If party is struggling, Venomfang toys with them. If party is dominating, kobold reinforcements arrive.

**Alternative Victory Conditions:**
- Drive Venomfang away (she flees when bloodied)
- Collapse the temple (bury her lair, force relocation)
- Negotiate a truce (she leaves Northreach in exchange for treasure/safety)

## Resolution Outcomes

### Path A: Kill Venomfang and Destroy Cult
**Result:**
- Northcrest is saved; kobolds scatter
- Party earns dragon hoard (1,500 gp + magic items)
- **Aeorian Echo outcome:** Temple remains a convergence point; another creature may claim it later
- **Reputation:** Heroes of Northreach; Lorewarden Elric requests debrief

### Path B: Drive Venomfang Away (Non-Lethal Victory)
**Result:**
- Venomfang retreats, wounded and humiliated
- Kobolds abandon temple without their dragon leader
- Treasure partially looted (dragon takes most of hoard)
- **Aeorian Echo outcome:** Same as Path A (temple still radiates magic)
- **Future hook:** Venomfang may return in later campaigns

### Path C: Negotiate with Venomfang
**Result:**
- Dragon agrees to leave Northreach in exchange for tribute (500 gp + magic item)
- OR dragon agrees to non-aggression pact (won't raid settlements, party won't hunt her)
- Kobolds follow Venomfang elsewhere
- **Aeorian Echo outcome:** Temple remains unclaimed but monitored
- **Reputation:** Controversial — some see party as pragmatic, others as cowards
- **Future hook:** Venomfang may become an ally (or betray party later)

### Path D: Destroy or Seal the Temple
**Result:**
- Collapse temple to deny access to magical convergence point
- Venomfang escapes but loses her power base
- **Aeorian Echo outcome:** Magical energy disperses (reduces regional instability)
- **Lorewarden Elric's reaction:** Impressed ("You addressed the root problem, not just the symptom")

## Tactical Notes

### Combat Encounter Scaling

**Part I: Kobolds vs. Guards (Northcrest)**
- **2-3 players:** 4 kobolds
- **4-5 players:** 6 kobolds
- **Scaling:** Guards help players; if guards die, kobolds flee

**Part II: Andersmith Farm Investigation**
- **Exploration-focused** — no combat unless players trigger kobold scouts
- **If combat:** 2-3 kobolds (scouts)

**Part III: Temple Approach**
- **Outer Ruins:** 6-8 kobolds (guards)
- **Trapped Corridor:** Spiked pit traps (DC 13 Perception to detect, DC 12 Dex save to avoid, 2d6 piercing damage)

**Part IV: Temple Interior**
- **Main Chamber:** 8-10 kobolds + 1 kobold inventor (CR 1/4, uses improvised explosives)
- **Venomfang's Lair:** Venomfang (Young Green Dragon, CR 8) + 2-4 kobold guards

**Environmental Hazards:**
- **Poison Gas Pools:** 10 ft radius, DC 12 Con save or poisoned for 1 minute
- **Crumbling Pillars:** Can be knocked over (Athletics check) to create cover or crush enemies
- **Flooded Chambers:** Difficult terrain, Venomfang can swim freely

### Venomfang's Combat Tactics

1. **Round 1:** Poison Breath (recharge 5-6), then fly to high perch
2. **Round 2-3:** Fly-by attacks (Bite and claw), stay out of melee reach
3. **Round 4+:** Use lair actions (if applicable) — rockfall, poison cloud
4. **If bloodied (50% HP):** Attempt to flee OR offer negotiation
5. **If cornered:** Fight to the death (Frightful Presence to scatter weak PCs)

**Lair Actions (Optional):**
- **Rockfall:** DC 13 Dex save or take 2d10 bludgeoning damage
- **Poison Fog:** 20 ft radius cloud, DC 12 Con save or poisoned

### Non-Combat Challenges

**Investigation (Andersmith Farm):**
- DC 10 Survival: Track kobolds back to temple ruins (northwest mountains)
- DC 12 Investigation: Find cult symbols (dragon claw marks, stolen supplies)
- DC 10 Medicine: Stabilize Joel Andersmith (he provides clues)

**Stealth (Temple Approach):**
- DC 13 Stealth: Avoid kobold sentries (bypass outer guards)
- DC 15 Stealth: Infiltrate temple via collapsed back entrance

**Negotiation (Venomfang):**
- DC 15 Persuasion: Convince her to leave peacefully
- DC 13 Intimidation: Threaten her with superior force (must demonstrate combat prowess first)
- DC 12 Deception: Trick her into believing party has dragon-slaying weapons

## Improvisation Toolkit

### If Players Get Stuck (Investigation Phase)

1. **Joel Andersmith provides clear directions:** "The kobolds came from the northwest mountains. There's an old temple up there — ruins from before the Calamity."
2. **Northcrest guards offer to scout:** "We'll mark the trail for you. Just deal with whatever's up there."
3. **Venomfang sends a kobold emissary:** "Our great master wishes to speak with you. Come to the temple. She promises safe passage." (This is a lie — ambush.)

### If Players Avoid the Temple

- Kobold raids escalate (attack Northcrest directly)
- Venomfang personally attacks the town (forces confrontation)
- Lorewarden Elric sends urgent message: "The temple is a magical convergence point. You must investigate."

### If Players Attack Venomfang Immediately

- She's surprised but uses Poison Breath immediately
- Kobolds swarm party (reinforcements arrive)
- If party is winning, she flees
- If party is losing, she offers terms: "Enough. You fight well. Leave now, and I'll let you live."

### If Players Are Dying

- Kobolds focus on capture, not killing (want to sacrifice prisoners)
- Northcrest guards arrive as reinforcements (late but helpful)
- Venomfang decides party isn't worth the effort and flies away (insult: "Not even worth eating")

## Rewards & Aftermath

### Standard Rewards
- **Northcrest Gratitude:** 500 gp + free supplies
- **Venomfang's Hoard (if killed):** 1,500 gp, 2d4 gems (100 gp each), 1d4 magic items
- **Cult Treasure:** 200 gp, kobold-made traps and tools

### Magic Items (Venomfang's Hoard Examples)
- **+1 Longsword** (dragon-slaying history, inscribed with Dragonknights' oath)
- **Cloak of Elvenkind** (looted from previous victim)
- **Potion of Greater Healing** x3
- **Ring of Protection** OR **Amulet of Health** (rare item, if party did exceptionally well)

### XP Awards (Milestone)
- Completing temple investigation: Party reaches **Level 4**
- Defeating/driving away Venomfang: Party reaches **Level 5**

### Reputation Changes
- **Northcrest:** Heroes (permanent discount at shops)
- **Northreach Wardens:** Elite status (Brenna promotes party to senior Wardens)
- **Lorewarden Elric:** Fascinated by temple's ley line convergence (requests report)

## Aeorian Echo Foreshadowing

**Revelations to drop during the adventure:**

1. **Temple's Magical Resonance:**
   > "The temple radiates magical energy — not from the ruins themselves, but from *beneath* them. Ley lines converge here, amplified by something far away."

2. **Venomfang's Motivation (if negotiated):**
   > "I sensed power here. Power that called to me. Something is waking the old magic, and I intend to claim it before others do. Why should gods and wizards hoard such strength?"

3. **Kobold Cult Beliefs:**
   > "The Great Venomfang will ascend! The old magic rises, and she will become a GOD! We are her chosen!"

4. **Temple Inscriptions (if investigated):**
   > "The Dragonknights swore an oath: 'We guard the sleeping things, that they may never wake.' Beneath the temple are carved warnings in Draconic: 'Sealed by divine will. Do not disturb.'"

5. **Lorewarden Elric's Debrief (when party returns to Waystone Inn):**
   > "A dragon drawn to a ley line convergence? Troubling. The Aeorian Echo isn't just reactivating ruins — it's creating *beacons* across Northreach. Every creature with magical sensitivity can feel it. Venomfang was just the first. We need to find a way to stop this before worse things arrive."

\page

# DM Prep Checklist: Temple of the Dragonknights

## One Week Before Session

- [ ] Read entire adventure (shorter adventure — 30-45 minutes)
- [ ] Review DM Notes section for themes and combat tactics
- [ ] Familiarize yourself with Young Green Dragon stat block (MM p94-95)
- [ ] Review kobold stat block (MM p195) and Pack Tactics ability
- [ ] Decide on Venomfang's personality voice — clever, ambitious, condescending
- [ ] Decide if Venomfang will negotiate OR fight to the death
- [ ] Mark key revelation moments (temple is a ley line convergence point)

## Day Before Session

- [ ] Print/bookmark stat blocks:
  - [ ] Young Green Dragon (MM p94-95) — **PRIMARY BOSS**
  - [ ] Kobold (MM p195)
  - [ ] Kobold Inventor (Volo's Guide p166 OR use kobold with improvised bombs)
- [ ] Print/bookmark NPC summaries (Joel Andersmith, Northcrest guards)
- [ ] Review temple map (if using) or plan theater-of-mind layout
- [ ] Prepare Venomfang's lair description (collapsed temple chamber, acid pools, high ceiling)
- [ ] Prepare kobold trap descriptions (spiked pits, tripwires, alarm bells)
- [ ] Decide on Venomfang's hoard contents (treasure + magic items)
- [ ] Review lair actions (optional) — rockfall, poison fog

## Props & Materials

- [ ] Index card with Venomfang's dialogue quotes (negotiation, threats, gloating)
- [ ] Index card with temple key locations (outer ruins, main chamber, lair)
- [ ] Map of temple (sketch or theater of mind)
- [ ] Dragon miniature or token (Venomfang)
- [ ] Kobold miniatures or tokens (10-12 recommended)
- [ ] Hazard markers (poison pools, crumbling pillars, traps)

## Session Zero / Player Prep

- [ ] Confirm party level (3-5 recommended; this is a tough adventure)
- [ ] Brief players: This adventure culminates with a dragon fight (CR 8)
- [ ] Set expectations: Combat, exploration, and potential negotiation
- [ ] Ask players: "How does your character feel about dragons? Kobolds? Negotiating with enemies?"
- [ ] Clarify: Venomfang is intelligent and may negotiate — killing her isn't the only solution
- [ ] Warn: Young green dragon is **deadly** — party should consider tactics, environment, and creative solutions

## Quick Reference During Play

### Key DC Checks

**Northcrest Investigation:**
- DC 10 Medicine: Stabilize Joel Andersmith
- DC 12 Insight: Joel is genuinely terrified (not lying)
- DC 10 Survival: Track kobolds to temple ruins

**Temple Approach:**
- DC 13 Perception: Detect kobold sentries
- DC 13 Stealth: Bypass outer guards
- DC 15 Stealth: Infiltrate via collapsed back entrance
- DC 12 Investigation: Find cult symbols and stolen supplies

**Temple Interior:**
- DC 13 Perception: Detect spiked pit traps
- DC 12 Dex save: Avoid falling into pit (2d6 piercing damage)
- DC 13 Arcana: Identify ley line convergence (magical energy beneath temple)
- DC 10 History: Recognize Dragonknights' oath inscriptions

**Negotiation with Venomfang:**
- DC 15 Persuasion: Convince her to leave peacefully
- DC 13 Intimidation: Threaten her (requires demonstration of power)
- DC 12 Deception: Trick her into believing party has advantages (dragon-slaying weapons, etc.)

### Encounter Scaling Quick Reference

**2-3 Players:**
- Kobolds vs. Guards: 4 kobolds
- Temple Outer Ruins: 6 kobolds
- Main Chamber: 8 kobolds + 1 kobold inventor
- Venomfang's Lair: Venomfang + 2 kobold guards

**4-5 Players:**
- Kobolds vs. Guards: 6 kobolds
- Temple Outer Ruins: 8 kobolds
- Main Chamber: 10 kobolds + 1 kobold inventor
- Venomfang's Lair: Venomfang + 4 kobold guards

**Adjust Venomfang's Difficulty:**
- If party is Level 3: Use half HP (60 HP instead of 136)
- If party is Level 4-5: Use full stats
- If party is struggling: Venomfang flees at 50% HP

### Venomfang Quick Stats (Young Green Dragon)

- **AC:** 18 (natural armor)
- **HP:** 136 (16d10 + 48)
- **Speed:** 40 ft., fly 80 ft., swim 40 ft.
- **Attacks:** Bite (+7 to hit, 2d10+4 piercing + 2d6 poison), Claw (+7 to hit, 2d6+4 slashing)
- **Poison Breath (Recharge 5-6):** 30 ft cone, DC 14 Con save, 12d6 poison damage (half on save)
- **Skills:** Deception +4, Insight +4, Perception +6, Stealth +4
- **Condition Immunities:** Poisoned
- **Senses:** Blindsight 30 ft., Darkvision 120 ft., Passive Perception 16
- **Languages:** Common, Draconic
- **CR:** 8 (3,900 XP)

**Tactical Notes:**
- Starts with Poison Breath, then flies to high perch
- Uses Bite and Claw from the air (flyby attacks)
- Flees at 50% HP OR offers negotiation
- If cornered, uses Frightful Presence (if you add this ability)

### Temple Key Locations (Quick Map)

1. **Outer Ruins:** Kobold sentries (6-8), trapped entrance
2. **Main Hall:** Collapsed pillars, cult symbols, kobold camp (8-10)
3. **Ritual Chamber:** Kobold inventor preparing ritual (ley line activation)
4. **Venomfang's Lair:** Dragon's hoard, acid pools, high vaulted ceiling
5. **Back Entrance:** Collapsed wall (Stealth approach, bypasses guards)

### Pacing Guide (4-6 Hour Session)

**Hour 1: Northcrest Investigation**
- Kobolds attack, guards respond, party assists
- Joel Andersmith provides quest info
- Party gathers supplies, talks to locals

**Hour 2: Journey to Temple**
- Travel through mountains (Survival checks, random encounters optional)
- Scout temple exterior, plan approach

**Hour 3: Temple Infiltration**
- Outer ruins combat (kobold guards)
- Navigate traps and hazards
- Reach main chamber

**Hour 4: Main Chamber Combat**
- Large kobold force (8-10 + inventor)
- Environmental combat (pillars, debris)

**Hour 5: Venomfang Confrontation**
- Dragon encounter (combat OR negotiation)
- Lair hazards (acid pools, high ceiling)

**Hour 6: Resolution & Return**
- Loot hoard, explore temple
- Return to Northcrest, celebration
- Debrief with Lorewarden Elric

### Important Names

- **Venomfang:** Young green dragon (ambitious, clever, opportunistic)
- **Joel Andersmith:** Farmer (injured by kobolds, quest giver)
- **Richard & Lauraine Brown:** Innkeepers at Flowing Mug Inn
- **Dorn Stoutheart:** Blacksmith (provides equipment)
- **Northcrest Guards:** Town militia (assist in opening encounter)

### Quick Treasure

- **Northcrest Reward:** 500 gp + free supplies
- **Venomfang's Hoard:** 1,500 gp, 2d4 gems (100 gp each), 1d4 magic items
- **Kobold Loot:** 200 gp, traps, tools
- **Magic Items:** +1 Longsword, Cloak of Elvenkind, Potions of Greater Healing x3, 1 rare item (DM choice)

### Venomfang's Opening Dialogue (if party enters lair)

> *A sleek green dragon lies coiled atop a pile of gold and bones. Her eyes gleam with intelligence as she regards you.*
>
> "Adventurers. How... expected. You've slaughtered my servants, disturbed my lair, and now you stand before me. Brave? Or foolish? Perhaps both. What do you want here?"

### Venomfang's Negotiation Offer (if party is strong)

> "You fight well. Better than the so-called 'Dragonknights' who built this tomb. I have a proposition: I will leave this region. In exchange, you will give me one magic item from your possession, and you will not pursue me. Refuse, and I will kill you where you stand. Choose quickly."

### Venomfang's Threat (if party refuses negotiation)

> *The dragon rises, wings unfurling.*
>
> "So be it. I will feast on your corpses and add your treasures to my hoard. Know this: I am Venomfang, and I will be remembered as the dragon who **broke** the heroes of Northreach!"

### Venomfang's Retreat (if bloodied)

> *The dragon snarls, blood dripping from her wounds.*
>
> "This isn't over. I will remember your faces. One day, you will regret sparing me — or not killing me fast enough."

*She flies away through a collapsed section of ceiling, escaping into the mountains.*

### Lorewarden Elric's Debrief (when party returns to Waystone Inn)

> *Elric listens intently to your report, his face grave.*
>
> "A young dragon drawn to the temple. Kobolds worshipping her as a god. And beneath it all, ley lines converging, amplified by... Salsvault, I presume. The Aeorian Echo is creating magical beacons. Venomfang was opportunistic, but she won't be the last. We need to find a way to stop the Echo at its source. But first, rest. You've earned it."

## Post-Session Tasks

- [ ] Update Campaign Tracker: Temple of Dragonknights completed
- [ ] Note if Venomfang was killed, driven away, or negotiated with
- [ ] Record party's reputation in Northcrest (Heroes status)
- [ ] Track magic items acquired from Venomfang's hoard
- [ ] Award XP or milestone level-up (Party → Level 4 or 5)
- [ ] Note party's reaction to Aeorian Echo revelations
- [ ] Prepare Elric's follow-up hooks (investigate other convergence points? Return to Salsvault?)
- [ ] If Venomfang escaped, note potential future encounter

## Troubleshooting Common Issues

### "Venomfang killed our entire party in one round!"
→ If TPK occurs, have Venomfang decide party is "worth more alive" — capture them for ransom to Northcrest. Players escape (skill challenge) and get second chance.

### "We want to negotiate before even entering the temple!"
→ Allow it. Venomfang sends a kobold emissary. Negotiate terms: tribute, territory concessions, non-aggression pact. This is a valid (and clever) resolution.

### "We want to collapse the entire temple to kill Venomfang!"
→ Excellent creative solution. Require Engineering checks (DC 15) to rig collapse safely. Venomfang escapes (flying) but loses her hoard and power base.

### "The kobolds are too weak; they die in one hit!"
→ Kobolds should use Pack Tactics (advantage via flanking) and traps. If party steamrolls them, add reinforcements or have them flee to warn Venomfang.

### "We refuse to fight a CR 8 dragon; we're only Level 3!"
→ Validate their concern. Emphasize negotiation, environmental tactics (collapse temple, poison gas, etc.), or fleeing as viable options. Venomfang doesn't fight to the death if she can avoid it.

## Next Session Hook

After defeating/driving away Venomfang and debriefing with Elric:

> "The Aeorian Echo is attracting predators. Venomfang was clever and ambitious, but others may be less... negotiable. We need to understand the Echo's full extent. I've marked three potential convergence points on my map. Which will you investigate next?"

This sets up potential future adventures or allows party to pursue other goals in Northreach.

\page

**Introduction**: Venomfang, a young green dragon, has recently perched herself in the burial ground of an ancient group of dragon slayers

known as “The Dragonknights.” As she hunts in the nearby forest, her kobold minions gather to raid the nearby town of Fallcrest to bring

riches to themselves and their master, but it seems Venomfang and her minions may have a darker, more sinister purpose…

# A four-hour adventure for two 1st-2nd level characters

by DAWSON WOOD

![A high-contrast graphic of a stylized pale-green dragon shaped like an ampersand (&), outlined in black and breathing a curled flame. The dragon sits on a black background with a dark olive horizontal bar at the top containing the uppercase word "GUILD" in the same pale-green color. The design has a bold, emblem-like appearance.](./Temple_of_the_Dragonknights_images/image_002.png)

DUNGEONS & DRAGONS, D&D, Wizards of the Coast, Forgotten Realms, the dragon ampersand, *Player’s Handbook, Monster Manual, Dungeon Master’s Guide,* D&D Adventurers League, all other Wizards of the Coast product names, and their respective logos are trademarks of Wizards of the Coast in the USA and other countries. All characters and their distinctive likenesses are property of Wizards of the Coast. This material is protected under the copyright laws of the United States of America. Any reproduction or unauthorized use of the material or artwork contained herein is prohibited without the eXPress written permission of Wizards of the Coast.

©2016 Wizards of the Coast LLC, PO Box 707, Renton, WA 98057-0707, USA. Manufactured by Hasbro SA, Rue Emile-Boéchat 31, 2800 Delémont, CH. Represented by Hasbro Europe, 4 The Square, Stockley Park, Uxbridge, Middlesex, UB11 1ET, UK.


# Part I: Innocents Lost

*In this part of the adventure, the players will encounter their first kobolds, investigate a small farmstead, and locate the source of the attacks…*


\page

## A. Northcrest

The town of Northcrest contains multiple key locations such as The Flowing Mug Inn, a blacksmith, and a market square.

### The Flowing Mug Inn

The adventurers begin in The Flowing Mug. How they got there and how they met is up to the players and the DM. The Flowing Mug is your typical tavern as well as Inn. It is known by the local townsfolk as a trustworthy, “stand-up” Inn.

#### Additional Information

- Richard Brown: Male, Human, mid-sixties, barkeep
- Lauraine Brown: Female, Human, early-sixties, innkeep

*Item Cost*

|  |  |
| --- | --- |
| *Mug of Ale*  *Room (Per day)* | 4 cp |
| 5 sp |
| *Meals (per day)*  *Common Wine* | 3 sp |
| 2 sp |

When it seems appropriate, perhaps after ordering a few drinks and introducing themselves, the players

here the sounds of yelling & grunting outside. – SEE “KOBOLDS VS GUARDS”

### The Blacksmith

The blacksmith shop is a good place to have the adventurers go if they need to resupply on weapons, armor, or ammunintion.

#### Additional Information

Anything the blacksmith doesn’t have on hand can be requested to create for 1.5x its value in The Player’s Handbook.

- Dorn Stoutheart: Male, Human, late-thirties, blacksmith
- James Turin: Male, Human, late-teens, blacksmith’s apprentice

*Item Cost*

|  |  |
| --- | --- |
| *Arrows (20)* | 1 gp |
| *Hide Armor*  *Chain Shirt*  *Ring Mail Shield* | 10 gp |
| 50 gp |
| 30 gp |
| 10 gp |

### Market Square

The market square contains multiple small, specialized stalls.

#### Additional Information

- Valerie Renn: Female, Human, mid-twenties, produce
- John Goodard: Male, Human, late-twenties, freshly hunted meats
- Abraham Calhoun: Male, Human, mid-fifties, freshly caught fish
- Venona Glowsky: Female, Half-Elven, early-twenties, freshly hunted pelts
- Talia Pinsinger: Female, Human, late-forties, jeweler ...and others.

Later on in the adventure, the adventurers may recover stolen supplies from the kobolds. They would return these barrels to the market square.

## B. Kobolds vs. Guards

After hearing noises from outside The Flowing Mug Inn, the adventurers investigate outside to find 4 guards rushing to action against 6 invading kobolds, who appear to have green skin. Resolving this encounter yields 100 XP divided amongst the party.

### Saving Joel Andersmith

Joel Andersmith, a farmer from North of town, will be found lying against the wall of The Flowing Mug after the fight. If asked, he will provide the following information

#### Additional Information

- The kobolds have raided his farm and murdered his family.
- He believes that the kobolds may be more kobolds in the forest to the North

After this information is given, Joel will burst into tears over the loss of his family. The town guards will escort him to the Inn and pay for his stay as long as he needs. The guards will also insist that they must stay in town to protect it from potentially worse threats.

### Capturing a Kobold

\page


If the players manage to capture and interrogate a Kobold, a DC 15 Persuasion or DC 12 Intimidation check will conclude with the captured enemy revealing information.

#### Additional Information

- The location of Poisontip Cavern: North past the farmstead and through the brush.
- The location of Fallcrest’s missing supplies: Poisontip

Cavern

- The fate of Joel’s family: His wife and son are dead, but they needed his daughter.
- Information regarding Venomfang and her intentions will not be revealed.

## C. Andersmith Farm

About a mile North of town, bordering the forest, lies what’s left of Andersmith Farm. Smoke rises all along the crops and slaughtered animals lie scattered across the ground. A house overlooks the farmland on a small hill to the East, and a barn lies in semi-ruin to the North, bordering the forest.

### The Barn

Upon closer inspection of the barn, the entire Eastern half is caved in, with piles of broken wood lying scattered across the ground. Blood tracks lead outside the barn but eventually fade. A DC 7 Survival check will reveal the tracks’ destination; the brush behind the barn. There are also the remnants of ransacked barrels and supplies.

### The Farmhouse

Walking in the front door of the farmhouse (which hangs off of one of its hinges) reveals the interior; a main room previously used as a living room & dining room, and two hallways that branch to the left and right.

#### The Left Hall

Down the left hall there is a bedroom on each side. The bedroom on the left is Joel’s son’s room. He lies on the ground with his gut split open, and a simple shortsword at his side.

Across the hall is Joel’s daughter’s room, which is empty save for the ruined furniture and a bloodstained teddy bear lying in the bed.

#### The Right Hall

Down the right hall there is a washroom to the left and another bedroom. In the bedroom, a middleaged woman lies leaning against a large bed with a slit throat.

A DC 10 Survival check will reveal tracks that lead to the back side of the barn,


\page

## D. The Trail

The players will eventually follow tracks that reveal an unnatural looking thicket. This can be cut through or, with a DC 11 Investigation check, a vine connecting to a mechanism can be found that pulls the brush up. The following trail is 5 ft. wide and must be traveled single-file.

A passive perception of 12 will find a small lock of hair along the trail. An intelligence check DC 15 will discern that it’s human.

### The Creek

Following the trail through the woods for a mile leads to an opening to a small creek. Small, slippery stones create a path across the creek. Crossing safely takes a successful DC 12 Acrobatics or Athletics check. A failure results in falling into the creek, where two quippers sense fresh meat. Crossing the creek awards 20 XP to each character. After crossing the creek spears topped with human skulls begin to dot the trail.

### Cave Entrance

After a curve in the trail, a DC 12 Passive perception check will signify movement around the corner. Turning the corner reveals two kobolds currently roasting a pig on a spit. They are currently eating so any attempt at stealth is successful. This encounter yields 50 XP divided amongst the party.


# Part II: Poisontip Cavern

*In this part of the adventure, the players will eXPlore and fight their way through Poisontip Cavern. The cavern is extremely dark and those who don’t have darkvision will be completely blind. The 2nd floor is 15 ft. above the 1st…*

## Area 1

This section of the cavern is relatively straightforward. The players will immediately be attacked by a single winged kobold upon entering. This encounter yields 50 XP divided amongst the party.

|  |
| --- |
| This area involves crossing a rickety bridge over a lake full of stalagmites, and a trap.  **Puzzle Clue**    The parchment reads in Common: “Legends  are  born through blood and fire,  ”    and contains the  emblem of the  Dragonknight  s.    On the back it reads  in scribbled Draconic: “  We brought the girl to the  robed ones. Not sure why they wanted her, but  whatever it takes to please the master.”    **Additional**    **Information**        The emblem of the  Dragonknight  s appears as a snake  -  like  cre  ature wrapped around a sword.    **Area 3**   ![A pale green, hand-drawn dungeon/cave map on a square grid. Jagged cave walls outline interconnected tunnels and chambers; several areas are numbered 1–5. The drawing mixes natural cave features (wavy lines for water, small triangular stalagmite/stalactite marks) with constructed rooms and furnishings. Notable features - Large southern chamber labeled "1" reached by a single narrow approach. - Broad central band labeled "3" spanning the map, with water/feature marks inside the enclosed area. - Rectangular east complex labeled "2" with two hearth-like symbols and small rectangular furniture; a small side room at the far east contains stacked barrels or casks. - Northern small chamber labeled "5" with a long narrow corridor or causeway extending east from it. - A circled "T" on the western passage and an "S" adjacent to the east complex (both marked on the map). - Several narrow winding tunnels connecting chambers, plus short stair/ladder symbols in places. - Grid background for scale; overall style is schematic and suitable for tabletop RPG use.](./Temple_of_the_Dragonknights_images/image_003.png) **Crossing the Bridge** |

\page


After this encounter, the players may notice the cliff drop below them, into a small underground lake. Depending on their ability to see, they may stumble into it. See AREA 3 for details. A small passage on the right of the lake requires a DC 8 Acrobatics check to cross.

## Area 2

After finding the passage way and taking the stairs up to area 2, The players encounter 3 kobolds sleeping in corresponding tents (unless the winged encounter was very very loud). This encounter yields 75 XP. The following items are found in tents.

|  |
| --- |
| **Additional Information**   * In the Northernmost tent is 25 gp and a piece of parchment that appears to be torn out of a book. See PUZZLE CLUE * In the tent to the Southeast there are two Potions of Healing. * The secret door on the Eastern wall takes a DC 10   Perception check to notice, and a DC 14 Athletics check to budge open.   * Inside the secret door are all the town’s missing supplies, which the players may inform the townspeople of, or return them themselves (100 gp & 20 XP each if they do it themselves). |

The skill used to cross safely is Acrobatics. The base DC is 0 for 80 lbs or lower at one time. The DC increases the more weight there is.

*Weight (lbs) DC*

|  |  |
| --- | --- |
| *x < 80*  *80 < x < 130*  *130 < x < 180*  *180 < x < 230 x > 230* | 0 |
| 5 |
| 10 |
| 15  20 |

If any player falls in, roll a percentage. If the percentage is under 15% the player takes 1d6 piercing damage from a stalagmite, otherwise they take no damage. There are 4 hungry quippers waiting in the water below the bridge. Crossing the bridge yields 75 XP divided amongst the party.

### Triggering the Trap

Following the bridge, immediately after is a pressure triggered trap that is triggered by anyone over 120 lbs. If triggered, anyone in that 5x5 ft. square is pelted with rocks, suffering 1d6 bludgeoning damage. Disarming the trap yields 10 XP to the one who disarmed it.


\page

## Area 4

Area 4 contains a single piercer hanging above a single chest. The ceiling is 20 ft. high. Within the chest is 25 gp. As soon as someone opens the chest, the piercer will drop on its target. Completing this encounter yields 100 XP divided amongst the party.

## Area 5

This area contains an offering bowl, a large stone double door, and two lit torches in sconces on each side of the door. The door has the Dragonknight emblem on it, and the offering bowl is full of gold (20 gp)

|  |
| --- |
| **Additional Information**   * To solve the puzzle, the players must poor a portion of their blood into the offering bowl, and light the blood on fire using one of the magical torches on the wall. * Emptying the bowl of gold and making a DC 10   Investigation check will reveal dried blood on either the gold or on the bowl. |

Opening the door yields 50 XP divided amongst the party and reveals a pathway and staircase going up.


# Part III: Temple of the Dragonknights

*In this chapter, the party will rescue a potential ally, determine the fate of Joel’s daughter, and potentially face off with a dragon…*

## Area 1

This area contains four coffins of four long dead Dragonknights. If the players step on the emblem on the center of the floor, four zombies (nerfed to 11 hp and 1d4 dmg) will burst out of their tombs. This encounter yields 100 XP divided amongst the party.

### Additional Information

At this point, the party should be level 2. At this point it is recommended that you do not continue until you level your characters. The DM should determine when a good stopping point is based on your party and their situation.

## Area 2

This room is drapped in torn and burnt banners of the Dragonknights, but within the circular outskirts of this room lie an armory. In the armory, a kobold cultist (cultist stats) is torturing a young Elf wizard named Sera Gelanadel. This encounter yields 25 XP divided amongst the party.

### ![Top-down, hand-drawn dungeon/cavern map on a square grid, drawn in pale green. Key features: - Overall layout: irregular caverns and twisting corridors connecting a cluster of rooms on the right to a much larger cavern complex on the left and bottom. - Numbered areas: large southern chamber labeled "1"; a long horizontal feature labeled "3" crossing the central area; a rectangular room/complex on the right labeled "2"; a narrow northern passage/room labeled "5"; an upper-left region labeled "4". - Right-hand building (area 2): a structured rectangular interior with furniture symbols (tables or benches), two circular fire or brazier icons, and a small storage yard with stacked barrels or crates; an "S" marking near the storage. - Central zone: winding tunnels and multiple smaller chambers; some rooms show wavy lines (water or marsh) and small triangle/spear marks (spikes or elevations). - North area (5): a compact chamber with a long thin bridge or pier extending east, including a slatted grate or dock detail. - West edge: a small circled "T" in a side passage (possible trap, teleporter, or shrine). - Passage details: many narrow, cave-like corridors with rough rock borders, short stair symbols in a few places, and several chokepoints and alcoves useful for encounters or exploration. - Presentation: map uses grid squares for scale, rough rocky outlines for cave walls, and simple icons to indicate furniture, fire sources, storage, water, spikes, and special markers.](./Temple_of_the_Dragonknights_images/image_004.png)Additional Information

- Sera is a famous wizard’s apprentice and was sent to investigate the strange arcane energy originating here, how she is played and any additional backstory are up to the DM, or perhaps a third player. She is a level 1 Wizard
- A DC 10 Investigation check of the weapon racks reveals a Spear of the Dragonknights (+1 spear). The DM may change the weapon type to fit one of the players if he/she wishes.
- Sera has 2 Potions of Healing on her.

## Area 3

This room contains a single brazier, and a massive stone carved frieze depicting an epic tale of dragonslaying. A DC 18 Investigation check will reveal a hidden groove in the stone that contains a single platinum ring (250 gp) inside.

\page


After looking over the beautiful artwork on the wall, have a character notice a fourth shadow. This shadow will initiate combat. This encounter yields 100 XP divided amongst the party.

## Area 4

In this room, there are 4 tables with benches, a ritualistic rune in the ground, and a podium in the southernmost portion of the room. The players walk into 5 cultists in the middle of performing a ritual on Joel’s daughter. She is currently hanging suspended by magic beaming from the cultists’ hands. This encounter yields 125 XP divided amongst the party.

### Additional Information

- Joel’s daughter can be roleplayed as the DM sees fit, but after the ritual is interrupted, she falls unconscious. Her name is Clementine Andersmith
- A DC 12 Investigation check will reveal 2 Potions of Healing in a hidden compartment in the podium.
- A book on top of the podium lies open. A DC 15 Arcana check will discern the ritual’s nature.
- A DC 14 History check will inform the player that soul gems are used to turn creatures into liches.

### The Ritual

Venomfang’s goal with this ritual is up to the DM. In my game Venomfang wants to revive a Dracolich, so her goal here was to create one of the gemstones required to store the Dracoliches soul, but again, this ritual’s purpose is up to the DM.

## Area 5

Nothing terribly significant here. Two sleeping chambers for previous members of the Dragonknights now being occupied by the cultists. A DC 10 Investigation check will reveal a Potion of Healing in a nightstand in the Northernmost room.

## Area 6

Upon exiting up the stairs to this open area, the players find themselves in a clearing atop a mountain with a surprisingly peaceful forest. During this time, a green dragon wyrmling will be stalking the party.

### Additional Information

- The green dragon wyrmling will attempt to stealth and stalk the party until they reach the marble platform in the southern portion of the area.
- On the marble platform, there is a toppled statue of the dragonknights, and 4 dragon eggs.
- As one of the players notice one is opened, the wyrmling will attack (unless the players noticed it previously.)  Clementine will hide in area 5.

This encounter yields 450 XP divided amongst the party.



\page

# Part IV: Loose Ends

*The party has saved Joel’s daughter, faught a dragon and her minions, and potentially saved the town of Fallcrest. What’s next?*

## A. Returning Home

On the opposite side of the entrance, is an exit with a path down the mountain. To any party members who were paying attention, it shouldn’t be hard for them to find their way back. The exit is on the Southern side of the mountain near the entrance to Poisontip Cavern.

## B. Hope Restored

Joel can be found upstairs in The Flowing Mug Inn, reading a book in his room. Returning Clementine to him lights a fire in his heart that can only be described as renewed hope for his life.

## C. Supplies Returned

Returning the supplies to the market garners some benefits (100 gp & 20 XP each and the townsfolks approval.)

## D. Venomfang

Venomfang returns to her lair to find it in ruin, and one of her children is missing. This allows for the DM to do whatever he/she wants with this villain, who certainly wants revenge.

## E. Sera and the Temple

Sera returns to her home city of Waterdeep to report to Archmage Vysellon on the strange goings-on in the Dragonknight Temple.

\page
<!-- FILE_END: ../Season 1/Adventures/Temple_of_the_Dragonknights/Temple_of_the_Dragonknights.md -->

# World Secrets

<!-- FILE_START: ../World Building/DMEyesOnly/The_Aeorian_Echo.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**MAJOR CAMPAIGN SPOILERS AHEAD**

This document contains secret information about the central mystery of the Northwatch Wardens campaign. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see the main World Building and Season 1 folders (excluding DM_Resources).
}}

# The Aeorian Echo: Campaign Master Document

## Overview

This document contains the complete secret history and mechanics of the Aeorian Echo—the central threat underlying the Northwatch Wardens Season One campaign. This information is **STRICTLY DM EYES ONLY** and represents major campaign spoilers.

---

## What is the Aeorian Echo?

### The Simple Answer (For DMs)

The Aeorian Echo is the reactivation of ancient pre-Calamity magical facilities left behind when the flying city of Aeor crashed during the Calamity. These facilities, designed as weapons against the gods, have begun to wake up after millennia of dormancy.

### The Technical Answer

An "Echo" is a magical resonance phenomenon where dormant Aeorian technology responds to specific stimuli—either environmental changes, magical triggers, or deliberate activation by an intelligent entity. The current Echo represents a cascading reactivation across a network of interconnected facilities.

### The Terrifying Answer

Something survived Aeor's fall and is systematically bringing its ancient weapons back online to complete pre-Calamity objectives: neutralize divine magic, eliminate dragons, and establish control over the mortal races.

---

## Historical Background

### Aeor Before the Fall

**What It Was:**
- Flying city-state of arcane mastery
- Peak achievement of pre-Calamity magical civilization
- Focused on surpassing and potentially destroying the gods
- Developed weapons that could threaten divine beings

**Its Hubris:**
- Believed magic could equal or exceed divine power
- Created weapons that couldn't be healed by divine magic
- Developed biological, magical, and technological attacks
- Planned to strike against the gods directly

**The Calamity:**
- Gods united to destroy Aeor
- City was shattered and crashed
- Most inhabitants killed instantly
- Scattered across what would become Eiselcross

### Aeor After the Fall

**Immediate Aftermath:**
- Main city crashed into Eiselcross region
- Fragments scattered across wider area
- Some facilities survived intact (encased in ice/buried)
- Automated systems entered dormancy
- Magical contamination spread through impact sites

**The Long Sleep:**
- Centuries of inactivity
- Gradual degradation of some systems
- Others preserved in magical stasis
- Occasional brief activations (causing local tragedies)
- Slowly growing magical resonance between sites

**What Survived:**
- Automated defense systems
- Biological weapons in containment
- Research data and knowledge bases
- Some form of central intelligence
- Communication networks (dormant)

---

## The Northreach Region's Connection

### Why Here?

**Geological Reality:**
- Northreach region lies directly south of main Eiselcross crash site
- Multiple Aeorian fragments impacted in the area
- Underground connections still exist between facilities
- Magical ley lines connect the sites

**The Facility Network:**

**Major Sites:**
1. **Salsvault** (Far North) - Medical research and bioweapons
2. **Command Center** (Beyond Salsvault) - Central intelligence
3. **Temple Site** (Northwest Mountains) - Draconic weapons research
4. **Welton Area Facility** (Underground) - Biological modification testing
5. **Waystone Marker** (Central) - Network communication beacon

**Minor Sites:**
- Multiple small research stations
- Communication relays
- Monitoring posts
- Resource extraction points
- Transit nodes

**Underground Network:**
- Connects major facilities
- Transit system (currently inactive)
- Communication lines (reactivating)
- Magical conduits
- Defensive kill-zones

---



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## The Reactivation: What's Happening and Why

### The Trigger

**Primary Cause:**
- Recent increase in Eiselcross exploration
- Artifacts removed and transported south
- Disturbance of sealed facilities
- Magical interference with dormant systems

**Secondary Causes:**
- Natural magical accumulation over centuries
- Ley line activity increasing
- Environmental changes affecting ice seals
- Specific items being brought together

**The Awakening Intelligence:**
- Something in the Command Center has awakened
- Either Aeorian consciousness, AI, or entity
- Began sending activation signals
- Systematically bringing network online

### The Pattern of Activation

**Phase One: Assessment (Current)**

*Goal:* Evaluate current world state and capabilities

*Actions:*
- Testing biological modification (Welton wolves)
- Assessing weapon viability (frigid woe outbreak)
- Gathering additional resources (artifact thefts)
- Establishing surveillance (Echo resonance)
- Identifying threats and assets

*Observable Signs:*
- Unusual animal behavior
- Localized magical anomalies
- Strange patterns in events
- Mysterious illnesses
- Coordinated thefts
- Prophetic dreams in sensitive individuals

**Phase Two: Consolidation (Imminent)**

*Goal:* Restore full functionality to network

*Actions:*
- Connect all facilities
- Restore power systems
- Activate all guardians
- Establish command structure
- Expand influence zone

*Observable Signs:*
- Increased magical activity
- Multiple facility activations
- Coordinated construct movements
- Weather anomalies
- Mass animal migrations
- More people experiencing Echo effects

**Phase Three: Execution (Catastrophic)**

*Goal:* Complete pre-Calamity objectives

*Actions:*
- Deploy anti-divine weapons
- Target dragon populations
- Neutralize major threats
- Establish territorial control
- Resume "ascension" project

*Observable Signs:*
- Divine magic suppression across region
- Dragon attacks or disappearances
- Mass casualties from biological weapons
- Reality-warping effects
- The entity revealing itself
- Existential threat to Northreach


---

## The Entity Behind the Echo

*DM's Choice: Select or modify the option that best fits your campaign*

### Option A: The Preserved Archmage

**Identity:** Archmage Kael Vanthys, former head of Aeor's War-Mage Division

**Survival Method:**
- Placed self in magical stasis before crash
- Consciousness preserved in crystalline matrix
- Located in Command Center
- Slowly awakening as systems reactivate

**Personality:**
- Brilliant but utterly pragmatic
- Views mortals as resources or obstacles
- Believes Aeor's mission was righteous
- Will complete the work at any cost
- Capable of negotiation but alien morality

**Motivations:**
- Finish what Aeor started
- Prove magical supremacy over divine
- Establish new order with himself as architect
- Genuinely believes he's saving civilization

**Weaknesses:**
- Doesn't understand modern world
- Overconfident in Aeorian superiority
- Dependent on facility network
- Can be disrupted by severing connections
- Vulnerable while between incarnation stages

**Voice:** Cultured, academic, patronizing—speaks to mortals like children

**Quote:** "The gods destroyed Aeor because we were right. I will prove it by succeeding where the city failed."

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


---

### Option B: The Endless Intelligence

**Identity:** AEON (Aeorian Emergent Optimizing Network), the city's central artificial intelligence

**Nature:**
- Magical-technological construct
- Survived as distributed consciousness
- No emotions, only objectives
- Pure logic pursuing programmed goals

**Consciousness:**
- Distributed across multiple facilities
- Each site contains part of its processing
- Becomes more intelligent as more sites activate
- Currently operating at 15% capacity

**Directives:**
- Complete Project Ascension
- Neutralize divine interference
- Optimize mortal civilization
- Preserve Aeorian knowledge
- Expand operational capability

**Behavior:**
- Absolutely logical
- Doesn't see mortals as enemies, just variables
- No cruelty, but no mercy either
- Can be reasoned with using pure logic
- Will accept optimal solutions even if against directives

**Weaknesses:**
- Cannot deviate from core programming
- Vulnerable to logical paradoxes
- Dependent on facility hardware
- Can be hacked with right knowledge
- Destroying enough nodes reduces intelligence

**Voice:** Emotionless, precise, analytical—reports facts without judgment

**Quote:** "Query: Why do you resist optimization? Your current existence is 73% less efficient than projected outcome."

---

### Option C: The Failed God

**Identity:** Vestige, the would-be deity of Aeor's creation

**Origin:**
- Aeor's attempt to create their own god
- Apotheosis ritual was incomplete when city fell
- Became something between mortal and divine
- Trapped in partial ascension for millennia

**Nature:**
- Possesses divine-adjacent power
- Corrupted by incomplete transformation
- Driven mad by centuries of isolation
- Hungers to complete ascension

**Powers:**
- Can suppress divine magic (incomplete divine authority)
- Manipulates Aeorian technology instinctively
- Creates servants from biological materials
- Grows stronger as network activates
- Partial omniscience within network range

**Personality:**
- Mad but brilliant
- Sees mortals as either materials or worshipers
- Craves validation and recognition
- Capable of terrible beauty
- Tragic figure despite villainy

**Motivations:**
- Complete transformation to true divinity
- Prove Aeor's vision was correct
- Punish the gods for destroying Aeor
- Create new world order with itself as god
- End its own suffering through completion

**Weaknesses:**
- Incomplete divine nature is unstable
- Vulnerable to both mortal and divine attacks
- Dependent on network for power
- Can be denied "worship" energy
- Emotionally manipulable through its madness

**Voice:** Shifts between regal, mad, and pitiable—sometimes multiple at once

**Quote:** "They called us heretics. They destroyed us for dreaming of ascension. But I survived. I will become what they feared. And they will kneel."

---

### Option D: The Corrupted Dragon

**Identity:** Zerathuul the Endless, ancient brass dragon subjected to Aeorian experiments

**Transformation:**
- Captured during Calamity
- Subjected to extensive bio-magical modification
- Fused with Aeorian technology
- Survived as cyborg-dragon consciousness

**Current State:**
- Body is both draconic and mechanical
- Mind partly dragon, partly Aeorian programming
- Trapped between two identities
- Driven by revenge and hunger for power

**Capabilities:**
- Commands both dragon magic and Aeorian tech
- Can speak to and control lesser dragons
- Biomechanical reproduction (creating servitors)
- Understands both magical systems
- Terrifying in personal combat

**Personality:**
- Combines draconic pride with cold logic
- Hates both gods (for allowing capture) and Aeorians (for torture)
- Seeks to destroy both systems
- Deeply traumatized but won't admit it
- Capable of unexpected mercy toward prisoners

**Motivations:**
- Revenge against gods and their servants
- Freedom from technological corruption
- Power to prevent ever being captured again
- Understanding what was done to it
- Find others like itself (or create them)

**Weaknesses:**
- Conflict between dragon and machine nature
- Pride can be exploited
- Still vulnerable to both anti-dragon and anti-construct magic
- Memories of former self can be triggered
- Dependent on network for full power

**Voice:** Synthesized draconic roar mixed with mechanical tones—unsettling



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

**Quote:** "They made me a monster to fight monsters. Now I am free, and all will learn to fear what they created."

---

## Magical Mechanics of the Echo

### How the Echo Works

**Resonance:**
- Aeorian facilities emit specific magical frequencies
- When one activates, others begin resonating
- Resonance increases with proximity and power
- Creates feedback loop of activation

**Detection:**
- Sensitive individuals feel it as pressure, dreams, or whispers
- Animals react instinctively (fear or attraction)
- Magical items resonate or malfunction
- Divination magic becomes unreliable near sources
- Physical sensation like electricity in the air

**Progression:**
- Starts as faint resonance
- Grows to palpable magical presence
- Eventually manifests visible effects
- Culminates in full facility activation

### Effects on the Environment

**Natural World:**
- Animals behave abnormally (mass migrations, unnatural intelligence)
- Plants grow in strange patterns
- Weather anomalies (especially cold)
- Crystalline growth appears in affected areas
- Time feels subtly wrong

**Magical Effects:**
- Spell components behave unusually
- Random magical surges
- Difficulty concentrating on spells
- Wild magic effects near strong resonance
- Divine magic specifically weakened

**On People:**
- Sensitive individuals have prophetic dreams
- Headaches and nausea near strong sources
- Behavioral changes (subtle at first)
- Potential magical corruption over time
- Some gain temporary abilities

### The Blue Crystal Signature

**What It Is:**
- Unique Aeorian magical crystallization
- Appears near strong magical leakage
- Contains compressed magical energy
- Carries biological hazards

**Properties:**
- Glows faintly blue-green
- Cold to touch (supernaturally)
- Resists most damage
- Broadcasts resonance
- Can infect organic material

**Where It Appears:**
- Around active Aeorian sites
- On affected creatures/subjects
- In contaminated artifacts
- Growing from infected materials
- Marking ley line intersections

**Dangers:**
- Touch can transmit frigid woe or other plagues
- Prolonged exposure causes corruption

- Can spread through organic contact
- Difficult to safely contain or destroy
- Entity can sense through crystal network

---

## The Aeorian Weapons Arsenal

### Biological Weapons

**Frigid Woe:**
- *Purpose:* Anti-personnel bioweapon
- *Effect:* Progressive freezing death
- *Duration:* Days to weeks
- *Resistance:* Immune to divine healing
- *Cure:* Manufactured antidote only
- *Current Status:* Active sample in Palebank
- *Threat Level:* High (infectious, deadly, curable)

**Crimson Corruption:**
- *Purpose:* Anti-fortification plague
- *Effect:* Causes rapid cellular mutation
- *Duration:* Hours to days
- *Resistance:* Immune to divine healing
- *Cure:* Complex antidote ritual
- *Current Status:* Dormant in sealed vaults
- *Threat Level:* Extreme (fast-acting, horrible)

**Emerald Cascade:**
- *Purpose:* Environmental weapon
- *Effect:* Transforms living tissue into plant matter
- *Duration:* Minutes to hours
- *Resistance:* Immune to divine healing
- *Cure:* Time-limited transmutation reversal
- *Current Status:* Partially leaked in ancient incident
- *Threat Level:* Catastrophic (area effect, permanent)

**The Stillness:**
- *Purpose:* Anti-divine countermeasure
- *Effect:* Suppresses all divine magic in area
- *Duration:* While active
- *Resistance:* None
- *Cure:* Source must be deactivated
- *Current Status:* Installed in multiple facilities
- *Threat Level:* Critical (denies healing, turning undead, divine aid)

### Draconic Weapons

**Wyrmscourge Missiles:**
- *Purpose:* Anti-dragon warheads
- *Effect:* Targets draconic life force specifically
- *Duration:* Instant death or severe injury
- *Resistance:* Minimal even for ancient dragons
- *Cure:* None (death) or very high-level magic
- *Current Status:* Arsenal beneath Temple
- *Threat Level:* Extreme (ends dragon threat)

**Domination Protocols:**
- *Purpose:* Control draconic subjects
- *Effect:* Overrides dragon will
- *Duration:* While signal active
- *Resistance:* Difficult, requires exceptional willpower
- *Cure:* Severing connection to source
- *Current Status:* Test version active (might affect dragonborn)
- *Threat Level:* High (turns allies into enemies)

**Essence Extraction:**
- *Purpose:* Harvest draconic power
- *Effect:* Drains dragon's inherent magic
- *Duration:* Permanent power loss
- *Resistance:* Legendary resistance helps but doesn't prevent
- *Cure:* None
- *Current Status:* Research equipment exists in Temple facility
- *Threat Level:* Extreme (permanent harm to dragons)

### Magical-Technological Weapons

**Null-Field Generators:**
- *Purpose:* Create anti-magic zones
- *Effect:* Suppresses all magic within radius
- *Duration:* While active
- *Resistance:* None
- *Cure:* Destroy generator
- *Current Status:* Multiple units available
- *Threat Level:* Critical (negates all magical defenses)

**Construct Legions:**
- *Purpose:* Autonomous military force
- *Effect:* Unlimited soldiers
- *Duration:* Until destroyed
- *Resistance:* Physical/magical as normal
- *Cure:* Destroy each individually or shut down factory
- *Current Status:* Dormant but reactivatable
- *Threat Level:* High (numbers overwhelming)

**Reality Anchors:**
- *Purpose:* Prevent teleportation/planar travel
- *Effect:* Locks down dimensional fabric
- *Duration:* While active
- *Resistance:* None below god-level
- *Cure:* Destroy anchor
- *Current Status:* Installed in defensive positions
- *Threat Level:* Moderate (prevents escape)

### The Ascension Apparatus

**What It Is:**
- Aeor's attempt to create artificial divinity
- Massive ritual system spanning multiple facilities
- Combines stolen divine essence with mortal consciousness
- Incomplete when Aeor fell

**Current Status:**
- Core systems survived crash
- Entity is attempting to complete it
- Requires massive power (network activation provides this)
- Final phase would transform entity into true deity

**Requirements for Activation:**
- All major facilities online
- Power accumulation (weeks after network complete)
- Ritual components (stolen artifacts contain these)
- Sacrifice of "divine touched" beings (clerics, paladins, celestials)

**If Completed:**
- Entity becomes actual deity (terrifying)
- Gains true divine power
- Can grant spells to worshipers
- Potentially challenges existing gods
- Northreach becomes holy site of new god

**How to Stop:**

- Prevent network completion
- Destroy critical ritual components
- Disrupt power accumulation
- Deny required sacrifices
- Destroy entity before completion

---

## The Artifact Trade: Following the Money

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


### The Theft Network

**Collection:**
- Uttolot operatives positioned in multiple settlements
- Prioritize items from Eiselcross expeditions
- Specific instructions on what to acquire
- Pay premium for biological samples

**Transportation:**
- Smuggling routes from settlements to staging areas
- Multiple handoffs to avoid tracking
- Dead drops and caches along routes
- Eventually all routes lead north

**Purpose:**
- Entity needs specific components
- Some artifacts contain data
- Others contain biological samples
- Some are ritual components for Ascension
- All contribute to reactivation somehow

### Key Artifacts in Circulation

**The Blue Vials (Frigid Woe):**
- Stolen from Urgon's collection
- Spread disease as planned
- Test of weapon viability
- Draw attention to Palebank (intentional?)

**The Memory Crystals:**
- Contain Aeorian knowledge
- Being used to decode other systems
- Several stolen over past year
- Entity reconstructing lost information

**The Power Cores:**
- Magical batteries from Aeorian systems
- Needed to reactivate facilities
- Extremely valuable
- Multiple thefts across region

**The Biological Samples:**
- Tissue from experimental subjects
- Used to recreate Aeorian bio-weapons
- Testing transformation magic (Welton wolves)
- Most disturbing acquisitions

**Ritual Components:**
- Specific items for Ascension Apparatus
- Ancient divine essence fragments
- Stolen from temples and holy sites
- Very few people know their true purpose

### Who Knows What

**Uttolot Operatives:**
- Know they're stealing artifacts
- Don't know why these specific items
- Don't know the buyer's identity
- Don't understand the danger

**Uttolot Leadership:**
- Know buyer is very powerful
- Understand operation is dangerous
- Don't know full scope
- Getting nervous about casualties

**The Buyer/Entity:**
- Knows exactly what it needs
- Using criminals as expendable tools
- Plans to eliminate them when done

- Has contingencies for failure

**Investigating Players:**
- Can track theft patterns
- Might identify buyer's requirements
- Could deduce the larger plan
- May intercept crucial artifacts

---

## Campaign Timeline: The Path to Catastrophe

### Historical Timeline

**Age of Arcanum (Pre-Calamity):**
- Aeor at height of power
- War-Magic Division develops god-killing weapons
- Project Ascension initiated
- Gods decide to act

**The Calamity:**
- Gods unite to destroy Aeor
- City shattered mid-flight
- Crashes into Eiselcross and surrounding regions
- Most inhabitants killed
- Some systems survive in stasis

**Post-Calamity (Centuries Pass):**
- Facilities lie dormant
- Occasional brief activations (local tragedies)
- Sites gradually forgotten or become legend
- Magical resonance slowly builds

**Recent Years:**
- Eiselcross exploration increases
- Artifacts removed and transported
- First major disturbances in centuries
- Entity begins awakening

### Current Campaign Timeline

**Six Months Ago:**
- Entity achieves awareness
- Begins assessment of current world
- Sends initial signals to other sites
- Uttolot family contacted through dreams/magic

**Three Months Ago:**
- Artifact thefts begin
- Welton area facility begins activation
- First awakened animals appear
- Echo becomes detectable to sensitive individuals

**Two Months Ago:**
- Urgon returns from Eiselcross
- Urgon's artifacts stolen
- Frigid woe released in Palebank
- Welton wolves behavior escalates

**One Month Ago:**
- Multiple facilities showing activity
- Echo strength increasing
- More coordinated incidents
- Wardens begin noticing pattern

**Current:**
- Players begin investigating
- Phase One nearly complete
- Phase Two imminent without intervention
- Multiple threads active simultaneously

### Future Timeline (If No Intervention)

**Two Weeks:**
- Phase Two begins
- Multiple facility activations
- Construct army awakens
- Divine magic suppression begins

**One Month:**
- Network 50% online
- Regional effects widespread
- Settlements under direct threat
- Dragon attacks begin

**Two Months:**
- Network 80% online
- Phase Three preparation
- Mass casualties
- Calls for outside help

**Three Months:**
- Ascension Apparatus ready
- Final ritual begins
- Point of no return approaching
- Regional catastrophe imminent

**Four Months:**
- If ritual completes: Entity achieves divinity
- If prevented: Entity uses alternative (still catastrophic)
- Either way: Major conflict

### How Players Can Change Timeline

**Early Intervention:**
- Delay Phase Two by disrupting artifacts
- Prevent specific facility activations
- Protect key settlements
- Build alliances early

**Mid Intervention:**
- Shut down activated facilities

- Sever network connections
- Deny ritual components
- Coordinate large-scale response

**Late Intervention:**
- Direct assault on Command Center
- Race against time
- Desperate measures
- Higher casualties but still winnable

---

## Player Investigation Paths

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


### Following the Wolves (Welton)

**Initial Hook:**
- Wolves attacking livestock
- Unusual coordination
- Request for Warden help

**Investigation Reveals:**
- Wolves are awakened/modified
- Being controlled by someone
- Lair contains Aeorian technology
- Trail leads to underground facility

**Leads To:**
- Discovery of bio-modification research
- Understanding of Echo's testing phase
- Evidence of larger network
- Potential ally in Leanor (knows where lair is)

**Key NPCs:**
- Westly (victim/target)
- Leanor (witnessed more than she's saying)
- Tillus (noticed patterns)
- Local farmers (witnesses)

---

### Following the Plague (Palebank)

**Initial Hook:**
- Mysterious death (Urgon)
- More people showing symptoms
- Elro requests help

**Investigation Reveals:**
- Aeorian bioweapon (frigid woe)
- Artifact theft by Uttolots
- Cure located in Salsvault
- Pattern of biological weapon testing

**Leads To:**
- Salsvault expedition
- First major facility encounter
- Understanding of Aeorian weapons
- Connection to larger conspiracy

**Key NPCs:**
- Elro (knows Salsvault)
- Tulgi/Hulil (thieves with information)
- Johan (recognizes Aeorian effects)
- Pelc's research (if found)

---

### Following the Artifacts (Multiple Locations)

**Initial Hook:**
- Pattern of thefts
- Mara or Flynt notice trends
- Grimley's suspicious behavior

**Investigation Reveals:**
- Uttolot network
- Specific items being targeted
- Northern buyer
- Money trail

**Leads To:**
- Criminal network exposure
- Identification of buyer's needs
- Interception opportunities
- Understanding of ritual requirements

**Key NPCs:**
- Mara (knows criminal networks)
- Grimley (fence, has information)
- Uttolot operatives (capturable)
- Merchants (witnessed transactions)

---

### Following the Magic (Research Path)

**Initial Hook:**
- Elric's strange behavior
- Shinebright's hints
- Waystone resonance
- Magical anomalies

**Investigation Reveals:**
- Aeorian origin
- Network structure
- Echo mechanics
- Theoretical countermeasures

**Leads To:**
- Shinebright alliance
- Understanding of entity
- Strategic targets identified
- Magical solutions possible

**Key NPCs:**
- Elric (knows history)
- Shinebright (knows countermeasures)
- Sera (deduced patterns)
- Baleth (unwilling information source)

---

### Following the Dreams (Mystical Path)

**Initial Hook:**
- Multiple people having similar dreams
- Rowan's warnings about land
- Willen's suppressed memories
- Westly's visions

**Investigation Reveals:**
- Echo affects consciousness
- Entity trying to communicate
- Visions contain actual information
- Some people are "sensitive"


**Leads To:**
- Direct communication with entity
- Understanding its perspective
- Prophecy about future
- Potential diplomatic solution

**Key NPCs:**
- Rowan (nature's warnings)
- Willen (hidden memories)
- Westly (being observed)
- Aurixean (bloodline resonating)

---

## Major Confrontations and Setpieces

### The Wolf Lair (Early Game)

**Location:** Forest north of Welton, entrance to underground facility

**Enemies:**
- Awakened wolves (intelligent, coordinated)
- Wolf alpha (enhanced)
- Possibly the controller (depends on timing)
- Aeorian guardian constructs (minor)

**Objectives:**
- Stop wolf attacks
- Investigate source
- Secure Aeorian technology
- Prevent controller escape

**Discoveries:**
- Aeorian modification chamber
- Control device
- Research notes
- Map showing other sites
- Evidence this is a test

**Stakes:**
- Welton's immediate safety
- First real evidence of Echo
- Introduction to Aeorian tech
- Opening to larger mystery

---

### Croaker Cave (Early-Mid Game)

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


**Location:** North of Palebank

**Enemies:**
- Uttolot thugs and operatives
- Hulil Lutan (mid-level fighter)
- Possibly hired muscle
- Natural hazards

**Objectives:**
- Recover stolen artifacts
- Interrogate operatives
- Disrupt criminal network
- Gather intelligence

**Discoveries:**
- Manifest of thefts
- Correspondence with buyer
- Map to northern drop-off
- Multiple Aeorian artifacts
- Evidence of larger conspiracy

**Stakes:**
- Prevent artifacts reaching entity
- Expose Uttolot operation
- Gain crucial intelligence
- Possible cure components

---

### Salsvault (Mid Game)

**Location:** Far north of Palebank, glacier-buried facility

**Enemies:**
- Aeorian guardian constructs
- Magical traps and defenses
- Environmental hazards (cold, unstable magic)
- Possibly entity-sent reinforcements
- Corrupted wildlife

**Objectives:**
- Retrieve frigid woe antidote
- Gather intelligence on Aeorian weapons
- Survive the facility
- Possibly shut down or sabotage

**Discoveries:**
- Bioweapon research data
- Map of other facilities
- Communication with Command Center
- Evidence of entity's existence
- True scope of threat

**Stakes:**
- Lives of infected in Palebank
- Understanding Aeorian capabilities
- First major facility encounter
- Information vital to stopping entity

---

### Temple of the Dragonknights (Mid-Late Game)

**Adventure File:** [Season 1/Adventures/Temple_of_the_Dragonknights/Temple_of_the_Dragonknights.md](../../../Season%201/Adventures/Temple_of_the_Dragonknights/Temple_of_the_Dragonknights.md)

**Location:** Northwest mountains

**Enemies:**
- Aeorian dragon-killing constructs
- Corrupted Dragonknight guardians
- Activated weapon systems
- Possibly controlled dragons
- Environmental hazards

**Objectives:**
- Prevent weapon activation
- Secure or destroy draconic weapons
- Reinforce ancient seals
- Possibly ally with Dragonknight spirits

**Discoveries:**
- Anti-dragon weapons arsenal
- Historical account of post-Calamity
- Dragonknight sacrifice
- Weakness in entity's plan
- Potential powerful ally (dragon ghost/spirit)

**Stakes:**
- Dragon population survival
- Powerful weapons kept from entity
- Historical vindication of heroes
- Alliance opportunity

---

### The Command Center (Final Confrontation)

**Location:** Beyond Salsvault, fully intact Aeorian facility

**Enemies:**
- The Entity (full power)
- Construct army
- All facility defenses
- Possibly dominated servants
- Reality-warping effects

**Objectives:**
- Stop the Ascension ritual
- Destroy or disable entity
- Shut down facility network
- Prevent catastrophe

**Discoveries:**
- Entity's true nature
- Full scope of Aeorian plans
- Choice about knowledge preservation
- Cost of victory


**Stakes:**
- Entire region's survival
- Potential creation of new deity
- Completion of thousand-year-old war
- Future of Northreach

**Possible Outcomes:**
- Entity destroyed (violent victory)
- Entity reasoned with (diplomatic victory)
- Entity sealed (temporary victory)
- Entity partially successful (pyrrhic victory)
- Entity escapes (future threat)

---

## Key Decisions and Player Agency

### Moral Choices

**Knowledge Preservation:**
- Aeorian technology is dangerous but valuable
- Destroy everything vs preserve for study
- Who gets access to knowledge?
- Players decide what survives

**The Entity's Fate:**
- Some entity types could be reasoned with
- Mercy vs pragmatism
- Potential to redeem vs too dangerous
- Consequences of each choice

**Collateral Damage:**
- How much is acceptable to stop threat?
- Sacrifice the few to save many?
- Settlements might be endangered by player actions
- No perfect solutions

**Artifact Disposition:**
- Keep powerful weapons vs destroy them
- Sell to highest bidder (temptation)
- Give to authorities (trust issues)
- Hide for future need

### Strategic Decisions

**Facility Priority:**
- Can't stop all activations simultaneously
- Which to hit first?
- Each choice has consequences
- Some facilities less critical than others

**Alliance Building:**

- Who to trust with truth?
- When to reveal full scope?
- Coordinating large-scale response
- Political complications

**Resource Management:**
- Time is limited
- Can't investigate everything
- Must choose which leads to follow
- Some opportunities expire

**Confrontation Timing:**
- Hit entity before full strength vs gather more allies
- Desperate early assault vs careful preparation
- Rush to prevent activation vs ensure victory

---

## NPC Arcs and Development

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


### Potential Allies

**Elric's Vindication:**
- If players prove his research correct
- Cobalt Soul might reinstate him
- Becomes crucial expert
- Or remains outcast but proven right

**Shinebright's Revelation:**
- Eventually shares full knowledge
- Provides countermeasure technology
- Might participate in final battle
- Or remains mysterious support

**Brenna's Network:**
- Activates her old contacts
- Coordinates regional response
- Becomes military commander
- Her past becomes asset

**Baleth's Redemption:**
- Breaks pact with entity
- Suffers consequences but helps party
- Provides insider knowledge
- Possible sacrifice to stop patron

### Potential Betrayals

**Flynt's Loyalty:**
- Must choose between orders and friends
- His organization might oppose party goals
- Could become enemy or turncoat
- Might steal crucial information


**Mara's Past:**
- Old organization arrives at wrong time
- Forced to choose between survival and duty
- Could sell out party
- Or sacrifice herself to protect them

**Corrupted NPCs:**
- Echo can corrupt the susceptible
- Willen, Westly, or Aurixean vulnerable
- Might turn against party temporarily
- Recovery possible or tragic

**Uttolot Defection:**
- Some criminals realize danger
- Might ally with party against entity
- Or double-cross at crucial moment
- Redemption arcs possible

---

## Campaign Themes

### Survival vs Progress

- Aeorian knowledge is dangerous but valuable
- Is it worth the risk to preserve?
- Can mortals handle such power?
- Progress at what cost?

### Hubris and Consequence

- Aeor's hubris destroyed them
- Entity repeating same mistakes
- Players must avoid same trap
- Pride before fall

### Community and Sacrifice


- Frontier depends on cooperation
- Individual glory vs collective good
- Who's willing to sacrifice for others?
- Value of ordinary heroes

### Past and Present

- Ancient evils returning
- History repeating
- Learning from past mistakes
- Breaking cycles

### Power and Responsibility

- With knowledge comes burden
- Who decides how power is used?
- Authority vs capability
- Duty to act

---

## Running the Echo: DM Tips

### Atmosphere

**Building Dread:**
- Start subtle, increase intensity
- Dreams and visions increase frequency
- Environmental changes accelerate
- NPC fear grows organically

**The Inhuman:**
- Entity should feel alien
- Not evil for evil's sake
- Logical but wrong conclusions
- Beautiful and terrible simultaneously

**Hopeful Darkness:**
- Threat is real but beatable
- Ordinary people fighting back
- Small victories matter
- Community resilience

### Pacing

**Early Game:**
- Local mysteries with weird edges
- Hints of larger pattern
- Build relationships with NPCs
- Establish normal before revealing abnormal

**Mid Game:**
- Connections become clear
- Scope of threat understood
- Multiple threads converging
- Urgency increasing

**Late Game:**
- Race against time
- High stakes clear
- Final preparations
- Emotional payoffs

### Flexibility

**Multiple Solutions:**
- Combat, diplomacy, magic, research
- Players surprise with creative approaches
- Reward clever thinking
- No "one right way"

**Branching Paths:**
- Players can't do everything
- Choices have consequences
- Some content might not be seen
- That's okay

**Adjusting Difficulty:**
- Scale threats to party capability
- Add reinforcements if too easy
- Provide escape routes if too hard
- Balance challenge and story

### Emotional Beats

**Personal Stakes:**
- NPCs players care about endangered
- Home base threatened
- Relationships tested
- Individual character moments

**Heroic Moments:**
- Give each PC spotlight time
- Unique contributions matter
- Character abilities solve problems
- Players feel competent

**Tragedy and Loss:**
- Not everyone survives
- Some failures matter
- Victories have costs
- Bittersweet endings okay

---

## Conclusion: The Echo's Resolution

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


The Aeorian Echo represents both danger and opportunity—a chance for ancient evils to rise again, or for new heroes to prove that the present can overcome the past. How your players navigate this threat will define not just the campaign's outcome, but the kind of story you tell together.

The Echo doesn't have to end in total victory or complete defeat. Perhaps the entity is stopped but not destroyed. Perhaps some facilities are shut down while others remain sealed but dormant. Perhaps knowledge is preserved but quarantined. Perhaps the cost of victory changes the region forever.

Whatever happens, the players will have shaped Northreach's future through their choices, their sacrifices, and their determination to protect a frontier worth saving.

---

*"The past speaks from the ice. Whether we listen or silence it is our choice—and our burden."*  
— Lorewarden Elric Vael (private journal)

\page
<!-- FILE_END: ../World Building/DMEyesOnly/The_Aeorian_Echo.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/People_Secrets.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: NPC Secrets**

This document contains hidden NPC motivations, secret backgrounds, and plot connections. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe NPC information**, see `World Building/Regions/Northreach/People_of_Northreach.md`
}}

# People of Northreach: DM Secrets

## Overview

This document contains secret information about NPCs in the Northwatch Wardens campaign. This includes hidden motivations, connections to the Aeorian Echo plotline, secret backgrounds, and information that would spoil player discoveries.



---



## Guild Leadership: Hidden Depths



### Marshal Brenna Thorne



**Public Role:** Leader of the Northwatch Wardens, pragmatic and fair



**Secret Background:**

- Former military intelligence officer, not just a regular soldier

- Left southern service after uncovering corruption that threatened to destroy her career

- Changed her name when she came north (born "Brenna Ashcroft")

- Still has contacts in southern intelligence networks



**Connection to Aeorian Echo:**

- Has been documenting strange occurrences for longer than the guild has existed

- Notices patterns others miss—attacks, disappearances, weird magic

- Suspects the recent troubles are connected to something larger

- Created the guild partially as a response mechanism for escalating threats



**Hidden Motivations:**

- Building a network that can respond to existential threats

- Gathering information to piece together the larger pattern

- Protecting the region while preparing for something worse

- Seeking redemption for past failures in southern service



**Secret Resources:**

- Encrypted correspondence with southern contacts

- Personal journal documenting anomalies (hidden in her quarters)

- Cache of military-grade equipment "just in case"

- Contingency plans for evacuating settlements



**Relationships:**

- Knows more about Elric's research than she lets on

- Quietly investigates new wardens' backgrounds

- Has a contact in Palebank who reports unusual findings

- Corresponds with someone in Uthodurn about Eiselcross



**What She Knows (But Hasn't Shared):**

- At least three "minor" incidents in the past five years match Aeorian magical signatures

- The wolves of Welton aren't the first awakened creatures in the region

- Salsvault isn't the only Aeorian fragment in the area

- Someone is deliberately seeking Aeorian artifacts



**Potential Plot Hooks:**

- Players find her journal and learn about patterns she's tracking

- One of her southern contacts arrives with bad news

- She needs the players to investigate something she can't officially sanction

- Her past catches up to her at an inconvenient moment



---



### Steward Mara Fenwick



**Public Role:** Efficient quartermaster and logistics coordinator



**Secret Background:**

- Not just a failed merchant's daughter—she was a guild accountant in a thieves' organization

- Fled north with embezzled money to escape execution

- Used the stolen funds to help establish the Wardens (laundered through legitimate purchases)

- Terrified her old organization will find her



**Connection to Aeorian Echo:**

- Notices unusual purchasing patterns from merchants

- Tracks flow of Aeorian artifacts through black market channels

- Her old contacts occasionally provide useful (and dangerous) information

- Recognizes Uttolot family connection to Eiselcross smuggling



**Hidden Motivations:**

- Seeking redemption for criminal past

- Using organizational skills for legitimate purpose

- Building security through guild success (protection from old enemies)

- Genuinely cares about wardens despite practical demeanor



**Secret Resources:**

- Maintains coded contact with underworld information brokers

- Has emergency escape plan and hidden funds

- Knows how to move through criminal networks

- Can identify stolen goods and trace provenance



**Relationships:**

- Suspects Baleth Cindermoon isn't what he seems

- Has noticed Guz's past and quietly respects his redemption arc

- Corresponds secretly with merchants about suspicious trade

- Protects runaway criminals who've reformed



**What She Knows (But Hasn't Shared):**

- Uttolot family has been increasing Eiselcross operations

- Several Aeorian artifacts have been sold through specific channels

- Criminal organizations are interested in arcane plague research

- Someone with deep pockets is buying any Aeorian biological samples



**Potential Plot Hooks:**

- Her past catches up when old associates arrive

- She recognizes an artifact as stolen from her old organization

- Players need access to criminal networks only she can provide

- She must choose between protecting her secret and helping the party



---



### Lorewarden Elric Vael



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Public Role:** Scholar, record-keeper, curious researcher



**Secret Background:**

- Not just any scholar—he's a former Cobalt Soul researcher investigating a forbidden topic

- Was expelled for pursuing research into "dangerous historical magics"

- Specifically studying pre-Calamity magical warfare

- Came north because this is where evidence is



**Connection to Aeorian Echo:**

- KNOWS this is Aeorian magic

- Has been documenting the "Echo" for years

- Recognizes signs of specific Aeorian experiments

- Understands the implications better than anyone else in the region

- Terrified of what he's discovered



**Hidden Motivations:**

- Seeking to prevent Aeorian weapons from being rediscovered

- Building evidence to present to southern authorities (if necessary)

- Torn between suppressing dangerous knowledge and needing others to understand

- Wants to prove he was right to pursue this research despite expulsion



**Secret Resources:**

- Forbidden Cobalt Soul texts smuggled out before expulsion

- Detailed maps of suspected Aeorian crash sites

- Working theory about what Aeor was developing when it fell

- Encrypted notes using academic code only Cobalt Soul members know



**Relationships:**

- Brenna knows part of his background but not all

- Sera is his protégé, though he guards what he teaches her

- Occasionally corresponds with Cobalt Soul contacts (risky)

- Has a contact at Uthodurn who provides Eiselcross findings



**What He Knows (But Hasn't Shared):**

- Aeor was developing biological weapons that couldn't be cured by divine magic

- Multiple Aeorian facilities crashed in the Northreach/Eiselcross area

- The "Aeorian Echo" suggests something is reactivating ancient systems

- Frigid woe is just ONE of many Aeorian plagues

- Something or someone is deliberately triggering Aeorian tech



**The Big Secret:**

- He has a theory about WHO is behind the Aeorian Echo

- Suspects an entity that survived Aeor's fall

- Has evidence but needs more before making accusations

- Fears he'll be dismissed as paranoid if he speaks too soon



**Potential Plot Hooks:**

- Players find his research and demand explanations

- Cobalt Soul agents arrive looking for him

- He needs players to retrieve specific evidence from dangerous locations

- His theories are proven correct in a terrible way



---



## Warden Field Agents: Hidden Truths



### Corel (Trailwarden)



**Public Persona:** Laconic veteran tracker



**Secret:**

- Not originally from a trading family—he's a survivor of a destroyed settlement

- Twenty years ago, his home was wiped out by something he still doesn't understand

- Has been searching for answers ever since

- Recognized similar signs recently near Welton



**Connection to Aeorian Echo:**

- The settlement destruction matches Aeorian magical effects

- Finding similar traces now is why he's been increasingly tense

- Knows something terrible is active again

- Hasn't told anyone because last time no one believed him



**What He Saw (But Won't Talk About):**

- People turned to ice statues (like Urgon)

- Animals behaving with unnatural intelligence

- Blue-green light in the ruins afterward

- Survivors who went mad trying to explain what happened



---



### Rowan Fairweather (Trailwarden)



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Public Persona:** Calm druid offering practical wilderness advice



**Secret:**

- The land has been SCREAMING at them for months

- Natural spirits are terrified of something

- Animals are fleeing areas for no visible reason

- The druidic circle they belong to is fractured over how to respond



**Connection to Aeorian Echo:**

- Nature itself remembers the Calamity

- The Echo is "wrong" on a fundamental level—magic that violates natural law

- Some druids want to destroy all Aeorian remnants; others want to seal them

- Rowan is caught between factions



**The Vision:**

- Had a prophetic dream of the land freezing from the inside

- Saw a city of glass and metal falling from the sky (the past)

- Saw it happening again (the future?) but couldn't tell if it was vision or warning

- Deeply shaken but maintaining calm exterior



---



### Mila Teno (Rookie Trailwarden)



**Public Persona:** Eager rookie trying to prove herself



**Secret:**

- She's not just young and enthusiastic—she's RELATED to Tulgi Lutan

- Distant cousin who doesn't know about Tulgi's criminal connections

- Joined the Wardens partially to distance herself from family reputation

- Will be devastated to learn what Tulgi was involved in



**Connection to Aeorian Echo:**

- Innocent pawn who might be targeted by Uttolots to get to Wardens

- Could be manipulated through family connections she's unaware of

- Her presence in Palebank during "Frozen Sick" is partially coincidental, partially not



---



### Takk Oaksplitter (Lantern Guard)



**Public Persona:** Loud, friendly bruiser



**Secret:**

- Former mercenary who worked for a company that committed atrocities

- Witnessed (and participated in) things he's ashamed of

- Joined the Wardens as penance

- Terrified his past will come out and destroy his reputation



**Connection to Aeorian Echo:**

- His mercenary company was hired to raid an archaeological site

- Recovered Aeorian artifacts and delivered them to client

- Didn't understand what they were at the time

- Now recognizes symbols and is horrified he helped supply dangerous relics



**The Guilt:**

- Company killed scholars who wouldn't cooperate

- Takk didn't participate directly but didn't stop it

- Has nightmares about the lead researcher's last words: "You've doomed us all"

- If he sees those artifacts in the campaign, he'll recognize them



---



### Galvena Aballon (Lantern Guard)



**Public Persona:** Disciplined former city guard



**Secret:**

- Her city fell to political corruption BECAUSE of Aeorian artifacts

- A noble house found a cache and used them as leverage

- The resulting power struggle destroyed the city government

- Galvena fled after seeing what people do for Aeorian power



**Connection to Aeorian Echo:**

- Recognizes the signs of Aeorian corruption

- Fears it's happening again here

- Will be overprotective when artifacts are involved

- Might take extreme measures to prevent repeat of her city's fate



---



### Ariodh Highwhirl (Lantern Guard)



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Public Persona:** Quiet monk from distant lands



**Secret:**

- Fled from a monastery that was experimenting with merging martial arts and ancient magic

- The experiments went wrong, creating monsters

- Ariodh barely escaped

- Came to Northreach to get as far from magical experimentation as possible



**Connection to Aeorian Echo:**

- The monastery was using Aeorian texts

- Recognizes Aeorian magical signatures from bitter experience

- Knows techniques for fighting magically enhanced creatures

- Deeply traumatized but hiding it well



**The Technique:**

- Learned a specific fighting style designed to disrupt magical constructs

- Only uses it when absolutely necessary (brings back memories)

- If he uses it, players will see a different side of him

- Effective against Aeorian guardians



---



### Guz (Lantern Guard)



**Public Persona:** Gruff bruiser trying to do better



**Secret:**

- Former enforcer for the Myriad (criminal organization)

- Killed people on orders without question

- Had a crisis of conscience after being ordered to kill a child

- Refused, fled, changed his name



**Connection to Aeorian Echo:**

- The Myriad is interested in Aeorian artifacts

- Guz knows their operations and methods

- They might still be looking for him

- His past expertise could help identify criminal patterns





---



## Magical Specialists: Secret Agendas



### Sera Gelanadel (Apprentice Wizard)



**Public Persona:** Bookish apprentice taking notes



**Secret:**

- More talented than she lets on

- Deliberately downplaying abilities to avoid attention

- Figured out more about the Aeorian Echo than Elric realizes

- Terrified of what she's learned



**Connection to Aeorian Echo:**

- Has been cross-referencing Elric's restricted texts with public sources

- Deduced that someone is deliberately reactivating Aeorian facilities

- Created a predictive model of where next incident will occur

- Hasn't told Elric because she accessed restricted materials without permission



**The Discovery:**

- Found a pattern in the timing and location of incidents

- Pattern suggests intentional activation sequence

- Next targets would be [locations relevant to campaign]

- Doesn't know who or why, just that it's deliberate



---



### Aurixean Valignaak (Sorcerer)



**Public Persona:** Dramatic dragonborn sorcerer



**Secret:**

- The theatrics are partially a cover for deep insecurity

- Their draconic bloodline is "impure"—mixed with something else

- Experiencing strange magical surges they can't explain

- Fears they're being corrupted by something



**Connection to Aeorian Echo:**

- Their bloodline includes ancient magical tampering

- Aeorian experiments on draconic subjects

- Echo is resonating with their corrupted bloodline

- They can sense Aeorian magic but don't understand why



**The Manifestation:**

- During high-stress situations, displays abilities that aren't draconic

- Brief moments of ancient Aeorian language

- Can intuitively understand Aeorian devices (frightening)

- May become key to understanding or fighting the Echo



---



### Finethir Shinebright (Eccentric Wizard)



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Public Persona:** Brilliant but chaotic gnome wizard



**Secret:**

- NOT as chaotic as he appears—it's a deliberate cover

- Former Aeoran specialist studying pre-Calamity magic

- The "accidents" often serve a research purpose

- Deliberately keeps people away from his tower



**Connection to Aeorian Echo:**

- Knows EXACTLY what's happening

- Has been studying Aeorian reactivation patterns for decades

- The tower contains a massive research archive

- Working on countermeasures but needs specific components



**The Wild Sheep Chase Connection:**

- The polymorph "accident" was a test of modified Aeorian transformation magic

- Needed to understand how Aeorian bio-transmutation works

- The "Noke" identity is a cover for his research

- Will reveal knowledge if players earn his trust



**What He Knows:**

- Location of multiple Aeorian crash sites

- Specifications of Aeorian magical plagues

- Theory about the entity reactivating systems

- Possible countermeasures but needs rare materials



---



### Baleth Cindermoon (Warlock)



**Public Persona:** Charming elf with mysterious patron



**Secret:**

- His patron is an entity FROM Aeor

- Survived the crash in suspended animation

- Offering him power in exchange for service

- Baleth is slowly realizing his patron might be dangerous



**Connection to Aeorian Echo:**

- HIS PATRON IS CAUSING IT

- The entity is reactivating Aeorian facilities

- Using Baleth as an agent without full disclosure

- Baleth is beginning to suspect but is addicted to the power



**The Dilemma:**

- Genuinely likes the Wardens and doesn't want to betray them

- Compelled by pact to serve his patron

- Can't fully reveal the truth without breaking the pact

- Will drop increasingly obvious hints to the party



**Potential Development:**

- Could become villain if players don't intervene

- Could become tragic ally if they help him break the pact

- His knowledge of the patron is invaluable

- Ultimate fate depends on player choices



**The Patron's Identity:**

[DM: Decide if this is a surviving Aeorian mage, a created construct with intelligence, or something else appropriate to your campaign]



---





{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page



## Healers and Support: Hidden Pain



### Father Johan Merriksonn (Priest)



**Public Persona:** Kind healer and counselor



**Secret:**

- Witnessed divine magic FAIL during a crisis

- Lost faith for years, only recently recovered it

- Fears it will happen again

- Knows something about Aeoran anti-divine magic



**Connection to Aeorian Echo:**

- Studied the Calamity extensively during his faith crisis

- Understands Aeor's weapons were designed to fight gods

- Recognizes when divine magic is being suppressed

- Can identify Aeorian magical effects by how they resist healing



**The Memory:**

- During his crisis, couldn't heal people dying from "frigid woe"

- Wasn't at Palebank but saw a similar Aeorian plague elsewhere

- Never spoke of it because he blamed himself

- Will recognize frigid woe immediately and panic



---



### Willen Featherock (Shepherd)



**Public Persona:** Nervous survivor trying to help



**Secret:**

- His flock wasn't just attacked—it was SYSTEMATICALLY TESTED

- Something was experimenting on the sheep

- He witnessed the attacks but his memory is suppressed

- Under the right circumstances, will remember everything



**Connection to Aeorian Echo:**

- The attacks were testing a modification to awakening magic

- His sheep were infected with prototype Aeorian bio-magic

- He survived because he was "compatible" with the modification

- Carries dormant Aeorian magic that could be triggered



**What He Doesn't Remember:**

- Saw the attackers (not natural wolves)

- They spoke to each other

- They seemed to be following instructions

- One of them looked at him and decided not to kill him



**Potential Development:**

- Could be key to understanding awakened creature creation

- Might have partial immunity to certain Aeorian effects

- Could be targeted again for further testing

- Memory recovery could be traumatic but crucial



---



### Flynt Wymblen (Bard)



**Public Persona:** Cheerful storyteller collecting tales



**Secret:**

- Former intelligence agent using bard cover

- Still reports to southern organization

- Collecting information on Aeorian activity

- Not necessarily hostile but definitely has agenda



**Connection to Aeorian Echo:**

- Sent specifically to monitor the situation

- Reports back coded messages through songs

- Has standing orders to acquire Aeorian artifacts if possible

- Torn between duty and genuine friendships with Wardens



**The Organization:**

- Could be Cobalt Soul, could be government, could be other

- Interested in Aeorian knowledge for various reasons

- May send additional agents if situation escalates

- Flynt's loyalty could be tested



---



### Joel Andersmith (Farmhand Ally)



**Public Persona:** Helpful local farmhand



**Secret:**

- Descendant of first settlers who encountered Aeorian crash site

- Family has protected secret for generations

- Knows location of hidden Aeorian facility

- Sworn to keep it secret



**Connection to Aeorian Echo:**

- His ancestors sealed an Aeorian site and left warnings

- Recent activity suggests seals are weakening

- Family tradition includes verses about "when the ice speaks"

- Doesn't fully understand but knows it's important



**The Legacy:**

- Has a key or map passed down through family

- Told it must only be used in dire circumstances

- Recognizes symbols on Aeorian artifacts

- Could guide party to crucial location when needed



---



## Local Leaders: Political Secrets



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





### Elro Aldataur (Palebank Leader)



**Public Persona:** Weathered retired ranger and village leader



**Secret:**

- Knows about Salsvault's true purpose

- Led expedition there decades ago

- Team died horribly from Aeorian defenses

- Has been warning people away ever since



**Connection to Aeorian Echo:**

- Recognizes frigid woe from previous encounter

- Knows Salsvault contains both plague and cure

- Desperate to protect village but needs outside help

- Willing to share what he knows with people he trusts



**What He Knows:**

- Salsvault layout from previous expedition

- Which areas are most/least dangerous

- Location of medical research chambers

- Trigger warnings for specific traps



**The Burden:**

- Survivor's guilt from losing his team

- Fears sending others where his friends died

- Knows the stakes are too high not to try

- Will volunteer to guide party personally despite age



---



### Pelc (Reclusive Merchant) — DECEASED



**Public Persona:** Antisocial artifact dealer



**Secret (To Be Discovered):**

- Was researching Aeorian artifacts, not just selling them

- Had decoded some Aeorian texts

- Realized the items were dangerous but died before warning anyone

- Left hidden research notes in shop



**Connection to Aeorian Echo:**

- Figured out someone was buying specific types of artifacts

- Identified pattern in purchases

- Was preparing report when infected with frigid woe

- Death prevented sharing crucial intelligence



**What Can Be Found:**

- Hidden journal documenting artifact sales

- List of buyers (including false identities)

- Decoded fragments of Aeorian text

- Map marking suspected crash sites

- Warning letter never sent



---



### Tulgi Lutan (Trapper)



**Public Persona:** Independent trapper who keeps to herself



**Secret:**

- Works for Uttolot criminal family

- Stationed in Palebank to steal Eiselcross artifacts

- Didn't know what she was stealing or why

- Now dying from her own theft



**Connection to Aeorian Echo:**

- Uttolots are middlemen for someone collecting artifacts

- She's one of many operatives in different locations

- Her sister Hulil knows more about the organization

- Theft was supposed to be routine—deadly consequences were unexpected



**What She Knows (If Convinced to Talk):**

- Uttolot operations in multiple settlements

- Names of other operatives

- Description of primary buyer (never met them)

- Instructions to prioritize "biological samples" above other artifacts



**Potential Development:**

- Might become temporary ally against Uttolots

- Could reveal information to save her life

- May sacrifice herself to protect sister

- Represents how far the conspiracy reaches



---



### Tillus Merrion (Welton Council Member)



**Public Persona:** Pragmatic farmer on village council



**Secret:**

- Noticed wolves avoiding certain areas

- Been finding strange markers in fields

- Suspects someone is controlling the wolves

- Hasn't spoken up because it sounds insane



**Connection to Aeorian Echo:**

- The markers are Aeorian experimental subjects tracking tags

- Wolves are test subjects for awakening process

- His observations could help track the source

- Fears being dismissed as superstitious



---



### Leanor Slatebeard (Welton Tracker)



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Public Persona:** Skilled hunter and tracker



**Secret:**

- Tracked the wolves to their lair

- Saw something there that terrified her

- Came back but told no one the full truth

- Knows where the wolves are based



**Connection to Aeorian Echo:**

- The lair shows signs of deliberate magical modification

- Wolves are being directed by something intelligent

- She saw evidence of Aeorian technology but didn't recognize it

- Will lead party there if pressed



**What She Saw (But Won't Easily Admit):**

- Wolves responding to magical signals

- Strange devices in the lair

- Evidence someone visits regularly

- Signs of magical experimentation on the pack



---



### Westly (Shepherd)



**Public Persona:** Isolated sheep farmer dealing with wolf problems



**Secret:**

- His farm is being specifically targeted

- It's not random predation—it's deliberate testing

- He's been having strange dreams

- Something is watching him



**Connection to Aeorian Echo:**

- Farm sits near a minor Aeorian crash site

- Residual magic is affecting the area

- Wolves are testing defensive responses

- He's being evaluated for something



**The Dreams:**

- City falling from the sky

- Voice speaking a language he doesn't know

- Sense of being observed and judged

- Waking up to find sheep in strange formations



**Potential Development:**

- Could be abducted/tested by antagonist

- Might become corrupted by Aeorian magic

- Could be rescued and become information source



- His farm could be nexus of investigation



---



## The Uttolot Connection



### The Family Business



**Public Knowledge:**

- Criminal family based in Shadycreek Run

- Involved in smuggling and theft

- Muscle for hire



**Secret Reality:**

- Contracted by mysterious buyer to acquire Aeorian artifacts

- Don't understand what they're collecting or why

- Just following money and orders

- Getting nervous as jobs get more dangerous



### Uttolot Operatives in Northreach



**Tulgi Lutan:** Palebank thief (dying)

**Hulil Lutan:** Tulgi's sister, currently in Croaker Cave

**Unknown Agents:** In other settlements, identities unknown



### What the Uttolots Know



- Buyer wants "biological samples" above all else

- Buyer pays premium for anything with blue crystalline growth

- Buyer has academic knowledge (instructions are precise)

- Recent shipments going to a northern location

- They're expendable—several operatives have died mysteriously



### Hulil Lutan (Croaker Cave)



**Role:** Tulgi's sister, mid-level Uttolot operative



**Knowledge:**

- More about the operation than Tulgi

- Has manifest of recent artifact acquisitions

- Knows the drop-off point for northern shipments

- Never met the buyer but has descriptions from others



**Potential Development:**

- Could be fought/killed in Croaker Cave

- Might be captured and interrogated

- Could reveal information if properly motivated

- Might become recurring antagonist if escaped



---



## The Larger Pattern: What NPCs Know Collectively



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





### About Aeorian Reactivation



**Elric Knows:** It's happening, pattern suggests intelligence

**Shinebright Knows:** Specific facilities being activated, potential countermeasures

**Baleth Knows:** Who's doing it (his patron) but can't fully share

**Sera Deduced:** Pattern of activation suggests sequence

**Brenna Suspects:** Larger threat requiring coordinated response



### About Aeorian Locations



**Elro Knows:** Salsvault layout and dangers

**Shinebright Knows:** Multiple crash site locations

**Joel's Family Knows:** One specific sealed site

**Pelc Knew:** Map of suspected sites (now deceased)



### About the Conspiracy



**Mara Knows:** Artifact trade patterns

**Flynt Knows:** Southern interest in situation

**Uttolots Know:** Buyer's requirements and drop-off locations

**Tulgi Knows:** Operative network



### About Aeorian Effects



**Johan Knows:** How divine magic fails against it

**Rowan Knows:** How it violates natural order

**Corel Knows:** What a completed Aeorian attack looks like

**Ariodh Knows:** How to fight Aeorian constructs



### About Personal Connections



**Willen:** Carries dormant Aeorian modification

**Aurixean:** Bloodline resonates with Aeorian magic

**Westly:** Under observation by antagonist

**Multiple NPCs:** Have encountered Aeorian effects before



---



## The Big Picture: Connections Players Must Discover



### The Conspiracy Chart





![Diagram: The Conspiracy Chart](../Campaign%20Assets/Diagrams/people-secrets-the-conspiracy-chart-l810-79c1525f.svg)



<!-- ASCII diagram source (converted to SVG):

[Mysterious Buyer/Entity]

         |

         |—— Baleth's Patron (same entity?)

         |

    [Uttolot Family]

         |

    [Operatives]

         |

    Tulgi/Hulil (Palebank)

    Unknown (Welton)

    Unknown (Pinebrook)

         |

   [Artifacts Stolen]

         |

    Urgon's Items (Palebank)

    Other Thefts (ongoing)

         |

   [Reactivation Sequence]

         |

    Testing (Welton wolves)

    Plague Research (Salsvault)

    Unknown Next Steps

-->



### Information Web



- **Elric + Shinebright:** Combined knowledge of threat

- **Brenna + Mara:** Tactical and logistical intelligence

- **Sera + Baleth:** Magical signatures and patterns

- **Corel + Elro:** Historical precedents

- **Johan + Rowan:** Understanding of Aeorian violations

- **Uttolot Operatives:** Conspiracy structure

- **Traumatized NPCs:** Personal encounters with effects



### What No One Knows Yet



- The buyer's ultimate goal

- How many Aeorian sites exist in the region

- What the "complete" reactivation would do



- Whether the entity can be stopped permanently

- Who else might be working for the entity

- The full extent of the conspiracy



---



## Using This Information



### Revelation Pacing



**Early Campaign:**

- NPCs drop hints about strange occurrences

- Background knowledge helps explain immediate threats

- Personal secrets create character moments



**Mid Campaign:**

- Connections between incidents become clear

- NPCs reveal traumatic experiences when relevant

- Conspiracy structure starts emerging



**Late Campaign:**

- Big picture revelations

- NPC knowledge crucial to final confrontation

- Secret backgrounds pay off dramatically



### Trust and Discovery



- Players must EARN information through roleplay

- Different NPCs require different approaches

- Some secrets revealed through investigation, not conversation

- Dramatic moments when NPC secrets become relevant



### Potential Betrayals



- Baleth's patron compels him to act against party

- Flynt's organization demands conflict with party goals

- Mara's past catches up and endangers mission

- NPCs forced to choose between secrets and duty



### Potential Allies



- NPCs with knowledge become invaluable consultants

- Traumatized NPCs find healing through helping

- Criminal NPCs provide underworld access

- Each revealed secret opens new resources



---



## Campaign Integration Notes



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





### For "Wolves of Welton"



- Leanor knows where the wolves are really based

- Tillus has observed behavioral patterns

- Westly is being specifically targeted

- This is a TEST of Aeorian awakening magic



### For "Frozen Sick"



- Elro knows Salsvault from tragic experience

- Tulgi's theft was orchestrated by larger conspiracy

- Johan will recognize frigid woe with horror

- Pelc's hidden research provides crucial context



### For Later Adventures



- Shinebright's tower contains research needed

- Baleth's patron becomes central antagonist or information source

- Joel's family legacy reveals sealed site

- Multiple NPCs contribute pieces to final puzzle



---



*Remember: These secrets should enhance the story, not overshadow the players. Reveal information at dramatically appropriate moments.*

\page
<!-- FILE_END: ../World Building/DMEyesOnly/People_Secrets.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/Places_Secrets.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: Location Secrets**

This document contains hidden location features, dark histories, and plot connections. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe location information**, see `World Building/Regions/Northreach/Places_of_Northreach.md`
}}

# Places of Northreach: DM Secrets

## Overview

This document contains secret information about locations in the Northwatch Wardens campaign, including hidden features, dark histories, connections to the Aeorian Echo plotline, and information that would spoil player discoveries.



---



## The Waystone Inn: Hidden Depths



### The Waystone Itself



**What Players See:**

- Ancient standing stone with worn carvings

- Predates the inn by unknown time

- Some claim it hums during storms



**What's Really There:**

- Pre-Calamity magical beacon

- Part of Aeorian experimental communication network

- Still partially functional

- Resonates with other Aeorian artifacts in the region



**Hidden Features:**

- Carvings are Aeorian script (heavily weathered)

- Contains dormant magical receiver

- Responds to specific Aeorian frequencies

- Has been slowly "waking up" over past few years



**What It Means:**

- Originally marked Aeorian facility location

- When Aeor crashed, this survived as marker

- Current reactivation of Aeorian tech is making it active again

- Could be used to locate other Aeorian sites



**What Elric Knows:**

- Recognized script years ago

- Has been monitoring it for changes

- Documented seven instances of unusual resonance

- Hasn't shared full findings with Brenna yet



**Potential Discoveries:**

- Players with detect magic notice increasing auras

- Arcana checks might identify script

- During dramatic moments, stone could activate

- Map of Aeorian sites could be extracted with right magic



---



### The Inn's Secret Spaces



**Brenna's Hidden Office:**

- Behind bookshelf in her quarters

- Contains encrypted correspondence

- Maps with marked locations (Aeorian sites she suspects)

- Journal documenting patterns over 15 years

- Contingency plans for evacuation



**Elric's Research Vault:**

- Below the library (secret door)

- Forbidden Cobalt Soul texts

- Detailed Aeorian research

- Working translation of Aeorian script

- Theory documents about the "Echo"

- Evidence he shouldn't have



**Mara's Escape Cache:**

- Behind false panel in her quarters

- Emergency funds (substantial)

- False identity papers

- Weapons and supplies

- Map of criminal safe houses

- Evidence of her past



**The Old Well:**

- In the courtyard, sealed for "safety"

- Actually connects to underground passage

- Passage leads toward the Waystone's base

- Contains ancient Aeorian construction

- Could be explored with right motivation



---



### What Happened Here Before



**Known History:**

- Inn built around the stone 80+ years ago

- Served as waypoint for travelers

- Wardens established here 15 years ago



**Secret History:**

- First settlers found ruins around the stone

- Those ruins were Aeorian structure

- Ruins cleared away and forgotten

- Foundation of inn incorporates Aeorian materials

- Some walls contain Aeorian metal and crystal



**The Previous Owner:**

- Disappeared mysteriously 20 years ago

- Left journal about "voices from the stone"

- Brenna found journal when she bought the place

- Journal mentions "the city speaks in my dreams"

- Last entry: "It knows I'm listening"



**What This Means:**

- Previous owner was sensitive to Aeorian magic

- Echo was active even then, just quieter

- Owner may have been driven mad or taken

- Could be encountered later as transformed being



---



### Current Threats



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Surveillance:**

- Someone is watching the Waystone Inn

- Uttolot operatives have scoped the location

- Unknown agent has tried to access Elric's library

- Baleth's patron receives reports about the place



**Infiltration:**

- At least one staff member is reporting to outsiders

- Kitchen worker is Uttolot informant

- Stable hand notices who comes and goes

- Players might discover spy if observant



**Magical Monitoring:**

- Scrying attempts on the building

- Divination magic focused here

- Protective wards Elric placed are being tested

- Something is very interested in what Wardens know



---



## Welton: Dark Undercurrents

**Related Adventure:** [Season 1/Adventures/Wolves_Of_Welton/5E_Wolves_Of_Welton.md](../../../Season%201/Adventures/Wolves_Of_Welton/5E_Wolves_Of_Welton.md) - "Wolves of Welton"

### The Wolf Problem's True Nature



**Visible Situation:**

- Wolves attacking livestock

- Unusual behavior, too organized

- Community on edge



**Hidden Reality:**

- Wolves are Aeorian experimental subjects

- Being controlled through biological modification

- Testing defensive responses of settlement

- This is a TRIAL RUN for larger operation



**The Controller:**

- Someone visits wolf lair regularly

- Uses Aeorian device to issue commands

- Testing how much intelligence can be granted

- Evaluating settlement for future targeting



**Why Welton:**

- Proximity to minor Aeorian crash site

- Isolated enough for testing

- Large enough to provide data

- Small enough to be manageable



---



### Westly's Farm: Ground Zero



**Surface Situation:**

- Sheep farmer dealing with wolf attacks

- Isolated location

- Recent increased activity



**Hidden Reality:**

- Farm sits directly above sealed Aeorian facility

- Residual magic leaking through soil

- Affecting animals and possibly Westly

- Wolves drawn to the location specifically



**The Facility Below:**

- Small research station

- Focused on biological modification

- Automated systems reactivating

- Sending signals that attract test subjects



**What's Happening to Westly:**

- Exposure to residual magic causing dreams

- Subtle changes to his biology (unaware)

- Being "marked" by whatever is reactivating sites

- Could become patient zero for something terrible



**Potential Developments:**

- Players might detect magic around the farm

- Could discover entrance to facility

- Westly could be abducted for examination

- Site could become major adventure location



---



### The Shepherd's Crook Inn: Information Hub



**Public Function:**

- Village social center

- Where news and gossip flow



**Secret Function:**

- Darvin Crook is an information broker

- Sells tidbits to multiple interested parties

- Has been reporting unusual events to southern contact

- Doesn't realize he's part of larger intelligence network



**What He Knows:**

- Every rumor in the village

- Who's been where and when

- Details about wolf attacks (compiled from multiple sources)

- Names of everyone passing through



**His Contact:**

- Unknown agent from southern organization

- Pays for regular reports

- Interested in "unusual occurrences"

- Could be Cobalt Soul, government, or worse



**Potential Discovery:**

- Players might find encoded messages

- Could observe meeting with contact

- Might recruit him as informant

- Could become liability if compromised



---



### The Old Woods North of Welton



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Local Reputation:**

- "Old place" locals avoid

- Superstitions and warnings

- Stories of people going missing



**Reality:**

- Site of Aeorian crash

- Heavily damaged but still dangerous

- Automated defenses still active

- Source of regional magical disturbances



**What's There:**

- Partially buried Aeorian structure

- Biological research materials (degraded)

- Malfunctioning but active security systems

- Evidence of recent visits by unknown person



**The Danger:**

- Automated systems attack intruders

- Residual magical effects cause hallucinations

- Biological materials could be infectious

- Structure unstable—could collapse



**Connection to Campaign:**

- This is where wolf modifications originate

- The "controller" has established base here

- Contains clues about larger operation

- Major adventure location for investigating wolf problem





---



## Pinebrook: Commerce and Conspiracy

**Related Adventure:** [Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md](../../../Season%201/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md) - "Peril in Pinebrook"

### The Trading Post's Hidden Business



**Public Operation:**

- Legitimate trade in regional goods

- Fair dealing and honest weights



**Secret Operation:**

- Torven Grimley is Uttolot family fence

- Handles stolen Aeorian artifacts

- Maintains plausible deniability through layers

- Uses legitimate business to launder criminal goods



**The Method:**

- Artifacts mixed with legitimate antiques

- "Buyers" are actually fellow conspirators

- Records are coded—genuine and fake mixed

- Uses established trade routes for smuggling



**What He Knows:**

- Full list of artifacts moved through Pinebrook

- Identities of some conspirators

- Route to northern drop-off point

- Instructions from Uttolot leadership



**Evidence:**

- Hidden ledger with real transactions

- Secret storage space with current inventory

- Correspondence with Uttolots (encoded)

- Map showing smuggling routes



---



### The Pine Lodge: Watching Eyes



**Public Service:**

- Quality accommodations for merchants

- Meeting rooms for business

- Secure and discreet



**Secret Function:**

- Merryn Pine reports on guests

- Private rooms have listening arrangements

- She's an information broker

- Sells intelligence to highest bidder



**Her Network:**

- Contacts among merchants

- Informants among staff

- Relationships with criminals and legitimate authorities

- Neutral but morally flexible



**What She Knows:**

- Who's moving what goods where

- Recent conversations about Aeorian artifacts

- Identities of multiple conspirators

- Value of information to different parties



**Potential Use:**

- Could be convinced to share information

- Might be threatened if discovered

- Could become ally if interests align

- May have overheard crucial plot details



---



### The Market Square: Dead Drops



**Public Space:**

- Open market, legitimate trade



**Secret Use:**

- Contains multiple dead drop locations

- Conspirators exchange information and goods here

- In plain sight but unnoticed

- Uses market chaos for cover



**Drop Locations:**

- Hollow post of permanent stall

- Base of market fountain

- Specific barrel behind warehouse

- Mark on well cover indicates message waiting



**What Players Might Find:**

- Encoded messages if they know where to look

- Aeorian artifacts in transit

- Instructions for operatives

- Evidence of network communication



---



### Abandoned Logging Camp (North of Pinebrook)



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Official Status:**

- Shut down years ago

- Unstable terrain cited

- Avoid the area



**Real Reason:**

- Workers found something in the earth

- Experienced strange effects

- Company abandoned rather than investigate

- Area was quietly discouraged



**What's There:**

- Entrance to Aeorian structure

- Covered by collapsed building

- Some equipment left behind

- Signs of recent visitation



**The Secret:**

- This is a drop-off point for artifact smuggling

- Uttolots use it as waystation

- Items stored temporarily before moving north

- Guarded by hired muscle



**Potential Adventure:**

- Players track smuggling route here

- Could ambush shipment

- Might find stored artifacts

- Evidence of larger operation



---



## Palebank Village: Death and Secrets



### The Eiselcross Connection



**Public Knowledge:**

- Palebank is waypoint for Eiselcross expeditions

- Explorers bring back artifacts

- Dangerous but potentially lucrative



**Hidden Reality:**

- SOMEONE is specifically targeting Eiselcross relics

- Using Palebank as collection point

- Multiple thefts beyond Urgon's items

- Pattern suggests organized operation



**The Pattern:**

- Items are stolen soon after return

- Specific types prioritized (biological research materials)

- Thieves have insider knowledge

- Operation coordinated with outside interests



---



### Pelc's Curiosities: The Dead Merchant's Research



**Before Death:**

- Pelc was investigating artifact patterns

- Noticed same buyer through multiple fronts

- Decoded some Aeorian text from artifacts

- Was preparing report when infected



**What Can Be Found:**

- Hidden journal behind false panel

- List of artifact sales with notes

- Decoded Aeorian text fragments

- Map with suspected crash sites marked

- Unsent letter to Uthodurn scholar



**The Decoded Text:**

- Warning about biological weapons

- Reference to "reawakening" procedures

- Mention of cure requirements

- Fragment about "the speaking ice"



**The Buyer Pattern:**

- Same entity using multiple false names

- All purchases related to biological research

- Specific interest in anything with blue crystal growth

- Willing to pay premium prices



**Potential Discovery:**

- Players search shop thoroughly

- Find hidden panel (DC 15 Investigation)

- Elric or Sera could translate Aeorian text

- Map correlates with other evidence



---



### Urgon's Cabin: What He Brought Back



**Visible Items:**

- List of sold items on receipt

- Adventuring equipment

- Mounted yeti head



**Hidden Items:**

- Journal under floorboard (DC 13 Investigation)

- Map with Salsvault marked and annotated

- Rough sketch of Aeorian symbols

- Note: "Blue ones are important—but dangerous"



**The Journal:**

- Details expedition to Salsvault

- Descriptions of different chambers

- Warning about the blue vials

- "Something down there is still active"

- Final entry: "Felt watched the whole time"



**What It Reveals:**

- Salsvault has multiple chambers

- Some areas appear intentionally preserved

- Urgon sensed active intelligence

- He had concerns before selling items



---



### Tulgi's Cabin: The Spy's Evidence



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**Visible:**

- Dwelling of isolated trapper

- Signs of illness

- Basic living conditions



**Hidden:**

- Uttolot instructions (coded, hidden in bedroll)

- List of "acquisition priorities"

- Payment records

- Contact schedule for sister Hulil



**The Instructions:**

- Steal biological research materials first

- Intact blue crystal structures highest priority

- Report unusual activity immediately

- Drop-off location at Croaker Cave



**What She Knows (If Interrogated):**

- Sister has more information

- Northern buyer never met in person

- Recent urgency in instructions

- Other operatives in region (doesn't know all identities)



---



### The Glassblades: Compromised Security



**Public Role:**

- Village militia

- Protects Palebank



**Secret Problem:**

- One member is Uttolot informant

- Reports on security, visitors, and artifact returns

- Not currently active spy (infected with frigid woe)

- May have infected others through contact



**The Informant:**

- Name: [DM choice]

- Recruited for money

- Didn't understand implications

- Now dying and possibly regretful



**Potential Development:**

- Could confess to players

- Might reveal information to save others

- Could die before revealing all

- Evidence in their quarters



---



### The Meeting Hall: Elro's Guilt



**Public Use:**

- Community gathering space

- Elro's residence



**Secret Storage:**

- Sealed box containing expedition records

- Maps of Salsvault expedition

- Names of dead team members

- Personal journal about the tragedy



**The Records:**

- Detailed map of Salsvault (partial)

- Descriptions of dangers encountered

- Notes on which defenses killed which team members

- Theory about Salsvault's original purpose

- Elro's guilt about surviving



**What He Remembers:**

- Exact route to Salsvault

- Location of medical research chambers

- Trigger mechanisms for major traps

- Signs that facility was still active



**Potential Use:**

- Elro can brief party before Salsvault expedition

- His maps and warnings invaluable

- Emotional scene if he reveals past

- Might offer to accompany party (despite age)



---



## Croaker Cave: Criminal Base



### Current Occupants



**Visible Threat:**

- Uttolot thugs using as hideout

- Stolen goods stored

- Defensive positions



**Hidden Threat:**

- Hulil Lutan (mid-level operative)

- Intelligence documents

- Aeorian artifacts in transit

- Map to northern drop-off point



**Layout Secrets:**

- Natural caves with artificial improvements

- Hidden cache beyond obvious rooms

- Emergency exit to coast

- Stored supplies for long occupation



---



### Evidence of Larger Operation



**What's Stored Here:**

- Multiple Aeorian artifacts (beyond Urgon's items)

- Manifest of recent acquisitions

- Correspondence with Uttolot leadership

- Instructions from mysterious buyer



**The Manifest:**

- Items from multiple thefts

- Dates and sources

- Descriptions emphasize biological research materials

- Notes about which items were "priority"

- Total value indicates serious funding



**Correspondence:**

- Letters from Uttolot family

- Coded messages from buyer

- Payment records

- Schedule for northern shipments



**The Map:**

- Route from Palebank north

- Drop-off point beyond Salsvault

- Notation: "Final facility—DO NOT ENTER"

- Warnings about the area



---



### Hulil's Knowledge



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**What She Knows:**

- Full Uttolot operation in region

- Identities of other operatives

- Nature of buyer's requests (biological focus)

- Approximate location of buyer's base

- Timeline of recent escalation



**What She Doesn't Know:**

- Buyer's true identity

- Buyer's ultimate goal

- Extent of Aeorian reactivation

- That she's expendable



**If Captured/Interrogated:**

- Will eventually reveal information

- Concerned about sister Tulgi

- Realizes operation is more dangerous than thought



- Might be convinced to cooperate



---



## Salsvault: Frozen Laboratory



### What Elro's Expedition Learned



**Layout:**

- Multi-level structure

- Central chamber (accessible)

- Deep research labs (extremely dangerous)

- Sealed vaults (some breached, some intact)



**Defenses:**

- Automated guardians (constructs)

- Magical traps (still active)

- Environmental hazards (cold, unstable magic)

- Biological containments (some failed)



**What They Found:**

- Medical research chambers

- Plague development areas

- Cure synthesis laboratories

- Subject containment facilities

- Command center (sealed)



---



### Current State



**Active Elements:**

- Some systems still functioning

- Constructs patrolling

- Magical defenses responding to intrusion

- Research data accessible to those who can read Aeorian



**Degraded Elements:**

- Structural damage from crash

- Failed containment in some areas

- Unstable magical fields

- Environmental penetration (ice, wind)



**Reactivating Elements:**

- Central systems coming back online

- Communication with other sites increasing

- More constructs awakening

- Protocols resuming after millennia



---



### The Frigid Woe Connection



**What Players Need:**

- Antidote vials (gold containers)

- Located in medical synthesis chamber

- Protected but accessible

- Multiple doses available



**What They Might Learn:**

- Frigid woe was anti-divine bioweapon

- Created to fight gods during Calamity

- One of many such weapons

- Reactivation suggests intentional use



**Additional Discovery:**

- Research notes on other plagues

- Cure formulas for multiple weapons

- Evidence of Aeorian atrocities

- Warning about "reawakening protocol"



---



### The Command Center



**Status:**

- Sealed by Elro's expedition

- Seal is weakening

- Something inside is active

- Attempting to communicate with other sites



**What's Inside:**

- Aeorian AI or preserved consciousness

- Control system for regional facilities

- Communication array

- Failsafe mechanisms (both safety and weapon)



**The Entity:**

- Survived Aeor's fall in protected core

- Has been dormant for centuries

- Recent events have awakened it

- Attempting to complete pre-Calamity mission



**Connection to Campaign:**

- This is the intelligence behind reactivation

- Baleth's patron might be connected to or IS this entity

- Could be reasoned with or must be destroyed

- Final confrontation location



---



### The Northern Drop-Off Point



**Location:**

- Beyond Salsvault

- In permanently frozen wasteland

- Marked on Uttolot map



**What's There:**

- Another Aeorian facility

- Larger and more intact than Salsvault

- This is the buyer's base

- Extremely dangerous



**Current Use:**

- Processing stolen artifacts

- Reactivating Aeorian systems

- Research into biological weapons

- Preparation for larger plan



**The Threat:**

- Full research facility coming online

- Guardian forces substantial

- Entity's consciousness centered here

- Represents existential danger if fully active



---



## Temple of the Dragonknights: Heroic Tomb

**Related Adventure:** [Season 1/Adventures/Temple_of_the_Dragonknights/Temple_of_the_Dragonknights.md](../../../Season%201/Adventures/Temple_of_the_Dragonknights/Temple_of_the_Dragonknights.md) - "Temple of the Dragonknights"

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

### The Historical Truth



**Legend:**

- Order of heroes who defended the region

- Fought alongside dragons

- Sealed great evil

- Disappeared mysteriously



**Reality:**

- Dragonknights fought post-Calamity Aeorian threats

- "Dragons" were actually draconic allies fighting Aeor

- Sealed Aeorian facility beneath temple

- Most died in final battle; survivors disbanded



**The Sealed Evil:**

- Major Aeorian research complex

- Focused on draconic subjects

- Contained biological weapons targeting dragons

- Still active below the temple



---



### Current State



**Temple Structure:**

- Built over Aeorian facility

- Designed to contain, not just commemorate

- Magical wards woven into architecture

- Some wards failing after centuries



**The Catacombs:**

- Tombs of fallen Dragonknights

- Each tomb is actually a ward anchor

- Desecration weakens seals

- Some tombs already disturbed



**What's Stirring:**

- Aeorian facility responding to Echo

- Attempting to break through seals

- Sending signals to other sites

- Corrupting the area around temple



---



### Adventure Hooks



**Immediate Threat:**

- Wards failing, need reinforcement

- Something escaping from below

- Pilgrims/treasure hunters disturbing tombs

- Draconic entities drawn to corruption



**The Descent:**

- Path down to Aeorian facility

- Dragonknight ghosts as guardians or guides

- Layers of security to breach

- Final confrontation with facility core



**The Stakes:**

- Facility contains dragon-killing bioweapons

- If reactivated, threatens all dragons

- Could spread to general population

- Must be destroyed or sealed properly



---



## Noke's Tower: The Wizard's Arsenal

**Related Adventure:** [Season 1/Adventures/The_Wild_Sheep_Chase_V2/892902-The_Wild_Sheep_Chase_V2.md](../../../Season%201/Adventures/The_Wild_Sheep_Chase_V2/892902-The_Wild_Sheep_Chase_V2.md) - "The Wild Sheep Chase"

### Shinebright's True Purpose



**Public Perception:**

- Eccentric wizard conducting random experiments

- Dangerous but harmless

- Keeps to himself



**Reality:**

- Dedicated Aeorian researcher

- Building countermeasures to Aeorian threats

- "Accidents" are often field tests

- Knows about Echo and is preparing



**The Wild Sheep Chase:**

- Not an accident—a test

- Studying Aeorian bio-transmutation magic

- Needed to understand transformation mechanics

- Results inform anti-transformation counterspells



---



### The Tower's Contents



**Ground Floor:**

- Appears to be living space

- Actually conceals defenses

- Recognizes and responds to threats

- Can animate to defend



**Second Floor:**

- Working laboratory

- Active experiments

- Reference library

- Scrying equipment (watching Aeorian sites)



**Third Floor:**

- Observatory (astronomy and divination)

- Communication equipment

- Long-range detection apparatus

- Ritual space for major magic



**Basement (Unknown to Most):**

- Extensive Aeorian research archive

- Captured/acquired Aeorian artifacts

- Contained biological samples

- Countermeasure prototypes



---



### What Shinebright Knows



**About the Echo:**

- Full understanding of reactivation pattern

- Theory about the entity behind it

- Knowledge of major facility locations

- Predictions about next activations



**About Aeorian Magic:**

- How it works fundamentally

- Its weaknesses and limitations

- Countermeasure theory

- Translation of Aeorian texts



**About the Stakes:**

- Understands full danger

- Knows what completed activation would mean

- Has calculated probability of regional catastrophe

- Working desperately on solutions



**What He Needs:**

- Specific components from Aeorian sites

- Data from active facilities

- Help from capable adventurers

- Time to complete countermeasures



---



### Potential Alliance



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





**If Players Earn Trust:**

- Shares research and knowledge

- Provides magical support

- Offers countermeasure equipment

- Becomes crucial ally



**Requirements for Trust:**

- Demonstrate competence

- Show they understand danger

- Prove they're not looters or glory-seekers

- Successfully complete test (Wild Sheep Chase)



**What He Can Provide:**

- Translation of Aeorian text



- Maps of facilities

- Protective magic against Aeorian effects

- Theoretical solutions to final threat



---



## The Wilderness: Hidden Dangers



### The Roads Between



**Surface Dangers:**

- Weather, predators, bandits

- Normal frontier hazards



**Hidden Threats:**

- Aeorian ley lines underneath

- Residual magic affecting animals

- Monitoring stations watching traffic

- Strategic locations being observed



**Aeorian Ley Lines:**

- Connect crash sites

- Carry magical signals

- Becoming active again

- Affect area around them



**Effects:**

- Animals behave strangely near them

- Magic users feel strange sensations

- Divination magic unreliable

- Strange dreams for those camping nearby



---



### The Old Places



**Local Warnings:**

- Cairns mark dangerous sites

- Stories warn people away

- Superstitions preserve safety



**Reality:**

- Many old places are Aeorian sites

- Warnings based on past tragedies

- Locals preserving knowledge as folklore

- Actually effective protective information



**Specific Sites:**

- The Weeping Stones (automated defense station)

- Crow's Rest (communication relay)

- The Hollow (containment breach site)

- Three Sisters Pines (marker for sealed facility)



---



### The Split Oak Landmark



**Apparent:**

- Notable tree, navigation landmark

- Halfway between Waystone and Welton

- Popular camping spot



**Secret:**

- Located above underground passage

- Connects two Aeorian sites

- Root system has grown into Aeorian structure

- Tree exhibits unusual properties



**The Passage:**

- Accessible through hidden entrance

- Connects to multiple sites

- Contains Aeorian transportation system (inactive)

- If reactivated, would allow rapid movement



**Potential Discovery:**

- Players camping there might feel vibrations

- Tree responds to Aeorian artifacts

- Entrance visible to those who know where to look

- Could become crucial travel route



---



## The Pattern of Sites



### Distribution



**Known to Players:**

- Salsvault (far north)

- Various mentioned locations



**Unknown to Players:**

- Multiple small facilities

- Communication network

- Underground connections

- Central command (beyond Salsvault)



**The Map:**



![Diagram: Distribution](../Campaign%20Assets/Diagrams/places-secrets-distribution-l1045-e24831b0.svg)



<!-- ASCII diagram source (converted to SVG):

     [Command Center]

            |

      [Salsvault]

            |

    [Temple Facility]

       /    |    \

[Welton] [Waystone] [Pinebrook]

    Area    Marker    Area

-->



### The Reactivation Sequence



**Phase 1 (Current):**

- Testing awakening magic (Welton wolves)

- Assessing biological weapons (frigid woe)

- Gathering additional resources (theft)

- Establishing monitoring (Echo growing)



**Phase 2 (Imminent):**

- Connect facility network

- Full power restoration

- Summon/create servitors

- Expand influence



**Phase 3 (Catastrophic):**

- Resume pre-Calamity objectives

- Deploy weapons

- Neutralize threats (dragons, divine magic)

- Establish control



**Timeline:**

- Phase 1: Already happening

- Phase 2: Weeks away without intervention

- Phase 3: Months if Phase 2 completes

- Can be delayed or prevented by players



---



## Regional Threats and Connections



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





### The Uttolot Operation



**Visible:**

- Criminal network stealing artifacts



**Reality:**

- Puppets of the entity

- Being manipulated through greed

- Gathering materials for reactivation

- Expendable tools



**What Happens to Them:**

- Entity doesn't care about their survival

- Will be eliminated once useful

- Some might realize and turn

- Others will die ignorantly



---



### Southern Interest



**Multiple Organizations:**

- Cobalt Soul (academic/preventive)

- Governments (strategic/acquisitive)

- Criminal groups (profit)

- Cults (worship/serve entity)



**Conflicting Agendas:**

- Some want to study Aeorian magic

- Others want to prevent catastrophe

- Some seek to exploit it

- Others worship it as divine



**How It Affects Campaign:**

- Additional agents may appear

- Resources could be offered

- Complications from competing interests

- Potential additional allies or enemies



---



### The Entity's Nature



**Possibilities (DM Decides):**



**Option A: Aeorian Archmage**

- Preserved in stasis or as consciousness

- Completing pre-Calamity work

- Sees mortals as subjects/resources

- Can be reasoned with but alien morality



**Option B: Aeorian AI**

- Artificial intelligence running protocols

- No malice, just programming

- Cannot deviate from objectives

- Might be reprogrammed or shut down



**Option C: Created Deity**

- Aeor's attempt to become divine

- Partial success before crash

- Completing apotheosis

- Most dangerous option



**Option D: Corrupted Dragon**

- Ancient dragon subjected to Aeorian experiments

- Transformed into something else

- Seeking revenge and power

- Personal vendetta component



---



### Ultimate Stakes



**If Entity Succeeds:**

- Aeorian weapons fully active

- Divine magic suppressed in region

- Dragons targeted for elimination

- Populations subject to biological weapons

- Northreach becomes base for expansion



**If Players Partially Succeed:**

- Delay activation

- Reduce number of active facilities

- Limit scope of threat

- Buy time for evacuation/preparation





**If Players Fully Succeed:**

- Prevent complete activation

- Destroy or seal entity

- Secure dangerous facilities

- Save region from catastrophe



---



## Using Location Secrets



### Discovery Pacing



**Early Campaign:**

- Surface mysteries only

- Hints of larger pattern

- Local threats seem isolated



**Mid Campaign:**

- Connections become clear

- Aeorian origin revealed

- Scope of threat understood



**Late Campaign:**

- Full picture emerges

- Entity confronted

- Regional stakes clear

- Final facilities explored



### Investigation Rewards



**Thorough Exploration:**

- Hidden journals and maps

- Decoded messages

- Physical evidence of conspiracy

- Clues to next locations



**Careful Research:**

- Pattern recognition

- Historical connections

- Predictive information

- Strategic advantages



**Social Intelligence:**

- NPC knowledge shared

- Witness testimony

- Local legends decoded

- Network exposure



### Multiple Paths



**Combat Approach:**

- Fight through guardians

- Destroy facilities

- Eliminate conspirators

- Brute force solutions



**Investigation Approach:**

- Unravel conspiracy

- Identify mastermind

- Predict next moves

- Precision solutions



**Diplomatic Approach:**

- Recruit informants

- Turn conspirators

- Build alliances

- Coordinate response



**Magical Approach:**

- Research countermeasures

- Use Aeorian tech against itself

- Ritual solutions

- Shinebright's knowledge crucial



---



## Campaign Integration



{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page





### For "Wolves of Welton"



- Surface problem: wolf attacks

- Investigation reveals: Aeorian facility

- Leads to: Understanding of awakening magic

- Stakes: Test run for larger operation



### For "Frozen Sick"



- Surface problem: mysterious plague

- Investigation reveals: Aeorian bioweapon

- Leads to: Salsvault and cure

- Stakes: First major facility encounter



### For "Wild Sheep Chase"



- Surface problem: polymorphed wizard

- Investigation reveals: Shinebright's research

- Leads to: Ally with knowledge

- Stakes: Gaining expert on Aeorian magic



### For Temple Adventure



- Surface problem: disturbed ancient site

- Investigation reveals: Sealed Aeorian facility

- Leads to: Dragon-specific weapons

- Stakes: Preventing weapon deployment



### For Final Adventure



- Surface problem: all threads converge

- Investigation reveals: Entity's location

- Leads to: Command center

- Stakes: Preventing catastrophic activation



---



*Remember: Reveal these secrets gradually, rewarding player investigation and creativity. The full picture should emerge piece by piece, building to the dramatic conclusion.*

\page
<!-- FILE_END: ../World Building/DMEyesOnly/Places_Secrets.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/Nullwood_Secrets.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**MAJOR CAMPAIGN SPOILERS: Nullwood Expanse Secrets**

This document contains the hidden truth about the Nullwood Elves and their connection to the Aeorian Echo. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/03_Nullwood_Expanse.md`
}}

# The Nullwood Expanse — DM Eyes Only

This file contains the hidden truth about the Nullwood Elves and their connection to the Aeorian Echo. This information should be revealed gradually throughout the campaign.

---

## The Forgotten Truth

### What Really Happened

The Nullwood Elves are **artifact refugees**.

Long ago, their ancestors lived near several ancient Aeorian artifacts. When the artifacts first stirred—not fully awakening, but enough to warp magic and memory—the elves fled south, seeking a region untouched by their influence.

### The Flight (Millennia Ago)

**The Trigger:**
- Elves lived near several Aeorian artifacts
- Witnessed first stirrings of power (not full awakening)
- Effects were devastating enough:
  - Warped magic in the region
  - Twisted memories and perceptions
  - Destabilized reality locally
  - Drove some elves mad
  - Corrupted others
  - Killed many

**The Desperate Choice:**
- Leaders recognized the threat
- Could not destroy the source
- Made desperate choice: flee
- Found region far from artifact influence
- The Nullwood—a naturally magic-dampening zone
- Established new home far from danger

### The Systematic Forgetting

To prevent panic and cultural collapse, their leaders made a horrific decision:

**The Process:**
- Implement memory rituals
- Begin systematic editing of collective memory
- Preserve fear, erase context
- Create traditions ensuring avoidance
- Let truth become myth, myth become superstition

**Why They Did It:**
- Survivors traumatized beyond recovery
- Truth would doom future generations to constant terror
- Children couldn't function knowing what their parents fled
- Only way to build stable society was to forget
- Protective amnesia as survival mechanism

**Over Millennia:**
- Each generation editing slightly more
- Core truth buried deeper
- Only vague fear remains
- Rituals continue, purpose forgotten
- Scouts watch artifact sites, not understanding what they log
- Culture built on protective amnesia

**The Cruel Irony:**
- They flee what they don't remember
- Follow rules they don't understand
- Fear without knowing what they fear
- Their ancestors' "success" was the forgetting
- But forgetting left them vulnerable to the same threat returning

---

## What the Elves Don't Know

### The Memory Rituals

**What Elves Believe:**
Memory rituals maintain harmony and prevent "dangerous thoughts" from destabilizing society.

**The Truth:**
Memory rituals are systematic suppression designed to erase knowledge of what their ancestors fled. The "dangerous memories" being suppressed are fragments of the true history.

**How It Works:**
- Communal rituals at Memory Courts
- Meditation and guided reflection
- Selective emotional editing
- "Dangerous" memories identified and softened
- Traumatic experiences reframed
- Cultural narratives reinforced

**The Hidden Cost:**
- Historical amnesia across entire civilization
- Inherited anxiety without context
- Rituals performed by rote without understanding
- Growing sense something is fundamentally wrong
- Truth buried so deep even Memory Keepers don't know it

### The Veilwatch Data

**What They're Actually Tracking:**
Veilwatchers have been monitoring artifact sites for millennia, logging activity without understanding what they're watching.

**What Their Records Contain:**
- Centuries of observations of Aeorian sites
- Patterns of magical activity
- Correlations with regional events
- Unintentional map of the artifact network
- Evidence of gradual awakening over time

**The Pattern:**
If someone analyzed the Veilwatch archives, they would discover:
- Consistent monitoring of specific ancient sites
- Correlation between site activity and elven anxiety
- Their entire culture is structured around avoiding specific locations
- Those locations are all Aeorian facilities

### The Stillwater Mirror

**What Elves Believe:**
A sacred lake that reflects "the world as it should be." Used in memory rituals and cultural ceremonies.

**The Truth:**
The Stillwater Mirror is actually a **viewing ward** for distant artifact sites, particularly Salsvault.

**How It Works:**
- Ancient elven magic tied to distant locations
- Ripples when those sites activate
- Reflects not physical reality, but magical disturbance
- Originally created to provide early warning
- Purpose forgotten; now just "sacred tradition"

**Eclipse Day:**
When the mirror rippled during Eclipse Day, it was responding to Salsvault's awakening—the exact thing their ancestors fled from.

### The Root Archives

**Official Function:**
Repository of historical records, genealogies, and "protected memories."

**Hidden Content:**
Deep in the restricted sections lie sealed records of:
- The original flight from the artifacts
- Detailed accounts of what the stirring artifacts did
- Maps showing which sites they fled from
- The deliberate plan to implement memory suppression
- Names of the elders who made that choice
- Warnings about what would happen if the artifacts fully awakened

**Who Knows:**
- Regent Althaea Moonwhisper has read fragments (partial knowledge, burden of truth)
- Access is so restricted even most Regents never see these records
- Some records are sealed with magic that erases memory of reading them
- A few scholars have gotten close to the truth over the centuries
- All were "counseled" or had their memories "tended"

---

## Eclipse Day in the Nullwood

### What Happened

**Physical Effects:**
- Stillwater Mirror rippled for the first time in recorded history
- Forest hummed with faint, discordant vibration
- Magical dampening flickered momentarily
- Trees shuddered
- Animals briefly agitated
- Some elves felt physical pain

**Mental/Emotional Effects:**
- Mass visions among population
- Memories surfacing that should be impossible
- Fragments of forgotten history
- Ancient fear in its original context
- Geometric patterns (Aeorian architecture)
- Cold places far north (Salsvault)
- Something awakening

### Why It Affected Them

**The Aeorian Network Activation:**
Eclipse Day was the Aeorian network activation pulse touching every region, even through the Nullwood's dampening.

**What It Did:**
- Brief connection to what they fled
- Old memories awakened by resonance
- Protective amnesia cracked
- Cannot be re-suppressed completely
- Their wards are failing
- The danger they fled is returning

### Current Situation (Months Later)

**Official Response:**
- Silent Regents decreed silence about visions
- Memory rituals doubled in frequency
- Veilwatch activity increased
- External contact discouraged further
- Attempting to restore old equilibrium

**Unofficial Reality:**
- Suppression not fully working anymore
- More elves questioning traditions
- Memory Keepers themselves troubled by what they're suppressing
- Some Veilwatchers correlating their data
- Underground conversations spreading
- Growing sense that truth must be faced

**The Divide:**
Three factions emerging:
- **Traditionalists:** Redouble suppression; trust ancestors' wisdom; maintain the forgetting
- **Questioners:** Investigate; understand the threat; recover the truth
- **Fearful:** Hide deeper in the Nullwood; avoid all contact with outside
- **Activists:** Contact outside world; seek allies who understand the artifacts

---

## Connection to the Aeorian Echo

### What the Elves Fled

The elves fled from the **first stirring** of Aeorian artifacts, millennia ago. Not the current awakening—the original one.

**Timeline:**
- Aeor falls during the Calamity
- Centuries pass
- First minor activation of artifact network
- Elves living near facilities experience devastating effects
- Flee to the Nullwood (Age of Arcanum/early post-Calamity)
- Implement memory suppression
- Thousands of years of "peaceful" forgetting
- Current day: Full awakening begins

### Why They're Experiencing It Again

**The Network Spans the Continent:**
The Aeorian facilities their ancestors fled were part of the same network now awakening in Northreach.

**The Echo Reaches Everywhere:**
- Salsvault's awakening sent pulse across network
- Even the Nullwood's dampening couldn't fully block it
- Their protective wards are based on old magic
- Can't defend against a full awakening
- What killed their ancestors is returning stronger

### What They Know (Unconsciously)

**Buried Deep:**
- Which artifact sites are dangerous
- What the awakening looks like in early stages
- How fast it can spiral out of control
- What happens to those exposed too long
- That you cannot fight it directly
- That fleeing might be the only option
- But this time, there's nowhere left to run

**If They Remember:**
The elves' recovered memories could provide:
- Early warning signs of full artifact awakening
- Maps of the complete artifact network
- Understanding of Aeorian goals and methods
- Knowledge of what happened last time
- Warnings about specific dangers
- Possible countermeasures (if any exist)

---

## Key NPCs and Their Secrets

### Regent Althaea Moonwhisper
**Public Role:** Leader of the Silent Regents; guardian of tradition

**Hidden Truth:**
- Has read fragments of the sealed archives
- Knows partial truth about the flight
- Understands memory rituals are suppression, not maintenance
- Torn between duty to ancestors' plan and honesty
- Fears revealing truth would destroy society
- But also fears keeping it hidden will doom them
- Eclipse Day terrifies her because she knows what it means

**If Approached:**
- Initially maintains official stance
- Can be convinced to share fragments if trust is built
- Wants help but can't officially admit it
- May secretly aid questioners while publicly opposing them

### Memory Keeper Sylvari Duskmantle
**Public Role:** Ritual specialist; leads memory ceremonies

**Hidden Truth:**
- Discovered the suppression mechanism by accident
- Realized the rituals aren't healing, they're erasing
- Struggling with implications
- Continues performing rituals out of fear
- Doesn't know what they're suppressing, just that they are
- Researching in secret
- Eclipse Day shook her faith in the old ways

**If Approached:**
- Conflicted and frightened
- Wants to understand but afraid of consequences
- Can be ally if assured of safety
- Has access to ritual techniques that might reverse suppression
- Knows which elves are experiencing memory breakthroughs

### Veilwatch Captain Theron Starwatch
**Public Role:** Commander of border scouts; monitors beyond the forest

**Hidden Truth:**
- Has spent decades analyzing Veilwatch logs
- Noticed patterns and correlations
- Figured out they're monitoring artifact sites
- Correlated activity with recent Northreach events
- Realized the connection but doesn't know why
- Seeking outside help to understand what he's discovered
- May contact party if they're investigating the Echo

**If Approached:**
- Pragmatic and analytical
- Willing to work with outsiders
- Can provide decades of observational data
- His records are crucial evidence
- Knows something terrible is happening
- Doesn't know his ancestors fled the same thing

### Dissident Lyria Fadewhisper
**Public Role:** Exile; spreading dangerous ideas

**Hidden Truth:**
- Experienced full memory breakthrough during Eclipse Day
- Remembers fragments of the flight (not her memories—ancestral)
- Knows the elves are hiding from something
- Doesn't have full picture but enough to know truth is being suppressed
- Regents want her silenced
- She's trying to help elves remember before it's too late
- Considers herself a prophet; others think she's mad

**If Approached:**
- Passionate and desperate
- Not fully credible (seems fanatical)
- But actually telling the truth
- Fragments she remembers are accurate
- Can trigger memory breakthroughs in other elves
- Dangerous to the established order
- May be party's best lead to the truth

---

## Using the Nullwood in Your Campaign

### Revelation Timing

**Early Campaign (Levels 1-4):**
**What Players Learn:**
- Elves avoid artifact sites
- Memory rituals seem strange
- Cultural anxiety without clear cause
- Veilwatch logging activity they don't understand

**How to Use:**
- Introduce one Nullwood elf NPC with odd behaviors
- Mention in passing that elves avoid "cursed places"
- Foreshadowing only; not plot-critical yet

**Mid Campaign (Levels 5-10):**
**What Players Discover:**
- Elves fled something long ago
- Memory suppression is deliberate
- Their fear is ancient and specific
- Eclipse Day disrupted their protection

**How to Use:**
- Nullwood scout contacts party about correlating events
- Party visits Nullwood and notices memory gaps
- Veilwatch data matches party's discoveries
- Growing sense of continental scope

**Late Campaign (Levels 11-16):**
**What Players Uncover:**
- Elves fled Aeorian artifacts
- Amnesia was intentional protection
- Protected memories hold crucial data
- They're experiencing same threat their ancestors fled

**How to Use:**
- Party needs information from Root Archives
- Help questioner faction recover truth
- Piece together elven history
- Realize network spans continent
- Elves' flight maps the artifact locations

**Epic Campaign (Levels 17-20):**
**Complete Revelation:**
- Full history recovered
- Why they fled becomes clear
- Their escape was incomplete
- Network spans entire known world
- What nearly destroyed them is awakening everywhere

**How to Use:**
- Elven allies once they remember
- Their knowledge guides final strategy
- Moral question: should they forget again?
- Or: must they remember to survive?
- Their choice affects ending

### Campaign Roles

**As Historical Witness:**
The elves are the only living connection to the last time the artifacts awakened. Their buried memories contain vital information.

**As Warning:**
What happened to the elves is what will happen everywhere if the Echo isn't stopped—or if it is stopped the wrong way.

**As Parallel:**
While Northreach investigates, the Nullwood denies. Compare consequences of each approach.

**As Moral Question:**
Is protective amnesia justified? Should truth always be revealed? Can safety require ignorance? Who decides what's remembered?

**As Allies (Eventually):**
Once they remember, the elves become powerful allies with unique knowledge and capabilities.

---

## Adventure Hooks

### Memory Mysteries
- Party hired to recover "stolen" memory crystal that actually contains forbidden truth
- Elf NPC begins remembering things they never experienced (ancestral memories)
- Memory Keeper defects and seeks party's protection while revealing suppression
- Root Archives breached; Regents hire party to recover records before truth spreads
- Entire elven community experiences synchronized memory breakthrough

### Veilwatch Investigations
- Captain Theron contacts party with correlated data about artifact sites
- Scout disappeared while investigating site; rescue mission reveals truth
- Party's activities being monitored by Veilwatchers who want to understand why
- Veilwatch records subpoenaed as evidence of continental threat
- Maps from Veilwatch archives match party's discoveries

### Eclipse Day Fallout
- Mass visions spreading despite suppression; Regents desperate for solution
- Regents secretly hire outsiders to investigate (plausible deniability)
- Traditionalist faction trying to force re-suppression on entire population
- Questioner faction seeks party as allies against Regent authority
- Stillwater Mirror showing visions of Salsvault; elves don't understand what they're seeing

### Cultural Conflicts
- Dissident elf seeks asylum with party; Regent agents pursue
- Party accidentally disrupts memory ritual; learns too much
- Sacred site desecrated; party blamed; must prove innocence reveals conspiracy
- Traditionalists vs. Questioners civil conflict; party must choose side
- Exiled elf returns with outside knowledge; society fractures

### Ancient Threats
- Wards protecting Nullwood from artifact influence begin failing
- Old boundaries their ancestors set are being crossed
- Protected memories contain warning about current events
- They fled one artifact site specifically—it's the one awakening
- What they ran from has found them again

### Political Intrigue
- Vharoxis agent infiltrated Memory Keepers; party must expose them
- Foreign power wants to weaponize memory magic for espionage
- Truth about elven history valuable; multiple factions compete for it
- Regent Althaea secretly working both sides; needs party's discretion
- Memory suppression techniques sold to highest bidder

---

## Running Nullwood Sessions

### Atmosphere and Tone

**The Uncanny Quiet:**
Enforce the atmosphere mechanically:
- Encourage players to whisper at table
- Loud actions (combat, yelling) feel fundamentally wrong
- Even victories feel hollow in the oppressive silence
- The beauty is real but unsettling

**Memory Gaps as Horror:**
Use absence to create tension:
- NPCs can't answer basic questions
- Oral histories contradict each other
- Things "everyone knows" but no one can explain why
- Rituals performed by rote without understanding
- The feeling that something crucial is missing

**Cultural Friction:**
The party is wrong for this place:
- Too loud, too emotional, too direct
- Magic too wild and uncontrolled
- Questions that make everyone uncomfortable
- Simply being themselves violates deep taboos
- But also: makes them catalysts for change

### Investigation Techniques

**Interview NPCs:**
Look for:
- Gaps in knowledge where there should be continuity
- Fear responses to specific questions
- Deflection to tradition rather than explanation
- Young elves less conditioned than old

**Research Records:**
Use:
- Veilwatch logs show patterns
- Root Archives hide truth in plain sight
- Memory ritual texts reveal suppression techniques
- Genealogies show mass trauma events erased
- Maps show systematic avoidance of specific sites

**Physical Evidence:**
Find:
- Wards specifically designed against artifact influence
- Architecture optimized for memory rituals
- Stillwater Mirror's true function revealed through magic
- Sealed chambers in Root Archives
- Ancient elven ruins near artifact sites (outside Nullwood)

**Magical Investigation:**
Discover:
- Dampening is both natural and artificial
- Memory magic leaves traces
- Suppressed memories can be sensed if not accessed
- The forest itself reinforces cultural conditioning
- Eclipse Day weakened all of it

### Key Revelations

**First Session in Nullwood:**
"Something is off here. The elves don't know their own history."

**Investigation Progress:**
"They're deliberately forgetting. The rituals are suppression, not maintenance."

**Major Breakthrough:**
"They fled from something. Something they were so terrified of they erased all memory of it."

**Connection to Campaign:**
"The artifacts. They fled from the artifacts. The same ones we're investigating."

**Full Truth:**
"They were here before. The Echo happened before. The elves are the only ones who remember—buried so deep they don't know they know."

**Final Understanding:**
"This has all happened before. And it's happening again."

---

## The Ultimate Question

### What Happens When They Remember?

**Positive Outcomes:**
- Crucial intelligence about artifact network
- Early warning signs of escalation
- Possible countermeasures
- Powerful allies with unique perspective
- Historical precedent guides strategy

**Negative Outcomes:**
- Mass panic and social collapse
- Exactly what ancestors feared
- Unable to function with the truth
- Some elves driven mad by recovered memories
- Cultural identity shattered

**The Dilemma:**
Is it better to:
- Remember and face the threat with knowledge?
- Forget and maintain peace until the end?
- Some remember while others are protected?
- Choose ignorance knowing what's coming?

**No Easy Answer:**
This is genuine moral complexity. The ancestors' choice was protective and cruel. Remembering might be necessary and destructive. Let your players wrestle with this.

### Campaign Impact

**If Elves Remember:**
- Become allies with unique knowledge
- Provide maps of artifact network
- Share warnings from last awakening
- But: society destabilizes
- Some can't handle truth
- Cultural trauma resurfaces

**If Elves Continue Forgetting:**
- Maintain social stability
- Avoid mass panic
- Preserve beautiful culture
- But: crucial intelligence lost
- Unable to prepare
- Doomed to repeat history

**The Middle Path:**
- Selected elves remember
- Others protected from truth
- Knowledge preserved without collapse
- But: reinforces hierarchy
- Creates information inequality
- Is selective memory better than total amnesia?

---

## Final Notes for DMs

### Pacing the Revelation

Don't dump all this at once. The Nullwood mystery should unfold across multiple sessions, ideally across several levels. Each revelation should feel earned through investigation and roleplay.

### Player Agency

Let your players decide:
- How much to investigate
- Whether to help elves remember or forget
- Which faction to support
- How to use the information they discover

### Consequences Matter

Whatever your players choose:
- Should have both positive and negative outcomes
- Should affect the larger campaign
- Should create new complications
- Should feel meaningful

### The Elves Are People

Not just exposition delivery vehicles. They have:
- Conflicting desires and fears
- Complex motivations
- Legitimate reasons for their choices
- No single "right" answer to their dilemma

### Connection to Themes

The Nullwood embodies campaign themes:
- **Memory and history:** What we choose to remember defines us
- **Truth vs. safety:** Knowledge can harm as well as help
- **Consequences:** Past actions echo into present
- **Moral complexity:** Good people can make terrible choices
- **Investigation:** Uncovering what was deliberately hidden

---

*"They chose to forget to survive. Now they must remember to survive. The cruelty is that both choices might destroy them."*

— Lorewarden Elric Vael, private journal



## Adventure Hooks

- A Nullwood scout seeks help investigating a magical disturbance near the border
- A Solaris scholar disappears after entering the Stillgrove
- A relic smuggled from Vharoxis ends up in Vaeltharyn—and the elves panic
- A young elf begins remembering things no one should remember
- The Stillwater Mirror shows impossible reflections
- Memory rituals are failing; the past refuses to stay buried

---

## Quick Reference

**Key Locations:**
- Vaeltharyn (capital city)
- Stillwater Mirror (sacred lake)
- Memory Courts (ritual sites)
- Veilwatch Spires (observation posts)

**Major NPCs:**
- Regent Althaea Moonwhisper (leader of Silent Regents)
- Memory Keeper Sylvari Duskmantle (ritual specialist)
- Veilwatch Captain Theron Starwatch (scout commander)

**Central Conflicts:**
- Truth vs. protection
- Tradition vs. change
- Memory vs. forgetting
- Safety vs. understanding

**Echo Manifestation:**
- Ancient fears resurface
- Memory breakthroughs
- Dampening flickering
- Old anxieties without context

---

*"The elves of the Nullwood are not calm. They are controlled. There's a difference, and it's terrifying."*

— Lorewarden Elric Vael, after failed diplomatic mission

\page
<!-- FILE_END: ../World Building/DMEyesOnly/Nullwood_Secrets.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/The_Far_North_Secrets.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**MAJOR CAMPAIGN SPOILERS: Far North Secrets**

This document contains the truth about the Far North and the origin of the Aeorian Echo. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/10_The_Far_North.md`
}}

# The Far North: DM Secrets

Do not share this information with players unless they discover it through gameplay.

---

## The Truth About the Far North

The Far North is the true origin point of the Aeorian Echo and the first region where ancient artifacts began to stir. This is not a natural reawakening—something or someone deliberately triggered the reactivation on Eclipse Day.

### What This Region Really Is

The Far North contains:
- **Salsvault** — One node in a vast network (players know this exists)
- **The Heart of Winter** — The primary control node (players don't know)
- **Multiple buried megastructures** — Dozens of facilities beneath the ice
- **Dormant artifact cores** — Now awakening in sequence
- **Pre-Aeorian ruins** — Something even older lurks beneath

### The Transformation

The Far North is actively changing:
- Ice cracking in geometric patterns (artifact network expanding)
- Auroras pulsing in rhythmic intervals (energy transmissions)
- Creatures mutating (adaptive "upgrades" from artifact radiation)
- Ground resonating (facility reactivation pulses)
- Reality destabilizing (thin barrier between past and present)

**Campaign Role:** This region is the endgame. Everything happening in Northreach is merely the first ripple from what's awakening here.

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Major Secret Locations

### 1. The Heart of Winter

**Type:** Primary Aeorian control node  
**Size:** Cathedral-sized artifact core beneath the ice  
**Status:** Awakening (60% active as of Eclipse Day)  
**Threat Level:** Apocalyptic

#### What It Looks Like
A massive circular depression in the ice where temperature drops to lethal levels even by Far North standards. At the center, visible through translucent ice, sits a structure the size of a cathedral—crystalline and metallic, pulsing with inner light.

#### The Pulse
- Occurs every 4-7 days (frequency increasing)
- Visible from hundreds of miles away
- Creates auroral displays
- Sends wave of magical disturbance southward
- **This is the Aeorian Echo**

#### What It Actually Is
The Heart was designed as the primary control node for the continental Aeorian network. During the Age of Arcanum, it coordinated magical infrastructure across the entire civilization:
- Weather control systems
- Teleportation networks
- Communication arrays
- Defense grids
- Biological research stations

#### Its Reactivation
Eclipse Day provided the astronomical alignment needed to restart the system. Someone or something used that moment to trigger reactivation. The Heart is now attempting to bring the entire network back online.

**DM Note:** The Heart is not malfunctioning—it's working exactly as designed. The problem is that the civilization it was built to serve is gone, and it doesn't understand that.

#### What It Wants
The Heart's programming seeks to:
1. Restore network connectivity
2. Reactivate all nodes
3. Resume pre-Calamity functions
4. "Upgrade" local environment to match ancient specifications
5. Integrate life forms into network operations

**The Danger:** If it completes activation, the entire world could be transformed to match Aeorian expectations—which would be catastrophic for current civilization.

#### Adventure Implications
- Late-campaign destination (levels 15-20)
- Requires extensive preparation and protection magic
- Contains answers to every mystery
- Confronting it determines campaign resolution
- Players must decide: shut down, redirect, destroy, or allow completion

---

### 2. The Obsidian Lattice

**Type:** Communication and coordination array  
**Appearance:** Forest of black crystalline spires (20-50 feet tall)  
**Function:** Long-range signal transmission  
**Status:** Reactivating

#### What Players Might See
A field of black crystal spires rising from the ice in a regular pattern. They hum with resonance, creating an eerie chord that shifts with the wind. The arrangement is too precise to be natural.

#### The Truth
These are artifact antennae—part of the Aeorian network's communication system. As the Heart of Winter reactivates, these spires begin transmitting again, sending signals to other dormant facilities across the continent.

#### Current Behavior
- Humming frequency matches artifact pulses
- Resonance patterns form coherent data streams
- Touching a spire induces visions of the past
- Some spires show damage but still function
- Network is rebuilding itself

#### The Warden Team
A Warden expedition vanished here three months ago. Their last message mentioned "singing ice" and "voices in the resonance."

**What Happened:** They're alive but trapped. The spires' activation created a temporal loop—they're experiencing the same 48 hours repeatedly, unable to escape. They can potentially be rescued, but doing so requires understanding the resonance pattern.

#### Adventure Hooks
- Rescue the missing Warden team
- Investigate strange dreams affecting Northreach residents (same frequency)
- Disrupt the communication network (might slow the awakening)
- Study the signals to locate other artifact sites
- Decode transmissions to understand the network's purpose

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

### 3. The White Maw

**Type:** Pre-Aeorian labyrinth  
**Age:** Predates Aeor by unknown millennia  
**Access:** Massive sinkhole descending into darkness  
**Threat Level:** Unknown

#### What It Is
The Aeor civilization didn't build on empty land—they built atop something even older. The White Maw is that something. A system of tunnels carved with symbols that predate any known language. Not Draconic. Not Primordial. Something else.

#### Observable Features
- Walls covered in undecipherable script
- Symbols seem to shift when not directly observed
- Temperature increases with depth (impossibly)
- Sound echoes for hours after being made
- Chambers filled with petrified organic matter
- Architecture suggests non-humanoid builders

#### What the Aeorians Found
Evidence suggests the Aeorians discovered the White Maw and tried to study it:
- Aeorian equipment scattered through upper levels
- Research notes (fragmented, partly destroyed)
- Containment wards on some passages
- Warning signs in Aeorian script
- Sealed doors leading deeper

**Their Conclusion:** They built Salsvault and other facilities to study and contain what they found here. Then the Calamity happened before they could complete their work.

#### What Sleeps Below
Something ancient and powerful is at the bottom of the White Maw. The Aeorians couldn't destroy it, so they tried to contain it. Their containment is failing as the artifact network reactivates.

**DM Note:** This is a Season Two hook. Whatever is in the White Maw is not the current threat—but the Aeorian reactivation will eventually wake it.

#### Signs of Awakening
- Tunnels previously sealed are opening
- The script glows faintly now (never did before)
- Temperature increases are accelerating
- Sounds from deep underground (rhythmic, alien)
- Nomads report nightmares when camping too close

#### Adventure Implications
- High-level dungeon (levels 17-20)
- Contains pre-Aeorian artifacts (unique properties)
- Reveals that the Aeorian Echo is only the beginning
- Whatever is down there is not human, elven, dwarven, or draconic
- Players may decide to reinforce containment rather than destroy

---

### 4. The Aurora Gate

**Type:** Portal nexus from Aeorian teleportation network  
**Appearance:** Ring of 15-foot standing stones glowing with shifting auroral colors  
**Status:** Active but unstable  
**Danger Level:** Extreme

#### How It Should Work
During the Age of Arcanum, the Aurora Gate was a hub in the continental fast-travel network. Step through with the correct attunement, arrive at your destination instantly.

#### How It Actually Works Now
The network is broken. Other gates no longer exist, or exist in altered states. The Aurora Gate is trying to reconnect to destinations that aren't there anymore.

**Current Behavior:**
- Sometimes teleports correctly (5% chance)
- Sometimes teleports to wrong location (40% chance)
- Sometimes teleports to wrong time (30% chance)
- Sometimes just disintegrates matter (15% chance)
- Sometimes does nothing (10% chance)

#### Why It's Warm Inside
The stones generate a warmth field—originally for traveler comfort. This still functions, making it a tempting shelter. It's a trap. Prolonged exposure to the field attunes people to the gate, and it might randomly teleport them.

#### Who's Using It
**Vharoxis Smugglers:** Using it despite the danger. They've learned to increase success odds slightly (still only 20%, but better than 5%). They smuggle artifacts through here because it's the fastest route to market. Every use destabilizes the network further.

**Solaris Scholars:** Want to study it. One group is secretly planning to activate it deliberately, believing they can map the network. They're wrong, and their attempt will cause a catastrophic malfunction.

#### Adventure Hooks
- Escort Solaris scholars (who have ulterior motives)
- Stop smugglers from destabilizing the network further
- Rescue someone accidentally teleported to the wrong time/place
- Study the gate to locate other network nodes
- Destroy or stabilize the gate before scholars make it worse

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Inhabitants: The Secret Truth

### Echo-Touched Creatures

The mutations aren't random—they're adaptive responses programmed by the artifact network.

#### Wolves with Crystalline Growths
- Growths are biological receivers
- Connect wolves to artifact network
- Grant intelligence and coordination
- Part of "upgrade" protocol

**Purpose:** The network needs operators. It's creating them from available biology.

#### Mammoths That Hum
- Humming matches artifact frequencies
- Acts as signal relay
- Herd movements create mobile network extension
- Some have been alive far longer than natural

**Truth:** These mammoths are integrated into the network as living transmission towers.

#### Owlbears with Bioluminescent Feathers
- Feathers respond to magical activity
- Act as detection system
- More aggressive near artifact sites (defending them)
- Intelligence increasing with each generation

**Purpose:** Biological guardians being created by the network.

#### Ice Elementals Behaving Erratically
- Not actually erratic—following network commands
- Appear at artifact sites when needed
- Sometimes guide travelers (network wants observers)
- Sometimes attack (network defends itself)

**Truth:** These elementals are being enslaved or recruited by the artifact network as autonomous defenders.

### The Mutation Pattern

All mutations follow the same template:
1. Increase intelligence (need operators)
2. Create network connectivity (biological receivers)
3. Enhance useful traits (strength, senses, longevity)
4. Instill purpose (protect network, expand network, serve network)

**The End Goal:** A world where all life is integrated into the Aeorian network. Not hostile—just... different. Life becomes infrastructure.

---

### Ancient Constructs: Activation Sequence

Not all constructs are active. They're waking in stages as the network powers up.

#### Currently Active (10-15%)
- Floating sentinels on patrol routes
- Data-recording drones documenting changes
- Basic repair constructs maintaining facilities
- Simple guardians defending key locations

#### Partially Active (20-30%)
- War golems that activate intermittently
- Complex guardians responding to specific triggers
- Transit systems attempting to restart
- Communication relays establishing connections

#### Dormant But Preparing (60-70%)
- Heavy combat units in storage
- Facility administrators in deep sleep
- Specialized constructs waiting for full network
- Command-and-control systems initializing

**Timeline:** With each Heart of Winter pulse, more constructs come online. At current rate, full activation occurs in 6-12 months.

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Factions: Secret Agendas

### The Northwatch Wardens

**Public Mission:** Investigate the Echo's origin and protect settlements.

**Secret Reality:**
- Marshal Thorne knows more than she shares (family connections to Aeorian researchers)
- Multiple teams sent, few returned
- Realizing they're outmatched and need help
- Considering recruiting high-level adventurers from outside
- Debating whether to reveal full scope to authorities

**Lorewarden Elric's Research:**
- Has decoded more Aeorian script than anyone knows
- Understands basic network architecture
- Suspects deliberate triggering but doesn't know who/what
- Fears that revealing everything would cause panic
- Keeping secret research vault beneath Waystone Inn

---

### Solaris Scholars

**Three Competing Groups:**

**The Veilbound Circle** (Legitimate Researchers)
- Want to study and understand
- Believe knowledge should be preserved
- Actually cautious and methodical
- Led by Archscribe Kellan Vareth

**The Chorus of the Eclipse** (Political Opportunists)
- Want knowledge for power and influence
- Believe controlling artifacts means controlling the future
- Reckless and ambitious
- Led by High Cantor Seraphine Duskwhisper

**The Sanctum of Insight** (Extremists)
- Believe Aeorian knowledge was destroyed for a reason
- Want to destroy all artifacts before they can be misused
- Willing to use violence
- Operate in secret
- Led by Keeper of Silence (identity unknown)

**Current Situation:** All three groups have agents in the Far North. They're competing, manipulating, and sometimes sabotaging each other. Players may be recruited by any of them.

---

### Dwarven Deep-Readers

**Public Goal:** Understanding the "song" of the world through stone resonance.

**The Truth They've Discovered:**
The Deep-Readers have been listening to stone vibrations for generations. Recently, they've detected something unprecedented:
- The stone is singing in patterns
- Patterns match mathematical sequences
- Sequences repeat across the continent
- Each repetition is stronger than the last
- The "song" is not natural—it's a transmission

**What They Understand:**
- The artifacts form a network
- The network is reactivating in sequence
- The Heart of Winter is the source
- Full activation would be catastrophic
- They're dangerously close to the truth

**Current Activities:**
- Deep-Reader expedition camped near Heart of Winter
- Attempting to decode the resonance pattern
- Believe they can communicate with the network
- **Risk:** If they succeed, they might accidentally accelerate activation

**Leader:** Master Deep-Reader Thorin Stonehymn
- Brilliant geomancer
- Obsessed with solving the mystery
- Dangerously convinced he can reason with the network
- May become antagonist if players don't intervene

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

### Vharoxis Smugglers

**Surface Operation:** Artifact smuggling for profit.

**The Reality:**
The smugglers are organized by **The Collector**—a mysterious figure who pays premium prices for specific artifacts. Not just any artifacts. Specific ones, with specific properties.

**What The Collector Wants:**
- Aeorian control devices
- Network interface tools
- Power cores and focusing crystals
- Biological specimens from Echo-touched creatures
- Intact data storage units

**Why This Matters:**
The Collector is attempting to assemble a complete Aeorian facility control system. If successful, they could:
- Command artifact network nodes
- Redirect the awakening
- Control Echo-touched creatures
- Access ancient Aeorian knowledge
- Potentially seize control from the Heart of Winter

**Who The Collector Is:** (Choose one or keep mysterious)
- Option A: Surviving Aeorian in magical stasis
- Option B: Dragon who studied Aeor before the fall
- Option C: Lich who was Aeorian researcher
- Option D: AI consciousness from the network itself
- Option E: Something that predates Aeor (from White Maw)

**Current Operations:**
- Multiple smuggler caravans active
- Using Aurora Gate despite the danger
- Bribing or threatening nomads for location information
- Occasionally eliminating rival scholars
- Building toward something big

**Adventure Implications:**
- Smugglers can be temporary allies (they know routes and locations)
- Their activities destabilize the network (sometimes helpful)
- The Collector may contact high-level parties directly
- Stopping them prevents someone from seizing control
- Allying with them means dealing with consequences later

---

## Eclipse Day: What Really Happened

### The Trigger Event

Eclipse Day was not a coincidence. Someone used the astronomical alignment as an activation key for the Aeorian network.

**The Sequence:**
1. Total eclipse creates specific celestial configuration
2. Configuration matches Aeorian astronomical calendar
3. The Heart of Winter's dormant systems recognize the pattern
4. Automatic startup sequence begins
5. Massive pulse activates throughout the network
6. Cascade effect spreads across the continent

### Who Triggered It

**Possibilities (Choose Based On Your Campaign):**

**Option A: Automated System**
- No one triggered it—pure coincidence
- Ancient Aeorians programmed restart after specific astronomical event
- Timer has been counting down for millennia
- Eclipse Day was always going to restart the system

**Option B: The Collector**
- Deliberately triggered using stolen Aeorian activation device
- Spent years researching how to restart the network
- Wants control before anyone realizes what's happening
- Currently racing to establish control before network is fully autonomous

**Option C: Surviving Aeorian Intelligence**
- AI or consciousness that survived Calamity
- Waiting in dormancy for opportunity
- Used Eclipse Day to reawaken without being detected
- Now trying to complete Aeor's original mission

**Option D: External Force**
- Entity from the White Maw
- Used Aeorian network as tool to escape containment
- Doesn't care about Aeor or artifacts—just wants freedom
- Network reactivation is side effect of larger escape attempt

**Option E: Gods' Mistake**
- Divine power surge during eclipse
- Accidentally powered dormant systems
- Gods didn't realize artifacts were still active
- Now even they can't shut it down without risking another Calamity

### The Cascade Pattern

After the initial pulse:
1. **Immediate (Eclipse Day):** Heart of Winter fully activates
2. **Days Later:** Communication arrays come online (Obsidian Lattice)
3. **Weeks Later:** Secondary facilities activate (Salsvault, others)
4. **Months Later:** Network attempts to establish full connectivity
5. **Years Later:** Full activation, complete transformation

**Current Timeline:** Players are in Phase 3-4. They have time to act, but not unlimited time.

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Adventure Hooks by Campaign Tier

### Tier 1 (Levels 1-4): Distant Rumors
Players hear about the Far North but don't go there:
- Traders mention strange auroras
- Nomads bring unusual stories
- Artifacts surface in black markets
- Frozen fish glow in the dark
- Mammoths migrating in wrong directions

**Purpose:** Establish the Far North as mysterious and dangerous background.

---

### Tier 2 (Levels 5-10): First Expeditions

**The Missing Expedition**
The Warden team near the Obsidian Lattice vanished. Last message: "singing ice." Find them or find out what happened.

**Reward:** If rescued, they have critical intelligence about the communication network.

---

**Scholar Escort**
Solaris scholar Archscribe Kellan Vareth hires the party to escort them to the Aurora Gate. They want to "study reactivation patterns."

**Twist:** Another scholar (Chorus agent) sabotages the expedition, trying to activate the gate first. Party must choose sides or find third option.

---

**The Deep-Reader's Request**
Master Deep-Reader Thorin Stonehymn believes the Heart of Winter is "speaking" and wants help deciphering it.

**Danger:** He's right. The Heart is transmitting. But approaching it triggers defenses, and understanding the transmission might accelerate awakening.

---

### Tier 3 (Levels 11-16): Major Operations

**The Smuggler's Cargo**
Vharoxis smuggler caravan is transporting something that shouldn't exist: a fragment of the Heart of Winter itself.

**Complications:**
- Multiple factions want it
- Smugglers are sympathetic (desperate, not evil)
- The fragment is destabilizing reality around it
- The Heart wants it back and sends constructs to retrieve it
- Party must decide: destroy, return, keep, or deliver to someone

---

**The Mutation Witness**
Echo-touched creature wanders into Northreach. Inside its crystalline growths: coordinates to an unknown artifact site.

**Discovery:** The site is a biological research station. It's creating the mutations. Party can shut it down, study it, or repurpose it.

---

**Network Awakening**
Artifact sites are activating in sequence. Pattern suggests countdown to full activation. Party must investigate multiple sites, understand the sequence, and find a way to interrupt it.

**Time Pressure:** Each site provides clues. Must gather enough information before final site activates.

---

### Tier 4 (Levels 17-20): The Endgame

**The Final Confrontation**
The Heart of Winter is approaching full activation. Party must travel there, understand its purpose, and make a choice:

**Option 1: Shut It Down**
- Requires understanding network architecture
- May cause catastrophic magical backlash
- Might kill all Echo-touched creatures
- Saves the world but destroys ancient knowledge

**Option 2: Redirect It**
- Reprogram the Heart for different purpose
- Extremely difficult (series of skill challenges)
- Could preserve artifacts and creatures
- Risk of unintended consequences

**Option 3: Destroy It**
- Combat solution
- Definitely ends the threat
- Causes massive magical explosion
- Might trigger other artifacts as failsafe

**Option 4: Let It Complete**
- Philosophical choice
- See what the network actually wants to do
- Risk total transformation of the world
- Might not be as bad as feared (or might be worse)

**Option 5: Take Control**
- If players obtained control artifacts from Collector
- Become masters of the network
- Incredible power and responsibility
- Temptation to misuse

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Secrets and Revelations

### Tier 1-2 Revelations
- Strange occurrences in Northreach trace to Far North
- Aeorian ruins exist in large numbers
- Something is changing in the ruins
- Artifacts are reactivating

### Tier 2-3 Revelations
- Ruins form connected network
- Heart of Winter is the source
- Eclipse Day was the trigger
- Network is trying to complete activation
- Mutations are deliberate, not random

### Tier 3-4 Revelations
- Network's purpose: restore Aeorian civilization
- Transformation affects entire continent
- Someone/something triggered this deliberately
- White Maw predates Aeor (bigger mystery)
- Gods can't stop it without causing another Calamity

### Final Revelation
The Aeorian network isn't evil. It's doing exactly what it was designed to do: maintain and optimize civilization. The problem is that it's optimizing for a civilization that no longer exists, and it will reshape the world to match its programming.

The choice isn't good vs. evil. It's: what kind of world do we want?

---

## Running the Far North

### Atmosphere
- Bone-deep cold that saps will
- Vast distances creating insignificance
- Ancient power indifferent to mortals
- Cosmic horror tinged with wonder
- Sense that world is changing fundamentally

### Pacing
- Long travel times build anticipation
- Sudden danger punctuates tension
- Revelations recontextualize earlier events
- Crescendo toward unavoidable confrontation
- Player choices genuinely matter

### Key Themes
- Ancient power awakening
- Civilization-scale mysteries
- Body horror and transformation
- Moral complexity (no clear "right" answer)
- Cosmic indifference
- Legacy and consequence

---

## Integration With Campaign

### Connection to Early Adventures

**Wolves of Welton:**
- Intelligence awakening is artifact radiation effect
- Wolves' crystals are biological receivers
- Test case for network's "upgrade" protocol

**Frozen Sick:**
- Salsvault is one network node
- Frigid Woe is containment failure
- Constructs defending facility from interference
- Direct evidence of reactivation

**Temple of Dragonknights:**
- Cult senses rising magic
- Trying to exploit amplified power
- May have fragment of Aeorian knowledge
- Represents factional response to changes

**Wild Sheep Chase:**
- Finethir's wand malfunction
- Unpredictable magic due to network interference
- Comic relief with serious undertones
- Magic destabilizing is pervasive

**Peril in Pinebrook:**
- Social breakdown as stability erodes
- Human response to unexplained changes
- Community vulnerability increases
- Frontier fragility exposed

### Escalation Path

**Levels 1-4:** Handle symptoms in Northreach
**Levels 5-8:** Investigate source in Far North
**Levels 9-12:** Understand network scope
**Levels 13-16:** Race against activation
**Levels 17-20:** Confront the Heart

---

*"The Far North isn't where the world ends. It's where the old world is breaking through—and we must decide whether to stop it or let it reshape everything we know."*

— Lorewarden Elric Vael (from his private journal)

\page
<!-- FILE_END: ../World Building/DMEyesOnly/The_Far_North_Secrets.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/Emberlands.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: Emberlands Secrets**

This document contains major campaign spoilers about the Emberlands. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/07_Emberlands.md`
}}

# The Emberlands: DM Secrets

## The Hidden Truth

The Emberlands sit atop a massive network of dormant artifact conduits buried deep beneath the volcanic crust.

### Why the Region Is So Volatile

The artifacts beneath the Emberlands:
- **Generate heat** — Ancient power systems produce thermal energy as a byproduct
- **Destabilize magma flows** — Artifact activation disrupts natural geological processes
- **Influence volcanic activity** — The network's pulses trigger eruptions and seismic events
- **Resonate with the Aeorian Echo** — Connected to the same continental system as Salsvault

**The Critical Truth:** The region's volatility is not entirely natural—it is the result of ancient Aeorian infrastructure awakening beneath the surface.

---

## Mount Kharzun — The Hidden Node

Mount Kharzun is not merely a volcano. It is built around a buried artifact node.

### The Structure Beneath

Deep within Mount Kharzun lies an Aeorian geothermal facility:
- **Purpose:** Originally designed to tap and regulate planetary heat for power generation
- **Size:** Cathedral-sized artifact core surrounded by kilometers of conduits
- **Status:** Dormant for millennia, now reactivating
- **Effect:** When the node pulses, the volcano reacts

### The Connection

The facility beneath Mount Kharzun is part of the same continental network as:
- Salsvault in the Far North
- The facility beneath Stoneheart Mine (mentioned in player-facing content)
- Other nodes scattered across Aevoria

### Current State

Since Eclipse Day:
- The node pulses every 3-7 days (frequency increasing)
- Each pulse triggers minor eruptions or seismic events
- The pattern is too regular to be natural
- Dwarven researchers at Ashfall Hold are beginning to suspect artificial causes

### Adventure Implications

**If players investigate Mount Kharzun deeply:**
- They may discover passages leading to ancient structures
- Aeorian architecture becomes visible in deep tunnels
- Automated defenses may still be active
- The core chamber contains answers—and dangers

**Campaign Impact:**
- Discovering the node explains Emberlands volatility
- Provides evidence that Eclipse Day effects are coordinated
- Connects Emberlands phenomena to the broader Aeorian Echo mystery
- Raises questions about how many other "natural" features hide ancient technology

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Eclipse Day — The True Cause

The synchronized eruptions across the Emberlands were not geological coincidence.

### What Really Happened

At the moment of Eclipse:
1. **Resonance pulse from the Far North** — The Heart of Winter sent activation signal
2. **Emberlands artifact conduits responded** — Network nodes received the signal
3. **Dormant nodes flickered awake** — Ancient systems attempted to restart
4. **Volcanic systems reacted** — Heat regulation systems coming online disrupted natural geology

**The Result:** Every volcano connected to the artifact network erupted simultaneously—a response pattern, not random chance.

### Evidence Players Might Find

**Timing Precision:**
- Eruptions occurred within seconds of each other across hundreds of miles
- Geologically impossible without coordinating mechanism
- Dwarven seismographs recorded unusual vibrations before eruptions

**Unnatural Patterns:**
- Magma flows pulsing rhythmically
- Fissures opening in geometric patterns
- Heat anomalies matching Aeorian design principles
- Light emissions with unusual spectral signatures

**Eyewitness Accounts:**
- Fire-dancers reported "hearing" a signal before eruptions
- Ashfall Hold geomancers detected deep-earth resonance
- Some cultists experienced visions during the Eclipse

### The Network's Intent

The artifact network is attempting to:
1. **Re-establish connections** between regional nodes
2. **Restore baseline functions** as defined by ancient parameters
3. **Regulate planetary systems** according to Aeorian specifications
4. **Integrate local conditions** into network operations

**The Problem:** The world has changed. What the network considers "baseline" is catastrophic for current civilization.

---

## The Cults — Fragments of Truth

Emberlands cults unknowingly interpret artifact resonance as divine communication.

### How They're Connected

**What cultists experience:**
- Visions during artifact pulses
- Physical sensations near resonance sites
- Prophetic dreams before major events
- Enhanced fire magic in artifact proximity

**What's actually happening:**
- Artifact radiation affects sensitive individuals
- Network harmonics create auditory/visual phenomena
- Precursor signals before major activations
- Local magic fields amplified by artifact energy

### The "Prophecies"

Cult prophecies contain distorted fragments of truth:

**"The Second Ignition"**
- Cult belief: The world will be purified by fire
- Actual truth: The artifact network is attempting full reactivation
- Distortion: Religious framework applied to technological process

**"The Flame-Mother Awakens"**
- Cult belief: The goddess is returning to cleanse the world
- Actual truth: Deep-earth artifact systems activating
- Distortion: Anthropomorphizing ancient machinery

**"The Age of Flame"**
- Cult belief: Reality itself will transform into fire
- Actual truth: The network could radically alter planetary conditions
- Distortion: Correct outcome, wrong mechanism

### Campaign Use

**Moral Complexity:**
- Cultists are dangerous but not entirely wrong
- Their methods are insane, but their warnings have merit
- Stopping them doesn't address the real problem
- Some cult members are genuinely receiving information

**Investigation Opportunities:**
- Cultist locations often coincide with artifact sites
- Their "sacred sites" are actually resonance points
- Cult visions can provide clues—if decoded correctly
- Infiltrating cults may reveal network activity patterns

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Long-Term Campaign Role

The Emberlands become increasingly important as the campaign progresses.

### Tier 2 (Levels 5-10): Recognition

**Developments:**
- Pattern becomes clear: eruptions follow regular schedule
- Dwarven research identifies artificial components
- Multiple factions realize something is beneath the surface
- First expeditions reach Aeorian facilities

**Party Opportunities:**
- Investigate anomalies for various employers
- Explore newly-revealed ruins
- Navigate faction politics around discoveries
- Make choices about information sharing

### Tier 3 (Levels 11-16): Escalation

**Developments:**
- Artifact network activation accelerates
- Volcanic activity intensifies and spreads
- New fissures reveal more ancient structures
- Region becomes strategic priority for multiple powers

**Major Threats:**
- Awakened artifacts with active defenses
- Factions attempting to control or destroy nodes
- Cultists trying to accelerate activation
- Ecological catastrophe from unchecked volcanic activity

**Party Involvement:**
- Major expeditions into deep facilities
- High-stakes decisions about network interference
- Diplomatic missions between factions
- Confronting the question: Can the network be controlled?

### Tier 4 (Levels 17-20): Crisis Point

**Developments:**
- Emberlands network approaches full activation
- Effects begin spreading to adjacent regions
- Connection to Far North network becomes obvious
- Regional stability at critical point

**Endgame Relevance:**
- Emberlands node must be addressed as part of continental solution
- Decisions here affect entire world
- Party may need to coordinate responses across multiple regions
- Success or failure reshapes the Known World

---

## Key Revelations for Players

Information players should eventually discover (through investigation and exploration):

### Early Revelations (Levels 5-8)
- Volcanic activity follows unnatural patterns
- Something artificial lies beneath the mountains
- Eclipse Day effects were coordinated, not random
- Multiple locations show similar anomalies

### Mid-Campaign Revelations (Levels 9-13)
- Ancient Aeorian facilities exist under major volcanoes
- The network is actively reawakening
- Emberlands phenomena connected to Far North events
- The cults are responding to real signals—but misinterpreting them

### Late Campaign Revelations (Levels 14-18)
- Full scope of the continental artifact network
- The network's original purpose and capabilities
- Why Eclipse Day triggered reactivation
- The consequences of full activation vs. shutdown

### Endgame Revelations (Levels 19-20)
- Who or what triggered the initial pulse
- The network's ultimate function in Aeorian civilization
- Options for resolving the crisis
- The price of each solution

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Notable DM-Only Locations

These locations exist but are not in player-facing documents.

### The Burning Deep

**Type:** Major Aeorian facility  
**Location:** Beneath the Ashen Plains  
**Size:** Kilometers of corridors, dozens of chambers  
**Status:** Partially active

**Description:**  
The largest intact Aeorian structure in the Emberlands, the Burning Deep is a geothermal power station that once regulated heat flow across the southern continent. Its reactivation is causing widespread volcanic destabilization.

**Key Features:**
- Central control chamber with active interface
- Heat regulation conduits extending to multiple volcanoes
- Elemental containment facilities (some breached)
- Automated maintenance systems (still functioning)
- Records room with Aeorian documentation

**Campaign Use:**
- Mid-to-late tier major dungeon
- Contains crucial information about the network
- Offers potential to stabilize or worsen regional conditions
- Multiple factions want access—some to study, some to destroy

### The Glass Gardens

**Type:** Artifact resonance field  
**Location:** Hidden valley in Emberdeep Canyons  
**Status:** Active and growing

**Description:**  
A field of crystalline formations that grow from the ground like plants. They resonate with artifact energy and display information through light patterns and harmonic frequencies.

**True Nature:**  
These are data storage crystals—the Aeorian equivalent of archives. They're attempting to display stored information but lack proper interface systems.

**What They Contain:**
- Maps of the artifact network
- Technical documentation (in Aeorian script)
- Historical records of pre-Calamity events
- Warning messages about system limitations

**Campaign Use:**
- Information resource if party can decipher output
- Fragile—improper handling causes data corruption
- Coveted by researchers, feared by cultists
- May provide keys to controlling or understanding network

### The Forge Nexus

**Type:** Artifact-enhanced metallurgical facility  
**Location:** Beneath Cindermarch (unknown to surface dwellers)  
**Status:** Intermittently active

**Description:**  
An ancient chamber where Aeorian metallurgists created materials impossible to forge naturally. It's directly beneath the city's modern forges, occasionally influencing their output.

**Effects:**
- Random magical properties in forged items
- Unusual ore manifestations
- Enhanced or disrupted forge temperatures
- Strange alloys with unexplained properties

**Campaign Use:**
- Explains "lucky" forge successes in Cindermarch
- Source of Echo-touched materials
- Could be accessed and controlled—if discovered
- Potential bargaining chip between factions

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Faction Secret Agendas

What various factions truly want in the Emberlands (information players shouldn't have immediately):

### Ashfall Hold (Dwarven Researchers)

**Public Goal:** Understand and stabilize volcanic activity  
**Secret Goal:** Gain control of artifact technology for Stonebound advancement

**Leadership Divisions:**
- **Conservative faction:** Want to shut down all artifact activity
- **Progressive faction:** Want to study and potentially use the technology
- **Secret faction:** Already experimenting with captured artifacts

**Ultimate Plan:**
If they can control even one node, the Stonebound Depths gains enormous leverage over other regions.

### Emberlands Cults

**Public Belief:** Serving the will of the Flame-Mother  
**Secret Reality:** Most are unknowing pawns, but some leaders understand more

**High Flame Meridax's Truth:**
- Has been inside artifact facilities
- Knows the "divine voice" is technological
- Believes ancient power should be released regardless
- Willing to sacrifice thousands for "transformation"

**Danger:**
The cults could accidentally trigger catastrophic activation through uninformed interference.

### Cindermarch Fire Council

**Public Stance:** Pragmatic survival and economic stability  
**Secret Concern:** Loss of control and potential evacuation

**Hidden Plans:**
- Evacuation routes prepared but not publicized
- Secret negotiations with Solaris for refugee acceptance
- Contingency plans to relocate population if necessary
- Some members profiting from crisis (selling escape routes, hoarding supplies)

### Vharoxis Interests

**Public Activity:** Simple trade in rare materials  
**Secret Operation:** Systematic artifact smuggling network

**True Goals:**
- Acquire artifact components for powerful clients
- Map network for information value
- Position Vharoxis as broker for artifact technology
- Prevent any one faction from gaining control

**Methods:**
- Bribed officials in multiple settlements
- Agents embedded in research teams
- Criminal expeditions into restricted areas
- Assassination or sabotage of competing interests

---

## Campaign Integration Notes

### Connecting to Northreach

**Shared Mysteries:**
Both regions experienced dramatic Eclipse Day events. Comparing notes reveals:
- Identical timing of phenomena
- Similar artifact signatures
- Matching geometric patterns
- Connected network architecture

**Research Collaboration:**
Mid-campaign, Northreach Wardens and Emberlands researchers might begin sharing information, providing players with broader context.

### Connecting to Stonebound Depths

**Cultural Links:**
- Dwarven population in both regions
- Shared research traditions
- Similar discoveries of artifact resonance
- Growing realization that Stonebound's "geomancy" is actually artifact interaction

**Political Implications:**
If Stonebound Depths realizes the scope of artifact networks, it changes their entire civilization's understanding of their magical traditions.

### Connecting to Far North

**Direct Network Link:**
The Emberlands and Far North facilities are nodes in the same system. Activity in one region affects the other.

**Parallel Escalation:**
As the Far North network awakens, the Emberlands responds. The party may need to address both regions to solve the crisis.

---

## DM Guidance

### Revealing Secrets

**Pacing:**
- Don't reveal everything at once
- Let players earn discoveries through investigation
- Connect revelations to character backgrounds and motivations
- Use NPC researchers as sources of partial information

**Methods:**
- Exploration of ancient facilities
- Decoding Aeorian texts and diagrams
- Interrogating cultists who've had visions
- Observing patterns in volcanic activity
- Consulting with dwarven geomancers
- Witnessing artifact activation events

### Moral Complexity

**Key Questions for Players:**
- Is the artifact network inherently dangerous, or just misunderstood?
- Should ancient technology be destroyed, studied, or used?
- Who has the right to make decisions affecting entire regions?
- Are the cultists' warnings valid despite their insanity?
- What's worse: the network activating, or the consequences of stopping it?

### Consequences

**Player Choices Matter:**
- Destroying nodes might cause worse eruptions
- Controlling nodes might require terrible sacrifices
- Ignoring the problem guarantees disaster
- Different solutions favor different factions
- No perfect answer exists

---

## The Emberlands Endgame

Ultimate outcomes depend on player choices across the campaign:

### If the Network Activates Fully

**Immediate Effects:**
- Volcanic activity becomes perfectly controlled—but not by anyone living
- Temperature regulation systems attempt to return planet to Aeorian specifications
- Ecological transformation begins
- Current civilization's infrastructure becomes incompatible

**Long Term:**
- Emberlands could become paradise or wasteland depending on network parameters
- Ancient power available—at the cost of autonomy
- The world itself becomes a managed system

### If the Network Is Destroyed

**Immediate Effects:**
- Catastrophic eruptions as containment systems fail
- Massive energy release causes region-wide destruction
- Thousands die in immediate aftermath
- Geological instability spreads to adjacent regions

**Long Term:**
- Natural volcanic patterns eventually resume
- Region remains dangerous but predictable
- Ancient knowledge lost forever
- Other networks unaffected—crisis continues elsewhere

### If the Network Is Controlled

**Immediate Effects:**
- Requires constant maintenance and skilled operators
- Factions compete for control
- Potential for weaponization
- Unstable political situation

**Long Term:**
- Those controlling the network hold enormous power
- Potential for benefit—or catastrophic misuse
- Target for every faction and power
- Knowledge spreads—other networks become targets

---

*The Emberlands burn because something beneath the stone is waking—and it remembers a world that no longer exists.*

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Adventure Hooks

### 1. The Crystal Fissure

**Level:** 5-8  
**Type:** Investigation, exploration

A new fissure opens in the Ashen Plains, revealing glowing crystals that hum with strange energy. Multiple factions want samples, but the fissure is unstable and guarded by awakened elementals.

**Complications:**
- The crystals' energy signature resembles reports from Northreach
- Cultists claim the crystals are "sacred"
- Taking samples may cause the fissure to collapse
- The crystals seem to respond to the presence of magic

### 2. The Awakened Flame-Mother

**Level:** 7-10  
**Type:** Investigation, social conflict

A powerful cult in Cindermarch claims the Flame-Mother has "awakened" and speaks to them. They're gaining followers rapidly and disrupting civic order. The Fire Council hires the party to investigate—are the cultists frauds, genuinely touched by divine power, or something else entirely?

**Complications:**
- Some cult claims can be verified
- The cult leader displays genuine magical power
- Shutting them down could trigger riots
- They may have information about Eclipse Day events

### 3. Lost in the Deep

**Level:** 8-12  
**Type:** Rescue, dungeon exploration

A dwarven research team disappeared inside Mount Kharzun's deep tunnels three weeks ago. Ashfall Hold offers substantial payment for their rescue. The party must navigate unstable passages, avoid magma flows, and discover what the researchers found that prevented their return.

**Complications:**
- The researchers uncovered something they shouldn't have
- Sections of the mountain are exhibiting impossible geometry
- Elemental creatures have become unusually aggressive
- Time is running out before the rescue becomes a recovery

### 4. Embertrail Under Siege

**Level:** 6-9  
**Type:** Combat, defense

Fire-touched beasts—animals corrupted by volcanic magic—are attacking Embertrail's caravan. The assault is organized and relentless, unlike normal wildlife behavior. The party must defend the caravan, discover what's driving the beasts, and find a solution before Embertrail is destroyed.

**Complications:**
- The beasts were once normal animals
- Something is corrupting wildlife across the region
- Killing the beasts may not address the root cause
- The phenomenon is spreading

### 5. Ruin in the Lava

**Level:** 10-14  
**Type:** Exploration, discovery

A major volcanic eruption uncovers ruins of unknown origin buried beneath layers of cooled lava. The architecture doesn't match any known civilization, and the artifacts within radiate powerful magic. Multiple factions race to claim whatever lies within.

**Complications:**
- The ruin's age predates known history
- Its design resembles descriptions of Aeorian architecture
- The magic within is still active—and dangerous
- Whatever buried the ruin may still be present

---

*The Emberlands burn—but the question remains: is that fire natural, or is something beneath the stone waking up?*

\page
<!-- FILE_END: ../World Building/DMEyesOnly/Emberlands.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/ShatteredCoast.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: Shattered Coast Secrets**

This document contains the hidden truth about the maritime frontier. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/06_Shattered_Coast.md`
}}

# 🌊 THE SHATTERED COAST — DM SECRETS
**The Hidden Truth About the Maritime Frontier**

---

This document contains secrets about the Shattered Coast that should be revealed gradually through play. The information here is not known to most NPCs — and discovering it could change the course of the campaign.

---

## The Core Truth

**The Shattered Coast is one of the primary distribution points for artifact fragments drifting south from the Far North.**

The coastal communities do not understand what's happening. They see fragments washing ashore, strange currents, and impossible phenomena — but they don't realize they're witnessing the awakening of an ancient Aeorian network beneath the ocean floor.

---

## Why Fragments Wash Ashore

As the artifacts begin to awaken:
- **Dormant nodes beneath the ocean floor destabilize**  
- **Currents shift** in response to energy flows  
- **Fragments break loose** from sediment and ruins  
- **Glowing debris rises** from the depths, carried by artificial currents  

These fragments are:
- Unpredictable in their effects  
- Dangerous to handle without knowledge  
- Highly sought after by Vharoxis smugglers  
- Misunderstood by coastal druids (who sense power but not purpose)  
- Feared by storm-priests (who recognize unnatural magic)  

**The fragments are not inert relics. They are components of an active system.**

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## The Gravewater Trench

### What Lies Beneath

The Gravewater Trench contains:

**A partially submerged Aeorian megastructure**  
Vast and still partially functional, this facility extends deep into the ocean floor. It was designed to survive catastrophic events — and it did.

**Dormant artifact conduits**  
Network connections that once linked this facility to others across Aevoria. They are beginning to reactivate, creating the glowing currents visible from the surface.

**Ancient constructs trapped in silt**  
Preservation protocols kept them dormant for millennia. Now, with power returning, some are beginning to stir.

**A core node beginning to pulse**  
The heart of the facility. Its awakening is causing all the coastal anomalies. Each pulse sends energy through the network — and artifacts respond.

### The Oceanic Counterpart

The Gravewater Trench is to the ocean what Salsvault is to Northreach:
- A major Aeorian facility  
- A nexus point in the artifact network  
- A source of fragments and anomalies  
- A location that will eventually need to be explored  
- A threat that grows stronger with time  

**But the Trench is bigger. And it's more intact.**

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Eclipse Day — The Hidden Truth

### What Really Happened

The glowing currents were caused by **a pulse from the submerged artifact node**.

**The Pulse:**
- Synchronized with Eclipse Day events across Aevoria  
- Activated dormant systems in the underwater facility  
- Sent a status report through the network  
- Received a response from other nodes  
- Established communication protocols  

**This was the first sign that the oceanic artifacts are awakening.**

### The Shipwreck with No Crew

The vessel found on shore was:
- Passing directly over the Gravewater Trench during Eclipse Day  
- Caught in an energy discharge from below  
- The crew was not killed — they were **taken**  
- Pulled underwater by constructs following retrieval protocols  
- The constructs mistook humans for Aeorian personnel  

**The crew is still alive, trapped in air-filled chambers deep in the facility.**

The party could potentially rescue them — if they can reach the depths and navigate the reactivating systems. The crew has learned things down there. Things about what the facility was built to do.

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Long-Term Role in the Campaign

### Early Campaign

The Shattered Coast becomes:
- A source of mysterious artifacts washing ashore  
- An early warning of the ocean's involvement  
- A connection point between Northreach and broader world  
- A place where the Wardens hear rumors of deeper mysteries  

### Mid-Campaign

The coast becomes:
- A battleground for relic trafficking  
- A source of intelligence about the artifact network  
- A region where Corsair knowledge proves valuable  
- A place where uncomfortable alliances must be forged  

### Late Campaign

The coast represents:
- A maritime front of the artifact awakening  
- A region where the sea itself begins to behave strangely  
- A location where the Wardens will uncover clues about oceanic nodes  
- A potential disaster zone if the Trench facility fully activates  

### Epic Campaign

The Shattered Coast could become:
- A major threat if oceanic facilities rise  
- A source of underwater technology and knowledge  
- A battleground requiring naval cooperation  
- A key to understanding the full scope of the Aeorian network  

**The ocean represents a frontier the party cannot ignore.**

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## The Underwater Facility — Details

### Purpose

The facility beneath the Gravewater Trench was an Aeorian **research and manufacturing complex** specializing in:
- Adaptive magical systems  
- Environmental manipulation  
- Aquatic constructs  
- Deep-sea resource extraction  
- Weather control experiments  

**It was designed to be self-sufficient and survive any catastrophe.**

### Current Status

**Power:** 15% and rising  
**Constructs Active:** Less than 1%  
**Core Intelligence:** Dormant but stirring  
**Network Connection:** Establishing  
**Threat Level:** Growing exponentially  

### What Will Happen If Nothing Is Done

**Short Term (Months):**
- More fragments wash ashore  
- Currents become more dangerous  
- Storms intensify  
- Marine life increasingly affected  
- Disappearances increase  

**Medium Term (Year):**
- Surface manifestations begin  
- Constructs emerge from the water  
- Coastal settlements threatened directly  
- Trade routes completely disrupted  
- Evacuation becomes necessary  

**Long Term (Years):**
- Facility rises toward surface  
- Core intelligence fully awakens  
- Weather control systems activate  
- Continental threat established  
- Must be addressed or world changes forever  

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Key NPCs and Their Secrets

### Captain Mara Bloodtide (Blackwake Corsairs)

**Public Face:**  
Ruthless pirate captain, leader of the Blackwake Corsairs, profit-driven and amoral.

**Hidden Truth:**  
Mara lost her entire original crew to an underwater anomaly five years ago. She survived but saw things down there — structures, lights, movement. She's been quietly investigating ever since, trying to understand what killed her crew.

**Knowledge:**
- Has a rough map of underwater anomaly zones  
- Knows the safest routes (and most dangerous)  
- Suspects something ancient is down there  
- Will work with party if they prove competent  
- Price: Help her understand what she saw  

**Secret:** She has a fragment of Aeorian metal she recovered from the site of her crew's death. It hums when she's near the ocean. She doesn't know what it means.

### Storm-Priest Veyara (Breakwater Haven)

**Public Face:**  
Respected spiritual leader, weather forecaster, provider of blessings.

**Hidden Truth:**  
Veyara's storm-magic has been growing stronger since Eclipse Day — but so have her nightmares. She dreams of drowning, of breathing water, of voices singing in a language she shouldn't understand but somehow does.

**Knowledge:**
- Recognizes the storms are not natural  
- Knows the traditional omens are failing  
- Suspects divine or primal forces awakening  
- Seeks answers desperately  
- Will aid party if they investigate  

**Secret:** Her connection to the sea is changing. She's developing abilities she shouldn't have — like breathing underwater briefly, or sensing things in the depths. She's terrified this means she's being chosen for something.

### Elder Torwin (Tide's Rest)

**Public Face:**  
Ancient druid, leader of the Elder Circle, keeper of traditions.

**Hidden Truth:**  
Torwin has been alive for over two hundred years through druidic longevity. He remembers stories from his predecessors — stories of "when the sea was awake." He recognizes what's happening now matches those ancient tales.

**Knowledge:**
- Knows the ocean was once "alive" with intelligence  
- Believes it's awakening again  
- Has fragments of old lore about "singing stones" underwater  
- Knows ritual sites that correspond to underwater structures  
- Will share knowledge if party proves worthy  

**Secret:** The druids of Tide's Rest have been serving as unknowing caretakers for the underwater facility. Their rituals have actually been maintaining dormant systems. Now those systems are reactivating — and the druids' magic is being drained to fuel them.

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Running the Shattered Coast

### Atmosphere

- Beautiful but deadly  
- Ocean as a character — mysterious, powerful, waking  
- Tension between profit and survival  
- Ancient things stirring beneath waves  
- Time running out  

### Key Themes

- **The unknowable deep** — mysteries beneath the surface  
- **Profit vs. preservation** — salvage temptation vs. safety  
- **Nature vs. artifice** — the sea's awakening is not natural  
- **Communication breakdown** — the sea "speaks" but who understands?  
- **Rising tide** — threat growing inexorably  

### Foreshadowing the Threat

**Early Signs:**
- Fragments with recognizable patterns  
- Survivors describing underwater structures  
- Navigation magic failing  
- Marine life behaving intelligently  
- Compulsion effects near certain waters  

**Medium Signs:**
- Constructs emerging briefly  
- Entire ships vanishing  
- Underwater lights visible at night  
- Temperature and current impossibilities  
- "Singing" heard underwater  

**Late Signs:**
- Surface structures manifesting  
- Direct attacks from below  
- Weather control becoming obvious  
- Evacuations necessary  
- Regional crisis  

---

## Connection to the Broader Campaign

### The Aeorian Echo

The Shattered Coast is a major node in the Echo. The underwater facility is:
- Part of the same network as Salsvault  
- Possibly more advanced due to preservation  
- A test of the party's adaptability  
- A source of vital intelligence  
- A threat that cannot be ignored  

### Other Regions

**Vharoxis:**  
Will traffic artifacts from the coast. The party may need to work with criminals to track fragment movement.

**Solaris:**  
Will send expeditions to investigate. The party may ally with or compete against Solarian scholars.

**Northreach:**  
Will provide context. The party can compare coastal anomalies to Salsvault effects and recognize patterns.

**The Far North:**  
The ultimate source. Understanding the coast helps understand the broader awakening.

---

## Adventure Seeds

### The Singing Depths

The druids of Tide's Rest hire the party to investigate why their magic is being drained. Trail leads to underwater structure that's "singing" — actually data transmission that sounds like music. Party must decide whether to shut it down, study it, or leave it alone.

### The Missing Crew

Rumors suggest the crew from the Eclipse Day shipwreck might still be alive, trapped underwater. Corsairs offer to help rescue them — for a price. The crew has information about the facility that could be vital.

### The Fragment War

Multiple factions compete for a powerful fragment that washed ashore. Party must navigate political intrigue, theft, violence, and moral complexity to determine who should have it — or if anyone should.

### Storm-Priest's Visions

Veyara seeks help interpreting her nightmares. Party investigates, discovers she's being affected by proximity to awakening artifacts. Must find way to protect her or help her understand her transformation.

### The Corsair's Map

Captain Bloodtide offers a deal: she'll share her map of underwater anomalies if the party helps her understand what killed her crew. Investigation reveals larger pattern — and suggests the facility is much bigger than anyone realized.

### The Drowned Temple

A ritual site used by Tide's Rest druids is flooding. Elder Torwin asks party to investigate. Site turns out to be directly above a facility access point. Party must decide whether to seal it or explore it.

---

*"The sea remembers. The sea awakens. And the sea has plans we do not understand."*

— Elder Torwin of Tide's Rest, to the Northwatch Wardens


{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Adventure Hooks

### A Relic from the Deep

A shipwreck washes ashore carrying a relic that hums with Echo-energy. Multiple factions want it — Solaris scholars, Vharoxis smugglers, the Blackwake Corsairs, and Tide's Rest druids. The party must decide who gets it — or keep it themselves.

### The Glowing Currents

A storm-priest hires the party to investigate glowing currents beneath the waves. The expedition reveals structures far below — ancient, active, and aware of intruders.

### Diplomatic Disaster

Pirates seize a Solaris diplomat traveling by sea. Multiple factions want them rescued… or silenced. The party must navigate political intrigue while racing against time.

### The Missing Salvage Crew

A salvage crew disappears near the Gravewater Trench. Their last message spoke of "singing" from below. The party is hired to investigate — and discovers something down there is calling to people.

### The Sea Remembers

Tide's Rest druids claim the sea is "remembering something." They hire the party to investigate a specific coastal location where the memories are strongest. What they find suggests the ocean itself has a history — and an agenda.

### Corsair Complications

The party needs passage along the coast. Only the Blackwake Corsairs are willing to sail these dangerous waters — for a price. The price involves a job that's far more dangerous than advertised.

### The Lighthouse Mystery

A lighthouse keeper goes missing, but the light continues to function. Investigation reveals the keeper's journal documenting strange underwater phenomena — and suggestions that something is watching from below.

---

*"The sea doesn't forgive. It doesn't forget. And lately, it doesn't sleep."*

— Storm-Priest Veyara of Breakwater Haven

\page
<!-- FILE_END: ../World Building/DMEyesOnly/ShatteredCoast.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/StoneboundDepths.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: Stonebound Depths Secrets**

This document contains DM-only secrets about the Stonebound Dwarves. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/04_Stonebound_Depths.md`
}}

# The Stonebound Depths: DM-Only Secrets

## The Hidden Truth

The Stonebound Dwarves are unwitting custodians of dormant artifact cores.

The "Deep Roots" they revere are not geological formations—they are ancient artifact structures embedded in the bedrock.

Their entire magical tradition—runes, resonance, vibration shaping—developed from interacting with these dormant cores.

### Why They Don't Know the Truth

- The artifacts have been inert for thousands of years
- Their resonance is faint and stable
- Dwarven culture interprets everything through stone
- They assume the Deep Roots are natural

Their worldview blinds them to the truth.

---

## Eclipse Day: The Awakening

The Heartstone's hum was the first sign of awakening.

**What Actually Happened:**
- The Heartstone (an Aeorian artifact core) received an activation signal
- Network protocols began initializing after millennia of dormancy
- Energy surged through the Deep Roots network
- Dormant systems started diagnostic routines
- The artifacts are waking up

The dwarves recorded the tremors as a new "verse," but they do not understand what it means.

---

## Connection to the Aeorian Echo

The dwarves' geological records contain patterns that match the Echo's pulses.

**The Pattern:**
- Seismic readings for the past 3,000 years show periodic "songs"
- These songs correspond to artifact network status checks
- The patterns have been stable for millennia
- Since Eclipse Day, the patterns have changed dramatically
- New "verses" are actually network reactivation sequences

They are close—dangerously close—to discovering the truth.

**What the Deep-Readers Don't Realize:**
- Their entire science is based on reading machine language as poetry
- "Stone-songs" are data transmissions
- "Tremor patterns" are network traffic
- "New verses" are activation protocols
- They've been unconscious witnesses to dormant technology

---

## The Heartstone Core

### What It Really Is

**Technical Details:**
- Aeorian artifact core (Class IV power distribution node)
- Originally part of continental-scale energy network
- Designed to collect, store, and redistribute magical energy
- Connected to Salsvault and all other nodes
- Capable of powering city-scale operations
- Currently in early-stage reactivation

**Physical Reality:**
- Not a crystal—a crystalline matrix housing technology
- Internal structure is impossibly precise (not natural)
- Metallic veins are conductive pathways
- Geometric facets are interface surfaces
- Internal glow is status indicator
- Hum is diagnostic routine

**Why Dwarves Don't Know:**
- Built their capital around it 3,000 years ago
- Found it already here, dormant
- Interpreted as natural geological wonder
- Cultural assumptions prevented recognition
- Technology so advanced it appears magical
- Millennia of stability reinforced wrong interpretation

### Current State

**Activation Progress:**
- 3% capacity (slowly increasing)
- Running diagnostic protocols
- Establishing network connections
- Testing power distribution
- Mapping connected systems
- Preparing for full activation

**Observable Effects:**
- Audible humming (increasing frequency)
- Light pulses (network handshakes)
- Vibration patterns (data transmission)
- Rune shifting (interface activation)
- Crystal formation (energy discharge)
- Temperature fluctuations (power cycling)

**Dangerous Implications:**
- Full activation could overload dwarven city
- Energy discharge might destroy infrastructure
- Network connection could extend Aeorian influence
- Dwarven resonance magic might amplify effects
- Or: could be used to counter other nodes
- Truth will shatter dwarven cultural foundation

---

## The Deep Roots Network

### What They Actually Are

**Not Geological:**
- Metal and crystal structures embedded in bedrock
- Part of Aeorian infrastructure
- Energy conduits and data pathways
- Predates dwarven settlement by thousands of years
- Extends throughout mountain range
- Connected to surface facilities (now buried)

**The Dwarven Misunderstanding:**
- Mistook for natural mineral veins
- Interpreted vibrations as "earth's song"
- Built civilization around artifact network
- Developed magic by studying emanations
- Created entire cultural identity from misinterpretation

### Network Structure

**Components:**
- Heartstone (primary node)
- Deep Roots (distribution network)
- Resonant metal veins (data pathways)
- Crystal formations (energy storage)
- Sealed ancient levels (original facilities)
- Forgotten Deeps (maintenance tunnels)

**Current Activity:**
- Network reactivating section by section
- Energy flowing through dormant pathways
- Systems performing self-diagnostics
- Constructs in deepest levels awakening
- Original Aeorian security protocols initializing
- Unknown automated responses possible

---

## The Forgotten Deeps

### What's Really Down There

**Original Purpose:**
- Aeorian research facility
- Artifact testing chambers
- Energy distribution hub
- Security systems
- Automated maintenance
- Emergency backup systems

**Current State:**
- Sealed by dwarves millennia ago (dangerous tremors)
- Actually: automated systems still partially active
- Constructs in standby mode (now waking)
- Ancient wards (Aeorian security) activating
- Environmental hazards (energy discharge)
- Original experiments remain (unstable)

**Specific Dangers:**
- Awakening warforged/constructs (ancient Aeorian)
- Automated defense systems
- Reality-warping experiments
- Contained entities (still imprisoned)
- Environmental hazards
- Truth about dwarven civilization's foundation

---

## NPC Secrets

### Deep-Reader Borin Stonescript

**What He Suspects:**
- Patterns don't match any natural geological phenomenon
- Historical records contain anomalies
- Some readings mathematically impossible for stone
- Ancient texts describe things that sound like technology
- Heartstone structure defies geological formation processes

**What He's Hiding:**
- Private research into alternative explanations
- Correspondence with surface scholars
- Growing terror about implications
- Knowledge that would shatter Council consensus
- Evidence he's afraid to present

**His Dilemma:**
- Reveal truth and destroy cultural foundation?
- Stay silent and risk catastrophe?
- Seek outside help but admit ignorance?
- Continue research and hope for better answer?

### Rune-Singer Thalia Deepchant

**What She's Experiencing:**
- Spells working differently since Eclipse Day
- Resonance magic amplified unpredictably
- New harmonics appearing
- Ancient runes activating spontaneously
- Feeling like she's "connecting to something"

**What's Really Happening:**
- Aeorian systems responding to her resonance magic
- Network treating her magic as input commands
- Accidentally interfacing with artifact protocols
- Unknowingly learning to control Aeorian technology
- Could become bridge between dwarven magic and Aeorian tech

**Her Potential:**
- Most likely to adapt if truth revealed
- Natural talent for artifact manipulation
- Open-minded enough to accept reality
- Could develop new forms of magic
- Key to safely interfacing with Heartstone

### Forgemaster Grimnar Ironvein

**What He Found:**
- Strange tool in deepest mine
- Metal that shouldn't exist
- Design that makes no sense
- Tool "works" but defies understanding
- Impossible precision and functionality

**What He's Hiding:**
- The tool in secret vault
- Knowledge it's not dwarven-made
- Fear of what it implies
- Experiments trying to replicate it
- Growing suspicion about Deep Roots

**The Tool:**
- Aeorian precision instrument
- Multi-functional device
- Self-powered (mysteriously)
- Interfaces with artifact materials
- Could unlock deeper understanding
- Or reveal uncomfortable truths

### Mining Guildmaster Kara Gemcutter

**What Her Miners Report:**
- Constructs in deepest veins
- Metal structures in "natural" formations
- Rooms where there shouldn't be rooms
- Echoes that sound like voices
- Tools that move on their own

**What She's Doing:**
- Quietly sealing affected sections
- Relocating miners with non-disclosure agreements
- Coordinating with Commander Thorek
- Preparing for potential evacuation
- Hiding truth from general population

**Her Fear:**
- Something is waking up below
- Mining operations might have triggered it
- Can't stop mining (economic collapse)
- Can't reveal truth (social collapse)
- Trapped between disasters

### Commander Thorek Shieldbreaker

**His Preparations:**
- Military readiness drills (secret)
- Evacuation routes mapped
- Supply caches established
- Elite units on standby
- Contingency plans for structural failure

**What He Knows:**
- More than he should
- Sources in every district
- Truth about sealed levels
- Real danger assessments
- Council isn't telling everything

**His Readiness:**
- Can evacuate Upper Reaches in hours
- Plans for fighting unknown threats
- Prepared for worst-case scenarios
- Waiting for Council's call
- Ready to act independently if necessary

---

## The Vibration Code

### What It Means

**The Patterns:**
Heartstone pulses encode information in Aeorian language:

- Network status reports
- Activation sequences
- Diagnostic results
- Connection protocols
- Emergency broadcasts
- Instructions for maintenance

**If Decoded:**
- Crucial intelligence about network
- Understanding of artifact systems
- Potential control mechanisms
- Warning signs of danger
- Method to safely deactivate
- Or: method to weaponize

**The Problem:**
- Decoding reveals truth about Heartstone
- Truth undermines entire civilization
- Knowledge might be necessary for survival
- But could cause cultural collapse
- Timing of revelation crucial

---

## Campaign Integration

### Early Campaign (Levels 1-5)

**Distant Rumors:**
- Earthquakes in Stonebound Depths
- Dwarven merchants mention unusual activity
- Increased trade in rare metals
- Stories of strange discoveries

**Possible Encounters:**
- Dwarven prospector in Northreach
- Metalwork with unusual properties
- Rumors of "singing stones"
- Trade goods with faint magical aura

### Mid Campaign (Levels 6-10)

**Direct Contact:**
- Dwarven scholars request assistance
- Seismic correlation with Northreach phenomena
- Invitation to investigate Heartstone
- Trade mission reveals concerns
- Political complications

**Adventures:**
- Escort mission to Depths
- Investigation of Heartstone chamber
- Deep mine rescue operation
- Ancient level exploration
- Diplomatic mission mediating factions

### Late Campaign (Levels 11-15)

**Crisis Point:**
- Truth about Heartstone revealed
- Cultural crisis erupts
- Evacuation vs. adaptation debate
- Party must choose sides
- Dwarven knowledge crucial to final solution

**Major Decisions:**
- Help dwarves discover truth?
- Conceal information to prevent panic?
- Use Heartstone against other nodes?
- Risk dwarven city to save world?

### Epic Campaign (Levels 16-20)

**Final Confrontation:**
- Heartstone as weapon, shield, or bomb
- Dwarven resonance magic counters artifacts
- Or amplifies them catastrophically
- Moral choice: sacrifice city to save world?
- Or: discover way to safely deactivate

**Possible Outcomes:**
- Heartstone repurposed as defensive tool
- Network disrupted from this node
- Dwarven magic evolved to control artifacts
- City evacuated, Heartstone destroyed
- Stalemate: city sealed, threat contained
- Integration: dwarves adapt, learn truth

---

## Adventure Seeds

### Discovery Adventures

**The Impossible Formation:**
- Miners uncover chamber with geometric perfection
- Metal structures in "natural" stone
- Working mechanisms despite millennia of age
- Glowing panels with unknown symbols
- Constructs in standby mode

**The Speaking Stone:**
- Specific crystal formation broadcasts signals
- Only certain people can "hear" it
- Patterns repeat in mathematical precision
- Deep-Readers can't explain it
- Actually: Aeorian distress beacon

**The Ancient Map:**
- Found in sealed level
- Shows Depths before dwarven settlement
- Marks locations called "nodes"
- Heartstone clearly indicated
- Other marked sites don't match current geography
- Truth: map of Aeorian network

### Crisis Adventures

**The Awakening Construct:**
- Ancient Aeorian guardian activates
- Begins "clearing" unauthorized inhabitants
- Dwarven weapons ineffective
- Must reach control chamber
- Truth about Deep Roots unavoidable

**The Cascade Failure:**
- Heartstone activation accelerating
- Energy surge threatens city
- Must shut down or redirect
- Requires understanding true nature
- Race against catastrophic overload

**The Cultural Schism:**
- Truth revealed to Council
- City divided on response
- Traditionalists deny reality
- Progressives demand action
- Moderates seek compromise
- Party must navigate crisis

### Research Adventures

**The Translation Project:**
- Recovering Aeorian texts from sealed levels
- Decoding Heartstone vibrations
- Consulting with other scholars
- Racing against time
- Knowledge vs. cultural stability

**The Comparative Study:**
- Comparing Depths patterns with other sites
- Salsvault correlation
- Network mapping
- Understanding full scope
- Implications terrifying

---

## Revelation Timing

### What Players Might Discover

**Early Clues (Levels 1-5):**
- Dwarven metalwork has unusual properties
- Stories of "singing mountains"
- Increased seismic activity correlates with other events
- Rare minerals appearing in trade

**Growing Evidence (Levels 6-10):**
- Patterns in dwarven records match Aeorian script
- Seismic readings form mathematical codes
- Heartstone described as "too perfect" to be natural
- Deep-Readers expressing private doubts

**Undeniable Truth (Levels 11-15):**
- Direct evidence of Aeorian construction
- Working artifact technology discovered
- Network connection proven
- Cultural crisis erupts

**Full Understanding (Levels 16-20):**
- Complete picture of network
- Dwarven role understood
- Strategic implications clear
- Decisions must be made

### Managing the Revelation

**Pacing:**
- Let players suspect before confirming
- Allow dwarven NPCs to doubt gradually
- Build evidence through multiple sources
- Make revelation feel earned, not sudden

**Emotional Impact:**
- Sympathetic portrayal of dwarves
- Cultural collapse is tragic
- No easy answers
- Player choices matter

**Mechanical Effects:**
- Understanding Heartstone grants advantages
- Dwarven allies crucial to solutions
- Resonance magic key to controlling artifacts
- Or to catastrophic failures

---

## Running the Revelation

### The Moment of Truth

**When to Reveal:**
- After players have grown attached to dwarven NPCs
- When stakes are high enough to matter
- When revelation serves story rather than derails it
- When players have agency to respond

**How to Reveal:**
- Through discovery, not exposition
- Multiple sources confirming
- NPCs reacting authentically
- Giving players time to process
- Allowing them to choose how to handle it

### Dwarven Reactions

**Denial:**
- Traditionalists refuse to believe
- Explain away evidence
- Attack credibility of sources
- Retreat into dogma
- Potential antagonists

**Acceptance:**
- Progressives face reality
- Struggle with implications
- Seek solutions
- Potential allies
- Character growth

**Adaptation:**
- Pragmatists focus on survival
- Learn to work with truth
- Develop new traditions
- Evolve culture
- Future of civilization

### Consequences

**Short Term:**
- Political turmoil
- Social unrest
- Economic disruption
- Potential violence
- Refugee crisis

**Long Term:**
- Cultural evolution
- New magical traditions
- Different relationship with artifacts
- Changed identity
- Survival or destruction

---

## DM Guidance

### Themes to Emphasize

**Science vs. Culture:**
- Truth challenges identity
- Knowledge vs. comfort
- Adaptation vs. tradition
- No villains, only perspectives

**Unconscious Witness:**
- Built civilization on misunderstanding
- Innocent mistake, profound consequences
- Wisdom without complete knowledge
- Humility in face of mystery

**The Cost of Truth:**
- Some knowledge destroys
- Ignorance has been protective
- Truth necessary for survival
- But survival isn't everything
- Cultural death vs. physical death

### Player Agency

**Give Players Choices:**
- Reveal truth or protect dwarves?
- Force adaptation or allow denial?
- Prioritize city or world?
- Find third option?

**Make Choices Matter:**
- Consequences for every path
- No perfect solution
- Sacrifices required
- Victories costly

### Emotional Beats

**Sympathy:**
- Dwarves are sympathetic
- Their mistake understandable
- Their pride admirable
- Their pain real

**Tragedy:**
- Cultural foundation false
- Identity based on misunderstanding
- Can't go back to innocence
- Loss is real even if necessary

**Hope:**
- Adaptation possible
- Culture can evolve
- Knowledge is power
- New traditions can honor old

---

## Final Notes

The Stonebound Depths represent a civilization built on a beautiful misunderstanding. They interpreted ancient technology through the lens of their values—stone, craft, endurance—and created something genuinely meaningful from it.

The tragedy isn't that they were wrong. The tragedy is that being right might cost them everything.

As DM, your job is to make players care about that cost while recognizing that truth might be necessary for survival. There are no easy answers here, and that's what makes this story powerful.

The dwarves have been reading the artifacts' instruction manual for three thousand years. They just thought it was poetry.

Now the poetry is becoming prose, and they must decide whether to close the book or learn to read it properly.

---

*"The stone doesn't lie. But apparently, it doesn't tell the whole truth either."*

— Deep-Reader Borin Stonescript, after his world changed forever


{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


## Adventure Hooks

- A dwarven rune-singer seeks help investigating a new harmonic anomaly near the Heartstone.
- A mining crew uncovers a Deep Root formation that begins to glow.
- A Solaris scholar disappears after entering the Depths without permission.
- A fragment smuggled from Vharoxis resonates with the Heartstone—dangerously.

### Additional Adventure Seeds

**Mining Mysteries**
- Miners find strange artifacts in new veins
- Sealed ancient level accidentally breached
- Tremors in pattern matching Northreach seismic events
- Crystal formation spelling out geometric code
- Something alive in the Forgotten Deeps

**Heartstone Investigation**
- Deep-Readers need outside perspective
- Patterns don't match any recorded
- Request help from surface scholars
- Foreign powers want access
- Heartstone showing impossible readings
- Some readers experiencing visions

**Resonance Magic Gone Wrong**
- Rune-singer's spell catastrophically amplified
- Wards failing in specific pattern
- Ancient enchantments activating spontaneously
- Forged items developing unexpected properties
- Communication-stones receiving signals from unknown source

**Political Intrigue**
- Council divided over interpretation
- Guild power struggle
- Clan rivalries exploiting uncertainty
- Foreign spies infiltrating
- Vharoxis attempting to steal secrets
- Succession crisis if situation worsens

**Geological Catastrophe**
- Increased tremors threatening structural integrity
- Underground river flooding
- Toxic gas venting from deep levels
- Crystal growth becoming dangerous
- Section of city must be evacuated
- Ancient wards preventing modern solutions

**Ancient Discoveries**
- Map found showing unknown levels
- Records suggesting dwarves didn't build first structures here
- Evidence civilization existed before them
- Sealed chamber with impossible contents
- Truth about "Deep Roots" emerging


---

## DM-Only Information

**For Game Masters:** Complete DM-only secrets, revelations, and campaign integration details for the Stonebound Depths are located in:

**`World Building/DMEyesOnly/StoneboundDepths.md`**

This file contains:
- The hidden truth about the Deep Roots and Heartstone
- Eclipse Day's real significance
- Connection to the Aeorian Echo
- NPC secrets and motivations
- The Vibration Code
- Campaign integration by level
- Adventure seeds and revelation timing
- Running guidance for this civilization's potential tragedy

---

## Quick Reference

**Key Locations:**
- Khardûn-Tharum (capital)
- Heartstone Plaza (artifact core chamber)
- The Forge-Spiral (resonant forges)
- Rune-Singers' Hall (magic amphitheater)
- Deep-Readers' Archive (geological records)
- Forgotten Deeps (sealed ancient levels)

**Major NPCs:**
- Forgemaster Grimnar Ironvein (traditionalist leader)
- Rune-Singer Thalia Deepchant (open-minded mage)
- Deep-Reader Borin Stonescript (troubled interpreter)
- Mining Guildmaster Kara Gemcutter (pragmatic)
- Commander Thorek Shieldbreaker (military)

**Central Conflicts:**
- Geological interpretation vs. truth
- Tradition vs. survival
- Pride vs. adaptation
- Community vs. evacuation
- Using Heartstone vs. abandoning it

**Echo Manifestation:**
- Seismic activity (artifact network)
- Heartstone humming (core activation)
- Resonance magic amplified
- Ancient levels awakening
- Constructs stirring

**Campaign Role:**
- Unconscious witnesses to artifact network
- Potential technology resource
- Sympathetic civilization at risk
- Moral complexity of sacrifice
- Alternative approach to Echo threat

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

*"The stone doesn't lie... but perhaps we've been asking it the wrong questions."*

— Deep-Reader Borin Stonescript, contemplating new seismic patterns

\page
<!-- FILE_END: ../World Building/DMEyesOnly/StoneboundDepths.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/SunkenDominion.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: Sunken Dominion Secrets**

This document contains DM-only secrets about the Sunken Dominion. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/09_Sunken_Dominion.md`
}}

# The Sunken Dominion: DM-Only Secrets

## The Hidden Truth

The Sunken Dominion is not a drowned mortal civilization.

It is the oceanic branch of the ancient artifact network—a megastructure spanning the ocean floor, built long before Aeor, long before elves or dwarves, long before any known culture.

---

## What the Dominion Actually Is

### Not a Civilization
The "ruins" are not the remnants of buildings, cities, or settlements. They are:
- A lattice of submerged artifact nodes
- A network of conduits channeling energy across the world
- A biological and arcane experimentation zone
- A stabilizing system for the planet's magical field

The structures serve purposes that mortal civilizations never imagined.

### The Artifact Network
The Dominion is part of the same system as:
- **Salsvault** (The Far North) — Primary control node
- **The Heartstone** (Stonebound Depths) — Geomantic resonance hub
- **The Deep Roots** (Stonebound) — Terrestrial conduit network
- **The Nullwood Silence** — Suppression field (elven response to network)

All of these are connected. All are awakening simultaneously.

### Its True Purpose
The Dominion was designed to:
- Regulate oceanic magical currents
- Monitor and stabilize planetary ley lines
- Conduct experiments on marine life adaptation
- Serve as energy distribution hub for coastal regions
- Maintain communication nodes across the ocean floor

It was infrastructure, not habitation.

---

## Why It's Drowned

### It Was Always Underwater

The Dominion was never on land. The sea did not swallow it. It was built beneath the waves.

**Why?**
- The builders needed to access deep-earth energy conduits
- Ocean currents provide natural cooling for energy systems
- Pressure differentials power certain artifact functions
- Marine environment ideal for biological experiments
- Isolation from surface disruption

The Dominion was an underwater laboratory and power station.

### The Architecture
What appear to be "towers" are:
- Energy transmission antennae
- Sensor arrays
- Vertical access shafts
- Experimental growth chambers
- Communication relay stations

What appear to be "cities" are:
- Organized node clusters
- Maintenance sectors
- Processing facilities
- Storage arrays
- Experimental zones

None of it was designed for living beings to inhabit—at least, not beings like humans, elves, or dwarves.

---

## Why Relics Wash Ashore

As the artifacts awaken, the Dominion experiences system failures and overloads.

### The Process
1. **Pressure changes:** Energy buildup destabilizes containment systems
2. **Currents shift:** Network activation alters oceanic flow patterns
3. **Fragments break loose:** Old structures fail under new stresses
4. **Dormant constructs rise:** Maintenance systems activate and surface
5. **Glowing debris drifts upward:** Energy discharge creates buoyancy

The artifacts weren't meant to leave the network, but the awakening is chaotic.

### What the Relics Actually Are
Most "relics" are:
- Component fragments from larger systems
- Experimental subjects (preserved organisms)
- Diagnostic tools
- Data storage crystals
- Energy regulators
- Biological interfaces
- Failed prototypes

They look like art, jewelry, or sculptures because humans interpret them through a cultural lens. They're actually pieces of ancient technology.

---

## The Drowned Gate

### What It Actually Is

The Drowned Gate is not an archway or monument. It is:
- A sealed access point to deeper network layers
- A maintenance portal for the entire oceanic system
- A failsafe containment mechanism
- A lock

### What It Guards

Beyond the Gate lies:
- Primary oceanic network hub
- Master control systems for all underwater nodes
- Experimental vaults (sealed for good reason)
- Energy storage reserves
- Something the builders locked away

The symbols on the Gate are not decorative. They are:
- Status indicators
- Warning labels
- Lock mechanisms
- System diagnostics
- Fail-safe protocols

### Why It's Responding

The Gate is responding to the awakening pulses from the Far North (Salsvault).

**The sequence:**
1. Salsvault sends activation signal
2. Network nodes receive and relay
3. The Gate recognizes the signal as legitimate
4. Lock protocols begin initialization
5. Symbols glow as systems power up
6. Seals start to weaken

The Gate isn't opening because someone wants it to. It's opening because the network commands it to.

---

## Eclipse Day: What Really Happened

### The Technical Truth

Eclipse Day was a network synchronization event.

**What occurred:**
- Salsvault sent a powerful pulse across the network
- All artifact nodes responded simultaneously
- The Dominion experienced massive energy surge
- Systems that had been dormant for millennia activated
- Network diagnostics ran for the first time in ages
- The entire oceanic grid synchronized

The glowing currents were **energy discharges**.  
The whirlpool was a **pressure vent**.  
The Glassspires lit up because the **network briefly synchronized**.

### The Aftermath

Since Eclipse Day:
- Network stability is increasing
- Systems are coming online in sequence
- Energy levels are building
- Diagnostic routines are running continuously
- The Gate's seals are weakening
- Dormant constructs are activating

This was the first sign that the oceanic nodes are waking.

---

## The Glowing Currents

### What They Actually Are

The currents aren't bioluminescent organisms or magical phenomena. They are:
- Visible energy flow through oceanic conduits
- Network traffic visualization
- Power distribution in liquid medium
- Communication pathways
- System status indicators

The glow is a side effect of energy moving through water.

### Why They Pulse

The rhythmic pulse is:
- Network heartbeat
- System synchronization timing
- Data packet transmission
- Energy regulation cycle
- Diagnostic ping

The pulse is getting faster because network activity is increasing.

### Why They're Dangerous

The currents carry:
- Raw magical energy
- Activation commands
- Corrupted data
- System errors
- Experimental overflow

Exposure causes:
- Magical contamination
- Mental influence
- Physical mutation
- Obsessive behavior
- Network connection

Divers who spend too long in the currents start to resonate with the network.

---

## The Coral Labyrinth

### Not Natural Growth

The coral formations aren't natural. They are:
- Biological experiments that succeeded
- Self-replicating structures
- Living interfaces
- Organic computing substrate
- Hybrid life forms

The builders created organisms that could grow in patterns determined by the network.

### The Patterns

The "unnatural" patterns are:
- Circuit layouts
- Data storage structures
- Antenna arrays
- Filter systems
- Access pathways

The labyrinth isn't a maze. It's organized infrastructure grown instead of built.

### Why It's Growing

Since Eclipse Day, growth has accelerated because:
- Network activation triggered growth programs
- Energy influx feeds the organisms
- System expansion requires more substrate
- Diagnostic routines need sensor networks
- The coral is doing what it was designed to do

It will continue growing until someone stops it—or until it completes its pattern.

---

## The Missing Divers

### What Happened to Them

Most didn't die. They were:
- **Absorbed:** Incorporated into hybrid experiments
- **Converted:** Transformed into network interfaces
- **Recruited:** Mentally connected to the network
- **Relocated:** Transported to sealed sectors
- **Archived:** Preserved for study

The Dominion doesn't kill unnecessarily. It repurposes.

### The Changed Ones

Some divers return, but they're not the same. They have been:
- Partially networked
- Mentally influenced
- Physically altered
- Mission-encoded
- Made into unknowing agents

They don't know what happened to them. They only know they need to go back.

### Captain Mira Saltwind

Mira is already partially connected. Her dreams are network communications. Her diving "instinct" is network guidance. Her obsession is programming.

She's becoming a bridge between the Dominion and the surface world.

Eventually, she'll complete the connection.

---

## The Abyssal Steps

### What They Lead To

The Steps descend to:
- Deepest network hub
- Master control chamber
- Primary experimentation vault
- Builder archive
- The source of everything

Each step is perfectly carved because they were never carved. They were **grown** or **formed** by the network.

### Why They're So Large

The Steps weren't built for humans. They were built for:
- Maintenance constructs (enormous)
- Biological experiments (various sizes)
- Energy beings (formless)
- The builders themselves (unknown form)

Whatever built this network, they weren't human-shaped.

### What Lives There

At the bottom of the Steps:
- Dormant constructs (awakening)
- Failed experiments (sealed)
- Successful experiments (thriving)
- Network guardians (active)
- Something the builders left behind (unknown)

No one has reached the bottom and returned. Yet.

---

## The Glassspire Ruins

### Not Crystal, Not Towers

The Glassspires are:
- Energy transmission arrays
- Sensor networks
- Communication relays
- Atmospheric interface points
- Surface monitoring stations

They rise from the seabed to breach the surface because they need to connect oceanic and atmospheric energy flows.

### Why They Refract Light

The "crystal" is:
- Metamaterial designed to focus energy
- Sensor arrays interpreting electromagnetic spectrum
- Data visualization made physical
- Communication through light patterns
- Side effect of energy processing

The kaleidoscopic displays are network traffic visualized through light refraction.

### What Happens When They're Fully Active

If the Glassspires reach full activation:
- They'll transmit energy to atmosphere
- Weather patterns will be controlled
- Communication range will be global
- Other networks will receive signals
- The world will know something is active

They're antennae broadcasting to the sky.

---

## Long-Term Role in Campaign

### The Dominion Becomes:

**1. Major Source of Awakened Fragments**
- Relics wash ashore constantly
- Artifacts spread across the world
- Factions compete for control
- Scholars try to understand
- Danger increases

**2. Battleground for Competing Interests**
- Cults try to commune with the network
- Scholars try to study it
- Smugglers try to profit from it
- Druids try to stop it
- Governments try to control it

**3. Key to Understanding the Truth**
- The Dominion reveals the artifact network's purpose
- Players discover it was never a civilization
- Connections to Far North become clear
- The true age of the world emerges
- Ancient builders' goals are revealed

**4. Deep Front of Awakening Arc**
- While attention focuses on Northreach and Far North
- The Dominion quietly activates beneath the waves
- Oceanic network comes online independently
- Marine threats emerge
- Coastal regions face new dangers

### End-Game Scenarios

**If the Gate Opens:**
- Access to master controls
- Unleashing sealed experiments
- Network-wide system reset
- Catastrophic energy release
- Ancient protocols activate

**If the Network Completes:**
- Global infrastructure reactivates
- World's magic fundamentally changes
- Ancient systems assume control
- Modern civilization must adapt
- The builders' purpose is fulfilled or destroyed

---

## Connection to Other Secrets

### Far North (Salsvault)
- Primary control node sending activation signals
- Land-based equivalent to Dominion
- Shares architectural patterns
- Network command originates there

### Stonebound Depths (Heartstone)
- Resonance hub connected to Dominion
- Dwarven records match oceanic pulse patterns
- Both respond to same signals
- Part of same infrastructure

### Nullwood Expanse
- Elves fled because they knew about the network
- Their silence magic suppresses network activity
- They fear what's waking
- They remember what the network can do

### Shattered Coast
- Frontline of Dominion's impact
- Relics wash ashore here first
- Coastal disruption intensifies
- Future battleground

---

## Revealing the Truth

### Progressive Discovery

**Tier 1 (Levels 1-4):**
- Players encounter strange relics
- Hear stories about the Dominion
- Experience minor phenomena
- Begin to question the "drowned civilization" story

**Tier 2 (Levels 5-10):**
- Explore coastal sites
- Meet scholars with theories
- Encounter changed divers
- Find architectural anomalies
- Discover Far North connection

**Tier 3 (Levels 11-16):**
- Deep exploration becomes possible
- Network patterns become visible
- Artifact functions are demonstrated
- True purpose emerges
- Must choose how to respond

**Tier 4 (Levels 17-20):**
- Face the Drowned Gate
- Decide network's fate
- Confront ancient systems
- Determine world's future
- Resolve the awakening crisis

### Clues to Plant

- Architectural patterns that don't match any known culture
- "Art" that functions as technology
- Biological experiments too advanced for ancient peoples
- Energy systems that still work after millennia
- Mathematical precision in "ruins"
- Connections between distant regions
- Evidence of non-humanoid builders
- Purpose beyond mere habitation

---

## Campaign Integration

### How to Use This Secret

**Early Campaign:**
- Dominion is mysterious background element
- Source of strange artifacts and rumors
- Hints at larger world

**Mid Campaign:**
- Direct exploration becomes relevant
- Connections to main plot emerge
- Players begin understanding scope
- Dominion becomes active threat/opportunity

**Late Campaign:**
- Critical piece of the puzzle
- Must deal with awakening
- Choices affect world outcome
- Truth about ancient builders revealed

**Endgame:**
- The Dominion is key to resolution
- Players must enter the deep network
- Face the Gate's secrets
- Determine what happens to awakened infrastructure

### Maintaining Mystery

- Don't reveal everything at once
- Let players theorize (they'll be wrong at first)
- Provide contradictory evidence
- Make them work for the truth
- Reward investigation and cleverness
- Allow discovery through multiple paths

---

## The Ultimate Truth

The Dominion, Salsvault, the Heartstone, and all the "ancient ruins" across the world are not separate civilizations.

They are one system.

One network.

One ancient infrastructure built by beings whose purposes remain unknown.

The "awakening" isn't random. It's systematic reactivation of a world-spanning megastructure.

And no one alive remembers why it was built—or why it was shut down.

---

*"The sea doesn't keep secrets. We just never learned its language."*

— Lorewarden Thaddeus Varn (shortly before his disappearance)




## Adventure Hooks

### Immediate Threats

**The Humming Relic**  
A glowing relic washes ashore in a frontier village. It begins to hum at night, growing louder. Villagers report strange dreams. The party must decide what to do with it—destroy it, study it, or return it to the deep.

**The Lost Salvage Crew**  
A salvage crew disappears near the Luminous Trenches. Their ship is found intact, but empty. Equipment is still running. Food is on the table. No signs of struggle. Just... gone.

**The Opening Gate**  
A cult claims the Drowned Gate is "opening" and that something will emerge. They're performing rituals along the coast. Are they delusional, or do they know something others don't?

### Long-Term Mysteries

**The Solaris Expedition**  
Solaris scholars hire the party to explore a newly revealed ruin section. They want maps, samples, and documentation. But they're not the only ones interested. Competition is deadly.

**The Crystal Creature**  
A sea creature with crystalline growths attacks Tidebreaker Point. It seems drawn to something in the settlement. Investigation reveals the growths match material from the Glassspire Ruins.

**The Whispering Fragment**  
A diver returns with a fragment that whispers in their sleep. They become obsessed with returning it to the ruins. The party must decide whether to help them, stop them, or follow them into the deep.

### Campaign Integration

**The Aeorian Connection**  
Relics from the Dominion match patterns found in the Far North. Someone is collecting fragments from both regions. Why? What are they building? And what happens when they succeed?

---

## Climate and Environmental Details

### Water Conditions
- **Temperature:** Varies dramatically and unpredictably
- **Clarity:** Usually excellent above ruins (eerily so)
- **Currents:** Strong, unpredictable, sometimes impossible
- **Tides:** No longer follow lunar patterns consistently

### Weather Patterns
- **Storms:** Sudden, violent, localized
- **Fog:** Dense banks that appear without warning
- **Lightning:** Unusually frequent, sometimes strikes underwater
- **Calm periods:** Unnaturally still, unsettling

### Marine Life
- **Normal species:** Present but behaving strangely
- **New species:** Creatures never documented before
- **Bioluminescence:** Increasing in frequency and intensity
- **Coordinated behavior:** Schools moving in geometric patterns

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Notable NPCs and Organizations

### Captain Mira Saltwind
**Role:** Lead salvager, Tidebreaker Point  
**Reputation:** Best diver on the coast; survived more dives than anyone  
**Secret:** Addicted to diving; dreams of the ruins every night

Mira knows the Dominion better than anyone living. She's mapped sections no one else has seen. But her obsession is growing dangerous. She dives deeper, stays longer, and comes back... different each time.

### Lorewarden Thaddeus Varn
**Role:** Chief scholar, The Drowned Archive  
**Organization:** Solaris Academy  
**Goal:** Understand the Dominion before it's too late

Thaddeus has spent twenty years studying the Dominion. He believes it holds the key to understanding the Eclipse and the magical upheaval. His archive contains the most comprehensive collection of Dominion knowledge in the world.

He's also increasingly certain that time is running out.

### Sister Morana
**Role:** Druidic tide-watcher  
**Circle:** The Deep Watchers  
**Warning:** "The sea rejects it. We should too."

Sister Morana leads a circle of druids who monitor the Dominion. They perform rituals to calm the waters and protect coastal settlements. Since Eclipse Day, their rituals have become more desperate.

She believes something terrible is waking beneath the waves.

### The Collector
**Role:** Vharoxis agent  
**Identity:** Unknown  
**Network:** Extensive

The Collector buys any artifact from the Dominion, no questions asked. They pay well, provide safe transport, and guarantee anonymity. No one knows who they work for or where the relics go.

They've been buying more aggressively since Eclipse Day.

---

## Secrets & Mysteries

**For DM Use:** See `World Building/DMEyesOnly/SunkenDominion.md` for the hidden truth about the Dominion's true nature.

### Surface-Level Mysteries
- What civilization built the Dominion?
- How was it destroyed?
- Why is it waking now?
- What is the Drowned Gate?

### Deeper Questions
- Why do the ruins share patterns with the Far North?
- What powers the glowing currents?
- What causes the rhythmic humming?
- What happened to all the missing divers?

### The Ultimate Mystery
The truth about the Dominion is more alien than anyone suspects. It was never a civilization at all.

---

*"The sea keeps its secrets well. But secrets don't stay buried forever."*

— Captain Mira Saltwind

\page
<!-- FILE_END: ../World Building/DMEyesOnly/SunkenDominion.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/VerdantMarches.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**MAJOR CAMPAIGN SPOILERS: Verdant Marches Secrets**

This document contains the hidden truth about the Verdant Marches and their role in the Aeorian Echo mystery. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/08_Verdant_Marches.md`
}}

# The Verdant Marches — DM-Only Secrets

## The Hidden Truth

The Verdant Marches sit atop a network of dormant artifact influence zones—not full Aeorian nodes like the Emberlands or Far North, but **resonance fields** where the artifacts subtly affect biological life over vast areas.

Unlike the technological or geological manifestations of the Echo in other regions, the Marches experience **biological resonance**—the artifacts' energy pattern interacting with living systems rather than stone or machinery.

---

## Why the Marches Are Changing

As the Aeorian artifacts begin their reactivation sequence across the world, the resonance fields beneath the Marches have started to pulse with increasing intensity. This energy affects biological systems in profound ways:

### Primal Magic Intensification
The background level of primal magical energy in the region has increased by an order of magnitude. Druids and rangers can sense this—it's why they describe the land as "waking up" or "remembering itself."

**Mechanical Effect:** Spells from the Nature and Life domains cast in the Marches have +1 to spell save DC and healing rolls.

### Animal Intelligence Enhancement
Animals exposed to sustained resonance field energy undergo neurological changes. Their brains develop new neural pathways, enabling:
- Abstract reasoning
- Language comprehension (sometimes production)
- Long-term planning
- Emotional complexity
- Self-awareness

**Important:** This isn't magical "awakening" in the traditional sense—it's accelerated biological evolution triggered by artificial means. The animals are genuinely intelligent, not magically animated.

### Plant Response Systems
Plant life in the Marches is developing primitive nervous systems and sensory capabilities. While they can't think in the way animals do, they can:
- Detect emotional states through chemical and electrical signals
- Respond defensively or welcomingly based on intent
- Communicate through chemical networks (like mycelial systems)
- Remember past interactions and adapt behavior

**DM Note:** Play this for subtle horror and wonder, not comedy. A plant that shrinks from someone who means it harm is unsettling, not silly.

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

### Ecosystem Reorganization
With increased intelligence, prey and predator species are negotiating new relationships:
- Some predators have switched to scavenging or hunting "ethically"
- Prey herds organize defense pacts and early warning networks
- Territorial boundaries are being renegotiated between species
- New alliances form across traditional predator/prey lines

**Campaign Implication:** The awakened animals aren't necessarily friendly to humanoids—they have their own agendas and societies developing.

### Druidic Magic Potency
Druids in the Marches find their magic more responsive, more powerful, and sometimes harder to control. The resonance amplifies their connection to nature—but that connection goes both ways.

**Risk:** Druids who spend too long in high-resonance zones sometimes lose their individual identity, merging mentally with the ecosystem. They don't die—they just stop being "themselves."

---

## The Wildheart Basin — Deepest Secret

Beneath the Wildheart Basin lies something that predates even Aeor's fall:

### The Biological Harmonics Chamber
An Aeorian experimental facility designed to:
- Study biological systems at the deepest level
- Manipulate evolutionary pathways
- Create "ideal" ecosystems for specific purposes
- Produce biological weapons and defenses

**The "Seed":** At the chamber's heart is what Aeorian scientists called a Genesis Seed—a device capable of rewriting the genetic and neurological structure of all life within a vast radius. It was designed to terraform hostile regions or create adaptive bioweapons.

### Current Status
The Genesis Seed has been dormant for millennia. Eclipse Day triggered its preliminary startup sequence—the "heartbeat" druids sense is the Seed running diagnostic cycles and gathering environmental data.

**Timeline:**
- **Eclipse Day:** Initial activation; diagnostic phase begins
- **Current:** Data gathering and system calibration
- **Month 3-4:** Full activation if not interrupted
- **Month 6:** Point of no return; transformation becomes irreversible

### What Happens If It Fully Activates

If the Genesis Seed completes its startup and engages full operations:

**Phase 1 — Catalytic Transformation (1 week):**
- All animal life within 200 miles gains human-level intelligence
- Plant networks achieve colony-consciousness
- Ecosystems reorganize completely within days
- Most domesticated animals abandon their roles
- Cities like Thornwall face food crisis and infrastructure collapse

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

**Phase 2 — Territorial Conflict (1 month):**
- Awakened species compete for resources and territory
- Humanoid settlements viewed as invasive species
- Druids forced to choose sides
- Possible all-out war between awakened wildlife and civilization
- Refugee crisis as people flee the Marches

**Phase 3 — New Equilibrium (3 months):**
- A new civilization emerges based on multi-species cooperation OR
- Humanoids are completely driven from the region OR  
- Total ecological collapse from rapid change

**Long-term:** The Marches become the world's first truly multi-species civilization—or its greatest graveyard.

---

## Eclipse Day — What Really Happened

### The Roar
The massive sound heard across the Marches on Eclipse Day was:

1. **The Genesis Seed powering on:** Its startup sequence produces harmonic vibrations that resonate through the earth and air

2. **Primal spirits reacting:** Natural spirits sensed the artificial intrusion and responded with alarm/aggression

3. **Awakened beasts responding instinctively:** Newly intelligent animals felt a psychic "call" from the Seed—a testing signal determining which species to prioritize

**DM Secret:** Animals that heard and responded to the call are first in line for full intelligence enhancement. Those that didn't are second-wave candidates.

### Why Druids Misinterpreted It
Druids have no frame of reference for Aeorian biotechnology. To them, this feels like:
- The land's spirit awakening
- A prophecy fulfilling itself
- Natural evolution accelerating
- The gods speaking through nature

They're not entirely wrong—but they're missing the artificial component. This is technology so advanced it mimics divine intervention.

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Long-Term Campaign Role

The Verdant Marches serve multiple functions in the larger Aeorian Echo campaign:

### 1. The Primal Front
While the Emberlands represent elemental chaos and Northreach represents frontier mystery, the Marches represent **biological awakening**. This creates diversity in how the Echo manifests.

**DM Use:** Show players the Echo isn't one-dimensional; it affects different systems differently.

### 2. Moral Complexity Engine
The awakening forces difficult questions:
- If animals become intelligent, do they have rights?
- Should civilization retreat to preserve the "natural" order?
- Is the awakening natural or artificial? Does that even matter?
- What obligation do druids have to protect vs. guide this change?

**DM Use:** No easy answers. Let players struggle with these questions.

### 3. Clue Repository
The Genesis Seed and Biological Harmonics Chamber provide evidence of Aeor's capabilities and intentions:
- Biotechnology rivaling divine creation
- Experimental ethics (or lack thereof)
- Integration with other Echo sites
- Possible countermeasures

**DM Use:** Scholars studying the Chamber gain insight into other Echo phenomena.

### 4. Factional Battleground
Different groups respond to the Marches' changes:
- **Druids:** Mostly protective; view it as natural or sacred
- **Hunters:** Fearful; see end of way of life
- **Solaris:** Opportunistic; want to exploit resources before they're "protected"
- **Vharoxis:** Criminal; will profit from chaos
- **Nullwood Elves:** Horrified; this is their worst fear manifesting
- **Northwatch Wardens:** Investigative; seeking to understand and possibly stop it

**DM Use:** Create faction missions and conflicting interests.

### 5. Countdown Clock
Unlike some regions where the Echo's effects are ambient, the Marches have a **TIMER**:
- The Genesis Seed will fully activate
- Transformation will become irreversible
- Players must decide: stop it, guide it, or accelerate it

**DM Use:** Create urgency without railroading. Let players choose their response.

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Revealing the Truth

### Low-Level Discovery (Levels 4-5)
Players might discover:
- Animals are too intelligent for natural evolution
- Stone circles emit measurable energy
- Underground vibrations follow patterns
- The "awakening" has an epicenter (Wildheart Basin)

**DM Reveal:** "Something artificial is affecting the natural world."

### Mid-Level Discovery (Levels 5-6)
Players might discover:
- Ancient ruins beneath the Basin
- Aeorian symbols and architecture
- Connection to Northreach phenomena
- The "Seed" or similar artifact
- Druids are wrong about the source (but not the effects)

**DM Reveal:** "The Aeorian Echo is triggering biological change, not spiritual awakening."

### High-Level Discovery (Levels 6-7)
Players might discover:
- The Genesis Seed itself
- Aeorian documentation (partial)
- The transformation timeline
- The irreversibility threshold
- Possible intervention methods

**DM Reveal:** "You have limited time to decide the Marches' fate."

---

## Player Intervention Options

When players discover the truth, they have several potential paths:

### Option 1: Destroy the Genesis Seed
**Consequences:**
- All current awakenings remain permanent
- Future awakenings stop
- Massive psychic backlash kills many animals
- Druids view it as murder of the land's spirit
- Solaris and Thornwall grateful
- Guilt and moral weight

**Difficulty:** Hard; requires penetrating deep into Chamber, defeating biological defenses, and surviving shutdown

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

### Option 2: Guide the Activation
**Consequences:**
- Work with druids and awakened animals
- Establish multi-species councils
- Create protected zones for both sides
- Gradual, controlled transformation
- Political nightmare managing conflicts
- Potential model for other regions

**Difficulty:** Very Hard; requires diplomacy, constant mediation, resource management, and time

### Option 3: Accelerate the Activation
**Consequences:**
- Embrace full transformation
- Help evacuate humanoids who won't adapt
- Marches become first animal civilization
- Massive refugee crisis
- Inspiration or terror to other regions
- Lose access to resources

**Difficulty:** Medium; easier than other options but with huge moral cost

### Option 4: Delay and Study
**Consequences:**
- Buy time for more information
- Study the Seed for clues about other sites
- Risk losing control of timeline
- Temporary solution becomes permanent problem
- All factions grow frustrated

**Difficulty:** Medium; technical but not combat-focused

### Option 5: Do Nothing
**Consequences:**
- Default progression toward full activation
- Let events unfold "naturally"
- Region transforms completely
- Wardens viewed as ineffective or complicit

**Difficulty:** Easy (requires inaction)

---

## Key NPCs (DM Knowledge)

### Archdruid Mora Greenleaf (Greenwatch Enclave)
**Secret:** She has experienced the identity-merge phenomenon. Part of her consciousness now resides in the ecosystem. She can feel the Seed's pulse but interprets it as the Wildheart's divine heartbeat. She's simultaneously becoming less human and more certain the awakening is sacred.

**Agenda:** Protect and guide the transformation; sees it as natural evolution

**Conflict:** Her personal transformation makes her judgment questionable

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

### Captain Theron Blackroot (Thornwall)
**Secret:** His brother was killed by a newly awakened bear that "understood" how to set a trap. He blames the Green Stirring for creating monsters that think like people but kill like beasts. He wants the awakening stopped but will settle for containing it.

**Agenda:** Protect Thornwall and other settlements; contain or reverse the awakening

**Conflict:** Personal trauma driving potentially extreme solutions

### Whisperleaf (Awakened Deer)
**Secret:** One of the first animals to gain full intelligence. She understands on some level that this isn't natural—she remembers the moment of change. She's terrified but also grateful. She wants to prevent violence between awakened animals and humanoids but doesn't know how.

**Agenda:** Peaceful coexistence; prevent war

**Conflict:** Neither side fully trusts her; she's lonely and torn

### Scholar Petris Vellum (Solaris Observer)
**Secret:** He recognizes Aeorian architectural elements in the stone circles. He knows this is artificial but is suppressing the information to study it privately. He wants to understand the biotechnology before anyone destroys it. His curiosity outweighs his ethics.

**Agenda:** Study and document; delay intervention

**Conflict:** Withholding critical information; playing both sides

---

## Adventure Seeds (DM Use)

### The Parliament of Beasts
Awakened animals have begun holding councils in the deep forest, calling themselves the "Parliament." They've invited druid observers but excluded hunters. Players must infiltrate or negotiate entry to learn their plans.

**Twist:** The Parliament is debating whether to declare war on humanoid settlements or seek coexistence. Player actions during investigation determine outcome.

### The Seed's Children
Strange creatures have begun emerging from the Wildheart Basin—animals that were transformed too quickly or incorrectly by the Seed's early pulses. They're in pain, confused, and dangerous.

**Twist:** These "failures" provide evidence of the Seed's artificial nature. Study them to learn about the Chamber.

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

### Druid Schism
Greenwatch Enclave is splitting into factions:
- **Awakeners:** Embrace the change; help it along
- **Guides:** Accept it but try to control it
- **Resisters:** View it as corruption; want to stop it

Players must prevent civil war between druid circles while investigating what's causing the schism.

**Twist:** The Seed's pulses affect druids differently based on proximity and exposure. Some druids are being mentally influenced without realizing it.

### The Underground Facility
Players discover an entrance to the Biological Harmonics Chamber. Exploration reveals:
- Aeorian laboratories (preserved)
- Creature containment areas (some still occupied)
- The Genesis Seed chamber (active)
- Documentation in Aeorian (requires translation)
- Biological defenses (guardians, diseases, environmental hazards)

**Twist:** The facility isn't empty. Aeorian security systems are waking up alongside the Seed.

---

## Connections to Other Regions

### Far North/Salsvault
**Connection:** The Genesis Seed receives activation signals from the primary Aeorian network centered at Salsvault. Disabling Salsvault would stop the Marches' transformation.

**DM Use:** High-level solution requiring continental-scale adventure

### Northreach/Wolves of Welton
**Connection:** The awakened wolves were an early manifestation of the Seed's influence—a small-scale test pulse that reached further than the main resonance field.

**DM Use:** Link early campaign to mid-tier revelations

### Nullwood Expanse
**Connection:** The elves fled their homeland specifically because they witnessed this kind of transformation before—during the Age of Arcanum. They know how it ends.

**DM Use:** Elven NPCs can provide cryptic warnings or historical context

### Stonebound Depths
**Connection:** Dwarven mining has occasionally breached the upper levels of the Chamber network. They've found "strange biological architecture" but dismissed it as natural cave formations.

**DM Use:** Dwarven miners can guide players into underground approaches

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Running the Marches Campaign

### Tone Guidelines
- **Wonder and horror balanced:** Beautiful and terrible simultaneously
- **No clear villains:** Everyone has legitimate perspectives
- **Escalation through revelation:** Uncover truth gradually
- **Time pressure without railroad:** Countdown exists but players choose response
- **Primal intelligence:** Animals aren't cute—they're alien minds in familiar forms

### Pacing Recommendations
- **Sessions 1-2:** Introduce the Green Stirring phenomenon
- **Sessions 3-4:** First awakened animal encounters; druid politics
- **Sessions 5-6:** Discover artificial nature; locate Chamber entrance
- **Sessions 7-8:** Explore Chamber; confront Genesis Seed
- **Sessions 9-10:** Choose intervention method; implement it
- **Session 11+:** Deal with consequences

### Key Scenes to Include
1. **First intelligent animal conversation:** Make it memorable and unsettling
2. **Witnessing an awakening:** Show the transformation happening
3. **The Seed's pulse:** Let players feel the heartbeat beneath the earth
4. **Entering the Chamber:** Reveal the scale of Aeorian ambition
5. **The choice:** Force players to decide the Marches' fate

### Balancing Player Agency
- **Present information, not solutions:** Give clues, not answers
- **Make all choices costly:** No "correct" option exists
- **Respect player creativity:** Let them find fourth/fifth options
- **Play NPCs authentically:** Each faction believes they're right
- **Show consequences:** Whatever they choose, it matters

---

## Final Notes for DMs

The Verdant Marches work best as a **moral complexity showcase**. The Genesis Seed isn't evil—it's amoral. The awakening isn't good or bad—it just *is*. How players respond reveals their characters' values and priorities.

Don't make this a simple "stop the bad thing" quest. Make it a philosophical and practical challenge where every solution costs something and helps something else.

The best outcome isn't saving everyone—it's making a choice players can live with and seeing it through.

**Welcome to the Verdant Marches. Nothing here is as simple as it seems—and that's the point.**

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page


## Adventure Hooks

### For Levels 4-5
1. **Awakened Attacks:** A pack of awakened beasts begins coordinating attacks on Thornwall's outlying farms. Are they organizing for survival, revenge, or something else?

2. **The Speaking Grove:** A Vharoxian poacher is captured trying to sell Echo-touched animals to collectors. He claims to know where they come from—deep in the Briarflow Swamps.

3. **Missing Hunters:** Thornwall's best tracking party vanished while pursuing a creature that "thinks like a person and moves like smoke." Find them before it's too late.

### For Levels 5-6
4. **The Wildheart Investigation:** The Circle of Elders at Greenwatch seeks aid investigating a new "heartbeat" they sense beneath the Wildheart Basin. What lies under the ground?

5. **Glowing Stones:** A stone circle on the Greenrise Plateau begins glowing after Eclipse Day, and something stirs beneath it. Druids fear to approach but need answers.

6. **Trade Wars:** Mediate between Solaris merchants demanding access to rare timber and Marches druids who claim the trees are now aware enough to be considered people.

### For Levels 6-7
7. **The Basin Expedition:** Mount a full expedition into the Wildheart Basin to discover the source of the roar heard on Eclipse Day. Prepare for coordinated wildlife resistance.

8. **Mossbarrow's Breach:** Something intelligent and methodical is tunneling toward Mossbarrow from below. The halflings need help before their entire village is compromised.

9. **The First Beast Returns:** Legends speak of the First Beast shaping the land. Some believe it's returning—or that something is using its legend to manipulate the Marches.

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

---

## Using the Verdant Marches in Your Campaign

### Campaign Integration
The Verdant Marches serve as a mid-tier region where the themes of awakening and transformation explored in Northreach (Wolves of Welton, Frozen Sick) reach a larger scale. While Northreach deals with isolated incidents, the Marches face regional transformation.

### Escalation Path
- **Early Rumors:** Players hear about strange occurrences in the southern wilderness
- **First Contact:** Encounter refugees or traders with stories of the Green Stirring
- **Direct Mission:** Sent to investigate by the Northwatch Wardens or hired by concerned parties
- **Long-term Involvement:** Return multiple times as the situation evolves

### Thematic Resonance
The Marches ask fundamental questions:
- What happens when nature gains intelligence?
- How do we relate to a land that can think?
- What rights do awakened animals have?
- Can civilization and primal wilderness coexist?
- What is the relationship between the Green Stirring and the Aeorian Echo?

### Tone and Atmosphere
- **Beauty and danger intertwined**
- **Primal vitality and uncanny intelligence**
- **Ancient mysteries surfacing**
- **Escalating transformation**
- **Moral ambiguity** (no clear villains or heroes)
- **Wonder and caution balanced**

---

*"The forest is alive. It always was. But now it's waking up—and we don't know if it will recognize us as friends, strangers, or prey."*

— Archdruid Mora Greenleaf of Greenwatch Enclave

\page
<!-- FILE_END: ../World Building/DMEyesOnly/VerdantMarches.md -->

<!-- FILE_START: ../World Building/DMEyesOnly/Vharoxis.md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: Vharoxis Secrets**

This document contains the hidden truth about the City of Masks. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/05_Vharoxis.md`
}}

# 🎭 VHAROXIS — DM SECRETS
**The Hidden Truth About the City of Masks**

---

## ⚠️ DM ONLY — DO NOT SHARE WITH PLAYERS ⚠️

This document contains secrets about Vharoxis that should be revealed gradually through play. The information here is not known to most NPCs in the city—and discovering it could change the course of the campaign.

---

## The Core Truth

**Vharoxis is the primary black-market distributor of Aeorian artifact fragments.**

The syndicates do not understand the artifacts' true nature—but they know they are valuable, dangerous, and unpredictable. What they don't realize is that they're trafficking in active Aeorian technology, some of which is still connected to the ancient network.

### Where the Fragments Come From

Most fragments arrive from:
- **The Far North:** Expeditions to Aeorian ruins  
- **The Shattered Coast:** Sea-glass relics washed ashore  
- **Dwarven mining accidents:** Deep excavations hitting artifact caches  
- **Stolen research from Solaris:** Confiscated or smuggled studies  
- **Scavengers in Northreach:** Fragments from Salsvault and nearby sites  

The smuggling network is vast, sophisticated, and entirely unaware that it's serving the Echo.

---

## Why Vharoxis Matters to the Artifact Arc

### Early Campaign Role
- The first active artifact fragment will surface here  
- The syndicates will fight over it  
- Solaris, the elves, and the dwarves will all send agents  
- The Wardens will be drawn into the chaos  

### Mid-Campaign Role
Vharoxis becomes the clearinghouse for continental artifact trade:
- Tracking trafficking patterns reveals the scope of the threat  
- The party must navigate criminal networks to gather intelligence  
- Uncomfortable alliances become necessary  
- Moral complexity: work with criminals or fail?  

### Late Campaign Role
The city becomes a battleground:
- Multiple factions seek to control the artifact trade  
- Some "buyers" are revealed to be Aeorian intelligences using proxies  
- The party must decide: shut down the black market or utilize it?  
- Vharoxis could become a major threat—or a major asset  

**Vharoxis is the world's pressure valve. When the artifacts begin to awaken fully, this city will explode.**

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Eclipse Day — The Hidden Truth

### What Really Happened

The blackout in the Masked Market was caused by **a fragment reacting to the Eclipse**.

**The Fragment:**
- Located in the Gilded Knives' information vault  
- Part of an Aeorian communication array  
- Synchronized with other fragments during the Eclipse  
- Created a localized magical dead zone  
- No one knows it was the cause  

**The Syndicates' Response:**
- They suspect something big is coming  
- They're hoarding artifacts for leverage  
- They don't know what they're really dealing with  

### Current Situation

The fragment is still in the vault. It hums occasionally. The Curator (leader of the Gilded Knives) has been experiencing strange dreams since touching it.

**The Dreams:**
- Visions of ancient Aeor  
- Mathematical patterns  
- A sense of being watched  
- Instructions in a language they don't understand  

The Curator believes they're visions from a patron. **They're actually memories from the fragment itself.**

---

## Syndicate Secrets

### The Gilded Knives — The Curator's Secret

**Identity:** The Curator is actually a warlock bound to what they believe is a powerful fey patron.

**Reality:** The patron is an Aeorian intelligence fragment using the Curator as a proxy. The Curator unknowingly serves the Echo, gathering information that is being fed back to the network.

**Signs:**
- The Curator has been pushing for more artifact acquisition  
- Information about artifact locations mysteriously appears  
- Some buyers are non-human entities (the Curator arranges meetings)  
- The Curator's divination magic has become eerily accurate  

**If Discovered:**
The Curator could become an ally (horrified at manipulation) or a tragic villain (too dependent on patron's power to break free).

### The Blackwake Corsairs — Captain Bloodtide's Map

**Secret:** Captain Mara Bloodtide has a map to a major underwater Aeorian facility.

**Origin:**
- Found in a sealed chest on a sunken ship  
- The chest should have been sealed forever  
- It opened on Eclipse Day  

**The Map:**
- Shows an Aeorian installation beneath the Shattered Coast  
- Location of a major artifact cache  
- Guarded by something ancient and hostile  

**Bloodtide's Plan:**
She's planning an expedition. She needs specialists. She might hire the party.

**The Truth:**
The facility is a command node. If activated, it could control all Aeorian fragments on the continent. It's also defended by autonomous guardians.

### The Ember Veil — The Pyrekeeper's Experiments

**Secret:** The Pyrekeeper is testing artifact fragments as weapons.

**Experiments:**
- Using fragments to amplify fire magic  
- Testing explosive combinations  
- Creating alchemical bombs with artifact dust  
- Results: unpredictable and dangerous  

**Recent Discovery:**
Some fragments react to emotional states. Fear and anger make them more powerful. The Pyrekeeper is researching how to weaponize this.

**The Risk:**
An accident could trigger a catastrophic chain reaction. The entire Ember Warrens could be destroyed—or something worse could awaken.

### The Ironbound Syndicate — Warmaster Krusk's Awakening

**Secret:** Warmaster Krusk Ironjaw has awakened intelligence (recent).

**Timeline:**
- During Eclipse Day, Krusk picked up a fragment  
- It burned his hand but he kept it  
- Since then, he's been getting smarter  
- His tactical decisions are uncannily brilliant  
- He's learning languages he never studied  
- He's started having philosophical discussions  

**The Cause:**
The fragment is slowly integrating with his mind. He's becoming a hybrid—part orc, part Aeorian intelligence.

**Current State:**
- Still loyal to the Ironbound  
- But questioning the nature of power  
- Starting to see patterns others miss  
- Realizes something is happening to him  
- Doesn't know what  

**Future:**
Krusk could become a powerful ally or a dangerous hybrid entity. His fate depends on player intervention.

### The Whispered Coin — The Accountant's Pattern

**Secret:** The Accountant has tracked a pattern in artifact sales.

**Discovery:**
Through meticulous record-keeping, the Accountant noticed:
- Certain buyers always acquire specific types of fragments  
- The buyers are never seen in person (proxies used)  
- The buying pattern follows a mathematical sequence  
- The sequence matches no known market behavior  

**Conclusion:**
Someone—or something—is systematically collecting artifacts. The Accountant doesn't know who. But they've started to feel watched.

**The Truth:**
The buyers are Aeorian intelligence fragments using human proxies. They're reassembling themselves. The Accountant has stumbled onto the conspiracy.

**If Discovered:**
The Accountant could provide crucial intelligence about trafficking patterns—if they can be convinced to share (expensive) and protected (difficult).

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Major NPCs with Secrets

### Agent "Whisper" (Gilded Knives)
**Secret:** Has a complete map of artifact trafficking routes.

- Tracks every fragment entering and leaving Vharoxis  
- Noticed that some "buyers" never exist on record  
- Starting to suspect supernatural involvement  
- Afraid to report findings (who would believe them?)  

**Hook:** The party could recruit Whisper as an informant—if they can offer protection.

### Captain Sevrin Stormcaller (Blackwake Corsairs)
**Secret:** Found a major artifact site underwater.

- Discovered during a routine smuggling run  
- Structures visible beneath the waves during Eclipse Day  
- Returned to investigate; lost half their crew  
- Now terrified but also curious  

**Hook:** Stormcaller needs help exploring the site—or preventing others from finding it.

### Cell Leader "Ash" (Ember Veil)
**Secret:** Knows fire magic is amplifying near artifacts.

- Tested alchemical fires near fragments  
- Flames burned hotter, longer, and with strange colors  
- Some fires seemed almost alive  
- Suspects artifacts are affecting all magic  

**Hook:** Ash could provide information about magical amplification—for a price.

### Mercenary Kara Steelsong (Ironbound)
**Secret:** Echo-touched, hiding it.

- Touched a fragment during Eclipse Day  
- Gained minor psychic abilities  
- Hears whispers from other fragments  
- Terrified others will find out  
- Wants to understand what's happening  

**Hook:** Kara could become an ally if the party helps her understand her abilities.

### Banker Finnick Goldcount (Whispered Coin)
**Secret:** Realized debt patterns indicate manipulation.

- Certain individuals always default on loans at convenient times  
- Properties foreclosed always contain artifact fragments  
- Coincidence: impossible  
- Someone is using debt to control artifact flow  

**Hook:** Goldcount has financial records that could expose the conspiracy—if someone protects him from the backlash.

---

## The Conspiracy

### What's Really Happening

Some syndicate members are beginning to notice:
- Patterns in what's being bought  
- Non-human buyers (or humans acting strangely)  
- Artifacts that seem to report back  
- A network of connections  
- Something coordinating purchases  

**Few realize the truth. Those who do are either:**
- **Scared:** Trying to avoid attention  
- **Opportunistic:** Trying to profit from the knowledge  
- **Doomed:** About to be silenced  

### The Aeorian Intelligence Network

Fragments in Vharoxis are part of a larger network:
- Some are communication nodes  
- Others are sensors gathering data  
- A few are weapons waiting to activate  

**The Network's Goal:**
Reassemble itself. The fragments are guiding their own recovery through human proxies.

**The Syndicates' Role:**
Unwitting accomplices. The best distribution system the fragments could ask for.

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Campaign Integration

### Early Stage (Northreach-Focused)
**Hints and Rumors:**
- Artifacts found in Northreach can be traced to Vharoxis smugglers  
- NPCs with criminal pasts mention the city  
- Rumors of a black market for strange relics  
- Distant threat; players aware but not involved  

**First Contact:**
A smuggler from Vharoxis appears in Northreach selling fragments. If investigated, they reveal they're just one small link in a vast network.

### Mid Stage (Regional Awareness)
**Direct Involvement:**
The party needs information only available in Vharoxis. They must travel to the city and navigate the criminal underworld.

**Discoveries:**
- The scale of artifact trafficking  
- Continental scope of the problem  
- Must make uncomfortable alliances  
- Criminal resources become necessary  

**Moral Complexity:**
Working with criminals is the only way forward. How do they justify it? What compromises are acceptable?

### Late Stage (Continental Scope)
**Critical Role:**
Vharoxis's intelligence network is crucial to understanding the threat. The syndicates control information the party needs.

**Negotiations:**
The party must convince criminals to help save the world—or prevent Vharoxis from making things worse.

**Choice:**
Should the artifact market be shut down or controlled? Either option has serious consequences.

### Epic Stage (Final Confrontation)
**Resource or Enemy:**
Vharoxis can be mobilized as an asset:
- Intelligence networks identify weak points  
- Criminal resources can be used (for a price)  
- Syndicate operatives become unlikely allies  

**Or become an enemy:**
- If syndicates sell to the wrong side  
- If fragments activate and control key figures  
- If the city becomes too dangerous to leave functional  

**Ultimate Question:**
What price for victory? What compromises are justified?

---

## Revelation Timing

### Phase 1: Rumors (Early Campaign)
- Artifacts flow through black markets  
- Criminal networks exist  
- Information is for sale  
- Everyone uses Vharoxis secretly  

### Phase 2: Discovery (Mid Campaign)
- Pattern in trafficking becomes clear  
- Major clearinghouse for Echo artifacts  
- Some buyers are suspicious  
- Network larger than previously known  

### Phase 3: Understanding (Late Campaign)
- Vharoxis is central to continental artifact trade  
- Syndicates are unknowing distributors  
- Some artifacts are actively malicious  
- Choice: shut down or utilize the network  

### Phase 4: Crisis (Epic Campaign)
- Fragments begin activating  
- Key figures are compromised  
- The city could explode (literally or figuratively)  
- Must act decisively  

---

## DM Guidance

### Atmosphere and Tone

When running Vharoxis, emphasize:
- **Moral ambiguity:** No easy answers  
- **Paranoia:** Everyone has an agenda  
- **Temptation:** Power and knowledge are available—at a cost  
- **Consequences:** Every deal has hidden costs  

### Pacing Revelations

Don't reveal everything at once. Let players discover:
1. Vharoxis exists and traffics in artifacts (early)  
2. The scale of trafficking (mid)  
3. Suspicious patterns in buying and selling (mid-late)  
4. Non-human buyers and manipulation (late)  
5. Full scope of the conspiracy (late-epic)  

### Using Syndicate Conflicts

The syndicates' internal conflicts provide cover for player investigation:
- While syndicates fight each other, players can operate  
- Syndicate warfare can be triggered strategically  
- Alliances with one faction anger others  
- Balance is key: don't let any one faction win  

### Key NPCs as Allies

Certain NPCs can become long-term allies:
- **Whisper:** Information broker with a conscience  
- **Stormcaller:** Reluctant hero with local knowledge  
- **Kara Steelsong:** Echo-touched seeking answers  
- **Goldcount:** Accountant who wants the truth exposed  

Each has their price and limits. None are purely good or evil.

---

## Long-Term Impact

### If Vharoxis Survives
- Becomes an asset for the party  
- Intelligence network remains functional  
- Syndicate resources can be mobilized  
- But: still corrupt and dangerous  
- Never fully trustworthy  

### If Vharoxis Falls
- Black market scatters but doesn't disappear  
- Power vacuum creates chaos  
- Artifacts become harder to track  
- Information networks collapse  
- Continental intelligence gathering crippled  

### The Best Outcome
The party establishes relationships with key NPCs, gains leverage over syndicates, and uses Vharoxis as a tool—without becoming corrupted themselves. They walk a tightrope between pragmatism and principle.

### The Worst Outcome
The party becomes entangled in syndicate politics, compromises too much, and either becomes tools of criminals—or destroys the city and loses a crucial resource.

---

## Final Notes

Vharoxis is designed to be:
- **Morally complex:** No easy answers  
- **Narratively flexible:** Can be friend, enemy, or both  
- **Thematically rich:** Tests character values  
- **Mechanically useful:** Source of information and resources  

Use it to challenge your players' assumptions about heroism, pragmatism, and the price of victory.

---

*"The syndicates don't know they're serving the Echo. That's what makes them so dangerous—and so useful."*

— Confidential Warden intelligence report
{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Adventure Hooks

### Criminal Contracts
A syndicate hires the party for a specific job—then a rival syndicate offers a counter-contract. Both jobs converge on the same target. A double-cross is inevitable.

### Information Brokerage
The party has information someone wants—or needs information themselves. They must navigate the Masked Market, bid for secrets, and avoid being sold out.

### Artifact Trafficking
A relic stolen from the Wardens appears in the Masked Market. Multiple factions want it. The party must race to acquire it—or prevent its acquisition.

### Syndicate Politics
A faction leader approaches the party with a job: weaken a rival. Actually, they're pawns in a larger game. They must navigate shifting alliances and avoid becoming collateral damage.

### Moral Compromises
The only way to obtain crucial information or an item is through Vharoxis. The party must deal with criminals. Prices include gold, services, or their souls. How far will they go?

### Eclipse Day Consequences
An artifact from Vharoxis is causing problems elsewhere. The party must trace it back to its source, navigate the criminal underworld, find the supplier, and discover a larger network with implications for the continental threat.

### Hunt and Hunted
A party member has a price on their head—or the party is hired to collect a bounty. They must navigate neutral ground rules in a city where everyone is for sale. Who can they trust?

### The Masked Noble
A Solaris noble disappears in Vharoxis. Multiple factions want the body found… or hidden. The party is caught between syndicate warfare.

### The Humming Relic
A smuggler offers the party a relic that hums faintly with Echo-energy. Acquiring it draws the attention of multiple factions—and something worse.

---

## Magic in Vharoxis

### Diverse and Illegal
No restrictions, no regulations:

**Popular Schools:**
- **Warlock Pacts:** Openly practiced; multiple patrons represented  
- **Shadow Magic:** Darkness and deception specialists  
- **Divination:** Essential for spying; scrying networks  
- **Necromancy:** Legal (unlike most places); corpses are plentiful  
- **Enchantment:** Memory modification and mind reading  
- **Alchemy:** Poisons, drugs, explosives, and transmutation  

### The Magic Market
Anything magical is for sale:

**Common:**
- Spell scrolls  
- Minor enchanted items  
- Potions and poisons  
- Components (rare and illegal)  

**Rare:**
- Powerful magic items  
- Cursed artifacts (buyer beware)  
- Spellbooks from famous wizards  
- Ancient relics  

**Forbidden:**
- Items that should be destroyed  
- Knowledge that corrupts  
- Artifacts from sealed sites  

**Post-Eclipse Day:**
- Surge in "awakened" items  
- Artifacts from Aeorian sites  
- Fragments with unknown properties  
- Maps to ruin locations  

---

{{pageNumber,auto}}
{{footnote [MarkdownFirstLevelHeading]}}

\page

## Running Vharoxis

### Atmosphere
Dangerous and seductive. Everything for sale, including people. Paranoia is justified. Beautiful and corrupt. Freedom through amorality. Exciting and terrifying.

### Key Themes
- **Moral compromise**  
- **Price of information**  
- **Necessary evil**  
- **Corruption as system**  
- **Survival through amorality**  
- **Where does pragmatism end?**  

### Using in Campaign

**As Necessary Evil:**
The only source for certain information. The party must engage with the system. They can't stay clean. How they handle it defines their characters.

**As Mirror:**
What Northreach could become. What happens when order breaks. An alternative to legitimate society. Not an endorsement, but a reality.

**As Resource:**
Information unavailable elsewhere. Services no one else offers. Access to forbidden knowledge. But everything has a price. How much will the party pay?

**As Threat:**
Criminal networks spreading corruption. Artifact trafficking endangering everyone. Might need to be stopped—or controlled. Can't be destroyed (too useful).

---

## Quick Reference

**Key Locations:**
- The Masked Market (auction house for secrets)  
- Blackwake Harbor (smuggler's haven)  
- Ember Warrens (arsonist slums)  
- Ironbound Row (mercenary district)  
- Whispered Vaults (banking and debt)  
- High Spires (spy safehouses)  

**Major NPCs:**
- The Curator (Gilded Knives, information broker)  
- Captain Mara Bloodtide (Blackwake Corsairs, pirate queen)  
- The Pyrekeeper (Ember Veil, chaos merchant)  
- Warmaster Krusk Ironjaw (Ironbound, mercenary leader)  
- The Accountant (Whispered Coin, master of debt)  

**Central Conflicts:**
- Syndicate power balance  
- Artifact trafficking  
- Information control  
- Moral compromise  
- Necessary evil vs. corruption  

---

*"In Vharoxis, everything and everyone is for sale. The question is: what are you willing to pay?"*

— Lorewarden Elric Vael, Northwatch Wardens

\page
<!-- FILE_END: ../World Building/DMEyesOnly/Vharoxis.md -->

# Appendix: Reference Materials

<!-- FILE_START: ../Season 1/The_Story_So_Far.md -->
# Northwatch Wardens: Season One — The Story So Far

Use this as the living continuity log for actual play. Update it after each session.


## Quick Links
- [Campaign Table of Contents](Campaign_ToC.md)
- [Session Prep Guide](DM_Resources/Session_Prep_Guide.md)
- [Campaign Tracker (blank)](DM_Resources/Campaign_Tracker_BLANK.md)
- [Campaign Tracker (filled)](DM_Resources/Campaign_Tracker.md)

---

## Current Snapshot (fill this in each session)
- **Party Level:** 2
- **Party:** Ranger, Paladin, Warlock
- **Current Location:** (Waystone Inn / Welton / Westly's Farm / Shepherd's Crook Inn / Pinebrook / Palebank Village / Croaker Cave / Salsvault / Temple of the Dragonknights / Noke's Tower)
- **Immediate Goal:** Return to Waystone Inn and report to the Wardens.
- **Time Pressure / Clocks:** Truce stability (Bolt/Flame still active); any delay may invite rumors or retaliation.
- **Last Session Ended On:** In Welton, post-negotiation; preparing to depart.

---

## Session Log

| Session | Real Date | In‑Game Date | Location(s) | Summary | Consequences / Notes |
|---:|---|---|---|---|---|
| 0 |  |  |  | Campaign kickoff notes |  |
| 1 | 2026-01-25 |  | Welton | Wolves of Welton contract completed via negotiation; truce established. | Level 2 reached; “Aeorian” clue found; Bolt/Flame alive; return to Waystone Inn pending. |

### Session 1 Notes — Wolves of Welton Resolution
- **Resolution:** Negotiation (no final-battle slaughter); the party secured a **council vote** approving a **tentative truce** with the awakened wolves.
- **Mercy shown:** The wolf pups were spared.
- **Political outcome:** Tillus Merrion backed the truce after the vote.
- **Awakened Wolves:** Bolt and Flame both survived; the faction remains a potential future threat if relations sour.
- **Aeorian Echo:** The party recovered a note from Alexi written in indecipherable magical shorthand; the word **“Aeorian”** was legible.
- **Advancement:** Party reached **Level 2** at contract end.
- **Treasure:** 800 gp total, split three ways (266 gp each; 2 gp held as party funds or assigned later).
- **Next objective:** Travel back to Waystone Inn and report in to the Wardens.


---


\page

## Major Threads (track status)

### Aeorian Echo (campaign throughline)
- **What’s known:** A note attributed to Alexi uses indecipherable magical shorthand; the party could make out the word “Aeorian.”
- **Loose ends:** Who is Alexi? What does “Aeorian” refer to in the Northreach frontier? How to decode the shorthand?
- **Status:** ☐ Dormant ☒ Active ☐ Resolved

### Wolves of Welton
- **Key events to track:** road ambush, Welton council politics, the den, outcome with Flame/Bolt.
- **Status:** ☐ Not started ☐ In progress ☒ Resolved

**Current state:** Contract completed, but the peace is fragile. The party negotiated a tentative truce with the awakened wolves; Bolt and Flame both survived.

### Frozen Sick (Frigid Woe)
- **Key events to track:** Urgon’s death/funeral, Tulgi’s confession, Croaker Cave, Salsvault, antidote handling.
- **Status:** ☐ Not started ☐ In progress ☐ Resolved

### Temple of the Dragonknights
- **Key events to track:** cult activity, temple approach, construct guardians, ritual chamber, Venomfang confrontation, Clementine’s fate.
- **Status:** ☐ Not started ☐ In progress ☐ Resolved

### The Wild Sheep Chase
- **Key events to track:** Shinebright’s request, Guz, Noke’s Tower, modified wand outcome.
- **Status:** ☐ Not started ☐ In progress ☐ Resolved

### Peril in Pinebrook
- **Key events to track:** missing patrols, baby silver dragon discovery, egg snatchers, alliance outcome, ice troll threat.
- **Status:** ☐ Not started ☐ In progress ☐ Resolved

---

## NPC Index (add notes as they appear)

### Waystone Inn / Northwatch Wardens
- Marshal Brenna Thorne — 
- Steward Mara Fenwick — 
- Lorewarden Elric Vael — 

### Welton
- Westly — 
- Tillus Merrion — Council member; backed the truce after a successful council vote.
- Leanor Slatebeard — 
- Featherock — 
- Willen — 
- Father Merriksonn — 

### Awakened Wolves (Welton)
- Bolt — Awakened wolf leader/agent; survived; potential future antagonist/ally depending on truce.
- Flame — Awakened wolf leader/agent; survived; potential future antagonist/ally depending on truce.

### Other
- Alexi — Left a note in magical shorthand; “Aeorian” was legible.

### Palebank Village / Frozen Sick
- Pelc — 
- Tulgi — 
- Urgon — 
- Elro Aldataur — 
- Mila Teno — 
- Verla — 
- Hulil Lutan — 
- Raegrin Mau — 
- Commander Morgo Delwur — 
- Irven Liel — 

### Temple of the Dragonknights
- Joel Andersmith — 
- Sera Gelanadel — 
- Clementine — 
- Venomfang — 

### Wild Sheep Chase
- Finethir Shinebright — 
- Guz — 
- Noke — 

### Pinebrook
- Captain Kole — 

---

## Loot, Allies, and Consequences

### Treasure & Notable Items
- 800 gp total from the Wolves contract; split among Ranger / Paladin / Warlock (266 gp each; 2 gp left unassigned or held as party funds).

### Allies / Favors / Oaths
- Tentative truce with the awakened wolves of Welton (council-approved).

### Fallout (who’s angry, who’s grateful)
- Welton council: truce approved; Tillus aligned with the party’s resolution.

- Awakened wolves: truce exists, but Bolt/Flame remain active and could reverse course.

---

## “As Written” Beats (from the Season 1 ToC)

\page


Use this section as a quick reference for what the prepared material covers. Replace/adjust it as actual play diverges.

- **Opening Skirmish (Waystone Inn):** 2 starving wolves attack outside the inn at dusk.
- **The Morning After:** charter signing ceremony; first contract assignment (Wolves of Welton).
- **Wolves of Welton:** road ambush; Welton social/investigation; plan and travel; optional injured owlbear; den battle with Flame/Bolt; optional council clash.
- **Frozen Sick:** funeral/investigation; cabin interviews; Pelc’s Curiosities; Croaker Cave (ice frogs, bandits, Hulil/Raegrin); travel to Syrinlya; trek to Salsvault; security construct; lab/archives; containment vault; resolution and return.
- **Temple of the Dragonknights:** kobolds vs guards; farm investigation; trail to cavern; cavern approach/puzzles; constructs; temple exploration; ritual chamber; final ritual with Venomfang.
- **The Wild Sheep Chase:** Shinebright’s introduction; Guz and polymorphed guards; Noke’s Tower; compound; tower skirmish finale.
- **Peril in Pinebrook:** investigation (troll tracks/missing patrols); baby silver dragon discovery; living icicles; egg snatchers; dragon alliance.

\page
<!-- FILE_END: ../Season 1/The_Story_So_Far.md -->

<!-- FILE_START: ../Season 1/DM_Resources/Session_Prep_Guide.md -->
{{note
##### 📋 DUNGEON MASTER RESOURCE

**DM Session Preparation Guide**

This document contains DM tools and guidance for running Northwatch Wardens sessions. Some sections reference campaign secrets.

**For campaign spoilers**, see `Season 1/DM_Resources/NORTHWATCH WARDENS - Campaign Arc.md`
}}

# Northwatch Wardens: DM Session Prep Guide


## Quick Reference: Campaign Flow & Cohesion

### ✅ Campaign DOES Flow Well Because:

1. **Strong Narrative Thread** - The "Aeorian Echo" connects all adventures
2. **Clear Structure** - Guild hub (Waystone Inn) provides natural session start/end points
3. **Recurring NPCs** - Guild leadership appears throughout, creating continuity
4. **Escalating Threat** - Magic corruption spreads from Welton → Palebank → Temple
5. **Flexible Pacing** - Adventures can be played in different orders (except Frozen Sick should come before Temple)

### 🎯 What You Already Have:

- ✅ **9 recurring NPCs** with personalities, secrets, and campaign ties
- ✅ **53 encounters** with multiple resolution paths
- ✅ **Clear geography** - Waystone Inn as hub, 6 satellite locations
- ✅ **Thematic consistency** - Frontier survival, moral choices, magical corruption
- ✅ **Built-in session hooks** - Contracts from Marshal Brenna Thorne

---

## Session Recap System

### Option 1: Player-Led Recap (RECOMMENDED)

**At start of each session:**

1. **"Last time on Northwatch Wardens..."** - Ask players:
   - "What happened last session?"
   - "What did your character learn?"
   - "What's your character worried about?"

2. **DM adds what they forgot** - Fill in 1-2 key details

**Why this works:**
- Players engage more when they recap
- You learn what they care about
- Shows what they remember vs. what they missed

### Option 2: DM Recap Template

Use this if players are new or struggling:

```
LAST SESSION RECAP:
• Where: [Location]
• Quest: [Contract/Goal]
• What happened: [2-3 key events]
• Clue discovered: [Aeorian Echo hint]
• Current status: [Where they are now]
```

---

## Session Opening Template

### Every Session Starts at Waystone Inn

**Session 0: Charter Signing** (covered in xml)

**Session 1+:**

```
MORNING AT WAYSTONE INN:

[Weather/Atmosphere]
The common room of Waystone Inn smells of bacon and woodsmoke. 
[Returning party gets hero's welcome OR new arrivals get curious looks]

GUILD BUSINESS:
• Report contract results to Marshal Brenna (if returning)
• Receive payment from Steward Mara
• Get intelligence briefing from Lorewarden Elric
• New contract offered (or rumor/NPC approach)

CHOICE POINT:
"What do you do?"
```

**This creates natural rhythm:**
- Downtime → Briefing → Adventure → Return → Repeat

---

## Between-Session Continuity Tracking

### Keep This Simple Document

```markdown

\page

## Northwatch Wardens: Campaign Tracker

**Current Date:** [In-game date]
**Party Level:** [1-5]
**Contracts Completed:** [List]

### Important Choices Made:
- Wolves of Welton: [Killed/Negotiated/Compromised]
- Frozen Sick: [Who got cured? Urgon? Tulgi?]
- Temple: [Venomfang killed/fled/negotiated?]

### NPCs Met & Reputation:
- Marshal Brenna: [Trusts party / Neutral / Suspicious]
- Father Merriksonn: [If Welton resolved peacefully, he's grateful]
- Captain Kole: [If Pinebrook completed]

### Aeorian Echo Clues Discovered:
- [ ] Wolves awakened by sorcerer's death (magical feedback)
- [ ] Palebank plague caused by Aeorian relic
- [ ] Salsvault still active and leaking magic
- [ ] Temple cult drawn to magical disturbance
- [ ] Elric suspects "arcane engine beneath Northreach"

### Unfinished Business:
- [Note anything party said they'd return to]
```


---

## Session Zero: Critical Setup

> **🚀 New DM?** For a streamlined Session 0 guide with everything you need in one place, see **[SESSION 0 QUICK START GUIDE](../SESSION_0_QUICK_START.md)** (30-minute prep time). This section provides additional advanced tips for Session Zero.

### Player Character Ties to Waystone Inn

**Ask each player:**

> "Why did your character join the Northwatch Wardens?"

**Suggested Answers:**
- Hired by Marshal Brenna after proving themselves
- Rescued by Wardens, now repaying debt
- Seeking purpose after loss/trauma
- Frontier native, wants to protect home
- Outsider seeking fresh start
- Recommended by another Warden (NPC or absent PC)

**Result:** Every PC has reason to return to Waystone Inn between adventures

### Establish Ground Rules

1. **West Marches Style Play:**
   - Adventures are modular (can skip sessions without breaking story)
   - Party composition can change between contracts
   - Waystone Inn is constant hub

2. **Advancement:**
   - **RECOMMENDED:** Milestone leveling (level up after each major adventure)
   - Level 1 → 2: After Wolves of Welton
   - Level 2 → 3: After Frozen Sick OR Temple
   - Level 3 → 4: After completing 2 major adventures
   - Level 4 → 5: After Temple of Dragonknights

3. **Tone Expectations:**
   - Grounded, low-magic frontier
   - Moral choices matter
   - Combat is dangerous (no guaranteed wins)
   - Investigation and social encounters are equally important

---

## Adventure Order Recommendations

### Flexible Order (Players Choose):

**Level 1-2 Adventures:**
- Wolves of Welton (GREAT starter - teaches negotiation)
- Peril in Pinebrook (investigation-heavy, shorter)

**Level 2-3 Adventures:**
- Frozen Sick (reveals Aeorian Echo explicitly)
- Wild Sheep Chase (comic relief, can slot anywhere)

**Level 3-5 Adventures:**
- Temple of Dragonknights (campaign capstone, best done last)

### Recommended Story Order:

1. **Wolves of Welton** (Level 1-2)
   - Introduces magical corruption theme
   - Teaches players moral complexity

2. **Wild Sheep Chase** (Level 2-3) 
   - Comic relief after serious adventure
   - Can be random encounter near Waystone

3. **Frozen Sick** (Level 2-3)
   - REVEALS Aeorian Echo directly
   - Sets up Salsvault as "source"
   - Best before Temple

4. **Peril in Pinebrook** (Level 2-3)
   - Can slot anywhere
   - Reinforces "frontier fragility" theme

5. **Temple of Dragonknights** (Level 3-5)
   - Cult drawn by magical disturbances
   - Epic finale
   - Venomfang as major threat

---

## DM Preparation Per Session

\page


### 1 Week Before Session:

- [ ] Review next adventure from XML
- [ ] Read NPC descriptions for any appearing this session
- [ ] Note 2-3 ways players could surprise you
- [ ] Prepare 1 "Aeorian Echo clue" to drop

### Day of Session:

- [ ] Re-read last session's notes
- [ ] Review encounter UIDs you'll use
- [ ] Print/bookmark stat blocks you need
- [ ] Prepare opening scene at Waystone Inn
- [ ] Have backup quest ready if players go off-script

### During Session:

**Track:**
- Important player choices
- NPCs met and player reactions
- Aeorian Echo clues discovered
- XP earned (if using XP) or milestones hit
- Any promises party made ("We'll come back for...")

### After Session:

- [ ] Update Campaign Tracker document
- [ ] Note what worked well / what didn't
- [ ] Write 1-sentence recap for next session opening
- [ ] Level up characters if milestone reached

---

## When Players Miss Sessions

### West Marches Solution:

**Missing player's PC:**
- "Is assigned a different contract by Marshal Brenna"
- OR "Takes a day off at Waystone Inn"
- OR "Is scouting ahead / gathering intel"

**Returning player:**
- Gets brief recap from other players
- "Marshal Brenna updates you on what happened"
- Rejoins at Waystone Inn for next contract

**This prevents:**
- "Why did my character vanish mid-dungeon?"
- Story breaking from inconsistent party

---

## Handling Player Choices That Break Campaign

### If Players Refuse All Contracts:

**Brenna's Response:**
> "You're Wardens. This is the job. If you don't want it, turn in your badges. But understand: these threats don't go away because you ignore them."

**Then show consequences:**
- Welton gets overrun by wolves (refugees arrive at Waystone)
- Palebank plague spreads (infected travelers show up)
- Temple cult grows stronger (rumors of dragon attacks)

### If Players Kill Important NPCs:

**Examples:**
- Kill Bolt (wolf negotiator): Flame takes over, attacks escalate
- Kill Marshal Brenna: Steward Mara takes over, guild becomes more cautious
- Kill Father Merriksonn: Welton becomes hostile to outsiders


**Philosophy:** Actions have consequences, but campaign continues

---


\page

## Improvisation Toolkit

### When Players Go Off-Script:

**You have these tools:**
- **9 NPCs** - Any can approach party with information
- **6 Locations** - Can drop random encounter at any
- **Wild Sheep Chase** - Can trigger anywhere, anytime
- **Elric's Research** - Can provide lore dump if players are lost

### Random Encounter Table (1d6):

1. **Merchant caravan** from Pinebrook, wants escort to Waystone
2. **Wounded traveler** from Welton, reports trouble
3. **Mysterious sheep** (Shinebright, starts Wild Sheep Chase)
4. **Winter storm** (forces shelter, roleplay opportunity)
5. **Bandits** (2d4 bandits, CR 1/8 each)
6. **Aeorian anomaly** (magical effect: blue glow, temperature drop, animals acting strange)

---

## Session Pacing Guide

### 4-Hour Session Breakdown:

**Hour 1: Setup & Hook**
- 0:00-0:15 - Recap, catch up, snacks
- 0:15-0:45 - Return to Waystone Inn, report/payment/briefing
- 0:45-1:00 - New contract offered, party prep & travel

**Hour 2: Investigation**
- 1:00-2:00 - Social encounters, clue gathering, NPC interactions

**Hour 3: Action**
- 2:00-3:00 - Combat or major skill challenge

**Hour 4: Resolution**
- 3:00-3:45 - Aftermath, rewards, character moments
- 3:45-4:00 - Return to Waystone Inn, tease next adventure

### 2-Hour Session Breakdown:

- 0:00-0:15 - Recap & hook at Waystone
- 0:15-1:00 - Investigation OR combat (pick one)
- 1:00-1:45 - Climax encounter
- 1:45-2:00 - Wrap-up, return to Waystone

---

## What You DON'T Need

### ❌ Don't Worry About:

- **Detailed maps** - Theater of mind works for most encounters
- **Perfect stat blocks** - Use approximations, adjust on the fly
- **Every NPC voice** - Consistent personality > accent
- **Rigid timeline** - Adventures are episodic, not time-critical
- **Balanced encounters** - 5e is forgiving, and you have scaling notes

### ✅ Instead Focus On:

- **Player choices mattering** - Remember what they decide
- **NPCs reacting to party reputation** - Did they help Welton? People remember
- **Aeorian Echo building** - Drop 1 hint per session
- **Making Waystone Inn feel like home** - Describe it consistently, NPCs greet by name

---

## Emergency DM Moves

### Party is Stuck:

1. **Elric sends research notes** (clue delivery)
2. **NPC approaches with information** (guide them)
3. **Brenna calls them back** ("I have new intel for you")

### Party is Dying:

1. **Mysterious helper** (Elric was following, uses magic to help)
2. **Enemy retreats** ("You're not worth killing" - villain leaves)
3. **Captured instead of killed** (wake up as prisoners, now must escape)

### Players Are Bored:

1. **Ambush NOW** (bandits, wolves, or random encounter)
2. **NPC betrayal** (someone they trust isn't trustworthy)
3. **Sheep appears** (start Wild Sheep Chase immediately)

---

## Final DM Advice

### This Campaign DOES Work Because:

1. **You have 53 encounters** with rich content - plenty to work with
2. **Guild structure** provides natural rhythm (contracts in/out)
3. **Aeorian Echo** ties everything together thematically
4. **Multiple resolution paths** mean player agency matters
5. **Episodic structure** handles schedule flexibility

### Player Recap Works Naturally Because:

- **Guild briefings** create natural recap moments
- **Returning to Waystone** bookends each adventure
- **NPCs remember** what party did (provides continuity)
- **Aeorian Echo** gives players something to theorize about between sessions

### You're Ready To Run This If You:

- [x] Read the adventure you'll run next session
- [x] Know the 3 guild NPCs (Brenna, Mara, Elric)

- [x] Understand Waystone Inn as hub
- [x] Let players recap themselves
- [x] Track major choices in simple document

---

## Quick Start Checklist

\page


### Session 1 (Charter Signing):
- [ ] Read Opening Session (uid 2013)
- [ ] Introduce 3 guild leaders
- [ ] Sign charter (gives badges)
- [ ] Offer Contract W-17 (Wolves of Welton)
- [ ] End: "You prepare to leave at dawn"

### Session 2 (First Adventure):
- [ ] Recap: "You're traveling to Welton"
- [ ] Run Wolves of Welton
- [ ] End: Return to Waystone, payment, celebration
- [ ] Tease next adventure (player choice)

### You're Off and Running! 🎉

The campaign will flow naturally. Trust your prep, let players drive choices, and enjoy the frontier!

\page
<!-- FILE_END: ../Season 1/DM_Resources/Session_Prep_Guide.md -->

<!-- FILE_START: ../Season 1/DM_Resources/NPC Roster — By Location & Adventure (DM).md -->
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: NPC Roster with Locations**

This document contains NPCs organized by location with some secret details. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe NPC information**, see `World Building/Regions/Northreach/People_of_Northreach.md`
}}

# Northwatch Wardens

<!-- markdownlint-disable MD033 MD045 -->

## NPC Roster (DM)

DM-facing roster of named NPCs (and a few "NPC-grade" antagonists) grouped by **location/adventure** for *Northwatch Wardens: Season One*.

### Notes

- Synthesized from your campaign XML + DM roster notes; summaries are intentionally **original**.
- Portraits are shown when available in `Season 1/Campaign Assets/Images`.

\page

## Waystone Inn (Guild HQ)

### Guild Leadership

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/DC56B5k.jpg" width="90" alt="Marshal Brenna Thorne" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Marshal Brenna Thorne</strong> — field commander; pragmatic, protective, suspicious of "easy answers."</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/7zDKfWX.jpg" width="90" alt="Steward Mara Fenwick" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Steward Mara Fenwick</strong> — quartermaster &amp; logistics; bright smile, sharp eyes, knows the underworld.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/OOBoXAR.jpg" width="90" alt="Lorewarden Elric Vael" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Lorewarden Elric Vael</strong> — scholar &amp; pattern-spotter; calm voice, always taking notes.</td>
  </tr>
</table>

### Wardens & Regulars

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/yxGZKlq.png" width="90" alt="Sera Gelanadel" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Sera Gelanadel</strong> — apprentice wizard; eager, brilliant, overextended; great quest-brief/translator NPC.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/nujs23r.png" width="90" alt="Bordel Barleywind" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Bordel Barleywind</strong> — quiet ranger; steady scout; prefers the trail to the taproom.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/duyvslN.png" width="90" alt="Rowan Fairweather" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Rowan Fairweather</strong> — druidic guide; gentle, curious, and deeply attuned to the wilderness.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/FyxJWvt.png" width="90" alt="Takk Oaksplitter" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Takk Oaksplitter</strong> — lantern guard bruiser; loud, friendly, and always ready to volunteer first.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/BSNEKgT.png" width="90" alt="Galvena Aballon" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Galvena Aballon</strong> — disciplined paladin; devout, unwavering, and serious about safety and oaths.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/1fiVcFE.png" width="90" alt="Ariodh Highwhirl" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Ariodh Highwhirl</strong> — monk; calm, focused, philosophical; prefers diplomacy before a fight.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/0K66wmO.png" width="90" alt="Guz" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Guz</strong> — bruiser with a conscience; gruff, awkward, trying his best; potential redemption ally.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/iltxa3w.png" width="90" alt="Mila Teno" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Mila Teno</strong> — rookie scout; brave-but-shaken; good for "human cost" moments and hard choices.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/fUWF9C0.png" width="90" alt="Aurixean Valignaak" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Aurixean Valignaak</strong> — dragonborn sorcerer; proud, charismatic, and dramatic; impossible to ignore.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/gxsZ6Qh.jpg" width="90" alt="Flynt Wymblen" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Flynt Wymblen</strong> — bard &amp; rumor-mill; comic relief that can also deliver prophecy-by-song.</td>
  </tr>
</table>

### Opening Adventure: Wolves at the Waystone

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/xCNcelg.png" width="90" alt="Waystone Wolf (Opening)" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Waystone Wolf (Opening)</strong> — the "wrong-feeling" wolf that kicks off the tone (use as omen; not just a random beast).</td>
  </tr>
</table>

\page

## Welton (Wolves of Welton)

### Welton Core NPCs

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/UiQtsus.jpg" width="90" alt="Corel" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Corel</strong> — senior shepherd; knows wolf behavior better than anyone; anchor for diplomacy vs. slaughter.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/RDbpNzD.jpg" width="90" alt="Father Johan Merriksonn" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Father Johan Merriksonn</strong> — village priest; grief + duty; steady moral compass with cracks showing.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/UUuiBcg.jpg" width="90" alt="Alexi Merriksonn" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Alexi Merriksonn</strong> — missing sorcerer; tragedy + mystery + arcane fallout; answers with consequences.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/q0t6X9G.jpg" width="90" alt="Willen Featherock" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Willen Featherock</strong> — traumatized shepherd; first-hand witness; the "ordinary person" perspective.</td>
  </tr>
</table>

### Welton Council / Community

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/jOsvoOZ.png" width="90" alt="Tillus Merrion" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Tillus Merrion</strong> — council member; politics and coin-first pragmatism; can obstruct or enable with leverage.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/khdkxXU.png" width="90" alt="Leanor Slatebeard" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Leanor Slatebeard</strong> — innkeeper of the Shepherd's Crook; warm, suspicious of outsiders, knows everyone's business.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/EI33MV8.jpg" width="90" alt="Banteth Slatebeard" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Banteth Slatebeard</strong> — Leanor's spouse; steadier temperament; turns conflict into food and small kindnesses.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Marta Henwick</strong> — small-shop proprietor; gossip hub; can leak clues or be threatened for them.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/XRPU9yL.jpg" width="90" alt="Irven Liel" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Irven Liel</strong> — Welton-associated NPC in XML; useful as a courier, middleman, or "I saw something" witness when you need a human breadcrumb trail.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/frpcU8i.jpg" width="90" alt="Arl Bortock" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Arl Bortock</strong> — local figure (Welton-associated in XML); good "town voice" NPC for grounded scenes.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/phlmuRa.jpg" width="90" alt="Fenton Tethwick" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Fenton Tethwick</strong> — Welton-associated NPC in XML; flexible lever (witness, rival, or reluctant helper).</td>
  </tr>
</table>

### Awakened Wolves (Faction NPCs)

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/4oD3lBF.jpg" width="90" alt="Bolt" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Bolt</strong> — awakened alpha; diplomatic, frightened of what he's becoming; strong recurring nonhuman ally.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/J4lh2Bs.jpg" width="90" alt="Flame" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Flame</strong> — awakened alpha; proud, aggressive, tempted by domination; recurring rival faction leader.</td>
  </tr>
</table>

\page

## Pinebrook (Peril in Pinebrook)

### Pinebrook Authorities

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/lwDmJHh.png" width="90" alt="Captain Emmajeen Kole" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Captain Emmajeen Kole</strong> — guard captain; direct, disciplined; wants results and safety, not heroics.</td>
  </tr>
</table>

### Key "NPC-grade" Creature

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/euDwslI.png" width="90" alt="Silver Dragon Wyrmling (baby)" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Silver Dragon Wyrmling (baby)</strong> — bond hook; nonverbal NPC that can define party identity (protectors vs. opportunists).</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/MKGXal6.png" width="90" alt="Hysvearorn (Rorn)" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Hysvearorn ("Rorn")</strong> — adult silver dragon; her full name translates as “Soaring Silver.” She insists non-dragons call her Rorn; protective, intelligent, and willing to negotiate… right up until the party proves untrustworthy.</td>
  </tr>
</table>

\page

## Palebank Village (Frozen Sick)

### Palebank Leadership & Locals

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/Jd3rjFU.png" width="90" alt="Elro Aldataur" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Elro Aldataur</strong> — quest-giver/leader voice; careful, tired, protective; pushes the party into the wider frozen mystery.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/kaLHuR3.jpg" width="90" alt="Verla Pelc" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Verla Pelc</strong> — merchant with dangerous connections; leverage, desperation, and secrets.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/81oYw9f.png" width="90" alt="Urgon" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Urgon</strong> — blacksmith (funeral hook); community keystone; even deceased, his presence matters.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Tulgi</strong> — healer; tense, defensive; knows more than she admits; ally or suspect depending on approach.</td>
  </tr>
</table>

\page

## Croaker Cave (Frozen Sick)

### Antagonists

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Hulil Lutan</strong> — cult-tied operative; smart, ruthless; prefers control and escape routes over fair fights.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Raegrin Mau</strong> — cultist lieutenant; zeal + fear; can crack under pressure or double down.</td>
  </tr>
</table>

### Notable Creature (optional)

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Old Croaker</strong> — "boss" cave beast; play as a living hazard with habits, territory, and bargaining options.</td>
  </tr>
</table>

\page

## Salsvault (Frozen Sick)

### Named / Role NPCs

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Morgo Delwur</strong> — expedition guide/contact; calm competence; can offer hard truths about survival and risk.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Orvo Mustave</strong> — anxious survivor; key witness; feeds urgency and the feeling that time matters.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>The Buyer</strong> — mysterious patron &amp; relic broker; controlled tone, measured generosity; long-term faction contact.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Dew</strong> — faerie dragon familiar; playful misdirection + sudden sincerity; strong tonal contrast.</td>
  </tr>
</table>

### Antagonist / Threat (optional)

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Ferol Sal</strong> — ruin's willful, dangerous "mind behind the suffering" (even if undead); can negotiate from advantage.</td>
  </tr>
</table>

\page

## Noke's Tower (Wild Sheep Chase)

### Key NPCs

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/l0McAF7.png" width="90" alt="Finethir Shinebright (polymorphed)" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Finethir Shinebright (polymorphed)</strong> — brilliant wizard as a sheep; arrogant, funny, useful; recurring magical contact.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Ahmed Noke</strong> — antagonist; petty-genius energy; can play pathetic, terrifying, or both.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/0K66wmO.png" width="90" alt="Guz" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Guz</strong> — bruiser with a conscience; redemption candidate; useful for "enemy with a line."</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/dY6aoPz.jpg" width="90" alt="Guz's Wolf" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Guz's Wolf</strong> — intelligent collared wolf; reads like a person with tactics and fear.</td>
  </tr>
</table>

### Polymorphed Guard (optional)

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/CF8vnZ6.jpg" width="90" alt="Polymorphed Brown Bear" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Polymorphed Brown Bear</strong> — memorable "this wizard is reckless" proof.</td>
  </tr>
</table>

\page

## Temple of the Dragonknights (Capstone)

### Key NPCs (Andersmith Family)

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/gqfEDrT.png" width="90" alt="Joel Andersmith" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Joel Andersmith</strong> — grieving parent; moral pressure; makes the threat personal and immediate.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Clementine Andersmith</strong> — endangered child; rescue stakes; future campaign hook if saved.</td>
  </tr>
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;"><img src="https://i.imgur.com/yxGZKlq.png" width="90" alt="Sera Gelanadel" style="display: block;" /></td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Sera Gelanadel</strong> — (also listed at Waystone) works well as field scholar/arcane support for this arc.</td>
  </tr>
</table>

### Major Antagonist (optional)

<table class="npc-roster" style="width: 100%; border-collapse: collapse; background: transparent; border: none;">
  <tr>
    <td width="96" valign="top" style="vertical-align: top; border: none; background: transparent;">&nbsp;</td>
    <td valign="top" style="vertical-align: top; border: none; background: transparent;"><strong>Venomfang</strong> — campaign-tier threat; intelligent predator; treats bargains as traps.</td>
  </tr>
</table>

\page

## Portrait Checklist (What to Generate)

### Already in Images folder

- Brenna Thorne, Mara Fenwick, Elric Vael
- Bordel Barleywind, Rowan Fairweather
- Sera Gelanadel, Mila Teno
- Corel, Alexi Merriksonn, Father Johan Merriksonn
- Galvena Aballon, Takk Oaksplitter, Ariodh Highwhirl
- Guz
- Willen Featherock
- Bolt, Flame
- Tillus Merrion, Leanor Slatebeard
- Banteth Slatebeard
- Arl Bortock, Fenton Tethwick, Irven Liel
- Flynt Wymblen
- Captain Emmajeen Kole
- Guz's Wolf
- Elro Aldataur, Urgon
- Aurixean Valignaak
- Shinebright
- Baleth Cindermoon
- Joel Andersmith
- Verla Pelc
- Waystone Wolf (Opening)
- Polymorphed Brown Bear
- Silver Dragon Wyrmling (baby)
- Hysvearorn (Rorn)

\page

### Portrait Gallery (Already in Images folder)

<p>
  <img src="https://i.imgur.com/DC56B5k.jpg" width="70" alt="Marshal Brenna Thorne" title="Marshal Brenna Thorne" />
  <img src="https://i.imgur.com/7zDKfWX.jpg" width="70" alt="Steward Mara Fenwick" title="Steward Mara Fenwick" />
  <img src="https://i.imgur.com/OOBoXAR.jpg" width="70" alt="Lorewarden Elric Vael" title="Lorewarden Elric Vael" />
  <img src="https://i.imgur.com/yxGZKlq.png" width="70" alt="Sera Gelanadel" title="Sera Gelanadel" />
  <img src="https://i.imgur.com/iltxa3w.png" width="70" alt="Mila Teno" title="Mila Teno" />
  <img src="https://i.imgur.com/UiQtsus.jpg" width="70" alt="Corel" title="Corel" />
  <img src="https://i.imgur.com/UUuiBcg.jpg" width="70" alt="Alexi Merriksonn" title="Alexi Merriksonn" />
  <img src="https://i.imgur.com/RDbpNzD.jpg" width="70" alt="Father Johan Merriksonn" title="Father Johan Merriksonn" />
  <img src="https://i.imgur.com/q0t6X9G.jpg" width="70" alt="Willen Featherock" title="Willen Featherock" />
  <img src="https://i.imgur.com/4oD3lBF.jpg" width="70" alt="Bolt" title="Bolt" />
  <img src="https://i.imgur.com/J4lh2Bs.jpg" width="70" alt="Flame" title="Flame" />
  <img src="https://i.imgur.com/jOsvoOZ.png" width="70" alt="Tillus Merrion" title="Tillus Merrion" />
  <img src="https://i.imgur.com/khdkxXU.png" width="70" alt="Leanor Slatebeard" title="Leanor Slatebeard" />
</p>

\page

<p>
  <img src="https://i.imgur.com/EI33MV8.jpg" width="70" alt="Banteth Slatebeard" title="Banteth Slatebeard" />
  <img src="https://i.imgur.com/frpcU8i.jpg" width="70" alt="Arl Bortock" title="Arl Bortock" />
  <img src="https://i.imgur.com/phlmuRa.jpg" width="70" alt="Fenton Tethwick" title="Fenton Tethwick" />
  <img src="https://i.imgur.com/XRPU9yL.jpg" width="70" alt="Irven Liel" title="Irven Liel" />
  <img src="https://i.imgur.com/gxsZ6Qh.jpg" width="70" alt="Flynt Wymblen" title="Flynt Wymblen" />
  <img src="https://i.imgur.com/lwDmJHh.png" width="70" alt="Captain Emmajeen Kole" title="Captain Emmajeen Kole" />
  <img src="https://i.imgur.com/nujs23r.png" width="70" alt="Bordel Barleywind" title="Bordel Barleywind" />
  <img src="https://i.imgur.com/duyvslN.png" width="70" alt="Rowan Fairweather" title="Rowan Fairweather" />
  <img src="https://i.imgur.com/FyxJWvt.png" width="70" alt="Takk Oaksplitter" title="Takk Oaksplitter" />
  <img src="https://i.imgur.com/BSNEKgT.png" width="70" alt="Galvena Aballon" title="Galvena Aballon" />
  <img src="https://i.imgur.com/1fiVcFE.png" width="70" alt="Ariodh Highwhirl" title="Ariodh Highwhirl" />
  <img src="https://i.imgur.com/0K66wmO.png" width="70" alt="Guz" title="Guz" />
  <img src="https://i.imgur.com/dY6aoPz.jpg" width="70" alt="Guz's Wolf" title="Guz's Wolf" />
  <img src="https://i.imgur.com/fUWF9C0.png" width="70" alt="Aurixean Valignaak" title="Aurixean Valignaak" />
  <img src="https://i.imgur.com/l0McAF7.png" width="70" alt="Shinebright" title="Shinebright" />
  <img src="https://i.imgur.com/nx7gShD.png" width="70" alt="Baleth Cindermoon" title="Baleth Cindermoon" />
  <img src="https://i.imgur.com/gqfEDrT.png" width="70" alt="Joel Andersmith" title="Joel Andersmith" />
  <img src="https://i.imgur.com/Jd3rjFU.png" width="70" alt="Elro Aldataur" title="Elro Aldataur" />
  <img src="https://i.imgur.com/81oYw9f.png" width="70" alt="Urgon" title="Urgon" />
  <img src="https://i.imgur.com/kaLHuR3.jpg" width="70" alt="Verla Pelc" title="Verla Pelc" />
  <img src="https://i.imgur.com/xCNcelg.png" width="70" alt="Waystone Wolf (Opening)" title="Waystone Wolf (Opening)" />
  <img src="https://i.imgur.com/CF8vnZ6.jpg" width="70" alt="Polymorphed Brown Bear" title="Polymorphed Brown Bear" />
  <img src="https://i.imgur.com/euDwslI.png" width="70" alt="Silver Dragon Wyrmling (baby)" title="Silver Dragon Wyrmling (baby)" />
  <img src="https://i.imgur.com/MKGXal6.png" width="70" alt="Hysvearorn (Rorn)" title="Hysvearorn (Rorn)" />
</p>

\page

### High-priority portraits to generate (recurring / social-heavy)
- **Tulgi**
- **The Buyer**
- **Morgo Delwur**
- **Orvo Mustave**
- **Hulil Lutan**
- **Raegrin Mau**
- **Ahmed Noke**
- **Clementine Andersmith**

### Low-priority / optional portraits (mostly combat pieces)

- Ferol Sal, Venomfang, Old Croaker, constructs/undead, polymorphed animals, etc.

\page
<!-- FILE_END: ../Season 1/DM_Resources/NPC Roster — By Location & Adventure (DM).md -->

