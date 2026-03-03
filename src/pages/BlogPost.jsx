import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, MessageCircle, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clinicData } from '@/constants/clinicData';
import { supabase } from '@/lib/customSupabaseClient';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) {
        console.error('Error fetching post:', error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
          </div>
      );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center pt-24">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Post Not Found</h2>
        <p className="mb-6 text-gray-500">The blog post you are looking for does not exist.</p>
        <Button onClick={() => navigate('/blog')} variant="outline">Back to Blog</Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Empathy Laser Clinic</title>
        <meta name="description" content={post.content ? post.content.substring(0, 150).replace(/<[^>]*>?/gm, '') : 'Blog post'} />
      </Helmet>

      <div className="pt-24 pb-20 bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-[var(--primary-red)] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-500 mb-8 border-b border-gray-100 pb-8 text-sm">
              <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-[var(--primary-red)]" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              {post.author && (
                  <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <span>{post.author}</span>
                  </div>
              )}
            </div>

            {post.image_url && (
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-12 shadow-xl">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
            )}

            <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-center text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
              <p className="mb-6 text-gray-300">Contact our clinic directly to book a consultation about this treatment.</p>
              <Button 
                size="lg"
                onClick={() => window.open(clinicData.whatsapp.link, '_blank')}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none text-lg px-8 py-6 rounded-full"
              >
                <MessageCircle className="mr-2 w-5 h-5" /> Chat on WhatsApp
              </Button>
            </div>

          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;