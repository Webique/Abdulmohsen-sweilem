import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ExhibitionsSection from '@/components/ExhibitionsSection';

const ExhibitionsPage = () => {
    const { i18n } = useTranslation();

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

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Navbar />
            <main className="pt-20">
                <ExhibitionsSection />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default ExhibitionsPage;
