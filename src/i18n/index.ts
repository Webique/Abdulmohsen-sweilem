import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') || 'ar' : 'ar';

const resources = {
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        biography: "السيرة الذاتية",
        works: "اعمالي",
        collectedWorks: "اعمالي المقتناة",
        exhibitions: "مشاركاتي و المعارض",
        photos: "صور شخصية",
        contact: "تواصل"
      },
      hero: {
        title: "صفحة الفنان التشكيلي عبدالمحسن السويلم",
        subtitle: "فنان تشكيلي سعودي يمزج بين الماضي وألوان الحاضر",
        viewWorks: "استعراض الأعمال",
        contact: "تواصل معي"
      },
      biography: {
        title: "الفنان عبدالمحسن السويلم",
        aboutMe: "نبذة عني",
        aboutText: "فنان تشكيلي من مواليد ١٣٧٧ هـ الرياض. زاولت العمل الفني من ايام الابتدائي ، انقطعت عن العمل التشكيلي في بداية الدراسة الجامعية ثم عدت لمزاولة هوايتي الفنية من بداية ٢٠٠٠ م وختى تاريخنا هذا . لي اكثر من ٥٠ مشاركة محلية و خارجية. اقمت معرضي الخاص طاقات و قريبا سيتم اقامة معرضي الثاني. شاركت في الكثير من الورش الجماعية في عدة مناطق في المملكة عضو في جمعية جسفت وفي الملتقى التشكيلي و عضو سابق في اصدقاء الريشة. لي اعمال مقتناه في جهات حكومية و من بعض رجال الاعمال .",
        education: "التعليم و الخبرات",
        educationText: "حاصل على درجة البكالريوس في الاداب من جامعة الملك سعود عام ١٤٠٠ هـ.\nعملت موظف اداري بالشؤون الهندسية التابعة لوزارة الاعلام خلال الفتره ١٤٠٠-١٤٠٥ هـ،\nثم في شؤون الموظفين بوزارة الاعلام اوائل عام ١٤٠٧ هـ.\nانتقلت للعمل بوزارة الماليه من عام ١٤٠٧- و ختى تاريخ احالتي للتقاعد المبكر ١٤٢٥هـ.",
        participations: "المشاركات الفنية"
      },
      works: {
        title: "اعمالي",
        subtitle: "بعض من اعمالي مزيج بين الماضي و الوان الحاضر."
      },
      collectedWorks: {
        title: "اعمالي المقتناة",
        subtitle: "بعض من اعمالي التي تم اقتنائها من بداية مسيرتي الى يومنا هذا"
      },
      exhibitions: {
        title: "مشاركاتي و المعارض",
        subtitle: "مشاركاتي في المعارض منذ سنة 2000م الى اواخر 2023 م.",
        mediaPlaceholder: "صور و فيديوهات المعارض"
      },
      photos: {
        title: "صور شخصية",
        subtitle: "لحظات من مسيرتي الفنية"
      },
      contact: {
        title: "تواصل",
        subtitle: "يسعدني التواصل معكم",
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال",
        namePlaceholder: "أدخل اسمك",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        messagePlaceholder: "اكتب رسالتك هنا...",
        success: "تم إرسال رسالتك بنجاح!",
        nameRequired: "الاسم مطلوب",
        emailRequired: "البريد الإلكتروني مطلوب",
        emailInvalid: "البريد الإلكتروني غير صحيح",
        messageRequired: "الرسالة مطلوبة"
      },
      footer: {
        rights: "جميع الحقوق محفوظة",
        madeWith: "صنع بـ"
      },
      gallery: {
        size: "المقاس",
        close: "إغلاق",
        previous: "السابق",
        next: "التالي"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        biography: "Biography",
        works: "Works",
        collectedWorks: "Collected Works",
        exhibitions: "Exhibitions",
        photos: "Photos",
        contact: "Contact"
      },
      hero: {
        title: "Visual Artist Portfolio — Abdulmohsen AlSwailem",
        subtitle: "A Saudi visual artist blending the past with the colors of the present",
        viewWorks: "View Works",
        contact: "Contact Me"
      },
      biography: {
        title: "Artist Abdulmohsen AlSwailem",
        aboutMe: "About Me",
        aboutText: "A visual artist born in 1377 AH in Riyadh. I practiced art since elementary school, then took a break during my university studies before returning to pursue my artistic passion in 2000 until today. I have participated in over 50 local and international exhibitions. I held my private exhibition 'Taqat' and will soon hold my second exhibition. I have participated in numerous group workshops across various regions of the Kingdom. I am a member of JASFT Association and the Visual Arts Forum, and a former member of 'Friends of the Brush'. My works have been collected by government entities and prominent businessmen.",
        education: "Education & Experience",
        educationText: "Bachelor's degree in Arts from King Saud University in 1400 AH.\nWorked as an administrative employee in the Engineering Affairs department of the Ministry of Information from 1400-1405 AH.\nThen in Personnel Affairs at the Ministry of Information in early 1407 AH.\nTransferred to the Ministry of Finance from 1407 AH until early retirement in 1425 AH.",
        participations: "Art Participations"
      },
      works: {
        title: "My Works",
        subtitle: "A selection of my works — a blend of the past and the colors of the present."
      },
      collectedWorks: {
        title: "Collected Works",
        subtitle: "Works that have been collected from the beginning of my journey until today."
      },
      exhibitions: {
        title: "Participations & Exhibitions",
        subtitle: "My exhibition participations from 2000 to late 2023.",
        mediaPlaceholder: "Exhibition Photos & Videos"
      },
      photos: {
        title: "Personal Photos",
        subtitle: "Moments from my artistic journey"
      },
      contact: {
        title: "Contact",
        subtitle: "I'd love to hear from you",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your email",
        messagePlaceholder: "Write your message here...",
        success: "Your message has been sent successfully!",
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email address",
        messageRequired: "Message is required"
      },
      footer: {
        rights: "All rights reserved",
        madeWith: "Made with"
      },
      gallery: {
        size: "Size",
        close: "Close",
        previous: "Previous",
        next: "Next"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
