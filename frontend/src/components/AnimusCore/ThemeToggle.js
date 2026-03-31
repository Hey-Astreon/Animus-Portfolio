import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';

const ThemeToggle = () => {
  const { theme, toggleTheme, finishTransition } = useThemeStore();

  const handleToggle = () => {
    // Add transition class for smooth color changes
    document.documentElement.style.setProperty('--transition-theme', '0.4s cubic-bezier(0.4, 0, 0.2, 1)');
    document.body.classList.add('theme-transitioning');
    
    toggleTheme();
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
      finishTransition();
    }, 400);
  };

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-50 w-11 h-11 flex items-center justify-center animus-surface rounded-sm cursor-pointer"
      onClick={handleToggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.15 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { duration: 0.1 }
      }}
      data-testid="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {theme === 'light' ? (
          <Moon className="w-4 h-4" />
        ) : (
          <Sun className="w-4 h-4" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
