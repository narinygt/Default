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

### Sayfa sırası

Sayfa sırası ve numaraları müşterinin verdiği listeye göredir; slayt
üzerindeki numara o listeyle birebir aynıdır. Kapak ve iletişim sayfası
numarasızdır.

| Sayfa | Başlık | Kaynak |
| --- | --- | --- |
| — | Kapak | `home.ts` — `hero`; görsel: `hero-team.webp` |
| 01 | SAP Finans Modülleri | `solutions/finance.ts`; görsel: `finans-mimari*.webp` |
| 02 | S/4HANA Dönüşümü | `solutions/s4hana.ts` — geçiş yöntemleri tablosu |
| 03 | SAP Public Cloud | `solutions/publicCloud.ts` — katman şeması |
| 04 | SAP Private Cloud | `solutions/privateCloud.ts` — sorumluluk şeması |
| 05 | Public / Private karşılaştırması | `solutionsOverview.ts` — `cloud.rows`; görsel: `bulut-modelleri*.webp` |
| 06 | Yapay Zeka ve Finans | `home.ts` — `aiSection`; görsel: `yapay-zeka-akisi*.webp` |
| 07 | Teslim edilenler | `solutions/*.ts` — `deliverables`; `approach.ts` — `reporting` |
| 08 | Nasıl çalışırız | `home.ts` — `process`; görsel: `surec-adimlari*.webp` |
| 09 | Referanslar | `src/data/references.ts` — logoların tamamı |
| 10 | Yaklaşımımız | `approach.ts` — `principles`, `engagement` |
| 11 | Ne üzerinde çalışıyoruz | `about.ts` — `focus`, `optionalFacts`; `approach.ts` — `notDoing` |
| — | İletişim | `src/config/site.ts`; `pages/contact.ts`; görsel: `quantum-duotone.webp` |

**Metinler site cümlelerinin kopyası değildir.** Bilgi sitedendir;
ifade slayt için kısaltılmış ve kurumsal sunum diline yeniden
yazılmıştır. Site metni değişirse `icerik.cjs` elle güncellenir —
betikler `src/` içinden okuma yapmaz.

Çözüm sayfaları (01–04) ortak bir iskelet kullanır: solda hep aynı sıra
(çalışma adımları → kime uygun → süre), sağda sayfaya göre değişen alan
— görsel, tablo ya da şema.

### Logo

Her içerik sayfasının **sağ üst köşesinde** sabit konumda durur; başlık
bloğu sola yaslı olduğu için orası her slaytta boştur. Kapak ve iletişim
sayfası logoyu büyük boyutta taşır. Alt bilgide yalnızca sayfa numarası
vardır.

## Görseller

Sunumda **sitenin görselleri kullanılmaz**; stok fotoğraf da yoktur.
Bütün görsel öğeler markanın renkleriyle pptx içinde şekillerden
çizilir:

| Sayfa | Görsel öğe |
| --- | --- |
| Kapak, kapanış | Sağa hizalı katman çubukları, tek amber vurgu (`coverArt`) |
| 01, 02, 06 | Numaralı akış şeridi (`flowRow`) |
| 03, 04 | Yığılmış blok şeması — katman ve sorumluluk (`schema`) |
| 05 | Gerçek tablo: teal başlık bandı, dönüşümlü satır yüzeyi (`table`) |
| 08 | Dört aşama kutusu, sonuncusu dolu teal |
| 09 | Referans logo duvarı, satırlara eşit ağırlıkla dağıtılmış (`refWall`) |

Tek raster varlık marka logosu ve referans logolarıdır; onlar
`public/brand` ve `public/logos` altındaki kaynaklardan `varliklar.cjs`
ile PNG'ye çevrilir.

## Yeniden üretmek

```bash
cd sunum/uretici
npm i pptxgenjs          # yalnızca ilk seferinde
node build.cjs           # iki dili de üretir
node build.cjs tr        # yalnızca Türkçesini
```

Logolar `assets/` içinde hazır PNG olarak durur; kaynak SVG/WebP
dosyaları değişirse `npm i sharp` sonrası `node varliklar.cjs` ile
yenilenir. Başka görsel varlık yoktur — diğer bütün görseller pptx
içinde şekillerden çizilir.
