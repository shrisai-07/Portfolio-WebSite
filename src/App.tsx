import { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import EntryPanel from './components/EntryPanel';
import BentoPage from './components/BentoPage';

export default function App() {
  const [entryComplete, setEntryComplete] = useState(false);

  return (
    <LazyMotion features={domAnimation}>
      <EntryPanel onComplete={() => setEntryComplete(true)} />
      {entryComplete && <BentoPage />}
    </LazyMotion>
  );
}
