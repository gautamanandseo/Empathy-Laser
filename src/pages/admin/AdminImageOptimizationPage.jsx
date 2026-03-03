import React from 'react';
import AdminImageOptimizationManager from '@/components/admin/AdminImageOptimizationManager';
import { Helmet } from 'react-helmet';

const AdminImageOptimizationPage = () => {
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Image Optimization | Admin Dashboard</title>
      </Helmet>

      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-playfair">Image Optimization</h1>
        <p className="text-gray-500 mt-2">Compress and resize images to improve website performance.</p>
      </div>

      <AdminImageOptimizationManager />
    </div>
  );
};

export default AdminImageOptimizationPage;