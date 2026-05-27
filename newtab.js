/**
 * newtab.js — Moments Extension
 * Production build: battery-safe clock, single storage listener,
 * DocumentFragment dot rendering, robust error handling.
 */

'use strict';

/* ─── CLOCK ──────────────────────────────────────────────────────────────── */

let clockRafId = null;

function startClock() {
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  // ms element exists in DOM but is intentionally hidden — skip updating it
  // to avoid unnecessary DOM writes on every animation frame.

  let lastSecond = -1;

  function tick() {
    // Page Visibility API: pause rAF when tab is in background
    if (document.visibilityState === 'hidden') {
      clockRafId = requestAnimationFrame(tick);
      return;
    }

    const now     = new Date();
    const seconds = now.getSeconds();

    // Only write to DOM when the second changes (reduces ~59/60 of DOM writes)
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
  // Defensive storage read with error fallback
  try {
    chrome.storage.local.get(['birthdate', 'expectancy'], (result) => {
      if (chrome.runtime.lastError) {
        console.error('[Moments] Storage read error:', chrome.runtime.lastError);
        showOnboarding();
        return;
      }

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

/* ─── VALIDATION HELPERS ─────────────────────────────────────────────────── */

/**
 * Validates a stored "YYYY-MM-DD" date string is well-formed and not in the future.
 * Does NOT reject future-born users (negative months lived just renders as 0).
 */
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
  // Range check
  if (
    isNaN(dVal) || isNaN(mVal) || isNaN(yVal) ||
    yVal < 1900 || yVal > 2100 ||
    mVal < 1    || mVal > 12   ||
    dVal < 1    || dVal > 31
  ) return null;

  // Calendar validity (catches Feb 30, Apr 31, etc.)
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
  // Force reflow so CSS animation re-triggers on each call
  void app.offsetWidth;
  initDashboard();
}

function showOnboarding() {
  document.getElementById('app-container').classList.add('hidden');
  const ob = document.getElementById('onboarding-screen');
  ob.classList.remove('hidden');
  void ob.offsetWidth;
  // Auto-focus first input for keyboard users
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

  // Tab-order auto-advance: when day/month are filled, jump to next field
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

// Cache the labels that change on hover to avoid re-querying DOM every mouseover
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
  const birthMonth = parseInt(parts[1], 10) - 1; // 0-indexed
  const birthDay   = parseInt(parts[2], 10);

  const birthDate = new Date(birthYear, birthMonth, birthDay);
  if (isNaN(birthDate.getTime())) return;

  const now = new Date();

  // Months lived (floor, not negative)
  let monthsLived = (now.getFullYear() - birthDate.getFullYear()) * 12
                  + (now.getMonth()    - birthDate.getMonth());
  if (monthsLived < 0) monthsLived = 0;

  const totalMonths  = activeConfig.expectancy * 12;
  const monthsLeft   = Math.max(0, totalMonths - monthsLived);
  const percentLived = ((monthsLived / totalMonths) * 100).toFixed(1);

  // Update stat counters
  domCache.lived.textContent   = monthsLived;
  domCache.left.textContent    = monthsLeft;
  domCache.percent.textContent = `${percentLived}%`;

  // Header labels
  domCache.birthLabel.textContent  = birthDate
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  domCache.activeMonth.textContent = now
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  domCache.hoverCount.textContent  = `MONTH ${monthsLived}`;
  domCache.ageLimit.textContent    = `AGE ${activeConfig.expectancy}`;

  // Snapshot for mouseleave restore
  const defaultMonthLabel = domCache.activeMonth.textContent;
  const defaultHoverCount = domCache.hoverCount.textContent;

  // Build dot matrix with DocumentFragment (single DOM insertion)
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalMonths; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot-cell';

    if (i < monthsLived) {
      dot.classList.add('lived');
    } else if (i === monthsLived) {
      dot.classList.add('current');
    }

    // Precompute hover label strings during construction (not on every hover)
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

  // Single reflow — clear then append
  domCache.grid.innerHTML = '';
  domCache.grid.appendChild(fragment);
}