import React, { useEffect, useState } from 'react';
import { Shield, CheckCircle, XCircle, Globe, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const StatusRow = ({ label, status, details }) => {
  let icon;
  let colorClass;

  if (status === true || status === 'PASS') {
    icon = <CheckCircle className="w-5 h-5 text-green-500" />;
    colorClass = "text-green-700 bg-green-50 border-green-200";
  } else {
    icon = <XCircle className="w-5 h-5 text-red-500" />;
    colorClass = "text-red-700 bg-red-50 border-red-200";
  }

  return (
    <div className={`flex items-start p-4 border rounded-lg mb-3 ${colorClass}`}>
      <div className="mr-3 mt-0.5">{icon}</div>
      <div>
        <h4 className="font-semibold text-sm uppercase tracking-wider">{label}</h4>
        <p className="text-sm mt-1 opacity-90">{details}</p>
      </div>
    </div>
  );
};

const AdminSecurityDiagnosticsPage = () => {
  const { user, session } = useAuth();
  const [diagnostics, setDiagnostics] = useState({
    protocol: window.location.protocol,
    sessionValid: false,
    secureContext: window.isSecureContext
  });

  useEffect(() => {
    setDiagnostics(prev => ({
        ...prev,
        sessionValid: !!session
    }));
  }, [session]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
            <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-gray-900">System Diagnostics</h1>
            <p className="text-gray-500">Security and session status</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
                <Globe className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-lg">Environment Security</h3>
            </div>

            <StatusRow 
                label="Secure Context" 
                status={diagnostics.secureContext} 
                details={diagnostics.secureContext 
                    ? "Application is running in a secure context (HTTPS/Localhost)." 
                    : "WARNING: Application is NOT running in a secure context."} 
            />
            
             <StatusRow 
                label="Auth Session" 
                status={diagnostics.sessionValid} 
                details={diagnostics.sessionValid 
                    ? `Active session for: ${user?.email}` 
                    : "No active session detected."} 
            />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-gray-500" />
                <h3 className="font-semibold text-lg">System Logs</h3>
            </div>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs h-40 overflow-y-auto">
                <p>{'>'} System Check Initialized...</p>
                <p>{'>'} Protocol: {diagnostics.protocol}</p>
                <p>{'>'} Auth Provider: Supabase (Email/Password)</p>
                <p>{'>'} WebAuthn/Biometrics: DISABLED</p>
                <p>{'>'} User ID: {user?.id || 'N/A'}</p>
                <p className="animate-pulse mt-2">{'>'} System Ready...</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurityDiagnosticsPage;