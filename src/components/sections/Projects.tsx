"use client";

import { motion } from "framer-motion";
import { currentProject } from "@/data/portfolio";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { DataFlow } from "@/components/ui/BackgroundPatterns";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-14 md:py-16"
    >
      <DataFlow />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-20 right-20 h-72 w-72 rounded-full bg-accent-orange/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-blue">
            Currently Building
          </p>
          <AnimatedHeading
            ariaLabel="Shipping Right Now"
            className="font-heading text-3xl font-bold leading-tight md:text-5xl"
          >
            Shipping <span className="gradient-text">Right Now</span>
          </AnimatedHeading>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            The product I&apos;m actively working on — turning sales
            conversations into actionable intelligence in real time.
          </p>
          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" />
        </motion.div>

        {/* Featured project card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Outer gradient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-0.5 rounded-3xl opacity-70 blur-md"
            style={{
              background:
                "linear-gradient(135deg, rgba(74,158,255,0.55) 0%, rgba(255,140,66,0.4) 50%, rgba(74,158,255,0.55) 100%)",
            }}
          />

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-navy/70 p-6 backdrop-blur-md md:p-10">
            {/* Inner decorative glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent-blue/20 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent-orange/20 blur-3xl"
            />

            {/* Corner brackets */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-4 top-4 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-accent-blue/60"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-4 top-4 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-accent-orange/60"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 left-4 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-accent-orange/60"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 right-4 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-accent-blue/60"
            />

            <div className="relative">
              {/* Header row */}
              <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4 md:gap-5">
                  {/* App icon */}
                  <div className="relative shrink-0">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-orange opacity-50 blur-lg"
                    />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent-blue/25 to-accent-orange/25 text-4xl shadow-xl md:h-20 md:w-20 md:text-5xl">
                      {currentProject.icon}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
                      {currentProject.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-accent-blue md:text-base">
                      {currentProject.tagline}
                    </p>
                  </div>
                </div>

                {/* Status pill */}
                <div className="flex flex-wrap items-start gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Building at Techjays
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                {currentProject.description}
              </p>

              {/* Two-column: Features + Tech Stack */}
              <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                {/* Key Features */}
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-blue">
                    Key Features I Built
                  </p>
                  <ul className="space-y-3">
                    {currentProject.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-blue/15 text-accent-blue"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="h-3 w-3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        <span className="text-sm leading-relaxed text-white/90">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-orange">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.techStack.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.25 + i * 0.04 }}
                        className="cursor-default rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/85 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-blue/50 hover:bg-accent-blue/10 hover:text-white"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
