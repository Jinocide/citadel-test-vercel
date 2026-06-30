const cacheName = "Born-Citadel-1.0.0-v20260630220007";
const contentToCache = [
    "Build/citadel-test-vercel.loader.js",
    "Build/citadel-test-vercel.framework.js.br",
    "Build/citadel-test-vercel.data.br",
    "Build/citadel-test-vercel.wasm.br",
    "TemplateData/style.css"

];


// -----TAKEOVER CODE---------
for (let i = 0; i < contentToCache.length; i++) {
    if (contentToCache[i].indexOf('?') === -1) {
        contentToCache[i] = contentToCache[i] + '?v=20260630220007';
    }
}

self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); })

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request, { ignoreSearch: true });
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
