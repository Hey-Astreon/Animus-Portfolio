import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useThemeStore } from '../store/useStore';

const navLinks = [
  { name: 'Identity', href: '#identity', code: '01' },
  { name: 'Modules', href: '#modules', code: '02' },
  { name: 'Matrix', href: '#matrix', code: '03' },
  { name: 'Transmission', href: '#transmission', code: '04' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const colors = useMemo(() => ({
    surface: theme === 'light' ? 'rgba(255,255,255,0.85)' : 'rgba(12,12,18,0.9)',
    border: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
    bg: theme === 'light' ? 'rgba(248,249,252,0.98)' : 'rgba(8,8,12,0.98)',
  }), [theme]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="navbar"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={scrolled ? { 
              background: colors.surface, 
              backdropFilter: 'blur(12px)',
              border: `1px solid ${colors.border}`,
              padding: '10px 20px',
            } : {}}
          >
            <a href="#hero" className="font-display text-base font-semibold tracking-tight" data-testid="navbar-logo">
              ASTREON
            </a>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-1.5 text-[13px] text-[var(--animus-text-muted)] hover:text-[var(--animus-text)] transition-colors duration-150"
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                >
                  <span className="font-mono text-[9px] opacity-40 group-hover:opacity-80 transition-opacity">{link.code}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            <div className="hidden md:block">
              <a href="#transmission" className="animus-button-ghost text-[11px] py-2 px-4" data-testid="navbar-cta">
                Contact
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="mobile-menu-button"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-testid="mobile-menu"
          >
            <div 
              className="absolute inset-0 backdrop-blur-lg"
              style={{ background: colors.bg }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="relative h-full flex flex-col items-center justify-center gap-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-xl font-display font-semibold"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  <span className="font-mono text-xs opacity-40">{link.code}</span>
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#transmission"
                className="mt-3 animus-button text-sm"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                data-testid="mobile-cta"
              >
                <span>Contact</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
