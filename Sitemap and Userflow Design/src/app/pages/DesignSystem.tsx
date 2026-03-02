import { Link } from "react-router";
import { ArrowLeft, Copy, Check, ArrowRight, Search, ShoppingBag, Heart, Star, ChevronDown, Menu, X, Plus, Minus, Filter, Grid, List } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import MIcon from "../../imports/Layer1";
import MovirteWordmark from "../../imports/MovirteWordmark";

const sections = [
  { id: "tokens", title: "Design Tokens" },
  { id: "colors", title: "Color System" },
  { id: "typography", title: "Typography" },
  { id: "spacing", title: "Spacing & Grid" },
  { id: "buttons", title: "Buttons" },
  { id: "badges", title: "Badges & Tags" },
  { id: "cards", title: "Cards" },
  { id: "forms", title: "Form Elements" },
  { id: "navigation", title: "Navigation" },
  { id: "patterns", title: "UI Patterns" },
  { id: "motion", title: "Motion & Interaction" },
];

// ─── Color Data ───────────────────────────────────────────────────────────────
const colorTokens = [
  {
    group: "Brand Primary",
    colors: [
      { name: "Cream", token: "--movirte-cream", hex: "#F5EDE0", rgb: "245, 237, 224", on: "dark", usage: "Hero backgrounds, CTAs, light fills" },
      { name: "Rich Brown", token: "--movirte-rich-brown", hex: "#6B3A2A", rgb: "107, 58, 42", on: "light", usage: "Primary accent, hover states, focus rings" },
      { name: "Warm Beige", token: "--movirte-warm-beige", hex: "#E8DDD2", rgb: "232, 221, 210", on: "dark", usage: "Section backgrounds, subtle fills" },
      { name: "Deep Brown", token: "--movirte-deep-brown", hex: "#3B1F10", rgb: "59, 31, 16", on: "light", usage: "Dark sections, footer, high contrast" },
    ],
  },
  {
    group: "Neutral Scale",
    colors: [
      { name: "Black", token: "--movirte-black", hex: "#000000", rgb: "0, 0, 0", on: "light", usage: "Primary text, borders, icons" },
      { name: "Neutral 900", token: "--movirte-neutral-900", hex: "#171717", rgb: "23, 23, 23", on: "light", usage: "Dark backgrounds" },
      { name: "Neutral 700", token: "--movirte-neutral-700", hex: "#404040", rgb: "64, 64, 64", on: "light", usage: "Secondary text" },
      { name: "Neutral 500", token: "--movirte-neutral-500", hex: "#737373", rgb: "115, 115, 115", on: "light", usage: "Placeholder text, captions" },
      { name: "Neutral 300", token: "--movirte-neutral-300", hex: "#D4D4D4", rgb: "212, 212, 212", on: "dark", usage: "Borders, dividers" },
      { name: "Neutral 100", token: "--movirte-neutral-100", hex: "#F5F5F5", rgb: "245, 245, 245", on: "dark", usage: "Page backgrounds" },
      { name: "White", token: "--movirte-white", hex: "#FFFFFF", rgb: "255, 255, 255", on: "dark", usage: "Cards, inputs, contrast" },
    ],
  },
  {
    group: "Semantic",
    colors: [
      { name: "Success", token: "--movirte-success", hex: "#4A7C59", rgb: "74, 124, 89", on: "light", usage: "In stock, confirmation" },
      { name: "Warning", token: "--movirte-warning", hex: "#B8860B", rgb: "184, 134, 11", on: "light", usage: "Low stock, alerts" },
      { name: "Error", token: "--movirte-error", hex: "#8B2020", rgb: "139, 32, 32", on: "light", usage: "Errors, sold out" },
      { name: "Info", token: "--movirte-info", hex: "#2C5F7A", rgb: "44, 95, 122", on: "light", usage: "Informational messages" },
    ],
  },
];

