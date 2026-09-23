/* ==========================================================================
   content/fi-en/badi.js: English body for "BAdI (Genişletme Noktası)"
   (BAdI: Enhancement Point)
   Same conventions as content/fi-en/dogrulama-ikame.js: see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'badi',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'A BAdI (Business Add-In) is a **hook SAP leaves in advance inside the standard flow**. ' +
      'Instead of changing standard code, you **implement** an **interface** SAP has ' +
      'already defined, inside your own class.\n\n' +
      'The two sides are cleanly separated:\n\n' +
      '**Definition**: SAP\'s job. SAP decides where the hook sits, which methods it ' +
      'carries, whether it allows multiple active implementations, and whether it supports ' +
      'a filter. {{SE18}} is the screen for this definition.\n\n' +
      '**Implementation**: the customer\'s job. The code that fills in the defined ' +
      'interface inside your own class. {{SE19}} is where the implementation gets assigned; ' +
      'the actual code sits in {{SE24}}.\n\n' +
      'Not a single line of standard code gets touched: this is the core idea BAdI shares ' +
      'with the rule engine in {{konu:dogrulama-ikame}}: both kick in at a point SAP has ' +
      'left open. The difference is what you can write at that point. Validation and ' +
      'substitution are locked into a predefined shape (a prerequisite plus a check, or a ' +
      'prerequisite plus a field assignment), while a BAdI\'s only limit is **ABAP itself** ' +
      ': it can read any table, call an external system, or change any field.',

    neden:
      '**Neither standard configuration nor the rule engine is always enough.** {{SPRO}} can ' +
      'make a field mandatory; {{GGB0}}/{{GGB4}} can fill in a field or block a posting at ' +
      'the moment it\'s made: but both are locked into a **fixed shape**: a prerequisite ' +
      'plus a single outcome. Calling out to an external system, combining several tables ' +
      'with complex logic, or building a conditional branch doesn\'t fit that shape.\n\n' +
      '**A BAdI gives you the full power of ABAP at a point SAP has sanctioned.** Because ' +
      'standard code still isn\'t touched, an upgrade is just as safe as with standard ' +
      'configuration: but the rule engine\'s limits are gone too.\n\n' +
      '**This is why the four-rung ladder exists** (see sirketOnemi): each rung starts ' +
      'where the previous one falls short, and each rung costs more than the last.',

    sirketOnemi:
      'A consultant faces a **four-rung ladder**, and stepping down a rung is always a cost ' +
      'increase:\n\n' +
      '**① Standard configuration** ({{SPRO}}): no code at all, upgrade risk close to zero.\n\n' +
      '**② Validation / substitution** (see {{konu:dogrulama-ikame}}): still configuration, ' +
      'but now a rule engine; it runs at the moment of posting and usually needs no ABAP.\n\n' +
      '**③ BAdI / enhancement**: now there\'s real code, but at a point SAP has ' +
      '**sanctioned**; because the standard object isn\'t touched, it **doesn\'t appear** ' +
      'on the upgrade adjustment list ({{SPAU}}).\n\n' +
      '**④ Modification**: the standard SAP code is changed directly; it has to be ' +
      'manually reconciled at every upgrade ({{SPAU}}/{{SPDD}}): the most expensive and ' +
      'most fragile option, a **last resort**.\n\n' +
      'A consultant\'s job is to solve the need **as high up the ladder as possible**. ' +
      'Before stepping down to ③, ask: *"can this genuinely not be solved with standard ' +
      'configuration or a rule engine?"* Before stepping down to ④, the question is ' +
      'harsher: *"can this genuinely not be written as a BAdI?"*: because ④\'s cost isn\'t ' +
      'one-time, it\'s a cost that **repeats at every upgrade** ({{z-gelistirme}}, ' +
      '{{standarda-yakin}}).',

    gercekHayat:
      'While posting a vendor invoice, the profit center needs to be derived **based on the ' +
      'cost element and the amount**: expenses under 50,000 TRY should always go to the ' +
      'relevant department\'s profit center, while expenses over 50,000 TRY should ' +
      'automatically go to the central-management profit center.\n\n' +
      '**{{GGB1}} is tried first:** the prerequisite + target field + value source shape ' +
      'doesn\'t allow for a *threshold*: substitution assigns a fixed value or copies from ' +
      'another field, it can\'t build a *"pick one of two values based on the amount"* ' +
      'branch.\n\n' +
      '**A BAdI solves it:** an implementation of the relevant definition (e.g. ' +
      '`AC_DOCUMENT`: the accounting-document change point) is written; inside the ' +
      'implementation\'s code, an amount check picks one of the two profit centers. The ' +
      'same requirement had to drop down to ABAP because it didn\'t fit the rule engine\'s ' +
      'shape: but standard code wasn\'t touched, only the hook SAP had left was used.',

    muhasebeMantigi:
      'A BAdI\'s accounting logic comes from **the same root as substitution** in ' +
      '{{konu:dogrulama-ikame}}, but it cuts deeper: a BAdI **produces no posting of its ' +
      'own**: the posting is always produced by standard posting logic. A BAdI can only ' +
      '**change one field of that posting**, running beforehand to determine a value, or ' +
      '(in some definitions) raise an exception and **stop** the posting.\n\n' +
      'Here\'s the difference: the field substitution can change is **limited to the ' +
      '{{GB01}} table**, and the logic behind the change can be read on a screen (a ' +
      'prerequisite plus a target field). A BAdI implementation has **no such limit**: its ' +
      'ABAP code can read any table and write any field, and its logic can only be ' +
      'understood by **reading the code**.\n\n' +
      'From an audit-trail standpoint this is a degree riskier than substitution: any ' +
      'functional consultant can see what a substitution does by opening the {{GGB0}} or ' +
      '{{GGB1}} screen. Seeing what a BAdI does requires **finding which implementation is ' +
      'active in {{SE19}} and reading the code in {{SE24}}**: not something the accounting ' +
      'team can do on its own.',

    kavramlar: ['z-gelistirme', 'standarda-yakin', 'bapi', 'tasima-istegi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Writing a BAdI implementation is a different flow from the "define → assign → ' +
      'activate" triple in {{konu:dogrulama-ikame}}: because the definition step has ' +
      'already been done, by SAP. The consultant\'s/developer\'s job is **find → implement ' +
      '→ activate → transport**, and the first step usually isn\'t the one that gets ' +
      'skipped, it\'s the one that **takes the most time**: finding the right hook.',

    roller:[
      { rol:'Business unit', gorev:'Describes the need in business language: "derive the profit center differently based on the amount".' },
      { rol:'FI consultant', gorev:'Assesses whether standard configuration or {{konu:dogrulama-ikame}} can solve it.' },
      { rol:'FI consultant', gorev:'Searches for a definition at the relevant call point with {{SE18}}.' },
      { rol:'ABAP developer', gorev:'Creates an implementation with {{SE19}}; checks the filter value and the multiple-use setting.' },
      { rol:'ABAP developer', gorev:'Codes the interface methods in {{SE24}}.' },
      { rol:'FI consultant', gorev:'Tests the implementation both in the target scenario and against **normal postings**.' },
      { rol:'Basis', gorev:'Moves the object to production with a transport request ({{tasima-istegi}}).' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Writing a BAdI: find, implement, activate, transport',
      adimlar:[
        { ic:'💬', rol:'Business unit', baslik:'The need is described in business language',
          aciklama:'*"Derive the profit center differently based on the amount."* First the ' +
                   '**ladder rungs** are checked one by one: is there a standard solution, ' +
                   'does the rule engine suffice?',
          cikti:'Business need', ok:'if it doesn\'t fit the shape' },
        { ic:'🔎', rol:'Consultant', baslik:'The hook is searched for ({{SE18}})',
          aciklama:'Is there a definition at the relevant call point? If so: does it allow ' +
                   'multiple use, does it support a filter, how many implementations are ' +
                   'already active?',
          cikti:'Definition found', ok:'the implementation opens' },
        { ic:'🧩', rol:'Developer', baslik:'The implementation is created ({{SE19}})',
          aciklama:'A name is given, a class is assigned, a filter value is entered (if ' +
                   'supported). **A blank filter** and **multiple use** are checked for the ' +
                   'first time here.',
          cikti:'Implementation record', ok:'the code is written' },
        { ic:'👨‍💻', rol:'Developer', baslik:'The logic is coded ({{SE24}})',
          aciklama:'Business logic is written inside the interface method\'s body. There\'s ' +
                   'no "prerequisite" field to read here like in {{konu:dogrulama-ikame}}: ' +
                   'the code is the code.',
          cikti:'Coded class', ok:'it gets activated' },
        { ic:'🔌', rol:'Developer', baslik:'It\'s **activated** ({{SE19}})',
          aciklama:'An implementation left inactive shows up in the list but **doesn\'t ' +
                   'run**: the BAdI equivalent of {{GGB4}}\'s level-0 state.',
          cikti:'Working implementation', ok:'it gets tested' },
        { ic:'🧪', rol:'Consultant', baslik:'It\'s tested both ways',
          aciklama:'**Positive:** does the target scenario work correctly? **Negative:** do ' +
                   'normal postings outside the filter, or under multiple use, break?',
          cikti:'Verified implementation', ok:'it gets transported' },
        { ic:'📦', rol:'Basis', baslik:'It\'s **transported** ({{tasima-istegi}})',
          aciklama:'This is a workbench request: unlike {{GGB0}}, it isn\'t added to a ' +
                   'transport manually from a menu, it\'s **captured automatically** at ' +
                   'save time. The activation status carries a separate risk of its own ' +
                   '(see teknik → transport).',
          cikti:'Live implementation' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Works through the ladder rungs', sistem:'{{SPRO}} → {{konu:dogrulama-ikame}} → BAdI' },
      { rol:'Consultant', eylem:'Searches for the hook', sistem:'{{SE18}}: interface, multiple use, filter' },
      { rol:'Developer', eylem:'Creates the implementation', sistem:'{{SE19}}: name, class, filter value' },
      { rol:'Developer', eylem:'Codes the logic', sistem:'{{SE24}}: the interface method\'s body' },
      { rol:'Developer', eylem:'**Activates** it', sistem:'{{SE19}}: an inactive implementation doesn\'t run' },
      { rol:'Consultant', eylem:'Runs positive and negative tests', sistem:'Postings outside the filter must not break' },
      { rol:'Basis', eylem:'Moves it to production with a transport request', sistem:'{{tasima-istegi}}: a workbench request' },
      { rol:'Consultant', eylem:'Documents the implementation in the inventory', sistem:'Verified through {{SXS_ATTR}} / {{TADIR}}' },
    ],

    veriAkisi:{
      nereden:'The data arriving at the standard process\'s call point (a document, user input) plus the developer\'s ABAP code.',
      nereye:'Any table the implementation writes to: {{BSEG}}, {{BKPF}}, {{ACDOCA}}, or an external system; the boundary isn\'t a list like {{GB01}}, it\'s the code itself.',
      tetikleyen:'Every moment the definition is called inside SAP\'s standard code: the point stated in {{SE18}}\'s interface.',
      sonraki:'The standard process continues, or (if an exception is raised) the process stops.',
    },

    notlar:[
      { tip:'warn', baslik:'Two traps, one symptom: "sometimes it works, sometimes it doesn\'t"', metin:
        '**The multiple-use trap:** if a definition allows more than one active ' +
        'implementation ({{SXS_ATTR}}\'s `MULTIPLE_USE` flag is set), all of them run, but ' +
        '**SAP doesn\'t guarantee their execution order**. If two implementations write ' +
        'different values to the same field, the result depends on which one happens to run ' +
        'last: this is the classic cause of *"sometimes it works, sometimes it doesn\'t"* ' +
        'in production.\n\n' +
        '**The filter trap:** if a definition carries a filter field (e.g. company code), ' +
        'an implementation runs **only for that filter value**. This is the first thing to ' +
        'check in a *"the enhancement isn\'t working"* report: in most cases the BAdI isn\'t ' +
        'broken, a filter value is simply missing.\n\n' +
        '**Neither trap produces an error message.** When the filter doesn\'t match, the ' +
        'implementation is silently skipped; under multiple use, each one "succeeds" on its ' +
        'own terms. Diagnosis starts at {{SE18}} → the Implementations tab.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'A BAdI implementation **produces no accounting posting of its own**: the posting is ' +
      'always produced by standard posting logic. But the implementation can change that ' +
      'posting\'s lines **at the moment of posting, leaving no trace**. The postings below ' +
      'show three different outcomes from the same input: the BAdI never ran (the filter ' +
      'trap), the BAdI silently changed a field, and two active implementations processed ' +
      'the same field in **different order**, so the same input produced two different ' +
      'results on two different days.',

    etkilenenHesaplar:[
      { hesap:'BAdI, no account of its own', tur:', ', neden:'The posting is always produced by standard posting logic; the BAdI only changes the outcome.' },
      { hesap:'BAdI: the changed fields (any table)', tur:'Variable', neden:'There\'s no boundary like {{GB01}}; an implementation can affect {{BSEG}}, {{BKPF}}, even the derivation feeding {{ACDOCA}}.' },
      { hesap:'770200 Marketing expense', tur:'Income statement: Expense', neden:'The example target of the profit-center-derivation BAdI.' },
      { hesap:'{{kar-merkezi}}', tur:'Reporting dimension', neden:'One of the fields BAdIs change most often: also the most common target of substitution in {{konu:dogrulama-ikame}}.' },
    ],

    fisler:[
      { baslik:'The BAdI never ran: the filter trap',
        belgeTuru:'KR', tarih:'08.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770200', ad:'Marketing expense: company code 2000', borc:62000,
            not:'The profit center stayed **exactly as the user entered it**: PC-2000' },
          { hesap:'320', ad:'Trade payables', alacak:62000 },
        ],
        not:'The implementation\'s filter value was only entered for company code **1000**; ' +
             'for 2000 the definition was **never called**.\n\n' +
             'No error message appeared because a filter mismatch isn\'t an error, it\'s a ' +
             '**deliberate skip by design**. At first glance the consultant thought *"the ' +
             'BAdI is broken"*: but the right question was *"was a filter value entered for ' +
             'this company code?"*' },

      { baslik:'The BAdI silently changed the field: the real risk',
        belgeTuru:'KR', tarih:'08.03.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770200', ad:'Marketing expense: the user entered PC-2000', borc:62000,
            not:'What was saved: **PC-9000**: the BAdI changed it (the > 50,000 rule)' },
          { hesap:'320', ad:'Trade payables', alacak:62000 },
        ],
        not:'This time company code **1000** matched the filter, so the implementation ran: ' +
             'because the amount exceeded 50,000 TRY, the profit center was **forcibly** ' +
             'written as PC-9000 (central management).\n\n' +
             '**No message appeared.** If the user opens the document with {{FB03}} and sees ' +
             'PC-9000, they\'ll say *"I entered PC-2000"*: and they\'d be right. The rule ' +
             'worked exactly as designed, but because it **wasn\'t documented**, nobody knew ' +
             'this behavior existed.' },

      { baslik:'Multiple use: the same posting on Monday',
        belgeTuru:'KR', tarih:'12.02.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770300', ad:'R&D expense: the user entered PC-3000', borc:118000,
            not:'What was saved: **PC-9000**: the threshold-rule implementation ran first' },
          { hesap:'320', ad:'Trade payables', alacak:118000 },
        ],
        not:'The same definition has **two active implementations**: one picks a profit ' +
             'center based on an amount threshold, the other maps one based on the cost ' +
             'element. Today the threshold rule ran **first**, and its result wasn\'t ' +
             'overwritten by the other.' },

      { baslik:'Multiple use: the same posting on Tuesday, a different result',
        belgeTuru:'KR', tarih:'13.02.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770300', ad:'R&D expense: the user again entered PC-3000', borc:118000,
            not:'What was saved: **PC-4100**: this time the cost-element mapping ran last' },
          { hesap:'320', ad:'Trade payables', alacak:118000 },
        ],
        not:'**Same input, same user, one day apart: a different result.** SAP gives ' +
             '**no execution-order guarantee** between implementations on a definition open ' +
             'to multiple use; a support package or a new transport can change that order.\n\n' +
             'Both work correctly on their own: no error message, no dump. The problem is ' +
             'simply that **two independent implementations target the same field**.' },
    ],

    tHesaplar:[
      { hesap:'R&D expense: an inconsistent profit-center split', kod:'770300',
        borc:[{ ad:'Items landing on PC-9000 (the threshold rule won)', tutar:118000 },
              { ad:'Items landing on PC-4100 (the mapping won)', tutar:118000 }],
        alacak:[],
        not:'Same account, same kind of transaction: split across two profit centers. A ' +
            'reconciliation report shows this not as an **error**, but as an "unexpected ' +
            'split."' },
    ],

    notlar:[
      { tip:'warn', baslik:'No error message because there is no error: both run "correctly"', metin:
        'Nothing is technically wrong from the system\'s standpoint: skipping when the ' +
        'filter doesn\'t match is **by design**; under multiple use, each implementation ' +
        'produces a **correct** result according to its own logic. The bug isn\'t in one ' +
        'implementation\'s code, it\'s in **two implementations coexisting**, and no ' +
        'system message says so.\n\n' +
        'This goes a step further than the silence of substitution in ' +
        '{{konu:dogrulama-ikame}}: there, at least a single rule exists and its behavior is ' +
        'predictable. Here the behavior is **unpredictable**, because SAP never guaranteed ' +
        'an order.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'The BAdI and enhancement world varies along **three axes**: the **ladder rung** ' +
      '(which tool to reach for), the **usage mode** (single/multiple use, filtered or not), ' +
      'and the **generation** (classic customer exit vs. modern BAdI).',

    liste:[
      { ad:'Rung · Standard Configuration',
        aciklama:'No code; a setting in an {{SPRO}} IMG node.',
        neZaman:'When the need is met by an existing field or rule.',
        ornek:'Upgrade risk is **close to zero**: no custom code travels with it.' },

      { ad:'Rung · Validation / Substitution',
        aciklama:'A rule engine that runs at the moment of posting; locked into a fixed shape.',
        neZaman:'When the need fits a prerequisite + check, or a prerequisite + field-assignment shape.',
        ornek:'See {{konu:dogrulama-ikame}}: defined with {{GGB0}}/{{GGB1}}, requires no code (except for a user exit).' },

      { ad:'Rung · BAdI / Enhancement',
        aciklama:'Full ABAP at a point SAP has left open; standard code isn\'t touched.',
        neZaman:'When the need doesn\'t fit the shape but SAP has left a suitable hook.',
        ornek:'Because the standard object doesn\'t change, it **doesn\'t appear** on the upgrade adjustment list ({{SPAU}}).',
        tcodes:['SE18','SE19'] },

      { ad:'Rung · Modification',
        aciklama:'The standard SAP code itself is changed directly: a **last resort**.',
        neZaman:'When there\'s no hook at all and the requirement genuinely needs to change SAP\'s standard behavior.',
        ornek:'Manually reconciled at every upgrade with {{SPAU}}/{{SPDD}}: the cost isn\'t one-time, it **repeats**.' },

      { ad:'Usage · Single Use',
        aciklama:'The definition allows at most one active implementation.',
        neZaman:'SAP has deliberately locked this definition to a single implementation: usually where the outcome needs to be singular.',
        ornek:'Trying to create a second implementation is blocked by {{SE19}} itself.' },

      { ad:'Usage · Multiple Use: a trap',
        aciklama:'More than one implementation can be active at the same time; **execution order isn\'t guaranteed**.',
        neZaman:'On by default in {{SXS_ATTR}} for most definitions: nobody turns it off.',
        ornek:'If two independent implementations change the same field, the result is **unpredictable**.' },

      { ad:'Usage · Filter-Dependent: a trap',
        aciklama:'The definition carries a filter field (e.g. company code); an implementation runs only for that value.',
        neZaman:'The first suspect in a "the enhancement works for one company code but not another" report.',
        ornek:'For a company code with no filter value entered, the implementation is **silently skipped**: no error.' },

      { ad:'Generation · Classic Customer Exit',
        aciklama:'The older, function-module-based generation, managed through the {{SMOD}}/{{CMOD}} pair.',
        neZaman:'In pre-ECC or early-generation projects; still active in many installations.',
        ornek:'{{MODSAP}} keeps the record of these components: function exit, screen exit, menu exit.',
        tcodes:['CMOD','SMOD'] },

      { ad:'Generation · Modern BAdI (Interface-Based)',
        aciklama:'Interface-based, implemented inside a class ({{SE24}}).',
        neZaman:'The standard route for new development.',
        ornek:'{{SE18}} for the definition, {{SE19}} for the implementation: method signatures are fixed, the body is free.' },
    ],

    karsilastirmaBasliklar:['Validation / Substitution', 'BAdI'],
    karsilastirma:[
      ['Who writes it', 'The consultant, a fixed shape', 'An ABAP developer, free code'],
      ['Visibility', 'Read on the {{GGB0}}/{{GGB1}} screen', 'Found in {{SE19}}, logic only readable in {{SE24}}'],
      ['Field it can change', 'Limited to the {{GB01}} list', 'Unlimited: any table'],
      ['Transport', 'Added **manually** to a customizing request from the {{GGB0}}/{{GGB1}} menu', 'Captured **automatically** into a workbench request when {{SE19}}/{{SE24}} is saved'],
      ['Call point', 'Fixed points assigned via {{OB28}}/{{OBBH}} (header/item/complete document)', 'The **single** point {{SE18}}\'s definition leaves in SAP\'s code'],
      ['Order guarantee', 'One object: steps are added in sequence', '**No guarantee under multiple use**'],
      ['When to prefer it', 'When the need fits the prerequisite + check/assignment shape', 'When it doesn\'t fit the shape but SAP has left a hook'],
      ['What they share', 'Both run **at the moment of posting**', 'Both can **silently** change data'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'SE18', ad:'BAdI definition: the hook SAP leaves',
        amac:'Shows a BAdI definition\'s interface, methods, multiple-use and filter support; lists all existing implementations.',
        neZaman:'The first screen to answer "is there really a hook here?" before writing a BAdI; where diagnosis answers "how many implementations are active?"',
        adimlar:[
          { baslik:'Enter the definition name, or search by package/object type',
            aciklama:'If the name is unknown, it\'s found through {{SE80}}\'s package tree or the source of the relevant program.' },
          { baslik:'Examine the Interface tab',
            aciklama:'Which methods exist, which parameters they carry: this determines what an implementation can change.' },
          { baslik:'Check the **multiple use** flag',
            aciklama:'If set, more than one implementation can be active, and **the order isn\'t guaranteed**.' },
          { baslik:'Check for **filter** support',
            aciklama:'If filled in, implementations only run for a specific filter value.' },
          { baslik:'List existing implementations from the Implementations tab',
            aciklama:'Which are active, which package, who wrote them: the starting point of diagnosis.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Definition name: `AC_DOCUMENT` (example: the accounting-document change point)' },
          { ekran:'Interface', islem:'Method: `CHANGE`: allows changing document line items' },
          { ekran:'Properties', islem:'Multiple use: **checked** · Filter: **none**' },
          { ekran:'Implementations', islem:'2 active implementations listed: `Z_PRCTR_ESIK_KURALI`, `Z_PRCTR_MASRAF_ESLEME`' },
        ],
        alanlar:{ zorunlu:['Definition name'], opsiyonel:['Package/object-type filter'] },
        hatalar:[
          { mesaj:'I don\'t know if a hook exists for this process', sebep:'The hook\'s name isn\'t documented.', cozum:'The relevant program\'s source is scanned through {{SE80}}; the BAdI call in the code shows the hook\'s name and location.' },
          { mesaj:'The definition exists but has no implementation', sebep:'Nobody has implemented it yet: the hook is empty.', cozum:'A new implementation is created with {{SE19}}.' },
          { mesaj:'Several implementations are listed but the behavior is inconsistent', sebep:'The **multiple-use trap**: order isn\'t guaranteed.', cozum:'Consolidate the implementations into a single logic, or build an explicit priority into the {{SE24}} code.' },
        ],
        ipucu:'**Diagnosis always starts here.** For a "this BAdI isn\'t working" complaint, ' +
              'the first stop is {{SE18}} → the Implementations tab: how many implementations ' +
              'are active, which ones, who wrote them. If multiple use is flagged and more ' +
              'than one implementation is active, the problem isn\'t "not working," it\'s ' +
              '**"working unpredictably"**: two very different problems.',
        ilgili:['SE19','SE24','SE80'] },

      { kod:'SE19', ad:'BAdI implementation: the customer\'s code',
        amac:'Attaches a class to a defined BAdI, assigns a filter value, and activates or deactivates it.',
        neZaman:'When standard configuration and the rule engine aren\'t enough, after a suitable hook has been found in {{SE18}}.',
        adimlar:[
          { baslik:'Enter the definition name', aciklama:'A definition found in {{SE18}}.' },
          { baslik:'Create a new implementation and name it', aciklama:'The name usually starts with `Z*`/`Y*`, marking it as custom development.' },
          { baslik:'Assign the implementing class', aciklama:'A new class is created, or an existing one is chosen: the code is written in {{SE24}}.' },
          { baslik:'**Enter the filter value** (if the definition supports it)',
            aciklama:'If left blank, the implementation\'s behavior depends on the definition: don\'t assume, verify.' },
          { baslik:'**Activate**', aciklama:'An implementation left inactive is listed but **doesn\'t run**.' },
        ],
        ekranAkisi:[
          { ekran:'Entry', islem:'Definition: `AC_DOCUMENT`' },
          { ekran:'Implementation', islem:'Name: `Z_PRCTR_ESIK_KURALI` · class: `ZCL_PRCTR_ESIK_KURALI`' },
          { ekran:'Filter', islem:'No filter on this definition: runs on every document' },
          { ekran:'Status', islem:'**Active**' },
        ],
        alanlar:{ zorunlu:['Definition name','Implementation name','Implementing class'], opsiyonel:['Filter value (if the definition supports it)'] },
        hatalar:[
          { mesaj:'The implementation is defined and coded but never runs at all', sebep:'Left **inactive**.', cozum:'Activate it in {{SE19}}. This is the most common cause of "the BAdI isn\'t working": just like skipping {{GGB4}}.' },
          { mesaj:'It works for one company code but not another', sebep:'The **filter trap**: the filter value was only entered for one code.', cozum:'Verify the definition\'s filter type in {{SE18}}, add the missing value in {{SE19}}.' },
          { mesaj:'The result changes day to day, no error message', sebep:'The **multiple-use trap**: more than one active implementation, order not guaranteed.', cozum:'List every active implementation from {{SE18}} → the Implementations tab and consolidate the conflicting logic.' },
        ],
        ipucu:'**Don\'t leave the filter field blank: either fill it in or deliberately ' +
              'confirm the definition doesn\'t need one.** This is the BAdI equivalent of the ' +
              '"don\'t leave the prerequisite blank" lesson in {{konu:dogrulama-ikame}}: a ' +
              'blank filter behaves differently across definitions, so check {{SE18}} instead ' +
              'of assuming.',
        ilgili:['SE18','SE24','GGB4'] },

      { kod:'SE24', ad:'Class Builder: where the logic actually gets written',
        amac:'Used to write and review the ABAP methods of the class implementing a BAdI interface.',
        neZaman:'After the implementing class is assigned in {{SE19}}; when diagnosis asks "what does this BAdI actually do?"',
        adimlar:[
          { baslik:'Enter the class name', aciklama:'The implementing class shown on the {{SE19}} screen.' },
          { baslik:'Find the implemented interface', aciklama:'The class **implements** {{SE18}}\'s interface: method signatures are fixed, their bodies are free.' },
          { baslik:'Read/write the method body', aciklama:'The real business logic sits here: this is the only place to see which field changes under which condition.' },
          { baslik:'Activate', aciklama:'A class change doesn\'t run until it\'s activated.' },
        ],
        alanlar:{ zorunlu:['Class name'], opsiyonel:[] },
        hatalar:[
          { mesaj:'I can\'t find the right place to understand what the BAdI does', sebep:'The logic isn\'t on a screen, it\'s inside code.', cozum:'Get the class name from {{SE19}}, then read the relevant interface method\'s body in {{SE24}}: this is the BAdI equivalent of reading {{GGB0}}\'s prerequisite/check fields, but it takes technical knowledge.' },
          { mesaj:'The code changed but the behavior stayed the same', sebep:'The class wasn\'t activated.', cozum:'Activate it in {{SE24}}; also confirm in {{SE19}} that the implementation is still active.' },
        ],
        ipucu:'**Reading the code is the only real way to know what a BAdI does.** Unlike ' +
              '{{GGB0}}/{{GGB1}}, there\'s no "prerequisite" or "check" field here: the logic ' +
              'is free-form ABAP. That\'s why a **business-language description** for every ' +
              'active implementation (class documentation or a project record) is even more ' +
              'critical than the substitution description in {{konu:dogrulama-ikame}}.',
        ilgili:['SE19','SE18'] },

      { kod:'SE80', ad:'Object Navigator: ownership and package',
        amac:'Shows which package a development object (a class, a function group, a BAdI implementation) belongs to and who wrote it.',
        neZaman:'For "who wrote this implementation, under which project?"; when taking inventory before a migration.',
        adimlar:[
          { baslik:'Search by package or object name', aciklama:'The BAdI implementation class\'s name is taken from {{SE19}}.' },
          { baslik:'Examine its position in the package tree', aciklama:'A **Z/Y** prefix marks custom development; SAP standard packages are named differently.' },
          { baslik:'See the object\'s ownership information', aciklama:'Comes from the {{TADIR}} record: the creating user, the creation date.' },
        ],
        alanlar:{ zorunlu:['Object name or package'], opsiyonel:[] },
        hatalar:[
          { mesaj:'I don\'t know who wrote this implementation', sebep:'No project documentation.', cozum:'Check the creating-user field through {{SE80}} or directly through {{TADIR}} (via {{SE16N}}).' },
          { mesaj:'Two separate projects touched the same hook and nobody knew', sebep:'The inventory is incomplete.', cozum:'Filter {{TADIR}} by package to list every Z/Y class and check which ones implement a BAdI interface.' },
        ],
        ipucu:'**Reading the package prefix is a small but important habit.** `Z*`/`Y*` is ' +
              'custom development; if an "implementation" turns up in some other package, ' +
              'you may be looking at the wrong object. Migration projects scan every Z/Y ' +
              'class and list which ones implement a BAdI interface: this is the ' +
              'BAdI-specific version of the usage analysis in {{konu:migration}}.',
        ilgili:['SE18','SE19'] },

      { kod:'CMOD', ad:'Project management: the classic customer exit',
        amac:'Attaches classic customer exits (function-module-based, chosen from the {{SMOD}} catalog) to a project and activates them.',
        neZaman:'In older (pre-BAdI) installations; when taking inventory before an S/4HANA conversion.',
        adimlar:[
          { baslik:'Create or select a project', aciklama:'A project can group several {{SMOD}} components.' },
          { baslik:'Assign the enhancement to the project', aciklama:'An enhancement is chosen from the {{SMOD}} catalog.' },
          { baslik:'Write logic into the function exit\'s code body', aciklama:'This is the counterpart to a BAdI\'s interface method: there\'s no interface here, just a code body directly.' },
          { baslik:'Activate the project', aciklama:'An inactive project **doesn\'t run** even if it holds code.' },
        ],
        alanlar:{ zorunlu:['Project name'], opsiyonel:[] },
        hatalar:[
          { mesaj:'An old exit still runs and conflicts with a newly written BAdI', sebep:'Both a classic exit and a BAdI implement the same function.', cozum:'Check both: if a {{CMOD}} project is active and changes the same field along with a BAdI implementation, a **two-layer conflict** results; one of them needs to go.' },
          { mesaj:'It\'s not clear what happens to this project in the S/4HANA conversion', sebep:'No inventory exists.', cozum:'List every active {{CMOD}} project before the conversion and review whether each one is still needed (see {{konu:migration}}).' },
        ],
        ipucu:'**A classic exit doesn\'t look like a BAdI but carries the same risk.** The ' +
              'anatomy differs: a function module plus a code body instead of an interface ' +
              'plus a class: but the outcome is the same: custom logic running outside ' +
              'standard code, lost if undocumented. Older installations commonly have ' +
              '**both** {{CMOD}} projects **and** BAdI implementations active at the same ' +
              'time, and an inventory needs to cover both.',
        ilgili:['SMOD','SE18'] },

      { kod:'SMOD', ad:'Enhancement definitions: the classic catalog',
        amac:'Lists the classic enhancements (function exit, screen exit, menu exit) SAP delivers.',
        neZaman:'When looking for which component to add to a {{CMOD}} project.',
        adimlar:[
          { baslik:'Search by enhancement name or object type', aciklama:'You need to know which program calls the function you\'re looking for.' },
          { baslik:'Examine the components', aciklama:'Function exit, screen exit, and menu exit types: {{MODSAP}} holds this breakdown.' },
        ],
        alanlar:{ zorunlu:['Enhancement name'], opsiyonel:[] },
        hatalar:[
          { mesaj:'Both {{SMOD}} and {{SE18}} return a match for this process, which one should I use', sebep:'The same function has both a classic and a modern hook.', cozum:'For new development, **always prefer the modern BAdI** ({{SE18}}): {{SMOD}} is used only for already-established classic projects.' },
        ],
        ipucu:'**{{SMOD}} is a catalog, not something you run.** The actual activation ' +
              'happens in {{CMOD}}: much like an {{SE18}} definition itself doesn\'t run, ' +
              'it\'s the {{SE19}} implementation that runs. Finding a match in {{SMOD}} for a ' +
              'new need signals that path is **still available but from an older generation**; ' +
              'a modern counterpart usually exists as a BAdI too.',
        ilgili:['CMOD','MODSAP'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'A BAdI has no movement table of its own: it\'s a code framework. But three tables ' +
      'matter for diagnosis: **{{SXS_ATTR}}** (a definition\'s multiple-use/filter ' +
      'properties), **{{TADIR}}** (who wrote it, which package), and **{{MODSAP}}** for the ' +
      'classic generation. The tables an implementation **can change** are unlimited: most ' +
      'commonly {{BKPF}}/{{BSEG}}/{{ACDOCA}}.',

    liste:[
      { ad:'SXS_ATTR', baslik:'BAdI definition attributes: where the traps come from',
        tutar:'The record of classic (pre-enhancement-spot) BAdI definitions: whether multiple implementations are allowed, whether it\'s filtered, which interface it uses.',
        olusturan:'When a BAdI definition is created with {{SE18}}',
        s4:'Still there for classic BAdIs; the newer generation of enhancement spots lives in a separate table family.',
        anahtar:'EXIT_NAME',
        iliskiler:'The table {{SE18}}\'s screen reads; {{SE19}} ties each implementation to this definition.',
        alanlar:[
          { ad:'EXIT_NAME', aciklama:'The BAdI definition name', tip:'pk' },
          { ad:'MULTIPLE_USE', aciklama:'**Can more than one implementation be active**: the first field to check when diagnosing a conflict' },
          { ad:'FILTER_TYPE', aciklama:'The filter type (e.g. company code): if filled in, an implementation only runs for that value' },
        ] },

      { ad:'TADIR', baslik:'Repository object directory: the ownership record',
        tutar:'The owner, package, and original system of every development object in the system (a program, a class, a BAdI implementation, a table).',
        olusturan:'Automatically, whenever a development object is created',
        s4:'Unchanged.',
        anahtar:'PGMID + OBJECT + OBJ_NAME',
        iliskiler:'The starting point for "who wrote this extension, under which project?": the table {{SE80}} reads.',
        alanlar:[
          { ad:'OBJECT', aciklama:'Object type (CLAS, FUGR, SXCI…)', tip:'pk' },
          { ad:'OBJ_NAME', aciklama:'Object name', tip:'pk' },
          { ad:'DEVCLASS', aciklama:'Package: **a Z/Y prefix means custom development**' },
          { ad:'AUTHOR', aciklama:'The creating user' },
        ] },

      { ad:'MODSAP', baslik:'SAP enhancement components: the classic generation',
        tutar:'Holds which components (function exit, screen exit, menu exit) make up the classic SAP enhancements (customer exits).',
        olusturan:'Standard SAP delivery: the customer doesn\'t write it, only uses it',
        s4:'Still there, but new development prefers a BAdI.',
        anahtar:'NAME + TYP + MEMBER',
        iliskiler:'The table behind the {{SMOD}}/{{CMOD}} pair.',
        alanlar:[
          { ad:'NAME', aciklama:'The enhancement name', tip:'pk' },
          { ad:'TYP', aciklama:'Component type: **E**=function exit, **S**=screen, **M**=menu' },
          { ad:'MEMBER', aciklama:'The component name: the function or screen to be called' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Who wrote it, what does it change?',
      varliklar:[
        { ad:'TADIR', rol:'Repository', hub:true, aciklama:'**The ownership record for every development object**',
          alanlar:[{ ad:'OBJECT', tip:'pk' }, { ad:'OBJ_NAME', tip:'pk' }, { ad:'DEVCLASS' }, { ad:'AUTHOR' }] },
        { ad:'SXS_ATTR', rol:'Definition', aciklama:'Multiple-use and filter properties',
          alanlar:[{ ad:'EXIT_NAME', tip:'pk' }, { ad:'MULTIPLE_USE' }, { ad:'FILTER_TYPE' }] },
        { ad:'MODSAP', rol:'Classic generation', aciklama:'Function/screen/menu exit components',
          alanlar:[{ ad:'NAME', tip:'pk' }, { ad:'TYP' }, { ad:'MEMBER' }] },
        { ad:'BKPF', rol:'Document', aciklama:'Header fields an implementation can change',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }] },
        { ad:'BSEG', rol:'Document', aciklama:'The line-item fields an implementation changes most often',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'HKONT' }, { ad:'PRCTR' }] },
        { ad:'ACDOCA', rol:'S/4HANA', aciklama:'The change reflects here too',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'PRCTR' }] },
      ],
      iliskiler:[
        { from:'TADIR', to:'SXS_ATTR', alanlar:'OBJ_NAME=EXIT_NAME', not:'the definition\'s ownership record' },
        { from:'TADIR', to:'MODSAP', alanlar:'OBJ_NAME=NAME', not:'classic enhancement ownership' },
        { from:'SXS_ATTR', to:'BSEG', alanlar:'through code', not:'**no fixed key: an implementation can change any field**' },
        { from:'BKPF', to:'BSEG', alanlar:'BELNR', not:'the standard document structure' },
        { from:'BSEG', to:'ACDOCA', alanlar:'BELNR', not:'the change reflects here too' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'A consultant runs into this topic from two different directions: through the ' +
      '**{{SE18}}/{{SE19}}** screens (finding an existing hook) and as **unexpected ' +
      'behavior** (noticing a BAdI has been running silently).',

    ekranlar:[
      { ad:'{{SE18}}: the BAdI definition screen',
        aciklama:'The hook itself: the interface, multiple-use and filter support, and the list of every implementation.',
        alanlar:[
          { ad:'Definition name', zorunlu:true, aciklama:'If unknown, found through {{SE80}} from the relevant program\'s source.' },
          { ad:'**Interface / methods**', zorunlu:true, aciklama:'Determines what an implementation can change.' },
          { ad:'**Multiple-use flag**', zorunlu:true, aciklama:'If set, **there\'s no order guarantee**.' },
          { ad:'**Filter type**', zorunlu:false, aciklama:'If filled in, an implementation only runs for that filter value.' },
          { ad:'Implementation list', zorunlu:false, aciklama:'The starting point of diagnosis: how many are active, from which package.' },
        ],
        ipucu:'**Every diagnosis starts here.** If multiple use is flagged and more than one ' +
              'implementation is active, the problem is "working unpredictably," not "not ' +
              'working."' },

      { ad:'{{SE19}}: the BAdI implementation screen',
        aciklama:'The class the customer has attached to the hook, its filter value, and its active/inactive status.',
        alanlar:[
          { ad:'Definition name', zorunlu:true },
          { ad:'Implementation name and class', zorunlu:true, aciklama:'Usually `Z*`/`Y*`: the code is written in {{SE24}}.' },
          { ad:'**Filter value**', zorunlu:false, aciklama:'Must be filled in if the definition supports it; leaving it blank should be a deliberate decision.' },
          { ad:'**Active/Inactive**', zorunlu:true, aciklama:'An inactive implementation appears in the list but **doesn\'t run**.' },
        ],
        ipucu:'**Don\'t leave the filter value blank: fill it in, or deliberately confirm ' +
              'it doesn\'t need one.** This is the first place to check in a "the enhancement ' +
              'works for one company code but not another" report.' },

      { ad:'{{SE24}}: the class screen',
        aciklama:'Where the actual ABAP logic is written; the only way to see it.',
        alanlar:[
          { ad:'Class name', zorunlu:true, aciklama:'Taken from the {{SE19}} screen.' },
          { ad:'The implemented interface', zorunlu:false, aciklama:'{{SE18}}\'s definition interface: method signatures are fixed.' },
          { ad:'Method body', zorunlu:true, aciklama:'The business logic itself: there\'s no summary field like "check" or "prerequisite."' },
        ],
        ipucu:'**The only way to read what a BAdI does is to read the code here.** For a ' +
              'functional consultant this is far harder than reading {{GGB0}}: which is why ' +
              'a business-language description for every active implementation needs to be ' +
              'kept somewhere else.' },
    ],

    zorunlu:['Definition name','Implementation name and class','Active/Inactive status'],
    opsiyonel:['Filter value (if the definition supports it)','Implementation description'],

    hatalar:[
      { mesaj:'I defined/implemented the BAdI but it isn\'t working at all', sebep:'The implementation was left **inactive**.', cozum:'Activate it in {{SE19}}: this is the most common cause of "the BAdI isn\'t working."' },
      { mesaj:'It works for one company code but not another', sebep:'The **filter trap**.', cozum:'Verify the filter type in {{SE18}}; add the missing value in {{SE19}}.' },
      { mesaj:'The result changes from day to day, no error message at all', sebep:'The **multiple-use trap**: order isn\'t guaranteed.', cozum:'List every active implementation from {{SE18}} → the Implementations tab and consolidate the conflicting logic into one.' },
      { mesaj:'The program crashed but the error message never mentions the BAdI', sebep:'The dump shows the class/method that was called: not the BAdI\'s name.', cozum:'Take the class/method name from the dump in {{ST22}}, open that class in {{SE24}}, and confirm which definition it\'s tied to via {{SE19}}.' },
      { mesaj:'I don\'t know who wrote this extension', sebep:'No project documentation exists.', cozum:'Query {{TADIR}} through {{SE80}} or {{SE16N}}: the creating user and package become visible.' },
      { mesaj:'A CMOD project from ECC can\'t be found in S/4HANA', sebep:'The classic exit wasn\'t modernized, or it now overlaps with a standard BAdI.', cozum:'Take inventory of {{SMOD}}/{{CMOD}}, and check {{SE18}} for whether a modern BAdI counterpart exists for each (see {{konu:migration}}).' },
    ],

    ipuclari:[
      '**Diagnostic order:** {{SE18}} (is there a hook, how many implementations are ' +
      'active) → {{SE19}} (is it active, what\'s the filter value) → {{SE24}} (what does the ' +
      'logic do) → {{TADIR}}/{{SE80}} (who wrote it).',
      '**"Sometimes it works, sometimes it doesn\'t" = the multiple-use trap.** SAP gives no order guarantee.',
      '**"Works in one place, not another" = the filter trap.** Check the filter value first.',
      '**A runtime error rarely names the BAdI**: trace backward from the class/method shown in {{ST22}}.',
      '**Document every active implementation**: the code is far less visible than a {{GGB0}}/{{GGB1}} screen.',
      'Always try the ladder top-down: standard → {{konu:dogrulama-ikame}} → BAdI → modification.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BKPF / BSEG', ne:'An implementation can change these fields **without any restriction**' },
      { tablo:'ACDOCA', ne:'The change reflects here too (S/4HANA)' },
      { tablo:'SXS_ATTR', ne:'**Read**: multiple-use and filter properties' },
      { tablo:'TADIR', ne:'**Read**: ownership and package information' },
    ],

    commit:
      'A BAdI runs **inside** the standard process, at the single point SAP has defined: ' +
      'unlike the fixed six-step order of the rule engine in {{konu:dogrulama-ikame}}, the ' +
      'order here is **specific to the definition**.\n\n' +
      'The general shape is this:\n\n' +
      '**1.** Standard code reaches the call point.\n' +
      '**2.** SAP checks {{SXS_ATTR}} for whether the definition has an active implementation.\n' +
      '**3.** If multiple use is on, **every active implementation** is called in turn: the ' +
      'order isn\'t guaranteed.\n' +
      '**4.** If there\'s a filter and an implementation\'s filter value doesn\'t match this ' +
      'record, it\'s **skipped**.\n' +
      '**5.** Each matching implementation\'s method runs; raising an exception can (depending ' +
      'on the definition) stop the process.\n\n' +
      'This flexibility is powerful, but it also gives up the **predictability** that the ' +
      'fixed order in {{konu:dogrulama-ikame}} provides.',

    belgeNo:
      'If a BAdI implementation raises an exception and stops the posting, the behavior ' +
      'depends on the definition: at some call points no number is consumed at all, at ' +
      'others a number may already have been assigned but the document never gets created ' +
      ': this second case resembles the symptom of an {{guncelleme-hatasi}}.\n\n' +
      'An implementation that only changes a field has no effect on numbering.',

    postingLogic:
      'From a diagnostic standpoint, three questions matter for how a BAdI runs:\n\n' +
      '**1.** Does the definition have an **active** implementation? ({{SE18}} → Implementations)\n' +
      '**2.** If so, is the implementation **enabled**? ({{SE19}} → Active/Inactive)\n' +
      '**3.** Does the filter value **match** this record? ({{SE19}} → Filter)\n\n' +
      'If all three are "yes," the method runs, and the only way to see the logic is to read ' +
      'the code in {{SE24}}. Under multiple use, a fourth and **unanswerable** question is ' +
      'added: *"which implementation ran first this time?"*',

    numberRange:
      'A BAdI has no direct relationship with a number range; numbering belongs to standard ' +
      'posting logic. An implementation can\'t change the number, it can only affect whether ' +
      'the process continues.',

    accountDetermination:
      'A BAdI placed at the right point can run **before or after** account determination: ' +
      'it depends on the definition. If an implementation changes the account or a dimension ' +
      'like {{kar-merkezi}}, the account-determination result or the reporting dimension ' +
      '**changes too**.\n\n' +
      'This is a stronger version of the same risk substitution carries in ' +
      '{{konu:dogrulama-ikame}}: substitution can only change a field on the {{GB01}} list, ' +
      'while a BAdI can change **any field**.',

    tur:
      'A BAdI implementation is **a development object from top to bottom**: a class, an ' +
      'interface, code. This is the exact opposite of the rule engine in ' +
      '{{konu:dogrulama-ikame}}: there, the definition/assignment/activation are ' +
      'customizing, and only the user exit is a development object; here **everything** ' +
      '(including the {{SE19}} record) belongs to the workbench layer.\n\n' +
      'One exception: an implementation\'s **active/inactive** switch behaves like a ' +
      'configuration flag and can therefore differ between systems (see transport).',

    transport:
      'When a BAdI implementation is saved, it goes **automatically** into a workbench ' +
      'request: unlike {{GGB0}}/{{GGB1}}, it doesn\'t need to be added manually from a ' +
      'menu.\n\n' +
      '**The most common migration problem:** an implementation\'s **active/inactive** ' +
      'status, even though it transports along with the code, can behave differently in the ' +
      'target system: especially when the development is split across multiple transport ' +
      'requests. The code can be present in production while the implementation arrives ' +
      '**inactive**.\n\n' +
      'Also, when two implementations of a definition open to multiple use are moved to ' +
      'production via **separate** transport requests, which one arrived first **doesn\'t ' +
      'affect** the execution order: SAP never guaranteed one to begin with; transport ' +
      'sequence doesn\'t resolve that uncertainty.\n\n' +
      '**Migration check:** try a test posting in production that should trigger the target ' +
      'scenario: does the expected field change?',

    img:[
      { yol:'{{SE18}} → search by definition name or package', not:'Most BAdIs have no direct counterpart in the {{SPRO}} tree' },
      { yol:'{{SPRO}} → the relevant module node → "Business Add-Ins (BAdIs)"', not:'For some standard BAdIs, SAP has left an IMG node that jumps directly into {{SE19}}: this is never guaranteed the way it is for {{GGB0}}' },
    ],

    ekstra:[
      { ic:'🪜', baslik:'The four-rung ladder: each step\'s upgrade cost', metin:
        'Solving a need always follows the same order of questions:\n\n' +
        '**① Does standard configuration solve it?** ({{SPRO}}): if so, stop, don\'t write ' +
        'code. Upgrade cost is **zero**.\n\n' +
        '**② Does a rule engine solve it?** (see {{konu:dogrulama-ikame}}): if it fits a ' +
        'prerequisite + check or a prerequisite + field-assignment shape, exit here. Usually ' +
        'needs no code, and even when it does, it\'s an easily reversible user exit.\n\n' +
        '**③ Does a BAdI solve it?** If SAP has left a suitable hook, yes: real code gets ' +
        'written, but the standard object stays untouched, and it doesn\'t appear on the ' +
        'upgrade adjustment list ({{SPAU}}).\n\n' +
        '**④ Is modification required?** If SAP has left no hook at all and the work ' +
        'genuinely needs to change standard behavior: a **last resort**. It has to be ' +
        'manually reconciled with {{SPAU}}/{{SPDD}} at every upgrade; the cost isn\'t ' +
        'one-time, it **repeats with every release**.\n\n' +
        '**Consulting principle:** every step down the ladder needs a justification. The ' +
        'phrase "we put it in a BAdI" gets misused often, because ③ is easier to reach for ' +
        'than ②, even though ② usually means less effort, less risk, and an easier diagnosis ' +
        '({{konu:best-practices}}).' },

      { ic:'🎲', baslik:'Multiple use and filters: two traps, one diagnostic path', metin:
        'Both traps produce the same symptom: **no error message**, a result that\'s ' +
        'different from what was expected.\n\n' +
        'The **filter trap** is simple: if `FILTER_TYPE` in {{SXS_ATTR}} is filled in, the ' +
        'definition is **silently skipped** for every record where the implementation\'s ' +
        'filter value isn\'t entered. This is deliberate design: but if it isn\'t ' +
        'documented, it gets mistaken for "the extension is broken."\n\n' +
        'The **multiple-use trap** runs deeper: if `MULTIPLE_USE` is flagged, more than one ' +
        'implementation can be active **at the same time**, and SAP gives **no guarantee at ' +
        'all about their execution order**. If two implementations were written by different ' +
        'teams, in different years, unaware of each other, and both target the same field, ' +
        'the result depends on that day\'s execution order: and that order can shift even ' +
        'through a support package.\n\n' +
        '**The diagnostic path is the same either way:** {{SE18}} → the Implementations tab. ' +
        'How many implementations are active, with what filter values, from which package. ' +
        'Every assumption made without opening this screen (*"there\'s only one ' +
        'implementation"*, *"it always runs"*) can turn out wrong.' },
    ],

    notlar:[
      { tip:'warn', baslik:'A runtime error rarely names the BAdI', metin:
        'When an error occurs inside an implementation (a dump visible in {{ST22}}, or an ' +
        'exception message on screen), the error text usually shows **the name of the class ' +
        'that was called**: not the name of the BAdI definition.\n\n' +
        'This is the BAdI-specific version of the "map the symptom to the right tool" ' +
        'principle in {{konu:error-handling}}: you work backward from the class/method shown ' +
        'in the dump: which definition is that class tied to in {{SE19}}, how many ' +
        'implementations does that definition have, which ones match the filter value.\n\n' +
        '**There\'s no shortcut.** Reading the error message and jumping straight to "which ' +
        'BAdI" is rarely possible; diagnosis always works **backward**, from the class name ' +
        'to the definition.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'The BAdI concept **hasn\'t changed at its core** in S/4HANA: {{SE18}}, {{SE19}}, ' +
      '{{SE24}}, {{SE80}} all work the same way. What changed is the framework around it: ' +
      'BAdIs grouped by enhancement spots, and, the real difference, the question of ' +
      '**which BAdI you\'re allowed to touch**, driven by the **clean-core** principle.',

    eccFarklari:[
      { konu:'Definition / implementation screens', ecc:'{{SE18}} / {{SE19}}', s4:'**Unchanged**' },
      { konu:'Class editing', ecc:'{{SE24}}', s4:'**Unchanged**' },
      { konu:'Classic customer exit', ecc:'{{SMOD}}/{{CMOD}} common', s4:'Still there but discouraged: a modern BAdI or Custom Fields and Logic is preferred' },
      { konu:'Which BAdI is safe to use', ecc:'In principle, all of them', s4:'**Only "released" BAdIs** are considered clean-core compliant' },
      { konu:'Where the code lives', ecc:'Usually in the core system, close to the standard namespace', s4:'Pushed outside the core by the **clean-core** principle (side-by-side extensibility)' },
      { konu:'The "we put it in a BAdI" justification', ecc:'Usually sufficient', s4:'**Not sufficient on its own**: needs an answer for which BAdI, whether it\'s released, and whether it\'s in-app or side-by-side' },
      { konu:'Table the changed result reflects into', ecc:'{{BSEG}}', s4:'{{BSEG}} + {{ACDOCA}}' },
    ],

    universalJournal:
      'The fields a BAdI implementation changes are carried into {{ACDOCA}} too: because the ' +
      'implementation usually runs at a point **before** {{ACDOCA}} is written.\n\n' +
      'The practical consequence overlaps with substitution\'s risk in ' +
      '{{konu:dogrulama-ikame}} but is broader: substitution can only change fields on the ' +
      '{{GB01}} list, while a BAdI can change **any field**, including any dimension that ' +
      'affects the {{belge-bolme}} result. In a setup doing segment reporting, a BAdI that ' +
      'changes the profit center or segment field needs to be **tested with extra care**.',

    kalkanTcodes:[
      { eski:', ', yeni:', ', not:'{{SE18}}, {{SE19}}, {{SE24}}, {{SE80}}, {{CMOD}}, {{SMOD}} **were not removed**' },
    ],

    fiori:[
      { ad:'Custom Fields and Logic', aciklama:'**The modern alternative**: adding fields and defining logic without writing code, in cloud and on-premise alike; replaces writing a BAdI in many scenarios.' },
      { ad:'Manage Your Solution', aciklama:'Used to see which extensions (in-app / side-by-side) are in use and whether they\'re released.' },
    ],

    bestPractices:[
      'During a conversion/migration, **take inventory of every active BAdI implementation** ' +
      ': scan the Implementations tab in {{SE18}} for each definition, and verify package/' +
      'ownership through {{TADIR}}.',
      'Make sure every active implementation has a **business-language description**: since ' +
      'the code is far less visible than a {{GGB0}}/{{GGB1}} screen, this description can be ' +
      'the only trace.',
      'For new requirements, evaluate **Custom Fields and Logic** first: it\'s more ' +
      'visible, more upgrade-resistant, and clean-core compliant.',
      'Review leftover classic {{SMOD}}/{{CMOD}} exits; check in {{SE18}} whether a modern ' +
      'BAdI counterpart exists.',
      'Consolidate implementations open to multiple use that target the same field into a ' +
      'single logic, or build an explicit priority: don\'t rely on the order.',
      '**Don\'t treat "we put it in a BAdI" as a justification on its own**: without an ' +
      'answer for which definition, whether it\'s released, and whether it\'s in-app or ' +
      'side-by-side, it hasn\'t been evaluated for clean-core at all.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'Why does the profit center come out different sometimes? - a forgotten multiple-use implementation',
    hikaye:
      'At **Batı Sanayi Inc.**, a controller notices something odd: some of the expense ' +
      'postings the R&D department enters land on **PC-9000**, others on **PC-4100**: same ' +
      'account, same kind of transaction, same user. Users insist they entered the same ' +
      'value (PC-3000) both times.\n\n' +
      'The trial balance is correct, the document is balanced, there\'s no error message. ' +
      'The system administrator says *"the user must be entering it wrong."*\n\n' +
      'This scenario shows how an undocumented BAdI definition, open to multiple use, ran ' +
      'unpredictably because of two independent implementations, and how it got diagnosed.',
    veriler:[
      { k:'Company code', v:'1000 · period 02/2028' },
      { k:'Symptom', v:'PC-3000 entered → saved as **PC-9000** sometimes, **PC-4100** other times' },
      { k:'Affected', v:'Only postings to account 770300' },
      { k:'Error message', v:'**None**' },
      { k:'Since when', v:'Unknown' },
    ],

    adimlar:[
      { baslik:'The symptom is confirmed: is the user right?', tcode:'FB03',
        aciklama:'A suspicious document is opened and its change trail is checked.',
        girdi:[
          { alan:'Document', deger:'1900012340 · 770300 expense · 118,000 TRY' },
          { alan:'Profit center saved', deger:'**PC-9000**' },
          { alan:'Environment → Changes', deger:'**No post-posting change**' },
          { alan:'Conclusion', deger:'The value was written this way **at the moment of posting**' },
        ],
        not:'{{degisiklik-belgesi}} is empty: meaning nobody changed it afterward.\n\n' +
             'So PC-9000 was written **at the moment of posting**. Two possibilities: the ' +
             'user genuinely entered it that way, or **a mechanism changed it**. Since the ' +
             'user is insistent, the second possibility is investigated.' },

      { baslik:'A pattern is searched for: which postings are affected?', tcode:'FBL3N',
        aciklama:'An attempt is made to find a common thread among the affected postings.',
        girdi:[
          { alan:'Account 770300: all items', deger:'96 items' },
          { alan:'Items on PC-9000', deger:'**58 items**' },
          { alan:'Items on PC-4100', deger:'**38 items**' },
          { alan:'Distribution by date', deger:'Doesn\'t seem tied to a specific day or user' },
        ],
        not:'The pattern is clear: a single account, two different values, and a distribution ' +
             'that **looks random**. A company-code or user-based filter trap wouldn\'t create ' +
             'a split this messy: a filter trap would produce a **consistent** result, and ' +
             'this isn\'t consistent.\n\n' +
             'The messiness itself is a clue: it suggests **more than one mechanism** is ' +
             'writing to the same field, not just one rule.' },

      { baslik:'The hook is searched for', tcode:'SE18',
        aciklama:'A check is made for whether a BAdI definition exists at the relevant call point and how many implementations it has.',
        girdi:[
          { alan:'Definition', deger:'`AC_DOCUMENT`' },
          { alan:'Multiple use', deger:'**Checked**' },
          { alan:'Number of active implementations', deger:'**2**' },
          { alan:'Implementations', deger:'`Z_PRCTR_ESIK_KURALI`, `Z_PRCTR_MASRAF_ESLEME`' },
        ],
        not:'**Two active implementations were found: and the definition is open to ' +
             'multiple use.**\n\n' +
             'This wasn\'t the first place anyone thought to look; the BAdI\'s silence ' +
             'delayed diagnosis considerably. Even the system administrator didn\'t know such ' +
             'a definition existed.' },

      { baslik:'Both implementations are examined', tcode:'SE24',
        aciklama:'What each implementation does, and why they conflict, is investigated.',
        girdi:[
          { alan:'`Z_PRCTR_ESIK_KURALI`', deger:'Writes **PC-9000** if the amount exceeds 100,000 (a 2024 rule)' },
          { alan:'`Z_PRCTR_MASRAF_ESLEME`', deger:'Always writes **PC-4100** for cost element 770300 (a 2027 rule)' },
          { alan:'Does either check "if the field is blank"?', deger:'**No**: both overwrite unconditionally' },
          { alan:'Description fields', deger:'Both **blank**' },
        ],
        not:'**Each implementation works correctly on its own**: but both target the same ' +
             'field, under the same prerequisite (account 770300), and neither knows the ' +
             'other exists. Whichever one runs **last** determines what gets saved, and SAP ' +
             'gives no guarantee about that order.' },

      { baslik:'The history is investigated', tcode:'SE16N',
        aciklama:'When and by whom each implementation was written is traced through {{TADIR}}.',
        girdi:[
          { alan:'`Z_PRCTR_ESIK_KURALI`', deger:'2024 · a former consulting firm' },
          { alan:'`Z_PRCTR_MASRAF_ESLEME`', deger:'2027 · the in-house development team' },
          { alan:'Project documentation', deger:'**No record** for either' },
          { alan:'The link', deger:'The 2027 team was **unaware** the 2024 rule existed' },
        ],
        not:'In 2024 only one implementation existed and it worked correctly. In 2027 a ' +
             'second implementation was written for a new need: but nobody opened {{SE18}} ' +
             'and asked *"does this definition already have an active implementation?"* ' +
             'Because multiple use allowed it, the system quietly accepted both.' },

      { baslik:'The fix: the two implementations are consolidated into one logic', tcode:'SE24',
        aciklama:'Rather than deleting either implementation, they\'re merged into a single logic with an explicit priority.',
        girdi:[
          { alan:'New single implementation', deger:'`Z_PRCTR_DERIVE_MASTER`' },
          { alan:'Logic', deger:'The cost-element mapping is checked first; if there\'s no match, the amount threshold applies' },
          { alan:'The old implementations', deger:'Set to **inactive** (not deleted: kept for historical reference)' },
          { alan:'Description written', deger:'"Profit-center derivation for 770300: the 2024 threshold rule plus the 2027 cost-element mapping, priority: mapping over threshold (2028 consolidation)"' },
        ],
        fis:{ baslik:'Test posting: after the consolidation', belgeTuru:'KR', tarih:'20.02.2028',
          satirlar:[
            { hesap:'770300', ad:'R&D expense: the user entered PC-3000', borc:118000,
              not:'What was saved: **PC-4100**: now consistent every time ✓' },
            { hesap:'320', ad:'Trade payables', alacak:118000 },
          ], not:'The same input now produces **the same result every time**, no matter which ' +
                 'day it runs.' },
        tabloEtkisi:[
          { tablo:'SXS_ATTR', ne:'`MULTIPLE_USE` is still flagged, but now only **one** implementation is active' },
          { tablo:'BSEG', ne:'`PRCTR` is now determined consistently' },
        ],
        not:'**Historical postings weren\'t corrected.** The items that landed randomly ' +
             'between 2027 and 2028 still stand as they are; fixing them would need a ' +
             'transfer inside CO: FI is already correct.' },

      { baslik:'Permanent measures', tcode:'SE18',
        aciklama:'Four measures so this class of error doesn\'t repeat.',
        girdi:[
          { alan:'Measure 1', deger:'**An inventory of all active BAdI implementations was taken**: 11 definitions turned up 14 active implementations, 6 with a blank description' },
          { alan:'Measure 2', deger:'For every definition open to multiple use, **the number and purpose of its implementations** were documented' },
          { alan:'Measure 3', deger:'Checking {{SE18}} → the Implementations tab before writing a new implementation became **standard practice**' },
          { alan:'Measure 4', deger:'The inventory list was added to the project documentation, to be carried over at handover' },
        ],
        not:'**The first measure turned up the most.** Of 14 active implementations, 6 had a ' +
             'blank description, and two of them (as in this scenario) targeted the same ' +
             'field.\n\n' +
             'This inventory exercise is concrete proof of why the BAdI topic needs the same ' +
             'periodic-review discipline described in {{konu:best-practices}}.' },
    ],

    sonuc:
      '**An undocumented BAdI definition, open to multiple use, produced unpredictable ' +
      'results for a year because of two independent implementations.**\n\n' +
      '**Four critical lessons:**\n\n' +
      '**1. The multiple-use trap is a degree harder than the substitution trap.** A ' +
      'substitution in {{konu:dogrulama-ikame}} is at least a **single** rule, and its ' +
      'behavior is predictable. A BAdI open to multiple use can have two independent, ' +
      'mutually unaware implementations targeting the same field, and the result depends on ' +
      'an execution order **SAP never guarantees**.\n\n' +
      '**2. Diagnosis always starts at {{SE18}} → the Implementations tab.** No assumption ' +
      'made without knowing how many implementations are active is reliable.\n\n' +
      '**3. A runtime error and a dump rarely point to the BAdI.** In this case no error even ' +
      'occurred: both implementations ran **correctly on their own**. The problem was ' +
      'simply that the two coexisted.\n\n' +
      '**4. Checking what already exists before writing a new implementation is mandatory.** ' +
      'Had the 2027 team opened {{SE18}} and seen the implementation left over from 2024, ' +
      'they would have either extended it or built a deliberate priority. **The active-' +
      'implementation inventory needs periodic review**: just like the active-substitution ' +
      'inventory in {{konu:dogrulama-ikame}}.',
  },

  },
});
