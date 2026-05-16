import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryPanelProps {
  onComplete: () => void;
}

const COMMANDS = [
  { prompt: '~', cmd: 'whoami', out: 'shrisai-kolkondi', delay: 0 },
  { prompt: '~', cmd: 'cat status.txt', out: 'AVAILABLE · B.TECH CSE · VIT BHOPAL', delay: 600 },
  { prompt: '~', cmd: 'open portfolio', out: null, delay: 1200 },
];

export default function EntryPanel({ onComplete }: EntryPanelProps) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (step < COMMANDS.length) {
      const t = setTimeout(() => setStep(s => s + 1), COMMANDS[step].delay + 700);
      return () => clearTimeout(t);
    } else {
      // All commands shown, wait then exit
      const t = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setDone(true);
          onComplete();
        }, 600);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (done) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'var(--bg)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            setExiting(true);
            setTimeout(() => { setDone(true); onComplete(); }, 500);
          }}
        >
          {/* Ambient orbs */}
          <div className="orb orb-blue" style={{ opacity: 0.1 }} />
          <div className="orb orb-purple" style={{ opacity: 0.08 }} />

          {/* Terminal card */}
          <motion.div
            className="bento-card"
            style={{
              width: 'min(520px, 90vw)',
              padding: '32px',
              background: 'rgba(15,15,15,0.95)',
              border: '1px solid rgba(26,143,227,0.2)',
              boxShadow: '0 0 80px rgba(26,143,227,0.1)',
            }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-6">
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                shrisai@portfolio: ~
              </span>
            </div>

            {/* Commands */}
            <div className="terminal" style={{ minHeight: 100 }}>
              {COMMANDS.slice(0, step).map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: 8 }}
                >
                  <div>
                    <span className="prompt">{c.prompt} $ </span>
                    <span>{c.cmd}</span>
                  </div>
                  {c.out && (
                    <div style={{ color: 'var(--text-secondary)', paddingLeft: 16, marginTop: 2 }}>
                      {c.out}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Live cursor on last line */}
              {step < COMMANDS.length && (
                <div>
                  <span className="prompt">~ $ </span>
                  <span className="cursor-blink">█</span>
                </div>
              )}

              {step >= COMMANDS.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ color: 'var(--green)', marginTop: 8 }}
                >
                  Initializing portfolio<span className="cursor-blink">...</span>
                </motion.div>
              )}
            </div>

            <div style={{
              marginTop: 24,
              paddingTop: 16,
              borderTop: '1px solid var(--border)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}>
              click anywhere to skip
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
