import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Approach() {
  const { t } = useTranslation();

  return (
    <section id="approach" className="py-32 bg-[var(--color-primary)] text-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-sm font-semibold tracking-widest text-[var(--color-accent)] uppercase mb-8">
              {t('approach.title')}
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-balance">
              {t('approach.text')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full min-h-[400px] w-full bg-[var(--color-surface)] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center overflow-hidden"
          >
            {/* Minimalist Stock Market Line Graph SVG */}
            <svg 
              viewBox="0 0 800 400" 
              className="w-full h-full p-8"
              preserveAspectRatio="none"
            >
              {/* Subtle X and Y axis lines */}
              <line x1="40" y1="360" x2="760" y2="360" stroke="currentColor" strokeWidth="1" className="text-gray-200 dark:text-neutral-800" />
              <line x1="40" y1="40" x2="40" y2="360" stroke="currentColor" strokeWidth="1" className="text-gray-200 dark:text-neutral-800" />

              {/* Smooth upward trending line graph */}
              {/* Note: Instead of animating pathLength, we draw the whole path and animate the clip-path to reveal it left-to-right, so the arrow can travel with the leading edge. */}
              <defs>
                <linearGradient id="graph-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                </linearGradient>
              </defs>

              <motion.g
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 0.5
                }}
              >
                {/* The main curve */}
                <path
                  d="M 40 320 C 100 320, 120 280, 180 250 C 240 220, 260 260, 320 200 C 380 140, 400 180, 460 120 C 520 60, 540 100, 600 80 C 660 60, 700 40, 760 40"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* The gradient fill */}
                <path
                  d="M 40 320 C 100 320, 120 280, 180 250 C 240 220, 260 260, 320 200 C 380 140, 400 180, 460 120 C 520 60, 540 100, 600 80 C 660 60, 700 40, 760 40 L 760 360 L 40 360 Z"
                  fill="url(#graph-gradient)"
                  className="opacity-10 dark:opacity-20"
                />
              </motion.g>

              {/* The travelling arrowhead */}
              {/* We use an independent motion block that animates its motion path along the curve over the exact same duration */}
              <motion.path
                d="M -8 -6 L 8 0 L -8 6 z"
                fill="var(--color-primary)"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                  duration: 4, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "loop",
                  repeatDelay: 0.5
                }}
                style={{
                  offsetPath: 'path("M 40 320 C 100 320, 120 280, 180 250 C 240 220, 260 260, 320 200 C 380 140, 400 180, 460 120 C 520 60, 540 100, 600 80 C 660 60, 700 40, 760 40")',
                  offsetRotate: "auto"
                }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}