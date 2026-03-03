import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import InstagramFeed from '@/components/InstagramFeed';

const AdminInstagramFeed = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
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
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setFormData({
            title: data.title || '',
            description: data.description || ''
        });
      } else {
        // Default values
        setFormData({
            title: 'Follow Our Journey',
            description: 'See real results and latest updates on Instagram'
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
      const { data: existing } = await supabase
        .from('admin_sections')
        .select('id')
        .eq('section_key', SECTION_KEY)
        .single();

      let error;
      if (existing) {
         const { error: updateError } = await supabase
            .from('admin_sections')
            .update({
                ...formData,
                updated_at: new Date().toISOString()
            })
            .eq('section_key', SECTION_KEY);
         error = updateError;
      } else {
         const { error: insertError } = await supabase
            .from('admin_sections')
            .insert([{
                ...formData,
                section_key: SECTION_KEY,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }]);
         error = insertError;
      }

      if (error) throw error;
      
      toast({ title: "Success", description: "Feed section updated" });
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
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Instagram Feed Section</h1>
          <p className="text-gray-500 mt-1">Manage the "Follow Our Journey" text above the feed</p>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Short description..."
                />
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]">
                    {saving ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Save className="w-5 h-5 mr-2" />}
                    Save Changes
                </Button>
            </div>
        </form>
      </div>

      <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">Live Preview</h3>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
             {/* We mock the Section component here to preview using the form data + actual feed */}
             <div className="py-12 bg-white text-center">
                 <h3 className="text-3xl font-bold mb-4 font-playfair">{formData.title}</h3>
                 <p className="text-gray-500 mb-8 max-w-2xl mx-auto px-4">{formData.description}</p>
                 <div className="px-4">
                     <InstagramFeed />
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default AdminInstagramFeed;