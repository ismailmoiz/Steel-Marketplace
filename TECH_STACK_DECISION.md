# SteelXchange — Tech Stack Decision
### Every tool we use, why we chose it, and what it does

**Decided:** April 14, 2026  
**Decision-maker:** Raza Mirza (founder) + Claude (architect)  
**Status:** Final — do not change without updating this document

---

## Plain English Summary

Before the technical details, here is what each tool is and why a non-technical founder should care:

| Plain English | Tool | Why This One |
|---|---|---|
| The app itself (what users see and click) | **Next.js 14** | Fast, works on Google, battle-tested |
| The database (where all data is stored) | **Supabase** | Like Firebase but more powerful, free to start |
| Login / signup system | **Supabase Auth** | Built into Supabase, handles passwords and sessions |
| File storage (documents, profile photos) | **Supabase Storage** | Built into Supabase, like a private Google Drive |
| Real-time (live chat, instant notifications) | **Supabase Realtime** | Messages appear instantly without refreshing |
| The server where the app lives | **Vercel** | Connects to GitHub, auto-deploys, free |
| Sending emails to users | **Resend** | Modern email service, 3,000 free emails/month |
| Taking payments / subscriptions | **Stripe** | Used by Amazon, Shopify, Uber — most trusted globally |
| Visual design / styling | **Tailwind CSS** | Write design in code, fast to build |
| Code quality and error prevention | **TypeScript** | Catches bugs before users see them |
| Version control (saving code history) | **GitHub** | Backup + collaboration + deployment trigger |

---

## Why Not Bubble / No-Code?

You could build this on Bubble.io. Here is the honest comparison:

| Factor | Bubble | Our Stack (Next.js + Supabase) |
|---|---|---|
| Speed to first feature | Faster | Slightly slower |
| Cost at MVP scale | $100–300/month | $0–50/month |
| Performance at 1,000+ users | Can struggle | Handles 100,000+ |
| Customisation | Limited | Unlimited |
| Migrating off later | Full rebuild required | Easy to extend |
| Looks like a real product | Sometimes looks "Bubble-ish" | Pixel-perfect control |
| SEO (Google-findable listings) | Poor | Excellent (Next.js SSR) |

**Conclusion:** Bubble is fine for a concept test. Since we already have the prototype in HTML, and we want to go straight to production, building on the right stack now saves us a full rebuild in 6 months.

---

## Full Stack Detail

### 1. Next.js 14 — The App Framework

**What it is:** Next.js is a framework built on top of React (the most popular way to build web apps). It handles routing (which URL shows which page), performance, SEO, and lets you write both the visible frontend and the backend API in one codebase.

**Why Next.js for SteelXchange:**
- **SEO matters:** When a seller posts "TMT Fe500D, 500MT, CIF Dubai", we want that listing to appear in Google. Next.js supports Server-Side Rendering (SSR) which makes pages indexable by Google. Bubble and most no-code tools do not.
- **App Router (v14):** Latest routing system, better performance, built-in loading states
- **API routes:** We can build our backend logic (notifications, webhooks, admin actions) inside the same project — no separate server needed

**Version:** Next.js 14 with App Router  
**Language:** TypeScript (JavaScript with type safety)

---

### 2. Supabase — Database + Auth + Storage + Realtime

**What it is:** Supabase is often called "the open-source Firebase alternative." It gives you a full PostgreSQL database, user authentication, file storage, and real-time subscriptions — all in one dashboard, all with a free tier.

**Why Supabase for SteelXchange:**

| Feature | How We Use It |
|---|---|
| PostgreSQL database | Stores all users, listings, RFQs, quotes, messages, documents |
| Supabase Auth | Handles sign-up, login, password reset, session management |
| Supabase Storage | Stores uploaded documents (trade licenses, mill certs, BLs) |
| Supabase Realtime | Powers the live chat — messages appear instantly |
| Row Level Security (RLS) | Ensures users can only see their own private data |

**Row Level Security (RLS) explained in plain English:**  
This is a PostgreSQL security feature that means rules are built directly into the database. For example: "A user can only read their own messages." Even if a bug in the code tried to show User A the messages of User B, the database itself would block it. This is enterprise-grade security that protects your users' private trade conversations.

**Free tier limits:**
- 500MB database (enough for ~500,000 listings)
- 1GB file storage
- 50,000 monthly active users
- Unlimited API requests

We will not hit these limits in the first 6 months.

---

### 3. Vercel — Hosting and Deployment

**What it is:** Vercel is the company that built Next.js. Their hosting platform is the natural home for Next.js apps.

