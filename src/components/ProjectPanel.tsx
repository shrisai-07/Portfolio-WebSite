import { useState } from 'react';
import { motion } from 'framer-motion';
import SoundEffect from './SoundEffect';
import type { Project } from '../utils/constants';

interface ProjectPanelProps {
  project: Project;
  index: number;
  isVisible: boolean;
}

export default function ProjectPanel({ project, index, isVisible }: ProjectPanelProps) {
  const [hovered, setHovered] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  const handleHover = (enter: boolean) => {
    setHovered(enter);
    if (enter) {
      setShowEffect(true);
      setTimeout(() => setShowEffect(false), 2000);
    }
  };

  return (
    <motion.div
      className={`comic-border-thick bg-[#0a0a0a] relative overflow-hidden panel-crack cursor-pointer halftone-bg ${
        project.isHero ? 'md:col-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      style={{
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        boxShadow: hovered
          ? '0 8px 32px rgba(26, 143, 227, 0.2), 0 4px 12px rgba(0,0,0,0.5)'
          : '4px 4px 0 rgba(0,0,0,0.5)',
        zIndex: hovered ? 10 : 1,
      }}
    >
      <div className="relative z-10 p-8 md:p-12">
        {/* Sound effect burst */}
        <div className="absolute top-2 right-4 z-20">
          <SoundEffect
            text={project.soundEffect}
            color={project.isHero ? '#e31a1a' : '#1a8fe3'}
            rotation={project.isHero ? -12 : -8}
            visible={showEffect}
            size={project.isHero ? 'lg' : 'md'}
          />
        </div>

        {/* Project title */}
        <h3
          className="font-[Bangers] text-2xl md:text-3xl text-[#1a8fe3] tracking-wide comic-outline-thin mb-4"
          style={{ WebkitTextStroke: '1px #000' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[#c0c8d0] text-sm md:text-base leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-tag text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm text-[#1a8fe3] hover:text-white transition-colors duration-200 group"
          >
            <span>→</span>
            <span className="border-b border-[rgba(26,143,227,0.3)] group-hover:border-[#1a8fe3] transition-colors">
              View on GitHub
            </span>
          </a>
        )}
      </div>

      {/* Decorative panel number */}
      <div className="absolute bottom-2 right-3 font-mono text-xs text-[rgba(26,143,227,0.15)]">
        PANEL {index + 1}
      </div>
    </motion.div>
  );
}
