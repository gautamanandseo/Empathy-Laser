import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Card = ({ children, className, hover = true, depth = false, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { 
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px -10px rgba(255, 107, 53, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.05)"
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        'bg-white rounded-[1.5rem] sm:rounded-3xl p-4 sm:p-6 transition-all duration-300 text-gray-900',
        'border border-neutral-100',
        'shadow-[0_4px_6px_rgba(0,0,0,0.04),0_10px_15px_rgba(0,0,0,0.05)]',
        hover && 'cursor-pointer',
        depth && 'border-b-4 border-b-orange-500',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-4 sm:p-6 -m-4 sm:-m-6 mb-4 sm:mb-6 border-b border-neutral-100', className)} {...props}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={cn('p-0', className)} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className, ...props }) => {
  return (
    <h2 className={cn('text-xl sm:text-2xl font-bold leading-none tracking-tight text-gray-900', className)} {...props}>
      {children}
    </h2>
  );
};

export const CardDescription = ({ children, className, ...props }) => {
  return (
    <p className={cn('text-sm text-gray-500 mt-2', className)} {...props}>
      {children}
    </p>
  );
};

export default Card;