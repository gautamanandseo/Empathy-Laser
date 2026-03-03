import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Snowflake, ArrowRight, ShieldCheck, Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedSectionHeader from '@/components/ui/EnhancedSectionHeader';
import ProcessSteps from '@/components/ui/ProcessSteps';
import BenefitsGrid from '@/components/ui/BenefitsGrid';
import PremiumCTASection from '@/components/ui/PremiumCTASection';

const CoolsculptingPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      q: "How many treatments will I need?",
      a: "Most clients see optimal results after 1-3 treatment sessions. Some areas may need additional treatments based on your individual goals and fat pocket size. Your consultation determines the exact plan."
    },
    {
      q: "How long does the treatment take?",
      a: "A single CoolSculpting session typically takes 35-60 minutes depending on the area being treated. You can return to normal activities immediately—no downtime required."
    },
    {
      q: "When will I see results?",
      a: "Results begin appearing after 3 weeks as your body naturally processes the dead fat cells. Full results are visible after 2-3 months. The longer you wait, the better the results often appear."
    },
    {
      q: "Is it safe for all skin types?",
      a: "Yes. CoolSculpting is safe for all skin types and tones. It's a non-invasive treatment that only targets fat cells—it doesn't damage skin, nerve fibers, or surrounding tissue."
    },
    {
      q: "Can treated fat come back?",
      a: "The fat cells that are crystallized and eliminated are gone permanently. However, maintaining a healthy lifestyle is important to prevent new fat accumulation in treated or untreated areas."
    },
    {
      q: "What areas can be treated?",
      a: "CoolSculpting can treat abdomen, flanks (love handles), lower back, inner/outer thighs, knees, arms, and neck. We customize treatment to your specific problem areas."
    },
    {
      q: "Are there any side effects?",
      a: "Mild temporary side effects may include redness, swelling, bruising, or numbness immediately after treatment. These typically resolve within a few days to weeks. Serious complications are extremely rare."
    },
    {
      q: "Who is the best candidate?",
      a: "Ideal candidates are women and men in good overall health with stubborn fat pockets resistant to diet and exercise. It's not a weight loss treatment but rather a body contouring solution."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>CoolSculpting | Non-Invasive Fat Reduction | Horizons Clinic</title>
        <meta name="description" content="CoolSculpting (Cryolipolysis) for permanent fat reduction. Non-invasive, FDA-approved body contouring. No downtime, visible results in weeks." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-gradient-to-br from-cyan-950 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Body contouring" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent" />
        </div>

        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 px-6 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-xl">
              ❄️ FDA-Approved Cryolipolysis Technology
            </span>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              Freeze Away Stubborn Fat
            </h1>
            
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl leading-relaxed font-light">
              Non-invasive body contouring that permanently eliminates unwanted fat pockets. No surgery, no downtime, no pain. Just visible results in weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white rounded-xl px-8 py-6 text-lg font-bold shadow-lg shadow-cyan-500/50">
                Book Free Consultation
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-bold">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is CoolSculpting */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader
            badge="The Treatment"
            title="What is CoolSculpting?"
            description="Advanced cryolipolysis technology for permanent fat reduction"
            withGradient
          />

          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  CoolSculpting uses patented cryolipolysis technology to target and destroy fat cells through controlled cooling. When exposed to precise cold temperatures, fat cells undergo apoptosis (programmed cell death) and are naturally processed and eliminated by your body over time.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                  Unlike dieting and exercise that shrink fat cells, CoolSculpting permanently removes them. The treatment is FDA-cleared and has been used by millions worldwide for non-invasive body contouring.
                </p>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-200/30">
                  <h3 className="font-bold text-xl mb-6 text-gray-900">How Cryolipolysis Works:</h3>
                  <ol className="space-y-4">
                    {[
                      "Applicator cools fat to crystallization temperature (39-41°F)",
                      "Fat cells crystallize while surrounding skin and tissue remain unaffected",
                      "Crystallized fat cells trigger apoptosis (natural cell death)",
                      "Your immune system processes and eliminates dead fat cells over time",
                      "Results appear gradually over 8-12 weeks as fat is naturally cleared"
                    ].map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-4"
                      >
                        <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold">
                          {i + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80" alt="CoolSculpting treatment" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl opacity-20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader
            badge="Why Choose CoolSculpting"
            title="Benefits of Non-Invasive Fat Reduction"
            description="Achieve the body contour you've always wanted without surgery"
            withGradient
          />

          <BenefitsGrid
            columns={3}
            benefits={[
              {
                icon: "⚕️",
                title: "FDA-Cleared & Safe",
                description: "Proven safe with 25+ years of clinical research and millions of treatments worldwide"
              },
              {
                icon: "⏱️",
                title: "Zero Downtime",
                description: "Non-invasive with no recovery period. Return to work and activities immediately"
              },
              {
                icon: "✨",
                title: "Permanent Results",
                description: "Treated fat cells are gone forever. Results continue improving for 3 months"
              },
              {
                icon: "💆",
                title: "Comfortable Process",
                description: "No needles, no incisions, no anesthesia. Just lie back and relax during treatment"
              },
              {
                icon: "🎯",
                title: "Targeted Treatment",
                description: "Precise applicators target only problem areas. Surrounding tissue remains unchanged"
              },
              {
                icon: "📊",
                title: "Visible Improvement",
                description: "See noticeable results within 3 weeks, with optimal results at 8-12 weeks"
              }
            ]}
          />
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader
            badge="The Process"
            title="Your CoolSculpting Treatment"
            description="Step-by-step guide to your body contouring journey"
            withGradient
          />

          <ProcessSteps
            steps={[
              {
                title: "Consultation",
                description: "Free consultation to assess your body, discuss goals, and determine which areas to treat. We take photos for before/after comparison."
              },
              {
                title: "Preparation",
                description: "We mark the treatment areas and apply a protective gel. You can read, work, or relax during your session—it's completely non-invasive."
              },
              {
                title: "Treatment Application",
                description: "Custom applicators are placed on treatment areas. The cooling cycle begins for 35-60 minutes. You'll feel intense cold for 5-10 mins, then numbness."
              },
              {
                title: "Massage & Recovery",
                description: "The applicator is removed and the area is massaged briefly. Mild redness may appear temporarily. No restrictions—go about your day normally."
              },
              {
                title: "Natural Elimination",
                description: "Your body naturally processes crystallized fat cells over 8-12 weeks. Results continue improving as your immune system clears the dead cells."
              },
              {
                title: "Follow-Up",
                description: "Schedule your results photo at 3 months. Additional treatments can be done 4-6 weeks apart if you want to treat more areas or enhance results."
              }
            ]}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <EnhancedSectionHeader
            badge="Common Questions"
            title="CoolSculpting FAQs"
            description="Everything you need to know about body contouring"
            withGradient
          />

          <div className="mt-16 space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-cyan-300 transition-colors"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-600 transition-transform duration-300 ${
                      expandedFAQ === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFAQ === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 py-4 bg-gradient-to-b from-cyan-50/50 to-blue-50/50 border-t border-gray-200"
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PremiumCTASection
        headline="Ready to Sculpt Your Dream Body Shape?"
        subheadline="Join thousands who've achieved their ideal body contour with non-invasive CoolSculpting"
        buttons={[
          { text: "Book Free Consultation", variant: "primary" },
          { text: "Contact for Pricing", variant: "secondary" }
        ]}
        badges={["FDA-Cleared", "Non-Invasive", "Proven Results"]}
      />

      {/* Contact for Pricing */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Custom Treatment Plans & Pricing
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              The cost depends on treatment areas and number of sessions needed. Contact us for a personalized quote based on your specific goals.
            </p>
            <Button className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white rounded-xl px-10 py-6 text-lg font-bold shadow-lg shadow-cyan-500/50">
              Get Your Custom Quote
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoolsculptingPage;