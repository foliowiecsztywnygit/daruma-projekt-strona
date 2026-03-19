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
            className="relative h-full min-h-[400px] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-dark-accent)] to-[var(--color-accent)] opacity-20 mix-blend-overlay"></div>
            <div className="w-full h-full bg-neutral-800 flex items-center justify-center border border-neutral-700">
              {/* Abstract geometric shape representing structure/architecture */}
              <div className="relative w-64 h-64">
                <motion.div 
                  initial={{ height: "0%" }}
                  whileInView={{ height: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-1/3 bg-[var(--color-accent)]"
                ></motion.div>
                <motion.div 
                  initial={{ height: "0%" }}
                  whileInView={{ height: "60%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                  className="absolute bottom-0 left-1/3 w-1/3 bg-[var(--color-dark-accent)]"
                ></motion.div>
                <motion.div 
                  initial={{ height: "0%" }}
                  whileInView={{ height: "80%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.9, ease: "easeInOut" }}
                  className="absolute bottom-0 right-0 w-1/3 bg-neutral-600"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}