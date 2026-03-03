import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2, Save, Zap, RefreshCw, X } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import Modal from '@/components/ui/Modal';
import ImageModal from '@/components/ui/ImageModal';

const AdminAdvancedTechnologyPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState(null);
  
  // Image Preview
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Zap',
    image_url: '',
    order: 0
  });

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('advanced_technology')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching technology items:", error);
      setError("Failed to load items. Check your connection or database policies.");
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      
      const { data, error } = editingItem 
        ? await supabase.from('advanced_technology').update(payload).eq('id', editingItem.id).select()
        : await supabase.from('advanced_technology').insert([payload]).select();

      if (error) throw error;

      toast({ title: "Success", description: `Technology ${editingItem ? 'updated' : 'added'} successfully` });
      setIsFormOpen(false);
      setEditingItem(null);
      resetForm();
      fetchItems();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const { error } = await supabase.from('advanced_technology').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Item removed successfully" });
      fetchItems();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', icon: 'Zap', image_url: '', order: 0 });
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      icon: item.icon || 'Zap',
      image_url: item.image_url || '',
      order: item.order || 0
    });
    setIsFormOpen(true);
  };

  const openPreview = (url, title) => {
    if (!url) return;
    setPreviewImage(url);
    setPreviewTitle(title);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-gray-900 dark:text-white">Advanced Technology</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your clinic's equipment showcase</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" onClick={fetchItems}>
             <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
           </Button>
           <Button onClick={() => { resetForm(); setEditingItem(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700">
             <Plus className="mr-2 h-4 w-4" /> Add New
           </Button>
        </div>
      </div>

      {error && (
         <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={fetchItems}>Retry</Button>
         </div>
      )}

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingItem ? 'Edit Technology' : 'Add Technology'} className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <input required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Alma Soprano Titanium"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon Name (Lucide)</label>
                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} placeholder="e.g. Zap, Snowflake, Sun"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the technology and its benefits..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Device Image</label>
              <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} />
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="mr-2 h-4 w-4" /> Save</Button>
            </div>
          </form>
      </Modal>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full group hover:shadow-md transition-shadow">
               <div className="w-full h-48 bg-gray-100 dark:bg-gray-900 relative cursor-pointer group-hover:opacity-90 transition-opacity" onClick={() => openPreview(item.image_url, item.title)}>
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400">
                      <Zap className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                     <span className="text-xs font-mono">{item.icon}</span>
                  </div>
               </div>
               
               <div className="flex-1 p-4 flex flex-col">
                  <div className="flex-1 mb-4">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">{item.description}</p>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(item)}><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4" /></Button>
                  </div>
               </div>
            </div>
          ))}

           {/* Add New Card (Empty State) */}
           <button 
             onClick={() => { resetForm(); setEditingItem(null); setIsFormOpen(true); }}
             className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors min-h-[192px]"
           >
              <Plus className="w-10 h-10 mb-2" />
              <span className="font-medium">Add New Technology</span>
           </button>
        </div>
      )}

      {items.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No technologies added yet.</p>
        </div>
      )}

      <ImageModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={previewImage}
        title={previewTitle}
      />
    </div>
  );
};

export default AdminAdvancedTechnologyPage;