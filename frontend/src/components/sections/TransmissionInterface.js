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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <motion.p className="text-[var(--animus-text-muted)] text-lg leading-relaxed mb-7" variants={fadeUp}>
              Ready to collaborate? Send a transmission and let's build something exceptional together.
            </motion.p>

            <motion.div className="space-y-3 mb-7" variants={fadeUp}>
              {[
                { icon: Mail, text: 'hello@astreon.me' },
                { icon: MapPin, text: 'Available Worldwide (Remote)' },
              ].map(({ icon: Icon, text }) => (
                <motion.div 
                  key={text} 
                  className="flex items-center gap-3 group cursor-default"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="p-1.5 border border-[var(--animus-border)] group-hover:border-[var(--animus-accent)] transition-colors duration-150">
                    <Icon className="w-3.5 h-3.5" style={{ color: accentColor }} />
                  </div>
                  <span className="text-[13px] text-[var(--animus-text-muted)]">{text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="space-y-2" variants={fadeUp}>
              <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-50">Links</span>
              {['GitHub', 'LinkedIn', 'Twitter'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="flex items-center gap-1.5 text-[13px] text-[var(--animus-text-muted)] hover:text-[var(--animus-text)] transition-colors duration-150"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.15 }}
                  data-testid={`contact-link-${link.toLowerCase()}`}
                >
                  {link}
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
            <motion.form
              onSubmit={handleSubmit}
              className="module-card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              data-testid="contact-form"
            >
              {sent ? (
                <motion.div className="text-center py-6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <motion.div 
                    className="w-10 h-10 mx-auto mb-3 border flex items-center justify-center"
                    style={{ borderColor: accentColor }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Check className="w-5 h-5" style={{ color: accentColor }} />
                  </motion.div>
                  <h3 className="font-display font-semibold mb-1 text-sm">Transmission Sent</h3>
                  <p className="text-[12px] text-[var(--animus-text-muted)]">Response incoming shortly.</p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {[
                    { label: 'Identifier', name: 'name', type: 'text', placeholder: 'Your name' },
                    { label: 'Signal Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="font-mono text-[9px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-70 block mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                        required
                        placeholder={field.placeholder}
                        className="w-full px-3.5 py-2.5 text-[13px] bg-transparent border border-[var(--animus-border)] text-[var(--animus-text)] placeholder-[var(--animus-text-muted)] focus:outline-none focus:border-[var(--animus-accent)] transition-colors duration-150"
                        data-testid={`contact-input-${field.name}`}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-mono text-[9px] tracking-wider uppercase text-[var(--animus-text-muted)] opacity-70 block mb-1.5">Transmission</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={4}
                      placeholder="Your message..."
                      className="w-full px-3.5 py-2.5 text-[13px] bg-transparent border border-[var(--animus-border)] text-[var(--animus-text)] placeholder-[var(--animus-text-muted)] focus:outline-none focus:border-[var(--animus-accent)] transition-colors duration-150 resize-none"
                      data-testid="contact-input-message"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="w-full animus-button disabled:opacity-50 text-[13px]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    data-testid="contact-submit-button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {submitting ? (
                        <>
                          <motion.span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                          Transmitting
                        </>
                      ) : (
                        <>Send Transmission <Send className="w-3.5 h-3.5" /></>
                      )}
                    </span>
                  </motion.button>
                </div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default TransmissionInterface;
