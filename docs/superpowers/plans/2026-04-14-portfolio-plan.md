# Jeeva Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, dark-themed AI developer portfolio with floating tech panels, particle effects, and smooth scroll animations.

**Architecture:** Next.js 15 App Router with Tailwind CSS 4. Single-page layout with section components. Canvas-based particle system in the hero, CSS keyframe floating panels, Framer Motion scroll animations for all other sections. Placeholder data in a central `data.ts` file for easy content updates.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Framer Motion, HTML Canvas

**Note:** No git operations. All work is local file changes only.

---

## File Structure

```
Portfolio/
├── public/
│   └── images/
│       └── jeeva.jpeg          # User's photo (copy from Downloads)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, metadata, body wrapper
│   │   ├── page.tsx            # Main page composing all sections
│   │   └── globals.css         # Tailwind imports + custom CSS keyframes + glass utilities
│   ├── components/
│   │   ├── Navbar.tsx          # Fixed nav, transparent->solid on scroll
│   │   ├── Hero.tsx            # Hero section: photo + text + CTA
│   │   ├── FloatingPanels.tsx  # 8 animated tech panels around hero photo
│   │   ├── ParticleCanvas.tsx  # Canvas particle system (neural network effect)
│   │   ├── About.tsx           # About section with photo + stats
│   │   ├── Skills.tsx          # Skills grid with progress bars
│   │   ├── Projects.tsx        # Project cards with filter
│   │   ├── Experience.tsx      # Timeline layout
│   │   ├── Certifications.tsx  # Cert cards grid
│   │   ├── Contact.tsx         # Contact form + social links
│   │   └── Footer.tsx          # Simple footer
│   └── data/
│       └── portfolio-data.ts   # All placeholder content in one file
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

### Task 1: Project Scaffolding & Configuration

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Copy: `public/images/jeeva.jpeg`

- [ ] **Step 1: Initialize Next.js project**

Run:
```bash
cd "C:/Users/jeeva/OneDrive/Desktop/Portfolio"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Select defaults when prompted. This creates the full Next.js 15 scaffold.

- [ ] **Step 2: Install dependencies**

Run:
```bash
cd "C:/Users/jeeva/OneDrive/Desktop/Portfolio"
npm install framer-motion
```

- [ ] **Step 3: Copy user's photo to public directory**

Run:
```bash
mkdir -p "C:/Users/jeeva/OneDrive/Desktop/Portfolio/public/images"
cp "C:/Users/jeeva/Downloads/jeeva .jpeg" "C:/Users/jeeva/OneDrive/Desktop/Portfolio/public/images/jeeva.jpeg"
```

- [ ] **Step 4: Set up globals.css with custom styles**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-navy: #0a0a1a;
  --color-navy-light: #0f1029;
  --color-accent-blue: #4A9EFF;
  --color-accent-orange: #FF8C42;
  --color-glass: rgba(255, 255, 255, 0.05);
  --color-glass-border: rgba(255, 255, 255, 0.1);
  --color-muted: #94a3b8;
  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "Fira Code", monospace;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-navy);
  color: white;
  font-family: var(--font-body);
}

/* Glass panel utility */
.glass {
  background: var(--color-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-glass-border);
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glow effects */
.glow-blue {
  box-shadow: 0 0 20px rgba(74, 158, 255, 0.3), 0 0 60px rgba(74, 158, 255, 0.1);
}

.glow-orange {
  box-shadow: 0 0 20px rgba(255, 140, 66, 0.3), 0 0 60px rgba(255, 140, 66, 0.1);
}

/* Floating panel animations */
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, -15px) rotate(1deg); }
  50% { transform: translate(-5px, -25px) rotate(-1deg); }
  75% { transform: translate(-15px, -10px) rotate(0.5deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-12px, -20px) rotate(-1.5deg); }
  66% { transform: translate(8px, -10px) rotate(1deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, -18px); }
}

@keyframes float-4 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  40% { transform: translate(-10px, -22px) rotate(2deg); }
  80% { transform: translate(12px, -8px) rotate(-1deg); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 200%; }
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}

