'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: '$ whoami', type: 'input' },
    { text: 'Vignesh V Palazhi: Cybersecurity Researcher', type: 'output' },
    { text: '', type: 'output' },
    { text: '$ cat intro.txt', type: 'input' },
    { text: 'Welcome to my digital fortress. I specialize in penetration testing, secure architecture, and building tools that defend the open web.', type: 'output' },
    { text: '', type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const newLines: TerminalLine[] = [...lines, { text: `$ ${cmd}`, type: 'input' }];
    
    const command = cmd.toLowerCase().trim();
    
    switch (command) {
      case 'help':
        newLines.push({ text: 'Available commands:', type: 'output' });
        newLines.push({ text: '  ls           - List directory contents', type: 'output' });
        newLines.push({ text: '  cat intro.txt - Read introduction', type: 'output' });
        newLines.push({ text: '  whoami       - Display identity', type: 'output' });
        newLines.push({ text: '  clear        - Clear terminal screen', type: 'output' });
        break;
      case 'ls':
        newLines.push({ text: 'intro.txt  certifications.pdf  resume.pdf  projects/', type: 'output' });
        break;
      case 'cat intro.txt':
        newLines.push({ text: 'Welcome to my digital fortress. I specialize in penetration testing, secure architecture, and building tools that defend the open web.', type: 'output' });
        break;
      case 'whoami':
        newLines.push({ text: 'Vignesh V Palazhi: Cybersecurity Researcher', type: 'output' });
        break;
      case 'clear':
        setLines([]);
        return;
      case '':
        break;
      default:
        newLines.push({ text: `Command not found: ${command}. Type "help" for options.`, type: 'error' });
    }
    
    setLines(newLines);
    setInput('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto h-[400px] glass rounded-lg overflow-hidden border border-cyber-cyan/30 flex flex-col font-mono text-sm">
      {/* Terminal Header */}
      <div className="bg-cyber-cyan/10 border-b border-cyber-cyan/30 px-4 py-2 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <div className="text-cyber-cyan/70 text-xs">vignesh@cybershield:~</div>
        <div className="w-12" />
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="flex-grow p-6 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-cyber-cyan/30"
      >
        {lines.map((line, i) => (
          <div key={i} className={`
            ${line.type === 'input' ? 'text-cyber-cyan font-bold' : ''}
            ${line.type === 'output' ? 'text-gray-300' : ''}
            ${line.type === 'error' ? 'text-red-400' : ''}
            ${line.type === 'success' ? 'text-cyber-green' : ''}
            ${line.type === 'system' ? 'text-cyber-purple font-bold' : ''}
          `}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-cyber-cyan font-bold">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCommand(input)}
            className="bg-transparent border-none outline-none flex-grow text-white"
            autoFocus
          />
          <motion.div 
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-2 h-5 bg-cyber-cyan"
          />
        </div>
      </div>
    </div>
  );
}
