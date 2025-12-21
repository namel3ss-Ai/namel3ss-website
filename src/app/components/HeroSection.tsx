import { motion } from "motion/react";

export function HeroSection() {
  const scrollToLanguage = () => {
    const horizontalSection = document.querySelector('[data-section="horizontal-story"]');
    if (horizontalSection) {
      horizontalSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-6 md:px-12" data-section="hero">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-[80px] md:text-[120px] tracking-tight mb-8">
            Amplifying creativity.
          </h1>
          <p className="text-[24px] md:text-[32px] text-black/60 max-w-3xl mx-auto mb-20 leading-relaxed">
            Write software the way you think.
            <br />
            Turn intent into product.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <button 
              onClick={scrollToLanguage}
              className="px-12 py-[14px] bg-black text-white text-[15px] tracking-[-0.015em] transition-all duration-200 hover:bg-black/85 cursor-pointer rounded-xl"
            >
              Read the language
            </button>
            <a 
              href="https://github.com/namel3ss-Ai/namel3ss" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-12 py-[14px] bg-white text-black border border-black/90 text-[15px] tracking-[-0.015em] transition-all duration-200 hover:border-black hover:bg-black/[0.03] cursor-pointer inline-block rounded-xl"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}