'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  lines: string[];
  className?: string;
  speed?: number;
  pauseBetween?: number;
}

export default function TypewriterText({
  lines,
  className = '',
  speed = 60,
  pauseBetween = 1500,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIdx];

    if (!isDeleting && charIdx <= current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    }

    if (!isDeleting && charIdx > current.length) {
      const t = setTimeout(() => setIsDeleting(true), pauseBetween);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIdx > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    }

    if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setLineIdx((i) => (i + 1) % lines.length);
    }
  }, [charIdx, isDeleting, lineIdx, lines, speed, pauseBetween]);

  return (
    <span className={`font-terminal ${className}`}>
      {displayed}
      <span className="cursor-blink" />
    </span>
  );
}
