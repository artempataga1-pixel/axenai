'use client';

import { useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export default function GlitchText({ text, className = '', tag: Tag = 'span' }: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;

    const triggerGlitch = () => {
      el.setAttribute('data-glitch', 'true');
      setTimeout(() => el.removeAttribute('data-glitch'), 400);
      timeout = setTimeout(triggerGlitch, 3000 + Math.random() * 4000);
    };

    timeout = setTimeout(triggerGlitch, 2000 + Math.random() * 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <style>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .glitch-text[data-glitch="true"]::before {
          animation: glitch 0.4s steps(1) forwards;
          color: #00e5ff;
          text-shadow: -2px 0 #00e5ff;
          opacity: 1;
        }
        .glitch-text[data-glitch="true"]::after {
          animation: glitch 0.4s steps(1) 0.05s forwards;
          color: #ff003c;
          text-shadow: 2px 0 #ff003c;
          opacity: 1;
        }
      `}</style>
      <Tag
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className={`glitch-text ${className}`}
        data-text={text}
      >
        {text}
      </Tag>
    </>
  );
}
