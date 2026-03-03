import { supabase } from '@/lib/customSupabaseClient';

export const runGalleryDiagnostics = async () => {
  console.group('🚨 EMERGENCY SUPABASE DIAGNOSTICS: before_after_gallery');

  try {
    // Check 1: Simple Select
    console.log('Test 1: Fetching 1 row...');
    const { data: singleRow, error: singleError } = await supabase
      .from('before_after_gallery')
      .select('*')
      .limit(1);
    
    if (singleError) {
      console.error('❌ Test 1 Failed:', singleError);
    } else {
      console.log('✅ Test 1 Passed. Row:', singleRow);
    }

    // Check 2: Count
    console.log('Test 2: Counting all rows...');
    const { count, error: countError } = await supabase
      .from('before_after_gallery')
      .select('*', { count: 'exact', head: true });
      
    if (countError) {
      console.error('❌ Test 2 Failed:', countError);
    } else {
      console.log(`✅ Test 2 Passed. Total rows: ${count}`);
    }
    
    // Check 3: Structure Inspection (Manual verification via data return)
    if (singleRow && singleRow.length > 0) {
      const row = singleRow[0];
      const keys = Object.keys(row);
      console.log('🔍 Table Structure (based on returned row):', keys);
      
      const expectedKeys = ['id', 'title', 'description', 'before_image_url', 'after_image_url', 'category', 'order', 'created_at', 'updated_at'];
      const missingKeys = expectedKeys.filter(k => !keys.includes(k));
      
      if (missingKeys.length > 0) {
        console.warn('⚠️ Potential Schema Mismatch. Missing expected keys in response:', missingKeys);
      } else {
        console.log('✅ Schema looks correct (all expected keys present).');
      }
    } else {
      console.warn('⚠️ Cannot verify schema because table appears empty or read failed.');
    }

  } catch (err) {
    console.error('💥 Critical Diagnostic Error:', err);
  }

  console.groupEnd();
};