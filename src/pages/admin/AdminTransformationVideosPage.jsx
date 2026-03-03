import React from 'react';
import { ChevronRight } from 'lucide-react';
import AdminTransformationVideosManager from '@/components/admin/AdminTransformationVideosManager';

const AdminTransformationVideosPage = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <span>Admin</span>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="font-medium text-gray-900">Transformation Videos Manager</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-playfair">
            Transformation Videos
        </h1>
        <p className="text-gray-600 mt-2">
            Manage the video carousel content for the homepage transformation section. Drag to reorder.
        </p>
      </div>

      <AdminTransformationVideosManager />
    </div>
  );
};

export default AdminTransformationVideosPage;