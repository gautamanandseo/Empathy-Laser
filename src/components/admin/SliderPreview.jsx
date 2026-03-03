import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SliderPreview = ({ data }) => {
  // Default values for preview if data is missing
  const {
    title = "Your Headline Here",
    description = "Your description text will appear here. This simulates the look of the slide on the homepage.",
    button_text = "Learn More",
    image_url
  } = data || {};

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-2xl bg-black group border border-gray-800">
       {image_url ? (
         <img 
            src={image_url} 
            alt="Preview" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
         />
       ) : (
         <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
            <div className="text-center">
                <span className="block text-4xl mb-2">🖼️</span>
                <span>Background Image Preview</span>
            </div>
         </div>
       )}
       
       {/* Gradient Overlay */}
       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
       
       {/* Content Overlay */}
       <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center justify-end text-center z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-md font-playfair leading-tight">
            {title}
          </h2>
          <p className="text-gray-200 text-sm md:text-base max-w-lg mb-6 line-clamp-2 leading-relaxed drop-shadow-sm">
            {description}
          </p>
          <div>
            <span className="inline-flex items-center bg-[var(--primary-red)] text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg uppercase tracking-wide">
                {button_text} <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </div>
       </div>
       
       {/* Badge */}
       <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono border border-white/20 shadow-sm z-20">
          Live Preview
       </div>
    </div>
  );
};

export default SliderPreview;