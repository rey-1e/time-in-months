/**
 * newtab.js — Moments Extension
 */

'use strict';

const THEMES = [
  // ── DARK THEMES (1-15) ──────────────────────────────────────────────────
  { id: 'classic', name: 'Classic Moments', bg: '#16192b', lived: '#ff6b00', current: '#00ceb9', text: '#f1f5f9', textMed: '#94a3b8', textDark: '#2d354f', left: '#ff8533', modalBg: '#22273d', inputBg: '#2d3454', borderLight: '#3d476f' },
  { id: 'nordic', name: 'Nordic Frost', bg: '#1e293b', lived: '#38bdf8', current: '#34d399', text: '#f8fafc', textMed: '#94a3b8', textDark: '#334155', left: '#0284c7', modalBg: '#334155', inputBg: '#1e293b', borderLight: '#475569' },
  { id: 'tokyo', name: 'Tokyo Neon', bg: '#211f30', lived: '#ff007f', current: '#00f0ff', text: '#f1f5f9', textMed: '#a5b4fc', textDark: '#312e4d', left: '#ff3399', modalBg: '#2d2a45', inputBg: '#211f30', borderLight: '#3e3b5e' },
  { id: 'moss', name: 'Forest Moss', bg: '#1c261e', lived: '#a3e635', current: '#22c55e', text: '#f0fdf4', textMed: '#a7f3d0', textDark: '#2b3d2f', left: '#84cc16', modalBg: '#283a2d', inputBg: '#1c261e', borderLight: '#3b5442' },
  { id: 'sunset', name: 'Sunset Boulevard', bg: '#2b1c2b', lived: '#f43f5e', current: '#fbbf24', text: '#fff1f2', textMed: '#f5d0fe', textDark: '#432b43', left: '#fb7185', modalBg: '#3d283d', inputBg: '#2b1c2b', borderLight: '#543854' },
  { id: 'noir', name: 'Monochrome Noir', bg: '#27272a', lived: '#fafafa', current: '#a1a1aa', text: '#fafafa', textMed: '#d4d4d8', textDark: '#3f3f46', left: '#f4f4f5', modalBg: '#3f3f46', inputBg: '#27272a', borderLight: '#52525b' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', bg: '#1e1e2f', lived: '#fdf009', current: '#00ffff', text: '#ffffff', textMed: '#9ca3af', textDark: '#2d2d47', left: '#eab308', modalBg: '#2b2b40', inputBg: '#1e1e2f', borderLight: '#3e3e5c' },
  { id: 'sakura', name: 'Sakura Blossom', bg: '#2d1c25', lived: '#ec4899', current: '#fda4af', text: '#fff1f2', textMed: '#fbcfe8', textDark: '#452b39', left: '#f472b6', modalBg: '#3f2734', inputBg: '#2d1c25', borderLight: '#573648' },
  { id: 'ocean', name: 'Deep Sea', bg: '#1a263b', lived: '#3b82f6', current: '#60a5fa', text: '#f8fafc', textMed: '#93c5fd', textDark: '#2e3f5c', left: '#2563eb', modalBg: '#263652', inputBg: '#1a263b', borderLight: '#364c73' },
  { id: 'espresso', name: 'Espresso Brew', bg: '#2d221c', lived: '#f59e0b', current: '#fcd34d', text: '#fffbeb', textMed: '#fde68a', textDark: '#43332a', left: '#d97706', modalBg: '#3e3027', inputBg: '#2d221c', borderLight: '#574337' },
  { id: 'slate', name: 'Slate Industrial', bg: '#334155', lived: '#cbd5e1', current: '#38bdf8', text: '#f8fafc', textMed: '#cbd5e1', textDark: '#475569', left: '#cbd5e1', modalBg: '#475569', inputBg: '#334155', borderLight: '#64748b' },
  { id: 'velvet', name: 'Crimson Velvet', bg: '#2e1b1e', lived: '#f43f5e', current: '#fda4af', text: '#fff5f5', textMed: '#fecdd3', textDark: '#4a2c31', left: '#e11d48', modalBg: '#40262b', inputBg: '#2e1b1e', borderLight: '#5c383f' },
  { id: 'mint', name: 'Emerald Mint', bg: '#1c2b24', lived: '#10b981', current: '#6ee7b7', text: '#f0fdf4', textMed: '#a7f3d0', textDark: '#2d453a', left: '#059669', modalBg: '#283e33', inputBg: '#1c2b24', borderLight: '#3b5a4b' },
  { id: 'nebula', name: 'Space Nebula', bg: '#1e1b30', lived: '#a78bfa', current: '#f472b6', text: '#fdf4ff', textMed: '#ddd6fe', textDark: '#2f2b4a', left: '#8b5cf6', modalBg: '#2b2745', inputBg: '#1e1b30', borderLight: '#3e3963' },
  { id: 'obsidian', name: 'Obsidian Zinc', bg: '#313135', lived: '#f4f4f5', current: '#cbd5e1', text: '#ffffff', textMed: '#d4d4d8', textDark: '#4b4b4f', left: '#e4e4e7', modalBg: '#414145', inputBg: '#313135', borderLight: '#515155' },

  // ── LIGHT THEMES (16-30) ─────────────────────────────────────────────────
  { id: 'paper', name: 'Classic Paper', bg: '#fcfcf9', lived: '#1c1c1e', current: '#ff3b30', text: '#1c1c1e', textMed: '#68686e', textDark: '#cbd5e1', left: '#3a3a3c', modalBg: '#ffffff', inputBg: '#f2f2f7', borderLight: '#cbd5e1' },
  { id: 'iceberg', name: 'Polar Iceberg', bg: '#f0f4f8', lived: '#0284c7', current: '#0d9488', text: '#1e293b', textMed: '#475569', textDark: '#cbd5e1', left: '#0369a1', modalBg: '#ffffff', inputBg: '#f8fafc', borderLight: '#cbd5e1' },
  { id: 'sand', name: 'Sahara Sand', bg: '#faf6ed', lived: '#c2410c', current: '#b45309', text: '#451a03', textMed: '#78350f', textDark: '#e9ddc7', left: '#9a3412', modalBg: '#ffffff', inputBg: '#fdfbf7', borderLight: '#f1e3cc' },
  { id: 'cream', name: 'Berries & Cream', bg: '#fdf2f4', lived: '#db2777', current: '#f43f5e', text: '#4c0519', textMed: '#9d174d', textDark: '#fad2e1', left: '#be123c', modalBg: '#ffffff', inputBg: '#fffdfd', borderLight: '#fad2e1' },
  { id: 'lavender_light', name: 'Lavender Fields', bg: '#f5f3ff', lived: '#7c3aed', current: '#ec4899', text: '#1e1b4b', textMed: '#4f46e5', textDark: '#ddd6fe', left: '#6d28d9', modalBg: '#ffffff', inputBg: '#faf9ff', borderLight: '#ddd6fe' },
  { id: 'mint_light', name: 'Fresh Mint', bg: '#f0fdf4', lived: '#059669', current: '#0891b2', text: '#062f4f', textMed: '#047857', textDark: '#cbd5e1', left: '#065f46', modalBg: '#ffffff', inputBg: '#f7fdf9', borderLight: '#d1fae5' },
  { id: 'chalk', name: 'Slate Chalk', bg: '#f4f4f5', lived: '#18181b', current: '#f97316', text: '#27272a', textMed: '#52525b', textDark: '#e4e4e7', left: '#3f3f46', modalBg: '#ffffff', inputBg: '#fafafa', borderLight: '#e4e4e7' },
  { id: 'peach', name: 'Peach Sorbet', bg: '#fff7ed', lived: '#ea580c', current: '#e11d48', text: '#431407', textMed: '#9a3412', textDark: '#fed7aa', left: '#c2410c', modalBg: '#ffffff', inputBg: '#fffbf7', borderLight: '#fed7aa' },
  { id: 'mist', name: 'Slate Mist', bg: '#f8fafc', lived: '#475569', current: '#0f766e', text: '#0f172a', textMed: '#334155', textDark: '#e2e8f0', left: '#1e293b', modalBg: '#ffffff', inputBg: '#f1f5f9', borderLight: '#e2e8f0' },
  { id: 'solar_light', name: 'Solar Wind', bg: '#fefce8', lived: '#b45309', current: '#ea580c', text: '#451a03', textMed: '#78350f', textDark: '#fef08a', left: '#d97706', modalBg: '#ffffff', inputBg: '#fffbeb', borderLight: '#fef08a' },
  { id: 'sky', name: 'Sky Horizon', bg: '#f0f9ff', lived: '#0369a1', current: '#0284c7', text: '#0c4a6e', textMed: '#0284c7', textDark: '#cbd5e1', left: '#0369a1', modalBg: '#ffffff', inputBg: '#f7fcff', borderLight: '#e0f2fe' },
  { id: 'clay', name: 'Tuscan Clay', bg: '#fbf7f5', lived: '#9a3412', current: '#c2410c', text: '#431407', textMed: '#7c2d12', textDark: '#ebdcd3', left: '#b45309', modalBg: '#ffffff', inputBg: '#fdfbfa', borderLight: '#f1e4de' },
  { id: 'amethyst_light', name: 'Soft Amethyst', bg: '#faf5ff', lived: '#6d28d9', current: '#a21caf', text: '#2e1065', textMed: '#5b21b6', textDark: '#cbd5e1', left: '#4c1d95', modalBg: '#ffffff', inputBg: '#fdfaff', borderLight: '#f3e8ff' },
  { id: 'cyber_light', name: 'Retro Terminal', bg: '#eef2f6', lived: '#0f172a', current: '#2563eb', text: '#020617', textMed: '#1e293b', textDark: '#cbd5e1', left: '#1d4ed8', modalBg: '#ffffff', inputBg: '#f8fafc', borderLight: '#cbd5e1' },
  { id: 'vintage', name: 'Vintage Sepia', bg: '#fcf8f2', lived: '#78350f', current: '#0f766e', text: '#2a170d', textMed: '#5c3d2e', textDark: '#ebd6b8', left: '#451a03', modalBg: '#ffffff', inputBg: '#fbf7f0', borderLight: '#f3e9db' }
];

/* ─── CLOCK ──────────────────────────────────────────────────────────────── */

let clockRafId = null;

function startClock() {
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  let lastSecond = -1;

  function tick() {
    if (document.visibilityState === 'hidden') {
      clockRafId = requestAnimationFrame(tick);
      return;
    }

    const now     = new Date();
    const seconds = now.getSeconds();

    if (seconds !== lastSecond) {
      hoursEl.textContent   = String(now.getHours()).padStart(2, '0');
      minutesEl.textContent = String(now.getMinutes()).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
      lastSecond = seconds;
    }

    clockRafId = requestAnimationFrame(tick);
  }

  clockRafId = requestAnimationFrame(tick);
}

/* ─── CONFIG ─────────────────────────────────────────────────────────────── */

const activeConfig = {
  birthdate:  '',
  expectancy: 90
};

/* ─── INIT ───────────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  try {
    chrome.storage.local.get(['birthdate', 'expectancy', 'theme'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('[Moments] Storage read error:', chrome.runtime.lastError);
        showOnboarding();
        return;
      }

      const activeThemeId = result.theme || 'classic';
      applyTheme(activeThemeId);

      const bd  = result.birthdate  ? String(result.birthdate).trim() : '';
      const exp = parseInt(result.expectancy, 10);

      if (bd && isValidStoredDate(bd)) {
        activeConfig.birthdate  = bd;
        activeConfig.expectancy = (!isNaN(exp) && exp >= 50 && exp <= 120) ? exp : 90;
        showDashboard();
      } else {
        showOnboarding();
      }
    });
  } catch (err) {
    console.error('[Moments] Unexpected init error:', err);
    showOnboarding();
  }

  startClock();
  setupOnboardingForm();
  setupStorageListener();
});

/* ─── THEME MANAGER ──────────────────────────────────────────────────────── */

function applyTheme(themeId) {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const root = document.documentElement;
  
  root.style.setProperty('--canvas-bg', theme.bg);
  root.style.setProperty('--text-primary', theme.text);
  root.style.setProperty('--text-gray-medium', theme.textMed);
  root.style.setProperty('--text-gray-dark', theme.textDark);
  root.style.setProperty('--color-orange', theme.lived);
  root.style.setProperty('--color-teal', theme.current);
  root.style.setProperty('--color-orange-dark', theme.left);
  root.style.setProperty('--modal-bg', theme.modalBg);
  root.style.setProperty('--input-bg', theme.inputBg);
  root.style.setProperty('--border-light', theme.borderLight);
}

/* ─── VALIDATION HELPERS ─────────────────────────────────────────────────── */

function isValidStoredDate(str) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
  const [y, m, d] = str.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth()    === m - 1 &&
    date.getDate()     === d
  );
}

