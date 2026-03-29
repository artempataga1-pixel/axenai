import NeonButton from '@/components/ui/NeonButton';

const plans = [
  {
    name: 'BASIC',
    price: '15 000',
    color: 'green',
    features: [
      'Лендинг до 5 секций',
      'Адаптивный дизайн',
      'Форма обратной связи',
      'Базовое SEO',
      'Срок: 3-5 дней',
    ],
    cta: 'Выбрать',
    highlight: false,
  },
  {
    name: 'STANDARD',
    price: '35 000',
    color: 'cyan',
    features: [
      'Многостраничный сайт',
      'Уникальный AI-дизайн',
      'Анимации и интерактив',
      'CMS для управления',
      'Полное SEO',
      'Срок: 5-7 дней',
    ],
    cta: 'Выбрать',
    highlight: true,
  },
  {
    name: 'PREMIUM',
    price: 'от 70 000',
    color: 'green',
    features: [
      'Всё из Standard',
      'Интернет-магазин / SaaS',
      'Личный кабинет',
      'Интеграции с API',
      'Аналитика',
      'Срок: 7-14 дней',
    ],
    cta: 'Обсудить',
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 px-4 border-t" style={{ borderColor: 'rgba(0,229,255,0.08)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-terminal text-xs tracking-widest mb-3" style={{ color: 'rgba(0,229,255,0.6)' }}>
            {'> PRICING.json // LOADING...'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold font-terminal mb-4" style={{ color: '#e2e8f0' }}>
            <span style={{ color: '#00e5ff', textShadow: '0 0 10px #00e5ff' }}>Тарифы</span> и цены
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(150,200,170,0.7)' }}>
            Прозрачное ценообразование. Никаких скрытых платежей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const isGreen = plan.color === 'green';
            const neon = isGreen ? '#00ff41' : '#00e5ff';

            return (
              <div
                key={i}
                className="relative p-7 rounded-sm transition-all duration-300"
                style={{
                  background: plan.highlight ? 'rgba(0,20,25,0.9)' : 'rgba(8, 18, 12, 0.7)',
                  border: `1px solid ${plan.highlight ? neon + '50' : neon + '18'}`,
                  boxShadow: plan.highlight ? `0 0 30px ${neon}20, inset 0 0 30px ${neon}08` : 'none',
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="font-terminal text-xs px-3 py-1"
                      style={{ background: neon, color: '#000', fontWeight: 700 }}>
                      ПОПУЛЯРНЫЙ
                    </span>
                  </div>
                )}

                <div className="font-terminal text-xs tracking-widest mb-2" style={{ color: neon + 'aa' }}>
                  {'> '}{plan.name}
                </div>
                <div className="font-terminal text-3xl font-bold mb-1" style={{ color: neon, textShadow: `0 0 10px ${neon}` }}>
                  {plan.price} ₽
                </div>

                <div className="h-px my-5" style={{ background: `linear-gradient(90deg, ${neon}40, transparent)` }} />

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 font-terminal text-xs"
                      style={{ color: 'rgba(180,220,195,0.8)' }}>
                      <span style={{ color: neon }}>▶</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <NeonButton
                  href="/order"
                  variant={isGreen ? 'green' : 'cyan'}
                  size="md"
                  className="w-full justify-center"
                >
                  {plan.cta}
                </NeonButton>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
