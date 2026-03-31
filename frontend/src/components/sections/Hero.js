import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSystemStore } from '../../store/useStore';

const Hero = () => {
  const [bootPhase, setBootPhase] = useState(0); // 0: init, 1: loading, 2: ready, 3: complete
  const [bootProgress, setBootProgress] = useState(0);
  const [bootText, setBootText] = useState('');
  const setSystemStatus = useSystemStore((state) => state.setSystemStatus);

  // Cinematic boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      // Phase 0: Initial delay
      await new Promise(r => setTimeout(r, 300));
      
      // Phase 1: Loading
      setBootPhase(1);
      setBootText('INITIALIZING ASTREON CORE...');
      
      // Progress animation
      const progressInterval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 80);
      
      await new Promise(r => setTimeout(r, 1200));
      clearInterval(progressInterval);
      setBootProgress(100);
      
      // Phase 2: Ready
      setBootPhase(2);
      setBootText('SYSTEM ONLINE');
      setSystemStatus('online');
      
      await new Promise(r => setTimeout(r, 600));
      
      // Phase 3: Complete - reveal content
      setBootPhase(3);
      setSystemStatus('optimal');
    };

    bootSequence();
  }, [setSystemStatus]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: { 
      scale: 1.03,
      transition: { duration: 0.15, ease: 'easeOut' }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center z-10"
      data-testid="hero-section"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <AnimatePresence mode="wait">
          {/* Boot Sequence Overlay */}
          {bootPhase < 3 && (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              key="boot-sequence"
            >
              {/* Boot text */}
              <motion.span 
                className="hud-text mb-6 text-[var(--animus-accent)]"
                key={bootText}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0.7] }}
                transition={{ duration: 0.5 }}
              >
                {bootText}
              </motion.span>
              
              {/* Progress bar */}
              {bootPhase === 1 && (
                <div className="w-48 h-[2px] bg-[var(--animus-border)] overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--animus-accent)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(bootProgress, 100)}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                  />
                </div>
              )}
              
              {/* System online indicator */}
              {bootPhase === 2 && (
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Main Content */}
          {bootPhase === 3 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key="main-content"
            >
              {/* Status Line */}
              <motion.div
                className="flex items-center justify-center gap-3 mb-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ 
                    boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 6px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="hud-text">System Initialized</span>
                <div className="h-[1px] w-12 bg-[var(--animus-border)]" />
                <span className="hud-text opacity-50">v2.0</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-6"
                variants={itemVariants}
                data-testid="hero-title"
              >
                ASTREON
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="font-mono text-sm tracking-[0.2em] text-[var(--animus-text-muted)] uppercase mb-4"
                variants={itemVariants}
              >
                Digital Architecture System
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-lg text-[var(--animus-text-muted)] max-w-xl mx-auto mb-12 leading-relaxed"
                variants={itemVariants}
              >
                Full-Stack Developer crafting intelligent systems
                and immersive digital experiences.
              </motion.p>

              {/* CTA Buttons with micro-interactions */}
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                variants={itemVariants}
              >
                <motion.a
                  href="#modules"
                  className="animus-button group"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  data-testid="hero-cta-enter"
                >
                  <span className="flex items-center gap-2">
                    Enter System
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-150" />
                  </span>
                </motion.a>

                <motion.a
                  href="#transmission"
                  className="animus-button-ghost"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  data-testid="hero-cta-contact"
                >
                  Transmission
                </motion.a>
              </motion.div>

              {/* Module Indicators */}
              <motion.div
                className="flex items-center justify-center gap-8 mt-16"
                variants={itemVariants}
              >
                {['Identity', 'Modules', 'Matrix', 'Interface'].map((module, i) => (
                  <motion.div 
                    key={module} 
                    className="flex items-center gap-2 cursor-default"
                    whileHover={{ opacity: 1 }}
                    initial={{ opacity: 0.5 }}
                  >
                    <div className="w-1.5 h-1.5 bg-[var(--animus-accent)]" />
                    <span className="hud-text">{module}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      {bootPhase === 3 && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-[var(--animus-text-muted)]" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
