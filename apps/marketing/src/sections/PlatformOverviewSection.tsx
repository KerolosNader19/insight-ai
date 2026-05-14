import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/SectionLabel';
import { CharacterReveal } from '@/components/CharacterReveal';
import { FadeUp } from '@/components/FadeUp';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="38" cy="38" r="24" stroke="#1d1d1d" strokeWidth="2" fill="none" />
        <line x1="56" y1="56" x2="68" y2="68" stroke="#1d1d1d" strokeWidth="2" strokeLinecap="round" />
        <rect x="30" y="26" width="16" height="20" rx="2" stroke="#79fcd4" strokeWidth="1.5" fill="none" />
        <line x1="34" y1="32" x2="42" y2="32" stroke="#1d1d1d" strokeWidth="1" />
        <line x1="34" y1="36" x2="40" y2="36" stroke="#1d1d1d" strokeWidth="1" />
        <line x1="34" y1="40" x2="38" y2="40" stroke="#1d1d1d" strokeWidth="1" />
      </svg>
    ),
    title: 'Brand Monitoring',
    body: 'Track how often your brand appears in AI-generated responses across ChatGPT, Perplexity, and Gemini. Get real-time alerts when your visibility changes.',
    offset: 0,
  },
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="10" y="45" width="14" height="25" rx="2" fill="#d0cec5" />
        <rect x="28" y="30" width="14" height="40" rx="2" fill="#79fcd4" />
        <rect x="46" y="20" width="14" height="50" rx="2" fill="#1d1d1d" />
        <path d="M14 42 Q30 25, 38 30 T60 18" stroke="#1d1d1d" strokeWidth="2" fill="none" strokeLinecap="round" />
        <polygon points="58,16 60,18 58,20" fill="#1d1d1d" />
      </svg>
    ),
    title: 'Competitor Intelligence',
    body: "See exactly how you stack up against competitors. Discover who gets mentioned more, which sources AI engines cite, and where your gaps are.",
    offset: 40,
  },
  {
    icon: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path d="M40 10 L55 20 L55 42 Q55 58 40 68 Q25 58 25 42 L25 20 Z" stroke="#1d1d1d" strokeWidth="2" fill="none" />
        <path d="M32 38 L37 43 L48 32" stroke="#79fcd4" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="20" y1="25" x2="14" y2="20" stroke="#d0cec5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="60" y1="25" x2="66" y2="20" stroke="#d0cec5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="45" x2="12" y2="48" stroke="#d0cec5" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="60" y1="45" x2="68" y2="48" stroke="#d0cec5" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Sentiment & Citations',
    body: "Understand not just if you're mentioned, but how. Analyze sentiment, track authoritative citations, and identify the sources that drive AI recommendations.",
    offset: 80,
  },
];

export function PlatformOverviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // SVG connector draw-on animation
  useGSAP(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = svg.querySelectorAll('path');
    paths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength?.() || 200;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="relative w-full bg-brand-beige section-gap page-padding"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <SectionLabel text="THE PLATFORM" />

        {/* Statement Heading */}
        <CharacterReveal
          as="h2"
          className="font-display text-section-heading text-brand-black max-w-[900px] mb-20 md:mb-[80px]"
        >
          AI search is the new battleground for brand visibility. We give you the intelligence to win it.
        </CharacterReveal>

        {/* Feature Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {/* SVG Connector - positioned behind cards */}
          <svg
            ref={svgRef}
            className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] pointer-events-none z-0"
            viewBox="0 0 400 200"
            fill="none"
          >
            <path
              d="M20 40 Q100 20, 180 80 T350 120"
              stroke="#d0cec5"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
            />
            <path
              d="M50 160 Q150 180, 220 100 T380 60"
              stroke="#d0cec5"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              fill="none"
            />
          </svg>

          {FEATURES.map((feature, i) => (
            <FadeUp
              key={feature.title}
              delay={i * 0.15}
              className={`relative z-10 max-w-[360px] ${
                i === 1 ? 'md:mt-10' : i === 2 ? 'md:mt-20' : ''
              }`}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="font-display text-card-title text-brand-black mb-4">
                {feature.title}
              </h3>
              <p className="font-body text-[16px] leading-relaxed text-brand-black">
                {feature.body}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
