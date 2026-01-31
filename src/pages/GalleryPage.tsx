import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

// Scroll to top on page load
const useScrollToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

// Generate array of 60 gallery image paths
// Use thumbnails for grid, full images for lightbox
const galleryImages = Array.from({ length: 60 }, (_, i) => ({
    id: String(i + 1),
    thumb: `/images/gallery/thumbs/work-${String(i + 1).padStart(2, '0')}.webp`,
    full: `/images/gallery/work-${String(i + 1).padStart(2, '0')}.webp`
}));

// Lightbox Component - loads full-size image
const Lightbox = ({
    image,
    images,
    onClose,
    onNext,
    onPrev
}: {
    image: { id: string; thumb: string; full: string };
    images: { id: string; thumb: string; full: string }[];
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Reset loaded state when image changes
    useEffect(() => {
        setImageLoaded(false);
    }, [image.id]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-6xl max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Show thumbnail as placeholder while full image loads */}
                {!imageLoaded && (
                    <img
                        src={image.thumb}
                        alt={`Artwork ${image.id}`}
                        className="max-w-full max-h-[85vh] object-contain blur-sm"
                    />
                )}

                {/* Full-size image */}
                <img
                    src={image.full}
                    alt={`Artwork ${image.id}`}
                    className={`max-w-full max-h-[85vh] object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0 absolute'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-3 bg-black/50 text-white hover:bg-secondary hover:text-black transition-colors rounded-full"
                >
                    <X size={24} />
                </button>

                {/* Navigation */}
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-secondary hover:text-black transition-colors rounded-full"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white hover:bg-secondary hover:text-black transition-colors rounded-full"
                >
                    <ChevronRight size={28} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </motion.div>
    );
};

// Simple Gallery Card - uses thumbnail only
const GalleryCard = ({
    image,
    onClick
}: {
    image: { id: string; thumb: string; full: string };
    onClick: () => void;
}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className="break-inside-avoid group cursor-pointer"
            onClick={onClick}
        >
            <div className="relative overflow-hidden bg-muted border border-border hover:border-secondary/50 transition-colors duration-200">
                {/* Skeleton loader */}
                {!loaded && (
                    <div className="absolute inset-0 bg-muted animate-pulse" style={{ minHeight: '200px' }} />
                )}

                <img
                    src={image.thumb}
                    alt={`Artwork ${image.id}`}
                    className={`w-full h-auto object-cover transition-opacity duration-200 ${loaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setLoaded(true)}
                />

                {/* Simple hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                    <span className="text-white text-sm">#{image.id}</span>
                </div>
            </div>
        </div>
    );
};

const GalleryPage = () => {
    useScrollToTop();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [selectedImage, setSelectedImage] = useState<{ id: string; thumb: string; full: string } | null>(null);

    const handleNext = () => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const nextIndex = (currentIndex + 1) % galleryImages.length;
        setSelectedImage(galleryImages[nextIndex]);
    };

    const handlePrev = () => {
        if (!selectedImage) return;
        const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
        const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        setSelectedImage(galleryImages[prevIndex]);
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors"
                        >
                            {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                            <span>{isRTL ? 'العودة للرئيسية' : 'Back to Home'}</span>
                        </Link>

                        <h1 className="text-xl md:text-2xl font-bold text-foreground">
                            {isRTL ? 'أعمالي' : 'My Works'}
                        </h1>

                        <div className="w-24" />
                    </div>
                </header>

                {/* Gallery Grid */}
                <main className="container mx-auto px-4 py-8 md:py-12">
                    <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
                        {isRTL
                            ? 'مجموعة من أعمالي الفنية - اضغط على أي عمل لتكبيره'
                            : 'A collection of my artworks - click any piece to enlarge'}
                    </p>

                    {/* Masonry Grid */}
                    <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
                        {galleryImages.map((image) => (
                            <GalleryCard
                                key={image.id}
                                image={image}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                </main>

                {/* Lightbox */}
                <AnimatePresence>
                    {selectedImage && (
                        <Lightbox
                            image={selectedImage}
                            images={galleryImages}
                            onClose={() => setSelectedImage(null)}
                            onNext={handleNext}
                            onPrev={handlePrev}
                        />
                    )}
                </AnimatePresence>
            </div>
        </PageTransition>
    );
};

export default GalleryPage;
