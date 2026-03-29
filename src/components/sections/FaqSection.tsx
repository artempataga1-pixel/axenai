'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/ui/Scene3D'), { ssr: false });

const faqs = [
  { q: 'Это шаблонные сайты или уникальные?', a: 'Уникальные. ИИ генерирует дизайн и тексты под твой проект, а не берёт готовую тему. Каждый сайт создаётся с нуля под конкретную задачу и нишу.' },
  { q: 'Я смогу сам редактировать сайт после сдачи?', a: 'Да. Передаём полный доступ и объясняем как вносить базовые изменения. Для сложных правок — можем помочь за небольшую доплату.' },
  { q: 'Что если мне не понравится результат?', a: 'Работаем итерационно — ты смотришь прогресс на промежуточных этапах. Правки входят в стоимость. Если результат не устраивает — вернём деньги.' },
  { q: 'Вы сами занимаетесь хостингом и доменом?', a: 'Можем взять на себя — это удобнее. Или разместим на твоей инфраструктуре, если она уже есть. Оба варианта без доплаты.' },
  { q: 'Какие технологии используются?', a: 'Зависит от задач: Next.js, Astro, чистый HTML/CSS — выбираем под проект. Никакого раздутого WordPress, если он не нужен.' },
  { q: 'Работаете с компаниями из других городов?', a: 'Да, работаем полностью удалённо. Часовой пояс — не проблема.' },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mob-section" style={{ background: '#000', width: '100%', position: 'relative', overflow: 'hidden', padding: '7rem 1rem' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }} />

      <div className="mob-col" style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Левая — 3D + заголовок */}
        <div className="mob-full" style={{ flex: '0 0 280px', opacity: visible ? 1 : 0, transition: 'opacity 0.7s' }}>
          <Scene3D shape="sphere" size={200} color="#00b4ff" opacity={0.65} />
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem', padding: '4px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>FAQ</div>
            <h2 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#fff', lineHeight: 1.15 }}>
              Вопросы которые задают чаще всего
            </h2>
          </div>
        </div>

        {/* Правая — аккордеон */}
        <div className="mob-full" style={{ flex: 1, minWidth: '280px', border: '1px solid rgba(0,180,255,0.12)', opacity: visible ? 1 : 0, transition: 'opacity 0.7s 0.2s' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? '1px solid rgba(0,180,255,0.1)' : 'none' }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.25rem 1.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <span style={{ color: open === i ? '#00e5ff' : '#fff', fontWeight: 600, fontSize: '0.95rem', transition: 'color 0.2s' }}>{faq.q}</span>
                <span style={{ color: open === i ? '#00e5ff' : 'rgba(255,255,255,0.3)', fontSize: '1.1rem', fontFamily: 'JetBrains Mono, monospace', transition: 'transform 0.3s, color 0.2s', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink: 0 }}>+</span>
              </button>
              <div style={{ maxHeight: open === i ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
                <p style={{ padding: '0 1.5rem 1.25rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }} />
    </section>
  );
}
