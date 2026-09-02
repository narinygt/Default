/**
 * ARAYÜZ METİNLERİ — gezinme, butonlar, form, çerez banner'ı, footer.
 * =================================================================
 * İngilizce sürüm Türkçenin birebir çevirisi DEĞİLDİR. Türkçe metin
 * yerel kurumsal alıcıya, İngilizce metin çokuluslu şirketlere ve
 * yurt dışı alıcıya hitap eder; cümleler o kitleye göre yeniden
 * yazılmıştır.
 *
 * SAP terminolojisi her iki dilde de İngilizce orijinaliyle kalır
 * (Public Cloud, Private Cloud, S/4HANA, RISE with SAP).
 */
import type { Lang } from './routes';

export const ui = {
  tr: {
    nav: {
      solutions: 'Çözümler',
      approach: 'Yaklaşımımız',
      about: 'Hakkımızda',
      contact: 'İletişim',
      menu: 'Menü',
      openMenu: 'Menüyü aç',
      closeMenu: 'Menüyü kapat',
      solutionsOverview: 'Tüm çözümlere genel bakış',
    },
    cta: {
      primary: 'Bize yazın',
      secondary: 'Çözümleri inceleyin',
      details: 'Detaylar',
      backHome: 'Ana sayfaya dönün',
      allSolutions: 'Tüm çözümler',
    },
    lang: {
      switchTo: 'Switch to English',
      label: 'Dil',
    },
    a11y: {
      skipToContent: 'İçeriğe geç',
      breadcrumb: 'Sayfa yolu',
      mainNav: 'Ana menü',
      footerNav: 'Alt menü',
      homeLink: 'CPeak Consultancy — ana sayfa',
    },
    footer: {
      tagline:
        'SAP finans modülleri ve SAP bulut mimarisi üzerine çalışan bağımsız bir danışmanlık şirketi.',
      solutions: 'Çözümler',
      company: 'Kurumsal',
      contact: 'İletişim',
      rights: 'Tüm hakları saklıdır.',
      hours: 'Çalışma saatleri',
      hoursValue: 'Pazartesi–Cuma, 09:00–18:00 (TSİ)',
      trademark:
        'SAP, S/4HANA ve RISE with SAP, SAP SE’nin Almanya ve diğer ülkelerdeki tescilli ticari markalarıdır. CPeak Consultancy bağımsız bir danışmanlık şirketidir ve SAP SE ile bağlantılı değildir.',
      registryTitle: 'Ticaret sicil bilgileri',
    },
    common: {
      todoNote: 'doldurulacak',
      readMore: 'Devamını okuyun',
      illustrative: 'Temsili senaryo',
      illustrativeNote:
        'Aşağıdaki kartlar gerçek müşteri vakası değildir. Hizmetin nasıl işlediğini göstermek için hazırlanmış temsili örneklerdir.',
      faq: 'Sık sorulan sorular',
      onThisPage: 'Bu sayfada',
      typicalDuration: 'Tipik süre',
      teamStructure: 'Ekip yapısı',
      deliverables: 'Teslim edilenler',
      whoFor: 'Bu hizmet kimin için',
      challenges: 'Karşılaştığınız zorluklar',
      whatWeDo: 'Ne yapıyoruz',
      aiRole: 'Yapay zekanın rolü',
      otherSolutions: 'Diğer çözümler',
      references: 'Referanslar',
      openInMapsAria: 'Adresi Google Haritalar’da aç (yeni sekmede)',
    },
    form: {
      title: 'Projenizi anlatın',
      intro:
        'Formu doldurun, bir iş günü içinde size dönelim. Ne kadar somut yazarsanız, ilk görüşmede o kadar hızlı ilerleriz.',
      name: 'Ad ve soyadı',
      email: 'Kurumsal e-posta',
      phone: 'Telefon',
      phoneOptional: 'isteğe bağlı',
      company: 'Şirket',
      role: 'Görev / unvan',
      topic: 'İlgilendiğiniz konu',
      sapStatus: 'Mevcut SAP durumunuz',
      message: 'Mesajınız',
      required: 'zorunlu',
      choose: 'Seçin',
      submit: 'Mesajı gönder',
      submitting: 'Gönderiliyor…',
      kvkkLabel: 'Kişisel verilerimin',
      kvkkLinkText: 'aydınlatma metninde',
      kvkkLabelEnd: 'belirtilen kapsamda işlenmesini kabul ediyorum.',
      marketingLabel:
        'CPeak Consultancy’nin hizmetleri hakkında ticari elektronik ileti almak istiyorum. (İsteğe bağlı)',
      messagePlaceholder:
        'Mevcut durumunuz, hedefiniz ve varsa zaman kısıtınız hakkında birkaç cümle yazmanız yeterli.',
      successTitle: 'Mesajınız ulaştı.',
      successBody: 'Bir iş günü içinde dönüş yapıyoruz.',
      errorTitle: 'Mesaj gönderilemedi.',
      errorBody:
        'Bağlantı kaynaklı geçici bir sorun olabilir. Tekrar deneyin ya da doğrudan e-posta gönderin.',
      topicOptions: {
        finance: 'SAP Finans Modülleri',
        s4hana: 'S/4HANA Dönüşümü',
        publicCloud: 'SAP Public Cloud',
        privateCloud: 'SAP Private Cloud',
        ai: 'Yapay Zeka ile Finans',
        other: 'Diğer',
      },
      statusOptions: {
        ecc: 'SAP ECC kullanıyoruz',
        s4: 'S/4HANA’dayız',
        none: 'SAP kullanmıyoruz',
        evaluating: 'Değerlendirme aşamasındayız',
      },
      errors: {
        nameRequired: 'Ad ve soyadınızı yazın.',
        emailRequired: 'Kurumsal e-posta adresinizi yazın.',
        emailInvalid: 'Kurumsal e-posta adresi girin. Örnek: ad.soyad@sirket.com',
        companyRequired: 'Şirket adını yazın.',
        topicRequired: 'İlgilendiğiniz konuyu seçin.',
        messageRequired: 'Kısaca ne konuşmak istediğinizi yazın.',
        messageTooShort: 'Birkaç cümle daha yazın — en az 20 karakter.',
        kvkkRequired: 'Devam etmek için aydınlatma metnini onaylamanız gerekir.',
        phoneInvalid: 'Telefon numarasını kontrol edin. Örnek: +90 5xx xxx xx xx',
      },
    },
    cookies: {
      title: 'Çerez tercihleriniz',
      body:
        'Sitenin çalışması için zorunlu çerezleri kullanıyoruz. Ziyaret istatistiklerini ölçen analitik çerezler ise yalnızca siz onay verirseniz çalışır.',
      accept: 'Tümünü kabul et',
      reject: 'Tümünü reddet',
      save: 'Seçimimi kaydet',
      settings: 'Ayarlar',
      necessary: 'Zorunlu çerezler',
      necessaryDesc:
        'Sitenin görüntülenmesi ve çerez tercihinizin hatırlanması için gereklidir. Kapatılamaz.',
      analytics: 'Analitik çerezler',
      analyticsDesc:
        'Hangi sayfaların okunduğunu anonim olarak ölçer. Reddederseniz site aynı şekilde çalışır.',
      alwaysOn: 'Her zaman açık',
      policyLink: 'Gizlilik politikası',
    },
  },

  en: {
    nav: {
      solutions: 'Solutions',
      approach: 'Approach',
      about: 'About',
      contact: 'Contact',
      menu: 'Menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      solutionsOverview: 'Solutions overview',
    },
    cta: {
      primary: 'Get in touch',
      secondary: 'Explore solutions',
      details: 'Read more',
      backHome: 'Back to home',
      allSolutions: 'All solutions',
    },
    lang: {
      switchTo: 'Türkçe sürüme geçin',
      label: 'Language',
    },
    a11y: {
      skipToContent: 'Skip to content',
      breadcrumb: 'Breadcrumb',
      mainNav: 'Main navigation',
      footerNav: 'Footer navigation',
      homeLink: 'CPeak Consultancy — home',
    },
    footer: {
      tagline:
        'An independent consultancy working on SAP finance modules and SAP cloud architecture.',
      solutions: 'Solutions',
      company: 'Company',
      contact: 'Contact',
      rights: 'All rights reserved.',
      hours: 'Office hours',
      hoursValue: 'Monday–Friday, 09:00–18:00 (GMT+3)',
      trademark:
        'SAP, S/4HANA and RISE with SAP are registered trademarks of SAP SE in Germany and other countries. CPeak Consultancy is an independent consultancy and is not affiliated with SAP SE.',
      registryTitle: 'Company registration',
    },
    common: {
      todoNote: 'to be provided',
      readMore: 'Read more',
      illustrative: 'Illustrative scenario',
      illustrativeNote:
        'The scenarios below are not real client cases. They are illustrative examples that show how the engagement works in practice.',
      faq: 'Frequently asked questions',
      onThisPage: 'On this page',
      typicalDuration: 'Typical duration',
      teamStructure: 'Team structure',
      deliverables: 'What you receive',
      whoFor: 'Who this is for',
      challenges: 'Problems this solves',
      whatWeDo: 'What we do',
      aiRole: 'Where AI fits in',
      otherSolutions: 'Other solutions',
      references: 'References',
      openInMapsAria: 'Open the address in Google Maps (new tab)',
    },
    form: {
      title: 'Tell us about your project',
      intro:
        'Send us the outline and we will respond within one business day. The more specific you are, the more useful the first conversation will be.',
      name: 'Full name',
      email: 'Work email',
      phone: 'Phone',
      phoneOptional: 'optional',
      company: 'Company',
      role: 'Role / title',
      topic: 'What you want to discuss',
      sapStatus: 'Your current SAP landscape',
      message: 'Your message',
      required: 'required',
      choose: 'Select',
      submit: 'Send message',
      submitting: 'Sending…',
      kvkkLabel: 'I agree that my personal data may be processed as described in the',
      kvkkLinkText: 'privacy notice',
      kvkkLabelEnd: '.',
      marketingLabel:
        'I would like to receive occasional email from CPeak Consultancy about its services. (optional)',
      messagePlaceholder:
        'A few sentences on where you are today, what you want to achieve, and any timing constraints.',
      successTitle: 'Your message has reached us.',
      successBody: 'We respond within one business day.',
      errorTitle: 'The message could not be sent.',
      errorBody:
        'This may be a temporary connection problem. Please try again, or email us directly.',
      topicOptions: {
        finance: 'SAP Finance Modules',
        s4hana: 'S/4HANA Transformation',
        publicCloud: 'SAP Public Cloud',
        privateCloud: 'SAP Private Cloud',
        ai: 'AI in Finance',
        other: 'Something else',
      },
      statusOptions: {
        ecc: 'We run SAP ECC',
        s4: 'We are already on S/4HANA',
        none: 'We do not use SAP',
        evaluating: 'We are still evaluating',
      },
      errors: {
        nameRequired: 'Enter your first and last name.',
        emailRequired: 'Enter your work email address.',
        emailInvalid: 'Enter a valid work email address. Example: name.surname@company.com',
        companyRequired: 'Enter your company name.',
        topicRequired: 'Choose the topic you want to discuss.',
        messageRequired: 'Tell us briefly what you would like to discuss.',
        messageTooShort: 'Please add a little more detail — at least 20 characters.',
        kvkkRequired: 'You need to accept the privacy notice before sending.',
        phoneInvalid: 'Check the phone number. Example: +90 5xx xxx xx xx',
      },
    },
    cookies: {
      title: 'Cookie preferences',
      body:
        'We use strictly necessary cookies to make the site work. Analytics cookies, which measure which pages get read, run only if you allow them.',
      accept: 'Accept all',
      reject: 'Reject all',
      save: 'Save my choice',
      settings: 'Settings',
      necessary: 'Strictly necessary',
      necessaryDesc:
        'Required to display the site and to remember your cookie choice. Cannot be switched off.',
      analytics: 'Analytics',
      analyticsDesc:
        'Measures anonymously which pages are read. The site works exactly the same if you decline.',
      alwaysOn: 'Always on',
      policyLink: 'Cookie policy',
    },
  },
} as const;

export type UI = (typeof ui)['tr'];

/** Verilen dilin metin sözlüğünü döndürür. */
export const t = (lang: Lang): UI => ui[lang] as UI;
