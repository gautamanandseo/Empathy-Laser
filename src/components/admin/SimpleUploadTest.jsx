import React, { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { UploadCloud, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SimpleUploadTest = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, success, error
  const [message, setMessage] = useState('');
  const [resultUrl, setResultUrl] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('idle');
      setMessage('');
      setResultUrl('');
    }
  };

  const runTest = async () => {
    if (!file) return;

    console.log('🧪 TEST: Starting simple upload test...');
    setStatus('uploading');
    setMessage('Starting upload...');

    try {
      // 1. Validate File
      console.log('TEST: File selected:', file.name, file.size, file.type);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `TEST_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 2. Attempt Upload
      console.log('TEST: Attempting upload to gallery-images/' + filePath);
      
      const { data, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('TEST: Upload Error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('TEST: Upload successful:', data);

      // 3. Get URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      console.log('TEST: Generated Public URL:', publicUrl);
      setResultUrl(publicUrl);
      setStatus('success');
      setMessage('File successfully uploaded to Supabase Storage!');

    } catch (err) {
      console.error('TEST: Fatal Error:', err);
      setStatus('error');
      setMessage(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mt-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <UploadCloud className="w-5 h-5 text-blue-600" />
        Storage Diagnostic Test
      </h3>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Select a small image file to verify that Supabase Storage is working correctly. 
          This bypasses the main gallery logic to isolate potential issues.
        </p>

        <div className="flex gap-4 items-end">
          <div className="flex-1">
             <input 
               type="file" 
               onChange={handleFileChange}
               className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
             />
          </div>
          <Button 
            onClick={runTest} 
            disabled={!file || status === 'uploading'}
            className="bg-blue-600 text-white"
          >
            {status === 'uploading' ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Run Upload Test
          </Button>
        </div>

        {/* Results Area */}
        {status !== 'idle' && (
          <div className={`mt-4 p-4 rounded-lg border ${
            status === 'success' ? 'bg-green-50 border-green-200' : 
            status === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start gap-3">
              {status === 'success' ? <Check className="w-5 h-5 text-green-600 mt-0.5" /> : 
               status === 'error' ? <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" /> : 
               <Loader2 className="w-5 h-5 text-blue-600 animate-spin mt-0.5" />}
              
              <div className="overflow-hidden w-full">
                <h4 className={`font-semibold ${
                  status === 'success' ? 'text-green-800' : 
                  status === 'error' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {status === 'success' ? 'Test Passed' : 
                   status === 'error' ? 'Test Failed' : 'Running Test...'}
                </h4>
                <p className="text-sm mt-1 text-gray-700">{message}</p>
                
                {resultUrl && (
                  <div className="mt-2 bg-white/50 p-2 rounded text-xs font-mono break-all text-gray-600">
                    URL: {resultUrl}
                  </div>
                )}
                
                {resultUrl && (
                  <img src={resultUrl} alt="Test Result" className="mt-2 h-20 w-auto rounded border border-gray-300 shadow-sm" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleUploadTest;