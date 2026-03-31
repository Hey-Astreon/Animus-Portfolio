import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useThemeStore } from '../../store/useStore';

const skillCategories = [
  { name: 'Logic & Systems', code: 'LGC', skills: ['Python', 'JavaScript', 'TypeScript', 'FastAPI'] },
  { name: 'AI & Agentic', code: 'NRN', skills: ['Prompt Engineering', 'LangChain', 'Gemini API', 'LangGraph', 'Groq'] },
  { name: 'System Interface', code: 'UIX', skills: ['React', 'Next.js', 'Tailwind CSS', 'Node.js'] },
  { name: 'Data Architecture', code: 'DAT', skills: ['PostgreSQL', 'SQLite', 'Meta DB Architecture'] },
];

const CapabilitiesMatrix = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const theme = useThemeStore((state) => state.theme);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section id="matrix" ref={ref} className="relative py-32 z-10" data-testid="matrix-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-6" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <div className="w-1.5 h-1.5 bg-astreon-accent" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-astreon-text-muted">Capabilities_Matrix</span>
          <div className="flex-1 h-px bg-astreon-border/20" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-50">03</span>
        </motion.div>

        <motion.h2 className="font-display text-5xl font-bold tracking-tight mb-16 text-astreon-text" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          System <span className="text-astreon-accent">Arsenal</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              className="flex flex-col gap-6"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: idx * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
              }}
              data-testid={`skill-category-${cat.code.toLowerCase()}`}
            >
              <div className="flex items-center gap-3 pb-4 border-b border-astreon-border/20">
                <span className="font-mono text-sm font-bold text-astreon-accent">{cat.code}</span>
                <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-astreon-text">{cat.name}</h3>
              </div>

              <div className="flex flex-col gap-3">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2 group">
                    <div className="w-1 h-1 bg-astreon-accent/30 group-hover:bg-astreon-accent transition-colors duration-300" />
                    <span className="text-sm text-astreon-text-muted group-hover:text-astreon-text transition-colors duration-300">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p 
          className="text-center font-mono text-[10px] tracking-widest uppercase text-astreon-text-muted opacity-40 mt-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          ACTIVE_LOADING: ADDITIONAL_RESOURCES...
        </motion.p>
      </motion.div>
    </section>
  );
};

export default CapabilitiesMatrix;
