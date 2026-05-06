import { motion } from 'framer-motion';

export default function BoStaffLines() {
  const cx = 300;
  const cy = 300;

  // Generate a perfect hexagon for the portal rings
  const generateHexagon = (r: number) => {
    let points = '';
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      points += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `;
    }
    return points.trim();
  };

  // Color palette matching the image: Hot Pink, Fiery Orange, Bright Yellow
  const ringColors = ['#ff007f', '#ff5500', '#ffcc00', '#ff007f', '#ff5500', '#ffcc00'];

  // Random warp streaks radiating from the center
  const warpLines = Array.from({ length: 48 }).map((_, i) => {
    const angle = (i * Math.PI * 2) / 48;
    return {
      x1: cx + 20 * Math.cos(angle),
      y1: cy + 20 * Math.sin(angle),
      x2: cx + 800 * Math.cos(angle),
      y2: cy + 800 * Math.sin(angle),
      color: i % 4 === 0 ? '#ffcc00' : i % 3 === 0 ? '#ff007f' : '#4400ff',
      width: i % 5 === 0 ? 5 : 2,
      dashArray: `${Math.random() * 100 + 50} ${Math.random() * 200 + 100}`,
    };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Deep Space Collider Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,150,0,0.08)_0%,_rgba(255,0,100,0.15)_30%,_rgba(20,0,60,0.6)_70%,_transparent_100%)] pointer-events-none rounded-full blur-xl" />

      <svg viewBox="0 0 600 600" className="w-full h-full max-h-[75vh] overflow-visible" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="colliderGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feGaussianBlur stdDeviation="16" result="blur3" />
            <feMerge>
              <feMergeNode in="blur3" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          {/* Energy Streaks / Warp Lines */}
          {warpLines.map((line, i) => (
            <motion.line
              key={`warp-${i}`}
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke={line.color}
              strokeWidth={line.width}
              strokeDasharray={line.dashArray}
              filter="url(#colliderGlow)"
              initial={{ opacity: 0, strokeDashoffset: 1000 }}
              animate={{ opacity: [0, 0.4, 0], strokeDashoffset: [1000, 0] }}
              transition={{ duration: 1.5 + (i % 3), repeat: Infinity, ease: "linear", delay: i * 0.05 }}
            />
          ))}

          {/* Tunnel Walls (Connecting structural lines from center) */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * Math.PI) / 3;
            return (
              <motion.line
                key={`wall-${i}`}
                x1={cx} y1={cy}
                x2={cx + 800 * Math.cos(angle)} y2={cy + 800 * Math.sin(angle)}
                stroke="#ff5500"
                strokeWidth={5}
                filter="url(#colliderGlow)"
                initial={{ opacity: 0.15 }}
                animate={{ opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              />
            );
          })}

          {/* Hexagonal Portal Rings Expanding Outward */}
          {[...Array(6)].map((_, i) => (
            <motion.g key={`ring-${i}`}>
              {/* Outer Thick Glow */}
              <motion.polygon
                points={generateHexagon(200)}
                fill="none"
                stroke={ringColors[i]}
                strokeWidth={16}
                filter="url(#colliderGlow)"
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                initial={{ scale: 0.01, opacity: 0 }}
                animate={{ scale: [0.01, 1.2, 4], opacity: [0, 0.6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: (3.5 / 6) * i,
                }}
              />
              {/* Inner Crisp Core */}
              <motion.polygon
                points={generateHexagon(200)}
                fill="none"
                stroke="#ffffff"
                strokeWidth={3}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
                initial={{ scale: 0.01, opacity: 0 }}
                animate={{ scale: [0.01, 1.2, 4], opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: (3.5 / 6) * i,
                }}
              />
            </motion.g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
