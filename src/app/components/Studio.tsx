import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Studio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="studio" ref={ref} className="py-32 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6">Studio</h2>
          <p className="text-2xl md:text-3xl text-gray-400">
            Runtime mirror for debugging and verification.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12"
        >
          <div className="space-y-6">
            <div className="text-center pb-8 border-b border-white/10">
              <p className="text-xl text-gray-300">
                Preview your app exactly as runtime renders it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              {['Traces', 'Memory', 'Diagnostics'].map((panel, i) => (
                <motion.div
                  key={panel}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="bg-white/5 p-6 rounded-xl border border-white/10"
                >
                  <p className="text-lg">{panel}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
