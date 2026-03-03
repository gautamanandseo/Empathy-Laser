import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Save, X } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { supabase } from '@/lib/customSupabaseClient';
import ImageUpload from '@/components/ui/ImageUpload';

const ServiceAddForm = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Activity',
    price: '',
    order: 0,
    details: '',
    image_url: '',
    before_image_url: '',
    after_image_url: '',
    slug: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Auto-generate slug if not provided but title is
      const slugToUse = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-delhi-ncr';
      
      const payload = { ...formData, slug: slugToUse };

      const { error } = await supabase
        .from('services')
        .insert([payload]);

      if (error) throw error;

      toast({ title: "Success", description: "Service added successfully" });
      onSuccess();
      onClose();
      setFormData({
        title: '',
        description: '',
        icon: 'Activity',
        price: '',
        order: 0,
        details: '',
        image_url: '',
        before_image_url: '',
        after_image_url: '',
        slug: ''
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Service" className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto p-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input 
              required 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="e.g. Laser Hair Removal"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (Optional - auto-generated)</label>
            <input 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
              value={formData.slug} 
              onChange={e => setFormData({...formData, slug: e.target.value})} 
              placeholder="e.g. laser-hair-removal-delhi"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Icon Name</label>
            <input 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
              value={formData.icon} 
              onChange={e => setFormData({...formData, icon: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Price</label>
            <input 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
              value={formData.price} 
              onChange={e => setFormData({...formData, price: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Order</label>
            <input 
              type="number" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
              value={formData.order} 
              onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Short Description</label>
          <textarea 
            className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="space-y-2">
             <label className="text-sm font-medium">Main Image</label>
             <ImageUpload 
               value={formData.image_url} 
               onChange={(url) => setFormData({...formData, image_url: url})} 
             />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">Before Image (Optional)</label>
             <ImageUpload 
               value={formData.before_image_url} 
               onChange={(url) => setFormData({...formData, before_image_url: url})} 
             />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-medium">After Image (Optional)</label>
             <ImageUpload 
               value={formData.after_image_url} 
               onChange={(url) => setFormData({...formData, after_image_url: url})} 
             />
           </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : <><Save className="mr-2 h-4 w-4" /> Save Service</>}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceAddForm;