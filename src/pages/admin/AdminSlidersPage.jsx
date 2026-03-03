import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dataManager } from '@/lib/dataManager';
import { useToast } from '@/components/ui/use-toast';

const AdminSlidersPage = () => {
  const [sliders, setSliders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    setSliders(dataManager.getSliders());
  }, []);

  const handleDelete = (id) => {
    if(!confirm('Delete this slide?')) return;
    const newData = sliders.filter(s => s.id !== id);
    dataManager.saveSliders(newData);
    setSliders(newData);
    toast({ title: "Deleted", description: "Slide removed." });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: editItem?.id || Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      image: formData.get('image'),
      link: formData.get('link')
    };

    let newData;
    if (editItem?.id) {
       newData = sliders.map(s => s.id === newItem.id ? newItem : s);
    } else {
       newData = [...sliders, newItem];
    }

    dataManager.saveSliders(newData);
    setSliders(newData);
    setIsEditing(false);
    setEditItem(null);
    toast({ title: "Saved", description: "Slider updated successfully." });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-white font-playfair">Slider Manager</h1>
           <p className="text-gray-400">Update homepage hero sliders</p>
        </div>
        <Button 
          onClick={() => { setEditItem(null); setIsEditing(true); }}
          className="bg-[var(--primary-red)] hover:bg-red-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Slide
        </Button>
      </div>

      <div className="grid gap-6">
        {sliders.map(slide => (
           <div key={slide.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex gap-6 items-center">
              <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0 relative">
                 <img src={slide.image} className="w-full h-full object-cover" alt="Slide" />
              </div>
              <div className="flex-1 min-w-0">
                 <h3 className="text-white font-bold text-lg truncate">{slide.title}</h3>
                 <p className="text-gray-400 text-sm truncate">{slide.description}</p>
                 <div className="flex items-center gap-2 mt-2 text-xs text-blue-400">
                    <LinkIcon className="w-3 h-3" /> {slide.link}
                 </div>
              </div>
              <div className="flex gap-2">
                 <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white" onClick={() => { setEditItem(slide); setIsEditing(true); }}>
                    <Edit2 className="w-4 h-4" />
                 </Button>
                 <Button size="icon" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/20" onClick={() => handleDelete(slide.id)}>
                    <Trash2 className="w-4 h-4" />
                 </Button>
              </div>
           </div>
        ))}
      </div>

      {isEditing && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
               <h3 className="text-xl font-bold text-white mb-6">{editItem ? 'Edit Slide' : 'New Slide'}</h3>
               <form onSubmit={handleSave} className="space-y-4">
                  <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                     <input name="title" defaultValue={editItem?.title} className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-[var(--primary-red)] outline-none" required />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                     <input name="description" defaultValue={editItem?.description} className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-[var(--primary-red)] outline-none" required />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                     <input name="image" defaultValue={editItem?.image} className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-[var(--primary-red)] outline-none" required />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-300 mb-1">Link URL</label>
                     <input name="link" defaultValue={editItem?.link} className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-white focus:border-[var(--primary-red)] outline-none" required />
                  </div>
                  <div className="flex gap-3 mt-6">
                     <Button type="button" variant="ghost" className="flex-1 text-white hover:bg-gray-800" onClick={() => setIsEditing(false)}>Cancel</Button>
                     <Button type="submit" className="flex-1 bg-[var(--primary-red)] text-white hover:bg-red-700">Save Slide</Button>
                  </div>
               </form>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdminSlidersPage;