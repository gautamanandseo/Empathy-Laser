import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const PremiumPricingCard = ({
  title,
  price,
  period = 'month',
  description,
  features = [],
  excludedFeatures = [],
  buttonText = 'Get Started',
  onButtonClick,
  isPopular = false,
  delay = 0,
  icon = null,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={!isPopular ? { y: -8 } : {}}
      className="h-full"
    >
      {/* Glow effect for popular card */}
      {isPopular && (
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
      )}

      <div className={`relative rounded-3xl overflow-hidden shadow-xl transition-all duration-300 h-full flex flex-col ${
        isPopular
          ? 'bg-gradient-to-br from-orange-600 to-red-700 text-white border-2 border-orange-300 scale-105 lg:scale-110'
          : 'bg-white border-2 border-gray-100 hover:border-orange-300 hover:shadow-2xl'
      }`}>
        
        {/* Popular badge */}
        {isPopular && (
          <motion.div
            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
            initial={{ y: -20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <div className="px-4 py-2 bg-white text-orange-600 rounded-full font-bold text-sm shadow-lg">
              ⭐ Most Popular
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className={`p-8 border-b ${isPopular ? 'border-white/20' : 'border-gray-100'}`}>
          {icon && (
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-2xl ${
              isPopular ? 'bg-white/20' : 'bg-orange-100'
            }`}>
              {icon}
            </div>
          )}
          
          <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          
          <p className={`text-sm mb-4 ${isPopular ? 'text-white/80' : 'text-gray-600'}`}>
            {description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-5xl font-black">${price}</span>
            <span className={`text-sm ${isPopular ? 'text-white/80' : 'text-gray-500'}`}>
              /{period}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="p-8 flex-grow">
          <ul className="space-y-4 mb-8">
            {features.map((feature, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  isPopular ? 'text-white' : 'text-green-500'
                }`} />
                <span className={`text-sm ${isPopular ? 'text-white' : 'text-gray-700'}`}>
                  {feature}
                </span>
              </motion.li>
            ))}

            {/* Excluded features */}
            {excludedFeatures.length > 0 && (
              <div className="border-t border-gray-200 pt-4 mt-6">
                {excludedFeatures.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 opacity-50"
                  >
                    <X className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isPopular ? 'text-white/50' : 'text-gray-300'
                    }`} />
                    <span className={`text-sm ${isPopular ? 'text-white/60' : 'text-gray-500'}`}>
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </div>
            )}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="p-8 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onButtonClick}
            className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 ${
              isPopular
                ? 'bg-white text-orange-600 hover:bg-gray-50 shadow-lg'
                : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:shadow-orange-500/50'
            }`}
          >
            {buttonText}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumPricingCard;
