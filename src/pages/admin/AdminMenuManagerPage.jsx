import React from 'react';
import AdminMenuManager from '@/components/admin/menu/AdminMenuManager';
import { Menu } from 'lucide-react';

const AdminMenuManagerPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-playfair flex items-center gap-3">
          <div className="p-2 bg-orange-100 rounded-lg">
             <Menu className="w-8 h-8 text-[var(--color-vibrant-orange)]" />
          </div>
          Menu Management
        </h1>
        <p className="text-gray-500">
          Customize the main navigation menu structure and links.
        </p>
      </div>

      <div className="h-px bg-gray-200" />

      <AdminMenuManager />
    </div>
  );
};

export default AdminMenuManagerPage;