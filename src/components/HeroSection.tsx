import { motion } from 'framer-motion';
import DossierBlock from './DossierBlock';
import BoStaffLines from './BoStaffLines';
import ThreatLevelWidget from './ThreatLevelWidget';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center halftone-bg overflow-hidden pt-20"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
        {/* Left Column */}
        <div className="w-full lg:w-[55%] relative" style={{ transform: 'translateX(50px)' }}>
          {/* Intentional Red Glitch Watermark (Restored) */}
          <div 
            className="absolute top-[1px] left-[4px] font-[Bangers] text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-[rgba(227,26,26,0.15)] whitespace-nowrap pointer-events-none -z-10"
          >
            SHRISAI KOLKONDI
          </div>

          {/* Name */}
          <motion.h1
            className="font-[Bangers] text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-[#1a8fe3] comic-outline tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="misregister inline-block" data-text="SHRISAI">SHRISAI</div>
            <br />
            <div className="misregister inline-block" data-text="KOLKONDI">KOLKONDI</div>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="font-[Bangers] text-xl md:text-2xl text-[#f0f0f0] tracking-wider">
              Cybersecurity Enthusiast
            </span>
          </motion.div>

          {/* Laser tripwire line */}
          <motion.div
            className="laser-line mt-3 w-full max-w-md"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Dossier */}
          <DossierBlock />
        </div>

        {/* Right Column — 45% */}
        <div className="w-full lg:w-[45%] flex flex-col items-end gap-12 mt-12 lg:mt-0">
          <div className="w-full h-[40vh] lg:h-[60vh]">
            <BoStaffLines />
          </div>
          
          {/* Threat Level repositioned below BoStaffLines */}
          <div className="pr-10 lg:pr-20">
            <ThreatLevelWidget />
          </div>
        </div>
      </div>

      {/* Bottom center — blinking cursor */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-2xl text-[rgba(26,143,227,0.5)] terminal-cursor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        _
      </motion.div>
    </section>
  );
}
