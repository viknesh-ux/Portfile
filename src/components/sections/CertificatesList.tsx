'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../shared/GlassCard';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function CertificatesList() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .eq('category', 'Certification')
        .order('created_at', { ascending: false });
      
      if (data) setCerts(data);
      setLoading(false);
    };

    fetchCerts();
  }, []);

  if (loading || certs.length === 0) return null;

  return (
    <div className="mt-32">
      <div className="flex items-end gap-4 mb-12">
        <h2 className="text-4xl font-bold font-outfit uppercase tracking-tighter leading-none">
          <span className="text-cyber-green">PROFESSIONAL</span>_CERTIFICATES
        </h2>
        <div className="h-px flex-grow bg-gradient-to-r from-cyber-green to-transparent mb-2 opacity-30" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-green/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
              
              <div className="relative glass border border-white/5 p-6 rounded-lg overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Award className="w-16 h-16 text-cyber-green" />
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-md bg-cyber-green/10 text-cyber-green border border-cyber-green/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-3 flex-grow">
                    <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight group-hover:text-cyber-green transition-colors">
                      {cert.title}
                    </h3>
                    
                    {cert.link_url && (
                      <a 
                        href={cert.link_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-mono text-cyber-green uppercase tracking-[0.2em] hover:brightness-125 transition-all bg-cyber-green/5 px-3 py-1.5 rounded border border-cyber-green/20"
                      >
                        Verify Credential <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
