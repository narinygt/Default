/* ==========================================================================
   content/fi-en/bank-accounting.js — English body for "Bank Accounting"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'bank-accounting',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Bank Accounting (FI-BL) is the FI sub-component that manages the company\'s **bank accounts, cash ' +
      'movements, and payment instruments**. Its scope covers {{ev-bankasi}} setup, bank master data, the ' +
      '{{banka-ara-hesabi}} mechanism, check management, and bank statement processing.\n\n' +
      'FI-BL\'s distinguishing feature is that **it is a bridge**: AP records the payment, AR records the ' +
      'collection, but it is FI-BL that verifies whether the money **actually** moved at the bank. Without this ' +
      'verification, the bank balance in accounting and the figure the bank reports never agree.',

    neden:
      '**To manage the timing gap.** The moment you record a payment isn\'t the moment the money leaves the ' +
      'bank. {{banka-ara-hesabi}} carries this gap and makes reconciliation possible.\n\n' +
      '**For cash visibility.** The answer to "how much money do we have today, how much will go out tomorrow?" ' +
      'depends on bank accounts being tracked accurately.\n\n' +
      '**For control.** Every outflow from the company goes through a bank. Bank account changes, check number ' +
      'tracking, and statement reconciliation are the cornerstones of internal control.',

    sirketOnemi:
      'In a company that doesn\'t perform bank reconciliation, **no figure can be trusted**. If the bank ' +
      'balance in accounting shows 4.2 million TRY while the bank\'s actual balance is 3.8 million TRY, the ' +
      '400,000 TRY gap is either an unrecorded movement, an error — or possibly fraud.\n\n' +
      'From a consulting standpoint, FI-BL is **inseparably tied** to {{F110}}: {{FBZP}} bank determination ' +
      'rules decide which house bank the payment program will pay from, and those rules rest on {{ev-bankasi}} ' +
      'setup. F110 doesn\'t work unless FI-BL is set up correctly.\n\n' +
      'The distinguishing question is: **"Why is a bank clearing account used?"** The answer reveals whether ' +
      'the reconciliation logic has been understood.',

    gercekHayat:
      'A company has 11 accounts at 4 banks. At month-end, the treasury specialist has to answer one question ' +
      'for every account: **"Why do our records differ from the bank\'s statement?"**\n\n' +
      'Typical differences: (1) payments recorded on the 25th hit the bank on the 26th, (2) 3 wire transfers ' +
      'from customers haven\'t been entered into accounting yet, (3) the bank deducted a fee but no one ' +
      'recorded it, (4) a check that was written hasn\'t been presented for collection yet.\n\n' +
      '**All of these differences are normal.** What\'s abnormal is when a difference can\'t be explained, or ' +
      'when the clearing account keeps growing. FI-BL makes these differences structurally traceable.',

    muhasebeMantigi:
      'FI-BL\'s accounting logic rests on a single concept: **the two-stage posting**.\n\n' +
      '**Stage 1 — the transaction is recorded:** when a payment is made, the {{banka-ara-hesabi}} is ' +
      'credited. This means "we issued the payment instruction."\n\n' +
      '**Stage 2 — the statement arrives:** the clearing account is debited, and the **actual bank account** is ' +
      'credited. This means "the money actually went out."\n\n' +
      'The clearing account\'s balance = **money in transit**. In a healthy system this balance is small and ' +
      'closes within a few days. If it keeps growing, either the statement isn\'t being processed, or the ' +
      'payments being recorded aren\'t happening at the bank.\n\n' +
      'That\'s why {{acik-kalem-yonetimi}} is **mandatory** on clearing accounts — so {{kapatma}} can happen.',

    kavramlar: ['ev-bankasi', 'banka-ara-hesabi', 'ekstre-eslestirme', 'valor-tarihi',
                'acik-kalem-yonetimi', 'kapatma', 'odeme-yontemi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The bank process runs **in two directions**: money going out (payments) and money coming in ' +
      '(collections). Both follow the same pattern: **the transaction is recorded → the clearing account is ' +
      'engaged → the statement arrives → the clearing account closes**. Grasping this pattern is grasping the ' +
      'whole of FI-BL.',

    roller:[
      { rol:'Treasury / Finance', gorev:'Manages banking relationships, requests {{ev-bankasi}} setups, performs cash planning.' },
      { rol:'AP accounting', gorev:'Records payments ({{F110}}, {{F-53}}) — the clearing account is credited.' },
      { rol:'AR accounting', gorev:'Records collections ({{F-28}}) — the clearing account is debited.' },
      { rol:'Bank accountant', gorev:'Processes the statement ({{FF67}} or {{FEBAN}}), closes the clearing accounts, investigates differences.' },
      { rol:'Accounting manager', gorev:'Approves the month-end bank reconciliation; follows up on unexplained differences.' },
      { rol:'FI consultant', gorev:'Sets up the {{ev-bankasi}} structure, clearing account design, {{FBZP}} bank determination, and check number ranges.' },
      { rol:'Internal audit', gorev:'Audits bank account changes and the check register.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'The bank process — from payment to reconciliation',
      adimlar:[
        { ic:'🏦', rol:'FI consultant', baslik:'The bank structure is built',
          aciklama:'Bank master data ({{FI01}} → {{BNKA}}), {{ev-bankasi}} and account IDs ' +
                   '({{FI12}} → {{T012}}/{{T012K}}), G/L accounts and clearing accounts.',
          cikti:'A bank structure ready for use', ok:'a payment can be made' },
        { ic:'💸', rol:'AP accounting', baslik:'The payment is recorded',
          aciklama:'{{F110}} or {{F-53}}: the vendor is debited, the **{{banka-ara-hesabi}}** is credited. ' +
                   'The actual bank account **doesn\'t move yet**.',
          cikti:'Payment document + clearing account item', ok:'the file goes to the bank' },
        { ic:'📤', rol:'Treasury', baslik:'The payment medium is generated and sent',
          aciklama:'A bank file via {{FBPM}}; if checks are used, check numbers are assigned ({{PAYR}}).',
          cikti:'Bank file / checks', ok:'the bank processes it' },
        { ic:'📥', rol:'Bank', baslik:'The bank statement arrives',
          aciklama:'Electronic (an MT940/CAMT file via {{FF_5}}) or manual (entered by hand via {{FF67}}).',
          cikti:'{{FEBKO}} / {{FEBEP}} records', ok:'it gets processed' },
        { ic:'🔗', rol:'Bank accountant', baslik:'Statement lines are matched',
          aciklama:'Automatic matches are posted; unmatched ones are linked by hand in {{FEBAN}}. ' +
                   'The {{banka-ara-hesabi}} is cleared, the **actual bank account moves**.',
          cikti:'Cleared clearing-account items', ok:'at month-end' },
        { ic:'⚖️', rol:'Accounting manager', baslik:'Bank reconciliation is performed',
          aciklama:'The bank balance in accounting is compared against the statement\'s closing balance. ' +
                   'The difference = items waiting in the clearing account (money in transit).',
          cikti:'Reconciliation report', ok:'if the difference can\'t be explained' },
        { ic:'🔍', rol:'Bank accountant', baslik:'Difference analysis',
          aciklama:'The clearing account\'s open items are reviewed with {{FBL3N}}: why haven\'t the old items closed?',
          cikti:'An explained difference' },
      ],
    },

    adimlar:[
      { rol:'FI consultant', eylem:'Opens the bank master data', sistem:'{{FI01}} → {{BNKA}}' },
      { rol:'FI consultant', eylem:'Defines the house bank and account ID', sistem:'{{FI12}} → {{T012}}, {{T012K}}' },
      { rol:'AP accounting', eylem:'Records the payment', sistem:'{{F110}}, {{F-53}} → clearing account credited' },
      { rol:'AR accounting', eylem:'Records the collection', sistem:'{{F-28}} → clearing account debited' },
      { rol:'Treasury', eylem:'Prints checks / generates the file', sistem:'{{FBPM}}, {{FCH5}} → {{PAYR}}' },
      { rol:'Bank accountant', eylem:'Uploads or enters the statement', sistem:'{{FF_5}} or {{FF67}}' },
      { rol:'Bank accountant', eylem:'Fixes the unmatched items', sistem:'{{FEBAN}}' },
      { rol:'Accounting manager', eylem:'Checks the reconciliation', sistem:'{{FBL3N}}, {{FS10N}}' },
    ],

    veriAkisi:{
      nereden:'AP and AR payment/collection postings; the statement file coming from the bank (MT940, ' +
              'CAMT.053); {{FBZP}} bank determination rules; business-partner bank data from {{BP}}.',
      nereye:'Into {{banka-ara-hesabi}} items → into the actual bank account once the statement is matched; ' +
             'into cash flow forecasting and the balance sheet.',
      tetikleyen:'A payment or collection posting; a daily/weekly bank statement.',
      sonraki:'Month-end bank reconciliation, cash reporting, audit.',
    },

    notlar:[
      { tip:'tip', baslik:'How many clearing accounts are needed?', metin:
        'A common design: **two clearing accounts per bank account** — one for outgoing payments, one for ' +
        'incoming collections. Some setups split further by payment method (a wire-transfer clearing account, ' +
        'a check clearing account).\n\n' +
        'The finer the split, the easier reconciliation gets — but the chart of accounts grows. A practical ' +
        'balance: **bank account × direction** (outgoing/incoming). For 11 bank accounts, that\'s 22 clearing ' +
        'accounts + 11 actual accounts = 33 accounts.' },
      { tip:'warn', baslik:'What happens without a clearing account?', metin:
        'If a payment is posted directly to the actual bank account, once the statement arrives the same ' +
        'movement risks being recorded a **second time**, or the statement line matches nothing at all. In ' +
        'either case, reconciliation becomes impossible.\n\n' +
        'Small companies often dismiss the clearing account as "unnecessary complexity"; once volume grows, ' +
        'going back to set it up means untangling months of accumulated movements.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'FI-BL\'s accounting logic is **the two-stage posting**. Below are examples of an outgoing payment ' +
      'first, then an incoming collection, then a check and a bank fee. The same pattern repeats in every one.',

    etkilenenHesaplar:[
      { hesap:'102 Banks — actual account', tur:'Balance sheet — Asset', neden:'Only moves **once the statement is processed**. Its balance must match the figure the bank reports.' },
      { hesap:'102.9x Bank clearing account (outgoing)', tur:'Balance sheet — Clearing', neden:'Credited when a payment is recorded, debited and closed once the statement arrives. Its balance = **outgoing money in transit**.' },
      { hesap:'102.8x Bank clearing account (incoming)', tur:'Balance sheet — Clearing', neden:'Debited when a collection is recorded, credited and closed once the statement arrives.' },
      { hesap:'770 / 653 Bank charges', tur:'Income statement', neden:'Wire-transfer fees, account maintenance fees. Usually posted automatically while the statement is processed.' },
      { hesap:'642 Interest income / 780 Interest expense', tur:'Income statement', neden:'Deposit interest and loan interest — comes from the statement.' },
      { hesap:'103 Checks and payment orders issued', tur:'Balance sheet — Liability', neden:'Checks that have been written but not yet collected. Frequently used in the Turkish setup.' },
    ],

    fisler:[
      { baslik:'Stage 1 — the payment is recorded ({{F110}})',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-4001', borc:140000, not:'Open item closed' },
          { hesap:'102.91', ad:'Bank clearing account — outgoing ISB', alacak:140000, not:'**Not the actual account**' },
        ],
        not:'The payment instruction was issued, but the money hasn\'t left the bank yet. This item sits ' +
             '**open** in the clearing account (thanks to {{acik-kalem-yonetimi}}).' },

      { baslik:'Stage 2 — the statement arrives, the clearing account closes ({{FEBAN}})',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102.91', ad:'Bank clearing account — outgoing ISB', borc:140000, not:'**Closed** — item matched' },
          { hesap:'102.01', ad:'Banks — ISB actual account', alacak:140000, not:'The money actually left' },
        ],
        not:'The cash outflow is confirmed **only here**. Account 102.01\'s balance now matches the figure the ' +
             'bank reports. The clearing account is zeroed out.' },

      { baslik:'An incoming collection — same pattern, opposite direction',
        belgeTuru:'DZ', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102.81', ad:'Bank clearing account — incoming ISB', borc:120000, not:'Collection recorded' },
          { hesap:'120', ad:'Trade receivables — C-5001', alacak:120000, not:'Open item closed' },
        ],
        not:'When the statement arrives, the second posting is made: **102.81 credit / 102.01 debit**. Same ' +
             'pattern as the outgoing payment, just reversed.' },

      { baslik:'A bank fee — automatic, from the statement',
        belgeTuru:'SB', tarih:'26.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense — bank fee', borc:450 },
          { hesap:'102.01', ad:'Banks — ISB', alacak:450 },
        ],
        not:'Bank fees arrive as a separate line on the statement and are posted **directly to the actual ' +
             'account** — no clearing account is used. That\'s because this movement has no prior counterpart ' +
             'already recorded in accounting; it\'s learned about for the first time from the statement. ' +
             '{{OT83}} posting rules automate this.' },

      { baslik:'A check is written ({{FCH5}}) — the Turkish setup',
        belgeTuru:'KZ', tarih:'25.09.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables — V-6001', borc:85000 },
          { hesap:'103', ad:'Checks and payment orders issued', alacak:85000, not:'Check written, not yet collected' },
        ],
        not:'A check **behaves like a clearing account**: account 103 is credited when it\'s written, and ' +
             'debited (with the bank credited) once it\'s presented for collection. The gap between the two ' +
             'can run for months, depending on the check\'s due date. The {{PAYR}} table tracks every check\'s status.' },

      { baslik:'The check is collected — from the statement',
        belgeTuru:'SB', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'103', ad:'Checks and payment orders issued', borc:85000, not:'Check collected' },
          { hesap:'102.01', ad:'Banks — ISB', alacak:85000 },
        ],
        not:'Account 103\'s balance = **checks not yet collected**. This is the most common explainable ' +
             'difference in bank reconciliation.' },
    ],

    tHesaplar:[
      { hesap:'Banks — actual account', kod:'102.01',
        borc:[{ ad:'Collections (from the statement)', tutar:120000 }],
        alacak:[{ ad:'Payments (from the statement)', tutar:140000 }, { ad:'Bank fee', tutar:450 }],
        not:'Its balance should match the bank\'s figure' },
      { hesap:'Bank clearing account — outgoing', kod:'102.91',
        borc:[{ ad:'Statement match', tutar:140000 }],
        alacak:[{ ad:'F110 payment', tutar:140000 }],
        not:'Balance = outgoing money in transit' },
      { hesap:'Bank clearing account — incoming', kod:'102.81',
        borc:[{ ad:'Collection posting', tutar:120000 }],
        alacak:[{ ad:'Statement match', tutar:120000 }],
        not:'Balance = incoming money in transit' },
      { hesap:'Checks issued', kod:'103',
        borc:[{ ad:'Checks collected', tutar:85000 }],
        alacak:[{ ad:'Checks written', tutar:85000 }],
        not:'Balance = checks not yet collected' },
    ],

    notlar:[
      { tip:'warn', baslik:'What does the clearing account\'s balance mean?', metin:
        'The clearing account\'s balance is **money in transit**, and under normal conditions it consists of ' +
        'just a few days\' movement.\n\n' +
        'If the balance keeps growing, there are three possibilities: **(1)** the statement isn\'t being ' +
        'processed, **(2)** the statement is being processed but matching can\'t be established (there are ' +
        'lines waiting in {{FEBAN}}), **(3)** the payments being recorded aren\'t happening at the bank (the ' +
        'file may not have been sent).\n\n' +
        'This balance should be monitored monthly; its growth is the first sign of a silent reconciliation breakdown.' },
      { tip:'tip', baslik:'Why doesn\'t a bank fee use a clearing account?', metin:
        'A clearing account waits for a movement **already recorded in accounting** to happen at the bank. ' +
        'You learn about a bank fee for the first time from the statement — it has no expected counterpart.\n\n' +
        'That\'s why it\'s posted directly to the actual bank account and an expense account. The same logic ' +
        'applies to interest, stamp duty, and unexpected wire transfers.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'FI-BL varies along three axes: **the type of bank data**, **the statement processing method**, and ' +
      '**the payment instrument**.',

    liste:[
      { ad:'Bank Master Data — BNKA',
        aciklama:'The list of **every bank in the world**: country + bank key, name, SWIFT, address. Both the ' +
                 'company\'s own banks and customer/vendor banks live here.',
        neZaman:'Before a business partner\'s bank information can be entered, that bank must already be defined in {{BNKA}}.',
        ornek:'TR + 0064 → İş Bankası. The bank-key format varies by country.',
        tcodes:['FI01','FI02','FI03'] },

      { ad:'House Bank — T012',
        aciklama:'The bank **the company itself** works with. Each house bank has one or more **account IDs**, ' +
                 'and each ID is linked to a G/L account.',
        neZaman:'Mandatory when {{F110}} or statement processing will be used.',
        ornek:'House bank **ISB** → account ID **0001** (TRY) and **0002** (EUR). Each uses its own G/L ' +
              'account and its own clearing account.',
        tcodes:['FI12','FBZP'] },

      { ad:'Manual Bank Statement — FF67',
        aciklama:'Statement lines are entered **by hand**. Posting rules still apply, but the data is manual.',
        neZaman:'At small banks that don\'t provide an electronic statement, on foreign accounts, or before ' +
                'the switch to electronic statements.',
        ornek:'A treasury specialist enters 40 lines from a paper statement into {{FF67}}.',
        tcodes:['FF67'] },

      { ad:'Electronic Bank Statement — FF_5',
        aciklama:'The file coming from the bank (MT940, CAMT.053) is uploaded to the system and posting ' +
                 'rules apply automatically. See the {{konu:ebs}} topic for detail.',
        neZaman:'The **standard choice** when volume is high. Both faster and less error-prone than manual entry.',
        ornek:'A daily 300-line statement file uploads in 2 minutes and 85% matches automatically.',
        tcodes:['FF_5','FEBAN','OT83'] },

      { ad:'Bank Transfer',
        aciklama:'The most common {{odeme-yontemi}}. A bank file is generated and sent electronically.',
        neZaman:'For standard domestic and foreign payments.',
        ornek:'Defined as a payment method in {{FBZP}}; {{FBPM}} generates the file.',
        tcodes:['F110','FBPM'] },

      { ad:'Check',
        aciklama:'A physical payment instrument. A check number is assigned from a number range and every ' +
                 'check\'s status is tracked in the {{PAYR}} table: printed, sent, collected, voided.',
        neZaman:'In countries where checks are common, and for deferred payments. Post-dated checks are ' +
                'common in Turkey and are tracked in a separate account (103).',
        ornek:'Linked to a payment with {{FCH5}}, listed with {{FCHN}}, voided with {{FCH8}}/{{FCH9}}.',
        tcodes:['FCH5','FCHN','FCHI','FCH8','FCH9','FCHR'] },

      { ad:'Cash Journal',
        aciklama:'Tracks small cash movements (advances, small purchases) in a separate journal. Works with a ' +
                 'cash account, not a bank account.',
        neZaman:'When the company has a physical cash register. Increasingly rare in corporate companies.',
        ornek:'Cash journal transactions produce an FI document but are entered from a separate interface.' },
    ],

    karsilastirmaBasliklar:['Bank Master Data (BNKA)', 'House Bank (T012)'],
    karsilastirma:[
      ['What it holds', '**Every bank** in the world', 'Only the banks the company **itself** works with'],
      ['Whose bank', 'Customer, vendor, and the company\'s', 'Only the company\'s'],
      ['Key', 'Country + bank key', 'Company code + house bank ID'],
      ['G/L account link', 'None', '**Yes** — an account ID is linked to a G/L account'],
      ['Used by {{F110}}?', 'For the business partner\'s IBAN', '**To decide which account the payment goes out from**'],
      ['Transaction code', '{{FI01}} / {{FI02}} / {{FI03}}', '{{FI12}}'],
      ['Table', '{{BNKA}}', '{{T012}} / {{T012K}}'],
      ['S/4HANA', 'Unchanged', 'Managed with Bank Account Management (BAM)'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FI12', ad:'House bank and account ID definition',
        amac:'Defines the banks the company works with and its accounts at each bank; links each account to a G/L account.',
        neZaman:'When a new bank account is opened; when setting up {{F110}} or statement processing.',
        adimlar:[
          { baslik:'Enter the company code' },
          { baslik:'Create the house bank: ID + bank country + bank key',
            aciklama:'The bank key must be defined in {{BNKA}}; if not, open it first with {{FI01}}.' },
          { baslik:'Add the account ID',
            aciklama:'If there\'s more than one account at the same bank, each gets its own ID: the TRY ' +
                     'account is 0001, the EUR account is 0002.' },
          { baslik:'Link the **G/L account** to each account ID',
            aciklama:'This decides which accounting account the movements in that account get posted to.' },
          { baslik:'Enter the IBAN and account number',
            aciklama:'This information is used in the payment file.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Company code 1000' },
          { ekran:'House bank', islem:'ID ISB · Country TR · Bank key 0064' },
          { ekran:'Account ID', islem:'0001 · IBAN TR12 0006 4000 … · G/L account 102001' },
          { ekran:'Second account', islem:'0002 · EUR account · G/L account 102002' },
        ],
        alanlar:{
          zorunlu:['Company code','House bank ID','Bank country','Bank key','Account ID','G/L account'],
          opsiyonel:['IBAN','Account number','Currency','Control key'] },
        hatalar:[
          { mesaj:'Bank key ... does not exist for country TR', sebep:'The bank isn\'t defined in {{BNKA}}.', cozum:'Create the bank master data first with {{FI01}}.' },
          { mesaj:'G/L account ... is not defined in company code', sebep:'The account to be linked hasn\'t been opened.', cozum:'Open the account with {{FS00}}; {{acik-kalem-yonetimi}} is usually **off** for bank accounts and **on** for clearing accounts.' },
        ],
        ipucu:'Plan **three G/L accounts** for every house bank account: the actual bank account, the ' +
              'outgoing clearing account, the incoming clearing account. {{acik-kalem-yonetimi}} must be on ' +
              'for clearing accounts — otherwise {{kapatma}} can\'t happen and reconciliation becomes impossible.',
        ilgili:['FI01','FBZP','FCHI','T012K'] },

      { kod:'FF67', ad:'Manual bank statement entry',
        amac:'Enters statement lines by hand and posts them according to the defined posting rules.',
        neZaman:'On accounts that don\'t receive an electronic statement; at foreign banks.',
        adimlar:[
          { baslik:'Enter the house bank, account ID, and statement number',
            aciklama:'The statement number must be sequential; a skipped number creates a reconciliation gap.' },
          { baslik:'Enter the opening and closing balances',
            aciklama:'The system expects the sum of the entered lines to equal the difference between these ' +
                     'two balances. It warns if it doesn\'t — a strong control.' },
          { baslik:'Enter the lines: transaction code, amount, value date, reference',
            aciklama:'The transaction code (the bank transaction code) decides the posting rule and target account.' },
          { baslik:'Save and run the batch input session',
            aciklama:'{{FF67}} usually produces a batch input session, run with {{SM35}}.' },
        ],
        alanlar:{
          zorunlu:['House bank','Account ID','Statement number','Statement date','Opening/closing balance','Line amounts'],
          opsiyonel:['{{valor-tarihi}}','Reference','Note-to-payee text'] },
        hatalar:[
          { mesaj:'Closing balance does not match line items', sebep:'The sum of the entered lines doesn\'t equal the opening-closing difference.', cozum:'Check the lines; an item is missing or entered twice. This check is deliberate and shouldn\'t be skipped.' },
          { mesaj:'Posting rule ... not defined for transaction type', sebep:'No posting rule is defined for the transaction code in {{OT83}}.', cozum:'Define the posting rule, or link the line by hand in {{FEBAN}}.' },
        ],
        ipucu:'Take the opening-closing balance check seriously. This single check catches nearly all ' +
              'statement-entry errors.',
        ilgili:['FF_5','FEBAN','OT83','FEBA'] },

      { kod:'FCHI', ad:'Check number range definition',
        amac:'Defines check number ranges per house bank and account ID.',
        neZaman:'When a checkbook is received; before paying with a check.',
        adimlar:[
          { baslik:'Enter the company code, house bank, and account ID' },
          { baslik:'Enter the check number range: lower bound — upper bound',
            aciklama:'Must match the physical checkbook\'s numbers **exactly**.' },
          { baslik:'Enter the range ID and description' },
        ],
        hatalar:[
          { mesaj:'Check number ... is already used', sebep:'A range overlap or the number has already been used.', cozum:'List the existing checks with {{FCHN}}; define a new range.' },
        ],
        ipucu:'The check range **must match the physical checkbook**. Otherwise the check number in the ' +
              'system and the paper check in hand differ, and reconciliation becomes impossible.',
        ilgili:['FCH5','FCHN','FCHR','FBZP'] },

      { kod:'FCHN', ad:'Checkbook / check list',
        amac:'Lists checks by number, payee, amount, and status.',
        neZaman:'For check reconciliation; to answer "has this check been collected?"; during an audit.',
        adimlar:[
          { baslik:'Enter the company code, house bank, and account ID' },
          { baslik:'Apply the status filter',
            aciklama:'Printed / sent / **collected** / voided. Uncollected checks explain the difference in bank reconciliation.' },
          { baslik:'Double-click a line → drill into the payment document and check detail' },
        ],
        ipucu:'The **list of uncollected checks** is the most useful report in month-end bank reconciliation. ' +
              'Account 103\'s balance should equal this list\'s total.',
        ilgili:['FCH5','FCHR','FCHI','PAYR'] },

      { kod:'FCH5', ad:'Create check / assign to payment',
        amac:'Links a manually written check to a payment document.',
        neZaman:'When a check is written by hand outside {{F110}}; when {{F-58}} isn\'t used.',
        adimlar:[
          { baslik:'Enter the payment document number' },
          { baslik:'Enter the house bank, account ID, and check number' },
          { baslik:'Check the payee information and save',
            aciklama:'The record is written to the {{PAYR}} table and appears in the checkbook.' },
        ],
        hatalar:[
          { mesaj:'Payment document ... already has a check assigned', sebep:'A check is already linked to this payment.', cozum:'Check with {{FCHN}}; if it\'s wrong, void the check with {{FCH9}}.' },
        ],
        ilgili:['FCHN','FCH8','FCH9','F-58'] },

      { kod:'FCH8', ad:'Check cancellation (with payment)',
        amac:'Voids the check **and** reverses the linked payment document; open items are reopened.',
        neZaman:'When a check was written incorrectly and the payment needs to be canceled too.',
        adimlar:[
          { baslik:'Enter the house bank, account ID, and check number' },
          { baslik:'Choose the cancellation reason',
            aciklama:'Torn, lost, wrong amount, wrong payee…' },
          { baslik:'Confirm',
            aciklama:'The payment document is reversed; the vendor\'s open item is **reopened** and becomes ' +
                     'payable again in the next run.' },
        ],
        ipucu:'**The difference between {{FCH8}} and {{FCH9}} is critical:** FCH8 voids both the check and ' +
              'the payment; FCH9 voids **only the check** and the payment document stands. Use FCH9 when the ' +
              'check was printed wrong but the payment itself is correct — a new check is then linked afterward.',
        ilgili:['FCH9','FCHN','FBRA','FB08'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'FI-BL\'s tables fall into three groups: **bank definitions** ({{BNKA}}, {{T012}}, {{T012K}}), ' +
      '**statement data** ({{FEBKO}}, {{FEBEP}}), and the **checkbook** ({{PAYR}}). Accounting postings go ' +
      'into the standard FI tables ({{BKPF}}/{{BSEG}}).',

    liste:[
      { ad:'BNKA', baslik:'Bank master data',
        tutar:'Bank name, SWIFT code, address by country + bank key. **Every bank in the world.**',
        olusturan:'{{FI01}}; also via bulk loads of national bank lists',
        guncelleyen:'{{FI01}}, {{FI02}}',
        anahtar:'BANKS + BANKL',
        iliskiler:'{{T012}} (house bank) and business-partner bank data (LFBK/KNBK) point here.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'BANKS', aciklama:'Bank country' },
          { ad:'BANKL', aciklama:'Bank key — format varies by country' },
          { ad:'BANKA', aciklama:'Bank name' },
          { ad:'SWIFT', aciklama:'SWIFT/BIC code — mandatory for international payments' },
        ] },

      { ad:'T012', baslik:'House bank definition',
        tutar:'The banks the company code works with: house bank ID, bank country and key.',
        olusturan:'{{FI12}}',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID',
        iliskiler:'Links to {{BNKA}}; account IDs via {{T012K}}.',
        s4:'Managed with Bank Account Management (BAM) in S/4HANA; the table is retained.',
        alanlar:[
          { ad:'HBKID', aciklama:'House bank ID (e.g. ISB)' },
          { ad:'BANKS / BANKL', aciklama:'Reference to {{BNKA}}' },
        ] },

      { ad:'T012K', baslik:'House bank account IDs',
        tutar:'Every house bank account\'s IBAN, account number, and **corresponding G/L account**.',
        olusturan:'{{FI12}}',
        guncelleyen:'{{FI12}}',
        anahtar:'BUKRS + HBKID + HKTID',
        iliskiler:'{{REGUH}} points here via `HBKID`/`HKTID`; {{FBZP}} bank determination looks here.',
        s4:'Managed with BAM.',
        alanlar:[
          { ad:'HKTID', aciklama:'Account ID (e.g. 0001)' },
          { ad:'HKONT', aciklama:'**G/L account** — the accounting counterpart of movements on this account' },
          { ad:'BANKN / IBAN', aciklama:'Account number and IBAN' },
        ] },

      { ad:'PAYR', baslik:'Check register',
        tutar:'Every check\'s number, payee, amount, linked payment document, and **status**.',
        olusturan:'Payment medium generation ({{F110}} check method) or {{FCH5}}',
        guncelleyen:'{{FCH5}}, {{FCHR}}, {{FCH8}}, {{FCH9}}',
        anahtar:'ZBUKR + HBKID + HKTID + CHECT',
        iliskiler:'Links to the payment document (`VBLNR`) and {{T012K}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'CHECT', aciklama:'Check number' },
          { ad:'VBLNR', aciklama:'Linked payment document' },
          { ad:'ZALDT', aciklama:'Check date' },
          { ad:'BANCD', aciklama:'**Collection date** — if filled, the check has been collected at the bank' },
          { ad:'VOIDR', aciklama:'Void reason — if filled, the check has been voided' },
        ] },

      { ad:'FEBKO', baslik:'Bank statement header',
        tutar:'Each statement\'s header data: house bank, account, statement number, date, opening/closing balance.',
        olusturan:'{{FF_5}} (electronic) or {{FF67}} (manual)',
        guncelleyen:'Statement upload transactions',
        anahtar:'KUKEY',
        iliskiler:'To its lines via {{FEBEP}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'AZDAT', aciklama:'Statement date' },
          { ad:'ASBTR / AEBTR', aciklama:'Opening and closing balance' },
          { ad:'ANZDS', aciklama:'Number of lines' },
        ] },

      { ad:'FEBEP', baslik:'Bank statement items',
        tutar:'The statement\'s lines: bank transaction code, amount, {{valor-tarihi}}, description text, and **posting status**.',
        olusturan:'{{FF_5}} / {{FF67}}',
        guncelleyen:'Status is updated when matched via {{FEBAN}}',
        anahtar:'KUKEY + ESNUM',
        iliskiler:'A child of {{FEBKO}}; links to the FI document it matches.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'VGINT / VGEXT', aciklama:'Internal and external bank transaction code — decides the posting rule' },
          { ad:'KWBTR', aciklama:'Line amount' },
          { ad:'VALUT', aciklama:'{{valor-tarihi}}' },
          { ad:'SGTXT / Note to payee', aciklama:'Description text — the main input for automatic matching' },
          { ad:'EPVOZ / Status', aciklama:'The line\'s processing status — this is where pending lines in {{FEBAN}} are found' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Bank accounting table relationships',
      varliklar:[
        { ad:'BNKA', rol:'Master data', aciklama:'Every bank',
          alanlar:[{ ad:'BANKS', tip:'pk' }, { ad:'BANKL', tip:'pk' }, { ad:'BANKA' }, { ad:'SWIFT' }] },
        { ad:'T012', rol:'Configuration', aciklama:'House bank',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'HBKID', tip:'pk' }, { ad:'BANKL', tip:'fk' }] },
        { ad:'T012K', rol:'Configuration', hub:true, aciklama:'Account IDs',
          alanlar:[{ ad:'HBKID', tip:'fk' }, { ad:'HKTID', tip:'pk' }, { ad:'HKONT', tip:'fk' }, { ad:'IBAN' }] },
        { ad:'SKB1', rol:'Master data', aciklama:'Bank G/L account',
          alanlar:[{ ad:'SAKNR', tip:'pk' }, { ad:'XOPVW' }] },
        { ad:'REGUH', rol:'Payment', aciklama:'Payment header',
          alanlar:[{ ad:'VBLNR', tip:'pk' }, { ad:'HBKID', tip:'fk' }, { ad:'HKTID', tip:'fk' }] },
        { ad:'PAYR', rol:'Check', aciklama:'Check register',
          alanlar:[{ ad:'CHECT', tip:'pk' }, { ad:'VBLNR', tip:'fk' }, { ad:'BANCD' }] },
        { ad:'FEBKO', rol:'Statement', aciklama:'Statement header',
          alanlar:[{ ad:'KUKEY', tip:'pk' }, { ad:'HBKID', tip:'fk' }, { ad:'AZDAT' }] },
        { ad:'FEBEP', rol:'Statement', aciklama:'Statement items',
          alanlar:[{ ad:'KUKEY', tip:'fk' }, { ad:'ESNUM', tip:'pk' }, { ad:'VGINT' }, { ad:'KWBTR' }] },
      ],
      iliskiler:[
        { from:'BNKA', to:'T012', alanlar:'BANKS + BANKL', not:'a house bank is linked to a bank' },
        { from:'T012', to:'T012K', alanlar:'BUKRS + HBKID', not:'many accounts at one bank' },
        { from:'T012K', to:'SKB1', alanlar:'HKONT → SAKNR', not:'account ID → G/L account' },
        { from:'T012K', to:'REGUH', alanlar:'HBKID + HKTID', not:'which account the payment left from' },
        { from:'REGUH', to:'PAYR', alanlar:'VBLNR', not:'the check linked to the payment' },
        { from:'T012K', to:'FEBKO', alanlar:'HBKID + HKTID', not:'the account\'s statement' },
        { from:'FEBKO', to:'FEBEP', alanlar:'KUKEY', not:'statement → lines' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Daily work in FI-BL happens on two screens: **statement processing** ({{FF67}} or {{FEBAN}}) and ' +
      '**reconciliation checking** ({{FBL3N}}). On the configuration side, {{FI12}} is central.',

    ekranlar:[
      { ad:'{{FI12}} — House bank definition',
        aciklama:'A three-tier screen: house bank → account ID → G/L account link.',
        alanlar:[
          { ad:'House bank ID (`HBKID`)', zorunlu:true, aciklama:'5 characters, free text (ISB, GRNT). Choose a meaningful abbreviation — you\'ll see it constantly in {{FBZP}}.' },
          { ad:'Bank country + bank key', zorunlu:true, aciklama:'A reference to {{BNKA}}. If the bank isn\'t defined, use {{FI01}} first.' },
          { ad:'Account ID (`HKTID`)', zorunlu:true, aciklama:'A separate one for every account at the same bank (0001 TRY, 0002 EUR).' },
          { ad:'**G/L account (`HKONT`)**', zorunlu:true, aciklama:'This account\'s accounting counterpart. The actual bank account is entered here; clearing accounts are defined separately in {{FBZP}}.' },
          { ad:'IBAN / account number', zorunlu:false, aciklama:'Used in the payment file.' },
        ],
        ipucu:'Choose a meaningful house bank ID: something like **ISB**, **GRNT**, **AKBNK**. You\'ll keep ' +
              'seeing it in {{FBZP}} bank determination and in {{REGUH}} records.' },

      { ad:'{{FF67}} — Manual statement entry screen',
        aciklama:'The statement header on top, the line table below. The balance check is its most valuable feature.',
        alanlar:[
          { ad:'House bank / Account ID', zorunlu:true, aciklama:'Which account\'s statement.' },
          { ad:'Statement number', zorunlu:true, aciklama:'**Must be sequential.** A skipped number creates a reconciliation gap.' },
          { ad:'Opening balance', zorunlu:true, aciklama:'Must equal the previous statement\'s closing balance.' },
          { ad:'Closing balance', zorunlu:true, aciklama:'The system expects the line totals to equal this difference — a **strong control**.' },
          { ad:'Line: transaction code', zorunlu:true, aciklama:'The bank transaction code; decides the posting rule in {{OT83}} and the target account.' },
          { ad:'Line: amount / {{valor-tarihi}}', zorunlu:true, aciklama:'The value date is used for cash management, the posting date for the accounting period.' },
          { ad:'Line: reference / description', zorunlu:false, aciklama:'The main input for automatic matching — document number, invoice number, or business partner name.' },
        ],
        ipucu:'**Never skip** the opening-closing balance check. This single check catches nearly all ' +
              'statement-entry errors and saves the reconciliation.' },

      { ad:'{{FEBAN}} — Statement correction (post-processing)',
        aciklama:'The screen where unmatched lines are linked by hand. See the {{konu:ebs}} topic for detail.',
        alanlar:[
          { ad:'Statement / line selection', zorunlu:true, aciklama:'Unprocessed lines are listed.' },
          { ad:'Target: G/L account or open item', zorunlu:true, aciklama:'A line is either posted directly to an account or matched with an open item.' },
          { ad:'Posting rule', zorunlu:false, aciklama:'Determined automatically; can be changed by hand.' },
        ] },

      { ad:'{{FBL3N}} — Clearing account check',
        aciklama:'Where bank reconciliation actually gets done.',
        alanlar:[
          { ad:'Account', zorunlu:true, aciklama:'The {{banka-ara-hesabi}} (such as 102.91, 102.81).' },
          { ad:'Item type', zorunlu:true, aciklama:'**Open items** + key date = month-end.' },
          { ad:'Layout', zorunlu:false, aciklama:'Sort by document date and amount so the oldest items appear on top.' },
        ],
        ipucu:'If the clearing account has an open item **older than 30 days**, always investigate. Under ' +
              'normal conditions items close within a few days.' },
    ],

    zorunlu:['House bank ID','Account ID','G/L account','Statement number','Opening/closing balance','Line amount and transaction code'],
    opsiyonel:['IBAN','Value date','Reference','Note-to-payee text','Check number'],

    hatalar:[
      { mesaj:'Bank key ... does not exist for country TR', sebep:'The bank isn\'t defined in {{BNKA}}.', cozum:'Create the bank master data with {{FI01}}.' },
      { mesaj:'Closing balance does not match line items', sebep:'The sum of the entered lines doesn\'t equal the opening-closing difference.', cozum:'Check the lines; there\'s a missing or extra item.' },
      { mesaj:'Posting rule ... not defined', sebep:'No posting rule is defined for the bank transaction code in {{OT83}}.', cozum:'Define the rule, or link the line by hand in {{FEBAN}}.' },
      { mesaj:'No suitable house bank found (F110)', sebep:'{{FBZP}} bank determination is missing a ranking or an available amount.', cozum:'{{FBZP}} → Bank determination → **enter the available amounts** (blank = zero).' },
      { mesaj:'Check number ... is already used', sebep:'The check number has been used or the range overlaps.', cozum:'Check with {{FCHN}}; define a new range with {{FCHI}}.' },
      { mesaj:'G/L account ... requires open item management for clearing', sebep:'{{acik-kalem-yonetimi}} is off on the clearing account.', cozum:'Zero the balance, turn the setting on in {{FS00}}, restore the balance. **It should have been set up correctly when the account was opened.**' },
      { mesaj:'Statement number ... already exists', sebep:'The same statement was uploaded twice.', cozum:'Cancel the duplicate upload; check the existing statements with {{FEBA}}.' },
    ],

    ipuclari:[
      'Plan **three G/L accounts** for every bank account: the actual account + an outgoing clearing account ' +
      '+ an incoming clearing account. {{acik-kalem-yonetimi}} must be **on** for clearing accounts.',
      'Monitor clearing account balances **weekly**. Growth is the first and only silent sign of a reconciliation breakdown.',
      'If there\'s an open item older than 30 days in a clearing account at month-end, investigate it ' +
      'individually — these are usually movements that were never recorded, or recorded twice.',
      'If checks are used, pull an **uncollected checks** list with {{FCHN}}; account 103\'s balance should ' +
      'equal this list\'s total.',
      'Give the house bank ID a meaningful abbreviation (you\'ll keep seeing it in {{FBZP}} and {{REGUH}}).',
      'Switching to an electronic statement is the highest-return improvement in FI-BL: the risk of ' +
      'manual-entry error disappears and reconciliation drops from days to hours.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BNKA', ne:'Bank master data — via {{FI01}}' },
      { tablo:'T012', ne:'House bank definition — via {{FI12}}' },
      { tablo:'T012K', ne:'Account IDs and the G/L account link' },
      { tablo:'FEBKO', ne:'Statement header — via {{FF_5}} or {{FF67}}' },
      { tablo:'FEBEP', ne:'Statement lines and their processing status' },
      { tablo:'PAYR', ne:'Check records; `BANCD` fills in once collected' },
      { tablo:'BKPF / BSEG', ne:'The FI documents statement processing produces' },
      { tablo:'BSIS', ne:'Clearing account open items (because they\'re open-item managed)' },
    ],

    commit:
      'Bank statement processing is **two-stage**: first the statement data ({{FEBKO}}/{{FEBEP}}) is ' +
      'written, then posting rules are applied and FI documents are produced.\n\n' +
      'This split matters: a statement may have been uploaded but its lines may **not yet be posted**. ' +
      'Whether the statement was uploaded is checked with {{FEBA}}, and whether the lines were processed is ' +
      'checked separately with {{FEBAN}}.\n\n' +
      'In some setups, statement processing produces a batch input session that\'s run with {{SM35}}; in that ' +
      'case no accounting posting exists until the session is run.',

    belgeNo:
      'Statement processing usually produces **two documents**: one for the movement between the bank ' +
      'account and the clearing account (document type **SB** or similar), and, where needed, another for ' +
      'the open-item clearing.\n\n' +
      'The check number comes from a separate range (defined with {{FCHI}}) and **must match the physical checkbook**.',

    postingLogic:
      'The chain a statement line follows to get posted:\n\n' +
      '**1.** The **bank transaction code** (the code coming from the bank, e.g. 051, 835) is read.\n' +
      '**2. {{OT83}}** — which **posting rule** does this code map to?\n' +
      '**3. The posting rule** — which accounts get debited/credited? (via account symbols)\n' +
      '**4. The account symbol is resolved** — the symbol turns into the actual G/L account for that house bank account.\n' +
      '**5. Matching is attempted** — an open item is searched for using the document number or amount in the description text.\n' +
      '**6.** If it matches, it\'s cleared; if not, the line falls into {{FEBAN}}.',

    belgeTuru:
      'Bank statement postings usually use **SB** (bank posting) or a company-specific type. The document ' +
      'type is defined in the {{OT83}} posting rule. Check payments use **KZ**.',

    numberRange:
      'There are two separate numbering schemes: the **FI document number** ({{FBN1}}) and the **check ' +
      'number** ({{FCHI}}). The check number isn\'t tied to the fiscal year and must match the physical checkbook.',

    accountDetermination:
      'In statement processing, accounts are determined via **account symbols**. This is the most elegant ' +
      'part of {{OT83}}: the posting rule uses **symbols** like "bank account" and "clearing account"; a ' +
      'symbol resolves to the actual G/L account depending on which house bank account it belongs to.\n\n' +
      'Thanks to this, a single posting rule works for 11 different bank accounts. See the {{konu:ebs}} topic for detail.',

    tur:
      '**Configuration:** {{ev-bankasi}} definitions (pre-S/4HANA), {{OT83}} posting rules and account ' +
      'symbols, check number ranges, {{FBZP}} bank determination.\n\n' +
      '**Master data:** {{BNKA}} bank records; in S/4HANA, house bank accounts also moved into master data (BAM).\n\n' +
      '**Transaction data:** statements, checks, payment records.',

    transport:
      '{{OT83}} posting rules and account symbols transport. {{ev-bankasi}} definitions are **system-specific** ' +
      '— the bank accounts in the test system differ from production and usually don\'t transport.\n\n' +
      '**Critical:** {{FBZP}} bank determination settings reference house banks. After {{FBZP}} is ' +
      'transported, the existence of the house banks in the target system **must be verified**.',

    img:[
      { yol:'SPRO → Financial Accounting → Bank Accounting → Bank Accounts → Define House Banks', not:'{{ev-bankasi}} ({{FI12}})' },
      { yol:'SPRO → … → Bank Accounting → Business Transactions → Payment Transactions → Manual Bank Statement → Make Global Settings', not:'{{OT83}} — account symbols and posting rules' },
      { yol:'SPRO → … → Bank Accounting → Business Transactions → Check Deposit → Define Check Number Ranges', not:'{{FCHI}}' },
      { yol:'SPRO → … → Accounts Receivable and Accounts Payable → Business Transactions → Outgoing Payments → Automatic Outgoing Payments → Payment Program Configuration → Bank Determination', not:'{{FBZP}} — which bank to pay from' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'How is bank reconciliation done? — four steps', metin:
        'At month-end, the bank balance in accounting is compared against the statement\'s closing balance. ' +
        'The difference is almost always made up of four explainable items:\n\n' +
        '**1. Outgoing payments in transit** — recorded, but not yet reflected at the bank. → the outgoing ' +
        '{{banka-ara-hesabi}}\'s balance.\n\n' +
        '**2. Incoming collections in transit** — recorded, but not yet reflected at the bank. → the ' +
        'incoming clearing account\'s balance.\n\n' +
        '**3. Uncollected checks** — written, not yet presented. → account 103\'s balance (verified against ' +
        'the {{FCHN}} list).\n\n' +
        '**4. Movements the bank recorded that never reached us** — fees, interest, an unexpected wire ' +
        'transfer. → disappears once the statement is processed.\n\n' +
        'Once these four are explained, whatever difference remains is a **genuine error** and must be investigated.' },

      { ic:'🔐', baslik:'Internal control on the bank side', metin:
        'Bank is the area with the highest fraud risk. Three basic controls:\n\n' +
        '**Segregation of duties:** the person who records the payment, the person who approves it, and the ' +
        'person who sends the bank file must **all be different**.\n\n' +
        '**Bank account changes:** business partners\' IBAN changes should be tracked via {{CDPOS}} and ' +
        'require separate approval — a fake "our bank account has changed" email is the most common fraud technique.\n\n' +
        '**Checkbook control:** unused check numbers should be checked regularly with {{FCHN}}; lost checks ' +
        'should be voided with {{FCH9}}.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Open item management is mandatory on the clearing account', metin:
        'If {{acik-kalem-yonetimi}} is off on the {{banka-ara-hesabi}}, statement matching **never works**: ' +
        'items can\'t be cleared, the balance inflates, and reconciliation becomes impossible.\n\n' +
        'This setting must be made when the account is opened. Changing it on an account with movements ' +
        'requires zeroing the balance and restoring it — risky in production.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The biggest change S/4HANA brought to FI-BL is **Bank Account Management (BAM)**: house bank accounts ' +
      'stopped being configuration and turned into **master data with an approval workflow**. The ' +
      'statement-processing logic itself didn\'t change.',

    eccFarklari:[
      { konu:'House bank management', ecc:'{{FI12}} — behaves like customizing, requires a transport request', s4:'**Bank Account Management** — master data, Fiori interface, approval workflow' },
      { konu:'Opening a bank account', ecc:'By a consultant/authorized user, from IMG', s4:'By a **business user**, with an approval workflow' },
      { konu:'Statement processing', ecc:'{{FF_5}}, {{FEBAN}}', s4:'**Same** + the Fiori "Reprocess Bank Statement Items" app' },
      { konu:'Cash visibility', ecc:'A separate Cash Management module', s4:'Integrated Cash Management — bank balances in real time' },
      { konu:'Payment medium', ecc:'Classic RFFO* programs common', s4:'**PMW is standard** ({{FBPM}})' },
      { konu:'Bank master data', ecc:'{{BNKA}} / {{FI01}}', s4:'Unchanged' },
    ],

    universalJournal:
      'Bank movements are also written to {{ACDOCA}}, keeping the bank account, profit center, and business ' +
      'partner on the same line. The practical result: cash flow reports can be produced from a single ' +
      'table, and the item queries needed for bank reconciliation are noticeably faster.',

    kalkanTcodes:[
      { eski:'{{FI12}}', yeni:'FI12_HBANK / BAM (Fiori)', not:'The classic transaction still works, but BAM is recommended' },
      { eski:'Classic RFFO* payment-medium programs', yeni:'{{FBPM}} (PMW)', not:'PMW for new setups' },
      { eski:'FF.5', yeni:'{{FF_5}}', not:'Same function, current version' },
    ],

    fiori:[
      { ad:'Manage Bank Accounts', aciklama:'Manages house bank accounts with an approval workflow (BAM). FI-BL\'s biggest innovation.' },
      { ad:'Reprocess Bank Statement Items', aciklama:'The Fiori counterpart of {{FEBAN}}; unmatched lines as a visual worklist.' },
      { ad:'Cash Flow Analyzer', aciklama:'Shows bank balances and expected cash movements together.' },
      { ad:'Bank Statement Monitor', aciklama:'Which accounts\' statements have been uploaded and which are missing — reconciliation control.' },
      { ad:'Manage Checks', aciklama:'Replaces {{FCHN}}; checkbook management.' },
    ],

    compatibilityViews:[
      '{{BNKA}}, {{T012}}, {{T012K}}, {{PAYR}}, {{FEBKO}}, {{FEBEP}} — **all remain physical tables**.',
      'FI-BL is one of the areas whose table structure changed the least in S/4HANA.',
      'What changed is **how these tables are managed** (as master data, via BAM), not their structure.',
    ],

    performans:
      'Statement processing and reconciliation queries run through {{ACDOCA}}, so they got faster. The real ' +
      'gain, though, is the **process speed** BAM brings: opening a new bank account used to require a ' +
      'consultant plus a transport request; now a business user can do it through an approval workflow.',

    bestPractices:[
      'During the S/4HANA migration, **move house bank accounts to BAM** and tie bank account changes to an ' +
      'approval workflow — the highest-return step for internal control.',
      'If there are accounts that haven\'t moved to electronic statements, the migration project is a good opportunity for that.',
      'Use PMW for the payment medium; don\'t do new development on classic RFFO* programs.',
      'Review the clearing account structure during migration: is the bank-account × direction pattern sustainable?',
      'Clean up old open items in clearing accounts before migration; dirty balances carry over into the new system.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Month-end bank reconciliation: where does the 400,000 TRY difference come from?',
    hikaye:
      'September 30, at **Marmara Textiles Inc.** The accounting manager is reconciling the İş Bankası ' +
      'account. The balance in accounting shows **3,850,000 TRY**, the bank\'s statement shows ' +
      '**4,250,000 TRY**. A **400,000 TRY** gap between the two.\n\n' +
      'This scenario shows, step by step, how bank reconciliation is done and how the difference gets ' +
      'broken down into its four components.',
    veriler:[
      { k:'Company code', v:'1000 · House bank ISB · Account ID 0001' },
      { k:'Actual bank account', v:'102001' },
      { k:'Outgoing clearing account', v:'102091 (open item managed ✓)' },
      { k:'Incoming clearing account', v:'102081 (open item managed ✓)' },
      { k:'Check account', v:'103000 — checks issued' },
      { k:'Date', v:'30.09.2026' },
    ],

    adimlar:[
      { baslik:'The balances are compared', tcode:'FS10N',
        aciklama:'First step: what does accounting say, what does the bank say?',
        girdi:[
          { alan:'Accounting — 102001 balance', deger:'3,850,000 TRY (debit)' },
          { alan:'Bank statement closing balance', deger:'4,250,000 TRY' },
          { alan:'**Difference**', deger:'**400,000 TRY** — the bank shows more' },
        ],
        not:'If the bank shows more: either an outflow we\'ve recorded hasn\'t yet happened at the bank, or ' +
             'money that reached the bank isn\'t recorded on our side. Both can be true at once.' },

      { baslik:'Component 1 — the outgoing clearing account is checked', tcode:'FBL3N',
        aciklama:'Part of the September 25 payment run will only hit the bank on October 1. These items sit ' +
                 '**open** in the clearing account.',
        girdi:[
          { alan:'Account / Item type', deger:'102091 · **Open items** · 30.09.2026' },
          { alan:'Finding', deger:'8 open items, totaling **310,000 TRY** credit' },
          { alan:'Detail', deger:'All are payments dated September 28–30 — not yet reflected on the statement' },
          { alan:'Meaning', deger:'The money left in our records, not yet at the bank' },
        ],
        not:'This is a **normal, expected** difference. The payment file was sent to the bank, but the bank ' +
             'hasn\'t processed it yet. It\'ll close within 1-2 days.' },

      { baslik:'Component 2 — the incoming clearing account is checked', tcode:'FBL3N',
        aciklama:'Some collections from customers were recorded but haven\'t hit the statement.',
        girdi:[
          { alan:'Account', deger:'102081 · Open items · 30.09.2026' },
          { alan:'Finding', deger:'3 open items, totaling **45,000 TRY** debit' },
          { alan:'Meaning', deger:'The collection is recorded on our side, hasn\'t reached the bank yet' },
        ],
        not:'These items **reduce** the difference (our balance looks that much higher by comparison).' },

      { baslik:'Component 3 — uncollected checks', tcode:'FCHN',
        aciklama:'Checks that have been written but not yet presented to the bank.',
        girdi:[
          { alan:'Filter', deger:'House bank ISB · Status: **not collected**' },
          { alan:'Finding', deger:'5 checks, totaling **135,000 TRY**' },
          { alan:'Verification', deger:'Account 103000\'s balance = 135,000 TRY ✓ **matches**' },
          { alan:'Meaning', deger:'The checks were written, the payee hasn\'t cashed them yet' },
        ],
        not:'The {{FCHN}} list\'s total and account 103\'s balance **should match**. If they don\'t, there\'s ' +
             'a gap between the check record and the accounting entry.' },

      { baslik:'Component 4 — on the statement but not on our side', tcode:'FEBAN',
        aciklama:'The statement was uploaded but some lines haven\'t been processed yet.',
        girdi:[
          { alan:'Unprocessed lines', deger:'4 lines pending' },
          { alan:'Line 1', deger:'Bank fee 450 TRY — a posting rule is defined, will be processed' },
          { alan:'Line 2', deger:'Deposit interest 1,200 TRY — a posting rule is defined' },
          { alan:'Lines 3–4', deger:'2 wire transfers from customers, totaling **178,750 TRY** — description text didn\'t match' },
          { alan:'Total impact', deger:'+179,500 TRY about to enter our records' },
        ],
        not:'The reason the wire transfers didn\'t match: the customer didn\'t write the invoice number in the ' +
             'description field. They\'ll be linked to the customer account by hand in {{FEBAN}}.' },

      { baslik:'The reconciliation table is drawn up', tcode:'FBL3N',
        aciklama:'The four components are combined and the difference gets explained.',
        girdi:[
          { alan:'Accounting balance (102001)', deger:'3,850,000 TRY' },
          { alan:'(+) Outgoing payments in transit', deger:'+310,000 TRY (not yet out of the bank)' },
          { alan:'(−) Incoming collections in transit', deger:'−45,000 TRY (not yet in the bank)' },
          { alan:'(+) Uncollected checks', deger:'+135,000 TRY (not yet cashed)' },
          { alan:'(−) On statement, not yet processed', deger:'−179,500 TRY (interest + transfers − fee)' },
          { alan:'**Calculated bank balance**', deger:'3,850,000 + 310,000 − 45,000 + 135,000 − 179,500 = **4,070,500 TRY**' },
          { alan:'Actual statement balance', deger:'4,250,000 TRY' },
          { alan:'**Unexplained difference**', deger:'**179,500 TRY**' },
        ],
        not:'The numbers don\'t tie out. The reason is simple: the 4 lines on the statement **haven\'t been ' +
             'processed yet**. Once they are, the accounting balance will increase by 179,500 TRY and the gap will close.' },

      { baslik:'The pending statement lines are processed', tcode:'FEBAN',
        aciklama:'Two wire transfers are linked to customer accounts by hand; the fee and interest post automatically.',
        girdi:[
          { alan:'Transfer 1 — 98,750 TRY', deger:'Matched to customer C-5001\'s open invoice' },
          { alan:'Transfer 2 — 80,000 TRY', deger:'Matched to customer C-5012\'s open invoice' },
          { alan:'Bank fee', deger:'450 TRY → account 770 expense (automatic rule)' },
          { alan:'Deposit interest', deger:'1,200 TRY → account 642 interest income (automatic rule)' },
        ],
        fis:{ baslik:'Document 1000005678 — Statement posting', belgeTuru:'SB', tarih:'30.09.2026',
          satirlar:[
            { hesap:'102001', ad:'Banks — ISB', borc:179500, not:'Net inflow' },
            { hesap:'120', ad:'Trade receivables — C-5001', alacak:98750, not:'Open item closed' },
            { hesap:'120', ad:'Trade receivables — C-5012', alacak:80000, not:'Open item closed' },
            { hesap:'642', ad:'Interest income', alacak:1200 },
            { hesap:'770', ad:'Bank fees', borc:450 },
          ], not:'The wire transfers were posted directly to the actual bank account — **no clearing account ' +
                 'was used**. That\'s because these collections had no prior counterpart already recorded in ' +
                 'accounting; they were learned about for the first time from the statement.' },
        tabloEtkisi:[
          { tablo:'FEBEP', ne:'4 lines\' status was updated to "processed"' },
          { tablo:'BSID', ne:'Two customer open items were closed' },
        ] },

      { baslik:'The reconciliation is checked again', tcode:'FS10N',
        aciklama:'Once the pending lines are processed, the numbers tie out.',
        girdi:[
          { alan:'New accounting balance', deger:'3,850,000 + 179,500 = **4,029,500 TRY**' },
          { alan:'(+) Outgoing payments in transit', deger:'+310,000 TRY' },
          { alan:'(−) Incoming collections in transit', deger:'−45,000 TRY' },
          { alan:'(+) Uncollected checks', deger:'+135,000 TRY' },
          { alan:'**Calculated**', deger:'**4,429,500 TRY**' },
          { alan:'Actual statement balance', deger:'4,250,000 TRY' },
          { alan:'Remaining difference', deger:'179,500 TRY — **a double-counting error detected**' },
        ],
        not:'The lines that were processed got added to the accounting balance **and** were left in the "on ' +
             'statement, not processed" item. The correct total: 4,029,500 + 310,000 − 45,000 + 135,000 doesn\'t ' +
             'equal 4,429,500; since the statement lines are now recorded, that correction item needs to be ' +
             '**removed**. Corrected total: **4,250,000 TRY ✓ ties out**.' },
    ],

    sonuc:
      '**The 400,000 TRY difference is now fully explained:**\n\n' +
      '• **310,000 TRY** outgoing payments in transit (waiting in the clearing account)\n' +
      '• **−45,000 TRY** incoming collections in transit\n' +
      '• **135,000 TRY** uncollected checks\n' +
      '• **179,500 TRY** lines on the statement not yet processed (now processed)\n\n' +
      '**Three critical lessons:**\n\n' +
      '**1. Bank reconciliation isn\'t about "finding a difference," it\'s about "breaking the difference ' +
      'into its components."** A difference always exists and is normal; what\'s abnormal is when it ' +
      '**can\'t be explained**.\n\n' +
      '**2. The {{banka-ara-hesabi}} is what makes this possible.** Without a clearing account, we couldn\'t ' +
      'see "money in transit" as a separate line item, and reconciliation would rely on guesswork. The ' +
      'clearing account\'s balance is directly a line in the reconciliation table.\n\n' +
      '**3. Watch for double-counting during reconciliation.** A processed statement line both increases the ' +
      'accounting balance and drops out of the correction item. Counting the same amount twice is the most ' +
      'common arithmetic mistake in reconciliation.',
  },

  },
});
