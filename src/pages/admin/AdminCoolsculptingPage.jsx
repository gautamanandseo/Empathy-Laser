import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Pencil, Trash2, Loader2, Snowflake, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';
import Modal from '@/components/ui/Modal';
import AddResultForm from '@/components/admin/AddResultForm';

const BODY_AREAS = [
  { value: 'abdomen', label: 'Abdomen' },
  { value: 'flanks', label: 'Flanks (Love Handles)' },
  { value: 'thighs', label: 'Thighs' },
  { value: 'chin', label: 'Chin & Jawline' },
  { value: 'upper_arms', label: 'Upper Arms' },
  { value: 'bra_fat', label: 'Bra Fat' },
  { value: 'back_fat', label: 'Back Fat' },
  { value: 'banana_roll', label: 'Banana Roll' }
];

const AdminCoolsculptingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('coolsculpting_gallery')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      toast({ variant: "destructive", title: "Fetch Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result? This action cannot be undone.")) return;
    
    setDeleteLoading(id);
    try {
      const { error } = await supabase.from('coolsculpting_gallery').delete().eq('id', id);
      if (error) throw error;
      
      toast({ title: "Deleted", description: "Result removed successfully." });
      setItems(prev => prev.filter(i => i.id !== id));
    } catch (error) {
      toast({ variant: "destructive", title: "Delete Error", description: error.message });
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    try {
        const { error } = await supabase.from('coolsculpting_gallery').update({
            title: editingItem.title,
            body_area: editingItem.body_area,
            before_image_url: editingItem.before_image_url,
            after_image_url: editingItem.after_image_url
        }).eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Item updated successfully" });
        setEditingItem(null);
        fetchItems();
    } catch (err) {
        toast({ variant: "destructive", title: "Update Error", description: err.message });
    } finally {
        setUpdateLoading(false);
    }
  };

  // Group items by body area for display
  const groupedItems = items.reduce((acc, item) => {
    const area = item.body_area || 'other';
    if (!acc[area]) acc[area] = [];
    acc[area].push(item);
    return acc;
  }, {});

  const formFields = [
    { 
      name: 'title', 
      label: 'Patient Title / ID', 
      type: 'text', 
      placeholder: 'e.g. Patient #142', 
      required: true 
    },
    { 
      name: 'body_area', 
      label: 'Body Area', 
      type: 'select', 
      options: BODY_AREAS, 
      required: true,
      defaultValue: BODY_AREAS[0].value
    },
    { 
      name: 'before_image_url', 
      label: 'Before Image', 
      type: 'image', 
      required: true 
    },
    { 
      name: 'after_image_url', 
      label: 'After Image', 
      type: 'image', 
      required: true 
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">CoolSculpting Manager</h1>
          <p className="text-gray-500 mt-1">Manage interactive body map content</p>
        </div>
        <Button variant="outline" onClick={fetchItems} disabled={loading}><Loader2 className="w-4 h-4 mr-2" /> Refresh</Button>
      </div>

      {/* Reusable Add Form */}
      <AddResultForm 
        title="Add New Result" 
        icon={Snowflake}
        tableName="coolsculpting_gallery"
        fields={formFields}
        onSuccess={fetchItems}
      />

      {/* Gallery */}
      <div className="space-y-8">
        {Object.keys(groupedItems).map(area => (
            <div key={area} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                 <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex justify-between">
                    {BODY_AREAS.find(a => a.value === area)?.label || area}
                    <span className="text-gray-400 text-sm font-normal">{groupedItems[area].length} items</span>
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedItems[area].map(item => (
                        <div key={item.id} className="border rounded-xl overflow-hidden group hover:shadow-lg transition-all">
                             <div className="grid grid-cols-2 h-40">
                                 <img src={item.before_image_url} className="w-full h-full object-cover" alt="Before" />
                                 <img src={item.after_image_url} className="w-full h-full object-cover" alt="After" />
                             </div>
                             <div className="p-3">
                                 <h4 className="font-bold text-sm truncate">{item.title}</h4>
                                 <div className="flex justify-end gap-2 mt-3">
                                     <Button size="sm" variant="ghost" onClick={() => setEditingItem(item)} className="h-8 w-8 p-0"><Pencil className="w-4 h-4" /></Button>
                                     <Button size="sm" variant="ghost" onClick={() => handleDelete(item.id)} className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50">
                                         {deleteLoading === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                     </Button>
                                 </div>
                             </div>
                        </div>
                    ))}
                 </div>
            </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Result"
        className="max-w-2xl"
      >
        {editingItem && (
             <form id="edit-form" onSubmit={handleUpdate} className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Before Image</label>
                        <ImageUpload 
                            value={editingItem.before_image_url} 
                            onChange={val => setEditingItem({...editingItem, before_image_url: val})} 
                            className="h-40" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">After Image</label>
                        <ImageUpload 
                            value={editingItem.after_image_url} 
                            onChange={val => setEditingItem({...editingItem, after_image_url: val})} 
                            className="h-40" 
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                            className="w-full border rounded-lg p-3" 
                            value={editingItem.title} 
                            onChange={e => setEditingItem({...editingItem, title: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Body Area</label>
                        <select 
                            className="w-full border rounded-lg p-3 bg-white" 
                            value={editingItem.body_area} 
                            onChange={e => setEditingItem({...editingItem, body_area: e.target.value})}
                        >
                             {BODY_AREAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 mt-2">
                    <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                    <Button type="submit" disabled={updateLoading} className="bg-blue-600 text-white min-w-[120px]">
                       {updateLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />} 
                       Save Changes
                    </Button>
                </div>
             </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminCoolsculptingPage;