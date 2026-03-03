import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProcessSteps = ({
  title = 'Our Process',
  steps = [],
  variant = 'vertical',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
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

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${
            variant === 'vertical' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          } gap-8`}
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={stepVariants} className="group relative">
              {/* Step number circle */}
              <div className="mb-6 flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/50 group-hover:shadow-orange-500/70 transition-all duration-300"
                >
                  {idx + 1}
                </motion.div>
                
                {/* Arrow */}
                {idx < steps.length - 1 && variant !== 'vertical' && (
                  <div className="hidden lg:flex text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {step.features && (
                  <ul className="mt-4 space-y-2">
                    {step.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Connector line */}
              {idx < steps.length - 1 && variant === 'vertical' && (
                <div className="absolute left-8 top-20 w-0.5 h-12 bg-gradient-to-b from-orange-500 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSteps;
