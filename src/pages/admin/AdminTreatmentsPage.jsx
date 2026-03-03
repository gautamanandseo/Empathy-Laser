import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminTreatmentsManager from '@/components/admin/treatments/AdminTreatmentsManager';
import AdminTreatmentDetailsManager from '@/components/admin/treatments/AdminTreatmentDetailsManager';
import AdminTreatmentFAQsManager from '@/components/admin/treatments/AdminTreatmentFAQsManager';

const AdminTreatmentsPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Treatments Management</h1>
        <p className="text-gray-500">Manage all dynamic treatment pages, details, and FAQs.</p>
      </div>

      <Tabs defaultValue="treatments" className="w-full">
        <TabsList className="mb-6 bg-white border">
          <TabsTrigger value="treatments">All Treatments</TabsTrigger>
          <TabsTrigger value="details">Section Details</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="treatments">
          <AdminTreatmentsManager />
        </TabsContent>
        
        <TabsContent value="details">
          <AdminTreatmentDetailsManager />
        </TabsContent>
        
        <TabsContent value="faqs">
          <AdminTreatmentFAQsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTreatmentsPage;