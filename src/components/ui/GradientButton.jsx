import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const GradientButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon = null,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/50',
    secondary: 'bg-gradient-to-r from-slate-700 to-slate-900 text-white',
    outline: 'border-2 border-gradient-to-r from-orange-500 to-red-600 text-orange-600',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-8 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`relative font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 group overflow-hidden ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Animated background shimmer */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -translate-x-full group-hover:translate-x-full transition-all duration-700" />
      )}
      
      <span className="relative flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
        {!Icon && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}
      </span>
    </motion.button>
  );
};

export default GradientButton;
