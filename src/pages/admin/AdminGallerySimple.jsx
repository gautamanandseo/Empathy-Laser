import React, { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const HARDCODED_ITEMS = [
  {
    id: 'hc1',
    title: 'Hardcoded Pair 1',
    before_image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
    after_image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    isHardcoded: true
  },
  {
    id: 'hc2',
    title: 'Hardcoded Pair 2',
    before_image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
    after_image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    isHardcoded: true
  },
  {
    id: 'hc3',
    title: 'Hardcoded Pair 3',
    before_image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
    after_image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    isHardcoded: true
  },
  {
    id: 'hc4',
    title: 'Hardcoded Pair 4',
    before_image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
    after_image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500',
    isHardcoded: true
  }
];

const AdminGallerySimple = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [beforeUrl, setBeforeUrl] = useState('');
  const [afterUrl, setAfterUrl] = useState('');
  
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const stored = localStorage.getItem('customGalleryImages');
    let localItems = [];
    if (stored) {
      try {
        localItems = JSON.parse(stored);
      } catch (e) {
        console.error("Failed to parse local gallery items");
      }
    }
    setItems([...HARDCODED_ITEMS, ...localItems]);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !beforeUrl || !afterUrl) {
      toast({ variant: "destructive", title: "Error", description: "All fields are required" });
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      title,
      before_image_url: beforeUrl,
      after_image_url: afterUrl,
      isHardcoded: false
    };

    // Get current local items
    const stored = localStorage.getItem('customGalleryImages');
    let localItems = [];
    if (stored) {
      try {
        localItems = JSON.parse(stored);
      } catch (e) {}
    }

    const updatedLocalItems = [...localItems, newItem];
    localStorage.setItem('customGalleryImages', JSON.stringify(updatedLocalItems));
    
    setTitle('');
    setBeforeUrl('');
    setAfterUrl('');
    
    toast({ title: "Success", description: "Image pair added to local storage" });
    loadItems();
  };

  const handleDelete = (id) => {
    const stored = localStorage.getItem('customGalleryImages');
    let localItems = [];
    if (stored) {
      try {
        localItems = JSON.parse(stored);
      } catch (e) {}
    }

    const updatedLocalItems = localItems.filter(item => item.id !== id);
    localStorage.setItem('customGalleryImages', JSON.stringify(updatedLocalItems));
    
    toast({ title: "Deleted", description: "Image pair removed" });
    loadItems();
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white font-playfair">Gallery Manager (Simple)</h1>

      {/* Add New Form */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Add New Pair</h2>
        <form onSubmit={handleAdd} className="grid gap-4">
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-white"
              placeholder="Treatment Title"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Before Image URL</label>
              <input 
                value={beforeUrl}
                onChange={e => setBeforeUrl(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-white text-xs"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">After Image URL</label>
              <input 
                value={afterUrl}
                onChange={e => setAfterUrl(e.target.value)}
                className="w-full bg-gray-950 border border-gray-800 rounded p-2 text-white text-xs"
                placeholder="https://..."
              />
            </div>
          </div>
          <Button type="submit" className="bg-[var(--primary-red)] text-white w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Pair
          </Button>
        </form>
      </div>

      {/* List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Current Gallery Items</h2>
        <div className="grid gap-4">
          {items.map(item => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex items-center gap-4">
              <div className="flex gap-2">
                <img src={item.before_image_url} className="w-16 h-16 object-cover rounded bg-gray-800" alt="before" />
                <img src={item.after_image_url} className="w-16 h-16 object-cover rounded bg-gray-800" alt="after" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold">{item.title}</h3>
                <span className="text-xs text-gray-500">{item.isHardcoded ? 'Hardcoded (Read-only)' : 'Custom (Editable)'}</span>
              </div>
              {!item.isHardcoded && (
                <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallerySimple;