import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const menuRef = useRef(null);
  
  // Dynamic Services State
  const [services, setServices] = useState([]);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

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

  useEffect(() => { setIsOpen(false); setServicesDropdownOpen(false); }, [location]);

  // Main Links (could also be dynamic, but currently requested Services is the focus)
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        scrolled 
          ? "py-3 bg-white/90 backdrop-blur-xl border-b border-red-100/20 shadow-lg shadow-red-900/5" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          <Link to="/" className="flex items-center gap-2 group relative z-50">
            <motion.div 
               whileHover={{ scale: 1.05 }} 
               whileTap={{ scale: 0.95 }}
            >
              <img 
                src="https://horizons-cdn.hostinger.com/f9cda7f1-8bc9-4fb8-a9ad-a1044f1605f0/cb34092bf3daee2c9e78d5b374803aae.png" 
                alt="Empathy Laser Clinic" 
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white/40 shadow-sm">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.path}
                    className="relative group"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={cn(
                        "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1",
                        location.pathname.startsWith(item.path)
                          ? "text-[var(--primary-red)] font-bold shadow-sm bg-white"
                          : "text-neutral-600 hover:text-[var(--primary-red)] hover:bg-white/50"
                      )}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </Link>

                    {/* Desktop Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden py-2 z-50"
                        >
                          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                             {services.map((service) => (
                               <Link
                                 key={service.slug}
                                 to={`/services/${service.slug}`} // Assuming service slug is just the suffix or full path
                                 className="block px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[var(--primary-red)] transition-colors border-b border-gray-50 last:border-0"
                               >
                                 {service.title}
                               </Link>
                             ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    location.pathname === item.path
                      ? "text-[var(--primary-red)] font-bold shadow-sm bg-white"
                      : "text-neutral-600 hover:text-[var(--primary-red)] hover:bg-white/50"
                  )}
                >
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
             {user && (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}

            <Link to="/contact">
              <Button 
                className={cn(
                  "rounded-full px-8 h-11 font-semibold text-sm shadow-lg shadow-red-500/20",
                  "bg-[var(--primary-red)] hover:bg-[var(--primary-red-dark)] text-white",
                  "transition-all duration-300 hover:scale-105 active:scale-95"
                )}
              >
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200 shadow-sm text-neutral-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[90]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[100] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-neutral-100">
                 <span className="font-playfair font-bold text-xl text-neutral-900">Menu</span>
                 <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                    <X className="w-6 h-6 text-neutral-500" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((item) => (
                  <div key={item.path}>
                    <div className="flex items-center justify-between">
                         <Link
                            to={item.path}
                            onClick={() => !item.hasDropdown && setIsOpen(false)}
                            className={cn(
                              "flex-1 px-4 py-4 rounded-2xl text-base font-medium transition-all duration-200 flex items-center justify-between",
                              location.pathname === item.path
                                ? "bg-red-50 text-[var(--primary-red)] border border-red-100" 
                                : "text-neutral-600 hover:bg-neutral-50"
                            )}
                          >
                            {item.name}
                            {!item.hasDropdown && <ChevronRight className="w-4 h-4 opacity-50" />}
                          </Link>
                          {item.hasDropdown && (
                             <button 
                               onClick={(e) => { e.preventDefault(); setServicesDropdownOpen(!servicesDropdownOpen); }}
                               className="p-4 rounded-2xl hover:bg-neutral-100 ml-1"
                             >
                                <ChevronDown className={cn("w-4 h-4 transition-transform", servicesDropdownOpen && "rotate-180")} />
                             </button>
                          )}
                    </div>

                    {/* Mobile Submenu */}
                    {item.hasDropdown && (
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="overflow-hidden pl-4 border-l-2 border-red-50 ml-6 mt-1 space-y-1"
                          >
                             {services.map((service) => (
                                <Link
                                   key={service.slug}
                                   to={`/services/${service.slug}`}
                                   onClick={() => setIsOpen(false)}
                                   className="block px-4 py-3 text-sm text-gray-600 hover:text-[var(--primary-red)] rounded-xl hover:bg-neutral-50"
                                >
                                   {service.title}
                                </Link>
                             ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-neutral-50 border-t border-neutral-100">
                  <Link to="/contact" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-[var(--primary-red)] hover:bg-[var(--primary-red-dark)] text-white rounded-xl py-6 font-bold shadow-lg shadow-red-200">
                        Book Consultation
                    </Button>
                  </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;