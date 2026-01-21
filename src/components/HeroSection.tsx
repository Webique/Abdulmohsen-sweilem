import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { socialLinks } from '@/data/artistData';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const portraitSrc = '/images/artist.jpeg';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-start md:items-center justify-center paper-texture overflow-hidden pt-24 pb-16 md:pt-0 md:pb-0"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-paper" />
      
      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-secondary/20"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
      
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, hsl(43 74% 49% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 50%, hsl(43 74% 49% / 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 50%, hsl(43 74% 49% / 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div
            className={`flex flex-col-reverse items-center gap-10 md:gap-16 ${
              isRTL ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.6 }}
              className={`w-full md:w-5/12 flex justify-center ${
                isRTL ? 'md:justify-start' : 'md:justify-end'
              }`}
            >
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[4/5] rounded-[32px] border border-secondary/40 bg-gradient-to-b from-muted/60 to-muted/20 shadow-soft p-2">
                <div className="w-full h-full rounded-[26px] overflow-hidden">
                  <img
                    src={portraitSrc}
                    alt="Abdulmohsen AlSwailem portrait"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
            <div
              className={`w-full md:w-7/12 text-center ${
                isRTL ? 'md:text-right' : 'md:text-left'
              }`}
            >
              {/* Title with text reveal animation */}
              <motion.h1
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
              >
                {t('hero.title')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto md:mx-0"
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-12 justify-center w-full sm:w-auto ${
                  isRTL ? 'md:justify-end' : 'md:justify-start'
                }`}
              >
                <motion.button
                  onClick={() => scrollToSection('#works')}
                  className="btn-primary w-full sm:w-auto min-w-[160px] sm:min-w-[180px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('hero.viewWorks')}
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-secondary w-full sm:w-auto min-w-[160px] sm:min-w-[180px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('hero.contact')}
                </motion.button>
              </motion.div>

              {/* Social Icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className={`flex gap-4 justify-center ${
                  isRTL ? 'md:justify-end' : 'md:justify-start'
                }`}
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card text-muted-foreground hover:text-secondary hover:bg-card/80 transition-all shadow-soft"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon === 'instagram' ? <Instagram size={20} /> : <XIcon />}
                  </motion.a>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#biography">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-secondary rounded-full" />
        </div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
