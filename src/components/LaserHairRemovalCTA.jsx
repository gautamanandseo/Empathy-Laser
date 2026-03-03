import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicData } from '@/constants/clinicData';

const LaserHairRemovalCTA = () => {
  return (
    <section className="relative py-20 bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3" 
          alt="Empathy Laser Clinic Reception" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Smooth, <span className="text-[var(--primary-red)]">Hair-Free Skin?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Don't wait to feel your best. Book a quick consultation at Empathy Laser Clinic in Pitampura today and discover the freedom of permanent hair reduction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
                size="lg"
                className="bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-red-900/50 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Book via WhatsApp
              </Button>
              <Button
                onClick={() => window.location.href = `tel:${clinicData.phone.value}`}
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call {clinicData.phone.display}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LaserHairRemovalCTA;