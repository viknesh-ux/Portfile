'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User } from 'lucide-react';
import CyberButton from '@/components/shared/CyberButton';
import GlassCard from '@/components/shared/GlassCard';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Access Granted. Redirecting to secure dashboard...');
      router.push('/admin');
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed. Unauthorized access.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-cyber-black">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-cyber-cyan mx-auto mb-4" />
          <h1 className="text-3xl font-bold font-mono tracking-tighter uppercase">
            ADMIN_<span className="text-cyber-cyan">GATEWAY</span>
          </h1>
          <p className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mt-2">
            Secure Authentication Required
          </p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-1">Identity UID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@cybershield.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyber-cyan transition-colors font-mono text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-gray-400 ml-1">Security Token</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-cyber-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyber-cyan transition-colors font-mono text-sm"
                />
              </div>
            </div>

            <CyberButton 
              type="submit" 
              disabled={loading}
              className="w-full py-4"
            >
              {loading ? 'VERIFYING...' : 'INITIATE ACCESS'}
            </CyberButton>
          </form>
        </GlassCard>

        <div className="mt-8 text-center">
          <button 
            onClick={() => router.push('/')}
            className="text-xs font-mono text-gray-500 hover:text-cyber-cyan transition-colors uppercase tracking-widest"
          >
            {'<--'} Return to Public Terminal
          </button>
        </div>
      </motion.div>
    </div>
  );
}
