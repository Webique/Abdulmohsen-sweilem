import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Artwork } from '@/data/artistData';

interface GalleryLightboxProps {
  artworks: Artwork[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

const GalleryLightbox = ({ artworks, currentIndex, isOpen, onClose, onNavigate }: GalleryLightboxProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const artwork = artworks[currentIndex];

  if (!artwork) return null;
  const displayTitle = artwork.title ? (isRTL ? artwork.title.ar : artwork.title.en) : '';
  const altText = displayTitle || 'Artwork';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors z-10"
            onClick={onClose}
          >
            <X size={24} />
          </motion.button>

          {/* Navigation Buttons */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors z-10 ${isRTL ? 'right-4 md:right-8' : 'left-4 md:left-8'}`}
            onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
          >
            {isRTL ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`absolute top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/10 text-background hover:bg-background/20 transition-colors z-10 ${isRTL ? 'left-4 md:left-8' : 'right-4 md:right-8'}`}
            onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
          >
            {isRTL ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
          </motion.button>

          {/* Image Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={artwork.image}
              alt={altText}
              className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl"
              loading="lazy"
            />
            
            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center"
            >
              {displayTitle && (
                <h3 className="text-xl font-semibold text-background mb-2">
                  {displayTitle}
                </h3>
              )}
              {artwork.size && (
                <p className="text-background/50 text-sm">
                  {t('gallery.size')}: {artwork.size}
                </p>
              )}
              <p className="text-background/50 text-sm mt-2">
                {currentIndex + 1} / {artworks.length}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface GalleryGridProps {
  artworks: Artwork[];
}

const GalleryGrid = ({ artworks }: GalleryGridProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === artworks.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
      <div className="gallery-grid">
        {artworks.map((artwork, index) => {
          const title = artwork.title ? (isRTL ? artwork.title.ar : artwork.title.en) : '';
          const alt = title || 'Artwork';

          return (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
                damping: 15 
              }}
              whileHover={{ 
                y: -8,
                boxShadow: '0 20px 40px -10px hsl(43 74% 49% / 0.25)',
                transition: { duration: 0.3 }
              }}
              className="image-hover cursor-pointer elegant-card overflow-hidden"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/5] overflow-hidden relative group">
                <motion.img
                  src={artwork.image}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                >
                  <span className="text-white text-sm font-medium px-4 py-2 bg-secondary/80 rounded-full backdrop-blur-sm">
                    {isRTL ? 'عرض التفاصيل' : 'View Details'}
                  </span>
                </motion.div>
              </div>
              {title && (
                <div className="p-4">
                  <h4 className="font-medium text-foreground">
                    {title}
                  </h4>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <GalleryLightbox
        artworks={artworks}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  );
};

export default GalleryGrid;
