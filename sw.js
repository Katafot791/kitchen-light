const CACHE_NAME = 'ilart-light-v2';
// Кэшируем только корень, манифест и саму страницу
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Установка воркера и жесткое кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    }).then(() => self.skipWaiting()) // Активируем воркер сразу
  );
});

// Активация и очистка старых версий кэша
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Работа в ОФЛАЙНЕ: если интернета нет, берем данные строго из памяти телефона
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
