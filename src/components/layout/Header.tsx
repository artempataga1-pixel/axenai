'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Тонкая синяя линия сверху с 3D анимацией */}
      <div className="header-top-line" />

      {/* Только иконка */}
      <div className="flex items-center justify-center h-14">
        <Link href="/" className="relative w-10 h-10 rounded-sm overflow-hidden header-logo-icon">
          <Image
            src="/logo.jpg"
            alt="AXEN AI"
            fill
            className="object-cover"
          />
        </Link>
      </div>
    </header>
  );
}
