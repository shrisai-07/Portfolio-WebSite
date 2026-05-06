import { useState, useRef, useEffect } from 'react';

interface GlitchTransitionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function GlitchTransition({ children, id, className = '' }: GlitchTransitionProps) {
  const ref = useRef<HTMLElement>(null);
  const [glitching, setGlitching] = useState(false);
  const [hasGlitched, setHasGlitched] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasGlitched) {
          setGlitching(true);
          setHasGlitched(true);
          setTimeout(() => setGlitching(false), 400);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasGlitched]);

  return (
    <section ref={ref} id={id} className={`relative ${className}`}>
      {children}
      {glitching && (
        <div className="fixed inset-0 z-[999] pointer-events-none">
          <div className="glitch-overlay absolute inset-0 bg-[#0a0a0a]" />
          <div className="glitch-red" />
          <div className="glitch-blue" />
        </div>
      )}
    </section>
  );
}
