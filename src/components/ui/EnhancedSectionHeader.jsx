import React from 'react';
import { motion } from 'framer-motion';

const EnhancedSectionHeader = ({
  badge = null,
  title,
  subtitle = null,
  description = null,
  alignment = 'center',
  animated = true,
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const Component = animated ? motion.div : 'div';
  const variants = animated ? containerVariants : {};

  return (
    <Component
      variants={variants}
      initial={animated ? 'hidden' : undefined}
      whileInView={animated ? 'visible' : undefined}
      viewport={animated ? { once: true } : undefined}
      className={`mb-16 ${alignmentClasses[alignment]}`}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          variants={animated ? itemVariants : {}}
          className="mb-6 inline-block"
        >
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-bold text-sm">
              {badge}
            </span>
          </div>
        </motion.div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={animated ? itemVariants : {}}
          className="text-orange-600 font-semibold text-lg mb-3 tracking-wide uppercase"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Main title */}
      <motion.h2
        variants={animated ? itemVariants : {}}
        className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight"
      >
        {title.split('\n').map((line, idx) => (
          <span key={idx} className="block">
            {line.includes('|') ? (
              <>
                {line.split('|')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  {' ' + line.split('|')[1]}
                </span>
              </>
            ) : (
              line
            )}
          </span>
        ))}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          variants={animated ? itemVariants : {}}
          className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        variants={animated ? itemVariants : {}}
        className={`mt-8 h-1 w-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full ${alignment === 'center' ? 'mx-auto' : ''}`}
      />
    </Component>
  );
};

export default EnhancedSectionHeader;
