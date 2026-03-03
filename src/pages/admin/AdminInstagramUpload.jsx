import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ImageUpload from '@/components/ui/ImageUpload';

const AdminInstagramUpload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [successCount, setSuccessCount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Logic to handle saving images to the database after they are uploaded to storage
  const handleBatchUploadComplete = async (newUrls) => {
    console.log('Batch upload complete, processing new URLs:', newUrls);
    if (!newUrls || newUrls.length === 0) return;
    
    setIsProcessing(true);
    setSuccessCount(0);
    
    try {
      // We need to fetch current max order to append new images at the end
      const { data: maxOrderData, error: maxOrderError } = await supabase
        .from('instagram_feed')
        .select('order')
        .order('order', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (maxOrderError) console.warn('Could not fetch max order, defaulting to 0', maxOrderError);

      let currentOrder = (maxOrderData?.order || 0) + 1;
      
      const rowsToInsert = newUrls.map((url, index) => ({
        image_url: url,
        caption: '', // Empty caption by default
        order: currentOrder + index,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      console.log('Inserting rows into instagram_feed:', rowsToInsert);

      const { error, data } = await supabase
        .from('instagram_feed')
        .insert(rowsToInsert)
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      
      console.log('Successfully inserted:', data);

      setSuccessCount(newUrls.length);
      toast({
        title: "Database Updated",
        description: `Successfully added ${newUrls.length} images to your feed.`,
        className: "bg-green-600 text-white border-none"
      });

      // Small delay then redirect to feed management
      setTimeout(() => {
        navigate('/admin/instagram-feed');
      }, 1500);

    } catch (error) {
      console.error('Database Save Error:', error);
      toast({
        variant: "destructive",
        title: "Database Error",
        description: `Images uploaded but failed to save to feed: ${error.message}`
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
        <Link to="/admin/instagram-feed">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">Bulk Upload</h1>
          <p className="text-gray-500 mt-1">Add multiple photos to your Instagram feed at once</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 relative">
                <Loader2 className="w-8 h-8 animate-spin" />
                {successCount > 0 && (
                   <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                     {successCount}
                   </div>
                )}
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-2">Saving to Database...</h3>
             <p className="text-gray-500 max-w-sm">
               We've uploaded your images and are now adding them to your feed. Please wait a moment.
             </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Drag & Drop Area</h3>
                <p className="text-sm text-gray-500">Select multiple files to upload them automatically.</p>
              </div>
              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full font-medium">
                Auto-Save Enabled
              </div>
            </div>

            <div className="p-1">
              {/* Note: value is empty array because we don't manage state here, just process completion */}
              <ImageUpload
                multiple={true}
                value={[]} 
                onChange={() => {}} 
                onUploadComplete={handleBatchUploadComplete}
                className="w-full min-h-[400px]"
                label=""
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 text-sm text-yellow-800">
               <div className="mt-0.5">💡</div>
               <div>
                 <p className="font-semibold mb-1">Tip:</p>
                 <p>Uploaded images will be added to the end of your feed. You can reorder them or add captions later in the <Link to="/admin/instagram-feed" className="underline hover:text-yellow-900">Feed Manager</Link>.</p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInstagramUpload;