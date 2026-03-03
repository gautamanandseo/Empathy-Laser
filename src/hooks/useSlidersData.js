import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useSlidersData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSliders = useCallback(async () => {
    try {
      const { data: sliderData, error: err } = await supabase
        .from('admin_home_sliders')
        .select('*')
        .order('order', { ascending: true });

      if (err) throw err;
      setData(sliderData || []);
      setError(null);
    } catch (err) {
      console.error('[useSlidersData] fetchSliders Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSliders();

    const channel = supabase
      .channel('public:admin_home_sliders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'admin_home_sliders' },
        (payload) => {
          console.log('Realtime change detected in admin_home_sliders:', payload);
          fetchSliders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchSliders]);

  const addItem = async (item) => {
    const { data: newItem, error: err } = await supabase
      .from('admin_home_sliders')
      .insert([item])
      .select()
      .single();
    if (err) throw err;
    return newItem;
  };

  const updateItem = async (id, item) => {
    const updates = { ...item, updated_at: new Date().toISOString() };
    const { data: updatedItem, error: err } = await supabase
      .from('admin_home_sliders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (err) throw err;
    return updatedItem;
  };

  const deleteItem = async (id) => {
    const { error: err } = await supabase
      .from('admin_home_sliders')
      .delete()
      .eq('id', id);
    if (err) throw err;
    return true;
  };

  return {
    data,
    loading,
    error,
    refetch: fetchSliders,
    addItem,
    updateItem,
    deleteItem
  };
};