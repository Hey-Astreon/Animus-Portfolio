import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useSystemStore } from '../../store/useStore';

const Hero = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const setSystemStatus = useSystemStore((state) => state.setSystemStatus);

  useEffect(() => {
    // Boot sequence animation
    const bootInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          setIsBooted(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(bootInterval);
  }, []);

  // Update system status after boot completes
  useEffect(() => {
    if (isBooted) {
      setSystemStatus('online');
    }
  }, [isBooted, setSystemStatus]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center z-10"
      data-testid="hero-section"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Boot Sequence */}
        {!isBooted ? (
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="hud-text mb-4">Initializing System</span>
            <div className="w-48 h-[2px] bg-[var(--animus-border)] overflow-hidden">
              <motion.div
                className="h-full bg-[var(--animus-accent)]"
                style={{ width: `${Math.min(bootProgress, 100)}%` }}
              />
            </div>
            <span className="hud-text mt-2">{Math.round(bootProgress)}%</span>
          </motion.div>
        ) : (
          <>
            {/* Status Line */}
            <motion.div
              className="flex items-center justify-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="status-dot" />
              <span className="hud-text">System Initialized</span>
              <div className="h-[1px] w-12 bg-[var(--animus-border)]" />
              <span className="hud-text opacity-50">v2.0</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              data-testid="hero-title"
            >
              ASTREON
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-sm tracking-[0.2em] text-[var(--animus-text-muted)] uppercase mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Digital Architecture System
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg text-[var(--animus-text-muted)] max-w-xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Full-Stack Developer crafting intelligent systems
              and immersive digital experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <a
                href="#modules"
                className="animus-button group"
                data-testid="hero-cta-enter"
              >
                <span className="flex items-center gap-2">
                  Enter System
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>

              <a
                href="#transmission"
                className="animus-button-ghost"
                data-testid="hero-cta-contact"
              >
                Transmission
              </a>
            </motion.div>

            {/* Module Indicators */}
            <motion.div
              className="flex items-center justify-center gap-8 mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {['Identity', 'Modules', 'Matrix', 'Interface'].map((module, i) => (
                <div key={module} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[var(--animus-accent)] opacity-50" />
                  <span className="hud-text opacity-50">{module}</span>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Scroll Indicator */}
      {isBooted && (
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <ChevronDown className="w-5 h-5 text-[var(--animus-text-muted)]" />
        </motion.div>
      )}
    </section>
  );
};

export default Hero;
