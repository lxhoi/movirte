import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

// ── Canvas & Column Geometry ───────────────────────────────────────────────────
const CW = 1400;
const SLOT = 34;        // vertical slot height per "row unit"
const TM   = 72;        // top margin (leaves room for column headers)
const BM   = 56;        // bottom margin

// Node sizes (SVG user coords)
const ROOT = { cx: 118, w: 155, h: 42 };
const PAGE = { cx: 510, w: 208, h: 36 };
const SUB  = { cx: 970, w: 208, h: 30 };

// Derived edges
const ROOT_R = ROOT.cx + ROOT.w / 2;   // 195.5
const PAGE_L = PAGE.cx - PAGE.w / 2;   // 406
const PAGE_R = PAGE.cx + PAGE.w / 2;   // 614
const SUB_L  = SUB.cx  - SUB.w  / 2;   // 866

// Trunk x-coordinates (midpoints between columns)
const T1 = (ROOT_R + PAGE_L) / 2;  // ~300.75
const T2 = (PAGE_R + SUB_L)  / 2;  // ~740

// ── Site Architecture Data ────────────────────────────────────────────────────
const siteTree = [
  { id: "homepage",    label: "Homepage",                slots: 1, sub: [] },
  { id: "men",         label: "Men",                     slots: 5, sub: ["New In", "Best Sellers", "Sale", "Collections & Capsules", "Gifting"] },
  { id: "women",       label: "Women",                   slots: 5, sub: ["New In", "Best Sellers", "Sale", "Collections & Capsules", "Gifting"] },
  { id: "newin",       label: "New In",                  slots: 1, sub: [] },
  { id: "bestsellers", label: "Best Sellers",            slots: 1, sub: [] },
  { id: "sale",        label: "Sale",                    slots: 1, sub: [] },
  { id: "collections", label: "Collections & Capsules",  slots: 3, sub: ["Latest Collections", "Art Series", "Seasonal Capsules"] },
  { id: "gifting",     label: "Gifting",                 slots: 2, sub: ["Gift Ideas", "Gift Cards"] },
  { id: "account",     label: "Account",                 slots: 4, sub: ["Login / Register", "Dashboard", "Orders", "Wishlist"] },
  { id: "bag",         label: "Shopping Bag",            slots: 1, sub: [] },
  { id: "search",      label: "Search",                  slots: 1, sub: [] },
];

// Compute page node y-centers from slot layout
let cumSlots = 0;
const pageNodes = siteTree.map(p => {
  const cy = TM + cumSlots * SLOT + (p.slots * SLOT) / 2;
  cumSlots += p.slots;
  return { ...p, cy, isBranch: p.sub.length > 0 };
});

const TOTAL_SLOTS = cumSlots; // 25
const CH = TM + TOTAL_SLOTS * SLOT + BM; // 970

// Root is vertically centered on all page nodes
const ROOT_CY = TM + (TOTAL_SLOTS * SLOT) / 2; // 485

// Compute sub-node y-centers (fan evenly around their parent)
const subNodes = pageNodes.flatMap(p =>
  p.sub.map((label, i) => ({
    id: `${p.id}_${i}`,
    pid: p.id,
    label,
    cy: p.cy + (i - (p.sub.length - 1) / 2) * SLOT,
  }))
);

const MIN_PAGE_Y = pageNodes[0].cy;
const MAX_PAGE_Y = pageNodes[pageNodes.length - 1].cy;

