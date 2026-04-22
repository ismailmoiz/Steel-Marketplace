# SteelXchange — Full Project Document
### Steel Bar Marketplace · From Idea to Global Platform

**Document version:** 1.0  
**Created:** April 13, 2026  
**Author:** Raza Mirza — Mirza Steel Trading LLC, Dubai, UAE  
**Status:** Pre-build · MVP planning phase

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [The Problem We Are Solving](#2-the-problem-we-are-solving)
3. [The Vision](#3-the-vision)
4. [Target Users](#4-target-users)
5. [Full Feature Set — All Screens Designed](#5-full-feature-set--all-screens-designed)
6. [Database Schema](#6-database-schema)
7. [Business Model Options](#7-business-model-options)
8. [Roadmap — MVP to Global Platform](#8-roadmap--mvp-to-global-platform)
9. [Tech Stack Suggestions](#9-tech-stack-suggestions)
10. [Validation Strategy](#10-validation-strategy)
11. [Outreach Templates](#11-outreach-templates)
12. [Competitive Landscape](#12-competitive-landscape)
13. [Open Questions & Decisions Pending](#13-open-questions--decisions-pending)
14. [Design System Reference](#14-design-system-reference)
15. [File Inventory](#15-file-inventory)

---

## 1. Project Overview

**SteelXchange** is a B2B marketplace specifically built for steel bar trading — functioning as the meeting point between buyers and sellers of steel products. Think of it as an Amazon for steel bars, but purpose-built for the commercial dynamics of the industry: RFQs, mill certificates, letters of credit, metric tonne pricing, and verified traders.

The platform is designed around the Gulf + South Asia trading corridor (UAE, Saudi Arabia, India, Pakistan) as the initial market, with the architecture to scale globally.

The founder is based in Dubai with direct knowledge of the steel trading industry and an existing network of buyers and sellers — this is the core unfair advantage.

---

## 2. The Problem We Are Solving

Steel trading today happens primarily over:

- **WhatsApp groups** — unstructured, no verification, hard to track quotes
- **Phone calls and email** — slow, no audit trail, documents scattered
- **Trade shows** (The Big 5, Metal Middle East) — relationships built offline, no digital follow-up infrastructure
- **Generic B2B directories** (Alibaba, IndiaMART) — not built for steel-specific workflows like RFQs, mill certificates, or LC payment terms

The result:
- Buyers struggle to find verified sellers with real stock
- Sellers cannot broadcast listings to a qualified buyer pool
- Document management (mill certs, BL, LC, invoices) is chaotic
- Pricing benchmarks are opaque and hard to track
- Deal tracking relies on personal spreadsheets and WhatsApp chats

**SteelXchange solves this by being the single platform where listings, RFQs, quotes, messages, documents, and price data all live together.**

---

## 3. The Vision

**Short term (Year 1):** The most trusted place to buy and sell steel bars in the UAE and Gulf corridor.

**Medium term (Year 2–3):** The dominant steel marketplace for the Middle East + South Asia region, covering all major steel products — rebar, structural steel, coils, angles, flat bars.

**Long term (Year 5+):** A global steel trading platform with real-time price indices, financing integration, logistics coordination, and AI-powered matching between buyers and sellers.

---

## 4. Target Users

### Primary Users (Launch Market)

| User Type | Description | Geography |
|---|---|---|
| Steel importers / traders | Companies buying from mills to resell | UAE, Saudi Arabia, Qatar, Kuwait |
| Construction procurement managers | Buying steel for active projects | UAE, Saudi Arabia, GCC |
| Indian mill exporters | TMT, rebar, structural — selling to Gulf | Mumbai, Pune, Kolkata |
| Pakistani mill exporters | MS bars, flat bars | Karachi |
| Chinese exporters | HRB400, HRC | Shanghai, Tianjin |

### Secondary Users (Phase 2+)

- Shipping and freight agents
- Trade finance providers (LC issuance, export financing)
- Quality inspection companies (SGS, BV, Intertek)
- Steel service centers

---

## 5. Full Feature Set — All Screens Designed

All seven screens below have been fully designed as working interactive prototypes. A desktop web app (single HTML file) has also been built and is available as `steelxchange.html`.

---

### 5.1 Marketplace (Listings Feed)

The homepage of the platform. Shows all active buy and sell listings.

**Features:**
- Grid layout of listing cards — each showing grade, quantity, price per MT, delivery terms, location, and seller name
- Filter by: All / Sellers / Buyers / Urgent
- Full-text search across grade, location, and supplier name
- Summary stats bar: Active Listings, Verified Traders, Avg Price/MT, Tonnes Available
- Post a Listing modal form (accessible from anywhere)
- Listing cards show: type badge (Selling / Buying / Urgent), grade, MT quantity, delivery terms, location pin, price per MT, seller name
- Contact Seller / Contact Buyer button on each card

**Post a Listing Form Fields:**
- Listing type: Selling / Buying toggle
- Steel Grade / Product (free text)
- Quantity in MT
- Price per MT in USD
- Location / Port
- Delivery Terms (Ex-Works, FOB, CIF, DAP)
- Contact Name
- Mark as Urgent (Yes/No)
- Additional Notes (mill certs, specs, payment terms)

---

### 5.2 User Profiles

Each registered trader has a profile visible to other traders on the platform.

**Profile Sections:**

**Identity block:**
- Full name, company name, location
- Verified Trader badge (manual verification by admin)
- Member since date, role (Buyer / Seller / Both)
- Preferred delivery terms and payment methods

**Trade Statistics:**
- Deals closed
- Total listings posted
- Total MT traded
- Response rate percentage

**Seller Rating:**
- Star rating out of 5 (aggregated from reviews)
- Total number of reviews
- Rating distribution bar chart (5★ through 1★)

**Profile Tabs:**
- My Listings — all active, pending, and closed listings with type, price, status
- Trade History — completed deals with counterparty, MT volume, total value, date
- Reviews — star ratings and written reviews from trading partners
- Documents — verified certificates visible to other traders (Trade License, BIS cert, ISO cert)

---

### 5.3 Messaging System

In-app chat between buyers and sellers, triggered after a listing connection is made.

**Features:**
- Inbox list (left sidebar) with thread preview, last message time, unread indicator
- Each thread pinned to a specific listing — grade, quantity, price, delivery visible at top of chat
- Verified badge + response time + star rating displayed in chat header
- Message bubbles (sender/receiver style)
- Inline RFQ/Quote card that appears as a structured object in the chat — shows product, qty, price, payment, validity — with Accept Quote and Counter Offer action buttons
- Quick reply chips: "Mill certificate?", "Hold stock?", "Ready to issue L/C", "Request proforma", "Loading date?"
- Header action buttons: Counter Offer, Proforma Invoice, Close Deal
- Thread search

**Listing banner pinned to top of every chat** — ensures both parties always know which product they are negotiating.

---

### 5.4 RFQ Flow (Request for Quote)

Structured workflow allowing buyers to broadcast a formal requirement to multiple verified sellers and compare returned quotes side by side.

**5-Step Pipeline:**
1. Draft RFQ
2. Send to Sellers
3. Quotes In
4. Negotiate
5. Accept & Generate PO

**RFQ Form Fields:**
- Product / Grade
- Quantity (MT)
- Delivery Terms
- Target Price per MT
- Payment Terms
- Port / Delivery Location
- Specifications and notes
- Send to: All verified sellers / Saved suppliers / Manual selection

**Quote Cards (returned by sellers):**
- Supplier name, avatar, verified badge, star rating, deal count
- Badges: Best Price / Fastest / Top Rated / New Supplier
- Price per MT (large, prominent)
- Total order value (price × qty)
- Quantity, Delivery, Lead Time, Payment, Quote Validity
- Supplier notes
- Actions: Accept Quote / Counter Offer / Message

**RFQ Summary Sidebar:**
- RFQ number, product, quantity, delivery, target price, deadline
- Sent to X sellers, X responses received

**Quote Status Timeline:**
- Each seller shown with response status (Quoted at $X / Awaiting response)

**Accepted Quote State:**
- Card updates to show accepted badge
- Action changes to "Generate PO"

---

### 5.5 Price Tracker

Live steel price index reference for the platform's active commodities.

**Ticker Strip (top of page):**
- Rebar Fe500D (CIF Dubai)
- Hot Rolled Coil (FOB Rotterdam)
- HRB400 Rebar (FOB Shanghai)
- Structural Angles (DAP Dubai)
- TMT Fe550 (DAP Riyadh)
- MS Flat Bars (FOB Karachi)
- Each ticker shows: current price, $ change, % change, direction arrow

**Chart:**
- Time range selector: 1W / 1M / 3M / 6M / 1Y
- Interactive hover tooltip: exact price and date
- Fills area under line with directional color (orange = rising, red = falling)
- Current price dot at end of line

**Price Alert System:**
- Set alert: "Notify when price drops below $X" or "rises above $X"
- Alerts displayed as removable tags below the form

**Market Stats Sidebar:**
- 52-week high, 52-week low, 30-day average, YTD change

**Regional Prices:**
- Mumbai FOB, Dubai CIF, Riyadh DAP, Shanghai FOB, Rotterdam CIF
- Each with current price, percentage change, direction

**Market Intelligence Feed:**
- News headlines with Bullish / Bearish / Neutral sentiment tags
- Sourced from: Reuters, MEED, Platts, Business Standard

---

### 5.6 Document Vault

Centralized repository for all trade-related documents attached to a user's account, deals, and listings.

**Document Categories:**
1. Company & Compliance Certificates
   - Trade License
   - BIS Certification (for Indian grades)
   - ISO 9001:2015 Quality Management
   - DUNS Verified Business Certificate

2. Trade Documents (per deal)
   - Bill of Lading
   - Letter of Credit
   - Commercial Invoice
   - Packing List
   - Certificate of Origin
   - Marine Insurance

3. Mill Test Reports (per shipment batch)
   - Mill Test Certificate (MTC)
   - Third Party Inspection Reports (SGS, BV, Intertek)

**Document Row Fields:**
- PDF icon with file type
- Document name
- File size
- Issuing authority
- Expiry date (where applicable)
- Verification status badge: Verified / Pending / Expiring / Draft
- Quick actions: View / Share

**Document Preview Panel (right sidebar):**
- Full metadata table (document number, issuing authority, scope, dates, key values)
- Actions: Analyse with AI / Share Document / Check Compliance

**Expiry Watch Widget:**
- Lists documents by days to expiry
- Color-coded: Red (< 30 days), Amber (30–90 days), Green (> 90 days)

**Shared With Panel:**
- Toggle per counterparty — controls which documents are visible to specific trading partners

**Summary Stats:**
- Total documents, Verified count, Pending count, Expiring soon

---

### 5.7 Notifications

Alert center for all platform activity relevant to the logged-in user.

**Notification Types:**
- Price alerts (when a user-set threshold is crossed)
- RFQ responses (new quote received)
- New messages (in-app chat)
- New matching listings (a grade matching a buy request is listed)
- Deal milestones (BL issued, LC accepted, shipment confirmed)
- Document expiry warnings
- Market news digest (optional, daily)

**Notification Card Fields:**
- Type badge (Price / RFQ / Message / Document / Deal)
- Title and body text
- Timestamp
- 2–3 contextual action buttons (e.g. View RFQ, Accept Quote, Generate Proforma)
- Unread state: orange left border + highlighted background

**Filters:** All / Unread / Price / RFQ / Deals / Documents

**Alert Preferences:**
- Toggle per notification type
- Delivery channels: Push, Email, WhatsApp, Telegram (each toggleable)

**Summary Widget:**
- Count by type (unread, price alerts, RFQ responses, messages, deals, expiry warnings)

---

## 6. Database Schema

This is the core data model for the platform. All field names are suggestions — adjust based on chosen database technology.

---

### 6.1 Users

```
Table: users
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
full_name             VARCHAR(120)    NOT NULL
company_name          VARCHAR(200)    NOT NULL
email                 VARCHAR(200)    UNIQUE NOT NULL
phone                 VARCHAR(30)
password_hash         VARCHAR(255)    (or handled by auth provider)
role                  ENUM            [buyer, seller, both]
location_city         VARCHAR(100)
location_country      VARCHAR(100)
port_preference       VARCHAR(100)    (e.g. Jebel Ali, Mumbai)
delivery_preference   VARCHAR(100)    (e.g. CIF, FOB, DAP)
payment_terms         VARCHAR(100)    (e.g. L/C at sight, TT 30)
is_verified           BOOLEAN         DEFAULT false
verification_date     TIMESTAMP
verified_by           UUID            FK → users (admin)
profile_photo_url     VARCHAR(500)
bio                   TEXT
response_rate         DECIMAL(5,2)    (calculated field)
total_deals           INTEGER         DEFAULT 0
total_mt_traded       DECIMAL(12,2)   DEFAULT 0
average_rating        DECIMAL(3,2)    DEFAULT 0
subscription_tier     ENUM            [free, verified_trader, premium_supplier]
subscription_expires  TIMESTAMP
created_at            TIMESTAMP       DEFAULT now()
updated_at            TIMESTAMP
last_active_at        TIMESTAMP
```

---

### 6.2 Listings

```
Table: listings
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
user_id               UUID            FK → users
type                  ENUM            [sell, buy]
grade                 VARCHAR(200)    NOT NULL  (e.g. TMT Fe500D, HRB400)
product_category      ENUM            [rebar, structural, coil, flat_bar, angle, other]
quantity_mt           DECIMAL(10,2)   NOT NULL
price_per_mt_usd      DECIMAL(10,2)
price_negotiable      BOOLEAN         DEFAULT true
delivery_terms        ENUM            [ex_works, fob, cif, dap, cpt]
location_city         VARCHAR(100)
location_country      VARCHAR(100)
port                  VARCHAR(100)
specifications        TEXT            (grade details, dimensions, standards)
mill_cert_available   BOOLEAN         DEFAULT false
payment_terms         VARCHAR(100)
is_urgent             BOOLEAN         DEFAULT false
status                ENUM            [active, pending, closed, expired]
views_count           INTEGER         DEFAULT 0
expires_at            TIMESTAMP
created_at            TIMESTAMP       DEFAULT now()
updated_at            TIMESTAMP
```

---

### 6.3 RFQs (Request for Quote)

```
Table: rfqs
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
rfq_number            VARCHAR(20)     UNIQUE  (e.g. RFQ-2024-041)
buyer_id              UUID            FK → users
grade                 VARCHAR(200)    NOT NULL
product_category      ENUM            (same as listings)
quantity_mt           DECIMAL(10,2)   NOT NULL
delivery_terms        ENUM
delivery_port         VARCHAR(100)
target_price_usd      DECIMAL(10,2)
payment_terms         VARCHAR(100)
specifications        TEXT
deadline              TIMESTAMP
status                ENUM            [draft, sent, quotes_received, negotiating, accepted, cancelled]
broadcast_type        ENUM            [all_verified, saved_suppliers, manual]
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

```
Table: rfq_recipients
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
rfq_id                UUID            FK → rfqs
seller_id             UUID            FK → users
sent_at               TIMESTAMP
viewed_at             TIMESTAMP
responded_at          TIMESTAMP
status                ENUM            [sent, viewed, responded, declined]
```

---

### 6.4 Quotes (RFQ Responses)

```
Table: quotes
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
rfq_id                UUID            FK → rfqs
seller_id             UUID            FK → users
price_per_mt_usd      DECIMAL(10,2)   NOT NULL
quantity_mt           DECIMAL(10,2)
delivery_terms        ENUM
lead_time_days        INTEGER
payment_terms         VARCHAR(100)
validity_days         INTEGER
notes                 TEXT
status                ENUM            [submitted, accepted, countered, rejected, expired]
is_accepted           BOOLEAN         DEFAULT false
accepted_at           TIMESTAMP
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

---

### 6.5 Messages & Threads

```
Table: message_threads
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
participant_a         UUID            FK → users
participant_b         UUID            FK → users
listing_id            UUID            FK → listings (nullable)
rfq_id                UUID            FK → rfqs (nullable)
quote_id              UUID            FK → quotes (nullable)
last_message_at       TIMESTAMP
last_message_preview  VARCHAR(200)
unread_count_a        INTEGER         DEFAULT 0
unread_count_b        INTEGER         DEFAULT 0
created_at            TIMESTAMP
```

```
Table: messages
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
thread_id             UUID            FK → message_threads
sender_id             UUID            FK → users
message_type          ENUM            [text, quote_card, document_share, system]
body                  TEXT
quote_id              UUID            FK → quotes (nullable, for quote_card type)
document_id           UUID            FK → documents (nullable)
is_read               BOOLEAN         DEFAULT false
read_at               TIMESTAMP
created_at            TIMESTAMP
```

---

### 6.6 Documents

```
Table: documents
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
user_id               UUID            FK → users
deal_id               UUID            FK → deals (nullable)
listing_id            UUID            FK → listings (nullable)
name                  VARCHAR(300)    NOT NULL
category              ENUM            [trade_license, bis_cert, iso_cert, duns,
                                       bill_of_lading, letter_of_credit, 
                                       commercial_invoice, packing_list,
                                       certificate_of_origin, insurance,
                                       mill_test_cert, inspection_report, other]
file_url              VARCHAR(500)    NOT NULL  (cloud storage URL)
file_size_bytes       INTEGER
issuing_authority     VARCHAR(200)
document_number       VARCHAR(100)
issue_date            DATE
expiry_date           DATE
verification_status   ENUM            [pending, verified, expiring, expired, rejected]
verified_by           UUID            FK → users (admin)
verified_at           TIMESTAMP
is_public             BOOLEAN         DEFAULT false  (visible on profile)
metadata              JSONB           (flexible key-value for document-specific fields)
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

```
Table: document_shares
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
document_id           UUID            FK → documents
shared_with_user_id   UUID            FK → users
shared_by_user_id     UUID            FK → users
is_active             BOOLEAN         DEFAULT true
created_at            TIMESTAMP
```

---

### 6.7 Deals (Closed Transactions)

```
Table: deals
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
deal_number           VARCHAR(20)     UNIQUE
buyer_id              UUID            FK → users
seller_id             UUID            FK → users
listing_id            UUID            FK → listings (nullable)
rfq_id                UUID            FK → rfqs (nullable)
quote_id              UUID            FK → quotes (nullable)
grade                 VARCHAR(200)
quantity_mt           DECIMAL(10,2)
price_per_mt_usd      DECIMAL(10,2)
total_value_usd       DECIMAL(14,2)
delivery_terms        ENUM
payment_terms         VARCHAR(100)
port_of_loading       VARCHAR(100)
port_of_discharge     VARCHAR(100)
status                ENUM            [agreed, lc_pending, lc_issued, loading,
                                       shipped, arrived, completed, disputed]
loading_date          DATE
eta_date              DATE
completed_at          TIMESTAMP
notes                 TEXT
created_at            TIMESTAMP
updated_at            TIMESTAMP
```

---

### 6.8 Reviews & Ratings

```
Table: reviews
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
deal_id               UUID            FK → deals
reviewer_id           UUID            FK → users
reviewee_id           UUID            FK → users
rating                INTEGER         CHECK (rating BETWEEN 1 AND 5)
review_text           TEXT
reviewer_role         ENUM            [buyer, seller]  (role in this deal)
is_public             BOOLEAN         DEFAULT true
created_at            TIMESTAMP
```

---

### 6.9 Price Data

```
Table: price_indices
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
product_id            VARCHAR(50)     (e.g. rebar_cif_dubai, hrc_fob_rotterdam)
product_name          VARCHAR(100)
price_usd             DECIMAL(10,2)
price_date            DATE
source                VARCHAR(100)    (e.g. Platts, SteelHome, manual)
region                VARCHAR(100)
delivery_basis        ENUM            [fob, cif, dap, ex_works]
created_at            TIMESTAMP
```

```
Table: price_alerts
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
user_id               UUID            FK → users
product_id            VARCHAR(50)
alert_type            ENUM            [below, above]
threshold_usd         DECIMAL(10,2)
is_active             BOOLEAN         DEFAULT true
triggered_at          TIMESTAMP
created_at            TIMESTAMP
```

---

### 6.10 Notifications

```
Table: notifications
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
user_id               UUID            FK → users
type                  ENUM            [price_alert, rfq_response, new_message,
                                       matching_listing, deal_milestone,
                                       doc_expiry, market_news]
title                 VARCHAR(300)    NOT NULL
body                  TEXT
related_entity_type   VARCHAR(50)     (e.g. rfq, deal, listing, document)
related_entity_id     UUID
is_read               BOOLEAN         DEFAULT false
read_at               TIMESTAMP
created_at            TIMESTAMP
```

---

### 6.11 Subscriptions

```
Table: subscriptions
─────────────────────────────────────────────────────
id                    UUID            PRIMARY KEY
user_id               UUID            FK → users
tier                  ENUM            [free, verified_trader, premium_supplier]
price_usd_monthly     DECIMAL(8,2)
starts_at             TIMESTAMP
expires_at            TIMESTAMP
payment_method        VARCHAR(50)
payment_reference     VARCHAR(100)
is_active             BOOLEAN         DEFAULT true
created_at            TIMESTAMP
```

---

## 7. Business Model Options

> **Note:** These are options. The final pricing and monetisation structure will be decided separately. All figures below are suggestions based on industry benchmarks.

---

### Option A — Subscription Tiers (Recommended for Year 1)

Target sellers primarily. Buyers are always free to maximise demand-side liquidity.

| Tier | Price | Who It's For | What They Get |
|---|---|---|---|
| Free | $0/month | Anyone testing the platform | 2 listings/month, basic profile, view marketplace |
| Verified Trader | $49/month | Active traders (< $1M/month) | Unlimited listings, Verified badge, full RFQ access, messaging, price tracker |
| Premium Supplier | $149/month | Larger traders / exporters | Everything + Featured placement in search, advanced analytics, priority support, API access |

**Revenue projection at scale:**
- 100 Verified Traders × $49 = $4,900/month
- 30 Premium Suppliers × $149 = $4,470/month
- Total at 130 paying users = ~$9,370/month (~$112K/year)

---

### Option B — Transaction Commission

Take 0.3–0.8% of each completed deal value that flows through the platform.

- Pros: Revenue scales directly with deal volume, aligns incentives
- Cons: Requires payment to flow through platform (escrow, compliance, legal)
- Recommendation: Explore in Year 2 once trust and deal volume are established

---

### Option C — Lead Generation / Pay-per-RFQ

Charge sellers per qualified RFQ they receive, not a flat subscription.

- Suggested price: $5–15 per RFQ connection
- Pros: Lower barrier to entry, easy to sell to skeptical traders
- Cons: Revenue is unpredictable, power users pay more than expected

---

### Option D — Document Verification Fees

Charge $30–50 per document verified by the platform's admin team.

- Verified status is visible on profile and builds trust
- Natural add-on to any subscription tier
- Automatable at scale (API-based verification with government databases)

---

### Option E — Featured Listings / Promoted Placement

Sellers pay to promote their listing to the top of search results.

- Suggested price: $10–30 per week per listing
- Familiar model (similar to eBay promoted listings, Indeed sponsored jobs)

---

### Suggested Year 1 Approach

Start with **Option A (subscriptions)** at a simplified two-tier structure:

- Free: open to all
- Verified Trader at $49/month: launched once 50+ active users are on the platform

Do not launch transaction commission until legal and compliance infrastructure is built for escrow.

---

## 8. Roadmap — MVP to Global Platform

---

### Phase 0 — Validation (Weeks 1–8) · Cost: ~$0

**Goal:** Prove that real traders will use the platform before spending anything on building.

Activities:
- Send 10 outreach messages to known buyers and sellers in the steel industry
- Conduct 5–10 fifteen-minute calls asking about current pain points
- Run the marketplace manually — post listings yourself, introduce buyers and sellers over WhatsApp and email
- Use a shared Google Sheet as the "database"
- Facilitate 2–3 successful introductions
- The success signal: someone says "I would pay for this" or "when can I start using this?"

Key questions to validate:
1. Is finding verified sellers the main pain point, or is it document management, pricing transparency, or something else?
2. Would traders use a structured RFQ system instead of WhatsApp?
3. What would they pay per month if they closed one extra deal per month through it?
4. What is the single biggest trust barrier to trading with a new counterparty online?

---

### Phase 1 — Concierge MVP (Months 2–3) · Cost: ~$0–200

**Goal:** Serve first 10 traders manually while learning what the product needs to be.

Activities:
- Operate the marketplace yourself — receive buy/sell requests, match them, broker introductions
- Charge nothing, just build the network and learn
- Track every interaction in a simple CRM (Notion or Google Sheets)
- Identify the 3 features traders ask for most

Success metrics:
- 10 traders using the platform weekly
- 5 successful introductions made
- At least 3 traders express willingness to pay

---

### Phase 2 — No-Code MVP (Months 3–6) · Cost: ~$200–400/month

**Goal:** A working digital product that real traders can use without your involvement.

**Core screens to build (in order of priority):**
1. User registration and profile
2. Post a listing / Browse listings
3. Basic messaging between traders
4. RFQ form (simplified)
5. Document upload (basic, no automated verification)

**Screens to defer to Phase 3:**
- Price tracker (complex data integration)
- Automated document verification
- Notifications (use email for now)

**Technology suggestion** (decision pending — see Section 9):
- No-code platform (e.g. Bubble.io, WeWeb, Softr)
- Payment processing add-on for subscriptions

**Verification approach (manual at this stage):**
- When a user uploads a trade license, it sends an email notification to you
- You review it manually, flip their "Verified" toggle in the database
- Takes 5 minutes per user, costs nothing
- Only automate when you exceed 50 verifications per month

Success metrics:
- 50 registered users
- 20 active monthly users (logged in and browsed)
- 5 paying subscribers
- First $200/month in revenue

---

### Phase 3 — Full Custom Build (Months 6–18) · Cost: Depends on team

**Goal:** A production-grade platform that can scale to thousands of users.

**Features to add:**
- Real-time messaging (WebSockets)
- Automated price feed integration (Platts, SteelHome API, or manual data entry)
- Document verification automation (OCR + government database lookup where available)
- Push notifications and WhatsApp/Telegram integration
- Mobile-responsive design or native mobile app
- Analytics dashboard for sellers (profile views, RFQ response rates, deal conversion)
- Admin dashboard for platform management
- API access for Premium suppliers

**Team needed at this stage:**
- 1 full-stack developer (or a small agency)
- 1 product designer (could be part-time)
- 1 community manager / operations person

---

### Phase 4 — Regional Expansion (Year 2) · Revenue-funded

**Goal:** Become the dominant platform for GCC + South Asia steel trading.

Expansion activities:
- Add Turkey, Egypt, and East Africa as additional supply corridors
- Launch Arabic language interface
- Partner with freight forwarders and logistics providers as integrated service add-ons
- Explore trade finance integration (invoice factoring, LC facilitation)
- Launch at The Big 5 Dubai and Metal Middle East trade shows

---

### Phase 5 — Global Platform (Year 3–5) · Funded or profitable

**Goal:** The trusted global benchmark for steel bar trading.

Long-term features:
- Proprietary price index (SteelXchange Price Index) published and cited by the industry
- AI-powered buyer-seller matching based on grade, location, and trading history
- Integrated escrow and payment processing
- Logistics coordination (connect with Flexport, Maersk APIs)
- Trade finance marketplace (connect buyers with LC issuers, sellers with export financiers)
- Carbon footprint tracking per shipment (ESG compliance)
- Mobile apps (iOS + Android)
- White-label version for steel associations and trade bodies

---

## 9. Tech Stack Suggestions

> **Important:** All options below are suggestions only. No implementation decision has been made. The final stack will be decided based on available budget, technical resources, and timeline.

---

### Option A — No-Code Stack (Suggested for Phase 2)

Best for: Non-technical founder, fastest time to market, lowest cost

| Component | Suggested Tool | Notes |
|---|---|---|
| Core platform | Bubble.io | Handles database, auth, UI, business logic in one tool |
| Messaging | Bubble Chat plugin or Stream Chat | Stream has free tier |
| File storage | Uploadcare or AWS S3 | For document uploads |
| Payments | Stripe (via Bubble plugin) | Subscriptions + one-time |
| Email notifications | SendGrid or Mailgun | Transactional email |
| Analytics | Mixpanel or Amplitude free tier | User behaviour tracking |
| Domain + hosting | Bubble hosting included | Custom domain setup |

**Estimated monthly cost at MVP stage:** $100–300/month total

**Limitations to know:**
- Bubble has performance limits at high traffic
- Custom complex queries may be slow
- Migrating off Bubble later requires full rebuild

---

### Option B — Low-Code / Hybrid Stack

Best for: Team with some technical capability, wanting more control

| Component | Suggested Tool | Notes |
|---|---|---|
| Frontend | Webflow + custom JS | Beautiful UI, some logic possible |
| Backend / Database | Supabase (Postgres + Auth + Storage) | Open source, generous free tier |
| Real-time messaging | Supabase Realtime or Stream | |
| Payments | Stripe | |
| Hosting | Vercel (frontend) + Supabase (backend) | |
| Email | Resend or SendGrid | |

**Estimated monthly cost:** $50–200/month

---

### Option C — Full Custom Stack (Suggested for Phase 3)

Best for: When you have a developer on the team or budget for an agency

| Component | Suggested Tool | Notes |
|---|---|---|
| Frontend | React (Next.js) | Performance, SEO, server-side rendering |
| Backend | Node.js (Express or Fastify) OR Django (Python) | Node = JS ecosystem; Django = faster data-heavy features |
| Database | PostgreSQL | Relational, matches the schema above |
| Real-time | Supabase Realtime or Socket.io | For messaging |
| File storage | AWS S3 or Cloudflare R2 | Documents and images |
| Authentication | Supabase Auth or Auth0 | |
| Payments | Stripe | |
| Email | SendGrid | |
| Push notifications | Firebase Cloud Messaging (FCM) | |
| WhatsApp integration | Twilio or WhatsApp Business API | |
| Price data | Manual entry (Phase 1) → Platts API (Phase 3+) | |
| Hosting | AWS, Google Cloud, or Render | |
| Search | PostgreSQL full-text (Phase 1) → Algolia or Typesense (Phase 2+) | |

**Estimated monthly cost:** $200–800/month (infrastructure only, not developer salaries)

---

### Document Verification Options

| Option | How | Cost | When |
|---|---|---|---|
| Manual | Admin reviews uploads, flips verified toggle | Free | Phase 1–2 |
| Semi-automated | OCR extracts text, admin confirms | Low | Phase 2 |
| Automated (UAE) | Ministry of Economy API (trade license verification) | API fees | Phase 3 |
| Automated (India) | GST verification API + BIS portal | API fees | Phase 3 |
| Third party | Jumio or Onfido business verification | $5–15 per verification | Phase 3 |

---

### Price Data Sources

| Source | Type | Cost |
|---|---|---|
| Manual admin entry | Founder enters prices weekly | Free |
| SteelHome | Asia + global steel price database | Subscription |
| Platts (S&P Global) | Industry standard, global coverage | Expensive ($10K+/year) |
| Steel Benchmarker | Rebar + HRC, global | Mid-range |
| Build own index | Aggregate from platform deal data | Free but needs deal volume |

**Recommendation for Phase 1:** Manual entry by the founder. At Phase 2, partner with SteelHome for an API feed. Long-term, build a proprietary index from deal data on the platform.

---

## 10. Validation Strategy

### The Concierge Test

Before writing a line of code or paying for any tool:

1. Write down 10 names of steel buyers or sellers you know personally
2. Send the WhatsApp outreach message (see Section 11)
3. Have 5 conversations using the questions below
4. Introduce 2–3 buyer-seller pairs manually (over email or WhatsApp)
5. Ask if they would pay $49/month to access a platform that does this automatically

### Interview Questions for Validation Calls

These are the questions to ask in the 15-minute validation conversations:

1. Walk me through how you currently find new suppliers / buyers for steel. What does that process look like?
2. What is the most time-consuming part of closing a steel deal?
3. Have you ever lost a deal because of a document issue (missing mill cert, delayed LC, etc)?
4. How do you currently track pricing — what sources do you use?
5. If you received 5 new qualified RFQs per month through a platform, would that be valuable?
6. What would make you trust a new counterparty you've never traded with before?
7. Is there anything about an online platform that would make you hesitant to use it for steel trading?
8. If this platform existed today, what would you use it for first?

### The Success Signal

Stop validating and start building when you have:
- 5 people who said "I would pay for this"
- 2 successful manual introductions where both parties confirmed value
- A clear recurring pain point mentioned by at least 4 of the 10 people interviewed

---

## 11. Outreach Templates

### Template 1 — WhatsApp (Informal Network)

```
Hey [Name], quick question — I'm building something in the steel trading 
space and want your honest opinion before I invest anything.

The idea: a marketplace where steel buyers post what they need (grade, 
quantity, delivery terms) and verified sellers respond with quotes. Like 
an RFQ platform built specifically for the industry — not generic B2B.

Two questions:
1. Is this something you'd actually use?
2. What's the single biggest frustration you have sourcing / selling steel today?

No pitch, just research. Your answer genuinely shapes what I build.
```

### Template 2 — LinkedIn / Email (Professional Network)

**Subject:** Quick question about steel sourcing — 15 minutes?

```
Hi [Name],

I'm in the early stages of building a B2B marketplace for steel bar 
trading — focused on the Gulf and South Asia corridor. Think verified 
profiles, structured RFQs, and mill certificate management in one place.

Before building anything, I'm speaking to 10 traders whose opinions 
I trust.

Would you be open to a 15-minute call this week? I have two specific 
questions and I'll respect your time.

No sales pitch — just honest market research from someone in the industry.

Best,
Raza
```

### Template 3 — Follow-up after call (to convert to early user)

**Subject:** SteelXchange — Early access

```
Hi [Name],

Thank you for the call. Your feedback on [specific pain point mentioned] 
was exactly the kind of insight I needed.

I'm building the first version now and would like to give you early 
access when it's ready — free, no commitment, just get to use it 
before anyone else and tell me what's wrong.

Can I add you to the early access list?

Raza
```

---

## 12. Competitive Landscape

### Direct Competitors

| Platform | What They Do | Gap |
|---|---|---|
| Alibaba / Global Sources | Generic B2B, includes steel | Not steel-specific, no RFQ workflow, no mill cert management |
| IndiaMART | India-focused B2B directory | No structured trading flow, no verification |
| Steelbbq.com | Chinese steel B2B | Language barrier, no Gulf focus |
| MetalMiner | Price intelligence only | No trading marketplace |
| Fastmarkets / Platts | Price data and news | No marketplace functionality |

### The Gap

There is no platform purpose-built for the steel bar trading workflow in the Gulf + South Asia corridor that combines:
- Verified trader profiles
- Structured RFQ-to-quote flow
- Integrated document management (mill certs, BL, LC)
- Regional price tracking
- In-app messaging tied to specific listings

This is the gap SteelXchange fills.

### Unfair Advantages

1. Founder is in the industry with an existing network
2. Based in Dubai — the hub of the Gulf trading corridor
3. Deep domain knowledge of how deals actually work (LC, BL, FOB, mill certs)
4. Can personally verify documents and traders in the early phase
5. Trust built through personal relationships before the platform launches

---

## 13. Open Questions & Decisions Pending

These are decisions that have not been made yet. They need to be resolved before or during development.

### Legal & Compliance
- [ ] In which jurisdiction will SteelXchange be incorporated? (UAE free zone suggested — IFZA, DMCC)
- [ ] Will the platform hold or process payments, or just facilitate introductions?
- [ ] If escrow / transaction commission is pursued, which payment gateway handles this for cross-border B2B?
- [ ] Are there regulatory requirements for operating a commodity marketplace in UAE?
- [ ] Terms of Service and Privacy Policy — need legal drafting

### Product
- [ ] What is the minimum viable set of features for the first version? (Suggested: listings + profiles + messaging only)
- [ ] Will messaging be real-time (WebSocket) from day one, or email-forwarded initially?
- [ ] Will document verification be manual (founder reviews) or semi-automated from launch?
- [ ] What grade/product categories will be supported at launch? (Suggested: rebar, structural angles, flat bars — defer coils and specialty)
- [ ] Will the platform support non-English languages at launch? (Arabic and Hindi are relevant)

### Business
- [ ] What is the pricing at launch? Free only, or freemium from day one?
- [ ] When will the first subscription be charged? (Suggested: after 50 active users)
- [ ] Will the founder operate the platform solo or hire? If hiring, what role first?
- [ ] What is the target for Year 1 MRR? (Suggested baseline: $5,000/month by month 12)
- [ ] Will there be a co-founder or technical partner?

### Tech
- [ ] Which no-code or development platform will be used for Phase 2?
- [ ] Will the platform be mobile-first, desktop-first, or both from launch? (Decided: desktop-first for initial testing)
- [ ] What will be used for document storage? (Needs to be GDPR-compliant and reliable)
- [ ] How will price data be sourced and how often updated?

---

## 14. Design System Reference

The following visual identity has been established across all prototype screens.

### Brand Identity
- **Platform name:** SteelXchange
- **Logo mark:** "ST" in white on orange background
- **Tagline:** Steel Bar Marketplace
- **Brand voice:** Direct, industry-grade, trustworthy — no fluff

### Typography
- **Display / Headings:** Barlow Condensed (700 weight) — industrial, condensed, authoritative
- **Body:** Barlow (400 / 500 weight) — clean and readable

### Colour Palette
| Name | Hex | Usage |
|---|---|---|
| Accent Orange | #D85A30 | Primary actions, CTA buttons, active states, price highlights |
| Accent Dark | #993C1D | Hover states, pressed buttons |
| Green | #1D9E75 | Verified badges, accepted states, bullish indicators |
| Green Dark | #0F6E56 | Hover on green elements |
| Background | #F5F4F1 | Page background |
| Surface | #FFFFFF | Cards, panels |
| Surface 2 | #F0EDE8 | Secondary backgrounds, input fields |
| Text Primary | #1A1917 | Headings, primary content |
| Text Secondary | #5A574F | Labels, secondary info |
| Text Tertiary | #9B9890 | Timestamps, metadata, placeholders |
| Border | rgba(0,0,0,0.1) | Default borders |
| Sidebar | #1A1917 | Navigation sidebar background |
| Red | #E24B4A | Bearish, error, expiring |
| Amber | #BA7517 | Warning, pending, neutral |

### Component Patterns
- **Border radius:** 6px (small), 8px (medium), 10px (cards), 12px (modals)
- **Border weight:** 1px solid
- **Sidebar width:** 220px fixed
- **Topbar height:** 54px
- **Card padding:** 18px
- **Listing card grid:** auto-fill, minmax(260px, 1fr)
- **Badge style:** 10px Barlow Condensed, 700 weight, uppercase, 4px border-radius

### Badge Colour Convention
| Badge Type | Background | Text |
|---|---|---|
| Selling | #FAECE7 | #993C1D |
| Buying | #E1F5EE | #0F6E56 |
| Urgent | #FAEEDA | #854F0B |
| Verified | #E1F5EE | #0F6E56 |
| Pending | #FAEEDA | #854F0B |
| Expiring | #FCEBEB | #A32D2D |
| Best Price | #E1F5EE | #0F6E56 |
| Fastest | #FAEEDA | #854F0B |
| Top Rated | #E6F1FB | #185FA5 |

---

## 15. File Inventory

Files produced during the design and planning process:

| File | Description |
|---|---|
| `steelxchange.html` | Complete interactive desktop web app — all 7 screens, working navigation, functional forms, chart, messaging |
| `SteelXchange_Project_Document.md` | This document — full project brief, schema, roadmap, and reference |

### Prototype Coverage

| Screen | Status | Notes |
|---|---|---|
| Marketplace | Complete | Listings grid, filters, search, post listing modal |
| User Profile | Complete | Stats, ratings, trade history, reviews, documents tabs |
| Messaging | Complete | Full inbox, threaded chat, inline RFQ cards, quick replies |
| RFQ Flow | Complete | 5-step pipeline, quote comparison, accept flow, new RFQ form |
| Price Tracker | Complete | Interactive chart, ticker strip, regional prices, alerts |
| Document Vault | Complete | Categories, preview panel, expiry watch, sharing toggles |
| Notifications | Complete | Feed, filters, preferences, delivery channels |

---

## Appendix — Key Steel Industry Terms

For reference when building forms, labels, and documentation.

| Term | Meaning |
|---|---|
| MT | Metric tonne (1,000 kg) |
| TMT | Thermo-Mechanically Treated (type of rebar) |
| HRB | Hot Rolled Bar (Chinese rebar standard, e.g. HRB400) |
| Fe500D | Indian rebar grade — 500 MPa yield strength, D = ductile |
| FOB | Free on Board — seller pays until loaded on ship, buyer pays freight |
| CIF | Cost, Insurance, Freight — seller pays to destination port |
| DAP | Delivered at Place — seller delivers to named destination |
| Ex-Works | Buyer collects from seller's facility, buyer pays all freight |
| L/C | Letter of Credit — bank payment guarantee instrument |
| TT | Telegraphic Transfer — wire bank payment |
| BL | Bill of Lading — shipping document proving cargo on vessel |
| MTC | Mill Test Certificate — confirms steel grade and test results |
| BIS | Bureau of Indian Standards — Indian certification body |
| SGS | SGS Group — third party inspection company |
| BV | Bureau Veritas — third party inspection company |
| RFQ | Request for Quotation |
| PO | Purchase Order |
| PI | Proforma Invoice |
| LC | Letter of Credit (same as L/C) |
| JAFZA | Jebel Ali Free Zone Authority (Dubai) |
| JNPT | Jawaharlal Nehru Port (Mumbai) — major Indian export port |

---

*Document last updated: April 13, 2026*  
*Next review: Before Phase 2 build begins*
