import React, { useState } from 'react';
import { useServiceDetails } from '@/hooks/useServiceDetails';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2, Save, X, RefreshCw, Image as ImageIcon } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import ImageUpload from '@/components/ui/ImageUpload';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AdminServiceDetailsPage = () => {
  const { createServiceDetail, updateServiceDetail, deleteServiceDetail } = useServiceDetails();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const { toast } = useToast();

  // Real-time synchronization
  const { data: items, loading, refresh } = useRealtimeSync('service_details', {
    orderBy: { column: 'title', ascending: true }
  });
  
  // Form State
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    full_content: '',
    pricing: '',
    image_url: '', 
    before_image_url: '',
    after_image_url: '',
    benefits: [], 
    process_steps: [], 
    faqs: []
  });

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        slug: item.slug || '',
        title: item.title || '',
        description: item.description || '',
        full_content: item.full_content || '',
        pricing: item.pricing || '',
        image_url: item.image_url || '',
        before_image_url: item.before_image_url || '',
        after_image_url: item.after_image_url || '',
        benefits: Array.isArray(item.benefits) ? item.benefits : [],
        process_steps: Array.isArray(item.process_steps) ? item.process_steps : [],
        faqs: Array.isArray(item.faqs) ? item.faqs : []
      });
    } else {
      setEditingItem(null);
      setFormData({
        slug: '',
        title: '',
        description: '',
        full_content: '',
        pricing: '',
        image_url: '',
        before_image_url: '',
        after_image_url: '',
        benefits: [],
        process_steps: [],
        faqs: []
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.slug || !formData.title) {
        toast({variant: "destructive", title: "Missing Fields", description: "Title and Slug are required."});
        return;
    }

    try {
      if (editingItem) {
        await updateServiceDetail(editingItem.id, formData);
      } else {
        await createServiceDetail(formData);
      }
      
      toast({title: "Success", description: "Service details saved successfully."});
      setIsFormOpen(false);
      // Refresh handled by subscription
    } catch (err) {
       console.error("Submission error:", err);
       toast({variant: "destructive", title: "Error", description: "Failed to save details."});
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this page?')) {
      await deleteServiceDetail(id);
      // Refresh handled by subscription
    }
  };

  // Helper arrays
  const addBenefit = () => setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ""] }));
  const updateBenefit = (idx, val) => {
      const newBenefits = [...formData.benefits];
      newBenefits[idx] = val;
      setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };
  const removeBenefit = (idx) => {
      const newBenefits = formData.benefits.filter((_, i) => i !== idx);
      setFormData(prev => ({ ...prev, benefits: newBenefits }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold font-playfair text-gray-900">Service Details Pages</h1>
           <p className="text-gray-500">Manage rich content, hero images, and before/after galleries for specific services.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={refresh}><RefreshCw className="w-4 h-4"/></Button>
            <Button onClick={() => handleOpenForm()}>
               <Plus className="mr-2 h-4 w-4" /> Add New Detail Page
            </Button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-medium">Hero Image</th>
              <th className="p-4 font-medium">Page Title</th>
              <th className="p-4 font-medium">Slug</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items?.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-4">
                  {item.image_url ? (
                    <img src={item.image_url} alt="" className="w-16 h-10 object-cover rounded border border-gray-200" />
                  ) : (
                    <div className="w-16 h-10 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                  )}
                </td>
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4 font-mono text-sm text-gray-500">{item.slug}</td>
                <td className="p-4 text-right space-x-2">
                   <Button variant="ghost" size="sm" onClick={() => handleOpenForm(item)}><Pencil className="w-4 h-4" /></Button>
                   <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
            {items?.length === 0 && !loading && <tr><td colSpan={4} className="p-8 text-center text-gray-500">No pages found.</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title={editingItem ? "Edit Detail Page" : "Add Detail Page"} className="max-w-4xl h-[90vh]">
         <form onSubmit={handleSubmit} className="space-y-6 p-1 overflow-y-auto h-full pb-20">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Page Title</label>
                    <input required className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Laser Hair Removal Delhi" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-900">Slug (URL Path)</label>
                    <input required className="w-full p-2 border rounded-md font-mono bg-gray-50" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. laser-hair-removal-delhi" />
                </div>
            </div>

            {/* Images Section */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-200 pb-2">
                   <ImageIcon className="w-5 h-5" /> Page Images
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold block text-gray-700">Hero Banner Image</label>
                        <ImageUpload 
                            label=""
                            value={formData.image_url} 
                            onChange={url => setFormData(prev => ({...prev, image_url: url}))} 
                        />
                        <p className="text-xs text-gray-500">Top large banner image (1920x600px)</p>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-semibold block text-gray-700">Before Image</label>
                        <ImageUpload 
                            label=""
                            value={formData.before_image_url} 
                            onChange={url => setFormData(prev => ({...prev, before_image_url: url}))} 
                        />
                        <p className="text-xs text-gray-500">Left side of comparison</p>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-semibold block text-gray-700">After Image</label>
                        <ImageUpload 
                            label=""
                            value={formData.after_image_url} 
                            onChange={url => setFormData(prev => ({...prev, after_image_url: url}))} 
                        />
                        <p className="text-xs text-gray-500">Right side of comparison</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">Short Description (Hero Text)</label>
                <textarea className="w-full p-2 border rounded-md" rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">Full Content / About</label>
                <textarea className="w-full p-2 border rounded-md font-mono text-sm" rows={8} value={formData.full_content} onChange={e => setFormData({...formData, full_content: e.target.value})} placeholder="Detailed description of the service..." />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-gray-900">Pricing Text</label>
                <input className="w-full p-2 border rounded-md" value={formData.pricing} onChange={e => setFormData({...formData, pricing: e.target.value})} placeholder="e.g. Starts at ₹2,999" />
            </div>

            {/* Benefits Array */}
            <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between items-center">
                    <label className="text-sm font-bold">Benefits</label>
                    <Button type="button" size="sm" variant="outline" onClick={addBenefit}><Plus className="w-4 h-4 mr-1"/> Add Benefit</Button>
                </div>
                {formData.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2">
                        <input className="flex-1 p-2 border rounded-md" value={benefit} onChange={e => updateBenefit(idx, e.target.value)} placeholder="Benefit description" />
                        <Button type="button" size="icon" variant="ghost" onClick={() => removeBenefit(idx)}><X className="w-4 h-4"/></Button>
                    </div>
                ))}
            </div>

            <div className="sticky bottom-0 bg-white pt-4 border-t flex justify-end gap-2 z-10">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button type="submit"><Save className="mr-2 h-4 w-4" /> Save Page</Button>
            </div>
         </form>
      </Modal>
    </div>
  );
};

export default AdminServiceDetailsPage;