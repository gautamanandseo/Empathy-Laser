import React from 'react';
import { Image, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SimpleUploadTest from '@/components/admin/SimpleUploadTest';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-playfair mb-2">Admin Dashboard</h1>
        <p className="text-gray-500">Manage your clinic's content and verify system health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => navigate('/admin/gallery')}
          className="bg-white border border-gray-200 p-6 rounded-2xl flex items-center justify-between cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group"
        >
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Manage Gallery</h3>
            <p className="text-gray-500 text-sm mt-1">Add or remove before/after images</p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
            <Image className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Diagnostic Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-bold text-gray-700">System Verification</h2>
        </div>
        <SimpleUploadTest />
      </div>
    </div>
  );
};

export default AdminDashboardPage;