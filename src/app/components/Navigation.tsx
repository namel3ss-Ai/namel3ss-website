import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/images/namel3ss_horizontal_logo.svg';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform values for smooth transitions
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.8)']
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Studio', href: '#studio' },
    { name: 'Docs', href: 'https://github.com/namel3ss-Ai/namel3ss/blob/main/docs/learning-namel3ss.md' },
    { name: 'Community', href: '#community' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'border-b border-black/5 shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={logo} 
                alt="namel3ss" 
                className="h-8 w-auto"
              />
            </motion.a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }
                  }}
                  className="text-sm tracking-wide relative group py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  {...(link.href.startsWith('http') && {
                    target: '_blank',
                    rel: 'noopener noreferrer'
                  })}
                >
                  <span className="relative z-10 group-hover:opacity-60 transition-opacity">
                    {link.name}
                  </span>
                  
                  {/* Hover underline effect */}
                  <motion.span
                    className="absolute bottom-0 left-0 right-0 h-px bg-black"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {/* Desktop CTA Button */}
              <motion.a
                href="#get-started"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#get-started');
                }}
                className="hidden lg:block relative overflow-hidden px-5 py-2 rounded-full bg-black text-white text-sm tracking-wide group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="relative z-10">Get Started</span>
                
                {/* Shimmer effect on hover */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 hover:opacity-60 transition-opacity"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-[72px] left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  e.preventDefault();
                  handleNavClick(link.href);
                }
              }}
              className="text-lg tracking-wide py-3 hover:opacity-60 transition-opacity border-b border-black/5 last:border-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                x: isMobileMenuOpen ? 0 : -20
              }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              {...(link.href.startsWith('http') && {
                target: '_blank',
                rel: 'noopener noreferrer'
              })}
            >
              {link.name}
            </motion.a>
          ))}
          
          <motion.a
            href="#get-started"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#get-started');
            }}
            className="mt-2 px-6 py-3 rounded-full bg-black text-white text-center tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            Get Started
          </motion.a>
        </div>
      </motion.div>
    </>
  );
}