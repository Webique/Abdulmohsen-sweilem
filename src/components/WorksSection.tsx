import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import ThreeDSlider from './ThreeDSlider';
import { artworks } from '@/data/artistData';

const WorksSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Transform artworks data for the 3D slider
  const sliderItems = artworks.map((artwork, index) => ({
    id: artwork.id,
    image: artwork.image,
    num: String(index + 1).padStart(2, '0'),
  }));

  return (
    <section id="works" className="section-padding paper-texture overflow-hidden" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          {/* <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="gold-underline">{t('works.title')}</span>
          </h2> */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('works.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ThreeDSlider items={sliderItems} />
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection;
