import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') || 'ar' : 'ar';

const participationsTextAr = `شاركت بالمعرض الجماعي الثالث لاصدقاء ريشة عام ١٤٢٢هـ
شاركت بالمعرض السابع عشر للفن التشكيلي المعاصر عام ١٤٢٢ هـ
شاركت في المهرجان الجنادرية للاعوام ١٤٢٢- ١٤٢٣- ١٤٢٧ – ١٤٣٠ – ١٤٣١هـ
شاركت في معرض جامعة الملك فهد للبترول و المعادن عام ١٤٢٢هـ
شاركت في معرض اصدقاء الريشة الرابع في ابها عام ١٤٢٣هـ
شاركت في معرض مسابقة رعاية الشباب في المنطقة الشرقية للاعوام ١٤٢٢-١٤٢٣-١٤٢٤-١٤٢٥هـ
شاركت في معرض الخامس لاصدقاء الريشة بالدمام عام ١٤٢٥ هـ
شاركت في معرض كلية الاداب في الدمام عام ١٤٢٥ هـ
شاركت في المسابقة الاولى لمعرض اصدقاء الريشة بمناسبة مرور خمسة اعوام وذلك بعام ١٤٢٧هـ
شاركت في معرض المشترك لجماعة اصدقاءالريشة و جماعة الجوف عام ١٤٢٨
شاركت في معرض اطياف الود ٢ بالجمعية الخيرية لرعاية الايتام عام ١٤٣٠ هـ
شاركت في معرض تواصل الرياض التشكيلي الاول بمعهد الادارة العامة عام ١٤٣٦ هـ
شاركت في معرض الاول لجماعة الملتقى التشكيلي في صالة الفن و التصميم عام ١٤٣٦ هـ
شاركت في الملتقى جسفت الثاني على جائزة دهانات الجزيرة في عام ١٤٣٦هـ-٢٠١٥م
شاركت في المعرض الثاني لمجموعة الملتقى التشكيلي (صالة الملتقى للفنون التشكيلية ) الرياض – ١٤٣٧هـ-٢٠١٦م
شاركت بمعرض لمسات واحد في صالة تجريد عام ١٤٣٧هـ
شاركت في معرض الثالث لمجموعة الملتقى التشكيلي ( مركز الامير فيصل بن فهد للفنون التشكيلية) ١٤٣٨هـ-٢٠١٧م
شاركت مع معهد مسك فن تجربه (١) في درة الرياض ٢٠١٧م
شاركت في معرض الملتقى الرابع لمجموعة الملتقى التشكيلي ( مركز الملك فهد الثقافي ) في عام ٢٠١٨م
شاركت في معرض وطن العز و الكرامة بمناسبة اليوم الوطني (٨٨) عام ٢٠١٨م
شاركت في تجربة معهد مسك (٣) المقامة بمدينة الرياض عام ٢٠١٩م
شاركت بمعرض لمسات ٤ بالنادي الادبي عام ٢٠١٩م
تشرفت بمشاركة نخبة من فنانين المملكة في تجلة (٣) السودة في ابها عام ٢٠١٩م
شاركت بمعرض انسانية فنان تشكيلي بمقر المنظمة العربية للهلال الاحمر و الصليب الاحمر ٢٠١٩م
شاركت بمعرض لمدة ثلاثة ايام لملتقى النخبه التشكيلي بحائل ٢٠١٩م
شاركت بمعرض انسانية فنان تشكيلي بالكويت و الذي افتتحة وزير خارجية الكويت ٢٠١٩م
شاركت بالمعرض السنوي الخامس للملتقى التشكيلي في الجمعية العربية السعودية للثقافة و الفنون عام ١٤٣٩هـ-٢٠١٩م
شاركت في معرض يضم منسوبي الملتقى التشكيلي و فنانين الخرج الذي نظمته الجمعية العربية السعودية فرع الدلم عام ٢٠٢٠م
اقمت معرضي الخاص طاقات في صالة اقاع الفن عام ٢٠٢٣م
شاركت في معرض اعماق في صالة اقاع الفن ضمن نخبة من الفنانين التشكيليين عام ٢٠٢٤م
شاركت في ملتقى الفنون في الزلفي عام ٢٠٢٥م`;

