/**
 * popup.js — Moments Extension
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

document.addEventListener('DOMContentLoaded', () => {
  const form            = document.getElementById('popup-form');
  const dayInput        = document.getElementById('pop-day');
  const monthInput      = document.getElementById('pop-month');
  const yearInput       = document.getElementById('pop-year');
  const expectancyInput = document.getElementById('pop-expectancy');
  const errorBubble     = document.getElementById('error-bubble');
  const successMsg      = document.getElementById('success-msg');
  const submitBtn       = document.getElementById('submit-btn');
  const helpBtn         = document.getElementById('help-btn');
  const themeGrid       = document.getElementById('theme-grid');

  let successTimer = null;

  /* ── Load existing settings ──────────────────────────────────────────── */

  chrome.storage.local.get(['birthdate', 'expectancy', 'theme'], (result) => {
    if (chrome.runtime.lastError) return;

    const bd  = result.birthdate || '1999-04-15';
    const exp = parseInt(result.expectancy, 10);
    const activeThemeId = result.theme || 'classic';

    const parts = bd.split('-');
    yearInput.value        = parseInt(parts[0], 10) || 1999;
    monthInput.value       = parseInt(parts[1], 10) || 4;
    dayInput.value         = parseInt(parts[2], 10) || 15;
    expectancyInput.value  = (!isNaN(exp) && exp >= 50 && exp <= 120) ? exp : 90;

    renderThemes(activeThemeId);
  });

  /* ── Help Button ─────────────────────────────────────────────────────── */

  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: 'https://www.google.com/search?q=calculate+life+expectancy+in+years' });
    });
  }

  /* ── Clear error state on input changes ──────────────────────────────── */

  const invalidInputs = [dayInput, monthInput, yearInput, expectancyInput];

  const clearError = () => {
    errorBubble.classList.add('hidden');
    invalidInputs.forEach(el => el.classList.remove('invalid-input'));
  };

  invalidInputs.forEach(el => el.addEventListener('input', clearError));

  /* ── Theme Grid Rendering ────────────────────────────────────────────── */

  function renderThemes(activeThemeId) {
    themeGrid.innerHTML = '';
    THEMES.forEach(t => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `theme-btn ${t.id === activeThemeId ? 'active' : ''}`;
      btn.title = t.name;
      btn.dataset.id = t.id;
      
      // Physically set the button fill to the unique theme background
      btn.style.backgroundColor = t.bg;

      // Centered accent color dot representing the theme
      const preview = document.createElement('div');
      preview.className = 'theme-preview';
      preview.style.backgroundColor = t.lived;

      btn.appendChild(preview);

      btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        chrome.storage.local.set({ theme: t.id }, () => {
          if (chrome.runtime.lastError) {
            console.error('[Moments] Theme save failed:', chrome.runtime.lastError);
          }
        });
      });

      themeGrid.appendChild(btn);
    });
  }

  /* ── Form submit ─────────────────────────────────────────────────────── */

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dVal   = parseInt(dayInput.value,        10);
    const mVal   = parseInt(monthInput.value,      10);
    const yVal   = parseInt(yearInput.value,       10);
    const expVal = parseInt(expectancyInput.value, 10);

    // Validate birth date
    if (
      isNaN(dVal) || isNaN(mVal) || isNaN(yVal) ||
      yVal < 1900 || yVal > 2100 ||
      mVal < 1    || mVal > 12   ||
      dVal < 1    || dVal > 31
    ) {
      showError('Please enter a valid date', [dayInput, monthInput, yearInput]);
      return;
    }

    // Calendar validity (e.g. Feb 30)
    const testDate = new Date(yVal, mVal - 1, dVal);
    if (
      testDate.getFullYear() !== yVal ||
      testDate.getMonth()    !== mVal - 1 ||
      testDate.getDate()     !== dVal
    ) {
      showError('That date doesn\'t exist', [dayInput, monthInput, yearInput]);
      return;
    }

    // Validate expectancy
    if (isNaN(expVal) || expVal < 50 || expVal > 120) {
      showError('Expectancy must be 50–120 years', [expectancyInput]);
      return;
    }

    const day   = String(dVal).padStart(2, '0');
    const month = String(mVal).padStart(2, '0');
    const year  = String(yVal);

    const payload = {
      birthdate:  `${year}-${month}-${day}`,
      expectancy: expVal
    };

    submitBtn.disabled = true;

    chrome.storage.local.set(payload, () => {
      submitBtn.disabled = false;

      if (chrome.runtime.lastError) {
        showError('Save failed. Try again.', invalidInputs);
        return;
      }

      showSuccess();

      clearTimeout(successTimer);
      successTimer = setTimeout(() => window.close(), 1000);
    });
  });

  /* ── Helpers ─────────────────────────────────────────────────────────── */

  function showError(msg, fields = []) {
    errorBubble.textContent = msg;
    errorBubble.classList.remove('hidden');
    successMsg.classList.add('hidden');
    fields.forEach(el => el.classList.add('invalid-input'));
  }

  function showSuccess() {
    successMsg.classList.remove('hidden');
    errorBubble.classList.add('hidden');
  }
});