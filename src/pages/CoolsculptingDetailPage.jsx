import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle2, Activity, Ban, MessageCircle, ChevronRight, Home, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { clinicData } from '@/constants/clinicData';
import SectionHeading from '@/components/ui/SectionHeading';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';

const CoolsculptingDetailPage = () => {
  const steps = [
    { title: "Consultation", desc: "We map out your unique body contours." },
    { title: "Application", desc: "Applicator is placed, delivering controlled cooling." },
    { title: "Freezing", desc: "Fat cells are frozen (crystallized) and die." },
    { title: "Elimination", desc: "Body naturally processes and removes dead cells." }
  ];

  const comparisons = [
    { feature: "Invasiveness", cool: "Non-Invasive", lipo: "Surgical" },
    { feature: "Downtime", cool: "None", lipo: "Weeks" },
    { feature: "Anesthesia", cool: "None", lipo: "Required" },
    { feature: "Scars", cool: "None", lipo: "Possible" },
    { feature: "Results Speed", cool: "1-3 Months", lipo: "Immediate/Weeks" },
    { feature: "Side Effects", cool: "Mild/Temporary", lipo: "Bruising/Swelling" },
  ];

  return (
    <>
      <Helmet>
        <title>Coolsculpting in Delhi | Non-Invasive Fat Reduction | Empathy Clinic</title>
        <meta name="description" content="Discover Coolsculpting at Empathy Laser Clinic. FDA-cleared fat freezing technology. No surgery, no downtime, lasting results. Book your assessment." />
        <meta name="keywords" content="Coolsculpting Delhi, cryolipolysis, fat freezing, body contouring" />
      </Helmet>

      <div className="bg-white min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 py-4 fixed top-16 left-0 right-0 z-30 shadow-sm apple-3d-card rounded-none">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[var(--primary-red)] transition-colors"><Home className="w-4 h-4" /></Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-[var(--primary-red)] transition-colors">Machines</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-[var(--primary-red)]">CoolSculpting</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden mt-10 apple-3d-container">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B4A75] via-[#1167A3] to-[#0A3D63]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 text-white">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 font-semibold text-sm mb-8 tracking-wider uppercase apple-3d-button">
                #1 Non-Invasive Fat Reduction
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight font-playfair drop-shadow-lg">
                Freeze Away Fat with <span className="text-[#89CFF0] inline-block relative">
                  CoolSculpting
                  <svg className="absolute w-full h-3 -bottom-1 left-0" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C2.00025 6.99997 55.4925 1.0001 98.4975 1.0001C141.502 1.0001 198.005 6.99997 198.005 6.99997" stroke="#89CFF0" strokeWidth="3" strokeLinecap="round"/></svg>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-10 leading-relaxed font-light drop-shadow-md">
                Reshape your body without surgery or downtime. The CoolSculpting® procedure is FDA-cleared for the treatment of visible fat bulges.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5">
                <Button 
                  onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
                  size="lg" 
                  className="bg-white text-[#0B4A75] hover:bg-gray-50 rounded-full px-10 py-7 text-lg shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 font-bold apple-3d-button"
                >
                  <MessageCircle className="mr-2 w-5 h-5" /> Free Assessment
                </Button>
                <Button 
                  onClick={() => document.getElementById('science').scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg" 
                  className="rounded-full px-10 py-7 text-lg bg-transparent border-white text-white hover:bg-white/10 backdrop-blur-sm apple-3d-button"
                >
                  How It Works
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-center"
            >
               <div className="relative z-10 p-4 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl apple-3d-card">
                 <img 
                    src="https://images.unsplash.com/photo-1584125745132-70a68c999820?auto=format&fit=crop&q=80&w=800" 
                    alt="Coolsculpting Results" 
                    className="w-full max-w-md rounded-2xl shadow-lg"
                 />
                 <div className="absolute -bottom-6 -right-6 bg-white text-[#0B4A75] p-4 rounded-xl shadow-xl font-bold text-center apple-3d-card">
                   <span className="block text-3xl">25%</span>
                   <span className="text-sm uppercase tracking-wide">Fat Reduction</span>
                 </div>
               </div>
            </motion.div>
          </div>
        </section>

        {/* Science Section */}
        <section id="science" className="py-24 bg-[#F0F9FF] apple-3d-container">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-[#0B4A75] font-bold tracking-widest uppercase text-sm mb-3 block">Technology</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-playfair">The Science of Cryolipolysis</h2>
              <p className="text-gray-600 text-lg">
                Fat cells freeze at higher temperatures than surrounding tissues. CoolSculpting technology safely delivers precisely controlled cooling to gently and effectively target the fat cells underneath the skin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 relative group overflow-hidden border border-blue-50 apple-3d-card">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#0B4A75] transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300" />
                  <div className="w-12 h-12 bg-blue-50 text-[#0B4A75] rounded-xl flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-[#0B4A75] group-hover:text-white transition-colors apple-3d-button border-none">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0B4A75] transition-colors">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-24 bg-white apple-3d-container">
          <div className="max-w-6xl mx-auto px-4">
             <SectionHeading 
               title="CoolSculpting vs. Liposuction"
               subtitle="Compare the key differences to decide which body contouring option is right for you"
             />
             
             <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-2xl mt-12 apple-3d-card">
               <table className="w-full text-left border-collapse min-w-[600px]">
                 <thead>
                   <tr className="bg-gradient-to-r from-[var(--primary-red)] to-[var(--dark-red)] text-white">
                     <th className="p-6 border-b border-white/10 text-center font-bold text-lg w-1/3 font-playfair">Feature</th>
                     <th className="p-6 border-b border-white/10 text-center font-bold text-lg w-1/3 font-playfair bg-white/10">CoolSculpting</th>
                     <th className="p-6 border-b border-white/10 text-center font-bold text-lg w-1/3 font-playfair">Liposuction</th>
                   </tr>
                 </thead>
                 <tbody>
                   {comparisons.map((row, i) => (
                     <tr key={i} className={`transition-colors hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]"}`}>
                       <td className="p-5 border-b border-gray-100 text-center font-bold text-gray-900">{row.feature}</td>
                       <td className="p-5 border-b border-gray-100 text-center text-[#0B4A75] font-bold bg-blue-50/30">
                         <div className="flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" /> {row.cool}
                         </div>
                       </td>
                       <td className="p-5 border-b border-gray-100 text-center text-gray-500">
                         <div className="flex items-center justify-center gap-2">
                            {row.lipo.includes("Required") || row.lipo.includes("Surgical") ? <Activity className="w-5 h-5 flex-shrink-0 text-orange-400" /> : <Ban className="w-5 h-5 flex-shrink-0" />} {row.lipo}
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </section>

        {/* Before & After Results (Updated Layout) */}
        <section className="py-16 bg-gray-50 apple-3d-container">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading 
              title="Real Results from Our Patients" 
              subtitle="Browse our patient gallery to see the transformative power of CoolSculpting across different body areas."
            />
            <div className="mt-12">
              <BeforeAfterGallery />
            </div>
            
            <div className="mt-12 text-center">
              <Button 
                onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
                className="bg-[var(--primary-red)] hover:bg-[var(--dark-red)] text-white text-lg px-10 py-6 rounded-full shadow-xl apple-3d-button flex items-center justify-center gap-2 mx-auto"
              >
                <Calendar className="w-5 h-5" /> Schedule Your Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-[#0B4A75] to-black text-white overflow-hidden relative apple-3d-container">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
           
           <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
             <div>
               <h2 className="text-4xl md:text-5xl font-bold mb-8 font-playfair">Treatable Areas</h2>
               <p className="text-gray-300 mb-10 text-lg leading-relaxed">
                 CoolSculpting is FDA-cleared to treat 9 different areas of the body where stubborn fat tends to linger. We create a customized plan to map your body.
               </p>
               <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                 {['Under the Chin', 'Jawline Areas', 'Thighs', 'Abdomen', 'Flanks (Love Handles)', 'Bra Fat', 'Back Fat', 'Underneath Buttocks', 'Upper Arms'].map((area, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                   >
                     <div className="w-2 h-2 bg-[#89CFF0] rounded-full shadow-[0_0_10px_#89CFF0]" />
                     <span className="font-medium">{area}</span>
                   </motion.div>
                 ))}
               </div>
             </div>
             <div className="relative">
                <div className="absolute inset-0 bg-[#89CFF0] blur-[120px] opacity-20" />
                <motion.img 
                  initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8 }}
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881" 
                  alt="Treatable areas" 
                  className="relative z-10 rounded-3xl shadow-2xl opacity-95 border border-white/10"
                />
             </div>
           </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-[#0B4A75] relative overflow-hidden apple-3d-container">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1167A3] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
           <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
             <h2 className="text-5xl font-bold mb-8 font-playfair">Start Your Transformation</h2>
             <p className="text-2xl opacity-90 mb-10 font-light">Book a free consultation to see if CoolSculpting is right for you.</p>
             <Button 
                onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
                size="lg" 
                className="bg-white text-[#0B4A75] hover:bg-gray-100 rounded-full px-12 py-8 text-xl font-bold shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-1 apple-3d-button"
              >
                Book Appointment Now
             </Button>
           </div>
        </section>
      </div>
    </>
  );
};

export default CoolsculptingDetailPage;