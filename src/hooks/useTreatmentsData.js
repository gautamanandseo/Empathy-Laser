import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useTreatmentsData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTreatments = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('treatments')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTreatmentBySlug = useCallback(async (slug) => {
    setLoading(true);
    try {
      // Fetch main treatment data
      const { data: treatment, error: treatmentError } = await supabase
        .from('treatments')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (treatmentError) throw treatmentError;
      if (!treatment) return null;

      // Fetch related details
      const { data: details, error: detailsError } = await supabase
        .from('treatment_details')
        .select('*')
        .eq('treatment_id', treatment.id)
        .order('order');
      
      if (detailsError) console.warn('Error fetching details:', detailsError);

      // Fetch FAQs
      const { data: faqs, error: faqsError } = await supabase
        .from('treatment_faqs')
        .select('*')
        .eq('treatment_id', treatment.id)
        .order('order');
        
      if (faqsError) console.warn('Error fetching FAQs:', faqsError);

      return {
        ...treatment,
        details: details || [],
        faqs: faqs || []
      };
    } catch (err) {
      console.error("Error fetching treatment:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Real-time sync wrapper for fetching lists in admin
  const useTreatmentsRealtime = () => {
    const [data, setData] = useState([]);
    
    const fetchData = async () => {
      const result = await fetchAllTreatments();
      setData(result);
    };

    useEffect(() => {
      fetchData();
      
      const channel = supabase
        .channel('treatments_changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'treatments' }, fetchData)
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }, []);

    return { data, loading, error, refresh: fetchData };
  };

  return {
    loading,
    error,
    fetchAllTreatments,
    fetchTreatmentBySlug,
    useTreatmentsRealtime
  };
};

export default useTreatmentsData;