.animate-float-1 { animation: float-1 8s ease-in-out infinite; }
.animate-float-2 { animation: float-2 10s ease-in-out infinite; }
.animate-float-3 { animation: float-3 7s ease-in-out infinite; }
.animate-float-4 { animation: float-4 9s ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }

/* Dot grid background */
.dot-grid {
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Scrollbar styling */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-navy); }
::-webkit-scrollbar-thumb { background: var(--color-accent-blue); border-radius: 3px; }
```

- [ ] **Step 5: Set up layout.tsx with fonts**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter, Space_Grotesk, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Jeeva | Full Stack AI Developer",
  description: "Building intelligent systems that transform ideas into reality. Portfolio of Jeeva — Full Stack AI Developer specializing in LLMs, Computer Vision, and ML.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Create placeholder page.tsx**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <h1 className="text-4xl text-white text-center pt-20">Portfolio Loading...</h1>
    </main>
  );
}
```

- [ ] **Step 7: Verify dev server starts**

Run:
```bash
cd "C:/Users/jeeva/OneDrive/Desktop/Portfolio"
npm run dev
```

Expected: Server starts on localhost:3000, page shows "Portfolio Loading..."

---

### Task 2: Portfolio Data File

**Files:**
- Create: `src/data/portfolio-data.ts`

- [ ] **Step 1: Create data file with all placeholder content**

Create `src/data/portfolio-data.ts`:

```ts
export const personalInfo = {
  name: "Jeeva",
  title: "Full Stack AI Developer",
  tagline: "Building intelligent systems that transform ideas into reality",
  email: "jeeva@example.com",
  github: "https://github.com/jeeva",
  linkedin: "https://linkedin.com/in/jeeva",
  twitter: "https://twitter.com/jeeva",
};

export const aboutText = [
  "I'm a Full Stack AI Developer passionate about building intelligent systems that solve real-world problems. With expertise spanning from deep learning models to production-ready web applications, I bridge the gap between cutting-edge AI research and practical software engineering.",
  "My work focuses on Large Language Models, Computer Vision, and Machine Learning pipelines. I love taking complex AI concepts and turning them into elegant, user-friendly applications that make a real impact.",
  "When I'm not training models or writing code, I'm exploring the latest breakthroughs in AI and contributing to open-source projects that push the boundaries of what's possible.",
];

export const stats = [
  { label: "Projects Completed", value: 15 },
  { label: "Years Experience", value: 3 },
  { label: "Technologies", value: 20 },
];

export const skillCategories = [
  {
    title: "AI / ML",
    skills: [
      { name: "Python", level: 90 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "LangChain", level: 85 },
      { name: "OpenAI API", level: 90 },
      { name: "Hugging Face", level: 75 },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "FastAPI", level: 85 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
    ],
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Git", level: 85 },
      { name: "Linux", level: 80 },
    ],
  },
];

export const projects = [
  {
    title: "AI Chat Assistant",
    description: "A RAG-powered chatbot using LangChain and OpenAI GPT-4 with custom knowledge base integration. Features semantic search, conversation memory, and streaming responses.",
    tags: ["LangChain", "OpenAI", "FastAPI", "React"],
    category: "LLM",
    github: "#",
    demo: "#",
  },
  {
    title: "Object Detection System",
    description: "Real-time object detection and tracking system using YOLOv8 with custom-trained models for industrial inspection. Achieves 95%+ accuracy on production data.",
    tags: ["YOLOv8", "OpenCV", "Python", "TensorFlow"],
    category: "Computer Vision",
    github: "#",
    demo: "#",
  },
  {
    title: "Predictive Analytics Dashboard",
    description: "End-to-end ML pipeline for sales forecasting with interactive visualization dashboard. Uses time-series models and automated retraining.",
    tags: ["scikit-learn", "Pandas", "Streamlit", "PostgreSQL"],
    category: "ML",
    github: "#",
    demo: "#",
  },
  {
    title: "AI Code Review Agent",
    description: "Autonomous agent that reviews pull requests, identifies bugs, suggests improvements, and generates test cases using Claude API.",
    tags: ["Claude API", "GitHub API", "Python", "TypeScript"],
    category: "LLM",
    github: "#",
    demo: "#",
  },
  {
    title: "Document Intelligence Platform",
    description: "OCR and NLP pipeline that extracts structured data from unstructured documents. Supports invoices, contracts, and forms with 98% extraction accuracy.",
    tags: ["Tesseract", "spaCy", "FastAPI", "React"],
    category: "Computer Vision",
    github: "#",
    demo: "#",
  },
  {
    title: "ML Model Monitoring System",
    description: "Automated monitoring for deployed ML models tracking drift, performance degradation, and data quality. Alerts and auto-retraining pipeline.",
    tags: ["MLflow", "Grafana", "Docker", "Python"],
    category: "ML",
    github: "#",
    demo: "#",
  },
];

export const experiences = [
  {
    company: "Tech Company",
    role: "AI Developer",
    period: "2023 - Present",
    points: [
      "Built and deployed LLM-powered applications serving 10K+ users",
      "Developed computer vision pipelines for automated quality inspection",
      "Led migration from monolithic ML pipeline to microservices architecture",
    ],
  },
  {
    company: "Startup Inc",
    role: "ML Engineer",
    period: "2022 - 2023",
    points: [
      "Designed and implemented NLP models for document understanding",
      "Created automated data pipelines processing 1M+ records daily",
      "Improved model inference speed by 3x through optimization",
    ],
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2021 - 2022",
    points: [
      "Built custom web applications for 10+ clients",
      "Integrated AI features into existing products",
      "Developed REST APIs and database architectures",
    ],
  },
];

export const certifications = [
  {
    name: "AWS Certified Machine Learning",
    issuer: "Amazon Web Services",
    date: "2024",
  },
  {
    name: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2023",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "Coursera (Andrew Ng)",
    date: "2023",
  },
  {
    name: "Full Stack Web Development",
    issuer: "freeCodeCamp",
    date: "2022",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
```

