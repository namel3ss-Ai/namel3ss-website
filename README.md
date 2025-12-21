# namel3ss Landing Website

Landing website for [namel3ss](https://github.com/namel3ss-Ai/namel3ss) — an English-first DSL (domain-specific language) designed to build full-stack, AI-native applications by describing intent in structured English.

## About

This website showcases namel3ss, a revolutionary programming language that allows developers to build AI-native applications by writing in plain English. The site features interactive sections demonstrating the language's capabilities, including its syntax, runtime features, and documentation.

## Tech Stack

- **React** 18.3.1 — UI library
- **TypeScript** — Type safety
- **Vite** 6.3.5 — Build tool and dev server
- **Tailwind CSS** 4.1.12 — Utility-first CSS framework
- **Motion** (Framer Motion) 12.23.24 — Animation library
- **GSAP** 3.14.2 — Advanced animations and scroll triggers
- **React Router** 7.11.0 — Client-side routing

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The website will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

The production build will be output to the `dist` directory.

## Project Structure

```
├── public/              # Static assets
│   └── namel3ss_horizontal_logo.svg
├── src/
│   ├── app/
│   │   ├── components/  # React components
│   │   │   ├── Navigation.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HorizontalStorySection.tsx  # Language showcase
│   │   │   ├── OutcomesSection.tsx
│   │   │   ├── ScrollToCompileSection.tsx
│   │   │   ├── FinalSection.tsx
│   │   │   ├── DocumentationSection.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   └── ui/            # Reusable UI components
│   │   └── pages/
│   │       ├── LandingPage.tsx
│   │       └── DocumentationPage.tsx
│   ├── assets/         # Images and assets
│   ├── styles/         # Global styles and CSS
│   └── main.tsx        # Application entry point
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Key Features

- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Smooth Animations** — Scroll-triggered animations using GSAP and Motion
- **Interactive Sections** — Horizontal scroll sections showcasing language features
- **Documentation** — Comprehensive documentation section
- **Performance** — Optimized build with Vite

## Sections

1. **Hero Section** — Main introduction with call-to-action buttons
2. **Scroll to Compile** — Interactive demonstration of the language
3. **Language Section** — Horizontal scrolling showcase of Language, Runtime, and Memory features
4. **Outcomes Section** — What you can build with namel3ss
5. **Final Section** — Closing statement with navigation options
6. **Documentation Page** — Complete language documentation

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm install` — Install dependencies

## License

This project is part of the namel3ss ecosystem. See the main [namel3ss repository](https://github.com/namel3ss-Ai/namel3ss) for license information.

## Links

- **Main Repository**: [namel3ss-Ai/namel3ss](https://github.com/namel3ss-Ai/namel3ss)
- **Website Repository**: [namel3ss-Ai/namel3ss-website](https://github.com/namel3ss-Ai/namel3ss-website)
