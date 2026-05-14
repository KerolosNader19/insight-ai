import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollTicker } from '@/components/ScrollTicker';
import { Orb } from '@/components/Orb';
import { SectionLabel } from '@/components/SectionLabel';
import { CharacterReveal } from '@/components/CharacterReveal';
import { FadeUp } from '@/components/FadeUp';

const KEYWORDS = [
  'brand visibility',
  'AI search',
  'ChatGPT monitoring',
  'Perplexity tracking',
  'Gemini analytics',
  'competitor analysis',
  'sentiment tracking',
  'citation monitoring',
  'GEO optimization',
  'mention detection',
];

function OrbFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-[#79fcd4]/30 to-[#1b4d4d]/30 animate-pulse" />
    </div>
  );
}

export function CompetitorIntelligenceSection() {
  return (
    <section id="analytics" className="relative w-full">
      {/* Keyword Ticker */}
      <div className="w-full bg-brand-black py-6 overflow-hidden">
        <ScrollTicker
          items={KEYWORDS}
          direction="left"
          itemClassName="text-white"
        />
        <ScrollTicker
          items={KEYWORDS}
          direction="right"
          itemClassName="text-[#979797]"
        />
      </div>

      {/* Orb Section */}
      <div className="relative w-full min-h-[500px] md:min-h-[100vh] bg-brand-bone overflow-hidden">
        {/* WebGL Canvas */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<OrbFallback />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: true }}
            >
              <Orb />
            </Canvas>
          </Suspense>
        </div>

        {/* Text Overlay */}
        <div className="relative z-10 flex flex-col items-center text-center pt-[120px] md:pt-[200px] pb-20 px-6">
          <SectionLabel text="AI ENGINE" />

          <div className="max-w-[600px]">
            <CharacterReveal
              as="h2"
              className="font-display text-subsection-heading text-brand-black"
            >
              The intelligence behind every insight.
            </CharacterReveal>

            <FadeUp delay={0.3}>
              <p className="font-body text-[16px] md:text-[18px] leading-relaxed text-brand-black max-w-[480px] mx-auto mt-8">
                Our proprietary engine processes millions of AI-generated responses, extracting mentions, sentiment, and citations with precision. The more you use it, the smarter it gets.
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <a
                href="#"
                className="inline-block mt-8 font-body text-[16px] font-medium text-brand-black underline underline-offset-4 decoration-brand-black hover:decoration-dark-gray transition-all duration-400"
              >
                Explore the technology →
              </a>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
