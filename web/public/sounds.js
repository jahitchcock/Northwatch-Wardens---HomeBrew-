'use strict';

window.SoundPlayer = (() => {
  // ── State ──────────────────────────────────────────────────────────────────
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
    volume = parseFloat(localStorage.getItem('soundbar-volume') ?? '0.7');
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
        scenes.push({ id, label, file: `custom/${f}`, keywords: [], custom: true });
      }

      renderQuickButtons();

      // Restore last scene name (no auto-play)
      if (lastScene) {
        const sc = scenes.find(s => s.id === lastScene);
        if (sc) { currentScene = sc.id; nameEl.textContent = sc.label; }
      }
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

    updateQuickButtonStates();
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

  // ── Playback stubs (implemented in Task 5) ─────────────────────────────────
  function crossfade(fromEl, toEl, targetVol, done) { if (done) done(); }
  function play(sceneId) { console.log('SoundPlayer: play stub -', sceneId); }
  function stop() { console.log('SoundPlayer: stop stub'); }

  // ── Suggestion stub (implemented in Task 7) ────────────────────────────────
  function suggest(filepath) {}

  // ── More modal stub (implemented in Task 8) ────────────────────────────────
  function openMoreModal() {}

  return { init, play, stop, suggest };
})();
