import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { clinicData } from '@/constants/clinicData';

const FloatingContactWidget = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        href={clinicData.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-lg transition-colors group"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="font-semibold hidden group-hover:inline-block transition-all duration-300">
          Chat with us
        </span>
      </a>
    </motion.div>
  );
};

export default FloatingContactWidget;