# Kurumsal sunum

CPeak Consultancy kurumsal tanıtım sunumu — 12 slayt, 16:9, iki dilde.

| Dosya | Ne için |
| --- | --- |
| `CPeak-Consultancy-Kurumsal-Tanitim.pptx` | Türkçe, düzenlenebilir |
| `CPeak-Consultancy-Kurumsal-Tanitim.pdf` | Türkçe, gönderim / baskı (fontlar gömülü) |
| `CPeak-Consultancy-Company-Overview.pptx` | İngilizce, düzenlenebilir |
| `CPeak-Consultancy-Company-Overview.pdf` | İngilizce, gönderim / baskı |
| `uretici/` | Sunumları üreten betikler |

İki dil birbirinin çevirisi değildir: her biri sitenin kendi dilindeki
metninden türetilmiştir. Yerleşim ortaktır, metin `uretici/icerik.cjs`
içinde dile göre ayrılır — sitedeki `Record<Lang, ...>` düzeniyle aynı
mantık.

## İçerik nereden geliyor

Sunumdaki **her cümle bu depodaki site metinlerinden** türetilmiştir;
hiçbir rakam, müşteri iddiası, sertifika, ödül ya da iş ortaklığı
uydurulmamıştır. Kaynak eşlemesi (TR metin `tr`, EN metin `en`
anahtarından okunur):

| Slayt | Kaynak |
| --- | --- |
| 01 Kapak | `src/data/home.ts` — `hero`; görsel: `hero-team.webp` |
| 02 Biz kimiz | `src/data/pages/about.ts` — `hero`, `story`, `optionalFacts`; `home.ts` — `strip` |
| 03 Uzmanlık alanları | `about.ts` — `focus`; görsel: `finans-mimari*.webp` |
| 04 SAP ekosistemi | `src/data/solutions/*.ts`; `home.ts` — `aiSection.forClients` |
| 05 Çözümler | `solutions/*.ts` — `navTitle`, `navDesc`, `comparison` |
| 06 Bulut modeli kararı | `pages/solutionsOverview.ts` — `cloud.rows`; görsel: `bulut-modelleri*.webp` |
| 07 Değeri nasıl üretiyoruz | `pages/approach.ts` — `principles` |
| 08 Çalışma yaklaşımı | `home.ts` — `process`; görsel: `surec-adimlari*.webp` |
| 09 Teknoloji ve iş | `home.ts` — `aiSection`; görsel: `yapay-zeka-akisi*.webp` |
| 10 Pratikte projeler | `home.ts` — `scenarios` (sitedeki "temsili senaryo" uyarısıyla) |
| 11 Neden CPeak | `home.ts` — `why`; `src/data/references.ts` |
| 12 Kapanış | `src/config/site.ts`; `pages/contact.ts`; görsel: `quantum-duotone.webp` |

Site metni değişirse `icerik.cjs` elle güncellenir — betikler `src/`
içinden okuma yapmaz, çünkü sunum dili site dilinin kısaltılmış hâlidir,
birebir kopyası değil.

## Görseller

Sunumdaki bütün görseller `public/media/` altındaki **sitenin kendi
görselleridir**; stok fotoğraf ya da yeni üretilmiş görsel yoktur.
Bölüm görsellerinin iki dili vardır: `-en` ekli dosya İngilizce, eksiz
olan Türkçe. `uretici/gorseller.cjs` ikisini birden hazırlar.

Çevirirken sitedeki kenar davranışı da işlenir: `.section-figure`
kuralındaki %3'lük rampa piksele uygulanır ve görsel, konduğu slaytın
zemin rengiyle düzleştirilir. Böylece görseller sunumda da çerçevesiz
durur, kutu kenarı görünmez.

## Tasarım sistemi

Renkler, tipografi ölçeği, köşe yarıçapı ve çizgi kalınlığı doğrudan
`src/styles/global.css` token'larından alınmıştır — sunum için yeni bir
palet kurulmamıştır.

**Destede hiç çizgi yoktur.** Çerçeve, ayraç, alt çizgi, bağlantı çizgisi
ve eksen çizgisi kullanılmaz; sitedeki `.eyebrow` öğesinin solundaki kısa
çizgi de dahil hepsi kaldırılmıştır. Ayrımlar üç şeyle yapılır: aralık,
yüzey (tablo başlığının altındaki ince zemin, 04'teki dolgulu kutular,
10'daki beyaz panel, koyu bantlar) ve tipografik ağırlık (05 ve 07'deki
monospace numaralar). Tek istisna madde işareti olarak kullanılan
birkaç noktadır. `uretici/lib.cjs` içindeki `rule` / `vrule` / `seg`
yardımcıları artık hiçbir slaytta çağrılmaz; ileride gerekirse diye
duruyor.

**Fontlar:** Schibsted Grotesk (başlık), Inter (gövde), IBM Plex Mono
(etiket ve rakam) — sitenin kullandığı üç yüz. `.pptx` dosyası font
GÖMMEZ: bu üç font kurulu olmayan bir makinede PowerPoint kendi yedeğine
düşer. Sunumu dışarıya gönderirken PDF sürümünü kullanın, fontlar orada
gömülüdür.

Türkçe sunum için fontun **latin-ext** kapsamı şarttır: `ğ İ ş` bu
alt kümededir, yalnızca `latin` yüklenirse bu harfler başka bir yüzden
gelir ve metin bozulur. `global.css` aynı uyarıyı taşır. Depodaki
`public/fonts/` her iki alt kümeyi de içerir.

## Yeniden üretmek

```bash
cd sunum/uretici
npm i pptxgenjs          # yalnızca ilk seferinde
node build.cjs           # iki dili de üretir
node build.cjs tr        # yalnızca Türkçesini
```

Logolar ve bölüm görselleri `assets/` içinde hazır durur. Depodaki
kaynaklar değişirse `npm i sharp` sonrası `node varliklar.cjs` (logolar)
ve `node gorseller.cjs` (bölüm görselleri) ile yenilenir.
