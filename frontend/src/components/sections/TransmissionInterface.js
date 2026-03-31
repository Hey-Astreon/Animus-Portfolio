import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Send, Mail, MapPin, ArrowUpRight, Check } from 'lucide-react';
import { useThemeStore } from '../../store/useStore';

const TransmissionInterface = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const theme = useThemeStore((state) => state.theme);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitting(false);
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const accentColor = theme === 'light' ? '#2563eb' : '#60a5fa';

  return (
    <section id="transmission" ref={ref} className="relative py-28 z-10" data-testid="transmission-section">
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-5" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          <div className="w-1.5 h-1.5" style={{ background: accentColor }} />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)]">Transmission_Interface</span>
          <div className="flex-1 h-px bg-[var(--animus-border)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--animus-text-muted)] opacity-50">04</span>
        </motion.div>

        <motion.h2 className="section-title mb-14" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          Initiate <span style={{ color: accentColor }}>Contact</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.p className="text-astreon-text-muted text-lg leading-relaxed mb-10" variants={fadeUp}>
              Ready to collaborate? Send a transmission and let's build something exceptional together.
            </motion.p>

            <motion.div className="space-y-4 mb-10" variants={fadeUp}>
              {[
                { icon: Mail, text: 'roushan@astreon.me' },
                { icon: MapPin, text: 'Available Worldwide (Remote)' },
              ].map(({ icon: Icon, text }) => (
                <motion.div 
                  key={text} 
                  className="flex items-center gap-4 group cursor-default"
                >
                  <div className="p-2 border border-astreon-border/30 group-hover:border-astreon-accent/50 transition-colors duration-300">
                    <Icon className="w-4 h-4 text-astreon-accent" />
                  </div>
                  <span className="text-sm text-astreon-text-muted">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="space-y-3" variants={fadeUp}>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-40">System_Links</span>
              {[
                { name: 'GitHub', url: 'https://github.com/Hey-Astreon' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/roushan-kumar-ab4b19250/' },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-astreon-text-muted hover:text-astreon-text transition-colors duration-300"
                  whileHover={{ x: 4 }}
                >
                  {link.name}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-30" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
            <form
              onSubmit={handleSubmit}
              className="p-10 border border-astreon-border/30 bg-astreon-bg-alt/50"
              data-testid="contact-form"
            >
              {sent ? (
                <motion.div className="text-center py-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="w-12 h-12 mx-auto mb-4 border border-astreon-accent flex items-center justify-center">
                    <Check className="w-6 h-6 text-astreon-accent" />
                  </div>
                  <h3 className="font-display font-semibold mb-2 text-astreon-text">Transmission Successful</h3>
                  <p className="text-xs text-astreon-text-muted">Response protocol initiated.</p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-60 block mb-2">Identifier</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="YOUR_NAME"
                      className="w-full px-4 py-3 text-sm bg-transparent border border-astreon-border/30 text-astreon-text placeholder-astreon-text-muted/40 focus:outline-none focus:border-astreon-accent/50 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-60 block mb-2">Signal_Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      placeholder="YOUR_EMAIL"
                      className="w-full px-4 py-3 text-sm bg-transparent border border-astreon-border/30 text-astreon-text placeholder-astreon-text-muted/40 focus:outline-none focus:border-astreon-accent/50 transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[9px] tracking-[0.3em] uppercase text-astreon-text-muted opacity-60 block mb-2">Message_Payload</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={4}
                      placeholder="TRANSMISSION_CONTENT..."
                      className="w-full px-4 py-3 text-sm bg-transparent border border-astreon-border/30 text-astreon-text placeholder-astreon-text-muted/40 focus:outline-none focus:border-astreon-accent/50 transition-colors duration-300 resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-astreon-text text-astreon-bg font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-astreon-accent hover:text-white"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {submitting ? 'TRANSMITTING...' : 'INITIATE_LINK'}
                    </span>
                  </motion.button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TransmissionInterface;
