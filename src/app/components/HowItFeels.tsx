import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { BookOpen, Zap, Eye } from 'lucide-react';

export function HowItFeels() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: BookOpen,
      title: "Read it",
      description: "It's written like intent."
    },
    {
      icon: Zap,
      title: "Run it",
      description: "One command."
    },
    {
      icon: Eye,
      title: "Understand it",
      description: "Traces. Memory. Why.",
      extra: "No dashboards. No noise."
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl mb-20 text-center"
        >
          How it feels
        </motion.h2>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
            >
              <div className="flex-shrink-0">
                <step.icon className="size-16 md:size-20" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl mb-4">{step.title}</h3>
                <p className="text-2xl text-gray-600">{step.description}</p>
                {step.extra && (
                  <p className="text-xl text-gray-500 mt-2">{step.extra}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
