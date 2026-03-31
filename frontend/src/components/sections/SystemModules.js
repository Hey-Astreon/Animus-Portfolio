import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';

const modules = [
  { id: 'mod-01', title: 'Neural Analytics', category: 'Data Systems', desc: 'Real-time data visualization platform with AI-powered insights for enterprise decision making.', tech: ['React', 'Python', 'TensorFlow'], status: 'deployed' },
  { id: 'mod-02', title: 'Quantum Commerce', category: 'E-Commerce', desc: 'Next-generation commerce platform with AI recommendations and seamless payment flows.', tech: ['Next.js', 'Node.js', 'Stripe'], status: 'deployed' },
  { id: 'mod-03', title: 'Synth Assistant', category: 'AI Systems', desc: 'AI-powered voice assistant with natural language processing and smart integrations.', tech: ['Python', 'OpenAI', 'FastAPI'], status: 'active' },
  { id: 'mod-04', title: 'CodeFlow IDE', category: 'Developer Tools', desc: 'Collaborative code editor with real-time sync, AI completion, and integrated terminal.', tech: ['TypeScript', 'WebRTC', 'Monaco'], status: 'deployed' },
];

const SystemModules = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const theme = useThemeStore((state) => state.theme);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [35, -35]);

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const accentColor = theme === 'light' ? '#2563eb' : '#60a5fa';

  return (
    <section id="modules" ref={ref} className="relative py-28 z-10" data-testid="modules-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-5" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <div className="w-1.5 h-1.5" style={{ background: accentColor }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)]">System_Modules</span>
          <div className="flex-1 h-px bg-[var(--animus-border)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)] opacity-50">02</span>
        </motion.div>

        <motion.h2 className="section-title mb-14" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          Featured <span style={{ color: accentColor }}>Work</span>
        </motion.h2>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {modules.map((m) => (
            <motion.article
              key={m.id}
              className="module-card group cursor-pointer"
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: accentColor }}
              transition={{ duration: 0.15 }}
              data-testid={`module-${m.id}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="font-mono text-[9px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-70">
                  {m.id} / {m.category}
                </div>
                <div className="flex items-center gap-1">
                  <motion.div 
                    className={`w-1 h-1 rounded-full ${m.status === 'deployed' ? 'bg-green-500' : 'bg-yellow-500'}`}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-50">{m.status}</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-[var(--animus-accent)] transition-colors duration-150">{m.title}</h3>
              <p className="text-[13px] text-[var(--animus-text-muted)] leading-relaxed mb-5 opacity-80">{m.desc}</p>

              <div className="flex items-center justify-between pt-3 border-t border-[var(--animus-border)]">
                <div className="flex gap-1.5">
                  {m.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] font-mono bg-[var(--animus-accent-soft)] text-[var(--animus-accent)]">{t}</span>
                  ))}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[var(--animus-text-muted)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--animus-accent)] transition-all duration-150" />
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div className="flex justify-center mt-10" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <motion.button 
            className="animus-button-ghost flex items-center gap-2 text-xs"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            data-testid="view-all-modules"
          >
            View All Modules
            <ExternalLink className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SystemModules;
