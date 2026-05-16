import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';

const ABOUT_TEXT = [
  "I'm a 2nd-year B.Tech CSE student at VIT Bhopal, specializing in Cybersecurity & Digital Forensics.",
  "My approach is simple: understand how the attack works, then build the defense. I learn by breaking things in controlled environments — CTFs, lab networks, and open-source tools.",
  "Outside the terminal, I'm into threat intelligence, historical attack analysis, and figuring out the human side of social engineering.",
];

const TIMELINE = [
  { year: 'Now',    event: 'Pursuing B.Tech CSE, VIT Bhopal', color: 'var(--blue)' },
  { year: '2024',   event: 'Google Cybersecurity Certificate', color: 'var(--green)' },
  { year: '2024',   event: 'Microsoft Cybersecurity Analyst Cert', color: 'var(--purple)' },
  { year: '2023',   event: 'Started B.Tech · First CTF', color: 'var(--amber)' },
];

export default function AboutSection() {
  const [ref, isVisible] = useScrollSection(0.15);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['Bio', 'Timeline'];

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 40 }}
      >
        <div className="section-label" style={{ marginBottom: 8 }}>01 — About</div>
        <h2 className="section-title">The person behind<br /><span style={{ color: 'var(--blue)' }}>the keyboard.</span></h2>
      </motion.div>

      {/* Bento grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>

        {/* Bio / Timeline card — spans 7 cols */}
        <motion.div
          className="bento-card card-glow-blue"
          style={{ gridColumn: 'span 12', padding: 32 }}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: 'var(--surface-2)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
            {tabs.map((t, i) => (
              <button
                key={t}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: '6px 16px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  background: activeTab === i ? 'var(--surface-3)' : 'transparent',
                  color: activeTab === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {activeTab === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {ABOUT_TEXT.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)' }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', paddingLeft: 24 }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: 4, top: 8, bottom: 8, width: 2, background: 'var(--border)', borderRadius: 2 }} />
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative' }}
                >
                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    left: -20,
                    top: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: item.color,
                    boxShadow: `0 0 8px ${item.color}`,
                  }} />
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: item.color, fontWeight: 700 }}>
                      {item.year}
                    </span>
                    <div style={{ fontSize: 14, color: 'var(--text-primary)', marginTop: 2 }}>{item.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stat cards */}
        {[
          { num: '3+', label: 'Security Projects', color: 'var(--blue)', bg: 'var(--blue-dim)' },
          { num: '2', label: 'Pro Certifications', color: 'var(--green)', bg: 'rgba(0,230,118,0.08)' },
          { num: 'CTF', label: 'Competitions', color: 'var(--amber)', bg: 'rgba(255,152,0,0.08)' },
          { num: '2yr', label: 'Hands-on Learning', color: 'var(--purple)', bg: 'rgba(156,111,247,0.08)' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bento-card"
            style={{
              gridColumn: 'span 6',
              padding: '24px 20px',
              background: stat.bg,
              border: `1px solid ${stat.color}20`,
              cursor: 'default',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.08 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="stat-num" style={{ color: stat.color }}>{stat.num}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
