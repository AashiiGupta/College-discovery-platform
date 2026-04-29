# CollegeDiscover — Loom Walkthrough Script (5–7 min)

## Goal
Present this as a real funded startup MVP, not a college project.
Speak confidently — you built this. Reference specific technical decisions.

---

## Segment 1 — Intro (30 sec)

> "Hi, I'm [Name]. I built CollegeDiscover — a college discovery and decision platform for Indian students. Think of it as a simplified Careers360 or Collegedunia, but with a cleaner UX, a smart comparison engine, and a production-grade backend. Let me walk you through it."

**Show:** The homepage.

**Points to make:**
- Stack: Next.js 14 App Router + Express.js + PostgreSQL + JWT auth
- The platform is fully deployable on Vercel + Railway right now
- Real PostgreSQL data — 20 colleges, 120 courses, no mocks for core data

---

## Segment 2 — College Discovery (60 sec)

**Show:** `/colleges` page.

**Actions to demo:**
1. Type "IIT" in the search box — debounced, hits PostgreSQL
2. Filter by State: "Maharashtra" — backend query runs in real-time
3. Change max fees slider — re-queries the backend
4. Reset all filters

**Key talking points:**
- "All filtering happens server-side via parameterized SQL queries — no frontend fake-filtering"
- "Search is debounced at 400ms to avoid hammering the API on every keystroke"
- "Pagination: 9 per page, with correct total count from the DB"

---

## Segment 3 — College Detail Page (60 sec)

**Show:** Click any college → detail page.

**Actions to demo:**
1. Point out the 4 tabs: Overview, Courses, Placements, Reviews
2. Click Courses tab — show all courses with fees and seat info
3. Click Placements — avg/highest packages, recruiter list
4. Click the Save button (login first if not)
5. Click Compare button — adds to compare bar

**Key talking points:**
- "Dynamic route — `/colleges/[id]` — fetched server-side using React Query with automatic caching"
- "Save state is persisted in PostgreSQL via the saved_colleges table — not localStorage"

---

## Segment 4 — Compare Dashboard (90 sec) ← STRONGEST FEATURE

**Show:** `/compare` page with 2–3 colleges selected.

**Actions to demo:**
1. Show the score cards at the top with animated progress bars
2. Point out the "Best Pick" badge (trophy icon) on the highest-scoring college
3. Scroll to the recommendation banner — "Our Recommendation: [College Name]"
4. Show the comparison table rows — highlight the ↑ green / ↓ red arrows
5. Show the visual bar charts at the bottom (placement and rating)

**Key talking points:**
- "The scoring algorithm weights placement at 40%, rating 25%, fees 20%, highest package 15%"
- "The compare API accepts 2–3 college IDs, fetches from PostgreSQL, groups courses by college, and saves a history entry for logged-in users"
- "The dashboard auto-updates when you add or remove colleges — no manual 'Compare' button needed"
- "Arrow indicators (↑/↓/—) make the decision obvious even at a glance"

---

## Segment 5 — Authentication System (45 sec)

**Show:** `/register` then `/login`.

**Actions to demo:**
1. Register a new account
2. Show it redirects to colleges page after auth
3. Click Login while logged in → shows "Already Signed In" screen
4. Show navbar dropdown — avatar with initials, name, dropdown menu

**Key talking points:**
- "Passwords hashed with bcrypt (10 rounds) before storage"
- "JWT issued on login, stored in Zustand with localStorage persist for SSR hydration"
- "Protected API routes verify the JWT on every request via an Express middleware"
- "Zod validation runs before any controller code — catches malformed requests with structured 422 errors"

---

## Segment 6 — Profile Dashboard (30 sec)

**Show:** Click profile dropdown → My Dashboard.

**Actions to demo:**
1. Show the banner + avatar (initials-based)
2. Click a saved college in the list
3. Show the quick links panel

**Key talking points:**
- "Stats cards pull live data from PostgreSQL via React Query"
- "The compare history is logged per user in the compare_history table"

---

## Segment 7 — Architecture & Engineering Decisions (60 sec)

> "Let me briefly explain a few engineering decisions I made."

**Points to cover:**

1. **No ORM** — "I chose raw `pg` queries over Prisma/TypeORM for this project because it makes the SQL explicit and easy to reason about. It also eliminates ORM overhead on simple CRUD."

2. **Zustand + React Query** — "I separate concerns: Zustand handles ephemeral UI state (which colleges are selected for comparison, auth token), React Query handles server state with automatic caching and invalidation."

3. **Validation with Zod** — "Every write endpoint has a Zod schema. This means bad data never reaches the database — the controller code is clean and trusted."

4. **Optional auth on compare** — "Compare works for guests too. When a user is logged in, the history is persisted. I used an `optionalAuth` middleware that doesn't reject unauthenticated requests."

5. **Idempotent saves** — "The save endpoint uses `INSERT ... ON CONFLICT DO NOTHING` so double-clicking save never throws an error."

---

## Segment 8 — Deployment Readiness (30 sec)

**Show:** `.env.example`, `README.md`.

**Points:**
- Frontend: Vercel — `npm run build` works zero-config
- Backend: Render/Railway — `npm run build` + `npm start`
- DB: `npm run db:init && npm run seed` bootstraps everything
- All secrets via env vars — no hardcoded credentials

---

## Closing (15 sec)

> "This took me approximately [X] hours. The biggest challenge was the compare scoring algorithm and making the auth state hydrate correctly on SSR without flash. I'm happy to discuss any specific part in more detail. Thank you."

---

## Edge Cases You Handled (mention if asked)

- Saving a college twice → `ON CONFLICT DO NOTHING` — silent success
- Compare with only 1 college → shows "Select 1 more" message, no API call
- Accessing `/saved` or `/profile` unauthenticated → redirect to `/login?redirect=/saved`
- Visiting `/login` when already logged in → "Already Signed In" screen
- JWT expiry → 401 from API → frontend can clear store and re-login
- Image fallback → `||` default Unsplash URL for any missing image
- Filter reset → all params cleared, re-fetches full list

## Tradeoffs You Made (mention if asked)

| Decision | Tradeoff |
|---|---|
| Raw SQL over ORM | More explicit, but more boilerplate for joins |
| localStorage JWT | Simple, works on Vercel — but not HttpOnly cookie security |
| Mock reviews | No backend review system — would add in v2 |
| `pg` not `pgvector` | No semantic search — would add AI-powered search in v2 |
| No rate limiting | Would add `express-rate-limit` before production |
