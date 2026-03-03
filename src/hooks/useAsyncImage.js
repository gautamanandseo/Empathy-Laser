import { useState, useEffect } from 'react';
import { imageDB } from '@/lib/db';

export const useAsyncImage = (imageId, fallbackSrc = '') => {
  const [src, setSrc] = useState(fallbackSrc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let objectUrl = null;

    const loadImage = async () => {
      if (!imageId) {
        setSrc(fallbackSrc);
        setLoading(false);
        return;
      }

      // If it's a full URL (http/https), just use it
      if (typeof imageId === 'string' && (imageId.startsWith('http') || imageId.startsWith('/'))) {
        setSrc(imageId);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const blob = await imageDB.getImage(imageId);
        if (blob && active) {
          objectUrl = URL.createObjectURL(blob);
          setSrc(objectUrl);
        } else if (active) {
          setSrc(fallbackSrc);
        }
      } catch (err) {
        console.error('Failed to load image:', err);
        if (active) setSrc(fallbackSrc);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadImage();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [imageId, fallbackSrc]);

  return { src, loading };
};