// ── Palette ───────────────────────────────────────────────────────────────────
const COL = {
  deep:  "#3B1F10",
  rich:  "#6B3A2A",
  cream: "#F5EDE0",
  beige: "#EDE0D2",
  mid:   "#9A8070",
  light: "#C4AD9A",
  bus:   "#B4A090",
  bg1:   "#FAF7F2",
  bg2:   "#F0E6D8",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function Sitemap() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-12">

        {/* Page header */}
        <div className="flex items-center justify-between mb-12 border-b border-neutral-200 pb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-neutral-600 hover:text-stone-700 transition-colors uppercase text-xs tracking-wider"
            style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl text-black tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Site Map
          </motion.h1>
          <div className="w-20" />
        </div>

        {/* ── Pipeline Diagram ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto border border-[#D9CCBE] overflow-hidden"
          style={{
            background: `linear-gradient(150deg, ${COL.bg1} 0%, ${COL.bg2} 100%)`,
          }}
        >
          {/* Responsive canvas via padding-top trick */}
          <div
            className="relative w-full"
            style={{ paddingTop: `${((CH / CW) * 100).toFixed(3)}%` }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox={`0 0 ${CW} ${CH}`}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* ── Arrow markers ── */}
              <defs>
                {/* Filled triangle pointing right */}
                <marker id="arr-brown" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
                  <path d="M 0 0.5 L 6 3.5 L 0 6.5 Z" fill={COL.rich} />
                </marker>
                <marker id="arr-light" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
                  <path d="M 0 0.5 L 6 3.5 L 0 6.5 Z" fill={COL.light} />
                </marker>
                <marker id="arr-mid" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
                  <path d="M 0 0.5 L 6 3.5 L 0 6.5 Z" fill={COL.mid} />
                </marker>
              </defs>

              {/* ── Column headers ── */}
              {(["ROOT", "PAGES", "SUB-PAGES"] as const).map((lbl, i) => {
                const x = [ROOT.cx, PAGE.cx, SUB.cx][i];
                return (
                  <text
                    key={lbl}
                    x={x} y={TM - 24}
                    fill={COL.bus}
                    fontSize="9"
                    textAnchor="middle"
                    style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.18em" }}
                  >
                    {lbl}
                  </text>
                );
              })}

              {/* Faint column separator lines */}
              {[T1, T2].map((x, i) => (
                <line
                  key={`sep-${i}`}
                  x1={x} y1={TM - 12} x2={x} y2={CH - BM + 12}
                  stroke={COL.beige} strokeWidth="0.5" strokeDasharray="3 9"
                  opacity="0.6"
                />
              ))}

              {/* ── CONNECTIONS ─────────────────────────────────────────────── */}

              {/* Root → T1 horizontal spur */}
              <motion.line
                x1={ROOT_R} y1={ROOT_CY} x2={T1} y2={ROOT_CY}
                stroke={COL.rich} strokeWidth="1.5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.5 }}
              />

              {/* T1 vertical bus (covers all page nodes) */}
              <motion.line
                x1={T1} y1={MIN_PAGE_Y} x2={T1} y2={MAX_PAGE_Y}
                stroke={COL.bus} strokeWidth="1"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />

              {/* T1 → each page node (horizontal arm with arrowhead) */}
              {pageNodes.map((n, i) => (
                <motion.line
                  key={`arm1-${n.id}`}
                  x1={T1} y1={n.cy} x2={PAGE_L} y2={n.cy}
                  stroke={n.isBranch ? COL.rich : COL.mid}
                  strokeWidth={n.isBranch ? "1.5" : "1"}
                  markerEnd={`url(#${n.isBranch ? "arr-brown" : "arr-mid"})`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.75 + i * 0.05 }}
                />
              ))}

              {/* Per-branch: page right → T2 + T2 bus + T2 → sub arms */}
              {pageNodes.filter(n => n.isBranch).map((n, bi) => {
                const kids = subNodes.filter(s => s.pid === n.id);
                const kMin = Math.min(...kids.map(k => k.cy));
                const kMax = Math.max(...kids.map(k => k.cy));
                const baseDelay = 1.3 + bi * 0.18;
                return (
                  <g key={`branch-${n.id}`}>
                    {/* Page right edge → T2 */}
                    <motion.line
                      x1={PAGE_R} y1={n.cy} x2={T2} y2={n.cy}
                      stroke={COL.rich} strokeWidth="1.5"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ duration: 0.28, delay: baseDelay }}
                    />
                    {/* T2 vertical sub-bus */}
                    <motion.line
                      x1={T2} y1={kMin} x2={T2} y2={kMax}
                      stroke={COL.light} strokeWidth="1"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: baseDelay + 0.1 }}
                    />
                    {/* T2 → each sub-page arm */}
                    {kids.map((k, ci) => (
                      <motion.line
                        key={`arm2-${k.id}`}
                        x1={T2} y1={k.cy} x2={SUB_L} y2={k.cy}
                        stroke={COL.light} strokeWidth="1"
                        markerEnd="url(#arr-light)"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 0.22, delay: baseDelay + 0.18 + ci * 0.06 }}
                      />
                    ))}
                  </g>
                );
              })}

              {/* ── NODES ───────────────────────────────────────────────────── */}

              {/* Root node */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <rect
                  x={ROOT.cx - ROOT.w / 2} y={ROOT_CY - ROOT.h / 2}
                  width={ROOT.w} height={ROOT.h} rx="4"
                  fill={COL.deep}
                />
                <text
                  x={ROOT.cx} y={ROOT_CY}
                  fill={COL.cream} fontSize="13"
                  textAnchor="middle" dominantBaseline="central"
                  style={{ fontFamily: "var(--font-serif)", letterSpacing: "0.05em" }}
                >
                  MOVIRTE.com
                </text>
              </motion.g>

              {/* Page nodes (L1) */}
              {pageNodes.map((n, i) => (
                <motion.g
                  key={`node-${n.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.9 + i * 0.05 }}
                >
                  <rect
                    x={PAGE.cx - PAGE.w / 2} y={n.cy - PAGE.h / 2}
                    width={PAGE.w} height={PAGE.h} rx="3"
                    fill={n.isBranch ? COL.rich : "#FFFFFF"}
                    stroke={n.isBranch ? "none" : COL.rich}
                    strokeWidth="1"
                  />
                  <text
                    x={PAGE.cx} y={n.cy}
                    fill={n.isBranch ? "#FFFFFF" : COL.deep}
                    fontSize="12"
                    textAnchor="middle" dominantBaseline="central"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {n.label}
                  </text>
                </motion.g>
              ))}

              {/* Sub-page nodes (L2) */}
              {subNodes.map((n, i) => (
                <motion.g
                  key={`sub-${n.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.65 + i * 0.028 }}
                >
                  <rect
                    x={SUB.cx - SUB.w / 2} y={n.cy - SUB.h / 2}
                    width={SUB.w} height={SUB.h} rx="3"
                    fill={COL.beige}
                  />
                  <text
                    x={SUB.cx} y={n.cy}
                    fill={COL.deep} fontSize="10"
                    textAnchor="middle" dominantBaseline="central"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {n.label}
                  </text>
                </motion.g>
              ))}

              {/* Flow direction arrow (top of diagram, between columns) */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <line
                  x1={230} y1={TM - 24} x2={880} y2={TM - 24}
                  stroke={COL.beige} strokeWidth="0.8"
                />
                <path
                  d={`M 875 ${TM - 27} L 882 ${TM - 24} L 875 ${TM - 21}`}
                  fill="none" stroke={COL.bus} strokeWidth="1"
                />
                <text
                  x={550} y={TM - 36}
                  fill={COL.bus} fontSize="8"
                  textAnchor="middle"
                  style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}
                >
                  NAVIGATION FLOW
                </text>
              </motion.g>
            </svg>
          </div>

          {/* Legend strip */}
          <div
            className="flex items-center gap-5 flex-wrap px-6 py-3.5 border-t"
            style={{ backgroundColor: COL.cream, borderColor: "#D9CCBE" }}
          >
            <span
              className="text-neutral-500 uppercase"
              style={{ fontFamily: "var(--font-sans)", fontSize: 9, letterSpacing: "0.18em" }}
            >
              Legend
            </span>
            {[
              { bg: COL.deep,   stroke: undefined,   label: "Root"            },
              { bg: COL.rich,   stroke: undefined,   label: "Category Page"   },
              { bg: "#FFFFFF",  stroke: COL.rich,    label: "Top-Level Page"  },
              { bg: COL.beige,  stroke: undefined,   label: "Sub-Page"        },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div
                  style={{
                    width: 22, height: 13, borderRadius: 3,
                    backgroundColor: item.bg,
                    border: item.stroke ? `1px solid ${item.stroke}` : undefined,
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-neutral-600"
                  style={{ fontFamily: "var(--font-sans)", fontSize: 10 }}
                >
                  {item.label}
                </span>
              </div>
            ))}
            <div className="flex items-center gap-1.5 ml-1">
              <svg width="28" height="12" viewBox="0 0 28 12">
                <line x1="0" y1="6" x2="22" y2="6" stroke={COL.rich} strokeWidth="1.5" />
                <path d="M 18 2.5 L 24 6 L 18 9.5" fill="none" stroke={COL.rich} strokeWidth="1.5" />
              </svg>
              <span className="text-neutral-600" style={{ fontFamily: "var(--font-sans)", fontSize: 10 }}>
                Flow direction
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
