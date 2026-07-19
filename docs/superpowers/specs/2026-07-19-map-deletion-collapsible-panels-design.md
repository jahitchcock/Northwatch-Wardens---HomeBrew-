# Design: Map Deletion + Collapsible Left Panel Sections

**Date:** 2026-07-19  
**Status:** Approved  
**Scope:** DM Panel web UI — left sidebar enhancements

## Overview

Enhance the DM Panel's left sidebar with two complementary features:
1. **Map Deletion:** Multi-select delete for maps (any source) with 30-day trash recovery
2. **Collapsible Sections:** Independently collapse Files and Maps sections to maximize screen real estate

## Feature 1: Map Deletion

### Selection & UI

Maps can be selected via:
- **Checkboxes:** Overlay checkboxes on each thumbnail (visible on hover, always visible when ≥1 map selected)
- **Ctrl+Click:** Hold Ctrl and click to toggle individual maps
- **Checkbox click:** Click checkbox directly to toggle

### Visual Feedback

- Selected maps show highlighted border or background tint
- Checkboxes become visible across the entire gallery when any map is selected
- Selection persists as user scrolls or filters

### Action Bar

A floating action bar appears at the bottom of the Maps section when ≥1 map is selected:

```
┌─────────────────────────────────────┐
│ 3 maps selected  [Select All] [Clear] [Delete ⚠️] │
└─────────────────────────────────────┘
```

- **Counter:** "N maps selected"
- **Select All:** Selects all visible maps in current filtered view
- **Clear:** Deselects all
- **Delete:** Triggers confirmation modal (styled as warning/danger)

### Confirmation Modal

Modal appears on delete click:

```
┌────────────────────────────────────┐
│  Delete 3 maps?                    │
│                                    │
│  These will be moved to trash and  │
│  auto-deleted after 30 days.       │
│                                    │
│  ┌──────────────────────────────┐  │
│  │ [thumb] dragon-lair.png      │  │
│  │ [thumb] tavern-scene.webp    │  │
│  │ [thumb] cave-entrance.jpg    │  │
│  │ ... (scrollable list)        │  │
│  └──────────────────────────────┘  │
│                                    │
│  [Cancel]               [Delete ⚠️] │
└────────────────────────────────────┘
```

- Lists each map with thumbnail (small, 40-50px) and filename
- Scrollable if many maps selected
- Cancel and Delete buttons

### Trash & Recovery

**Trash Directory:**
```
web/data/trash/
├── {filename}.png         (moved map file)
├── {filename}.jpg
├── trash-manifest.json    (metadata)
```

**Trash Manifest Format:**
```json
{
  "dragon-lair.png": {
    "filename": "dragon-lair.png",
    "original_path": "/maps-output/dragon-lair.png",
    "trashed_at": 1721410800000,
    "source": "generated"
  },
  "tavern-scene.webp": {
    "filename": "tavern-scene.webp",
    "original_path": "/maps-library/tavern-scene.webp",
    "trashed_at": 1721410800000,
    "source": "library"
  }
}
```

**30-Day Auto-Cleanup:**
- Daily cron job (runs at 3 AM server time, or on startup if missed)
- Checks trash-manifest.json for entries >30 days old
- Deletes files and removes from manifest
- Non-fatal; logs errors to console, continues with other files

### Delete API Endpoint

**POST /api/maps/delete**

Request:
```json
{
  "filenames": ["dragon-lair.png", "tavern-scene.webp"]
}
```

Response (success):
```json
{
  "deleted": ["dragon-lair.png", "tavern-scene.webp"],
  "errors": {}
}
```

Response (partial failure):
```json
{
  "deleted": ["dragon-lair.png"],
  "errors": {
    "tavern-scene.webp": "File not found"
  }
}
```

**Behavior:**
- Identifies source of each file (maps-output, maps-library, maps-adventure)
- Moves file to `web/data/trash/{filename}`
- Updates trash-manifest.json with entry
- Creates trash directory if it doesn't exist
- Returns success/error per file
- Shows toast notification to user with results

