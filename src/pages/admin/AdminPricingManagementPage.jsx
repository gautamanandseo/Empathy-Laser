import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2, Save, CreditCard, ArrowUp, ArrowDown } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AdminPricingManagementPage = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  // Real-time synchronization
  const { data: items, loading, refresh } = useRealtimeSync('pricing_plans', {
    orderBy: { column: 'order', ascending: true }
  });

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    features: '', 
    order: 0
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert newline separated features to array
      const featuresArray = formData.features.split('\n').filter(line => line.trim() !== '');
      
      const payload = {
          ...formData,
          features: featuresArray
      };

      const { data, error } = editingItem 
        ? await supabase.from('pricing_plans').update(payload).eq('id', editingItem.id).select()
        : await supabase.from('pricing_plans').insert([payload]).select();

      if (error) throw error;

      toast({ title: "Success", description: `Plan ${editingItem ? 'updated' : 'added'} successfully` });
      setIsFormOpen(false);
      setEditingItem(null);
      resetForm();
      // Refresh managed by subscription
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;
    try {
      const { error } = await supabase.from('pricing_plans').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Plan removed" });
      // Refresh managed by subscription
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', features: '', order: 0 });
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      price: item.price || '',
      description: item.description || '',
      features: Array.isArray(item.features) ? item.features.join('\n') : '',
      order: item.order || 0
    });
    setIsFormOpen(true);
  };

  const moveItem = async (item, direction) => {
      // Simplified move logic: swap order with adjacent item
      // In a real production app, we might want more robust reordering
      if (!items) return;
      const index = items.findIndex(i => i.id === item.id);
      if (index === -1) return;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= items.length) return;

      const swapItem = items[newIndex];

      // Swap orders
      try {
          await supabase.from('pricing_plans').update({ order: swapItem.order }).eq('id', item.id);
          await supabase.from('pricing_plans').update({ order: item.order }).eq('id', swapItem.id);
          // Realtime should update UI
      } catch (e) {
          console.error("Reorder failed", e);
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-gray-900">Pricing Management</h1>
          <p className="text-gray-500">Manage your treatment packages and prices</p>
        </div>
        <Button onClick={() => { resetForm(); setEditingItem(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add Plan
        </Button>
      </div>

      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingItem ? 'Edit Plan' : 'Add Plan'} className="max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Plan Name</label>
                <input required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Basic Package"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (Number)</label>
                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. 2999"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Order</label>
                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Brief description of the package" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Features (One per line)</label>
              <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} placeholder="Full Body Laser&#10;3 Sessions&#10;Free Consultation" />
              <p className="text-xs text-gray-500">Each line will become a bullet point.</p>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white"><Save className="mr-2 h-4 w-4" /> Save Plan</Button>
            </div>
          </form>
      </Modal>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin h-10 w-10 text-blue-600" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {items?.map((item, idx) => (
             <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                     <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                       <CreditCard className="w-5 h-5" />
                     </div>
                     <div className="text-right">
                       <span className="block text-2xl font-bold text-gray-900">₹{item.price}</span>
                     </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Features</p>
                    {Array.isArray(item.features) && item.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                    {Array.isArray(item.features) && item.features.length > 3 && (
                      <p className="text-xs text-gray-400 mt-1">+ {item.features.length - 3} more</p>
                    )}
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
           
           {/* Add New Card (Empty State) */}
           <button 
             onClick={() => { resetForm(); setEditingItem(null); setIsFormOpen(true); }}
             className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors min-h-[300px]"
           >
              <Plus className="w-10 h-10 mb-2" />
              <span className="font-medium">Add New Pricing Plan</span>
           </button>
        </div>
      )}
    </div>
  );
};

export default AdminPricingManagementPage;