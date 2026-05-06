import { motion } from 'framer-motion';

export default function ThreatLevelWidget() {
  const bars = [
    { filled: true, color: '#1a8fe3' },
    { filled: true, color: '#3ba0e8' },
    { filled: true, color: '#e8a31a' },
    { filled: true, color: '#e31a1a' },
    { filled: false, color: '#333' },
  ];

  return (
    <motion.div
      className="threat-pulse mt-5 inline-flex items-center gap-4 p-4 bg-[rgba(10,10,10,0.9)] border border-[rgba(26,143,227,0.2)]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      <div>
        <div className="text-xs font-mono text-[#8899aa] tracking-widest mb-1">THREAT LEVEL</div>
        <div className="font-[Bangers] text-lg text-[#1a8fe3] tracking-wider">ELEVATED</div>
      </div>
      <div className="flex gap-1.5">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="w-3 h-8 rounded-sm transition-all duration-300"
            style={{
              backgroundColor: bar.filled ? bar.color : bar.color,
              opacity: bar.filled ? 1 : 0.2,
              boxShadow: bar.filled ? `0 0 6px ${bar.color}40` : 'none',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
