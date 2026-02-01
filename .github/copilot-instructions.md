# GitHub Copilot Instructions for Northwatch Wardens

## Repository Overview

This repository contains **Northwatch Wardens: Season One**, a modular, drop-in D&D 5e guild campaign set in the frontier region of Northreach. The campaign is designed for 2–5 players per session with flexible attendance and order-independent adventures.

**Key Features:**
- Contract-based adventure system
- Order-independent modular adventures
- Guild headquarters at Waystone Inn
- Central mystery: the Aeorian Echo
- Format: Markdown + JSON stat blocks + Game Master 5e XML

## Code Standards

### Required Before Each Commit
- **Validate XML**: Ensure all XML files are well-formed and use proper Game Master 5e v5 structure
- **Check Geography**: Verify all location references use canonical geography (see table below)
- **Preview Markdown**: Use Homebrewery VS Code extension to preview D&D content formatting
- **Unique UIDs**: Ensure all XML elements have unique UIDs across the entire campaign

### Development Flow
- **Edit**: Make changes to markdown (.md), JSON (.json), or XML (.xml) files
- **Preview**: For markdown files, use Homebrewery preview (`Ctrl+Shift+V` or `Cmd+Shift+V`)
- **Validate**: Check XML syntax and structure, verify markdown formatting
- **Test Import**: Test XML files in Game Master 5e application when possible

## Repository Structure

```
/
├── .github/
│   ├── agents/           # Custom Copilot agents
│   │   └── DMHelper.agent.md
│   └── templates/        # XML and content templates
├── Season 1/
│   ├── Adventures/       # Individual adventure modules
│   └── Campaign Assets/  # Charter, NPCs, campaign arc
├── Examples/             # Reference materials
├── Premade PCs/          # Pre-generated player characters
├── World Building/       # Setting and lore
├── README.md            # Campaign guide
├── AITooling.md         # AI tooling notes
└── Complete_Compendium_2014+2024.xml  # Game Master 5e XML file
```

## File Formats

### 1. Markdown Files (Adventure Guides)

- Use **Homebrewery-style markdown** for D&D content
- Page breaks: `\page`
- Snippets: Use `brew` prefix (e.g., `brewStatBlock`)
- Preview: VS Code extension *Homebrewery Markdown Preview* (`officerhalf.homebrewery-vscode`)

**Important Conventions:**
- Keep formatting consistent with existing adventure files
- Use descriptive headers for encounters and scenes
- Include tactical notes for DMs
- Reference canonical geography (see below)

### 2. JSON Files (Stat Blocks)

- Companion files to markdown adventures
- Parseable creature and NPC statistics
- Follow D&D 5e stat block structure
- Used for programmatic reference

### 3. XML Files (Game Master 5e Format)

- **Format:** Game Master 5e XML (version 5)
- **Root element:** `<data version="5">` (NOT `<compendium>`)
- **Compatible with:** Lion's Den Game Master 5e application
- **Reference:** See `.github/agents/DMHelper.agent.md` and `.github/templates/CampaignTemplate.md`

**Critical XML Requirements:**
- Use proper nesting: `campaign > adventure > encounter > combatant > monster`
- Include unique UIDs for all elements
- Use CDATA blocks for long text: `<![CDATA[...]]>`
- Include both `<atk>` and `<dmg>` in attack blocks
- Use reference IDs for abilities, skills, and spell schools

## Canonical Geography

**IMPORTANT:** Never invent new locations unless directed to explicitly do so. Always use these established locations:

| Location | Position | Purpose | Region |
|----------|----------|---------|--------|
| **Waystone Inn** | Center | Guild headquarters, mission hub | Northreach |
| **Welton** | Southwest | Farming village (Wolves of Welton) | Northreach |
| **Westly's Farm** | West of Welton | Wolf attack site | Northreach |
| **Shepherd's Crook Inn** | Inside Welton | Village social hub | Northreach |
| **Pinebrook** | Southeast | Trading village (Peril in Pinebrook) | Northreach |
| **Palebank Village** | Northeast coast | Seaside settlement (Frozen Sick) | Northreach |
| **Croaker Cave** | North of Palebank | Bandit hideout | Northreach |
| **Salsvault** | Far north of Palebank | Buried Aeorian ruins (source of Echo) | Northreach |
| **Temple of the Dragonknights** | Northwest mountains | Cult stronghold (capstone adventure) | Northreach |
| **Noke's Tower** | West of Waystone | Wizard's tower (Wild Sheep Chase) | Northreach |

