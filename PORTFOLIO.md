# AA Travel & Tours — Multi-Service Travel & Safari Platform

A production-grade, multilingual marketing and booking website for a Tanzania-based travel company offering safaris, air ticketing, corporate travel, and visa services.

**It ships as a static site.** The front end is authored in React + TypeScript and compiled by Vite into plain, pre-built HTML/CSS/JS (the `dist/` bundle) — there is **no Node runtime in production**. Those static files are deployed to ordinary PHP hosting, where a lightweight **PHP + PHPMailer** backend handles contact/booking form submissions. So while the *codebase* is React, the *deployed product* is a static SPA with a PHP mail handler.

> **Role:** Front-end developer & integrator — architecture, UI/UX, feature development, internationalization, static build, and PHP form/email backend.

---

## 🌍 Overview

AA Travel & Tours is a feature-dense travel platform that goes well beyond a typical brochure site. Alongside the standard service pages, it ships a suite of **interactive tools** — a multi-step safari planner, a wildlife spotting calendar, an eco/carbon calculator, 360° virtual tours, a photo gallery with lightbox, a gear guide, a currency converter, and a gamified exploration-badge system.

The entire experience is **localized into four languages** (English, French, Spanish, and Arabic with full RTL support) using a namespaced i18n architecture with 21 translation namespaces.

**Hosting model:** A **static, pre-built SPA** (Vite output) served from standard PHP hosting. Everything the visitor interacts with — routing, animations, calculators, language switching — runs **client-side in the browser**. The only server-side code is a small **PHP endpoint** that receives form submissions and sends booking emails via **PHPMailer (SMTP)**.

**Live focus:** Lead generation for a Tanzanian safari and travel operator, with multiple conversion paths (contact forms, WhatsApp, quote requests, and pre-filled inquiries from interactive tools).

---

## ✨ Key Features

### Core Site
- **Animated single-page experience** — route-level page transitions powered by Framer Motion `AnimatePresence` with fade/slide effects and smart scroll-to-top.
- **Service divisions** — dedicated pages for Safaris, Air Ticketing, Corporate Travel, Visa services, and an Explorer hub.
- **Lead capture** — contact form posts (via `fetch`) to a PHP endpoint (`/bookings.php`) that emails the inquiry through **PHPMailer/SMTP**, with graceful, UX-first fallback messaging and toast notifications.
- **Persistent engagement widgets** — floating WhatsApp button, cookie consent banner, and an exploration badge widget.

### Interactive Travel Tools
| Tool | Route | What it does |
|------|-------|--------------|
| **Safari Planner** | `/safari-planner` | Multi-step wizard: destination → duration → activities → budget → tailored recommendation that pre-fills an inquiry |
| **Wildlife Calendar** | `/wildlife-calendar` | Month-by-month, color-coded grid of the best wildlife-viewing windows (Great Migration, Big Five, birds, marine life) |
| **Eco Calculator** | `/eco-calculator` | Estimates a trip's carbon footprint with Recharts visualizations and offset guidance |
| **360° Virtual Tours** | `/virtual-tours` | Immersive panoramic image viewer with pan/zoom for key Tanzanian destinations |
| **Photo Gallery** | `/gallery` | Filterable masonry gallery with a full-screen lightbox |
| **Gear Guide** | `/gear` | Curated, safari-type-specific packing and gear recommendations |
| **Currency Converter** | global | Multi-currency display (USD, EUR, GBP, TZS) with an in-navbar selector |

### Engagement & Social Proof
- **Gamified badges** — users earn `Explorer`, `Adventurer`, and `Wildlife Expert` badges persisted in `localStorage`.
- **Social proof** — simulated live "recent bookings" ticker and animated trip counters.
- **Share buttons** — share safari packages to WhatsApp, Facebook, and X.
- **Virtual Concierge** — FAQ accordion covering visas, best seasons, packing, health & safety, and currency.
- **Instagram feed**, **airline partners** showcase, and **testimonials** sections.

### Internationalization (i18n)
- **4 languages**: English, French, Spanish, Arabic.
- **Full RTL** layout switching for Arabic (`dir="rtl"`).
- **21 namespaces** (`common`, `home`, `about`, `visa`, `wild`, `eco`, `explorer`, `contact`, `blog`, `air`, `footer`, `service`, and more) lazy-loaded over HTTP for fast initial paint.
- Automatic browser language detection with English fallback.

---

## 🛠 Tech Stack

> **At a glance:** Authored in React/TypeScript → compiled by Vite into a **static SPA** → served as plain files on PHP hosting → **PHP + PHPMailer** is the only runtime backend (form email).

**Front End (compiled to static assets)**
- **React 18** + **TypeScript** (strict typing across components)
- **Vite 7** with the SWC React plugin — builds to a static `dist/` bundle (no server runtime)
- **React Router 6** for client-side routing with lazy-loaded route bundles

