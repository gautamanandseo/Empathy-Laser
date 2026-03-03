import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from './button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ServiceCard = ({ name, description, icon: Icon, image, link, slug, onLearnMore }) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    if (slug) navigate(`/services/${slug}`);
    else if (link) navigate(link);
    else if (onLearnMore) onLearnMore();
  };

  const DisplayIcon = Icon || Zap;

  return (
    <motion.div 
      className="group relative h-full rounded-[2rem] overflow-hidden bg-white transition-all duration-500 flex flex-col border border-neutral-100"
      // Enhanced 3D Shadow Styles
      style={{
        boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.03)",
        perspective: "1000px"
      }}
      whileHover={{ 
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(255, 107, 53, 0.15), 0 15px 25px -5px rgba(0, 0, 0, 0.05)",
        rotateX: 1,
        rotateY: 0,
        borderColor: "rgba(255, 107, 53, 0.2)"
      }}
    >
      {/* 3D Image Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
        {image ? (
          <motion.img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.7 }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
             <DisplayIcon className="w-16 h-16 text-neutral-300" />
          </div>
        )}
        
        {/* Floating Icon with strong shadow */}
        <div className="absolute bottom-4 right-4 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur rounded-2xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6">
          <DisplayIcon className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--primary-brand)]" />
        </div>
      </div>

      <div className="p-6 sm:p-8 flex flex-col flex-grow relative bg-white">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-brand)] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        
        <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3 font-playfair group-hover:text-[var(--primary-brand)] transition-colors">
          {name}
        </h3>
        
        <p className="text-neutral-600 mb-6 sm:mb-8 text-sm leading-relaxed flex-grow line-clamp-3 font-medium">
            {description || "Experience world-class dermatological care designed for your specific needs."}
        </p>
        
        <div className="mt-auto">
          <Button
            onClick={handleLearnMore}
            className="w-full bg-neutral-50 text-neutral-900 border border-neutral-200 hover:bg-[var(--primary-brand)] hover:text-white hover:border-[var(--primary-brand)] transition-all duration-300 rounded-xl group/btn overflow-hidden relative shadow-sm hover:shadow-lg py-6"
          >
            <span className="relative z-10 flex items-center justify-center w-full font-semibold">
              Explore Treatment
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;