import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Plus, Pencil, Trash2, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useInstagramFeed from '@/hooks/useInstagramFeed';
import ImageEditModal from '@/components/admin/ImageEditModal';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminInstagramFeedPage = () => {
  const { images, loading, fetchImages, addImage, updateImage, deleteImage } = useInstagramFeed();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  
  // Section Text State
  const [sectionData, setSectionData] = useState({ title: '', description: '' });
  const [sectionLoading, setSectionLoading] = useState(true);
  const [sectionSaving, setSectionSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
    fetchSectionData();
  }, [fetchImages]);

  const fetchSectionData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_sections')
        .select('*')
        .eq('section_key', 'instagram_feed')
        .single();
      
      if (data) {
        setSectionData({ title: data.title || '', description: data.description || '' });
      } else {
        setSectionData({ title: 'Follow Our Journey', description: 'See real results on Instagram' });
      }
    } catch (error) {
      console.error('Error fetching section data:', error);
    } finally {
      setSectionLoading(false);
    }
  };

  const handleSectionSave = async (e) => {
    e.preventDefault();
    setSectionSaving(true);
    try {
      const { data: existing } = await supabase
        .from('admin_sections')
        .select('id')
        .eq('section_key', 'instagram_feed')
        .maybeSingle();

      if (existing) {
        await supabase
          .from('admin_sections')
          .update({ ...sectionData, updated_at: new Date().toISOString() })
          .eq('section_key', 'instagram_feed');
      } else {
        await supabase
          .from('admin_sections')
          .insert([{ ...sectionData, section_key: 'instagram_feed', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]);
      }
      toast({ title: "Success", description: "Section text updated" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setSectionSaving(false);
    }
  };

  const handleAdd = () => {
    setSelectedImage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleSaveImage = async (data) => {
    if (selectedImage) {
      await updateImage(selectedImage.id, data);
    } else {
      await addImage(data);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteImage(deleteId);
      setDeleteId(null);
    }
  };

  if (loading && sectionLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Instagram Feed</h1>
          <p className="text-gray-500 mt-1">Manage your curated feed images and section text</p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-5 h-5 mr-2" />
          Add New Image
        </Button>
      </div>

      {/* Section Text Editor */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Section Content</h2>
        <form onSubmit={handleSectionSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input 
              type="text" 
              value={sectionData.title}
              onChange={(e) => setSectionData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <input 
              type="text" 
              value={sectionData.description}
              onChange={(e) => setSectionData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button type="submit" disabled={sectionSaving} variant="outline" size="sm">
              {sectionSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Update Text
            </Button>
          </div>
        </form>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {images.map((img) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden aspect-[4/5] flex flex-col"
            >
              <div className="relative flex-grow overflow-hidden bg-gray-100">
                <img 
                  src={img.image_url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  #{img.order}
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-100 bg-white">
                <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5em] mb-2" title={img.caption}>
                  {img.caption || <span className="text-gray-400 italic">No caption</span>}
                </p>
                
                <div className="flex gap-2 justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEdit(img)}
                    className="h-8 w-8 p-0"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => setDeleteId(img.id)}
                    className="h-8 w-8 p-0"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Card Placeholder */}
        <motion.button
          layout
          onClick={handleAdd}
          className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all min-h-[300px]"
        >
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:bg-blue-100">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-medium">Add Image</span>
        </motion.button>
      </div>

      <ImageEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={selectedImage}
        onSave={handleSaveImage}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this image from your feed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminInstagramFeedPage;