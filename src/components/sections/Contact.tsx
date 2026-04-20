"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { personalInfo } from "@/data/portfolio";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

type Status = "idle" | "sending" | "success" | "error";

const comms = [
  {
    code: "01",
    label: "EMAIL",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    tint: "#4A9EFF",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    code: "02",
    label: "VOICE",
    value: personalInfo.phoneDisplay,
    href: `tel:${personalInfo.phone.replace(/\s+/g, "")}`,
    tint: "#FF8C42",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    code: "03",
    label: "BASE",
    value: "Namakkal, TN",
    sub: "IST · GMT+5:30",
    href: "https://www.google.com/maps/place/Namakkal,+Tamil+Nadu",
    tint: "#34D399",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

const channels = [
  {
    label: "GitHub",
    code: "GH",
    href: personalInfo.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    code: "LN",
    href: personalInfo.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    code: "IG",
    href: personalInfo.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.897 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.897-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
      </svg>
    ),
  },
];

function CornerBracket({
  pos,
  tint = "#4A9EFF",
}: {
  pos: "tl" | "tr" | "bl" | "br";
  tint?: string;
}) {
  const base =
    "pointer-events-none absolute h-5 w-5 border-[1.5px] transition-colors";
  const map: Record<typeof pos, string> = {
    tl: `top-2 left-2 border-l border-t rounded-tl-md`,
    tr: `top-2 right-2 border-r border-t rounded-tr-md`,
    bl: `bottom-2 left-2 border-l border-b rounded-bl-md`,
    br: `bottom-2 right-2 border-r border-b rounded-br-md`,
  };
  return (
    <span
      aria-hidden
      className={`${base} ${map[pos]}`}
      style={{ borderColor: tint }}
    />
  );
}

function StatusCell({
  label,
  value,
  tint,
  pulse = false,
}: {
  label: string;
  value: string;
  tint: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="relative flex h-2 w-2 shrink-0">
        {pulse && (
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style={{ backgroundColor: tint }}
          />
        )}
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{
            backgroundColor: tint,
            boxShadow: `0 0 10px ${tint}`,
          }}
        />
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
          {label}
        </p>
        <p
          className="truncate font-mono text-xs font-semibold uppercase tracking-wider"
          style={{ color: tint }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [time, setTime] = useState<string>("--:--");

  const isSending = status === "sending";

  useEffect(() => {
    const update = () => {
      try {
        const now = new Date();
        const parts = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).formatToParts(now);
        const h = parts.find((p) => p.type === "hour")?.value ?? "--";
        const m = parts.find((p) => p.type === "minute")?.value ?? "--";
        setTime(`${h}:${m}`);
      } catch {
        /* ignore */
      }
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSending) return;

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("All fields required for transmission.");
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) {
      setStatus("error");
      setErrorMsg("Email format invalid.");
      return;
    }
    if (form.message.trim().length < 10) {
      setStatus("error");
      setErrorMsg("Message too short — 10+ characters required.");
      return;
    }
    const accessKey = process.env.NEXT_PUBLIC_EMAIL_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMsg("Transmission service offline.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New portfolio message from ${form.name}`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        message?: string;
      };
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.message ?? "Transmission failed.");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Retrying may help.");
    }
  }

  const inputBase =
    "w-full rounded-md border border-accent-blue/25 bg-accent-blue/[0.04] px-3 py-2.5 font-mono text-sm text-white placeholder:text-muted/50 placeholder:font-mono focus:outline-none focus:border-accent-blue focus:bg-accent-blue/10 focus:shadow-[0_0_0_1px_rgba(74,158,255,0.5),0_0_20px_-4px_rgba(74,158,255,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-3 py-12 sm:px-4 sm:py-14 md:py-16"
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-10 top-20 h-72 w-72 rounded-full bg-accent-blue/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-accent-orange/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="mb-8 text-center md:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-blue">
            Mission Control
          </p>
          <AnimatedHeading
            ariaLabel="Let's Build Something Amazing Together"
            className="font-heading text-3xl font-bold leading-tight md:text-5xl"
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text">Amazing Together</span>
          </AnimatedHeading>
          <div className="mx-auto mt-6 h-[2px] w-24 rounded-full bg-gradient-to-r from-accent-blue via-accent-orange to-accent-blue" />
        </motion.div>

        {/* HUD PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-accent-blue/30 bg-navy/70 backdrop-blur-md"
          style={{
            boxShadow:
              "0 0 0 1px rgba(74,158,255,0.1), 0 30px 60px -20px rgba(74,158,255,0.25), 0 0 80px -20px rgba(255,140,66,0.15)",
          }}
        >
          {/* Grid pattern overlay */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="hud-grid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="#4A9EFF"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hud-grid)" />
          </svg>

          {/* Scanning line animation */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(74,158,255,0) 10%, rgba(74,158,255,0.9) 50%, rgba(74,158,255,0) 90%, transparent 100%)",
              boxShadow: "0 0 20px rgba(74,158,255,0.7)",
            }}
            animate={{ y: ["0%", "3500%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 2,
            }}
          />

          {/* Corner brackets */}
          <CornerBracket pos="tl" tint="#4A9EFF" />
          <CornerBracket pos="tr" tint="#FF8C42" />
          <CornerBracket pos="bl" tint="#FF8C42" />
          <CornerBracket pos="br" tint="#4A9EFF" />

          {/* Top bar: title + time */}
          <div className="relative flex items-center justify-between gap-3 border-b border-accent-blue/20 px-4 py-2.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue"
                style={{ boxShadow: "0 0 8px #4A9EFF" }}
              />
              <p className="truncate font-mono text-[9px] uppercase tracking-[0.2em] text-accent-blue sm:text-[10px] sm:tracking-[0.25em]">
                <span className="sm:hidden">Contact Uplink</span>
                <span className="hidden sm:inline">
                  Mission Control · Contact Uplink
                </span>
              </p>
            </div>
            <p className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] text-muted sm:text-[10px] sm:tracking-[0.2em]">
              {time} IST
            </p>
          </div>

          {/* Status row — compact horizontal strip on mobile, 3-cell grid on desktop */}
          <div className="relative flex items-center justify-between gap-2 overflow-x-auto border-b border-accent-blue/20 px-4 py-2.5 sm:hidden">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span
                  className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"
                  style={{ boxShadow: "0 0 8px #34D399" }}
                />
              </span>
              <span className="text-emerald-300">Online</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent-blue"
                style={{ boxShadow: "0 0 8px #4A9EFF" }}
              />
              <span className="text-accent-blue">~24 Hrs</span>
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-[9px] uppercase tracking-wider">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent-orange"
                style={{ boxShadow: "0 0 8px #FF8C42" }}
              />
              <span className="text-accent-orange">Secure</span>
            </span>
          </div>
          <div className="relative hidden border-b border-accent-blue/20 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-accent-blue/15">
            <StatusCell
              label="Status"
              value="Online"
              tint="#34D399"
              pulse
            />
            <StatusCell label="Response" value="~24 Hrs" tint="#4A9EFF" />
            <StatusCell
              label="Uplink"
              value="Secure"
              tint="#FF8C42"
            />
          </div>

          {/* Body: split panels */}
          <div className="relative grid divide-y divide-accent-blue/15 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:divide-x md:divide-y-0">
            {/* LEFT: COMMS */}
            <div className="relative p-4 sm:p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-blue">
                  ▸ COMMS
                </p>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                  CH {comms.length}
                </span>
              </div>

              <ul className="space-y-2">
                {comms.map((c, i) => (
                  <motion.li
                    key={c.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  >
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        c.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-3 rounded-md border border-accent-blue/15 bg-accent-blue/[0.02] px-3 py-2.5 transition-all duration-300 hover:border-accent-blue/40 hover:bg-accent-blue/[0.06]"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-[9px] text-muted/70"
                      >
                        //{c.code}
                      </span>
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-all"
                        style={{
                          color: c.tint,
                          backgroundColor: `${c.tint}15`,
                          boxShadow: `inset 0 0 0 1px ${c.tint}35`,
                        }}
                      >
                        {c.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className="font-mono text-[9px] uppercase tracking-wider"
                          style={{ color: c.tint }}
                        >
                          {c.label}
                        </p>
                        <p className="truncate font-mono text-xs text-white">
                          {c.value}
                        </p>
                      </div>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Channels (socials) */}
              <div className="mt-5 border-t border-accent-blue/15 pt-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-accent-orange">
                  ▸ CHANNELS
                </p>
                <div className="flex flex-wrap gap-2">
                  {channels.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group flex items-center gap-2 rounded-md border border-accent-blue/20 bg-accent-blue/[0.03] px-2.5 py-1.5 text-muted transition-all duration-300 hover:border-accent-blue/50 hover:bg-accent-blue/10 hover:text-white"
                    >
                      {s.icon}
                      <span className="font-mono text-[10px] uppercase tracking-wider">
                        {s.code}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: TRANSMISSION form */}
            <div className="relative p-4 sm:p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent-orange">
                  ▸ TRANSMISSION
                </p>
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                  E2E · ENCRYPTED
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                <div>
                  <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    Identify
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="> your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    disabled={isSending}
                    autoComplete="name"
                    required
                    suppressHydrationWarning
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    Reply Channel
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="> your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    disabled={isSending}
                    autoComplete="email"
                    required
                    suppressHydrationWarning
                    className={inputBase}
                  />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    Payload
                  </label>
                  <textarea
                    name="message"
                    placeholder="> your message..."
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    disabled={isSending}
                    required
                    suppressHydrationWarning
                    className={`${inputBase} resize-none`}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 font-mono text-xs text-emerald-300"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      TRANSMISSION RECEIVED · REPLY INCOMING
                    </motion.div>
                  )}
                  {status === "error" && errorMsg && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2 rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 font-mono text-xs text-red-300"
                      role="alert"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-3.5 w-3.5 shrink-0"
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span className="uppercase tracking-wider">
                        ERR: {errorMsg}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSending}
                  suppressHydrationWarning
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-gradient-to-r from-accent-blue to-accent-orange py-3 font-mono text-sm font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(74,158,255,0.7)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {/* Scan highlight on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full"
                  />
                  {isSending ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeOpacity="0.25"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>TRANSMITTING…</span>
                    </>
                  ) : (
                    <>
                      <span>▶ TRANSMIT</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative flex items-center justify-between border-t border-accent-blue/20 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.25em] text-muted">
            <div className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 6px #34D399" }}
              />
              <span>SYS: READY</span>
            </div>
            <span className="hidden sm:inline">
              SECURE · HANDSHAKE · OK
            </span>
            <span>PORTFOLIO/v1.0</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
