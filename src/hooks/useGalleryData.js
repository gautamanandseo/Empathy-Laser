import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useGalleryData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Refs to manage intervals/timeouts to avoid stale closure issues
  const fallbackIntervalRef = useRef(null);
  const lastUpdateRef = useRef(Date.now());

  const fetchGallery = useCallback(async () => {
    try {
      console.log('[useGalleryData] 📡 Fetching gallery data from Supabase...');
      const { data: galleryData, error: err } = await supabase
        .from('before_after_gallery')
        .select('*')
        .order('order', { ascending: true })
        .order('created_at', { ascending: false });

      if (err) throw err;
      
      console.log(`[useGalleryData] ✅ Fetched ${galleryData?.length || 0} items successfully.`);

      // Task 1: Diagnose URLs by logging them explicitly
      if (galleryData && galleryData.length > 0) {
        console.groupCollapsed('[useGalleryData] 🔍 Image URL Diagnosis');
        galleryData.forEach(item => {
            console.log(`%c ID: ${item.id} | Category: ${item.category}`, 'font-weight: bold; color: #2563eb');
            console.log(`   Before URL: ${item.before_image_url}`);
            console.log(`   After URL:  ${item.after_image_url}`);
            
            // Simple validation check
            if (!item.before_image_url?.startsWith('http')) console.warn('   ⚠️ Invalid Before URL format');
            if (!item.after_image_url?.startsWith('http')) console.warn('   ⚠️ Invalid After URL format');
        });
        console.groupEnd();
      } else {
        console.warn('[useGalleryData] ⚠️ No gallery data found in table.');
      }

      setData(galleryData || []);
      setError(null);
      lastUpdateRef.current = Date.now();
    } catch (err) {
      console.error('[useGalleryData] ❌ fetchGallery Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Setup Real-time subscription and fallback polling
  useEffect(() => {
    // 1. Initial Fetch
    fetchGallery();

    // 2. Setup Real-time
    const channelName = `gallery-changes-${Date.now()}`;
    
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'before_after_gallery' },
        (payload) => {
          console.log('✅ [useGalleryData] Realtime change detected!', payload);
          // Refresh data immediately on change
          fetchGallery();
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          // console.log('[useGalleryData] Connected to realtime updates.');
        }
        if (status === 'CHANNEL_ERROR') {
          console.warn('[useGalleryData] Realtime subscription warning:', err);
          // Don't set error state here as polling will handle data fetching
        }
      });

    // 3. Setup Fallback Polling
    const startPolling = () => {
      // console.log('[useGalleryData] Starting background polling...');
      fallbackIntervalRef.current = setInterval(() => {
        fetchGallery();
      }, 5000);
    };

    const initialPollingDelay = setTimeout(() => {
        startPolling();
    }, 3000);

    // Cleanup
    return () => {
      supabase.removeChannel(channel);
      clearTimeout(initialPollingDelay);
      if (fallbackIntervalRef.current) {
        clearInterval(fallbackIntervalRef.current);
      }
    };
  }, [fetchGallery]);

  const addItem = async (item) => {
    try {
      const { data: newItem, error: err } = await supabase
        .from('before_after_gallery')
        .insert([item])
        .select()
        .single();
      
      if (err) throw err;
      await fetchGallery(); 
      return newItem;
    } catch (err) {
      console.error('[useGalleryData] Error adding item:', err);
      throw err;
    }
  };

  const updateItem = async (id, item) => {
    try {
      const updates = { ...item, updated_at: new Date().toISOString() };
      const { data: updatedItem, error: err } = await supabase
        .from('before_after_gallery')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (err) throw err;
      await fetchGallery();
      return updatedItem;
    } catch (err) {
      console.error('[useGalleryData] Error updating item:', err);
      throw err;
    }
  };

  const deleteItem = async (id) => {
    try {
      const { error: err } = await supabase
        .from('before_after_gallery')
        .delete()
        .eq('id', id);

      if (err) throw err;
      await fetchGallery();
      return true;
    } catch (err) {
      console.error('[useGalleryData] Error deleting item:', err);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchGallery,
    addItem,
    updateItem,
    deleteItem
  };
};