# SAP FI Compass — tasarım sürümleri

CPeak sitesinden **bağımsız**, sunucusuz ve internetsiz çalışan bir sitedir.
Her klasör aynı sitenin farklı bir tasarım sürümüdür; `index.html`'e çift
tıklayarak açılır.

| Klasör | Tasarım |
|---|---|
| `1-frontend-design/` | frontend-design skill'i — komut alanı, IBM Plex, yeşil şeritli tablolar |
| `2-high-end-visual-design/` | high-end-visual-design skill'i — hep beyaz, çift çerçeveli paneller, bento |
| `3-design-taste-frontend/` | design-taste-frontend skill'i — 2. sürümün denetlenmiş hali: bölünmüş karşılama, tek yarıçap kuralı, Phosphor ikonlar, arayüzde uzun tire yok |

CPeak projesine etkisi yoktur: Astro yalnızca `src/` ve `public/` okur; bu
klasör `tsconfig.json`'da `exclude` listesindedir, bu yüzden `astro check`
de onu taramaz.
