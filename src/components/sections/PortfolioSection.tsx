'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/ui/Scene3D'), { ssr: false });

const projects = [
  { title: 'APEX DETAIL', desc: 'Премиальный детейлинг-центр — полировка, керамика, PPF-защита. Лендинг под запись клиентов.', tags: ['Лендинг', 'Автодетейлинг'], href: 'https://apex-detail-pabl.vercel.app/' },
  { title: 'NOIR Barbershop', desc: 'Мужской барбершоп в Москве — стрижки, бритьё, spa. Лендинг с онлайн-записью.', tags: ['Лендинг', 'Барбершоп'], href: 'https://barbershop-noir.vercel.app/' },
  { title: 'LUMIÈRE BEAUTÉ', desc: 'Премиальный салон красоты — маникюр, окрашивание, spa. Лендинг с онлайн-записью.', tags: ['Лендинг', 'Салон красоты'], href: 'https://lumiere-tawny.vercel.app/' },
  { title: 'CleanPro', desc: 'Клининговая компания с калькулятором стоимости — квартиры, дома, послеремонтная уборка.', tags: ['Лендинг', 'Клининг'], href: 'https://cleaning-landing-pi.vercel.app/' },
  { title: 'Свежий Климат', desc: 'Строительная компания — фасадные работы, внутренняя отделка под ключ, утепление.', tags: ['Лендинг', 'Строительство'], href: 'https://svezhiyklimat.vercel.app/' },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [size3D, setSize3D] = useState(180);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setSize3D(window.innerWidth < 640 ? 130 : 180);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="mob-section" style={{ background: '#000', width: '100%', position: 'relative', overflow: 'hidden', padding: '7rem 1rem' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' }}>
        {/* Заголовок */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', marginBottom: '3.5rem', flexWrap: 'wrap', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'opacity 0.7s, transform 0.7s' }}>
          <div>
            <div style={{ display: 'inline-block', marginBottom: '1rem', padding: '4px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>ПРИМЕРЫ РАБОТ</div>
            <h2 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.1 }}>
              Что мы умеем делать
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem', marginTop: '0.75rem', maxWidth: '420px' }}>
              Реальные сайты — без клиентской базы, но с полной отдачей на каждый проект.
            </p>
          </div>
          <div className="mob-3d" style={{ flex: '0 0 180px' }}>
            <Scene3D shape="torus" size={size3D} color="#00e5ff" opacity={0.7} />
          </div>
        </div>

        {/* Карточки */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '12px' }}>
          {projects.map((p, i) => (
            <div
              key={i}
              className="process-card-outer portfolio-card-outer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(30px)',
                transition: `opacity 0.6s ${i * 0.12}s, transform 0.6s ${i * 0.12}s`,
              }}
            >
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none' }}
              >
                <div className="process-card-inner" style={{ padding: 0 }}>
                  {/* Preview */}
                  <div className="portfolio-preview">
                    <div className="portfolio-grid-bg" />
                    <div className="portfolio-icon-wrap">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect x="1" y="1" width="26" height="26" stroke="currentColor" strokeWidth="1" fill="none"/>
                        <rect x="5" y="5" width="18" height="18" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.5"/>
                        <line x1="1" y1="8" x2="27" y2="8" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
                        <circle cx="14" cy="17" r="3" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7"/>
                        <line x1="14" y1="8" x2="14" y2="14" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
                      </svg>
                    </div>
                    <span className="portfolio-soon-label">ПРОЕКТ</span>
                  </div>

                  {/* Инфо */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {p.tags.map((t, j) => (
                        <span key={j} className="portfolio-tag">{t}</span>
                      ))}
                    </div>
                    <h3 className="portfolio-title" style={{ color: '#e0f7ff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                      {p.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6 }}>{p.desc}</p>

                    <div className="portfolio-link-hint">
                      <span>Открыть сайт</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }} />
    </section>
  );
}
