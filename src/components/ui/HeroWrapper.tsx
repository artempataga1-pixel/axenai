'use client';

import dynamic from 'next/dynamic';

const HeroFuturistic = dynamic(
  () => import('@/components/ui/hero-futuristic').then((m) => m.HeroFuturistic),
  { ssr: false }
);

export default function HeroWrapper() {
  return <HeroFuturistic />;
}
