"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { techStack } from "@/data/portfolio";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

type Tech = (typeof techStack)[number];

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

const ORBITS: {
  category: Tech["category"];
  label: string;
  radiusPct: number;
  durationSec: number;
  reverse: boolean;
  ringColor: string;
}[] = [
  {
    category: "Language",
    label: "Languages",
    radiusPct: 25,
    durationSec: 55,
    reverse: false,
    ringColor: "#4A9EFF",
  },
  {
    category: "Framework",
    label: "Frameworks",
    radiusPct: 38,
    durationSec: 75,
    reverse: true,
    ringColor: "#FF8C42",
  },
  {
    category: "Infra",
    label: "Infra & Tools",
    radiusPct: 48,
    durationSec: 95,
    reverse: false,
    ringColor: "#7EC1FF",
  },
];

function Planet({
  tech,
  isHovered,
  scale = 1,
}: {
  tech: Tech;
  isHovered: boolean;
  scale?: number;
}) {
  const size = Math.round((isHovered ? 72 : 56) * scale);
  return (
    <div className="relative cursor-pointer">
      {/* glow halo */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-xl transition-all duration-300"
        style={{
          backgroundColor: `#${tech.color}`,
          opacity: isHovered ? 0.85 : 0.45,
          transform: isHovered ? "scale(1.8)" : "scale(1)",
        }}
      />
      {/* outer ring on hover */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? `0 0 0 2px #${tech.color}cc, 0 0 0 6px #${tech.color}33`
            : "0 0 0 0 transparent",
        }}
      />
      {/* planet body */}
      <div
        className="relative flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: size,
          height: size,
          background: "rgba(10,10,26,0.85)",
          padding: Math.round(size * 0.18),
          boxShadow: `0 0 0 1.5px #${tech.color}88, 0 0 22px #${tech.color}aa, inset 0 2px 6px rgba(255,255,255,0.08)`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/assets/icons/${tech.slug}.svg`}
          alt={tech.name}
          draggable={false}
          className="h-full w-full select-none"
        />
      </div>
    </div>
  );
}

function ClaudeCodeCore() {
  return (
    <motion.div
      key="core"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-none relative flex flex-col items-center text-center"
    >
      {/* Pulse rings */}
      <motion.div
        aria-hidden
        className="absolute top-0 h-[84px] w-[84px] rounded-3xl border-2 border-accent-orange/30 sm:h-[124px] sm:w-[124px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-0 h-[84px] w-[84px] rounded-3xl border-2 border-accent-blue/25 sm:h-[124px] sm:w-[124px]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Core block */}
      <div
        className="relative flex h-[84px] w-[84px] items-center justify-center rounded-3xl font-heading text-2xl font-bold text-white sm:h-[124px] sm:w-[124px] sm:text-4xl"
        style={{
          background:
            "linear-gradient(135deg, #CC785C 0%, #FF8C42 55%, #4A9EFF 100%)",
          boxShadow:
            "0 0 50px rgba(204,120,92,0.55), 0 0 90px rgba(74,158,255,0.35), inset 0 4px 14px rgba(255,255,255,0.3)",
        }}
      >
        <span className="drop-shadow-lg">CC</span>
      </div>

      <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-orange">
        Claude Code
      </p>
      <p className="mt-1 max-w-[180px] text-[11px] leading-relaxed text-muted">
        My AI Pair Programmer · Force Multiplier
      </p>
    </motion.div>
  );
}

function TechDetail({ tech }: { tech: Tech }) {
  return (
    <motion.div
      key={tech.name}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.22 }}
      className="pointer-events-none flex flex-col items-center text-center"
    >
      <div
        className="flex h-[104px] w-[104px] items-center justify-center rounded-3xl p-5"
        style={{
          background: "rgba(10,10,26,0.9)",
          boxShadow: `0 0 40px #${tech.color}aa, 0 0 0 2px #${tech.color}88 inset`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/assets/icons/${tech.slug}.svg`}
          alt={tech.name}
          className="h-full w-full"
        />
      </div>

      <p className="mt-3 font-heading text-lg font-bold text-white">
        {tech.name}
      </p>
      <p
        className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
        style={{ color: `#${tech.color}` }}
      >
        {tech.category}
      </p>
    </motion.div>
  );
}

