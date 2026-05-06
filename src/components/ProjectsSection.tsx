import { useScrollSection } from '../hooks/useScrollSection';
import ProjectPanel from './ProjectPanel';
import { PROJECTS } from '../utils/constants';

export default function ProjectsSection() {
  const [ref, isVisible] = useScrollSection(0.15);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Section header */}
      <h2
        className="font-[Bangers] text-4xl md:text-5xl text-[#1a8fe3] comic-outline tracking-wider mb-16 misregister"
        data-text="PROJECTS"
        style={{ WebkitTextStroke: '1.5px #000' }}
      >
        PROJECTS
      </h2>

      {/* Comic page spread */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {PROJECTS.map((project, i) => (
          <ProjectPanel key={project.title} project={project} index={i} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
