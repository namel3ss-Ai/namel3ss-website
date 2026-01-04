import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function UnderstandingFirst() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl text-center mb-12"
        >
          Understanding comes before trust.
        </motion.h2>

        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-center mb-20 max-w-3xl mx-auto"
        >
          <p className="leading-relaxed">
            namel3ss was built for AI systems<br />
            where the reasoning matters as much as the result.
          </p>
        </motion.div>

        {/* Two Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border border-black/10 rounded-lg p-12 bg-white"
          >
            <p className="text-xs tracking-wider mb-8 opacity-50">WHAT THIS ENABLES</p>
            <ul className="space-y-4 text-xl md:text-2xl">
              <li className="flex items-start gap-3">
                <span className="relative flex-shrink-0 mt-2">
                  <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-black/10 blur-sm" />
                  <span className="relative block w-1.5 h-1.5 rounded-full bg-black ring-2 ring-black/10" />
                </span>
                <span>AI systems you can read</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="relative flex-shrink-0 mt-2">
                  <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-black/10 blur-sm" />
                  <span className="relative block w-1.5 h-1.5 rounded-full bg-black ring-2 ring-black/10" />
                </span>
                <span>Decisions you can explain</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="relative flex-shrink-0 mt-2">
                  <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-black/10 blur-sm" />
                  <span className="relative block w-1.5 h-1.5 rounded-full bg-black ring-2 ring-black/10" />
                </span>
                <span>Behavior you can reason about</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="relative flex-shrink-0 mt-2">
                  <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-black/10 blur-sm" />
                  <span className="relative block w-1.5 h-1.5 rounded-full bg-black ring-2 ring-black/10" />
                </span>
                <span>Trust without guesswork</span>
              </li>
            </ul>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="border border-black/10 rounded-lg p-12 bg-white"
          >
            <p className="text-xs tracking-wider mb-8 opacity-50">WHY A LANGUAGE</p>
            <div className="text-xl md:text-2xl leading-relaxed space-y-6">
              <p>
                Prompts are not systems.<br />
                Glue code does not scale.
              </p>
              <p>
                namel3ss is a programming language<br />
                because intent, data, and behavior<br />
                need structure.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}