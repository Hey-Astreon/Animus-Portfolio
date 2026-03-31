import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSystemStore, useThemeStore } from '../../store/useStore';

const Hero = () => {
  const [phase, setPhase] = useState(0); // 0: init, 1: loading, 2: online, 3: ready
  const setSystemStatus = useSystemStore((state) => state.setSystemStatus);
  const theme = useThemeStore((state) => state.theme);

  // Unified boot sequence
  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 400));
      setPhase(1); // Show "INITIALIZING"
      
      await new Promise(r => setTimeout(r, 1000));
      setPhase(2); // Show "SYSTEM ONLINE"
      setSystemStatus('online');
      
      await new Promise(r => setTimeout(r, 600));
      setPhase(3); // Reveal content
      setSystemStatus('optimal');
    };
    sequence();
  }, [setSystemStatus]);

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center z-10"
      data-testid="hero-section"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {/* Boot Sequence */}
          {phase < 3 && (
            <motion.div
              key="boot"
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {phase === 1 && (
                <motion.span 
                  className="font-mono text-xs tracking-[0.2em] uppercase"
                  style={{ color: theme === 'light' ? '#2563eb' : '#60a5fa' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  INITIALIZING ASTREON CORE
                </motion.span>
              )}
              {phase === 2 && (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500" style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }} />
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-green-500">
                    SYSTEM ONLINE
                  </span>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Main Content */}
          {phase === 3 && (
            <motion.div key="content" variants={stagger} initial="hidden" animate="visible">
              {/* Status */}
              <motion.div className="flex items-center justify-center gap-3 mb-8" variants={fadeUp}>
                <motion.div 
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ boxShadow: ['0 0 0 0 rgba(34,197,94,0.4)', '0 0 0 8px rgba(34,197,94,0)', '0 0 0 0 rgba(34,197,94,0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)]">
                  System Initialized
                </span>
                <span className="w-8 h-px bg-[var(--animus-border)]" />
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)] opacity-50">
                  v2.0
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-5"
                variants={fadeUp}
                data-testid="hero-title"
              >
                ASTREON
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="font-mono text-xs sm:text-sm tracking-[0.15em] text-[var(--animus-text-muted)] uppercase mb-3"
                variants={fadeUp}
              >
                Digital Architecture System
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-base sm:text-lg text-[var(--animus-text-muted)] max-w-lg mx-auto mb-10 leading-relaxed"
                variants={fadeUp}
              >
                Full-Stack Developer crafting intelligent systems
                and immersive digital experiences.
              </motion.p>

              {/* CTAs */}
              <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" variants={fadeUp}>
                <motion.a
                  href="#modules"
                  className="animus-button group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  data-testid="hero-cta-enter"
                >
                  <span className="flex items-center gap-2">
                    Enter System
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                  </span>
                </motion.a>
                <motion.a
                  href="#transmission"
                  className="animus-button-ghost"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  data-testid="hero-cta-contact"
                >
                  Transmission
                </motion.a>
              </motion.div>

              {/* Module indicators */}
              <motion.div className="flex items-center justify-center gap-6 mt-14" variants={fadeUp}>
                {['Identity', 'Modules', 'Matrix', 'Interface'].map((m) => (
                  <div key={m} className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-default">
                    <div className="w-1 h-1 bg-[var(--animus-accent)]" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--animus-text-muted)]">{m}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      {phase === 3 && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4 text-[var(--animus-text-muted)] opacity-50" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
