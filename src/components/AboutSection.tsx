import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import SoundEffect from './SoundEffect';

export default function AboutSection() {
  const [ref, isVisible] = useScrollSection(0.2);
  const [syncProgress, setSyncProgress] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateProgress(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateProgress(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const updateProgress = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      let newProgress = ((clientX - rect.left) / rect.width) * 100;
      newProgress = Math.max(0, Math.min(100, newProgress));
      setSyncProgress(newProgress);
    }
  };

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Sound effect */}
      <div className="absolute top-8 right-8 z-20">
        <SoundEffect text="ENROLLED!" color="#1a8fe3" rotation={-8} visible={isVisible} size="lg" />
      </div>

      {/* Comic page layout — 3 panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Panel 1 — Interactive Tracker */}
        <motion.div
          className="comic-border-thick bg-[#0a0a0a] p-6 min-h-[320px] relative overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Caption */}
          <div className="absolute top-3 left-3 bg-[#e8c840] px-3 py-1 z-10">
            <span className="font-[Bangers] text-black text-sm tracking-wide">
              YEAR 2 COMPLETED. THE GRIND CONTINUES.
            </span>
          </div>

          {/* Spider-Man 2099 Emblem */}
          <div className="flex-grow flex items-center justify-center relative mt-6">
            <motion.svg width="140" height="140" viewBox="0 0 100 100"
              className="drop-shadow-[0_0_15px_rgba(227,26,26,0.6)]"
              animate={{ scale: [1, 1.05, 1], y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <g fill="#e31a1a" fillRule="evenodd">
                {/* Right Half */}
                <path d="M 51,45 C 52,35 55,25 65,18 L 63,24 L 72,21 L 68,32 L 78,35 L 72,45 L 78,52 L 72,60 L 76,70 L 65,62 L 60,85 C 58,65 55,60 51,55 Z M 55,38 C 54,48 55,54 58,58 C 65,55 68,48 68,38 C 65,30 58,32 55,38 Z" />
                {/* Left Half */}
                <path d="M 49,45 C 48,35 45,25 35,18 L 37,24 L 28,21 L 32,32 L 22,35 L 28,45 L 22,52 L 28,60 L 24,70 L 35,62 L 40,85 C 42,65 45,60 49,55 Z M 45,38 C 46,48 45,54 42,58 C 35,55 32,48 32,38 C 35,30 42,32 45,38 Z" />
              </g>
            </motion.svg>
            
            <div className="absolute font-mono text-[10px] text-[#e31a1a] tracking-widest text-center mt-2 animate-pulse bg-black/50 px-1 z-20" style={{ top: '85%' }}>
              SYNC RATE: {Math.round(syncProgress)}%
            </div>
          </div>

          {/* Interactive Slider */}
          <div className="mt-auto pt-4">
            <div className="font-[Bangers] text-[#1a8fe3] text-lg tracking-widest mb-2">
              ACADEMIC SYNCHRONIZATION
            </div>
            
            <div 
              className="relative w-full h-8 bg-[#0d1117] border border-[#1a8fe3] overflow-visible cursor-pointer touch-none"
              style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
              ref={sliderRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Fill bar */}
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#1a8fe3]"
                style={{ width: `${syncProgress}%` }}
                initial={{ width: '0%' }}
                animate={isVisible && !isDragging ? { width: `${syncProgress}%` } : false}
                transition={{ duration: 1.2, ease: "circOut" }}
              >
                {/* Diagonal striping for texture */}
                <div className="w-full h-full" style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.2) 10px, rgba(0,0,0,0.2) 20px)'
                }} />
              </motion.div>
              
              {/* Slider Thumb / Marker */}
              <motion.div
                className="absolute top-[-4px] h-[40px] w-[4px] bg-white shadow-[0_0_10px_#fff] cursor-grab active:cursor-grabbing"
                style={{ left: `calc(${syncProgress}% - 2px)` }}
                initial={{ left: '0%' }}
                animate={isVisible && !isDragging ? { left: `calc(${syncProgress}% - 2px)` } : false}
                transition={{ duration: 1.2, ease: "circOut" }}
              />
            </div>

            <div className="flex justify-between font-mono text-[10px] text-[#8899aa] mt-2 px-1 uppercase">
              <span>[ Year 1 ]</span>
              <span>[ Year 2 ]</span>
              <span>[ Year 4 ]</span>
            </div>
          </div>
        </motion.div>

        {/* Panel 2 — About text as caption boxes */}
        <motion.div
          className="comic-border-thick bg-[#0a0a0a] p-6 flex flex-col gap-4 min-h-[320px]"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {[
            '2nd-year B.Tech student. Computer Science Engineering. VIT Bhopal University.',
            'Specializing in Cybersecurity & Digital Forensics — because someone has to understand how the system breaks before they can fix it.',
            'Learning the hard way: through courses, certifications, and the oldest method known to hackers — making things, breaking things, and figuring it out on the way.',
          ].map((text, i) => (
            <motion.div
              key={i}
              className="bg-[#e8c840] p-3 text-black text-sm md:text-base leading-relaxed font-medium"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%)',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              {text}
            </motion.div>
          ))}
        </motion.div>

        {/* Panel 3 — Stats readout */}
        <motion.div
          className="comic-border-thick bg-[#0a0a0a] p-6 min-h-[320px] halftone-bg"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="font-[Bangers] text-[#1a8fe3] text-lg tracking-wider mb-4">
            HOLOGRAPHIC READOUT
          </div>
          {[
            { label: 'UNIVERSITY', value: 'VIT Bhopal' },
            { label: 'YEAR', value: '2nd Year' },
            { label: 'DEGREE', value: 'B.Tech CSE' },
            { label: 'SPECIALIZATION', value: 'Cybersecurity & Digital Forensics' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="mb-3 border border-[rgba(26,143,227,0.3)] p-3 holo-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="text-xs font-mono text-[#8899aa] tracking-widest">{stat.label}</div>
              <div className="text-[#1a8fe3] font-[Bangers] text-lg tracking-wide mt-1">{stat.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
