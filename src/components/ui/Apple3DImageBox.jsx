import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2, ImageOff } from 'lucide-react';
import '@/styles/apple3d.css';

/**
 * A container that applies a 3D tilt effect to its content (Image or Children).
 * Originally designed for images, extended to support arbitrary content cards.
 */
const Apple3DImageBox = ({ 
  src, 
  alt, 
  children,
  onClick, 
  className,
  priority = false,
  style = {}
}) => {
  const [isLoading, setIsLoading] = useState(!!src);
  const [hasError, setHasError] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for rotation
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  // Light reflection/sheen effect movement
  const sheenX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn(
        "relative apple-3d-container cursor-pointer select-none rounded-2xl h-full",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{ perspective: 1000, ...style }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-2xl shadow-xl transition-all duration-300 bg-transparent"
      >
        {/* Main Content Container */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white apple-3d-box shadow-lg hover:shadow-2xl transition-shadow duration-300">
          
          {children ? (
             <div className="h-full w-full relative z-10">
               {children}
             </div>
          ) : (
            <>
              {/* Loading State for Images */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                  <Loader2 className="w-8 h-8 text-gray-300 animate-spin" />
                </div>
              )}

              {/* Error State for Images */}
              {hasError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400 z-10">
                  <ImageOff className="w-8 h-8 mb-2" />
                  <span className="text-xs">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={src}
                  alt={alt}
                  className={cn(
                    "w-full h-full object-cover rounded-2xl transition-opacity duration-500",
                    isLoading ? "opacity-0" : "opacity-100"
                  )}
                  loading={priority ? "eager" : "lazy"}
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                />
              )}
            </>
          )}
          
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none mix-blend-overlay z-20" />
          
          {/* Dynamic Sheen/Reflection */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"
            style={{
              background: `radial-gradient(circle at ${sheenX.get()} ${sheenY.get()}, rgba(255,255,255,0.4) 0%, transparent 60%)`
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Apple3DImageBox;