## Campaign Content Guidelines

### Adventures (Season 1)

1. **Wolves of Welton** (Levels 1–3)
   - Theme: Intelligence awakening
   - Type: Investigation with moral choices
   - Key Discovery: Wolves are awakened by magical energy

2. **Frozen Sick** (Levels 2–4)
   - Theme: Ancient magic resurfacing
   - Type: Survival + exploration
   - Key Discovery: Aeorian spores from Salsvault

3. **Temple of the Dragonknights** (Levels 4–5)
   - Theme: Ambition and corruption
   - Type: Combat + infiltration
   - Key Discovery: Factions exploiting rising magic

4. **The Wild Sheep Chase** (Levels 1–2)
   - Theme: Magic destabilizing
   - Type: Comedy one-shot
   - Tone: Lighthearted but thematically significant

5. **Peril in Pinebrook** (Levels 1–3)
   - Theme: Frontier fragility
   - Type: Investigation + social
   - Key Discovery: All settlements are vulnerable

### Guild NPCs

**Leadership Triad:**
- **Marshal Brenna Thorne** — Field commander, tactical decisions
- **Steward Mara Fenwick** — Quartermaster, logistics
- **Lorewarden Elric Vael** — Arcane scholar, investigation support

**See:** `Season 1/Campaign Assets/DM Guild Roster.md` for complete NPC details and secrets

### The Aeorian Echo (Central Mystery)

All adventures connect to a spreading arcane phenomenon: magic from buried Aeorian ruins (Salsvault) is destabilizing the frontier. Each adventure provides clues without revealing the full picture.

**Design Principle:** Adventures are order-independent; players can discover the mystery in any sequence.

## Coding and Content Standards

### When Creating New Content

1. **Stay Canonical:** Use established locations, NPCs, and lore
2. **Maintain Tone:** Low-magic frontier with grounded atmosphere
3. **Order Independence:** Each adventure should stand alone
4. **Scalability:** Design for 2–5 players with variable attendance
5. **Mystery Integration:** Include subtle clues about the Aeorian Echo
6. **Moral Complexity:** Provide multiple resolution paths

### When Editing XML

1. **Use DMHelper Agent:** For Game Master 5e XML work, prefer the DMHelper custom agent
2. **Validate Structure:** Ensure proper nesting and unique UIDs
3. **Reference Templates:** Check `.github/templates/CampaignTemplate.md` for format details
4. **CDATA for Long Text:** Use CDATA blocks to preserve formatting
5. **Complete Stat Blocks:** Include all required fields (AC, HP, abilities, etc.)

### When Working with Markdown

1. **Homebrewery Compatibility:** Use `\page` for breaks, avoid incompatible syntax
2. **Consistent Headers:** Follow existing adventure structure
3. **Tactical Notes:** Include DM guidance for encounters
4. **Stat References:** Link to JSON files or XML entries
5. **Preview Settings:** Use workspace settings from `.vscode/settings.json`

#### \page Insertion Heuristics (Based on PlayerFacing Docs)

Use these rules-of-thumb to keep pagination consistent with `World Building/PlayerFacing/` reference documents:

- **Default page chunk size:** insert `\page` at a natural boundary around **70–85 non-empty lines** or **450–550 words** since the last break.
- **List- / header-heavy pages:** break earlier by words (**~330–420 words**) even if line count is high.
- **Prose-heavy pages:** you can run longer (**~500–600 words**) before inserting `\page`.
- **Avoid orphaned headings:** if a new major heading (e.g., `##`) would start near the bottom of a page, insert `\page` immediately before it.
- **Keep blocks intact:** don’t place `\page` inside tables or long lists; break before or after.

## Custom Agents

### DMHelper Agent

**Purpose:** Generate and maintain Game Master 5e XML campaign content

**Use for:**
- Creating new adventures and encounters
- Expanding NPC stat blocks
- Adding magic items and treasure
- Validating XML structure
- Campaign lore expansion

**Location:** `.github/agents/DMHelper.agent.md`

