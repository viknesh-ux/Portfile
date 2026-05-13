'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CyberButton from '../shared/CyberButton';
import Terminal from '../shared/Terminal';
import { Download, Github, Linkedin, Twitter } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function Hero() {
  const [links, setLinks] = useState({
    resume_url: '#',
    github_url: '#',
    linkedin_url: '#',
    twitter_url: '#'
  });

  useEffect(() => {
    const fetchLinks = async () => {
      const { data } = await supabase.from('site_settings').select('resume_url, github_url, linkedin_url, twitter_url').single();
      if (data) {
        setLinks({
          resume_url: data.resume_url || '#',
          github_url: data.github_url || '#',
          linkedin_url: data.linkedin_url || '#',
          twitter_url: data.twitter_url || '#'
        });
      }
    };
    fetchLinks();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 text-cyber-cyan text-xs font-mono uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-cyan"></span>
            </span>
            System Online: Threat Level Low
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-outfit tracking-tighter mb-4 leading-tight whitespace-nowrap flex items-center">
            VIGN
            <span className="inline-block transform rotate-180 mx-0.5">E</span>
            SH <span className="ml-4 text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-cyber-purple">V PALAZHI</span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
            I am a <span className="text-cyber-cyan font-mono">Security Researcher</span> and <span className="text-cyber-purple font-mono">Ethical Hacker</span> focused on uncovering vulnerabilities, simulating real-world attacks, and building resilient digital systems.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link href="/projects">
              <CyberButton size="lg">
                View My Projects
              </CyberButton>
            </Link>
            <a href={links.resume_url} target="_blank" rel="noopener noreferrer">
              <CyberButton variant="outline" size="lg">
                <Download className="w-5 h-5" />
                Download Resume
              </CyberButton>
            </a>
          </div>

          <div className="flex gap-6 items-center">
            <span className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em]">Connect:</span>
            <div className="flex gap-4">
              <a href={links.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-cyan transition-colors"><Github className="w-6 h-6" /></a>
              <a href={links.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-cyan transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href={links.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-cyan transition-colors"><Twitter className="w-6 h-6" /></a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg blur opacity-25" />
            <Terminal />
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 rounded-full border-2 border-cyber-cyan/30 flex justify-center p-1">
          <div className="w-1 h-2 bg-cyber-cyan rounded-full" />
        </div>
      </div>
    </section>
  );
}
