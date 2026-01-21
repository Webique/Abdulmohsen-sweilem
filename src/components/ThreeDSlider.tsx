import { useState, useEffect, useRef, useCallback, CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderItem {
  id: string;
  image: string;
  // title: { ar: string; en: string };
  size: string;
  num: string;
}

interface ThreeDSliderProps {
  items: SliderItem[];
  speedWheel?: number;
  speedDrag?: number;
  containerStyle?: CSSProperties;
  onItemClick?: (item: SliderItem, index: number) => void;
}

const ThreeDSlider = ({
  items,
  speedWheel = 0.02,
  speedDrag = -0.1,
  containerStyle = {},
}: ThreeDSliderProps) => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<SliderItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { damping: 30, stiffness: 200 });
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startProgress = useRef(0);

  const totalItems = items.length;

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!containerRef.current?.contains(e.target as Node)) return;
    e.preventDefault();
    const delta = e.deltaY * speedWheel;
    const newProgress = Math.max(0, Math.min(totalItems - 1, progress.get() + delta));
    progress.set(newProgress);
    setActiveIndex(Math.round(newProgress));
  }, [progress, speedWheel, totalItems]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startProgress.current = progress.get();
  }, [progress]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const delta = (e.clientX - startX.current) * speedDrag * (isRTL ? -1 : 1);
    const newProgress = Math.max(0, Math.min(totalItems - 1, startProgress.current + delta / 100));
    progress.set(newProgress);
    setActiveIndex(Math.round(newProgress));
  }, [progress, speedDrag, totalItems, isRTL]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startProgress.current = progress.get();
  }, [progress]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const delta = (e.touches[0].clientX - startX.current) * speedDrag * (isRTL ? -1 : 1);
    const newProgress = Math.max(0, Math.min(totalItems - 1, startProgress.current + delta / 100));
    progress.set(newProgress);
    setActiveIndex(Math.round(newProgress));
  }, [progress, speedDrag, totalItems, isRTL]);

  const goToSlide = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(totalItems - 1, index));
    progress.set(clampedIndex);
    setActiveIndex(clampedIndex);
  };

  const handleItemClick = (item: SliderItem, index: number) => {
    if (index === activeIndex) {
      setSelectedItem(item);
    } else {
      goToSlide(index);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleWheel]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[600px] overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={containerStyle}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-0 flex items-center justify-center perspective-[1500px]">
          {items.map((item, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;
            
            return (
              <motion.div
                key={item.id}
                className="absolute cursor-pointer"
                initial={false}
                animate={{
                  x: offset * (isRTL ? -220 : 220),
                  z: isActive ? 100 : -Math.abs(offset) * 100,
                  rotateY: offset * (isRTL ? 15 : -15),
                  scale: isActive ? 1 : 0.85 - Math.abs(offset) * 0.1,
                  opacity: Math.abs(offset) > 3 ? 0 : 1 - Math.abs(offset) * 0.15,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 25,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: totalItems - Math.abs(offset),
                }}
                onClick={() => handleItemClick(item, index)}
              >
                <div 
                  className={`relative w-[260px] md:w-[320px] h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-medium transition-shadow duration-300 ${
                    isActive ? 'ring-4 ring-secondary/50 shadow-gold' : ''
                  }`}
                >
                  <img
                    src={item.image}
                    alt="Artwork"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                    <motion.div 
                      className="text-secondary font-bold text-sm mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isActive ? 1 : 0.7 }}
                    >
                      {item.num}
                    </motion.div>
                    <p className="text-xs md:text-sm text-white/80 mt-1">
                      {t('gallery.size')}: {item.size}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => goToSlide(activeIndex - 1)}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4' : 'left-4'} p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-soft hover:bg-card transition-colors disabled:opacity-30`}
          disabled={activeIndex === 0}
        >
          <ChevronLeft size={24} className={isRTL ? 'rotate-180' : ''} />
        </button>
        <button
          onClick={() => goToSlide(activeIndex + 1)}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-soft hover:bg-card transition-colors disabled:opacity-30`}
          disabled={activeIndex === totalItems - 1}
        >
          <ChevronRight size={24} className={isRTL ? 'rotate-180' : ''} />
        </button>
        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-secondary w-6' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
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
                alt="Artwork"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <p className="text-white/70 text-sm mt-2">
                  {t('gallery.size')}: {selectedItem.size}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThreeDSlider;
