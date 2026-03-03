import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import ButtonPremium from '@/components/ui/ButtonPremium';
import { supabase } from '@/lib/customSupabaseClient';
import ErrorBoundary from '@/components/ErrorBoundary';
import VideoShowcase from '@/components/VideoShowcase';

const TransformationSection = () => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultSectionData = {
    title: "See The Transformation",
    description: "Watch our specialists in action.",
    button_text: "Book Your Session",
    tech_heading: "Advanced Technology",
    tech_description: "Experience the future of aesthetic treatments with our FDA-approved laser systems.",
  };

  const fetchSectionData = async () => {
    try {
      const { data, error } = await supabase
        .from('transformation_section')
        .select('*')
        .limit(1);
        
      if (error) throw error;
      if (data && data.length > 0) setSectionData(data[0]);
    } catch (err) {
      console.error('Error fetching section data:', err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectionData();
    
    const channel = supabase
      .channel('public:transformation_section')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transformation_section' }, () => {
         fetchSectionData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const displaySection = sectionData || defaultSectionData;

  return (
    <section className="py-16 md:py-24 bg-neutral-900 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-vibrant-orange)] rounded-full blur-[120px] mix-blend-screen animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
         <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 gap-8 text-center md:text-left">
           <div>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
             >
                <h2 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-3">
                  {displaySection.title || defaultSectionData.title}
                </h2>
                <p className="text-neutral-400 text-base max-w-xl">
                  {displaySection.description || defaultSectionData.description}
                </p>
             </motion.div>
           </div>
           
           <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
           >
             <ButtonPremium 
                to="/contact" 
                className="shadow-lg hover:shadow-orange-500/20 bg-gradient-to-r from-[var(--color-vibrant-orange)] to-[var(--color-accent-red)] border-none text-white w-full md:w-auto py-4 text-lg"
             >
                {displaySection.button_text || defaultSectionData.button_text}
             </ButtonPremium>
           </motion.div>
         </div>

         {/* Video Showcase Grid */}
         <div className="min-h-[300px]">
             <ErrorBoundary>
                 <VideoShowcase />
             </ErrorBoundary>
         </div>

         {/* Tech Description */}
         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-white/10 pt-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
               <h3 className="text-2xl font-bold mb-3 font-playfair flex items-center gap-2">
                 <Zap className="text-[var(--color-vibrant-orange)] w-6 h-6" />
                 {displaySection.tech_heading || defaultSectionData.tech_heading}
               </h3>
               <p className="text-neutral-400 leading-relaxed">
                 {displaySection.tech_description || defaultSectionData.tech_description}
               </p>
            </motion.div>
         </div>
      </div>
    </section>
  );
};

export default TransformationSection;