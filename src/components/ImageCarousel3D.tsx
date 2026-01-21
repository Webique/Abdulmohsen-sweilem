import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselSlide {
  id: number;
  src: string;
}

interface ImageCarousel3DProps {
  slides: CarouselSlide[];
  autoplay?: boolean;
  delay?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const ImageCarousel3D = ({
  slides,
  autoplay = true,
  delay = 4,
  pauseOnHover = true,
  className = '',
}: ImageCarousel3DProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  const totalSlides = slides.length;

  const goToSlide = useCallback((index: number) => {
    let newIndex = index;
    if (newIndex < 0) newIndex = totalSlides - 1;
    if (newIndex >= totalSlides) newIndex = 0;
    setActiveIndex(newIndex);
  }, [totalSlides]);

  const goNext = useCallback(() => {
    goToSlide(activeIndex + 1);
  }, [activeIndex, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide(activeIndex - 1);
  }, [activeIndex, goToSlide]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isPaused || totalSlides <= 1) return;
    
    const interval = setInterval(() => {
      goNext();
    }, delay * 1000);

    return () => clearInterval(interval);
  }, [autoplay, delay, isPaused, goNext, totalSlides]);

  // Touch/Mouse handling
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
  };

  const handleDragEnd = (clientX: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    const diff = startX.current - clientX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold) {
      if (isRTL) {
        diff > 0 ? goPrev() : goNext();
      } else {
        diff > 0 ? goNext() : goPrev();
      }
    }
  };

  const getSlideStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff % totalSlides) + totalSlides) % totalSlides;
    const adjustedDiff = normalizedDiff > totalSlides / 2 ? normalizedDiff - totalSlides : normalizedDiff;
    
    const absDistance = Math.abs(adjustedDiff);
    const direction = adjustedDiff > 0 ? (isRTL ? -1 : 1) : (isRTL ? 1 : -1);
    
    // Hide items too far away
    if (absDistance > 2) {
      return {
        opacity: 0,
        scale: 0.5,
        x: direction * 400,
        zIndex: 0,
        rotateY: 0,
      };
    }

    // Calculate transforms based on position
    const xOffset = adjustedDiff * 180 * (isRTL ? -1 : 1);
    const scale = 1 - absDistance * 0.15;
    const opacity = 1 - absDistance * 0.3;
    const zIndex = 10 - absDistance;
    const rotateY = adjustedDiff * -15 * (isRTL ? -1 : 1);

    return {
      x: xOffset,
      scale: Math.max(scale, 0.7),
      opacity: Math.max(opacity, 0),
      zIndex,
      rotateY,
    };
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden ${className}`}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        style={{ perspective: '1200px' }}
      >
        {/* Slides */}
        <div className="relative w-full h-full flex items-center justify-center">
          {slides.map((slide, index) => {
            const style = getSlideStyle(index);
            const isActive = index === activeIndex;
            
            return (
              <motion.div
                key={slide.id}
                className="absolute cursor-pointer"
                initial={false}
                animate={style}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                }}
                onClick={() => {
                  if (isActive) {
                    setSelectedImage(slide.src);
                  } else {
                    goToSlide(index);
                  }
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div 
                  className={`relative w-[280px] md:w-[350px] h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-medium ${
                    isActive ? 'ring-4 ring-secondary/50' : ''
                  }`}
                >
                  <img
                    src={slide.src}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Gradient overlay for non-active slides */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/20" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goPrev}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-4 md:right-8' : 'left-4 md:left-8'} z-20 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-soft hover:bg-card transition-colors`}
          aria-label="Previous"
        >
          <ChevronLeft size={24} className={isRTL ? 'rotate-180' : ''} />
        </button>
        <button
          onClick={goNext}
          className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-20 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-soft hover:bg-card transition-colors`}
          aria-label="Next"
        >
          <ChevronRight size={24} className={isRTL ? 'rotate-180' : ''} />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-secondary w-8' 
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Full view"
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageCarousel3D;
