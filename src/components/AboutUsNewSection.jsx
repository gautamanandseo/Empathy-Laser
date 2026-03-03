import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AboutUsNewSection = () => {
  const { data: sectionData, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'new_section' },
    single: true
  });

  if (loading) {
    return <div className="py-20 flex justify-center"><Loader2 className="animate-spin" /></div>;
  }

  // If no data exists yet, we can hide the section or show placeholders
  if (!sectionData) return null;

  const { title, description, image_url, details } = sectionData;
  const bullets = details?.bullets || [];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[var(--primary-red)]/5 rounded-3xl transform -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
            <img 
              src={image_url || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"} 
              alt={title} 
              className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-900 mb-6">
              {title || "State-of-the-Art Facilities"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {description || "We utilize the latest technology to ensure safe, effective, and comfortable treatments for all our clients."}
            </p>
            
            <div className="space-y-4">
              {bullets.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsNewSection;