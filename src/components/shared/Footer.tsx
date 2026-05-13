import { Shield } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-cyber-cyan/10 bg-cyber-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyber-cyan" />
              <span className="text-xl font-bold tracking-tighter uppercase font-mono">
                0x<span className="text-cyber-cyan">acun3tix</span>
              </span>
            </Link>
          </div>

          <div className="flex gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyber-cyan mb-2">Navigation</span>
              <Link href="/#info" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">Projects</Link>
              <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Writeups/Blog</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
            © 2024 0XACUN3TIX_RESEARCH_LABS. ALL_RIGHTS_RESERVED.
          </p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-[10px] font-mono text-cyber-green uppercase tracking-widest">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
