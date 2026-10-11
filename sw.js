const CACHE_NAME = 'ilart-light-v5';
const assets = [
  '/kitchen-light/',
  '/kitchen-light/index.html',
  '/kitchen-light/manifest.json',
  '/kitchen-light/icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
