import React, { useEffect, useState, useRef } from 'react';
import { subscribeToLogs, clearLogs, initConsoleCapture } from '@/utils/consoleCapture';
import { Trash2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Ensure capture is running
initConsoleCapture();

const DebugConsole = () => {
  const [logs, setLogs] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeToLogs(setLogs);
    return unsubscribe;
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />;
      case 'warn': return <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />;
      default: return <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />;
    }
  };

  const getColor = (type) => {
    switch(type) {
      case 'error': return 'bg-red-50 text-red-900 border-red-100';
      case 'warn': return 'bg-orange-50 text-orange-900 border-orange-100';
      default: return 'bg-gray-50 text-gray-800 border-gray-100';
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex justify-between items-center p-2 bg-gray-100 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700">Console Output</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearLogs}
          className="h-8 text-xs text-gray-500 hover:text-red-600"
        >
          <Trash2 className="w-3 h-3 mr-1" /> Clear
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
        {logs.length === 0 && (
          <div className="text-center text-gray-400 mt-10">No logs captured yet...</div>
        )}
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`p-2 rounded border flex gap-3 ${getColor(log.type)}`}
          >
            <span className="text-gray-400 whitespace-nowrap">{log.timestamp}</span>
            {getIcon(log.type)}
            <pre className="whitespace-pre-wrap break-all font-mono">{log.message}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default DebugConsole;