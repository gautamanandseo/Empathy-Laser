import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Quote, Loader2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import GoogleReviews from '@/components/GoogleReviews';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const TestimonialsPage = () => {
  const navigate = useNavigate();
  
  // Fetch real-time testimonials from Supabase
  const { data: testimonials, loading, error } = useRealtimeSync('testimonials', {
    orderBy: { column: 'order', ascending: true }
  });

  return (
    <div className="bg-white">
      <Helmet>
        <title>Client Reviews | Empathy Laser Clinic - Verified Testimonials</title>
        <meta name="description" content="Read verified Google reviews from our satisfied clients. See why Empathy Laser Clinic is top-rated in Delhi." />
      </Helmet>

      {/* Hero Section - Clean White */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-1.5 rounded-full mb-6 border border-yellow-100">
               <span className="flex gap-1">
                 {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
               </span>
               <span className="text-yellow-700 text-sm font-semibold">4.9/5 Rating</span>
             </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-playfair">
              Client Success Stories
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              Real experiences from verified clients who rediscovered themselves with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Internal Reviews Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* removed heading section here as requested */}
            
            {loading ? (
                <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
            ) : error ? (
                <p className="text-center text-red-500">Failed to load reviews.</p>
            ) : testimonials && testimonials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, idx) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative hover:shadow-md transition-shadow"
                        >
                            <Quote className="absolute top-6 right-6 text-orange-100 w-10 h-10" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                    {testimonial.image_url ? (
                                        <img src={testimonial.image_url} alt={testimonial.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[var(--color-vibrant-orange)] text-white font-bold text-lg">
                                            {testimonial.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-xs text-gray-400">Verified Patient</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p>No testimonials added yet.</p>
                </div>
            )}
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">Google Reviews</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[var(--color-vibrant-orange)] to-[var(--color-accent-orange)] rounded-full mb-4 mx-auto" />
            <p className="text-lg text-gray-500">See what our community is saying about their treatments on Google.</p>
          </div>
          <GoogleReviews />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 font-playfair">
              Ready to Share Your Story?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-light">
              Join hundreds of satisfied clients and start your transformation journey today
            </p>
            <Button
              onClick={() => navigate('/contact')}
              size="lg"
              className="bg-gradient-to-r from-[var(--color-vibrant-orange)] to-[var(--color-accent-red)] text-white hover:opacity-90 text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;