# World Building Web Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate 54 source files from `_print/World Building/` into the web DM panel so all campaign-critical lore is accessible during a live session.

**Architecture:** Source files are Homebrewery V3 formatted `.md` — they contain `{{...}}` blocks, `\page`/`\column` directives, image references, and HTML comment headers. Each file must be converted to clean standard markdown before writing to the target web path. No Homebrewery syntax should appear in web output files. The web server already renders `marked` markdown for all web dirs (`locations/`, `npcs/`, `player-lore/`, `gm-lore/`, `factions/`).

**Tech Stack:** Plain markdown (CommonMark), Node.js/Express web server (`web/server.js`), browser-side `marked` rendering

**Conversion Rule (apply to every file):** Strip these patterns before writing:
- `<!--...-->` HTML comment headers
- `{{wide`, `{{descriptive`, `{{note`, `{{monster,frame}}` and their closing `}}`
- `\page`, `\column`
- `{{pageNumber,auto}}`, `{{footnote ...}}`
- Image markdown: `![alt](url){...}` → remove entirely
- `{{...}}` blocks without recognized content → remove
- Homebrewery table headers like `|:--|:--|` (use `|---|---|` instead)

**Priority tiers are ordered by session utility** — a DM running a session needs DM secrets first, then location/NPC quick-reference, then player lore.

---

## File Map

### New files to create

| Target Path | Source |
|------------|--------|
| `gm-lore/world/aevorian-echo.md` | `DMEyesOnly/The_Aevorian_Echo.md` |
| `gm-lore/world/people-secrets.md` | `DMEyesOnly/People_Secrets.md` |
| `gm-lore/world/places-secrets.md` | `DMEyesOnly/Places_Secrets.md` |
| `gm-lore/world/northreach-dm.md` | `DMEyesOnly/Northreach.md` |
| `gm-lore/world/dimensional-rift.md` | `DMEyesOnly/The_Dimensional_Rift.md` |
| `gm-lore/world/far-north-secrets.md` | `DMEyesOnly/The_Far_North_Secrets.md` |
| `gm-lore/world/nullwood-secrets.md` | `DMEyesOnly/Nullwood_Secrets.md` |
| `gm-lore/world/emberlands-dm.md` | `DMEyesOnly/Emberlands.md` |
| `gm-lore/world/shattered-coast-dm.md` | `DMEyesOnly/ShatteredCoast.md` |
| `gm-lore/world/solaris-dm.md` | `DMEyesOnly/Solaris.md` |
| `gm-lore/world/stonebound-dm.md` | `DMEyesOnly/StoneboundDepths.md` |
| `gm-lore/world/sunken-dominion-dm.md` | `DMEyesOnly/SunkenDominion.md` |
| `gm-lore/world/verdant-marches-dm.md` | `DMEyesOnly/VerdantMarches.md` |
| `gm-lore/world/vharoxis-dm.md` | `DMEyesOnly/Vharoxis.md` |
| `gm-lore/practical/common-goods.md` | `Practical/Common_Goods_and_Services.md` |
| `gm-lore/practical/currency-and-trade.md` | `Practical/Currency_and_Trade.md` |
| `gm-lore/practical/travel-and-distance.md` | `Practical/Travel_and_Distance.md` |
| `player-lore/northreach-setting-primer.md` | `Regions/Northreach/Northreach_Setting_Primer.md` |
| `player-lore/cultures-of-northreach.md` | `Regions/Northreach/Cultures_of_Northreach.md` |
| `player-lore/songs-of-northreach.md` | `Regions/Northreach/SongsOfTheNorthreach.md` |
| `player-lore/quick-reference.md` | `Player_Quick_Reference.md` |
| `player-lore/glossary.md` | `Appendix/Glossary.md` |
| `player-lore/character-creation.md` | `Character_Creation/Creating_Your_Character.md` |
| `player-lore/languages-and-culture.md` | `Character_Creation/Languages_and_Culture.md` (2428 lines — keep as single searchable file) |
| `player-lore/regional-origins.md` | `Character_Creation/Regional_Origins.md` (1457 lines — keep as single file, clear H2 sections per region) |
| `player-lore/religion.md` | `Religion/Divinitys_Beacon_Pantheon.md` + `Religion/Religious_Practices.md` (merged) |
| `player-lore/region-overview.md` | `Regions/00_Master_Index.md` (world map context) |
| `locations/northreach/index.md` | `Regions/Northreach/Places_of_Northreach.md` (location overview/index) |
| `locations/northreach/divinitys-beacon.md` | `Locations/Divinitys_Beacon.md` |
| `locations/northreach/solace-nexus.md` | `Locations/Solace_Nexus.md` |
| `factions/index.md` | `Organizations/Organizations_Overview.md` |
| `factions/northwatch-wardens-charter.md` | `Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md` |

### Files to decompose

| Source | Target | Note |
|--------|--------|------|
| `Regions/Northreach/People_of_Northreach.md` (648 lines, ~15 NPCs) | Individual files in `npcs/core/` | One file per NPC; existing core files (brenna-thorne.md, mara-fenwick.md, elric-vael.md) already exist — supplement or skip if already rich enough |

### Files to skip (not needed in web UI)

| File | Reason |
|------|--------|
| `DMEyesOnly/Region_Content_Audit.md` | Admin/meta doc, not campaign content |
| `MapMaking/` (3 files) | Map tool docs, not session-useful lore |
| `README.md` | Repo readme |
| `Introduction/How_To_Use_This_Book.md` | Print guide intro, irrelevant at table |
| `Regions/Northreach/Northreach_Setting_Primer_OLD.md` | Superseded |
| `Regions/00_Master_Index_OLD.md` | Superseded |
| `Scratchpad.md` | Working notes |
| `Regions/Northreach/Northreach_Journal_and_Lore.md` | Review after other files are migrated |
| `Regions/02_Solaris_Dominion.md` through `10_The_Far_North.md` | Region files — DM secrets already captured in DMEyesOnly; player summaries go into `player-lore/region-overview.md` from the master index |
| `Regions/01_Northreach.md` | Covered by Setting Primer + Places + People |

---

## Tier 1: DM Secrets (Session-Critical)

### Task 1: Create gm-lore/world/ directory structure

**Files:**
- Create: `gm-lore/world/` (directory — create by adding first file)

- [ ] **Step 1: Create the Aevorian Echo master doc**

Read `_print/World Building/DMEyesOnly/The_Aevorian_Echo.md`, strip Homebrewery syntax (HTML comment header, `{{note ...}}`, `\page`, `\column`), write to `gm-lore/world/aevorian-echo.md`. Keep all prose — this is the campaign bible.

- [ ] **Step 2: Verify in web UI**

Start server (`node web/server.js`), open `http://localhost:3000`, click **GM Lore** tab, confirm `world/` folder appears and `aevorian-echo.md` renders cleanly with no `{{` or `\page` artifacts.

- [ ] **Step 3: Commit**

```bash
git add gm-lore/world/aevorian-echo.md
git commit -m "feat: add Aevorian Echo campaign bible to gm-lore/world"
```

---

### Task 2: Migrate People Secrets and Places Secrets

**Files:**
- Create: `gm-lore/world/people-secrets.md`
- Create: `gm-lore/world/places-secrets.md`

- [ ] **Step 1: Convert People Secrets**

Read `_print/World Building/DMEyesOnly/People_Secrets.md`. Strip HTML comment header and any `{{...}}` blocks. This is a clean secrets sheet per NPC — keep all of it. Write to `gm-lore/world/people-secrets.md`.

- [ ] **Step 2: Convert Places Secrets**

Read `_print/World Building/DMEyesOnly/Places_Secrets.md`. Same stripping process. Write to `gm-lore/world/places-secrets.md`.

- [ ] **Step 3: Verify**

Both files appear under GM Lore → world/ in the file tree and render readable in the web panel.

- [ ] **Step 4: Commit**

```bash
git add gm-lore/world/people-secrets.md gm-lore/world/places-secrets.md
git commit -m "feat: add NPC and location secrets to gm-lore/world"
```

---

### Task 3: Migrate Northreach DM Notes + Dimensional Rift

**Files:**
- Create: `gm-lore/world/northreach-dm.md`
- Create: `gm-lore/world/dimensional-rift.md`

- [ ] **Step 1: Convert Northreach DM doc**

Read `_print/World Building/DMEyesOnly/Northreach.md`. Strip header/Homebrewery syntax. Write to `gm-lore/world/northreach-dm.md`.

- [ ] **Step 2: Convert Dimensional Rift**

Read `_print/World Building/DMEyesOnly/The_Dimensional_Rift.md`. Strip and write to `gm-lore/world/dimensional-rift.md`.

- [ ] **Step 3: Commit**

```bash
git add gm-lore/world/northreach-dm.md gm-lore/world/dimensional-rift.md
git commit -m "feat: add Northreach DM notes and dimensional rift to gm-lore/world"
```

---

### Task 4: Migrate Far North Secrets + Endgame Content

**Files:**
- Create: `gm-lore/world/far-north-secrets.md`

- [ ] **Step 1: Convert Far North Secrets**

