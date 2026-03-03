import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VideoShowcase = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('transformation_videos')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setVideos(data || []);

    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Unable to load transformation videos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('public:transformation_videos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transformation_videos' }, () => {
         fetchVideos();
      })
      .subscribe();

    return () => {
       supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
               <div className="w-full aspect-video bg-neutral-800 rounded-xl animate-pulse" />
               <div className="h-6 w-3/4 bg-neutral-800 rounded animate-pulse" />
               <div className="h-4 w-1/2 bg-neutral-800 rounded animate-pulse" />
            </div>
         ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-neutral-800/50 rounded-xl border border-neutral-700">
         <p className="text-red-400 mb-4">{error}</p>
         <Button onClick={fetchVideos} variant="outline" className="text-white border-white/20 hover:bg-white/10">
            <RefreshCw className="w-4 h-4 mr-2" /> Retry
         </Button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500 bg-neutral-800/30 rounded-xl">
         <p>No transformation videos available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="mb-4 rounded-xl overflow-hidden shadow-2xl shadow-black/20 bg-black">
             <VideoPlayer 
                src={video.video_url}
                type={video.video_type || 'direct'}
                title={video.title}
                className="w-full aspect-video"
             />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 font-playfair group-hover:text-[var(--color-vibrant-orange)] transition-colors">
             {video.title}
          </h3>
          {video.description && (
             <p className="text-neutral-400 text-sm leading-relaxed">
                {video.description}
             </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default VideoShowcase;