---

### Task 3: Particle Canvas Component

**Files:**
- Create: `src/components/ParticleCanvas.tsx`

- [ ] **Step 1: Create the particle canvas component**

Create `src/components/ParticleCanvas.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const colors = ["#4A9EFF", "#FF8C42", "#4A9EFF", "#4A9EFF"];
    const maxDistance = 150;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function createParticles() {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 40 : 80;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = p.color;
        ctx!.globalAlpha = p.alpha;
        ctx!.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = particles[i].color;
            ctx!.globalAlpha = 0.1 * (1 - dist / maxDistance);
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      ctx!.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    animate();

    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

---

### Task 4: Floating Tech Panels Component

**Files:**
- Create: `src/components/FloatingPanels.tsx`

- [ ] **Step 1: Create the floating panels component**

Create `src/components/FloatingPanels.tsx`:

```tsx
"use client";

export default function FloatingPanels() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {/* Panel 1: Mini Line Chart */}
      <div className="glass rounded-lg p-3 absolute top-[10%] left-[5%] w-44 animate-float-1 opacity-70 hidden md:block">
        <div className="text-[10px] text-muted mb-1 font-mono">Model Training Loss</div>
        <svg viewBox="0 0 120 40" className="w-full h-8">
          <polyline
            points="0,35 15,30 30,25 45,28 60,18 75,15 90,10 105,12 120,5"
            fill="none"
            stroke="#4A9EFF"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ strokeDasharray: 200, strokeDashoffset: 200, animation: "draw-line 3s ease forwards" }}
          />
        </svg>
      </div>

      {/* Panel 2: Code Snippet */}
      <div className="glass rounded-lg p-3 absolute top-[8%] right-[5%] w-52 animate-float-2 opacity-70 hidden md:block">
        <div className="text-[10px] text-muted mb-1 font-mono">ai_agent.py</div>
        <pre className="text-[9px] font-mono leading-relaxed">
          <span className="text-purple-400">def</span>{" "}
          <span className="text-accent-blue">predict</span>(self, x):
          {"\n"}  output = self.<span className="text-accent-orange">model</span>(x)
          {"\n"}  <span className="text-purple-400">return</span> output.<span className="text-accent-blue">argmax</span>()
        </pre>
      </div>

      {/* Panel 3: Accuracy Circle */}
      <div className="glass rounded-lg p-3 absolute top-[35%] left-[2%] w-28 animate-float-3 opacity-60 hidden lg:block">
        <div className="text-[10px] text-muted mb-1 text-center font-mono">Accuracy</div>
        <div className="relative w-14 h-14 mx-auto">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15" fill="none" stroke="#4A9EFF" strokeWidth="3"
              strokeDasharray="94.2" strokeDashoffset="9.42"
              strokeLinecap="round"
              style={{ animation: "draw-line 2s ease forwards" }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-accent-blue">97%</span>
        </div>
      </div>

      {/* Panel 4: Neural Network Stats */}
      <div className="glass rounded-lg p-3 absolute top-[40%] right-[3%] w-40 animate-float-4 opacity-60 hidden lg:block">
        <div className="text-[10px] text-muted mb-2 font-mono">Neural Network</div>
        <div className="space-y-1">
          <div className="flex justify-between text-[9px]">
            <span className="text-muted">Layers</span>
            <span className="text-accent-blue">12</span>
          </div>
          <div className="flex justify-between text-[9px]">
            <span className="text-muted">Parameters</span>
            <span className="text-accent-orange">1.2B</span>
          </div>
          <div className="flex justify-between text-[9px]">
            <span className="text-muted">Tokens/s</span>
            <span className="text-accent-blue">847</span>
          </div>
        </div>
      </div>

      {/* Panel 5: Chat Bubble */}
      <div className="glass rounded-lg p-3 absolute bottom-[25%] left-[8%] w-48 animate-float-2 opacity-50 hidden md:block">
        <div className="text-[10px] text-muted mb-1 font-mono">AI Assistant</div>
        <div className="bg-accent-blue/10 rounded-lg p-2 text-[9px] text-accent-blue">
          Analyzing your data...
        </div>
        <div className="bg-white/5 rounded-lg p-2 text-[9px] text-muted mt-1">
          Found 3 insights in dataset
        </div>
      </div>

      {/* Panel 6: Terminal Output */}
      <div className="glass rounded-lg p-3 absolute bottom-[20%] right-[6%] w-52 animate-float-1 opacity-50 hidden md:block">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[9px] text-muted ml-1 font-mono">terminal</span>
        </div>
        <pre className="text-[9px] font-mono leading-relaxed text-green-400">
          $ python train.py{"\n"}
          <span className="text-muted">Epoch 50/50 ━━━ 100%</span>{"\n"}
          <span className="text-accent-blue">✓ Model saved</span>
        </pre>
      </div>

      {/* Panel 7: Checkmarks */}
      <div className="glass rounded-lg p-2 absolute top-[20%] left-[20%] w-32 animate-float-4 opacity-40 hidden xl:block">
        <div className="space-y-1 text-[9px]">
          <div className="flex items-center gap-1.5">
            <span className="text-green-400">✓</span> <span className="text-muted">Data Pipeline</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-green-400">✓</span> <span className="text-muted">Model Trained</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-accent-orange animate-pulse-glow">●</span> <span className="text-muted">Deploying...</span>
          </div>
        </div>
      </div>

      {/* Panel 8: Mini graph nodes */}
      <div className="glass rounded-lg p-3 absolute bottom-[35%] left-[25%] w-24 animate-float-3 opacity-40 hidden xl:block">
        <svg viewBox="0 0 60 40" className="w-full h-8">
          <circle cx="10" cy="10" r="3" fill="#4A9EFF" opacity="0.8" />
          <circle cx="30" cy="5" r="3" fill="#FF8C42" opacity="0.8" />
          <circle cx="50" cy="12" r="3" fill="#4A9EFF" opacity="0.8" />
          <circle cx="20" cy="30" r="3" fill="#FF8C42" opacity="0.8" />
          <circle cx="40" cy="35" r="3" fill="#4A9EFF" opacity="0.8" />
          <line x1="10" y1="10" x2="30" y2="5" stroke="#4A9EFF" strokeWidth="0.5" opacity="0.4" />
          <line x1="30" y1="5" x2="50" y2="12" stroke="#FF8C42" strokeWidth="0.5" opacity="0.4" />
          <line x1="10" y1="10" x2="20" y2="30" stroke="#4A9EFF" strokeWidth="0.5" opacity="0.4" />
          <line x1="50" y1="12" x2="40" y2="35" stroke="#FF8C42" strokeWidth="0.5" opacity="0.4" />
          <line x1="20" y1="30" x2="40" y2="35" stroke="#4A9EFF" strokeWidth="0.5" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
```

---

### Task 5: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`

- [ ] **Step 1: Create the hero component**

Create `src/components/Hero.tsx`:

```tsx
"use client";

import Image from "next/image";
import ParticleCanvas from "./ParticleCanvas";
import FloatingPanels from "./FloatingPanels";
import { personalInfo } from "@/data/portfolio-data";

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Particle background */}
      <ParticleCanvas />

      {/* Floating tech panels */}
      <FloatingPanels />

      {/* Photo with cinematic treatment */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
        <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[550px] lg:w-[450px] lg:h-[600px]">
          <Image
            src="/images/jeeva.jpeg"
            alt={personalInfo.name}
            fill
            className="object-cover object-top"
            style={{
              maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              mixBlendMode: "luminosity",
            }}
            priority
          />
          {/* Blue tint overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(74,158,255,0.15) 0%, rgba(10,10,26,0.8) 80%, rgba(10,10,26,1) 100%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,26,0.8) 70%, rgba(10,10,26,1) 100%)",
          zIndex: 3,
        }}
      />

      {/* Text content */}
      <div className="relative z-10 text-center px-4" style={{ zIndex: 4 }}>
        <p className="text-[10px] md:text-xs tracking-[0.3em] text-accent-blue uppercase mb-4 font-mono">
          Full Stack AI Developer
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading mb-4 text-white">
          {personalInfo.name}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl gradient-text font-semibold mb-6">
          {personalInfo.title}
        </p>
        <p className="text-sm md:text-base text-muted max-w-xl mx-auto mb-10">
          {personalInfo.tagline}
        </p>
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-2 text-accent-blue hover:text-accent-orange transition-colors duration-300"
        >
          <span className="text-sm tracking-wider">Explore</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
```

---

### Task 6: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Create the navbar component**

Create `src/components/Navbar.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { navLinks, personalInfo } from "@/data/portfolio-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/80 backdrop-blur-md border-b border-glass-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#hero" className="text-xl font-bold font-heading gradient-text">
            {personalInfo.name}
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy/95 backdrop-blur-md border-t border-glass-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm text-muted hover:text-white transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

---

### Task 7: About Section

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Create the about component**

Create `src/components/About.tsx`:

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { aboutText, stats, personalInfo } from "@/data/portfolio-data";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {value}+
        </motion.span>
      ) : "0"}
    </motion.span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 px-4 dot-grid">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About <span className="gradient-text">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden glow-blue">
              <Image
                src="/images/jeeva.jpeg"
                alt={personalInfo.name}
                fill
                className="object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {aboutText.map((paragraph, i) => (
              <p key={i} className="text-muted leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <CountUp value={stat.value} />
              </div>
              <div className="text-xs md:text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 8: Skills Section

**Files:**
- Create: `src/components/Skills.tsx`

- [ ] **Step 1: Create the skills component**

Create `src/components/Skills.tsx`:

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/data/portfolio-data";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white">{name}</span>
        <span className="text-muted">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #4A9EFF, #FF8C42)" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="gradient-text">Skills</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="glass rounded-xl p-6 hover:glow-blue transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold font-heading mb-6 gradient-text">
                {category.title}
              </h3>
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={skillIndex * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Projects Section

**Files:**
- Create: `src/components/Projects.tsx`

- [ ] **Step 1: Create the projects component**

Create `src/components/Projects.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/portfolio-data";

const categories = ["All", "LLM", "Computer Vision", "ML"];

export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 px-4 dot-grid">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="gradient-text">Projects</span>
        </motion.h2>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                active === cat
                  ? "bg-accent-blue text-white glow-blue"
                  : "glass text-muted hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-xl overflow-hidden group hover:glow-blue transition-all duration-300"
              >
                {/* Gradient placeholder thumbnail */}
                <div className="h-40 bg-gradient-to-br from-accent-blue/20 to-accent-orange/20 flex items-center justify-center">
                  <span className="text-4xl opacity-50">
                    {project.category === "LLM" ? "🤖" : project.category === "Computer Vision" ? "👁" : "📊"}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold font-heading mb-2 text-white group-hover:text-accent-blue transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-1 rounded-full bg-accent-blue/10 text-accent-blue"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="text-xs text-muted hover:text-accent-blue transition-colors"
                    >
                      GitHub →
                    </a>
                    <a
                      href={project.demo}
                      className="text-xs text-muted hover:text-accent-orange transition-colors"
                    >
                      Live Demo →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### Task 10: Experience Timeline Section

**Files:**
- Create: `src/components/Experience.tsx`

- [ ] **Step 1: Create the experience component**

Create `src/components/Experience.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="gradient-text">Experience</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-blue via-accent-orange to-accent-blue" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className={`relative flex flex-col md:flex-row items-start mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Timeline node */}
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent-blue glow-blue transform -translate-x-1/2 mt-6 z-10" />

              {/* Card */}
              <div
                className={`ml-10 md:ml-0 md:w-[45%] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="glass rounded-xl p-6">
                  <span className="text-xs text-accent-orange font-mono">{exp.period}</span>
                  <h3 className="text-lg font-semibold font-heading text-white mt-1">{exp.role}</h3>
                  <p className="text-sm text-accent-blue mb-3">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li key={i} className="text-sm text-muted flex items-start gap-2">
                        <span className="text-accent-blue mt-1 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Certifications Section

**Files:**
- Create: `src/components/Certifications.tsx`

- [ ] **Step 1: Create the certifications component**

Create `src/components/Certifications.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { certifications } from "@/data/portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-4 dot-grid">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text">Certifications</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              className="glass rounded-xl p-6 text-center relative overflow-hidden group hover:glow-blue transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Shine effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)",
                  animation: "shine 1.5s ease-in-out",
                }}
              />

              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-sm font-semibold font-heading text-white mb-2">{cert.name}</h3>
              <p className="text-xs text-accent-blue mb-1">{cert.issuer}</p>
              <p className="text-xs text-muted">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 12: Contact Section & Footer

