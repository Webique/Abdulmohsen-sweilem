import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { exhibitions } from '@/data/artistData';

const ExhibitionsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Only show exhibitions that have photos
  const exhibitionsWithPhotos = exhibitions.filter(
    (e) => e.photos && e.photos.length > 0
  );

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

        {/* Stacked Layout */}
        <div className="max-w-4xl mx-auto space-y-12">
          {exhibitionsWithPhotos.map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
              }}
            >
              {/* Title Header — clickable */}
              <Link
                to={`/exhibitions/${exhibition.id}`}
                className="mb-4 flex items-center gap-3 flex-wrap group"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-secondary transition-colors">
                  {isRTL ? exhibition.title.ar : exhibition.title.en}
                </h3>
                <span className="px-3 py-1 bg-secondary/15 text-secondary text-sm font-semibold rounded-full">
                  {exhibition.year}
                </span>
              </Link>

              {/* Thumbnail — clickable */}
              <Link
                to={`/exhibitions/${exhibition.id}`}
                className="block group overflow-hidden bg-card border border-border hover:border-secondary/50 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={exhibition.photos![0]}
                    alt={isRTL ? exhibition.title.ar : exhibition.title.en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-full">
                      {isRTL ? 'عرض الكل' : 'View All'}
                    </span>
                  </div>

                  {/* Media count badge */}
                  {((exhibition.photos?.length || 0) + (exhibition.videos?.length || 0)) > 1 && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                      {(exhibition.photos?.length || 0) + (exhibition.videos?.length || 0)} {isRTL ? 'ملف' : 'media'}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;