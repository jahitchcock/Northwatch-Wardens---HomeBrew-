# Themes & Preferences — Design Spec
_2026-05-31_

## Overview

Add selectable UI themes to the DM Panel web dashboard, with the chosen theme persisted in a `dm_prefs` cookie. Six themes covering distinct moods. Theme picker lives in the existing Tools dropdown. No flash of unstyled content on load.

---

## Theme Data

A `THEMES` constant in `app.js` maps theme IDs to CSS variable overrides. The 7 variables in scope: `--bg`, `--panel`, `--overlay`, `--text`, `--subtext`, `--accent`, `--border`, `--red`.

| ID | Display Name | Feel |
|----|-------------|------|
| `mocha` | Mocha | Current default — dark purple, Catppuccin Mocha palette |
| `tavern` | Tavern | Warm amber, candlelight browns |
| `midnight` | Midnight | Near-black, blue-white high contrast |
| `forest` | Forest | Muted greens, earthy tones |
| `arcane` | Arcane | Deep indigo/teal, magical glow |
| `parchment` | Parchment | Light mode, aged cream paper |

---

## Preferences Cookie

- **Name:** `dm_prefs`
- **Format:** plain JSON — `{"theme":"tavern"}`
- **Scope:** `Path=/`, `SameSite=Lax`, `HttpOnly=false` (must be readable by client JS for no-flash apply)
- **Max-age:** 1 year (persistent, survives browser close — unlike the session-only `dm_auth` cookie)
- **Set by:** client JS via `document.cookie` on theme change
- **Read by:** inline `<script>` in `<head>` of `index.html` before stylesheet paint, AND by `app.js` on load for consistency

No server endpoint needed — the cookie is written entirely client-side.

---

## Theme Application

### No-flash on load
An inline `<script>` block in `<head>` (before `style.css`) reads `dm_prefs`, parses the theme ID, and calls `applyThemeVars(id)` synchronously. This runs before the browser paints, eliminating flash.

```html
<script>
  (function() {
    try {
      const prefs = JSON.parse(document.cookie.split('; ')
        .find(r => r.startsWith('dm_prefs='))?.split('=')[1] || '{}');
      if (prefs.theme) window.__initialTheme = prefs.theme;
    } catch {}
  })();
</script>
```

`app.js` defines `applyThemeVars(id)` which iterates the theme's variable map and calls `document.documentElement.style.setProperty(varName, value)` for each entry. On DOMContentLoaded, it picks up `window.__initialTheme` (set by the inline script) or defaults to `mocha`.

### On change
`setTheme(id)` calls `applyThemeVars(id)`, writes the cookie, and marks the active theme in the Tools dropdown.

---

## Tools Dropdown — Theme Section

A new section added at the bottom of the existing `#tools-dropdown`:

```
─────────────────
THEME
  ● Mocha          ← active indicator
    Tavern
    Midnight
    Forest
    Arcane
    Parchment
```

Each item is a `.tool-item` button with a small coloured swatch dot. The active theme shows a checkmark or filled dot. Clicking calls `setTheme(id)` and closes the dropdown.

---

## Files Changed

| File | Change |
|------|--------|
| `web/public/app.js` | Add `THEMES` constant, `applyThemeVars()`, `setTheme()`, theme section in Tools dropdown, load prefs on init |
| `web/public/index.html` | Add inline no-flash `<script>` in `<head>` |
| `web/public/style.css` | No changes — `:root` variables remain as the Mocha default fallback |

---

## Out of Scope

- Server-side preferences endpoint (cookie is client-written)
- Font size or layout preferences (deferred to a future Preferences modal if needed)
- Theme editor / custom themes
