import React from 'react';
import { Star, MapPin, Phone, Clock, Globe, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const GoogleBusinessProfile = ({ className }) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden", className)}>
      <div className="bg-[#D32F2F] p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
           <img 
            src="https://horizons-cdn.hostinger.com/f9cda7f1-8bc9-4fb8-a9ad-a1044f1605f0/cb34092bf3daee2c9e78d5b374803aae.png" 
            alt="Empathy Laser Clinic Logo" 
            className="w-10 h-10 object-contain bg-white rounded-full p-1"
          />
          <div>
            <h3 className="font-bold text-lg leading-tight">Empathy Laser Clinic</h3>
            <p className="text-xs text-white/90">Medical Spa & Laser Treatment Center</p>
          </div>
        </div>
        <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <span className="font-bold text-lg">4.9</span>
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
          <p className="text-[10px] text-center">250+ reviews</p>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-3 text-sm text-[var(--text-light)]">
          <MapPin className="w-5 h-5 text-[var(--primary-red)] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[var(--text-dark)]">Address</p>
            <a 
              href="https://maps.google.com/?q=Empathy+Laser+Clinic" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[var(--primary-red)] transition-colors"
            >
              123 Beauty Avenue, Suite 200<br />
              Los Angeles, CA 90001
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-[var(--text-light)]">
          <Clock className="w-5 h-5 text-[var(--primary-red)] shrink-0 mt-0.5" />
          <div>
             <p className="font-medium text-[var(--text-dark)]">Hours</p>
             <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-1">
               <span>Mon - Fri:</span>
               <span className="text-right">9:00 AM - 7:00 PM</span>
               <span>Saturday:</span>
               <span className="text-right">10:00 AM - 5:00 PM</span>
               <span>Sunday:</span>
               <span className="text-right">Closed</span>
             </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-[var(--text-light)]">
          <Phone className="w-5 h-5 text-[var(--primary-red)] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-[var(--text-dark)]">Phone</p>
            <a href="tel:+13235550199" className="hover:text-[var(--primary-red)] transition-colors">
              (323) 555-0199
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 text-sm text-[var(--text-light)]">
          <Globe className="w-5 h-5 text-[var(--primary-red)] shrink-0 mt-0.5" />
          <div>
             <p className="font-medium text-[var(--text-dark)]">Website</p>
             <a href="/" className="hover:text-[var(--primary-red)] transition-colors">
               empathylaserclinic.com
             </a>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 border-[var(--primary-red)] text-[var(--primary-red)] hover:bg-[var(--light-red)]"
            onClick={() => window.open('https://share.google/RdPKCwXzESkgHi8Jn', '_blank')}
          >
            Read Reviews
          </Button>
          <Button 
            className="flex-1 bg-[var(--primary-red)] text-white hover:bg-[var(--dark-red)]"
            onClick={() => window.open('https://share.google/RdPKCwXzESkgHi8Jn', '_blank')}
          >
            Write Review <ExternalLink className="ml-2 w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoogleBusinessProfile;