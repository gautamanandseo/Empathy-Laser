import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2, RefreshCw, Image as ImageIcon, Save, ExternalLink } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import ImageUpload from '@/components/ui/ImageUpload';
import ImageModal from '@/components/ui/ImageModal';

const AdminServicesManagementPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Image Preview State
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    image_url: '', // Main Service Card Image (Thumbnail)
    order: 0,
    price: '',
    is_premium: false
  });

  const { toast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      console.log('Fetching services from Supabase...');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order', { ascending: true });
      
      if (error) throw error;
      setItems(data || []);
      console.log('Services loaded successfully:', data?.length, 'items');
    } catch (error) {
      console.error('Error fetching services:', error);
      toast({ variant: "destructive", title: "Fetch Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleOpenForm = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title || '',
        slug: item.slug || '',
        description: item.description || '',
        image_url: item.image_url || '',
        order: item.order || 0,
        price: item.price || '',
        is_premium: item.is_premium || false
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        slug: '',
        description: '',
        image_url: '',
        order: items.length + 1,
        price: '',
        is_premium: false
      });
    }
    setIsFormOpen(true);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
        ...prev, 
        title: newTitle,
        // Only auto-update slug if we are creating a new item or slug was empty
        slug: (!editingItem || !prev.slug) ? generateSlug(newTitle) : prev.slug
    }));
  };

  // Dedicated handler for image updates with comprehensive verification
  const handleImageChange = async (url) => {
    console.log('🖼️ START: Main image updated from upload component:', url);
    
    // 1. Update form state immediately so UI shows preview
    setFormData(prev => ({...prev, image_url: url}));

    // 2. IMMEDIATE SAVE LOGIC: If we are editing an existing item
    if (editingItem && editingItem.id) {
        if (!url) {
            console.log('⚠️ URL is empty, skipping auto-save (waiting for valid upload)');
            return;
        }

        try {
            console.log(`🔄 Auto-saving image for service ID: ${editingItem.id}`);
            
            // EXECUTION: Directly updates the database with the new URL
            const updateResult = await supabase
                .from('services')
                .update({ image_url: url })
                .eq('id', editingItem.id)
                .select();
            
            if (updateResult.error) {
                console.error("❌ Database UPDATE failed:", updateResult.error);
                throw updateResult.error;
            }
            
            console.log('✅ UPDATE query successful. Result:', updateResult.data);

            // 3. VERIFICATION: Query the database again to ensure persistence
            console.log('🔍 VERIFYING database persistence...');
            const verificationResult = await supabase
                .from('services')
                .select('image_url')
                .eq('id', editingItem.id)
                .single();
                
            if (verificationResult.error) {
                 console.error("❌ Verification SELECT failed:", verificationResult.error);
                 throw new Error("Could not verify image save: " + verificationResult.error.message);
            }

            const savedUrl = verificationResult.data.image_url;
            console.log(`📊 Verification Result - Expected: ${url.substring(0, 30)}... | Actual: ${savedUrl?.substring(0, 30)}...`);

            if (savedUrl === url) {
                toast({
                    title: "Image Saved & Verified",
                    description: "Image successfully persisted to database.",
                    className: "bg-green-50 border-green-200 text-green-800"
                });
            } else {
                console.error("❌ Verification MISMATCH! Database returned:", savedUrl);
                throw new Error("Database verification failed. Image might not be saved.");
            }
            
            // 4. Refresh the background list to ensure consistency across the UI
            await fetchItems();

        } catch (err) {
            console.error("❌ Auto-save image process failed:", err);
            toast({
                variant: "destructive", 
                title: "Save Failed", 
                description: `Could not save image: ${err.message || 'Unknown error'}`
            });
        }
    } else {
        console.log('📝 New item - image saved to state only. Will persist on full form submit.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const finalSlug = formData.slug || generateSlug(formData.title);
    
    // Explicitly select fields to save, ensuring image_url is included from current state
    const dataToSubmit = { 
        title: formData.title,
        slug: finalSlug,
        description: formData.description,
        image_url: formData.image_url, 
        order: formData.order,
        price: formData.price,
        is_premium: formData.is_premium
    };

    console.log('💾 Submitting Service Data Payload:', dataToSubmit);

    try {
      let result;
      if (editingItem) {
        console.log('🔄 Updating existing service:', editingItem.id);
        result = await supabase
          .from('services')
          .update(dataToSubmit)
          .eq('id', editingItem.id)
          .select();
        
        if (result.error) throw result.error;
        toast({ title: "Success", description: "Service updated successfully" });
      } else {
        console.log('➕ Creating new service...');
        result = await supabase
          .from('services')
          .insert([dataToSubmit])
          .select();
        
        if (result.error) throw result.error;
        toast({ title: "Success", description: "Service added successfully" });
      }
      
      console.log('✅ Save operation result:', result.data);
      setIsFormOpen(false);
      await fetchItems(); // Refresh list to show changes
    } catch (error) {
      console.error('❌ Submit Error:', error);
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Service removed successfully" });
      fetchItems();
    } catch (error) {
      toast({ variant: "destructive", title: "Delete Failed", description: error.message });
    }
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
          <h1 className="text-3xl font-bold font-playfair text-gray-900">Services Management (Cards)</h1>
          <p className="text-sm text-gray-500">Manage the main service cards displayed on the homepage.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={fetchItems} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={() => handleOpenForm()}>
                <Plus className="mr-2 h-4 w-4" /> Add New Service
            </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-gray-400" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 font-medium text-gray-500">Card Image</th>
                  <th className="p-4 font-medium text-gray-500">Service Title</th>
                  <th className="p-4 font-medium text-gray-500">Slug</th>
                  <th className="p-4 font-medium text-gray-500">Price</th>
                  <th className="p-4 font-medium text-gray-500">Order</th>
                  <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="p-4">
                      {item.image_url ? (
                        <div 
                          className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 cursor-pointer border border-gray-200 hover:opacity-80 transition-opacity shadow-sm"
                          onClick={() => openPreview(item.image_url, item.title)}
                        >
                          <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-md bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      <div className="flex flex-col">
                        <span className="text-base">{item.title}</span>
                        {item.is_premium && <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold w-fit mt-1 border border-amber-200">FEATURED</span>}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500 font-mono max-w-[150px] truncate" title={item.slug}>
                        {item.slug ? (
                            <a href={`/services/${item.slug}`} target="_blank" rel="noreferrer" className="flex items-center hover:text-blue-600 hover:underline">
                                {item.slug} <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        ) : '-'}
                    </td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{item.price || '-'}</td>
                    <td className="p-4 text-gray-500">{item.order}</td>
                    <td className="p-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenForm(item)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                    <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-500">No services found. Add one above!</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Service Form Modal */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        title={editingItem ? "Edit Service Card" : "Add New Service Card"}
        className="max-w-4xl"
      >
         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Text Inputs */}
              <div className="lg:col-span-2 space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Service Title</label>
                    <input required className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.title} onChange={handleTitleChange} placeholder="e.g. Laser Hair Removal" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Slug (URL)</label>
                    <input className="w-full p-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-mono text-sm" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="auto-generated-from-title" />
                    <p className="text-xs text-gray-500">Will be accessible at: domain.com/services/<b>{formData.slug || '...'}</b></p>
                  </div>
                  
                   <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Display Price</label>
                    <input className="w-full p-2.5 border border-gray-300 rounded-lg" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="e.g. Starts from ₹1500" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Order Index</label>
                        <input type="number" className="w-full p-2.5 border border-gray-300 rounded-lg" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} />
                      </div>
                      <div className="flex items-center space-x-3 pt-8">
                         <input 
                            type="checkbox" 
                            id="is_premium"
                            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={formData.is_premium} 
                            onChange={e => setFormData({...formData, is_premium: e.target.checked})} 
                         />
                         <label htmlFor="is_premium" className="text-sm font-medium text-gray-900 cursor-pointer">Featured / Premium</label>
                      </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900">Card Description</label>
                    <textarea className="w-full p-2.5 border border-gray-300 rounded-lg resize-none" rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Short summary displayed on the card..." />
                  </div>
              </div>

              {/* Right Column: Image Upload */}
              <div className="space-y-4">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                     <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" /> Service Card Image
                     </h3>
                     
                     <div className="space-y-3">
                       <ImageUpload 
                          label=""
                          value={formData.image_url} 
                          onChange={handleImageChange} 
                       />
                       <div className="text-xs text-gray-500 space-y-1">
                          <p>• Displayed on Homepage Cards</p>
                          <p>• Recommended: 600x400px (Landscape)</p>
                          <p>• Max size: 5MB</p>
                       </div>
                     </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                     <p>Looking to edit detailed images like <b>Before/After</b> or <b>Hero Banners</b>?</p>
                     <Button 
                        variant="link" 
                        className="p-0 h-auto font-bold text-blue-700 mt-1" 
                        onClick={() => window.location.href = '/admin/service-details'}
                     >
                        Go to Service Details →
                     </Button>
                  </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-3 border-t mt-4">
               <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} className="px-6">Cancel</Button>
               <Button type="submit" disabled={submitting} className="px-6 bg-gray-900 hover:bg-black">
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Service
               </Button>
            </div>
         </form>
      </Modal>

      <ImageModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        imageUrl={previewImage}
        title={previewTitle}
      />
    </div>
  );
};

export default AdminServicesManagementPage;