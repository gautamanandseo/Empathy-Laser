import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Clock, Award, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicData } from '@/constants/clinicData';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';

const LaserHairRemovalHeroSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Advanced Technology",
      desc: "Using FDA-approved Light Sheer Desire & Soprano Titanium lasers."
    },
    {
      icon: ShieldCheck,
      title: "Safe for All Skin Types",
      desc: "Proven safety for every skin tone, including tanned skin."
    },
    {
      icon: Clock,
      title: "Quick & Comfortable",
      desc: "Experience fast sessions with minimal discomfort or downtime."
    },
    {
      icon: Award,
      title: "Expert Professionals",
      desc: "Treatments performed by certified medical experts in Pitampura."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Professional Laser Hair Removal in <span className="text-[var(--primary-red)]">Pitampura, Delhi</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced laser technology for safe, effective hair removal on all skin types. Say goodbye to unwanted hair with our expert care.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button
              onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
              size="lg"
              className="bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white px-8 py-6 rounded-full text-lg shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Book Consultation via WhatsApp
            </Button>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto mb-16">
            <img 
              src="https://images.unsplash.com/photo-1564479893852-180ac6065b2b" 
              alt="Laser Hair Removal Treatment in Delhi" 
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
               <p className="text-white text-lg font-medium bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
                 Safe • Effective • Permanent Reduction
               </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center h-full border-t-4 border-[var(--primary-red)]">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-7 h-7 text-[var(--primary-red)]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LaserHairRemovalHeroSection;