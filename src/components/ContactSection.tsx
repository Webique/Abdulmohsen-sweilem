import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Mail, Instagram } from 'lucide-react';
import { socialLinks, contactEmail } from '@/data/artistData';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-padding paper-texture" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="gold-underline">{t('contact.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="elegant-card p-8 md:p-12 text-center">
            {/* Email Section */}
            <motion.div
              className="mb-10"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                <Mail size={28} />
              </div>
              <p className="text-sm text-muted-foreground mb-2">{t('contact.email')}</p>
              <motion.a 
                href={`mailto:${contactEmail}`}
                className="text-xl md:text-2xl font-medium text-foreground hover:text-secondary transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {contactEmail}
              </motion.a>
            </motion.div>

            {/* Divider */}
            <div className="relative mb-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-card text-muted-foreground text-sm">
                  {isRTL ? 'أو' : 'or'}
                </span>
              </div>
            </div>

            {/* Social Links Section */}
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                {isRTL ? 'تابعني على' : 'Follow me on'}
              </p>
              <div className="flex items-center justify-center gap-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <motion.div
                      className="p-4 rounded-full bg-muted text-muted-foreground group-hover:text-secondary group-hover:bg-secondary/10 transition-all"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon === 'instagram' ? <Instagram size={28} /> : <XIcon />}
                    </motion.div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.platform}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
