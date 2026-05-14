import { useLenis } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { PlatformOverviewSection } from '@/sections/PlatformOverviewSection';
import { AnimatedChartsSection } from '@/sections/AnimatedChartsSection';
import { CompetitorIntelligenceSection } from '@/sections/CompetitorIntelligenceSection';

function App() {
  useLenis();

  return (
    <div className="relative">
      <Navigation />
      <main>
        <HeroSection />
        <PlatformOverviewSection />
        <AnimatedChartsSection />
        <CompetitorIntelligenceSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
