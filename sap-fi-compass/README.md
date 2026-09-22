# SAP FI Compass — tasarım sürümleri

CPeak sitesinden **bağımsız**, sunucusuz ve internetsiz çalışan bir sitedir.
Her klasör aynı sitenin farklı bir tasarım sürümüdür; `index.html`'e çift
tıklayarak açılır.

| Klasör | Tasarım |
|---|---|
| `1-frontend-design/` | frontend-design skill'i — komut alanı, IBM Plex, yeşil şeritli tablolar |
| `2-high-end-visual-design/` | high-end-visual-design skill'i — hep beyaz, çift çerçeveli paneller, bento |

CPeak projesine etkisi yoktur: Astro yalnızca `src/` ve `public/` okur; bu
klasör `tsconfig.json`'da `exclude` listesindedir, bu yüzden `astro check`
de onu taramaz.
