# SAP FI Compass — tasarım sürümleri

CPeak sitesinden **bağımsız**, sunucusuz ve internetsiz çalışan bir sitedir.
Her klasör aynı sitenin farklı bir tasarım sürümüdür; `index.html`'e çift
tıklayarak açılır.

| Klasör | Tasarım |
|---|---|
| `1-frontend-design/` | frontend-design skill'i — komut alanı, IBM Plex, yeşil şeritli tablolar |
| `2-high-end-visual-design/` | high-end-visual-design skill'i — hep beyaz, çift çerçeveli paneller, bento |
| `3-design-taste-frontend/` | design-taste-frontend skill'i — 2. sürümün denetlenmiş hali: bölünmüş karşılama, tek görsel olarak SAP logosu, tek vurgu rengi, tek yarıçap kuralı, Phosphor ikonlar, hiç uzun tire yok (içerik dahil) |
| `4-awwwards-animations/` | awwwards-animations skill'i — 3. sürümün üstüne hareket katmanı: Lenis yumuşak kaydırma, başlık satır açılımı, kaydırmayla kart girişleri, manyetik ana düğme, komut alanı yazı ipucu, konu sayfasında okuma çubuğu |
| `5-ui-ux-pro-max/` | ui-ux-pro-max skill'i — 4. sürümün kullanılabilirlik ve erişilebilirlik denetimi: içeriğe atlama bağlantısı, dokunmatikte 44px dokunma alanları, 12px altında metin yok, başlık sırası, okundu durumu metinle, mobil menüde odak yönetimi ve Esc, klavyeyle gizli içeriğe erişim, daha sade hareket |

CPeak projesinin hiçbir dosyası değiştirilmedi. Astro yalnızca `src/` ve
`public/` klasörlerini derler; bu klasör build çıktısına girmez.

## 3. sürümdeki görsel

Sitedeki tek görsel SAP logosudur: `3-design-taste-frontend/img/sap-logo.svg`
(Simple Icons, `sap`). Yereldir; site internetsiz çalışır. Başka fotoğraf
ya da çizim yoktur.

SAP ve SAP logosu SAP SE'nin ticari markasıdır. Bu site bağımsız bir
eğitim kaynağıdır; SAP SE ile bağlantılı değildir, SAP tarafından
onaylanmamıştır.

## 4. sürümdeki kütüphaneler

`4-awwwards-animations/js/vendor/` altında yereldir (çevrimdışı çalışır):

| Kütüphane | Sürüm | Lisans |
|---|---|---|
| GSAP (+ ScrollTrigger, SplitText) | 3.15.0 | GSAP Standard "no charge" lisansı — https://gsap.com/standard-license |
| Lenis | 1.3.26 | MIT |

Hareket azaltma tercihi (`prefers-reduced-motion: reduce`) açıksa hiçbir
animasyon ve yumuşak kaydırma çalışmaz; site durağan ve eksiksiz görünür.
