import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { User, Code, Briefcase } from 'lucide-react';

const CoreIdentity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Scroll-based depth effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const stats = [
    { label: 'Years Active', value: '5+' },
    { label: 'Systems Built', value: '50+' },
    { label: 'Global Clients', value: '30+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

  const cardVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
      y: -4,
      borderColor: 'var(--animus-accent)',
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="identity"
      ref={ref}
      className="relative py-32 z-10"
      data-testid="identity-section"
    >
      <motion.div 
        className="max-w-6xl mx-auto px-6"
        style={{ y }}
      >
        {/* Section Header */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="w-2 h-2 bg-[var(--animus-accent)]" />
          <span className="hud-text">Core_Identity</span>
          <div className="flex-1 h-[1px] bg-[var(--animus-border)]" />
          <span className="hud-text opacity-50">01</span>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left: Content */}
          <motion.div variants={itemVariants}>
            <h2 className="section-title mb-8">
              Building the
              <br />
              <span className="text-[var(--animus-accent)]">digital future</span>
            </h2>

            <p className="text-[var(--animus-text-muted)] text-lg leading-relaxed mb-6">
              I'm a full-stack developer specializing in creating intelligent,
              scalable systems. My approach combines clean architecture with
              cutting-edge technology to deliver solutions that exceed expectations.
            </p>

            <p className="text-[var(--animus-text-muted)] leading-relaxed mb-8">
              The Astreon system represents my philosophy — technology should be
              precise, purposeful, and powerful. Every line of code serves a function,
              every design decision has meaning.
            </p>

            {/* Stats with number animation */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                  data-testid={`stat-${index}`}
                >
                  <motion.div 
                    className="text-3xl font-display font-semibold mb-1"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="hud-text opacity-60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info Cards with micro-interactions */}
          <motion.div className="space-y-4" variants={containerVariants}>
            {[
              {
                icon: User,
                title: 'Identity',
                description: 'Full-Stack Developer & Digital Architect based globally, available for remote collaboration.',
              },
              {
                icon: Code,
                title: 'Expertise',
                description: 'Specialized in React, Node.js, Python, AI integration, and system architecture.',
              },
              {
                icon: Briefcase,
                title: 'Mission',
                description: 'Creating intelligent systems that solve real problems with elegant, efficient solutions.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="module-card cursor-default"
                variants={cardVariants}
                whileHover="hover"
                data-testid={`identity-card-${item.title.toLowerCase()}`}
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    className="p-2 border border-[var(--animus-border)] transition-colors duration-200"
                    whileHover={{ borderColor: 'var(--animus-accent)' }}
                  >
                    <item.icon className="w-5 h-5 text-[var(--animus-accent)]" />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-[var(--animus-text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoreIdentity;
