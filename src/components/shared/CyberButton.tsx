'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}

export default function CyberButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  glow = true,
  ...props
}: CyberButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-cyber-cyan text-cyber-black hover:bg-white hover:text-cyber-cyan",
    secondary: "bg-cyber-purple text-white hover:bg-white hover:text-cyber-purple",
    outline: "bg-transparent border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan/10",
    ghost: "bg-transparent text-cyber-cyan hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base font-bold",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        glow && variant === 'primary' && "shadow-[0_0_15px_rgba(0,242,255,0.5)]",
        glow && variant === 'secondary' && "shadow-[0_0_15px_rgba(110,0,255,0.5)]",
        className
      )}
      {...props}
    >
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-inherit opacity-50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-inherit opacity-50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-inherit opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-inherit opacity-50" />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
    </motion.button>
  );
}
