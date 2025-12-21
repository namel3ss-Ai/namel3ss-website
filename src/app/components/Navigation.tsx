import { motion, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 60);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.querySelector(`[data-section="${sectionId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.08]" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-[72px]">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <img 
              src="/namel3ss_horizontal_logo.svg" 
              alt="namel3ss" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection("horizontal-story")}
              className="text-[15px] tracking-[-0.01em] text-black/72 hover:text-black transition-colors duration-200 cursor-pointer"
            >
              Language
            </button>
            <button
              onClick={() => scrollToSection("outcomes")}
              className="text-[15px] tracking-[-0.01em] text-black/72 hover:text-black transition-colors duration-200 cursor-pointer"
            >
              What you can build
            </button>
            <Link
              to="/docs"
              className="text-[15px] tracking-[-0.01em] text-black/72 hover:text-black transition-colors duration-200"
            >
              Docs
            </Link>
          </div>

          {/* CTA Button */}
          <a
            href="https://github.com/namel3ss-Ai/namel3ss"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block px-6 py-2 bg-black text-white text-[14px] tracking-[-0.01em] rounded-full hover:bg-black/85 transition-all duration-200 cursor-pointer"
          >
            GitHub
          </a>

          {/* Mobile Menu Icon */}
          <button className="md:hidden w-6 h-6 flex flex-col justify-center gap-1.5 cursor-pointer group">
            <span className="w-full h-[1.5px] bg-black transition-all duration-200 group-hover:bg-black/60"></span>
            <span className="w-full h-[1.5px] bg-black transition-all duration-200 group-hover:bg-black/60"></span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}