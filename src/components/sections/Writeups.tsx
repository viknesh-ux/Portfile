'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import CyberButton from '../shared/CyberButton';
import { BookOpen, Calendar, User, ArrowRight, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function Writeups() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setBlogs(data);
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) return null;

  return (
    <section id="blog" className="py-24 bg-cyber-purple/[0.02]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-4">
              <span className="text-cyber-purple">04_</span>WRITEUPS/BLOG
            </h2>
            <p className="text-gray-400 max-w-xl">
              In-depth analysis, walkthroughs of CTF challenges, and insights into emerging cyber threats.
            </p>
          </div>
          <Link href="/blog">
            <CyberButton variant="outline" size="sm">
              Explore All Writeups
            </CyberButton>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? blogs.map((blog: any, idx: number) => {
            const isExternal = !!blog.link_url;
            const targetUrl = isExternal ? blog.link_url : `/blog/${blog.slug}`;

            return (
              <GlassCard key={idx} delay={idx * 0.1} className="p-0 overflow-hidden group border-white/5 hover:border-cyber-purple/30">
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={blog.image_url || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000'} 
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-cyber-purple/80 backdrop-blur-md text-[10px] font-mono text-white uppercase tracking-widest">
                      {blog.category || 'Security'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 mb-4 uppercase tracking-widest">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(blog.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyber-purple transition-colors line-clamp-2 font-mono">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  
                  {isExternal ? (
                    <a 
                      href={targetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-cyber-cyan font-mono text-xs uppercase tracking-widest hover:gap-3 transition-all"
                    >
                      View External Report <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link 
                      href={targetUrl} 
                      className="inline-flex items-center gap-2 text-cyber-purple font-mono text-xs uppercase tracking-widest hover:gap-3 transition-all"
                    >
                      Read Full Report <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </GlassCard>
            );
          }) : (
            [1, 2, 3].map((i: number) => (
              <GlassCard key={i} delay={i * 0.1} className="p-12 border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-30">
                <BookOpen className="w-12 h-12 text-gray-600 mb-4" />
                <div className="text-sm font-mono text-gray-500 uppercase tracking-widest">Awaiting Transmission...</div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
