'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import CyberButton from '@/components/shared/CyberButton';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Edit3, Save, X, ExternalLink, Award } from 'lucide-react';

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCert, setEditingCert] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    setLoading(true);
    const { data } = await supabase.from('achievements').select('*').order('created_at', { ascending: false });
    if (data) setCertificates(data);
    setLoading(false);
  };

  const handleSave = async (cert: any) => {
    setLoading(true);
    let error;
    const certData = {
      ...cert,
      category: 'Certification'
    };

    if (cert.id) {
      const { error: err } = await supabase.from('achievements').update(certData).eq('id', cert.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('achievements').insert([certData]);
      error = err;
    }

    if (error) {
      toast.error('Sync failure: ' + error.message);
    } else {
      toast.success('Certificate record synchronized.');
      setEditingCert(null);
      setIsAdding(false);
      fetchCertificates();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Erase this certificate record?')) return;
    setLoading(true);
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (error) {
      toast.error('Deletion failed: ' + error.message);
    } else {
      toast.success('Record erased.');
      fetchCertificates();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter">CERTIFICATE_REGISTRY</h1>
        <CyberButton onClick={() => { setIsAdding(true); setEditingCert({ title: '', link_url: '', image_url: '', category: 'Certification' }); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Certificate
        </CyberButton>
      </div>

      {(isAdding || editingCert) && (
        <GlassCard className="p-8 border-cyber-cyan/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-mono text-cyber-cyan uppercase">{editingCert?.id ? 'Edit_Certificate' : 'New_Certificate_Entry'}</h3>
            <button onClick={() => { setEditingCert(null); setIsAdding(false); }} className="text-gray-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Certificate Heading (Title)</label>
              <input 
                type="text" 
                value={editingCert.title}
                onChange={(e) => setEditingCert({...editingCert, title: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none"
                placeholder="Certified Ethical Hacker (CEH)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Verification / Download URL</label>
              <input 
                type="text" 
                value={editingCert.link_url || ''}
                onChange={(e) => setEditingCert({...editingCert, link_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
                placeholder="https://verify.ec-council.org/..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Icon/Image URL (Optional)</label>
              <input 
                type="text" 
                value={editingCert.image_url || ''}
                onChange={(e) => setEditingCert({...editingCert, image_url: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none font-mono"
                placeholder="https://example.com/badge.png"
              />
            </div>
          </div>
          
          <CyberButton onClick={() => handleSave(editingCert)} disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'SYNCHRONIZING...' : 'COMMIT_TO_REGISTRY'}
          </CyberButton>
        </GlassCard>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <GlassCard key={cert.id} className="p-4 flex items-center justify-between group border-white/5 hover:border-cyber-cyan/30">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded bg-cyber-cyan/5 border border-cyber-cyan/20 text-cyber-cyan">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white font-mono uppercase tracking-tight">{cert.title}</h4>
                {cert.link_url && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono mt-1">
                    <ExternalLink className="w-3 h-3" />
                    <span className="truncate max-w-[200px]">{cert.link_url}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingCert(cert)} className="p-2 rounded bg-white/5 text-gray-400 hover:text-cyber-cyan">
                <Edit3 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cert.id)} className="p-2 rounded bg-white/5 text-gray-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
