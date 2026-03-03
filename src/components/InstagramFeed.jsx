import React, { useState, useEffect } from 'react';
import { Instagram, ExternalLink, RefreshCw, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicData } from '@/constants/clinicData';
import { supabase } from '@/lib/customSupabaseClient';
import useGalleryModal from '@/hooks/useGalleryModal';
import ImageModal from '@/components/ui/ImageModal';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfigured, setIsConfigured] = useState(true);

  // Modal hook
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

  const fallbackPosts = [
    { id: '1', media_url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600', caption: 'Experience the glow with our signature Carbon Peel! ✨ #SkinRejuvenation #DelhiSkincare', permalink: clinicData.social.instagram, media_type: 'IMAGE' },
    { id: '2', media_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600', caption: 'Real results, real confidence. Laser hair removal changes everything. 💃 #LaserHairRemoval', permalink: clinicData.social.instagram, media_type: 'IMAGE' },
    { id: '3', media_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600', caption: 'Our state-of-the-art facility in Pitampura. Visit us today! 🏥 #EmpathyLaserClinic #ClinicTour', permalink: clinicData.social.instagram, media_type: 'IMAGE' },
    { id: '4', media_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9af908?auto=format&fit=crop&q=80&w=600', caption: 'Say goodbye to acne scars. Advanced laser solutions available now. 🌟 #AcneTreatment', permalink: clinicData.social.instagram, media_type: 'IMAGE' },
    { id: '5', media_url: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600', caption: 'Anti-aging magic. Turn back the clock with HIFU. 🕰️ #AntiAging #YouthfulSkin', permalink: clinicData.social.instagram, media_type: 'IMAGE' },
    { id: '6', media_url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600', caption: 'Soprano Titanium: The gold standard in painless hair removal. ⚡ #PainlessLaser', permalink: clinicData.social.instagram, media_type: 'IMAGE' },
  ];

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: sectionData, error: sectionError } = await supabase
        .from('admin_sections')
        .select('metadata')
        .eq('section_key', 'instagram_feed')
        .maybeSingle();

      if (sectionError) {
         console.warn("Could not check Instagram configuration:", sectionError);
      }

      const accessToken = sectionData?.metadata?.access_token;

      if (!accessToken) {
        setIsConfigured(false);
        setPosts(fallbackPosts);
        setLoading(false);
        return;
      }

      setIsConfigured(true);

      const { data, error: funcError } = await supabase.functions.invoke('fetch-instagram-posts', {
        body: { access_token: accessToken }
      });
      
      if (funcError) throw funcError;
      
      if (data && data.data) {
        setPosts(data.data);
      } else if (data && data.error) {
        throw new Error(data.error.message || "API Error");
      } else {
         console.warn("API returned no data structure, using fallback");
         setPosts(fallbackPosts);
      }
    } catch (err) {
      console.error("Error loading Instagram feed:", err);
      setPosts(fallbackPosts);
      setError("Unable to load live feed. Showing highlights."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePostClick = (index) => {
    const galleryItems = posts.map(p => ({
      url: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      title: p.caption || 'Instagram Post'
    }));
    openModal(galleryItems, index);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg border-t-4 border-[var(--primary-red)] overflow-hidden w-full">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                 <Instagram className="w-6 h-6 md:w-7 md:h-7 text-[var(--primary-red)]" />
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-lg md:text-xl text-[var(--text-dark)] leading-none truncate">@empathylaserclinic</h3>
              <p className="text-xs md:text-sm text-[var(--text-light)] mt-1 truncate">Follow us for results, tips & offers</p>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
              <Button variant="ghost" size="icon" onClick={fetchPosts} disabled={loading} title="Refresh Feed" className="shrink-0">
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button 
                variant="outline" 
                className="text-[var(--primary-red)] border-[var(--primary-red)] hover:bg-[var(--light-red)] whitespace-nowrap flex-1 md:flex-none"
                onClick={() => window.open(clinicData.social.instagram, '_blank')}
              >
                View Profile <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-white p-1 min-h-[300px]">
          {loading && posts.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1">
               {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="aspect-square bg-gray-100 animate-pulse" />
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-1">
              {posts.slice(0, 12).map((post, index) => (
                <div 
                  key={post.id}
                  className="group relative aspect-square overflow-hidden block bg-gray-100 cursor-pointer"
                  onClick={() => handlePostClick(index)}
                >
                  <img 
                    src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url} 
                    alt={post.caption ? post.caption.substring(0, 20) : 'Instagram Post'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                    <ZoomIn className="w-8 h-8 mb-2" />
                    <p className="text-xs line-clamp-3 font-light opacity-90">{post.caption || 'View full image'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isConfigured && !loading && posts.length > 0 && (
               <div className="p-4 text-center text-sm text-gray-500 bg-gray-50 border-t border-gray-100">
                 <p>Live feed not configured. Showing highlights.</p>
              </div>
          )}

          {error && isConfigured && (
              <div className="p-2 text-center text-xs text-amber-600 bg-amber-50">
                 {error}
              </div>
          )}
        </div>
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
    </>
  );
};

export default InstagramFeed;