**Backend (server-side)**
- **PHP** form handler (`bookings.php`) — receives the contact/booking submission
- **PHPMailer** — sends booking inquiry emails over SMTP

**Styling & UI**
- **Tailwind CSS 3** with the typography plugin and `tailwindcss-animate`
- **shadcn/ui** — 49 accessible, composable UI primitives built on **Radix UI**
- **Framer Motion** for page and element animations
- **lucide-react** iconography

**State, Data & Forms**
- **TanStack Query** for async/server state
- **React Hook Form** + **Zod** for typed, validated forms
- **Axios** for HTTP

**Internationalization**
- **i18next** + **react-i18next** + browser language detector + HTTP backend

**Specialized Libraries**
- **Recharts** — data visualizations (eco calculator)
- **jsPDF** + **jspdf-autotable** — client-side PDF generation
- **EmailJS** — email integration path
- **Embla Carousel**, **react-share**, **date-fns**, **next-themes**

**Tooling & Testing**
- **Vitest** + **Testing Library** + **jsdom** for unit/component tests
- **ESLint 9** with React Hooks and TypeScript rules

---

## 🏗 Architecture

```
src/                       # React/TS source (compiled — not deployed as-is)
├── App.tsx                # Router, providers, AnimatePresence, global widgets
├── main.tsx               # App bootstrap + i18n init
├── i18n.ts                # i18next config (21 namespaces, 4 languages)
├── pages/                 # 16 route-level pages (most lazy-loaded)
├── components/            # 31 feature components
│   └── ui/                # 49 shadcn/ui primitives
├── hooks/                 # use-mobile, use-toast, useTheme
└── lib/                   # utilities (cn, helpers)

public/
├── locales/{en,fr,es,ar}/ # 21 namespaced translation files per language
└── images/                # Curated travel/airline/wildlife photography

dist/                      # ← THE DEPLOYED ARTIFACT (static, pre-built)
├── index.html             # Single HTML entry
├── assets/                # Hashed, code-split JS/CSS chunks
├── locales/ · images/     # Copied static assets
└── _redirects             # SPA deep-link routing

bookings.php               # PHP form handler (the only server-side code)
PHPMailer-master/          # SMTP email library used by bookings.php
```

**Design decisions worth highlighting:**
- **Code-splitting:** Heavy interactive pages are `React.lazy`-loaded behind a `Suspense` spinner, keeping the initial bundle lean.
- **Provider composition:** A single, clean provider tree (`QueryClientProvider` → `TooltipProvider` → `BrowserRouter`) wraps the app with both `Toaster` (shadcn) and `Sonner` notification systems.
- **Animated routing:** `AnimatedRoutes` keys transitions off `location.pathname`, so every navigation animates in/out smoothly without flicker.
- **Path aliasing:** `@/` resolves to `src/` for clean, refactor-safe imports.
- **Graceful degradation:** Form submission always confirms success to the user even on network error — a deliberate UX choice for a lead-gen funnel.

---

## 📊 Project Scale

| Metric | Count |
|--------|-------|
| Route pages | 16 |
| Feature components | 31 |
| shadcn/ui primitives | 49 |
| Supported languages | 4 (incl. RTL) |
| i18n namespaces | 21 |
| Interactive tools | 7+ |

---

## 🚀 Running Locally

```sh
# Install dependencies
npm install

# Start the dev server (http://localhost:8080)
npm run dev

# Production build
npm run build

# Preview the production build
npm run preview

# Lint & test
npm run lint
npm run test
```

---

## 🌐 Deployment

The deployed product is the **static `dist/` bundle** plus the PHP form handler — hosted together on standard PHP web hosting (cPanel-style shared hosting / any PHP server):

1. **Build the static front end:** `npm run build` → outputs the pre-rendered `dist/` bundle.
2. **Upload** the contents of `dist/` to the web root.
3. **Upload** `bookings.php` and the `PHPMailer-master/` library alongside it so the contact form can send email.
4. **SPA routing:** the `_redirects` file (`/* /index.html 200`) keeps client-side deep links working.

> Because the front end is fully static, it can also run on any static host — but the form's email feature specifically requires the PHP backend on a PHP-capable server.

---

## 💡 Highlights for Reviewers

- **Breadth of interactive features** rarely seen in a marketing site — wizard flows, calculators, calendars, and 360° viewers, all client-side.
- **Production-grade i18n** with RTL support and a scalable namespace strategy.
- **Modern, accessible component system** via Radix-based shadcn/ui.
- **Performance-minded** code-splitting, lazy translation loading, and below-the-fold image loading.
- **Conversion-focused UX** — every tool funnels toward a contact/inquiry action.

---

*Authored in React + TypeScript + Tailwind CSS, shipped as a static Vite build with a PHP/PHPMailer form backend — with a focus on delightful, conversion-driven travel UX.*
