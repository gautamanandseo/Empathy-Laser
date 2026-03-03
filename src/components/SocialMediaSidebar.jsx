import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, MessageCircle } from 'lucide-react';
import { clinicData } from '@/constants/clinicData';

const SocialMediaSidebar = () => {
  const socialLinks = [
    { 
      icon: MessageCircle, 
      href: clinicData.whatsapp.link, 
      label: 'WhatsApp',
      color: 'bg-[#25D366]',
      hoverColor: 'hover:bg-[#20bd5a]'
    },
    { 
      icon: Facebook, 
      href: clinicData.social.facebook, 
      label: 'Facebook',
      color: 'bg-[#3b5998]',
      hoverColor: 'hover:bg-[#2d4373]'
    },
    { 
      icon: Instagram, 
      href: clinicData.social.instagram, 
      label: 'Instagram',
      color: 'bg-[#E1306C]',
      hoverColor: 'hover:bg-[#c1275d]'
    },
    { 
      icon: Twitter, 
      href: clinicData.social.twitter, 
      label: 'Twitter',
      color: 'bg-[#1DA1F2]',
      hoverColor: 'hover:bg-[#1a91da]'
    },
    { 
      icon: Youtube, 
      href: clinicData.social.youtube, 
      label: 'YouTube',
      color: 'bg-[#FF0000]',
      hoverColor: 'hover:bg-[#cc0000]'
    }
  ];

  // Hidden on small screens (<640px) to avoid clutter
  return (
    <div className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-2">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 45 }}
          whileHover={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className={`
            flex items-center gap-3 pl-3 pr-4 py-3.5 rounded-l-xl shadow-lg text-white
            ${social.color} ${social.hoverColor} transition-colors
            w-12 hover:w-44 overflow-hidden whitespace-nowrap group
            min-h-[48px] // Ensure large touch target
          `}
          title={social.label}
        >
          <social.icon className="w-6 h-6 flex-shrink-0" />
          <span className="font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {social.label}
          </span>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialMediaSidebar;