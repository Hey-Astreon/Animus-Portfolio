import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import AstreonCore from '../AnimusCore/AstreonCore';
import { useSystemStore, useThemeStore } from '../../store/useStore';

const Hero = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { setTarget, setFocusStatus, setSystemStatus } = useSystemStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  // Mouse Parallax for Background Title
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX - window.innerWidth / 2) / 50,
      y: (e.clientY - window.innerHeight / 2) / 50,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    // Boot sequence
    const bootTimer = setTimeout(() => {
      setIsBooted(true);
      setSystemStatus('optimal');
    }, 400);
    const contentTimer = setTimeout(() => setShowContent(true), 1200);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(bootTimer);
      clearTimeout(contentTimer);
    };
  }, [handleMouseMove, setSystemStatus]);

  const springConfig = { damping: 25, stiffness: 150 };
  const parallaxX = useSpring(mousePos.x, springConfig);
  const parallaxY = useSpring(mousePos.y, springConfig);

  return (
    <section 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => {
        setTarget('ROUSHAN_KUMAR');
        setFocusStatus('FOCUSED');
      }}
      onMouseLeave={() => {
        setTarget('SYSTEM_IDLE');
        setFocusStatus('SCANNING');
      }}
    >
      {/* 0. INITIAL SYSTEM BOOT (Glitch Overlay) */}
      <AnimatePresence>
        {!isBooted && (
          <motion.div 
            className="absolute inset-0 z-[100] bg-astreon-bg flex items-center justify-center"
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="w-full h-px bg-astreon-accent/50"
              animate={{ 
                scaleX: [0, 1, 1], 
                opacity: [0, 1, 0],
                y: [-20, 20, -10, 10, 0] 
              }}
              transition={{ duration: 0.4, times: [0, 0.2, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>



      {/* 2. TECHNICAL METADATA LAYER (HEADER) */}
      <div className="absolute top-32 left-0 right-0 z-20 flex flex-col items-center">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: -10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
        >
          <div className="w-12 h-px bg-astreon-accent/30" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-astreon-text-muted">
            SYSTEMS ARCHITECT // ROUSHAN KUMAR
          </span>
          <div className="w-12 h-px bg-astreon-accent/30" />
        </motion.div>
      </div>

      {/* 3. PRIMARY SYSTEM CORE (Orb + PFP) */}
      <div className="relative z-10 w-[650px] h-[650px] flex items-center justify-center">
        <AstreonCore isBooted={isBooted} />
      </div>

      {/* 4. TECHNICAL METADATA LAYER (FOOTER) */}
      <div className="absolute bottom-32 left-0 right-0 z-20 flex flex-col items-center">
        <motion.div
          className="px-6 py-2 border-x border-astreon-border/20"
          initial={{ opacity: 0, y: 10 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
        >
          <span className="font-mono text-[11px] tracking-[0.5em] uppercase text-astreon-text">
            AI LOGIC & AUTOMATION INTERFACE
          </span>
        </motion.div>
        
        {/* Interaction Prompts */}
        <motion.div 
          className="mt-8 flex gap-8"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <a href="#identity" className="group flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] tracking-widest text-astreon-text-muted group-hover:text-astreon-accent transition-colors cursor-pointer">INITIALIZE_IDENTITY</span>
            <div className="w-px h-8 bg-gradient-to-b from-astreon-accent/50 to-transparent" />
          </a>
          <a href="#modules" className="group flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] tracking-widest text-astreon-text-muted group-hover:text-astreon-accent transition-colors cursor-pointer">EXPLORE_MODULES</span>
            <div className="w-px h-8 bg-gradient-to-b from-astreon-accent/50 to-transparent" />
          </a>
        </motion.div>
      </div>

      {/* 5. SYSTEM CORNER DECORATIONS */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-astreon-border/20 pointer-events-none" />
      <div className="absolute top-10 right-10 w-20 h-20 border-t border-r border-astreon-border/20 pointer-events-none" />
    </section>
  );
};

export default Hero;
