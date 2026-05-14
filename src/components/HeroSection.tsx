import { motion } from 'framer-motion';
import ThreatLevelWidget from './ThreatLevelWidget';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center halftone-bg overflow-hidden pt-20"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center lg:items-center gap-8">
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

          {/* Identity Info - 2099 Vibe */}
          <motion.div
            className="mt-6 p-5 relative overflow-hidden bg-[rgba(10,10,10,0.8)] border border-[#222] shadow-[0_0_20px_rgba(26,143,227,0.15)] font-[Bangers] text-xl md:text-2xl tracking-widest"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Holographic Scanlines Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-10" 
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #1a8fe3 2px, #1a8fe3 4px)' }} 
            />
            
            <div className="relative z-10 flex flex-col gap-3 leading-none">
              {[
                { label: 'OPERATIVE', value: 'SHRISAI KOLKONDI', color: 'text-[#1a8fe3] drop-shadow-[0_0_5px_rgba(26,143,227,0.4)]' },
                { label: 'AFFILIATION', value: 'VIT BHOPAL UNIVERSITY', color: 'text-[#1a8fe3]' },
                { label: 'EXPIRES', value: 'XX/XX/XX28', color: 'text-[#8899aa]' },
                { label: 'SPECIALIZATION', value: 'CYBERSECURITY & DIGITAL FORENSICS', color: 'text-[#1a8fe3]' },
                { label: 'CLEARANCE', value: 'LEVEL MAX', color: 'text-[#e31a1a] drop-shadow-[0_0_8px_rgba(227,26,26,0.6)]' },
                { label: 'STATUS', value: 'ACTIVE ANOMALY', color: 'text-[#e31a1a] misregister', isGlitch: true },
                { label: 'THREAT RATING', value: 'UNUSUAL, CHECK ON THREAT TRACKER!', color: 'text-[#e31a1a] animate-pulse' },
              ].map((line, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:gap-4 items-baseline">
                  <span className="text-[#667788] text-lg sm:text-xl sm:w-[150px] shrink-0">
                    {line.label}
                  </span>
                  <span 
                    className={`${line.color} ${line.isGlitch ? 'relative inline-block' : ''}`}
                    data-text={line.value}
                  >
                    {line.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* Right Column — 45% */}
        <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-end justify-end mt-12 lg:mt-0 lg:pr-10">
          <div className="flex flex-col items-center gap-16">
            {/* Emblem */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img
                src="/spidey.jpg"
                alt="2099 Emblem"
                className="w-[150px] h-[150px] md:w-[480px] md:h-[580px] object-contain"
                style={{
                  filter: 'brightness(0.7) contrast(1.1) drop-shadow(0 0 10px rgba(255, 255, 255, 0.25))',
                  maskImage: 'radial-gradient(ellipse 55% 55% at center, black 30%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 55% 55% at center, black 30%, transparent 75%)',
                }}
              />
            </motion.div>

            {/* Threat Level */}
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
