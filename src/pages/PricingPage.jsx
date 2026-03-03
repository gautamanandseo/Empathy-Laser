import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Loader2, CheckCircle, XCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { clinicData } from '@/constants/clinicData';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const PricingPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  
  // Real-time sync for pricing plans
  const { data: pricingPlans, loading, error } = useRealtimeSync('pricing_plans', {
    orderBy: { column: 'order', ascending: true }
  });

  const handleBookNow = () => {
    window.open(clinicData.whatsapp.link, '_blank');
  };

  const specialOffers = [
    {
      title: 'New Client Special',
      description: 'Get 20% off your first treatment package',
      savings: 'Limited Time',
    },
    {
      title: 'Seasonal Package',
      description: 'Bundle 3 different treatments and save big',
      savings: 'Best Value',
    },
    {
      title: 'Referral Bonus',
      description: 'Refer a friend and both get credits for next session',
      savings: 'Bonus',
    },
  ];

  const faqs = [
    { question: 'Do you offer payment plans?', answer: 'Yes! We offer flexible payment plans for all packages. Contact us on WhatsApp for details.' },
    { question: 'What\'s included in the membership?', answer: 'Membership includes one treatment per month at a discounted rate, priority booking, and exclusive member-only promotions.' },
    { question: 'Can I combine different treatments in a package?', answer: 'Absolutely! We offer custom packages that combine multiple treatments. Contact us to create a personalized plan.' },
    { question: 'What if I need to cancel or reschedule?', answer: 'We offer flexible rescheduling with 24-hour notice. Package sessions never expire, so you can use them at your convenience.' },
    { question: 'Are there any hidden fees?', answer: 'No hidden fees! The price we quote is the price you pay. We believe in transparent pricing with no surprises.' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Pricing | Empathy Laser Clinic - Custom Quotes & Packages</title>
        <meta name="description" content="Get a custom quote for laser treatments. Flexible packages, memberships, and special offers available. Contact us for personalized pricing." />
      </Helmet>

      {/* Hero Section - Clean White */}
      <section className="relative pt-32 pb-16 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
               Transparent & Affordable
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-playfair">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              Quality treatments tailored to your needs. No hidden fees. Contact us for a personalized quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Choose Your Package"
            subtitle="Flexible options designed for optimal results"
            className="mb-16"
          />

          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-gray-400" /></div>
          ) : error ? (
             <div className="text-center text-red-500">{error.message || 'Unable to load pricing plans'}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans && pricingPlans.map((plan, index) => {
                 const featuresList = Array.isArray(plan.features) ? plan.features : [];
                 const isPopular = index === 1; // Assuming 2nd plan is popular for now

                 return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <div className={`h-full relative p-8 rounded-2xl border ${isPopular ? 'border-[var(--primary-red)] shadow-xl scale-105 z-10' : 'border-gray-200 shadow-sm hover:shadow-md'} bg-white transition-all flex flex-col`}>
                      {isPopular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--primary-red)] text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wide">
                          MOST POPULAR
                        </div>
                      )}
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-gray-500 text-sm">{plan.description}</p>
                      </div>

                      <div className="mb-8">
                        <div className="flex items-baseline">
                           <span className="text-4xl font-bold text-gray-900">
                             {plan.price ? `₹${plan.price}` : 'Custom'}
                           </span>
                           {plan.price && <span className="text-gray-500 ml-2">/session</span>}
                        </div>
                      </div>

                      <ul className="space-y-4 mb-8 flex-grow">
                        {featuresList.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        onClick={handleBookNow}
                        className={`w-full py-6 text-lg font-semibold rounded-xl ${isPopular ? 'bg-[var(--primary-red)] hover:bg-red-700 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'}`}
                      >
                        Book Now
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Limited Time Offers"
            subtitle="Take advantage of our exclusive promotional packages"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl p-8 text-center border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-4 py-1 rounded-full bg-red-50 text-[var(--primary-red)] text-sm font-semibold mb-6">
                      {offer.savings}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">{offer.description}</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={handleBookNow}
                    className="w-full border-gray-200 text-gray-900 hover:bg-gray-50"
                  >
                    Claim Offer
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Pricing FAQs"
            subtitle="Common questions about our pricing and payment options"
            className="mb-12"
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div
                  className="bg-white rounded-xl p-6 cursor-pointer border border-gray-200 hover:border-gray-300 transition-all shadow-sm"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h4>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="text-gray-600 overflow-hidden leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;