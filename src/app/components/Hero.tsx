import { motion } from 'motion/react';

export function Hero() {
  return (
    <section id="overview" className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative bg-white">
      <div className="text-center max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] mb-4 text-black whitespace-nowrap"
        >
          AI you can read.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-[1.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] mb-16 text-black whitespace-nowrap"
        >
          Answers you can explain.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal tracking-tight opacity-60 text-black mb-12"
        >
          A programming language for explainable AI.
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.a
            href="https://github.com/namel3ss-Ai/namel3ss/blob/main/docs/learning-namel3ss.md"
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden px-8 py-4 rounded-full bg-black text-white tracking-wide group w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Read the language</span>
            
            {/* Shimmer effect on hover */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.a>

          <motion.a
            href="https://github.com/namel3ss-Ai/namel3ss"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full border-2 border-black text-black tracking-wide hover:bg-black hover:text-white transition-colors duration-300 w-full sm:w-auto text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}