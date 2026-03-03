import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Shield, Timer, Award } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

const LaserMachinesSection = () => {
  const machines = [
    {
      name: "Light Sheer Desire",
      image: "https://images.unsplash.com/photo-1615286926197-45c2cf28eafa?auto=format&fit=crop&q=80&w=800",
      description: "FDA-approved diode laser technology known for its speed, effectiveness, and comfort during hair removal treatments.",
      features: [
        { icon: Shield, text: "FDA-Approved Diode Laser" },
        { icon: Timer, text: "Fast Treatment Times" },
        { icon: CheckCircle2, text: "Effective on All Skin Types" },
        { icon: Zap, text: "Precision Targeting" }
      ],
      details: [
        "Advanced cooling technology for maximum comfort",
        "Adjustable settings for personalized care",
        "Proven clinical results trusted by professionals",
        "Long-lasting hair reduction results"
      ],
      accent: "from-blue-600 to-blue-800"
    },
    {
      name: "Soprano Titanium",
      image: "https://images.unsplash.com/photo-1616672038727-1222a537c9b0?auto=format&fit=crop&q=80&w=800",
      description: "The most advanced laser hair removal platform combining three wavelengths for a virtually painless experience.",
      features: [
        { icon: Award, text: "3-Wavelength Technology" },
        { icon: Shield, text: "Painless ICE Plus Cooling" },
        { icon: CheckCircle2, text: "Safe for Dark Skin" },
        { icon: Zap, text: "Versatile Treatments" }
      ],
      details: [
        "Combines 755nm, 808nm, and 1064nm wavelengths",
        "Intelligent cooling for a comfortable experience",
        "Effective for hair removal & skin rejuvenation",
        "Superior results with minimal downtime"
      ],
      accent: "from-[var(--primary-red)] to-[var(--dark-red)]"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Our Advanced Technology" 
          subtitle="We invest in the world's best laser systems to ensure your safety and results" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          {machines.map((machine, index) => (
            <motion.div
              key={machine.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="h-full flex flex-col p-0 overflow-hidden border-t-4 border-[var(--primary-red)] hover:shadow-2xl transition-all duration-300 group">
                {/* Image Area */}
                <div className="relative h-64 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-t ${machine.accent} opacity-20 z-10`} />
                  <img 
                    src={machine.image} 
                    alt={machine.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent z-20">
                    <h3 className="text-3xl font-bold text-white mb-1">{machine.name}</h3>
                    <div className="h-1 w-20 bg-[var(--primary-red)] rounded-full" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex-grow flex flex-col">
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {machine.description}
                  </p>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {machine.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-gray-800 bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <feature.icon className={`w-5 h-5 ${index === 1 ? 'text-[var(--primary-red)]' : 'text-blue-600'}`} />
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Detailed Specs */}
                  <div className="mt-auto">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      Key Benefits & Specs
                    </h4>
                    <ul className="space-y-3">
                      {machine.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
                          <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${index === 1 ? 'bg-[var(--primary-red)]' : 'bg-blue-600'}`} />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaserMachinesSection;