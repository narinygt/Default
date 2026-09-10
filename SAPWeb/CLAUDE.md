# SAP S/4HANA FI — İnteraktif Eğitim Platformu

> Bu dosya projenin **tek kaynağıdır**: plan, mimari, veri şeması, içerik durumu ve
> çıkarılan dersler burada tutulur. **Her güncellemede yenilenir.**
> Amaç: projeyi başka bir yapay zeka sohbetine aktarırken tek dosya vererek tüm bağlamı taşımak.

**Son güncelleme:** 10 Eylül 2026 · **Tasarım sistemi baştan yazıldı** (bkz. §5b) ve
**36 konunun 36'sı** derin içerikle dolduruldu — katalog **tamamlandı**.
**Sözlükler:** 262 işlem kodu · 92 tablo · 164 terim (üçünde de çift kayıt yok — bkz. Ders #26).

> ⭐ **ARAYÜZ BAŞTAN TASARLANDI — "Dijital muhasebe defteri".**
> İçerik ve işlevler aynı; değişen görsel dil ve yerleşim (bkz. §5b).
> Özet: ana sayfa **numaralı bir içindekiler dizini** oldu (kart ızgarası
> kalktı), **tek vurgu rengi** defter yeşili `#1F5C4A` (dokuz grup rengi
> kaldırıldı), **kutu/gölge/gradyan yok**, **emoji sıfır** (Lucide çizgi
> ikonları), **Fraunces + Inter + IBM Plex Mono gömüldü**, ve arayüz
> **TR/EN** iki dilli (bkz. §10).

## ⚠️ Uygulamayı nasıl açarsın
- **Doğru yol:** Windows Gezgini'nden `index.html`'e (veya `tek-dosya.html`'e) **çift tıkla**.
- **Çalışmayan yol:** Claude'un önizleme paneli. Panel, ana proje klasörü dışındaki dosyaları
  *statik anlık görüntü* olarak açar ve **JavaScript'i çalıştırmaz** — üst çubuk görünür,
  kenar çubuğu ve içerik boş kalır. Bu bir hata değil, panelin sınırıdır (bkz. Ders #12).

---

## 1. Proje Özeti

Tarayıcıda çalışan, SAP S/4HANA Financial Accounting (FI) modülünü **danışman/mülakat
seviyesinde** öğreten interaktif eğitim platformu.

**Amaç:** işlem kodu ezberletmek değil; her sürecin *iş mantığını*, *muhasebe etkisini*,
*SAP ekranlarını*, *tablolarını* ve *S/4HANA'daki çalışma şeklini* birlikte öğretmek.

**Çalıştırma:** `index.html`'e çift tıkla. Sunucu yok, `npm install` yok, derleme yok.
İnternet olmadan tam çalışır (harici font/CDN kullanılmaz).

**Dil:** Tamamen Türkçe — bkz. §2 Dil Kuralı.

---

## 2. Onaylanan Kararlar ve Dil Kuralı

| Karar | Seçim | Gerekçe |
|---|---|---|
| Teknoloji | Vanilla JS, build yok | Kod başka AI sohbetlerine kopyala-yapıştır ile aktarılabilmeli |
| Yükleme | Klasik `<script src>` | `file://` altında ES module CORS'a takılır (Ders #1) |
| İlk teslim | Motor + 34 konu kartı + 4 konu derin | 34 konuyu tek seferde yazmak mümkün değil |
| Dil | Tamamen Türkçe | Kullanıcı tercihi |
| Derinlik | Danışman / mülakat seviyesi | Kullanıcı tercihi |

### Dil kuralı (kesin)
- Tüm anlatım, başlıklar, arayüz, muhasebe mantığı, çeşit adları, hata açıklamaları: **Türkçe**.
- **Değişmeyen literaller:** T-code kodu (`FB50`), tablo adı (`BSEG`), alanın teknik adı
  (`BUDAT`), SPRO/IMG düğüm metni. Bunlar sistemde birebir böyle görünür; çevrilirse SAP'ta bulunamaz.
- Bu literallerin yanında Türkçe karşılığı verilir: `BSEG` → *"Belge Kalemleri tablosu"*.
- SAP kavramları Türkçeleştirilir, ilk geçtiği yerde bir kez parantezle orijinali verilir:
  *"Kapatma (Clearing)"*, *"Evrensel Kayıt Defteri (Universal Journal)"*. Sonra sadece Türkçesi.
- Sözlük (`#/terim/...`) her terimin Türkçe + İngilizce karşılığını birlikte tutar.

---

## 3. Mimari

```
SAPWeb/
├── index.html            # SADECE kabuk: head, topbar, sidebar, #view + script etiketleri
├── css/
│   ├── theme.css         # TASARIM SİSTEMİ: ilkeler, renk/ölçek tokenleri, reset, tipografi
│   ├── app.css           # layout, kartlar, sidebar, bileşenler, diyagramlar, responsive
│   └── print.css         # @media print — "PDF olarak dışa aktar" çıktısı
├── js/
│   ├── core.js           # SAP namespace, registry, store (localStorage), router, olay delegasyonu
│   ├── markup.js         # {{...}} çapraz link çözümleyici + satır içi biçim + auditRefs()
│   ├── diagram.js        # flow / er / tHesap / fis renderer'ları
│   ├── sections.js       # 11 bölümün renderer'ları + ortak UI parçaları (SAP.ui)
│   ├── views.js          # ekranlar: ana sayfa, konu, tcode, tablo, terim, favori, not, arama
│   ├── learn.js          # quiz, flash kart, notlar, ilerleme, favori, yazdırma
│   ├── search.js         # arama indeksi (konu + tcode + tablo + terim)
│   └── ui.js             # kabuk: sidebar, topbar, tema, Ctrl+K paleti, boot()
├── data/
│   ├── tcodes.js         # 254 işlem kodu sözlüğü
│   ├── tables.js         # 88 tablo sözlüğü
│   ├── glossary.js       # 142 muhasebe/SAP terimi
│   └── catalog.js        # modül + grup tanımı + 36 konunun kart meta verisi (stub)
├── content/fi/           # her konu = bir dosya (derin içerik)
│   ├── genel-muhasebe.js
│   ├── fi-temelleri.js
│   ├── master-data.js
│   ├── gl-accounting.js
│   ├── accounts-payable.js
│   ├── accounts-receivable.js
│   ├── f110.js
│   ├── clearing.js
│   ├── asset-accounting.js
│   ├── document-posting.js
│   ├── bank-accounting.js
│   ├── ebs.js
│   ├── closing.js
│   ├── foreign-currency.js
│   ├── mm-integration.js
│   ├── sd-integration.js
│   ├── taxes.js
│   ├── new-gl.js
│   ├── parallel-ledger.js
│   ├── special-gl.js
│   ├── dunning.js
│   ├── document-parking.js
│   ├── cost-center.js
│   ├── co-integration.js
│   ├── org-yapisi.js
│   ├── reporting.js
│   ├── sap-tables.js
│   ├── dogrulama-ikame.js
│   ├── tcodes.js
│   ├── error-handling.js
│   ├── e-donusum.js
│   ├── lsmw.js
│   ├── data-upload.js
│   ├── migration.js
│   ├── best-practices.js
│   └── s4-yenilikleri.js
├── derle.ps1             # tek-dosya.html üretir (Windows / PowerShell)
├── derle.mjs             # aynı çıktının Node karşılığı — `node derle.mjs`
├── tek-dosya.html        # ÜRETİLMİŞ tek dosyalık sürüm — taşımak/paylaşmak için
└── CLAUDE.md             # bu dosya
```

### `tek-dosya.html` ve `derle.ps1`
`tek-dosya.html`, tüm CSS/JS'i içine gömülmüş **üretilmiş** bir çıktıdır; asıl kaynak
`index.html` + klasörlerdir. İçerik değiştikten sonra PowerShell'de bu klasörde:

```
.\derle.ps1
```

Betik dosya listesini **`index.html`'den okur** — yeni konu eklendiğinde betiği güncellemek
gerekmez. `</script>` dizisi içeriyorsa hata verip durur.

> **Betikte `-replace` kullanılmaz, `.Replace()` kullanılır.** .NET'in `-replace` işlemi
> değiştirme metnindeki `$1`, `$&` gibi dizileri özel yorumlar; JS gövdesinde geçen
> `'<code>$1</code>'` benzeri ifadeler sessizce bozulur (bkz. Ders #13).

### Bozulmaması gereken kurallar
1. **ES module yok.** Tüm dosyalar klasik `<script src>` ile yüklenir, global `SAP` nesnesine kayıt olur.
2. **`fetch` / JSON dosyası yok.** `file://` altında CORS'a takılır. Veri `.js` dosyalarında sabittir.
3. **Dinamik script enjeksiyonu yok.** `index.html`'deki statik etiketler, sabit sırayla.
4. **`index.html`'e içerik yazılmaz.** Yeni konu = `content/fi/` altına dosya + `index.html`'e tek satır.
5. **Harici CDN/font yok.** Çevrimdışı çalışma garantisi (Ders #2).

### Yükleme sırası (index.html'de sabit)
```
1) çekirdek   core → markup → diagram
2) veri       tcodes → tables → glossary → catalog     (catalog stub'ları kaydeder)
3) içerik     content/fi/*.js                          (stub'ları derin bölümlerle doldurur)
4) arayüz     sections → views → learn → search → ui   (ui.js boot() çağırır)
```
> `sections.js`, `views.js`'ten **önce** yüklenmelidir: views.js yükleme anında `SAP.ui`'yi okur.

### Çekirdek API (`js/core.js`)
```js
SAP.registerModule({id, name, icon, order})
SAP.registerTopic({id, sections, ...})   // aynı id ile MERGE eder (stub + derin içerik)
SAP.registerTcodes([...]) / registerTables([...]) / registerTerms([...])
SAP.topic(id) / SAP.tcode(kod) / SAP.table(ad) / SAP.term(anahtar)
SAP.store          // localStorage sarmalayıcı, anahtar: 'sapfi_v1'
SAP.view(ad, fn)   // ekran kaydı        SAP.action(ad, fn)  // data-action işleyici
SAP.render({keepScroll})  SAP.go(hash)   SAP.onRender(fn)
SAP.mk(s) / SAP.mkp(s) / SAP.mkul(arr)   // metin → HTML (escape + biçim + çapraz link)
SAP.auditRefs()    // çözülemeyen {{...}} işaretlerini raporlar
```

### Yönlendirme (hash tabanlı — `file://` güvenli)
`#/` · `#/konu/<id>` · `#/tcode/<KOD>` · `#/tablo/<AD>` · `#/terim/<anahtar>` ·
`#/favoriler` · `#/notlar` · `#/ara/<sorgu>`

### Çapraz bağlantı motoru — projenin can damarı
İçerik yazarı düz metinde `{{FB50}}` yazar. `markup.js` anahtarı sırayla
**tcode → tablo → terim → konu** defterlerinde arar ve tıklanabilir çipe çevirir
(hover ipucu = sözlükteki açıklama). Açık önek de yazılabilir:
`{{tcode:FB50}}` `{{tablo:BSEG}}` `{{terim:kapatma}}` `{{konu:gl-accounting}}`.
Etiket: `{{FB50|G/L kayıt ekranı}}`.

Bulunamayan anahtar **sayfayı kırmaz**: düz metin basılır + konsola uyarı düşer.
`SAP.auditRefs()` tüm içeriği tarayıp raporlar — **bu liste her zaman boş olmalıdır**.

**Sıra kritik:** önce HTML escape → sonra satır içi biçim → en son işaret çözümleme.

### Genişletilebilirlik (CO, MM, SD… için)
Yeni modül eklemek: `SAP.registerModule({id:'CO', ...})` + `data/catalog-co.js` +
`content/co/*.js` + `index.html`'e script satırları. Motorda **hiçbir değişiklik gerekmez** —
grup, kart, sidebar, arama, ilerleme otomatik uyum sağlar.

---

## 4. Konu İçerik Şeması (`SAP.registerTopic`)

`catalog.js` **stub** kaydeder (kart bilgisi), `content/fi/<id>.js` **derin bölümleri** ekler.

### Stub (catalog.js)
```js
{ id, grup, title, icon, hue, level, minutes, summary, related:[], tcodes:[], tables:[] }
```
`hue` = oklch renk açısı; kart rengi tek formülle hesaplanır. `grup` = §5'teki grup id'si.

### Derin içerik (content/fi/<id>.js)
Renderer **var olmayan bölümü atlar** — referans konuları tüm bölümleri içermek zorunda değil.

```js
SAP.registerTopic({ id:'gl-accounting', sections: {

  tanim:     { nedir, neden, sirketOnemi, gercekHayat, muhasebeMantigi, kavramlar:[terimAnahtarı] },

  surec:     { anlatim, roller:[{rol,gorev}],
               diyagram:{type:'flow', baslik, adimlar:[{ic,rol,baslik,aciklama,cikti,ok}]},
               adimlar:[{rol,eylem,sistem}],
               veriAkisi:{nereden,nereye,tetikleyen,sonraki},
               notlar:[{tip:'tip|warn|err|info',baslik,metin}] },

  muhasebe:  { anlatim, etkilenenHesaplar:[{hesap,tur,neden}],
               fisler:[{baslik,belgeTuru,tarih,paraBirimi,
                        satirlar:[{hesap,ad,borc,alacak,not}], not}],
               tHesaplar:[{hesap,kod,borc:[{ad,tutar}],alacak:[...],not}],
               notlar:[...] },

  cesitler:  { anlatim, liste:[{ad,en,aciklama,neZaman,ornek,tcodes:[]}],
               karsilastirmaBasliklar:[...], karsilastirma:[[satır...]] },

  tcodes:    { anlatim, liste:[{kod,ad,amac,neZaman,
                 adimlar:[{baslik,aciklama}], ekranAkisi:[{ekran,islem}],
                 alanlar:{zorunlu:[],opsiyonel:[]},
                 hatalar:[{mesaj,sebep,cozum}], ipucu, ilgili:[]}] },

  tablolar:  { anlatim, liste:[{ad,baslik,tutar,olusturan,guncelleyen,anahtar,iliskiler,s4,
                 alanlar:[{ad,aciklama}]}],
               er:{type:'er', baslik,
                   varliklar:[{ad,rol,aciklama,hub,alanlar:[{ad,tip:'pk'|'fk',not}]}],
                   iliskiler:[{from,to,alanlar,not}]} },

  sapSurec:  { anlatim, ekranlar:[{ad,aciklama,alanlar:[{ad,zorunlu,aciklama}],ipucu}],
               zorunlu:[], opsiyonel:[], hatalar:[{mesaj,sebep,cozum}], ipuclari:[] },

  teknik:    { guncellenenTablolar:[{tablo,ne}], commit, belgeNo, postingLogic, belgeTuru,
               numberRange, accountDetermination, tur, transport,
               img:[{yol,not}], ekstra:[{ic,baslik,metin}], notlar:[...] },

  s4hana:    { ozet, eccFarklari:[{konu,ecc,s4}], universalJournal,
               kalkanTcodes:[{eski,yeni,not}], fiori:[{ad,aciklama}],
               compatibilityViews:[], performans, bestPractices:[] },

  senaryo:   { baslik, hikaye, veriler:[{k,v}],
               adimlar:[{baslik,tcode,aciklama,girdi:[{alan,deger}],fis:{...},
                         tabloEtkisi:[{tablo,ne}],not}],
               sonuc },

  ogrenme:   { ozet:[], onemliNoktalar:[], sikHatalar:[{hata,dogru}], ipuclari:[],
               quiz:[{soru,secenekler:[],dogru:index,aciklama}],
               flashcards:[{on,arka}] },
  /* ⚠️ `ogrenme` BÖLÜMÜNÜN TAMAMI ARTIK ÇİZİLMİYOR — bkz. §6.
     Veri 36 dosyada duruyor; renderer ve SECTIONS satırı kaldırıldı. */
}});
```

### Metin biçimlendirme (tüm metin alanlarında geçerli)
`**kalın**` · `*italik*` · `` `kod` `` · `\n\n` paragraf · `{{FB50}}` çapraz link · `->` → ok

### Sözlük şemaları
```js
// data/tcodes.js
{ kod, ad, aciklama, modul, tur, konu, s4?, fiori? }
// tur: Ana Veri | İşlem | Rapor | Özelleştirme | Toplu İşlem | Teknik

// data/tables.js
{ ad, baslik, aciklama, modul, tur, konu, anahtar?, olusturan?, s4?,
  alanlar:[{ad, aciklama, tip?:'pk'|'fk'}] }

// data/glossary.js
{ anahtar, ad, en, aciklama, detay?, konu, ilgili:[anahtar] }
// anahtar Türkçe kebab-case; slug() ile normalize edilir (ü→u, ı→i …)
```

---

## 5. Konu Kataloğu — 36 konu, 9 grup

| Grup | Konular |
|---|---|
| 🧱 Temeller | **genel-muhasebe** ✅ · **fi-temelleri** ✅ · **org-yapisi** ✅ · **master-data** ✅ |
| 🏛️ Ana Süreçler | **gl-accounting** ✅ · **accounts-payable** ✅ · **accounts-receivable** ✅ · **asset-accounting** ✅ · **bank-accounting** ✅ |
| ⚙️ Günlük İşlemler | **document-posting** ✅ · **document-parking** ✅ · **clearing** ✅ · **special-gl** ✅ · **f110** ✅ · **ebs** ✅ · **dunning** ✅ · **taxes** ✅ · **dogrulama-ikame** ✅ · **e-donusum** ✅ 🇹🇷 |
| 📅 Dönem Sonu | **foreign-currency** ✅ · **closing** ✅ |
| 🧭 Muhasebe Mimarisi | **new-gl** ✅ · **parallel-ledger** ✅ |
| 🔗 Entegrasyon | **cost-center** ✅ · **co-integration** ✅ · **mm-integration** ✅ · **sd-integration** ✅ |
| 🛠️ Teknik & Raporlama | **sap-tables** ✅ · **tcodes** ✅ · **reporting** ✅ |
| 📦 Veri & Geçiş | **lsmw** ✅ · **data-upload** ✅ · **migration** ✅ |
| 🚀 İleri Seviye | **error-handling** ✅ · **best-practices** ✅ · **s4-yenilikleri** ✅ |

✅ = derin içerik yazıldı (11 bölümün tamamı).

⭐ **Katalog 10 Eylül 2026'da tamamlandı: 36 konunun 36'sı hazır.**
"Yakında" rozetli konu kalmadı; `status:'planned'` yolu motorda duruyor
(yeni modül eklenirse yine çalışır) ama FI tarafında kullanılmıyor.

---

## 5b. Tasarım Sistemi — "Dijital Muhasebe Defteri" (2026 yenilemesi)

> Tek kaynak `css/theme.css`'in başındaki ilke bloğudur. Buradaki özet ona
> uyar; çelişirse **theme.css kazanır**.

**Konsept:** bu bir kurs sitesi değil, iyi dizilmiş bir teknik kitaptır.
Kullanıcı burada *gezinmez*, **okur**. Bütün kararlar bu cümleden çıkar.
İlham: Stripe Docs, Linear, Readwise.

### Beş ilke

1. **Kutu yok, kural çizgisi var.** Kart, gölge, gradyan, yuvarlak köşe
   yok. Ayrım 1px çizgi ve boşlukla yapılır. Yarıçap yalnızca form alanı
   ve odak halkasında (2px).
2. **Tek vurgu rengi** — defter yeşili `#1F5C4A`. Kategorilere renk
   **verilmez**; dokuz grup rengi kaldırıldı. Renk yalnızca **durum**
   taşır: okunmuş, aktif, bağlantı, ilerleme.
   *Gerekçe:* kategori rengi bir kurs kataloğunda yön verir, bir kitapta
   gürültü yapar.
3. **T-hesap ritmi.** Borç/alacak motifi süs değil sayfanın iskeleti:
   solda dar numara/etiket sütunu, sağda geniş içerik, arada tek dikey
   kural. Üç yerde tekrarlanır: **dizin satırı · bölüm başlığı · kv bloğu**.
4. **Üç font, üç iş.** Fraunces → başlık · Inter → gövde ·
   **IBM Plex Mono → rakamlar** (`tabular-nums`; muhasebede rakam hizalanır).
5. **İkon neredeyse yok, emoji hiç yok.** Kalanlar Lucide çizgi ikonu:
   16px, currentColor, 13 adet. Yeni ikon eklemeden önceki soru:
   *"bu ikon olmasa cümle anlaşılmaz mıydı?"*

### Fontlar — çevrimdışı kuralı bozulmadı

⚠️ Üç aile `css/fonts.css` içine **base64 woff2** olarak gömüldü (≈512 KB).
Harici `<link>` çevrimdışı açılışta sessizce düşerdi (Kural #5, Ders #2).
Kapsam **latin + latin-ext** ile sınırlı: latin-ext Türkçe için
**zorunludur** (ı ğ ş İ Ğ Ş). Kiril/Yunan alınmadı — 1.2 MB olurdu.

### Yerleşim kararları

| Bileşen | Karar | Dosya |
|---|---|---|
| Ana sayfa | **Numaralı içindekiler dizini** (01…36), dokuz bölüm. Kart ızgarası, rozet, istatistik kutusu, hero **yok** | `views.js` `home` |
| Satır meta | Yalnızca **seviye** + okundu noktası. ⚠️ **Süre ("40 dk") ve sayaçlar kaldırıldı** — bir kitabın içindekiler sayfasında ne okuma süresi ne bölüm adedi yazar; okuma hızı okuyucunun işidir | `views.js`, `ui.js` |
| Açıklama | Satır **tıklanınca** açılır; dizin taranabilir kalır | `.idx-sum`, `store.acikDizin` |
| Tek eylem | Üstte **"Kaldığın yerden devam et"** + 2px ilerleme çubuğu | `.resume` |
| Gezinme | **TEK YERDE**: sol sütun. Ana sayfadaki üst süzgeç şeridi kaldırıldı | `ui.js` |
| Sol sütun | ☰ ile katlanır; grup başlıkları chevron ile katlanır; konular 01…36 numaralı | `ui.js`, `.side-*` |
| Bölüm başlığı | `01 │ Ad … Okundu ⌄` — T-hesap ayrımının ikinci tekrarı | `.section-h` |
| Uyarı kutusu | İkon yok; **sol renkli şerit + tür etiketi** | `sections.js` `note()` |
| Baskı | Aynı palet, zemin beyaz; katlanmış bölümler **tam basılır** | `print.css` |

### Responsive

Mobil, masaüstünün küçültülmüşü değildir: **T-hesap ayrımı korunur**,
yalnızca numara sütunu 56px → 34px iner. Seviye etiketi 44rem altında
düşer, süre kalır. 68rem altında yan içindekiler gizlenir, 62rem altında
sol sütun çekmeceye iner.

## 6. Özellikler

| Özellik | Durum | Not |
|---|---|---|
| Numaralı içindekiler dizini (01…36) | ✅ | Kitap dizini; açıklama tıklayınca açılır (bkz. §5b) |
| "Kaldığın yerden devam et" + rastgele konu | ✅ | Yarım kalan konuyu sistem bulur |
| **Arayüz dili TR / EN** | ✅ | Sağ üst köşede anahtar; arayüz + 36 başlık + 36 özet + grup/bölüm adları çevrili. ⚠️ Konu **gövdesi Türkçe kalır** — bkz. §10 |
| Karanlık / Aydınlık mod | ✅ | Sistem tercihi + manuel geçiş, localStorage'a yazılır |
| İlerleme çubuğu (bölüm/konu/genel) | ✅ | Bölüm bazında "okundu", karta halka, sidebar'a nokta |
| Tamamlanan konu işaretleme | ✅ | Tek tıkla tüm bölümler |
| Favoriler | ✅ | Kart ve konu sayfasından yıldız, `#/favoriler` |
| Kullanıcı notları | ✅ | Konu başına, 500ms gecikmeli otomatik kayıt, `#/notlar` |
| Son ziyaret edilen sayfa | ✅ | Hash'siz açılışta son rotaya döner |
| Arama (Ctrl+K / `/`) | ✅ | Konu + tcode + tablo + terim; Türkçe aksana duyarsız |
| Filtreleme | ✅ | Grup, "hazır", "favoriler" |
| Her T-code/tablo/terim tıklanabilir | ✅ | `{{...}}` motoru, 0 çözülemeyen bağlantı |
| İlgili Konular bölümü | ✅ | Her konu sayfasının sonunda |
| Süreç şeması | ✅ | `flow` — rol şeritli dikey akış |
| ER diyagramı | ✅ | SVG bağlantı çizgileri + ResizeObserver ile yeniden çizim |
| T hesapları | ✅ | Borç/alacak sütunlu, bakiye hesaplı |
| Muhasebe fişi | ✅ | Borç/alacak toplamı + **denklik kontrolü** (denk değilse uyarır) |
| Mini quiz | ✅ | Anında geri bildirim + açıklama, puan kalıcı |
| ~~Öğrenme bölümü~~ (özet · mülakat notları · sık hatalar · ipuçları · mini sınav) | ❌ Kaldırıldı | Kullanıcı talebi: *"profesyonel durmuyor"*. Bir el kitabında bölüm sonu sınavı olmaz — konuyu ders modülüne çeviriyordu. ⚠️ **Veri 36 dosyada duruyor.** ⚠️ **Notlar bu bölümün içindeydi; kaybolmadı** — konu sayfasının sonuna numarasız bloğa taşındı |
| ~~Flash kartlar~~ | ❌ Kaldırıldı | Kullanıcı talebi (Eylül 2026). `ogrenme.flashcards` **verisi duruyor** (~430 kart, 36 dosya) — özellik geri istenirse `learn.js` bloğu + `sections.js`'te iki satır yeter, içerik yeniden yazılmaz |
| PDF olarak dışa aktarma | ✅ | `window.print()` + `print.css` (harici kütüphane yok) |
| Responsive | ✅ | Sidebar mobilde çekmece; 1180px'de içindekiler gizlenir |
| Diğer modüller (CO/MM/SD…) | Mimari hazır | Motor değişmeden yeni modül eklenebilir |

---

## 7. Doğrulama Durumu

### ✅ Programatik olarak doğrulandı (tarayıcıda, gerçek DOM üzerinde)
- 36 konu sayfası, 254 T-code, 88 tablo, 142 terim sayfası → **tamamı çiziliyor, konsol hatası yok**
- Üç sözlükte de **çift anahtar yok** — programatik olarak doğrulandı (bkz. Ders #26)
- Her ER diyagramının `data-er` **JSON niteliği ayrıştırılabiliyor** (0 bozuk) —
  `mk()` dönüşümünün niteliği bozmadığının kanıtı
- `SAP.auditRefs()` → **0 çözülemeyen `{{...}}` işareti** (iki geçişli tarama, bkz. Ders #15).
  Pozitif kontrolle doğrulandı: hem gövde hem **başlık** alanına bilerek bozuk işaret
  enjekte edildi, denetim ikisini de yakaladı (bkz. Ders #17).
- Çizilmiş DOM'da **0 bozuk çip** (`.ref-miss` sayısı 0) — audit'ten bağımsız ikinci kontrol
- Çizilmiş metinde **0 ham `{{` işareti** — üçüncü ve bağımsız kontrol. Bu ölçüm
  138 ham işaret bulup renderer hatasını ortaya çıkardı (bkz. Ders #23)
- ⭐ **5. eksen — çizilmiş metinde çözülmemiş biçim işareti (`*`)** (bkz. Ders #28).
  Ölçüm `<code>` içeriği **çıkarılarak** yapılır; kod içindeki yıldız meşrudur.

  **Beklenen sonuç 11'dir ve hepsi belgelenmiş istisnadır** — düz metinde geçen
  joker desenler: `RFFO*` (bank-accounting ×3, f110 ×6) ve `320*` (special-gl ×2).
  ⚠️ **On ikinci bir yıldız gerçek hatadır.**

  Bu eksen ilk çalıştırmasında **86 bozuk yer** buldu ve üç ayrı motor kusurunu
  ortaya çıkardı (Ders #28).
- ⭐ **6. eksen — EMOJİ.** Çizilmiş kabukta ve 36 konu sayfasında emoji
  sayısı **0 olmalıdır**. Ölçüm `✓ ✕` gibi tipografik glifleri hariç tutar
  (onlar emoji değil, metin glifi). Bu eksen ilk çalıştırmasında **705**
  bulmuştu — tablo hücrelerindeki `✅/❌`; tek renkli `✓/✕`'e çevrildiler.

  ⚠️ **Eski 6. eksen (grup rengi) EMEKLİ EDİLDİ:** dokuz grup rengi
  kaldırıldığı için ölçecek bir şey kalmadı. Ders #29 yine de geçerlidir —
  `:root`ta `var()` tuzağı CSS'in kalıcı bir davranışıdır.
- ~~Grup rengi ekseni~~ (bkz. Ders #29)
  Dokuz `.grp` bölümünün `--accent` **hesaplanmış** değeri okunur;
  **dokuzu da farklı olmalıdır**.

  ```js
  const a = [...document.querySelectorAll('.grp')]
    .map(g => getComputedStyle(g).getPropertyValue('--accent'));
  new Set(a).size === a.length   // true olmalı
  ```

  ⚠️ **`--h` doğru basılmış olması yetmez.** Hata tam olarak buydu: her grubun
  `style="--h:162"` niteliği **doğruydu**, ama `--accent` `:root`ta
  hesaplandığı için dokuzu da `oklch(53% 0.115 240)` dönüyordu.
  Ölçüm **niteliği değil, hesaplanmış değeri** okumak zorundadır.
- **Soru kartı kalıntısı:** çizilmiş DOM'da `.fc-scene` / `.fc-wrap` sayısı
  36 konuda **0** — bölüm kaldırıldı, veri duruyor.
- 33 hazır konuda **yalnızca 2 dengesiz fiş** (`.jr-bad`) var, **ikisi de kasıtlı**:
  1. `document-posting` — kullanıcının girdiği eksik belge (50.000 ≠ 60.000);
     simülasyonun vergi satırını nasıl tamamladığını gösterir.
  2. `document-parking` — "Dengesiz park" fişi (85.000 ≠ 60.000);
     parkın denklik aramadığını ama {{FBV0}}'ın aradığını gösterir.

  Motor ikisini de doğru şekilde "DENK DEĞİL" olarak işaretliyor.
  **Üçüncü bir dengesiz fiş gerçek hatadır** (bkz. Ders #15 ve #22).
- Her hazır konu **10 numaralı bölüm** içeriyor (öğrenme bölümü kaldırıldıktan sonra; genel-muhasebe 9 — teorik konu olduğu için `sapSurec` yok). Notlar numaralı bölüm DEĞİLDİR: ilerleme yüzdesine girmez, içindekilerde görünmez.
- Her hazır konuda **2 diyagram** (1 `flow` + 1 `er`) çiziliyor — tek tek ölçüldü
- Tüm rotalar + geçersiz rota (`notfound`) doğru çalışıyor
- Çapraz link tıklama → doğru sayfaya gidiyor, tarayıcı geri tuşu çalışıyor
- Notlar: yazılıyor, gecikmeli kaydediliyor, `#/notlar`'da listeleniyor
- İlerleme: bölüm işareti %10, "tümünü işaretle" %100
- Favori ekleme/çıkarma, tema geçişi
- Arama: T-code, tablo, terim, konu sonuçları; **"odeme" araması "ödeme" terimlerini buluyor**
- **Gerçek sayfa yenilemesinden sonra** tema, favori, not, ilerleme, quiz puanı korunuyor
- Hash'siz açılışta son ziyaret edilen sayfaya dönüyor
- Tüm muhasebe fişlerinde borç = alacak (denklik kontrolü 0 hata)

### ⚠️ Bu ortamda doğrulanamayan (kullanıcının kendi tarayıcısında bakması gerekir)
Önizleme çerçevesi `visibilityState: hidden` ve `innerWidth: 0` raporladığı için
**düzen/görsel ölçümler yapılamadı**:
- Görsel tasarımın gerçek görünümü (ekran görüntüsü alınamadı)
- 375px'de yatay kaydırma olup olmadığı
- ER diyagramı SVG çizgilerinin konumu (mantık doğru, ölçüm ortamda 0 döndüğü için çizilmedi;
  gerçek tarayıcıda ResizeObserver devreye girer)
- Yazdırma önizlemesinin çıktısı

---

## 8. Sıradaki Adımlar

### Tamamlanan parti (AP → AR → F110 → Clearing)
Bu dört konu **birbirini besleyen bir zincir** olarak yazıldı ve aralarında yoğun çapraz bağlantı var:
AP satıcı borcunu doğurur → F110 öder → Clearing kalemleri kapatır → AR aynı mantığın aynadaki hâlidir.
AR bölümünde AP ile **simetri tablosu** (LFA1↔KNA1, BSIK↔BSID, OBYC↔VKOA) verildi;
bu, ikinci konuyu öğrenme süresini yarıya indiren bilinçli bir kurgu.

### Tamamlanan parti (Closing → Foreign Currency → MM → SD)
Bu parti de zincirli kurgulandı ve **son ikisi bilinçli olarak yan yana** yazıldı:

- **`closing`** — 10 adımlık ay sonu sırası, adımların **neden o sırada** olduğu
  (MM dönemi FI'dan önce kapanır, amortisman girişlerden sonra, değerleme tüm kayıtlardan sonra),
  geçici/kalıcı kayıt ayrımı (FBS1+F.81, F.05, F.19/FAGLF101 ters kaydedilir; AFAB ve karşılıklar kalıcıdır),
  özel dönemler 13–16, OB52'nin iki tarih aralığı ve "+" satırının öncelik kuralı.
- **`foreign-currency`** — üç kavramın ayrılması (çevrim / değerleme / gerçekleşme),
  "döviz tutarı hiç değişmez" ilkesi, OB08→OB59→OBA1 üç katmanlı yapılandırma, KDF ve KDB anahtarları,
  düşük değer ilkesi vs her zaman değerle, ve SAP'ın eksik kuru **hatasız** olarak en yakın
  önceki kurla doldurduğu sessiz tuzak.
- **`mm-integration`** — OBYC işlem anahtarları (BSX/WRX/PRD/GBB/FR1),
  BSX'in değerleme sınıfına göre değişip WRX'in tek hesap olması asimetrisi,
  hesap atama kategorileri (boş/K/A/F), fiyat kontrolü S vs V ve stok tükendiğinde "V tuzağı",
  teşhis aracı olarak OMWB.
- **`sd-integration`** — VKOA kriterleri (satış org + müşteri grubu + malzeme grubu + ERL/ERS/ERF),
  VBRK-RFBSK teşhis yolu, VF02 ile yeniden aktarım (fatura **iptal edilmez**), VF11 vs FB08 kuralı.

**Partinin ana öğretme fikri:** MM ve SD entegrasyon hatalarının **karakter farkı**.
MM hatası *gürültülüdür* — OBYC eksikse mal girişi hiç yapılamaz, iş durur, sorun anında görünür.
SD hatası *sessizdir* — VKOA eksikse fatura kesilir, müşteriye gider, yalnızca FI belgesi oluşmaz.
Bu yüzden SD tarafında `VBRK-RFBSK = "A"` sorgusu günlük rutin olmalıdır. İki konu ardışık
yazıldığı için bu karşıtlık her iki dosyada da karşılaştırma tablosu ve quiz sorusu olarak işlendi.

### Tamamlanan parti (Taxes → New G/L → Parallel Ledger → Special G/L)
Bu parti **"görünmeyen hata" temasında** kurgulandı: dördünde de kayıt geçer, fiş dengelidir,
mizan tutar — ama bir şey yanlıştır ve sistem uyarmaz.

- **`taxes`** — vergi kodunun taşıdığı üçlü (oran + tip A/V + hesap ataması),
  **indirilemeyen KDV'nin ayrı hesaba değil maliyete eklenmesi** ({{OB40}} → NAV anahtarı ve
  o hesaba neden kayıt gelmediği), kullanılmış kodun oranının **değiştirilmemesi** kuralı,
  ve verginin {{BSEG}}'de değil **{{BSET}}'te** tutulması — beyan ile mizanın ayrışmasının
  tek teknik sebebi budur.
- **`new-gl`** — belge bölmenin gerçek amacı: gider satırları zaten kâr merkezi taşır,
  sorun **bilanço satırlarındadır** (satıcı, müşteri, vergi). Giriş görünümü ↔ genel defter
  görünümü ayrımı (4 satır girip 6 satır görmek normaldir), aktif vs pasif bölme
  ({{FAGL_SPLINFO}} neden gerekli), "sıfır bakiye" ayarı, ve bölmenin **sonradan açılamaması**.
- **`parallel-ledger`** — **defter grubu boş = tüm defterler** kuralı, "olguyu tüm defterlere
  yaz, değerleme yargısını defter bazlı yaz" ilkesi, {{amortisman-alani}} ↔ defter köprüsü
  ({{OADB}}; tek {{AFAB}} her iki defteri besler), CO'nun **yalnızca lider defterle** çalışması,
  ve aynı hesabın deftere göre farklı bakiyesi olmasının normalliği.
- **`special-gl`** — gösterge mekanizması (**iş ortağı aynı kalır, G/L hesabı değişir**),
  dört adımlı avans zinciri ve **{{F-54}} mahsubunun sessizce atlanabilmesi**,
  gerçek vs istatistiksel kalem, {{T074}} eşleşmesinin **normal mutabakat hesabı bazında**
  olması (birden çok 320* hesabı varsa hepsi gerekir), ve {{FBL1N}}'de gösterge filtresi
  boşken avansların **hiç görünmemesi**.

**Partinin ana öğretme fikri:** bu dört konudaki hatalar **hata mesajı üretmez**.
Vergi kodu yanlış seçilir → beyan yanlış. Bölme kapalı → segment bilançosu çıkmaz.
Defter grubu boş bırakılır → IFRS farkı yerel deftere de gider. Mahsup atlanır → fazla ödeme.
Dördünde de çözüm aynı biçimdedir: **hatayı hatırlatmakla değil, kontrol sorgusuyla yakala** —
her konunun senaryosu bir kapanış kontrol listesi maddesiyle bitiyor.

### Tamamlanan parti (Dunning → Document Parking → Cost Center → CO Integration)
Bu parti **"sistem uyarmaz, süreç uyarır"** temasında kurgulandı: dördünde de
kritik adım sessizce atlanabilir ve hiçbir hata mesajı çıkmaz.

- **`dunning`** — {{F150}}'nin dört adımı ve **öneri adımının risksizliği** (canlıda prosedür
  testinin tek güvenli yolu), **gecikme günü ≠ ihtar aralığı** ayrımı, müşteri tek seviyede
  ihtar alır kuralı, ihtarın **muhasebe kaydı üretmemesi**, ve ihtar bloğunun
  **son kullanma tarihi olmaması**.
- **`document-parking`** — park ≠ hold (hold **denetim izi bırakmaz**, iç kontrol aracı değildir),
  "park esnek / muhasebeleştirme katı" ilkesi, **dört-göz prensibinin yetkilendirmeyle kurulması**
  ({{FV60}} var, {{FBV0}} yok; {{FB60}} de kaldırılmalı), ve park kalıntısının
  **dönemi eksik bırakması**.
- **`cost-center`** — maliyet yeri hatalarının **hiçbir muhasebe kontrolünü tetiklememesi**,
  **{{KB11N}} ile düzeltme** ({{FB08}} değil — FI zaten doğrudur), birbirini dengeleyen
  iki bütçe sapmasının **atama hatası işareti** olması, {{OKB9}} varsayılanlarının
  **eskiyip sessizce yanlış yazması**.
- **`co-integration`** — FI ve CO'nun **aynı LUW'da** olması ve bunun sonucu:
  {{KANK}} CO numara aralığı eksikse **FI kaydı da durur** (hata FI'da görünür, sebep CO'da);
  CO→FI geri akışının **dört boyuta** bağlı olması (şirket kodu, kâr merkezi, bölüm,
  fonksiyonel alan — dördü de FI'ın raporladığı boyutlar).

**Partinin ana öğretme fikri:** bu dört konuda sistem **doğru davranır** ama süreç eksik kalır.
İhtar prosedürü atanmamış müşteri sessizce atlanır. Park edilmiş belge mizanda görünmez.
Yanlış maliyet yeri mizanı bozmaz. CO aralığı eksikse hata yanlış katmanda aranır.
Dördünde de çözüm **kontrol listesi + doğru katmanda düzeltme**dir.

### Ek çalışma: Yapılmakta Olan Yatırım (AuC) derinleştirildi
Kullanıcı talebiyle `asset-accounting` içindeki AuC bölümü yüzeysel bir değinmeden
tam bir alt konuya çıkarıldı:
- **Sözlük** (`yatirim-devam`): 2 satırdan ~1.800 karaktere — neden gerekli, üç fayda,
  çalışan hesaplar, iki AuC türü.
- **6 fiş**: yatırım avansı (259 ≠ 258), hakediş, **üç kaynaktan maliyet birikimi**
  (FI faturası + MM malzeme çıkışı + CO işçilik), aktifleştirme, **kalem bazlı yerleşim**
  (bina 50 yıl / makine 10 yıl / demirbaş 5 yıl), **kısmi aktifleştirme**.
- **{{AIAB}} ve {{AIBU}}** tam T-code kartları (adımlar, ekran akışı, hatalar, ipuçları).
- **İki teknik blok**: "neden var, ne kazandırır, hangi hesaplar çalışır" ve
  "AuC'de en pahalı üç hata".
- Çeşitlere 4 yeni giriş, öğrenmeye 4 quiz + 6 flash kart + 5 önemli nokta + 6 sık hata.

### Ek çalışma: Amortisman anahtarı + VUK yöntemleri derinleştirildi
Kullanıcı talebiyle `asset-accounting` içindeki amortisman anahtarı bölümü genişletildi;
**kıst amortisman hiç yer almıyordu**.

- **6 yeni sözlük terimi:** `kist-amortisman`, `azalan-bakiyeler`, `donem-kontrolu`,
  `fevkalade-amortisman`, `ozel-maliyet-bedeli`, `yenileme-fonu`. Ayrıca
  `amortisman-anahtari` tek satırdan ~1.650 karaktere çıkarıldı.
- **6 yeni T-code:** {{AFAMR}} temel yöntem, {{AFAMD}} azalan bakiyeler, {{AFAMS}} çok seviyeli,
  {{AFAMP}} dönem kontrolü, {{ABMA}} elle amortisman.
- **VUK’a göre 9 yöntem** `cesitler` bölümünde madde madde: normal (md. 315),
  azalan bakiyeler (mük. 315), **kıst (320/2)**, fevkalade (317), madenlerde (316),
  özel maliyet bedeli (327), düşük değerli (313), amortismana tabi olmayanlar (314),
  yenileme fonu (328–329).
- **4 hesaplamalı fiş:** kıst ilk yıl (9/12) ve son yıl tamamlama;
  azalan bakiyeler ilk üç yıl ve **son yıl kalanı sıfırlama**. Aritmetik doğrulandı.
- **3 teknik blok:** anahtarın anatomisi (5 hesaplama yöntemi), kıst amortismanın
  SAP karşılığı (dönem kontrolü), standart anahtar listesi + VUK için ne gerekir.
- 10 quiz, 16 flash kart, 6 önemli nokta, 7 sık hata.

**Hesaplama yöntemleri ayrıca eklendi:** aynı varlık (600.000 TL / 5 yıl) **beş yöntemle**
hesaplanıp yan yana konuldu — doğrusal, azalan bakiyeler, **yıl sayıları toplamı**,
**üretim miktarı esaslı**, **kalıntı değerli**. Her yöntemin formülü + yıl yıl rakamları var.
Ana öğretme noktası: **ilk dördünde toplam amortisman aynıdır**, yalnızca zamanlama değişir —
yöntem seçimi bir *vergi indirimi* değil **vergi ertelemesi** kararıdır.
VUK (①②) ile IFRS (③④⑤) ayrımı vurgulandı; bu, {{paralel-defter}} ihtiyacının somut sebebi.
3 yeni terim: `yil-sayilari-toplami`, `uretim-miktari-yontemi`, `kalinti-deger`.

**Anlaşılırlık düzeltmesi (kullanıcı geri bildirimi):** ilk yazımda beş yöntem jargonla
sıralanmış, somut örnek verilmemişti — "anlaşılır değil" geri bildirimi geldi. Yeniden yazıldı:
konuya `AFAMA` kartı eklendi (adımlar **SAP terimiyle değil sistemin sorduğu soruyla** başlıyor),
`ekranAkisi` tablosunda `Z_GENEL` ve `Z_BINEK` yan yana kuruluyor ve dört slotun aynı,
yalnızca dönem kontrolünün farklı olduğu **"⚠️ TEK FARK"** satırıyla gösteriliyor.
Soyut anatomi bloğu ikiye ayrıldı: önce somut örnek, sonra detay.

**Vurgulanan ana yanlış bilgi:** "yıl ortasında alınan varlığa oransal amortisman ayrılır"
sanısı. VUK’ta genel kural **tam yıldır**; kıst **yalnızca binek otomobillerde** uygulanır.
SAP tarafındaki sonucu: Türkiye kurulumunda **en az iki amortisman anahtarı** gerekir —
aynı temel yöntem, farklı dönem kontrolü.

### Ek çalışma: Kur farkı ve T030K derinleştirildi
Kullanıcı talebiyle iki konu genişletildi:

**Kur farkı** (`foreign-currency`) — Türkiye’ye özgü kritik eksikler tamamlandı:
- **3 yeni terim:** `parasal-kalem`, `kur-farki-faturasi`; `kur-farki` iki satırdan tam sayfaya.
- **Parasal / parasal olmayan ayrımı:** yalnızca parasal kalemler değerlenir.
  **Avans değerlenmez** — karşılığında para değil *mal* alınacaktır; değerlenirse
  gerçekte var olmayan kâr yaratılır. SAP’ta önlem: avans hesapları
  {{F.05}}/{{OBA1}} listesine konmaz.
- **{{kur-farki-faturasi}}:** dövizli satışta tahsilat günü lehte oluşan fark için
  fatura düzenlenir ve **KDV hesaplanır**. **SAP bunu üretmez** — muhasebe doğru, KDV eksik kalır.
- **Yatırım dönemi kur farkı:** aktifleştirme dönemi sonuna kadar **maliyete (258)** eklenir;
  SAP ayırmaz, elle aktarılır.
- Hesap ayrımı: `646.01/656.01` gerçekleşmemiş (ters kaydedilir) vs `.02` gerçekleşmiş.
  Dönem başında `.01` hesapları **sıfır olmalıdır** — basit ve etkili kapanış kontrolü.

**{{T030K}}** — sözlük girdisi ve `taxes` konusundaki tablo kartı genişletildi:
üç alanlı anahtar (`KTOPL + KTOSL + MWSKZ`), işlem anahtarları (MWS/VST/NAV/NVV),
**"vergi koduna göre ayrım" işaretinin** davranışı değiştirmesi ve
çok hesap planlı kurulumlarda eksik satır hatası.

### Kaldırılan konu: `amortisman-yontemleri`
Kullanıcı talebiyle **silindi**. Gerekçe: içeriği `asset-accounting` içinde zaten
tam olarak duruyordu (`cesitler.liste`'de 🧮 Yöntem ①–⑤ ve 📋 VUK grupları,
`cesitler.anlatim`'da beş yöntemin sayısal karşılaştırması). Ayrı konu **fazlalıktı**.

Silme sırası: `content/fi/amortisman-yontemleri.js` → `data/catalog.js` girdisi →
`index.html` script satırı. Silmeden önce `asset-accounting`'in içeriği koruduğu
Grep ile doğrulandı (13 giriş bulundu). Hiçbir konunun `related` dizisi
bu id'ye işaret etmiyordu — kontrol edildi.

### Yeni konu: `dogrulama-ikame` — Doğrulama ve İkame (28. hazır konu)
Yerine gelen konu. Kayıt anında devreye giren **kural motoru**.

Ana öğretme fikri **tek cümlede ayrım**: *doğrulama engeller, ikame değiştirir.*
Doğrulama veriye dokunmaz ve **görünürdür** (kullanıcı hata mesajı alır);
ikame veriyi değiştirir ve **sessizdir** (kullanıcı fark etmez).

İşlenen kritik noktalar:
- **Üç adım, ikisi atlanır:** tanımla ({{GGB0}}/{{GGB1}}) → ata ({{OB28}}/{{OBBH}}) →
  **etkinleştir** ({{GGB4}}). *"Kural çalışmıyor"* vakalarının çoğu üçüncüde çözülür.
- **Çağrı noktası erişimi belirler:** kalem noktası başlık alanını **yazamaz**;
  başlık noktası kalem alanlarını **okuyamaz**.
- **Sıra:** ikame **önce**, doğrulama **sonra** → doğrulama, ikamenin değiştirdiği
  değeri kontrol eder, kullanıcının girdiğini değil.
- **Mesaj tipi kuralın gücüdür:** yalnızca **E** gerçek korumadır; **W** ile kurulan
  kural ilk yoğun günde herkes tarafından geçilir ve fiilen kalkar.
- **Etkinlik seviyesi 2** (toplu giriş hariç) bir **açık kapıdır** — kritik kontrollerde **1**.
- **İkame tasarımının üç kuralı:** yalnızca boş alanı doldur · açıklamayı iş diliyle yaz ·
  aktif ikame envanterini tut.
- {{GB01}} hangi alanın kullanılabilir/değiştirilebilir olduğunu tutar;
  **SAP notu olmadan değiştirilmez**.

Senaryo: belgelenmemiş bir ikame iki yıl boyunca kullanıcının girdiği kâr merkezini
sessizce ezmiş. Teşhiste ikame **akla en son gelen** şeydi; envanterde 7 aktif ikame
bulundu, 4'ünün açıklaması boştu. Kural 2024'te **doğruydu** — hesap yalnızca Üretim
tarafından kullanılıyordu; 2026'da Pazarlama'ya açıldı, kural güncellenmedi.
`cost-center`'daki {{OKB9}} eskimesiyle **aynı hata sınıfı**.

### Yeni konu: `sap-tables` — FI Tablo Mimarisi
Ana fikir: tablo bilgisi **kullanıcıyı danışmandan ayıran** şeydir — ekranın
söylemediğini gösterir.

- **Başlık–kalem** deseni: {{BKPF}} + {{BSEG}} / {{ACDOCA}}, bağlantı `BUKRS+BELNR+GJAHR`.
- **İndeks ve toplam tabloları bir performans çözümüydü:** {{BSEG}} anahtarı belge
  numarasıyla başladığı için satıcı bazlı sorgu tüm tabloyu tarardı; {{BSIK}} anahtarı
  `LIFNR` ile başlar. HANA'da bu tarama artık pahalı olmadığı için **varlık sebepleri
  ortadan kalktı** → {{uyumluluk-view}}. *Mimari ders: kısıt kalkınca çözüm gereksizleşir.*
- **`SHKZG` tuzağı:** {{BSEG}}'de tutarlar **hep pozitiftir**, yön ayrı alandadır
  (S borç / H alacak). Doğrudan toplanırsa belge dengesiz sanılır.
  **{{ACDOCA}}'da tutarlar işaretlidir** → sorguyu taşırken `SHKZG` mantığı **kaldırılmalı**,
  yoksa işaret iki kez uygulanır.
- **Mali yıl anahtarın parçasıdır** → aynı numara farklı yıllarda tekrar kullanılabilir.
- **{{SE16N}} kullanıcıya verilmez:** yetki kontrolü zayıf, ham veri yanıltıcı.

Senaryo: belge numarası var, belge yok. Üç ihtimal **sırayla elenir** —
yanlış mali yıl → park edilmiş ({{VBKPF}}) → {{guncelleme-hatasi}} ({{SM13}}).
Sonuç: tek belge sanılan sorun aslında **14 sessiz güncelleme hatasıydı**.

### `reporting` konusu tamamlandı
Ana fikir: **doğru rapor türünü seçmek**. Bakiye (*"ne kadar?"*) ile {{dokum}}
(*"neden bu kadar?"*) ayrımı; dökümün ayırt edici özelliği **belgeye inebilmesi**.
İki sessiz hata işlendi: **kalem yönetimi kapalıysa döküm alınamaz ve geriye dönük
açılamaz**; {{F.01}}’de **"atanmamış hesaplar" satırı sıfır olmalıdır** —
dolu ise mizan doğru olsa bile sunum yanlıştır. Kalıcı çözüm: {{OB58}}’de **aralık ataması**.

### Yeni konu: `tcodes` — SAP İşlem Kodları (29. hazır konu)
Kullanıcının açıkça istediği konu. **Tezi tek cümlede:**
*işlem kodları ezberlenmez, **çözülür***. Yaklaşık 15 kalıp yüzlerce kodu açıklar.

**Konunun omurgası — Almanca kökler.** SAP Almanca geliştirildi ve üç harf
**hem işlem kodlarında hem tablo adlarında** aynı anlamı taşıyor:
**K** = *Kreditor* satıcı · **D** = *Debitor* müşteri · **S** = *Sachkonto* G/L.
Buradan `FK01`/`FD01`/{{FS00}} ve — asıl kazanç — **sekiz tablo adı iki kuralla** çözülüyor:
**BS** + **I** (*offen* açık) / **A** (*ausgeglichen* kapalı) + **K/D/S**.
Bu, {{konu:sap-tables}} konusundaki tablo bilgisini **ezberden kurala** dönüştürüyor.

İşlenen on iki kalıp ailesi: `F-` tireli · `FB` tiresiz · `FBL_N` döküm ·
`F.` noktalı · `S_ALR_*` üretilmiş · `OB*` özelleştirme · `GG*` kural motoru ·
`A*` varlık · `F110`/`F150` program · `K*` CO · `SE/SM/SU/ST` teknik · `X*` merkezi.

Ana öğretme fikirleri:
- **`F-` tire eski nesli işaret eder** ({{kayit-anahtari}} elle girilir);
  `FB` yeni nesildir (sistem türetir). **Aynı belgeyi üretirler** — fark kullanım kolaylığı.
- **Kapatma işlemleri neden hep `F-` ailesinde?** Çünkü {{acik-kalem}} seçim ekranı
  gerektirir; `FB` ekranları tek satır kayıt için tasarlandı.
  → **Kod ailesi, işin muhasebe doğasını yansıtır.** Bu, konuyu ezber listesi olmaktan çıkaran fikir.
- **Sayı ekleri** 01/02/03 ve **9x** eski veri; ünlü istisna **{{FS00}}**.
- **Kodu bilmiyorsan dört yol:** kalıptan tahmin · {{TSTCT}}’de açıklamadan arama ·
  {{SPRO}} ağacı (kod düğümde **yazılı** → `OB*` ezberi gereksiz) · {{SE93}}.
- **{{SU3}} parametreleri** (`BUK`/`CAC`/`GJR`) ve alanın parametre kimliğini
  **`F1` → Teknik bilgi** ile bulmak.
- Komut alanı önekleri; **`/$sync`** ile {{tampon}} temizleme
  (*"ayarı değiştirdim ama etkisi görünmüyor"*).

**Senaryo — "{{FBL5N}} boş geliyor, hata da yok".** Yetkinin **iki katmanlı**
olmasından doğan sessiz hata: `S_TCODE` var (kod açılıyor), `F_BKPF_BUK` yok
(veri gelmiyor). Çoğu FI raporu yetkiyi bir **süzgeç** olarak uygular — yetkisiz
şirket kodu **hiç sorgulanmaz**, dolayısıyla program açısından bu **hata değildir**.
Teşhis sırası: {{SE16N}} (veri var mı?) → **hemen** {{SU53}} → rol → oturum yenile.
Tarama **iki kullanıcı daha** buldu; ikisi de bildirmemiş, biri Excel’e geçmişti.
→ *Sessiz hatalar bildirilmez, etrafından dolaşılır.*

Sözlüğe eklenenler: {{SU3}}, {{SMEN}} · tablolar {{TSTC}}, {{TSTCT}}.

### Yeni konu: `error-handling` — Hata Yönetimi ve Çözümler (30. hazır konu)
Kullanıcının *"çözümler alanı da ekle ayrı başlık altında"* isteği.

**Bilinçli tasarım kararı: bu bir hata sözlüğü değil, bir teşhis yöntemidir.**
Gerekçe: SAP’ta binlerce mesaj var, ezberlenemez. Ama **belirti sayısı ondur** —
ve teşhis, belirtiyi doğru araca eşlemekten ibarettir.

**Omurga — üç hata sınıfı:**
- **① Konuşan** — mesaj var, çözümü işaret eder. Kolay.
- **② Sessiz** — mesaj yok, sonuç yanlış. ⭐ **Konunun asıl değeri burada.**
- **③ Çöken** — dump. Gürültülü ama nadir.

*Danışmanı ayıran ① değil ②’dir* — konuşan hatayı herkes çözer.

Ana öğretme fikirleri:
- ⭐ **Mesaja çift tıkla → "Prosedür" bölümü** çoğu vakayı tek başına çözer.
  Yeni danışmanların neredeyse hiç açmadığı yer.
- Metni değil **numarayı** ara (`F5 201`) — metin dile ve sürüme göre değişir.
- ⭐ **"Daha önce çalışıyor muydu?"** sorusu aramayı **ikiye böler**:
  hiç çalışmadıysa **yapılandırma**, dün çalışıyorsa **değişiklik** ({{CDHDR}}/{{CDPOS}}).
- **{{SM37}} ≠ {{SLG1}}:** biri *"program çöktü mü?"*, diğeri *"iş doğru yapıldı mı?"*.
  Toplu programlar hatalı kalemi **atlayıp devam eder** — doğru tasarım, ama
  günlük okunmazsa hatayı görünmez kılar.
- **Muhasebe bakışı:** hatalar keyfî engel değil, **muhasebe ilkesinin** karşılığıdır.
  *"Sistem izin vermiyor"* yerine *"kural ne diyor?"* diye okunur — çoğu zaman
  hata haklıdır, yanlış olan **girilmek istenen kayıttır**.
- **Düzeltme maliyeti zamanla üstel artar:** önlenirse **0 belge** · aynı gün **3 belge** ·
  dönem kapandıktan sonra **+ yanlış döneme düşen düzeltme** · beyandan sonra
  **+ düzeltme beyannamesi**. Bu tablo, hata yönetiminin neden bir **önleme**
  konusu olduğunu gösterir.
- **{{OBA5}} bir "hatayı sustur" aracı değildir.** Kapatmadan önce:
  *bu uyarı neyi koruyordu?* ⭐ Ters yön daha değerli: kritik kontrol `W` ise **`E`** yapılır.
- Teknik bölümde **belirti → araç eşleme kartı** (13 satır) — konunun pratik özeti.
- **Kapanış refleksi iki soru:** *"bu neden mümkün oldu?"* (kök sebep, üç kez "neden")
  ve *"başka kimde var?"* (aynı sınıfı tara).

**Senaryo — "Amortisman çalıştı" ama 34 varlık işlenmemişti.** {{SM37}} yeşil,
{{SLG1}} 34 kırmızı satır. Fark 1.847.000 TRY, **3 hafta sonra** bulundu.
Teşhis: ortak desen ({{ANLB}} → hepsi aynı varlık sınıfı) → {{CDHDR}} (*sınıf
Ekim’de açılmış*) → kök sebep ({{OAOA}}’da varsayılan ömür yok).
**Ekim de tarandı: 11 varlık daha** → *hatanın bulunduğu dönem, başladığı dönem değildir.*
Ekim kapalı olduğu için iki ayın farkı Kasım’a düştü ve Kasım gideri şişkin göründü.

Sözlüğe eklenenler: {{SM21}}, {{SU01}}, {{OBC4}}, {{F.03}} · tablo {{BALHDR}}.

### Yeni konu: `e-donusum` — E-Dönüşüm 🇹🇷 (36. konu, 31. hazır)
Kullanıcının istediği konu. ⚠️ **İlk seferde yanlış anlaşıldı** — bkz. Ders #27.

Türkiye’ye özgü tek konu. Katalogda `islemler` grubunda, {{konu:taxes}} yanında.

⭐ **Tek cümlelik tez:**
**Muhasebe belgesi ({{BKPF}}) ile e-belge ({{EDOCUMENT}}) iki ayrı nesnedir ve
bağımsız başarısız olabilir.**

Kâğıt dünyada fatura **tek şeydi**; elektronik dünyada **iki şey** var ve
ikisinin **ayrı yaşam döngüsü** var. Konunun tamamı bu ayrımın sonuçlarını işliyor.

Ana öğretme fikirleri:
- **{{FB03}} *"kaydettik mi?"*, {{EDOC_COCKPIT}} *"gönderebildik mi?"*** —
  farklı sorular. Karıştırmak, bu alandaki hataların çoğunun kaynağı.
- **{{e-fatura}} mı {{e-arsiv}} mi kullanıcının tercihi değil** —
  alıcının mükellefiyet durumu belirler ({{mukellef-sorgulama}}).
  Liste eskirse karar yanlış olur ve GİB **sessizce** reddeder.
- ⚠️ **İptal asimetrisi:** {{FB08}} muhasebeyi düzeltir ama GİB’e belge **göndermez**.
  e-Arşiv süre içinde iptal edilebilir; **e-fatura edilemez** → iade faturası.
  Ayrışma genelde **KDV beyanında** ortaya çıkar.
- ⭐ **Teşhisi ikiye bölen soru:** *"{{EDOCUMENT}} kaydı oluştu mu?"*
  Oluşmadıysa **SAP**, oluştu ama gitmediyse **entegratör**, red geldiyse **veri**.
  Üç katman var ve üçüncüsü ({{ozel-entegrator}} add-on’u) **SAP desteği kapsamında değil**.
- **Vergi kodu iki yeri besler:** {{OB40}} hesap ataması (eksikse kayıt **durur** —
  konuşan hata) ve e-belge alan eşlemesi (eksikse kayıt **geçer**, e-belge
  **reddedilir** — sessiz hata). Bu asimetri, redlerin neden geç fark edildiğini açıklar.
- **Neden iki taraf ayrışabiliyor?** Bilinçli tasarım: bağlı olsaydı entegratör
  kesintisi **tüm faturalamayı** durdururdu. *Gevşek bağlantı dayanıklılık kazandırır,
  tutarlılık garantisini kaybettirir — ve kaybedilen garanti bir **izleme
  yükümlülüğüne** dönüşür.* {{EDOC_COCKPIT}}’in günlük rutin olmasının gerçek sebebi.
- **{{berat}} alınan dönem yasal olarak kesinleşir** → {{OB52}} artık muhasebe düzeni
  değil **mevzuat uyumu** aracı. Türkiye’de dönem disiplininin neden daha katı
  olduğunun gerekçesi ({{konu:closing}} ile bağlantılı).

**Senaryo — "Müşteri ödemiyor" ama faturayı hiç almamıştı.** 4 fatura, 687.000 TRY,
90 gün+ gecikmiş. {{FB03}} ✓ {{FBL5N}} ✓ mizan ✓ — ama {{EDOC_COCKPIT}}’te **RED**:
müşteri e-fatura mükellefi olmuş, sistem hâlâ {{e-arsiv}} kesiyordu.
Tarama: **63 fatura · 11 müşteri · 2.940.000 TRY · 9 aydır**.
Kapanış, {{F150}} ihtar ve KDV beyanı — **üçü de kaçırdı ve üçü de kendi açısından haklıydı**;
hiçbiri *"fatura karşı tarafa ulaştı mı?"* diye sormuyordu.
⭐ **Sinyal vardı:** müşteriler aylardır *"fatura yok"* diyordu — ama bu bir **veri** değil,
bir **bahane** olarak yorumlanmıştı.
Muhasebe düzeltildi ama **vade yeniden başladı** — 9 aylık gecikme geri kazanılamadı.

Sözlüğe eklenenler: {{EDOC_COCKPIT}}, {{EDOC_RESUBMIT}} · tablolar {{EDOCUMENT}},
`EDOCUMENTFILE` · **12 terim**: {{gib}}, {{e-fatura}}, {{e-arsiv}}, {{e-irsaliye}},
{{e-defter}}, {{berat}}, {{ozel-entegrator}}, {{ubl-tr}}, {{mali-muhur}},
{{mukellef-sorgulama}}, {{temel-fatura}}, {{ticari-fatura}}.

> **Not — mevzuat bilgisi kasıtlı olarak sabit yazılmadı.** Zorunluluk hadleri,
> iptal süreleri ve berat yükleme tarihleri **tebliğle değişir**. İçerik bu değerleri
> sayı olarak vermek yerine **mekanizmayı** öğretiyor; eskimeyen kısım budur.

### Yeni parti: `lsmw` + `data-upload` (32. ve 33. hazır konu)
Zincirli yazıldı — ikisi **birbirinin tamamlayıcısı**:
`lsmw` **aracı**, `data-upload` **altındaki yöntemleri** anlatıyor.

#### `lsmw` — ⭐ tez: **bir yükleme aracı değil, bir *tarif defteri***
Veriyi bir kez yüklemek kolaydır; zor olan aynı yüklemeyi
**geliştirme → test → prova → canlı (tek şans)** boyunca **aynı sonuçla** tekrarlamaktır.
14 adım bu yüzden var: tarif bir kez yazılır, defalarca uygulanır, **taşınabilir**.

- **14 adım = dört öbek:** tanımla (1–2) → **eşle (3–6)** → oku/dönüştür (9–12) → yaz (13–14).
  ⭐ **Adım 6 işin asıl yeri**; gerisi altyapı.
- **Yöntem sırası:** standart nesne → {{bapi}} → {{kayit-recording}} (son çare).
  Aşağı indikçe **kırılganlık artar**.
- ⭐ **En pratik tavsiye — "önce elle bir kayıt aç".** Gerekçesi **sayısal**:
  hata mesajları bilgiyi **seri** verir (5 eksik alan = 5 tur),
  ekranlar **paralel** verir (1 tur). Aynı ilke {{konu:error-handling}}’de de vardı
  (mesajın uzun metnini okumak).
- Recording **en karmaşık satırla** alınır — koşullu ekranlar tuzak.
- İki klasik dönüşüm hatası: **sola sıfır dolgu** (Excel sıfırları atar) ve **tarih biçimi**.
- {{acik-kalem}} hesapları **tek tek**, G/L **toplu** taşınır — yoksa {{F110}}/{{F-53}} çalışmaz.
- ⭐ **Geçiş hesabı sıfırlanmalı** — en güçlü tek kontrol; tutar bazında çalıştığı için
  adet kontrolünden güçlü.
- ⚠️ LSMW projesi {{tasima-istegi}} ile **taşınmaz** — kendi dışa/içe aktarması var.

**Senaryo — "12.000 satıcı yükledik" ama 1.847 kalem ödenemiyor.**
Mutabakat **doğruydu**: adet ✓ tutar ✓ geçiş hesabı sıfır ✓.
Ama {{LFB1}}.`ZWELS` (ödeme yöntemi) boştu — eski sistemdeki `NK` kodunun
SAP karşılığı yoktu, eşlemede *"boş bırak"* denmişti.
⭐ **Ders: mutabakat *"yüklendi mi?"* der, *"kullanılabilir mi?"* demez.**
`ZWELS` **zorunlu değildir** — satıcı sorunsuz açılır, ama {{F110}} kalemi
öneriye **almaz ve hata vermez**. Deneme kümesi de **rastgele** seçilmişti;
2 adet `NK` kodlu satıcı vardı ve ikisi de sorunsuz yüklendiği için dikkat çekmedi.

#### `data-upload` — ⭐ tez: **hız kararı değil, hata yönetimi kararı**
Yeni danışman *"hangisi hızlı?"* diye sorar; deneyimli olan
**"500 kayıttan 14'ü başarısız olursa ne olacak?"** diye sorar.
Çünkü **her zaman bir kısmı başarısız olur**.

- **Üç yöntem, üç cevap:** {{toplu-giris}} → hatalılar {{SM35}}'te **bekler**
  (tekrar çalıştırma **hazır gelir**) · {{bapi}} → ⚠️ **kaybolur**, senin kurgun ·
  {{idoc}} → sistemde **kalır**, {{BD87}} (en iyi izlenebilirlik).
- ⭐ **{{arayuz-tablosu}} deseni** — BAPI ile yazılan her programda zorunlu.
  Üç adım: ham veri ara tabloya → damgalanmamışları işle, sonucu **satır bazında damgala**
  → yeniden çalıştırmada yalnızca damgalanmamışlar.
  *Bu, batch input'un hazır verdiğini elle inşa etmektir.*
- ⚠️ **BAPI'nin iki sessiz tuzağı:** commit çağrılmazsa kayıt yazılmaz (BAPI yine
  *"başarılı"* döner) · {{guncelleme-hatasi}} **`RETURN` tablosuna yansımaz** —
  asenkron aşamada oluşur, {{SM13}} ayrı kontrol edilir.
- ⚠️ **Paralel bölme ölçütü satır numarası değil, kilitlenen nesnedir** —
  yanlış bölme hızlanma yerine **veri kaybı** üretir.
- Çok satırlı belgede **belge bazlı** işlem: muhasebede **yarım belge yoktur**.
- ⭐ **{{sayi-mutabakati}} — tek zorunlu kural.** Adet **ve** tutar;
  adet tutup tutar tutmuyorsa {{donusum-kurali}} hatası.

**Senaryo — "18 dakikada bitti" ve 340 kayıt kayboldu.**
BAPI seçilmişti çünkü *"3 saat yerine 20 dakika"*. Doğruydu.
Ama 6 paralel iş **satır numarasına göre** bölünmüştü → aynı satıcı birden çok parçada
→ {{kilitleme}} çakışması → **340 {{guncelleme-hatasi}}**.
Program `RETURN` tablosunu kontrol ediyordu ama hata **oradan gelmedi**.
{{arayuz-tablosu}} yoktu → hangi satırın işlendiği kayıtlı değildi →
baştan çalıştırmak **8.060 mükerrer** üretecekti.
⭐ **Kazanılan 2,5 saat, kaybedilen 3 günle ödendi.**

### Son parti: `migration` + `best-practices` + `s4-yenilikleri` (34–36. hazır konu)

⭐ **Bu partiyle katalog tamamlandı.** Üçü zincirli yazıldı ve her biri
öncekilerin **üzerine** kuruluyor:

#### `migration` — ⭐ tez: **bir veri taşıma işi değil, hangi GEÇMİŞİN taşınacağına dair bir MUHASEBE KARARI**
`lsmw` aracı, `data-upload` yöntemleri anlatmıştı; bu konu **kararı** anlatıyor.
- **Üç yaklaşım, üç ayrı pişmanlık noktası:** {{greenfield}} (geçmiş gelmez →
  denetim/raporlama) · {{brownfield}} (eski hatalar da gelir → "madem yeniliyorduk") ·
  {{secici-gecis}} (bütçe).
- ⚠️ **Gelir tablosu hesaplarının açılış bakiyesi olmaz** — dönem sonunda
  sıfırlandıkları için. Karşılaştırmalı tablo **kendiliğinden oluşmaz** ve
  bilançonun dolu görünmesi bunu **gizler**.
- ⭐ **n:1 taşınır, 1:n taşınmaz.** Birleştirmede bakiyeler toplanır;
  bölmede eski bakiye ayrım bilgisini **taşımaz** ve eşleme tablosu çözemez.
- {{brownfield}}'in üç zorunlu adımı ve sırası: {{cvi}} (⚠️ dönüşümden **önce**,
  hâlâ ECC'de) → hesap planı hazırlığı (masraf türü G/L ile birleşir) →
  mali veri dönüşümü (⚠️ geri alınamaz).
- ⭐ **Üç seviyeli mutabakat:** teknik (yüklendi mi) → muhasebe (doğru mu) →
  **yasal** (sunulabilir mi). Her seviye bir öncekinin göremediğini yakalar.
- ⭐ {{deneme-gecisi}} bir **veri testi değil PLAN testidir**; asıl çıktı süredir.
- ⚠️ {{AS91}} muhasebe kaydı **üretmez** — G/L fişi ayrıdır; hata yıl sonu
  {{AJAB}} kapanışında çıkar.

**Senaryo — "Geçiş başarılı" ve üç ay sonra bulunamayan gelir tablosu.**
Dört mutabakat kontrolü de geçti (adet ✓ tutar ✓ geçiş hesabı sıfır ✓ mizan ✓).
Mart'ta denetçi **2027 karşılaştırmalı gelir tablosunu** istedi — SAP'ta yoktu
ve olamazdı. Eski sistem de Şubat'ta kapatılmıştı.
⭐ **Ders: *"geçmişi taşımıyoruz"* eksik bir cümledir.** Tamamı:
*"…çünkü şurada duracak ve şu kadar süre erişilebilir kalacak."*
İkinci yarısı yazılmazsa birincisi bir karar değil bir **ertelemedir**.

#### `best-practices` — ⭐ tez: **kararlar ikiye ayrılır — geri alınabilenler ve VERİYLE MÜHÜRLENENLER**
Bilinçli tasarım kararı: bu bir "iyi pratik listesi" değil, bir **sınıflandırma
yöntemidir**. Gerekçe: bütün kararlara aynı özeni göstermek imkânsızdır;
özen **seçici** olmak zorundadır.
- ⭐ **{{tek-yonlu-kapi}} testi:** *"bu ayar kapalıyken üretilmeyen bir veri var mı?"*
  Kritik olan ayar değil, ayarın **üretmediği veridir**.
- **Doğru soru değişir:** çift yönlü kapıda *"bugün ne lazım?"*, tek yönlü kapıda
  **"üç yıl içinde isteme ihtimalimiz var mı?"**
- ⭐ **Şüphedeyken açık kur, kullanma** — maliyet asimetriktir.
- **"Ayarın geri alınabilirliği ≠ hatanın düzeltilebilirliği."** `AKONT` beş
  dakikada düzelir ama geçmiş kayıtlar eski hesapta kalır.
- ⚠️ {{akim-verisi}} — *"test sisteminde çalışıyordu"*nun **en sık sebebi**:
  ayar taşınmadı değil, **taşınacak bir şey yoktu**.
- {{tasima-sirasi}}: ters sırada **eski hâl yeniyi ezer** ve hata mesajı çıkmaz.
- ⭐ **{{negatif-test}} olmadan test tamamlanmaz** — kontrol yalnızca ihlal
  edildiğinde görünür.
- **Dokümantasyon:** SAP *"ne yapıldığını"* zaten tutuyor ({{CDHDR}}, {{E070}});
  tutulacak tek şey **neden** — ve en değerli satır **"hangi varsayıma dayanıyor"**.

**Senaryo — "Segment raporu istemiyoruz" ve sekiz ay sonra istenen iş kolu bilançosu.**
{{belge-bolme}} kapalı kuruldu (makul bir talepti). Gider satırları kâr merkezi
taşıyordu, **bilanço satırları taşımıyordu**; {{FAGL_SPLINFO}} geçmişte
**hiç oluşmamıştı** ve geriye dönük doldurulamıyordu.
⭐ **Ders: karar yanlış değildi, eksik olan bilgiydi** — "bu geri alınamaz".

#### `s4-yenilikleri` — ⭐ tez: **hepsi tek bir cümlenin sonucu — "toplamı saklamak yerine hesapla"**
Yenilikleri liste olarak öğretmek yerine **tek sebebe** bağlıyor:
{{bellek-ici}} veritabanı *"diskten okumak pahalıdır"* kısıtını kaldırdı;
o kısıt için var olan yapılar ({{toplam-tablosu}}, indeks tabloları, mutabakat
defteri, gecelik toplu işler) **gereksizleşti**.
⭐ *Yani basitleştirmelerin çoğu yeni bir özellik değil, kaldırılan bir çözümdür.*
- **Asıl kazanç hız değil tutarlılık:** hesaplanan toplam kalemlerle ayrışamaz →
  FI–CO mutabakatı **yapısal olarak gereksiz** (kapanış listesinden çıkarılmalı).
- ⚠️ **SHKZG → HSL:** {{BSEG}}'de tutar pozitif + yön ayrı alanda; {{ACDOCA}}'da
  tutar **işaretli**. Taşınan sorgudan yön mantığı kaldırılmazsa işaret
  **iki kez** uygulanır ve toplam sıfıra yakın çıkar — **sessiz hata**.
- ⚠️ {{uyumluluk-view}} bir **köprüdür**: ne **ücretsizdir** (okuma anında
  hesaplanır) ne de **birebirdir** (`SHKZG` + `RLDNR` semantiği).
- {{is-ortagi}} zorunlu ama {{LFB1}} **kalktı sanılıyor — kalmadı, duruyor**.
- {{masraf-turu}} G/L hesabının **tipi** oldu → sahiplik sorusu doğar.
- ⭐ Yeni Varlık Muhasebesi: her {{amortisman-alani}} **gerçek zamanlı** kendi
  defterine yazar; ECC'deki periyodik/delta mantığı kalktı.
- ⚠️ **"S/4HANA hızlı" cümlesinin eksik yarısı: "uyarlanmış kod için."**

**Senaryo — "Geçtik ama kapanış uzadı" (3 → 4,5 gün) ve sekiz aydır yanlış olan rapor.**
{{SM37}} → {{SAT}} → {{ST05}} zinciri: üç özel program {{uyumluluk-view}} okuyor
ve döngü içinde. Taşırken **ikinci bir hata** çıktı: `SHKZG` mantığı silinmemiş,
işaret iki kez uygulanıyor, mizan 84,2 milyon iken rapor 1,34 milyon gösteriyor.
Sekiz ay fark edilmemişti çünkü program çökmüyor, hata vermiyor ve
sıfıra yakın fark *"her şey tutuyor"* gibi okunuyordu.
⭐ **Ders: kaldırılan tablo geri getirilmedi, TAKLİT EDİLDİ — ve taklit ne
ücretsizdir ne birebir. İkinci fark sessizdir.**
Kalıcı önlem tek satır: *taşınan her rapor ilk çalıştırmada {{FS10N}} mizanıyla
karşılaştırılır.*

**Partinin ana öğretme fikri — üçü de aynı hata sınıfını farklı ölçekte gösteriyor:**
`migration`'da **proje** ölçeğinde (mutabakat geçti ama kapsam eksikti),
`best-practices`'te **karar** ölçeğinde (ayar değişti ama veri değişmedi),
`s4-yenilikleri`'nde **sorgu** ölçeğinde (kod çalıştı ama sonuç yanlıştı).
Üçünde de sistem **doğru davrandı** ve hiçbir hata mesajı çıkmadı.

### Sözlüğe bu partide eklenenler
**İşlem kodları (8):** {{AS91}}, {{SE09}}, {{STMS}}, {{SM30}}, {{SPDD}}, {{SPAU}},
{{SAT}}, {{SCC4}}
**Tablolar (4):** {{BUT000}}, {{MATDOC}}, {{E070}}, {{E071}}
**Terimler (22):** {{greenfield}}, {{brownfield}}, {{secici-gecis}}, {{cvi}},
{{is-ortagi}}, {{basitlestirme-listesi}}, {{acilis-bakiyesi}}, {{kesme-plani}},
{{deneme-gecisi}} · {{tek-yonlu-kapi}}, {{standarda-yakin}}, {{z-gelistirme}},
{{badi}}, {{akim-verisi}}, {{tasima-sirasi}}, {{regresyon-testi}}, {{negatif-test}} ·
{{bellek-ici}}, {{toplam-tablosu}}, {{gomulu-analitik}}, {{fiori}}, {{merkezi-finans}}


Sözlüklere eklenenler (aynı deseni izle):
**AP partisi** — {{ME21N}}, {{ME23N}}, {{MR11}}, {{MIR4}}, {{MIR5}}, {{F-43}}, {{FB09}}, {{OBYR}},
{{OBA3}}, {{OBA4}}, {{FB05}}, {{F-04}}, {{OB74}}, {{F110S}}, {{FBPM}} · tablolar {{EKBE}}, {{RBKP}},
{{RSEG}}, {{T042}}, {{KNKK}}.
**AR/F110/Clearing partisi** — {{VA01}}, {{VF04}}, {{F-30}}, {{S_ALR_87012168}}, {{OBXR}}, {{UKM_BP}},
{{FBL5H}}, {{FCH8}}, {{FCH9}}, {{AL11}} · tablolar {{MHNK}}, {{MHND}} · terimler
{{terim:tahsilat}}, {{terim:supheli-alacak}}, {{terim:kredi-limiti}}.
**Closing/FX/MM/SD partisi** — {{OB08}}, {{OB59}}, {{OBA1}}, {{S_ALR_87012284}}, {{MR8M}},
{{MM03}}, {{MB51}}, {{OMWB}}, {{VF11}}, {{VF03}} · terimler {{terim:tahakkuk}}, {{terim:karsilik}},
{{terim:kur-tipi}}, {{terim:paralel-para-birimi}}, {{terim:fiyat-kontrolu}},
{{terim:malzeme-hareket-turu}}.
**Vergi/defter partisi** — {{FTXA}}, {{OBZT}}, {{S_ALR_87012357}}, {{FINSC_LEDGER}}, {{FB01L}},
{{FB50L}}, {{FBKP}}, {{F-37}} · tablolar {{T007A}}, {{T030K}}, {{BSET}}, {{T881}},
{{FAGL_SPLINFO}}, {{T074}} · terimler {{terim:tevkifat}}, {{terim:teminat}},
{{terim:lider-defter}}, {{terim:defter-grubu}}, {{terim:ifrs}}, {{terim:yerel-para-birimi}}.

### Yeni konu ekleme adımları
> FI kataloğu tamamlandı; bu adımlar **yeni bir modül** (CO, MM, SD…) veya
> FI'a eklenecek yeni bir konu için geçerlidir.

1. `data/catalog.js`'te stub yoksa ekle (grup, ikon, seviye, süre, özet).
   ⚠️ Konu `hue` alanı **artık kullanılmıyor** — renk gruptan gelir (bkz. §5b).
2. `content/fi/<id>.js` oluştur, §4 şemasına göre `SAP.registerTopic({id, sections:{...}})`.
3. `index.html` → "3) konu içerikleri" bloğuna tek satır `<script src>` ekle.
4. Kullanılan yeni T-code/tablo/terim varsa `data/` sözlüklerine ekle.
5. Tarayıcıda aç, konsolda `SAP.auditRefs()` çalıştır → **boş dizi dönmeli**.
6. `.\derle.ps1` (veya `node derle.mjs`) ile `tek-dosya.html`'i tazele.

### Sırada ne var (içerik değil, motor)
FI kataloğu bittiği için sıradaki iş **içerik değil**. İki yön:

**a) Yeni modül** — CO, MM veya SD. Motor değişmeden eklenir:
`SAP.registerModule` + `data/catalog-<modul>.js` + `content/<modul>/*.js` +
`index.html` script satırları. Grup renkleri için `SAP.GROUPS`'a `hue` verilir.

**b) Motor iyileştirmeleri (henüz yapılmadı)**
- Konu içi arama (sayfa içinde vurgulama)
- Quiz sonuçlarının konu kartında rozet olarak gösterimi
- Yanlış cevaplanan soruların tekrar havuzu
- Sözlük sayfası (tüm terimlerin alfabetik listesi)
- Notların dışa aktarımı (tek dosya)

---

## 9. Çıkarılan Dersler

1. **`file://` altında ES module CORS'a takılır.** Çift tıkla açılan uygulamada
   `import`/`export` kullanılamaz. Veri dosyaları klasik `<script src>` ile yüklenip
   global sabit tanımlamalıdır. Dinamik script enjeksiyonu da güvenilir değil — statik etiket kullan.

2. **CDN bağımlılığı çevrimdışı garantisini bozar.** Mermaid, React, Google Fonts gibi harici
   kaynaklar internet gerektirir. Diyagramlar bu yüzden `diagram.js` içinde bildirimsel veriden
   üretilir (~250 satır), fontlar sistem yığınından gelir.

3. **Ölçüme dayalı çizim tek bir tetikleyiciye güvenmemeli.** ER diyagramının SVG bağlantı
   çizgileri `getBoundingClientRect()` ile hesaplanır. `requestAnimationFrame` tek başına
   yetmez: düzen henüz oturmamışsa genişlik 0 gelir ve çizgi çizilmez. Çözüm üç katmanlı:
   render sonrası rAF + **ResizeObserver** + pencere resize. Ayrıca genişlik < 40px ise
   çizim atlanır (hatalı koordinat üretmektense çizmemek daha iyi).

4. **Etkileşimli bileşenlerde tam sayfa yeniden çizim yapma.** Quiz cevabı veya flash kart
   çevirmede `render()` çağırmak kaydırma konumunu sıfırlar ve 3D animasyonu öldürür (eleman
   değişir). Bu bileşenler DOM'u noktasal günceller. Buna karşılık "okundu işaretle" ve
   "favori" gibi *durum* değişiklikleri `render({keepScroll:true})` ile tam çizilir — çünkü
   sidebar, içindekiler ve ilerleme çubuğunu birlikte etkilerler.

5. **Escape → biçim → çapraz link sırası bozulmamalı.** Metin önce HTML olarak kaçırılmalı,
   sonra `**kalın**` gibi işaretler uygulanmalı, en son `{{...}}` çipleri üretilmeli.
   Sıra bozulursa içerikten gelen metin HTML olarak yorumlanır.

6. **Çapraz bağlantı motoru öz denetim ister.** 400'den fazla `{{...}}` işareti elle
   kontrol edilemez. `SAP.auditRefs()` tüm kayıtlı içeriği derinlemesine gezip çözülemeyen
   anahtarları raporlar. Her içerik eklemesinden sonra çalıştırılır ve **boş dönmelidir**.

7. **Olay delegasyonunda en içteki taşıyıcı kazanmalı.** `data-action` ve `data-go`
   iç içe geçebilir (kartın içindeki favori butonu). `closest()` ile ayrı ayrı aramak
   yanlış eşleşme üretir; DOM ağacında yukarı yürüyüp **ilk eşleşende durmak** doğru davranıştır.
   Ayrıca `e.target` her zaman eleman değildir — `nodeType !== 1` kontrolü gerekir.

8. **Kalıcılık testini kendi kendine geçersiz kılma.** "Son ziyaret edilen sayfa" özelliğini
   test ederken `location.hash = ''` yapmak, hashchange tetikleyip `lastRoute`'u `#/` olarak
   kaydetti ve test yanlış negatif verdi. Doğru test: rotayı ayarla, sonra **hash'siz URL ile**
   yeniden yükle (`location.replace(location.pathname)`).

9. **Önizleme ortamı düzen ölçümü için güvenilir olmayabilir.** Bu projede önizleme çerçevesi
   `visibilityState: hidden` ve `innerWidth: 0` raporladı; genişliğe dayalı her ölçüm anlamsız
   çıktı. Mantık testleri (DOM yapısı, veri bütünlüğü, etkileşim) yine de yapılabilir —
   ama görsel/responsive doğrulama gerçek tarayıcıda yapılmalıdır. **Ölçüm sonucunu
   yorumlamadan önce ölçüm ortamının geçerliliğini kontrol et.**

10. **Ana projenin dışındaki klasör tarayıcı önizlemesinde çalışmayabilir.** Doğrulama için
    tüm CSS/JS'i tek dosyaya gömen geçici bir paket üretildi (PowerShell ile), ana proje
    klasörüne konuldu, test edildi ve **silindi**. Çok dosyalı `file://` projelerini test
    etmek için işe yarayan bir yöntem.

11. **Stub + merge deseni "ölü link" sorununu çözer.** `catalog.js` 34 konuyu meta verisiyle
    kaydeder, içerik dosyaları aynı id ile `sections` ekleyip `status:'ready'` yapar.
    Böylece ana sayfa ilk günden dolu görünür, içeriği yazılmamış konu tıklandığında
    boş sayfa değil "Yakında" + mevcut T-code/tablo bağlantıları gösterir.

12. **"Açılmıyor" şikâyetinde önce nerede açıldığını sor.** Kullanıcı uygulamayı Claude'un
    önizleme panelinde açtı; panel ana proje klasörü dışındaki dosyaları statik anlık görüntü
    olarak sunduğu için **JS hiç çalışmadı** — üst çubuk (statik HTML) göründü, kenar çubuğu ve
    içerik boş kaldı. Dosya aslında sağlamdı. Aynı dosya proje klasörüne kopyalanıp açıldığında
    sorunsuz çalıştı. **Teşhis yöntemi:** dosyayı ana proje klasörüne kopyala, konsolda
    `typeof SAP` ve `#view`/`#sidebar` uzunluklarını ölç — dolu geliyorsa sorun dosyada değil,
    açılış ortamındadır. Ekran görüntüsü bu ayrımı yapmayı çok hızlandırdı.

13. **PowerShell `-replace` büyük JS gövdesini sessizce bozabilir.** `-replace` .NET regex
    kullanır ve *değiştirme metnindeki* `$1`, `$&`, `` $` ``, `$'` dizilerini özel yorumlar.
    JS kaynağında geçen `'<code>$1</code>'` gibi ifadeler bu yüzden bozulabilir (bu projede
    `$1` şansa literal kaldı, ama garanti değil). Dosya gömme gibi işlerde **düz metin
    `.Replace()` metodu** kullanılmalıdır — regex ve özel dizi yorumu yoktur.

14. **Veri denetimi, çizim anında üretilen bağlantıları göremez.** `SAP.auditRefs()` ilk sürümde
    yalnızca metin içindeki `{{…}}` işaretlerini tarıyordu. Ama `sections.js` bazı alanlardan
    **çizim anında** işaret üretir: `teknik.guncellenenTablolar[].tablo` değeri `'BKPF / BSEG'` ise
    renderer `{{BKPF / BSEG}}` üretir ve bu çözülemez. Audit temiz derken ekranda bozuk çip vardı.
    **İki düzeltme yapıldı:** (a) renderer artık ayraçlardan bölüp her parçayı ayrı çip yapıyor
    (`refList()`), (b) audit'e ikinci geçiş eklendi — işaret üreten alanlar (`guncellenenTablolar`,
    `tabloEtkisi`, `tcodes`, `tables`, `related`) ayrıca denetleniyor.
    **Genel ders:** doğrulama, verinin *çizilmiş hâlini* de kontrol etmeli. Bu yüzden her partide
    hem `auditRefs()` hem de DOM'daki `.ref-miss` sayısı ölçülüyor — ikisi bağımsız kontrollerdir.

15. **Kasıtlı "hatalı" örnekler doğrulamada gürültü yapar; belgelenmeli.** `document-posting`
    konusunda kullanıcının girdiği dengesiz belge **bilinçli** olarak denksiz bırakıldı
    (simülasyonun eksik satırı nasıl tamamladığını göstermek için). Otomatik kontrol bunu
    hata olarak raporlar. Çözüm: beklenen istisnayı doğrulama bölümünde açıkça yazmak —
    aksi hâlde sonraki oturumda "düzeltilmesi gereken hata" sanılıp öğretici örnek bozulur.

16. **Muhasebe içeriğinde denklik makine tarafından kontrol edilmeli.** `diagram.fis()`
    borç ve alacak toplamını hesaplayıp eşit değilse görünür şekilde uyarır. Bu, hem
    öğrenciye doğru örnek gösterilmesini garanti eder hem de içerik yazarken yapılan
    aritmetik hatayı anında yakalar. (Bir fişte boş satır bu kontrol sayesinde fark edildi.)

17. **Doğrulama sorgusunun kendisi de doğrulanmalı — "0 hata" bozuk bir sorgunun sonucu olabilir.**
    Bu partide üç kez yanlış "temiz" sonucu alındı:
    (a) `document.getElementById('root')` — kabuktaki gerçek id `view`; sorgu `null` döndürdü.
    (b) `querySelectorAll('.fc')` — flash kartın sınıfı `.fc-scene`; **16 konuda da 0** raporlandı.
    (c) `location.hash = ...` ile gezinip hemen ölçmek — `hashchange` asenkron tetiklendiği için
    ölçüm **bir önceki sayfada** yapıldı ve dengesiz fiş görünmedi. Doğrusu: hash'i ayarla,
    ardından `SAP.render()` ile senkron çiz, sonra ölç.
    **Kural:** bir kontrol sorgusundan gelen sıfır, ancak aynı sorgu **başka bir yerde
    sıfırdan farklı** dönebiliyorsa anlamlıdır. Kontrolü, hatalı olduğu *bilinen* bir örnek
    üzerinde çalıştırıp önce **pozitif sonuç** aldığını gör (bu projede `document-posting`'in
    kasıtlı dengesiz fişi bu görevi görüyor — Ders #15'teki istisna aynı zamanda
    doğrulama harness'ının kontrol numunesidir).

18. **KDV matrahı iskontodan sonra hesaplanır.** İçerik yazarken yapılan somut hata:
    iskontolu SD faturasında KDV brüt 100.000 üzerinden (%20 → 20.000) yazıldı, oysa
    iskonto geliri azalttığı için matrah 97.000 ve KDV 19.400 olmalıydı. Fiş denklik
    kontrolü (Ders #16) bunu anında yakaladı. Aynı hata gerçek hayatta da sık yapılır ve
    bu yüzden `sd-integration` içeriğine açık bir uyarı olarak eklendi.

19. **Denetimin kör noktası tek seferde kapanmaz — her yeni alan yeniden açar.**
    Ders #14'te `auditRefs()`'e ikinci geçiş eklenmişti (`guncellenenTablolar`, `tabloEtkisi`,
    `tcodes`, `tables`, `related`). Bu partide audit **yine temiz** dedi ama DOM'da bir
    `.ref-miss` çıktı: `tanim.kavramlar` alanı da çizim anında `{{terim:<anahtar>}}` üretiyor ve
    ikinci geçiş bu alanı kapsamıyordu (`teminat` terimi sözlükte yoktu).
    Audit'e üç alan daha eklendi: `tanim.kavramlar`, `cesitler.liste[].tcodes`,
    `tcodes.liste[].ilgili`.
    **Genel ders:** "renderer'ın veriden işaret ürettiği her alan" kapalı bir liste değildir;
    `sections.js`'e her yeni `mk('{{' + … + '}}')` eklendiğinde audit'in de genişletilmesi gerekir.
    Bu yüzden **DOM'daki `.ref-miss` sayımı vazgeçilmez ikinci kontroldür** — audit'in
    eksikliğini yakalayan tek mekanizma odur.

20. **Aynı ayar bir yerde doğru, başka yerde yanlış olabilir — bağlama bak.**
    Vergi hesaplarında ({{terim:vergi-kodu}}) `FS00` → "yalnızca otomatik kayıt" işareti
    **doğru** uygulamadır: elle kayıt atılmasını engeller ve beyan–mizan ayrışmasını önler.
    Aynı işaret özel ana muhasebe alternatif hesaplarında (159, 340) **yanlıştır**:
    özel G/L işlemleri o hesaplara satıcı/müşteri kalemi olarak yazar ve işaret konursa
    süreç hiç çalışmaz. Oradaki doğru ayar hesabı **mutabakat hesabı** olarak işaretlemektir.
    İçerik yazarken "bir yerde öğrenilen iyi pratik" başka konuya körü körüne taşınmamalıdır;
    her iki konuda da bu ayrım açıkça yazıldı.

21. **`index.html` tek başına taşınmaz — başka bilgisayara `tek-dosya.html` gider.**
    Kullanıcı dosyayı başka bir bilgisayara kopyaladı ve "sol üstte üst üste üç buton"
    gördü. Sebep: yalnızca `index.html` kopyalanmış; `css/`, `js/`, `data/`, `content/`
    klasörleri yanında yok. `index.html` bir **kabuktur** (4 KB) — içindeki üç buton
    (☰ menü, 🔍 ara, 🌙 tema) düz HTML olduğu için görünür, CSS ve JS yüklenmediği için
    stilsiz ve işlevsiz kalır.
    **Doğru yol:** `tek-dosya.html` (≈2 MB, her şey gömülü) tek başına gönderilir,
    veya `SAPWeb` klasörünün **tamamı** kopyalanır.
    **Teşhis ipucu:** "stilsiz birkaç eleman görünüyor ama sayfa boş" = CSS ve JS
    ikisi birden yüklenmemiş = eksik dosya kopyalanmış. Konsol hatası bile gerekmez;
    görüntünün kendisi tanı koydurur.

22. **Kasıtlı dengesiz fiş sayısı arttı — ikisi de belgelenmeli.**
    Ders #15'te `document-posting`'deki kasıtlı dengesiz belge kaydedilmişti.
    Bu partide ikincisi eklendi: `document-parking` içindeki **"Dengesiz park — sistem izin verir"**
    fişi (85.000 borç ≠ 60.000 alacak). Amacı, parkın denklik aramadığını ama
    {{FBV0}}'ın aradığını göstermek — yani "park esnek, muhasebeleştirme katı" ilkesinin
    somut kanıtı.
    **Beklenen `.jr-bad` sayısı artık 2'dir** (`document-posting` + `document-parking`).
    Doğrulama bu iki istisnayı bilerek yapılmalı; üçüncü bir dengesiz fiş **gerçek hatadır**.

23. **Çözülen referans ≠ çizilen referans — denetimin göremediği hata sınıfı.**
    `SAP.auditRefs()` boş, `.ref-miss` sayısı 0, konsol temiz. Buna rağmen sayfada
    **138 ham `{{...}}` işareti** vardı — 25 konuda.

    Sebep: denetim *"bu işaret sözlükte var mı?"* sorusunu sorar. İşaretler **vardı**,
    yani denetim haklı olarak sustu. Sorun başka yerdeydi: bazı renderer alanları
    `mk()` (markup) yerine `esc()` (yalnızca escape) kullanıyordu. İşaret çözülüyordu
    ama **hiç çözülmeye gönderilmiyordu** — ekranda ham metin olarak kalıyordu.

    Etkilenen yedi alan (hepsi **başlık / etiket** alanı — gövde metinleri zaten `mk()`'daydı):
    `notlar[].baslik` · `cesitler.liste[].ad` ve `.en` · `sapSurec.ekranlar[].ad` ·
    `senaryo.baslik` · `subH()` alt başlıkları · `karsilastirmaBasliklar[]` sütun başlıkları ·
    `tHesap`'ın `hesap`/`kod`/`not`/satır `ad` alanları · ER varlık `aciklama` alanı.

    **Neden başlıklar unutulmuş:** motoru yazarken varsayım *"başlık düz metindir"*di.
    İçerik yazarken ise doğal davranış başlıkta da `{{FB50}}` yazmak. İki varsayım
    sessizce çatıştı ve **hiçbir kontrol yakalamadı**.

    **Çözüm renderer'da yapıldı, içerikte değil** — 25 konudaki 138 örneği tek seferde
    düzeltti ve gelecekte yazılacak içerik için de doğru davranışı garanti etti.
    `mk()` içeride zaten escape ettiği için güvenlik açığı doğurmaz.

    **Kalıcı ders:** doğrulama *"referans çözülüyor mu?"* ile yetinmemeli,
    **"çizilmiş metinde ham `{{` kaldı mı?"** diye de sormalı. Bu, ilk ikisinden
    tamamen **bağımsız üçüncü bir eksendir** ve artık standart kontrol listesindedir:

    ```js
    (document.getElementById('view').textContent.match(/\{\{/g) || []).length === 0
    ```

24. **Fazlalık konu silmek, içeriği önce doğrulamayı gerektirir.**
    `amortisman-yontemleri` konusu kullanıcı talebiyle silindi. Silmeden önce
    içeriğin `asset-accounting` içinde durduğu **Grep ile doğrulandı**.

    İlk kontrol PowerShell `[regex]::Matches` ile yapıldı ve **0 sonuç** döndürdü —
    yanlış alarm. Sebep: emoji içeren desen (`🧮 Yöntem`) PowerShell'in `-Raw`
    okumasında kodlama nedeniyle eşleşmiyor. **Grep aracı aynı desende 13 sonuç buldu.**

    İçerik gerçekten duruyordu; PowerShell'e güvenilseydi silme **iptal edilecekti**.
    Ders #17'nin (yanlış sorgu = yanlış "temiz" raporu) tersi yönde bir örneği:
    bu kez yanlış sorgu **yanlış alarm** üretti.

    **Kural:** Türkçe karakter veya emoji içeren desenlerde **Grep aracı kullanılır**,
    PowerShell regex'i değil. Silme kararı tek bir aracın çıktısına dayandırılmaz.

    Silme sırası (üçü de gerekli): `content/fi/<id>.js` → `data/catalog.js` girdisi →
    `index.html` script satırı. Ayrıca diğer konuların `related` dizilerinde
    o id'ye atıf olup olmadığı kontrol edilir — varsa **ölü link** kalır.

25. **Ders #23'ün kör noktası tek seferde kapanmadı — iki tur sürdü.**
    Başlık alanlarını `mk()`'ya çevirmek 138 ham işaretin **137'sini** çözdü.
    Bir sonraki konu (`tcodes`) yazılınca **bir tane daha** çıktı:
    `tcodes.liste[].ad` ve `tablolar.liste[].baslik` hâlâ `esc()` kullanıyordu.

    Sebep: ilk turda alanları **çizilmiş çıktıdan geriye doğru** buldum —
    yani yalnızca *o an içerikte marker bulunan* alanlar göründü.
    Marker içermeyen ama `esc()` kullanan alanlar **görünmez kaldı**.

    **Doğru yöntem, kaynaktan ileriye doğru taramaktı:**

    ```bash
    grep -n "esc(" js/sections.js js/diagram.js
    ```

    Her `esc()` çağrısı için tek soru: *"yazar buraya `{{...}}` yazar mı?"*
    Cevap evetse `mk()` olmalı. Bu, içeriğin o anki hâlinden **bağımsız** bir kontroldür.

    **Genel ders (Ders #19'un tekrarı, farklı biçimde):** bir hata sınıfını
    **belirtiden** kapatmak eksik kalır; **kaynaktan** kapatmak gerekir.
    Belirti taraması *"şu an bozuk olanı"* bulur, kaynak taraması
    *"bozulabilecek olanı"* bulur.

    Bu tarama ikinci turda **beş alan daha** buldu (henüz marker içermiyorlardı,
    ama içerebilirlerdi): `kv()` anahtarı · `flow` ve `er` diyagram başlıkları ·
    ER alan notu · `flow`/`er` rol etiketi.

    ✅ **Bilinçli olarak `esc()` kalanlar** — bunlar yazar prozası değildir:
    - `qa()` soru metni — renderer'ın **kendi sabit** etiketi
    - `t.kod` / `t.ad` çipleri — işlem kodu ve tablo adı **literalleri**
      (zaten çipin kendisi bağlantı)
    - ER `f.ad`, `r.from`, `r.to`, `r.alanlar` — **teknik alan/tablo adları**
    - fiş `hesap`, `belgeTuru`, `tarih`, `paraBirimi` — sabit değerler
    - ⚠️ **`data-er` niteliğindeki JSON — burası `esc` KALMALI.**
      `mk()` bir HTML **niteliğinin içine** çip basarsa niteliği bozar.
      Koda bu gerekçe yorum olarak yazıldı ki sonraki tur yanlışlıkla değiştirmesin.
      Doğrulamaya ayrı bir eksen eklendi: her ER diyagramının `data-er` JSON’u
      hâlâ `JSON.parse` edilebiliyor mu (beklenen: **0 bozuk**).

26. **Sözlükte çift anahtar sessizce birikir — `auditRefs()` bunu göremez.**
    `error-handling` için {{OB28}} eklenecekken zaten kayıtlı olduğu fark edildi.
    Tüm sözlük tarandı: **{{OB28}}, {{OBBH}}, {{FS10N}}, {{FBV3}}, {{KSB1}}** ve
    tablo {{BSET}} — **altı çift kayıt**.

    **Neden görünmedi:** `auditRefs()` *"bu anahtar sözlükte **var mı**?"* diye sorar.
    Çift kayıtta anahtar **fazlasıyla vardır** — denetim haklı olarak susar.
    Çizimde de bozukluk yoktu: registry son kaydı kullanır, çip normal görünür.

    **Zararı sessizdir ama gerçektir:** hangi açıklamanın kazandığı **dosya
    sırasına** bağlıdır. Bu altı çiftin hepsinde ikinci kayıt daha ayrıntılıydı;
    biri başka sıraya kaysa **daha zayıf açıklama** kazanacaktı.
    Ayrıca `konu:` alanları farklıydı — aynı kod iki farklı konuya bağlıydı.

    **Yeni kontrol ekseni** (denetimin göremediği, bu yüzden ayrı):

    ```bash
    grep -oE "\{ *kod *: *'[^']+'" data/tcodes.js | sort | uniq -d
    ```

    Sözlüğe ekleme yapılan her turda çalıştırılır; üç sözlük için de
    (`kod` / `ad`+`baslik` / `anahtar`) aynı kontrol yapılır.

    **Genel ders — Ders #23 ve #25’in üçüncü hâli:** *"var mı?"* sorusu
    *"kaç tane var?"* sorusunu **kapsamaz**. Bir denetim ne sorduğunu bilir,
    **sormadığını göremez** — bu yüzden her yeni hata sınıfı **yeni bir eksen** ister.

    Şu anki dört eksen:
    ① referans çözülüyor mu · ② çizimde `.ref-miss` var mı ·
    ③ çizilmiş metinde ham `{{` kaldı mı · ④ **sözlükte çift anahtar var mı**

27. **Türkçe kısaltılmış istek yanlış ayrıştırılabilir — "e" bir dolgu sözcüğü değildi.**
    Kullanıcı *"e çözümler alanı da ekle ayrı başlık altında"* yazdı.
    Bunu *"e, çözümler alanı ekle"* diye okudum — baştaki **"e"**’yi
    Türkçedeki dolgu sözcüğü (*"e, hadi"*) sandım — ve `error-handling`
    (Hata Yönetimi **ve Çözümler**) konusunu yazdım.

    Kullanıcı tekrarladı: *"e dön"*. Sorunca netleşti: **"e-dönüşüm"**.
    Yani ilk istek de *"e-çözümler"* idi — **e-fatura / e-arşiv / e-defter**,
    Türkiye’nin elektronik belge mevzuatı. Tamamen farklı bir konu.

    **Neden yanlış okudum:** `error-handling` o an **sıradaki konuydu** ve
    okuma ona *"uyuyordu"*. Beklenen şeye uyan bir yorum bulunca
    **alternatif aramayı bıraktım**. Klasik doğrulama yanlılığı.

    ⚠️ **Tetikleyici işaret:** Türkçede tek harflik bir önek (`e-`, `i-`)
    **kısa çizgi olmadan** yazılabilir. `e çözüm` = `e-çözüm`,
    `e dönüşüm` = `e-dönüşüm`, `e fatura` = `e-fatura`.
    Bir istekte yalnız başına duran **"e"** görünce, dolgu sözcüğü varsaymadan
    önce **e-dönüşüm ihtimalini** değerlendir.

    **Genel ders:** kısa ve belirsiz bir istek, sıradaki işe *"uyuyorsa"*
    bu **doğrulama değil, uyarı işaretidir**. Maliyet asimetriktir:
    sormak bir mesaj, yanlış konu yazmak bir oturum.

    ✅ İki konu da yerinde duruyor ve **birbirini besliyor**:
    `error-handling`’deki **② sessiz hata** sınıfı, `e-donusum`’daki
    *"reddedilen fatura"* vakasının tam olarak kuramsal çerçevesi.
    Yanlış anlama boşa gitmedi — ama **planlanmış bir sıra değildi**.

28. **Biçimlendirme motoru üç ayrı yerden sızıntı yapıyordu — ve hiçbir denetim görmüyordu.**
    `migration` konusundaki bir başlık ekranda `*Geçiş bir veri taşıma işi değil…*`
    diye ham yıldızlarla çıktı. Tek bir konunun sorunu sanıldı; **19 dosyada
    86 yer** olduğu ortaya çıktı — 16'sı bu partiden **önce** vardı.

    Sebep tek değildi, **üç ayrı kusurdu** ve üçü de aynı boşlukta saklanıyordu:

    **① Kalın deseni yıldızı tamamen dışlıyordu.**
    `/\*\*([^*\n]+)\*\*/` — `[^*\n]` yüzünden `**kalın *italik* kalın**`
    hiç eşleşmiyor, ardından italik kuralı ilk iki yıldızı yanlış eşleştirip
    metni bozuyordu. Düzeltme: içeride tek yıldıza izin (`\*(?!\*)`) + tembel nicelik.

    **② Kalın satır sonunu aşamıyordu.**
    Flash kartlarda `**iki satıra bölünmüş\nkalın cümle**` yaygın bir yazım.
    `[^*\n]` bunu da engelliyordu. Düzeltme: kalında `\n` serbest.
    ⚠️ **İtalikte serbest bırakılmadı** — içerikte `RFFO*` ve `320*` gibi
    joker desenler var ve permissive italik bunları yanlış eşleştirirdi.
    *Aynı hatanın iki kuralda farklı çözümü olabilir; simetri hedef değildir.*

    **③ ⭐ Kod bloğu içindeki yıldız sonraki geçişlere yem oluyordu.**
    En sinsi olanı buydu. `` `Z*` `` önce `<code>Z*</code>`'e çevriliyor ama
    yıldız **metinde kalıyor**; ilerideki bir italik açılışıyla eşleşip
    aradaki tüm metni `<em>` içine alıyordu.
    Düzeltme: kod blokları **en başta yer tutucuyla çıkarılır, en sonda geri konur**.
    Böylece `*`, `->` ve `--` kod içinde hiç işlenmez — ki doğrusu da budur.

    **Ayrıca bir çift-sarma hatası:** `errTable()` mesajı `'**' + mesaj + '**'`
    ile sarıyordu. Mesajın kendisi kalın içeriyorsa sonuç `****` oluyordu.
    Düzeltme: vurgu **işaretle değil HTML ile** verilir
    (`{html:'<strong>' + mk(e.mesaj) + '</strong>'}`). Aynı hata `fiori`
    tablosunda ve tcode detay sayfasında da vardı.

    ⭐ **Neden hiçbir denetim yakalamadı:** dört eksenin dördü de
    *"çapraz bağlantı"* sorusunu soruyordu. `auditRefs()` referansın
    çözülüp çözülmediğine bakar; `.ref-miss` bozuk çipi sayar; ham `{{`
    taraması işaretin çözülmeye gönderilip gönderilmediğine bakar.
    **Hiçbiri "biçimlendirme doğru mu?" diye sormuyordu.**

    Bu, Ders #19/#23/#26'nın aynı kalıbı: *bir denetim ne sorduğunu bilir,
    **sormadığını göremez**.* Her yeni hata sınıfı **yeni bir eksen** ister.

    **5. eksen eklendi:** çizilmiş metinde `<code>` dışında kalan `*` sayısı.

    ⚠️ **Eksen sıfır beklemiyor, 11 bekliyor.** Düz metindeki joker desenler
    (`RFFO*`, `320*`) meşrudur ve Ders #15/#22'deki kasıtlı dengesiz fişlerle
    aynı mantıkla **belgelenmiş istisnadır**. Bir kontrolün beklenen değeri
    sıfır olmak zorunda değildir; **bilinen ve yazılı** olmak zorundadır.

29. **⭐ CSS özel özelliği `:root`ta tanımlanırsa `var()` ORADA çözülür — alt
    elemanda değiştirmek hiçbir şeyi değiştirmez.** Bu projedeki en uzun
    yaşamış sessiz hata. Tasarım sisteminin **1. ilkesi** ("renk gruba ait,
    konuya değil") yazıldığı günden beri **hiç çalışmamıştı**.

    **Belirti yoktu.** Sayfa açılıyordu, konsol temizdi, dokuz grup bölümü
    doğru başlıklarla çiziliyordu, beş doğrulama ekseninin beşi de yeşildi.
    Sadece her şey maviydi — ve mavi *geçerli bir tasarım tercihi* gibi
    göründüğü için kimse (ben dahil) sorgulamadı.

    **Nasıl bulundu:** kullanıcı *"mavi çok standart duruyor, pastel bir renk
    seç"* dedi. Yeni rengi seçmeden önce dört adayı sayfaya enjekte edip
    ekran görüntüsü aldım. Adaylardan birinde `--h`'yi değiştirdim ve
    **grup başlıkları da onunla birlikte değişti** — oysa onların kendi
    `--h`'si olmalıydı. Renk seçmek için yapılan bir deneme, seçilecek
    rengin zaten bozuk olan sistemini ortaya çıkardı.

    **Sebep:**

    ```css
    :root {
      --h: 240;
      --accent: oklch(53% 0.115 var(--h));   /* ⚠️ BURADA çözülür */
    }
    ```

    `--accent`'in değeri `:root`ta hesaplanır ve **hesaplanmış hâliyle**
    miras alınır. `<section class="grp" style="--h:162">` yazmak `--h`'yi
    doğru şekilde değiştirir ama `--accent` zaten `oklch(53% 0.115 240)`
    olarak donmuştur. `--h` doğru, sonuç yanlış.

    **Çözüm — türetilmiş tokenleri `*` üzerinde tanımla:**

    ```css
    *, *::before, *::after {
      --accent: oklch(54% 0.098 var(--h));
    }
    ```

    Böylece her eleman kendi `--h`'siyle **yeniden hesaplar**.
    `:root` özgüllüğü `*`'ı yendiği için `html` yine kendi değerini alır.
    ⚠️ Koyu tema (`:root[data-theme="dark"] *`) ve `print.css`'teki nötr
    sabitleme de **aynı seviyede** yazılmalıdır — yoksa `*` kuralı onları
    ezer. Bu, düzeltmenin en kolay atlanan yarısıdır.

    ⭐ **Neden beş eksenin beşi de göremedi:** hepsi *içerik* soruları
    soruyordu — referans çözülüyor mu, çip bozuk mu, ham işaret kaldı mı,
    çift kayıt var mı, biçim işareti sızdı mı. **Hiçbiri "bu kural ekranda
    gerçekten uygulandı mı?" diye sormuyordu.** Ders #19/#23/#26/#28'in
    aynı kalıbı, bu kez **CSS katmanında**: *bir denetim ne sorduğunu bilir,
    sormadığını göremez.*

    **6. eksen eklendi** ve kritik inceliği şudur: **niteliği değil,
    `getComputedStyle` ile hesaplanmış değeri okur.** `style="--h:162"`
    kontrolü bu hatayı **yakalayamazdı** — nitelik zaten doğruydu.

    ```js
    const a = [...document.querySelectorAll('.grp')]
      .map(g => getComputedStyle(g).getPropertyValue('--accent'));
    new Set(a).size === a.length   // dokuz grup, dokuz farklı renk
    ```

    **Genel ders — ikisi birden:**
    (a) *Bir tasarım ilkesini yazmak, uygulandığı anlamına gelmez.*
    Beş ilke `theme.css`'in başında yazılıydı, biri fiilen yoktu.
    İlkeler de doğrulanmalıdır — kod gibi.
    (b) *Makul görünen çıktı, doğrulanmamış çıktıdır.* Tek renkli bir arayüz
    bir kusur değil bir tercih gibi okunur; hatayı gizleyen şey buydu.

30. **Bir ölçümü tek örnek üzerinde yapmak, o ölçümü yapmamaktır.**
    Ders #29'u düzelttikten sonra *"eksik kaldı mı?"* sorusu üzerine
    kapsamlı bir tarama yapıldı ve **üç ayrı kusur** çıktı — üçü de
    daha önce "doğrulandı" denmiş alanlardaydı.

    **① Responsive taraması tek sayfada yapılmıştı.** CLAUDE.md
    *"390px'de yatay taşma yok"* diyordu ve doğruydu — **ana sayfa için**.
    36 konu taranınca `asset-accounting` **561px**, `migration` 403px
    çıktı. Sebep: `.panel > h3` bir flex kutusuydu, `flex-wrap` yoktu ve
    içindeki uzun bir `.tag` ("Residual Value — IFRS (IAS 16)")
    `white-space: nowrap` olduğu için satırı zorluyordu.
    Şimdi tarama **36 konu + 6 rota × iki genişlik = 84 ölçüm**.

    **② Kontrast hiç ölçülmemişti.** `--text-3` açık temada **3.33** ile
    AA eşiğinin altındaydı — kart alt bilgisi ("Orta · 55 dk"), ipuçları
    ve gezinme sütunu sayaçları bu tonda. 63% → 54% yapıldı (4.79).
    Kullanıcının önceki turdaki *"göz yorucu"* geri bildirimiyle aynı
    aileden bir kusur; renk **eklemek** yetmiyor, okunabilirliği
    **ölçmek** gerekiyor.

    **③ ⭐ Kontrast ölçümünün kendisi bozuktu** — ve bu, Ders #17'nin
    en temiz tekrarı. İlk deneme şunu yapıyordu:

    ```js
    d.style.color = 'oklch(54% 0.014 265)';
    getComputedStyle(d).color.match(/[\d.]+/g)   // ["54","0.014","265"]
    ```

    Modern Chromium `getComputedStyle().color` değerini **oklch olarak
    döndürür**, `rgb()`'ye çevirmez. Regex `54`'ü kırmızı kanal sanıyordu.
    Sonuç: siyah metin / beyaz zemin **2.21** çıkıyordu (gerçeği 21) ve
    ölçüm **her şeyi kırmızı bayrakla** işaretliyordu.

    Doğru yöntem — gerçek sRGB baytları için canvas'a boyayıp piksel oku:

    ```js
    cx.fillStyle = col; cx.fillRect(0,0,1,1);
    const [r,g,b] = cx.getImageData(0,0,1,1).data;
    ```

    ⭐ **Ve ölçüme bir sağlama eklendi:** `kontrast('#000','#fff') === 21`.
    Bu satır olmasaydı ikinci ölçüme de güvenilebilirdi. Ders #17 *"sıfırın
    anlamlı olması için sorgunun sıfırdan farklı dönebildiğini gör"*
    diyordu; buradaki hâli: **bilinen cevabı olan bir girdiyle ölç.**
    Siyah/beyaz 21'dir — evrensel bir kontrol numunesi.

    **Genel ders:** *"doğrulandı" bir kapsam belirtmeden yazılmamalıdır.*
    ①'de kapsam bir sayfaydı ama "site" diye yazılmıştı. Bu yüzden §7'deki
    her madde artık **kaç örnek üzerinde** ölçüldüğünü söylüyor.

---

## 10. Dil Katmanı (TR / EN) — ve sınırının gerekçesi

`js/i18n.js`. Anahtar sağ üst köşede; seçim `localStorage`'a yazılır.

⭐ **Kaynak dil kuralı:** `catalog.js`'teki `title` alanı artık **Türkçedir**.
Önceden 30 başlık `Accounts Payable (Satıcılar)` biçimindeydi — İngilizce
ad, parantezde Türkçesi; altısı ise düz Türkçeydi. Aynı listede iki farklı
kalıp vardı ve Türkçe arayüzde başlıkların çoğu İngilizce görünüyordu.
Şimdi **TR alanda Türkçe, EN alanda İngilizce**; İngilizce karşılıklar
`TOPICS_EN`'de duruyor.

⚠️ **Parantez yalnızca İŞLEM KODU için kalır** — `Otomatik Ödeme Programı
(F110)` gibi. F110 bir çeviri değil, sistemde birebir aranan bir
literaldir (bkz. §2 Dil kuralı).

⚠️ **Arama indeksi İKİ DİLİ birden taşır.** Başlıklar Türkçeleşince
`"Accounts Payable"` araması sonuçsuz kalıyordu; oysa danışman kavramı
çoğu zaman İngilizce adıyla arar. Görünen etiket seçili dilden gelir,
**aranan metin her iki dili de içerir** (`search.js` → `baslikDil`).
İndeks dile bağlı olduğu için dil değişince **yeniden kurulur**.

**Çevrilir:** bütün arayüz metinleri · dokuz grup adı · 36 konunun
**başlığı ve özeti** · seviye adları (Başlangıç → Beginner) · 11 bölüm adı ·
boş durum metinleri. Ayrıca **yüzde biçimi** dile göre değişir:
TR `%40`, EN `40%` — küçük ama bir arayüzün dil bilip bilmediğini
ele veren ilk yerlerden biri.

**⚠️ Çevrilmez ve bu bilinçli bir karardır:** konuların **derin gövdesi**
(11 bölümün metni, senaryolar, fişler, quiz soruları). İki sebep:

1. **Hacim:** yaklaşık 2 milyon karakter.
2. ⭐ **Terminoloji riski:** muhasebe metni makine çevirisinden sağ çıkmaz.
   *"Kapatma"* bu projede hem **closing** (dönem) hem **clearing** (kalem)
   demektir ve ayrım bağlamdadır. *"Mutabakat hesabı"* → *reconciliation
   account*, ama *"mutabakat"* tek başına *reconciliation* değil bazen
   *agreement*'tır. **Yarım çevrilmiş bir muhasebe metni, çevrilmemiş
   olandan daha tehlikelidir** — çünkü okuyucu doğru sanır.

EN seçiliyken konu sayfasının başında bunu söyleyen tek satırlık bir
uyarı çıkar (`.lang-notice`). Bu bir eksiklik değil, **açıklanmış bir
karardır**; gizlenmesi yanlış olurdu.

**Yeni dil eklemek:** `DICT`'e bir anahtar seti + `TOPICS_EN` benzeri bir
konu sözlüğü + `DILLER` dizisine bir kod. Motorda değişiklik gerekmez.
