const CACHE_NAME = 'woof-cal-v6';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './manifest.json',
  './calorie_icon.png',
  './pet_placeholder.svg',
  './js/app.js',
  './js/api.js',
  './js/config.js',
  './js/ui.js',
  './js/utils.js',
  './js/react-home/react-home-island.js',
  './js/react-home/react-home-island.css'
];

function isNetworkFirstAsset(request) {
  const url = new URL(request.url);
  const destination = request.destination || '';

  if (destination === 'script' || destination === 'style' || destination === 'worker') {
    return true;
  }

  return /\.m?js$|\.css$/i.test(url.pathname);
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(CACHE_NAME);
        cache.put('./index.html', networkResponse.clone());
        return networkResponse;
      } catch (error) {
        return (await caches.match(request)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }

  if (isNetworkFirstAsset(request)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const networkResponse = await fetch(request);
        if (networkResponse && networkResponse.ok) {
          cache.put(request, networkResponse.clone());
        }
        return networkResponse;
      } catch (error) {
        return (await cache.match(request)) || Response.error();
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    const networkFetch = fetch(request)
      .then(response => {
        if (response && response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      })
      .catch(() => cached);

    return cached || networkFetch;
  })());
});
