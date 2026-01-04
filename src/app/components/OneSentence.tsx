import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function OneSentence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <p className="text-3xl md:text-5xl leading-relaxed">
          namel3ss is an <span className="italic">English-first programming language</span> for building explainable AI systems especially where data has structure.
        </p>
      </motion.div>
    </section>
  );
}