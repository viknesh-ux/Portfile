'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import CyberButton from '@/components/shared/CyberButton';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Save, RefreshCcw, User, Shield, Target, MapPin, FileText, Globe, MessageSquare } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    hero_title: '',
    hero_subtitle: '',
    bio: '',
    contact_email: '',
    github_url: '',
    linkedin_url: '',
    twitter_url: '',
    resume_url: '',
    signal_username: '',
    alias: '',
    location: '',
    focus: '',
    primary_certification: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('site_settings').select('*').single();
    if (data) setSettings({
      ...settings,
      ...data
    });
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('site_settings')
      .update(settings)
      .eq('id', 1);

    if (error) {
      toast.error('Failed to update settings: ' + error.message);
    } else {
      toast.success('Core systems updated successfully.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter">System_Configuration</h1>
        <div className="flex gap-4">
          <button onClick={fetchSettings} className="p-2 rounded-lg hover:bg-white/5 text-gray-500">
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Identity Parameters */}
        <GlassCard className="p-8 space-y-6">
          <h3 className="text-xl font-bold font-mono text-cyber-cyan uppercase tracking-wider mb-6 flex items-center gap-2">
            <User className="w-5 h-5" /> Identity_Parameters
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Alias / Full Name</label>
              <input 
                type="text" 
                value={settings.alias}
                onChange={(e) => setSettings({...settings, alias: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location
              </label>
              <input 
                type="text" 
                value={settings.location}
                onChange={(e) => setSettings({...settings, location: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <Target className="w-3 h-3" /> Professional Focus
              </label>
              <input 
                type="text" 
                value={settings.focus}
                onChange={(e) => setSettings({...settings, focus: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Primary Certification
              </label>
              <input 
                type="text" 
                value={settings.primary_certification}
                onChange={(e) => setSettings({...settings, primary_certification: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
              />
            </div>
          </div>
        </GlassCard>

        {/* Resources Section */}
        <GlassCard className="p-8 space-y-6 border-cyber-cyan/20">
          <h3 className="text-xl font-bold font-mono text-cyber-cyan uppercase tracking-wider mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Resource_Assets
          </h3>
          
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Resume Download URL</label>
            <input 
              type="text" 
              value={settings.resume_url}
              onChange={(e) => setSettings({...settings, resume_url: e.target.value})}
              className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
            />
          </div>
        </GlassCard>

        {/* Bio Section */}
        <GlassCard className="p-8 space-y-6 border-cyber-purple/20">
          <h3 className="text-xl font-bold font-mono text-cyber-purple uppercase tracking-wider mb-6">Bio_Log</h3>
          
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Personal Biography</label>
            <textarea 
              rows={6}
              value={settings.bio}
              onChange={(e) => setSettings({...settings, bio: e.target.value})}
              className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-4 px-4 text-white focus:border-cyber-purple outline-none"
            />
          </div>
        </GlassCard>

        {/* Links Section */}
        <GlassCard className="p-8 space-y-6 border-cyber-green/20">
          <h3 className="text-xl font-bold font-mono text-cyber-green uppercase tracking-wider mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5" /> External_Nodes
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Contact Email</label>
              <input 
                type="email" 
                value={settings.contact_email}
                onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-green outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" /> Signal Username
              </label>
              <input 
                type="text" 
                value={settings.signal_username}
                onChange={(e) => setSettings({...settings, signal_username: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-green outline-none font-mono"
                placeholder="0xacun3tix.30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">GitHub URL</label>
              <input 
                type="url" 
                value={settings.github_url}
                onChange={(e) => setSettings({...settings, github_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-green outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">LinkedIn URL</label>
              <input 
                type="url" 
                value={settings.linkedin_url}
                onChange={(e) => setSettings({...settings, linkedin_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-green outline-none"
              />
            </div>
          </div>
        </GlassCard>

        <div className="flex justify-end pt-4">
          <CyberButton type="submit" disabled={loading} size="lg">
            <Save className="w-5 h-5 mr-2" />
            {loading ? 'SYNCING...' : 'COMMIT_CHANGES'}
          </CyberButton>
        </div>
      </form>
    </div>
  );
}
