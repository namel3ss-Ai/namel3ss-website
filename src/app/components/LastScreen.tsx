import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, MessageSquare } from 'lucide-react';

import { usePrefersReducedMotion } from '../../lib/motion/prefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function LastScreen() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const logo = logoRef.current;
    const socials = socialsRef.current;
    if (!section || !logo || !socials) return;

    const ctx = gsap.context(() => {
      gsap.set(logo, {
        autoAlpha: 1,
        y: 72,
        scale: 0.94,
      });
      gsap.set(socials, { autoAlpha: 0, y: 24 });

      gsap.to(logo, {
        y: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 108%',
          end: 'top 56%',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(socials, {
        autoAlpha: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 92%',
          end: 'top 50%',
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="last-screen" className="site-section last-screen" ref={sectionRef}>
      <div className="last-screen-shell">
        <img ref={logoRef} src="/namel3ss_horizontal_logo.svg" alt="namel3ss logo" className="last-screen-logo" />
        <div ref={socialsRef} className="last-screen-socials" aria-label="Social media links">
          <a
            href="https://www.linkedin.com/company/namel3ss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="last-screen-social-link"
          >
            <Linkedin className="last-screen-social-icon" />
          </a>
          <a
            href="https://discord.com/invite/x8s6aEwdU"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="last-screen-social-link"
          >
            <MessageSquare className="last-screen-social-icon" />
          </a>
          <a
            href="https://github.com/namel3ss-Ai/namel3ss"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="last-screen-social-link"
          >
            <Github className="last-screen-social-icon" />
          </a>
        </div>
      </div>
    </section>
  );
}
