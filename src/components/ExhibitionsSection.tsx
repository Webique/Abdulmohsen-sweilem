import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { exhibitions, type Exhibition } from '@/data/artistData';

// Photo Modal Component
const PhotoModal = ({
  exhibition,
  isRTL,
  onClose
}: {
  exhibition: Exhibition;
  isRTL: boolean;
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = exhibition.photos || [];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl bg-card overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <span className="text-secondary font-semibold">{exhibition.year}</span>
            <h3 className="text-lg font-semibold text-foreground">
              {isRTL ? exhibition.title.ar : exhibition.title.en}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Photo Display */}
        {photos.length > 0 ? (
          <div className="relative aspect-video">
            <img
              src={photos[currentIndex]}
              alt={`${isRTL ? exhibition.title.ar : exhibition.title.en} - ${currentIndex + 1}`}
              className="w-full h-full object-contain bg-black"
              loading="lazy"
            />

            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Photo counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm">
                  {currentIndex + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-video flex flex-col items-center justify-center text-muted-foreground bg-muted/20">
            <Camera size={48} className="mb-4 opacity-50" />
            <p className="text-lg">
              {isRTL ? 'لا توجد صور متاحة حالياً' : 'No photos available yet'}
            </p>
            <p className="text-sm mt-2 opacity-70">
              {isRTL ? 'سيتم إضافة الصور قريباً' : 'Photos will be added soon'}
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const ExhibitionsSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

  return (
    <>
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

          {/* Grid Layout */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {exhibitions.map((exhibition, index) => (
                <motion.div
                  key={exhibition.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                  }}
                  whileHover={{ y: -4, boxShadow: '0 20px 40px -10px hsl(43 74% 49% / 0.2)' }}
                  className="group cursor-pointer bg-card border border-border hover:border-secondary/50 transition-all duration-300"
                  onClick={() => setSelectedExhibition(exhibition)}
                >
                  {/* Card Content */}
                  <div className="p-5 md:p-6">
                    {/* Year Badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary font-semibold text-sm">
                        <Calendar size={14} />
                        {exhibition.year}
                      </span>

                      {/* Photo count */}
                      <span className="inline-flex items-center gap-1 text-muted-foreground text-sm group-hover:text-secondary transition-colors">
                        <Camera size={14} />
                        {exhibition.photos?.length || 0}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-foreground font-medium leading-relaxed mb-3 line-clamp-2">
                      {isRTL ? exhibition.title.ar : exhibition.title.en}
                    </h3>

                    {/* View indicator */}
                    <p className="text-xs text-muted-foreground group-hover:text-secondary transition-colors">
                      {isRTL ? 'اضغط لعرض التفاصيل' : 'Click to view details'}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedExhibition && (
          <PhotoModal
            exhibition={selectedExhibition}
            isRTL={isRTL}
            onClose={() => setSelectedExhibition(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExhibitionsSection;