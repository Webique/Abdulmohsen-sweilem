import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import logo from '@/assets/logo.png';

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'biography', href: '#biography' },
  { key: 'works', href: '#works' },
  { key: 'collectedWorks', href: '#collected-works' },
  { key: 'exhibitions', href: '#exhibitions' },
  { key: 'photos', href: '#photos' },
  { key: 'contact', href: '#contact' },
];

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    // Scroll to top when language changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'nav-glass shadow-soft' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-2 shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Bigger logo container + safe max width so it never breaks layout */}
            <div
              className="
    h-12 sm:h-14 md:h-16 lg:h-20
    w-auto
    max-w-[320px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px]
    flex items-center
  "
            >
              <img
                src={logo}
                alt={isRTL ? 'عبدالمحسن السويلم' : 'Abdulmohsen AlSwailem'}
                className="h-full w-auto object-contain"
              />
            </div>

          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                whileHover={{ y: -1 }}
              >
                {t(`nav.${item.key}`)}
              </motion.a>
            ))}
          </div>

          {/* Theme Toggle, Language Toggle & Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <ThemeToggle />

            <motion.button
              onClick={toggleLanguage}
              className="px-2.5 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm font-medium border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {i18n.language === 'ar' ? 'EN' : 'عربي'}
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="block py-3 text-foreground hover:text-secondary transition-colors border-b border-border/50 last:border-0"
                >
                  {t(`nav.${item.key}`)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
