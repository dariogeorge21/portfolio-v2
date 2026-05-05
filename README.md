# Dario George — Portfolio v2

A modern, animated personal portfolio built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Features smooth scroll animations, a particle field hero, custom cursor, and a responsive single-page layout.

## ✨ Features

- **Hero section** — full-viewport intro with parallax scroll, animated particle field, and staggered headline
- **Projects** — filterable project cards with live/repo links
- **About** — timeline and stats
- **Skills** — grouped skill bars with proficiency levels
- **Contact** — social links and an inline contact form
- **Custom cursor** with hover states
- **Scroll progress** indicator
- **Dark-first** design with a neon accent palette
- Deployed on **Vercel** with analytics

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| UI Primitives | Radix UI + shadcn/ui |
| Icons | Lucide React |
| Fonts | Sora (display) · Geist Mono |
| Deployment | Vercel |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm, pnpm, or yarn

### Install & run

```bash
# Install dependencies
pnpm install        # or npm install / yarn install

# Start the dev server
pnpm dev            # http://localhost:3000

# Build for production
pnpm build

# Start the production server
pnpm start
```

### Lint

```bash
pnpm lint
```

## 📁 Project Structure

```
portfolio-v2/
├── app/
│   ├── layout.tsx       # Root layout — metadata, fonts, analytics
│   └── page.tsx         # Single-page composition
├── components/
│   ├── hero.tsx         # Animated hero section
│   ├── navigation.tsx   # Top navigation bar
│   ├── projects.tsx     # Project cards grid
│   ├── about.tsx        # Timeline & stats
│   ├── skills.tsx       # Skill groups & progress bars
│   ├── contact.tsx      # Contact form & social links
│   ├── footer.tsx
│   ├── custom-cursor.tsx
│   ├── particle-field.tsx
│   ├── scroll-progress.tsx
│   └── ui/              # shadcn/ui primitives
├── lib/
│   ├── portfolio-data.ts  # Projects, skills, timeline data
│   └── utils.ts
├── hooks/
├── public/
├── styles/
├── next.config.mjs
├── tailwind.config
└── tsconfig.json
```

## ✏️ Customisation

All portfolio content — projects, skills, and timeline items — lives in a single data file:

```
lib/portfolio-data.ts
```

Edit the exported `projects`, `skillGroups`, `timeline`, and `stats` arrays to make the portfolio your own.

## 📬 Contact

| Platform | Handle |
|---|---|
| Email | edu.dariogeorge21@gmail.com |
| GitHub | [@dariogeorge21](https://github.com/dariogeorge21) |
| LinkedIn | [in/dariogeorge21](https://linkedin.com/in/dariogeorge21) |
| X (Twitter) | [@dariogeorge21](https://x.com/dariogeorge21) |
| LeetCode | [dariogeorge21](https://leetcode.com/dariogeorge21) |

## 📄 License

This project is personal and not licensed for redistribution. Feel free to use it as inspiration, but please don't copy it wholesale as your own portfolio.
