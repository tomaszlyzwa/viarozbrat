# Folder galeria

Tu wrzucasz zdjęcia swoich pizz.

## Jak dodać zdjęcie

1. Wgraj plik obrazu (`.jpg`, `.jpeg`, `.png` lub `.webp`) do tego folderu (`gallery/`).
2. Otwórz plik `manifest.json` i dopisz nazwę pliku do listy `photos`.

### Przykład `manifest.json`

```json
{
  "photos": [
    "margherita-pierwsza.jpg",
    { "file": "diavola.jpg", "caption": "Diavola z Alfa Forni, 90 sekund" },
    { "file": "detroit.webp", "caption": "Detroit — koronka z sera na brzegach" }
  ]
}
```

Każdy wpis to albo sama nazwa pliku (w cudzysłowie), albo obiekt
z polami `file` (nazwa pliku) i `caption` (podpis pod zdjęciem).

## Wskazówki

- Nazwy plików bez spacji i polskich znaków — np. `margherita-2024.jpg` zamiast `margherita źródło.jpg`.
- Dla szybkiego ładowania trzymaj zdjęcia poniżej ok. 1–2 MB (format `.webp` jest najlżejszy).
- Kolejność na stronie odpowiada kolejności w `manifest.json`.
