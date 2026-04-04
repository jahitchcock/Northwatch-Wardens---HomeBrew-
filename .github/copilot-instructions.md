# GitHub Copilot Instructions for Northwatch Wardens

## Repository Overview

**Northwatch Wardens: Season One** — modular, drop-in D&D 5e guild campaign set in Northreach (world: Aevoria). Generates two PDF-ready Homebrewery guides: **The Adventurer's Guide to Aevoria** (player-facing, printed) and **A DM's Guide to Aevoria** (adventures + secrets).

Format: Homebrewery V3 Markdown + JSON stat blocks + Game Master 5e XML.

## Repository Structure

```
/
├── .github/
│   ├── agents/           # Custom Copilot agents (7 agents)
│   ├── instructions/     # Always-on scoped instructions (3 files)
│   ├── prompts/          # Reusable prompt templates (11 prompts)
│   ├── templates/        # XML and content templates
│   └── workflows/        # GitHub Actions (auto-build on push to main)
├── Season 1/
│   ├── Adventures/       # Individual adventure modules
│   └── Campaign Assets/  # Charter, NPCs, campaign arc
├── Premade PCs/          # Pre-generated player characters
├── World Building/       # Setting and lore (player-facing content)
├── build/                # Generated output (do not edit directly)
└── LionsdenGameFiles/    # Game Master 5e XML files
```

## Build System

```bash
./build.sh                  # Both guides
./build.sh --players        # Player's Guide only
./build.sh --dms            # DM's Guide only
```

TOC configs: `build/players-guide-toc.json`, `build/dms-guide-toc.json`. Edit TOC JSON to add/remove content — never edit `build/*.md` directly.

## File Formats

**Markdown** — Homebrewery V3 (NOT standard markdown). `\page` for breaks, `{{monster,frame}}` for stat blocks, `{{note}}`/`{{descriptive}}` for callouts. Full syntax: `.github/HOMEBREWERY_V3_GUIDE.md`.

**XML** — Game Master 5e v5. Root: `<data version="5">` (NOT `<compendium>`). Nest: `campaign > adventure > encounter > combatant > monster`. Unique UIDs required. CDATA for long text. Details: `.github/agents/DMHelper.agent.md`.

**JSON** — D&D 5e stat block data, companion files to markdown adventures.

## Development Flow

1. **Edit** `.md` / `.json` / `.xml` files
2. **Preview** markdown with Homebrewery extension (`officerhalf.homebrewery-vscode`)
3. **Validate** XML syntax + unique UIDs; verify Homebrewery rendering
4. **Build** with `./build.sh` to confirm output
5. **Commit** with descriptive message referencing adventure or system modified

## Custom Agents

### Campaign Agents

| Agent | File | Use When |
|-------|------|----------|
| **DMHelper** | `.github/agents/DMHelper.agent.md` | XML campaign files, Homebrewery stat blocks, D&D 5e API |
| **DMAssistant** | `.github/agents/DMAssistant.agent.md` | Session prep, adventure creation, NPC design, canon checks |
| **CanonChecker** | `.github/agents/CanonChecker.agent.md` | Validating geography, NPCs, player-facing links, tone |
| **DnDToolkit** | `.github/agents/DnDToolkit.agent.md` | Dice rolls, spell/monster lookup, encounter building |

### Development Agents

| Agent | File | Use When |
|-------|------|----------|
| **AdversarialReviewer** | `.github/agents/AdversarialReviewer.agent.md` | Critical code review via hostile reviewer personas |
| **SeniorArchitect** | `.github/agents/SeniorArchitect.agent.md` | Architecture decisions, ADRs, tech stack evaluation |
| **Refine Issue** | `.github/agents/refine-issue.agent.md` | Enriching issues with acceptance criteria and edge cases |

## Prompt Templates

Reusable prompts in `.github/prompts/`. Invoke via Copilot Chat prompt picker.

| Prompt | File | Purpose |
|--------|------|---------|
| **Brainstorm** | `brainstorm.prompt.md` | Explore intent and design before implementation |
| **Write Plan** | `write-plan.prompt.md` | Create implementation plan with bite-sized tasks |
| **Execute Plan** | `execute-plan.prompt.md` | Run a written plan with review checkpoints |
| **New Adventure** | `new-adventure.prompt.md` | Scaffold adventure with Aeorian Echo hooks |
| **New NPC** | `new-npc.prompt.md` | Create NPC: stat block + XML + roster update |
| **Session Prep** | `session-prep.prompt.md` | One-page DM session prep document |
| **GM Craft** | `gm-craft.prompt.md` | Fail forward, NPC motivation, scene pacing |
| **Debug** | `debug.prompt.md` | 4-phase structured root cause investigation |
| **Code Review** | `code-review.prompt.md` | Multi-lens review with deviation analysis |
| **Verify Completion** | `verify-completion.prompt.md` | Evidence-based completion verification |
| **Safety Review** | `ai-prompt-engineering-safety-review.prompt.md` | Prompt safety and bias analysis |

## Always-On Instructions

Files in `.github/instructions/` load automatically based on `applyTo` patterns:

| Instruction | Scope | Effect |
|-------------|-------|--------|
| `canon.instructions.md` | `**/*.md` | Canonical geography, NPCs, tone, player-facing rules |
| `verification.instructions.md` | `**` | Require evidence before claiming work is complete |
| `test-driven-development.instructions.md` | `*.{js,ts,py,sh}` | Write tests before implementation code |

## Git Practices

- **Branches:** `feature/description`, `fix/description`, `copilot/description`
- **Commits:** Descriptive, reference adventure or system. Example: *"Add Wolves of Welton encounter to XML"*

## Key References

| File | Purpose |
|------|---------|
| `.github/HOMEBREWERY_V3_GUIDE.md` | Homebrewery V3 syntax (single source of truth) |
| `.github/agents/DMHelper.agent.md` | XML structure specs + D&D API integration |
| `Season 1/Campaign Assets/DM Guild Roster.md` | NPC details + secrets |
| `Season 1/Campaign Assets/NORTHWATCH WARDENS - Campaign Arc.md` | Mystery framework |
| `build/players-guide-toc.json` | Player's guide chapter structure |
| `build/dms-guide-toc.json` | DM's guide chapter structure |

---

**Last Updated:** 2025-07-12
