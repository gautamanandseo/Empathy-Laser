import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Loader2 } from 'lucide-react';

const AboutUsHeroSection = () => {
  const { data: heroData, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'hero' },
    single: true
  });

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-neutral-900">
        <Loader2 className="animate-spin text-white w-8 h-8" />
      </div>
    );
  }

  const hero = heroData || {};
  const heroImage = hero.hero_image_url || hero.image_url || "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80";

  return (
    <section id="hero-section" className="relative h-[70vh] flex items-center overflow-hidden bg-neutral-900">
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Clinic Interior" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="font-bold tracking-widest text-sm uppercase mb-4 block text-[var(--primary-red)]">
            {hero.details?.subtitle || "Our Story"}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white font-playfair mb-6 leading-tight">
            {hero.title || 'About Our Clinic'}
          </h1>
          <p className="text-xl text-neutral-300 mb-8 font-light leading-relaxed">
            {hero.description || 'Dedicated to providing world-class aesthetic treatments with integrity and compassion.'}
          </p>
          <Link to="/contact">
            <Button 
              className="bg-[var(--primary-red)] hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg shadow-lg transition-transform hover:scale-105"
            >
              Book Consultation
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsHeroSection;