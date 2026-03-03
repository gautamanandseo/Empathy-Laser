import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Zap, Award, TrendingUp, Loader2, Sparkles, Shield, Zap as Lightning, Heart, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';
import ServiceCard from '@/components/ui/ServiceCard';
import ImageSlider from '@/components/ImageSlider';
import TransformationSection from '@/components/TransformationSection'; 
import { useNavigate } from 'react-router-dom';
import GoogleReviews from '@/components/GoogleReviews';
import ButtonPremium from '@/components/ui/ButtonPremium';
import { useButtonCustomization } from '@/contexts/ButtonCustomizationContext';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import MobileCardWrapper from '@/components/ui/MobileCardWrapper';
import ErrorBoundary from '@/components/ErrorBoundary';
import GradientButton from '@/components/ui/GradientButton';
import PremiumStatsSection from '@/components/ui/PremiumStatsSection';
import EnhancedSectionHeader from '@/components/ui/EnhancedSectionHeader';
import PremiumServiceCard from '@/components/ui/PremiumServiceCard';
import PremiumCTASection from '@/components/ui/PremiumCTASection';
import BenefitsGrid from '@/components/ui/BenefitsGrid';

// Components
import AdvancedServicesShowcase from '@/components/AdvancedServicesShowcase';
import ReshapeYourBodySection from '@/components/ReshapeYourBodySection';
import FollowOurJourneySection from '@/components/FollowOurJourneySection';
import WelcomeMessage from '@/components/WelcomeMessage'; 
import AdvancedTechnologySection from '@/components/AdvancedTechnologySection'; 

const HomePage = () => {
  const navigate = useNavigate();
  const { getButtonConfig } = useButtonCustomization();

  return (
    <div className="bg-neutral-50 min-h-screen overflow-x-hidden font-sans">
      <Helmet>
        <title>Empathy Laser Clinic | Advanced Aesthetic Treatments Delhi</title>
        <meta name="description" content="Premier laser clinic in Delhi. Specialized in hair removal, coolsculpting, and skin rejuvenation with state-of-the-art technology." />
      </Helmet>

      {/* Hero Section with Parallax Effect */}
      <section className="relative w-full overflow-hidden z-0">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative h-full w-full"
        >
          <ImageSlider />
        </motion.div>
        
        {/* Organic Curve Bottom Mask */}
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-neutral-50 z-20 pointer-events-none" style={{ clipPath: "ellipse(70% 100% at 50% 100%)" }}></div>
      </section>

      {/* Welcome Message Section */}
      <div className="pt-8 md:pt-16 px-4">
        <WelcomeMessage />
      </div>

      {/* Intro Stats - Enhanced with Premium Components */}
      <section className="relative py-12 md:py-20 z-30 px-4">
        <div className="max-w-7xl mx-auto">
          <PremiumStatsSection stats={[
            { value: 15000, suffix: '+', label: 'Happy Clients', icon: '😊' },
            { value: 98, suffix: '%', label: 'Success Rate', icon: '⭐' },
            { value: 12, suffix: '+', label: 'Years Excellence', icon: '🏆' },
          ]} />
        </div>
      </section>

      {/* Reshape Your Body Section */}
      <ReshapeYourBodySection />

      {/* Featured Services Showcase */}
      <section className="relative py-20 md:py-32 overflow-hidden px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <EnhancedSectionHeader
            badge="🌟 Our Top Services"
            title="Advanced Aesthetic Solutions"
            subtitle="Cutting Edge Treatments"
            description="Experience transformative results with our state-of-the-art technology and expert practitioners"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Sparkles,
                title: 'Laser Hair Removal',
                description: 'Permanent hair removal with the latest diode laser technology for smooth, hair-free skin.',
                features: ['FDA Approved', '99.1% Effective', 'No Side Effects'],
                gradient: 'from-orange-400 to-red-500',
                badge: 'Most Popular'
              },
              {
                icon: Lightning,
                title: 'Body Sculpting',
                description: 'Non-invasive coolsculpting technology to eliminate stubborn fat and reshape your body.',
                features: ['Clinically Tested', 'Zero Downtime', 'Permanent Results'],
                gradient: 'from-red-400 to-pink-500',
                badge: 'Trending'
              },
              {
                icon: Shield,
                title: 'Skin Rejuvenation',
                description: 'Advanced laser treatments to restore skin vitality and achieve a youthful, glowing complexion.',
                features: ['Anti-Aging', 'Collagen Boost', 'Visible Results'],
                gradient: 'from-pink-400 to-orange-500',
              }
            ].map((service, idx) => (
              <PremiumServiceCard
                key={idx}
                delay={idx * 0.15}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                gradient={service.gradient}
                badge={service.badge}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Services Showcase - Replacing old Service Grid */}
      <ErrorBoundary>
        <AdvancedServicesShowcase />
      </ErrorBoundary>

      {/* Advanced Technology Section */}
      <AdvancedTechnologySection />

      {/* Follow Our Journey Section */}
      <FollowOurJourneySection />

      {/* Transformation/Video Section */}
      <ErrorBoundary>
        <TransformationSection />
      </ErrorBoundary>

      {/* Reviews - Enhanced */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading title="Client Stories" subtitle="Real experiences from our community" />
          <div className="mt-10 md:mt-12">
            <GoogleReviews limit={3} />
          </div>
        </div>
      </section>

      {/* Why Choose Us - Benefits Grid */}
      <BenefitsGrid
        title="Why Choose Empathy Clinic"
        benefits={[
          {
            icon: Shield,
            title: 'FDA Certified',
            description: 'All equipment is FDA-approved and internationally certified for safety and efficacy.',
            points: ['Latest Technology', 'Safety First', 'Certified Procedures']
          },
          {
            icon: Heart,
            title: 'Expert Team',
            description: 'Our dermatologists and technicians have 10+ years of experience in aesthetic treatments.',
            points: ['Board Certified', 'Continuous Training', 'Personalized Care']
          },
          {
            icon: Clock,
            title: 'Quick Results',
            description: 'See visible improvements in just 2-3 sessions with our advanced technology.',
            points: ['Fast Treatment', 'Minimal Downtime', 'Proven Results']
          },
          {
            icon: CheckCircle,
            title: '100% Safe',
            description: 'Zero side effects guaranteed. All procedures are non-invasive and gentle on skin.',
            points: ['No Downtime', 'Natural Results', 'Lifetime Support']
          },
          {
            icon: TrendingUp,
            title: 'Affordable Plans',
            description: 'Flexible payment options and package deals to fit your budget.',
            points: ['Monthly Plans', 'No Hidden Costs', 'Money-Back Guarantee']
          },
          {
            icon: Sparkles,
            title: 'Guaranteed Results',
            description: 'We stand by our treatments with a satisfaction guarantee or your money back.',
            points: ['Risk-Free', 'Satisfaction Guaranteed', 'Free Consultations']
          }
        ]}
        columns={3}
      />

      {/* Premium CTA Section */}
      <PremiumCTASection
        title="Ready to Transform Yourself?"
        subtitle="Your Journey to Confidence Starts Today"
        description="Join thousands of satisfied clients who have achieved their aesthetic goals. Book your free consultation now and discover the difference our advanced treatments can make."
        primaryButtonText="Book Free Consultation"
        secondaryButtonText="View Pricing"
        onPrimaryClick={() => navigate('/contact')}
        onSecondaryClick={() => navigate('/pricing')}
        variant="premium"
      />
    </div>
  );
};

export default HomePage;