Read `_print/World Building/DMEyesOnly/The_Far_North_Secrets.md`. Strip and write to `gm-lore/world/far-north-secrets.md`.

- [ ] **Step 2: Commit**

```bash
git add gm-lore/world/far-north-secrets.md
git commit -m "feat: add Far North endgame secrets to gm-lore/world"
```

---

### Task 5: Migrate Remaining Region DM Files (batch)

**Files:**
- Create: `gm-lore/world/nullwood-secrets.md`
- Create: `gm-lore/world/emberlands-dm.md`
- Create: `gm-lore/world/shattered-coast-dm.md`
- Create: `gm-lore/world/solaris-dm.md`
- Create: `gm-lore/world/stonebound-dm.md`
- Create: `gm-lore/world/sunken-dominion-dm.md`
- Create: `gm-lore/world/verdant-marches-dm.md`
- Create: `gm-lore/world/vharoxis-dm.md`

- [ ] **Step 1: Convert all 8 region DM files**

For each source file in `DMEyesOnly/` (Nullwood_Secrets, Emberlands, ShatteredCoast, Solaris, StoneboundDepths, SunkenDominion, VerdantMarches, Vharoxis): read, strip Homebrewery syntax, write to corresponding target path listed in the file map above.

- [ ] **Step 2: Commit**

```bash
git add gm-lore/world/
git commit -m "feat: add all regional DM secret files to gm-lore/world"
```

---

### Task 6: Migrate Practical Reference Files

**Files:**
- Create: `gm-lore/practical/common-goods.md`
- Create: `gm-lore/practical/currency-and-trade.md`
- Create: `gm-lore/practical/travel-and-distance.md`

These are pricing tables, currency exchange, and travel times — critical for on-the-fly rulings at the table.

- [ ] **Step 1: Convert Common Goods and Services**

Read `_print/World Building/Practical/Common_Goods_and_Services.md`. Strip Homebrewery syntax. Markdown tables should convert cleanly — make sure `|:--|` alignment syntax is changed to `|---|`. Write to `gm-lore/practical/common-goods.md`.

- [ ] **Step 2: Convert Currency and Trade**

Read `_print/World Building/Practical/Currency_and_Trade.md`. Strip, convert, write to `gm-lore/practical/currency-and-trade.md`.

- [ ] **Step 3: Convert Travel and Distance**

Read `_print/World Building/Practical/Travel_and_Distance.md`. Strip, convert, write to `gm-lore/practical/travel-and-distance.md`.

- [ ] **Step 4: Verify**

Open GM Lore tab — confirm `practical/` subfolder appears with all 3 files. Check that tables render correctly (no broken column alignment).

- [ ] **Step 5: Commit**

```bash
git add gm-lore/practical/
git commit -m "feat: add practical reference tables (goods, currency, travel) to gm-lore"
```

---

## Tier 2: Locations

### Task 7: Create Locations Index

**Files:**
- Create: `locations/northreach/index.md`
- Create: `locations/northreach/divinitys-beacon.md`
- Create: `locations/northreach/solace-nexus.md`

The existing `locations/northreach/` files (waystone-inn, welton, palebank-village, etc.) are already good stubs. `Places_of_Northreach.md` has a broader location overview that works well as a navigational index.

- [ ] **Step 1: Create locations index**

Read `_print/World Building/Regions/Northreach/Places_of_Northreach.md`. Strip Homebrewery syntax. This file covers Waystone Inn, Welton, Pinebrook, Palebank, and other locations with overview-level detail. Convert to `locations/northreach/index.md` — this serves as the "overview" file that the folder renders when clicked.

  The file should start with:
  ```markdown
  # Places of Northreach

  > *An overview of settlements and key locations across the frontier. Click any location in the file tree for full details.*

  ---
  ```
  Then the source content (stripped of Homebrewery).

- [ ] **Step 2: Create Divinity's Beacon stub**

Read `_print/World Building/Locations/Divinitys_Beacon.md`. Strip and write to `locations/northreach/divinitys-beacon.md`.

- [ ] **Step 3: Create Solace Nexus stub**

Read `_print/World Building/Locations/Solace_Nexus.md`. Strip and write to `locations/northreach/solace-nexus.md`.

- [ ] **Step 4: Update locations MANIFEST**

Read `locations/northreach/MANIFEST.md`. Add entries for the three new files:
```markdown
- [index.md](index.md) — Places of Northreach overview
- [divinitys-beacon.md](divinitys-beacon.md) — Divinity's Beacon
- [solace-nexus.md](solace-nexus.md) — Solace Nexus
```

- [ ] **Step 5: Commit**

