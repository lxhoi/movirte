import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

interface FlowStepProps {
  title: string;
  description?: string;
  items?: string[];
  bgColor?: string;
  delay?: number;
  showArrow?: boolean;
}

export function FlowStep({
  title,
  description,
  items,
  bgColor = "bg-neutral-900",
  delay = 0,
  showArrow = true,
}: FlowStepProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        className={`${bgColor} border border-neutral-800 p-10 text-white max-w-3xl mx-auto`}
      >
        <h3 className="text-3xl mb-4 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h3>
        {description && <p className="text-neutral-300 mb-4 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>{description}</p>}
        {items && items.length > 0 && (
          <ul className="space-y-3 mt-6">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-neutral-500 mt-1">—</span>
                <span className="text-neutral-200 tracking-wide" style={{ fontFamily: 'var(--font-sans)' }}>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
      {showArrow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="flex justify-center my-8"
        >
          <ArrowDown className="w-6 h-6 text-neutral-400" />
        </motion.div>
      )}
    </>
  );
}