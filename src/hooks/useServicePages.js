import { useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useServicePages = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchServicePage = useCallback(async (serviceKey) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_pages')
        .select('*')
        .eq('service_key', serviceKey)
        .single();

      if (error) {
        // If row doesn't exist yet, return null without erroring
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    } catch (error) {
      console.error(`Error fetching service page (${serviceKey}):`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load page content."
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchAllServicePages = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('service_pages')
        .select('*');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching all service pages:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load service pages."
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateServicePage = useCallback(async (serviceKey, pageData) => {
    setLoading(true);
    try {
      // We explicitly specify onConflict: 'service_key' to ensure UPSERT works correctly
      // on the unique column, even though it's not the primary key.
      const { data, error } = await supabase
        .from('service_pages')
        .upsert({
          service_key: serviceKey,
          ...pageData,
          updated_at: new Date().toISOString()
        }, { onConflict: 'service_key' }) 
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page content updated successfully."
      });
      return data;
    } catch (error) {
      console.error(`Error updating service page (${serviceKey}):`, error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save changes."
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    loading,
    fetchServicePage,
    fetchAllServicePages,
    updateServicePage
  };
};