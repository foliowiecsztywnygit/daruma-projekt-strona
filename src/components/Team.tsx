import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';
import type { TeamMember } from '../context/ConfigContext';

export default function Team() {
  const { t, i18n } = useTranslation();
  const { config } = useConfig();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  if (!config || !config.team || config.team.length === 0) return null;

  const currentLang = i18n.language as 'pl' | 'en';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="team" className="bg-[var(--color-secondary)] relative" style={{ padding: 'var(--spacing-section-y) 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-accent)] uppercase mb-4">
            {currentLang === 'pl' ? 'Nasz Zespół' : 'Our Team'}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
        >
          {config.team.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="overflow-hidden aspect-[3/4] mb-6 relative bg-[var(--color-surface)]">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-neutral-800">
                    <svg className="w-20 h-20 text-gray-400 dark:text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-medium mb-1 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm text-[var(--color-accent)] mb-3">
                {member.position[currentLang] || member.position.en}
              </p>
              <p className="text-gray-500 text-sm line-clamp-2">
                {member.shortDescription[currentLang] || member.shortDescription.en}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--color-surface)] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-[var(--color-primary)] transition-colors p-2"
                onClick={() => setSelectedMember(null)}
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="md:w-2/5 lg:w-1/3 h-64 md:h-auto shrink-0 relative bg-[var(--color-surface)]">
                {selectedMember.photo ? (
                  <img
                    src={selectedMember.photo}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                ) : (
                  <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-neutral-800">
                    <svg className="w-32 h-32 text-gray-400 dark:text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-medium mb-2">{selectedMember.name}</h3>
                <p className="text-[var(--color-accent)] font-medium tracking-wide text-sm uppercase mb-8">
                  {selectedMember.position[currentLang] || selectedMember.position.en}
                </p>
                
                <div className="prose prose-lg text-gray-600 mb-8 max-w-none">
                  <p className="leading-relaxed">
                    {selectedMember.bio[currentLang] || selectedMember.bio.en}
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  {selectedMember.phone && (
                    <a
                      href={`tel:${selectedMember.phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
                    >
                      <span className="text-[var(--color-accent)] mr-2">T:</span> {selectedMember.phone}
                    </a>
                  )}
                  {selectedMember.email && (
                    <a
                      href={`mailto:${selectedMember.email}`}
                      className="inline-flex items-center text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
                    >
                      <span className="text-[var(--color-accent)] mr-2">E:</span> {selectedMember.email}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}