'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '/#info' },
  { name: 'Projects', href: '/projects' },
  { name: 'Skills', href: '/skills' },
  { name: 'Writeups/Blog', href: '/blog' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-cyber-black/80 backdrop-blur-lg border-b border-cyber-cyan/20 py-3' : 'bg-transparent py-5'}`}>
      {/* Scroll Progress Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyber-cyan origin-left z-[101]" 
        style={{ scaleX }}
      />
      
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-cyber-cyan group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-cyber-cyan/20 blur-lg rounded-full group-hover:bg-cyber-cyan/40 transition-colors" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase font-mono">
            0x<span className="text-cyber-cyan">acun3tix</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-sm font-mono uppercase tracking-widest text-gray-400 hover:text-cyber-cyan transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-cyber-cyan"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-cyber-black border-b border-cyber-cyan/20"
        >
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-mono uppercase tracking-widest text-gray-400 hover:text-cyber-cyan"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