function parseDateInputs(dVal, mVal, yVal) {
  if (
    isNaN(dVal) || isNaN(mVal) || isNaN(yVal) ||
    yVal < 1900 || yVal > 2100 ||
    mVal < 1    || mVal > 12   ||
    dVal < 1    || dVal > 31
  ) return null;

  const date = new Date(yVal, mVal - 1, dVal);
  if (
    date.getFullYear() !== yVal ||
    date.getMonth()    !== mVal - 1 ||
    date.getDate()     !== dVal
  ) return null;

  return date;
}

function formatStorageDate(d, m, y) {
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/* ─── SCREEN SWITCHING ───────────────────────────────────────────────────── */

function showDashboard() {
  document.getElementById('onboarding-screen').classList.add('hidden');
  const app = document.getElementById('app-container');
  app.classList.remove('hidden');
  void app.offsetWidth;
  initDashboard();
}

function showOnboarding() {
  document.getElementById('app-container').classList.add('hidden');
  const ob = document.getElementById('onboarding-screen');
  ob.classList.remove('hidden');
  void ob.offsetWidth;
  requestAnimationFrame(() => document.getElementById('ob-day')?.focus());
}

/* ─── ONBOARDING FORM ────────────────────────────────────────────────────── */

function setupOnboardingForm() {
  const obForm        = document.getElementById('onboarding-form');
  const obErrorBubble = document.getElementById('ob-error-bubble');
  const obDay         = document.getElementById('ob-day');
  const obMonth       = document.getElementById('ob-month');
  const obYear        = document.getElementById('ob-year');

  const hideError = () => obErrorBubble.classList.add('hidden');
  obDay.addEventListener('input',   hideError);
  obMonth.addEventListener('input', hideError);
  obYear.addEventListener('input',  hideError);

  obDay.addEventListener('input', () => {
    if (obDay.value.length >= 2) obMonth.focus();
  });
  obMonth.addEventListener('input', () => {
    if (obMonth.value.length >= 2) obYear.focus();
  });

  obForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const dVal = parseInt(obDay.value,   10);
    const mVal = parseInt(obMonth.value, 10);
    const yVal = parseInt(obYear.value,  10);

    if (!parseDateInputs(dVal, mVal, yVal)) {
      obErrorBubble.textContent = 'Invalid date';
      obErrorBubble.classList.remove('hidden');
      return;
    }

    activeConfig.birthdate  = formatStorageDate(dVal, mVal, yVal);
    activeConfig.expectancy = 90;

    chrome.storage.local.set(
      { birthdate: activeConfig.birthdate, expectancy: activeConfig.expectancy },
      () => {
        if (chrome.runtime.lastError) {
          obErrorBubble.textContent = 'Save failed. Try again.';
          obErrorBubble.classList.remove('hidden');
          return;
        }
        showDashboard();
      }
    );
  });
}

