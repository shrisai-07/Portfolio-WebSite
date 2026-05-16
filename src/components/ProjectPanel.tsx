import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../utils/constants';

interface ProjectPanelProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

const GLOW_COLORS = ['blue', 'purple', 'cyan', 'amber', 'green', 'red'] as const;
const BADGE_COLORS: Record<string, string> = {
  Python: 'badge-blue',
  'Identity Security': 'badge-purple',
  'Risk Engine': 'badge-amber',
  'Web Security': 'badge-green',
  Cryptography: 'badge-cyan',
  'Access Control': 'badge-ghost',
  'Threat Analysis': 'badge-red',
  'Rule Engine': 'badge-amber',
  'Network Security': 'badge-blue',
  Java: 'badge-amber',
  'C++': 'badge-green',
};

export default function ProjectPanel({ project, index, isVisible }: ProjectPanelProps) {
  const [flipped, setFlipped] = useState(false);
  const glow = GLOW_COLORS[index % GLOW_COLORS.length];

  return (
    <motion.div
      className={`flip-card ${project.isHero ? '' : ''}`}
      style={{
        gridColumn: project.isHero ? 'span 2' : 'span 1',
        height: project.isHero ? 320 : 280,
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`} style={{ height: '100%' }}>
        {/* FRONT */}
        <div
          className={`flip-card-front bento-card card-glow-${glow}`}
          style={{ padding: 28 }}
        >
          {/* Flip trigger */}
          <button
            className="flip-btn"
            onClick={() => setFlipped(true)}
            aria-label="See details"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            flip
          </button>

          {/* Project number */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--text-muted)',
            marginBottom: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            Project {String(index + 1).padStart(2, '0')}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: project.isHero ? 22 : 18,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'var(--text-primary)',
            marginBottom: 12,
          }}>
            {project.title}
          </h3>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'auto' }}>
            {project.tags.map(tag => (
              <span key={tag} className={`badge ${BADGE_COLORS[tag] ?? 'badge-ghost'}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Link (if available) */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute',
                bottom: 20,
                left: 28,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--blue)',
                textDecoration: 'none',
                fontWeight: 500,
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View on GitHub →
            </a>
          )}
        </div>

        {/* BACK */}
        <div
          className="flip-card-back bento-card"
          style={{ padding: 28, border: '1px solid var(--border-hover)' }}
        >
          <button
            className="flip-btn"
            onClick={() => setFlipped(false)}
            aria-label="Flip back"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M1 4v6h6M23 20v-6h-6" />
              <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
            </svg>
            back
          </button>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Overview
          </div>

          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' }}>
            {project.description}
          </p>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ position: 'absolute', bottom: 20, left: 28, fontSize: 11 }}
            >
              Open GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
