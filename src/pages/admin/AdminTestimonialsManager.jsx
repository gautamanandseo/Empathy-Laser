import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2, Save, MessageSquare, Star, ArrowUp, ArrowDown } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import ImageUpload from '@/components/ui/ImageUpload';

const AdminTestimonialsManager = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const { data: items, loading, refresh } = useRealtimeSync('testimonials', {
    orderBy: { column: 'order', ascending: true }
  });

  const [formData, setFormData] = useState({
    name: '',
    content: '',
    image_url: '',
    rating: 5,
    order: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      
      const { data, error } = editingItem 
        ? await supabase.from('testimonials').update(payload).eq('id', editingItem.id).select()
        : await supabase.from('testimonials').insert([payload]).select();

      if (error) throw error;

      toast({ title: "Success", description: `Testimonial ${editingItem ? 'updated' : 'added'} successfully` });
      setIsFormOpen(false);
      setEditingItem(null);
      resetForm();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Testimonial removed" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', content: '', image_url: '', rating: 5, order: 0 });
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      content: item.content || '',
      image_url: item.image_url || '',
      rating: item.rating || 5,
      order: item.order || 0
    });
    setIsFormOpen(true);
  };

  const moveItem = async (item, direction) => {
      if (!items) return;
      const index = items.findIndex(i => i.id === item.id);
      if (index === -1) return;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= items.length) return;

      const swapItem = items[newIndex];

      try {
          await supabase.from('testimonials').update({ order: swapItem.order }).eq('id', item.id);
          await supabase.from('testimonials').update({ order: item.order }).eq('id', swapItem.id);
      } catch (e) {
          console.error("Reorder failed", e);
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-gray-900">Testimonials Management</h1>
          <p className="text-gray-500">Manage customer reviews and success stories</p>
        </div>
        <Button onClick={() => { resetForm(); setEditingItem(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingItem ? 'Edit Testimonial' : 'Add Testimonial'} className="max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Customer Name</label>
                <input required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Rating (1-5)</label>
                    <input type="number" min="1" max="5" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Order</label>
                    <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Content / Review</label>
                <textarea required className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Customer Image</label>
                <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="mr-2 h-4 w-4" /> Save</Button>
            </div>
          </form>
      </Modal>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {items?.map((item, idx) => (
             <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                <div className="p-6 flex-1 flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xl">{item.name.charAt(0)}</div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-900">{item.name}</h3>
                            <div className="flex text-yellow-400">
                                {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-2 italic">"{item.content}"</p>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2 justify-between items-center">
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" disabled={idx === 0} onClick={() => moveItem(item, 'up')} className="h-8 w-8 text-gray-400 hover:text-gray-600">
                            <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled={idx === items.length - 1} onClick={() => moveItem(item, 'down')} className="h-8 w-8 text-gray-400 hover:text-gray-600">
                            <ArrowDown className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => openEdit(item)} className="hover:text-blue-600"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                </div>
             </div>
           ))}
           
           <button 
             onClick={() => { resetForm(); setEditingItem(null); setIsFormOpen(true); }}
             className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors min-h-[150px]"
           >
              <Plus className="w-10 h-10 mb-2" />
              <span className="font-medium">Add New Testimonial</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialsManager;