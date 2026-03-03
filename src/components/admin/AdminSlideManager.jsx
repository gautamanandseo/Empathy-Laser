import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/FormInput';
import ImageUpload from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Trash2, GripVertical, Save, RefreshCw } from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { Card } from '@/components/ui/Card';

const AdminSlideManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('admin_home_sliders')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load slides.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleUpdate = (id, field, value) => {
    setSlides(prev => prev.map(slide => slide.id === id ? { ...slide, [field]: value } : slide));
  };

  const handleSave = async (slide) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('admin_home_sliders')
        .update({
          title: slide.title,
          description: slide.description,
          image_url: slide.image_url,
          button_text: slide.button_text,
          button_link: slide.button_link,
          order: slide.order
        })
        .eq('id', slide.id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Slide updated successfully.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleAddSlide = async () => {
    try {
      setSaving(true);
      const newOrder = slides.length > 0 ? Math.max(...slides.map(s => s.order)) + 1 : 1;
      const { data, error } = await supabase
        .from('admin_home_sliders')
        .insert([{
          title: 'New Slide',
          description: 'Description here...',
          button_text: 'Learn More',
          button_link: '/',
          order: newOrder
        }])
        .select();

      if (error) throw error;
      setSlides([...slides, data[0]]);
      toast({ title: 'Slide Added', description: 'New slide created.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    try {
      setSaving(true);
      const { error } = await supabase.from('admin_home_sliders').delete().eq('id', id);
      if (error) throw error;
      setSlides(prev => prev.filter(s => s.id !== id));
      toast({ title: 'Deleted', description: 'Slide removed.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleReorder = async (newOrder) => {
    setSlides(newOrder);
    // Debounced save or manual save recommended for reorder, but for simplicity we can save all
    // In a real app, you might want a "Save Order" button
  };

  const saveOrder = async () => {
    try {
        setSaving(true);
        const updates = slides.map((slide, index) => ({
            id: slide.id,
            order: index + 1
        }));
        
        // Supabase upsert/update heavily depends on structure. 
        // Simplest way is loop update for order (not efficient for large lists but fine for < 10 slides)
        for(const update of updates) {
            await supabase.from('admin_home_sliders').update({ order: update.order }).eq('id', update.id);
        }
        toast({ title: 'Order Saved', description: 'Slide order updated.' });
    } catch(err) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to save order.' });
    } finally {
        setSaving(false);
    }
  }

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Home Slider Manager</h2>
          <p className="text-gray-500">Drag to reorder, edit content, and manage your homepage hero slides.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={saveOrder} variant="outline" disabled={saving}>
               <RefreshCw className="mr-2 h-4 w-4" /> Save Order
            </Button>
            <Button onClick={handleAddSlide} disabled={saving}>
            <Plus className="mr-2 h-4 w-4" /> Add Slide
            </Button>
        </div>
      </div>

      <Reorder.Group axis="y" values={slides} onReorder={handleReorder} className="space-y-4">
        {slides.map((slide) => (
          <Reorder.Item key={slide.id} value={slide}>
            <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-6 items-start">
                <div className="cursor-grab active:cursor-grabbing p-2 mt-2 text-gray-400 hover:text-gray-600">
                  <GripVertical className="w-6 h-6" />
                </div>
                
                <div className="w-48 flex-shrink-0">
                  <ImageUpload 
                    value={slide.image_url} 
                    onChange={(url) => handleUpdate(slide.id, 'image_url', url)}
                    className="aspect-video w-full rounded-md object-cover"
                  />
                </div>

                <div className="flex-1 grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Headline Title</label>
                    <FormInput 
                      value={slide.title || ''} 
                      onChange={(e) => handleUpdate(slide.id, 'title', e.target.value)}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      rows={2}
                      value={slide.description || ''}
                      onChange={(e) => handleUpdate(slide.id, 'description', e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Button Text</label>
                    <FormInput 
                      value={slide.button_text || ''} 
                      onChange={(e) => handleUpdate(slide.id, 'button_text', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Button Link</label>
                    <FormInput 
                      value={slide.button_link || ''} 
                      onChange={(e) => handleUpdate(slide.id, 'button_link', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="icon" variant="ghost" className="text-red-500 hover:bg-red-50" onClick={() => handleDelete(slide.id)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="outline" className="text-blue-600 hover:bg-blue-50" onClick={() => handleSave(slide)}>
                    <Save className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default AdminSlideManager;