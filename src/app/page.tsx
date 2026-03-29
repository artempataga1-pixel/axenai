import HeroWrapper from '@/components/ui/HeroWrapper';
import LaunchOfferSection from '@/components/sections/LaunchOfferSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';

export default function Home() {
  return (
    <>
      <HeroWrapper />
      <LaunchOfferSection />
      <ProcessSection />
      <PortfolioSection />
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