```bash
git add locations/northreach/
git commit -m "feat: add locations index, Divinity's Beacon, and Solace Nexus"
```

---

## Tier 3: Player Lore

### Task 8: Setting Primer and Cultures

**Files:**
- Create: `player-lore/northreach-setting-primer.md`
- Create: `player-lore/cultures-of-northreach.md`

- [ ] **Step 1: Convert Setting Primer**

Read `_print/World Building/Regions/Northreach/Northreach_Setting_Primer.md`. Strip Homebrewery syntax. Also strip the large image markdown (`![Northreach player map](...)`) — web UI doesn't need it. Write to `player-lore/northreach-setting-primer.md`.

- [ ] **Step 2: Convert Cultures of Northreach**

Read `_print/World Building/Regions/Northreach/Cultures_of_Northreach.md`. Strip and write to `player-lore/cultures-of-northreach.md`.

- [ ] **Step 3: Verify**

Open Player Lore tab — both files appear and render. Setting Primer should have section headers for easy scanning.

- [ ] **Step 4: Commit**

```bash
git add player-lore/northreach-setting-primer.md player-lore/cultures-of-northreach.md
git commit -m "feat: add Northreach setting primer and cultures to player-lore"
```

---

### Task 9: Quick Reference, Glossary, and Songs

**Files:**
- Create: `player-lore/quick-reference.md`
- Create: `player-lore/glossary.md`
- Create: `player-lore/songs-of-northreach.md`

- [ ] **Step 1: Convert Quick Reference**

Read `_print/World Building/Player_Quick_Reference.md`. Strip and write to `player-lore/quick-reference.md`. This should be the first file DMs hand to new players — confirm it loads fast with no clutter.

- [ ] **Step 2: Convert Glossary**

Read `_print/World Building/Appendix/Glossary.md`. Strip and write to `player-lore/glossary.md`.

- [ ] **Step 3: Convert Songs**

Read `_print/World Building/Regions/Northreach/SongsOfTheNorthreach.md`. Strip and write to `player-lore/songs-of-northreach.md`. Songs likely use Homebrewery poem/verse formatting — convert to plain blockquotes or code blocks as appropriate.

- [ ] **Step 4: Commit**

```bash
git add player-lore/quick-reference.md player-lore/glossary.md player-lore/songs-of-northreach.md
git commit -m "feat: add quick reference, glossary, and songs to player-lore"
```

---

### Task 10: Character Creation and Regional Origins

**Files:**
- Create: `player-lore/character-creation.md`
- Create: `player-lore/regional-origins.md`

Regional Origins is 1457 lines covering all 10 Aevorian regions. Keep as a single file — it's a reference document and a single long scroll is more usable at the table than 10 files to navigate.

- [ ] **Step 1: Convert Character Creation Guide**

Read `_print/World Building/Character_Creation/Creating_Your_Character.md`. Strip and write to `player-lore/character-creation.md`.

- [ ] **Step 2: Convert Regional Origins**

Read `_print/World Building/Character_Creation/Regional_Origins.md` (1457 lines). Strip Homebrewery syntax throughout. The 10 regions should each have a clear `## Region Name` H2 header for browser Ctrl+F navigation. Write to `player-lore/regional-origins.md`.

- [ ] **Step 3: Verify**

Open Player Lore → regional-origins.md. Confirm 10 clear H2 section headers are present (Northreach, Solaris Dominion, etc.). No `{{wide`, `\column`, or other artifacts.

- [ ] **Step 4: Commit**

```bash
git add player-lore/character-creation.md player-lore/regional-origins.md
git commit -m "feat: add character creation guide and regional origins to player-lore"
```

---

### Task 11: Languages and Culture (Large File)

**Files:**
- Create: `player-lore/languages-and-culture.md`

This is the largest source file at 2428 lines. Keep as one file — splitting would make it harder to search during play.

- [ ] **Step 1: Convert Languages and Culture**

Read `_print/World Building/Character_Creation/Languages_and_Culture.md` in chunks (read lines 1-500, 500-1000, 1000-1500, 1500-2000, 2000-2428). Strip Homebrewery syntax throughout. Write complete converted content to `player-lore/languages-and-culture.md`.

- [ ] **Step 2: Verify major section headers**

The converted file should contain clear H2 headers for major sections (Languages, Cultural Practices, etc.) so a DM can Ctrl+F to find anything quickly.

- [ ] **Step 3: Commit**

```bash
git add player-lore/languages-and-culture.md
git commit -m "feat: add languages and culture reference to player-lore"
```

---

### Task 12: Religion and World Overview

