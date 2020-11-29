
var cacheName = 'v1';

var cacheAssets = [
    'index.html',
    'script.js',
    'view/js/js.js',
    'view/style.css',
    'view/images/game.png',
    'view/images/game2.png',
    'view/images/game3.png',
    'view/images/game4.png',
    'view/images/game5.png',
    'view/images/game6.png',
    'view/images/gameInfo.png',
    'view/images/logo.png',
    'view/images/logo2.png',
    'view/images/profile.png',
    'view/images/profileImage.png',
    'view/images/sea.jpg',
    'view/images/seat.jpeg',
    'view/images/soccer1.png',
    'view/images/soccer2.png',
    'view/images/stadium.png',
    'view/images/ticket.png',
    'view/images/logo/arsenal.png',
    'view/images/logo/chelsea.jpg',
    'view/images/logo/liverpool.png',
    'view/images/logo/manC.png',
    'view/images/logo/manU.png',
    'view/images/logo/tottenham.png',
    'https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/css/uikit.min.css',
    'https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit.min.js',
    'https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit-icons.min.js',
    'http://localhost:8888/favicon.ico'
]

//Call install event


self.addEventListener('install', function(event) {
    console.log("Service Worker: Installed");
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Service Worker: Cashing Files');
        return cache.addAll(cacheAssets);
      }).then(() => self.skipWaiting())
  );
});



//Call activate event
self.addEventListener('activate', e => {
    console.log("Service Worker: Activated");
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log("Service Worker: Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});



//Call fetch event
self.addEventListener("fetch", e => {
    console.log("Service Worker: Fetching");
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)));
});




/*
//Call fetch all event
self.addEventListener("fetch", e => {
    console.log("Service Worker: Fetching");
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            //Open cache
            caches.open(cacheName).then(cache => {
                // Add response to cache
                cache.put(e.request, resClone);
            });
        })
        .catch(err => caches.match(e.request).then(res => res)));
});*/