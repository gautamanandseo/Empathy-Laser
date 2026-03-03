import React, { useState } from 'react';
import { useAboutUsData } from '@/hooks/useAboutUsData';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/ui/FormInput';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Save, FileImage as ImageIcon, RefreshCw, Plus } from 'lucide-react';
import ImageUpload from '@/components/ui/ImageUpload';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// This component now focuses primarily on the Hero Section management
// as requested by task separation.

const EditableCard = ({ item, onSave, fields = [], labels = {}, imageFields = [] }) => {
    const [localState, setLocalState] = useState(item || {});
    const [isDirty, setIsDirty] = useState(false);

    React.useEffect(() => {
        setLocalState(item || {});
        setIsDirty(false);
    }, [item]);

    const handleChange = (field, value) => {
        setLocalState(prev => ({ ...prev, [field]: value }));
        setIsDirty(true);
    };

    const handleSave = () => {
        onSave(localState);
        setIsDirty(false);
    };

    if (!item) return null;
    
    if (!item.id && item.section_name) {
         return (
             <Card className="p-6 bg-white border-dashed border-2 border-gray-200 flex flex-col items-center justify-center text-center">
                 <p className="text-gray-500 mb-4">Hero section needs initialization.</p>
                 <Button onClick={() => onSave({...item, title: 'About Us', description: 'Welcome to our clinic.', hero_image_url: ''})}>
                    <Plus className="w-4 h-4 mr-2" /> Initialize Hero
                 </Button>
             </Card>
         );
    }

    return (
        <Card className="p-6 bg-white shadow-sm border border-slate-200">
            <div className="space-y-5">
                {fields.map(field => {
                    const isImage = imageFields.includes(field);
                    const label = labels[field] || field.replace(/_/g, ' ');

                    return (
                        <div key={field}>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 tracking-wider">{label}</label>
                            {isImage ? (
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <ImageUpload 
                                        value={localState[field]} 
                                        onChange={(val) => handleChange(field, val)} 
                                        className="mb-2"
                                    />
                                    <input 
                                        type="text" 
                                        className="w-full text-xs text-slate-400 bg-transparent border-none focus:ring-0 p-0" 
                                        value={localState[field] || ''} 
                                        placeholder="Or paste image URL directly..."
                                        onChange={(e) => handleChange(field, e.target.value)}
                                    />
                                </div>
                            ) : field === 'description' ? (
                                <textarea 
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    value={localState[field] || ''}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    placeholder={`Enter ${label}...`}
                                />
                            ) : field === 'color' ? (
                                <div className="flex items-center gap-3">
                                   <input 
                                      type="color" 
                                      className="w-10 h-10 rounded border border-gray-200 cursor-pointer"
                                      value={localState[field] || '#000000'}
                                      onChange={(e) => handleChange(field, e.target.value)}
                                   />
                                   <input 
                                      type="text"
                                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm uppercase"
                                      value={localState[field] || ''}
                                      onChange={(e) => handleChange(field, e.target.value)}
                                      placeholder="#RRGGBB"
                                   />
                                </div>
                            ) : (
                                <FormInput 
                                    value={localState[field] || ''}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                    placeholder={`Enter ${label}...`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <Button 
                    size="sm" 
                    onClick={handleSave} 
                    disabled={!isDirty}
                    className={cn(
                        "transition-all",
                        isDirty ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                    )}
                >
                    <Save className="w-4 h-4 mr-2" /> {isDirty ? 'Save Changes' : 'Saved'}
                </Button>
            </div>
        </Card>
    );
};

const AboutUsAdmin = () => {
  const { content, loading, refresh, updateSection, addItem } = useAboutUsData();
  const { toast } = useToast();

  if (loading) return (
    <div className="p-8 flex justify-center items-center h-48 bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
    </div>
  );

  const getSection = (name) => {
    const section = content?.find(c => c.section_name === name);
    return section ? section : { section_name: name };
  };
  
  const handleSave = async (data) => {
      if (!data.id) {
          const res = await addItem(data.section_name, data);
          if (res.success) toast({ title: "Success", description: "Section initialized" });
          else toast({ variant: "destructive", title: "Error", description: res.error.message });
          return;
      }

      const res = await updateSection(data);
      if (res.success) toast({ title: "Success", description: "Changes saved" });
      else toast({ variant: "destructive", title: "Error", description: res.error.message });
  };

  const hero = getSection('hero');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold flex items-center gap-2"><ImageIcon className="w-5 h-5"/> Hero Configuration</h2>
        <Button variant="ghost" size="sm" onClick={refresh} className="gap-2">
          <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} /> Refresh
        </Button>
      </div>

      <EditableCard 
          item={hero} 
          onSave={handleSave} 
          fields={['title', 'description', 'hero_image_url', 'color']} 
          labels={{hero_image_url: 'Banner Image', color: 'Accent Color', title: 'Main Headline'}}
          imageFields={['hero_image_url']}
      />
    </div>
  );
};

export default AboutUsAdmin;