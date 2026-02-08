# Build ↔ Unbuild Sync Workflow

This document explains how to work seamlessly between VS Code and Homebrewery using the bidirectional sync system.

## Overview

The build system now supports **bidirectional synchronization**:
- **Build** (`build.js`) — Compiles source `.md` files into a single Homebrewery-compatible `.txt` file
- **Unbuild** (`unbuild.js`) — Extracts changes from the `.txt` file back to source `.md` files

This allows you to:
- ✅ Edit in VS Code and build for Homebrewery
- ✅ Edit in Homebrewery UI and sync changes back to VS Code
- ✅ Collaborate using either environment

## How It Works

### File Markers

During build, invisible HTML comment markers are added to track which content came from which source file:

```markdown
<!-- FILE_START: ../World Building/Introduction/How_To_Use_This_Book.md -->
[... file content ...]
<!-- FILE_END: ../World Building/Introduction/How_To_Use_This_Book.md -->
```

These markers:
- Are invisible in Homebrewery's rendered output
- Allow `unbuild.js` to extract content back to the correct source files
- Persist through Homebrewery's download feature

## Workflows

### Workflow 1: VS Code → Homebrewery (Standard)

This is the normal workflow for editing in VS Code:

```bash
# 1. Edit your source .md files in VS Code
# 2. Build the complete guide
node build.js --players

# 3. Upload to Homebrewery
# Open homebrewery.naturalcrit.com
# Create new brew or open existing
# Copy/paste from: build/The-adventurers-guide-to-aevoria.txt

# 4. Preview and adjust in Homebrewery UI if needed
```

### Workflow 2: Homebrewery → VS Code (Reverse Sync)

Edit in Homebrewery and sync changes back:

```bash
# 1. Edit your brew in Homebrewery UI
# Make your changes using Homebrewery's live preview

# 2. Download the edited file
# In Homebrewery: Menu → Download → Markdown Source
# Save as: build/The-adventurers-guide-to-aevoria.txt
# (Overwrite the existing file)

# 3. Sync changes back to source files
node unbuild.js --players

# 4. Verify the changes (optional)
node build.js --players
```

### Workflow 3: Collaborative Editing

For teams working on the same content:

```bash
# Person A edits in VS Code:
node build.js --players
# Upload to Homebrewery, share link

# Person B edits in Homebrewery UI
# Downloads markdown source

# Person B syncs changes back:
# (Replace build/*.txt with downloaded file)
node unbuild.js --players

# Person B commits changes to git
git add "World Building"
git commit -m "Updated content from Homebrewery edits"
git push
```

## Commands Reference

### build.js

Compiles source files into Homebrewery-compatible output:

```bash
# Build player's guide
node build.js --players

# Build DM's guide
node build.js --dms

# Build both
node build.js --players --dms
```

**Output files:**
- `build/The-adventurers-guide-to-aevoria.md` — Combined markdown
- `build/The-adventurers-guide-to-aevoria.txt` — Homebrewery upload file (with markers)
- `build/The-adventurers-guide-to-aevoria.html` — HTML preview

### unbuild.js

Extracts content from compiled `.txt` back to source files:

```bash
# Sync player's guide changes
node unbuild.js --players

# Sync DM's guide changes
node unbuild.js --dms
```

**What it does:**
- Reads `build/*.txt` file
- Extracts content between `<!-- FILE_START -->` and `<!-- FILE_END -->` markers
- Writes content back to original `World Building/*.md` files
- Reports which files were updated vs unchanged

## Important Notes

### File Markers Are Invisible

The HTML comment markers don't appear in Homebrewery's rendered output:
- ✅ Safe to upload files with markers
- ✅ Markers survive download from Homebrewery
- ✅ Don't interfere with formatting or layout

### Front Matter Is Not Synced

The following sections are **generated during build** and won't sync back:
- Metadata block (`\`\`\`metadata`)
- CSS block
- Front cover
- Table of contents

These are controlled by:
- `build/players-guide-toc.json`
- `build/dms-guide-toc.json`

### Page Footers Are Auto-Generated

Page footers are managed by `add_page_footers.py`:
- Run automatically during build
- Format: `{{pageNumber,auto}}` and `{{footnote CHAPTER_NAME}}`
- Changes to footers should be made via the Python script settings

