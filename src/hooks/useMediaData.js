import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useMediaData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: mediaData, error: err } = await supabase
        .from('admin_media')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setData(mediaData || []);
    } catch (err) {
      console.error('[useMediaData] fetchMedia Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const addItem = useCallback(async (item) => {
    setLoading(true);
    setError(null);
    try {
      const { data: newItem, error: err } = await supabase
        .from('admin_media')
        .insert([item])
        .select()
        .single();

      if (err) throw err;
      setData(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      console.error('[useMediaData] addItem Error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase
        .from('admin_media')
        .delete()
        .eq('id', id);

      if (err) throw err;
      setData(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      console.error('[useMediaData] deleteItem Error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchMedia,
    addItem,
    deleteItem
  };
};