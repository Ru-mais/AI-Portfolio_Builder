# Portfi (AI Portfolio Builder) — Technical Documentation

## 1. Project Overview

**Portfi** is a high-performance web application designed for professionals to rapidly build, preview, and export customizable developer/designer portfolios.

### Key Value Proposition
- **Zero-Backend / Privacy-First Architecture**: All data entry, real-time previewing, and asset processing (such as image encoding) happen locally within the user's browser.
- **7 Luxury Architectural Templates**: Supports distinct design paradigms ranging from Swiss minimalism and Bento grids to interactive 3D WebGL particle canvases.
- **One-Click Static HTML Export**: Generates a self-contained, dependency-packaged single `.html` file that users can host anywhere (e.g., GitHub Pages, Netlify, Vercel, S3) with zero framework lock-in.

---

## 2. Technology Stack & Component Analysis

### A. Frontend Framework & Core Runtime
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | `16.2.4` | App Router architecture, server-rendered landing pages, dynamic client-side builder routes. |
| **React** | `19.2.4` | UI component tree, state management, and component lifecycle hooks. |
| **React DOM** | `19.2.4` | DOM rendering and portal mounting. |
| **TypeScript** | `^5.0.0` | End-to-end static typing, strict type definitions for template schemas and builder state. |
| **Node.js** | `>=20.0.0` | Build environment and compilation tooling. |

### B. Styling & Design System
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Tailwind CSS** | `^4.0.0` | Utility-first CSS engine using modern CSS `@theme` variables for dark luxury theme tokens. |
| **@tailwindcss/postcss** | `^4.0.0` | PostCSS compilation plugin for Tailwind CSS v4. |
| **tw-animate-css** | `^1.4.0` | Pre-configured CSS keyframe animations. |
| **@radix-ui/react-slot** | `^1.2.4` | Primitive for polymorphic component composition (e.g., `<Button asChild>`). |
| **class-variance-authority** | `^0.7.1` | Type-safe variant management for UI components (`cva`). |
| **clsx** & **tailwind-merge** | `^2.1.1` / `^3.5.0` | Dynamic class merging without specificity conflicts (`cn()` utility). |
| **Lucide React** | `^1.14.0` | Modern SVG iconography across the marketing site, builder controls, and templates. |
| **Sonner** | `^2.0.7` | Toast notifications (e.g., download confirmations). |
| **next-themes** | `^0.4.6` | Theme management foundation. |

### C. 3D Graphics & Animations
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Three.js** | `^0.184.0` | WebGL rendering engine for 3D backgrounds and particle meshes. |
| **@react-three/fiber** | `^9.6.1` | React renderer for Three.js scene graphs and render loops. |
| **@react-three/drei** | `^10.7.7` | Helper utilities for Three.js (e.g., `Points`, `PointMaterial`). |
| **Framer Motion** | `^12.38.0` | Layout transitions, hero section entrance animations, and multi-step builder transitions. |
| **Anime.js** | `^4.4.1` | High-performance staggered scroll reveal triggers and DOM transformations. |

### D. Data Validation & File Handling
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Zod** | `^4.4.3` | Schema validation library for form data structures. |
| **file-saver** | `^2.0.5` | Client-side blob download trigger for exported HTML files. |
| **jsPDF** | `^4.2.1` | Client-side multi-page A4 PDF document compiler and download manager. |
| **html-to-image** | `^1.11.13` | Modern SVG ForeignObject DOM rasterization engine with 100% native CSS Color 4 (`oklch`) support. |
| **HTML5 FileReader API** | Native | Converts user-uploaded project imagery into base64 data URLs in-memory. |

### E. Code Quality & Linting
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **ESLint** | `^9.0.0` | Static code analysis and error detection. |
| **eslint-config-next** | `16.2.4` | Next.js ruleset (Core Web Vitals, React Hooks checks). |

---

## 3. Specific Technology Clarifications

### Is Redis Used?
> **No.** Redis is **not used** anywhere in this project.
- There are no Redis client libraries installed (such as `ioredis`, `redis`, or `@upstash/redis`).
- Because Portfi operates entirely client-side without a persistent server cache or session store, Redis is unnecessary.

