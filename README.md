# Zylvexo — AI-Powered Digital Agency

A premium agency website built with Next.js 14, featuring an admin CMS, AI chatbot, and full-stack CRUD operations.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v3, Framer Motion
- **Database:** MongoDB + Mongoose
- **Auth:** JWT (jsonwebtoken + jose for Edge)
- **AI:** Groq SDK (llama-3.1-8b-instant)
- **Icons:** Lucide React

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/zylvexo` |
| `JWT_SECRET` | Min 32-char secret for JWT signing | `(see setup step 3)` |
| `ADMIN_USERNAME` | Admin panel username | `admin` |
| `ADMIN_PASSWORD` | Admin panel password | `your_secure_password` |
| `GROQ_API_KEY` | Groq API key for AI chatbot | `gsk_...` |
| `NEXT_PUBLIC_SITE_URL` | Site URL | `http://localhost:3000` |
| `NEXT_PUBLIC_AGENCY_NAME` | Agency display name | `Zylvexo` |

## Local Setup

```bash
git clone <repo-url>
cd zylvexo
npm install
cp .env.example .env.local
# Fill in environment variables (see checklist below)
npm run dev
```

## Admin Panel

- **URL:** `/admin/login`
- **Credentials:** Set via `ADMIN_USERNAME` and `ADMIN_PASSWORD` env vars
- **Features:** Projects CRUD, Team management, Testimonials, Leads inbox, Dashboard stats

## First-Time Setup Checklist

- [ ] Create a free MongoDB Atlas cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- [ ] Copy the connection string to `MONGODB_URI`
- [ ] Generate a JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Create a free Groq account at [console.groq.com](https://console.groq.com)
- [ ] Add the Groq API key to `GROQ_API_KEY`
- [ ] Set `ADMIN_USERNAME` and `ADMIN_PASSWORD`
- [ ] Run `npm run dev` and verify the site loads at `http://localhost:3000`
- [ ] Login at `/admin/login`
- [ ] Add your first project via the admin panel
- [ ] Test the AI chatbot on the homepage

## Deploy to Vercel

1. Push your repo to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from the table above
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain
5. Deploy

## Folder Structure

```
├── app/
│   ├── (site)/          # Public landing page
│   ├── admin/           # Admin panel (login, dashboard, CRUD)
│   └── api/             # API routes (auth, projects, team, testimonials, leads, chat, stats)
├── components/
│   ├── admin/           # Admin UI (sidebar, header, forms, toast, modals)
│   ├── sections/        # Landing page sections (hero, services, portfolio, etc.)
│   └── ui/              # Shared UI (skeleton, scroll-to-top)
├── lib/                 # Utilities (mongodb, auth, helpers)
├── models/              # Mongoose models (Project, TeamMember, Testimonial, Lead)
├── middleware.ts         # Admin route protection (JWT verification)
└── tailwind.config.ts   # Design system tokens
```
