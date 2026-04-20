"use client";

import { motion, type Variants } from "framer-motion";
import ParticleCanvas from "@/components/ui/ParticleCanvas";
import { personalInfo } from "@/data/portfolio";

const nameContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 16 },
  },
};

const titleContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.85 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const nameLetters = Array.from(personalInfo.name);
  const titleWords = personalInfo.title.split(" ");

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[640px] w-full overflow-hidden"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
        src="/assets/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Mobile overlay — uniform dark so centered text is readable over the video */}
      <div
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,26,0.78) 0%, rgba(10,10,26,0.65) 60%, rgba(10,10,26,0.9) 100%)",
          zIndex: 1,
        }}
      />
      {/* Desktop overlay — left-weighted to keep the subject bright on the right */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,26,0.92) 0%, rgba(10,10,26,0.75) 35%, rgba(10,10,26,0.35) 60%, rgba(10,10,26,0.15) 100%)",
          zIndex: 1,
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,10,26,0) 0%, rgba(10,10,26,1) 100%)",
          zIndex: 2,
        }}
      />

      <ParticleCanvas />

      <div
        className="relative flex h-full w-full items-center"
        style={{ zIndex: 4 }}
      >
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="max-w-xl text-center md:text-left">
            {/* Name — letter stagger with seamless gradient across letters */}
            <motion.h1
              variants={nameContainer}
              initial="hidden"
              animate="visible"
              aria-label={personalInfo.name}
              className="mb-5 whitespace-nowrap font-heading font-bold leading-[1.05]"
              style={{ fontSize: "clamp(2.1rem, 10vw, 4.5rem)" }}
            >
              {nameLetters.map((ch, i) => {
                const N = nameLetters.length;
                const pos = N === 1 ? 0 : -(i * 100) / (N - 1);
                return (
                  <motion.span
                    key={i}
                    variants={letter}
                    className="inline-block"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #4A9EFF 0%, #E8E8F5 50%, #FF8C42 100%)",
                      backgroundSize: `${N * 100}% 100%`,
                      backgroundPosition: `${pos}% center`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </motion.span>
                );
              })}
            </motion.h1>

            {/* Designation — word stagger + blinking cursor */}
            <motion.p
              variants={titleContainer}
              initial="hidden"
              animate="visible"
              aria-label={personalInfo.title}
              className="gradient-text mb-6 text-xl font-semibold md:text-2xl lg:text-3xl"
            >
              {titleWords.map((w, i) => (
                <motion.span
                  key={i}
                  variants={word}
                  className="mr-[0.25em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
              <motion.span
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  delay: 1.5,
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 0,
                  times: [0, 0.1, 0.5, 0.6],
                }}
                className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[2px] bg-accent-blue align-middle"
              />
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mb-10 text-sm text-muted md:text-base"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Explore */}
            <motion.a
              href="#about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
              className="inline-flex items-center gap-2 text-accent-blue transition-colors duration-300 hover:text-accent-orange"
            >
              <span className="text-sm tracking-wider">Explore</span>
              <svg
                className="h-5 w-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
