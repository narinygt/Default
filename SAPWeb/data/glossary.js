/* ==========================================================================
   data/glossary.js — Muhasebe ve SAP terim sözlüğü
   --------------------------------------------------------------------------
   Metinde {{mutabakat-hesabi}} yazıldığında buradaki kayıt bulunur ve
   tıklanabilir çipe dönüşür. Alanlar:
     anahtar   Bağlantı anahtarı (Türkçe, kebab-case)
     ad        Türkçe terim (çipte bu görünür)
     en        İngilizce orijinali (SAP ekranında bu yazar)
     aciklama  Tanım — kısa ve mülakatta söylenebilecek netlikte
     detay     Ek açıklama / örnek (opsiyonel)
     konu      İlgili konu id'si
     ilgili    İlişkili terim anahtarları
   ========================================================================== */

SAP.registerTerms([

  /* ============================================ Temel muhasebe === */
  { anahtar:'borc', ad:'Borç', en:'Debit', konu:'genel-muhasebe',
    aciklama:'Bir hesabın sol tarafı. Varlık ve gider hesaplarında artışı, kaynak ve gelir hesaplarında azalışı ifade eder.',
    detay:'SAP’ta `SHKZG` alanında **S** (Soll) değeriyle tutulur.', ilgili:['alacak','cift-tarafli-kayit'] },

  { anahtar:'alacak', ad:'Alacak', en:'Credit', konu:'genel-muhasebe',
    aciklama:'Bir hesabın sağ tarafı. Kaynak ve gelir hesaplarında artışı, varlık ve gider hesaplarında azalışı ifade eder.',
    detay:'SAP’ta `SHKZG` alanında **H** (Haben) değeriyle tutulur.', ilgili:['borc','cift-tarafli-kayit'] },

  { anahtar:'cift-tarafli-kayit', ad:'Çift taraflı kayıt', en:'Double-entry bookkeeping', konu:'genel-muhasebe',
    aciklama:'Her işlemin en az iki hesaba, borç ve alacak toplamları eşit olacak şekilde yazılması ilkesi.',
    detay:'SAP bu kuralı zorlar: borç ≠ alacak olan bir belge kaydedilemez, yalnızca park edilebilir.',
    ilgili:['borc','alacak','belge-denkligi'] },

  { anahtar:'belge-denkligi', ad:'Belge denkliği', en:'Document balance', konu:'document-posting',
    aciklama:'Bir muhasebe belgesindeki borç toplamının alacak toplamına eşit olması. Denk olmayan belge muhasebeleşemez.',
    ilgili:['cift-tarafli-kayit','park-etme'] },

  { anahtar:'tahakkuk-esasi', ad:'Tahakkuk esası', en:'Accrual basis', konu:'genel-muhasebe',
    aciklama:'Gelir ve giderin, nakit hareketinden bağımsız olarak doğduğu dönemde kaydedilmesi.',
    detay:'Aralıkta kullanılan ama Ocakta faturası gelen elektrik gideri, Aralık dönemine tahakkuk ettirilir.',
    ilgili:['nakit-esasi','donem-sonu'] },

  { anahtar:'nakit-esasi', ad:'Nakit esası', en:'Cash basis', konu:'genel-muhasebe',
    aciklama:'Gelir ve giderin yalnızca para el değiştirdiğinde kaydedilmesi. Kurumsal muhasebede istisnaidir.',
    ilgili:['tahakkuk-esasi'] },

  { anahtar:'bilanco', ad:'Bilanço', en:'Balance sheet', konu:'genel-muhasebe',
    aciklama:'Belirli bir andaki varlık, borç ve özkaynak durumunu gösteren tablo. Bakiyeleri yıl sonunda sıfırlanmaz, devreder.',
    ilgili:['gelir-tablosu','bakiye-devri'] },

  { anahtar:'gelir-tablosu', ad:'Gelir tablosu', en:'Profit and Loss (P&L)', konu:'genel-muhasebe',
    aciklama:'Bir dönemdeki gelir ve giderleri, sonuçta kâr/zararı gösteren tablo. Yıl sonunda bakiyeleri sıfırlanır, sonuç özkaynağa aktarılır.',
    ilgili:['bilanco','bakiye-devri'] },

  { anahtar:'mizan', ad:'Mizan', en:'Trial balance', konu:'genel-muhasebe',
    aciklama:'Tüm hesapların borç, alacak ve bakiye toplamlarını gösteren kontrol listesi. Borç toplamı = alacak toplamı olmalıdır.',
    ilgili:['muavin-defter','yevmiye'] },

  { anahtar:'yevmiye', ad:'Yevmiye defteri', en:'Journal', konu:'genel-muhasebe',
    aciklama:'İşlemlerin tarih sırasıyla, madde madde kaydedildiği defter. SAP’ta her FI belgesi bir yevmiye maddesidir.',
    ilgili:['muavin-defter','mizan'] },

  { anahtar:'muavin-defter', ad:'Muavin (yardımcı) defter', en:'Sub-ledger', konu:'genel-muhasebe',
    aciklama:'Müşteri, satıcı ve duran varlık gibi ayrıntının tutulduğu yardımcı defter. Toplamı ana muhasebedeki mutabakat hesabına yansır.',
    ilgili:['mutabakat-hesabi','ana-muhasebe'] },

  { anahtar:'ana-muhasebe', ad:'Ana muhasebe', en:'General Ledger (G/L)', konu:'gl-accounting',
    aciklama:'Mali tabloların üretildiği ana defter. Tüm muavin defterler buraya özet olarak yansır.',
    ilgili:['muavin-defter','mutabakat-hesabi'] },

  /* ================================================ SAP temel === */
  { anahtar:'sirket-kodu', ad:'Şirket kodu', en:'Company Code', konu:'org-yapisi',
    aciklama:'Bağımsız bilanço ve gelir tablosu çıkarılan en küçük yasal birim. FI’ın zorunlu organizasyon seviyesidir.',
    detay:'{{T001}} tablosunda tutulur, {{OX02}} ile tanımlanır.',
    ilgili:['hesap-plani','mali-yil-varyanti'] },

  { anahtar:'hesap-plani', ad:'Hesap planı', en:'Chart of Accounts', konu:'org-yapisi',
    aciklama:'Şirketin kullandığı ana muhasebe hesaplarının listesi. Bir hesap planı birden çok şirket kodu tarafından paylaşılabilir.',
    detay:'Operasyonel, ülke ve grup hesap planı olmak üzere üç tipi vardır.',
    ilgili:['sirket-kodu','hesap-grubu'] },

  { anahtar:'hesap-grubu', ad:'Hesap grubu', en:'Account Group', konu:'master-data',
    aciklama:'Benzer hesapları toplayan, numara aralığını ve hangi alanların zorunlu/opsiyonel/gizli olacağını belirleyen sınıflandırma.',
    detay:'{{OBD4}} ile tanımlanır, {{T077S}} tablosunda tutulur.',
    ilgili:['alan-durumu','hesap-plani'] },

  { anahtar:'mali-yil-varyanti', ad:'Mali yıl varyantı', en:'Fiscal Year Variant', konu:'org-yapisi',
    aciklama:'Mali yılın kaç normal ve kaç özel döneme bölündüğünü tanımlar (örn. 12 normal + 4 özel).',
    detay:'Özel dönemler yıl sonu düzeltmelerini Aralık kaydından ayırmak için kullanılır. {{OB29}} ile tanımlanır.',
    ilgili:['kayit-donemi','ozel-donem'] },

  { anahtar:'ozel-donem', ad:'Özel dönem', en:'Special Period', konu:'closing',
    aciklama:'Mali yılın son ayından sonra gelen, yalnızca kapanış düzeltmeleri için kullanılan ek dönemler (13–16).',
    ilgili:['mali-yil-varyanti','donem-sonu'] },

  { anahtar:'kayit-donemi', ad:'Kayıt dönemi', en:'Posting Period', konu:'closing',
    aciklama:'Belgenin hangi muhasebe dönemine düşeceğini belirleyen dönem. Kayıt tarihinden (`BUDAT`) türetilir.',
    detay:'{{OB52}} ile hesap tipi bazında açılıp kapatılır; {{T001B}} tablosunda tutulur.',
    ilgili:['ozel-donem','donem-sonu'] },

  { anahtar:'ana-veri', ad:'Ana veri', en:'Master Data', konu:'master-data',
    aciklama:'İşlemler arasında kalıcı olan, sık değişmeyen veri: hesap, satıcı, müşteri, varlık. Taşıma isteğiyle taşınmaz, her sistemde ayrı yüklenir.',
    ilgili:['hareket-verisi','ozellestirme'] },

  { anahtar:'hareket-verisi', ad:'Hareket verisi', en:'Transaction Data', konu:'document-posting',
    aciklama:'Tek bir olayı kaydeden, tarihli veri: faturalar, ödemeler, mal hareketleri.',
    ilgili:['ana-veri'] },

  { anahtar:'ozellestirme', ad:'Özelleştirme', en:'Customizing / Configuration', konu:'best-practices',
    aciklama:'Sistemin iş kurallarına uyarlanması. {{SPRO}} ağacından yapılır ve taşıma isteğiyle test/canlı sisteme taşınır.',
    ilgili:['tasima-istegi','img-yolu','ana-veri'] },

  { anahtar:'img-yolu', ad:'IMG yolu', en:'IMG Path', konu:'best-practices',
    aciklama:'Bir yapılandırma adımının {{SPRO}} ağacındaki tam konumu. Danışmanlık dokümanlarında adım bu yolla tarif edilir.',
    ilgili:['ozellestirme','tasima-istegi'] },

  { anahtar:'tasima-istegi', ad:'Taşıma isteği', en:'Transport Request', konu:'best-practices',
    aciklama:'Geliştirme sisteminde yapılan yapılandırma ve program değişikliklerini test ve canlı sisteme taşıyan paket.',
    detay:'Ana veri ve hareket verisi taşıma isteğine girmez — yalnızca özelleştirme ve geliştirme girer.',
    ilgili:['ozellestirme'] },

  /* ============================================ Belge mekaniği === */
  { anahtar:'belge-turu', ad:'Belge türü', en:'Document Type', konu:'document-posting',
    aciklama:'Belgenin ne tür bir işlem olduğunu söyleyen iki harfli kod (KR satıcı faturası, DZ müşteri tahsilatı, SA genel, RV SD faturası, AB genel).',
    detay:'Numara aralığını ve izin verilen hesap tiplerini belirler. {{OBA7}} ile tanımlanır, {{T003}} tablosunda tutulur.',
    ilgili:['numara-araligi','kayit-anahtari','hesap-tipi'] },

  { anahtar:'kayit-anahtari', ad:'Kayıt anahtarı', en:'Posting Key', konu:'document-posting',
    aciklama:'Satırın borç mu alacak mı olduğunu, hangi hesap tipine yazılacağını ve alan durumunu belirleyen iki haneli kod.',
    detay:'En bilinenler: 40 G/L borç, 50 G/L alacak, 31 satıcı alacak, 21 satıcı borç, 01 müşteri borç, 15 müşteri alacak.',
    ilgili:['belge-turu','hesap-tipi','alan-durumu'] },

  { anahtar:'hesap-tipi', ad:'Hesap tipi', en:'Account Type', konu:'document-posting',
    aciklama:'Kaydın hangi defteri etkilediğini gösteren tek harf: S ana muhasebe, D müşteri, K satıcı, A duran varlık, M malzeme.',
    ilgili:['kayit-anahtari','belge-turu'] },

  { anahtar:'numara-araligi', ad:'Numara aralığı', en:'Number Range', konu:'document-posting',
    aciklama:'Belge numaralarının hangi aralıktan verileceğini tanımlar. İç atamada sistem, dış atamada kullanıcı numarayı verir.',
    detay:'FI’da numara aralığı mali yıl bazlıdır; her yıl için ayrı satır gerekir. {{FBN1}} ile tanımlanır.',
    ilgili:['belge-turu'] },

  { anahtar:'alan-durumu', ad:'Alan durumu', en:'Field Status', konu:'document-posting',
    aciklama:'Kayıt ekranında bir alanın zorunlu, opsiyonel, gizli veya görüntülenebilir olacağını belirler.',
    detay:'İki kaynaktan gelir: hesabın alan durumu grubu ve kayıt anahtarının alan durumu. **En kısıtlayıcı olan kazanır.**',
    ilgili:['kayit-anahtari','hesap-grubu'] },

  { anahtar:'park-etme', ad:'Park etme (ön kayıt)', en:'Document Parking', konu:'document-parking',
    aciklama:'Belgeyi muhasebeleştirmeden saklama. Bakiye denk olmasa bile kaydedilebilir; hiçbir hesap etkilenmez.',
    detay:'Park edilmiş belge {{BKPF}}’ye yazılır ama bakiyelere girmez. Onay akışı ve dört-göz prensibi için kullanılır.',
    ilgili:['ters-kayit','belge-denkligi'] },

  { anahtar:'ters-kayit', ad:'Ters kayıt (iptal)', en:'Reversal', konu:'error-handling',
    aciklama:'Muhasebeleşmiş bir belgeyi silmek yerine, tersini kaydederek etkisini sıfırlama. Muhasebede kayıt silinmez.',
    detay:'{{FB08}} ile yapılır. İptal nedeni, ters kaydın hangi tarihe düşeceğini belirler.',
    ilgili:['park-etme','kayit-donemi'] },

  /* =========================================== Kapatma / açık kalem === */
  { anahtar:'acik-kalem', ad:'Açık kalem', en:'Open Item', konu:'clearing',
    aciklama:'Karşılığı henüz gelmemiş kalem: ödenmemiş fatura, tahsil edilmemiş alacak.',
    detay:'{{BSEG}}’de `AUGBL` alanı boşsa kalem açıktır.',
    ilgili:['kapatma','acik-kalem-yonetimi'] },

  { anahtar:'kapatma', ad:'Kapatma', en:'Clearing', konu:'clearing',
    aciklama:'Birbirini götüren açık kalemleri eşleştirip kapalı hale getirme. Fatura ile ödemenin buluşmasıdır.',
    detay:'Kapatma bir belge üretir ve kapatılan kalemlere `AUGBL` (kapatma belgesi) yazar. Kapatma toplamının sıfır olması gerekir.',
    ilgili:['acik-kalem','kismi-kapatma','kalan-kapatma'] },

  { anahtar:'acik-kalem-yonetimi', ad:'Açık kalem yönetimi', en:'Open Item Management', konu:'gl-accounting',
    aciklama:'Bir G/L hesabında kalemlerin açık/kapalı takip edilmesini sağlayan ana veri ayarı ({{SKB1}} `XOPVW`).',
    detay:'GR/IR, banka ara hesapları ve avans hesapları için açık olmalıdır; bakiye hesaplarında (banka ana hesabı) gerekmez.',
    ilgili:['kapatma','acik-kalem'] },

  { anahtar:'kismi-kapatma', ad:'Kısmi kapatma', en:'Partial Clearing', konu:'clearing',
    aciklama:'Borcun bir kısmı ödendiğinde orijinal kalem açık kalır, ödeme ayrı bir açık kalem olarak durur.',
    ilgili:['kalan-kapatma','kapatma'] },

  { anahtar:'kalan-kapatma', ad:'Kalan kapatma', en:'Residual Clearing', konu:'clearing',
    aciklama:'Kısmi ödemede orijinal kalem kapatılır ve kalan tutar için yeni bir açık kalem üretilir.',
    detay:'Vade orijinal faturadan değil, yeni kalemin tarihinden sayılır — yaşlandırmayı değiştirir, bu yüzden dikkatli seçilir.',
    ilgili:['kismi-kapatma','kapatma'] },

  { anahtar:'mutabakat-hesabi', ad:'Mutabakat hesabı', en:'Reconciliation Account', konu:'master-data',
    aciklama:'Muavin defterdeki (satıcı/müşteri/varlık) hareketlerin ana muhasebeye otomatik yansıdığı G/L hesabı.',
    detay:'Bu hesaba doğrudan kayıt yapılamaz — yalnızca muavin defter üzerinden yazılır. Ana veri ile muhasebe arasındaki bağdır.',
    ilgili:['muavin-defter','ana-muhasebe'] },

  { anahtar:'tolerans-grubu', ad:'Tolerans grubu', en:'Tolerance Group', konu:'clearing',
    aciklama:'Kullanıcının kaydedebileceği azami tutarı ve kapatmada kabul edilebilir fark sınırını belirler.',
    detay:'Fark sınırın içindeyse otomatik olarak kur farkı/iskonto hesabına atılır, dışındaysa kapatma engellenir.',
    ilgili:['kapatma'] },

  /* ============================================== AP / AR / ödeme === */
  { anahtar:'odeme-kosulu', ad:'Ödeme koşulu', en:'Payment Terms', konu:'accounts-payable',
    aciklama:'Vadeyi ve erken ödeme iskontosunu tanımlayan anahtar (örn. 30 gün net, 10 gün %2 iskonto).',
    detay:'Ana veriden gelir ama belgede değiştirilebilir; vade tarihi buradan hesaplanır.',
    ilgili:['vade','iskonto'] },

  { anahtar:'vade', ad:'Vade tarihi', en:'Due Date / Net Due Date', konu:'accounts-payable',
    aciklama:'Kalemin ödenmesi gereken tarih. Baz tarih (`ZFBDT`) + ödeme koşulundaki gün sayısı ile hesaplanır.',
    ilgili:['odeme-kosulu','yaslandirma'] },

  { anahtar:'iskonto', ad:'Erken ödeme iskontosu', en:'Cash Discount', konu:'accounts-payable',
    aciklama:'Vadeden önce ödeme yapıldığında kazanılan indirim. SAP iskonto süresini takip eder ve {{F110}} en kârlı ödeme gününü seçer.',
    ilgili:['odeme-kosulu','vade'] },

  { anahtar:'odeme-yontemi', ad:'Ödeme yöntemi', en:'Payment Method', konu:'f110',
    aciklama:'Ödemenin nasıl yapılacağını gösteren tek karakter (havale, çek, senet). Ülke ve şirket kodu seviyesinde ayrı tanımlanır.',
    detay:'{{FBZP}} ile tanımlanır; satıcı ana verisindeki `ZWELS` alanı hangi yöntemlerin kullanılabileceğini sınırlar.',
    ilgili:['odeme-blogu','ev-bankasi'] },

  { anahtar:'odeme-blogu', ad:'Ödeme bloğu', en:'Payment Block', konu:'accounts-payable',
    aciklama:'Bir kalemin veya satıcının ödenmesini engelleyen işaret. Uyuşmazlık ve onay bekleyen faturalarda kullanılır.',
    detay:'{{F110}} bloklu kalemi öneriye almaz.', ilgili:['odeme-yontemi'] },

  { anahtar:'ev-bankasi', ad:'Ev bankası', en:'House Bank', konu:'bank-accounting',
    aciklama:'Şirketin kendi hesabının bulunduğu banka. Her ev bankasının bir veya birden çok hesap kimliği (account ID) olur.',
    detay:'{{T012}} / {{T012K}} tablolarında tutulur; her hesap kimliği bir G/L hesabına bağlanır.',
    ilgili:['odeme-yontemi','banka-ara-hesabi'] },

  { anahtar:'banka-ara-hesabi', ad:'Banka ara hesabı', en:'Bank Clearing Account', konu:'bank-accounting',
    aciklama:'Ödeme kaydedildiği an ile paranın gerçekten bankadan çıktığı an arasındaki farkı taşıyan geçiş hesabı.',
    detay:'Ödeme ara hesaba yazılır, banka ekstresi geldiğinde ara hesap kapatılıp ana banka hesabı çalışır. Bakiyesi sürekli büyüyorsa mutabakat yapılmıyor demektir.',
    ilgili:['ev-bankasi','ekstre-eslestirme'] },

  { anahtar:'ekstre-eslestirme', ad:'Ekstre eşleştirme', en:'Bank Reconciliation', konu:'ebs',
    aciklama:'Banka ekstresindeki satırların sistemdeki kayıtlarla eşleştirilmesi.',
    ilgili:['banka-ara-hesabi'] },

  { anahtar:'yaslandirma', ad:'Yaşlandırma', en:'Aging', konu:'accounts-receivable',
    aciklama:'Açık kalemlerin vadesine göre gün aralıklarına (0–30, 31–60…) dağıtılması. Tahsilat ve borç yönetiminin temel raporu.',
    ilgili:['vade','ihtar'] },

  { anahtar:'ihtar', ad:'İhtar (temerrüt bildirimi)', en:'Dunning', konu:'dunning',
    aciklama:'Vadesi geçmiş alacaklar için müşteriye kademeli olarak gönderilen hatırlatma ve uyarı yazıları.',
    detay:'İhtar seviyesi arttıkça dil sertleşir, ücret ve gecikme faizi eklenebilir. {{F150}} ile çalıştırılır.',
    ilgili:['yaslandirma','ihtar-prosedürü'] },

  { anahtar:'ihtar-prosedürü', ad:'İhtar prosedürü', en:'Dunning Procedure', konu:'dunning',
    aciklama:'Kaç ihtar seviyesi olacağını, seviyeler arası gün sayısını ve gecikme toleransını tanımlayan yapılandırma.',
    detay:'{{FBMP}} ile tanımlanır, müşteri ana verisindeki `MAHNA` alanına atanır.',
    ilgili:['ihtar'] },

  { anahtar:'tahsilat', ad:'Tahsilat', en:'Incoming Payment / Collection', konu:'accounts-receivable',
    aciklama:'Müşteriden alacağın tahsil edilmesi. Gelir değildir — bir varlığın (alacak) başka bir varlığa (nakit) dönüşmesidir.',
    detay:'{{F-28}} ile kaydedilir ve aynı anda müşterinin açık kalemi kapatılır.',
    ilgili:['acik-kalem','kapatma','yaslandirma'] },

  { anahtar:'supheli-alacak', ad:'Şüpheli alacak', en:'Doubtful Receivable', konu:'accounts-receivable',
    aciklama:'Tahsil edilememe riski doğmuş alacak. Alacak silinmez; karşılık ayrılarak bilançoda net değere getirilir.',
    detay:'SAP’ta {{ozel-ana-muhasebe-gostergesi}} (genelde E) ile normal alacaktan ayrılır. Tahsil imkânsız hâle gelirse alacak tamamen silinir (write-off).',
    ilgili:['yaslandirma','ihtar','ozel-ana-muhasebe-gostergesi'] },

  { anahtar:'kredi-limiti', ad:'Kredi limiti', en:'Credit Limit', konu:'accounts-receivable',
    aciklama:'Bir müşteriye açılabilecek azami vadeli satış tutarı. Aşıldığında satış siparişi bloklanır.',
    detay:'ECC’de FD32 ile yönetilirdi; S/4HANA’da SAP Credit Management ({{UKM_BP}}) kullanılır.',
    ilgili:['yaslandirma','supheli-alacak'] },

  { anahtar:'ozel-ana-muhasebe-gostergesi', ad:'Özel ana muhasebe göstergesi', en:'Special G/L Indicator', konu:'special-gl',
    aciklama:'Bir satıcı/müşteri kalemini normal mutabakat hesabı yerine alternatif bir hesapta göstermeye yarayan tek karakter.',
    detay:'Avans (A), teminat, senet gibi işlemleri normal borç/alacaktan ayırır. Bilançoda ayrı kalemde raporlanmaları gerektiği için vardır.',
    ilgili:['avans','mutabakat-hesabi'] },

  { anahtar:'avans', ad:'Avans', en:'Down Payment', konu:'special-gl',
    aciklama:'Mal veya hizmet teslim edilmeden önce ödenen/alınan tutar. Gider veya gelir değildir; bilançoda alacak/borç olarak durur.',
    ilgili:['ozel-ana-muhasebe-gostergesi'] },

  /* ============================================== Duran varlık === */
  { anahtar:'hareket-turu', ad:'Hareket türü', en:'Transaction Type', konu:'asset-accounting',
    aciklama:'Duran varlık işleminin ne olduğunu söyleyen üç haneli kod: edinim, çıkış, transfer, değer düzeltme.',
    detay:'Hangi değer alanlarının etkileneceğini ve hangi hesapların çalışacağını belirler. En bilinenler: **100** edinim, **200** çıkış, **300** transfer, **640** hurdaya ayırma.',
    ilgili:['varlik-sinifi','aktiflestirme','amortisman'] },

  { anahtar:'valor-tarihi', ad:'Valör tarihi', en:'Value Date', konu:'bank-accounting',
    aciklama:'Paranın banka hesabında fiilen kullanılabilir hâle geldiği tarih. Kayıt tarihinden farklı olabilir.',
    detay:'Nakit yönetimi ve faiz hesabı bu tarihe bakar; muhasebe dönemi ise kayıt tarihine ({{kayit-donemi}}) bakar.',
    ilgili:['banka-ara-hesabi','ekstre-eslestirme'] },

  { anahtar:'degerleme-plani', ad:'Değerleme planı', en:'Chart of Depreciation', konu:'asset-accounting',
    aciklama:'Bir ülkedeki tüm {{amortisman-alani}} tanımlarını toplayan yapı. Her şirket kodu bir değerleme planına atanır.',
    detay:'Ülkeye özgüdür çünkü amortisman kuralları mevzuatla belirlenir. SAP her ülke için hazır bir şablon sunar ve kopyalanarak kullanılır.',
    ilgili:['amortisman-alani','varlik-sinifi'] },

  { anahtar:'amortisman', ad:'Amortisman', en:'Depreciation', konu:'asset-accounting',
    aciklama:'Duran varlığın maliyetinin faydalı ömrü boyunca giderleştirilmesi. Nakit çıkışı yaratmayan bir giderdir.',
    ilgili:['birikmis-amortisman','faydali-omur','amortisman-anahtari'] },

  { anahtar:'birikmis-amortisman', ad:'Birikmiş amortisman', en:'Accumulated Depreciation', konu:'asset-accounting',
    aciklama:'Varlık için bugüne kadar ayrılmış toplam amortisman. Bilançoda varlığı azaltan (kontra) hesapta durur.',
    detay:'Edinim değeri − birikmiş amortisman = net defter değeri.',
    ilgili:['amortisman','net-defter-degeri'] },

  { anahtar:'net-defter-degeri', ad:'Net defter değeri', en:'Net Book Value (NBV)', konu:'asset-accounting',
    aciklama:'Varlığın kayıtlardaki güncel değeri: edinim değerinden birikmiş amortismanın düşülmüş hâli.',
    ilgili:['birikmis-amortisman','amortisman'] },

  { anahtar:'faydali-omur', ad:'Faydalı ömür', en:'Useful Life', konu:'asset-accounting',
    aciklama:'Varlığın kaç yıl kullanılacağı varsayımı. Amortisman tutarını doğrudan belirler.',
    ilgili:['amortisman','amortisman-anahtari'] },

  { anahtar:'amortisman-anahtari', ad:'Amortisman anahtarı', en:'Depreciation Key', konu:'asset-accounting',
    aciklama:'Amortismanın **nasıl hesaplanacağını** belirleyen anahtar. Tek bir kod gibi görünür ama ' +
             'içinde **beş ayrı hesaplama yöntemi** taşır; her biri sorunun bir parçasını cevaplar.',
    detay:
      'Sisteme *"bu makineye amortisman ayır"* demek yetmez — **nasıl** ayıracağını bilmiyor. ' +
      'Bilmesi gereken **beş şey** var:\n\n' +
      '**1.** Hangi mantıkla? *(doğrusal / azalan bakiyeler)* → {{AFAMR}}\n' +
      '**2.** Azalansa ne kadar hızlı? *(çarpan, tavan)* → {{AFAMD}}\n' +
      '**3.** Oran zamanla değişecek mi? *(kademe)* → {{AFAMS}}\n' +
      '**4.** Ne zaman başlasın? *(yıl başı / edinim ayı)* → {{AFAMP}}\n' +
      '**5.** Tavan tutar var mı? → azami tutar yöntemi\n\n' +
      '**Amortisman anahtarı, bu beş cevabın bir koda bağlanmış hâlidir.** ' +
      'Varlığa `Z_GENEL` yazarsın; sistem beşini de bilir.\n\n' +
      '**Neden beş parça?** Somut örnekle: fabrika makinesi ile binek otomobil ' +
      '**aynı şeyi** ister — doğrusal, faydalı ömürden, ömür bitince dursun. ' +
      'Tek fark: otomobilde {{kist-amortisman}} gerektiği için amortisman ' +
      '**edinim ayından** başlamalı.\n\n' +
      'Yani iki anahtar beş slotun **dördünde aynı**, yalnızca 4 numaralı slot farklı. ' +
      'Parçalara bölünmüş olmasının faydası budur: ' +
      '**ortak kısımları paylaşıp yalnızca farklı olanı değiştirmek.**\n\n' +
      'Adım adım kurulum örneği (`Z_GENEL` / `Z_BINEK` karşılaştırması) ve ' +
      'VUK’a göre tüm amortisman yöntemleri {{konu:asset-accounting}} konusundadır.',
    ilgili:['amortisman','amortisman-alani','kist-amortisman','azalan-bakiyeler','faydali-omur'] },

  { anahtar:'kist-amortisman', ad:'Kıst amortisman', en:'Pro-rata (Partial-Year) Depreciation', konu:'asset-accounting',
    aciklama:'Varlığın işletmeye alındığı yıl için **tam yıl değil, kullanıldığı ay kadar** amortisman ayrılması. ' +
             'VUK’ta **kural değil istisnadır**: yalnızca binek otomobillerde uygulanır (VUK md. 320).',
    detay:
      '**En çok yanlış bilinen VUK kuralı budur.** Yaygın sanı, "yıl ortasında alınan varlığa ' +
      'oransal amortisman ayrılır" şeklindedir. **Yanlıştır.**\n\n' +
      '**Genel kural (VUK md. 320/1):** varlık yılın hangi ayında alınırsa alınsın, ' +
      'o yıl için **tam yıl** amortismanı ayrılır. 28 Aralık’ta alınan makineye ' +
      'o yılın tamamı için amortisman ayrılabilir.\n\n' +
      '**İstisna (VUK md. 320/2):** **binek otomobillerde** kıst uygulanır. ' +
      'Aracın işletmeye kaydedildiği hesap dönemi için, **ay kesri tam ay sayılarak** ' +
      'kalan ay süresi kadar amortisman ayrılır.\n\n' +
      '*Örnek:* 15 Nisan’da alınan binek otomobil → Nisan dahil **9 ay** → yıllık amortismanın 9/12’si.\n\n' +
      '**İlk yıl ayrılamayan kısım kaybolmaz:** {{faydali-omur}}’ün son yılında ' +
      'gider yazılarak tamamlanır.\n\n' +
      '**İstisnanın istisnası:** faaliyeti kısmen veya tamamen binek otomobil **kiralamak veya ' +
      'işletmek** olanlar (araç kiralama şirketleri, sürücü kursları) kıst uygulamaz — ' +
      'onlar için otomobil ticari maldır, tam yıl amortisman ayrılır.\n\n' +
      '**SAP karşılığı:** {{AFAMP}} ile tanımlanan **dönem kontrolü yöntemidir**. ' +
      'Genel varlıklar için "yıl başından itibaren" kuralı, binek otomobiller için ' +
      '"edinim ayından itibaren oransal" kuralı taşıyan **ayrı bir amortisman anahtarı** kullanılır.',
    ilgili:['amortisman-anahtari','amortisman','faydali-omur','donem-kontrolu'] },

  { anahtar:'azalan-bakiyeler', ad:'Azalan bakiyeler usulü', en:'Declining Balance Method', konu:'asset-accounting',
    aciklama:'Amortismanın **edinim değeri üzerinden değil, {{net-defter-degeri}} üzerinden** hesaplandığı ' +
             'hızlandırılmış yöntem. VUK mükerrer md. 315.',
    detay:
      '**Nasıl çalışır:** her yıl kalan net defter değerine sabit bir oran uygulanır. ' +
      'Taban küçüldüğü için amortisman tutarı da her yıl azalır — ilk yıllar yüksek, sonraki yıllar düşük.\n\n' +
      '**VUK kuralları:**\n\n' +
      '• Oran, normal amortisman oranının **iki katıdır** ve **%50’yi geçemez**.\n' +
      '• Yalnızca **bilanço esasına göre** defter tutan mükellefler uygulayabilir.\n' +
      '• **Son yılda** kalan net defter değerinin tamamı amortisman olarak ayrılır — ' +
      'aksi hâlde varlık hiçbir zaman sıfırlanmazdı (oran hep kalana uygulandığı için).\n' +
      '• **Azalan bakiyelerden normale geçilebilir**, ama **normalden azalana geçilemez**.\n\n' +
      '**Neden tercih edilir:** ilk yıllarda daha yüksek gider yazarak **vergi ertelemesi** sağlar. ' +
      'Nakit akışı avantajıdır — toplam gider değişmez, zamanlaması değişir.\n\n' +
      '**SAP’ta:** {{AFAMD}} ile çarpan ve tavan tanımlanır; ' +
      'normale geçiş {{AFAMS}} çok seviyeli yöntemiyle modellenir.',
    ilgili:['amortisman-anahtari','net-defter-degeri','amortisman'] },

  { anahtar:'yil-sayilari-toplami', ad:'Yıl sayıları toplamı yöntemi', en:'Sum-of-the-Years’-Digits (SYD)', konu:'asset-accounting',
    aciklama:'Amortismanın, kalan ömür yıllarının toplamına oranlanarak hesaplandığı hızlandırılmış yöntem.',
    detay:
      '**Formül:** `Yıllık amortisman = Amortismana tabi tutar × (Kalan ömür ÷ Yıl sayıları toplamı)`\n\n' +
      '5 yıllık bir varlıkta payda: 5+4+3+2+1 = **15**.\n\n' +
      '600.000 TL için: 5/15 → **200.000** · 4/15 → **160.000** · 3/15 → **120.000** · ' +
      '2/15 → **80.000** · 1/15 → **40.000**. Toplam **600.000 TL** ✓\n\n' +
      '**{{azalan-bakiyeler}}’den farkı:** azalan yöntemde taban her yıl küçülür ve varlık ' +
      'matematiksel olarak hiç sıfırlanmaz (son yıl özel kural gerekir). ' +
      'Burada ise **taban sabittir**, yalnızca oran değişir — varlık kendiliğinden tam itfa olur.\n\n' +
      '⚠️ **VUK’ta bu yöntem yoktur.** Türkiye’de yalnızca IFRS raporlaması için, ' +
      '{{paralel-defter}} yapısında ayrı bir {{amortisman-alani}}’nda kullanılabilir.',
    ilgili:['amortisman','azalan-bakiyeler','amortisman-anahtari','paralel-defter'] },

  { anahtar:'uretim-miktari-yontemi', ad:'Üretim miktarı esaslı amortisman', en:'Units of Production', konu:'asset-accounting',
    aciklama:'Amortismanın zamana değil, varlığın **fiilen ürettiği miktara** göre hesaplandığı yöntem.',
    detay:
      '**Formül:** `Birim amortisman = Amortismana tabi tutar ÷ Toplam tahmini üretim`\n\n' +
      'Sonra her dönem: `Dönem amortismanı = Birim amortisman × O dönemin üretimi`\n\n' +
      '600.000 TL’lik pres, ömrü boyunca 300.000 adet basacak → birim amortisman **2 TL/adet**. ' +
      'Yılda 80.000 adet basıldıysa o yılın amortismanı **160.000 TL**.\n\n' +
      '**Neden mantıklı:** bir kalıp veya pres, durduğu sürece yıpranmaz. ' +
      'Zamana bağlı yöntemler bu varlıklarda gerçeği yansıtmaz — ' +
      'üretim durduğu ay amortisman ayırmak yanıltıcıdır.\n\n' +
      '**Zorluğu:** her dönem **fiili üretim miktarının sisteme girilmesi** gerekir. ' +
      'SAP’ta varlık ana verisine toplam tahmini miktar tanımlanır, ' +
      'dönem miktarları ayrıca kaydedilir.\n\n' +
      '⚠️ **VUK’ta genel yöntem olarak yer almaz** (madenlerde md. 316 benzer bir mantık taşır). ' +
      'IFRS’te kabul edilir; Türkiye’de IFRS alanında kullanılır.',
    ilgili:['amortisman','amortisman-anahtari','paralel-defter'] },

  { anahtar:'kalinti-deger', ad:'Kalıntı değer (hurda değeri)', en:'Residual / Salvage Value', konu:'asset-accounting',
    aciklama:'Varlığın faydalı ömrü sonunda beklenen elden çıkarma değeri. ' +
             'Amortismana tabi tutardan **düşülür**.',
    detay:
      '**Formül:** `Amortismana tabi tutar = Edinim değeri − Kalıntı değer`\n\n' +
      '600.000 TL’lik araç, 5 yıl sonra 100.000 TL’ye satılabilecekse: ' +
      'amortismana tabi tutar 500.000 TL → yıllık **100.000 TL**.\n\n' +
      '5 yıl sonra {{net-defter-degeri}} sıfır değil, **100.000 TL** olur. ' +
      'Varlık defterde bu değerle durmaya devam eder.\n\n' +
      '**Kritik ayrım:**\n\n' +
      '**VUK:** kalıntı değer uygulaması **yoktur**; varlık **tam olarak itfa edilir** ' +
      've net defter değeri sıfırlanır.\n\n' +
      '**IFRS (IAS 16):** kalıntı değer **dikkate alınır** ve her dönem **gözden geçirilir**; ' +
      'değişirse ileriye dönük düzeltilir.\n\n' +
      'Bu fark, Türkiye’de {{paralel-defter}} kullanılmasının somut sebeplerinden biridir: ' +
      'aynı varlık vergi alanında sıfırlanırken IFRS alanında 100.000 TL ile durur.',
    ilgili:['net-defter-degeri','amortisman','ifrs','paralel-defter'] },

  { anahtar:'donem-kontrolu', ad:'Dönem kontrolü yöntemi', en:'Period Control Method', konu:'asset-accounting',
    aciklama:'Amortismanın **hangi dönemde başlayıp biteceğini** belirleyen kural kümesi; ' +
             '{{amortisman-anahtari}}’nın parçasıdır ({{AFAMP}}).',
    detay:
      'Dört olay için **ayrı ayrı** kural tanımlanır: **edinim**, **sonraki ilave**, ' +
      '**çıkış** ve **transfer**.\n\n' +
      'Standart teslimatta gelen yaygın kurallar:\n\n' +
      '`01` dönem başından itibaren oransal · `02` dönem ortasına kadar oransal · ' +
      '`03` dönem ortasından itibaren · `06` **yıl başından itibaren** (tam yıl) · ' +
      '`07` yıl ortasından itibaren · `08` ertesi yıl başından itibaren · ' +
      '`11` **ertesi aydan itibaren**.\n\n' +
      '**Türkiye uygulaması için kritik ayrım:** genel varlıklarda VUK tam yıl amortismana izin ' +
      'verdiği için "yıl başından itibaren" mantığındaki kural kullanılır; ' +
      'binek otomobillerde ise {{kist-amortisman}} gereği **edinim ayından itibaren oransal** ' +
      'kural taşıyan ayrı bir anahtar gerekir.',
    ilgili:['amortisman-anahtari','kist-amortisman'] },

  { anahtar:'fevkalade-amortisman', ad:'Fevkalade amortisman', en:'Extraordinary Depreciation', konu:'asset-accounting',
    aciklama:'Olağandışı değer kaybı hâllerinde, normal oranın üzerinde amortisman ayrılması. VUK md. 317.',
    detay:
      '**Üç hâlde uygulanır:**\n\n' +
      '**1.** Yangın, deprem, su basması gibi **afetler** sonucu değerini kısmen/tamamen kaybetmek.\n' +
      '**2.** **Yeni icatlar** dolayısıyla teknik verimin ve kıymetin düşmesi (teknolojik eskime).\n' +
      '**3.** Cebri çalışmaya tabi tutulduğu için **normalden fazla aşınma ve yıpranma**.\n\n' +
      '**Önemli:** oran serbest değildir — Maliye Bakanlığınca **her işletme için ayrı ayrı** ' +
      'belirlenir ve **başvuru gerektirir**. Kendiliğinden uygulanamaz.\n\n' +
      '**SAP’ta:** normal amortismandan ayrı bir **özel amortisman** tipi olarak kaydedilir; ' +
      '{{ABMA}} ile elle girilir veya ayrı bir {{amortisman-anahtari}} ile yönetilir.',
    ilgili:['amortisman','amortisman-anahtari'] },

  { anahtar:'ozel-maliyet-bedeli', ad:'Özel maliyet bedeli', en:'Leasehold Improvements', konu:'asset-accounting',
    aciklama:'Kiralanan bir gayrimenkule yapılan ve **kiracıya ait olmayan** iyileştirme harcamaları. VUK md. 327.',
    detay:
      'Kiralanan dükkâna yapılan dekorasyon, asma tavan, klima tesisatı gibi harcamalar ' +
      'kiracının mülkü olmaz ama fayda sağlar.\n\n' +
      '**İtfa kuralı:** **kira süresine göre eşit yüzdelerle** itfa edilir — ' +
      'varlığın kendi faydalı ömrüne göre değil.\n\n' +
      '• Kira süresi 5 yılsa → 5 yılda itfa.\n' +
      '• **Kira süresi belli değilse → 5 yıl** kabul edilir.\n' +
      '• Kira süresi dolmadan işyeri boşaltılırsa, **itfa edilmemiş kısım o yıl gider** yazılır.\n\n' +
      '**SAP’ta:** ayrı bir {{varlik-sinifi}} açılır (264 Özel maliyetler) ve ' +
      'kira süresine eşit {{faydali-omur}} verilir.',
    ilgili:['amortisman','varlik-sinifi','faydali-omur'] },

  { anahtar:'yenileme-fonu', ad:'Yenileme fonu', en:'Renewal Fund', konu:'asset-accounting',
    aciklama:'Satılan bir duran varlığın **yenilenmesi amacıyla** kârın vergilendirilmesinin ertelenmesi. VUK md. 328–329.',
    detay:
      'Bir makine satıldığında oluşan kâr normalde o yıl vergilendirilir. ' +
      'Ama yerine yenisi alınacaksa, kâr **pasifte geçici bir hesapta** (549 Özel fonlar) tutulabilir.\n\n' +
      '**Kurallar:**\n\n' +
      '• Yenileme **zorunlu** ya da işletmece **karar verilmiş ve teşebbüse geçilmiş** olmalıdır.\n' +
      '• Fon en fazla **üç yıl** pasifte tutulur.\n' +
      '• Yeni varlık alınınca fon, onun **amortismanlarına mahsup edilir**.\n' +
      '• Üç yıl içinde kullanılmazsa **üçüncü yılın matrahına eklenir**.\n\n' +
      '**Etkisi:** vergi ertelemesidir, vergi indirimi değil. Nakit akışı avantajı sağlar.\n\n' +
      '**SAP’ta:** standart bir AA fonksiyonu **değildir**; çıkış kaydı sonrası ' +
      'elle G/L kaydıyla ({{FB50}}) fona alınır ve yeni varlığın amortismanıyla mahsup izlenir.',
    ilgili:['amortisman','net-defter-degeri'] },

  { anahtar:'amortisman-alani', ad:'Amortisman alanı', en:'Depreciation Area', konu:'asset-accounting',
    aciklama:'Aynı varlığın **bir değerleme açısı**. Tek varlık kaydı içinde, her açı için ' +
             'ayrı {{amortisman-anahtari}} ve ayrı {{faydali-omur}} tutulur.',
    detay:
      '**Neden var:** aynı makine için üç farklı rakam gerekebilir.\n\n' +
      '2.400.000 TL’lik dokuma makinesi:\n' +
      '• Ticari muhasebe 10 yıl der → yıllık **240.000 TL**\n' +
      '• Vergi mevzuatı 8 yıl der → yıllık **300.000 TL**\n' +
      '• IFRS bileşen bazlı der → motor 6 yıl, gövde 15 yıl\n\n' +
      'Üçü de doğru. Üç ayrı varlık açmak envanteri bozardı.\n\n' +
      '**Çözüm:** tek varlık, üç alan. `01` ticari · `15` vergi · `32` IFRS. ' +
      '{{AFAB}} çalıştığında **üçünü birden** hesaplar.\n\n' +
      '**{{defter}} ile farkı:** alan yalnızca duran varlığın içinde yaşar ve ' +
      '*"bu varlık nasıl değerlenecek?"* sorusunu cevaplar. ' +
      'Defter ise tüm FI’ı kapsar ve *"kayıt hangi muhasebeye yazılacak?"* sorusunu cevaplar. ' +
      'Her alan bir deftere **bağlanır** ({{OADB}}): alan 01 → defter 0L, alan 32 → defter 2L.\n\n' +
      '⚠️ **En sık hata:** {{AW01N}}’de hangi alanda olduğuna bakmadan değer yorumlamak. ' +
      'Alan 01’de 240.000, alan 15’te 300.000 görünür — ikisi de doğrudur.',
    ilgili:['amortisman-anahtari','paralel-defter'] },

  { anahtar:'varlik-sinifi', ad:'Varlık sınıfı', en:'Asset Class', konu:'asset-accounting',
    aciklama:'Benzer varlıkları gruplayan ve hesap belirlemeyi, numara aralığını, varsayılan amortisman ayarlarını getiren sınıflandırma.',
    detay:'{{OAOA}} ile tanımlanır; hesap belirleme {{AO90}} ile bağlanır.',
    ilgili:['hesap-belirleme','yatirim-devam'] },

  { anahtar:'yatirim-devam', ad:'Yapılmakta olan yatırım', en:'Asset under Construction (AuC)', konu:'asset-accounting',
    aciklama:'Henüz kullanıma hazır olmadığı için **amortismana tabi tutulmayan**, maliyetleri ' +
             '**258 Yapılmakta Olan Yatırımlar** hesabında biriken geçici varlık. ' +
             'Tamamlandığında {{AIAB}} + {{AIBU}} ile gerçek varlığa (252 Binalar, 253 Tesis Makine) aktarılır.',
    detay:
      '**Neden gerekli?**\n\n' +
      'Bir fabrika binası 18 ayda biter ve bu sürede onlarca fatura gelir: hafriyat, beton, ' +
      'çelik, elektrik tesisatı, işçilik, mühendislik. Bu harcamalar **ne gider ne de ' +
      'kullanıma hazır bir varlıktır** — üçüncü bir yere ihtiyaç vardır. AuC o yerdir.\n\n' +
      '**Üç temel fayda:**\n\n' +
      '**1. Doğru dönemsellik.** Harcamalar gider yazılsaydı inşaat yıllarının kârı ' +
      'olduğundan düşük, kullanım yıllarının kârı olduğundan yüksek görünürdü. ' +
      'AuC maliyeti bekletir; amortisman **fayda sağlanmaya başladığı anda** başlar.\n\n' +
      '**2. Maliyet toplama.** Farklı kaynaklardan (satıcı faturası, malzeme çıkışı, ' +
      'iç işçilik, {{ic-siparis}}) gelen maliyetler tek bir nesnede birikir ve ' +
      '"bu yatırıma toplam ne harcadık?" sorusu her an cevaplanabilir.\n\n' +
      '**3. Amortismanın yanlış başlamasını önleme.** Varlık {{AS01}} ile normal sınıfta ' +
      'açılsaydı {{AFAB}} ona amortisman ayırmaya başlardı — henüz kullanılmayan bir bina için. ' +
      'AuC varlık sınıfı, amortisman anahtarını **0000** (amortisman yok) olarak getirir.\n\n' +
      '**Çalışan hesaplar:**\n\n' +
      '`258` Yapılmakta olan yatırımlar (borç — maliyetler birikir) · ' +
      '`320` Satıcılar veya `191` KDV (karşı taraf) · ' +
      'aktifleştirmede `252/253` borç, `258` alacak · ' +
      'yatırım avansı verilmişse `259` Verilen avanslar.\n\n' +
      '**İki AuC türü vardır:** *özet yerleşim* (tüm maliyet tek hedefe gider) ve ' +
      '*kalem bazlı yerleşim* (maliyetler farklı varlıklara bölünebilir). ' +
      'Ayrıntısı ve senaryosu {{konu:asset-accounting}} konusundadır.',
    ilgili:['varlik-sinifi','aktiflestirme','ic-siparis','amortisman','hareket-turu'] },

  { anahtar:'aktiflestirme', ad:'Aktifleştirme', en:'Capitalization', konu:'asset-accounting',
    aciklama:'Bir harcamanın gider yerine varlık olarak kaydedilmesi. Aktifleştirme tarihi amortismanın başlangıcını belirler.',
    ilgili:['amortisman','yatirim-devam'] },

  /* ================================================= Entegrasyon === */
  { anahtar:'hesap-belirleme', ad:'Otomatik hesap belirleme', en:'Automatic Account Determination', konu:'mm-integration',
    aciklama:'MM ve SD gibi modüllerden gelen hareketlerin hangi G/L hesabına yazılacağının kural tablosuyla belirlenmesi.',
    detay:'MM tarafında {{OBYC}}, SD tarafında {{VKOA}}, vergi tarafında {{OB40}}. Hepsi {{T030}} tablosuna yazar.',
    ilgili:['degerleme-sinifi','gr-ir'] },

  { anahtar:'degerleme-sinifi', ad:'Değerleme sınıfı', en:'Valuation Class', konu:'mm-integration',
    aciklama:'Malzemeyi muhasebe açısından gruplayan anahtar. Aynı hareket, farklı değerleme sınıfında farklı stok hesabına gider.',
    ilgili:['hesap-belirleme'] },

  { anahtar:'gr-ir', ad:'GR/IR hesabı', en:'GR/IR Clearing Account', konu:'mm-integration',
    aciklama:'Mal girişi ile fatura girişi arasındaki zaman farkını taşıyan geçiş hesabı.',
    detay:'Mal geldi fatura gelmediyse alacak, fatura geldi mal gelmediyse borç bakiye verir. Dönem sonunda {{F.19}} ile analiz edilir.',
    ilgili:['hesap-belirleme','uc-yonlu-eslestirme'] },

  { anahtar:'uc-yonlu-eslestirme', ad:'Üç yönlü eşleştirme', en:'Three-way Match', konu:'mm-integration',
    aciklama:'Satınalma siparişi, mal girişi ve satıcı faturasının miktar ve fiyat açısından karşılaştırılması.',
    detay:'Uyuşmazlık varsa fatura ödemeye bloklanır ({{MRBR}} ile serbest bırakılır).',
    ilgili:['gr-ir'] },

  { anahtar:'maliyet-yeri', ad:'Maliyet yeri', en:'Cost Center', konu:'cost-center',
    aciklama:'Masrafın hangi sorumluluk biriminde oluştuğunu gösteren CO nesnesi (satış, üretim, bilgi işlem).',
    detay:'Gider hesabına kayıt yapıldığında CO nesnesi istenir; girilmezse {{OKB9}} varsayılanı devreye girer.',
    ilgili:['kar-merkezi','masraf-turu'] },

  { anahtar:'kar-merkezi', ad:'Kâr merkezi', en:'Profit Center', konu:'new-gl',
    aciklama:'Gelir ve giderin birlikte izlendiği, iç kârlılık ölçümü yapılan birim.',
    detay:'Yeni Ana Muhasebe’de belge bölme (document splitting) sayesinde kâr merkezi bazında bilanço çıkarılabilir.',
    ilgili:['maliyet-yeri','belge-bolme'] },

  { anahtar:'masraf-turu', ad:'Masraf türü', en:'Cost Element', konu:'co-integration',
    aciklama:'FI gider/gelir hesabının CO’daki karşılığı. Birincil masraf türü FI hesabına birebir bağlıdır.',
    detay:'S/4HANA’da ayrı bir ana veri değildir: G/L hesabı {{FS00}}’da "Primary Costs / Revenue" tipiyle açılınca masraf türü olur.',
    ilgili:['maliyet-yeri'] },

  /* ============================================ Yeni G/L ve S/4 === */
  { anahtar:'defter', ad:'Defter', en:'Ledger', konu:'parallel-ledger',
    aciklama:'Aynı işlemin farklı muhasebe standartlarına göre kaydedildiği paralel değer kümesi.',
    detay:'Lider defter (0L) zorunludur ve CO ile entegredir; ek defterler IFRS, vergi veya yerel mevzuat için açılır.',
    ilgili:['paralel-defter','evrensel-kayit-defteri'] },

  { anahtar:'paralel-defter', ad:'Paralel defter', en:'Parallel Ledger', konu:'parallel-ledger',
    aciklama:'Birden çok muhasebe standardına aynı anda uyum sağlamak için kullanılan ek defterler.',
    ilgili:['defter','amortisman-alani'] },

  { anahtar:'belge-bolme', ad:'Belge bölme', en:'Document Splitting', konu:'new-gl',
    aciklama:'Bir belgedeki satıcı/vergi gibi ortak satırların, gider satırlarının kâr merkezi/bölüm dağılımına göre otomatik bölünmesi.',
    detay:'Amaç: kâr merkezi ve bölüm seviyesinde denk (bilanço çıkarılabilir) veri üretmek.',
    ilgili:['kar-merkezi','evrensel-kayit-defteri'] },

  { anahtar:'evrensel-kayit-defteri', ad:'Evrensel Kayıt Defteri', en:'Universal Journal', konu:'s4-yenilikleri',
    aciklama:'S/4HANA’da FI, CO, AA ve ML verisinin tek tabloda ({{ACDOCA}}) birleştirilmesi.',
    detay:'Mutabakat gerektiren ayrı toplam tabloları ortadan kalkar; FI–CO uyumsuzluğu yapısal olarak imkânsız hâle gelir.',
    ilgili:['defter','uyumluluk-view'] },

  { anahtar:'uyumluluk-view', ad:'Uyumluluk view’i', en:'Compatibility View', konu:'s4-yenilikleri',
    aciklama:'S/4HANA’da kaldırılan tabloların adını taşıyan, veriyi {{ACDOCA}}’dan üreten salt-okunur görünümler.',
    detay:'Eski programlar çalışmaya devam eder ama bu view’lere INSERT/UPDATE yapılamaz.',
    ilgili:['evrensel-kayit-defteri'] },

  /* ============================================== Dönem sonu === */
  { anahtar:'tahakkuk', ad:'Tahakkuk', en:'Accrual', konu:'closing',
    aciklama:'Doğmuş ama henüz belgesi gelmemiş gelir veya giderin döneme kaydedilmesi.',
    detay:'Aralıkta kullanılan ama faturası Ocakta gelen elektrik gideri Aralığa tahakkuk ettirilir. ' +
          '{{FBS1}} ile girilir ve {{F.81}} ile sonraki dönemde **otomatik ters kaydedilir** — gerçek fatura gelince çift kayıt olmaz.',
    ilgili:['tahakkuk-esasi','karsilik','donem-sonu'] },

  { anahtar:'karsilik', ad:'Karşılık', en:'Provision', konu:'closing',
    aciklama:'Gerçekleşmesi muhtemel bir gider veya kayıp için ayrılan tutar. Tutarı veya zamanı kesin değildir.',
    detay:'{{supheli-alacak}} karşılığı, kıdem tazminatı karşılığı, garanti gideri karşılığı. ' +
          'Tahakkuktan farkı: tahakkukta tutar bellidir, karşılıkta tahmin edilir.',
    ilgili:['tahakkuk','supheli-alacak','donem-sonu'] },

  { anahtar:'parasal-kalem', ad:'Parasal kalem', en:'Monetary Item', konu:'foreign-currency',
    aciklama:'Sabit veya belirlenebilir **tutarda para** olarak alınacak/ödenecek kalemler. ' +
             '**Yalnızca bunlar kur değerlemesine tabidir.**',
    detay:
      '**Parasal kalemler (değerlenir):**\n\n' +
      '`102` dövizli banka · `320` satıcılar · `120` alıcılar · `300/400` krediler · ' +
      '`121/321` senetler\n\n' +
      'Ortak özellik: karşılığında **belirli bir tutarda para** alınacak veya ödenecek. ' +
      'Kur değişince yerel para karşılığı değişir → kur farkı doğar.\n\n' +
      '**Parasal olmayan kalemler (değerlenmez):**\n\n' +
      '`153` stoklar · `253` duran varlıklar · `159` verilen avanslar · `340` alınan avanslar\n\n' +
      'Ortak özellik: karşılığında **mal veya hizmet** alınacak/verilecek, para değil. ' +
      'Bunlar **işlem günündeki kurla** kayda alınır ve o değerde kalır.\n\n' +
      '**Avanslar en sık yapılan hatadır.** Satıcıya 50.000 EUR avans verildiğinde ' +
      'karşılığında para değil **mal** alınacaktır — bu yüzden parasal değildir ve ' +
      'dönem sonunda **değerlenmez**. Değerlenirse gerçekte var olmayan bir kur farkı yaratılır.\n\n' +
      'SAP’ta bu ayrım hesap bazında yönetilir: değerlemeye tabi hesaplar ' +
      '{{F.05}} seçim ekranında ve {{OBA1}} yapılandırmasında belirlenir. ' +
      'Avans hesapları listeye **dâhil edilmemelidir**.',
    ilgili:['kur-farki','degerleme','avans'] },

  { anahtar:'kur-farki-faturasi', ad:'Kur farkı faturası', en:'FX Difference Invoice (Turkey)', konu:'foreign-currency',
    aciklama:'Dövize endeksli veya döviz cinsi satışlarda, **ödeme anında lehte oluşan kur farkı** için ' +
             'düzenlenen ve **KDV hesaplanan** fatura. Türkiye’ye özgü bir yükümlülüktür.',
    detay:
      '**Mantığı:** KDV matrahı, işlemin gerçek bedelidir. Döviz cinsi bir satışta ' +
      'tahsilat tarihinde kur yükselmişse, satıcı **daha fazla TL** tahsil etmiştir. ' +
      'Bu ek tutar da bedelin parçasıdır ve **KDV’ye tabidir**.\n\n' +
      '**Kim düzenler:** lehine kur farkı oluşan taraf.\n\n' +
      '• Kur **yükseldi** → satıcı lehine → **satıcı** kur farkı faturası düzenler\n' +
      '• Kur **düştü** → alıcı lehine → **alıcı** düzenler\n\n' +
      '**KDV oranı:** asıl işleme uygulanan oranla aynıdır.\n\n' +
      '**Muhasebe kaydından farkı — kritik ayrım:**\n\n' +
      'Muhasebede kur farkı zaten `646`/`656` hesabına kaydedilir. ' +
      'Kur farkı faturası **buna ek bir belge yükümlülüğüdür** ve asıl amacı ' +
      '**KDV’yi doğru hesaplamaktır**.\n\n' +
      'SAP kur farkını otomatik kaydeder ama **kur farkı faturasını üretmez** — ' +
      'bu, ayrı takip edilmesi gereken bir süreçtir. ' +
      'Sık atlanır ve KDV incelemesinde eleştiri konusu olur.\n\n' +
      '*Not: uygulama esasları KDV Genel Uygulama Tebliği ile belirlenir; ' +
      'güncel düzenleme mali müşavire teyit ettirilmelidir.*',
    ilgili:['kur-farki','vergi-kodu','matrah'] },

  { anahtar:'kur-tipi', ad:'Kur tipi', en:'Exchange Rate Type', konu:'foreign-currency',
    aciklama:'Hangi kurun kullanılacağını belirleyen anahtar: **M** ortalama (standart), **B** alış, **G** satış.',
    detay:'{{TCURR}} tablosunda kur tipi + para birimi çifti + tarih üçlüsüyle saklanır. ' +
          'Değerleme yöntemi ({{OB59}}) hangi kur tipini kullanacağını belirtir.',
    ilgili:['kur-farki','degerleme','paralel-para-birimi'] },

  { anahtar:'paralel-para-birimi', ad:'Paralel para birimi', en:'Parallel Currency', konu:'foreign-currency',
    aciklama:'Bir belgenin aynı anda birden çok para biriminde saklanması: şirket kodu para birimi, grup para birimi, sabit para birimi.',
    detay:'{{BSEG}}’de `DMBTR` (yerel), `DMBE2`, `DMBE3` alanlarında tutulur. ' +
          'S/4HANA’da {{ACDOCA}} **10’a kadar** paralel para birimi destekler (ECC’de 3 idi).',
    ilgili:['kur-tipi','kur-farki','evrensel-kayit-defteri'] },

  { anahtar:'fiyat-kontrolu', ad:'Fiyat kontrolü', en:'Price Control', konu:'mm-integration',
    aciklama:'Malzemenin stokta hangi fiyatla değerleneceğini belirler: **S** standart fiyat (sabit), **V** hareketli ortalama (değişken).',
    detay:'Fatura fiyatı sipariş fiyatından farklıysa: **S** ise fark {{OBYC}} → PRD fiyat farkı hesabına gider; ' +
          '**V** ise fark stok değerine eklenir ve ortalama fiyat güncellenir. ' +
          'Bu, MM–FI entegrasyonundaki en önemli ayrımlardan biridir.',
    ilgili:['degerleme-sinifi','gr-ir','hesap-belirleme'] },

  { anahtar:'malzeme-hareket-turu', ad:'Malzeme hareket türü', en:'Movement Type', konu:'mm-integration',
    aciklama:'Mal hareketinin ne olduğunu söyleyen üç haneli kod; hangi hesapların çalışacağını belirler.',
    detay:'En bilinenler: **101** siparişe mal girişi, **102** mal girişi iptali, **201** maliyet yerine tüketim, ' +
          '**261** üretim siparişine tüketim, **301** depolar arası transfer, **601** satış teslimatı (mal çıkışı). ' +
          '{{OBYC}} hesap belirlemesi hareket türünün işlem anahtarına (BSX, WRX, GBB) bakar.',
    ilgili:['hesap-belirleme','degerleme-sinifi','gr-ir'] },

  { anahtar:'donem-sonu', ad:'Dönem sonu', en:'Period-End Closing', konu:'closing',
    aciklama:'Dönemin mali tablolarını üretmeden önce yapılan düzeltme, değerleme ve mutabakat işlemlerinin tamamı.',
    ilgili:['bakiye-devri','kur-farki','kayit-donemi'] },

  { anahtar:'bakiye-devri', ad:'Bakiye devri', en:'Balance Carryforward', konu:'closing',
    aciklama:'Yıl sonunda bilanço hesaplarının bakiyesinin yeni yıla, gelir-gider hesaplarının sonucunun ise özkaynak hesabına aktarılması.',
    detay:'{{FAGLGVTR}} ile yapılır; tekrar çalıştırılabilir bir işlemdir.',
    ilgili:['donem-sonu','bilanco'] },

  { anahtar:'kur-farki', ad:'Kur farkı', en:'Exchange Rate Difference', konu:'foreign-currency',
    aciklama:'Döviz cinsi bir kalemin kaydedildiği kur ile değerleme/ödeme kuru arasındaki fark. ' +
             'Gelir tablosunda **646 Kambiyo kârları** veya **656 Kambiyo zararları** hesabında izlenir.',
    detay:
      '**İki tür kur farkı vardır ve muhasebe sonuçları farklıdır:**\n\n' +
      '**Gerçekleşmemiş (değerleme farkı)** — kalem henüz kapanmadı, yalnızca dönem sonu kuruyla ' +
      'yeniden ölçüldü. {{F.05}} üretir ve **ertesi gün ters kaydedilir**. ' +
      'Sebep: gerçek fark ödeme günündeki kura göre oluşacak; değerleme yalnızca ' +
      'bilanço tarihindeki durumu gösteren geçici bir fotoğraftır.\n\n' +
      '**Gerçekleşmiş** — ödeme/tahsilat yapıldı, fark **kesinleşti**. Kalıcı kayıttır, ters kaydedilmez.\n\n' +
      '**Çalışan hesaplar (TDHP):**\n\n' +
      '`646` Kambiyo kârları — kur lehte hareket ettiğinde\n' +
      '`656` Kambiyo zararları — kur aleyhte hareket ettiğinde\n' +
      '`102/320/120` — döviz tutarı **hiç değişmez**, yalnızca yerel para karşılığı değişir\n\n' +
      'Çoğu kurulum gerçekleşmiş ve gerçekleşmemiş farkı **ayrı alt hesaplarda** izler ' +
      '(646.01 / 646.02 gibi) — çünkü gerçekleşmemiş fark vergi matrahına farklı girer.\n\n' +
      '**Hangi kalemler değerlenir?** Yalnızca {{parasal-kalem}}ler. ' +
      'Verilen avans, stok ve duran varlık gibi parasal olmayan kalemler ' +
      'alındıkları günün kuruyla kalır — değerlenmez.\n\n' +
      '**Türkiye’ye özgü:** ödeme anında lehte oluşan fark için ' +
      '{{kur-farki-faturasi}} düzenlenir ve **KDV hesaplanır**. ' +
      'Bu, muhasebe kaydından ayrı bir yükümlülüktür ve sık atlanır.\n\n' +
      'SAP tarafında hesaplar {{OBA1}} ile **KDF** (açık kalem değerleme) ve ' +
      '**KDB** (bakiye değerleme) anahtarlarına bağlanır.',
    ilgili:['degerleme','donem-sonu'] },

  { anahtar:'degerleme', ad:'Değerleme', en:'Valuation', konu:'foreign-currency',
    aciklama:'Bakiye ve açık kalemlerin dönem sonu kuruyla/değeriyle yeniden ölçülmesi.',
    ilgili:['kur-farki','donem-sonu'] },

  { anahtar:'mali-tablo-yapisi', ad:'Mali tablo yapısı', en:'Financial Statement Version (FSV)', konu:'reporting',
    aciklama:'Hangi hesabın bilanço/gelir tablosunun hangi satırında raporlanacağını belirleyen hiyerarşi.',
    detay:'{{OB58}} ile tanımlanır, {{F.01}} bu yapıyı kullanır.',
    ilgili:['bilanco','gelir-tablosu'] },

  { anahtar:'vergi-kodu', ad:'Vergi kodu', en:'Tax Code', konu:'taxes',
    aciklama:'İşlemin vergi oranını ve hangi vergi hesabına gideceğini belirleyen iki karakterli kod.',
    detay:'{{FTXP}} ile tanımlanır; hesaplanan vergi {{BSET}} tablosuna yazılır.',
    ilgili:['matrah'] },

  { anahtar:'matrah', ad:'Matrah', en:'Tax Base Amount', konu:'taxes',
    aciklama:'Verginin üzerinden hesaplandığı tutar.', ilgili:['vergi-kodu'] },

  { anahtar:'is-alani', ad:'İş alanı', en:'Business Area', konu:'org-yapisi',
    aciklama:'Şirket kodundan **bağımsız**, faaliyet/bölüm bazlı raporlama birimi.',
    detay:
      'Bir iş alanı **birden çok şirket koduna** yayılabilir: "Tekstil" iş alanı hem Türkiye ' +
      'hem Almanya şirket kodunda kullanılabilir. Bu, şirket kodu sınırlarını aşan ' +
      'faaliyet raporlaması sağlar.\n\n' +
      '**Zayıf noktası:** iş alanı bazında **dengeli bilanço** üretmek zordur — ' +
      'satıcı ve banka kalemleri iş alanı taşımaz. ' +
      'Bu sorunu {{belge-bolme}} çözer ama iş alanı için değil, ' +
      '{{kar-merkezi}} ve segment için tasarlanmıştır.\n\n' +
      '**S/4HANA’da durumu:** kaldırılmadı ama **yerini büyük ölçüde kâr merkezi ve segment aldı**. ' +
      'Yeni kurulumlarda iş alanı yerine kâr merkezi tercih edilir; ' +
      'eski kurulumlarda uyumluluk için durmaya devam eder.',
    ilgili:['sirket-kodu','kar-merkezi','belge-bolme'] },

  { anahtar:'kredi-kontrol-alani', ad:'Kredi kontrol alanı', en:'Credit Control Area', konu:'org-yapisi',
    aciklama:'Müşteri {{kredi-limiti}} kontrolünün yapıldığı organizasyon birimi.',
    detay:
      'Bir kredi kontrol alanına **birden çok şirket kodu** bağlanabilir. ' +
      'Bunun pratik anlamı önemlidir: grup şirketleri **ortak bir limit** paylaşabilir.\n\n' +
      '*Örnek:* aynı müşteri hem A hem B şirketinden alım yapıyorsa, ' +
      'tek kredi kontrol alanı kurulduğunda toplam riski birlikte izlenir. ' +
      'Ayrı alanlar kurulursa her şirket kendi limitini bağımsız yönetir ve ' +
      'müşterinin **toplam riski görünmez**.\n\n' +
      'Limit ve kullanılan risk {{KNKK}} tablosunda kredi kontrol alanı bazında tutulur. ' +
      '{{OB45}} ile tanımlanır, {{T014}}’te saklanır.\n\n' +
      'S/4HANA’da SAP Credit Management ile birlikte çalışır.',
    ilgili:['kredi-limiti','sirket-kodu'] },

  { anahtar:'alv-duzeni', ad:'ALV düzeni', en:'ALV Layout / Variant', konu:'reporting',
    aciklama:'Bir raporda hangi sütunların, hangi sırada ve hangi toplamlarla görüneceğini ' +
             'saklayan kayıtlı görünüm.',
    detay:
      'SAP raporlarının çoğu **ALV** (ABAP List Viewer) kullanır. ' +
      'Sütun ekleme/çıkarma, sıralama, süzme, alt toplam ve gruplama yapılabilir — ' +
      've bu ayarlar **düzen olarak kaydedilir**.\n\n' +
      '**İki tür düzen vardır:**\n\n' +
      '**Kullanıcıya özel** — yalnızca kaydeden kişi görür.\n' +
      '**Genel** (`/` ile başlar) — tüm kullanıcılar görebilir; ' +
      'standart raporlama düzenleri böyle paylaşılır.\n\n' +
      '**Neden önemli:** {{FBL3N}} gibi raporlarda ihtiyaç duyulan sütunlar ' +
      '(ihtar seviyesi, kâr merkezi, vergi kodu) **varsayılan düzende yoktur**. ' +
      'Bir kez eklenip düzen kaydedildiğinde, aylık tekrarlanan analiz ' +
      'saniyeler sürer.\n\n' +
      'Ayrıca **seçim ekranı varyantı** ile birlikte kullanılırsa ' +
      '(hangi veri + nasıl görünsün) rapor tek tuşa iner.',
    ilgili:['dokum','mali-tablo-yapisi'] },

  { anahtar:'dokum', ad:'Kalem dökümü', en:'Line Item Report', konu:'reporting',
    aciklama:'Bir hesabın/iş ortağının **tek tek kalemlerini** listeleyen rapor türü; ' +
             'bakiye raporunun karşıtı.',
    detay:
      'FI raporlaması iki temel türe ayrılır:\n\n' +
      '**Bakiye raporu** — *"bu hesabın bakiyesi ne?"* ({{FS10N}}, {{FAGLB03}}). ' +
      'Dönem dönem toplamları verir, hızlıdır.\n\n' +
      '**Kalem dökümü** — *"bu bakiye hangi belgelerden oluşuyor?"* ' +
      '({{FBL3N}}, {{FBL1N}}, {{FBL5N}}, {{FAGLL03}}). ' +
      'Tek tek satırları verir, belgeye çift tıklanabilir.\n\n' +
      '**Kritik ön koşul:** G/L hesabında **kalem yönetimi** açık olmalıdır ' +
      '({{SKB1}}). Kapalıysa {{FBL3N}} o hesap için **boş döner** — ' +
      'bakiye vardır ama kalemler gösterilemez.\n\n' +
      'Bu ayar sonradan açılırsa **geçmiş kalemler görünmez**; ' +
      'yalnızca açıldıktan sonraki kayıtlar listelenir.',
    ilgili:['alv-duzeni','acik-kalem','mizan'] },

  { anahtar:'cds-view', ad:'CDS view', en:'Core Data Services View', konu:'reporting',
    aciklama:'S/4HANA’da veriyi **veritabanı katmanında** modelleyen ve raporlamayı besleyen ' +
             'sanal veri modeli.',
    detay:
      '**Neden geldi:** klasik ABAP raporlarında veri uygulama sunucusuna çekilip orada ' +
      'işlenirdi. CDS ile hesaplama **HANA içinde** yapılır ve yalnızca sonuç taşınır.\n\n' +
      '**FI açısından anlamı:** Fiori raporları, analiz uygulamaları ve ' +
      'Embedded Analytics hepsi CDS view’lar üzerine kuruludur. ' +
      '{{ACDOCA}} üzerine tanımlanmış onlarca standart CDS view vardır.\n\n' +
      '**{{uyumluluk-view}} ile ilişkisi:** ikisi de view’dır ama amaçları farklıdır. ' +
      'Uyumluluk görünümü **eski tabloları taklit eder** (eski programlar çalışsın diye); ' +
      'CDS view ise **yeni raporlama için** tasarlanmıştır.\n\n' +
      'Danışman açısından pratik sonuç: yeni rapor ihtiyacında ABAP program yazmak yerine ' +
      'önce **uygun bir standart CDS view var mı** diye bakılır.',
    ilgili:['uyumluluk-view','evrensel-kayit-defteri'] },

  { anahtar:'degisiklik-belgesi', ad:'Değişiklik belgesi', en:'Change Document', konu:'error-handling',
    aciklama:'Bir ana veri veya belgede **kim, ne zaman, neyi değiştirdi** bilgisini tutan denetim izi.',
    detay:
      'Başlık {{CDHDR}}, satırlar {{CDPOS}} tablosunda tutulur.\n\n' +
      '**Ne kaydedilir:** eski değer, yeni değer, değiştiren kullanıcı, tarih ve saat.\n\n' +
      '**Ne kaydedilmez:** her alan değil — yalnızca **değişiklik izleme işaretli** alanlar. ' +
      'Bu işaret veri elemanı düzeyinde tanımlıdır.\n\n' +
      '**Tipik kullanım:** *"satıcının banka hesabı ne zaman değişti?"* sorusu ' +
      'dolandırıcılık incelemelerinin ilk sorusudur ve cevabı buradadır. ' +
      'Aynı şekilde ödeme koşulu, mutabakat hesabı ve kredi limiti değişiklikleri izlenir.\n\n' +
      'Belge üzerinden erişim: {{FB03}} → *Ortam → Değişiklikler*. ' +
      'Ana veri üzerinden: {{FK04}} (satıcı), {{FD04}} (müşteri).',
    ilgili:['ana-veri','tasima-istegi'] },

  { anahtar:'toplu-giris', ad:'Toplu giriş (batch input)', en:'Batch Input / BDC', konu:'data-upload',
    aciklama:'Bir kullanıcının ekranlara girdiği tuş vuruşlarını **taklit ederek** ' +
             'toplu veri yükleyen klasik yöntem.',
    detay:
      '**Nasıl çalışır:** yüklenecek her satır için sistem, o işlemin ekranlarını ' +
      '**arka planda açar** ve alanları doldurur — sanki kullanıcı yazıyormuş gibi.\n\n' +
      'Sonuç bir **oturum** (session) olur ve {{SM35}} ile çalıştırılır.\n\n' +
      '**Güçlü yanı:** ekranın tüm kontrolleri çalışır. Zorunlu alan, yetki, ' +
      'hesap belirleme, dönem kontrolü — hepsi normal kayıttaki gibi devrededir. ' +
      'Bu yüzden **hatalı veri sisteme giremez**.\n\n' +
      '**Zayıf yanı:** yavaştır ve **ekran yapısına bağımlıdır**. ' +
      'SAP sürümü değişip ekrana yeni bir alan eklenirse veya alan sırası değişirse ' +
      'kayıt **bozulur**.\n\n' +
      '**Hata yönetimi:** başarısız satırlar oturumda kalır, düzeltilip ' +
      '**yeniden çalıştırılabilir**. Bu, toplu girişin en değerli özelliğidir — ' +
      '1.000 satırın 40’ı hata alırsa yalnızca o 40’ı tekrar denersin.\n\n' +
      'Alternatifleri {{bapi}} (daha hızlı, ekrandan bağımsız) ve {{idoc}}’tur.',
    ilgili:['kayit-recording','bapi','idoc'] },

  { anahtar:'kayit-recording', ad:'Kayıt (recording)', en:'Transaction Recording', konu:'lsmw',
    aciklama:'Bir işlemin ekran akışının **adım adım kaydedilmesi**; ' +
             '{{toplu-giris}} programının iskeletini üretir.',
    detay:
      '{{SHDB}} ile yapılır: işlem başlatılır, kullanıcı bir örnek kayıt girer, ' +
      'sistem **hangi ekranda hangi alana ne yazıldığını** kaydeder.\n\n' +
      'Çıktı, alan adlarıyla birlikte bir ekran akışı listesidir. ' +
      'Bu liste sonra bir veri dosyasıyla eşleştirilir ve ' +
      'her satır için akış tekrarlanır.\n\n' +
      '**Kritik kural:** kayıt alınırken **tüm alanların doldurulması** gerekir — ' +
      'boş bırakılan alan kayda girmez ve sonradan eşleştirilemez.\n\n' +
      'Aynı şekilde **koşullu ekranlar** dikkat ister: bazı alanlar yalnızca ' +
      'belirli değerlerde açılır. Örnek kayıt o yolu izlemediyse ' +
      'o ekran kayda hiç girmez ve yükleme o satırlarda **takılır**.\n\n' +
      '**Bu yüzden örnek kayıt, veri kümesinin en karmaşık satırıyla alınmalıdır** — ' +
      'en basitiyle değil.',
    ilgili:['toplu-giris','lsmw'] },

  { anahtar:'alan-esleme', ad:'Alan eşleme (mapping)', en:'Field Mapping', konu:'lsmw',
    aciklama:'Kaynak dosyadaki sütunun **hangi SAP alanına** karşılık geldiğinin tanımlanması.',
    detay:
      'Veri aktarımının **asıl işi** budur; araç seçimi ikincildir.\n\n' +
      'Üç tür alan vardır ve üçü farklı davranır:\n\n' +
      '**Doğrudan eşlenen** — kaynakta var, SAP’ta var, dönüşüm gerekmez.\n' +
      '**{{donusum-kurali}} gerektiren** — kaynak biçimi SAP biçimine uymuyor ' +
      '(tarih, ondalık ayracı, birim, ülke kodu).\n' +
      '**Sabit atanan** — kaynakta yok, SAP’ta zorunlu; sabit bir değer verilir.\n\n' +
      '⚠️ **En sık hata üçüncü türde:** kaynakta olmayan bir zorunlu alan ' +
      'fark edilmezse yükleme **ilk satırda durur**. ' +
      'Bu yüzden eşleme, kaynak dosyadan değil **SAP’ın zorunlu alan listesinden** ' +
      'başlanarak yapılır.',
    ilgili:['donusum-kurali','lsmw','alan-durumu'] },

  { anahtar:'donusum-kurali', ad:'Dönüşüm kuralı', en:'Conversion Rule', konu:'lsmw',
    aciklama:'Kaynak değerin SAP’ın beklediği biçime **çevrilmesi** kuralı.',
    detay:
      'En sık ihtiyaç duyulan dönüşümler:\n\n' +
      '**Tarih** — `31.12.2027` → `20271231`\n' +
      '**Ondalık ayracı** — `1.234,56` → `1234.56`\n' +
      '**Sabit uzunluk** — hesap numarası **sola sıfır dolgulu** olmalı: ' +
      '`320100` → `0000320100`\n' +
      '**Kod çevrimi** — eski sistemdeki `TR` → SAP’ta `TR`, ama ' +
      'eski `TUR` → `TR` gibi tablo bazlı çevrimler\n\n' +
      '⚠️ **Sola sıfır dolgu en çok tuzak çıkaran kuraldır.** ' +
      'Excel sayı olarak gördüğü hesap numarasının başındaki sıfırları **atar**. ' +
      'Dosya doğru görünür, yükleme *"hesap bulunamadı"* der.\n\n' +
      '**Önlem:** kaynak sütunları Excel’de **metin** biçiminde tut ' +
      'veya CSV’yi doğrudan üret.',
    ilgili:['alan-esleme','lsmw','data-upload'] },

  { anahtar:'sayi-mutabakati', ad:'Sayı mutabakatı', en:'Record Count Reconciliation', konu:'data-upload',
    aciklama:'Yüklenen kayıt sayısının **oluşan belge sayısına** eşit olduğunun kontrolü.',
    detay:
      'Toplu yüklemenin **vazgeçilmez son adımıdır** ve en çok atlanan adımdır.\n\n' +
      '**Neden gerekli:** {{guncelleme-hatasi}} sessizdir. ' +
      '500 kayıt gönderilir, 486’sı oluşur, 14’ü kaybolur — ' +
      've hiçbir ekran bunu söylemez.\n\n' +
      '**İki seviyede yapılır:**\n\n' +
      '**Adet** — gönderilen satır sayısı = oluşan belge sayısı ({{BKPF}})\n' +
      '**Tutar** — ⭐ kaynak dosyadaki borç/alacak toplamı = sistemdeki toplam\n\n' +
      'İkincisi daha güçlüdür: adet tutup **tutar tutmuyorsa** ' +
      'bir {{donusum-kurali}} hatası vardır (ondalık ayracı, birim, kur).\n\n' +
      'Bu kontrol {{konu:error-handling}}, {{konu:data-upload}} ve ' +
      '{{konu:migration}} konularının **ortak zorunlu adımıdır**.',
    ilgili:['guncelleme-hatasi','toplu-giris','bapi'] },

  { anahtar:'bapi', ad:'BAPI', en:'Business API', konu:'data-upload',
    aciklama:'SAP’ın iş nesnelerine **ekrandan bağımsız** erişim sağlayan standart fonksiyon arayüzü.',
    detay:
      '**{{toplu-giris}}’ten farkı:** ekranları taklit etmez, iş mantığını **doğrudan** çağırır.\n\n' +
      '**Avantajları:**\n\n' +
      '• **Hızlıdır** — ekran işleme yükü yoktur\n' +
      '• **Sürümden bağımsızdır** — ekran değişse de arayüz sabit kalır\n' +
      '• Hata mesajlarını **yapılandırılmış** döndürür\n\n' +
      '**Dikkat edilecek nokta:** BAPI çağrısı **kendiliğinden commit etmez**. ' +
      'İşlemin kalıcı olması için ardından `BAPI_TRANSACTION_COMMIT` çağrılmalıdır. ' +
      'Unutulursa veri sanki yazılmış görünür ama **kalıcı olmaz** — ' +
      'yükleme programlarının klasik hatasıdır.\n\n' +
      'FI tarafında en çok kullanılanlar: G/L belge kaydı, satıcı/müşteri ana verisi, ' +
      'duran varlık oluşturma.',
    ilgili:['toplu-giris','idoc','data-upload'] },

  { anahtar:'idoc', ad:'IDoc', en:'Intermediate Document', konu:'data-upload',
    aciklama:'Sistemler arası veri alışverişi için kullanılan **yapılandırılmış mesaj** formatı.',
    detay:
      'Bir zarf gibi düşünülebilir: **kontrol kaydı** (kimden, kime, hangi mesaj tipi), ' +
      '**veri kayıtları** (asıl içerik) ve **durum kayıtları** (işlem geçmişi).\n\n' +
      '**Ayırt edici özelliği: asenkron ve izlenebilir.** ' +
      'Mesaj gönderilir, karşı sistem işler, sonuç durum kaydına yazılır. ' +
      'Başarısız IDoc **sistemde kalır**, düzeltilip {{BD87}} ile yeniden işlenebilir.\n\n' +
      '**{{bapi}} ile farkı:** BAPI eşzamanlıdır (çağır, cevabı bekle); ' +
      'IDoc asenkrondur (gönder, sonra kontrol et). ' +
      'Dış sistem entegrasyonlarında IDoc, iç yüklemelerde BAPI tercih edilir.\n\n' +
      'İzleme {{WE02}} ile yapılır; durum kodları (53 başarılı, 51 hata) ' +
      'sorunun nerede olduğunu gösterir.',
    ilgili:['bapi','toplu-giris'] },

  { anahtar:'kilitleme', ad:'Kilitleme (lock)', en:'Enqueue / Lock', konu:'error-handling',
    aciklama:'Aynı kaydın iki kullanıcı tarafından **eş zamanlı değiştirilmesini** engelleyen mekanizma.',
    detay:
      'Bir kullanıcı satıcıyı {{XK02}} ile açtığında sistem o kayda **kilit koyar**. ' +
      'İkinci kullanıcı aynı satıcıyı açmak isterse ' +
      '*"Satıcı ... kullanıcı XYZ tarafından kilitlenmiş"* uyarısını alır.\n\n' +
      '**Normal davranıştır** — veri bütünlüğünü korur.\n\n' +
      '**Sorun ne zaman çıkar:** kullanıcı işlemi düzgün kapatmadan çıkarsa ' +
      '(oturum çöktü, bilgisayar kapandı) kilit **takılı kalır**. ' +
      'O kayda kimse erişemez.\n\n' +
      '{{SM12}} ile takılı kilitler görülür ve **kaldırılır**. ' +
      '⚠️ Kilit kaldırmadan önce **kullanıcının gerçekten çalışmadığı** doğrulanmalıdır; ' +
      'aksi hâlde iki kişi aynı kaydı değiştirir ve biri diğerinin değişikliğini ezer.\n\n' +
      '**Toplu işlemlerde sık görülür:** {{F110}} çalışırken aynı satıcıya ' +
      'elle kayıt yapılmaya çalışılırsa kilit çakışması olur.',
    ilgili:['guncelleme-hatasi','error-handling'] },

  { anahtar:'guncelleme-hatasi', ad:'Güncelleme hatası', en:'Update Termination', konu:'error-handling',
    aciklama:'Belge numarası verildikten **sonra** asenkron güncellemenin başarısız olması. ' +
             'Sonuç: numara var ama **kayıt yok**.',
    detay:
      'SAP’ta kayıt iki aşamalıdır: kullanıcı "kaydet" der, sistem **numara verir** ve ' +
      'ekranı serbest bırakır; asıl veritabanı yazımı **arka planda** yapılır.\n\n' +
      'Bu, kullanıcıyı bekletmemek içindir. Ama arka plandaki yazım başarısız olursa ' +
      '(bellek, kilit, veri hatası) **güncelleme sonlanır**.\n\n' +
      '**Belirtisi:** kullanıcı belge numarasını görmüştür ama {{FB03}} ile ' +
      'belge **bulunamaz**. Numara aralığında **boşluk** kalır.\n\n' +
      '{{SM13}} ile başarısız güncellemeler görülür; hata sebebi ve ' +
      'ilgili {{ST22}} dökümü incelenir.\n\n' +
      '**Kritik nokta:** bazı durumlarda güncelleme **yeniden çalıştırılabilir**; ' +
      'bazılarında kayıt yeniden girilmelidir. Karar {{SM13}}’teki hata detayına bağlıdır.\n\n' +
      'Toplu yüklemelerde en sinsi hata sınıfıdır: program *"1.000 kayıt başarılı"* der ' +
      'ama 40 tanesi güncellemede takılmıştır.',
    ilgili:['kilitleme','toplu-giris'] },

  { anahtar:'yetki-nesnesi', ad:'Yetki nesnesi', en:'Authorization Object', konu:'error-handling',
    aciklama:'Bir kullanıcının **neyi yapabileceğini** alan bazında tanımlayan yetki birimi.',
    detay:
      'FI’da en çok kullanılanlar:\n\n' +
      '`F_BKPF_BUK` — **şirket kodu** bazında belge yetkisi\n' +
      '`F_BKPF_KOA` — **hesap tipi** bazında (satıcı / müşteri / G/L / varlık)\n' +
      '`F_BKPF_BLA` — **belge türü** bazında\n' +
      '`F_SKA1_BUK` — G/L hesap ana verisi\n\n' +
      'Her nesnede **etkinlik** (activity) alanı vardır: 01 oluştur · 02 değiştir · ' +
      '03 görüntüle.\n\n' +
      '**Teşhis:** yetki hatası alındığında {{SU53}} çalıştırılır — ' +
      '**son başarısız kontrolü** gösterir: hangi nesne, hangi alan, hangi değer eksik.\n\n' +
      '⚠️ **Sinsi durum:** bazı raporlar yetki eksikliğinde hata vermez, ' +
      '**boş liste** döner. Kullanıcı "veri yok" sanır. ' +
      'Rapor boş dönüyorsa {{SU53}} kontrolü teşhis listesinde olmalıdır.',
    ilgili:['error-handling','dokum'] },

  { anahtar:'tampon', ad:'Tampon bellek (buffer)', en:'Table Buffer', konu:'sap-tables',
    aciklama:'Sık okunan yapılandırma tablolarının uygulama sunucusunda **bellekte tutulması**.',
    detay:
      '{{T001}}, {{T004}}, {{T030}} gibi tablolar her belge kaydında okunur. ' +
      'Her seferinde veritabanına gitmek yavaş olurdu; bu yüzden **tamponlanırlar**.\n\n' +
      '**Pratik sonucu:** yapılandırma değişikliği bazen **hemen etkili olmaz** — ' +
      'tampon yenilenene kadar eski değer okunmaya devam eder.\n\n' +
      'Klasik senaryo: danışman {{OB52}}’de dönemi açar, kullanıcı hâlâ ' +
      '*"dönem kapalı"* hatası alır. Sebep tampon gecikmesidir; ' +
      'kullanıcının oturumu kapatıp açması genelde yeterlidir.\n\n' +
      '**Hareket tabloları tamponlanmaz** ({{BKPF}}, {{BSEG}}, {{ACDOCA}}) — ' +
      'çünkü sürekli değişirler ve eski veri okumak kabul edilemez.',
    ilgili:['tablo-anahtari','ozellestirme'] },

  { anahtar:'arayuz-tablosu', ad:'Arayüz tablosu', en:'Interface / Staging Table', konu:'data-upload',
    aciklama:'Dış sistemden gelen verinin, asıl tablolara yazılmadan **önce bekletildiği** geçici tablo.',
    detay:
      '**Neden gerekli:** dış veri doğrudan {{BKPF}}/{{BSEG}}’e yazılamaz — ' +
      'doğrulanması, eşleştirilmesi ve hatalıların ayıklanması gerekir.\n\n' +
      'Arayüz tablosu bu ara katmanı sağlar:\n\n' +
      '**1.** Veri arayüz tablosuna yüklenir *(henüz muhasebe etkisi yok)*\n' +
      '**2.** Doğrulama çalışır; hatalı satırlar işaretlenir\n' +
      '**3.** Doğru satırlar asıl işleme aktarılır ({{bapi}} veya {{toplu-giris}})\n' +
      '**4.** Hatalılar düzeltilip **yeniden denenir**\n\n' +
      '**Ayırt edici faydası: tekrar çalıştırılabilirlik.** ' +
      '1.000 satırın 40’ı hata alırsa yalnızca o 40 tekrar denenir — ' +
      'baştan yükleme gerekmez.\n\n' +
      'Elektronik banka ekstresi ({{FF_5}}) ve {{LSMW}} bu mantıkla çalışır. ' +
      'Aynı yaklaşım {{konu:document-parking}}’de de görülür: ' +
      'veri sisteme girer ama **mizanı etkilemez**.',
    ilgili:['toplu-giris','idoc','bapi'] },

  { anahtar:'tablo-anahtari', ad:'Tablo anahtarı', en:'Table Key', konu:'sap-tables',
    aciklama:'Bir tablodaki satırı **benzersiz** kılan alan kümesi; tablonun okunma biçimini belirler.',
    detay:
      '**Neden önemli:** anahtar alanlarıyla yapılan sorgu hızlıdır; ' +
      'anahtar dışı alanla yapılan sorgu **tüm tabloyu tarar**.\n\n' +
      'FI’ın klasik örneği: {{BSEG}}’in anahtarı ' +
      '`BUKRS + BELNR + GJAHR + BUZEI`’dir. ' +
      'Belge numarasıyla arama hızlıdır — ama **satıcı numarasıyla arama yavaştır**, ' +
      'çünkü `LIFNR` anahtar değildir.\n\n' +
      '**İndeks tabloları tam olarak bu yüzden vardır:** {{BSIK}} ' +
      '(satıcı açık kalemleri) anahtarı `LIFNR` ile başlar, ' +
      'böylece "bu satıcının açık kalemleri" sorgusu hızlanır.\n\n' +
      '**S/4HANA’da durum değişti:** HANA’nın sütun bazlı yapısı ve ' +
      'bellek içi işleme sayesinde indeks tablolarına gerek kalmadı — ' +
      '{{BSIK}}, {{BSAK}}, {{BSID}} gibi tablolar {{uyumluluk-view}}’a dönüştü ve ' +
      '{{ACDOCA}} doğrudan sorgulanır hâle geldi.',
    ilgili:['uyumluluk-view','evrensel-kayit-defteri'] },

  { anahtar:'kontrol-alani', ad:'Kontrol alanı', en:'Controlling Area', konu:'co-integration',
    aciklama:'CO’nun en üst organizasyon birimi; maliyet muhasebesinin yapıldığı çerçeve.',
    detay:'Bir kontrol alanına **birden çok şirket kodu** bağlanabilir — bu, şirketler arası ' +
          'maliyet dağıtımını mümkün kılar. Şart: bağlı şirket kodlarının **aynı hesap planını** ' +
          've aynı mali yıl varyantını kullanması. {{OKKP}} ile tanımlanır, {{TKA01}}’de tutulur.',
    ilgili:['maliyet-yeri','masraf-turu','sirket-kodu'] },

  { anahtar:'ic-siparis', ad:'İç sipariş', en:'Internal Order', konu:'co-integration',
    aciklama:'Geçici veya proje bazlı maliyetleri toplamak için açılan CO nesnesi.',
    detay:'Maliyet yerinden farkı **geçici** olmasıdır: bir fuar, bir kampanya, bir bakım işi. ' +
          'Biriken maliyet {{KO88}} ile hedefe **yerleştirilir** (maliyet yeri, duran varlık veya ' +
          'G/L hesabı). Yerleşim yapılmazsa maliyet siparişte asılı kalır ve ' +
          'ne gidere ne varlığa yansır.',
    ilgili:['maliyet-yeri','yatirim-devam','masraf-turu'] },

  { anahtar:'istatistiksel-kalem', ad:'İstatistiksel kalem', en:'Statistical / Noted Item', konu:'special-gl',
    aciklama:'Bilançoyu etkilemeyen, yalnızca izleme amaçlı tek taraflı kayıt.',
    detay:'Karşı kayıt üretmez, mizanda görünmez. Avans talebi ({{F-47}}) ve kefaletler böyledir. ' +
          'Buna rağmen {{F110}} istatistiksel kalemi **görür ve ödeme önerisine alır** — ' +
          'süreç izlemeyi bilanço etkisinden ayıran tasarımdır.',
    ilgili:['ozel-ana-muhasebe-gostergesi','avans'] },

  { anahtar:'dort-goz', ad:'Dört-göz prensibi', en:'Four-Eyes Principle', konu:'document-parking',
    aciklama:'Bir işlemi giren kişi ile onaylayan kişinin **farklı olması** kuralı.',
    detay:'SAP’ta {{park-etme}} ile uygulanır: kullanıcı belgeyi park eder ({{FV60}}), ' +
          'yetkili kişi inceleyip muhasebeleştirir ({{FBV0}}). Belge park hâlindeyken ' +
          'mizanı etkilemez. Yetkilendirme, park eden kullanıcının kendi belgesini ' +
          'muhasebeleştirmesini engelleyecek şekilde kurulmalıdır — ' +
          'aksi hâlde mekanizma yalnızca bir gecikmeye dönüşür.',
    ilgili:['park-etme','belge-turu'] },

  { anahtar:'teminat', ad:'Teminat / depozito', en:'Guarantee / Security Deposit', konu:'special-gl',
    aciklama:'Sözleşmenin yerine getirileceğini güvence altına almak için verilen veya alınan tutar.',
    detay:'SAP’ta {{ozel-ana-muhasebe-gostergesi}} ile izlenir: verilen teminat **126**, alınan teminat **326** ' +
          'hesabına yazılır. Avanstan farkı, mal/hizmet karşılığı olmaması ve sözleşme bitiminde ' +
          '**iade edilmesidir**. Uzun süre açık kaldığı için dönem sonunda kolayca unutulur; ' +
          'yıllık gözden geçirme gerekir.',
    ilgili:['avans','ozel-ana-muhasebe-gostergesi'] },

  /* ------------------------------------------------------- E-Dönüşüm --- */
  { anahtar:'gib', ad:'GİB — Gelir İdaresi Başkanlığı', en:'Turkish Revenue Administration', konu:'e-donusum',
    aciklama:'Türkiye’de e-dönüşümün **düzenleyici ve nihai muhatabı** olan kurum.',
    detay:'E-belge formatlarını, zorunluluk sınırlarını ve gönderim kurallarını GİB belirler. ' +
          '⚠️ **Zorunluluk hadleri ve tarihler tebliğle değişir** — bu yüzden sisteme ' +
          '**sabit kodlanmaz**, {{mukellef-sorgulama}} listesiyle dinamik yönetilir.' },

  { anahtar:'e-fatura', ad:'e-Fatura', en:'e-Invoice', konu:'e-donusum',
    aciklama:'**Kayıtlı kullanıcılar arasında** düzenlenen, kâğıt karşılığı olmayan elektronik fatura.',
    detay:'Alıcı da e-fatura sistemine kayıtlıysa fatura **e-fatura** olmak zorundadır; ' +
          'kayıtlı değilse {{e-arsiv}} kesilir. Bu seçim kullanıcının tercihi değil, ' +
          '**alıcının mükellefiyet durumunun** sonucudur — ' +
          've bu yüzden {{mukellef-sorgulama}} listesi güncel tutulmalıdır.\n\n' +
          'İki senaryo vardır: {{temel-fatura}} ve {{ticari-fatura}}.' },

  { anahtar:'e-arsiv', ad:'e-Arşiv Fatura', en:'e-Archive Invoice', konu:'e-donusum',
    aciklama:'E-fatura sistemine **kayıtlı olmayan** alıcılara düzenlenen elektronik fatura.',
    detay:'Nihai tüketiciler ve kayıtsız mükellefler için kullanılır. ' +
          'GİB’e **raporlanır** (e-fatura gibi alıcıya sistem üzerinden iletilmez); ' +
          'alıcıya e-posta veya kâğıt çıktı ile ulaştırılır.\n\n' +
          '⚠️ **e-Faturadan en önemli farkı:** e-arşiv fatura belirli bir süre içinde ' +
          '**iptal edilebilir**; e-fatura iptal edilemez, ' +
          '{{ticari-fatura}} senaryosunda reddedilebilir veya iade faturasıyla düzeltilir.' },

  { anahtar:'e-irsaliye', ad:'e-İrsaliye', en:'e-Delivery Note', konu:'e-donusum',
    aciklama:'Sevk irsaliyesinin elektronik hâli — **mal hareketiyle** birlikte düzenlenir.',
    detay:'Faturadan **bağımsız** bir belgedir ve zamanlaması farklıdır: ' +
          'irsaliye **malın sevkinde**, fatura sonrasında düzenlenebilir.\n\n' +
          'SAP tarafında tetikleyici FI değil **SD teslimatı** veya MM mal hareketidir — ' +
          'bu yüzden e-irsaliye sorunları çoğu zaman **lojistik tarafında** çözülür.' },

  { anahtar:'e-defter', ad:'e-Defter', en:'e-Ledger', konu:'e-donusum',
    aciklama:'Yevmiye ve Büyük Defter’in (Kebir) elektronik ortamda tutulup GİB’e {{berat}} ile onaylatılması.',
    detay:'Aylık (veya üç aylık) dönemler hâlinde **XML** üretilir, imzalanır ve ' +
          '{{berat}} dosyası GİB’e yüklenir.\n\n' +
          '⚠️ **Kritik sonuç:** beratı alınmış bir dönem **kesinleşmiştir**. ' +
          'O döneme sonradan kayıt yapmak yalnızca {{OB52}} sorunu değil, ' +
          '**yasal bir sorundur** — bu, dönem disiplininin neden bu kadar önemli ' +
          'olduğunun Türkiye’ye özgü gerekçesidir.' },

  { anahtar:'berat', ad:'Berat', en:'Ledger Certificate', konu:'e-donusum',
    aciklama:'{{e-defter}} dosyalarının özet ve imza bilgisini taşıyan, GİB’e yüklenen onay dosyası.',
    detay:'Defterin kendisi GİB’e gönderilmez; **beratı** gönderilir. ' +
          'GİB beratı onaylayınca dönem **mühürlenmiş** sayılır.\n\n' +
          'Berat alındıktan sonra o dönemin defterinde değişiklik yapılamaz — ' +
          'düzeltme **sonraki döneme** kaydedilir.' },

  { anahtar:'ozel-entegrator', ad:'Özel entegratör', en:'Private Integrator', konu:'e-donusum',
    aciklama:'GİB’den yetki almış, e-belge gönderim/alım hizmeti veren aracı kuruluş.',
    detay:'Üç gönderim yöntemi vardır:\n\n' +
          '**Doğrudan entegrasyon** — şirket kendi sistemini GİB’e bağlar. ' +
          'Yüksek hacim için; teknik yük şirkettedir.\n' +
          '**Özel entegratör** — ⭐ **en yaygın**. Aracı kurum arayüzü ve saklamayı üstlenir.\n' +
          '**GİB portal** — düşük hacim; SAP entegrasyonu yoktur, elle giriş.\n\n' +
          '⚠️ **Danışman için önemi:** SAP standardı e-belgeyi **üretir**, ' +
          'gönderimi çoğu kurulumda **entegratörün add-on’u** yapar. ' +
          'Bu yüzden sorun giderirken *"hata SAP’ta mı, entegratörde mi?"* ' +
          'ayrımı ilk sorulacak sorudur.' },

  { anahtar:'ubl-tr', ad:'UBL-TR', en:'UBL-TR XML Format', konu:'e-donusum',
    aciklama:'Türkiye’de e-fatura ve e-arşivin zorunlu **XML** biçimi (UBL 2.1 tabanlı yerel uyarlama).',
    detay:'Faturanın hukuken geçerli hâli **XML’dir** — ekrandaki görüntü veya PDF değil.\n\n' +
          '⚠️ **Pratik sonucu büyüktür:** uyuşmazlıkta *"biz şöyle görüyoruz"* geçerli değildir. ' +
          '`EDOCUMENTFILE`’daki **gönderilen XML** esastır. ' +
          'Teşhiste ekran değil, dosya okunur.' },

  { anahtar:'mali-muhur', ad:'Mali mühür', en:'Financial Seal', konu:'e-donusum',
    aciklama:'Tüzel kişilerin e-belgeleri imzalamak için kullandığı, TÜBİTAK tarafından üretilen elektronik sertifika.',
    detay:'Gerçek kişiler **e-imza** kullanır. Mühür olmadan e-belge **geçerli değildir**.\n\n' +
          '⚠️ **Sertifikanın süresi doludur** ve yenilenmezse bir sabah ' +
          'tüm e-fatura gönderimi durur. Bu, tarihi takvime bağlanmadığında ' +
          'yaşanan klasik bir kesinti sebebidir.' },

  { anahtar:'mukellef-sorgulama', ad:'Mükellef sorgulama', en:'Taxpayer Registry Check', konu:'e-donusum',
    aciklama:'Alıcının e-fatura sistemine **kayıtlı olup olmadığının** GİB listesinden kontrolü.',
    detay:'Bu kontrol, faturanın {{e-fatura}} mı {{e-arsiv}} mi olacağını belirler.\n\n' +
          '⚠️ **Liste sürekli değişir** — yeni mükellefler eklenir. ' +
          'Sistemdeki kopya güncellenmezse, artık e-fatura mükellefi olmuş bir müşteriye ' +
          'e-arşiv kesilir ve **GİB reddeder**.\n\n' +
          'Red **sessizdir**: muhasebe belgesi durur, cari hesapta borç görünür, ' +
          'ama karşı taraf faturayı hiç almamıştır.' },

  { anahtar:'temel-fatura', ad:'Temel fatura senaryosu', en:'Basic Invoice Scenario', konu:'e-donusum',
    aciklama:'Alıcının sistem üzerinden **red hakkı olmayan** e-fatura senaryosu.',
    detay:'Fatura iletilir ve süreç biter. Alıcı itiraz edecekse ' +
          '**harici yollarla** (iade faturası, harici itiraz) yapar.\n\n' +
          'Karşıtı {{ticari-fatura}}’dır. Seçim, taraflar arasındaki ' +
          'ticari ilişkiye ve alıcının sistemdeki tanımına göre yapılır.' },

  { anahtar:'ticari-fatura', ad:'Ticari fatura senaryosu', en:'Commercial Invoice Scenario', konu:'e-donusum',
    aciklama:'Alıcının belirli bir süre içinde **kabul veya red** yanıtı verebildiği e-fatura senaryosu.',
    detay:'⚠️ **Danışman için kritik nokta:** bu senaryoda faturanın ' +
          '**muhasebeleşmiş olması yetmez** — alıcı reddedebilir.\n\n' +
          'Yani FI’da belge oluşmuş, cari hesapta borç doğmuş olabilir, ' +
          'buna rağmen e-fatura **reddedilmiş** olabilir. ' +
          'Bu, {{konu:e-donusum}} konusunun ana fikridir: ' +
          '**muhasebe belgesi ile e-belge iki ayrı yaşam döngüsüdür.**\n\n' +
          'Red gelirse düzeltme **iade faturasıyla** yapılır; e-fatura silinemez.' },

  { anahtar:'tevkifat', ad:'Tevkifat (stopaj)', en:'Withholding Tax', konu:'taxes',
    aciklama:'Ödemeyi yapanın, ödeyeceği tutardan vergiyi kesip doğrudan vergi dairesine yatırması.',
    detay:'SAP’ta iki tip vardır: **klasik** (yalnızca ödemede) ve **genişletilmiş** (faturada veya ödemede). ' +
          'Türkiye kurulumlarında genişletilmiş tevkifat kullanılır. Satıcı ana verisindeki tevkifat tipi/kodu ' +
          'olmadan kesinti yapılmaz — sık karşılaşılan bir eksiklik.',
    ilgili:['vergi-kodu','acik-kalem'] },

  { anahtar:'lider-defter', ad:'Lider defter', en:'Leading Ledger', konu:'parallel-ledger',
    aciklama:'Şirketin ana muhasebe standardını taşıyan, sistemde tek olan defter (standart kodu **0L**).',
    detay:'Tüm şirket kodları için geçerlidir, şirket kodunun mali yıl varyantını kullanır ve ' +
          'CO ile entegre çalışan defterdir. Defter belirtilmeden yapılan her kayıt **tüm** defterlere gider.',
    ilgili:['defter-grubu','evrensel-kayit-defteri'] },

  { anahtar:'defter-grubu', ad:'Defter grubu', en:'Ledger Group', konu:'parallel-ledger',
    aciklama:'Bir kaydın hangi defter(ler)e gideceğini belirleyen isimlendirilmiş defter kümesi.',
    detay:'Kayıt ekranında boş bırakılırsa kayıt **tüm** defterlere gider. Tek deftere yazmak için ' +
          '{{FB01L}} / {{FB50L}} kullanılır. Her defter için otomatik olarak kendi adında bir grup oluşur.',
    ilgili:['lider-defter','ifrs'] },

  { anahtar:'ifrs', ad:'IFRS / UFRS', en:'International Financial Reporting Standards', konu:'parallel-ledger',
    aciklama:'Uluslararası finansal raporlama standartları; yerel vergi mevzuatından farklı değerleme kuralları getirir.',
    detay:'Tipik farklar: amortisman süresi ve yöntemi, kiralama (IFRS 16), karşılık ayırma ölçütleri, ' +
          'gelir tanıma zamanı. Bu farklar SAP’ta **paralel defterlerle** çözülür: aynı işlem, ' +
          'iki defterde farklı tutarla kaydedilir.',
    ilgili:['lider-defter','defter-grubu','amortisman-alani','paralel-defter'] },

  { anahtar:'yerel-para-birimi', ad:'Yerel para birimi', en:'Local / Company Code Currency', konu:'new-gl',
    aciklama:'Şirket kodunun defter tuttuğu para birimi; {{T001}} `WAERS` alanında tanımlıdır.',
    detay:'Her FI kalemi hem işlem para biriminde hem yerel para biriminde saklanır. ' +
          'Grup para birimi ve serbest para birimi ek olarak tanımlanabilir; S/4HANA’da ' +
          '{{ACDOCA}} sekize kadar para birimi taşır.',
    ilgili:['paralel-para-birimi','kur-tipi'] },

  /* =============================== Veri geçişi (migration) partisi === */

  { anahtar:'greenfield', ad:'Yeni kurulum', en:'Greenfield / New Implementation', konu:'migration',
    aciklama:'S/4HANA’nın **sıfırdan** kurulup süreçlerin yeniden tasarlandığı geçiş yaklaşımı; eski sistemden yalnızca ana veri, açılış bakiyesi ve açık kalemler taşınır.',
    detay:'Avantajı: eski sistemin birikmiş hataları, kullanılmayan {{z-gelistirme}}leri ve bozuk verisi **taşınmaz**; süreçler {{standarda-yakin}} kurulabilir.\n\n' +
          '⚠️ Bedeli: **geçmiş taşınmaz.** Gelir tablosu hesaplarının açılış bakiyesi olmadığı için önceki yılın gelir tablosu yeni sistemde **hiç oluşmaz** — karşılaştırmalı mali tablo isteniyorsa ya hareketler de taşınır ya eski sistem okunabilir kalır. Bu karar geçişten **önce** verilmelidir.',
    ilgili:['brownfield','secici-gecis','acilis-bakiyesi'] },

  { anahtar:'brownfield', ad:'Sistem dönüşümü', en:'Brownfield / System Conversion', konu:'migration',
    aciklama:'Mevcut ECC sisteminin **yerinde** S/4HANA’ya dönüştürülmesi; tarihçe, özelleştirme ve geliştirmeler sistemle birlikte gelir.',
    detay:'Üç zorunlu hazırlık adımı vardır ve sırası değişmez: **①** {{cvi}} ile satıcı/müşterinin {{is-ortagi}}’na dönüştürülmesi · **②** hesap planı hazırlığı (birincil masraf türleri G/L hesabına dönüşür) · **③** mali veri dönüşümü ({{BSEG}}, `FAGLFLEXA`, `COEP` → {{ACDOCA}}).\n\n' +
          'Öncesinde {{basitlestirme-listesi}} çalıştırılır; {{SPDD}} ve {{SPAU}} ile modifikasyonlar uyarlanır.\n\n' +
          '⚠️ **Eski sistemin sorunları da gelir.** Yanlış kurulmuş hesap planı, ölü {{z-gelistirme}} ve bozuk ana veri dönüşümden sonra da yerinde durur.',
    ilgili:['greenfield','cvi','basitlestirme-listesi'] },

  { anahtar:'secici-gecis', ad:'Seçici veri geçişi', en:'Selective Data Transition', konu:'migration',
    aciklama:'{{greenfield}} ile {{brownfield}} arasındaki üçüncü yol: yeni bir sistem kurulur ama **seçilmiş tarihçe** (örneğin son üç yıl, belirli şirket kodları) taşınır.',
    detay:'Üçüncü taraf araç ve uzmanlık gerektirdiği için **en pahalı** seçenektir. Tercih sebebi genelde şudur: şirket süreçlerini yenilemek ister ({{greenfield}}) ama karşılaştırmalı raporlamadan da vazgeçemez ({{brownfield}}).\n\n' +
          'Çok şirketli gruplarda melez kullanım yaygındır: bazı şirket kodları dönüştürülür, bazıları sıfırdan kurulur.',
    ilgili:['greenfield','brownfield'] },

  { anahtar:'cvi', ad:'Müşteri/Satıcı Entegrasyonu', en:'Customer-Vendor Integration (CVI)', konu:'migration',
    aciklama:'Eski {{LFA1}} (satıcı) ve {{KNA1}} (müşteri) kayıtlarını {{is-ortagi}} nesnesine ({{BUT000}}) eşleyen dönüşüm mekanizması.',
    detay:'S/4HANA’da {{is-ortagi}} **zorunludur**, bu yüzden CVI dönüşümü brownfield geçişinin ön koşuludur.\n\n' +
          '⚠️ **Teknik dönüşümden ÖNCE, hâlâ ECC üzerindeyken** yapılır — projelerin en sık geciktiği adım budur. Sebebi teknik değil **veri kalitesidir**: mükerrer kayıtlar, eksik vergi numaraları ve tutarsız adres verileri dönüşümü durdurur ve tek tek temizlenmeleri gerekir.\n\n' +
          'Aynı gerçek kişi hem satıcı hem müşteri ise **tek** iş ortağında birleşmelidir; bu birleştirme kararı iş tarafına aittir, danışmana değil.',
    ilgili:['is-ortagi','brownfield'] },

  { anahtar:'is-ortagi', ad:'İş Ortağı', en:'Business Partner (BP)', konu:'s4-yenilikleri',
    aciklama:'Satıcı, müşteri, çalışan ve banka gibi tarafların **tek** ana veri nesnesinde toplanması; taraf türü artık bir **rol**dür.',
    detay:'ECC’de aynı firma hem satıcı hem müşteriyse **iki ayrı kayıt** açılırdı ve adres bilgisi iki yerde tutulurdu; ikisi zamanla ayrışırdı. {{is-ortagi}} bunu ortadan kaldırır: tek kimlik ({{BUT000}}), çok rol.\n\n' +
          '⚠️ Şirket kodu verisi **kaybolmadı** — hâlâ {{LFB1}} / {{KNB1}}’de durur ve `AKONT` {{mutabakat-hesabi}} oradadır. Değişen şey kimlik katmanıdır.\n\n' +
          'S/4HANA’da {{BP}} **tek giriş yoludur**; {{XK01}} ve {{XD01}} çalışsa bile arka planda {{cvi}} üzerinden buraya yazarlar.',
    ilgili:['cvi','mutabakat-hesabi'] },

  { anahtar:'basitlestirme-listesi', ad:'Basitleştirme listesi', en:'Simplification Item List', konu:'migration',
    aciklama:'SAP’ın yayımladığı, S/4HANA’ya geçişte **hangi işlevin değiştiğini veya kalktığını** madde madde listeleyen kontrol kataloğu.',
    detay:'Geçişten önce sistem üzerinde **çalıştırılır** ve her madde için üç cevaptan biri çıkar: etkilenmiyorsun · etkileniyorsun, hazırlık gerek · etkileniyorsun, engelleyici.\n\n' +
          '⭐ Proje planı bu çıktı olmadan yapılamaz: hangi maddenin sizi tuttuğunu bilmeden süre tahmini bir temenniden ibarettir.\n\n' +
          'Tipik engelleyiciler: {{cvi}} dönüşümü yapılmamış, kredi yönetimi eski bileşende, Türkiye’ye özgü add-on’ların uyumlu sürümü yok.',
    ilgili:['brownfield','tek-yonlu-kapi'] },

  { anahtar:'acilis-bakiyesi', ad:'Açılış bakiyesi', en:'Opening Balance', konu:'migration',
    aciklama:'Yeni sistemde muhasebenin başladığı andaki bakiyeler; genelde geçiş yılından **bir gün önceye** (31.12) bir **geçiş hesabı** karşılığında kaydedilir.',
    detay:'Üç kural:\n\n' +
          '**①** {{acik-kalem}} yönetimi olan hesaplar (satıcı, müşteri, GR/IR) **tek tek** taşınır — vade ve ödeme koşuluyla; toplu taşınırsa {{F110}} ve {{F-53}} çalışmaz.\n' +
          '**②** Normal G/L hesaplarında **bakiye** yeterlidir.\n' +
          '**③** ⚠️ **Gelir tablosu hesaplarının açılış bakiyesi olmaz** — dönem sonunda sıfırlandıkları için taşınacak bir bakiyeleri yoktur. Bu, karşılaştırmalı gelir tablosunun neden kendiliğinden oluşmadığının sebebidir.\n\n' +
          'Kontrol: tüm açılış kayıtlarından sonra geçiş hesabının bakiyesi **sıfır olmalıdır**.',
    ilgili:['greenfield','sayi-mutabakati','acik-kalem'] },

  { anahtar:'kesme-plani', ad:'Kesme planı', en:'Cutover Plan', konu:'migration',
    aciklama:'Eski sistemin durdurulmasından yeni sistemin açılmasına kadar geçen sürenin **dakika dakika** planı.',
    detay:'İçeriği: eski sistemin dondurulması · son yedek · veri çekimi · yükleme · mutabakat · onay · açılış. Her adımın **sorumlusu, süresi ve geri dönüş noktası** yazılıdır.\n\n' +
          '⭐ Süreler tahmin edilmez, {{deneme-gecisi}}nde **ölçülür**.\n\n' +
          '⚠️ Kesme penceresinde eski sistemde yapılan her işlem (acil ödeme, gelen fatura) **elle** yeni sisteme taşınır; bu yüzden pencerede kimin ne yapmaya yetkili olduğu önceden yazılır.\n\n' +
          'Planın en önemli satırı en sondadır: **geri dönüş kararı hangi saatte, kim tarafından verilir?**',
    ilgili:['deneme-gecisi','acilis-bakiyesi'] },

  { anahtar:'deneme-gecisi', ad:'Deneme geçişi', en:'Mock Migration / Dress Rehearsal', konu:'migration',
    aciklama:'Gerçek geçişin, gerçek veriyle ve gerçek {{kesme-plani}} ile baştan sona **provası**.',
    detay:'En az üç tur yapılır: **①** teknik prova (çalışıyor mu?) · **②** iş provası (veri doğru mu?) · **③** tam prova (süre tutuyor mu?).\n\n' +
          '⭐ **Prova, verinin değil PLANIN testidir.** Verinin doğruluğu mutabakatla ölçülür; provanın asıl çıktısı **her adımın kaç dakika sürdüğüdür** — kesme penceresi ancak bu ölçümle planlanabilir.\n\n' +
          'Son prova mümkün olduğunca canlıya yakın donanımda yapılır; yavaş bir test sunucusunda ölçülen süre canlıda yanıltır.',
    ilgili:['kesme-plani','sayi-mutabakati'] },

  /* ============================ Danışmanlık pratiği (best-practices) === */

  { anahtar:'tek-yonlu-kapi', ad:'Tek yönlü kapı', en:'One-Way Door Decision', konu:'best-practices',
    aciklama:'Üzerine veri yazıldıktan sonra **geri alınamayan** yapılandırma kararı; yanlışsa çözüm ayarı düzeltmek değil, veriyi yeniden kurmaktır.',
    detay:'FI’daki başlıca tek yönlü kapılar: {{hesap-plani}} · şirket kodunun {{yerel-para-birimi}} · {{mali-yil-varyanti}} · {{belge-bolme}}nin açık/kapalı olması · defter yapısı ({{paralel-defter}}) · {{mutabakat-hesabi}} ataması · kullanılmış bir {{vergi-kodu}}nun oranı · {{degerleme-plani}} ve {{amortisman-alani}} yapısı.\n\n' +
          '⭐ Bu kararlarda doğru soru *"bugün istiyor muyuz?"* değil, **"üç yıl içinde isteme ihtimalimiz var mı?"**dır.\n\n' +
          'Karşıtı **çift yönlü kapıdır**: {{odeme-kosulu}}, ihtar prosedürü, tolerans grubu, alan durumu — bunlar her zaman değiştirilebilir ve uzun uzun tartışılmaları zaman kaybıdır.',
    ilgili:['belge-bolme','hesap-plani','standarda-yakin'] },

  { anahtar:'standarda-yakin', ad:'Standarda yakınlık', en:'Fit-to-Standard', konu:'best-practices',
    aciklama:'Süreci sisteme uydurma yaklaşımı: SAP’ın hazır çözümü kabul edilebilir durumdaysa, süreç ona uyarlanır — sistem sürece değil.',
    detay:'Ölçüt duygusal değil ticaridir: **bu farklılık bize rekabet avantajı sağlıyor mu, yoksa yalnızca alışkanlık mı?** Mevzuat gereği olan farklılıklar zaten tartışma dışıdır.\n\n' +
          'Standarttan sapmanın maliyeti tek seferlik değildir: her destek paketi ve sürüm yükseltmesinde {{SPAU}} ile yeniden ele alınır. Bu yüzden {{z-gelistirme}} bir maliyet değil **borçtur** — faizi yıllara yayılır.',
    ilgili:['z-gelistirme','tek-yonlu-kapi'] },

  { anahtar:'z-gelistirme', ad:'Özel geliştirme (Z)', en:'Custom Development', konu:'best-practices',
    aciklama:'Müşteriye özel yazılan program, rapor, alan veya çıkış (`Z*` / `Y*` ad alanı).',
    detay:'Üç seviyesi vardır ve maliyetleri **çok farklıdır**: **①** özel **rapor** — risksiz, standardı değiştirmez · **②** {{badi}} / genişletme noktası — SAP’ın izin verdiği yerden bağlanır, sürüm yükseltmede genelde ayakta kalır · **③** **modifikasyon** — standart kodun değiştirilmesi; her yükseltmede {{SPAU}} ile elle uyarlanır.\n\n' +
          '⚠️ Asıl sorun yazmak değil **envanteri kaybetmektir**: beş yıl sonra hangi geliştirmenin hâlâ kullanıldığı bilinmez ve hepsi yükseltmeye taşınır. Geçiş öncesi kullanım analizi bu yüzden yapılır.',
    ilgili:['standarda-yakin','badi','brownfield'] },

  { anahtar:'badi', ad:'BAdI (iş eklentisi)', en:'Business Add-In', konu:'best-practices',
    aciklama:'SAP’ın standart akış içinde **önceden tanımladığı** genişletme noktası; müşteri kodu standardı değiştirmeden buraya bağlanır.',
    detay:'Tercih sırası: standart ayar → {{badi}} veya genişletme → son çare **modifikasyon**. Aşağı inildikçe sürüm yükseltme maliyeti artar.\n\n' +
          '⚠️ BAdI de bedava değildir: kayıt anında çalıştığı için hatalı bir uygulama **kaydı durdurur** ve hata mesajı çoğu zaman BAdI’yi işaret etmez. Bu yüzden aktif BAdI envanteri, {{konu:dogrulama-ikame}} konusundaki aktif ikame envanteriyle aynı disiplini ister.',
    ilgili:['z-gelistirme','standarda-yakin'] },

  { anahtar:'akim-verisi', ad:'Akım verisi (canlıda değişen ayar)', en:'Current Setting', konu:'best-practices',
    aciklama:'Taşıma isteğine girmeyen, **canlı sistemde doğrudan** değiştirilen yapılandırma tablosu.',
    detay:'Klasik örnekler: {{OB52}} dönem açma/kapama · {{TCURR}} döviz kurları · ihtar tarihleri.\n\n' +
          '⭐ **Bu, "test sisteminde çalışıyordu ama canlıda başka" vakalarının en sık sebebidir.** Ayar taşınmadığı için iki sistem aynı olmak zorunda değildir ve genelde değildir.\n\n' +
          '⚠️ Sonucu bir yetki sorusudur: canlıda özelleştirme kapalıdır ama akım verisi tablolarına yazma yetkisi **açık kalmak zorundadır** — kimin yazabileceği bilinçli olarak seçilmelidir.',
    ilgili:['tasima-istegi','ozellestirme'] },

  { anahtar:'tasima-sirasi', ad:'Taşıma sırası', en:'Transport Sequence', konu:'best-practices',
    aciklama:'Taşıma isteklerinin canlıya **serbest bırakılma sırasıyla** aktarılması kuralı.',
    detay:'Aynı nesneye dokunan iki istek ters sırada taşınırsa, **eski hâl yeniyi ezer** — ve hiçbir hata mesajı çıkmaz. Sonuç: test sisteminde çalışan ayar canlıda çalışmaz.\n\n' +
          'Teşhis: {{E071}}’de iki isteğin ortak nesnesi var mı? Kuyruk sırası {{STMS}}’te görülür.\n\n' +
          '⭐ Önlem tasarımdadır: istekler **küçük ve amaç odaklı** tutulur. "Her şeyi içine atılmış" tek büyük istek, sırası bozulduğunda geri alınamaz.',
    ilgili:['tasima-istegi','akim-verisi'] },

  { anahtar:'regresyon-testi', ad:'Regresyon testi', en:'Regression Test', konu:'best-practices',
    aciklama:'Yeni bir değişikliğin **eskiden çalışan** işlevleri bozmadığını doğrulayan test.',
    detay:'FI’da kritiktir çünkü yapılandırma **paylaşımlıdır**: bir vergi kodunun hesap ataması değiştiğinde ona bağlı her süreç etkilenir.\n\n' +
          '⭐ Kapsam listesi tahmine değil **bağımlılığa** dayanır: değiştirilen tabloya hangi süreçler bakıyor? {{E071}} hangi nesnenin değiştiğini söyler; geri kalanı o nesnenin kullanıldığı yerlerdir.\n\n' +
          'Sabit bir çekirdek küme tutulur: bir satıcı faturası, bir ödeme koşusu, bir müşteri tahsilatı, bir amortisman ve bir kapanış — her taşımadan sonra bunlar koşulur.',
    ilgili:['negatif-test','tasima-sirasi'] },

  { anahtar:'negatif-test', ad:'Negatif test', en:'Negative Testing', konu:'best-practices',
    aciklama:'Sistemin **yapılmaması gerekeni engellediğini** doğrulayan test; "doğru veri doğru sonucu veriyor mu?" değil, "yanlış veri durduruluyor mu?" sorusunu sorar.',
    detay:'⭐ Test senaryolarının asıl değeri buradadır. Mutlu yolu herkes test eder; kontroller ise **yalnızca ihlal edildiklerinde** görünür.\n\n' +
          'Örnekler: kapalı döneme kayıt denenir · zorunlu {{kar-merkezi}} boş bırakılır · bütçe aşılır · dört-göz kuralı tek kullanıcıyla denenir · dengesiz belge kaydedilmeye çalışılır.\n\n' +
          '⚠️ Kurulan her {{konu:dogrulama-ikame}} kuralının negatif testi **zorunludur** — çünkü etkinleştirilmemiş bir kural sessizce hiçbir şey yapmaz ve pozitif test bunu göstermez.',
    ilgili:['regresyon-testi','dort-goz'] },

  /* ================================ S/4HANA yenilikleri partisi === */

  { anahtar:'bellek-ici', ad:'Bellek içi veritabanı', en:'In-Memory Database (HANA)', konu:'s4-yenilikleri',
    aciklama:'Verinin diskten değil **bellekten** ve satır yerine **sütun** düzeninde okunduğu veritabanı mimarisi.',
    detay:'Önemi teknik değil **mimaridir**: eski SAP tasarımındaki pek çok yapı, "diskten okumak pahalıdır" kısıtını aşmak için vardı — {{toplam-tablosu}}, indeks tabloları, gecelik toplu işler.\n\n' +
          '⭐ **Kısıt kalkınca çözüm gereksizleşti.** S/4HANA’daki basitleştirmelerin çoğu yeni bir özellik değil, **artık gereksiz olan bir çözümün kaldırılmasıdır**.\n\n' +
          '⚠️ Hız kendiliğinden gelmez: eski tabloları okuyan {{z-gelistirme}} {{uyumluluk-view}} üzerinden çalışır ve **yavaşlayabilir**.',
    ilgili:['toplam-tablosu','uyumluluk-view','evrensel-kayit-defteri'] },

  { anahtar:'toplam-tablosu', ad:'Toplam ve indeks tablosu', en:'Aggregate / Index Table', konu:'s4-yenilikleri',
    aciklama:'Sorguyu hızlandırmak için **önceden hesaplanıp saklanan** bakiye ({{GLT0}}, {{FAGLFLEXT}}, {{KNC1}}, {{LFC1}}) veya farklı anahtarla kopyalanan kalem ({{BSIK}}, {{BSID}}, {{BSIS}}) tablosu.',
    detay:'İki dezavantajı vardı: **yer** kaplarlar ve **tutarsızlaşabilirler** — güncelleme yarıda kalırsa toplam ile kalemler ayrışır ve mutabakat programları bu yüzden vardı.\n\n' +
          '{{bellek-ici}} veritabanında toplamı **her seferinde hesaplamak** yeterince hızlı olduğu için bu tablolar kaldırıldı; yerlerine {{uyumluluk-view}} kondu.\n\n' +
          '⭐ Kazanç yalnızca yer değil **tutarlılıktır**: hesaplanan bir toplam, kalemlerle ayrışamaz.',
    ilgili:['bellek-ici','uyumluluk-view','evrensel-kayit-defteri'] },

  { anahtar:'gomulu-analitik', ad:'Gömülü analitik', en:'Embedded Analytics', konu:'s4-yenilikleri',
    aciklama:'Raporlamanın ayrı bir veri ambarına aktarım gerektirmeden, **işlem verisinin üstünde** ve canlı olarak çalışması.',
    detay:'Teknik dayanağı {{cds-view}}lerdir: veri kopyalanmaz, tanımlanmış görünümler üzerinden okunur.\n\n' +
          'Pratik sonucu **gecikmenin kalkmasıdır**: klasik kurgu gece aktarır, rapor ertesi gün doğrudur. Gömülü analitikte rapor **şu anki** veriyi gösterir.\n\n' +
          '⚠️ Ambarın yerini tamamen almaz: birden çok kaynak sistemin birleştirilmesi ve uzun tarihçe hâlâ ayrı bir çözüm ister.',
    ilgili:['cds-view','fiori','bellek-ici'] },

  { anahtar:'fiori', ad:'SAP Fiori', en:'SAP Fiori', konu:'s4-yenilikleri',
    aciklama:'SAP’ın rol bazlı, görev odaklı web arayüzü; klasik SAP GUI ekranlarının yerine geçen kullanıcı katmanı.',
    detay:'⚠️ Fiori *"yeni görünümlü GUI"* değildir: klasik ekran **işlem** merkezliydi (bir ekranda çok iş), Fiori **görev** merkezlidir (bir uygulama bir iş).\n\n' +
          'Danışman açısından iki sonucu var: rol tasarımı artık aynı zamanda **arayüz tasarımıdır** (kullanıcı yalnızca rolündeki uygulamaları görür); ve pek çok Fiori uygulaması arka planda **aynı** işlem kodunu çağırdığı için yapılandırma bilgisi aynen geçerlidir.\n\n' +
          'Klasik işlemler kaldırılmadı — Fiori başlatıcıdan çağrılabilirler.',
    ilgili:['gomulu-analitik'] },

  { anahtar:'merkezi-finans', ad:'Merkezi Finans', en:'Central Finance', konu:'s4-yenilikleri',
    aciklama:'Mevcut ERP sistemleri yerinde kalırken, belgelerinin **kopyalarının** merkezi bir S/4HANA sistemine akıtılması yaklaşımı.',
    detay:'Kaynak sistemler (SAP veya SAP dışı) çalışmaya devam eder; merkezi sistem yalnızca **raporlama ve konsolidasyon** için beslenir.\n\n' +
          'Çok şirketli gruplarda geçişi **parçalara bölmenin** yoludur: hiçbir şirket kodunu durdurmadan grup raporlaması S/4HANA’ya taşınır, dönüşüm sonraya bırakılır.\n\n' +
          '⚠️ Kendi başına bir geçiş değil, bir **köprüdür**: eşleme (hesap planı, şirket kodu, maliyet nesnesi) kurulmadan çalışmaz ve eşlemenin bakımı süreklidir.',
    ilgili:['greenfield','brownfield'] },
]);
