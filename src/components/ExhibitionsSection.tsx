import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import { exhibitions } from '@/data/artistData';

const ExhibitionsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="exhibitions" className="section-padding paper-texture" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="gold-underline">{t('exhibitions.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('exhibitions.subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            {/* Timeline line */}
            <div className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-secondary to-secondary/20 ${isRTL ? 'right-4' : 'left-4'}`} />
            
            <div className="space-y-6">
              {exhibitions.map((exhibition, index) => (
                <motion.div
                  key={exhibition.id}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.05,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative ${isRTL ? 'pr-12' : 'pl-12'}`}
                >
                  {/* Timeline dot with pulse animation */}
                  <motion.div 
                    className={`absolute top-2 w-4 h-4 rounded-full border-2 border-secondary bg-background ${isRTL ? 'right-2' : 'left-2'}`}
                    whileHover={{ scale: 1.3 }}
                    animate={{ 
                      boxShadow: index === exhibitions.length - 1 
                        ? ['0 0 0 0 hsl(43 74% 49% / 0.4)', '0 0 0 10px hsl(43 74% 49% / 0)', '0 0 0 0 hsl(43 74% 49% / 0.4)']
                        : 'none'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  <div className="elegant-card p-4 md:p-5 hover:shadow-gold transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar size={16} className="text-secondary" />
                      <span className="font-semibold text-secondary">{exhibition.year}</span>
                    </div>
                    <p className="text-foreground">
                      {isRTL ? exhibition.title.ar : exhibition.title.en}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Placeholder Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            {t('exhibitions.mediaPlaceholder')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="elegant-card aspect-video flex items-center justify-center text-muted-foreground"
              >
                <ImageIcon size={32} />
              </div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ExhibitionsSection;