import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

/**
 * A hook to fetch data from Supabase and subscribe to real-time changes.
 * 
 * @param {string} tableName - The name of the table to sync.
 * @param {Object} options - Configuration options.
 * @param {Object} options.orderBy - { column: string, ascending: boolean }
 * @param {Object} options.eq - { column: string, value: any } - Filter by equality
 * @param {number} options.limit - Number of rows to limit
 * @param {boolean} options.single - Whether to expect a single object or array
 * @returns {Object} { data, loading, error, refresh }
 */
export const useRealtimeSync = (tableName, options = {}) => {
  const [data, setData] = useState(options.single ? null : []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize options to prevent infinite loops in useEffect
  const optionsString = JSON.stringify(options);

  const fetchData = useCallback(async () => {
    try {
      let query = supabase.from(tableName).select('*');
      
      // Apply filters
      if (options.eq) {
        query = query.eq(options.eq.column, options.eq.value);
      }

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending });
      } else if (options.orderBy !== false && !options.single) {
        // Default sort by created_at desc if column exists, but simpler to rely on caller
      }

      // Apply limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      // Execute
      let result;
      if (options.single) {
         const { data: singleData, error: err } = await query.maybeSingle();
         if (err) throw err;
         result = singleData;
      } else {
         const { data: listData, error: err } = await query;
         if (err) throw err;
         result = listData || [];
      }

      setData(result);
    } catch (err) {
      console.error(`Error fetching ${tableName}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [tableName, optionsString]);

  useEffect(() => {
    fetchData();

    // Subscribe to changes
    const channel = supabase
      .channel(`public:${tableName}:${optionsString}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: tableName,
          filter: options.eq ? `${options.eq.column}=eq.${options.eq.value}` : undefined 
        }, 
        (payload) => {
          // On any change, refresh data to ensure consistency (order, limits, etc.)
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, fetchData, optionsString]);

  return { data, loading, error, refresh: fetchData };
};

export default useRealtimeSync;