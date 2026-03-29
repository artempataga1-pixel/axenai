'use client';

import { useEffect, useState, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  interval?: number;
}

const GLITCH_CHARS = 'アイウエオカキクケコ!@#$%^&*<>[]{}|0123456789ABCDEF';

export default function GlitchText({
  text,
  className = '',
  tag: Tag = 'span',
  interval = 3000,
}: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      let iterations = 0;
      const maxIterations = 8;

      const glitchInterval = setInterval(() => {
        setDisplayed(
          text
            .split('')
            .map((char, idx) => {
              if (char === ' ') return ' ';
              if (iterations > idx * (maxIterations / text.length)) return char;
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join('')
        );

        iterations++;
        if (iterations >= maxIterations) {
          clearInterval(glitchInterval);
          setDisplayed(text);
          setIsGlitching(false);
        }
      }, 50);
    };

    const timer = setInterval(triggerGlitch, interval);
    // Запуск сразу при монтировании
    setTimeout(triggerGlitch, 500);

    return () => clearInterval(timer);
  }, [text, interval]);

  return (
    <Tag
      className={`relative inline-block font-terminal ${className}`}
      data-text={text}
      style={{
        textShadow: isGlitching
          ? '2px 0 #00e5ff, -2px 0 #ff0000'
          : '0 0 10px currentColor',
      }}
    >
      {displayed}
    </Tag>
  );
}
