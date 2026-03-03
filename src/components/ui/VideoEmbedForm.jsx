import React, { useState } from 'react';
import { validateVideoUrl } from '@/lib/videoUrlValidator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, X, Film, AlertCircle } from 'lucide-react';
import VideoPlayer from '@/components/ui/VideoPlayer';

const VideoEmbedForm = ({ onSubmit, onCancel, defaultUrl = '' }) => {
  const [url, setUrl] = useState(defaultUrl);
  const [validation, setValidation] = useState(null);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setTouched(true);
    
    if (newUrl) {
      const result = validateVideoUrl(newUrl);
      setValidation(result);
    } else {
      setValidation(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation && validation.valid) {
      onSubmit({
        url: url,
        type: validation.type,
        videoId: validation.id
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="video-url">Video Link</Label>
        <div className="relative">
          <Input 
             id="video-url"
             value={url}
             onChange={handleChange}
             placeholder="https://youtube.com/watch?v=..."
             className={validation?.valid ? "border-green-500 pr-10" : touched && validation?.error ? "border-red-500 pr-10" : "pr-10"}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
             {validation?.valid && <Check className="w-4 h-4 text-green-500" />}
             {touched && validation?.error && <X className="w-4 h-4 text-red-500" />}
          </div>
        </div>
        
        {/* Helper Text / Validation Message */}
        {touched && validation?.error ? (
          <p className="text-xs text-red-500 flex items-center gap-1">
             <AlertCircle className="w-3 h-3" /> {validation.error}
          </p>
        ) : (
          <p className="text-xs text-neutral-500">
             Supports YouTube, Vimeo, or direct video URLs (mp4/webm).
          </p>
        )}
      </div>

      {/* Preview */}
      {validation?.valid && (
        <div className="mt-4 border rounded-lg overflow-hidden bg-neutral-50">
           <div className="p-2 border-b text-xs font-medium text-neutral-500 uppercase tracking-wider flex items-center gap-2">
              <Film className="w-3 h-3" /> Preview
           </div>
           <div className="p-4">
              <VideoPlayer 
                 src={url} 
                 type={validation.type} 
                 className="shadow-sm"
              />
           </div>
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
         <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
         <Button 
            onClick={handleSubmit} 
            disabled={!validation?.valid}
            className="bg-[var(--color-vibrant-orange)] hover:bg-orange-600 text-white"
         >
            Embed Video
         </Button>
      </div>
    </div>
  );
};

export default VideoEmbedForm;