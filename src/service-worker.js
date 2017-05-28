const APPLICATION_NAME = 'jbreit.github.io';
const CURRENT_VERSION = '1';
const APPLICATION_CACHE = `${APPLICATION_NAME}-shell-v${CURRENT_VERSION}`;

const preCache = (cacheName) => {
  return caches.open(cacheName).then((cache) => {
    return cache.addAll([
      '/assets/img/favicon.ico',
      '/assets/css/main.css',
      '/dist/jbreit.github.io.js',
      '/offline.html',
      '/index.html'
    ]);
  });
};

const cached = preCache(APPLICATION_CACHE);

addEventListener('install', (event) => {
  event.waitUntil(cached.then(() => { (self).skipWaiting(); }));
});

addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request)
    .then((response) => {
      return response || fetch(event.request);
    })
    .catch(() => {
      return caches.match('/offline.html');
    })
  )
});

addEventListener('activate', (event) => {
  const CACHE_WHITE_LIST = [APPLICATION_CACHE];
  event.waitUntil(caches.keys().then((cacheNames) => {
    return Promise.all(cacheNames.map((cacheName) => {
      if (CACHE_WHITE_LIST.indexOf(cacheName) === -1) { return caches.delete(cacheName); }
    }));
  }));
});
