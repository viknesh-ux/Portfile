'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, User, ExternalLink } from 'lucide-react';
import CyberButton from '../shared/CyberButton';
import GlassCard from '../shared/GlassCard';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase/client';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: 'vigneshvpalazhi@gmail.com',
    signal: '0xacun3tix.30'
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await supabase.from('site_settings').select('contact_email, signal_username').single();
      if (data) {
        setContactInfo({
          email: data.contact_email || 'vigneshvpalazhi@gmail.com',
          signal: data.signal_username || '0xacun3tix.30'
        });
      }
    };
    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: 'Contact Form Transmission'
          }
        ]);

      if (error) throw error;

      toast.success('Transmission successful. Encrypted message stored in secure vault.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      toast.error('Transmission failure: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-4">
              <span className="text-cyber-cyan">05_</span>ESTABLISH_CONNECTION
            </h2>
            <p className="text-gray-400">
              Have a security inquiry or want to discuss a potential collaboration? Send an encrypted message below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold font-mono text-white mb-6 uppercase tracking-wider">Contact Details</h3>
              
              <div className="group space-y-6">
                {/* Email Node */}
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-cyber-cyan/30 hover:bg-cyber-cyan/5 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30 group-hover:neon-border">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Encrypted Email</div>
                    <div className="text-lg text-white break-all font-mono">{contactInfo.email}</div>
                  </div>
                </a>

                {/* Signal Node */}
                <a 
                  href={`https://signal.me/#p/${contactInfo.signal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-cyber-purple/30 hover:bg-cyber-purple/5 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/30">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-500 font-mono mb-1">Secure Messaging (Signal)</div>
                    <div className="text-lg text-white font-mono flex items-center gap-2">
                      @{contactInfo.signal}
                      <ExternalLink className="w-3 h-3 text-cyber-purple opacity-50" />
                    </div>
                  </div>
                </a>
              </div>

              <div className="pt-8">
                <GlassCard className="bg-cyber-cyan/5 border-cyber-cyan/20">
                  <div className="text-sm font-mono text-cyber-cyan mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
                    ENCRYPTION_STATUS: End-to-End Active
                  </div>
                  <p className="text-xs text-gray-400">
                    All communications are routed through secure decentralized nodes to ensure maximum privacy and data integrity.
                  </p>
                </GlassCard>
              </div>
            </div>

            <GlassCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-1">Identity</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-1">Return Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-1">Transmission</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Enter your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-cyber-cyan transition-colors"
                  />
                </div>

                <CyberButton 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-cyber-black border-t-transparent rounded-full animate-spin" />
                      ENCRYPTING...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      INITIATE TRANSMISSION
                    </span>
                  )}
                </CyberButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
