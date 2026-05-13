'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import { Shield, Target, Code, Cpu } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const iconMap: any = {
  Target,
  Shield,
  Code,
  Cpu
};

export default function About() {
  const [stats, setStats] = useState<any[]>([]);
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: settings } = await supabase.from('site_settings').select('bio, about_image_url').single();
      if (settings) {
        setBio(settings.bio);
        setImageUrl(settings.about_image_url);
      }

      const { data: achievements } = await supabase.from('achievements').select('*').limit(4);
      if (achievements && achievements.length > 0) {
        setStats(achievements.map(a => ({
          label: a.title,
          value: a.description, // Assuming description contains the "25+" etc for now or use title/value
          icon: iconMap[a.category] || Shield
        })));
      } else {
        // Fallback
        setStats([
          { label: 'CTF Wins', value: '25+', icon: Target },
          { label: 'Security Audits', value: '100+', icon: Shield },
          { label: 'Exploits Published', value: '12', icon: Code },
          { label: 'Systems Hardened', value: '500+', icon: Cpu },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-2xl overflow-hidden border border-cyber-cyan/30 aspect-[4/5]"
            >
              <div className="absolute inset-0 bg-cyber-cyan/20 mix-blend-overlay z-10" />
              <img 
                src={imageUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"} 
                alt="Cybersecurity Researcher" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent z-20" />
            </motion.div>
            
            {/* Decorative Brackets around image */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-cyber-cyan z-0" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-cyber-purple z-0" />
          </div>

          <div className="md:w-1/2">
            <div className="mb-10">
              <h2 className="text-4xl font-bold mb-6 font-outfit uppercase tracking-tighter">
                <span className="text-cyber-cyan">01_</span>ABOUT_RESEARCHER
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                {bio || "Based in the digital frontier, I specialize in offensive security and advanced threat modeling. My approach combines deep technical expertise with a hacker's mindset to identify critical vulnerabilities before they can be exploited."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <GlassCard key={i} delay={i * 0.1} className="p-4 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-mono text-white">{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
