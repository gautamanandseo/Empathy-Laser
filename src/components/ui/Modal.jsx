import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Default Modal Component with fixed centering
const Modal = ({ isOpen, onClose, title, children, className }) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogPrimitive.Portal forceMount>
            {/* Backdrop */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              />
            </DialogPrimitive.Overlay>
            
            {/* Modal Content */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
                animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-40%" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
                  "bg-white shadow-2xl rounded-2xl border border-gray-100",
                  "max-h-[90vh] flex flex-col outline-none",
                  className
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                  <DialogPrimitive.Title className="text-xl font-bold text-gray-900 font-playfair">
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close asChild>
                    <button className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </DialogPrimitive.Close>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto custom-scrollbar">
                  {children}
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
};

export default Modal;