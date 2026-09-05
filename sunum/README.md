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

### Sıralama bir argümandır

Deste sitenin bölüm sırasını izlemez. Site bir başvuru kaynağıdır;
sunum ise bir toplantıda savunulan bir sav olmak zorundadır. Sıra şu
soruları sırasıyla cevaplar: **Bu tablo tanıdık mı? · Yanlış kararın
bedeli ne? · Buna karşı ne öneriyoruz? · Bunu yapabileceğinizin kanıtı
ne? · Nasıl çalışıyorsunuz? · Elimde ne kalıyor? · Nasıl başlarım?**

| Slayt | Rolü | Kaynak |
| --- | --- | --- |
| 01 Kapak | konumlandırma | `home.ts` — `hero`; görsel: `hero-team.webp` |
| 02 Başlangıç noktası | müşterinin durumu | `solutions/*.ts` — `challenges`; görsel: `finans-mimari*.webp` |
| 03 Kararın bedeli | risk | `solutions/*.ts` — `summary`; `approach.ts` — `principles` |
| 04 Cevabımız | konum + farklar | `about.ts` — `hero`, `story`, `optionalFacts`; `home.ts` — `why`; `references.ts` |
| 05 Finans çekirdeği | derinlik kanıtı | `solutions/*.ts`; `home.ts` — `aiSection.forClients` |
| 06 Bulut kararı | fark kanıtı | `solutionsOverview.ts` — `cloud.rows`; görsel: `bulut-modelleri*.webp` |
| 07 Teknoloji ve iş | fark kanıtı | `home.ts` — `aiSection`; görsel: `yapay-zeka-akisi*.webp` |
| 08 Nasıl çalışıyoruz | yöntem | `approach.ts` — `principles` |
| 09 Dört adım | yöntem | `home.ts` — `process`; görsel: `surec-adimlari*.webp` |
| 10 Elinizde ne kalıyor | somut çıktı | `solutions/*.ts` — `deliverables`; `approach.ts` — `reporting` |
| 11 Nasıl çalışırız | ticari teklif | `approach.ts` — `engagement`, `notDoing` |
| 12 Kapanış | sonraki adım | `src/config/site.ts`; `pages/contact.ts`; görsel: `quantum-duotone.webp` |

Site metni değişirse `icerik.cjs` elle güncellenir — betikler `src/`
içinden okuma yapmaz, çünkü sunum dili site dilinin kısaltılmış hâlidir,
birebir kopyası değil.

Slayt başlıkları konu adı değil, **iddia** cümleleridir: "SAP ekosistemi"
yerine "Dört dağıtım modelinin hepsi aynı finans çekirdeğine bağlanır".
Başlıkları arka arkaya okumak destenin savını verir.

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
