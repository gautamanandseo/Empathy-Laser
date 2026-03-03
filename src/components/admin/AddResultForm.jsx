import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import FormInput from '@/components/ui/FormInput';
import ImageUpload from '@/components/ui/ImageUpload';
import { cn } from '@/lib/utils';

const AddResultForm = ({ 
  title, 
  icon: Icon,
  tableName, 
  fields, 
  onSuccess,
  transformPayload,
  className
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  // Initialize form state
  const getInitialState = () => {
    const initial = {};
    fields.forEach(field => {
      initial[field.name] = field.defaultValue || '';
    });
    return initial;
  };

  // Reset form only when component mounts or after success
  React.useEffect(() => {
    setFormData(getInitialState());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    const missingFields = fields.filter(f => f.required && !formData[f.name]);
    if (missingFields.length > 0) {
      toast({
        variant: "destructive",
        title: "Missing Required Fields",
        description: `Please fill in: ${missingFields.map(f => f.label).join(', ')}`
      });
      return;
    }

    setLoading(true);
    try {
      let payload = { ...formData };
      
      // Auto-assign order if not handled by DB
      // We'll fetch current count to set order, simple approach
      const { count } = await supabase.from(tableName).select('*', { count: 'exact', head: true });
      payload.order = count || 0;

      // Custom transformation if needed
      if (transformPayload) {
        payload = transformPayload(payload);
      }

      const { error } = await supabase.from(tableName).insert([payload]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "New item added successfully.",
        className: "bg-green-600 text-white"
      });

      setFormData(getInitialState());
      if (onSuccess) onSuccess();

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to save data."
      });
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    if (field.render) {
      return field.render({ 
        value: formData[field.name], 
        onChange: (val) => handleChange(field.name, val),
        field 
      });
    }

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">{field.label}</label>
            <div className="relative">
              <select
                value={formData[field.name]}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 bg-white shadow-sm appearance-none"
              >
                {field.options.map(opt => (
                  <option key={opt.value || opt} value={opt.value || opt}>
                    {opt.label || opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        );
      case 'textarea':
        return (
          <FormInput
            key={field.name}
            textarea
            label={field.label}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      case 'image':
        return (
          <ImageUpload
            key={field.name}
            label={field.label}
            value={formData[field.name]}
            onChange={(val) => handleChange(field.name, val)}
            className="h-full min-h-[200px]"
          />
        );
      default:
        return (
          <FormInput
            key={field.name}
            type={field.type || 'text'}
            label={field.label}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
    }
  };

  const leftFields = fields.filter(f => f.type !== 'image');
  const rightFields = fields.filter(f => f.type === 'image');

  return (
    <div className={cn("bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100", className)}>
      <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
        {Icon && <Icon className="w-6 h-6 text-blue-600" />}
        <h2 className="text-xl font-bold text-gray-900 font-playfair">{title || 'Add New Item'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            {leftFields.map(field => (
              <div key={field.name}>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Right Column - Images */}
          {rightFields.length > 0 && (
            <div className="space-y-6 flex flex-col h-full">
              {rightFields.map(field => (
                <div key={field.name} className="flex-1">
                  {renderField(field)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-10 flex justify-center border-t border-gray-100 pt-6">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[200px] py-6 text-lg shadow-lg hover:shadow-xl transition-all rounded-full"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
            Add Result
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddResultForm;