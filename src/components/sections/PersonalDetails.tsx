'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import { User, MapPin, Target, Shield, Info, Fingerprint, Activity, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function PersonalDetails() {
  const [data, setData] = useState({
    alias: 'Vignesh V Palazhi',
    location: 'India',
    focus: 'Offensive Security / SecOps',
    certification: 'CEH v13',
    bio: 'Technophile with a passion for uncovering vulnerabilities and securing complex systems. I spend my time participating in CTFs, and contributing to the cybersecurity community through technical writing.'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: settings } = await supabase.from('site_settings').select('*').single();
      if (settings) {
        setData({
          alias: settings.alias || 'Vignesh V Palazhi',
          location: settings.location || 'India',
          focus: settings.focus || 'Offensive Security / SecOps',
          certification: settings.primary_certification || 'CEH v13',
          bio: settings.bio || data.bio
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const details = [
    { label: 'ALIAS', value: data.alias, icon: User, color: 'text-cyber-cyan' },
    { label: 'LOCATION', value: data.location, icon: MapPin, color: 'text-gray-400' },
    { label: 'FOCUS', value: data.focus, icon: Target, color: 'text-cyber-purple' },
    { label: 'CERTIFICATIONS', value: data.certification, icon: Shield, color: 'text-cyber-green' },
  ];

  if (loading) return null;

  return (
    <section id="info" className="py-32 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-10 left-10 text-[150px] font-bold text-white/[0.02] select-none pointer-events-none font-mono">
        IDENTITY
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Left Side: Profile & System Info */}
          <div className="md:w-2/3 space-y-8">
            <div className="flex items-end gap-4 mb-8">
              <h2 className="text-6xl font-bold font-outfit uppercase tracking-tighter leading-none">
                <span className="text-cyber-cyan">SYSTEM</span>_INFO
              </h2>
              <div className="h-px flex-grow bg-gradient-to-r from-cyber-cyan to-transparent mb-2 opacity-30" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    
                    <div className="relative glass border border-white/5 p-6 rounded-lg flex items-start gap-4">
                      <div className={`p-3 rounded-md bg-white/5 ${detail.color} border border-white/5 group-hover:neon-border transition-all`}>
                        <detail.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-cyber-cyan rounded-full animate-pulse" />
                          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] font-bold">{detail.label}</span>
                        </div>
                        <div className="text-xl font-bold text-white font-mono tracking-tight group-hover:text-cyber-cyan transition-colors">
                          {detail.value}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Status Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-[10px] font-mono text-cyber-cyan uppercase tracking-widest">
                <Activity className="w-3 h-3" /> Status: Operational
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyber-purple/10 border border-cyber-purple/30 text-[10px] font-mono text-cyber-purple uppercase tracking-widest">
                <Fingerprint className="w-3 h-3" /> ID: 0xVVP_404
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded bg-cyber-green/10 border border-cyber-green/30 text-[10px] font-mono text-cyber-green uppercase tracking-widest">
                <Zap className="w-3 h-3" /> Latency: 14ms
              </div>
            </div>
          </div>

          {/* Right Side: Bio Log */}
          <div className="md:w-1/3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <GlassCard className="h-full p-8 border-cyber-purple/30 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">
                      <Info className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold font-mono text-white uppercase tracking-wider italic">BIO_LOG</h3>
                  </div>
                </div>

                <div className="flex-grow">
                  <p className="text-gray-300 text-lg leading-relaxed font-outfit relative">
                    <span className="absolute -left-4 top-0 text-cyber-purple opacity-50 text-2xl font-mono">"</span>
                    {data.bio}
                  </p>
                </div>
                
                <div className="mt-12 pt-6 border-t border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between text-[8px] font-mono uppercase tracking-[0.3em] text-gray-600">
                    <span>Integrity_Check</span>
                    <span className="text-cyber-green">PASSED</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-cyber-purple" 
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
