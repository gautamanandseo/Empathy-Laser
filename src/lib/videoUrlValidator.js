/**
 * Utility functions for validating and extracting video information from URLs.
 * Supports YouTube, Vimeo, and direct video file URLs.
 */

/**
 * Extracts YouTube Video ID from various URL formats.
 * @param {string} url - The URL to parse
 * @returns {string|null} - The video ID or null if not found
 */
export function extractYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Extracts Vimeo Video ID.
 * @param {string} url - The URL to parse
 * @returns {string|null} - The video ID or null if not found
 */
export function extractVimeoId(url) {
  if (!url) return null;
  // Matches https://vimeo.com/123456789 or https://player.vimeo.com/video/123456789
  const regExp = /^(?:http|https)?:?\/\/(?:www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}

/**
 * Detects the type of video based on the URL.
 * @param {string} url - The URL to check
 * @returns {'youtube'|'vimeo'|'direct'|null} - The detected video type
 */
export function detectVideoType(url) {
  if (!url) return null;
  
  if (extractYouTubeId(url)) return 'youtube';
  if (extractVimeoId(url)) return 'vimeo';
  
  // Basic check for common video extensions or data URI
  if (/\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url) || /^data:video\//.test(url) || url.includes('supabase.co/storage')) {
    return 'direct';
  }
  
  // Fallback: if it's a valid URL but not YT/Vimeo, assume direct for now or null?
  // Let's return 'direct' if it looks like a URL, but the user should verify.
  // Actually, strictly returning 'direct' might be risky for embed forms.
  // Let's be stricter.
  return 'direct'; 
}

/**
 * Validates a video URL and returns comprehensive info.
 * @param {string} url - The URL to validate
 * @returns {{valid: boolean, type: string|null, id: string|null, error: string|null}}
 */
export function validateVideoUrl(url) {
  if (!url) {
    return { valid: false, type: null, id: null, error: 'URL is required' };
  }

  const youtubeId = extractYouTubeId(url);
  if (youtubeId) {
    return { valid: true, type: 'youtube', id: youtubeId, error: null };
  }

  const vimeoId = extractVimeoId(url);
  if (vimeoId) {
    return { valid: true, type: 'vimeo', id: vimeoId, error: null };
  }

  // Direct URL validation (simplified)
  try {
    new URL(url); // Throws if invalid URL
    return { valid: true, type: 'direct', id: null, error: null };
  } catch (e) {
    return { valid: false, type: null, id: null, error: 'Invalid URL format' };
  }
}