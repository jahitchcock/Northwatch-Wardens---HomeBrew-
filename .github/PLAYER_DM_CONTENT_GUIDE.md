# Player vs DM Content Guidelines

This guide helps contributors maintain clear separation between player-safe content and DM-only secrets in the Northwatch Wardens campaign.

---

## Core Principle

**Players should be able to explore the world without accidentally spoiling campaign mysteries.**

- ✅ **Player-safe content** describes what characters would reasonably know
- 🚫 **DM-only content** reveals secrets, future plot points, NPC motivations, and mystery solutions

---

## Directory Structure

### ✅ PLAYER-SAFE Directories

These folders contain content that players can freely read:

```
World Building/
├── Regions/              # Regional descriptions and culture
├── Organizations/        # Public faction information
├── Locations/           # Place descriptions (player perspective)
├── Religion/            # Pantheons and public religious knowledge
└── Campaign Assets/     # Maps and visual references

Premade PCs/            # Pre-generated characters
Characters/             # Character sheets and builds
```

### 🚫 DM-ONLY Directories

These folders contain secrets and spoilers:

```
World Building/
└── DMEyesOnly/         # Campaign secrets, NPC motivations, plot reveals

Season 1/
├── DM_Resources/        # DM tools, secret rosters, campaign arc
└── Adventures/          # Adventures contain both player read-aloud and DM notes
```

---

## Content Headers

### For DM-Only Files

All files in `DMEyesOnly/` and `DM_Resources/` should start with this warning block:

```markdown
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: [Brief Description]**

This document contains [what type of secrets]. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `[path to player-safe version]`
}}
```

**Example:**
```markdown
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: NPC Secrets**

This document contains hidden NPC motivations and campaign connections. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `World Building/Regions/Northreach/People_of_Northreach.md`
}}
```

### For Player-Safe Files

Files that are explicitly player-safe can use this optional header:

```markdown
{{descriptive
##### 🌟 PLAYER-SAFE CONTENT

**Public Knowledge: [Topic]**

This document contains information that is publicly known. Players can freely read this material.

**DMs:** For secrets and hidden information, see `[path to DM version]`
}}
```

---

## Adventure Content: Mixed Player/DM Information

Adventure files contain both player read-aloud text and DM-only information. Use these conventions:

### Read-Aloud Text (Player-Safe)

Use `{{descriptive}}` blocks for text meant to be read to players:

```markdown
{{descriptive
As you approach the village of Welton, you see neat white-walled buildings nestled in a green valley. Smoke rises from chimneys, and you can hear the distant bleating of sheep.
}}
```

### DM Notes and Secrets

Use `{{note}}` blocks for DM-only information:

```markdown
{{note
##### DM Note: NPC Secret Motivation

Father Merriksonn knows his brother Alexi is responsible for awakening the wolves but hasn't told anyone. He's torn between family loyalty and the safety of the village.
}}
```

### Tactical Information

For combat tactics and mechanics (DM-only but not spoilers):

```markdown
## Combat Tactics

The wolves are here to steal sheep, not kill shepherds. They will retreat if they appear outmatched. Half keep the shepherds distracted while the rest grab sheep and flee west.
```

---

## What Goes Where?

### Player-Safe Content Includes:

- ✅ Public NPC descriptions (appearance, reputation, common sayings)
- ✅ Regional geography and culture
- ✅ Faction public goals and structure
- ✅ Historical events that are common knowledge
- ✅ Religious beliefs and practices
- ✅ Rumors and legends (even if false)
- ✅ Town/city descriptions from traveler perspective

### DM-Only Content Includes:

- 🚫 NPC secret motivations and hidden pasts
- 🚫 The true nature of the Aeorian Echo
- 🚫 Plot connections between adventures
- 🚫 Future adventure hooks and foreshadowing
- 🚫 Mystery solutions
- 🚫 "What really happened" explanations
- 🚫 Campaign arc structure and revelations
- 🚫 Hidden faction agendas

---

## Examples

### Good: Player-Safe NPC Description

```markdown
### Marshal Brenna Thorne

**Leader of the Northwatch Wardens**

Brenna came to Northreach fifteen years ago after a military career in the south. She's known for being fair but firm, and she personally vets every contract.

**Common Saying:** "The work matters more than the glory."
```

