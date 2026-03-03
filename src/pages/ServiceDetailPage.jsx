import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, MessageCircle, ChevronDown, CheckCircle, Clock, Calendar } from 'lucide-react';
import { clinicData } from '@/constants/clinicData';
import { supabase } from '@/lib/customSupabaseClient';

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      setLoading(true);
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        const { data: detailsData } = await supabase
          .from('service_details')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
          
        if (detailsData) {
            setService(detailsData);
        } else {
            const { data: basicData } = await supabase
              .from('services')
              .select('*')
              .eq('slug', slug)
              .maybeSingle();

            if (basicData) {
                setService({
                    ...basicData,
                    full_content: basicData.description,
                    benefits: basicData.benefits || [],
                });
            } else {
                setService(null);
            }
        }
      } catch (err) {
        setService(null);
      } finally {
        setLoading(false);
      }
    };
    loadService();
  }, [slug]);

  const handleBookNow = () => {
    window.open(clinicData.whatsapp.link, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-vibrant-orange)]" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Service Not Found</h2>
        <Button onClick={() => navigate('/services')} variant="outline">Back to Services</Button>
      </div>
    );
  }

  // Parse JSON fields
  let benefits = [];
  try {
     benefits = typeof service.benefits === 'string' ? JSON.parse(service.benefits) : (Array.isArray(service.benefits) ? service.benefits : []);
  } catch (e) {
     benefits = [service.benefits].filter(Boolean);
  }

  let processSteps = [];
  try {
    processSteps = typeof service.process_steps === 'string' ? JSON.parse(service.process_steps) : (Array.isArray(service.process_steps) ? service.process_steps : []);
  } catch (e) {}

  let faqs = [];
  try {
    faqs = typeof service.faqs === 'string' ? JSON.parse(service.faqs) : (Array.isArray(service.faqs) ? service.faqs : []);
  } catch (e) {}

  return (
    <div className="bg-transparent min-h-screen">
      <Helmet>
        <title>{service.title} | Empathy Laser Clinic Delhi</title>
        <meta name="description" content={service.description?.substring(0, 160)} />
      </Helmet>

      {/* Hero Image Section */}
      <section className="relative w-full h-[450px] bg-gray-100 overflow-hidden">
        {service.image_url ? (
          <>
            <img 
              src={service.image_url} 
              alt={service.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-12 z-10">
            <div className="max-w-7xl mx-auto px-4">
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-4xl md:text-6xl font-bold text-white mb-4 font-playfair drop-shadow-lg"
               >
                 {service.title}
               </motion.h1>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-xl text-white/90 max-w-2xl font-light drop-shadow leading-relaxed"
               >
                 {service.description}
               </motion.p>
            </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Main Content */}
         <div className="lg:col-span-2 space-y-12">
            
            <Button variant="ghost" className="text-gray-500 hover:text-gray-900 pl-0 -mt-4 mb-4" onClick={() => navigate('/services')}>
               <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>

            {/* About / Full Content */}
            <section className="prose prose-lg max-w-none text-gray-600">
              <h2 className="text-3xl font-bold font-playfair mb-6 text-gray-900">About the Treatment</h2>
              <div className="whitespace-pre-wrap leading-relaxed">
                {service.full_content || service.description}
              </div>
            </section>

            {/* Before / After Gallery */}
            {(service.before_image_url || service.after_image_url) && (
               <section className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-100 shadow-sm">
                 <h3 className="text-2xl font-bold font-playfair mb-6 text-gray-900">Real Results</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.before_image_url && (
                      <div className="space-y-2 group">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-sm">Before</span>
                        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
                          <img src={service.before_image_url} alt="Before treatment" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    )}
                    {service.after_image_url && (
                      <div className="space-y-2 group">
                        <span className="text-xs font-bold text-[var(--color-vibrant-orange)] uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-sm">After</span>
                        <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 bg-white">
                          <img src={service.after_image_url} alt="After treatment" className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      </div>
                    )}
                 </div>
               </section>
            )}

            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold font-playfair mb-6 text-gray-900">Key Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/80 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0 group-hover:text-[var(--color-vibrant-orange)] transition-colors" />
                      <span className="text-gray-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Process Steps */}
            {processSteps && processSteps.length > 0 && (
               <section>
                  <h3 className="text-2xl font-bold font-playfair mb-8 text-gray-900">How It Works</h3>
                  <div className="relative border-l-2 border-gray-200 ml-3 space-y-10 pl-8 pb-4">
                     {processSteps.map((step, idx) => (
                       <div key={idx} className="relative">
                          <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-white border-2 border-[var(--color-vibrant-orange)] text-[var(--color-vibrant-orange)] flex items-center justify-center text-xs font-bold shadow-sm">
                            {idx + 1}
                          </div>
                          <h4 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h4>
                          <p className="text-gray-600 leading-relaxed">{step.description}</p>
                       </div>
                     ))}
                  </div>
               </section>
            )}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
               <section>
                  <h3 className="text-2xl font-bold font-playfair mb-6 text-gray-900">Common Questions</h3>
                  <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                      <div 
                        key={idx} 
                        className="border border-gray-200 rounded-xl overflow-hidden bg-white/90 shadow-sm"
                      >
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                          {faq.question}
                          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeFaq === idx && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 pt-0 text-gray-600 border-t border-gray-100 leading-relaxed bg-gray-50/50">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
               </section>
            )}
         </div>

         {/* Sidebar */}
         <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100 sticky top-24">
               <h3 className="text-xl font-bold mb-4 font-playfair text-gray-900">Book Appointment</h3>
               <p className="text-gray-500 mb-6 text-sm">
                 Ready to transform your look? Contact us today for a consultation.
               </p>
               
               <div className="mb-6 pb-6 border-b border-gray-100">
                  <span className="block text-sm text-gray-400 mb-1">Pricing</span>
                  <span className="text-2xl font-bold text-[var(--color-vibrant-orange)]">
                    {service.pricing || service.price || 'Contact for quote'}
                  </span>
               </div>

               <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                     <Clock className="w-4 h-4 text-gray-400" />
                     <span>10:00 AM - 07:00 PM (Tue-Sun)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                     <Calendar className="w-4 h-4 text-gray-400" />
                     <span>Open Tuesday to Sunday</span>
                  </div>
               </div>

               <Button onClick={handleBookNow} className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 mb-3 font-semibold text-lg shadow-md hover:shadow-lg transition-all rounded-xl">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
               </Button>
               <Button onClick={() => navigate('/contact')} variant="outline" className="w-full border-gray-200 py-6 text-gray-900 hover:bg-gray-50 rounded-xl">
                  Contact Form
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;