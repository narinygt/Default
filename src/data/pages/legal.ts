import type { Lang } from '@/i18n/routes';

/**
 * HUKUKİ SAYFALAR — KVKK aydınlatma metni ve çerez/gizlilik politikası.
 * =================================================================
 * ⚠ ÖNEMLİ: Bu metinler, sitenin gerçekte ne yaptığını doğru biçimde
 * tarif eden ÇALIŞMA TASLAKLARIDIR; hukuki görüş değildir. Yayına
 * çıkmadan önce bir hukuk danışmanı tarafından gözden geçirilmeli ve
 * şirketinizin gerçek veri işleme faaliyetiyle karşılaştırılmalıdır.
 * Sayfaların üstünde bu uyarı ziyaretçiye DEĞİL, yalnızca siz metni
 * onaylayana kadar size görünecek biçimde `reviewNotice` alanında
 * tutulur — onay sonrası bu alanı boş bırakmanız yeterlidir.
 */

export interface LegalSection {
  h2: string;
  body?: readonly string[];
  items?: readonly string[];
  /** Anahtar/değer listesi — hak listesi, çerez tablosu vb. */
  pairs?: readonly { term: string; def: string }[];
}

export interface LegalContent {
  meta: { title: string; description: string };
  hero: { h1: string; lead: string };
  /** Boş bırakılırsa uyarı kutusu görünmez. Hukuk onayı sonrası boşaltın. */
  reviewNotice: string;
  lastUpdated: string;
  sections: readonly LegalSection[];
}

/* ------------------------------------------------------------------ */
/* KVKK AYDINLATMA METNİ / PRIVACY NOTICE                             */
/* ------------------------------------------------------------------ */

