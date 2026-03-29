'use client';

import { useEffect, useRef } from 'react';

export default function TronGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const GRID = 60;
    const VANISH_X = canvas.width / 2;
    const VANISH_Y = canvas.height * 0.55;
    let offset = 0;
    let animId: number;

    const project = (x: number, z: number) => {
      const scale = VANISH_Y / (VANISH_Y + z);
      return {
        x: VANISH_X + (x - VANISH_X) * scale,
        y: VANISH_Y + (canvas.height - VANISH_Y) * (1 - scale),
        scale,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      offset = (offset + 0.4) % GRID;

      const depth = 600;
      const steps = 12;

      // Горизонтальные линии (уходят вдаль)
      for (let i = 0; i <= steps; i++) {
        const z = (i / steps) * depth - offset * (depth / GRID);
        if (z < 0) continue;
        const left = project(-canvas.width, z);
        const right = project(canvas.width * 2, z);
        const alpha = 0.05 + (z / depth) * 0.4;

        ctx.beginPath();
        ctx.moveTo(left.x, left.y);
        ctx.lineTo(right.x, right.y);
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Вертикальные линии (параллельные)
      const cols = 16;
      for (let i = 0; i <= cols; i++) {
        const x = (i / cols) * canvas.width;
        const near = project(x, 0);
        const far = project(x, depth);
        const alpha = 0.08 + Math.abs(i - cols / 2) / cols * 0.1;

        ctx.beginPath();
        ctx.moveTo(near.x, canvas.height);
        ctx.lineTo(far.x, far.y);
        ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Светящийся горизонт
      const grad = ctx.createLinearGradient(0, VANISH_Y - 2, 0, VANISH_Y + 2);
      grad.addColorStop(0, 'transparent');
      grad.addColorStop(0.5, 'rgba(0, 229, 255, 0.6)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, VANISH_Y - 2, canvas.width, 4);

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, opacity: 0.6 }}
    />
  );
}
