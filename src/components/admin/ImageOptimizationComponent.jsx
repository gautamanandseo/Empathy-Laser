import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Settings2, ArrowRightLeft, Image as ImageIcon } from 'lucide-react';

const ImageOptimizationComponent = ({ file, onOptimize }) => {
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1200);
  const [optimizedFile, setOptimizedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (file) {
      processImage();
    }
  }, [file, quality, maxWidth]);

  const processImage = async () => {
    setIsProcessing(true);
    try {
      const imageBitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      
      // Calculate new dimensions
      let width = imageBitmap.width;
      let height = imageBitmap.height;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(imageBitmap, 0, 0, width, height);

      // Convert to Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a new File object from Blob to mimic original file input
            const newFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            setOptimizedFile(newFile);
            setPreviewUrl(URL.createObjectURL(newFile));
            
            // Auto-propagate optimization
            onOptimize(newFile);
          }
          setIsProcessing(false);
        },
        'image/jpeg',
        quality
      );
    } catch (err) {
      console.error("Optimization failed:", err);
      setIsProcessing(false);
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 mt-4">
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-neutral-700">
        <Settings2 className="w-4 h-4" />
        <span>Optimization Settings</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <Label>Quality ({Math.round(quality * 100)}%)</Label>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="1" 
              step="0.1" 
              value={quality} 
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-2">
             <div className="flex justify-between text-xs">
              <Label>Max Width ({maxWidth}px)</Label>
            </div>
            <select 
              value={maxWidth} 
              onChange={(e) => setMaxWidth(parseInt(e.target.value))}
              className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
            >
              <option value="800">800px (Thumbnail)</option>
              <option value="1200">1200px (Web)</option>
              <option value="1920">1920px (HD)</option>
              <option value="2500">2500px (Original-ish)</option>
            </select>
          </div>
        </div>

        <div className="border-l border-neutral-200 pl-6 flex flex-col justify-center">
            {file && optimizedFile && (
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-500">Original:</span>
                        <span className="font-mono">{formatSize(file.size)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-bold text-[var(--primary-red)]">
                        <span>Optimized:</span>
                        <span className="font-mono">{formatSize(optimizedFile.size)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        <span>Savings:</span>
                        <span>{Math.round((1 - optimizedFile.size / file.size) * 100)}%</span>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ImageOptimizationComponent;