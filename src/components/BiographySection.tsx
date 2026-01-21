import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { exhibitions } from '@/data/artistData';

const BiographySection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  // Get first 10 exhibitions for the timeline
  const timelineExhibitions = exhibitions.slice(0, 10);

  return (
    <section id="biography" className="section-padding bg-card paper-texture" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-5xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="gold-underline">{t('biography.title')}</span>
            </h2>
          </motion.div>

          {/* About Me */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-xl md:text-2xl font-semibold text-secondary mb-6">
              {t('biography.aboutMe')}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {t('biography.aboutText')}
            </p>
          </motion.div>

          {/* Two Columns: Education & Participations */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Education & Experience */}
            <motion.div 
              variants={itemVariants} 
              className="elegant-card p-6 md:p-8"
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 40px -10px hsl(220 25% 15% / 0.15)',
              }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="p-3 rounded-full bg-secondary/10 text-secondary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <GraduationCap size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t('biography.education')}
                </h3>
              </motion.div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {t('biography.educationText')}
              </p>
            </motion.div>

            {/* Art Participations Timeline */}
            <motion.div 
              variants={itemVariants} 
              className="elegant-card p-6 md:p-8"
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 40px -10px hsl(220 25% 15% / 0.15)',
              }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  className="p-3 rounded-full bg-secondary/10 text-secondary"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Briefcase size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold text-foreground">
                  {t('biography.participations')}
                </h3>
              </motion.div>
              
              {/* Mini Timeline */}
              <div className="relative">
                <div className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-secondary via-secondary/50 to-transparent ${isRTL ? 'right-2' : 'left-2'}`} />
                <div className="space-y-4">
                  {timelineExhibitions.map((exhibition, index) => (
                    <motion.div
                      key={exhibition.id}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.1 * index }}
                      className={`relative ${isRTL ? 'pr-8' : 'pl-8'}`}
                    >
                      <div className={`absolute top-1.5 w-3 h-3 rounded-full bg-secondary ${isRTL ? 'right-0.5' : 'left-0.5'}`} />
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-secondary">{exhibition.year}</span>
                        <span className="text-sm text-muted-foreground">
                          {isRTL ? exhibition.title.ar : exhibition.title.en}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BiographySection;
