import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Activity, Database, Cloud, Wifi, ChevronUp, ChevronDown, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState({
    auth: 'checking',
    db: 'checking',
    storage: 'checking'
  });
  const [lastCheck, setLastCheck] = useState(null);

  const checkHealth = async () => {
    setLastCheck(new Date());
    const newStatus = { ...status };

    // Check Auth
    try {
      const { data: { session } } = await supabase.auth.getSession();
      newStatus.auth = session ? 'connected' : 'no-session';
    } catch (e) {
      console.error("Auth check failed:", e);
      newStatus.auth = 'error';
    }

    // Check DB
    try {
      const { count, error } = await supabase.from('admin_services').select('*', { count: 'exact', head: true });
      if (error) throw error;
      newStatus.db = 'connected';
    } catch (e) {
      console.error("DB check failed:", e);
      newStatus.db = 'error';
    }

    // Check Storage
    try {
      const { data, error } = await supabase.storage.from('gallery-images').list();
      if (error) throw error;
      newStatus.storage = 'connected';
    } catch (e) {
      console.error("Storage check failed:", e);
      newStatus.storage = 'error';
    }

    setStatus(newStatus);
  };

  useEffect(() => {
    if (isOpen) {
      checkHealth();
    }
  }, [isOpen]);

  const StatusIcon = ({ state }) => {
    if (state === 'checking') return <Activity className="w-4 h-4 text-yellow-500 animate-pulse" />;
    if (state === 'connected') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (state === 'no-session') return <AlertCircle className="w-4 h-4 text-orange-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        title="System Status"
      >
        {isOpen ? <ChevronDown className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden text-sm">
          <div className="p-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-900">System Diagnostics</span>
            <button onClick={checkHealth} className="text-xs text-blue-600 hover:underline">Refresh</button>
          </div>
          
          <div className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Auth Session</span>
              </div>
              <StatusIcon state={status.auth} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Database</span>
              </div>
              <StatusIcon state={status.db} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">Storage</span>
              </div>
              <StatusIcon state={status.storage} />
            </div>
          </div>

          <div className="p-2 bg-gray-50 text-[10px] text-gray-400 text-center border-t border-gray-100">
            Last checked: {lastCheck ? lastCheck.toLocaleTimeString() : 'Never'}
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;