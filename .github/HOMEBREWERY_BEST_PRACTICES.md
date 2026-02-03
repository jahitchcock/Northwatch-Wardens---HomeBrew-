# Homebrewery Best Practices for Northwatch Wardens

This document outlines the Homebrewery formatting standards for markdown files in this repository, based on best practices from [The Homebrewery](https://homebrewery.naturalcrit.com/).

## Overview

The Homebrewery uses extended Markdown syntax to create authentic-looking D&D 5e content. This repository is configured to preview Homebrewery-styled markdown using the VS Code extension `officerhalf.homebrewery-vscode`.

## Core Formatting Standards

### Page Breaks

Use `\page` to create page breaks (not `\pagebreak`):

```markdown
Content on page 1...

\page

Content on page 2...
```

### Column Breaks

Use `\column` to break to the next column on the same page:

```markdown
Left column content...

\column

Right column content...
```

### Headers

Use consistent header hierarchy:

```markdown
# Chapter Title (H1)
## Major Section (H2)
### Subsection (H3)
#### Minor Heading (H4)
##### Small Heading (H5)
```

**Best Practice:** Start adventure/document titles with H1, major encounters/sections with H2, subsections with H3.

### Vertical Spacing

Use colons for vertical spacing (cleaner than `<br>` tags):

```markdown
Some content

:

More content (small gap)

::

Even more content (larger gap)
```

## Decorative Elements (V3 Syntax)

### Note Boxes

Use `{{note}}` blocks for important side notes, tips, or callouts:

```markdown
{{note
##### Important Note
This is a sidebar note that will appear in a decorative box.
You can include lists, formatting, etc.
}}
```

### Descriptive Boxes

Use `{{descriptive}}` for read-aloud text or atmospheric descriptions:

```markdown
{{descriptive
##### Arriving at the Village
The village of Welton sits peacefully in the valley, its white-walled
buildings gleaming in the afternoon sun. The smell of fresh bread wafts
from the bakery, and you can hear the distant bleating of sheep on the
hillsides.
}}
```

### Wide Blocks

For tables or content that should span full page width:

```markdown
{{wide
##### The Warden's Roster
| Name | Role | Specialization |
|------|------|----------------|
| Brenna | Marshal | Combat |
| Mara | Steward | Logistics |
}}
```

### Monster Stat Blocks

Use `{{monster}}` for creature statistics:

```markdown
{{monster,frame
## Wolf
*Medium beast, unaligned*
___
**Armor Class** :: 13 (natural armor)
**Hit Points** :: 11 (2d8 + 2)
**Speed** :: 40 ft.
___
|  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|12 (+1)|15 (+2)|12 (+1)| 3 (-4)|12 (+1)| 6 (-2)|
___
**Skills** :: Perception +3, Stealth +4
**Senses** :: passive Perception 13
**Languages** :: —
**Challenge** :: 1/4 (50 XP)
___
***Keen Hearing and Smell.*** The wolf has advantage on Wisdom (Perception) checks that rely on hearing or smell.
___
### Actions
***Bite.*** *Melee Weapon Attack:* +4 to hit, reach 5 ft., one target. *Hit:* 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.
}}
```

## Page Numbering and Footers

Add page numbers and footnotes at the bottom of pages:

```markdown
{{pageNumber 1}}
{{footnote PART 1 | ADVENTURE TITLE}}
```

For auto-incrementing page numbers:

```markdown
{{pageNumber,auto}}
{{footnote CHAPTER 1 | THE BEGINNING}}
```

## Blockquotes for Flavor Text

Use standard markdown blockquotes for short flavor text:

```markdown
> "The wolves... they were *talking*," Featherock whispers, eyes wide
> with terror. "Arguing about whether to eat me or not..."
```

## Images

### Inline Images

```markdown
![alt text](image-url.png)
{width:325px}
```

### Background/Positioned Images

```markdown
![decorative element](image-url.png)
{position:absolute,top:50px,right:30px,width:200px,opacity:0.9}
```

## Tables

### Standard Tables

```markdown
| Name | Level | Role |
|:-----|:-----:|-----:|
| Left aligned | Centered | Right aligned |
```

### Table with Column/Row Spanning

```markdown
| Header 1 | Spanning Header ||
| Header 2 | Header 3 | Header 4 |
|:---------|:--------:|:--------:|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4  ^| Cell 5   | Cell 6   |
```

- Use `||` to span columns
- Use `^` before `|` to span rows

## Definition Lists

For hanging indents (useful for ability descriptions):

```markdown
**Ability Name** :: This is the description that will hang-indent nicely
beneath the bolded ability name.
```

## Color and Styling (Inline)

Use curly bracket injection for inline styling:

```markdown
This text is {color:red important}.

#### This Header is Purple
{color:purple,text-align:center}
```

## When to Use What

### Adventure Files

- Use `{{descriptive}}` for read-aloud text at scene starts
- Use `{{note}}` for DM notes, tactics, optional rules
- Use `\page` to break at natural scene/encounter boundaries
- Use `{{monster,frame}}` for creature stat blocks
- Add `{{pageNumber}}` and `{{footnote}}` at page bottoms

### World Building Documents

- Use `{{note}}` for interesting lore callouts
- Use blockquotes (>) for in-world quotations
- Use `\page` for major section breaks
- Keep formatting minimal unless printing/sharing

### Reference Documents

- Use `{{wide}}` for large tables
- Use definition lists for glossaries
- Use clear header hierarchy
- Add table of contents for long documents

## Common Patterns

### Scene Opening

```markdown
\page

# Scene 3: Into the Woods

{{descriptive
##### The Western Woods
As you push through the thick undergrowth, the smell of moss and earth
fills your lungs. Shadows deepen beneath the canopy, and distant howls
echo through the trees.
}}

The party has several options here...

{{note
##### DM Note: Navigation
If the party has no tracker, Corel will volunteer to help. He uses the
**Commoner** stat block with Wisdom 14 and +4 to Survival.
}}
```

### Monster Encounter

```markdown
## Combat Encounter: Wolf Pack

The wolves attack in coordinated fashion. Use the following stat blocks:

{{monster,frame
## Wolf
*Medium beast, unaligned*
___
[stat block content]
}}

**Tactics:** The wolves focus on isolating one target...

{{note
##### Balancing the Encounter
For parties of 3 or fewer, reduce the number of wolves to 6.
}}
```

### Important Information Box

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

## File-Specific Guidelines

### Adventures (`Season 1/Adventures/*`)

- **Must have:** Clear scene breaks with H1 headers
- **Should have:** Descriptive boxes for read-aloud text
- **Should have:** Note boxes for DM guidance
- **Should have:** Page numbers and footers
- **Must have:** Proper `\page` breaks (aim for 450-600 words per page)

### World Building (`World Building/*`)

- **Should have:** Clean header hierarchy
- **Can have:** Note boxes for interesting lore
- **Should have:** Blockquotes for in-world quotations
- **Optional:** Page breaks (only if document is print-ready)

### Reference Materials (`Season 1/DM_Resources/*`)

- **Must have:** Clear organization with headers
- **Should have:** Tables for structured data
- **Optional:** Decorative elements (prefer clarity over decoration)

## VS Code Settings

Ensure these settings in `.vscode/settings.json`:

```json
{
  "homebrewery.enabled": true,
  "markdown.preview.scrollEditorWithPreview": false,
  "markdown.preview.scrollPreviewWithEditor": false,
  "markdown.preview.markEditorSelection": false
}
```

## Preview Your Work

- **VS Code Preview:** `Ctrl+Shift+V` (Windows/Linux) or `Cmd+Shift+V` (Mac)
- **Homebrewery Website:** Copy/paste to https://homebrewery.naturalcrit.com for full rendering

## Resources

- **Homebrewery GitHub:** https://github.com/naturalcrit/homebrewery
- **Homebrewery Website:** https://homebrewery.naturalcrit.com
- **VS Code Extension:** `officerhalf.homebrewery-vscode`
- **Community Support:** r/homebrewery on Reddit

## Examples

See the following files for good examples of Homebrewery formatting:

- `Season 1/Adventures/Wolves_Of_Welton/5E_Wolves_Of_Welton.md` - Basic page breaks and structure
- `Season 1/Adventures/Peril_in_Pinebrook_COMPLETE/Peril_in_Pinebrook_COMPLETE.md` - Well-formatted adventure

---

*Last Updated: 2026-02-02*

**Remember:** The goal is authentic D&D presentation with clean, readable markdown. Don't over-decorate—use formatting to enhance clarity and usability.
