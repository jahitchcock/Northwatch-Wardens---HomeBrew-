# Building the Northwatch Wardens PDFs

This document explains how to build the two PDF books from the markdown content in this repository:

1. **The Adventurer's Guide to Aevoria** - Player-facing materials
2. **A DM's Guide to Aevoria** - DM-facing materials, campaigns, and adventures

## Prerequisites

You need Node.js and npm installed on your system:
- Node.js version 16 or higher
- npm (comes with Node.js)

Check if you have them installed:
```bash
node --version
npm --version
```

## Quick Start

### Build Both Books

```bash
./build.sh
```

This will generate both PDF files in the `build/` directory.

### Build Only the Player's Guide

```bash
./build.sh --players
```

### Build Only the DM's Guide

```bash
./build.sh --dms
```

## First-Time Setup

The first time you run the build script, it will automatically install the required dependencies:
- `puppeteer` - For PDF generation
- `marked` - Markdown parsing engine (matching Homebrewery version 15.0.12)
- `marked-*` extensions - All official Homebrewery markdown extensions
- `lodash` - Utility functions
- `fs-extra` - File operations

This installation only needs to happen once.

## What's New: Authentic Homebrewery Rendering

The build system now uses **authentic Homebrewery markdown rendering** with the official extensions from [naturalcrit/homebrewery](https://github.com/naturalcrit/homebrewery). This ensures your content is rendered exactly as it would appear on the Homebrewery website.

### Supported Features

**Mustache Syntax** (for blocks and inline styles):
- `{{note}}...{{}}` - Note/callout boxes
- `{{descriptive}}...{{}}` - Read-aloud text boxes  
- `{{wide}}...{{}}` - Full-width content spanning columns
- `{{monster}}...{{}}` - Monster stat blocks
- `{{monster,frame}}...{{}}` - Monster stat blocks with frame styling
- Inline styling with `{{class1,class2}}text{{}}` 
- Block styling with attributes and CSS properties

**Page Layout**:
- `\page` - Page break
- `\column` - Column break
- `:` - Small vertical space
- `::` - Larger vertical space

**Markdown Extensions**:
- Extended tables with custom formatting
- Definition lists
- Aligned paragraphs
- Non-breaking spaces
- Superscript and subscript text
- Variables and page numbers
- Smart typography (smart quotes, em dashes, etc.)
- GitHub-style heading IDs
- Emoji support

## Output Files

After building, you'll find the following files in the `build/` directory:

### PDF Files (Final Output)
- `The-adventurers-guide-to-aevoria.pdf` - Player's guide
- `A-DMs-guide-to-aevoria.pdf` - DM's guide

### Intermediate Files
- `The-adventurers-guide-to-aevoria.md` - Combined markdown
- `The-adventurers-guide-to-aevoria.html` - Styled HTML
- `A-DMs-guide-to-aevoria.md` - Combined markdown
- `A-DMs-guide-to-aevoria.html` - Styled HTML

## How It Works

### 1. Table of Contents Files

The build system uses JSON configuration files to define the structure of each book:

- `build/players-guide-toc.json` - Defines chapters and files for the player's guide
- `build/dms-guide-toc.json` - Defines chapters and files for the DM's guide

### 2. Content Organization

#### Player's Guide Structure:
1. Welcome to Aevoria
2. Northreach: Your Starting Point
3. The Northwatch Wardens
4. Creating Your Warden (Character Creation Guide)
5. The Wider World of Aevoria
6. Gods and Religion
7. Places of Legend
8. Appendix

#### DM's Guide Structure:
1. Using This Guide
2. Campaign Overview
3. DM Resources
4. Adventures
   - Opening Adventures
   - Wolves of Welton
   - Frozen Sick
   - The Wild Sheep Chase
   - Peril in Pinebrook
   - Temple of the Dragonknights
5. World Secrets

### 3. Build Process

The build script (`build.js`) performs the following steps:

1. **Update page footers** - Runs `add_page_footers.py` to ensure all `\page` breaks have proper page numbers and section footnotes
2. **Read TOC files** - Loads the JSON configuration for each book
3. **Concatenate markdown** - Combines all markdown files in the specified order
4. **Render with Homebrewery** - Uses authentic Homebrewery markdown processor with all official extensions:
   - Mustache syntax for blocks and spans ({{note}}, {{monster}}, etc.)
   - Column and page breaks
   - Extended tables, definition lists, aligned paragraphs
   - Smart typography, superscript/subscript
   - Variables and heading IDs
5. **Generate HTML** - Converts markdown to HTML with D&D-themed styling
6. **Create PDF** - Uses Puppeteer to render HTML to PDF with proper formatting

### 4. Homebrewery Rendering Engine

The build system uses `homebrewery-renderer.js`, which is adapted from the official [naturalcrit/homebrewery](https://github.com/naturalcrit/homebrewery) markdown processor. This ensures 100% compatibility with Homebrewery syntax.

**Key Components**:
- **Custom Renderer**: Handles HTML blocks, paragraphs, links, and images
- **Custom Tokenizer**: Disables conflicting features
- **Mustache Extensions**: Processes {{block}} and {{inline}} syntax
- **Marked Extensions**: All official Homebrewery extensions included

### 5. Homebrewery Styling

The build system uses the **official Homebrewery PHB stylesheet** from the [naturalcrit/homebrewery](https://github.com/naturalcrit/homebrewery) project, providing authentic D&D 5e Player's Handbook styling:
- Two-column layout with authentic PHB formatting
- D&D-style fonts including Bookinsanity (with embedded font data)
- Authentic PHB colors and parchment background
- Proper page breaks and column breaks
- Styled note boxes and descriptive text
- Table formatting matching the PHB
- Stat block styling
- Monster stat blocks with frames

The stylesheet (`homebrewery-phb.css`) is included in the repository. If it's missing, the build system will automatically download it from the official Homebrewery repository.

### 6. Page Footer System

The build system includes an automated page footer generator (`add_page_footers.py`) that runs before each build. This script:

**What It Does:**
- Scans all markdown files in `World Building/` (excluding `DMEyesOnly/`)
- Finds every `\page` break
- Adds page numbers and section footers before each break
- Updates existing footers if section headings change

**Footer Format:**
```markdown
{{pageNumber,auto}}
{{footnote SECTION NAME}}

\page
```

**How It Works:**
1. Tracks the last `# heading` (level 1) in each file
2. Converts heading text to uppercase (e.g., "Creating Your Character" → "CREATING YOUR CHARACTER")
3. Inserts or updates footer before each `\page` break
4. Preserves formatting and removes any old/placeholder footers

**Benefits:**
- Consistent page numbers across the entire guide
- Section names automatically match headings
- Reduces manual maintenance when reorganizing content
- Idempotent - safe to run multiple times

**Manual Usage:**
```bash
python add_page_footers.py
```

The script runs automatically as part of the build pipeline, so you typically don't need to run it manually.

### 7. Special Syntax Support

The following Homebrewery syntax is fully supported through the authentic renderer:

**Layout Control**:
- `\page` - Page break
- `\column` - Column break
- `:` - Small vertical space (blank div)
- `::` - Larger vertical space (two blank divs)

**Block Styles** (mustache divs):
- `{{note}}...{{}}` - Note/callout boxes
- `{{descriptive}}...{{}}` - Read-aloud text boxes
- `{{wide}}...{{}}` - Full-width content (spanning columns)
- `{{monster}}...{{}}` - Monster stat blocks
- `{{monster,frame}}...{{}}` - Monster with custom frame class

**Inline Styles** (mustache spans):
- `{{class1,class2}}text{{}}` - Apply classes to inline text
- `{{#id,class}}text{{}}` - Apply ID and class
- `{{width:100%}}text{{}}` - Apply CSS properties

**Advanced Features**:
- Extended tables with colspan/rowspan
- Definition lists
- Aligned paragraphs (left, center, right, justify)
- Smart quotes and typography
- Superscript `^text^` and subscript `~text~`
- Non-breaking spaces
- GitHub-style heading IDs
- Variable substitution

## Customizing the Build

### Adding or Removing Content

Edit the appropriate TOC file:
- `build/players-guide-toc.json` for the player's guide
- `build/dms-guide-toc.json` for the DM's guide

The JSON structure is:
```json
{
  "title": "Book Title",
  "subtitle": "Book Subtitle",
  "sections": [
    {
      "chapter": "Chapter Name",
      "files": [
        "../path/to/file.md"
      ]
    }
  ]
}
```

### Changing the Order

Simply rearrange the sections and files in the TOC JSON files.

### Modifying Styling

The official Homebrewery PHB stylesheet is loaded from `homebrewery-phb.css`. This file contains the authentic Player's Handbook styling from [naturalcrit/homebrewery](https://github.com/naturalcrit/homebrewery).

If you need to add custom styles without modifying the official stylesheet:
1. Edit the `additionalCss` section in `build.js`
2. Add your custom CSS rules there
3. These will be applied after the official Homebrewery styles

**Note**: Modifying the official `homebrewery-phb.css` directly is not recommended, as it will be overwritten if the build system re-downloads it.

## Troubleshooting

### Build Fails with "command not found"

Make sure you have Node.js installed:
```bash
# On Ubuntu/Debian
sudo apt-get install nodejs npm

# On macOS (with Homebrew)
brew install node

# On Windows
# Download installer from nodejs.org
```

### PDF Generation Fails

Puppeteer requires certain system libraries. On Linux:
```bash
# Ubuntu/Debian
sudo apt-get install -y \
  libnss3 \
  libxss1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libgtk-3-0
```

### File Not Found Warnings

If you see warnings like "Warning: File not found:", check:
1. The file path in the TOC JSON file is correct
2. The file actually exists in the repository
3. The path is relative to the `build/` directory

### Missing Images

Images are embedded by reference. Make sure:
1. Image paths in markdown are relative to the markdown file location
2. Images exist in the repository
3. Image formats are web-compatible (PNG, JPG, SVG)

## Advanced Usage

### Direct Node.js Usage

You can also run the build script directly with Node:

```bash
# Build both
node build.js

# Build only player's guide
node build.js --players

# Build only DM's guide
node build.js --dms
```

### Programmatic Usage

You can import the build function in your own Node.js scripts:

```javascript
const { buildBook } = require('./build.js');

await buildBook('build/players-guide-toc.json', 'custom-output-name');
```

## Maintenance

### Updating Content

When you update markdown files in the repository:
1. Make your changes to the markdown files
2. Run the build script again
3. New PDFs will be generated with your updates

### Keeping Dependencies Updated

Periodically update npm dependencies:
```bash
npm update
```

Check for outdated packages:
```bash
npm outdated
```

## GitHub Actions (Optional)

An optional GitHub Actions workflow is provided at `.github/workflows/build-pdfs.yml` that can automatically build the PDFs in the cloud.

### Manual Trigger

By default, the workflow can be triggered manually:
1. Go to the "Actions" tab in your GitHub repository
2. Select "Build PDFs" workflow
3. Click "Run workflow"
4. Download the generated PDFs from the artifacts

### Automatic Triggers

To enable automatic builds, edit `.github/workflows/build-pdfs.yml` and uncomment the triggers:
- `push: branches: [ main ]` - Build on every push to main
- `pull_request: branches: [ main ]` - Build on pull requests

The PDFs will be available as downloadable artifacts in the Actions tab for 30 days.

## File Locations

```
/
├── build.sh                          # Main build script
├── build.js                          # Node.js build implementation
├── package.json                      # npm configuration
├── BUILD.md                          # This file
├── build/                            # Build directory
│   ├── players-guide-toc.json       # Player's guide structure
│   ├── dms-guide-toc.json           # DM's guide structure
│   ├── *.pdf                        # Generated PDFs
│   ├── *.html                       # Intermediate HTML
│   └── *.md                         # Combined markdown
└── [content directories...]          # Source markdown files
```

## Support

For issues or questions:
1. Check this documentation
2. Review the TOC JSON files for structure
3. Check the console output for specific error messages
4. Review the intermediate HTML files to debug formatting issues

## License

The build system code is part of the Northwatch Wardens repository. See the main README for license information.
