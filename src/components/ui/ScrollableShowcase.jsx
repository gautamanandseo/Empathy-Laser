import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScrollableShowcase = ({
  items = [],
  title = 'Featured Projects',
  autoScroll = false,
  showNavigation = true,
}) => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 400;
    const element = scrollContainerRef.current;
    
    if (direction === 'left') {
      element.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const element = scrollContainerRef.current;
    setCanScrollLeft(element.scrollLeft > 0);
    setCanScrollRight(
      element.scrollLeft < element.scrollWidth - element.clientWidth - 10
    );
  };

  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
        
        {showNavigation && (
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full bg-white border-2 border-gray-200 hover:border-orange-500 hover:text-orange-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="overflow-x-auto scrollbar-hide"
      >
        <div className="flex gap-6 pb-4 px-4 w-max">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="flex-shrink-0 w-80 group"
            >
              {/* Item card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 h-80 bg-gray-900">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200 mb-4">{item.description}</p>
                  {item.tag && (
                    <span className="inline-block w-fit px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                      {item.tag}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollableShowcase;
