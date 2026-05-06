import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThreatLevelWidget() {
  const [isThreat, setIsThreat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsThreat(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const safeBars = [
    { color: '#1a8fe3', height: 'h-6', dur: 2 },
    { color: '#1a8fe3', height: 'h-8', dur: 2.5 },
    { color: '#3ba0e8', height: 'h-10', dur: 1.8 },
    { color: '#e8a31a', height: 'h-7', dur: 2.2 },
    { color: '#e8a31a', height: 'h-9', dur: 2.8 },
  ];

  const threatBars = [
    { color: '#D4537E', height: 'h-12', dur: 0.5 },
    { color: '#e31a1a', height: 'h-10', dur: 0.4 },
    { color: '#D4537E', height: 'h-14', dur: 0.6 },
    { color: '#e31a1a', height: 'h-9', dur: 0.5 },
    { color: '#D4537E', height: 'h-11', dur: 0.7 },
  ];

  const currentBars = isThreat ? threatBars : safeBars;
  const themeColor = isThreat ? '#e31a1a' : '#1a8fe3';
  const bgColor = isThreat ? 'bg-[#110000]' : 'bg-[rgba(10,10,10,0.9)]';
  const borderColor = isThreat ? 'border-[#e31a1a]' : 'border-[rgba(26,143,227,0.3)]';

  return (
    <motion.div
      className={`mt-5 inline-flex items-center gap-5 p-4 ${bgColor} border ${borderColor} relative overflow-hidden transition-colors duration-500`}
      style={{
        boxShadow: isThreat ? '0 0 25px rgba(227,26,26,0.4)' : '0 0 15px rgba(26,143,227,0.15)'
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.5 }}
    >
      {isThreat && <div className="absolute inset-0 bg-[rgba(227,26,26,0.1)] pointer-events-none glitch-red" />}

      {/* Scanning/Warning Icon */}
      <motion.div 
        className="flex items-center justify-center z-10"
        style={{ color: themeColor }}
        animate={isThreat ? { rotate: [-10, 10, -10], scale: [1, 1.2, 1] } : { rotate: 360 }}
        transition={isThreat ? { duration: 0.3, repeat: Infinity } : { duration: 10, repeat: Infinity, ease: "linear" }}
      >
        {isThreat ? (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 8a4 4 0 0 1 4 4"/>
          </svg>
        )}
      </motion.div>

      <div className="z-10">
        <div className={`text-[10px] font-mono tracking-[0.2em] mb-1 ${isThreat ? 'text-[#e31a1a] font-bold animate-pulse' : 'text-[#8899aa]'}`}>
          {isThreat ? 'ANOMALY DETECTED' : 'NETWORK STATUS'}
        </div>
        <motion.div 
          className="font-[Bangers] text-2xl tracking-widest"
          style={{ color: themeColor, textShadow: isThreat ? '0 0 8px rgba(227,26,26,0.8)' : '0 0 4px rgba(26,143,227,0.5)' }}
          animate={isThreat ? { opacity: [1, 0.5, 1] } : {}}
          transition={isThreat ? { duration: 0.5, repeat: Infinity } : {}}
        >
          {isThreat ? 'MULTIVERSAL THREAT' : 'MONITORING'}
        </motion.div>
      </div>
      
      {/* Animated Activity Bars */}
      <div className="flex gap-1.5 items-end h-10 ml-2 z-10">
        {currentBars.map((bar, i) => (
          <motion.div
            key={`${isThreat}-${i}`}
            className={`w-3 ${bar.height} rounded-sm`}
            style={{
              backgroundColor: bar.color,
              boxShadow: `0 0 8px ${bar.color}80`,
            }}
            animate={{ height: ['40%', '90%', '50%', '80%', '40%'] }}
            transition={{ duration: bar.dur, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}