**Why Vercel:**
- **Auto-deploy:** Every time we push code to GitHub, Vercel automatically builds and deploys the new version. No manual uploads.
- **Preview URLs:** Every pull request gets a unique URL you can test before it goes live
- **Edge CDN:** Your app loads fast from anywhere in the world — UAE, India, China
- **Free tier:** More than enough for MVP

**Custom domain setup:** We point your domain (e.g. steelxchange.com) to Vercel. Takes 15 minutes.

---

### 4. Resend — Email Delivery

**What it is:** A modern email sending service for developers. Used to send transactional emails (welcome emails, message notifications, RFQ alerts, password resets).

**Why Resend over SendGrid:**
- Simpler API, built for modern frameworks (has a Next.js native integration)
- Free tier: 3,000 emails/month (enough for first 500 users)
- Beautiful email templates with React Email (we write emails in React the same way we write UI)

**Emails we will send:**
- Welcome / onboarding sequence
- "New message received" alerts
- "New quote received on your RFQ"
- "Your listing expires in 7 days"
- "Your document is expiring in 30 days"
- Subscription receipts

---

### 5. Stripe — Payments and Subscriptions

**What it is:** The global standard for payment processing. Used by Amazon, Shopify, Uber, and hundreds of thousands of SaaS products.

**Why Stripe:**
- Handles subscription billing automatically (monthly charges, failed payment retries, cancellations)
- Supports all major payment methods (Visa, Mastercard, AMEX)
- Stripe Dashboard shows you revenue, subscribers, and churn in real time
- PCI compliant by default — we never store card data ourselves
- Accepts payments from UAE, India, Pakistan, Saudi Arabia

**Our pricing structure (from MASTER_PLAN.md):**
- Free: $0/month
- Verified Trader: $49/month

**Stripe fees:** 2.9% + $0.30 per transaction. On a $49 subscription that is $1.72 in fees. You keep $47.28 per subscriber.

---

### 6. Tailwind CSS — Styling

**What it is:** A CSS framework that lets us write design rules directly in the HTML/JSX code instead of in separate style files. The result is faster development and a consistent design system.

**Why this matters for you:** The HTML prototype (`steelxchange.html`) already has a defined design system (colors, typography, spacing). Tailwind makes it easy to replicate this exactly in the production app.

---

### 7. GitHub — Code Repository

**Repo:** https://github.com/ismailmoiz/Steel-Marketplace.git

**Workflow:**
1. We write code locally
2. We push (save) to GitHub
3. Vercel detects the push and auto-deploys to live URL
4. Every change has a record (what changed, when, who)

**Branch strategy:**
- `main` — the live production app (what users see)
- `stage-X-feature-name` — branches for each new feature being built

---

## Security Standards We Follow from Day 1

SteelXchange handles real company data, trade documents, and financial negotiations. Security is not optional.

| Threat | How We Protect Against It |
|---|---|
| Unauthorized data access | Supabase Row Level Security (RLS) |
| Password breaches | Supabase Auth handles hashing; we never store plain passwords |
| XSS (malicious scripts in input) | Next.js escapes output by default |
| SQL injection | Supabase uses parameterized queries; never raw SQL from user input |
| Insecure file uploads | File type validation + Supabase Storage access policies |
| Exposed API keys | Environment variables only, never committed to GitHub |
| HTTPS everywhere | Vercel enforces HTTPS on all pages |

---

## Infrastructure Cost Projection

| Users | Monthly Cost | Revenue Needed to Cover |
|---|---|---|
| 0–100 users | $0 | N/A (all free tiers) |
| 100–1,000 users | $25–75 | 1–2 subscribers |
| 1,000–10,000 users | $100–200 | 2–5 subscribers |
| 10,000+ users | $300–600 | 7–12 subscribers |

The platform is profitable (infrastructure-wise) with **2 subscribers**.

---

## What We Deliberately Excluded (And Why)

| Technology | Why We Excluded It |
|---|---|
| Bubble / no-code | Cannot scale, migration cost, poor SEO |
| AWS (raw) | Too complex for MVP, expensive before scale |
| MongoDB | Relational data (RFQs, quotes, deals) fits SQL better |
| Firebase | Supabase is more powerful for relational data |
| Separate Node.js backend | Next.js API routes do everything we need |
| React Native (mobile app) | Phase 7+ — web first, mobile second |
| Elasticsearch | PostgreSQL full-text search is enough for MVP |

---

## Environment Variables Required

These are secrets that go in Vercel's dashboard (never in GitHub). Claude will set these up during Stage 1.

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```
