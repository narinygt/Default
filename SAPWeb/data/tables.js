/* ==========================================================================
   data/tables.js — SAP FI tablo sözlüğü
   --------------------------------------------------------------------------
   Metinde {{BSEG}} yazıldığında buradaki kayıt bulunur ve tıklanabilir çipe
   dönüşür. Alanlar:
     ad         Tablo adı (SAP'ta birebir böyledir — çevrilmez)
     baslik     Türkçe adı
     aciklama   Ne tutar / nasıl oluşur
     modul      FI-GL, FI-AP, FI-AR, FI-AA, FI-BL, MM, SD, TEKNİK…
     tur        Hareket | Ana Veri | Özelleştirme | İndeks | Toplam | Kayıt
     anahtar    Birincil anahtar alanları
     alanlar    [{ad, aciklama, tip:'pk'|'fk'|''}] — en önemli alanlar
     olusturan  Bu tabloyu hangi işlem doldurur
     s4         S/4HANA'daki durumu
     konu       Bağlı konu id'si
   ========================================================================== */

SAP.registerTables([

  /* ================================================ Belge çekirdeği === */
  { ad:'BKPF', baslik:'Muhasebe belgesi başlığı', modul:'FI', tur:'Hareket', konu:'sap-tables',
    aciklama:'Her FI belgesinin başlık bilgisini tutar: belge numarası, türü, tarihi, para birimi, kullanıcı. Belgenin "kimliği" burada, "içeriği" BSEG’dedir.',
    anahtar:'BUKRS + BELNR + GJAHR',
    olusturan:'FB50, FB60, FB70, F-02, MIRO, VF01 ve muhasebeleşen her işlem',
    s4:'S/4HANA’da varlığını sürdürür; ancak raporlamanın kaynağı artık ACDOCA’dır.',
    alanlar:[
      {ad:'BUKRS', aciklama:'Şirket kodu', tip:'pk'},
      {ad:'BELNR', aciklama:'Belge numarası', tip:'pk'},
      {ad:'GJAHR', aciklama:'Mali yıl', tip:'pk'},
      {ad:'BLART', aciklama:'Belge türü (KR, SA, RV…)'},
      {ad:'BUDAT', aciklama:'Kayıt tarihi — döneme bu tarih karar verir'},
      {ad:'BLDAT', aciklama:'Belge tarihi (faturanın üstündeki tarih)'},
      {ad:'MONAT', aciklama:'Kayıt dönemi'},
      {ad:'WAERS', aciklama:'Belge para birimi'},
      {ad:'XBLNR', aciklama:'Referans (satıcının fatura numarası)'},
      {ad:'STBLG', aciklama:'İptal eden belge numarası'},
      {ad:'AWKEY', aciklama:'Kaynak belge anahtarı (MM/SD belgesine köprü)'},
    ]},

  { ad:'BSEG', baslik:'Muhasebe belgesi kalemleri', modul:'FI', tur:'Hareket', konu:'sap-tables',
    aciklama:'Belgenin satırlarını tutar: hesap, tutar, borç/alacak göstergesi, maliyet yeri, vergi kodu. Cluster tablodur — bu yüzden doğrudan SELECT ile filtrelenmesi yavaştır.',
    anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
    olusturan:'FI belgesi kaydeden her işlem',
    s4:'S/4HANA’da hâlâ yazılır ama raporlama ACDOCA üzerinden yapılır. Cluster (RFBLG) yapısı nedeniyle ACDOCA’ya göre çok daha yavaştır.',
    alanlar:[
      {ad:'BUKRS', aciklama:'Şirket kodu', tip:'pk'},
      {ad:'BELNR', aciklama:'Belge numarası', tip:'pk'},
      {ad:'GJAHR', aciklama:'Mali yıl', tip:'pk'},
      {ad:'BUZEI', aciklama:'Kalem numarası', tip:'pk'},
      {ad:'BSCHL', aciklama:'Kayıt anahtarı (posting key)'},
      {ad:'SHKZG', aciklama:'Borç/Alacak göstergesi: S = Soll (borç), H = Haben (alacak)'},
      {ad:'HKONT', aciklama:'Ana muhasebe hesabı'},
      {ad:'LIFNR', aciklama:'Satıcı numarası', tip:'fk'},
      {ad:'KUNNR', aciklama:'Müşteri numarası', tip:'fk'},
      {ad:'DMBTR', aciklama:'Yerel para birimi tutarı'},
      {ad:'WRBTR', aciklama:'Belge para birimi tutarı'},
      {ad:'MWSKZ', aciklama:'Vergi kodu'},
      {ad:'KOSTL', aciklama:'Maliyet yeri'},
      {ad:'ZUONR', aciklama:'Atama — otomatik kapatmanın (F.13) eşleştirme alanı'},
      {ad:'AUGBL', aciklama:'Kapatma belgesi — doluysa kalem kapalıdır'},
      {ad:'AUGDT', aciklama:'Kapatma tarihi'},
      {ad:'UMSKZ', aciklama:'Özel ana muhasebe göstergesi (avans, teminat…)'},
    ]},

  { ad:'ACDOCA', baslik:'Evrensel Kayıt Defteri kalemleri (Universal Journal)', modul:'FI/CO', tur:'Hareket', konu:'s4-yenilikleri',
    aciklama:'S/4HANA’nın tek gerçek kaynağı. FI, CO, AA, ML ve kâr merkezi verisini tek satırda birleştirir. Eskiden ayrı ayrı tutulan toplam ve indeks tablolarının yerini alır.',
    anahtar:'RCLNT + RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
    olusturan:'FI/CO’da muhasebeleşen her işlem',
    s4:'S/4HANA ile gelen tablodur. ECC’de karşılığı yoktur; BSEG + FAGLFLEXA + COEP + ANEP birleşimi diye düşünülebilir.',
    alanlar:[
      {ad:'RLDNR', aciklama:'Defter (ledger) — paralel muhasebenin ayrım alanı', tip:'pk'},
      {ad:'RBUKRS', aciklama:'Şirket kodu', tip:'pk'},
      {ad:'BELNR', aciklama:'Belge numarası', tip:'pk'},
      {ad:'DOCLN', aciklama:'Kalem numarası (6 hane — BSEG’in BUZEI’sinden geniştir)', tip:'pk'},
      {ad:'RACCT', aciklama:'Hesap numarası'},
      {ad:'HSL', aciklama:'Şirket kodu para birimi tutarı'},
      {ad:'WSL', aciklama:'Belge para birimi tutarı'},
      {ad:'KSL', aciklama:'Grup para birimi tutarı'},
      {ad:'DRCRK', aciklama:'Borç/Alacak göstergesi'},
      {ad:'RCNTR', aciklama:'Maliyet yeri'},
      {ad:'PRCTR', aciklama:'Kâr merkezi'},
      {ad:'ANLN1', aciklama:'Duran varlık numarası'},
      {ad:'AWREF', aciklama:'Kaynak belge referansı'},
    ]},

  /* BSET aşağıda ayrıntılı tanımlı — çift kayıt kaldırıldı (bkz. Ders #26). */

  /* ================================================= İndeks tabloları === */
  { ad:'BSIS', baslik:'G/L açık kalemleri (indeks)', modul:'FI-GL', tur:'İndeks', konu:'sap-tables',
    aciklama:'Açık kalem yönetimi açık G/L hesaplarının kapanmamış kalemlerini hızlı erişim için tutar.',
    anahtar:'BUKRS + HKONT + AUGDT + AUGBL + ZUONR + GJAHR + BELNR + BUZEI',
    olusturan:'Açık kalem yönetimli hesaba yapılan kayıt',
    s4:'S/4HANA’da fiziksel tablo kaldırıldı; aynı isimde bir uyumluluk view’i (compatibility view) ACDOCA üzerinden veri döndürür.' },

  { ad:'BSAS', baslik:'G/L kapatılmış kalemleri (indeks)', modul:'FI-GL', tur:'İndeks', konu:'sap-tables',
    aciklama:'Kapatılmış (cleared) G/L kalemlerini tutar. Kalem kapatıldığında BSIS’ten buraya taşınır.',
    s4:'S/4HANA’da uyumluluk view’ine dönüştürüldü.' },

  { ad:'BSIK', baslik:'Satıcı açık kalemleri (indeks)', modul:'FI-AP', tur:'İndeks', konu:'accounts-payable',
    aciklama:'Ödenmemiş satıcı faturalarını tutar. FBL1N’in "açık kalem" seçeneği ve F110’un seçim havuzu buradan beslenir.',
    anahtar:'BUKRS + LIFNR + UMSKS + UMSKZ + AUGDT + AUGBL + ZFBDT + BELNR + BUZEI',
    olusturan:'Satıcıya yapılan her kayıt (FB60, MIRO, F-43)',
    s4:'S/4HANA’da uyumluluk view’i; gerçek veri ACDOCA + BSEG’dedir.' },

  { ad:'BSAK', baslik:'Satıcı kapatılmış kalemleri (indeks)', modul:'FI-AP', tur:'İndeks', konu:'accounts-payable',
    aciklama:'Ödenmiş satıcı kalemlerini tutar. Ödeme yapıldığında kalem BSIK’ten buraya geçer.',
    s4:'S/4HANA’da uyumluluk view’i.' },

  { ad:'BSID', baslik:'Müşteri açık kalemleri (indeks)', modul:'FI-AR', tur:'İndeks', konu:'accounts-receivable',
    aciklama:'Tahsil edilmemiş müşteri faturalarını tutar; yaşlandırma ve ihtar (dunning) seçimi buradan yapılır.',
    s4:'S/4HANA’da uyumluluk view’i.' },

  { ad:'BSAD', baslik:'Müşteri kapatılmış kalemleri (indeks)', modul:'FI-AR', tur:'İndeks', konu:'accounts-receivable',
    aciklama:'Tahsil edilmiş müşteri kalemlerini tutar.',
    s4:'S/4HANA’da uyumluluk view’i.' },

  { ad:'FAGLFLEXA', baslik:'Yeni ana muhasebe kalem tablosu', modul:'FI-GL', tur:'Hareket', konu:'new-gl',
    aciklama:'Yeni Ana Muhasebe’de defter bazlı kalemleri tutar; kâr merkezi ve bölüm gibi genişletilmiş alanları taşır.',
    s4:'S/4HANA’da yerini ACDOCA aldı; uyumluluk view’i olarak yaşar.' },

  { ad:'FAGLFLEXT', baslik:'Yeni ana muhasebe toplam tablosu', modul:'FI-GL', tur:'Toplam', konu:'new-gl',
    aciklama:'Hesap/defter/dönem bazında toplamları tutar. Bakiye raporları eskiden buradan okurdu.',
    s4:'S/4HANA’da kaldırıldı — toplamlar artık ACDOCA’dan anlık (on-the-fly) hesaplanır.' },

  { ad:'GLT0', baslik:'Klasik ana muhasebe toplamları', modul:'FI-GL', tur:'Toplam', konu:'gl-accounting',
    aciklama:'Klasik ana muhasebede hesap ve dönem bazında borç/alacak toplamlarını tutar (FS10N’in kaynağı).',
    s4:'S/4HANA’da uyumluluk view’ine dönüştürüldü.' },

  /* ==================================================== G/L ana veri === */
  { ad:'SKA1', baslik:'G/L hesabı — hesap planı seviyesi', modul:'FI-GL', tur:'Ana Veri', konu:'master-data',
    aciklama:'Hesabın hesap planına ait bölümünü tutar: numara, hesap grubu, bilanço/gelir-gider ayrımı. Şirket kodundan bağımsızdır.',
    anahtar:'KTOPL + SAKNR',
    olusturan:'FS00 / FSP0',
    alanlar:[
      {ad:'KTOPL', aciklama:'Hesap planı', tip:'pk'},
      {ad:'SAKNR', aciklama:'Hesap numarası', tip:'pk'},
      {ad:'KTOKS', aciklama:'Hesap grubu — numara aralığını ve alan durumunu belirler'},
      {ad:'XBILK', aciklama:'Bilanço hesabı mı? (boşsa gelir-gider hesabı)'},
    ]},

  { ad:'SKB1', baslik:'G/L hesabı — şirket kodu seviyesi', modul:'FI-GL', tur:'Ana Veri', konu:'master-data',
    aciklama:'Hesabın şirket koduna özgü ayarlarını tutar: para birimi, vergi kategorisi, açık kalem yönetimi, alan durumu grubu, mutabakat hesabı tipi.',
    anahtar:'BUKRS + SAKNR',
    olusturan:'FS00 / FSS0',
    alanlar:[
      {ad:'BUKRS', aciklama:'Şirket kodu', tip:'pk'},
      {ad:'SAKNR', aciklama:'Hesap numarası', tip:'pk'},
      {ad:'WAERS', aciklama:'Hesap para birimi'},
      {ad:'XOPVW', aciklama:'Açık kalem yönetimi açık mı? — kapatma yapılabilmesi için gerekli'},
      {ad:'XKRES', aciklama:'Kalem görüntüleme açık mı?'},
      {ad:'MITKZ', aciklama:'Mutabakat hesabı tipi: D müşteri, K satıcı, A duran varlık'},
      {ad:'FSTAG', aciklama:'Alan durumu grubu — kayıt ekranında hangi alan zorunlu/gizli'},
    ]},

  { ad:'SKAT', baslik:'G/L hesap açıklamaları', modul:'FI-GL', tur:'Ana Veri', konu:'master-data',
    aciklama:'Hesap adlarını dil bazında tutar (SPRAS anahtarıyla).' },

  /* ================================================== Satıcı ana veri === */
  { ad:'LFA1', baslik:'Satıcı genel verisi', modul:'FI-AP', tur:'Ana Veri', konu:'master-data',
    aciklama:'Satıcının şirket kodundan bağımsız verisi: ad, adres, vergi numarası, hesap grubu.',
    anahtar:'LIFNR',
    olusturan:'XK01 / BP',
    s4:'S/4HANA’da BP üzerinden doldurulur; doğrudan XK01 ile bakım yapılmaz.',
    alanlar:[
      {ad:'LIFNR', aciklama:'Satıcı numarası', tip:'pk'},
      {ad:'NAME1', aciklama:'Ad / unvan'},
      {ad:'LAND1', aciklama:'Ülke'},
      {ad:'STCD1/STCD2', aciklama:'Vergi numarası alanları'},
      {ad:'KTOKK', aciklama:'Hesap grubu'},
      {ad:'SPERR/LOEVM', aciklama:'Blok / silme işareti'},
    ]},

  { ad:'LFB1', baslik:'Satıcı şirket kodu verisi', modul:'FI-AP', tur:'Ana Veri', konu:'master-data',
    aciklama:'Satıcının muhasebe verisi: mutabakat hesabı, ödeme koşulu, ödeme yöntemi, ödeme bloğu.',
    anahtar:'LIFNR + BUKRS',
    olusturan:'FK01 / XK01 / BP',
    alanlar:[
      {ad:'AKONT', aciklama:'Mutabakat hesabı — satıcı bakiyesinin yansıdığı G/L hesabı'},
      {ad:'ZTERM', aciklama:'Ödeme koşulu (vade)'},
      {ad:'ZWELS', aciklama:'İzin verilen ödeme yöntemleri — F110 buna bakar'},
      {ad:'ZAHLS', aciklama:'Ödeme bloğu — doluysa F110 ödemez'},
      {ad:'MAHNA', aciklama:'İhtar prosedürü'},
    ]},

  { ad:'LFM1', baslik:'Satıcı satın alma organizasyonu verisi', modul:'MM', tur:'Ana Veri', konu:'mm-integration',
    aciklama:'Satıcının satın alma tarafındaki ayarları: sipariş para birimi, teslimat koşulu.' },

  { ad:'LFC1', baslik:'Satıcı dönemsel bakiyeleri', modul:'FI-AP', tur:'Toplam', konu:'accounts-payable',
    aciklama:'Satıcının mali yıl ve dönem bazında borç/alacak toplamları (FK10N kaynağı).',
    s4:'S/4HANA’da uyumluluk view’i.' },

  /* ================================================= Müşteri ana veri === */
  { ad:'KNA1', baslik:'Müşteri genel verisi', modul:'FI-AR', tur:'Ana Veri', konu:'master-data',
    aciklama:'Müşterinin şirket kodundan bağımsız verisi: ad, adres, vergi numarası, hesap grubu.',
    anahtar:'KUNNR',
    olusturan:'XD01 / BP',
    s4:'S/4HANA’da BP üzerinden doldurulur.' },

  { ad:'KNB1', baslik:'Müşteri şirket kodu verisi', modul:'FI-AR', tur:'Ana Veri', konu:'master-data',
    aciklama:'Müşterinin muhasebe verisi: mutabakat hesabı, ödeme koşulu, ihtar prosedürü, ödeme bloğu.',
    anahtar:'KUNNR + BUKRS',
    alanlar:[
      {ad:'AKONT', aciklama:'Mutabakat hesabı'},
      {ad:'ZTERM', aciklama:'Ödeme koşulu'},
      {ad:'MAHNA', aciklama:'İhtar prosedürü'},
      {ad:'MANSP', aciklama:'İhtar bloğu'},
    ]},

  { ad:'MHNK', baslik:'İhtar verisi — başlık', modul:'FI-AR', tur:'Kayıt', konu:'dunning',
    aciklama:'Müşteri bazında ihtar geçmişini tutar: son ihtar tarihi, ulaşılan ihtar seviyesi.',
    anahtar:'KUNNR + BUKRS + MABER + MANST',
    olusturan:'{{F150}} ihtar çalıştırması' },

  { ad:'MHND', baslik:'İhtar verisi — kalem', modul:'FI-AR', tur:'Kayıt', konu:'dunning',
    aciklama:'Hangi kalemin hangi ihtar seviyesinde ihtar edildiğini tutar.',
    olusturan:'{{F150}}' },

  { ad:'KNVV', baslik:'Müşteri satış alanı verisi', modul:'SD', tur:'Ana Veri', konu:'sd-integration',
    aciklama:'Müşterinin satış organizasyonu bazında verisi: fiyat grubu, teslimat önceliği, vergi sınıfı.' },

  { ad:'KNC1', baslik:'Müşteri dönemsel bakiyeleri', modul:'FI-AR', tur:'Toplam', konu:'accounts-receivable',
    aciklama:'Müşterinin dönem bazında borç/alacak toplamları (FD10N kaynağı).',
    s4:'S/4HANA’da uyumluluk view’i.' },

  /* ================================================== Duran varlık === */
  { ad:'ANLA', baslik:'Duran varlık ana verisi', modul:'FI-AA', tur:'Ana Veri', konu:'asset-accounting',
    aciklama:'Varlığın kimlik bilgisi: sınıf, tanım, aktifleştirme tarihi, envanter numarası.',
    anahtar:'BUKRS + ANLN1 + ANLN2',
    olusturan:'AS01',
    alanlar:[
      {ad:'ANLN1', aciklama:'Ana varlık numarası', tip:'pk'},
      {ad:'ANLN2', aciklama:'Alt varlık numarası', tip:'pk'},
      {ad:'ANLKL', aciklama:'Varlık sınıfı — hesap belirlemeyi getirir'},
      {ad:'AKTIV', aciklama:'Aktifleştirme tarihi — amortismanın başlangıcı'},
    ]},

  { ad:'ANLB', baslik:'Varlık amortisman alanı verisi', modul:'FI-AA', tur:'Ana Veri', konu:'asset-accounting',
    aciklama:'Her amortisman alanı (depreciation area) için amortisman anahtarı ve faydalı ömrü tutar. Aynı varlık farklı alanlarda farklı amortisman görebilir — vergi ve raporlama ayrımı buradan çıkar.' },

  { ad:'ANLC', baslik:'Varlık yıllık değer toplamları', modul:'FI-AA', tur:'Toplam', konu:'asset-accounting',
    aciklama:'Varlığın yıl bazında edinim değeri, birikmiş amortismanı ve dönem amortismanını tutar. AW01N’in değer sekmesi buradan okur.',
    s4:'S/4HANA’da değerler ACDOCA’da tutulur; ANLC uyumluluk amaçlıdır.' },

  { ad:'ANEP', baslik:'Varlık hareket kalemleri', modul:'FI-AA', tur:'Hareket', konu:'asset-accounting',
    aciklama:'Varlığa yapılan her hareketi (edinim, çıkış, transfer, değer düzeltme) hareket türü (transaction type) ile tutar.',
    anahtar:'BUKRS + ANLN1 + ANLN2 + GJAHR + LNRAN + AFABE',
    olusturan:'ABZON, F-90, ABAVN, ABUMN',
    s4:'S/4HANA’da ACDOCA’ya taşındı; ANEP uyumluluk view’idir.' },

  { ad:'ANEA', baslik:'Varlık hareketi — amortisman payı', modul:'FI-AA', tur:'Hareket', konu:'asset-accounting',
    aciklama:'Çıkış hareketlerinde birikmiş amortismanın ne kadarının düşüleceğini tutar.' },

  { ad:'ANLZ', baslik:'Varlık zaman bağımlı verisi', modul:'FI-AA', tur:'Ana Veri', konu:'asset-accounting',
    aciklama:'Maliyet yeri, tesis, sorumlu kişi gibi zaman içinde değişebilen atamaları geçerlilik tarihiyle tutar.' },

  { ad:'ANEK', baslik:'Varlık belge başlığı', modul:'FI-AA', tur:'Hareket', konu:'asset-accounting',
    aciklama:'Varlık belgelerinin başlık bilgisini FI belgesine bağlar.' },

  /* ============================================== Banka ve ödeme === */
  { ad:'BNKA', baslik:'Banka ana verisi', modul:'FI-BL', tur:'Ana Veri', konu:'bank-accounting',
    aciklama:'Ülke + banka anahtarı bazında banka adını, SWIFT kodunu ve adresini tutar. Hem şirketin hem iş ortaklarının bankaları buradadır.',
    anahtar:'BANKS + BANKL' },

  { ad:'T012', baslik:'Ev bankası (house bank) tanımı', modul:'FI-BL', tur:'Özelleştirme', konu:'bank-accounting',
    aciklama:'Şirket kodunun çalıştığı bankaları tanımlar.',
    s4:'S/4HANA’da Bank Account Management (BAM) ile yönetilir.' },

  { ad:'T012K', baslik:'Ev bankası hesap kimlikleri', modul:'FI-BL', tur:'Özelleştirme', konu:'bank-accounting',
    aciklama:'Her ev bankası hesabının IBAN’ını ve karşılık gelen G/L hesabını tutar. F110’un banka belirlemesi buraya bakar.' },

  { ad:'REGUH', baslik:'Ödeme çalıştırması — ödeme başlıkları', modul:'FI-AP', tur:'Kayıt', konu:'f110',
    aciklama:'F110’un ürettiği her ödemenin başlığı: alıcı, tutar, banka, ödeme yöntemi, ödeme belgesi numarası.',
    anahtar:'LAUFD + LAUFI + XVORL + ZBUKR + LIFNR + KUNNR + VBLNR',
    olusturan:'F110 öneri (proposal) ve ödeme çalıştırması',
    alanlar:[
      {ad:'LAUFD', aciklama:'Çalıştırma tarihi', tip:'pk'},
      {ad:'LAUFI', aciklama:'Çalıştırma kimliği (identification)', tip:'pk'},
      {ad:'XVORL', aciklama:'X ise bu satır yalnızca öneridir, gerçek ödeme değildir'},
      {ad:'RWBTR', aciklama:'Ödeme tutarı'},
      {ad:'VBLNR', aciklama:'Ödeme belgesi numarası'},
    ]},

  { ad:'REGUP', baslik:'Ödeme çalıştırması — ödenen kalemler', modul:'FI-AP', tur:'Kayıt', konu:'f110',
    aciklama:'Her ödemenin hangi fatura kalemlerini kapattığını tutar. "Bu ödeme hangi faturaları kapattı?" sorusunun cevabı burasıdır.',
    olusturan:'F110' },

  { ad:'REGUV', baslik:'Ödeme çalıştırması — kontrol kaydı', modul:'FI-AP', tur:'Kayıt', konu:'f110',
    aciklama:'Çalıştırmanın durumunu tutar: parametreler girildi mi, öneri üretildi mi, ödeme yapıldı mı.' },

  { ad:'PAYR', baslik:'Çek kayıt defteri', modul:'FI-BL', tur:'Kayıt', konu:'bank-accounting',
    aciklama:'Basılan/kullanılan çekleri numara, lehtar, tutar ve tahsil durumu ile tutar (FCHN kaynağı).' },

  { ad:'FEBKO', baslik:'Banka ekstresi başlığı', modul:'FI-BL', tur:'Hareket', konu:'ebs',
    aciklama:'Yüklenen her banka ekstresinin başlık bilgisi: banka, hesap, ekstre numarası, açılış/kapanış bakiyesi.' },

  { ad:'FEBEP', baslik:'Banka ekstresi kalemleri', modul:'FI-BL', tur:'Hareket', konu:'ebs',
    aciklama:'Ekstrenin satırları: banka işlem kodu, tutar, not to payee metni ve kayıt durumu. Eşleşmeyen satırlar FEBAN’da bu tablodan gelir.' },

  /* ========================================== Özelleştirme / temel === */
  { ad:'T001', baslik:'Şirket kodu tanımı', modul:'FI', tur:'Özelleştirme', konu:'org-yapisi',
    aciklama:'Şirket kodunun adı, ülkesi, yerel para birimi, hesap planı, mali yıl varyantı ve alan durumu varyantı.',
    anahtar:'BUKRS',
    alanlar:[
      {ad:'BUKRS', aciklama:'Şirket kodu', tip:'pk'},
      {ad:'WAERS', aciklama:'Yerel (şirket kodu) para birimi'},
      {ad:'KTOPL', aciklama:'Operasyonel hesap planı'},
      {ad:'PERIV', aciklama:'Mali yıl varyantı'},
    ]},

  { ad:'T001B', baslik:'Kayıt dönemi açık/kapalı tanımı', modul:'FI', tur:'Özelleştirme', konu:'closing',
    aciklama:'OB52’de girilen dönem açma/kapama satırlarını tutar. "Posting period not open" hatasında bakılacak tablo.' },

  { ad:'NRIV', baslik:'Numara aralığı sayaçları', modul:'TEKNİK', tur:'Özelleştirme', konu:'document-posting',
    aciklama:'Her numara aralığının alt/üst sınırını ve **güncel sayaç değerini** tutar. Belge numarasının nereden geldiğinin teknik cevabı burasıdır.',
    anahtar:'OBJECT + SUBOBJECT + NRRANGENR + TOYEAR',
    olusturan:'{{FBN1}} ve diğer numara aralığı işlemleri',
    s4:'Değişmedi. Veri geçişi sonrası sayaç güncellenmezse numara çakışması yaşanır.',
    alanlar:[
      {ad:'NRRANGENR', aciklama:'Numara aralığı anahtarı'},
      {ad:'FROMNUMBER / TONUMBER', aciklama:'Aralığın alt ve üst sınırı'},
      {ad:'NRLEVEL', aciklama:'**Güncel sayaç** — bir sonraki belge bu değerin üstünden alınır'},
    ]},

  { ad:'T003', baslik:'Belge türü tanımı', modul:'FI', tur:'Özelleştirme', konu:'document-posting',
    aciklama:'Belge türünün adını, numara aralığını ve izin verilen hesap tiplerini tutar.' },

  { ad:'TBSL', baslik:'Kayıt anahtarı (posting key) tanımı', modul:'FI', tur:'Özelleştirme', konu:'document-posting',
    aciklama:'Her kayıt anahtarının borç/alacak yönünü ve hangi hesap tipine izin verdiğini tutar.' },

  { ad:'T030', baslik:'Otomatik hesap belirleme', modul:'FI', tur:'Özelleştirme', konu:'mm-integration',
    aciklama:'İşlem anahtarı + değerleme sınıfı kombinasyonuna karşılık gelen G/L hesaplarını tutar. OBYC ve OB40 buraya yazar.' },

  { ad:'T009', baslik:'Mali yıl varyantı', modul:'FI', tur:'Özelleştirme', konu:'org-yapisi',
    aciklama:'Yılın normal ve özel dönem sayısını, dönem sınırlarını tutar.' },

  { ad:'T004', baslik:'Hesap planı tanımı', modul:'FI-GL', tur:'Özelleştirme', konu:'org-yapisi',
    aciklama:'Hesap planı kimliğini, adını, dilini ve hesap numarası uzunluğunu tutar.' },

  { ad:'T077S', baslik:'G/L hesap grubu', modul:'FI-GL', tur:'Özelleştirme', konu:'master-data',
    aciklama:'Hesap gruplarını ve numara aralıklarını tutar.' },

  { ad:'TCURR', baslik:'Döviz kuru tablosu', modul:'FI', tur:'Özelleştirme', konu:'foreign-currency',
    aciklama:'Kur tipi (M, B, G) + para birimi çifti + tarih bazında kurları tutar. Değerlemenin ve çevrimin kaynağıdır.',
    anahtar:'KURST + FCURR + TCURR + GDATU' },

  { ad:'TCURV', baslik:'Kur tipi tanımı', modul:'FI', tur:'Özelleştirme', konu:'foreign-currency',
    aciklama:'Kur tiplerini (ortalama, alış, satış) ve davranışlarını tanımlar.' },

  /* ==================================================== Değişiklik === */
  { ad:'CDHDR', baslik:'Değişiklik belgesi başlığı', modul:'TEKNİK', tur:'Kayıt', konu:'sap-tables',
    aciklama:'Bir ana veride/belgede kim, ne zaman değişiklik yaptı bilgisini tutar. Denetim (audit) sorularının ilk adresi.',
    anahtar:'OBJECTCLAS + OBJECTID + CHANGENR' },

  { ad:'CDPOS', baslik:'Değişiklik belgesi kalemleri', modul:'TEKNİK', tur:'Kayıt', konu:'sap-tables',
    aciklama:'Hangi alanın eski ve yeni değerinin ne olduğunu tutar.' },

  /* ================================================= MM / SD köprü === */
  { ad:'EKKO', baslik:'Satınalma siparişi başlığı', modul:'MM', tur:'Hareket', konu:'mm-integration',
    aciklama:'Siparişin satıcısı, tarihi, satın alma organizasyonu.' },
  { ad:'EKPO', baslik:'Satınalma siparişi kalemleri', modul:'MM', tur:'Hareket', konu:'mm-integration',
    aciklama:'Malzeme, miktar, fiyat, hesap atama kategorisi. Fatura doğrulamada üç yönlü eşleştirmenin referansıdır.' },
  { ad:'EKBE', baslik:'Satınalma siparişi geçmişi', modul:'MM', tur:'Hareket', konu:'mm-integration',
    aciklama:'Bir sipariş kaleminin tüm mal girişi ve fatura hareketlerini tutar. "Bu siparişe ne kadar mal geldi, ne kadarı faturalandı?" sorusunun tek adresi.',
    anahtar:'EBELN + EBELP + ZEKKN + VGABE + GJAHR + BELNR + BUZEI',
    olusturan:'{{MIGO}} (mal girişi) ve {{MIRO}} (fatura girişi)',
    alanlar:[
      {ad:'VGABE', aciklama:'Hareket tipi: 1 = mal girişi, 2 = fatura girişi'},
      {ad:'MENGE', aciklama:'Miktar'},
      {ad:'WRBTR', aciklama:'Tutar'},
      {ad:'BELNR', aciklama:'İlgili malzeme veya fatura belgesi', tip:'fk'},
    ]},

  { ad:'RBKP', baslik:'Lojistik fatura başlığı', modul:'MM-IV', tur:'Hareket', konu:'accounts-payable',
    aciklama:'{{MIRO}} ile girilen faturanın başlığı: satıcı, tutar, tarih, blok durumu. FI belgesinden ayrı, MM tarafındaki fatura kaydıdır.',
    anahtar:'BELNR + GJAHR',
    olusturan:'{{MIRO}}',
    alanlar:[
      {ad:'BELNR', aciklama:'Fatura belgesi numarası', tip:'pk'},
      {ad:'LIFNR', aciklama:'Satıcı', tip:'fk'},
      {ad:'RMWWR', aciklama:'Fatura brüt tutarı'},
      {ad:'ZLSPR', aciklama:'Ödeme bloğu — fiyat/miktar farkı varsa otomatik dolar'},
    ]},

  { ad:'RSEG', baslik:'Lojistik fatura kalemleri', modul:'MM-IV', tur:'Hareket', konu:'accounts-payable',
    aciklama:'{{MIRO}} faturasının satırları; hangi sipariş kalemine karşılık geldiğini tutar.',
    anahtar:'BELNR + GJAHR + BUZEI',
    olusturan:'{{MIRO}}',
    alanlar:[
      {ad:'EBELN / EBELP', aciklama:'Satınalma siparişi ve kalemi', tip:'fk'},
      {ad:'MENGE', aciklama:'Faturalanan miktar'},
      {ad:'WRBTR', aciklama:'Kalem tutarı'},
    ]},

  { ad:'T042', baslik:'Ödeme programı — şirket kodu ayarları', modul:'FI-AP', tur:'Özelleştirme', konu:'f110',
    aciklama:'{{FBZP}}’de girilen ödeme programı yapılandırmasını tutar: ödeme yapan şirket kodu, tolerans günleri, minimum tutar.',
    olusturan:'{{FBZP}}' },

  { ad:'KNKK', baslik:'Müşteri kredi yönetimi verisi', modul:'FI-AR', tur:'Ana Veri', konu:'accounts-receivable',
    aciklama:'Kredi kontrol alanı bazında müşterinin kredi limitini ve kullanılan riskini tutar.',
    anahtar:'KUNNR + KKBER',
    s4:'S/4HANA’da SAP Credit Management (tablo UKMBP_CMS_SGM) kullanılır; KNKK uyumluluk amaçlıdır.' },

  { ad:'MSEG', baslik:'Malzeme belgesi kalemleri', modul:'MM', tur:'Hareket', konu:'mm-integration',
    aciklama:'Mal hareketinin satırları; hareket türü (301, 101, 201…) ve değerleme sınıfı FI kaydını belirler.' },
  { ad:'VBRK', baslik:'SD fatura başlığı', modul:'SD', tur:'Hareket', konu:'sd-integration',
    aciklama:'Faturanın müşterisi, tarihi, net tutarı ve muhasebeye aktarım durumu (RFBSK alanı).' },
  { ad:'VBRP', baslik:'SD fatura kalemleri', modul:'SD', tur:'Hareket', konu:'sd-integration',
    aciklama:'Fatura satırları; gelir hesabı belirleme bu satırların malzeme/hesap belirleme grubuna bakar.' },

  { ad:'T007A', baslik:'Vergi kodları', modul:'FI-GL', tur:'Özelleştirme', konu:'taxes',
    aciklama:'{{FTXP}} ile tanımlanan vergi kodlarını tutar: ülke, kod, vergi tipi (A = çıkış/hesaplanan, V = giriş/indirilecek).',
    olusturan:'{{FTXP}}',
    anahtar:'KALSM + MWSKZ',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'KALSM', aciklama:'Vergi hesaplama prosedürü (ülkeye bağlı)'},
      {ad:'MWSKZ', aciklama:'Vergi kodu — iki karakter', tip:'pk'},
      {ad:'MWART', aciklama:'Vergi tipi: **A** çıkış (hesaplanan), **V** giriş (indirilecek)'},
    ]},

  { ad:'T030K', baslik:'Vergi hesap belirleme — verginin hangi hesaba yazılacağı', modul:'FI-GL', tur:'Özelleştirme', konu:'taxes',
    aciklama:'Bir vergi işleminin hangi G/L hesabına kaydedileceğini tutar. ' +
             '{{OB40}} bu tabloyu doldurur. **{{T030}} ailesinin vergi üyesidir** — ' +
             'MM’de {{OBYC}}, SD’de {{VKOA}} aynı aileye yazar.',
    olusturan:'{{OB40}}',
    guncelleyen:'{{OB40}} · taşıma isteğiyle sisteme geçer',
    anahtar:'KTOPL + KTOSL + MWSKZ',
    iliskiler:'Kayıt sırasında {{T007A}}’dan vergi kodu okunur, buradan hesap bulunur, ' +
              'sonuç {{BSEG}} `HKONT` ve {{BSET}}’e yazılır.',
    s4:'Değişmedi. S/4HANA’da da vergi hesap belirlemesinin tek kaynağıdır.',
    alanlar:[
      {ad:'KTOPL', aciklama:'**Hesap planı** — anahtarın ilk alanı. Farklı hesap planı = farklı satır.', tip:'pk'},
      {ad:'KTOSL', aciklama:'**İşlem anahtarı** — verginin türünü belirtir: ' +
                            '`MWS` hesaplanan (çıkış) KDV · `VST` indirilecek (giriş) KDV · ' +
                            '`NAV` indirilemeyen · `NVV` indirilemeyen, hesap atamasına dağıtılan', tip:'pk'},
      {ad:'MWSKZ', aciklama:'**Vergi kodu** — yalnızca "koda göre ayrım" işaretlendiğinde dolar. ' +
                            'Boşsa o işlem anahtarındaki **tüm kodlar** aynı hesaba gider.', tip:'fk'},
      {ad:'KONTS', aciklama:'**Belirlenen G/L hesabı** — 191 indirilecek, 391 hesaplanan KDV'},
      {ad:'KONTH', aciklama:'Alacak tarafı hesabı (borç/alacak ayrımı yapılan kurulumlarda)'},
    ]},

  { ad:'BSET', baslik:'Vergi satırları', modul:'FI-GL', tur:'Hareket', konu:'taxes',
    aciklama:'Belgenin vergi bilgisini **ayrı** tutar: matrah, vergi tutarı, vergi kodu. KDV beyanı {{BSEG}}’den değil buradan üretilir.',
    olusturan:'Vergi içeren her FI belgesi',
    anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
    s4:'Duruyor; {{ACDOCA}} vergi tutarını taşır ama beyan hâlâ BSET’e dayanır.',
    alanlar:[
      {ad:'HWBAS', aciklama:'**Matrah** — verginin üzerinden hesaplandığı tutar (yerel para)'},
      {ad:'HWSTE', aciklama:'Vergi tutarı (yerel para)'},
      {ad:'MWSKZ', aciklama:'Vergi kodu', tip:'fk'},
      {ad:'KTOSL', aciklama:'İşlem anahtarı — MWS / VST / NAV'},
    ]},

  { ad:'CSKS', baslik:'Maliyet yeri ana verisi', modul:'CO', tur:'Ana Veri', konu:'cost-center',
    aciklama:'Maliyet yerlerinin tanımını ve **kâr merkezi atamasını** tutar. FI kaydındaki kâr merkezi bu atamadan türetilir.',
    olusturan:'{{KS01}}',
    anahtar:'KOKRS + KOSTL + DATBI',
    s4:'Değişmedi; {{ACDOCA}} `KOSTL` alanıyla bağlanır.',
    alanlar:[
      {ad:'KOKRS', aciklama:'Kontrol alanı', tip:'pk'},
      {ad:'KOSTL', aciklama:'Maliyet yeri', tip:'pk'},
      {ad:'DATBI', aciklama:'**Geçerlilik bitiş tarihi** — anahtarın parçası; zaman dilimli ana veri'},
      {ad:'PRCTR', aciklama:'{{kar-merkezi}} — FI kaydına buradan türetilir', tip:'fk'},
      {ad:'VERAK', aciklama:'Sorumlu kişi'},
    ]},

  { ad:'CSKB', baslik:'Masraf türü ana verisi (kontrol alanı bazlı)', modul:'CO', tur:'Ana Veri', konu:'co-integration',
    aciklama:'G/L hesabının CO tarafındaki karşılığı. **Masraf türü yoksa gider hesabı CO’ya hiç yansımaz.**',
    olusturan:'{{KA01}}',
    anahtar:'KOKRS + KSTAR + DATBI',
    s4:'S/4HANA’da masraf türü G/L hesabının bir **özelliğidir** ({{FS00}} içinde); ayrı {{KA01}} zorunluluğu kalktı.',
    alanlar:[
      {ad:'KSTAR', aciklama:'Masraf türü — G/L hesap numarasıyla **aynıdır**', tip:'pk'},
      {ad:'KATYP', aciklama:'**Kategori:** 1 birincil · 11 gelir · 42 devir · 43 hizmet aktarımı'},
    ]},

  { ad:'CSKA', baslik:'Masraf türü (hesap planı bazlı)', modul:'CO', tur:'Ana Veri', konu:'co-integration',
    aciklama:'Masraf türünün hesap planı seviyesindeki tanımı; {{CSKB}} bunun kontrol alanı bazlı tamamlayıcısıdır.',
    olusturan:'{{KA01}}',
    anahtar:'KTOPL + KSTAR' },

  { ad:'COEP', baslik:'CO gerçek kalemleri (ECC)', modul:'CO', tur:'Hareket', konu:'co-integration',
    aciklama:'CO tarafındaki gerçek maliyet kalemleri. ECC’de FI ile **ayrı** tutulurdu; mutabakat gerektirirdi.',
    olusturan:'FI kaydı veya CO işlemi',
    anahtar:'KOKRS + BELNR + BUZEI',
    s4:'**{{ACDOCA}} ile birleşti** — FI ve CO artık aynı tabloda; mutabakat kavramı ortadan kalktı.',
    alanlar:[
      {ad:'OBJNR', aciklama:'CO nesnesi (maliyet yeri, iç sipariş…)'},
      {ad:'KSTAR', aciklama:'Masraf türü', tip:'fk'},
      {ad:'WOGBTR', aciklama:'Nesne para birimindeki tutar'},
    ]},

  { ad:'AUFK', baslik:'Sipariş ana verisi (iç sipariş)', modul:'CO', tur:'Ana Veri', konu:'co-integration',
    aciklama:'İç siparişlerin tanımı, tipi, durumu ve yerleşim kuralı. Maliyet burada toplanır, {{KO88}} ile hedefe aktarılır.',
    olusturan:'{{KO01}}',
    anahtar:'AUFNR',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'AUFNR', aciklama:'Sipariş numarası', tip:'pk'},
      {ad:'AUART', aciklama:'Sipariş tipi — davranışı ve numara aralığını belirler'},
      {ad:'PHAS0/1/2/3', aciklama:'Durum: açıldı · serbest · teknik olarak kapalı · kapalı'},
    ]},

  { ad:'VBKPF', baslik:'Ön kayıtlı belge başlığı', modul:'FI-GL', tur:'Hareket', konu:'document-parking',
    aciklama:'Park edilmiş (henüz muhasebeleştirilmemiş) belgelerin başlığı. **Mizanı etkilemez**; onaylanınca {{BKPF}}’ye taşınır.',
    olusturan:'{{FV50}} / {{FV60}} / {{FBV1}}',
    guncelleyen:'{{FBV2}} değiştirir, {{FBV0}} muhasebeleştirir, {{FBV4}} onaylar',
    anahtar:'AUSBK + BUKRS + BELNR + GJAHR',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'BELNR', aciklama:'Belge numarası — **park anında verilir**, muhasebeleşince aynı numara kullanılır', tip:'pk'},
      {ad:'BSTAT', aciklama:'Belge durumu: **V** ön kayıt · **Z** istatistiksel'},
      {ad:'USNAM', aciklama:'Park eden kullanıcı — dört-göz kontrolünün dayanağı'},
    ]},

  { ad:'VBSEG', baslik:'Ön kayıtlı belge kalemleri', modul:'FI-GL', tur:'Hareket', konu:'document-parking',
    aciklama:'Park edilmiş belgenin satırları. Hesap tipine göre alt tablolara ayrılır (VBSEGK satıcı, VBSEGD müşteri, VBSEGS G/L).',
    olusturan:'Park işlemi',
    anahtar:'AUSBK + BUKRS + BELNR + GJAHR + BUZEI',
    s4:'Değişmedi.' },

  { ad:'T047', baslik:'İhtar prosedürü tanımı', modul:'FI-AR', tur:'Özelleştirme', konu:'dunning',
    aciklama:'{{FBMP}} ile tanımlanan ihtar prosedürünün başlık verisi: ihtar aralığı, seviye sayısı, asgari tutarlar.',
    olusturan:'{{FBMP}}',
    anahtar:'MAHNA',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'MAHNA', aciklama:'İhtar prosedürü kodu', tip:'pk'},
      {ad:'MANWT', aciklama:'İhtar aralığı (gün) — iki ihtar arasındaki asgari süre'},
    ]},

  { ad:'TKA01', baslik:'Kontrol alanı tanımı', modul:'CO', tur:'Özelleştirme', konu:'co-integration',
    aciklama:'Kontrol alanının para birimi, hesap planı ve mali yıl varyantı ayarları; hangi şirket kodlarının bağlı olduğu burada belirlenir.',
    olusturan:'{{OKKP}}',
    anahtar:'KOKRS',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'KOKRS', aciklama:'Kontrol alanı', tip:'pk'},
      {ad:'KTOPL', aciklama:'Hesap planı — **şirket kodlarıyla aynı olmalı**', tip:'fk'},
      {ad:'WAERS', aciklama:'Kontrol alanı para birimi'},
    ]},

  { ad:'EDOCUMENT', baslik:'E-belge başlığı — muhasebe belgesinin elektronik ikizi', modul:'FI', tur:'Hareket', konu:'e-donusum',
    aciklama:'Her e-belgenin **statüsünü ve kaynak belgeye bağlantısını** tutar. ' +
             'Muhasebe belgesinden **ayrı bir nesnedir**: {{BKPF}} başarılı olsa bile ' +
             'buradaki statü **hata** veya **red** olabilir.',
    olusturan:'Fatura kaydı (FI veya SD) e-belge tetikleyicisini çalıştırdığında',
    anahtar:'EDOC_GUID',
    iliskiler:'Kaynak belge {{BKPF}} veya {{VBRK}}; XML içeriği `EDOCUMENTFILE`’da.',
    s4:'S/4HANA’da **DRC** (Document and Reporting Compliance) çatısı altında; tablo yapısı korunur.',
    alanlar:[
      {ad:'EDOC_GUID', aciklama:'E-belge kimliği', tip:'pk'},
      {ad:'SOURCE_TYPE', aciklama:'Kaynak tipi — FI faturası mı, SD faturası mı'},
      {ad:'SOURCE_KEY', aciklama:'Kaynak belge anahtarı — {{BKPF}} / {{VBRK}} bağlantısı', tip:'fk'},
      {ad:'EDOC_TYPE', aciklama:'E-belge tipi — e-fatura, e-arşiv, e-irsaliye'},
      {ad:'EDOC_STATUS', aciklama:'**Statü** — oluştu / gönderildi / kabul / **red** / hata'},
      {ad:'PROC_STATUS', aciklama:'İşlem durumu — yeniden gönderim gerekip gerekmediği'},
    ]},

  { ad:'EDOCUMENTFILE', baslik:'E-belge dosyası — gönderilen XML’in kendisi', modul:'FI', tur:'Hareket', konu:'e-donusum',
    aciklama:'Üretilen **UBL-TR XML**’i ve GİB’den dönen yanıt dosyalarını saklar. ' +
             '*"Faturada ne gönderdik?"* sorusunun tek kesin cevabı buradadır — ' +
             'ekran değil, **gönderilen dosya** esastır.',
    olusturan:'E-belge üretimi ve her yanıt alışı',
    anahtar:'EDOC_GUID + FILE_GUID',
    iliskiler:'{{EDOCUMENT}} başlığına bağlıdır.',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'EDOC_GUID', aciklama:'E-belge kimliği', tip:'fk'},
      {ad:'FILE_TYPE', aciklama:'Giden XML mi, gelen yanıt mı'},
      {ad:'FILE_RAW', aciklama:'**XML içeriği** — uyuşmazlıkta bakılacak yer'},
    ]},

  { ad:'EDIDC', baslik:'IDoc kontrol kaydı — statünün tutulduğu yer', modul:'TEKNİK', tur:'Sistem', konu:'data-upload',
    aciklama:'Her {{idoc}}’un başlığını ve **statüsünü** tutar. ' +
             'IDoc’un en büyük avantajının teknik temeli budur: ' +
             'başarısız mesaj **kaybolmaz**, statüsüyle birlikte tabloda kalır ' +
             've {{BD87}} ile yeniden işlenebilir.',
    olusturan:'IDoc alımı veya üretimi',
    anahtar:'DOCNUM',
    iliskiler:'Veri segmentleri `EDID4`, statü geçmişi `EDIDS` tablosunda.',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'DOCNUM', aciklama:'IDoc numarası', tip:'pk'},
      {ad:'STATUS', aciklama:'**Statü** — 53 başarılı · 51 uygulama hatası · **56 partner profili yok**'},
      {ad:'MESTYP', aciklama:'Mesaj tipi — hangi iş nesnesi'},
      {ad:'DIRECT', aciklama:'Yön — 1 giden, 2 gelen'},
      {ad:'SNDPRN / RCVPRN', aciklama:'Gönderen / alan partner — {{WE20}} profiliyle eşleşmeli'},
    ]},

  { ad:'BALHDR', baslik:'Uygulama günlüğü başlığı', modul:'TEKNİK', tur:'Sistem', konu:'error-handling',
    aciklama:'{{F110}}, {{AFAB}}, {{FF_5}} gibi **toplu işlemlerin** ürettiği günlüklerin ' +
             'başlığını tutar. Ekrandaki *"3 hata oluştu"* özetinin **arkasındaki ayrıntı** buradadır. ' +
             '{{SLG1}} bu tabloyu okur.',
    olusturan:'Uygulama günlüğü yazan her toplu program',
    anahtar:'LOGNUMBER',
    iliskiler:'Mesaj satırları `BALM` tablosunda; nesne/alt nesne ile filtrelenir.',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'LOGNUMBER', aciklama:'Günlük numarası', tip:'pk'},
      {ad:'OBJECT', aciklama:'Uygulama nesnesi — hangi programın günlüğü'},
      {ad:'SUBOBJECT', aciklama:'Alt nesne — çalıştırma türü'},
      {ad:'ALDATE', aciklama:'Günlük tarihi'},
      {ad:'ALUSER', aciklama:'Çalıştıran kullanıcı'},
      {ad:'PROBCLASS', aciklama:'**En yüksek mesaj sınıfı** — 1 çok kritik … 4 bilgi'},
    ]},

  { ad:'TSTC', baslik:'İşlem kodu tanımları', modul:'TEKNİK', tur:'Sistem', konu:'tcodes',
    aciklama:'Sistemdeki **tüm** işlem kodlarını ve arkalarındaki programı tutar. ' +
             '"Bu kod var mı?" ve "ne çalıştırıyor?" sorularının kaynağı.',
    olusturan:'SAP standart teslimatı + {{SE93}} ile oluşturulan özel kodlar',
    anahtar:'TCODE',
    iliskiler:'Kod metinleri {{TSTCT}} tablosunda, dile göre ayrı satırda.',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'TCODE', aciklama:'İşlem kodu', tip:'pk'},
      {ad:'PGMNA', aciklama:'Arkasındaki ABAP programı'},
      {ad:'DYPNO', aciklama:'Ekran numarası'},
      {ad:'CINFO', aciklama:'Tip bilgisi — diyalog / rapor / parametre işlemi'},
    ]},

  { ad:'TSTCT', baslik:'İşlem kodu metinleri', modul:'TEKNİK', tur:'Sistem', konu:'tcodes',
    aciklama:'İşlem kodlarının **dile göre** açıklamaları. Kod adı bilinmiyorsa ' +
             '**açıklamadan arama** buradan yapılır — `TEXT` alanına `*fatura*` yazılır.',
    olusturan:'SAP standart teslimatı',
    anahtar:'SPRSL + TCODE',
    iliskiler:'{{TSTC}} tablosunun metin uzantısı.',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'SPRSL', aciklama:'Dil anahtarı — TR / EN / DE', tip:'pk'},
      {ad:'TCODE', aciklama:'İşlem kodu', tip:'pk'},
      {ad:'TTEXT', aciklama:'**Açıklama** — kod aramanın en pratik alanı'},
    ]},

  { ad:'GB01', baslik:'Boolean sınıfı alan kontrolü', modul:'FI-GL', tur:'Özelleştirme', konu:'dogrulama-ikame',
    aciklama:'Hangi alanın doğrulamada **kullanılabileceğini** ve ikamede **değiştirilebileceğini** tutar. ' +
             'Bir alan ikame edilemiyorsa sebebi bu tablodaki kısıttır.',
    olusturan:'SAP standart teslimatı',
    anahtar:'CLASS + TABNAME + FIELDNAME',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'CLASS', aciklama:'Boolean sınıfı — FI belgeleri için **09**', tip:'pk'},
      {ad:'TABNAME / FIELDNAME', aciklama:'Tablo ve alan adı (BKPF/BSEG alanları)', tip:'pk'},
      {ad:'EXCL_SUBST', aciklama:'**İkameden hariç** işareti — doluysa o alan değiştirilemez'},
    ]},

  { ad:'T880', baslik:'Şirket (company) tanımı', modul:'FI-GL', tur:'Özelleştirme', konu:'org-yapisi',
    aciklama:'Konsolidasyon amaçlı şirket birimlerini tutar. Bir şirkete **birden çok şirket kodu** bağlanabilir.',
    olusturan:'{{OX15}}',
    anahtar:'RCOMP',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'RCOMP', aciklama:'Şirket kodu (konsolidasyon birimi)', tip:'pk'},
      {ad:'NAME1', aciklama:'Şirket adı'},
      {ad:'CURR', aciklama:'Konsolidasyon para birimi'},
    ]},

  { ad:'T014', baslik:'Kredi kontrol alanı tanımı', modul:'FI-AR', tur:'Özelleştirme', konu:'org-yapisi',
    aciklama:'{{kredi-limiti}} kontrolünün yapıldığı organizasyon birimi. Bir kredi kontrol alanına **birden çok şirket kodu** bağlanabilir — grup şirketleri arasında ortak limit için.',
    olusturan:'{{OB45}}',
    anahtar:'KKBER',
    s4:'SAP Credit Management ile birlikte kullanılır.',
    alanlar:[
      {ad:'KKBER', aciklama:'Kredi kontrol alanı', tip:'pk'},
      {ad:'WAERS', aciklama:'Para birimi — limitlerin izlendiği birim'},
    ]},

  { ad:'T074', baslik:'Özel ana muhasebe hesap belirleme', modul:'FI-GL', tur:'Özelleştirme', konu:'special-gl',
    aciklama:'Özel G/L göstergesi ile alternatif mutabakat hesabı eşleşmesini tutar. {{FBKP}} bu tabloyu doldurur.',
    olusturan:'{{FBKP}}',
    anahtar:'KOART + SHBKZ + HKONT',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'KOART', aciklama:'Hesap tipi — **K** satıcı, **D** müşteri'},
      {ad:'SHBKZ', aciklama:'Özel ana muhasebe göstergesi (A avans, F talep, W senet)'},
      {ad:'HKONT', aciklama:'**Normal** mutabakat hesabı (320) — eşleşmenin en sık atlanan alanı'},
      {ad:'SKONT', aciklama:'**Alternatif** mutabakat hesabı (159)'},
    ]},

  { ad:'T881', baslik:'Defter tanımları', modul:'FI-GL', tur:'Özelleştirme', konu:'parallel-ledger',
    aciklama:'Sistemdeki defterleri tutar: lider defter (0L) ve ek defterler (2L, 3L…), her birinin mali yıl varyantı ve para birimleri.',
    olusturan:'{{FINSC_LEDGER}}',
    anahtar:'RLDNR',
    s4:'{{FINSC_LEDGER}} ile yönetilir; {{ACDOCA}} her satırda `RLDNR` taşır.',
    alanlar:[
      {ad:'RLDNR', aciklama:'Defter kodu — **0L** lider defter', tip:'pk'},
      {ad:'XLEADING', aciklama:'Lider defter işareti — sistemde **yalnızca bir tane** olabilir'},
    ]},

  { ad:'FAGL_SPLINFO', baslik:'Belge bölme bilgisi', modul:'FI-GL', tur:'Hareket', konu:'new-gl',
    aciklama:'{{belge-bolme}} sonucunda her kaleme atanan karakteristikleri (kâr merkezi, bölüm, segment) tutar. Kapatma sırasında bölünmüş kalemlerin doğru eşleşmesini sağlar.',
    olusturan:'Belge bölme etkinse her FI belgesi',
    anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
    s4:'Duruyor; bölme sonucu ayrıca {{ACDOCA}} satırlarına yansır.' },

  /* ------------------------------- Veri geçişi / taşıma / S4 partisi --- */
  { ad:'BUT000', baslik:'İş Ortağı — genel veri', modul:'Çapraz', tur:'Ana Veri', konu:'s4-yenilikleri',
    aciklama:'S/4HANA\u2019da satıcı ve müşteri ana verisinin **ortak** başlık tablosu. {{is-ortagi}} tek nesnedir; satıcı ve müşteri artık onun **rolleridir**. Şirket kodu ve satın alma/satış verileri hâlâ {{LFB1}} ve {{KNB1}}\u2019de durur — {{BUT000}} onların üstündeki kimliktir.',
    olusturan:'{{BP}}',
    anahtar:'PARTNER',
    s4:'Zorunlu. {{XK01}}/{{XD01}} ile açılan kayıtlar bile arka planda {{cvi}} üzerinden buraya yazılır.',
    alanlar:[
      {ad:'PARTNER', aciklama:'İş ortağı numarası', tip:'pk'},
      {ad:'BPKIND', aciklama:'İş ortağı türü'},
      {ad:'TYPE', aciklama:'Kişi / Kuruluş / Grup'},
      {ad:'NAME_ORG1', aciklama:'Unvan'},
    ]},

  { ad:'MATDOC', baslik:'Malzeme belgesi — birleşik tablo', modul:'MM', tur:'Hareket', konu:'s4-yenilikleri',
    aciklama:'S/4HANA\u2019da malzeme belgelerinin tek tablosu. FI tarafındaki {{ACDOCA}} ile **aynı mimari kararın** MM karşılığıdır: başlık+kalem+toplam tabloları (MKPF/MSEG/MARD/MBEW) tek tabloda birleşti ve toplamlar **saklanmak yerine hesaplanır**. Eski tablolar {{uyumluluk-view}} olarak okunmaya devam eder.',
    olusturan:'{{MIGO}} ve stok hareketi üreten her işlem',
    anahtar:'MBLNR + MJAHR + ZEILE',
    s4:'Yeni. Konunun dışında ama **deseni** gösterdiği için burada: aynı ilke FI dışında da uygulandı.',
    alanlar:[
      {ad:'MBLNR', aciklama:'Malzeme belgesi numarası', tip:'pk'},
      {ad:'BWART', aciklama:'{{hareket-turu}}'},
      {ad:'MENGE', aciklama:'Miktar — toplam tablosu yerine buradan toplanır'},
    ]},

  { ad:'E070', baslik:'Taşıma isteği başlığı', modul:'Teknik', tur:'Teknik', konu:'best-practices',
    aciklama:'Her {{tasima-istegi}} bir satırdır: sahibi, türü, durumu ve serbest bırakılma zamanı. *\u201cBu ayar canlıya ne zaman gitti?\u201d* sorusu buradan cevaplanır.',
    olusturan:'{{SE09}}',
    anahtar:'TRKORR',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'TRKORR', aciklama:'İstek numarası', tip:'pk'},
      {ad:'TRSTATUS', aciklama:'Durum — **R** serbest bırakılmış'},
      {ad:'AS4DATE', aciklama:'Serbest bırakılma tarihi — değişiklik zaman çizelgesi'},
      {ad:'AS4USER', aciklama:'Sahibi'},
    ]},

  { ad:'E071', baslik:'Taşıma isteği nesneleri', modul:'Teknik', tur:'Teknik', konu:'best-practices',
    aciklama:'Bir isteğin **tam olarak neyi** taşıdığını tutar. İki isteğin aynı nesneye dokunup dokunmadığı buradan görülür — {{tasima-sirasi}} çakışmalarının teşhis yeri.',
    olusturan:'{{SE09}}',
    anahtar:'TRKORR + PGMID + OBJECT + OBJ_NAME',
    s4:'Değişmedi.',
    alanlar:[
      {ad:'TRKORR', aciklama:'İstek numarası', tip:'fk'},
      {ad:'OBJECT', aciklama:'Nesne türü (TABU, PROG, VDAT…)'},
      {ad:'OBJ_NAME', aciklama:'Nesne adı — tablo veya program'},
    ]},
]);
