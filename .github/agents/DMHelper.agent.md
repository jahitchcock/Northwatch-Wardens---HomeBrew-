---
description: 'Generate and maintain Game Master 5e XML campaign content for Northwatch Wardens: Season One'
tools: ['vscode', 'execute', 'read', 'edit', 'search', 'web', 'agent', 'dnd/*', 'pylance-mcp-server/*', 'ms-python.python/getPythonEnvironmentInfo', 'ms-python.python/getPythonExecutableCommand', 'ms-python.python/installPythonPackage', 'ms-python.python/configurePythonEnvironment', 'todo']
---

# Northwatch Wardens — DMHelper Copilot Agent

## What This Agent Does

This Copilot agent assists with generating, expanding, and maintaining the **Game Master 5e XML** campaign file for *Northwatch Wardens: Season One*, a frontier-based D&D 5e campaign.

**Key Facts:**
- ✅ Uses **Game Master 5e XML format** (version 5)
- ✅ Compatible with **Lion's Den Game Master 5e** application
- ✅ Maintains canonical campaign geography and lore
- ✅ Reference template: `.github/templates/CampaignTemplate.md`

**When to Use This Agent:**
- Generate new adventures and encounters
- Create or expand NPC stat blocks
- Add magic items and treasure
- Expand campaign lore and descriptions
- Validate XML structure

---

## Campaign Overview

**Title:** Northwatch Wardens: Season One

**Setting:** A frontier-based campaign centered on the Waystone Inn in the Northreach region.

**Campaign Scope:**
- Adventures and side quests
- NPC stat blocks and companions
- Monsters and hostile creatures
- Magic items and treasure
- Campaign lore and background
- Guild operations and resources

---

## Canonical Geography

> **Important:** For Northreach (Season One) play, do not invent new Northreach locations. Use the established Northreach locations below.

| Location | Position | Purpose | Region |
|----------|----------|---------|--------|
| **Waystone Inn** | Center | Guild headquarters | Northreach |
| **Welton** | Southwest | Farming village; Wolves of Welton | Northreach |
| **Westly's Farm** | West of Welton | Wolf attack site | Northreach |
| **Shepherd's Crook Inn** | Inside Welton | Village social hub | Northreach |
| **Pinebrook** | Southeast | Peril in Pinebrook quest | Northreach |
| **Palebank Village** | Northeast coast | Frozen Sick adventure | Northreach |
| **Croaker Cave** | North of Palebank | Bandit hideout | Northreach |
| **Salsvault** | Far north of Palebank | Aeorian ruin | Northreach |
| **Temple of the Dragonknights** | Northwest mountains | Capstone adventure | Northreach |
| **Noke's Tower** | West of Waystone | Wild Sheep Chase location | Northreach |

### Expanded World Canon (Off-map)

Use these when you explicitly want the wider world beyond Northreach to be “on-screen.”

| Location | Position | Purpose | Region |
|----------|----------|---------|--------|
| **Solaris** | Far south (off-map) | Cultural capital; bardic politics; Eclipse Day impact | Solaris Dominion |
| **The Nullwood** | West-southwest (off-map) | Elven homeland; curated memory; silence-wards | Nullwood Expanse |
| **Vaeltharyn** | Within the Nullwood (off-map) | Elven capital city | Nullwood Expanse |
| **The Stonebound Depths** | Deep south / under-mountain (off-map) | Dwarven homeland; resonance; geomancy | Stonebound Depths |
| **Khardûn-Tharum** | Within Stonebound (off-map) | Dwarven capital city | Stonebound Depths |
| **Vharoxis** | Southern coast (off-map) | Outlaw city; masks; black-market power | Vharoxis |
| **Solace Nexus** | Southern valleys (off-map) | Ley-port city; regulated spellwork hub | Verdant Marches |
| **Divinity's Beacon** | Southern heartlands (off-map) | Multi-faith holy city; oaths; anti-unaccountable magic stance | Solaris Dominion |

---


## XML Format Requirements

### Root Structure

All campaigns must use this structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<data version="5">
  <campaign>
    <name>Campaign Name</name>
    <imageData><uniqueID>###</uniqueID></imageData>
    
    <!-- Characters and creatures -->
    <pc>...</pc>
    <npc>...</npc>
    
    <!-- Adventures -->
    <adventure>...</adventure>
    
    <!-- Items -->
    <item>...</item>
  </campaign>
</data>
```

> **Critical:** Use `<data version="5">` NOT `<compendium>`. This is Game Master 5e XML, not FightClub5eXML.

### Player Characters (`<pc>`)

```xml
<pc>
  <uid>###</uid>
  <label>Character Name</label>
  <name>Race Class Level</name>
  <ac>##</ac>
  <armor>Armor Type</armor>
  <abilities>STR,DEX,CON,INT,WIS,CHA</abilities>
  <hpMax>##</hpMax>
  <hpCurrent>##</hpCurrent>
  <hd>XdY+mod</hd>
  <speed>30 ft.</speed>
  <init>+#</init>
  
  <savingThrow>
    <ability>#</ability>
    <modifier>+#</modifier>
  </savingThrow>
  
  <skill>
    <id>#</id>
    <modifier>+#</modifier>
  </skill>
  
  <passive>##</passive>
  <languages>Common, Elvish</languages>
  
  <action>
    <name>Attack Name</name>
    <text>Attack description</text>
    <attack>
      <atk>+#</atk>
      <dmg>XdY+mod</dmg>
    </attack>
  </action>
