import { motion } from 'framer-motion';
import DossierBlock from './DossierBlock';
import ThreatLevelWidget from './ThreatLevelWidget';
import BoStaffLines from './BoStaffLines';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center halftone-bg overflow-hidden pt-20"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center gap-8">
        {/* Left Column — 60% */}
        <div className="w-full lg:w-[60%]">
          {/* Name */}
          <motion.h1
            className="font-[Bangers] text-[clamp(3rem,8vw,7rem)] leading-[0.95] text-[#1a8fe3] comic-outline tracking-wide misregister"
            data-text="SHRISAI KOLKONDI"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            SHRISAI
            <br />
            KOLKONDI
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

          {/* Threat Level */}
          <ThreatLevelWidget />
        </div>

        {/* Right Column — 40% */}
        <div className="w-full lg:w-[40%] h-[50vh] lg:h-[70vh]">
          <BoStaffLines />
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
