import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SitemapNodeProps {
  title: string;
  icon?: string;
  children?: React.ReactNode;
  level?: number;
}

export function SitemapNode({ title, icon, children, level = 0 }: SitemapNodeProps) {
  const [isOpen, setIsOpen] = useState(level < 2);

  const hasChildren = !!children;

  return (
    <div className="ml-8">
      <div
        className={`flex items-center gap-3 py-3 px-4 border-b border-neutral-200 cursor-pointer hover:bg-neutral-50 transition-colors duration-300`}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
      >
        {hasChildren && (
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="w-3 h-3 text-neutral-400" />
          </motion.div>
        )}
        {!hasChildren && <div className="w-3" />}
        {icon && <span className="text-base opacity-60">{icon}</span>}
        <span className={`${level === 0 ? 'text-base' : level === 1 ? 'text-sm' : 'text-sm'} text-neutral-900 tracking-wide`} style={{ fontFamily: level <= 1 ? 'var(--font-serif)' : 'var(--font-sans)' }}>
          {title}
        </span>
      </div>
      <AnimatePresence>
        {isOpen && children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}