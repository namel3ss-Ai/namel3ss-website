import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { FileCode, Cpu, Shield, Layout } from 'lucide-react';

export function WhatMakesItDifferent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: FileCode,
      title: "One file. One system.",
      description: "Define data, flows, and AI behavior together in app.ai."
    },
    {
      icon: Cpu,
      title: "AI is a declared dependency",
      description: "AI isn't hidden in code. You choose the provider. You can swap it later."
    },
    {
      icon: Shield,
      title: "Deterministic everywhere it can be",
      description: "AI is the only non-deterministic boundary — and it's explicit."
    },
    {
      icon: Layout,
      title: "Bring your own UI",
      description: "Use the default manifest UI, or ship a custom UI in <project_root>/ui/. Studio will preview it the same way your browser does."
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl mb-20 text-center"
        >
          What makes it different
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200"
            >
              <feature.icon className="size-12 mb-6" />
              <h3 className="text-2xl md:text-3xl mb-4">{feature.title}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
