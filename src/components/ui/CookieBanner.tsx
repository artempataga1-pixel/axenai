'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!localStorage.getItem('cookie-consent')) {
        setVisible(true);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', '1');
    setVisible(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9997,
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'rgba(4,10,18,0.97)',
        borderTop: '1px solid rgba(0,229,255,0.15)',
        backdropFilter: 'blur(12px)',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.72rem',
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.05em',
        lineHeight: 1.6,
        margin: 0,
        flex: 1,
        minWidth: '200px',
      }}>
        Мы используем файлы cookie для корректной работы сайта.{' '}
        <Link href="/privacy" style={{ color: 'rgba(0,229,255,0.7)', textDecoration: 'underline' }}>
          Политика конфиденциальности
        </Link>
      </p>
      <button
        onClick={accept}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          padding: '0.5rem 1.4rem',
          background: 'rgba(0,180,255,0.1)',
          border: '1px solid rgba(0,229,255,0.5)',
          color: '#00e5ff',
          cursor: 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onMouseEnter={e => { const b = e.currentTarget; b.style.background = 'rgba(0,180,255,0.2)'; }}
        onMouseLeave={e => { const b = e.currentTarget; b.style.background = 'rgba(0,180,255,0.1)'; }}
      >
        Принять
      </button>
    </div>
  );
}
