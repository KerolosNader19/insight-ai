import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);
import { useStore } from '@/store/useStore';
import { Button } from '@/components/Button';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const setHeroHeight = useStore((s) => s.setHeroHeight);
  const setVideoReady = useStore((s) => s.setVideoReady);

  // Measure hero height for nav transition
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      setHeroHeight(section.offsetHeight);
    }
    const handleResize = () => {
      if (section) setHeroHeight(section.offsetHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setHeroHeight]);

  // Page load animation sequence
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Video fade-in
    tl.fromTo(
      videoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    // 2. Hero title character reveal
    const titleEl = titleRef.current;
    if (titleEl) {
      const text = titleEl.textContent || '';
      titleEl.innerHTML = '';
      const chars: HTMLSpanElement[] = [];

      for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.style.display = 'inline-block';
        charSpan.style.overflow = 'hidden';
        charSpan.style.verticalAlign = 'top';

        const inner = document.createElement('span');
        inner.style.display = 'inline-block';
        inner.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        if (text[i] === '\n') {
          charSpan.style.display = 'block';
          charSpan.style.width = '100%';
          inner.textContent = '';
        }

        charSpan.appendChild(inner);
        titleEl.appendChild(charSpan);
        chars.push(inner);
      }

      gsap.set(chars, { y: '120%' });

      tl.to(
        chars,
        {
          y: '0%',
          duration: 1.2,
          stagger: 0.03,
          ease: 'power4.out',
        },
        '-=1.0'
      );
    }

    // 3. Subtitle + CTA fade-up
    tl.fromTo(
      [subtitleRef.current, ctaRef.current],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
      '-=0.6'
    );

    // 4. Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // Mark video as ready (image is loaded via CSS background)
    setVideoReady(true);
  }, { scope: sectionRef });

  // Scroll indicator fade out on scroll
  useGSAP(() => {
    gsap.to(scrollIndicatorRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end justify-center"
    >
      {/* Background Image */}
      <div
        ref={videoRef}
        className="absolute inset-0 z-0 opacity-0"
        style={{
          backgroundImage: 'url(/assets/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/25" />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.6))',
        }}
      />

      {/* Content */}
      <div className="relative z-[2] text-center pb-[80px] md:pb-[120px] px-6 max-w-[800px] mx-auto">
        <h1
          ref={titleRef}
          className="font-display text-hero text-white mb-8"
        >
          {'See How AI\nSees Your Brand'}
        </h1>

        <p
          ref={subtitleRef}
          className="font-body text-[16px] md:text-[20px] text-white/85 leading-relaxed max-w-[560px] mx-auto opacity-0"
        >
          Monitor, measure, and optimize your brand visibility across ChatGPT, Perplexity, and Gemini — all in one powerful platform.
        </p>

        <div ref={ctaRef} className="mt-10 opacity-0">
          <Button variant="accent" href="#pricing">
            Start Free Trial
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] opacity-0"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="animate-scroll-indicator"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
