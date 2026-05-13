'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import CyberButton from '@/components/shared/CyberButton';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Edit3, Save, X, Eye, Link as LinkIcon } from 'lucide-react';

export default function AdminBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  };

  const handleSave = async (blog: any) => {
    setLoading(true);
    const blogData = {
      ...blog,
      slug: blog.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      updated_at: new Date()
    };

    let error;
    if (blog.id) {
      const { error: err } = await supabase.from('blogs').update(blogData).eq('id', blog.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('blogs').insert([blogData]);
      error = err;
    }

    if (error) {
      toast.error('Sync failure: ' + error.message);
    } else {
      toast.success('Writeup archived successfully.');
      setEditingBlog(null);
      setIsAdding(false);
      fetchBlogs();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Purge this writeup from memory?')) return;
    setLoading(true);
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) {
      toast.error('Deletion failed: ' + error.message);
    } else {
      toast.success('Writeup purged.');
      fetchBlogs();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter">WRITEUP_ARCHIVE</h1>
        <CyberButton variant="secondary" onClick={() => { setIsAdding(true); setEditingBlog({ title: '', excerpt: '', content: '', image_url: '', category: 'Security', tags: [], link_url: '' }); }}>
          <Plus className="w-4 h-4 mr-2" />
          Archive New Writeup
        </CyberButton>
      </div>

      {(isAdding || editingBlog) && (
        <GlassCard className="p-8 border-cyber-purple/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-mono text-cyber-purple uppercase">{editingBlog?.id ? 'Modify_Writeup' : 'Initialize_New_Report'}</h3>
            <button onClick={() => { setEditingBlog(null); setIsAdding(false); }} className="text-gray-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Report Title (Heading)</label>
              <input 
                type="text" 
                value={editingBlog.title}
                onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-purple outline-none"
                placeholder="Cyber Attack Vector Analysis"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Image URL</label>
              <input 
                type="text" 
                value={editingBlog.image_url}
                onChange={(e) => setEditingBlog({...editingBlog, image_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-purple outline-none"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">External Link URL (Optional)</label>
              <input 
                type="text" 
                value={editingBlog.link_url || ''}
                onChange={(e) => setEditingBlog({...editingBlog, link_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-purple outline-none font-mono"
                placeholder="https://medium.com/@your-writeup"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Category</label>
              <select 
                value={editingBlog.category}
                onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-purple outline-none appearance-none"
              >
                <option value="Security">Security</option>
                <option value="CTF">CTF Walkthrough</option>
                <option value="Malware">Malware Analysis</option>
                <option value="RedTeam">Red Team Ops</option>
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Brief Detail (Excerpt)</label>
              <textarea 
                value={editingBlog.excerpt}
                onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-purple outline-none"
                rows={2}
                placeholder="A brief technical summary of the findings..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Full Intelligence (Markdown Content)</label>
              <textarea 
                value={editingBlog.content}
                onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white font-mono text-sm focus:border-cyber-purple outline-none"
                rows={8}
                placeholder="# Introduction\nDetails go here..."
              />
            </div>
          </div>
          
          <CyberButton variant="secondary" onClick={() => handleSave(editingBlog)} disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'ARCHIVING...' : 'SECURE_AND_POST'}
          </CyberButton>
        </GlassCard>
      )}

      <div className="space-y-4">
        {blogs.map((blog) => (
          <GlassCard key={blog.id} className="p-4 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center overflow-hidden">
                {blog.image_url ? <img src={blog.image_url} className="w-full h-full object-cover" /> : <Eye className="w-6 h-6 text-cyber-purple" />}
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{blog.title}</h4>
                <div className="flex gap-3 text-[10px] font-mono text-gray-500 uppercase">
                  <span>{blog.category}</span>
                  <span>•</span>
                  {blog.link_url && <LinkIcon className="w-3 h-3 text-cyber-cyan" />}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingBlog(blog)} className="p-2 rounded bg-white/5 text-gray-400 hover:text-cyber-purple hover:bg-cyber-purple/10">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(blog.id)} className="p-2 rounded bg-white/5 text-gray-400 hover:text-red-500 hover:bg-red-500/10">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
