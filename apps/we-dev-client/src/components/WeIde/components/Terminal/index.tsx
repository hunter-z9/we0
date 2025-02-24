import { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { useTerminal } from './hooks/useTerminal';
import { cn } from '../../utils/cn';
import 'xterm/css/xterm.css';
import './styles.css';

interface TerminalProps {
  onClose: () => void;
}

export function Terminal({ onClose }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReady } = useTerminal(containerRef);

  return (
    <div className={`
      w-full h-full flex flex-col`}>
      <div className="flex items-center justify-between bg-[#f5f5f5] dark:bg-[#252526] px-4 py-1 border-b border-[#e5e5e5] dark:border-[#252525]">
        <div className="flex items-center">
          <TerminalIcon className={cn(
            "w-3 h-3 mr-2",
            isReady ? "text-green-500" : "text-yellow-500"
          )} />
          <span className="text-xs text-[#333333] dark:text-gray-300 font-medium">
            Terminal {!isReady && "(Initializing...)"}
          </span>
        </div>
        <button 
          onClick={onClose}
          className="hover:bg-[#e5e5e5] dark:hover:bg-[#333333] p-1 rounded transition-colors"
        >
          <X className="w-3 h-3 text-[#616161] dark:text-gray-300" />
        </button>
      </div>
      <div 
        ref={containerRef}
        className="flex-1 overflow-hidden terminal-container bg-white dark:bg-[#1e1e1e] px-2 py-1"
      />
    </div>
  );
}