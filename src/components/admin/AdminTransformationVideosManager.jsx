import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Reorder } from 'framer-motion';
import { Loader2, Plus, Trash2, GripVertical, Video, Edit2, Link as LinkIcon, Youtube, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { validateVideoUrl } from '@/lib/videoUrlValidator';

// Updated components
import VideoUrlInput from '@/components/ui/VideoUrlInput';

const AdminTransformationVideosManager = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    video_type: 'direct',
    video_id: null,
    order: 0
  });

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('transformation_videos')
        .select('*')
        .order('order', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch transformation videos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleReorder = async (newOrder) => {
    setVideos(newOrder); 
    
    // Update order in DB
    const updates = newOrder.map((video, index) => ({
      id: video.id,
      order: index,
      title: video.title, // required field for upsert safety
      updated_at: new Date().toISOString()
    }));

    try {
      const { error } = await supabase
        .from('transformation_videos')
        .upsert(updates);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order:', error);
      toast({ title: 'Error', description: 'Failed to save new order.', variant: 'destructive' });
      fetchVideos();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase
        .from('transformation_videos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setVideos(videos.filter(v => v.id !== id));
      toast({ title: 'Success', description: 'Video deleted successfully.' });
    } catch (error) {
      console.error('Error deleting video:', error);
      toast({ title: 'Error', description: 'Failed to delete video.', variant: 'destructive' });
    }
  };

  const handleSaveVideo = async () => {
    if (!formData.title) {
        toast({ title: 'Required', description: 'Please enter a title for the video.', variant: 'destructive' });
        return;
    }
    if (!formData.video_url) {
        toast({ title: 'Required', description: 'Please provide a valid video URL.', variant: 'destructive' });
        return;
    }

    try {
      const payload = {
          title: formData.title,
          description: formData.description,
          video_url: formData.video_url,
          video_type: formData.video_type,
          video_id: formData.video_id,
          updated_at: new Date().toISOString()
      };

      if (editingVideo) {
        const { error } = await supabase
          .from('transformation_videos')
          .update(payload)
          .eq('id', editingVideo.id);

        if (error) throw error;
        toast({ title: 'Success', description: 'Video updated successfully.' });
      } else {
        const { error } = await supabase
          .from('transformation_videos')
          .insert([{
            ...payload,
            order: videos.length
          }]);

        if (error) throw error;
        toast({ title: 'Success', description: 'Video added successfully.' });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchVideos();
    } catch (error) {
      console.error('Error saving video:', error);
      toast({ title: 'Error', description: 'Failed to save video.', variant: 'destructive' });
    }
  };

  const handleUrlChange = (urlData) => {
    // This receives just the URL string from the input's onChange
    // For the validation object, we trust the final save or we can validate here again if needed.
    // Actually, VideoUrlInput passes the raw string to onChange, but we need the type/id.
    // So we will rely on a separate handler or just update state and re-validate before save.
    
    // However, VideoUrlInput component above has an `onSave` that passes the full object {url, type, id}.
    // But we are in a larger form. 
    // Let's manually validate for state updates to keep it simple.
    
    // Better yet, let's update VideoUrlInput to pass the validation object on change if we want live updates.
    // For now, simple state update:
    setFormData(prev => ({ ...prev, video_url: urlData }));
  };

  // Helper to extract metadata from URL change if needed, 
  // but we can just use the VideoUrlInput's internal validation for preview 
  // and do a final validation on save.
  const handleUrlSaveFromComponent = (data) => {
      setFormData(prev => ({
          ...prev,
          video_url: data.url,
          video_type: data.type,
          video_id: data.videoId
      }));
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', video_url: '', video_type: 'direct', video_id: null, order: 0 });
    setEditingVideo(null);
  };

  const openEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description || '',
      video_url: video.video_url,
      video_type: video.video_type || 'direct',
      video_id: video.video_id,
      order: video.order
    });
    setIsDialogOpen(true);
  };

  const getTypeIcon = (type) => {
      switch(type) {
          case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />;
          case 'vimeo': return <Video className="w-4 h-4 text-blue-500" />;
          case 'uploaded': return <Video className="w-4 h-4 text-green-500" />; // Legacy
          default: return <LinkIcon className="w-4 h-4 text-gray-500" />;
      }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Transformation Videos</h2>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="gap-2 bg-[var(--color-vibrant-orange)] hover:bg-orange-600 text-white">
          <Plus className="w-4 h-4" /> Add Video
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => { if(!open) resetForm(); setIsDialogOpen(open); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" aria-describedby="video-dialog-description">
          <DialogHeader>
            <DialogTitle>{editingVideo ? 'Edit Video' : 'Add New Video'}</DialogTitle>
            <DialogDescription id="video-dialog-description">
              Enter the details for the transformation video. Supports YouTube, Vimeo, and direct video links.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Video Title <span className="text-red-500">*</span></Label>
                    <Input 
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., Laser Hair Removal Demo"
                    />
                </div>
                
                <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                        value={formData.description} 
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="Brief description..."
                        className="resize-none"
                    />
                </div>

                <div className="h-px bg-gray-100 my-2" />

                <VideoUrlInput 
                    value={formData.video_url}
                    onChange={(url) => setFormData(prev => ({...prev, video_url: url}))}
                    onSave={handleUrlSaveFromComponent} // Captures valid metadata
                    // Also need to manually set type/id if user doesn't click the mini "Save" inside the component
                    // But for this form, we usually want one main save.
                />
                
                {/* 
                   Correction: VideoUrlInput's internal validation is great, but we need to ensure
                   formData has the correct type/id before we submit the main form.
                   We'll rely on the user seeing the "Valid" checkmark in VideoUrlInput.
                   On submit, we can re-validate or trust that handleUrlSaveFromComponent was triggered?
                   Actually, let's just re-run validator on save if needed, or update state on change properly.
                */}
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                    // Manual validation update before save to ensure latest type/id
                    const val = validateVideoUrl(formData.video_url);
                    if (val.valid) {
                        formData.video_type = val.type;
                        formData.video_id = val.id;
                        handleSaveVideo();
                    } else {
                        toast({ title: "Invalid URL", description: "Please enter a valid video URL.", variant: "destructive" });
                    }
                }} className="bg-[var(--color-vibrant-orange)] hover:bg-orange-600 text-white">
                    {editingVideo ? 'Update Video' : 'Add Video'}
                </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        {videos.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Video className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No videos added yet.</p>
          </div>
        ) : (
          <Reorder.Group axis="y" values={videos} onReorder={handleReorder} className="space-y-3">
            {videos.map((video) => (
              <Reorder.Item 
                key={video.id} 
                value={video}
                className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm cursor-move active:shadow-lg active:scale-[1.01] transition-all group"
              >
                <GripVertical className="text-gray-400 shrink-0 group-hover:text-gray-600" />
                
                <div className="w-32 h-20 bg-black rounded-md overflow-hidden shrink-0 relative border border-gray-100">
                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
                      {getTypeIcon(video.video_type)}
                   </div>
                   {(video.video_type === 'direct' || video.video_type === 'uploaded') && video.video_url && (
                       <video src={video.video_url} className="w-full h-full object-cover" />
                   )}
                   {(video.video_type === 'youtube') && video.video_id && (
                       <img src={`https://img.youtube.com/vi/${video.video_id}/mqdefault.jpg`} alt="" className="w-full h-full object-cover" />
                   )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">{video.title}</h4>
                      <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-normal flex gap-1 items-center bg-neutral-50">
                          {getTypeIcon(video.video_type)}
                          {video.video_type}
                      </Badge>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{video.description || "No description"}</p>
                  <p className="text-xs text-gray-400 truncate mt-1 font-mono">{video.video_url}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(video)}>
                    <Edit2 className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(video.id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  );
};

export default AdminTransformationVideosManager;