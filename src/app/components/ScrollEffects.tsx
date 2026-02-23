import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '../../lib/motion/prefersReducedMotion';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ScrollEffects() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const velocityGlowRef = useRef<HTMLSpanElement | null>(null);
  const orbARef = useRef<HTMLSpanElement | null>(null);
  const orbBRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') return;

    let rafId = 0;
    let lastY = window.scrollY;
    let smoothY = lastY;
    let smoothProgress = 0;
    let smoothVelocity = 0;

    const tick = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const currentY = window.scrollY;
      const velocity = currentY - lastY;
      lastY = currentY;

      smoothY += (currentY - smoothY) * 0.11;
      smoothProgress += (currentY / maxScroll - smoothProgress) * 0.12;
      smoothVelocity += (velocity - smoothVelocity) * 0.14;

      const progress = clamp(smoothProgress, 0.015, 1);
      const speed = clamp(Math.abs(smoothVelocity), 0, 36);
      const intensity = speed / 36;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }

      if (velocityGlowRef.current) {
        velocityGlowRef.current.style.opacity = `${0.12 + intensity * 0.46}`;
      }

      if (orbARef.current) {
        const driftX = Math.sin(smoothY * 0.0011) * 58;
        const driftY = -smoothY * 0.08;
        orbARef.current.style.transform = `translate3d(${driftX}px, ${driftY}px, 0)`;
      }

      if (orbBRef.current) {
        const driftX = Math.cos(smoothY * 0.001) * -64;
        const driftY = smoothY * 0.055;
        orbBRef.current.style.transform = `translate3d(${driftX}px, ${driftY}px, 0)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="scroll-effects" aria-hidden="true">
      <div className="scroll-progress-track">
        <span ref={progressRef} className="scroll-progress-fill" />
        <span ref={velocityGlowRef} className="scroll-progress-glow" />
      </div>
      <span ref={orbARef} className="scroll-orb scroll-orb-a" />
      <span ref={orbBRef} className="scroll-orb scroll-orb-b" />
    </div>
  );
}
