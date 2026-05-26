'use strict';

window.SoundPlayer = (() => {
  // ── State ──────────────────────────────────────────────────────────────────
  const FADE_MS = 1500;
  let crossfadeGen = 0;

  let scenes = [];
  let activeEl = null;
  let currentScene = null;
  let suggestedScene = null;
  let volume = 0.7;
  let looping = true;

  // ── DOM refs ───────────────────────────────────────────────────────────────
  let sndA, sndB, nameEl, playBtn, loopBtn, volSlider, quickArea, suggestLabel;

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

    // Load manifest + custom files
    try {
      const manifest = await fetch('/sounds/sounds.json').then(r => r.json());
      scenes = [...manifest.scenes];

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

  function play(sceneId) {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;

    const toEl = activeEl === sndA ? sndB : sndA;
    const file = scene.files[Math.floor(Math.random() * scene.files.length)];
    toEl.src = '/sounds/' + file;
    toEl.loop = looping;
    toEl.volume = 0;
    toEl.play().catch(() => {});

    toEl.addEventListener('ended', () => { if (!looping) stop(); }, { once: true });

    currentScene = scene.id;
    crossfade(activeEl, toEl, volume, () => {
      activeEl = toEl;
      updateQuickButtonStates();
    });

    nameEl.textContent = scene.label;
    localStorage.setItem('soundbar-scene', scene.id);
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
    const rows = scenes.map(sc => {
      const tag = sc.custom ? ' <em style="opacity:0.6">(custom)</em>' : '';
      return `<div class="snd-modal-row" data-scene-id="${sc.id}" style="padding:6px 10px;cursor:pointer;border-radius:4px;">${sc.label}${tag}</div>`;
    }).join('');

    const html = `
      <input id="snd-modal-search" type="text" placeholder="Search scenes…"
        style="width:100%;box-sizing:border-box;padding:6px 8px;margin-bottom:10px;background:#1a1a1a;border:1px solid #333;color:#cdd6f4;border-radius:4px;">
      <div id="snd-modal-list">${rows}</div>
    `;

    window.dmOpenModalRaw('Ambient Scenes', html);

    // Wire up after modal is in DOM
    requestAnimationFrame(() => {
      const search = document.getElementById('snd-modal-search');
      const list = document.getElementById('snd-modal-list');
      if (search) {
        search.addEventListener('input', () => {
          const q = search.value.toLowerCase();
          list.querySelectorAll('.snd-modal-row').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
          });
        });
      }
      if (list) {
        list.addEventListener('click', e => {
          const row = e.target.closest('.snd-modal-row');
          if (!row) return;
          SoundPlayer.play(row.dataset.sceneId);
        });
        list.addEventListener('mouseover', e => {
          const row = e.target.closest('.snd-modal-row');
          if (row) row.style.background = '#2a2a2a';
        });
        list.addEventListener('mouseout', e => {
          const row = e.target.closest('.snd-modal-row');
          if (row) row.style.background = '';
        });
      }
    });
  }

  return { init, play, stop, suggest };
})();
