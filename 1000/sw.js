/* 1000 — service worker (scope: /1000/). Zmień wersję po każdej aktualizacji plików. */
const VERSION = "1000-v2";
const SHELL = [
  "/1000/",
  "/1000/manifest.webmanifest",
  "/1000/icon-192.png",
  "/1000/icon-512.png",
  "/1000/icon-maskable-512.png",
  "/1000/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("1000-") && k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  /* tylko własne pliki /1000/ — API GitHuba i reszta witryny idą bez zmian */
  if (url.origin !== location.origin || !url.pathname.startsWith("/1000/")) return;

  /* strona: najpierw sieć (świeża wersja), bez sieci — z pamięci */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put("/1000/", copy));
        }
        return res;
      }).catch(() => caches.match("/1000/"))
    );
    return;
  }

  /* ikony i manifest: najpierw pamięć */
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
