"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  aboutText,
  personalInfo,
  focusAreas,
} from "@/data/portfolio";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import { NeuralField } from "@/components/ui/BackgroundPatterns";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-14 md:py-16"
    >
      <NeuralField />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-14 text-center md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-blue">
            My Journey
          </p>
          <AnimatedHeading
            ariaLabel="From Mechanical to Software Engineer"
            className="font-heading text-3xl font-bold leading-tight md:text-5xl"
          >
            From <span className="gradient-text">Mechanical</span> to{" "}
            <span className="gradient-text">Software Engineer</span>
          </AnimatedHeading>
          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" />
        </motion.div>

        {/* 2-col: photo + text */}
        <div className="grid items-start gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          {/* Left: photo + journey badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center lg:items-start"
          >
            {/* Photo with corner brackets */}
            <div className="relative mx-auto w-72 md:w-80">
              <div
                aria-hidden
                className="absolute -left-3 -top-3 h-8 w-8 rounded-tl-lg border-l-2 border-t-2 border-accent-blue"
              />
              <div
                aria-hidden
                className="absolute -right-3 -top-3 h-8 w-8 rounded-tr-lg border-r-2 border-t-2 border-accent-orange"
              />
              <div
                aria-hidden
                className="absolute -bottom-3 -left-3 h-8 w-8 rounded-bl-lg border-b-2 border-l-2 border-accent-orange"
              />
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 h-8 w-8 rounded-br-lg border-b-2 border-r-2 border-accent-blue"
              />

              <div className="relative h-[22rem] w-full overflow-hidden rounded-2xl glow-blue md:h-[26rem]">
                <Image
                  src="/assets/images/jeeva.jpeg"
                  alt={personalInfo.name}
                  fill
                  sizes="(max-width: 1024px) 288px, 320px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          {/* Right: paragraphs + focus chips */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Pull-quote opening paragraph */}
            <div className="relative mb-6 pl-6">
              <div
                aria-hidden
                className="absolute bottom-0 left-0 top-0 w-[2px] rounded-full bg-gradient-to-b from-accent-blue to-accent-orange"
              />
              <p className="text-lg font-light leading-relaxed text-white md:text-xl">
                {aboutText[0]}
              </p>
            </div>

            {/* Remaining paragraphs */}
            <div className="space-y-4 text-muted">
              {aboutText.slice(1).map((paragraph, i) => (
                <p key={i} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Focus chips */}
            <div className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-blue">
                Current Focus
              </p>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="glass rounded-full border border-white/10 px-4 py-1.5 text-xs text-white transition-colors hover:border-accent-blue/50 hover:text-accent-blue"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
