import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{
        background: 'rgba(4, 10, 6, 0.95)',
        borderColor: 'rgba(0,255,65,0.1)',
      }}
    >
      {/* Tron line top */}
      <div className="h-px w-full" style={{
        background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.6), transparent)'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Бренд */}
          <div>
            <div className="font-terminal text-xl font-bold mb-3">
              <span style={{ color: '#00e5ff', textShadow: '0 0 10px #00e5ff' }}>AXEN</span>
              <span style={{ color: '#00ff41', textShadow: '0 0 10px #00ff41' }}>_AI</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(150,180,160,0.7)' }}>
              Профессиональные сайты,<br />
              созданные с помощью ИИ.<br />
              Быстро. Качественно. Современно.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <p className="font-terminal text-xs tracking-widest mb-4" style={{ color: 'rgba(0,255,65,0.6)' }}>
              {'> НАВИГАЦИЯ'}
            </p>
            <ul className="space-y-2">
              {[
                { href: '/catalog', label: 'Каталог работ' },
                { href: '/about', label: 'О сервисе' },
                { href: '/pricing', label: 'Тарифы' },
                { href: '/reviews', label: 'Отзывы' },
                { href: '/order', label: 'Заказать сайт' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-terminal text-sm transition-colors duration-200 hover:text-[#00ff41]"
                    style={{ color: 'rgba(150,180,160,0.6)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакт */}
          <div>
            <p className="font-terminal text-xs tracking-widest mb-4" style={{ color: 'rgba(0,229,255,0.6)' }}>
              {'> КОНТАКТ'}
            </p>
            <div className="space-y-2">
              <p className="font-terminal text-sm" style={{ color: 'rgba(150,180,160,0.6)' }}>
                Telegram: <span style={{ color: '#00e5ff' }}>@axenai</span>
              </p>
              <p className="font-terminal text-sm" style={{ color: 'rgba(150,180,160,0.6)' }}>
                Email: <span style={{ color: '#00e5ff' }}>hello@axenai.ru</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: 'rgba(0,255,65,0.08)' }}>
          <p className="font-terminal text-xs" style={{ color: 'rgba(100,140,110,0.5)' }}>
            © {year} AXEN_AI. All rights reserved.
          </p>
          <p className="font-terminal text-xs" style={{ color: 'rgba(100,140,110,0.4)' }}>
            SYSTEM_STATUS: <span style={{ color: '#00ff41' }}>ONLINE</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
