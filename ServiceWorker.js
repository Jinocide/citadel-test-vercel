

// -----TAKEOVER CODE---------
// for (let i = 0; i < contentToCache.length; i++) {
//     if (contentToCache[i].indexOf('?') === -1) {
//         contentToCache[i] = contentToCache[i] + '?v=20260630213558';
//     }
// }

self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); })

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
});

