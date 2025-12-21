import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FinalSection() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const scrollToLanguage = () => {
    const element = document.querySelector('[data-section="horizontal-story"]');
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!containerRef.current || !horizontalRef.current) return;

    const container = containerRef.current;
    const horizontal = horizontalRef.current;

    // Check if mobile device
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.to(horizontal, {
        x: "-100vw",
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: isMobile ? "+=150vh" : "+=200vh",
          scrub: isMobile ? 1 : 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Ensure smooth scrolling on mobile
            if (isMobile) {
              horizontal.style.willChange = "transform";
            }
          }
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen bg-black overflow-hidden" data-section="final">
      {/* Horizontal sliding container */}
      <div 
        ref={horizontalRef}
        className="fixed top-0 left-0 w-[200vw] h-screen flex touch-none"
        style={{ touchAction: "none" }}
      >
        {/* First Panel - "One more thing" + buttons */}
        <div className="w-screen h-screen bg-black flex items-center justify-center px-4 sm:px-6 md:px-12 flex-shrink-0 overflow-y-auto">
          <div className="max-w-[900px] w-full text-center py-8 sm:py-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] text-white/32 mb-6 sm:mb-8 md:mb-12 lg:mb-16 tracking-[0.08em] uppercase font-medium">
                One more thing
              </p>
              
              <h2 className="text-[28px] xs:text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] xl:text-[72px] 2xl:text-[88px] tracking-[-0.042em] leading-[1.15] sm:leading-[1.1] md:leading-[1] text-white mb-3 sm:mb-4 md:mb-6 font-semibold px-2">
                namel3ss isn't just code.
              </h2>
              
              <p className="text-[28px] xs:text-[32px] sm:text-[40px] md:text-[48px] lg:text-[64px] xl:text-[72px] 2xl:text-[88px] tracking-[-0.042em] leading-[1.15] sm:leading-[1.1] md:leading-[1] text-white mb-8 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24 font-semibold px-2">
                It's a new way to build.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-6 sm:pt-8 md:pt-12 lg:pt-16 px-4">
                <a
                  href="https://github.com/namel3ss-Ai/namel3ss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-white text-black text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] tracking-[-0.01em] font-medium rounded-full transition-opacity duration-200 hover:opacity-90 active:opacity-75 w-full sm:w-auto"
                >
                  View on GitHub
                </a>
                <button
                  onClick={scrollToLanguage}
                  className="px-6 sm:px-8 md:px-10 lg:px-12 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-black text-white border border-white text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] tracking-[-0.01em] font-medium rounded-full transition-opacity duration-200 hover:opacity-80 active:opacity-70 w-full sm:w-auto"
                >
                  Read the language
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Second Panel - Final screen with just "namel3ss" */}
        <div className="w-screen h-screen bg-black flex items-center justify-center flex-shrink-0 px-4 sm:px-6 md:px-8">
          <h1 className="text-[48px] xs:text-[56px] sm:text-[72px] md:text-[96px] lg:text-[120px] xl:text-[160px] 2xl:text-[200px] 3xl:text-[280px] tracking-[-0.05em] leading-[0.9] text-white font-bold break-words text-center">
            namel3ss
          </h1>
        </div>
      </div>
    </div>
  );
}