# VTT Effects — Design Spec
_Date: 2026-06-07_

## Goal

Add atmospheric effect overlays to the `/vtt` screen. DM toggles effects from a small section in the existing Tools dropdown. Effects layer on top of the battle map image with no fog-of-war drawing, no zones, no interaction — just full-screen atmosphere.

## Effects

| Effect | Behaviour |
|---|---|
| 🌧 Rain | Diagonal animated streaks, varying speed/opacity, fills screen |
| 🌫 Fog | 5 large blurred patches doing slow random walks, wrapping at edges |
| ❄️ Snow | 50 particles falling with gentle drift, pixel-based travel so they fill the full screen |
| 🔥 Fire | 4 roaming radial-gradient hotspots bouncing slowly around the map with a pulse animation |
| 🌑 Darkness | Black overlay at 0–100% opacity, independent of the four effect buttons |

Multiple effects can be active simultaneously (e.g. Rain + Darkness for a stormy night).

## DM Controls — Tools Dropdown

A new **VTT Screen** section added to the existing `#tools-dropdown` in `index.html`, below the SRD Tools section:

```
🗺️ VTT SCREEN
[ 🌧 Rain ] [ 🌫 Fog ] [ ❄️ Snow ] [ 🔥 Fire ]   ← toggle buttons, highlight when active
🌑 Darkness  [————————●————] 40%                  ← range slider, live update
[ ✕ Clear Effects ]  [ ↗ Open VTT ]
```

- Toggle buttons highlight (accent border + colour) when active, dimmed when off
- Darkness slider updates the VTT in real time via debounced POST (50ms)
- **Clear Effects** resets all four toggles and darkness to 0 in one click
- **Open VTT** opens `/vtt` in a new tab

## State Extension

`vttState` gains two new fields alongside the existing `type` and `url`:

```json
{
  "type": "map",
  "url": "/maps-library/130.jpg",
  "effects": ["rain", "fog"],
  "darkness": 0.4
}
```

- `effects`: array of active effect names (`"rain"`, `"fog"`, `"snow"`, `"fire"`); empty array = no effects
- `darkness`: float 0–1; 0 = no overlay, 1 = full black

Both fields are included in every broadcast. VTT screen always reads them (defaults: `[]` and `0`).

## Server Changes — `server.js`

`POST /api/vtt-screen` accepts the extended payload:

```json
{ "type": "map", "url": "...", "effects": ["rain"], "darkness": 0.4 }
{ "type": "idle", "effects": [], "darkness": 0 }
```

Validation: `effects` must be an array; each entry must be one of the four known names. `darkness` must be a number 0–1. Unknown values are rejected with 400.

## VTT Screen — `vtt.html`

Effect layers are `position: absolute; inset: 0; pointer-events: none` divs stacked above the map image. The existing `applyState()` function:

1. Sets/clears a black overlay `#fx-dark` at `rgba(0,0,0,darkness)`
2. Adds/removes CSS classes on `#fx-root` (`fx-rain`, `fx-fog`, `fx-snow`, `fx-fire`)

Each CSS class activates its layer. JS-driven animations (fog random walk, fire roaming) run continuously; their container divs are simply shown/hidden by the class.

### Animation Implementation

| Effect | Technique |
|---|---|
| Rain | CSS `@keyframes` on 60 `<div>` elements generated once at load |
| Snow | CSS `@keyframes` with absolute pixel travel (260px) on 50 `<div>` elements; negative delays pre-seed all heights |
| Fog | 5 `<div>` blobs with `filter:blur(32px)`; JS `requestAnimationFrame` random-walk loop; velocity capped at 0.0002 (fraction of map per ms) |
| Fire | 4 radial-gradient `<div>` hotspots; JS rAF random-walk loop; velocity capped at 0.00018; CSS `hotspot-pulse` keyframe for breathing |

Rain and snow elements are created once at page load and are always in the DOM — toggling just shows/hides their container. Fog and fire rAF loops run continuously (cheap when hidden).

## DM Panel — `app.js`

New `vttEffects` module-level state object mirrors the server:

```js
let _vttEffects = { effects: new Set(), darkness: 0 };
```

- Toggle button click: adds/removes effect from Set, POSTs full state
- Slider input: debounces 50ms, POSTs full state
- Clear: resets Set + darkness to 0, POSTs, updates button UI
- On page load: `GET /api/vtt-screen` to sync toggle/slider state with server

## Styling — `style.css`

New classes for the VTT tools section:

- `.vtt-fx-btn` — base style matching existing `.tool-item`; adds accent border when `.active`
- `.vtt-dark-row` — flex row for the darkness label + slider + value

## Files Changed

| File | Change |
|---|---|
| `web/server.js` | Extend `vttState` shape; validate `effects` array and `darkness` in POST handler |
| `web/public/vtt.html` | Add effect layer divs, CSS animations, JS toggle logic in `applyState()` |
| `web/public/index.html` | Add VTT Screen section to `#tools-dropdown` |
| `web/public/app.js` | Add `_vttEffects` state, toggle/slider/clear handlers, POST logic |
| `web/public/style.css` | Add `.vtt-fx-btn`, `.vtt-dark-row` styles |
