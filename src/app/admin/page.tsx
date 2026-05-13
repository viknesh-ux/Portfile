'use client';

import GlassCard from '@/components/shared/GlassCard';
import { Eye, MessageSquare, Briefcase, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Views', value: '12,840', icon: Eye, change: '+12%', color: 'text-blue-400' },
  { label: 'Form Submissions', value: '48', icon: MessageSquare, change: '+5%', color: 'text-cyber-cyan' },
  { label: 'Active Projects', value: '14', icon: Briefcase, change: '0', color: 'text-cyber-purple' },
  { label: 'System Health', value: '99.9%', icon: Activity, change: 'Stable', color: 'text-cyber-green' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-mono uppercase tracking-tighter">System_Overview</h1>
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full bg-white/5">
          Last Synchronized: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <GlassCard key={idx} delay={idx * 0.1} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-mono ${stat.change.startsWith('+') ? 'text-cyber-green' : 'text-gray-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold font-mono text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
          </GlassCard>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Recent Messages */}
        <GlassCard className="md:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold font-mono uppercase tracking-wider">Incoming_Transmissions</h3>
            <button className="text-xs font-mono text-cyber-cyan hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-cyber-cyan/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyber-purple/10 flex items-center justify-center font-bold text-cyber-purple">
                    U{i}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Sender_ID: User_0{i}</div>
                    <div className="text-xs text-gray-500 truncate max-w-md">Security inquiry regarding vulnerability assessment...</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-gray-500 font-mono">2024-05-1{i} 14:2{i}</div>
                  <div className="text-[10px] text-cyber-cyan font-mono uppercase tracking-widest mt-1">Status: UNREAD</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard className="p-6">
          <h3 className="text-xl font-bold font-mono uppercase tracking-wider mb-6">Quick_Commands</h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm font-mono uppercase tracking-widest hover:bg-cyber-cyan hover:text-cyber-black transition-all">
              + New Project
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-sm font-mono uppercase tracking-widest hover:bg-cyber-purple hover:text-white transition-all">
              + New Blog Post
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm font-mono uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
              Update Site Settings
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
