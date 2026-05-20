# Homebrewery Knowledge Update Log

## 2026-04-17 — Homebrewery V3 Guide Update (v1.2)

Reviewed The Homebrewery (https://homebrewery.naturalcrit.com/) and GitHub releases
(https://github.com/naturalcrit/homebrewery/releases) and updated
`.github/HOMEBREWERY_V3_GUIDE.md` with comprehensive coverage of all new features
from V3.12.0 through V3.21.0.

### Changes Made

**File:** `.github/HOMEBREWERY_V3_GUIDE.md`

1. **Version header** — Updated to list features from V3.12.0 through V3.21.0, including:
   - V3.21.0: Custom snippets mid-line, Firefox column fix, Vite backend refactor, public domain art
   - V3.20.0: License snippets, View Modes, snippet bar wrapping, local backups
   - V3.16.0: A3/A5/Card page sizes, page number skip/restart, ToC control, sync views
   - V3.15.0: Vault feature, image wrap snippets
   - V3.14.0: Brew Themes, Blank theme
   - V3.14.1: Variable math functions (abs, sign, signed, max/min fixes)
   - V3.13.0: Emoji autosuggest, DiceFont icons, GET PDF dialog
   - V3.12.0: Multiline definition lists, "Darkvision" editor theme

2. **New sections added:**
   - `Page Sizes & Print Options (V3.16.0+)` — A3, A5, Card sizes
   - `Page Number Control` — skip and restart snippets
   - `ToC Include/Exclude Control` — `--TOC:exclude`/`--TOC:include` CSS properties
   - `Brew Themes` — importing brews as CSS themes
   - `Sync Views` — locked panel scrolling
   - `Local Auto-Backups` — 5-snapshot history system
   - `View Modes` — Single / Facing Pages / Flow
   - `License Snippets` — pre-built attribution templates
   - `Custom Snippets Mid-Line` — inline snippet support
   - `Public Domain Art` — guidance on image sourcing
   - `Variable Math Functions` — abs/sign/max/min functions
   - `Editor Themes & Keyboard Shortcuts` — Darkvision theme, panel jump hotkeys
   - `Brew Metadata API` — `/metadata/:shareId` endpoint

3. **Updated sections:**
   - Dice Icons — added D100 from V3.20.1
   - Emoji — expanded to cover V3.13.0 autosuggest and icon library prefixes
   - Quick Reference table — added 14 new entries for new features
   - Resources section — fixed changelog URL to V3.21.0, added releases page
   - File History — added v1.2 entry

### Verification

Build completed successfully:
- `./build.sh` — both guides built without errors
- Player's Guide: 235 pages, 209 waterstains
- DM's Guide: 401 pages, 347 waterstains
- HTML output generated for both guides

Pre-existing warnings (Frozen Sick / Wild Sheep Chase missing files) are unrelated to this update.

### Blockers

Paperclip API mutations (PATCH/POST on issues) returning 500 Internal Server Error.
Task AEV-23 status could not be updated. Build completed; task requires manual status update.
