/* ==========================================================================
   content/fi-en/e-donusum.js — English body for "E-Dönüşüm (e-Fatura,
   e-Arşiv, e-Defter)" / e-Transformation: e-Invoice, e-Archive, e-Ledger
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'e-donusum',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'e-Transformation is the replacement of paper documents with electronic documents — ' +
      'but that definition is misleading, and it is **the source of the biggest misunderstanding**.\n\n' +
      'e-Fatura (e-Invoice) is not *"sending the invoice by e-mail instead of a printer."*\n\n' +
      '---\n\n' +
      '**This topic\'s one-sentence thesis:**\n\n' +
      '**The accounting document and the e-document are two separate objects, with two separate life cycles.**\n\n' +
      'In the paper world, the invoice was **one single thing**: you recorded it, printed it, sent it. ' +
      'In the electronic world there are **two things**:\n\n' +
      '**① The accounting document** → {{BKPF}} + {{BSEG}} · recorded in SAP · ' +
      'debits the customer account · flows into the trial balance\n\n' +
      '**② The e-document** → {{EDOCUMENT}} · {{ubl-tr}} XML is generated · signed · ' +
      'sent to {{gib}} (Turkish Revenue Administration) · gets **accepted or rejected**\n\n' +
      '---\n\n' +
      '**The two can fail independently of each other.**\n\n' +
      'The invoice may have posted to accounting without a hitch, created a debit on the customer ' +
      'account, and appear in the trial balance — and at the same time the e-document may have been ' +
      '**rejected** or **never sent at all**.\n\n' +
      'In that situation the system produces **no error**. From an accounting standpoint, everything ' +
      'is fine.',

    neden:
      '**A legal requirement.** This isn\'t optional; {{gib}} mandates it for taxpayers above certain ' +
      'thresholds. Non-compliance carries a penalty.\n\n' +
      '**The document\'s legal form changed.** What is now valid is the **{{ubl-tr}} XML** — not the ' +
      'on-screen image or a PDF. In a dispute, the file that was actually sent governs.\n\n' +
      '**The process became two-sided.** With a paper invoice, you sent it and it was over. In ' +
      'e-Fatura the other side **responds** — and in the {{ticari-fatura}} (commercial invoice) ' +
      'scenario, it can **reject** it.\n\n' +
      '**Period close got stricter.** A period for which the {{e-defter}} (e-Ledger) {{berat}} ' +
      '(certificate) has been obtained becomes **legally final**. {{OB52}} discipline is no longer ' +
      'just about accounting order, it\'s a matter of **regulatory compliance**.',

    sirketOnemi:
      'e-Transformation is the FI consultant\'s most critical **Turkey-specific** area of expertise. ' +
      'Standard SAP knowledge isn\'t enough here: it\'s where regulation, the integrator\'s ' +
      'architecture, and SAP intersect.\n\n' +
      'The risk to the company is concrete:\n\n' +
      '**A rejected invoice cannot be collected.** The other party never received the invoice; it ' +
      'never entered their books. A receivable shows on the customer account, but the customer says ' +
      '*"no such invoice exists."*\n\n' +
      '**An invoice that couldn\'t be sent breaks the VAT return.** Accounting has the calculated VAT; ' +
      'GİB has no corresponding record.\n\n' +
      '**A late {{e-defter}} certificate creates a penalty.** e-Ledger upload deadlines are strict.\n\n' +
      '---\n\n' +
      '**A common question:** *"The invoice was recorded successfully in SAP. Does that mean the ' +
      'e-Fatura process was successful too?"*\n\n' +
      'The correct answer: **No, these are two separate questions.** A document existing in ' +
      '{{BKPF}} says **nothing** about the {{EDOCUMENT}} status. The two are checked separately.',

    gercekHayat:
      'The sales manager calls: **"The customer isn\'t paying, says he never received the invoice. ' +
      'But we issued it, it\'s right there in the system."**\n\n' +
      'The accountant opens the document in {{FB03}} — **the invoice is there**. In {{FBL5N}} the ' +
      'customer account **shows the debit**. The trial balance is correct.\n\n' +
      'Everyone assumes the customer is stalling.\n\n' +
      '---\n\n' +
      'The consultant opens {{EDOC_COCKPIT}}. The same invoice\'s e-document status:\n\n' +
      '**REJECTED — "Recipient is not an e-Fatura registered taxpayer"**\n\n' +
      'The invoice should have been issued as {{e-arsiv}} but was sent as {{e-fatura}} ' +
      '(or the other way around). {{gib}} rejected it. It **never reached** the customer at all.\n\n' +
      'The customer was telling the truth.\n\n' +
      '---\n\n' +
      '**What this case teaches:** looking at the accounting side tells you nothing about the ' +
      'e-document. {{FB03}} answers *"did we record it?"*, while {{EDOC_COCKPIT}} answers ' +
      '*"were we able to send it?"* **These are different questions.**',

    muhasebeMantigi:
      'e-Transformation **doesn\'t change** the accounting entries — a reassuring and important fact. ' +
      'A sales invoice is still recorded as `120 / 600 + 391`.\n\n' +
      'What changes are **the obligations around the entry**:\n\n' +
      '**Numbering.** The e-Fatura number is **separate** from the SAP document number: a 16-character, ' +
      'GİB-formatted, **unbroken** series. It\'s the counterpart of the printer-assigned series on a ' +
      'paper invoice.\n\n' +
      '**The concept of cancellation changed.** In accounting, cancellation is a reversal via {{FB08}} ' +
      'and is always possible. On the e-document side:\n' +
      '• {{e-arsiv}} → can be **cancelled within a certain period**\n' +
      '• {{e-fatura}} → **cannot be cancelled**. In the {{ticari-fatura}} scenario the recipient can ' +
      'reject it; otherwise a **credit invoice** is issued.\n\n' +
      '**Period finality.** A period for which the {{berat}} has been obtained is legally closed. ' +
      'You can reopen it in accounting with {{OB52}} — but **you shouldn\'t**.\n\n' +
      '---\n\n' +
      '**Critical consequence:** the **cancellation asymmetry** between accounting and the e-document ' +
      'explains why errors in e-Transformation are so expensive.\n\n' +
      'You reverse the document in SAP with {{FB08}} — but the e-Fatura on GİB\'s side **stays in ' +
      'place**. The two sides **diverge**. The correction has to be made **separately** on both ' +
      'sides.',

    kavramlar: ['gib', 'e-fatura', 'e-arsiv', 'e-irsaliye', 'e-defter', 'berat',
                'ozel-entegrator', 'ubl-tr', 'mali-muhur', 'mukellef-sorgulama',
                'temel-fatura', 'ticari-fatura'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The flow moves on **two tracks**, and that duality explains the whole topic: one track goes ' +
      'to accounting, the other to {{gib}}. Both are born from the same posting, but they succeed or ' +
      'fail **independently**.',

    roller:[
      { rol:'Sales / Accounting', gorev:'Issues the invoice — {{VF01}} or {{FB70}}.' },
      { rol:'System', gorev:'**Track 1:** the {{BKPF}} + {{BSEG}} accounting document is created.' },
      { rol:'System', gorev:'**Track 2:** the {{EDOCUMENT}} e-document is created — the document type is decided here.' },
      { rol:'System', gorev:'{{mukellef-sorgulama}} → is the recipient registered? → {{e-fatura}} / {{e-arsiv}}' },
      { rol:'System', gorev:'{{ubl-tr}} XML is generated and signed with the {{mali-muhur}} (financial seal).' },
      { rol:'{{ozel-entegrator}}', gorev:'Forwards the XML to {{gib}}.' },
      { rol:'{{gib}} / Recipient', gorev:'Returns an accept or **reject** response.' },
      { rol:'System', gorev:'The response is written into the {{EDOCUMENT}} status.' },
      { rol:'Consultant', gorev:'{{EDOC_COCKPIT}} is checked **daily**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'One posting, two tracks — accounting and e-document divergence',
      adimlar:[
        { ic:'🧾', rol:'User', baslik:'The invoice is issued',
          aciklama:'{{VF01}} (SD) or {{FB70}} (FI). From the user\'s perspective, **a single action**.',
          cikti:'Invoice', ok:'splits into two' },
        { ic:'📗', rol:'System · Track 1', baslik:'The accounting document is created',
          aciklama:'{{BKPF}} + {{BSEG}} · the customer account is debited · flows into the trial balance.\n\n' +
                   '✓ This track is **usually trouble-free**, and it\'s the one the user sees.',
          cikti:'{{BKPF}}', ok:'at the same time' },
        { ic:'📡', rol:'System · Track 2', baslik:'The e-document is created — a **separate object**',
          aciklama:'An {{EDOCUMENT}} record is opened. The user **does not see** this track — it\'s ' +
                   'the source of the problems.',
          cikti:'{{EDOCUMENT}}', ok:'the type is decided' },
        { ic:'🔍', rol:'System', baslik:'{{mukellef-sorgulama}} — which document type?',
          aciklama:'Is the recipient **registered** in the e-Fatura system?\n\n' +
                   'Registered → **{{e-fatura}}** · Not registered → **{{e-arsiv}}**\n\n' +
                   'This decision depends on **the list being current**. ' +
                   'A stale list = the wrong document type = **rejection**.',
          cikti:'Document type', ok:'the XML is generated' },
        { ic:'📄', rol:'System', baslik:'{{ubl-tr}} XML is generated',
          aciklama:'This is the invoice\'s **legally valid form** — not the screen image. ' +
                   'Stored in `EDOCUMENTFILE`.',
          cikti:'XML', ok:'is signed' },
        { ic:'🔏', rol:'System', baslik:'Signed with the {{mali-muhur}}',
          aciklama:'A legal entity uses a **financial seal**, an individual an **e-signature**. ' +
                   'If the certificate has expired, **all sending stops**.',
          cikti:'Signed XML', ok:'is sent' },
        { ic:'🚚', rol:'{{ozel-entegrator}}', baslik:'Forwarded to GİB',
          aciklama:'In most setups, sending is done by the **integrator\'s add-on**, ' +
                   'not the SAP standard.\n\n' +
                   'The first question when troubleshooting: *"is the fault in SAP, or in the ' +
                   'integrator?"*',
          cikti:'Transmission', ok:'wait for the response' },
        { ic:'↩', rol:'{{gib}} / Recipient', baslik:'A response comes back — **accept or reject**',
          aciklama:'{{temel-fatura}} (basic invoice): there is no right to reject, the process ends.\n' +
                   '{{ticari-fatura}} (commercial invoice): the recipient **can reject**.\n\n' +
                   'If it comes back rejected, the accounting document **stays in place** — the two ' +
                   'sides diverge.',
          cikti:'Status', ok:'is processed' },
        { ic:'📊', rol:'Consultant', baslik:'{{EDOC_COCKPIT}} is checked daily',
          aciklama:'Accounting close **doesn\'t cover** this check. ' +
                   'It has to be a separate daily routine.',
          cikti:'A clean status list' },
      ],
    },

    adimlar:[
      { rol:'User', eylem:'Issues the invoice', sistem:'{{VF01}} / {{FB70}}' },
      { rol:'System', eylem:'Produces the accounting document', sistem:'{{BKPF}} + {{BSEG}}' },
      { rol:'System', eylem:'Produces the e-document', sistem:'{{EDOCUMENT}}' },
      { rol:'System', eylem:'Decides the document type', sistem:'{{mukellef-sorgulama}}' },
      { rol:'System', eylem:'Generates and signs the XML', sistem:'{{ubl-tr}} + {{mali-muhur}}' },
      { rol:'Integrator', eylem:'Forwards to GİB', sistem:'the {{ozel-entegrator}} add-on' },
      { rol:'GİB / Recipient', eylem:'Responds', sistem:'Accept / reject' },
      { rol:'Consultant', eylem:'Monitors status', sistem:'{{EDOC_COCKPIT}} — **daily**' },
    ],

    veriAkisi:{
      nereden:'The SD invoice ({{VBRK}}) or the FI invoice ({{BKPF}}).',
      nereye:'{{EDOCUMENT}} → {{ubl-tr}} XML → integrator → {{gib}} → recipient.',
      tetikleyen:'Invoice posting; for e-İrsaliye (e-Delivery Note), **the SD delivery**.',
      sonraki:'Status monitoring · a credit invoice if rejected · {{e-defter}} + {{berat}} at period end.',
    },

    notlar:[
      { tip:'warn', baslik:'Accounting close doesn\'t cover the e-document check', metin:
        'The month-end close list ({{konu:closing}}) checks the accounting side: is the trial ' +
        'balance in balance, is the period closed, has valuation been done.\n\n' +
        '**None of them look at e-document status.**\n\n' +
        'So rejected invoices can pile up over the course of a month while the close looks ' +
        '**trouble-free** — because the accounting side genuinely is trouble-free.\n\n' +
        '**The lasting fix has two steps:**\n\n' +
        '**1. Daily:** the error and reject status in {{EDOC_COCKPIT}} must be **zero**.\n' +
        '**2. Month-end:** a *"is the e-document status clean?"* item is added to the close list.\n\n' +
        'This is the most expensive, Turkey-specific example of the ' +
        '**② silent error** class covered in {{konu:error-handling}}.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      '**e-Transformation doesn\'t change the accounting entry.** This is the topic\'s most ' +
      'reassuring fact: a sales invoice produces the same entry whether it\'s an e-Fatura or a ' +
      'paper invoice.\n\n' +
      'What changes is **the correction mechanism** — and that\'s where the real difficulty lies.',

    etkilenenHesaplar:[
      { hesap:'120 Trade receivables', tur:'Balance sheet — Asset', neden:'The invoice entry creates a debit — **independent of e-document status**.' },
      { hesap:'600 Domestic sales', tur:'Income', neden:'The revenue entry — unchanged.' },
      { hesap:'391 Calculated VAT', tur:'Balance sheet — Liability', neden:'The return goes to GİB; **if the e-document doesn\'t go out, a divergence** arises.' },
      { hesap:'360 Taxes payable', tur:'Balance sheet — Liability', neden:'A separate line on an e-Fatura with {{tevkifat}} (withholding).' },
      { hesap:'610 Sales returns', tur:'Income (–)', neden:'If a rejection comes in, a **credit invoice** — not a reversing entry.' },
    ],

    fisler:[
      { baslik:'① A normal e-Fatura — the accounting entry is **identical** to paper',
        belgeTuru:'RV', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables', borc:120000, not:'{{BSID}} open item' },
          { hesap:'600', ad:'Domestic sales', alacak:100000 },
          { hesap:'391', ad:'Calculated VAT 20%', alacak:20000, not:'{{BSET}}' },
        ],
        not:'✓ **e-Transformation never changed this entry.**\n\n' +
             'From an accounting standpoint, an e-Fatura and a paper invoice are **identical**. ' +
             'The accounts are the same, the amounts are the same, {{BSET}} is the same.\n\n' +
             'What changes is that a second object ({{EDOCUMENT}}) is born **alongside** this entry, ' +
             'and it has **its own fate**.\n\n' +
             'Failing to see this distinction is **the source** of e-Transformation problems.' },

      { baslik:'② An e-Fatura with {{tevkifat}} (withholding) — needs a separate field in the XML',
        belgeTuru:'RV', tarih:'15.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'120', ad:'Trade receivables', borc:108000, not:'To be collected, net of withholding' },
          { hesap:'600', ad:'Domestic sales', alacak:100000 },
          { hesap:'391', ad:'Calculated VAT (seller\'s share)', alacak:8000, not:'40% falls to the seller' },
        ],
        not:'In a withholding transaction, the **recipient** declares part of the VAT.\n\n' +
             'Example: of 20,000 in VAT, 60% (12,000) falls to the recipient, 40% (8,000) to the ' +
             'seller. Instead of 120,000, only **108,000** is collected on the invoice.\n\n' +
             '**The critical point for e-Transformation:** the withholding rate and code are carried ' +
             'in **separate fields** in the {{ubl-tr}} XML. Even if the accounting entry is correct, ' +
             'if the withholding information is missing from the XML, {{gib}} **rejects** the ' +
             'document.\n\n' +
             'In other words: a concrete example of the *"accounting is right, the e-document is ' +
             'wrong"* situation. The cause is usually a missing link between the tax code and the ' +
             'e-document field mapping.' },

      { baslik:'③ A rejection came back — corrected with a **credit invoice**, not a reversal',
        belgeTuru:'RV', tarih:'20.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'610', ad:'Sales returns', borc:100000 },
          { hesap:'391', ad:'Calculated VAT', borc:20000 },
          { hesap:'120', ad:'Trade receivables', alacak:120000 },
        ],
        not:'**This isn\'t an accounting choice — it\'s a regulatory constraint.**\n\n' +
             'Reversing the document with {{FB08}} is **possible in SAP** and corrects the ' +
             'accounting. But the e-Fatura on the {{gib}} side **stays in place** — a reversal ' +
             'doesn\'t produce a document that goes to GİB.\n\n' +
             'Result: **the two sides diverge.** The document is cancelled in SAP, but valid at ' +
             'GİB.\n\n' +
             '**The right way:** {{e-fatura}} cannot be cancelled; a **credit invoice** is issued ' +
             'instead. A credit invoice is itself an e-document, goes to GİB, and **offsets** the ' +
             'original.\n\n' +
             '{{e-arsiv}} is different — it **can be cancelled** within a certain period.' },
    ],

    tHesaplar:[
      { hesap:'Trade receivables — rejection scenario', kod:'120',
        borc:[{ ad:'① Original e-Fatura', tutar:120000 }],
        alacak:[{ ad:'③ Credit invoice', tutar:120000 }],
        not:'Accounting is settled · **both documents went to GİB**' },
    ],

    notlar:[
      { tip:'warn', baslik:'The cancellation asymmetry — e-Transformation\'s most expensive trap', metin:
        'In accounting, cancellation is **always possible**: {{FB08}} produces a reversal.\n\n' +
        'On the e-document side it **isn\'t**, and there are three separate rules:\n\n' +
        '**{{e-arsiv}}** → can be **cancelled** within a certain period\n' +
        '**{{e-fatura}} / {{temel-fatura}}** → **cannot be cancelled or rejected** → ' +
        'only a **credit invoice**\n' +
        '**{{e-fatura}} / {{ticari-fatura}}** → the recipient can **reject** within its window; ' +
        'if that window has passed, again a credit invoice\n\n' +
        '---\n\n' +
        '**Here\'s the danger:** the user does an {{FB08}} in SAP, the accounting is fixed, and ' +
        'they **relax**. On the GİB side the invoice is **still valid**.\n\n' +
        'This divergence usually surfaces **on the VAT return**: the calculated VAT in accounting ' +
        'and the total of the e-Fatura invoices sent to GİB **don\'t match**.\n\n' +
        '**The rule:** for an invoice that has produced an e-document, the correction is made ' +
        '**separately on both sides**. Fixing the accounting is only **half** the job.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'e-Transformation isn\'t a single document type, it\'s a **family of documents**. ' +
      'Each one has its own trigger, its own timing, and its own cancellation rule.\n\n' +
      '---\n\n' +
      '**First, the most commonly confused distinction: e-Fatura or e-Arşiv?**\n\n' +
      'This is **not the user\'s choice**. It hinges on a single question:\n\n' +
      '**"Is the recipient registered in the e-Fatura system?"**\n\n' +
      '**Registered** → **{{e-fatura}}** is mandatory · **delivered** to the recipient through GİB · ' +
      'cannot be cancelled\n' +
      '**Not registered** → **{{e-arsiv}}** · **reported** to GİB · delivered to the recipient by ' +
      'e-mail/paper · can be cancelled within a certain period\n\n' +
      'If the wrong type is chosen, {{gib}} **rejects** it — and that rejection is **silent**.\n\n' +
      'The {{mukellef-sorgulama}} list makes the decision; ' +
      '**this is exactly why the list has to be kept current**.',

    liste:[
      { ad:'Document · {{e-fatura}} — between registered taxpayers',
        aciklama:'**Mandatory** if the recipient is registered in the e-Fatura system. ' +
                 '**Delivered** to the recipient through GİB.',
        neZaman:'In B2B sales, when the recipient is registered.',
        ornek:'**There are two scenarios and their difference is critical:**\n\n' +
              '**{{temel-fatura}} (basic invoice)** — the recipient has **no right to reject** it ' +
              'through the system. The invoice is delivered and the process ends.\n\n' +
              '**{{ticari-fatura}} (commercial invoice)** — the recipient sends an **accept or ' +
              'reject** response within its window. So even once the invoice has posted to ' +
              'accounting, it **can still be rejected**.\n\n' +
              '**Cannot be cancelled.** A correction is made with a **credit invoice**.',
        tcodes:['EDOC_COCKPIT'] },

      { ad:'Document · {{e-arsiv}} — unregistered recipient / end consumer',
        aciklama:'Issued when the recipient is **not** registered in the e-Fatura system. ' +
                 '**Reported** to GİB and delivered to the recipient separately.',
        neZaman:'End-consumer sales, unregistered taxpayers, internet sales.',
        ornek:'**Three differences from {{e-fatura}}:**\n\n' +
              '**1. Delivery** — doesn\'t go to the recipient through GİB; it\'s **reported**. ' +
              'It reaches the recipient by e-mail or a paper printout.\n' +
              '**2. No rejection** — the recipient cannot reject it through the system.\n' +
              '**3. Can be cancelled** — within a certain period. This is a **significant piece of ' +
              'flexibility** compared to e-Fatura.\n\n' +
              'If a customer later becomes a registered e-Fatura taxpayer, they can no longer be ' +
              'issued an e-Arşiv invoice — this is the subject of this topic\'s **scenario**.',
        tcodes:['EDOC_COCKPIT'] },

      { ad:'Document · {{e-irsaliye}} — travels with the goods movement',
        aciklama:'The electronic form of the dispatch delivery note. A document **independent** of ' +
                 'the invoice.',
        neZaman:'On goods dispatch — can happen before the invoice is issued.',
        ornek:'**Its trigger isn\'t FI, it\'s logistics:** an SD delivery or an MM goods movement.\n\n' +
              'This is why e-İrsaliye problems are usually resolved **not in accounting, but on the ' +
              'logistics side** — most e-İrsaliye issues that reach the FI consultant are actually ' +
              '**delivery data** issues.\n\n' +
              '**The timing difference matters:** the delivery note is issued **when the goods ship**, ' +
              'the invoice can be issued later. The two **don\'t have to happen at the same time**.',
        tcodes:['EDOC_COCKPIT'] },

      { ad:'Document · {{e-defter}} — journal and general ledger',
        aciklama:'Producing the Journal and the General Ledger electronically and having them ' +
                 'certified with a {{berat}}.',
        neZaman:'On monthly (or quarterly) periods, after period close.',
        ornek:'**Flow:** the period closes → the XML is generated → it\'s signed → the ' +
              '**{{berat}}** is calculated → uploaded to GİB → approval is obtained.\n\n' +
              '**The most critical consequence:** the period for which the certificate has been ' +
              'obtained becomes **legally final**.\n\n' +
              'You can technically reopen that period with {{OB52}} — but if you post to it, the ' +
              'ledger and SAP **diverge**, and that\'s a **regulatory problem**, not an accounting ' +
              'one.\n\n' +
              'This is the reason period discipline in Turkey is **stricter** than in other ' +
              'countries (see {{konu:closing}}).',
        tcodes:['OB52'] },

      { ad:'Document · e-Müstahsil and e-SMM',
        aciklama:'Other sector-specific e-documents.',
        neZaman:'In agricultural purchasing (müstahsil) and in self-employed professional activity.',
        ornek:'**e-Müstahsil Makbuzu (Producer Receipt)** — for purchases from farmers. Common in ' +
              'agriculture and food.\n\n' +
              '**e-Serbest Meslek Makbuzu / e-SMM (Self-Employment Receipt)** — for lawyers, ' +
              'doctors, consultants, and other self-employed professionals.\n\n' +
              'Both work under the same umbrella: {{ubl-tr}} XML, the {{mali-muhur}}, delivery to ' +
              'GİB. The difference is **the document type and its field set**.\n\n' +
              'Depending on the sector, other types exist too, such as e-Bilet (e-Ticket) and ' +
              'e-Adisyon (e-Receipt).' },

      { ad:'Transmission · Direct integration',
        aciklama:'The company connects its own system directly to {{gib}}.',
        neZaman:'At very high volume, when the technical team has the capacity.',
        ornek:'**Advantage:** no intermediary, lower cost, full control.\n\n' +
              '**Disadvantage:** **the entire technical burden sits with the company** — GİB ' +
              'interface changes, certificate management, retention obligations, handling ' +
              'outages.\n\n' +
              'The GİB interface **changes with regulation**; every change requires development ' +
              'work. This is why it\'s a **minority** approach in practice.' },

      { ad:'Transmission · {{ozel-entegrator}} (private integrator) — the most common',
        aciklama:'A GİB-authorized intermediary that takes on the interface, transmission, and ' +
                 'retention.',
        neZaman:'For the **majority** of installations.',
        ornek:'**This is the most critical piece of architectural knowledge for a consultant:**\n\n' +
              'The SAP standard **produces** the e-document ({{EDOCUMENT}} + {{ubl-tr}} XML). ' +
              '**Sending** it, however, is done in most installations by the **integrator\'s SAP ' +
              'add-on**.\n\n' +
              'So there are **two separate pieces of software** in the system, and the first ' +
              'question when troubleshooting is:\n\n' +
              '**"Is the fault on the SAP side, or the integrator\'s side?"**\n\n' +
              '**The dividing line:** did the {{EDOCUMENT}} record **get created**?\n' +
              '• If not → the problem is **in SAP** (the trigger, the mapping, the data)\n' +
              '• If it was created but wasn\'t sent → the problem is **in the integrator** or the ' +
              'connectivity\n\n' +
              'This single question cuts the diagnosis time in half.' },

      { ad:'Transmission · GİB Portal',
        aciklama:'**Manual** entry through GİB\'s own web interface.',
        neZaman:'For very low-volume taxpayers.',
        ornek:'**There is no SAP integration.** Invoices are entered by hand.\n\n' +
              'This is **not appropriate** for a company using SAP — it means double entry, and a ' +
              'reconciliation mismatch is **inevitable**.\n\n' +
              'If you run into this as a consultant, it\'s usually a **temporary situation** or a ' +
              'small side company.' },

      { ad:'Invoice type · SALE / RETURN / WITHHOLDING / EXEMPTION',
        aciklama:'The code in the {{ubl-tr}} XML that states the **nature** of the invoice.',
        neZaman:'On every e-Fatura — the wrong type **is grounds for rejection**.',
        ornek:'**Common types:**\n\n' +
              '**SALE** — a normal sales invoice\n' +
              '**RETURN** — a credit invoice (in a correction after rejection)\n' +
              '**WITHHOLDING** — an invoice carrying {{tevkifat}}\n' +
              '**EXEMPTION** — VAT-exempt transactions (**exemption code is mandatory**)\n' +
              '**SPECIAL BASE** — special assessment-base transactions\n' +
              '**REGISTERED EXPORT** — export deliveries under registration\n\n' +
              '**On the SAP side, this type is derived from the tax code and the sales document ' +
              'type.** If the mapping is missing, the type comes out wrong and GİB rejects it.\n\n' +
              'On an exemption invoice, an **exemption code** is additionally mandatory; if it goes ' +
              'through blank, the document is **rejected**.',
        tcodes:['FTXP'] },
    ],

    karsilastirmaBasliklar:['{{e-fatura}}', '{{e-arsiv}}'],
    karsilastirma:[
      ['Recipient', 'A **registered** taxpayer in the system', 'Unregistered / end consumer'],
      ['Choice', '**Not a preference** — decided by {{mukellef-sorgulama}}', 'Same — the recipient\'s status decides'],
      ['Delivery', '**Delivered** to the recipient through GİB', '**Reported** to GİB, separately to the recipient'],
      ['Recipient response', 'Rejection **possible** on {{ticari-fatura}}', 'No rejection'],
      ['Cancellation', '**Cannot be cancelled**', '✓ **Can be cancelled** within a period'],
      ['Correction', '**Credit invoice**', 'Cancellation or credit invoice'],
      ['If the wrong type is chosen', '**GİB rejects it** — silently', 'Same'],
      ['Format', '{{ubl-tr}} XML', '{{ubl-tr}} XML'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'EDOC_COCKPIT', ad:'eDocument Cockpit — the e-document\'s real status',
        amac:'Shows the status of e-documents: created, sent, accepted, **rejected**, error.',
        neZaman:'**Every day.** And every time a customer says *"the invoice never arrived."*',
        adimlar:[
          { baslik:'A date range and e-document type are chosen' },
          { baslik:'**Filter by status**',
            aciklama:'**Error** and **rejected** first; successful ones aren\'t a problem anyway.' },
          { baslik:'Double-click a document — the error detail and the XML are shown' },
          { baslik:'Jump to the source accounting document',
            aciklama:'{{FB03}} or {{VF03}} — to see both sides **side by side**.' },
          { baslik:'If it\'s a transient error, {{EDOC_RESUBMIT}}; if permanent, **fix the source data first**' },
        ],
        ekranAkisi:[
          { ekran:'Symptom', islem:'Customer: *"the invoice never arrived"* · document **exists** in {{FB03}}' },
          { ekran:'{{EDOC_COCKPIT}}', islem:'Same invoice → status **REJECTED**' },
          { ekran:'Detail', islem:'*"Recipient is an e-Fatura taxpayer"* — it had been issued as {{e-arsiv}}' },
          { ekran:'Root cause', islem:'The {{mukellef-sorgulama}} list is **not current**' },
          { ekran:'Fix', islem:'List updated → credit invoice → reissued with the correct type' },
        ],
        alanlar:{
          zorunlu:['Date range'],
          opsiyonel:['E-document type','Status','Company code','Source document number'] },
        hatalar:[
          { mesaj:'I issued the invoice but it **never shows up** in the cockpit', sebep:'The e-document was **never created** — the trigger didn\'t run.', cozum:'This is an issue **on the SAP side**, not the integrator. Check the e-document type assignment, the customer master data, and the document type mapping.' },
          { mesaj:'The status is stuck at "sent"', sebep:'No response has come back from the integrator.', cozum:'Check the integrator portal. The problem is **outside SAP**.' },
          { mesaj:'Status is **rejected** — no reason shown', sebep:'The rejection reason is in the response file.', cozum:'Read the **incoming response XML** in `EDOCUMENTFILE`.' },
          { mesaj:'I did a mass resend, still getting the error', sebep:'A permanent data error — not a transmission problem.', cozum:'{{EDOC_RESUBMIT}} only resolves **transient** errors. Fix the source data first.' },
        ],
        ipucu:'**This screen should be a daily routine**, and that\'s the single highest-value piece ' +
              'of advice in this topic.\n\n' +
              'Reason: accounting close **doesn\'t cover** e-document status. The trial balance ' +
              'balances, the period is closed, everything looks fine — and a month\'s worth of ' +
              'rejected invoices can have piled up.\n\n' +
              'The target is simple: **error and reject status = 0**.\n\n' +
              'This is the e-Transformation counterpart of the *"{{SLG1}} red = 0"* rule from ' +
              '{{konu:error-handling}}.',
        ilgili:['EDOC_RESUBMIT','FB03','VF03'] },

      { kod:'EDOC_RESUBMIT', ad:'Resend — but separate the cause first',
        amac:'Mass-resends e-documents that are in an error state.',
        neZaman:'**Only** for transient errors: an integrator outage, a network problem, GİB ' +
                'maintenance.',
        adimlar:[
          { baslik:'**Read the error reason first** — is it transient, or permanent?',
            aciklama:'Resending without making this distinction is **a waste of time**.' },
          { baslik:'If transient: filter by date range and status, resend' },
          { baslik:'If permanent: **fix the source data**',
            aciklama:'The wrong document type, a missing exemption code, a bad tax mapping.' },
          { baslik:'**Confirm** the status in {{EDOC_COCKPIT}}' },
        ],
        ekranAkisi:[
          { ekran:'Situation', islem:'47 documents in **error** status' },
          { ekran:'Sorting', islem:'39 say *"connection timeout"* → **transient**' },
          { ekran:'', islem:'8 say *"exemption code missing"* → **permanent**' },
          { ekran:'Action', islem:'39 resent ✓ · for the 8, the **tax code** was fixed first' },
        ],
        alanlar:{ zorunlu:['Date range'], opsiyonel:['E-document type','Status'] },
        hatalar:[
          { mesaj:'I resent it, same error', sebep:'A permanent data error.', cozum:'Read the error text. *"Timeout / connection"* is transient; *"code missing / invalid / not a registered taxpayer"* is **permanent**.' },
          { mesaj:'Did the same invoice go out twice?', sebep:'A concern about resending.', cozum:'The framework uses the same e-document identity; it **never produces a duplicate**. Still, check the status before resending.' },
        ],
        ipucu:'**The most common mistake: resending on every error.**\n\n' +
              'Resending only fixes **transmission** problems. If it\'s a data error, the same bad ' +
              'XML goes out again and is rejected again.\n\n' +
              '**The rule for telling them apart:**\n' +
              '*"Timeout", "connection", "service unavailable"* → **transient** → resend\n' +
              '*"Code missing", "invalid", "not a registered taxpayer", "format"* → **permanent** → ' +
              'fix the data first\n\n' +
              'This is the e-Transformation counterpart of the *"symptom or root cause?"* question ' +
              'from {{konu:error-handling}}.',
        ilgili:['EDOC_COCKPIT','FTXP'] },

      { kod:'FTXP', ad:'Tax code — the source of e-document fields',
        amac:'Tax codes and rates; the e-document type and exemption code are **derived from ' +
             'here**.',
        neZaman:'When opening a new tax code; on exemption and withholding rejections.',
        adimlar:[
          { baslik:'The country and tax code are entered' },
          { baslik:'The rate and account key are defined' },
          { baslik:'**The e-document mapping is checked**',
            aciklama:'Exemption code, withholding rate, invoice type assignment. This mapping is ' +
                     'held in the **integrator\'s add-on** in most installations.' },
        ],
        ekranAkisi:[
          { ekran:'Symptom', islem:'An exemption invoice is **rejected** — *"exemption code missing"*' },
          { ekran:'{{FTXP}}', islem:'Tax code **correct** · rate 0% · accounting **trouble-free**' },
          { ekran:'Root cause', islem:'The tax code ↔ **exemption code** mapping was never defined' },
          { ekran:'Lesson', islem:'Accounting is right, the **e-document field** is missing' },
        ],
        alanlar:{ zorunlu:['Country','Tax code','Rate'], opsiyonel:['Exemption code mapping','Withholding rate'] },
        hatalar:[
          { mesaj:'The exemption invoice keeps getting rejected', sebep:'The exemption code is going out blank.', cozum:'The mapping between the tax code and the exemption code is defined — even if the accounting side is correct, this is a **separate mapping**.' },
          { mesaj:'The withholding invoice is being rejected', sebep:'The withholding rate is missing from the XML.', cozum:'Check the mapping between the {{tevkifat}} code and the e-document field.' },
        ],
        ipucu:'**This transaction is the most concrete proof of this topic\'s main thesis.**\n\n' +
              'A tax code can work **perfectly from an accounting standpoint**: the right rate, ' +
              'the right account, the right {{BSET}} entry.\n\n' +
              'And the same tax code can be **incomplete from an e-document standpoint**: no ' +
              'exemption code mapped, the withholding rate not carried through.\n\n' +
              'Result: accounting is clean, the e-Fatura is **rejected**.\n\n' +
              '**Rule:** the process for opening a new tax code should include a ' +
              '*"has the e-document field mapping been done?"* step — the same as what\'s said ' +
              'about account determination in {{konu:error-handling}}.',
        ilgili:['OB40','EDOC_COCKPIT'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'The table structure makes the topic\'s thesis **directly visible**: the accounting side is ' +
      '{{BKPF}}/{{BSEG}}, the e-document side is {{EDOCUMENT}}. **Two separate tables, two separate ' +
      'statuses, two separate fates.**',

    liste:[
      { ad:'EDOCUMENT', baslik:'E-document header — the accounting document\'s electronic twin',
        tutar:'Each e-document\'s **status** and its link to the source document.',
        olusturan:'When the invoice posting fires the e-document trigger',
        anahtar:'**EDOC_GUID**',
        iliskiler:'`SOURCE_KEY` → {{BKPF}} or {{VBRK}}. The XML → `EDOCUMENTFILE`.',
        s4:'Sits under the **DRC** framework in S/4HANA; the structure is preserved.',
        alanlar:[
          { ad:'EDOC_GUID', aciklama:'The e-document\'s identity', tip:'pk' },
          { ad:'SOURCE_TYPE', aciklama:'Whether it\'s an FI invoice or an SD invoice' },
          { ad:'SOURCE_KEY', aciklama:'**The bridge to the accounting document** — the field connecting the two sides', tip:'fk' },
          { ad:'EDOC_TYPE', aciklama:'e-Fatura / e-Arşiv / e-İrsaliye' },
          { ad:'EDOC_STATUS', aciklama:'**Status** — errors and **rejections** show up here' },
        ] },

      { ad:'EDOCUMENTFILE', baslik:'The transmitted XML — the sole piece of evidence in a dispute',
        tutar:'The {{ubl-tr}} XML and the **response** files returned by GİB.',
        olusturan:'When the e-document is produced, and on every response received',
        anahtar:'EDOC_GUID + FILE_GUID',
        iliskiler:'Tied to the {{EDOCUMENT}} header.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'FILE_TYPE', aciklama:'Whether it\'s the outgoing XML or the **incoming response**' },
          { ad:'FILE_RAW', aciklama:'**The XML content.** The answer to both *"what did we send?"* and *"what was the rejection reason?"*' },
        ] },

      { ad:'BKPF', baslik:'The accounting side — **independent** of the e-document',
        tutar:'The document header. **Everything can be fine** here.',
        olusturan:'The invoice posting',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'{{EDOCUMENT}}\'s `SOURCE_KEY` points here.',
        s4:'Line items sit in {{ACDOCA}}.',
        alanlar:[
          { ad:'BELNR', aciklama:'The document number — **different from the e-Fatura number**', tip:'pk' },
          { ad:'XBLNR', aciklama:'Reference — the e-Fatura number is usually written here' },
          { ad:'STBLG', aciklama:'The reversing document. **Being filled doesn\'t mean the e-document was cancelled**' },
        ] },

      { ad:'BSET', baslik:'Tax line items — the source of the XML\'s tax section',
        tutar:'The base amount, the tax amount, the tax code.',
        olusturan:'Every FI document that carries tax',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'The {{ubl-tr}} XML\'s tax section is derived from here.',
        s4:'Still there.',
        alanlar:[
          { ad:'MWSKZ', aciklama:'The tax code — **the e-document type and exemption code are derived from this**' },
          { ad:'HWBAS / HWSTE', aciklama:'The base amount and the tax amount — the values carried into the XML' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Two tracks, one source — accounting and e-document divergence',
      varliklar:[
        { ad:'BKPF', rol:'Accounting', hub:true, aciklama:'**Track 1** — everything can be fine here',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'XBLNR' }, { ad:'STBLG' }] },
        { ad:'BSET', rol:'Tax', aciklama:'The **source** of the XML tax section',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'MWSKZ' }, { ad:'HWSTE' }] },
        { ad:'EDOCUMENT', rol:'E-document', aciklama:'**Track 2** — rejections and errors are **here**',
          alanlar:[{ ad:'EDOC_GUID', tip:'pk' }, { ad:'SOURCE_KEY', tip:'fk' }, { ad:'EDOC_STATUS' }] },
        { ad:'EDOCUMENTFILE', rol:'XML', aciklama:'The transmitted file — **legal evidence**',
          alanlar:[{ ad:'EDOC_GUID', tip:'fk' }, { ad:'FILE_RAW' }] },
        { ad:'VBRK', rol:'SD invoice', aciklama:'The source for SD-originated e-documents',
          alanlar:[{ ad:'VBELN', tip:'pk' }, { ad:'RFBSK' }] },
      ],
      iliskiler:[
        { from:'BKPF', to:'EDOCUMENT', alanlar:'SOURCE_KEY', not:'**the single field connecting the two tracks**' },
        { from:'VBRK', to:'EDOCUMENT', alanlar:'SOURCE_KEY', not:'SD-originated' },
        { from:'BKPF', to:'BSET', alanlar:'BELNR', not:'tax line items' },
        { from:'EDOCUMENT', to:'EDOCUMENTFILE', alanlar:'EDOC_GUID', not:'XML and responses' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Three screens are enough for day-to-day work: **{{EDOC_COCKPIT}}** (status), ' +
      '**{{FB03}}/{{VF03}}** (source document), and **{{FTXP}}** (tax mapping).',

    ekranlar:[
      { ad:'{{EDOC_COCKPIT}} — the daily routine',
        aciklama:'The single screen that shows the e-document\'s real state.',
        alanlar:[
          { ad:'Date range', zorunlu:true, aciklama:'From yesterday to today for the daily check.' },
          { ad:'**Status**', zorunlu:false, aciklama:'**Error** and **reject** are filtered first. Target: **0**.' },
          { ad:'E-document type', zorunlu:false, aciklama:'e-Fatura / e-Arşiv / e-İrsaliye.' },
          { ad:'Source document', zorunlu:false, aciklama:'For jumping into {{FB03}} / {{VF03}}.' },
        ],
        ipucu:'**Simple target: error and reject status = 0.**\n\n' +
              'Accounting close doesn\'t cover this check — even with a balanced trial balance, ' +
              'rejected invoices may have piled up.\n\n' +
              'It\'s the e-Transformation counterpart of the *"{{SLG1}} red = 0"* rule from ' +
              '{{konu:error-handling}}, and needed for the same reason: **silent errors are only ' +
              'visible when someone looks.**' },

      { ad:'{{FB03}} / {{VF03}} — the source document',
        aciklama:'For seeing the accounting side. **Says nothing about the e-document.**',
        alanlar:[
          { ad:'Document number', zorunlu:true, aciklama:'**Different from the e-Fatura number.**' },
          { ad:'`XBLNR` Reference', zorunlu:false, aciklama:'The e-Fatura number usually goes here.' },
          { ad:'`STBLG`', zorunlu:false, aciklama:'The reversing document — **doesn\'t mean the e-document was cancelled**.' },
        ],
        ipucu:'**Don\'t pass judgment on the e-document by looking at this screen.**\n\n' +
              '{{FB03}} answers *"did we record it?"* The answer to *"were we able to send it?"* ' +
              'is in **{{EDOC_COCKPIT}}**.\n\n' +
              'Confusing these two questions is **the source of most** errors in this area.' },

      { ad:'{{FTXP}} — the tax code and e-document mapping',
        aciklama:'The source of exemption and withholding rejections.',
        alanlar:[
          { ad:'Tax code', zorunlu:true, aciklama:'The accounting side.' },
          { ad:'**Exemption code mapping**', zorunlu:false, aciklama:'If missing, the exemption invoice is **rejected**.' },
          { ad:'**Withholding rate**', zorunlu:false, aciklama:'A separate field in the XML; if missing, a rejection.' },
        ],
        ipucu:'A tax code can be **perfect from an accounting standpoint** and **incomplete from ' +
              'an e-document standpoint**.\n\n' +
              'The process for opening a new tax code should include a ' +
              '*"has the e-document field mapping been done?"* step.' },
    ],

    zorunlu:['A valid {{mali-muhur}}','A current {{mukellef-sorgulama}} list','Tax code ↔ e-document mapping'],
    opsiyonel:['Integrator portal access','e-Arşiv cancellation authorization'],

    hatalar:[
      { mesaj:'The invoice was issued but is **entirely missing** from {{EDOC_COCKPIT}}', sebep:'The e-document trigger didn\'t run.', cozum:'A problem **on the SAP side**. Check the e-document type assignment, the customer master data, and the document type mapping.' },
      { mesaj:'Status **REJECTED** — "recipient is not an e-Fatura taxpayer"', sebep:'The wrong document type — the {{mukellef-sorgulama}} list is stale.', cozum:'Update the list; reissue the invoice with the correct type. This is the subject of this topic\'s **scenario**.' },
      { mesaj:'Status **REJECTED** — "exemption code missing"', sebep:'No mapping between the tax code and the exemption code.', cozum:'{{FTXP}}. Even if the accounting is correct, this is a **separate mapping**.' },
      { mesaj:'One morning **all transmission stopped**', sebep:'The {{mali-muhur}} certificate has expired.', cozum:'Renew the certificate. **The lasting fix:** put the expiry date on a calendar.' },
      { mesaj:'Status **stuck** at "sent"', sebep:'No response has come back from the integrator.', cozum:'Check the integrator portal — the problem is **outside SAP**.' },
      { mesaj:'I did an {{FB08}} but the invoice is still there at GİB', sebep:'**The cancellation asymmetry.** A reversal doesn\'t produce an e-document.', cozum:'{{e-fatura}} cannot be cancelled — a **credit invoice** is issued. {{e-arsiv}}, on the other hand, can be cancelled within its window.' },
      { mesaj:'The VAT return doesn\'t match the GİB e-Fatura total', sebep:'Rejected or unsendable invoices.', cozum:'Scan the period in {{EDOC_COCKPIT}}; find the invoices that are in accounting but never reached GİB.' },
      { mesaj:'A posting was made to a period whose certificate has been obtained', sebep:'{{OB52}} was left open.', cozum:'**A regulatory problem.** Correct it in the next period. The period must be **closed** in {{OB52}} after the certificate is obtained.' },
    ],

    ipuclari:[
      '**Open {{EDOC_COCKPIT}} daily — target: error and reject = 0.**',
      '{{FB03}} asks *"did we record it?"*, {{EDOC_COCKPIT}} asks *"were we able to send it?"* — ' +
      '**different questions**.',
      'The first cut when troubleshooting: **did the {{EDOCUMENT}} get created?** ' +
      'If not, it\'s SAP; if it was created but didn\'t go out, it\'s the integrator.',
      'The rejection reason isn\'t on the screen — it\'s in the **response XML** inside ' +
      '`EDOCUMENTFILE`.',
      'Resending only resolves **transient** errors — *"code missing / not a registered taxpayer"* ' +
      'is permanent; fix the data first.',
      'Put the {{mali-muhur}} expiry date **on a calendar** — otherwise all transmission stops one ' +
      'morning.',
      'The {{mukellef-sorgulama}} list needs to be **updated regularly**; a stale list means the ' +
      'wrong document type, which means a silent rejection.',
      '**Close** the period once its {{berat}} has been obtained, in {{OB52}} — it\'s no longer an ' +
      'accounting matter, it\'s a **regulatory** one.',
      'When opening a new tax code, ask *"has the e-document field mapping been done?"*',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'EDOCUMENT', ne:'The e-document header and **status** — updated on every response' },
      { tablo:'EDOCUMENTFILE', ne:'Outgoing XML and incoming response files' },
      { tablo:'BKPF', ne:'The accounting document — **independent of the e-document**' },
      { tablo:'BSET', ne:'Tax line items — the source of the XML\'s tax section' },
    ],

    commit:
      '**e-Document production isn\'t inside the accounting LUW.**\n\n' +
      'This is the topic\'s technical foundation and it explains its thesis:\n\n' +
      'The invoice posts to accounting and **commits** — the document is final. e-Document ' +
      'production and transmission run **afterward**, as a separate operation.\n\n' +
      'Result: even if the e-document side crashes, **the accounting document isn\'t rolled ' +
      'back**. This is a **deliberate design choice** — otherwise an integrator outage would halt ' +
      'all invoicing.\n\n' +
      'But the price is this: **the two sides can diverge**, and the system doesn\'t report that ' +
      'as an error.',

    belgeNo:
      '**There are two separate numbers, and they must not be confused:**\n\n' +
      '**The SAP document number** — {{BKPF}}.`BELNR` · per company code and year · from the ' +
      '{{FBN1}} number range\n\n' +
      '**The e-Fatura number** — **16 characters** in GİB format: a 3-letter series prefix + a ' +
      '4-digit year + a 9-digit sequence number. The counterpart of the printer-assigned series on a ' +
      'paper invoice.\n\n' +
      'The e-Fatura number is usually written into {{BKPF}}.`XBLNR` (reference) — that\'s how the ' +
      'two numbers get linked.\n\n' +
      '**Continuity is mandatory.** There must be no gap in the e-Fatura series. This explains why ' +
      'a number being burned to a {{guncelleme-hatasi}} (update error) is more serious on the ' +
      'e-document side.',

    postingLogic:
      'The sequence from invoice posting to e-document:\n\n' +
      '**1.** The invoice posts to accounting → {{BKPF}} + {{BSEG}} + {{BSET}} · **commit**\n' +
      '**2.** The e-document trigger runs → the source type and document type are checked\n' +
      '**3.** An {{EDOCUMENT}} record is opened\n' +
      '**4.** {{mukellef-sorgulama}} → the e-document **type** is decided\n' +
      '**5.** The {{ubl-tr}} XML is generated — tax from {{BSET}}, party information from master ' +
      'data\n' +
      '**6.** Signed with the {{mali-muhur}}\n' +
      '**7.** Forwarded to the integrator (an **add-on**, in most installations)\n' +
      '**8.** A response is received → `EDOC_STATUS` is updated\n\n' +
      '**This sequence is used directly in diagnosis:** which step did it stop at?\n' +
      '• Never reached step 3 → a **trigger/mapping** problem (SAP)\n' +
      '• Error at step 5 → a **data/mapping** problem (SAP)\n' +
      '• Stuck at step 7 → an **integrator** problem\n' +
      '• Rejected at step 8 → a **regulatory/data** problem',

    belgeTuru:
      'There\'s a **mapping** between the {{belge-turu}} (document type) and the e-document type: ' +
      'which invoice type produces an e-document, and which type it produces, is decided by ' +
      'configuration.\n\n' +
      '**A commonly missed situation:** if the e-document mapping isn\'t done when a new sales ' +
      'document type or invoice type is opened, invoices issued with that type **never produce an ' +
      'e-document at all**.\n\n' +
      'The symptom is clear and easy to recognize: the invoice **exists** in {{FB03}}, and is ' +
      '**entirely absent** from {{EDOC_COCKPIT}}. Not a rejection, an **absence** — this ' +
      'distinction speeds up the diagnosis.',

    numberRange:
      'The e-Fatura series is **separate** from the SAP document number range, and is usually ' +
      'managed in the integrator add-on or in a separate range.\n\n' +
      '**It has to be checked at year-end** — just like {{FBN1}}. If the new year\'s e-Fatura ' +
      'series hasn\'t been defined, e-Fatura invoices can\'t be issued on January 1st (the ' +
      'accounting entry can still be made, but the e-document can\'t be produced).\n\n' +
      'This is the **e-Transformation counterpart** of the year-end number-range check described ' +
      'in {{konu:error-handling}}, and should be added to the same checklist.',

    accountDetermination:
      'e-Transformation **doesn\'t change** account determination — {{VKOA}} and {{OB40}} work the ' +
      'same way.\n\n' +
      'But there\'s a dependency in the other direction: **the tax code** feeds both account ' +
      'determination and the **e-document fields**.\n\n' +
      'This is why a tax code can be incomplete in two separate places:\n' +
      '• No account assignment in {{OB40}} → an **accounting** error (loud)\n' +
      '• No e-document mapping → an **e-document** rejection (silent)\n\n' +
      'The first **stops** the posting, the second doesn\'t. This asymmetry explains why ' +
      'e-document errors are noticed so late.',

    tur:
      'SAP\'s **eDocument Framework** is a country-independent structure; the Turkey-specific part ' +
      'comes through **localization**.\n\n' +
      'There are three layers, and this is where the boundary of responsibility is drawn:\n\n' +
      '**1. The framework (SAP standard)** — the {{EDOCUMENT}} life cycle, status management, ' +
      '{{EDOC_COCKPIT}}\n' +
      '**2. Localization (SAP Turkey)** — the {{ubl-tr}} format, field mappings\n' +
      '**3. The integrator add-on (third party)** — communication with GİB, signing, retention\n\n' +
      '**The practical consequence for a consultant:** when a problem comes in, **which layer** ' +
      'it\'s in gets identified first. The third layer is **not** covered by SAP support — it goes ' +
      'to the integrator company.',

    transport:
      'e-Transformation configuration comes from **two sources**, and the two are transported ' +
      'separately:\n\n' +
      '**The SAP side** — e-document type definitions, source type mappings, tax code ' +
      'relationships → the normal {{tasima-istegi}} (transport request)\n\n' +
      '**The integrator add-on** — its own tables and settings → usually **managed separately**\n\n' +
      '**A classic go-live mistake:** the SAP side is moved to production, and the integrator ' +
      'settings are forgotten. Result: the e-document **is produced** but **can\'t be sent** — and ' +
      'this is one of the hardest situations to diagnose, because everything on the SAP side looks ' +
      'correct.',

    img:[
      { yol:'eDocument → General settings → Source type definition', not:'Which document produces an e-document' },
      { yol:'eDocument → E-document type assignment', not:'If skipped for a new invoice type, the e-document **never gets created**' },
      { yol:'FTXP → Tax code', not:'Exemption and withholding **e-document mapping**' },
      { yol:'OB52 → Period close', not:'The period whose {{berat}} has been obtained **must be closed**' },
      { yol:'Integrator add-on settings', not:'Outside SAP IMG; **transported separately**' },
    ],

    ekstra:[
      { ic:'🔀', baslik:'"Is the fault in SAP, or the integrator?" — a single question to tell them apart', metin:
        'This is **the single most valuable question** in e-Transformation diagnosis, because ' +
        'answering it eliminates half the search.\n\n' +
        '---\n\n' +
        '**The dividing line: did the {{EDOCUMENT}} record get created?**\n\n' +
        '**If not → the SAP side**\n' +
        'The trigger didn\'t run. Causes:\n' +
        '• Document type ↔ e-document type mapping missing (a new type was opened)\n' +
        '• No e-document information on the customer master\n' +
        '• The source type wasn\'t defined\n\n' +
        '**If it was created but is stuck at "sent" → integrator/connectivity**\n' +
        'SAP has done its part. Check the integrator portal.\n\n' +
        '**If it was created and came back rejected → data/regulation**\n' +
        'Communication is working, **the content** is wrong. The rejection reason is in the ' +
        'response XML in `EDOCUMENTFILE`.\n\n' +
        '---\n\n' +
        '**Recognizing the symptom:**\n\n' +
        'The document is **entirely absent** from {{EDOC_COCKPIT}} → SAP\n' +
        'The document exists, status **error/stuck** → integrator\n' +
        'The document exists, status **rejected** → data\n\n' +
        'This triage is the e-Transformation version of the *"symptom → tool"* mapping from ' +
        '{{konu:error-handling}}.' },

      { ic:'⚖️', baslik:'Why can the two sides diverge? — the rationale behind the design', metin:
        'A question naturally comes to mind: ' +
        '*"If e-documents are mandatory, why doesn\'t SAP just hold back the invoice posting until ' +
        'the e-document succeeds?"*\n\n' +
        'The answer is **a deliberate design choice**.\n\n' +
        '---\n\n' +
        '**If they were linked:** an integrator outage, GİB maintenance, or a network problem would ' +
        '**halt all invoicing**. The company would be unable to sell or ship goods.\n\n' +
        'An external service\'s availability would end up determining the company\'s **ability to ' +
        'post accounting entries**. That\'s unacceptable.\n\n' +
        '**Because they are decoupled:** the invoice is recorded, the e-document is sent ' +
        'afterward, and it\'s retried once the outage passes. The business **doesn\'t stop**.\n\n' +
        '---\n\n' +
        '**But this flexibility has a price:** the two sides can diverge, and the system doesn\'t ' +
        'report that as an error.\n\n' +
        '**The price is paid through monitoring.** Because the design is decoupled, the checking is ' +
        'left **to a person** — and that\'s the real reason {{EDOC_COCKPIT}} needs to be a daily ' +
        'routine.\n\n' +
        '**The general architectural lesson:** when two systems are loosely coupled, resilience is ' +
        'gained and **the consistency guarantee is lost**. The lost guarantee turns into a ' +
        '**monitoring obligation** — and if that obligation isn\'t taken on, the resilience gained ' +
        'is paid for in silent errors.' },
    ],

    notlar:[
      { tip:'warn', baslik:'{{FB08}} does not cancel an e-Fatura', metin:
        'This is **the most expensive false assumption** made in e-Transformation.\n\n' +
        'A user sees an incorrect invoice, reverses it with {{FB08}}, the accounting is fixed, and ' +
        'they **consider the matter closed**.\n\n' +
        '**On the GİB side, the invoice is still valid.** A reversal doesn\'t **produce** a document ' +
        'that goes to GİB.\n\n' +
        '**The right approach depends on the document type:**\n\n' +
        '**{{e-arsiv}}** → can be **cancelled** within its window\n' +
        '**{{e-fatura}}** → cannot be cancelled → a **credit invoice** is issued ' +
        '(itself an e-document, and it goes to GİB)\n' +
        '**{{ticari-fatura}} scenario** → the recipient can reject it within their window\n\n' +
        '---\n\n' +
        '**Where does the divergence show up?** Usually **on the VAT return**: the calculated VAT ' +
        'in accounting and the e-Fatura total at GİB **don\'t match**.\n\n' +
        'A retroactive correction at that point is far more expensive — which is why the rule must ' +
        'be known up front: **for an invoice that has produced an e-document, the correction is ' +
        'made separately on both sides.**' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'In S/4HANA, the eDocument framework was folded into what\'s called **DRC** (Document and ' +
      'Reporting Compliance). The logic is the same; the scope widened — e-document **and** ' +
      'statutory reporting under one roof.',

    eccFarklari:[
      { konu:'Framework name', ecc:'eDocument Framework', s4:'**DRC** — Document and Reporting Compliance' },
      { konu:'Scope', ecc:'e-Document only', s4:'e-Document **+ statutory reporting** together' },
      { konu:'The {{EDOCUMENT}} table', ecc:'Present', s4:'**Still there** — the structure is preserved' },
      { konu:'Monitoring screen', ecc:'{{EDOC_COCKPIT}}', s4:'The cockpit **remains** + Fiori apps' },
      { konu:'Tax data', ecc:'{{BSET}} + {{BSEG}}', s4:'{{BSET}} remains; {{ACDOCA}} carries the amount' },
      { konu:'Cloud', ecc:'None', s4:'**Cloud edition** — GİB compliance updates delivered by SAP' },
      { konu:'Integrator add-on', ecc:'Required', s4:'**Still required** — the common model in Turkey' },
    ],

    universalJournal:
      'The {{evrensel-kayit-defteri}} (Universal Journal) **didn\'t directly change** ' +
      'e-Transformation — the e-document was already a separate object, and remains one.\n\n' +
      'There\'s an indirect benefit: because {{ACDOCA}} is the single source, the question ' +
      '*"what\'s in accounting?"* is answered with **a single query**. This **makes reconciliation ' +
      'easier** between the e-document and accounting.\n\n' +
      'But it doesn\'t **solve** the divergence problem: {{EDOCUMENT}} is still a separate table and ' +
      'can still fail independently.\n\n' +
      'So the *"the FI/CO reconciliation class became unnecessary"* improvement described in ' +
      '{{konu:error-handling}} **has no counterpart** in e-Transformation — because here, the ' +
      'second side sits **outside** SAP.',

    kalkanTcodes:[
      { eski:'{{EDOC_COCKPIT}}', yeni:'**Remains**', not:'+ Fiori monitoring apps' },
      { eski:'—', yeni:'The **DRC** framework', not:'e-Document and statutory reporting merged' },
      { eski:'—', yeni:'**Cloud edition**', not:'Regulatory updates come from SAP' },
    ],

    fiori:[
      { ad:'eDocument Cockpit (Fiori)', aciklama:'The {{EDOC_COCKPIT}} counterpart — status ' +
             'distribution shown **graphically**; speeds up the daily check.' },
      { ad:'Manage Electronic Documents', aciklama:'Per-document status, resending, and XML ' +
             'viewing.' },
      { ad:'Statistics for Electronic Documents', aciklama:'The periodic reject/error rate — the ' +
             'screen for *"how many invoices were rejected this month?"*' },
      { ad:'Manage Journal Entries', aciklama:'Jumps to the source accounting document.' },
    ],

    compatibilityViews:[
      '{{EDOCUMENT}} and `EDOCUMENTFILE` are **real tables** — not views.',
      'Custom e-document reports are **not affected** by {{uyumluluk-view}}s.',
      'But old custom reports reading tax data from {{BSEG}} are affected — the `SHKZG` sign logic ' +
      '({{konu:sap-tables}}).',
    ],

    performans:
      'Because e-document production is **asynchronous**, it doesn\'t slow down the invoice ' +
      'posting.\n\n' +
      'The bottleneck is usually **on the integrator\'s side**: during busy periods (month-end, a ' +
      'campaign) the sending queue builds up.\n\n' +
      'The symptom: a **large number** of documents stuck at "sent" status in {{EDOC_COCKPIT}}, and ' +
      'a delayed response.\n\n' +
      'This is **not** an SAP performance problem — capacity planning is discussed with the ' +
      'integrator. Keeping this distinction in mind matters, so as not to optimize in the wrong ' +
      'place.',

    bestPractices:[
      '**Add the {{EDOC_COCKPIT}} check to the month-end close list** — accounting close doesn\'t ' +
      'cover it.',
      'Keep the {{mukellef-sorgulama}} list **updated regularly**; define the update frequency as a ' +
      'process.',
      'Put the {{mali-muhur}} expiry date **on a calendar** — if it isn\'t renewed, all transmission ' +
      'stops one morning.',
      'Add an *"has the e-document mapping been done?"* step to the process for opening a new ' +
      '**invoice type** or **tax code**.',
      'At year-end, also check the **e-Fatura series** — alongside {{FBN1}}.',
      '**Close and keep closed** the period once its {{berat}} has been obtained, in {{OB52}}.',
      'During a migration, **transport the integrator settings separately** — the SAP side can look ' +
      'correct while sending doesn\'t work.',
      'A monthly **reconciliation**: the calculated VAT in accounting is compared against the ' +
      'e-Fatura total sent to GİB.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"The customer isn\'t paying" — turns out they never received the invoice at all',
    hikaye:
      'A collections review at **Ege Plastik Inc.** Overdue receivables past 90 days are being ' +
      'walked through, and one customer stands out: **Marmara Ambalaj**.\n\n' +
      'There are **4 invoices** on the customer account, totaling **687,000 TRY**, all past due.\n\n' +
      'The sales rep: *"I called, their accounting people say there\'s no such invoice. They must be ' +
      'stalling."*\n\n' +
      'The accounting manager opens the invoices in {{FB03}} — **all present**. In {{FBL5N}} the ' +
      'customer account is **correct**. The trial balance **balances**.\n\n' +
      '---\n\n' +
      'The consultant asks a single question: **"Have you looked at the e-document status?"**\n\n' +
      'They hadn\'t. It hadn\'t occurred to anyone — because there\'s **no problem at all** on the ' +
      'accounting side.',
    veriler:[
      { k:'Customer', v:'Marmara Ambalaj — 4 invoices' },
      { k:'Amount', v:'**687,000 TRY** · all 90+ days past due' },
      { k:'{{FB03}}', v:'The invoices **exist** ✓' },
      { k:'{{FBL5N}}', v:'The customer account balance is **correct** ✓' },
      { k:'Customer\'s claim', v:'*"No such invoice exists"*' },
      { k:'Place no one checked', v:'**{{EDOC_COCKPIT}}**' },
    ],

    adimlar:[
      { baslik:'The e-document status — the side accounting doesn\'t show', tcode:'EDOC_COCKPIT',
        aciklama:'This screen is being looked at for the first time.',
        girdi:[
          { alan:'Filter', deger:'Customer Marmara Ambalaj · last 6 months' },
          { alan:'Status of the 4 invoices', deger:'**REJECTED**' },
          { alan:'Rejection reason', deger:'*"Recipient is an e-Fatura taxpayer"*' },
          { alan:'Type issued', deger:'**{{e-arsiv}}** — wrong' },
        ],
        not:'**The customer was telling the truth.**\n\n' +
             'The invoices had been issued as {{e-arsiv}}, and {{gib}} **rejected** them, saying ' +
             '*"this recipient is an e-Fatura taxpayer, e-Arşiv is not accepted."*\n\n' +
             'A rejected e-Arşiv invoice **never reaches** the recipient at all. There\'s **no such ' +
             'invoice** on Marmara Ambalaj\'s books — because there really isn\'t one.\n\n' +
             'And SAP gave **no warning whatsoever** in this situation: the accounting document had ' +
             'been created successfully.' },

      { baslik:'Why was the wrong type chosen?', tcode:'SE16N',
        aciklama:'The source of the document-type decision is examined.',
        girdi:[
          { alan:'Customer master data', deger:'E-document type = **e-Arşiv**' },
          { alan:'Last update', deger:'{{CDHDR}} → **14 months ago**' },
          { alan:'GİB taxpayer list', deger:'Marmara Ambalaj **registered** — added 8 months ago' },
          { alan:'The system\'s list', deger:'Last updated **11 months ago**' },
        ],
        not:'**Root cause found.**\n\n' +
             'Marmara Ambalaj became an e-Fatura taxpayer 8 months ago. The {{mukellef-sorgulama}} ' +
             'list in the system was last updated **11 months ago**.\n\n' +
             'So the list reflects the situation **before** the customer became a registered ' +
             'taxpayer.\n\n' +
             '**This isn\'t a software bug, it\'s a process gap:** updating the list **was nobody\'s ' +
             'job**. It had been loaded at initial go-live and forgotten.' },

      { baslik:'How wide is the exposure? — just one customer?', tcode:'EDOC_COCKPIT',
        aciklama:'The same class of error is scanned for.',
        girdi:[
          { alan:'Scan', deger:'Last 12 months · status **REJECTED**' },
          { alan:'Result', deger:'**63 invoices** · **11 different customers**' },
          { alan:'Total amount', deger:'**2,940,000 TRY**' },
          { alan:'Oldest', deger:'**9 months ago** — never noticed' },
        ],
        not:'**The problem wasn\'t limited to one customer.**\n\n' +
             '11 customers had become e-Fatura taxpayers, and the system was still issuing them ' +
             '{{e-arsiv}}. 63 invoices had been getting rejected for 9 months.\n\n' +
             '**None of it was noticed** because:\n' +
             '• The accounting side was trouble-free\n' +
             '• The close list had **no** e-document check\n' +
             '• {{EDOC_COCKPIT}} was **not** part of anyone\'s daily routine\n\n' +
             'This is the textbook example of the ' +
             '**② silent error** class from {{konu:error-handling}}.' },

      { baslik:'Why didn\'t it surface until the collections review?', tcode:'FBL5N',
        aciklama:'It\'s examined why existing controls failed to catch it.',
        girdi:[
          { alan:'Month-end close', deger:'Trouble-free — trial balance balances ✓' },
          { alan:'{{F150}} dunning', deger:'Ran — dunning letters were sent' },
          { alan:'Dunning outcome', deger:'Customers said *"no such invoice"*, it was **never logged**' },
          { alan:'VAT return', deger:'Produced from accounting — **no discrepancy noticed**' },
        ],
        not:'**All three controls missed the problem, and each was right on its own terms.**\n\n' +
             '**Close** looks at accounting — accounting was correct.\n' +
             '**Dunning** catches overdue items — the item really was overdue.\n' +
             '**The VAT return** is produced from accounting — accounting was consistent.\n\n' +
             '**None of them asked "did this invoice actually reach the other party?"**\n\n' +
             'Customers had answered the dunning letters with *"no such invoice"* — but those ' +
             'responses **were never logged**; the sales reps interpreted them as **stalling**.\n\n' +
             'The signal **was there**; it just wasn\'t read.' },

      { baslik:'The fix — two steps for 63 invoices', tcode:'EDOC_COCKPIT',
        aciklama:'The master data first, then reissuing the invoices.',
        girdi:[
          { alan:'① Taxpayer list', deger:'A **current** list loaded from GİB' },
          { alan:'② Master data', deger:'11 customers\' e-document type → **e-Fatura**' },
          { alan:'③ Rejected invoices', deger:'**Cannot be resent** — the type itself was wrong' },
          { alan:'④ Fix', deger:'Cancellation + **reissue with the correct type**' },
          { alan:'⑤ Verification', deger:'{{EDOC_COCKPIT}} → rejections **0** ✓' },
        ],
        fis:{ baslik:'One of the reissued invoices', belgeTuru:'RV', tarih:'28.11.2027',
          satirlar:[
            { hesap:'120', ad:'Trade receivables — Marmara Ambalaj', borc:187000 },
            { hesap:'600', ad:'Domestic sales', alacak:155833.33 },
            { hesap:'391', ad:'Calculated VAT 20%', alacak:31166.67 },
          ], not:'The accounting entry is **identical to the original** — the only things that ' +
                 'changed are the e-document type and the invoice date.\n\n' +
                 'But the due date **reset**: the 9-month collection delay **could not be recovered**.\n\n' +
                 'This is the real cost of the silent error — ' +
                 'accounting can be fixed, **elapsed time cannot**.' },
        tabloEtkisi:[
          { tablo:'EDOCUMENT', ne:'New records — type **e-Fatura**, status accepted' },
          { tablo:'BKPF', ne:'Cancellations + new documents' },
          { tablo:'KNB1', ne:'The e-document type of 11 customers was updated' },
        ],
        not:'**The rejected invoice couldn\'t be resent.** {{EDOC_RESUBMIT}} only fixes ' +
             '**transient** errors; here the error was **permanent** — the document type itself was ' +
             'wrong.\n\n' +
             'The right approach: cancel the existing documents and **reissue with the correct ' +
             'type**.' },

      { baslik:'Lasting fixes', tcode:'EDOC_COCKPIT',
        aciklama:'Five measures — control, process, monitoring, signal, and reconciliation.',
        girdi:[
          { alan:'① Daily check', deger:'{{EDOC_COCKPIT}} → **error and reject = 0** · a morning routine' },
          { alan:'② Close list', deger:'A **"is the e-document status clean?"** item added to the month-end steps' },
          { alan:'③ Process owner', deger:'Updating the {{mukellef-sorgulama}} list assigned as a **monthly task**' },
          { alan:'④ Signal', deger:'A dunning response of *"no such invoice"* now **triggers an e-document check**' },
          { alan:'⑤ Reconciliation', deger:'Monthly: accounting\'s calculated VAT ↔ the GİB e-Fatura total' },
        ],
        not:'**The fourth measure is the most interesting one.**\n\n' +
             'The signal **had already existed**: customers had been saying *"no such invoice"* for ' +
             'months. But that response wasn\'t seen as **data**, it was interpreted as an ' +
             '**excuse**.\n\n' +
             'The new rule is simple: if a *"no such invoice exists"* response comes up in dunning ' +
             'or a collections conversation, the sales rep passes it along as **a request for an ' +
             'e-document check**.\n\n' +
             '---\n\n' +
             '**The fifth measure is the most reliable one.** The others depend on human discipline; ' +
             'reconciliation is **numeric and unavoidable**: if the calculated VAT in accounting and ' +
             'the e-Fatura total sent to GİB don\'t match, **something is missing**.' },
    ],

    sonuc:
      '**The accounting was flawless, and the invoices had never reached the other party for 9 ' +
      'months.**\n\n' +
      '**Five key lessons:**\n\n' +
      '**1. The accounting document and the e-document are two separate objects.** Seeing the ' +
      'invoice in {{FB03}}, seeing the debit in {{FBL5N}}, having a balanced trial balance — none of ' +
      'it **shows** that the e-document reached the other party. {{FB03}} answers *"did we record ' +
      'it?"*, {{EDOC_COCKPIT}} answers *"were we able to send it?"* Confusing these two questions is ' +
      'the **sole cause** of this case.\n\n' +
      '**2. The document type isn\'t the user\'s choice.** Whether it\'s {{e-fatura}} or {{e-arsiv}} ' +
      'depends on **the recipient\'s taxpayer status**. The decision comes from the ' +
      '{{mukellef-sorgulama}} list — and **a stale list means the wrong decision**. Updating the ' +
      'list needs a **process owner**; if it\'s nobody\'s job, it doesn\'t get done.\n\n' +
      '**3. Accounting close doesn\'t cover the e-document check.** Close, dunning, and the VAT ' +
      'return — all three missed the problem, and **each was right on its own terms**. None of them ' +
      'asked *"did this invoice reach the other party?"* That question needs **a separate check**.\n\n' +
      '**4. The signal existed, it just wasn\'t read.** Customers had been saying *"no such ' +
      'invoice"* for months. That response was interpreted as an **excuse**, not **data**. In ' +
      'silent errors, a signal usually exists — but it arrives from an unexpected place, in an ' +
      'unexpected form.\n\n' +
      '**5. Accounting can be fixed, elapsed time cannot.** The invoices were reissued with the ' +
      'correct type and the accounting ended up identical to the original. But the **due date ' +
      'reset**: the 9-month collection delay could not be recovered. This is the most concrete case ' +
      'of the *"the cost of a fix grows over time"* principle from {{konu:error-handling}}.',
  },

  },
});
