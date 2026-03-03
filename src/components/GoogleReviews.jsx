import React, { useState } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Card from './ui/Card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

// Mock data representing verified GMB reviews
const reviewsData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    date: "2 weeks ago",
    rating: 5,
    text: "I had an amazing experience at Empathy Laser Clinic! The staff was incredibly professional and made me feel comfortable throughout my laser hair removal sessions. The results have been fantastic even after just 3 sessions. Highly recommend!",
    verified: true
  },
  {
    id: 2,
    name: "Michael Torres",
    date: "1 month ago",
    rating: 5,
    text: "The skin rejuvenation treatment worked wonders. My complexion is so much clearer and brighter. The clinic is spotless and the team uses top-notch equipment. Thank you for the great service!",
    verified: true
  },
  {
    id: 3,
    name: "Priya Patel",
    date: "3 weeks ago",
    rating: 5,
    text: "Very clean facility and modern equipment. I appreciate the consultation beforehand where they explained everything clearly. No hidden fees, just great results.",
    verified: true
  },
  {
    id: 4,
    name: "David Lee",
    date: "2 months ago",
    rating: 4,
    text: "I was nervous about laser treatment, but the technicians here are experts. Minimal pain and great results. Booking appointments is sometimes tricky due to high demand, but worth the wait.",
    verified: true
  },
  {
    id: 5,
    name: "Jennifer Wu",
    date: "1 week ago",
    rating: 5,
    text: "Professional, punctual, and polite. A top-notch clinic for all skincare needs. I've done both laser hair removal and facials here, and both were excellent experiences.",
    verified: true
  },
  {
    id: 6,
    name: "Robert Chen",
    date: "3 months ago",
    rating: 5,
    text: "Empathy Laser Clinic truly lives up to its name. They care about your comfort and results. Best laser clinic in Los Angeles hands down!",
    verified: true
  }
];

const GoogleReviews = ({ limit }) => {
  const [filter, setFilter] = useState('All');
  
  const displayReviews = limit ? reviewsData.slice(0, limit) : reviewsData;
  const filteredReviews = filter === 'All' 
    ? displayReviews 
    : displayReviews.filter(r => r.rating === parseInt(filter));

  return (
    <div className="space-y-8">
      {!limit && (
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <Button 
            variant={filter === 'All' ? 'default' : 'outline'}
            onClick={() => setFilter('All')}
            className={filter === 'All' ? 'bg-[var(--primary-red)] text-white shadow-lg' : 'bg-white text-gray-700 shadow-sm'}
          >
            All Reviews
          </Button>
          <Button 
            variant={filter === '5' ? 'default' : 'outline'}
            onClick={() => setFilter('5')}
            className={filter === '5' ? 'bg-[var(--primary-red)] text-white shadow-lg' : 'bg-white text-gray-700 shadow-sm'}
          >
            5 Stars
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Using the Enhanced Card Component with 3D shadows */}
            <Card className="h-full flex flex-col hover:border-[var(--primary-red)]/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg shadow-inner">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[var(--text-dark)] flex items-center gap-1">
                      {review.name}
                      {review.verified && (
                        <CheckCircle2 className="w-3 h-3 text-blue-500" aria-label="Verified Review" />
                      )}
                    </h4>
                    <span className="text-xs text-[var(--text-light)]">{review.date}</span>
                  </div>
                </div>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                  alt="Google" 
                  className="w-5 h-5 opacity-60"
                />
              </div>
              
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                    )}
                  />
                ))}
              </div>
              
              <p className="text-sm text-[var(--text-light)] leading-relaxed flex-grow">
                "{review.text}"
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {!limit && (
        <div className="text-center pt-8">
           <Button
             className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
             onClick={() => window.open('https://share.google/RdPKCwXzESkgHi8Jn', '_blank')}
           >
             View More Reviews on Google
           </Button>
        </div>
      )}
    </div>
  );
};

export default GoogleReviews;