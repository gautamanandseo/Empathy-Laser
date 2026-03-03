import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const MobileCardWrapper = ({ children, className, delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden relative group transition-all duration-300",
        "hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-100",
        className
      )}
      {...props}
    >
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-orange-50/30 opacity-50 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default MobileCardWrapper;