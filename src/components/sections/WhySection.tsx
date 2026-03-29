'use client';

const features = [
  {
    icon: '⚡',
    title: 'Скорость',
    desc: 'AI генерирует и итерирует код в сотни раз быстрее человека. Сайт готов за 3-7 дней вместо месяца.',
    color: '#00ff41',
  },
  {
    icon: '🧠',
    title: 'AI-дизайн',
    desc: 'Нейронные сети обучены на тысячах лучших сайтов мира. Результат — уникальный современный дизайн.',
    color: '#00e5ff',
  },
  {
    icon: '💎',
    title: 'Качество',
    desc: 'Каждая строчка кода проверяется и оптимизируется. Никакого мусорного кода, только чистая архитектура.',
    color: '#00ff41',
  },
  {
    icon: '🔧',
    title: 'Гибкость',
    desc: 'Любые изменения — быстро. AI адаптирует сайт под новые требования без долгих итераций.',
    color: '#00e5ff',
  },
];

export default function WhySection() {
  return (
    <section className="py-20 px-4 relative">
      {/* Фоновая сетка */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <p className="font-terminal text-xs tracking-widest mb-3" style={{ color: 'rgba(0,229,255,0.6)' }}>
            {'> WHY_AI.md // ANALYZING...'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-terminal mb-4" style={{ color: '#e2e8f0' }}>
            Почему <span style={{ color: '#00e5ff', textShadow: '0 0 10px #00e5ff' }}>AI-разработка</span>?
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(150,200,170,0.7)' }}>
            Искусственный интеллект меняет правила игры в веб-разработке
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-sm transition-all duration-300"
              style={{
                background: 'rgba(8, 18, 12, 0.7)',
                border: `1px solid rgba(${f.color === '#00ff41' ? '0,255,65' : '0,229,255'},0.12)`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(10, 26, 16, 0.9)';
                el.style.borderColor = `${f.color}40`;
                el.style.boxShadow = `0 0 20px ${f.color}15`;
                el.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = 'rgba(8, 18, 12, 0.7)';
                el.style.borderColor = `rgba(${f.color === '#00ff41' ? '0,255,65' : '0,229,255'},0.12)`;
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <div className="font-terminal text-base font-bold mb-2"
                style={{ color: f.color, textShadow: `0 0 8px ${f.color}` }}>
                {f.title}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(150,190,165,0.7)' }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
