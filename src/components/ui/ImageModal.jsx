import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageModal = ({ isOpen, onClose, imageUrl, title }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-4xl max-h-[90vh] w-full bg-transparent rounded-lg overflow-hidden flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <img
            src={imageUrl}
            alt={title || 'Preview'}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
          
          {title && (
            <div className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-medium">
              {title}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageModal;