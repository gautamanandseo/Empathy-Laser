import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import ButtonPremium from '@/components/ui/ButtonPremium';
import { useButtonCustomization } from '@/contexts/ButtonCustomizationContext';

const ImageSlider = () => {
  const navigate = useNavigate();
  const { getButtonConfig } = useButtonCustomization();
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  // Fetch Slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_home_sliders')
          .select('*')
          .order('order', { ascending: true });
        
        if (error) throw error;
        setSlides(data || []);
      } catch (err) {
        console.error('Slider fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
    
    const channel = supabase.channel('public:admin_home_sliders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_home_sliders' }, () => fetchSlides())
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Auto-Play Logic
  useEffect(() => {
    let interval;
    if (!isHovered && slides.length > 1) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const exploreButtonConfig = getButtonConfig('explore_treatment');

  // Dynamic Loading State
  if (loading) return (
    <div className="h-[50vh] md:h-screen bg-neutral-900 flex items-center justify-center">
      <Loader2 className="animate-spin text-white w-8 h-8" />
    </div>
  );
  
  if (!slides.length) return null;

  const currentSlide = slides[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.2
    })
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-neutral-900 font-sans group
                 h-[60vh] sm:h-[70vh] lg:h-screen min-h-[500px]" // Responsive Height
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          <img 
            src={currentSlide.image_url} 
            alt={currentSlide.title} 
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          {/* Advanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end md:justify-center pb-20 md:pb-0 px-4 sm:px-8 md:px-16 lg:px-24 pointer-events-none">
        <div className="max-w-4xl space-y-4 md:space-y-8 pointer-events-auto">
          <motion.div 
             key={`tag-${currentIndex}`}
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-lg"
          >
            Premium Aesthetic Care
          </motion.div>
          
          <motion.h1 
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight font-playfair drop-shadow-2xl"
          >
            {currentSlide.title}
          </motion.h1>
          
          <motion.p 
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-xl md:max-w-2xl font-light leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-none"
          >
            {currentSlide.description}
          </motion.p>
          
          <motion.div 
            key={`btn-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <div className="relative group rounded-full overflow-hidden p-0.5 z-30">
                <ButtonPremium 
                    to={currentSlide.button_link || exploreButtonConfig.button_link}
                    // Use new brand color if defaulting, otherwise respect CMS config
                    color={exploreButtonConfig.button_color === '#ef4444' ? '#FF6B35' : exploreButtonConfig.button_color}
                    variant={exploreButtonConfig.button_style}
                    size="lg"
                    className="w-full sm:w-auto shadow-2xl bg-[#FF6B35] hover:bg-[#E85D2A] border-none text-white px-8 py-6 text-lg"
                >
                    {currentSlide.button_text || exploreButtonConfig.button_text}
                </ButtonPremium>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Controls - Hidden on Mobile */}
      <div className="absolute inset-y-0 left-4 z-20 hidden md:flex items-center">
        <motion.button 
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
        >
          <ChevronLeft className="w-8 h-8" />
        </motion.button>
      </div>

      <div className="absolute inset-y-0 right-4 z-20 hidden md:flex items-center">
        <motion.button 
          whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
        >
          <ChevronRight className="w-8 h-8" />
        </motion.button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full shadow-lg border border-transparent ${
              idx === currentIndex 
                ? 'w-8 md:w-12 h-2 md:h-3 bg-white' 
                : 'w-2 md:w-3 h-2 md:h-3 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;