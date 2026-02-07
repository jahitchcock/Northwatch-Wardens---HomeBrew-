# D&D MCP Server Setup for VS Code

## Overview

The D&D Knowledge Navigator MCP server provides access to D&D 5e API data including:
- Spells
- Monsters
- Equipment
- Classes
- Races
- And more!

## Setup Status

✅ **COMPLETE** - The MCP server is now configured for use in VS Code

## Configuration Details

### Location
- **Repository**: `C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp`
- **Virtual Environment**: `.venv` (Python 3.12.6)
- **MCP Config**: `.vscode\mcp.json` (in this workspace)

### Server Configuration

The MCP server is configured as follows in `.vscode\mcp.json`:

```json
{
  "servers": {
    "dnd": {
      "type": "stdio",
      "command": "C:\\Users\\joshu\\OneDrive\\Documents\\dnd\\_AITools\\dnd-mcp\\.venv\\Scripts\\python.exe",
      "args": [
        "C:\\Users\\joshu\\OneDrive\\Documents\\dnd\\_AITools\\dnd_mcp_wrapper.py"
      ],
      "description": "D&D Knowledge Navigator - Provides access to D&D 5e API data"
    }
  }
}
```

## How to Use

### 1. Enable MCP Servers in VS Code

The MCP server should automatically be discovered by VS Code when you open this workspace.

### 2. Start the Server

When you first use the server, VS Code will prompt you to trust it. Click "Trust" to allow the server to run.

### 3. Access MCP Tools in Chat

1. Open the Chat view (Ctrl+Alt+I or Cmd+Alt+I)
2. Click the Tools button to see available MCP tools
3. Enable the "dnd" server tools you want to use

### 4. Available Tools

The D&D Knowledge Navigator provides these tools:
- `search_all_categories` - Search across all D&D resources
- `verify_with_api` - Verify D&D statements against official API data
- `check_api_health` - Check the health of the D&D 5e API

### 5. Use MCP Resources

You can also add D&D resources as context:
1. In Chat, select "Add Context" > "MCP Resources"
2. Select a resource from the D&D server
3. The resource data will be added to your chat context

## Troubleshooting

### Server Not Starting

If the server doesn't start:

1. **Check Python Environment**:
   ```powershell
   cd "C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp"
   .\.venv\Scripts\python.exe --version
   ```
   Should show: Python 3.12.6

2. **Verify Package Installation**:
   ```powershell
   cd "C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp"
   .\.venv\Scripts\pip.exe list | Select-String "dnd-mcp|mcp"
   ```
   Should show: dnd-mcp and mcp packages

3. **Check Server Logs**:
   - In VS Code, run: `MCP: List Servers` from Command Palette
   - Select the "dnd" server
   - Choose "Show Output" to view logs

4. **Reset MCP Cache**:
   - Run: `MCP: Reset Cached Tools` from Command Palette

### Permission/Trust Issues

If VS Code asks you to trust the server:
- Review the server configuration in `mcp.json`
- Click "Trust" if you're comfortable with the configuration
- The server runs local Python code from the specified directory

### Server Not Showing Tools

If the server starts but no tools appear:
1. Open Chat view (Ctrl+Alt+I)
2. Click the Tools button (gear icon)
3. Expand the "dnd" server to see available tools
4. Enable the tools you want to use

## Verification

To verify the setup is working:

1. Open VS Code Chat (Ctrl+Alt+I)
2. Type: "What D&D tools do I have available?"
3. The assistant should list the dnd server tools
4. Try: "Search for fireball spell" (using the search_all_categories tool)

## Repository Information

- **Original Repository**: https://github.com/procload/dnd-mcp
- **Cloned Location**: `C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp`
- **Documentation**: See `docs/` folder in the repository for detailed usage guides

## Additional Resources

- [VS Code MCP Documentation](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [D&D 5e API](https://www.dnd5eapi.co/)

## Maintenance

### Updating the Server

To update the D&D MCP server:

```powershell
cd "C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp"
git pull origin main
.\.venv\Scripts\pip.exe install -e . --upgrade
```

Then restart VS Code or run `MCP: Restart Server` from Command Palette.

### Reinstalling Dependencies

If you encounter package issues:

```powershell
cd "C:\Users\joshu\OneDrive\Documents\dnd\_AITools\dnd-mcp"
.\.venv\Scripts\pip.exe install -r requirements.txt --force-reinstall
.\.venv\Scripts\pip.exe install -e .
```

---

**Setup completed**: February 6, 2026
**VS Code Version**: 1.109+
**MCP Support**: Generally Available (v1.102+)
