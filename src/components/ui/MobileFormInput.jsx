import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle } from 'lucide-react';

const MobileFormInput = ({ 
  label, 
  id, 
  type = "text", 
  error, 
  success, 
  className, 
  containerClassName,
  icon: Icon,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && props.value.length > 0;

  return (
    <div className={cn("relative mb-6", containerClassName)}>
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? '#FF5722' : error ? '#EF4444' : '#6B7280'
        }}
        className="absolute left-0 top-3 text-gray-500 font-medium pointer-events-none origin-left transition-colors duration-200 z-10"
      >
        {label}
      </motion.label>

      <div className="relative">
        {type === 'textarea' ? (
           <textarea
             id={id}
             onFocus={() => setIsFocused(true)}
             onBlur={() => setIsFocused(false)}
             className={cn(
               "w-full bg-transparent border-b-2 py-3 outline-none transition-all duration-300 resize-none min-h-[100px]",
               error ? "border-red-500 text-red-600" : isFocused ? "border-[var(--color-vibrant-orange)] text-gray-900" : "border-gray-200 text-gray-900",
               className
             )}
             {...props}
           />
        ) : (
           <input
             id={id}
             type={type}
             onFocus={() => setIsFocused(true)}
             onBlur={() => setIsFocused(false)}
             className={cn(
               "w-full bg-transparent border-b-2 py-3 outline-none transition-all duration-300",
               error ? "border-red-500 text-red-600" : isFocused ? "border-[var(--color-vibrant-orange)] text-gray-900" : "border-gray-200 text-gray-900",
               className
             )}
             {...props}
           />
        )}

        <div className="absolute right-0 top-3 flex items-center pointer-events-none">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
            {!error && success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
              </motion.div>
            )}
            {!error && !success && Icon && !isFocused && !hasValue && (
                <Icon className="w-5 h-5 text-gray-300" />
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 mt-1 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* Animated Bottom Line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-vibrant-orange)]"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
};

export default MobileFormInput;