import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = '', prefix = '', duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setDisplayValue(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const PremiumStatsSection = ({ stats = [] }) => {
  if (stats.length === 0) {
    stats = [
      { value: 10000, suffix: '+', label: 'Happy Clients', icon: '👥' },
      { value: 98, suffix: '%', label: 'Success Rate', icon: '⭐' },
      { value: 15, suffix: '+', label: 'Years Experience', icon: '🏆' },
    ];
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card content */}
              <div className="relative bg-white/50 backdrop-blur-md border border-white/50 rounded-3xl p-8 text-center hover:bg-white/60 transition-all duration-300">
                {stat.icon && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl mb-4"
                  >
                    {stat.icon}
                  </motion.div>
                )}
                
                <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                
                <p className="text-gray-700 font-semibold text-lg">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumStatsSection;
export { AnimatedCounter };
