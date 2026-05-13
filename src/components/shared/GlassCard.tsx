'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  hoverGlow = true,
  delay = 0
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverGlow ? { 
        boxShadow: "0 0 25px rgba(0, 242, 255, 0.15)",
        borderColor: "rgba(0, 242, 255, 0.5)"
      } : {}}
      className={cn(
        "glass rounded-xl p-6 relative overflow-hidden transition-colors group",
        className
      )}
    >
      {/* Subtle Grid Background in card */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-0 left-0 w-px h-4 bg-cyber-cyan/40" />
        <div className="absolute top-0 left-0 w-4 h-px bg-cyber-cyan/40" />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none rotate-180">
        <div className="absolute top-0 left-0 w-px h-4 bg-cyber-cyan/40" />
        <div className="absolute top-0 left-0 w-4 h-px bg-cyber-cyan/40" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
