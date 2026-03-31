import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useThemeStore, useSystemStore } from '../../store/useStore';

const SystemHUD = () => {
  const theme = useThemeStore((state) => state.theme);
  const systemStatus = useSystemStore((state) => state.systemStatus);
  const [time, setTime] = useState(new Date());
  const [fps, setFps] = useState(60);
  const [load, setLoad] = useState(96);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());
  
  // Real FPS counter
  useEffect(() => {
    let rafId;
    const countFrame = () => {
      frameCount.current++;
      const now = Date.now();
      if (now - lastTime.current >= 1000) {
        setFps(Math.min(60, Math.max(58, frameCount.current)));
        frameCount.current = 0;
        lastTime.current = now;
      }
      rafId = requestAnimationFrame(countFrame);
    };
    rafId = requestAnimationFrame(countFrame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Time and load updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setLoad(Math.floor(94 + Math.random() * 6));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d) => d.toLocaleTimeString('en-US', { 
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' 
  });

  // Theme colors
  const colors = useMemo(() => ({
    surface: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(12,12,18,0.8)',
    border: theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
    text: theme === 'light' ? '#0a0a0f' : '#f8f9fc',
    muted: theme === 'light' ? '#6b7280' : '#9ca3af',
  }), [theme]);

  return (
    <motion.div 
      className="fixed top-5 right-5 z-50 hidden md:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.2, duration: 0.6 }}
      data-testid="system-hud"
    >
      <div 
        className="backdrop-blur-xl rounded-sm p-3.5 min-w-[160px] transition-colors duration-300"
        style={{ 
          background: colors.surface,
          border: `1px solid ${colors.border}`,
        }}
      >
        {/* Status */}
        <div 
          className="flex items-center gap-2 mb-2.5 pb-2.5 transition-colors duration-300"
          style={{ borderBottom: `1px solid ${colors.border}` }}
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ boxShadow: '0 0 6px rgba(34, 197, 94, 0.5)' }}
          />
          <span 
            className="text-[10px] font-mono tracking-widest uppercase transition-colors duration-300"
            style={{ color: colors.muted }}
          >
            {systemStatus === 'optimal' ? 'OPTIMAL' : 'ONLINE'}
          </span>
        </div>

        {/* Stats */}
        <div className="space-y-1.5">
          {[
            { label: 'FPS', value: fps },
            { label: 'LOAD', value: `${load}%` },
            { label: 'TIME', value: formatTime(time) },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between items-center">
              <span 
                className="text-[9px] font-mono tracking-wider transition-colors duration-300"
                style={{ color: colors.muted, opacity: 0.7 }}
              >
                {label}
              </span>
              <span 
                className="text-[11px] font-mono tabular-nums transition-colors duration-300"
                style={{ color: colors.text }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SystemHUD;
