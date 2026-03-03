import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const FeatureHighlight = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="flex gap-4 group"
    >
      {/* Icon circle */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
          <Icon className="h-6 w-6 text-orange-600 group-hover:text-red-600 transition-colors" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Arrow indicator */}
      <motion.div
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        className="flex-shrink-0 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
};

export default FeatureHighlight;
