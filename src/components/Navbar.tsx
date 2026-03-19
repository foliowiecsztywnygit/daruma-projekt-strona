import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.approach'), href: '#approach' },
    { name: t('nav.team'), href: '#team' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--color-surface)]/90 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-3 items-center">
        {/* Logo - Left */}
        <div className="flex justify-start">
          <a href="#" className={`text-2xl font-semibold tracking-tighter uppercase ${!isScrolled ? 'text-white' : 'text-[var(--color-primary)]'}`}>
            Daruma<span className="text-[var(--color-accent)]">.</span>
          </a>
        </div>

        {/* Desktop Nav - Middle */}
        <div className="hidden md:flex justify-center">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors group ${!isScrolled ? 'text-white/90 hover:text-white' : 'text-[var(--color-primary)] hover:text-[var(--color-accent)]'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${!isScrolled ? 'bg-white' : 'bg-[var(--color-accent)]'}`}></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions - Right */}
        <div className="hidden md:flex justify-end items-center space-x-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${!isScrolled ? 'text-white hover:bg-white/10' : 'text-[var(--color-primary)] hover:bg-black/5 dark:hover:bg-white/10'}`}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className={`w-px h-4 ${!isScrolled ? 'bg-white/30' : 'bg-gray-300 dark:bg-gray-700'}`}></div>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center text-sm font-medium hover:text-[var(--color-accent)] transition-colors ${!isScrolled ? 'text-white' : 'text-[var(--color-primary)]'}`}
          >
            <span className={i18n.language === 'pl' ? 'font-bold' : 'opacity-60'}>PL</span>
            <span className="mx-1 opacity-60">/</span>
            <span className={i18n.language === 'en' ? 'font-bold' : 'opacity-60'}>EN</span>
          </button>
        </div>

        {/* Mobile Menu Toggle - Right */}
        <div className="md:hidden flex justify-end col-span-2">
          <button
            className={!isScrolled ? 'text-white' : 'text-[var(--color-primary)]'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[var(--color-surface)] shadow-lg py-4 px-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center text-lg font-medium text-[var(--color-primary)]"
              >
                <span className={i18n.language === 'pl' ? 'font-bold' : 'opacity-60'}>PL</span>
                <span className="mx-2 opacity-60">/</span>
                <span className={i18n.language === 'en' ? 'font-bold' : 'opacity-60'}>EN</span>
              </button>

              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 rounded-full text-[var(--color-primary)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}