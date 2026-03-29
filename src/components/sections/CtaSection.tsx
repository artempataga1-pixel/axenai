'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/ui/Scene3D'), { ssr: false });

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mob-section" style={{ background: '#000', width: '100%', position: 'relative', overflow: 'hidden', padding: '7rem 1rem 4rem' }}>
      {/* Сетка */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(rgba(0,180,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      {/* Свечение */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,100,255,0.08) 0%, transparent 70%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        {/* 3D объект */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', opacity: visible ? 1 : 0, transition: 'opacity 1s' }}>
          <Scene3D shape="cube" size={200} color="#00e5ff" opacity={0.85} style={{ width: '200px' }} />
        </div>

        <div
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(40px)', transition: 'opacity 0.9s, transform 0.9s' }}
        >
          <div style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '4px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>
            ОСТАЛИСЬ ВОПРОСЫ? ПРОСТО НАПИШИ
          </div>

          <h2 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Твой сайт может быть готов{' '}
            <span style={{ color: '#00e5ff', textShadow: '0 0 40px rgba(0,229,255,0.4)' }}>через 72 часа</span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
            Оставь заявку — свяжемся в течение 15 минут, обсудим задачу и назовём точную стоимость. Без обязательств.
          </p>

          <div className="mob-btns" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/order">
              <button
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2.5rem', background: 'rgba(0,180,255,0.1)', border: '1.5px solid rgba(0,229,255,0.7)', color: '#00e5ff', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,180,255,0.2)', transition: 'all 0.3s' }}
                onMouseEnter={e => { const b = e.currentTarget; b.style.background = 'rgba(0,180,255,0.22)'; b.style.boxShadow = '0 0 50px rgba(0,180,255,0.45)'; }}
                onMouseLeave={e => { const b = e.currentTarget; b.style.background = 'rgba(0,180,255,0.1)'; b.style.boxShadow = '0 0 30px rgba(0,180,255,0.2)'; }}
              >Оставить заявку →</button>
            </Link>
            <a
              href="https://t.me/axenai_bussines"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2.5rem', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { const a = e.currentTarget; a.style.borderColor = 'rgba(255,255,255,0.4)'; a.style.color = '#fff'; }}
              onMouseLeave={e => { const a = e.currentTarget; a.style.borderColor = 'rgba(255,255,255,0.15)'; a.style.color = 'rgba(255,255,255,0.6)'; }}
            >Написать в Telegram</a>
            <a
              href="https://max.ru/u/f9LHodD0cOIviRaJ3XgXI4U66OOyCmSuPwwMMuVrLMDYjKs-Grm1f7JcbhU"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2.5rem', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { const a = e.currentTarget; a.style.borderColor = 'rgba(255,255,255,0.4)'; a.style.color = '#fff'; }}
              onMouseLeave={e => { const a = e.currentTarget; a.style.borderColor = 'rgba(255,255,255,0.15)'; a.style.color = 'rgba(255,255,255,0.6)'; }}
            >Написать в Max</a>
          </div>

          <p style={{ marginTop: '1.5rem', color: 'rgba(255,255,255,0.18)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
            Без предоплаты до старта работ · Ответим за 15 минут
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '5rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(0,180,255,0.1)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#00e5ff', letterSpacing: '0.15em' }}>AXEN_AI</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>© 2026 · SYSTEM_STATUS: ONLINE</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="https://t.me/axenai_bussines" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'rgba(0,229,255,0.5)', textDecoration: 'none' }}>@axenai</a>
          <a href="https://max.ru/u/f9LHodD0cOIviRaJ3XgXI4U66OOyCmSuPwwMMuVrLMDYjKs-Grm1f7JcbhU" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: 'rgba(0,229,255,0.5)', textDecoration: 'none' }}>Max</a>
        </div>
      </div>
    </section>
  );
}
