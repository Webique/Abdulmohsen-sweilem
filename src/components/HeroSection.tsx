import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { socialLinks } from '@/data/artistData';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Text reveal animation - character by character
const AnimatedText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(' ');

  return (
    <motion.span className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mx-1">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: delay + wordIndex * 0.1,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const portraitSrc = '/images/artist.webp';
  const sectionRef = useRef(null);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-start md:items-center justify-center paper-texture overflow-hidden pt-24 pb-16 md:pt-0 md:pb-0"
    >
      {/* Parallax background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-paper"
        style={{ y: backgroundY }}
      />

      {/* Animated ambient light */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 30% 50%, hsl(43 74% 49% / 0.15) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 50% at 70% 50%, hsl(43 74% 49% / 0.15) 0%, transparent 70%)',
            'radial-gradient(ellipse 80% 50% at 30% 50%, hsl(43 74% 49% / 0.15) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            style={{ y: textY }}
            className={`flex flex-col-reverse items-center gap-10 md:gap-16 ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'
              }`}
          >
            {/* Portrait with parallax scale */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ scale: imageScale, opacity: imageOpacity }}
              className={`w-full md:w-5/12 flex justify-center ${isRTL ? 'md:justify-start' : 'md:justify-end'
                }`}
            >
              <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[4/5] border border-secondary/40 bg-gradient-to-b from-muted/60 to-muted/20 shadow-soft p-2">
                <div className="w-full h-full overflow-hidden">
                  <img
                    src={portraitSrc}
                    alt="Abdulmohsen AlSwailem portrait"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text content */}
            <div
              className={`w-full md:w-7/12 text-center ${isRTL ? 'md:text-right' : 'md:text-left'
                }`}
            >
              {/* Title with character reveal animation */}
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight overflow-hidden">
                <AnimatedText text={t('hero.title')} delay={0.3} />
              </h1>

              {/* Subtitle - only show if not empty */}
              {t('hero.subtitle') && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto md:mx-0"
                >
                  {t('hero.subtitle')}
                </motion.p>
              )}

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <motion.button
                  onClick={() => scrollToSection('#works')}
                  className="btn-primary"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('hero.viewWorks')}
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('#contact')}
                  className="btn-secondary"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('hero.contact')}
                </motion.button>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex gap-4 mt-8 justify-center md:justify-start"
              >
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-muted/50 text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={link.platform}
                  >
                    {link.icon === 'instagram' ? (
                      <Instagram size={20} />
                    ) : link.icon === 'twitter' ? (
                      <XIcon />
                    ) : null}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <motion.div
            animate={{ height: ['20%', '40%', '20%'], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 bg-secondary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