/* ─── STORAGE LISTENER ──────────────────────────────────────────────────── */

function setupStorageListener() {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;

    let needsRender = false;

    if (changes.theme && changes.theme.newValue) {
      applyTheme(changes.theme.newValue);
    }

    if (changes.birthdate && changes.birthdate.newValue) {
      const newBd = String(changes.birthdate.newValue).trim();
      if (isValidStoredDate(newBd)) {
        activeConfig.birthdate = newBd;
        needsRender = true;
      }
    }

    if (changes.expectancy && changes.expectancy.newValue) {
      const exp = parseInt(changes.expectancy.newValue, 10);
      if (!isNaN(exp) && exp >= 50 && exp <= 120) {
        activeConfig.expectancy = exp;
        needsRender = true;
      }
    }

    if (needsRender) initDashboard();
  });
}

/* ─── DASHBOARD RENDER ───────────────────────────────────────────────────── */

const domCache = {};

function cacheDom() {
  domCache.lived        = document.getElementById('lived-counter');
  domCache.left         = document.getElementById('left-counter');
  domCache.percent      = document.getElementById('percent-counter');
  domCache.birthLabel   = document.getElementById('scroll-state-label');
  domCache.activeMonth  = document.getElementById('active-month-label');
  domCache.hoverCount   = document.getElementById('hover-month-count');
  domCache.ageLimit     = document.getElementById('timeline-span-limit');
  domCache.grid         = document.getElementById('canvas-grid');
}

