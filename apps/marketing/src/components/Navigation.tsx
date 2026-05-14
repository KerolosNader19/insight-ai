import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Intelligence', href: '#intelligence' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'Pricing', href: '#pricing' },
];

export function Navigation() {
  const scrollY = useStore((s) => s.scrollY);
  const heroHeight = useStore((s) => s.heroHeight);
  const [mobileOpen, setMobileOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const isScrolled = heroHeight > 0 && scrollY > heroHeight * 0.8;

  // Logo word reveal animation
  useGSAP(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const words = logo.querySelectorAll('.logo-word');
    gsap.set(words, { y: '120%', opacity: 0 });

    gsap.to(words, {
      y: '0%',
      opacity: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power4.out',
      delay: 0.3,
    });
  }, { scope: logoRef });

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 479 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] h-20 flex items-center justify-between page-padding transition-all duration-500',
          isScrolled
            ? 'bg-white/92 backdrop-blur-[12px] border-b border-brand-gray'
            : 'bg-transparent'
        )}
      >
        {/* Logo */}
        <div ref={logoRef} className="flex flex-col overflow-hidden">
          <div className="overflow-hidden">
            <span className="logo-word inline-block font-display text-[22px] font-bold text-brand-black">
              Insight
            </span>{' '}
            <span className="logo-word inline-block font-display text-[22px] font-bold text-brand-black">
              AI
            </span>
          </div>
          <span className="logo-word inline-block font-body text-[10px] font-medium tracking-[0.1em] text-dark-gray uppercase">
            AI SEARCH VISIBILITY
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="group relative flex items-center gap-2.5 font-body text-[16px] text-brand-black hover:text-pure-black transition-colors duration-400"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-dark-gray opacity-0 scale-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400" />
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={(e) => handleLinkClick(e, '#pricing')}
            className="font-body text-[15px] font-medium text-white bg-brand-black px-6 py-2.5 rounded hover:bg-pure-black transition-colors duration-400"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <span className="w-6 h-0.5 bg-brand-black transition-all duration-400" />
          <span className="w-6 h-0.5 bg-brand-black transition-all duration-400" />
          <span className="w-6 h-0.5 bg-brand-black transition-all duration-400" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[1000] bg-brand-black flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <button
          className="absolute top-6 right-6 text-white font-body text-[16px]"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          Close
        </button>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="font-display text-[48px] text-white hover:text-brand-teal transition-colors duration-400"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#pricing"
          onClick={(e) => handleLinkClick(e, '#pricing')}
          className="mt-4 font-body text-[18px] font-medium text-brand-black bg-brand-teal px-8 py-4 rounded hover:bg-[#5de8c0] transition-colors duration-400"
        >
          Get Started
        </a>
      </div>
    </>
  );
}
