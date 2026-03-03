import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Pencil, Trash2, RefreshCw } from 'lucide-react';
import BlogAddForm from '@/components/admin/blog/BlogAddForm';
import BlogEditModal from '@/components/admin/blog/BlogEditModal';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AdminBlogManagementPage = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { toast } = useToast();

  // Real-time synchronization
  const { data: items, loading, refresh } = useRealtimeSync('blog_posts', {
    orderBy: { column: 'date', ascending: false }
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post? This cannot be undone.")) return;
    try {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
      toast({ title: "Deleted", description: "Post removed successfully" });
      // Refresh handled by subscription
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-playfair text-gray-900">Blog Management</h1>
        <div className="flex gap-2">
            <Button variant="outline" onClick={refresh} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={() => setIsAddOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add New Post
            </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin h-8 w-8 text-gray-400" /></div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-medium text-gray-500">Title</th>
                <th className="p-4 font-medium text-gray-500">Date</th>
                <th className="p-4 font-medium text-gray-500">Author</th>
                <th className="p-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items?.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4 text-gray-500">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-4 text-gray-500">{item.author}</td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => setEditingItem(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
              {items?.length === 0 && (
                  <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500">No blog posts found. Write one today!</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      <BlogAddForm 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSuccess={refresh} 
      />
      
      <BlogEditModal 
        isOpen={!!editingItem} 
        onClose={() => setEditingItem(null)} 
        onSuccess={refresh}
        post={editingItem} 
      />
    </div>
  );
};

export default AdminBlogManagementPage;