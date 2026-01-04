import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Check, X } from 'lucide-react';

export function WhatItIs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isItems = [
    "A language for structured, explainable AI apps",
    "A toolchain: CLI + formatter + lint + Studio",
    "A way to keep AI systems readable as they grow"
  ];

  const isNotItems = [
    "A chatbot framework",
    "A prompt library",
    "A \"magic agent platform\"",
    "Production-ready for every edge case (yet)"
  ];

  return (
    <section id="docs" ref={ref} className="py-32 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl mb-20 text-center"
        >
          What it is / what it is not
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* What it is */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-gray-200"
          >
            <h3 className="text-3xl md:text-4xl mb-8">namel3ss is</h3>
            <div className="space-y-6">
              {isItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Check className="size-6 flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What it is not */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-gray-200"
          >
            <h3 className="text-3xl md:text-4xl mb-8">namel3ss is not</h3>
            <div className="space-y-6">
              {isNotItems.map((item, i) => (
                <div key={i} className="flex gap-4 items-start text-gray-600">
                  <X className="size-6 flex-shrink-0 mt-1" />
                  <p className="text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Optional keys section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center bg-white rounded-2xl p-8 border border-gray-200"
        >
          <h3 className="text-2xl md:text-3xl mb-4">Bring your own keys (optional)</h3>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            ClearOrders runs without keys by default.
            <br />
            If you want real AI, add your provider and set your environment variables.
          </p>
          <p className="text-xl mt-4">No lock-in. No surprises.</p>
        </motion.div>
      </div>
    </section>
  );
}