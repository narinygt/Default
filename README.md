# CPeak Consultancy — kurumsal web sitesi

Astro 5 ile kurulmuş, **tamamen statik** çift dilli (TR/EN) kurumsal site.
Çıktı düz HTML'dir: derleme zinciri yıllar sonra bozulsa bile yayındaki
site çalışmaya devam eder.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # -> dist/
npm run verify:all # derle + SEO + erişilebilirlik + davranış testleri
```

---

## 1. Yayına çıkmadan önce yapılması ZORUNLU olanlar

Bu maddeler tamamlanmadan site yayınlanmamalıdır. Doldurulmamış alanlar
sitede **kesikli turuncu çerçeveyle görünür** — yanlışlıkla eksik bilgiyle
yayına çıkmak mümkün olmasın diye böyle tasarlandı.

| # | Yapılacak | Dosya |
|---|-----------|-------|
| 1 | **Alan adını yaz.** `SITE_URL` şu an `https://cpeak.example` (tescil edilemeyen test uzantısı). Canonical, hreflang, sitemap ve robots.txt bu değerden üretilir. | `src/config/site.ts` |
| 2 | **Koyu zemin logosunu tasarımcıya doğrulat.** Logo yerleşti (1717×591). Ancak logonun lacivert kısmı (`#003F82`) footer zeminiyle **aynı renk** olduğu için orijinal dosya koyu zeminde okunmuyordu: "Consultancy" tamamen kayboluyor, teal kısım 1.56:1'de kalıyordu. `npm run assets` bundan **beyaz tek renkli** bir sürüm türetiyor — yeni renk uydurmadan, logoyu yeniden çizmeden. Tasarımcınızın onaylaması ya da kendi koyu zemin sürümünü vermesi iyi olur; dosyanın üzerine yazmanız yeterli, script elle konmuş dosyaya dokunmaz. | `public/brand/cpeak-logo-on-dark.svg` |
| 3 | **İletişim bilgilerini gir:** e-posta, telefon, LinkedIn, açık adres. | `src/config/site.ts` |
| 4 | **Ticaret sicil bilgilerini gir:** tam unvan, sicil no, vergi dairesi/no, MERSİS. | `src/config/site.ts` |
| 5 | **Hukuki metinleri avukata okut.** KVKK aydınlatma metni ve çerez politikası, sitenin fiilî davranışını doğru tarif eden **taslaklardır**; hukuki görüş değildir. Onay sonrası `reviewNotice` alanını boşaltın, uyarı kutusu kendiliğinden kalkar. | `src/data/pages/legal.ts` |
| 6 | **Logo değiştikten sonra** paylaşım görsellerini yeniden üret: `npm run assets` | `scripts/make-brand-assets.mjs` |
| 7 | **GA4 kimliğini gir** (isteğe bağlı). Boş bırakılırsa analitik hiç yüklenmez. | `src/config/site.ts` |

> Kurumsal bilgiler prompt'ta verilmediği için **uydurulmadı**. Müşteri adı,
> logosu, referans yorumu, proje sayısı, ödül, sertifika ve iş ortaklığı
> statüsü de aynı nedenle sitede hiç yer almıyor.

---

## 2. İletişim formu — 2. faz

Form arayüzü, doğrulaması, hata mesajları, honeypot ve bot kontrolü **hazır
ve çalışıyor**. Sunucu tarafı bilinçli olarak sonraya bırakıldı.

`site.form.endpoint` boş olduğu sürece form gönderim yapmaz ve **sahte bir
"teşekkürler" göstermez** — bu, gerçek talepleri sessizce kaybettirirdi.
Bunun yerine ziyaretçiye durumu açıkça söyler ve doğrudan e-posta adresini
verir.

Bağlamak için:

1. Bir endpoint yaz (Vercel/Netlify function, kendi sunucun, ya da
   Formspree gibi bir servis).
2. `site.form.endpoint` değerini doldur. Form JSON POST etmeye başlar,
   başarı/hata durumları devreye girer. **Başka değişiklik gerekmez.**

Endpoint'in yapması gerekenler (`src/components/ContactForm.astro`
başındaki açıklamada da yazılı):

- `website` alanı (honeypot) doluysa isteği **sessizce** yut
- IP başına oran sınırlaması
- Alan doğrulamalarını **sunucuda tekrarla** — istemci doğrulaması yalnızca
  kullanıcı deneyimi içindir, güvenlik değildir
- Bildirimi `site.form.recipient` adresine gönder (şu an `dummy@dummy.com`)
- Başvurana, **gönderdiği dilde** otomatik onay e-postası yolla

---

## 2b. Ana sayfa hero görseli — dört seçenek

`src/config/site.ts` → `hero.visual` değerini değiştirin, başka hiçbir
yere dokunmanız gerekmez.

