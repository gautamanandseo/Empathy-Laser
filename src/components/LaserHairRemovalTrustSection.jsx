import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const LaserHairRemovalTrustSection = () => {
  const differentiators = [
    "Over 10 years of clinical excellence in Delhi",
    "Uses only FDA-approved medical-grade lasers",
    "Customized treatment plans for every patient",
    "Strict hygiene and safety protocols tailored for you"
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[var(--primary-red)] text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" /> Why Choose Empathy Laser Clinic
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Expert Care You Can Trust in <br/>
              <span className="text-[var(--primary-red)]">Pitampura</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              At Empathy Laser Clinic, we don't just remove hair; we restore confidence. Our experienced medical team uses state-of-the-art technology to ensure your safety and comfort throughout your journey to smoother skin.
            </p>

            <div className="space-y-4">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[var(--primary-red)] flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-gray-50 rounded-xl border border-gray-100">
               <p className="italic text-gray-600 mb-4">"The professionalism and results at Empathy Laser Clinic are unmatched. Highly recommended for anyone in Delhi looking for safe laser treatments."</p>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                    RP
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Riya P.</p>
                    <p className="text-xs text-gray-500">Verified Patient</p>
                  </div>
               </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[var(--primary-red)] rounded-2xl transform rotate-3 opacity-10 scale-105" />
            <img 
              src="https://images.unsplash.com/photo-1552693673-1bf958298935" 
              alt="Professional Medical Team at Empathy Laser Clinic" 
              className="relative rounded-2xl shadow-xl w-full h-full object-cover min-h-[500px]"
            />
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-xs">
              <p className="text-[var(--primary-red)] font-bold text-2xl mb-1">10k+</p>
              <p className="text-gray-600 text-sm font-medium">Successful Treatments Performed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LaserHairRemovalTrustSection;