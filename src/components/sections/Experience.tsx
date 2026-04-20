"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

// Auto-updating period formatter — "Sep 2025 - Present" / "Oct 2023 - May 2024"
function formatMonthYear(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatPeriod(startIso: string, endIso: string | null): string {
  const start = formatMonthYear(startIso);
  return endIso ? `${start} - ${formatMonthYear(endIso)}` : `${start} - Present`;
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden px-4 py-14 md:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 top-32 h-64 w-64 rounded-full bg-accent-blue/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 left-10 h-64 w-64 rounded-full bg-accent-orange/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          className="mb-10 text-center md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-blue">
            Work History
          </p>
          <AnimatedHeading
            ariaLabel="My Experience"
            className="font-heading text-3xl font-bold leading-tight md:text-5xl"
          >
            My <span className="gradient-text">Experience</span>
          </AnimatedHeading>
          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" />
        </motion.div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute bottom-6 left-[27px] top-6 w-[2px] rounded-full bg-gradient-to-b from-accent-blue via-accent-blue/30 to-accent-orange md:left-[31px]"
          />

          <div className="space-y-10">
            {experiences.map((exp, companyIdx) => {
              const isCurrentCompany = exp.roles.some(
                (r) => r.endDate === null,
              );
              return (
                <motion.div
                  key={exp.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: companyIdx * 0.1 }}
                  className="relative pl-16 md:pl-20"
                >
                  <div className="absolute left-0 top-0">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-blue to-accent-orange opacity-40 blur-md"
                    />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-navy font-heading text-base font-bold text-white shadow-lg">
                      {exp.mono}
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg font-bold text-white md:text-xl">
                      {exp.company}
                    </h3>
                    {isCurrentCompany && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Current
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {exp.roles.map((role, i) => {
                      const isCurrent = role.endDate === null;
                      return (
                        <motion.li
                          key={role.title}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.35,
                            delay: 0.1 + i * 0.06,
                          }}
                          className="group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-accent-blue/25 hover:bg-white/[0.04]"
                        >
                          {isCurrent && (
                            <span
                              aria-hidden
                              className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-accent-blue"
                            />
                          )}

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <h4 className="font-heading text-sm font-semibold text-white md:text-base">
                              {role.title}
                            </h4>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-muted">
                              {role.type}
                            </span>
                          </div>

                          <p className="mt-1 text-xs leading-relaxed text-muted md:text-sm">
                            <span className="text-white/70">
                              {formatPeriod(role.startDate, role.endDate)}
                            </span>
                            <span className="mx-1.5 text-muted/60">·</span>
                            {role.location}
                          </p>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
