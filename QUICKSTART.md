# Quick Reference: Building PDFs

## Simple Commands

```bash
# Build both PDFs
./build.sh

# Build only player's guide
./build.sh --players

# Build only DM's guide
./build.sh --dms
```

## Output Files

After running the build, find your PDFs in the `build/` directory:
- `The-adventurers-guide-to-aevoria.pdf` (Player-facing content)
- `A-DMs-guide-to-aevoria.pdf` (DM content)

## First Time Setup

The first time you run `./build.sh`, it will automatically install dependencies (Node.js packages). This only needs to happen once.

## What Gets Included?

### Player's Guide Contains:
- Welcome to Aevoria
- World overview and all regions
- Northreach setting details
- Northwatch Wardens charter
- Character creation guide for new players
- Religion and pantheon
- Notable locations
- Campaign overview

### DM's Guide Contains:
- All campaign materials
- Session prep and DM resources
- All 7 adventures:
  - Opening Adventures
  - Wolves of Welton
  - Frozen Sick
  - The Wild Sheep Chase
  - Peril in Pinebrook
  - Temple of the Dragonknights
- Complete NPC rosters
- World secrets (DMEyesOnly content)
- Campaign arc and mystery

## Customizing Content

To add, remove, or reorder content, edit the JSON files:
- `build/players-guide-toc.json` - Player's guide structure
- `build/dms-guide-toc.json` - DM's guide structure

See [BUILD.md](BUILD.md) for detailed instructions.

## Troubleshooting

**Problem**: `command not found: ./build.sh`
**Solution**: Make the script executable: `chmod +x build.sh`

**Problem**: `command not found: node`
**Solution**: Install Node.js from nodejs.org or via your package manager

**Problem**: "File not found" warnings during build
**Solution**: The file is referenced in a TOC JSON but doesn't exist. Either add the file or remove it from the TOC.

For more help, see [BUILD.md](BUILD.md).
