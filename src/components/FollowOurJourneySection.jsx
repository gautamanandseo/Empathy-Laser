import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicData } from '@/constants/clinicData';
import useInstagramFeed from '@/hooks/useInstagramFeed';
import useGalleryModal from '@/hooks/useGalleryModal';
import ImageModal from '@/components/ui/ImageModal';
import Apple3DImageBox from '@/components/ui/Apple3DImageBox';

const FollowOurJourneySection = () => {
  const [sectionData, setSectionData] = useState({
    title: 'Follow Our Journey',
    description: 'See real results and latest updates on Instagram'
  });

  const { images, loading, fetchImages } = useInstagramFeed();
  
  const { 
    isOpen, 
    currentImage, 
    openModal, 
    closeModal, 
    nextImage, 
    previousImage, 
    hasNext, 
    hasPrevious 
  } = useGalleryModal();

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const { data } = await supabase
          .from('admin_sections')
          .select('title, description')
          .eq('section_key', 'instagram_feed')
          .maybeSingle();
        
        if (data) {
          setSectionData({
            title: data.title || 'Follow Our Journey',
            description: data.description || 'See real results and latest updates on Instagram'
          });
        }
      } catch (error) {
        console.error('Error fetching section data:', error);
      }
    };
    fetchSection();

    const subscription = supabase
      .channel('public:instagram_feed')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'instagram_feed' }, () => {
        fetchImages();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchImages]);

  const handleImageClick = (index) => {
    if (!images || !images.length) return;
    const galleryItems = images.map(img => ({
      url: img.image_url,
      title: img.caption || 'Instagram Post'
    }));
    openModal(galleryItems, index);
  };

  return (
    <section className="py-12 md:py-24 bg-white border-t border-neutral-100 overflow-hidden w-full relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-100 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gray-100 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full flex flex-col items-center"
        >
            <div className="text-center mb-10 md:mb-16 px-4 max-w-3xl">
              <div className="flex items-center justify-center gap-2 mb-4 text-[var(--primary-brand)] font-semibold bg-orange-50 inline-flex px-4 py-1.5 rounded-full border border-orange-100">
                <Instagram className="w-4 h-4" />
                <span className="uppercase tracking-widest text-xs">@empathylaserclinic</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6 font-playfair leading-tight">
                {sectionData.title}
              </h3>
              <p className="text-gray-500 text-base md:text-xl font-light">
                {sectionData.description}
              </p>
            </div>
            
            {/* 3D Grid Layout */}
            <div className="w-full mb-10 md:mb-12">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4">
                  {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="aspect-square rounded-[2rem] bg-gray-100 animate-pulse shadow-sm" />
                  ))}
                </div>
              ) : images && images.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 p-2">
                  {images.map((img, index) => (
                    <motion.div
                        key={img.id}
                        whileHover={{ y: -10, rotateX: 2 }}
                        style={{ perspective: 1000 }}
                        className="rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-orange-500/10 overflow-hidden border border-gray-100 transition-all duration-300"
                    >
                        <Apple3DImageBox 
                          src={img.image_url}
                          alt={img.caption || 'Clinic result'}
                          onClick={() => handleImageClick(index)}
                          className="aspect-square w-full"
                        />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white/50 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-sm">
                   <Instagram className="w-12 h-12 mb-4 text-gray-300" />
                   <p className="text-lg">No posts yet. Check back soon!</p>
                </div>
              )}
            </div>

            <Button 
              size="lg"
              className="bg-white text-gray-900 border border-gray-200 hover:bg-orange-50 hover:text-[var(--primary-brand)] hover:border-orange-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-full px-8 md:px-10 py-6 text-base md:text-lg font-medium"
              onClick={() => window.open(clinicData.social.instagram, '_blank')}
            >
              <Instagram className="mr-2 w-5 h-5 text-[var(--primary-brand)]" />
              Follow on Instagram <ExternalLink className="ml-2 w-4 h-4 text-gray-400" />
            </Button>

        </motion.div>
      </div>

      <ImageModal 
        isOpen={isOpen}
        imageUrl={currentImage?.url}
        altText={currentImage?.title}
        onClose={closeModal}
        onNext={nextImage}
        onPrevious={previousImage}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
    </section>
  );
};

export default FollowOurJourneySection;