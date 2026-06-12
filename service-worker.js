// A very simple service worker for offline support.  It caches the core assets on
// install and serves them from cache when offline.  Feel free to extend this file
// to cache images or other resources as you update your album.

const CACHE_NAME = 'panini-2026-cache-v1';
const ASSETS = [
  '.',
  'index.html',
  'grid.js',
  'data.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Always try cache first, then network
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});