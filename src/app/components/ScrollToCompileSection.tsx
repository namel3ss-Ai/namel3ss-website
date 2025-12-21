import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import uiPreviewImage from "../../assets/313b83d4166f003176fd9443de339bdc8af0cf63.png";

gsap.registerPlugin(ScrollTrigger);

export function ScrollToCompileSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const codeLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current || 
        !codeRef.current || !uiRef.current) {
      return;
    }

    // Store ref values for cleanup
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const headline = headlineRef.current;
      const code = codeRef.current;
      const ui = uiRef.current;
      const codeLines = codeLinesRef.current;
      const cursor = cursorRef.current;

      if (!headline || !code || !ui) return;

      // Entrance animations
      gsap.from(headline, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%"
        }
      });

      // Pin section and create scroll-driven compilation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          scrub: 1.5,
          pin: true
        }
      });

      // Stage 1: Show code window with 3D effect
      tl.fromTo(code,
        { opacity: 0, x: -80, scale: 0.92, rotateY: 8 },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 0.4, ease: "power2.out" },
        0
      );

      // Stage 2: Code lines appear sequentially with cursor movement
      codeLines.forEach((line, i) => {
        if (line) {
          tl.fromTo(line,
            { opacity: 0, x: -10 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.12,
              ease: "power2.out"
            },
            0.3 + (i * 0.09)
          );
          
          // Cursor moves to end of line
          if (cursor && i < codeLines.length - 1) {
            tl.set(cursor, {
              x: 0,
              y: i * 32 // Approximate line height
            }, 0.3 + (i * 0.09) + 0.08);
          }
          
          // Subtle highlight pulse on code line
          tl.to(line,
            { 
              backgroundColor: "rgba(0, 0, 0, 0.03)",
              duration: 0.08,
              ease: "power2.out"
            },
            0.3 + (i * 0.09)
          );
          
          tl.to(line,
            { 
              backgroundColor: "rgba(0, 0, 0, 0)",
              duration: 0.12,
              ease: "power2.in"
            },
            0.38 + (i * 0.09)
          );
        }
      });

      // Show and hide cursor
      if (cursor) {
        tl.set(cursor, { opacity: 1 }, 0.3);
        tl.to(cursor, { opacity: 0, duration: 0.2 }, 1.2);
      }

      // Stage 5: UI appears with 3D effect
      tl.fromTo(ui,
        { opacity: 0, x: 80, scale: 0.92, rotateY: -8 },
        { opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 0.4, ease: "power2.out" },
        1.5
      );

      // Stage 7: Both settle closer with magnetic effect
      tl.to(code,
        { x: "12%", rotateY: -3, duration: 0.5, ease: "power2.inOut" },
        1.9
      );

      tl.to(ui,
        { x: "-12%", rotateY: 3, duration: 0.5, ease: "power2.inOut" },
        1.9
      );

      // Stage 8: Code fades with depth, UI dominates
      tl.to(code,
        { 
          opacity: 0.08, 
          scale: 0.88, 
          rotateY: -5,
          filter: "blur(3px)", 
          duration: 0.6, 
          ease: "power2.in" 
        },
        2.4
      );

      tl.to(ui,
        { scale: 1.15, rotateY: 0, duration: 0.6, ease: "power2.in" },
        2.4
      );

      // Stage 9: Background transition
      tl.to(section,
        { backgroundColor: "#0a0a0a", duration: 0.7, ease: "power2.inOut" },
        2.8
      );

      // Stage 10: Headline fades
      tl.to(headline,
        { opacity: 0, y: -50, duration: 0.5, ease: "power2.in" },
        2.9
      );

      // Stage 11: Final exit
      tl.to([code, ui],
        { y: -140, opacity: 0, scale: 0.9, duration: 0.6, ease: "power2.in" },
        3.3
      );

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-white z-10">
      <div className="relative h-screen flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="relative max-w-[1700px] mx-auto w-full">
          
          {/* Headline - More dramatic */}
          <h2 
            ref={headlineRef}
            className="absolute top-0 left-0 right-0 text-center text-[72px] md:text-[88px] tracking-[-0.04em] leading-[1] text-black/[0.15] font-light"
          >
            Code becomes interface.
          </h2>

          {/* Background glow effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black/[0.01] rounded-full blur-3xl" />
          </div>

          {/* Transformation Composition */}
          <div className="relative flex items-center justify-center gap-20 pt-28" style={{ perspective: '2000px' }}>
            
            {/* Code - Enhanced depth */}
            <div 
              ref={codeRef}
              className="w-[440px] opacity-0 relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow behind window */}
              <div className="absolute inset-0 bg-white/[0.04] blur-2xl rounded-[10px] scale-110" />
              
              {/* macOS window chrome */}
              <div className="relative bg-[#f9f9f9] rounded-[11px] overflow-hidden shadow-[0_8px_50px_rgba(0,0,0,0.08),0_2px_16px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.08)] border border-black/[0.05]">
                {/* Traffic lights */}
                <div className="flex items-center gap-2 px-4 py-3.5 border-b border-black/[0.06] bg-gradient-to-b from-white/80 to-white/40">
                  <div className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] shadow-[0_1px_2px_rgba(0,0,0,0.15)]"></div>
                  <div className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e] shadow-[0_1px_2px_rgba(0,0,0,0.15)]"></div>
                  <div className="w-[11px] h-[11px] rounded-full bg-[#28c840] shadow-[0_1px_2px_rgba(0,0,0,0.15)]"></div>
                </div>
                
                {/* Code content */}
                <div className="px-6 py-7 bg-[#fafafa] relative">
                  <pre className="font-mono text-[13px] leading-[2.6] tracking-tight relative">
                    <span ref={el => codeLinesRef.current[0] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      <span className="text-black/40">app is</span> <span className="text-[#c41a16]">"tasks-app"</span><span className="text-black/40">:</span>
                    </span>
                    <span className="block px-2">
                      {'  '}<span className="text-black/30">entry_page is "task"</span>
                    </span>
                    <span className="block">{'\u00A0'}</span>
                    <span ref={el => codeLinesRef.current[1] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      <span className="text-black/40">state:</span>
                    </span>
                    <span ref={el => codeLinesRef.current[2] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      {'  '}<span className="text-black/40">title is</span> <span className="text-[#c41a16]">"Design system review"</span>
                    </span>
                    <span ref={el => codeLinesRef.current[3] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      {'  '}<span className="text-black/40">status is</span> <span className="text-[#c41a16]">"In progress"</span>
                    </span>
                    <span className="block">{'\u00A0'}</span>
                    <span ref={el => codeLinesRef.current[4] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      <span className="text-black/40">page is</span> <span className="text-[#c41a16]">"task"</span> <span className="text-black/40">at</span> <span className="text-[#c41a16]">"/"</span><span className="text-black/40">:</span>
                    </span>
                    <span className="block px-2">
                      {'  '}<span className="text-black/30">section is "main":</span>
                    </span>
                    <span ref={el => codeLinesRef.current[5] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      {'    '}<span className="text-black/40">text is</span> <span className="text-black/50">state.title</span>
                    </span>
                    <span ref={el => codeLinesRef.current[6] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      {'    '}<span className="text-black/40">badge is</span> <span className="text-black/50">state.status</span>
                    </span>
                    <span ref={el => codeLinesRef.current[7] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      {'    '}<span className="text-black/40">button is</span> <span className="text-[#c41a16]">"Summarize"</span>
                    </span>
                    <span ref={el => codeLinesRef.current[8] = el} className="block opacity-0 px-2 py-0.5 -mx-2 rounded transition-all">
                      {'    '}<span className="text-black/40">button is</span> <span className="text-[#c41a16]">"Delete"</span>
                    </span>
                  </pre>
                  
                  {/* Typing cursor */}
                  <span 
                    ref={cursorRef}
                    className="absolute w-[2px] h-[17px] bg-black/60 pointer-events-none opacity-0"
                    style={{ left: '24px', top: '28px' }}
                  />
                </div>
              </div>
            </div>

            {/* Interface - Beautiful screenshot preview */}
            <div 
              ref={uiRef}
              className="w-[540px] opacity-0 relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow behind UI */}
              <div className="absolute inset-0 bg-black/[0.02] blur-3xl rounded-[24px] scale-110" />
              
              {/* Rendered screenshot with subtle frame */}
              <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-b from-[#fafafa] to-[#f5f5f5] p-12 shadow-[0_12px_60px_rgba(0,0,0,0.08),0_4px_20px_rgba(0,0,0,0.04),0_0_1px_rgba(0,0,0,0.06)]">
                <img 
                  src={uiPreviewImage} 
                  alt="Compiled interface preview"
                  className="w-full h-auto rounded-[4px]"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}