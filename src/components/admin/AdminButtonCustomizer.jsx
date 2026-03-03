import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/FormInput';
import { Loader2, Save, MousePointerClick } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import ButtonPremium from '@/components/ui/ButtonPremium';

const AdminButtonCustomizer = () => {
  const [buttons, setButtons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchButtons = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('button_customization').select('*').order('button_name');
      if (error) throw error;
      setButtons(data || []);
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to load button configs.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchButtons();
  }, []);

  const handleUpdate = (id, field, value) => {
    setButtons(prev => prev.map(btn => btn.id === id ? { ...btn, [field]: value } : btn));
  };

  const handleSave = async (btn) => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('button_customization')
        .update({
          button_text: btn.button_text,
          button_link: btn.button_link,
          button_color: btn.button_color,
          button_style: btn.button_style
        })
        .eq('id', btn.id);
      
      if (error) throw error;
      toast({ title: 'Saved', description: `Updated ${btn.button_name} successfully.` });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MousePointerClick className="w-6 h-6 text-blue-600" />
          CTA Button Customizer
        </h2>
        <p className="text-gray-500">Customize the appearance and destination of main call-to-action buttons across the site.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {buttons.map((btn) => (
          <Card key={btn.id} className="p-6 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Settings Form */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg capitalize">{btn.button_name.replace(/_/g, ' ')}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-mono">{btn.button_name}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Button Text</label>
                    <FormInput 
                      value={btn.button_text} 
                      onChange={(e) => handleUpdate(btn.id, 'button_text', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Link URL</label>
                    <FormInput 
                      value={btn.button_link} 
                      onChange={(e) => handleUpdate(btn.id, 'button_link', e.target.value)} 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                   <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Style Variant</label>
                      <select 
                        className="w-full rounded-md border border-gray-300 p-2.5 text-sm"
                        value={btn.button_style}
                        onChange={(e) => handleUpdate(btn.id, 'button_style', e.target.value)}
                      >
                        <option value="solid">Solid Fill</option>
                        <option value="outline">Outline</option>
                        <option value="gradient">Gradient</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">Primary Color</label>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="color" 
                          value={btn.button_color}
                          onChange={(e) => handleUpdate(btn.id, 'button_color', e.target.value)}
                          className="w-10 h-10 rounded border-none cursor-pointer"
                        />
                        <span className="text-sm text-gray-500 font-mono">{btn.button_color}</span>
                      </div>
                   </div>
                </div>
                
                <div className="pt-2">
                   <Button onClick={() => handleSave(btn)} disabled={saving}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                      Save Changes
                   </Button>
                </div>
              </div>

              {/* Live Preview */}
              <div className="w-full md:w-1/3 bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center border border-dashed border-gray-300">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-8">Live Preview</span>
                <ButtonPremium
                  to="#" 
                  color={btn.button_color}
                  variant={btn.button_style}
                  onClick={(e) => e.preventDefault()}
                >
                  {btn.button_text}
                </ButtonPremium>
                <p className="mt-8 text-xs text-gray-400 text-center">
                  This is how the button will appear on the website.
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminButtonCustomizer;