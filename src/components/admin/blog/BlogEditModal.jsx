import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import Modal from '@/components/ui/Modal';

const BlogEditModal = ({ isOpen, onClose, onSuccess, post }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    image_url: '',
    author: 'Dr. Expert',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        content: post.content || '',
        image_url: post.image_url || '',
        author: post.author || '',
        date: post.date ? post.date.split('T')[0] : new Date().toISOString().split('T')[0]
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post?.id) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update(formData)
        .eq('id', post.id);

      if (error) throw error;

      toast({ title: "Success", description: "Post updated successfully" });
      onSuccess();
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Blog Post" className="max-w-3xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input 
                required 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input 
                required 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                value={formData.slug} 
                onChange={e => setFormData({...formData, slug: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Author</label>
            <input 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                value={formData.author} 
                onChange={e => setFormData({...formData, author: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Publish Date</label>
            <input 
                type="date" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <textarea 
            className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" 
            value={formData.content} 
            onChange={e => setFormData({...formData, content: e.target.value})} 
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Cover Image</label>
          <ImageUpload value={formData.image_url} onChange={(url) => setFormData({...formData, image_url: url})} />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BlogEditModal;