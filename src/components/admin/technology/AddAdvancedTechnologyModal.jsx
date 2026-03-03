import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Save, X } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import ImageUpload from '@/components/ui/ImageUpload';

const AddAdvancedTechnologyModal = ({ isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    featuresInput: '', // Textarea input for features
    order_index: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (url) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process features: split by newline or comma and filter empty strings
      const featuresArray = formData.featuresInput
        .split(/[\n,]/)
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const payload = {
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        features: featuresArray,
        order_index: parseInt(formData.order_index) || 0
      };

      const { error } = await supabase
        .from('advanced_technology_items')
        .insert([payload]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Technology added successfully",
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        image_url: '',
        featuresInput: '',
        order_index: 0
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error('Error adding technology:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add technology",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Technology" className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
          <input 
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="e.g. Light Sheer Desire"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Brief description of the technology..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Image</label>
          <div className="border rounded-md p-4 bg-gray-50">
            <ImageUpload 
              value={formData.image_url}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Features (one per line or comma separated)
          </label>
          <textarea 
            name="featuresInput"
            rows={4}
            value={formData.featuresInput}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm"
            placeholder="Patented ChillTip cooling&#10;Diode laser technology&#10;Fast treatment times"
          />
          <p className="text-xs text-gray-500">Each line will be displayed as a feature bullet point.</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Display Order</label>
          <input 
            type="number"
            name="order_index"
            value={formData.order_index}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t mt-6">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            Add Technology
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAdvancedTechnologyModal;