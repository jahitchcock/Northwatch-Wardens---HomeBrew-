# Shop System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Shops tab to the DM dashboard that lets the DM browse Northreach merchant inventory, see 5etools item links, and maintain a session-only cart as a shopping scratch pad.

**Architecture:** New "Shops" tab opens a modal (same pattern as Adventures/NPCs/Locations tabs). Shop data lives in `web/data/shops/*.json` manifests seeded from `gm-lore/practical/common-goods.md`. Cart is session-only state in `app.js` (no server persistence). 5etools items are linked locally (port 2014) and searchable via a new `/api/5etools/item-search` endpoint that mirrors the existing bestiary search pattern.

**Tech Stack:** Vanilla JS (existing app.js pattern), Express (existing server.js), JSON data files

---

### Task 1: Add Shops tab to HTML

**Files:**
- Modify: `web/public/index.html:564`

- [ ] **Step 1: Add the tab button after Homebrew**

In `web/public/index.html`, find this line:
```html
      <button class="tab" id="tab-homebrew" data-tab="homebrew">Homebrew</button>
```
Add after it:
```html
      <button class="tab" id="tab-shops" data-tab="shops">Shops</button>
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:5050` — "Shops" tab should appear in the nav. Clicking it does nothing yet.

- [ ] **Step 3: Commit**
```bash
git add web/public/index.html
git commit -m "feat: add Shops tab button to nav"
```

---

### Task 2: Create shop data directory and Waystone Armory manifest

**Files:**
- Create: `web/data/shops/waystone-armory.json`

- [ ] **Step 1: Create the data directory and first shop JSON**

Create `web/data/shops/waystone-armory.json`:
```json
{
  "id": "waystone-armory",
  "name": "Warden Armory",
  "location": "Waystone Inn",
  "keeper": "Steward Mara Fenwick",
  "description": "Practical gear stocked for Warden requisition. Not a shop — members with standing draw supplies here. Non-members pay frontier prices.",
  "tags": ["weapons", "armor", "adventuring"],
  "guildDiscount": true,
  "items": [
    { "name": "Longsword",        "category": "weapons",     "gp": 22, "sp": 0, "priceNote": "1.5× PHB", "stock": "available",  "5etoolsId": "longsword_phb" },
    { "name": "Shortsword",       "category": "weapons",     "gp": 15, "sp": 0, "priceNote": "1.5× PHB", "stock": "available",  "5etoolsId": "shortsword_phb" },
    { "name": "Handaxe",          "category": "weapons",     "gp": 7,  "sp": 5, "priceNote": "1.5× PHB", "stock": "available",  "5etoolsId": "handaxe_phb" },
    { "name": "Dagger",           "category": "weapons",     "gp": 3,  "sp": 0, "priceNote": "1.5× PHB", "stock": "available",  "5etoolsId": "dagger_phb" },
    { "name": "Spear",            "category": "weapons",     "gp": 1,  "sp": 5, "priceNote": "1.5× PHB", "stock": "available",  "5etoolsId": "spear_phb" },
    { "name": "Shortbow",         "category": "weapons",     "gp": 37, "sp": 5, "priceNote": "1.5× PHB", "stock": "limited",    "5etoolsId": "shortbow_phb" },
    { "name": "Arrows (20)",      "category": "ammunition",  "gp": 1,  "sp": 0, "priceNote": "Frontier price", "stock": "available", "5etoolsId": "arrow_phb" },
    { "name": "Crossbow Bolts (20)", "category": "ammunition", "gp": 1, "sp": 0, "priceNote": "Frontier price", "stock": "available", "5etoolsId": "crossbow_bolt_phb" },
    { "name": "Scale Mail",       "category": "armor",       "gp": 75, "sp": 0, "priceNote": "1.5× PHB", "stock": "limited",    "5etoolsId": "scale_mail_phb" },
    { "name": "Chain Mail",       "category": "armor",       "gp": 112, "sp": 5, "priceNote": "1.5× PHB", "stock": "rare",      "5etoolsId": "chain_mail_phb" },
    { "name": "Leather Armor",    "category": "armor",       "gp": 15, "sp": 0, "priceNote": "1.5× PHB", "stock": "available",  "5etoolsId": "leather_armor_phb" },
    { "name": "Shield",           "category": "armor",       "gp": 15, "sp": 0, "priceNote": "1.5× PHB", "stock": "available",  "5etoolsId": "shield_phb" },
    { "name": "Rope, Hempen (50 ft)", "category": "adventuring", "gp": 1, "sp": 5, "priceNote": "1.5× PHB", "stock": "available", "5etoolsId": "rope_hempen_(50_feet)_phb" },
    { "name": "Torch",            "category": "adventuring", "gp": 0,  "sp": 2, "priceNote": "Standard", "stock": "available",   "5etoolsId": "torch_phb" },
    { "name": "Rations (1 day)",  "category": "adventuring", "gp": 0,  "sp": 5, "priceNote": "Standard", "stock": "available",   "5etoolsId": "rations_(1_day)_phb" },
    { "name": "Tinderbox",        "category": "adventuring", "gp": 0,  "sp": 5, "priceNote": "Standard", "stock": "available",   "5etoolsId": "tinderbox_phb" },
    { "name": "Healer's Kit",     "category": "adventuring", "gp": 7,  "sp": 5, "priceNote": "1.5× PHB", "stock": "limited",     "5etoolsId": "healer's_kit_phb" },
    { "name": "Potion of Healing","category": "potions",     "gp": 75, "sp": 0, "priceNote": "Frontier price; scarce", "stock": "rare", "5etoolsId": "potion_of_healing_dmg", "notes": "Limited stock. First come, first served." }
  ]
}
```

