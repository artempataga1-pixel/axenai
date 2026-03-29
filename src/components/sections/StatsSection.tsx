'use client';

import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 47, suffix: '+', label: 'Сайтов создано', prefix: '' },
  { value: 98, suffix: '%', label: 'Довольных клиентов', prefix: '' },
  { value: 3, suffix: '-7', label: 'Дней срок', prefix: '' },
  { value: 24, suffix: '/7', label: 'Поддержка', prefix: '' },
];

function Counter({ target, suffix, prefix }: { target: number; suffix: string; prefix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const step = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-terminal text-4xl font-bold" style={{ color: '#00ff41', textShadow: '0 0 15px #00ff41' }}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-16 border-y" style={{ borderColor: 'rgba(0,255,65,0.1)' }}>
      {/* Tron horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="mb-1">
                <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="font-terminal text-xs tracking-widest uppercase" style={{ color: 'rgba(0,229,255,0.6)' }}>
                {stat.label}
              </p>
              {/* Декоративная линия */}
              <div className="mt-3 h-px mx-auto w-12 group-hover:w-full transition-all duration-500"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.4), transparent)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
