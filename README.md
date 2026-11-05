<div align="center">

# Supun Yasantha — Developer Portfolio

A creative developer portfolio built with a cinematic design language, interactive 3D WebGL scenes, smooth scroll physics, and real-time APIs.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-f43f5e?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

[Live Demo](https://supunyasantha.vercel.app) • [Report Issue](https://github.com/supunyasanthaofficial/my-portfolio01/issues)

</div>

---

## ⚡ Tech Stack

### Core Framework & Architecture
* **[Next.js 16](https://nextjs.org/)** — App Router, Server Components, Turbopack, and Standalone output.
* **[React 19](https://react.dev/)** — Concurrent rendering, hooks, and modern component architecture.
* **[TypeScript 5](https://www.typescriptlang.org/)** — Strict type safety across components, props, and data schemas.
* **[Tailwind CSS v4](https://tailwindcss.com/)** — Modern utility-first CSS engine with `@theme inline` configuration.

### 3D Graphics & Animations
* **[Three.js](https://threejs.org/)** & **[@react-three/fiber](https://r3f.docs.pmnd.rs/)** — Declarative WebGL scenes and procedural star fields.
* **[@react-three/drei](https://github.com/pmndrs/drei)** — Orbit controls, HTML billboards, and camera helpers.
* **[Framer Motion 12](https://www.framer.com/motion/)** — GPU-accelerated motion values, spring physics, scroll-driven transforms, and micro-interactions.

### Integrations & Services
* **[Lanyard API (use-lanyard)](https://github.com/alistairkealy/use-lanyard)** — Real-time Discord presence & Spotify playback sync.
* **[Open-Meteo API](https://open-meteo.com/)** — Live weather status for Kandy, Sri Lanka.
* **[Resend](https://resend.com/)** — Server-side email delivery for the contact form via Next.js Route Handlers.
* **[@codesandbox/sandpack-react](https://sandpack.codesandbox.io/)** — In-browser interactive code editor and live preview sandbox.
* **[React GitHub Calendar](https://github.com/grubersjoe/react-github-calendar)** — Dynamic GitHub contribution activity graph.
* **[Lucide React](https://lucide.dev/)** — Clean, lightweight icon suite.

---

## ✨ Key Features

* **🌌 3D Hero Warp Tunnel Canvas:** Interactive Three.js star field with reactive mouse depth, shockwave rings on click, and scroll-linked warp speed.
* **🪐 3D Tech Universe Orbit:** Fibonacci sphere distribution of skill nodes with 360° interactive OrbitControls, hover states, and Category filtering.
* **🎵 Real-Time Spotify Status:** Live listening status, current song, artist, album artwork, and animated equalizer bars synced directly via Discord Lanyard.
* **🌤️ Live Clock & Weather Widget:** Synchronized Sri Lanka time (GMT+5:30) and live local weather condition indicators.
* **🃏 3D Scroll-Driven Project Spread & Flip:** Sequential 3D card spread and 180° rotation on scroll revealing deep project tech specs and links.
* **⚡ ⌘K Command Palette:** Keyboard-driven modal for instant section navigation, email copy, and external links.
* **🧪 In-Browser Code Playground:** Live interactive React sandbox powered by Sandpack with instantaneous hot reloading.
* **🎯 Performance-Optimized Custom Cursor & Spotlight:** GPU-tracked cursor trail and radial spotlight with zero React re-render penalties.
* **📬 Validated Contact System:** Server-side email dispatch with Resend and user feedback states.
* **🐞 404 Space Bug Hunter:** Interactive mini-game integrated directly into the custom 404 page.

---

## 📁 Project Structure

```text
my-portfolio01/
├── app/                        # Next.js App Router
│   ├── api/contact/route.ts    # Resend email Route Handler
│   ├── layout.tsx              # Root layout & font definitions
│   ├── page.tsx                # Main single-page portfolio
│   ├── not-found.tsx           # Custom 404 Bug Hunter mini-game
│   └── globals.css             # Tailwind 4 theme & custom utilities
├── components/                 # Reusable UI & WebGL Components
│   ├── HeroCanvas3D.tsx        # Three.js 3D warp tunnel canvas
│   ├── TechOrbit3D.tsx         # 3D Fibonacci tech skill sphere
│   ├── Skills.tsx              # Skill switcher (3D Orbit / Grid Cards)
│   ├── FeaturedProjects.tsx    # 3D scroll-spread project gallery
│   ├── ProjectCard.tsx         # 3D flip card component
│   ├── CommandPalette.tsx      # ⌘K search & quick-actions modal
│   ├── SpotifyCard.tsx         # Real-time Spotify listening card
│   ├── LocalTimeWeather.tsx    # Live clock & Open-Meteo weather badge
│   ├── CodePlayground.tsx      # Sandpack live code runner
│   ├── DevStory.tsx            # Scroll-linked journey timeline
│   ├── ContactForm.tsx         # Interactive contact form
│   ├── FilmIndicator.tsx       # Cinematic scroll-progress indicator
│   ├── SpotLight.tsx           # Optimized GPU ambient cursor glow
│   ├── Cursor.tsx              # Fluid spring-physics trailing cursor
│   ├── Navbar.tsx              # Glassmorphic floating navigation
│   └── Footer.tsx              # Minimalist terminal footer
├── data/                       # Centralized Content & Configurations
│   ├── projects.ts             # Featured projects data & metadata
│   ├── skills.ts               # Tech skill taxonomy & proficiency
│   ├── story.ts                # Timeline milestones
│   ├── navigation.ts           # Navbar routes & social links
│   └── site-config.ts          # Site info, coordinates & contact details
├── types/                      # Shared TypeScript Interfaces
│   └── index.ts                # Type definitions for projects, skills, etc.
└── images/                     # Project thumbnails and hero photography
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/supunyasanthaofficial/my-portfolio01.git
cd my-portfolio01
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Email service (Resend)
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your_email@domain.com

# Discord Lanyard Presence (Optional - has default fallback)
NEXT_PUBLIC_DISCORD_ID=your_discord_snowflake_id
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to preview the site.

---

## 🛠️ Verification & Build Commands

```bash
# Type check TypeScript without emit
npx tsc --noEmit

# Run ESLint
npm run lint

# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 👤 Author

**Supun Yasantha**
* Website: [supunyasantha.vercel.app](https://supunyasantha.vercel.app)
* GitHub: [@supunyasanthaofficial](https://github.com/supunyasanthaofficial)
* LinkedIn: [Supun Yasantha](https://www.linkedin.com/feed/)
* Email: [supun.yasantha@work.com](mailto:supun.yasantha@work.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
