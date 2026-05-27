/**
 * newtab.js — Moments Extension
 */

'use strict';

const THEMES = [
  { id: 'classic', name: 'Classic Moments', bg: '#00020f', lived: '#ff6b00', current: '#00ceb9', text: '#bdbdbd', textMed: '#86868b', textDark: '#3b3b3b', left: '#b56024' },
  { id: 'nordic', name: 'Nordic Frost', bg: '#0f172a', lived: '#38bdf8', current: '#34d399', text: '#f1f5f9', textMed: '#94a3b8', textDark: '#334155', left: '#0284c7' },
  { id: 'tokyo', name: 'Tokyo Neon', bg: '#0d0e15', lived: '#ff007f', current: '#00f0ff', text: '#e2e8f0', textMed: '#718096', textDark: '#2a2b3d', left: '#b5005a' },
  { id: 'moss', name: 'Forest Moss', bg: '#0b130e', lived: '#a3e635', current: '#22c55e', text: '#f0fdf4', textMed: '#86efac', textDark: '#243c2c', left: '#65a30d' },
  { id: 'sunset', name: 'Sunset Boulevard', bg: '#140b18', lived: '#f43f5e', current: '#fbbf24', text: '#faf5ff', textMed: '#c084fc', textDark: '#2d1a36', left: '#be123c' },
  { id: 'noir', name: 'Monochrome Noir', bg: '#09090b', lived: '#f4f4f5', current: '#71717a', text: '#fafafa', textMed: '#a1a1aa', textDark: '#27272a', left: '#e4e4e7' },
  { id: 'cyberpunk', name: 'Cyberpunk 2077', bg: '#05050a', lived: '#fdf009', current: '#00ffff', text: '#ffffff', textMed: '#8b8ba7', textDark: '#1e1e38', left: '#c4ba04' },
  { id: 'sakura', name: 'Sakura Blossom', bg: '#140d12', lived: '#f472b6', current: '#f43f5e', text: '#fff1f2', textMed: '#fda4af', textDark: '#2e1b27', left: '#db2777' },
  { id: 'ocean', name: 'Deep Ocean', bg: '#020813', lived: '#2563eb', current: '#38bdf8', text: '#f8fafc', textMed: '#64748b', textDark: '#1e293b', left: '#1d4ed8' },
  { id: 'espresso', name: 'Espresso Brew', bg: '#120d0a', lived: '#d97706', current: '#fcd34d', text: '#fdfbf7', textMed: '#a27b5c', textDark: '#2d1f18', left: '#b45309' },
  { id: 'slate', name: 'Vintage Slate', bg: '#1a1c1e', lived: '#94a3b8', current: '#f1f5f9', text: '#f8fafc', textMed: '#64748b', textDark: '#334155', left: '#475569' },
  { id: 'crimson', name: 'Crimson Velvet', bg: '#120205', lived: '#dc2626', current: '#fb7185', text: '#fff5f5', textMed: '#f87171', textDark: '#320b11', left: '#991b1b' },
  { id: 'mint', name: 'Ethereal Mint', bg: '#06100e', lived: '#059669', current: '#a7f3d0', text: '#f0fdf4', textMed: '#34d399', textDark: '#1a2e29', left: '#047857' },
  { id: 'lavender', name: 'Lavender Fields', bg: '#0d0b18', lived: '#8b5cf6', current: '#c084fc', text: '#faf5ff', textMed: '#a78bfa', textDark: '#241e3a', left: '#6d28d9' },
  { id: 'solar', name: 'Solar Gold', bg: '#0f0d02', lived: '#ca8a04', current: '#facc15', text: '#fefdf0', textMed: '#e11d48', textDark: '#2e290f', left: '#a16207' },
  { id: 'steel', name: 'Steel Industrial', bg: '#111827', lived: '#9ca3af', current: '#e5e7eb', text: '#f9fafb', textMed: '#9ca3af', textDark: '#374151', left: '#4b5563' },
  { id: 'toxic', name: 'Toxic Wasteland', bg: '#030712', lived: '#22c55e', current: '#d9f99d', text: '#f3f4f6', textMed: '#9ca3af', textDark: '#111827', left: '#16a34a' },
  { id: 'aurora', name: 'Aura Borealis', bg: '#020617', lived: '#10b981', current: '#818cf8', text: '#f8fafc', textMed: '#94a3b8', textDark: '#1e293b', left: '#047857' },
  { id: 'barbie', name: 'Barbie Dream', bg: '#1a0512', lived: '#ec4899', current: '#fbcfe8', text: '#fff1f2', textMed: '#f472b6', textDark: '#370d28', left: '#db2777' },
  { id: 'amethyst', name: 'Royal Amethyst', bg: '#0c021a', lived: '#7c3aed', current: '#a78bfa', text: '#f5f3ff', textMed: '#ddd6fe', textDark: '#250f4a', left: '#5b21b6' },
  { id: 'prussian', name: 'Prussian Midnight', bg: '#050a18', lived: '#0284c7', current: '#38bdf8', text: '#f0f9ff', textMed: '#7dd3fc', textDark: '#0f1e3d', left: '#0369a1' },
  { id: 'terracotta', name: 'Burnt Terracotta', bg: '#1a0e08', lived: '#ea580c', current: '#fdba74', text: '#fff7ed', textMed: '#ffedd5', textDark: '#381e11', left: '#c2410c' }
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

/* ─── STORAGE LISTENER (registered once) ────────────────────────────────── */

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