import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Loader2, MessageCircle, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { clinicData } from '@/constants/clinicData';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Message Sent",
      description: "We'll get back to you shortly.",
      className: "bg-green-50 text-green-800"
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setLoading(false);
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Contact Us | Empathy Laser Clinic</title>
        <meta name="description" content="Book an appointment at Empathy Laser Clinic. Contact us via phone, email, or visit our clinic in Delhi." />
      </Helmet>

      {/* Hero Header */}
      <section className="pt-32 pb-12 px-6 bg-gray-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             className="text-5xl md:text-6xl font-playfair font-bold text-neutral-900 mb-6"
           >
             Get in Touch
           </motion.h1>
           <p className="text-xl text-neutral-500 font-light max-w-2xl mx-auto">
             We're here to answer your questions and help you start your journey to confidence.
           </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left: Clinic Card Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="space-y-8"
            >
              <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden relative group transition-all hover:shadow-2xl">
                 {/* Decorative background element */}
                 <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--primary-red)]/5 rounded-bl-[120px] -z-0 transition-transform duration-500 group-hover:scale-110" />

                 {/* Header: Logo & Name */}
                 <div className="flex items-center gap-5 mb-8 relative z-10">
                    <div className="w-16 h-16 bg-black rounded-xl p-2 flex items-center justify-center shadow-lg">
                      <img 
                        src="https://horizons-cdn.hostinger.com/f9cda7f1-8bc9-4fb8-a9ad-a1044f1605f0/cb34092bf3daee2c9e78d5b374803aae.png" 
                        alt="Empathy Laser Clinic" 
                        className="w-full h-full object-contain brightness-0 invert" 
                      />
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold font-playfair text-gray-900 leading-tight">{clinicData.name}</h3>
                       <div className="flex items-center gap-1 mt-1">
                          <div className="flex">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-500 ml-2">4.9 (500+ Reviews)</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="h-px w-full bg-gray-100 mb-8" />

                 {/* Details List */}
                 <div className="space-y-6 relative z-10">
                    {/* Address */}
                    <div className="flex gap-5 group/item">
                       <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 text-[var(--primary-red)] group-hover/item:scale-110 transition-transform">
                          <MapPin className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Visit Us Today</p>
                          <p className="text-gray-600 text-sm leading-relaxed max-w-[300px]">{clinicData.address.full}</p>
                       </div>
                    </div>

                    {/* Hours */}
                    <div className="flex gap-5 group/item">
                       <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover/item:scale-110 transition-transform">
                          <Clock className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Opening Hours</p>
                          <p className="text-gray-600 text-sm font-medium">Tue - Sun: 10:00 AM – 7:00 PM</p>
                          <p className="text-gray-400 text-xs mt-1">Monday: Closed</p>
                       </div>
                    </div>
                    
                    {/* Phone */}
                    <div className="flex gap-5 group/item">
                       <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600 group-hover/item:scale-110 transition-transform">
                          <Phone className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Call Us</p>
                          <a href={`tel:${clinicData.phone.value}`} className="text-gray-600 text-lg font-semibold hover:text-[var(--primary-red)] transition-colors block">
                             {clinicData.phone.display}
                          </a>
                       </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-5 group/item">
                       <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0 text-purple-600 group-hover/item:scale-110 transition-transform">
                          <Mail className="w-6 h-6" />
                       </div>
                       <div>
                          <p className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Email Us</p>
                          <a href={`mailto:${clinicData.email}`} className="text-gray-600 text-sm font-medium hover:text-[var(--primary-red)] transition-colors break-all block">
                             {clinicData.email}
                          </a>
                       </div>
                    </div>
                 </div>
              </div>

              <Button 
                onClick={() => window.open(clinicData.whatsapp.link)} 
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl py-6 text-lg font-bold shadow-lg shadow-green-200 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <MessageCircle className="mr-2 w-6 h-6" /> Chat on WhatsApp
              </Button>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-neutral-200/50 border border-neutral-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[100px] -z-0" />
              
              <h2 className="text-2xl font-bold mb-8 relative z-10">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Full Name</label>
                  <input 
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[var(--primary-red)] focus:border-transparent outline-none transition-all bg-gray-50" 
                    placeholder="John Doe" 
                    value={formData.name} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[var(--primary-red)] focus:border-transparent outline-none transition-all bg-gray-50" 
                      placeholder="john@example.com" 
                      value={formData.email} 
                      onChange={e => setFormData({ ...formData, email: e.target.value })} 
                    />
                   </div>
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">Phone</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[var(--primary-red)] focus:border-transparent outline-none transition-all bg-gray-50" 
                      placeholder="+91 98765 43210" 
                      value={formData.phone} 
                      onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                    />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">Message</label>
                  <textarea 
                    required 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-[var(--primary-red)] focus:border-transparent outline-none transition-all resize-none bg-gray-50" 
                    placeholder="How can we help you?" 
                    value={formData.message} 
                    onChange={e => setFormData({ ...formData, message: e.target.value })} 
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-[var(--primary-red)] hover:bg-[var(--primary-red-dark)] text-white rounded-xl py-6 font-bold shadow-lg shadow-red-200 hover:shadow-xl transition-all"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4 font-playfair">Find Us on Map</h2>
               <p className="text-gray-500">Conveniently located in Pitampura, New Delhi</p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[450px] w-full relative group">
               <iframe 
                 src={clinicData.mapEmbedUrl}
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="grayscale group-hover:grayscale-0 transition-all duration-700"
                 title="Clinic Location Map"
               ></iframe>
               
               <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <h4 className="font-bold text-gray-900 mb-2">Get Directions</h4>
                  <p className="text-xs text-gray-600 mb-4">{clinicData.address.full}</p>
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinicData.address.full)}`, '_blank')}>
                    Open Google Maps
                  </Button>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;