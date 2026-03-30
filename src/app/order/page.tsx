'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Scene3D = dynamic(() => import('@/components/ui/Scene3D'), { ssr: false });

const siteTypes = [
  'Лендинг (1 страница)',
  'Многостраничный сайт',
  'Интернет-магазин',
  'Корпоративный сайт',
  'Портфолио',
  'SaaS / Веб-приложение',
  'Другое',
];

const budgets = [
  { id: 'launch', label: 'Запуск — 15 000 ₽', hint: 'первые 2 места' },
  { id: 'discuss', label: 'Обсудить индивидуально', hint: '' },
];

export default function OrderPage() {
  const [form, setForm] = useState({ name: '', contact: '', siteType: '', description: '', budget: '' });
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Ошибка отправки');
    } catch {
      // показываем успех даже при ошибке сети, чтобы не пугать пользователя
    }
    setLoading(false);
    setSubmitted(true);

    // Обратный отсчёт → редирект в бот
    let secs = 5;
    const timer = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs <= 0) {
        clearInterval(timer);
        window.location.href = 'https://t.me/axenai_bussines';
      }
    }, 1000);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,100,255,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Scene3D shape="octahedron" size={160} color="#00e5ff" opacity={0.9} />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '4px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.3)' }}>
            ЗАЯВКА ПРИНЯТА
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1rem' }}>
            Свяжемся{' '}
            <span style={{ color: '#00e5ff', textShadow: '0 0 30px rgba(0,229,255,0.4)' }}>за 15 минут</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Заявка получена. Сейчас откроем бот — там придёт подтверждение.
          </p>

          {/* Счётчик */}
          <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1.5rem', border: '1px solid rgba(0,229,255,0.15)', background: 'rgba(0,180,255,0.05)', display: 'inline-block' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>
              Переходим в бот через{' '}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', fontWeight: 700, color: '#00e5ff' }}>
              {countdown}с
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href="https://t.me/axenai_bussines"
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem 2rem', background: 'rgba(0,180,255,0.12)', border: '1.5px solid rgba(0,229,255,0.6)', color: '#00e5ff', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}
            >
              Открыть бот сейчас →
            </a>
            <Link href="/" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', letterSpacing: '0.08em' }}>
              ← На главную
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '5rem' }}>
      {/* Фоновая сетка */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(0,180,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.03) 1px, transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      {/* Свечение */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(0,80,255,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', gap: '4rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Левая колонка — инфо + 3D */}
        <div style={{
          flex: '0 0 300px', minWidth: '260px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.7s, transform 0.7s',
        }}>
          <Scene3D shape="torusknot" size={240} color="#00b4ff" opacity={0.8} />

          <div style={{ marginTop: '2.5rem' }}>
            <div style={{ display: 'inline-block', marginBottom: '1rem', padding: '4px 12px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', color: '#00e5ff', border: '1px solid rgba(0,229,255,0.2)' }}>
              ОСТАВИТЬ ЗАЯВКУ
            </div>
            <h1 style={{ fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
              Расскажи<br />
              <span style={{ color: '#00e5ff' }}>о задаче</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '2rem' }}>
              Заполни форму — свяжемся в течение 15 минут, обсудим и назовём стоимость. Без обязательств.
            </p>

            {/* Мини-факты */}
            {[
              { label: 'Ответ', value: 'до 15 минут' },
              { label: 'Срок', value: 'от 72 часов' },
            ].map((f) => (
              <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 0', borderBottom: '1px solid rgba(0,180,255,0.08)' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.08em' }}>{f.label}</span>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#00e5ff' }}>{f.value}</span>
              </div>
            ))}

            {/* Или напиши напрямую */}
            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid rgba(0,229,255,0.1)', background: 'rgba(0,180,255,0.04)' }}>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>ИЛИ НАПИШИ НАПРЯМУЮ</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a
                  href="https://t.me/axenai_bussines"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'rgba(0,229,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.036 9.592c-.152.68-.554.847-1.12.527l-3.1-2.284-1.497 1.44c-.165.165-.304.304-.623.304l.222-3.157 5.74-5.185c.25-.222-.054-.344-.386-.122L7.04 14.42l-3.044-.952c-.662-.207-.675-.662.138-.98l11.89-4.583c.552-.2 1.034.135.538.343z"/></svg>
                  @axenai_bussines
                </a>
                <a
                  href="https://max.ru/u/f9LHodD0cOIviRaJ3XgXI4U66OOyCmSuPwwMMuVrLMDYjKs-Grm1f7JcbhU"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'rgba(0,229,255,0.7)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5c.276 0 .5.224.5.5v5c0 .276-.224.5-.5.5H12l-2.5 2v-2H7.5c-.276 0-.5-.224-.5-.5V9c0-.276.224-.5.5-.5h9z"/></svg>
                  Max
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка — форма */}
        <div style={{
          flex: 1, minWidth: '300px',
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)',
          transition: 'opacity 0.7s 0.15s, transform 0.7s 0.15s',
        }}>
          {/* 3D объект над формой */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-2rem', position: 'relative', zIndex: 0, pointerEvents: 'none' }}>
            <Scene3D shape="icosahedron" size={120} color="#00e5ff" opacity={0.5} />
          </div>

          <div className="process-card-outer" style={{ position: 'relative', zIndex: 1 }}>
            <div className="process-card-inner" style={{ padding: '2.5rem' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Имя / Компания */}
                <OrderField label="Имя или название компании" required>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Иван Иванов"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </OrderField>

                {/* Telegram / Телефон */}
                <OrderField label="Telegram или телефон" required>
                  <input
                    required
                    type="text"
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    placeholder="@username или +7 900 000-00-00"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                  {form.contact.trim().startsWith('@') && (
                    <p style={{ marginTop: '0.4rem', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(0,229,255,0.45)', lineHeight: 1.6 }}>
                      Чтобы получить авто-ответ, напишите{' '}
                      <a href="https://t.me/axenai_bussines" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(0,229,255,0.7)', textDecoration: 'none' }}>
                        /start
                      </a>{' '}
                      нашему боту
                    </p>
                  )}
                </OrderField>

                {/* Тип сайта */}
                <OrderField label="Тип сайта" required>
                  <select
                    required
                    value={form.siteType}
                    onChange={(e) => setForm({ ...form, siteType: e.target.value })}
                    style={{ ...inputStyle, background: '#050a0f', color: form.siteType ? '#e0f7ff' : 'rgba(255,255,255,0.25)' }}
                    onFocus={(e) => Object.assign(e.target.style, { ...inputFocusStyle, background: '#050a0f' })}
                    onBlur={(e) => Object.assign(e.target.style, { ...inputStyle, background: '#050a0f', color: form.siteType ? '#e0f7ff' : 'rgba(255,255,255,0.25)' })}
                  >
                    <option value="" disabled style={{ background: '#050a0f' }}>Выбрать...</option>
                    {siteTypes.map((t) => (
                      <option key={t} value={t} style={{ background: '#050a0f', color: '#e0f7ff' }}>{t}</option>
                    ))}
                  </select>
                </OrderField>

                {/* Описание */}
                <OrderField label="Расскажи о задаче">
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Ниша, цель сайта, пожелания по стилю, ссылки на примеры..."
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={(e) => Object.assign(e.target.style, { ...inputFocusStyle, resize: 'none' })}
                    onBlur={(e) => Object.assign(e.target.style, { ...inputStyle, resize: 'none' })}
                  />
                </OrderField>

                {/* Бюджет */}
                <div>
                  <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(0,229,255,0.6)', display: 'block', marginBottom: '0.75rem' }}>
                    БЮДЖЕТ
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {budgets.map((b) => {
                      const active = form.budget === b.id;
                      return (
                        <label
                          key={b.id}
                          style={{
                            display: 'flex', flexDirection: 'column', gap: '2px',
                            padding: '0.75rem 1rem', cursor: 'pointer',
                            border: `1px solid ${active ? 'rgba(0,229,255,0.6)' : 'rgba(0,229,255,0.12)'}`,
                            background: active ? 'rgba(0,180,255,0.08)' : 'transparent',
                            transition: 'all 0.2s',
                          }}
                        >
                          <input type="radio" name="budget" value={b.id} checked={active} onChange={() => setForm({ ...form, budget: b.id })} style={{ display: 'none' }} />
                          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: active ? '#00e5ff' : 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}>{b.label}</span>
                          {b.hint && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: active ? 'rgba(0,229,255,0.5)' : 'rgba(255,255,255,0.2)' }}>{b.hint}</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Согласие на обработку персональных данных */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                  <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <div style={{
                      width: '16px', height: '16px',
                      border: `1.5px solid ${agreed ? 'rgba(0,229,255,0.7)' : 'rgba(0,229,255,0.25)'}`,
                      background: agreed ? 'rgba(0,180,255,0.15)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}>
                      {agreed && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#00e5ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                    Я согласен(а) на обработку персональных данных в соответствии с{' '}
                    <Link href="/privacy" style={{ color: 'rgba(0,229,255,0.5)', textDecoration: 'none', borderBottom: '1px solid rgba(0,229,255,0.2)' }}>
                      политикой конфиденциальности
                    </Link>
                  </span>
                </label>

                {/* Кнопка */}
                <button
                  type="submit"
                  disabled={loading || !agreed}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    padding: '1.1rem 2rem', width: '100%',
                    background: (loading || !agreed) ? 'rgba(0,180,255,0.05)' : 'rgba(0,180,255,0.12)',
                    border: `1.5px solid ${agreed ? 'rgba(0,229,255,0.7)' : 'rgba(0,229,255,0.2)'}`,
                    color: agreed ? '#00e5ff' : 'rgba(0,229,255,0.3)',
                    cursor: (loading || !agreed) ? 'not-allowed' : 'pointer',
                    boxShadow: agreed ? '0 0 30px rgba(0,180,255,0.2)' : 'none',
                    transition: 'all 0.3s', opacity: loading ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => { if (!loading && agreed) { e.currentTarget.style.background = 'rgba(0,180,255,0.22)'; e.currentTarget.style.boxShadow = '0 0 50px rgba(0,180,255,0.4)'; } }}
                  onMouseLeave={(e) => { if (agreed) { e.currentTarget.style.background = 'rgba(0,180,255,0.12)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,180,255,0.2)'; } }}
                >
                  {loading ? '// ОТПРАВКА...' : 'Отправить заявку →'}
                </button>

                <p style={{ textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', lineHeight: 1.7 }}>
                  Нажимая «Отправить заявку», вы соглашаетесь с условиями{' '}
                  <Link href="/oferta" style={{ color: 'rgba(0,229,255,0.45)', textDecoration: 'none', borderBottom: '1px solid rgba(0,229,255,0.2)', transition: 'color 0.2s' }}>
                    публичной оферты
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'rgba(0,229,255,0.6)', display: 'block', marginBottom: '0.6rem' }}>
        {label.toUpperCase()}{required && <span style={{ color: 'rgba(0,229,255,0.4)', marginLeft: '4px' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem',
  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem',
  background: 'transparent', outline: 'none',
  border: '1px solid rgba(0,229,255,0.15)',
  color: '#e0f7ff', caretColor: '#00e5ff',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const inputFocusStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: 'rgba(0,229,255,0.55)',
  boxShadow: '0 0 15px rgba(0,229,255,0.08)',
};
