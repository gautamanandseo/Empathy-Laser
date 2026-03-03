import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminTreatmentDetailsManager = () => {
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTreatments = async () => {
      const { data } = await supabase.from('treatments').select('id, name').order('name');
      setTreatments(data || []);
    };
    fetchTreatments();
  }, []);

  useEffect(() => {
    if (selectedTreatmentId) fetchDetails();
  }, [selectedTreatmentId]);

  const fetchDetails = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('treatment_details')
      .select('*')
      .eq('treatment_id', selectedTreatmentId)
      .order('order');
    setDetails(data || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!selectedTreatmentId) return;
    const { error } = await supabase.from('treatment_details').insert([{
      treatment_id: selectedTreatmentId,
      section_title: 'New Section',
      section_content: '',
      order: details.length
    }]);
    if (!error) {
        toast({ title: 'Added section' });
        fetchDetails();
    }
  };

  const handleUpdate = async (id, field, value) => {
    // Optimistic update
    setDetails(details.map(d => d.id === id ? { ...d, [field]: value } : d));
    
    // Debounce usually needed, but for simplicity saving on blur or button usually better. 
    // Here we will just update local state and have a save button for each row or save on blur?
    // Let's do save on blur logic or individual save button.
  };

  const handleSaveRow = async (detail) => {
      const { error } = await supabase.from('treatment_details').update({
          section_title: detail.section_title,
          section_content: detail.section_content,
          order: detail.order
      }).eq('id', detail.id);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved", className: "bg-green-50 text-green-900" });
  };

  const handleDelete = async (id) => {
      if(!confirm("Delete this section?")) return;
      const { error } = await supabase.from('treatment_details').delete().eq('id', id);
      if(!error) fetchDetails();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">Manage Details Sections</h2>
        <Select onValueChange={setSelectedTreatmentId}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select Treatment" />
          </SelectTrigger>
          <SelectContent>
            {treatments.map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {selectedTreatmentId && (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
           <div className="flex justify-between mb-4">
              <h3 className="font-bold">Sections List</h3>
              <Button size="sm" onClick={handleAdd}><Plus className="mr-2 h-4 w-4"/> Add Section</Button>
           </div>
           
           {loading ? <Loader2 className="animate-spin" /> : (
               <div className="space-y-4">
                  {details.length === 0 && <p className="text-gray-400 italic">No detail sections yet.</p>}
                  {details.map((detail, idx) => (
                      <div key={detail.id} className="border p-4 rounded-lg bg-gray-50 space-y-3">
                          <div className="flex items-center gap-2">
                             <div className="bg-white px-2 py-1 rounded border text-xs font-mono text-gray-500">Order: {detail.order}</div>
                             <Input 
                                value={detail.section_title} 
                                onChange={e => handleUpdate(detail.id, 'section_title', e.target.value)} 
                                className="font-bold"
                                placeholder="Section Title"
                             />
                             <Button size="icon" variant="ghost" className="text-blue-600" onClick={() => handleSaveRow(detail)}><Save className="w-4 h-4"/></Button>
                             <Button size="icon" variant="ghost" className="text-red-600" onClick={() => handleDelete(detail.id)}><Trash2 className="w-4 h-4"/></Button>
                          </div>
                          <Textarea 
                             value={detail.section_content} 
                             onChange={e => handleUpdate(detail.id, 'section_content', e.target.value)} 
                             className="min-h-[100px]"
                             placeholder="Section Content..."
                          />
                      </div>
                  ))}
               </div>
           )}
        </div>
      )}
    </div>
  );
};

export default AdminTreatmentDetailsManager;