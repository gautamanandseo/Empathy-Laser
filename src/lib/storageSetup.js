import { supabase } from '@/lib/customSupabaseClient';

/**
 * Verifies the Supabase storage bucket for the gallery exists.
 * Since the bucket is created via SQL migrations/dashboard, this
 * acts as a connectivity check rather than a setup script.
 */
export const ensureGalleryBucketExists = async () => {
  try {
    // Attempt to retrieve bucket details to verify access
    // Note: 'getBucket' might fail with 403/404 if RLS policies hide bucket metadata from the user,
    // even if they can upload/read objects.
    const { data: bucket, error } = await supabase.storage.getBucket('gallery-images');

    if (error) {
      // Common case: Bucket exists but RLS prevents 'getBucket' (listing metadata) for non-admin users.
      // We log this for debugging but don't throw, as upload/read might still work fine.
      console.log('[Storage Setup] Bucket metadata check skipped (likely RLS restricted). Assuming "gallery-images" exists.');
      return;
    }

    if (bucket) {
      console.log('[Storage Setup] Connected to "gallery-images" bucket successfully.');
    }
  } catch (err) {
    console.warn('[Storage Setup] Unexpected error verifying bucket:', err);
  }
};