- [ ] **Step 2: Commit**
```bash
git add web/data/shops/waystone-armory.json
git commit -m "feat: add Waystone Armory shop manifest"
```

---

### Task 3: Create Waystone Services and General Goods manifests

**Files:**
- Create: `web/data/shops/waystone-services.json`
- Create: `web/data/shops/frontier-merchant.json`

- [ ] **Step 1: Create waystone-services.json**

```json
{
  "id": "waystone-services",
  "name": "Waystone Services",
  "location": "Waystone Inn",
  "keeper": "Steward Mara Fenwick / Lorewarden Elric Vael",
  "description": "Services available at the Waystone Inn. Most are free for Warden members in good standing.",
  "tags": ["services", "healing", "information"],
  "guildDiscount": true,
  "items": [
    { "name": "Lodging (common bunk)", "category": "services", "gp": 0, "sp": 0, "priceNote": "Free for Wardens; 1gp/night non-members", "stock": "available", "notes": "Wardens in good standing lodge free." },
    { "name": "Meals (hearty stew)", "category": "services", "gp": 0, "sp": 3, "priceNote": "Free for Wardens; 5sp dinner non-members", "stock": "available" },
    { "name": "Stable (per animal)", "category": "services", "gp": 0, "sp": 0, "priceNote": "Free for Wardens on guild business; 5sp/night non-members", "stock": "available" },
    { "name": "First Aid (Medicine check)", "category": "healing", "gp": 0, "sp": 5, "priceNote": "Free for Wardens", "stock": "available", "notes": "Mundane treatment. Practitioner makes Medicine check; failure may worsen condition." },
    { "name": "Disease/Poison Treatment", "category": "healing", "gp": 5, "sp": 0, "priceNote": "Per day; free for Wardens", "stock": "available" },
    { "name": "Surgery (bones, arrows)", "category": "healing", "gp": 25, "sp": 0, "priceNote": "Standard", "stock": "available" },
    { "name": "Cure Wounds (1st level)", "category": "magical-healing", "gp": 50, "sp": 0, "priceNote": "Standard spellcasting rate", "stock": "limited", "notes": "Requires available spellcaster." },
    { "name": "Lesser Restoration (2nd)", "category": "magical-healing", "gp": 100, "sp": 0, "priceNote": "Standard", "stock": "limited" },
    { "name": "Arcane Identification (Identify)", "category": "information", "gp": 25, "sp": 0, "priceNote": "Lorewarden Elric", "stock": "available", "notes": "Elric Vael provides this service. Free for Wardens investigating Aeorian artifacts." },
    { "name": "Lore Research (general)", "category": "information", "gp": 10, "sp": 0, "priceNote": "Per question + 1 day", "stock": "available", "notes": "Lorewarden Elric. Free for Wardens." },
    { "name": "Ancient Texts / Rare Lore", "category": "information", "gp": 100, "sp": 0, "priceNote": "Minimum + weeks of research", "stock": "limited", "notes": "Subject to Elric's discretion." },
    { "name": "Scribe — Copy Document", "category": "services", "gp": 1, "sp": 0, "priceNote": "Per page", "stock": "available" },
    { "name": "Contract Drafting", "category": "services", "gp": 5, "sp": 0, "priceNote": "Standard", "stock": "available" }
  ]
}
```

- [ ] **Step 2: Create frontier-merchant.json**

```json
{
  "id": "frontier-merchant",
  "name": "Frontier Merchant",
  "location": "Northreach (general)",
  "keeper": "Traveling merchants / local traders",
  "description": "Standard goods available from merchants and traders throughout Northreach at frontier prices (1.5× PHB for manufactured goods).",
  "tags": ["general", "trade", "food"],
  "guildDiscount": false,
  "items": [
    { "name": "Cold Weather Outfit",  "category": "clothing",    "gp": 15, "sp": 0, "priceNote": "Essential for winter", "stock": "available", "notes": "Insulated. Required for survival in deep winter." },
    { "name": "Common Clothes",       "category": "clothing",    "gp": 0,  "sp": 8, "priceNote": "Frontier price", "stock": "available" },
    { "name": "Fine Clothes",         "category": "clothing",    "gp": 25, "sp": 0, "priceNote": "Rare, special order", "stock": "rare" },
    { "name": "Ale (mug)",            "category": "food-drink",  "gp": 0,  "sp": 4, "priceNote": "Standard", "stock": "available" },
    { "name": "Wine (bottle)",        "category": "food-drink",  "gp": 2,  "sp": 0, "priceNote": "Frontier price", "stock": "limited" },
    { "name": "Trail Rations (1 day)","category": "food-drink",  "gp": 0,  "sp": 5, "priceNote": "Standard", "stock": "available" },
    { "name": "Firewood (bundle)",    "category": "supplies",    "gp": 0,  "sp": 5, "priceNote": "5× in winter", "stock": "available", "notes": "Winter price: 2sp 5cp per bundle." },
    { "name": "Candle",               "category": "supplies",    "gp": 0,  "sp": 1, "priceNote": "Standard", "stock": "available" },
    { "name": "Oil (flask)",          "category": "supplies",    "gp": 0,  "sp": 1, "priceNote": "Standard", "stock": "available", "5etoolsId": "oil_(flask)_phb" },
    { "name": "Sack",                 "category": "supplies",    "gp": 0,  "sp": 1, "priceNote": "Standard", "stock": "available", "5etoolsId": "sack_phb" },
    { "name": "Backpack",             "category": "supplies",    "gp": 3,  "sp": 0, "priceNote": "1.5× PHB", "stock": "available", "5etoolsId": "backpack_phb" },
    { "name": "Blanket",              "category": "supplies",    "gp": 0,  "sp": 8, "priceNote": "1.5× PHB", "stock": "available", "5etoolsId": "blanket_phb" },
    { "name": "Waterskin",            "category": "supplies",    "gp": 0,  "sp": 3, "priceNote": "1.5× PHB", "stock": "available", "5etoolsId": "waterskin_phb" },
    { "name": "Crowbar",              "category": "tools",       "gp": 3,  "sp": 0, "priceNote": "1.5× PHB", "stock": "available", "5etoolsId": "crowbar_phb" },
    { "name": "Hammer",               "category": "tools",       "gp": 1,  "sp": 0, "priceNote": "1.5× PHB", "stock": "available", "5etoolsId": "hammer_phb" },
    { "name": "Grappling Hook",       "category": "tools",       "gp": 3,  "sp": 0, "priceNote": "1.5× PHB", "stock": "limited",   "5etoolsId": "grappling_hook_phb" },
    { "name": "Manacles",             "category": "tools",       "gp": 3,  "sp": 0, "priceNote": "1.5× PHB", "stock": "available", "5etoolsId": "manacles_phb" },
    { "name": "Local Guide (per day)","category": "services",    "gp": 2,  "sp": 0, "priceNote": "Settlement to settlement", "stock": "available" },
    { "name": "Wilderness Guide (per day)", "category": "services", "gp": 5, "sp": 0, "priceNote": "Trackless terrain", "stock": "limited" },
    { "name": "Mount — Riding Horse", "category": "mounts",      "gp": 75, "sp": 0, "priceNote": "Frontier price", "stock": "limited", "5etoolsId": "horse,_riding_phb" },
    { "name": "Mount — Draft Horse",  "category": "mounts",      "gp": 50, "sp": 0, "priceNote": "Frontier price", "stock": "available", "5etoolsId": "horse,_draft_phb" },
    { "name": "Mount — Mule",         "category": "mounts",      "gp": 12, "sp": 0, "priceNote": "Frontier price", "stock": "available", "5etoolsId": "mule_phb" },
    { "name": "Horse Rental (per day)","category": "mounts",     "gp": 2,  "sp": 0, "priceNote": "Standard rental rate", "stock": "available" }
  ]
}
```

- [ ] **Step 3: Commit**
```bash
git add web/data/shops/
git commit -m "feat: add shop manifests — Waystone services + frontier merchant"
```

---

### Task 4: Add /api/shops server endpoint

**Files:**
- Modify: `web/server.js` (add after `/api/homebrew` block, around line 1930)

- [ ] **Step 1: Add the shops API endpoint to server.js**

After the `app.get('/api/homebrew-content', ...)` block (around line 1878), add:
```js
// ─── Shops API ────────────────────────────────────────────────────────────────

const SHOPS_DIR = path.join(__dirname, 'data', 'shops');

app.get('/api/shops', (req, res) => {
  try {
    if (!fs.existsSync(SHOPS_DIR)) return res.json([]);
    const shops = fs.readdirSync(SHOPS_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        try { return JSON.parse(fs.readFileSync(path.join(SHOPS_DIR, f), 'utf8')); }
        catch { return null; }
      })
      .filter(Boolean);
    res.json(shops);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

- [ ] **Step 2: Test the endpoint**

Start the server (`cd web && node server.js`) and run:
```bash
curl http://localhost:5050/api/shops
```
Expected: JSON array with 3 shop objects, each with `id`, `name`, `items` array.

- [ ] **Step 3: Commit**
```bash
git add web/server.js
git commit -m "feat: add /api/shops endpoint"
```

---

### Task 5: Add /api/5etools/item-search endpoint

**Files:**
- Modify: `web/server.js` (add after the existing `/api/5etools/search` block at line ~2264)

- [ ] **Step 1: Add item cache and load function**

After the `bestiaryCache` declaration (around line 2222), add:
```js
let itemsCache = null; // [{ name, source, type, rarity }]

