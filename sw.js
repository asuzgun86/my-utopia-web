// My Utopia web app: works offline after the first open (app, menus, compass, photos).
// Crew and guest data are NOT on the website; they live in each phone's storage (data file).
const C='myutopia-v1';const CORE=['./','index.html','heatmap.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png','data/meta.json','data/menus.json','data/compass.json','data/compassdays.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))))});
