import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const PremiumTestimonialCard = ({
  name,
  title,
  image,
  content,
  rating = 5,
  delay = 0,
  variant = 'default',
}) => {
  const variants = {
    default: 'bg-white border-neutral-200',
    gradient: 'bg-gradient-to-br from-white to-orange-50 border-orange-200',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group"
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 to-red-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

      <div className={`relative rounded-2xl p-8 border transition-all duration-300 ${variants[variant]} shadow-lg group-hover:shadow-2xl`}>
        {/* Quote mark */}
        <div className="text-4xl opacity-10 mb-4 leading-none">
          "
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star 
              key={i} 
              className="w-5 h-5 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Content */}
        <p className={`text-lg leading-relaxed mb-6 ${variant === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {content}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-4">
          {image && (
            <motion.img
              src={image}
              alt={name}
              className="w-14 h-14 rounded-full object-cover border-2 border-orange-400 ring-2 ring-orange-200"
              whileHover={{ scale: 1.1 }}
            />
          )}
          <div>
            <p className={`font-bold ${variant === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {name}
            </p>
            <p className={`text-sm ${variant === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {title}
            </p>
          </div>
        </div>

        {/* Accent bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-b-2xl w-0 group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export default PremiumTestimonialCard;
