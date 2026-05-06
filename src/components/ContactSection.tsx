import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import SoundEffect from './SoundEffect';
import { SOCIAL_LINKS } from '../utils/constants';

export default function ContactSection() {
  const [ref, isVisible] = useScrollSection(0.2);
  const [showSent, setShowSent] = useState(false);
  const [formData, setFormData] = useState({ sender: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSent(true);
    setTimeout(() => setShowSent(false), 2000);
    setFormData({ sender: '', message: '' });
  };

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="comic-border-thick bg-[#0a0a0a] p-10 md:p-14 max-w-3xl mx-auto relative">
        <div className="absolute top-4 right-6 z-20">
          <SoundEffect text="SENT!" color="#1a8fe3" rotation={-10} visible={showSent} size="lg" />
        </div>

        <motion.h2
          className="font-[Bangers] text-3xl md:text-4xl text-[#1a8fe3] tracking-wider mb-2"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          OPEN CHANNEL ENCRYPTED
        </motion.h2>
        <motion.p
          className="font-mono text-xs text-[#8899aa] mb-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          Transmissions are end-to-end secured. Identity verified.
        </motion.p>

        <form onSubmit={handleSubmit}>
          <motion.div className="mb-4" initial={{ opacity: 0, x: -20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <label className="font-mono text-sm text-[#8899aa] mb-2 block">{'>'} SENDER ID :</label>
            <input id="contact-sender" type="text" value={formData.sender} onChange={(e) => setFormData({ ...formData, sender: e.target.value })} required className="w-full bg-[rgba(10,10,10,0.8)] border border-[rgba(26,143,227,0.3)] p-3 font-mono text-[#f0f0f0] text-sm focus:border-[#1a8fe3] focus:outline-none transition-colors caret-[#1a8fe3]" placeholder="whateveryourmail@gmail.com" />
          </motion.div>

          <motion.div className="mb-6" initial={{ opacity: 0, x: -20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}>
            <label className="font-mono text-sm text-[#8899aa] mb-2 block">{'>'} MESSAGE PAYLOAD :</label>
            <textarea id="contact-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={4} className="w-full bg-[rgba(10,10,10,0.8)] border border-[rgba(26,143,227,0.3)] p-3 font-mono text-[#f0f0f0] text-sm focus:border-[#1a8fe3] focus:outline-none transition-colors resize-none caret-[#1a8fe3]" placeholder="Transmit your message..." />
          </motion.div>

          <motion.button id="contact-submit" type="submit" className="font-[Bangers] text-xl tracking-wider bg-[#1a8fe3] text-white px-8 py-3 border-[3px] border-black hover:bg-[#1570b5] transition-colors duration-200" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)' }} initial={{ opacity: 0, y: 10 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} whileTap={{ scale: 0.95 }}>
            TRANSMIT
          </motion.button>
        </form>

        <motion.div className="flex gap-4 mt-8 pt-6 border-t border-[rgba(26,143,227,0.15)]" initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" id="social-github" className="flex items-center gap-2 px-4 py-2 border-2 border-[#333] bg-[rgba(10,10,10,0.8)] font-mono text-sm text-[#f0f0f0] hover:border-[#1a8fe3] hover:text-[#1a8fe3] transition-all duration-200" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" id="social-linkedin" className="flex items-center gap-2 px-4 py-2 border-2 border-[#333] bg-[rgba(10,10,10,0.8)] font-mono text-sm text-[#f0f0f0] hover:border-[#1a8fe3] hover:text-[#1a8fe3] transition-all duration-200" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
