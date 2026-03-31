import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/useStore';

const CorePulse = () => {
  const theme = useThemeStore((state) => state.theme);
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-astreon-accent/10"
          initial={{ width: 300, height: 300, opacity: 0, scale: 1 }}
          animate={{
            width: [300, 900],
            height: [300, 900],
            opacity: [0.4, 0],
            scale: [1, 1.25],
            boxShadow: isDark 
              ? ["0 0 0px var(--astreon-accent)", "0 0 20px var(--astreon-accent)", "0 0 0px var(--astreon-accent)"]
              : "none"
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut",
          }}
        />
      ))}
      {isDark && (
        <div className="w-[600px] h-[600px] bg-astreon-accent/5 blur-[120px] rounded-full opacity-30" />
      )}
    </div>
  );
};

export default CorePulse;
