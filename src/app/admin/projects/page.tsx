'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import CyberButton from '@/components/shared/CyberButton';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (data) setProjects(data);
    setLoading(false);
  };

  const handleSave = async (project: any) => {
    setLoading(true);
    const projectData = {
      ...project,
      tags: typeof project.tags === 'string' ? project.tags.split(',').map((t: string) => t.trim()) : project.tags
    };

    let error;
    if (project.id) {
      const { error: err } = await supabase.from('projects').update(projectData).eq('id', project.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('projects').insert([projectData]);
      error = err;
    }

    if (error) {
      toast.error('Sync failure: ' + error.message);
    } else {
      toast.success('Data synchronized with primary node.');
      setEditingProject(null);
      setIsAdding(false);
      fetchProjects();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Confirm deletion of project data?')) return;
    setLoading(true);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) {
      toast.error('Deletion failed: ' + error.message);
    } else {
      toast.success('Project data purged.');
      fetchProjects();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter">PROJECT_REGISTRY</h1>
        <CyberButton onClick={() => { setIsAdding(true); setEditingProject({ title: '', description: '', image_url: '', github_url: '', live_url: '', tags: [] }); }}>
          <Plus className="w-4 h-4 mr-2" />
          Register New Project
        </CyberButton>
      </div>

      {(isAdding || editingProject) && (
        <GlassCard className="p-8 border-cyber-cyan/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-mono text-cyber-cyan uppercase">{editingProject?.id ? 'Edit_Project' : 'New_Project_Entry'}</h3>
            <button onClick={() => { setEditingProject(null); setIsAdding(false); }} className="text-gray-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Project Heading (Title)</label>
              <input 
                type="text" 
                value={editingProject.title}
                onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none"
                placeholder="e.g. Network Intrusion Detector"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Image URL</label>
              <input 
                type="text" 
                value={editingProject.image_url}
                onChange={(e) => setEditingProject({...editingProject, image_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Brief Detail (Summary)</label>
              <textarea 
                value={editingProject.description}
                onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none"
                rows={3}
                placeholder="A high-level overview of the project and its core impact..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Primary Link URL (GitHub/External)</label>
              <input 
                type="text" 
                value={editingProject.github_url}
                onChange={(e) => setEditingProject({...editingProject, github_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Secondary Link URL (Live Demo)</label>
              <input 
                type="text" 
                value={editingProject.live_url}
                onChange={(e) => setEditingProject({...editingProject, live_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
                placeholder="https://project-demo.com"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Tags (comma separated)</label>
              <input 
                type="text" 
                value={Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags}
                onChange={(e) => setEditingProject({...editingProject, tags: e.target.value})}
                placeholder="e.g. Python, Scapy, React"
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none"
              />
            </div>
          </div>
          
          <CyberButton onClick={() => handleSave(editingProject)} disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'SYNCHRONIZING...' : 'COMMIT_TO_DATABASE'}
          </CyberButton>
        </GlassCard>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <GlassCard key={project.id} className="group p-0 overflow-hidden">
            <div className="h-32 bg-cyber-black relative">
              {project.image_url && <img src={project.image_url} alt="" className="w-full h-full object-cover opacity-50" />}
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60">
                <button onClick={() => setEditingProject(project)} className="p-2 rounded-full bg-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan hover:text-black">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 rounded-full bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold font-mono text-white mb-1 truncate">{project.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
