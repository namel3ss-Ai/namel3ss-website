import { useEffect, useRef } from "react";
import { Linkedin, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SocialLinks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !railRef.current || !iconsRef.current) return;

    const container = containerRef.current;
    const rail = railRef.current;
    const icons = iconsRef.current;

    const ctx = gsap.context(() => {
      const heroSection = document.querySelector("[data-section='hero']");
      const finalSection = document.querySelector("[data-section='final']");
      
      if (!heroSection || !finalSection) return;

      // Initial state
      gsap.set([rail, icons], { opacity: 0, x: 40 });

      // Fade in after hero section
      gsap.to([rail, icons], {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroSection,
          start: "bottom 60%",
          toggleActions: "play none none none"
        }
      });

      // Fade out before final section
      gsap.to(container, {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: finalSection,
          start: "top bottom",
          end: "top 70%",
          scrub: true
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-50"
    >
      {/* Vertical rail/track */}
      <div
        ref={railRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-black/[0.08]"
      />

      {/* Icon container */}
      <div
        ref={iconsRef}
        className="relative flex flex-col items-center gap-12"
      >
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/namel3ss/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-black/[0.06] bg-white hover:border-black/[0.12] transition-all duration-500"
          aria-label="LinkedIn"
        >
          <Linkedin 
            size={18} 
            strokeWidth={1.5} 
            className="text-black/30 group-hover:text-black/60 group-hover:scale-110 transition-all duration-500" 
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
            <div className="bg-black text-white px-3 py-1.5 rounded-md whitespace-nowrap text-xs tracking-tight">
              LinkedIn
            </div>
          </div>
        </a>

        {/* Discord */}
        <a
          href="https://discord.gg/x8s6aEwdU"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-black/[0.06] bg-white hover:border-black/[0.12] transition-all duration-500"
          aria-label="Discord"
        >
          <MessageSquare 
            size={18} 
            strokeWidth={1.5} 
            className="text-black/30 group-hover:text-black/60 group-hover:scale-110 transition-all duration-500" 
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
            <div className="bg-black text-white px-3 py-1.5 rounded-md whitespace-nowrap text-xs tracking-tight">
              Discord
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}