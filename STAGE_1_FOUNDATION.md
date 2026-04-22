# Stage 1 — Foundation Setup
### SteelXchange Production Build · First Stage

**Goal:** A working app skeleton that runs live on the internet with a real URL, a real database, and a working login system.

**Duration estimate:** 2–3 working sessions  
**Status:** READY TO START

---

## What "Foundation" Means

Think of this like building a house. Before you put in the kitchen, bedrooms, or furniture, you need:
- The concrete foundation (Supabase database)
- The walls and roof structure (Next.js app)
- The electricity and plumbing connected (auth, environment variables)
- A physical address (domain + Vercel hosting)

Without this, nothing else can be built. With this, every feature from Stage 2 onwards snaps in cleanly.

---

## Pre-conditions (Things You Need Before We Start Coding)

Before the first line of code, you need 4 accounts set up. All are free.

### 1. Supabase Account
- Go to: supabase.com
- Sign up with GitHub or email
- Create a new project called `steelxchange`
- Choose region: **Southeast Asia (Singapore)** — closest to UAE + India
- Save your Project URL and anon/public key (found in Settings > API)

### 2. Vercel Account
- Go to: vercel.com
- Sign up with GitHub (important — needs to link to your repo)
- You will connect it to your GitHub repo during Stage 1

### 3. Resend Account
- Go to: resend.com
- Sign up with email
- Get your API key from the dashboard
- Add and verify your sending domain (e.g. notifications@steelxchange.com) — Resend guides you through this

### 4. Stripe Account
- Go to: stripe.com
- Sign up for a business account
- Use test mode for now — no real money until Stage 6
- Get your publishable key and secret key from the Stripe Dashboard

---

## Task Breakdown

Each task below is a discrete unit of work. Claude will complete one at a time and confirm before moving to the next.

---

### Task 1.1 — Scaffold the Next.js Project

**What we do:**
Create the folder structure of the app — the skeleton before any real features exist.

