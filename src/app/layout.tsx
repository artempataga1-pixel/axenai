import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AXEN AI — Сайты созданные искусственным интеллектом",
  description: "Профессиональные сайты, разработанные с помощью искусственного интеллекта. Быстро, качественно, современно.",
  keywords: "AI сайты, искусственный интеллект, разработка сайтов, создание сайтов",
  openGraph: {
    title: "AXEN AI — Сайты созданные искусственным интеллектом",
    description: "Профессиональные сайты, разработанные с помощью искусственного интеллекта.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="h-full">
      <body className="antialiased" style={{ background: '#000', color: '#e2e8f0', minHeight: '100vh', width: '100%' }}>
        <Header />
        <main style={{ width: '100%' }}>{children}</main>
      </body>
    </html>
  );
}
