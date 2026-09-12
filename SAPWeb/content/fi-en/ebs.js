/* ==========================================================================
   content/fi-en/ebs.js — English body for "Electronic Bank Statement"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'ebs',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Electronic Bank Statement (EBS) is the loading of a **standard-format file** received from the bank ' +
      'into the system, together with the automatic posting of the lines it contains.\n\n' +
      'The process has three layers: **file upload** ({{FF_5}}) → **automatic interpretation and posting** ' +
      '(posting rules) → **manual correction of unmatched items** ({{FEBAN}}).\n\n' +
      'EBS\'s core idea is this: the bank sends a **transaction code** for every movement; the system maps ' +
      'that code to a **posting rule**; the rule says which accounts will be used. The system also tries to ' +
      'close the open item by searching the description text ({{ekstre-eslestirme}}) for a document number.',

    neden:
      '**Volume.** Entering a 300-line statement by hand every day isn\'t practical — it\'s both slow and error-prone.\n\n' +
      '**Accuracy.** Automatic interpretation eliminates manual-entry errors, and the balance check comes straight from the file.\n\n' +
      '**Speed.** Manual reconciliation takes days; with EBS it drops to hours. In a typical setup ' +
      '**80–90% of lines match automatically**; a human only deals with the rest.\n\n' +
      '**Cash visibility.** When the statement is loaded daily, the bank balance is known in near real time.',

    sirketOnemi:
      'EBS is the **single highest-return improvement** in FI-BL. Setting it up is a matter of a few weeks; ' +
      'the return repeats every day.\n\n' +
      'From a consulting standpoint, EBS is a topic that\'s "hard to configure but simple in logic." The ' +
      'difficulty lies in {{OT83}}\'s multi-layered structure: account symbols → symbol-to-account assignment ' +
      '→ posting rules → transaction-code assignment. Unless these four layers are set up correctly, not a ' +
      'single line posts automatically.\n\n' +
      'The distinguishing question is: **"What is an account symbol, and why is it used?"** — the answer ' +
      'reveals whether EBS has genuinely been set up.',

    gercekHayat:
      'A retail chain uses 11 accounts at 4 banks and receives an average of 340 statement lines a day.\n\n' +
      'Before EBS: two people enter statements full-time, month-end reconciliation takes 4 days, and the ' +
      'clearing account balance constantly wanders between 1–2 million TRY.\n\n' +
      'After EBS: files load automatically every morning, and 291 of the 340 lines (86%) post on their own. ' +
      'The remaining 49 lines are processed by one person in {{FEBAN}} in 40 minutes. Reconciliation is done ' +
      'daily, and the clearing account balance drops below 50,000 TRY.\n\n' +
      'Most unmatched lines come down to one thing: the customer didn\'t put the invoice number in the description field.',

    muhasebeMantigi:
      'EBS doesn\'t introduce a separate accounting logic; it automates the second stage of the ' +
      '**two-stage posting** described in the {{konu:bank-accounting}} topic.\n\n' +
      'For every statement line, the system asks: **"Does this movement already have a counterpart recorded ' +
      'in accounting?"**\n\n' +
      '**If yes** (a payment we made, a collection we already recorded): the {{banka-ara-hesabi}} is closed ' +
      'and the actual bank account moves. A simple two-line posting.\n\n' +
      '**If no** (a bank fee, interest, an unexpected wire transfer): the actual bank account and the ' +
      'relevant income/expense account are posted directly; no clearing account is used.\n\n' +
      'Posting rules are defined to distinguish between these two cases.',

    kavramlar: ['ekstre-eslestirme', 'banka-ara-hesabi', 'valor-tarihi', 'ev-bankasi',
                'acik-kalem-yonetimi', 'kapatma', 'acik-kalem'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The EBS process is a **daily routine** made up of four steps: the file is received, uploaded, ' +
      'processed automatically, and whatever\'s left is corrected by hand. In a healthy setup, the fourth ' +
      'step takes up only a small share of the total time.',

    roller:[
      { rol:'Bank', gorev:'Produces and sends a standard-format statement file at a set time every day.' },
      { rol:'IT / integration', gorev:'Retrieves the file from the bank and drops it into a directory on the SAP server (visible via {{AL11}}).' },
      { rol:'Bank accountant', gorev:'Uploads the file ({{FF_5}}), checks the result, and processes unmatched items in {{FEBAN}}.' },
      { rol:'AR accounting', gorev:'Links unmatched collections to the correct customer; contacts the customer.' },
      { rol:'Accounting manager', gorev:'Monitors the daily clearing-account balance; tracks the match rate.' },
      { rol:'FI consultant', gorev:'Sets up the {{OT83}} configuration: account symbols, posting rules, transaction-code assignment, the interpretation algorithm.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The EBS daily flow — from file to reconciliation',
      adimlar:[
        { ic:'🏦', rol:'Bank', baslik:'The statement file is produced',
          aciklama:'A standard format: **MT940** (SWIFT), **CAMT.053** (ISO 20022 XML), or **BAI2** (US). ' +
                   'Every line carries a bank transaction code, an amount, a {{valor-tarihi}}, and a description text.',
          cikti:'Statement file', ok:'is transferred into the system' },
        { ic:'📥', rol:'IT / User', baslik:'The file is brought into the system ({{FF_5}})',
          aciklama:'Uploaded from a directory on the server or from the user\'s computer. ' +
                   'Data is written to the {{FEBKO}} (header) and {{FEBEP}} (lines) tables.',
          cikti:'{{FEBKO}} / {{FEBEP}} records', ok:'interpretation begins' },
        { ic:'🧭', rol:'System', baslik:'Transaction code → posting rule mapping',
          aciklama:'The transaction code sent by the bank (defined in {{OT83}}) is mapped to a **posting rule**. ' +
                   'The rule says which accounts get debited/credited, using **account symbols**.',
          cikti:'A determined posting rule', ok:'accounts are resolved' },
        { ic:'🔑', rol:'System', baslik:'Account symbols are resolved to the actual account',
          aciklama:'The "BANK" symbol → the G/L account of that house bank account. ' +
                   'Thanks to this, **a single rule works for 11 different bank accounts**.',
          cikti:'Actual G/L accounts', ok:'matching is attempted' },
        { ic:'🔍', rol:'System', baslik:'An open item is searched for (interpretation algorithm)',
          aciklama:'The description text is searched for a document number, reference, or amount. ' +
                   'If found, the {{banka-ara-hesabi}} item is closed.',
          cikti:'Matched open item', ok:'if it matches' },
        { ic:'✓', rol:'System', baslik:'An FI document is created automatically',
          aciklama:'The clearing account closes, the actual bank account moves. The line is marked "processed."',
          cikti:'FI document', ok:'if it doesn\'t match' },
        { ic:'✋', rol:'Bank accountant', baslik:'Unmatched lines are processed by hand ({{FEBAN}})',
          aciklama:'The line is linked to the correct account or open item by hand. ' +
                   'If a recurring pattern shows up, the {{OT83}} rule is updated.',
          cikti:'A fully processed statement', ok:'at day\'s end' },
        { ic:'⚖️', rol:'Accounting manager', baslik:'The clearing account and match rate are monitored',
          aciklama:'Is the clearing account balance low? Is the match rate above 80%? ' +
                   'If not, the rules need improving.',
          cikti:'A reconciled bank account' },
      ],
    },

    adimlar:[
      { rol:'Bank', eylem:'Produces the statement file', sistem:'MT940 / CAMT.053 / BAI2' },
      { rol:'IT', eylem:'Drops the file on the server', sistem:'The directory is checked with {{AL11}}' },
      { rol:'Bank accountant', eylem:'Uploads the file', sistem:'{{FF_5}} → {{FEBKO}}, {{FEBEP}}' },
      { rol:'System', eylem:'Applies the posting rules', sistem:'{{OT83}} configuration' },
      { rol:'System', eylem:'Attempts open-item matching', sistem:'The interpretation algorithm' },
      { rol:'Bank accountant', eylem:'Processes the unmatched items', sistem:'{{FEBAN}}' },
      { rol:'Bank accountant', eylem:'Checks the uploaded statements', sistem:'{{FEBA}}' },
      { rol:'Accounting manager', eylem:'Monitors the clearing account', sistem:'{{FBL3N}}' },
    ],

    veriAkisi:{
      nereden:'The standard-format file coming from the bank; the {{OT83}} configuration; open items in the ' +
              '{{banka-ara-hesabi}}; the account-to-G/L link from {{T012K}}.',
      nereye:'Into the {{FEBKO}}/{{FEBEP}} statement tables; from there into FI documents ({{BKPF}}/{{BSEG}}); ' +
             'into closed clearing-account items and the actual bank account.',
      tetikleyen:'The bank\'s daily statement file. Usually scheduled to upload automatically every morning.',
      sonraki:'Daily reconciliation, cash reporting, month-end bank reconciliation.',
    },

    notlar:[
      { tip:'tip', baslik:'The match rate is a quality indicator', metin:
        'In a healthy EBS setup, **80–90% of lines** match automatically. If the rate is below that, there ' +
        'are three places to improve:\n\n' +
        '**(1) Posting rules** — some bank transaction codes may not be mapped.\n' +
        '**(2) The interpretation algorithm** — the rule for extracting a document number from the ' +
        'description text may be weak.\n' +
        '**(3) Process** — customers can be reminded to put the invoice number in the wire-transfer description.\n\n' +
        'The third usually delivers the biggest gain, and it isn\'t a technical job.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The postings EBS produces fall into two groups: movements **with a counterpart** (the clearing ' +
      'account closes) and movements **without one** (posted directly). Posting rules make this distinction.',

    etkilenenHesaplar:[
      { hesap:'102001 Banks — actual account', tur:'Balance sheet — Asset', neden:'Moves on **every** statement line. Once the statement is processed, its balance must match the bank\'s figure.' },
      { hesap:'102091 / 102081 Clearing accounts', tur:'Balance sheet — Clearing', neden:'Only moves on movements **with a counterpart**; closed and zeroed out via clearing.' },
      { hesap:'770 Bank charges', tur:'Income statement', neden:'No counterpart — learned about for the first time from the statement, posted directly.' },
      { hesap:'642 Interest income / 780 Interest expense', tur:'Income statement', neden:'Posted directly, the same way.' },
      { hesap:'120 Trade receivables', tur:'Balance sheet — Asset', neden:'On matched collections, the customer\'s open item is closed.' },
      { hesap:'Temporary difference account', tur:'Balance sheet', neden:'A holding account for lines that can\'t be matched but still need to be posted; corrected afterward via {{FEBAN}}.' },
    ],

    fisler:[
      { baslik:'Case 1 — With a counterpart: an outgoing payment reflected on the statement',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102091', ad:'Bank clearing account — outgoing', borc:140000, not:'**Closed** — matched the F110 item' },
          { hesap:'102001', ad:'Banks — ISB', alacak:140000, not:'The money actually left' },
        ],
        not:'The system found the payment document number in the description text and closed the item in the ' +
             'clearing account. This is EBS\'s most common posting type, and it\'s **fully automatic**.' },

      { baslik:'Case 2 — With a counterpart: a customer collection matched',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102001', ad:'Banks — ISB', borc:98750, not:'Money came in' },
          { hesap:'120', ad:'Trade receivables — C-5001', alacak:98750, not:'**Open item closed**' },
        ],
        not:'The customer put the invoice number in the wire-transfer description; the system found that item ' +
             'in {{BSID}} and closed it. No clearing account was used because the collection **hadn\'t already ' +
             'been recorded** — it was learned about for the first time from the statement.' },

      { baslik:'Case 3 — Without a counterpart: a bank fee',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — bank fee', borc:450, not:'From the posting rule' },
          { hesap:'102001', ad:'Banks — ISB', alacak:450 },
        ],
        not:'The transaction code (e.g. 835) is mapped directly to a posting rule; the rule names the expense ' +
             'account. **No open item is searched for** — this is an informational posting.' },

      { baslik:'Case 4 — An unmatched collection (to the suspense account)',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102001', ad:'Banks — ISB', borc:80000, not:'Money came in — certain' },
          { hesap:'102099', ad:'Bank suspense account', alacak:80000, not:'**Whose money it is, is unknown**' },
        ],
        not:'A wire transfer arrived but the description was blank; which customer it belonged to couldn\'t be ' +
             'determined. The system parked the money in the suspense account. **The bank balance is ' +
             'correct**, only the counterparty is uncertain. To be corrected by hand in {{FEBAN}}.' },

      { baslik:'Case 4 continued — corrected via {{FEBAN}}',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102099', ad:'Bank suspense account', borc:80000, not:'Suspense account emptied' },
          { hesap:'120', ad:'Trade receivables — C-5012', alacak:80000, not:'Linked to the correct customer' },
        ],
        not:'The AR team reviewed the amount and date and found the customer. The suspense account was ' +
             'zeroed out. This account\'s balance should **drop to zero daily** — if it doesn\'t, there\'s pending work.' },
    ],

    tHesaplar:[
      { hesap:'Banks — actual account', kod:'102001',
        borc:[{ ad:'Collections', tutar:178750 }],
        alacak:[{ ad:'Payments', tutar:140000 }, { ad:'Fee', tutar:450 }],
        not:'Matches the bank\'s figure after the statement is processed' },
      { hesap:'Bank clearing account — outgoing', kod:'102091',
        borc:[{ ad:'Statement match', tutar:140000 }],
        alacak:[{ ad:'F110 payment', tutar:140000 }],
        not:'EBS closes this account automatically' },
      { hesap:'Bank suspense account', kod:'102099',
        borc:[{ ad:'FEBAN correction', tutar:80000 }],
        alacak:[{ ad:'Unmatched wire transfer', tutar:80000 }],
        not:'**Should drop to zero daily**' },
    ],

    notlar:[
      { tip:'tip', baslik:'Why is a suspense account needed?', metin:
        'For an unmatched line there are two options: **don\'t post it**, or **post it to a suspense account**.\n\n' +
        'Not posting it leaves the bank balance wrong — the money is at the bank but not in accounting. ' +
        'Posting it to a suspense account keeps the bank balance **correct**; only the counterparty stays uncertain.\n\n' +
        'That\'s why most setups use a suspense account. The critical rule: this account\'s balance should ' +
        '**drop to zero daily**. Its buildup shows there are unprocessed lines in {{FEBAN}}.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'EBS varies along two axes: **file format** and **posting-rule type**.',

    liste:[
      { ad:'SWIFT MT940',
        aciklama:'SWIFT\'s text-based standard statement format. It has been in use for decades and is ' +
                 'supported by nearly every bank.',
        neZaman:'The common standard. Most banks in Turkey provide MT940.',
        ornek:'Line tags: `:61:` movement, `:86:` description (note to payee), `:60F:` opening balance.',
        tcodes:['FF_5'] },

      { ad:'ISO 20022 XML',
        aciklama:'A modern XML-based standard. Carries **far richer** data than MT940: structured ' +
                 'references, detailed business-partner information, multiple amount fields.',
        neZaman:'Should be preferred for new setups. The match rate is noticeably higher than MT940\'s ' +
                'because the reference fields are structured.',
        ornek:'Standard in the SEPA area; increasingly common in Turkey.',
        tcodes:['FF_5'] },

      { ad:'Bank Administration Institute',
        aciklama:'The format used by US banks.',
        neZaman:'For companies with US operations.' },

      { ad:'Manual Statement — FF67',
        aciklama:'No file; lines are entered by hand. Posting rules still apply.',
        neZaman:'At banks that don\'t provide an electronic statement; on small foreign accounts.',
        ornek:'See the {{konu:bank-accounting}} topic.',
        tcodes:['FF67'] },

      { ad:'Posting Rule with Clearing',
        aciklama:'The rule aims to close an open item. The system searches the description text for a document number.',
        neZaman:'For payments we made and collections we already recorded — that is, movements with a ' +
                'counterpart in the {{banka-ara-hesabi}}.',
        ornek:'Transaction code 051 (outgoing wire transfer) → close the clearing account.',
        tcodes:['OT83'] },

      { ad:'Posting Rule without Clearing',
        aciklama:'The rule posts between two fixed accounts; it doesn\'t search for an open item.',
        neZaman:'For movements without a counterpart, such as bank fees, interest, and stamp duty.',
        ornek:'Transaction code 835 (fee) → 770 expense debit / bank credit.',
        tcodes:['OT83'] },

      { ad:'Posting Rule with Customer Search',
        aciklama:'For incoming wire transfers, it tries to find an open item in {{BSID}} by searching the ' +
                 'description text for a **customer number or invoice number**.',
        neZaman:'When automatic matching of collections is wanted. This rule affects the match rate the most.',
        ornek:'The invoice number is extracted from the text "Payment for FT2026000341" and the customer\'s item is closed.',
        tcodes:['OT83','FEBAN'] },
    ],

    karsilastirmaBasliklar:['MT940', 'CAMT.053'],
    karsilastirma:[
      ['Format', 'Text (SWIFT-tagged)', 'XML (ISO 20022)'],
      ['Data richness', 'Limited — description is the only free field', '**Rich** — structured reference fields'],
      ['Match rate', 'Moderate (70–85%)', '**High** (85–95%)'],
      ['Business-partner information', 'Embedded in free text', 'In separate structured fields'],
      ['Prevalence', 'Almost every bank', 'Increasingly common'],
      ['For a new setup', 'Acceptable', '**Preferred**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FF_5', ad:'Electronic bank statement upload',
        amac:'Brings the file from the bank into the system and posts it according to the posting rules.',
        neZaman:'Every day, when the statement file arrives. Usually scheduled as a background job.',
        adimlar:[
          { baslik:'Choose the file format', aciklama:'MT940, CAMT.053, BAI2, or a multi-bank format.' },
          { baslik:'Enter the file path',
            aciklama:'A directory on the server (checked with {{AL11}}) or a local file. Automatic upload ' +
                     'uses the server directory.' },
          { baslik:'Set the posting parameters',
            aciklama:'**Generate a batch input session** or **post directly**? Direct posting is fast; a ' +
                     'batch input session ({{SM35}}) lets errors be reviewed one by one.' },
          { baslik:'Run in test mode (for the initial setup)',
            aciklama:'Shows which lines will match which rule, without posting.' },
          { baslik:'Run in production mode and review the result list',
            aciklama:'How many lines were processed, how many fell into {{FEBAN}} — the match rate is read from here.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Format: MT940 · File: /usr/sap/interface/statement_20260926.txt' },
          { ekran:'Posting parameters', islem:'Direct posting ✓ · Statement number automatic' },
          { ekran:'Result list', islem:'340 lines read · 291 posted · 49 fell into FEBAN' },
        ],
        alanlar:{
          zorunlu:['File format','File path','Company code / house bank mapping'],
          opsiyonel:['Test mode','Batch input session name','Statement number','Posting date'] },
        hatalar:[
          { mesaj:'Statement number ... already exists', sebep:'The same statement was already uploaded.', cozum:'Check with {{FEBA}}; cancel the duplicate upload. The file-archiving logic for automatic uploads should be reviewed.' },
          { mesaj:'House bank / account ID could not be determined', sebep:'The account number in the file doesn\'t match any {{T012K}} record.', cozum:'Make sure the account number/IBAN in {{FI12}} is **exactly identical** to the one in the file. A spacing or format difference is a common cause.' },
          { mesaj:'Posting rule not found for transaction ...', sebep:'The bank transaction code isn\'t mapped in {{OT83}}.', cozum:'Assign the transaction code to a posting rule; in the meantime the lines fall into {{FEBAN}}.' },
          { mesaj:'Error in file structure / parse error', sebep:'The file format is corrupted or doesn\'t match the format selected.', cozum:'View the file with {{AL11}}; request it again from the bank. A character-encoding difference (UTF-8 / ANSI) is a common cause.' },
        ],
        ipucu:'On the initial setup, run in test mode for **a few days for every new bank** and collect the ' +
              'transaction codes that don\'t match. This list is {{OT83}} configuration\'s roadmap.',
        ilgili:['FEBAN','FEBA','OT83','FF67'] },

      { kod:'FEBAN', ad:'Bank statement correction (post-processing)',
        amac:'Links statement lines that didn\'t match automatically to an account or open item by hand.',
        neZaman:'After every statement upload. This is where EBS\'s daily manual effort goes.',
        adimlar:[
          { baslik:'Enter the company code, house bank, and date range',
            aciklama:'Unprocessed lines are listed; the status indicator is yellow/red.' },
          { baslik:'Select the line and read the description text',
            aciklama:'The text may hint at a customer name, invoice number, or reference.' },
          { baslik:'Decide the target: an open item or a direct account?',
            aciklama:'If it\'s a collection, the customer is selected and matched from the open item list; ' +
                     'if it\'s a fee/interest item, a G/L account is entered directly.' },
          { baslik:'Change the posting rule if needed',
            aciklama:'The system proposes a rule; if it\'s not right, it\'s chosen by hand.' },
          { baslik:'Save — the line becomes "processed"',
            aciklama:'An FI document is created and the suspense account, if used, is emptied.' },
        ],
        ekranAkisi:[
          { ekran:'Selection', islem:'Company code 1000 · House bank ISB · 26.09.2026' },
          { ekran:'Line list', islem:'49 unprocessed lines; amount and description shown' },
          { ekran:'Line detail', islem:'Wire transfer 80,000 TRY · description: "PAYMENT" (no information)' },
          { ekran:'Matching', islem:'Customer C-5012 selected → open items listed → 80,000 TRY matched' },
        ],
        alanlar:{
          zorunlu:['Statement line','Target account or business partner','Posting rule'],
          opsiyonel:['Text','Assignment','Partial/residual clearing choice'] },
        hatalar:[
          { mesaj:'No open items found for customer ...', sebep:'The customer has no open item, or the amount doesn\'t match.', cozum:'Check with {{FBL5N}}; it may be a partial payment. Confirm it\'s the right customer.' },
          { mesaj:'Difference too large for clearing', sebep:'The collection amount doesn\'t match the open item.', cozum:'Use partial clearing or select multiple items.' },
          { mesaj:'Posting period is not open', sebep:'The period for the statement date is closed.', cozum:'Open it with {{OB52}} or change the posting date.' },
        ],
        ipucu:'If you notice a recurring pattern in {{FEBAN}} (the same bank code always being processed by ' +
              'hand), that\'s a **configuration opportunity**: add a rule in {{OT83}} to automate that ' +
              'pattern. This is how EBS matures.',
        ilgili:['FF_5','FEBA','OT83','FBL5N'] },

      { kod:'FEBA', ad:'Bank statement display',
        amac:'Shows uploaded statements and their line-by-line processing status.',
        neZaman:'For "has this statement been uploaded?"; for checking against duplicate uploads; before reconciliation.',
        adimlar:[
          { baslik:'Enter the company code, house bank, and date range' },
          { baslik:'Review the statement list',
            aciklama:'Every statement\'s number, date, opening/closing balance, and **processing status** are shown.' },
          { baslik:'Double-click a statement → drill into the line detail' },
        ],
        ipucu:'Check that the statement numbers are **sequential**. A skipped number means an unloaded ' +
              'statement and creates an unexplained difference in reconciliation.',
        ilgili:['FF_5','FEBAN','FEBKO'] },

      { kod:'OT83', ad:'EBS global settings — posting rules and account symbols',
        amac:'Gathers the entire EBS configuration into four layers. **The heart of EBS.**',
        neZaman:'At setup, and whenever a new bank/transaction code is added.',
        adimlar:[
          { baslik:'1) Define account symbols',
            aciklama:'Abstract names: **BANK** (the actual bank account), **OUTGOING** (outgoing clearing ' +
                     'account), **INCOMING** (incoming clearing account), **CHARGES** (fees). These aren\'t real accounts yet.' },
          { baslik:'2) Assign accounts to symbols',
            aciklama:'Symbol → actual G/L account. A mask is used: a mask like `+++++++++0` **automatically ' +
                     'substitutes** the house bank account\'s G/L number. **A single definition works for 11 ' +
                     'bank accounts** — that\'s the whole reason symbols exist.' },
          { baslik:'3) Create posting rules',
            aciklama:'Every rule is an accounting-posting template: which symbol is debited, which is ' +
                     'credited, what document type, whether clearing happens.' },
          { baslik:'4) Assign external transactions to posting rules',
            aciklama:'Which rule does the bank\'s transaction code (051, 835, 202…) map to? The ' +
                     '**interpretation algorithm** is also chosen here: what will be searched for in the description text?' },
          { baslik:'5) Assign bank accounts to transaction types',
            aciklama:'Which house bank account uses which set of transaction types.' },
        ],
        ekranAkisi:[
          { ekran:'Account symbols', islem:'BANK, OUTGOING, INCOMING, CHARGES, INTEREST defined' },
          { ekran:'Symbol → account', islem:'BANK → mask 1020++, OUTGOING → 102091, CHARGES → 770100' },
          { ekran:'Posting rule', islem:'Rule Z01: OUTGOING debit / BANK credit · clearing **on**' },
          { ekran:'Transaction-code assignment', islem:'051 (outgoing wire transfer) → rule Z01 · interpretation algorithm 001' },
        ],
        alanlar:{
          zorunlu:['Account symbols','Symbol-account assignment','Posting rules','Transaction-code assignment'],
          opsiyonel:['Interpretation algorithm','Difference account','Document type'] },
        hatalar:[
          { mesaj:'Account symbol ... has no account assignment', sebep:'Layer 2 is missing.', cozum:'Assign a G/L account or mask to the symbol.' },
          { mesaj:'Posting rule ... is incomplete', sebep:'The rule is missing a debit or credit symbol.', cozum:'Complete the rule; every rule must contain at least two symbols.' },
          { mesaj:'External transaction ... not assigned', sebep:'The bank transaction code isn\'t mapped to any rule.', cozum:'Make the assignment in layer 4. This is the most common EBS configuration gap.' },
        ],
        ipucu:'**EBS can\'t be set up without grasping the account-symbol concept.** A symbol defines an ' +
              'abstract role like "the actual bank account"; thanks to the mask, it resolves to the correct ' +
              'G/L account for every house bank account. This way **a single posting rule works for every ' +
              'bank**. Without symbols, a separate rule would be needed for every bank account.',
        ilgili:['FF_5','FEBAN','FI12','T012K'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'EBS\'s own tables are two: {{FEBKO}} (statement header) and {{FEBEP}} (lines). ' +
      'The accounting postings it produces go into the standard FI tables.',

    liste:[
      { ad:'FEBKO', baslik:'Bank statement header',
        tutar:'Every statement\'s identity: house bank, account ID, statement number, date, opening and ' +
              'closing balance, line count.',
        olusturan:'{{FF_5}} (electronic) or {{FF67}} (manual)',
        guncelleyen:'Upload transactions',
        anahtar:'KUKEY',
        iliskiler:'To its lines via {{FEBEP}}; to the bank account via {{T012K}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KUKEY', aciklama:'Statement ID (internal key)' },
          { ad:'AZNUM', aciklama:'Statement number — **must be sequential**' },
          { ad:'AZDAT', aciklama:'Statement date' },
          { ad:'ASBTR / AEBTR', aciklama:'Opening and closing balance — comes from the file' },
          { ad:'HBKID / HKTID', aciklama:'House bank and account ID' },
        ] },

      { ad:'FEBEP', baslik:'Bank statement items',
        tutar:'The statement\'s lines: bank transaction code, amount, {{valor-tarihi}}, description text, ' +
              'and **processing status**.',
        olusturan:'{{FF_5}} / {{FF67}}',
        guncelleyen:'Status is updated once matching is done via {{FEBAN}}',
        anahtar:'KUKEY + ESNUM',
        iliskiler:'A child of {{FEBKO}}; links to the FI document it matches.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'ESNUM', aciklama:'Line number' },
          { ad:'VGEXT', aciklama:'**External transaction code** — the code sent by the bank (051, 835…). The posting rule is chosen based on this.' },
          { ad:'VGINT', aciklama:'Internal transaction code — SAP\'s own classification' },
          { ad:'KWBTR', aciklama:'Line amount' },
          { ad:'VALUT', aciklama:'{{valor-tarihi}} — used by cash management' },
          { ad:'SGTXT', aciklama:'Description text (note to payee) — **the main input for automatic matching**' },
          { ad:'ANWSO / Status', aciklama:'The line\'s processing status; appears in {{FEBAN}} if unprocessed' },
        ] },

      { ad:'T012K', baslik:'House bank account IDs',
        tutar:'Every account\'s IBAN, account number, and G/L account. On an EBS upload, the account number ' +
              'in the file must **match** the record here.',
        olusturan:'{{FI12}}',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID + HKTID',
        iliskiler:'{{FEBKO}} links to this record; the account-symbol mask uses the G/L account here.',
        s4:'Managed with Bank Account Management.',
        alanlar:[
          { ad:'BANKN / IBAN', aciklama:'**Must match the file exactly** — a spacing/format difference causes an upload error' },
          { ad:'HKONT', aciklama:'G/L account — used by the account-symbol mask' },
        ] },

      { ad:'BKPF', baslik:'The FI documents EBS produces',
        tutar:'The header of the accounting documents statement processing produces.',
        olusturan:'{{FF_5}} or {{FEBAN}}',
        guncelleyen:'Statement processing',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BLART', aciklama:'Usually SB (bank posting) — defined in the posting rule' },
          { ad:'XBLNR', aciklama:'Reference — usually the statement number is entered here' },
        ] },

      { ad:'BSIS', baslik:'Clearing account open items',
        tutar:'Uncleared items in the {{banka-ara-hesabi}}. EBS aims to close these.',
        olusturan:'Payment/collection postings',
        guncelleyen:'EBS matching closes items',
        s4:'{{uyumluluk-view}} — produced from {{ACDOCA}}.' },
    ],

    er:{
      type:'er',
      baslik:'EBS table relationships',
      varliklar:[
        { ad:'T012K', rol:'Configuration', aciklama:'Bank account and G/L link',
          alanlar:[{ ad:'HBKID', tip:'pk' }, { ad:'HKTID', tip:'pk' }, { ad:'IBAN' }, { ad:'HKONT', tip:'fk' }] },
        { ad:'FEBKO', rol:'Statement', hub:true, aciklama:'Statement header',
          alanlar:[{ ad:'KUKEY', tip:'pk' }, { ad:'HBKID', tip:'fk' }, { ad:'AZNUM' }, { ad:'ASBTR' }] },
        { ad:'FEBEP', rol:'Statement', aciklama:'Statement lines',
          alanlar:[{ ad:'KUKEY', tip:'fk' }, { ad:'ESNUM', tip:'pk' }, { ad:'VGEXT' }, { ad:'KWBTR' }, { ad:'SGTXT' }] },
        { ad:'BKPF', rol:'Document', aciklama:'The FI document produced',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'XBLNR' }] },
        { ad:'BSEG', rol:'Line item', aciklama:'Document items',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'BSIS', rol:'Index', aciklama:'Clearing account open items',
          alanlar:[{ ad:'HKONT', tip:'fk' }, { ad:'BELNR', tip:'fk' }, { ad:'AUGBL' }] },
        { ad:'SKB1', rol:'Master data', aciklama:'Bank and clearing accounts',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }] },
      ],
      iliskiler:[
        { from:'T012K', to:'FEBKO', alanlar:'HBKID + HKTID', not:'whose account\'s statement' },
        { from:'FEBKO', to:'FEBEP', alanlar:'KUKEY', not:'statement → lines' },
        { from:'FEBEP', to:'BKPF', alanlar:'after processing', not:'line → FI document' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'header → line item' },
        { from:'BSEG', to:'BSIS', alanlar:'BELNR + BUZEI', not:'the clearing-account item gets closed' },
        { from:'T012K', to:'SKB1', alanlar:'HKONT → SAKNR', not:'this is where the account-symbol mask resolves to' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Daily work in EBS happens on two screens: **upload** ({{FF_5}}) and **correction** ({{FEBAN}}). ' +
      'On the configuration side there are {{OT83}}\'s four layers, and their order matters.',

    ekranlar:[
      { ad:'{{FF_5}} — upload screen',
        aciklama:'File selection and posting parameters.',
        alanlar:[
          { ad:'File format', zorunlu:true, aciklama:'MT940 / CAMT.053 / BAI2. Choosing the wrong format causes a parse error.' },
          { ad:'File path', zorunlu:true, aciklama:'A server directory (checked with {{AL11}}) or a local file.' },
          { ad:'Posting mode', zorunlu:true, aciklama:'**Direct posting** (fast) or a **batch input session** (run with {{SM35}}, errors reviewed one by one).' },
          { ad:'Test mode', zorunlu:false, aciklama:'Shows which line will match which rule, without posting. **Indispensable on the initial setup.**' },
          { ad:'Statement number', zorunlu:false, aciklama:'Usually read from the file; can also be entered by hand.' },
        ],
        ipucu:'The **"processed / not processed"** counts in the result list give the match rate. Note this ' +
              'rate down every day; a drop means something changed (the bank may have changed a code).' },

      { ad:'{{FEBAN}} — correction screen',
        aciklama:'The list of unprocessed lines and the matching panel.',
        alanlar:[
          { ad:'Line list', zorunlu:true, aciklama:'The status indicator is color-coded: green processed, yellow partial, red unprocessed.' },
          { ad:'Description text (`SGTXT`)', zorunlu:false, aciklama:'**The most important clue.** The customer name, invoice number, or reference is hidden here.' },
          { ad:'Target: business partner or G/L account', zorunlu:true, aciklama:'A customer for a collection, an expense account for a fee.' },
          { ad:'Posting rule', zorunlu:true, aciklama:'The system proposes one; if it\'s wrong, it\'s chosen by hand.' },
          { ad:'Open item selection', zorunlu:false, aciklama:'Once the business partner is selected, open items are listed; partial/residual clearing is also possible.' },
        ],
        ipucu:'Searching {{FBL5N}} by amount and date is the most practical way to find the customer behind a ' +
              'wire transfer with a blank description.' },

      { ad:'{{OT83}} — configuration screen (four layers)',
        aciklama:'All of EBS\'s logic is set up here. The order of the layers matters.',
        alanlar:[
          { ad:'1) Account symbols', zorunlu:true, aciklama:'Abstract roles: BANK, OUTGOING, INCOMING, CHARGES.' },
          { ad:'2) Symbol → account assignment', zorunlu:true, aciklama:'**A mask is used.** A mask like `+++++++++0` substitutes the house bank account\'s G/L number. A single definition works for every bank.' },
          { ad:'3) Posting rules', zorunlu:true, aciklama:'Which symbol is debited, which is credited, the document type, whether clearing happens.' },
          { ad:'4) External transaction-code assignment', zorunlu:true, aciklama:'The bank\'s code (051, 835) → the posting rule. **The interpretation algorithm is also chosen here.**' },
        ],
        ipucu:'The interpretation algorithm decides what to search for in the description text: a document ' +
              'number, reference, check number, or business partner. Choosing the right algorithm directly ' +
              'affects the match rate.' },
    ],

    zorunlu:['File format','File path','Account symbols','Symbol-account assignment','Posting rules','Transaction-code assignment'],
    opsiyonel:['Test mode','Batch input session','Interpretation algorithm','Difference account','Suspense account'],

    hatalar:[
      { mesaj:'House bank / account ID could not be determined', sebep:'The account number/IBAN in the file doesn\'t match the record in {{T012K}}.', cozum:'Make the account number in {{FI12}} **exactly identical** to the one in the file. Spacing, dashes, and format differences are the most common cause.' },
      { mesaj:'Posting rule not found for external transaction 051', sebep:'The transaction code isn\'t mapped in {{OT83}} layer 4.', cozum:'Assign the code to a posting rule. This is EBS\'s most common configuration gap.' },
      { mesaj:'Account symbol BANK has no account assignment', sebep:'{{OT83}} layer 2 is missing.', cozum:'Assign a G/L account or mask to the symbol.' },
      { mesaj:'Statement number 245 already exists', sebep:'A duplicate upload.', cozum:'Check with {{FEBA}}; review the file-archiving logic.' },
      { mesaj:'Error in file structure', sebep:'A format mismatch or character-encoding issue.', cozum:'View the file with {{AL11}}; check the format and the encoding (UTF-8/ANSI).' },
      { mesaj:'Difference too large for clearing (FEBAN)', sebep:'The collection amount doesn\'t match the open item.', cozum:'Use partial clearing or select multiple items.' },
      { mesaj:'Opening balance does not match previous closing balance', sebep:'A statement was skipped.', cozum:'Check with {{FEBA}} that the statement numbers are sequential; request the missing statement from the bank.' },
    ],

    ipuclari:[
      'On the initial setup, run **a few days in test mode for every bank** and collect the transaction ' +
      'codes that don\'t match. This list is {{OT83}} configuration\'s roadmap.',
      'Note the match rate daily. A sudden drop is a sign the bank has changed a transaction code.',
      'If you see a recurring pattern in {{FEBAN}}, **add a rule**. This is how EBS matures: a little less ' +
      'manual work every month.',
      'Regularly check with {{FEBA}} that statement numbers are sequential; a skipped number creates an ' +
      'unexplained reconciliation difference.',
      'For wire transfers with a blank description, search {{FBL5N}} by amount and date — the fastest way ' +
      'to find the customer.',
      'Remind customers to put the **invoice number** in the wire-transfer description. This one ' +
      'non-technical step increases the match rate the most.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'FEBKO', ne:'Statement header — balances and identity read from the file' },
      { tablo:'FEBEP', ne:'Statement lines; the status field is updated as they get processed' },
      { tablo:'BKPF', ne:'The FI documents produced (usually type SB)' },
      { tablo:'BSEG', ne:'Document items; `AUGBL` fills in if the clearing account is closed' },
      { tablo:'ACDOCA', ne:'Universal items' },
      { tablo:'BSIS', ne:'Closed clearing-account items drop out of here' },
      { tablo:'BSID', ne:'The open item closes if a customer collection matches' },
    ],

    commit:
      'EBS runs in **two stages**, and this split is critical:\n\n' +
      '**Stage 1 — data upload:** the file is read, {{FEBKO}}/{{FEBEP}} is written. Even if this stage ' +
      'succeeds, **no accounting posting may exist yet**.\n\n' +
      '**Stage 2 — posting:** posting rules are applied and FI documents are produced. In direct-posting ' +
      'mode every line is its own LUW; in batch-input-session mode, no document exists until the session is ' +
      'run with {{SM35}}.\n\n' +
      'That\'s why a "statement uploaded but no accounting posting" situation is normal, and {{FEBA}} (was ' +
      'it uploaded?) and {{FEBAN}} (was it processed?) are checked separately.',

    belgeNo:
      'The documents EBS produces take their number from the document type defined in the posting rule ' +
      '(usually **SB**). A single statement line sometimes produces **two documents**: one for the bank ' +
      'movement, one for the open-item clearing — depending on the posting rule\'s structure.',

    postingLogic:
      'A statement line\'s posting chain has **five steps**:\n\n' +
      '**1. The external transaction code is read** ({{FEBEP}} `VGEXT`) — the code sent by the bank.\n' +
      '**2. The posting rule is found** — the assignment in {{OT83}} layer 4.\n' +
      '**3. Account symbols are resolved** — symbol + mask → the actual G/L account. The mask substitutes ' +
      'the G/L number for that house bank account from {{T012K}}.\n' +
      '**4. The interpretation algorithm runs** — the description text ({{FEBEP}} `SGTXT`) is searched for ' +
      'a document number, reference, or check number.\n' +
      '**5. The posting is made** — if found, by closing the open item; if not, to the suspense account.',

    belgeTuru:
      'Defined in the posting rule; usually **SB** (bank posting) is used. Different types can be defined ' +
      'for different transaction types (a separate type for fees, say), but in practice one type is enough.',

    numberRange:
      'Comes from the number range of the document type used, in {{FBN1}}. In high-volume EBS setups, this ' +
      'range needs to be defined **wide** — hundreds of documents can be produced a day.',

    accountDetermination:
      'EBS\'s most distinctive feature is the **account-symbol** mechanism:\n\n' +
      'The posting rule doesn\'t contain a real account number; it uses **abstract symbols** like "BANK" ' +
      'and "OUTGOING". The symbol-to-account assignment supplies a **mask** (e.g. `+++++++++0`). The `+` ' +
      'characters in the mask are filled in from that house bank account\'s G/L account number in {{T012K}}.\n\n' +
      'Result: **a single posting rule works for 11 different bank accounts.** Without symbols, a separate ' +
      'rule would be needed for every account, and every rule would have to be duplicated whenever a new ' +
      'bank account was added.',

    tur:
      '**Configuration:** {{OT83}}\'s four layers (account symbols, symbol-account assignment, posting ' +
      'rules, transaction-code assignment), interpretation algorithms.\n\n' +
      '**Master data:** {{ev-bankasi}} accounts ({{T012K}}) — master data via BAM in S/4HANA.\n\n' +
      '**Transaction data:** statements ({{FEBKO}}/{{FEBEP}}) and the FI documents produced.',

    transport:
      '{{OT83}} configuration transports: account symbols, posting rules, transaction-code assignments.\n\n' +
      '**But the symbol-account assignment needs care:** masks reference G/L account numbers. If account ' +
      'numbers differ in the target system, the masks won\'t work. Also, since house bank accounts don\'t ' +
      'transport, they must be defined separately in the target system.',

    img:[
      { yol:'SPRO → Financial Accounting → Bank Accounting → Business Transactions → Payment Transactions → Electronic Bank Statement → Make Global Settings', not:'{{OT83}} — all four layers' },
      { yol:'… → Electronic Bank Statement → Global Settings → Create Account Symbols', not:'Layer 1' },
      { yol:'… → Electronic Bank Statement → Global Settings → Assign Accounts to Account Symbols', not:'Layer 2 — **the mask logic**' },
      { yol:'… → Electronic Bank Statement → Global Settings → Create Keys for Posting Rules', not:'Layer 3' },
      { yol:'… → Electronic Bank Statement → Global Settings → Assign External Transaction Types to Posting Rules', not:'Layer 4 — **the interpretation algorithm is here**' },
      { yol:'… → Electronic Bank Statement → Assign Bank Accounts to Transaction Types', not:'Which account uses which rule set' },
    ],

    ekstra:[
      { ic:'🔑', baslik:'The account symbol and mask — EBS\'s most elegant idea', metin:
        'The company has 11 bank accounts, and each uses a different G/L account: 102001, 102002, 102003…\n\n' +
        'If the posting rule contained the real account, **a separate rule would be needed for every ' +
        'account** — 11 accounts × 8 transaction types = 88 rules.\n\n' +
        'Instead, the rule uses the **"BANK"** symbol. The symbol-account assignment supplies a mask: ' +
        '`+++++++++0`. The system knows which house bank account the line being processed belongs to, and ' +
        'takes that account\'s G/L number from {{T012K}} and drops it into the mask.\n\n' +
        'Result: **8 rules, 11 accounts.** When a new bank account is added, not even one rule needs to change.\n\n' +
        'If you can answer "what is an account symbol?" with this, you\'ve genuinely set up EBS.' },

      { ic:'🔍', baslik:'The interpretation algorithm — the key to the match rate', metin:
        'The interpretation algorithm decides **what to search for** in the description text. Common choices:\n\n' +
        '• **001 — Standard:** searches for a document number.\n' +
        '• **011 — Invoice number:** matches on the reference field.\n' +
        '• **012 — Check number:** searches in {{PAYR}}.\n' +
        '• **021 — Reference document number:** matches on the `XBLNR` field.\n\n' +
        'Choosing the right algorithm directly affects the match rate. For outgoing payments, document ' +
        'number (001) works well because we\'re the ones who write that number into the payment file. For ' +
        'incoming collections it depends on what the customer writes — which is why the match rate there ' +
        'tends to be lower.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Uploaded ≠ posted', metin:
        'Statement upload and posting are **two separate stages**. The file may have uploaded successfully ' +
        'but the lines may still be waiting in {{FEBAN}}; in batch-input-session mode the session may not ' +
        'have been run yet via {{SM35}}.\n\n' +
        'That\'s why two checks are made before reconciliation: {{FEBA}} (was the statement uploaded?) and ' +
        '{{FEBAN}} (are there pending lines?).' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'EBS\'s **logic and tables haven\'t changed**. What changed: the Fiori-based correction interface, ' +
      'Bank Account Management integration, and machine-learning-assisted matching suggestions.',

    eccFarklari:[
      { konu:'Upload', ecc:'{{FF_5}}', s4:'**Same** + the Fiori "Import Bank Statements" app' },
      { konu:'Correction', ecc:'{{FEBAN}} — classic ALV', s4:'{{FEBAN}} still works + the Fiori "Reprocess Bank Statement Items" app (a visual worklist)' },
      { konu:'Configuration', ecc:'{{OT83}} four layers', s4:'**Same** — unchanged' },
      { konu:'Tables', ecc:'{{FEBKO}} / {{FEBEP}}', s4:'**Same** — remain physical tables' },
      { konu:'Bank account management', ecc:'{{FI12}} customizing', s4:'Bank Account Management — master data, approval workflow' },
      { konu:'Matching support', ecc:'The interpretation algorithm', s4:'+ **machine-learning**-based suggestions (Cash Application)' },
      { konu:'Cash visibility', ecc:'A separate Cash Management module', s4:'Integrated — the cash forecast updates instantly once the statement is uploaded' },
    ],

    universalJournal:
      'The documents EBS produces are also written to {{ACDOCA}}. The practical result: bank movements can ' +
      'be reported from a single table together with the profit-center and business-partner dimensions. ' +
      'Querying clearing-account items is also faster because {{ACDOCA}} is used instead of {{BSIS}}.',

    kalkanTcodes:[
      { eski:'FF.5', yeni:'{{FF_5}}', not:'Same function, current version' },
      { eski:'—', yeni:'—', not:'{{FEBAN}}, {{FEBA}}, {{OT83}} weren\'t removed; they work the same' },
    ],

    fiori:[
      { ad:'Reprocess Bank Statement Items', aciklama:'Replaces {{FEBAN}}; unmatched lines as a visual worklist, with suggestions.' },
      { ad:'Import Bank Statements', aciklama:'Replaces {{FF_5}}; drag-and-drop file upload.' },
      { ad:'Bank Statement Monitor', aciklama:'Which account\'s statement has loaded, which is missing — **the first check of reconciliation**.' },
      { ad:'Cash Application (ML)', aciklama:'Matches incoming collections to customers using machine learning; learns from past matches. Noticeably improves the match rate.' },
      { ad:'Cash Flow Analyzer', aciklama:'The cash forecast updates instantly once the statement is loaded.' },
    ],

    compatibilityViews:[
      '{{FEBKO}}, {{FEBEP}} — **remain physical tables**, unchanged.',
      '{{BSIS}} — clearing-account open items became a {{uyumluluk-view}}; EBS matching works through {{ACDOCA}}.',
      'EBS is one of the FI areas whose table structure changed the least in S/4HANA.',
    ],

    performans:
      'Because open-item search runs through {{ACDOCA}}, matching sped up on large clearing accounts. The ' +
      'real gain, though, is the machine-learning support that comes with **Cash Application**: by learning ' +
      'from past matches, it can suggest the right customer even for wire transfers with a weak description.',

    bestPractices:[
      'On new setups, request **CAMT.053** from the bank; the match rate is noticeably higher than MT940\'s.',
      'Evaluate the Cash Application (ML) feature — especially if incoming collection volume is high.',
      'Schedule statement upload as a **background job** daily; a manual upload can be forgotten.',
      'Track the match rate as a performance indicator and investigate drops.',
      'Document the {{OT83}} configuration — the four-layer structure is the topic that raises the most ' +
      'questions during handover.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'An EBS setup: from 0% to 88% match rate',
    hikaye:
      '**Marmara Textiles Inc.** is setting up EBS for its İş Bankası account. It has an average of 120 ' +
      'statement lines a day. This scenario shows how the match rate went from 0% on the first upload to ' +
      '88% in three weeks, and how {{OT83}}\'s four layers were set up.',
    veriler:[
      { k:'Company code', v:'1000 · House bank ISB · Account ID 0001' },
      { k:'Format', v:'MT940 (the bank doesn\'t provide CAMT.053)' },
      { k:'Accounts', v:'102001 actual · 102091 outgoing clearing · 102081 incoming clearing · 102099 suspense' },
      { k:'Daily volume', v:'~120 lines' },
      { k:'Target', v:'80%+ automatic match' },
    ],

    adimlar:[
      { baslik:'The first upload — in test mode', tcode:'FF_5',
        aciklama:'The file is uploaded in test mode before any configuration. The goal: to answer the ' +
                 'question **which transaction codes does the bank send?**',
        girdi:[
          { alan:'Format / File', deger:'MT940 · /usr/sap/interface/isb_20260901.txt' },
          { alan:'Mode', deger:'**Test ✓** — nothing will be posted' },
          { alan:'Result', deger:'118 lines read · **0 lines matched**' },
          { alan:'Error', deger:'"Posting rule not found" — for every line' },
          { alan:'**Critical output**', deger:'Transaction codes used: 051, 052, 202, 835, 840, 951' },
        ],
        not:'This list is {{OT83}} configuration\'s **roadmap**. What each code means is either asked of the ' +
             'bank or worked out from the statement descriptions.' },

      { baslik:'Layer 1 — account symbols are defined', tcode:'OT83',
        aciklama:'Abstract roles are defined. There\'s no real account yet.',
        girdi:[
          { alan:'BANK', deger:'The actual bank account' },
          { alan:'OUTGOING', deger:'Outgoing-payments clearing account' },
          { alan:'INCOMING', deger:'Incoming-collections clearing account' },
          { alan:'CHARGES', deger:'Bank fees' },
          { alan:'INTEREST', deger:'Interest income' },
          { alan:'TEMP', deger:'Suspense account (for unmatched items)' },
        ],
        not:'The symbols are **abstract**. "BANK" doesn\'t yet know which account it is — that gets resolved ' +
             'with a mask in the next layer.' },

      { baslik:'Layer 2 — accounts are assigned to symbols (with a mask)', tcode:'OT83',
        aciklama:'The most elegant part of EBS. Thanks to the mask, a single definition will work for every ' +
                 'bank account.',
        girdi:[
          { alan:'BANK', deger:'Mask **`+++++++++`** → replaced with the house bank account\'s G/L number' },
          { alan:'OUTGOING', deger:'Mask `+++++++91` → becomes **102091** for 102001' },
          { alan:'INCOMING', deger:'Mask `+++++++81` → becomes **102081** for 102001' },
          { alan:'CHARGES', deger:'Fixed account **770100**' },
          { alan:'INTEREST', deger:'Fixed account **642000**' },
          { alan:'TEMP', deger:'Mask `+++++++99` → **102099**' },
        ],
        not:'Mask logic: the `+` signs are filled in from the G/L account number in {{T012K}}. When the ' +
             'company adds a second bank account (102002), **not a single definition changes** — the mask ' +
             'automatically produces 102092, 102082, 102099.' },

      { baslik:'Layer 3 — posting rules are created', tcode:'OT83',
        aciklama:'Every rule is an accounting-posting template. Symbols are used, not real accounts.',
        girdi:[
          { alan:'**Z01** — Outgoing payment', deger:'OUTGOING debit / BANK credit · **clearing on** · document type SB' },
          { alan:'**Z02** — Incoming collection (matched)', deger:'BANK debit / customer credit · **clearing on** · SB' },
          { alan:'**Z03** — Bank fee', deger:'CHARGES debit / BANK credit · clearing **off** · SB' },
          { alan:'**Z04** — Interest income', deger:'BANK debit / INTEREST credit · clearing off · SB' },
          { alan:'**Z05** — Unmatched entry', deger:'BANK debit / TEMP credit · clearing off · SB' },
        ],
        not:'Z05 is critical: unmatched money is posted to the suspense account. This way **the bank ' +
             'balance stays correct**; only the counterparty is uncertain.' },

      { baslik:'Layer 4 — transaction codes are assigned to rules', tcode:'OT83',
        aciklama:'The bank\'s codes are mapped to rules. The interpretation algorithm is also chosen here.',
        girdi:[
          { alan:'051 (outgoing wire transfer)', deger:'→ rule **Z01** · interpretation algorithm **001** (document number)' },
          { alan:'052 (outgoing EFT)', deger:'→ rule **Z01** · algorithm 001' },
          { alan:'202 (incoming wire transfer)', deger:'→ rule **Z02** · algorithm **021** (reference document number)' },
          { alan:'835 (fee)', deger:'→ rule **Z03** · no algorithm' },
          { alan:'840 (BSMV / stamp duty)', deger:'→ rule **Z03** · no algorithm' },
          { alan:'951 (interest)', deger:'→ rule **Z04** · no algorithm' },
        ],
        not:'Algorithm 001 works well for outgoing payments because **we\'re** the ones who write the ' +
             'payment document number into the file. For incoming wire transfers it depends on what the ' +
             'customer writes.' },

      { baslik:'Second upload — the first real result', tcode:'FF_5',
        aciklama:'Configuration is complete; the file is uploaded again.',
        girdi:[
          { alan:'Result', deger:'118 lines · **74 matched (63%)** · 44 lines fell into {{FEBAN}}' },
          { alan:'Matched', deger:'All outgoing payments (051, 052) · all fee and interest lines' },
          { alan:'Unmatched', deger:'**44 incoming wire transfers** — no invoice number in the description' },
        ],
        fis:{ baslik:'Document 1000006001 — Outgoing payment match', belgeTuru:'SB', tarih:'01.09.2026',
          satirlar:[
            { hesap:'102091', ad:'Bank clearing account — outgoing', borc:140000, not:'The F110 item was **closed automatically**' },
            { hesap:'102001', ad:'Banks — ISB', alacak:140000 },
          ], not:'Algorithm 001 found the payment document number in the description text and closed the ' +
                 'clearing account item. No human intervention at all.' },
        tabloEtkisi:[
          { tablo:'FEBEP', ne:'74 lines "processed", 44 lines "unprocessed"' },
          { tablo:'BSIS', ne:'38 items in the clearing account were closed' },
        ] },

      { baslik:'The unmatched items are analyzed', tcode:'FEBAN',
        aciklama:'The description texts of the 44 incoming wire transfers are reviewed. Three patterns emerge.',
        girdi:[
          { alan:'**Pattern 1** — 19 lines', deger:'Description: "FT2026000341" → **there is an invoice number** but the algorithm can\'t find it' },
          { alan:'**Pattern 2** — 14 lines', deger:'Description: the customer\'s name is written, no number' },
          { alan:'**Pattern 3** — 11 lines', deger:'Description blank or "PAYMENT"' },
        ],
        not:'Pattern 1 is a **configuration problem** — fixable. Patterns 2 and 3 are **process problems** ' +
             '— they require talking to the customer.' },

      { baslik:'The interpretation algorithm is fixed', tcode:'OT83',
        aciklama:'For pattern 1, the algorithm is changed: instead of one that looks for a reference ' +
                 'document number, one that searches for an invoice number is chosen.',
        girdi:[
          { alan:'Before', deger:'202 → algorithm 021 (reference document number)' },
          { alan:'**New**', deger:'202 → algorithm **011** (invoice/reference number, free-text search)' },
          { alan:'Result', deger:'The 19-line pattern now **matches automatically**' },
        ],
        not:'The choice of interpretation algorithm directly affects the match rate. The first choice was ' +
             'wrong, and a single setting change gained 16%.' },

      { baslik:'A process improvement — informing customers', tcode:'FEBAN',
        aciklama:'There\'s no technical fix for patterns 2 and 3. The AR team notifies the 18 customers who ' +
                 'regularly send wire transfers to put the **invoice number** in the description field.',
        girdi:[
          { alan:'Action', deger:'An email to 18 customers + a note added to the invoice footer' },
          { alan:'Two weeks later', deger:'The pattern-2/3 line count dropped from 25 to **9**' },
        ],
        not:'**The biggest gain came from a process improvement, not a technical one.** This is the reality ' +
             'most often overlooked in EBS projects.' },

      { baslik:'Three weeks later — a stable state', tcode:'FF_5',
        aciklama:'After the configuration and process improvements, the daily routine has settled.',
        girdi:[
          { alan:'Daily lines', deger:'~120' },
          { alan:'**Auto-matched**', deger:'**106 lines (88%)**' },
          { alan:'Processed in {{FEBAN}}', deger:'14 lines · ~15 minutes' },
          { alan:'Suspense account (102099) balance', deger:'**Zero** at day\'s end ✓' },
          { alan:'Clearing account balance', deger:'Dropped from 1,200,000 TRY to **48,000 TRY**' },
        ] },
    ],

    sonuc:
      '**Result: 0% → 88% match rate, in three weeks.**\n\n' +
      'How the gain broke down: {{OT83}} base configuration **63%**, the interpretation-algorithm fix ' +
      '**16%**, customer notification **9%**.\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The account symbol + mask is EBS\'s most elegant idea.** 6 rules work for 11 bank accounts. ' +
      'Adding a new account changes not a single definition. EBS can\'t be set up without understanding ' +
      'this mechanism.\n\n' +
      '**2. The first upload is done in test mode, and its purpose is discovery, not posting:** which ' +
      'transaction codes does the bank send? That list is the configuration\'s roadmap.\n\n' +
      '**3. The choice of interpretation algorithm directly determines the match rate.** A single setting ' +
      'change gained 16%. The patterns in {{FEBAN}} tell you whether that setting is right.\n\n' +
      '**4. The biggest gain is sometimes not technical.** Telling customers "put the invoice number in the ' +
      'description" delivered an improvement no configuration could have. Maturing EBS means reading the ' +
      'patterns in {{FEBAN}} and intervening in the **right place**.',
  },

  },
});
