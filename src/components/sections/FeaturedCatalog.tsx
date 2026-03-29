'use client';

import NeonButton from '@/components/ui/NeonButton';

const featured = [
  {
    title: 'TechStart Landing',
    category: 'Лендинг',
    stack: ['Next.js', 'Tailwind'],
    description: 'Современный лендинг для IT-стартапа с анимациями и формой захвата лидов.',
    color: 'green',
  },
  {
    title: 'ShopNova Store',
    category: 'Интернет-магазин',
    stack: ['React', 'Stripe'],
    description: 'Полноценный интернет-магазин с корзиной, оплатой и личным кабинетом.',
    color: 'cyan',
  },
  {
    title: 'CorpVision Site',
    category: 'Корпоративный',
    stack: ['Next.js', 'MDX'],
    description: 'Представительский сайт компании с блогом и командой.',
    color: 'green',
  },
  {
    title: 'DevPortfolio',
    category: 'Портфолио',
    stack: ['React', 'Framer'],
    description: 'Портфолио разработчика с 3D-анимациями и интерактивными проектами.',
    color: 'cyan',
  },
  {
    title: 'SaaS Dashboard',
    category: 'SaaS',
    stack: ['Next.js', 'Supabase'],
    description: 'Дашборд для SaaS-продукта с аналитикой и управлением пользователями.',
    color: 'green',
  },
  {
    title: 'Restaurant Menu',
    category: 'Ресторан',
    stack: ['Next.js', 'Tailwind'],
    description: 'Сайт-меню ресторана с онлайн-бронированием столиков.',
    color: 'cyan',
  },
];

export default function FeaturedCatalog() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-14">
          <p className="font-terminal text-xs tracking-widest mb-3" style={{ color: 'rgba(0,255,65,0.6)' }}>
            {'> CATALOG.exe // LOADING...'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-terminal mb-4"
            style={{ color: '#e2e8f0' }}>
            Наши <span style={{ color: '#00ff41', textShadow: '0 0 10px #00ff41' }}>работы</span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(150,200,165,0.7)' }}>
            Каждый сайт — уникальное решение, созданное с помощью AI под задачи клиента
          </p>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((item, i) => {
            const isGreen = item.color === 'green';
            const neon = isGreen ? '#00ff41' : '#00e5ff';
            const neonDim = isGreen ? 'rgba(0,255,65,0.15)' : 'rgba(0,229,255,0.15)';

            return (
              <div
                key={i}
                className="group relative rounded-sm overflow-hidden transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(10, 22, 14, 0.8)',
                  border: `1px solid rgba(${isGreen ? '0,255,65' : '0,229,255'},0.15)`,
                  boxShadow: 'none',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${neonDim}, inset 0 0 20px ${neonDim}`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${isGreen ? '0,255,65' : '0,229,255'},0.4)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(${isGreen ? '0,255,65' : '0,229,255'},0.15)`;
                }}
              >
                {/* Превью зона */}
                <div className="h-36 relative flex items-center justify-center overflow-hidden"
                  style={{ background: `rgba(${isGreen ? '0,20,10' : '0,15,25'},0.8)` }}>
                  {/* Декоративная матричная сетка-превью */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `linear-gradient(${neon}22 1px, transparent 1px), linear-gradient(90deg, ${neon}22 1px, transparent 1px)`,
                      backgroundSize: '20px 20px',
                    }} />
                  <div className="font-terminal text-3xl font-bold z-10" style={{ color: neon, textShadow: `0 0 20px ${neon}` }}>
                    {item.title.split(' ')[0].slice(0, 2).toUpperCase()}
                  </div>
                  {/* Scan line эффект при hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, ${neon}08 50%, transparent 100%)`,
                      animation: 'none',
                    }} />
                </div>

                {/* Контент */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-terminal text-sm font-bold" style={{ color: '#e2e8f0' }}>
                      {'> '}{item.title}
                    </h3>
                    <span className="font-terminal text-xs px-2 py-0.5 rounded-sm"
                      style={{ color: neon, background: `${neon}15`, border: `1px solid ${neon}30` }}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(150,190,165,0.7)' }}>
                    {item.description}
                  </p>
                  {/* Стек */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.stack.map((s) => (
                      <span key={s} className="font-terminal text-xs px-2 py-0.5"
                        style={{ color: 'rgba(150,180,160,0.6)', border: '1px solid rgba(100,150,110,0.2)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3">
                    <NeonButton href="/catalog" variant={isGreen ? 'green' : 'cyan'} size="sm">
                      Подробнее
                    </NeonButton>
                    <NeonButton href="/order" variant="outline" size="sm">
                      Заказать
                    </NeonButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопка "Весь каталог" */}
        <div className="text-center mt-12">
          <NeonButton href="/catalog" variant="cyan" size="lg">
            Смотреть весь каталог →
          </NeonButton>
        </div>
      </div>
    </section>
  );
}
