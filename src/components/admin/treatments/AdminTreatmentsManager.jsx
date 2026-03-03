import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useTreatmentsData } from '@/hooks/useTreatmentsData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AdminTreatmentsManager = () => {
  const { useTreatmentsRealtime } = useTreatmentsData();
  const { data: treatments, loading, refresh } = useTreatmentsRealtime();
  const { toast } = useToast();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image_url: '',
    price_range: '',
    duration: '',
    benefits: [], // Array of strings
    process: [] // Array of { title, description }
  });

  const handleEdit = (treatment) => {
    setEditingId(treatment.id);
    setFormData({
      name: treatment.name,
      slug: treatment.slug,
      description: treatment.description || '',
      image_url: treatment.image_url || '',
      price_range: treatment.price_range || '',
      duration: treatment.duration || '',
      benefits: Array.isArray(treatment.benefits) ? treatment.benefits : [],
      process: Array.isArray(treatment.process) ? treatment.process : []
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image_url: '',
      price_range: '',
      duration: '',
      benefits: [],
      process: []
    });
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const { error } = await supabase
          .from('treatments')
          .update(formData)
          .eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Success', description: 'Treatment updated successfully.' });
      } else {
        const { error } = await supabase
          .from('treatments')
          .insert([formData]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Treatment created successfully.' });
      }
      refresh();
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will delete all details and FAQs too.")) return;
    try {
      const { error } = await supabase.from('treatments').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Deleted', description: 'Treatment deleted successfully.' });
      refresh();
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  // Helper for Benefits Array
  const addBenefit = () => setFormData({ ...formData, benefits: [...formData.benefits, ''] });
  const updateBenefit = (idx, val) => {
    const newBenefits = [...formData.benefits];
    newBenefits[idx] = val;
    setFormData({ ...formData, benefits: newBenefits });
  };
  const removeBenefit = (idx) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== idx);
    setFormData({ ...formData, benefits: newBenefits });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Treatments</h2>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>

      {loading ? <Loader2 className="animate-spin" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map(t => (
            <div key={t.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="font-bold text-lg">{t.name}</h3>
                 <div className="flex gap-2">
                   <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}><Edit2 className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(t.id)}><Trash2 className="w-4 h-4" /></Button>
                 </div>
               </div>
               <p className="text-sm text-gray-500 mb-2">/{t.slug}</p>
               <p className="text-sm line-clamp-2 text-gray-600">{t.description}</p>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Treatment' : 'Add New Treatment'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium">Name</label>
                 <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Acne Treatment" />
               </div>
               <div>
                 <label className="text-sm font-medium">Slug (URL)</label>
                 <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="acne-treatment" />
               </div>
            </div>
            <div>
               <label className="text-sm font-medium">Description</label>
               <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
            </div>
            <div>
               <label className="text-sm font-medium">Image URL</label>
               <Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="text-sm font-medium">Price Range</label>
                 <Input value={formData.price_range} onChange={e => setFormData({...formData, price_range: e.target.value})} placeholder="$100 - $500" />
               </div>
               <div>
                 <label className="text-sm font-medium">Duration</label>
                 <Input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="45 mins" />
               </div>
            </div>

            {/* Benefits Manager */}
            <div className="border p-4 rounded-lg bg-gray-50">
               <div className="flex justify-between mb-2">
                 <label className="font-bold text-sm">Benefits List</label>
                 <Button size="sm" variant="outline" onClick={addBenefit}><Plus className="w-3 h-3" /></Button>
               </div>
               <div className="space-y-2">
                 {formData.benefits.map((b, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input value={typeof b === 'string' ? b : b.title} onChange={e => updateBenefit(idx, e.target.value)} placeholder="Benefit..." />
                      <Button size="icon" variant="ghost" onClick={() => removeBenefit(idx)}><X className="w-4 h-4" /></Button>
                    </div>
                 ))}
               </div>
            </div>

            <Button onClick={handleSave} className="w-full">{editingId ? 'Update' : 'Create'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTreatmentsManager;