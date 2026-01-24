import { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderItem {
  id: string;
  image: string;
  num: string;
}

interface ThreeDSliderProps {
  items: SliderItem[];
  autoPlayInterval?: number;
  containerStyle?: CSSProperties;
}

const ThreeDSlider = ({
  items,
  autoPlayInterval = 4000,
  containerStyle = {},
}: ThreeDSliderProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalItems = items.length;

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || selectedItem) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalItems);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, totalItems, isPaused, selectedItem]);

  const goToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, index));
    setActiveIndex(clampedIndex);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleItemClick = (item: SliderItem, index: number) => {
    if (index === activeIndex) {
      setSelectedItem(item);
    } else {
      goToSlide(index);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[600px] overflow-hidden select-none"
        style={containerStyle}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 flex items-center justify-center perspective-[1500px]">
          {items.map((item, index) => {
            // Calculate offset with wrap-around for smooth infinite feel
            let offset = index - activeIndex;

            // Adjust for wrap-around
            if (offset > totalItems / 2) offset -= totalItems;
            if (offset < -totalItems / 2) offset += totalItems;

            const isActive = index === activeIndex;
            const absOffset = Math.abs(offset);

            return (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer"
                initial={false}
                animate={{
                  x: offset * (isRTL ? -220 : 220),
                  z: isActive ? 100 : -absOffset * 100,
                  rotateY: offset * (isRTL ? 15 : -15),
                  scale: isActive ? 1 : 0.85 - absOffset * 0.1,
                  opacity: absOffset > 3 ? 0 : 1 - absOffset * 0.15,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: totalItems - absOffset,
                }}
                onClick={() => handleItemClick(item, index)}
              >
                <div
                  className={`relative w-[260px] md:w-[320px] h-[360px] md:h-[420px] overflow-hidden shadow-medium transition-shadow duration-300 ${isActive ? 'ring-4 ring-secondary/50 shadow-gold' : ''
                    }`}
                >
                  <img
                    src={item.image}
                    alt={`Artwork ${item.num}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Gradient overlay - no size display */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-card/80 backdrop-blur-sm shadow-soft hover:bg-card transition-colors`}
        >
          <ChevronLeft size={24} className={isRTL ? 'rotate-180' : ''} />
        </button>
        <button
          onClick={goNext}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} p-3 bg-card/80 backdrop-blur-sm shadow-soft hover:bg-card transition-colors`}
        >
          <ChevronRight size={24} className={isRTL ? 'rotate-180' : ''} />
        </button>

        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 transition-all duration-300 ${index === activeIndex
                  ? 'bg-secondary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal - no size display */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedItem.image}
                alt={`Artwork ${selectedItem.num}`}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThreeDSlider;
