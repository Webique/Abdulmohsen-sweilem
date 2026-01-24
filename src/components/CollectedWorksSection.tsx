import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { collectedWorks, type Artwork } from '@/data/artistData';

// Lightbox Modal
const Lightbox = ({
  artwork,
  artworks,
  isRTL,
  onClose,
  onNext,
  onPrev
}: {
  artwork: Artwork;
  artworks: Artwork[];
  isRTL: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) => {
  const currentIndex = artworks.findIndex(a => a.id === artwork.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={artwork.image}
          alt={artwork.title ? (isRTL ? artwork.title.ar : artwork.title.en) : 'Collected artwork'}
          className="max-w-full max-h-[85vh] object-contain"
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Navigation */}
        {artworks.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={28} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm">
              {currentIndex + 1} / {artworks.length}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const CollectedWorksSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const handleNext = () => {
    if (!selectedArtwork) return;
    const currentIndex = collectedWorks.findIndex(a => a.id === selectedArtwork.id);
    const nextIndex = (currentIndex + 1) % collectedWorks.length;
    setSelectedArtwork(collectedWorks[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedArtwork) return;
    const currentIndex = collectedWorks.findIndex(a => a.id === selectedArtwork.id);
    const prevIndex = (currentIndex - 1 + collectedWorks.length) % collectedWorks.length;
    setSelectedArtwork(collectedWorks[prevIndex]);
  };

  return (
    <>
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

          {/* Masonry Grid */}
          <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {collectedWorks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="relative overflow-hidden bg-muted border border-border hover:border-secondary/50 transition-all duration-300">
                  <img
                    src={artwork.image}
                    alt={artwork.title ? (isRTL ? artwork.title.ar : artwork.title.en) : 'Collected artwork'}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm">
                      {isRTL ? 'اضغط للتكبير' : 'Click to enlarge'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <Lightbox
            artwork={selectedArtwork}
            artworks={collectedWorks}
            isRTL={isRTL}
            onClose={() => setSelectedArtwork(null)}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CollectedWorksSection;
