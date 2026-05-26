# Ambient Sounds — Design Spec
_Date: 2026-05-25_

## Overview

Add a persistent ambient sound player to the Northwatch Wardens DM Panel. A slim footer bar is always visible at the bottom of the screen; it plays one looping audio scene at a time and suggests a scene whenever the DM opens a file in the browser.

---

## Architecture

Four files/directories, each with one clear job:

| Path | Job |
|------|-----|
| `web/public/sounds.js` | `SoundPlayer` module — all audio logic |
| `web/public/sounds/sounds.json` | Scene manifest (bundled + custom metadata) |
| `web/public/sounds/*.mp3` | Bundled CC0-licensed ambient loops |
| `web/public/sounds/custom/` | Drop-in folder for user-supplied MP3/OGG files |

**Integration points in existing files:**
- `web/public/index.html` — add `<script src="sounds.js">` and the footer bar HTML
- `web/public/style.css` — add footer bar styles
- `web/public/app.js` — call `SoundPlayer.suggest(filepath)` in the existing file-open handler; call `SoundPlayer.init()` on page load
- `web/server.js` — add one route: `GET /api/sounds/custom` returns a JSON array of filenames in `web/public/sounds/custom/`

No other changes to `server.js`.

---

## SoundPlayer API (`sounds.js`)

```js
SoundPlayer.init()        // fetch sounds.json, scan custom/, render footer bar, restore localStorage state
SoundPlayer.play(sceneId) // crossfade to named scene
SoundPlayer.stop()        // fade out current scene
SoundPlayer.suggest(filepath) // map filepath keywords → scene, highlight suggestion in footer
```

`SoundPlayer` is a plain object attached to `window` — no build step, consistent with the rest of `app.js`.

---

## Footer Bar UI

Pinned to the bottom of the viewport via `position: fixed; bottom: 0; left: 0; right: 0` on a new `#sound-bar` element inserted as a direct child of `<body>`. The `#workspace` div gets `padding-bottom` equal to the bar's height so content doesn't hide behind it. Using `fixed` (not `sticky`) ensures the bar stays visible even when the fullscreen combat tracker overlay is active.

**Layout (left → right):**

```
♪  [Scene Name]  [▶ Play / ■ Stop]  [⟳ loop]  [Tavern] [Forest] [Dungeon] [Combat] [Cave] [Winter] [Night] [+ More…]   🔊 ──●──
```

- **♪ icon** — decorative, themed purple (`#cba6f7`)
- **Scene name** — current scene label, or `— stopped —` when idle
- **Play/Stop button** — toggles playback of the current scene
- **Loop toggle (⟳)** — lit (purple border) = looping; dimmed = play once. Defaults to ON. Flips `audio.loop` live.
- **Quick-scene buttons** — one button per bundled scene. Active scene highlighted (purple tint + border). Clicking a non-active scene calls `play(sceneId)` with crossfade.
- **+ More… button** — opens a modal listing all scenes (bundled + custom), searchable by name.
- **Volume slider** — range input, 0–100, accent color `#cba6f7`. Persisted in `localStorage`.

**Suggestion state:** When `suggest()` fires, the matching quick-scene button gets a `✦` suffix and a green tint (`#a6e3a1` border). A small italic label `"suggested for this file"` appears inline. The suggestion clears on the next file open. It never auto-plays.

---

## Bundled Sound Library

All files CC0 (sourced from Freesound.org). Stored at `web/public/sounds/<id>.mp3`. Target size ≈ 2–4 MB each (loopable, 60–120s).

| Scene ID | Label | Suggestion Keywords |
|----------|-------|---------------------|
| `tavern` | Tavern | waystone, inn, tavern, town, village, pinebrook, welton |
| `forest` | Forest | forest, woods, wilderness, wolves, westly |
| `dungeon` | Dungeon | dungeon, temple, dragonknights, ruins, underground |
| `cave` | Cave | cave, croaker, salsvault, grotto |
| `combat` | Combat | combat, encounter, battle |
| `winter` | Winter Wind | frozen, blizzard, snow, cold, pale, northreach |
| `night` | Night Ambience | night, camp, campfire |

`sounds.json` structure:

