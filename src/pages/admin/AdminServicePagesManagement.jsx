import React, { useState, useEffect } from 'react';
import { useServicePages } from '@/hooks/useServicePages';
import { Button } from '@/components/ui/button';
import { Loader2, Save, LayoutTemplate, RefreshCcw } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import { useToast } from '@/components/ui/use-toast';

const TABS = [
  { id: 'laser-hair-removal', label: 'Laser Hair Removal' },
  { id: 'coolsculpting', label: 'CoolSculpting' },
  { id: 'skin-rejuvenation', label: 'Skin Rejuvenation' },
  { id: 'acne-treatment', label: 'Acne Treatment' }
];

const AdminServicePagesManagement = () => {
  const { fetchAllServicePages, updateServicePage, loading } = useServicePages();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [pagesData, setPagesData] = useState({});
  const [isInitializing, setIsInitializing] = useState(true);
  const { toast } = useToast();

  const loadData = async () => {
    setIsInitializing(true);
    try {
      const data = await fetchAllServicePages();
      const formattedData = {};
      
      // Map database rows to state object keyed by service_key
      if (data && Array.isArray(data)) {
        data.forEach(item => {
          formattedData[item.service_key] = item;
        });
      }

      // Ensure all tabs have at least an empty object structure to prevent undefined errors
      TABS.forEach(tab => {
        if (!formattedData[tab.id]) {
            formattedData[tab.id] = {
                title: '',
                description: '',
                price: '',
                image_url: ''
            };
        }
      });

      setPagesData(formattedData);
    } catch (error) {
      console.error("Failed to initialize data:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  // Initialize data for all tabs on mount
  useEffect(() => {
    loadData();
  }, [fetchAllServicePages]);

  const handleInputChange = (field, value) => {
    setPagesData(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    const currentData = pagesData[activeTab];
    if (!currentData) return;

    // We only send the fields we want to update
    await updateServicePage(activeTab, {
        title: currentData.title,
        description: currentData.description,
        price: currentData.price,
        image_url: currentData.image_url
    });
    
    // Refresh to get the latest updated_at or formatting if needed, though state is usually enough
    // await loadData(); 
  };

  if (isInitializing) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
        <p className="text-gray-500">Loading service page data...</p>
      </div>
    );
  }

  const currentForm = pagesData[activeTab] || {};

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-blue-600" />
            <div>
               <h1 className="text-2xl font-bold text-gray-900">Service Pages Content</h1>
               <p className="text-gray-500 text-sm">Manage the hero content and details for main service pages.</p>
            </div>
        </div>
        <Button variant="outline" size="sm" onClick={loadData} title="Refresh Data">
            <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                  <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Page Title (Hero)</label>
                      <input 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={currentForm.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g. Laser Hair Removal"
                      />
                      <p className="text-xs text-gray-500">The main H1 title displayed at the top of the page.</p>
                  </div>

                  <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Hero Description</label>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none transition-all"
                        value={currentForm.description || ''}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Enter the main description text displayed in the hero section..."
                      />
                      <p className="text-xs text-gray-500">A short, engaging paragraph describing the service value.</p>
                  </div>

                  <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Pricing / Starting At</label>
                      <input 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={currentForm.price || ''}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="e.g. Starts at ₹2,500 per session"
                      />
                  </div>
              </div>

              <div className="space-y-5">
                   <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full flex flex-col">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            Hero Background Image
                        </h3>
                        <div className="flex-grow flex flex-col justify-center">
                            <ImageUpload
                                value={currentForm.image_url || ''}
                                onChange={(url) => handleInputChange('image_url', url)}
                            />
                        </div>
                        <div className="mt-4 bg-white p-3 rounded border border-gray-200 text-xs text-gray-600">
                            <strong>Design Tip:</strong> Use a high-quality landscape image (1920x1080px). 
                            Darker images or images with clear negative space work best for text readability.
                        </div>
                   </div>
              </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
              <Button 
                onClick={handleSave} 
                disabled={loading} 
                className="min-w-[150px] bg-blue-600 hover:bg-blue-700 text-white"
              >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
              </Button>
          </div>
      </div>
    </div>
  );
};

export default AdminServicePagesManagement;