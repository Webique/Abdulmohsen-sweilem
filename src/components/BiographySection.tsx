import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Palette } from 'lucide-react';

const BiographySection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Get portrait image based on language
  const portraitSrc = '/src/assets/personal/portrait.webp';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Get participations text and split into lines
  const participationsText = t('biography.participationsText') || '';
  const participationsList = participationsText.split('\n').filter((line: string) => line.trim());

  return (
    <section id="biography" className="section-padding bg-card paper-texture" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="gold-underline">{t('biography.title')}</span>
            </h2>
          </motion.div>

          {/* About Me */}
          <motion.div variants={itemVariants} className="mb-12">
            <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-4">
              {t('biography.aboutMe')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('biography.aboutText')}
            </p>
          </motion.div>

          {/* Education & Experience */}
          <motion.div
            variants={itemVariants}
            className="elegant-card p-6 md:p-8 mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('biography.education')}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {t('biography.educationText')}
            </p>
          </motion.div>

          {/* Art Participations - Full List */}
          <motion.div
            variants={itemVariants}
            className="elegant-card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                <Palette size={24} />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('biography.participations')}
              </h3>
            </div>

            {/* Participations List */}
            <div className="space-y-3">
              {participationsList.map((participation: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.05 * Math.min(index, 10) }}
                  className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                >
                  <span className="mt-2 w-2 h-2 rounded-full bg-secondary shrink-0" />
                  <span className="text-muted-foreground leading-relaxed">
                    {participation}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BiographySection;
