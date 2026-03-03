import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Trash2, Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminTreatmentFAQsManager = () => {
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
  const [faqs, setFaqs] = useState([]);
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
    if (selectedTreatmentId) fetchFaqs();
  }, [selectedTreatmentId]);

  const fetchFaqs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('treatment_faqs')
      .select('*')
      .eq('treatment_id', selectedTreatmentId)
      .order('order');
    setFaqs(data || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!selectedTreatmentId) return;
    const { error } = await supabase.from('treatment_faqs').insert([{
      treatment_id: selectedTreatmentId,
      question: 'New Question',
      answer: '',
      order: faqs.length
    }]);
    if (!error) {
        toast({ title: 'Added FAQ' });
        fetchFaqs();
    }
  };

  const handleUpdate = (id, field, value) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const handleSaveRow = async (faq) => {
      const { error } = await supabase.from('treatment_faqs').update({
          question: faq.question,
          answer: faq.answer,
          order: faq.order
      }).eq('id', faq.id);
      
      if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
      else toast({ title: "Saved", className: "bg-green-50 text-green-900" });
  };

  const handleDelete = async (id) => {
      if(!confirm("Delete this FAQ?")) return;
      const { error } = await supabase.from('treatment_faqs').delete().eq('id', id);
      if(!error) fetchFaqs();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold">Manage FAQs</h2>
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
              <h3 className="font-bold">FAQs List</h3>
              <Button size="sm" onClick={handleAdd}><Plus className="mr-2 h-4 w-4"/> Add FAQ</Button>
           </div>
           
           {loading ? <Loader2 className="animate-spin" /> : (
               <div className="space-y-4">
                  {faqs.length === 0 && <p className="text-gray-400 italic">No FAQs yet.</p>}
                  {faqs.map((faq) => (
                      <div key={faq.id} className="border p-4 rounded-lg bg-gray-50 space-y-3">
                          <div className="flex items-center gap-2">
                             <Input 
                                value={faq.question} 
                                onChange={e => handleUpdate(faq.id, 'question', e.target.value)} 
                                className="font-bold"
                                placeholder="Question?"
                             />
                             <Button size="icon" variant="ghost" className="text-blue-600" onClick={() => handleSaveRow(faq)}><Save className="w-4 h-4"/></Button>
                             <Button size="icon" variant="ghost" className="text-red-600" onClick={() => handleDelete(faq.id)}><Trash2 className="w-4 h-4"/></Button>
                          </div>
                          <Textarea 
                             value={faq.answer} 
                             onChange={e => handleUpdate(faq.id, 'answer', e.target.value)} 
                             className="min-h-[80px]"
                             placeholder="Answer..."
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

export default AdminTreatmentFAQsManager;