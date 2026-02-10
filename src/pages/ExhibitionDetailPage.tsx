import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { exhibitions } from '@/data/artistData';

const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url);

// Lightbox for full-screen media viewing
const Lightbox = ({
    media,
    currentIndex,
    onClose,
    onNext,
    onPrev,
    title
}: {
    media: string[];
    currentIndex: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    title: string;
}) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    const item = media[currentIndex];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {isVideo(item) ? (
                    <video
                        key={item}
                        src={item}
                        controls
                        autoPlay
                        className="max-w-full max-h-[85vh] object-contain"
                        playsInline
                    />
                ) : (
                    <img
                        src={item}
                        alt={`${title} - ${currentIndex + 1}`}
                        className="max-w-full max-h-[85vh] object-contain"
                    />
                )}

                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-3 bg-black/50 text-white hover:bg-secondary hover:text-black transition-colors rounded-full"
                >
                    <X size={24} />
                </button>

                {/* Navigation */}
                {media.length > 1 && (
                    <>
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

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm rounded-full">
                            {currentIndex + 1} / {media.length}
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

const ExhibitionDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const { i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const savedLang = localStorage.getItem('language') || 'ar';
        const savedTheme = localStorage.getItem('theme');
        document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = savedLang;
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }, []);

    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    const exhibition = exhibitions.find((e) => e.id === id);

    if (!exhibition) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">
                        {isRTL ? 'المعرض غير موجود' : 'Exhibition not found'}
                    </h1>
                    <Link to="/exhibitions" className="text-secondary hover:underline">
                        {isRTL ? 'العودة للمعارض' : 'Back to Exhibitions'}
                    </Link>
                </div>
            </div>
        );
    }

    const media = [...(exhibition.photos || []), ...(exhibition.videos || [])];
    const title = isRTL ? exhibition.title.ar : exhibition.title.en;

    const handleNext = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % media.length);
        }
    };

    const handlePrev = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + media.length) % media.length);
        }
    };

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Navbar />
            <main className="pt-20">
                {/* Back Arrow + Title */}
                <div className="container mx-auto px-4 py-8">
                    <Link
                        to="/exhibitions"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors mb-6"
                    >
                        {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                        <span>{isRTL ? 'العودة للمعارض' : 'Back to Exhibitions'}</span>
                    </Link>

                    <div className="flex items-center gap-3 flex-wrap mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            {title}
                        </h1>
                        <span className="px-3 py-1 bg-secondary/15 text-secondary text-sm font-semibold rounded-full">
                            {exhibition.year}
                        </span>
                    </div>
                </div>

                {/* Media Grid */}
                <div className="container mx-auto px-4 pb-16">
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                        {media.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => setLightboxIndex(index)}
                            >
                                <div className="relative overflow-hidden bg-muted border border-border hover:border-secondary/50 transition-colors duration-200">
                                    {isVideo(item) ? (
                                        <div className="relative">
                                            <video
                                                src={item}
                                                className="w-full h-auto"
                                                muted
                                                playsInline
                                                preload="metadata"
                                            />
                                            {/* Play button overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                    <svg className="w-7 h-7 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={item}
                                            alt={`${title} - ${index + 1}`}
                                            className="w-full h-auto object-cover"
                                            loading="lazy"
                                        />
                                    )}

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                                        <span className="text-white text-sm">
                                            {isVideo(item)
                                                ? (isRTL ? 'فيديو' : 'Video')
                                                : `#${index + 1}`}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
            <ScrollToTop />

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        media={media}
                        currentIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        title={title}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExhibitionDetailPage;
