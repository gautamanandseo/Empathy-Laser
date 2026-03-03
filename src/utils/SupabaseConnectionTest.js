import { supabase } from '@/lib/customSupabaseClient';

/**
 * comprehensive connectivity test for Supabase services
 * Tests Auth, Database (Postgres), and Storage (Buckets)
 */
export const testSupabaseConnection = async () => {
  console.log('🔍 Starting System Diagnostics...');
  
  const results = {
    auth: { success: false, message: 'Pending...', error: null },
    database: { success: false, message: 'Pending...', error: null },
    storage: { success: false, message: 'Pending...', error: null }
  };

  // 1. Test Authentication
  try {
    console.log('Testing Auth Connection...');
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    if (session) {
      console.log('✅ Auth Connected:', session.user.email);
      results.auth = { 
        success: true, 
        message: `Logged in as ${session.user.email}`,
        details: session.user.role
      };
    } else {
      console.log('⚠️ Auth: No active session');
      results.auth = { 
        success: true, 
        message: 'Connected (No active session)',
        warning: true
      };
    }
  } catch (err) {
    console.error('❌ Auth Test Failed:', err);
    results.auth = { 
      success: false, 
      message: 'Connection Failed', 
      error: err.message 
    };
  }

  // 2. Test Database Access (Read public table)
  try {
    console.log('Testing Database Connection...');
    // Try to count rows in a known table
    const { count, error } = await supabase
      .from('admin_services')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    console.log('✅ Database Connected. Row count available.');
    results.database = { 
      success: true, 
      message: 'Connection Successful',
      details: `Table accessible (Status: OK)`
    };
  } catch (err) {
    console.error('❌ Database Test Failed:', err);
    results.database = { 
      success: false, 
      message: 'Connection Failed', 
      error: err.message || 'Check RLS policies' 
    };
  }

  // 3. Test Storage Access
  try {
    console.log('Testing Storage Bucket Access...');
    const { data, error } = await supabase
      .storage
      .from('gallery-images')
      .list();

    if (error) throw error;

    console.log(`✅ Storage Connected. Found ${data.length} files.`);
    results.storage = { 
      success: true, 
      message: 'Bucket Accessible',
      details: `gallery-images (${data.length} files)`
    };
  } catch (err) {
    console.error('❌ Storage Test Failed:', err);
    results.storage = { 
      success: false, 
      message: 'Bucket Inaccessible', 
      error: err.message || 'Bucket "gallery-images" may not exist' 
    };
  }

  console.log('🏁 Diagnostics Complete:', results);
  return results;
};