import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2, AlertCircle, FileVideo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { extractYouTubeId, extractVimeoId } from '@/lib/videoUrlValidator';

/**
 * VideoPlayer Component
 * Robust support for YouTube, Vimeo, and Direct URLs.
 */
const VideoPlayer = ({ src, type = 'direct', title, poster, className, autoPlay = false }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const controlsTimeoutRef = useRef(null);
  
  // Normalize type
  const normalizedType = (type === 'uploaded' ? 'direct' : type) || 'direct';

  // Extract IDs safely
  const youtubeId = normalizedType === 'youtube' ? extractYouTubeId(src) : null;
  const vimeoId = normalizedType === 'vimeo' ? extractVimeoId(src) : null;

  // -- Handlers for Direct Videos --
  useEffect(() => {
    if (normalizedType === 'direct' && videoRef.current) {
        setIsLoading(true);
        setHasError(false);
        setIsPlaying(false);
        setProgress(0);
        videoRef.current.load();
    }
  }, [src, normalizedType]);

  useEffect(() => {
    if (autoPlay && normalizedType === 'direct' && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
         console.warn("Autoplay blocked");
      });
    }
  }, [autoPlay, normalizedType]);

  const handleDirectPlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleDirectTimeUpdate = () => {
    if (videoRef.current?.duration) {
      setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current?.parentElement) {
      if (document.fullscreenElement) document.exitFullscreen();
      else videoRef.current.parentElement.requestFullscreen();
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  // -- Render Logic --

  if (normalizedType === 'youtube' && youtubeId) {
    return (
      <div className={cn("relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg", className)}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?modestbranding=1&rel=0&showinfo=0`}
          title={title || "YouTube video player"}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
            </div>
        )}
      </div>
    );
  }

  if (normalizedType === 'vimeo' && vimeoId) {
    return (
      <div className={cn("relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg", className)}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          title={title || "Vimeo video player"}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
         {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 pointer-events-none">
                <Loader2 className="w-8 h-8 text-white/50 animate-spin" />
            </div>
        )}
      </div>
    );
  }

  // Fallback: Direct Video
  return (
    <div 
      className={cn("relative w-full aspect-video bg-black rounded-xl overflow-hidden group shadow-lg", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {!src ? (
         <div className="flex flex-col items-center justify-center h-full text-neutral-500">
            <FileVideo className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-sm">No video source</p>
         </div>
      ) : (
        <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-contain bg-black"
            onTimeUpdate={handleDirectTimeUpdate}
            onLoadedData={() => { setIsLoading(false); setHasError(false); }}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onError={() => { setIsLoading(false); setHasError(true); }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playsInline
            crossOrigin="anonymous"
        />
      )}

      {/* Overlays */}
      <AnimatePresence>
        {isLoading && !hasError && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-none z-20"
          >
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </motion.div>
        )}
        
        {hasError && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-30 p-6 text-center"
          >
            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
            <p className="text-white font-medium">Video Unavailable</p>
            <p className="text-neutral-400 text-sm mt-1">Check the URL format.</p>
          </motion.div>
        )}

        {!isPlaying && !isLoading && !hasError && src && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
            onClick={handleDirectPlay}
          >
            <div className="w-16 h-16 bg-[var(--color-vibrant-orange)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white ml-1 fill-white" />
            </div>
          </motion.div>
        )}
        
        {/* Controls */}
        {showControls && !hasError && src && (
          <motion.div
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
             className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20"
          >
             <div 
               className="w-full h-1 bg-white/30 rounded-full mb-4 cursor-pointer relative group/progress"
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const pos = (e.clientX - rect.left) / rect.width;
                 if (videoRef.current?.duration) videoRef.current.currentTime = pos * videoRef.current.duration;
               }}
             >
                <div className="h-full bg-[var(--color-vibrant-orange)] absolute left-0 top-0" style={{ width: `${progress}%` }} />
             </div>

             <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                   <button onClick={handleDirectPlay}>
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                   </button>
                   <button onClick={() => {
                      if(videoRef.current) {
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                   }}>
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                   </button>
                </div>
                <button onClick={toggleFullscreen}>
                   <Maximize className="w-5 h-5" />
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoPlayer;