import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useSpring, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/useStore';

const AstreonCore = ({ isBooted = true }) => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';
  const containerRef = useRef(null);
  const [proximity, setProximity] = useState(1); // 0 = close, 1 = far
  const [isScanned, setIsScanned] = useState(false);

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 80, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax offsets (subtle)
  const translateX = useTransform(smoothX, [-400, 400], [-15, 15]);
  const translateY = useTransform(smoothY, [-400, 400], [-15, 15]);
  
  // Dynamic rotation for interaction
  const rotateX = useTransform(smoothY, [-400, 400], [10, -10]);
  const rotateY = useTransform(smoothX, [-400, 400], [-10, 10]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    mouseX.set(dx);
    mouseY.set(dy);

    // Proximity: 0 when mouse is at center, 1 when > 500px away
    const norm = Math.min(distance / 500, 1);
    setProximity(norm);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Once booted, trigger the radial scan after a short delay
  useEffect(() => {
    if (isBooted) {
      const timer = setTimeout(() => setIsScanned(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isBooted]);

  const glowIntensity = isDark ? (1 - proximity) * 0.8 + 0.2 : (1 - proximity) * 0.1;
  const coreSize = 650;

  // Theme-aware tokens
  const wireframeColor = isDark 
    ? `rgba(14, 165, 233, ${0.15 + glowIntensity * 0.2})` 
    : `rgba(20, 20, 20, ${0.15 + glowIntensity * 0.1})`;
  
  const wireframeGlow = isDark 
    ? `0 0 8px rgba(14, 165, 233, ${glowIntensity * 0.3})` 
    : 'none';
  
  const ringColor = isDark 
    ? `rgba(255, 255, 255, ${0.12 + glowIntensity * 0.15})` 
    : `rgba(20, 20, 20, 0.2)`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden"
      aria-hidden="true"
      style={{ perspective: '1200px' }}
    >
      {/* Background vignette strictly behind the orb */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: isDark 
            ? 'radial-gradient(circle at center, rgba(0,0,0,0) 30%, var(--astreon-bg) 70%)'
            : 'radial-gradient(circle at center, rgba(255,255,255,0) 30%, var(--astreon-bg) 70%)',
          zIndex: -1
        }}
      />

      <motion.div
        className="relative flex items-center justify-center transform-gpu"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isBooted ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: coreSize,
          height: coreSize,
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* === LAYER 1: OUTER WIREFRAME CAGE === */}
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d', opacity: 0.4 }}
          animate={{ rotateY: 360, rotateX: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          {/* Longitude Rings */}
          {[0, 30, 60, 90, 120, 150].map((deg, i) => (
            <div
              key={`long-${i}`}
              className="absolute inset-0 rounded-full border transition-colors duration-500"
              style={{
                transform: `rotateY(${deg}deg)`,
                borderColor: wireframeColor,
                boxShadow: wireframeGlow,
                borderWidth: '1px',
              }}
            />
          ))}
        </motion.div>

        {/* === LAYER 2: SYSTEM PROFILE (PFP) === */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
          {/* Inner core support glow (behind PFP) */}
          <AnimatePresence>
            {isScanned && (
              <motion.div 
                className="absolute w-[340px] h-[340px] rounded-full blur-[60px] pointer-events-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: isDark ? 0.4 : 0.08, 
                  scale: (1 - proximity * 0.1),
                  background: isDark ? 'var(--astreon-accent)' : 'rgba(0,0,0,0.4)'
                }}
                transition={{ duration: 1 }}
              />
            )}
          </AnimatePresence>

          {/* Profile Identity */}
          <motion.div
            className="relative w-[340px] h-[340px] rounded-full overflow-hidden border border-white/5"
            initial={{ opacity: 0, scale: 1.05, filter: 'brightness(0) contrast(200%) grayscale(100%)' }}
            animate={isScanned 
              ? { 
                  opacity: 1, 
                  scale: 1, 
                  filter: isDark 
                    ? `brightness(${1.1 - proximity * 0.1}) contrast(110%) grayscale(0%)` 
                    : 'brightness(1) contrast(100%) grayscale(100%)'
                } 
              : { opacity: 0, scale: 1.05 }
            }
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.img 
              src="/pfp.png" 
              alt="System Identity"
              className="w-full h-full object-cover rounded-full"
              animate={{
                scale: [1, 1.015, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Scanning Line / Wave Overlay */}
            <motion.div 
              className="absolute inset-0 z-20 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={isScanned ? { scale: [0, 1.5], opacity: [0.8, 0] } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              style={{
                background: `radial-gradient(circle, transparent 40%, ${isDark ? 'var(--astreon-accent)' : '#000'} 60%, transparent 70%)`
              }}
            />
          </motion.div>
        </div>

        {/* === LAYER 3: CONTAINMENT RINGS === */}
        {/* Active Orbital Ring */}
        <motion.div
          className="absolute inset-[60px]"
          style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
          animate={{ rotateZ: 360, rotateX: 65, rotateY: 20 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="absolute inset-0 rounded-full border border-astreon-accent/10 transition-colors duration-500"
            style={{
              borderColor: isDark ? `rgba(14,165,233, ${0.1 + glowIntensity * 0.2})` : 'rgba(0,0,0,0.1)',
              borderWidth: '1px',
              boxShadow: isDark ? `0 0 10px rgba(14,165,233, ${glowIntensity * 0.2})` : 'none'
            }}
          />
        </motion.div>

        {/* IDENTITY VERIFIED Overlay */}
        <AnimatePresence>
          {isScanned && (
            <motion.div
              className="absolute z-[40] whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, y: 180, letterSpacing: '1em' }}
              animate={{ opacity: [0, 1, 1, 0], y: 190, letterSpacing: '0.4em' }}
              transition={{ duration: 2.2, times: [0, 0.2, 0.8, 1] }}
            >
              <span className={`font-mono text-[9px] ${isDark ? 'text-astreon-accent' : 'text-astreon-text'} bg-astreon-bg/80 px-3 py-1 backdrop-blur-sm border border-astreon-border/30`}>
                IDENTITY_VERIFIED // ROUSHAN_KUMAR
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AstreonCore;
