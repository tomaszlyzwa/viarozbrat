# Via Rozbrat

Strona domowej pizzerii: kalkulator składników zależny od liczby i stylu pizzy,
dynamiczny harmonogram przygotowania liczony wstecz od godziny pieczenia,
przepisy dla pięciu stylów ciasta oraz galeria zdjęć.

Cała strona to jeden plik `index.html` bez zależności zewnętrznych (poza fontami Google).
Działa po otwarciu w przeglądarce i po wystawieniu na dowolnym serwerze statycznym.

## Struktura projektu

```
.
├── index.html          → cała aplikacja
├── CNAME               → domena (viarozbrat.pl)
├── .nojekyll           → wyłącza przetwarzanie Jekyll na GitHub Pages
├── README.md           → ten plik
└── gallery/
    ├── manifest.json   → lista zdjęć wyświetlanych w Galerii
    ├── README.md       → jak dodawać zdjęcia
    └── (tu wgrywasz pliki .jpg / .png / .webp)
```

## Uruchomienie lokalne

Otwórz `index.html` w przeglądarce. Aby galeria wczytywała zdjęcia,
uruchom prosty serwer w folderze projektu (fetch nie działa z `file://`):

```bash
python3 -m http.server 8000
# potem wejdź na http://localhost:8000
```

## Publikacja przez GitHub Pages

1. Utwórz repozytorium na GitHub i wgraj do niego całą zawartość tego folderu
   (pliki muszą leżeć w katalogu głównym repo, nie w podfolderze).
2. W repozytorium wejdź w **Settings → Pages**.
3. W sekcji **Build and deployment** ustaw **Source: Deploy from a branch**,
   wybierz gałąź `main` i folder `/ (root)`, zapisz.
4. Po chwili strona będzie dostępna pod adresem
   `https://<twoja-nazwa>.github.io/<repo>/`.

### Domena viarozbrat.pl

Plik `CNAME` już zawiera `viarozbrat.pl`, więc po włączeniu Pages wystarczy
skonfigurować DNS u rejestratora domeny:

- Rekordy **A** dla domeny głównej (`viarozbrat.pl`) wskazujące na adresy GitHub Pages:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- Rekord **CNAME** dla `www` wskazujący na `<twoja-nazwa>.github.io`

Następnie w **Settings → Pages → Custom domain** wpisz `viarozbrat.pl`
i zaznacz **Enforce HTTPS** (dostępne po weryfikacji DNS).

## Dodawanie zdjęć do galerii

Zobacz `gallery/README.md`. W skrócie: wgraj plik do folderu `gallery/`
i dopisz jego nazwę w `gallery/manifest.json`.

## Przenośność

Galeria opiera się wyłącznie na plikach w folderze `gallery/` i na `manifest.json`.
Skopiowanie całego folderu projektu na inny serwer statyczny (albo do innego repo)
przenosi stronę razem z galerią — nie ma bazy danych ani ustawień poza tymi plikami.
Jedyne, co warto poprawić przy zmianie adresu, to plik `CNAME` (lub jego usunięcie,
jeśli nie używasz własnej domeny).
