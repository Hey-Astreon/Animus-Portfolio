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
      className="fixed bottom-5 left-5 z-50 w-10 h-10 flex items-center justify-center backdrop-blur-xl rounded-sm cursor-pointer"
      style={{ background: colors.surface, border: `1px solid ${colors.border}` }}
      onClick={handleToggle}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-testid="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
