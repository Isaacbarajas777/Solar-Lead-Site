# Solar Relief Consult — Lead-Gen Marketing Site

Next.js (App Router) + TypeScript + Tailwind CSS lead-generation site for homeowners who feel stuck in solar contracts.

**Compliant positioning only:** free consult / see if you may qualify / connect with specialists. This is a lead-gen site — not a law firm, and it does not promise cancellations, refunds, or outcomes.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Before you publish

Update placeholders in `src/config/site.ts`:

| Field | Placeholder | Notes |
|-------|-------------|--------|
| `brandName` | Solar Relief Consult | Your public brand |
| `phone` | (555) 000-0000 | Real support number |
| `email` | hello@example.com | Real inbox |
| `address` | `""` | Optional physical address |
| SEO title/description | Generic copy | Align with brand |

All UI contact/brand text reads from this config. Do not hardcode contact details elsewhere.

## Lead form & API

- Client form: `src/components/LeadForm.tsx` (name, phone, email, ZIP, optional finance type & message)
- Endpoint: `POST /api/leads` → validates → appends JSON lines to `data/leads.jsonl`
- `data/.gitkeep` keeps the folder in git; `data/leads.jsonl` is gitignored
- Production: point the API at a CRM/webhook if needed (see notes in `site.ts`)

## Project structure

```
src/
  app/           # layout, page, globals, api/leads
  components/    # Header, Hero, Problem, Process, FAQ, FinalCTA, Footer, LeadForm
  config/site.ts # brand, contact, SEO, disclaimer
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
- Do not claim money-back, refund, or cancellation guarantees
- Submitting the form is not legal advice and not a guarantee of any outcome
