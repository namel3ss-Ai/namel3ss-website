import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Terminal } from 'lucide-react';

export function GetStarted() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      title: "Install",
      code: "pip install namel3ss"
    },
    {
      title: "Run the demo",
      code: "n3 examples/clear_orders/app.ai"
    },
    {
      title: "Open Studio",
      code: "n3 examples/clear_orders/app.ai studio"
    }
  ];

  return (
    <section id="get-started" ref={ref} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl mb-20 text-center"
        >
          Get started
        </motion.h2>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-black text-white rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="size-6" />
                <h3 className="text-xl">{step.title}</h3>
              </div>
              <code className="text-lg md:text-xl font-mono text-gray-300 block">
                {step.code}
              </code>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-200"
        >
          <h3 className="text-2xl md:text-3xl mb-4">Status</h3>
          <p className="text-xl mb-4">Alpha.</p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Stable where it matters: structure, determinism, and explainability surfaces.
            <br />
            Evolving where it should: UX polish, templates, and onboarding.
          </p>
        </motion.div>
      </div>
    </section>
  );
}