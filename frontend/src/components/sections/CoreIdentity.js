import { useRef, useMemo } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { User, Code, Briefcase } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';

const CoreIdentity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const theme = useThemeStore((state) => state.theme);
  
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const stats = [
    { label: 'Repos Created', value: '24' },
    { label: 'Certifications', value: '3' },
    { label: 'System Uptime', value: '99%' },
  ];

  const cards = [
    { icon: User, title: 'Profile', desc: 'BCA Scholar at Amity University Noida. Specializing in high-performance system logic and AI integration.' },
    { icon: Code, title: 'Tactical Stack', desc: 'Expertise in Python, FastAPI, React, and TypeScript. Building scalable agentic workflows.' },
    { icon: Briefcase, title: 'Objective', desc: 'Engineering modular AI systems that automate complex human-software interactions.' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  const accentColor = 'var(--astreon-accent)';

  return (
    <section id="identity" ref={ref} className="relative py-32 z-10" data-testid="identity-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <div className="w-1.5 h-1.5 bg-astreon-accent" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-astreon-text-muted">System_Identity</span>
          <div className="flex-1 h-px bg-astreon-border/20" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-50">01</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.h2 className="font-display text-5xl font-bold tracking-tight mb-8 text-astreon-text" variants={fadeUp}>
              Engineering the<br />digital <span className="text-astreon-accent">architecture</span>.
            </motion.h2>
            <motion.p className="text-astreon-text-muted text-lg leading-relaxed mb-6" variants={fadeUp}>
              I build scalable web applications and AI-powered systems focused on performance and real-world impact.
            </motion.p>
            <motion.p className="text-astreon-text-muted leading-relaxed mb-10 opacity-70" variants={fadeUp}>
              My approach integrates clean system architecture with advanced AI logic to create interfaces that are not only functional but intelligent.
            </motion.p>

            {/* Stats */}
            <motion.div className="grid grid-cols-3 gap-5" variants={fadeUp}>
              {stats.map((s, i) => (
                <motion.div 
                  key={s.label} 
                  className="text-center"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.15 }}
                  data-testid={`stat-${i}`}
                >
                  <div className="text-2xl font-display font-semibold mb-0.5">{s.value}</div>
                  <div className="font-mono text-[9px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-70">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Cards */}
          <motion.div 
            className="space-y-3"
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          >
            {cards.map((card) => (
              <motion.div
                key={card.title}
                className="module-card group"
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: accentColor }}
                transition={{ duration: 0.15 }}
                data-testid={`identity-card-${card.title.toLowerCase()}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 border border-[var(--animus-border)] group-hover:border-[var(--animus-accent)] transition-colors duration-150">
                    <card.icon className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1.5 text-sm">{card.title}</h3>
                    <p className="text-[13px] text-[var(--animus-text-muted)] leading-relaxed opacity-80">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CoreIdentity;
