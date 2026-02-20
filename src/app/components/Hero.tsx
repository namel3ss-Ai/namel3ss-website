import { motion } from 'motion/react';

const quickSignals = [
  { value: '9', label: 'lines for a RAG app demo' },
  { value: '100%', label: 'inspectable flow expansion' },
  { value: '1', label: 'language for app + AI + UI' },
];

export function Hero() {
  return (
    <section
      id="overview"
      className="min-h-screen flex items-center px-6 pt-28 pb-20 relative overflow-hidden bg-[linear-gradient(135deg,#F8FAFC_0%,#E8F4F1_35%,#FFF5E8_100%)]"
    >
      <motion.div
        aria-hidden
        className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#2A9D8F]/30 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, 18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -left-20 w-96 h-96 rounded-full bg-[#F4A261]/25 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, -14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-xs md:text-sm tracking-[0.22em] uppercase px-4 py-2 rounded-full bg-white/80 border border-black/10 mb-7"
            >
              namel3ss language
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-tight text-[#0B1220]"
            >
              Deterministic AI applications,
              <span className="block text-[#2A9D8F]">written as code you can reason about.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34 }}
              className="mt-8 text-lg md:text-2xl text-[#243447]/80 max-w-3xl leading-relaxed"
            >
              Build end-to-end AI systems with explicit flows, grounded retrieval, policy boundaries,
              and runtime transparency from the first commit.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.46 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#rag-application"
                className="px-8 py-4 rounded-full bg-[#0D1B2A] text-white text-center tracking-wide hover:bg-[#14263d] transition-colors"
              >
                See the RAG application
              </a>
              <a
                href="https://github.com/namel3ss-Ai/namel3ss"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-[#0D1B2A]/30 text-[#0D1B2A] text-center hover:bg-[#0D1B2A] hover:text-white transition-colors"
              >
                Open GitHub
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/75 backdrop-blur-sm border border-white/80 rounded-3xl p-7 shadow-[0_24px_55px_rgba(13,27,42,0.12)]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#0D1B2A]/60 mb-5">Core signals</p>
            <div className="space-y-4">
              {quickSignals.map((signal, idx) => (
                <motion.div
                  key={signal.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.48 + idx * 0.1 }}
                  className="rounded-2xl border border-[#0D1B2A]/10 bg-white px-5 py-4"
                >
                  <p className="text-3xl md:text-4xl text-[#0D1B2A] leading-none mb-2">{signal.value}</p>
                  <p className="text-sm md:text-base text-[#243447]/75">{signal.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
