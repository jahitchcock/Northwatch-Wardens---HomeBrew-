'use strict';

window.SoundPlayer = (() => {
  // ── State ──────────────────────────────────────────────────────────────────
  const FADE_MS = 1500;
  let crossfadeGen = 0;

  let scenes = [];
  let effects = [];
  let activeEl = null;
  let currentScene = null;
  let suggestedScene = null;
  let volume = 0.7;
  let looping = true;

  // ── DOM refs ───────────────────────────────────────────────────────────────
  let sndA, sndB, nameEl, playBtn, loopBtn, volSlider, quickArea, suggestLabel;
  let fxPanelEl, fxBtnEl;

  // ── Init ───────────────────────────────────────────────────────────────────
  async function init() {
    sndA = document.getElementById('snd-a');
    sndB = document.getElementById('snd-b');
    nameEl = document.getElementById('snd-name');
    playBtn = document.getElementById('snd-play');
    loopBtn = document.getElementById('snd-loop');
    volSlider = document.getElementById('snd-vol');
    quickArea = document.getElementById('snd-quick');
    suggestLabel = document.getElementById('snd-suggest-label');
    fxPanelEl = document.getElementById('snd-fx-panel');
    fxBtnEl   = document.getElementById('snd-fx-btn');

    // Restore persisted state
    const storedVol = parseFloat(localStorage.getItem('soundbar-volume'));
    volume = isNaN(storedVol) ? 0.7 : Math.min(1, Math.max(0, storedVol));
    looping = localStorage.getItem('soundbar-loop') !== 'false';
    const lastScene = localStorage.getItem('soundbar-scene');

    volSlider.value = Math.round(volume * 100);
    loopBtn.classList.toggle('snd-loop-on', looping);

    // Wire controls (play/stop, loop, volume)
    playBtn.addEventListener('click', () => {
      if (!currentScene) return;
      if (activeEl && !activeEl.paused) stop();
      else play(currentScene);
    });

    loopBtn.addEventListener('click', () => {
      looping = !looping;
      localStorage.setItem('soundbar-loop', String(looping));
      loopBtn.classList.toggle('snd-loop-on', looping);
      if (activeEl) activeEl.loop = looping;
    });

    volSlider.addEventListener('input', () => {
      volume = parseInt(volSlider.value, 10) / 100;
      localStorage.setItem('soundbar-volume', String(volume));
      if (activeEl && !activeEl.paused) activeEl.volume = volume;
    });

    // FX panel toggle
    if (fxBtnEl) {
      fxBtnEl.addEventListener('click', toggleFxPanel);
    }
    const fxClose = document.getElementById('snd-fx-close');
    if (fxClose) fxClose.addEventListener('click', closeFxPanel);

    // Close panel when clicking outside
    document.addEventListener('click', e => {
      if (!fxPanelEl || fxPanelEl.hidden) return;
      if (!fxPanelEl.contains(e.target) && e.target !== fxBtnEl) closeFxPanel();
    });

    // Load manifest + custom files
    try {
      const manifest = await fetch('/sounds/sounds.json').then(r => r.json());
      scenes = [...manifest.scenes];
      effects = manifest.effects || [];

      const customFiles = await fetch('/api/sounds/custom').then(r => r.json()).catch(() => []);
      for (const f of customFiles) {
        const id = f.replace(/\.[^.]+$/, '');
        const label = id.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        scenes.push({ id, label, files: [`custom/${f}`], keywords: [], custom: true });
      }

      renderQuickButtons();

      // Restore last scene name (no auto-play)
      if (lastScene) {
        const sc = scenes.find(s => s.id === lastScene);
        if (sc) { currentScene = sc.id; nameEl.textContent = sc.label; }
      }
      updateQuickButtonStates();
    } catch (e) {
      console.warn('SoundPlayer: failed to load manifest', e);
    }
  }

  // ── Render quick buttons ───────────────────────────────────────────────────
  function renderQuickButtons() {
    quickArea.innerHTML = '';
    scenes.filter(s => !s.custom).forEach(sc => {
      const btn = document.createElement('button');
      btn.className = 'snd-quick-btn';
      btn.dataset.sceneId = sc.id;
      btn.textContent = sc.label;
      btn.addEventListener('click', () => play(sc.id));
      quickArea.appendChild(btn);
    });

    const moreBtn = document.createElement('button');
    moreBtn.className = 'snd-more-btn';
    moreBtn.textContent = '+ More…';
    moreBtn.addEventListener('click', openMoreModal);
    quickArea.appendChild(moreBtn);
  }

  function updateQuickButtonStates() {
    const isPlaying = activeEl && !activeEl.paused;
    quickArea.querySelectorAll('.snd-quick-btn').forEach(btn => {
      const id = btn.dataset.sceneId;
      const sc = scenes.find(s => s.id === id);
      const isActive = id === currentScene && isPlaying;
      const isSuggested = id === suggestedScene && id !== currentScene;
      btn.classList.toggle('snd-active', isActive);
      btn.classList.toggle('snd-suggested', isSuggested);
      btn.textContent = sc ? (isSuggested ? sc.label + ' ❆' : sc.label) : id;
    });
    playBtn.textContent = isPlaying ? '■ Stop' : '▶ Play';
    suggestLabel.hidden = !suggestedScene;
  }

  // ── Playback ───────────────────────────────────────────────────────────────
  function crossfade(fromEl, toEl, targetVol, done) {
    const gen = ++crossfadeGen;
    const duration = FADE_MS;
    const startTime = performance.now();
    const fromStartVol = fromEl ? fromEl.volume : 0;

    function tick(now) {
      if (crossfadeGen !== gen) return;
      const t = Math.min((now - startTime) / duration, 1);
      toEl.volume = t * targetVol;
      if (fromEl) fromEl.volume = (1 - t) * fromStartVol;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        if (fromEl) {
          fromEl.pause();
          fromEl.src = '';
        }
        if (done) done();
      }
    }

    requestAnimationFrame(tick);
  }

  function play(sceneId, specificFile) {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;

    const toEl = activeEl === sndA ? sndB : sndA;
    const file = specificFile
      ? scene.files.find(f => f === specificFile || f.endsWith('/' + specificFile)) || scene.files[0]
      : scene.files[Math.floor(Math.random() * scene.files.length)];

    toEl.src = '/sounds/' + file;
    toEl.loop = looping;
    toEl.volume = 0;

    currentScene = scene.id;
    nameEl.textContent = scene.label + ' …';
    localStorage.setItem('soundbar-scene', scene.id);

    const fromEl = activeEl;
    const doPlay = () => {
      nameEl.textContent = scene.label;
      toEl.play().catch(() => {});
      toEl.addEventListener('ended', () => { if (!looping) stop(); }, { once: true });
      crossfade(fromEl, toEl, volume, () => {
        activeEl = toEl;
        updateQuickButtonStates();
      });
    };

    if (toEl.readyState >= 3) {
      doPlay();
    } else {
      toEl.addEventListener('canplay', doPlay, { once: true });
    }
  }

  function stop() {
    nameEl.textContent = '— stopped —';
    localStorage.setItem('soundbar-scene', '');

    if (!activeEl || activeEl.paused) {
      activeEl = null;
      currentScene = null;
      updateQuickButtonStates();
      return;
    }

    const elToStop = activeEl;
    const startVol = elToStop.volume;
    activeEl = null;
    currentScene = null;
    updateQuickButtonStates();

    const gen = ++crossfadeGen;
    const duration = FADE_MS;
    const startTime = performance.now();

    function tick(now) {
      if (crossfadeGen !== gen) return;
      const t = Math.min((now - startTime) / duration, 1);
      elToStop.volume = (1 - t) * startVol;
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        elToStop.pause();
        elToStop.src = '';
      }
    }

    requestAnimationFrame(tick);
  }

  // ── Suggestion ────────────────────────────────────────────────────────────
  function suggest(filepath) {
    if (!suggestLabel) return;

    suggestedScene = null;

    const tokens = filepath.toLowerCase().split(/[/\\._-]/);

    for (const scene of scenes) {
      if (!scene.keywords || scene.keywords.length === 0) continue;
      const match = scene.keywords.some(kw => tokens.includes(kw.toLowerCase()));
      if (match) {
        if (scene.id === currentScene) break; // already playing, no suggestion needed
        suggestedScene = scene.id;
        break;
      }
    }

    updateQuickButtonStates();
  }

  // ── More modal ─────────────────────────────────────────────────────────────
  function openMoreModal() {
    const sceneRows = scenes.map(sc => {
      const tag = sc.custom ? ' <em style="opacity:0.6">(custom)</em>' : '';
      const multiFile = sc.files && sc.files.length > 1;
      const fileList = multiFile ? sc.files.map(f => {
        const fname = f.split('/').pop();
        return `<div class="snd-modal-ver" data-scene-id="${sc.id}" data-file="${fname}" style="padding:4px 10px 4px 24px;cursor:pointer;border-radius:4px;font-size:0.85em;color:#888;">↳ ${fname}</div>`;
      }).join('') : '';
      return `<div class="snd-modal-row" data-scene-id="${sc.id}" style="padding:6px 10px;cursor:pointer;border-radius:4px;">
      ${sc.label}${tag}${multiFile ? ' <span style="font-size:0.75em;opacity:0.5">(random)</span>' : ''}
    </div>${fileList}`;
    }).join('');

    const html = `
    <input id="snd-modal-search" type="text" placeholder="Search scenes…"
      style="width:100%;box-sizing:border-box;padding:6px 8px;margin-bottom:10px;background:#1a1a1a;border:1px solid #333;color:#cdd6f4;border-radius:4px;">
    <div id="snd-modal-list">${sceneRows}</div>
  `;

    window.dmOpenModalRaw('Ambient Scenes', html);

    requestAnimationFrame(() => {
      const search = document.getElementById('snd-modal-search');
      const list = document.getElementById('snd-modal-list');
      if (search) {
        search.addEventListener('input', () => {
          const q = search.value.toLowerCase();
          list.querySelectorAll('.snd-modal-row, .snd-modal-ver').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
          });
        });
      }
      if (list) {
        list.addEventListener('click', e => {
          const ver = e.target.closest('.snd-modal-ver');
          if (ver) { SoundPlayer.playFile(ver.dataset.sceneId, ver.dataset.file); return; }
          const row = e.target.closest('.snd-modal-row');
          if (row) SoundPlayer.play(row.dataset.sceneId);
        });
        list.addEventListener('mouseover', e => {
          const t = e.target.closest('.snd-modal-row, .snd-modal-ver');
          if (t) t.style.background = '#2a2a2a';
        });
        list.addEventListener('mouseout', e => {
          const t = e.target.closest('.snd-modal-row, .snd-modal-ver');
          if (t) t.style.background = '';
        });
      }
    });
  }

  // ── Effects panel ─────────────────────────────────────────────────────────
  function renderEffectsPanel() {
    const grid = document.getElementById('snd-fx-grid');
    if (!grid || !effects.length) return;

    // Group by category
    const categories = [];
    const catMap = {};
    effects.forEach(fx => {
      if (!catMap[fx.category]) {
        catMap[fx.category] = [];
        categories.push(fx.category);
      }
      catMap[fx.category].push(fx);
    });

    grid.innerHTML = '';
    categories.forEach(cat => {
      const label = document.createElement('div');
      label.className = 'snd-fx-category';
      label.textContent = cat;
      grid.appendChild(label);

      const row = document.createElement('div');
      row.className = 'snd-fx-row';
      catMap[cat].forEach(fx => {
        const btn = document.createElement('button');
        btn.className = 'snd-fx-btn';
        btn.textContent = fx.label;
        btn.title = fx.id;
        btn.addEventListener('click', () => {
          playEffect(fx);
          btn.classList.add('snd-fx-flash');
          setTimeout(() => btn.classList.remove('snd-fx-flash'), 300);
        });
        row.appendChild(btn);
      });
      grid.appendChild(row);
    });
  }

  function toggleFxPanel() {
    if (!fxPanelEl) return;
    if (fxPanelEl.hidden) {
      fxPanelEl.hidden = false;
      fxBtnEl.classList.add('snd-fx-open');
      if (!document.getElementById('snd-fx-grid').children.length) renderEffectsPanel();
    } else {
      closeFxPanel();
    }
  }

  function closeFxPanel() {
    if (fxPanelEl) fxPanelEl.hidden = true;
    if (fxBtnEl) fxBtnEl.classList.remove('snd-fx-open');
  }

  function playEffect(fx) {
    const el = new Audio('/sounds/' + fx.file);
    el.volume = volume;
    el.play().catch(() => {});
    el.addEventListener('ended', () => el.src = '', { once: true });
  }

  function sfx(id) {
    const fx = effects.find(e => e.id === id);
    if (fx) playEffect(fx);
  }

  function playFile(sceneId, filename) {
    play(sceneId, filename);
  }

  return { init, play, stop, suggest, playEffect, sfx, playFile };
})();
