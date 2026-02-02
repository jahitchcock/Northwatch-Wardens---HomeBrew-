# Homebrewery Formatting: Before and After Examples

This document demonstrates the improvements made by applying Homebrewery best practices to markdown files in the Northwatch Wardens repository.

---

## Example 1: Adventure Scene Opening

### ❌ Before (Plain Markdown)

```markdown
# Scene 1: The Road to Welton

The party is traveling through rolling hills. They see a village in
the distance. Ahead of them, wolves are attacking some shepherds
and their sheep. Eight wolves are involved in the attack.

The players should roll initiative if they want to help.
```

### ✅ After (Homebrewery Enhanced)

```markdown
# Scene 1: The Road to Welton

{{descriptive
##### On the Road
The party travels through rolling hills to the west of Welton. The
village's neat white-walled buildings stand out among the green grass
in the valley below. Around 150 feet ahead, the road bends between
an outcrop of rocks and the borders of a mossy woodland.

As you approach, you see a pair of men driving a small flock of sheep
through the gap with the help of four sheepdogs. Suddenly, the dogs
prick up their ears and start frantically barking. The men pull long
wooden clubs from their belts and look about in alarm.

In the blink of an eye, lean grey shapes burst from both sides of the
road, launching themselves at the sheep with incredible speed.
}}

Eight **Wolves** *(MM p241)* are attacking the flock.
```

**What Changed:**
- Added `{{descriptive}}` box for read-aloud text
- Separated DM information from player-facing description
- Enhanced atmospheric details
- Proper formatting for Monster Manual references

---

## Example 2: Combat Tactics

### ❌ Before

```markdown
## Combat Tactics

The wolves want to steal sheep, not fight adventurers. Half will
distract the shepherds while the rest steal sheep. They will run
away if outmatched.
```

### ✅ After

```markdown
{{note
##### Combat Tactics
The wolves are here to steal sheep, not kill shepherds—they certainly
don't want to fight even low-level adventurers. Half of them will keep
the shepherds distracted while the rest pick off sheep and retreat to
the west. They will not try to kill the shepherds, but will instead
bite at their arms and legs.

When the players arrive on the scene the wolves may test their strength
with a couple rounds of combat, but will quickly retreat into the woods
if it appears they are outmatched.
}}
```

**What Changed:**
- Converted to `{{note}}` box for DM-only information
- Kept tactical information visually distinct from player content
- Enhanced with more tactical detail

---

## Example 3: Guild Charter

### ❌ Before

```markdown
**Article III — The Guild Code**

All Wardens shall:

# 1. Protect the innocent
# 2. Honor their contracts
# 3. Share vital information with fellow Wardens
# 4. Respect the frontier's people, land, and traditions
# 5. Stand against corruption, mortal or magical
# 6. Never abandon a companion unless retreat is the only path

Violation of the Code may result in suspension or exile.
```

### ✅ After

```markdown
## Article III — The Guild Code

{{note
##### The Six Tenets

All Wardens shall:

1. Protect the innocent
2. Honor their contracts
3. Share vital information with fellow Wardens
4. Respect the frontier's people, land, and traditions
5. Stand against corruption, mortal or magical
6. Never abandon a companion unless retreat is the only path to survival
}}

Violation of the Code may result in suspension, exile, or—if
necessary—judgment by the full council.
```

**What Changed:**
- Changed from bold to proper H2 header (`##`)
- Wrapped code in decorative `{{note}}` box
- Changed H1 (`#`) list items to proper numbered list
- Added descriptive sub-header for clarity

---

## Example 4: World Building Descriptions

### ❌ Before

```markdown
## Overview

Solaris is a vibrant metropolis known as the beating heart of music,
storytelling, and bardic tradition. The city thrives on creativity,
performance, and mythmaking.

But beneath the artistic brilliance lies deep political tension. Three
factions compete to define the city's soul.
```

### ✅ After

