# SteelXchange — Master Production Plan
### From Prototype to MVP to Global Platform

**Document owner:** Raza Mirza + Claude (AI Architect)  
**Last updated:** April 14, 2026  
**Status:** Active — in execution

---

## The Big Picture

We have a fully designed prototype and a complete feature specification. Now we build the real product. This document is the single source of truth for every decision made from here forward.

**Our mission for the next 90 days:** Get a working, deployed, real-money-capable MVP live — one that a steel trader in Dubai can sign up for, post a listing, receive an RFQ, and respond — all without any manual intervention from us.

---

## What We Are Building

A B2B marketplace for steel bar trading. The equivalent of Amazon for the steel industry — but purpose-built for how steel actually trades: RFQs, mill certificates, letters of credit, metric tonne pricing, and verified companies.

**Primary market:** UAE, Saudi Arabia, India, Pakistan  
**Primary users:** Steel importers/traders, construction procurement managers, mill exporters

---

## The 6 Production Stages

Each stage has a clear goal, a list of features to build, a test checklist, and a "done" signal. We do one stage at a time. Nothing from the next stage starts until the current one passes its test checklist.

---

### STAGE 1 — Foundation Setup
**Duration:** 2–3 days  
**Goal:** A working app skeleton that runs live on the internet with a real URL, a database, and a login system.

**What gets built:**
- Project scaffolding (Next.js 14 app structure)
- Supabase project (PostgreSQL database + Auth + Storage)
- Domain setup and Vercel deployment
- GitHub repository connected to auto-deploy
- Basic authentication: Sign Up / Log In / Log Out
- Basic user profile page (just name, company, role)
- Dark/light mode and design system matching the prototype

**Why this comes first:**  
Everything else builds on top of this. Authentication and database must exist before any feature can be built properly. Also: having a live URL from Day 1 means you can show people the real product, not just a screenshot.

**Done signal:** You can open the live URL, sign up with your email, see your profile page, and log out.

---

### STAGE 2 — Marketplace Core
**Duration:** 3–5 days  
**Goal:** Traders can post listings and browse listings. This is the core value of the platform.

**What gets built:**
- Post a Listing form (full form from spec)
- Listings feed / marketplace page
- Listing cards with all fields
- Filter by: All / Selling / Buying / Urgent
- Search by grade, location, supplier
- Summary stats bar (live from database)
- Listing detail page

**Industry best practices to add:**
- Pagination (load more, not infinite scroll — better for B2B users)
- Listing expiry (auto-expire after 30 days, email reminder at 7 days)
- View count per listing
- "Report listing" button (trust and safety from Day 1)

**Done signal:** A seller can post a listing. A buyer can find it by searching. Both actions work in production.

---

### STAGE 3 — User Profiles + Verification
**Duration:** 3–4 days  
**Goal:** Every trader has a credible, verifiable identity on the platform. This is what makes buyers trust sellers.

**What gets built:**
- Full profile page (matching the designed spec)
- Profile editing
- Trade statistics (auto-calculated from database)
- Document upload (Trade License, ISO cert, etc.)
- Manual verification workflow (email alert to admin, admin flips a toggle)
- Verified Trader badge visible on profile and listing cards

**Industry best practices to add:**
- Profile completeness score ("Your profile is 60% complete — add your trade license to get the Verified badge")
- "Last active" indicator (shows buyers when a seller was last online)
- Preferred products/grades listed on profile (helps with matching later)

**Done signal:** A trader can fill their profile, upload a document, and you (admin) can mark them as Verified. The badge appears on their listings.

---

### STAGE 4 — Messaging System
**Duration:** 4–5 days  
**Goal:** Buyers and sellers can communicate inside the platform instead of WhatsApp. Every conversation is pinned to a listing.

**What gets built:**
- Message threads (inbox)
- Real-time chat using Supabase Realtime
- Thread header showing the listing being discussed
- Inline Quote/RFQ card inside messages
- Quick reply chips (steel-specific shortcuts)
- Unread count badge in sidebar nav
- Email notification when you receive a new message

**Industry best practices to add:**
- Read receipts (seen/delivered indicators)
- File attachment in chat (share a mill cert directly in the conversation)
- Thread archiving
- Message search

**Done signal:** A buyer can click "Contact Seller" on a listing, send a message, the seller gets an email notification, and can reply from inside the app. All in real time.

---

### STAGE 5 — RFQ System
**Duration:** 4–6 days  
**Goal:** Buyers can broadcast a formal requirement to multiple verified sellers and compare returned quotes side by side.

