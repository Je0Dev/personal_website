import { motion } from 'motion/react';

interface OldBookIllustrationProps {
  variant?: 'quill' | 'books' | 'skull' | 'feather' | 'scroll';
  className?: string;
  size?: number;
}

const variants = {
  quill: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M10 90 L50 10 L90 90" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <path d="M20 80 Q50 30 80 80" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M30 70 Q50 40 70 70" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4"/>
      <circle cx="50" cy="15" r="3" fill="currentColor" opacity="0.6"/>
      <path d="M45 15 Q30 40 20 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
    </svg>
  ),
  books: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="15" y="25" width="25" height="50" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <rect x="40" y="20" width="25" height="55" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
      <rect x="65" y="30" width="20" height="45" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
      <line x1="17" y1="35" x2="38" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="17" y1="45" x2="38" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="17" y1="55" x2="38" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="42" y1="30" x2="63" y2="30" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="42" y1="40" x2="63" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="42" y1="50" x2="63" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="67" y1="40" x2="83" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
      <line x1="67" y1="50" x2="83" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    </svg>
  ),
  skull: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="50" cy="45" rx="25" ry="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <ellipse cx="50" cy="35" rx="18" ry="20" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <circle cx="38" cy="40" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <circle cx="62" cy="40" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <ellipse cx="50" cy="55" rx="8" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
      <path d="M50 65 L50 75" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <path d="M45 75 L50 70 L55 75" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <circle cx="35" cy="32" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="65" cy="32" r="2" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
  feather: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M50 95 Q30 70 20 40 Q15 20 30 5 Q50 20 60 30 Q70 50 80 20 Q90 40 80 60 Q60 80 50 95" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M50 90 Q40 70 35 50 Q30 35 40 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M30 25 L50 30 L55 35" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M55 30 L65 35" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M25 55 L40 50 L45 55" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M50 50 L55 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M65 25 L70 50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M70 30 Q60 45 55 50" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <path d="M35 65 Q45 70 50 80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
    </svg>
  ),
  scroll: (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M20 20 Q50 15 80 20 L80 80 Q50 85 20 80 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
      <path d="M25 22 Q50 18 75 22 L75 78 Q50 82 25 78 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      <ellipse cx="20" cy="50" rx="5" ry="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
      <ellipse cx="80" cy="50" rx="5" ry="30" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.5"/>
      <line x1="30" y1="35" x2="70" y2="35" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="30" y1="45" x2="70" y2="45" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="30" y1="55" x2="70" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
      <line x1="30" y1="65" x2="70" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
    </svg>
  ),
};

export function OldBookIllustration({ variant = 'books', className = '', size = 60 }: OldBookIllustrationProps) {
  const illustration = variants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      className={`text-[var(--text-color)] ${className}`}
      style={{ width: size, height: size }}
    >
      {illustration}
    </motion.div>
  );
}

export function DecorativeDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-8 opacity-30">
      <OldBookIllustration variant="feather" size={40} />
      <div className="h-px w-20 bg-current" />
      <OldBookIllustration variant="skull" size={30} />
      <div className="h-px w-20 bg-current" />
      <OldBookIllustration variant="books" size={40} />
    </div>
  );
}