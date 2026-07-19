# DM Panel — Mobile/Tablet Friendliness Pass

**Date:** 2026-06-26
**Target devices:** Galaxy S23 Ultra (phone, ~412 CSS px wide) and Galaxy Tab S8 (tablet, ~800 px portrait / ~1280 px landscape), Chrome.
**Reported symptom:** Layout overflows / horizontal scroll; doesn't load well on phone.

## Diagnosis

**Confirmed by live inspection in Chrome at narrow width (DevTools-style measurement).**

ROOT CAUSE — `body` is `display:grid` with `grid-template-rows`/`grid-template-areas` defined but
**no `grid-template-columns`**. The implicit single column defaults to `auto`, which sizes to the
**max-content width of its contents** — the horizontal tab strip (`.tab-group`, ~730–850px of
tab buttons). Measured: the grid column resolved to `796.75px` on a ~470px viewport. That dragged
`#workspace`, `#panel-center`, and the content `#viewer` iframe all to ~797px, so the whole UI —
and the rendered content inside the iframe — was laid out wider than the phone screen.

Because the column was unconstrained, `overflow-x:auto` on `#tabbar` never engaged (nothing forced
it narrower than its content), so the tab strip couldn't scroll and instead widened everything.

Fix: `body { grid-template-columns: minmax(0, 1fr); }` caps the column at the container width.
Verified live: `htmlScrollWidth === htmlClientWidth`, page cannot scroll horizontally, tab strip
now scrolls inside its own box, and adventure/NPC content fits with `innerOverflow: 0`.

NOTE — an earlier hypothesis (missing `<meta name="viewport">` in the iframe templates) was
**wrong**: a viewport meta inside an iframe is ignored by browsers; the iframe is sized by its CSS
width, which the grid bug had inflated. The meta tags were left in place (harmless/conventional)
but are not the fix.

Secondary contributors (still worth fixing, and addressed):
- `.page { padding: 28px 32px }` is heavy on a phone.
- Wide tables / `<pre>` / long unbroken strings have no scroll-wrapping or `overflow-wrap`.
- Outer shell (`style.css`) has a working mobile drawer system (breakpoints 900/480px) but small
  touch targets, a crowded header strip, and no dedicated tablet treatment.

## Design

### A. Iframe content (`web/server.js`) — core overflow fix
1. Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to both
   `previewHtml()` and `webPreviewHtml()` document heads.
2. `FRAME_SCREEN_CSS` & `WEB_CONTENT_CSS`: add `overflow-wrap:break-word; word-break:break-word`
   to body/content; make `table` and `pre` scroll within their own box (`display:block;
   overflow-x:auto; max-width:100%`) instead of widening the page; reduce `.page` /
   `.web-content` padding under ~600px via a `@media` block.

### B. Outer shell (`web/public/style.css`) — polish
3. Add `overflow-x:hidden` safety to the workspace/scroll containers; raise touch targets
   (tabs, file-tree rows, header buttons, drawer items) toward ~40px min in the ≤900px query.
4. Add a tablet range `@media (min-width:601px) and (max-width:1024px)` for readable sizing in
   both Tab S8 orientations.
5. Tidy the mobile header: ensure the tab strip scrolls cleanly and secondary controls collapse
   gracefully (building on existing ≤900 / ≤480 rules).

## Verification
- Static HTML harness rendering the iframe templates + shell at 412px and 800px widths
  (the live browser tool cannot reach the local server from the agent host).
- `pm2 restart dm-panel` and confirm the page still serves (HTTP 200).
- Manual confirmation by the user on the actual S23 Ultra / Tab S8.

## Out of scope
- Reworking the desktop 3-panel layout, VTT canvas internals, or the xterm terminal.
- Functional changes to any feature; this is presentation/responsive only.
