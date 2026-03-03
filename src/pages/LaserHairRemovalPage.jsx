import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Clock, Users, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StunningHeroSection from '@/components/ui/StunningHeroSection';
import EnhancedSectionHeader from '@/components/ui/EnhancedSectionHeader';
import BenefitsGrid from '@/components/ui/BenefitsGrid';
import ProcessSteps from '@/components/ui/ProcessSteps';
import PremiumCTASection from '@/components/ui/PremiumCTASection';

const LaserHairRemovalPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqs = [
    {
      q: "How many sessions will I need?",
      a: "Most clients see 80-90% hair reduction after 6-8 sessions, spaced 4-6 weeks apart. Results vary based on hair color, skin type, and treat area. Your consultation will provide a personalized estimate."
    },
    {
      q: "Is the treatment painful?",
      a: "No. Unlike traditional lasers, our Soprano Titanium features an advanced cooling system that makes the treatment comfortable. Most clients describe it as a mild warming sensation."
    },
    {
      q: "Can I get treated if I have tan skin?",
      a: "Yes! One of the biggest advantages of Soprano Titanium is its safety across all skin types (1-6 Fitzpatrick scale), including tanned skin. Traditional lasers cannot be used on tan or darker skin."
    },
    {
      q: "What happens after treatment?",
      a: "Results are permanent for treated hairs. You may experience mild redness for a few hours. We recommend avoiding sun exposure and using SPF 30+ for 2 weeks post-treatment."
    },
    {
      q: "How long do results last?",
      a: "Hair reduction is permanent for treated follicles. Occasional maintenance sessions (1-2 per year) may be needed to address new hair growth or fine vellus hairs."
    },
    {
      q: "Which areas can be treated?",
      a: "Our laser safely treats face, underarms, bikini line, legs, back, chest, and all body areas. We customize treatment plans for each client's specific needs."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Laser Hair Removal | Permanent & Painless | Horizons Clinic</title>
        <meta name="description" content="Advanced laser hair removal with Soprano Titanium technology. Permanent results on all skin types, painless treatment. Book free consultation." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden group">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Laser Hair Removal" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent" />
        </div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-orange-500/20 text-orange-200 border border-orange-400/30 px-6 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-xl">
              ✨ Advanced Soprano Titanium Technology
            </span>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight">
              Permanent Hair Removal, Zero Pain
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed font-light">
              Experience the most advanced laser hair removal technology available. Safe for all skin types, effective on even stubborn hair, and completely comfortable treatment from start to finish.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-8 py-6 text-lg font-bold shadow-lg shadow-orange-500/50">
                Book Free Consultation
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-bold">
                Learn More <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Laser Hair Removal */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader
            badge="The Treatment"
            title="What is Soprano Titanium Laser Hair Removal?"
            description="Revolutionary laser technology that removes unwanted hair permanently"
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
                  Soprano Titanium uses 810nm diode laser wavelength to target melanin in hair follicles. The laser heats the follicle's base (bulb and bulge) to 45-50°C, permanently disabling hair growth without damaging surrounding skin.
                </p>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200/30">
                  <h3 className="font-bold text-xl mb-6 text-gray-900">Why Soprano Titanium Stands Out:</h3>
                  <ul className="space-y-4">
                    {[
                      "850-2000nm wavelength range treats all hair and skin types",
                      "Gold standard handpiece with advanced cooling system",
                      "3X faster treatment than traditional lasers",
                      "Works on fine, light, and coarse dark hair",
                      "Safe on tanned and darker skin (Fitzpatrick 1-6)",
                      "Gentle enough for sensitive areas (face, bikini line)"
                    ].map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-r from-orange-500 to-red-600">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
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
                <img src="https://images.unsplash.com/photo-1576091160679-112df541d74e?auto=format&fit=crop&q=80" alt="Laser treatment demonstration" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl opacity-20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader
            badge="Why Choose Us"
            title="Benefits of Laser Hair Removal"
            description="Transform your life with permanently smooth skin"
            withGradient
          />

          <BenefitsGrid
            columns={3}
            benefits={[
              {
                icon: "🎯",
                title: "95% Hair Reduction",
                description: "Permanent 80-95% reduction in hair growth after complete treatment course"
              },
              {
                icon: "😌",
                title: "Completely Painless",
                description: "Advanced cooling technology makes treatment comfortable with zero pain"
              },
              {
                icon: "⚡",
                title: "Fast Treatments",
                description: "Full legs in 45 minutes. Full body in 60 minutes. Minimal time investment"
              },
              {
                icon: "🌍",
                title: "All Skin Types",
                description: "Safe and effective on all skin tones from very light to very dark skin"
              },
              {
                icon: "👌",
                title: "No Maintenance",
                description: "Permanently smooth skin with only optional maintenance every 1-2 years"
              },
              {
                icon: "💰",
                title: "Long-Term Savings",
                description: "Eliminate monthly spending on razors, wax, and depilatory creams forever"
              }
            ]}
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <EnhancedSectionHeader
            badge="The Process"
            title="How Your Treatment Works"
            description="Step-by-step guide to your hair removal journey"
            withGradient
          />

          <ProcessSteps
            steps={[
              {
                title: "Consultation",
                description: "Free in-depth consultation to assess skin type, hair color, and treatment area. We discuss expectations and create a personalized plan."
              },
              {
                title: "Preparation",
                description: "Shave the treatment area 24 hours before. Avoid sun exposure and tanning 2 weeks prior. No makeup or lotions on treatment day."
              },
              {
                title: "Treatment",
                description: "Protective eyewear provided. Our expert technician uses the laser handpiece across the treatment area in systematic passes. Cooling gel ensures comfort."
              },
              {
                title: "Recovery",
                description: "No downtime. You can resume normal activities immediately. Mild redness may appear for 1-2 hours. Apply sunscreen daily for 2 weeks."
              },
              {
                title: "Results",
                description: "Hair falls out naturally over 10-14 days. You'll see significant reduction after first session. Complete results appear after 6-8 sessions (4-6 weeks apart)."
              },
              {
                title: "Maintenance",
                description: "Optional touch-up sessions every 12-24 months to maintain results. Most clients are thrilled with permanent hair reduction achieved."
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
            title="Frequently Asked Questions"
            description="Everything you need to know about laser hair removal"
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
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 transition-colors"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-orange-600 transition-transform duration-300 ${
                      expandedFAQ === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFAQ === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 py-4 bg-gradient-to-b from-orange-50/50 to-red-50/50 border-t border-gray-200"
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
        headline="Ready for Smooth, Hair-Free Skin?"
        subheadline="Join thousands of satisfied clients who've eliminated unwanted hair permanently"
        buttons={[
          { text: "Book Free Consultation", variant: "primary" },
          { text: "Contact for Pricing", variant: "secondary" }
        ]}
        badges={["FDA Certified", "Soprano Titanium", "Expert Staff"]}
      />

      {/* Contact for Pricing CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Discover Your Custom Treatment Plan
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Every skin type and hair condition is unique. Contact us for a personalized consultation and pricing based on your specific treatment needs.
            </p>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-10 py-6 text-lg font-bold shadow-lg shadow-orange-500/50">
              Get Pricing Information
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LaserHairRemovalPage;