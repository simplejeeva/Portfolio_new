"use client";

// ═══════════════════════════════════════════════════════════════════
// AI-themed decorative backgrounds. All SSR-safe (deterministic).
// ═══════════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────────────────────────
// 1) NEURAL FIELD — connected AI nodes (knowledge graph)
// ───────────────────────────────────────────────────────────────────
const neuralNodes = [
  { x: 8, y: 12 },
  { x: 22, y: 26 },
  { x: 38, y: 14 },
  { x: 54, y: 30 },
  { x: 70, y: 18 },
  { x: 86, y: 32 },
  { x: 15, y: 45 },
  { x: 32, y: 55 },
  { x: 50, y: 48 },
  { x: 68, y: 52 },
  { x: 84, y: 60 },
  { x: 10, y: 72 },
  { x: 28, y: 82 },
  { x: 46, y: 76 },
  { x: 64, y: 88 },
  { x: 82, y: 78 },
  { x: 95, y: 20 },
  { x: 4, y: 30 },
];

const neuralLines: Array<[number, number]> = (() => {
  const out: Array<[number, number]> = [];
  for (let i = 0; i < neuralNodes.length; i++) {
    for (let j = i + 1; j < neuralNodes.length; j++) {
      const dx = neuralNodes[i].x - neuralNodes[j].x;
      const dy = neuralNodes[i].y - neuralNodes[j].y;
      if (Math.hypot(dx, dy) < 22) out.push([i, j]);
    }
  }
  return out;
})();

export function NeuralField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.3]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <filter id="nf-glow">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g stroke="#4A9EFF" strokeWidth="0.15" opacity="0.45">
          {neuralLines.map(([a, b], i) => (
            <line
              key={`l${i}`}
              x1={neuralNodes[a].x}
              y1={neuralNodes[a].y}
              x2={neuralNodes[b].x}
              y2={neuralNodes[b].y}
            />
          ))}
        </g>
        <g filter="url(#nf-glow)">
          {neuralNodes.map((n, i) => (
            <circle
              key={`n${i}`}
              cx={n.x}
              cy={n.y}
              r={i % 4 === 0 ? 0.85 : 0.6}
              fill={i % 3 === 0 ? "#FF8C42" : "#4A9EFF"}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// 2) DATA FLOW — particles streaming through pipeline paths
// ───────────────────────────────────────────────────────────────────
const dataFlowPaths = [
  {
    id: "flow-1",
    d: "M -5 20 C 20 20, 25 40, 50 40 S 80 60, 105 60",
    stroke: "#4A9EFF",
    dur: "7s",
    delay: "0s",
  },
  {
    id: "flow-2",
    d: "M -5 70 C 15 70, 30 50, 55 50 S 85 30, 105 30",
    stroke: "#FF8C42",
    dur: "9s",
    delay: "1.5s",
  },
  {
    id: "flow-3",
    d: "M -5 50 L 25 50 L 25 80 L 60 80 L 60 45 L 105 45",
    stroke: "#4A9EFF",
    dur: "8s",
    delay: "3s",
  },
  {
    id: "flow-4",
    d: "M -5 15 L 35 15 L 35 35 L 70 35 L 70 15 L 105 15",
    stroke: "#FF8C42",
    dur: "10s",
    delay: "0.8s",
  },
];

export function DataFlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          {dataFlowPaths.map((p) => (
            <path key={p.id} id={p.id} d={p.d} />
          ))}
          <filter id="df-glow">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* Trace lines */}
        {dataFlowPaths.map((p) => (
          <use
            key={`trace-${p.id}`}
            href={`#${p.id}`}
            fill="none"
            stroke={p.stroke}
            strokeWidth="0.18"
            strokeDasharray="0.6 0.8"
            opacity="0.55"
          />
        ))}

        {/* Endpoint dots */}
        {dataFlowPaths.map((p) => {
          const match = p.d.match(/M\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/);
          const last = p.d.match(/(\d+\.?\d*)\s+(\d+\.?\d*)$/);
          if (!match || !last) return null;
          return (
            <g key={`nodes-${p.id}`}>
              <circle
                cx={match[1]}
                cy={match[2]}
                r="0.6"
                fill={p.stroke}
                opacity="0.4"
              />
              <circle
                cx={last[1]}
                cy={last[2]}
                r="0.6"
                fill={p.stroke}
                opacity="0.4"
              />
            </g>
          );
        })}

        {/* Streaming particles — emit 2 per path */}
        {dataFlowPaths.flatMap((p, i) => [
          <circle
            key={`dot-a-${i}`}
            r="0.8"
            fill={p.stroke}
            filter="url(#df-glow)"
          >
            <animateMotion
              dur={p.dur}
              repeatCount="indefinite"
              begin={p.delay}
              rotate="auto"
            >
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>,
          <circle
            key={`dot-b-${i}`}
            r="0.6"
            fill={p.stroke}
            opacity="0.7"
            filter="url(#df-glow)"
          >
            <animateMotion
              dur={p.dur}
              repeatCount="indefinite"
              begin={`${parseFloat(p.delay) + parseFloat(p.dur) / 2}s`}
              rotate="auto"
            >
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>,
        ])}
      </svg>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// 3) SIGNAL WAVE — stacked training-loss curves
// ───────────────────────────────────────────────────────────────────
function wavePath(
  yBase: number,
  amp: number,
  phase: number,
  decay: number,
): string {
  // Sine wave expressed via cubic bezier segments.
  const pts: string[] = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * 110 - 5;
    // Training-loss style: high-amp noise that decays toward the right.
    const dampen = 1 - t * decay;
    const y =
      yBase +
      Math.sin(t * Math.PI * 6 + phase) * amp * dampen +
      Math.sin(t * Math.PI * 14 + phase) * amp * 0.3 * dampen;
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

const waves = [
  { y: 22, amp: 3, phase: 0, decay: 0.7, stroke: "#4A9EFF", opacity: 0.35 },
  { y: 42, amp: 4, phase: 1.2, decay: 0.8, stroke: "#FF8C42", opacity: 0.55 }, // highlighted: "active"
  { y: 62, amp: 2.5, phase: 2.5, decay: 0.6, stroke: "#4A9EFF", opacity: 0.3 },
  { y: 82, amp: 3, phase: 3.8, decay: 0.65, stroke: "#4A9EFF", opacity: 0.28 },
];

export function SignalWave() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.7]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {/* Baseline rails */}
        <g stroke="#4A9EFF" strokeWidth="0.08" opacity="0.15" strokeDasharray="0.4 0.8">
          {waves.map((w, i) => (
            <line key={`base-${i}`} x1="0" y1={w.y} x2="100" y2={w.y} />
          ))}
        </g>

        {/* Waves */}
        {waves.map((w, i) => (
          <path
            key={`wave-${i}`}
            d={wavePath(w.y, w.amp, w.phase, w.decay)}
            fill="none"
            stroke={w.stroke}
            strokeWidth={i === 1 ? "0.28" : "0.18"}
            opacity={w.opacity}
          />
        ))}
      </svg>

      {/* Mono labels like "epoch" ticks */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-between px-6 font-mono text-[8px] uppercase tracking-[0.25em] text-accent-blue/25">
        <span>t0</span>
        <span>t1</span>
        <span>t2</span>
        <span>t3</span>
        <span>now</span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────
// 4) ATTENTION MATRIX — transformer-style heatmap grid
// ───────────────────────────────────────────────────────────────────
const MATRIX_COLS = 24;
const MATRIX_ROWS = 14;

function attentionIntensity(c: number, r: number): number {
  // Deterministic "attention" pattern with diagonal emphasis + bands.
  const diag = Math.exp(-Math.pow((c / MATRIX_COLS - r / MATRIX_ROWS) * 2, 2));
  const band = 0.5 + 0.5 * Math.sin(c * 0.6 + r * 0.4);
  return Math.min(1, diag * 0.8 + band * 0.4);
}

const matrixCells: Array<{
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
  warm: boolean;
}> = (() => {
  const out: typeof matrixCells = [];
  const cellW = 100 / MATRIX_COLS;
  const cellH = 100 / MATRIX_ROWS;
  for (let r = 0; r < MATRIX_ROWS; r++) {
    for (let c = 0; c < MATRIX_COLS; c++) {
      const intensity = attentionIntensity(c, r);
      if (intensity < 0.18) continue; // skip very faint cells
      out.push({
        x: c * cellW,
        y: r * cellH,
        w: cellW,
        h: cellH,
        opacity: intensity,
        warm: (c + r) % 7 === 0,
      });
    }
  }
  return out;
})();

export function AttentionMatrix() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.22]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {matrixCells.map((cell, i) => (
          <rect
            key={i}
            x={cell.x + 0.1}
            y={cell.y + 0.1}
            width={cell.w - 0.2}
            height={cell.h - 0.2}
            fill={cell.warm ? "#FF8C42" : "#4A9EFF"}
            opacity={cell.opacity * 0.5}
            rx="0.3"
          />
        ))}
      </svg>
    </div>
  );
}
