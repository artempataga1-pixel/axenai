'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

/* ─── Canvas: сетка + частицы ─────────────────────────────────────── */
function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Частицы */
    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? '#00e5ff' : '#00ff41',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Перспективная сетка снизу */
      const hy = canvas.height * 0.62;
      const cx = canvas.width / 2;
      const cols = 18;
      const rows = 10;

      for (let i = 0; i <= cols; i++) {
        const t = i / cols;
        const xFar = cx + (t - 0.5) * canvas.width * 2.4;
        const xNear = cx + (t - 0.5) * canvas.width * 6;
        const alpha = 0.04 + Math.abs(t - 0.5) * 0.02;
        ctx.beginPath();
        ctx.moveTo(xFar, hy);
        ctx.lineTo(xNear, canvas.height + 20);
        ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
      for (let j = 0; j <= rows; j++) {
        const p = j / rows;
        const ease = p * p;
        const y = hy + (canvas.height - hy + 20) * ease;
        const halfW = (cx * 0.5 + cx * 3 * ease);
        const alpha = 0.02 + ease * 0.07;
        ctx.beginPath();
        ctx.moveTo(cx - halfW, y);
        ctx.lineTo(cx + halfW, y);
        ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      /* Горизонт-свечение */
      const grd = ctx.createLinearGradient(0, hy - 2, 0, hy + 2);
      grd.addColorStop(0, 'transparent');
      grd.addColorStop(0.5, 'rgba(0,229,255,0.35)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, hy - 2, canvas.width, 4);

      /* Частицы */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '99';
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      /* Линии между близкими частицами */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${(1 - dist / 120) * 0.12})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

/* ─── 3D-карточка с параллаксом ───────────────────────────────────── */
function HeroCard() {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg = { stiffness: 80, damping: 20, mass: 0.8 };
  const springX = useSpring(rawX, springCfg);
  const springY = useSpring(rawY, springCfg);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  /* Параллакс слоёв */
  const layer1X = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const layer1Y = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const layer2X = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const layer2Y = useTransform(springY, [-0.5, 0.5], [-5, 5]);
  const layer3X = useTransform(springX, [-0.5, 0.5], [8, -8]);
  const layer3Y = useTransform(springY, [-0.5, 0.5], [5, -5]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full max-w-5xl mx-auto px-4"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Фоновое свечение — самый дальний слой */}
        <motion.div
          style={{ x: layer3X, y: layer3Y }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-25"
            style={{
              background: 'radial-gradient(ellipse, #00e5ff 0%, #0066ff 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(ellipse, #00ff41 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>

        {/* Декоративные плавающие элементы — средний слой */}
        <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute inset-0 pointer-events-none">
          {/* Угловые рамки */}
          {[
            'top-0 left-0 border-t-2 border-l-2',
            'top-0 right-0 border-t-2 border-r-2',
            'bottom-0 left-0 border-b-2 border-l-2',
            'bottom-0 right-0 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              className={`absolute w-10 h-10 ${cls}`}
              style={{ borderColor: '#00e5ff', opacity: 0.5 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={mounted ? { opacity: 0.5, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            />
          ))}

          {/* Плавающие hex-элементы */}
          {[
            { top: '8%', left: '3%', size: 40, color: '#00ff41', delay: 1.2 },
            { top: '15%', right: '2%', size: 28, color: '#00e5ff', delay: 1.5 },
            { top: '70%', left: '1%', size: 22, color: '#00e5ff', delay: 1.8 },
            { top: '75%', right: '3%', size: 35, color: '#00ff41', delay: 1.3 },
          ].map((el, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-xs"
              style={{
                top: el.top,
                left: (el as { left?: string }).left,
                right: (el as { right?: string }).right,
                color: el.color,
                textShadow: `0 0 10px ${el.color}`,
                fontSize: el.size * 0.35,
                opacity: 0,
              }}
              animate={mounted ? { opacity: [0, 0.6, 0.4], y: [0, -8, 0] } : {}}
              transition={{ delay: el.delay, duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            >
              {'◈'}
            </motion.div>
          ))}
        </motion.div>

        {/* Главный контент — передний слой */}
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="relative z-10 text-center py-24"
        >
          {/* Статус-пилюля */}
          <motion.div
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border"
            style={{
              borderColor: 'rgba(0,229,255,0.3)',
              background: 'rgba(0,229,255,0.06)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: '#00ff41' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: '#00ff41' }} />
            </span>
            <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,229,255,0.8)' }}>
              AI_SYSTEM // ONLINE
            </span>
          </motion.div>

          {/* Главный заголовок */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={mounted ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-mono font-black leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 8.5rem)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #00e5ff 40%, #00ff41 70%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(0,229,255,0.4))',
                }}
              >
                AXEN<span style={{ WebkitTextFillColor: '#00ff41' }}>_</span>AI
              </h1>
            </motion.div>
          </div>

          {/* Линия-разделитель */}
          <motion.div
            className="flex items-center gap-3 justify-center mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={mounted ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-px flex-1 max-w-24"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.6))' }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,229,255,0.5)' }}>
              ◆
            </span>
            <div className="h-px flex-1 max-w-24"
              style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.6), transparent)' }} />
          </motion.div>

          {/* Подзаголовок */}
          <motion.p
            className="font-mono text-base sm:text-lg md:text-xl mb-2 tracking-wide"
            style={{ color: 'rgba(200,240,220,0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Сайты созданные искусственным интеллектом
          </motion.p>

          <motion.p
            className="text-sm sm:text-base mb-12 max-w-lg mx-auto leading-relaxed text-center"
            style={{ color: 'rgba(150,200,170,0.6)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.85 }}
          >
            Профессиональные сайты для бизнеса — за 3–7 дней,<br className="hidden sm:block" />
            с уникальным дизайном и современным кодом.
          </motion.p>

          {/* CTA кнопки */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <motion.button
                className="relative group px-8 py-3.5 font-mono text-sm font-bold tracking-widest uppercase overflow-hidden"
                style={{
                  background: 'rgba(0,229,255,0.1)',
                  border: '1px solid rgba(0,229,255,0.5)',
                  color: '#00e5ff',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <motion.span
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.15), transparent)' }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  ▶ Смотреть каталог
                </span>
                {/* Glow */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 20px rgba(0,229,255,0.2), 0 0 20px rgba(0,229,255,0.3)' }} />
              </motion.button>

            <Link href="/order">
              <motion.button
                className="relative group px-8 py-3.5 font-mono text-sm font-bold tracking-widest uppercase overflow-hidden"
                style={{
                  background: 'rgba(0,255,65,0.1)',
                  border: '1px solid rgba(0,255,65,0.5)',
                  color: '#00ff41',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,65,0.15), transparent)' }}
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  ⬡ Заказать сайт
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 20px rgba(0,255,65,0.2), 0 0 20px rgba(0,255,65,0.3)' }} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Скролл-индикатор */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-16"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,229,255,0.35)' }}>
              SCROLL TO EXPLORE
            </span>
            <motion.div
              className="w-px h-12"
              style={{ background: 'linear-gradient(180deg, rgba(0,229,255,0.5), transparent)' }}
              animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Основной Hero ───────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 30%, #021208 0%, #040d06 50%, #02080a 100%)' }}
    >
      {/* Анимированный фон */}
      <BackgroundCanvas />

      {/* Тёмный оверлей-виньетка */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(2,8,6,0.7) 100%)',
          zIndex: 1,
        }}
      />

      {/* Горизонтальные scan lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.012) 3px, rgba(0,255,65,0.012) 4px)',
          zIndex: 1,
        }}
      />

      {/* 3D карточка с контентом */}
      <div className="relative w-full z-10 pt-16">
        <HeroCard />
      </div>
    </section>
  );
}
