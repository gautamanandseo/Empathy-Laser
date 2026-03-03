import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Loader2, Zap, Shield, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import { Link } from 'react-router-dom';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const ServicesPage = () => {
  const { data: services, loading } = useRealtimeSync('services', {
    orderBy: { column: 'order', ascending: true }
  });

  const benefits = [
    { icon: Shield, title: "FDA Approved", desc: "All our equipment meets the highest international safety standards." },
    { icon: Sparkles, title: "Custom Plans", desc: "Every treatment is tailored to your unique skin type and goals." },
    { icon: Clock, title: "Zero Downtime", desc: "Most of our procedures allow you to return to daily life immediately." },
  ];

  const processSteps = [
    { num: "01", title: "Consultation", desc: "In-depth skin analysis and goal discussion with our experts." },
    { num: "02", title: "Treatment", desc: "Relax while we perform your procedure using advanced technology." },
    { num: "03", title: "Aftercare", desc: "Detailed guidance to maintain and maximize your results." },
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Helmet>
        <title>Our Services | Empathy Laser Clinic - Advanced Laser Treatments</title>
        <meta name="description" content="Explore our complete range of laser treatments including Hair Removal, CoolSculpting, Skin Rejuvenation and more in Delhi." />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-40 pb-20 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-playfair font-bold text-neutral-900 mb-6"
           >
             Our Services
           </motion.h1>
           <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-light">
             Advanced aesthetic solutions tailored to your unique needs, delivering visible results with minimal downtime.
           </p>
        </div>
      </section>

      {/* Why Choose Us / Benefits */}
      <section className="py-16 bg-white border-b border-gray-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {benefits.map((item, idx) => (
                  <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl group hover:shadow-lg transition-all duration-300"
                  >
                     <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-vibrant-orange)] shadow-sm mb-4 group-hover:bg-[var(--color-vibrant-orange)] group-hover:text-white transition-colors">
                        <item.icon className="w-6 h-6" />
                     </div>
                     <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                     <p className="text-gray-500 text-sm">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Specialized Treatments" subtitle="Comprehensive care for face and body" className="mb-16" />
          
          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-[var(--color-vibrant-orange)]" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services && services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <ServiceCard 
                    name={service.title}
                    description={service.description}
                    image={service.image_url}
                    slug={service.slug}
                    icon={Zap}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-vibrant-orange)] opacity-10 blur-[120px] rounded-full" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-6">Your Journey With Us</h2>
               <p className="text-gray-400 max-w-2xl mx-auto">Simple, transparent, and focused on your comfort.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {processSteps.map((step, idx) => (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.2 }}
                     className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                     <span className="text-6xl font-bold text-[var(--color-vibrant-orange)] opacity-20 absolute top-4 right-6">{step.num}</span>
                     <h3 className="text-2xl font-bold mb-4 relative z-10">{step.title}</h3>
                     <p className="text-gray-400 relative z-10 leading-relaxed">{step.desc}</p>
                  </motion.div>
               ))}
            </div>

            <div className="mt-16 text-center">
               <Link to="/contact">
                  <Button className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-6 rounded-full text-lg font-bold">
                     Book Free Consultation
                  </Button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ServicesPage;