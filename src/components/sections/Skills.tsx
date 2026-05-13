'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import { supabase } from '@/lib/supabase/client';

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<{title: string, skills: Skill[]}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (data) {
        // Group by category
        const groups = data.reduce((acc: any, skill: Skill) => {
          if (!acc[skill.category]) acc[skill.category] = [];
          acc[skill.category].push(skill);
          return acc;
        }, {});

        const formatted = Object.keys(groups).map(key => ({
          title: key,
          skills: groups[key]
        }));

        setSkillCategories(formatted);
      }
      setLoading(false);
    };

    fetchSkills();
  }, []);

  if (loading) return null;

  return (
    <section id="skills" className="py-24 bg-cyber-cyan/[0.02]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-4">
            <span className="text-cyber-cyan">02_</span>TECHNICAL_STACK
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my expertise across offensive, defensive, and infrastructure security domains.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.length > 0 ? skillCategories.map((category, idx) => (
            <GlassCard key={idx} delay={idx * 0.1}>
              <h3 className="text-xl font-bold mb-6 font-mono text-cyber-cyan flex items-center gap-2 uppercase tracking-widest">
                <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-mono text-gray-300 uppercase tracking-widest">{skill.name}</span>
                      <span className="text-sm font-mono text-cyber-cyan">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-cyber-black rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + (sIdx * 0.1) }}
                        className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple relative"
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )) : (
            // Fallback to static if empty for now or show nothing
            <div className="md:col-span-2 text-center py-12 opacity-30 font-mono text-sm uppercase tracking-widest">
              Awaiting Skill Matrix Sync...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
