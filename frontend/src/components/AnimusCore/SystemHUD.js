import React, { useState, useEffect } from 'react';
import { useSystemStore, useThemeStore } from '../../store/useStore';

const SystemHUD = () => {
  const { currentSection, systemStatus, target, focusStatus } = useSystemStore();
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';
  
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(12);
  const [time, setTime] = useState(new Date().toISOString().slice(11, 19));

  useEffect(() => {
    // Simulated Latency
    const latencyInterval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 5) + 10);
    }, 3000);

    // Real Clock
    const timeInterval = setInterval(() => {
      setTime(new Date().toISOString().slice(11, 19));
    }, 1000);

    // FPS Calculation (simple)
    let frames = 0;
    let startTime = performance.now();
    
    const countFrames = () => {
      frames++;
      const now = performance.now();
      if (now >= startTime + 1000) {
        setFps(Math.round(frames * 1000 / (now - startTime)));
        frames = 0;
        startTime = now;
      }
      requestAnimationFrame(countFrames);
    };
    
    const frameId = requestAnimationFrame(countFrames);

    return () => {
      clearInterval(latencyInterval);
      clearInterval(timeInterval);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[60] font-mono text-[10px] tracking-widest uppercase pointer-events-none">
      <div className={`p-4 border border-astreon-border/30 backdrop-blur-md bg-astreon-bg/20 transition-all duration-300 ${isDark ? 'text-astreon-accent' : 'text-astreon-text'}`}>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="opacity-50">STATUS:</span>
            <span className="flex items-center gap-1.5 opacity-90 font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-astreon-accent animate-pulse-status" />
              {systemStatus === 'optimal' ? 'ONLINE' : 'INITIALIZING'}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="opacity-50">MODULE:</span>
            <span className="opacity-90 font-medium">[{currentSection}]</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="opacity-50 text-[9px]">TARGET:</span>
            <span className="opacity-90 font-medium text-astreon-accent">{target}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="opacity-50 text-[9px]">FOCUS:</span>
            <span className="opacity-90 font-medium">{focusStatus}</span>
          </div>

          <div className="h-px bg-astreon-border/20 my-1" />

          <div className="grid grid-cols-2 gap-x-6 gap-y-1 opacity-60">
            <div className="flex justify-between">
              <span>LATENCY</span>
              <span>{latency}MS</span>
            </div>
            <div className="flex justify-between">
              <span>FPS</span>
              <span>{fps}</span>
            </div>
            <div className="flex justify-between col-span-2 mt-1">
              <span>UTC_TIME</span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHUD;
