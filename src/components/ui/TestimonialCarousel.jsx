import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PremiumTestimonialCard from './PremiumTestimonialCard';

const TestimonialCarousel = ({
  testimonials = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  variant = 'default',
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length, autoPlayInterval]);

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4">
        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PremiumTestimonialCard
                {...testimonials[currentIdx]}
                variant={variant}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-3">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  animate={{
                    width: idx === currentIdx ? 32 : 8,
                    backgroundColor: idx === currentIdx ? '#FF6B35' : '#E5E7EB',
                  }}
                  className="h-2 rounded-full transition-all duration-300"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="p-3 rounded-full bg-white border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-200 flex justify-around"
          >
            <div className="text-center">
              <p className="text-3xl font-black text-orange-600">4.9★</p>
              <p className="text-sm text-gray-600 mt-2">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-orange-600">5k+</p>
              <p className="text-sm text-gray-600 mt-2">Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-orange-600">98%</p>
              <p className="text-sm text-gray-600 mt-2">Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