### Is CI/CD Included?
> **Partially (Vercel CD, but no standalone CI/CD pipeline).**
- **No standalone CI/CD workflows:** The repository does **not** contain custom pipeline definitions (e.g., no `.github/workflows/` directory for GitHub Actions, no GitLab CI, no CircleCI).
- **Automated Vercel Deployment:** The codebase is configured and optimized for **Vercel Git Integration**. Pushes to `main` trigger automated builds and production deployments on Vercel. Recent commits explicitly target Vercel (`optimize for vercel deployment`, `fix: wrap builder in suspense for vercel`).

### Database & Authentication Status (.env remnants)
The root `.env` file lists:
- `DATABASE_URL` (PostgreSQL)
- `NEXTAUTH_SECRET` & `NEXTAUTH_URL`
- `CLOUDINARY_*` keys

**Important Context:** In earlier prototype commits, the application included Prisma, NextAuth, and API routes. These were removed in commit `4a41101` in favor of a lean, zero-backend, client-side static generator. Consequently:
- **No active database connection** is maintained or required.
- **No authentication system** is currently active.
- **No external cloud storage (Cloudinary)** is required for export; images are handled via base64 encoding directly in the browser.

---

## 4. Architectural Templates

The application supports 7 pre-built design systems:
1. **Classic Minimal (`minimal`)**: Swiss-inspired split-screen design emphasizing typography and whitespace.
2. **Glass Studio (`glass`)**: Glassmorphism with backdrop filters and translucent cards.
3. **The Bento Suite (`bento`)**: iOS-inspired modular dashboard grid.
4. **Midnight Cyber (`cyber`)**: High-tech HUD terminal interface with monospace aesthetics and cyber grids.
5. **Aurora Liquid (`aurora`)**: Fluid monolith layout with liquid entrance animations.
6. **Neo Brutalist (`neo`)**: High-contrast layout with bold black borders and drop shadows.
7. **Dimension 3D (`dimension`)**: Interactive 3D WebGL particle space rendered using Three.js / React Three Fiber.

---

## 5. Export Mechanism

Portfi features a comprehensive **Hybrid Export Suite** supporting both PDF formats and standalone web deployment:

### A. Direct PDF Download (`.pdf`)
- Powered by `utils/pdf-exporter.ts` using `html-to-image` and `jsPDF`.
- Uses native browser SVG ForeignObject rendering, providing full native compatibility with Tailwind v4's modern CSS Color 4 functions (`oklch`).
- Automatically reveals all off-screen staggered animations (`.stagger-item`) and filters out WebGL canvases.
- Slices the rendered 1440px layout into precise multi-page A4 sheets (210mm × 297mm) with background continuity and triggers a direct browser download (`<user_name>_portfolio.pdf`).

### B. High-Fidelity Vector Print-to-PDF (`Save as PDF`)
- Launches the browser's native print-to-PDF engine via an isolated sandbox iframe.
- Injects specialized `@media print` rules (custom A4 margins, `print-color-adjust: exact`, section page-break avoidance, and visible animation states).
- Produces 100% vector-sharp typography, selectable text, and active clickable hyperlinks (LinkedIn, GitHub, Email, Twitter).

### C. Standalone Static HTML Website (`.html`)
- Compiles form state and selected theme tokens into a single self-contained HTML5 file via `utils/template-generator.ts`.
- Includes embedded Tailwind CSS, Google Fonts, Three.js 3D particles, and Anime.js scroll reveals.
- Features an embedded floating `"Save as PDF"` action button (`.no-print`) allowing recipients to also save the portfolio as PDF anytime.
- Downloads via `file-saver` as `<user_name>_portfolio.html`.

---

## 6. Directory Structure

```
├── app/
│   ├── builder/page.tsx       # Multi-step portfolio editor, live preview & export modal
│   ├── templates/page.tsx     # Template gallery & selection page
│   ├── globals.css            # Tailwind CSS v4 variables & luxury theme styles
│   ├── layout.tsx             # Root layout with Google font links
│   └── page.tsx               # Marketing landing page
├── components/
│   ├── portfolio-renderer.tsx # Real-time interactive portfolio renderer (includes 3D canvas)
│   └── ui/                    # Reusable UI primitives (Button, Logo)
├── lib/
│   └── utils.ts               # Utility functions (cn class combiner)
├── utils/
│   ├── pdf-exporter.ts        # Direct A4 PDF compiler & Vector print-to-PDF engine
│   └── template-generator.ts  # HTML generation engine with @media print styles
├── next.config.ts             # Next.js configuration
├── package.json               # Project dependencies and npm scripts
└── tsconfig.json              # TypeScript compilation settings
```
