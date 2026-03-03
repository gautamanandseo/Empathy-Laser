import React, { useState } from 'react';
import { Trash2, Search, FileImage, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMediaData } from '@/hooks/useMediaData';

const AdminMediaPage = () => {
  const { data: images, loading, deleteItem } = useMediaData();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure? This image might be used in galleries or sliders.")) return;
    
    try {
      await deleteItem(id);
      toast({ 
        title: "Deleted", 
        description: "Image removed from library.",
        className: "bg-green-600 text-white border-none"
      });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete image." });
    }
  };

  const filteredImages = images.filter(img => 
    img.filename ? img.filename.toLowerCase().includes(searchTerm.toLowerCase()) : true
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold text-white font-playfair">Media Library</h1>
           <p className="text-gray-400">Manage all uploaded images (Supabase)</p>
        </div>
        <div className="relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
           <input 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Search filename..." 
             className="bg-gray-900 border border-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:border-[var(--primary-red)] outline-none w-64"
           />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-red)]" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
           {filteredImages.map(img => (
             <div key={img.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group relative">
                <div className="aspect-square bg-gray-950">
                   <img src={img.url} alt={img.filename} className="w-full h-full object-cover" />
                </div>
                <div className="p-2">
                   <p className="text-xs text-gray-400 truncate" title={img.filename}>{img.filename || 'Untitled'}</p>
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => handleDelete(img.id)}>
                      <Trash2 className="w-4 h-4" />
                   </Button>
                </div>
             </div>
           ))}
        </div>
      )}
      
      {!loading && filteredImages.length === 0 && (
         <div className="text-center py-20 bg-gray-900 rounded-2xl border border-dashed border-gray-800">
            <FileImage className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500">No images found.</p>
         </div>
      )}
    </div>
  );
};

export default AdminMediaPage;