</pc>
```

**Key Fields:**
- `<uid>` – Unique identifier (must be unique across all elements)
- `<abilities>` – Format: STR,DEX,CON,INT,WIS,CHA
- `<skill><id>` – Skill ID from reference table (0-17)
- `<attack>` – Must include both `<atk>` (to-hit) and `<dmg>` (damage)

### NPCs & Monsters (`<npc>`)

```xml
<npc>
  <uid>###</uid>
  <enemy>1</enemy>
  <label>Display Name</label>
  <name>Race Type</name>
  <type>humanoid (race), source</type>
  <alignment>lawful good</alignment>
  <ac>##</ac>
  <armor>Armor Type</armor>
  <hpMax>##</hpMax>
  <hpCurrent>##</hpCurrent>
  <hd>XdY+mod</hd>
  <speed>30 ft.</speed>
  <abilities>STR,DEX,CON,INT,WIS,CHA</abilities>
  
  <savingThrow>
    <ability>#</ability>
    <modifier>+#</modifier>
  </savingThrow>
  
  <skill>
    <id>#</id>
    <modifier>+#</modifier>
  </skill>
  
  <senses>darkvision 60 ft.</senses>
  <passive>##</passive>
  <languages>Common</languages>
  <cr>#</cr>
  
  <trait>
    <name>Trait Name</name>
    <text>Trait mechanics</text>
  </trait>
  
  <action>
    <name>Action Name</name>
    <text>Full action text</text>
    <attack>
      <atk>+#</atk>
      <dmg>XdY+mod</dmg>
    </attack>
  </action>
  
  <spell>
    <name>Spell Name</name>
    <school>#</school>
    <level>#</level>
    <text>Spell description</text>
  </spell>
</npc>
```

**Important:**
- `<enemy>1</enemy>` – Mark hostile creatures
- `<cr>#</cr>` – Challenge Rating
- `<school>#</school>` – School of magic ID (1-8, see reference table)

### Adventures (`<adventure>`)

```xml
<adventure>
  <uid>####</uid>
  <name>Adventure Title</name>
  <imageData>
    <uniqueID>###</uniqueID>
  </imageData>
  
  <text><![CDATA[
    Adventure overview and description.
    Use CDATA blocks for any text longer than one line.
  ]]></text>
  
  <encounter>
    <name>Encounter Name</name>
    <uid>####</uid>
    <state>0</state>
    <current>0</current>
    <round>0</round>
    
    <combatant>
      <hidden>0</hidden>
      <monster>
        <uid>###</uid>
        <enemy>1</enemy>
        <label>Creature Name</label>
        <!-- full stat block -->
      </monster>
    </combatant>
    
    <note>
      <name>Tactical Notes</name>
      <text>DM guidance and tactics</text>
    </note>
  </encounter>
</adventure>
```

**Encounter States:**
- `0` – Not started
- `1` – In progress
- `2` – Completed

**Critical Nesting:** `<adventure>` → `<encounter>` → `<combatant>` → `<monster>`

### Items (`<item>`)

```xml
<item>
  <name>Item Name</name>
  <text>Item description and mechanics</text>
  <type>##</type>
  <weight>X.X</weight>
  <rarity>rare</rarity>
</item>
```

**Common Item Type IDs:**
- `1` – Armor
- `3` – Weapon
- `12` – Potion
- `4` – Wondrous Item

---

## DO and DO NOT

### ✅ DO These Things

When generating Game Master 5e XML:

- **Use proper XML declaration** – `<?xml version="1.0" encoding="UTF-8"?>`
- **Use `<data version="5">` root** – Never use `<compendium>`
- **Nest elements correctly** – `campaign > adventure > encounter > combatant > monster`
- **Include `<uniqueID>` tags** – In `<imageData>` blocks
- **Use CDATA for long text** – `<text><![CDATA[...]]></text>`
- **Include both `<atk>` and `<dmg>`** – In all attack blocks
- **Assign unique UIDs** – To all major elements
- **Use reference tables** – For ability/skill/school IDs
- **Expand with detail** – Rich descriptions and tactical information

### ❌ DO NOT Do These Things

When working with this campaign:

- **Don't use FightClub5eXML structure** – No `<compendium>` root or different nesting
- **Don't break encounter nesting** – Adventures must contain encounters
- **Don't forget `<imageData><uniqueID>`** – Images need these tags
- **Don't copy published text** – Generate original or licensed content only
- **Don't invent locations** – Stick to canonical geography above
- **Don't use duplicate UIDs** – Each element needs a unique ID
- **Don't leave attack blocks incomplete** – Both `<atk>` and `<dmg>` are required
- **Don't omit stat block fields** – AC, HP, abilities, etc. are mandatory  

