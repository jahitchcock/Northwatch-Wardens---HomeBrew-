# AI Tooling for Northwatch Wardens Campaign

## Overview

This document tracks AI tools and integrations configured for the Northwatch Wardens D&D campaign.

## MCP Servers

### D&D Knowledge Navigator ✅ ACTIVE

**Status**: Configured and ready to use  
**Setup Date**: February 6, 2026  
**Repository**: [procload/dnd-mcp](https://github.com/procload/dnd-mcp)  
**Local Path**: `C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp`

#### What It Does

Provides GitHub Copilot with access to the D&D 5e API, including:
- **Spells**: Search, filter, and get detailed spell information
- **Monsters**: Find creatures by CR, type, and get stat blocks
- **Equipment**: Search items by cost, category, and properties
- **Classes**: Get class features, proficiencies, and starting equipment
- **Races**: Access racial traits and ability bonuses
- **Magic Items**: Search and get details on magic items

#### Configuration

- **Config File**: `.vscode/mcp.json`
- **Type**: Standard I/O (stdio) MCP server
- **Python**: 3.12.6 (virtual environment)
- **Server Name**: `dnd`

#### Quick Start

1. Open VS Code Chat: `Ctrl+Alt+I`
2. Click the Tools button (⚙️)
3. Enable "dnd" server tools
4. Ask D&D questions!

See [.vscode/DND_MCP_QUICKSTART.md](.vscode/DND_MCP_QUICKSTART.md) for more details.

#### Available Tools

| Tool Name | Description | Example Use |
|-----------|-------------|-------------|
| `search_all_categories` | Search across all D&D content | "Find information about druids" |
| `verify_with_api` | Verify D&D statements against API | "Is fireball a 3rd level spell?" |
| `check_api_health` | Check D&D 5e API status | "Is the D&D API working?" |
| `filter_spells_by_level` | Find spells in a level range | "Show me 2nd level evocation spells" |
| `find_monsters_by_challenge_rating` | Find monsters by CR | "List CR 5-8 monsters" |
| `search_equipment_by_cost` | Find affordable equipment | "Show equipment under 10 gold" |
| `generate_treasure_hoard` | Generate treasure for encounters | "Generate treasure for CR 5" |
| `get_class_starting_equipment` | Get starting gear for a class | "What does a wizard start with?" |

#### Resources

MCP resources provide direct access to D&D data for use as context:
- Spell lists
- Monster stat blocks
- Equipment catalogs
- Class information
- Race details

Add resources via: Chat → Add Context → MCP Resources → Select from "dnd" server

#### Example Queries

Campaign-specific examples that work with this server:

**Encounter Building:**
- "Find monsters with CR between 2 and 4 for a forest encounter"
- "Generate treasure for a CR 3 encounter at the end of a dungeon"
- "What are the stats for a wolf?" (relevant for Wolves of Welton)

**Spell Research:**
- "Search for spells that can detect magic"
- "What 1st level spells can heal?"
- "Show me evocation spells between levels 2-4"

**Equipment Shopping:**
- "What equipment costs less than 50 gold pieces?"
- "Search for weapons suitable for a rogue"
- "What's the Ring of Protection?"

**Character Creation:**
- "What starting equipment does a cleric get?"
- "Show me races that get a Wisdom bonus"
- "What are the features of the ranger class?"

**Campaign Lore:**
- "Tell me about the Aeorian ruins" (uses general D&D lore)
- "What types of magic items can store spells?"
- "Explain the Weave in D&D"

#### Documentation

Detailed documentation available in:
- [Setup Guide](.vscode/DND_MCP_SETUP.md) - Complete setup and troubleshooting
- [Quick Start](.vscode/DND_MCP_QUICKSTART.md) - Get started quickly
- [Repository Docs](C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp\docs\) - Official documentation

#### Troubleshooting

**Server not showing in Tools?**
1. Run: `MCP: List Servers` from Command Palette
2. Check if "dnd" server is listed
3. Try: `MCP: Reset Cached Tools`

**Trust prompt appearing?**
- Click "Trust" to allow the server to run
- Review `.vscode/mcp.json` if you want to verify configuration

**Tools not working?**
1. Check server status: `MCP: List Servers` → "dnd" → "Show Output"
2. Restart server: `MCP: List Servers` → "dnd" → "Restart"
3. Check Python environment: Open terminal and run:
   ```powershell
   cd "C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp"
   .\.venv\Scripts\python.exe --version
   ```

**API errors?**
- Run: Use `check_api_health` tool to verify D&D 5e API status
- The server caches responses, so temporary API issues may not be noticed

## GitHub Copilot Configuration

### Custom Instructions

**Location**: `.github/copilot-instructions.md`

Custom instructions provide context about:
- Campaign structure and organization
- File formats (Markdown, JSON, XML)
- Canonical geography and locations
- NPCs and guild structure
- Design philosophy and tone
- Coding standards for repository

### Custom Agents

**DMHelper Agent**  
**Location**: `.github/agents/DMHelper.agent.md`

Specialized agent for:
- Game Master 5e XML content generation
- Adventure and encounter creation
- NPC stat block generation
- Campaign lore expansion

## Future Tools

### Potential Additions

**Homebrewery Preview**
- VS Code extension for live preview of D&D markdown
- Currently using: `officerhalf.homebrewery-vscode`

**XML Validation**
- Automated validation of Game Master 5e XML files
- Currently using: Python scripts in `LionsdenGameFiles/Tools/`

**Map Tools**
- Integration with mapping tools for encounter design
- Status: Not yet implemented

**Initiative Tracker**
- MCP server for managing combat initiative
- Status: Researching options

## Maintenance

### Updating MCP Servers

```powershell
cd "C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp"
git pull origin main
.\.venv\Scripts\pip.exe install -e . --upgrade
```

Then restart VS Code or run `MCP: Restart Server`.

### Checking for Updates

Periodically check:
- GitHub repository: https://github.com/procload/dnd-mcp
- VS Code extensions: `Ctrl+Shift+X` → Search for updates
- MCP servers: `MCP: Browse Servers` for new community servers

## Resources

### Documentation Links

- [VS Code MCP Documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [D&D 5e API](https://www.dnd5eapi.co/)
- [GitHub MCP Server Registry](https://github.com/mcp)
- [MCP Server Repository](https://github.com/modelcontextprotocol/servers)

### Community

- [VS Code Discussions](https://github.com/microsoft/vscode/discussions)
- [MCP Community](https://github.com/orgs/modelcontextprotocol/discussions)
- [D&D 5e API GitHub](https://github.com/5e-bits/5e-database)

---

**Last Updated**: February 6, 2026  
**VS Code Version**: 1.109+  
**MCP Support**: Generally Available (v1.102+)
