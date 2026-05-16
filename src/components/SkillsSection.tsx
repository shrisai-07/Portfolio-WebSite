import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import { SKILLS } from '../utils/constants';

const CATEGORY_COLORS: Record<string, { color: string; icon: string }> = {
  'LANGUAGES': { color: 'var(--blue)', icon: '⌨️' },
  'CYBERSECURITY TOOLS & DOMAINS': { color: 'var(--red)', icon: '🛡️' },
  'CERTIFICATIONS': { color: 'var(--green)', icon: '🏅' },
  'PRACTICE': { color: 'var(--amber)', icon: '🔬' },
};

export default function SkillsSection() {
  const [ref, isVisible] = useScrollSection(0.1);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{ padding: '80px 24px', maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 40 }}
      >
        <div className="section-label" style={{ marginBottom: 8 }}>03 — Skills</div>
        <h2 className="section-title">
          My toolkit<br /><span style={{ color: 'var(--blue)' }}>& expertise.</span>
        </h2>
      </motion.div>

      {/* Bento grid of skill categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
        {SKILLS.map((cat, catIdx) => {
          const meta = CATEGORY_COLORS[cat.title] ?? { color: 'var(--blue)', icon: '⚙️' };
          const isActive = activeCategory === cat.title;

          return (
            <motion.div
              key={cat.title}
              className="bento-card"
              style={{
                padding: 24,
                cursor: 'default',
                border: isActive ? `1px solid ${meta.color}40` : '1px solid var(--border)',
                boxShadow: isActive ? `0 8px 40px ${meta.color}20` : undefined,
                transition: 'all 0.3s ease',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + catIdx * 0.1 }}
              onMouseEnter={() => setActiveCategory(cat.title)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 20 }}>{meta.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Category
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: meta.color }}>
                    {cat.title}
                  </div>
                </div>
              </div>

              {/* Skill pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={skill}
                    className="skill-pill"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3 + catIdx * 0.1 + si * 0.04 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Proficiency bars */}
      <motion.div
        className="bento-card"
        style={{ padding: 28 }}
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>
          Proficiency Overview
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {[
            { label: 'Java', pct: 82, color: 'var(--blue)' },
            { label: 'Network Security', pct: 75, color: 'var(--red)' },
            { label: 'Digital Forensics', pct: 70, color: 'var(--purple)' },
            { label: 'Cryptography', pct: 68, color: 'var(--cyan)' },
            { label: 'C++', pct: 60, color: 'var(--green)' },
            { label: 'CTF / Lab Envs', pct: 78, color: 'var(--amber)' },
          ].map((item, i) => (
            <div key={item.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: item.color }}>{item.pct}%</span>
              </div>
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60`, width: 0 }}
                  animate={isVisible ? { width: `${item.pct}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
