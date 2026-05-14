import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface SlideInProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right';
  delay?: number;
  duration?: number;
  triggerStart?: string;
}

export function SlideIn({
  children,
  className = '',
  direction = 'left',
  delay = 0,
  duration = 1,
  triggerStart = 'top 75%',
}: SlideInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const fromX = direction === 'left' ? -80 : 80;

    gsap.set(el, { x: fromX, opacity: 0 });

    gsap.to(el, {
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: triggerStart,
        toggleActions: 'play none none none',
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
