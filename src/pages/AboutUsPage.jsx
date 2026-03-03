import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Component Imports
import AboutUsHeroSection from '@/components/AboutUsHeroSection';
import AboutUsNewSection from '@/components/AboutUsNewSection';
import ValuesSection from '@/components/ValuesSection';
import TeamMembersSection from '@/components/TeamMembersSection';
import CredentialsSection from '@/components/CredentialsSection';

const AboutUsPage = () => {
  // Page load logging
  useEffect(() => {
    console.log('AboutUsPage mounted. Components should be rendering below.');
  }, []);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <Helmet>
        <title>About Us | Empathy Laser Clinic</title>
        <meta name="description" content="Discover our story, values, and the expert team dedicated to your aesthetic journey." />
      </Helmet>

      {/* Hero Section */}
      <AboutUsHeroSection />
      
      {/* Intro / New Section */}
      <AboutUsNewSection />
      
      {/* Visual Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-3/4 mx-auto my-0" />

      {/* Values Section */}
      <div id="values-container" className="min-h-[300px]">
         <ValuesSection />
      </div>
      
      {/* Visual Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent w-3/4 mx-auto my-0" />

      {/* Team Members Section */}
      <div id="team-container" className="min-h-[400px]">
         <TeamMembersSection />
      </div>
      
      {/* Credentials Section */}
      <div id="credentials-container">
         <CredentialsSection />
      </div>

      {/* Final CTA */}
      <section className="py-20 text-white text-center" style={{ backgroundColor: 'var(--primary-red)' }}>
         <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-6">Start Your Journey Today</h2>
            <p className="text-lg md:text-xl opacity-90 mb-10">Experience the perfect blend of science and art at Empathy Laser Clinic.</p>
            <Link to="/contact">
               <Button className="bg-white text-[var(--primary-red)] hover:bg-gray-100 px-10 py-6 rounded-full text-lg font-bold shadow-xl transition-all hover:scale-105">
                  Book Your Appointment
               </Button>
            </Link>
         </div>
      </section>
    </div>
  );
};

export default AboutUsPage;