| Değer | Ne olur |
|---|---|
| `'ledger'` | Defter çizgilerinden ağ grafiğine dönüşen imza öğesi. **Varsayılan.** |
| `'image'` | Kuantum görseli, lacivert panel içinde, özgün altın renginde |
| `'duotone'` | Aynı yerleşim, görsel marka renklerine indirgenmiş |
| `'background'` | Hero'nun tamamı koyu zemin, görsel sağa yaslı fon, metin beyaz |

Görsel varyantları `npm run assets:hero` ile `quantum.png` kaynağından
üretilir (siyah zemin alfaya çevrilir, duotone hesaplanır).

**Bilinmesi gerekenler:**

- Kaynak yalnızca **800px geniş**. `'background'` seçeneğinde görsel
  doğal boyutunun üzerine büyütülmez — sağa yaslanıp zemine karışır.
  Tam genişlikte keskin bir fon isteniyorsa en az 2400px kaynak gerekir.
- `'background'` seçildiğinde header kendiliğinden koyu moda geçer
  (`darkTop`); aksi hâlde lacivert logo ve menü koyu zeminde kaybolurdu.
- Görsel altın ağırlıklı; palette altın yalnızca **tek bir vurgu** için
  ayrılmış amber olarak var. `'image'` ve `'background'` seçeneklerinde
  bu renk hiyerarşisi değişir. `'duotone'` bu çakışmayı ortadan kaldırır.

## 2c. Müşteriye geçici olarak gösterme

```bash
npm run share
```

Derler, `dist/` klasörünü yerel olarak yayınlar ve Cloudflare Quick
Tunnel ile herkese açık bir `https://…trycloudflare.com` adresi verir.
**Hesap gerekmez.** `cloudflared` yoksa ilk çalıştırmada `.tools/`
içine indirilir (~55 MB, tek seferlik, sistemde iz bırakmaz).

```bash
npm run share -- --no-build      # dist/ hazırsa derlemeyi atla
npm run share -- --port 5000     # yerel port değiştir
npm run serve                    # tünelsiz, yalnızca yerel dist/
```

**Neden dev sunucusu değil de `dist/`:** proje statik. Dev sunucusu
tünel üzerinden HMR websocket'i kopar, Vite bilinmeyen `Host`
başlıklarını reddeder ve müşteriye geliştirme modunu gösterir.
`dist/` yayına çıkacak hâlin birebir aynısıdır.

**Sınırları — müşteriye link göndermeden önce okuyun:**

| | |
|---|---|
| Makineye bağlı | Bilgisayar uyursa/kapanırsa link ölür |
| Adres kalıcı değil | Yeniden başlatınca **değişir**, eski link çalışmaz |
| Parola yok | Adres tahmin edilemez ama açıktır. Sunucu `X-Robots-Tag: noindex` gönderir |

### Dev sunucusunu tünellemek isterseniz

`astro.config.ts` içindeki `vite.server.allowedHosts` bilinen tünel
alan adlarını açar. Bu ayar olmadan Vite tünel adresini reddeder ve
*"Blocked request. This host is not allowed"* döner.

### Son çare: hesap gerektiren seçenek

