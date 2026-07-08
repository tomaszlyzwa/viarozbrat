# Wdrożenie: GitHub Pages + domena OVH

Instrukcja krok po kroku, jak opublikować stronę Via Rozbrat na GitHub Pages
i podłączyć domenę `viarozbrat.pl` z panelu OVH.

## Jak to działa

```
Repozytorium (Twoje pliki)  →  GitHub Pages (serwuje stronę)
                                      ↑
                      Domena OVH (viarozbrat.pl)
                      przez rekordy DNS (A + CNAME)
                      wskazuje na serwery GitHuba
```

Trzy elementy: repozytorium z plikami, GitHub Pages który je serwuje,
oraz domena w OVH, która przez DNS kieruje ruch na GitHuba.

---

## Etap 1 — Repozytorium na GitHubie

1. Zaloguj się na github.com (jeśli nie masz konta, załóż darmowe).
2. Kliknij `+` w prawym górnym rogu → **New repository**.
3. Nazwa repozytorium dowolna, np. `viarozbrat` (nie musi odpowiadać domenie).
4. Ustaw **Public** — GitHub Pages na darmowym koncie wymaga publicznego repo.
5. Nie zaznaczaj „Add a README" (masz już własny). Kliknij **Create repository**.

Wgranie plików przez przeglądarkę:

6. Na stronie pustego repozytorium kliknij **uploading an existing file**.
7. Rozpakuj `viarozbrat-site.zip` i przeciągnij **zawartość folderu `site/`**
   (`index.html`, `CNAME`, `.nojekyll`, `README.md`, folder `gallery/`),
   a NIE sam folder `site`. Pliki muszą leżeć w katalogu głównym repozytorium.
8. Na dole kliknij **Commit changes**.

> Ważne: pliki `.nojekyll` i `CNAME` (bez rozszerzenia / z kropką na początku)
> też muszą się znaleźć w repo. Sprawdź, czy widać je na liście plików.

---

## Etap 2 — Włączenie GitHub Pages

1. W repozytorium: **Settings** → w lewej kolumnie **Pages**.
2. W sekcji **Build and deployment**, pod „Source", wybierz **Deploy from a branch**.
3. Wybierz gałąź **main** i folder **/ (root)**, kliknij **Save**.
4. Po chwili odśwież — pojawi się adres `https://twojlogin.github.io/viarozbrat/`.
   Sprawdź, czy strona działa pod tym adresem, zanim zajmiesz się domeną.
5. W polu **Custom domain** wpisz `viarozbrat.pl` i kliknij **Save**
   (jeśli plik `CNAME` był już w repo, pole może się wypełnić samo).

Na tym etapie GitHub pokaże „DNS check unsuccessful" — to normalne,
bo domena jeszcze nie wskazuje na GitHuba. Naprawiamy to w Etapie 3.

---

## Etap 3 — Konfiguracja DNS w OVH

Zaloguj się do panelu OVH (`www.ovh.com/manager`) → **Web Cloud** → **Domeny**
→ wybierz `viarozbrat.pl` → zakładka **Strefa DNS**.

### Cztery rekordy A (domena główna)

Wszystkie wskazują na oficjalne serwery GitHub Pages. Pole subdomeny puste.

| Typ | Subdomena | Wartość            |
|-----|-----------|--------------------|
| A   | (puste)   | 185.199.108.153    |
| A   | (puste)   | 185.199.109.153    |
| A   | (puste)   | 185.199.110.153    |
| A   | (puste)   | 185.199.111.153    |

### Jeden rekord CNAME (dla www)

| Typ   | Subdomena | Cel                    |
|-------|-----------|------------------------|
| CNAME | www       | twojlogin.github.io.   |

W celu CNAME wpisz swój login GitHuba z końcówką `.github.io`
(z kropką na końcu, jeśli OVH jej wymaga). To adres konta, nie repozytorium.

> Jeśli w strefie DNS są już rekordy A wskazujące na inny serwer
> (parking OVH lub stary hosting) — usuń je, inaczej domena kieruje w dwa
> miejsca naraz. Tak samo usuń istniejący rekord CNAME dla `www`, jeśli jest.

---

## Etap 4 — Poczekaj i włącz HTTPS

1. Zmiany DNS propagują się od kilkunastu minut do kilku godzin (czasem do 24 h).
   Postęp sprawdzisz na `dnschecker.org`, wpisując `viarozbrat.pl`.
2. Wróć do GitHub → Settings → Pages. Gdy DNS będzie poprawny, ostrzeżenie zniknie.
3. Zaznacz **Enforce HTTPS** (opcja aktywna dopiero po weryfikacji domeny —
   GitHub sam wystawia darmowy certyfikat). Strona działa pod `https://viarozbrat.pl`.

---

## Najczęstsze problemy

- **„Enforce HTTPS" wyszarzone** — certyfikat generuje się nawet godzinę po tym,
  jak DNS już działa. Poczekaj i odśwież stronę ustawień.
- **Strona pokazuje 404 mimo poprawnego DNS** — sprawdź, czy `index.html` leży
  w katalogu głównym repozytorium, a nie w podfolderze `site/`.
- **Galeria nie ładuje zdjęć** — upewnij się, że nazwy plików w
  `gallery/manifest.json` dokładnie odpowiadają plikom w folderze `gallery/`
  (wielkość liter ma znaczenie).

## Aktualizacja strony w przyszłości

Żeby coś zmienić: edytuj plik bezpośrednio w repozytorium na GitHubie
(ikona ołówka) albo wgraj nową wersję przez **Add file → Upload files**.
Po każdym commicie GitHub Pages sam przebuduje stronę w ciągu 1–2 minut.
