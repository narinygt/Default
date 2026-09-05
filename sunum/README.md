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
| 01 Kapak | `src/data/home.ts` — `hero` |
| 02 Biz kimiz | `src/data/pages/about.ts` — `hero`, `story`, `optionalFacts`; `home.ts` — `strip` |
| 03 Uzmanlık alanları | `about.ts` — `focus` |
| 04 SAP ekosistemi | `src/data/solutions/*.ts`; `home.ts` — `aiSection.forClients` |
| 05 Çözümler | `solutions/*.ts` — `navTitle`, `navDesc`, `comparison` |
| 06 Bulut modeli kararı | `src/data/pages/solutionsOverview.ts` — `cloud.rows` |
| 07 Değeri nasıl üretiyoruz | `src/data/pages/approach.ts` — `principles` |
| 08 Çalışma yaklaşımı | `home.ts` — `process` |
| 09 Teknoloji ve iş | `home.ts` — `aiSection` |
| 10 Pratikte projeler | `home.ts` — `scenarios` (sitedeki "temsili senaryo" uyarısıyla birlikte) |
| 11 Neden CPeak | `home.ts` — `why`; `src/data/references.ts` |
| 12 Kapanış | `src/config/site.ts`; `pages/contact.ts` |

Site metni değişirse sunumun ilgili slaydı elle güncellenir — betikler
`src/` içinden okuma yapmaz, çünkü sunum dili site dilinin kısaltılmış
hâlidir, birebir kopyası değil.

## Tasarım sistemi

Renkler, tipografi ölçeği, köşe yarıçapı ve çizgi kalınlığı doğrudan
`src/styles/global.css` token'larından alınmıştır — sunum için yeni bir
palet kurulmamıştır. İmza görseli (defter çizgilerinin düğüm ağına
çözülmesi) `src/components/Ledger.astro` geometrisinin birebir aynısıdır.

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
