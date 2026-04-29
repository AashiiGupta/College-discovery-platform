<<<<<<< HEAD
# 🎓 CollegeDiscover — College Discovery Platform

> A production-grade full-stack MVP that lets students **search, compare, and shortlist top Indian colleges** — built as part of a Full Stack Developer Internship Demo Task (Track B).

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://postgresql.org)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express)](https://expressjs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Live Features

| Feature | Description |
|---|---|
| 🔍 **Smart Search & Filter** | Search by college name; filter by state, type, course, and max fees |
| 📋 **College Detail Pages** | 4-tab layout: Overview, Courses, Placements, Reviews |
| ⚖️ **Compare Dashboard** | Side-by-side smart comparison with scoring, ↑/↓ indicators, "Best Pick" badge |
| 🔖 **Save Colleges** | Personal shortlist stored in PostgreSQL (auth required) |
| 🔐 **JWT Authentication** | Register + login with bcrypt, protected API routes |
| 👤 **User Profile** | Dashboard with stats, saved list, compare history, quick links |
| 📱 **Fully Responsive** | Mobile-first design works on all screen sizes |

---

## 🖼️ Screenshots

> _Add your screenshots here after deploying_

| Page | Preview |
|---|---|
| Homepage | `screenshot_home.png` |
| College Listing | `screenshot_colleges.png` |
| Compare Dashboard | `screenshot_compare.png` |
| Profile | `screenshot_profile.png` |

---

## 🏗️ Architecture

```
college-discovery-platform/
│
├── client/                          # Next.js 14 (App Router)
│   └── src/
│       ├── app/                     # Pages (layout, page, loading)
│       │   ├── colleges/[id]/       # Dynamic college detail
│       │   ├── compare/             # Smart compare dashboard
│       │   ├── saved/               # Protected saved list
│       │   ├── profile/             # User dashboard
│       │   ├── login/ register/     # Auth pages
│       ├── components/
│       │   ├── ui/                  # Button, Input, Badge, Spinner, EmptyState
│       │   ├── layout/              # Navbar (with dropdown), Footer
│       │   ├── colleges/            # CollegeCard, SearchBar, FilterSidebar
│       │   └── compare/             # CompareTable, CompareBar
│       ├── hooks/                   # useColleges, useAuth (React Query)
│       ├── services/                # Axios API clients (api.ts, auth, college, saved)
│       ├── store/                   # Zustand (authStore, compareStore) with persist
│       ├── types/                   # Shared TypeScript interfaces
│       └── styles/                  # globals.css (Inter font, dark theme)
│
├── server/                          # Express.js REST API
│   └── src/
│       ├── controllers/             # authController, collegeController, savedController, compareController
│       ├── routes/                  # auth, colleges, saved, compare
│       ├── middleware/              # auth (JWT), errorHandler, validate (Zod), schemas
│       ├── config/                  # db.ts (pg Pool)
│       ├── data/                    # initDb.ts (DDL), seed.ts (20 colleges)
│       ├── types/                   # Express augmentation, shared interfaces
│       └── utils/                   # jwt.ts (sign/verify)
│
└── README.md
```

### Key Architecture Decisions

- **No ORM** — raw `pg` queries for maximum control and transparency
- **Zustand + React Query** — Zustand for auth/compare UI state, React Query for all server state
- **JWT in Authorization header** — stateless, Vercel/Render-friendly
- **Zod validation on every write** — catches bad data at the API boundary before DB hits
- **`ON CONFLICT DO NOTHING`** — idempotent save/unsave operations
- **Optional auth on compare** — compare works for guests; history saved when logged in

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 App Router, React 18, TypeScript 5 |
| **Styling** | Tailwind CSS 3, custom design tokens (navy/blue/amber) |
| **State** | Zustand 4 (auth + compare stores), TanStack React Query v5 |
| **HTTP Client** | Axios with JWT interceptor |
| **Backend** | Node.js 20, Express 4, TypeScript |
| **Database** | PostgreSQL 16, `pg` (node-postgres) |
| **Auth** | JWT (jsonwebtoken), bcryptjs |
| **Validation** | Zod (server-side schemas) |
| **Animations** | Framer Motion |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL ≥ 14 running locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/college-discovery-platform.git
cd college-discovery-platform
```

### 2. Server setup

```bash
cd server
cp .env.example .env        # Edit with your DB credentials
npm install
npm run db:init             # Creates all tables
npm run seed                # Populates 20 colleges + 120 courses
npm run dev                 # Starts on http://localhost:5000
```

### 3. Client setup

```bash
cd client
cp .env.local.example .env.local   # Set NEXT_PUBLIC_API_URL
npm install
npm run dev                        # Starts on http://localhost:3000
```

---

## 🔑 Environment Variables

### `server/.env`

```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/college_db
JWT_SECRET=your_super_secret_jwt_key_at_least_32_chars
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### `client/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 📡 API Reference

