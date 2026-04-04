Validate Game Master 5e XML files in the Northwatch Wardens campaign.

Steps:

1. **Find all XML files** in the repository (primarily `LionsdenGameFiles/`).

2. **For each XML file, check:**

   **Structure:**
   - Root element is `<data version="5">` (NOT `<compendium>`)
   - Campaign uses `<campaign>` as direct child of `<data>`
   - Adventures nest as: `<adventure> → <encounter> → <combatant> → <monster>`
   - All `<imageData>` blocks contain `<uniqueID>`

   **Required fields** on every `<npc>` and monster:
   - `<uid>`, `<label>`, `<ac>`, `<hpMax>`, `<abilities>` (6 comma-separated values), `<cr>`
   - All `<action>` blocks with attacks must have both `<atk>` AND `<dmg>` inside `<attack>`

   **UID uniqueness:**
   - Extract all `<uid>` values across the file and report any duplicates

   **CDATA usage:**
   - Flag any `<text>` fields longer than one line that are NOT wrapped in `<![CDATA[...]]>`

3. **Report findings as a table:**

   | Check | Status | Details |
   |-------|--------|---------|
   | Root element | ✅/❌ | ... |
   | Encounter nesting | ✅/❌ | ... |
   | Missing required fields | ✅/❌ | List affected elements |
   | Duplicate UIDs | ✅/❌ | List duplicates |
   | Incomplete attack blocks | ✅/❌ | List affected actions |
   | CDATA on long text | ✅/❌ | List affected elements |

4. **If issues found**, offer to fix them automatically. For duplicate UIDs, suggest new unique values. Do not auto-fix without user confirmation.
