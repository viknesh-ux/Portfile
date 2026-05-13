'use client';

import { useState, useEffect } from 'react';
import GlassCard from '@/components/shared/GlassCard';
import CyberButton from '@/components/shared/CyberButton';
import { supabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { Trash2, Mail, User, Clock, CheckCircle2, MessageSquare } from 'lucide-react';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  };

  const markAsRead = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('messages').update({ is_read: !currentStatus }).eq('id', id);
    if (!error) {
      fetchMessages();
      toast.success(currentStatus ? 'Message marked as unread.' : 'Message marked as read.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently purge this transmission from history?')) return;
    setLoading(true);
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) {
      toast.error('Purge failed: ' + error.message);
    } else {
      toast.success('Transmission purged.');
      fetchMessages();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter">INCOMING_TRANSMISSIONS</h1>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-none">Unread</div>
              <div className="text-lg text-cyber-cyan font-mono font-bold">{messages.filter(m => !m.is_read).length}</div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        {messages.length > 0 ? messages.map((msg) => (
          <GlassCard 
            key={msg.id} 
            className={`p-6 border-l-4 transition-all ${msg.is_read ? 'border-white/5 opacity-60' : 'border-cyber-cyan shadow-[0_0_20px_rgba(0,242,255,0.1)]'}`}
          >
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-grow space-y-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-cyber-cyan" />
                    <span className="font-bold text-white font-mono uppercase tracking-tight">{msg.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <a href={`mailto:${msg.email}`} className="text-sm text-gray-400 hover:text-cyber-cyan font-mono underline decoration-cyber-cyan/30 underline-offset-4">
                      {msg.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">
                      {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="bg-cyber-black/40 border border-white/5 p-4 rounded-lg relative">
                  <MessageSquare className="absolute -top-2 -left-2 w-4 h-4 text-white/10" />
                  <p className="text-gray-300 leading-relaxed font-outfit whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 justify-end">
                <button 
                  onClick={() => markAsRead(msg.id, msg.is_read)}
                  className={`p-3 rounded-lg border transition-all ${msg.is_read ? 'bg-white/5 border-white/10 text-gray-500 hover:text-white' : 'bg-cyber-cyan/10 border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan hover:text-black'}`}
                  title={msg.is_read ? "Mark as Unread" : "Mark as Read"}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(msg.id)}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  title="Purge Transmission"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </GlassCard>
        )) : (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-xl">
             <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4 opacity-20" />
             <div className="text-sm font-mono text-gray-600 uppercase tracking-[0.3em]">No incoming signals detected...</div>
          </div>
        )}
      </div>
    </div>
  );
}
