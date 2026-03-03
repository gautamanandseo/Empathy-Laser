import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Shield, Zap, Sparkles, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';

const iconMap = {
  Heart: Heart,
  Star: Star,
  Shield: Shield,
  Zap: Zap,
  Sparkles: Sparkles
};

const ValuesSection = () => {
  const { data: values, loading, error, refresh } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'values' },
    orderBy: { column: 'order', ascending: true }
  });

  // Debugging logs
  useEffect(() => {
    if (loading) {
      console.log('ValuesSection: Loading data...');
    } else if (error) {
      console.error('ValuesSection: Error loading data:', error);
    } else {
      console.log(`ValuesSection: Successfully loaded ${values?.length || 0} items.`, values);
    }
  }, [loading, error, values]);

  // Loading State
  if (loading) {
    return (
      <section className="py-20 bg-gray-50" id="values-section">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              <span className="ml-3 text-gray-500">Loading core values...</span>
           </div>
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto bg-gray-50" id="values-section">
        <Alert variant="destructive" className="bg-white border-red-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unable to load values</AlertTitle>
          <AlertDescription className="flex flex-col gap-3 mt-2">
            <p>We couldn't retrieve the values data at this time. Please try again.</p>
            <Button variant="outline" size="sm" onClick={refresh} className="w-fit gap-2">
              <RefreshCw className="w-3 h-3" /> Retry
            </Button>
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  // Empty State
  if (!values || values.length === 0) {
     return (
        <section className="py-20 bg-gray-50 text-center" id="values-section">
           <div className="max-w-md mx-auto px-6">
              <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900">Our Values</h3>
              <p className="text-gray-500 mt-2">Content is currently being updated.</p>
           </div>
        </section>
     );
  }

  return (
    <section className="py-20 bg-gray-50" id="values-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[var(--primary-red)] font-semibold tracking-wider uppercase text-sm">Our Philosophy</span>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mt-2 text-gray-900">Our Core Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((val, idx) => {
            // Determine icon. If val.details?.icon exists, use map. Else fallback or image.
            const IconComponent = val.details?.icon && iconMap[val.details.icon] ? iconMap[val.details.icon] : Sparkles;
            
            return (
              <motion.div
                key={val.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--primary-red)]/5 flex items-center justify-center mb-6 group-hover:bg-[var(--primary-red)]/10 transition-colors">
                  {val.image_url ? (
                    <img src={val.image_url} alt="" className="w-8 h-8 object-contain" />
                  ) : (
                    <IconComponent className="w-7 h-7 text-[var(--primary-red)]" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                <p className="text-gray-500 leading-relaxed">{val.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;