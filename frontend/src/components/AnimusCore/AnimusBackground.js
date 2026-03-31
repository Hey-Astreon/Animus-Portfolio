import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useThemeStore } from '../../store/useStore';

// Unified Astreon Core Background System
const AstreonCoreBackground = () => {
  const theme = useThemeStore((state) => state.theme);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);
  
  // Scroll-based transforms
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });
  
  // Depth transforms
  const gridOpacity = useTransform(smoothProgress, [0, 0.3, 1], [0.4, 0.25, 0.15]);
  const orbScale = useTransform(smoothProgress, [0, 0.5], [1, 0.6]);
  const orbOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0.3]);

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth mouse tracking
  useEffect(() => {
    if (isMobile) return;
    
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    
    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;
      setMousePos({ x: currentX * 15, y: currentY * 10 });
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isMobile]);

  // Theme-aware colors
  const colors = useMemo(() => ({
    bg: theme === 'light' ? '#f8f9fc' : '#08080c',
    bgEnd: theme === 'light' ? '#eef0f5' : '#0c0c12',
    grid: theme === 'light' ? 'rgba(0,0,0,0.025)' : 'rgba(255,255,255,0.015)',
    beam: theme === 'light' ? 'rgba(37, 99, 235, 0.06)' : 'rgba(96, 165, 250, 0.04)',
    orb: theme === 'light' ? '#2563eb' : '#60a5fa',
    orbGlow: theme === 'light' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(96, 165, 250, 0.1)',
  }), [theme]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden transition-colors duration-500"
      data-testid="astreon-background"
      style={{
        background: `linear-gradient(180deg, ${colors.bg} 0%, ${colors.bgEnd} 100%)`
      }}
    >
      {/* Grid Layer */}
      <motion.div 
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(${colors.grid} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
        }}
      />

      {/* Vertical Light Structures */}
      {!isMobile && [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px"
          style={{
            left: `${18 + i * 18}%`,
            top: 0,
            height: '100%',
            background: `linear-gradient(180deg, transparent 10%, ${colors.beam} 50%, transparent 90%)`,
            transform: `translateX(${mousePos.x * (0.1 + i * 0.05)}px)`,
          }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Astreon Core Orb */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          scale: orbScale,
          opacity: orbOpacity,
          x: mousePos.x * -0.3,
          y: mousePos.y * -0.2,
        }}
      >
        {/* Outer rings */}
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${ring * 120}px`,
              height: `${ring * 120}px`,
              borderColor: theme === 'light' 
                ? `rgba(37, 99, 235, ${0.08 / ring})`
                : `rgba(96, 165, 250, ${0.05 / ring})`,
            }}
            animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + ring * 20, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        
        {/* Core orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '12px',
            height: '12px',
            background: colors.orb,
          }}
          animate={{
            boxShadow: [
              `0 0 20px ${colors.orbGlow}, 0 0 40px ${colors.orbGlow}`,
              `0 0 30px ${colors.orbGlow}, 0 0 60px ${colors.orbGlow}`,
              `0 0 20px ${colors.orbGlow}, 0 0 40px ${colors.orbGlow}`,
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner pulse ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: '40px',
            height: '40px',
            borderColor: theme === 'light' ? 'rgba(37, 99, 235, 0.2)' : 'rgba(96, 165, 250, 0.15)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Depth fog */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: theme === 'light'
            ? 'radial-gradient(ellipse at center, transparent 20%, rgba(248, 249, 252, 0.8) 70%)'
            : 'radial-gradient(ellipse at center, transparent 20%, rgba(8, 8, 12, 0.85) 70%)'
        }}
      />

      {/* Subtle noise */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: theme === 'light' ? 0.012 : 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default AstreonCoreBackground;
