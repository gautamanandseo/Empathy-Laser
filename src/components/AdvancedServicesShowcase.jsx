import React from 'react';
import { motion } from 'framer-motion';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import PremiumServiceCard from './PremiumServiceCard';
import { Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdvancedServicesShowcase = () => {
  // Fetch ALL services without limits or filtering by premium status
  const { data: services, loading, error } = useRealtimeSync('services', {
    orderBy: { column: 'order', ascending: true }
  });

  return (
    <section className="py-20 md:py-32 bg-neutral-50 relative overflow-hidden">
       {/* Ambient Background Glows */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-multiply" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none mix-blend-multiply" />
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         {/* Section Header */}
         <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
            <motion.span 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-block text-[#FF6B35] font-bold tracking-[0.2em] text-xs uppercase mb-4 px-4 py-1 bg-orange-50 rounded-full border border-orange-100"
            >
               Excellence in Aesthetics
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 font-playfair leading-[1.1]"
            >
              World-Class Treatments
            </motion.h2>
            
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="text-neutral-500 text-lg md:text-xl font-light leading-relaxed"
            >
               Discover our range of FDA-approved, scientifically proven procedures designed to deliver transformative results with minimal downtime.
            </motion.p>
            
            <motion.div 
               initial={{ width: 0, opacity: 0 }}
               whileInView={{ width: 80, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="h-1.5 bg-[#FF6B35] mx-auto rounded-full mt-8 shadow-sm"
            />
         </div>

         {/* Content Grid */}
         {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
             {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-[500px] bg-white rounded-2xl animate-pulse shadow-sm border border-neutral-100 flex items-center justify-center">
                   <Loader2 className="w-8 h-8 text-neutral-200 animate-spin" />
                </div>
             ))}
           </div>
         ) : error ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-red-100 shadow-sm">
                <p className="text-red-500 font-medium mb-4">Unable to load treatments at this time.</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
            </div>
         ) : (
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={{
               hidden: { opacity: 0 },
               visible: {
                 opacity: 1,
                 transition: { staggerChildren: 0.1 }
               }
             }}
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 perspective-1000"
           >
             {services && services.length > 0 ? (
                services.map((service, index) => (
                   <PremiumServiceCard key={service.id || index} service={service} index={index} />
                ))
             ) : (
                <div className="col-span-full text-center py-20">
                    <p className="text-neutral-500">No services available at the moment.</p>
                </div>
             )}
           </motion.div>
         )}
         
         {/* Footer Action */}
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 md:mt-24 text-center"
         >
            <Link to="/services">
                <Button 
                    size="lg" 
                    className="bg-[#1A1A1A] hover:bg-neutral-800 text-white rounded-full px-10 py-7 text-lg shadow-xl shadow-neutral-200 hover:shadow-2xl transition-all duration-300 group"
                >
                    View All Treatments
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>
         </motion.div>
       </div>
    </section>
  );
};
export default AdvancedServicesShowcase;