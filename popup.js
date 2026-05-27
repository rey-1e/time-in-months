/**
 * popup.js — Moments Extension
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

  /* ── Clear error state on any input change ───────────────────────────── */

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

      const preview = document.createElement('div');
      preview.className = 'theme-preview';

      const sliceBg = document.createElement('div');
      sliceBg.className = 'color-bg';
      sliceBg.style.backgroundColor = t.bg;

      const sliceLived = document.createElement('div');
      sliceLived.className = 'color-lived';
      sliceLived.style.backgroundColor = t.lived;

      const sliceCurrent = document.createElement('div');
      sliceCurrent.className = 'color-current';
      sliceCurrent.style.backgroundColor = t.current;

      preview.appendChild(sliceBg);
      preview.appendChild(sliceLived);
      preview.appendChild(sliceCurrent);

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

      // Show success flash, then close
      showSuccess();

      // Close popup after brief success display
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