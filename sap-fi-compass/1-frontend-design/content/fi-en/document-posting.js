/* ==========================================================================
   content/fi-en/document-posting.js — English body for "Document Posting"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'document-posting',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Document posting is the process by which an economic event turns, in SAP, into an ' +
      '**accounting document**. Wherever it comes from — entered by hand, dropped in from MM, flowed in ' +
      'from SD — the result always has the same shape: one header ({{BKPF}}) + at least two balanced ' +
      'lines ({{BSEG}}).\n\n' +
      'This topic is FI\'s **mechanics**. The other topics describe "what gets posted"; this one describes ' +
      '"how it gets posted": which document type, which posting key, which field is mandatory, where the ' +
      'number comes from, how a wrong entry is corrected.\n\n' +
      'Almost every error you get in FI is a link in this mechanism. That\'s why understanding document ' +
      'posting is the **prerequisite** for resolving errors.',

    neden:
      '**For consistency.** Every document goes through the same rules; company code, period, and ' +
      'account-type checks apply without exception.\n\n' +
      '**For control.** {{belge-turu}} limits which account types can be posted to; {{alan-durumu}} decides ' +
      'which information is mandatory. These are structural controls — not left to user discipline.\n\n' +
      '**For traceability.** Every document carries who posted it, when, and on what basis. A posting in ' +
      'accounting is **never deleted**; a wrong entry is corrected with a {{ters-kayit}} and the trail is preserved.',

    sirketOnemi:
      'If the document posting mechanism isn\'t set up correctly, two kinds of problems arise: either users ' +
      'keep getting errors and work stops, or **wrong data gets into the system without any error** — the ' +
      'second one is far more dangerous.\n\n' +
      'Example: if cost center isn\'t mandatory on an expense account, the user leaves it blank, the posting ' +
      'goes through cleanly, but that expense never gets charged to any department and the CO reports come ' +
      'out incomplete. Nobody sees an error message.\n\n' +
      'From a consulting standpoint: the design of {{alan-durumu}}, {{belge-turu}}, and {{numara-araligi}} ' +
      'must be **correct** before going live. These can be changed later, but past documents stay under the ' +
      'old rule and data inconsistency results.',

    gercekHayat:
      'An accounting specialist, on the last day of December, posts a rent invoice dated 31.12. The invoice ' +
      'reached her hands on January 3rd. She leaves the posting date at its default: **03.01**.\n\n' +
      'The posting goes through cleanly. No error, no warning. But 50,000 TRY of expense fell into the ' +
      '**wrong year**: December profit looked 50,000 TRY too high, January profit 50,000 TRY too low. It ' +
      'was noticed after the financial statements had been signed off, and a correction posting was needed.\n\n' +
      'The problem was in a single field: the **posting date (`BUDAT`)**. The document date, 31.12, was ' +
      'correct, but it isn\'t what determines the period. This is the cost of not knowing document posting mechanics.',

    muhasebeMantigi:
      'An FI document is made up of **two layers**:\n\n' +
      '**Header ({{BKPF}}):** the document\'s identity — number, {{belge-turu}}, dates, currency, user, ' +
      'source document reference. **One** line per document.\n\n' +
      '**Line items ({{BSEG}}):** account, amount, debit/credit direction, and additional dimensions, line ' +
      'by line. **At least two** lines per document, and total debit = total credit.\n\n' +
      'In S/4HANA there\'s a third layer as well: **{{ACDOCA}}** — the same items in universal format, with ' +
      'a separate set of lines for each active {{defter}}.\n\n' +
      'The {{belge-denkligi}} rule can\'t be softened: an unbalanced document can\'t be posted, it can only ' +
      'be set aside with {{park-etme}}.',

    kavramlar: ['belge-turu', 'kayit-anahtari', 'hesap-tipi', 'alan-durumu', 'numara-araligi',
                'belge-denkligi', 'ters-kayit', 'park-etme', 'kayit-donemi', 'hesap-belirleme'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The document posting process is a **chain of controls**. When the Save button is pressed, the ' +
      'system passes through seven checks in sequence, and if any one of them fails, the posting stops. ' +
      'The way to resolve error messages is to know which link it got stuck on.',

    roller:[
      { rol:'Business unit', gorev:'Carries out the economic event and documents it (invoice, memo, receipt).' },
      { rol:'Accounting specialist', gorev:'Enters or parks the document; responsible for the correctness of account, date, and amount.' },
      { rol:'Accounting manager', gorev:'Approves parked high-value documents; opens/closes periods.' },
      { rol:'System', gorev:'Applies the seven checks, assigns the number, writes the tables.' },
      { rol:'FI consultant', gorev:'Designs {{belge-turu}}, {{numara-araligi}}, {{alan-durumu}}, tolerance, and validation rules.' },
      { rol:'Internal audit', gorev:'Audits document changes and reversals through {{CDHDR}}/{{CDPOS}}.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'What happens when the Save button is pressed? — seven checks',
      adimlar:[
        { ic:'📝', rol:'User', baslik:'Data is entered',
          aciklama:'Header fields (dates, company code, document type) and line items (account, amount, direction).',
          cikti:'An entered document draft', ok:'save' },
        { ic:'📅', rol:'System', baslik:'1. Period check',
          aciklama:'The period is calculated from the posting date (`BUDAT`), and {{OB52}} is checked to see ' +
                   'whether that period is open **for the relevant account type**.',
          cikti:'Period valid', ok:'if it passes' },
        { ic:'🏷️', rol:'System', baslik:'2. Document type check',
          aciklama:'Which {{hesap-tipi}} does {{belge-turu}} allow? A KR type won\'t let you post to a customer account.',
          cikti:'Account type suitable', ok:'if it passes' },
        { ic:'🔑', rol:'System', baslik:'3. Posting key is determined',
          aciklama:'The debit/credit choice turns into a {{kayit-anahtari}} in the background (40 G/L debit, ' +
                   '50 G/L credit, 31 vendor credit…). The key carries both the direction and the target account type.',
          cikti:'Posting key assigned', ok:'if it passes' },
        { ic:'📋', rol:'System', baslik:'4. Field status check',
          aciklama:'The account\'s {{alan-durumu}} group is compared against the posting key\'s field status. ' +
                   '**The more restrictive one wins.** The posting stops if a mandatory field is blank.',
          cikti:'Fields complete', ok:'if it passes' },
        { ic:'✓', rol:'System', baslik:'5. Validation and substitution',
          aciklama:'{{OB28}} validation rules check business rules; {{OBBH}} substitution rules automatically ' +
                   'fill in or change fields.',
          cikti:'Rules passed', ok:'if it passes' },
        { ic:'⚖️', rol:'System', baslik:'6. Balance check',
          aciklama:'{{belge-denkligi}}: total debit = total credit. If {{belge-bolme}} is on, the balance is ' +
                   'checked **separately for each ledger and each dimension**.',
          cikti:'Document balanced', ok:'if it passes' },
        { ic:'🔢', rol:'System', baslik:'7. Number is assigned and written',
          aciklama:'The next number is taken from {{numara-araligi}}; {{BKPF}}, {{BSEG}}, {{ACDOCA}}, and ' +
                   'index tables are written within a single LUW.',
          cikti:'Posted document' },
      ],
    },

    adimlar:[
      { rol:'User', eylem:'Enters the document header', sistem:'{{FB50}}, {{FB60}}, {{F-02}} — dates, company code, type' },
      { rol:'User', eylem:'Enters the line items', sistem:'Account, debit/credit, amount, additional fields' },
      { rol:'User', eylem:'Runs a simulation', sistem:'Document → Simulate — the lines the system will add become visible' },
      { rol:'System', eylem:'Applies the seven checks', sistem:'Period → type → key → field status → rules → balance → number' },
      { rol:'System', eylem:'Writes the tables', sistem:'{{BKPF}}, {{BSEG}}, {{ACDOCA}}, {{BSET}}, indexes' },
      { rol:'User', eylem:'Displays / checks the document', sistem:'{{FB03}}' },
      { rol:'User', eylem:'Reverses it if wrong', sistem:'{{FB08}} — no deletion' },
      { rol:'User', eylem:'Updates the changeable fields', sistem:'{{FB02}}, {{FB09}}' },
    ],

    veriAkisi:{
      nereden:'Manual entry; the automatic flow from MM ({{MIGO}}, {{MIRO}}), SD ({{VF01}}), HR payroll, ' +
              'AA ({{AFAB}}), and other modules.',
      nereye:'{{BKPF}} + {{BSEG}} + {{ACDOCA}}; {{BSET}} if there\'s tax; index tables on open-item-managed ' +
             'accounts; from there to balances and financial statements.',
      tetikleyen:'An economic event backed by a document. No posting is made without a document.',
      sonraki:'Checking ({{FB03}}), clearing, period-end processing, reporting.',
    },

    notlar:[
      { tip:'tip', baslik:'Simulation — the least-used, most valuable feature', metin:
        '*Document → Simulate* shows, without posting, every line the system will produce **in addition to ' +
        'the lines you entered**: the tax line, {{belge-bolme}} lines, exchange difference, automatic ' +
        'difference accounts.\n\n' +
        'You see there that a document you entered two lines for turns into six. Simulating before posting ' +
        'removes most of the hassle of a reversal.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'This topic\'s accounting dimension is **the shape of the document itself**. Below you see how the ' +
      'same event is posted with different document types, which lines the system adds automatically, and ' +
      'how a reversal works.',

    etkilenenHesaplar:[
      { hesap:'Accounts the user enters', tur:'Variable', neden:'Expense, income, asset — the user chooses. {{alan-durumu}} decides which additional information is requested.' },
      { hesap:'Tax accounts (191 / 391)', tur:'Balance sheet', neden:'When a {{vergi-kodu}} is entered, SAP adds the line **automatically** and separately records it in {{BSET}}. Never typed by hand.' },
      { hesap:'{{mutabakat-hesabi}}', tur:'Balance sheet', neden:'When a vendor/customer number is entered, SAP looks it up from master data and writes it automatically.' },
      { hesap:'Document-splitting lines', tur:'Variable', neden:'If {{belge-bolme}} is on, shared lines (vendor, tax) are split according to the profit-center distribution of the expense lines.' },
      { hesap:'The same accounts in a reversal', tur:'Variable', neden:'{{ters-kayit}} produces a new document by **flipping the direction** of the original lines; the accounts are the same.' },
    ],

    fisler:[
      { baslik:'What the user entered — 2 lines',
        belgeTuru:'KR', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:50000, not:'Entered by the user' },
          { hesap:'320', ad:'Trade payables — V-2001', alacak:60000, not:'Automatic from the vendor number' },
        ],
        not:'This **isn\'t balanced** (50,000 ≠ 60,000). The user entered a tax code but didn\'t write the ' +
             'tax line. The system will add the missing line in the simulation.' },

      { baslik:'After simulation — the document the system completed',
        belgeTuru:'KR', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:50000, not:'User · cost center 1200' },
          { hesap:'191', ad:'Deductible VAT', borc:10000, not:'**Added by the system** — from the tax code' },
          { hesap:'320', ad:'Trade payables — V-2001', alacak:60000, not:'{{mutabakat-hesabi}}' },
        ],
        not:'The system added the tax line automatically and the document balanced. It also wrote a tax ' +
             'record into the {{BSET}} table (base 50,000, tax 10,000).' },

      { baslik:'With document splitting on — the same document grows to 5 lines',
        belgeTuru:'KR', tarih:'15.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'Expense — cost center 1000', borc:30000, not:'Entered by the user' },
          { hesap:'770', ad:'Expense — cost center 2000', borc:20000, not:'Entered by the user' },
          { hesap:'191', ad:'VAT — cost center 1000', borc:6000, not:'**Split** (in the ratio 30/50)' },
          { hesap:'191', ad:'VAT — cost center 2000', borc:4000, not:'**Split** (in the ratio 20/50)' },
          { hesap:'320', ad:'Trade payables — cost center 1000', alacak:36000, not:'**Split**' },
          { hesap:'320', ad:'Trade payables — cost center 2000', alacak:24000, not:'**Split**' },
        ],
        not:'If {{belge-bolme}} is on, the tax and vendor lines are **automatically split** according to the ' +
             'profit-center distribution of the expense lines. The goal: balanced (balance-sheet-producible) ' +
             'data for each profit center separately. The user entered 2 lines, the document became 6 — ' +
             'seeing this in the simulation matters.' },

      { baslik:'Reversal ({{FB08}}) — the mirror image of the original',
        belgeTuru:'KR', tarih:'20.11.2026', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', alacak:50000, not:'Direction **flipped**' },
          { hesap:'191', ad:'Deductible VAT', alacak:10000, not:'Direction flipped' },
          { hesap:'320', ad:'Trade payables — V-2001', borc:60000, not:'Direction flipped' },
        ],
        not:'A reversal is a **new document**; the original isn\'t deleted. Both documents stay in the ' +
             'records and are linked to each other in {{BKPF}}: the reversal\'s number is written into the ' +
             'original\'s `STBLG` field. Both documents show up on an audit — that\'s how the trail is ' +
             'preserved in accounting.' },
    ],

    tHesaplar:[
      { hesap:'General administrative expense', kod:'770',
        borc:[{ ad:'Original posting', tutar:50000 }],
        alacak:[{ ad:'Reversal (FB08)', tutar:50000 }],
        not:'Net effect zero — but both entries are visible' },
      { hesap:'Trade payables', kod:'320',
        borc:[{ ad:'Reversal', tutar:60000 }],
        alacak:[{ ad:'Original posting', tutar:60000 }],
        not:'The open item is also cleared automatically' },
    ],

    notlar:[
      { tip:'warn', baslik:'Which date does the reversal fall on?', metin:
        'In {{FB08}}, the **reversal reason** decides which date the reversal falls on:\n\n' +
        '• **Reason 01** — falls on the original document\'s date (the same period).\n' +
        '• **Reason 02** — falls on the entered alternative date (a different period).\n\n' +
        'If the original period is closed, reason 01 doesn\'t work; a reason that requires an alternative ' +
        'date must be chosen. This distinction is a common obstacle at month-end closes.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Document posting varies along four axes: **entry screen** (classic or enter view), ' +
      '**document status** (parked or permanent), **document type**, and **correction method**.',

    liste:[
      { ad:'Classic Entry — F-02',
        aciklama:'Proceeds line by line; the {{kayit-anahtari}} and account are entered **by hand** for each ' +
                 'line. The current line is completed before moving to the next.',
        neZaman:'On special G/L postings, complex multi-line documents, whenever the posting key needs to be chosen deliberately.',
        ornek:'Posting key 40 (G/L debit) → account → amount → Enter → posting key 50 (G/L credit) → …',
        tcodes:['F-02','F-43','FB01'] },

      { ad:'Enter View — FB50 / FB60 / FB70',
        aciklama:'All lines are entered on a single table-layout screen. The posting key **isn\'t asked ' +
                 'for**; debit/credit is chosen, and the system determines the key in the background.',
        neZaman:'On day-to-day routine postings. Noticeably faster than classic entry.',
        ornek:'{{FB50}} G/L, {{FB60}} vendor invoice, {{FB70}} customer invoice.',
        tcodes:['FB50','FB60','FB70','FB65','FB75'] },

      { ad:'Parked Document',
        aciklama:'The document is stored but **not posted to accounting**. Can be saved even if the balance ' +
                 'isn\'t balanced; no account is affected, it doesn\'t enter the balances.',
        neZaman:'For documents awaiting approval, when information is missing, in a four-eyes setup.',
        ornek:'Parked with {{FV50}}, posted to accounting with {{FBV0}}. **Every field including the amount** can be changed while parked.',
        tcodes:['FV50','FV60','FBV0','FBV2','FBV4'] },

      { ad:'Held Document',
        aciklama:'The document is temporarily stored on the user\'s own screen. No document number is ' +
                 '**assigned**, no other user can see it, nothing is written permanently to any table.',
        neZaman:'For a "I\'m halfway through, I\'ll continue later" situation. **Not suitable** for an approval workflow.',
        ornek:'Stored on-screen with *Document → Hold*; the user recalls it from their own screen.' },

      { ad:'Recurring Entry',
        aciklama:'A template document is defined ({{FBD1}}), and it\'s automatically produced at set intervals ({{F.14}}).',
        neZaman:'For recurring postings with the same amount every month, like rent, insurance, or subscriptions.',
        ornek:'50,000 TRY monthly rent → the template is defined once, produced automatically for 12 months.',
        tcodes:['FBD1','F.14','FAGLGA35'] },

      { ad:'Reversal — FB08',
        aciklama:'**Doesn\'t delete** a posted document; zeroes out its effect by posting the opposite. Both ' +
                 'documents stay in the records and are linked to each other.',
        neZaman:'For every wrongly posted document. The one correct correction method in accounting.',
        ornek:'{{FB08}} for a single document, {{F.80}} for a mass reversal.',
        tcodes:['FB08','F.80'] },

      { ad:'Change Document — FB02',
        aciklama:'Updates **only the changeable fields** on a posted document: due date, {{odeme-blogu}}, ' +
                 'text, assignment. **The amount and the account can\'t be changed.**',
        neZaman:'A due-date correction, placing/removing a payment block, adding a description.',
        ornek:'{{FB02}} at the document level, {{FB09}} for a quick change at the single-item level.',
        tcodes:['FB02','FB09'] },
    ],

    karsilastirmaBasliklar:['Park', 'Hold'],
    karsilastirma:[
      ['Document number', '**Assigned** — the number is consumed', 'Not assigned'],
      ['Written to the table', 'Yes — into {{BKPF}}/{{BSEG}} with a parked status', 'No — temporary storage'],
      ['Can someone else see it', '**Yes** — shows up in the worklist', 'No — only the owner'],
      ['Balance required', 'No — can be parked unbalanced', 'No'],
      ['Approval workflow', '**Supports it** ({{FBV4}})', 'Doesn\'t support it'],
      ['Shows up in reports', 'In parked-document reports', 'Nowhere'],
      ['When to use it', 'A genuine document awaiting approval', '"I\'m halfway through, I\'ll get back to it"'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'FB03', ad:'Document display — FI\'s X-ray machine',
        amac:'Shows an FI document with its header, line items, tax lines, and linked documents.',
        neZaman:'In every error analysis, every reconciliation, every moment the question "where did this number come from?" is asked.',
        adimlar:[
          { baslik:'Enter the company code, document number, and fiscal year',
            aciklama:'This triple is {{BKPF}}\'s primary key and uniquely identifies the document.' },
          { baslik:'Review the line item list; double-click a line to drill into detail' },
          { baslik:'*Document Header* button',
            aciklama:'{{belge-turu}}, dates, user, reference, and **`AWKEY`** (the source document) are here.' },
          { baslik:'*Environment → Document Flow / Related Documents*',
            aciklama:'Shows which MM/SD document the document came from, and which CO document it produced.' },
          { baslik:'*Environment → Change Documents*',
            aciklama:'Who changed what and when — from the {{CDHDR}}/{{CDPOS}} tables.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Company code 1000 · Document 1900000234 · Fiscal year 2026' },
          { ekran:'Item list', islem:'3 lines; debit/credit total at the bottom' },
          { ekran:'Item detail', islem:'Due date, assignment, cost center, tax code, payment block' },
          { ekran:'Document header', islem:'BLART = KR · AWTYP = RMRP → came from MIRO' },
        ],
        alanlar:{ zorunlu:['Company code','Document number','Fiscal year'], opsiyonel:['Display layout'] },
        hatalar:[
          { mesaj:'Document ... does not exist in company code ...', sebep:'The document is in a different company code or a different fiscal year.', cozum:'Try changing the fiscal year; if unsure, search for it in {{BKPF}} with {{SE16N}}.' },
          { mesaj:'No authorization to display documents', sebep:'The F_BKPF_BUK authorization object is missing.', cozum:'Run {{SU53}} and pass the output to the authorization team.' },
        ],
        ipucu:'If you don\'t know the document number, you can also land here by double-clicking a line in ' +
              'an {{FBL1N}}/{{FBL3N}}/{{FBL5N}} report. In practice the document number isn\'t memorized, ' +
              'it\'s reached from a report.',
        ilgili:['FB02','FB08','FBL3N','SE16N'] },

      { kod:'FB08', ad:'Document reversal',
        amac:'Zeroes out the effect of a posted document without deleting it, by posting the opposite.',
        neZaman:'For every wrongly posted document. The one correct correction method in accounting.',
        adimlar:[
          { baslik:'Enter the company code, document number, and fiscal year' },
          { baslik:'Choose the **reversal reason** — the most critical field',
            aciklama:'**01** falls on the original document\'s date (the same period). **02** falls on the ' +
                     'entered alternative date (a different period). If the original period is closed, 01 doesn\'t work.' },
          { baslik:'Enter the posting date and period if needed',
            aciklama:'Only opens up for reasons that require an alternative date.' },
          { baslik:'Check with *Display before reversal*, then save',
            aciklama:'The reversal gets a new document number; it\'s written into the original\'s `STBLG` field.' },
        ],
        alanlar:{
          zorunlu:['Company code','Document number','Fiscal year','Reversal reason'],
          opsiyonel:['Posting date','Posting period'] },
        hatalar:[
          { mesaj:'Reversal not possible — document contains cleared items', sebep:'The document\'s items have been cleared (paid).', cozum:'First undo the clearing with {{FBRA}}, then reverse it.' },
          { mesaj:'Posting period ... is not open', sebep:'Reversal reason 01 was chosen but the original period is closed.', cozum:'Choose a reason that requires an alternative date and point it to an open period.' },
          { mesaj:'Document was already reversed with document ...', sebep:'The document has already been reversed.', cozum:'Check the `STBLG` field with {{FB03}}; no need to reverse it a second time.' },
          { mesaj:'Reversal of document from MM/SD not possible in FI', sebep:'The document originated from MM or SD.', cozum:'Cancel it from the source module: MR8M for a {{MIRO}} invoice, VF11 for an SD invoice. Reversing from FI leaves the source document inconsistent.' },
        ],
        ipucu:'Don\'t reverse documents coming from MM or SD **from within FI**. The `AWTYP` field shows the ' +
              'source; RMRP means MIRO, VBRK means an SD invoice, and the cancellation must be done from the ' +
              'source module. Otherwise the MM/SD side keeps showing as "invoiced."',
        ilgili:['F.80','FBRA','FB03','FB02'] },

      { kod:'FB02', ad:'Document change',
        amac:'Updates only the **changeable fields** on a posted document.',
        neZaman:'A due-date correction, placing/removing a {{odeme-blogu}}, adding text and assignment.',
        adimlar:[
          { baslik:'Enter the company code, document number, and fiscal year' },
          { baslik:'Double-click the item to be changed' },
          { baslik:'Update the open (changeable) fields',
            aciklama:'**The amount, account, debit/credit direction, and company code can\'t be changed** — a reversal is needed for those.' },
          { baslik:'Save — the change is written to {{CDHDR}}/{{CDPOS}}' },
        ],
        hatalar:[
          { mesaj:'Field ... cannot be changed', sebep:'The field isn\'t in the list of changeable fields.', cozum:'For an amount/account change, reverse with {{FB08}} and enter the correct one. Field rules are defined in IMG under "Document Change Rules."' },
          { mesaj:'Document is already cleared', sebep:'Some fields lock on a cleared item.', cozum:'If needed, undo the clearing with {{FBRA}}, make the change, and reclear.' },
        ],
        ipucu:'For a quick change on a single item, {{FB09}} is more practical — it opens directly to the item screen.',
        ilgili:['FB09','FB03','FB08'] },

      { kod:'OBA7', ad:'Document type definition',
        amac:'Defines {{belge-turu}}, the account types it allows, and its linked {{numara-araligi}}.',
        neZaman:'During setup, and for the question "why can\'t I post to this account with this type?"',
        adimlar:[
          { baslik:'Choose the document type, or create a new one' },
          { baslik:'Assign the number-range key',
            aciklama:'Multiple types can share the same range; this is a deliberate choice for number continuity.' },
          { baslik:'Flag the allowed account types',
            aciklama:'**S** general ledger, **D** customer, **K** vendor, **A** fixed asset, **M** material. ' +
                     'A type that isn\'t flagged can\'t be posted to — a structural control.' },
          { baslik:'Set the reversal document type',
            aciklama:'If left blank, the same type is used.' },
        ],
        ipucu:'Instead of changing the standard types (KR, DR, SA, AB…), copy them and create your own type ' +
              '**starting with Z**. This removes the risk of standard definitions being overwritten during upgrades.',
        hatalar:[
          { mesaj:'Account type K is not allowed for document type SA', sebep:'The document type doesn\'t allow the vendor account type.', cozum:'Use the correct type (KR), or flag the account type in {{OBA7}} — the latter weakens the control, think carefully.' },
        ],
        ilgili:['FBN1','OB41','FB50'] },

      { kod:'FBN1', ad:'FI document number range',
        amac:'Defines FI document number ranges by company code and fiscal year.',
        neZaman:'During setup, and **every year-end** to open the next year\'s ranges.',
        adimlar:[
          { baslik:'Enter the company code and press the *Intervals* button' },
          { baslik:'Add a line for the new fiscal year',
            aciklama:'Range key + year + lower limit + upper limit. Ranges **must not overlap**.' },
          { baslik:'Choose internal or external assignment',
            aciklama:'With internal assignment the system gives the number; with external, the user enters it and uniqueness is checked.' },
          { baslik:'Use {{OBH1}} for bulk copying',
            aciklama:'Copies all of the current year\'s ranges into the new year in one operation — a standard step of year-start preparation.' },
        ],
        hatalar:[
          { mesaj:'Document number ... was already assigned', sebep:'The counter ({{NRIV}} `NRLEVEL`) is below the highest existing document number — usually after a data migration.', cozum:'Use {{FBN1}} to move the range\'s current number above the highest existing document.' },
          { mesaj:'Number range ... does not exist for fiscal year ...', sebep:'The range hasn\'t been opened for the new year.', cozum:'Copy it from the previous year with {{OBH1}}. **This is the number-one reason postings stop at year-start.**' },
        ],
        ipucu:'The number-range **definition** can be transported via a transport request, but the **current ' +
              'counter value doesn\'t transport**. Not knowing this distinction causes number collisions at go-live.',
        ilgili:['OBH1','OBH2','OBA7','NRIV'] },

      { kod:'OB41', ad:'Posting key definition',
        amac:'Determines {{kayit-anahtari}}\'s debit/credit direction, the {{hesap-tipi}} it allows, and its {{alan-durumu}}.',
        neZaman:'During setup, and when tracking down the source of "why is this field mandatory/hidden?"',
        adimlar:[
          { baslik:'Choose the posting key',
            aciklama:'Standards: **40** G/L debit, **50** G/L credit, **31** vendor credit, **21** vendor debit, ' +
                     '**01** customer debit, **15** customer credit, **70** asset debit, **75** asset credit.' },
          { baslik:'Check the debit/credit indicator and the account type' },
          { baslik:'Set the field groups with the *Field status* button',
            aciklama:'Evaluated together with the account\'s field status group; **the more restrictive one wins**.' },
        ],
        ipucu:'Don\'t change the standard posting keys. They\'re used across the whole of SAP and in every ' +
              'automatic posting; changing them produces unexpected side effects.',
        ilgili:['OBA7','FS00','FB50'] },

      { kod:'OB52', ad:'Open / close posting period',
        amac:'Determines which periods are open for which {{hesap-tipi}}.',
        neZaman:'At every month-end close, and on a "posting period not open" error.',
        adimlar:[
          { baslik:'Choose the period variant',
            aciklama:'A company code is assigned to a period variant ({{OBY6}}); multiple companies can share the same variant.' },
          { baslik:'Set each account-type line separately',
            aciklama:'**+** every type, **S** general ledger, **D** customer, **K** vendor, **A** fixed asset, ' +
                     '**M** material. Each line is independent — opening S doesn\'t open D.' },
          { baslik:'Enter two period ranges',
            aciklama:'The **1st range** is for regular users, the **2nd range** is for users with the ' +
                     'authorization group (this is how the closing team\'s privileged access is granted).' },
        ],
        hatalar:[
          { mesaj:'Posting period 011 2026 is not open for account type K', sebep:'Only the S line has been opened.', cozum:'Open the period on the **K** line too. Account types are managed **separately** — the most common mistake.' },
        ],
        ipucu:'When closing the period at month-end, close **all account types**. If only S is closed, ' +
              'vendor and customer postings keep coming in and the closing figures change.',
        ilgili:['OBY6','FB50','T001B'] },

      { kod:'OB28', ad:'Define validation',
        amac:'Applies custom business rules during posting; produces an error or a warning if a rule isn\'t met.',
        neZaman:'For company-specific rules the standard checks don\'t cover.',
        adimlar:[
          { baslik:'Choose the application area and the call point',
            aciklama:'Call point: **1** document header, **2** line item, **3** complete document. ' +
                     'The right point is chosen depending on what the rule is meant to check.' },
          { baslik:'Define the prerequisite',
            aciklama:'Something like "if company code 1000 and account 770000" — when the rule should run.' },
          { baslik:'Define the check', aciklama:'Something like "cost center must be in the range 1000–1999."' },
          { baslik:'Set the message type: error (E) or warning (W)' },
        ],
        ipucu:'Validation **blocks**, {{OBBH}} substitution **corrects**. If a field can be filled in ' +
              'automatically instead of putting the workload on the user, substitution should be preferred.',
        ilgili:['OBBH','OBA5','FB50'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'Document posting\'s table structure is FI\'s core: **header + item + universal journal**, plus three ' +
      'tables carrying the configuration ({{T003}}, {{TBSL}}, {{NRIV}}).',

    liste:[
      { ad:'BKPF', baslik:'Document header',
        tutar:'The document\'s identity and origin: number, type, dates, currency, user, reference, source ' +
              'document key, reversal link.',
        olusturan:'Every posted transaction',
        guncelleyen:'Posting transactions; {{FB08}} fills the `STBLG` field',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'1-to-n with {{BSEG}}; a bridge to the MM/SD source document via `AWKEY`.',
        s4:'Structure preserved; reporting moved to {{ACDOCA}}.',
        alanlar:[
          { ad:'BLART', aciklama:'{{belge-turu}}' },
          { ad:'BUDAT', aciklama:'**Posting date — decides the period.** The most critical field.' },
          { ad:'BLDAT', aciklama:'Document date — the date printed on the invoice' },
          { ad:'MONAT', aciklama:'Posting period — derived from BUDAT' },
          { ad:'STBLG', aciklama:'**Reversal document** — if filled, this document has been reversed' },
          { ad:'AWTYP / AWKEY', aciklama:'Source document type and key — gives the integration trail' },
          { ad:'USNAM / CPUDT', aciklama:'The user who posted it and the entry date — the audit trail' },
        ] },

      { ad:'BSEG', baslik:'Document line items',
        tutar:'Line-level account, amount, debit/credit direction, posting key, and additional dimensions.',
        olusturan:'Simultaneously with {{BKPF}}',
        guncelleyen:'Posting transactions; {{FB02}} on the changeable fields; clearing the `AUGBL` field',
        anahtar:'BUKRS + BELNR + GJAHR + BUZEI',
        iliskiler:'The {{SKB1}} account, the {{LFA1}}/{{KNA1}} business partner, the {{ANLA}} asset link.',
        s4:'A cluster table (inside RFBLG); direct queries against it are slow. Reports read from {{ACDOCA}}.',
        alanlar:[
          { ad:'BUZEI', aciklama:'Item number — **3 digits, a maximum of 999 items**' },
          { ad:'BSCHL', aciklama:'{{kayit-anahtari}}' },
          { ad:'SHKZG', aciklama:'S = debit (Soll), H = credit (Haben)' },
          { ad:'HKONT', aciklama:'General ledger account' },
          { ad:'AUGBL', aciklama:'Clearing document — if blank, the item is open' },
        ] },

      { ad:'ACDOCA', baslik:'Universal Journal',
        tutar:'The same items in universal format; a separate set of lines for each active {{defter}}.',
        olusturan:'Every posted transaction',
        guncelleyen:'Every FI and CO transaction',
        anahtar:'RLDNR + RBUKRS + GJAHR + BELNR + DOCLN',
        iliskiler:'Via the document number with {{BKPF}}.',
        s4:'S/4HANA\'s single source of truth.',
        alanlar:[
          { ad:'DOCLN', aciklama:'**A 6-digit item number** — beyond {{BSEG}}\'s 999-item limit' },
          { ad:'RLDNR', aciklama:'{{defter}} — the same document with separate lines in each ledger' },
        ] },

      { ad:'T003', baslik:'Document type definition',
        tutar:'The document type\'s name, number-range key, allowed account types, reversal type.',
        olusturan:'{{OBA7}}',
        guncelleyen:'{{OBA7}}',
        anahtar:'BLART',
        iliskiler:'{{BKPF}}.BLART points here; the `NUMKR` field links to {{NRIV}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'NUMKR', aciklama:'Number-range key' },
          { ad:'XKOAA / XKOAD / XKOAK / XKOAM / XKOAS', aciklama:'Allowed account types: A asset, D customer, K vendor, M material, S general ledger' },
        ] },

      { ad:'TBSL', baslik:'Posting key definition',
        tutar:'Every {{kayit-anahtari}}\'s debit/credit direction and the account type it allows.',
        olusturan:'{{OB41}}',
        guncelleyen:'{{OB41}}',
        anahtar:'BSCHL',
        iliskiler:'{{BSEG}}.BSCHL points here.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'SHKZG', aciklama:'Debit/credit indicator' },
          { ad:'KOART', aciklama:'Account type' },
        ] },

      { ad:'NRIV', baslik:'Number range counters',
        tutar:'Every range\'s lower/upper limit and **current counter value**.',
        olusturan:'{{FBN1}}',
        guncelleyen:'Every posting increments the counter by one',
        anahtar:'OBJECT + SUBOBJECT + NRRANGENR + TOYEAR',
        iliskiler:'{{T003}}.NUMKR links here.',
        s4:'Unchanged. **If the counter isn\'t updated after a data migration, a number collision results.**',
        alanlar:[
          { ad:'NRLEVEL', aciklama:'**Current counter** — the next document is taken above this' },
          { ad:'FROMNUMBER / TONUMBER', aciklama:'Range limits' },
        ] },

      { ad:'T001B', baslik:'Posting period open/closed definition',
        tutar:'The period-open/close lines entered in {{OB52}}, by account type.',
        olusturan:'{{OB52}}',
        guncelleyen:'{{OB52}}',
        s4:'Unchanged.',
        alanlar:[
          { ad:'KOART', aciklama:'Account type (+, S, D, K, A, M)' },
          { ad:'FRPE1 / TOPE1', aciklama:'1st period range — regular users' },
          { ad:'FRPE2 / TOPE2', aciklama:'2nd period range — users with the authorization group' },
        ] },

      { ad:'CDHDR', baslik:'Change document header',
        tutar:'Who changed a document, and when.',
        olusturan:'{{FB02}}, {{FB09}}, and master-data changes',
        guncelleyen:'Every change transaction',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        iliskiler:'{{CDPOS}} for field-level detail.',
        s4:'Unchanged.' },
    ],

    er:{
      type:'er',
      baslik:'Document posting\'s table structure and configuration links',
      varliklar:[
        { ad:'T003', rol:'Configuration', aciklama:'Document type definition',
          alanlar:[{ ad:'BLART', tip:'pk' }, { ad:'NUMKR' }, { ad:'XKOAK' }] },
        { ad:'NRIV', rol:'Configuration', aciklama:'Number-range counter',
          alanlar:[{ ad:'NRRANGENR', tip:'pk' }, { ad:'TOYEAR', tip:'pk' }, { ad:'NRLEVEL' }] },
        { ad:'T001B', rol:'Configuration', aciklama:'Period control',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'KOART', tip:'pk' }, { ad:'FRPE1' }] },
        { ad:'BKPF', rol:'Header', hub:true, aciklama:'Document identity',
          alanlar:[{ ad:'BUKRS', tip:'pk' }, { ad:'BELNR', tip:'pk' }, { ad:'GJAHR', tip:'pk' }, { ad:'BLART', tip:'fk' }, { ad:'BUDAT' }, { ad:'STBLG' }] },
        { ad:'BSEG', rol:'Line item', aciklama:'Document lines',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'BUZEI', tip:'pk' }, { ad:'BSCHL', tip:'fk' }, { ad:'HKONT', tip:'fk' }] },
        { ad:'TBSL', rol:'Configuration', aciklama:'Posting key',
          alanlar:[{ ad:'BSCHL', tip:'pk' }, { ad:'SHKZG' }, { ad:'KOART' }] },
        { ad:'ACDOCA', rol:'Universal', aciklama:'S/4HANA items',
          alanlar:[{ ad:'RLDNR', tip:'pk' }, { ad:'BELNR', tip:'fk' }, { ad:'DOCLN', tip:'pk' }] },
        { ad:'CDPOS', rol:'Audit', aciklama:'Field-level change',
          alanlar:[{ ad:'OBJECTID', tip:'fk' }, { ad:'FNAME' }, { ad:'VALUE_NEW' }] },
      ],
      iliskiler:[
        { from:'T003', to:'BKPF', alanlar:'BLART', not:'document type' },
        { from:'T003', to:'NRIV', alanlar:'NUMKR → NRRANGENR', not:'number range' },
        { from:'T001B', to:'BKPF', alanlar:'BUKRS + period', not:'period control' },
        { from:'BKPF', to:'BSEG', alanlar:'BUKRS + BELNR + GJAHR', not:'header → item' },
        { from:'TBSL', to:'BSEG', alanlar:'BSCHL', not:'posting key' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR + GJAHR', not:'universal view' },
        { from:'BKPF', to:'CDPOS', alanlar:'BELNR → OBJECTID', not:'change trail' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Document posting screens are made of two blocks: **header** and **line item table**. Once you grasp ' +
      'the field logic once, {{FB50}}, {{FB60}}, {{FB70}}, and the others feel familiar — they\'re all the ' +
      'same skeleton.',

    ekranlar:[
      { ad:'Header block — where the dates are critical',
        aciklama:'The top part of the screen. The two dates here are the most error-prone fields.',
        alanlar:[
          { ad:'Document date (`BLDAT`)', zorunlu:true, aciklama:'The date printed on the invoice/memo. A reference in reporting, but it **doesn\'t decide the period**.' },
          { ad:'Posting date (`BUDAT`)', zorunlu:true, aciklama:'**The date that decides the accounting period.** Defaults to today; changed by hand for posting to a past period.' },
          { ad:'Company code (`BUKRS`)', zorunlu:true, aciklama:'Which legal entity is being posted to.' },
          { ad:'{{belge-turu}} (`BLART`)', zorunlu:false, aciklama:'Defaults based on the transaction code; usually left unchanged.' },
          { ad:'Reference (`XBLNR`)', zorunlu:false, aciklama:'The external document number. Triggers a duplicate-invoice check in AP.' },
          { ad:'Document header text (`BKTXT`)', zorunlu:false, aciklama:'Free text describing the whole document.' },
          { ad:'Currency / Exchange rate', zorunlu:true, aciklama:'If not local currency, the exchange-rate field opens; if left blank it\'s pulled from {{TCURR}}.' },
        ],
        ipucu:'When you change the posting date, check that **the period indicator also changed**. Missing ' +
              'this while entering a December invoice in January is the classic mistake that breaks the ' +
              'financial statements.' },

      { ad:'Line item table',
        aciklama:'Every line turns into a {{BSEG}} item.',
        alanlar:[
          { ad:'G/L account (`HKONT`)', zorunlu:true, aciklama:'An error results if a {{mutabakat-hesabi}} is entered.' },
          { ad:'D/C (debit-credit)', zorunlu:true, aciklama:'Turns into a {{kayit-anahtari}} in the background: debit 40, credit 50.' },
          { ad:'Amount', zorunlu:true, aciklama:'In document currency.' },
          { ad:'Tax code (`MWSKZ`)', zorunlu:false, aciklama:'Requested if the account\'s tax category makes it mandatory; when entered, the tax line is added automatically.' },
          { ad:'{{maliyet-yeri}} (`KOSTL`)', zorunlu:false, aciklama:'{{alan-durumu}} usually makes this mandatory on expense accounts.' },
          { ad:'Assignment (`ZUONR`)', zorunlu:false, aciklama:'Fills automatically from the sort key; critical for {{F.13}} clearing.' },
          { ad:'Text (`SGTXT`)', zorunlu:false, aciklama:'The line description. Very useful in reports; not leaving it blank is a good habit.' },
        ] },

      { ad:'Simulation screen',
        aciklama:'Opened via *Document → Simulate*. The last checkpoint before saving.',
        alanlar:[
          { ad:'Full line list', zorunlu:false, aciklama:'The lines you entered + the ones the system adds: tax, {{belge-bolme}}, exchange difference.' },
          { ad:'Balance indicator', zorunlu:false, aciklama:'Must be zero; if it isn\'t, the posting can\'t be made.' },
        ],
        ipucu:'On systems with {{belge-bolme}} active, you see the 2-line entry turn into 6 lines **only ' +
              'here**. Always simulate before saving.' },

      { ad:'{{FB08}} — the reversal screen',
        aciklama:'Where the correction is made. Choosing the reversal reason is critical.',
        alanlar:[
          { ad:'Document number / Company code / Fiscal year', zorunlu:true, aciklama:'The document to be reversed.' },
          { ad:'**Reversal reason**', zorunlu:true, aciklama:'**01** to the original date (same period), **02** to an alternative date (different period). If the original period is closed, 01 doesn\'t work.' },
          { ad:'Posting date / period', zorunlu:false, aciklama:'Only opens up for reasons that require an alternative date.' },
        ] },
    ],

    zorunlu:['Document date','Posting date','Company code','G/L account','Debit/Credit','Amount'],
    opsiyonel:['Document type','Reference','Header text','Tax code','Cost center','Profit center','Assignment','Line text','Due date'],

    hatalar:[
      { mesaj:'Posting period 011 2026 is not open for account type K', sebep:'In {{OB52}}, the period is closed for the vendor account type; usually only S has been opened.', cozum:'Open the period on the **K** line too in the period variant. Account types are managed **separately**.' },
      { mesaj:'Account ... cannot be directly posted to', sebep:'The account is a {{mutabakat-hesabi}} ({{SKB1}} `MITKZ` is filled).', cozum:'Post through the vendor/customer: {{FB60}} or {{FB70}}.' },
      { mesaj:'Field Cost Center is a required field for G/L account ...', sebep:'{{alan-durumu}} makes it mandatory.', cozum:'Enter the cost center; for a permanent fix, define a default CO object with {{OKB9}}.' },
      { mesaj:'Balance in transaction currency', sebep:'{{belge-denkligi}} isn\'t satisfied.', cozum:'Check the lines; if you want to save the document, park it with {{FV50}}.' },
      { mesaj:'Document number ... was already assigned', sebep:'The {{NRIV}} counter is below the highest existing document — usually after a data migration.', cozum:'Update the counter with {{FBN1}}.' },
      { mesaj:'Number range ... does not exist for fiscal year 2027', sebep:'The range hasn\'t been opened for the new year.', cozum:'Copy it from the previous year with {{OBH1}}. **The first item of the year-start routine.**' },
      { mesaj:'Account type D is not allowed for document type SA', sebep:'{{belge-turu}} doesn\'t allow the customer account type.', cozum:'Use the correct type (DR), or flag the account type in {{OBA7}}.' },
      { mesaj:'Tax code A1 does not exist in company code 1000', sebep:'{{vergi-kodu}} isn\'t defined for that country.', cozum:'Define it in the correct country key with {{FTXP}}, or use the correct code.' },
      { mesaj:'Ledger 0L: document splitting error — item not assigned', sebep:'{{belge-bolme}} rules couldn\'t classify the line.', cozum:'Check the document-splitting characteristics and item category assignments in IMG.' },
      { mesaj:'Reversal not possible — document contains cleared items', sebep:'The items have been cleared.', cozum:'First undo the clearing with {{FBRA}}, then use {{FB08}}.' },
    ],

    ipuclari:[
      '**Always simulate before saving.** Seeing the lines the system will add prevents most of the hassle of a reversal.',
      'For the technical name of a field, use **F1 → Technical information**. Don\'t write an {{SE16N}} query before learning the table and field name.',
      'For routine postings, set up an **account assignment model** or a recurring entry ({{FBD1}} + {{F.14}}).',
      'Year-start routine: copy all number ranges into the new year with {{OBH1}}. No posting can be made without a range.',
      'When closing the period at month-end, close **all account types**; closing only S isn\'t enough.',
      'Don\'t reverse documents coming from MM/SD from within FI. {{FB03}} → document header → check the ' +
      '`AWTYP` field; it must be canceled from the source module.',
      'For a wrong posting, think in this order: **is it cleared?** ({{FBRA}} is needed) → **is the source ' +
      'MM/SD?** (cancel from there) → otherwise {{FB08}}.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF', ne:'1 header line — number, type, dates, user, source reference' },
      { tablo:'BSEG', ne:'1 item per entered line + the tax/splitting lines the system added' },
      { tablo:'ACDOCA', ne:'The same items in universal format; a separate set of lines for each active ledger' },
      { tablo:'BSET', ne:'Tax lines if there\'s a tax code (base amount, tax amount, account key)' },
      { tablo:'BSIS / BSIK / BSID', ne:'An index record on open-item-managed accounts' },
      { tablo:'NRIV', ne:'The number counter (`NRLEVEL`) is incremented by one' },
      { tablo:'CDHDR / CDPOS', ne:'An audit trail if a change was made with {{FB02}}' },
    ],

    commit:
      'When the Save button is pressed, all the writes are gathered into a single **LUW** (Logical Unit of ' +
      'Work) and written atomically with `COMMIT WORK`: either all of it, or none of it.\n\n' +
      '**But number assignment runs separately.** The number-range counter ({{NRIV}}) is incremented in a ' +
      'transaction independent of the main LUW. The result: **even a canceled posting attempt can consume a ' +
      'document number**, leaving gaps in the numbers. This is normal, not an error — and it\'s explained ' +
      'that way to an auditor too.\n\n' +
      'If the asynchronous update stalls, a "document number was assigned but there\'s no posting" situation ' +
      'arises; it\'s checked with {{SM13}}.',

    belgeNo:
      'The chain: **{{belge-turu}} → {{T003}}.NUMKR (the number-range key) → the company code + fiscal year ' +
      'line in {{NRIV}} → `NRLEVEL` is incremented by one → the document number.**\n\n' +
      'The number is assigned **at the moment of saving**, not when the screen is opened. With internal ' +
      'assignment the system gives it; with external assignment the user enters it and uniqueness is checked.\n\n' +
      'In FI the range is keyed by **company code + fiscal year**. A separate line is needed for each year.',

    postingLogic:
      'The seven-link chain a posting follows:\n\n' +
      '**1. Period check** — the period is calculated from `BUDAT`, checked in {{T001B}} by account type.\n' +
      '**2. Document type** — the allowed account types are checked in {{T003}}.\n' +
      '**3. Posting key** — the debit/credit choice turns into a key via {{TBSL}}.\n' +
      '**4. Field status** — the account\'s group ({{SKB1}} `FSTAG`) + the posting key\'s field status; ' +
      '**the more restrictive one wins**.\n' +
      '**5. Validation / substitution** — {{OB28}} rules check, {{OBBH}} fills fields.\n' +
      '**6. Balance check** — {{belge-denkligi}}; if {{belge-bolme}} is on, separately for each ledger and dimension.\n' +
      '**7. Number and write** — a number from {{NRIV}}, then the tables.',

    belgeTuru:
      '{{belge-turu}} decides three things: the allowed set of {{hesap-tipi}}, the {{numara-araligi}} to be ' +
      'used, and the default type for a reversal.\n\n' +
      'Standard types: **SA** general G/L, **AB** general (allows every account type), **KR** vendor ' +
      'invoice, **KG** vendor credit memo, **KZ** vendor payment, **DR** customer invoice, **DG** customer ' +
      'credit memo, **DZ** customer receipt, **RE** logistics invoice, **RV** SD invoice, **WE** goods ' +
      'receipt, **AA** asset posting, **AF** depreciation.',

    numberRange:
      'FI\'s number range is keyed by **company code + fiscal year** and is defined with {{FBN1}}. If a line ' +
      'isn\'t opened for the new fiscal year, posting stops at year-start; it\'s bulk-copied with {{OBH1}}.\n\n' +
      '**A critical distinction:** the range\'s *definition* can transport with a transport request, but the ' +
      '**current counter value doesn\'t transport**. If the counter isn\'t updated after a data migration, ' +
      'a "Document number already assigned" error results.',

    accountDetermination:
      'In a manual posting the user enters the account directly. The system determines the account only for ' +
      '**lines it adds itself**: the tax line from {{OB40}}, exchange-difference and rounding accounts from ' +
      'the automatic-posting settings in IMG, lines coming from MM/SD from {{OBYC}}/{{VKOA}}. All of them ' +
      'write to table {{T030}}.',

    tur:
      '**Configuration:** {{belge-turu}} definitions ({{OBA7}}), {{numara-araligi}} definition ({{FBN1}}), ' +
      '{{kayit-anahtari}} ({{OB41}}), {{alan-durumu}} groups and variant, period control ({{OB52}}), ' +
      'validation/substitution ({{OB28}}/{{OBBH}}), document change rules.\n\n' +
      '**Transaction data:** the documents themselves.\n\n' +
      'There\'s no master data in this topic — document posting is entirely a matter of configuration + transaction data.',

    transport:
      'Document types, posting keys, field status groups, and validation and substitution rules transport. ' +
      'Documents don\'t transport.\n\n' +
      '**Exception:** the {{numara-araligi}} definition can transport, but the **counter value doesn\'t** — ' +
      'it must be checked separately in each system.',

    img:[
      { yol:'SPRO → Financial Accounting → Financial Accounting Global Settings → Document → Document Types → Define Document Types for Entry View', not:'{{belge-turu}} ({{OBA7}})' },
      { yol:'SPRO → … → Document → Document Number Ranges → Define Document Number Ranges', not:'{{numara-araligi}} ({{FBN1}})' },
      { yol:'SPRO → … → Document → Line Item → Controls → Define Posting Keys', not:'{{kayit-anahtari}} ({{OB41}})' },
      { yol:'SPRO → … → Document → Posting Periods → Open and Close Posting Periods', not:'Period control ({{OB52}})' },
      { yol:'SPRO → … → Document → Define Field Status Variants', not:'{{alan-durumu}} variant' },
      { yol:'SPRO → … → Document → Document Change Rules → Document Change Rules', not:'Which fields {{FB02}} can change' },
      { yol:'SPRO → Financial Accounting → Special Purpose Ledger → Tools → Validation/Substitution', not:'{{OB28}} / {{OBBH}}' },
    ],

    ekstra:[
      { ic:'⚖️', baslik:'Field status conflict — the more restrictive one wins', metin:
        '{{alan-durumu}} comes from **two sources**, and the two are evaluated together:\n\n' +
        '**1. The account\'s field status group** ({{SKB1}} `FSTAG`) — "which fields are needed when posting to this account?"\n' +
        '**2. The posting key\'s field status** ({{OB41}}) — "which fields are needed for this kind of line?"\n\n' +
        'The conflict rule: **the more restrictive one wins.** The order (from restrictive to loose): ' +
        '**Hidden > Required > Optional**.\n\n' +
        'So if one says "hidden" while the other says "required," the field stays **invisible**. That\'s the ' +
        'answer to "why can\'t I see this field, when it should have been mandatory?"\n\n' +
        'There\'s a third layer too: the company code\'s **field status variant** ({{OBY6}}) determines which ' +
        'groups can be used in that company code.' },

      { ic:'🔢', baslik:'Why do number gaps occur, and are they a problem?', metin:
        'A document number is assigned in a transaction **independent** of the main LUW. If the user cancels ' +
        'the transaction after getting the number, the number isn\'t returned and a **gap** results.\n\n' +
        'This is normal in SAP. If an auditor asks "why is 235 missing between 1900000234 and 1900000236?" ' +
        'the answer is: a canceled entry attempt.\n\n' +
        'If the regulation doesn\'t tolerate gaps, the solution is **external number assignment** or a ' +
        'separate legal numbering layer — but this brings a performance and locking cost.' },
    ],

    notlar:[
      { tip:'warn', baslik:'Don\'t reverse an MM/SD document from FI', metin:
        '{{FB08}} can technically reverse documents originating from MM/SD too, but this is **wrong**: ' +
        'the FI side gets corrected while the MM/SD side keeps showing as "invoiced," and the two modules ' +
        'become inconsistent.\n\n' +
        'The correct way is a cancellation from the source module: **MR8M** for a {{MIRO}} invoice, **VF11** ' +
        'for an SD invoice. {{FB03}} → document header → the `AWTYP` field tells you the source.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The **logic** of document posting didn\'t change — the seven-check chain, document type, posting ' +
      'key, and field status are the same. What changed is **where the document gets written** and the ' +
      'removal of the item-count limit.',

    eccFarklari:[
      { konu:'Item count limit', ecc:'{{BSEG}} `BUZEI` 3 digits → **a maximum of 999 items**', s4:'{{ACDOCA}} `DOCLN` 6 digits → practically unlimited' },
      { konu:'Tables written', ecc:'{{BKPF}} + {{BSEG}} + indexes + totals', s4:'{{BKPF}} + {{BSEG}} + **{{ACDOCA}}**; index/totals as views' },
      { konu:'Number of currencies', ecc:'2 (local + one more)', s4:'Up to **10** parallel currencies' },
      { konu:'Ledger-based posting', ecc:'Limited to New G/L', s4:'A separate set of lines for every active {{defter}} on every document' },
      { konu:'Entry screens', ecc:'{{FB50}}, {{FB60}}, {{F-02}}', s4:'**The same** + Fiori apps' },
      { konu:'Lock contention', ecc:'A totals table row gets locked', s4:'No totals table — simultaneous posting gets faster' },
    ],

    universalJournal:
      'Every document now also gets written to {{ACDOCA}}, and account, cost center, profit center, and ' +
      'asset number sit **on the same line**. This has two concrete consequences for document posting:\n\n' +
      '**1. The item limit is gone.** In ECC, documents exceeding 999 items had to be split; bulk invoices ' +
      'and depreciation runs used to cause problems for this reason. Not needed anymore.\n\n' +
      '**2. CO is updated at the moment of posting too.** A separate CO document and reconciliation aren\'t ' +
      'needed; the FI line and the CO line are the same record.',

    kalkanTcodes:[
      { eski:'—', yeni:'—', not:'None of the document posting transaction codes were removed; {{FB50}}, {{FB60}}, {{F-02}}, {{FB08}} all work the same way' },
      { eski:'Totals-table rebuild programs', yeni:'—', not:'Became unnecessary because there\'s no totals table' },
    ],

    fiori:[
      { ad:'Post General Journal Entries', aciklama:'Replaces {{FB50}}; supports **bulk upload via an Excel template**.' },
      { ad:'Display Journal Entries', aciklama:'Replaces {{FB03}}; the document and all related objects on a single screen.' },
      { ad:'Manage Journal Entries', aciklama:'Manages parked and incomplete documents as a worklist.' },
      { ad:'Reverse Journal Entries', aciklama:'Replaces {{FB08}}; supports mass reversal.' },
      { ad:'Upload General Journal Entries', aciklama:'Bulk document upload from an Excel/CSV file — reduces the need for {{LSMW}}.' },
      { ad:'Verify General Journal Entries', aciklama:'An approval workflow — for the four-eyes principle.' },
    ],

    compatibilityViews:[
      '{{BSIS}}, {{BSAS}}, {{BSIK}}, {{BSAK}}, {{BSID}}, {{BSAD}} — the index tables turned into {{uyumluluk-view}}s.',
      '{{GLT0}}, {{FAGLFLEXT}} — the totals tables turned into views too.',
      '{{BKPF}}, {{BSEG}}, {{T003}}, {{TBSL}}, {{NRIV}} — **still stand as physical tables**, unchanged.',
      'The important consequence for document posting: the configuration tables that affect posting logic ' +
      'were preserved; only the read-only derived tables turned into views.',
    ],

    performans:
      'Because the totals table was removed, **lock contention decreased**: previously, a simultaneous ' +
      'posting to the same account would lock the totals-table row and make users wait. There\'s no such ' +
      'row anymore.\n\n' +
      'On the other hand, since every document produces lines for multiple ledgers, **document volume ' +
      'grows**; the archiving strategy should be planned accordingly.',

    bestPractices:[
      'Instead of changing standard document types, create your own types **starting with Z** — standard ' +
      'definitions are preserved across upgrades.',
      'Prefer substitution ({{OBBH}}) over validation ({{OB28}}) wherever possible: fill a field ' +
      'automatically instead of blocking the user.',
      'Consider the Fiori "Upload General Journal Entries" app for bulk document upload; there may be no ' +
      'need for {{LSMW}} screen recording.',
      'Tie the year-start routine to a checklist: {{OBH1}} number ranges + {{OB52}} period opening.',
      'Since the item limit is gone, review during migration any custom programs written in ECC to split documents.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'A December invoice entered in January: anatomy of a date mistake',
    hikaye:
      'It\'s January 3, 2027 at **Marmara Tekstil Inc.** The accounting specialist is entering a 50,000 TRY ' +
      'rent invoice dated 31 December 2026. The posting goes through cleanly — no error, no warning.\n\n' +
      'Three weeks later the financial advisor asks: "why is December\'s rent expense 50,000 TRY short?"\n\n' +
      'This scenario shows, step by step, how a single field in document posting mechanics broke the ' +
      'financial statements, and how it got corrected.',
    veriler:[
      { k:'Company code', v:'1000 · Period variant 1000' },
      { k:'Invoice', v:'Rent · 50,000 TRY + 20% VAT = 60,000 TRY' },
      { k:'Vendor', v:'V-2001 · reconciliation account 320000' },
      { k:'Document date', v:'31.12.2026 (the date printed on the invoice)' },
      { k:'Actual entry date', v:'03.01.2027' },
    ],

    adimlar:[
      { baslik:'The invoice is entered — the posting date is missed', tcode:'FB60',
        aciklama:'The specialist enters the document date correctly, but **leaves the posting date at its ' +
                 'default**. The system uses today\'s date: 03.01.2027.',
        girdi:[
          { alan:'Vendor', deger:'V-2001' },
          { alan:'Document date (`BLDAT`)', deger:'31.12.2026 ✓ correct' },
          { alan:'**Posting date (`BUDAT`)**', deger:'03.01.2027 **left at the default**' },
          { alan:'Period indicator', deger:'01 / 2027 — visible on screen but not noticed' },
          { alan:'Amount / Tax', deger:'60,000 TRY gross / 20%' },
        ],
        fis:{ baslik:'Document 1900000341 — Rent invoice', belgeTuru:'KR', tarih:'03.01.2027',
          satirlar:[
            { hesap:'770', ad:'General administrative expense — rent', borc:50000, not:'**Fell into January 2027**' },
            { hesap:'191', ad:'Deductible VAT', borc:10000 },
            { hesap:'320', ad:'Trade payables — V-2001', alacak:60000 },
          ], not:'The posting is technically **flawless**: balanced, correct accounts, correct tax. The only ' +
                 'problem is **which period it fell into**.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'`BLDAT` = 31.12.2026, **`BUDAT` = 03.01.2027**, `MONAT` = 01, `GJAHR` = 2027' },
          { tablo:'BSEG', ne:'3 items — all in fiscal year 2027' },
          { tablo:'ACDOCA', ne:'Items in the 2027 period' },
        ],
        not:'Why didn\'t the system warn? Because **there was nothing for it to do**: the posting date was ' +
             'valid, the period was open, the document was balanced. The document date and the posting date ' +
             'being different is **normal**, and the system can\'t know which one is correct.' },

      { baslik:'The problem is noticed', tcode:'FBL3N',
        aciklama:'The financial advisor checks the December rent expense. There\'s no expected posting on ' +
                 'account 770 in December; there are two rent postings in January.',
        girdi:[
          { alan:'Account / Period', deger:'770000 · 01.12.2026–31.12.2026' },
          { alan:'Finding', deger:'December rent expense: **50,000 TRY short**' },
          { alan:'January check', deger:'There are 2 rent postings in January: December\'s + January\'s' },
          { alan:'Diagnosis', deger:'{{FB03}} → document header → `BLDAT` 31.12 but `BUDAT` 03.01' },
        ],
        not:'The diagnosis in {{FB03}} → *Document header* screen takes seconds. Seeing the two dates side ' +
             'by side reveals the problem instantly.' },

      { baslik:'Correction attempt — FB02 doesn\'t work', tcode:'FB02',
        aciklama:'The specialist tries to correct the posting date. **Not possible.**',
        girdi:[
          { alan:'Attempt', deger:'{{FB02}} → change the posting-date field' },
          { alan:'Result', deger:'**The field can\'t be changed** — greyed out, doesn\'t accept input' },
          { alan:'Reason', deger:'The posting date decides the period; changing it would retroactively corrupt the balances' },
        ],
        not:'{{FB02}} only updates **changeable fields**: due date, payment block, text, assignment. The ' +
             'amount, account, and **posting date** can\'t be changed. The only route for these is a reversal.' },

      { baslik:'The reversal is posted — the reversal reason is critical', tcode:'FB08',
        aciklama:'The document is being reversed. Choosing the **reversal reason** is decisive here.',
        girdi:[
          { alan:'Document', deger:'1900000341 · Company code 1000 · Fiscal year 2027' },
          { alan:'Attempt 1 — reason 01', deger:'"To the original document date" → falls on **03.01.2027**' },
          { alan:'Consideration', deger:'If the reversal also falls in January, the net effect in January is zero — **correct**' },
          { alan:'Choice', deger:'**Reason 01** was used; the reversal is dated 03.01.2027' },
        ],
        fis:{ baslik:'Document 1900000389 — Reversal', belgeTuru:'KR', tarih:'03.01.2027',
          satirlar:[
            { hesap:'770', ad:'General administrative expense — rent', alacak:50000, not:'Direction flipped' },
            { hesap:'191', ad:'Deductible VAT', alacak:10000 },
            { hesap:'320', ad:'Trade payables — V-2001', borc:60000 },
          ], not:'The wrong January posting was neutralized. The original document **wasn\'t deleted**; it ' +
                 'was flagged in {{BKPF}} with `STBLG` = 1900000389, and the two were linked to each other.' },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'The original document\'s `STBLG` field is filled — shows as reversed' },
          { tablo:'BSIK', ne:'The vendor open item was cleared automatically (the two postings offset each other)' },
        ] },

      { baslik:'The December period is temporarily opened', tcode:'OB52',
        aciklama:'The correct posting needs to go into December, but the period is closed. The accounting manager opens it temporarily.',
        girdi:[
          { alan:'Period variant', deger:'1000' },
          { alan:'Account type **K** line', deger:'2nd range: period 12/2026–12/2026, authorization group FI01' },
          { alan:'Account type **S** line', deger:'Opened the same way' },
          { alan:'Why the 2nd range?', deger:'So only the closing team, who have the authorization group, can post' },
        ],
        not:'**Both account types must be opened:** K for the vendor item, S for the expense and VAT lines. ' +
             'If only S is opened, the "Posting period not open for account type K" error results — the most ' +
             'common period mistake.' },

      { baslik:'The correct posting is entered into December', tcode:'FB60',
        aciklama:'The invoice is entered again, this time with **the posting date set by hand to 31.12.2026**.',
        girdi:[
          { alan:'Document date', deger:'31.12.2026' },
          { alan:'**Posting date**', deger:'**31.12.2026** — corrected by hand' },
          { alan:'Period indicator', deger:'12 / 2026 ✓ checked' },
          { alan:'Reference', deger:'KIRA-2026-12 (vendor invoice number)' },
        ],
        fis:{ baslik:'Document 1900000342 — Rent invoice (correct period)', belgeTuru:'KR', tarih:'31.12.2026',
          satirlar:[
            { hesap:'770', ad:'General administrative expense — rent', borc:50000, not:'**Fell into December 2026** ✓' },
            { hesap:'191', ad:'Deductible VAT', borc:10000 },
            { hesap:'320', ad:'Trade payables — V-2001', alacak:60000 },
          ] },
        tabloEtkisi:[
          { tablo:'BKPF', ne:'`BUDAT` = 31.12.2026, `MONAT` = 12, `GJAHR` = **2026**' },
          { tablo:'NRIV', ne:'The number was taken from the 2026 range — not the 2027 range' },
        ],
        not:'The document number came from **2026\'s** fiscal-year range. Since FI\'s number range is ' +
             'keyed by company code + fiscal year, this happened automatically.' },

      { baslik:'The period is closed again and checked', tcode:'OB52',
        aciklama:'The correction is complete; December is closed again and the result is verified.',
        girdi:[
          { alan:'{{OB52}}', deger:'The 2nd range was removed — December 2026 closed again' },
          { alan:'Check 1 — {{FBL3N}}', deger:'Account 770 in December: the rent expense **is there** ✓' },
          { alan:'Check 2 — January', deger:'Net effect is zero (wrong posting + reversal) ✓' },
          { alan:'Check 3 — {{FBL1N}}', deger:'V-2001 has one open item: 1900000342 ✓' },
        ] },
    ],

    sonuc:
      '**Result:** three documents were created (the wrong posting, the reversal, the correct posting), the ' +
      'December expense landed where it should, and January\'s net effect was zeroed out. The audit trail ' +
      'was fully preserved — all three documents show up in the records.\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The posting date (`BUDAT`) decides the period, the document date (`BLDAT`) doesn\'t.** This is ' +
      'the most common and most expensive mistake in FI, because the system **gives no warning** — the ' +
      'posting is technically flawless.\n\n' +
      '**2. The posting date can\'t be changed afterward.** {{FB02}} only updates fields like due date, ' +
      'payment block, and text. The only route for date, amount, and account is a {{ters-kayit}}.\n\n' +
      '**3. Open all the relevant account types when opening a period.** A vendor invoice needs both **K** ' +
      '(vendor) and **S** (general ledger). Opening only S is the most common period mistake.\n\n' +
      '**4. A posting is never deleted in accounting.** The wrong document stands, the reversal stands, the ' +
      'correct one stands. An auditor can see all three. This isn\'t a shortcoming, it\'s **accounting\'s ' +
      'fundamental principle**: the trail is preserved, and the correction is made visibly.',
  },

  },
});
