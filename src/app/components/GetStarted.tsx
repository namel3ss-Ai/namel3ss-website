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
      title: "Check",
      code: "n3 check app.ai"
    },
    {
      title: "Run",
      code: "n3 run app.ai --port 7360 --no-open"
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
      </div>
    </section>
  );
}
