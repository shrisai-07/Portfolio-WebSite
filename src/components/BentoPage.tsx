import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { PROJECTS, SKILLS, SOCIAL_LINKS } from '../utils/constants';

// ─── 3D Tilt Wrapper ──────────────────────────────────────────────────────────
function TiltWrapper({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div style={{ perspective: 1200, width: '100%', height: '100%' }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ─── Theme Toggle Component ───────────────────────────────────────────────────
function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: 'var(--theme-btn-bg, rgba(255, 255, 255, 0.05))',
        border: '1px solid var(--card-border)',
        borderRadius: '50%',
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        color: 'var(--text-primary)',
        transition: 'all 0.3s ease',
      }}
      className="theme-btn"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            🌙
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            ☀️
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

// ─── Card 1: Profile (top-left, like bricohen) ───────────────────────────────
function ProfileCard() {
  const [flipped, setFlipped] = useState(false);
  const roles = ['CYBERSECURITY', 'DIGITAL FORENSICS', 'CTF PLAYER', 'B.TECH CSE'];

  return (
    <div className={`flip-wrap ${flipped ? 'flipped' : ''}`} style={{ minHeight: 340 }}>
      <div className="flip-inner" style={{ minHeight: 340 }}>
        {/* FRONT */}
        <div className="flip-front card card-cyan" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="mono-label" style={{ marginBottom: 4 }}>Hi, Welcome!</div>
              <div className="glitch" data-text="Shrisai Kolkondi" style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', position: 'relative', display: 'inline-block' }}>
                Shrisai Kolkondi
              </div>
            </div>
            <button className="flip-btn" onClick={() => setFlipped(true)}>
              FLIP ↻
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {roles.map(r => (
              <span key={r} className="tag tag-ghost" style={{ fontSize: 13 }}>{r}</span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div className="live-dot" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--green)' }}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
            <a href="#contact-section" className="btn btn-primary" style={{ flex: 1, fontSize: 13 }}>
              ✉ Contact Me
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ flex: 1, fontSize: 13 }}>
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-back card card-cyan" style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="mono-label">Quick Facts</div>
            <button className="flip-btn" onClick={() => setFlipped(false)}>BACK ↻</button>
          </div>
          {[
            { label: 'University', val: 'VIT Bhopal' },
            { label: 'Degree', val: 'B.Tech CSE' },
            { label: 'Year', val: '2nd Year' },
            { label: 'Specialization', val: 'Cybersecurity & Digital Forensics' },
            { label: 'GitHub', val: '@shrisai-07' },
          ].map(item => (
            <div key={item.label} style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: 10 }}>
              <div className="mono-label" style={{ marginBottom: 3, fontSize: 12 }}>{item.label}</div>
              <div style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 600 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Card 2: About Me (top-right, like bricohen "About Me" card) ──────────────
function AboutCard() {
  const [expanded, setExpanded] = useState(false);
  const bullets = [
    "Study how systems break to build better defenses.",
    "Work across cryptography, network security, digital forensics, and web exploitation.",
    "Practice in CTF competitions and hands-on lab environments (TryHackMe).",
  ];
  return (
    <div className="card card-cyan" style={{ padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--cyan)', letterSpacing: '-0.01em', fontFamily: 'var(--mono)' }}>
          shrisai@system:~$&nbsp;
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            style={{ display: 'inline-block', width: 10, height: 20, background: 'var(--cyan)', verticalAlign: 'middle', marginLeft: 4 }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(0,230,118,0.3)', background: 'rgba(0,230,118,0.06)' }}>
          <div className="live-dot" style={{ width: 6, height: 6 }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)', fontWeight: 700 }}>LIVE FEED</span>
        </div>
      </div>

      <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 16 }}>
        I'm a 2nd-year B.Tech CSE student at VIT Bhopal, specializing in Cybersecurity & Digital Forensics.
        My approach is simple: understand how the attack works, then build the defense.
        {expanded && " I learn by breaking things in controlled environments — CTFs, lab networks, and open-source tools. Outside the terminal, I'm into threat intelligence, historical attack analysis, and figuring out the human side of social engineering."}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="btn btn-dark"
        style={{ fontSize: 14, padding: '7px 14px', marginBottom: 20 }}
      >
        {expanded ? 'Less ▲' : 'More ▼'}
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {bullets.map((b, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--green)', marginTop: 2, flexShrink: 0, fontSize: 16 }}>✓</span>
            <span style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{b}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Card 3: Featured Project (left, large — like bricohen book card) ─────────
function FeaturedProjectCard() {
  const [hovered, setHovered] = useState(false);
  const project = PROJECTS[0];
  
  return (
    <div 
      className="card card-purple" 
      style={{ padding: 28, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {/* Icon block */}
        <div style={{
          width: 100, height: 130, borderRadius: 12, flexShrink: 0,
          background: 'var(--icon-bg-1)',
          border: '1px solid rgba(176,110,243,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40,
        }}>
          🔐
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="mono-label" style={{ marginBottom: 8 }}>Featured Project</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--purple)', letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.2 }}>
            {project.title}
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            {project.tags.map(t => <span key={t} className="tag tag-purple" style={{ fontSize: 13 }}>{t}</span>)}
          </div>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 18 }}>
            {project.description}
          </p>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ fontSize: 14 }}>
              View on GitHub ↗
            </a>
          )}
        </div>
      </div>

      {/* Slide-in Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{ type: 'spring', damping: 24, stiffness: 180 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100%',
              height: '100%',
              background: 'var(--card-gradient-1)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10,
            }}
          >
            <motion.div 
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--purple)', marginBottom: 20, letterSpacing: '-0.02em' }}>Description & Goals</div>
            </motion.div>

            <motion.div 
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.15, duration: 0.3 }}
              style={{ flex: 1 }}
            >
              <p style={{ fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.8, marginBottom: 16 }}>
               A rule based authentication risk simulator that demonstrates how modern identity platforms evaluate login attempts.
              </p>
              <p style={{ fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.8 }}>
                This project focuses on post password decision logic and explains how authentication systems reason about risk, context, and trust after credentials have already been provided.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{ display: 'flex', gap: 16, marginTop: 'auto' }}
            >
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: 16 }}>
                Check it ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Card 4: Other Projects (right — like bricohen resources card) ─────────────
function OtherProjectsCard() {
  return (
    <div className="card" style={{ padding: 24 }}>
      <div className="mono-label" style={{ marginBottom: 16 }}>More Projects</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PROJECTS.slice(1).map((p, i) => (
          <div key={i} style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid var(--card-border)',
            background: 'var(--input-bg)',
          }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{p.title}</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
              {p.tags.map(t => <span key={t} className="tag tag-ghost" style={{ fontSize: 11 }}>{t}</span>)}
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {p.description.slice(0, 100)}...
            </p>
          </div>
        ))}

        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="link-row" style={{ marginTop: 8 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          All Projects on GitHub
          <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}

// ─── Card 5: Skills (left bottom — like bricohen YouTube card) ─────────────────
function SkillsCard() {
  return (
    <div className="card card-purple" style={{
      padding: 28,
      background: 'var(--card-gradient-1)',
      borderLeft: '3px solid var(--purple)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: 'rgba(176,110,243,0.15)',
            border: '1px solid rgba(176,110,243,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, marginBottom: 12,
          }}>🛡️</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--purple)', letterSpacing: '-0.01em' }}>
            SKILLS &amp; TOOLS
          </div>
        </div>
        <span className="tag tag-purple">CORE STACK</span>
      </div>

      <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 20 }}>
        Trained across offensive and defensive security domains — from hash cracking and web exploitation to SOC alert triage and OSINT.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Python', color: 'var(--cyan)' },
          { label: 'Network Security', color: 'var(--purple)' },
          { label: 'Digital Forensics', color: 'var(--green)' },
          { label: 'Cryptography', color: 'var(--amber)' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            style={{ 
              display: 'flex', alignItems: 'center', gap: 10, 
              padding: '10px 14px', borderRadius: 10, 
              background: 'var(--input-bg)', 
              border: '1px solid var(--card-border)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, boxShadow: `0 0 8px ${item.color}`, flexShrink: 0 }} />
            <span style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 600 }}>{item.label}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {['OSINT', 'Malware Analysis', 'Web Exploitation', 'IoT Security', 'CTF', 'Hash Cracking', 'SOC Triage', 'C++', 'Java'].map((s, i) => (
          <motion.span 
            key={s} 
            className="tag tag-ghost" 
            style={{ fontSize: 13 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.05 }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ─── Card 6: Connect / LinkedIn (right bottom — like bricohen connect card) ────
function ConnectCard() {
  return (
    <div className="card" style={{
      padding: 28,
      background: 'var(--card-gradient-2)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: 'rgba(0,119,181,0.15)',
          border: '1px solid rgba(0,119,181,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#0077b5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(0,230,118,0.25)', background: 'rgba(0,230,118,0.05)' }}>
          <div className="live-dot" style={{ width: 6, height: 6 }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--green)', fontWeight: 700 }}>SIGNAL ACTIVE</span>
        </div>
      </div>

      <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6 }}>CONNECT</div>
      <div className="mono-label" style={{ marginBottom: 24 }}>NETWORKING PROTOCOL</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 13 }}>
          Connect on LinkedIn ↗
        </a>
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="btn btn-dark" style={{ fontSize: 13 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          Follow on GitHub
        </a>
      </div>
    </div>
  );
}

// ─── Card 7: Certifications ───────────────────────────────────────────────────
function CertsCard() {
  const certs = SKILLS.find(s => s.title === 'CERTIFICATIONS')?.skills ?? [];
  return (
    <div className="card card-green" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--green)', marginBottom: 16 }}>🏅 CERTIFICATIONS</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, flex: 1 }}>
        {certs.map((c, i) => {
          // Give alternating subtle colors to the items
          const colors = ['var(--cyan)', 'var(--green)', 'var(--purple)', 'var(--amber)'];
          const cColor = colors[i % colors.length];
          return (
            <div key={i} style={{ 
              display: 'flex', gap: 10, alignItems: 'center', 
              padding: '12px 14px', borderRadius: 8,
              background: 'var(--input-bg)', border: `1px solid var(--card-border)`,
              height: 'fit-content'
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cColor, boxShadow: `0 0 8px ${cColor}`, flexShrink: 0 }}></div>
              <span style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.4, fontWeight: 500 }}>{c}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Card 8: Contact Form ─────────────────────────────────────────────────────
function ContactCard() {
  const [form, setForm] = useState({ email: '', msg: '' });
  const [status, setStatus] = useState<'idle' | 'encrypting' | 'sent'>('idle');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.msg) return;
    
    setStatus('encrypting');
    
    // Simulate encryption and sending
    setTimeout(() => {
      setStatus('sent');
      setForm({ email: '', msg: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <div id="contact-section" className="card card-cyan" style={{ padding: 32, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>ESTABLISH SECURE LINK</div>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: status === 'sent' ? 'var(--green)' : status === 'encrypting' ? 'var(--amber)' : 'var(--cyan)', boxShadow: `0 0 10px ${status === 'sent' ? 'var(--green)' : 'var(--cyan)'}` }} />
      </div>
      <div className="mono-label" style={{ marginBottom: 28, color: 'var(--cyan)' }}>DIRECT ENCRYPTED CHANNEL</div>

      {status === 'encrypting' ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            style={{ width: 30, height: 30, border: '2px solid var(--card-border)', borderTopColor: 'var(--cyan)', borderRadius: '50%' }}
          />
          <div className="mono-label" style={{ color: 'var(--amber)', fontSize: 12 }}>ENCRYPTING PAYLOAD...</div>
        </div>
      ) : status === 'sent' ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 40 }}>✅</div>
          <div className="mono-label" style={{ color: 'var(--green)', fontSize: 13 }}>TRANSMISSION SUCCESSFUL</div>
        </motion.div>
      ) : (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              placeholder="TARGET_IDENTITY (Email)"
              style={{
                padding: '12px 0', background: 'transparent', border: 'none',
                borderBottom: '1px solid var(--card-border)', color: 'var(--text-primary)', 
                fontFamily: 'var(--mono)', fontSize: 13, outline: 'none', width: '100%',
                transition: 'border-color 0.3s'
              }}
              onFocus={e => (e.target.style.borderBottomColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderBottomColor = 'var(--card-border)')}
            />
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <textarea
              value={form.msg}
              onChange={e => setForm({ ...form, msg: e.target.value })}
              required
              placeholder="ENCRYPTED_PAYLOAD (Message)"
              style={{
                padding: '12px 0', background: 'transparent', border: 'none',
                borderBottom: '1px solid var(--card-border)', color: 'var(--text-primary)', 
                fontFamily: 'var(--mono)', fontSize: 13, outline: 'none', resize: 'none', 
                width: '100%', height: '100%', minHeight: '80px',
                transition: 'border-color 0.3s'
              }}
              onFocus={e => (e.target.style.borderBottomColor = 'var(--cyan)')}
              onBlur={e => (e.target.style.borderBottomColor = 'var(--card-border)')}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '10px 24px' }}>
            TRANSMIT ↗
          </button>
        </form>
      )}
    </div>
  );
}

// ─── Custom Interactive Cursor ──────────────────────────────────────────────────
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (window.getComputedStyle(target).cursor === 'pointer' || target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1,
          opacity: 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: 8, height: 8,
          background: 'var(--cyan)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999,
          boxShadow: '0 0 10px var(--cyan)'
        }}
      />
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.4
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: 40, height: 40,
          border: '1px solid var(--cyan)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998,
          backgroundColor: isHovering ? 'var(--cyan-dim)' : 'transparent',
          backdropFilter: isHovering ? 'blur(2px)' : 'none'
        }}
      />
    </>
  );
}

// ─── Ambient Background (Hackvector style depth) ─────────────────────────────
function AmbientBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <motion.div
        animate={{ 
          x: ['-5%', '5%', '-5%'], 
          y: ['-5%', '10%', '-5%'], 
          scale: [1, 1.2, 1] 
        }}
        transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '10%', left: '10%', width: '40vw', height: '40vw',
          background: 'var(--cyan-dim)', filter: 'blur(100px)', borderRadius: '50%', opacity: 0.6
        }}
      />
      <motion.div
        animate={{ 
          x: ['5%', '-10%', '5%'], 
          y: ['5%', '-5%', '5%'], 
          scale: [1, 1.1, 1] 
        }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', bottom: '10%', right: '10%', width: '35vw', height: '35vw',
          background: 'var(--purple-dim)', filter: 'blur(100px)', borderRadius: '50%', opacity: 0.5
        }}
      />
    </div>
  );
}

// ─── Boot Sequence Preloader ────────────────────────────────────────────────────
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const bootLines = [
    "INITIALIZING SYSTEM KERNEL...",
    "MOUNTING ENCRYPTED VOLUMES...",
    "BYPASSING FIREWALL [OK]",
    "ESTABLISHING SECURE CONNECTION...",
    "DECRYPTING INTERFACE...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    let delay = 0;
    bootLines.forEach((line, i) => {
      delay += Math.random() * 250 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === bootLines.length - 1) {
          setTimeout(onComplete, 600);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#030304', color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: 15, padding: 40, zIndex: 99999, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {lines.map((line, i) => <div key={i}>{line}</div>)}
      <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ width: 10, height: 18, background: 'var(--cyan)', marginTop: 4 }} />
    </div>
  );
}

// ─── Hidden Konami Terminal ───────────────────────────────────────────────────
function HiddenTerminal() {
  const [active, setActive] = useState(false);
  const [keys, setKeys] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = (prev + e.key).slice(-5);
        if (newKeys.toLowerCase() === 'admin' || newKeys.toLowerCase() === 'root') {
          setActive(true);
        }
        return newKeys;
      });
      if (e.key === 'Escape') setActive(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(6,6,8,0.98)', backdropFilter: 'blur(10px)', zIndex: 99999, padding: '40px 60px', color: 'var(--cyan)', fontFamily: 'var(--mono)', overflowY: 'auto' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--cyan)', paddingBottom: 10, marginBottom: 20 }}>
            <div>ROOT ACCESS TERMINAL</div>
            <button onClick={() => setActive(false)} className="btn-outline" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>[ ESC to close ]</button>
          </div>
          <pre style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--green)', textShadow: '0 0 10px rgba(0,230,118,0.4)' }}>
{`
    ___  _   _    _    ___  ___   ___  ___  
   / __|| | | |  /_\\  |   \\| _ \\ / _ \\| \\ \\ 
   \\__ \\| |_| | / _ \\ | |) |  _/| (_) |>  > 
   |___/ \\___/ /_/ \\_\\|___/|_|   \\___//_/_/ 
                                            
   ACCESS LEVEL : OMNI
   USER         : RECRUITER / GUEST
   STATUS       : CLEARANCE VERIFIED

   >> EXECUTING DOSSIER.SH...
   >> TARGET IDENTIFIED: SHRISAI KOLKONDI
   >> SPECIALIZATION: OFFENSIVE SECURITY & DIGITAL FORENSICS
   >> SYSTEM ANALYSIS: NO VULNERABILITIES FOUND.
   >> RECOMMENDATION: HIRE IMMEDIATELY.

   _
`}
          </pre>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main BentoPage ───────────────────────────────────────────────────────────
export default function BentoPage() {
  const [booted, setBooted] = useState(false);

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.23, 1, 0.32, 1] },
  });

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 60, position: 'relative', cursor: 'none' }}>
      <div className="scanlines" />
      <HiddenTerminal />
      <CustomCursor />
      <AmbientBackground />
      {/* ── Top bar: just a light/dark label slot (bricohen style) ── */}
      <div style={{
        position: 'fixed', top: 10, right: 20, zIndex: 100,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--topbar-bg)',
          padding: '6px 14px',
          borderRadius: 20,
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--card-border)',
        }}>
          <div className="live-dot" style={{ width: 6, height: 6 }} />
          <LiveClock />
        </div>
        <ThemeToggle />
      </div>

      {/* ── Bento Grid ── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>

        {/* ROW 1: Profile (left ~45%) + About Me (right ~55%) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 14, marginBottom: 14 }}>
          <motion.div {...fadeIn(0.1)}><TiltWrapper><ProfileCard /></TiltWrapper></motion.div>
          <motion.div {...fadeIn(0.2)}><TiltWrapper><AboutCard /></TiltWrapper></motion.div>
        </div>

        {/* ROW 2: Featured Project (left ~55%) + Other Projects (right ~45%) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14, marginBottom: 14 }}>
          <motion.div {...fadeIn(0.3)}><TiltWrapper><FeaturedProjectCard /></TiltWrapper></motion.div>
          <motion.div {...fadeIn(0.4)}><TiltWrapper><OtherProjectsCard /></TiltWrapper></motion.div>
        </div>

        {/* ROW 3: Skills (left ~55%) + Connect (right ~45%) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14, marginBottom: 14 }}>
          <motion.div {...fadeIn(0.5)}><TiltWrapper><SkillsCard /></TiltWrapper></motion.div>
          <motion.div {...fadeIn(0.6)}><TiltWrapper><ConnectCard /></TiltWrapper></motion.div>
        </div>

        {/* ROW 4: Certs (left ~55%) + Contact form (right ~45%) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
          <motion.div {...fadeIn(0.7)}><TiltWrapper><CertsCard /></TiltWrapper></motion.div>
          <motion.div {...fadeIn(0.8)}><TiltWrapper><ContactCard /></TiltWrapper></motion.div>
        </div>
      </div>

      {/* ── Status Bar (bricohen style bottom bar) ── */}
      <div className="status-bar">
        <div className="sb-item active">
          <div className="live-dot" style={{ width: 6, height: 6 }} />
          READY
        </div>
        <span className="sb-sep">│</span>
        <div className="sb-item cyan-item">🛡️ CYBERSECURITY</div>
        <span className="sb-sep">│</span>
        <div className="sb-item" style={{ color: 'var(--amber)' }}>VIT BHOPAL · B.TECH CSE</div>
        <div className="sb-right sb-item">
          <span style={{ color: 'var(--cyan)' }}>↗</span>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--mono)', fontSize: 11 }}>
            GITHUB
          </a>
        </div>
        <span className="sb-sep">│</span>
        <div className="sb-item" style={{ color: 'var(--purple)' }}>SHRISAI-07</div>
      </div>
    </div>
  );
}

// ─── Live Clock Component ─────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div style={{ color: 'var(--cyan)' }}>{time}</div>;
}
