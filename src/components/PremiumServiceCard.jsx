import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceImageShowcase from './ServiceImageShowcase';
import { cn } from '@/lib/utils';

const PremiumServiceCard = ({ service, index }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.6, 
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1] // Custom easing
          } 
        }
      }}
      whileHover={{ y: -12, scale: 1.01 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-4px_rgba(255,107,53,0.15)] transition-all duration-500 flex flex-col h-full border border-neutral-100/80"
    >
      {/* Premium Badge for specific services */}
      {service.is_premium && (
        <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md text-[#FF6B35] text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Premium
        </div>
      )}

      {/* Image Area - Fixed Height for uniformity */}
      <div className="h-64 w-full overflow-hidden relative shrink-0">
        <ServiceImageShowcase 
          src={service.image_url} 
          alt={service.title} 
          className="h-full w-full transform transition-transform duration-700 will-change-transform" 
        />
        
        {/* Glassmorphism Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content Area - Flex grow to ensure consistent card heights */}
      <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-10 bg-white">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#FF6B35] transition-colors duration-300 font-playfair leading-tight">
            {service.title}
          </h3>
          <div className="h-1 w-12 bg-neutral-100 group-hover:bg-[#FF6B35] transition-colors duration-500 rounded-full" />
        </div>

        <p className="text-neutral-600 mb-8 line-clamp-3 text-sm leading-relaxed flex-grow font-sans">
          {service.description}
        </p>
        
        <Link to={`/services/${service.slug}`} className="mt-auto inline-block">
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-[#FF6B35] font-bold uppercase tracking-widest text-xs group/btn relative py-2"
          >
            Explore Treatment
            <div className="bg-[#FF6B35] rounded-full p-1 text-white shadow-md group-hover/btn:shadow-lg group-hover/btn:bg-[#E85D2A] transition-all duration-300">
               <ArrowRight className="w-3.5 h-3.5" />
            </div>
            
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-[#FF6B35] opacity-0 group-hover/btn:opacity-10 blur-lg rounded-full transition-opacity duration-300" />
          </motion.button>
        </Link>
      </div>
      
      {/* Active Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#FF9F43] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.div>
  );
};

export default PremiumServiceCard;