**Files:**
- Create: `src/components/Contact.tsx`
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Create the contact component**

Create `src/components/Contact.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/portfolio-data";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold font-heading text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Build Something{" "}
          <span className="gradient-text">Amazing Together</span>
        </motion.h2>

        <motion.p
          className="text-muted text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind? Let&apos;s talk about it.
        </motion.p>

        <motion.form
          className="glass rounded-xl p-8 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-accent-blue focus:glow-blue transition-all duration-300"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-accent-blue focus:glow-blue transition-all duration-300"
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-sm text-white placeholder-muted focus:outline-none focus:border-accent-blue focus:glow-blue transition-all duration-300 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-accent-blue to-accent-orange hover:opacity-90 hover:glow-blue"
          >
            Send Message
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div
          className="flex justify-center gap-6 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: "GitHub", href: personalInfo.github, icon: "GH" },
            { label: "LinkedIn", href: personalInfo.linkedin, icon: "IN" },
            { label: "Twitter", href: personalInfo.twitter, icon: "X" },
            { label: "Email", href: `mailto:${personalInfo.email}`, icon: "@" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-xs font-bold text-muted hover:text-accent-blue hover:glow-blue transition-all duration-300"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create the footer component**

Create `src/components/Footer.tsx`:

```tsx
export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-glass-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Jeeva. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
```

---

### Task 13: Assemble Main Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Compose all sections in page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Start dev server and verify**

Run:
```bash
cd "C:/Users/jeeva/OneDrive/Desktop/Portfolio"
npm run dev
```

Expected: Full portfolio loads at localhost:3000 with all sections, cinematic hero with floating panels and particles, smooth scroll navigation, responsive layout.

---

### Task 14: Polish & Responsive Testing

- [ ] **Step 1: Test on desktop viewport** — verify hero photo treatment, floating panels visible, all animations trigger on scroll
- [ ] **Step 2: Test on tablet viewport (768px)** — verify 2-column layouts, reduced floating panels
- [ ] **Step 3: Test on mobile viewport (375px)** — verify single column, hamburger nav, 3-4 floating panels only, readable text
- [ ] **Step 4: Fix any visual issues found during testing**
