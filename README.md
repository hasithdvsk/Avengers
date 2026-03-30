## Avengers Cinematic Archive

A high-contrast, graphic-novel inspired Avengers showcase built with Next.js App Router, Framer Motion, Lenis, and React Three Fiber.

## Stack

- Next.js (TypeScript, App Router, Server Components)
- Tailwind CSS v4
- shadcn-style UI primitives (Tabs)
- Framer Motion
- Lenis smooth scrolling
- Three.js via React Three Fiber + Drei
- Lucide icons

## Features

- Cinematic hero with a rotating 3D centerpiece + scanline/vignette overlays
- Responsive Avengers roster with bold outlined cards
- Hover-driven glow and slide-up identity reveal
- Shared-layout transition into an immersive lore modal
- Tabs for Origin Story, Strengths, and Weapons
- Custom animated cursor and kinetic smooth scroll

## Run locally

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```

Open `http://localhost:3000`.

## Key Files

- `constants/avengers.ts` — lore-rich Avengers data
- `components/hero/*` — hero section and Three.js canvas
- `components/roster/*` — interactive cards and detail modal
- `components/providers/*` — Lenis and custom cursor providers
