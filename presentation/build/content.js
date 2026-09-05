// CPeak Consultancy — deck copy, EN + TR.
// Turkish follows the register of the site's own Turkish content.
// No pricing, cost, fee or budget information appears anywhere in either deck.
module.exports = {
  en: {
    file: 'CPeak-Consultancy-Corporate-Presentation-EN.pptx',
    footerName: 'CPEAK CONSULTANCY', gate: 'GATE',
    s1: {
      eyebrow: 'SAP FINANCE  ·  CLOUD ARCHITECTURE  ·  APPLIED AI',
      h: 'Finance-led\nSAP transformation.', hSize: 44, hLead: 51,
      sub: 'Independent, and deliberately narrow: the hardest decisions are the ones we do ourselves.',
      meta: ['ISTANBUL', 'TÜRKİYE · EMEA · UNITED STATES', 'INDEPENDENT SINCE 2021'],
      notes: 'CPeak is an independent SAP consultancy specialising end to end in finance modules, cloud architecture and applied AI. Founded 2021, Istanbul.'
    },
    s2: {
      eyebrow: 'Positioning', title: 'Depth over breadth.', titleSize: 40, titleW: 6.0,
      body: 'Broad scope sold, a specialist sourced per area — and the hardest decision lands with whoever has seen it least.',
      quote: 'If we take an engagement, we are not subcontracting the difficult part of it.',
      usual: 'THE USUAL SHAPE', usualCap: 'wide scope · borrowed depth',
      ours: 'OURS', oursCap: 'narrow scope · owned depth',
      rungs: ['Enterprise structure and chart of accounts', 'Controlling, margin and project accounting',
        'The close, rebuilt as parallel steps', 'Cloud model, measured not advocated'],
      notes: 'CPeak stays inside finance modules and cloud architecture rather than selling broad scope and subcontracting the difficult parts.'
    },
    s3: {
      eyebrow: 'The challenge',
      title: 'Early decisions,\nlasting consequences.', titleSize: 34, titleW: 6.3,
      body: 'Enterprise structure. Conversion route. Cloud model. Decided in the first weeks, lived with for a decade.',
      quote: 'Advice given without measurement is a guess — and you are the one who lives with it.',
      chartLabel: 'HOW HARD THE DECISION IS TO REVERSE',
      phases: ['DESIGN', 'BUILD', 'TEST', 'IN OPERATION'],
      decided: 'decided here', paid: 'lived with here',
      notes: 'The decisions with the longest half-life are taken at the point of least evidence.'
    },
    s4: {
      eyebrow: 'Our practice', title: 'Three disciplines, one practice.', titleSize: 40, titleW: 11.0,
      kicker: 'Most SAP problems live in the seams between these three.',
      cols: [
        { t: 'THE FINANCE PROCESS', h: 'How the books actually close', b: 'FI, CO, PA and PS — structure, costing, margin, the close.' },
        { t: 'THE PLATFORM', h: 'The ground it has to run on', b: 'ECC, S/4HANA, Private and Public Cloud — compared, not advocated.' },
        { t: 'THE AUTOMATION', h: 'What can stop being manual', b: 'Matching, anomaly detection, predictive accounting — measured before enabling.' }
      ],
      outcome: 'A decision that still looks right in year three',
      notes: 'The three areas meet and each informs the others — the convergence is the positioning.'
    },
    s5: {
      eyebrow: 'Method', title: 'Evidence before advice.', titleSize: 40, titleW: 9.2,
      described: 'THE PROCESS AS DESCRIBED', executed: 'THE PROCESS AS EXECUTED',
      gap: 'the gap is where\nthe findings are',
      rightBold: 'Usage statistics. Data quality. Custom code. Close durations.',
      rightBody: 'What the system does — not what the documentation says. The gap between them is usually the problem.',
      metaText: 'Every engagement opens with an assessment', metaNum: '2–6\nWEEKS',
      notes: 'Measure before recommending.'
    },
    s6: {
      eyebrow: 'Cloud model',
      title: 'A measured cloud decision.', titleSize: 40, titleW: 11.0,
      cols: [
        { t: 'PUBLIC CLOUD', h: 'You adopt the standard.', b: 'Speed and low operational overhead — for a core you cannot modify.', m: '3–5 months', ml: 'single-country finance deployment' },
        { t: 'PRIVATE CLOUD', h: 'You keep your process logic.', b: 'Your own developments kept — for more responsibility and a longer build.', m: '7–14 months', ml: 'depending on scope and inherited landscape' }
      ],
      bottom: 'Neither is the advanced version of the other. We put both constraints side by side; the decision stays yours.',
      notes: 'Cloud-model neutrality: fit measured against standard scope, reasoning documented.'
    },
    s7: {
      eyebrow: 'Delivery model', title: 'Four stages,\nfour deliverables.', titleSize: 36, titleW: 7.0,
      note: 'Every stage’s output is agreed before it starts. At each gate the decision is taken again.',
      stages: [
        { t: 'Assessment', d: 'Diagnostic report, read from system data', w: '2–6 weeks' },
        { t: 'Architecture\nand roadmap', d: 'Target architecture and phased roadmap', w: '3–6 weeks' },
        { t: 'Delivery', d: 'Working system, test records, cutover plan', w: '3–14 months' },
        { t: 'Hypercare', d: 'First close run together, improvement backlog', w: '4–12 weeks' }
      ],
      notes: 'Four stages, each closing on a defined deliverable.'
    },
    s8: {
      eyebrow: 'Business value', title: 'From capability to outcome.', titleSize: 40, titleW: 11.0,
      heads: ['WHAT WE BRING', 'WHAT WE DO WITH IT', 'WHAT CHANGES FOR YOU'],
      rows: [
        ['Depth in FI and CO', 'Rebuild the close to run in parallel', 'A close that is predictable, not just shorter'],
        ['A neutral read on the cloud models', 'Measure your processes against standard scope', 'A model decision that survives the project'],
        ['AI where the hours actually are', 'Calibrate thresholds on your own data', 'The team reviews exceptions instead of matching items']
      ],
      notes: 'Capability → action → outcome.'
    },
    s9: {
      eyebrow: 'Capabilities', title: 'Five areas of expertise.', titleSize: 40, titleW: 11.0,
      rows: [
        ['SAP Finance Modules', 'FI, CO, PA and PS as one process architecture, not five.'],
        ['S/4HANA Transformation', 'Brownfield, greenfield or selective transition, decided on evidence.'],
        ['SAP Public Cloud', 'How much of your process fits standard scope.'],
        ['SAP Private Cloud', 'Architecture, migration and the boundaries RISE leaves open.'],
        ['AI in Finance', 'The capabilities your data and discipline can actually support.']
      ],
      notes: 'The five capability areas.'
    },
    s10: {
      eyebrow: 'Applied AI', title: 'AI in the system and in delivery.', titleSize: 36, titleW: 11.4,
      cols: [
        {
          t: 'IN YOUR FINANCE PROCESSES', h: 'Embedded in SAP, not bought beside it',
          items: ['Intelligent matching — items cleared automatically',
            'Anomaly detection — before the close, not after',
            'Predictive accounting — during the period, not after it']
        },
        {
          t: 'IN HOW WE DELIVER', h: 'Applied to volume work, not judgement',
          items: ['Custom code inventory and impact analysis',
            'First drafts of test scenarios',
            'Migration reconciliation checks']
        }
      ],
      statement: 'No decision that produces a posting is finalised without human review.',
      notes: 'AI in the delivered system and in the delivery method, with an explicit human-review boundary.'
    },
    s11: {
      eyebrow: 'Boundaries', title: 'Clear boundaries.', titleSize: 40, titleW: 5.6,
      body: 'What we do not do matters as much as what we do.',
      quote: 'It turns work away. It is why we finish what we take.',
      items: ['Modules outside our specialism — logistics, production planning, HR',
        'Capacity without architectural or delivery responsibility',
        'Firm commitments made before an assessment',
        'Software development or infrastructure operations'],
      notes: 'The declined-work slide demonstrates that the focus claimed earlier is real.'
    },
    s12: {
      eyebrow: 'Engagement models', title: 'Three engagement models.', titleSize: 40, titleW: 11.0,
      models: [
        { t: 'Assessment', w: 'A decision is due and the evidence is missing.', o: 'You end it able to decide.', d: '2–6 weeks' },
        { t: 'Delivery', w: 'The decision is taken; it needs building.', o: 'Phased plan, weekly reporting, hypercare included.', d: '3–14 months' },
        { t: 'Expert support', w: 'Someone else runs it and one area needs depth.', o: 'Narrow scope, agreed output.', d: 'Days to weeks' }
      ],
      kicker: 'Not every need calls for a full programme.',
      notes: 'Assessment, Delivery, Expert support.'
    },
    s13: {
      eyebrow: 'References', title: 'Experience in\ncomplex landscapes.', titleSize: 34, titleW: 7.2,
      note: 'Ten years across SAP finance modules and cloud architecture.',
      notes: 'Reference logos as published by CPeak. No client names or outcome claims attached.'
    },
    s14: {
      eyebrow: 'Why CPeak', title: 'Senior consultants, start to finish.', titleSize: 40, titleLead: 48,
      pillars: [
        ['SENIOR ONLY', 'The consultant you meet is the one who does the work.'],
        ['NARROW BY DESIGN', 'Finance and cloud architecture. The hard part stays with us.'],
        ['NEUTRAL', 'We compare, you decide, the reasoning stays written.'],
        ['PHASED', 'Scope grows in phases, not in headcount.']
      ],
      cta: 'Tell us about your programme.\nWe respond within one business day.',
      address: 'Bostancı Mahallesi, Şemsettin Günaltay Caddesi No: 31/8\n34744 Kadıköy, İstanbul   ·   Mon–Fri, 09:00–18:00 (GMT+3)',
      disclaimer: 'SAP, S/4HANA and RISE with SAP are registered trademarks of SAP SE. CPeak Consultancy is an independent consultancy and is not affiliated with SAP SE.',
      notes: 'Closing argument and contact. Response within one business day.'
    }
  },

  tr: {
    file: 'CPeak-Consultancy-Kurumsal-Sunum-TR.pptx',
    footerName: 'CPEAK CONSULTANCY', gate: 'KAPI',
    s1: {
      eyebrow: 'SAP FİNANS  ·  BULUT MİMARİSİ  ·  UYGULAMALI YAPAY ZEKA',
      h: 'Finans odaklı\nSAP dönüşümü.', hSize: 44, hLead: 51,
      sub: 'Bağımsız ve bilinçli olarak dar: en zor kararların üzerinde bizzat biz çalışırız.',
      meta: ['İSTANBUL', 'TÜRKİYE · EMEA · ABD', '2021’DEN BERİ BAĞIMSIZ'],
      notes: 'CPeak; SAP finans modülleri, bulut mimarisi ve uygulamalı yapay zeka üzerine çalışan bağımsız bir danışmanlık şirketidir. 2021, İstanbul.'
    },
    s2: {
      eyebrow: 'Konumlanma', title: 'Genişlik değil,\nderinlik.', titleSize: 40, titleW: 6.2,
      body: 'Geniş kapsam satılır, her alana ayrı uzman aranır — ve en zor karar, o konuyu en az görmüş kişiye kalır.',
      quote: 'Bir işi almamız, o işin en zor kısmını dışarıya devretmeyeceğimiz anlamına gelir.',
      usual: 'ALIŞILMIŞ BİÇİM', usualCap: 'geniş kapsam · ödünç derinlik',
      ours: 'BİZİM', oursCap: 'dar kapsam · sahiplenilen derinlik',
      rungs: ['Şirket yapısı ve hesap planı', 'Maliyet, kârlılık ve proje muhasebesi',
        'Kapanış, paralel adımlara ayrılmış', 'Bulut modeli, savunulan değil ölçülen'],
      notes: 'CPeak finans modülleri ve bulut mimarisi dışına çıkmaz; zor kısmı taşerona vermez.'
    },
    s3: {
      eyebrow: 'Temel sorun',
      title: 'Erken kararlar,\nkalıcı sonuçlar.', titleSize: 34, titleW: 6.3,
      body: 'Şirket yapısı. Geçiş yöntemi. Bulut modeli. İlk haftalarda karara bağlanır, on yıl boyunca yaşanır.',
      quote: 'Ölçmeden verilen tavsiye bir tahmindir; sonucuna siz katlanırsınız.',
      chartLabel: 'KARARI GERİ ALMANIN ZORLUĞU',
      phases: ['TASARIM', 'KURULUM', 'TEST', 'CANLI KULLANIM'],
      decided: 'karar burada verilir', paid: 'burada yaşanır',
      notes: 'Etkisi en uzun süren kararlar, en az veriye sahip olunan anda alınır.'
    },
    s4: {
      eyebrow: 'Uzmanlık alanımız', title: 'Üç disiplin, tek uzmanlık.', titleSize: 40, titleW: 11.0,
      kicker: 'SAP sorunlarının çoğu bu üçünün arasındaki dikişlerde durur.',
      cols: [
        { t: 'FİNANS SÜRECİ', h: 'Defterlerin gerçekte nasıl kapandığı', b: 'FI, CO, PA ve PS — yapı, maliyet, marj, kapanış.' },
        { t: 'PLATFORM', h: 'Üzerinde koşmak zorunda olduğu zemin', b: 'ECC, S/4HANA, Private ve Public Cloud — savunulan değil, karşılaştırılan.' },
        { t: 'OTOMASYON', h: 'Elle yapılmaktan çıkabilecek işler', b: 'Mutabakat, anomali tespiti, tahmine dayalı muhasebe — açmadan önce ölçülen.' }
      ],
      outcome: 'Üçüncü yılda hâlâ doğru görünen bir karar',
      notes: 'Üç alan birleşir ve birbirini besler; konumlanma bu kesişimdedir.'
    },
    s5: {
      eyebrow: 'Yöntem', title: 'Tavsiyeden önce kanıt.', titleSize: 40, titleW: 9.2,
      described: 'SÜRECİN ANLATILDIĞI HÂLİ', executed: 'SÜRECİN İŞLEDİĞİ HÂLİ',
      gap: 'bulgular bu\nfarkın içindedir',
      rightBold: 'Kullanım istatistikleri. Veri kalitesi. Custom kod. Kapanış süreleri.',
      rightBody: 'Sistemin ne yaptığı — dokümanın ne dediği değil. Aradaki fark, çoğu zaman sorunun kendisidir.',
      metaText: 'Her çalışma bir değerlendirmeyle başlar', metaNum: '2–6\nHAFTA',
      notes: 'Önce ölçer, sonra öneririz.'
    },
    s6: {
      eyebrow: 'Bulut modeli',
      title: 'Ölçülmüş bir bulut kararı.', titleSize: 40, titleW: 11.0,
      cols: [
        { t: 'PUBLIC CLOUD', h: 'Standardı siz benimsersiniz.', b: 'Hız ve düşük işletme yükü — değiştiremeyeceğiniz bir çekirdek karşılığında.', m: '3–5 ay', ml: 'tek ülkeli finans kurulumu' },
        { t: 'PRIVATE CLOUD', h: 'Süreç mantığınızı korursunuz.', b: 'Kendi geliştirmeleriniz kalır — daha fazla sorumluluk ve daha uzun kurulum karşılığında.', m: '7–14 ay', ml: 'kapsama ve devralınan yapıya göre' }
      ],
      bottom: 'Biri diğerinin gelişmiş sürümü değildir. İki modelin kısıtlarını yan yana koyarız; karar sizde kalır.',
      notes: 'Bulut modelinde tarafsızlık: uygunluk standart kapsamla ölçülür, gerekçe yazılı bırakılır.'
    },
    s7: {
      eyebrow: 'Çalışma adımları', title: 'Dört adım, dört çıktı.', titleSize: 36, titleW: 7.2,
      note: 'Her adımın çıktısı baştan bellidir. Her kapıda devam kararı yeniden verilir.',
      stages: [
        { t: 'Değerlendirme', d: 'Teşhis raporu, sistem verisinden okunmuş', w: '2–6 hafta' },
        { t: 'Mimari ve\nyol haritası', d: 'Hedef mimari ve fazlı yol haritası', w: '3–6 hafta' },
        { t: 'Uygulama', d: 'Çalışan sistem, test kayıtları, devreye alma planı', w: '3–14 ay' },
        { t: 'Hypercare', d: 'İlk kapanış birlikte, iyileştirme listesi', w: '4–12 hafta' }
      ],
      notes: 'Dört adım; her adım tanımlı bir çıktıyla kapanır.'
    },
    s8: {
      eyebrow: 'İş değeri', title: 'Yetkinlikten sonuca.', titleSize: 40, titleW: 11.0,
      heads: ['NE GETİRİYORUZ', 'BUNUNLA NE YAPIYORUZ', 'SİZİN İÇİN NE DEĞİŞİYOR'],
      rows: [
        ['FI ve CO’da derinlik', 'Kapanışı paralel işleyecek biçimde yeniden kurmak', 'Yalnızca kısa değil, öngörülebilir bir kapanış'],
        ['Bulut modellerinde tarafsız okuma', 'Süreçleri standart kapsamla ölçmek', 'Projenin ortasında ayakta kalan model kararı'],
        ['Saatlerin gerçekten olduğu yere konmuş yapay zeka', 'Eşikleri kendi verinizle kalibre etmek', 'Ekip, eşleştirme yerine istisna inceler']
      ],
      notes: 'Yetkinlik → eylem → sonuç.'
    },
    s9: {
      eyebrow: 'Yetkinlikler', title: 'Beş uzmanlık alanı.', titleSize: 40, titleW: 11.0,
      rows: [
        ['SAP Finans Modülleri', 'FI, CO, PA ve PS; beş paralel yapı değil, tek mimari.'],
        ['S/4HANA Dönüşümü', 'Brownfield, greenfield ya da seçici geçiş, kanıta dayanarak.'],
        ['SAP Public Cloud', 'Süreçlerinizin ne kadarı standarda oturuyor.'],
        ['SAP Private Cloud', 'Mimari, göç ve RISE’ın açık bıraktığı sorumluluk sınırları.'],
        ['Finansta Yapay Zeka', 'Verinizin ve disiplininizin gerçekten taşıdığı yetenekler.']
      ],
      notes: 'Beş yetkinlik alanı.'
    },
    s10: {
      eyebrow: 'Uygulamalı yapay zeka', title: 'Sistemde ve teslimde yapay zeka.', titleSize: 36, titleW: 11.4,
      cols: [
        {
          t: 'SİZİN FİNANS SÜREÇLERİNİZDE', h: 'SAP’nin içine yerleşik, ayrıca satın alınan değil',
          items: ['Akıllı eşleştirme — kalemler otomatik kapatılır',
            'Anomali tespiti — kapanıştan sonra değil, önce',
            'Tahmine dayalı muhasebe — dönem içinde görünür']
        },
        {
          t: 'KENDİ ÇALIŞMA ŞEKLİMİZDE', h: 'Hacimli işlerde, karar gerektiren yerlerde değil',
          items: ['Custom kod envanteri ve etki analizi',
            'Test senaryolarının ilk taslakları',
            'Migrasyon mutabakat kontrolleri']
        }
      ],
      statement: 'Kayıt üreten hiçbir karar insan denetimi olmadan kesinleşmez.',
      notes: 'Yapay zeka hem teslim edilen sistemde hem çalışma yönteminde; insan denetimi sınırı açıkça yazılı.'
    },
    s11: {
      eyebrow: 'Sınırlar', title: 'Net sınırlar.', titleSize: 40, titleW: 5.6,
      body: 'Neyi yapmadığımız, ne yaptığımız kadar önemlidir.',
      quote: 'Bu bize iş kaybettirir. Aldığımız işi bitirmemizin sebebi de budur.',
      items: ['Uzmanlık alanımız dışındaki modüller — lojistik, üretim planlama, İK',
        'Mimari ya da teslim sorumluluğu olmadan kaynak sağlama',
        'Değerlendirme yapılmadan verilen kesin taahhütler',
        'Yazılım geliştirme ya da altyapı işletim hizmeti'],
      notes: 'Üstlenilmeyen işler, iddia edilen odağın gerçek olduğunu gösterir.'
    },
    s12: {
      eyebrow: 'Çalışma modelleri', title: 'Üç çalışma modeli.', titleSize: 40, titleW: 11.0,
      models: [
        { t: 'Değerlendirme', w: 'Karar vermeniz gerekiyor, elinizde veri yok.', o: 'Sonunda karar verebilecek durumda olursunuz.', d: '2–6 hafta' },
        { t: 'Proje teslimi', w: 'Karar verilmiş; uygulanması gerekiyor.', o: 'Fazlı plan, haftalık rapor, hypercare dahil.', d: '3–14 ay' },
        { t: 'Uzman desteği', w: 'Projeyi başkası yürütüyor, tek noktada derinlik gerekiyor.', o: 'Sınırlı kapsam, baştan anlaşılmış çıktı.', d: 'Gün – hafta' }
      ],
      kicker: 'Her ihtiyaç tam kapsamlı bir proje gerektirmez.',
      notes: 'Değerlendirme, proje teslimi, uzman desteği.'
    },
    s13: {
      eyebrow: 'Referanslar', title: 'Karmaşık yapılarda\ndeneyim.', titleSize: 34, titleW: 7.2,
      note: 'SAP finans modülleri ve bulut mimarisinde on yılı aşkın deneyim.',
      notes: 'CPeak’in yayımladığı referans logoları. Müşteri adı veya sonuç iddiası eklenmemiştir.'
    },
    s14: {
      eyebrow: 'Neden CPeak', title: 'Baştan sona kıdemli ekip.', titleSize: 40, titleLead: 48,
      pillars: [
        ['YALNIZCA KIDEMLİ', 'Tanıştığınız danışman, projede çalışan kişidir.'],
        ['TASARIM GEREĞİ DAR', 'Finans ve bulut mimarisi. Zor kısım bizde kalır.'],
        ['TARAFSIZ', 'Biz karşılaştırırız, siz karar verirsiniz, gerekçe yazılı kalır.'],
        ['FAZLI', 'Kapsam kadroyla değil, fazlarla büyür.']
      ],
      cta: 'Projenizi anlatın.\nBir iş günü içinde dönüş yapıyoruz.',
      address: 'Bostancı Mahallesi, Şemsettin Günaltay Caddesi No: 31/8\n34744 Kadıköy, İstanbul   ·   Pzt–Cum, 09:00–18:00 (GMT+3)',
      disclaimer: 'SAP, S/4HANA ve RISE with SAP, SAP SE’nin tescilli markalarıdır. CPeak Consultancy bağımsız bir danışmanlık şirketidir ve SAP SE ile bağlantılı değildir.',
      notes: 'Kapanış argümanı ve iletişim. Bir iş günü içinde dönüş.'
    }
  }
};
