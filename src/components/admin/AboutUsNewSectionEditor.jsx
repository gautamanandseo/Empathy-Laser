import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, Plus, Trash } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AboutUsNewSectionEditor = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    bullets: []
  });
  const [saving, setSaving] = useState(false);

  const { data: sectionData, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'new_section' },
    single: true
  });

  useEffect(() => {
    if (sectionData) {
      setFormData({
        title: sectionData.title || '',
        description: sectionData.description || '',
        image_url: sectionData.image_url || '',
        bullets: sectionData.details?.bullets || []
      });
    }
  }, [sectionData]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        section_name: 'new_section',
        title: formData.title,
        description: formData.description,
        image_url: formData.image_url,
        details: { bullets: formData.bullets }
      };

      if (sectionData?.id) {
        await supabase.from('about_us_content').update(payload).eq('id', sectionData.id);
      } else {
        await supabase.from('about_us_content').insert(payload);
      }

      toast({ title: 'Success', description: 'Section updated successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setSaving(false);
    }
  };

  const addBullet = () => {
    setFormData(prev => ({ ...prev, bullets: [...prev.bullets, ''] }));
  };

  const updateBullet = (index, value) => {
    const newBullets = [...formData.bullets];
    newBullets[index] = value;
    setFormData(prev => ({ ...prev, bullets: newBullets }));
  };

  const removeBullet = (index) => {
    setFormData(prev => ({ ...prev, bullets: prev.bullets.filter((_, i) => i !== index) }));
  };

  if (loading) return <div className="p-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <Label>Section Title</Label>
          <Input 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea 
            value={formData.description} 
            onChange={e => setFormData({...formData, description: e.target.value})} 
            rows={4}
          />
        </div>
        <div>
          <Label className="mb-2 block">Side Image</Label>
          <ImageUpload 
            value={formData.image_url} 
            onChange={url => setFormData({...formData, image_url: url})}
          />
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center mb-4">
            <Label>Bullet Points</Label>
            <Button size="sm" variant="outline" onClick={addBullet}><Plus className="w-4 h-4 mr-1" /> Add Point</Button>
          </div>
          <div className="space-y-2">
            {formData.bullets.map((bullet, index) => (
              <div key={index} className="flex gap-2">
                <Input 
                  value={bullet}
                  onChange={(e) => updateBullet(index, e.target.value)}
                  placeholder="Feature point..."
                />
                <Button variant="ghost" size="icon" onClick={() => removeBullet(index)} className="text-red-500">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Save Changes
      </Button>
    </div>
  );
};

export default AboutUsNewSectionEditor;