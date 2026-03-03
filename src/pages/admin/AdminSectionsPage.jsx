import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Edit2, Loader2, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import SectionEditor from '@/components/admin/SectionEditor';
import { useToast } from '@/components/ui/use-toast';

const AdminSectionsPage = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState(null);
  const { toast } = useToast();

  const fetchSections = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('*')
        .order('section_key');

      if (error) throw error;
      setSections(data || []);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleEditSuccess = () => {
    setEditingKey(null);
    fetchSections();
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Page Sections</h1>
          <p className="text-gray-500 mt-1">Manage static content sections on the homepage</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-600 w-8 h-8" /></div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6">
              {section.image_url && (
                <div className="w-full md:w-64 h-40 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img src={section.image_url} alt={section.title} className="w-full h-full object-cover" />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{section.title}</h3>
                  <Button variant="outline" size="sm" onClick={() => setEditingKey(section.section_key)}>
                    <Edit2 className="w-4 h-4 mr-2" /> Edit
                  </Button>
                </div>
                <div className="inline-block px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded mb-3 font-mono">
                  ID: {section.section_key}
                </div>
                <p className="text-gray-600 line-clamp-3">{section.description}</p>
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <div className="text-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
               <Layout className="w-12 h-12 text-gray-300 mx-auto mb-3" />
               <p className="text-gray-500">No editable sections found.</p>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={!!editingKey}
        onClose={() => setEditingKey(null)}
        title="Edit Section Content"
        className="max-w-2xl"
      >
        {editingKey && (
          <SectionEditor 
            sectionKey={editingKey} 
            onCancel={() => setEditingKey(null)}
            onSuccess={handleEditSuccess}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminSectionsPage;