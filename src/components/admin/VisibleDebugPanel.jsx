import React, { useState, useEffect } from 'react';
import { Activity, X, RefreshCw, Terminal, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testSupabaseConnection } from '@/utils/SupabaseConnectionTest';
import DebugConsole from './DebugConsole';

const VisibleDebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('status'); // 'status' or 'console'
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const runDiagnostics = async () => {
    setIsLoading(true);
    try {
      const results = await testSupabaseConnection();
      setStatus(results);
    } catch (e) {
      console.error("Critical Failure in Diagnostics:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !status) {
      runDiagnostics();
    }
  }, [isOpen]);

  const StatusRow = ({ label, result }) => {
    if (!result) return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-400 text-xs">Waiting...</span>
      </div>
    );

    const isSuccess = result.success;
    const isWarning = result.warning;

    return (
      <div className={`flex flex-col p-3 rounded mb-2 border ${isSuccess ? (isWarning ? 'bg-orange-50 border-orange-100' : 'bg-green-50 border-green-100') : 'bg-red-50 border-red-100'}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-bold text-gray-900">{label}</span>
          {isSuccess ? (
            isWarning ? <AlertTriangle className="w-5 h-5 text-orange-500" /> : <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
        <p className={`text-sm ${isSuccess ? 'text-gray-700' : 'text-red-700'}`}>{result.message}</p>
        {result.error && <p className="text-xs font-mono text-red-600 mt-1 bg-red-100 p-1 rounded break-all">{result.error}</p>}
        {result.details && <p className="text-xs text-gray-500 mt-1">{result.details}</p>}
      </div>
    );
  };

  return (
    <>
      {/* Floating Toggle Button - Always Visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-[100] bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center border-2 border-white"
        title="Debug Panel"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
      </button>

      {/* Main Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-[99] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-4 bg-gray-900 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-bold">System Diagnostics</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="bg-gray-700 hover:bg-gray-600 text-white text-xs h-8"
                  onClick={runDiagnostics}
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-3 h-3 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Re-Test System
                </Button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-700 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 bg-gray-50 shrink-0">
              <button
                onClick={() => setActiveTab('status')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'status' ? 'border-orange-500 text-orange-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                Connection Status
              </button>
              <button
                onClick={() => setActiveTab('console')}
                className={`flex-1 py-3 text-sm font-medium border-b-2 flex items-center justify-center gap-2 ${activeTab === 'console' ? 'border-orange-500 text-orange-600 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                <Terminal className="w-4 h-4" /> Live Console
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-white p-0">
              {activeTab === 'status' ? (
                 <div className="p-6">
                    {isLoading && !status ? (
                      <div className="flex flex-col items-center justify-center h-40 space-y-4">
                        <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
                        <p className="text-gray-500">Running full system diagnostics...</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                         <div className="text-sm text-gray-500 mb-4 bg-blue-50 p-3 rounded border border-blue-100">
                           Checking connectivity to Supabase services used by this application.
                         </div>
                         <StatusRow label="Authentication Service" result={status?.auth} />
                         <StatusRow label="Database Connection (Postgres)" result={status?.database} />
                         <StatusRow label="Storage Bucket (gallery-images)" result={status?.storage} />
                         
                         <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-center text-gray-400">
                           Tests are performed using your current browser session.
                         </div>
                      </div>
                    )}
                 </div>
              ) : (
                <DebugConsole />
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default VisibleDebugPanel;