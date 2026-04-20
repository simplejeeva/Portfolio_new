# Jeeva — World-Class AI Developer Portfolio

## Overview

A cinematic, dark-themed portfolio website for Jeeva, a Full Stack AI Developer. Built with Next.js 15 + Tailwind CSS, deployed on Vercel. The hero section features a cinematic photo treatment with floating tech panels and particle effects, inspired by the reference image.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion + CSS keyframes
- **Particles:** HTML Canvas (custom)
- **Deployment:** Vercel
- **Language:** TypeScript

## Color Palette

- **Background:** #0a0a1a (deep navy-black)
- **Primary accent:** #4A9EFF (blue)
- **Secondary accent:** #FF8C42 (orange/amber)
- **Text:** #FFFFFF (white), #94a3b8 (muted gray)
- **Glass panels:** rgba(255, 255, 255, 0.05) with backdrop-filter blur
- **Glow effects:** blue and orange box-shadows

## Typography

- **Headings:** Inter or Space Grotesk (bold, modern)
- **Body:** Inter (clean, readable)
- **Accent text:** Fira Code (for code snippets in floating panels)

## Sections

### 1. Navigation

- Fixed top nav, transparent on hero, solid dark on scroll
- Logo/name on left, nav links on right
- Hamburger menu on mobile
- Smooth scroll to sections
- Subtle blur background on scroll

### 2. Hero (Full Viewport)

**Photo Treatment:**
- Jeeva's photo centered, cropped from chest up
- Photo source: `public/images/jeeva.jpeg`
- CSS `mix-blend-mode: luminosity` with blue-tinted color overlay
- Gradient fade at bottom edge blending into background
- Vignette effect around edges using radial-gradient overlay

**Floating Tech Panels (6-8 panels):**
- Positioned absolutely around the photo
- Each panel: frosted glass background, 1px border with subtle glow
- Panels include:
  1. Mini animated line chart (AI model training metrics)
  2. Python/AI code snippet with syntax coloring
  3. Circular progress indicator (model accuracy %)
  4. Dashboard metrics card (neural network stats)
  5. Chat bubble UI (AI chatbot representation)
  6. Neural network node mini-diagram
  7. Terminal/console output snippet
  8. Checkmark/status indicators
- Each floats with unique CSS keyframe animation (different speed, direction, amplitude)
- Slight parallax on mouse move (optional, desktop only)

**Particle Canvas:**
- Full-screen HTML canvas behind all hero content
- Glowing dots (blue #4A9EFF and orange #FF8C42) slowly drifting
- Lines connect particles when within proximity (neural network feel)
- ~80 particles, subtle and performant

**Text:**
- Small caps "FULL STACK AI DEVELOPER" above name (letter-spacing: 0.3em)
- "Jeeva" — large bold heading (4-6rem), white
- "Full Stack AI Developer" — gradient text (blue to orange), 1.5-2rem
- One-liner tagline: "Building intelligent systems that transform ideas into reality"
- "Explore" CTA button with down-arrow icon, subtle pulse animation

### 3. About

- Dark background with subtle dot grid pattern
- Two-column layout: photo card (left) + text (right)
- Photo in rounded card with glowing blue border
- Text: 2-3 paragraphs about background, passion, goals
- Stats row below: "X+ Projects", "X+ Years", "X+ Technologies"
- Stats animate with count-up effect on scroll-into-view
- Framer Motion fade-in-up animations

### 4. Skills

- Section title with glowing underline accent
- Skills grouped: **AI/ML**, **Frontend**, **Backend**, **Tools & Cloud**
- Each skill: frosted glass card with icon + name + animated progress bar
- Hover: card lifts with blue glow shadow
- Cards stagger-animate on scroll
- Progress bars animate to fill on scroll-into-view

### 5. Projects

- Filter buttons at top: All, LLM, Computer Vision, ML, Automation
- 2-3 column grid (desktop), 1 column (mobile)
- Each card: thumbnail area, title, short description, tech tags
- Hover: scale up, overlay with "View Details" + "GitHub" links
- Click opens modal with full project details, screenshots, links
- Framer Motion layout animations for filtering

### 6. Experience

- Vertical timeline, alternating left-right (desktop), single column (mobile)
- Glowing blue gradient line connecting timeline nodes
- Each entry: frosted glass card with company, role, dates, bullet points
- Timeline nodes pulse-animate on scroll
- Framer Motion staggered entrance

### 7. Certifications

- Grid of certification cards (3 columns desktop, 2 tablet, 1 mobile)
- Each card: icon/logo area, cert name, issuing org, date
- Hover: light-sweep shine animation across card
- Frosted glass styling consistent with other sections

### 8. Contact

- Centered layout with contact form: name, email, message fields
- Form: frosted glass card, inputs glow blue on focus
- Social links row: GitHub, LinkedIn, Twitter/X, Email — icon buttons with hover glow
- Background: subtle particle effect (reuse hero canvas, lighter density)
- Heading: "Let's Build Something Amazing Together"
- Form submission: Next.js API route (or email service integration)

## Responsive Design

- **Desktop:** Full layouts, floating panels visible, timeline alternates
- **Tablet:** 2-column grids, simplified floating panels (fewer panels)
- **Mobile:** Single column, floating panels reduced to 3-4, stacked layouts, hamburger nav

## Performance

- Next.js Image optimization for photos
- Lazy load sections below the fold
- Canvas particles: requestAnimationFrame, reduce count on mobile
- Framer Motion: `whileInView` with `once: true` to avoid re-animation
- Font subsetting for fast load

## File Structure

```
Portfolio/
├── public/
│   └── images/
│       └── jeeva.jpeg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── FloatingPanels.tsx
│       ├── ParticleCanvas.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx
│       ├── Experience.tsx
│       ├── Certifications.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Placeholder Content

Since this is a portfolio, actual content (project details, experience, skills, certifications) will use placeholder data that Jeeva can replace with his real information. The structure and data types will be clear so it's easy to update.
