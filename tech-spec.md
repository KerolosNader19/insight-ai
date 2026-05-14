# Tech Spec — Insight AI Landing Page

## Dependencies

### Production

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.1.0 | UI framework |
| react-dom | ^19.1.0 | React DOM renderer |
| react-router-dom | ^7.6.0 | SPA routing (page transitions) |
| gsap | ^3.12.7 | Core animation engine, ScrollTrigger, SplitText |
| lenis | ^1.3.0 | Smooth scroll with inertia |
| recharts | ^2.15.0 | Animated chart demos (donut + area) |
| three | ^0.175.0 | WebGL (orb shaders) |
| @react-three/fiber | ^9.1.0 | React Three.js renderer |
| @react-three/drei | ^10.0.0 | R3F helpers |
| zustand | ^5.0.4 | Global state (scroll velocity, nav) |
| class-variance-authority | ^0.7.1 | Component variant styling |
| clsx | ^2.1.1 | Conditional class names |
| tailwind-merge | ^3.3.0 | Tailwind class deduplication |
| tailwindcss | ^4.1.0 | Utility CSS |
| @tailwindcss/vite | ^4.1.0 | Tailwind Vite integration |
| typescript | ^5.8.0 | Type safety |
| vite | ^6.3.0 | Build tool |
| @vitejs/plugin-react | ^4.4.0 | React Vite plugin |

### Dev

| Package | Version | Purpose |
|---------|---------|---------|
| @types/react | ^19.1.0 | React types |
| @types/react-dom | ^19.1.0 | React DOM types |
| @types/three | ^0.175.0 | Three.js types |

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navigation | Custom | Shared | Fixed nav with scroll-driven background transition. Uses zustand for scroll position. |
| Footer | Custom | Shared | Dark teal section with marquee background. |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Full-viewport, video bg, character-split title |
| PlatformOverviewSection | Custom | 3 staggered feature cards + SVG connector |
| AnimatedChartsSection | Custom | 2 recharts cards (donut + area) with entrance animations |
| CompetitorIntelligenceSection | Custom | Ticker + WebGL orb overlay. Heaviest section. |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| Button | Custom (CVA) | All sections | 3 variants: primary (dark), accent (teal), outline. Size/rounding consistent. |
| SectionLabel | Custom | Platform, Charts, Orb sections | Dot prefix + uppercase label. Single configuration prop. |
| ScrollTicker | Custom | Competitor section, Footer | Infinite CSS ticker. Takes items array + direction prop. Duplicates content internally for seamless loop. |
| CharacterReveal | Custom | All section headings | Wraps SplitText + GSAP ScrollTrigger. Plays once on enter. |
| FadeUp | Custom | Cards, body text, CTAs | Generic translateY + opacity entrance. Configurable delay. |
| SlideIn | Custom | Chart cards | Horizontal slide entrance (left/right direction). |
| LiveBadge | Custom | Chart cards | Pulsing red dot + "LIVE" text. |
| ChartCard | Custom | Charts section | Wrapper with header, time tabs, live badge, footer. Accepts chart as children. |
| ShareOfVoiceChart | Recharts | Charts section | Animated donut with center label. 4 color segments. |
| SentimentAreaChart | Recharts | Charts section | Animated stacked area chart. 3 layers with gradient fills. |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initialize Lenis, sync with GSAP ticker, expose instance |
| useScrollVelocity | Subscribe to Lenis velocity, return reactive value for orb frequency |

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Smooth scroll | Lenis + GSAP | Lenis instance synced to GSAP ticker. ScrollTrigger.update() on every scroll event. | Low |
| Hero video fade-in | GSAP | Opacity 0→1, 1.5s, power2.out. First in load sequence. | Low |
| Logo word reveal | GSAP + SplitText | SplitText splits into words. stagger 0.08s, translateY 120%→0, power4.out. | Low |
| Hero title char reveal | GSAP + SplitText | SplitText chars. stagger 0.03s, 1.2s, power4.out. Fires after logo reveal. | Low |
| Hero subtitle/CTA fade-up | GSAP | translateY 40px→0 + opacity, 0.8s, power3.out. 0.2s delay after title. | Low |
| Scroll indicator pulse | GSAP | translateY 0→8px loop, 2s. Fades out at scroll >100px via ScrollTrigger. | Low |
| Nav background transition | CSS + zustand | Scroll position > hero height triggers class change. backdrop-filter blur. CSS transition. | Low |
| Section title char reveal | GSAP + SplitText + ScrollTrigger | Reusable CharacterReveal component. ScrollTrigger start "top 80%", toggleActions "play once". | Medium |
| Fade-up element reveal | GSAP + ScrollTrigger | Reusable FadeUp component. Start "top 85%". | Low |
| Horizontal slide-in | GSAP + ScrollTrigger | Reusable SlideIn component. translateX ±80px. | Low |
| SVG connector draw-on | GSAP | stroke-dashoffset animation, 1.5s, power2.out. Triggered with cards. | Low |
| Chart cards entrance | GSAP + ScrollTrigger | Left card from translateX(-80px), right from translateX(80px), stagger 0.2s. | Low |
| Donut chart grow | Recharts + GSAP | Recharts animationDuration prop. Center label counts up via GSAP tween (0→23%). Triggered on viewport enter. | Medium |
| Area chart draw-on | Recharts + GSAP | Recharts animation. Fill opacity 0→1 after line draws via GSAP callback. | Medium |
| Live badge dot pulse | CSS @keyframes | scale 1→1.4→1, 2s infinite. Pure CSS, no JS. | Low |
| Keyword ticker (CSS) | CSS @keyframes | translateX(0)→(-50%), 30s linear infinite. Content duplicated for seamless loop. Pause on hover. | Low |
| Footer marquee | CSS @keyframes | Same ticker technique. 40s duration. | Low |
| WebGL orb shader | Three.js + R3F | Custom vertex/fragment shaders on IcosahedronGeometry(1, 128). uTime from clock, uLightDirection from R3F mouse state, uFrequency from scroll velocity. Breathing scale via sin(uTime). | 🔒 High |
| Custom cursor on nav dots | GSAP | 12px teal circle follows mouse via quickTo (lerp 0.1). Scales to 40px on dot hover. mix-blend-mode: difference. | Medium |

