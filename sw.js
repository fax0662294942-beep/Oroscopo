var CACHE="oroscopo-v1.4";
var ASSETS=["./","./index.html","./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){self.skipWaiting();e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}));});
self.addEventListener("activate",function(e){clients.claim();e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}));});
self.addEventListener("fetch",function(e){
  var url=e.request.url;
  if(url.indexOf("googleapis.com")!==-1||url.indexOf("gstatic.com")!==-1||url.indexOf("fonts.")!==-1||url.indexOf("unpkg.")!==-1){
    e.respondWith(fetch(e.request)); return;
  }
  e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request);}));
});
