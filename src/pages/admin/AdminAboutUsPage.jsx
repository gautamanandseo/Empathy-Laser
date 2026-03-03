import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, Award, LayoutGrid, Image } from 'lucide-react';
import AboutUsHeroEditor from '@/components/admin/AboutUsHeroEditor';
import AboutUsNewSectionEditor from '@/components/admin/AboutUsNewSectionEditor';
import AdminValuesEditor from '@/components/admin/AdminValuesEditor';
import AdminTeamMembersEditor from '@/components/admin/AdminTeamMembersEditor';
import AboutUsCredentialsEditor from '@/components/admin/AboutUsCredentialsEditor';

const AdminAboutUsPage = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">About Us Management</h1>
        <p className="text-slate-500 mt-2">Manage all sections of your About Us page from here.</p>
      </div>

      <Tabs defaultValue="hero" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white p-1 rounded-xl shadow-sm border border-slate-200 h-auto">
          <TabsTrigger value="hero" className="py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all">
             <FileText className="w-4 h-4 mr-2" /> Hero
          </TabsTrigger>
          <TabsTrigger value="new_section" className="py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all">
             <Image className="w-4 h-4 mr-2" /> Intro
          </TabsTrigger>
          <TabsTrigger value="values" className="py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all">
             <LayoutGrid className="w-4 h-4 mr-2" /> Values
          </TabsTrigger>
          <TabsTrigger value="team" className="py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all">
             <Users className="w-4 h-4 mr-2" /> Team
          </TabsTrigger>
          <TabsTrigger value="credentials" className="py-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all">
             <Award className="w-4 h-4 mr-2" /> Certs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="mt-0">
           <AboutUsHeroEditor />
        </TabsContent>

        <TabsContent value="new_section" className="mt-0">
           <AboutUsNewSectionEditor />
        </TabsContent>

        <TabsContent value="values" className="mt-0">
           <AdminValuesEditor />
        </TabsContent>

        <TabsContent value="team" className="mt-0">
           <AdminTeamMembersEditor />
        </TabsContent>

        <TabsContent value="credentials" className="mt-0">
           <AboutUsCredentialsEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAboutUsPage;