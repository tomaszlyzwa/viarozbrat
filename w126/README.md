# W126

Blog o Mercedesie W126 280 SE (1982). Statyczna strona na GitHub Pages, bez serwera i bez kompilacji.

| Ścieżka | Adres |
|---|---|
| `index.html` | `https://tomaszlyzwa.github.io/W126/` — strona główna |
| `prospekt/index.html` | `https://tomaszlyzwa.github.io/W126/prospekt/` — prospekt 280 S / SE / SEL (PL) |
| `prospekt/strony/` | strony prospektu (WebP), wczytywane w trakcie kartkowania |
| `prospekt/fonty/` | font prospektu (WOFF2) |
| `specyfikacja/index.html` | `https://tomaszlyzwa.github.io/W126/specyfikacja/` — metryka egzemplarza (VIN, karta produkcyjna, kody) |
| `galeria/index.html` | `https://tomaszlyzwa.github.io/W126/galeria/` — galeria zdjęć |
| `galeria/zdjecia/` | tu wrzucasz zdjęcia (JPG/PNG/WEBP) |
| `galeria/zdjecia.json` | lista zdjęć; odświeża ją automat GitHub Actions |
| `galeria-workflow.yml` | automat do listy zdjęć — przenieś go do `.github/workflows/galeria.yml` w repozytorium |
| `img/` | grafiki strony głównej (WebP) |
| `.nojekyll` | wyłącza Jekyll na GitHub Pages |

Galeria czyta najpierw `zdjecia.json`. Gdy lista jest pusta, awaryjnie pyta publiczne API GitHuba.
Bez GitHub Actions wystarczy wpisać nazwy plików do `zdjecia.json`, np. `["01_przod.jpg", "02_bok.jpg"]`.
Pierwsze zdjęcie na liście jest w galerii duże; kolejność według nazwy (np. 01_, 02_).

Zdjęcie karty produkcyjnej: zapisz je jako `img/karta-produkcyjna.webp`, a pojawi się samo na podstronie specyfikacji.
