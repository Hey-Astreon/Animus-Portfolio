import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useThemeStore } from '../../store/useStore';

const skillCategories = [
  { name: 'Frontend', code: 'FE', skills: [{ name: 'React', level: 95 }, { name: 'Next.js', level: 90 }, { name: 'TypeScript', level: 88 }, { name: 'Tailwind', level: 92 }] },
  { name: 'Backend', code: 'BE', skills: [{ name: 'Node.js', level: 90 }, { name: 'Python', level: 88 }, { name: 'FastAPI', level: 85 }, { name: 'PostgreSQL', level: 82 }] },
  { name: 'AI/ML', code: 'AI', skills: [{ name: 'OpenAI', level: 90 }, { name: 'LangChain', level: 85 }, { name: 'TensorFlow', level: 75 }, { name: 'Vector DBs', level: 80 }] },
  { name: 'Systems', code: 'SYS', skills: [{ name: 'Docker', level: 85 }, { name: 'AWS', level: 80 }, { name: 'CI/CD', level: 88 }, { name: 'Git', level: 95 }] },
];

const CapabilitiesMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const theme = useThemeStore((state) => state.theme);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const accentColor = theme === 'light' ? '#2563eb' : '#60a5fa';

  return (
    <section id="matrix" ref={ref} className="relative py-28 z-10" data-testid="matrix-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-5" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <div className="w-1.5 h-1.5" style={{ background: accentColor }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)]">Capabilities_Matrix</span>
          <div className="flex-1 h-px bg-[var(--animus-border)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)] opacity-50">03</span>
        </motion.div>

        <motion.h2 className="section-title mb-14" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          Technical <span style={{ color: accentColor }}>Stack</span>
        </motion.h2>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              className="module-card"
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.15 }}
              data-testid={`skill-category-${cat.code.toLowerCase()}`}
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[var(--animus-border)]">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xl font-semibold" style={{ color: accentColor }}>{cat.code}</span>
                  <span className="font-display font-medium text-sm">{cat.name}</span>
                </div>
                <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-50">{cat.skills.length} skills</span>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill, i) => (
                  <div key={skill.name} data-testid={`skill-${skill.name.toLowerCase()}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-medium">{skill.name}</span>
                      <span className="font-mono text-[10px] text-[var(--animus-text-muted)] tabular-nums">{skill.level}%</span>
                    </div>
                    <div className="h-[2px] bg-[var(--animus-border)] overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ background: accentColor }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p 
          className="text-center font-mono text-[10px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-50 mt-10"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          Continuously expanding capabilities
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CapabilitiesMatrix;
