# Homebrewery V3 Formatting Guide
## Northwatch Wardens Edition

**Single Source of Authority for all Homebrewery V3 formatting in this repository.**

Based on:
- Official Homebrewery V3 (https://homebrewery.naturalcrit.com/)
- V3.20.1+ features (latest as of Feb 2026)
- Northwatch Wardens campaign standards
- Best practices from official D&D 5e publications

**Recent V3 Features:**
- ✨ **V3.20.1:** D100 dice icons (`:d100:`), license snippets
- ✨ **V3.19.0:** `$[HB_pageNumber]` variable (math operations, reassignable), custom snippets, `\pagebreak`/`\columnbreak` alternatives, CSS `calc()` support

**Quick Links:**
- [Core Syntax](#core-syntax) — Essential formatting elements
- [Campaign Elements](#campaign-elements) — D&D-specific blocks (TOC, spells, class tables)
- [Page Structure](#page-structure) — Organizing content
- [Fonts & Typography](#fonts--typography) — Custom fonts and styling
- [Common Patterns](#common-patterns) — Ready-to-use templates
- [File Standards](#file-standards) — Repository guidelines

---

## Core Syntax

### Text Styling (Inline)

**Bold:** `**text**`  
**Italic:** `*text*`  
**Bold Italic:** `***text***`  
**Strikethrough:** `~~text~~`  

### Colored/Styled Text (V3 Curly Bracket Injection)

Inline styling using `{property:value,property:value}` syntax (same line):

```markdown
This text is {color:red} and this is {color:blue,font-weight:bold}.
```

**Common properties:**
- `color:red` — Text color
- `font-weight:bold` — Bold weight
- `font-style:italic` — Italic
- `text-align:center` — Alignment
- `background:rgba(255,0,0,0.3)` — Background color

### Headers & Hierarchy

```markdown
# H1 — Chapter/Adventure Title (Largest)
## H2 — Major Section (Encounters, NPCs)
### H3 — Subsection (Combat Tactics, Notes)
#### H4 — Minor Heading (Optional details)
##### H5 — Section Label (Use sparingly)
```

**Best Practice:** Limit to H1-H3 for clarity. Use H4-H5 only within decorative blocks.

### Lists

**Unordered:**
```markdown
- Item 1
- Item 2
  - Nested item
```

**Ordered:**
```markdown
1. First item
2. Second item
   1. Nested numbered
```

**Definition Lists (Hanging Indent):**
```markdown
**Term** :: Definition that hangs beneath the term nicely.

**Another Term** :: This is useful for ability descriptions and glossary entries.
```

### Blockquotes (For Flavor Text)

```markdown
> "The wolves were *talking*," Featherock whispers, eyes wide.
> "Arguing about whether to eat me or not..."
```

### Links

```markdown
[Link Text](https://example.com)
[Internal Reference](#heading-anchor)
```

**Note:** Avoid markdown links in player-facing content (won't work in printed PDF).

---

## Page Structure

### Page Breaks

```markdown
Content on page 1...

\page

Content on page 2...
```

**Alternative syntax:**
```markdown
\pagebreak
```

**Best Practice:** 
- Break at natural scene/encounter boundaries
- Target 450–600 words per page
- Avoid orphaning headers (don't leave `## Header` alone at bottom of page)

### Column Breaks (Within Page)

```markdown
Left column content here...

\column

Right column content here...
```

**Alternative syntax:**
```markdown
\columnbreak
```

**Best Practice:** Use for stat tables, side-by-side content, or tactical diagrams.

### Vertical Spacing

Use colons on their own line for manual spacing **(preferred over pixel-perfect margins)**:

```markdown
Content here

:

Small gap (1 blank line)

::

Larger gap (2-3 blank lines)

:::

Even larger gap (4-5 blank lines)
```

**Tip:** Homebrewery migration docs recommend colons over manual margins/padding when pushing content down the page.

### Page Numbers & Footers

```markdown
{{pageNumber,auto}}
{{footnote PART 1 | ADVENTURE TITLE}}
```

**Page Number Variable (V3.19.0+):**
```markdown
$[HB_pageNumber]
```

Works with math operations and can be reassigned:
```markdown
$[HB_pageNumber] = 5
Page $[HB_pageNumber + 1]
```

**Best Practice:** 
- Add at the bottom of each page before `\page` break
- Use `auto` for automatic incrementing
- Format: `{{footnote SECTION | SUBSECTION}}`

---

## Campaign Elements

### Table of Contents

**Auto-generated TOC with page links:**
```markdown
{{toc
- ### [{{ Headers}}{{ 2}}](#p2)
- ### [{{ Unordered Lists}}{{ 3}}](#p3)
- ### [{{ Inline Images}}{{ 5}}](#p5)
- ### [{{ Tables}}{{ 28}}](#p28)
}}
```

**Format:**
- `[{{ Section Title}}{{ Page Number}}](#p#)`
- Use `#p#` anchor format (e.g., `#p2` for page 2)
- Remove hashtags from snippet for cleaner appearance

### Decorative Blocks (V3 Syntax)

All decorative blocks use `{{blocktype, properties...` syntax.

#### Read-Aloud Text ({{descriptive}})

**Purpose:** Text meant to be read aloud to players at the table.

```markdown
{{descriptive
##### Location Name or Scene Title
The village of Welton sits peacefully in the valley, its white-walled
buildings gleaming in the afternoon sun. The smell of fresh bread wafts
from the bakery, and you can hear the distant bleating of sheep on the
hillsides.
}}
```

**Best Practice:**
- Add descriptive sub-header (5 underscores `#####`)
- Use 2-4 sentences max
- Lead with sensory details
- End with a hook or discovery opportunity

#### DM Notes ({{note}})

**Purpose:** Rules clarifications, tactical guidance, or DM-only information.

```markdown
{{note
##### Combat Tactics
The wolves are here to steal sheep, not kill shepherds. Half will keep
the shepherds distracted while the rest steal sheep and retreat west.

**Balance for 3 players:** Reduce wolf count to 6.
}}
```

**Best Practice:**
- Use for DM-only information
- Include tactical notes, balance adjustments
- Add sub-header describing the note content
- Keep concise and actionable

#### Important Information ({{note}}) — Alternative Use

For player-facing content that needs emphasis:

```markdown
{{note
##### Remember the Code
All Wardens must:
1. Protect the innocent
2. Honor their contracts
3. Share vital information
4. Respect the frontier
}}
```

#### Wide Blocks ({{wide}})

**Purpose:** Content that should span full page width (tables, important text).

```markdown
{{wide
##### Guild Roster
| Name | Role | Level |
|------|------|-------|
| Brenna Thorne | Marshal | — |
| Mara Fenwick | Steward | — |
}}
```

### Drop Caps

**First letter styling (automatic in PHB theme):**

First paragraph on each page automatically gets a drop cap (large first letter).

**Customize drop cap size:**
```css
.page p:first-of-type::first-letter {
  font-size: 4em; /* Adjust size */
  line-height: 1;
}
```

**Remove drop caps entirely:**
```css
.page p::first-letter {
  all: unset;
}
```

**Remove small-caps from first line:**
```css
.page p:first-of-type::first-line {
  all: unset;
}
```

### Dice Icons

**D100 dice icons (V3.20.1+):**
```markdown
Roll a :d100: for percentile check.
```

**Other dice (via emoji syntax):**
```markdown
:d20: :d12: :d10: :d8: :d6: :d4:
```

**Tip:** Dice icons render as small inline images styled to match the PHB aesthetic.

### QR Codes

**Generate QR code for sharing your brew:**
```markdown
![Scan to view online](qr-code-url) {width:150px}
```

**Positioned QR code (bottom corner):**
```markdown
![Share this brew](qr-generator-url?data=your-brew-link) {position:absolute,bottom:20px,right:20px,width:100px,opacity:0.8}
```

**Tip:** Use a QR code generator to create a code linking to your published brew.

#### Quotes/Attribution ({{quote}})

**Purpose:** In-world quotations or lore passages.

```markdown
{{quote
The elf queen stood atop her castle walls, surveying the kingdom below
with a mix of pride and sadness. She knew the coming war would be brutal,
but she was determined to protect her people at all costs.

{{attribution Drogathar Bonecrusher, *The Bard's Tale*}}
}}
```

---

## Spells & Spell Lists

### Individual Spell Block

```markdown
{{spell
#### Fireball
*3rd-level evocation*
___
- **Casting Time:** 1 action
- **Range:** 150 feet
- **Components:** V, S, M (a tiny ball of bat guano and sulfur)
- **Duration:** Instantaneous
___
A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame...
}}
```

### Spell List (Table Format)

```markdown
{{spellList,wide
##### Wizard Spells
| Cantrips | 1st Level | 2nd Level |
|:---------|:----------|:----------|\
| Fire Bolt | Magic Missile | Scorching Ray |
| Mage Hand | Shield | Mirror Image |
| Prestidigitation | Detect Magic | Misty Step |
}}
```

### Spell List (Vertical Format)

```markdown
##### Cleric Spells

**Cantrips (0 Level)**
Guidance, Light, Mending, Sacred Flame, Spare the Dying

**1st Level**
Bless, Cure Wounds, Detect Evil and Good, Healing Word, Shield of Faith

**2nd Level**
Aid, Lesser Restoration, Prayer of Healing, Spiritual Weapon
```

---

## Class & Progression Tables

### Class Table

**Level progression table:**
```markdown
{{classTable,wide
##### The Fighter
| Level | Proficiency Bonus | Features |
|:-----:|:-----------------:|:---------|
| 1st   | +2                | Fighting Style, Second Wind |
| 2nd   | +2                | Action Surge (one use) |
| 3rd   | +2                | Martial Archetype |
| 4th   | +2                | Ability Score Improvement |
| 5th   | +3                | Extra Attack |
}}
```

### Split Tables

**Side-by-side tables:**
```markdown
{{split
##### Typical Difficulty Classes

| DC | Difficulty |
|:--:|:-----------|
| 5  | Very easy  |
| 10 | Easy       |
| 15 | Medium     |

| DC | Difficulty        |
|:--:|:------------------|
| 20 | Hard              |
| 25 | Very hard         |
| 30 | Nearly impossible |
}}
```

**Use cases:**
- Challenge rating ranges
- Loot tables (A/B options)
- Dual character options
- Before/after comparisons

---

## Monster Stat Blocks

### Standard Format (`{{monster,frame}}`)

```markdown
{{monster,frame
## Awakened Wolf
*Medium monstrosity, lawful neutral*
___
**Armor Class** :: 13 (natural armor)
**Hit Points** :: 22 (5d8)
**Speed** :: 40 ft.
___
|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|12 (+1)|15 (+2)|12 (+1)|11 (+0)|12 (+1)| 9 (-1)|
___
**Saving Throws** :: Wis +3
**Skills** :: Perception +4, Stealth +4
**Senses** :: darkvision 60 ft., passive Perception 14
**Languages** :: understands Common but cannot speak
**Challenge** :: 2 (450 XP) {{bonus **Proficiency Bonus** +2}}
___
***Pack Tactics.*** The wolf has advantage on an attack roll against a creature if at least one other wolf is within 5 feet of the target and the other wolf isn't incapacitated.

***Unnatural Awareness.*** The awakened wolf's eyes gleam with unsettling intelligence. When it looks at you, you feel weighed, judged, found wanting.
___
### Actions
***Bite.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 11 (2d6 + 4) piercing damage. If the target is a creature, it must succeed on a DC 12 Strength saving throw or be knocked prone.

***Dash (Recharge 5–6).*** The wolf moves up to its speed without provoking opportunity attacks. It can dash through difficult terrain without slowing.
}}
```

**Key Elements:**

| Element | Format | Purpose |
|---------|--------|---------|
| Name | `## Creature Name` | Creature identifier |
| Type | `*Type, alignment*` | D&D mechanical info |
| Separator | `___` | Visual divider |
| Ability Line | `**Ability** :: Value` | Definition list format |
| Ability Table | Centered with `\|:\---|:\---|` | 6-column ability scores |
| Traits | `***Trait Name.*** Description.` | Special abilities/features |
| Separator between sections | `:` | Spacing between traits/actions |
| Actions | `### Actions` then `***Action.***` | Attacks and special actions |
| CR Line | `**Challenge** :: # (XP) {{bonus +#}}` | Challenge rating and proficiency |

**Best Practice:**
- Always use `{{monster,frame}}` for styled border
- Include all ability scores with modifiers
- Use `{{bonus **Proficiency Bonus** +#}}` for CR display
- Add campaign-specific traits (narrative elements)
- Use `:` to separate traits and action sections

---

## Tables

### Basic Table

```markdown
| Header 1 | Header 2 | Header 3 |
|:---------|:--------:|--------:|
| Left aligned | Centered | Right aligned |
| Row 2 | More data | Numbers |
```

### Column Spanning

Use `||` at end of cell to span to next column:

```markdown
| Spanned Header |||
| Normal | Headers |Header |
|:-------|:-------:|------:|
| Data 1 | Data 2 | Data 3 |
```

### Row Spanning

Use `^` before `|` to span down to row below:

```markdown
| Col 1 | Col 2 ^| Col 3 |
| Col 1 ^| Col 2 | Col 3 |
```

**Best Practice:** 
- Keep tables simple (max 4-5 columns)
- Use for encounters, loot, NPC details
- Align text (left/center/right) consistently

---

## Images

All images must be hosted externally (Imgur recommended). Use **direct links** (ending in `.jpg`, `.png`, etc.), not gallery links.

### Image Sizing & Basic Styling

#### Fixed Width (Pixels)
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px}
```

#### Responsive Width (Percentage)
```markdown
![alt text](https://imgur.com/image.jpg) {width:100%}
```

#### Fixed Height
```markdown
![alt text](https://imgur.com/image.jpg) {height:200px}
```

#### Width & Height (Scale Exactly)
```markdown
![alt text](https://imgur.com/image.jpg) {width:300px,height:200px}
```

---

### Borders & Styling

#### Simple Border
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,border:"2px solid black"}
```

#### Colored Border
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,border:"3px solid #8B4513"}
```

#### Rounded Corners
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,border-radius:10px}
```

#### Bordered + Rounded
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,border:"2px solid black",border-radius:15px}
```

#### Drop Shadow
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,box-shadow:"0 4px 8px rgba(0,0,0,0.3)"}
```

#### Shadow + Border + Rounded
```markdown
![alt text](https://imgur.com/image.jpg) 
{width:325px,border:"1px solid gray",border-radius:8px,box-shadow:"0 4px 8px rgba(0,0,0,0.2)"}
```

---

### Opacity & Transparency Effects

#### Watermark (Faded Background)
```markdown
![decorative](https://imgur.com/image.jpg)
{position:absolute,top:100px,right:50px,width:400px,opacity:0.15}
```

#### Semi-Transparent Image
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,opacity:0.7}
```

#### Ghost/Ethereal Effect
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,opacity:0.4,filter:"grayscale(100%)"}
```

---

### Positioning Images

#### Inline (Flow with Text)
```markdown
![inline art](https://imgur.com/image.jpg) {width:200px,float:right,margin:"0 0 10px 20px"}

Text flows around this image on the right side.
```

#### Absolute Positioning (Fixed Location)
```markdown
![decorative](https://imgur.com/image.jpg)
{position:absolute,top:50px,right:30px,width:200px}
```

#### Top-Right Corner
```markdown
![corner](https://imgur.com/image.jpg)
{position:absolute,top:20px,right:20px,width:150px}
```

#### Bottom-Left Corner
```markdown
![corner](https://imgur.com/image.jpg)
{position:absolute,bottom:20px,left:20px,width:200px}
```

#### Center Page
```markdown
![centered](https://imgur.com/image.jpg)
{position:absolute,top:50%,left:50%,transform:"translate(-50%,-50%)",width:300px}
```

---

### Background Images

#### Full Page Background
```markdown
![background](https://imgur.com/image.jpg)
{position:fixed,top:0,left:0,width:100%,height:100%,opacity:0.1,z-index:-1}

Content appears over background image...
```

#### Section Background
```markdown
{{wide
![bg](https://imgur.com/image.jpg)
{position:absolute,top:0,left:0,width:100%,height:100%,opacity:0.08,z-index:-1}

Your content here with background image behind.
}}
```

---

### Multiple Images & Galleries

#### Side-by-Side Images (Using Columns)
```markdown
![image 1](https://imgur.com/image1.jpg) {width:45%,border:"1px solid black"}

\column

![image 2](https://imgur.com/image2.jpg) {width:45%,border:"1px solid black"}
```

#### Image Grid (Inline with Text Flow)
```markdown
![img1](https://imgur.com/img1.jpg) {width:150px,float:left,margin:10px}
![img2](https://imgur.com/img2.jpg) {width:150px,float:left,margin:10px}
![img3](https://imgur.com/img3.jpg) {width:150px,float:left,margin:10px}

Text content...
```

#### Image with Caption
```markdown
![A fierce dragon](https://imgur.com/dragon.jpg) {width:250px}
*A young red dragon claims its treasure hoard*
```

---

### Filters & Effects

#### Grayscale (Black & White)
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,filter:"grayscale(100%)"}
```

#### Sepia Tone
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,filter:"sepia(80%)"}
```

#### Brightness Adjustment
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,filter:"brightness(1.2)"}
```

#### Contrast Enhancement
```markdown
![alt text](https://imgur.com/image.jpg) {width:325px,filter:"contrast(1.3)"}
```

#### Combined Filters (Vintage Look)
```markdown
![alt text](https://imgur.com/image.jpg) 
{width:325px,filter:"sepia(60%) contrast(1.1) brightness(0.95)"}
```

---

### Campaign-Specific Image Patterns

#### Creature Portrait (With Frame)
```markdown
![Wolf Illustration](https://imgur.com/wolf.jpg)
{width:250px,border:"3px double #8B4513",border-radius:8px,box-shadow:"0 4px 12px rgba(0,0,0,0.4)"}

*An Awakened Wolf — Intelligence blazes in its eyes*
```

#### Location Scenic (Watermark Background)
```markdown
![Waystone Inn](https://imgur.com/inn.jpg)
{position:absolute,bottom:30px,right:30px,width:350px,opacity:0.3}

## The Waystone Inn

Content about the inn appears over the background image...
```

#### NPC Portrait (Circular, With Border)
```markdown
![Brenna Thorne](https://imgur.com/brenna.jpg)
{width:150px,border-radius:50%,border:"2px solid black",float:right,margin:"0 0 10px 20px"}

### Brenna Thorne, Marshal

Content about Brenna...
```

#### Map or Diagram (With Grid Reference)
```markdown
![Region Map](https://imgur.com/map.jpg)
{width:100%,border:"1px solid gray",margin-bottom:15px}

**Key Locations:**
- North: Palebank Village
- South: Welton
- Center: Waystone Inn
```

---

### Text Wrapping with Images

**&nbsp; wrapping (prevents text overlap):**
```markdown
![Portrait](url) {float:right,width:250px}

&nbsp;

Text content starts here without overlapping the image. The `&nbsp;` creates proper spacing.
```

**\\\\ wrapping (forces text below image):**
```markdown
![Landscape](url) {float:left,width:300px}

Some text wraps around the image...

\\

This text appears below the image, not beside it.
```

**Square text wrap (default):**
```markdown
![Creature](url) {shape-outside:margin-box,float:right,width:250px}
```
Text wraps in a square/rectangular pattern around the image margin.

**Tight text wrap (follows image contours):**
```markdown
![Character](url) {shape-outside:url(image-url),float:right,width:250px}
```
Text follows the actual shape of the image (works with transparent backgrounds).

**Best Practice:** Use `&nbsp;` after floated images to prevent text from starting too close to the image edge.

---

### Image Blending & Mix Modes

**Blend mode for artistic effects:**
```markdown
![Background art](image-url) {mix-blend-mode:multiply,opacity:0.3,width:100%}
```

**Available blend modes:**
- `multiply` — Darkens image over background (good for shadows)
- `overlay` — Combines lighter/darker areas
- `screen` — Lightens image (good for glows)
- `color-burn` — Increases contrast and saturation
- `darken` — Shows darker of two colors
- `lighten` — Shows lighter of two colors

**Example — Watercolor atmosphere:**
```markdown
![Watercolor texture](texture-url) {mix-blend-mode:multiply,opacity:0.4,filter:"blur(2px)",position:absolute,top:0,left:0,width:100%,z-index:-1}
```

**Example — Vintage/aged parchment effect:**
```markdown
![Parchment](url) {mix-blend-mode:color-burn,opacity:0.2}
```

---

### Image Best Practices for This Campaign

**Hosting:**
- ✅ Host on Imgur
- ✅ Use direct link (right-click → "Copy image link")
- ✅ Test that it loads before committing

**Sizing:**
- ✅ Use `width:` for responsive scaling
- ✅ Typical widths: 150px (small), 250px (medium), 325px (large), 100% (full)
- ✅ Don't hardcode both width+height (distorts image)

**Styling:**
- ✅ Add borders for portraits/maps
- ✅ Use opacity for watermarks (0.1–0.3)
- ✅ Use box-shadow for depth
- ✅ Use border-radius for circle effects (`border-radius:50%`)

**Performance:**
- ✅ Compress images before uploading (keep < 500KB)
- ✅ Use appropriate resolution (72 DPI for screen)
- ✅ Test rendering in VS Code preview

**Accessibility:**
- ✅ Always provide descriptive alt text: `![Description](url)`
- ✅ Don't rely on images for critical information
- ✅ Ensure sufficient contrast for readability

---

## Fonts & Typography

### Default Fonts (PHB Theme)

The PHB theme uses these fonts:
- **Headers:** Bookinsanity (serif, medieval style)
- **Body text:** Bookinsanity
- **Drop caps:** Solberry (decorative first letter)
- **Special:** Mr Eaves (license text, small headers)

### Changing Fonts

**Custom font for specific section:**
```markdown
{{font-family:"Arial",sans-serif
This text uses Arial instead of Bookinsanity.
}}
```

**Change entire page font:**
```css
.page {
  font-family: "Georgia", serif;
}
```

**Change only headers:**
```css
.page h1, .page h2, .page h3 {
  font-family: "Cinzel", serif;
}
```

### Custom Fonts (Web Fonts)

**Import from Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

.page h1, .page h2, .page h3 {
  font-family: 'Cinzel', serif;
}
```

**Popular D&D-style fonts:**
- **Cinzel** — Elegant all-caps headers
- **Crimson Text** — Readable serif body text
- **IM Fell English** — Medieval manuscript style
- **Fondamento** — Decorative gothic headers

**Use custom font file:**
```css
@font-face {
  font-family: 'MyCustomFont';
  src: url('path-to-font.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

.page {
  font-family: 'MyCustomFont', serif;
}
```

**Best Practice:**
- ✅ Use web-safe fallback fonts: `font-family: 'CustomFont', serif;`
- ✅ Test rendering in browser and PDF export
- ✅ Keep custom fonts under 200KB for performance
- ❌ Don't use more than 2-3 different fonts per brew

---

## Advanced CSS Techniques

### CSS calc() in Curly Blocks (V3.19.0+)

**Math operations within curly bracket properties:**
```markdown
![Image](url) {width:calc(100% - 50px),margin-left:calc(50% - 125px)}
```

**Use cases:**
- Responsive layouts: `width:calc(50% - 10px)`
- Dynamic positioning: `left:calc(100% - 200px)`
- Spacing calculations: `margin-top:calc(1em + 5px)`

**Supported in curly brackets:** Addition `+`, subtraction `-`, multiplication `*`, division `/`

### LICENSE Snippets (V3.20.0+)

**Pre-built license templates with logos:**

Available snippets (via   SNIPPETS menu):
- DriveThruRPG Community Content
- AELF (Adventurer's League)
- GNU Free Documentation License
- WotC Fan Content Policy
- Mongoose Publishing
- And more...

**Usage:**
1. Open   SNIPPETS tab in Homebrewery editor
2. Select   LICENSES category
3. Choose appropriate license for your content
4. Paste into your brew

**Best Practice:** Always credit sources and respect content policies when creating D&D homebrews.

---

## Common Patterns

### Adventure Scene Opening

```markdown
## Scene Title

{{descriptive
##### Location or Atmosphere
Two to four sentences of sensory-rich description. Lead with what
characters see, hear, smell. End with a visual or discovery hook.
}}

**Situation Overview:**
Brief mechanical/tactical summary of what's happening. This is for DM eyes.

{{note
##### Optional DM Guidance
Any rules clarifications, scaling tips, or alternative options.
}}
```

### Combat Encounter

```markdown
## Combat: Encounter Name

{{descriptive
##### Read-Aloud Text
What the party sees as they enter the encounter.
}}

**Combatants:**
- 3x Wolf (CR 1/4 each)
- 1x Awakened Wolf Leader (CR 1)

[Monster stat block(s) here]

{{note
##### Tactics & Scaling
- Wolves use pack tactics for flanking advantage
- Leader prioritizes weakest party member
- Wolves flee if leader drops below 50% HP

**For 2 players:** Reduce wolf count to 4
**For 5 players:** Add 2 more wolves
}}
```

### NPC Introduction

```markdown
### Name, Title

**Race/Type:** Dwarf  
**Age:** 47  
**Appearance:** Stout, kind eyes, weathered hands

> "Welcome to the Shepherd's Crook! What brings adventurers to
> our humble village? We don't get many of your kind since the
> wolves started their raids."

{{note
##### Roleplaying Tips
- Speaks warmly but directly
- Will offer free drinks if party helps with wolves
- Knows most village gossip
- Protective of injured patrons
}}
```

### Loot & Treasure

```markdown
{{wide
##### Treasure
| Item | Rarity | Value |
|------|--------|-------|
| Warden's Badge | Common | 10 gp |
| Healing Potion | Uncommon | 50 gp |
| +1 Shortsword | Uncommon | 325 gp |
}}
```

### Encounter Summary

```markdown
## Encounter Summary: [Name]

**Objectives:** What the party needs to accomplish (defeat, escape, negotiate, etc.)

**Key NPCs/Combatants:**
- Name, Role (stat block reference)
- Name, Role (stat block reference)

**Terrain:** Description of location features, cover, hazards

**Victory Conditions:**
- Combat victory: Defeat 75% of enemies or leader
- Social victory: Convince X to stand down (DC 15 Persuasion)
- Alternative: Escape through west passage (Dex DC 12)

**Rewards:**
- XP: Milestone achievement or [X] XP each
- Treasure: [Items and gold]
- Plot: [Story advancement or clue]
```

---

## File Standards

### File Structure (Adventures)

```markdown
[FRONT MATTER]
# ADVENTURE TITLE

**Level Range:** 1–3  
**Duration:** 4–6 hours  
**Setting:** [Location]

[CAMPAIGN CONNECTION]

\page

[CONTENT - SCENES]

{{pageNumber,auto}}
{{footnote PART 1 | ADVENTURE TITLE}}
```

### File Structure (World Building)

```markdown
# Region/Location Name

{{descriptive
##### Atmospheric Description
Opening read-aloud or evocative description of this place.
}}

## Major Section

Content here...

## Another Major Section

Content here...

{{note
##### Important Lore
Any crucial background information.
}}
```

### File Structure (Reference/Tables)

```markdown
# Reference Title

## Section 1

[Content]

## Section 2

[Content]

{{wide
[Large table or content]
}}
```

---

## VS Code Preview Setup

### Enable Homebrewery Preview

Install: `officerhalf.homebrewery-vscode`

### Keyboard Shortcut

- **Windows/Linux:** `Ctrl+Shift+V`
- **Mac:** `Cmd+Shift+V`

### Settings (.vscode/settings.json)

```json
{
  "homebrewery.enabled": true,
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Live Preview

As you edit, the preview updates automatically. Test page breaks and formatting in real-time.

---

## Validation Checklist

Before committing adventure/document files:

- [ ] Page breaks (`\page`) are at natural boundaries
- [ ] No orphaned headers (H2/H3 alone at bottom of page)
- [ ] All read-aloud text in `{{descriptive}}` blocks
- [ ] All DM notes in `{{note}}` blocks
- [ ] Monster stat blocks use `{{monster,frame}}`
- [ ] Ability scores include modifiers: `11 (+0)`
- [ ] Challenge displays `{{bonus **Proficiency Bonus** +#}}`
- [ ] All images hosted externally (Imgur)
- [ ] Page numbers and footers on every page
- [ ] Markdown preview renders correctly (test locally)
- [ ] No file links (use chapter/section references for player content)

---

## Common Issues & Fixes

### "Page breaks not working"
- Use `\page` (backslash), not `\pagebreak`
- Ensure blank line before and after `\page`

### "Images not showing"
- Must use direct Imgur link (ends with .jpg/.png)
- Not the image gallery link

### "Stat block text cut off"
- Add line breaks before long ability descriptions
- Use `\column` if table runs too long

### "Decorative blocks overlapping text"
- Add `{{` and `}}` on separate lines
- Ensure closing brackets are on their own line

### "Colors not applying"
- V3 uses `{color:name}` or `{color:#hex}`
- Common: `color:red, color:blue, color:purple`
- Test in preview first

### "Table cells not aligning"
- Use pipe `|` at start and end: `| content |`
- Use correct alignment: `:---` left, `:---:` center, `---:` right

---

## Quick Reference: Syntax at a Glance

| Element | Syntax | Purpose |
|---------|--------|---------|
| Page break | `\page` or `\pagebreak` | New page |
| Column break | `\column` or `\columnbreak` | Multi-column layout |
| Vertical space | `:` or `::` or `:::` | Manual spacing |
| Table of contents | `{{toc ... }}` | Auto-generated TOC |
| Read-aloud box | `{{descriptive ... }}` | Player-facing text |
| DM note box | `{{note ... }}` | DM-only information |
| Wide block | `{{wide ... }}` | Full-width content |
| Quote | `{{quote ... {{attribution}}}}` | In-world quotations |
| Monster | `{{monster,frame ... }}` | Stat blocks |
| Spell | `{{spell ... }}` | Formatted spell |
| Spell list | `{{spellList ... }}` | Spell table |
| Class table | `{{classTable ... }}` | Level progression |
| Split tables | `{{split ... }}` | Side-by-side tables |
| Header | `# ## ### #### #####` | Title hierarchy |
| Bold | `**text**` | Emphasis |
| Italic | `*text*` | Emphasis |
| Blockquote | `> text` | Flavor text |
| List | `- item` or `1. item` | Lists |
| Definition | `**term** :: definition` | Hanging indent |
| Table | \|Header\|Header\| | Data grid |
| Link | `[text](url)` | Hyperlink |
| Dice icons | `:d20:` `:d100:` `:d6:` | Inline dice |
| Drop cap (disable) | `.page p::first-letter {all:unset}` | Remove first letter |
| Image inline | `![alt](url) {width:250px}` | Embedded image |
| Image positioned | `![alt](url) {position:absolute,top:50px}` | Fixed position |
| Image bordered | `![alt](url) {border:"2px solid black"}` | Styled border |
| Image rounded | `![alt](url) {border-radius:50%}` | Circle/rounded corners |
| Image watermark | `![alt](url) {opacity:0.1}` | Faded background |
| Image filter | `![alt](url) {filter:"grayscale(100%)"}` | Effects |
| Image blend | `![alt](url) {mix-blend-mode:multiply}` | Blending effects |
| Text wrap (nbsp) | `&nbsp;` after image | Prevent text overlap |
| Text wrap (break) | `\\` after text | Force below image |
| Color | `{color:red}` | Inline color |
| Font | `{{font-family:"Arial"...}}` | Custom font section |
| Page number | `{{pageNumber,auto}}` | Auto-incrementing |
| Page variable | `$[HB_pageNumber]` | Math-capable variable |
| Footer | `{{footnote TEXT}}` | Page footer |
| QR code | `![QR](qr-url) {width:100px}` | Shareable link |

---

## Resources

### Official
- **Homebrewery V3:** https://homebrewery.naturalcrit.com/
- **Official Changelog:** https://homebrewery.naturalcrit.com/changelog (V3.20.1+)
- **Migration Guide (Legacy → V3):** https://homebrewery.naturalcrit.com/migrate
- **Comprehensive Example Page:** https://homebrewery.naturalcrit.com/share/v7J4ZI9zA4Wi
- **GitHub Repository:** https://github.com/naturalcrit/homebrewery
- **GitHub Issues:** https://github.com/naturalcrit/homebrewery/issues

### Community
- **Reddit:** r/homebrewery (https://www.reddit.com/r/homebrewery)
- **Gitter Chat:** https://gitter.im/naturalcrit/Lobby
- **Discord:** Discord Of Many Things
- **Reddit FAQ & Announcements:** https://www.reddit.com/r/homebrewery/comments/adh6lh/faqs_psas_announcements/

### Learning Resources
- **V3 Syntax Tutorial:** https://www.reddit.com/r/homebrewery/comments/12aem7f/useful_tutorialsmanuals_esp_for_v3_syntax/
- **Standalone PHB Stylesheet:** https://github.com/naturalcrit/homebrewery/blob/master/phb.standalone.css

### Campaign Specific
- **Northwatch Wardens:** `.github/agents/DMHelper.agent.md`
- **Formatting Guide:** This document (single source of truth)

---

## File History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-10 | Initial unified guide for V3 |
| 1.1 | 2026-02-10 | Added V3.20.1+ features, spells, class tables, fonts, text wrapping, blend modes |

---

**Last Updated:** February 10, 2026  
**Status:** Active & Authoritative  
**Single Source of Truth:** All Homebrewery V3 formatting for this campaign