**Commands:**
```bash
npx create-next-app@latest steelxchange \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

**What this creates:**
```
steelxchange/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout (sidebar, nav)
│   │   ├── page.tsx          # Homepage (redirects to marketplace)
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utility functions, DB client
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets (logo, images)
├── package.json
├── tailwind.config.ts
└── next.config.ts
```

**Test:** `npm run dev` starts the app on localhost:3000 with no errors.

---

### Task 1.2 — Connect Supabase

**What we do:**
Install the Supabase JavaScript client and configure it with your project's keys.

**Dependencies to install:**
```bash
npm install @supabase/supabase-js @supabase/ssr
```

**Files to create:**
- `.env.local` — stores your secret keys (never committed to GitHub)
- `src/lib/supabase/client.ts` — the browser-side Supabase connection
- `src/lib/supabase/server.ts` — the server-side Supabase connection
- `src/lib/supabase/middleware.ts` — protects routes that require login

**Test:** Supabase client initialises without error. Database connection is live.

---

### Task 1.3 — Design System Setup

**What we do:**
Translate the design from `steelxchange.html` into a Tailwind config and reusable components.

**Design tokens from the prototype:**
```css
--bg:       #F5F4F1    (page background)
--surface:  #FFFFFF    (card background)
--accent:   #D85A30    (primary orange — brand color)
--green:    #1D9E75    (positive, verified)
--text:     #1A1917    (primary text)
--sidebar:  #1A1917    (sidebar background)
```

**Fonts:** Barlow + Barlow Condensed (Google Fonts)

**Components to build in this task:**
- `Button` — primary, secondary, danger variants
- `Badge` — Selling, Buying, Urgent, Verified, Pending
- `Card` — standard container
- `StatCard` — the 4-column stat blocks
- `Sidebar` — navigation shell
- `Topbar` — page header

**Test:** A test page showing all components renders correctly.

---

### Task 1.4 — Authentication System

**What we do:**
Build the Sign Up, Log In, and Log Out flows using Supabase Auth.

**Pages to create:**
```
/auth/signup     — Create account
/auth/login      — Sign in
/auth/callback   — Handles OAuth redirect (for Google login later)
/auth/reset      — Password reset
```

**Sign Up form fields:**
- Full name
- Company name
- Email address
- Password (min 8 characters)
- Role: Buyer / Seller / Both (radio buttons)
- Location (Country dropdown — UAE, Saudi Arabia, India, Pakistan, Other)

**Validation rules:**
- Email must be unique
- Password minimum 8 characters, must contain a number
- Company name required
- Role required

**After signup:**
- Send welcome email via Resend
- Create user record in `users` table (Supabase trigger)
- Redirect to dashboard with onboarding checklist visible

**Protected routes:**
All routes except `/auth/*` and `/` require login. If not logged in, redirect to `/auth/login`.

**Test checklist:**
- [ ] Sign up with a new email → account created → welcome email received
- [ ] Log in with correct credentials → reaches dashboard
- [ ] Log in with wrong password → error message shown
- [ ] Visit `/marketplace` while logged out → redirected to login
- [ ] Log out → session cleared, redirected to login

---

### Task 1.5 — Database Schema Creation

**What we do:**
Create the actual database tables in Supabase using SQL migrations. This is the structure all data will live in.

**Tables to create in Stage 1:**
(Full schema from the project document — we create all tables now so Stage 2+ just fills them)

1. `users` — all user profiles
2. `listings` — buy/sell listings (for Stage 2)
3. `rfqs` — requests for quote (for Stage 5)
4. `rfq_recipients` — who an RFQ was sent to
5. `quotes` — seller responses to RFQs
6. `message_threads` — chat conversations
7. `messages` — individual messages
8. `documents` — uploaded files
9. `document_shares` — document access control
10. `deals` — closed transactions
11. `reviews` — ratings and reviews
12. `price_indices` — steel price data
13. `price_alerts` — user price alert settings
14. `notifications` — in-app alerts
15. `subscriptions` — payment tiers

**Row Level Security (RLS) policies to create:**
- Users can only read/write their own profile
- Listings are readable by all logged-in users, writable only by owner
- Messages are only readable by thread participants
- Documents are only readable by owner (or users they've been explicitly shared with)

**Test:** All tables exist in Supabase dashboard. RLS policies are enabled and active.

---

### Task 1.6 — Basic User Profile Page

**What we do:**
Build the first real page a user sees after logging in — their own profile.

**Route:** `/profile/[userId]` (also accessible as `/profile/me`)

**What it shows (Stage 1 version — simplified):**
- Avatar (initials from name, or uploaded photo)
- Name + company name
- Role badge (Buyer / Seller / Both)
- Location
- Member since date
- Verified status (will show "Pending Verification" until Stage 3)
- Edit Profile button (opens a form to update name, company, location, etc.)

**This is a simplified version.** The full profile (with trade stats, ratings, document tab, trade history) is built in Stage 3. We just need the basic identity block now.

**Test:**
- [ ] Profile page loads for the logged-in user
- [ ] Name and company display correctly
- [ ] Edit profile saves changes to database
- [ ] Profile URL `/profile/[userId]` works and is publicly visible to other logged-in users

---

### Task 1.7 — GitHub + Vercel Auto-Deploy

**What we do:**
Connect the codebase to GitHub and Vercel so every code push automatically goes live.

**Steps:**
1. Initialize git in the project folder
2. Connect to repo: `https://github.com/ismailmoiz/Steel-Marketplace.git`
3. Initial commit and push
4. Connect Vercel to the GitHub repo (via Vercel dashboard)
5. Add all environment variables to Vercel dashboard
6. Trigger first production deploy

**After this task:**
- Every push to `main` branch → live at your Vercel URL within 2 minutes
- Every branch/PR → gets a preview URL for testing

**Test:** Push a small change (like updating the page title). Verify it appears on the live Vercel URL within 3 minutes.

---

### Task 1.8 — App Shell (Layout + Navigation)

**What we do:**
Build the persistent sidebar navigation and topbar that wraps every page in the app.

**Sidebar nav items (from prototype):**
- Marketplace
- My Listings
- RFQ
- Messages (with unread badge)
- Price Tracker
- Documents
- Notifications (with unread badge)
- My Profile

**Sidebar bottom:**
- User avatar + name + company
- Verified badge (if verified)
- Settings link
- Logout button

**Topbar:**
- Page title (dynamic per page)
- Primary action button (e.g. "Post Listing" on marketplace page)
- Notification bell icon (with unread count)

**Mobile behavior:**
- Sidebar collapses to a hamburger menu on screens < 768px
- Bottom navigation bar on mobile (marketplace, messages, RFQ, profile)

**Test:**
- [ ] All nav items navigate to correct routes
- [ ] Active state (highlighted nav item) changes based on current route
- [ ] Sidebar renders on every protected page
- [ ] Mobile: sidebar collapses and hamburger works

---

## Stage 1 — Complete Checklist

Before calling Stage 1 done and moving to Stage 2, ALL of these must pass:

- [ ] `npm run build` completes with 0 errors
- [ ] `npm run lint` completes with 0 errors
- [ ] App loads on live Vercel URL
- [ ] Sign up flow works end to end (form → database → welcome email → dashboard)
- [ ] Login / logout works
- [ ] Protected routes redirect to login when not authenticated
- [ ] User profile page loads and can be edited
- [ ] All 15 database tables exist in Supabase with RLS enabled
- [ ] Sidebar navigation renders on all pages
- [ ] Design tokens match the prototype (colors, fonts, spacing)
- [ ] GitHub push auto-triggers Vercel deployment
- [ ] No console errors in production

---

## What You Will See When Stage 1 Is Done

Open your live URL. You will see:

1. A login screen with the SteelXchange logo, brand colors, and fonts matching the prototype
2. A sign-up form where you can create an account
3. After signing up — a dashboard with the sidebar navigation
4. Navigation links that go to placeholder pages (Stage 2 will fill them)
5. A profile page showing your name, company, and role
6. A welcome email in your inbox

That's it. Simple. But it's the real thing — a real app on a real URL with a real database.

---

## Known Limitations at End of Stage 1

These are intentional — they will be resolved in later stages:

- No listings yet (Stage 2)
- Profile shows placeholder stats (Stage 3)
- Messaging shows placeholder (Stage 4)
- No payment processing (Stage 6)
- Price tracker shows placeholder (Stage 6)
