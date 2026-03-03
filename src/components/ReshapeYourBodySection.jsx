import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';

const HOTSPOTS = [
  { id: 'chin', x: 23, y: 19, label: 'Chin & Jawline' }, // male chin
  { id: 'flanks', x: 20, y: 55, label: 'Flanks' }, // male flank
  { id: 'abdomen', x: 28, y: 50, label: 'Abdomen' }, // male abs
  { id: 'upper_arms', x: 92, y: 32, label: 'Upper Arms' }, // female arm
  { id: 'bra_fat', x: 74, y: 38, label: 'Bra Fat' }, // female bra/back
  { id: 'thighs', x: 72, y: 68, label: 'Thighs' }, // female thigh inner
  { id: 'back_fat', x: 68, y: 38, label: 'Back Fat' }, // approximated
  { id: 'banana_roll', x: 80, y: 75, label: 'Banana Roll' }, // approximated
];

const BODY_AREAS = [
  { id: 'abdomen', title: 'Abdomen' },
  { id: 'flanks', title: 'Flanks (Love Handles)' },
  { id: 'thighs', title: 'Thighs' },
  { id: 'chin', title: 'Chin & Jawline' },
  { id: 'upper_arms', title: 'Upper Arms' },
  { id: 'bra_fat', title: 'Bra Fat' },
  { id: 'back_fat', title: 'Back Fat' },
  { id: 'banana_roll', title: 'Banana Roll' }
];

const ReshapeYourBodySection = () => {
  const [selectedAreaId, setSelectedAreaId] = useState('abdomen');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async (areaId) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('coolsculpting_gallery')
        .select('*')
        .eq('body_area', areaId)
        .order('order', { ascending: true });
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching coolsculpting images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(selectedAreaId);
  }, [selectedAreaId]);

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">Reshape Your Body</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Click on the areas below to see how CoolSculpting® freezes away stubborn fat.
          </p>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 w-full max-w-4xl mx-auto">
          {BODY_AREAS.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedAreaId(area.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border shadow-md hover:shadow-lg ${
                selectedAreaId === area.id
                  ? 'bg-[var(--primary-red)] text-white border-transparent shadow-xl scale-105 ring-2 ring-offset-2 ring-red-100'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              {area.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start lg:items-center">
          
          {/* Interactive Body Map */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            <div className="relative w-full max-w-[500px] mx-auto p-4">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 whileInView={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 className="drop-shadow-2xl filter"
               >
                 <img 
                   src="https://horizons-cdn.hostinger.com/f9cda7f1-8bc9-4fb8-a9ad-a1044f1605f0/dad9c99e1cce25e59a337688f443ad0c.png" 
                   alt="Body Areas for CoolSculpting" 
                   className="w-full h-auto object-contain"
                 />
               </motion.div>
               
               {HOTSPOTS.map((spot, index) => (
                 <motion.button
                   key={`${spot.id}-${index}`}
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   whileHover={{ scale: 1.3, rotate: 90 }}
                   transition={{ delay: index * 0.1, type: 'spring' }}
                   style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                   className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.3)] border-2 border-white transition-all duration-300 z-10 ${
                     selectedAreaId === spot.id 
                       ? 'bg-[var(--primary-red)] text-white scale-125 ring-4 ring-red-200' 
                       : 'bg-white/90 backdrop-blur text-[var(--primary-red)] hover:bg-[var(--primary-red)] hover:text-white'
                   }`}
                   onClick={() => setSelectedAreaId(spot.id)}
                   aria-label={`Select ${spot.label}`}
                 >
                   <Plus className="w-5 h-5" />
                 </motion.button>
               ))}
            </div>
          </div>

          {/* Gallery Display */}
          <div className="flex flex-col items-center justify-center order-1 lg:order-2 w-full">
             {loading ? (
                <div className="flex flex-col items-center gap-4 py-20 w-full h-[400px] justify-center bg-gray-50 rounded-3xl">
                  <Loader2 className="w-10 h-10 animate-spin text-[var(--primary-red)]" />
                  <p className="text-gray-500 font-medium">Loading results...</p>
                </div>
             ) : (
                <BeforeAfterGallery 
                  items={items}
                  className="w-full" 
                />
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReshapeYourBodySection;