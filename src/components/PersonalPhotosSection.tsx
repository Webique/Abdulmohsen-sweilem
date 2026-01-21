import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import ImageCarousel3D from './ImageCarousel3D';
import { personalPhotos } from '@/data/artistData';

const PersonalPhotosSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Transform personal photos for the carousel
  const carouselSlides = personalPhotos.map((photo, index) => ({
    id: index + 1,
    src: photo,
  }));

  return (
    <section id="photos" className="section-padding bg-card paper-texture overflow-hidden" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="gold-underline">{t('photos.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('photos.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ImageCarousel3D 
            slides={carouselSlides}
            autoplay={true}
            delay={5}
            pauseOnHover={true}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalPhotosSection;
