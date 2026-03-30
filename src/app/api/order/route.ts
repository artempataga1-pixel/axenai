import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/* ── Уникальный номер заявки на основе timestamp ───── */
function getNextOrderNumber(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

/* ── Rate limiting по IP (5 заявок в час) ─────────── */
const ipMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipMap.get(ip);
  if (record && now < record.resetAt) {
    if (record.count >= 5) return true;
    record.count++;
  } else {
    ipMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
  }
  return false;
}

/* ── Валидация входных данных ─────────────────────── */
const OrderSchema = z.object({
  name:        z.string().min(1).max(100),
  contact:     z.string().min(1).max(100),
  siteType:    z.string().max(50).optional(),
  description: z.string().max(2000).optional(),
  budget:      z.enum(['launch', 'discuss']).optional(),
});

/* ── Экранирование для HTML-режима Telegram ───────── */
function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function POST(req: NextRequest) {
  /* Content-Type */
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  /* Rate limiting */
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Слишком много запросов. Попробуйте позже.' }, { status: 429 });
  }

  /* Валидация */
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const parsed = OrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { name, contact, siteType, description, budget } = parsed.data;

  const token  = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ error: 'Telegram not configured' }, { status: 500 });
  }

  const orderNum = getNextOrderNumber();

  const now = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const budgetLabels: Record<string, string> = {
    launch:  'Запуск — 15 000 ₽ (первые 2 места)',
    discuss: 'Обсудить индивидуально',
  };

  const text = [
    `📩 <b>Заявка #${orderNum}</b>`,
    ``,
    `👤 <b>Имя:</b> ${esc(name)}`,
    `📱 <b>Контакт:</b> ${esc(contact)}`,
    `🌐 <b>Тип сайта:</b> ${esc(siteType || 'не указан')}`,
    `💰 <b>Бюджет:</b> ${esc(budgetLabels[budget ?? ''] || 'не указан')}`,
    description ? `\n📝 <b>Задача:</b>\n${esc(description)}` : '',
    ``,
    `⏰ ${now} (МСК)`,
  ].filter(Boolean).join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });

  if (!res.ok) {
    console.error('[order] Telegram API error:', await res.text());
    return NextResponse.json({ error: 'Не удалось отправить заявку' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, orderNum });
}
