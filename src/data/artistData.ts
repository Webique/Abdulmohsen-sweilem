// Import artwork images
import artwork1 from '@/assets/artwork1.webp';
import artwork2 from '@/assets/artwork2.webp';
import artwork3 from '@/assets/artwork3.webp';
import artwork4 from '@/assets/artwork4.webp';
import artwork5 from '@/assets/artwork5.webp';
import artwork6 from '@/assets/artwork6.webp';
import artwork7 from '@/assets/artwork7.webp';
import artwork8 from '@/assets/artwork8.webp';
import artwork9 from '@/assets/artwork9.webp';
import artwork10 from '@/assets/artwork10.webp';
import artwork11 from '@/assets/artwork11.webp';
import artwork12 from '@/assets/artwork12.webp';
import artwork13 from '@/assets/artwork13.webp';
import artwork14 from '@/assets/artwork14.webp';
import artwork15 from '@/assets/artwork15.webp';
import artwork16 from '@/assets/artwork16.webp';
import artwork17 from '@/assets/artwork17.webp';
import artwork18 from '@/assets/artwork18.webp';
import artwork19 from '@/assets/artwork19.webp';
import artwork20 from '@/assets/artwork20.webp';
import artwork21 from '@/assets/artwork21.webp';
import artwork22 from '@/assets/artwork22.webp';
import artwork23 from '@/assets/artwork23.webp';
import artwork24 from '@/assets/artwork24.jpg';
import artwork25 from '@/assets/artwork25.webp';


// Import collected works images
import collected1 from '@/assets/collected1.webp';
import collected2 from '@/assets/collected2.webp';
import collected3 from '@/assets/collected3.webp';
import collected4 from '@/assets/collected4.webp';
import collected5 from '@/assets/collected5.jpg';
import collected6 from '@/assets/collected6.webp';
import collected7 from '@/assets/collected7.webp';
import collected8 from '@/assets/collected8.webp';
import collected9 from '@/assets/collected9.webp';
import collected10 from '@/assets/collected10.webp';
import collected11 from '@/assets/collected11.webp';

// Import personal photos
import photo1 from '@/assets/photo1.jpg';
import photo2 from '@/assets/photo2.webp';
import photo3 from '@/assets/photo3.webp';
import photo4 from '@/assets/photo4.jpg';
import photo5 from '@/assets/photo5.jpg';

export interface Artwork {
  id: string;
  image: string;
  title?: {
    ar: string;
    en: string;
  };
  size?: string;
}

export interface Exhibition {
  id: string;
  year: string;
  title: {
    ar: string;
    en: string;
  };
  photos?: string[]; // Optional array of photo paths
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Artist social links and contact
export const socialLinks: SocialLink[] = [
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/abdulmohsen.snam?igsh=MTd3Y29zb20wenRiZA==',
    icon: 'instagram'
  },
  {
    platform: 'X',
    url: 'https://x.com/abd_ulmohsen20',
    icon: 'twitter'
  }
];

export const contactEmail = 'snam20@gmail.com';

// Artworks gallery - Add your artwork images here
export const artworks: Artwork[] = [
  {
    id: '1',
    image: artwork1,
    title: { ar: 'غروب الصحراء', en: 'Desert Sunset' },
    size: '100 × 120 سم'
  },
  {
    id: '2',
    image: artwork2,
    title: { ar: 'تجريد أزرق وذهبي', en: 'Blue & Gold Abstract' },
    size: '120 × 90 سم'
  },
  {
    id: '3',
    image: artwork3,
    title: { ar: 'الباب النجدي', en: 'Najdi Doorway' },
    size: '120 × 90 سم'
  },
  {
    id: '4',
    image: artwork4,
    title: { ar: 'دلة القهوة', en: 'Arabic Coffee Pot' },
    size: '120 × 90 سم'
  },
  {
    id: '5',
    image: artwork5,
    title: { ar: 'واحة النخيل', en: 'Palm Oasis' },
    size: '220 × 190 سم'
  },
  {
    id: '6',
    image: artwork6,
    title: { ar: 'زخارف إسلامية', en: 'Islamic Patterns' },
    size: '200 × 65 سم'
  },
  {
    id: '7',
    image: artwork7,
    title: { ar: 'غروب الصحراء ٢', en: 'Desert Sunset 2' },
    size: '100 × 120 سم'
  },
  {
    id: '8',
    image: artwork8,
    title: { ar: 'تجريد أحمر وذهبي', en: 'Red & Gold Abstract' },
    size: '120 × 90 سم'
  },
  {
    id: '9',
    image: artwork9,
    title: { ar: 'النافورة التقليدية', en: 'Traditional Fountain' },
    size: '120 × 90 سم'
  },
  {
    id: '10',
    image: artwork10,
    title: { ar: 'عمارة نجد', en: 'Najdi Architecture' },
    size: '100 × 100 سم'
  },
  {
    id: '11',
    image: artwork11,
    title: { ar: 'تكوين تراثي', en: 'Heritage Composition' },
    size: '120 × 120 سم'
  },
  {
    id: '12',
    image: artwork12,
    title: { ar: 'تجريد رملي', en: 'Sand Abstract' },
    size: '100 × 100 سم'
  },
  {
    id: '13',
    image: artwork13,
    title: { ar: 'بوابة قديمة', en: 'Ancient Gate' },
    size: '100 × 80 سم'
  },
  {
    id: '14',
    image: artwork14,
    title: { ar: 'ثلاثية المكان', en: 'Triptych of Place' },
    size: '٣ قطع: 300 × 120 سم لكل قطعة'
  },
  {
    id: '15',
    image: artwork15,
    title: { ar: 'تجريد معماري', en: 'Architectural Abstract' },
    size: '100 × 100 سم'
  },
  {
    id: '16',
    image: artwork16,
    title: { ar: 'تفاصيل نجدية', en: 'Najdi Details' },
    size: '100 × 100 سم'
  },
  {
    id: '17',
    image: artwork17,
    title: { ar: 'إيقاع اللون', en: 'Rhythm of Color' },
    size: '100 × 100 سم'
  },
  {
    id: '18',
    image: artwork18,
    title: { ar: 'صدى التراث', en: 'Echoes of Heritage' },
    size: '100 × 120 سم'
  },
  {
    id: '19',
    image: artwork19,
    title: { ar: 'تجريد دافئ', en: 'Warm Abstract' },
    size: '160 × 120 سم'
  },
  {
    id: '20',
    image: artwork20,
    title: { ar: 'ممرات قديمة', en: 'Old Passages' },
    size: '90 × 60 سم'
  },
  {
    id: '21',
    image: artwork21,
    title: { ar: 'روح المكان', en: 'Spirit of Place' },
    size: '100 × 100 سم'
  },
  {
    id: '22',
    image: artwork22,
    title: { ar: 'تكوين صحراوي', en: 'Desert Composition' },
    size: '—'
  },
  {
    id: '23',
    image: artwork23,
    title: { ar: 'إضاءة تراثية', en: 'Heritage Light' },
    size: '100 × 100 سم'
  },
  {
    id: '24',
    image: artwork24,
    title: { ar: 'توازن بصري', en: 'Visual Balance' },
    size: '120 × 120 سم'
  },
  {
    id: '25',
    image: artwork25,
    title: { ar: 'ذاكرة المكان', en: 'Memory of Place' },
    size: '120 × 100 سم'
  }
];

