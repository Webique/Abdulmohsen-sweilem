import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import GalleryGrid from './GalleryGrid';
import { collectedWorks } from '@/data/artistData';

const CollectedWorksSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="collected-works" className="section-padding bg-card paper-texture" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="gold-underline">{t('collectedWorks.title')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('collectedWorks.subtitle')}
          </p>
        </motion.div>

        <GalleryGrid artworks={collectedWorks} />
      </div>
    </section>
  );
};

export default CollectedWorksSection;
