import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Trash2, Edit2, Loader2, Zap, Snowflake, Sparkles, Droplets, Sun, Eraser, ShieldCheck, Clock, Activity, Settings, RefreshCw, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Modal from '@/components/ui/Modal';
import AddResultForm from '@/components/admin/AddResultForm';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const ICON_MAP = {
  Zap, Snowflake, Sparkles, Droplets, Sun, Eraser, ShieldCheck, Clock, Activity
};

const AdminServicesPage = () => {
  const [editingService, setEditingService] = useState(null);
  const { toast } = useToast();
  
  // Real-time synchronization
  const { data: services, loading, refresh } = useRealtimeSync('admin_services', {
    orderBy: { column: 'created_at', ascending: true }
  });

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
        const { error } = await supabase.from('admin_services').delete().eq('id', id);
        if (error) throw error;
        toast({ title: "Deleted", description: "Service removed" });
        // Refresh handled by subscription
    } catch (err) {
        toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingService) return;
    try {
        const { error } = await supabase.from('admin_services').update({
            title: editingService.title,
            description: editingService.description,
            icon: editingService.icon
        }).eq('id', editingService.id);

        if (error) throw error;

        toast({ title: "Updated", description: "Service updated" });
        setEditingService(null);
    } catch(err) {
        toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  const formFields = [
    { name: 'title', label: 'Service Name', type: 'text', placeholder: 'e.g. Laser Hair Removal', required: true },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Short description...', required: true },
    { 
      name: 'icon', 
      label: 'Select Icon', 
      type: 'custom', 
      defaultValue: 'Zap',
      render: ({ value, onChange }) => (
        <div className="w-full">
           <label className="block text-sm font-medium text-gray-700 mb-3 font-sans">Select Icon</label>
           <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {Object.keys(ICON_MAP).map(iconName => {
                  const Icon = ICON_MAP[iconName];
                  return (
                      <button
                          type="button"
                          key={iconName}
                          onClick={() => onChange(iconName)}
                          className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all border ${value === iconName ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}
                      >
                          <Icon className="w-6 h-6" />
                          <span className="text-[10px]">{iconName}</span>
                      </button>
                  );
              })}
           </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Services Manager</h1>
          <p className="text-gray-500 mt-1">Manage service cards displayed on homepage</p>
        </div>
        <Button variant="outline" onClick={refresh}><RefreshCw className="w-4 h-4 mr-2" /> Refresh</Button>
      </div>

      <AddResultForm 
        title="Add New Service"
        icon={Settings}
        tableName="admin_services"
        fields={formFields}
        onSuccess={refresh}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
         <div className="p-6 border-b border-gray-200"><h3 className="font-bold">Active Services ({services?.length || 0})</h3></div>
         {loading ? <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-blue-600 w-8 h-8" /></div> : (
             <div className="divide-y divide-gray-100">
                 {services?.map(service => {
                     const Icon = ICON_MAP[service.icon] || Activity;
                     return (
                         <div key={service.id} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                             <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                 <Icon className="w-6 h-6" />
                             </div>
                             <div className="flex-1 min-w-0">
                                 <h4 className="font-bold text-gray-900">{service.title}</h4>
                                 <p className="text-sm text-gray-500 truncate">{service.description}</p>
                             </div>
                             <div className="flex gap-2">
                                 <Button size="sm" variant="ghost" onClick={() => setEditingService(service)}><Edit2 className="w-4 h-4" /></Button>
                                 <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(service.id)}><Trash2 className="w-4 h-4" /></Button>
                             </div>
                         </div>
                     );
                 })}
             </div>
         )}
      </div>

      {/* Edit Modal */}
      <Modal
         isOpen={!!editingService}
         onClose={() => setEditingService(null)}
         title="Edit Service"
      >
        {editingService && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Icon</label>
                    <div className="flex flex-wrap gap-2">
                         {Object.keys(ICON_MAP).map(icon => (
                             <button type="button" key={icon} onClick={() => setEditingService({...editingService, icon})} className={`p-2 rounded border transition-colors ${editingService.icon === icon ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-white hover:bg-gray-50'}`}>
                                 {icon}
                             </button>
                         ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                        <input className="w-full border rounded-lg p-3" value={editingService.title} onChange={e => setEditingService({...editingService, title: e.target.value})} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea className="w-full border rounded-lg p-3 h-24" value={editingService.description} onChange={e => setEditingService({...editingService, description: e.target.value})} required />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                    <Button type="button" variant="outline" onClick={() => setEditingService(null)}>Cancel</Button>
                    <Button type="submit" className="bg-blue-600 text-white min-w-[120px]">
                       <Save className="w-4 h-4 mr-2" /> Update Service
                    </Button>
                </div>
            </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminServicesPage;