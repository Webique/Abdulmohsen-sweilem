// No imports - use public paths for lazy loading

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
  photos?: string[];
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

// Artworks gallery - using public paths for lazy loading
export const artworks: Artwork[] = [
  { id: '1', image: '/images/artworks/artwork1.webp', title: { ar: 'غروب الصحراء', en: 'Desert Sunset' }, size: '100 × 120 سم' },
  { id: '2', image: '/images/artworks/artwork2.webp', title: { ar: 'تجريد أزرق وذهبي', en: 'Blue & Gold Abstract' }, size: '120 × 90 سم' },
  { id: '3', image: '/images/artworks/artwork3.webp', title: { ar: 'الباب النجدي', en: 'Najdi Doorway' }, size: '120 × 90 سم' },
  { id: '4', image: '/images/artworks/artwork4.webp', title: { ar: 'دلة القهوة', en: 'Arabic Coffee Pot' }, size: '120 × 90 سم' },
  { id: '5', image: '/images/artworks/artwork5.webp', title: { ar: 'واحة النخيل', en: 'Palm Oasis' }, size: '220 × 190 سم' },
  { id: '6', image: '/images/artworks/artwork6.webp', title: { ar: 'زخارف إسلامية', en: 'Islamic Patterns' }, size: '200 × 65 سم' },
  { id: '7', image: '/images/artworks/artwork7.webp', title: { ar: 'غروب الصحراء ٢', en: 'Desert Sunset 2' }, size: '100 × 120 سم' },
  { id: '8', image: '/images/artworks/artwork8.webp', title: { ar: 'تجريد أحمر وذهبي', en: 'Red & Gold Abstract' }, size: '120 × 90 سم' },
  { id: '9', image: '/images/artworks/artwork9.webp', title: { ar: 'النافورة التقليدية', en: 'Traditional Fountain' }, size: '120 × 90 سم' },
  { id: '10', image: '/images/artworks/artwork10.webp', title: { ar: 'عمارة نجد', en: 'Najdi Architecture' }, size: '100 × 100 سم' },
  { id: '11', image: '/images/artworks/artwork11.webp', title: { ar: 'تكوين تراثي', en: 'Heritage Composition' }, size: '120 × 120 سم' },
  { id: '12', image: '/images/artworks/artwork12.webp', title: { ar: 'تجريد رملي', en: 'Sand Abstract' }, size: '100 × 100 سم' },
  { id: '13', image: '/images/artworks/artwork13.webp', title: { ar: 'بوابة قديمة', en: 'Ancient Gate' }, size: '100 × 80 سم' },
  { id: '14', image: '/images/artworks/artwork14.webp', title: { ar: 'ثلاثية المكان', en: 'Triptych of Place' }, size: '٣ قطع: 300 × 120 سم لكل قطعة' },
  { id: '15', image: '/images/artworks/artwork15.webp', title: { ar: 'تجريد معماري', en: 'Architectural Abstract' }, size: '100 × 100 سم' },
  { id: '16', image: '/images/artworks/artwork16.webp', title: { ar: 'تفاصيل نجدية', en: 'Najdi Details' }, size: '100 × 100 سم' },
  { id: '17', image: '/images/artworks/artwork17.webp', title: { ar: 'إيقاع اللون', en: 'Rhythm of Color' }, size: '100 × 100 سم' },
  { id: '18', image: '/images/artworks/artwork18.webp', title: { ar: 'صدى التراث', en: 'Echoes of Heritage' }, size: '100 × 120 سم' },
  { id: '19', image: '/images/artworks/artwork19.webp', title: { ar: 'تجريد دافئ', en: 'Warm Abstract' }, size: '160 × 120 سم' },
  { id: '20', image: '/images/artworks/artwork20.webp', title: { ar: 'ممرات قديمة', en: 'Old Passages' }, size: '90 × 60 سم' },
  { id: '21', image: '/images/artworks/artwork21.webp', title: { ar: 'روح المكان', en: 'Spirit of Place' }, size: '100 × 100 سم' },
  { id: '22', image: '/images/artworks/artwork22.webp', title: { ar: 'تكوين صحراوي', en: 'Desert Composition' }, size: '—' },
  { id: '23', image: '/images/artworks/artwork23.webp', title: { ar: 'إضاءة تراثية', en: 'Heritage Light' }, size: '100 × 100 سم' },
  { id: '24', image: '/images/artworks/artwork24.webp', title: { ar: 'توازن بصري', en: 'Visual Balance' }, size: '120 × 120 سم' },
  { id: '25', image: '/images/artworks/artwork25.webp', title: { ar: 'ذاكرة المكان', en: 'Memory of Place' }, size: '120 × 100 سم' }
];

// Collected works gallery
export const collectedWorks: Artwork[] = [
  { id: '1', image: '/images/collected/collected1.webp' },
  { id: '2', image: '/images/collected/collected2.webp' },
  { id: '3', image: '/images/collected/collected3.webp' },
  { id: '4', image: '/images/collected/collected4.webp' },
  { id: '5', image: '/images/collected/collected5.webp' },
  { id: '6', image: '/images/collected/collected6.webp' },
  { id: '7', image: '/images/collected/collected7.webp' },
  { id: '8', image: '/images/collected/collected8.webp' },
  { id: '9', image: '/images/collected/collected9.webp' },
  { id: '10', image: '/images/collected/collected10.webp' },
  { id: '11', image: '/images/collected/collected11.webp' }
];

// Personal photos
export const personalPhotos: string[] = [
  '/images/photos/photo1.webp',
  '/images/photos/photo2.webp',
  '/images/photos/photo3.webp',
  '/images/photos/photo4.webp',
  '/images/photos/photo5.webp'
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
  {
    id: '11',
    year: '2017',
    title: { ar: 'معرض مسك - أبها', en: 'Misk Exhibition - Abha' },
    photos: [
      '/images/exhibitions/misk-abha-01.webp',
      '/images/exhibitions/misk-abha-02.webp',
      '/images/exhibitions/misk-abha-03.webp',
      '/images/exhibitions/misk-abha-04.webp'
    ]
  },
  {
    id: '12',
    year: '2017',
    title: { ar: 'معرض مسك - الرياض', en: 'Misk Exhibition - Riyadh' },
    photos: [
      '/images/exhibitions/misk-riyadh-01.webp',
      '/images/exhibitions/misk-riyadh-02.webp',
      '/images/exhibitions/misk-riyadh-03.webp',
      '/images/exhibitions/misk-riyadh-04.webp'
    ]
  },
  { id: '13', year: '2019', title: { ar: 'معرض الفن المعاصر', en: 'Contemporary Art Exhibition' } },
  { id: '14', year: '2021', title: { ar: 'معرض افتراضي - كوفيد', en: 'Virtual Exhibition - COVID' } },
  { id: '15', year: '2023', title: { ar: 'معرض جسفت الكبير', en: 'JASFT Grand Exhibition' } },
  { id: '16', year: '2025', title: { ar: 'ملتقى الزلفي ٢٠٢٥م', en: 'Al Zulfi Arts Gathering — 2025' } }
];
