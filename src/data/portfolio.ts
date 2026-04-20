export const personalInfo = {
  name: "Jeevananthan",
  title: "Full Stack AI Developer",
  tagline: "Building intelligent systems that transform ideas into reality",
  email: "jeevaskp1308@gmail.com",
  phone: "+91 9600877537",
  phoneDisplay: "+91 96008 77537",
  location: "Namakkal, Tamil Nadu, India",
  timezone: "IST · GMT+5:30",
  github: "https://github.com/simplejeeva",
  linkedin: "https://www.linkedin.com/in/jeevananthan-928045268/",
  instagram: "https://www.instagram.com/jeeva_skp_1308?igsh=dTAxaGppbDdnOWh3",
};

export const aboutText = [
  "I'm a Full Stack AI Developer with a unique journey — I started as a Mechanical Engineer and transitioned into Software Engineering, driven by my passion for building intelligent systems that solve real-world problems.",
  "My engineering foundation taught me how to think in systems, analyze complex problems, and design practical solutions. Today, I apply that same analytical mindset to software — bridging the gap between AI research and production-ready applications.",
  "I currently work on AI-powered products involving Large Language Models, computer vision, and automation pipelines. I use modern AI-assisted development tools like Claude Code to accelerate my workflow, allowing me to ship high-quality features faster and focus on solving the problems that matter most.",
  "When I'm not building or writing code, I'm exploring the latest breakthroughs in AI, experimenting with new tools, and learning how technology can empower communities — including my own village in Tamil Nadu.",
];

export const journey = [
  { icon: "⚙️", stage: "Foundation", label: "Mechanical Engineer" },
  { icon: "💻", stage: "Transition", label: "Software Engineer" },
  { icon: "🧠", stage: "Present", label: "AI Developer" },
];

export const focusAreas = [
  "Large Language Models",
  "Computer Vision",
  "Automation Pipelines",
  "Claude Code",
];

export const claudeCode = {
  name: "Claude Code",
  tagline: "My AI pair programmer",
  description:
    "The force multiplier in my workflow. With Claude Code I ship faster, write cleaner code, and confidently work across any language or framework — from prototype to production.",
  mono: "CC",
};

export const techStack = [
  // Ring 1 — Languages
  { name: "JavaScript",   slug: "javascript",  color: "F7DF1E", category: "Language"  },
  { name: "TypeScript",   slug: "typescript",  color: "3178C6", category: "Language"  },
  { name: "Python",       slug: "python",      color: "FFD43B", category: "Language"  },

  // Ring 2 — Frameworks
  { name: "React",        slug: "react",       color: "61DAFB", category: "Framework" },
  { name: "Django",       slug: "django",      color: "44B78B", category: "Framework" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4", category: "Framework" },
  { name: "Electron",     slug: "electron",    color: "A1CCD1", category: "Framework" },

  // Ring 3 — Infra & Tools
  { name: "PostgreSQL",   slug: "postgresql",  color: "4169E1", category: "Infra"     },
  { name: "Docker",       slug: "docker",      color: "2496ED", category: "Infra"     },
  { name: "Git",          slug: "git",         color: "F05032", category: "Infra"     },
];

export const currentProject = {
  icon: "📊",
  name: "SalesHawk",
  tagline: "AI-Powered Sales Meeting Intelligence Platform",
  description:
    "A desktop application that transforms sales meetings into actionable intelligence using real-time AI. SalesHawk automatically detects meetings across Google Meet, Zoom, and Microsoft Teams, providing live coaching, instant research, and post-call insights to help sales teams close more deals.",
  features: [
    "Real-time Live Coaching Widget with auto-topic detection",
    "Pre-call meeting intelligence with participant enrichment",
    "Meeting detection engine across multiple platforms",
    "Calendar integration with Microsoft Graph & Google Calendar",
    "AI-powered transcript analysis using Claude & LLMs",
  ],
  techStack: [
    "Electron",
    "React",
    "TypeScript",
    "Python",
    "Claude API",
    "Recall.ai",
    "Clay",
    "Microsoft Graph API",
  ],
};

export const experiences = [
  {
    company: "Techjays",
    mono: "TJ",
    roles: [
      {
        title: "Software Engineer Analyst",
        type: "Full-time",
        startDate: "2025-09-01",
        endDate: null, // null = present, auto-updates each month
        location: "On-site",
      },
      {
        title: "Artificial Intelligence Intern",
        type: "Internship",
        startDate: "2025-07-01",
        endDate: "2025-08-31",
        location: "Coimbatore, Tamil Nadu, India",
      },
    ],
  },
  {
    company: "Cynnent",
    mono: "CY",
    roles: [
      {
        title: "UI Developer",
        type: "Full-time",
        startDate: "2023-10-01",
        endDate: "2024-05-31",
        location: "Bengaluru, Karnataka, India · On-site",
      },
    ],
  },
];

export const certifications = [
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    mono: "A",
    color: "#CC785C",
    skills: ["Claude Code", "Agentic Coding", "AI Workflow"],
    x: 50, y: 10, size: 80,
  },
  {
    name: "Introduction to Claude",
    issuer: "Anthropic",
    mono: "A",
    color: "#CC785C",
    skills: ["Claude API", "LLM Fundamentals"],
    x: 20, y: 22, size: 62,
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    mono: "A",
    color: "#CC785C",
    skills: ["Claude", "Prompting Basics"],
    x: 80, y: 22, size: 62,
  },
  {
    name: "Building Systems with the ChatGPT API",
    issuer: "DeepLearning.AI",
    mono: "DL",
    color: "#0A66C2",
    skills: ["OpenAI API", "LLM Systems", "Chains"],
    x: 20, y: 54, size: 68,
  },
  {
    name: "ChatGPT Prompt Engineering for Developers",
    issuer: "DeepLearning.AI",
    mono: "DL",
    color: "#0A66C2",
    skills: ["Prompt Engineering", "OpenAI API"],
    x: 80, y: 54, size: 66,
  },
  {
    name: "Prompt Engineering with Llama 2 & 3",
    issuer: "DeepLearning.AI · Meta",
    mono: "DL",
    color: "#0A66C2",
    skills: ["Llama Models", "Prompt Engineering"],
    x: 26, y: 85, size: 64,
  },
  {
    name: "MERN Full-Stack Web Development",
    issuer: "HCL GUVI",
    mono: "G",
    color: "#16A34A",
    skills: [
      "JavaScript",
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Bootstrap",
    ],
    x: 74, y: 85, size: 64,
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
