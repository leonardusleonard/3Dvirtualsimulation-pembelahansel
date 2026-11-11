// Service worker: simpan semua file modul agar bisa dibuka offline setelah kunjungan pertama.
const CACHE = 'emodul-pembelahan-sel-v4';            // naikkan versi setiap kali modul diperbarui
const FILES = ['./', './index.html', './sim-mitosis.html', './sim-meiosis.html', './manifest.webmanifest', './logo.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match('./index.html'))));
});
