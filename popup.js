/**
 * popup.js — Moments Extension
 * Handles: birth date + life expectancy save, success flash,
 * data reset with confirmation, input validation, and auto-close.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form            = document.getElementById('popup-form');
  const dayInput        = document.getElementById('pop-day');
  const monthInput      = document.getElementById('pop-month');
  const yearInput       = document.getElementById('pop-year');
  const expectancyInput = document.getElementById('pop-expectancy');
  const errorBubble     = document.getElementById('error-bubble');
  const successMsg      = document.getElementById('success-msg');
  const submitBtn       = document.getElementById('submit-btn');
  const resetBtn        = document.getElementById('reset-btn');

  let successTimer = null;

  /* ── Load existing settings ──────────────────────────────────────────── */

  chrome.storage.local.get(['birthdate', 'expectancy'], (result) => {
    if (chrome.runtime.lastError) return;

    const bd  = result.birthdate || '1999-04-15';
    const exp = parseInt(result.expectancy, 10);

    const parts = bd.split('-');
    yearInput.value        = parseInt(parts[0], 10) || 1999;
    monthInput.value       = parseInt(parts[1], 10) || 4;
    dayInput.value         = parseInt(parts[2], 10) || 15;
    expectancyInput.value  = (!isNaN(exp) && exp >= 50 && exp <= 120) ? exp : 90;
  });

  /* ── Clear error state on any input change ───────────────────────────── */

  const invalidInputs = [dayInput, monthInput, yearInput, expectancyInput];

  const clearError = () => {
    errorBubble.classList.add('hidden');
    invalidInputs.forEach(el => el.classList.remove('invalid-input'));
  };

  invalidInputs.forEach(el => el.addEventListener('input', clearError));

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

      // The newtab.js storage listener will auto-refresh the tab.
      // Close popup after brief success display.
      clearTimeout(successTimer);
      successTimer = setTimeout(() => window.close(), 1000);
    });
  });

  /* ── Reset button ────────────────────────────────────────────────────── */

  let resetConfirmPending = false;
  let resetConfirmTimer   = null;

  resetBtn.addEventListener('click', () => {
    if (!resetConfirmPending) {
      // First click: ask for confirmation
      resetConfirmPending = true;
      resetBtn.textContent = 'Tap again to confirm reset';
      resetBtn.style.color = '#ff453a';

      resetConfirmTimer = setTimeout(() => {
        resetConfirmPending  = false;
        resetBtn.textContent = 'Reset All Data';
        resetBtn.style.color = '';
      }, 3000);
    } else {
      // Second click within 3s: proceed
      clearTimeout(resetConfirmTimer);
      resetConfirmPending = false;

      chrome.storage.local.clear(() => {
        // Close popup — new tab will show onboarding automatically
        window.close();
      });
    }
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