**Files:**
- Create: `player-lore/religion.md`
- Create: `player-lore/region-overview.md`

- [ ] **Step 1: Merge Religion files**

Read both `Religion/Divinitys_Beacon_Pantheon.md` and `Religion/Religious_Practices.md`. Strip both. Combine into a single `player-lore/religion.md` with a `## The Pantheon` section followed by `## Religious Practices` section.

- [ ] **Step 2: Convert Region Overview**

Read `_print/World Building/Regions/00_Master_Index.md`. Strip and write to `player-lore/region-overview.md`. This gives players and DMs a quick map of all 10 regions without the full detail of individual region files.

- [ ] **Step 3: Commit**

```bash
git add player-lore/religion.md player-lore/region-overview.md
git commit -m "feat: add religion reference and region overview to player-lore"
```

---

## Tier 4: NPC Decomposition

### Task 13: Decompose People of Northreach

**Files:**
- Review: `npcs/core/brenna-thorne.md`, `npcs/core/mara-fenwick.md`, `npcs/core/elric-vael.md` (existing)
- Create: new files in `npcs/core/` for remaining NPCs

People_of_Northreach.md has ~15 NPCs. The three guild leaders already have files in `npcs/core/`. This task adds the remainder.

- [ ] **Step 1: Read People_of_Northreach.md and existing core NPC files**

Read `_print/World Building/Regions/Northreach/People_of_Northreach.md` to identify all NPCs and their sections. Read existing `npcs/core/brenna-thorne.md` to understand the current file format.

- [ ] **Step 2: Identify NPCs not yet in npcs/core/**

Compare the People_of_Northreach NPC roster against existing `npcs/core/` files. List any NPCs that need new files.

- [ ] **Step 3: Create one file per missing NPC**

For each NPC not yet in `npcs/core/`: extract their section from People_of_Northreach, strip Homebrewery syntax (especially image refs and `\column`), write to `npcs/core/<kebab-case-name>.md`.

  File format to follow (match existing files):
  ```markdown
  # [NPC Name]

  **Role:** [their role]
  **Location:** [where found]

  ## Description
  [physical description / personality]

  ## Background
  [backstory]

  ## Reputation
  [what people say]
  ```

- [ ] **Step 4: Update MANIFEST**

Read `npcs/core/MANIFEST.md` and add entries for all new NPC files.

- [ ] **Step 5: Commit**

```bash
git add npcs/core/
git commit -m "feat: decompose People of Northreach into individual NPC files"
```

---

## Tier 5: Factions

### Task 14: Factions Index and Warden Charter

**Files:**
- Create: `factions/index.md`
- Create: `factions/northwatch-wardens-charter.md`

- [ ] **Step 1: Convert Organizations Overview**

Read `_print/World Building/Organizations/Organizations_Overview.md`. Strip and write to `factions/index.md`. Add a note at the top:
```markdown
# Organizations of Aevoria

> *Individual faction files are in the file tree to the left.*

---
```

- [ ] **Step 2: Convert Warden Charter**

Read `_print/World Building/Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md`. Strip and write to `factions/northwatch-wardens-charter.md`.

- [ ] **Step 3: Update factions MANIFEST**

Read `factions/MANIFEST.md`. Add entries:
```markdown
- [index.md](index.md) — Organizations overview
- [northwatch-wardens-charter.md](northwatch-wardens-charter.md) — Warden Charter and founding documents
```

- [ ] **Step 4: Commit**

```bash
git add factions/index.md factions/northwatch-wardens-charter.md factions/MANIFEST.md
git commit -m "feat: add organizations index and Warden Charter to factions"
```

---

## Self-Review Checklist

- [x] All 14 DMEyesOnly files accounted for (13 migrated + 1 skipped — Region_Content_Audit)
- [x] All 3 Practical files included
- [x] Player lore gap closed (player-lore/ was empty README only)
- [x] Locations index and 2 new stubs added
- [x] People_of_Northreach decomposed into individual NPC files
- [x] Organizations Overview + Warden Charter added to factions
- [x] No Homebrewery syntax in any web output file
- [x] Large files (Languages_and_Culture 2428 lines, Regional_Origins 1457 lines) kept as single searchable files — splitting would hurt table usability
- [x] Skip list covers all irrelevant files (MapMaking, READMEs, OLD files, Scratchpad)
- [x] MANIFEST files updated for each affected directory

## Execution Notes

- Tasks 1–6 (DM secrets + practical) should be executed first — they fill the biggest gap for live sessions
- Tasks within each tier can be parallelized if using subagent-driven execution
- Each task ends with a commit — this makes it easy to pause and resume
- Total: ~32 new files created across 6 directories
