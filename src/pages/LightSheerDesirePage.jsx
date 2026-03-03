import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Zap, Thermometer, MessageCircle, ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { clinicData } from '@/constants/clinicData';
import VideoEmbed from '@/components/VideoEmbed';
import SectionHeading from '@/components/ui/SectionHeading';

const LightSheerDesirePage = () => {
  const specs = [
    { label: "Technology", value: "805nm Diode Laser" },
    { label: "Cooling", value: "ChillTip™ Integrated Cooling" },
    { label: "Spot Size", value: "Versatile (ET & HS Handpieces)" },
    { label: "Repetition Rate", value: "Up to 3Hz" },
  ];

  const benefits = [
    "FDA-Approved for permanent hair reduction",
    "Effective on all skin types (Fitzpatrick I-VI)",
    "Significant reduction in treatment time",
    "Maximum patient comfort with vacuum-assist technology",
    "Treats large areas like back and legs in minutes"
  ];

  return (
    <>
      <Helmet>
        <title>Light Sheer Desire Laser in Delhi | Hair Removal | Empathy Clinic</title>
        <meta name="description" content="Experience the Light Sheer Desire laser for permanent hair removal in Delhi. FDA-approved, safe for all skin types, and comfortable. Book your consultation at Empathy Laser Clinic." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
        <div className="bg-white border-b border-gray-100 py-4">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link to="/" className="hover:text-[var(--primary-red)]"><Home className="w-4 h-4" /></Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-[var(--primary-red)]">Machines</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-[var(--primary-red)]">Light Sheer Desire</span>
          </div>
        </div>

        <section className="relative py-12 md:py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-white to-blue-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6 border border-blue-200">
                Gold Standard Diode Technology
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight break-words hyphens-auto">
                Light Sheer <span className="text-[var(--primary-red)]">Desire</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                Experience the confidence of silky smooth skin. The Light Sheer Desire uses advanced vacuum-assist technology to offer a treatment that is fast, comfortable, and remarkably effective.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button 
                  onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
                  size="lg" 
                  className="bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-red-900/20 w-full sm:w-auto whitespace-normal h-auto text-center"
                >
                  <MessageCircle className="mr-2 w-5 h-5 shrink-0" /> 
                  <span>Book Consultation</span>
                </Button>
                <Button 
                  onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg bg-white/50 backdrop-blur-sm border-gray-300 w-full sm:w-auto"
                >
                  View Specifications
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center w-full"
            >
              <div className="relative z-10 w-full max-w-md px-4 sm:px-0">
                 <img 
                    src="https://uytcxbsbdoyn-u1880.pressidiumcdn.com/wp-content/uploads/2018/07/Desire_front_right2.png" 
                    alt="Light Sheer Desire Machine" 
                    className="w-full h-auto drop-shadow-2xl"
                 />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <SectionHeading 
               title="See It In Action" 
               subtitle="Watch how Light Sheer Desire delivers exceptional results"
             />
             <div className="w-full overflow-hidden rounded-xl">
               <VideoEmbed 
                 videoId="T06qxq-gHds"
                 title="Light Sheer Desire Technology Overview"
                 description="Discover the mechanics behind the High-Speed Vacuum Assisted technology that makes treatments comfortable and fast."
               />
             </div>
          </div>
        </section>

        <section id="details" className="py-20 bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Shield, title: "FDA Approved", desc: "Clinically proven safety and efficacy for permanent hair reduction." },
                { icon: Zap, title: "High Speed", desc: "Treats backs and legs in just 10-15 minutes comfortably." },
                { icon: Thermometer, title: "ChillTip™ Cooling", desc: "Continuous contact cooling for maximum epidermal protection." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 md:p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 text-blue-600">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 break-words">Why Choose Light Sheer Desire?</h2>
                <div className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <motion.div 
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 font-medium">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white shadow-2xl w-full">
                <h3 className="text-xl md:text-2xl font-bold mb-8 border-b border-gray-700 pb-4">Technical Specifications</h3>
                <div className="space-y-6">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-700/50 last:border-0 gap-4">
                      <span className="text-gray-400 text-sm md:text-base whitespace-nowrap">{spec.label}</span>
                      <span className="font-semibold text-white text-right text-sm md:text-base break-words">{spec.value}</span>
                    </div>
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

export default LightSheerDesirePage;