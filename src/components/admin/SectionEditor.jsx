import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ui/ImageUpload';
import { Loader2, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SectionEditor = ({ sectionKey, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSection();
  }, [sectionKey]);

  const fetchSection = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('*')
        .eq('section_key', sectionKey)
        .single();

      if (error) throw error;
      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          image_url: data.image_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching section:', error);
      toast({ variant: "destructive", title: "Error", description: "Failed to load section data" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase
        .from('admin_sections')
        .update({
          ...formData,
          updated_at: new Date().toISOString()
        })
        .eq('section_key', sectionKey);

      if (error) throw error;
      
      toast({ title: "Success", description: "Section updated successfully" });
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
          <input
            type="text"
            className="w-full border rounded-lg p-3"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full border rounded-lg p-3 h-32"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section Image</label>
          <ImageUpload
            value={formData.image_url}
            onChange={(val) => setFormData(prev => ({ ...prev, image_url: val }))}
            className="h-48"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={saving} className="bg-blue-600 text-white min-w-[120px]">
          {saving ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default SectionEditor;