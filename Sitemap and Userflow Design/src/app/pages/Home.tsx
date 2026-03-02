import { Link } from "react-router";
import { Map, GitBranch, ArrowRight, BookOpen, Layers } from "lucide-react";
import { motion } from "motion/react";
import MIcon from "../../imports/Layer1";
import MovirteWordmark from "../../imports/MovirteWordmark";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          {/* M Icon + Wordmark stacked */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div style={{ width: '56px', height: '40px' }}>
              <MIcon />
            </div>
            <div style={{ width: '400px', height: '61px' }}>
              <MovirteWordmark />
            </div>
          </div>
          <p className="text-lg text-neutral-600 tracking-wide uppercase" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em' }}>
            Site Architecture & Brand Guidelines
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Sitemap Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/sitemap">
              <div className="bg-white border border-neutral-200 hover:border-stone-700 transition-all duration-500 p-12 h-full group cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 border border-neutral-300 group-hover:border-stone-700 group-hover:bg-stone-700 transition-all mb-8">
                  <Map className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-4xl text-black mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  Sitemap
                </h2>
                <p className="text-neutral-600 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  Explore the complete site structure with interactive navigation
                  hierarchy showing all pages, categories, and sections.
                </p>
                <div className="flex items-center text-black group-hover:text-stone-700 uppercase tracking-wider text-sm group-hover:translate-x-2 transition-all" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}>
                  View Sitemap
                  <ArrowRight className="ml-3 w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* User Flow Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/userflow">
              <div className="bg-white border border-neutral-200 hover:border-stone-700 transition-all duration-500 p-12 h-full group cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 border border-neutral-300 group-hover:border-stone-700 group-hover:bg-stone-700 transition-all mb-8">
                  <GitBranch className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-4xl text-black mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  User Flow
                </h2>
                <p className="text-neutral-600 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  Follow the complete customer journey from landing to purchase,
                  including all touchpoints and decision paths.
                </p>
                <div className="flex items-center text-black group-hover:text-stone-700 uppercase tracking-wider text-sm group-hover:translate-x-2 transition-all" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}>
                  View User Flow
                  <ArrowRight className="ml-3 w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Brand Guidelines Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/brand-guidelines">
              <div className="bg-white border border-neutral-200 hover:border-stone-700 transition-all duration-500 p-12 h-full group cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 border border-neutral-300 group-hover:border-stone-700 group-hover:bg-stone-700 transition-all mb-8">
                  <BookOpen className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-4xl text-black mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  Brand Guidelines
                </h2>
                <p className="text-neutral-600 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  Comprehensive brand identity system including logo usage, colors,
                  typography, and design principles.
                </p>
                <div className="flex items-center text-black group-hover:text-stone-700 uppercase tracking-wider text-sm group-hover:translate-x-2 transition-all" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}>
                  View Guidelines
                  <ArrowRight className="ml-3 w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Design System Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/design-system">
              <div className="bg-white border border-neutral-200 hover:border-stone-700 transition-all duration-500 p-12 h-full group cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 border border-neutral-300 group-hover:border-stone-700 group-hover:bg-stone-700 transition-all mb-8">
                  <Layers className="w-6 h-6 text-black group-hover:text-white transition-colors" />
                </div>
                <h2 className="text-4xl text-black mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  Design System
                </h2>
                <p className="text-neutral-600 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  Full UI component library, design tokens, spacing scale,
                  patterns and motion guidelines for the frontend.
                </p>
                <div className="flex items-center text-black group-hover:text-stone-700 uppercase tracking-wider text-sm group-hover:translate-x-2 transition-all" style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}>
                  View System
                  <ArrowRight className="ml-3 w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20 text-neutral-400 text-sm uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.15em' }}
        >
          <p>Click on any card to explore</p>
        </motion.div>
      </div>
    </div>
  );
}