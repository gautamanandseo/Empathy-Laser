import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Trash, Edit2, Sparkles } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminValuesEditor = () => {
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data: values, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'values' },
    orderBy: { column: 'order', ascending: true }
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      section_name: 'values',
      title: formData.get('title'),
      description: formData.get('description'),
      image_url: formData.get('image_url'),
      order: editingItem?.order || (values?.length || 0) + 1,
      details: { icon: formData.get('icon') }
    };

    try {
      if (editingItem?.id) {
        await supabase.from('about_us_content').update(payload).eq('id', editingItem.id);
      } else {
        await supabase.from('about_us_content').insert(payload);
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: 'Success', description: 'Value updated successfully' });
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

  const ValueForm = ({ defaultValues = {} }) => {
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
          <Label>Icon Type (Fallback if no image)</Label>
          <Select name="icon" defaultValue={defaultValues.details?.icon || 'Sparkles'}>
             <SelectTrigger><SelectValue /></SelectTrigger>
             <SelectContent>
                <SelectItem value="Heart">Heart</SelectItem>
                <SelectItem value="Star">Star</SelectItem>
                <SelectItem value="Shield">Shield</SelectItem>
                <SelectItem value="Zap">Zap</SelectItem>
                <SelectItem value="Sparkles">Sparkles</SelectItem>
             </SelectContent>
          </Select>
        </div>
        <div>
           <Label className="mb-2 block">Custom Icon Image</Label>
           <ImageUpload value={imageUrl} onChange={setImageUrl} />
           <input type="hidden" name="image_url" value={imageUrl} />
        </div>
        <Button type="submit" className="w-full">Save Value</Button>
      </form>
    );
  };

  if (loading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Core Values</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}><Plus className="w-4 h-4 mr-2" /> Add Value</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'} Value</DialogTitle></DialogHeader>
            <ValueForm defaultValues={editingItem || {}} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {values?.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg border flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
               <Sparkles className="w-5 h-5 text-gray-400" />
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
      </div>
    </div>
  );
};

export default AdminValuesEditor;