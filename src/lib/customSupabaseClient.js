import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yspstvqinawnszuxdjhy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHN0dnFpbmF3bnN6dXhkamh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNTcwNDAsImV4cCI6MjA4NDkzMzA0MH0.T2Z2uTIT-r-VxG2PEu7KXRT9X4gDU_xFzyKQ2MSRi9Q';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
