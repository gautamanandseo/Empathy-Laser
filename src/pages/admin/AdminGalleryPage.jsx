import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Pencil, Trash2, RefreshCw, Loader2, UploadCloud, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';
import Modal from '@/components/ui/Modal';
import AddResultForm from '@/components/admin/AddResultForm';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const CATEGORIES = ['Laser Hair Removal', 'Skin Rejuvenation', 'Coolsculpting', 'Acne Treatment', 'Anti-Aging', 'Other'];

const AdminGalleryPage = () => {
  const [editingItem, setEditingItem] = useState(null);
  const { toast } = useToast();

  // Real-time synchronization
  const { data: items, loading, refresh } = useRealtimeSync('before_after_gallery', {
    orderBy: { column: 'created_at', ascending: false }
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image pair? This cannot be undone.")) return;

    try {
      const { error } = await supabase.from('before_after_gallery').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Item removed successfully" });
      // Refresh handled by real-time subscription
    } catch (error) {
      toast({ variant: "destructive", title: "Delete failed", description: error.message });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      const { error } = await supabase
        .from('before_after_gallery')
        .update({
          title: editingItem.title,
          category: editingItem.category,
          description: editingItem.description,
          before_image_url: editingItem.before_image_url,
          after_image_url: editingItem.after_image_url
        })
        .eq('id', editingItem.id);

      if (error) throw error;

      toast({ title: "Updated", description: "Item updated successfully" });
      setEditingItem(null);
    } catch (error) {
      toast({ variant: "destructive", title: "Update failed", description: error.message });
    }
  };

  const formFields = [
    { name: 'title', label: 'Title', type: 'text', placeholder: 'e.g. Full Face Laser Treatment', required: true },
    { name: 'category', label: 'Category', type: 'select', options: CATEGORIES, required: true, defaultValue: CATEGORIES[0] },
    { name: 'description', label: 'Description (Optional)', type: 'textarea', placeholder: 'Details about the procedure...' },
    { name: 'before_image_url', label: 'Before Image', type: 'image', required: true },
    { name: 'after_image_url', label: 'After Image', type: 'image', required: true }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Gallery Manager</h1>
          <p className="text-gray-500 mt-1">Upload and manage before & after photos</p>
        </div>
        <Button variant="outline" onClick={refresh} className="gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      {/* Add New Section */}
      <AddResultForm 
        title="Add New Gallery Item" 
        icon={UploadCloud}
        tableName="before_after_gallery"
        fields={formFields}
        onSuccess={refresh}
      />

      {/* Gallery List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Existing Items ({items?.length || 0})</h2>
        </div>
        
        {loading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : items?.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No items found. Add your first gallery item above.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {items?.map(item => (
              <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden group hover:shadow-lg transition-shadow bg-gray-50">
                <div className="grid grid-cols-2 border-b border-gray-200">
                   <div className="relative aspect-square bg-gray-100">
                      <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">Before</span>
                      <img src={item.before_image_url} alt="Before" className="w-full h-full object-cover" />
                   </div>
                   <div className="relative aspect-square bg-gray-100">
                      <span className="absolute top-2 left-2 bg-blue-600/80 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">After</span>
                      <img src={item.after_image_url} alt="After" className="w-full h-full object-cover" />
                   </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold mb-1">{item.category}</span>
                      <h3 className="font-bold text-gray-900 line-clamp-1" title={item.title}>{item.title}</h3>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-200">
                    <Button size="sm" variant="outline" onClick={() => setEditingItem(item)} className="text-gray-600">
                      <Pencil className="w-4 h-4 mr-1" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="bg-red-50 text-red-600 hover:bg-red-100 border-red-100">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Gallery Item"
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
                  <input 
                    className="w-full border rounded p-2 text-xs mt-2" 
                    value={editingItem.before_image_url} 
                    onChange={e => setEditingItem({...editingItem, before_image_url: e.target.value})}
                    placeholder="or Paste URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">After Image</label>
                  <ImageUpload 
                    value={editingItem.after_image_url} 
                    onChange={val => setEditingItem({...editingItem, after_image_url: val})}
                    className="h-40"
                  />
                  <input 
                    className="w-full border rounded p-2 text-xs mt-2" 
                    value={editingItem.after_image_url} 
                    onChange={e => setEditingItem({...editingItem, after_image_url: e.target.value})}
                    placeholder="or Paste URL"
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
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    className="w-full border rounded-lg p-3 bg-white" 
                    value={editingItem.category} 
                    onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    className="w-full border rounded-lg p-3 h-24 resize-none" 
                    value={editingItem.description || ''} 
                    onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 mt-2">
                <Button type="button" variant="outline" onClick={() => setEditingItem(null)}>Cancel</Button>
                <Button type="submit" className="bg-blue-600 text-white min-w-[120px]">
                   <Save className="w-4 h-4 mr-2" /> Save Changes
                </Button>
              </div>
            </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminGalleryPage;