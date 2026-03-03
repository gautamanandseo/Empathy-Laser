import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Loader2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';

const CATEGORIES = ['Laser Hair Removal', 'Skin Rejuvenation', 'Coolsculpting'];

const AdminGalleryForm = ({ item, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    before_image_url: '',
    after_image_url: '',
    order: 0
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category || CATEGORIES[0],
        before_image_url: item.before_image_url || '',
        after_image_url: item.after_image_url || '',
        order: item.order || 0
      });
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (item?.id) {
        const { error } = await supabase
          .from('before_after_gallery')
          .update(formData)
          .eq('id', item.id);
        if (error) throw error;
        toast({ title: "Success", description: "Gallery item updated successfully" });
      } else {
        const { error } = await supabase
          .from('before_after_gallery')
          .insert([formData]);
        if (error) throw error;
        toast({ title: "Success", description: "New gallery item added" });
      }
      onSuccess();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message || "Failed to save item" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">{item ? 'Edit Item' : 'Add New Item'}</h3>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-5 h-5 text-gray-400" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="text-sm text-gray-400 block mb-1">Title</label>
          <input
            required
            type="text"
            className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-white"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">Category</label>
          <select
            className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-white"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Before Image</label>
            <ImageUpload 
              value={formData.before_image_url} 
              onChange={url => setFormData({ ...formData, before_image_url: url })} 
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-1">After Image</label>
            <ImageUpload 
              value={formData.after_image_url} 
              onChange={url => setFormData({ ...formData, after_image_url: url })} 
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">Description</label>
          <textarea
            className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-white h-24"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">Order (Display Priority)</label>
          <input
            type="number"
            className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-white"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="outline" onClick={onCancel} className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="bg-[var(--primary-red)] text-white hover:bg-red-700">
          {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          {item ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
};

export default AdminGalleryForm;