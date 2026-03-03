import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldCheck, LogOut, ChevronDown, ChevronRight, Home, User, Star, FileText, Phone, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';

const Navigation3D = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); 
  const [servicesHover, setServicesHover] = useState(false); 
  
  const [services, setServices] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
     const fetchServices = async () => {
       const { data } = await supabase
         .from('services')
         .select('title, slug')
         .order('order', { ascending: true });
       if (data) setServices(data);
     };
     fetchServices();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setServicesOpen(false); }, [location]);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navClasses = cn(
    "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
    scrolled 
      ? "py-3 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-md" 
      : "py-4 md:py-6 bg-gradient-to-b from-black/60 to-transparent"
  );

  const menuButtonVariants = {
    rest: {
      scale: 1,
      y: 0,
      backgroundColor: scrolled ? "transparent" : "rgba(0,0,0,0.2)",
      color: scrolled ? "#1f2937" : "#ffffff",
    },
    hover: {
      scale: 1.05,
      y: -2,
      backgroundColor: scrolled ? "rgba(255, 87, 34, 0.05)" : "rgba(255, 255, 255, 0.2)",
      color: scrolled ? "#FF5722" : "#ffffff",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const mainNavItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about-us', icon: User },
    { name: 'Testimonials', path: '/testimonials', icon: Star },
    { name: 'Blog', path: '/blog', icon: FileText },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <motion.div 
               whileHover={{ scale: 1.05 }} 
               transition={{ duration: 0.3 }}
               className="bg-white/10 rounded-lg p-1 backdrop-blur-sm"
            >
              <img 
                src="https://horizons-cdn.hostinger.com/f9cda7f1-8bc9-4fb8-a9ad-a1044f1605f0/cb34092bf3daee2c9e78d5b374803aae.png" 
                alt="Empathy Laser Clinic" 
                className={cn(
                  "h-8 md:h-10 w-auto object-contain transition-all duration-300 drop-shadow-md",
                  scrolled ? "" : "brightness-0 invert"
                )}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link to="/">
               <motion.div variants={menuButtonVariants} initial="rest" whileHover="hover" animate="rest" className={cn("px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 backdrop-blur-[2px]", location.pathname === '/' && scrolled ? "text-[var(--color-vibrant-orange)] bg-orange-50" : "text-current")}>
                 Home
               </motion.div>
            </Link>
            <Link to="/about-us">
               <motion.div variants={menuButtonVariants} initial="rest" whileHover="hover" animate="rest" className={cn("px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 backdrop-blur-[2px]", location.pathname === '/about-us' && scrolled ? "text-[var(--color-vibrant-orange)] bg-orange-50" : "text-current")}>
                 About Us
               </motion.div>
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesHover(true)}
              onMouseLeave={() => setServicesHover(false)}
            >
                <Link to="/services">
                  <motion.div
                     initial="rest"
                     whileHover="hover"
                     animate="rest"
                     variants={menuButtonVariants}
                     className={cn(
                       "px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 backdrop-blur-[2px] cursor-pointer flex items-center gap-1",
                       servicesHover && scrolled && "bg-orange-50 text-[var(--color-vibrant-orange)]",
                       servicesHover && !scrolled && "bg-white/30 text-white"
                     )}
                   >
                     Services <ChevronDown className="w-4 h-4" />
                   </motion.div>
                </Link>
                 
                 <AnimatePresence>
                   {servicesHover && (
                     <motion.div
                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
                       animate={{ opacity: 1, y: 0, scale: 1 }}
                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
                       transition={{ duration: 0.2 }}
                       className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden py-2"
                     >
                       {/* Hardcode "All Services" at top */}
                       <Link 
                           to="/services"
                           className="block px-6 py-3 text-sm font-bold text-gray-900 hover:bg-orange-50 hover:text-[var(--color-vibrant-orange)] transition-colors border-b border-gray-100"
                       >
                           View All Services
                       </Link>
                       <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                           {services.map((service) => (
                             <Link 
                               key={service.slug} 
                               to={`/services/${service.slug}`}
                               className="block px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[var(--color-vibrant-orange)] transition-colors flex items-center justify-between group"
                             >
                               {service.title}
                               <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                             </Link>
                           ))}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
            </div>

            <Link to="/testimonials">
               <motion.div variants={menuButtonVariants} initial="rest" whileHover="hover" animate="rest" className={cn("px-4 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 backdrop-blur-[2px]", location.pathname === '/testimonials' && scrolled ? "text-[var(--color-vibrant-orange)] bg-orange-50" : "text-current")}>
                 Testimonials
               </motion.div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
             {user ? (
               <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm p-1 rounded-full border border-gray-200 shadow-sm">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
               </div>
            ) : null}

            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-full px-8 h-12 text-sm font-bold tracking-wide transition-all duration-300",
                  "bg-gradient-to-r from-[var(--color-vibrant-orange)] to-[var(--color-accent-orange)] text-white shadow-lg shadow-orange-500/30",
                  "border border-white/20 backdrop-blur-sm flex items-center justify-center whitespace-nowrap hover:shadow-orange-500/50"
                )}
              >
                Book Now
              </motion.button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-3 rounded-full transition-colors backdrop-blur-md active:scale-95 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center",
                scrolled 
                  ? "text-gray-900 bg-gray-100/80" 
                  : "text-white bg-black/20 border border-white/20"
              )}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[90] flex flex-col pt-24 px-6 overflow-y-auto"
          >
             <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-3 rounded-full bg-gray-100 text-gray-900 shadow-md hover:bg-gray-200 min-w-[48px] min-h-[48px] flex items-center justify-center"
                aria-label="Close menu"
             >
                <X className="w-6 h-6" />
             </button>

             <div className="flex flex-col space-y-2 pb-20">
                <div className="pb-6">
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">Navigation</p>
                   {mainNavItems.map((item, idx) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300 min-h-[64px]"
                        >
                            <span className="flex items-center gap-4 text-2xl font-bold text-gray-900 group-hover:text-[var(--color-vibrant-orange)]">
                               <item.icon className="w-6 h-6 text-gray-400 group-hover:text-[var(--color-vibrant-orange)] transition-colors" />
                               {item.name}
                            </span>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-vibrant-orange)] transition-colors" />
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Mobile Services Accordion */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2"
                    >
                        <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-orange-50 transition-all duration-300 min-h-[64px]"
                        >
                            <span className="flex items-center gap-4 text-2xl font-bold text-gray-900 group-hover:text-[var(--color-vibrant-orange)]">
                               <Zap className="w-6 h-6 text-gray-400 group-hover:text-[var(--color-vibrant-orange)] transition-colors" />
                               Services
                            </span>
                            <ChevronDown className={cn("w-6 h-6 text-gray-300 transition-transform duration-300", servicesOpen && "rotate-180 text-[var(--color-vibrant-orange)]")} />
                        </button>
                        <AnimatePresence>
                           {servicesOpen && (
                             <motion.div
                               initial={{ height: 0, opacity: 0 }}
                               animate={{ height: 'auto', opacity: 1 }}
                               exit={{ height: 0, opacity: 0 }}
                               className="overflow-hidden ml-4 pl-4 border-l-2 border-orange-100"
                             >
                                <Link 
                                     to="/services"
                                     onClick={() => setIsOpen(false)}
                                     className="block py-4 text-lg font-bold text-gray-900 hover:text-[var(--color-vibrant-orange)] min-h-[56px] flex items-center border-b border-gray-50"
                                   >
                                     View All Services
                                </Link>
                                {services.map(service => (
                                   <Link 
                                     key={service.slug}
                                     to={`/services/${service.slug}`}
                                     onClick={() => setIsOpen(false)}
                                     className="block py-4 text-lg font-medium text-gray-600 hover:text-[var(--color-vibrant-orange)] min-h-[56px] flex items-center"
                                   >
                                     {service.title}
                                   </Link>
                                ))}
                             </motion.div>
                           )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {user && (
                   <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 p-6 rounded-3xl mt-4"
                   >
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Account</p>
                     <Link
                         to="/admin/dashboard"
                         onClick={() => setIsOpen(false)}
                         className="flex items-center gap-3 text-lg font-bold text-blue-600 mb-4 min-h-[44px]"
                     >
                        <ShieldCheck className="w-5 h-5"/> Admin Dashboard
                     </Link>
                     <button
                         onClick={() => { handleLogout(); setIsOpen(false); }}
                         className="flex items-center gap-3 text-lg font-bold text-red-500 min-h-[44px]"
                     >
                        <LogOut className="w-5 h-5"/> Logout
                     </button>
                   </motion.div>
                )}
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-4"
                >
                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-[var(--color-vibrant-orange)] to-[var(--color-accent-orange)] text-white hover:opacity-90 rounded-2xl h-16 text-xl font-bold shadow-xl shadow-orange-200">
                            Book Consultation
                        </Button>
                    </Link>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation3D;