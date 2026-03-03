import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const PremiumCTASection = ({
  title,
  subtitle = null,
  description,
  primaryButtonText = 'Get Started',
  secondaryButtonText = 'Learn More',
  onPrimaryClick,
  onSecondaryClick,
  variant = 'default',
  backgroundImage = null,
}) => {
  const variants = {
    default: 'bg-gradient-to-r from-orange-600 to-red-600',
    dark: 'bg-gradient-to-br from-slate-900 to-slate-800',
    premium: 'bg-gradient-to-r from-orange-500 via-red-500 to-pink-500',
  };

  return (
    <section className={`relative overflow-hidden py-20 md:py-32 ${variants[variant]}`}>
      {/* Background elements */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [30, 0, 30] }}
        transition={{ duration: 15, repeat: Infinity, delay: 0.5 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
      />

      {/* Background image overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-20">
          <img src={backgroundImage} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-semibold text-sm">Limited Time Offer</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-white/80 text-lg mb-4 font-semibold tracking-wide"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
        >
          {title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPrimaryClick}
            className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-2xl hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 group"
          >
            <span>{primaryButtonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          {/* Secondary button */}
          {secondaryButtonText && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSecondaryClick}
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 backdrop-blur-md"
            >
              {secondaryButtonText}
            </motion.button>
          )}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 flex items-center justify-center gap-8 text-white/80 flex-wrap"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span>Free Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span>FDA Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span>Expert Doctors</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumCTASection;
