import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useServicesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = useCallback(async () => {
    try {
      const { data: servicesData, error: err } = await supabase
        .from('admin_services')
        .select('*')
        .order('order', { ascending: true });

      if (err) throw err;
      setData(servicesData || []);
      setError(null);
    } catch (err) {
      console.error('[useServicesData] fetchServices Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();

    const channel = supabase
      .channel('public:admin_services')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'admin_services' },
        (payload) => {
          console.log('Realtime change detected in admin_services:', payload);
          fetchServices();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchServices]);

  const addItem = async (item) => {
    const { data: newItem, error: err } = await supabase
      .from('admin_services')
      .insert([item])
      .select()
      .single();
    if (err) throw err;
    return newItem;
  };

  const updateItem = async (id, item) => {
    const updates = { ...item, updated_at: new Date().toISOString() };
    const { data: updatedItem, error: err } = await supabase
      .from('admin_services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (err) throw err;
    return updatedItem;
  };

  const deleteItem = async (id) => {
    const { error: err } = await supabase
      .from('admin_services')
      .delete()
      .eq('id', id);
    if (err) throw err;
    return true;
  };

  return {
    data,
    loading,
    error,
    refetch: fetchServices,
    addItem,
    updateItem,
    deleteItem
  };
};