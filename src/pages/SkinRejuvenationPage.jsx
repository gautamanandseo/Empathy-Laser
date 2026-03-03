import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedSectionHeader from '@/components/ui/EnhancedSectionHeader';
import ProcessSteps from '@/components/ui/ProcessSteps';
import BenefitsGrid from '@/components/ui/BenefitsGrid';
import PremiumCTASection from '@/components/ui/PremiumCTASection';

const SkinRejuvenationPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    { q: 'How many treatments do I need?', a: 'Most clients see improvement after 1-3 sessions. A complete course typically involves 6-8 sessions spaced 2-4 weeks apart. Your skin type and concerns determine the exact protocol.' },
    { q: 'Is there downtime?', a: 'Minimal to none. Slight redness for 1-2 hours post-treatment. Most return to normal activities immediately. Avoid intense sun exposure for 48 hours.' },
    { q: 'Can this help acne scars?', a: 'Yes. Highly effective for atrophic and hypertrophic scars. Multiple sessions yield best results for deeper scarring.' },
    { q: 'What skin types can be treated?', a: 'Our advanced laser safely treats all skin types (Fitzpatrick 1-6). We customize settings based on your skin needs.' },
    { q: 'How long do results last?', a: 'Results are long-lasting and improve over time. Maintenance sessions every 12-18 months help maintain optimal results.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Skin Rejuvenation | Restore Youthful Glow | Horizons Clinic</title>
        <meta name="description" content="Professional skin rejuvenation using advanced laser technology. Reduce wrinkles, improve texture, restore youthful glow." />
      </Helmet>

      <section className="relative h-[90vh] flex items-center bg-gradient-to-br from-amber-950 via-rose-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Skin rejuvenation" /><div className="absolute inset-0 bg-gradient-to-r from-rose-900 to-transparent" /></div>
        <div className="absolute inset-0 opacity-25"><div className="absolute top-20 left-20 w-96 h-96 bg-amber-300 rounded-full blur-3xl animate-pulse" /><div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-400/50 rounded-full blur-3xl" /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-amber-500/20 text-amber-200 border border-amber-400/30 px-6 py-2 rounded-full text-sm font-semibold mb-6">✨ Advanced Laser Skin Renewal</span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8">Restore Your Youthful Glow</h1>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl leading-relaxed font-light">Advanced laser rejuvenation that stimulates collagen, reduces wrinkles, and restores texture. Non-invasive results that look natural.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-amber-400 to-rose-600 hover:from-amber-500 hover:to-rose-700 text-white rounded-xl px-8 py-6 text-lg font-bold">Book Consultation</Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-bold">Learn More <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader badge="The Treatment" title="What is Skin Rejuvenation?" description="Advanced laser technology that turns back the clock on aging skin" withGradient />
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">Skin rejuvenation uses fractional laser technology to remove damaged outer skin layers while stimulating collagen production in deeper layers. This process rebuilds elasticity and texture from within.</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">Unlike surface-level treatments, our laser penetrates to the dermal layer where aging really occurs, providing dramatic results that continue improving as collagen regenerates naturally.</p>
              <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl p-8 border border-amber-200/30">
                <h3 className="font-bold text-xl mb-6">What We Target:</h3>
                <ul className="space-y-3">{['Fine lines & wrinkles', 'Loss of elasticity', 'Uneven texture & large pores', 'Age spots & sun damage', 'Dull complexion', 'Acne scars'].map((item, i) => (<li key={i} className="flex items-start gap-3"><div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 flex-shrink-0 mt-0.5"><Check className="h-4 w-4 text-white" /></div><span className="text-gray-700">{item}</span></li>))}</ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><div className="rounded-2xl overflow-hidden shadow-2xl"><img src="https://images.unsplash.com/photo-1576091160679-112df541d74e?auto=format&fit=crop&q=80" alt="Skin rejuvenation" className="w-full h-full object-cover" /></div></motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader badge="Why Choose Us" title="Benefits of Laser Skin Rejuvenation" description="Transform your skin naturally and safely" withGradient />
          <BenefitsGrid columns={3} benefits={[{ icon: '👑', title: 'Visible Anti-Aging', description: 'Reduction in fine lines, wrinkles, age spots for younger appearance' }, { icon: '✨', title: 'Improved Texture', description: 'Smoother skin with tighter pores and refined surface' }, { icon: '🌟', title: 'Natural Glow', description: 'Restored radiance without overdone appearance' }, { icon: '💪', title: 'Collagen Boost', description: 'Stimulates natural collagen for ongoing improvement' }, { icon: '🎯', title: 'Precise Targeting', description: 'Targets problem areas while leaving surrounding skin untouched' }, { icon: '📈', title: 'Long-Lasting Results', description: 'Continues improving for months as collagen regenerates' }]} />
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader badge="The Process" title="Your Skin Rejuvenation Journey" description="Step-by-step guide to youthful, radiant skin" withGradient />
          <ProcessSteps steps={[{ title: 'Assessment', description: 'We analyze your skin, assess damage, discuss goals. Photo documentation captures your starting point.' }, { title: 'Custom Plan', description: 'We design treatment protocol based on your specific concerns and desired results.' }, { title: 'Preparation', description: 'Cleanse face, apply numbing cream for 15 minutes. Protective eyewear provided. Takes 20-30 minutes.' }, { title: 'Laser Treatment', description: 'Laser handpiece passes over skin in systematic patterns. Youll feel warmth. Cooling airflow ensures comfort.' }, { title: 'Aftercare', description: 'Mild redness & swelling resolve within hours. Apply soothing serum and SPF 50+. No makeup for 24 hours.' }, { title: 'Results Timeline', description: 'Initial results in 1-2 weeks. Continued improvement 3-6 months as collagen remodels.' }]} />
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <EnhancedSectionHeader badge="FAQs" title="Skin Rejuvenation Questions" description="Everything you need to know" withGradient />
          <div className="mt-16 space-y-4">{faqs.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="border border-gray-200 rounded-xl overflow-hidden hover:border-amber-300"><button onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)} className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white"><span className="font-bold text-gray-900">{f.q}</span><ChevronDown className={`w-5 h-5 transition-transform ${expandedFAQ === i ? 'rotate-180' : ''}`} /></button>{expandedFAQ === i && (<div className="px-6 py-4 bg-amber-50/50 border-t border-gray-200"><p className="text-gray-700">{f.a}</p></div>)}</motion.div>))}</div>
        </div>
      </section>

      <PremiumCTASection headline="Reveal Your Most Beautiful Skin" subheadline="Regain your youthful glow with our laser skin rejuvenation" buttons={[{ text: 'Book Consultation', variant: 'primary' }, { text: 'Contact for Pricing', variant: 'secondary' }]} badges={['FDA-Approved', 'Expert Care', 'Natural Results']} />

      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Personalized Treatment Plans</h2>
          <p className="text-xl text-gray-300 mb-8">Sessions and cost vary based on area size and skin concerns. Contact us for detailed assessment and pricing.</p>
          <Button className="bg-gradient-to-r from-amber-400 to-rose-600 text-white rounded-xl px-10 py-6 text-lg font-bold">Schedule Assessment</Button>
        </div>
      </section>
    </div>
  );
};

export default SkinRejuvenationPage;