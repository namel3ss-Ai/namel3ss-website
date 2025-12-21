import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const slides = [
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
  }
];

export function HorizontalStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false
  });

  // With 3 slides, we need to move -200% to show all slides (each slide is 100% width)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <div ref={containerRef} className="relative" data-section="horizontal-story">
      <section className="relative h-[300vh] md:h-[300vh] bg-black z-0">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-black">
          <motion.div
            style={{ x }}
            className="flex gap-0"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-20"
              >
                <div className="max-w-3xl w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Title - Massive, confident */}
                    <h3 className="text-[48px] sm:text-[64px] md:text-[96px] lg:text-[120px] xl:text-[140px] tracking-[-0.04em] leading-[0.9] text-white mb-6 sm:mb-8 font-semibold">
                      {slide.title}
                    </h3>
                    
                    {/* Description - Refined grey */}
                    <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[26px] tracking-[-0.015em] leading-[1.3] text-white/48 mb-10 sm:mb-12 md:mb-16 max-w-2xl font-normal">
                      {slide.description}
                    </p>
                    
                    {/* Code Block - Hairline border, deeper background */}
                    <div className={`border border-white/[0.06] rounded-lg p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-sm ${slide.isShipped ? 'bg-white/[0.02]' : 'bg-white/[0.01]'} overflow-x-auto`}>
                      <pre className={`font-mono text-[12px] sm:text-[13px] md:text-[15px] lg:text-[17px] xl:text-[18px] leading-[1.6] sm:leading-[1.7] md:leading-[1.8] tracking-tight ${slide.isShipped ? 'text-white/72' : 'text-white/40'} whitespace-pre-wrap break-words`}>
                        <code>{slide.code}</code>
                      </pre>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}