### Error Handling

- **Permission denied:** Show user-friendly message, log full error
- **File not found:** Skip gracefully, note in toast
- **Trash write failure:** Attempt to create directory, retry, show error if persists
- **Manifest corruption:** Rebuild from timestamp inspection on disk

## Feature 2: Collapsible Left Panel Sections

### UI Changes

Each section header (Files, Maps) gets a collapse toggle:

```
▼ Files         (expanded)
▶ Maps          (collapsed)
```

- Toggle is a small clickable arrow or chevron
- Click to expand/collapse
- Smooth CSS transition (0.3s)

### State Persistence

- Collapse state stored in localStorage: `dm-panel-collapse-state`
- Format: `{ "files": true, "maps": false }` (true = collapsed)
- Persists across page reloads and server restarts
- Default state on first visit: both expanded

### CSS & Animation

- Use `max-height` or `flex` transition for smooth collapse
- Overflow hidden during transition
- Arrow rotates 90° on toggle

### Default Behavior

- Both sections expanded on first visit (localStorage not yet set)
- User preference remembered on reload

## Data Structures

### Trash Manifest

**File:** `web/data/trash/trash-manifest.json`

```typescript
type TrashManifest = {
  [filename: string]: {
    filename: string;        // original filename
    original_path: string;   // full path before trashing
    trashed_at: number;      // ms since epoch
    source: "generated" | "library" | "adventure";
  }
}
```

### LocalStorage: Collapse State

**Key:** `dm-panel-collapse-state`

```typescript
type CollapseState = {
  files?: boolean;  // true = collapsed
  maps?: boolean;
}
```

## Implementation Notes

### Backend (server.js)

1. Add `/api/maps/delete` endpoint
2. Implement trash directory creation & file movement
3. Implement trash-manifest.json read/write
4. Add daily cleanup job (Node.js interval or external cron)
5. Add cleanup function to run on server startup (catch missed jobs)

### Frontend (public/app.js)

1. Add checkbox HTML to map thumbnail template
2. Track selected maps in JavaScript Set
3. Implement Ctrl+Click listener
4. Implement action bar HTML & toggle logic
5. Implement modal HTML & confirmation flow
6. Add fetch call to `/api/maps/delete`
7. Add localStorage handlers for collapse state

### Frontend (public/index.html)

1. Add collapse toggles to Files and Maps headers (CSS + data attributes)
2. Add action bar HTML
3. Add confirmation modal HTML

### Frontend (public/style.css)

1. Checkbox styles (overlay on hover/selected)
2. Action bar styles (floating, flexbox layout)
3. Modal styles (confirmation dialog)
4. Collapse animation (max-height or flex transition)
5. Selected map highlight styles

## Success Criteria

- [ ] Users can multi-select maps via checkboxes and Ctrl+Click
- [ ] Action bar appears/disappears correctly based on selection
- [ ] Confirmation modal shows all selected maps with thumbnails
- [ ] Delete moves maps to trash with timestamp metadata
- [ ] Daily cron job runs and deletes maps >30 days old
- [ ] Trash is transparent to user (no UI for viewing/restoring)
- [ ] Files and Maps sections collapse independently
- [ ] Collapse state persists across page reloads
- [ ] No errors when trash folder doesn't exist (auto-created)
- [ ] Selection state clears after successful delete

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Trash folder fills up | Disk usage | Daily cleanup job, monitor in logs |
| Manifest corruption | Data loss | Rebuild from filesystem on startup |
| User deletes wrong map | Frustration | 30-day trash window, add undo toast button (future) |
| Cron job doesn't run | Orphaned files | Run cleanup on server startup as well |

## Future Enhancements

- Restore from trash (requires restore API + trash view tab)
- Undo notification with "Restore" button (toasts for recent deletes)
- Batch move to different folders (organize maps)
- Search/filter across all map sources
