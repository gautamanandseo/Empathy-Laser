import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoGrid = ({
  title = 'Watch Our Transformations',
  videos = [],
  columns = 3,
}) => {
  const [playingIdx, setPlayingIdx] = React.useState(null);

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

  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
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
          <p className="text-lg text-gray-600">
            See the incredible transformation our clients have achieved
          </p>
        </motion.div>

        {/* Video grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`grid ${gridClasses[columns]} gap-8`}
        >
          {videos.map((video, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl"
            >
              {/* Video thumbnail */}
              {video.thumbnail && (
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />

              {/* Play button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPlayingIdx(idx)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  animate={{
                    boxShadow: ['0 0 0 0 rgba(255, 107, 53, 0.7)', '0 0 0 30px rgba(255, 107, 53, 0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Play className="w-7 h-7 text-white fill-white ml-1" />
                </motion.div>
              </motion.button>

              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg">{video.title}</h3>
                {video.description && (
                  <p className="text-gray-200 text-sm mt-2">{video.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VideoGrid;
