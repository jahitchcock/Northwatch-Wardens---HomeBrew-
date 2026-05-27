# DM Login Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Password-protect all DM routes behind a simple login page, while leaving designated player-facing routes open, using a signed session cookie — no database or third-party auth library required.

**Architecture:** A `requireAuth` middleware reads a signed cookie (`dm_auth`). If absent or invalid, it redirects HTML requests to `/login` and returns 401 for API requests. `POST /api/login` validates the password (from env var `DM_PASSWORD`, default `TPK`) and sets the cookie. `GET /login` serves a static login page. The cookie is signed with a server-side secret to prevent forgery. No `express-session` dependency — uses Node's built-in `crypto.createHmac`.

**Tech Stack:** Node.js/Express, `cookie-parser` npm package (already or easily added), `crypto` (Node built-in). Login page is a plain HTML file.

---

## File Map

| File | Change |
|---|---|
| `web/server.js` | Add `cookie-parser`, auth middleware, `POST /api/login`, `GET /login`, `GET /api/logout`; apply `requireAuth` to all existing routes |
| `web/public/login.html` | New static login page |
| `web/public/style.css` | Add login page styles (`.login-wrap`, `.login-card`) |

---

## Task 1: Install `cookie-parser`

**Files:**
- Modify: `web/package.json`

- [ ] **Step 1: Install the package**

```bash
cd web && npm install cookie-parser
```

Expected: `cookie-parser` appears in `web/package.json` dependencies.

- [ ] **Step 2: Commit**

```bash
git add web/package.json web/package-lock.json
git commit -m "chore: add cookie-parser dependency for DM auth"
```

---

## Task 2: Auth middleware + login/logout routes

**Files:**
- Modify: `web/server.js`

- [ ] **Step 1: Add cookie-parser and auth constants near the top of `web/server.js`**

Find the existing requires block near the top of `server.js` (the `const express = require('express')` line). Add after the existing requires:

```javascript
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const DM_PASSWORD = process.env.DM_PASSWORD || 'TPK';
const COOKIE_SECRET = process.env.COOKIE_SECRET || crypto.randomBytes(32).toString('hex');
const COOKIE_NAME = 'dm_auth';
```

- [ ] **Step 2: Mount `cookie-parser` middleware**

Find the line `app.use(express.json());` (near the top of the server setup) and add cookie-parser directly after it:

```javascript
app.use(cookieParser());
```

- [ ] **Step 3: Add the `requireAuth` middleware function**

Add this block after the cookie-parser mount (before any route definitions):

```javascript
// ─── Auth middleware ───────────────────────────────────────────────────────────

// Routes that bypass auth (player-facing + login itself)
const PUBLIC_PREFIXES = ['/login', '/api/login', '/api/logout'];

function signValue(val) {
  return val + '.' + crypto.createHmac('sha256', COOKIE_SECRET).update(val).digest('hex');
}

function verifyValue(signed) {
  if (!signed) return null;
  const dot = signed.lastIndexOf('.');
  if (dot === -1) return null;
  const val = signed.slice(0, dot);
  const expected = signValue(val);
  return crypto.timingSafeEqual(Buffer.from(signed), Buffer.from(expected)) ? val : null;
}

function requireAuth(req, res, next) {
  // Always allow public routes
  if (PUBLIC_PREFIXES.some(p => req.path.startsWith(p))) return next();

  const token = verifyValue(req.cookies[COOKIE_NAME]);
  if (token === 'dm') return next();

  // API request → 401
  if (req.path.startsWith('/api/') || req.headers['accept']?.includes('application/json')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // HTML request → redirect to login
  res.redirect('/login');
}

app.use(requireAuth);
```

- [ ] **Step 4: Add `GET /login`, `POST /api/login`, and `GET /api/logout` routes**

Add these before any other route definitions (after the `app.use(requireAuth)` line):

```javascript
// ─── Login / logout routes ─────────────────────────────────────────────────────

app.get('/login', (req, res) => {
  // Already logged in → redirect home
  if (verifyValue(req.cookies[COOKIE_NAME]) === 'dm') return res.redirect('/');
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/api/login', express.json(), (req, res) => {
  const { password } = req.body || {};
  if (!password || password !== DM_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password' });
  }
  const signed = signValue('dm');
  res.cookie(COOKIE_NAME, signed, {
    httpOnly: true,
    sameSite: 'lax',
    // No maxAge → session cookie (clears when browser closes)
  });
  res.json({ ok: true });
});

app.get('/api/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect('/login');
});
```

- [ ] **Step 5: Write a manual test script**

Create `web/test-auth.js` (delete after verifying):

