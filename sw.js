const CACHE='entre-trazos-v11';
const FILES=['./','./index.html','./styles.css','./app.js','./data.js','./classes.js','./pronunciation.js','./twisters.js','./confusions.js','./tone-trainer.js','./pitch-analysis.js','./pitch-worker.js','./pronunciation-data.js','./pronunciation-sources.txt','./cards.js','./hsk-data.js','./hsk-sources.txt','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('entre-trazos-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 if(new URL(event.request.url).pathname.includes('/audio/')){
   event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(event.request.url);if(cached)return cached;const response=await fetch(event.request.url);if(response.ok&&response.status===200){try{await cache.put(event.request.url,response.clone());}catch{}}return response;})());return;
 }
 event.respondWith(fetch(event.request).then(response=>{if(response.ok&&response.status===200){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{});}return response;}).catch(()=>caches.match(event.request).then(cached=>cached||(event.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));
});
