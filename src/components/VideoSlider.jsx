import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { useToast } from '@/components/ui/use-toast';

const VideoSlider = () => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200",
      title: "Laser Hair Removal Process",
      duration: "2:45"
    },
    {
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1616672038727-1222a537c9b0?auto=format&fit=crop&q=80&w=1200",
      title: "Soprano Titanium Technology",
      duration: "1:30"
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200",
      title: "CoolSculpting Explained",
      duration: "3:15"
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % videos.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);

  const handlePlay = () => {
    toast({
      title: "Video Playback",
      description: "Video player integration would open here.",
    });
  };

  return (
    <div className="w-full bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Watch Our Technology in Action</h2>
          <p className="text-gray-400">See how our advanced treatments deliver results</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-700 bg-black">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img 
                src={videos[currentIndex].thumbnail} 
                alt={videos[currentIndex].title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlay}
                  className="w-20 h-20 bg-[var(--primary-red)] rounded-full flex items-center justify-center shadow-lg shadow-red-900/50 group"
                >
                  <Play className="w-8 h-8 text-white ml-1 fill-current" />
                </motion.button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-1">{videos[currentIndex].title}</h3>
                <p className="text-gray-300 text-sm font-medium">{videos[currentIndex].duration}</p>
              </div>
            </motion.div>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div className="flex justify-center gap-3 mt-8">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'bg-[var(--primary-red)] w-8' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;