// Collected works gallery - Add collected artwork images here
export const collectedWorks: Artwork[] = [
  {
    id: '1',
    image: collected1,
    // title: { ar: 'الحصان العربي', en: 'Arabian Horse' },
    // size: '60 × 80 سم'
  },
  {
    id: '2',
    image: collected2,
    // title: { ar: 'خط عربي', en: 'Arabic Calligraphy' },
    // size: '50 × 70 سم'
  },
  {
    id: '3',
    image: collected3,
    // title: { ar: 'حي الرياض القديم', en: 'Old Riyadh Neighborhood' },
    // size: '45 × 65 سم'
  },
  {
    id: '4',
    image: collected4,
    // title: { ar: 'الصقر', en: 'The Falcon' },
    // size: '70 × 90 سم'
  },
  {
    id: '5',
    image: collected5,
    // title: { ar: 'الحصان العربي', en: 'Arabian Horse' },
    // size: '60 × 80 سم'
  },
  {
    id: '6',
    image: collected6,
    // title: { ar: 'خط عربي', en: 'Arabic Calligraphy' },
    // size: '50 × 70 سم'
  },
  {
    id: '7',
    image: collected7,
    // title: { ar: 'حي الرياض القديم', en: 'Old Riyadh Neighborhood' },
    // size: '45 × 65 سم'
  },
  {
    id: '8',
    image: collected8,
    // title: { ar: 'الصقر', en: 'The Falcon' },
    // size: '70 × 90 سم'
  },
  {
    id: '9',
    image: collected9,
    // title: { ar: 'الحصان العربي', en: 'Arabian Horse' },
    // size: '60 × 80 سم'
  },
  {
    id: '10',
    image: collected10,
    // title: { ar: 'خط عربي', en: 'Arabic Calligraphy' },
    // size: '50 × 70 سم'
  },
  {
    id: '11',
    image: collected11,
    // title: { ar: 'حي الرياض القديم', en: 'Old Riyadh Neighborhood' },
    // size: '45 × 65 سم'
  }
];

// Personal photos - Add personal/event photos here
export const personalPhotos: string[] = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5
];

// Exhibitions and participations timeline
export const exhibitions: Exhibition[] = [
  { id: '1', year: '2000', title: { ar: 'معرض جماعي - الرياض', en: 'Group Exhibition - Riyadh' } },
  { id: '2', year: '2001', title: { ar: 'معرض الفن السعودي المعاصر', en: 'Contemporary Saudi Art Exhibition' } },
  { id: '3', year: '2003', title: { ar: 'ملتقى الفنانين التشكيليين', en: 'Visual Artists Forum' } },
  { id: '4', year: '2005', title: { ar: 'معرض جسفت السنوي', en: 'JASFT Annual Exhibition' } },
  { id: '5', year: '2007', title: { ar: 'معرض الفن والتراث', en: 'Art & Heritage Exhibition' } },
  { id: '6', year: '2009', title: { ar: 'معرض جماعي - جدة', en: 'Group Exhibition - Jeddah' } },
  { id: '7', year: '2010', title: { ar: 'ملتقى الفنون البصرية', en: 'Visual Arts Forum' } },
  { id: '8', year: '2012', title: { ar: 'معرض طاقات الفردي', en: 'Taqat Solo Exhibition' } },
  { id: '9', year: '2014', title: { ar: 'معرض الفن السعودي - دبي', en: 'Saudi Art Exhibition - Dubai' } },
  { id: '10', year: '2015', title: { ar: 'ملتقى الفنانين - الدمام', en: 'Artists Forum - Dammam' } },
  { id: '11', year: '2017', title: { ar: 'معرض جماعي دولي', en: 'International Group Exhibition' } },
  { id: '12', year: '2019', title: { ar: 'معرض الفن المعاصر', en: 'Contemporary Art Exhibition' } },
  { id: '13', year: '2021', title: { ar: 'معرض افتراضي - كوفيد', en: 'Virtual Exhibition - COVID' } },
  { id: '14', year: '2023', title: { ar: 'معرض جسفت الكبير', en: 'JASFT Grand Exhibition' } },
  { id: '15', year: '2025', title: { ar: 'ملتقى الزلفي ٢٠٢٥م', en: 'Al Zulfi Arts Gathering — 2025' } }
];
