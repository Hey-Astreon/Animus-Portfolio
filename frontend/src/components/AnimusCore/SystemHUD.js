import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore, useSystemStore } from '../../store/useStore';

const SystemHUD = () => {
  const { fps, performance, loadTime, systemStatus } = useSystemStore();
  const theme = useThemeStore((state) => state.theme);
  const [currentTime, setCurrentTime] = useState(new Date());
  const frameRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  
  // FPS Counter
  useEffect(() => {
    let animationId;
    const { setFps } = useSystemStore.getState();
    
    const updateFPS = () => {
      frameRef.current++;
      const now = Date.now();
      
      if (now - lastTimeRef.current >= 1000) {
        setFps(frameRef.current);
        frameRef.current = 0;
        lastTimeRef.current = now;
      }
      
      animationId = requestAnimationFrame(updateFPS);
    };
    
    animationId = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial load time measurement
  useEffect(() => {
    const { setLoadTime, setSystemStatus, setPerformance } = useSystemStore.getState();
    const loadStart = window.performance?.timing?.navigationStart || Date.now() - 1000;
    const loadEnd = Date.now();
    setLoadTime(((loadEnd - loadStart) / 1000).toFixed(2));
    setPerformance(Math.min(100, Math.round((60 / Math.max(fps, 30)) * 100)));
    
    setTimeout(() => setSystemStatus('online'), 500);
  }, [fps]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <motion.div 
      className="fixed top-6 right-6 z-50 hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      data-testid="system-hud"
    >
      <div className="animus-surface rounded-sm p-4 min-w-[180px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--animus-border)]">
          <div className="status-dot" />
          <span className="hud-text">{systemStatus}</span>
        </div>

        {/* Stats Grid */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">FPS</span>
            <span className="font-mono text-xs font-medium">{fps}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">PERF</span>
            <span className="font-mono text-xs font-medium">{performance}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">LOAD</span>
            <span className="font-mono text-xs font-medium">{loadTime}s</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">TIME</span>
            <span className="font-mono text-xs font-medium">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemHUD;
