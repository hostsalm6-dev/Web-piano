const CACHE_NAME = 'music-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './drums.html',
  './records.html',
  './manifest.json'
];

// Установка – кэшируем основные файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Перехват fetch – сначала сеть, при ошибке – кэш
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
});

// Активация – удаляем старые кэши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});