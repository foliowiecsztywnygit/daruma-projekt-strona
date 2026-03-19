import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-32 bg-[var(--color-secondary)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-accent)] uppercase mb-8">
            {t('nav.about')}
          </h2>
          <p className="text-3xl md:text-5xl font-medium leading-tight text-balance">
            {t('about.text')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}