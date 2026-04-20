"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { certifications } from "@/data/portfolio";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

function useIsSmallScreen(): boolean {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setSmall(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return small;
}

export default function Certifications() {
  const isSmall = useIsSmallScreen();
  const sealScale = isSmall ? 0.65 : 1;
  return (
    <section
      id="certifications"
      className="relative overflow-hidden py-14 md:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-10 top-20 h-64 w-64 rounded-full bg-accent-orange/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl"
      />

      {/* Header (constrained) */}
      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-8 text-center md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-blue">
            Learning
          </p>
          <AnimatedHeading
            ariaLabel="Licenses and Certifications"
            className="font-heading text-3xl font-bold leading-tight md:text-5xl"
          >
            Licenses &{" "}
            <span className="gradient-text">Certifications</span>
          </AnimatedHeading>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            Continuous learning — certifications earned along the way to
            sharpen my craft.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" />
        </motion.div>
      </div>

      {/* Playground (wide) */}
      <div className="relative mx-auto max-w-[1440px] px-4 md:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 flex items-center justify-end">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted md:text-xs">
              Hover to reveal · drag to move
            </p>
          </div>

          <div className="glass relative h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-navy/40 md:h-[600px] lg:h-[640px]">
            {/* Circuit board background */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-60 blur-[1.5px]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="cert-glow">
                  <feGaussianBlur stdDeviation="0.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g
                stroke="#4A9EFF"
                strokeWidth="0.15"
                fill="none"
                opacity="0.75"
                filter="url(#cert-glow)"
              >
                <path d="M0 12 L22 12 L22 32 L52 32 L52 6 L100 6" />
                <path d="M0 48 L10 48 L10 82 L38 82 L38 58 L70 58 L70 36 L100 36" />
                <path d="M0 72 L16 72 L16 44 L46 44 L46 90 L100 90" />
                <path d="M20 0 L20 6 M52 0 L52 18 M78 0 L78 10 M92 0 L92 26" />
                <path d="M30 100 L30 86 M62 100 L62 74 M84 100 L84 68" />
                <path d="M0 28 L6 28 L6 62 L28 62" />
                <path d="M70 58 L70 72 L92 72 L92 88" />
              </g>
              <g
                stroke="#FF8C42"
                strokeWidth="0.12"
                fill="none"
                opacity="0.55"
                filter="url(#cert-glow)"
              >
                <path d="M0 24 L8 24 L8 56 L34 56 L34 26 L60 26 L60 68 L100 68" />
                <path d="M42 0 L42 14 L74 14 L74 42 L100 42" />
              </g>
              <g fill="#4A9EFF" filter="url(#cert-glow)">
                <circle cx="22" cy="12" r="0.7" />
                <circle cx="52" cy="6" r="0.7" />
                <circle cx="10" cy="48" r="0.7" />
                <circle cx="38" cy="58" r="0.7" />
                <circle cx="70" cy="36" r="0.7" />
                <circle cx="46" cy="44" r="0.7" />
                <circle cx="16" cy="72" r="0.7" />
                <circle cx="78" cy="10" r="0.7" />
                <circle cx="6" cy="62" r="0.7" />
                <circle cx="92" cy="72" r="0.7" />
              </g>
              <g fill="#FF8C42" filter="url(#cert-glow)">
                <circle cx="8" cy="56" r="0.8" />
                <circle cx="34" cy="26" r="0.8" />
                <circle cx="60" cy="68" r="0.8" />
                <circle cx="74" cy="14" r="0.8" />
              </g>
            </svg>

            {/* Radial vignette */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 15%, rgba(10,10,26,0.35) 75%, rgba(10,10,26,0.65) 100%)",
              }}
            />

            {/* Center spotlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(204,120,92,0.35) 0%, rgba(74,158,255,0.15) 50%, transparent 100%)",
              }}
            />

            {/* Floating cert seals */}
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="group absolute"
                style={{
                  left: `${cert.x}%`,
                  top: `${cert.y}%`,
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.07,
                  type: "spring",
                  stiffness: 140,
                  damping: 14,
                }}
                drag
                dragMomentum={false}
                dragElastic={0.3}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: "grabbing" }}
                whileHover={{ scale: 1.22, zIndex: 40 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0, 6, 0] }}
                  transition={{
                    duration: 6 + (i % 4),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="relative cursor-grab active:cursor-grabbing"
                >
                  {/* Glow halo */}
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-full opacity-45 blur-xl transition-opacity duration-300 group-hover:opacity-85"
                    style={{ backgroundColor: cert.color }}
                  />

                  {/* Seal body */}
                  <div
                    className="relative flex select-none items-center justify-center rounded-full font-heading font-bold text-white transition-[filter] duration-300 group-hover:brightness-110"
                    style={{
                      width: Math.round(cert.size * sealScale),
                      height: Math.round(cert.size * sealScale),
                      fontSize: Math.round(cert.size * sealScale * 0.28),
                      backgroundColor: cert.color,
                      boxShadow: `inset 0 2px 8px rgba(255,255,255,0.25), 0 0 24px ${cert.color}aa, 0 4px 14px rgba(0,0,0,0.4)`,
                      border: `2px solid ${cert.color}`,
                    }}
                  >
                    {cert.mono}
                  </div>
                </motion.div>

                {/* Always-visible name + hover issuer */}
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-[110px] -translate-x-1/2 text-center sm:mt-2.5 sm:max-w-[170px]">
                  <p className="text-[10px] font-semibold leading-tight text-white/75 transition-colors duration-200 group-hover:text-white md:text-[11px]">
                    {cert.name}
                  </p>
                  <p
                    className="mt-1 font-mono text-[9px] font-semibold uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={{ color: cert.color }}
                  >
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Centerpiece: Certifications Hub */}
            <motion.div
              className="group absolute"
              style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              drag
              dragMomentum={false}
              dragElastic={0.3}
              whileDrag={{ scale: 1.08, zIndex: 60, cursor: "grabbing" }}
              whileHover={{ scale: 1.1, zIndex: 55 }}
            >
              {/* Pulsing rings */}
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-orange/40 sm:h-[140px] sm:w-[140px]"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-blue/25 sm:h-[180px] sm:w-[180px]"
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Halo */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-3xl opacity-80 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(204,120,92,0.7) 0%, rgba(74,158,255,0.35) 55%, transparent 100%)",
                }}
              />

              {/* Main block */}
              <div
                className="relative flex h-[86px] w-[86px] cursor-grab items-center justify-center rounded-3xl font-heading font-bold text-white shadow-2xl active:cursor-grabbing sm:h-[124px] sm:w-[124px]"
                style={{
                  background:
                    "linear-gradient(135deg, #CC785C 0%, #FF8C42 55%, #4A9EFF 100%)",
                  boxShadow:
                    "0 20px 60px -10px rgba(204,120,92,0.7), 0 0 40px -10px rgba(74,158,255,0.55), inset 0 1px 0 rgba(255,255,255,0.25)",
                }}
              >
                <div className="flex flex-col items-center leading-none">
                  <span className="text-3xl drop-shadow-lg sm:text-5xl">
                    {certifications.length}
                  </span>
                  <span className="mt-1 font-mono text-[8px] font-semibold uppercase tracking-[0.2em] opacity-90 sm:mt-2 sm:text-[9px]">
                    Certs
                  </span>
                </div>
              </div>

              {/* Always-visible label */}
              <div
                className="pointer-events-none absolute left-1/2 top-full mt-4 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent-orange/50 bg-navy/95 px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-orange backdrop-blur"
                style={{
                  boxShadow: "0 8px 24px -6px rgba(204,120,92,0.5)",
                }}
              >
                Certifications
              </div>

              {/* Hover detail tooltip */}
              <div
                className="pointer-events-none absolute left-1/2 top-full mt-14 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-navy/95 px-4 py-2 text-xs font-medium text-white opacity-0 backdrop-blur transition-all duration-200 group-hover:opacity-100"
                style={{
                  boxShadow: "0 8px 24px -6px rgba(204,120,92,0.5)",
                }}
              >
                Continuously Learning · Hover seals for details
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
