import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryPanelProps {
  onComplete: () => void;
}

// SVG cityscape for the 2099 panel
function Cityscape() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#0d1b2a" />
        </linearGradient>
        <linearGradient id="buildingGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a8fe3" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1a8fe3" stopOpacity="0" />
        </linearGradient>
        <pattern id="dots" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.8" fill="rgba(26,143,227,0.12)" />
        </pattern>
      </defs>

      <rect width="400" height="280" fill="url(#skyGrad)" />
      <rect width="400" height="280" fill="url(#dots)" />

      {/* Buildings */}
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

      {/* Window lights */}
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
        <rect key={i} x={x} y={y} width="3" height="4" fill="#1a8fe3" opacity={0.3 + Math.random() * 0.5} />
      ))}

      {/* Ground line */}
      <line x1="0" y1="260" x2="400" y2="260" stroke="#1a8fe3" strokeWidth="0.5" opacity="0.4" />

      {/* Playing card on the ground — Gambit easter egg */}
      <g transform="translate(195, 245) rotate(-12)">
        <rect x="0" y="0" width="18" height="26" rx="1.5" fill="#f0f0f0" stroke="#333" strokeWidth="0.5" />
        <rect x="2" y="3" width="14" height="20" rx="0.5" fill="none" stroke="#7F77DD" strokeWidth="0.3" opacity="0.6" />
        <path d="M9,7 C9,7 5,11 5,13 C5,14.5 6.5,15.5 8,14.5 L7,18 L11,18 L10,14.5 C11.5,15.5 13,14.5 13,13 C13,11 9,7 9,7Z" fill="#7F77DD" opacity="0.7" />
        <text x="3.5" y="6" fontSize="4" fill="#7F77DD" fontWeight="bold" opacity="0.7">A</text>
        <ellipse cx="9" cy="13" rx="14" ry="14" fill="#7F77DD" opacity="0.04" />
      </g>
    </svg>
  );
}

export default function EntryPanel({ onComplete }: EntryPanelProps) {
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'tearing' | 'done'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === 'idle') triggerTear();
    }, 1500);
    return () => clearTimeout(timer);
  }, [phase]);

  const triggerTear = () => {
    setPhase('cracking');
    setTimeout(() => setPhase('tearing'), 400);
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 1400);
  };

  const panelW = 'min(90vw, 420px)';
  const panelH = 'min(65vw, 295px)';

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] cursor-pointer"
          onClick={() => phase === 'idle' && triggerTear()}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* ---- Dimensional Rift (behind the panel) ---- */}
          {phase === 'tearing' && (
            <motion.div
              className="absolute"
              style={{ width: panelW, height: panelH }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Red rift glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="absolute"
                  style={{
                    width: '4px',
                    height: '120%',
                    background: 'linear-gradient(180deg, transparent 0%, #e31a1a 20%, #ff3333 50%, #e31a1a 80%, transparent 100%)',
                    boxShadow: '0 0 40px 15px rgba(227,26,26,0.6), 0 0 80px 30px rgba(227,26,26,0.3), 0 0 120px 50px rgba(227,26,26,0.15)',
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: [0, 1, 1, 0.8] }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                {/* Rift energy sparks */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      width: '2px',
                      height: `${20 + Math.random() * 30}%`,
                      background: `linear-gradient(180deg, transparent, ${i % 2 === 0 ? '#ff4444' : '#ff8800'}, transparent)`,
                      left: '50%',
                      top: `${10 + i * 14}%`,
                      transform: `translateX(${(Math.random() - 0.5) * 20}px)`,
                    }}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 0.5] }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.05, repeat: 1 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ---- Intact panel (idle + cracking) ---- */}
          {(phase === 'idle' || phase === 'cracking') && (
            <motion.div
              className="relative comic-border-thick"
              style={{ width: panelW, height: panelH }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Cityscape />

              {/* Central crack line */}
              {phase === 'cracking' && (
                <motion.svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 280"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  <motion.line
                    x1="200" y1="0" x2="200" y2="280"
                    stroke="#e31a1a" strokeWidth="2.5" opacity="0.9"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <line x1="200" y1="60" x2="170" y2="30" stroke="#ff4444" strokeWidth="1" opacity="0.6" />
                  <line x1="200" y1="100" x2="235" y2="70" stroke="#ff4444" strokeWidth="1" opacity="0.5" />
                  <line x1="200" y1="160" x2="165" y2="180" stroke="#ff4444" strokeWidth="1.2" opacity="0.6" />
                  <line x1="200" y1="200" x2="240" y2="220" stroke="#ff4444" strokeWidth="1" opacity="0.5" />
                  <line x1="200" y1="240" x2="175" y2="260" stroke="#ff4444" strokeWidth="1" opacity="0.6" />
                  <line x1="200" y1="0" x2="200" y2="280" stroke="#e31a1a" strokeWidth="8" opacity="0.15" />
                </motion.svg>
              )}

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

          {/* ---- Tearing apart: 2 halves ---- */}
          {phase === 'tearing' && (
            <>
              <motion.div
                className="absolute comic-border-thick overflow-hidden"
                style={{
                  width: panelW,
                  height: panelH,
                  clipPath: 'polygon(0% 0%, 50% 0%, 48% 20%, 51% 40%, 47% 60%, 50% 80%, 49% 100%, 0% 100%)',
                }}
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{ x: '-55vw', rotate: -8, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Cityscape />
              </motion.div>
              <motion.div
                className="absolute comic-border-thick overflow-hidden"
                style={{
                  width: panelW,
                  height: panelH,
                  clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 49% 100%, 51% 80%, 47% 60%, 52% 40%, 48% 20%)',
                }}
                initial={{ x: 0, rotate: 0, opacity: 1 }}
                animate={{ x: '55vw', rotate: 8, opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Cityscape />
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
