'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import CyberButton from '../shared/CyberButton';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setProjects(data);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-4">
              <span className="text-cyber-cyan">03_</span>LATEST_PROJECTS
            </h2>
            <p className="text-gray-400 max-w-xl">
              A selection of my recent work in security research, tool development, and infrastructure hardening.
            </p>
          </div>
          <CyberButton variant="outline" className="hidden md:flex">
            View All Projects
          </CyberButton>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.length > 0 ? projects.map((project, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} className="group p-0 overflow-hidden border-white/5">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image_url || 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=2000'} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent opacity-80" />
                <div className="absolute top-4 right-4 flex gap-2">
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cyber-black/50 backdrop-blur-md border border-white/10 text-white hover:text-cyber-cyan cursor-pointer transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-cyber-black/50 backdrop-blur-md border border-white/10 text-white hover:text-cyber-cyan cursor-pointer transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(project.tags) && project.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-cyber-cyan/30 text-cyber-cyan bg-cyber-cyan/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyber-cyan transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">{project.description}</p>
                <CyberButton variant="ghost" className="w-full justify-between group/btn">
                  Read Writeup
                  <Code2 className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </CyberButton>
              </div>
            </GlassCard>
          )) : (
            // Empty state
            [1, 2, 3].map((i) => (
              <GlassCard key={i} className="h-64 border-dashed border-white/10 flex items-center justify-center text-gray-600 font-mono text-xs uppercase tracking-widest">
                No Projects Loaded
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