Yukarıdaki sınırlar kabul edilemezse (müşteri gece bakacak, link
sabit kalmalı), site statik olduğu için en hızlı yol **Netlify Drop**:
[app.netlify.com/drop](https://app.netlify.com/drop) adresine `dist/`
klasörünü sürükleyin. Ücretsiz hesap ister, karşılığında makineden
bağımsız ve sabit bir adres verir. Cloudflare Pages ve Vercel de aynı
işi yapar. Demo bitince projeyi silmeniz yeterli.

## 3. İçeriği nereden düzenlersiniz

Tüm metin `src/data/` altında, TypeScript nesneleri olarak durur. Şablon
dosyalarına dokunmadan metin değiştirebilirsiniz.

```
src/data/
  home.ts                    Ana sayfanın 9 bölümü
  solutions/
    finance.ts               SAP Finans Modülleri
    s4hana.ts                S/4HANA Dönüşümü
    publicCloud.ts           SAP Public Cloud
    privateCloud.ts          SAP Private Cloud
    ai.ts                    Yapay Zekâ ile Finans
  pages/
    solutionsOverview.ts     /cozumler + Public vs Private Cloud tablosu
    approach.ts              Yaklaşımımız
    about.ts                 Hakkımızda
    contact.ts               İletişim sayfası yan sütunu
    legal.ts                 KVKK metni + çerez politikası
src/i18n/
  ui.ts                      Menü, buton, form, çerez banner'ı metinleri
  routes.ts                  ROUTE TABLOSU — sitenin omurgası
src/config/site.ts           Kurumsal bilgiler (tek kaynak)
src/pages/
  sitemap.xml.ts             Sitemap (route tablosundan üretilir)
  robots.txt.ts              robots.txt (SITE_URL'den üretilir)
```

`sitemap.xml` ve `robots.txt` statik dosya değildir; config'den üretilir.
Alan adını değiştirdiğinizde ikisi de kendiliğinden düzelir.

**İngilizce metin Türkçenin çevirisi değildir.** Türkçe yerel kurumsal
alıcıya, İngilizce çokuluslu şirketlere hitap eder. Bir dili
güncellediğinizde diğerini de gözden geçirin; birebir çeviri yapmayın.

### Yeni sayfa eklemek

`src/i18n/routes.ts` içindeki tabloya bir satır ekleyin. Tip sistemi her
sayfanın **her iki dilde de** slug taşımasını zorunlu kılar — bir dilde var
olup diğerinde olmayan sayfa oluşturmak derleme hatası verir. hreflang,
sitemap, dil değiştirici ve menü bu tablodan beslenir.

---

## 4. Doğrulama

Üç ayrı denetim var; hepsi gerçek tarayıcıda, derlenmiş `dist/` üzerinde
çalışır.

```bash
npm run verify   # 26 sayfa: tek H1, title/description, hreflang, OG,
                 # geçerli JSON-LD, schema'da placeholder sızıntısı yok
npm run audit    # 9 sayfa × 5 kırılım: WCAG kontrast (hesaplanmış renklerle),
                 # yatay taşma, dokunma hedefi, form etiketleri
npm run test     # 21 davranış testi: form doğrulaması, dil değiştirici,
                 # mobil menü, akordeon, çerez onayı, header scroll durumu
npm run shots    # <dizin> — 15 ekran görüntüsü (görsel gözden geçirme için)
```

Son çalıştırmada: **26/26 sayfa temiz · erişilebilirlik denetimi temiz ·
21/21 davranış testi geçti.**

`npm run audit`, `npm run test` ve `npm run shots` Playwright gerektirir
(devDependency). Site derlemesi bunlara **ihtiyaç duymaz**; sadece
`npm run build` yeterlidir.

---

## 5. Bilerek verilmiş kararlar

Bunlar eksiklik değil, tercihtir — değiştirmeden önce nedenini okuyun.

- **Tek dönüşüm hedefi.** Sitede telefon-öncelikli CTA, canlı sohbet,
  takvim widget'ı veya bülten aboneliği yok. Her CTA iletişim formuna gider.
- **Fontlar `public/fonts/` içinde.** node_modules'e bağlı değil; paket
  yapısı değişse bile tipografi bozulmaz. Türkçe karakterler için `latin`
  **ve** `latin-ext` subset'leri birlikte yüklenir — yalnızca biri
  yüklendiğinde `ğ İ Ş` ya da `ı ç ö ü` kaybolur.
- **`text-transform: uppercase` Türkçede `i → İ` yapar.** Bu doğru
  davranıştır ama İngilizce ürün adlarını bozar ("PUBLİC CLOUD"). Kırıntı
  navigasyonu ve SAP terimi içeren etiketlerde büyük harf kullanılmaz;
  gerekirse öğeye `lang="en"` verilir.
- **Amber (`#E8B33A`) açık zeminde metin olarak kullanılamaz** (1.81:1).
  Yalnızca koyu zeminde metin/rakam olarak, ya da açık zeminde zemin rengi
  olarak kullanılır. Yetkinlik şeridi bu yüzden lacivert zeminlidir.
- **Fade-up animasyonu içeriği gizlemez.** `.reveal` tek başına hiçbir şeyi
  saklamaz; gizleme yalnızca JavaScript gözlemciyi kurduğunda eklenir.
  JS yüklenmezse veya hata verirse içerik yine okunur.
- **Ana sayfadaki senaryolar gerçek müşteri vakası değildir** ve her kartta
  "Temsili senaryo" etiketiyle işaretlidir. Gerçek vaka yazma izni
  aldığınızda bunları değiştirin.

---

## 6. Sonraki adımlar için not

Referans/vaka çalışması bu sitenin en zayıf noktası — kurumsal SAP alıcısının
ilk baktığı yer burasıdır. "Temsili senaryo" etiketi dürüst bir ara çözümdür,
kalıcı değildir. İlk fırsatta bir müşteriden anonim vaka yazma izni alın;
*"4.000 çalışanlı bir gıda perakendecisinde ay sonu kapanışı 8 günden 3 güne
indi"* biçimi müşteri adı olmadan da çalışır.

Planlamaya değer iki şey:

- **İndirilebilir karar aracı** ("Public Cloud mu Private Cloud mu? 12
  soruluk kontrol listesi") — formu doldurmaya hazır olmayan ziyaretçiyi
  e-posta karşılığı yakalar.
- **İçgörüler bölümü** — SAP gibi uzun satış döngülü bir işte organik
  trafiğin tek gerçek kaynağı. Ama düzenli yazamayacaksanız hiç açmayın;
  6 ay güncellenmemiş bir blog zarar verir.

---

SAP, S/4HANA ve RISE with SAP, SAP SE'nin tescilli ticari markalarıdır.
CPeak Consultancy bağımsız bir danışmanlık şirketidir ve SAP SE ile
bağlantılı değildir.
