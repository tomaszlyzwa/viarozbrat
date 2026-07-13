/* Via Rozbrat — service worker
   Strategia:
   - powłoka aplikacji (HTML, logo, ikony): network-first z fallbackiem na cache
     → zawsze świeża wersja, ale działa offline
   - zdjęcia galerii i fonty: cache-first
     → nie pobieramy dwa razy tego samego pliku
   - gallery/manifest.json: ZAWSZE z sieci
     → inaczej nowe zdjęcia z panelu admina nie pojawiałyby się przez wiele dni
*/

const VERSION = "vr-2026-07-13-2";
const SHELL   = "shell-" + VERSION;
const ASSETS  = "assets-" + VERSION;

/* pliki tworzące powłokę — pobierane przy instalacji.
   UWAGA: manifest.json celowo POZA cache — Chrome musi widzieć zawsze aktualny,
   inaczej przy instalacji zgłasza, że aplikacja jest w starszej wersji. */
const SHELL_FILES = [
  "./",
  "./index.html",
  "./logo.svg",
  "./mark.svg",
  "./icon-192.png",
  "./icon-512.png",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(SHELL)
      /* addAll przerywa całą instalację, gdy brakuje choćby jednego pliku,
         więc dodajemy pojedynczo i ignorujemy braki */
      .then(c => Promise.all(SHELL_FILES.map(f => c.add(f).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== SHELL && k !== ASSETS).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => {
  if (e.data === "skip-waiting") self.skipWaiting();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  /* 1. Manifest aplikacji — ZAWSZE świeży z sieci.
        Zapamiętany manifest sprawia, że Chrome przy instalacji widzi starą wersję. */
  if (sameOrigin && url.pathname.endsWith("manifest.json") && !url.pathname.includes("/gallery/")) {
    e.respondWith(fetch(req, { cache: "no-store" }).catch(() => caches.match(req)));
    return;
  }

  /* 2. Manifest galerii — też zawsze z sieci, żeby nowe zdjęcia były widoczne od razu */
  if (sameOrigin && url.pathname.endsWith("gallery/manifest.json")) {
    e.respondWith(
      fetch(req, { cache: "no-store" }).catch(() => caches.match(req))
    );
    return;
  }

  /* 3. Wywołania API GitHuba (panel admina) — nigdy nie cache'ujemy */
  if (url.hostname === "api.github.com") return;

  /* 4. Zdjęcia galerii i fonty — cache-first (nie zmieniają się) */
  const isPhoto = sameOrigin && url.pathname.startsWith("/gallery/");
  const isFont  = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (isPhoto || isFont) {
    e.respondWith(
      caches.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          if (res.ok || res.type === "opaque") {
            const copy = res.clone();
            caches.open(ASSETS).then(c => c.put(req, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  /* 5. Nawigacja i reszta powłoki — network-first, offline z cache */
  if (req.mode === "navigate" || sameOrigin) {
    e.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(SHELL).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then(hit => hit || caches.match("./index.html"))
        )
    );
  }
});
