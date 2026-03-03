import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Plus, Trash2, GripVertical, Image as ImageIcon, Zap, Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Label } from '@/components/ui/label';

const GenericTreatmentManager = ({ slug, title }) => {
  const [treatment, setTreatment] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Treatment
      const { data: treatmentData, error: treatmentError } = await supabase
        .from('treatments')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (treatmentError) throw treatmentError;
      
      // Ensure JSON fields are arrays
      if (!Array.isArray(treatmentData.benefits)) treatmentData.benefits = [];
      if (!Array.isArray(treatmentData.process)) treatmentData.process = [];
      
      setTreatment(treatmentData);

      // Fetch FAQs
      const { data: faqsData, error: faqsError } = await supabase
        .from('treatment_faqs')
        .select('*')
        .eq('treatment_id', treatmentData.id)
        .order('order');
      
      if (faqsError) throw faqsError;
      setFaqs(faqsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({ title: 'Error', description: 'Failed to load treatment data.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleTreatmentChange = (field, value) => {
    setTreatment(prev => ({ ...prev, [field]: value }));
  };

  const saveTreatment = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('treatments')
        .update({
          name: treatment.name,
          description: treatment.description,
          price_range: treatment.price_range,
          duration: treatment.duration,
          image_url: treatment.image_url,
          before_image_url: treatment.before_image_url,
          after_image_url: treatment.after_image_url,
          benefits: treatment.benefits,
          process: treatment.process
        })
        .eq('id', treatment.id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Treatment updated successfully.' });
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  // Benefits Logic
  const addBenefit = () => {
    setTreatment(prev => ({ ...prev, benefits: [...prev.benefits, "New Benefit"] }));
  };
  const updateBenefit = (idx, value) => {
    const newBenefits = [...treatment.benefits];
    newBenefits[idx] = value;
    setTreatment(prev => ({ ...prev, benefits: newBenefits }));
  };
  const removeBenefit = (idx) => {
    const newBenefits = treatment.benefits.filter((_, i) => i !== idx);
    setTreatment(prev => ({ ...prev, benefits: newBenefits }));
  };

  // Process Logic
  const addProcessStep = () => {
    setTreatment(prev => ({ ...prev, process: [...prev.process, { title: "New Step", description: "" }] }));
  };
  const updateProcessStep = (idx, field, value) => {
    const newProcess = [...treatment.process];
    newProcess[idx] = { ...newProcess[idx], [field]: value };
    setTreatment(prev => ({ ...prev, process: newProcess }));
  };
  const removeProcessStep = (idx) => {
    const newProcess = treatment.process.filter((_, i) => i !== idx);
    setTreatment(prev => ({ ...prev, process: newProcess }));
  };

  // FAQ Logic
  const addFaq = async () => {
    const newFaq = {
      treatment_id: treatment.id,
      question: "New Question",
      answer: "New Answer",
      order: faqs.length
    };
    try {
      const { data, error } = await supabase.from('treatment_faqs').insert([newFaq]).select();
      if (error) throw error;
      setFaqs([...faqs, data[0]]);
      toast({ title: "FAQ Added" });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };
  
  const updateFaq = (id, field, value) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const saveFaq = async (faq) => {
    try {
      const { error } = await supabase.from('treatment_faqs').update({
        question: faq.question,
        answer: faq.answer,
        order: faq.order
      }).eq('id', faq.id);
      if (error) throw error;
      toast({ title: "FAQ Saved" });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const deleteFaq = async (id) => {
    if (!confirm('Delete this FAQ?')) return;
    try {
      const { error } = await supabase.from('treatment_faqs').delete().eq('id', id);
      if (error) throw error;
      setFaqs(faqs.filter(f => f.id !== id));
      toast({ title: "FAQ Deleted" });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-gray-400" /></div>;
  if (!treatment) return <div className="p-8 text-center">Treatment not found. Please ensure seed data is applied.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title} Manager</h1>
          <p className="text-gray-500">Manage content for /{slug}</p>
        </div>
        <Button onClick={saveTreatment} disabled={saving}>
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-white border mb-6 p-1 h-auto">
          <TabsTrigger value="overview" className="px-6 py-2">Overview</TabsTrigger>
          <TabsTrigger value="content" className="px-6 py-2">Content (Benefits/Process)</TabsTrigger>
          <TabsTrigger value="images" className="px-6 py-2">Images</TabsTrigger>
          <TabsTrigger value="faqs" className="px-6 py-2">FAQs</TabsTrigger>
        </TabsList>

        {/* OVERVIEW TAB */}
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Main details displayed in the hero section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Treatment Name</Label>
                  <Input value={treatment.name} onChange={e => handleTreatmentChange('name', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input value={treatment.duration} onChange={e => handleTreatmentChange('duration', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <Input value={treatment.price_range} onChange={e => handleTreatmentChange('price_range', e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea rows={4} value={treatment.description} onChange={e => handleTreatmentChange('description', e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CONTENT TAB */}
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Key Benefits</CardTitle>
                <Button size="sm" variant="outline" onClick={addBenefit}><Plus className="w-4 h-4" /></Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {treatment.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-2">
                    <Input 
                      value={typeof benefit === 'string' ? benefit : benefit.title || ''} 
                      onChange={e => updateBenefit(idx, e.target.value)}
                      placeholder="Benefit description..."
                    />
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => removeBenefit(idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Process Steps</CardTitle>
                <Button size="sm" variant="outline" onClick={addProcessStep}><Plus className="w-4 h-4" /></Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {treatment.process.map((step, idx) => (
                  <div key={idx} className="border p-3 rounded-lg space-y-2 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-500">Step {idx + 1}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => removeProcessStep(idx)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <Input 
                      value={step.title} 
                      onChange={e => updateProcessStep(idx, 'title', e.target.value)}
                      placeholder="Step Title"
                      className="font-medium"
                    />
                    <Textarea 
                      value={step.description} 
                      onChange={e => updateProcessStep(idx, 'description', e.target.value)}
                      placeholder="Step Description"
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* IMAGES TAB */}
        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Images</CardTitle>
              <CardDescription>Manage hero and before/after imagery.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Hero Image URL</Label>
                <div className="flex gap-2">
                  <Input value={treatment.image_url || ''} onChange={e => handleTreatmentChange('image_url', e.target.value)} />
                  {treatment.image_url && (
                    <div className="w-12 h-10 rounded overflow-hidden border">
                      <img src={treatment.image_url} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Before Image URL</Label>
                  <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                     {treatment.before_image_url ? (
                        <div className="relative group">
                          <img src={treatment.before_image_url} alt="Before" className="w-full h-40 object-cover rounded-md" />
                          <Button 
                            variant="destructive" size="icon" 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleTreatmentChange('before_image_url', '')}
                          >
                            <Trash2 className="w-4 h-4"/>
                          </Button>
                        </div>
                     ) : (
                        <div className="h-40 flex flex-col items-center justify-center text-gray-400">
                           <ImageIcon className="w-8 h-8 mb-2" />
                           <span className="text-sm">No Before Image</span>
                        </div>
                     )}
                     <Input 
                       className="mt-2" 
                       placeholder="Enter URL..." 
                       value={treatment.before_image_url || ''} 
                       onChange={e => handleTreatmentChange('before_image_url', e.target.value)} 
                     />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>After Image URL</Label>
                  <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                     {treatment.after_image_url ? (
                        <div className="relative group">
                          <img src={treatment.after_image_url} alt="After" className="w-full h-40 object-cover rounded-md" />
                          <Button 
                            variant="destructive" size="icon" 
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleTreatmentChange('after_image_url', '')}
                          >
                            <Trash2 className="w-4 h-4"/>
                          </Button>
                        </div>
                     ) : (
                        <div className="h-40 flex flex-col items-center justify-center text-gray-400">
                           <ImageIcon className="w-8 h-8 mb-2" />
                           <span className="text-sm">No After Image</span>
                        </div>
                     )}
                     <Input 
                       className="mt-2" 
                       placeholder="Enter URL..." 
                       value={treatment.after_image_url || ''} 
                       onChange={e => handleTreatmentChange('after_image_url', e.target.value)} 
                     />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FAQs TAB */}
        <TabsContent value="faqs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Manage FAQs specifically for this treatment.</CardDescription>
              </div>
              <Button onClick={addFaq}><Plus className="w-4 h-4 mr-2" /> Add FAQ</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqs.length === 0 && <p className="text-gray-400 text-center py-8">No FAQs yet. Add one to get started.</p>}
              {faqs.map((faq) => (
                <div key={faq.id} className="flex gap-4 items-start p-4 border rounded-lg bg-gray-50/50 group">
                  <div className="pt-3 text-gray-400 cursor-move"><GripVertical className="w-5 h-5" /></div>
                  <div className="flex-1 space-y-2">
                    <Input 
                      value={faq.question} 
                      onChange={e => updateFaq(faq.id, 'question', e.target.value)}
                      placeholder="Question"
                      className="font-bold bg-white"
                    />
                    <Textarea 
                      value={faq.answer} 
                      onChange={e => updateFaq(faq.id, 'answer', e.target.value)}
                      placeholder="Answer"
                      className="bg-white"
                      rows={2}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="icon" variant="outline" className="text-blue-600 hover:text-blue-700" onClick={() => saveFaq(faq)}>
                      <Save className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="text-red-500 hover:text-red-600" onClick={() => deleteFaq(faq.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GenericTreatmentManager;