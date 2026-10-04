/*
 * Amritanav — PWA glue code.
 *
 * Registers the service worker and adds three small pieces of UI that are
 * created here (not in index.html) so the existing page markup stays
 * untouched. They all share the bottom-center slot of the screen, so only
 * one of them is ever visible at a time:
 *   • "Offline Mode" indicator  — shown whenever the device has no network
 *   • Update banner             — "A new version is available. Reload to
 *                                 update." shown only when a new service
 *                                 worker has finished installing and is
 *                                 waiting; never forces a reload on its own
 *   • Install App button        — appears only when the browser actually
 *                                 supports/offers PWA installation
 */

(() => {
  'use strict';

  /* ── Shared styles (injected once) ─────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .pwa-offline-pill, .pwa-update-banner, .pwa-install-btn {
      position: fixed; z-index: 10000; display: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px; line-height: 1.4; box-sizing: border-box;
    }
    .pwa-offline-pill {
      left: 50%; bottom: 18px; transform: translateX(-50%);
      background: #1f2937; color: #f8fafc; font-weight: 600;
      padding: 7px 16px; border-radius: 999px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    }
    .pwa-update-banner {
      left: 50%; bottom: 18px; transform: translateX(-50%);
      display: none; align-items: center; gap: 12px;
      background: #1f2937; color: #f8fafc;
      padding: 10px 12px 10px 16px; border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
      white-space: nowrap;
    }
    .pwa-update-banner button {
      font: inherit; font-weight: 700; cursor: pointer;
      color: #fff; background: #1a73e8; border: none;
      border-radius: 8px; padding: 6px 14px;
    }
    .pwa-install-btn {
      left: 50%; bottom: 18px; transform: translateX(-50%);
      align-items: center; gap: 6px;
      background: #1a73e8; color: #fff; font-weight: 600;
      border: none; border-radius: 999px; padding: 8px 16px;
      box-shadow: 0 4px 14px rgba(26, 115, 232, 0.45); cursor: pointer;
    }
    @media (max-width: 480px) {
      .pwa-update-banner { white-space: normal; width: calc(100% - 24px); }
    }
  `;
  document.head.appendChild(style);

  /* ── UI elements (all created up front) ────────────────────────────────── */

  // Offline Mode indicator
  const offlinePill = document.createElement('div');
  offlinePill.className = 'pwa-offline-pill';
  offlinePill.setAttribute('role', 'status');
  offlinePill.textContent = '⚡ Offline Mode — cached maps available';
  document.body.appendChild(offlinePill);

  // Update banner
  const updateBanner = document.createElement('div');
  updateBanner.className = 'pwa-update-banner';
  updateBanner.setAttribute('role', 'alert');
  updateBanner.innerHTML =
    '<span>A new version of Amritanav is available.</span>' +
    '<button type="button">Reload to update</button>';
  document.body.appendChild(updateBanner);

  // Install prompt button (Android / desktop Chrome & Edge; iOS uses the
  // native Share → Add to Home Screen flow)
  let deferredInstallPrompt = null;
  const installBtn = document.createElement('button');
  installBtn.type = 'button';
  installBtn.className = 'pwa-install-btn';
  installBtn.innerHTML = '📲 Install App';
  installBtn.style.display = 'none';
  document.body.appendChild(installBtn);

  /* ── Slot management ────────────────────────────────────────────────────── */

  /* Only one bottom-center element (update banner / offline pill / install
   * button) may be visible at a time. */
  function refreshInstallVisibility() {
    const slotFree = updateBanner.style.display !== 'flex' &&
                     offlinePill.style.display !== 'block' &&
                     navigator.onLine &&
                     !window.matchMedia('(display-mode: standalone)').matches;
    installBtn.style.display = slotFree && deferredInstallPrompt ? 'inline-flex' : 'none';
  }

  function updateOfflinePill() {
    offlinePill.style.display = navigator.onLine ? 'none' : 'block';
    refreshInstallVisibility(); // the pill and the install button share the bottom-center slot
  }

  /* ── Offline/online handling ────────────────────────────────────────────── */
  window.addEventListener('online', () => {
    updateOfflinePill();
    // Re-check for a published update as soon as connectivity returns.
    if (registration) registration.update().catch(() => {});
  });
  window.addEventListener('offline', updateOfflinePill);
  updateOfflinePill();

  /* ── Update banner behaviour ────────────────────────────────────────────── */
  // Reload only when a page that was already controlled gets a NEW
  // controller — the very first claim (first visit, fresh install) must not
  // trigger a reload.
  let hadController = 'serviceWorker' in navigator && !!navigator.serviceWorker.controller;
  let reloading = false;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController) {
        hadController = true;
        return;
      }
      if (reloading) return;
      reloading = true;
      window.location.reload();
    });
  }

  function showUpdateBanner(worker) {
    updateBanner.style.display = 'flex';
    installBtn.style.display = 'none'; // banner and install button share the bottom-center slot
    updateBanner.querySelector('button').onclick = () => {
      updateBanner.style.display = 'none';
      worker.postMessage('SKIP_WAITING');
      // controllerchange (fired once the waiting worker activates) reloads.
    };
  }

  /* ── Service worker registration + update detection ────────────────────── */
  let registration = null;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        registration = await navigator.serviceWorker.register(
          'service-worker.js', { scope: './' }
        );

        // A waiting worker may already exist from a previous visit.
        if (registration.waiting && navigator.serviceWorker.controller) {
          showUpdateBanner(registration.waiting);
        }

        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            // Only prompt when an update arrives on top of a running page —
            // on first install there is nothing to update.
            if (installing.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateBanner(installing);
            }
          });
        });
      } catch (err) {
        console.warn('[Amritanav] Service worker registration failed:', err);
      }
    });
  }

  /* ── Install prompt behaviour ───────────────────────────────────────────── */
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    refreshInstallVisibility();
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    installBtn.style.display = 'none';
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null; // the prompt event is single-use
  });

  window.addEventListener('appinstalled', () => {
    installBtn.style.display = 'none';
    deferredInstallPrompt = null;
  });
})();
