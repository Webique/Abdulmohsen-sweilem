import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BiographySection from '@/components/BiographySection';
import WorksSection from '@/components/WorksSection';
import CollectedWorksSection from '@/components/CollectedWorksSection';
import PersonalPhotosSection from '@/components/PersonalPhotosSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ExhibitionsSection from '@/components/ExhibitionsSection';

const Index = () => {
  const { i18n } = useTranslation();

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
        <ExhibitionsSection />
        <PersonalPhotosSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
