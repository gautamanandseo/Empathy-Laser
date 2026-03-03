import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, Upload, Video } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';

const AdminTransformationManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    video_url: '',
    heading: '',
    subtitle: '',
    tech_heading: '',
    tech_description: '',
    button_text: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('transformation_section')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load transformation section data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate video type
    if (!file.type.startsWith('video/')) {
       toast({
         title: "Invalid file",
         description: "Please upload a valid video file",
         variant: "destructive"
       });
       return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('transformation-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('transformation-assets')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, video_url: publicUrl }));
      
      toast({
        title: "Success",
        description: "Video uploaded successfully",
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (formData.id) {
        const { error } = await supabase
          .from('transformation_section')
          .update(formData)
          .eq('id', formData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('transformation_section')
          .insert([formData]);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Transformation section updated successfully",
      });
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Transformation Section</h1>
          <p className="text-gray-500">Manage the video and content for the transformation showcase.</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-[var(--color-vibrant-orange)] hover:bg-orange-600">
          {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold border-b pb-2">Content Settings</h2>
          
          <div className="space-y-4">
            <div>
              <Label>Section Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. See The Transformation" />
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Short description below title" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Button Text</Label>
                <Input name="button_text" value={formData.button_text} onChange={handleChange} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <Label>Technical Details Heading</Label>
              <Input name="tech_heading" value={formData.tech_heading} onChange={handleChange} className="mt-1" />
            </div>

            <div>
              <Label>Technical Details Description</Label>
              <Textarea name="tech_description" value={formData.tech_description} onChange={handleChange} className="mt-1" />
            </div>
          </div>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold border-b pb-2">Video Settings</h2>
          
          <div className="space-y-4">
             <div>
               <Label>Video URL</Label>
               <div className="flex gap-2">
                 <Input name="video_url" value={formData.video_url} onChange={handleChange} placeholder="https://..." />
               </div>
               <p className="text-xs text-gray-500 mt-1">Enter a direct URL or upload a file below.</p>
             </div>

             <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors">
                <input 
                  type="file" 
                  accept="video/*" 
                  id="video-upload" 
                  className="hidden" 
                  onChange={handleVideoUpload}
                  disabled={uploading}
                />
                <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                  {uploading ? (
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin mb-2" />
                  ) : (
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                  )}
                  <span className="font-medium text-gray-700">Click to upload video</span>
                  <span className="text-xs text-gray-400 mt-1">MP4, WebM up to 50MB</span>
                </label>
             </div>

             {formData.video_url && (
               <div className="mt-6">
                 <Label className="mb-2 block">Preview</Label>
                 <VideoPlayer src={formData.video_url} className="rounded-lg border border-gray-200" />
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransformationManager;