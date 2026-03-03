import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, Copy, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const AdminAIAssistant = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('service description');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState(null);
  const { toast } = useToast();

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setSuggestions(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-content-suggestions', {
        body: { prompt, contentType }
      });

      if (error) throw error;
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('AI Error:', error);
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: "Please ensure OPENAI_API_KEY is set in Supabase secrets."
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-screen w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-[60] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center gap-2 text-white">
              <Bot className="w-6 h-6" />
              <h3 className="font-bold">AI Assistant</h3>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-200">
              <p>Hi! I can help you improve your content. Describe what you need (e.g., "Write a catchy title and description for a laser hair removal service").</p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Content Type</label>
                <select 
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <option value="service description">Service Description</option>
                  <option value="pricing plan">Pricing Plan</option>
                  <option value="technology item">Technology Item</option>
                  <option value="blog post">Blog Post Idea</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Your Prompt</label>
                <textarea
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm min-h-[100px] focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="E.g., Make this description more professional and focus on safety..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/25"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Generate Suggestions
              </Button>
            </form>

            {suggestions && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                  <span className="text-xs text-gray-500 font-medium">SUGGESTIONS</span>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                </div>

                {suggestions.map((suggestion, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 dark:text-white">{suggestion.title}</h4>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(suggestion.title)} className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="relative mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300 pr-6">{suggestion.description}</p>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(suggestion.description)} className="absolute top-0 right-0 h-6 w-6 p-0 opacity-0 group-hover:opacity-100">
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>

                    {suggestion.features && (
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-gray-500">Features</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(suggestion.features.join('\n'))} className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                          {suggestion.features.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminAIAssistant;