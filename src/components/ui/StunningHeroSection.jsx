import React from 'react';
import { motion } from 'framer-motion';

const StunningHeroSection = ({ 
  title, 
  subtitle, 
  description,
  backgroundImage,
  primaryButton,
  secondaryButton,
  badge = null,
}) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        {backgroundImage ? (
          <>
            <img 
              src={backgroundImage} 
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-black" />
        )}
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-block"
            >
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-md">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 font-semibold text-sm">
                  {badge}
                </span>
              </div>
            </motion.div>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-orange-400 font-semibold text-lg mb-6 tracking-widest"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
          >
            {title.split('\n').map((line, idx) => (
              <span key={idx} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              {description}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {primaryButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300"
                onClick={primaryButton.onClick}
              >
                {primaryButton.text}
              </motion.button>
            )}
            {secondaryButton && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold rounded-lg hover:bg-white/20 transition-all duration-300"
                onClick={secondaryButton.onClick}
              >
                {secondaryButton.text}
              </motion.button>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16"
          >
            <div className="flex justify-center">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1 h-2 bg-orange-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StunningHeroSection;