```markdown
## Overview

{{descriptive
##### The Heart of Song and Story
Solaris is a vibrant metropolis known as the beating heart of music,
storytelling, and bardic tradition. The city thrives on creativity,
performance, and mythmaking—its plazas echo with tales and its streets
feel like they are always mid-song.

But beneath the artistic brilliance lies deep political tension. Three
factions compete to define the city's soul, each offering a different
vision of power, magic, and the future.
}}

This is where news travels fastest, where secrets become songs, and
where the Aeorian Echo manifests as social upheaval rather than
physical corruption.
```

**What Changed:**
- Added `{{descriptive}}` box for atmospheric introduction
- Separated evocative description from factual information
- Enhanced with descriptive sub-header
- Expanded details for better immersion

---

## Example 5: Page Numbers and Footers

### ❌ Before

```markdown
...end of page content...

\page

More content on next page...
```

### ✅ After

```markdown
...end of page content...

{{pageNumber,auto}}
{{footnote PART 1 | ADVENTURE TITLE}}

\page

More content on next page...

{{pageNumber,auto}}
{{footnote PART 1 | ADVENTURE TITLE}}
```

**What Changed:**
- Added automatic page numbering with `{{pageNumber,auto}}`
- Added footer text with `{{footnote}}`
- Creates professional D&D-style page layout

---

## Example 6: NPC Dialogue

### ❌ Before

```markdown
The innkeeper says "Welcome to the Shepherd's Crook! What brings
adventurers to our humble village?"
```

### ✅ After

```markdown
### Leanor Slatebeard, Innkeeper
**Race:** Dwarf  
**Personality:** Friendly, observant, protective of guests

> "Welcome to the Shepherd's Crook! What brings adventurers to our
> humble village? We don't get many of your kind here—not since the
> wolves started their raids."

{{note
##### Roleplaying Leanor
- Speaks in a warm but direct manner
- Will offer free drinks if party mentions helping with wolves
- Knows most of the village gossip
- Protective of Featherock (the injured halfling upstairs)
}}
```

**What Changed:**
- Added NPC header with key details
- Used blockquote (`>`) for actual dialogue
- Added `{{note}}` box for roleplaying guidance
- Enhanced dialogue with character voice

---

## Summary of Improvements

### Key Homebrewery Elements Added:

1. **{{descriptive}}** — For read-aloud text and atmospheric descriptions
2. **{{note}}** — For DM notes, tactics, and guidance
3. **{{pageNumber,auto}}** — For automatic page numbering
4. **{{footnote}}** — For footer text
5. **Proper headers** — H1 for titles, H2 for sections, consistent hierarchy
6. **Blockquotes** — For NPC dialogue and in-world quotes
7. **Definition lists** — For ability descriptions (ability :: description)
8. **Better organization** — Separate player-facing from DM information

### Visual Benefits:

- Content looks more like official D&D books
- Information hierarchy is clearer
- DM-only content is visually distinct
- Read-aloud text is clearly marked
- Professional page layout with numbers and footers

### Functional Benefits:

- Easier to run at the table (DM knows what to read)
- Better organization of information
- Clear separation of concerns
- Consistent formatting across documents
- Ready for printing or PDF export

---

## Files Updated

The following files have been enhanced with Homebrewery best practices:

1. **.github/HOMEBREWERY_BEST_PRACTICES.md** — Comprehensive style guide (NEW)
2. **.github/templates/adventure_template.md** — Adventure template (NEW)
3. **World Building/Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md** — Enhanced charter
4. **World Building/Regions/02_Solaris_Dominion.md** — Enhanced region description

## Next Steps

To apply these improvements to other files:

1. Review the **HOMEBREWERY_BEST_PRACTICES.md** guide
2. Use the **adventure_template.md** for new adventures
3. Gradually enhance existing adventures with:
   - `{{descriptive}}` boxes for scene openings
   - `{{note}}` boxes for DM guidance
   - Proper page numbers and footers
   - Consistent header hierarchy

## Resources

- **Best Practices Guide:** `.github/HOMEBREWERY_BEST_PRACTICES.md`
- **Adventure Template:** `.github/templates/adventure_template.md`
- **Homebrewery Website:** https://homebrewery.naturalcrit.com
- **VS Code Extension:** `officerhalf.homebrewery-vscode`

---

*Last Updated: 2026-02-02*
