import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { FileImage as ImageIcon } from 'lucide-react';

const ServiceImageShowcase = ({ src, alt, className, type = 'default' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-neutral-100", className)}>
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10 bg-neutral-200 animate-pulse"
          >
            <ImageIcon className="w-8 h-8 text-neutral-400" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt || "Service image"}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }} // Smooth ease-out
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />

      {/* Subtle overlay for better text contrast if needed, or just aesthetic depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
      
      {/* Decorative sheen effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[sheen_1s_ease-in-out] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default ServiceImageShowcase;