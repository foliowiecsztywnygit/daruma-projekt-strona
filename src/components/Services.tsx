import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    { id: 'halls', key: 'services.items.halls' },
    { id: 'buildings', key: 'services.items.buildings' },
    { id: 'inventories', key: 'services.items.inventories' },
    { id: 'extensions', key: 'services.items.extensions' },
    { id: 'demolitions', key: 'services.items.demolitions' },
    { id: 'analyses', key: 'services.items.analyses' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
    },
  };

  return (
    <section id="services" className="py-32 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-accent)] uppercase mb-4">
            {t('services.title')}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative"
            >
              <div className="text-4xl font-light text-gray-200 mb-6 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                0{index + 1}
              </div>
              <h3 className="text-xl font-medium mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {t(`${service.key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t(`${service.key}.desc`)}
              </p>
              
              {/* Subtle hover line */}
              <div className="absolute -bottom-6 left-0 w-0 h-px bg-[var(--color-accent)] transition-all duration-500 group-hover:w-full"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}