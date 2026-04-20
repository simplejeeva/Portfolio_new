"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, personalInfo } from "@/data/portfolio";

const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "certifications",
  "contact",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  // Scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const monogram = (personalInfo.name[0] ?? "J").toUpperCase();

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
        style={{
          scaleX: progressScaleX,
          background:
            "linear-gradient(90deg, #4A9EFF 0%, #FF8C42 50%, #4A9EFF 100%)",
          boxShadow: "0 0 12px rgba(74,158,255,0.6)",
        }}
      />

      <motion.nav
        initial={false}
        animate={{
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
        }}
        transition={{ duration: 0.25 }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-accent-blue/15 bg-navy/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* LEFT — Monogram logo + name */}
          <a
            href="#hero"
            className="group flex items-center gap-3"
            aria-label="Back to top"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              <span
                aria-hidden
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue to-accent-orange opacity-60 blur-md transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                className="relative flex h-full w-full items-center justify-center rounded-lg border border-white/10 bg-navy/80 font-heading text-base font-bold text-white shadow-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgba(74,158,255,0.25) 0%, rgba(255,140,66,0.25) 100%)",
                }}
              >
                {monogram}
              </span>
              {/* Live pulse dot */}
              <span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"
                  style={{ boxShadow: "0 0 8px #34D399" }}
                />
              </span>
            </span>
            <span className="gradient-text hidden font-heading text-sm font-bold tracking-[0.18em] sm:inline-block">
              {personalInfo.name.toUpperCase()}
            </span>
          </a>

          {/* CENTER — Nav links with sliding active pill */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-md lg:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    className={`relative block rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-accent-blue/40 bg-accent-blue/15"
                        style={{
                          boxShadow:
                            "0 0 20px -4px rgba(74,158,255,0.5), inset 0 0 0 1px rgba(74,158,255,0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* RIGHT — CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group relative hidden overflow-hidden rounded-full border border-accent-blue/30 bg-gradient-to-r from-accent-blue/15 to-accent-orange/15 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-accent-blue/60 hover:shadow-[0_0_24px_-4px_rgba(74,158,255,0.6)] lg:flex lg:items-center lg:gap-1.5"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"
              />
              <span className="relative">Let&apos;s Talk</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition-all hover:border-accent-blue/40 hover:bg-accent-blue/10 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="14" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Orbital Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="orbital-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-navy/95 backdrop-blur-2xl lg:hidden"
          >
            {/* Starfield backdrop */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            >
              {Array.from({ length: 35 }).map((_, i) => {
                const x = (i * 79 + 11) % 100;
                const y = (i * 41 + 5) % 100;
                const r = (i % 3) * 0.4 + 0.5;
                return (
                  <circle
                    key={i}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r={r}
                    fill="#ffffff"
                    opacity={0.3 + (i % 5) * 0.1}
                  />
                );
              })}
            </svg>

            {/* Decorative orbit ring */}
            <motion.div
              aria-hidden
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent-blue/25"
            />

            {/* Top corner label */}
            <div className="pointer-events-none absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[0.3em] text-accent-blue/70">
              ▸ Menu
            </div>
            <div className="pointer-events-none absolute right-6 top-6 font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
              tap × to close
            </div>

            {/* Central close hub */}
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.35, delay: 0.1, type: "spring", stiffness: 180 }}
              onClick={(e) => {
                e.stopPropagation();
                setMobileOpen(false);
              }}
              aria-label="Close menu"
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #CC785C 0%, #FF8C42 55%, #4A9EFF 100%)",
                boxShadow:
                  "0 0 40px rgba(204,120,92,0.55), 0 0 80px rgba(74,158,255,0.35), inset 0 2px 10px rgba(255,255,255,0.3)",
              }}
            >
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-accent-orange/40"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="relative h-7 w-7 text-white drop-shadow"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Orbiting nav items */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{ width: 0, height: 0 }}
            >
              {navLinks.map((link, i) => {
                const total = navLinks.length;
                const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
                const radius = 135;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                const shortLabel =
                  link.label === "Certifications" ? "Certs" : link.label;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileOpen(false);
                    }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{ x, y, scale: 1, opacity: 1 }}
                    exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    transition={{
                      delay: 0.2 + i * 0.06,
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                    }}
                    className="pointer-events-auto absolute flex flex-col items-center"
                    style={{ left: -32, top: -32 }}
                  >
                    <div
                      className="relative flex h-16 w-16 items-center justify-center rounded-full font-mono text-sm font-bold transition-all"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(74,158,255,0.3) 0%, rgba(255,140,66,0.2) 100%)"
                          : "rgba(10,10,26,0.7)",
                        border: isActive
                          ? "2px solid rgba(74,158,255,0.7)"
                          : "1px solid rgba(255,255,255,0.12)",
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.85)",
                        boxShadow: isActive
                          ? "0 0 24px rgba(74,158,255,0.55), inset 0 0 20px rgba(74,158,255,0.1)"
                          : "0 4px 14px rgba(0,0,0,0.4)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {isActive && (
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full border-2 border-accent-blue/40"
                          animate={{
                            scale: [1, 1.35, 1],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      <span className="relative">0{i + 1}</span>
                    </div>
                    <span
                      className="mt-2 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors"
                      style={{
                        color: isActive ? "#4A9EFF" : "rgba(255,255,255,0.65)",
                        textShadow: isActive
                          ? "0 0 12px rgba(74,158,255,0.6)"
                          : "0 1px 4px rgba(0,0,0,0.8)",
                      }}
                    >
                      {shortLabel}
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom status strip */}
            <div className="pointer-events-none absolute inset-x-0 bottom-5 flex items-center justify-between px-6 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
              <span className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  style={{ boxShadow: "0 0 8px #34D399" }}
                />
                Online
              </span>
              <span className="gradient-text">{personalInfo.name.toUpperCase()}</span>
              <span>v1.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
