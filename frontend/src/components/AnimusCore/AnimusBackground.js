import { useCallback } from 'react';
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";
import { useThemeStore } from '../../store/useStore';

const AstreonBackground = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  // Initialize tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-astreon-bg overflow-hidden transition-colors duration-500">
      {/* Layer 1: Gradient Field (Minimal) */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-astreon-accent/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-astreon-accent/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      {/* Layer 2: Neural Grid & Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute inset-0 z-10"
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              resize: true,
            },
            modes: {
              grab: { distance: 200, links: { opacity: 0.15 } },
            },
          },
          particles: {
            color: { value: isDark ? "#FFFFFF" : "#000000" },
            links: {
              color: "#0EA5E9",
              distance: 180,
              enable: true,
              opacity: isDark ? 0.08 : 0.04,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.6,
              straight: false,
            },
            number: { 
              density: { enable: true, area: 1000 }, 
              value: 70 
            },
            opacity: { value: isDark ? 0.2 : 0.1 },
            shape: { type: "circle" },
            size: { value: { min: 0.5, max: 1.5 } },
          },
          detectRetina: true,
        }}
      />

      {/* Layer 3: Energy Waves / Noise */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 z-30 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  );
};

export default AstreonBackground;
