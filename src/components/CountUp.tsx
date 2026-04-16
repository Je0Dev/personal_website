import { useState, useEffect } from 'react';

interface CountUpProps {
  number: number;
  color: string;
}

export function CountUp({ number, color }: CountUpProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = number;
    const duration = 1500;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [number]);
  
  return <span className={`text-4xl font-display font-black ${color}`}>{count}{number > 10 ? '+' : ''}</span>;
}