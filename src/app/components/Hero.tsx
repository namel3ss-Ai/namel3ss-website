import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePrefersReducedMotion } from '../../lib/motion/prefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const HERO_LINES = [
  'AI deserves its own language.',
  'Built for clarity.',
  'Built for control.',
  'Built to make AI understandable.',
];

const RAG_DEMO_ENTRY_URL = 'https://github.com/namel3ss-Ai/namel3ss/tree/main/apps/rag-application';

const canUsePinnedHero = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;

  const isSmallViewport = window.matchMedia('(max-width: 900px)').matches;
  const isTouchLike = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;

  return !isSmallViewport && !isTouchLike;
};

type HeroProps = {
  isActive: boolean;
  sectionRef: (node: HTMLElement | null) => void;
};

export function Hero({ isActive, sectionRef }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [supportsPinnedHero, setSupportsPinnedHero] = useState<boolean>(canUsePinnedHero);
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const shouldUsePinnedHero = !prefersReducedMotion && supportsPinnedHero;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const queries = [
      window.matchMedia('(max-width: 900px)'),
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(hover: none)'),
    ];

    const syncSupportsPinnedHero = () => {
      const [smallViewportQuery, coarsePointerQuery, hoverNoneQuery] = queries;
      setSupportsPinnedHero(!smallViewportQuery.matches && !coarsePointerQuery.matches && !hoverNoneQuery.matches);
    };

    syncSupportsPinnedHero();
    queries.forEach((query) => query.addEventListener('change', syncSupportsPinnedHero));

    return () => {
      queries.forEach((query) => query.removeEventListener('change', syncSupportsPinnedHero));
    };
  }, []);

  useLayoutEffect(() => {
    if (!shouldUsePinnedHero) return;
    const section = rootRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const sentences = Array.from(section.querySelectorAll<HTMLElement>('.hero-sentence'));
      const pinShell = section.querySelector<HTMLElement>('.hero-pin-shell');
      if (!pinShell) return;
      if (sentences.length <= 1) return;

      const stepCount = sentences.length - 1;
      const holdDuration = 0.58;
      const transitionDuration = 0.9;
      const segmentDuration = holdDuration + transitionDuration;
      const finalHoldDuration = 0.92;
      const exitDuration = 0.78;
      const scrollDistanceMultiplier = Math.max(5.8, stepCount * 2.15);
      const holdState = { value: 0 };

      gsap.set(sentences, { autoAlpha: 0.28 });
      gsap.set(sentences[0], { autoAlpha: 1 });
      gsap.set(track, { xPercent: 0 });
      gsap.set(pinShell, { autoAlpha: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * scrollDistanceMultiplier}`,
          pin: true,
          scrub: 1.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 0; i < stepCount; i += 1) {
        const transitionStart = i * segmentDuration + holdDuration;

        tl.to(track, { xPercent: -100 * (i + 1), duration: transitionDuration, ease: 'power1.inOut' }, transitionStart);
        tl.to(sentences[i], { autoAlpha: 0.28, duration: transitionDuration }, transitionStart);
        tl.to(sentences[i + 1], { autoAlpha: 1, duration: transitionDuration }, transitionStart);
      }

      tl.to(holdState, { value: 1, duration: finalHoldDuration });
      tl.to(pinShell, { autoAlpha: 0.18, y: -42, duration: exitDuration, ease: 'power1.out' });
    }, rootRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [shouldUsePinnedHero]);

  const setCombinedRef = (node: HTMLElement | null) => {
    rootRef.current = node;
    sectionRef(node);
  };

  if (!shouldUsePinnedHero) {
    return (
      <section
        id="home"
        className={`site-section hero-section hero-section-reduced ${isActive ? 'is-active' : ''}`}
        ref={setCombinedRef}
      >
        <div className="hero-reduced-content">
          {HERO_LINES.map((line) => (
            <p key={line} className="hero-reduced-line">
              {line}
            </p>
          ))}
          <div className="hero-actions-static">
            <a className="site-btn primary" href={RAG_DEMO_ENTRY_URL} target="_blank" rel="noreferrer">
              Start building
            </a>
            <a className="site-btn secondary" href="https://github.com/namel3ss-Ai/namel3ss" target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className={`site-section hero-section ${isActive ? 'is-active' : ''}`} ref={setCombinedRef}>
      <div className="hero-pin-shell">
        <div className="hero-viewport">
          <div className="hero-track" ref={trackRef}>
            {HERO_LINES.map((line) => (
              <div key={line} className="hero-slide">
                <p className="hero-sentence">{line}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-actions-static">
          <a className="site-btn primary" href={RAG_DEMO_ENTRY_URL} target="_blank" rel="noreferrer">
            Start building
          </a>
          <a className="site-btn secondary" href="https://github.com/namel3ss-Ai/namel3ss" target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
