import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Trash, Edit2, Shield } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AboutUsCredentialsEditor = () => {
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data: credentials, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'credentials' },
    orderBy: { column: 'order', ascending: true }
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      section_name: 'credentials',
      title: formData.get('title'),
      description: formData.get('description'),
      image_url: formData.get('image_url'), // hidden input handled by ImageUpload state
      order: editingItem?.order || (credentials?.length || 0) + 1
    };

    try {
      if (editingItem?.id) {
        await supabase.from('about_us_content').update(payload).eq('id', editingItem.id);
      } else {
        await supabase.from('about_us_content').insert(payload);
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: 'Success', description: 'Saved successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await supabase.from('about_us_content').delete().eq('id', id);
      toast({ title: 'Deleted', description: 'Item removed' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setDeletingId(null);
    }
  };

  const CredentialForm = ({ defaultValues = {} }) => {
    const [imageUrl, setImageUrl] = useState(defaultValues.image_url || '');
    return (
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input name="title" defaultValue={defaultValues.title} required />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea name="description" defaultValue={defaultValues.description} />
        </div>
        <div>
           <Label className="mb-2 block">Icon / Image</Label>
           <ImageUpload value={imageUrl} onChange={setImageUrl} />
           <input type="hidden" name="image_url" value={imageUrl} />
        </div>
        <Button type="submit" className="w-full">Save Credential</Button>
      </form>
    );
  };

  if (loading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Credentials List</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}><Plus className="w-4 h-4 mr-2" /> Add Credential</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'} Credential</DialogTitle></DialogHeader>
            <CredentialForm defaultValues={editingItem || {}} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {credentials?.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg border flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
               {item.image_url ? <img src={item.image_url} alt="" className="w-8 h-8 object-contain" /> : <Shield className="w-6 h-6 text-gray-400" />}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-500 truncate">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(item.id)} disabled={deletingId === item.id}>
                {deletingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        ))}
        {credentials?.length === 0 && <p className="text-center text-gray-500 py-8">No credentials added yet.</p>}
      </div>
    </div>
  );
};

export default AboutUsCredentialsEditor;