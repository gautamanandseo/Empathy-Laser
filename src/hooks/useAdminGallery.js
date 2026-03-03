import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { ensureGalleryBucketExists } from '@/lib/storageSetup';

export const useAdminGallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize storage when the hook is first used
  useEffect(() => {
    ensureGalleryBucketExists();
  }, []);

  const fetchGallery = useCallback(async () => {
    try {
      const { data: gallery, error: err } = await supabase
        .from('before_after_gallery')
        .select('*')
        .order('order', { ascending: true })
        .order('created_at', { ascending: false });

      if (err) throw err;
      setData(gallery || []);
    } catch (err) {
      console.error('[useAdminGallery] fetchGallery Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();

    const channel = supabase
      .channel('public:admin_gallery_list')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'before_after_gallery' },
        () => {
          fetchGallery();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchGallery]);

  const addItem = async (item) => {
    const { data: newItem, error: err } = await supabase
      .from('before_after_gallery')
      .insert([item])
      .select()
      .single();
    if (err) throw err;
    return newItem;
  };

  const updateItem = async (id, item) => {
    const updates = { ...item, updated_at: new Date().toISOString() };
    const { data: updatedItem, error: err } = await supabase
      .from('before_after_gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (err) throw err;
    return updatedItem;
  };

  const deleteItem = async (id) => {
    const { error: err } = await supabase
      .from('before_after_gallery')
      .delete()
      .eq('id', id);
    if (err) throw err;
    return true;
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