const participationsTextEn = `Participated in the Third Group Exhibition of Friends of the Brush in 1422 AH
Participated in the Seventeenth Contemporary Art Exhibition in 1422 AH
Participated in the Janadriyah Festival for the years 1422, 1423, 1427, 1430, 1431 AH
Participated in King Fahd University of Petroleum and Minerals Exhibition in 1422 AH
Participated in the Fourth Friends of the Brush Exhibition in Abha in 1423 AH
Participated in Youth Care Competition Exhibition in the Eastern Region for 1422-1423-1424-1425 AH
Participated in the Fifth Friends of the Brush Exhibition in Dammam in 1425 AH
Participated in the Faculty of Arts Exhibition in Dammam in 1425 AH
Participated in the First Competition of Friends of the Brush Exhibition on its 5th Anniversary in 1427 AH
Participated in the Joint Exhibition of Friends of the Brush and Al-Jouf Group in 1428 AH
Participated in Atyaf Al-Wid 2 Exhibition at the Orphan Care Association in 1430 AH
Participated in the First Riyadh Visual Arts Communication Exhibition at the Institute of Public Administration in 1436 AH
Participated in the First Exhibition of the Visual Arts Forum at the Art and Design Gallery in 1436 AH
Participated in the Second JASFT Forum for the Jazeera Paints Award in 1436 AH-2015
Participated in the Second Exhibition of the Visual Arts Forum Group (Visual Arts Forum Gallery) Riyadh – 1437 AH-2016
Participated in Lamasat 1 Exhibition at Tajreed Gallery in 1437 AH
Participated in the Third Exhibition of the Visual Arts Forum Group (Prince Faisal bin Fahd Center for Visual Arts) 1438 AH-2017
Participated with Misk Art Experience (1) in Durrat Riyadh 2017
Participated in the Fourth Forum Exhibition of the Visual Arts Forum Group (King Fahd Cultural Center) in 2018
Participated in Homeland of Glory and Dignity Exhibition on National Day (88) in 2018
Participated in Misk Institute Experience (3) held in Riyadh in 2019
Participated in Lamasat 4 Exhibition at the Literary Club in 2019
Had the honor of participating with elite Kingdom artists in Tajalle (3) Sodah in Abha in 2019
Participated in Humanity of a Visual Artist Exhibition at the Arab Red Crescent and Red Cross Organization headquarters in 2019
Participated in a three-day exhibition at the Elite Visual Forum in Hail 2019
Participated in Humanity of a Visual Artist Exhibition in Kuwait, inaugurated by Kuwait's Foreign Minister in 2019
Participated in the Fifth Annual Exhibition of the Visual Arts Forum at the Saudi Arabian Society for Culture and Arts in 1439 AH-2019
Participated in an exhibition with Visual Arts Forum members and Al-Kharj artists organized by the Saudi Arabian Society, Dilam branch in 2020
Held my private exhibition "Taqat" at Iqa'a Al-Fan Gallery in 2023
Participated in Aamaq Exhibition at Iqa'a Al-Fan Gallery with a group of visual artists in 2024
Participated in the Arts Forum in Zulfi in 2025`;

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
        title: "الفنان التشكيلي عبدالمحسن السويلم",
        subtitle: "",
        viewWorks: "استعراض الأعمال",
        contact: "تواصل معي"
      },
      biography: {
        title: "الفنان عبدالمحسن السويلم",
        aboutMe: "نبذة عني",
        aboutText: "فنان تشكيلي من مواليد ١٣٧٧ هـ الرياض. زاولت العمل الفني من ايام الابتدائي ، انقطعت عن العمل التشكيلي في بداية الدراسة الجامعية ثم عدت لمزاولة هوايتي الفنية من بداية ٢٠٠٠ م وختى تاريخنا هذا . لي اكثر من ٥٠ مشاركة محلية و خارجية. اقمت معرضي الخاص طاقات و قريبا سيتم اقامة معرضي الثاني. شاركت في الكثير من الورش الجماعية في عدة مناطق في المملكة عضو في جمعية جسفت وفي الملتقى التشكيلي و عضو سابق في اصدقاء الريشة. لي اعمال مقتناه في جهات حكومية و من بعض رجال الاعمال.",
        education: "التعليم و الخبرات",
        educationText: "حاصل على درجة البكالريوس في الاداب من جامعة الملك سعود عام ١٤٠٠ هـ.\nعملت موظف اداري بالشؤون الهندسية التابعة لوزارة الاعلام خلال الفتره ١٤٠٠-١٤٠٥ هـ،\nثم في شؤون الموظفين بوزارة الاعلام اوائل عام ١٤٠٧ هـ.\nانتقلت للعمل بوزارة الماليه من عام ١٤٠٧- و ختى تاريخ احالتي للتقاعد المبكر ١٤٢٥هـ.",
        participations: "المشاركات الفنية",
        participationsText: participationsTextAr
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
        subtitle: "مشاركاتي في المعارض منذ سنة 2000م الى اواخر 2025م.",
        mediaPlaceholder: "صور و فيديوهات المعارض",
        clickToView: "اضغط لعرض الصور"
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
        title: "Visual Artist Abdulmohsen AlSwailem",
        subtitle: "",
        viewWorks: "View Works",
        contact: "Contact Me"
      },
      biography: {
        title: "Artist Abdulmohsen AlSwailem",
        aboutMe: "About Me",
        aboutText: "A visual artist born in 1377 AH in Riyadh. I practiced art since elementary school, then took a break during my university studies before returning to pursue my artistic passion in 2000 until today. I have participated in over 50 local and international exhibitions. I held my private exhibition 'Taqat' and will soon hold my second exhibition. I have participated in numerous group workshops across various regions of the Kingdom. I am a member of JASFT Association and the Visual Arts Forum, and a former member of 'Friends of the Brush'. My works have been collected by government entities and prominent businessmen.",
        education: "Education & Experience",
        educationText: "Bachelor's degree in Arts from King Saud University in 1400 AH.\nWorked as an administrative employee in the Engineering Affairs department of the Ministry of Information from 1400-1405 AH.\nThen in Personnel Affairs at the Ministry of Information in early 1407 AH.\nTransferred to the Ministry of Finance from 1407 AH until early retirement in 1425 AH.",
        participations: "Art Participations",
        participationsText: participationsTextEn
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
        subtitle: "My exhibition participations from 2000 to late 2025.",
        mediaPlaceholder: "Exhibition Photos & Videos",
        clickToView: "Click to view photos"
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
