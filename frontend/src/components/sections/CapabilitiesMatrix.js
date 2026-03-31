import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const skillCategories = [
  {
    name: 'Frontend',
    code: 'FE',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind', level: 92 },
    ],
  },
  {
    name: 'Backend',
    code: 'BE',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Python', level: 88 },
      { name: 'FastAPI', level: 85 },
      { name: 'PostgreSQL', level: 82 },
    ],
  },
  {
    name: 'AI/ML',
    code: 'AI',
    skills: [
      { name: 'OpenAI', level: 90 },
      { name: 'LangChain', level: 85 },
      { name: 'TensorFlow', level: 75 },
      { name: 'Vector DBs', level: 80 },
    ],
  },
  {
    name: 'Systems',
    code: 'SYS',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD', level: 88 },
      { name: 'Git', level: 95 },
    ],
  },
];

const CapabilitiesMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Scroll depth
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
      y: -4,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="matrix"
      ref={ref}
      className="relative py-32 z-10"
      data-testid="matrix-section"
    >
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="w-2 h-2 bg-[var(--animus-accent)]" />
          <span className="hud-text">Capabilities_Matrix</span>
          <div className="flex-1 h-[1px] bg-[var(--animus-border)]" />
          <span className="hud-text opacity-50">03</span>
        </motion.div>

        <motion.h2
          className="section-title mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Technical <span className="text-[var(--animus-accent)]">Stack</span>
        </motion.h2>

        {/* Skills Matrix */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              className="module-card"
              variants={cardVariants}
              whileHover="hover"
              data-testid={`skill-category-${category.code.toLowerCase()}`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--animus-border)]">
                <div className="flex items-center gap-3">
                  <motion.span 
                    className="font-mono text-2xl font-semibold text-[var(--animus-accent)]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                  >
                    {category.code}
                  </motion.span>
                  <span className="font-display font-medium">{category.name}</span>
                </div>
                <span className="hud-text opacity-50">
                  {category.skills.length} skills
                </span>
              </div>

              {/* Skills List with animated bars */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    data-testid={`skill-${skill.name.toLowerCase()}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <motion.span 
                        className="text-sm font-medium transition-colors duration-150"
                        whileHover={{ color: 'var(--animus-accent)' }}
                      >
                        {skill.name}
                      </motion.span>
                      <span className="hud-text tabular-nums">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] bg-[var(--animus-border)] overflow-hidden">
                      <motion.div
                        className="h-full bg-[var(--animus-accent)]"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 0.8,
                          delay: 0.4 + categoryIndex * 0.1 + skillIndex * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer text */}
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <p className="hud-text opacity-60">
            Continuously expanding capabilities • Always learning new technologies
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CapabilitiesMatrix;
