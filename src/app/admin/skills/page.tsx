'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import CyberButton from '@/components/shared/CyberButton';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';

export default function AdminSkills() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data } = await supabase.from('skills').select('*').order('category', { ascending: true });
    if (data) setSkills(data);
    setLoading(false);
  };

  const handleSave = async (skill: any) => {
    setLoading(true);
    let error;
    if (skill.id) {
      const { error: err } = await supabase.from('skills').update(skill).eq('id', skill.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('skills').insert([skill]);
      error = err;
    }

    if (error) {
      toast.error('Sync failure: ' + error.message);
    } else {
      toast.success('Skill matrix synchronized.');
      setEditingSkill(null);
      setIsAdding(false);
      fetchSkills();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Erase this skill from the matrix?')) return;
    setLoading(true);
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) {
      toast.error('Deletion failed: ' + error.message);
    } else {
      toast.success('Skill erased.');
      fetchSkills();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter">SKILL_MATRIX</h1>
        <CyberButton onClick={() => { setIsAdding(true); setEditingSkill({ name: '', category: 'Offensive Security', level: 80 }); }}>
          <Plus className="w-4 h-4 mr-2" />
          Inject New Skill
        </CyberButton>
      </div>

      {(isAdding || editingSkill) && (
        <GlassCard className="p-8 border-cyber-cyan/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-mono text-cyber-cyan uppercase">{editingSkill?.id ? 'Recalibrate_Skill' : 'New_Skill_Injection'}</h3>
            <button onClick={() => { setEditingSkill(null); setIsAdding(false); }} className="text-gray-500 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Skill Name</label>
              <input 
                type="text" 
                value={editingSkill.name}
                onChange={(e) => setEditingSkill({...editingSkill, name: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Category</label>
              <select 
                value={editingSkill.category}
                onChange={(e) => setEditingSkill({...editingSkill, category: e.target.value})}
                className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-2 px-4 text-white focus:border-cyber-cyan outline-none appearance-none"
              >
                <option value="Offensive Security">Offensive Security</option>
                <option value="Defensive Security">Defensive Security</option>
                <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                <option value="Core Stack">Core Stack</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400">Level ({editingSkill.level}%)</label>
              <input 
                type="range" 
                min="0" max="100"
                value={editingSkill.level}
                onChange={(e) => setEditingSkill({...editingSkill, level: parseInt(e.target.value)})}
                className="w-full accent-cyber-cyan"
              />
            </div>
          </div>
          
          <CyberButton onClick={() => handleSave(editingSkill)} disabled={loading} className="w-full">
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'SYNCHRONIZING...' : 'COMMIT_TO_MATRIX'}
          </CyberButton>
        </GlassCard>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyber-cyan/30 transition-colors">
            <div>
              <div className="text-sm font-bold text-white uppercase tracking-wider">{skill.name}</div>
              <div className="text-[10px] text-gray-500 font-mono uppercase">{skill.category} • {skill.level}%</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingSkill(skill)} className="p-2 rounded bg-white/5 text-gray-400 hover:text-cyber-cyan">
                <Edit3 className="w-3 h-3" />
              </button>
              <button onClick={() => handleDelete(skill.id)} className="p-2 rounded bg-white/5 text-gray-400 hover:text-red-500">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
