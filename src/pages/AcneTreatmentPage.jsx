import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedSectionHeader from '@/components/ui/EnhancedSectionHeader';
import ProcessSteps from '@/components/ui/ProcessSteps';
import BenefitsGrid from '@/components/ui/BenefitsGrid';
import PremiumCTASection from '@/components/ui/PremiumCTASection';

const AcneTreatmentPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    { q: 'How many treatments will I need?', a: 'Most clients see improvement after 4-6 sessions. Mild acne may clear in fewer sessions, while severe acne requires 8-10. Sessions spaced 2-4 weeks apart.' },
    { q: 'How does laser acne treatment work?', a: 'Our laser destroys acne-causing bacteria (P. acnes), reduces sebaceous gland activity, and stimulates skin healing. Works on active acne and prevents new breakouts.' },
    { q: 'Is it painful?', a: 'Minimal discomfort—just warm sensation during treatment. We apply numbing cream beforehand. No downtime or recovery needed.' },
    { q: 'Can it treat acne scars?', a: 'Yes. In addition to treating active acne, laser stimulates collagen production to improve appearance of indented and raised acne scars.' },
    { q: 'Will acne come back?', a: 'Most clients experience long-term improvement or complete clearance. Some may need occasional maintenance, but most remain clear for extended periods.' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Acne Treatment | Clear Skin Laser Treatment | Horizons Clinic</title>
        <meta name="description" content="Professional laser acne treatment that clears breakouts and prevents new acne. FDA-approved, gentle, long-lasting results." />
      </Helmet>

      <section className="relative h-[90vh] flex items-center bg-gradient-to-br from-purple-950 via-indigo-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20"><img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Acne treatment" /><div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-transparent" /></div>
        <div className="absolute inset-0 opacity-25"><div className="absolute top-20 left-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" /><div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/50 rounded-full blur-3xl" /></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-purple-500/20 text-purple-200 border border-purple-400/30 px-6 py-2 rounded-full text-sm font-semibold mb-6">⚡ Advanced Laser Acne Therapy</span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8">Clear Skin, Forever</h1>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl leading-relaxed font-light">Advanced laser therapy destroys acne-causing bacteria, reduces sebaceous activity, prevents breakouts. Fast, effective, lasting results.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl px-8 py-6 text-lg font-bold">Book Consultation</Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-bold">Learn More <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader badge="The Treatment" title="Professional Laser Acne Treatment" description="Advanced technology that attacks acne at its source" withGradient />
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">Our laser targets both acne-causing bacteria (P. acnes) that causes inflammation, and the sebaceous glands that overproduce oil.</p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">Unlike topical treatments that only address the surface, our laser penetrates deep into pores, destroying bacteria while reducing oil production and promoting healing.</p>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200/30">
                <h3 className="font-bold text-xl mb-6">How It Works:</h3>
                <ul className="space-y-3">{['Destroys bacteria in follicles', 'Reduces sebaceous gland activity', 'Reduces inflammation & redness', 'Prevents new breakouts', 'Improves acne scars', 'Strengthens skin barrier'].map((item, i) => (<li key={i} className="flex items-start gap-3"><div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex-shrink-0"><Check className="h-4 w-4 text-white" /></div><span className="text-gray-700">{item}</span></li>))}</ul>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><img src="https://images.unsplash.com/photo-1576091160675-69ebaa83a6c0?auto=format&fit=crop&q=80" alt="Acne treatment" className="rounded-2xl shadow-2xl" /></motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader badge="Why Laser Acne Treatment" title="Benefits of Laser Acne Therapy" description="Proven effective alternative to medications" withGradient />
          <BenefitsGrid columns={3} benefits={[{ icon: '✨', title: 'Clear Breakouts Fast', description: 'See improvement after first sessions as bacteria dies' }, { icon: '🛡️', title: 'Chemical-Free', description: 'No harsh medications, antibiotics, or drugs' }, { icon: '👍', title: 'All Acne Types', description: 'Effective for blackheads, whiteheads, cystic acne' }, { icon: '📉', title: 'Prevents New Acne', description: 'Reduces oil and bacteria to prevent future breakouts' }, { icon: '💪', title: 'Improves Texture', description: 'Collagen stimulation makes skin smoother' }, { icon: '🎯', title: 'No Downtime', description: 'Return to activities immediately' }]} />
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader badge="The Process" title="Your Acne Treatment Journey" description="Clear, step-by-step guide to clear skin" withGradient />
          <ProcessSteps steps={[{ title: 'Assessment', description: 'Analyze acne type, severity, and skin sensitivity. Discuss triggers to create personalized plan.' }, { title: 'Test Patch', description: 'Small test area treated to ensure comfort and effectiveness before full treatment.' }, { title: 'Full Treatment', description: 'Laser applied systematically across affected areas. Cooling keeps you comfortable. 20-30 minutes.' }, { title: 'Aftercare', description: 'Slight redness fades within hours. Apply soothing serum and SPF 50+. Apply makeup after 2 hours.' }, { title: 'Results & Recovery', description: 'Existing acne clears visibly within 3-5 days. Skin may temporarily worsen (purge) before clearing.' }, { title: 'Follow-Up', description: 'Repeat treatments every 2-4 weeks. Most clients acne-free after complete course.' }]} />
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <EnhancedSectionHeader badge="FAQs" title="Acne Treatment Questions" description="Everything you need to know about clearing your skin" withGradient />
          <div className="mt-16 space-y-4">{faqs.map((f, i) => (<motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }} className="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300"><button onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)} className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white"><span className="font-bold text-gray-900">{f.q}</span><ChevronDown className={`w-5 h-5 transition-transform ${expandedFAQ === i ? 'rotate-180' : ''}`} /></button>{expandedFAQ === i && (<div className="px-6 py-4 bg-purple-50/50 border-t"><p className="text-gray-700">{f.a}</p></div>)}</motion.div>))}</div>
        </div>
      </section>

      <PremiumCTASection headline="Get Clear, Acne-Free Skin" subheadline="Join thousands with permanently clear skin" buttons={[{ text: 'Book Consultation', variant: 'primary' }, { text: 'Contact for Pricing', variant: 'secondary' }]} badges={['FDA-Approved', 'No Medication', 'Visible Results']} />

      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">Affordable Acne Solutions</h2>
          <p className="text-xl text-gray-300 mb-8">Cost depends on acne severity and area. Contact us for free assessment and personalized pricing.</p>
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl px-10 py-6 text-lg font-bold">Get Free Assessment</Button>
        </div>
      </section>
    </div>
  );
};

export default AcneTreatmentPage;