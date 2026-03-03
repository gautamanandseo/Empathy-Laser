import React, { useState, useEffect } from 'react';
import { validateVideoUrl } from '@/lib/videoUrlValidator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, X, Film, AlertCircle, Link as LinkIcon, Save, Trash2 } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { cn } from '@/lib/utils';

const VideoUrlInput = ({ 
  value = '', 
  onChange, 
  onSave, 
  onDelete, 
  label = "Video URL", 
  placeholder = "https://youtube.com/watch?v=...",
  showPreview = true,
  className 
}) => {
  const [url, setUrl] = useState(value);
  const [validation, setValidation] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setUrl(value);
    if (value) {
      const result = validateVideoUrl(value);
      setValidation(result);
    }
  }, [value]);

  const handleChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setTouched(true);
    onChange(newUrl);
    
    if (newUrl) {
      const result = validateVideoUrl(newUrl);
      setValidation(result);
    } else {
      setValidation(null);
    }
  };

  const handleSave = () => {
    if (validation?.valid && onSave) {
      onSave({
        url: url,
        type: validation.type,
        videoId: validation.id
      });
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Label htmlFor="video-url-input" className="flex items-center gap-2">
          {label}
          {validation?.valid && (
            <span className="text-xs font-normal text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Check className="w-3 h-3" /> Valid {validation.type}
            </span>
          )}
        </Label>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LinkIcon className="w-4 h-4" />
            </div>
            <Input 
               id="video-url-input"
               value={url}
               onChange={handleChange}
               placeholder={placeholder}
               className={cn(
                 "pl-9 pr-10",
                 validation?.valid ? "border-green-500 focus-visible:ring-green-500" : 
                 touched && validation?.error ? "border-red-500 focus-visible:ring-red-500" : ""
               )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               {validation?.valid && <Check className="w-4 h-4 text-green-500" />}
               {touched && validation?.error && <X className="w-4 h-4 text-red-500" />}
            </div>
          </div>
          
          {onSave && (
            <Button 
              onClick={handleSave}
              disabled={!validation?.valid}
              className="bg-[var(--color-vibrant-orange)] hover:bg-orange-600 text-white min-w-[100px]"
            >
              <Save className="w-4 h-4 mr-2" /> Save
            </Button>
          )}
          
          {onDelete && (
             <Button variant="destructive" size="icon" onClick={onDelete}>
                <Trash2 className="w-4 h-4" />
             </Button>
          )}
        </div>
        
        {/* Helper Text / Validation Message */}
        {touched && validation?.error ? (
          <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
             <AlertCircle className="w-3 h-3" /> {validation.error}
          </p>
        ) : (
          <p className="text-xs text-neutral-500 mt-1">
             Supports YouTube, Vimeo, or direct MP4/WebM links.
          </p>
        )}
      </div>

      {/* Preview */}
      {showPreview && validation?.valid && (
        <div className="mt-3 border rounded-lg overflow-hidden bg-neutral-50 shadow-sm animate-in fade-in zoom-in-95 duration-300">
           <div className="p-2 border-b text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-2 bg-neutral-100/50">
              <Film className="w-3 h-3" /> Video Preview
           </div>
           <div className="p-4 bg-white">
              <VideoPlayer 
                 src={url} 
                 type={validation.type} 
                 className="shadow-md aspect-video w-full max-w-md mx-auto"
              />
           </div>
        </div>
      )}
    </div>
  );
};

export default VideoUrlInput;