import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { Loader2, CheckCircle, XCircle, RefreshCw, AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDiagnosticsPage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('before_after_gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const processed = data.map(item => ({
        ...item,
        beforeStatus: 'pending',
        afterStatus: 'pending'
      }));

      setImages(processed);
      checkUrls(processed);
    } catch (err) {
      console.error("Error fetching images:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkUrl = async (url) => {
    if (!url) return 'empty';
    // If it's a relative path/uuid, it's technically "valid" if we process it, but here we want to check if it's a full URL
    if (!url.startsWith('http')) return 'relative';
    
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return res.ok ? 'ok' : 'error';
    } catch {
      return 'error';
    }
  };

  const checkUrls = async (items) => {
    setChecking(true);
    const checked = await Promise.all(items.map(async (item) => {
      const beforeStatus = await checkUrl(item.before_image_url);
      const afterStatus = await checkUrl(item.after_image_url);
      return { ...item, beforeStatus, afterStatus };
    }));
    setImages(checked);
    setChecking(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const StatusBadge = ({ status }) => {
    if (status === 'ok') return <span className="flex items-center text-green-400 text-xs"><CheckCircle className="w-3 h-3 mr-1" /> Accessible</span>;
    if (status === 'error') return <span className="flex items-center text-red-400 text-xs"><XCircle className="w-3 h-3 mr-1" /> Unreachable</span>;
    if (status === 'relative') return <span className="flex items-center text-yellow-400 text-xs"><AlertTriangle className="w-3 h-3 mr-1" /> Relative Path</span>;
    if (status === 'empty') return <span className="text-gray-500 text-xs">Empty</span>;
    return <span className="text-gray-500 text-xs">Checking...</span>;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Gallery Diagnostics</h1>
          <p className="text-gray-400">Verify image URL accessibility and format</p>
        </div>
        <Button onClick={fetchImages} disabled={loading || checking}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading || checking ? 'animate-spin' : ''}`} />
          Run Diagnostics
        </Button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-950 text-gray-200 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Title / ID</th>
                <th className="px-6 py-4">Before Image</th>
                <th className="px-6 py-4">After Image</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-500" />
                    <p>Loading database records...</p>
                  </td>
                </tr>
              ) : images.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">No records found.</td>
                </tr>
              ) : (
                images.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{item.title}</div>
                      <div className="text-xs text-gray-500 font-mono mt-1">{item.id}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                       <div className="mb-1 flex items-center justify-between">
                         <span className="text-[10px] uppercase font-bold text-gray-500">URL</span>
                         <StatusBadge status={item.beforeStatus} />
                       </div>
                       <div className="text-[10px] font-mono break-all bg-gray-950 p-2 rounded border border-gray-800">
                         {item.before_image_url || 'NULL'}
                       </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                       <div className="mb-1 flex items-center justify-between">
                         <span className="text-[10px] uppercase font-bold text-gray-500">URL</span>
                         <StatusBadge status={item.afterStatus} />
                       </div>
                       <div className="text-[10px] font-mono break-all bg-gray-950 p-2 rounded border border-gray-800">
                         {item.after_image_url || 'NULL'}
                       </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-col gap-2">
                         {item.before_image_url?.startsWith('http') && (
                            <a href={item.before_image_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xs flex items-center">
                               <ExternalLink className="w-3 h-3 mr-1" /> Open Before
                            </a>
                         )}
                         {item.after_image_url?.startsWith('http') && (
                            <a href={item.after_image_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xs flex items-center">
                               <ExternalLink className="w-3 h-3 mr-1" /> Open After
                            </a>
                         )}
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDiagnosticsPage;