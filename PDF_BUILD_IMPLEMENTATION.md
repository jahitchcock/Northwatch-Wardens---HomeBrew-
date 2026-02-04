# PDF Build System - Implementation Summary

## Overview

This implementation provides a complete solution for converting markdown files in the Northwatch Wardens repository into two professionally-formatted, Homebrewery-styled PDF books.

## What Was Implemented

### 1. Core Build System

**Files Created:**
- `build.js` - Node.js script that orchestrates the entire build process
- `build.sh` - Shell script wrapper for easy command-line usage
- `package.json` - npm configuration with dependencies

**Capabilities:**
- Reads structured TOC files (JSON format)
- Concatenates markdown files in logical order
- Processes Homebrewery special syntax
- Converts markdown → HTML → PDF
- Generates two separate books with different content

### 2. Content Organization

**Player's Guide TOC** (`build/players-guide-toc.json`):
- Welcome to Aevoria
- World of Aevoria (overview and master index)
- All 10 regions of the known world
- Northreach detailed information (setting, journal, cultures, places, people)
- Northwatch Wardens Charter
- Religion and Pantheon
- Notable Locations
- Campaign Overview (appendix)

**DM's Guide TOC** (`build/dms-guide-toc.json`):
- Using This Guide
- Campaign Overview
- DM Resources (session prep, trackers, rosters, campaign arc)
- All 7 Adventures:
  - Opening Adventures
  - Wolves of Welton
  - Frozen Sick
  - The Wild Sheep Chase
  - Peril in Pinebrook
  - Temple of the Dragonknights
- World Secrets (all DMEyesOnly content)

### 3. Homebrewery Styling

