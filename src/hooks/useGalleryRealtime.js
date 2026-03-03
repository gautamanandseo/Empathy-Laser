import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { groupGalleryData } from '@/lib/galleryUtils';

export const useGalleryRealtime = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGalleryData = useCallback(async () => {
    try {
      const { data, error: err } = await supabase
        .from('before_after_gallery')
        .select('*')
        .order('order', { ascending: true })
        .order('created_at', { ascending: false });

      if (err) throw err;
      
      // Group data for the frontend display component
      const grouped = groupGalleryData(data || []);
      setGalleryData(grouped);
    } catch (err) {
      console.error('[useGalleryRealtime] Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchGalleryData();

    // Real-time subscription
    const channel = supabase
      .channel('public:before_after_gallery')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'before_after_gallery',
        },
        () => {
          fetchGalleryData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchGalleryData]);

  return { galleryData, loading, error, refetch: fetchGalleryData };
};