**Key Capabilities:**
- Understands Game Master 5e XML format (version 5)
- Maintains canonical geography and lore
- Creates properly nested adventure/encounter structures
- Generates complete stat blocks with proper IDs

## Git Practices

### Branch Naming
- Feature branches: `feature/description`
- Bug fixes: `fix/description`
- Copilot-generated: `copilot/description`

### Commit Messages
- Use descriptive, concise messages
- Reference adventure or system being modified
- Example: "Add Wolves of Welton encounter to XML"

### Files to Ignore
- Build artifacts
- Temporary files
- Editor-specific files (already in `.gitignore`)

## Testing and Validation

### For XML Changes
1. Validate XML syntax (well-formed)
2. Check unique UIDs across all elements
3. Verify proper element nesting
4. Test import in Game Master 5e application

### For Markdown Changes
1. Preview in Homebrewery VS Code extension
2. Check page breaks render correctly
3. Verify stat block formatting
4. Ensure references are accurate

### For Campaign Content
1. Check against canonical geography
2. Verify NPC consistency with roster
3. Confirm mystery clue integration
4. Test scalability for different party sizes

## Common Patterns

### Creating a New Adventure

1. Create folder in `Season 1/Adventures/`
2. Add markdown guide with Homebrewery formatting
3. Create companion JSON file with stat blocks
4. Update XML with `<adventure>` entry
5. Add encounters with proper nesting
6. Include tactical notes and DM guidance
7. Reference in campaign arc documentation

### Adding a New NPC

1. Add entry to `Season 1/Campaign Assets/DM Guild Roster.md`
2. Create XML `<npc>` entry with complete stat block
3. Include personality, role, and hooks
4. Add to relevant adventure encounters
5. Note any secrets or campaign connections

### Creating Custom Items

1. Design mechanics following 5e guidelines
2. Create XML `<item>` entry with proper type ID
3. Add description and rarity
4. Reference in appropriate adventure loot tables
5. Consider campaign theme and balance

## Design Philosophy

**Core Principles:**
- **Modular Structure:** Adventures work in any order
- **Variable Attendance:** Support 2–5 players, drop-in friendly
- **Mystery-Driven:** Gradual revelation of the Aeorian Echo
- **Consequence-Rich:** Player choices affect NPCs and settlements
- **Moral Complexity:** Multiple resolution paths, no single "right" answer
- **Frontier Atmosphere:** Grounded, low-magic setting with arcane mysteries

**Tone Guidelines:**
- Generally serious with occasional levity (Wild Sheep Chase)
- Focus on frontier survival and community
- Emphasize investigation and discovery
- Avoid power fantasy; maintain tension
- Intelligence and negotiation are valued alongside combat

## Resources

### Key Files
- `README.md` — Complete campaign guide
- `AITooling.md` — AI tooling notes and context
- `World Building/Organizations/Northwatch_Wardens/THE NORTHWATCH WARDENS - Charter.md` — Guild charter (canonical)
- `Season 1/Campaign Assets/DM Guild Roster.md` — NPC details and secrets
- `Season 1/Campaign Assets/NORTHWATCH WARDENS - Campaign Arc.md` — Mystery framework

### Reference Materials
- `.github/agents/DMHelper.agent.md` — DMHelper agent documentation
- `.github/templates/CampaignTemplate.md` — XML format reference (if exists)
- Individual adventure folders — Examples of structure and style

### External Tools
- **Homebrewery** — D&D content formatting
- **Game Master 5e** — Campaign tracking and XML import
- **VS Code Extension** — Homebrewery Markdown Preview

## Questions and Troubleshooting

### XML Issues
- **Problem:** Invalid XML structure
- **Solution:** Reference DMHelper agent or CampaignTemplate.md for correct nesting

### Content Consistency
- **Problem:** New location doesn't fit
- **Solution:** Check canonical geography table; use established locations only

### Format Questions
- **Problem:** Unsure about markdown syntax
- **Solution:** Review existing adventure files for patterns

### Agent Usage
- **Problem:** Need to work with XML
- **Solution:** Use DMHelper custom agent for specialized XML tasks

---

**Last Updated:** 2026-02-01

For questions or clarifications about these instructions, refer to the repository documentation or custom agent specifications.
