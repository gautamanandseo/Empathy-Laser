import { useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useServiceDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchServiceBySlug = useCallback(async (slug) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('service_details')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error fetching service details:', err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllServiceDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('service_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching all service details:', err);
      setError(err.message);
      toast({ variant: "destructive", title: "Error", description: "Failed to load service details." });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createServiceDetail = useCallback(async (serviceData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_details')
        .insert([serviceData])
        .select()
        .single();

      if (error) throw error;
      toast({ title: "Success", description: "Service page created successfully." });
      return data;
    } catch (err) {
      console.error('Error creating service detail:', err);
      toast({ variant: "destructive", title: "Error", description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateServiceDetail = useCallback(async (id, serviceData) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_details')
        .update(serviceData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast({ title: "Success", description: "Service page updated successfully." });
      return data;
    } catch (err) {
      console.error('Error updating service detail:', err);
      toast({ variant: "destructive", title: "Error", description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteServiceDetail = useCallback(async (id) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('service_details')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Service page deleted successfully." });
      return true;
    } catch (err) {
      console.error('Error deleting service detail:', err);
      toast({ variant: "destructive", title: "Error", description: err.message });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    loading,
    error,
    fetchServiceBySlug,
    fetchAllServiceDetails,
    createServiceDetail,
    updateServiceDetail,
    deleteServiceDetail
  };
};