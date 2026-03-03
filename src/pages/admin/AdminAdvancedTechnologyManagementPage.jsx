import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2, RefreshCw, Zap } from 'lucide-react';
import AddAdvancedTechnologyModal from '@/components/admin/technology/AddAdvancedTechnologyModal';
import EditAdvancedTechnologyModal from '@/components/admin/technology/EditAdvancedTechnologyModal';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AdminAdvancedTechnologyManagementPage = () => {
  const { toast } = useToast();

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Real-time synchronization
  const { data: items, loading, error, refresh } = useRealtimeSync('advanced_technology_items', {
    orderBy: { column: 'order_index', ascending: true }
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this technology? This action cannot be undone.")) return;

    try {
      const { error } = await supabase
        .from('advanced_technology_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Technology removed successfully",
      });
      // Refresh handled by subscription
    } catch (err) {
      console.error('Delete error:', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete item"
      });
    }
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold font-playfair text-gray-900">Advanced Technology</h1>
          <p className="text-gray-500 mt-1">Manage your clinic's equipment showcase</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={refresh} disabled={loading} size="sm">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
            </Button>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 text-white hover:bg-blue-700 shadow-md">
                <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex justify-center items-center py-24 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col items-center">
                <Loader2 className="animate-spin h-10 w-10 text-blue-600 mb-4" />
                <p className="text-gray-500">Loading technologies...</p>
            </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 bg-red-50 rounded-xl border border-red-100 text-center">
            <p className="text-red-500 mb-4 font-medium">{error}</p>
            <Button variant="outline" onClick={refresh} className="bg-white hover:bg-gray-50">
                Try Again
            </Button>
        </div>
      ) : items?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-xl border border-dashed border-gray-300 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No technologies found</h3>
            <p className="text-gray-500 mb-6 max-w-sm">
                Get started by adding your first advanced technology equipment to showcase on the homepage.
            </p>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 text-white hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Add First Technology
            </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
            {items?.map((item) => {
                // Feature Parsing Safe Logic
                let features = [];
                try {
                    features = typeof item.features === 'string' 
                        ? JSON.parse(item.features) 
                        : (Array.isArray(item.features) ? item.features : []);
                } catch (e) { 
                    features = []; 
                }

                return (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
                        {/* Image */}
                        <div className="w-full md:w-64 h-48 md:h-auto bg-gray-100 relative shrink-0">
                           {item.image_url ? (
                             <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Zap className="w-12 h-12 opacity-20" />
                             </div>
                           )}
                           <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                              Order: {item.order_index || 0}
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                           <div className="flex justify-between items-start mb-2">
                               <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                               <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleEditClick(item)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                    <Pencil className="w-4 h-4 mr-1" /> Edit
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                                  </Button>
                               </div>
                           </div>
                           
                           <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                           
                           {/* Features Preview */}
                           {features && features.length > 0 && (
                               <div className="mt-auto">
                                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Features</p>
                                   <div className="flex flex-wrap gap-2">
                                       {features.slice(0, 5).map((feature, idx) => (
                                           <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                               {feature}
                                           </span>
                                       ))}
                                       {features.length > 5 && (
                                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                               +{features.length - 5} more
                                           </span>
                                       )}
                                   </div>
                               </div>
                           )}
                        </div>
                    </div>
                );
            })}
        </div>
      )}

      {/* Modals */}
      <AddAdvancedTechnologyModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={refresh}
      />
      
      <EditAdvancedTechnologyModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
            setIsEditModalOpen(false);
            setSelectedItem(null);
        }} 
        onSuccess={refresh}
        item={selectedItem}
      />
    </div>
  );
};

export default AdminAdvancedTechnologyManagementPage;