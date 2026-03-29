import { ReactNode } from 'react';

interface TerminalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: 'green' | 'cyan';
}

export default function TerminalCard({
  title = 'terminal',
  children,
  className = '',
  variant = 'green',
}: TerminalCardProps) {
  const borderColor = variant === 'green' ? 'rgba(0,255,65,0.2)' : 'rgba(0,229,255,0.2)';
  const glowColor = variant === 'green' ? 'rgba(0,255,65,0.1)' : 'rgba(0,229,255,0.1)';
  const dotColor = variant === 'green' ? '#00ff41' : '#00e5ff';

  return (
    <div
      className={`rounded-sm overflow-hidden ${className}`}
      style={{
        background: 'rgba(10, 26, 16, 0.7)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}`,
      }}
    >
      {/* Шапка терминала */}
      <div
        className="flex items-center gap-2 px-4 py-2 border-b"
        style={{ borderColor, background: 'rgba(0,0,0,0.3)' }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-70" />
          <div className="w-2.5 h-2.5 rounded-full opacity-70" style={{ background: dotColor }} />
        </div>
        <span className="font-terminal text-xs ml-2" style={{ color: 'rgba(100,180,120,0.7)' }}>
          {'> '}{title}
        </span>
      </div>
      {/* Контент */}
      <div className="p-5">{children}</div>
    </div>
  );
}