### Good: DM-Only Secret

```markdown
### Marshal Brenna Thorne — Secret

**Private Truth:** Brenna lost her younger brother during the "Greywinter Hunts" to an unknown creature. She suspects the current wolf attacks are connected but hasn't shared this fear with anyone.

**Campaign Tie-in:** She recognizes the wolf behavior as unnatural and will push the party to investigate thoroughly rather than just kill them.
```

### Bad: Mixing Player/DM Info

```markdown
### Marshal Brenna Thorne

Brenna is the guild leader. She lost her brother to wolves years ago 
and secretly suspects the current attacks are magically influenced.
She came from the south fifteen years ago.
```

**Problem:** Reveals her secret suspicion in a player-facing context.

---

## README Files

### World Building README

Should clearly separate player-safe from DM-only folders with visual markers.

### Season/Adventure READMEs

Should include spoiler warnings if they describe campaign structure or mysteries.

---

## Build System Considerations

The build system creates two PDFs:
1. **The Adventurer's Guide to Aevoria** (player-facing)
2. **A DM's Guide to Aevoria** (DM-facing)

Files are assigned to each book via TOC files in `build/`:
- `players-guide-toc.json` — Only player-safe content
- `dms-guide-toc.json` — Adventures and DM resources

**When adding new content:**
- Player-safe files → add to `players-guide-toc.json` if appropriate
- DM resources → add to `dms-guide-toc.json` only
- Adventures → DM guide only (they contain secrets)

---

## Checklist for New Content

When creating new content, ask:

- [ ] Is this information publicly known in-world?
- [ ] Would learning this spoil a mystery or surprise?
- [ ] Does this reveal NPC motivations players shouldn't know?
- [ ] Does this explain "what really happened" vs "what people believe"?

If any answer is "yes," it's DM-only content.

### For DM-Only Files:
- [ ] File is in `DMEyesOnly/` or `DM_Resources/` directory
- [ ] File has warning header with `{{note}}` block
- [ ] File references corresponding player-safe version (if one exists)
- [ ] File is only in `dms-guide-toc.json` (not `players-guide-toc.json`)

### For Player-Safe Files:
- [ ] File contains only information characters would know
- [ ] File does not reveal plot secrets or mystery solutions
- [ ] Optional: File has player-safe header (if helpful)
- [ ] File is in appropriate player-safe directory

---

## Common Mistakes to Avoid

### ❌ Don't Mix Secret and Public Info

**Bad:**
```markdown
# Welton Village

A farming village. The wolves attacking it are awakened by Alexi Merriksonn's 
accidental magical discharge.
```

**Good:**
```markdown
# Welton Village (Player-Safe)

A farming village of 200 people known for sheep farming and wool trade.

---

# Welton Village (DM-Only - DMEyesOnly/)

**The Secret:** The wolves are awakened by Alexi Merriksonn's accidental 
magical discharge when he was exposed to Aeorian energy.
```

### ❌ Don't Put Secrets in Player Directories

**Bad:**
```
World Building/Regions/Northreach/The_Aeorian_Echo_Truth.md
```

**Good:**
```
World Building/DMEyesOnly/The_Aeorian_Echo.md
```

### ❌ Don't Forget Warning Headers

Every file in `DMEyesOnly/` or `DM_Resources/` needs a warning block.

---

## Questions?

If you're unsure whether something is player-safe:

1. **Ask yourself:** Would this ruin a surprise or mystery for players?
2. **When in doubt:** Make it DM-only
3. **Create both versions:** Public description + secret truth in separate files

---

## Templates

### DM-Only File Template

```markdown
{{note
##### ⚠️ DUNGEON MASTER EYES ONLY ⚠️

**CAMPAIGN SPOILERS: [Topic]**

This document contains [description]. **DO NOT share this with players** unless they discover it through gameplay.

**For player-safe content**, see `[path]`
}}

# [Title]: DM Secrets

[Content]
```

### Player-Safe File Template

```markdown
{{descriptive
##### 🌟 PLAYER-SAFE CONTENT

**Public Knowledge: [Topic]**

This document is safe for players to read.

**DMs:** For secrets, see `[path to DM version]`
}}

# [Title]

[Content]
```

---

**Last Updated:** 2026-02-06

For questions about content separation, see repository maintainers.
