import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const SectionHeading = ({ title, subtitle, className, centered = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        'mb-8 md:mb-12 px-4',
        centered && 'text-center',
        className
      )}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white font-playfair leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;