**What gets built:**
- RFQ creation form (full 5-step pipeline)
- Broadcast to: All Verified / Saved Suppliers / Manual selection
- Quote submission by sellers
- Quote comparison view (side-by-side)
- Accept Quote → Generate PO flow
- RFQ status timeline
- Email notifications throughout the pipeline

**Industry best practices to add:**
- Quote validity countdown timer (sellers often set 48-72 hour validity)
- Counter-offer capability (buyer can come back with a different price)
- RFQ history and analytics (what grades do buyers request most — valuable data)
- Auto-match: when an RFQ is posted, notify sellers who have a matching listing

**Done signal:** A buyer can post an RFQ. Two sellers can submit quotes. Buyer can accept one. Both parties get notified.

---

### STAGE 6 — Launch-Ready Features
**Duration:** 5–7 days  
**Goal:** The platform is ready for real traders to use and pay for.

**What gets built:**
- Price Tracker page (manual price entry by admin, live chart)
- Document Vault (full per the spec)
- Notifications center (in-app + email)
- Stripe subscription integration ($49/month Verified Trader tier)
- Admin dashboard (basic — manage users, verify documents, view platform stats)
- Email onboarding sequence (Welcome → Profile completion → First listing prompt)
- Mobile-responsive design audit
- Performance and security audit

**Industry best practices to add:**
- Free trial (14-day Verified Trader trial without credit card — B2B SaaS standard)
- Referral program ("Invite a trader, get 1 month free")
- Onboarding checklist on dashboard ("5 steps to get your first inquiry")
- SEO-optimised listing URLs (so listings appear in Google search)

**Done signal:** A trader can sign up, explore, subscribe via Stripe, post a listing, receive an RFQ, and respond — entirely without us. Revenue appears in the Stripe dashboard.

---

## After MVP — The Next Phases

These are real, planned features — not wishful thinking. We will do them after the 6 stages above are live and validated.

| Phase | What | When |
|---|---|---|
| Phase 7 | WhatsApp/Telegram notifications | Month 4 |
| Phase 8 | Mobile app (React Native) | Month 5–6 |
| Phase 9 | AI buyer-seller matching | Month 6 |
| Phase 10 | Automated document verification (OCR) | Month 7 |
| Phase 11 | Price feed integration (SteelHome API) | Month 8 |
| Phase 12 | Trade finance integration (LC facilitation) | Year 2 |
| Phase 13 | Arabic language interface | Year 2 |
| Phase 14 | Proprietary SteelXchange Price Index | Year 2–3 |

---

## Budget Reality Check

| Item | Monthly Cost | Notes |
|---|---|---|
| Vercel (hosting) | $0–20 | Free tier is enough for MVP |
| Supabase (database + auth + storage) | $0–25 | Free tier up to 50K users |
| Resend (email) | $0 | 3,000 emails/month free |
| Stripe | 2.9% + $0.30 per transaction | No monthly fee |
| Domain (.com) | ~$12/year | One-time per year |
| **Total MVP cost** | **~$0–50/month** | Until you hit real scale |

**Revenue to cover costs:** 1 paying subscriber at $49/month covers everything. You need 0 upfront investment to run the MVP.

---

## Key Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Frontend framework | Next.js 14 (App Router) | SEO + performance + React ecosystem |
| Database + Auth | Supabase | All-in-one, free tier, real-time built in |
| Hosting | Vercel | Auto-deploy from GitHub, edge CDN, free |
| Email | Resend | Modern, developer-friendly, generous free tier |
| Payments | Stripe | Industry standard, trust, global |
| Styling | Tailwind CSS | Fast to build, matches the design system |
| Language | TypeScript | Catches bugs before they happen |

See `TECH_STACK_DECISION.md` for full details and reasoning.

---

## Rules We Follow

1. **One stage at a time.** Do not start Stage 3 until Stage 2 passes its test checklist.
2. **Test immediately.** Every feature is tested the moment it is built, in production — not just locally.
3. **Commit to GitHub after every stage.** The repo is always up to date.
4. **Document every decision.** If a decision is made, it goes in the relevant `.md` file. Future-us will thank present-us.
5. **Security first.** B2B platforms handle sensitive company data. We follow OWASP Top 10 from Day 1.
6. **Mobile-aware from Day 1.** Steel traders use phones. Design for mobile even if we build desktop-first.

---

## Current Active Stage

**STAGE 1 — Foundation Setup**  
See `STAGE_1_FOUNDATION.md` for detailed task breakdown.
