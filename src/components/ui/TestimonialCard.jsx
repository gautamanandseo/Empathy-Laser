import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card } from './Card';
import { cn } from '@/lib/utils';

const TestimonialCard = ({ name, image, rating, testimonial, treatment, className }) => {
  return (
    <Card className={cn('flex flex-col h-full bg-white relative overflow-visible mt-8', className)}>
      {/* Floating Avatar */}
      <div className="absolute -top-8 left-8 w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-neutral-100">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl font-bold text-[var(--primary-red)] bg-red-50">
            {name.charAt(0)}
          </div>
        )}
      </div>

      <Quote className="absolute top-6 right-6 w-10 h-10 text-red-50" />
      
      <div className="pt-8 mb-4">
         <h4 className="font-bold text-neutral-900 text-lg">{name}</h4>
         {treatment && (
           <p className="text-xs uppercase tracking-wider text-[var(--primary-red)] font-semibold mt-1">{treatment}</p>
         )}
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'w-4 h-4',
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-200'
            )}
          />
        ))}
      </div>
      
      <p className="text-neutral-600 text-sm leading-relaxed italic flex-grow relative z-10">
        "{testimonial}"
      </p>
      
      {/* Decorative Blur */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
    </Card>
  );
};

export default TestimonialCard;