import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useThemeStore } from '../../store/useStore';

// CSS-based Animus Background with enhanced depth and parallax
const AnimusBackground = () => {
  const theme = useThemeStore((state) => state.theme);
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  
  // Scroll-based transforms
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Depth-based scroll effects
  const gridScale = useTransform(smoothProgress, [0, 1], [1, 0.95]);
  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 0.3, 0.2]);
  const ringsScale = useTransform(smoothProgress, [0, 1], [1, 0.85]);
  const ringsY = useTransform(smoothProgress, [0, 1], [0, -50]);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth mouse parallax (disabled on mobile)
  useEffect(() => {
    if (isMobile) return;
    
    let rafId;
    const targetPos = { x: 0, y: 0 };
    
    const handleMouseMove = (e) => {
      targetPos.x = (e.clientX / window.innerWidth - 0.5) * 30;
      targetPos.y = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    const animate = () => {
      setMousePos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.05,
        y: prev.y + (targetPos.y - prev.y) * 0.05
      }));
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden"
      data-testid="animus-background"
      style={{
        background: theme === 'light' 
          ? 'linear-gradient(180deg, #f8f9fc 0%, #e8eaef 100%)'
          : 'linear-gradient(180deg, #0a0a0f 0%, #111118 100%)'
      }}
    >
      {/* Grid Pattern with scroll depth */}
      <motion.div 
        className="absolute inset-0"
        style={{
          scale: gridScale,
          opacity: gridOpacity,
          backgroundImage: theme === 'light'
            ? `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`
            : `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
        }}
      />

      {/* Volumetric Light Beams with depth */}
      {!isMobile && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[1px]"
          style={{
            left: `${15 + i * 15}%`,
            top: '-10%',
            height: '120%',
            background: theme === 'light'
              ? 'linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.12), transparent)'
              : 'linear-gradient(180deg, transparent, rgba(96, 165, 250, 0.08), transparent)',
            transform: `translateX(${mousePos.x * (0.2 + i * 0.1)}px)`,
          }}
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Central Rings with scroll depth */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          scale: ringsScale,
          y: ringsY,
          x: mousePos.x * -0.2,
        }}
      >
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `${ring * 200}px`,
              height: `${ring * 200}px`,
              borderColor: theme === 'light' 
                ? `rgba(0, 0, 0, ${0.04 / ring})`
                : `rgba(255, 255, 255, ${0.025 / ring})`,
            }}
            animate={{
              rotate: ring % 2 === 0 ? 360 : -360,
            }}
            transition={{
              rotate: { duration: 80 + ring * 30, repeat: Infinity, ease: 'linear' },
            }}
          />
        ))}
        
        {/* Center Core */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: theme === 'light' ? '#2563eb' : '#60a5fa',
          }}
          animate={{
            boxShadow: theme === 'light'
              ? ['0 0 15px rgba(37, 99, 235, 0.3)', '0 0 25px rgba(37, 99, 235, 0.5)', '0 0 15px rgba(37, 99, 235, 0.3)']
              : ['0 0 15px rgba(96, 165, 250, 0.2)', '0 0 25px rgba(96, 165, 250, 0.4)', '0 0 15px rgba(96, 165, 250, 0.2)']
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Floating Geometric Elements with depth */}
      {!isMobile && [...Array(4)].map((_, i) => (
        <motion.div
          key={`geo-${i}`}
          className="absolute w-3 h-3 border rotate-45"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 30}%`,
            borderColor: theme === 'light' 
              ? 'rgba(37, 99, 235, 0.12)'
              : 'rgba(96, 165, 250, 0.08)',
            transform: `translate(${mousePos.x * (0.3 + i * 0.15)}px, ${mousePos.y * (0.3 + i * 0.1)}px) rotate(45deg)`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Gradient Fog Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: theme === 'light'
            ? 'radial-gradient(ellipse at center, transparent 25%, rgba(248, 249, 252, 0.85) 75%)'
            : 'radial-gradient(ellipse at center, transparent 25%, rgba(10, 10, 15, 0.9) 75%)'
        }}
      />

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: theme === 'light' ? 0.015 : 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default AnimusBackground;
