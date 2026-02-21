import { motion } from 'motion/react';

export function Hero() {
  return (
    <section
      id="overview"
      className="h-screen min-h-screen bg-black px-6 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-5xl text-center flex flex-col items-center gap-8"
      >
        <h1 className="text-white font-bold leading-tight tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          AI deserves its own language.
        </h1>

        <div className="flex flex-col gap-3 text-zinc-400 text-lg sm:text-xl md:text-2xl">
          <p>Built for clarity.</p>
          <p>Built for control.</p>
          <p>Built to make AI understandable.</p>
        </div>

        <div className="mt-2 flex w-full max-w-md flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#rag-application"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-center transition-colors duration-200 hover:bg-zinc-200"
          >
            Start building
          </a>
          <a
            href="https://github.com/namel3ss-Ai/namel3ss"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl border border-zinc-500 text-white text-center transition-colors duration-200 hover:bg-zinc-900"
          >
            View on GitHub
          </a>
        </div>
      </motion.div>
    </section>
  );
}
