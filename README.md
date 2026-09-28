# Solar Relief Consult — Lead-Gen Marketing Site

Next.js (App Router) + TypeScript + Tailwind CSS lead-generation site for homeowners who feel stuck in solar contracts.

**Compliant positioning only:** free consult / see if you may qualify / connect with specialists (ES: consulta gratuita / ver si puede calificar / conectar con especialistas). This is a lead-gen site — not a law firm, and it does not promise cancellations, refunds, or outcomes.

## Quick start

```bash
npm install
npm run dev
```

### Preview English vs Spanish

| Language | URL |
|----------|-----|
| English  | [http://localhost:3000](http://localhost:3000) (`/`) |
| Spanish  | [http://localhost:3000/es](http://localhost:3000/es) (`/es`) |

Use the **EN / ES** toggle in the header to switch between locales.

```bash
npm run build
npm start
```

## Internationalization (i18n)

- Dictionaries: `src/i18n/en.ts`, `src/i18n/es.ts`
- Helper: `src/i18n/index.ts` (`getDictionary`, `localePath`)
- Shared UI: components accept `locale` + `dict` props via `LandingPage`
- Brand / phone / email still come **only** from `src/config/site.ts` (placeholders)

## Before you publish

Update placeholders in `src/config/site.ts`:

| Field | Placeholder | Notes |
|-------|-------------|--------|
| `brandName` | Solar Relief Consult | Your public brand |
| `phone` | (555) 000-0000 | Real support number |
| `email` | hello@example.com | Real inbox |
| `address` | `""` | Optional physical address |
| SEO title/description | Generic copy | Align with brand (EN metadata also in `src/i18n/en.ts`; ES in `es.ts`) |

All UI contact/brand text reads from this config. Do not hardcode contact details elsewhere.

## Lead form & API

- Client form: `src/components/LeadForm.tsx` (name, phone, email, ZIP, optional finance type & message)
- Endpoint: `POST /api/leads` → validates → appends JSON lines to `data/leads.jsonl`
- Optional `locale` field (`en` | `es`) is stored when submitted from either language version
- `data/.gitkeep` keeps the folder in git; `data/leads.jsonl` is gitignored
- Production: point the API at a CRM/webhook if needed (see notes in `site.ts`)

## Meta (Facebook) Pixel

The Meta Pixel is wired up but **disabled until a Pixel ID is provided**.

| Env var | Example | Notes |
|---------|---------|-------|
| `NEXT_PUBLIC_META_PIXEL_ID` | `123456789012345` | Meta Pixel (dataset) ID. If unset/empty, **nothing** pixel-related is rendered. |

- Base code: `src/components/MetaPixel.tsx`, loaded from `src/app/layout.tsx` on every page (EN + ES) via `next/script` (`afterInteractive`) + `<noscript>` image fallback.
- `PageView`: fired on first load by the snippet, and on client-side route changes (no duplicate on first load).
- `Lead`: fired only after a **successful** submit (`res.ok` + `success`) in the quiz (`content_name: "quiz"`) and the `/home` LeadForm (`content_name: "home_form"`), with `language` (`en`/`es`). No personal data is sent. Helper: `src/lib/metaPixel.ts`.
- `NEXT_PUBLIC_*` vars are inlined at **build time**: after setting/changing it on Vercel (Production), trigger a redeploy.

Local test:

```bash
NEXT_PUBLIC_META_PIXEL_ID=123456789 npm run build && npm start
```

## Project structure

```
src/
  app/           # layout, page (/), es/page (/es), api/leads
  components/    # Header, Hero, Problem, Process, FAQ, FinalCTA, Footer, LeadForm, LandingPage
  config/site.ts # brand, contact (placeholders)
  i18n/          # en.ts, es.ts, types, helpers
data/            # leads.jsonl (runtime)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Compliance reminder

- Do not invent success statistics
- Do not claim money-back, refund, or cancellation guarantees (no garantía de devolución)
- Do not mention Tradebloc / Tradebloc Inc
- Submitting the form is not legal advice and not a guarantee of any outcome
