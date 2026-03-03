import React from 'react';
import { motion } from 'framer-motion';

const WelcomeMessage = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-red-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 font-playfair leading-tight drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to <span className="text-[var(--primary-red)]">Empathy Laser Clinic</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your journey to radiant skin and lasting confidence begins here. We combine advanced laser technology with personalized care to deliver exceptional aesthetic results.
        </motion.p>
      </div>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--primary-red)]/10 rounded-full blur-[120px] opacity-70 animate-pulse-slow" />
    </section>
  );
};

export default WelcomeMessage;