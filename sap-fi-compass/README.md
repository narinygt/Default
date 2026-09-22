# SAP FI Compass — tasarım sürümleri

CPeak sitesinden **bağımsız**, sunucusuz ve internetsiz çalışan bir sitedir.
Her klasör aynı sitenin farklı bir tasarım sürümüdür; `index.html`'e çift
tıklayarak açılır.

| Klasör | Tasarım |
|---|---|
| `1-frontend-design/` | frontend-design skill'i — komut alanı, IBM Plex, yeşil şeritli tablolar |
| `2-high-end-visual-design/` | high-end-visual-design skill'i — hep beyaz, çift çerçeveli paneller, bento |
| `3-design-taste-frontend/` | design-taste-frontend skill'i — 2. sürümün denetlenmiş hali: bölünmüş karşılama, gerçek fotoğraflar, tek vurgu rengi, tek yarıçap kuralı, Phosphor ikonlar, hiç uzun tire yok (içerik dahil) |

CPeak projesine etkisi yoktur: Astro yalnızca `src/` ve `public/` okur; bu
klasör `tsconfig.json`'da `exclude` listesindedir, bu yüzden `astro check`
de onu taramaz.

## 3. sürümdeki fotoğraflar

Picsum üzerinden indirilen Unsplash fotoğraflarıdır (Unsplash lisansı) ve
`3-design-taste-frontend/img/` altında yereldir; site internetsiz çalışır.

| Dosya | Fotoğrafçı | Kaynak |
|---|---|---|
| `img/hero-desk.jpg` | Galymzhan Abdugalimov | https://unsplash.com/photos/ICW6QYOcdlg |
| `img/daily-operations.jpg` | Aleks Dorohovich | https://unsplash.com/photos/nJdwUHmaY8A |
| `img/period-end.jpg` | petradr | https://unsplash.com/photos/8hgm6mKK04U |
| `img/advanced.jpg` | Charlie Foster | https://unsplash.com/photos/Osl4I3IS9Cw |
