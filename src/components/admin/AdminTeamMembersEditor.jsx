import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Trash, Edit2, User } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminTeamMembersEditor = () => {
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data: team, loading } = useRealtimeSync('about_us_content', {
    eq: { column: 'section_name', value: 'team_members' },
    orderBy: { column: 'order', ascending: true }
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      section_name: 'team_members',
      title: formData.get('title'), // Name
      description: formData.get('description'), // Bio
      image_url: formData.get('image_url'),
      order: editingItem?.order || (team?.length || 0) + 1,
      details: { role: formData.get('role') }
    };

    try {
      if (editingItem?.id) {
        await supabase.from('about_us_content').update(payload).eq('id', editingItem.id);
      } else {
        await supabase.from('about_us_content').insert(payload);
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({ title: 'Success', description: 'Team member updated' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await supabase.from('about_us_content').delete().eq('id', id);
      toast({ title: 'Deleted', description: 'Member removed' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    } finally {
      setDeletingId(null);
    }
  };

  const MemberForm = ({ defaultValues = {} }) => {
    const [imageUrl, setImageUrl] = useState(defaultValues.image_url || '');
    return (
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <Label>Full Name</Label>
          <Input name="title" defaultValue={defaultValues.title} required placeholder="Dr. John Doe" />
        </div>
        <div>
          <Label>Role / Title</Label>
          <Input name="role" defaultValue={defaultValues.details?.role} required placeholder="Senior Dermatologist" />
        </div>
        <div>
          <Label>Bio / Description</Label>
          <Textarea name="description" defaultValue={defaultValues.description} placeholder="Short bio..." />
        </div>
        <div>
           <Label className="mb-2 block">Profile Photo</Label>
           <ImageUpload value={imageUrl} onChange={setImageUrl} />
           <input type="hidden" name="image_url" value={imageUrl} />
        </div>
        <Button type="submit" className="w-full">Save Member</Button>
      </form>
    );
  };

  if (loading) return <Loader2 className="animate-spin" />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Team Members</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingItem(null)}><Plus className="w-4 h-4 mr-2" /> Add Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editingItem ? 'Edit' : 'Add'} Member</DialogTitle></DialogHeader>
            <MemberForm defaultValues={editingItem || {}} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {team?.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-lg border flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
               {item.image_url ? <img src={item.image_url} alt="" className="w-full h-full object-cover" /> : <User className="w-6 h-6 m-3 text-gray-400" />}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-xs text-[var(--primary-red)] font-medium uppercase">{item.details?.role}</p>
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

export default AdminTeamMembersEditor;