```javascript
const http = require('http');

function req(opts, body) {
  return new Promise((resolve, reject) => {
    const r = http.request({ hostname: 'localhost', port: 5050, ...opts }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: d }));
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

async function run() {
  // Unauthenticated API request → 401
  let r = await req({ path: '/api/npcs', headers: { accept: 'application/json' } });
  console.assert(r.status === 401, `Expected 401, got ${r.status}`);
  console.log('PASS: unauthenticated API → 401');

  // Wrong password → 401
  r = await req({ method: 'POST', path: '/api/login',
    headers: { 'Content-Type': 'application/json' } }, JSON.stringify({ password: 'wrong' }));
  console.assert(r.status === 401, `Expected 401, got ${r.status}`);
  console.log('PASS: wrong password → 401');

  // Correct password → cookie set
  r = await req({ method: 'POST', path: '/api/login',
    headers: { 'Content-Type': 'application/json' } }, JSON.stringify({ password: 'TPK' }));
  console.assert(r.status === 200, `Expected 200, got ${r.status}`);
  const cookie = r.headers['set-cookie']?.[0];
  console.assert(cookie?.includes('dm_auth'), 'Should set dm_auth cookie');
  console.log('PASS: correct password → cookie set');

  // Authenticated API request → 200
  r = await req({ path: '/api/npcs', headers: { accept: 'application/json', cookie } });
  console.assert(r.status === 200, `Expected 200, got ${r.status}`);
  console.log('PASS: authenticated request → 200');
}
run().catch(console.error);
```

- [ ] **Step 6: Restart server and run test**

Server must be restarted to pick up `cookie-parser` and new routes.

```bash
node web/test-auth.js
```
Expected: 4 PASS lines.

- [ ] **Step 7: Clean up and commit**

```bash
rm web/test-auth.js
git add web/server.js
git commit -m "feat: DM auth middleware — requireAuth, POST /api/login, GET /api/logout"
```

---

## Task 3: Login page HTML + styles

**Files:**
- Create: `web/public/login.html`
- Modify: `web/public/style.css` (append)

- [ ] **Step 1: Create `web/public/login.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DM Panel — Login</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body class="login-page">
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-title">Northwatch Wardens</div>
      <div class="login-subtitle">DM Panel</div>
      <form id="login-form" autocomplete="off">
        <input
          id="login-pw"
          type="password"
          class="login-input"
          placeholder="Password"
          autofocus
          autocomplete="current-password">
        <div id="login-error" class="login-error" hidden>Wrong password.</div>
        <button type="submit" class="login-btn">Enter</button>
      </form>
    </div>
  </div>
  <script>
    document.getElementById('login-form').addEventListener('submit', async e => {
      e.preventDefault();
      const pw = document.getElementById('login-pw').value;
      const errEl = document.getElementById('login-error');
      errEl.hidden = true;
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) {
        window.location.href = '/';
      } else {
        errEl.hidden = false;
        document.getElementById('login-pw').value = '';
        document.getElementById('login-pw').focus();
      }
    });
  </script>
</body>
</html>
```

- [ ] **Step 2: Append login styles to `web/public/style.css`**

```css
/* ── Login Page ──────────────────────────────────────── */
.login-page {
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
}
.login-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.login-card {
  background: #1e1e2e;
  border: 1px solid #313244;
  border-radius: 10px;
  padding: 36px 40px;
  width: min(340px, 90vw);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  text-align: center;
}
.login-title {
  font-size: 18px;
  font-weight: bold;
  color: #cdd6f4;
  margin-bottom: 4px;
  font-family: 'Segoe UI', system-ui, sans-serif;
}
.login-subtitle {
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 28px;
}
.login-input {
  width: 100%;
  background: #111;
  border: 1px solid #444;
  border-radius: 6px;
  color: #cdd6f4;
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
  margin-bottom: 10px;
  text-align: center;
  letter-spacing: 0.15em;
}
.login-input:focus { outline: none; border-color: #89b4fa; }
.login-error {
  color: #f38ba8;
  font-size: 12px;
  margin-bottom: 10px;
}
.login-btn {
  width: 100%;
  background: #89b4fa;
  border: none;
  border-radius: 6px;
  color: #1e1e2e;
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  font-family: inherit;
}
.login-btn:hover { background: #b4d0ff; }
```

- [ ] **Step 3: Verify in browser**

1. Open `http://localhost:5050` in a private/incognito window → redirects to `/login`
2. Enter wrong password → "Wrong password." error shown
3. Enter `TPK` → redirects to `/` (main panel loads)
4. Open `http://localhost:5050/api/logout` → redirected back to login
5. Existing sessions still work (cookie persists until browser closes)

- [ ] **Step 4: Commit**

```bash
git add web/public/login.html web/public/style.css
git commit -m "feat: login page — password entry with error state and redirect"
```

---

## Self-Review

| Spec requirement | Task |
|---|---|
| DM routes protected | Task 2 (`requireAuth` middleware applied globally) |
| Wrong password → 401 | Task 2 (`POST /api/login` check) |
| Cookie set on login | Task 2 (signed `dm_auth` cookie) |
| Session cookie (clears on browser close) | Task 2 (no `maxAge`) |
| API requests → 401 json | Task 2 (`requireAuth` API branch) |
| HTML requests → redirect `/login` | Task 2 (`requireAuth` HTML branch) |
| `/login` route bypasses auth | Task 2 (`PUBLIC_PREFIXES`) |
| Password from env var | Task 2 (`process.env.DM_PASSWORD \|\| 'TPK'`) |
| Cookie signed to prevent forgery | Task 2 (`signValue` / `verifyValue` with HMAC) |
| Login page renders correctly | Task 3 |
| Logout clears cookie | Task 2 (`GET /api/logout`) |
