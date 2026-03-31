import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';
import { useMemo } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme, finishTransition } = useThemeStore();

  const colors = useMemo(() => ({
    surface: theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(12,12,18,0.8)',
    border: theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
  }), [theme]);

  const handleToggle = () => {
    document.documentElement.classList.add('theme-transition');
    toggleTheme();
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
      finishTransition();
    }, 300);
  };

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 w-10 h-10 flex items-center justify-center glass border-astreon-border/30 rounded-none cursor-pointer"
      onClick={handleToggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.05, borderColor: 'var(--astreon-accent)' }}
      whileTap={{ scale: 0.95 }}
      data-testid="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={theme === 'dark' ? 'text-astreon-accent' : 'text-astreon-text'}
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
