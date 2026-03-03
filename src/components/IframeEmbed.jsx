import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const IframeEmbed = ({ src, title, description, height = "600px", className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showButton, setShowButton] = useState(false);

  // If iframe takes too long, we show a button to open in new tab
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) setShowButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className={cn("w-full max-w-6xl mx-auto my-12", className)}>
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
        className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
      >
        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10 transition-opacity duration-500">
            <Loader2 className="w-10 h-10 text-[var(--primary-red)] animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading content...</p>
            
            {showButton && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-center px-4">
                 <p className="text-sm text-gray-400 mb-3">Taking longer than expected?</p>
                 <Button 
                   variant="outline" 
                   onClick={() => window.open(src, '_blank')}
                   className="gap-2"
                 >
                   <ExternalLink className="w-4 h-4" /> Open in New Tab
                 </Button>
               </motion.div>
            )}
          </div>
        )}

        <div className="w-full relative overflow-hidden" style={{ height }}>
          <iframe
            src={src}
            title={title || "Embedded Content"}
            className="w-full h-full border-0"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
          />
        </div>
      </motion.div>
      
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <AlertCircle className="w-3 h-3" /> 
          Content not loading properly? <a href={src} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-red)] hover:underline">Click here to view directly</a>
        </p>
      </div>
    </div>
  );
};

export default IframeEmbed;