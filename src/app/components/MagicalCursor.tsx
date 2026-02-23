import { useEffect, useRef, useState } from 'react';

import { usePrefersReducedMotion } from '../../lib/motion/prefersReducedMotion';

const TRAIL_COUNT = 14;
const SPARK_COUNT = 28;

type Spark = {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export function MagicalCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isEnabled, setIsEnabled] = useState(false);
  const layerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparkRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setIsEnabled(false);
      return;
    }

    const finePointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');

    const syncState = () => {
      setIsEnabled(finePointerQuery.matches && hoverQuery.matches);
    };

    syncState();
    finePointerQuery.addEventListener('change', syncState);
    hoverQuery.addEventListener('change', syncState);

    return () => {
      finePointerQuery.removeEventListener('change', syncState);
      hoverQuery.removeEventListener('change', syncState);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isEnabled) return;

    document.body.classList.add('has-magical-cursor');

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let coreX = targetX;
    let coreY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let glowX = targetX;
    let glowY = targetY;
    let hoverAmount = 0;
    let pressAmount = 0;
    let isHoveringInteractive = false;
    let isPressed = false;
    let lastTs = performance.now();
    let lastDriftSpark = 0;
    let rafId = 0;

    const trail = Array.from({ length: TRAIL_COUNT }, () => ({ x: targetX, y: targetY }));
    const sparks: Spark[] = Array.from({ length: SPARK_COUNT }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 0,
    }));

    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(target.closest('a, button, [role="button"], input, textarea, select, label, summary'));
    };

    const spawnSparks = (x: number, y: number, amount: number, force = 1) => {
      for (let i = 0; i < amount; i += 1) {
        const spark = sparks.find((item) => !item.active);
        if (!spark) break;
        const angle = Math.random() * Math.PI * 2;
        const speed = (42 + Math.random() * 120) * force;
        spark.active = true;
        spark.x = x;
        spark.y = y;
        spark.vx = Math.cos(angle) * speed;
        spark.vy = Math.sin(angle) * speed - 16;
        spark.maxLife = 0.34 + Math.random() * 0.42;
        spark.life = spark.maxLife;
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      isHoveringInteractive = isInteractiveTarget(event.target);

      const now = performance.now();
      if (now - lastDriftSpark > 38) {
        spawnSparks(targetX, targetY, 1, 0.55);
        lastDriftSpark = now;
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      isHoveringInteractive = isInteractiveTarget(event.target);
    };

    const handleMouseDown = (event: MouseEvent) => {
      isPressed = true;
      spawnSparks(event.clientX, event.clientY, 10, 1);
    };

    const handleMouseUp = () => {
      isPressed = false;
    };

    const handleMouseLeave = () => {
      if (layerRef.current) {
        layerRef.current.style.opacity = '0';
      }
    };

    const handleMouseEnter = () => {
      if (layerRef.current) {
        layerRef.current.style.opacity = '1';
      }
    };

    const frame = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTs) / 1000, 0.04);
      lastTs = timestamp;

      hoverAmount += ((isHoveringInteractive ? 1 : 0) - hoverAmount) * 0.16;
      pressAmount += ((isPressed ? 1 : 0) - pressAmount) * 0.24;

      coreX += (targetX - coreX) * 0.46;
      coreY += (targetY - coreY) * 0.46;
      ringX += (targetX - ringX) * 0.24;
      ringY += (targetY - ringY) * 0.24;
      glowX += (targetX - glowX) * 0.16;
      glowY += (targetY - glowY) * 0.16;

      if (trail.length > 0) {
        trail[0].x += (targetX - trail[0].x) * 0.32;
        trail[0].y += (targetY - trail[0].y) * 0.32;
      }

      for (let i = 1; i < trail.length; i += 1) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.31;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.31;
      }

      const coreScale = 1 + hoverAmount * 0.36 - pressAmount * 0.24;
      const ringScale = 1 + hoverAmount * 0.52 - pressAmount * 0.26;
      const glowScale = 1 + hoverAmount * 0.3 - pressAmount * 0.08;

      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${coreX}px, ${coreY}px, 0) translate(-50%, -50%) scale(${coreScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%) scale(${glowScale})`;
        glowRef.current.style.opacity = `${0.42 + hoverAmount * 0.22}`;
      }

      for (let i = 0; i < trail.length; i += 1) {
        const trailNode = trailRefs.current[i];
        if (!trailNode) continue;
        const progress = 1 - i / trail.length;
        const scale = 0.35 + progress * 0.95 + hoverAmount * 0.15;
        const opacity = Math.max(0, progress * 0.68 - pressAmount * 0.15);
        trailNode.style.transform = `translate3d(${trail[i].x}px, ${trail[i].y}px, 0) translate(-50%, -50%) scale(${scale})`;
        trailNode.style.opacity = `${opacity}`;
      }

      for (let i = 0; i < sparks.length; i += 1) {
        const spark = sparks[i];
        const sparkNode = sparkRefs.current[i];
        if (!sparkNode) continue;

        if (!spark.active) {
          sparkNode.style.opacity = '0';
          continue;
        }

        spark.life -= dt;
        if (spark.life <= 0) {
          spark.active = false;
          sparkNode.style.opacity = '0';
          continue;
        }

        spark.vx *= 0.97;
        spark.vy = spark.vy * 0.98 + 180 * dt;
        spark.x += spark.vx * dt;
        spark.y += spark.vy * dt;

        const lifeProgress = spark.life / spark.maxLife;
        const sparkScale = 0.3 + lifeProgress * 1.1;
        sparkNode.style.opacity = `${lifeProgress * 0.88}`;
        sparkNode.style.transform = `translate3d(${spark.x}px, ${spark.y}px, 0) translate(-50%, -50%) scale(${sparkScale})`;
      }

      rafId = window.requestAnimationFrame(frame);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('has-magical-cursor');
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div ref={layerRef} className="magical-cursor-layer" aria-hidden="true">
      <div ref={glowRef} className="magical-cursor-glow" />
      <div ref={ringRef} className="magical-cursor-ring" />
      <div ref={coreRef} className="magical-cursor-core" />

      {Array.from({ length: TRAIL_COUNT }).map((_, index) => (
        <span
          key={`trail-${index}`}
          ref={(node) => {
            trailRefs.current[index] = node;
          }}
          className="magical-cursor-trail"
        />
      ))}

      {Array.from({ length: SPARK_COUNT }).map((_, index) => (
        <span
          key={`spark-${index}`}
          ref={(node) => {
            sparkRefs.current[index] = node;
          }}
          className="magical-cursor-spark"
        />
      ))}
    </div>
  );
}