### Auth

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | `{ name, email, password }` | Register user |
| `POST` | `/api/auth/login` | ❌ | `{ email, password }` | Login, returns JWT |
| `GET` | `/api/auth/me` | ✅ | — | Get current user |

### Colleges

| Method | Endpoint | Auth | Query Params | Description |
|---|---|---|---|---|
| `GET` | `/api/colleges` | ❌ | `search, state, type, course, minFees, maxFees, page, limit` | Paginated college list |
| `GET` | `/api/colleges/:id` | ❌ | — | College detail + courses |
| `GET` | `/api/colleges/states` | ❌ | — | All distinct states |

### Saved Colleges

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| `GET` | `/api/saved` | ✅ | — | Get saved colleges |
| `GET` | `/api/saved/ids` | ✅ | — | Get saved college IDs |
| `POST` | `/api/saved` | ✅ | `{ collegeId }` | Save a college |
| `DELETE` | `/api/saved/:collegeId` | ✅ | — | Unsave |

### Compare

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/api/compare` | Optional | `{ collegeIds: [1,2,3] }` | Compare 2–3 colleges |
| `GET` | `/api/compare/history` | ✅ | — | User's compare history |

### Error Responses

All errors return:
```json
{ "success": false, "error": "Human-readable message" }
```
Validation errors (422) include:
```json
{ "success": false, "error": "Validation failed", "details": [{ "field": "email", "message": "Invalid email address" }] }
```

---

## 🗃️ Database Schema

```sql
users            (id, name, email, password_hash, created_at)
colleges         (id, name, location, state, fees_min, fees_max, rating,
                  established, affiliation, type, placement_avg, placement_highest,
                  description, image_url, created_at)
courses          (id, college_id→colleges, name, duration, fees, seats)
saved_colleges   (id, user_id→users, college_id→colleges, created_at)  UNIQUE(user_id, college_id)
compare_history  (id, user_id→users, college_ids INTEGER[], created_at)
```

---

## 🚢 Deployment

### Frontend → Vercel

```bash
cd client
vercel --prod
# Add environment variable: NEXT_PUBLIC_API_URL=https://your-api.railway.app
```

### Backend → Railway / Render

- **Build command:** `npm run build`
- **Start command:** `npm start`
- Set all env vars in the dashboard
- Run once after first deploy:
  ```bash
  npm run db:init && npm run seed
  ```

---

## 🧪 Seed Data

The seed script (`server/src/data/seed.ts`) populates:
- **20 realistic Indian colleges**: IIT Bombay, IIT Delhi, IIT Madras, IIT Kanpur, IIT Kharagpur, NIT Trichy, NIT Warangal, NIT Surathkal, BITS Pilani, VIT Vellore, Manipal, SRM, Amity, Christ University, University of Delhi, University of Mumbai, Anna University, Jadavpur University, Thapar Institute, Symbiosis International University
- **120 courses** (6 per college): B.Tech CS, B.Tech ECE, B.Tech ME, B.Tech Civil, M.Tech CS, MBA

---

## 👨‍💻 Author

Built as part of a **Full Stack Developer Internship Demo Task (Track B)** — CollegeDiscover.
=======
# College-discovery-platform
A web-based platform that helps students explore and compare colleges with a user-friendly interface and structured data.
>>>>>>> 79c5f584ae1d4dc5d555eb76463815ef2de728f4
