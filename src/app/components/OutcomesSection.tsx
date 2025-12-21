import { motion } from "motion/react";

const outcomes = [
  {
    title: "Language",
    description: "Intent-driven syntax that reads like thought.",
    code: `app is "hello-app":
  entry_page is "home"

page is "home" at "/":
  section is "main":
    text is "Hello World"`,
    isShipped: true
  },
  {
    title: "Runtime",
    description: "A unified runtime that behaves consistently across AI providers.",
    code: `model is "default-model":
  provider is "openai_default"

ai is "assistant":
  model is "default-model"
  system is "You are a helpful assistant."
  input from user_input`,
    isShipped: true
  },
  {
    title: "Memory",
    description: "Explicit memory with configurable recall.",
    code: `memory:
  long_term retention_days 180
  recall top_k 5`,
    isShipped: true
  },
  {
    title: "Flows",
    description: "Declarative orchestration of actions and AI steps.",
    code: `flow is "summarize":
  step is "invoke":
    kind is "ai"
    target is "assistant"`,
    isShipped: true
  }
];

export function OutcomesSection() {
  return (
    <section className="min-h-screen bg-white py-40 px-6 md:px-12 flex items-center" data-section="outcomes">
      <div className="max-w-[1400px] mx-auto w-full">
        
        {/* Headline - Ultra refined */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[72px] md:text-[88px] tracking-[-0.042em] leading-[0.95] text-center mb-32 font-semibold text-black"
        >
          What you can build.
        </motion.h2>

        {/* Grid - 2x2 layout with hairline dividers */}
        <div className="grid md:grid-cols-2 gap-0">
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative bg-white p-12 md:p-16 lg:p-20 min-h-[480px] flex flex-col justify-start border-r border-b border-black/[0.08] last:border-r-0 md:nth-2:border-r-0"
            >
              {/* Title */}
              <h3 className="text-[36px] md:text-[42px] lg:text-[48px] tracking-[-0.032em] leading-[1.05] mb-4 font-semibold text-black">
                {outcome.title}
              </h3>
              
              {/* Description */}
              <p className="text-[16px] md:text-[18px] tracking-[-0.01em] leading-[1.4] text-black/48 font-normal mb-10 max-w-xl">
                {outcome.description}
              </p>

              {/* Code Block - Hairline border */}
              <div className="border border-black/[0.06] rounded-lg p-6 md:p-8 bg-black/[0.01] mt-auto">
                <pre className={`font-mono text-[13px] md:text-[14px] leading-[1.8] tracking-tight ${outcome.isShipped ? 'text-black/72' : 'text-black/40'}`}>
                  <code>{outcome.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}