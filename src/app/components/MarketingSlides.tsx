import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Slide = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  panelTitle: string;
  panelValue: string;
  panelCaption: string;
};

const slides: Slide[] = [
  {
    id: 'language',
    kicker: 'Language-first',
    title: 'Ship AI apps as deterministic programs',
    body: 'namel3ss keeps data, flows, tools, policies, and UI in one explicit source of truth.',
    points: [
      'No hidden orchestration glue',
      'Contracts and flows are inspectable',
      'Deterministic compile-time expansion',
    ],
    panelTitle: 'Core Identity',
    panelValue: 'Deterministic AI language',
    panelCaption: 'Readable architecture from day one.',
  },
  {
    id: 'rag',
    kicker: 'RAG application',
    title: 'Go from upload to grounded answers with citations',
    body: 'Use rag_chat preset + override-safe contracts for a complete retrieval workflow.',
    points: [
      'Upload -> ingest -> retrieve -> answer',
      'Inline citations with source drawers',
      'Grounded output with explicit context',
    ],
    panelTitle: 'Developer Promise',
    panelValue: 'Production RAG in compact app.ai',
    panelCaption: 'Minimal syntax, full control when needed.',
  },
  {
    id: 'ops',
    kicker: 'Operational trust',
    title: 'Debug behavior without guessing',
    body: 'Studio mirrors runtime behavior so teams can trace decisions and resolve issues faster.',
    points: [
      'Traces and memory visibility',
      'Deterministic replay surfaces',
      'Policy and provider boundaries remain explicit',
    ],
    panelTitle: 'Runtime Signal',
    panelValue: 'Understand every answer path',
    panelCaption: 'From user input to model output.',
  },
];

export function MarketingSlides() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const active = slides[index];

  const navigate = (step: number) => {
    setDirection(step > 0 ? 1 : -1);
    setIndex((prev) => (prev + step + slides.length) % slides.length);
  };

  return (
    <section id="slides" className="py-28 px-6 bg-[#0D1B2A] text-white relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -top-16 -left-10 w-72 h-72 rounded-full bg-[#2A9D8F]/25 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-[#F4A261]/20 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#E9C46A] mb-2">Marketing Storyline</p>
            <h2 className="text-4xl md:text-5xl leading-tight">Why teams choose namel3ss</h2>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full border border-white/30 hover:border-white/60 transition-colors grid place-items-center"
              aria-label="Previous slide"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              className="w-11 h-11 rounded-full border border-white/30 hover:border-white/60 transition-colors grid place-items-center"
              aria-label="Next slide"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_0.9fr] gap-6 items-stretch">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/8 border border-white/15 rounded-2xl p-8 md:p-10 backdrop-blur-sm"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[#E9C46A] mb-3">{active.kicker}</p>
              <h3 className="text-3xl md:text-4xl leading-tight mb-4">{active.title}</h3>
              <p className="text-lg text-white/80 leading-relaxed mb-7">{active.body}</p>
              <ul className="space-y-3">
                {active.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base md:text-lg">
                    <span className="mt-2 w-2 h-2 rounded-full bg-[#E9C46A] flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.aside
              key={`${active.id}-panel`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#15263A] border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">{active.panelTitle}</p>
                <p className="text-2xl md:text-3xl leading-tight mb-4">{active.panelValue}</p>
                <p className="text-white/70">{active.panelCaption}</p>
              </div>
              <div className="pt-8 mt-8 border-t border-white/10">
                <p className="text-sm text-white/70 mb-2">Slide {index + 1} / {slides.length}</p>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    key={active.id}
                    className="h-full bg-[#E9C46A]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6.2, ease: 'linear' }}
                  />
                </div>
              </div>
            </motion.aside>
          </AnimatePresence>
        </div>

        <div className="flex md:hidden items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-11 h-11 rounded-full border border-white/30 hover:border-white/60 transition-colors grid place-items-center"
            aria-label="Previous slide"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            className="w-11 h-11 rounded-full border border-white/30 hover:border-white/60 transition-colors grid place-items-center"
            aria-label="Next slide"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
