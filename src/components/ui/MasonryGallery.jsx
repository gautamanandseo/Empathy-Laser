import React from 'react';
import { motion } from 'framer-motion';

const MasonryGallery = ({
  title = 'Gallery',
  images = [],
  columns = 3,
  containerClassName = '',
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const getHeightClass = (idx) => {
    // Vary heights for masonry effect
    const heights = ['h-80', 'h-96', 'h-72', 'h-80', 'h-96', 'h-72'];
    return heights[idx % heights.length];
  };

  return (
    <section className={`py-20 md:py-32 ${containerClassName}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        {title && (
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
        )}

        {/* Masonry grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6 auto-rows-max`}
        >
          {images.map((image, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${getHeightClass(idx)}`}
            >
              {/* Image */}
              <img
                src={image.url || image}
                alt={image.alt || `Gallery item ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content overlay */}
              {image.title || image.description ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.title && (
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {image.title}
                    </h3>
                  )}
                  {image.description && (
                    <p className="text-gray-200 text-sm">
                      {image.description}
                    </p>
                  )}
                </div>
              ) : null}

              {/* Border accent */}
              <div className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MasonryGallery;
