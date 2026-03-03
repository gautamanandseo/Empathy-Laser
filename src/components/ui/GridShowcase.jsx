import React from 'react';
import { motion } from 'framer-motion';

const GridShowcase = ({
  items = [],
  columns = 3,
  gap = 'gap-6',
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
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`grid ${gridClasses[columns]} ${gap}`}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          whileHover={{ y: -8 }}
          className="group relative"
        >
          {/* Item content */}
          {typeof item === 'object' && item.render ? (
            item.render()
          ) : (
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
              {item.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                {item.title && <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>}
                {item.description && <p className="text-gray-600 text-sm">{item.description}</p>}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GridShowcase;
