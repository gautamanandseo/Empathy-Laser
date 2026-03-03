import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useNavigate } from 'react-router-dom';
import { Loader2, Zap, Snowflake, Activity, Star, Shield, Smartphone, Server, CheckCircle, Info } from 'lucide-react';

const AdvancedTechnologySection = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTechnology = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('advanced_technology_items')
        .select('*')
        .order('order_index', { ascending: true }) // Changed to match DB
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching Advanced Technology:', err);
      setError("Failed to load technology data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnology();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white flex justify-center">
        <div className="flex flex-col items-center gap-4">
             <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
             <p className="text-gray-500 font-medium">Loading advanced technology...</p>
        </div>
      </section>
    );
  }

  if (error) {
     return (
        <section className="py-24 bg-gray-50 flex flex-col items-center justify-center text-center px-4">
           <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
               <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                   <Info className="w-6 h-6" />
               </div>
               <h3 className="text-lg font-bold text-gray-900 mb-2">Unable to load content</h3>
               <p className="text-gray-500 mb-6">{error}</p>
               <Button onClick={fetchTechnology} variant="outline" className="w-full">Try Again</Button>
           </div>
        </section>
     );
  }

  if (!items || items.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-white transition-colors duration-300">
       <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-playfair text-gray-900 drop-shadow-sm">
              Our Advanced <span className="italic font-serif">Technology</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              We invest in the world's best laser systems to ensure your safety and results
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
             {items.map((item, index) => {
               // Features parsing logic
               let features = [];
               try {
                   features = typeof item.features === 'string' 
                    ? JSON.parse(item.features) 
                    : (Array.isArray(item.features) ? item.features : []);
               } catch (e) { features = []; }

               return (
                 <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 group"
                 >
                    {/* Image Header */}
                    <div className="h-64 sm:h-80 w-full relative overflow-hidden bg-gray-200">
                       {item.image_url ? (
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
                             <Zap className="w-16 h-16 text-gray-400 opacity-50" />
                             <span className="text-gray-400 font-medium">No Image Available</span>
                          </div>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                       <div className="absolute bottom-6 left-6 right-6">
                           <h3 className="text-3xl font-bold text-white font-playfair relative inline-block drop-shadow-lg">
                               {item.title}
                               <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 rounded-full" />
                           </h3>
                       </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed font-light">
                            {item.description}
                        </p>

                        {features && features.length > 0 && (
                            <div className="grid grid-cols-1 gap-3 mb-8">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-lg hover:bg-blue-50 transition-colors">
                                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600`}>
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-800 leading-snug">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                           <div className="flex items-center gap-2 text-sm text-gray-500">
                               <Shield className="w-4 h-4 text-green-500" />
                               <span>FDA Approved</span>
                           </div>
                           <Button 
                             onClick={() => navigate('/contact')} 
                             variant="link" 
                             className="text-blue-600 hover:text-blue-700 p-0 font-semibold"
                           >
                             Book Consultation &rarr;
                           </Button>
                        </div>
                    </div>
                 </motion.div>
               );
             })}
          </motion.div>
       </div>
    </section>
  );
};

export default AdvancedTechnologySection;