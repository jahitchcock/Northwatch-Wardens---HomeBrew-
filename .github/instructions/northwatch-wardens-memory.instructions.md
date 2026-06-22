---
description: Northwatch Wardens DM Panel — project-specific patterns, gotchas, and conventions
applyTo: "{web/**/*,timeline/**/*,adventures/**/*,_print/**/*}"
---

# Northwatch Wardens Memory

DM Panel web app and campaign file conventions.

## Session Log File Naming Convention

The DM Panel's session tracker API (`/api/tracker/sessions`) uses a strict regex to filter files in `timeline/sessions/`:

```js
.filter(f => /^session-\d+\.md$/.test(f))
```

**Only** files named exactly `session-001.md`, `session-002.md`, etc. are recognized and displayed in the tracker UI.

- **Correct:** `session-002.md`
- **Incorrect:** `Session_2026-05-26_The_Awakened_Fawn.md` (completely ignored by the server)

### Required Frontmatter

Session files must include these frontmatter fields:

```yaml
---
session: 2
date: 2026-05-26
adventure: The Awakened Fawn
level: 3
---
```

### Key Lesson

When creating session logs manually, always use the `session-NNN.md` naming pattern. The frontmatter can contain the full date and adventure name, but the filename must match the server's regex or the session will be invisible in the tracker.
