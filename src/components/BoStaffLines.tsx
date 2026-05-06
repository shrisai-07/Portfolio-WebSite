import { motion } from 'framer-motion';

export default function BoStaffLines() {
  const lines = [
    { x1: 30, y1: 0, x2: 380, y2: 500, opacity: 0.4, width: 1.5 },
    { x1: 80, y1: 0, x2: 420, y2: 480, opacity: 0.25, width: 1 },
    { x1: 0, y1: 50, x2: 350, y2: 520, opacity: 0.35, width: 1.2 },
    { x1: 50, y1: 0, x2: 400, y2: 450, opacity: 0.2, width: 0.8 },
    { x1: 100, y1: 20, x2: 450, y2: 500, opacity: 0.3, width: 1.5 },
    { x1: 10, y1: 100, x2: 300, y2: 530, opacity: 0.15, width: 1 },
    { x1: 150, y1: 0, x2: 460, y2: 400, opacity: 0.22, width: 0.7 },
    { x1: 60, y1: 30, x2: 440, y2: 520, opacity: 0.18, width: 1.3 },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Faint purple glow — Gambit easter egg */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(127,119,221,0.08) 0%, transparent 70%)',
        }}
      />

      <svg viewBox="0 0 500 550" className="w-full h-full max-h-[70vh]" xmlns="http://www.w3.org/2000/svg">
        {lines.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#1a8fe3"
            strokeWidth={line.width}
            opacity={0}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: line.opacity, pathLength: 1 }}
            transition={{
              delay: 0.3 + i * 0.12,
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        ))}
      </svg>
    </div>
  );
}
