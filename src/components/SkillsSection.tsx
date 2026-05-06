import { motion } from 'framer-motion';
import { useScrollSection } from '../hooks/useScrollSection';
import SoundEffect from './SoundEffect';
import { SKILLS } from '../utils/constants';

export default function SkillsSection() {
  const [ref, isVisible] = useScrollSection(0.2);

  return (
    <section ref={ref as React.RefObject<HTMLDivElement>} className="relative py-32 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Hex Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%">
          <pattern id="hex-grid" width="50" height="43.3" patternUnits="userSpaceOnUse">
            <path d="M25 0L50 14.4V43.3L25 57.7L0 43.3V14.4L25 0Z" fill="none" stroke="#1a8fe3" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hex-grid)" />
        </svg>
      </div>

      {/* Sound effect */}
      <div className="absolute top-8 right-8 z-20">
        <SoundEffect text="ACCESS GRANTED." color="#e31a1a" rotation={-8} visible={isVisible} size="md" />
      </div>

      {/* Large comic panel frame */}
      <div className="comic-border-thick bg-[#0a0a0a] p-10 md:p-16 halftone-bg relative overflow-hidden group">
        {/* Glowing Corner Accents */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-[#e31a1a] opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-[#1a8fe3] opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Section header */}
        <div className="relative mb-16 inline-block">
          <h2
            className="font-[Bangers] text-5xl md:text-7xl text-[#1a8fe3] comic-outline tracking-[0.1em] misregister"
            data-text="SKILLS"
            style={{ WebkitTextStroke: '2px #000' }}
          >
            SKILLS
          </h2>
          <motion.div 
            className="h-1 bg-gradient-to-r from-[#e31a1a] via-[#D4537E] to-transparent mt-2"
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Holographic sub-panels — 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          {SKILLS.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="holo-panel p-10 min-h-[280px] flex flex-col relative group/panel"
              initial={{ opacity: 0, x: catIndex % 2 === 0 ? -40 : 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + catIndex * 0.12, duration: 0.6, ease: "easeOut" }}
            >
              {/* Category Header - Flex Item 1 */}
              <div className="border-b-4 border-[#e31a1a] pb-4 mb-8 pl-12 pr-6 pt-6">
                <div className="font-[Bangers] text-3xl text-[#f0f0f0] tracking-[0.3em] uppercase">
                  {category.title}
                </div>
              </div>

              {/* Skill Tags Container - Flex Item 2 */}
              <div className="flex flex-wrap gap-4 pl-12 pr-6 pb-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="skill-tag"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1, rotate: 1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              
              {/* UI Decorative Marker */}
              <div className="absolute top-4 right-6 font-mono text-[10px] text-[#e31a1a] opacity-40 group-hover/panel:opacity-100 transition-opacity">
                ID_CORE_{catIndex}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Background Text / Watermark */}
        <div className="absolute -bottom-10 -left-10 font-[Bangers] text-[10rem] text-[#e31a1a] opacity-[0.03] select-none pointer-events-none rotate-12">
          MIGUEL O'HARA
        </div>
      </div>
    </section>
  );
}