// ─── Spacing Scale ─────────────────────────────────────────────────────────────
const spacingScale = [
  { name: "1", px: "4px", rem: "0.25rem", token: "space-1" },
  { name: "2", px: "8px", rem: "0.5rem", token: "space-2" },
  { name: "3", px: "12px", rem: "0.75rem", token: "space-3" },
  { name: "4", px: "16px", rem: "1rem", token: "space-4" },
  { name: "6", px: "24px", rem: "1.5rem", token: "space-6" },
  { name: "8", px: "32px", rem: "2rem", token: "space-8" },
  { name: "12", px: "48px", rem: "3rem", token: "space-12" },
  { name: "16", px: "64px", rem: "4rem", token: "space-16" },
  { name: "20", px: "80px", rem: "5rem", token: "space-20" },
  { name: "24", px: "96px", rem: "6rem", token: "space-24" },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-neutral-400 hover:text-stone-700"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

function DSSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-28 scroll-mt-28"
    >
      <div className="flex items-end gap-4 mb-10 pb-5 border-b-2 border-stone-800">
        <h2 className="text-4xl text-black tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-3" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>
      {children}
    </p>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <p className="text-sm uppercase tracking-widest text-neutral-500 mb-6 border-l-2 border-stone-600 pl-3" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export default function DesignSystem() {
  const [activeSection, setActiveSection] = useState("tokens");
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-neutral-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-neutral-500 hover:text-stone-700 transition-colors uppercase text-xs tracking-wider"
              style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="text-center">
              <h1 className="text-2xl text-black tracking-tight" style={{ fontFamily: "var(--font-serif)" }}>
                MOVIRTE Design System
              </h1>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>
                v1.0 — UI & Component Library
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)" }}>
                Where art meets motion
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-28 pb-24">
        <div className="flex gap-10">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-56 shrink-0 sticky top-28 self-start hidden xl:block"
          >
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4 px-3" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>
              Contents
            </p>
            <nav className="space-y-0.5">
              {sections.map((s, i) => (
                <motion.a
                  key={s.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center gap-2 py-2.5 px-3 border-l-2 text-sm transition-all ${
                    activeSection === s.id
                      ? "border-stone-700 text-black bg-stone-50"
                      : "border-transparent text-neutral-500 hover:text-black hover:border-stone-300"
                  }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {s.title}
                </motion.a>
              ))}
            </nav>

            {/* Token legend */}
            <div className="mt-10 p-4 bg-stone-800 text-white">
              <div className="flex items-center gap-2 mb-3">
                <div style={{ width: '28px', height: '20px', ['--fill-0' as string]: '#ffffff' } as React.CSSProperties}>
                  <MIcon />
                </div>
                <div style={{ width: '90px', height: '14px', ['--fill-0' as string]: '#ffffff' } as React.CSSProperties}>
                  <MovirteWordmark />
                </div>
              </div>
              <p className="text-xs italic text-stone-300" style={{ fontFamily: "var(--font-serif)" }}>"Where art meets motion."</p>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">

            {/* ── DESIGN TOKENS ───────────────────────────────── */}
            <DSSection id="tokens" title="Design Tokens">
              <p className="text-neutral-600 mb-10 leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-sans)" }}>
                Design tokens are the single source of truth for all visual properties in MOVIRTE. They are defined as CSS custom properties and should be referenced consistently across all components and layouts.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Color Tokens */}
                <div className="bg-white border border-neutral-200 p-6">
                  <Label>Color Tokens</Label>
                  {[
                    { token: "--movirte-cream", value: "#F5EDE0" },
                    { token: "--movirte-rich-brown", value: "#6B3A2A" },
                    { token: "--movirte-warm-beige", value: "#E8DDD2" },
                    { token: "--movirte-deep-brown", value: "#3B1F10" },
                  ].map((t) => (
                    <div key={t.token} className="group flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border border-neutral-200" style={{ backgroundColor: t.value }} />
                        <code className="text-xs text-neutral-600" style={{ fontFamily: "monospace" }}>{t.token}</code>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-neutral-400">{t.value}</span>
                        <CopyButton value={`var(${t.token})`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Typography Tokens */}
                <div className="bg-white border border-neutral-200 p-6">
                  <Label>Typography Tokens</Label>
                  {[
                    { token: "--font-serif", value: "Cormorant Garamond, serif" },
                    { token: "--font-sans", value: "Inter, sans-serif" },
                    { token: "--text-display", value: "4rem / 64px" },
                    { token: "--text-heading", value: "2.5rem / 40px" },
                    { token: "--text-subheading", value: "1.5rem / 24px" },
                    { token: "--text-body", value: "1rem / 16px" },
                    { token: "--text-caption", value: "0.75rem / 12px" },
                  ].map((t) => (
                    <div key={t.token} className="group flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                      <code className="text-xs text-neutral-600" style={{ fontFamily: "monospace" }}>{t.token}</code>
                      <div className="flex items-center">
                        <span className="text-xs text-neutral-400">{t.value}</span>
                        <CopyButton value={`var(${t.token})`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Spacing Tokens */}
                <div className="bg-white border border-neutral-200 p-6">
                  <Label>Spacing Tokens</Label>
                  {[
                    { token: "--space-xs", value: "4px" },
                    { token: "--space-sm", value: "8px" },
                    { token: "--space-md", value: "16px" },
                    { token: "--space-lg", value: "24px" },
                    { token: "--space-xl", value: "48px" },
                    { token: "--space-2xl", value: "80px" },
                  ].map((t) => (
                    <div key={t.token} className="group flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                      <code className="text-xs text-neutral-600" style={{ fontFamily: "monospace" }}>{t.token}</code>
                      <div className="flex items-center">
                        <span className="text-xs text-neutral-400">{t.value}</span>
                        <CopyButton value={`var(${t.token})`} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Effect Tokens */}
                <div className="bg-white border border-neutral-200 p-6">
                  <Label>Effect Tokens</Label>
                  {[
                    { token: "--radius-none", value: "0px" },
                    { token: "--radius-sm", value: "2px" },
                    { token: "--radius-md", value: "4px" },
                    { token: "--transition-fast", value: "150ms ease" },
                    { token: "--transition-base", value: "300ms ease" },
                    { token: "--transition-slow", value: "500ms ease" },
                    { token: "--shadow-sm", value: "0 1px 3px rgba(0,0,0,0.08)" },
                    { token: "--shadow-md", value: "0 4px 16px rgba(0,0,0,0.1)" },
                  ].map((t) => (
                    <div key={t.token} className="group flex items-center justify-between py-2 border-b border-neutral-100 last:border-0">
                      <code className="text-xs text-neutral-600" style={{ fontFamily: "monospace" }}>{t.token}</code>
                      <div className="flex items-center">
                        <span className="text-xs text-neutral-400">{t.value}</span>
                        <CopyButton value={`var(${t.token})`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DSSection>

            {/* ── COLOR SYSTEM ────────────────────────────────── */}
            <DSSection id="colors" title="Color System">
              {colorTokens.map((group) => (
                <SubSection key={group.group} title={group.group}>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {group.colors.map((c) => (
                      <motion.div
                        key={c.token}
                        whileHover={{ y: -2 }}
                        className="group"
                      >
                        <div
                          className="h-20 w-full mb-3 border border-neutral-200 relative overflow-hidden"
                          style={{ backgroundColor: c.hex }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                            <CopyButton value={c.hex} />
                          </div>
                        </div>
                        <p className="text-sm text-black mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>{c.name}</p>
                        <p className="text-xs text-neutral-500 mb-0.5" style={{ fontFamily: "monospace" }}>{c.hex}</p>
                        <p className="text-xs text-neutral-400" style={{ fontFamily: "monospace" }}>rgb({c.rgb})</p>
                        <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{c.usage}</p>
                      </motion.div>
                    ))}
                  </div>
                </SubSection>
              ))}

              {/* Contrast Checker */}
              <SubSection title="Contrast Pairings">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { bg: "#F5EDE0", text: "#3B1F10", label: "Cream / Deep Brown", ratio: "8.4:1 ✓ AAA" },
                    { bg: "#6B3A2A", text: "#F5EDE0", label: "Rich Brown / Cream", ratio: "5.2:1 ✓ AA" },
                    { bg: "#000000", text: "#F5EDE0", label: "Black / Cream", ratio: "18.9:1 ✓ AAA" },
                    { bg: "#3B1F10", text: "#E8DDD2", label: "Deep Brown / Warm Beige", ratio: "9.1:1 ✓ AAA" },
                    { bg: "#ffffff", text: "#6B3A2A", label: "White / Rich Brown", ratio: "6.3:1 ✓ AA" },
                    { bg: "#171717", text: "#F5EDE0", label: "Neutral 900 / Cream", ratio: "17.2:1 ✓ AAA" },
                  ].map((pair) => (
                    <div key={pair.label} className="p-5 border border-neutral-200" style={{ backgroundColor: pair.bg }}>
                      <p className="text-sm mb-1" style={{ color: pair.text, fontFamily: "var(--font-serif)" }}>{pair.label}</p>
                      <p className="text-xs" style={{ color: pair.text, fontFamily: "var(--font-sans)" }}>{pair.ratio}</p>
                    </div>
                  ))}
                </div>
              </SubSection>
            </DSSection>

            {/* ── TYPOGRAPHY ──────────────────────────────────── */}
            <DSSection id="typography" title="Typography">
              <SubSection title="Type Families">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border-2 border-stone-700 p-8">
                    <p className="text-5xl mb-4" style={{ fontFamily: "var(--font-serif)" }}>Cormorant Garamond</p>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4" style={{ letterSpacing: "0.15em" }}>Primary / Serif</p>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                      Used for headlines, product names, editorial, brand voice.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {["Light 300", "Regular 400", "Medium 500", "SemiBold 600", "Bold 700"].map((w) => (
                        <span key={w} className="text-xs bg-neutral-100 px-2 py-1 text-neutral-600" style={{ fontFamily: "var(--font-sans)" }}>{w}</span>
                      ))}
                    </div>
                  </div>
                  <div className="border border-neutral-200 p-8">
                    <p className="text-5xl mb-4" style={{ fontFamily: "var(--font-sans)" }}>Inter</p>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4" style={{ letterSpacing: "0.15em" }}>Secondary / Sans-Serif</p>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                      Used for body text, navigation, UI labels, descriptions.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      {["Light 300", "Regular 400", "Medium 500", "SemiBold 600"].map((w) => (
                        <span key={w} className="text-xs bg-neutral-100 px-2 py-1 text-neutral-600" style={{ fontFamily: "var(--font-sans)" }}>{w}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Type Scale — Serif">
                <div className="space-y-1">
                  {[
                    { label: "Display / 72px", size: "text-7xl", sample: "Art Meets Motion" },
                    { label: "H1 / 60px", size: "text-6xl", sample: "MOVIRTE Collection" },
                    { label: "H2 / 48px", size: "text-5xl", sample: "Classical Reimagined" },
                    { label: "H3 / 36px", size: "text-4xl", sample: "New Arrivals" },
                    { label: "H4 / 24px", size: "text-2xl", sample: "Wearable Masterpieces" },
                    { label: "H5 / 20px", size: "text-xl", sample: "Spring / Summer Collection" },
                  ].map((t) => (
                    <div key={t.label} className="group flex items-baseline gap-6 py-4 border-b border-neutral-100 hover:bg-stone-50 px-4 -mx-4 transition-colors">
                      <span className="text-xs text-neutral-400 w-28 shrink-0" style={{ fontFamily: "var(--font-sans)" }}>{t.label}</span>
                      <span className={`${t.size} text-black leading-tight`} style={{ fontFamily: "var(--font-serif)" }}>{t.sample}</span>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Type Scale — Sans">
                <div className="space-y-1">
                  {[
                    { label: "Body XL / 20px", size: "text-xl", sample: "Premium streetwear inspired by classical masterpieces." },
                    { label: "Body L / 18px", size: "text-lg", sample: "Each piece tells a story of movement, artistry, and the democratization of beauty." },
                    { label: "Body / 16px", size: "text-base", sample: "MOVIRTE is where art and fashion collide. We are a contemporary brand that reimagines classical masterpieces." },
                    { label: "Body S / 14px", size: "text-sm", sample: "Free shipping on orders over €175 · New collection now live · Limited edition prints available" },
                    { label: "Caption / 12px", size: "text-xs", sample: "COMPOSITION 100% ORGANIC COTTON · MADE IN ITALY · LIMITED EDITION" },
                  ].map((t) => (
                    <div key={t.label} className="group flex items-baseline gap-6 py-4 border-b border-neutral-100 hover:bg-stone-50 px-4 -mx-4 transition-colors">
                      <span className="text-xs text-neutral-400 w-28 shrink-0" style={{ fontFamily: "var(--font-sans)" }}>{t.label}</span>
                      <span className={`${t.size} text-neutral-700 leading-relaxed`} style={{ fontFamily: "var(--font-sans)" }}>{t.sample}</span>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Special Styles">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "Nav Label", el: <span className="text-xs uppercase tracking-widest text-black" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>New In / Women / Men</span> },
                    { label: "Price Tag", el: <span className="text-2xl text-black" style={{ fontFamily: "var(--font-serif)" }}>€ 185.00</span> },
                    { label: "Italic Quote", el: <span className="text-2xl italic text-stone-700" style={{ fontFamily: "var(--font-serif)" }}>"Art shouldn't live behind glass."</span> },
                    { label: "Badge / Tag", el: <span className="text-xs uppercase tracking-widest text-white bg-stone-800 px-3 py-1" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>New Arrival</span> },
                    { label: "Link", el: <span className="text-sm text-black border-b border-black hover:border-stone-600 hover:text-stone-600 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-sans)" }}>View Collection</span> },
                    { label: "CTA Arrow", el: <span className="flex items-center gap-2 text-sm uppercase tracking-widest text-stone-700 cursor-pointer" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>Shop Now <ArrowRight className="w-4 h-4" /></span> },
                  ].map((item) => (
                    <div key={item.label} className="bg-white border border-neutral-200 p-5">
                      <Label>{item.label}</Label>
                      {item.el}
                    </div>
                  ))}
                </div>
              </SubSection>
            </DSSection>

            {/* ── SPACING & GRID ──────────────────────────────── */}
            <DSSection id="spacing" title="Spacing & Grid">
              <SubSection title="Spacing Scale (Base Unit: 4px)">
                <div className="space-y-3">
                  {spacingScale.map((s) => (
                    <div key={s.name} className="flex items-center gap-4">
                      <span className="text-xs text-neutral-400 w-16 shrink-0 text-right" style={{ fontFamily: "var(--font-sans)" }}>{s.px}</span>
                      <div
                        className="bg-stone-600 h-5"
                        style={{ width: s.px }}
                      />
                      <span className="text-xs text-neutral-500" style={{ fontFamily: "monospace" }}>space-{s.name} · {s.rem}</span>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Grid System">
                <div className="space-y-6">
                  <div className="bg-white border border-neutral-200 p-6">
                    <Label>12-Column Grid · Max Width 1440px · Gutter 24px</Label>
                    <div className="grid grid-cols-12 gap-2 mt-4">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-10 bg-stone-100 border border-stone-200 flex items-center justify-center">
                          <span className="text-xs text-stone-500">{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { cols: "1 Column", usage: "Full-width hero, editorial spreads", span: "12" },
                      { cols: "2 Column", usage: "Content + sidebar, image pairs", span: "6 / 6" },
                      { cols: "3 Column", usage: "Product grid, feature cards", span: "4 / 4 / 4" },
                      { cols: "4 Column", usage: "Compact product listings", span: "3 / 3 / 3 / 3" },
                      { cols: "Asymmetric 2/3 + 1/3", usage: "Editorial with caption", span: "8 / 4" },
                      { cols: "Asymmetric 1/3 + 2/3", usage: "Sidebar + content", span: "4 / 8" },
                    ].map((g) => (
                      <div key={g.cols} className="bg-white border border-neutral-200 p-4">
                        <p className="text-sm text-black mb-1" style={{ fontFamily: "var(--font-sans)" }}>{g.cols}</p>
                        <p className="text-xs text-neutral-500 mb-2" style={{ fontFamily: "var(--font-sans)" }}>{g.usage}</p>
                        <p className="text-xs text-stone-600" style={{ fontFamily: "monospace" }}>{g.span}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SubSection>
            </DSSection>

            {/* ── BUTTONS ─────────────────────────────────────── */}
            <DSSection id="buttons" title="Buttons">
              <SubSection title="Button Variants">
                <div className="flex flex-wrap gap-4 items-center">
                  {/* Primary */}
                  <div className="text-center">
                    <Label>Primary</Label>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-stone-800 text-white px-8 py-3 uppercase tracking-widest text-xs transition-colors hover:bg-stone-900"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      Shop Now
                    </motion.button>
                  </div>
                  {/* Secondary */}
                  <div className="text-center">
                    <Label>Secondary</Label>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border-2 border-stone-800 text-stone-800 px-8 py-3 uppercase tracking-widest text-xs transition-all hover:bg-stone-800 hover:text-white"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      View Collection
                    </motion.button>
                  </div>
                  {/* Ghost */}
                  <div className="text-center">
                    <Label>Ghost</Label>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="border border-neutral-300 text-neutral-700 px-8 py-3 uppercase tracking-widest text-xs transition-all hover:border-stone-700 hover:text-stone-700"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                  {/* Cream */}
                  <div className="text-center">
                    <Label>Accent / Cream</Label>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="px-8 py-3 uppercase tracking-widest text-xs transition-all hover:opacity-90"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em", backgroundColor: "#F5EDE0", color: "#3B1F10" }}
                    >
                      Discover
                    </motion.button>
                  </div>
                  {/* Text only */}
                  <div className="text-center">
                    <Label>Text / Link</Label>
                    <button
                      className="flex items-center gap-2 text-xs uppercase tracking-widest text-black border-b border-black hover:text-stone-600 hover:border-stone-600 transition-colors pb-0.5"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Button Sizes">
                <div className="flex flex-wrap gap-4 items-end">
                  {[
                    { label: "XS", cls: "px-4 py-1.5 text-xs" },
                    { label: "SM", cls: "px-6 py-2 text-xs" },
                    { label: "MD", cls: "px-8 py-3 text-xs" },
                    { label: "LG", cls: "px-10 py-4 text-sm" },
                    { label: "XL", cls: "px-14 py-5 text-sm" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <Label>{s.label}</Label>
                      <button
                        className={`bg-stone-800 text-white uppercase tracking-widest transition-colors hover:bg-stone-900 ${s.cls}`}
                        style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                      >
                        Button
                      </button>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Button States">
                <div className="flex flex-wrap gap-4 items-end">
                  {[
                    { label: "Default", cls: "bg-stone-800 text-white" },
                    { label: "Hover", cls: "bg-stone-900 text-white" },
                    { label: "Active", cls: "bg-stone-700 text-white scale-95" },
                    { label: "Disabled", cls: "bg-neutral-200 text-neutral-400 cursor-not-allowed" },
                    { label: "Loading", cls: "bg-stone-800 text-white opacity-70 cursor-wait" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <Label>{s.label}</Label>
                      <button
                        className={`px-8 py-3 uppercase tracking-widest text-xs transition-all ${s.cls}`}
                        style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                        disabled={s.label === "Disabled"}
                      >
                        {s.label === "Loading" ? "Loading…" : "Button"}
                      </button>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Icon Buttons & Special">
                <div className="flex flex-wrap gap-4 items-end">
                  <div className="text-center">
                    <Label>Icon + Label</Label>
                    <button
                      className="flex items-center gap-2 bg-stone-800 text-white px-6 py-3 uppercase tracking-widest text-xs hover:bg-stone-900 transition-colors"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Bag
                    </button>
                  </div>
                  <div className="text-center">
                    <Label>Icon Only</Label>
                    <button className="w-11 h-11 border border-neutral-300 flex items-center justify-center hover:border-stone-700 hover:text-stone-700 transition-all text-neutral-500">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center">
                    <Label>Full Width CTA</Label>
                    <button
                      className="w-64 bg-stone-800 text-white py-4 uppercase tracking-widest text-xs hover:bg-stone-900 transition-colors flex items-center justify-center gap-3"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      Add to Shopping Bag <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </SubSection>
            </DSSection>

            {/* ── BADGES & TAGS ────────────────────────────────── */}
            <DSSection id="badges" title="Badges & Tags">
              <SubSection title="Product Badges">
                <div className="flex flex-wrap gap-3 items-start">
                  {[
                    { label: "NEW IN", bg: "bg-stone-800", text: "text-white" },
                    { label: "SALE", bg: "bg-stone-700", text: "text-white" },
                    { label: "LIMITED", bg: "", text: "text-stone-800", border: "border border-stone-800", style: { backgroundColor: "#F5EDE0" } },
                    { label: "SOLD OUT", bg: "bg-neutral-200", text: "text-neutral-500" },
                    { label: "BESTSELLER", bg: "", text: "text-stone-700", border: "border border-stone-600", style: { backgroundColor: "#E8DDD2" } },
                    { label: "EXCLUSIVE", bg: "bg-black", text: "text-white" },
                    { label: "LOW STOCK", bg: "bg-amber-800", text: "text-white" },
                  ].map((b) => (
                    <span
                      key={b.label}
                      className={`px-3 py-1 text-xs tracking-widest ${b.bg} ${b.text} ${b.border ?? ""}`}
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em", ...(b.style ?? {}) }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Category Tags">
                <div className="flex flex-wrap gap-2">
                  {["Hoodies", "T-Shirts", "Jackets", "Accessories", "Limited Edition", "Capsule Collection", "Collab", "Art Print"].map((tag) => (
                    <button
                      key={tag}
                      className="px-4 py-2 border border-neutral-300 text-neutral-600 text-xs uppercase tracking-wider hover:border-stone-700 hover:text-stone-700 transition-all"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.1em" }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Status Indicators">
                <div className="flex flex-wrap gap-6">
                  {[
                    { dot: "bg-green-700", label: "In Stock", text: "text-green-800" },
                    { dot: "bg-amber-600", label: "Low Stock (3 left)", text: "text-amber-800" },
                    { dot: "bg-neutral-400", label: "Sold Out", text: "text-neutral-500" },
                    { dot: "bg-stone-600", label: "Pre-Order", text: "text-stone-700" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${s.dot}`} />
                      <span className={`text-sm ${s.text}`} style={{ fontFamily: "var(--font-sans)" }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Star Rating">
                <div className="flex flex-col gap-3">
                  {[5, 4, 3].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-stone-700 text-stone-700" : "text-neutral-300"}`} />
                        ))}
                      </div>
                      <span className="text-sm text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>{rating}.0 · {rating === 5 ? "128" : rating === 4 ? "64" : "21"} reviews</span>
                    </div>
                  ))}
                </div>
              </SubSection>
            </DSSection>

            {/* ── CARDS ────────────────────────────────────────── */}
            <DSSection id="cards" title="Cards">
              <SubSection title="Product Card">
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl">
                  {/* Standard */}
                  <motion.div whileHover={{ y: -4 }} className="group cursor-pointer bg-white border border-neutral-200 hover:border-stone-600 transition-all duration-300">
                    <div className="h-52 overflow-hidden" style={{ backgroundColor: "#E8DDD2" }}>
                      <div className="w-full h-full flex items-center justify-center relative">
                        <span className="text-stone-400 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>Product Image</span>
                        <span className="absolute top-3 left-3 bg-stone-800 text-white text-xs px-2 py-0.5 uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)" }}>New In</span>
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Heart className="w-3.5 h-3.5 text-neutral-600" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-sans)" }}>Collection Name</p>
                      <p className="text-lg text-black mb-2" style={{ fontFamily: "var(--font-serif)" }}>Baroque Hoodie Vol. III</p>
                      <div className="flex items-center justify-between">
                        <span className="text-black" style={{ fontFamily: "var(--font-serif)" }}>€ 185.00</span>
                        <div className="flex gap-1">
                          {["XS", "S", "M", "L"].map((sz) => (
                            <span key={sz} className="text-xs border border-neutral-200 px-1.5 py-0.5 text-neutral-400 hover:border-stone-600 hover:text-stone-700 cursor-pointer transition-all" style={{ fontFamily: "var(--font-sans)" }}>{sz}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Editorial */}
                  <motion.div whileHover={{ y: -4 }} className="group cursor-pointer bg-stone-900 hover:bg-stone-800 transition-all duration-300 col-span-1">
                    <div className="h-52 overflow-hidden" style={{ backgroundColor: "#3B1F10" }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-stone-600 text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>Campaign Image</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-stone-500 uppercase tracking-wider mb-1" style={{ fontFamily: "var(--font-sans)" }}>Limited Edition</p>
                      <p className="text-lg text-white mb-2" style={{ fontFamily: "var(--font-serif)" }}>Renaissance Drop</p>
                      <div className="flex items-center justify-between">
                        <span className="text-stone-300" style={{ fontFamily: "var(--font-serif)" }}>€ 240.00</span>
                        <span className="text-xs text-stone-400 uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)" }}>3 Left</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SubSection>

              <SubSection title="Content Cards">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Feature Card */}
                  <div className="bg-white border border-neutral-200 hover:border-stone-700 transition-all duration-300 p-8 group cursor-pointer">
                    <div className="w-10 h-10 border border-neutral-300 group-hover:border-stone-700 group-hover:bg-stone-700 transition-all mb-6 flex items-center justify-center">
                      <Star className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xl text-black mb-3" style={{ fontFamily: "var(--font-serif)" }}>Feature Card</p>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6" style={{ fontFamily: "var(--font-sans)" }}>
                      Navigation cards with icon, title, description, and a CTA link.
                    </p>
                    <div className="flex items-center text-xs uppercase tracking-wider text-black group-hover:text-stone-700 group-hover:translate-x-1 transition-all" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>
                      Explore <ArrowRight className="ml-2 w-3 h-3" />
                    </div>
                  </div>

                  {/* Info Card */}
                  <div className="border-l-4 border-stone-700 pl-6 py-4">
                    <p className="text-xs text-stone-600 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-sans)" }}>Design Note</p>
                    <p className="text-lg text-black mb-3" style={{ fontFamily: "var(--font-serif)" }}>Info / Callout Card</p>
                    <p className="text-sm text-neutral-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                      For highlighting brand insights, quotes, or design principles. Uses brand accent border.
                    </p>
                  </div>

                  {/* Dark Card */}
                  <div className="bg-stone-800 text-white p-8">
                    <p className="text-xs text-stone-400 uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-sans)" }}>Dark Variant</p>
                    <p className="text-xl text-white mb-3" style={{ fontFamily: "var(--font-serif)" }}>Dark Card</p>
                    <p className="text-sm text-stone-300 leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                      For featured sections, promotional content, or editorial blocks.
                    </p>
                  </div>
                </div>
              </SubSection>
            </DSSection>

            {/* ── FORM ELEMENTS ───────────────────────────────── */}
            <DSSection id="forms" title="Form Elements">
              <SubSection title="Text Inputs">
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
                  {/* Default */}
                  <div>
                    <Label>Default Input</Label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full border border-neutral-300 px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-stone-700 transition-colors bg-white"
                        style={{ fontFamily: "var(--font-sans)" }}
                      />
                    </div>
                  </div>

                  {/* With Icon */}
                  <div>
                    <Label>Search Input</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search collection…"
                        className="w-full border border-neutral-300 pl-10 pr-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-stone-700 transition-colors bg-white"
                        style={{ fontFamily: "var(--font-sans)" }}
                      />
                    </div>
                  </div>

                  {/* Select */}
                  <div>
                    <Label>Select / Dropdown</Label>
                    <div className="relative">
                      <select
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
                        className="w-full border border-neutral-300 px-4 py-3 text-sm text-black focus:outline-none focus:border-stone-700 transition-colors bg-white appearance-none"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        <option value="">Select Size</option>
                        <option>XS · 34</option>
                        <option>S · 36</option>
                        <option>M · 38</option>
                        <option>L · 40</option>
                        <option>XL · 42</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <Label>Textarea</Label>
                    <textarea
                      placeholder="Your message…"
                      rows={3}
                      className="w-full border border-neutral-300 px-4 py-3 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-stone-700 transition-colors bg-white resize-none"
                      style={{ fontFamily: "var(--font-sans)" }}
                    />
                  </div>
                </div>
              </SubSection>

              <SubSection title="Input States">
                <div className="grid md:grid-cols-4 gap-4 max-w-3xl">
                  {[
                    { label: "Default", cls: "border-neutral-300", placeholder: "Default state" },
                    { label: "Focus", cls: "border-stone-700 ring-1 ring-stone-300", placeholder: "Focused" },
                    { label: "Error", cls: "border-red-800", placeholder: "Invalid input" },
                    { label: "Disabled", cls: "border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed", placeholder: "Disabled" },
                  ].map((s) => (
                    <div key={s.label}>
                      <Label>{s.label}</Label>
                      <input
                        type="text"
                        placeholder={s.placeholder}
                        disabled={s.label === "Disabled"}
                        className={`w-full border px-4 py-3 text-sm focus:outline-none transition-colors bg-white ${s.cls}`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      />
                      {s.label === "Error" && (
                        <p className="text-xs text-red-800 mt-1" style={{ fontFamily: "var(--font-sans)" }}>This field is required</p>
                      )}
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Checkbox, Toggle & Quantity">
                <div className="flex flex-wrap gap-10 items-start">
                  {/* Checkboxes */}
                  <div>
                    <Label>Checkbox</Label>
                    <div className="space-y-3">
                      {["Notify me when back in stock", "Subscribe to new drops", "Accept terms & conditions"].map((item, i) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                          <div
                            className={`w-4 h-4 border transition-all flex items-center justify-center ${i === 0 ? "border-stone-700 bg-stone-700" : "border-neutral-300 group-hover:border-stone-500"}`}
                            onClick={() => setCheckboxChecked(!checkboxChecked)}
                          >
                            {i === 0 && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm text-neutral-700" style={{ fontFamily: "var(--font-sans)" }}>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Toggle */}
                  <div>
                    <Label>Toggle</Label>
                    <button
                      onClick={() => setToggleOn(!toggleOn)}
                      className={`relative w-12 h-6 transition-colors duration-200 ${toggleOn ? "bg-stone-700" : "bg-neutral-300"}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white transition-all duration-200 ${toggleOn ? "left-7" : "left-1"}`} />
                    </button>
                    <p className="text-xs text-neutral-500 mt-2" style={{ fontFamily: "var(--font-sans)" }}>
                      {toggleOn ? "Notifications On" : "Notifications Off"}
                    </p>
                  </div>

                  {/* Quantity Picker */}
                  <div>
                    <Label>Quantity Picker</Label>
                    <div className="flex items-center border border-neutral-300">
                      <button className="w-10 h-10 flex items-center justify-center hover:bg-stone-50 transition-colors border-r border-neutral-300">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-12 text-center text-sm" style={{ fontFamily: "var(--font-sans)" }}>1</span>
                      <button className="w-10 h-10 flex items-center justify-center hover:bg-stone-50 transition-colors border-l border-neutral-300">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </SubSection>
            </DSSection>

            {/* ── NAVIGATION ───────────────────────────────────── */}
            <DSSection id="navigation" title="Navigation">
              <SubSection title="Primary Navigation Bar">
                <div className="border border-neutral-200 bg-white">
                  <div className="flex items-center justify-between px-8 py-4">
                    <button className="text-neutral-500 hover:text-black transition-colors lg:hidden">
                      <Menu className="w-5 h-5" />
                    </button>
                    <nav className="hidden lg:flex items-center gap-8">
                      {["Women", "Men", "New In", "Collections"].map((item) => (
                        <a key={item} className="text-xs uppercase tracking-widest text-neutral-600 hover:text-black transition-colors cursor-pointer border-b border-transparent hover:border-black pb-0.5" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>
                          {item}
                        </a>
                      ))}
                    </nav>
                    <div style={{ width: '110px', height: '17px' }}>
                      <MovirteWordmark />
                    </div>
                    <div className="flex items-center gap-4">
                      <Search className="w-4 h-4 text-neutral-500 hover:text-black cursor-pointer transition-colors" />
                      <Heart className="w-4 h-4 text-neutral-500 hover:text-black cursor-pointer transition-colors" />
                      <div className="relative">
                        <ShoppingBag className="w-4 h-4 text-neutral-500 hover:text-black cursor-pointer transition-colors" />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-stone-700 text-white text-xs flex items-center justify-center">2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Breadcrumb">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}>
                  {["Home", "Women", "Hoodies", "Baroque Vol. III"].map((crumb, i, arr) => (
                    <div key={crumb} className="flex items-center gap-2">
                      <a className={`transition-colors cursor-pointer ${i === arr.length - 1 ? "text-black" : "text-neutral-400 hover:text-stone-700"}`}>{crumb}</a>
                      {i < arr.length - 1 && <span className="text-neutral-300">/</span>}
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Tabs">
                <div>
                  <div className="flex border-b border-neutral-200">
                    {["Description", "Size Guide", "Art Inspiration", "Reviews (42)"].map((tab, i) => (
                      <button
                        key={tab}
                        className={`px-6 py-3 text-xs uppercase tracking-wider transition-all border-b-2 -mb-px ${i === 0 ? "border-stone-700 text-black" : "border-transparent text-neutral-500 hover:text-black hover:border-stone-400"}`}
                        style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="bg-white border border-t-0 border-neutral-200 p-6">
                    <p className="text-sm text-neutral-600 leading-relaxed" style={{ fontFamily: "var(--font-sans)" }}>
                      Inspired by Baroque dynamism — heavy fabrics, dramatic silhouettes, and an embroidered botanical motif that recalls the still-life paintings of the Dutch Golden Age.
                    </p>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Pagination">
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 flex items-center justify-center border border-neutral-300 text-neutral-500 hover:border-stone-700 hover:text-stone-700 transition-all text-xs">‹</button>
                  {[1, 2, 3, "…", 8].map((p, i) => (
                    <button
                      key={i}
                      className={`w-9 h-9 flex items-center justify-center border text-xs transition-all ${p === 1 ? "border-stone-700 bg-stone-800 text-white" : "border-neutral-300 text-neutral-600 hover:border-stone-700 hover:text-stone-700"}`}
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="w-9 h-9 flex items-center justify-center border border-neutral-300 text-neutral-500 hover:border-stone-700 hover:text-stone-700 transition-all text-xs">›</button>
                </div>
              </SubSection>
            </DSSection>

            {/* ── UI PATTERNS ─────────────────────────────────── */}
            <DSSection id="patterns" title="UI Patterns">
              <SubSection title="Announcement Bar">
                <div className="bg-stone-800 text-white text-center py-2.5">
                  <p className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>
                    Free shipping on orders over €175 · New collection now live
                  </p>
                </div>
              </SubSection>

              <SubSection title="Hero Section Snippet">
                <div className="relative overflow-hidden h-64" style={{ backgroundColor: "#E8DDD2" }}>
                  <div className="absolute inset-0 flex flex-col items-start justify-center px-12">
                    <p className="text-xs uppercase tracking-widest text-stone-500 mb-3" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.2em" }}>New Collection — Spring 2026</p>
                    <h2 className="text-5xl text-stone-900 mb-6 leading-none" style={{ fontFamily: "var(--font-serif)" }}>Art in Motion</h2>
                    <button
                      className="bg-stone-800 text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-stone-900 transition-colors"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      Explore Now
                    </button>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center text-stone-400">
                    <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>Campaign Image</span>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Filter Bar">
                <div className="bg-white border border-neutral-200 p-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 border border-neutral-300 px-4 py-2 text-xs uppercase tracking-wider text-neutral-600 hover:border-stone-700 transition-all" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}>
                        <Filter className="w-3 h-3" /> Filter
                      </button>
                      {["All", "Women", "Men", "New In", "Sale"].map((f, i) => (
                        <button
                          key={f}
                          className={`px-4 py-2 text-xs uppercase tracking-wider transition-all ${i === 0 ? "bg-stone-800 text-white" : "text-neutral-600 hover:text-stone-700"}`}
                          style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-sans)" }}>48 products</span>
                      <div className="flex border border-neutral-200">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`w-8 h-8 flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-stone-800 text-white" : "text-neutral-400 hover:text-stone-700"}`}
                        >
                          <Grid className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`w-8 h-8 flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-stone-800 text-white" : "text-neutral-400 hover:text-stone-700"}`}
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Toast / Notification">
                <div className="space-y-3 max-w-sm">
                  {[
                    { icon: "✓", bg: "bg-stone-800", text: "text-white", msg: "Added to your bag — Baroque Hoodie Vol. III" },
                    { icon: "!", bg: "border border-amber-700", text: "text-amber-800", msg: "Only 2 left in your size. Order soon." },
                    { icon: "✗", bg: "border border-red-800", text: "text-red-800", msg: "This item is currently sold out." },
                  ].map((t, i) => (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 ${t.bg}`}>
                      <span className={`text-sm ${t.text}`}>{t.icon}</span>
                      <p className={`text-xs ${t.text}`} style={{ fontFamily: "var(--font-sans)" }}>{t.msg}</p>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Dividers">
                <div className="space-y-8 max-w-xl">
                  {[
                    { label: "Default", el: <div className="border-t border-neutral-200" /> },
                    { label: "Bold / Section", el: <div className="border-t-2 border-stone-800" /> },
                    { label: "Accent", el: <div className="border-t-2 border-stone-600" style={{ borderColor: "#6B3A2A" }} /> },
                    { label: "With Label", el: (
                      <div className="flex items-center gap-4">
                        <div className="flex-1 border-t border-neutral-200" />
                        <span className="text-xs uppercase tracking-widest text-neutral-400" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}>Or</span>
                        <div className="flex-1 border-t border-neutral-200" />
                      </div>
                    )},
                  ].map((d) => (
                    <div key={d.label}>
                      <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3" style={{ fontFamily: "var(--font-sans)" }}>{d.label}</p>
                      {d.el}
                    </div>
                  ))}
                </div>
              </SubSection>
            </DSSection>

            {/* ── MOTION & INTERACTION ────────────────────────── */}
            <DSSection id="motion" title="Motion & Interaction">
              <p className="text-neutral-600 mb-10 leading-relaxed max-w-2xl" style={{ fontFamily: "var(--font-sans)" }}>
                All animations should feel intentional and editorial — not flashy. Motion enhances the gallery experience: slow, deliberate, and graceful.
              </p>

              <SubSection title="Transition Speeds">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "Instant", duration: "0ms", usage: "Clicks, toggles" },
                    { label: "Fast", duration: "150ms", usage: "Tooltips, focus states" },
                    { label: "Base", duration: "300ms", usage: "Hover states, reveals" },
                    { label: "Slow", duration: "500ms", usage: "Page entries, hero" },
                  ].map((t) => (
                    <div key={t.label} className="bg-white border border-neutral-200 p-5">
                      <p className="text-sm text-black mb-1" style={{ fontFamily: "var(--font-sans)" }}>{t.label}</p>
                      <p className="text-2xl text-stone-700 mb-2" style={{ fontFamily: "var(--font-serif)" }}>{t.duration}</p>
                      <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-sans)" }}>{t.usage}</p>
                    </div>
                  ))}
                </div>
              </SubSection>

              <SubSection title="Hover Demonstrations">
                <div className="flex flex-wrap gap-6">
                  {/* Lift */}
                  <div className="text-center">
                    <Label>Lift (Cards)</Label>
                    <motion.div
                      whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                      transition={{ duration: 0.3 }}
                      className="w-32 h-24 bg-white border border-neutral-200 cursor-pointer flex items-center justify-center"
                    >
                      <span className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-sans)" }}>Hover me</span>
                    </motion.div>
                  </div>

                  {/* Scale */}
                  <div className="text-center">
                    <Label>Scale (Buttons)</Label>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-stone-800 text-white px-6 py-3 text-xs uppercase tracking-widest cursor-pointer"
                      style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.15em" }}
                    >
                      Press Me
                    </motion.button>
                  </div>

                  {/* Fade in */}
                  <div className="text-center">
                    <Label>Fade + Slide (Entry)</Label>
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.5 }}
                      className="w-32 h-24 bg-neutral-100 border border-neutral-200 flex items-center justify-center"
                    >
                      <span className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-sans)" }}>Scroll in</span>
                    </motion.div>
                  </div>

                  {/* Border reveal */}
                  <div className="text-center">
                    <Label>Border Reveal</Label>
                    <div className="w-32 h-24 bg-white border border-neutral-200 hover:border-stone-700 transition-all duration-300 cursor-pointer flex items-center justify-center">
                      <span className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-sans)" }}>Hover me</span>
                    </div>
                  </div>

                  {/* Arrow slide */}
                  <div className="text-center">
                    <Label>Arrow Slide (Links)</Label>
                    <div className="group flex items-center gap-2 cursor-pointer">
                      <span className="text-sm uppercase tracking-wider group-hover:text-stone-700 transition-colors" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.12em" }}>View All</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </SubSection>

              <SubSection title="Animation Principles">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { rule: "Easing", val: "ease-out preferred", note: "Feels natural, decelerating into rest" },
                    { rule: "Duration", val: "150–500ms", note: "Short for micro, long for page-level" },
                    { rule: "Stagger", val: "40–80ms delay", note: "Card grids, list items entering view" },
                    { rule: "Direction", val: "Bottom-up / Fade", note: "Content enters from below, fades in" },
                    { rule: "Never", val: "Bounce / Spring", note: "Too playful for the brand aesthetic" },
                    { rule: "Scroll", val: "whileInView once:true", note: "Animate on scroll, don't repeat" },
                  ].map((p) => (
                    <div key={p.rule} className="border border-neutral-200 bg-white p-5">
                      <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1" style={{ fontFamily: "var(--font-sans)" }}>{p.rule}</p>
                      <p className="text-base text-black mb-2" style={{ fontFamily: "var(--font-serif)" }}>{p.val}</p>
                      <p className="text-xs text-neutral-500" style={{ fontFamily: "var(--font-sans)" }}>{p.note}</p>
                    </div>
                  ))}
                </div>
              </SubSection>
            </DSSection>

            {/* Footer */}
            <div className="pt-12 border-t-2 border-stone-800 mt-12">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500 mb-1" style={{ fontFamily: "var(--font-sans)" }}>MOVIRTE Design System</p>
                  <p className="text-xs text-neutral-400" style={{ fontFamily: "var(--font-sans)" }}>Version 1.0 — Last Updated February 2026</p>
                </div>
                <p className="text-2xl italic text-neutral-300" style={{ fontFamily: "var(--font-serif)" }}>"Where art meets motion."</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
