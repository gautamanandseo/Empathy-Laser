import React from 'react';
import { Check } from 'lucide-react';
import { Card } from './Card';
import { Button } from './button';
import { motion } from 'framer-motion';

const PricingCard = ({ 
  name, 
  singlePrice, 
  packagePrice, 
  membershipPrice, 
  features, 
  onBookNow,
  featured = false 
}) => {
  return (
    <Card 
      className={`flex flex-col h-full relative overflow-hidden ${featured ? 'border-2 border-[var(--primary-red)] shadow-2xl shadow-red-100' : 'border border-neutral-100 shadow-xl'}`}
      depth={true}
    >
      {featured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-[var(--primary-red)] text-white text-xs font-bold px-4 py-2 rounded-bl-2xl shadow-md">
            RECOMMENDED
          </div>
        </div>
      )}

      {/* Glassmorphism Background for Header */}
      <div className="relative mb-8 pt-4">
        <h3 className="text-2xl font-bold text-neutral-900 font-playfair mb-2">{name}</h3>
        <div className={`h-1.5 w-16 rounded-full ${featured ? 'bg-[var(--primary-red)]' : 'bg-neutral-200'}`} />
      </div>
      
      <div className="space-y-4 mb-8 bg-neutral-50/80 backdrop-blur-sm rounded-2xl p-6 border border-neutral-100">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-neutral-500">Single Session</span>
          <span className="text-xl font-bold text-neutral-900">${singlePrice}</span>
        </div>
        {packagePrice && (
          <div className="flex justify-between items-center pt-2 border-t border-dashed border-neutral-200">
            <span className="text-sm font-medium text-neutral-500">Package (6)</span>
            <span className="text-xl font-bold text-[var(--primary-red)]">${packagePrice}</span>
          </div>
        )}
      </div>
      
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <motion.li 
            key={index} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 text-sm text-neutral-600"
          >
            <div className={`p-1 rounded-full ${featured ? 'bg-red-100 text-[var(--primary-red)]' : 'bg-neutral-100 text-neutral-500'}`}>
              <Check className="w-3 h-3 flex-shrink-0" />
            </div>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
      
      <Button
        onClick={onBookNow}
        className={`w-full py-6 rounded-xl font-semibold tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${
          featured 
            ? 'bg-[var(--primary-red)] hover:bg-[var(--primary-red-dark)] text-white shadow-red-200' 
            : 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 hover:text-[var(--primary-red)]'
        }`}
      >
        Book Appointment
      </Button>
    </Card>
  );
};

export default PricingCard;