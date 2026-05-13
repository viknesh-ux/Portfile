'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      transition: { type: 'spring' as const, damping: 20, stiffness: 250, mass: 0.5 }
    },
    hover: {
      height: 64,
      width: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: 'rgba(0, 242, 255, 0.2)',
      mixBlendMode: 'difference' as any,
      transition: { type: 'spring' as const, damping: 20, stiffness: 250, mass: 0.5 }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyber-cyan pointer-events-none z-[9999] hidden md:block"
        animate={isHovering ? 'hover' : 'default'}
        variants={variants}
      />
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-cyber-cyan rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{ type: 'spring' as const, damping: 30, stiffness: 500, mass: 0.1 }}
      />
    </>
  );
}
