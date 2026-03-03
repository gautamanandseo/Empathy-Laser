import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CredentialsSection = () => {
  const { data: credentials, loading, error } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'credentials' },
    orderBy: { column: 'order', ascending: true }
  });

  if (loading) {
    return (
      <div className="py-20 flex justify-center bg-neutral-900">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 px-6 max-w-7xl mx-auto bg-neutral-900">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load credentials: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!credentials || credentials.length === 0) return null;

  return (
    <section className="py-20 bg-neutral-900 text-white relative overflow-hidden" id="credentials-section">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[var(--primary-red)] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Award className="w-12 h-12 text-[var(--primary-red)] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold font-playfair">Accreditations & Standards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {credentials.map((cred, idx) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                   {cred.image_url ? (
                     <img src={cred.image_url} alt="" className="w-10 h-10 object-contain filter brightness-0 invert" />
                   ) : (
                     <Shield className="w-8 h-8 text-[var(--primary-red)]" />
                   )}
                </div>
                <div>
                   <h3 className="text-xl font-bold text-white mb-2">{cred.title}</h3>
                   <p className="text-neutral-400 text-sm leading-relaxed">{cred.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;