## State & Logic

### Zustand Store

Single store with 3 properties — no slices needed (simple enough):

- **scrollY** (number): Current scroll position. Navigation reads this to switch between transparent/blurred background.
- **scrollVelocity** (number): Lenis scroll velocity. Orb section reads this to modulate shader uFrequency uniform.
- **heroHeight** (number): Hero section height (measured after mount). Navigation uses this as threshold for background transition.

All three are written by the Lenis scroll callback (single subscriber, no derived state).

### Scroll ↔ Orb Bridge

Lenis `onScroll` callback writes `scrollVelocity` to zustand store. The Orb component reads `scrollVelocity` inside `useFrame` and applies it to `uFrequency` (base 0.8 + |velocity| × 0.05). This runs every frame — zustand selector subscription inside useFrame is acceptable since it's a lightweight value read.

### Page Load Sequence

GSAP timeline (not individual tweens) — 5 sequential steps with absolute offsets:

1. Video fade-in (0s)
2. Logo word reveal (0.3s absolute)
3. Hero char reveal (after logo completes — use timeline position parameter)
4. Subtitle/CTA fade-up (after title starts)
5. Scroll indicator fade-in (after subtitle)

Single timeline keeps ordering explicit and avoids scattered delay math.

### Lenis ↔ GSAP ScrollTrigger Sync

One initialization in useLenis hook: Lenis.on('scroll', ScrollTrigger.update). GSAP ticker drives Lenis: gsap.ticker.add((time) => lenis.raf(time * 1000)). This is a known integration pattern — no custom logic needed beyond setup.

### Video Loading

Hero video must preload before load sequence starts. Use a ref + onLoadedData callback to set a "videoReady" flag. The GSAP load timeline waits for this flag (or starts after it fires). Without this, the 1.5s video fade-in may start before video is playable.

## Other Key Decisions

### SplitText over Splitting.js

Design references Splitting.js, but GSAP's SplitText (part of GSAP, no extra dependency) is used instead. It integrates directly with GSAP timelines and ScrollTrigger, avoids loading an additional library, and provides the same character/word splitting functionality.

### Recharts over raw SVG/Canvas for charts

The chart animations (donut grow, area draw) are well within Recharts' built-in animation capabilities. Recharts handles SVG path interpolation, tooltips, and responsive sizing. Custom SVG would require recreating path interpolation logic for marginal benefit.

### R3F over raw Three.js for orb

The orb is a single mesh with custom ShaderMaterial — simple enough for raw Three.js, but R3F provides: automatic canvas lifecycle, built-in mouse tracking (via useFrame + mouse), consistent React component model, and proper cleanup. The @react-three/drei dependency is minimal (only used for potential helpers).

### No shadcn/ui

The design is fully bespoke with custom button styles, no standard form patterns, and no data tables. shadcn/ui would add overhead without providing useful primitives. All components are custom-built with Tailwind.
