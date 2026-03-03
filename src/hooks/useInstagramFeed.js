import { useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useInstagramFeed = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchImages = useCallback(async () => {
    // Prevent multiple simultaneous fetches if already loading
    // But allow refetching (so we don't check loading here strictly)
    console.log('Fetching Instagram feed images...');
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('instagram_feed')
        .select('*')
        .order('order', { ascending: true });

      if (fetchError) throw fetchError;
      
      console.log(`Fetched ${data?.length || 0} images successfully`);
      setImages(data || []);
    } catch (err) {
      console.error('Error fetching instagram feed:', err);
      setError(err.message);
      toast({ 
        variant: "destructive", 
        title: "Feed Error", 
        description: "Failed to load Instagram feed images." 
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addImage = async (imageData) => {
    console.log('Adding new image to feed:', imageData);
    try {
      const { data, error } = await supabase
        .from('instagram_feed')
        .insert([{ ...imageData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }])
        .select()
        .single();

      if (error) throw error;

      console.log('Image added successfully:', data);
      setImages(prev => [...prev, data].sort((a, b) => (a.order || 0) - (b.order || 0)));
      return data;
    } catch (err) {
      console.error('Error adding image:', err);
      toast({ variant: "destructive", title: "Add Error", description: err.message });
      throw err;
    }
  };

  const updateImage = async (id, updates) => {
    console.log(`Updating image ${id}:`, updates);
    try {
      const { data, error } = await supabase
        .from('instagram_feed')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log('Image updated successfully:', data);
      setImages(prev => prev.map(img => img.id === id ? data : img).sort((a, b) => (a.order || 0) - (b.order || 0)));
      return data;
    } catch (err) {
      console.error('Error updating image:', err);
      toast({ variant: "destructive", title: "Update Error", description: err.message });
      throw err;
    }
  };

  const deleteImage = async (id) => {
    console.log(`Deleting image ${id}`);
    try {
      const { error } = await supabase
        .from('instagram_feed')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('Image deleted successfully');
      setImages(prev => prev.filter(img => img.id !== id));
      toast({ title: "Deleted", description: "Image removed from feed." });
    } catch (err) {
      console.error('Error deleting image:', err);
      toast({ variant: "destructive", title: "Delete Error", description: err.message });
      throw err;
    }
  };

  return {
    images,
    loading,
    error,
    fetchImages,
    addImage,
    updateImage,
    deleteImage
  };
};

export default useInstagramFeed;