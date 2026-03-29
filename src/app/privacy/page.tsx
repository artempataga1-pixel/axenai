import Link from 'next/link';

export const metadata = {
  title: 'Политика конфиденциальности — AXEN AI',
  description: 'Политика обработки персональных данных студии AXEN AI',
};

const sections = [
  {
    num: '1',
    title: 'Общие положения',
    items: [
      'Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки и защиты персональных данных пользователей сайта axenai.ru (далее — «Сайт»).',
      'Оператором персональных данных является студия AXEN AI (далее — «Оператор»).',
      'Использование Сайта и подача заявки означает безоговорочное согласие с настоящей Политикой и указанными условиями обработки персональных данных.',
      'Настоящая Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».',
    ],
  },
  {
    num: '2',
    title: 'Какие данные мы собираем',
    items: [
      'Имя или наименование компании — для идентификации при коммуникации.',
      'Контактные данные (Telegram-username, номер телефона или email) — для связи по заявке.',
      'Описание задачи и пожелания по сайту — для подготовки предложения.',
      'Технические данные: IP-адрес, тип браузера, дата и время обращения — собираются автоматически в целях безопасности и предотвращения злоупотреблений.',
      'Мы не собираем данные банковских карт, паспортов и иных чувствительных документов.',
    ],
  },
  {
    num: '3',
    title: 'Цели обработки данных',
    items: [
      'Обработка заявки на разработку сайта и связь с Заказчиком.',
      'Уточнение требований к проекту и предоставление коммерческого предложения.',
      'Выполнение обязательств по договору, заключённому на основании публичной оферты.',
      'Улучшение качества услуг и работы Сайта.',
      'Соблюдение требований законодательства Российской Федерации.',
    ],
  },
  {
    num: '4',
    title: 'Основания обработки',
    items: [
      'Согласие субъекта персональных данных, выраженное при подаче заявки через форму на Сайте.',
      'Исполнение договора, стороной которого является субъект персональных данных.',
      'Выполнение требований законодательства, применимого к Оператору.',
    ],
  },
  {
    num: '5',
    title: 'Хранение и защита данных',
    items: [
      'Персональные данные хранятся не дольше, чем этого требуют цели их обработки, или в течение срока, установленного законодательством.',
      'Оператор принимает технические и организационные меры для защиты данных от несанкционированного доступа, изменения, раскрытия или уничтожения.',
      'Доступ к персональным данным имеют только сотрудники, которым это необходимо для выполнения своих трудовых обязанностей.',
      'Данные, полученные через форму заявки, передаются Оператору через зашифрованное HTTPS-соединение.',
    ],
  },
  {
    num: '6',
    title: 'Передача данных третьим лицам',
    items: [
      'Оператор не продаёт и не передаёт персональные данные третьим лицам в коммерческих целях.',
      'Передача данных возможна только в случаях, предусмотренных законодательством РФ (по запросу уполномоченных органов).',
      'Для доставки уведомлений используется мессенджер Telegram. Его политика конфиденциальности доступна на сайте telegram.org.',
    ],
  },
  {
    num: '7',
    title: 'Права субъекта персональных данных',
    items: [
      'Вы вправе в любой момент отозвать своё согласие на обработку персональных данных.',
      'Вы вправе запросить информацию о том, какие ваши данные обрабатываются, и потребовать их исправления или удаления.',
      'Для реализации прав обращайтесь через Telegram: @axenai_bussines. Запрос будет рассмотрен в течение 30 дней.',
      'Отзыв согласия не влияет на законность обработки данных, осуществлявшейся до его отзыва.',
    ],
  },
  {
    num: '8',
    title: 'Cookies и аналитика',
    items: [
      'Сайт может использовать файлы cookie для корректной работы и улучшения пользовательского опыта.',
      'Cookie не содержат персональных данных в явном виде и не используются для идентификации конкретного человека.',
      'Вы можете отключить cookie в настройках браузера, однако это может повлиять на работу некоторых функций Сайта.',
    ],
  },
  {
    num: '9',
    title: 'Изменения политики',
    items: [
      'Оператор вправе вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента публикации на Сайте.',
      'Продолжение использования Сайта после публикации изменений означает согласие с новой редакцией Политики.',
      'Актуальная версия Политики всегда доступна по адресу axenai.ru/privacy.',
    ],
  },
  {
    num: '10',
    title: 'Контакты',
    items: [
      'По всем вопросам, связанным с обработкой персональных данных, обращайтесь: Telegram @axenai_bussines.',
      'Мы стараемся отвечать в течение одного рабочего дня.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '6rem' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,180,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.4), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ marginBottom: '3rem' }}>
          <Link href="/order" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(0,229,255,0.5)', textDecoration: 'none', letterSpacing: '0.1em' }}>
            ← Назад к заявке
          </Link>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'inline-block', marginBottom: '1rem', padding: '4px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>
            ПРАВОВОЙ ДОКУМЕНТ
          </div>
          <h1 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.4rem, 4vw, 2.6rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
            Политика{' '}
            <span style={{ color: '#00e5ff' }}>конфиденциальности</span>
          </h1>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
            Редакция от 01.01.2025 · AXEN AI
          </p>
        </div>

        <div style={{ padding: '1.25rem 1.5rem', border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,180,255,0.04)', marginBottom: '2.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.8 }}>
            Мы уважаем вашу приватность. Этот документ объясняет, какие данные мы собираем, зачем и как защищаем. Оставляя заявку, вы соглашаетесь с условиями этой Политики.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {sections.map((sec) => (
            <div key={sec.num} style={{ borderBottom: '1px solid rgba(0,229,255,0.07)', paddingTop: '2rem', paddingBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '1.8rem', fontWeight: 700, color: 'rgba(0,229,255,0.2)', lineHeight: 1, flexShrink: 0 }}>
                  {sec.num.padStart(2, '0')}
                </span>
                <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#e0f7ff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {sec.title}
                </h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '3.2rem' }}>
                {sec.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(0,229,255,0.3)', marginTop: '0.3rem', flexShrink: 0 }}>
                      {sec.num}.{i + 1}
                    </span>
                    <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
          <Link href="/order" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem 2.5rem', background: 'rgba(0,180,255,0.1)', border: '1.5px solid rgba(0,229,255,0.5)', color: '#00e5ff', textDecoration: 'none', display: 'inline-block' }}>
            ← Вернуться к форме заявки
          </Link>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.2), transparent)' }} />
    </div>
  );
}