export const privacy: Record<Lang, LegalContent> = {
  tr: {
    meta: {
      title: 'KVKK Aydınlatma Metni | CPeak Consultancy',
      description:
        'Kişisel verilerin işlenmesine ilişkin aydınlatma metni: hangi veriler, hangi amaçla, hangi hukuki sebeple işlenir ve KVKK kapsamındaki haklarınız.',
    },
    hero: {
      h1: 'KVKK Aydınlatma Metni',
      lead:
        '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, bu sitede kişisel verilerinizin nasıl işlendiğini açıklar.',
    },
    reviewNotice: '',
    lastUpdated: 'Son güncelleme',
    sections: [
      {
        h2: 'Veri sorumlusu',
        body: [
          'Kişisel verileriniz, veri sorumlusu sıfatıyla CPeak Consultancy tarafından işlenmektedir. Adres ve iletişim bilgileri sayfanın alt bölümünde yer almaktadır.',
        ],
      },
      {
        h2: 'İşlenen kişisel veriler',
        body: [
          'Bu sitede kişisel veri yalnızca iletişim formunu doldurmanız halinde toplanır. Formu doldurmadan siteyi gezmeniz durumunda kimliğinizi belirleyecek bir veri toplanmaz.',
        ],
        items: [
          'Kimlik verisi: ad ve soyad',
          'İletişim verisi: kurumsal e-posta adresi, varsa telefon numarası',
          'Mesleki veri: çalıştığınız şirket, görev veya unvan bilginiz',
          'Talep içeriği: ilgilendiğiniz konu, mevcut SAP durumunuz ve mesaj metninizde paylaştığınız bilgiler',
          'İşlem güvenliği verisi: form gönderim zamanı ve spam kontrolü amacıyla işlenen teknik kayıtlar',
        ],
      },
      {
        h2: 'İşleme amaçları',
        items: [
          'Talebinizin değerlendirilmesi ve size dönüş yapılması',
          'Hizmetlerimizin kapsamı hakkında bilgi verilmesi ve teklif süreçlerinin yürütülmesi',
          'Ayrıca ve açıkça onay vermeniz halinde, hizmetlerimize ilişkin ticari elektronik ileti gönderilmesi',
          'Form altyapısının kötüye kullanımının önlenmesi ve bilgi güvenliğinin sağlanması',
        ],
      },
      {
        h2: 'Hukuki sebepler',
        body: [
          'Kişisel verileriniz, KVKK’nın 5. maddesinde belirtilen hukuki sebeplere dayanılarak işlenir:',
        ],
        items: [
          'Sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması (talebinizin değerlendirilmesi ve teklif süreci)',
          'Veri sorumlusunun meşru menfaati (iletişim taleplerinin yönetimi ve bilgi güvenliği)',
          'Açık rızanız (yalnızca ticari elektronik ileti gönderimi bakımından)',
        ],
      },
      {
        h2: 'Toplama yöntemi',
        body: [
          'Kişisel verileriniz, bu sitedeki iletişim formunu doldurmanız yoluyla elektronik ortamda toplanır. Formu göndermeniz dışında kimliğinizi belirleyen bir veri toplanmaz.',
        ],
      },
      {
        h2: 'Aktarım',
        body: [
          'Kişisel verileriniz, hizmetin yürütülmesi için gerekli olduğu ölçüde e-posta ve barındırma hizmeti sağlayıcılarımızla paylaşılabilir. Bu sağlayıcılar veri işleyen sıfatıyla hareket eder ve verilerinizi yalnızca bizim talimatımızla işler. Yurt dışına aktarım söz konusu olduğunda KVKK’nın 9. maddesindeki şartlara uyulur.',
          'Kişisel verileriniz pazarlama amacıyla üçüncü taraflara satılmaz veya devredilmez.',
        ],
      },
      {
        h2: 'Saklama süresi',
        body: [
          'İletişim talebiniz kapsamında toplanan veriler, talebin sonuçlandırılmasının ardından ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanır ve bu sürenin sonunda silinir, yok edilir veya anonim hale getirilir. Ticari elektronik ileti onayı verdiyseniz, bu onaya ilişkin kayıt onayınızı geri çekene kadar ve sonrasında mevzuatın öngördüğü süre boyunca saklanır.',
        ],
      },
      {
        h2: 'KVKK kapsamındaki haklarınız',
        body: ['Kanunun 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:'],
        items: [
          'Kişisel verinizin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme',
          'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
          'Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme',
          'Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme',
          'Kanundaki şartlar çerçevesinde silinmesini veya yok edilmesini isteme',
          'Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme',
          'Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonuç ortaya çıkmasına itiraz etme',
          'Kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme',
        ],
      },
      {
        h2: 'Başvuru yolu',
        body: [
          'Haklarınıza ilişkin taleplerinizi, sayfanın alt bölümünde yer alan e-posta adresine ya da şirket adresine yazılı olarak iletebilirsiniz. Talebiniz, niteliğine göre en geç otuz gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi halinde Kurul tarafından belirlenen tarifeye göre ücret talep edilebilir.',
        ],
      },
    ],
  },

  en: {
    meta: {
      title: 'Privacy notice | CPeak Consultancy',
      description:
        'How personal data submitted through this site is processed: what we collect, why, on what legal basis, how long we keep it, and your rights.',
    },
    hero: {
      h1: 'Privacy notice',
      lead:
        'How personal data you submit through this website is collected and processed, and what rights you have over it.',
    },
    reviewNotice: '',
    lastUpdated: 'Last updated',
    sections: [
      {
        h2: 'Data controller',
        body: [
          'Your personal data is processed by CPeak Consultancy, acting as data controller. Our address and contact details appear at the bottom of this page.',
        ],
      },
      {
        h2: 'What we collect',
        body: [
          'Personal data is collected on this site only if you complete the contact form. Browsing the site without submitting the form does not create an identifiable record of you.',
        ],
        items: [
          'Identity: your name',
          'Contact: work email address and, if you provide one, telephone number',
          'Professional: your company and your role or title',
          'Enquiry content: the topic selected, your current SAP landscape and anything you write in the message field',
          'Security: submission timestamp and technical records processed for spam prevention',
        ],
      },
      {
        h2: 'Why we process it',
        items: [
          'To assess your enquiry and respond to it',
          'To provide information about our services and to run proposal processes',
          'Where you have separately and explicitly opted in, to send you occasional email about our services',
          'To prevent misuse of the form and maintain information security',
        ],
      },
      {
        h2: 'Legal basis',
        body: ['We rely on the following bases:'],
        items: [
          'Steps taken at your request prior to entering into a contract — assessing your enquiry and preparing a proposal',
          'Our legitimate interest in managing enquiries and securing our systems',
          'Your consent, used solely for marketing email and withdrawable at any time',
        ],
      },
      {
        h2: 'How we collect it',
        body: [
          'Personal data is collected electronically through the contact form on this site. We do not collect identifying data by any other means on this website.',
        ],
      },
      {
        h2: 'Sharing',
        body: [
          'Your data may be shared with our email and hosting service providers to the extent necessary to operate the service. These providers act as processors and handle the data only on our instructions. Where any transfer outside Türkiye takes place, it is carried out under the safeguards required by applicable law.',
          'We do not sell or transfer your personal data to third parties for marketing purposes.',
        ],
      },
      {
        h2: 'Retention',
        body: [
          'Data collected through an enquiry is retained for the limitation periods set out in applicable legislation after the enquiry is concluded, and is then deleted, destroyed or anonymised. If you opted in to marketing email, the record of that consent is kept until you withdraw it and thereafter for the period required by law.',
        ],
      },
      {
        h2: 'Your rights',
        body: ['You have the right to:'],
        items: [
          'Learn whether your personal data is being processed and request information about that processing',
          'Learn the purpose of processing and whether the data is used in line with that purpose',
          'Know the third parties to whom the data is transferred, domestically or abroad',
          'Request correction where data is incomplete or inaccurate',
          'Request erasure or destruction within the conditions set out in law',
          'Request that correction, erasure or destruction be notified to third parties to whom the data was transferred',
          'Object to a decision produced solely by automated analysis that has an adverse effect on you',
          'Claim compensation for damage arising from unlawful processing',
        ],
      },
      {
        h2: 'How to make a request',
        body: [
          'Send requests relating to your rights to the email address at the bottom of this page, or in writing to the company address. Requests are concluded free of charge within thirty days. Where a request requires additional cost, a fee may be charged in line with the applicable published tariff.',
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* ÇEREZ / GİZLİLİK POLİTİKASI — COOKIE POLICY                        */
/* ------------------------------------------------------------------ */

export const cookies: Record<Lang, LegalContent> = {
  tr: {
    meta: {
      title: 'Gizlilik Politikası ve Çerezler | CPeak Danışmanlık',
      description:
        'Bu sitede kullanılan çerezler, kategorileri, saklama süreleri ve çerez tercihlerinizi nasıl değiştirebileceğiniz.',
    },
    hero: {
      h1: 'Gizlilik Politikası ve Çerezler',
      lead:
        'Bu sitenin hangi çerezleri kullandığını, ne işe yaradıklarını ve tercihlerinizi nasıl değiştirebileceğinizi açıklar.',
    },
    reviewNotice: '',
    lastUpdated: 'Son güncelleme',
    sections: [
      {
        h2: 'Çerez nedir?',
        body: [
          'Çerezler, bir siteyi ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Sitenin çalışması, tercihlerinizin hatırlanması ve ziyaret istatistiklerinin ölçülmesi gibi amaçlarla kullanılırlar.',
        ],
      },
      {
        h2: 'Bu sitede kullanılan çerezler',
        body: [
          'Bu site mümkün olan en az çerezle çalışacak biçimde kurulmuştur. Zorunlu olmayan hiçbir çerez, siz onay vermeden çalıştırılmaz.',
        ],
        pairs: [
          {
            term: 'Zorunlu çerezler',
            def: 'Sitenin görüntülenmesi ve çerez tercihinizin hatırlanması için gereklidir. Tercihiniz tarayıcınızın yerel depolama alanında saklanır ve sunucumuza gönderilmez. Bu kategori kapatılamaz; kapatılması halinde tercih ekranı her ziyarette yeniden görünür.',
          },
          {
            term: 'Analitik çerezler',
            def: 'Hangi sayfaların okunduğunu ve ziyaretçilerin siteyi nasıl kullandığını anonim biçimde ölçer. Yalnızca açık onayınızdan sonra yüklenir. Reddetmeniz halinde site tamamen aynı şekilde çalışır; hiçbir işlev kısıtlanmaz.',
          },
          {
            term: 'Pazarlama / hedefleme çerezleri',
            def: 'Bu sitede kullanılmamaktadır. Reklam ağı izleyicisi, sosyal medya piksel kodu veya üçüncü taraf hedefleme çerezi bulunmaz.',
          },
        ],
      },
      {
        h2: 'Tercihlerinizi değiştirme',
        body: [
          'Çerez tercihinizi istediğiniz zaman değiştirebilirsiniz. Tarayıcınızın site verilerini temizlemeniz halinde tercihiniz sıfırlanır ve bir sonraki ziyaretinizde onay ekranı yeniden görünür. Ayrıca tarayıcı ayarlarınızdan çerezleri tümüyle engelleyebilirsiniz; bu durumda sitenin okunabilirliği etkilenmez.',
        ],
      },
      {
        h2: 'Sunucu kayıtları',
        body: [
          'Barındırma sağlayıcımız, tüm web sunucularında olduğu gibi teknik erişim kayıtları tutabilir. Bu kayıtlar güvenlik ve hata ayıklama amacıyla işlenir ve pazarlama amacıyla kullanılmaz.',
        ],
      },
      {
        h2: 'İletişim formu',
        body: [
          'İletişim formu aracılığıyla paylaştığınız kişisel veriler bu politikanın değil, KVKK Aydınlatma Metni’nin konusudur. Formun nasıl işlediğine ilişkin ayrıntı için aydınlatma metnine bakınız.',
        ],
      },
    ],
  },

  en: {
    meta: {
      title: 'Cookie policy | CPeak Consultancy',
      description:
        'Which cookies this site uses, what each category does, how long preferences are stored and how to change them.',
    },
    hero: {
      h1: 'Cookie policy',
      lead:
        'What this site stores in your browser, what each category is for, and how to change your choice.',
    },
    reviewNotice: '',
    lastUpdated: 'Last updated',
    sections: [
      {
        h2: 'What cookies are',
        body: [
          'Cookies are small text files stored in your browser when you visit a site. They are used to make the site work, to remember your preferences, and to measure how the site is used.',
        ],
      },
      {
        h2: 'What this site uses',
        body: [
          'This site is built to run on as few cookies as possible. Nothing beyond the strictly necessary category runs before you allow it.',
        ],
        pairs: [
          {
            term: 'Strictly necessary',
            def: 'Required to display the site and to remember your cookie choice. Your preference is held in your browser’s local storage and is not sent to our server. This category cannot be switched off; without it the preference banner reappears on every visit.',
          },
          {
            term: 'Analytics',
            def: 'Measures anonymously which pages are read and how visitors move through the site. Loaded only after you explicitly allow it. If you decline, the site behaves in exactly the same way and no functionality is withheld.',
          },
          {
            term: 'Marketing and targeting',
            def: 'Not used on this site. There are no advertising network trackers, social media pixels or third-party targeting cookies.',
          },
        ],
      },
      {
        h2: 'Changing your choice',
        body: [
          'You can change your cookie preference at any time. Clearing site data in your browser resets the preference and the banner appears again on your next visit. You can also block cookies entirely in your browser settings; doing so does not affect the readability of this site.',
        ],
      },
      {
        h2: 'Server logs',
        body: [
          'As with any web server, our hosting provider may keep technical access logs. These are processed for security and troubleshooting and are not used for marketing.',
        ],
      },
      {
        h2: 'The contact form',
        body: [
          'Personal data you submit through the contact form is covered by the privacy notice rather than this policy. See the privacy notice for details on how the form is handled.',
        ],
      },
    ],
  },
};