function initDashboard() {
  if (!domCache.grid) cacheDom();

  const parts      = activeConfig.birthdate.split('-');
  const birthYear  = parseInt(parts[0], 10);
  const birthMonth = parseInt(parts[1], 10) - 1;
  const birthDay   = parseInt(parts[2], 10);

  const birthDate = new Date(birthYear, birthMonth, birthDay);
  if (isNaN(birthDate.getTime())) return;

  const now = new Date();

  let monthsLived = (now.getFullYear() - birthDate.getFullYear()) * 12
                  + (now.getMonth()    - birthDate.getMonth());
  if (monthsLived < 0) monthsLived = 0;

  const totalMonths  = activeConfig.expectancy * 12;
  const monthsLeft   = Math.max(0, totalMonths - monthsLived);
  const percentLived = ((monthsLived / totalMonths) * 100).toFixed(1);

  domCache.lived.textContent   = monthsLived;
  domCache.left.textContent    = monthsLeft;
  domCache.percent.textContent = `${percentLived}%`;

  domCache.birthLabel.textContent  = birthDate
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  domCache.activeMonth.textContent = now
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  domCache.hoverCount.textContent  = `MONTH ${monthsLived}`;
  domCache.ageLimit.textContent    = `AGE ${activeConfig.expectancy}`;

  const defaultMonthLabel = domCache.activeMonth.textContent;
  const defaultHoverCount = domCache.hoverCount.textContent;

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalMonths; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot-cell';

    if (i < monthsLived) {
      dot.classList.add('lived');
    } else if (i === monthsLived) {
      dot.classList.add('current');
    }

    const dotDate     = new Date(birthDate.getFullYear(), birthDate.getMonth() + i, 1);
    const dotMonthStr = dotDate
      .toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
    const dotCountStr = `MONTH ${i + 1}`;

    dot.addEventListener('mouseenter', () => {
      domCache.activeMonth.textContent = dotMonthStr;
      domCache.hoverCount.textContent  = dotCountStr;
    });

    dot.addEventListener('mouseleave', () => {
      domCache.activeMonth.textContent = defaultMonthLabel;
      domCache.hoverCount.textContent  = defaultHoverCount;
    });

    fragment.appendChild(dot);
  }

  domCache.grid.innerHTML = '';
  domCache.grid.appendChild(fragment);
}