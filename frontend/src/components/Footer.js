import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-10 border-t border-[var(--animus-border)]" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-semibold text-sm">ASTREON</span>
            <p className="font-mono text-[10px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-50">
              © {year} All systems reserved
            </p>
          </div>

          <motion.a
            href="#hero"
            className="font-mono text-[10px] tracking-wider uppercase text-[var(--animus-text-muted)] hover:text-[var(--animus-text)] transition-colors flex items-center gap-1.5"
            whileHover={{ y: -2 }}
            data-testid="back-to-top"
          >
            Return to Top
            <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>↑</motion.span>
          </motion.a>

          <div className="flex items-center gap-1.5">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-60">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
