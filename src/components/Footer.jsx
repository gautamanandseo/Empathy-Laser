import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, 
  Clock, Youtube, ArrowRight, ExternalLink 
} from 'lucide-react';
import { clinicData } from '@/constants/clinicData';
import { cn } from '@/lib/utils';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const SocialLink = ({ href, icon: Icon, color }) => (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 relative group overflow-hidden border border-white/5"
    >
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", color)} />
      <Icon className="w-5 h-5 text-white relative z-10" />
    </motion.a>
  );

  return (
    <footer className="relative bg-gradient-to-br from-neutral-900 to-neutral-950 text-white overflow-hidden">
      {/* Vibrant Gradient Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-[var(--color-vibrant-orange)] opacity-10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-blue-600 opacity-10 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16"
        >
          
          {/* Brand & Description */}
          <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
            <Link to="/" className="block inline-block">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="https://horizons-cdn.hostinger.com/f9cda7f1-8bc9-4fb8-a9ad-a1044f1605f0/cb34092bf3daee2c9e78d5b374803aae.png" 
                alt="Empathy Laser Clinic" 
                className="h-20 w-auto object-contain brightness-0 invert opacity-95"
              />
            </Link>
            <p className="text-neutral-300 leading-relaxed text-base font-light pr-4 max-w-sm">
              Rediscover yourself with our premium, medically-verified laser treatments. 
              Compassionate care meets advanced technology in the heart of Delhi.
            </p>
            <div className="flex gap-4">
              <SocialLink href={clinicData.social.facebook} icon={Facebook} color="bg-[#1877F2]" />
              <SocialLink href={clinicData.social.instagram} icon={Instagram} color="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]" />
              <SocialLink href={clinicData.social.twitter} icon={Twitter} color="bg-[#1DA1F2]" />
              <SocialLink href={clinicData.social.youtube} icon={Youtube} color="bg-[#FF0000]" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-playfair font-bold text-white relative inline-block">
              Explore
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[var(--color-vibrant-orange)] rounded-full" />
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about-us' },
                { name: 'Services', path: '/services' },
                { name: 'Testimonials', path: '/testimonials' },
                { name: 'Blog', path: '/blog' },
                { name: 'Pricing', path: '/pricing' },
                { name: 'Contact', path: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group py-1 min-h-[44px]">
                    <span className="w-1.5 h-1.5 bg-[var(--color-vibrant-orange)] rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

           {/* Services Links */}
           <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
             <h3 className="text-xl font-playfair font-bold text-white relative inline-block">
               Treatments
               <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[var(--color-vibrant-orange)] rounded-full" />
             </h3>
             <ul className="space-y-4">
               {[
                 { name: 'Laser Hair Removal', path: '/laser-hair-removal-delhi-ncr' },
                 { name: 'CoolSculpting', path: '/coolsculpting-delhi-ncr' },
                 { name: 'Acne Treatment', path: '/acne-treatment-delhi-ncr' },
                 { name: 'Skin Rejuvenation', path: '/skin-rejuvenation-delhi-ncr' },
                 { name: 'Tattoo Removal', path: '/tattoo-removal-delhi-ncr' }
               ].map((item) => (
                 <li key={item.name}>
                   <Link to={item.path} className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors group py-1 min-h-[44px]">
                      <ArrowRight className="w-4 h-4 text-[var(--color-vibrant-orange)] opacity-70 group-hover:translate-x-1 transition-transform" />
                      {item.name}
                   </Link>
                 </li>
               ))}
             </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
             <h3 className="text-xl font-playfair font-bold text-white relative inline-block">
               Visit Us
               <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[var(--color-vibrant-orange)] rounded-full" />
             </h3>
             <ul className="space-y-6">
               <li className="flex gap-4 items-start group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover:bg-[var(--color-vibrant-orange)] transition-colors">
                   <MapPin className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                 </div>
                 <span className="text-neutral-400 leading-relaxed text-sm">{clinicData.address.full}</span>
               </li>
               <li className="flex gap-4 items-center group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-vibrant-orange)] transition-colors">
                   <Phone className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                 </div>
                 <a href={`tel:${clinicData.phone.value}`} className="text-neutral-400 hover:text-white transition-colors font-medium min-h-[44px] flex items-center">{clinicData.phone.display}</a>
               </li>
               <li className="flex gap-4 items-center group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-vibrant-orange)] transition-colors">
                   <Mail className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                 </div>
                 <a href={`mailto:${clinicData.email}`} className="text-neutral-400 hover:text-white transition-colors break-all min-h-[44px] flex items-center">{clinicData.email}</a>
               </li>
               <li className="flex gap-4 items-start group">
                 <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover:bg-[var(--color-vibrant-orange)] transition-colors">
                   <Clock className="w-5 h-5 text-neutral-300 group-hover:text-white" />
                 </div>
                 <span className="text-neutral-400 leading-relaxed text-sm pt-2">10:00 AM – 7:00 PM (Tue-Sun)</span>
               </li>
             </ul>
          </motion.div>
        </motion.div>

        {/* Map & Copyright */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="border-t border-white/10 pt-10 mt-10"
        >
            <div className="bg-neutral-800/50 rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-[250px] w-full mb-10 relative group">
               <iframe 
                 src={clinicData.mapEmbedUrl}
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                 title="Clinic Location"
               ></iframe>
               <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 Interact with map <ExternalLink className="w-3 h-3" />
               </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500 font-light">
              <p>&copy; {currentYear} {clinicData.name}. All rights reserved.</p>
              <div className="flex gap-8">
                <Link to="/privacy" className="hover:text-[var(--color-vibrant-orange)] transition-colors min-h-[44px] flex items-center">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-[var(--color-vibrant-orange)] transition-colors min-h-[44px] flex items-center">Terms of Service</Link>
              </div>
            </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;