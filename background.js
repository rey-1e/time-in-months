// background.js — Moments Extension Service Worker

// On fresh install: nothing to migrate. On update: handle schema changes gracefully.
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Fresh install — storage is empty, onboarding will handle first-time setup
    console.log('[Moments] Installed fresh.');
  } else if (details.reason === 'update') {
    // Migrate legacy storage schema if needed
    chrome.storage.local.get(null, (data) => {
      const patch = {};

      // v1.0 stored expectancy as string or undefined — normalize to integer
      if (data.expectancy === undefined || data.expectancy === null) {
        patch.expectancy = 90;
      } else {
        patch.expectancy = parseInt(data.expectancy, 10) || 90;
      }

      // Clamp expectancy to sane range
      patch.expectancy = Math.min(120, Math.max(50, patch.expectancy));

      if (Object.keys(patch).length > 0) {
        chrome.storage.local.set(patch);
      }

      console.log('[Moments] Updated to v' + chrome.runtime.getManifest().version);
    });
  }
});

