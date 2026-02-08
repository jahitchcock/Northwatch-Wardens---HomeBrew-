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