export default function Skills() {
  const [hovered, setHovered] = useState<Tech | null>(null);
  const isSmall = useIsSmallScreen();
  const planetScale = isSmall ? 0.7 : 1;
  const radiusBoost = isSmall ? 6 : 0; // push orbits outward on small screens

  const orbits = useMemo(
    () =>
      ORBITS.map((o) => ({
        ...o,
        items: techStack.filter((t) => t.category === o.category),
      })),
    [],
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-4 py-14 md:py-16"
    >
      {/* Cosmic background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute right-10 top-20 h-80 w-80 rounded-full bg-accent-blue/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 h-80 w-80 rounded-full bg-accent-orange/10 blur-3xl" />
        {/* Starfield */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-50"
        >
          {Array.from({ length: 50 }).map((_, i) => {
            const x = (i * 79 + 11) % 100;
            const y = (i * 41 + 5) % 100;
            const r = (i % 3) * 0.35 + 0.4;
            return (
              <circle
                key={i}
                cx={`${x}%`}
                cy={`${y}%`}
                r={r}
                fill="#ffffff"
                opacity={0.25 + (i % 5) * 0.1}
              />
            );
          })}
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-6 text-center md:mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-blue">
            Tech Constellation
          </p>
          <AnimatedHeading
            ariaLabel="My Toolkit"
            className="font-heading text-3xl font-bold leading-tight md:text-5xl"
          >
            My <span className="gradient-text">Toolkit</span>
          </AnimatedHeading>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            <span className="text-accent-orange">Claude Code</span> at the
            core — the force multiplier that unlocks every tool around it.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" />
        </motion.div>

        {/* Ring legend */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {orbits.map((o) => (
            <div key={o.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: o.ringColor,
                  boxShadow: `0 0 10px ${o.ringColor}`,
                }}
              />
              <span className="text-xs font-medium text-white">
                {o.label}
              </span>
              <span className="font-mono text-[10px] text-muted">
                ({o.items.length})
              </span>
            </div>
          ))}
        </div>

        {/* Orbit map */}
        <div
          className="relative mx-auto"
          style={{
            width: "min(92vw, 680px)",
            height: "min(92vw, 680px)",
          }}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Orbit rings */}
          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
          >
            {orbits.map((o) => (
              <circle
                key={o.label}
                cx="50"
                cy="50"
                r={o.radiusPct + radiusBoost}
                fill="none"
                stroke={o.ringColor}
                strokeOpacity="0.3"
                strokeWidth="0.15"
                strokeDasharray="0.7 1.1"
              />
            ))}
          </svg>

          {/* Orbiting planets */}
          {orbits.map((orbit) => (
            <motion.div
              key={orbit.label}
              className="pointer-events-none absolute inset-0"
              animate={{ rotate: orbit.reverse ? -360 : 360 }}
              transition={{
                duration: orbit.durationSec,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {orbit.items.map((tech, i) => {
                const angleDeg =
                  (i / orbit.items.length) * 360 +
                  (orbit.category === "Framework" ? 45 : 0);
                const rad = (angleDeg * Math.PI) / 180;
                const effectiveRadius = orbit.radiusPct + radiusBoost;
                const leftPct = (50 + effectiveRadius * Math.cos(rad)).toFixed(
                  3,
                );
                const topPct = (50 + effectiveRadius * Math.sin(rad)).toFixed(
                  3,
                );
                return (
                  <div
                    key={tech.name}
                    className="pointer-events-auto absolute"
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHovered(tech)}
                  >
                    <motion.div
                      animate={{ rotate: orbit.reverse ? 360 : -360 }}
                      transition={{
                        duration: orbit.durationSec,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Planet
                        tech={tech}
                        isHovered={hovered?.name === tech.name}
                        scale={planetScale}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ))}

          {/* Center: Claude Code core OR hovered tech detail */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {hovered ? (
                <TechDetail key="detail" tech={hovered} />
              ) : (
                <ClaudeCodeCore key="core" />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
