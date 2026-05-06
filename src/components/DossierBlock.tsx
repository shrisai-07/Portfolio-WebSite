import { motion } from 'framer-motion';

export default function DossierBlock() {
  const lines = [
    { label: 'NAME', value: 'SHRISAI KOLKONDI', redacted: false },
    { label: 'AFFILIATION', value: 'VIT BHOPAL UNIVERSITY', redacted: false, redactedPart: '[SECURE]' },
    { label: 'EXPIRES', value: '██/██/2028', redacted: false },
    { label: 'SPECIALIZATION', value: 'CYBERSECURITY & DIGITAL FORENSICS', redacted: false },
    { label: 'CLEARANCE', value: '████████', redacted: true, redactedPart: 'LEVEL MAX' },
    { label: 'STATUS', value: '██████', redacted: true, redactedPart: 'ACTIVE ANOMALY' },
    { label: 'THREAT RATING', value: 'UNUSUAL, CHECK ON THREAT TRACKER!', redacted: false },
  ];

  return (
    <motion.div
      className="holo-panel p-8 md:p-10 min-h-[350px] relative overflow-hidden group"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Accent */}
      <div className="flex items-center gap-6 mb-12 border-b-2 border-[rgba(227,26,26,0.4)] pb-6">
        <div className="w-3 h-10 bg-[#e31a1a] shadow-[0_0_15px_#e31a1a]" />
        <h3 className="font-[Bangers] text-2xl md:text-4xl text-[#f0f0f0] tracking-[0.2em] uppercase">
          IDENTITY CARD
        </h3>
      </div>

      {/* Dossier Lines */}
      <div className="space-y-6 md:space-y-8">
        {lines.map((line, i) => (
          <motion.div
            key={line.label}
            className="grid grid-cols-[160px_1fr] md:grid-cols-[240px_1fr] gap-6 items-center group/line"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <span className="font-[Bangers] text-lg md:text-xl text-[rgba(26,143,227,0.8)] tracking-wider group-hover/line:text-[#1a8fe3] transition-colors">
              {line.label}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-[#8899aa] text-xl">:</span>
              <span className="font-mono text-base md:text-xl text-[#f0f0f0] tracking-tight">
                {line.redacted ? (
                  <div className="flex items-center gap-4">
                    <span className="bg-[#f0f0f0] text-transparent select-none px-2 rounded-sm leading-none">
                      {line.value}
                    </span>
                    {line.redactedPart && (
                      <span className="text-xs md:text-sm text-[#e31a1a] font-bold border-2 border-[#e31a1a] px-2 py-0.5 rounded-sm animate-pulse">
                        {line.redactedPart}
                      </span>
                    )}
                  </div>
                ) : (
                  line.value
                )}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle Background Scanning Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(26,143,227,0.03)] to-transparent h-32 w-full pointer-events-none"
        animate={{ top: ['-30%', '130%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
