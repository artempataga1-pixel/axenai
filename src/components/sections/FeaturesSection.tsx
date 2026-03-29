'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/ui/Scene3D'), { ssr: false });

const features = [
  {
    title: 'Дизайн под твой бренд',
    desc: 'Не тема из WordPress. Уникальный визуал под твою нишу — ИИ адаптирует стиль и цвета.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <polygon points="18,2 34,10 34,26 18,34 2,26 2,10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <polygon points="18,8 28,13 28,23 18,28 8,23 8,13" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5"/>
        <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.9"/>
        <line x1="18" y1="2" x2="18" y2="8" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
        <line x1="18" y1="28" x2="18" y2="34" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: 'Тексты, которые продают',
    desc: 'Копирайтинг с фокусом на конверсию. Берёшь как есть или дорабатываешь.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="3" y="5" width="30" height="26" rx="0" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="3" y1="5" x2="33" y2="5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="3" y="5" width="30" height="6" fill="currentColor" opacity="0.12"/>
        <line x1="9" y1="17" x2="27" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.8"/>
        <line x1="9" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
        <line x1="9" y1="27" x2="20" y2="27" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <rect x="9" y="14" width="2" height="7" fill="currentColor" opacity="0.9"/>
      </svg>
    ),
  },
  {
    title: 'Мобильная версия',
    desc: 'Все сайты адаптивны по умолчанию. Проверяем на реальных устройствах.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="10" y="2" width="16" height="32" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="10" y1="7" x2="26" y2="7" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
        <line x1="10" y1="29" x2="26" y2="29" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
        <circle cx="18" cy="31.5" r="1" fill="currentColor" opacity="0.7"/>
        <rect x="14" y="10" width="8" height="1.2" rx="0.6" fill="currentColor" opacity="0.5"/>
        <rect x="13" y="13" width="10" height="10" rx="0" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.5"/>
        <line x1="13" y1="17" x2="23" y2="17" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
        <line x1="18" y1="13" x2="18" y2="23" stroke="currentColor" strokeWidth="0.5" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: 'SEO-основа с первого дня',
    desc: 'Метатеги, структура заголовков, скорость загрузки — всё настроено.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="15" cy="15" r="10" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="22.5" y1="22.5" x2="32" y2="32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
        <line x1="15" y1="9" x2="15" y2="21" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
        <line x1="9" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
        <circle cx="15" cy="15" r="4" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
        <rect x="26" y="26" width="6" height="6" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.4"/>
      </svg>
    ),
  },
  {
    title: 'Форма заявки / интеграции',
    desc: 'Контактные формы, CRM, WhatsApp, Telegram — настраиваем по запросу.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="6" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="30" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <circle cx="30" cy="28" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="9.5" y1="17" x2="26.5" y2="9.5" stroke="currentColor" strokeWidth="0.9" opacity="0.7"/>
        <line x1="9.5" y1="19" x2="26.5" y2="26.5" stroke="currentColor" strokeWidth="0.9" opacity="0.7"/>
        <circle cx="6" cy="18" r="1.5" fill="currentColor" opacity="0.8"/>
        <circle cx="30" cy="8" r="1.5" fill="currentColor" opacity="0.8"/>
        <circle cx="30" cy="28" r="1.5" fill="currentColor" opacity="0.8"/>
      </svg>
    ),
  },
  {
    title: 'Ты владеешь всем',
    desc: 'Код, домен, хостинг — всё твоё. Никакой подписки после сдачи.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="8" y="16" width="20" height="16" rx="0" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <path d="M12 16 V12 C12 7.6 24 7.6 24 12 V16" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <rect x="8" y="16" width="20" height="5" fill="currentColor" opacity="0.1"/>
        <circle cx="18" cy="25" r="2.5" stroke="currentColor" strokeWidth="1" fill="none"/>
        <line x1="18" y1="27.5" x2="18" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
        <line x1="3" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
        <line x1="28" y1="16" x2="33" y2="16" stroke="currentColor" strokeWidth="0.7" opacity="0.4"/>
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [size3D, setSize3D] = useState(200);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setSize3D(window.innerWidth < 640 ? 150 : 200);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section ref={sectionRef} className="mob-section" style={{ background: '#000', width: '100%', position: 'relative', overflow: 'hidden', padding: '7rem 1rem' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' }}>
        {/* Заголовок */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: '4rem', flexWrap: 'wrap', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'opacity 0.7s, transform 0.7s' }}>
          <div className="mob-3d" style={{ flex: '0 0 200px' }}>
            <Scene3D shape="icosahedron" size={size3D} color="#00e5ff" opacity={0.8} />
          </div>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem', padding: '4px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>ЧТО ВХОДИТ</div>
            <h2 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.1 }}>
              Не список технологий —{' '}
              <span style={{ color: '#00e5ff' }}>реальная ценность</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', marginTop: '0.75rem' }}>
              Каждый сайт от AXEN AI работает на тебя с первого дня.
            </p>
          </div>
        </div>

        {/* Карточки */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '12px' }}>
          {features.map((f, i) => (
            <div
              key={i}
              className="process-card-outer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(30px)',
                transition: `opacity 0.6s ${i * 0.08}s, transform 0.6s ${i * 0.08}s`,
              }}
            >
              <div className="process-card-inner feature-card-inner">
                {/* Иконка */}
                <div className="feature-icon">
                  {f.icon}
                </div>

                <h3 className="feature-title" style={{ color: '#e0f7ff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem' }}>
                  {f.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }} />
    </section>
  );
}
