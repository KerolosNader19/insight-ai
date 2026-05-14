import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface CharacterRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  triggerOnScroll?: boolean;
  triggerStart?: string;
}

export function CharacterReveal({
  children,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  triggerOnScroll = true,
  triggerStart = 'top 80%',
}: CharacterRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    // Split text into characters wrapped in spans
    const text = children;
    el.innerHTML = '';
    const chars: HTMLSpanElement[] = [];

    for (let i = 0; i < text.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.style.display = 'inline-block';
      charSpan.style.overflow = 'hidden';
      charSpan.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = text[i] === ' ' ? '\u00A0' : text[i];

      charSpan.appendChild(inner);
      el.appendChild(charSpan);
      chars.push(inner);
    }

    // Set initial state
    gsap.set(chars, { y: '120%' });

    const tl = gsap.timeline({
      delay,
      ...(triggerOnScroll
        ? {
            scrollTrigger: {
              trigger: el,
              start: triggerStart,
              toggleActions: 'play none none none',
            },
          }
        : {}),
    });

    tl.to(chars, {
      y: '0%',
      duration: 1.2,
      stagger: 0.03,
      ease: 'power4.out',
    });
  }, { scope: containerRef });

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
    >
      {children}
    </Tag>
  );
}
