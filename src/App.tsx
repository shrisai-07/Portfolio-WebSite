import { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import EntryPanel from './components/EntryPanel';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import GlitchTransition from './components/GlitchTransition';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [entryComplete, setEntryComplete] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      {/* Entry experience */}
      <EntryPanel onComplete={() => setEntryComplete(true)} />

      {/* Main portfolio — hidden until entry completes */}
      {entryComplete && (
        <div>
          <Navbar visible={entryComplete} />

          <main className="flex flex-col gap-16 md:gap-32 pb-20">
            <HeroSection />

            <GlitchTransition id="about">
              <AboutSection />
            </GlitchTransition>

            <GlitchTransition id="projects">
              <ProjectsSection />
            </GlitchTransition>

            <GlitchTransition id="skills">
              <SkillsSection />
            </GlitchTransition>

            <GlitchTransition id="contact">
              <ContactSection />
            </GlitchTransition>
          </main>

          <Footer />
        </div>
      )}
    </LazyMotion>
  );
}
