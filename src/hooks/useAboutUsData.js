import { useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { useToast } from '@/components/ui/use-toast';

export const useAboutUsData = () => {
  const { toast } = useToast();
  // Fetch only what we need, though fetching all is fine for small tables.
  const { data: content, loading, error, refresh } = useRealtimeSync('about_us_content', {
    orderBy: { column: 'order', ascending: true }
  });

  const updateSection = useCallback(async (sectionData) => {
    try {
      const { id, ...updates } = sectionData;
      
      // Ensure we don't send undefined ID for updates
      if (!id) throw new Error("Missing record ID for update");

      const { error } = await supabase
        .from('about_us_content')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      
      return { success: true };
    } catch (err) {
      console.error('Error updating section:', err);
      return { success: false, error: err };
    }
  }, []);

  const addItem = useCallback(async (sectionName, defaultData = {}) => {
    try {
      // Calculate next order
      const sectionItems = content?.filter(c => c.section_name === sectionName) || [];
      const nextOrder = sectionItems.length > 0 
        ? Math.max(...sectionItems.map(i => i.order || 0)) + 1 
        : 1;

      const payload = {
        section_name: sectionName,
        title: 'New Item',
        description: 'New description',
        order: nextOrder,
        color: '#ef4444',
        ...defaultData
      };

      const { data, error } = await supabase
        .from('about_us_content')
        .insert(payload)
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('Error adding item:', err);
      return { success: false, error: err };
    }
  }, [content]);

  // Keeping deleteItem for flexibility, though not strictly needed for Hero-only logic
  const deleteItem = useCallback(async (id) => {
    try {
      if (!id) throw new Error("Missing record ID for deletion");

      const { error } = await supabase
        .from('about_us_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Error deleting item:', err);
      return { success: false, error: err };
    }
  }, []);

  return {
    content,
    loading,
    error,
    updateSection,
    addItem,
    deleteItem,
    refresh
  };
};

export default useAboutUsData;