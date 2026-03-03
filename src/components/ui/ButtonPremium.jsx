import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

const ButtonPremium = ({ 
  to, 
  href, 
  onClick, 
  children, 
  className, 
  variant = 'solid', // solid, outline, gradient
  color = '#FF5722', // Updated default to vibrant orange
  size = 'md',
  icon: Icon = ArrowRight,
  ...props 
}) => {
  // Styles based on variant
  const getStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: color,
          borderColor: color,
          borderWidth: '2px',
          boxShadow: 'none'
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, ${color}, #FF8C00)`, // Use vibrant accent
          color: '#ffffff',
          border: 'none'
        };
      case 'solid':
      default:
        return {
          backgroundColor: color,
          color: '#ffffff',
          border: 'none'
        };
    }
  };

  const baseStyles = "relative inline-flex items-center justify-center font-bold tracking-wide rounded-full overflow-hidden transition-all duration-300 group";
  
  const sizeStyles = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };

  const Component = to ? Link : (href ? 'a' : 'button');
  const linkProps = to ? { to } : (href ? { href } : {});

  return (
    <Component
      {...linkProps}
      onClick={onClick}
      className={cn(baseStyles, sizeStyles[size], className)}
      style={getStyles()}
      {...props}
    >
       {/* Hover Overlay for Depth */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 3D Bottom Edge Simulation */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <motion.div 
        className="relative z-10 flex items-center gap-2"
        whileHover={{ x: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span>{children}</span>
        {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
      </motion.div>
    </Component>
  );
};

export default ButtonPremium;