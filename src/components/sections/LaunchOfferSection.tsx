'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/ui/Scene3D'), { ssr: false });

const TOTAL_SPOTS = 2;

export default function LaunchOfferSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [size3D, setSize3D] = useState(340);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setSize3D(window.innerWidth < 640 ? 200 : 340);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mob-section"
      style={{ background: '#000', width: '100%', position: 'relative', overflow: 'hidden', padding: '7rem 1rem' }}
    >
      {/* Фоновая сетка */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,180,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,180,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Верхняя линия */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent)' }} />

      <div className="mob-col" style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>

        {/* Левая часть — текст */}
        <div className="mob-full" style={{ flex: 1, minWidth: '300px', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'opacity 0.8s, transform 0.8s' }}>
          {/* Лейбл */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', padding: '6px 16px', border: '1px solid rgba(0,229,255,0.3)', borderRadius: '9999px', background: 'rgba(0,180,255,0.06)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e5ff', animation: 'pulse 2s infinite' }} />
            <span style={{ color: '#00e5ff', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em' }}>ЗАПУСК — СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ</span>
          </div>

          <h2 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, color: '#fff', marginBottom: '1rem' }}>
            Первые <span style={{ color: '#00e5ff', textShadow: '0 0 30px rgba(0,229,255,0.5)' }}>2 сайта</span>{' '}
            за <span style={{ color: '#00e5ff', textShadow: '0 0 30px rgba(0,229,255,0.5)' }}>15 000 ₽</span>
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: '440px' }}>
            Мы только запускаемся и берём первых клиентов по минимальной цене.
            Взамен — честный отзыв и возможность показать работу в портфолио.
          </p>

          {/* Счётчик мест */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            {Array.from({ length: TOTAL_SPOTS }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{
                  width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid rgba(0,229,255,0.7)', background: 'rgba(0,180,255,0.1)',
                  color: '#00e5ff', fontSize: '1.3rem', fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '0 0 20px rgba(0,180,255,0.15)',
                }}>○</div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(0,229,255,0.7)' }}>СВОБОДНО</span>
              </div>
            ))}
          </div>

          {/* Что входит */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {['Полноценный лендинг под ключ', 'ИИ-тексты + дизайн под бизнес', 'Домен, хостинг, SSL в подарок'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#00e5ff', fontSize: '0.8rem' }}>◈</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{t}</span>
              </div>
            ))}
          </div>

          <Link href="/order">
            <button
              style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase', padding: '1rem 2.5rem',
                background: 'rgba(0,180,255,0.1)', border: '1.5px solid rgba(0,229,255,0.7)',
                color: '#00e5ff', cursor: 'pointer', boxShadow: '0 0 30px rgba(0,180,255,0.2)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={e => { const b = e.currentTarget; b.style.background = 'rgba(0,180,255,0.2)'; b.style.boxShadow = '0 0 50px rgba(0,180,255,0.4)'; }}
              onMouseLeave={e => { const b = e.currentTarget; b.style.background = 'rgba(0,180,255,0.1)'; b.style.boxShadow = '0 0 30px rgba(0,180,255,0.2)'; }}
            >
              Занять место →
            </button>
          </Link>

          <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
            Без предоплаты до старта · Свяжемся за 15 минут
          </p>
        </div>

        {/* Правая часть — 3D */}
        <div className="mob-3d" style={{ flex: '0 0 340px', opacity: visible ? 1 : 0, transition: 'opacity 1s 0.3s' }}>
          <Scene3D shape="torusknot" size={size3D} color="#00e5ff" opacity={0.8} />
        </div>
      </div>

      {/* Нижняя линия */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }} />
    </section>
  );
}
