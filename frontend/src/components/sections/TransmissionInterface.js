import { useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Send, Mail, MapPin, ArrowUpRight, Check } from 'lucide-react';

const TransmissionInterface = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Scroll depth
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  };

  return (
    <section
      id="transmission"
      ref={ref}
      className="relative py-32 z-10"
      data-testid="transmission-section"
    >
      <motion.div className="max-w-6xl mx-auto px-6" style={{ y }}>
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="w-2 h-2 bg-[var(--animus-accent)]" />
          <span className="hud-text">Transmission_Interface</span>
          <div className="flex-1 h-[1px] bg-[var(--animus-border)]" />
          <span className="hud-text opacity-50">04</span>
        </motion.div>

        <motion.h2
          className="section-title mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Initiate <span className="text-[var(--animus-accent)]">Contact</span>
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Info */}
          <motion.div variants={itemVariants}>
            <p className="text-lg text-[var(--animus-text-muted)] mb-8 leading-relaxed">
              Ready to collaborate on your next project? Send a transmission
              and let's discuss how we can build something exceptional together.
            </p>

            {/* Contact Info with hover effects */}
            <div className="space-y-4 mb-8">
              <motion.div 
                className="flex items-center gap-4 group cursor-default"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <div className="p-2 border border-[var(--animus-border)] group-hover:border-[var(--animus-accent)] transition-colors duration-200">
                  <Mail className="w-4 h-4 text-[var(--animus-accent)]" />
                </div>
                <span className="text-[var(--animus-text-muted)] group-hover:text-[var(--animus-text)] transition-colors duration-200">
                  hello@astreon.me
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-4 group cursor-default"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                <div className="p-2 border border-[var(--animus-border)] group-hover:border-[var(--animus-accent)] transition-colors duration-200">
                  <MapPin className="w-4 h-4 text-[var(--animus-accent)]" />
                </div>
                <span className="text-[var(--animus-text-muted)] group-hover:text-[var(--animus-text)] transition-colors duration-200">
                  Available Worldwide (Remote)
                </span>
              </motion.div>
            </div>

            {/* Links with micro-interactions */}
            <div className="space-y-3">
              <span className="hud-text opacity-50">External Links</span>
              {['GitHub', 'LinkedIn', 'Twitter'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="flex items-center gap-2 text-[var(--animus-text-muted)] hover:text-[var(--animus-text)] transition-colors duration-200 group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  data-testid={`contact-link-${link.toLowerCase()}`}
                >
                  {link}
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={itemVariants}>
            <motion.form
              onSubmit={handleSubmit}
              className="module-card"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              data-testid="contact-form"
            >
              {submitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-12 h-12 mx-auto mb-4 border border-[var(--animus-accent)] flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  >
                    <Check className="w-6 h-6 text-[var(--animus-accent)]" />
                  </motion.div>
                  <h3 className="font-display font-semibold mb-2">Transmission Sent</h3>
                  <p className="text-sm text-[var(--animus-text-muted)]">
                    Response incoming shortly.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="hud-text block mb-2">Identifier</label>
                    <motion.input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-transparent border border-[var(--animus-border)] text-[var(--animus-text)] placeholder-[var(--animus-text-muted)] focus:outline-none focus:border-[var(--animus-accent)] transition-colors duration-200"
                      whileFocus={{ borderColor: 'var(--animus-accent)' }}
                      data-testid="contact-input-name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="hud-text block mb-2">Signal Address</label>
                    <motion.input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-transparent border border-[var(--animus-border)] text-[var(--animus-text)] placeholder-[var(--animus-text-muted)] focus:outline-none focus:border-[var(--animus-accent)] transition-colors duration-200"
                      whileFocus={{ borderColor: 'var(--animus-accent)' }}
                      data-testid="contact-input-email"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="hud-text block mb-2">Transmission</label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Your message..."
                      className="w-full px-4 py-3 bg-transparent border border-[var(--animus-border)] text-[var(--animus-text)] placeholder-[var(--animus-text-muted)] focus:outline-none focus:border-[var(--animus-accent)] transition-colors duration-200 resize-none"
                      whileFocus={{ borderColor: 'var(--animus-accent)' }}
                      data-testid="contact-input-message"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full animus-button disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    data-testid="contact-submit-button"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.span
                            className="w-4 h-4 border border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          Send Transmission
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </div>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TransmissionInterface;
