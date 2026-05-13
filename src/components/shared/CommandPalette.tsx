'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Cpu, BookOpen, Mail, X, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const actions = [
    { name: 'System Info (About)', icon: User, href: '/#info' },
    { name: 'View Projects Registry', icon: Cpu, href: '/projects' },
    { name: 'Technical Skill Matrix', icon: Terminal, href: '/skills' },
    { name: 'Read Writeups/Blog', icon: BookOpen, href: '/blog' },
    { name: 'Establish Connection (Contact)', icon: Mail, href: '/#contact' },
  ];

  const filteredActions = query === '' 
    ? actions 
    : actions.filter(action => action.name.toLowerCase().includes(query.toLowerCase()));

  const handleAction = (href: string) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (window.location.pathname === path || (path === '/' && window.location.pathname === '')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          router.push(href);
        }
      } else {
        router.push(href);
      }
    } else {
      router.push(href);
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-cyber-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-xl glass rounded-xl overflow-hidden border border-cyber-cyan/30 shadow-[0_0_50px_rgba(0,242,255,0.2)]"
          >
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-cyber-cyan" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none text-white font-mono"
              />
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredActions.length > 0 ? (
                filteredActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAction(action.href)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-cyber-cyan/10 group transition-colors text-left"
                  >
                    <action.icon className="w-5 h-5 text-gray-500 group-hover:text-cyber-cyan" />
                    <span className="text-gray-300 group-hover:text-white font-mono">{action.name}</span>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 font-mono">No results found for "{query}"</div>
              )}
            </div>

            <div className="p-3 bg-cyber-cyan/5 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-widest">
              <span>Press <kbd className="bg-white/10 px-1 rounded">ESC</kbd> to close</span>
              <span>Use <kbd className="bg-white/10 px-1 rounded">Ctrl+K</kbd> to toggle</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
