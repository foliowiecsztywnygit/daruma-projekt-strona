import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

export default function Contact() {
  const { t } = useTranslation();
  const { config } = useConfig();

  const email = config?.contact?.email || 'kontakt@darumaprojekt.pl';
  const phone = config?.contact?.phone || '+48 000 000 000';
  const location = config?.contact?.address?.city || t('contact.location_value');

  return (
    <section id="contact" className="py-32 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-sm font-semibold tracking-widest text-[var(--color-accent)] uppercase mb-4">
            {t('contact.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-12">
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-2">{t('contact.email')}</h3>
                <a href={`mailto:${email}`} className="text-2xl font-medium hover:text-[var(--color-accent)] transition-colors">
                  {email}
                </a>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-2">{t('contact.phone')}</h3>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-2xl font-medium hover:text-[var(--color-accent)] transition-colors">
                  {phone}
                </a>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-widest mb-2">{t('contact.location')}</h3>
                <p className="text-2xl font-medium">
                  {location}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()} noValidate>
              <div className="relative border-b border-gray-300 focus-within:border-[var(--color-accent)] transition-colors duration-300">
                <input 
                  type="text" 
                  id="name" 
                  placeholder=" " 
                  className="peer w-full bg-transparent py-4 text-lg focus:outline-none"
                  required
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-gray-400 text-lg transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--color-accent)] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs"
                >
                  {t('contact.form.name')}
                </label>
              </div>

              <div className="relative border-b border-gray-300 focus-within:border-[var(--color-accent)] transition-colors duration-300">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" " 
                  className="peer w-full bg-transparent py-4 text-lg focus:outline-none"
                  required
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-0 top-4 text-gray-400 text-lg transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--color-accent)] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs"
                >
                  {t('contact.form.email')}
                </label>
              </div>

              <div className="relative border-b border-gray-300 focus-within:border-[var(--color-accent)] transition-colors duration-300">
                <textarea 
                  id="message" 
                  placeholder=" " 
                  rows={4}
                  className="peer w-full bg-transparent py-4 text-lg focus:outline-none resize-none"
                  required
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-gray-400 text-lg transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[var(--color-accent)] peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs"
                >
                  {t('contact.form.message')}
                </label>
              </div>

              <button 
                type="submit"
                className="group flex items-center justify-between w-full py-4 text-lg font-medium border-b border-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                <span>{t('contact.form.submit')}</span>
                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}