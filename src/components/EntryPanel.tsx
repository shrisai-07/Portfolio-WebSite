import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryPanelProps {
  onComplete: () => void;
}

// SVG cityscape for the 2099 panel
function Cityscape() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#0d1b2a" />
        </linearGradient>
        <linearGradient id="buildingGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a8fe3" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1a8fe3" stopOpacity="0" />
        </linearGradient>
        {/* Halftone pattern */}
        <pattern id="dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.8" fill="rgba(26,143,227,0.12)" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="400" height="280" fill="url(#skyGrad)" />
      <rect width="400" height="280" fill="url(#dots)" />

      {/* Buildings — angular 2099 architecture */}
      <polygon points="20,280 20,90 35,80 50,90 50,280" fill="#0d1117" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.8" />
      <polygon points="45,280 45,60 55,50 65,45 75,55 75,280" fill="#0a0e14" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.9" />
      <polygon points="70,280 70,100 85,95 100,100 100,280" fill="#0d1117" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.7" />
      <polygon points="95,280 95,40 105,30 120,25 130,35 130,280" fill="#080c12" stroke="#1a8fe3" strokeWidth="0.6" opacity="1" />
      <polygon points="128,280 128,70 140,60 155,65 155,280" fill="#0d1117" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.8" />
      <polygon points="152,280 152,50 165,35 180,30 190,40 190,280" fill="#0a0e14" stroke="#1a8fe3" strokeWidth="0.6" opacity="0.9" />
      <polygon points="188,280 188,80 200,75 215,80 215,280" fill="#0d1117" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.7" />
      <polygon points="212,280 212,45 225,30 240,35 240,280" fill="#080c12" stroke="#1a8fe3" strokeWidth="0.6" opacity="1" />
      <polygon points="238,280 238,90 250,85 265,90 265,280" fill="#0d1117" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.8" />
      <polygon points="262,280 262,55 275,40 290,45 290,280" fill="#0a0e14" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.9" />
      <polygon points="288,280 288,75 300,70 315,75 315,280" fill="#0d1117" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.7" />
      <polygon points="313,280 313,35 325,20 340,25 350,35 350,280" fill="#080c12" stroke="#1a8fe3" strokeWidth="0.6" opacity="1" />
      <polygon points="348,280 348,85 360,80 375,85 375,280" fill="#0d1117" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.8" />

      {/* Window lights — small blue rectangles */}
      {[
        [55, 65], [57, 75], [63, 55], [61, 85],
        [100, 45], [104, 60], [108, 38], [112, 70], [116, 50],
        [135, 75], [140, 90], [145, 80],
        [160, 50], [165, 65], [170, 42], [175, 75], [180, 55],
        [195, 90], [200, 100], [205, 85],
        [220, 55], [225, 70], [230, 50], [235, 80],
        [270, 55], [275, 70], [280, 50],
        [320, 35], [325, 50], [330, 30], [335, 60], [340, 42],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="3"
          height="4"
          fill="#1a8fe3"
          opacity={0.3 + Math.random() * 0.5}
        />
      ))}

      {/* Ground line */}
      <line x1="0" y1="260" x2="400" y2="260" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.4" />

      {/* Playing card on the ground — Gambit easter egg */}
      <g transform="translate(195, 245) rotate(-12)">
        {/* Card body */}
        <rect x="0" y="0" width="18" height="26" rx="1.5" fill="#f0f0f0" stroke="#333" strokeWidth="0.5" />
        {/* Card inner border */}
        <rect x="2" y="3" width="14" height="20" rx="0.5" fill="none" stroke="#7F77DD" strokeWidth="0.3" opacity="0.6" />
        {/* Spade symbol */}
        <path d="M9,7 C9,7 5,11 5,13 C5,14.5 6.5,15.5 8,14.5 L7,18 L11,18 L10,14.5 C11.5,15.5 13,14.5 13,13 C13,11 9,7 9,7Z" fill="#7F77DD" opacity="0.7" />
        {/* A corner */}
        <text x="3.5" y="6" fontSize="4" fill="#7F77DD" fontWeight="bold" opacity="0.7">A</text>
        {/* Purple glow */}
        <ellipse cx="9" cy="13" rx="14" ry="14" fill="#7F77DD" opacity="0.04" />
      </g>
    </svg>
  );
}

