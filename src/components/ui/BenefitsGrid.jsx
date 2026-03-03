import React from 'react';
import { motion } from 'framer-motion';

const BenefitsGrid = ({
  title = 'Why Choose Us',
  benefits = [],
  columns = 3,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {title}
          </h2>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${gridClasses[columns]} gap-8`}
        >
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Card content */}
                <div className="relative bg-white border border-neutral-200 rounded-2xl p-8 hover:border-orange-300 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {Icon && <Icon className="w-8 h-8 text-orange-600 group-hover:text-red-600 transition-colors" />}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300">
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-4">
                    {benefit.description}
                  </p>

                  {/* Feature points */}
                  {benefit.points && (
                    <ul className="space-y-2">
                      {benefit.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-center gap-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-orange-500 to-red-600 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsGrid;
