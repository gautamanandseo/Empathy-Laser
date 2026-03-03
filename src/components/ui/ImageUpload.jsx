import React, { useState, useEffect } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import ImageOptimizationComponent from '@/components/admin/ImageOptimizationComponent';
import { Button } from '@/components/ui/button';

const ImageUpload = ({ 
  value, 
  onChange, 
  label = "Upload Image", 
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [selectedFile, setSelectedFile] = useState(null);
  const [optimizedFile, setOptimizedFile] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid File",
          description: "Please upload an image file."
        });
        return;
      }
      setSelectedFile(file);
      setOptimizedFile(file); // Default to original until processed
    }
  };

  const handleOptimizationComplete = (file) => {
    setOptimizedFile(file);
  };

  const confirmUpload = async () => {
    if (!optimizedFile) return;
    
    try {
      setIsUploading(true);
      const file = optimizedFile;
      
      const fileExt = file.name.split('.').pop() || 'jpg'; // Fallback to jpg if optimized
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = fileName; // Upload to root of bucket or adjust path

      const { data, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      if (onChange) onChange(publicUrl);
      setPreview(publicUrl);
      setSelectedFile(null); // Reset selection UI
      setOptimizedFile(null);
      
      toast({
        title: "Success",
        description: "Image optimized and uploaded.",
        className: "bg-green-50 text-green-800"
      });

    } catch (error) {
      console.error('Upload Error:', error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    setPreview('');
    if (onChange) onChange('');
  };

  const cancelSelection = () => {
    setSelectedFile(null);
    setOptimizedFile(null);
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      
      {/* Selection / Preview Area */}
      <div className="relative group">
        {!selectedFile ? (
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file && file.type.startsWith('image/')) {
                        setSelectedFile(file);
                        setOptimizedFile(file);
                    }
                }}
                className={cn(
                "relative border-2 border-dashed rounded-xl transition-all duration-200 overflow-hidden bg-neutral-50 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--primary-red)] hover:bg-red-50",
                isDragging ? "border-[var(--primary-red)] bg-red-50" : "border-gray-300",
                preview ? "h-64" : "h-40"
                )}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                />
                
                {preview ? (
                   <>
                     <img src={preview} alt="Current" className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20 pointer-events-none">
                        <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">Click to Change</span>
                        <button onClick={handleRemove} className="pointer-events-auto p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg"><X className="w-4 h-4" /></button>
                     </div>
                   </>
                ) : (
                    <div className="p-4">
                        <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900">Click or Drag to Upload</p>
                        <p className="text-xs text-gray-500 mt-1">Supports compression & resizing</p>
                    </div>
                )}
            </div>
        ) : (
            // Optimization UI when a file is selected
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                <div className="flex justify-between items-center mb-4">
                   <h4 className="font-semibold text-sm flex items-center gap-2">
                     <ImageIcon className="w-4 h-4 text-[var(--primary-red)]" />
                     Optimize Image
                   </h4>
                   <Button variant="ghost" size="sm" onClick={cancelSelection}><X className="w-4 h-4" /></Button>
                </div>
                
                <ImageOptimizationComponent 
                    file={selectedFile} 
                    onOptimize={handleOptimizationComplete} 
                />

                <div className="mt-4 flex gap-3 justify-end">
                    <Button variant="outline" onClick={cancelSelection}>Cancel</Button>
                    <Button 
                        onClick={confirmUpload} 
                        disabled={isUploading}
                        className="bg-[var(--primary-red)] hover:bg-[var(--primary-red-dark)] text-white"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
                            </>
                        ) : (
                            <>
                                <Check className="w-4 h-4 mr-2" /> Upload Optimized
                            </>
                        )}
                    </Button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;