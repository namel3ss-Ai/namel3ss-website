import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'why-namel3ss', label: 'Why namel3ss' },
  { id: 'features', label: 'Features' },
  { id: 'rag', label: 'RAG' },
  { id: 'get-started', label: 'Get started' },
] as const;

type SectionId = (typeof NAV_ITEMS)[number]['id'];

const WHY_CARDS = [
  {
    title: 'Minimal syntax',
    body: 'Define intent with concise language constructs instead of scattering logic across disconnected layers.',
  },
  {
    title: 'Deterministic execution',
    body: 'Run explicit flows you can replay, inspect, and debug when production behavior must be explained.',
  },
  {
    title: 'Explicit AI boundaries',
    body: 'Keep provider calls, prompts, policies, and overrides as visible contracts rather than hidden side effects.',
  },
];

const FEATURES = [
  'Inspectable flows from source definition to runtime decision path.',
  'Built-in explainability via traces, diagnostics, and source-linked outputs.',
  'Flexible overrides to change behavior without copying entire apps.',
  'Deterministic RAG patterns for retrieval, synthesis, and citations.',
  'Accessible UI primitives that stay readable and testable at scale.',
];

const RAG_SNIPPET = `use preset "rag_chat":
  title is "Assistant"

override flow "rag.answer":
  ask ai "gpt-4o-mini" with input:
    query is input.message
    context is input.context
  as answer_text
  return answer_text`;

const APP_SNIPPET = `spec is "1.0"

use preset "rag_chat":
  title is "Assistant"
  model is "gpt-4o-mini"
  answer_template is "summary_keypoints_recommendation_with_citations"`;

const HERO_LINES = [
  'AI deserves its own language.',
  'Built for clarity.',
  'Built for control.',
  'Built to make AI understandable.',
];

const HERO_PANEL_COUNT = HERO_LINES.length;

export function LandingPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
    home: null,
    'why-namel3ss': null,
    features: null,
    rag: null,
    'get-started': null,
  });
  const heroRailRef = useRef<HTMLDivElement | null>(null);
  const heroTriggerRef = useRef<ScrollTrigger | null>(null);
  const whyShellRef = useRef<HTMLDivElement | null>(null);
  const whyOverlayRef = useRef<HTMLDivElement | null>(null);

  const setSectionRef = (id: SectionId) => (node: HTMLElement | null) => {
    sectionRefs.current[id] = node;
  };

  useLayoutEffect(() => {
    const homeSection = sectionRefs.current.home;
    const whySection = sectionRefs.current['why-namel3ss'];
    const heroRail = heroRailRef.current;
    const heroControls = homeSection?.querySelector<HTMLElement>('.hero-controls') ?? null;
    const whyShell = whyShellRef.current;
    const whyOverlay = whyOverlayRef.current;
    if (!homeSection || !heroRail) return;

    const panels = Array.from(heroRail.querySelectorAll<HTMLElement>('.hero-panel'));
    if (!panels.length) return;

    const context = gsap.context(() => {
      const finalPanelStartRatio = panels.length > 0 ? (panels.length - 1) / panels.length : 0;
      const heroTween = gsap.to(heroRail, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: homeSection,
          start: 'top top',
          end: () => `+=${window.innerHeight * ((panels.length - 1) * 0.95)}`,
          scrub: 1.15,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: panels.length > 1 ? 1 / (panels.length - 1) : 1,
            duration: { min: 0.15, max: 0.5 },
            delay: 0.02,
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const index = Math.min(panels.length - 1, Math.floor(self.progress * panels.length));
            setActiveHeroIndex((current) => (current === index ? current : index));
            if (self.isActive) setActiveSection('home');
          },
        },
      });
      heroTriggerRef.current = heroTween.scrollTrigger ?? null;

      const heroDistance = () => window.innerHeight * ((panels.length - 1) * 0.95);

      const handoffStart = () => `top+=${heroDistance() * (finalPanelStartRatio + 0.04)}px top`;
      const handoffEnd = () => `top+=${heroDistance() * 0.97}px top`;
      const overlapStart = () => `top+=${heroDistance() * Math.max(0.7, finalPanelStartRatio)}px top`;
      const overlapEnd = () => `top+=${heroDistance() * 0.97}px top`;

      gsap.to([heroRail, heroControls].filter(Boolean), {
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: homeSection,
          start: handoffStart,
          end: handoffEnd,
          scrub: 1.05,
          invalidateOnRefresh: true,
        },
      });

      if (whyOverlay) {
        gsap.set(whyOverlay, { autoAlpha: 0, yPercent: 10 });
        gsap.to(whyOverlay, {
          autoAlpha: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: homeSection,
            start: overlapStart,
            end: overlapEnd,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });
      }

      if (whySection && whyShell) {
        gsap.set(whySection, { autoAlpha: 0.08 });
        gsap.set(whyShell, { yPercent: 10 });

        gsap.fromTo(
          whySection,
          { autoAlpha: 0.08 },
          {
            autoAlpha: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: homeSection,
              start: overlapStart,
              end: overlapEnd,
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          whyShell,
          { yPercent: 8 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: homeSection,
              start: overlapStart,
              end: overlapEnd,
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, homeSection);

    ScrollTrigger.refresh();
    return () => {
      heroTriggerRef.current = null;
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const triggers: ScrollTrigger[] = [];
    for (const { id } of NAV_ITEMS) {
      const section = sectionRefs.current[id];
      if (!section) continue;
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top 52%',
          end: 'bottom 48%',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      );
    }

    return () => {
      for (const trigger of triggers) trigger.kill();
    };
  }, []);

  const jumpToHeroPanel = (index: number) => {
    const trigger = heroTriggerRef.current;
    if (!trigger) return;
    const clamped = Math.max(0, Math.min(HERO_PANEL_COUNT - 1, index));
    const progress = HERO_PANEL_COUNT === 1 ? 0 : clamped / (HERO_PANEL_COUNT - 1);
    const start = Number(trigger.start);
    const end = Number(trigger.end);
    const target = start + (end - start) * progress;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const progressWidth = `${((activeHeroIndex + 1) / HERO_PANEL_COUNT) * 100}%`;

  return (
    <div className="site">
      <nav className="site-nav">
        <a href="#home" className="site-brand" aria-label="namel3ss home">
          <img src="/namel3ss_horizontal_logo.svg" alt="namel3ss logo" className="site-brand-logo" />
        </a>
        <div className="site-nav-links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={activeSection === item.id ? 'active' : ''}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="home"
        className={`site-section home-section ${activeSection === 'home' ? 'is-active' : ''}`}
        ref={setSectionRef('home')}
      >
        <div className="section-shell hero-shell">
          <div className="hero-rail" ref={heroRailRef} aria-label="Hero statements">
            <article className="hero-panel">
              <span className="hero-step">01 / 04</span>
              <h1 className="hero-title">{HERO_LINES[0]}</h1>
              <p className={`hero-hint ${activeHeroIndex > 0 ? 'is-hidden' : ''}`}>Scroll to continue</p>
            </article>
            <article className="hero-panel">
              <span className="hero-step">02 / 04</span>
              <p className="hero-line">{HERO_LINES[1]}</p>
            </article>
            <article className="hero-panel">
              <span className="hero-step">03 / 04</span>
              <p className="hero-line">{HERO_LINES[2]}</p>
            </article>
            <article className="hero-panel hero-panel-final">
              <span className="hero-step">04 / 04</span>
              <p className="hero-line hero-line-single">{HERO_LINES[3]}</p>
              <div className="hero-actions">
                <a className="site-btn primary" href="#rag">
                  Start building
                </a>
                <a className="site-btn secondary" href="https://github.com/namel3ss-Ai/namel3ss" target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </div>
            </article>
          </div>

          <div className="hero-controls" aria-label="Hero panels">
            <div className="hero-progress" aria-hidden="true">
              <span className="hero-progress-fill" style={{ width: progressWidth }} />
            </div>
            <div className="hero-dots">
              {Array.from({ length: HERO_PANEL_COUNT }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`hero-dot ${activeHeroIndex === index ? 'active' : ''}`}
                  onClick={() => jumpToHeroPanel(index)}
                  aria-label={`Go to hero panel ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="hero-why-overlay" ref={whyOverlayRef} aria-hidden="true">
            <div className="hero-why-shell section-stack">
              <span className="eyebrow">RAG Application</span>
              <h2>Build a RAG app in 9 lines.</h2>
              <img
                className="hero-code-shot"
                src="/rag-application-code-shot.png"
                alt="Screenshot of namel3ss rag-application app.ai code"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-namel3ss"
        className={`site-section why-section ${activeSection === 'why-namel3ss' ? 'is-active' : ''}`}
        ref={setSectionRef('why-namel3ss')}
      >
        <div className="section-shell section-stack why-shell" ref={whyShellRef}>
          <span className="eyebrow">Philosophy</span>
          <h2>Why namel3ss</h2>
          <div className="card-grid">
            {WHY_CARDS.map((card) => (
              <article key={card.title} className="site-card">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        className={`site-section ${activeSection === 'features' ? 'is-active' : ''}`}
        ref={setSectionRef('features')}
      >
        <div className="section-shell section-stack">
          <span className="eyebrow">Features</span>
          <h2>Built for deterministic AI production</h2>
          <ul className="feature-list">
            {FEATURES.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="rag" className={`site-section ${activeSection === 'rag' ? 'is-active' : ''}`} ref={setSectionRef('rag')}>
        <div className="section-shell section-split">
          <div className="content-panel section-stack">
            <span className="eyebrow">RAG</span>
            <h2>Retrieval with grounded citations</h2>
            <p>
              namel3ss models retrieval-augmented generation as explicit flows: upload, ingest, retrieve context, answer,
              and cite source evidence. Every answer can be inspected through deterministic runtime traces.
            </p>
          </div>
          <div className="content-panel section-stack">
            <span className="eyebrow">Override example</span>
            <pre>
              <code>{RAG_SNIPPET}</code>
            </pre>
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className={`site-section ${activeSection === 'get-started' ? 'is-active' : ''}`}
        ref={setSectionRef('get-started')}
      >
        <div className="section-shell section-split">
          <div className="content-panel section-stack">
            <span className="eyebrow">Sample app.ai</span>
            <pre>
              <code>{APP_SNIPPET}</code>
            </pre>
          </div>
          <div className="content-panel section-stack">
            <span className="eyebrow">Get started</span>
            <h2>Use preset first, inspect everything.</h2>
            <p>Run `n3 expand app.ai` to inspect the deterministic generated program, then override only what you need.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
