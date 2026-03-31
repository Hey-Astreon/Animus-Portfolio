import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const modules = [
  {
    id: 'mod-01',
    title: 'Neural Analytics',
    category: 'Data Systems',
    description: 'Real-time data visualization platform with AI-powered insights for enterprise decision making.',
    tech: ['React', 'Python', 'TensorFlow'],
    status: 'deployed',
  },
  {
    id: 'mod-02',
    title: 'Quantum Commerce',
    category: 'E-Commerce',
    description: 'Next-generation commerce platform with AI recommendations and seamless payment flows.',
    tech: ['Next.js', 'Node.js', 'Stripe'],
    status: 'deployed',
  },
  {
    id: 'mod-03',
    title: 'Synth Assistant',
    category: 'AI Systems',
    description: 'AI-powered voice assistant with natural language processing and smart integrations.',
    tech: ['Python', 'OpenAI', 'FastAPI'],
    status: 'active',
  },
  {
    id: 'mod-04',
    title: 'CodeFlow IDE',
    category: 'Developer Tools',
    description: 'Collaborative code editor with real-time sync, AI completion, and integrated terminal.',
    tech: ['TypeScript', 'WebRTC', 'Monaco'],
    status: 'deployed',
  },
];

const SystemModules = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  // Scroll-based depth
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    hover: {
      y: -6,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  return (
    <section
      id="modules"
      ref={ref}
      className="relative py-32 z-10"
      data-testid="modules-section"
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
          <span className="hud-text">System_Modules</span>
          <div className="flex-1 h-[1px] bg-[var(--animus-border)]" />
          <span className="hud-text opacity-50">02</span>
        </motion.div>

        <motion.h2
          className="section-title mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Featured <span className="text-[var(--animus-accent)]">Work</span>
        </motion.h2>

        {/* Modules Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {modules.map((module, index) => (
            <motion.article
              key={module.id}
              className="group module-card cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              data-testid={`module-${module.id}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="hud-text opacity-50">{module.id}</span>
                  <span className="hud-text mx-2">/</span>
                  <span className="hud-text">{module.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <motion.div
                    className={`w-1.5 h-1.5 rounded-full ${
                      module.status === 'deployed' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    animate={{
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="hud-text opacity-50">{module.status}</span>
                </div>
              </div>

              {/* Title with hover effect */}
              <motion.h3 
                className="font-display text-2xl font-semibold mb-3 transition-colors duration-200"
                style={{ color: 'var(--animus-text)' }}
                whileHover={{ color: 'var(--animus-accent)' }}
              >
                {module.title}
              </motion.h3>

              {/* Description */}
              <p className="text-[var(--animus-text-muted)] text-sm leading-relaxed mb-6">
                {module.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--animus-border)]">
                <div className="flex gap-2">
                  {module.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-2 py-1 text-xs font-mono bg-[var(--animus-accent-soft)] text-[var(--animus-accent)] transition-all duration-150"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <motion.div
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ duration: 0.15 }}
                >
                  <ArrowUpRight className="w-4 h-4 text-[var(--animus-text-muted)] group-hover:text-[var(--animus-accent)] transition-colors duration-200" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View All with micro-interaction */}
        <motion.div
          className="flex justify-center mt-12"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.button 
            className="animus-button-ghost flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            data-testid="view-all-modules"
          >
            View All Modules
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SystemModules;
