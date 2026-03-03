import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { clinicData } from '@/constants/clinicData';

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Delay appearance to not conflict with initial load animations
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    window.open(clinicData.whatsapp.link, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[var(--color-vibrant-orange)] to-[var(--color-accent-orange)] text-white shadow-2xl shadow-orange-500/40 flex items-center justify-center cursor-pointer border-2 border-white/20 backdrop-blur-md"
          aria-label="Chat on WhatsApp"
        >
          {/* Ripple Effect Background */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20" />
          
          <motion.div
            animate={{ rotate: isHovered ? [0, -10, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-current" />
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
               <motion.div
                 initial={{ opacity: 0, x: -20, scale: 0.8 }}
                 animate={{ opacity: 1, x: 0, scale: 1 }}
                 exit={{ opacity: 0, x: -20, scale: 0.8 }}
                 className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-2 rounded-xl shadow-xl whitespace-nowrap text-sm font-bold pointer-events-none"
               >
                 Chat with us!
                 <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45" />
               </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;