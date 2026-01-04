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
          <p className="text-2xl md:text-3xl text-gray-400 italic">
            The app is the product. Studio is the glass.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-12"
        >
          <div className="space-y-8">
            <div className="text-center pb-8 border-b border-white/10">
              <p className="text-xl text-gray-400 mb-4">App Preview is full screen</p>
              <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
                <div className="size-3 bg-white rounded-full" />
                <p className="text-lg">Run ▸</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {['Graph', 'Traces', 'Memory', 'Why'].map((panel, i) => (
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

            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-xl text-gray-400">
                No settings. No editor. No "developer cockpit."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}