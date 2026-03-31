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
    { label: 'Years Active', value: '5+' },
    { label: 'Systems Built', value: '50+' },
    { label: 'Global Clients', value: '30+' },
  ];

  const cards = [
    { icon: User, title: 'Identity', desc: 'Full-Stack Developer & Digital Architect based globally, available for remote collaboration.' },
    { icon: Code, title: 'Expertise', desc: 'Specialized in React, Node.js, Python, AI integration, and system architecture.' },
    { icon: Briefcase, title: 'Mission', desc: 'Creating intelligent systems that solve real problems with elegant, efficient solutions.' },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const accentColor = theme === 'light' ? '#2563eb' : '#60a5fa';

  return (
    <section id="identity" ref={ref} className="relative py-28 z-10" data-testid="identity-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header */}
        <motion.div
          className="flex items-center gap-4 mb-14"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <div className="w-1.5 h-1.5" style={{ background: accentColor }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)]">Core_Identity</span>
          <div className="flex-1 h-px bg-[var(--animus-border)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)] opacity-50">01</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.h2 className="section-title mb-7" variants={fadeUp}>
              Building the<br /><span style={{ color: accentColor }}>digital future</span>
            </motion.h2>
            <motion.p className="text-[var(--animus-text-muted)] text-lg leading-relaxed mb-5" variants={fadeUp}>
              I'm a full-stack developer specializing in creating intelligent, scalable systems. My approach combines clean architecture with cutting-edge technology.
            </motion.p>
            <motion.p className="text-[var(--animus-text-muted)] leading-relaxed mb-8 opacity-80" variants={fadeUp}>
              The Astreon system represents my philosophy — technology should be precise, purposeful, and powerful.
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
