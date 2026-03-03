import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Save, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const AdminInstagramSection = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    access_token: ''
  });
  const { toast } = useToast();
  const SECTION_KEY = 'instagram_feed';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('*')
        .eq('section_key', SECTION_KEY)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setFormData({
            title: data.title || '',
            description: data.description || '',
            access_token: data.metadata?.access_token || ''
        });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Check if exists
      const { data: existing } = await supabase
        .from('admin_sections')
        .select('id')
        .eq('section_key', SECTION_KEY)
        .maybeSingle();

      const payload = {
          title: formData.title,
          description: formData.description,
          metadata: { access_token: formData.access_token },
          updated_at: new Date().toISOString()
      };

      let error;
      if (existing) {
         const { error: updateError } = await supabase
            .from('admin_sections')
            .update(payload)
            .eq('section_key', SECTION_KEY);
         error = updateError;
      } else {
         const { error: insertError } = await supabase
            .from('admin_sections')
            .insert([{
                ...payload,
                section_key: SECTION_KEY,
                created_at: new Date().toISOString()
            }]);
         error = insertError;
      }

      if (error) throw error;
      
      toast({ title: "Success", description: "Instagram settings updated successfully" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Instagram Feed Settings</h1>
          <p className="text-gray-500 mt-1">Configure your Instagram feed integration</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <input
                    type="text"
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Follow Our Journey"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                    className="w-full border rounded-lg p-3 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="e.g. See real results and latest updates on Instagram"
                    required
                />
            </div>
            
            <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                    <Key className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">API Configuration</h3>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800">
                    To display your live Instagram feed, you need to generate a User Access Token from the Facebook Developers Portal.
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Access Token</label>
                    <input
                        type="password"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                        value={formData.access_token}
                        onChange={(e) => setFormData(prev => ({ ...prev, access_token: e.target.value }))}
                        placeholder="IGQJ..."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        This token is required to fetch posts from your Instagram account.
                    </p>
                </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100">
             <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] py-6">
                {saving ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                Save Settings
             </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminInstagramSection;