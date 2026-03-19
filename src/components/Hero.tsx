import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useConfig } from '../context/ConfigContext';

export default function Hero() {
  const { t } = useTranslation();
  const { config } = useConfig();

  const videoUrl = config?.theme?.hero?.videoUrl;
  const overlayOpacity = config?.theme?.hero?.overlayOpacity ?? 0.6;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      {/* Video Background */}
      {videoUrl && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {/* Configurable dark overlay to ensure text readability */}
          <div 
            className="absolute inset-0 bg-black pointer-events-none" 
            style={{ opacity: overlayOpacity }}
          ></div>
        </>
      )}

      {/* Fallback gradients if no video */}
      {!videoUrl && (
        <>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-secondary)] to-transparent opacity-50 pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] tracking-tight mb-8 text-balance text-white"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mb-12 leading-relaxed font-light"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-black text-sm font-medium tracking-wide hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300"
            >
              {t('hero.cta')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}