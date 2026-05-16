import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import ProjectPanel from './ProjectPanel';
import { PROJECTS } from '../utils/constants';

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollSection(0.1);

  return (
    <section
      id="projects"
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
        <div className="section-label" style={{ marginBottom: 8 }}>02 — Projects</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2 className="section-title">
            Things I've<br /><span style={{ color: 'var(--blue)' }}>built & broken.</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Flip cards to read more →
          </p>
        </div>
      </motion.div>

      {/* Projects grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {PROJECTS.map((project, i) => (
          <ProjectPanel
            key={project.title}
            project={project}
            index={i}
            isVisible={isVisible}
          />
        ))}
      </div>
    </section>
  );
}
