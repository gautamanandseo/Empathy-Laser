import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Trash2, Save, ShieldCheck, GripVertical } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import Card from '@/components/ui/Card';
import FormInput from '@/components/ui/FormInput';

const AdminCredentialsEditor = () => {
  const { toast } = useToast();
  const { data: credentials, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'credentials' },
    orderBy: { column: 'order', ascending: true }
  });

  const [savingId, setSavingId] = useState(null);

  const handleUpdate = async (id, updates) => {
    setSavingId(id);
    try {
      const { error } = await supabase
        .from('about_us_content')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Updated", description: "Credential updated" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this credential?")) return;
    try {
      const { error } = await supabase
        .from('about_us_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Deleted", description: "Credential removed" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  const handleAdd = async () => {
    try {
      const maxOrder = credentials?.reduce((max, item) => Math.max(max, item.order || 0), 0) || 0;
      
      const { error } = await supabase
        .from('about_us_content')
        .insert({
          section_name: 'credentials',
          title: 'New Credential',
          description: 'Certification details...',
          order: maxOrder + 1
        });

      if (error) throw error;
      toast({ title: "Added", description: "New credential added" });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Credentials & Certifications</h2>
           <p className="text-sm text-slate-500">Manage certifications, awards, and trust badges.</p>
        </div>
        <Button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" /> Add Credential
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {credentials?.map((item) => (
          <CredentialEditorCard 
            key={item.id} 
            item={item} 
            onUpdate={handleUpdate} 
            onDelete={handleDelete} 
            isSaving={savingId === item.id}
          />
        ))}
        {credentials?.length === 0 && (
          <div className="text-center p-12 border-2 border-dashed border-slate-200 rounded-lg text-slate-400">
            No credentials found. Click "Add Credential" to create one.
          </div>
        )}
      </div>
    </div>
  );
};

const CredentialEditorCard = ({ item, onUpdate, onDelete, isSaving }) => {
  const [localState, setLocalState] = useState(item);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field, value) => {
    setLocalState(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    onUpdate(item.id, localState);
    setIsDirty(false);
  };

  return (
    <Card className="p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-6 items-start">
        <div className="w-24 flex-shrink-0 space-y-2">
           <ImageUpload 
             value={localState.image_url} 
             onChange={(val) => handleChange('image_url', val)} 
             className="w-24 h-24 rounded-lg object-contain bg-slate-900 border border-slate-800"
           />
           <div className="text-center text-xs text-slate-400">Logo Image</div>
        </div>
        
        <div className="flex-grow space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
            <FormInput 
                value={localState.title} 
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Credential Title"
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea 
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm min-h-[60px] focus:ring-2 focus:ring-blue-500 outline-none"
                value={localState.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Details..."
            />
          </div>

          <div className="flex justify-between items-center pt-2">
             <div className="flex items-center gap-2 text-slate-400 text-xs">
                <GripVertical className="w-4 h-4" />
                <span>Order: </span>
                <input 
                    type="number" 
                    className="w-16 border rounded px-2 py-1" 
                    value={localState.order || 0}
                    onChange={(e) => handleChange('order', parseInt(e.target.value))}
                />
             </div>
             <div className="flex gap-2">
                 <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4 mr-1"/> Delete
                 </Button>
                 <Button size="sm" onClick={handleSave} disabled={!isDirty || isSaving} className={isDirty ? "bg-blue-600" : "bg-slate-200 text-slate-400"}>
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-1"/> : <Save className="w-4 h-4 mr-1"/>}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                 </Button>
             </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminCredentialsEditor;