# Kurumsal sunum

CPeak Consultancy kurumsal tanıtım sunumu — 12 slayt, 16:9.

| Dosya | Ne için |
| --- | --- |
| `CPeak-Consultancy-Company-Overview.pptx` | Düzenlenebilir sunum |
| `CPeak-Consultancy-Company-Overview.pdf` | Gönderim / baskı sürümü (fontlar gömülü) |
| `uretici/` | Sunumu üreten betikler |

## İçerik nereden geliyor

Sunumdaki **her cümle bu depodaki site metinlerinden** türetilmiştir;
hiçbir rakam, müşteri iddiası, sertifika, ödül ya da iş ortaklığı
uydurulmamıştır. Kaynak eşlemesi:

| Slayt | Kaynak |
| --- | --- |
| 01 Kapak | `src/data/home.ts` — `hero`; görsel: `hero-team.webp` |
| 02 Biz kimiz | `src/data/pages/about.ts` — `hero`, `story`, `optionalFacts`; `home.ts` — `strip` |
| 03 Uzmanlık alanları | `about.ts` — `focus`; görsel: `finans-mimari-en.webp` |
| 04 SAP ekosistemi | `src/data/solutions/*.ts`; `home.ts` — `aiSection.forClients` |
| 05 Çözümler | `solutions/*.ts` — `navTitle`, `navDesc`, `comparison` |
| 06 Bulut modeli kararı | `solutionsOverview.ts` — `cloud.rows`; görsel: `bulut-modelleri-en.webp` |
| 07 Değeri nasıl üretiyoruz | `src/data/pages/approach.ts` — `principles` |
| 08 Çalışma yaklaşımı | `home.ts` — `process`; görsel: `surec-adimlari-en.webp` |
| 09 Teknoloji ve iş | `home.ts` — `aiSection`; görsel: `yapay-zeka-akisi-en.webp` |
| 10 Pratikte projeler | `home.ts` — `scenarios` (sitedeki "temsili senaryo" uyarısıyla birlikte) |
| 11 Neden CPeak | `home.ts` — `why`; `src/data/references.ts` |
| 12 Kapanış | `src/config/site.ts`; `pages/contact.ts`; görsel: `quantum-duotone.webp` |

Site metni değişirse sunumun ilgili slaydı elle güncellenir — betikler
`src/` içinden okuma yapmaz, çünkü sunum dili site dilinin kısaltılmış
hâlidir, birebir kopyası değil.

## Görseller

Sunumdaki bütün görseller `public/media/` altındaki **sitenin kendi
görselleridir** (İngilizce sürümleri); stok fotoğraf ya da yeni üretilmiş
görsel yoktur. `uretici/gorseller.cjs` bunları pptx'in gömebileceği
biçime çevirirken sitedeki kenar davranışını da işler: `.section-figure`
kuralındaki %3'lük rampa piksele uygulanır ve görsel, konduğu slaytın
zemin rengiyle düzleştirilir. Böylece görseller sunumda da çerçevesiz
durur, kutu kenarı görünmez.

## Tasarım sistemi

Renkler, tipografi ölçeği, köşe yarıçapı ve çizgi kalınlığı doğrudan
`src/styles/global.css` token'larından alınmıştır — sunum için yeni bir
palet kurulmamıştır.

**Çizgi kullanımı bilinçli olarak azdır.** Deste boyunca yalnızca üç
yapısal çizgi vardır: çözüm tablosunun başlık altı (05), değer zincirinin
üzerinde durduğu eksen (07) ve dört sütunu taşıyan çizgi (11). Bunların
dışındaki ayrımlar aralıkla, yüzeyle ya da renkle yapılır. Bölüm
etiketlerinin solundaki kısa çizgi sitenin `.eyebrow` öğesidir.

**Fontlar:** Schibsted Grotesk (başlık), Inter (gövde), IBM Plex Mono
(etiket ve rakam) — sitenin kullandığı üç yüz. `.pptx` dosyası font
GÖMMEZ: bu üç font kurulu olmayan bir makinede PowerPoint kendi
yedeğine düşer. Sunumu dışarıya gönderirken PDF sürümünü kullanın,
fontlar orada gömülüdür. Font dosyaları `public/fonts/` içindedir.

## Yeniden üretmek

```bash
cd sunum/uretici
npm i pptxgenjs          # yalnızca ilk seferinde
node build.cjs            # .pptx'i bulunduğunuz dizine yazar
```

Logolar `assets/` içinde hazır PNG olarak durur. Depodaki SVG/WebP
kaynakları değişirse `npm i sharp && node varliklar.cjs` ile yenilenir.