### When to Sync

**Use `unbuild.js` when:**
- You edited directly in Homebrewery UI
- Someone shared Homebrewery changes
- You want to bring Homebrewery edits back to source control

**Don't use `unbuild.js` when:**
- All editing was done in VS Code (just rebuild normally)
- You only changed metadata/CSS/cover (edit TOC JSON instead)

## Troubleshooting

### "No file markers found in compiled file"

The `.txt` file is from an old build without markers.

**Solution:**
```bash
node build.js --players  # Rebuild with markers
```

### "Source file not found"

A file in the compiled output doesn't exist in your workspace.

**Possible causes:**
- The TOC JSON was changed after building
- File was renamed or moved
- Working with someone else's build

**Solution:** Ensure your workspace structure matches the compiled file's structure.

### Changes Aren't Syncing

If `unbuild.js` reports files as "unchanged" but you made edits:

**Check:**
1. Did you download the latest .txt from Homebrewery?
2. Did you replace the correct file in `build/`?
3. Are the HTML markers still present in the file?

### Content Looks Different After Sync

The unbuild process extracts **raw markdown**, not rendered output.

**Remember:**
- Homebrewery directives ({{note}}, etc.) are preserved
- Formatting uses Homebrewery's markdown extensions
- Visual differences in Homebrewery UI won't affect extracted content

## Best Practices

### 1. Build Before Unbuild

Always rebuild after unbuilding to verify changes:

```bash
node unbuild.js --players
node build.js --players
# Check that output looks correct
```

### 2. Commit Before Major Syncs

Before running `unbuild.js` that will overwrite many files:

```bash
git status                # Check for uncommitted work
git add .
git commit -m "Pre-sync checkpoint"
node unbuild.js --players
```

### 3. Use Version Control

The sync system works best with git:
- Commit before syncing from Homebrewery
- Review diffs after unbuild
- Revert if something goes wrong

### 4. Test Sync on Small Changes

When first using the system:
1. Make a small edit in Homebrewery
2. Download and sync back
3. Verify the change appears in source files
4. Build and re-upload to confirm round-trip

## Example: Complete Round-Trip

Here's a full example of editing in both environments:

```bash
# Start in VS Code
# Edit: World Building/Introduction/How_To_Use_This_Book.md
# Add: "This is a test change from VS Code"

# Build and upload
node build.js --players
# Upload build/The-adventurers-guide-to-aevoria.txt to Homebrewery

# Now edit in Homebrewery UI
# Go to same section, add: "This is a test change from Homebrewery"

# Download from Homebrewery
# Menu → Download → Markdown Source
# Save as: build/The-adventurers-guide-to-aevoria.txt

# Sync back
node unbuild.js --players
# ✓ World Building/Introduction/How_To_Use_This_Book.md (updated)

# Verify both changes are present
cat "World Building/Introduction/How_To_Use_This_Book.md"
# Should show both:
# - "This is a test change from VS Code"
# - "This is a test change from Homebrewery"

# Rebuild to verify
node build.js --players
```

## FAQ

**Q: Do the HTML markers affect Homebrewery rendering?**  
A: No, HTML comments are ignored by Homebrewery's markdown renderer.

**Q: Can I edit the .txt file directly?**  
A: Yes! You can edit `build/*.txt` in any text editor, then sync back with `unbuild.js`.

**Q: What happens if I delete the markers accidentally?**  
A: Run `node build.js --players` to regenerate the file with markers.

**Q: Can I sync only specific files?**  
A: Not currently. `unbuild.js` syncs all files found in the compiled output. For selective edits, edit source files directly.

**Q: Does this work with custom file structures?**  
A: Yes, as long as the file paths in TOC JSON match your actual structure. The markers use relative paths from the build directory.

**Q: What if two people edit the same section simultaneously?**  
A: Use normal git merge conflict resolution. The unbuild system doesn't handle concurrent edits—use version control for that.

---

## Summary

**Simple workflow:**
1. Edit in VS Code → `node build.js --players` → Upload to Homebrewery ✅
2. Edit in Homebrewery → Download → `node unbuild.js --players` → Sync back ✅

The file markers make this bidirectional sync possible while remaining invisible to end users.
