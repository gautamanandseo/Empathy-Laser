import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Snowflake, MessageCircle, ChevronRight, Home, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { clinicData } from '@/constants/clinicData';
import VideoEmbed from '@/components/VideoEmbed';
import SectionHeading from '@/components/ui/SectionHeading';

const SopranoTitaniumPage = () => {
  const specs = [
    { label: "Wavelengths", value: "755nm, 810nm, 1064nm" },
    { label: "Spot Size", value: "4cm² (Quattro 3D)" },
    { label: "Cooling", value: "ICE Plus™ Continuous Cooling" },
    { label: "Screen", value: "15' Android Matrix" },
  ];

  const benefits = [
    "3-in-1 Technology targeting different tissue depths",
    "Virtually painless with ICE Plus™ technology",
    "Safe for all skin tones, including tanned skin",
    "Double the coverage area for faster treatments",
    "No downtime - return to routine immediately"
  ];

  return (
    <>
      <Helmet>
        <title>Soprano Titanium Laser in Delhi | Advanced Hair Removal | Empathy Clinic</title>
        <meta name="description" content="Soprano Titanium: The world's most advanced laser hair removal solution. Painless, effective, and safe for all skin types. Available now at Empathy Laser Clinic." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
        <div className="bg-white border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-[var(--primary-red)]"><Home className="w-4 h-4" /></Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-[var(--primary-red)]">Machines</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-[var(--primary-red)]">Soprano Titanium</span>
          </div>
        </div>

        <section className="relative py-12 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--primary-red)] opacity-20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold text-sm mb-6">
                Award-Winning Innovation
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight break-words hyphens-auto">
                Soprano <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-red)] to-orange-500">Titanium</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                The future of hair removal is here. Featuring exclusive 3D technology, Soprano Titanium combines the three most effective laser wavelengths into a single applicator for a painless and efficient experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
                  size="lg" 
                  className="bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white rounded-full px-8 py-6 text-lg shadow-lg shadow-red-900/40 border-none w-full sm:w-auto h-auto whitespace-normal text-center"
                >
                  <MessageCircle className="mr-2 w-5 h-5 shrink-0" /> 
                  <span>Book Consultation</span>
                </Button>
                <Button 
                  onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center w-full"
            >
              <div className="relative z-10 px-4 w-full flex justify-center">
                 <img 
                    src="https://www.alma-soprano.com/wp-content/uploads/2024/08/home-page-2.png" 
                    alt="Soprano Titanium Machine" 
                    className="w-full max-w-md drop-shadow-[0_20px_50px_rgba(255,0,0,0.3)] h-auto"
                 />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <SectionHeading 
               title="Technology in Action" 
               subtitle="Witness the power and speed of the Soprano Titanium platform"
             />
             <div className="w-full overflow-hidden rounded-xl">
               <VideoEmbed 
                 videoId="dJWn8xbU5xg"
                 title="Soprano Titanium Laser Technology"
                 description="See how the Quattro 3D applicator covers more surface area in less time, making it the fastest treatment available."
               />
             </div>
          </div>
        </section>

        <section id="details" className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Layers, title: "Trio Clustered Diode", desc: "Simultaneously targets different tissue depths." },
                { icon: Snowflake, title: "ICE Plus™", desc: "Advanced cooling technology continuously cools skin." },
                { icon: Shield, title: "Smart Clinic", desc: "Data-driven performance for consistent and safe results." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gray-900 group-hover:bg-[var(--primary-red)] transition-colors flex items-center justify-center mb-6 text-white">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
               <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden w-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full -mr-8 -mt-8 pointer-events-none" />
                <h3 className="text-2xl font-bold mb-8 border-b pb-4 relative z-10">Machine Capabilities</h3>
                <div className="space-y-6 relative z-10">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 gap-4">
                      <span className="text-gray-500 whitespace-nowrap">{spec.label}</span>
                      <span className="font-bold text-gray-900 text-right break-words">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 break-words">The Titanium Difference</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200"
                    >
                      <CheckCircle2 className="w-6 h-6 text-[var(--primary-red)] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 font-medium break-words">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SopranoTitaniumPage;