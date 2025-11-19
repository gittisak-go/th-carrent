<!-- Copilot / AI agent guidance for the th-carrent repo -->

# Copilot instructions — th-carrent

Purpose: short, actionable guidance so an AI coding agent can be immediately productive in this repo.

- Quick dev commands:

  - Install & run: `npm install` then `npm run dev` (runs `next dev --turbopack`).
  - Build: `npm run build` and serve: `npm run start`.
  - Lint: `npm run lint` (uses `next lint`).

- Big-picture architecture:

  - This is a Next.js 15 App Router project using `app/` (server components by default).
  - UI + routing: top-level routes live in `app/`. There are grouped route segments using `(dashboard)`, `admin`, and `customer` sub-folders.
  - Data & auth: Supabase is the primary backend. Client helper: `lib/supabase/client.ts` (uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`). Middleware that updates sessions is wired in the root `middleware.ts` (it calls `lib/supabase/middleware`).
  - Uploads & images: image upload flows use FilePond (`react-filepond`) under `app/(dashboard)/cars/new-car/upload_images/` and related pages.

- Key project conventions & patterns (explicit examples):

  - App Router + server actions: server-side actions appear as `action.ts` inside route folders (example: `app/(dashboard)/admin/new-car/action.ts`). Treat these as server code executed by Next actions.
  - Client vs Server components: files in `app/` are server components by default. Interactive modules or third-party browser-only libs are in `.jsx` or include a `"use client"` directive (see `app/components/DatePicker.jsx`).
  - Supabase client: use `createClient()` from `lib/supabase/client.ts` for browser usage; server helpers live in `lib/supabase/server.ts` and middleware helpers under `lib/supabase/middleware`.
  - Session handling: `middleware.ts` uses `updateSession(request)` to hydrate/auth requests — avoid breaking the matcher pattern there (static/image routes are excluded).
  - The root layout config (`app/layout.tsx`) sets fonts, `next-themes` (storageKey `elite_rentals_theme`), and global wrappers like `ToastContainer` and `SidebarDrawer` — prefer composing inside that layout for global UI.

- Important files to inspect when making changes:

  - Routes & UI: `app/` (browse subfolders to find page/layout/action files per route).
  - Supabase helpers: `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/middleware.ts`.
  - Middleware: `middleware.ts` (global matcher + session update).
  - Uploads: `app/(dashboard)/cars/new-car/upload_images/[car_id]/page.tsx` and `react-filepond` usage.
  - Styling: `app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs` and `daisyui` in `devDependencies`.
  - Configs: `next.config.mjs`, `supabase/config.toml`, `package.json` scripts.

- External integrations to be aware of:

  - Supabase for auth + DB (env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
  - Stripe (`stripe` package) — payments integration points near booking flows.
  - Cloudflare Turnstile (`react-turnstile`) — used in forms for bot protection.
  - Leaflet/react-leaflet for maps (`app/components/Map.tsx`).

- Coding/PR guidance for agents (practical, repo-specific):

  - Avoid committing credentials. Use the environment variables already referenced in `lib/supabase/client.ts`.
  - For new UI routes, follow the existing `app/(dashboard)/...` segmentation pattern and place server actions as `action.ts` within the route folder.
  - When modifying auth/session flows, update both `lib/supabase/*` helpers and `middleware.ts` matcher if routes change.
  - When adding client-side libraries that depend on the DOM (Leaflet, FilePond), add `"use client"` at the top of the component file and keep heavy browser-only code out of server components.

- Development helpers:

  - To disable the automatic auth redirects (allow public access to `/admin` and `/customer` during local scaffolding), set env var `DISABLE_AUTH=true` before starting the dev server. The middleware checks this flag in `lib/supabase/middleware.ts`.

- Localization & currency notes:

  - The project currently renders prices in USD in a few components (examples: `app/(dashboard)/customer/cars/FeaturedCarCard.tsx`, `app/(dashboard)/customer/cars/CarCard.tsx`). For Thai deployment we convert formatting to `Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })` and change unit labels to Thai (e.g., `ต่อวัน`).
  - Update site metadata and global copy in `app/layout.tsx` and `app/components/Footer.tsx` to match the local business name, address, and language.

- Nothing-to-guess notes (what an agent must not assume):

  - There are no dedicated test scripts in `package.json` — do not add test commands without the maintainer's consent.
  - The dev server uses Turbopack via `next dev --turbopack`, which may behave differently than Webpack; use the defined scripts.

- If something here is unclear or incomplete, tell me which area to expand (examples: sample `action.ts` PR checklist, upload handler walkthrough, or sample supabase auth flow).
