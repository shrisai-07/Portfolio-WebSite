import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS, SOCIAL_LINKS } from '../utils/constants';

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-4 border-b-[3px] border-[#1a8fe3] transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* SK Monogram */}
      <a
        href="#"
        id="nav-logo"
        className="font-[Bangers] text-3xl text-[#1a8fe3] comic-outline tracking-wider hover:text-white transition-colors duration-200"
        style={{ WebkitTextStroke: '1.5px #000' }}
      >
        SK
      </a>

      {/* Nav Links & Socials Container */}
      <div className="flex items-center gap-6 md:gap-10">
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-6 md:gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              id={`nav-${item.toLowerCase()}`}
              className="font-[Bangers] text-lg tracking-wide text-[#f0f0f0] hover:text-[#1a8fe3] transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#1a8fe3] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-6 bg-[rgba(26,143,227,0.3)]" />

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f0f0f0] hover:text-[#1a8fe3] transition-colors duration-200"
            aria-label="GitHub"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f0f0f0] hover:text-[#1a8fe3] transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
