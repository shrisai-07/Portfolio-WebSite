import { motion, AnimatePresence } from 'framer-motion';

interface SoundEffectProps {
  text: string;
  color?: string;
  rotation?: number;
  visible: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
};

export default function SoundEffect({
  text,
  color = '#1a8fe3',
  rotation = -5,
  visible,
  className = '',
  size = 'md',
}: SoundEffectProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`sound-effect ${sizeMap[size]} ${className}`}
          style={{ color, rotate: `${rotation}deg` }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: [0.5, 1.12, 1.0], opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            scale: { duration: 0.15, times: [0, 0.6, 1] },
            opacity: { duration: 0.1 },
          }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
