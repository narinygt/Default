/* ==========================================================================
   content/fi-en/error-handling.js — English body for "Error Handling"
   Same conventions as content/fi-en/gl-accounting.js — see that file's
   header comment.
   ========================================================================== */

SAP.registerTopic({
  id: 'error-handling',

  sections_en: {

  /* ====================================================== 1. WHAT IT IS === */
  tanim: {
    nedir:
      'This topic is not an **error dictionary**. SAP has thousands of messages; ' +
      'memorizing all of them is neither possible nor necessary.\n\n' +
      'What gets taught is the **diagnostic method**: when you see an error, ' +
      'in what order and where you look.\n\n' +
      '---\n\n' +
      '**Every FI error falls into one of three classes**, and knowing the class tells you where the fix lives:\n\n' +
      '**① The talking error** — the system **tells you** what happened.\n' +
      '*"Period 10 is closed for company code 1000"* · *"Account determination not possible"*\n' +
      '→ The message itself points to the fix. **The easiest class.**\n\n' +
      '**② The silent error** — the system **says nothing**, but the result is wrong.\n' +
      'An empty list · a missing line · the wrong profit center · a document that never posted\n' +
      '→ **The most dangerous class.** Most of the time the user never notices.\n\n' +
      '**③ The crashing error** — the program stops, a technical screen appears (a dump).\n' +
      '→ Rare but loud. Analyzed with {{ST22}}.\n\n' +
      '---\n\n' +
      '**What sets a consultant apart isn\'t ①, it\'s ②.** ' +
      'Anyone can fix a talking error — read the message, fix the setting. ' +
      '**Noticing** a silent error takes experience.',

    neden:
      '**Time.** Searching in the wrong place is FI support\'s biggest cost. ' +
      'A consultant with a method solves it in minutes; one without, in hours.\n\n' +
      '**The right question.** *"It gives an error"* isn\'t information. ' +
      '*"Which transaction, which message number, which user, when"* is information.\n\n' +
      '**Root cause.** Fixing the symptom **postpones** the error. ' +
      'Opening the period by hand rescues today; asking **why it was closed** rescues tomorrow.\n\n' +
      '**Seeing the silent ones.** The most expensive errors are the ones that give no message. ' +
      'They\'re found not at month-end, but **months later**.',

    sirketOnemi:
      'An accounting error **can\'t be corrected retroactively** — it can only be corrected with a **new document**. ' +
      'In SAP, a posted document can\'t be **deleted** by any code.\n\n' +
      'The concrete consequence of this:\n\n' +
      '**If the error is prevented** → zero documents.\n' +
      '**If the error is found later** → the original + the reversal + the correct posting = **three documents**.\n\n' +
      'Three documents isn\'t just extra work: they show up in the trial balance, get asked about in an audit, ' +
      'and if the correction lands in **a different period**, they distort comparative reports.\n\n' +
      'That\'s why error handling is as much a **prevention** subject as it is a **diagnosis** one — ' +
      'and the tool of prevention is {{konu:dogrulama-ikame}}.\n\n' +
      '**A common question:** *"A user opens a report, the list comes back empty, ' +
      'and there\'s no error either. Where do you start?"* ' +
      'This question measures whether you recognize class ②.',

    gercekHayat:
      'A user calls: **"I can\'t save the invoice, it\'s giving an error."**\n\n' +
      'This sentence contains **no usable information**. ' +
      'An inexperienced consultant logs into the system, starts trying things, and loses hours.\n\n' +
      'An experienced consultant asks **four questions**:\n\n' +
      '**1.** Which transaction code? → *{{FB60}}*\n' +
      '**2.** The message\'s **exact text** and number? → *F5 201*\n' +
      '**3.** Which user, which company code? → *ACCOUNTING07, 1000*\n' +
      '**4.** **Did it work before?** → *It worked yesterday*\n\n' +
      '---\n\n' +
      '**The fourth question is the most valuable one**, and the most often skipped.\n\n' +
      '*"It never worked"* → a **configuration** gap. It could be a new account, a new tax code, ' +
      'a new company code.\n\n' +
      '*"It worked yesterday"* → **something changed**. A transport arrived, a period closed, ' +
      'a role changed, master data was updated.\n\n' +
      'These two answers require looking in **completely different places**. ' +
      'Starting without asking means searching the wrong half.',

    muhasebeMantigi:
      'Most FI errors are actually the system\'s counterpart to **accounting\'s own rules**. ' +
      'The system doesn\'t impose an arbitrary obstacle — it **protects an accounting principle**.\n\n' +
      '**"Period closed"** → *No postings are made to a closed period.* ' +
      'A closed period\'s trial balance has already been declared; a posting made afterward would invalidate that declaration.\n\n' +
      '**"Document not balanced"** → *Every debit has a credit.* ' +
      'A direct application of double-entry bookkeeping.\n\n' +
      '**"Account determination not possible"** → *An automatic posting must know which account to go to.* ' +
      'The system doesn\'t **guess** the account — if it isn\'t defined, it stops. That\'s the correct behavior.\n\n' +
      '**"Account blocked / closed for posting"** → *Posting to an account that shouldn\'t be used is wrong.*\n\n' +
      '**"Field is mandatory"** → *An expense should hit a cost object.*\n\n' +
      '---\n\n' +
      '**The practical benefit of this viewpoint is large:** you read the error not as ' +
      '*"the system won\'t let me,"* but as *"what does the accounting rule say?"*\n\n' +
      'Then the fix changes too: instead of **removing the obstacle**, you understand ' +
      '**why the rule kicked in**. Most of the time the error is right, and what\'s actually wrong is ' +
      '**the posting someone is trying to enter**.',

    kavramlar: ['kilitleme', 'guncelleme-hatasi', 'yetki-nesnesi', 'tampon',
                'belge-denkligi', 'alan-durumu', 'tasima-istegi'],
  },

  /* ====================================================== 2. BUSINESS PROCESS === */
  surec: {
    anlatim:
      'Diagnosis follows a **fixed order**. The order matters: every step ' +
      'narrows the next one\'s search space. Jumping ahead leads to searching in the wrong place.',

    roller:[
      { rol:'User', gorev:'Reports the error — usually with incomplete information.' },
      { rol:'Consultant', gorev:'Asks the **four questions**: transaction · message · user · "did it work before?"' },
      { rol:'Consultant', gorev:'Gets the message number — like `F5 201`. It\'s the **number**, not the text, that gets searched.' },
      { rol:'Consultant', gorev:'Determines the class: talking · silent · crashing.' },
      { rol:'Consultant', gorev:'Picks the tool by class: {{OBA5}} · {{SU53}} · {{SM12}} · {{SM13}} · {{SLG1}} · {{ST22}}' },
      { rol:'Consultant', gorev:'Finds the **root cause** — not the symptom.' },
      { rol:'Consultant', gorev:'Fixes it, confirms it, and **scans for the same class**.' },
    ],

    diyagram:{
      type:'flow',
      baslik:'FI error diagnosis — a fixed order',
      adimlar:[
        { ic:'📞', rol:'User', baslik:'The error is reported',
          aciklama:'*"I can\'t save the invoice"* — **no** usable information.',
          cikti:'A vague report', ok:'four questions' },
        { ic:'❓', rol:'Consultant', baslik:'Four questions are asked',
          aciklama:'Transaction code · **message number** · user + company code · ' +
                   '**"did it work before?"**\n\n' +
                   'The fourth **splits the search in two**: never worked means configuration, ' +
                   'worked yesterday means a **change**.',
          cikti:'Structured information', ok:'classify' },
        { ic:'🧭', rol:'Consultant', baslik:'The error class is determined',
          aciklama:'**① Talking** — a message exists and points to the fix.\n' +
                   '**② Silent** — no message, wrong result.\n' +
                   '**③ Crashing** — the program stopped, a dump screen.',
          cikti:'Class', ok:'the tool is chosen' },
        { ic:'💬', rol:'Consultant', baslik:'① Talking error — go to the source of the message',
          aciklama:'The message number (`F5 201`) is taken down. ' +
                   'The long text is read — most messages **write the solution themselves**. ' +
                   'Can the message class be changed: {{OBA5}}',
          cikti:'A setting fix', ok:'if silent' },
        { ic:'🔇', rol:'Consultant', baslik:'② Silent error — work through three possibilities in order',
          aciklama:'**Does the data exist?** Check the table with {{SE16N}}.\n' +
                   '**Is there authorization?** {{SU53}} right away.\n' +
                   '**Did the posting actually happen?** {{SM13}} — {{guncelleme-hatasi}}.',
          cikti:'Root cause', ok:'if it crashed' },
        { ic:'💥', rol:'Consultant', baslik:'③ Crashing error — {{ST22}}',
          aciklama:'Dump analysis. Most dumps are **data errors**, not program errors: ' +
                   'division by zero, missing configuration, an overflowing field.',
          cikti:'Technical cause', ok:'if it was a batch job' },
        { ic:'📜', rol:'Consultant', baslik:'If it\'s a batch job, check the log',
          aciklama:'The on-screen summary isn\'t enough. {{SLG1}} gives the detailed log, ' +
                   '{{SM37}} the job status, {{SP01}} the output queue.',
          cikti:'A line-level error', ok:'fix it' },
        { ic:'✓', rol:'Consultant', baslik:'The root cause is fixed and **the same class is scanned**',
          aciklama:'An error found in one user is usually **not alone**. ' +
                   'Others using the same role, the same account, the same tax code ' +
                   'are also checked.',
          cikti:'A lasting fix' },
      ],
    },

    adimlar:[
      { rol:'Consultant', eylem:'Gets the message number', sistem:'Double-click the message → the long text' },
      { rol:'Consultant', eylem:'Determines the class', sistem:'Talking / silent / crashing' },
      { rol:'Consultant', eylem:'Checks authorization', sistem:'{{SU53}} — **right after**' },
      { rol:'Consultant', eylem:'Checks for a lock', sistem:'{{SM12}}' },
      { rol:'Consultant', eylem:'Looks for an update termination', sistem:'{{SM13}}' },
      { rol:'Consultant', eylem:'Reads the batch job log', sistem:'{{SLG1}} · {{SM37}}' },
      { rol:'Consultant', eylem:'Analyzes the dump', sistem:'{{ST22}}' },
      { rol:'Consultant', eylem:'Scans for the same class', sistem:'Other users / accounts / codes' },
    ],

    veriAkisi:{
      nereden:'The user\'s screen, a batch job log, or a dump.',
      nereye:'The root cause: configuration · master data · authorization · timing.',
      tetikleyen:'A posting attempt · a batch run · opening a report.',
      sonraki:'The fix + **scanning the same class** + a preventive rule if needed.',
    },

    notlar:[
      { tip:'tip', baslik:'The message number is worth more than the text', metin:
        'Searching by the error message\'s **text** is a weak strategy: ' +
        'the text changes by language, gets updated across versions, and the translation can be incomplete.\n\n' +
        '**The message number doesn\'t change.** Its format: **class + number** → `F5 201`\n\n' +
        '**How to get to the number:** **double-click** the message → ' +
        'the long text opens. The long text usually contains:\n\n' +
        '• **Diagnosis** — what happened\n' +
        '• **System response** — what the system did\n' +
        '• **Procedure** — **what needs to be done**\n\n' +
        'The third section solves most cases **on its own** and ' +
        'is the thing new consultants skip most often.\n\n' +
        '**Common message classes:**\n' +
        '`F5` FI document posting · `FS` G/L · `F4` invoice · `AA` fixed assets · ' +
        '`KI` CO · `M8` MM invoice verification · `GLT` totals records' },
    ],
  },

  /* =================================================== 3. ACCOUNTING LOGIC === */
  muhasebe: {
    anlatim:
      'The error itself doesn\'t produce a posting — but **fixing the erroneous posting** does. ' +
      'And the cost of the fix depends on **when** the error was found.\n\n' +
      'The three postings below show the price of finding the same error at three different times.',

    etkilenenHesaplar:[
      { hesap:'The wrong expense account', tur:'Income statement', neden:'An amount posted to the wrong account distorts **the period result**.' },
      { hesap:'The related VAT account', tur:'Balance sheet', neden:'A wrong tax code affects **the tax filing** — {{BSET}}.' },
      { hesap:'The offsetting account', tur:'Variable', neden:'A reversal runs **the same accounts** in the opposite direction.' },
      { hesap:'—', tur:'Number of postings', neden:'**0** documents if prevented · **3** documents if found later.' },
    ],

    fisler:[
      { baslik:'① The error was prevented — the posting never happened (0 documents)',
        belgeTuru:'KR', tarih:'10.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'770', ad:'General administrative expense', borc:100000, not:'Cost center was **entered** ✓' },
          { hesap:'191', ad:'Deductible VAT', borc:20000 },
          { hesap:'320', ad:'Trade payables', alacak:120000 },
        ],
        not:'**The cheapest scenario.** The {{konu:dogrulama-ikame}} rule ' +
             '**blocked** the posting while the cost center was blank; the user filled it in and the correct posting went through.\n\n' +
             'The system has **a single document**, and it\'s correct. ' +
             'No correction, no reversal, nothing to explain in an audit.\n\n' +
             '**This is the value of a preventive control** — and its value ' +
             'is only visible when compared against the two postings below.' },

      { baslik:'② The error was found in the same period — a reversal + the correct posting (3 documents)',
        belgeTuru:'KR', tarih:'12.11.2027', paraBirimi:'TRY',
        satirlar:[
          { hesap:'320', ad:'Trade payables', borc:120000, not:'{{FB08}} reversal' },
          { hesap:'770', ad:'General administrative expense', alacak:100000 },
          { hesap:'191', ad:'Deductible VAT', alacak:20000 },
        ],
        not:'The original document **stays in place** — a posted document **can\'t be deleted** in SAP.\n\n' +
             '{{FB08}} generates a new document and links the two via the {{BKPF}} `STBLG` field. ' +
             'Then the **correct posting** is entered as a third document.\n\n' +
             '**Total: 3 documents.** They show up in the trial balance, but because they\'re in the same period, ' +
             'the period result comes out **correct**.\n\n' +
             'An acceptable cost — but a preventable one.' },

      { baslik:'③ The error was found in the following period — the most expensive case',
        belgeTuru:'SA', tarih:'08.01.2028', paraBirimi:'TRY',
        satirlar:[
          { hesap:'760', ad:'Marketing and distribution expense (correct account)', borc:100000 },
          { hesap:'770', ad:'General administrative expense (wrong account)', alacak:100000 },
        ],
        not:'**The most expensive scenario.** The error was made in November, found in **January**.\n\n' +
             'Three extra problems arise:\n\n' +
             '**1. The period is closed.** No posting can be made to November; the fix lands in **January**.\n\n' +
             '**2. Comparative reports get distorted.** November\'s expense looks too high, ' +
             'January\'s too low. The question *"why did marketing expense spike in January?"* comes up.\n\n' +
             '**3. A tax filing may already be in.** If the tax code was wrong too, ' +
             'an **amended return** is needed — the job stops being an accounting task alone.\n\n' +
             'This posting is only an **account correction**; the VAT was right. ' +
             'If it hadn\'t been, {{BSET}} would need correcting too and the job would grow much bigger.' },
    ],

    tHesaplar:[
      { hesap:'General administrative expense — the trace of three documents', kod:'770',
        borc:[{ ad:'① Original (wrong account)', tutar:100000 }],
        alacak:[
          { ad:'② {{FB08}} reversal', tutar:100000 },
          { ad:'③ The January correction', tutar:0 },
        ],
        not:'The account **closes out**, but three lines leave a trace' },
    ],

    notlar:[
      { tip:'warn', baslik:'The cost of a fix grows exponentially over time', metin:
        'The same error produces **completely different** costs depending on when it\'s found:\n\n' +
        '**At the moment of posting** → 0 documents · 0 minutes\n' +
        '**Same day** → 3 documents · 10 minutes\n' +
        '**Within the same period** → 3 documents · a trial-balance check is needed\n' +
        '**After the period is closed** → 3 documents + **a correction landing in the wrong period** + ' +
        'distorted comparative reports\n' +
        '**After a filing is submitted** → all of the above + **an amended return**\n\n' +
        '---\n\n' +
        '**This table shows why error handling is a prevention subject.**\n\n' +
        'The right instinct in consulting isn\'t fixing an error fast, it\'s ' +
        'asking whether the same error could happen again:\n\n' +
        '*"Why was this possible, and how do you make it impossible?"*\n\n' +
        'The answer is usually one of three: a {{konu:dogrulama-ikame}} rule · ' +
        'making an {{alan-durumu}} field mandatory · or {{OB52}} period discipline.' },
    ],
  },

  /* =================================================== 4. VARIANTS === */
  cesitler: {
    anlatim:
      'Below are FI\'s **most commonly encountered errors**, split into three classes. ' +
      'For each: **what it means · why it happens · how it\'s fixed · the lasting prevention**.\n\n' +
      '---\n\n' +
      '**Talking errors (①)** — a message exists and points to the fix. ' +
      'Tedious but easy; reading the message\'s long text finishes most of them.\n\n' +
      '**Silent errors (②)** — no message, wrong result. ' +
      '**This is where the topic\'s real value lies.** A consultant who doesn\'t know these ' +
      'won\'t even know the error exists.\n\n' +
      '**Crashing errors (③)** — the program stops. Loud but rare.',

    liste:[
      /* ---------- ① TALKING ---------- */
      { ad:'Posting period closed',
        aciklama:'That period, for that account type, isn\'t open in {{OB52}}.',
        neZaman:'At month start and month end; the most common FI error.',
        ornek:'**Check order:**\n\n' +
              '**1.** {{OB52}} → the period variant → the account-type row\n' +
              '**2.** **Don\'t skip the account-type split:** `+` is the general row, but ' +
              '`S` (G/L), `K` (vendor), `D` (customer), `A` (asset) can be **separate rows**. ' +
              'If `K` is closed for a vendor posting, you get the error even if `+` is open.\n' +
              '**3.** There are two date ranges: the normal period and the **special period** (13–16).\n' +
              '**4.** For an asset posting, the **AA period** is also checked separately.\n\n' +
              '**Lasting prevention:** period opening/closing is **tied to a calendar** and ' +
              'authorization stays with one person. If everyone gets {{OB52}} authorization, ' +
              'period discipline collapses.',
        tcodes:['OB52'] },

      { ad:'Account determination error',
        aciklama:'An automatic posting **can\'t find** which account to go to. ' +
                 'The system doesn\'t guess the account — if it\'s undefined, it stops.',
        neZaman:'When a new material, a new tax code, or a new valuation class comes into use.',
        ornek:'**The originating module tells you which table to look at:**\n\n' +
              'If from **MM** → {{OBYC}} (`BSX` inventory, `WRX` GR/IR, `PRD` price difference)\n' +
              'If from **SD** → {{VKOA}}\n' +
              'If **tax** → {{OB40}} / {{T030K}}\n' +
              'If **fixed asset** → {{AO90}}\n\n' +
              '**The most common cause: a new valuation class** was opened but ' +
              'no line was added to {{OBYC}}.\n\n' +
              '**Lasting prevention:** the process for opening a new valuation class / tax code ' +
              'gets a *"was account determination set up?"* step added to it.',
        tcodes:['OBYC','VKOA','OB40'] },

      { ad:'Document not balanced',
        aciklama:'The double-entry principle. There may be a line not visible on screen.',
        neZaman:'On a manual multi-line posting; during a bulk upload.',
        ornek:'**Invisible causes:**\n\n' +
              '• A **rounding difference** — from FX conversion\n' +
              '• The **tax line** was added automatically and changed the total\n' +
              '• **{{belge-bolme}}** is active: the document balances at entry, but ' +
              '**in the ledger view** it\'s unbalanced because the splitting characteristic (profit center) isn\'t filled in\n\n' +
              'The third is the most confusing: the error says *"not balanced,"* ' +
              'but the actual problem is **not the balance, but a missing splitting characteristic** ' +
              '(see {{konu:new-gl}}).\n\n' +
              '**Note:** parking doesn\'t check for balance ({{konu:document-parking}}) — ' +
              'this error only shows up at **posting**.',
        tcodes:['FB50','FBV0'] },

      { ad:'Account blocked / closed for posting',
        aciklama:'The account is blocked in {{FS00}}, or a **deletion flag** has been set.',
        neZaman:'After a chart-of-accounts cleanup; on carryforward accounts.',
        ornek:'**Three separate settings get mixed up:**\n\n' +
              '**Closed for posting** — temporary, can be lifted\n' +
              '**Deletion flag** — the account is to be removed, shouldn\'t be used\n' +
              '**Not in the company code** — the account exists at the **chart-of-accounts** level but isn\'t **opened** for this company code\n\n' +
              'The third gives a different message, and its fix is different too: ' +
              '**add the company-code data** in {{FS00}} ({{SKB1}}).\n\n' +
              'Before lifting the block, ask: **why was it blocked?** ' +
              'Usually there\'s a reason.',
        tcodes:['FS00'] },

      { ad:'Field is a required field / Field cannot be changed',
        aciklama:'The {{alan-durumu}} group has made the field mandatory or hidden it.',
        neZaman:'When a new account is opened; on profit-center/cost-center mandatory settings.',
        ornek:'**Field status comes from two places, and both are valid:**\n\n' +
              '**1.** The G/L account\'s **field status group** ({{FS00}} → {{OBC4}})\n' +
              '**2.** The **posting key\'s** field status ({{OB41}})\n\n' +
              'If they conflict, **the more restrictive one wins**. ' +
              'That\'s why *"I made it optional on the account but it still asks for it"* happens — ' +
              'the posting key is keeping it mandatory.\n\n' +
              '**Also:** a {{konu:dogrulama-ikame}} rule can also force a field to be mandatory. ' +
              'If field status is clean, look at **validation** next.',
        tcodes:['FS00','OBC4','OB41'] },

      { ad:'Not authorized — the clear-message version',
        aciklama:'`S_TCODE` is missing — the transaction **never even starts**.',
        neZaman:'A new user, a role change, after a transport.',
        ornek:'**{{SU53}}** shows the missing object; a screenshot ' +
              'goes to the authorization team.\n\n' +
              '**{{SU53}} shows only the LAST failed check** — ' +
              'it must be run immediately.\n\n' +
              '**If "it worked yesterday":** check {{SU01}} → the role\'s **validity date**. ' +
              'Expired roles drop silently.\n\n' +
              'After a role is assigned, the user must **log out and back in** — ' +
              'authorizations are loaded into the {{tampon}} at logon.\n\n' +
              '**This error\'s silent sibling is below** — that\'s the actually dangerous one.',
        tcodes:['SU53','SU01','PFCG'] },

      /* ---------- ② SILENT ---------- */
      { ad:'Empty list — no error, assumed to be no data',
        aciklama:'**The most misleading FI error.** The transaction opens, runs, and comes back empty.',
        neZaman:'In reports and line-item lists; with new users.',
        ornek:'**Three different causes, the same symptom:**\n\n' +
              '**1. No data authorization.** `S_TCODE` exists but `F_BKPF_BUK` doesn\'t. ' +
              'A report applies authorization as a **filter**; an unauthorized company code ' +
              'is **never even queried** → an empty result, which from the program\'s standpoint **isn\'t an error** ' +
              '(see {{konu:tcodes}}).\n\n' +
              '**2. Open item management is off.** If it\'s off on the G/L account, no line-item list can be pulled ' +
              'and **can\'t be turned on retroactively** (see {{konu:reporting}}).\n\n' +
              '**3. The selection is wrong.** The date range, the "open item" date, the company code.\n\n' +
              '**Diagnostic order:** check with {{SE16N}} whether data exists in the table → ' +
              'if it does, {{SU53}} **right away** → then check the account setting.',
        tcodes:['SU53','SE16N'] },

      { ad:'A document number was assigned but the document doesn\'t exist',
        aciklama:'{{guncelleme-hatasi}}. The number is assigned **in the dialog step**, and the record is written ' +
                 'in the **update task**. If the second one crashes, the number is consumed for nothing.',
        neZaman:'In bulk loads and during busy periods; rare in single-record entry.',
        ornek:'**{{SM13}}** is used to review update records.\n\n' +
              '**Why this is so dangerous:** the user **sees** the on-screen message ' +
              '*"Document 1900001234 was saved"* and moves on. ' +
              'The document doesn\'t exist.\n\n' +
              'In a bulk load, it goes **completely unnoticed** — out of 500 records, 14 ' +
              'silently disappear (see the {{konu:sap-tables}} scenario).\n\n' +
              '**Lasting prevention:** a **count reconciliation** must be a mandatory step ' +
              'after every bulk load: records sent = documents created.',
        tcodes:['SM13','SM21'] },

      { ad:'The posting goes through but field values change "on their own"',
        aciklama:'An active **substitution** is overwriting what the user entered.',
        neZaman:'On derived fields like profit center, cost center, business area.',
        ornek:'The symptom comes in the user\'s own words as: ' +
              '*"I entered it correctly, but the report shows something else."*\n\n' +
              'It\'s the **last thing** anyone thinks of in diagnosis, because a substitution is **silent** — ' +
              'it gives no message at all (see {{konu:dogrulama-ikame}}).\n\n' +
              '**Check:** {{GGB1}} the substitution definition · {{OBBH}} the assignment · {{GGB4}} activation.\n\n' +
              '**Lasting prevention:** keep an **inventory** of active substitutions, and ' +
              'write every substitution\'s description **in business language**. ' +
              'A substitution with a blank description is a trap nobody can untangle two years later.',
        tcodes:['GGB1','OBBH','GGB4'] },

      { ad:'A setting was changed but has no visible effect',
        aciklama:'Two different causes: **{{tampon}}** buffering, or a **transport that never arrived**.',
        neZaman:'After a configuration change.',
        ornek:'**First tell which one it is:**\n\n' +
              '**Buffer** — **you** made the change, in the same system. ' +
              '{{T001}}, {{T004}}, {{T030}} are buffered. ' +
              'Fix: log out and back in; if that doesn\'t help, `/$sync` ' +
              '(affects every user on production).\n\n' +
              '**Transport** — the change was made **in another system**. ' +
              'The {{tasima-istegi}} hasn\'t arrived on production, or arrived **with an error**. ' +
              'Check: `STMS` transport log, the return code.\n\n' +
              '**Return code 4 is not "successful"** — it means it passed with a warning, ' +
              'and some objects may not have come along.',
        tcodes:['SE16N'] },

      { ad:'It exists in CO but not in FI (or the other way around)',
        aciklama:'Real-time integration has broken, or the transaction is **CO-only**.',
        neZaman:'After cost-center transfers.',
        ornek:'**Handle the normal case first:** a CO-internal repost done with {{KB11N}} ' +
              '**has nothing to do with FI** — ' +
              'FI is already correct, only the CO object was wrong. ' +
              'This is **not** an error (see {{konu:cost-center}}).\n\n' +
              '**The real problem** is real-time integration not working: ' +
              'the {{FAGLCOFIRTINT}} setting, a missing {{KANK}} number range.\n\n' +
              'If {{KANK}} is missing, **the FI posting stops too** — without a CO number range, ' +
              'the shared FI/CO LUW can\'t complete.',
        tcodes:['KB11N','FAGLCOFIRTINT','KANK'] },

      { ad:'The batch job said "done" but the result is incomplete',
        aciklama:'The on-screen summary message **isn\'t enough**.',
        neZaman:'After {{F110}}, {{AFAB}}, {{F.05}}, {{FF_5}}.',
        ornek:'**Three different places are checked, and each tells a different story:**\n\n' +
              '**{{SM37}}** — **did the job run, did it finish?**\n' +
              '**{{SLG1}}** — **what happened, line by line?** ({{BALHDR}})\n' +
              '**{{SP01}}** — was output produced?\n\n' +
              'A job can show **"completed successfully"** ' +
              'while its log has dozens of error lines. ' +
              'The job status answers **did the program crash**, ' +
              'not **was the job done correctly**.\n\n' +
              'Specifically for {{F110}}: **the proposal** and **the payment run** are separate steps; ' +
              'items blocked in the proposal are silently left out.',
        tcodes:['SM37','SLG1','SP01'] },

      /* ---------- ③ CRASHING ---------- */
      { ad:'The program crashed — a dump screen',
        aciklama:'Analyzed with {{ST22}}. Most are **data errors**, not program errors.',
        neZaman:'Rare; usually with unexpected data or missing configuration.',
        ornek:'**Three things to read in {{ST22}}:**\n\n' +
              '**Error type** — `CX_SY_ZERODIVIDE` division by zero · ' +
              '`CONVT_NO_NUMBER` text in a numeric field · ' +
              '`TABLE_INVALID_INDEX` a missing row\n' +
              '**Source line** — where in which program\n' +
              '**"What the user was doing"** — which transaction, which data\n\n' +
              '**A common wrong instinct:** *"the program\'s broken, send it to the developer."*\n' +
              'Most dumps come from **missing configuration**: an undefined exchange rate, ' +
              'a zero-life depreciation key, an empty number range.\n\n' +
              'Check the **data** first — most cases end there.',
        tcodes:['ST22','SM21'] },

      { ad:'The transaction hangs / the posting won\'t save',
        aciklama:'{{kilitleme}} — another user or job is holding the same object.',
        neZaman:'While {{F110}} is running; when two people open the same master record at once.',
        ornek:'**{{SM12}}** shows the lock owner and the timestamp.\n\n' +
              '**The most common scenario:** while {{F110}} is running, a user tries to pay ' +
              'the same vendor → the payment program has **locked** the item.\n\n' +
              '**A lock is never deleted by hand** — the running transaction would be left half-done and ' +
              'could leave inconsistent data.\n\n' +
              '**The correct sequence:** ① find the owner in {{SM12}} ② check in {{SM37}} whether the job ' +
              'is still running ③ if it is, **wait** ④ if the job has crashed and the lock is now ' +
              '**orphaned**, remove it together with Basis.',
        tcodes:['SM12','SM37'] },
    ],

    karsilastirmaBasliklar:['Talking error (①)', 'Silent error (②)'],
    karsilastirma:[
      ['Message', 'Exists — points to the fix', '**None**'],
      ['When it\'s noticed', 'Immediately', '**Days / months later**'],
      ['User behavior', 'Reports it', '**Works around it**'],
      ['Diagnostic difficulty', 'Low', '**High**'],
      ['Typical tool', '{{OBA5}} · the message\'s long text', '{{SU53}} · {{SM13}} · {{SLG1}}'],
      ['Accounting impact', 'The posting **doesn\'t happen** — no damage', '**A wrong posting happens**'],
      ['Cost of the fix', 'Zero', '**3 documents + a period issue**'],
      ['Prevention tool', 'Already prevents it', '{{konu:dogrulama-ikame}} · reconciliation'],
    ],
  },

  /* ===================================================== 5. TRANSACTION CODES === */
  tcodes: {
    liste:[
      { kod:'SU53', ad:'Authorization error analysis — run it **right after**',
        amac:'Shows the last failed authorization check.',
        neZaman:'On an authorization message **and** when a list comes back empty.',
        adimlar:[
          { baslik:'The user gets the error, or sees an **empty list**' },
          { baslik:'{{SU53}} is run **immediately**',
            aciklama:'If another transaction runs in between, the trace is **lost** — only the last check is kept.' },
          { baslik:'The failed object and the missing value are read',
            aciklama:'Something like `F_BKPF_BUK` + `BUKRS` = 2000.' },
          { baslik:'The screenshot goes to the authorization team' },
          { baslik:'After the role is assigned, the user **logs out and back in**',
            aciklama:'Authorizations are loaded into the {{tampon}} at logon.' },
        ],
        ekranAkisi:[
          { ekran:'Symptom', islem:'{{FBL5N}} opens, **empty list**, **no** error' },
          { ekran:'{{SU53}}', islem:'Failed: **`F_BKPF_BUK`** · `BUKRS` = **2000**' },
          { ekran:'Current state', islem:'The user only has `BUKRS` = 1000' },
          { ekran:'Fix', islem:'A second role was assigned → session refreshed → **47 items** ✓' },
        ],
        alanlar:{ zorunlu:[], opsiyonel:['Viewing for another user (requires authorization)'] },
        hatalar:[
          { mesaj:'{{SU53}} says "authorization check successful"', sebep:'Another transaction ran in between; the trace was lost.', cozum:'**Reproduce** the error and run it immediately afterward.' },
          { mesaj:'A role was assigned but it still doesn\'t work', sebep:'Authorizations are loaded into the {{tampon}} at logon.', cozum:'Log out and back in. If it persists, check the role\'s **validity dates** in {{SU01}}.' },
          { mesaj:'No error but the list is empty', sebep:'Data authorization is being applied as a filter.', cozum:'This is exactly the tool for it: {{SU53}} **right after** an empty list.' },
        ],
        ipucu:'**Teaching users the "{{SU53}} reflex"** is the single ' +
              'highest-return action on this topic.\n\n' +
              'The only person who can make a silent error **visible** is the one experiencing it. ' +
              'If a user sees an empty list and thinks *"there\'s no data"* and moves on, ' +
              'the error persists for months.\n\n' +
              'The rule to teach is one sentence: ' +
              '**"Saw an empty list? Run {{SU53}} right away and take a screenshot."**',
        ilgili:['SU01','PFCG','SE16N'] },

      { kod:'SM13', ad:'Update errors — "the number exists, the document doesn\'t"',
        amac:'Shows crashed update tasks.',
        neZaman:'When a document number was assigned but the document can\'t be found; **after every bulk load**.',
        adimlar:[
          { baslik:'The user, date range, and status are entered',
            aciklama:'Status: **Error (Err)** is selected.' },
          { baslik:'Double-click a record — the error message and module appear' },
          { baslik:'The root cause is read',
            aciklama:'Usually a lock conflict, a table field overflow, or a custom-code error.' },
          { baslik:'If needed, the update is **rerun** or deleted',
            aciklama:'This decision is made together with Basis.' },
        ],
        ekranAkisi:[
          { ekran:'Symptom', islem:'*"Document 1900001234 was saved"* — but it\'s **not** in {{FB03}}' },
          { ekran:'{{SM13}}', islem:'Status **Err** · user · date' },
          { ekran:'Detail', islem:'`FI` module · lock conflict' },
          { ekran:'Scope', islem:'**14 records** in the same load, same status' },
        ],
        alanlar:{ zorunlu:['User','Date'], opsiyonel:['Status','Client'] },
        hatalar:[
          { mesaj:'{{SM13}} looks empty', sebep:'The records\' retention period has expired, or the date range is too narrow.', cozum:'Widen the range; if it\'s too old, the trace may already be gone.' },
          { mesaj:'The number is consumed and can\'t be reused', sebep:'The number is assigned in the dialog step, written in the update task.', cozum:'This is normal. Gaps form in document numbers; they should be explainable in an audit.' },
        ],
        ipucu:'**A {{SM13}} check after a bulk load should be a mandatory step.**\n\n' +
              'For single-record entry, an update termination is rare and the user notices. ' +
              'In a bulk load it goes **completely unnoticed**: 500 records are sent, ' +
              '486 are created, 14 silently disappear.\n\n' +
              'A simple and effective safeguard: a **count reconciliation** — ' +
              'records sent = documents created. ' +
              'If they don\'t match, check {{SM13}}.',
        ilgili:['SM21','SM12','ST22'] },

      { kod:'SLG1', ad:'Application log — a batch job\'s real result',
        amac:'Shows the **detail behind** the on-screen summary message.',
        neZaman:'After {{F110}}, {{AFAB}}, {{F.05}}, {{FF_5}}.',
        adimlar:[
          { baslik:'The object and sub-object are chosen', aciklama:'Which program\'s log.' },
          { baslik:'Narrowed down by date and user' },
          { baslik:'Filtered by message class',
            aciklama:'**Red** error · **yellow** warning · **green** info. Reds first.' },
          { baslik:'The line-level error is read', aciklama:'Which document / vendor / asset failed.' },
        ],
        ekranAkisi:[
          { ekran:'{{SM37}}', islem:'Job status: **completed successfully** ✓' },
          { ekran:'{{SLG1}}', islem:'Same job → **17 red messages**' },
          { ekran:'Contradiction', islem:'The job didn\'t crash but **17 items were unprocessed**' },
          { ekran:'Lesson', islem:'Job status ≠ the job was done correctly' },
        ],
        alanlar:{ zorunlu:['Object','Date'], opsiyonel:['Sub-object','User','Message class'] },
        hatalar:[
          { mesaj:'No log found', sebep:'The program doesn\'t write a log, or the retention period has expired.', cozum:'Check the job log in {{SM37}}; some programs only produce list output ({{SP01}}).' },
          { mesaj:'Too many messages', sebep:'Info messages are also coming through.', cozum:'Filter to just **red**; the {{BALHDR}} `PROBCLASS` field holds the class.' },
        ],
        ipucu:'**{{SM37}} and {{SLG1}} answer different questions**, and ' +
              'confusing them is the most common diagnostic mistake:\n\n' +
              '**{{SM37}}** → *"Did the program run, did it crash?"*\n' +
              '**{{SLG1}}** → *"Was the job done correctly?"*\n\n' +
              'A job can show **"completed successfully"** while the log has ' +
              'dozens of error lines — the program didn\'t crash, ' +
              'it just failed to process some items.\n\n' +
              '**For a batch job, both are checked.**',
        ilgili:['SM37','SP01','BALHDR'] },

      { kod:'OBA5', ad:'Message control — turning an error into a warning',
        amac:'Changes some messages\' class: error (E) ↔ warning (W) ↔ off (-).',
        neZaman:'When a business process needs a control loosened, or **tightened**.',
        adimlar:[
          { baslik:'The application area is entered', aciklama:'A message class like `F5`, `F4`, `AA`.' },
          { baslik:'The message number and username are entered',
            aciklama:'Leaving the username **blank** makes it apply to **everyone**.' },
          { baslik:'The new class is chosen', aciklama:'`E` error · `W` warning · `I` info · `-` off' },
          { baslik:'It\'s saved to a transport request' },
        ],
        ekranAkisi:[
          { ekran:'Request', islem:'*"This warning comes up on every posting, let\'s turn it off"*' },
          { ekran:'Check', islem:'**Can the message\'s class even be changed?** Most can\'t' },
          { ekran:'Decision', islem:'Before turning it off: **why is the warning showing up?**' },
          { ekran:'Result', islem:'The root cause was fixed — the message no longer appears anyway' },
        ],
        alanlar:{ zorunlu:['Application area','Message number','New class'], opsiyonel:['Username'] },
        hatalar:[
          { mesaj:'The message isn\'t in the list', sebep:'Not every message\'s class can be changed.', cozum:'Only messages SAP permits show up in {{OBA5}}. If it\'s not there, it **can\'t be changed** — fix the root cause instead.' },
          { mesaj:'The change has no effect', sebep:'The username field is filled in.', cozum:'It\'s defined for a specific user; leave it blank for everyone.' },
        ],
        ipucu:'**{{OBA5}} is not a "silence the error" tool.**\n\n' +
              'This is its most common misuse: a warning is annoying, so it gets turned off, ' +
              'and whatever the warning was **protecting** disappears with it.\n\n' +
              '**Correct use goes both ways:**\n\n' +
              '**Loosening** — if the business process genuinely doesn\'t need that control, ' +
              'and it\'s **documented**.\n\n' +
              '**Tightening** — a less-known but more valuable use: ' +
              'turning a **warning into an error**. ' +
              'The same principle as in {{konu:dogrulama-ikame}}: ' +
              '**only `E` is real protection**, `W` gets bypassed on the first busy day.\n\n' +
              'Before turning it off, ask one question: **what was this warning protecting?**',
        ilgili:['OB28','GGB0','FS00'] },

      { kod:'ST22', ad:'Dump analysis — most dumps are data errors',
        amac:'Shows the technical cause of a program crash.',
        neZaman:'When a user sees a technical error screen.',
        adimlar:[
          { baslik:'The dump is found by date and user' },
          { baslik:'The **error type** is read', aciklama:'Things like `CX_SY_ZERODIVIDE`, `CONVT_NO_NUMBER`.' },
          { baslik:'The "what was the user doing" section is read',
            aciklama:'Which transaction, which data — the real clue is here.' },
          { baslik:'The **data** is checked first, the program second' },
        ],
        ekranAkisi:[
          { ekran:'Dump', islem:'`CX_SY_ZERODIVIDE` · during {{AFAB}}' },
          { ekran:'Data', islem:'One asset\'s **useful life = 0**' },
          { ekran:'Root cause', islem:'A master-data error — **not a program error**' },
          { ekran:'Fix', islem:'Life corrected with {{AS02}}, {{AFAB}} rerun ✓' },
        ],
        alanlar:{ zorunlu:['Date'], opsiyonel:['User','Error type'] },
        hatalar:[
          { mesaj:'The dump doesn\'t make sense', sebep:'Technical content.', cozum:'The **error type** and **"what the user was doing"** sections are enough; you don\'t need to read source code.' },
          { mesaj:'The same dump keeps repeating', sebep:'The root cause hasn\'t been fixed.', cozum:'If the data isn\'t fixed, it repeats on every run. **Scan for other records** carrying the same issue too.' },
        ],
        ipucu:'**The most common wrong instinct:** *"the program\'s broken, send it to the developer."*\n\n' +
              'Most dumps you see in consulting come from **data or configuration**: ' +
              'an undefined exchange rate, a zero useful life, ' +
              'an empty number range, missing account determination.\n\n' +
              '**Order:** ① read the error type ② find which data it crashed on ' +
              '③ check that data ④ **only if it still makes no sense**, go to the developer.\n\n' +
              'This order finishes most cases at step three.',
        ilgili:['SM21','SM13','SLG1'] },
    ],
  },

  /* ================================================== 6. TABLES === */
  tablolar: {
    anlatim:
      'In error diagnosis, tables do two jobs: **confirming the error** ' +
      '(*"does the data actually exist?"*) and **measuring the scope** ' +
      '(*"how many records were affected?"*).',

    liste:[
      { ad:'T001B', baslik:'Posting periods — the source of the "period closed" error',
        tutar:'By period variant, the **open period ranges** for each account type.',
        olusturan:'{{OB52}}',
        anahtar:'**BUKRS/RRCTY + MKOAR + VONKT**',
        iliskiler:'The company code\'s period variant comes from {{T001}}.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'MKOAR', aciklama:'**Account type** — `+` general · `S` G/L · `K` vendor · `D` customer · `A` asset', tip:'pk' },
          { ad:'FRPE1 / TOPE1', aciklama:'**First** range — normal periods' },
          { ad:'FRPE2 / TOPE2', aciklama:'**Second** range — usually the special periods (13–16)' },
          { ad:'BUKRS', aciklama:'Can be blank — then it applies to **every company code**' },
        ] },

      { ad:'BALHDR', baslik:'Application log header — a batch job\'s real result',
        tutar:'The log headers produced by batch jobs.',
        olusturan:'Programs like {{F110}}, {{AFAB}}, {{FF_5}}',
        anahtar:'**LOGNUMBER**',
        iliskiler:'{{SLG1}} reads this table; the message lines are in `BALM`.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'OBJECT / SUBOBJECT', aciklama:'Which program\'s log' },
          { ad:'ALDATE / ALUSER', aciklama:'When, and who ran it' },
          { ad:'PROBCLASS', aciklama:'**The highest message class** — 1 very critical … 4 info. The fastest way to filter' },
        ] },

      { ad:'BKPF', baslik:'The table for measuring scope',
        tutar:'Document headers — **which transaction, which user, when**.',
        olusturan:'Every FI posting',
        anahtar:'BUKRS + BELNR + GJAHR',
        iliskiler:'Holds the reversal link via `STBLG`.',
        s4:'Stays; the line items are in {{ACDOCA}}.',
        alanlar:[
          { ad:'TCODE', aciklama:'**The transaction that produced the document** — *"which screen were these bad postings entered from?"*' },
          { ad:'USNAM', aciklama:'The posting user — is anyone else making the same mistake?' },
          { ad:'STBLG', aciklama:'**The reversal document** — if filled in, this document has been reversed' },
          { ad:'CPUDT', aciklama:'Entry date — **can differ from the posting date**' },
        ] },

      { ad:'CDHDR', baslik:'Change documents — the answer to "it worked yesterday"',
        tutar:'For master data and some configuration, **who changed what, when**.',
        olusturan:'Every object that has change-document logging on',
        anahtar:'OBJECTCLAS + OBJECTID + CHANGENR',
        iliskiler:'Field-level detail is in {{CDPOS}} — the old and new value.',
        s4:'Unchanged.',
        alanlar:[
          { ad:'OBJECTCLAS', aciklama:'Object class — `KRED` vendor, `DEBI` customer, `SACH` G/L' },
          { ad:'UDATE / USERNAME', aciklama:'**The first place to look** when someone says *"it worked yesterday"*' },
          { ad:'TCODE', aciklama:'The transaction the change was made in' },
        ] },
    ],

    er:{
      type:'er',
      baslik:'The relationships between diagnostic tables',
      varliklar:[
        { ad:'BKPF', rol:'Document', hub:true, aciklama:'**Measuring scope** — who, which code, when',
          alanlar:[{ ad:'BELNR', tip:'pk' }, { ad:'TCODE' }, { ad:'USNAM' }, { ad:'STBLG' }] },
        { ad:'T001B', rol:'Setting', aciklama:'The **source** of the *"period closed"* error',
          alanlar:[{ ad:'MKOAR', tip:'pk' }, { ad:'FRPE1' }, { ad:'TOPE1' }] },
        { ad:'CDHDR', rol:'Change', aciklama:'*"It worked yesterday"* — **what changed?**',
          alanlar:[{ ad:'CHANGENR', tip:'pk' }, { ad:'UDATE' }, { ad:'USERNAME' }] },
        { ad:'CDPOS', rol:'Detail', aciklama:'**The old and new value**',
          alanlar:[{ ad:'CHANGENR', tip:'fk' }, { ad:'FNAME' }, { ad:'VALUE_OLD' }, { ad:'VALUE_NEW' }] },
        { ad:'BALHDR', rol:'Log', aciklama:'A **batch job\'s** real result',
          alanlar:[{ ad:'LOGNUMBER', tip:'pk' }, { ad:'OBJECT' }, { ad:'PROBCLASS' }] },
      ],
      iliskiler:[
        { from:'CDHDR', to:'CDPOS', alanlar:'CHANGENR', not:'old → new, **field by field**' },
        { from:'BKPF', to:'T001B', alanlar:'BUKRS', not:'period check' },
        { from:'BKPF', to:'CDHDR', alanlar:'—', not:'a master-data change affects the document' },
        { from:'BALHDR', to:'BKPF', alanlar:'—', not:'the batch job → the documents it produced' },
      ],
    },
  },

  /* ================================================= 7. IN THE SYSTEM === */
  sapSurec: {
    anlatim:
      'Diagnosis happens across three screens, and **the order matters**: ' +
      'the message itself → authorization/lock/update → the batch job log.',

    ekranlar:[
      { ad:'The message itself — double-click it',
        aciklama:'The most skipped and most useful step.',
        alanlar:[
          { ad:'Message number', zorunlu:true, aciklama:'Something like `F5 201`. It\'s the **number, not the text**, that gets searched — the text changes by language.' },
          { ad:'Diagnosis', zorunlu:false, aciklama:'What happened.' },
          { ad:'System response', zorunlu:false, aciklama:'What the system did.' },
          { ad:'**Procedure**', zorunlu:false, aciklama:'**What needs to be done** — solves most cases on its own.' },
        ],
        ipucu:'**Reading the message\'s long text is the single highest-return ' +
              'habit in FI support.**\n\n' +
              'Most SAP messages have a **Procedure** section and ' +
              'the fix is **written there**. New consultants ' +
              'almost never open this section; experienced ones check it first.' },

      { ad:'{{SU53}} · {{SM12}} · {{SM13}} — three silent causes',
        aciklama:'When there\'s no message, or the message isn\'t enough.',
        alanlar:[
          { ad:'{{SU53}}', zorunlu:false, aciklama:'**Authorization** — run **immediately** if a list comes back empty.' },
          { ad:'{{SM12}}', zorunlu:false, aciklama:'**Lock** — if the transaction hangs. Never delete by hand.' },
          { ad:'{{SM13}}', zorunlu:false, aciklama:'**Update termination** — a number exists, no document.' },
          { ad:'{{SM21}}', zorunlu:false, aciklama:'The system log — for a **system**, not application, issue.' },
        ],
        ipucu:'These three correspond to **different symptoms** and ' +
              'shouldn\'t be confused:\n\n' +
              '**Empty list** → {{SU53}}\n' +
              '**Transaction hangs** → {{SM12}}\n' +
              '**Said "saved" but the document doesn\'t exist** → {{SM13}}\n\n' +
              'Matching the symptom to the right tool cuts diagnosis time to minutes.' },

      { ad:'{{SLG1}} · {{SM37}} · {{SP01}} — the batch-job trio',
        aciklama:'For a batch job, **all three** get checked; each says something different.',
        alanlar:[
          { ad:'{{SM37}}', zorunlu:false, aciklama:'*"Did the program run, did it crash?"*' },
          { ad:'{{SLG1}}', zorunlu:false, aciklama:'*"Was the job done **correctly**?"* — line by line.' },
          { ad:'{{SP01}}', zorunlu:false, aciklama:'*"Was output produced?"* — {{F150}} dunning letters.' },
        ],
        ipucu:'**Seeing "completed successfully" in {{SM37}} isn\'t enough.**\n\n' +
              'Job status tells you the **program didn\'t crash**; ' +
              'it doesn\'t tell you the items were **processed**.\n\n' +
              'An {{F110}} run can finish successfully and **produce no payments at all** — ' +
              'every item was blocked in the proposal. ' +
              '{{SM37}} green, {{SLG1}} red.' },
    ],

    zorunlu:['Message number','Transaction code','User and company code'],
    opsiyonel:['A screenshot','The answer to "did it work before?"'],

    hatalar:[
      { mesaj:'Posting period ... is not open (`F5 201`)', sebep:'The period is closed in {{OB52}}.', cozum:'Check the **account-type row** — even if `+` is open, `K`/`D`/`A` may be closed.' },
      { mesaj:'Account determination for entry ... not possible', sebep:'No line in {{OBYC}}/{{VKOA}}/{{OB40}}.', cozum:'The module tells you which table to look at. Usually a **new valuation class** was added and no line was created.' },
      { mesaj:'Document not balanced — but it looks balanced on screen', sebep:'{{belge-bolme}} is active; the splitting characteristic is missing in the ledger view.', cozum:'Check whether a splitting characteristic like profit center was filled in (see {{konu:new-gl}}).' },
      { mesaj:'The list comes back empty, no error', sebep:'No data authorization — applied as a filter.', cozum:'Check with {{SE16N}} whether the data exists → {{SU53}} **right away**.' },
      { mesaj:'"Document saved" but it\'s not in {{FB03}}', sebep:'{{guncelleme-hatasi}}.', cozum:'Check {{SM13}}. Do a **count reconciliation** after a bulk load.' },
      { mesaj:'The transaction hangs, won\'t save', sebep:'{{kilitleme}} — another transaction is holding the object.', cozum:'Find the owner in {{SM12}} → check in {{SM37}} whether the job is still running → **wait** if it is.' },
      { mesaj:'I changed the setting, no effect', sebep:'{{tampon}} buffering, or the transport hasn\'t arrived.', cozum:'If it\'s the same system, refresh the session / `/$sync`. If a different system, check the `STMS` transport return code.' },
      { mesaj:'The batch job "finished" but the result is incomplete', sebep:'{{SM37}} only shows whether it crashed.', cozum:'Read the **line-level** log in {{SLG1}}.' },
      { mesaj:'The user entered it correctly but the report shows something else', sebep:'An active **substitution** is overwriting it.', cozum:'Check {{GGB1}} / {{OBBH}} / {{GGB4}} — the last thing anyone thinks of, but the real cause ({{konu:dogrulama-ikame}}).' },
    ],

    ipuclari:[
      '**Double-click the message — the "Procedure" section solves most cases.**',
      'Search by the **number**, not the text: `F5 201`. The text changes by language and version.',
      '**"Did it work before?"** splits the search in two: ' +
      'never worked means **configuration**, worked yesterday means a **change** ({{CDHDR}}).',
      'An empty list **doesn\'t mean "no data"**: {{SE16N}} → then {{SU53}} **right away**.',
      '{{SM37}} isn\'t enough for a batch job — {{SLG1}} tells the real, line-level story.',
      '**Count reconciliation** after a bulk load: records sent = documents created. If not, check {{SM13}}.',
      'When you see a dump, check the **data** first; most dumps aren\'t program errors.',
      'A lock is **never deleted by hand** — first check in {{SM37}} whether the job is still running.',
      'After fixing it, **scan for the same class**: others using the same role, account, or tax code ' +
      'may be affected too.',
    ],
  },

  /* ===================================================== 8. TECHNICAL DETAIL === */
  teknik: {
    guncellenenTablolar:[
      { tablo:'T001B', ne:'Period ranges — **read/written** via {{OB52}}' },
      { tablo:'BALHDR', ne:'Batch job log header — written by the program' },
      { tablo:'CDHDR', ne:'Change header — written when master data changes' },
      { tablo:'CDPOS', ne:'Field-level **old → new** value' },
    ],

    commit:
      'In error handling the LUW concept is critical because **a "saved" message ' +
      'doesn\'t mean the posting was written**.\n\n' +
      'In SAP, saving is a two-step process:\n\n' +
      '**1. The dialog task** — the user saves, **a number is assigned**, the screen returns.\n' +
      '**2. The update task** — the actual writing happens **asynchronously**.\n\n' +
      'If the second one crashes, the user **has already seen the success message** but the document doesn\'t exist. ' +
      'The number is also **consumed** — a gap forms in document numbers.\n\n' +
      'This explains why {{guncelleme-hatasi}} is so sneaky, and ' +
      'why a **count reconciliation** is mandatory after a bulk load.',

    belgeNo:
      'The document number is assigned **during the dialog step**. Because of this:\n\n' +
      '• If the update crashes, the number is **consumed** — no document ever gets that number.\n' +
      '• A **gap** forms in the number range, and this is normal.\n' +
      '• An audit may ask *"why are these numbers missing?"*; ' +
      'the answer is the {{SM13}} records.\n\n' +
      'When the number range **runs out**, a different error appears and ' +
      'all posting stops. Check the range with {{FBN1}} — ' +
      'a check that\'s often skipped during year-end transitions.',

    postingLogic:
      'During a posting attempt, checks run **in this order**. ' +
      'Knowing the order tells you which layer an error is coming from:\n\n' +
      '**1. Authorization** — `S_TCODE`, then object authorizations\n' +
      '**2. {{alan-durumu}}** — mandatory/optional/hidden\n' +
      '**3. Master data** — does the account exist, is it blocked, is it open for this company code\n' +
      '**4. Period** — {{OB52}} / {{T001B}}, by account type\n' +
      '**5. {{konu:dogrulama-ikame}}** — **substitution** first, then **validation**\n' +
      '**6. Balance** — debit = credit (and, if {{belge-bolme}} applies, also in the ledger view)\n' +
      '**7. Account determination** — {{OBYC}}/{{VKOA}}/{{OB40}} for automatic lines\n' +
      '**8. Number range** — the document number is assigned\n' +
      '**9. The update task** — **asynchronous**; if it crashes here, it\'s silent\n\n' +
      '**Practical use:** at which stage did the error occur? ' +
      'If you got a field error, it **hasn\'t reached** the period check yet — ' +
      'checking the period would be a waste of time.',

    belgeTuru:
      '{{belge-turu}} is a source of three separate errors:\n\n' +
      '**Missing number range** → *"No number range found for document type ..."*. ' +
      '{{OBA7}} + {{FBN1}}. On year-based ranges, this breaks at **year end**.\n\n' +
      '**Allowed account type** → a document type only allows certain account types; ' +
      'trying a G/L posting with `KR` gives an error.\n\n' +
      '**Reversal document type** → if none is defined for {{FB08}}, the document can\'t be reversed.',

    numberRange:
      '**The most commonly skipped check at year-end transition.**\n\n' +
      'Document number ranges can be defined **by year**. ' +
      'If the new year\'s range hasn\'t been opened with {{FBN1}}, ' +
      '**no posting can be made at all** on the morning of January 1.\n\n' +
      'The same holds on the CO side for {{KANK}}, and it\'s even worse there: ' +
      'if the CO number range is missing, **the FI posting stops too** ' +
      '(see {{konu:co-integration}}).\n\n' +
      '**Lasting prevention:** add ' +
      '*"were next year\'s number ranges opened?"* to the year-end checklist — ' +
      'and check it **in December**, not in January.',

    accountDetermination:
      '*"Account determination not possible"* routes to a **different table depending ' +
      'on which module** it\'s coming from:\n\n' +
      '**MM** ({{MIGO}}, {{MIRO}}) → {{OBYC}} · keys `BSX` `WRX` `PRD` `GBB` `FR1`\n' +
      '**SD** ({{VF01}}) → {{VKOA}} · `ERL` `ERS` `ERF`\n' +
      '**Tax** → {{OB40}} / {{T030K}} · a three-field key\n' +
      '**Fixed asset** → {{AO90}} · by valuation class\n\n' +
      '**The most common root cause is the same one:** a new **valuation class**, ' +
      'a new **tax code**, or a new **account group** was opened, ' +
      'but no line was added to the account-determination table.\n\n' +
      'That\'s why the process for opening a new X ' +
      'should get a *"was account determination set up?"* step added.',

    tur:
      'Message classes decide an error\'s **strength**:\n\n' +
      '**E (Error)** — the posting **is blocked**. The only real protection.\n' +
      '**W (Warning)** — warns, the user **presses Enter and moves past it**.\n' +
      '**I (Information)** — informs.\n' +
      '**A (Abort)** — the transaction ends.\n' +
      '**S (Success)** — success.\n\n' +
      '**A control built with W is no control at all.** ' +
      'On the first busy day everyone presses Enter and the rule effectively disappears. ' +
      'The same principle as in {{konu:dogrulama-ikame}}.',

    transport:
      'A significant share of errors are **transport-related**:\n\n' +
      '**Missing transport** — the setting exists in test, not in production.\n' +
      '**Sequence error** — a dependent object arrived first.\n' +
      '**Return code 4** — not "successful"; it means **it passed with a warning**, ' +
      'and some objects may not have come along. Read the `STMS` log line by line.\n\n' +
      '**A role ({{PFCG}}) transports separately.** Even if configuration went live, ' +
      'a user is left without authorization if the role wasn\'t updated — ' +
      'one of the most commonly skipped steps in a cutover.',

    img:[
      { yol:'OB52 → Open and Close Posting Periods', not:'Check the account-type rows separately' },
      { yol:'OBA5 → Message Control', not:'Error ↔ warning. Ask "what was it protecting?" before turning it off' },
      { yol:'FBN1 → Document Number Ranges', not:'A year-end check — **in December**' },
      { yol:'OBC4 → Field Status Groups', not:'Evaluated together with the {{OB41}} posting key' },
      { yol:'PFCG → Role Maintenance', not:'The source of authorization errors; transports separately' },
    ],

    ekstra:[
      { ic:'🎯', baslik:'Symptom → tool mapping (the diagnostic card)', metin:
        'The whole of diagnosis comes down to **mapping the symptom to the right tool**. ' +
        'This table is the topic\'s practical summary:\n\n' +
        '| Symptom | Where to look first |\n' +
        '|---|---|\n' +
        '| An error with a message | **Double-click the message → Procedure** |\n' +
        '| *"Not authorized"* | {{SU53}} → {{SU01}} role validity |\n' +
        '| **Empty list, no error** | {{SE16N}} (does the data exist) → {{SU53}} **right away** |\n' +
        '| *"Saved"* but the document doesn\'t exist | {{SM13}} |\n' +
        '| Transaction hangs | {{SM12}} → {{SM37}} |\n' +
        '| Batch job incomplete | {{SM37}} + **{{SLG1}}** |\n' +
        '| No output arrived | {{SP01}} |\n' +
        '| Program crashed | {{ST22}} → **check the data first** |\n' +
        '| Setting has no effect (same system) | {{tampon}} → refresh session / `/$sync` |\n' +
        '| Setting has no effect (another system) | `STMS` transport return code |\n' +
        '| **Value changes on its own** | {{GGB1}} substitution inventory |\n' +
        '| *"It worked yesterday"* | {{CDHDR}} / {{CDPOS}} — **what changed?** |\n' +
        '| A system-wide issue | {{SM21}} |\n\n' +
        '**Memorizing this table is far more efficient than memorizing error messages** — ' +
        'because messages number in the thousands, while symptoms number ten.' },

      { ic:'🔁', baslik:'Root cause or symptom? — ask "why" three times', metin:
        'There are two ways to fix an error, and they give **very different** results.\n\n' +
        '**Fixing the symptom:** open the period, let the posting through, close the period. ' +
        'Solved today, **repeats tomorrow**.\n\n' +
        '**Finding the root cause:** asking *"why was the period closed?"*\n\n' +
        '---\n\n' +
        '**Example — asking "why" three times:**\n\n' +
        '*The invoice can\'t be posted.* **Why?**\n' +
        '→ The period is closed. **Why?**\n' +
        '→ Month-end close already ran. **Why did the invoice arrive late?**\n' +
        '→ Purchase invoices only reach accounting in a **weekly** batch.\n\n' +
        '**The real problem is found:** it isn\'t the period, it\'s **the invoice flow**.\n\n' +
        'Fixing the symptom creates a task that repeats every month; ' +
        'fixing the root cause **ends** the problem.\n\n' +
        '---\n\n' +
        '**A consultant\'s closing reflex should be two questions:**\n\n' +
        '**1.** *"Why was this possible?"* → the root cause\n' +
        '**2.** *"Who else has it?"* → scan for the same class\n\n' +
        'The second question often turns up **unreported cases**. ' +
        'Users don\'t report silent errors — they **work around them** ' +
        '(see the {{konu:tcodes}} scenario: the scan found two more users).' },
    ],

    notlar:[
      { tip:'warn', baslik:'"Silencing the error" is not a fix', metin:
        'The most common **wrong** request a consultant gets: ' +
        '*"This warning shows up on every posting, can you turn it off?"*\n\n' +
        '{{OBA5}} makes this technically possible — but the question should be: ' +
        '**what was this warning protecting?**\n\n' +
        'If a warning comes up a lot, there are two possibilities:\n\n' +
        '**1.** Users really are making a lot of mistakes → ' +
        'the warning **is doing its job**, it shouldn\'t be turned off. Training or ' +
        '{{konu:dogrulama-ikame}} **prevention** is what\'s needed.\n\n' +
        '**2.** The warning is **meaningless** for this business process → ' +
        'it can be turned off, but the **reasoning must be documented**.\n\n' +
        'A message turned off without a reason leaves a question two years later — ' +
        '*"why isn\'t this control here?"* — unanswered, ' +
        'and no one will dare turn it back on.\n\n' +
        '**The same principle applies in reverse, and it\'s more valuable:** ' +
        'if a critical control was built as **W**, {{OBA5}} is used to make it **E**. ' +
        'Only `E` is real protection.' },
    ],
  },

  /* ==================================================== 9. S/4HANA === */
  s4hana: {
    ozet:
      'S/4HANA didn\'t change error **classes** — period, authorization, account determination, ' +
      'and lock errors are the same. Three things did change: ' +
      '**some error classes disappeared**, **a new class was born** (migration errors), ' +
      'and the Fiori interface **shows** messages differently.',

    eccFarklari:[
      { konu:'Period errors', ecc:'{{OB52}}', s4:'**Same** — unchanged' },
      { konu:'Authorization errors', ecc:'`S_TCODE` + object', s4:'**Same** + Fiori tile authorization' },
      { konu:'FI/CO reconciliation gap', ecc:'Separate tables → **a gap could occur**', s4:'**The class disappeared** — {{ACDOCA}} is one table' },
      { konu:'Totals-table inconsistency', ecc:'GLT0 could differ from {{BSEG}} ({{F.03}})', s4:'**Gone** — no totals table, calculated on the fly' },
      { konu:'Index-table inconsistency', ecc:'{{BSIK}} could differ from {{BSEG}}', s4:'**Gone** — the indexes became views' },
      { konu:'Migration errors', ecc:'None', s4:'**A new class** — business partner, account mapping, balance carryover' },
      { konu:'Error message display', ecc:'The GUI status bar', s4:'A Fiori **message box** — access to the long text works differently' },
      { konu:'Dump analysis', ecc:'{{ST22}}', s4:'{{ST22}} **stays**' },
    ],

    universalJournal:
      '**The {{evrensel-kayit-defteri}} eliminated an entire error class.**\n\n' +
      'In ECC, FI and CO sat in **separate tables**; an inconsistency between them was ' +
      'a real and frequent problem. Reconciliation reports like {{F.03}} existed ' +
      'for exactly this, and used to be run **routinely** at month-end.\n\n' +
      'In S/4HANA, FI and CO are **on the same line** ({{ACDOCA}}). ' +
      'A reconciliation gap is **structurally impossible**.\n\n' +
      'The same logic applies to totals and index tables: ' +
      'a difference between GLT0 and {{BSEG}}, between {{BSIK}} and {{BSEG}} — ' +
      'these tables are now **derived views**, so ' +
      'they can\'t be inconsistent with the source.\n\n' +
      '**Architectural lesson:** once you **stop keeping data in two places**, ' +
      'the *"the two places don\'t match"* error class disappears on its own.',

    kalkanTcodes:[
      { eski:'{{F.03}} — FI reconciliation', yeni:'**Unnecessary**', not:'FI/CO are one table; a gap is structurally impossible' },
      { eski:'Totals-table correction programs', yeni:'**Unnecessary**', not:'No totals table — calculated on the fly' },
      { eski:'Index rebuilds', yeni:'**Unnecessary**', not:'The indexes turned into {{uyumluluk-view}}s' },
      { eski:'—', yeni:'**New: migration validation reports**', not:'A new error class: mapping and balance-carryover' },
    ],

    fiori:[
      { ad:'The message box', aciklama:'In Fiori, messages show up not in the status bar but in a ' +
             '**box**. Access to the long text differs from the GUI — ' +
             'a user may think *"there\'s no detail."*' },
      { ad:'Manage Journal Entries', aciklama:'Document search and correction; ' +
             'reversed documents show up **flagged**.' },
      { ad:'Application Jobs', aciklama:'The counterpart to {{SM37}} + {{SLG1}} — ' +
             'job status and the log **on the same screen**.' },
      { ad:'Display Technical Job Log', aciklama:'The Fiori version of the batch job log.' },
      { ad:'The Fiori tile authorization', aciklama:'**A new source of silent errors:** ' +
             'the user has `S_TCODE` authorization but the **tile isn\'t in the role** → ' +
             'the app is **invisible** in the Launchpad. The user says *"the app disappeared."*' },
    ],

    compatibilityViews:[
      '{{uyumluluk-view}}s created **a new error class**: ' +
      'old custom reports work, but **run slower**.',
      'Trying to **write** to a view produces an error — if old custom code ' +
      'tries to write to {{BSEG}}, it won\'t work.',
      'In {{BSEG}} amounts are **positive + `SHKZG`**; in {{ACDOCA}} they\'re **signed**. ' +
      'If the `SHKZG` logic isn\'t **removed** when a query is migrated, the sign gets applied twice ' +
      '(see {{konu:sap-tables}}).',
    ],

    performans:
      'Performance issues don\'t **look like errors** in S/4HANA, but ' +
      'to the user it\'s the same thing: if the report won\'t open, it doesn\'t work.\n\n' +
      'Change went both ways:\n\n' +
      '**Got faster:** standard line-item and balance reports — columnar storage.\n\n' +
      '**Got slower:** **old custom reports** running through {{uyumluluk-view}}s. ' +
      'The view is re-derived from {{ACDOCA}} on every query.\n\n' +
      '**Lasting fix:** rewrite custom reports to read {{ACDOCA}} directly. ' +
      'This work is often **left out of scope** during migration, ' +
      'and comes back as a problem after going live.',

    bestPractices:[
      'Before migration, take an **inventory of dumps and update errors**: ' +
      'existing issues in {{ST22}} and {{SM13}} get reported as ' +
      '**"S/4HANA broke this"** after migration. Document the current state first.',
      'Review existing {{konu:dogrulama-ikame}} rules — ' +
      'some may not be compatible with the {{ACDOCA}} field structure.',
      'Teach users **how to access the long text in Fiori**; ' +
      'otherwise you\'ll get the complaint *"there\'s no error detail."*',
      'Include the **Fiori tile authorization** in role design — ' +
      '`S_TCODE` alone isn\'t enough; if the app is invisible, the user can\'t reach it.',
      'Check {{SM13}} and {{SLG1}} **daily** for the first month after going live; ' +
      'silent errors cluster in this period.',
      'Find out **before migration** whether custom reports use a {{uyumluluk-view}}; ' +
      'a performance problem should be found in test, not in production.',
    ],
  },

  /* =================================================== 10. REAL SCENARIO === */
  senaryo: {
    baslik:'"Depreciation ran" — but 34 assets were never processed',
    hikaye:
      'At **Kuzey Metal Inc.**, November close. The accounting manager ' +
      'kicks off the {{AFAB}} depreciation run in the background.\n\n' +
      'In {{SM37}}, the job is **green**: *"Completed successfully."*\n\n' +
      'Close finishes, the trial balance is pulled, the report goes to management.\n\n' +
      '---\n\n' +
      '**Three weeks later**, during a check at the December close, ' +
      'the accumulated depreciation account is found to be lower than expected.\n\n' +
      'The gap: **1,847,000 TRY**.',
    veriler:[
      { k:'Transaction', v:'**{{AFAB}}** — November 2027 period' },
      { k:'{{SM37}} status', v:'**Completed successfully** ✓ (green)' },
      { k:'Expected depreciation', v:'8,420,000 TRY' },
      { k:'Posted', v:'**6,573,000 TRY**' },
      { k:'Gap', v:'**1,847,000 TRY**' },
      { k:'When noticed', v:'**3 weeks later** — during December close' },
    ],

    adimlar:[
      { baslik:'Was the job really successful? — two screens disagree', tcode:'SM37',
        aciklama:'First the job status, then the job log.',
        girdi:[
          { alan:'{{SM37}}', deger:'Job `RAPOST2000` · status **Completed successfully**' },
          { alan:'Duration', deger:'14 minutes — normal' },
          { alan:'Conclusion', deger:'The program **didn\'t crash**' },
          { alan:'But', deger:'*"Didn\'t crash"* ≠ *"did it correctly"*' },
        ],
        not:'**This is the heart of the scenario.**\n\n' +
             '{{SM37}} only tells you **the program didn\'t crash**. ' +
             'It doesn\'t tell you **the items were processed**.\n\n' +
             'The accounting manager saw green and proceeded with the close — ' +
             'and that was a completely reasonable thing to do. ' +
             'The problem isn\'t the person, it\'s **the missing check step**.' },

      { baslik:'The real result: the application log', tcode:'SLG1',
        aciklama:'The detail behind the on-screen summary is read.',
        girdi:[
          { alan:'Object', deger:'Fixed asset depreciation · November 2027' },
          { alan:'Red messages', deger:'**34 lines**' },
          { alan:'Message', deger:'*"Useful life missing for depreciation key ..."*' },
          { alan:'Affected', deger:'34 assets — **1,847,000 TRY** total' },
        ],
        not:'**The job is green, the log is red.**\n\n' +
             'The program couldn\'t process 34 assets, **threw an error and kept going**, ' +
             'processing the remaining assets normally. ' +
             'This is a **deliberate design** for batch programs — ' +
             'you don\'t want 5,000 assets left unprocessed because of one bad record.\n\n' +
             'But this design makes the error invisible **if the log isn\'t read**.' },

      { baslik:'What do the 34 assets have in common?', tcode:'SE16N',
        aciklama:'Instead of checking one by one, a common pattern is looked for.',
        girdi:[
          { alan:'Table', deger:'{{ANLB}} — the asset\'s depreciation parameters' },
          { alan:'Filter', deger:'The 34 asset numbers' },
          { alan:'Common point', deger:'All are **the same asset class**: `Z400` (molds and fixtures)' },
          { alan:'Missing field', deger:'Useful life = **blank**' },
        ],
        not:'**Looking for a common pattern instead of checking one by one** cuts diagnosis time ' +
             'from hours to minutes.\n\n' +
             'If all 34 assets come from the same class, the problem isn\'t ' +
             '34 separate errors — it\'s **one** error.' },

      { baslik:'"It worked yesterday" — what changed?', tcode:'SE16N',
        aciklama:'Is the asset class new, or did something change?',
        girdi:[
          { alan:'Table', deger:'{{CDHDR}} / {{CDPOS}} — change documents' },
          { alan:'Finding', deger:'Class `Z400` was opened on **12.10.2027**' },
          { alan:'Opened by', deger:'A consultant — for a new product line' },
          { alan:'Missing', deger:'The class\'s **default useful life** was never entered' },
        ],
        not:'**The root cause is found.**\n\n' +
             'A new asset class was opened, but {{OAOA}} was never given a **default life**. ' +
             'Users opening assets didn\'t enter the life either — ' +
             'because with other classes it **filled in automatically**.\n\n' +
             'Assets opened in October couldn\'t take depreciation for October or November. ' +
             'No one noticed in October because **the amount was small** and, again, ' +
             'the log wasn\'t read.' },

      { baslik:'Is the scope really 34? — October is checked too', tcode:'SLG1',
        aciklama:'Once one period is found, earlier ones are scanned too.',
        girdi:[
          { alan:'October 2027 log', deger:'**11 red lines** — the same error' },
          { alan:'October gap', deger:'412,000 TRY' },
          { alan:'Total impact', deger:'**2,259,000 TRY** (October + November)' },
          { alan:'Lesson', deger:'The period an error is **found** in is not the period it **started** in' },
        ],
        not:'**A critical step.** The period an error is **found** in ' +
             'isn\'t the period it **started** in.\n\n' +
             '34 assets were affected in November, 11 in October. ' +
             'If only November had been fixed, the October gap would have ' +
             'silently persisted and resurfaced at year end.\n\n' +
             '**Rule:** once a batch job error is found, ' +
             '**earlier periods are scanned too**.' },

      { baslik:'The fix — master data first, then a rerun', tcode:'AFAB',
        aciklama:'Root cause first, then the missing depreciation.',
        girdi:[
          { alan:'① {{OAOA}}', deger:'A **default life** was defined for class `Z400`' },
          { alan:'② {{AS02}}', deger:'The life on 45 assets was updated in bulk' },
          { alan:'③ {{AFAB}}', deger:'**Repeat run** mode · November period' },
          { alan:'④ October', deger:'Closed — the gap was posted **to November**' },
          { alan:'⑤ Validation', deger:'{{SLG1}} → **0 red** ✓' },
        ],
        fis:{ baslik:'Completing the missing depreciation', belgeTuru:'AF', tarih:'30.11.2027',
          satirlar:[
            { hesap:'770', ad:'Depreciation expense', borc:2259000, not:'October + November gap' },
            { hesap:'257', ad:'Accumulated depreciation', alacak:2259000 },
          ], not:'Because October was closed, **both months\' gap landed in November**.\n\n' +
                 'The accounting is correct — the total depreciation is right. ' +
                 'But **November\'s expense looks inflated** and ' +
                 'needs an explanation in the monthly comparative report.\n\n' +
                 'If the error had been found in October, this problem would **never have existed**.' },
        tabloEtkisi:[
          { tablo:'ANLB', ne:'Useful life filled in — 45 assets' },
          { tablo:'ANLC', ne:'Depreciation values recalculated' },
          { tablo:'ACDOCA', ne:'Depreciation lines were written to **the November period**' },
        ],
        not:'**The order mattered.** First {{OAOA}} (the class default), ' +
             'then {{AS02}} (existing assets), and only then {{AFAB}}.\n\n' +
             'If the assets had been fixed before the class, ' +
             'new assets opened in December would have **repeated the same error**.' },

      { baslik:'Lasting fixes — never silent again', tcode:'SLG1',
        aciklama:'Four fixes: control, prevention, process, scan.',
        girdi:[
          { alan:'Fix 1 — Control', deger:'A **"{{SLG1}} red = 0"** step was added to the closing checklist. {{SM37}} green **no longer counts as enough**' },
          { alan:'Fix 2 — Prevention', deger:'A {{konu:dogrulama-ikame}} rule: **an asset can\'t be opened if useful life is blank** (message type **E**)' },
          { alan:'Fix 3 — Process', deger:'A **"was a default life defined?"** item added to the new-asset-class checklist' },
          { alan:'Fix 4 — Scan', deger:'Every asset class was scanned → **2 more classes** found with a missing default' },
        ],
        not:'**The fourth fix turned up two more classes** — ' +
             'no asset had been opened for them yet, so the problem was prevented **before it hit**.\n\n' +
             'This shows why diagnosis\'s last step should always be ' +
             '*"who else has it?"*\n\n' +
             '---\n\n' +
             '**The second fix is the most valuable.** The control step ({{SLG1}}) catches the error ' +
             '**a month later**; the validation rule ' +
             '**never lets it happen at all**.\n\n' +
             'And the message type was deliberately chosen as **E** — ' +
             'if it had been **W**, users would have pressed Enter and moved past it.' },
    ],

    sonuc:
      '**The job was green, the log was red — and the gap was found 3 weeks later.**\n\n' +
      '**Five key lessons:**\n\n' +
      '**1. {{SM37}} and {{SLG1}} answer different questions.** ' +
      '{{SM37}} asks *"did the program crash?"*, {{SLG1}} asks *"was the job done correctly?"*. ' +
      'Batch programs are designed to **skip a bad item and keep going** — ' +
      'that\'s the right design, but it makes the error **invisible** if the log isn\'t read. ' +
      'The closing checklist should have a *"{{SLG1}} red = 0"* step.\n\n' +
      '**2. The period an error is found in isn\'t the period it started in.** ' +
      '34 assets showed up in November; scanning October too turned up **11 more**. ' +
      'Once a batch job error is found, **scan earlier periods too**.\n\n' +
      '**3. The delay increased the cost of the fix.** ' +
      'Because October was closed, both months\' gap landed **in November**. ' +
      'The accounting is correct but November\'s expense looked inflated and ' +
      'needed an explanation in the comparative report. ' +
      'If it had been found in October, this problem would **never have existed**.\n\n' +
      '**4. The root cause wasn\'t 34 assets, it was one asset class.** ' +
      'Because a **common pattern** was sought instead of checking one by one, ' +
      'diagnosis took minutes. And {{CDHDR}} answered *"what changed?"* ' +
      'by showing the class was opened in October.\n\n' +
      '**5. Checking and preventing are different things.** ' +
      'The {{SLG1}} check catches the error **a month later**. ' +
      'A validation rule ({{konu:dogrulama-ikame}}) **never lets it happen at all**. ' +
      'Both should be set up together — and the rule should be **`E`**, ' +
      'since `W` gets bypassed on the first busy day.',
  },

  },
});
