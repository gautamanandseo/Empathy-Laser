import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Target, MousePointer2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const LightSheerDesireSection = () => {
  const navigate = useNavigate();
  const features = ["Versatile 805nm diode laser", "3 handpieces with various spot sizes", "2 advanced technologies", "Upgradable features: add capabilities as your practice grows"];
  const handpieces = [{
    name: "The HS",
    desc: "HIT 22×35mm spot size enabling use of low-fluence and a unique mechanism of pain reduction, providing, fast and comfortable treatment.",
    icon: Zap
  }, {
    name: "The XC",
    desc: "Sapphire ChillTip spot size of 12×12mm, providing a solution for large and small areas requiring higher fluence levels.",
    icon: Target
  }, {
    name: "The ET",
    desc: "Sapphire ChillTip spot size of 9×9mm designed to treat small areas that require maximum precision and higher fluence.",
    icon: MousePointer2
  }];
  return <section className="py-24 bg-gray-50 apple-3d-container overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <div className="mb-2 inline-block px-4 py-1.5 rounded-full bg-red-50 text-[var(--primary-red)] text-sm font-bold tracking-wide border border-red-100">
              Gold Standard Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-playfair">
              LightSheer® DESIRE™
            </h2>
            <h3 className="text-2xl text-gray-500 mb-6 font-light">
              Laser System
            </h3>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              More and more people desire to have permanent hair reduction. They want a treatment that is effective, fast and comfortable. To meet these needs, Lumenis, a leader in laser and energy based technologies, developed the LightSheer DESIRE, the new generation of laser hair reduction system from the LightSheer Family of products, so you can grow your business by offering your patients what they DESIRE.
            </p>

            <div className="mb-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 apple-3d-card">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Performance</h4>
              <p className="font-semibold text-gray-700 mb-3">Unique features:</p>
              <ul className="space-y-3">
                {features.map((feature, idx) => <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-[var(--primary-red)] flex items-center justify-center flex-shrink-0 text-white">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-600">{feature}</span>
                  </li>)}
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">3 Handpieces for Treating All Body Areas</h4>
              <div className="grid gap-4">
                {handpieces.map((item, idx) => <motion.div key={idx} whileHover={{
                y: -2
              }} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all apple-3d-card">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[var(--primary-red)]">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">{item.name}</h5>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>)}
              </div>
            </div>

            <Button onClick={() => navigate('/lightsheer-desire')} className="bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white px-8 py-6 text-lg rounded-full shadow-lg apple-3d-button">
              Learn More About LightSheer
            </Button>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="relative h-full min-h-[600px] flex items-center justify-center">
            <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white apple-3d-card group">
              <img src="https://horizons-cdn.hostinger.com/f9cda7f1-8bc9-4fb8-a9ad-a1044f1605f0/desire_front_right2-LO6rE.png" alt="LightSheer Desire Laser System" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="inline-block px-3 py-1 bg-[var(--primary-red)] rounded-md text-xs font-bold uppercase tracking-wider mb-2">
                  Clinical Excellence
                </div>
                <h3 className="text-2xl font-bold font-playfair">Precision & Comfort</h3>
                <p className="text-gray-200 mt-2">Setting the standard for high-speed diode laser hair removal.</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50 z-[-1]" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-50 z-[-1]" />
          </motion.div>

        </div>
      </div>
    </section>;
};
export default LightSheerDesireSection;