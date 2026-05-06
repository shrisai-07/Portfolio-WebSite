import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import SoundEffect from './SoundEffect';
import { SKILLS } from '../utils/constants';

export default function SkillsSection() {
  const [ref, isVisible] = useScrollSection(0.2);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Sound effect */}
      <div className="absolute top-8 right-8 z-20">
        <SoundEffect text="SKILLS LOADED." color="#1a8fe3" rotation={-5} visible={isVisible} size="md" />
      </div>

      {/* Large comic panel frame */}
      <div className="comic-border-thick bg-[#0a0a0a] p-10 md:p-16 halftone-bg relative overflow-hidden">
        {/* Section header */}
        <h2
          className="font-[Bangers] text-4xl md:text-5xl text-[#1a8fe3] comic-outline tracking-wider mb-16 misregister"
          data-text="SKILLS"
          style={{ WebkitTextStroke: '1.5px #000' }}
        >
          SKILLS
        </h2>

        {/* Holographic sub-panels — 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          {SKILLS.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="holo-panel p-5"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + catIndex * 0.12, duration: 0.5 }}
            >
              {/* Category header */}
              <div className="font-[Bangers] text-sm text-[#1a8fe3] tracking-[0.2em] mb-4 border-b border-[rgba(26,143,227,0.2)] pb-2">
                {category.title}
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + catIndex * 0.1 + skillIndex * 0.04 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative corner markers */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[rgba(26,143,227,0.3)]" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[rgba(26,143,227,0.3)]" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[rgba(26,143,227,0.3)]" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[rgba(26,143,227,0.3)]" />
      </div>
    </section>
  );
}
