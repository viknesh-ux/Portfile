'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Shield, LayoutDashboard, Briefcase, FileText, Settings, LogOut, ChevronRight, Terminal, Award, Inbox } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else {
        setUser(session?.user ?? null);
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session && pathname !== '/admin/login') {
          router.push('/admin/login');
        } else {
          setUser(session?.user ?? null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Messages', icon: Inbox, href: '/admin/messages' },
    { name: 'Projects', icon: Briefcase, href: '/admin/projects' },
    { name: 'Writeups/Blog', icon: FileText, href: '/admin/blog' },
    { name: 'Skills', icon: Terminal, href: '/admin/skills' },
    { name: 'Certificates', icon: Award, href: '/admin/achievements' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <div className="min-h-screen bg-cyber-black flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-cyber-black/50 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Shield className="w-6 h-6 text-cyber-cyan" />
          <span className="font-bold font-mono text-sm tracking-tighter uppercase">0xacun3tix_admin</span>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors group ${pathname === item.href ? 'bg-cyber-cyan/10 text-cyber-cyan' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-mono uppercase tracking-widest">{item.name}</span>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-mono uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.02),transparent)]">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-cyber-black/20 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
            <span>Root</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{pathname.split('/').pop() || 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest leading-none">Status</div>
              <div className="text-[10px] text-cyber-green font-mono uppercase tracking-widest">Authorized Access</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center">
              <span className="text-xs font-bold text-cyber-cyan">AD</span>
            </div>
          </div>
        </header>
        
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
