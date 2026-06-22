# Cutting-Edge CSS & Vanilla JS Techniques for Next.js 14 + Tailwind
## Research compiled June 2026 -- No external animation libraries

---

## Table of Contents
1. [Scroll-Driven Animations (The Foundation)](#1-scroll-driven-animations)
2. [CSS-Only Parallax Scrolling](#2-css-only-parallax-scrolling)
3. [Text Reveal/Mask on Scroll](#3-text-revealmask-on-scroll)
4. [Horizontal Scroll via Vertical Scrolling](#4-horizontal-scroll-via-vertical-scrolling)
5. [Animated Gradient Mesh Backgrounds](#5-animated-gradient-mesh-backgrounds)
6. [Scale/Rotate/Blur on Scroll](#6-scalerotateblur-on-scroll)
7. [Seamless Section Transitions](#7-seamless-section-transitions)
8. [Sticky Elements That Transform](#8-sticky-elements-that-transform)
9. [CSS-Only Magnetic/Cursor Effects](#9-css-only-magneticcursor-effects)
10. [Modern Loading & Transition Animations](#10-modern-loading--transition-animations)
11. [Holographic/Lenticular Card Effects](#11-holographiclenticular-card-effects)
12. [Liquid Glass / Glassmorphism 2.0](#12-liquid-glass--glassmorphism-20)
13. [Container Queries for Components](#13-container-queries)
14. [Browser Support Matrix](#14-browser-support-matrix)

---

## 1. Scroll-Driven Animations

**The single most important new CSS feature for 2025-2026.** This replaces GSAP ScrollTrigger, Framer Motion scroll hooks, and Intersection Observer for most animation use cases.

### Browser Support (Mid-2026)
- Chrome 115+ (stable since late 2023)
- Edge 115+
- Safari 26+ (shipped Sept 2025)
- Firefox: behind flag, Nightly enabled by default

### Two Core Timeline Types

```css
/* SCROLL PROGRESS TIMELINE - tied to scroll container position */
.element {
  animation: fadeSlideIn linear both;
  animation-timeline: scroll();       /* nearest scroll ancestor, block axis */
}

/* VIEW PROGRESS TIMELINE - tied to element visibility in viewport */
.element {
  animation: fadeSlideIn linear both;
  animation-timeline: view();         /* element's progress through viewport */
  animation-range: entry 0% cover 40%; /* when animation starts/ends */
}
```

### Animation Range Values
```css
/* Fine-grained control over when animations fire */
animation-range: entry 0% cover 50%;      /* starts entering -> half covered */
animation-range: contain 0% contain 100%; /* fully visible range */
animation-range: entry 25% exit 75%;      /* 25% entered -> 75% exited */
animation-range: entry-crossing 30% contain 45%; /* crossing entry edge */
```

### Feature Detection (Critical for Safari/Firefox fallback)
```css
@supports (animation-timeline: scroll()) {
  .element {
    animation: revealOnScroll linear both;
    animation-timeline: view();
    animation-range: entry 20% cover 40%;
  }
}

/* Fallback: elements just appear normally */
@supports not (animation-timeline: scroll()) {
  .element {
    opacity: 1;
    transform: none;
  }
}
```

### Next.js + React Hook Pattern
```tsx
// useScrollSupport.ts - detect scroll-driven animation support
'use client';
import { useEffect, useState } from 'react';

export function useScrollAnimationSupport() {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(CSS.supports('animation-timeline', 'scroll()'));
  }, []);

  return supported;
}
```

---

## 2. CSS-Only Parallax Scrolling

### Method A: Scroll-Driven Animations (Modern, GPU-accelerated)
```css
@keyframes parallax-slow {
  from { transform: translateY(0); }
  to   { transform: translateY(-100px); }
}

@keyframes parallax-fast {
  from { transform: translateY(0); }
  to   { transform: translateY(-300px); }
}

.parallax-bg {
  animation: parallax-slow linear both;
  animation-timeline: scroll();
}

.parallax-fg {
  animation: parallax-fast linear both;
  animation-timeline: scroll();
}
```

### Method B: CSS 3D Transform Parallax (Works everywhere)
```css
.parallax-container {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  perspective: 1px;              /* key: creates 3D space */
  perspective-origin: center center;
}

.parallax-layer-back {
  position: absolute;
  inset: 0;
  transform: translateZ(-2px) scale(3);  /* further back = slower */
}

.parallax-layer-mid {
  position: absolute;
  inset: 0;
  transform: translateZ(-1px) scale(2);
}

.parallax-layer-front {
  position: relative;
  transform: translateZ(0);     /* normal speed */
}
```

### Method C: View-Timeline Per Section (Recommended for Next.js)
```css
.hero-image {
  animation: parallaxShift linear both;
  animation-timeline: view();
  animation-range: entry 0% exit 100%;
}

@keyframes parallaxShift {
  0%   { transform: translateY(-15vh); }
  100% { transform: translateY(15vh); }
}
```

### Tailwind Integration
```tsx
// In your globals.css or Tailwind @layer
@layer utilities {
  .animate-parallax-slow {
    animation: parallax-slow linear both;
    animation-timeline: scroll();
  }
  .animate-parallax-fast {
    animation: parallax-fast linear both;
    animation-timeline: scroll();
  }
}
```

---

## 3. Text Reveal/Mask on Scroll

### Technique A: Clip-Path Text Reveal (Left-to-Right Wipe)
```css
@keyframes textRevealWipe {
  from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
  to   { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
}

.text-reveal {
  animation: textRevealWipe linear both;
  animation-timeline: view();
  animation-range: entry 20% cover 50%;
}
```

### Technique B: Gradient Color Reveal (Text fills with color on scroll)
```css
.text-color-reveal {
  background: linear-gradient(
    to right,
    #1a1a2e 0%, #1a1a2e 50%,    /* revealed color */
    rgba(100,100,100,0.3) 50%, rgba(100,100,100,0.3) 100%  /* muted color */
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: colorReveal linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

@keyframes colorReveal {
  from { background-position: 100% 0; }
  to   { background-position: 0% 0; }
}
```

### Technique C: Word-by-Word Reveal (React + CSS)
```tsx
// TextReveal.tsx
'use client';

export function TextReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <p className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block text-reveal-word"
          style={{
            // Stagger each word's animation range
            animationRange: `entry ${10 + i * 5}% cover ${30 + i * 5}%`,
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </p>
  );
}
```
```css
.text-reveal-word {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(10px);
  animation: wordReveal linear both;
  animation-timeline: view();
}

@keyframes wordReveal {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}
```

### Technique D: Clip-Path with @property (Animatable clip-path values)
```css
@property --clip-progress {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}

.clip-reveal {
  --clip-progress: 0%;
  clip-path: inset(0 calc(100% - var(--clip-progress)) 0 0);
  animation: clipExpand linear both;
  animation-timeline: view();
  animation-range: entry 15% cover 45%;
}

@keyframes clipExpand {
  to { --clip-progress: 100%; }
}
```

---

## 4. Horizontal Scroll via Vertical Scrolling

### Pure CSS Method (No JS)
```css
.horizontal-scroll-wrapper {
  /* Make the container tall enough for the horizontal content */
  height: 400vh;  /* 4 sections worth of scroll */
  position: relative;
}

.horizontal-scroll-track {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.horizontal-scroll-inner {
  display: flex;
  width: 400vw;  /* 4 panels */
  height: 100vh;
  animation: scrollHorizontal linear both;
  animation-timeline: scroll(nearest block);
}

.horizontal-scroll-inner > section {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
}

@keyframes scrollHorizontal {
  to { transform: translateX(-300vw); }  /* 400vw - 100vw visible */
}
```

### React Component Pattern
```tsx
// HorizontalScroll.tsx
'use client';

interface HorizontalScrollProps {
  children: React.ReactNode;
  panels: number;
}

export function HorizontalScroll({ children, panels }: HorizontalScrollProps) {
  return (
    <div
      className="relative"
      style={{ height: `${panels * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="horizontal-scroll-track flex h-full"
          style={{ width: `${panels * 100}vw` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
```
```css
.horizontal-scroll-track {
  animation: hscroll linear both;
  animation-timeline: scroll(nearest block);
}

@keyframes hscroll {
  /* Use a named timeline scoped to the tall wrapper */
  to { transform: translateX(calc(-100% + 100vw)); }
}
```

### Scoped Scroll Timeline (Most Precise)
```css
.horizontal-wrapper {
  height: 300vh;
  timeline-scope: --horizontal;  /* hoist the timeline */
}

.horizontal-wrapper {
  scroll-timeline: --horizontal block;
}

.horizontal-track {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  width: 300vw;
  animation: slideLeft linear both;
  animation-timeline: --horizontal;
}

@keyframes slideLeft {
  to { transform: translateX(-200vw); }
}
```

---

## 5. Animated Gradient Mesh Backgrounds

### @property Gradient Animation (Smooth color transitions)
```css
@property --gradient-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@property --color-1 {
  syntax: '<color>';
  inherits: false;
  initial-value: #7c3aed;
}

@property --color-2 {
  syntax: '<color>';
  inherits: false;
  initial-value: #2563eb;
}

@property --color-3 {
  syntax: '<color>';
  inherits: false;
  initial-value: #06b6d4;
}

@property --color-4 {
  syntax: '<color>';
  inherits: false;
  initial-value: #10b981;
}

.gradient-mesh {
  background:
    radial-gradient(ellipse at 20% 50%, var(--color-1), transparent 50%),
    radial-gradient(ellipse at 80% 20%, var(--color-2), transparent 50%),
    radial-gradient(ellipse at 40% 80%, var(--color-3), transparent 50%),
    radial-gradient(ellipse at 70% 60%, var(--color-4), transparent 50%);
  background-color: #0a0a0a;
  animation: meshShift 12s ease-in-out infinite alternate;
}

@keyframes meshShift {
  0% {
    --color-1: #7c3aed;
    --color-2: #2563eb;
    --color-3: #06b6d4;
    --color-4: #10b981;
  }
  33% {
    --color-1: #ec4899;
    --color-2: #8b5cf6;
    --color-3: #3b82f6;
    --color-4: #14b8a6;
  }
  66% {
    --color-1: #f59e0b;
    --color-2: #ef4444;
    --color-3: #8b5cf6;
    --color-4: #06b6d4;
  }
  100% {
    --color-1: #10b981;
    --color-2: #06b6d4;
    --color-3: #7c3aed;
    --color-4: #ec4899;
  }
}
```

### Animated Mesh with Moving Positions
```css
@property --pos-x1 { syntax: '<percentage>'; inherits: false; initial-value: 20%; }
@property --pos-y1 { syntax: '<percentage>'; inherits: false; initial-value: 30%; }
@property --pos-x2 { syntax: '<percentage>'; inherits: false; initial-value: 70%; }
@property --pos-y2 { syntax: '<percentage>'; inherits: false; initial-value: 60%; }

.gradient-mesh-moving {
  background:
    radial-gradient(ellipse at var(--pos-x1) var(--pos-y1), oklch(0.7 0.15 300), transparent 50%),
    radial-gradient(ellipse at var(--pos-x2) var(--pos-y2), oklch(0.6 0.2 250), transparent 50%),
    radial-gradient(ellipse at 50% 50%, oklch(0.5 0.1 200), transparent 60%);
  background-color: oklch(0.15 0.02 270);
  animation: meshMove 20s ease-in-out infinite alternate;
}

@keyframes meshMove {
  0%   { --pos-x1: 20%; --pos-y1: 30%; --pos-x2: 70%; --pos-y2: 60%; }
  50%  { --pos-x1: 60%; --pos-y1: 70%; --pos-x2: 30%; --pos-y2: 20%; }
  100% { --pos-x1: 40%; --pos-y1: 10%; --pos-x2: 80%; --pos-y2: 80%; }
}
```

### Conic Gradient Rotation (Simpler, very smooth)
```css
@property --rotation {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.conic-bg {
  background: conic-gradient(
    from var(--rotation),
    #7c3aed, #2563eb, #06b6d4, #10b981, #7c3aed
  );
  animation: spin 8s linear infinite;
  filter: blur(80px);  /* soft mesh look */
}

@keyframes spin {
  to { --rotation: 360deg; }
}
```

---

## 6. Scale/Rotate/Blur on Scroll

### Combined Transform on Scroll
```css
@keyframes heroZoomBlur {
  0%   { transform: scale(1) rotate(0deg); filter: blur(0); opacity: 1; }
  100% { transform: scale(0.8) rotate(-3deg); filter: blur(6px); opacity: 0.3; }
}

.hero-section {
  animation: heroZoomBlur linear both;
  animation-timeline: scroll();
  animation-range: 0vh 80vh;   /* animate over first 80vh of scroll */
}
```

### Image Scale-Up on Enter
```css
@keyframes scaleIn {
  from { transform: scale(0.85); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.image-scale-in {
  animation: scaleIn linear both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}
```

### Rotate Card on Scroll
```css
@keyframes rotateOnScroll {
  0%   { transform: perspective(1000px) rotateY(-15deg); }
  50%  { transform: perspective(1000px) rotateY(0deg); }
  100% { transform: perspective(1000px) rotateY(15deg); }
}

.rotate-card {
  animation: rotateOnScroll linear both;
  animation-timeline: view();
  animation-range: entry 0% exit 100%;
}
```

### Progressive Blur (Depth of Field Effect)
```css
@keyframes progressiveBlur {
  0%   { filter: blur(0px); transform: translateZ(0); }
  100% { filter: blur(12px); transform: translateZ(-50px) scale(0.95); }
}

.blur-on-exit {
  animation: progressiveBlur linear both;
  animation-timeline: view();
  animation-range: cover 60% exit 100%;
}
```

---

## 7. Seamless Section Transitions

### Overlapping Sections with Clip-Path
```css
.section {
  position: relative;
  /* Each section clips into the next */
}

.section::after {
  content: '';
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  height: 160px;
  background: inherit;
  clip-path: ellipse(60% 100% at 50% 0%);
  z-index: 1;
}
```

### Gradient Fade Between Sections
```css
.section-transition {
  position: relative;
}

.section-transition::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 70%,
    var(--next-section-bg) 100%
  );
  pointer-events: none;
  z-index: 2;
}
```

### Scroll-Driven Cross-Fade Between Sections
```css
.section-fade {
  animation: sectionCrossFade linear both;
  animation-timeline: view();
  animation-range: exit -20% exit 30%;
}

@keyframes sectionCrossFade {
  from { opacity: 1; filter: blur(0); }
  to   { opacity: 0; filter: blur(4px); }
}
```

### Full-Bleed Color Transitions (No visible seams)
```css
/* Use CSS custom properties to flow colors between sections */
:root {
  --section-1-bg: #0a0a0a;
  --section-2-bg: #0f172a;
  --section-3-bg: #1a1a2e;
}

.section-1 {
  background: linear-gradient(
    to bottom,
    var(--section-1-bg) 0%,
    var(--section-2-bg) 100%
  );
}

.section-2 {
  background: linear-gradient(
    to bottom,
    var(--section-2-bg) 0%,
    var(--section-3-bg) 100%
  );
}
```

---

## 8. Sticky Elements That Transform

### Sticky Header That Shrinks
```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 50;
  animation: shrinkHeader linear both;
  animation-timeline: scroll();
  animation-range: 0px 200px;
}

@keyframes shrinkHeader {
  from {
    padding-block: 2rem;
    background: transparent;
    backdrop-filter: blur(0);
  }
  to {
    padding-block: 0.5rem;
    background: rgba(10, 10, 10, 0.8);
    backdrop-filter: blur(16px);
  }
}
```

### Sticky Image That Scales and Fades
```css
.sticky-media {
  position: sticky;
  top: 10vh;
  height: 80vh;
  animation: stickyScale linear both;
  animation-timeline: scroll();
  animation-range: 0vh 200vh;
}

@keyframes stickyScale {
  0%   { transform: scale(1); border-radius: 0; }
  30%  { transform: scale(0.9); border-radius: 24px; }
  60%  { transform: scale(0.8); border-radius: 48px; filter: blur(2px); }
  100% { transform: scale(0.7); border-radius: 50%; filter: blur(8px); opacity: 0.3; }
}
```

### Sticky Text with Scroll-Driven Counter
```css
.sticky-progress {
  position: sticky;
  top: 50%;
  transform: translateY(-50%);
}

.progress-bar {
  width: 0%;
  height: 2px;
  background: white;
  animation: fillProgress linear both;
  animation-timeline: scroll();
}

@keyframes fillProgress {
  to { width: 100%; }
}
```

### Scroll-State Queries (2026 -- detect stuck state)
```css
/* Chrome 133+ */
.sticky-nav {
  position: sticky;
  top: 0;
  container-type: scroll-state;
}

@container scroll-state(stuck: top) {
  .sticky-nav {
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 0 rgba(255,255,255,0.05);
  }
}
```

---

## 9. CSS-Only Magnetic/Cursor Effects

### CSS-Only Pseudo-Magnetic Button
```css
.magnetic-btn-wrapper {
  padding: 2rem; /* invisible hover zone bigger than button */
  display: inline-block;
}

.magnetic-btn {
  position: relative;
  padding: 1rem 2.5rem;
  border: 1px solid rgba(255,255,255,0.2);
  background: transparent;
  color: white;
  border-radius: 9999px;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
}

/* When hovering the wrapper, button "jumps" toward center */
.magnetic-btn-wrapper:hover .magnetic-btn {
  transform: scale(1.05);
}

/* Directional magnetic pull using hover zones */
.magnetic-btn-wrapper:hover:has(:hover) .magnetic-btn {
  transform: translateY(-3px) scale(1.08);
}

/* Shiny highlight that follows hover */
.magnetic-btn::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.15) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.4s;
}

.magnetic-btn-wrapper:hover .magnetic-btn::before {
  opacity: 1;
}
```

### Vanilla JS Magnetic Effect (React Hook)
```tsx
// useMagneticEffect.ts
'use client';
import { useRef, useCallback, useEffect } from 'react';

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    // Remove transition after it completes so mousemove is instant
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 500);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
```

### Custom Cursor with Vanilla JS
```tsx
// CustomCursor.tsx
'use client';
import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Instant cursor dot
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    // Trailing circle with lerp
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.08;
      cursorY += (mouseY - cursorY) * 0.08;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/30 pointer-events-none z-[9998] mix-blend-difference"
      />
    </>
  );
}
```

---

## 10. Modern Loading & Transition Animations

### Smooth Page Transition Overlay
```css
.page-transition {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
}

.page-transition::before,
.page-transition::after {
  content: '';
  position: absolute;
  inset: 0;
}

.page-transition::before {
  background: #0a0a0a;
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  animation: slideDown 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

@keyframes slideDown {
  0%   { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
  50%  { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  100% { clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }
}
```

### Skeleton Loading with Shimmer
```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 0%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.03) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
```

### Morphing Loader (CSS-only shape transitions)
```css
.morph-loader {
  width: 48px;
  height: 48px;
  background: white;
  animation: morph 2s ease-in-out infinite;
}

@keyframes morph {
  0%   { border-radius: 50%; transform: rotate(0deg) scale(1); }
  25%  { border-radius: 25% 75% 25% 75%; transform: rotate(90deg) scale(0.8); }
  50%  { border-radius: 10%; transform: rotate(180deg) scale(1); }
  75%  { border-radius: 75% 25% 75% 25%; transform: rotate(270deg) scale(0.8); }
  100% { border-radius: 50%; transform: rotate(360deg) scale(1); }
}
```

### Staggered Content Reveal
```css
.stagger-container > * {
  animation: staggerIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;
}

/* Stagger delay using nth-child */
.stagger-container > *:nth-child(1) { animation-delay: 0ms; }
.stagger-container > *:nth-child(2) { animation-delay: 80ms; }
.stagger-container > *:nth-child(3) { animation-delay: 160ms; }
.stagger-container > *:nth-child(4) { animation-delay: 240ms; }
.stagger-container > *:nth-child(5) { animation-delay: 320ms; }

@keyframes staggerIn {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}
```

### View Transitions API (Next.js compatible)
```css
/* For page transitions in Next.js app router */
::view-transition-old(root) {
  animation: fadeOut 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeOut {
  to { opacity: 0; filter: blur(4px); transform: scale(0.98); }
}

@keyframes fadeIn {
  from { opacity: 0; filter: blur(4px); transform: scale(1.02); }
}
```

---

## 11. Holographic/Lenticular Card Effects

### Full Holographic Card (CSS + minimal JS for mouse tracking)
```css
.holo-card {
  --mouse-x: 50%;
  --mouse-y: 50%;
  --rotate-x: 0deg;
  --rotate-y: 0deg;

  position: relative;
  width: 300px;
  aspect-ratio: 2.5 / 3.5;
  border-radius: 16px;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
  transition: transform 0.15s ease-out;
}

/* Holographic rainbow overlay */
.holo-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      135deg,
      oklch(0.8 0.2 0) 0%,
      oklch(0.8 0.2 60) 10%,
      oklch(0.8 0.2 120) 20%,
      oklch(0.8 0.2 180) 30%,
      oklch(0.8 0.2 240) 40%,
      oklch(0.8 0.2 300) 50%,
      oklch(0.8 0.2 360) 60%
    );
  background-size: 200% 200%;
  background-position: var(--mouse-x) var(--mouse-y);
  mix-blend-mode: color-dodge;
  opacity: 0.4;
  filter: brightness(1.2) contrast(1.1);
  z-index: 2;
  pointer-events: none;
  transition: opacity 0.3s;
}

/* Spotlight effect that follows cursor */
.holo-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x) var(--mouse-y),
    rgba(255,255,255,0.3) 0%,
    transparent 60%
  );
  z-index: 3;
  pointer-events: none;
}

/* Shimmer on hover */
.holo-card:hover::before {
  opacity: 0.7;
}
```

### React Hook for Card Tilt
```tsx
// useCardTilt.ts
'use client';
import { useRef, useCallback } from 'react';

export function useCardTilt(maxRotation = 15) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0-1
    const y = (e.clientY - rect.top) / rect.height;    // 0-1
    const rotateY = (x - 0.5) * maxRotation * 2;       // -max to +max
    const rotateX = (0.5 - y) * maxRotation * 2;

    el.style.setProperty('--rotate-x', `${rotateX}deg`);
    el.style.setProperty('--rotate-y', `${rotateY}deg`);
    el.style.setProperty('--mouse-x', `${x * 100}%`);
    el.style.setProperty('--mouse-y', `${y * 100}%`);
  }, [maxRotation]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rotate-x', '0deg');
    el.style.setProperty('--rotate-y', '0deg');
    el.style.transition = 'transform 0.5s ease-out';
    setTimeout(() => el.style.transition = 'transform 0.15s ease-out', 500);
  }, []);

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}
```

### CSS-Only Iridescent Effect (No JS)
```css
.iridescent {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 16px;
  overflow: hidden;
}

.iridescent::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    conic-gradient(
      from 0deg at 50% 50%,
      oklch(0.7 0.15 0),
      oklch(0.7 0.15 60),
      oklch(0.7 0.15 120),
      oklch(0.7 0.15 180),
      oklch(0.7 0.15 240),
      oklch(0.7 0.15 300),
      oklch(0.7 0.15 360)
    );
  mix-blend-mode: color-dodge;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.5s;
}

.iridescent:hover::before {
  opacity: 0.5;
  animation: iridescentShift 3s linear infinite;
}

@keyframes iridescentShift {
  to { filter: blur(20px) hue-rotate(360deg); }
}
```

---

## 12. Liquid Glass / Glassmorphism 2.0

### Modern Liquid Glass Panel
```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
  transform: translateZ(0); /* force GPU */
}

/* Light refraction edge */
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.1) 0%,
    transparent 40%,
    transparent 60%,
    rgba(255,255,255,0.05) 100%
  );
  pointer-events: none;
}

/* Chromatic aberration edge */
.liquid-glass::after {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(100, 200, 255, 0.1) 0%,
    transparent 30%,
    transparent 70%,
    rgba(255, 100, 200, 0.1) 100%
  );
  pointer-events: none;
  z-index: -1;
}
```

### Tailwind Glass Utility
```css
/* globals.css */
@layer utilities {
  .glass {
    @apply relative overflow-hidden;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .glass-strong {
    @apply relative overflow-hidden;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(40px) saturate(200%);
    -webkit-backdrop-filter: blur(40px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
}
```

---

## 13. Container Queries

### Component-Level Responsive Design
```css
/* The component responds to ITS OWN container, not the viewport */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@container card (min-width: 700px) {
  .card {
    grid-template-columns: 1fr 2fr;
  }

  .card-title {
    font-size: 2rem;
  }
}

/* Container query units */
.card-text {
  font-size: clamp(0.875rem, 3cqi, 1.25rem); /* cqi = container query inline */
}
```

### Tailwind v4 Container Queries
```tsx
{/* In Tailwind v4, container queries are built-in */}
<div className="@container">
  <div className="@sm:flex @sm:gap-4 @lg:grid @lg:grid-cols-3">
    {/* Responsive to container, not viewport */}
  </div>
</div>
```

---

## 14. Browser Support Matrix (Mid-2026)

| Feature                          | Chrome | Safari | Firefox |
|----------------------------------|--------|--------|---------|
| `animation-timeline: scroll()`   | 115+   | 26+    | Flag    |
| `animation-timeline: view()`     | 115+   | 26+    | Flag    |
| `animation-range`                | 115+   | 26+    | Flag    |
| `@property`                      | 85+    | 15.4+  | 128+    |
| Container Queries                | 105+   | 16+    | 110+    |
| `backdrop-filter`                | 76+    | 9+     | 103+    |
| `clip-path` animation            | 55+    | 13.1+  | 54+     |
| CSS Anchor Positioning           | 125+   | 26+    | 147+    |
| Scroll-State Queries             | 133+   | No     | No      |
| View Transitions API             | 111+   | 18+    | No      |
| `oklch()` colors                 | 111+   | 15.4+  | 113+    |
| `scroll-timeline` (named)        | 115+   | 26+    | Flag    |
| Scroll-Triggered Animations      | 145+   | No     | No      |

### Progressive Enhancement Strategy
```css
/* Base experience (works everywhere) */
.element {
  opacity: 1;
  transform: none;
}

/* Enhanced experience (scroll-driven animations) */
@supports (animation-timeline: scroll()) {
  .element {
    animation: revealEffect linear both;
    animation-timeline: view();
    animation-range: entry 15% cover 40%;
  }
}

/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Bonus: Combining Techniques for Awwwards-Level Sections

### Hero Section with Parallax + Text Reveal + Gradient Mesh
```tsx
export function HeroSection() {
  return (
    <section className="relative h-[200vh]">
      {/* Background mesh */}
      <div className="gradient-mesh fixed inset-0 -z-10" />

      {/* Sticky content */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <h1 className="text-reveal-word text-8xl font-light tracking-tight">
          Drift Wellness
        </h1>
      </div>

      {/* Parallax layers */}
      <div className="parallax-slow absolute inset-0 pointer-events-none">
        <img src="/texture.webp" className="w-full h-full object-cover opacity-10" />
      </div>
    </section>
  );
}
```

### Performance Checklist
1. Only animate `transform`, `opacity`, `filter`, `clip-path` (GPU-composited)
2. Never animate `width`, `height`, `top`, `left`, `margin`, `padding` (triggers layout)
3. Use `will-change: transform` sparingly -- only on elements about to animate
4. Use `contain: layout style paint` on scroll containers
5. Always wrap in `@supports` for graceful degradation
6. Always include `@media (prefers-reduced-motion: reduce)` overrides
7. Test in Chrome DevTools Performance panel -- aim for 0 layout shifts during scroll
