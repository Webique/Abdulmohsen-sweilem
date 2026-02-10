import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BiographySection from '@/components/BiographySection';
import WorksSection from '@/components/WorksSection';
import CollectedWorksSection from '@/components/CollectedWorksSection';
import PersonalPhotosSection from '@/components/PersonalPhotosSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';


const Index = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  // Scroll to hash section when navigating from another page
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  useEffect(() => {
    // Set initial direction and theme based on saved preferences
    const savedLang = localStorage.getItem('language') || 'ar';
    const savedTheme = localStorage.getItem('theme');

    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;

    // Apply saved theme
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Update direction when language changes
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <BiographySection />
        <WorksSection />
        <CollectedWorksSection />

        {/* Exhibitions CTA */}
        <section id="exhibitions" className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/exhibitions/zulfi-01.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isRTL ? 'المعارض' : 'Exhibitions'}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              {isRTL
                ? 'تصفح مجموعة من المعارض والملتقيات الفنية'
                : 'Browse a collection of art exhibitions and gatherings'}
            </p>
            <Link
              to="/exhibitions"
              className="inline-block px-8 py-3 bg-secondary text-black font-semibold hover:bg-secondary/90 transition-colors duration-200"
            >
              {isRTL ? 'عرض المعارض' : 'View Exhibitions'}
            </Link>
          </div>
        </section>

        <PersonalPhotosSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
