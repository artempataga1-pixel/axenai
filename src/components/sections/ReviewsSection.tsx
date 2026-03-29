'use client';

import { useState } from 'react';
import TerminalCard from '@/components/ui/TerminalCard';

const reviews = [
  {
    name: 'Алексей К.',
    role: 'Основатель стартапа',
    text: 'Сайт сделали за 5 дней. Я не верил, что за такое время можно получить что-то стоящее, но результат превзошёл ожидания. Конверсия выросла в 2.3 раза.',
    rating: 5,
  },
  {
    name: 'Марина Д.',
    role: 'Владелец кофейни',
    text: 'Заказала лендинг для кофейни. Дизайн получился живым и атмосферным. Клиенты часто говорят, что нашли нас именно через сайт.',
    rating: 5,
  },
  {
    name: 'Дмитрий Р.',
    role: 'Фрилансер-дизайнер',
    text: 'Портфолио сделали с нуля. Анимации плавные, всё загружается быстро. Уже получил несколько обращений от потенциальных клиентов.',
    rating: 5,
  },
  {
    name: 'Ольга С.',
    role: 'Директор по маркетингу',
    text: 'Корпоративный сайт переделали полностью. SEO настроили сразу — уже через месяц видим рост трафика. Профессионально и быстро.',
    rating: 5,
  },
];

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,100,50,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="font-terminal text-xs tracking-widest mb-3" style={{ color: 'rgba(0,255,65,0.6)' }}>
            {'> REVIEWS.log // READING...'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-terminal mb-4" style={{ color: '#e2e8f0' }}>
            Что говорят <span style={{ color: '#00ff41', textShadow: '0 0 10px #00ff41' }}>клиенты</span>
          </h2>
        </div>

        <TerminalCard title={`review_${active + 1}.log`} variant="green">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} style={{ color: '#00ff41', textShadow: '0 0 5px #00ff41' }}>★</span>
              ))}
            </div>
            <p className="text-base leading-relaxed font-terminal" style={{ color: 'rgba(200,240,210,0.9)' }}>
              &quot;{review.text}&quot;
            </p>
            <div className="pt-2 border-t" style={{ borderColor: 'rgba(0,255,65,0.15)' }}>
              <p className="font-terminal text-sm font-bold" style={{ color: '#00ff41' }}>
                {'> '}{review.name}
              </p>
              <p className="font-terminal text-xs mt-0.5" style={{ color: 'rgba(0,229,255,0.6)' }}>
                {review.role}
              </p>
            </div>
          </div>
        </TerminalCard>

        {/* Навигация */}
        <div className="flex justify-center gap-3 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="font-terminal text-xs px-3 py-1.5 transition-all duration-200"
              style={{
                border: `1px solid ${i === active ? '#00ff41' : 'rgba(0,255,65,0.2)'}`,
                color: i === active ? '#00ff41' : 'rgba(0,255,65,0.4)',
                background: i === active ? 'rgba(0,255,65,0.08)' : 'transparent',
                boxShadow: i === active ? '0 0 8px rgba(0,255,65,0.3)' : 'none',
              }}
            >
              [{String(i + 1).padStart(2, '0')}]
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
