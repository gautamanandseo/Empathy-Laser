import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const VideoEmbed = ({ videoId, title, description, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={cn("w-full max-w-5xl mx-auto my-12", className)}>
      {(title || description) && (
        <div className="mb-6 text-center">
          {title && <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 font-playfair">{title}</h3>}
          {description && <p className="text-gray-600 max-w-2xl mx-auto text-lg">{description}</p>}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-100 group"
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
            <Loader2 className="w-10 h-10 text-[var(--primary-red)] animate-spin" />
          </div>
        )}

        {/* Aspect Ratio Container (16:9) */}
        <div className="relative pb-[56.25%] h-0">
          {!hasError ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
              title={title || "YouTube video player"}
              className="absolute top-0 left-0 w-full h-full z-10"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={handleLoad}
              onError={handleError}
              loading="lazy"
            />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
               <p>Unable to load video.</p>
             </div>
          )}
        </div>
        
        {/* Decorative Overlay Effect */}
        <div className="absolute inset-0 border-[3px] border-white/10 rounded-xl pointer-events-none z-20" />
      </motion.div>
    </div>
  );
};

export default VideoEmbed;