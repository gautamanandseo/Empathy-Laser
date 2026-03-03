import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AboutUsHeroEditor = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hero_image_url: '',
    subtitle: ''
  });
  const [saving, setSaving] = useState(false);

  const { data: heroData, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'hero' },
    single: true
  });

  useEffect(() => {
    if (heroData) {
      setFormData({
        title: heroData.title || '',
        description: heroData.description || '',
        hero_image_url: heroData.hero_image_url || heroData.image_url || '',
        subtitle: heroData.details?.subtitle || ''
      });
    }
  }, [heroData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        section_name: 'hero',
        title: formData.title,
        description: formData.description,
        hero_image_url: formData.hero_image_url,
        details: { subtitle: formData.subtitle }
      };

      if (heroData?.id) {
        await supabase.from('about_us_content').update(payload).eq('id', heroData.id);
      } else {
        await supabase.from('about_us_content').insert(payload);
      }

      toast({ title: 'Success', description: 'Hero section updated successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <Label>Subtitle</Label>
          <Input 
            value={formData.subtitle} 
            onChange={e => setFormData({...formData, subtitle: e.target.value})} 
            placeholder="e.g. Our Story"
          />
        </div>
        <div>
          <Label>Title</Label>
          <Input 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            placeholder="Main Headline"
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            placeholder="Brief intro text"
            rows={4}
          />
        </div>
        <div>
          <Label className="mb-2 block">Background Image</Label>
          <ImageUpload 
            value={formData.hero_image_url} 
            onChange={url => setFormData({...formData, hero_image_url: url})}
          />
        </div>
      </div>
      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Save Changes
      </Button>
    </div>
  );
};

export default AboutUsHeroEditor;