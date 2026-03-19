import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { config } = useConfig();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-surface)] py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Company Info Footer Section (similar to SQM) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 pb-12 border-b border-neutral-800">
          <div className="flex flex-col space-y-6">
            {config?.contact && (
              <div className="text-sm text-gray-400 leading-relaxed space-y-4">
                <p>
                  KRS: {config.contact.companyDetails.krs}<br/>
                  NIP: {config.contact.companyDetails.nip}<br/>
                  REGON: {config.contact.companyDetails.regon}
                </p>
                <p>
                  {config.contact.companyDetails.name}<br/>
                  {config.contact.address.line1}<br/>
                  {config.contact.address.line2}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-semibold tracking-tighter uppercase">
              Daruma<span className="text-[var(--color-accent)]">.</span>
            </span>
            <span className="text-gray-500 text-sm ml-4">
              &copy; {currentYear} {t('footer.rights')}
            </span>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#about" className="hover:text-[var(--color-surface)] transition-colors">{t('nav.about')}</a>
              <a href="#services" className="hover:text-[var(--color-surface)] transition-colors">{t('nav.services')}</a>
              <a href="#approach" className="hover:text-[var(--color-surface)] transition-colors">{t('nav.approach')}</a>
              <a href="#contact" className="hover:text-[var(--color-surface)] transition-colors">{t('nav.contact')}</a>
            </div>

            <div className="w-px h-4 bg-neutral-700"></div>

            <button
              onClick={toggleLanguage}
              className="flex items-center text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
            >
              <span className={i18n.language === 'pl' ? 'text-[var(--color-surface)]' : 'text-gray-500'}>PL</span>
              <span className="mx-1 text-gray-600">/</span>
              <span className={i18n.language === 'en' ? 'text-[var(--color-surface)]' : 'text-gray-500'}>EN</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}