async function load5etoolsItems() {
  if (itemsCache) return itemsCache;
  try {
    const r = await fetch('http://localhost:2014/data/items.json');
    const data = await r.json();
    const items = (data.item || []).map(it => ({
      name: it.name,
      source: it.source || 'PHB',
      type: it.type || '',
      rarity: it.rarity || 'none',
    }));
    itemsCache = items;
    return items;
  } catch {
    itemsCache = [];
    return [];
  }
}
```

- [ ] **Step 2: Add the search endpoint**

After the existing `/api/5etools/search` endpoint (around line 2292), add:
```js
app.get('/api/5etools/item-search', async (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (q.length < 2) return res.json([]);
  try {
    const all = await load5etoolsItems();
    const scored = [];
    for (const it of all) {
      const name = it.name.toLowerCase();
      if (name === q)                           scored.push({ it, score: 0 });
      else if (name.startsWith(q))              scored.push({ it, score: 1 });
      else if (new RegExp(`\\b${q}`).test(name)) scored.push({ it, score: 2 });
      else if (name.includes(q))                scored.push({ it, score: 3 });
    }
    scored.sort((a, b) => a.score - b.score || a.it.name.localeCompare(b.it.name));
    res.json(scored.slice(0, 20).map(s => s.it));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

- [ ] **Step 3: Test the endpoint**
```bash
curl "http://localhost:5050/api/5etools/item-search?q=sword"
```
Expected: JSON array up to 20 items with `name`, `source`, `type`, `rarity`. If 5etools is offline, returns empty array (graceful degradation).

- [ ] **Step 4: Commit**
```bash
git add web/server.js
git commit -m "feat: add /api/5etools/item-search endpoint"
```

---

### Task 6: Wire up the Shops tab + render shop cards

**Files:**
- Modify: `web/public/app.js` (add after the `tab-homebrew` handler at line ~2589)

- [ ] **Step 1: Add cart state near the top of app.js**

After the `let currentPath = null;` line (around line 27), add:
```js
let shopCart = []; // { name, shopId, gp, sp, qty }
```

- [ ] **Step 2: Add the tab click handler and showShopsModal function**

After the `tab-homebrew` event listener block, add:
```js
// ─── Shops Modal ──────────────────────────────────────────────────────────────

document.getElementById('tab-shops') && document.getElementById('tab-shops').addEventListener('click', () => {
  showShopsModal();
});

async function showShopsModal() {
  const m = getFreeModal();
  if (!m) return;
  m.querySelector('.modal-title').textContent = 'Shops';
  m.querySelector('.modal-box').classList.add('modal-box--tall');
  const body = m.querySelector('.modal-body');
  body.style.cssText = 'padding:0;display:flex;flex-direction:column;overflow:hidden;background:#1a1a1a';
  body.innerHTML = '<div style="padding:20px;color:#888;font-family:sans-serif;font-size:13px">Loading shops…</div>';
  m.hidden = false;
  requestAnimationFrame(() => m.classList.add('visible'));

  try {
    const r = await fetch('/api/shops');
    if (!r.ok) throw new Error('Failed to load shops');
    const shops = await r.json();
    renderShopsModal(m, shops);
  } catch (err) {
    body.innerHTML = `<div style="padding:20px;color:#f38ba8;font-family:sans-serif;font-size:13px">${escapeHtml(err.message)}</div>`;
  }
}
```

- [ ] **Step 3: Add renderShopsModal — shop cards + filter bar**

```js
function renderShopsModal(m, shops) {
  const body = m.querySelector('.modal-body');

  // ── Layout: scroll area + sticky cart footer ─────────────────────────────────
  body.innerHTML = `
    <div id="shop-scroll" style="flex:1;overflow-y:auto;padding:16px 20px">
      <div id="shop-filter-bar" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:16px">
        <input id="shop-search" type="search" placeholder="Search items…"
          style="flex:1;min-width:160px;padding:6px 10px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px">
        <select id="shop-cat-filter"
          style="padding:6px 10px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px">
          <option value="">All categories</option>
        </select>
        <select id="shop-shop-filter"
          style="padding:6px 10px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px">
          <option value="">All shops</option>
        </select>
      </div>
      <div id="shop-items-grid"></div>
    </div>
    <div id="shop-cart-bar" style="border-top:1px solid #333;padding:10px 20px;background:#111;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-family:sans-serif;font-size:13px">
      <span style="color:#888">Cart:</span>
      <span id="shop-cart-count" style="color:#cba135;font-weight:600">0 items</span>
      <span id="shop-cart-total" style="color:#aaa"></span>
      <button id="shop-cart-clear" style="margin-left:auto;padding:4px 10px;background:#3a2020;border:1px solid #6a3030;color:#f38ba8;border-radius:4px;cursor:pointer;font-size:12px" hidden>Clear</button>
    </div>`;

  // Populate shop filter
  const shopSel = body.querySelector('#shop-shop-filter');
  for (const s of shops) {
    const opt = document.createElement('option');
    opt.value = s.id; opt.textContent = s.name;
    shopSel.appendChild(opt);
  }

  // Collect all categories
  const allCats = new Set();
  for (const s of shops) for (const it of s.items) allCats.add(it.category);
  const catSel = body.querySelector('#shop-cat-filter');
  for (const c of [...allCats].sort()) {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c.replace(/-/g, ' ');
    catSel.appendChild(opt);
  }

  // Flatten items for filtering
  const allItems = shops.flatMap(s => s.items.map(it => ({ ...it, shopId: s.id, shopName: s.name, guildDiscount: s.guildDiscount })));

  function renderItems() {
    const q = body.querySelector('#shop-search').value.trim().toLowerCase();
    const cat = catSel.value;
    const shopId = shopSel.value;
    const grid = body.querySelector('#shop-items-grid');

    const filtered = allItems.filter(it => {
      if (shopId && it.shopId !== shopId) return false;
      if (cat && it.category !== cat) return false;
      if (q && !it.name.toLowerCase().includes(q)) return false;
      return true;
    });

    if (!filtered.length) {
      grid.innerHTML = '<div style="color:#666;font-size:13px;padding:20px 0">No items match.</div>';
      return;
    }

    grid.innerHTML = '';
    for (const it of filtered) {
      grid.appendChild(buildItemRow(it));
    }
  }

  body.querySelector('#shop-search').addEventListener('input', renderItems);
  catSel.addEventListener('change', renderItems);
  shopSel.addEventListener('change', renderItems);
  body.querySelector('#shop-cart-clear').addEventListener('click', () => {
    shopCart = [];
    updateCartBar(body);
    renderItems();
  });

  renderItems();
  updateCartBar(body);
}
```

- [ ] **Step 4: Commit**
```bash
git add web/public/app.js
git commit -m "feat: shops modal — filter bar + item grid scaffold"
```

---

### Task 7: Build item rows with 5etools link + add-to-cart

**Files:**
- Modify: `web/public/app.js` (add helper functions near the shops section)

- [ ] **Step 1: Add buildItemRow and price helpers**

```js
function formatPrice(gp, sp) {
  if (gp === 0 && sp === 0) return '<span style="color:#a8d8a8">Free</span>';
  const parts = [];
  if (gp) parts.push(`<span style="color:#cba135">${gp}gp</span>`);
  if (sp) parts.push(`<span style="color:#aaa">${sp}sp</span>`);
  return parts.join(' ');
}

const STOCK_STYLE = {
  available: 'color:#a8d8a8',
  limited:   'color:#f9c74f',
  rare:      'color:#f38ba8',
};

function build5etoolsItemUrl(id) {
  if (!id) return null;
  return `http://localhost:2014/items.html#${id}`;
}

function buildItemRow(it) {
  const row = document.createElement('div');
  const inCart = shopCart.filter(c => c.name === it.name && c.shopId === it.shopId).reduce((s, c) => s + c.qty, 0);
  const stockStyle = STOCK_STYLE[it.stock] || 'color:#aaa';
  const url5e = build5etoolsItemUrl(it['5etoolsId']);

  row.style.cssText = 'display:flex;align-items:baseline;gap:8px;padding:6px 0;border-bottom:1px solid #2a2a2a;font-family:sans-serif;font-size:13px';
  row.innerHTML = `
    <div style="flex:1;min-width:0">
      ${url5e
        ? `<a href="${url5e}" target="_blank" style="color:#c9b37e;text-decoration:none;font-weight:500" title="View in 5etools">${escapeHtml(it.name)}</a>`
        : `<span style="color:#d4c5a0;font-weight:500">${escapeHtml(it.name)}</span>`}
      <span style="color:#555;font-size:11px;margin-left:6px">${escapeHtml(it.category.replace(/-/g, ' '))}</span>
      ${it.notes ? `<div style="color:#666;font-size:11px;margin-top:1px">${escapeHtml(it.notes)}</div>` : ''}
    </div>
    <div style="text-align:right;white-space:nowrap;min-width:80px">${formatPrice(it.gp, it.sp)}</div>
    <div style="min-width:60px;text-align:right;white-space:nowrap">
      <span style="font-size:11px;${stockStyle}">${it.stock}</span>
    </div>
    <div style="min-width:60px;text-align:right">
      <button class="shop-add-btn" style="padding:3px 9px;background:#2a3a2a;border:1px solid #3a5a3a;color:#a8d8a8;border-radius:4px;cursor:pointer;font-size:12px" data-name="${escapeHtml(it.name)}" data-shop="${escapeHtml(it.shopId)}" data-gp="${it.gp}" data-sp="${it.sp}">
        ${inCart ? `+1 (${inCart})` : '+ Add'}
      </button>
    </div>`;

  row.querySelector('.shop-add-btn').addEventListener('click', function () {
    const existing = shopCart.find(c => c.name === it.name && c.shopId === it.shopId);
    if (existing) existing.qty++;
    else shopCart.push({ name: it.name, shopId: it.shopId, gp: it.gp, sp: it.sp, qty: 1 });
    // Update just this button
    const inCart2 = shopCart.find(c => c.name === it.name && c.shopId === it.shopId)?.qty || 0;
    this.textContent = `+1 (${inCart2})`;
    // Update cart bar in parent modal
    const body = this.closest('.modal-body');
    if (body) updateCartBar(body);
  });

  return row;
}
```

- [ ] **Step 2: Add updateCartBar helper**

```js
function updateCartBar(body) {
  const countEl = body.querySelector('#shop-cart-count');
  const totalEl = body.querySelector('#shop-cart-total');
  const clearBtn = body.querySelector('#shop-cart-clear');
  if (!countEl) return;

  const totalItems = shopCart.reduce((s, c) => s + c.qty, 0);
  countEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;

  let totalGp = shopCart.reduce((s, c) => s + (c.gp * c.qty), 0);
  let totalSp = shopCart.reduce((s, c) => s + (c.sp * c.qty), 0);
  totalGp += Math.floor(totalSp / 10);
  totalSp = totalSp % 10;
  const parts = [];
  if (totalGp) parts.push(`${totalGp}gp`);
  if (totalSp) parts.push(`${totalSp}sp`);
  totalEl.textContent = parts.length ? `— ${parts.join(' ')} total` : '';
  if (clearBtn) clearBtn.hidden = totalItems === 0;
}
```

- [ ] **Step 3: Test in browser**

Open Shops tab. Verify:
- Items render with names, prices, stock status
- Items with `5etoolsId` show as links (open 5etools at port 2014)
- Clicking "+ Add" increments the button counter
- Cart bar shows running total and item count
- Clear empties the cart

- [ ] **Step 4: Commit**
```bash
git add web/public/app.js
git commit -m "feat: shop item rows — prices, stock, 5etools links, add-to-cart"
```

---

### Task 8: Add live 5etools item search panel

**Files:**
- Modify: `web/public/app.js` (extend renderShopsModal)

- [ ] **Step 1: Add a "Search 5etools" section to the shop scroll area**

Inside `renderShopsModal`, after the `<div id="shop-items-grid"></div>` in the HTML template, add a search section:

Replace this line in the innerHTML template:
```html
      <div id="shop-items-grid"></div>
    </div>
```
With:
```html
      <div id="shop-items-grid"></div>
      <div style="margin-top:24px;border-top:1px solid #2a2a2a;padding-top:16px">
        <div style="color:#888;font-size:12px;font-weight:600;letter-spacing:.05em;margin-bottom:8px">SEARCH 5ETOOLS ITEMS</div>
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <input id="shop-5e-search" type="search" placeholder="Search 5etools item database…"
            style="flex:1;padding:6px 10px;background:#2a2a2a;border:1px solid #444;color:#e0e0e0;border-radius:4px;font-size:13px">
        </div>
        <div id="shop-5e-results"></div>
      </div>
    </div>
```

- [ ] **Step 2: Add live search handler**

At the end of `renderShopsModal`, before the closing `}`, add:
```js
  // Live 5etools item search
  let searchTimer = null;
  body.querySelector('#shop-5e-search').addEventListener('input', function () {
    clearTimeout(searchTimer);
    const q = this.value.trim();
    const resultsEl = body.querySelector('#shop-5e-results');
    if (q.length < 2) { resultsEl.innerHTML = ''; return; }
    resultsEl.innerHTML = '<span style="color:#555;font-size:12px">Searching…</span>';
    searchTimer = setTimeout(async () => {
      try {
        const r = await fetch(`/api/5etools/item-search?q=${encodeURIComponent(q)}`);
        const items = await r.json();
        if (!items.length) {
          resultsEl.innerHTML = '<span style="color:#555;font-size:12px">No results.</span>';
          return;
        }
        resultsEl.innerHTML = '';
        for (const it of items) {
          const url = `http://localhost:2014/items.html#${it.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${it.source.toLowerCase()}`;
          const div = document.createElement('div');
          div.style.cssText = 'padding:5px 0;border-bottom:1px solid #222;font-family:sans-serif;font-size:13px;display:flex;gap:10px;align-items:baseline';
          div.innerHTML = `
            <a href="${url}" target="_blank" style="color:#c9b37e;text-decoration:none;flex:1">${escapeHtml(it.name)}</a>
            <span style="color:#555;font-size:11px">${escapeHtml(it.source)}</span>
            ${it.rarity && it.rarity !== 'none' ? `<span style="color:#888;font-size:11px">${escapeHtml(it.rarity)}</span>` : ''}`;
          resultsEl.appendChild(div);
        }
      } catch {
        resultsEl.innerHTML = '<span style="color:#f38ba8;font-size:12px">5etools offline or unavailable.</span>';
      }
    }, 300);
  });
```

- [ ] **Step 3: Test live search**

With 5etools running at port 2014, open Shops tab and type "sword" in the 5etools search box. Expect up to 20 results appearing with clickable links. With 5etools offline, expect graceful error message.

- [ ] **Step 4: Commit**
```bash
git add web/public/app.js
git commit -m "feat: shops — live 5etools item search panel"
```

---

## Self-Review

**Spec coverage:**
- [x] New tab in tabbar → Task 1
- [x] Hybrid JSON manifest + markdown (JSON manifests, markdown descriptions in keeper/desc fields) → Tasks 2–3
- [x] Session-only cart → Task 6 (`shopCart` in-memory array)
- [x] Local 5etools links → Task 7 (`build5etoolsItemUrl`)
- [x] Live 5etools search → Tasks 5 + 8
- [x] Aevoria pricing data seeded from common-goods.md → Tasks 2–3

**Placeholder scan:** All code is complete. No TBD/TODO markers. All function references exist within this plan.

**Type consistency:** `shopCart` uses `{ name, shopId, gp, sp, qty }` consistently across Tasks 6, 7. `buildItemRow` references `it.gp`, `it.sp`, `it.shopId` matching the manifest schema defined in Tasks 2–3.
