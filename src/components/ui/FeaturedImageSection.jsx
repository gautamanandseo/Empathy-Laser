import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FeaturedImageSection = ({
  image,
  title,
  description,
  buttonText = 'Learn More',
  buttonAction,
  reversed = false,
  stats = [],
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${reversed ? 'md:direction-rtl' : ''}`}>
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`relative group ${reversed ? 'md:order-2' : ''}`}
          >
            {/* Floating cards background effect */}
            <div className="absolute -inset-8 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating stats cards */}
              {stats.length > 0 && (
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="space-y-3">
                    {stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/95 backdrop-blur-md rounded-xl p-3"
                      >
                        <p className="text-sm font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-600">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl shadow-xl opacity-20"
            />
            <motion.div
              animate={{ y: [20, 0, 20] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-red-600 rounded-full shadow-xl opacity-20"
            />
          </motion.div>

          {/* Content side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`${reversed ? 'md:order-1' : ''}`}
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-block mb-6">
                <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                  ✨ Premium Quality
                </span>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {title}
            </motion.h2>

            {/* Description */}
            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8 leading-relaxed">
              {description}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={buttonAction}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 group"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedImageSection;
