import React from 'react';
import { motion } from 'framer-motion';

const PremiumServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  image,
  features = [],
  gradient = 'from-orange-500 to-red-600',
  delay = 0,
  onClick,
  badge = null,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative h-full"
      onClick={onClick}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full border border-neutral-100 group-hover:border-orange-200">
        
        {/* Image container with overlay */}
        {image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          </div>
        )}

        {/* Colored top bar */}
        {!image && (
          <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 z-20">
            <motion.span 
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {badge}
            </motion.span>
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {Icon && (
            <div className="inline-block p-3 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6 text-orange-600" />
            </div>
          )}
          
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Features list */}
          {features.length > 0 && (
            <ul className="space-y-2 mb-6">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600" />
                  {feature}
                </li>
              ))}
            </ul>
          )}

          {/* Learn more link with animation */}
          <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group/link">
            <span>Learn More</span>
            <motion.svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ opacity: 0.1 }} />
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumServiceCard;
