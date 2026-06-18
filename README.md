# Topnotch Tech Innovations

The official marketing and e-learning website for **Topnotch Tech Innovations Ltd**, a Nigerian digital agency empowering startups and SMEs across Africa with digital marketing, software development, branding, and online learning.

Built by **Alfred Ayilara Pur** for Topnotch Tech.

## Tech Stack

- **Framework:** Next.js 14 (App Router, `src/` directory)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **Forms:** react-hook-form
- **Package manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run ESLint |

## Project Structure

```
src/
  app/
    (site)/          Marketing pages — Home, About, Services, Contact, Blog, Case Studies
                      (share the main Navbar/Footer via (site)/layout.tsx)
    e-learning/       E-Learning platform pages (its own Navbar/Footer via e-learning/layout.tsx)
    api/contact/      Contact form submission endpoint
  components/
    layout/           Main site Navbar & Footer
    elearning/         E-Learning Navbar, Footer, and page sections
    home/, about/, services/, contact/, blog/, case-studies/
                      Page-specific section components
    ui/               Shared, reusable components (CTABanner, FAQAccordion, TestimonialsGrid, AnimatedCounter)
  lib/                Shared data (case studies, blog posts) and utilities (cn helper)
  styles/             Framer Motion animation variants
  hooks/              Custom hooks (useCountUp)
```

## Brand Tokens

| Token | Value | Usage |
| --- | --- | --- |
| `brand-navy` | `#0A1628` | Dark sections, footer |
| `brand-blue` | `#1B3F8B` | Headings, primary brand color |
| `brand-orange` | `#F4622A` | CTAs, accents |
| `brand-light` | `#F5F7FA` | Alternating section backgrounds |
| `brand-muted` | `#6B7280` | Body/supporting text |

## Notes

- Image and logo paths (`/images/...`, `/logo/...`) are placeholders — drop real assets into `public/` at the matching paths.
- Case study and blog content lives in `src/lib/case-studies.ts` and `src/lib/blog.ts`; both the homepage previews and detail pages read from these single sources of truth.

---

© 2026 Topnotch Tech Innovations Ltd. All rights reserved.
