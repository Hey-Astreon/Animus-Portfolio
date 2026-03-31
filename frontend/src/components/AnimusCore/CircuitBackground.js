import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useThemeStore } from '../../store/useStore';

const CircuitBackground = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';
  
  // Refs for zero-render interactivity
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const linesRef = useRef([]);
  const nodesRef = useRef([]);
  const pulsesRef = useRef([]);
  const requestRef = useRef();
  const timeRef = useRef(0);

  // 1. Scroll Context Adaptation
  const { scrollY } = useScroll();
  // Map scroll position to intensity (1 = Hero, 0 = Content)
  // Intensity starts at 1, drops to 0 by 400px of scroll
  const intensity = useTransform(scrollY, [0, 400], [1, 0]);

  // 1. Initial Grid Generation (One-time)
  useMemo(() => {
    const grid = 60;
    const width = 3000;
    const height = 2000;
    
    const pLines = [];
    const pNodes = [];

    for (let x = 0; x < width; x += grid) {
      for (let y = 0; y < height; y += grid) {
        const isPrimaryX = x % (grid * 3) === 0;
        const isPrimaryY = y % (grid * 3) === 0;

        // Structured Horizontal
        if (Math.random() > 0.8) {
          const length = Math.floor(Math.random() * 2 + 1) * grid;
          pLines.push({
            x1: x, y1: y, x2: x + length, y2: y,
            tier: isPrimaryY ? 'primary' : 'secondary',
            pulse: isPrimaryY && Math.random() > 0.7 ? { progress: 0, speed: 0.005 + Math.random() * 0.01 } : null
          });
          if (isPrimaryY || Math.random() > 0.9) pNodes.push({ x, y });
        }

        // Structured Vertical
        if (Math.random() > 0.8) {
          const length = Math.floor(Math.random() * 2 + 1) * grid;
          pLines.push({
            x1: x, y1: y, x2: x, y2: y + length,
            tier: isPrimaryX ? 'primary' : 'secondary',
            pulse: isPrimaryX && Math.random() > 0.7 ? { progress: 0, speed: 0.005 + Math.random() * 0.01 } : null
          });
          if (isPrimaryX || Math.random() > 0.9) pNodes.push({ x, y });
        }
      }
    }
    linesRef.current = pLines;
    nodesRef.current = pNodes;
  }, []);

  // 2. High-Performance Animation Loop
  const animate = (time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    const dpr = window.devicePixelRatio || 1;

    // Subtle drift calculation
    timeRef.current += 0.002;
    const driftX = Math.sin(timeRef.current) * 10;
    const driftY = Math.cos(timeRef.current * 0.8) * 10;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.translate(driftX, driftY);

    // Draw Elements
    const mouse = mouseRef.current;
    
    // Theme Colors
    const primaryColor = isDark ? "#0EA5E9" : "#111111";
    const secondaryColor = isDark ? "#222222" : "#DDDDDD";
    const nodeColor = isDark ? "#b6e4f9" : "#111111";
    const accentColor = "#0EA5E9";

    // 3. Adaptive Intensity & Interactivity
    const currentIntensity = intensity.get();
    const isHeroMode = currentIntensity > 0.05;

    // Draw Lines
    linesRef.current.forEach(line => {
      const midX = (line.x1 + line.x2) / 2;
      const midY = (line.y1 + line.y2) / 2;
      
      // Proximity Calculation (Only in Hero Mode)
      let isActive = false;
      if (isHeroMode) {
        const dx = mouse.x - midX - driftX;
        const dy = mouse.y - midY - driftY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        isActive = dist < 200;
      }

      // Opacity/Style logic
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);

      if (line.tier === 'primary') {
        ctx.lineWidth = isActive ? 1.8 : 1.2;
        ctx.strokeStyle = isActive ? primaryColor : (isDark ? "#334155" : "#1A1A1A");
        // Base opacity drops significantly in content mode
        ctx.globalAlpha = (isActive ? 0.9 : 0.35) * (isHeroMode ? currentIntensity : 0.4);
        if (isDark && isActive && isHeroMode) {
           ctx.shadowBlur = 8;
           ctx.shadowColor = accentColor;
        }
      } else {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = isActive ? primaryColor : secondaryColor;
        ctx.globalAlpha = (isActive ? 0.6 : 0.15) * (isHeroMode ? currentIntensity : 0.3);
        ctx.shadowBlur = 0;
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // Reset for next line

      // Draw Pulses (Only in Hero Mode)
      if (line.pulse && isHeroMode) {
        line.pulse.progress += line.pulse.speed;
        if (line.pulse.progress > 1.5) line.pulse.progress = -0.5; // Staggered entry

        if (line.pulse.progress >= 0 && line.pulse.progress <= 1) {
          const px = line.x1 + (line.x2 - line.x1) * line.pulse.progress;
          const py = line.y1 + (line.y2 - line.y1) * line.pulse.progress;
          
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = currentIntensity;
          if (isDark) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = accentColor;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    });

    // Draw Nodes
    ctx.globalAlpha = 0.4 * (isHeroMode ? currentIntensity : 0.2);
    nodesRef.current.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor;
      ctx.fill();
    });

    ctx.restore();
    requestRef.current = requestAnimationFrame(animate);
  };

  // 3. Lifecycle & Event Handling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isDark]); // Re-run loop only on theme change for color stability

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

export default CircuitBackground;