// Generate shard polygons for the shatter effect
function generateShards(count: number) {
  const shards: { id: number; clipPath: string; x: number; y: number; rotate: number }[] = [];
  const cols = 4;
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const cellW = 100 / cols;
    const cellH = 100 / rows;

    const x1 = col * cellW + Math.random() * 5;
    const y1 = row * cellH + Math.random() * 5;
    const x2 = (col + 1) * cellW - Math.random() * 5;
    const y2 = row * cellH + Math.random() * 5;
    const x3 = (col + 1) * cellW - Math.random() * 5;
    const y3 = (row + 1) * cellH - Math.random() * 5;
    const x4 = col * cellW + Math.random() * 5;
    const y4 = (row + 1) * cellH - Math.random() * 5;

    const centerX = (x1 + x2 + x3 + x4) / 4 - 50;
    const centerY = (y1 + y2 + y3 + y4) / 4 - 50;
    const angle = Math.atan2(centerY, centerX);
    const dist = 800 + Math.random() * 600;

    shards.push({
      id: i,
      clipPath: `polygon(${x1}% ${y1}%, ${x2}% ${y2}%, ${x3}% ${y3}%, ${x4}% ${y4}%)`,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      rotate: (Math.random() - 0.5) * 720,
    });
  }
  return shards;
}

export default function EntryPanel({ onComplete }: EntryPanelProps) {
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'shattering' | 'done'>('idle');
  const shards = generateShards(16);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'idle') triggerShatter();
    }, 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  const triggerShatter = () => {
    setPhase('cracking');
    setTimeout(() => setPhase('shattering'), 300);
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] cursor-pointer"
          onClick={() => phase === 'idle' && triggerShatter()}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Pre-shatter: intact panel */}
          {(phase === 'idle' || phase === 'cracking') && (
            <motion.div
              className="relative comic-border-thick"
              style={{ width: 'min(90vw, 420px)', height: 'min(65vw, 295px)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Cityscape />

              {/* Crack lines overlay */}
              {phase === 'cracking' && (
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 280"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="200" y1="140" x2="50" y2="20" stroke="white" strokeWidth="1.5" opacity="0.8" />
                  <line x1="200" y1="140" x2="350" y2="30" stroke="white" strokeWidth="1.2" opacity="0.7" />
                  <line x1="200" y1="140" x2="380" y2="200" stroke="white" strokeWidth="1.5" opacity="0.8" />
                  <line x1="200" y1="140" x2="30" y2="250" stroke="white" strokeWidth="1.3" opacity="0.7" />
                  <line x1="200" y1="140" x2="100" y2="5" stroke="white" strokeWidth="1" opacity="0.6" />
                  <line x1="200" y1="140" x2="320" y2="270" stroke="white" strokeWidth="1" opacity="0.6" />
                  <line x1="200" y1="140" x2="10" y2="130" stroke="white" strokeWidth="1.2" opacity="0.7" />
                  <line x1="200" y1="140" x2="390" y2="100" stroke="white" strokeWidth="1.1" opacity="0.65" />
                </motion.svg>
              )}

              {/* Click hint */}
              {phase === 'idle' && (
                <motion.div
                  className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-xs font-mono text-[#8899aa]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  [ CLICK TO BREACH ]
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Post-crack: shattering shards */}
          {phase === 'shattering' && (
            <div className="relative" style={{ width: 'min(90vw, 420px)', height: 'min(65vw, 295px)' }}>
              {shards.map((shard) => (
                <motion.div
                  key={shard.id}
                  className="absolute inset-0 comic-border-thick overflow-hidden"
                  style={{ clipPath: shard.clipPath }}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                  animate={{
                    x: shard.x,
                    y: shard.y,
                    rotate: shard.rotate,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <Cityscape />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
