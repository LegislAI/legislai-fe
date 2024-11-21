import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  phrases: string[];
  typingSpeed: number;
  deleteSpeed: number;
  pauseTime: number;
}

const TypewriterEffect = ({
  phrases,
  typingSpeed,
  deleteSpeed,
  pauseTime,
}: TypewriterEffectProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, deleteSpeed);

      if (displayedText === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex(prev => (prev + 1) % phrases.length);
      }
    } else {
      timeout = setTimeout(() => {
        setDisplayedText(prev => currentPhrase.slice(0, prev.length + 1));
      }, typingSpeed);

      if (displayedText === currentPhrase) {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isDeleting,
    currentPhraseIndex,
    phrases,
    typingSpeed,
    deleteSpeed,
    pauseTime,
  ]);

  return (
    <div className="min-h-8">
      <p className="font-bol text-2xl text-light-text">{displayedText}</p>
    </div>
  );
};

export default TypewriterEffect;
