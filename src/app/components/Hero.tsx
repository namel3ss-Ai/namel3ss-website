import { useLayoutEffect, useRef } from 'react';
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

type HeroProps = {
  isActive: boolean;
  sectionRef: (node: HTMLElement | null) => void;
};

export function Hero({ isActive, sectionRef }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const section = rootRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const sentences = Array.from(section.querySelectorAll<HTMLElement>('.hero-sentence'));
      if (sentences.length <= 1) return;

      const stepCount = sentences.length - 1;

      gsap.set(sentences, { autoAlpha: 0.28 });
      gsap.set(sentences[0], { autoAlpha: 1 });
      gsap.set(track, { xPercent: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * 3.4}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (value) => Math.round(value * stepCount) / stepCount,
            duration: { min: 0.18, max: 0.34 },
            delay: 0.05,
            ease: 'power1.inOut',
            inertia: false,
          },
        },
      });

      tl.to(track, { xPercent: -100 * stepCount, duration: stepCount }, 0);

      for (let i = 0; i < stepCount; i += 1) {
        tl.to(sentences[i], { autoAlpha: 0.28, duration: 1 }, i);
        tl.to(sentences[i + 1], { autoAlpha: 1, duration: 1 }, i);
      }
    }, rootRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const setCombinedRef = (node: HTMLElement | null) => {
    rootRef.current = node;
    sectionRef(node);
  };

  if (prefersReducedMotion) {
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
