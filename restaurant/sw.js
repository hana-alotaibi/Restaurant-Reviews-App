//Installation of service worker
const chcheName  = 'v1';
const urlsToCache = [
       './',
       './index.html',
       './restaurant.html',
       './css/styles.css',
       './js/dbhelper.js',
       './js/main.js',
       './js/restaurant_info.js',
       './rest_sw.js',
       './data/restaurants.json',
       './img/1.jpg',
       './img/2.jpg',
       './img/3.jpg',
       './img/4.jpg',
       './img/5.jpg',
       './img/6.jpg',
       './img/7.jpg',
       './img/8.jpg',
       './img/9.jpg',
       './img/10.jpg'
];

self.addEventListener('install', function(event) {
 // console.log('sw:instal');
 event.waitUntil(
   caches.open(chcheName)
   .then(function(cache) {
     return cache.addAll(urlsToCache);
   })
 );
});

 //Activation of service worker
self.addEventListener('activate', function(event) {
  //console.log('sw:activate');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        cacheName != chcheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

//Fetching for offline content viewing
self.addEventListener('fetch', function(event) {
//console.log('sw:fetsh');
  //console.log(event.request.url);
    event.respondWith(
      caches.match(event.request)
      .then(function(response) {
       return response || fetch(event.request);
      })
    );
});