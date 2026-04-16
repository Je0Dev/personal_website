import { useState, useEffect } from 'react';

const phrases = ['I build things', 'I code', 'I learn', 'I create'];

export function useTypedText() {
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let charIndex = 0;
    let deleting = false;
    const currentPhrase = phrases[phraseIndex];
    const typeInterval = setInterval(() => {
      if (!deleting) {
        setTypedText(currentPhrase.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentPhrase.length) setTimeout(() => { deleting = true; }, 1500);
      } else {
        setTypedText(currentPhrase.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) { deleting = false; setPhraseIndex((prev) => (prev + 1) % phrases.length); }
      }
    }, deleting ? 50 : 100);
    return () => clearInterval(typeInterval);
  }, [phraseIndex]);

  return typedText;
}