```json
{
  "scenes": [
    { "id": "tavern", "label": "Tavern", "file": "tavern.mp3", "keywords": ["waystone", "inn", "tavern", "town", "village", "pinebrook", "welton"] },
    { "id": "forest", "label": "Forest", "file": "forest.mp3", "keywords": ["forest", "woods", "wilderness", "wolves", "westly"] },
    { "id": "dungeon", "label": "Dungeon", "file": "dungeon.mp3", "keywords": ["dungeon", "temple", "dragonknights", "ruins", "underground"] },
    { "id": "cave", "label": "Cave", "file": "cave.mp3", "keywords": ["cave", "croaker", "salsvault", "grotto"] },
    { "id": "combat", "label": "Combat", "file": "combat.mp3", "keywords": ["combat", "encounter", "battle"] },
    { "id": "winter", "label": "Winter Wind", "file": "winter.mp3", "keywords": ["frozen", "blizzard", "snow", "cold", "pale", "northreach"] },
    { "id": "night", "label": "Night Ambience", "file": "night.mp3", "keywords": ["night", "camp", "campfire"] }
  ],
  "customDir": "custom"
}
```

**Custom sounds:** On `init()`, `SoundPlayer` calls `GET /api/sounds/custom`. The server returns `["my-track.mp3", "rain.ogg"]`. Each file is appended to the scene list with `id = filename-without-extension`, `label = filename-without-extension` (title-cased), no keywords. Custom scenes appear in the More… modal but not as quick-scene buttons (to keep the footer compact).

---

## Crossfade & Playback

Two `<audio>` elements (`#snd-a`, `#snd-b`) maintained in the DOM. They ping-pong on each scene switch:

1. Load new track's URL into the inactive element; set `loop` to match current toggle state; call `.play()`
2. Over 1.5 seconds (via `requestAnimationFrame`), ramp active element volume 1.0 → 0; ramp new element volume 0 → target volume
3. When ramp completes: pause the old element, clear its `src`, swap active pointer

**Loop toggle:** Sets `audio.loop` on the currently active element immediately. If loop is OFF and the track ends (`ended` event), `SoundPlayer` calls `stop()` and resets the scene name to `— stopped —`.

**Volume:** Stored in `localStorage` as `"soundbar-volume"` (0–1 float). Restored on `init()`. Changing the slider updates the active audio element's `volume` immediately.

**Loop state:** Stored in `localStorage` as `"soundbar-loop"` (`"true"`/`"false"`). Restored on `init()`. Defaults to `true`.

---

## Suggestion Mapping

Called by `app.js` whenever a file path changes (file opened in viewer):

```js
// in app.js existing file-open handler:
SoundPlayer.suggest(filePath);
```

Algorithm:
1. Lowercase and tokenize `filePath` (split on `/`, `\`, `-`, `_`, `.`)
2. Walk `SoundPlayer.scenes` in order; return the first scene where any keyword matches any token
3. If matched scene === currently playing scene: do nothing
4. Otherwise: mark that scene's quick-button as suggested (`✦` + green tint); store suggestion; clear any previous suggestion marker
5. On next `suggest()` call: clear previous suggestion marker before applying new one

No suggestion is shown if no keyword matches.

---

## Server Route

One new route in `server.js`:

```js
app.get('/api/sounds/custom', (req, res) => {
  const dir = path.join(__dirname, 'public', 'sounds', 'custom');
  if (!fs.existsSync(dir)) return res.json([]);
  const files = fs.readdirSync(dir).filter(f => /\.(mp3|ogg|wav)$/i.test(f));
  res.json(files);
});
```

---

## State Persistence (`localStorage`)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `soundbar-volume` | float 0–1 | `0.7` | Master volume |
| `soundbar-loop` | `"true"`/`"false"` | `"true"` | Loop toggle state |
| `soundbar-scene` | scene ID string or `null` | `null` | Last playing scene (restored but not auto-resumed on page load) |

Scene is not auto-resumed on load — the DM clicks play intentionally.

---

## Out of Scope

- Multiple simultaneous layers
- Auto-play on suggestion (always manual)
- Streaming URLs / YouTube integration
- Mobile-specific layout changes
- Sound effects / one-shots (only ambient loops)
