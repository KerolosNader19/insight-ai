import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from '@/store/useStore';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const setScrollY = useStore((s) => s.setScrollY);
  const setScrollVelocity = useStore((s) => s.setScrollVelocity);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e: { scroll: number; velocity: number }) => {
      ScrollTrigger.update();
      setScrollY(e.scroll);
      setScrollVelocity(e.velocity);
    });

    // Drive Lenis with GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [setScrollY, setScrollVelocity]);

  return lenisRef;
}