**Official Homebrewery PHB Stylesheet:**
The build system now uses the authentic, official PHB stylesheet from [naturalcrit/homebrewery](https://github.com/naturalcrit/homebrewery):
- File: `homebrewery-phb.css` (637KB with embedded fonts)
- Authentic D&D 5e Player's Handbook appearance
- Includes embedded Bookinsanity font data (base64-encoded)
- Two-column layout optimized for letter-size pages
- Authentic PHB colors (#EEE5CE parchment, #58180D headers, #C0AD6A borders)
- Professional typography and spacing
- Complete stat block formatting
- Monster stat blocks with optional frames
- Properly formatted tables
- Page break and column break support

**Supported Syntax:**
- `\page` - Page break
- `\column` - Column break
- `:` - Small vertical space
- `::` - Larger vertical space
- `{{note}}...{{}}` - Note/callout boxes
- `{{descriptive}}...{{}}` - Read-aloud text boxes
- `{{wide}}...{{}}` - Full-width content spanning columns
- `{{monster}}...{{}}` - Monster stat blocks

### 4. Documentation

**QUICKSTART.md** - Quick reference guide:
- Simple command examples
- Output file locations
- Content summaries
- Basic troubleshooting

**BUILD.md** - Comprehensive documentation:
- Prerequisites and setup
- Detailed usage instructions
- How the build system works
- Content organization explanation
- Customization guide
- Advanced usage
- Troubleshooting section
- File locations reference

**README.md updates**:
- Added "Building the PDFs" section
- Links to QUICKSTART and BUILD documentation
- Clear explanation of the two output books

### 5. CI/CD Integration

**GitHub Actions Workflow** (`.github/workflows/build-pdfs.yml`):
- Manual trigger always available (workflow_dispatch)
- Optional automatic triggers (commented out by default):
  - On push to main branch
  - On pull requests
- Builds both PDFs in the cloud
- Uploads PDFs as artifacts (30-day retention)
- No local Node.js installation needed when using Actions

### 6. Build Artifacts Configuration

**.gitignore updates**:
- Excludes `node_modules/`
- Excludes `package-lock.json`
- Excludes generated files in `build/`:
  - `*.md` (combined markdown)
  - `*.html` (intermediate HTML)
  - `*.pdf` (generated PDFs)
- Keeps TOC JSON files in version control

## Output Files

### Generated PDFs

**The-adventurers-guide-to-aevoria.pdf**
- Size: ~4.0 MB
- Content: ~8,700 lines of markdown
- Audience: Players
- Contains: World lore, regions, organizations, religion, locations

**A-DMs-guide-to-aevoria.pdf**
- Size: ~6.2 MB
- Content: ~14,400 lines of markdown
- Audience: Dungeon Masters
- Contains: Complete campaign, all adventures, DM resources, world secrets

### Intermediate Files

**Combined Markdown** (`.md`):
- Complete concatenated content
- Useful for debugging and review
- Includes all chapter markers

**Styled HTML** (`.html`):
- Markdown converted to HTML
- Homebrewery CSS applied
- Can be opened in browser for preview
- Useful for testing formatting

## Technical Details

### Dependencies

**puppeteer** (v22.0.0+):
- Headless Chrome browser automation
- Renders HTML to PDF with proper formatting
- Handles complex CSS layouts
- Supports embedded images

**marked** (v17.0.0+):
- Fast, modern markdown parser
- Extensible with custom renderers
- HTML output with proper structure
- Standard CommonMark compliant
- Better performance than markdown-it
- Active maintenance and support

**fs-extra** (v11.2.0+):
- Enhanced file system operations
- Promise-based API
- Directory creation helpers
- File existence checks

### Build Process Flow

1. **Read Configuration**
   - Load TOC JSON file
   - Parse book title and subtitle
   - Extract section and file lists

2. **Concatenate Content**
   - Add cover page with title
   - Generate table of contents
   - Process each section in order
   - Read and combine markdown files
   - Insert chapter markers
   - Add page breaks between sections

3. **Process Special Syntax**
   - Replace `\page` with page break divs
   - Replace `\column` with column break divs
   - Convert `{{note}}` blocks to styled divs
   - Convert `{{descriptive}}` blocks to styled divs
   - Handle spacing markers (`:`, `::`)

4. **Convert to HTML**
   - Parse markdown with markdown-it
   - Wrap in HTML document structure
   - Embed Homebrewery CSS
   - Add proper HTML headers

5. **Generate PDF**
   - Launch Puppeteer headless Chrome
   - Load HTML page
   - Wait for resources to load
   - Render to PDF with settings:
     - Letter size (8.5" × 11")
     - Print background colors/images
     - Proper margins (0.5" - 0.75")

### Performance

- **Build Time**: ~30-60 seconds for both PDFs
- **Memory Usage**: ~500 MB peak (Puppeteer Chrome)
- **Dependencies Install**: ~10 seconds (first time only)
- **Parallel Builds**: Not currently supported (sequential)

## Usage Examples

### Basic Usage

```bash
# Build both PDFs
./build.sh

# Build only player's guide
./build.sh --players

# Build only DM's guide
./build.sh --dms
```

### Using Node.js Directly

```bash
# Build both
node build.js

# Build specific guide
node build.js --players
node build.js --dms
```

### GitHub Actions

1. Go to repository Actions tab
2. Select "Build PDFs" workflow
3. Click "Run workflow"
4. Download PDFs from artifacts

### Programmatic Usage

```javascript
const { buildBook } = require('./build.js');

await buildBook('build/players-guide-toc.json', 'output-name');
```

## Customization

### Adding Content

Edit the TOC JSON file:
```json
{
  "chapter": "New Chapter",
  "files": [
    "../path/to/file1.md",
    "../path/to/file2.md"
  ]
}
```

### Changing Order

Rearrange sections in TOC JSON files - they will be processed in order.

### Styling Changes

Modify the `HOMEBREWERY_CSS` constant in `build.js`:
- Change fonts: `font-family` properties
- Change colors: color values like `#58180D`
- Change layout: `column-count`, `column-gap`
- Change page size: `@page { size: ... }`

### Adding Subsections

Use the subsections structure:
```json
{
  "chapter": "Adventures",
  "subsections": [
    {
      "title": "Subsection Name",
      "files": ["../file1.md", "../file2.md"]
    }
  ]
}
```

## Troubleshooting

### Common Issues and Solutions

**Issue**: "command not found: ./build.sh"
- **Solution**: Run `chmod +x build.sh`

**Issue**: "command not found: node"
- **Solution**: Install Node.js from nodejs.org

**Issue**: Puppeteer fails to launch Chrome
- **Solution**: Install system dependencies:
  ```bash
  sudo apt-get install -y libnss3 libxss1 libasound2 \
    libatk-bridge2.0-0 libgtk-3-0
  ```

**Issue**: "File not found" warnings
- **Solution**: Check file path in TOC JSON, ensure file exists

**Issue**: Images not appearing in PDF
- **Solution**: Ensure image paths are relative to markdown file

**Issue**: PDF formatting looks wrong
- **Solution**: Check markdown syntax, review HTML output

## Future Enhancements (Potential)

Possible improvements for future versions:

1. **Parallel Builds** - Build both PDFs simultaneously
2. **Watch Mode** - Rebuild automatically when files change
3. **Custom Themes** - Multiple CSS theme options
4. **Image Optimization** - Compress images before embedding
5. **TOC Generation** - Automatic table of contents with page numbers
6. **Index Generation** - Automatic index of terms, NPCs, locations
7. **Cross-References** - Automatic linking between sections
8. **Release Integration** - Automatic GitHub release creation
9. **Incremental Builds** - Only rebuild changed sections
10. **PDF Metadata** - Author, keywords, creation date

## Maintenance

### Updating Content

1. Edit markdown files as needed
2. Run `./build.sh` to regenerate PDFs
3. New PDFs reflect all changes

### Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all dependencies
npm update

# Update specific package
npm update puppeteer
```

### Testing Changes

1. Make changes to build.js or TOC files
2. Delete old PDFs: `rm build/*.pdf`
3. Run build: `./build.sh`
4. Verify output: Check PDF size and content

## Credits

**Build System**: Created as part of Northwatch Wardens repository

**Technologies Used**:
- Node.js - JavaScript runtime
- Puppeteer - Chrome automation
- markdown-it - Markdown parsing
- Homebrewery - D&D styling inspiration

**Repository**: Northwatch Wardens - HomeBrew
**Campaign**: Aevoria Setting, Season One

## License

See main repository README for license information.

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-03  
**Status**: ✅ Fully Functional
