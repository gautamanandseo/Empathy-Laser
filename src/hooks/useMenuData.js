import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

export const useMenuData = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setMenuItems(data || []);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError(err.message);
      toast({
        title: 'Error',
        description: 'Failed to load menu items.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addMenuItem = async (newItem) => {
    try {
      // Get max order to append to end
      const maxOrder = menuItems.length > 0 
        ? Math.max(...menuItems.map(i => i.order || 0)) 
        : -1;

      const { data, error } = await supabase
        .from('menu_items')
        .insert([{ ...newItem, order: maxOrder + 1 }])
        .select()
        .single();

      if (error) throw error;

      setMenuItems(prev => [...prev, data]);
      toast({ title: 'Success', description: 'Menu item added successfully.' });
      return data;
    } catch (err) {
      console.error('Error adding menu item:', err);
      toast({ title: 'Error', description: 'Failed to add menu item.', variant: 'destructive' });
      throw err;
    }
  };

  const updateMenuItem = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setMenuItems(prev => prev.map(item => item.id === id ? data : item));
      toast({ title: 'Success', description: 'Menu item updated successfully.' });
      return data;
    } catch (err) {
      console.error('Error updating menu item:', err);
      toast({ title: 'Error', description: 'Failed to update menu item.', variant: 'destructive' });
      throw err;
    }
  };

  const deleteMenuItem = async (id) => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast({ title: 'Success', description: 'Menu item deleted successfully.' });
    } catch (err) {
      console.error('Error deleting menu item:', err);
      toast({ title: 'Error', description: 'Failed to delete menu item.', variant: 'destructive' });
      throw err;
    }
  };

  const reorderMenuItems = async (items) => {
    // Optimistic update
    setMenuItems(items);

    try {
      const updates = items.map((item, index) => ({
        id: item.id,
        order: index,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('menu_items')
        .upsert(updates);

      if (error) throw error;
    } catch (err) {
      console.error('Error reordering menu items:', err);
      toast({ title: 'Error', description: 'Failed to save new order.', variant: 'destructive' });
      fetchMenuItems(); // Revert on error
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [fetchMenuItems]);

  return {
    menuItems,
    loading,
    error,
    fetchMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    reorderMenuItems
  };
};