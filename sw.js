const C='sakura-seoul-v8';
const CORE=['./','./index.html','./manifest.webmanifest','./assets/maps/osaka.svg','./assets/maps/kyoto.svg','./assets/maps/fuji.svg','./assets/maps/tokyo.svg','./assets/maps/seoul.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(CORE))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(e.request.method==='GET'){let y=x.clone();caches.open(C).then(c=>c.put(e.request,y)).catch(()=>{})}return x}).catch(()=>r))));
