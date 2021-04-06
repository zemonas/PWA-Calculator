const static = 'cache'
const assets = [
  '/',
  '/index.html',
  '/script.js',
  '/master.css',
  '/images/icon192x192.png',]
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(static).then(cache => {
      cache.addAll(assets);
    })
  )
});
self.addEventListener('activate', evt =>{
  evt.waitUntil(
    caches.keys().then( keys =>{
      return Promise.all(keys
        .filter(key => key !== static)
        .map(key => caches.delete(key))
      )
    })
  )
});
self.addEventListener('fetch', evt =>{
  evt.respondWith(
    caches.open(static).then(cached => {
      return cached.match(evt.request).then(cacheRes => {
        var fetchPromise = fetch(evt.request).then(networkResponse => {
          cached.put(evt.request, networkResponse.clone());
          return networkResponse;
        });
          return cacheRes || fetchPromise;
        });
    })
  );
});
