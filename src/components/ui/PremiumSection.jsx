import React from 'react';
import { motion } from 'framer-motion';

const PremiumSection = ({
  children,
  variant = 'light',
  backgroundPattern = true,
  className = '',
  fullWidth = false,
}) => {
  const variants = {
    light: 'bg-white/50 backdrop-blur-sm',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white',
    gradient: 'bg-gradient-to-r from-orange-50 via-white to-red-50',
    premium: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
  };

  return (
    <section className={`relative py-20 md:py-32 overflow-hidden ${variants[variant]} ${className}`}>
      {/* Decorative background elements */}
      {backgroundPattern && (
        <>
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ y: [30, 0, 30] }}
            transition={{ duration: 15, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"
          />
        </>
      )}

      {/* Content */}
      <div className={`relative z-10 ${fullWidth ? '' : 'container mx-auto px-4'}`}>
        {children}
      </div>
    </section>
  );
};

export default PremiumSection;
