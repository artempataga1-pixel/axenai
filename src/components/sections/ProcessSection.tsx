'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/ui/Scene3D'), { ssr: false });

const steps = [
  { num: '01', title: 'Бриф за 10 минут', desc: 'Заполняешь короткую форму: ниша, стиль, задачи. Никаких долгих созвонов на старте — только если сам захочешь.' },
  { num: '02', title: 'ИИ строит прототип', desc: 'Наши модели генерируют структуру, тексты и визуальную концепцию под твой бизнес. Не шаблон — персонализированный черновик.' },
  { num: '03', title: 'Ты правишь, мы дорабатываем', desc: 'Смотришь результат. Говоришь что изменить. Вносим правки — быстро, без лишних вопросов.' },
  { num: '04', title: 'Запуск', desc: 'Домен, хостинг, SSL — всё настраиваем. Получаешь готовый работающий сайт и полный доступ к нему.' },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [size3D, setSize3D] = useState(220);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setSize3D(window.innerWidth < 640 ? 150 : 220);
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
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' }}>

        {/* Заголовок + 3D */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '3rem', marginBottom: '4rem', flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{
              display: 'inline-block', marginBottom: '1rem', padding: '4px 12px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em',
              color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)',
            }}>
              КАК ЭТО РАБОТАЕТ
            </div>
            <h2 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', lineHeight: 1.1 }}>
              Никаких долгих брифингов<br />
              <span style={{ color: '#00e5ff' }}>Только результат</span>
            </h2>
          </div>
          <div className="mob-3d" style={{ flex: '0 0 220px' }}>
            <Scene3D shape="octahedron" size={size3D} color="#00b4ff" opacity={0.75} />
          </div>
        </div>

        {/* Карточки шагов с анимированной границей */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '12px' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="process-card-outer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(30px)',
                transition: `opacity 0.6s ${i * 0.12}s, transform 0.6s ${i * 0.12}s`,
              }}
            >
              <div className="process-card-inner">
                {/* Номер */}
                <div
                  className="process-num"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    color: 'rgba(0,229,255,0.45)',
                    lineHeight: 1,
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {step.num}
                </div>

                {/* Заголовок */}
                <h3
                  className="process-title"
                  style={{ color: '#e0f7ff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', letterSpacing: '0.01em' }}
                >
                  {step.title}
                </h3>

                {/* Описание */}
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.75 }}>
                  {step.desc}
                </p>

                {/* Угловой акцент */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '12px', height: '12px', borderTop: '1px solid rgba(0,229,255,0.25)', borderLeft: '1px solid rgba(0,229,255,0.25)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', borderBottom: '1px solid rgba(0,229,255,0.25)', borderRight: '1px solid rgba(0,229,255,0.25)', pointerEvents: 'none' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }} />
    </section>
  );
}
