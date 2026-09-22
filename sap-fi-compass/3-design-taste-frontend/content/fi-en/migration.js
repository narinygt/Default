/* ==========================================================================
   content/fi-en/migration.js: English body for "Migration"
   Same conventions as content/fi-en/gl-accounting.js: see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'migration',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'Data migration is the transfer of information from the legacy system into S/4HANA.\n\n' +
      'This definition is correct, but it doesn\'t say **where the work gets hard**. ' +
      '{{konu:lsmw}} and {{konu:data-upload}} explained *how* the transfer happens; ' +
      'this topic explains the decision about **what** gets transferred.\n\n' +
      '---\n\n' +
      '**This topic\'s thesis:**\n\n' +
      '**Migration isn\'t a data-moving job, it\'s an accounting decision about ' +
      'which *history* gets carried forward.**\n\n' +
      'Anyone can learn a loading tool. The hard part is answering this ' +
      'question:\n\n' +
      '*"Will we be able to see last year\'s income statement in the new system?"*\n\n' +
      'This question is answered **by approach, not by tool**, and there\'s ' +
      'no going back once it\'s answered wrong: after go-live you can\'t decide ' +
      '"let\'s bring the history too" after the fact.\n\n' +
      '---\n\n' +
      'There are three approaches, and all three answer the **history** question differently:\n\n' +
      '**{{greenfield}}**: the system is built from scratch, only balances and ' +
      'open items are transferred. *History stays in the legacy system.*\n\n' +
      '**{{brownfield}}**: the existing system is converted in place. ' +
      '*History comes along too: accumulated errors included.*\n\n' +
      '**{{secici-gecis}}**: a new system is built but selected history is carried over. ' +
      '*Expensive, but the middle ground between the two.*',

    neden:
      '**The new system can\'t open empty.** The company\'s payables, receivables, inventory, and ' +
      'assets are still there on migration day; accounting has to be uninterrupted.\n\n' +
      '**Legal continuity.** Financial statements are presented comparatively throughout the year; ' +
      'the auditor asks for last year\'s figures.\n\n' +
      '**Processes don\'t run without master data.** No vendor, no invoice entry; ' +
      'no {{mutabakat-hesabi}}, no posting to the vendor.\n\n' +
      '**One shot.** The migration happens over a single weekend. {{deneme-gecisi}} can be ' +
      'run over and over; the real one happens **once**.',

    sirketOnemi:
      'The most common mistake in migration projects is thinking of data migration as a ' +
      '**technical work package**. It isn\'t: it\'s where accounting decisions get concentrated.\n\n' +
      'Three examples, all of which look technical but are really accounting decisions:\n\n' +
      '**1.** *"Should we transfer vendor balances in bulk?"* → If transferred in bulk, ' +
      '{{F110}} won\'t work. This isn\'t a loading preference, it\'s a decision about the **payment process**.\n\n' +
      '**2.** *"Which chart of accounts will we use?"* → The {{hesap-plani}} is a ' +
      '{{tek-yonlu-kapi}}; it can\'t be changed in production.\n\n' +
      '**3.** *"How many years back should we go?"* → The answer isn\'t "as far as possible." ' +
      'Every extra year requires transferring **all of that year\'s movements** and ' +
      'that period\'s configuration (tax rates, chart of accounts, exchange rates).\n\n' +
      '---\n\n' +
      '**The real lesson for a consultant:** the data migration team alone can\'t answer any of ' +
      'these questions. The answers come from the **CFO** and the **auditor**. The consultant\'s ' +
      'job is to ask the question at the right time and in the right way:\n\n' +
      '*"If the auditor asks for the 2027 income statement in February, ' +
      'where will we pull it from?"*',

    gercekHayat:
      'Project manager: *"The data migration team is set up, they start in August."*\n\n' +
      'There are two mistakes in that sentence.\n\n' +
      '**First mistake: "team".** Data migration isn\'t one team\'s job, it\'s ' +
      'a **chain of decisions**. Which data gets transferred is decided by the business side, ' +
      'how it gets mapped by the consultant, and its cleanup by the data owner.\n\n' +
      '**Second mistake: "start in August".** Data cleansing starts on the project\'s ' +
      '**first day**. What starts in August is the loading; ' +
      'cleansing has to be done by then.\n\n' +
      '---\n\n' +
      '**The correct sequence is built backwards:**\n\n' +
      '**1.** The go-live date is fixed.\n' +
      '**2.** Count backward: when is the last {{deneme-gecisi}}?\n' +
      '**3.** Data must be **frozen** before that.\n' +
      '**4.** Cleansing must be finished before the freeze.\n' +
      '**5.** The cleansing work plan **is the error list from the first trial load**.\n\n' +
      'If this chain isn\'t built, cleansing always stays "for later" and ' +
      'the cutover weekend is where it catches up with you.',

    muhasebeMantigi:
      'The data carried in a migration falls into **three classes**, and accounting-wise ' +
      'the three are completely different:\n\n' +
      '**① {{ana-veri}}**: vendor, customer, G/L account, asset master data.\n' +
      '**Doesn\'t produce** an accounting posting. If wrong, it\'s corrected.\n\n' +
      '**② {{acilis-bakiyesi}}**: balances and open items.\n' +
      '**Produces** an accounting posting. If wrong, {{FB08}} is needed and a trail is left.\n\n' +
      '**③ History**: prior years\' movements.\n' +
      'Comes along only in {{brownfield}} or {{secici-gecis}}.\n\n' +
      '---\n\n' +
      '**The critical distinction inside the second class:**\n\n' +
      '**Balance sheet accounts** carry forward: their balances are transferred.\n' +
      '**Income statement accounts don\'t carry forward**: they\'re zeroed out at ' +
      'period end and moved to profit/loss ({{bakiye-devri}}).\n\n' +
      '**The consequence: income statement accounts have no opening balance.** ' +
      'That means in a {{greenfield}} migration, **the prior year\'s income statement never ' +
      'forms at all in the new system**: not because it was loaded incompletely, but ' +
      '**by accounting\'s very nature**.\n\n' +
      'If a comparative income statement is required, one of three paths is chosen: ' +
      '(a) the prior year\'s **movements** are also transferred, (b) the legacy system ' +
      'stays **readable**, (c) the statements are kept outside the system. ' +
      'All three are decisions, and **made before migration**.',

    kavramlar: ['greenfield', 'brownfield', 'secici-gecis', 'cvi',
                'basitlestirme-listesi', 'acilis-bakiyesi', 'kesme-plani', 'deneme-gecisi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'The migration process **starts with a decision, continues with a tool, and ends with reconciliation**. ' +
      'The tool is the middle link: the part that gets talked about the most but carries the least risk.',

    roller:[
      { rol:'CFO', gorev:'**Makes the history decision**: is a comparative statement required?' },
      { rol:'Project manager', gorev:'Chooses the approach: {{greenfield}} · {{brownfield}} · {{secici-gecis}}' },
      { rol:'Consultant', gorev:'Runs the {{basitlestirme-listesi}} and identifies blockers.' },
      { rol:'Consultant', gorev:'Builds the {{hesap-plani}} mapping: **n:1 transfers, 1:n doesn\'t**.' },
      { rol:'Data owner', gorev:'Cleanses the master data. **This job doesn\'t belong to the consultant.**' },
      { rol:'Consultant', gorev:'Sets up {{LTMC}} objects and writes the {{alan-esleme}}.' },
      { rol:'Project team', gorev:'**{{deneme-gecisi}}**: at least three rounds, timings are measured.' },
      { rol:'Consultant', gorev:'Writes the {{kesme-plani}}; sets the rollback point.' },
      { rol:'Accounting', gorev:'Performs and signs off the **three-level reconciliation**.' },
      { rol:'IT', gorev:'Leaves the legacy system **readable**: doesn\'t shut it down.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'Migration: from decision to reconciliation',
      adimlar:[
        { ic:'❓', rol:'Decision', baslik:'Step 0: "Are we transferring history?"',
          aciklama:'Answered **before** the tool is chosen. The answer determines the approach ' +
                   'and can\'t be changed afterward.',
          cikti:'Approach: greenfield / brownfield / selective', ok:'scope follows' },
        { ic:'📋', rol:'Preparation', baslik:'{{basitlestirme-listesi}} is run',
          aciklama:'Which function changed, which was dropped, which is a **blocker**? ' +
                   'The project plan can\'t be made without this output.',
          cikti:'Blocker list', ok:'cleansing starts' },
        { ic:'🧹', rol:'Data owner', baslik:'Data cleansing: starts **on the project\'s first day**',
          aciklama:'Duplicate vendors, missing tax numbers, invalid country codes, ' +
                   'a {{odeme-kosulu}} with no SAP counterpart.\n\n' +
                   'The work plan is the **error list from the first trial load**.',
          cikti:'Clean source data', ok:'gets mapped' },
        { ic:'🔗', rol:'Consultant', baslik:'Chart-of-accounts mapping: **n:1 yes, 1:n no**',
          aciklama:'Two old accounts **can merge** into one new account. ' +
                   'One old account **can\'t be split** into two new accounts: ' +
                   'the old balance doesn\'t carry the information of how much belongs to which part.',
          cikti:'Mapping table', ok:'BP conversion' },
        { ic:'👥', rol:'Consultant', baslik:'{{cvi}}: vendor/customer → {{is-ortagi}}',
          aciklama:'**In brownfield, BEFORE the technical conversion**, while still on ECC. ' +
                   'The step projects get delayed on most often; the reason isn\'t technical, it\'s **data quality**.',
          cikti:'{{BUT000}} records', ok:'gets loaded' },
        { ic:'⬆️', rol:'Consultant', baslik:'Master data → {{LTMC}} Migration Cockpit',
          aciklama:'Ready-made objects, pre-mapped templates, and ' +
                   '**pre-load simulation**. The concepts are the same as {{konu:lsmw}}.',
          cikti:'Master data', ok:'the balance follows' },
        { ic:'⚖️', rol:'Accounting', baslik:'{{acilis-bakiyesi}}: against the migration clearing account',
          aciklama:'G/L **in bulk**, {{acik-kalem}} accounts **item by item**, ' +
                   'fixed assets via {{AS91}}.\n\n' +
                   'Income statement accounts **aren\'t transferred**: they have no balance.',
          cikti:'Opening documents', ok:'rehearsal' },
        { ic:'🎭', rol:'Project team', baslik:'{{deneme-gecisi}}: at least three rounds',
          aciklama:'**①** technical (does it work) · **②** business (is it correct) · ' +
                   '**③** full rehearsal (**does the timing hold**).\n\n' +
                   'The rehearsal\'s real output isn\'t the data, it\'s **how many minutes each step took**.',
          cikti:'Measured timings', ok:'the cutover plan is written' },
        { ic:'🗓️', rol:'Project manager', baslik:'{{kesme-plani}}: minute by minute',
          aciklama:'Freeze → extract → load → reconcile → approve → open.\n\n' +
                   'The most important line is the last one: **at what time is the rollback decision made?**',
          cikti:'Approved plan', ok:'migration' },
        { ic:'✓', rol:'Accounting', baslik:'Three-level reconciliation',
          aciklama:'**Technical** (count + amount) → **accounting** (does the trial balance match, ' +
                   'is the migration clearing account zero) → **legal** (do the balance sheet and income statement ' +
                   'match the legacy system exactly).',
          cikti:'Signed-off reconciliation', ok:'opening' },
        { ic:'🔒', rol:'IT', baslik:'The legacy system is left **readable**',
          aciklama:'It has to stay accessible for the legal retention period. ' +
                   'In Turkey, periods with {{e-defter}} and {{berat}} filed ' +
                   'must additionally remain provable.',
          cikti:'Read-only archive' },
      ],
    },

    adimlar:[
      { rol:'Finance', eylem:'The history decision is made', sistem:'Meeting: not in the system' },
      { rol:'Consultant', eylem:'The simplification list is run', sistem:'{{basitlestirme-listesi}}' },
      { rol:'Data owner', eylem:'Master data is cleansed', sistem:'Source system' },
      { rol:'Consultant', eylem:'Chart-of-accounts mapping is built', sistem:'n:1 · **not 1:n**' },
      { rol:'Consultant', eylem:'{{cvi}} conversion', sistem:'**Before** the conversion' },
      { rol:'Consultant', eylem:'Master data is loaded', sistem:'{{LTMC}} / {{LTMOM}}' },
      { rol:'Accounting', eylem:'Opening balances are entered', sistem:'{{FB01}} · {{AS91}}' },
      { rol:'Team', eylem:'Trial migration × 3', sistem:'Timing is **measured**' },
      { rol:'Accounting', eylem:'Three-level reconciliation', sistem:'{{F.01}} · {{FS10N}} · {{FBL1N}}' },
      { rol:'Consultant', eylem:'The migration period is closed', sistem:'{{OB52}}' },
    ],

    veriAkisi:{
      nereden:'The legacy ERP (SAP ECC or another system) + manually prepared opening tables.',
      nereye:'S/4HANA master data tables, {{BKPF}}/{{ACDOCA}}, {{ANLA}}/{{ANLC}}.',
      tetikleyen:'The time in the {{kesme-plani}}: the migration is started manually.',
      sonraki:'Three-level reconciliation → period close via {{OB52}} → go-live opening.',
    },

    notlar:[
      { tip:'warn', baslik:'The approach decision can\'t be undone: the real cost of the three options', metin:
        'The three approaches are usually debated in terms of "cost." The real difference isn\'t ' +
        'the cost: it\'s **where you\'ll end up regretting it later**.\n\n' +
        '---\n\n' +
        '**{{greenfield}}: a clean start**\n\n' +
        'The legacy system\'s accumulated errors, dead {{z-gelistirme}}s, and dirty data **don\'t come along**. ' +
        'Processes can be built {{standarda-yakin}}.\n' +
        '**History doesn\'t come along.** A comparative income statement doesn\'t form on its own. ' +
        'Users end up having to look at two systems.\n' +
        '→ *Regret point:* audit and management reporting.\n\n' +
        '**{{brownfield}}: in-place conversion**\n\n' +
        'History comes along, user habits are preserved, the cutover window is usually short.\n' +
        '**The legacy system\'s problems come along too.** A badly designed chart of accounts is still ' +
        'wrong after conversion: except now with **more data behind it**.\n' +
        'The {{SPDD}}/{{SPAU}} workload is directly proportional to the number of {{z-gelistirme}}s.\n' +
        '→ *Regret point:* "if we were renewing anyway, why are we still living with the same problems?"\n\n' +
        '**{{secici-gecis}}: the middle ground**\n\n' +
        'Processes are renewed **and** selected history comes along.\n' +
        'The most expensive option; needs a third-party tool and expertise.\n' +
        '→ *Regret point:* budget.\n\n' +
        '---\n\n' +
        '**The decision rule:** if you\'re happy with your processes and need history, choose ' +
        '**brownfield**; if you want to renew your processes and can keep history in the legacy system, choose ' +
        '**greenfield**. If neither works, it\'s **selective**: and that has a price.' },

      { tip:'err', baslik:'There\'s no such thing as "we\'ll transfer it later"', metin:
        'Adding historical data after go-live is **technically possible but practically not feasible**.\n\n' +
        'The reason in one sentence: **the new system is now producing its own data.**\n\n' +
        'Loading history afterward requires:\n\n' +
        '• Number ranges that **don\'t collide**: live documents may have already used up those ranges\n' +
        '• Reopening closed periods ({{OB52}}): and closing them again\n' +
        '• The loaded history **not colliding** with live balances: the opening balance already contains that history\n' +
        '• In Turkey: periods with {{berat}} filed being **legally finalized**\n\n' +
        'The last point alone is enough: adding a document retroactively to a period that already ' +
        'has its berat is a regulatory problem, not a technical one.\n\n' +
        '**That\'s why the history decision is a {{tek-yonlu-kapi}}** and ' +
        'is given in writing, at the start of the project.' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The accounting side of migration is built **around a single account**: ' +
      'the migration clearing account. It sits on the offsetting side of every opening posting and ' +
      '**must reach zero** once loading is finished.\n\n' +
      'The documents below are the opening postings of a {{greenfield}} migration; ' +
      'all of them are dated **31.12.2027** and use a special {{belge-turu}} (`ZE`) ' +
      'defined for the migration.',

    etkilenenHesaplar:[
      { hesap:'399 Migration clearing account', tur:'Temporary', neden:'The offset for the entire opening. **Must end at zero.**' },
      { hesap:'100 / 102 / 153', tur:'Balance sheet: Current assets', neden:'Transferred **in bulk** as a balance.' },
      { hesap:'253 / 257', tur:'Balance sheet: Fixed assets', neden:'{{AS91}} opens the master data; the G/L side comes with a **separate** document.' },
      { hesap:'320 Trade payables', tur:'Balance sheet, Liabilities', neden:'{{acik-kalem}}, **each invoice, a separate document**.' },
      { hesap:'120 Trade receivables', tur:'Balance sheet, Assets', neden:'{{acik-kalem}}, **each invoice, a separate document**.' },
      { hesap:'600 / 770 (income statement)', tur:'Result', neden:'**Not transferred.** They have no carried-forward balance.' },
    ],

    fisler:[
      { baslik:'① Current assets opening: **balance in bulk**',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'100', ad:'Cash', borc:185000 },
          { hesap:'102', ad:'Banks', borc:3240000 },
          { hesap:'153', ad:'Merchandise', borc:2760000 },
          { hesap:'399', ad:'Migration clearing account', alacak:6185000, not:'offsetting account' },
        ],
        not:'A balance is enough on G/L accounts **without** {{acik-kalem}} management; ' +
             'there\'s no need to transfer items.\n\n' +
             '**Exception:** G/L accounts with open item management **on** ' +
             '(GR/IR, clearing accounts) are still transferred **item by item**: ' +
             'otherwise automatic clearing via {{F.13}} can\'t work.' },

      { baslik:'② Open vendor item: **item by item**',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Migration clearing account', borc:348000 },
          { hesap:'320', ad:'Trade payables: ABC Ltd. (invoice 2027/4419)', alacak:348000,
            not:'due 15.02.2028 · {{BSIK}} open item' },
        ],
        not:'Every open invoice is transferred as a **separate document**, and ' +
             'the **due date and {{odeme-kosulu}} are preserved**.\n\n' +
             'If transferred in bulk: {{F-53}} can\'t make a payment (no item to clear), ' +
             '{{F110}} doesn\'t work, {{F150}} can\'t produce a dunning notice, and the {{FBL1N}} listing becomes meaningless.\n\n' +
             'The **legacy system document number** is written into the reference field (`XBLNR`): ' +
             'that\'s the bridge between the two systems.' },

      { baslik:'③ **WRONG DOCUMENT**: transferring an income statement account',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'399', ad:'Migration clearing account', borc:42600000 },
          { hesap:'600', ad:'Domestic sales: 2027 revenue', alacak:42600000,
            not:'this line **should not exist**' },
        ],
        not:'**This document is balanced, the system accepts it, and it\'s still wrong.**\n\n' +
             'The equality check holds, no error message appears: ' +
             'a textbook example of the **② silent error** class from {{konu:error-handling}}.\n\n' +
             '**Why it\'s wrong:** income statement accounts are **zeroed out** at period end ' +
             '({{bakiye-devri}}); they have no carried-forward balance. ' +
             'A posting like this writes 2027\'s revenue **into 2028\'s opening**.\n\n' +
             '**Consequence:** 2028\'s income statement starts from day one with ' +
             'TRY 42.6 million of revenue and stays wrong all year.\n\n' +
             '**The correct approach:** 2027\'s revenue is **not transferred** into the new system. ' +
             'If a comparative statement is needed, the fix isn\'t this document, ' +
             'it\'s the approach decision (see §1 and the real scenario).' },

      { baslik:'④ Chart-of-accounts split (1:n): **can\'t be done without going back to the source**',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'102.01', ad:'Bank X: demand deposit', borc:1980000 },
          { hesap:'102.02', ad:'Bank Y: demand deposit', borc:1260000 },
          { hesap:'399', ad:'Migration clearing account', alacak:3240000 },
        ],
        not:'This document replaces the single `102` line from ①.\n\n' +
             '**The topic\'s most practical rule lives here:**\n\n' +
             '**n:1 can be transferred**: if two old accounts merge into one new account, ' +
             'the balances are just summed, job done. It\'s automatic.\n\n' +
             '**1:n can\'t be transferred**: if one old account splits into two new accounts, ' +
             'the old balance **doesn\'t carry the information of how much belongs to which part**. ' +
             'The 1,980,000 and 1,260,000 figures above *don\'t come from* the old balance; ' +
             'they were pulled by hand from bank statements.\n\n' +
             '**The practical consequence:** if a split is needed, it\'s either done in the legacy ' +
             'system **before migration**, or a **separate data source** is found for manual distribution. ' +
             'The mapping table can\'t solve this.' },

      { baslik:'⑤ Fixed asset transfer: {{AS91}} **doesn\'t produce** an accounting posting',
        belgeTuru:'ZE', tarih:'31.12.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'253', ad:'Plant, machinery and equipment: acquisition value', borc:12400000 },
          { hesap:'257', ad:'Accumulated depreciation', alacak:4180000 },
          { hesap:'399', ad:'Migration clearing account: net book value', alacak:8220000 },
        ],
        not:'**Two separate jobs, two separate places:**\n\n' +
             '**1.** {{AS91}} opens the asset master data **together with its accumulated depreciation**. ' +
             'This transaction writes {{ANLC}} but **doesn\'t produce an accounting posting**.\n' +
             '**2.** The G/L side is posted **separately** with this document.\n\n' +
             '**The two have to reconcile.** If they don\'t, asset accounting and the trial balance diverge, ' +
             'and the error surfaces **not at migration but at year-end**, during {{AJAB}} closing: ' +
             'which is to say, in the most expensive place possible.\n\n' +
             'The check is simple: the {{AR01}} asset list total = the `253` − `257` balance.\n\n' +
             'The **depreciation start date** also has to be transferred; ' +
             'otherwise {{AFAB}} calculates the remaining useful life wrong ' +
             '(see {{konu:asset-accounting}}).' },
    ],

    tHesaplar:[
      { hesap:'Migration clearing account: once the whole load is done', kod:'399',
        borc:[
          { ad:'Vendor open items', tutar:8940000 },
          { ad:'Other liabilities and equity', tutar:13650000 },
        ],
        alacak:[
          { ad:'Current assets', tutar:6185000 },
          { ad:'Customer open items', tutar:8185000 },
          { ad:'Net fixed asset value', tutar:8220000 },
        ],
        not:'**Zero = the load is complete.** If not zero, something is missing or extra: there\'s no other explanation' },
    ],

    notlar:[
      { tip:'tip', baslik:'Three-level reconciliation: none substitutes for another', metin:
        'In {{konu:lsmw}}, a single check was enough: is the migration clearing account zero? ' +
        'In migration, **the scale changes** and three separate levels are needed. ' +
        'The three answer **different questions**:\n\n' +
        '---\n\n' +
        '**① Technical reconciliation: "did it load?"**\n\n' +
        'Records sent = records created · source amount total = system amount total.\n' +
        'If the count matches but the amount doesn\'t → a {{donusum-kurali}} error (decimal separator, exchange rate).\n' +
        '*The data migration team does this.*\n\n' +
        '**② Accounting reconciliation: "is it correct?"**\n\n' +
        'Migration clearing account is **zero** · new trial balance = old trial balance · ' +
        '{{FBL1N}} vendor balance = {{FS10N}} account `320` balance · ' +
        '{{AR01}} asset total = `253` − `257`.\n' +
        '*Accounting does this.*\n\n' +
        '**③ Legal reconciliation: "can it be presented?"**\n\n' +
        'Does the {{F.01}} balance sheet match the legacy system\'s balance sheet **exactly**? ' +
        'Is the "unassigned accounts" line **zero**? ' +
        'If it\'s not empty, the presentation is **wrong even if the trial balance is right** ' +
        '(see {{konu:reporting}}).\n' +
        '*The auditor asks this: ask it yourself before they do.*\n\n' +
        '---\n\n' +
        '**Why all three are needed:** ① can pass while ② doesn\'t (the right count loaded into ' +
        'the wrong accounts). ② can pass while ③ doesn\'t (balances are correct but the ' +
        '{{mali-tablo-yapisi}} is incomplete). ' +
        '**Each level catches an error the previous one couldn\'t see.**' },

      { tip:'warn', baslik:'Opening date and period: a commonly missed detail', metin:
        'Opening postings are dated **one day before** the migration year: ' +
        '**31.12.2027** for a 2028 go-live.\n\n' +
        'This has three consequences:\n\n' +
        '**1.** In {{OB52}}, **period 2027/12 must be open**: and **closed** once loading ' +
        'is finished. If left open, a live user can post to a past period by mistake.\n' +
        '**2.** In {{FBN1}}, the migration document type\'s number range must cover ' +
        '**fiscal year 2027**. Defining a 2028 range and trying to cut a document dated ' +
        '31.12.2027 is a classic mistake.\n' +
        '**3.** A **separate {{belge-turu}}** is defined for migration documents. ' +
        'Years later, *"where did this balance come from?"* can only be answered by ' +
        'filtering on {{BKPF}}.`BLART`.\n\n' +
        'Once migration is finished, posting authorization to that document type is ' +
        '**removed**: so a migration posting can\'t be made by mistake.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Migration has three separate classifications and they shouldn\'t be mixed up: ' +
      '**approach** (what to do about history), **data class** (what to transfer), and ' +
      '**tool** (how to transfer it).\n\n' +
      'Most of the debate happens over the third one, but most of the risk is in the **first**.',

    liste:[
      /* --- Approaches --- */
      { ad:'New Implementation',
        aciklama:'The system is built from scratch; only master data, balances, and open items are transferred.',
        neZaman:'When processes will be renewed and history can be kept in the legacy system.',
        ornek:'**What comes along:** master data · {{acilis-bakiyesi}} · open items · fixed assets.\n\n' +
              '**What doesn\'t:** prior years\' movements · cleared items · ' +
              '**income statement history**.\n\n' +
              '**Hidden cost:** users end up looking at **two systems** for a while. ' +
              'If that period isn\'t planned for, "we can\'t shut down the old system" becomes permanent.',
        tcodes:['LTMC'] },

      { ad:'System Conversion',
        aciklama:'The existing ECC system is converted **in place** to S/4HANA.',
        neZaman:'When you\'re happy with your processes and history is essential.',
        ornek:'**Three mandatory steps, in a fixed order:**\n\n' +
              '**①** {{cvi}}: vendor/customer → {{is-ortagi}} (**before** the conversion)\n' +
              '**②** Chart-of-accounts prep: primary {{masraf-turu}}s turn into G/L accounts\n' +
              '**③** Financial data conversion: {{BSEG}} + `FAGLFLEXA` + `COEP` → {{ACDOCA}}\n\n' +
              '{{basitlestirme-listesi}} beforehand, {{SPDD}} and {{SPAU}} during.\n\n' +
              '**The third step can\'t be undone.** A full backup is taken beforehand, and ' +
              'rolling back means a **database restore**.',
        tcodes:['SPDD','SPAU'] },

      { ad:'Selective Data Transition',
        aciklama:'A new system is built, but **selected** history is carried over.',
        neZaman:'When both process renewal and history are needed, and budget allows.',
        ornek:'Example scope: *"the last 3 years of FI documents + all open items + ' +
              'active company codes only"*.\n\n' +
              'Needs a third-party tool and expertise. In multi-company groups, a ' +
              '**hybrid** approach is common: some company codes are converted, ' +
              'others are built from scratch.\n\n' +
              'An alternative bridge: {{merkezi-finans}}: source systems stay in place, ' +
              'only reporting gets centralized.' },

      /* --- Data classes --- */
      { ad:'Master Data',
        aciklama:'Vendor, customer, G/L account, asset, material.',
        neZaman:'Transferred in every approach.',
        ornek:'**Doesn\'t produce** an accounting posting: which is why it\'s the lowest-risk class.\n\n' +
              'But most of the **delay** comes from here: data quality issues ' +
              '(duplicate records, missing tax numbers) blow up here.\n\n' +
              '**The dependency order is critical:** general data ({{LFA1}}) → ' +
              'company-code data ({{LFB1}}) → then transactions. ' +
              'If the second step is skipped, the vendor opens but **can\'t be posted to**: ' +
              'there\'s no `AKONT` {{mutabakat-hesabi}}.',
        tcodes:['LTMC','XK01','FS00'] },

      { ad:'Opening Balances',
        aciklama:'Balances and open items.',
        neZaman:'In every approach; in brownfield it\'s already in place.',
        ornek:'**Produces** an accounting posting: this is the riskiest class.\n\n' +
              'Three sub-rules: G/L **in bulk** · {{acik-kalem}} accounts **item by item** · ' +
              'fixed assets via {{AS91}} with the **G/L side separate**.\n\n' +
              'Checked with a single number: **is the migration clearing account zero?**',
        tcodes:['FB01','AS91'] },

      { ad:'Historical Data',
        aciklama:'Prior years\' movements, cleared items, old documents.',
        neZaman:'Only in {{brownfield}} and {{secici-gecis}}.',
        ornek:'**This is the class the topic\'s core decision is really about.**\n\n' +
              'Transferring it is expensive because it needs not just the data but also **that ' +
              'period\'s configuration**: the tax rates in effect then, the chart of accounts of the ' +
              'day, the exchange rates of that date.\n\n' +
              'In Turkey there\'s an extra layer: periods with {{berat}} filed are ' +
              '**legally finalized**. Documents belonging to those periods looking different in the ' +
              'new system is a regulatory problem.' },

      /* --- Tools --- */
      { ad:'Migration Cockpit',
        aciklama:'S/4HANA\'s standard data migration tool; replaced {{LSMW}}.',
        neZaman:'**Default** on new S/4HANA projects.',
        ornek:'**Three gains over {{LSMW}}:**\n\n' +
              '• **Ready-made objects**: vendor, customer, G/L account, asset, open item\n' +
              '• **Pre-mapped template**: Excel columns come mapped to SAP fields, ' +
              'most of the {{alan-esleme}} work disappears\n' +
              '• **Pre-load simulation**: errors are seen without data being written\n\n' +
              'If the standard object isn\'t enough, {{LTMOM}} adds fields and writes rules.\n\n' +
              '**The concepts stayed the same:** {{alan-esleme}}, {{donusum-kurali}}, ' +
              'a trial run, {{sayi-mutabakati}}: all as learned in {{konu:lsmw}}.',
        tcodes:['LTMC','LTMOM'] },
    ],

    karsilastirmaBasliklar:['{{greenfield}}', '{{brownfield}}'],
    karsilastirma:[
      ['System', 'Built new', 'Converted in place'],
      ['History', '**Doesn\'t come along**', 'Comes along'],
      ['Comparative income statement', '**Doesn\'t form on its own**', 'Forms'],
      ['Old errors', '**Don\'t come along**', '**Come along**'],
      ['Process renewal', 'A natural opportunity', 'Needs a separate project'],
      ['{{z-gelistirme}} load', 'Chosen from scratch', 'Carried over via {{SPAU}}'],
      ['{{cvi}} conversion', 'Not needed: {{is-ortagi}} is already new', '**Prerequisite**'],
      ['Cutover window', 'Usually long', 'Usually short'],
      ['User habits', 'Relearned', 'Largely preserved'],
      ['Rollback', 'The legacy system keeps running', '**Database restore**'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    anlatim:
      'Migration\'s transaction codes fall into three groups: **loading** ({{LTMC}}), ' +
      '**asset transfer** ({{AS91}}), and **conversion** ({{SPDD}}/{{SPAU}}). ' +
      'Reconciliation, on the other hand, doesn\'t require learning a new code: ' +
      'it\'s done with reports you already know.',

    liste:[
      { kod:'LTMC', ad:'Migration Cockpit: data migration',
        amac:'Loads data using ready-made objects and pre-mapped templates; **simulates** before loading.',
        neZaman:'In every S/4HANA data migration. In place of {{LSMW}}.',
        adimlar:[
          { baslik:'Create the migration project',
            aciklama:'The target system and transfer method (file / staging table) are chosen.' },
          { baslik:'Choose the migration **object**',
            aciklama:'Vendor, customer, G/L account, asset, open item… each comes ready-made.' },
          { baslik:'**Download the template**: columns pre-mapped',
            aciklama:'Most of the {{konu:lsmw}} "step 6" work disappears here.' },
          { baslik:'Fill in and load',
            aciklama:'Keep columns in **text** format: so leading zero padding doesn\'t get lost.' },
          { baslik:'Map: only the **unresolved** values',
            aciklama:'Mapping from the old code to the SAP code (payment term, country) is requested here.' },
          { baslik:'**Simulate**: see errors without data being written',
            aciklama:'A step LSMW doesn\'t have; the first error list is the data-cleansing work plan.' },
          { baslik:'Load and **reconcile**',
            aciklama:'Count **and** amount. Then, is the migration clearing account zero?' },
        ],
        ekranAkisi:[
          { ekran:'Project', islem:'*"S4 Migration 2028"* project opened, file method chosen' },
          { ekran:'Object', islem:'*"Vendor"* object added → template downloaded (**41 columns**)' },
          { ekran:'Filling in', islem:'12,000 rows filled in' },
          { ekran:'Simulation', islem:'**847 errors**: 340 missing tax numbers · 89 invalid country codes · 418 unmapped payment terms' },
          { ekran:'Mapping', islem:'The mapping table was filled in for 418 records → errors dropped to **429**' },
          { ekran:'Cleansing', islem:'The remaining 429 records went to **the business side**: the consultant doesn\'t fix these' },
          { ekran:'Load', islem:'11,571 vendors loaded · the 429 in a second round' },
        ],
        alanlar:{
          zorunlu:['Project','Migration object','Source file'],
          opsiyonel:['Mapping values','Field extension ({{LTMOM}})'] },
        hatalar:[
          { mesaj:'"Value not mapped" warning on hundreds of rows', sebep:'The legacy system\'s code has no defined SAP counterpart.', cozum:'Filled in bulk at the mapping step; if there genuinely is no counterpart, **it\'s defined in SAP**. A "leave it blank" decision reproduces the `ZWELS` trap from {{konu:lsmw}}.' },
          { mesaj:'Simulation is clean but the load throws an error', sebep:'Simulation can\'t fully foresee **lock and number-range** conditions.', cozum:'{{KANK}} / {{FBN1}} ranges are checked; load parallelism is reduced for {{kilitleme}}.' },
          { mesaj:'Account number "not found" but the account exists', sebep:'**Leading zero padding**: Excel dropped the leading zeros.', cozum:'The column is kept in **text** format ({{donusum-kurali}}).' },
          { mesaj:'The field I need isn\'t in the template', sebep:'The standard object doesn\'t cover that field.', cozum:'The object is extended with {{LTMOM}}. An extended object is now **your responsibility to maintain**.' },
        ],
        ipucu:'**Run the simulation step every time the data is updated, not just once.** ' +
              'Simulation is free and doesn\'t write data; its only cost is time.\n\n' +
              'This is the {{konu:lsmw}} advice to *"try with 10-20 rows first"*, ' +
              '**built into the tool itself**.',
        ilgili:['LTMOM','LSMW','AS91'] },

      { kod:'AS91', ad:'Create legacy asset transfer',
        amac:'Opens the asset **together with its accumulated depreciation** during migration.',
        neZaman:'For fixed asset transfer; in place of the normal {{AS01}}.',
        adimlar:[
          { baslik:'Start with the asset class and company code' },
          { baslik:'Enter the master data: **including the depreciation start date**',
            aciklama:'Otherwise {{AFAB}} calculates the remaining useful life wrong.' },
          { baslik:'Enter the transfer values: acquisition value + accumulated depreciation',
            aciklama:'Separately for each {{amortisman-alani}}: local and {{ifrs}} can differ.' },
          { baslik:'Post the G/L side **separately**',
            aciklama:'{{AS91}} doesn\'t produce an accounting posting; the `253`/`257` document is entered manually.' },
          { baslik:'Reconciliation: {{AR01}} total = `253` − `257`' },
        ],
        ekranAkisi:[
          { ekran:'Master data', islem:'1,847 assets opened in bulk via {{LTMC}}' },
          { ekran:'Transfer values', islem:'Acquisition 12,400,000 · accumulated depreciation 4,180,000' },
          { ekran:'G/L document', islem:'253 debit / 257 + 399 credit: **separate document**' },
          { ekran:'Reconciliation', islem:'{{AR01}} net 8,220,000 = trial balance `253`−`257` ✓' },
          { ekran:'First {{AFAB}}', islem:'January 2028 depreciation compared against the **expected** amount' },
        ],
        alanlar:{
          zorunlu:['Asset class','Company code','Acquisition value','Accumulated depreciation','Depreciation start'],
          opsiyonel:['Inventory number','Cost center','Serial number'] },
        hatalar:[
          { mesaj:'Depreciation is higher/lower than expected in the first month', sebep:'The depreciation start date or remaining useful life was transferred wrong.', cozum:'Corrected in {{AS02}}. The **first {{AFAB}}** after migration is always checked by hand.' },
          { mesaj:'{{AJAB}} year-end closing throws an error', sebep:'Asset accounting and G/L have diverged.', cozum:'The trial balance is compared against {{AR01}}. The cause is usually the ⑤ G/L document being **forgotten** or posted twice.' },
          { mesaj:'"No account determination for asset class"', sebep:'The {{AO90}} assignment is missing.', cozum:'The asset class configuration is completed (see {{konu:asset-accounting}}).' },
        ],
        ipucu:'**The first depreciation run after migration is a test, not routine.** ' +
              'The expected amount is calculated before migration and compared against the {{AFAB}} ' +
              'result. If there\'s a difference, the cause is almost always the ' +
              '**depreciation start date** or the **remaining useful life**.',
        ilgili:['AS01','AFAB','AR01','AJAB'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'In migration, table knowledge serves two jobs: **reconciliation** (is the loaded data ' +
      'really there) and **diagnosis** (why not). There\'s no need to learn a new table: ' +
      'looking at familiar tables **through a migration lens** is enough.',

    liste:[
      { ad:'BKPF', baslik:'The only way to tell migration documents apart',
        tutar:'Document header: migration postings are filtered by `BLART`.',
        olusturan:'Opening balance load',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Items are in {{ACDOCA}}.',
        s4:'Still there; items moved to {{ACDOCA}}.',
        alanlar:[
          { ad:'BLART', aciklama:'**A separate document type for migration**: the only way to tell it apart afterward' },
          { ad:'XBLNR', aciklama:'Reference: the **legacy system document number** is written here' },
          { ad:'BUDAT', aciklama:'Posting date: **31.12.2027** for migration' },
          { ad:'BKTXT', aciklama:'Header text: *"Opening balance 2027"*' },
        ] },

      { ad:'BUT000', baslik:'The target of the CVI conversion',
        tutar:'{{is-ortagi}} general data.',
        olusturan:'{{cvi}} conversion, or {{BP}}',
        anahtar:'PARTNER',
        iliskiler:'Company-code data is still in {{LFB1}} / {{KNB1}}.',
        s4:'**Mandatory.** You can\'t move to S/4HANA before the conversion is complete.',
        alanlar:[
          { ad:'PARTNER', aciklama:'The business partner number: **doesn\'t have to match** the vendor number' },
          { ad:'TYPE', aciklama:'Person / Organization / Group' },
          { ad:'NAME_ORG1', aciklama:'Legal name: the field used for duplicate detection' },
        ] },

      { ad:'LFB1', baslik:'Company-code data that has to be loaded separately',
        tutar:'The vendor\'s company-code-level data.',
        olusturan:'A separate load step',
        anahtar:'LIFNR + BUKRS',
        iliskiler:'Linked to the {{LFA1}} general data; in S/4 the identity sits in {{BUT000}}.',
        s4:'Still there: {{is-ortagi}} **didn\'t remove** this.',
        alanlar:[
          { ad:'AKONT', aciklama:'**{{mutabakat-hesabi}}**: if missing, the vendor can\'t be posted to' },
          { ad:'ZTERM', aciklama:'{{odeme-kosulu}}: must be defined in SAP' },
          { ad:'ZWELS', aciklama:'{{odeme-yontemi}}: if blank, {{F110}} **won\'t include the item in the proposal and won\'t throw an error**' },
        ] },

      { ad:'ANLC', baslik:'Asset values: the other end of the reconciliation',
        tutar:'Yearly values and accumulated depreciation, by asset.',
        olusturan:'{{AS91}} legacy asset transfer',
        anahtar:'BUKRS + ANLN1 + ANLN2 + GJAHR + AFABE',
        iliskiler:'Linked to the {{ANLA}} master data.',
        s4:'Still there; calculated values can also be produced from {{ACDOCA}}.',
        alanlar:[
          { ad:'KANSW', aciklama:'Acquisition value: should match the trial balance\'s `253`' },
          { ad:'KNAFA', aciklama:'Accumulated depreciation: should match the trial balance\'s `257`' },
          { ad:'AFABE', aciklama:'{{amortisman-alani}}: **a separate row** for each area' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'Load sequence: the dependency chain',
      varliklar:[
        { ad:'BUT000', rol:'Step 1', hub:true, aciklama:'**{{is-ortagi}}**: identity is opened first',
          alanlar:[{ ad:'PARTNER', tip:'pk' }, { ad:'TYPE' }] },
        { ad:'LFA1', rol:'Step 2', aciklama:'Vendor **general** data',
          alanlar:[{ ad:'LIFNR', tip:'pk' }, { ad:'STCD1' }] },
        { ad:'LFB1', rol:'Step 3', aciklama:'**Company-code data**: a separate load',
          alanlar:[{ ad:'LIFNR', tip:'fk' }, { ad:'BUKRS', tip:'pk' }, { ad:'AKONT' }] },
        { ad:'BKPF', rol:'Step 4', aciklama:'**Opening document**: master data must be ready',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'BLART' }, { ad:'XBLNR' }] },
        { ad:'ACDOCA', rol:'Result', aciklama:'Items and **open items**',
          alanlar:[{ ad:'BELNR', tip:'fk' }, { ad:'RACCT' }, { ad:'HSL' }] },
        { ad:'ANLC', rol:'Parallel', aciklama:'{{AS91}} asset values: **must reconcile with G/L**',
          alanlar:[{ ad:'ANLN1', tip:'fk' }, { ad:'KANSW' }, { ad:'KNAFA' }] },
      ],
      iliskiler:[
        { from:'BUT000', to:'LFA1', alanlar:'PARTNER', not:'{{cvi}} mapping' },
        { from:'LFA1', to:'LFB1', alanlar:'LIFNR', not:'**a separate load step**' },
        { from:'LFB1', to:'BKPF', alanlar:': ', not:'master data must come **first**' },
        { from:'BKPF', to:'ACDOCA', alanlar:'BELNR', not:'items are created' },
        { from:'ANLC', to:'ACDOCA', alanlar:': ', not:'**must reconcile**' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Three screens, three separate jobs: **{{LTMC}}** loads, **{{AS91}}** transfers the asset, and ' +
      '**{{OB52}}** opens and closes the migration period. ' +
      'The reconciliation screens aren\'t new: {{F.01}}, {{FS10N}}, {{FBL1N}}, {{AR01}}.',

    ekranlar:[
      { ad:'{{LTMC}}: Migration Cockpit',
        aciklama:'Project → object → template → simulation → load.',
        alanlar:[
          { ad:'Migration object', zorunlu:true, aciklama:'Chosen from the ready-made list; ' +
                   'extended with {{LTMOM}} if not there.' },
          { ad:'**Simulation**', zorunlu:false, aciklama:'Shows errors without writing data. ' +
                   'Looks optional, is **practically mandatory**.' },
          { ad:'Mapping values', zorunlu:false, aciklama:'Old code → SAP code. ' +
                   'A "leave it blank" decision must be written and approved.' },
        ],
        ipucu:'Simulation is re-run every time the data is updated: ' +
              'it\'s free and doesn\'t write data.' },

      { ad:'{{AS91}}: legacy asset transfer',
        aciklama:'Opens the asset with its historical values.',
        alanlar:[
          { ad:'**Depreciation start**', zorunlu:true, aciklama:'If not transferred, the remaining useful life ' +
                   'is calculated wrong and surfaces at the first {{AFAB}}.' },
          { ad:'Transfer values', zorunlu:true, aciklama:'**Separate** for each {{amortisman-alani}}.' },
          { ad:'G/L document', zorunlu:true, aciklama:'**Not** on this screen: posted separately.' },
        ],
        ipucu:'{{AS91}} is a master data transaction, not an accounting one. ' +
              'Making the two sides reconcile is **done by hand**.' },

      { ad:'{{OB52}}: migration period',
        aciklama:'Period 2027/12 is opened for opening postings, then closed.',
        alanlar:[
          { ad:'Period range', zorunlu:true, aciklama:'Open during loading, ' +
                   '**closed** once finished.' },
          { ad:'Account type', zorunlu:true, aciklama:'The `+` line takes priority ' +
                   '(see {{konu:closing}}).' },
        ],
        ipucu:'If the migration period stays open, a live user posts to a ' +
              '**past period** by mistake, and it\'s only noticed at closing.' },
    ],

    zorunlu:['Approach decision','Chart-of-accounts mapping','Clean master data','Migration document type'],
    opsiyonel:['Selected history','{{LTMOM}} field extension','Archive solution'],

    hatalar:[
      { mesaj:'The vendor is open but can\'t be posted to', sebep:'{{LFB1}} (company-code data) hasn\'t been loaded.', cozum:'**It\'s a separate load step.** `AKONT` {{mutabakat-hesabi}} is mandatory.' },
      { mesaj:'"Period closed": the opening posting won\'t go through', sebep:'Period 2027/12 is closed in {{OB52}}.', cozum:'Opened temporarily; **closed again once loading finishes**.' },
      { mesaj:'"No number range": for a 31.12.2027 document', sebep:'The {{FBN1}} range only covers fiscal year 2028.', cozum:'A **2027** range is defined for the migration document type.' },
      { mesaj:'The trial balance is right but the {{F.01}} balance sheet isn\'t', sebep:'The **"unassigned accounts"** line is populated: a new account wasn\'t added to the {{mali-tablo-yapisi}}.', cozum:'A range assignment is made in {{OB58}} (see {{konu:reporting}}).' },
      { mesaj:'{{AJAB}} year-end closing throws an error', sebep:'Asset accounting and G/L have diverged.', cozum:'The {{AR01}} total is compared against `253`−`257`; the G/L document may have been forgotten or posted twice.' },
      { mesaj:'The CVI conversion stalls with thousands of errors', sebep:'Data quality: duplicate records, missing tax numbers.', cozum:'This **isn\'t the consultant\'s job**. The list goes to the data owner; the conversion waits until cleansing is done.' },
      { mesaj:'The load is very slow / a {{kilitleme}} conflict', sebep:'Parallel jobs are touching the same master data.', cozum:'The split criterion should be the **locked object**, not the row number (see {{konu:data-upload}}).' },
      { mesaj:'The first {{AFAB}} differs from what was expected', sebep:'The depreciation start date or remaining useful life is wrong.', cozum:'Corrected with {{AS02}}. The first run after migration is **checked by hand**.' },
    ],

    ipuclari:[
      '**Get the history decision in writing at the start of the project**: it can\'t be moved later.',
      'In chart-of-accounts mapping, **n:1 yes, 1:n no**; a split requires going back to the source.',
      'Finish the {{cvi}} conversion in brownfield **before the technical conversion**.',
      'The data-cleansing work plan **is the error list from the first simulation**: run it early.',
      '**Don\'t transfer** income statement accounts; they have no balance.',
      'Open item accounts **item by item**, with the due date and payment term.',
      '{{AS91}} doesn\'t produce an accounting posting: the G/L document is entered **separately**.',
      '**Measure the timings** during {{deneme-gecisi}}; the cutover window is planned from that measurement.',
      'Define a **separate {{belge-turu}}** and a **separate number range** for migration.',
      'Do a three-level reconciliation: technical → accounting → **legal**.',
      '**Close** the migration period in {{OB52}} once loading is finished.',
      '**Don\'t shut down** the legacy system: it must stay readable for the legal retention period.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'BUT000', ne:'{{is-ortagi}}: **step 1**' },
      { tablo:'LFA1', ne:'Vendor general data' },
      { tablo:'LFB1', ne:'Company-code data: **separate load**' },
      { tablo:'BKPF', ne:'Opening documents: with a separate `BLART`' },
      { tablo:'ACDOCA', ne:'Opening items' },
      { tablo:'ANLC', ne:'{{AS91}} legacy asset transfer values' },
    ],

    commit:
      '{{LTMC}} loading commits **object by object**: a vendor either opens fully ' +
      'or not at all. This is the tool\'s own enforcement of the ' +
      '**document integrity** principle from {{konu:data-upload}}.\n\n' +
      'But there\'s no such guarantee for opening **documents**: if a multi-line opening ' +
      'document hits a {{guncelleme-hatasi}} while loading, the document number ' +
      'may have been assigned but the document never created.\n\n' +
      'That\'s why a **{{SM13}} check** after loading is part of the reconciliation: ' +
      'the count reconciliation catches this but doesn\'t say why.',

    belgeNo:
      '**A separate {{belge-turu}} and a separate number range** are defined for migration documents.\n\n' +
      'Three reasons:\n\n' +
      '**1. Auditability.** Years later, *"where did this balance come from?"* is answered by ' +
      'filtering on {{BKPF}}.`BLART`.\n' +
      '**2. Separability.** Migration postings don\'t mix with normal transactions; ' +
      'they can be excluded from reports.\n' +
      '**3. Closability.** Once migration is finished, posting authorization to that ' +
      'document type is **removed**.\n\n' +
      '**A commonly missed detail:** the range must cover **fiscal year 2027**. ' +
      'Opening documents are dated 31.12.2027; a 2028 range is useless.',

    postingLogic:
      'The load sequence **is a dependency chain**, and loading stops if it breaks:\n\n' +
      '**1. {{ozellestirme}}**: chart of accounts, document types, {{odeme-kosulu}}, ' +
      'tax codes, {{degerleme-plani}}. If missing, master data **can\'t load**.\n' +
      '**2. {{is-ortagi}}**: {{cvi}} conversion or direct {{BP}}\n' +
      '**3. Master data: general** ({{LFA1}}, {{KNA1}}, {{SKA1}})\n' +
      '**4. Master data: company code** ({{LFB1}}, {{KNB1}}, {{SKB1}}) **a separate step**\n' +
      '**5. Fixed asset master data** ({{AS91}})\n' +
      '**6. Opening balances**: G/L in bulk, open items item by item\n' +
      '**7. Reconciliation**: three levels\n\n' +
      '**Most commonly skipped: step 4.** The vendor opens, {{LFB1}} isn\'t loaded, and ' +
      'the complaint is *"can\'t post to the vendor."* Reason: no `AKONT`.',

    belgeTuru:
      'A special document type (e.g. `ZE`: *legacy system transfer*) is defined for migration. ' +
      'It\'s opened with {{OBA7}}, and a number range is given with {{FBN1}}.\n\n' +
      'A field is also used deliberately: the **legacy system document number** is written ' +
      'into the `XBLNR` reference. This is the only bridge between the two systems, and ' +
      'it\'s used in reconciliation, in audits, and in queries years later.\n\n' +
      'If not filled in, there\'s no going back: a reference can\'t be added to an ' +
      'already-loaded document afterward.',

    numberRange:
      'A range is defined for the migration document type with {{FBN1}}. Two traps:\n\n' +
      '**1. Fiscal year.** The range must cover **2027**.\n' +
      '**2. Overlap.** The range must **not overlap** with the ranges to be used in production. ' +
      'If it does, a *"document number already exists"* error surfaces later and is ' +
      'hard to fix.\n\n' +
      'The same care is needed on the CO side: if the {{KANK}} range is missing, even the ' +
      'FI posting stops (see {{konu:co-integration}}).',

    accountDetermination:
      'Migration loading doesn\'t directly trigger account determination, but ' +
      'the fields it **feeds** get used in every posting afterward:\n\n' +
      'The most critical one is {{LFB1}}.`AKONT`, the {{mutabakat-hesabi}}. ' +
      'If loaded wrong, **every vendor posting goes to the wrong account**.\n\n' +
      'And it comes close to being a {{tek-yonlu-kapi}}: even if the reconciliation account is ' +
      'changed afterward, **past postings stay on the old account**. ' +
      'Fixing it requires a transfer posting between accounts.\n\n' +
      'That\'s why `AKONT` is one of the few fields that **must be verified by hand** ' +
      'before loading.',

    tur:
      '**Three approaches, three technical paths:**\n\n' +
      '**{{greenfield}}**: new build + {{LTMC}} load. ' +
      'Technically the simplest, as a decision the hardest.\n\n' +
      '**{{brownfield}}**: in-place conversion. {{basitlestirme-listesi}} → ' +
      '{{cvi}} → chart-of-accounts prep → financial data conversion → {{SPDD}}/{{SPAU}}. ' +
      'The financial data conversion **can\'t be undone**.\n\n' +
      '**{{secici-gecis}}**: a third-party tool; outside the SAP standard, and ' +
      'its support is a separate contract matter.',

    transport:
      'Migration has **two separate transports** and they get confused:\n\n' +
      '**1. Configuration transport**: via {{tasima-istegi}}. ' +
      'Chart of accounts, document types, tax codes come from the development system.\n\n' +
      '**2. Data transport**: the {{LTMC}} project and source files. ' +
      'These **don\'t travel** with a transport request; they\'re set up separately on each system.\n\n' +
      '**The critical point:** on the system loading will happen, the configuration must be ' +
      '**complete**. A load that works on the test system can stall in production over a ' +
      'missing tax code: because that code hasn\'t been transported yet. This is the ' +
      'migration-side counterpart of the {{tasima-sirasi}} discipline (see {{konu:best-practices}}).',

    img:[
      { yol:'OBA7 → Special document type for migration', not:'So it can be filtered on afterward' },
      { yol:'FBN1 → Migration document type number range', not:'Must cover **fiscal year 2027**' },
      { yol:'OB52 → Migration period', not:'Open during loading, then **closed**' },
      { yol:'OB58 → Financial statement version', not:'If new accounts aren\'t assigned, the balance sheet comes out incomplete' },
    ],

    ekstra:[
      { ic:'🚪', baslik:'Why "we\'ll transfer it later" isn\'t possible: four obstacles', metin:
        'Adding history after go-live is technically possible. ' +
        'It\'s not feasible in practice for **four separate reasons**, and ' +
        'each one is enough on its own:\n\n' +
        '---\n\n' +
        '**1. Number ranges are used up.**\n' +
        'The live system has been producing documents since migration. The range needed to ' +
        'load historical documents has either already been used, or ' +
        'a new range is required: which means the old numbers ' +
        '**can\'t be preserved**.\n\n' +
        '**2. Periods are closed.**\n' +
        'Loading requires reopening past periods in {{OB52}}. ' +
        'That\'s an **open door for everyone** on the live system; ' +
        'the risk of posting to the wrong period arises for the duration of the load.\n\n' +
        '**3. Balances collide.**\n' +
        'The opening balance is already the **result** of that history. ' +
        'If you load the history too, the same amount enters the system **twice**: ' +
        'once as a summary (the opening), once as detail (the movements). ' +
        'The opening postings would need to be reversed: ' +
        'which temporarily throws the trial balance off.\n\n' +
        '**4. In Turkey, the period is legally finalized.**\n' +
        'Adding a document retroactively to a period with {{berat}} filed ' +
        'isn\'t a technical operation, it\'s a **regulatory problem** ' +
        '(see {{konu:e-donusum}}).\n\n' +
        '---\n\n' +
        '**Conclusion:** the history decision is a {{tek-yonlu-kapi}}. ' +
        'It\'s given in writing, at the start of the project, with finance\'s sign-off.' },

      { ic:'🔍', baslik:'Why the legacy system doesn\'t get shut down: and what "shutting down" means', metin:
        'The most common question after migration: *"when can we shut down the old system?"*\n\n' +
        'The answer is usually **much later** than expected, and the reason isn\'t ' +
        'license cost, it\'s **legal retention**.\n\n' +
        '---\n\n' +
        '**Three options and their real costs:**\n\n' +
        '**① Keep the system running**: the easiest, the most expensive. ' +
        'License, hardware, backup, and **knowledge** cost: a few years on, no one left ' +
        'knows how to use that system.\n\n' +
        '**② Leave it read-only**: remove the users, give a few people display access. ' +
        'Cheaper, but the system is still up.\n\n' +
        '**③ An archive solution**: data is extracted from the system and stored in a ' +
        'queryable form. The cheapest, but **setting it up has to be part of the migration ' +
        'project**; done afterward, it means bringing the legacy system back up.\n\n' +
        '---\n\n' +
        '**An extra burden specific to Turkey:** {{e-defter}} and {{berat}} records must ' +
        'remain **provable** for the whole retention period. A screenshot or an Excel ' +
        'export doesn\'t satisfy this.\n\n' +
        '**The decision is made before migration**: because option ③ is only ' +
        'cheap at that point.' },

      { ic:'📐', baslik:'n:1 and 1:n: the mapping math', metin:
        'A chart-of-accounts mapping is a **function**: every old account goes to one new ' +
        'account. The function\'s direction determines whether the job is feasible at all.\n\n' +
        '---\n\n' +
        '**n:1: merging. ✓ Automatic.**\n\n' +
        '`320.01` (domestic vendors) + `320.02` (foreign vendors) → `320`\n\n' +
        'The balances are summed, job done. Information **is lost**, but the ' +
        'loss is deliberate and already what was wanted.\n\n' +
        '**1:n: splitting. Not automatic.**\n\n' +
        '`102` (banks) → `102.01` (Bank X) + `102.02` (Bank Y)\n\n' +
        'The old balance is a single number: **3,240,000**. ' +
        'That number **doesn\'t carry** the information of how much is in which bank. ' +
        'The mapping table can\'t solve this because the information to solve it with doesn\'t exist.\n\n' +
        '---\n\n' +
        '**Three ways to solve it, all extra work:**\n\n' +
        '**a)** The split is done in the legacy system, **before migration**. ' +
        'The cleanest: the source data is still there.\n' +
        '**b)** Distributed from a separate data source (a bank statement, ' +
        'a vendor-level extract). It\'s manual work and needs reconciliation.\n' +
        '**c)** The split is **deferred**: a single account is used at migration, and the ' +
        'breakdown starts going forward in the new system.\n\n' +
        '**The most common mistake is doing (c) without realizing it:** the new chart of ' +
        'accounts is designed in detail, everything gets loaded into a single account because ' +
        'it couldn\'t be split at migration, and no one understands why the first year\'s ' +
        'report doesn\'t break down.' },
    ],

    notlar:[
      { tip:'tip', baslik:'A trial migration isn\'t a data test, it\'s a plan test', metin:
        'Trial migrations are usually run asking *"is the data correct?"* ' +
        'That\'s only half the right question.\n\n' +
        '**The rehearsal\'s real output is time.**\n\n' +
        'The cutover window is a weekend: the legacy system stops at 18:00 Friday, the new ' +
        'system opens at 08:00 Monday. There are **62 hours** in between, and this has to fit ' +
        'inside it:\n\n' +
        'data extraction · loading · reconciliation · **fixes** · sign-off · opening preparation\n\n' +
        '**The "fixes" line is the most critical one** and can\'t be estimated: ' +
        'it\'s only measured in rehearsal. If something goes wrong, how much time is left?\n\n' +
        '---\n\n' +
        '**Three rounds, three separate purposes:**\n\n' +
        '**① Technical rehearsal**: does the flow work? Errors are expected and normal.\n' +
        '**② Business rehearsal**: is the data correct? Accounting reconciliation happens here.\n' +
        '**③ Full rehearsal**: **timed**, with the real team and the real plan.\n\n' +
        'The third round must be run on **near-production hardware**; a timing measured on a ' +
        'slow test server is misleading and the cutover window ends up planned wrong.' },

      { tip:'warn', baslik:'The rollback plan: the one plan that doesn\'t get written', metin:
        'The most commonly missing line in the {{kesme-plani}} is the last one:\n\n' +
        '**"At what time, and by whom, is the rollback decision made?"**\n\n' +
        'If this line isn\'t written, the decision gets made **in the middle of a crisis**: and ' +
        'decisions made in a crisis are optimistic: *"let\'s try a bit longer, we\'ll fix it."*\n\n' +
        '**The right setup:** the plan has a **decision time** (e.g. Sunday 12:00). ' +
        'If reconciliation hasn\'t passed by then, you roll back: no debate.\n\n' +
        '**What a rollback looks like:**\n\n' +
        'It\'s easy in {{greenfield}}: the legacy system never stopped, ' +
        'the new system simply isn\'t opened.\n\n' +
        'In {{brownfield}} it means a **database restore**. ' +
        'Its duration is measured in hours, and that time also has to be ' +
        '**included in the cutover window**.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'This entire topic is already about migrating to S/4HANA. ' +
      'This section looks at what migration changes **in the target system**: ' +
      'loaded data now goes into {{ACDOCA}}, the vendor is now ' +
      '{{is-ortagi}}, and the index tables **can no longer be written to**.',

    eccFarklari:[
      { konu:'Recommended tool', ecc:'{{LSMW}}', s4:'**{{LTMC}}** Migration Cockpit' },
      { konu:'Vendor/customer', ecc:'{{LFA1}} / {{KNA1}} independent', s4:'**{{is-ortagi}} mandatory**: {{cvi}} a prerequisite' },
      { konu:'Open item target', ecc:'Written to the {{BSIK}} / {{BSID}} tables', s4:'These are **views**: created via a document posting' },
      { konu:'Item table', ecc:'{{BSEG}}', s4:'{{ACDOCA}}: {{evrensel-kayit-defteri}}' },
      { konu:'FI-CO reconciliation', ecc:'A **separate** check after migration', s4:'**Structurally unnecessary**: a single-line source' },
      { konu:'Cost element', ecc:'A separate object ({{CSKB}})', s4:'**Merged with the G/L account**: needs prep in brownfield' },
      { konu:'Template', ecc:'You define it yourself', s4:'A **ready-made, pre-mapped** Excel template' },
      { konu:'Pre-load check', ecc:'A trial run', s4:'**Simulation**: without writing data' },
      { konu:'Concepts', ecc:'Mapping, conversion, reconciliation', s4:'**The same**: the tool changed, the concepts didn\'t' },
    ],

    universalJournal:
      'The {{evrensel-kayit-defteri}} made migration **easier** in two ways:\n\n' +
      '**1. A single target.** In ECC, FI, CO, and asset balances were transferred ' +
      'separately and then reconciled against each other. In S/4HANA they all go into ' +
      '{{ACDOCA}}.\n\n' +
      '**2. Structural consistency.** Because an inconsistency between FI and CO is ' +
      '**impossible**, that reconciliation is gone after migration.\n\n' +
      'But two rules **haven\'t changed**:\n\n' +
      '• {{acik-kalem}} accounts are still transferred **item by item**\n' +
      '• Asset accounting ({{ANLC}}) and G/L are still reconciled **by hand**: ' +
      '{{AS91}} doesn\'t produce an accounting posting',

    kalkanTcodes:[
      { eski:'{{LSMW}} (in new projects)', yeni:'**{{LTMC}}**', not:'Ready-made objects, pre-mapped template, simulation' },
      { eski:'{{SHDB}} recording (for {{BP}})', yeni:'A Migration Cockpit object', not:'The BP screen flow is too complex for recording' },
      { eski:'Writing directly to {{BSIK}}/{{BSID}}', yeni:'A document posting', not:'Now a **view**: can\'t be written to' },
      { eski:'FI-CO reconciliation programs', yeni:'**Unnecessary**', not:'A single-line source' },
    ],

    fiori:[
      { ad:'Migrate Your Data', aciklama:'The {{fiori}} form of {{LTMC}}; ' +
             'on S/4HANA Cloud this is the **only path**.' },
      { ad:'Migration Object Modeler', aciklama:'{{LTMOM}}: adding fields and writing ' +
             'rules when the standard object isn\'t enough.' },
      { ad:'Manage Business Partner', aciklama:'{{is-ortagi}} maintenance after {{cvi}}; ' +
             'a role-based view.' },
    ],

    compatibilityViews:[
      '{{BSIK}} / {{BSID}} / {{BSIS}} are now **{{uyumluluk-view}}s**: ' +
      'readable, **not writable**. If an old loading program tries to write to them, it won\'t work.',
      '{{GLT0}} and {{FAGLFLEXT}}, the {{toplam-tablosu}}s, also turned into views; ' +
      'to transfer a balance you don\'t write to them, you **post a document**.',
      '{{ACDOCA}} is the target, but it **isn\'t written to directly**: ' +
      'every line is born from a document posting (see {{konu:sap-tables}}).',
    ],

    performans:
      '{{LTMC}} is faster than {{LSMW}}: it\'s optimized for bulk processing and doesn\'t ' +
      'run a screen flow.\n\n' +
      'Parallelism is used for large loads. ' +
      'But the rule from {{konu:data-upload}} applies here too: ' +
      '**the parallel split criterion is the locked object, not the row number**. ' +
      'Two jobs touching the same vendor create a {{kilitleme}} conflict.\n\n' +
      'Migration\'s longest step is usually not the loading but the **reconciliation**: ' +
      'and that runs at human speed. That\'s the real duration that needs to be measured ' +
      'during {{deneme-gecisi}}.',

    bestPractices:[
      'On a new project, **{{LTMC}}**, not {{LSMW}}.',
      'Finish the {{cvi}} conversion in brownfield **before the technical conversion**.',
      'Don\'t try to write open items to {{BSIK}}: **post a document**.',
      'Run the simulation every time the data is updated; it\'s free.',
      'A separate {{belge-turu}} and a separate number range for migration.',
      'Three-level reconciliation: technical → accounting → legal.',
      'Close the migration period with {{OB52}} after loading.',
      '**Include the legacy system\'s archive solution in the migration project.**',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"The migration was a success": and the income statement no one could find three months later',
    hikaye:
      '**Ege Kimya Inc.** went live on S/4HANA on 01.01.2028. ' +
      '{{greenfield}} had been chosen: processes were going to be renewed, and the legacy ' +
      'system was described as *"already just sitting there anyway."*\n\n' +
      'The migration weekend went smoothly. Sunday evening, the reconciliation report was signed off:\n\n' +
      '• Count ✓ · amount ✓ · migration clearing account **zero** ✓\n' +
      '• New trial balance = old trial balance ✓\n' +
      '• {{FBL1N}} vendor balance = account `320` balance ✓\n' +
      '• {{AR01}} asset total = `253` − `257` ✓\n\n' +
      'All four checks passed. **The migration really was a success.**\n\n' +
      '---\n\n' +
      'The independent audit started in March 2028.\n\n' +
      'The first document the auditor asked for: **the 2027 comparative income statement.**\n\n' +
      'It wasn\'t in SAP. And it wasn\'t anywhere it could be found either.',
    veriler:[
      { k:'Approach', v:'{{greenfield}}' },
      { k:'Go-live', v:'01.01.2028' },
      { k:'Reconciliation', v:'**All four checks passed** ✓' },
      { k:'Transferred', v:'Master data · balances · open items · assets' },
      { k:'Not transferred', v:'**2027\'s movements**' },
      { k:'Legacy system', v:'**Shut down** in February' },
      { k:'Discovered', v:'March 2028: start of the audit' },
    ],

    adimlar:[
      { baslik:'Is there a 2027 income statement in SAP?', tcode:'F.01',
        aciklama:'The simplest possibility is tried first.',
        girdi:[
          { alan:'Company code', deger:'1000' },
          { alan:'Period', deger:'2027 / 01-12' },
          { alan:'Result', deger:'**All income statement accounts are zero**' },
          { alan:'Balance sheet accounts', deger:'Populated: as an opening balance' },
        ],
        not:'**This isn\'t a bug.**\n\n' +
             'Income statement accounts are **zeroed out** at period end ({{bakiye-devri}}); ' +
             'they have no carried-forward balance. There was nothing to transfer.\n\n' +
             'So the system is **behaving correctly**. What was missing wasn\'t data, it was ' +
             'a **decision**: 2027\'s movements had never been transferred.\n\n' +
             'Balance sheet accounts looked populated because their balance carries forward: ' +
             'and that created a false sense of confidence: ' +
             '*"I guess we do have 2027\'s data."*' },

      { baslik:'Why didn\'t reconciliation catch this?', tcode:'FS10N',
        aciklama:'The scope of the four checks is examined.',
        girdi:[
          { alan:'Technical reconciliation', deger:'Count + amount: over what was **loaded**' },
          { alan:'Accounting reconciliation', deger:'Trial balance + migration clearing account: over the **balance sheet**' },
          { alan:'Legal reconciliation', deger:'**Hadn\'t been done**' },
          { alan:'Takeaway', deger:'The checks verified **the data that was loaded**' },
        ],
        not:'**This is the topic\'s crux.**\n\n' +
             'All four checks answered *"is what we loaded correct?"* ' +
             'None of them asked *"did we load everything we needed to load?"*\n\n' +
             'A reconciliation only verifies **what\'s in its scope**. A data class left out ' +
             'of scope is **invisible** no matter how many checks you run.\n\n' +
             'The third level, **legal reconciliation**, exists for exactly this: ' +
             '*"can we produce the statements the auditor will ask for?"*\n\n' +
             'That level had been skipped because the balance sheet tied out, and ' +
             '**a balance sheet tying out was assumed to mean the income statement tied out too**.' },

      { baslik:'Can\'t it be pulled from the legacy system?', tcode:'SM37',
        aciklama:'The second possibility is tried.',
        girdi:[
          { alan:'Legacy system', deger:'**Shut down in February**: the server was returned' },
          { alan:'Rationale', deger:'*"The data\'s been transferred, let\'s not renew the license"*' },
          { alan:'Backup', deger:'Exists: but a **raw database backup**' },
          { alan:'Archive solution', deger:'**None**: never included in the project' },
        ],
        not:'**The second decision was made independently of the first, and ' +
             'together they created the problem.**\n\n' +
             'The "we\'re not transferring history" decision wasn\'t a problem on its own: it\'s ' +
             'the natural consequence of {{greenfield}} and can be chosen deliberately.\n\n' +
             'The problem was that decision\'s **second half** was never made: ' +
             '*if history isn\'t transferred, where will it stay?*\n\n' +
             'The two decisions should have been made **in the same sentence**:\n' +
             '*"We\'re not transferring history, because the legacy system will stay ' +
             'read-only for three more years."*\n\n' +
             'The first half was said, the second wasn\'t. The person who decided to not ' +
             'renew the license in February **didn\'t know about the migration decision**.' },

      { baslik:'What was done?', tcode:'FB03',
        aciklama:'The fix: the expensive way.',
        girdi:[
          { alan:'Step 1', deger:'**Database restored** from backup onto a temporary server' },
          { alan:'Duration', deger:'**3 weeks** (hardware + license + setup)' },
          { alan:'Step 2', deger:'2027\'s financial statements were pulled and archived **as PDF**' },
          { alan:'Step 3', deger:'The server was shut down again' },
          { alan:'Result', deger:'The audit report was **delayed 6 weeks**' },
        ],
        not:'The fix worked, but it cost three things: **time** (3 weeks), ' +
             '**money** (a temporary license and hardware), and **trust** ' +
             '(the audit report was delayed).\n\n' +
             'And the job wasn\'t done: the same need will arise **every year**. A tax audit ' +
             'can go back five years; the TTK retention period is even longer.\n\n' +
             'What should have been done from the start finally was: **an archive solution ' +
             'was built**: but not as part of the migration project, **a year later**, and ' +
             'with the cost of bringing the legacy system back up again.' },
    ],

    sonuc:
      '**No one made a mistake in this scenario: and the outcome was still bad.**\n\n' +
      'The migration team transferred and verified everything it was asked to transfer. ' +
      'Reconciliation was done on four fronts and all four passed. The person who didn\'t ' +
      'renew the license saved on cost.\n\n' +
      'The problem was **in the gap between decisions**.\n\n' +
      '---\n\n' +
      '**Three lasting lessons:**\n\n' +
      '**1. The migration decision has two halves.**\n' +
      '*"We\'re not transferring history"* is an incomplete sentence. In full it\'s: ' +
      '**"We\'re not transferring history, because it will stay over there and remain ' +
      'accessible for this long."** If the second half isn\'t written, the first isn\'t a ' +
      'decision, it\'s a **deferral**.\n\n' +
      '**2. Reconciliation only verifies what\'s in its scope.**\n' +
      'All four checks said *"is what we loaded correct?"* The third level: **legal ' +
      'reconciliation**: asks *"can we produce what we\'re required to produce?"* and closes ' +
      'exactly this gap.\n\n' +
      'You can apply the check with one sentence: ' +
      '**"What will the auditor ask for in February, and where will we pull it from?"**\n\n' +
      '**3. A balance sheet tying out doesn\'t mean the income statement ties out.**\n' +
      'Balance sheet accounts carry forward, income statement accounts don\'t. The balance ' +
      'sheet looking populated after migration is natural and correct: and that **hides** ' +
      'the fact that the income statement is empty.\n\n' +
      '---\n\n' +
      'This is the project-scale version of the **② silent error** class from ' +
      '{{konu:error-handling}}: the system behaved correctly, every check passed, no error ' +
      'message ever appeared: and the gap was only seen **the moment someone needed it**.',
  },

  },
});
