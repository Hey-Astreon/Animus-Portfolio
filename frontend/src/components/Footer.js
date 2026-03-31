import { motion } from 'framer-motion';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-16 border-t border-astreon-border/20" data-testid="footer">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-display font-black text-sm tracking-tighter text-astreon-text">ASTREON</span>
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-astreon-text-muted opacity-40">
              © {year} All systems reserved // v2.5.0
            </p>
          </div>

          <motion.a
            href="#hero"
            className="font-mono text-[9px] tracking-[0.3em] uppercase text-astreon-text-muted hover:text-astreon-text transition-colors duration-300 flex items-center gap-2"
            whileHover={{ y: -2 }}
          >
            Terminal_Reset
            <motion.span animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>↑</motion.span>
          </motion.a>

          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-astreon-accent animate-pulse-status" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-60">System_Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
