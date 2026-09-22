/* ==========================================================================
   data/glossary-en.js — data/glossary.js'in İngilizce üst katmanı
   --------------------------------------------------------------------------
   `anahtar` ile eşleşir, alanlar `_en` ekiyle TR kaydın üstüne MERGE olur
   (js/core.js → registerTermsEn). Terim ADLARI zaten glossary.js'teki `en`
   alanında; burada TANIMLAR çevrilir.
   ========================================================================== */

SAP.registerTermsEn([

  { anahtar:'borc',
    aciklama:'The left-hand side of an account. It represents an increase in asset and expense accounts, and a decrease in liability, equity and revenue accounts.',
    detay:'SAP stores it in the `SHKZG` field as **S** (Soll).' },

  { anahtar:'alacak',
    aciklama:'The right-hand side of an account. It represents an increase in liability, equity and revenue accounts, and a decrease in asset and expense accounts.',
    detay:'SAP stores it in the `SHKZG` field as **H** (Haben).' },

  { anahtar:'cift-tarafli-kayit',
    aciklama:'The principle that every transaction is posted to at least two accounts, with the debit and credit totals equal.',
    detay:'SAP enforces this rule: a document where debit ≠ credit cannot be posted, only parked.' },

  { anahtar:'belge-denkligi',
    aciklama:'The debit total of an accounting document must equal its credit total. An unbalanced document cannot be posted.' },

  { anahtar:'tahakkuk-esasi',
    aciklama:'Recording income and expense in the period they are earned or incurred, independent of any cash movement.',
    detay:'Electricity used in December but invoiced in January is accrued to the December period.' },

  { anahtar:'nakit-esasi',
    aciklama:'Recording income and expense only when cash actually changes hands. Rare in corporate accounting.' },

  { anahtar:'bilanco',
    aciklama:'The statement showing assets, liabilities and equity at a specific point in time. Its balances do not reset at year-end — they carry forward.' },

  { anahtar:'gelir-tablosu',
    aciklama:'The statement showing income and expense for a period and the resulting profit or loss. Its balances reset to zero at year-end and the result is transferred to equity.' },

  { anahtar:'mizan',
    aciklama:'A control list showing the debit, credit and balance totals of every account. Total debits must equal total credits.' },

  { anahtar:'yevmiye',
    aciklama:'The ledger in which transactions are recorded chronologically, entry by entry. In SAP, every FI document is a journal entry.' },

  { anahtar:'muavin-defter',
    aciklama:'The subsidiary ledger where detail such as customers, vendors and fixed assets is kept. Its total is reflected in the reconciliation account in the general ledger.' },

  { anahtar:'ana-muhasebe',
    aciklama:'The main ledger from which financial statements are produced. Every sub-ledger is reflected here in summary.' },

  { anahtar:'sirket-kodu',
    aciklama:'The smallest legal unit for which an independent balance sheet and income statement are produced. It is FI\'s mandatory organizational level.',
    detay:'Held in table {{T001}}, defined with {{OX02}}.' },

  { anahtar:'hesap-plani',
    aciklama:'The list of general ledger accounts a company uses. A single chart of accounts can be shared by several company codes.',
    detay:'There are three types: operating, country and group chart of accounts.' },

  { anahtar:'hesap-grubu',
    aciklama:'A classification that groups similar accounts and determines their number range and which fields are required, optional or hidden.',
    detay:'Defined with {{OBD4}}, held in table {{T077S}}.' },

  { anahtar:'mali-yil-varyanti',
    aciklama:'Defines how many normal and special periods the fiscal year is split into (e.g. 12 normal + 4 special).',
    detay:'Special periods are used to separate year-end adjustments from the December posting. Defined with {{OB29}}.' },

  { anahtar:'ozel-donem',
    aciklama:'Extra periods (13–16) that follow the fiscal year\'s last month, used only for closing adjustments.' },

  { anahtar:'kayit-donemi',
    aciklama:'The accounting period a document falls into. It is derived from the posting date (`BUDAT`).',
    detay:'Opened and closed per account type with {{OB52}}; held in table {{T001B}}.' },

  { anahtar:'ana-veri',
    aciklama:'Data that persists across transactions and rarely changes: accounts, vendors, customers, assets. It does not travel with a transport request — it is loaded separately into every system.' },

  { anahtar:'hareket-verisi',
    aciklama:'Dated data that records a single event: invoices, payments, goods movements.' },

  { anahtar:'ozellestirme',
    aciklama:'Adapting the system to a company\'s business rules. Done from the {{SPRO}} tree and moved to the test/production system via a transport request.' },

  { anahtar:'img-yolu',
    aciklama:'A configuration step\'s exact location in the {{SPRO}} tree. Consulting documentation describes a step by this path.' },

  { anahtar:'tasima-istegi',
    aciklama:'A package that moves configuration and program changes made in the development system to the test and production systems.',
    detay:'Master data and transaction data are never part of a transport request — only customizing and development are.' },

  { anahtar:'belge-turu',
    aciklama:'A two-letter code stating what kind of transaction a document is (KR vendor invoice, DZ customer payment, SA general, RV SD invoice, AB general).',
    detay:'Determines the number range and which account types are allowed. Defined with {{OBA7}}, held in table {{T003}}.' },

  { anahtar:'kayit-anahtari',
    aciklama:'A two-digit code that states whether a line is a debit or a credit, which account type it posts to, and its field status.',
    detay:'The best known: 40 G/L debit, 50 G/L credit, 31 vendor credit, 21 vendor debit, 01 customer debit, 15 customer credit.' },

  { anahtar:'hesap-tipi',
    aciklama:'A single letter showing which ledger a posting affects: S general ledger, D customer, K vendor, A fixed asset, M material.' },

  { anahtar:'numara-araligi',
    aciklama:'Defines the range document numbers are drawn from. With internal assignment the system assigns the number; with external assignment the user does.',
    detay:'In FI the number range is fiscal-year based — a separate line is needed for each year. Defined with {{FBN1}}.' },

  { anahtar:'alan-durumu',
    aciklama:'Determines whether a field on the entry screen is required, optional, hidden or display-only.',
    detay:'It comes from two sources: the account\'s field status group and the posting key\'s field status. **The most restrictive one wins.**' },

  { anahtar:'park-etme',
    aciklama:'Storing a document without posting it. It can be saved even if it is unbalanced; no account is affected.',
    detay:'A parked document is written to {{BKPF}} but does not enter any balance. Used for approval workflows and the four-eyes principle.' },

  { anahtar:'ters-kayit',
    aciklama:'Zeroing out the effect of a posted document by recording its opposite, instead of deleting it. In accounting, a posted entry is never deleted.',
    detay:'Done with {{FB08}}. The reversal reason determines which date the reversal falls into.' },

  { anahtar:'acik-kalem',
    aciklama:'An item that has no offsetting counterpart yet: an unpaid invoice, an uncollected receivable.',
    detay:'In {{BSEG}}, the item is open if field `AUGBL` is blank.' },

  { anahtar:'kapatma',
    aciklama:'Matching offsetting open items so they become closed. It is where an invoice meets its payment.',
    detay:'Clearing produces a document and writes `AUGBL` (the clearing document) to the items it clears. The cleared total must be zero.' },

  { anahtar:'acik-kalem-yonetimi',
    aciklama:'A master-data setting on a G/L account ({{SKB1}} `XOPVW`) that makes its items tracked as open or cleared.',
    detay:'It must be active for GR/IR, bank clearing and advance accounts; it is not needed on balance accounts such as the main bank account.' },

  { anahtar:'kismi-kapatma',
    aciklama:'When part of a debt is paid, the original item stays open and the payment stands as a separate open item.' },

  { anahtar:'kalan-kapatma',
    aciklama:'On a partial payment, the original item is cleared and a new open item is created for the remaining amount.',
    detay:'Due date is counted from the new item\'s date, not the original invoice — this changes aging, so it must be chosen carefully.' },

  { anahtar:'mutabakat-hesabi',
    aciklama:'The G/L account into which movements on a sub-ledger (vendor/customer/asset) are automatically reflected in the general ledger.',
    detay:'No direct posting can be made to this account — it is only written through the sub-ledger. It is the bridge between master data and accounting.' },

  { anahtar:'tolerans-grubu',
    aciklama:'Defines the maximum amount a user can post and the acceptable difference tolerance when clearing.',
    detay:'If the difference is within the tolerance it is automatically posted to the exchange-difference/discount account; outside it, clearing is blocked.' },

  { anahtar:'odeme-kosulu',
    aciklama:'A key that defines the due date and any early-payment cash discount (e.g. net 30 days, 2% discount within 10 days).',
    detay:'It comes from the master record but can be changed on the document; the due date is calculated from it.' },

  { anahtar:'vade',
    aciklama:'The date by which an item must be paid. Calculated from the base date (`ZFBDT`) plus the number of days in the payment terms.' },

  { anahtar:'iskonto',
    aciklama:'The discount earned when payment is made before the due date. SAP tracks the discount period and {{F110}} picks the most favorable payment day.' },

  { anahtar:'odeme-yontemi',
    aciklama:'A single character showing how a payment is made (transfer, check, promissory note). Defined separately per country and company code.',
    detay:'Defined with {{FBZP}}; the `ZWELS` field in the vendor master record limits which methods can be used.' },

  { anahtar:'odeme-blogu',
    aciklama:'A flag that blocks a vendor or an item from being paid. Used for invoices under dispute or awaiting approval.',
    detay:'{{F110}} does not pick up a blocked item into the proposal.' },

  { anahtar:'ev-bankasi',
    aciklama:'The bank where the company holds its own account. Each house bank has one or more account IDs.',
    detay:'Held in tables {{T012}} / {{T012K}}; each account ID is linked to a G/L account.' },

  { anahtar:'banka-ara-hesabi',
    aciklama:'A clearing account that carries the gap between the moment a payment is posted and the moment the money actually leaves the bank.',
    detay:'The payment is posted to the clearing account; once the bank statement arrives, the clearing account is cleared and the main bank account is updated. A balance that keeps growing means reconciliation is not being done.' },

  { anahtar:'ekstre-eslestirme',
    aciklama:'Matching the lines on a bank statement against the records in the system.' },

  { anahtar:'yaslandirma',
    aciklama:'Distributing open items into day buckets (0–30, 31–60…) based on their due date. The core report of collections and debt management.' },

  { anahtar:'ihtar',
    aciklama:'Reminder and warning letters sent to a customer in stages for overdue receivables.',
    detay:'Language hardens as the dunning level increases; fees and late-payment interest can be added. Run with {{F150}}.' },

  { anahtar:'ihtar-prosedürü',
    aciklama:'A configuration that defines how many dunning levels there are, the number of days between levels, and the tolerance for delay.',
    detay:'Defined with {{FBMP}}, assigned to the customer master record\'s `MAHNA` field.' },

  { anahtar:'tahsilat',
    aciklama:'Collecting a receivable from a customer. It is not revenue — it is one asset (the receivable) turning into another (cash).',
    detay:'Posted with {{F-28}}, which simultaneously clears the customer\'s open item.' },

  { anahtar:'supheli-alacak',
    aciklama:'A receivable at risk of not being collected. The receivable itself is not written off; a provision is set up to bring it to net value on the balance sheet.',
    detay:'In SAP it is separated from a normal receivable with a {{ozel-ana-muhasebe-gostergesi}} (usually E). If collection becomes impossible, the receivable is fully written off.' },

  { anahtar:'kredi-limiti',
    aciklama:'The maximum credit sales amount that can be extended to a customer. A sales order is blocked once it is exceeded.',
    detay:'Managed with FD32 in ECC; S/4HANA uses SAP Credit Management ({{UKM_BP}}).' },

  { anahtar:'ozel-ana-muhasebe-gostergesi',
    aciklama:'A single character that shows a vendor/customer item on an alternative account instead of the normal reconciliation account.',
    detay:'Separates transactions such as down payments (A), guarantees and promissory notes from normal debit/credit because they must be reported as a separate line on the balance sheet.' },

  { anahtar:'avans',
    aciklama:'An amount paid or received before goods or services are delivered. It is neither an expense nor revenue — it sits on the balance sheet as a receivable/payable.' },

  { anahtar:'hareket-turu',
    aciklama:'A three-digit code stating what a fixed-asset transaction is: acquisition, retirement, transfer, value adjustment.',
    detay:'Determines which value fields and which accounts are affected. Best known: **100** acquisition, **200** retirement, **300** transfer, **640** scrapping.' },

  { anahtar:'valor-tarihi',
    aciklama:'The date on which money actually becomes usable in a bank account. It can differ from the posting date.',
    detay:'Cash management and interest calculation look at this date; the accounting period looks at the posting date ({{kayit-donemi}}) instead.' },

  { anahtar:'degerleme-plani',
    aciklama:'The structure that groups every {{amortisman-alani}} definition for a country. Each company code is assigned to a chart of depreciation.',
    detay:'It is country-specific because depreciation rules are set by law. SAP ships a ready template per country, which is copied and used.' },

  { anahtar:'amortisman',
    aciklama:'Expensing a fixed asset\'s cost over its useful life. It is an expense that does not create a cash outflow.' },

  { anahtar:'birikmis-amortisman',
    aciklama:'The total depreciation charged against an asset to date. It sits in a contra account that reduces the asset on the balance sheet.',
    detay:'Acquisition value − accumulated depreciation = net book value.' },

  { anahtar:'net-defter-degeri',
    aciklama:'An asset\'s current recorded value: acquisition value with accumulated depreciation deducted.' },

  { anahtar:'faydali-omur',
    aciklama:'The assumed number of years an asset will be used. It directly determines the depreciation amount.' },

  { anahtar:'amortisman-anahtari',
    aciklama:'The key that determines **how** depreciation is calculated. It looks like a single code but carries **five separate calculation methods** inside it, each answering one part of the question.',
    detay:
      'Telling the system *"depreciate this machine"* is not enough — it does not know **how**. ' +
      'It needs **five answers**:\n\n' +
      '**1.** Which logic? *(straight-line / declining balance)* → {{AFAMR}}\n' +
      '**2.** If declining, how fast? *(multiplier, cap)* → {{AFAMD}}\n' +
      '**3.** Does the rate change over time? *(staggering)* → {{AFAMS}}\n' +
      '**4.** When should it start? *(start of year / month of acquisition)* → {{AFAMP}}\n' +
      '**5.** Is there a cap amount? → maximum-amount method\n\n' +
      '**The depreciation key is these five answers tied to a single code.** ' +
      'You enter `Z_GENEL` on the asset; the system already knows all five.\n\n' +
      '**Why five parts?** A concrete example: a factory machine and a passenger car ' +
      '**want the same thing** — straight-line, from useful life, stopping when the life ends. ' +
      'The only difference: because the car requires {{kist-amortisman}}, depreciation ' +
      'must start **from the month of acquisition**.\n\n' +
      'So two keys are **identical in four of the five slots** and differ only in slot 4. ' +
      'That is the benefit of splitting it into parts: ' +
      '**shared parts are shared, and only what differs is changed.**\n\n' +
      'A step-by-step setup example (comparing `Z_GENEL` / `Z_BINEK`) and every depreciation ' +
      'method under Turkish tax law are in the {{konu:asset-accounting}} topic.',
  },

  { anahtar:'kist-amortisman',
    aciklama:'Charging depreciation for the year an asset is put into use **only for the months it was actually used, not the full year**. ' +
             'Under Turkish tax law this is the **exception, not the rule**: it applies only to passenger cars (VUK art. 320).',
    detay:
      '**This is the most commonly misunderstood rule in Turkish tax law.** The common belief is ' +
      '"an asset acquired mid-year gets pro-rated depreciation." **It is wrong.**\n\n' +
      '**General rule (VUK art. 320/1):** whatever month of the year an asset is acquired, ' +
      'a **full year** of depreciation is charged for that year. A machine bought on December 28 ' +
      'can be depreciated for the entire year.\n\n' +
      '**Exception (VUK art. 320/2):** pro-rata depreciation applies to **passenger cars**. ' +
      'For the fiscal period the vehicle is registered in, depreciation is charged for the ' +
      'remaining months, **counting a partial month as a full month**.\n\n' +
      '*Example:* a passenger car bought on April 15 → 9 months including April → 9/12 of the annual depreciation.\n\n' +
      '**The portion not charged in the first year is not lost:** it is completed as an expense ' +
      'in the final year of {{faydali-omur}}.\n\n' +
      '**Exception to the exception:** businesses whose activity partly or wholly consists of ' +
      '**renting or operating** passenger cars (car rental companies, driving schools) do not apply ' +
      'pro-rata — for them the car is trade stock, and a full year of depreciation is charged.\n\n' +
      '**SAP equivalent:** this is the **period control method** defined by {{AFAMP}}. ' +
      'A "from the start of the year" rule is used for general assets, and a separate depreciation ' +
      'key carrying a "proportional from month of acquisition" rule is used for passenger cars.',
  },

  { anahtar:'azalan-bakiyeler',
    aciklama:'An accelerated method where depreciation is calculated **not on the acquisition value but on the {{net-defter-degeri}}**. ' +
             'Turkish tax law, VUK repeated art. 315.',
    detay:
      '**How it works:** each year a fixed rate is applied to the remaining net book value. ' +
      'Because the base shrinks, the depreciation amount shrinks every year too — high in the early years, low later.\n\n' +
      '**Rules under Turkish tax law:**\n\n' +
      '• The rate is **twice** the normal depreciation rate and **cannot exceed 50%**.\n' +
      '• Only taxpayers keeping books on the balance-sheet basis may apply it.\n' +
      '• In the **final year** the entire remaining net book value is charged as depreciation — ' +
      'otherwise the asset would never reach zero, since the rate is always applied to what remains.\n' +
      '• You **can switch from declining balance to straight-line**, but **not the other way around**.\n\n' +
      '**Why it is preferred:** charging a higher expense in the early years **defers tax**. ' +
      'It is a cash-flow advantage — total expense does not change, only its timing does.\n\n' +
      '**In SAP:** the multiplier and cap are defined with {{AFAMD}}; ' +
      'switching to the straight-line method is modeled with the {{AFAMS}} multi-level method.',
  },

  { anahtar:'yil-sayilari-toplami',
    aciklama:'An accelerated method in which depreciation is calculated in proportion to the sum of the remaining years of useful life.',
    detay:
      '**Formula:** `Annual depreciation = Depreciable amount × (Remaining life ÷ Sum of the years\' digits)`\n\n' +
      'For a 5-year asset the denominator is: 5+4+3+2+1 = **15**.\n\n' +
      'For 600,000 TRY: 5/15 → **200,000** · 4/15 → **160,000** · 3/15 → **120,000** · ' +
      '2/15 → **80,000** · 1/15 → **40,000**. Total **600,000 TRY** ✓\n\n' +
      '**Difference from {{azalan-bakiyeler}}:** in the declining-balance method the base shrinks every ' +
      'year and the asset mathematically never reaches zero (a special rule is needed for the final year). ' +
      'Here the **base is fixed**, only the rate changes — the asset amortizes fully on its own.\n\n' +
      '**Turkish tax law does not recognize this method.** In Turkey it can only be used for IFRS ' +
      'reporting, in a separate {{amortisman-alani}} within a {{paralel-defter}} structure.',
  },

  { anahtar:'uretim-miktari-yontemi',
    aciklama:'A method where depreciation is calculated not on time but on the quantity the asset actually produces.',
    detay:
      '**Formula:** `Depreciation per unit = Depreciable amount ÷ Total estimated production`\n\n' +
      'Then each period: `Period depreciation = Depreciation per unit × that period\'s production`\n\n' +
      'A press worth 600,000 TRY expected to stamp 300,000 units over its life → depreciation ' +
      'per unit is **2 TRY/unit**. If 80,000 units were stamped in a year, that year\'s depreciation is **160,000 TRY**.\n\n' +
      '**Why it makes sense:** a die or a press does not wear while it is idle. ' +
      'Time-based methods do not reflect reality for these assets — ' +
      'charging depreciation in a month with no production is misleading.\n\n' +
      '**Its difficulty:** the actual production quantity must be entered into the system every period. ' +
      'In SAP the total estimated quantity is defined on the asset master record, ' +
      'and period quantities are recorded separately.\n\n' +
      '**Not recognized as a general method under Turkish tax law** (mining has a similar concept ' +
      'under art. 316). Accepted under IFRS; used for IFRS purposes in Turkey.',
  },

  { anahtar:'kalinti-deger',
    aciklama:'The expected disposal value of an asset at the end of its useful life. It is **deducted** from the depreciable amount.',
    detay:
      '**Formula:** `Depreciable amount = Acquisition value − Residual value`\n\n' +
      'A vehicle worth 600,000 TRY that can be sold for 100,000 TRY after 5 years: ' +
      'the depreciable amount is 500,000 TRY → **100,000 TRY** per year.\n\n' +
      'After 5 years the {{net-defter-degeri}} is not zero but **100,000 TRY**. ' +
      'The asset continues to stand at that value in the books.\n\n' +
      '**Critical distinction:**\n\n' +
      '**Turkish tax law:** there is **no** residual-value practice; the asset is **fully depreciated** ' +
      'and its net book value goes to zero.\n\n' +
      '**IFRS (IAS 16):** residual value **is** taken into account and is **reviewed every period**; ' +
      'if it changes, the adjustment is made prospectively.\n\n' +
      'This difference is one of the concrete reasons a {{paralel-defter}} is used in Turkey: ' +
      'the same asset reaches zero in the tax area while it stands at 100,000 TRY in the IFRS area.',
  },

  { anahtar:'donem-kontrolu',
    aciklama:'The set of rules that determines **when depreciation starts and ends**; part of the {{amortisman-anahtari}} ({{AFAMP}}).',
    detay:
      'A separate rule is defined for four events: **acquisition**, **subsequent addition**, ' +
      '**retirement** and **transfer**.\n\n' +
      'Common rules that ship as standard:\n\n' +
      '`01` pro rata from start of period · `02` pro rata to mid-period · ' +
      '`03` from mid-period · `06` **from start of year** (full year) · ' +
      '`07` from mid-year · `08` from start of next year · ' +
      '`11` **from the following month**.\n\n' +
      '**The critical distinction for Turkish practice:** general assets use the "from start of year" ' +
      'rule since Turkish tax law allows full-year depreciation, while passenger cars need a separate ' +
      'key carrying a **pro rata from month of acquisition** rule, because of {{kist-amortisman}}.',
  },

  { anahtar:'fevkalade-amortisman',
    aciklama:'Charging depreciation above the normal rate in cases of unusual loss of value. Turkish tax law art. 317.',
    detay:
      '**It applies in three cases:**\n\n' +
      '**1.** Partial or total loss of value due to **disasters** such as fire, earthquake or flood.\n' +
      '**2.** A drop in technical efficiency and value due to **new inventions** (technological obsolescence).\n' +
      '**3.** **Above-normal wear and tear** from being subjected to forced operation.\n\n' +
      '**Important:** the rate is not free to choose — it is set **case by case for each business** ' +
      'by the Ministry of Finance and **requires an application**. It cannot be applied on one\'s own.\n\n' +
      '**In SAP:** recorded as a **special depreciation** type separate from normal depreciation; ' +
      'entered manually with {{ABMA}} or managed through a separate {{amortisman-anahtari}}.',
  },

  { anahtar:'ozel-maliyet-bedeli',
    aciklama:'Improvement expenditure made on a rented property that **does not belong to the tenant**. Turkish tax law art. 327.',
    detay:
      'Spending such as decoration, a suspended ceiling or air-conditioning installed in a rented ' +
      'shop does not become the tenant\'s property but does provide benefit.\n\n' +
      '**Amortization rule:** amortized in **equal percentages over the lease term** — ' +
      'not over the asset\'s own useful life.\n\n' +
      '• If the lease term is 5 years → amortized over 5 years.\n' +
      '• **If the lease term is undetermined → 5 years** is assumed.\n' +
      '• If the premises are vacated before the lease ends, the **unamortized portion is expensed ' +
      'that year**.\n\n' +
      '**In SAP:** a separate {{varlik-sinifi}} is opened (264 Leasehold improvements) and given a ' +
      '{{faydali-omur}} equal to the lease term.',
  },

  { anahtar:'yenileme-fonu',
    aciklama:'Deferring the taxation of the gain from selling a fixed asset, for the purpose of **replacing it**. Turkish tax law art. 328–329.',
    detay:
      'When a machine is sold, the resulting gain is normally taxed that year. ' +
      'But if a replacement is going to be bought, the gain can be held in a **temporary liability ' +
      'account** (549 Special funds).\n\n' +
      '**Rules:**\n\n' +
      '• The replacement must be **mandatory**, or the business must have **decided on it and ' +
      'started the undertaking**.\n' +
      '• The fund can be held on the balance sheet for **up to three years**.\n' +
      '• Once the new asset is bought, the fund is **offset against its depreciation**.\n' +
      '• If not used within three years it is **added to the taxable income of the third year**.\n\n' +
      '**Effect:** it is a tax deferral, not a tax reduction. It provides a cash-flow advantage.\n\n' +
      '**In SAP:** this is **not** a standard AA function — after the retirement posting, it is ' +
      'manually posted to the fund with a G/L entry ({{FB50}}) and offset against the new asset\'s ' +
      'depreciation is tracked separately.',
  },

  { anahtar:'amortisman-alani',
    aciklama:'A **valuation view** of the same asset. Within a single asset record, a separate {{amortisman-anahtari}} and {{faydali-omur}} are kept for each view.',
    detay:
      '**Why it exists:** the same machine may need three different figures.\n\n' +
      'A weaving machine worth 2,400,000 TRY:\n' +
      '• Commercial books say 10 years → **240,000 TRY** a year\n' +
      '• Tax law says 8 years → **300,000 TRY** a year\n' +
      '• IFRS says component-based → engine 6 years, body 15 years\n\n' +
      'All three are correct. Opening three separate assets would corrupt the inventory.\n\n' +
      '**Solution:** one asset, three areas. `01` commercial · `15` tax · `32` IFRS. ' +
      'When {{AFAB}} runs it calculates **all three at once**.\n\n' +
      '**Difference from a {{defter}}:** an area lives only inside a fixed asset and answers ' +
      '*"how is this asset valued?"*. A ledger spans all of FI and answers ' +
      '*"which set of books does this posting go to?"*. Each area is **linked** to a ledger ({{OADB}}): ' +
      'area 01 → ledger 0L, area 32 → ledger 2L.\n\n' +
      '**The most common mistake:** reading a value in {{AW01N}} without checking which area you are in. ' +
      'Area 01 shows 240,000, area 15 shows 300,000 — both are correct.',
  },

  { anahtar:'varlik-sinifi',
    aciklama:'A classification that groups similar assets and drives account determination, the number range and default depreciation settings.',
    detay:'Defined with {{OAOA}}; account determination is linked with {{AO90}}.' },

  { anahtar:'yatirim-devam',
    aciklama:'A temporary asset whose cost accumulates in the **258 Assets under Construction** account because it is not yet ready for use and so is **not depreciated**. ' +
             'Once complete, it is settled to a real asset (252 Buildings, 253 Plant & Machinery) with {{AIAB}} + {{AIBU}}.',
    detay:
      '**Why is it needed?**\n\n' +
      'A factory building takes 18 months to complete and dozens of invoices arrive in that time: ' +
      'earthwork, concrete, steel, electrical installation, labor, engineering. This spending is ' +
      '**neither an expense nor a ready-to-use asset** — a third place is needed. AuC is that place.\n\n' +
      '**Three core benefits:**\n\n' +
      '**1. Correct timing.** If the spending were expensed, construction-year profit would look ' +
      'artificially low and the years of use artificially high. AuC holds the cost; depreciation ' +
      '**starts only once benefit begins to be derived**.\n\n' +
      '**2. Cost accumulation.** Costs from different sources (vendor invoice, goods issue, ' +
      'internal labor, {{ic-siparis}}) accumulate in a single object, and "how much have we spent ' +
      'on this investment in total?" can be answered at any time.\n\n' +
      '**3. Preventing depreciation from starting too early.** If the asset were opened directly ' +
      'in a normal class with {{AS01}}, {{AFAB}} would start charging depreciation on it — for a ' +
      'building not yet in use. The AuC asset class brings the depreciation key **0000** (no depreciation).\n\n' +
      '**Accounts involved:**\n\n' +
      '`258` Assets under construction (debit — costs accumulate) · ' +
      '`320` Vendors or `191` VAT (offsetting side) · ' +
      'on capitalization: `252/253` debit, `258` credit · ' +
      '`259` Down payments for investments, if an investment advance was made.\n\n' +
      '**There are two AuC types:** *summary settlement* (all cost goes to a single target) and ' +
      '*line-item settlement* (costs can be split across different assets). ' +
      'Details and a scenario are in the {{konu:asset-accounting}} topic.',
  },

  { anahtar:'aktiflestirme',
    aciklama:'Recording an expenditure as an asset instead of an expense. The capitalization date determines when depreciation begins.' },

  { anahtar:'hesap-belirleme',
    aciklama:'Determining, with a rule table, which G/L account a transaction coming from a module such as MM or SD is posted to.',
    detay:'{{OBYC}} on the MM side, {{VKOA}} on the SD side, {{OB40}} on the tax side. All of them write to table {{T030}}.' },

  { anahtar:'degerleme-sinifi',
    aciklama:'A key that groups a material for accounting purposes. The same movement posts to a different stock account depending on the valuation class.' },

  { anahtar:'gr-ir',
    aciklama:'A clearing account that carries the time gap between the goods receipt and the invoice receipt.',
    detay:'It shows a credit balance if the goods arrived but the invoice did not, and a debit balance if the invoice arrived but the goods did not. Analyzed at period-end with {{F.19}}.' },

  { anahtar:'uc-yonlu-eslestirme',
    aciklama:'Comparing the purchase order, the goods receipt and the vendor invoice by quantity and price.',
    detay:'If there is a mismatch, the invoice is blocked for payment (released with {{MRBR}}).' },

  { anahtar:'maliyet-yeri',
    aciklama:'A CO object showing which responsibility unit a cost arose in (sales, production, IT).',
    detay:'A CO object is required when posting to an expense account; if it is not entered, the {{OKB9}} default takes over.' },

  { anahtar:'kar-merkezi',
    aciklama:'A unit for which income and expense are tracked together, used for internal profitability measurement.',
    detay:'In New G/L, document splitting makes it possible to produce a balance sheet per profit center.' },

  { anahtar:'masraf-turu',
    aciklama:'CO\'s counterpart to an FI expense/revenue account. A primary cost element is tied one-to-one to an FI account.',
    detay:'It is not a separate master record in S/4HANA: opening a G/L account as "Primary Costs / Revenue" type in {{FS00}} makes it a cost element.' },

  { anahtar:'defter',
    aciklama:'The parallel set of values in which the same transaction is recorded according to different accounting standards.',
    detay:'The leading ledger (0L) is mandatory and integrated with CO; additional ledgers are opened for IFRS, tax or local statutory needs.' },

  { anahtar:'paralel-defter',
    aciklama:'Additional ledgers used to comply with several accounting standards at the same time.' },

  { anahtar:'belge-bolme',
    aciklama:'Automatically splitting shared lines in a document — such as vendor or tax — across profit center/segment based on how the expense lines are distributed.',
    detay:'The goal is to produce data that balances (and can produce a balance sheet) at profit center and segment level.' },

  { anahtar:'evrensel-kayit-defteri',
    aciklama:'The merging of FI, CO, AA and ML data into a single table ({{ACDOCA}}) in S/4HANA.',
    detay:'The separate totals tables that required reconciliation disappear; an FI–CO mismatch becomes structurally impossible.' },

  { anahtar:'uyumluluk-view',
    aciklama:'A read-only view, carrying the name of a table removed in S/4HANA, that generates its data from {{ACDOCA}}.',
    detay:'Old programs keep working, but these views cannot be written to with INSERT/UPDATE.' },

  { anahtar:'tahakkuk',
    aciklama:'Recording income or expense that has arisen but whose document has not arrived yet, in the correct period.',
    detay:'Electricity used in December but invoiced in January is accrued to December. ' +
          'Entered with {{FBS1}} and **automatically reversed** in the next period with {{F.81}} — so no double posting occurs once the real invoice arrives.' },

  { anahtar:'karsilik',
    aciklama:'An amount set aside for a probable expense or loss. Its amount or timing is not certain.',
    detay:'A {{supheli-alacak}} provision, a severance-pay provision, a warranty-expense provision. ' +
          'Its difference from an accrual: with an accrual the amount is known; with a provision it is estimated.' },

  { anahtar:'parasal-kalem',
    aciklama:'Items to be received or paid in a **fixed or determinable amount of money**. ' +
             '**Only these are subject to currency valuation.**',
    detay:
      '**Monetary items (valued):**\n\n' +
      '`102` foreign-currency bank · `320` vendors · `120` customers · `300/400` loans · ' +
      '`121/321` promissory notes\n\n' +
      'Common trait: a **specific amount of money** is to be received or paid in exchange. ' +
      'When the exchange rate changes, the local-currency equivalent changes → an exchange difference arises.\n\n' +
      '**Non-monetary items (not valued):**\n\n' +
      '`153` inventory · `253` fixed assets · `159` down payments made · `340` down payments received\n\n' +
      'Common trait: **goods or services** will be received/given in exchange, not money. ' +
      'These are recorded at the rate on the transaction date and stay at that value.\n\n' +
      '**Down payments are the most frequent mistake.** When a 50,000 EUR advance is paid to a ' +
      'vendor, **goods** will be received in exchange, not money — so it is not monetary and ' +
      'is **not valued** at period end. If it were valued, it would create an exchange difference ' +
      'that does not actually exist.\n\n' +
      'In SAP this distinction is managed at the account level: the accounts subject to valuation ' +
      'are set in the {{F.05}} selection screen and the {{OBA1}} configuration. ' +
      'Down-payment accounts must **not be included** in that list.',
  },

  { anahtar:'kur-farki-faturasi',
    aciklama:'On sales denominated in or indexed to a foreign currency, an invoice issued — with **VAT calculated** — for the **exchange gain that arises at the time of payment**. ' +
             'A requirement specific to Turkey.',
    detay:
      '**The logic:** the VAT base is the transaction\'s true consideration. On a foreign-currency ' +
      'sale, if the exchange rate has risen by the collection date, the seller has collected ' +
      '**more local currency**. That extra amount is also part of the consideration and is ' +
      '**subject to VAT**.\n\n' +
      '**Who issues it:** the party in whose favor the exchange difference arose.\n\n' +
      '• Rate **rose** → in the seller\'s favor → **the seller** issues the FX difference invoice\n' +
      '• Rate **fell** → in the buyer\'s favor → **the buyer** issues it\n\n' +
      '**VAT rate:** the same rate applied to the original transaction.\n\n' +
      '**Difference from the accounting entry — a critical distinction:**\n\n' +
      'In the books the exchange difference is already posted to account `646`/`656`. ' +
      'The FX difference invoice is an **additional documentary obligation on top of that**, and ' +
      'its main purpose is **to calculate VAT correctly**.\n\n' +
      'SAP posts the exchange difference automatically but does **not produce the FX difference ' +
      'invoice** — this is a process that has to be tracked separately. ' +
      'It is frequently missed and becomes a finding in VAT audits.\n\n' +
      '*Note: the exact rules are set by the VAT General Application Communiqué; ' +
      'the current regulation should be confirmed with a tax advisor.*',
  },

  { anahtar:'kur-tipi',
    aciklama:'A key that determines which exchange rate is used: **M** average (standard), **B** buying, **G** selling.',
    detay:'Held in table {{TCURR}} by the triple of rate type + currency pair + date. ' +
          'The valuation method ({{OB59}}) states which rate type is used.' },

  { anahtar:'paralel-para-birimi',
    aciklama:'A document being stored in several currencies at the same time: company code currency, group currency, hard currency.',
    detay:'Held in {{BSEG}} in fields `DMBTR` (local), `DMBE2`, `DMBE3`. ' +
          'S/4HANA\'s {{ACDOCA}} supports **up to 10** parallel currencies (ECC supported 3).' },

  { anahtar:'fiyat-kontrolu',
    aciklama:'Determines the price at which a material is valued in stock: **S** standard price (fixed), **V** moving average (variable).',
    detay:'If the invoice price differs from the purchase order price: with **S** the difference goes to {{OBYC}} → the PRD price-difference account; ' +
          'with **V** the difference is added to the stock value and the average price is updated. ' +
          'This is one of the most important distinctions in MM–FI integration.' },

  { anahtar:'malzeme-hareket-turu',
    aciklama:'A three-digit code stating what a goods movement is; it determines which accounts are triggered.',
    detay:'Best known: **101** goods receipt against a PO, **102** reversal of a goods receipt, **201** consumption to a cost center, ' +
          '**261** consumption to a production order, **301** transfer between storage locations, **601** delivery for a sale (goods issue). ' +
          '{{OBYC}} account determination looks at the movement type\'s transaction key (BSX, WRX, GBB).' },

  { anahtar:'donem-sonu',
    aciklama:'The full set of adjustment, valuation and reconciliation activities performed before the period\'s financial statements are produced.' },

  { anahtar:'bakiye-devri',
    aciklama:'At year-end, carrying balance-sheet account balances forward into the new year, and transferring the result of income/expense accounts into the equity account.',
    detay:'Done with {{FAGLGVTR}}; it can be run again.' },

  { anahtar:'kur-farki',
    aciklama:'The difference between the exchange rate at which a foreign-currency item was posted and the rate used for valuation/payment. ' +
             'Tracked in account **646 Foreign exchange gains** or **656 Foreign exchange losses** on the income statement.',
    detay:
      '**There are two types of exchange difference, and their accounting outcomes differ:**\n\n' +
      '**Unrealized (valuation difference)** — the item has not been cleared yet; it has only been ' +
      're-measured at the period-end rate. Produced by {{F.05}} and **reversed the next day**. ' +
      'Reason: the real difference will arise at the rate on the payment date; the valuation is only ' +
      'a temporary snapshot of the position at the balance-sheet date.\n\n' +
      '**Realized** — payment/collection has occurred, the difference is **final**. It is a ' +
      'permanent posting and is not reversed.\n\n' +
      '**Accounts involved (Turkish COA):**\n\n' +
      '`646` Foreign exchange gains — when the rate moves in your favor\n' +
      '`656` Foreign exchange losses — when the rate moves against you\n' +
      '`102/320/120` — the foreign-currency amount **never changes**, only its local-currency ' +
      'equivalent does\n\n' +
      'Most implementations track realized and unrealized differences in **separate sub-accounts** ' +
      '(e.g. 646.01 / 646.02) — because the unrealized difference enters the tax base differently.\n\n' +
      '**Which items are valued?** Only {{parasal-kalem}}s. ' +
      'Non-monetary items such as down payments made, inventory and fixed assets ' +
      'stay at the rate of the day they were recorded — they are not valued.\n\n' +
      '**Specific to Turkey:** an {{kur-farki-faturasi}} is issued and **VAT is calculated** for the ' +
      'gain that arises in your favor at the time of payment. ' +
      'This is an obligation separate from the accounting entry and is frequently missed.\n\n' +
      'On the SAP side, accounts are linked via {{OBA1}} to the **exchange rate difference for open ' +
      'items** and **balance valuation** keys.',
  },

  { anahtar:'degerleme',
    aciklama:'Re-measuring balances and open items at the period-end rate/value.' },

  { anahtar:'mali-tablo-yapisi',
    aciklama:'A hierarchy that determines which line of the balance sheet/income statement an account is reported on.',
    detay:'Defined with {{OB58}}; {{F.01}} uses this structure.' },

  { anahtar:'vergi-kodu',
    aciklama:'A two-character code that determines the tax rate on a transaction and which tax account it posts to.',
    detay:'Defined with {{FTXP}}; the calculated tax is written to table {{BSET}}.' },

  { anahtar:'matrah',
    aciklama:'The amount on which the tax is calculated.' },

  { anahtar:'is-alani',
    aciklama:'A reporting unit based on activity/division, **independent** of company code.',
    detay:
      'A business area can span **several company codes**: a "Textiles" business area can be used ' +
      'in both a Turkish and a German company code. This gives activity-based reporting that ' +
      'crosses company-code boundaries.\n\n' +
      '**Its weak point:** producing a **balanced balance sheet** at business area level is hard — ' +
      'vendor and bank items do not carry a business area. ' +
      '{{belge-bolme}} solves this problem, but it was not designed for business area — ' +
      'it was designed for {{kar-merkezi}} and segment.\n\n' +
      '**Its status in S/4HANA:** not removed, but **largely superseded by profit center and segment**. ' +
      'New implementations prefer profit center over business area; ' +
      'it keeps running in older implementations for compatibility.',
  },

  { anahtar:'kredi-kontrol-alani',
    aciklama:'The organizational unit in which a customer\'s {{kredi-limiti}} check is performed.',
    detay:
      'Several company codes can be linked to a single credit control area. ' +
      'The practical implication matters: group companies can **share a common limit**.\n\n' +
      '*Example:* if the same customer buys from both company A and company B, ' +
      'setting up a single credit control area tracks their total risk together. ' +
      'If separate areas are set up, each company manages its own limit independently and ' +
      'the customer\'s **total risk becomes invisible**.\n\n' +
      'Limit and used-up risk are held in table {{KNKK}} by credit control area. ' +
      'Defined with {{OB45}}, stored in table {{T014}}.\n\n' +
      'Works together with SAP Credit Management in S/4HANA.',
  },

  { anahtar:'alv-duzeni',
    aciklama:'A saved view that stores which columns appear in a report, in what order, and with which totals.',
    detay:
      'Most SAP reports use **ALV** (ABAP List Viewer). ' +
      'Columns can be added or removed, sorted, filtered, subtotaled and grouped — ' +
      'and these settings are **saved as a layout**.\n\n' +
      '**There are two types of layout:**\n\n' +
      '**User-specific** — visible only to the person who saved it.\n' +
      '**General** (starts with `/`) — visible to all users; ' +
      'standard reporting layouts are shared this way.\n\n' +
      '**Why it matters:** columns needed in reports like {{FBL3N}} ' +
      '(dunning level, profit center, tax code) **are not in the default layout**. ' +
      'Once added and saved, a monthly recurring analysis ' +
      'takes seconds.\n\n' +
      'Combined with a **selection-screen variant** ' +
      '(what data + how it should look), a report reduces to a single click.',
  },

  { anahtar:'dokum',
    aciklama:'A report type that lists the **individual items** of an account/business partner; ' +
             'the opposite of a balance report.',
    detay:
      'FI reporting splits into two basic types:\n\n' +
      '**Balance report** — *"what is this account\'s balance?"* ({{FS10N}}, {{FAGLB03}}). ' +
      'Gives period totals, and is fast.\n\n' +
      '**Line item report** — *"which documents make up this balance?"* ' +
      '({{FBL3N}}, {{FBL1N}}, {{FBL5N}}, {{FAGLL03}}). ' +
      'Gives individual lines, and you can drill into the document.\n\n' +
      '**Critical prerequisite:** open item management must be active on the G/L account ' +
      '({{SKB1}}). If it is off, {{FBL3N}} returns **empty** for that account — ' +
      'there is a balance but no items can be shown.\n\n' +
      'If this setting is turned on later, **past items still won\'t show** — ' +
      'only postings made after it was turned on are listed.',
  },

  { anahtar:'cds-view',
    aciklama:'A virtual data model in S/4HANA that models data **in the database layer** and feeds reporting.',
    detay:
      '**Why it came about:** in classic ABAP reports, data used to be pulled to the application ' +
      'server and processed there. With CDS the calculation happens **inside HANA** and only the ' +
      'result is transferred.\n\n' +
      '**What it means for FI:** Fiori reports, analytical apps and Embedded Analytics are all ' +
      'built on CDS views. Dozens of standard CDS views are defined on top of {{ACDOCA}}.\n\n' +
      '**Relation to {{uyumluluk-view}}:** both are views but they serve different purposes. ' +
      'A compatibility view **mimics an old table** (so old programs still run); ' +
      'a CDS view is **designed for new reporting**.\n\n' +
      'Practical takeaway for a consultant: when a new report is needed, check whether a **suitable ' +
      'standard CDS view already exists** before writing an ABAP program.',
  },

  { anahtar:'degisiklik-belgesi',
    aciklama:'An audit trail that keeps **who changed what and when** on a master record or document.',
    detay:
      'Header held in table {{CDHDR}}, lines in table {{CDPOS}}.\n\n' +
      '**What is recorded:** the old value, the new value, the user who made the change, date and time.\n\n' +
      '**What is not recorded:** not every field — only fields **flagged for change tracking**. ' +
      'This flag is defined at the data-element level.\n\n' +
      '**Typical use:** *"when did the vendor\'s bank account change?"* is the first question in a ' +
      'fraud investigation, and this is where the answer lies. ' +
      'Changes to payment terms, reconciliation account and credit limit are tracked the same way.\n\n' +
      'Access from a document: {{FB03}} → *Environment → Changes*. ' +
      'Via master data: {{FK04}} (vendor), {{FD04}} (customer).',
  },

  { anahtar:'toplu-giris',
    aciklama:'A classic method for mass-loading data by **simulating** the keystrokes a user would type into the screens.',
    detay:
      '**How it works:** for every line to be loaded, the system **opens that transaction\'s screens ' +
      'in the background** and fills in the fields — as if a user were typing.\n\n' +
      'The result is a **session** and it is run with {{SM35}}.\n\n' +
      '**Its strength:** every screen control still runs. Required fields, authorizations, ' +
      'account determination, period control — all of them are active exactly as in a normal ' +
      'posting. That is why **bad data cannot enter the system**.\n\n' +
      '**Its weakness:** it is slow and **tied to the screen layout**. ' +
      'If the SAP version changes and a new field is added to the screen, or the field order ' +
      'changes, the load **breaks**.\n\n' +
      '**Error handling:** failed lines stay in the session, can be corrected and ' +
      '**re-run**. This is batch input\'s most valuable feature — ' +
      'if 40 of 1,000 lines fail, only those 40 are retried.\n\n' +
      'Its alternatives are {{bapi}} (faster, screen-independent) and {{idoc}}.',
  },

  { anahtar:'kayit-recording',
    aciklama:'Recording a transaction\'s screen flow **step by step**; ' +
             'produces the skeleton of a {{toplu-giris}} program.',
    detay:
      'Done with {{SHDB}}: the transaction is started, the user enters one example record, ' +
      'and the system records **which screen, which field, what value**.\n\n' +
      'The output is a screen-flow list along with field names. ' +
      'This list is then matched against a data file, ' +
      'and the flow is repeated for every line.\n\n' +
      '**Critical rule:** while recording, **every field must be filled in** — ' +
      'a field left blank does not enter the recording and cannot be matched later.\n\n' +
      'Likewise **conditional screens** need care: some fields only appear ' +
      'at certain values. If the sample recording did not go down that path, ' +
      'that screen never enters the recording, and the load **gets stuck** on those lines.\n\n' +
      '**That is why the sample recording should be made with the most complex line in the ' +
      'data set** — not the simplest.',
  },

  { anahtar:'alan-esleme',
    aciklama:'Defining which SAP field a column in the source file corresponds to.',
    detay:
      'This is the **real work** of data migration; tool choice is secondary.\n\n' +
      'There are three kinds of field and they behave differently:\n\n' +
      '**Directly mapped** — present in the source, present in SAP, needs no conversion.\n' +
      '**Needs a {{donusum-kurali}}** — the source format does not match the SAP format ' +
      '(date, decimal separator, unit, country code).\n' +
      '**Fixed/assigned** — not present in the source, required in SAP; given a constant value.\n\n' +
      '**The most common mistake is in the third kind:** a required field missing from the source ' +
      'that goes unnoticed makes the load **stop on the very first line**. ' +
      'That is why mapping should start from **SAP\'s list of required fields**, not from the ' +
      'source file.',
  },

  { anahtar:'donusum-kurali',
    aciklama:'The rule that **converts** a source value into the format SAP expects.',
    detay:
      'The most frequently needed conversions:\n\n' +
      '**Date** — `31.12.2027` → `20271231`\n' +
      '**Decimal separator** — `1.234,56` → `1234.56`\n' +
      '**Fixed length** — an account number must be **zero-padded on the left**: ' +
      '`320100` → `0000320100`\n' +
      '**Code translation** — table-based translations such as `TR` in the old system → `TR` in SAP, but ' +
      'old `TUR` → `TR`\n\n' +
      '**Zero-padding is the rule that trips people up the most.** ' +
      'Excel **drops** the leading zeros of an account number it reads as a number. ' +
      'The file looks correct, and the load says *"account not found."*\n\n' +
      '**Prevention:** keep source columns as **text** in Excel, ' +
      'or generate the CSV directly.',
  },

  { anahtar:'sayi-mutabakati',
    aciklama:'The check that the number of records loaded **equals the number of documents created**.',
    detay:
      'This is the **indispensable final step** of a mass load, and the most frequently skipped one.\n\n' +
      '**Why it\'s needed:** a {{guncelleme-hatasi}} is silent. ' +
      '500 records are sent, 486 are created, 14 are lost — ' +
      'and no screen says so.\n\n' +
      '**It is done at two levels:**\n\n' +
      '**Count** — lines sent = documents created ({{BKPF}})\n' +
      '**Amount** — the debit/credit total in the source file = the total in the system\n\n' +
      'The second is stronger: if the count matches but the **amount doesn\'t**, ' +
      'there is a {{donusum-kurali}} error (decimal separator, unit, currency rate).\n\n' +
      'This check is the **shared mandatory step** across ' +
      '{{konu:error-handling}}, {{konu:data-upload}} and {{konu:migration}}.',
  },

  { anahtar:'bapi',
    aciklama:'SAP\'s standard function interface that gives **screen-independent** access to business objects.',
    detay:
      '**Difference from {{toplu-giris}}:** it does not simulate screens — it calls the business logic **directly**.\n\n' +
      '**Advantages:**\n\n' +
      '• **Fast** — no screen-processing overhead\n' +
      '• **Version-independent** — the interface stays stable even if the screen changes\n' +
      '• Returns error messages in **structured** form\n\n' +
      '**Point to watch:** a BAPI call does **not commit by itself**. ' +
      'A `BAPI_TRANSACTION_COMMIT` must be called afterward for the change to become permanent. ' +
      'If it is forgotten, the data looks as if it was written but **never becomes permanent** — ' +
      'a classic mistake in load programs.\n\n' +
      'The most used ones on the FI side: G/L document posting, vendor/customer master data, ' +
      'fixed asset creation.',
  },

  { anahtar:'idoc',
    aciklama:'A **structured message** format used for data exchange between systems.',
    detay:
      'Think of it like an envelope: a **control record** (from whom, to whom, which message type), ' +
      '**data records** (the actual content) and **status records** (processing history).\n\n' +
      '**Its distinguishing trait: asynchronous and traceable.** ' +
      'A message is sent, the receiving system processes it, the outcome is written to a status ' +
      'record. A failed IDoc **stays in the system**, can be corrected and reprocessed with {{BD87}}.\n\n' +
      '**Difference from {{bapi}}:** a BAPI is synchronous (call, wait for the response); ' +
      'an IDoc is asynchronous (send, then check later). ' +
      'IDoc is preferred for external system integrations, BAPI for internal loads.\n\n' +
      'Monitored with {{WE02}}; status codes (53 success, 51 error) ' +
      'show where the problem is.',
  },

  { anahtar:'kilitleme',
    aciklama:'The mechanism that prevents two users from changing the **same record at the same time**.',
    detay:
      'When a user opens a vendor with {{XK02}}, the system places a **lock** on that record. ' +
      'If a second user tries to open the same vendor, they get the message ' +
      '*"Vendor ... is locked by user XYZ."*\n\n' +
      '**This is normal behavior** — it protects data integrity.\n\n' +
      '**When it becomes a problem:** if a user exits without closing the transaction properly ' +
      '(session crashed, computer shut down), the lock **stays stuck**. ' +
      'Nobody can access that record.\n\n' +
      '{{SM12}} shows stuck locks and lets them be **removed**. ' +
      'Before removing a lock it must be confirmed that **the user is really not working**; ' +
      'otherwise two people change the same record and one overwrites the other\'s change.\n\n' +
      '**Frequently seen in mass jobs:** while {{F110}} is running, trying to post manually to the ' +
      'same vendor causes a lock conflict.',
  },

  { anahtar:'guncelleme-hatasi',
    aciklama:'The asynchronous update failing **after** a document number has already been assigned. ' +
             'Result: the number exists but **no record does**.',
    detay:
      'A posting in SAP has two stages: the user says "save," the system **assigns a number** and ' +
      'releases the screen; the actual database write happens **in the background**.\n\n' +
      'This is so the user isn\'t kept waiting. But if the background write fails ' +
      '(memory, lock, data error), the **update terminates**.\n\n' +
      '**Symptom:** the user has seen the document number, but the document **cannot be found** ' +
      'with {{FB03}}. A **gap** remains in the number range.\n\n' +
      'Failed updates are shown with {{SM13}}; the error cause and the related {{ST22}} dump ' +
      'are examined.\n\n' +
      '**Critical point:** in some cases the update **can be re-run**; ' +
      'in others the record must be re-entered. The decision depends on the error detail in ' +
      '{{SM13}}.\n\n' +
      'It is the sneakiest error class in mass loads: a program reports "1,000 records successful" ' +
      'while 40 of them are actually stuck in the update.',
  },

  { anahtar:'yetki-nesnesi',
    aciklama:'An authorization unit that defines, field by field, **what a user is allowed to do**.',
    detay:
      'Most used in FI:\n\n' +
      '`F_BKPF_BUK` — document authorization by **company code**\n' +
      '`F_BKPF_KOA` — by **account type** (vendor / customer / G/L / fixed asset)\n' +
      '`F_BKPF_BLA` — by **document type**\n' +
      '`F_SKA1_BUK` — G/L account master data\n\n' +
      'Every object has an **activity** field: 01 create · 02 change · ' +
      '03 display.\n\n' +
      '**Diagnosis:** when an authorization error is received, run {{SU53}} — ' +
      'it shows the **last failed check**: which object, which field, which value is missing.\n\n' +
      '**A sneaky situation:** some reports do not raise an error on missing authorization — ' +
      'they just return an **empty list**. The user assumes "there\'s no data." ' +
      'If a report comes back empty, an {{SU53}} check should be part of the diagnosis list.',
  },

  { anahtar:'tampon',
    aciklama:'Keeping frequently read configuration tables **in memory** on the application server.',
    detay:
      'Tables like {{T001}}, {{T004}}, {{T030}} are read on every posting. ' +
      'Going to the database every time would be slow, which is why they are **buffered**.\n\n' +
      '**Practical consequence:** a configuration change sometimes **does not take effect immediately** — ' +
      'the old value keeps being read until the buffer is refreshed.\n\n' +
      'A classic scenario: a consultant opens a period in {{OB52}}, and the user still gets a ' +
      '*"period closed"* error. The cause is buffer delay; ' +
      'having the user log out and back in usually fixes it.\n\n' +
      '**Transaction tables are not buffered** ({{BKPF}}, {{BSEG}}, {{ACDOCA}}) — ' +
      'because they change constantly and reading stale data there is unacceptable.',
  },

  { anahtar:'arayuz-tablosu',
    aciklama:'A staging table where data coming from an external system is held **before** it is written to the real tables.',
    detay:
      '**Why it\'s needed:** external data cannot be written directly to {{BKPF}}/{{BSEG}} — ' +
      'it must first be validated, matched and have bad rows filtered out.\n\n' +
      'A staging table provides this intermediate layer:\n\n' +
      '**1.** Data is loaded into the staging table *(no accounting impact yet)*\n' +
      '**2.** Validation runs; bad rows are flagged\n' +
      '**3.** Good rows are moved on to the real process ({{bapi}} or {{toplu-giris}})\n' +
      '**4.** Bad rows are corrected and **retried**\n\n' +
      '**Its distinguishing benefit: re-runnability.** ' +
      'If 40 of 1,000 rows fail, only those 40 are retried — ' +
      'there is no need to start over.\n\n' +
      'Electronic bank statement processing ({{FF_5}}) and {{LSMW}} work on this same logic. ' +
      'The same approach also appears in {{konu:document-parking}}: ' +
      'data enters the system but **does not affect the balance**.',
  },

  { anahtar:'tablo-anahtari',
    aciklama:'The set of fields that makes a row in a table **unique**; it determines how the table is read.',
    detay:
      '**Why it matters:** a query on the key fields is fast; ' +
      'a query on a non-key field **scans the whole table**.\n\n' +
      'FI\'s classic example: the key of {{BSEG}} is ' +
      '`BUKRS + BELNR + GJAHR + BUZEI`. ' +
      'Searching by document number is fast — but **searching by vendor number is slow**, ' +
      'because `LIFNR` is not part of the key.\n\n' +
      '**Index tables exist for exactly this reason:** {{BSIK}} ' +
      '(vendor open items) has a key starting with `LIFNR`, ' +
      'so a "this vendor\'s open items" query is fast.\n\n' +
      '**This changed in S/4HANA:** HANA\'s column-store architecture and in-memory processing ' +
      'removed the need for index tables — ' +
      'tables like {{BSIK}}, {{BSAK}}, {{BSID}} turned into {{uyumluluk-view}}s, and ' +
      '{{ACDOCA}} is queried directly instead.',
  },

  { anahtar:'kontrol-alani',
    aciklama:'CO\'s top-level organizational unit; the framework in which cost accounting is performed.',
    detay:'Several company codes can be linked to a single controlling area — this makes cross-company ' +
          'cost distribution possible. Requirement: the linked company codes must use the **same chart ' +
          'of accounts** and the same fiscal year variant. Defined with {{OKKP}}, held in table {{TKA01}}.' },

  { anahtar:'ic-siparis',
    aciklama:'A CO object opened to collect temporary or project-based costs.',
    detay:'Its difference from a cost center is that it is **temporary**: a trade fair, a campaign, a maintenance job. ' +
          'The accumulated cost is **settled** to a target with {{KO88}} (a cost center, a fixed asset or a ' +
          'G/L account). If it is not settled, the cost stays parked on the order and never reaches either ' +
          'an expense or an asset.' },

  { anahtar:'istatistiksel-kalem',
    aciklama:'A one-sided posting that does not affect the balance sheet, used purely for tracking.',
    detay:'It produces no offsetting entry and does not appear in the trial balance. A down-payment request ({{F-47}}) and guarantees work this way. ' +
          'Even so, {{F110}} **sees the statistical item and includes it in the payment proposal** — ' +
          'a design that separates process tracking from balance-sheet impact.' },

  { anahtar:'dort-goz',
    aciklama:'The rule that the person entering a transaction must be **different** from the person approving it.',
    detay:'Implemented in SAP with {{park-etme}}: a user parks the document ({{FV60}}), ' +
          'and an authorized person reviews and posts it ({{FBV0}}). While parked, the document ' +
          'has no impact on the trial balance. Authorizations must be set up so that the user who ' +
          'parked the document cannot post their own document — ' +
          'otherwise the mechanism just becomes a delay.' },

  { anahtar:'teminat',
    aciklama:'An amount given or received to guarantee that a contract will be fulfilled.',
    detay:'Tracked in SAP with a {{ozel-ana-muhasebe-gostergesi}}: a guarantee given is posted to account **126**, one received to account **326**. ' +
          'Its difference from a down payment is that it is not consideration for goods/services and is ' +
          '**refunded** when the contract ends. Because it stays open for a long time it is easily forgotten at ' +
          'period-end; an annual review is needed.' },

  { anahtar:'gib',
    aciklama:'The institution that is the **regulator and ultimate recipient** of e-transformation in Turkey.',
    detay:'GİB sets e-document formats, mandatory-use thresholds and submission rules. ' +
          '**Thresholds and dates change by communiqué** — this is why they are ' +
          '**never hard-coded** and are instead managed dynamically via the {{mukellef-sorgulama}} list.' },

  { anahtar:'e-fatura',
    aciklama:'An electronic invoice issued **between registered users**, with no paper counterpart.',
    detay:'If the recipient is also registered in the e-Invoice system, the invoice **must** be an e-Invoice; ' +
          'if not, an {{e-arsiv}} is issued instead. This choice is not the user\'s preference — it follows ' +
          'from **the recipient\'s registration status** — ' +
          'which is why the {{mukellef-sorgulama}} list must be kept current.\n\n' +
          'There are two scenarios: {{temel-fatura}} and {{ticari-fatura}}.' },

  { anahtar:'e-arsiv',
    aciklama:'An electronic invoice issued to recipients **not registered** in the e-Invoice system.',
    detay:'Used for end consumers and unregistered taxpayers. ' +
          'It is **reported** to GİB (rather than delivered to the recipient through the system, as with an e-Invoice); ' +
          'it reaches the recipient by e-mail or a printed copy.\n\n' +
          '**The most important difference from an e-Invoice:** an e-Archive invoice can be ' +
          '**cancelled within a certain period**; an e-Invoice cannot be cancelled — ' +
          'in a {{ticari-fatura}} scenario it can be rejected, or otherwise corrected with a credit note.' },

  { anahtar:'e-irsaliye',
    aciklama:'The electronic form of the delivery note — issued together with **the goods movement**.',
    detay:'It is a document **independent** of the invoice, with different timing: ' +
          'the delivery note is issued **when the goods ship**, the invoice can follow later.\n\n' +
          'On the SAP side the trigger is not FI but the **SD delivery** or an MM goods movement — ' +
          'which is why e-Delivery Note issues are usually resolved on the **logistics** side.' },

  { anahtar:'e-defter',
    aciklama:'Keeping the Journal and General Ledger (Kebir) electronically and having them approved by GİB via a {{berat}}.',
    detay:'An **XML** is produced monthly (or quarterly), signed, and ' +
          'the {{berat}} file is uploaded to GİB.\n\n' +
          '**Critical consequence:** a period whose certificate has been obtained is **finalized**. ' +
          'Posting to that period afterward is not just an {{OB52}} issue — ' +
          'it is a **legal one** — which is the Turkey-specific reason period discipline matters ' +
          'as much as it does.' },

  { anahtar:'berat',
    aciklama:'The approval file uploaded to GİB that carries the summary and signature information of the {{e-defter}} files.',
    detay:'The ledger itself is not sent to GİB — **its certificate** is. ' +
          'Once GİB approves the certificate, the period is considered **sealed**.\n\n' +
          'Once the certificate has been obtained, the ledger for that period cannot be changed — ' +
          'a correction is posted to the **following period**.' },

  { anahtar:'ozel-entegrator',
    aciklama:'An intermediary licensed by GİB that provides e-document submission/receipt services.',
    detay:'There are three submission methods:\n\n' +
          '**Direct integration** — the company connects its own system to GİB directly. ' +
          'For high volume; the technical load sits with the company.\n' +
          '**Private integrator** — **the most common**. The intermediary handles the interface and storage.\n' +
          '**GİB portal** — for low volume; no SAP integration, manual entry.\n\n' +
          '**Why it matters for a consultant:** the SAP standard **produces** the e-document, ' +
          'while submission in most implementations is handled by the **integrator\'s add-on**. ' +
          'That is why *"is the problem in SAP, or in the integrator?"* ' +
          'is the first question to ask when troubleshooting.' },

  { anahtar:'ubl-tr',
    aciklama:'The mandatory **XML** format for e-Invoices and e-Archive invoices in Turkey (a local adaptation based on UBL 2.1).',
    detay:'The legally valid form of an invoice is the **XML** — not the on-screen view or a PDF.\n\n' +
          '**The practical consequence is significant:** in a dispute, "this is what we see on screen" ' +
          'does not hold. The **XML actually submitted**, in `EDOCUMENTFILE`, is what counts. ' +
          'Diagnosis reads the file, not the screen.' },

  { anahtar:'mali-muhur',
    aciklama:'An electronic certificate produced by TÜBİTAK that legal entities use to sign e-documents.',
    detay:'Natural persons use an **e-signature** instead. Without the seal, an e-document is **not valid**.\n\n' +
          '**The certificate has an expiry date**, and if it is not renewed, ' +
          'e-Invoice submission stops overnight. This is a classic cause of an outage ' +
          'when its expiry isn\'t tied to a calendar reminder.' },

  { anahtar:'mukellef-sorgulama',
    aciklama:'Checking against the GİB list whether the recipient is **registered** in the e-Invoice system.',
    detay:'This check determines whether the invoice will be an {{e-fatura}} or an {{e-arsiv}}.\n\n' +
          '**The list changes continuously** — new taxpayers are added. ' +
          'If the system\'s local copy is not kept up to date, an e-Archive invoice gets issued to a ' +
          'customer who has since become an e-Invoice taxpayer, and **GİB rejects it**.\n\n' +
          'The rejection is **silent**: the accounting document is posted, a receivable appears in the ' +
          'customer account, but the other party never actually received the invoice.' },

  { anahtar:'temel-fatura',
    aciklama:'An e-Invoice scenario in which the recipient has **no right of rejection** through the system.',
    detay:'The invoice is delivered and the process ends there. If the recipient wants to object, ' +
          'they do so **through outside channels** (a credit note, an outside dispute).\n\n' +
          'Its counterpart is {{ticari-fatura}}. The choice is made based on the ' +
          'commercial relationship between the parties and how the recipient is defined in the system.' },

  { anahtar:'ticari-fatura',
    aciklama:'An e-Invoice scenario in which the recipient can respond with **acceptance or rejection** within a set period.',
    detay:'**The critical point for a consultant:** in this scenario, the invoice being ' +
          '**posted in accounting is not enough** — the recipient can still reject it.\n\n' +
          'That means an FI document can exist and a receivable can be sitting in the customer account, ' +
          'and yet the e-Invoice may have been **rejected**. ' +
          'This is the core idea of the {{konu:e-donusum}} topic: ' +
          '**the accounting document and the e-document are two separate life cycles.**\n\n' +
          'If a rejection comes in, the correction is made **with a credit note**; the e-Invoice itself cannot be deleted.' },

  { anahtar:'tevkifat',
    aciklama:'The payer withholding tax from the amount to be paid and remitting it directly to the tax office.',
    detay:'SAP has two types: **classic** (only on payment) and **extended** (on invoice or payment). ' +
          'Turkish implementations use extended withholding. Without a withholding type/code on the vendor ' +
          'master record, no withholding is taken — a commonly seen gap.' },

  { anahtar:'lider-defter',
    aciklama:'The single ledger in the system that carries the company\'s primary accounting standard (standard code **0L**).',
    detay:'It is valid for every company code, uses the company code\'s fiscal year variant, and is the ' +
          'ledger integrated with CO. Every posting made without specifying a ledger goes to **all** ledgers.' },

  { anahtar:'defter-grubu',
    aciklama:'A named set of ledgers that determines which ledger(s) a posting goes to.',
    detay:'If left blank on the entry screen, the posting goes to **all** ledgers. To post to a single ledger, ' +
          '{{FB01L}} / {{FB50L}} is used. Every ledger automatically gets its own group of the same name.' },

  { anahtar:'ifrs',
    aciklama:'International Financial Reporting Standards; brings valuation rules that differ from local tax law.',
    detay:'Typical differences: depreciation period and method, leases (IFRS 16), provisioning criteria, ' +
          'revenue recognition timing. In SAP these differences are resolved with **parallel ledgers**: ' +
          'the same transaction is posted with a different amount in each ledger.' },

  { anahtar:'yerel-para-birimi',
    aciklama:'The currency in which a company code keeps its books; defined in the `WAERS` field of table {{T001}}.',
    detay:'Every FI item is stored in both the transaction currency and the local currency. ' +
          'A group currency and a hard currency can be defined in addition; in S/4HANA ' +
          '{{ACDOCA}} carries up to eight currencies.' },

  { anahtar:'greenfield',
    aciklama:'A migration approach in which S/4HANA is set up **from scratch** and processes are redesigned; only master data, opening balances and open items are carried over from the old system.',
    detay:'Advantage: the old system\'s accumulated errors, unused {{z-gelistirme}}s and corrupted data are **not carried over**; processes can be built close to standard ({{standarda-yakin}}).\n\n' +
          'Cost: **history is not carried over.** Because income-statement accounts have no opening balance, the prior year\'s income statement **never exists** in the new system — if comparative financial statements are needed, either the movements must also be migrated or the old system must remain accessible. This decision must be made **before** the migration.' },

  { anahtar:'brownfield',
    aciklama:'Converting an existing ECC system to S/4HANA **in place**; history, customizing and developments all come along with the system.',
    detay:'There are three mandatory preparation steps in a fixed order: **①** converting vendors/customers to a {{is-ortagi}} via {{cvi}} · **②** chart-of-accounts preparation (primary cost elements become G/L accounts) · **③** the financial data conversion ({{BSEG}}, `FAGLFLEXA`, `COEP` → {{ACDOCA}}).\n\n' +
          'Beforehand the {{basitlestirme-listesi}} is run; modifications are adapted with {{SPDD}} and {{SPAU}}.\n\n' +
          '**The old system\'s problems come along too.** A badly set up chart of accounts, dead {{z-gelistirme}} and corrupted master data are still there after the conversion.' },

  { anahtar:'secici-gecis',
    aciklama:'The third path between {{greenfield}} and {{brownfield}}: a new system is set up but a **selected slice of history** (e.g. the last three years, specific company codes) is carried over.',
    detay:'It requires a third-party tool and specialized expertise, making it the **most expensive** option. The usual reason to choose it: the company wants to renew its processes ({{greenfield}}) but cannot give up comparative reporting ({{brownfield}}).\n\n' +
          'A hybrid approach is common in multi-entity groups: some company codes are converted, others are set up from scratch.' },

  { anahtar:'cvi',
    aciklama:'The conversion mechanism that maps legacy {{LFA1}} (vendor) and {{KNA1}} (customer) records to the {{is-ortagi}} object ({{BUT000}}).',
    detay:'Business Partner is **mandatory** in S/4HANA, so CVI conversion is a prerequisite for a brownfield migration.\n\n' +
          '**It is done BEFORE the technical conversion, while still on ECC** — this is the step projects most often fall behind on. The reason is not technical but **data quality**: duplicate records, missing tax numbers and inconsistent address data stop the conversion and have to be cleaned up one by one.\n\n' +
          'If the same real-world party is both a vendor and a customer, they must be merged into a **single** business partner; that merge decision belongs to the business, not the consultant.' },

  { anahtar:'is-ortagi',
    aciklama:'Consolidating parties such as vendors, customers, employees and banks into a **single** master-data object; the party\'s type is now a **role**.',
    detay:'In ECC, if the same company was both a vendor and a customer, **two separate records** were opened, and address data was kept in two places that would drift apart over time. {{is-ortagi}} removes this: one identity ({{BUT000}}), many roles.\n\n' +
          'Company-code-level data has **not disappeared** — it still lives in {{LFB1}} / {{KNB1}}, and the `AKONT` {{mutabakat-hesabi}} is there. What changed is the identity layer.\n\n' +
          'In S/4HANA, Business Partner ({{BP}}) is the **only entry path**; even though {{XK01}} and {{XD01}} still work, they write into this layer through {{cvi}} behind the scenes.' },

  { anahtar:'basitlestirme-listesi',
    aciklama:'A checklist SAP publishes that itemizes **which function changed or was removed** in the move to S/4HANA.',
    detay:'It is **run against** the system before migration, and each item comes back with one of three answers: not affected · affected, preparation needed · affected, blocking.\n\n' +
          'A project plan cannot be made without this output: without knowing which item is holding you back, a duration estimate is just a guess.\n\n' +
          'Typical blockers: {{cvi}} conversion not done, credit management still in the old component, a Turkey-specific add-on with no compatible version.' },

  { anahtar:'acilis-bakiyesi',
    aciklama:'The balances at the moment accounting begins in the new system; usually posted against a **migration account**, dated to the day **before** the migration year (Dec 31).',
    detay:'Three rules:\n\n' +
          '**①** Accounts under open item management (vendor, customer, GR/IR) are migrated **one item at a time** — with due date and payment terms; if migrated in bulk, {{F110}} and {{F-53}} will not work.\n' +
          '**②** For normal G/L accounts, the **balance** is enough.\n' +
          '**③** **Income-statement accounts have no opening balance** — because they reset to zero at year-end, there is no balance to carry over. This is why a comparative income statement does not simply appear on its own.\n\n' +
          'Check: after all opening postings, the migration account\'s balance **must be zero**.' },

  { anahtar:'kesme-plani',
    aciklama:'A **minute-by-minute** plan for the time from shutting down the old system to opening the new one.',
    detay:'Its contents: freezing the old system · final backup · data extraction · load · reconciliation · sign-off · go-live. The **owner, duration and rollback point** of every step is written down.\n\n' +
          'Durations are not estimated — they are **measured** during {{deneme-gecisi}}.\n\n' +
          'During the cutover window, every transaction made in the old system (an urgent payment, an incoming invoice) is **manually** carried over to the new system; that is why who is authorized to do what in that window is written down beforehand.\n\n' +
          'The plan\'s most important line is at the very end: **at what time, and by whom, is the go/no-go decision made?**' },

  { anahtar:'deneme-gecisi',
    aciklama:'A full end-to-end **rehearsal** of the real migration, with real data and the real {{kesme-plani}}.',
    detay:'At least three rounds are run: **①** a technical dry run (does it work?) · **②** a business dry run (is the data correct?) · **③** a full dry run (does the timing hold?).\n\n' +
          '**A rehearsal is a test of the PLAN, not of the data.** Data accuracy is measured by reconciliation; a rehearsal\'s real output is **how many minutes each step took** — the cutover window can only be planned with that measurement.\n\n' +
          'The final rehearsal is run on hardware as close to production as possible; a duration measured on a slow test server is misleading for the live cutover.' },

  { anahtar:'tek-yonlu-kapi',
    aciklama:'A configuration decision that **cannot be reversed** once data has been posted against it; if it turns out wrong, the fix isn\'t adjusting the setting — it\'s rebuilding the data.',
    detay:'The main one-way doors in FI: {{hesap-plani}} · a company code\'s {{yerel-para-birimi}} · {{mali-yil-varyanti}} · whether {{belge-bolme}} is on or off · the ledger structure ({{paralel-defter}}) · {{mutabakat-hesabi}} assignment · the rate on a {{vergi-kodu}} that has already been used · the structure of the {{degerleme-plani}} and {{amortisman-alani}}.\n\n' +
          'For these decisions the right question isn\'t *"do we want this today?"* but **"is there a real chance we\'ll want it within three years?"**\n\n' +
          'The opposite is a **two-way door**: {{odeme-kosulu}}, dunning procedure, tolerance group, field status — these can always be changed, and debating them at length is wasted time.' },

  { anahtar:'standarda-yakin',
    aciklama:'The approach of fitting the process to the system: if SAP\'s ready-made solution is acceptable, the process is adapted to it — not the system to the process.',
    detay:'The criterion isn\'t emotional, it\'s commercial: **does this difference give us a competitive edge, or is it just habit?** Differences required by law are not up for debate to begin with.\n\n' +
          'Deviating from standard isn\'t a one-time cost: it has to be revisited with {{SPAU}} at every support pack and upgrade. That is why {{z-gelistirme}} is not a cost but a **debt** — its interest is paid over years.' },

  { anahtar:'z-gelistirme',
    aciklama:'A program, report, field or exit written specifically for a customer (namespace `Z*` / `Y*`).',
    detay:'It has three tiers, with very different costs: **①** a custom **report** — low risk, doesn\'t change standard behavior · **②** a {{badi}} / extension point — hooks in through a point SAP itself opened, and usually survives an upgrade · **③** a **modification** — changing standard code itself; has to be manually reapplied with {{SPAU}} at every upgrade.\n\n' +
          'The real problem isn\'t writing it — it\'s **losing track of the inventory**: five years later nobody knows which development is still used, and all of it gets carried into the upgrade. That\'s why a usage analysis is done before migration.' },

  { anahtar:'badi',
    aciklama:'An extension point SAP **predefines** within its standard flow; customer code hooks into it without changing the standard.',
    detay:'Order of preference: standard setting → a {{badi}} or extension → modification as a **last resort**. Upgrade cost rises the further down that list you go.\n\n' +
          'A BAdI isn\'t free either: because it runs at posting time, a faulty implementation **stops the posting**, and the error message often doesn\'t point at the BAdI. That\'s why an active BAdI inventory needs the same discipline as the active-substitution inventory in the {{konu:dogrulama-ikame}} topic.' },

  { anahtar:'akim-verisi',
    aciklama:'A configuration table that does not travel with a transport request, and is instead changed **directly in production**.',
    detay:'Classic examples: {{OB52}} opening/closing periods · {{TCURR}} exchange rates · dunning dates.\n\n' +
          '**This is the most common cause of "it worked in test but not in production" cases.** Because the setting doesn\'t travel, the two systems don\'t have to match — and usually don\'t.\n\n' +
          'The consequence is an authorization question: in production, customizing is locked down, but write access to current-setting tables **has to stay open** to someone — who gets to write there must be a deliberate choice.' },

  { anahtar:'tasima-sirasi',
    aciklama:'The rule that transport requests are applied in the **order they were released** to production.',
    detay:'If two requests touching the same object are transported in the wrong order, **the older state overwrites the newer one** — and no error message appears. The result: a setting that worked in test doesn\'t work in production.\n\n' +
          'Diagnosis: does {{E071}} show a shared object between the two requests? The queue order can be seen in {{STMS}}.\n\n' +
          'The prevention is in the design: requests are kept **small and single-purpose**. One giant request with everything thrown into it can\'t be recovered once its order gets scrambled.' },

  { anahtar:'regresyon-testi',
    aciklama:'A test that confirms a new change hasn\'t broken functionality that **used to work**.',
    detay:'It is critical in FI because configuration is **shared**: when a tax code\'s account determination changes, every process tied to it is affected.\n\n' +
          'The scope isn\'t guessed, it\'s driven by **dependency**: which processes read the table that changed? {{E071}} says which object changed; the rest follows from where that object is used.\n\n' +
          'A fixed core set is kept on hand: a vendor invoice, a payment run, a customer collection, a depreciation run and a closing — these are run after every transport.' },

  { anahtar:'negatif-test',
    aciklama:'A test that confirms the system **blocks what it\'s not supposed to allow**; it doesn\'t ask "does correct data give the right result?" but "is bad data stopped?"',
    detay:'This is where test scenarios have their real value. Everyone tests the happy path; controls, on the other hand, are only visible **when they\'re violated**.\n\n' +
          'Examples: trying to post to a closed period · leaving a required {{kar-merkezi}} blank · exceeding budget · testing the four-eyes rule with a single user · trying to post an unbalanced document.\n\n' +
          'A negative test is **mandatory** for every {{konu:dogrulama-ikame}} rule that gets set up — because a rule that was never activated silently does nothing, and a positive test will never reveal that.' },

  { anahtar:'bellek-ici',
    aciklama:'A database architecture in which data is read from **memory** rather than disk, and in **columnar** rather than row order.',
    detay:'Its importance is architectural, not technical: a lot of the old SAP design existed to work around the constraint "reading from disk is expensive" — {{toplam-tablosu}}, index tables, overnight batch jobs.\n\n' +
          '**Once the constraint disappeared, the workaround became unnecessary.** Most S/4HANA simplifications aren\'t new features — they\'re the **removal of a solution that\'s no longer needed**.\n\n' +
          'Speed doesn\'t come for free: {{z-gelistirme}} that reads the old tables runs through a {{uyumluluk-view}} and **can end up slower**.' },

  { anahtar:'toplam-tablosu',
    aciklama:'A balance table ({{GLT0}}, {{FAGLFLEXT}}, {{KNC1}}, {{LFC1}}) that is **precomputed and stored** to speed up queries, or an item table ({{BSIK}}, {{BSID}}, {{BSIS}}) copied under a different key.',
    detay:'It had two downsides: it took up **space** and it **could drift out of sync** — if an update failed halfway, the totals and the items diverged, which is exactly why reconciliation programs existed.\n\n' +
          'In an in-memory database ({{bellek-ici}}), computing the total **on the fly** every time is fast enough, so these tables were removed and replaced with a {{uyumluluk-view}}.\n\n' +
          'The gain isn\'t just space — it\'s **consistency**: a computed total can never drift apart from its items.' },

  { anahtar:'gomulu-analitik',
    aciklama:'Reporting running **directly on top of transactional data**, live, without needing to be extracted to a separate data warehouse.',
    detay:'Its technical foundation is {{cds-view}}s: data isn\'t copied, it\'s read through defined views.\n\n' +
          'The practical result is **latency disappears**: the classic setup extracts overnight and the report is correct as of the day before; with embedded analytics the report shows **right-now** data.\n\n' +
          'It doesn\'t fully replace a warehouse: consolidating multiple source systems and keeping long history are still a separate solution.' },

  { anahtar:'fiori',
    aciklama:'SAP\'s role-based, task-oriented web interface; the user layer that replaces classic SAP GUI screens.',
    detay:'Fiori isn\'t *"the same GUI with a new look"*: the classic screen was **transaction**-centric (many tasks on one screen), Fiori is **task**-centric (one app, one job).\n\n' +
          'For a consultant this has two consequences: role design is now also **interface design** (a user only sees the apps in their role); and since many Fiori apps call the **same** transaction code under the hood, existing configuration knowledge still applies as-is.\n\n' +
          'Classic transactions weren\'t removed — they can be launched from the Fiori launchpad.' },

  { anahtar:'merkezi-finans',
    aciklama:'An approach where existing ERP systems keep running as they are, while **copies** of their documents are streamed into a central S/4HANA system.',
    detay:'The source systems (SAP or non-SAP) keep operating; the central system is fed purely for **reporting and consolidation**.\n\n' +
          'In multi-entity groups it is a way to **split the migration into pieces**: group reporting moves to S/4HANA without shutting down any single company code, and the conversion itself is deferred.\n\n' +
          'It isn\'t a migration on its own — it\'s a **bridge**: it doesn\'t work without mapping being set up (chart of accounts, company code, cost object) and that mapping needs continuous maintenance.' },

]);
