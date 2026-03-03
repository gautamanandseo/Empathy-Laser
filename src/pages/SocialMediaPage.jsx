import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import InstagramFeed from '@/components/InstagramFeed';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

const SocialMediaPage = () => {
  const socialChannels = [
    {
      name: 'Instagram',
      icon: Instagram,
      handle: '@empathylaserclinic',
      link: 'https://www.instagram.com/empathylaserclinic/',
      color: 'bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600',
      description: 'Follow for daily skin tips, before & afters, and exclusive stories.',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      handle: 'Empathy Laser Clinic',
      link: '#',
      color: 'bg-blue-600',
      description: 'Join our community, read reviews, and stay updated on events.',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      handle: '@EmpathyLaser',
      link: '#',
      color: 'bg-sky-500',
      description: 'Quick updates, flash sales announcements, and industry news.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Social Media | Empathy Laser Clinic - Follow Our Journey</title>
        <meta name="description" content="Connect with Empathy Laser Clinic on social media. Follow us on Instagram, Facebook, and Twitter for skin tips, offers, and more." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-16 red-gradient">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Connect With Us
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join our growing community and stay inspired
          </p>
        </motion.div>
      </section>

      {/* Social Channels Grid */}
      <section className="py-20 bg-[var(--bg-gray)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {socialChannels.map((channel, index) => (
              <motion.div
                key={channel.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full ${channel.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                    <channel.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-1">{channel.name}</h3>
                  <p className="text-[var(--primary-red)] font-medium mb-4">{channel.handle}</p>
                  <p className="text-[var(--text-light)] mb-6 flex-grow">{channel.description}</p>
                  <Button 
                    className="w-full bg-[var(--text-dark)] text-white hover:bg-[var(--primary-red)]"
                    onClick={() => window.open(channel.link, '_blank')}
                  >
                    Follow Us <ExternalLink className="ml-2 w-4 h-4" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Latest from Instagram" 
            subtitle="A glimpse into our clinic, treatments, and happy clients"
          />
          <InstagramFeed />
        </div>
      </section>
    </>
  );
};

export default SocialMediaPage;