import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, ChevronDown, ChevronUp, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import useTreatmentsData from '@/hooks/useTreatmentsData';
import { Loader2 } from 'lucide-react';

const TreatmentPage = ({ slug }) => {
  const navigate = useNavigate();
  const { fetchTreatmentBySlug, loading } = useTreatmentsData();
  const [treatment, setTreatment] = useState(null);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (slug) {
        const data = await fetchTreatmentBySlug(slug);
        setTreatment(data);
      }
    };
    loadData();
  }, [slug, fetchTreatmentBySlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--primary-red)]" />
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Treatment Not Found</h2>
        <p className="text-gray-500 mb-8">We couldn't find the treatment you're looking for.</p>
        <Button onClick={() => navigate('/services')}>View All Services</Button>
      </div>
    );
  }

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
           {treatment.image_url && (
             <img 
               src={treatment.image_url} 
               alt={treatment.name} 
               className="w-full h-full object-cover opacity-30" 
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="max-w-3xl"
           >
             <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
               {treatment.name}
             </h1>
             <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
               {treatment.description}
             </p>
             <div className="flex flex-wrap gap-4 items-center">
               <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white">
                 <Clock className="w-5 h-5 text-[var(--primary-red)]" />
                 <span className="text-sm font-medium">{treatment.duration || 'Variable Duration'}</span>
               </div>
               {treatment.price_range && (
                 <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white">
                   <span className="text-sm font-medium">{treatment.price_range}</span>
                 </div>
               )}
             </div>
             <div className="mt-10 flex flex-wrap gap-4">
               <Button 
                 onClick={() => navigate('/contact')} 
                 className="bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white h-14 px-8 rounded-full text-lg font-bold shadow-lg shadow-red-900/30"
               >
                 Book Consultation
               </Button>
             </div>
           </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      {treatment.benefits && treatment.benefits.length > 0 && (
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">Key Benefits</h2>
              <div className="h-1 w-20 bg-red-100 mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatment.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6 text-[var(--primary-red)]">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{typeof benefit === 'string' ? benefit : benefit.title}</h3>
                  {typeof benefit !== 'string' && benefit.description && (
                     <p className="text-gray-600">{benefit.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Details Sections */}
      {treatment.details?.map((section, idx) => (
        <section key={section.id} className={`py-24 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
           <div className="max-w-7xl mx-auto px-6 lg:px-8">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className={idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}>
                 <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                   {section.section_title}
                 </h2>
                 <div className="prose prose-lg text-gray-600 leading-relaxed">
                   <p className="whitespace-pre-line">{section.section_content}</p>
                 </div>
               </div>
               <div className={`relative ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                 <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    {/* Placeholder for section specific image if we had one, using main or generic for now */}
                    <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                       {treatment.image_url ? (
                         <img src={treatment.image_url} alt="" className="w-full h-full object-cover" />
                       ) : (
                         <span className="text-gray-400">Image</span>
                       )}
                    </div>
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--primary-red)]/5 rounded-full blur-2xl" />
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl" />
               </div>
             </div>
           </div>
        </section>
      ))}

      {/* Process Section */}
      {treatment.process && treatment.process.length > 0 && (
        <section className="py-24 bg-gray-900 text-white overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Treatment Process</h2>
                 <p className="text-gray-400">What to expect during your visit</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-800 -z-10" />
                
                {treatment.process.map((step, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.2 }}
                     className="relative"
                   >
                     <div className="w-24 h-24 bg-gray-800 rounded-full border-4 border-gray-900 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-[var(--primary-red)] shadow-xl relative z-10">
                       {idx + 1}
                     </div>
                     <div className="text-center px-4">
                       <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                       <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
                     </div>
                   </motion.div>
                ))}
              </div>
           </div>
        </section>
      )}

      {/* FAQs Section */}
      {treatment.faqs && treatment.faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {treatment.faqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50"
                >
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-bold text-gray-900 text-lg">{faq.question}</span>
                    {activeAccordion === idx ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeAccordion === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 bg-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Ready to Transform?</h2>
           <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
             Book your consultation today and take the first step towards the confidence you deserve.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button 
               onClick={() => navigate('/contact')}
               className="bg-white text-red-600 hover:bg-gray-100 h-14 px-10 rounded-full text-lg font-bold shadow-xl"
             >
               Book Appointment
             </Button>
             <Button 
               onClick={() => navigate('/pricing')}
               variant="outline"
               className="bg-transparent border-2 border-white text-white hover:bg-white/10 h-14 px-10 rounded-full text-lg font-bold"
             >
               View Pricing
             </Button>
           </div>
        </div>
      </section>
    </div>
  );
};

export default TreatmentPage;