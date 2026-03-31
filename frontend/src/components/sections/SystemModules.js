import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';

const modules = [
  { id: 'MOD-01', title: 'AI CRM Interaction Hub', category: 'Systems Architecture', desc: 'Full-stack AI-driven system for healthcare professional interactions with real-time telemetry.', tech: ['FastAPI', 'React', 'PostgreSQL'], status: 'operational' },
  { id: 'MOD-02', title: 'Dynamic Quiz Engine', category: 'Logic Systems', desc: 'Modular Python-based architecture for automated assessment and logic validation.', tech: ['Python', 'FastAPI', 'SQLite'], status: 'operational' },
  { id: 'MOD-03', title: 'Neural Workflow Suite', category: 'AI Automation', desc: 'Agentic automation suite leveraging LangChain and Gemini API for complex task orchestration.', tech: ['Python', 'Gemini', 'LangChain'], status: 'alpha' },
  { id: 'MOD-04', title: 'Relational DB Architect', category: 'Database Systems', desc: 'High-performance database schemas designed for scalable enterprise environments.', tech: ['SQL', 'PostgreSQL', 'Meta DB'], status: 'operational' },
];

const SystemModules = () => {
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
    <section id="modules" ref={ref} className="relative py-32 z-10" data-testid="modules-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-6" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <div className="w-1.5 h-1.5 bg-astreon-accent" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-astreon-text-muted">System_Modules</span>
          <div className="flex-1 h-px bg-astreon-border/20" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-50">02</span>
        </motion.div>

        <motion.h2 className="font-display text-5xl font-bold tracking-tight mb-16 text-astreon-text" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          Operational <span className="text-astreon-accent">Modules</span>
        </motion.h2>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {modules.map((m) => (
            <motion.article
              key={m.id}
              className="group p-8 border border-astreon-border/30 bg-astreon-bg-alt/50 transition-all duration-300 hover:border-astreon-accent/40"
              variants={fadeUp}
              whileHover={{ y: -4 }}
              data-testid={`module-${m.id}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="font-mono text-[9px] tracking-widest uppercase text-astreon-accent">
                  {m.id} // {m.category}
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-1 rounded-full ${m.status === 'operational' ? 'bg-astreon-accent' : 'bg-yellow-500'} animate-pulse-status`} />
                  <span className="font-mono text-[9px] tracking-widest uppercase opacity-50">{m.status}</span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-semibold mb-4 text-astreon-text group-hover:text-astreon-accent transition-colors duration-300">{m.title}</h3>
              <p className="text-sm text-astreon-text-muted leading-relaxed mb-8 opacity-80">{m.desc}</p>

              <div className="flex items-center justify-between pt-6 border-t border-astreon-border/10">
                <div className="flex flex-wrap gap-2">
                  {m.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-[10px] font-mono border border-astreon-border/20 text-astreon-text-muted">{t}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SystemModules;
