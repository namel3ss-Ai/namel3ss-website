import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function TheMoment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl mb-16 text-center"
        >
          The moment
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-2xl md:text-3xl mb-6 text-gray-400">
              Most "AI apps" are glue.
            </p>
            <p className="text-xl text-gray-500 leading-relaxed">
              One file for prompts. Another for tools. Another for UI. Another for state.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-2xl md:text-3xl mb-6">
              namel3ss removes the glue.
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              It makes AI explicit. It makes behavior inspectable. It keeps the system readable.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
