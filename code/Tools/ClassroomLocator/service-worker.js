/*
 * Amritanav — Progressive Web App service worker.
 *
 * Offline strategy: after one successful online visit, the entire app shell
 * (HTML, CSS, JS, data files, icons, manifest) is served from the cache, so
 * floor switching, search, highlighting, routing and zoom/pan all keep
 * working with no network. All four floor plans are inline in index.html and
 * all room/navigation data is inline in campus-data.js / ground-nav-data.js /
 * campus-router.js, so this file list covers the whole app.
 *
 * ── Publishing an updated version of the site ─────────────────────────────
 * 1. Bump CACHE_VERSION below (e.g. 'v2' -> 'v3').
 * 2. Deploy. On the next visit the browser notices the changed service
 *    worker, installs it, and precaches every file into a NEW cache while
 *    the old cache keeps serving the already-open page — so a visitor never
 *    ends up with a broken mixture of old and new files.
 * 3. The page shows "A new version of Amritanav is available. Reload to
 *    update." The new worker takes over only when the user reloads (or
 *    closes every tab); the old cache is deleted at that point.
 * ───────────────────────────────────────────────────────────────────────────
 */

const CACHE_VERSION = 'v6';
const CACHE_NAME = `amritanav-${CACHE_VERSION}`;

/* Exactly the files the app loads at runtime — nothing more, nothing fake.
 * main.js and the json/ floor files are NOT loaded by index.html (the data
 * is compiled into campus-data.js) so they are intentionally not cached. */
const PRECACHE_URLS = [
  './',
  './index.html',
  './offline.html',
  './styles.css',
  './script.js',
  './ground-nav-data.js',
  './campus-data.js',
  './campus-router.js',
  './manifest.json',
  './favicon.ico',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  // Build the new cache completely before this worker is considered ready.
  // Deliberately NO skipWaiting() here: the new worker stays "waiting" until
  // the user reloads (see header comment) so an active navigation session is
  // never interrupted mid-route.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Called by the page when the user taps "Reload" on the update banner.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Never touch cross-origin traffic (GPS-related endpoints, analytics, …).
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request));
  } else {
    event.respondWith(handleAsset(request));
  }
});

/* Page loads: cache-first so the app opens instantly and works offline.
 * The cache is refreshed only by a version bump (see header), which keeps
 * index.html and its JS/CSS always from the same coherent version. If the
 * visitor has never been here (empty cache) fall through to the network,
 * and only if that fails too show the "open once online" page. */
async function handleNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match('./index.html', { ignoreSearch: true });
  if (cached) return cached;

  try {
    return await fetch(request);
  } catch (err) {
    const offlinePage = await cache.match('./offline.html');
    if (offlinePage) return offlinePage;
    return new Response(
      '<!DOCTYPE html><meta charset="utf-8"><title>Amritanav — offline</title>' +
      '<p style="font-family: sans-serif; padding: 2rem;">You are offline. Amritanav needs to be opened once ' +
      'with an internet connection to prepare its offline cache.</p>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }
}

/* Static assets: cache-first, never blocking on the network. Files that are
 * not precached (e.g. added later to the site) are stored on first
 * successful fetch so they keep working offline afterwards too. */
async function handleAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === 'basic') {
      cache.put(request, response.clone());
    }
    return response;
  } catch (err) {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}
