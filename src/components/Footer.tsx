import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';
import { socialLinks } from '@/data/artistData';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'biography', href: '#biography' },
  { key: 'works', href: '#works' },
  { key: 'exhibitions', href: '#exhibitions' },
  { key: 'photos', href: '#photos' },
  { key: 'contact', href: '#contact' },
];

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1a2028] text-white relative overflow-hidden">
      {/* Decorative animated elements */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        animate={{ 
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Top Section */}
        <div className="py-12 md:py-16 border-b border-white/10">
          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {/* Brand */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-start"
            >
              <h3 className="text-xl font-bold mb-2">
                {isRTL ? 'عبدالمحسن السويلم' : 'Abdulmohsen AlSwailem'}
              </h3>
              <p className="text-sm text-white/60">
                {isRTL ? 'فنان تشكيلي سعودي' : 'Saudi Visual Artist'}
              </p>
            </motion.div>

            {/* Navigation Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
                {isRTL ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className="text-sm text-white/60 hover:text-secondary transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ y: -2 }}
                  >
                    {t(`nav.${item.key}`)}
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-end"
            >
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
                {isRTL ? 'تابعني' : 'Follow'}
              </h4>
              <div className="flex items-center justify-center md:justify-end gap-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-white/10 hover:bg-secondary hover:text-secondary-foreground transition-all"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon === 'instagram' ? <Instagram size={18} /> : <XIcon />}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/50">
            © {currentYear} {t('footer.rights')}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-white/50">
            {t('footer.madeWith')}{' '}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              <Heart size={14} className="text-secondary fill-secondary" />
            </motion.span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