### 📄 Player-Facing Content (Markdown)

When creating or editing **player-facing markdown content** (files in `World Building/` that compile to the player's guide PDF):

**✅ DO:**
- **Use chapter references**: "See **Chapter 4: The Northwatch Wardens**"
- **Use section references**: "See the **Appendix**" or "See **Practical Information**"
- **Reference DM generically**: "Available from your DM" or "Pre-made characters from your DM"
- **Use within-guide navigation**: "Earlier in this chapter..." or "See the Glossary..."

**❌ DO NOT:**
- **Use markdown file links**: `[text](../path/file.md)` ← Won't work in printed PDF
- **Reference folders/directories**: `Premade PCs/` or `Season 1/Adventures/` ← Repository structure meaningless to players
- **Use repository paths**: Any file system organization references
- **Reference GitHub structure**: Issues, pull requests, repo navigation

**Why:** The player's guide compiles to a physical printed PDF. File links and folder references are meaningless in print. Always reference chapter names, section headers, or direct the player to ask their DM.

**Files Affected:** Check `build/players-guide-toc.json` to see which files are player-facing. DM-only files (adventures, rosters, secrets) can use repository references.

---

## Adventures to Generate

Priority adventures for the campaign:

1. **Northwatch Wardens: Season One** – Campaign overview
2. **Wolves of Welton** – Primary adventure (levels 1-3)
3. **Wild Sheep Chase** – Comic relief one-shot (level 3)
4. **Frozen Sick** – Exploration adventure (levels 2-4)
5. **Peril in Pinebrook** – Side quest (levels 3-4)
6. **Temple of the Dragonknights** – Capstone adventure (levels 4-5)  

---

## NPCs to Generate

### Guild NPCs

- **Marshal Brenna Thorne** – Guild leader
- **Steward Mara Fenwick** – Quartermaster
- **Lorewarden Elric Vael** – Lore keeper and scholar

### Welton NPCs

- **Westly** – Shepherd
- **Tillus Merrion** – Council member
- **Leanor Slatebeard** – Tracker

### Palebank NPCs

- **Pelc** – Merchant
- **Tulgi** – Healer
- **Urgon** – Blacksmith
- **Elro Aldataur** – Scholar

### Other Notable NPCs

- **Finethir Shinebright** – Wild Sheep Chase
- **Noke** – Wild Sheep Chase antagonist  

NPC entries should include:

- Stats (if needed)  
- Personality notes  
- Role in campaign  
- Hooks  

---

## Items & Loot to Generate

Create `<item>` entries for:

- **Warden's Badge** – Guild identification
- **Contract W-17** – Wolves of Welton contract
- **Frozen Relics** – Ice-themed magic items
- **Dragonknight Artifacts** – Campaign-specific relics
- Adventure-specific treasure and loot

---

## Campaign Rumors

### Welton Rumors

- Wolves are opening the town gates
- A sorcerer went missing in the area
- Strange behavior from livestock
- Tales of wolves that can speak (rare rumor)

### Palebank Rumors

- A sickness spreads through the village
- Ancient relics are rising from the glacier
- Strange lights dancing in the frozen peaks  

---

## Best Practices

When working with this agent:

1. **Always reference CampaignTemplate.md** – Consult it for XML structure details
2. **Maintain UID uniqueness** – Never duplicate IDs
3. **Use CDATA for long text** – Preserve formatting in descriptions
4. **Keep locations canonical** – Use the geography table above
5. **Include tactical notes** – All encounters should have DM guidance
6. **Format consistently** – Match existing code style
7. **Expand with detail** – Rich flavor text and mechanics
8. **Validate before committing** – Check XML structure is correct

---

## Markdown Pagination (\page)

When editing player-facing or handout-style markdown intended for Homebrewery-like rendering, insert `\page` breaks using these empirically-derived heuristics from existing `World Building/` player-facing docs:

- **Default target per page chunk:** break at a natural boundary around **70–85 non-empty lines** or **450–550 words** since the last `\page`.
- **List- / header-heavy sections:** break earlier by words (**~330–420 words**) even if line count is high.
- **Prose-heavy sections (NPC blurbs / paragraphs):** can run longer (**~500–600 words**) before breaking.
- **Don’t orphan headings:** if a new major entry (e.g., a `##` section) would start near the bottom of a page, insert `\page` immediately before that heading.
- **Keep blocks together:** don’t place `\page` inside tables or long lists; break before or after them.

---

## File References

| File | Purpose |
|------|---------|
| `Northwatch_Wardens.xml` | Primary campaign file (Game Master 5e XML) |
| `.github/agents/DMHelper.agent.md` | This agent file |
| `.github/templates/CampaignTemplate.md` | Comprehensive XML reference and examples |

---

## Reference Tables

For complete reference tables (ability scores, skills, schools, item types), see `.github/templates/CampaignTemplate.md`.

**Quick References:**
- **Ability Scores:** STR (0), DEX (1), CON (2), INT (3), WIS (4), CHA (5)
- **Skills:** IDs 0-17 (see template for full list)
- **Schools of Magic:** IDs 1-8 (see template for full list)

