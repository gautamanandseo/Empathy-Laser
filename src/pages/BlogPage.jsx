import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Loader2, User } from 'lucide-react';
import Card from '@/components/ui/Card';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const BlogPage = () => {
  // Real-time blog posts
  const { data: posts, loading, error } = useRealtimeSync('blog_posts', {
    orderBy: { column: 'date', ascending: false }
  });

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Laser & Skin Treatment Blog | Delhi Beauty Tips | Empathy Laser Clinic</title>
        <meta name="description" content="Expert blog on laser hair removal, coolsculpting, acne treatment in Delhi. FAQs and treatment guides." />
      </Helmet>

      <section className="pt-32 pb-16 bg-white border-b border-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold mb-6">Expert Insights</span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-playfair">
              Clinic Blog
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Expert insights, tips, and guides for your skin care journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-gray-400" /></div>
          ) : error ? (
             <div className="text-center text-red-500">{error.message || 'Error loading posts'}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts && posts.map((post, index) => {
                // Determine excerpt
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = post.content || "";
                const plainText = tempDiv.textContent || tempDiv.innerText || "";
                const excerpt = plainText.substring(0, 120) + '...';

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Link to={`/blog/${post.slug}`} className="block h-full">
                      <Card className="h-full flex flex-col p-0 overflow-hidden hover:shadow-lg transition-all group border-gray-100">
                        <div className="relative h-56 overflow-hidden bg-gray-100">
                          {post.image_url ? (
                              <img 
                                src={post.image_url} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                          ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image Available</div>
                          )}
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[var(--primary-red)]" />
                                {new Date(post.date).toLocaleDateString()}
                            </div>
                            {post.author && (
                                <div className="flex items-center gap-1 text-xs">
                                    <User className="w-3 h-3" /> {post.author}
                                </div>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 font-playfair group-hover:text-[var(--primary-red)] transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                            {excerpt}
                          </p>
                          <div className="flex items-center text-[var(--primary-red)] font-semibold text-sm group-hover:translate-x-2 transition-transform mt-auto">
                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
              {posts && posts.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                      No blog posts available at the moment.
                  </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;