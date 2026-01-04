import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function ClearOrders() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl mb-6">ClearOrders</h2>
          <p className="text-2xl md:text-3xl text-gray-600">A demo you can trust.</p>
          <p className="text-xl text-gray-500 mt-4 max-w-3xl mx-auto">
            A small dataset of orders. A simple question. A clear answer. A human explanation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Visual representation of the demo */}
          <div className="border border-gray-200 rounded-2xl p-8 bg-white">
            <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">What you see</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="size-3 bg-black rounded-full" />
                <p className="text-lg">Orders in a table</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 bg-black rounded-full" />
                <p className="text-lg">Ask AI</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 bg-black rounded-full" />
                <p className="text-lg">An answer</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-3 bg-black rounded-full" />
                <p className="text-lg">A "Why?" panel that shows the reasoning signals</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-8 bg-white flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Why it matters</p>
              <p className="text-2xl md:text-3xl italic">
                If the answer can't be explained,
                <br />
                it can't be trusted.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
