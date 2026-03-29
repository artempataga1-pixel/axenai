'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface NeonButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'green' | 'cyan' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
}

export default function NeonButton({
  children,
  href,
  onClick,
  variant = 'green',
  size = 'md',
  className = '',
  type = 'button',
}: NeonButtonProps) {
  const base = 'relative font-terminal font-medium tracking-widest uppercase transition-all duration-300 inline-flex items-center gap-2 border';

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variants = {
    green: 'text-[#00ff41] border-[#00ff41] bg-transparent hover:bg-[rgba(0,255,65,0.08)] hover:shadow-[0_0_15px_#00ff41,0_0_30px_rgba(0,255,65,0.4)] shadow-[0_0_8px_rgba(0,255,65,0.3)]',
    cyan: 'text-[#00e5ff] border-[#00e5ff] bg-transparent hover:bg-[rgba(0,229,255,0.08)] hover:shadow-[0_0_15px_#00e5ff,0_0_30px_rgba(0,229,255,0.4)] shadow-[0_0_8px_rgba(0,229,255,0.3)]',
    outline: 'text-[#e2e8f0] border-[#1e293b] bg-transparent hover:border-[#00ff41] hover:text-[#00ff41] hover:shadow-[0_0_8px_rgba(0,255,65,0.2)]',
  };

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        <span className="relative z-10">{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
