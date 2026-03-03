import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';
import { supabase } from '@/lib/customSupabaseClient';

// Simplified modal component since we can't see the original UI library
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const ImageEditModal = ({ isOpen, onClose, onSave, image }) => {
  const [formData, setFormData] = useState({
    image_url: '',
    caption: '',
    order: 0
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (image) {
      setFormData({
        image_url: image.image_url || '',
        caption: image.caption || '',
        order: image.order || 0
      });
    } else {
      // New image mode
      setFormData({
        image_url: '',
        caption: '',
        order: 0
      });
    }
  }, [image, isOpen]);

  const handleSave = async () => {
    if (!formData.image_url) {
      toast({
        variant: "destructive",
        title: "Image Required",
        description: "Please upload an image first."
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Save error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save image details."
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={image ? "Edit Image" : "Add New Image"}>
      <div className="space-y-4">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Image</label>
          {/* 
              CRITICAL FIX: 
              Pass safeOnChange that updates the state directly. 
              The ImageUpload component expects to call onChange(newValue).
              We handle that newValue here.
          */}
          <ImageUpload 
            value={formData.image_url} 
            onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Caption (Optional)</label>
          <input 
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a caption..."
            value={formData.caption}
            onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Order</label>
          <input 
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.order}
            onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
          />
          <p className="text-xs text-gray-500">Lower numbers appear first.</p>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>Cancel</Button>
          <Button onClick={handleSave} disabled={isSaving || !formData.image_url}>
            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>

      </div>
    </Modal>
  );
};

export default ImageEditModal;