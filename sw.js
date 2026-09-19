const C='sakura-seoul-v7-1';
const CORE=['./index.html','./manifest.webmanifest','./assets/maps/osaka.svg','./assets/maps/kyoto.svg','./assets/maps/fuji.svg','./assets/maps/tokyo.svg','./assets/maps/seoul.svg'];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(C).then(cache=>cache.addAll(CORE)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==C).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const isNavigation=event.request.mode==='navigate';
  if(isNavigation){
    event.respondWith(
      fetch(event.request).then(response=>{
        const copy=response.clone();
        caches.open(C).then(cache=>cache.put('./index.html',copy)).catch(()=>{});
        return response;
      }).catch(()=>caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached=>cached || fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(C).then(cache=>cache.put(event.request,copy)).catch(()=>{});
      return response;
    }))
  );
});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING') self.skipWaiting();});
