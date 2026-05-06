import { motion } from 'framer-motion';

export default function DossierBlock() {
  const lines = [
    { label: 'OPERATIVE', value: 'SHRISAI KOLKONDI', redacted: false },
    { label: 'AFFILIATION', value: 'VIT Bhopal University — CSE', redacted: true, redactedPart: '[REDACTED]' },
    { label: 'SPECIALIZATION', value: 'Cybersecurity & Digital Forensics', redacted: false },
    { label: 'CLEARANCE', value: '████████', redacted: true, redactedPart: 'LEVEL' },
    { label: 'STATUS', value: '██████', redacted: true, redactedPart: 'ACTIVE' },
    { label: 'THREAT RATING', value: '████████████', redacted: false },
  ];

  return (
    <motion.div
      className="mt-6 p-5 bg-[rgba(10,10,10,0.8)] border border-[rgba(26,143,227,0.2)] font-mono text-sm md:text-base"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="text-[#8899aa] text-xs mb-3 tracking-widest">CLASSIFIED PERSONNEL FILE</div>
      {lines.map((line, i) => (
        <motion.div
          key={line.label}
          className="flex gap-2 py-1 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <span className="text-[#8899aa] min-w-[160px]">{line.label}</span>
          <span className="text-[#8899aa]">:</span>
          <span className="text-[#f0f0f0]">
            {line.redacted ? (
              <>
                <span className="bg-[#f0f0f0] text-[#f0f0f0] px-1 select-none">{line.value}</span>
                {line.redactedPart && (
                  <span className="ml-2 text-[#1a8fe3]">{line.redactedPart}</span>
                )}
              </>
            ) : (
              line.value
            )}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
