# Dungeons & Markdown Syntax Highlighting Guide

## ✅ Configuration Complete!

Your Dungeons & Markdown extension is now properly configured with custom syntax highlighting colors.

## What Gets Highlighted

The extension highlights these Homebrewery-specific syntax elements:

### 1. Page Breaks
- **Syntax**: `\page`
- **Color**: Blue (bold)
- **Use**: Inserts a page break in the document

### 2. Column Breaks
- **Syntax**: `\column`
- **Color**: Blue (bold)
- **Use**: Splits content into columns

### 3. Colon Dividers
- **Syntax**: `:::`
- **Color**: Blue (bold)
- **Use**: Creates horizontal dividers

### 4. Block Containers (Double Curly Braces)
- **Syntax**: `{{blocktype` and `}}`
- **Color**: Red (bold)
- **Examples**:
  - `{{wide` - Wide content block
  - `{{descriptive` - Descriptive text box
  - `{{note` - Note box
  - `{{classTable` - Class feature table
  - `}}` - Closes any block

### 5. Inline Styles (Single Curly Braces)
- **Syntax**: `{text}`
- **Color**: Purple (italic)
- **Use**: Inline styling (though Homebrewery typically uses double braces)

### 6. Links
- **Link Text**: Blue
- **Link URL**: Green
- **Example**: `[Display Text](url)` - Text is blue, URL in parentheses is green

## Color Scheme

| Element | Scope | Color | Style |
|---------|-------|-------|-------|
| `\page`, `\column`, `:::` | `keyword.control` | Blue (#0066CC) | Bold |
| `{{...}}` blocks | `constant.character.set.regexp` | Red (#D73A4A) | Bold |
| `{...}` inline | `support.type` | Purple (#6F42C1) | Italic |
| Link text | `variable.other.constant` | Blue (#005CC5) | Normal |
| Link URL | `entity.name.function` | Green (#22863A) | Normal |

## Troubleshooting

### Syntax Highlighting Not Showing?

1. **Reload VS Code Window**:
   - Press `Ctrl+Shift+P`
   - Type: `Developer: Reload Window`
   - Press Enter

2. **Check File Language Mode**:
   - Look at bottom-right corner of VS Code
   - Should say "Markdown"
   - If not, click it and select "Markdown"

3. **Verify Extension is Active**:
   - Press `Ctrl+Shift+P`
   - Type: `Extensions: Show Installed Extensions`
   - Search for "Dungeons & Markdown"
   - Ensure it's enabled

4. **Check Theme Compatibility**:
   - Some dark themes may make colors hard to see
   - Try switching themes: `Ctrl+K Ctrl+T`
   - Recommended: "Dark+ (default dark)" or "Light+ (default light)"

### Colors Don't Match Expectations?

The colors are defined in `.vscode/settings.json` under `editor.tokenColorCustomizations`. You can customize them:

```json
"editor.tokenColorCustomizations": {
  "textMateRules": [
    {
      "scope": "keyword.control",
      "settings": {
        "foreground": "#YOUR_COLOR_HERE",
        "fontStyle": "bold"
      }
    }
  ]
}
```

### Extension Commands Not Working?

Try these commands from the Command Palette (`Ctrl+Shift+P`):

- `Dungeons & Markdown: Preview` - Opens preview of current file
- `Dungeons & Markdown: Generate HTML` - Generates HTML output

## Example Syntax

Here's an example showing what should be highlighted:

```markdown
# My D&D Adventure

{{wide
## Chapter One
This is a wide block that spans the full page.
}}

Some regular paragraph text here.

\column

{{descriptive
##### Descriptive Box
This creates a decorative text box.
}}

{{note
**Note**: This is important information!
}}

\page

:::
The colon divider creates a horizontal line.

Check out this [link to D&D Beyond](https://www.dndbeyond.com)!
```

In this example:
- `\column` and `\page` should be **blue and bold**
- `{{wide`, `{{descriptive`, `{{note`, `}}` should be **red and bold**
- `:::` should be **blue and bold**
- `[link to D&D Beyond]` should be **blue**
- `(https://www.dndbeyond.com)` should be **green**

## Additional Resources

- **Extension Homepage**: https://dungeonsandmarkdown.spjak.com
- **GitHub Repository**: https://github.com/Spjak/DungeonsAndMarkdown
- **Homebrewery Reference**: https://homebrewery.naturalcrit.com/

## Settings Location

Your syntax highlighting configuration is stored in:
`.vscode/settings.json`

---

**Configuration updated**: February 6, 2026
