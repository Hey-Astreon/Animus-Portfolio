import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore, useSystemStore } from '../../store/useStore';

const SystemHUD = () => {
  const { fps, performance, systemStatus } = useSystemStore();
  const theme = useThemeStore((state) => state.theme);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [displayFps, setDisplayFps] = useState(60);
  const [displayPerf, setDisplayPerf] = useState(98);
  const [loadValue, setLoadValue] = useState(94);
  const frameRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  
  // Realistic FPS counter with smooth fluctuation
  useEffect(() => {
    let animationId;
    const { setFps } = useSystemStore.getState();
    
    const updateFPS = () => {
      frameRef.current++;
      const now = Date.now();
      
      if (now - lastTimeRef.current >= 1000) {
        const actualFps = frameRef.current;
        setFps(actualFps);
        // Smooth display FPS (fluctuates 58-61)
        setDisplayFps(Math.min(61, Math.max(58, actualFps + Math.floor(Math.random() * 4) - 2)));
        frameRef.current = 0;
        lastTimeRef.current = now;
      }
      
      animationId = requestAnimationFrame(updateFPS);
    };
    
    animationId = requestAnimationFrame(updateFPS);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Fluctuating performance and load values
  useEffect(() => {
    const perfInterval = setInterval(() => {
      // Performance fluctuates 96-100%
      setDisplayPerf(Math.floor(Math.random() * 5) + 96);
      // Load fluctuates 90-100%
      setLoadValue(Math.floor(Math.random() * 11) + 90);
    }, 2000);
    
    return () => clearInterval(perfInterval);
  }, []);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Set system online after mount
  useEffect(() => {
    const { setSystemStatus, setPerformance } = useSystemStore.getState();
    setPerformance(displayPerf);
    setTimeout(() => setSystemStatus('optimal'), 1500);
  }, [displayPerf]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = () => {
    if (systemStatus === 'optimal') return '#22c55e';
    if (systemStatus === 'online') return '#22c55e';
    return '#eab308';
  };

  return (
    <motion.div 
      className="fixed top-6 right-6 z-50 hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.8, ease: 'easeOut' }}
      data-testid="system-hud"
    >
      <div className="animus-surface rounded-sm p-4 min-w-[180px]">
        {/* Header with blinking indicator */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--animus-border)]">
          <motion.div 
            className="w-[6px] h-[6px] rounded-full"
            style={{ backgroundColor: getStatusColor() }}
            animate={{ 
              opacity: [1, 0.4, 1],
              boxShadow: [
                `0 0 8px ${getStatusColor()}`,
                `0 0 4px ${getStatusColor()}`,
                `0 0 8px ${getStatusColor()}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span 
            className="hud-text"
            key={systemStatus}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {systemStatus.toUpperCase()}
          </motion.span>
        </div>

        {/* Stats Grid with smooth number transitions */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">FPS</span>
            <motion.span 
              className="font-mono text-xs font-medium tabular-nums"
              key={displayFps}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {displayFps}
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">PERF</span>
            <motion.span 
              className="font-mono text-xs font-medium tabular-nums"
              key={displayPerf}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {displayPerf}%
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">LOAD</span>
            <motion.span 
              className="font-mono text-xs font-medium tabular-nums"
              key={loadValue}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {loadValue}%
            </motion.span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="hud-text opacity-60">TIME</span>
            <span className="font-mono text-xs font-medium tabular-nums">
              {formatTime(currentTime)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemHUD;
