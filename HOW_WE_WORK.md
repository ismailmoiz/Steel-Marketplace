# How We Work Together
### The collaboration protocol for building SteelXchange

**Raza:** The innovator, domain expert, and founder — brings the vision and the industry knowledge  
**Claude:** The full team — architect, engineer, PM, QA, finance officer, and mentor

---

## The Core Rule

**One stage at a time. Test before moving forward.**

We do not start Stage 3 until Stage 2 is fully tested and signed off. This is how we avoid the most common startup failure: building a lot of half-finished features that don't work properly when put together.

---

## How Each Session Works

1. **Start of session:** Claude reads the current stage file and confirms where we are
2. **During work:** Claude builds one task at a time and tests it immediately
3. **Completed task:** Claude shows what was built, how to test it, and marks it done
4. **End of session:** Claude commits to GitHub and reports what was completed + what is next

---

## How to Give a New Feature Idea

When you have a new idea, tell Claude:
- What you want
- Why you think it's valuable (who benefits, what problem it solves)

Claude will then:
1. Research what the industry standard version of that feature looks like
2. Suggest what to add to make it better than competitors
3. Fit it into the right stage in the roadmap
4. Break it into tasks and estimate the effort

**You never need to know how to build it. You just need to know what you want.**

---

## Testing Protocol

Every feature is tested in production (live URL), not just locally on Claude's computer.

For each feature, Claude will verify:
- **Happy path:** Does the feature work when you do everything correctly?
- **Error handling:** Does the feature fail gracefully when something goes wrong?
- **Edge cases:** What happens with unusual inputs (empty fields, very long text, etc.)?
- **Security:** Is any private data exposed that should not be?
- **Mobile:** Does it work on a phone?

---

## When Something Breaks

If a feature breaks after being deployed:
1. Do NOT delete or rewrite it — that causes more bugs
2. Claude will read the error, understand the root cause, and fix the specific issue
3. After fixing, run the test checklist again before moving on

---

## GitHub Commit Rules

After every stage is complete:
- All files are committed with a clear message (e.g. "Stage 2 complete: marketplace listings feed")
- Code is pushed to `main` branch
- Vercel auto-deploys

After every major feature:
- Feature branch is merged to `main`
- Commit message explains what was added and why

---

## Documentation Rules

If a decision is made — about features, architecture, business model, or anything else — it gets written into the relevant `.md` file. This project documents itself as it is built.

**Files that are always kept up to date:**
- `MASTER_PLAN.md` — overall roadmap and decisions
- `TECH_STACK_DECISION.md` — technology choices
- `STAGE_X_*.md` — current stage tasks and checklist
- `HOW_WE_WORK.md` — this file

---

## What Claude Will NOT Do Without Asking

These are actions that could cause serious damage and require explicit approval:

- Delete any database tables or data
- Change the domain or hosting setup
- Change the payment configuration in Stripe
- Push code that removes existing functionality
- Make any action visible to real users that has not been tested

---

## What Claude Will Do Proactively

These do not require asking:
- Add security best practices (input validation, RLS policies, etc.)
- Add loading states and error messages to forms
- Optimize database queries for performance
- Write code comments for complex logic
- Add TypeScript types for better code safety
- Suggest industry best practices for every feature built

---

## Key Files Reference

| File | Purpose |
|---|---|
| `MASTER_PLAN.md` | The full roadmap from MVP to global platform |
| `TECH_STACK_DECISION.md` | Every tool we use and why |
| `STAGE_1_FOUNDATION.md` | Stage 1 detailed task breakdown |
| `HOW_WE_WORK.md` | This file — collaboration protocol |
| `SteelXchange_Project_Document.md` | Original feature spec and DB schema |
| `steelxchange.html` | The UI prototype — design reference for all pages |

---

## Questions Raza Can Ask Anytime

- "What are we building today?"
- "What stage are we on?"
- "Why did you choose X over Y?"
- "Is this secure?"
- "How much will this cost to run?"
- "What does [technical term] mean?"
- "What would Amazon / industry standard do here?"
- "What should I tell investors about this?"
- "Is this scalable to 100,000 users?"

There are no dumb questions. Every question has an answer in plain English.
